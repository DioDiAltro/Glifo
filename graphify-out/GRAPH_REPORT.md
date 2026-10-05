# Graph Report - matherdown  (2026-10-05)

## Corpus Check
- 222 files · ~414,626 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 3573 nodes · 12946 edges · 105 communities (91 shown, 14 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 346 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `89898dc9`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- linsys.ts
- Parser
- main.ts
- odesolve.ts
- sync.ts
- spec.ts
- arithmetic.ts
- num
- graph/preview.ts
- schema/editor.ts
- symbolic.ts
- mathContext.ts
- svg.ts
- parse.ts
- SchemaEditor
- editor/lists.ts
- graph/space.ts
- compile
- numerical.ts
- FoldersStore
- index.ts
- engine.ts
- laplace.ts
- .renderFormat
- devDependencies
- MathError
- h
- assistant.ts
- markers.ts
- Rational
- sidePanel.ts
- view3d.ts
- distributions.ts
- markdown.ts
- logic.ts
- Sheet
- editor.test.ts
- sheet.ts
- graph3d.test.ts
- resize.ts
- statsShown.ts
- toLatex
- NotesStore
- study.ts
- complex.ts
- statsGraph.ts
- spellcheck
- .constructor
- Distribution
- spell.test.ts
- probability.ts
- gauss.ts
- search.ts
- formatNumber
- finite.ts
- 20261004091555_note_condivise.sql
- toolbar.ts
- Field
- SidePanel
- graph.ts
- dependencies
- supabase.ts
- schema/preview.ts
- calcPlugin
- Glifo
- sql.ts
- Benvenuto in Glifo
- compilerOptions
- editor/editor.ts
- suggestions.ts
- inference.ts
- MarkdownEditor
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schemaTools.test.ts
- session-start.sh
- .claude/CLAUDE.md
- tutorial.mjs
- Abbonamenti
- several.ts
- supabase-stub.sql
- account-test.mjs
- Il database degli account (Supabase)
- Costi
- smoke-test.mjs
- page.ts
- I modelli e le chiavi API
- files.ts
- Le spiegazioni, come funzionano
- fake-supabase.mjs
- Piano per piano
- Glifo – note per Claude
- logo.ts
- grafo-html.mjs
- La lavagna

## God Nodes (most connected - your core abstractions)
1. `MathError` - 151 edges
2. `num()` - 145 edges
3. `Sheet` - 129 edges
4. `MathNode` - 128 edges
5. `mul()` - 124 edges
6. `compile()` - 113 edges
7. `Rational` - 111 edges
8. `toLatex()` - 101 edges
9. `add()` - 98 edges
10. `Dove sono le cose` - 96 edges

## Surprising Connections (you probably didn't know these)
- `Funzionalità` --references--> `k()`  [INFERRED]
  README.md → src/math/numerical.ts
- `Dove sono le cose` --references--> `sharedLinks()`  [INFERRED]
  CLAUDE.md → src/account/supabase.ts
- `Dove sono le cose` --references--> `shareNote()`  [INFERRED]
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

## Communities (105 total, 14 thin omitted)

### Community 0 - "linsys.ts"
Cohesion: 0.07
Nodes (66): formatRational(), EXACT, FLOAT, lengthText(), Mat, splitRoot(), surdText(), choices() (+58 more)

### Community 1 - "Parser"
Cohesion: 0.12
Nodes (17): Abbonamento e funzioni a pagamento (da capire), Account: i propri appunti su ogni dispositivo, anche da condividere, Aiuto con gli esercizi, Altre idee, Calcoli e grafici: idee in più, Controllare e mostrare quello che si scrive, Idee per il futuro, In programma (+9 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (99): graphsForFile(), hide(), account, active, app, applyAccountChange(), applySpellcheck(), applyTheme() (+91 more)

### Community 3 - "odesolve.ts"
Cohesion: 0.08
Nodes (76): addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames(), constantParticular() (+68 more)

### Community 4 - "sync.ts"
Cohesion: 0.05
Nodes (39): @electric-sql/pglite, AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow (+31 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (99): sheetBefore(), addToGraphBlock(), formulaAtCursor(), insertGraphBlock(), mathRegionAt(), conicItems(), isConicLine(), quadricEquation() (+91 more)

### Community 6 - "arithmetic.ts"
Cohesion: 0.07
Nodes (77): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+69 more)

### Community 7 - "num"
Cohesion: 0.14
Nodes (83): atIntegers(), withoutAbs(), hyperbolicToExp(), polyEx(), similarSolution(), algebraic(), bigGcd(), byParts() (+75 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (42): addLabel(), boxes, cameras, complexCoord(), coord(), drawings, drawnViews, endTex() (+34 more)

### Community 9 - "schema/editor.ts"
Cohesion: 0.04
Nodes (69): ALIGN, ARROW_NAMES, AT_ICONS, AT_NAMES, BASE_PRESETS, BIG_ARROWS, DB_PRESETS, Direction (+61 more)

### Community 10 - "symbolic.ts"
Cohesion: 0.07
Nodes (65): fnLabel(), primitive(), verified(), linearCells(), assumePositive(), atValues(), commonPositive(), Converter (+57 more)

### Community 11 - "mathContext.ts"
Cohesion: 0.14
Nodes (19): @lezer/common, tabOutOfMath(), CODE_NODES, CommandToken, commandTokenAt(), isInCode(), MATH_NODES, mathContextAt() (+11 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (53): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), domainEdge(), features() (+45 more)

### Community 13 - "parse.ts"
Cohesion: 0.07
Nodes (35): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, differentialInFraction(), DISTRIBUTION_EXAMPLES (+27 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.11
Nodes (3): SchemaEditor, serializeSchema(), fileNameFor()

### Community 15 - "editor/lists.ts"
Cohesion: 0.20
Nodes (30): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+22 more)

### Community 16 - "graph/space.ts"
Cohesion: 0.13
Nodes (41): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+33 more)

### Community 17 - "compile"
Cohesion: 0.07
Nodes (63): criticalLine(), named(), severalItems(), surface(), argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS (+55 more)

### Community 18 - "numerical.ts"
Cohesion: 0.12
Nodes (46): bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial(), interpolating() (+38 more)

### Community 19 - "FoldersStore"
Cohesion: 0.07
Nodes (20): cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder(), loadClosedFolders(), RemoteFolder (+12 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (41): b, bigops, c, calculus, fn, fr, fractions, functions (+33 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "laplace.ts"
Cohesion: 0.17
Nodes (24): isTrig(), linearTrig(), beyondPoles(), compiled(), E, exp(), HALF, inverseLaplaceShown() (+16 more)

### Community 23 - ".renderFormat"
Cohesion: 0.12
Nodes (18): fieldInput(), textWidth(), cellText(), createEdgeCell(), edgeLook(), edgeStyle(), edgeTextAt(), isEdgeLook() (+10 more)

### Community 24 - "devDependencies"
Cohesion: 0.11
Nodes (17): devDependencies, @electric-sql/pglite, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite, vite-plugin-pwa (+9 more)

### Community 25 - "MathError"
Cohesion: 0.13
Nodes (56): MathError, angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, dataOf() (+48 more)

### Community 26 - "h"
Cohesion: 0.07
Nodes (46): SyncStatus, helpButton, openGuide(), viewSwitch, openSignedOut(), printButton(), ShareDialogDeps, Settings (+38 more)

### Community 27 - "assistant.ts"
Cohesion: 0.19
Nodes (13): @anthropic-ai/sdk, AiAnswer, AiError, AiSettings, ANSWER_SCHEMA, askAi(), askThroughHost(), checkShape() (+5 more)

### Community 28 - "markers.ts"
Cohesion: 0.11
Nodes (35): Item, ListStyle, bullet(), bulletGroup(), childMarker(), column(), firstMarker(), label() (+27 more)

### Community 29 - "Rational"
Cohesion: 0.09
Nodes (44): at(), centralCanonical(), Coefficients, coneCanonical(), conicOf(), det2(), det3(), determinant() (+36 more)

### Community 30 - "sidePanel.ts"
Cohesion: 0.19
Nodes (13): AiResult, SuggestionItem, isConfidentAnswer(), CATEGORIES, symbolsInCategory(), cardPreviewTex(), formPreviewTex(), ParsedTemplate (+5 more)

### Community 31 - "view3d.ts"
Cohesion: 0.09
Nodes (41): tickLabel(), Face, lerp(), planeSide(), planeTolerance(), regionFaces(), splitFace(), splitLine() (+33 more)

### Community 32 - "distributions.ts"
Cohesion: 0.18
Nodes (25): choose(), expSumValue(), factorialBig(), FAMILIES, integerParam(), invalid(), makeDistribution(), ONE (+17 more)

### Community 33 - "markdown.ts"
Cohesion: 0.08
Nodes (45): acceptCalcResult(), CalcCheck, CalcResult, calcResults(), formulasUntil(), insertResult(), valueNode(), regionFromNode() (+37 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "Sheet"
Cohesion: 0.08
Nodes (22): calcOutcomes(), ExactComplexScope, ConicInfo, withWorkLimit(), ExactRandom, FiniteContext, FormattedResult, MathNode (+14 more)

### Community 36 - "editor.test.ts"
Cohesion: 0.11
Nodes (16): buildDecorations(), clearAllPlaceholders(), clearPlaceholders, CommandTarget, contains(), currentIndex(), filledMark, getPlaceholders() (+8 more)

### Community 37 - "sheet.ts"
Cohesion: 0.05
Nodes (70): Dove sono le cose, bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel() (+62 more)

### Community 38 - "graph3d.test.ts"
Cohesion: 0.29
Nodes (10): staticGraphSvg(), chooseWindow(), Box, chooseBox(), DrawOptions, DEFAULT_CAMERA, sceneSvg(), BOX (+2 more)

### Community 39 - "resize.ts"
Cohesion: 0.13
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "statsShown.ts"
Cohesion: 0.17
Nodes (31): check(), correlation(), count(), covariance(), Data, dataStatistic(), deviation(), fail() (+23 more)

### Community 41 - "toLatex"
Cohesion: 0.03
Nodes (78): vitest, GraphItem, parseGraph(), PALETTES, errorMessage(), ACCENT_COMMANDS, COMPLEX_FUNCTIONS, diffLatex() (+70 more)

### Community 42 - "NotesStore"
Cohesion: 0.08
Nodes (33): accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf() (+25 more)

### Community 43 - "study.ts"
Cohesion: 0.14
Nodes (37): names(), STUDY_GRAPH, studyItems(), letters(), nameLatex(), limit(), Asymptote, compiled() (+29 more)

### Community 44 - "complex.ts"
Cohesion: 0.07
Nodes (51): add(), allRoots(), arg(), asin(), atan(), compileApply(), compileComplex(), compileFunction() (+43 more)

### Community 45 - "statsGraph.ts"
Cohesion: 0.18
Nodes (17): FieldContext, number(), testItems(), classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX (+9 more)

### Community 46 - "spellcheck"
Cohesion: 0.21
Nodes (8): spellcheck(), close(), misspelledAt(), openAt(), replace(), tooltipView(), SpellChecker, SpellcheckOptions

### Community 48 - "Distribution"
Cohesion: 0.13
Nodes (14): addExp(), continuousQuantile(), discreteQuantile(), Distribution, exactIntervalProbability(), expSum, integerRange(), intervalProbability() (+6 more)

### Community 49 - "spell.test.ts"
Cohesion: 0.11
Nodes (20): @codemirror/lang-markdown, @codemirror/state, noIndentedCode, misspelledMark, refreshSpelling, setTarget, SKIP, SpellTarget (+12 more)

### Community 50 - "probability.ts"
Cohesion: 0.12
Nodes (24): End, Family, Interval, CompileOptions, ExactScope, rejection(), ALL, complement() (+16 more)

### Community 51 - "gauss.ts"
Cohesion: 0.06
Nodes (61): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexLine(), isComplexValue() (+53 more)

### Community 52 - "search.ts"
Cohesion: 0.17
Nodes (24): editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex() (+16 more)

### Community 54 - "formatNumber"
Cohesion: 0.13
Nodes (27): exponentialForm(), fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), decimalSeparator() (+19 more)

### Community 55 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "toolbar.ts"
Cohesion: 0.10
Nodes (25): @codemirror/view, insertBlock(), InsertOptions, toggleLinePrefix(), wrapSelection(), LIST_STYLES, addPlaceholders, Placeholder (+17 more)

### Community 58 - "Field"
Cohesion: 0.12
Nodes (7): characteristicPolynomial(), eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn()

### Community 59 - "SidePanel"
Cohesion: 0.25
Nodes (3): displayCode(), preventFocusSteal(), SidePanel

### Community 60 - "graph.ts"
Cohesion: 0.06
Nodes (34): @maxgraph/core, AT_X, cellHtml(), COMPASS, createGraph(), drawSchema(), insertSchema(), loadSchema() (+26 more)

### Community 61 - "dependencies"
Cohesion: 0.09
Nodes (23): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+15 more)

### Community 62 - "supabase.ts"
Cohesion: 0.10
Nodes (38): @supabase/supabase-js, AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountError, appUrl(), call(), currentSession() (+30 more)

### Community 64 - "schema/preview.ts"
Cohesion: 0.20
Nodes (12): Look, SchemaError, Theme, draw(), drawCached(), drawn, errorHtml(), fill() (+4 more)

### Community 66 - "calcPlugin"
Cohesion: 0.21
Nodes (3): calcPlugin, CheckWidget, ResultWidget

### Community 67 - "Glifo"
Cohesion: 0.15
Nodes (13): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Funzionalità (+5 more)

### Community 68 - "sql.ts"
Cohesion: 0.17
Nodes (18): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+10 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "editor/editor.ts"
Cohesion: 0.06
Nodes (35): description, name, private, type, version, @codemirror/autocomplete, @codemirror/commands, @codemirror/language (+27 more)

### Community 72 - "suggestions.ts"
Cohesion: 0.19
Nodes (7): templateInsertion(), EditorMathContext, expand(), preferredIndex(), SuggestionController, parseTemplate(), templateText()

### Community 73 - "inference.ts"
Cohesion: 0.19
Nodes (22): confidence(), confidenceShown(), Given, hypothesisTest(), interval(), meanOf(), nameOf(), num() (+14 more)

### Community 75 - "MarkdownEditor"
Cohesion: 0.21
Nodes (4): closeMathBlockOnEnter(), EditorCallbacks, MarkdownEditor, insertTemplate()

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schemaTools.test.ts"
Cohesion: 0.16
Nodes (17): alignBoxes(), Alignment, Box, distributeBoxes(), Position, base64(), crc32(), svgSize() (+9 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.20
Nodes (6): centerOf(), clickOn(), ffmpeg, SCENES, SIZE, work

### Community 90 - "Abbonamenti"
Cohesion: 0.14
Nodes (14): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+6 more)

### Community 92 - "several.ts"
Cohesion: 0.06
Nodes (80): numShown(), EMPTY_SCOPE, absOf(), boundsOf(), close(), definite(), fourierProblem, fourierShown() (+72 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.20
Nodes (4): device(), login(), newContext, waitFor()

### Community 97 - "Il database degli account (Supabase)"
Cohesion: 0.17
Nodes (11): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Nell'app, Note condivise con un link (+3 more)

### Community 98 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, Quando lo studente dice di cominciare

### Community 100 - "smoke-test.mjs"
Cohesion: 0.25
Nodes (5): markdown-it, playwright-core, vite, firstVisit(), plainContext

### Community 102 - "page.ts"
Cohesion: 0.07
Nodes (41): katex, accountDataFile(), PullResult, openShareDialog(), changeAccess(), changeCopy(), copy(), refreshChanged() (+33 more)

### Community 103 - "I modelli e le chiavi API"
Cohesion: 0.50
Nodes (4): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), Le idee dello studente (5 ottobre 2026)

### Community 104 - "files.ts"
Cohesion: 0.14
Nodes (20): cache, capability(), ClaudeRuntime, hostDownloads, HostError, inClaudeViewer(), ModelTier, runtime() (+12 more)

### Community 105 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 106 - "fake-supabase.mjs"
Cohesion: 0.22
Nodes (11): b64(), CODE, createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom() (+3 more)

### Community 107 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 109 - "Glifo – note per Claude"
Cohesion: 0.29
Nodes (7): Comandi, Come controllare il lavoro, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole, sqlite()

### Community 110 - "logo.ts"
Cohesion: 0.39
Nodes (5): BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark()

### Community 111 - "grafo-html.mjs"
Cohesion: 0.17
Nodes (5): graphFile, names, namesFile, root, PNG_ICONS

### Community 113 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (proposta, da costruire quando lo dice lo studente)

## Knowledge Gaps
- **532 isolated node(s):** `Comandi`, `Promemoria per lo studente`, `Regole`, `graphify`, `Condividere una nota con un link` (+527 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 707 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `sheet.ts` to `linsys.ts`, `Parser`, `main.ts`, `odesolve.ts`, `spec.ts`, `arithmetic.ts`, `num`, `graph/preview.ts`, `symbolic.ts`, `svg.ts`, `parse.ts`, `graph/space.ts`, `compile`, `numerical.ts`, `laplace.ts`, `.renderFormat`, `MathError`, `h`, `Rational`, `markdown.ts`, `logic.ts`, `Sheet`, `study.ts`, `complex.ts`, `.constructor`, `gauss.ts`, `formatNumber`, `finite.ts`, `graph.ts`, `supabase.ts`, `schema/preview.ts`, `inference.ts`, `schemaTools.test.ts`, `several.ts`, `Glifo – note per Claude`?**
  _High betweenness centrality (0.118) - this node is a cross-community bridge._
- **Why does `vitest` connect `toLatex` to `main.ts`, `sync.ts`, `arithmetic.ts`, `num`, `schema/editor.ts`, `svg.ts`, `FoldersStore`, `h`, `assistant.ts`, `markers.ts`, `sidePanel.ts`, `distributions.ts`, `markdown.ts`, `Sheet`, `editor.test.ts`, `sheet.ts`, `graph3d.test.ts`, `resize.ts`, `NotesStore`, `spell.test.ts`, `search.ts`, `toolbar.ts`, `supabase.ts`, `sql.ts`, `editor/editor.ts`, `schemaTools.test.ts`, `page.ts`, `logo.ts`?**
  _High betweenness centrality (0.104) - this node is a cross-community bridge._
- **Why does `Glifo – note per Claude` connect `Glifo – note per Claude` to `ROADMAP.md`, `sheet.ts`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **What connects `Comandi`, `Promemoria per lo studente`, `Regole` to the rest of the system?**
  _532 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `linsys.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0715962441314554 - nodes in this community are weakly interconnected._
- **Should `Parser` be split into smaller, more focused modules?**
  _Cohesion score 0.11948249619482496 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04307944307944308 - nodes in this community are weakly interconnected._