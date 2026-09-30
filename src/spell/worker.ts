import { createSpellService, type SpellRequest } from './service'

/**
 * Il correttore gira in un worker: caricare i dizionari e cercare le
 * correzioni non rallenta l'editor.
 */
const handle = createSpellService()

self.addEventListener('message', (ev: MessageEvent<{ id: number; req: SpellRequest }>) => {
  const { id, req } = ev.data
  handle(req).then(
    (value) => self.postMessage({ id, value }),
    (err: unknown) => self.postMessage({ id, error: err instanceof Error ? err.message : String(err) }),
  )
})
