# Graph Report - matherdown  (2026-10-04)

## Corpus Check
- 218 files · ~395,627 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 3455 nodes · 12526 edges · 106 communities (92 shown, 14 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 330 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `eaf13afb`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- solve.ts
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
- graph.ts
- svg.ts
- linsys.ts
- SchemaEditor
- vitest
- view3d.ts
- MathError
- numerical.ts
- FoldersStore
- index.ts
- engine.ts
- Rational
- conics.ts
- several.ts
- linear.ts
- h
- assistant.ts
- spell.test.ts
- fake-supabase.mjs
- spaces.ts
- graph/file.ts
- schemaTools.test.ts
- markdown.ts
- logic.ts
- devDependencies
- graphNote.test.ts
- Dove sono le cose
- gauss.ts
- resize.ts
- sheet.ts
- files.ts
- NotesStore
- study.ts
- parseSchema
- supabase.ts
- probability.ts
- complex.ts
- distributions.ts
- editor/editor.ts
- page.ts
- severalGraph.ts
- search.ts
- editor/lists.ts
- scopeWith
- latex.ts
- 20261004091555_note_condivise.sql
- insert.ts
- .int
- SidePanel
- shapes.ts
- dependencies
- schema/preview.ts
- database.ts
- scripts
- markers.ts
- suggestions.ts
- tutorial.mjs
- templates.ts
- Benvenuto in Glifo
- compilerOptions
- vite.config.ts
- settings.ts
- statsGraph.ts
- editor.test.ts
- toolbar.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- limits.ts
- session-start.sh
- .claude/CLAUDE.md
- Glifo
- sidePanel.ts
- toNode
- supabase-stub.sql
- account-test.mjs
- Più avanti
- AccountSync
- Glifo – note per Claude
- toLatex
- MathNode
- ROADMAP.md
- grafo-html.mjs
- Il database degli account (Supabase)
- createFakeSupabase
- Sincronizzazione
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
- `Dove sono le cose` --references--> `NumericContext`  [INFERRED]
  CLAUDE.md → src/math/numerical.ts
- `Dove sono le cose` --references--> `expSum`  [INFERRED]
  CLAUDE.md → src/math/distributions.ts
- `Dove sono le cose` --references--> `GaussRational`  [INFERRED]
  CLAUDE.md → src/math/complex.ts
- `Dove sono le cose` --references--> `Shape`  [INFERRED]
  CLAUDE.md → src/math/odesolve.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (106 total, 14 thin omitted)

### Community 0 - "solve.ts"
Cohesion: 0.13
Nodes (31): FiniteContext, nameLatex(), LinearScope, isStandardUnknown(), linearSystem(), matrixEquation(), matrixSystem(), RelOp (+23 more)

### Community 1 - "parse.ts"
Cohesion: 0.08
Nodes (38): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe(), differentialInFraction() (+30 more)

### Community 2 - "main.ts"
Cohesion: 0.05
Nodes (89): graphsForFile(), hide(), account, accountButton, accountProblem(), active, app, applyAccountChange() (+81 more)

### Community 3 - "odesolve.ts"
Cohesion: 0.08
Nodes (82): linearIn(), addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames() (+74 more)

### Community 4 - "sync.ts"
Cohesion: 0.08
Nodes (28): EMPTY_STATE, FolderChange, FolderRow, isEmpty(), iso(), LocalChange, merge(), ms() (+20 more)

### Community 5 - "spec.ts"
Cohesion: 0.07
Nodes (68): conicItems(), isConicLine(), quadricEquation(), isTestLine(), testItems(), areaOf(), AXES, blockLines() (+60 more)

### Community 6 - "arithmetic.ts"
Cohesion: 0.07
Nodes (73): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+65 more)

### Community 7 - "num"
Cohesion: 0.15
Nodes (74): atIntegers(), withoutAbs(), exp(), hyperbolicToExp(), inverseRational(), sqrtEx(), termTransform(), polyEx() (+66 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (45): addLabel(), boxes, cameras, complexCoord(), coord(), drawings, drawnViews, endTex() (+37 more)

### Community 9 - "schema/editor.ts"
Cohesion: 0.06
Nodes (52): ALIGN, ARROW_NAMES, AT_ICONS, AT_NAMES, BASE_PRESETS, BIG_ARROWS, DB_PRESETS, Direction (+44 more)

### Community 10 - "symbolic.ts"
Cohesion: 0.08
Nodes (51): atValues(), Converter, coordinates(), decimalText(), definiteParts(), degree(), denominatorPart(), denominators() (+43 more)

### Community 11 - "graph.ts"
Cohesion: 0.12
Nodes (26): fieldInput(), textWidth(), AT_X, cellHtml(), cellText(), COMPASS, createGraph(), drawSchema() (+18 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (50): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), domainEdge(), features() (+42 more)

### Community 13 - "linsys.ts"
Cohesion: 0.15
Nodes (38): factorsOf(), choices(), minorsGcd(), ONE, parametricRows(), parametricSystem(), PARAMS, polyDeterminant() (+30 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.10
Nodes (3): SchemaEditor, createEdgeCell(), serializeSchema()

### Community 15 - "vitest"
Cohesion: 0.08
Nodes (30): vitest, staticGraphSvg(), chooseWindow(), chooseBox(), GraphItem, parseGraph(), graphSvg(), PALETTES (+22 more)

### Community 16 - "view3d.ts"
Cohesion: 0.08
Nodes (70): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+62 more)

### Community 17 - "MathError"
Cohesion: 0.08
Nodes (48): fourierItems(), isFourierLine(), argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot() (+40 more)

### Community 18 - "numerical.ts"
Cohesion: 0.10
Nodes (52): isNumericalLine(), numericalItems(), FormatOptions, bisection(), cholesky(), condition(), derivative(), exactPolynomial() (+44 more)

### Community 19 - "FoldersStore"
Cohesion: 0.17
Nodes (3): cleanFolderName(), FoldersStore, sameName()

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (39): b, bigops, c, calculus, fn, fr, fractions, functions (+31 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "Rational"
Cohesion: 0.11
Nodes (20): Part, expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactRandom, exactRoot() (+12 more)

### Community 23 - "conics.ts"
Cohesion: 0.19
Nodes (28): at(), centralCanonical(), Coefficients, coneCanonical(), ConicInfo, conicOf(), det2(), det3() (+20 more)

### Community 24 - "several.ts"
Cohesion: 0.14
Nodes (36): at(), bounded(), Candidate, candidates(), compiled(), constraintsOf(), COORDS, coordShown() (+28 more)

### Community 25 - "linear.ts"
Cohesion: 0.09
Nodes (66): angleBetween(), asMatrix(), basisOf(), characteristicPolynomial(), circleText(), cross(), Ctx, dataOf() (+58 more)

### Community 26 - "h"
Cohesion: 0.06
Nodes (43): SyncStatus, helpButton, openGuide(), showProblem(), AccountButton, confirmAccountDeletion(), messageOf(), openAccountDialog() (+35 more)

### Community 27 - "assistant.ts"
Cohesion: 0.11
Nodes (21): @anthropic-ai/sdk, AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askThroughHost() (+13 more)

### Community 28 - "spell.test.ts"
Cohesion: 0.08
Nodes (23): @codemirror/lang-markdown, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt() (+15 more)

### Community 29 - "fake-supabase.mjs"
Cohesion: 0.29
Nodes (5): b64(), CODE, GOOGLE_CODE, ROOT, SUPABASE_URL

### Community 30 - "spaces.ts"
Cohesion: 0.11
Nodes (33): decimalSeparator(), Digits, formatNumber(), formatRational(), fromNumber(), fromRational(), SUPERSCRIPT, writeDigits() (+25 more)

### Community 31 - "graph/file.ts"
Cohesion: 0.12
Nodes (22): graphImage(), graphImagesFor(), graphsFromFile(), OPEN, unhide(), Vec3, areaColor(), escapeXml() (+14 more)

### Community 32 - "schemaTools.test.ts"
Cohesion: 0.17
Nodes (16): alignBoxes(), Alignment, Box, distributeBoxes(), Position, crc32(), svgSize(), svgToPng() (+8 more)

### Community 33 - "markdown.ts"
Cohesion: 0.09
Nodes (35): dompurify, highlight.js, katex, markdown-it-footnote, lineDepth(), parseBlockMath(), cache, escapeHtml() (+27 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "devDependencies"
Cohesion: 0.22
Nodes (9): devDependencies, @electric-sql/pglite, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite, vite-plugin-pwa (+1 more)

### Community 36 - "graphNote.test.ts"
Cohesion: 0.09
Nodes (27): @lezer/common, acceptCalcResult(), calcPlugin, CalcResult, calcResults(), formulasUntil(), insertResult(), ResultWidget (+19 more)

### Community 37 - "Dove sono le cose"
Cohesion: 0.12
Nodes (40): Dove sono le cose, bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel() (+32 more)

### Community 38 - "gauss.ts"
Cohesion: 0.17
Nodes (19): COMPLEX_FUNCTIONS, farthest(), gaussItem(), hasExponential(), inZ(), isComplexLine(), isComplexValue(), isInequality() (+11 more)

### Community 39 - "resize.ts"
Cohesion: 0.13
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "sheet.ts"
Cohesion: 0.12
Nodes (41): ExactFunction, ExactScope, Lin, Definition, INFERENCE, parsed, SPACES, STATISTICS (+33 more)

### Community 41 - "files.ts"
Cohesion: 0.22
Nodes (14): inClaudeViewer(), canWriteFilesDirectly(), downloadBlob(), downloadText(), fileNameFor(), FsWindow, isAbort(), MD_TYPES (+6 more)

### Community 42 - "NotesStore"
Cohesion: 0.07
Nodes (39): Account, accountSpace(), adoptGuestNotes(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf() (+31 more)

### Community 43 - "study.ts"
Cohesion: 0.16
Nodes (31): Asymptote, boundaries(), compiled(), cutsOf(), defined(), domainOf(), exact(), inDomain() (+23 more)

### Community 44 - "parseSchema"
Cohesion: 0.17
Nodes (15): base64(), hide(), OPEN, schemasForFile(), schemasFromFile(), unhide(), isRecord(), num() (+7 more)

### Community 45 - "supabase.ts"
Cohesion: 0.11
Nodes (32): @supabase/supabase-js, withLock(), accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken() (+24 more)

### Community 46 - "probability.ts"
Cohesion: 0.14
Nodes (22): End, CompileOptions, ALL, compileOf(), complement(), distributionOf(), endAt(), EventContext (+14 more)

### Community 47 - "complex.ts"
Cohesion: 0.08
Nodes (47): add(), allRoots(), arg(), asin(), atan(), compileApply(), compileComplex(), compileFunction() (+39 more)

### Community 48 - "distributions.ts"
Cohesion: 0.06
Nodes (64): number(), addExp(), choose(), continuousQuantile(), discreteQuantile(), Distribution, exactIntervalProbability(), expSumValue() (+56 more)

### Community 49 - "editor/editor.ts"
Cohesion: 0.07
Nodes (32): description, name, private, type, version, @codemirror/autocomplete, @codemirror/commands, @codemirror/language (+24 more)

### Community 50 - "page.ts"
Cohesion: 0.05
Nodes (54): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), currentAccount(), PullResult, openShareDialog(), changeAccess() (+46 more)

### Community 51 - "severalGraph.ts"
Cohesion: 0.22
Nodes (13): FieldContext, criticalLine(), isSeveralLine(), named(), severalItems(), surface(), names(), STUDY_GRAPH (+5 more)

### Community 52 - "search.ts"
Cohesion: 0.18
Nodes (23): editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex() (+15 more)

### Community 53 - "editor/lists.ts"
Cohesion: 0.18
Nodes (30): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+22 more)

### Community 54 - "scopeWith"
Cohesion: 0.12
Nodes (34): integralRegion, LayeredSolid, axesIn(), bestAlong(), boundingBox(), combine(), compileDomain(), compileMultiple() (+26 more)

### Community 55 - "latex.ts"
Cohesion: 0.08
Nodes (50): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+42 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "insert.ts"
Cohesion: 0.15
Nodes (15): @codemirror/state, @codemirror/view, InsertOptions, toggleLinePrefix(), besideSchema(), guardBlocks(), schemaBlockRanges(), schemaBlocks() (+7 more)

### Community 58 - ".int"
Cohesion: 0.12
Nodes (7): eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn(), R()

### Community 59 - "SidePanel"
Cohesion: 0.24
Nodes (5): cleanKatexError(), renderTex(), displayCode(), preventFocusSteal(), SidePanel

### Community 60 - "shapes.ts"
Cohesion: 0.09
Nodes (14): @maxgraph/core, ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape (+6 more)

### Community 61 - "dependencies"
Cohesion: 0.09
Nodes (23): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+15 more)

### Community 62 - "schema/preview.ts"
Cohesion: 0.15
Nodes (13): GraphLook, Look, Theme, draw(), drawCached(), drawn, errorHtml(), fill() (+5 more)

### Community 63 - "database.ts"
Cohesion: 0.24
Nodes (6): @electric-sql/pglite, createDatabase(), createUser(), databaseTests(), migrations, shareTests()

### Community 64 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 65 - "markers.ts"
Cohesion: 0.11
Nodes (36): Item, ListStyle, bullet(), bulletGroup(), childMarker(), column(), firstMarker(), label() (+28 more)

### Community 66 - "suggestions.ts"
Cohesion: 0.17
Nodes (9): templateInsertion(), EditorMathContext, expand(), preferredIndex(), SuggestionController, ParsedTemplate, parseTemplate(), PLACEHOLDER_TEX (+1 more)

### Community 67 - "tutorial.mjs"
Cohesion: 0.20
Nodes (6): centerOf(), clickOn(), ffmpeg, SCENES, SIZE, work

### Community 68 - "templates.ts"
Cohesion: 0.08
Nodes (33): SchemaEditorOptions, Schema, SchemaEdge, SchemaNode, Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey (+25 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 72 - "settings.ts"
Cohesion: 0.11
Nodes (24): addPersonalWord(), DICTIONARY_KEY, loadPersonalWords(), savePersonalWords(), tidy(), ACCOUNT_SETTINGS, accountSettings(), AI_MODELS (+16 more)

### Community 73 - "statsGraph.ts"
Cohesion: 0.23
Nodes (13): classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX, Line, number(), pmfBars() (+5 more)

### Community 74 - "editor.test.ts"
Cohesion: 0.09
Nodes (18): addPlaceholders, buildDecorations(), clearAllPlaceholders(), clearPlaceholders, contains(), currentIndex(), filledMark, getPlaceholders() (+10 more)

### Community 75 - "toolbar.ts"
Cohesion: 0.12
Nodes (15): EditorCallbacks, MarkdownEditor, insertBlock(), insertTemplate(), wrapSelection(), Action, createToolbar(), insertCode() (+7 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 79 - "limits.ts"
Cohesion: 0.20
Nodes (19): exponentialForm(), fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), alternating() (+11 more)

### Community 82 - "Glifo"
Cohesion: 0.20
Nodes (10): Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Funzionalità, Glifo, Idee per il futuro (+2 more)

### Community 83 - "sidePanel.ts"
Cohesion: 0.13
Nodes (16): insertGraphBlock(), SuggestionItem, graphBlockText(), isConfidentAnswer(), CATEGORIES, SYMBOLS, symbolsInCategory(), cardPreviewTex() (+8 more)

### Community 92 - "toNode"
Cohesion: 0.08
Nodes (46): close(), Definite, definiteIntegral(), exValue(), samples(), EMPTY_SCOPE, absOf(), boundsOf() (+38 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.20
Nodes (4): device(), login(), newContext, waitFor()

### Community 97 - "Più avanti"
Cohesion: 0.22
Nodes (9): Abbonamento e funzioni a pagamento (da capire), Aiuto con gli esercizi, Calcoli e grafici: idee in più, Matematica per i corsi: idee in più, Non solo appunti, Più avanti, Schemi: idee in più, Trascrizione delle lezioni in appunti (+1 more)

### Community 101 - "Glifo – note per Claude"
Cohesion: 0.25
Nodes (7): Comandi, Come controllare il lavoro, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole, sqlite()

### Community 102 - "toLatex"
Cohesion: 0.11
Nodes (34): constantIntegrand(), depth(), inequalityMargin(), Multiple, multipleOf(), planeMargin(), PlanePart, radiusOf() (+26 more)

### Community 104 - "MathNode"
Cohesion: 0.07
Nodes (42): GaussLine, Definition, Line, ExactComplexScope, Ode, withWorkLimit(), FormattedResult, differentialRequest (+34 more)

### Community 105 - "ROADMAP.md"
Cohesion: 0.29
Nodes (5): Account: i propri appunti su ogni dispositivo, anche da condividere, Altre idee, Controllare e mostrare quello che si scrive, Idee per il futuro, In programma

### Community 106 - "grafo-html.mjs"
Cohesion: 0.15
Nodes (6): playwright-core, graphFile, names, namesFile, root, PNG_ICONS

### Community 107 - "Il database degli account (Supabase)"
Cohesion: 0.25
Nodes (8): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Nell'app, Note condivise con un link

### Community 110 - "createFakeSupabase"
Cohesion: 0.60
Nodes (6): createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 113 - "Sincronizzazione"
Cohesion: 0.50
Nodes (3): Sincronizzazione, `sync_pull({ since })`: scarica le novità, `sync_push({ changes })`: manda le modifiche

### Community 114 - "Account"
Cohesion: 0.67
Nodes (3): Account, Condividere una nota con un link, Usarla tutti i giorni

## Knowledge Gaps
- **489 isolated node(s):** `BOX`, `LOGO_COLOR`, `Root`, `Kind`, `Tok` (+484 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 662 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `main.ts`, `sync.ts`, `num`, `linsys.ts`, `view3d.ts`, `linear.ts`, `h`, `assistant.ts`, `spell.test.ts`, `schemaTools.test.ts`, `markdown.ts`, `graphNote.test.ts`, `resize.ts`, `NotesStore`, `parseSchema`, `supabase.ts`, `distributions.ts`, `editor/editor.ts`, `page.ts`, `search.ts`, `editor/lists.ts`, `scopeWith`, `insert.ts`, `database.ts`, `markers.ts`, `templates.ts`, `vite.config.ts`, `settings.ts`, `editor.test.ts`, `sidePanel.ts`, `MathNode`?**
  _High betweenness centrality (0.122) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `Dove sono le cose` to `solve.ts`, `parse.ts`, `main.ts`, `odesolve.ts`, `spec.ts`, `arithmetic.ts`, `graph/preview.ts`, `schema/editor.ts`, `symbolic.ts`, `graph.ts`, `svg.ts`, `linsys.ts`, `view3d.ts`, `MathError`, `numerical.ts`, `Rational`, `several.ts`, `linear.ts`, `h`, `schemaTools.test.ts`, `markdown.ts`, `logic.ts`, `graphNote.test.ts`, `gauss.ts`, `study.ts`, `supabase.ts`, `complex.ts`, `distributions.ts`, `latex.ts`, `schema/preview.ts`, `limits.ts`, `toNode`, `Glifo – note per Claude`, `toLatex`, `MathNode`?**
  _High betweenness centrality (0.072) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `main.ts`, `resize.ts`, `settings.ts`, `schema/editor.ts`, `NotesStore`, `graph.ts`, `toolbar.ts`, `SchemaEditor`, `page.ts`, `sidePanel.ts`, `SidePanel`, `spell.test.ts`, `schema/preview.ts`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **What connects `BOX`, `LOGO_COLOR`, `Root` to the rest of the system?**
  _489 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `solve.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13012477718360071 - nodes in this community are weakly interconnected._
- **Should `parse.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07816349384098545 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04986324426677888 - nodes in this community are weakly interconnected._