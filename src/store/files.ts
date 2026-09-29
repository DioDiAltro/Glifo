import { hostDownloads, inClaudeViewer } from '../host'

/**
 * Apertura e salvataggio di file .md. Su Chrome/Edge usa la File System
 * Access API (si può risalvare sullo stesso file, come in VS Code); sugli
 * altri browser si ripiega su "carica file" e "scarica".
 */

interface PickerType {
  description: string
  accept: Record<string, string[]>
}

interface FsWindow {
  showOpenFilePicker?: (opts: { multiple?: boolean; types?: PickerType[] }) => Promise<FileSystemFileHandle[]>
  showSaveFilePicker?: (opts: { suggestedName?: string; types?: PickerType[] }) => Promise<FileSystemFileHandle>
}

const MD_TYPES: PickerType[] = [
  { description: 'Appunti Markdown', accept: { 'text/markdown': ['.md', '.markdown', '.txt'] } },
]

export interface OpenedFile {
  name: string
  content: string
  handle?: FileSystemFileHandle
}

function fsWindow(): FsWindow {
  return window as unknown as FsWindow
}

export function canWriteFilesDirectly(): boolean {
  return typeof fsWindow().showSaveFilePicker === 'function' && !inClaudeViewer()
}

function isAbort(err: unknown): boolean {
  return err instanceof DOMException && err.name === 'AbortError'
}

export async function openMarkdownFiles(): Promise<OpenedFile[]> {
  const w = fsWindow()
  if (w.showOpenFilePicker && !inClaudeViewer()) {
    try {
      const handles = await w.showOpenFilePicker({ multiple: true, types: MD_TYPES })
      return Promise.all(
        handles.map(async (handle) => {
          const file = await handle.getFile()
          return { name: file.name, content: await file.text(), handle }
        }),
      )
    } catch (err) {
      if (isAbort(err)) return []
      // Se l'API fallisce (iframe, permessi…) si usa il metodo classico.
    }
  }
  return pickWithInput()
}

function pickWithInput(): Promise<OpenedFile[]> {
  return new Promise((resolve) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.md,.markdown,.txt,text/markdown,text/plain'
    input.multiple = true
    input.addEventListener('change', async () => {
      const files = [...(input.files ?? [])]
      resolve(await Promise.all(files.map(async (f) => ({ name: f.name, content: await f.text() }))))
    })
    input.addEventListener('cancel', () => resolve([]))
    input.click()
  })
}

/** Nome di file sicuro a partire dal titolo della nota. */
export function fileNameFor(title: string, ext = '.md'): string {
  const base = title
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^\w\s.-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 60)
  return (base || 'appunti') + ext
}

/**
 * Salva il testo: sullo stesso file se abbiamo già un handle, altrimenti
 * chiede dove salvarlo (o lo scarica). Restituisce l'handle usato, se c'è.
 */
export async function saveMarkdownFile(
  name: string,
  content: string,
  handle?: FileSystemFileHandle,
): Promise<FileSystemFileHandle | undefined | null> {
  const w = fsWindow()
  if (inClaudeViewer()) return (await downloadText(name, content, 'text/markdown')) ? undefined : null
  try {
    if (handle && typeof handle.createWritable === 'function') {
      await writeTo(handle, content)
      return handle
    }
    if (w.showSaveFilePicker) {
      const h = await w.showSaveFilePicker({ suggestedName: name, types: MD_TYPES })
      await writeTo(h, content)
      return h
    }
  } catch (err) {
    if (isAbort(err)) return null
    // In caso di errore si ripiega sul download.
  }
  return (await downloadText(name, content, 'text/markdown')) ? undefined : null
}

async function writeTo(handle: FileSystemFileHandle, content: string): Promise<void> {
  const writable = await handle.createWritable()
  await writable.write(content)
  await writable.close()
}

/** Scarica un file di testo; restituisce false se chi guarda rifiuta il salvataggio. */
export async function downloadText(name: string, content: string, type = 'text/plain'): Promise<boolean> {
  const host = await hostDownloads()
  if (host) {
    try {
      await host.save({ filename: name, data: content })
      return true
    } catch {
      return false
    }
  }
  const blob = new Blob([content], { type: `${type};charset=utf-8` })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = name
  document.body.append(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
  return true
}
