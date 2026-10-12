import { hostSample, isHostError } from '../host'
import { byLang, pick, texts } from '../i18n'
import { renderTex } from '../render/katex'
import { aiService, type AiServiceId } from './services'

// Gli errori per chi usa Glifo e quello che il modello legge, nella lingua di Glifo.
const T = texts({
  cancelled: ['Richiesta annullata.', 'Request cancelled.'],
  notGranted: ['Hai scelto di non permettere a questa pagina di usare Claude.', 'You chose not to let this page use Claude.'],
  rateLimited: ['Troppe richieste in poco tempo: riprova tra qualche secondo.', 'Too many requests in a short time: try again in a few seconds.'],
  refused: ['L\'assistente non può rispondere a questa richiesta. Prova a riformularla.', 'The assistant can\'t answer this request. Try rephrasing it.'],
  invalidAnswer: ['Risposta non valida dall\'assistente. Riprova.', 'Invalid answer from the assistant. Try again.'],
  samplingDisabled: ['Claude non è disponibile per questo account.', 'Claude isn\'t available for this account.'],
  hostUnreachable: ['Impossibile contattare l\'assistente in questo momento. Riprova più tardi.', 'Can\'t reach the assistant right now. Try again later.'],
  noUrl: [
    'Scrivi nelle impostazioni l\'indirizzo del servizio (per esempio https://api.openai.com/v1).',
    'Enter the service\'s URL in Settings (for example https://api.openai.com/v1).',
  ],
  needsKey: (service: string) => [
    `Per usare ${service} serve una chiave: inseriscila nelle impostazioni (resta salvata solo in questo browser).`,
    `To use ${service} you need a key: enter it in Settings (it's saved only in this browser).`,
  ],
  noModel: ['Scrivi nelle impostazioni il nome del modello da usare.', 'Enter the name of the model to use in Settings.'],
  ollamaDown: [
    'Ollama non risponde: è acceso? Deve anche permettere le richieste da Glifo (OLLAMA_ORIGINS: vedi il README, «Assistente AI»).',
    'Ollama isn\'t responding: is it running? It must also allow requests from Glifo (OLLAMA_ORIGINS: see the README, “Assistente AI”).',
  ],
  cantReach: (service: string, compatible: boolean) => [
    `Impossibile contattare ${service}: controlla la connessione${compatible ? ' e l\'indirizzo nelle impostazioni' : ''}.`,
    `Can't reach ${service}: check your connection${compatible ? ' and the URL in Settings' : ''}.`,
  ],
  badKey: (service: string) => [
    `La chiave di ${service} non è valida (o non ha i permessi): controllala nelle impostazioni.`,
    `The key for ${service} isn't valid (or doesn't have the permissions): check it in Settings.`,
  ],
  notInOllama: (model: string) => [
    `Il modello «${model}» non è in Ollama: scaricalo con «ollama pull ${model}», o scegline un altro nelle impostazioni.`,
    `The model “${model}” isn't in Ollama: download it with “ollama pull ${model}”, or choose another one in Settings.`,
  ],
  modelNotFound: (model: string) => [
    `Il modello «${model}» non si trova: controlla il nome nelle impostazioni.`,
    `The model “${model}” can't be found: check its name in Settings.`,
  ],
  tooManyRequests: [
    'Troppe richieste in poco tempo (o è finito il limite gratuito): riprova tra poco, o scegli un altro modello.',
    'Too many requests in a short time (or the free limit has run out): try again shortly, or choose another model.',
  ],
  serviceDown: (service: string, status: number) => [
    `${service} ha un problema in questo momento (${status}): riprova più tardi.`,
    `${service} is having a problem right now (${status}): try again later.`,
  ],
  invalidRequest: (status: number, message: string) => [
    `Richiesta non valida (${status})${message ? `: ${message}` : ''}`,
    `Invalid request (${status})${message ? `: ${message}` : ''}`,
  ],
  tooLong: [
    'La risposta è stata interrotta perché troppo lunga. Prova con una domanda più specifica.',
    'The answer was cut off because it was too long. Try a more specific question.',
  ],
  wrongShape: [
    'Risposta non valida dall\'assistente (il modello non ha risposto nella forma chiesta). Riprova, o scegli un altro modello.',
    'Invalid answer from the assistant (the model didn\'t answer in the requested format). Try again, or choose another model.',
  ],
  needsApiKey: [
    'Per usare l\'assistente AI serve una chiave API: inserisci nelle impostazioni quella di Anthropic, o scegli un altro servizio (con Gemini è gratis). Resta salvata solo in questo browser.',
    'To use the AI assistant you need an API key: enter your Anthropic key in Settings, or choose another service (Gemini is free). It\'s saved only in this browser.',
  ],
  invalidKey: ['La chiave API non è valida. Controllala nelle impostazioni.', 'The API key isn\'t valid. Check it in Settings.'],
  noPermission: ['La chiave API non ha i permessi per questo modello.', 'The API key doesn\'t have permission to use this model.'],
  noSuchModel: ['Modello non trovato: scegline un altro nelle impostazioni.', 'Model not found: choose another one in Settings.'],
  badRequest: (message: string) => [`Richiesta non valida: ${message}`, `Invalid request: ${message}`],
  noConnection: ['Impossibile contattare l\'assistente: controlla la connessione.', 'Can\'t reach the assistant: check your connection.'],
  apiError: (status: string, message: string) => [`Errore del servizio (${status}): ${message}`, `Service error (${status}): ${message}`],
  // Lo schema della risposta, per il modello.
  latexField: ['Codice LaTeX compatibile con KaTeX, senza delimitatori $', 'KaTeX-compatible LaTeX code, without $ delimiters'],
  descriptionField: ['Spiegazione breve in italiano', 'Short explanation in English'],
  studentQuestion: ['Domanda dello studente:', 'The student\'s question:'],
})

/**
 * Assistente AI per le domande che la ricerca locale non sa risolvere
 * ("come scrivo una freccia con sopra n → ∞?"). Usa l'API di Claude con la
 * chiave dello studente, salvata solo nel suo browser. L'SDK viene caricato
 * solo quando serve, così l'app resta leggera. Con un altro servizio (Gemini,
 * OpenRouter, Ollama…, vedi services.ts) parla la «lingua» di OpenAI, con fetch.
 */

export interface AiSettings {
  apiKey: string
  model: string
  baseUrl?: string
  /** Il servizio: Anthropic se manca; per gli altri `baseUrl` è l'indirizzo della loro API. */
  service?: AiServiceId
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
  /** Il modello che ha risposto, se il servizio lo dice (si mostra sotto la risposta). */
  model?: string
}

export class AiError extends Error {}

/** Le istruzioni per il modello, nella lingua di Glifo: con Glifo in inglese risponde in inglese. */
function systemPrompt(): string {
  return byLang({
    it: () => `Sei l'assistente di Glifo, un editor di appunti universitari in Markdown in cui le formule si scrivono in LaTeX tra $…$ e vengono disegnate con KaTeX.

Lo studente ti chiede come scrivere un simbolo, una notazione o una formula. Rispondi con il codice LaTeX da inserire dentro la formula, senza i delimitatori $.

- Usa solo comandi supportati da KaTeX: niente \\usepackage, \\newcommand, \\def o pacchetti esterni. Per la chimica è disponibile \\ce{…} (mhchem).
- Proponi da 1 a 4 alternative, dalla più comune alla meno comune. Per un simbolo singolo di solito ne basta una.
- In "description" scrivi una frase breve in italiano che dice cosa produce il codice e quando usarlo.
- Se la richiesta non riguarda simboli o formule, lascia "answers" vuoto e spiega in "note" in che cosa puoi aiutare.
- "note" può contenere un consiglio di una frase; altrimenti lascialo vuoto.`,
    en: () => `You are the assistant of Glifo, an editor for university notes in Markdown, where formulas are written in LaTeX between $…$ and drawn with KaTeX.

The student asks you how to write a symbol, a notation or a formula. Answer with the LaTeX code to put inside the formula, without the $ delimiters.

- Use only commands supported by KaTeX: no \\usepackage, \\newcommand, \\def or external packages. For chemistry, \\ce{…} (mhchem) is available.
- Suggest 1 to 4 alternatives, from the most common to the least common. For a single symbol, one is usually enough.
- In "description" write a short sentence in English that says what the code produces and when to use it.
- If the request isn't about symbols or formulas, leave "answers" empty and explain in "note" what you can help with.
- "note" can contain a one-sentence tip; otherwise leave it empty.
- Always write in English, even if the question is in another language.`,
  })
}

/** Lo schema della risposta, con le descrizioni dei campi nella lingua di Glifo. */
function answerSchema() {
  return {
    type: 'object',
    properties: {
      answers: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            latex: { type: 'string', description: T.latexField },
            description: { type: 'string', description: T.descriptionField },
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
}

/** Modelli che accettano `effort` e i fallback lato server. */
function supportsEffortAndFallback(model: string): boolean {
  return model === 'claude-opus-5-5' || model === 'claude-sonnet-5-5'
}

function stripDelimiters(latex: string): string {
  const t = latex.trim()
  const m = /^\$\$([\s\S]*)\$\$$/.exec(t) ?? /^\$([\s\S]*)\$$/.exec(t) ?? /^\\\(([\s\S]*)\\\)$/.exec(t)
  return (m ? m[1] : t).trim()
}

function toResult(parsed: { answers: { latex: string; description: string }[]; note: string }): AiResult {
  return {
    note: parsed.note,
    answers: parsed.answers
      .filter((a) => a.latex.trim())
      .map((a) => {
        const latex = stripDelimiters(a.latex)
        return { latex, description: a.description, error: renderTex(latex).error }
      }),
  }
}

/** Controlla la forma della risposta (quando non è garantita dall'API). */
function checkShape(data: unknown): { answers: { latex: string; description: string }[]; note: string } {
  const d = data as { answers?: unknown; note?: unknown } | null
  const answers = Array.isArray(d?.answers) ? d.answers : []
  return {
    note: typeof d?.note === 'string' ? d.note : '',
    answers: answers
      .map((a) => a as { latex?: unknown; description?: unknown })
      .filter((a) => typeof a.latex === 'string')
      .map((a) => ({ latex: String(a.latex), description: typeof a.description === 'string' ? a.description : '' })),
  }
}

/**
 * Nella demo pubblicata su claude.ai si usa l'account Claude di chi la
 * apre (con il suo consenso), senza bisogno di una chiave API.
 */
async function askThroughHost(question: string, signal?: AbortSignal): Promise<AiResult | null> {
  const sample = await hostSample()
  if (!sample) return null
  const prompt = `${systemPrompt()}

${jsonOnly()}

${T.studentQuestion}
${question}`
  try {
    return toResult(checkShape(await sample.json(prompt, { modelTier: 'quick', signal })))
  } catch (err) {
    const code = isHostError(err) ? err.code : ''
    if (code === 'cancelled') throw new AiError(T.cancelled)
    if (code === 'not_granted') throw new AiError(T.notGranted)
    if (code === 'rate_limited') throw new AiError(T.rateLimited)
    if (code === 'refused') throw new AiError(T.refused)
    if (code === 'invalid_json') throw new AiError(T.invalidAnswer)
    if (code === 'sampling_disabled') throw new AiError(T.samplingDisabled)
    throw new AiError(T.hostUnreachable)
  }
}

/** Per i modelli che non sanno seguire lo schema: la forma della risposta, scritta. */
function jsonOnly(): string {
  return byLang({
    it: () => `Rispondi solo con un oggetto JSON di questa forma, senza altro testo:
{"answers": [{"latex": "\\\\infty", "description": "Il simbolo di infinito."}], "note": ""}`,
    en: () => `Answer only with a JSON object of this shape, with no other text:
{"answers": [{"latex": "\\\\infty", "description": "The infinity symbol."}], "note": ""}`,
  })
}

/** «il servizio» → «Il servizio», all'inizio di una frase. */
function capitalized(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1)
}

/** L'oggetto JSON nella risposta, anche tra ```json … ```, dopo il ragionamento (<think>) o con del testo attorno. */
export function jsonIn(text: string): unknown {
  const clean = text.replace(/<think>[\s\S]*?<\/think>/g, '').trim()
  for (const candidate of [clean, /```(?:json)?\s*([\s\S]*?)```/.exec(clean)?.[1], clean.slice(clean.indexOf('{'), clean.lastIndexOf('}') + 1)]) {
    if (!candidate?.trim()) continue
    try {
      return JSON.parse(candidate)
    } catch {
      // Si prova il prossimo modo.
    }
  }
  return null
}

/** Il messaggio d'errore del servizio, se nella risposta c'è (di solito in error.message). */
function serviceMessage(body: string): string {
  try {
    const data = JSON.parse(body) as { error?: { message?: unknown } | string; message?: unknown } | Array<{ error?: { message?: unknown } }>
    const first = Array.isArray(data) ? data[0] : data
    const error = first?.error
    const message = typeof error === 'string' ? error : (error as { message?: unknown } | undefined)?.message ?? (first as { message?: unknown } | undefined)?.message
    if (typeof message === 'string' && message.trim()) return message.trim().slice(0, 300)
  } catch {
    // Non è JSON: il testo com'è.
  }
  return body.trim().slice(0, 300)
}

/**
 * Una domanda a un servizio che parla la «lingua» di OpenAI (/chat/completions): Gemini, OpenRouter,
 * Ollama o un altro. Si chiede la risposta con lo schema; se il servizio non lo accetta, come oggetto
 * JSON; se no, solo con la forma scritta nelle istruzioni. La risposta si legge comunque con jsonIn.
 */
async function askCompatible(question: string, settings: AiSettings, signal?: AbortSignal): Promise<AiResult> {
  const service = aiService(settings.service)
  const base = (settings.baseUrl || service.url).trim().replace(/\/+$/, '').replace(/\/chat\/completions$/, '')
  if (!base) throw new AiError(T.noUrl)
  if (service.needsKey && !settings.apiKey) {
    throw new AiError(T.needsKey(service.name))
  }
  const model = settings.model || service.model
  if (!model) throw new AiError(T.noModel)
  const messages = [
    { role: 'system', content: `${systemPrompt()}\n\n${jsonOnly()}` },
    { role: 'user', content: question },
  ]
  const formats: (Record<string, unknown> | null)[] = [
    { type: 'json_schema', json_schema: { name: pick(['risposta', 'answer']), strict: true, schema: answerSchema() } },
    { type: 'json_object' },
    null,
  ]
  for (let i = 0; i < formats.length; i++) {
    const format = formats[i]
    let response: Response
    try {
      response = await fetch(`${base}/chat/completions`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          ...(settings.apiKey && { authorization: `Bearer ${settings.apiKey}` }),
          // OpenRouter mostra da quale app arrivano le richieste.
          ...(service.id === 'openrouter' && { 'X-Title': 'Glifo' }),
        },
        body: JSON.stringify({ model, messages, ...(format && { response_format: format }) }),
        signal,
      })
    } catch (err) {
      if (signal?.aborted || (err instanceof DOMException && err.name === 'AbortError')) throw new AiError(T.cancelled)
      throw new AiError(service.id === 'ollama' ? T.ollamaDown : T.cantReach(service.name, service.id === 'compatible'))
    }
    if (!response.ok) {
      const body = await response.text().catch(() => '')
      // Lo schema (o il formato JSON) non va bene a questo servizio o a questo modello: senza.
      if ((response.status === 400 || response.status === 422) && format && i < formats.length - 1) continue
      const message = serviceMessage(body)
      if (response.status === 401 || response.status === 403) throw new AiError(T.badKey(service.name))
      if (response.status === 404) throw new AiError(service.id === 'ollama' ? T.notInOllama(model) : T.modelNotFound(model))
      if (response.status === 429) throw new AiError(T.tooManyRequests)
      if (response.status >= 500) throw new AiError(T.serviceDown(capitalized(service.name), response.status))
      throw new AiError(T.invalidRequest(response.status, message))
    }
    const data = (await response.json().catch(() => null)) as { model?: unknown; choices?: { message?: { content?: unknown; refusal?: unknown }; finish_reason?: unknown }[] } | null
    const choice = data?.choices?.[0]
    if (typeof choice?.message?.refusal === 'string' && choice.message.refusal) throw new AiError(T.refused)
    const content = choice?.message?.content
    const text = typeof content === 'string' ? content : Array.isArray(content) ? content.map((p) => (typeof p === 'string' ? p : (p as { text?: unknown })?.text ?? '')).join('') : ''
    const parsed = text ? jsonIn(text) : null
    if (!parsed || typeof parsed !== 'object') {
      if (choice?.finish_reason === 'length') throw new AiError(T.tooLong)
      throw new AiError(T.wrongShape)
    }
    const result = toResult(checkShape(parsed))
    return typeof data?.model === 'string' && data.model ? { ...result, model: data.model } : { ...result, model }
  }
  throw new AiError(T.invalidAnswer)
}

export async function askAi(question: string, settings: AiSettings, signal?: AbortSignal): Promise<AiResult> {
  if (settings.service && settings.service !== 'anthropic') return askCompatible(question, settings, signal)
  if (!settings.apiKey && !settings.baseUrl) {
    const viaHost = await askThroughHost(question, signal)
    if (viaHost) return viaHost
    throw new AiError(T.needsApiKey)
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
        system: systemPrompt(),
        messages: [{ role: 'user', content: question }],
        output_config: {
          format: betaJSONSchemaOutputFormat(answerSchema()),
          // Domande brevi: basta poco ragionamento, e la risposta arriva prima.
          ...(smart ? { effort: 'low' as const } : {}),
        },
        // Se un filtro di sicurezza rifiuta la richiesta, l'API riprova con un altro modello.
        ...(smart ? { betas: ['server-side-fallback-2026-07-01'], fallbacks: 'default' as const } : {}),
      },
      { signal },
    )

    if (response.stop_reason === 'refusal') {
      throw new AiError(T.refused)
    }
    if (response.stop_reason === 'max_tokens') {
      throw new AiError(T.tooLong)
    }
    const parsed = response.parsed_output
    if (!parsed) throw new AiError(T.invalidAnswer)
    return { ...toResult(parsed), ...(response.model && { model: response.model }) }
  } catch (err) {
    if (err instanceof AiError) throw err
    if (err instanceof Anthropic.APIUserAbortError) throw new AiError(T.cancelled)
    if (err instanceof Anthropic.AuthenticationError) throw new AiError(T.invalidKey)
    if (err instanceof Anthropic.PermissionDeniedError) throw new AiError(T.noPermission)
    if (err instanceof Anthropic.NotFoundError) throw new AiError(T.noSuchModel)
    if (err instanceof Anthropic.RateLimitError) throw new AiError(T.rateLimited)
    if (err instanceof Anthropic.BadRequestError) throw new AiError(T.badRequest(err.message))
    if (err instanceof Anthropic.APIConnectionError) throw new AiError(T.noConnection)
    if (err instanceof Anthropic.APIError) throw new AiError(T.apiError(String(err.status ?? '?'), err.message))
    throw new AiError(err instanceof Error ? err.message : String(err))
  }
}
