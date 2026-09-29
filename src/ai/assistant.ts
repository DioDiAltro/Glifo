import { renderTex } from '../render/katex'

/**
 * Assistente AI per le domande che la ricerca locale non sa risolvere
 * ("come scrivo una freccia con sopra n → ∞?"). Usa l'API di Claude con la
 * chiave dello studente, salvata solo nel suo browser. L'SDK viene caricato
 * solo quando serve, così l'app resta leggera.
 */

export interface AiSettings {
  apiKey: string
  model: string
  baseUrl?: string
}

export interface AiAnswer {
  latex: string
  description: string
  /** Errore di KaTeX, se il codice proposto non è valido. */
  error: string | null
}

export interface AiResult {
  answers: AiAnswer[]
  note: string
}

export class AiError extends Error {}

const SYSTEM_PROMPT = `Sei l'assistente di Matherdown, un editor di appunti universitari in Markdown in cui le formule si scrivono in LaTeX tra $…$ e vengono disegnate con KaTeX.

Lo studente ti chiede come scrivere un simbolo, una notazione o una formula. Rispondi con il codice LaTeX da inserire dentro la formula, senza i delimitatori $.

- Usa solo comandi supportati da KaTeX: niente \\usepackage, \\newcommand, \\def o pacchetti esterni. Per la chimica è disponibile \\ce{…} (mhchem).
- Proponi da 1 a 4 alternative, dalla più comune alla meno comune. Per un simbolo singolo di solito ne basta una.
- In "description" scrivi una frase breve in italiano che dice cosa produce il codice e quando usarlo.
- Se la richiesta non riguarda simboli o formule, lascia "answers" vuoto e spiega in "note" in che cosa puoi aiutare.
- "note" può contenere un consiglio di una frase; altrimenti lascialo vuoto.`

const ANSWER_SCHEMA = {
  type: 'object',
  properties: {
    answers: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          latex: { type: 'string', description: 'Codice LaTeX compatibile con KaTeX, senza delimitatori $' },
          description: { type: 'string', description: 'Spiegazione breve in italiano' },
        },
        required: ['latex', 'description'],
        additionalProperties: false,
      },
    },
    note: { type: 'string' },
  },
  required: ['answers', 'note'],
  additionalProperties: false,
} as const

/** Modelli che accettano `effort` e i fallback lato server. */
function supportsEffortAndFallback(model: string): boolean {
  return model === 'claude-opus-5-5' || model === 'claude-sonnet-5-5'
}

function stripDelimiters(latex: string): string {
  const t = latex.trim()
  const m = /^\$\$([\s\S]*)\$\$$/.exec(t) ?? /^\$([\s\S]*)\$$/.exec(t) ?? /^\\\(([\s\S]*)\\\)$/.exec(t)
  return (m ? m[1] : t).trim()
}

export async function askAi(question: string, settings: AiSettings, signal?: AbortSignal): Promise<AiResult> {
  if (!settings.apiKey && !settings.baseUrl) {
    throw new AiError('Per usare l\'assistente AI inserisci la tua chiave API nelle impostazioni.')
  }
  const [{ default: Anthropic }, { betaJSONSchemaOutputFormat }] = await Promise.all([
    import('@anthropic-ai/sdk'),
    import('@anthropic-ai/sdk/helpers/beta/json-schema'),
  ])
  const client = new Anthropic({
    apiKey: settings.apiKey || 'proxy',
    baseURL: settings.baseUrl || undefined,
    // L'app non ha un server: la chiave è dello studente e resta nel suo browser.
    dangerouslyAllowBrowser: true,
    maxRetries: 1,
  })

  const smart = supportsEffortAndFallback(settings.model)
  try {
    const response = await client.beta.messages.parse(
      {
        model: settings.model,
        max_tokens: 16000,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: question }],
        output_config: {
          format: betaJSONSchemaOutputFormat(ANSWER_SCHEMA),
          // Domande brevi: basta poco ragionamento, e la risposta arriva prima.
          ...(smart ? { effort: 'low' as const } : {}),
        },
        // Se un filtro di sicurezza rifiuta la richiesta, l'API riprova con un altro modello.
        ...(smart ? { betas: ['server-side-fallback-2026-07-01'], fallbacks: 'default' as const } : {}),
      },
      { signal },
    )

    if (response.stop_reason === 'refusal') {
      throw new AiError('L\'assistente non può rispondere a questa richiesta. Prova a riformularla.')
    }
    if (response.stop_reason === 'max_tokens') {
      throw new AiError('La risposta è stata interrotta perché troppo lunga. Prova con una domanda più specifica.')
    }
    const parsed = response.parsed_output
    if (!parsed) throw new AiError('Risposta non valida dall\'assistente. Riprova.')

    return {
      note: parsed.note,
      answers: parsed.answers
        .filter((a) => a.latex.trim())
        .map((a) => {
          const latex = stripDelimiters(a.latex)
          return { latex, description: a.description, error: renderTex(latex).error }
        }),
    }
  } catch (err) {
    if (err instanceof AiError) throw err
    if (err instanceof Anthropic.APIUserAbortError) throw new AiError('Richiesta annullata.')
    if (err instanceof Anthropic.AuthenticationError) throw new AiError('La chiave API non è valida. Controllala nelle impostazioni.')
    if (err instanceof Anthropic.PermissionDeniedError) throw new AiError('La chiave API non ha i permessi per questo modello.')
    if (err instanceof Anthropic.NotFoundError) throw new AiError('Modello non trovato: scegline un altro nelle impostazioni.')
    if (err instanceof Anthropic.RateLimitError) throw new AiError('Troppe richieste in poco tempo: riprova tra qualche secondo.')
    if (err instanceof Anthropic.BadRequestError) throw new AiError(`Richiesta non valida: ${err.message}`)
    if (err instanceof Anthropic.APIConnectionError) throw new AiError('Impossibile contattare l\'assistente: controlla la connessione.')
    if (err instanceof Anthropic.APIError) throw new AiError(`Errore del servizio (${err.status ?? '?'}): ${err.message}`)
    throw new AiError(err instanceof Error ? err.message : String(err))
  }
}
