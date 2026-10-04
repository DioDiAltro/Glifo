# Graph Report - matherdown  (2026-10-04)

## Corpus Check
- 214 files · ~388,591 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 3406 nodes · 12428 edges · 100 communities (88 shown, 12 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 324 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `63ae56d9`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- powerseries.ts
- parse.ts
- main.ts
- odesolve.ts
- sync.ts
- spec.ts
- arithmetic.ts
- num
- graph/preview.ts
- schema/editor.ts
- symbolic.ts
- h
- svg.ts
- linsys.ts
- SchemaEditor
- vitest
- graph/space.ts
- compile
- numerical.ts
- FoldersStore
- index.ts
- engine.ts
- Rational
- conics.ts
- domain.ts
- MathError
- .renderFormat
- assistant.ts
- toLatex
- account-test.mjs
- spaces.ts
- view3d.ts
- several.ts
- markdown.ts
- logic.ts
- package.json
- spell.test.ts
- namesIn
- editor/lists.ts
- resize.ts
- sheet.ts
- gauss.ts
- NotesStore
- study.ts
- graph.ts
- supabase.ts
- solve.ts
- complex.ts
- distributions.ts
- editor/editor.ts
- page.ts
- graphNote.test.ts
- search.ts
- markers.ts
- probability.ts
- finite.ts
- 20261004091555_note_condivise.sql
- toolbar.ts
- Field
- SidePanel
- Ex
- dependencies
- schema/preview.ts
- MathNode
- settings.ts
- toNode
- editor.test.ts
- templates.ts
- sql.ts
- Benvenuto in Glifo
- compilerOptions
- severalGraph.ts
- math/calculus.ts
- statsGraph.ts
- Glifo
- parseSchema
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- graph/file.ts
- devDependencies
- session-start.sh
- .claude/CLAUDE.md
- Più avanti
- files.ts
- Glifo – note per Claude
- ROADMAP.md
- Il database degli account (Supabase)
- supabase-stub.sql
- Sincronizzazione
- sidePanel.ts
- Account

## God Nodes (most connected - your core abstractions)
1. `MathError` - 149 edges
2. `num()` - 133 edges
3. `mul()` - 112 edges
4. `MathNode` - 110 edges
5. `compile()` - 109 edges
6. `Rational` - 108 edges
7. `Sheet` - 107 edges
8. `toLatex()` - 100 edges
9. `add()` - 90 edges
10. `pow()` - 89 edges

## Surprising Connections (you probably didn't know these)
- `Funzionalità` --references--> `k()`  [INFERRED]
  README.md → src/math/numerical.ts
- `Dove sono le cose` --references--> `shareNote()`  [INFERRED]
  CLAUDE.md → src/account/supabase.ts
- `Dove sono le cose` --references--> `sharedLinks()`  [INFERRED]
  CLAUDE.md → src/account/supabase.ts
- `Dove sono le cose` --references--> `addToGraphBlock()`  [INFERRED]
  CLAUDE.md → src/editor/graphInsert.ts
- `Dove sono le cose` --references--> `isComplexLine()`  [INFERRED]
  CLAUDE.md → src/graph/gauss.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (100 total, 12 thin omitted)

### Community 0 - "powerseries.ts"
Cohesion: 0.12
Nodes (29): fracTex(), fracText(), nearFraction(), piMultiple(), surd(), decimalSeparator(), Digits, FormatOptions (+21 more)

### Community 1 - "parse.ts"
Cohesion: 0.08
Nodes (40): numericPartials(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe() (+32 more)

### Community 2 - "main.ts"
Cohesion: 0.05
Nodes (88): signOut(), unshareNote(), addToGraphBlock(), insertGraphBlock(), graphsForFile(), hide(), graphBlockText(), account (+80 more)

### Community 3 - "odesolve.ts"
Cohesion: 0.08
Nodes (78): addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames(), constantParticular() (+70 more)

### Community 4 - "sync.ts"
Cohesion: 0.05
Nodes (39): @electric-sql/pglite, AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow (+31 more)

### Community 5 - "spec.ts"
Cohesion: 0.06
Nodes (78): conicItems(), isConicLine(), quadricEquation(), fourierItems(), isFourierLine(), multipleOf(), isSeveralLine(), areaOf() (+70 more)

### Community 6 - "arithmetic.ts"
Cohesion: 0.06
Nodes (82): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+74 more)

### Community 7 - "num"
Cohesion: 0.15
Nodes (75): atIntegers(), splitAbs(), withoutAbs(), exp(), hyperbolicToExp(), inverseRational(), sqrtEx(), termTransform() (+67 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (44): addLabel(), boxes, cameras, complexCoord(), coord(), drawings, drawnViews, endTex() (+36 more)

### Community 9 - "schema/editor.ts"
Cohesion: 0.05
Nodes (62): alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ARROW_NAMES, AT_ICONS (+54 more)

### Community 10 - "symbolic.ts"
Cohesion: 0.08
Nodes (53): linearIn(), atValues(), combine(), commonMonomial(), Converter, coordinates(), decimalText(), definiteParts() (+45 more)

### Community 11 - "h"
Cohesion: 0.07
Nodes (41): SyncStatus, openShareDialog(), changeAccess(), changeCopy(), copy(), refreshChanged(), render(), run() (+33 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (52): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), domainEdge(), features() (+44 more)

### Community 13 - "linsys.ts"
Cohesion: 0.13
Nodes (44): rref(), choices(), gcd(), linearSystem(), matrixEquation(), matrixSystem(), minorsGcd(), ONE (+36 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.09
Nodes (8): openSchemaEditor(), SchemaEditor, SchemaEditorOptions, createEdgeCell(), EdgeLook, Schema, serializeSchema(), Template

### Community 15 - "vitest"
Cohesion: 0.08
Nodes (30): vite-plugin-pwa, vitest, staticGraphSvg(), chooseWindow(), chooseBox(), GraphItem, parseGraph(), DrawOptions (+22 more)

### Community 16 - "graph/space.ts"
Cohesion: 0.13
Nodes (48): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+40 more)

### Community 17 - "compile"
Cohesion: 0.09
Nodes (40): areaFor(), constantValue(), Interval, binomial(), compare(), compile(), compileApply(), compileCondition() (+32 more)

### Community 18 - "numerical.ts"
Cohesion: 0.11
Nodes (51): isNumericalLine(), numericalItems(), bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint() (+43 more)

### Community 19 - "FoldersStore"
Cohesion: 0.08
Nodes (18): cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder(), loadClosedFolders(), RemoteFolder (+10 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (41): b, bigops, c, calculus, fn, fr, fractions, functions (+33 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "Rational"
Cohesion: 0.09
Nodes (25): expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactFunction, ExactRandom, exactRoot() (+17 more)

### Community 23 - "conics.ts"
Cohesion: 0.21
Nodes (27): at(), centralCanonical(), Coefficients, coneCanonical(), conicOf(), det2(), det3(), determinant() (+19 more)

### Community 24 - "domain.ts"
Cohesion: 0.08
Nodes (51): constantIntegrand(), depth(), inequalityMargin(), integralRegion, LayeredSolid, Multiple, planeMargin(), PlanePart (+43 more)

### Community 25 - "MathError"
Cohesion: 0.13
Nodes (54): MathError, angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, dataOf() (+46 more)

### Community 26 - ".renderFormat"
Cohesion: 0.15
Nodes (15): fieldInput(), textWidth(), edgeLook(), edgeStyle(), edgeTextAt(), insertSchema(), isEdgeLook(), isNodeLook() (+7 more)

### Community 27 - "assistant.ts"
Cohesion: 0.10
Nodes (21): @anthropic-ai/sdk, AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askThroughHost() (+13 more)

### Community 28 - "toLatex"
Cohesion: 0.11
Nodes (31): names(), STUDY_GRAPH, studyItems(), ACCENT_COMMANDS, COMPLEX_FUNCTIONS, diffLatex(), DISTRIBUTION_LATEX, distributionLatex() (+23 more)

### Community 29 - "account-test.mjs"
Cohesion: 0.07
Nodes (18): login(), waitFor(), b64(), CODE, createFakeSupabase(), handle(), rpc(), session() (+10 more)

### Community 30 - "spaces.ts"
Cohesion: 0.12
Nodes (29): formatRational(), fromRational(), eigenvectors(), EXACT, FLOAT, kernel(), lengthText(), splitRoot() (+21 more)

### Community 31 - "view3d.ts"
Cohesion: 0.09
Nodes (36): Box, Detail, Face, FAST, FINE, planeTolerance(), Plane, Vec3 (+28 more)

### Community 32 - "several.ts"
Cohesion: 0.14
Nodes (36): severalLimit, at(), bounded(), Candidate, candidates(), compiled(), COORDS, coordShown() (+28 more)

### Community 33 - "markdown.ts"
Cohesion: 0.12
Nodes (26): lineDepth(), parseBlockMath(), configurePurify(), createMarkdownIt(), FORBIDDEN_TAGS, HLJS_LANGUAGES, mathBlockRule(), mathInlineRule() (+18 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "package.json"
Cohesion: 0.06
Nodes (30): description, name, private, scripts, build, dev, preview, test (+22 more)

### Community 36 - "spell.test.ts"
Cohesion: 0.08
Nodes (23): mathMarkdown, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt() (+15 more)

### Community 37 - "namesIn"
Cohesion: 0.14
Nodes (35): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+27 more)

### Community 38 - "editor/lists.ts"
Cohesion: 0.10
Nodes (39): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+31 more)

### Community 39 - "resize.ts"
Cohesion: 0.13
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "sheet.ts"
Cohesion: 0.11
Nodes (46): expSumValue(), formatNumber(), complexText(), formatEigenvalues(), Lin, INFERENCE, limitText(), parsed (+38 more)

### Community 41 - "gauss.ts"
Cohesion: 0.15
Nodes (22): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexLine(), isComplexValue() (+14 more)

### Community 42 - "NotesStore"
Cohesion: 0.08
Nodes (29): accountSpace(), adoptGuestNotes(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf(), setCurrentAccount() (+21 more)

### Community 43 - "study.ts"
Cohesion: 0.18
Nodes (29): limit(), Asymptote, compiled(), cutsOf(), defined(), domainOf(), exact(), inDomain() (+21 more)

### Community 44 - "graph.ts"
Cohesion: 0.07
Nodes (30): @maxgraph/core, AT_X, cellHtml(), cellText(), COMPASS, createGraph(), drawSchema(), loadSchema() (+22 more)

### Community 45 - "supabase.ts"
Cohesion: 0.08
Nodes (40): @supabase/supabase-js, AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), accountError, appUrl(), call() (+32 more)

### Community 46 - "solve.ts"
Cohesion: 0.17
Nodes (23): isStandardUnknown(), RelOp, breaks(), cubeRoot(), equation(), holds(), inequality(), minus() (+15 more)

### Community 47 - "complex.ts"
Cohesion: 0.08
Nodes (44): add(), allRoots(), arg(), asin(), atan(), compileApply(), compileComplex(), compileFunction() (+36 more)

### Community 48 - "distributions.ts"
Cohesion: 0.07
Nodes (57): choose(), continuousQuantile(), discreteQuantile(), Distribution, factorialBig(), FAMILIES, Family, integerParam() (+49 more)

### Community 49 - "editor/editor.ts"
Cohesion: 0.06
Nodes (27): @codemirror/commands, @codemirror/language, EditorCallbacks, highlight, italianPhrases, MarkdownEditor, insertTemplate(), listMarkers (+19 more)

### Community 50 - "page.ts"
Cohesion: 0.11
Nodes (20): currentAccount(), SharedNote, body, draw(), isDark(), load(), saveButton, saveCopy() (+12 more)

### Community 51 - "graphNote.test.ts"
Cohesion: 0.12
Nodes (18): @codemirror/lang-markdown, acceptCalcResult(), calcPlugin, CalcResult, calcResults(), formulasUntil(), insertResult(), ResultWidget (+10 more)

### Community 52 - "search.ts"
Cohesion: 0.16
Nodes (24): editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex() (+16 more)

### Community 53 - "markers.ts"
Cohesion: 0.11
Nodes (37): Item, ListStyle, bullet(), bulletGroup(), childMarker(), column(), firstMarker(), label() (+29 more)

### Community 54 - "probability.ts"
Cohesion: 0.12
Nodes (26): addExp(), End, exactIntervalProbability(), subtractExp(), ExactScope, fractionNear(), ALL, complement() (+18 more)

### Community 55 - "finite.ts"
Cohesion: 0.17
Nodes (28): countOf(), elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError, FiniteResult (+20 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "toolbar.ts"
Cohesion: 0.20
Nodes (14): insertBlock(), InsertOptions, toggleLinePrefix(), wrapSelection(), Action, createToolbar(), insertCode(), insertLink() (+6 more)

### Community 58 - "Field"
Cohesion: 0.12
Nodes (7): characteristicPolynomial(), eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn()

### Community 59 - "SidePanel"
Cohesion: 0.18
Nodes (9): cache, cleanKatexError(), renderTex(), renderTexOrError(), renderTexWithResult(), TexRender, displayCode(), preventFocusSteal() (+1 more)

### Community 60 - "Ex"
Cohesion: 0.14
Nodes (17): close(), Definite, definiteIntegral(), exValue(), samples(), Piece, LimitValue, Condition (+9 more)

### Community 61 - "dependencies"
Cohesion: 0.09
Nodes (23): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+15 more)

### Community 62 - "schema/preview.ts"
Cohesion: 0.20
Nodes (12): GraphLook, Look, Theme, draw(), drawCached(), drawn, errorHtml(), fill() (+4 more)

### Community 63 - "MathNode"
Cohesion: 0.06
Nodes (52): Dove sono le cose, Definition, Line, ExactComplexScope, ConicElements, ConicInfo, Ode, withWorkLimit() (+44 more)

### Community 64 - "settings.ts"
Cohesion: 0.11
Nodes (24): addPersonalWord(), DICTIONARY_KEY, loadPersonalWords(), savePersonalWords(), tidy(), ACCOUNT_SETTINGS, accountSettings(), AI_MODELS (+16 more)

### Community 65 - "toNode"
Cohesion: 0.24
Nodes (13): close(), fourierShown(), isZero(), numericCoefficients(), partialSum(), shown(), value(), withSpecials() (+5 more)

### Community 66 - "editor.test.ts"
Cohesion: 0.08
Nodes (23): @codemirror/state, @codemirror/view, @lezer/common, tabOutOfMath(), templateInsertion(), CODE_NODES, CommandToken, commandTokenAt() (+15 more)

### Community 67 - "templates.ts"
Cohesion: 0.15
Nodes (12): SchemaEdge, SchemaNode, conceptMap, cycle, er, flowchart, node(), NodeExtra (+4 more)

### Community 68 - "sql.ts"
Cohesion: 0.17
Nodes (17): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+9 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "severalGraph.ts"
Cohesion: 0.28
Nodes (12): FieldContext, criticalLine(), named(), severalItems(), surface(), Scope, FiniteContext, LinearScope (+4 more)

### Community 72 - "math/calculus.ts"
Cohesion: 0.37
Nodes (11): argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot(), fieldOn(), outward() (+3 more)

### Community 73 - "statsGraph.ts"
Cohesion: 0.22
Nodes (15): isTestLine(), number(), testItems(), classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX (+7 more)

### Community 74 - "Glifo"
Cohesion: 0.20
Nodes (10): Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Funzionalità, Glifo, Idee per il futuro (+2 more)

### Community 75 - "parseSchema"
Cohesion: 0.17
Nodes (15): base64(), hide(), OPEN, schemasForFile(), schemasFromFile(), unhide(), isRecord(), num() (+7 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "graph/file.ts"
Cohesion: 0.33
Nodes (9): graphImage(), graphImagesFor(), graphsFromFile(), OPEN, unhide(), areaColor(), graphTitle(), itemColors() (+1 more)

### Community 79 - "devDependencies"
Cohesion: 0.22
Nodes (9): devDependencies, @electric-sql/pglite, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite, vite-plugin-pwa (+1 more)

### Community 82 - "Più avanti"
Cohesion: 0.22
Nodes (9): Abbonamento e funzioni a pagamento (da capire), Aiuto con gli esercizi, Calcoli e grafici: idee in più, Matematica per i corsi: idee in più, Non solo appunti, Più avanti, Schemi: idee in più, Trascrizione delle lezioni in appunti (+1 more)

### Community 83 - "files.ts"
Cohesion: 0.24
Nodes (13): inClaudeViewer(), canWriteFilesDirectly(), downloadBlob(), downloadText(), FsWindow, isAbort(), MD_TYPES, OpenedFile (+5 more)

### Community 90 - "Glifo – note per Claude"
Cohesion: 0.25
Nodes (7): Comandi, Come controllare il lavoro, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole, sqlite()

### Community 91 - "ROADMAP.md"
Cohesion: 0.29
Nodes (5): Account: i propri appunti su ogni dispositivo, anche da condividere, Altre idee, Controllare e mostrare quello che si scrive, Idee per il futuro, In programma

### Community 92 - "Il database degli account (Supabase)"
Cohesion: 0.25
Nodes (8): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Nell'app, Note condivise con un link

### Community 96 - "Sincronizzazione"
Cohesion: 0.50
Nodes (3): Sincronizzazione, `sync_pull({ since })`: scarica le novità, `sync_push({ changes })`: manda le modifiche

### Community 97 - "sidePanel.ts"
Cohesion: 0.20
Nodes (14): SuggestionItem, isConfidentAnswer(), CATEGORIES, symbolsInCategory(), cardPreviewTex(), formPreviewTex(), ParsedTemplate, parseTemplate() (+6 more)

### Community 98 - "Account"
Cohesion: 0.67
Nodes (3): Account, Condividere una nota con un link, Usarla tutti i giorni

## Knowledge Gaps
- **476 isolated node(s):** `session-start.sh script`, `name`, `private`, `version`, `description` (+471 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 647 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `main.ts`, `sync.ts`, `num`, `schema/editor.ts`, `svg.ts`, `linsys.ts`, `graph/space.ts`, `compile`, `FoldersStore`, `assistant.ts`, `toLatex`, `spaces.ts`, `markdown.ts`, `package.json`, `spell.test.ts`, `editor/lists.ts`, `resize.ts`, `NotesStore`, `supabase.ts`, `distributions.ts`, `editor/editor.ts`, `page.ts`, `graphNote.test.ts`, `search.ts`, `markers.ts`, `MathNode`, `settings.ts`, `editor.test.ts`, `sql.ts`, `parseSchema`, `sidePanel.ts`?**
  _High betweenness centrality (0.103) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `MathNode` to `powerseries.ts`, `parse.ts`, `main.ts`, `odesolve.ts`, `spec.ts`, `arithmetic.ts`, `num`, `graph/preview.ts`, `schema/editor.ts`, `symbolic.ts`, `h`, `svg.ts`, `linsys.ts`, `graph/space.ts`, `numerical.ts`, `Rational`, `MathError`, `.renderFormat`, `toLatex`, `several.ts`, `markdown.ts`, `logic.ts`, `namesIn`, `sheet.ts`, `gauss.ts`, `study.ts`, `graph.ts`, `supabase.ts`, `complex.ts`, `distributions.ts`, `finite.ts`, `Ex`, `toNode`, `Glifo – note per Claude`?**
  _High betweenness centrality (0.053) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `settings.ts`, `sidePanel.ts`, `main.ts`, `spell.test.ts`, `resize.ts`, `schema/editor.ts`, `SchemaEditor`, `page.ts`, `FoldersStore`, `toolbar.ts`, `.renderFormat`, `SidePanel`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **What connects `session-start.sh script`, `name`, `private` to the rest of the system?**
  _476 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `powerseries.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11895161290322581 - nodes in this community are weakly interconnected._
- **Should `parse.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07532084998948033 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.050915211445402904 - nodes in this community are weakly interconnected._