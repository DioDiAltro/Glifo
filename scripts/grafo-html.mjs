/**
 * Rifà graphify-out/graph.html, la pagina interattiva del grafo del codice, da graphify-out/graph.json.
 *   node scripts/grafo-html.mjs
 * I nomi dei gruppi li prende da graph.json: senza, la pagina li chiama «Community N», e quelli in
 * graphify-out/.graphify_labels.json possono essere di un altro grafo (per esempio quello rifatto
 * dall'hook git dopo un commit). Serve graphify (lo installa l'hook SessionStart).
 */
import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const graphFile = join(root, 'graphify-out', 'graph.json')

const names = {}
for (const node of JSON.parse(readFileSync(graphFile, 'utf8')).nodes) {
  if (node.community_name && !(node.community in names)) names[node.community] = node.community_name
}
const namesFile = join(mkdtempSync(join(tmpdir(), 'grafo-')), 'nomi.json')
writeFileSync(namesFile, JSON.stringify(names))

execFileSync('graphify', ['export', 'html', '--graph', graphFile, '--labels', namesFile], {
  cwd: root,
  stdio: 'inherit',
})
