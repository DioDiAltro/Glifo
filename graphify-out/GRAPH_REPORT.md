# Graph Report - matherdown  (2026-10-05)

## Corpus Check
- 238 files · ~448,243 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 3892 nodes · 13896 edges · 129 communities (109 shown, 20 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 383 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e39b82da`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- touchlog.ts
- parse.ts
- main.ts
- odesolve.ts
- sync.ts
- spec.ts
- Rational
- primitive.ts
- graph/preview.ts
- drawScene
- symbolic.ts
- editor/lists.ts
- svg.ts
- Board
- SchemaEditor
- exact.ts
- graph/file.ts
- compile
- numerical.ts
- markdown.ts
- index.ts
- engine.ts
- sheet.ts
- .renderFormat
- BoardStore
- MathError
- toLatex
- assistant.ts
- h
- conics.ts
- board.ts
- view3d.ts
- distributions.ts
- calcResults.ts
- logic.ts
- compileComplex
- num
- namesIn
- probability.ts
- resize.ts
- statsShown.ts
- store.ts
- NotesStore
- study.ts
- complex.ts
- ink.ts
- editor/editor.ts
- vitest
- files.ts
- logo.ts
- laplace.ts
- linsys.ts
- search.ts
- statsGraph.ts
- strokes.ts
- finite.ts
- 20261004091555_note_condivise.sql
- insert.ts
- .int
- renderTex
- graph.ts
- dependencies
- supabase.ts
- limits.ts
- schema/preview.ts
- domain.ts
- MathNode
- regions.ts
- templates.ts
- Benvenuto in Glifo
- compilerOptions
- FormattedResult
- .setView
- settings.ts
- sidePanel.ts
- toolbar.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- Più avanti
- session-start.sh
- .claude/CLAUDE.md
- editor.test.ts
- tutorial.mjs
- Abbonamenti
- suggestions.ts
- several.ts
- supabase-stub.sql
- account-test.mjs
- Il database degli account (Supabase)
- Costi
- smoke-test.mjs
- package.json
- FoldersStore
- I modelli e le chiavi API
- UndefinedName
- Le spiegazioni, come funzionano
- fake-supabase.mjs
- Piano per piano
- gauss.ts
- Glifo – note per Claude
- page.ts
- icons.mjs
- La lavagna
- parseSchema
- schemaTools.test.ts
- formatNumber
- Glifo
- spellcheck
- severalGraph.ts
- Sheet
- .showSpaces
- grafo-html.mjs
- createFakeSupabase
- criticalShown

## God Nodes (most connected - your core abstractions)
1. `MathError` - 151 edges
2. `num()` - 145 edges
3. `Sheet` - 129 edges
4. `MathNode` - 128 edges
5. `mul()` - 124 edges
6. `compile()` - 113 edges
7. `Dove sono le cose` - 112 edges
8. `Rational` - 111 edges
9. `toLatex()` - 101 edges
10. `add()` - 98 edges

## Surprising Connections (you probably didn't know these)
- `Funzionalità` --references--> `k()`  [INFERRED]
  README.md → src/math/numerical.ts
- `Dove sono le cose` --references--> `adoptGuestNotes()`  [INFERRED]
  CLAUDE.md → src/account/space.ts
- `Dove sono le cose` --references--> `shareNote()`  [INFERRED]
  CLAUDE.md → src/account/supabase.ts
- `Dove sono le cose` --references--> `sharedLinks()`  [INFERRED]
  CLAUDE.md → src/account/supabase.ts
- `Dove sono le cose` --references--> `jsonIn()`  [INFERRED]
  CLAUDE.md → src/ai/assistant.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (129 total, 20 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.09
Nodes (26): at(), browserStore, clip(), isSaved(), KINDS, LOG_KEY, LOG_MAX_LINES, LogStore (+18 more)

### Community 1 - "parse.ts"
Cohesion: 0.08
Nodes (38): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe(), differentialInFraction() (+30 more)

### Community 2 - "main.ts"
Cohesion: 0.05
Nodes (81): addToGraphBlock(), graphsForFile(), graphsFromFile(), hide(), unhide(), account, active, app (+73 more)

### Community 3 - "odesolve.ts"
Cohesion: 0.08
Nodes (81): linearIn(), addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames() (+73 more)

### Community 4 - "sync.ts"
Cohesion: 0.05
Nodes (39): @electric-sql/pglite, AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow (+31 more)

### Community 5 - "spec.ts"
Cohesion: 0.06
Nodes (64): formulaAtCursor(), GraphLabelLines, insertGraphBlock(), setGraphLabels(), conicItems(), isConicLine(), quadricEquation(), areaOf() (+56 more)

### Community 6 - "Rational"
Cohesion: 0.06
Nodes (73): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+65 more)

### Community 7 - "primitive.ts"
Cohesion: 0.18
Nodes (59): similarSolution(), degree(), algebraic(), bigGcd(), byParts(), candidates(), canon(), combineLogs() (+51 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (47): addLabel(), boxes, cameras, complexCoord(), coord(), drawings, drawnViews, endTex() (+39 more)

### Community 9 - "drawScene"
Cohesion: 0.19
Nodes (13): Vec3, arrowHead(), boxShape(), Coverage, Directions, dot(), drawScene(), f1() (+5 more)

### Community 10 - "symbolic.ts"
Cohesion: 0.07
Nodes (54): fnLabel(), linearCells(), pairUp(), assumePositive(), atValues(), commonPositive(), Converter, coordinates() (+46 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.10
Nodes (54): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+46 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (53): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), domainEdge(), features() (+45 more)

### Community 15 - "exact.ts"
Cohesion: 0.22
Nodes (13): bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactFunction, ExactRandom, exactRoot(), factorialExact() (+5 more)

### Community 16 - "graph/file.ts"
Cohesion: 0.12
Nodes (32): figureName(), graphFigure(), graphImage(), graphImagesFor(), OPEN, swatchSvg(), titleBand(), ACCENTS (+24 more)

### Community 17 - "compile"
Cohesion: 0.07
Nodes (59): areaFor(), condLabel(), constantValue(), define(), isStraight(), isVectorName(), itemFor(), restrict() (+51 more)

### Community 18 - "numerical.ts"
Cohesion: 0.13
Nodes (45): bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial(), interpolating() (+37 more)

### Community 19 - "markdown.ts"
Cohesion: 0.08
Nodes (44): dompurify, highlight.js, katex, markdown-it-footnote, bulletGroup(), sameList(), checkHtml(), checkTitle() (+36 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (42): b, bigops, c, calculus, fn, fr, fractions, functions (+34 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "sheet.ts"
Cohesion: 0.07
Nodes (37): Dove sono le cose, numericPartials(), ConicElements, Ode, OdeFunction, chiSquareTest(), InferenceContext, Eigenvalue (+29 more)

### Community 23 - ".renderFormat"
Cohesion: 0.12
Nodes (17): fieldInput(), textWidth(), createEdgeCell(), edgeLook(), edgeStyle(), edgeTextAt(), insertSchema(), isEdgeLook() (+9 more)

### Community 24 - "BoardStore"
Cohesion: 0.08
Nodes (4): BoardOptions, BoardBackend, BoardStore, MemoryBoards

### Community 25 - "MathError"
Cohesion: 0.13
Nodes (51): MathError, angleBetween(), asMatrix(), basisOf(), cross(), Ctx, dataOf(), determinant() (+43 more)

### Community 26 - "toLatex"
Cohesion: 0.11
Nodes (32): fourierItems(), isFourierLine(), names(), STUDY_GRAPH, studyItems(), partialSum(), ACCENT_COMMANDS, COMPLEX_FUNCTIONS (+24 more)

### Community 27 - "assistant.ts"
Cohesion: 0.12
Nodes (21): AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible(), askThroughHost() (+13 more)

### Community 28 - "h"
Cohesion: 0.06
Nodes (53): SyncStatus, board, helpButton, openGuide(), viewSwitch, openSignedOut(), printButton(), ShareDialogDeps (+45 more)

### Community 29 - "conics.ts"
Cohesion: 0.20
Nodes (27): at(), centralCanonical(), Coefficients, coneCanonical(), conicOf(), det2(), det3(), determinant() (+19 more)

### Community 30 - "board.ts"
Cohesion: 0.12
Nodes (23): Action, ACTION_NAMES, DrawAction, EraseAction, ERASER_RADIUS, Finger, ICON, loadPrefs() (+15 more)

### Community 31 - "view3d.ts"
Cohesion: 0.09
Nodes (65): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+57 more)

### Community 32 - "distributions.ts"
Cohesion: 0.08
Nodes (57): choose(), continuousQuantile(), discreteQuantile(), Distribution, exactIntervalProbability(), factorialBig(), FAMILIES, integerParam() (+49 more)

### Community 33 - "calcResults.ts"
Cohesion: 0.12
Nodes (14): acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult, calcResults(), CheckWidget, formulasUntil() (+6 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "compileComplex"
Cohesion: 0.19
Nodes (16): asin(), atan(), compileComplex(), compileFunction(), evaluateExactComplex(), exactSqrt(), exp(), GaussRational (+8 more)

### Community 36 - "num"
Cohesion: 0.14
Nodes (45): monomial(), absOf(), atIntegers(), boundsOf(), definite(), fourierProblem, isTrig(), linearTrig() (+37 more)

### Community 37 - "namesIn"
Cohesion: 0.11
Nodes (44): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+36 more)

### Community 38 - "probability.ts"
Cohesion: 0.11
Nodes (27): addExp(), End, expSum, Family, CompileOptions, ExactScope, ALL, complement() (+19 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "statsShown.ts"
Cohesion: 0.16
Nodes (32): expSumValue(), Lin, check(), correlation(), count(), covariance(), Data, DATA_FUNCTIONS (+24 more)

### Community 41 - "store.ts"
Cohesion: 0.15
Nodes (14): fake-indexeddb, done(), fromRecord(), IdbBoards, ofNote(), openBoardDatabase(), openDefault(), request() (+6 more)

### Community 42 - "NotesStore"
Cohesion: 0.07
Nodes (33): accountSpace(), adoptGuestNotes(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf(), setCurrentAccount() (+25 more)

### Community 43 - "study.ts"
Cohesion: 0.09
Nodes (49): close(), Definite, definiteIntegral(), exValue(), samples(), EMPTY_SCOPE, Piece, limit() (+41 more)

### Community 44 - "complex.ts"
Cohesion: 0.11
Nodes (23): add(), allRoots(), arg(), ComplexCompiled, cos(), cosh(), EMPTY_COMPLEX_SCOPE, formatComplex() (+15 more)

### Community 45 - "ink.ts"
Cohesion: 0.20
Nodes (11): Prefs, BOARD_PALETTES, BoardPalette, inkName(), mid(), outlineSvg(), PEN_SIZE, strokeOptions() (+3 more)

### Community 46 - "editor/editor.ts"
Cohesion: 0.06
Nodes (42): @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/state, @lezer/highlight, highlight, italianPhrases, listMarkers (+34 more)

### Community 47 - "vitest"
Cohesion: 0.08
Nodes (31): vitest, staticGraphSvg(), chooseWindow(), chooseBox(), GraphItem, parseGraph(), graphSvg(), PALETTES (+23 more)

### Community 48 - "files.ts"
Cohesion: 0.12
Nodes (22): cache, capability(), ClaudeRuntime, hostDownloads, HostError, inClaudeViewer(), ModelTier, runtime() (+14 more)

### Community 49 - "logo.ts"
Cohesion: 0.33
Nodes (6): sidebarToggle(), BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark()

### Community 50 - "laplace.ts"
Cohesion: 0.10
Nodes (49): factoredPolynomial(), integerPoly(), beyondPoles(), compiled(), E, exp(), fractionShown(), HALF (+41 more)

### Community 51 - "linsys.ts"
Cohesion: 0.09
Nodes (50): isNumericalLine(), numericalItems(), nameLatex(), choices(), exText(), gcd(), isStandardUnknown(), linearSystem() (+42 more)

### Community 52 - "search.ts"
Cohesion: 0.17
Nodes (24): editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex() (+16 more)

### Community 53 - "statsGraph.ts"
Cohesion: 0.15
Nodes (20): FieldContext, isTestLine(), number(), testItems(), classes(), dataOf(), distributionExtent(), distributionLabel() (+12 more)

### Community 54 - "strokes.ts"
Cohesion: 0.15
Nodes (16): between(), Box, boxesTouch(), capsuleSpan(), circleSpan(), compareStrokes(), eraseStroke(), INK_COLORS (+8 more)

### Community 55 - "finite.ts"
Cohesion: 0.19
Nodes (26): countOf(), elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError, FiniteResult (+18 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "insert.ts"
Cohesion: 0.14
Nodes (16): @codemirror/view, InsertOptions, toggleLinePrefix(), LIST_STYLES, besideSchema(), guardBlocks(), schemaBlockRanges(), schemaBlocks() (+8 more)

### Community 58 - ".int"
Cohesion: 0.09
Nodes (10): eigenvalues(), eigenvectors(), Field, formatPolynomial(), interpolate(), interpolateFloat(), Mat, polynomialIn() (+2 more)

### Community 59 - "renderTex"
Cohesion: 0.24
Nodes (5): cleanKatexError(), renderTex(), displayCode(), preventFocusSteal(), SidePanel

### Community 60 - "graph.ts"
Cohesion: 0.07
Nodes (30): @maxgraph/core, AT_X, cellHtml(), cellText(), COMPASS, createGraph(), drawSchema(), schemaImage() (+22 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (24): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+16 more)

### Community 62 - "supabase.ts"
Cohesion: 0.11
Nodes (36): @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken(), ensureSessionOf() (+28 more)

### Community 63 - "limits.ts"
Cohesion: 0.18
Nodes (19): exponentialForm(), fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), alternating() (+11 more)

### Community 64 - "schema/preview.ts"
Cohesion: 0.15
Nodes (13): GraphLabels, Look, Theme, draw(), drawCached(), drawn, errorHtml(), fill() (+5 more)

### Community 65 - "domain.ts"
Cohesion: 0.12
Nodes (31): integralRegion, axesIn(), bestAlong(), boundingBox(), combine(), compileDomain(), compileMultiple(), conditionsOf() (+23 more)

### Community 66 - "MathNode"
Cohesion: 0.11
Nodes (10): ExactComplexScope, Elem, FiniteContext, NumericContext, MathNode, close(), digitsMatch(), isLiteral() (+2 more)

### Community 67 - "regions.ts"
Cohesion: 0.15
Nodes (25): constantIntegrand(), depth(), inequalityMargin(), LayeredSolid, Multiple, multipleOf(), planeMargin(), PlanePart (+17 more)

### Community 68 - "templates.ts"
Cohesion: 0.08
Nodes (33): SchemaEditorOptions, Schema, SchemaEdge, SchemaNode, Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey (+25 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "FormattedResult"
Cohesion: 0.25
Nodes (4): ConicInfo, withWorkLimit(), FormattedResult, needsSymbols()

### Community 72 - ".setView"
Cohesion: 0.20
Nodes (5): clampZoom(), coalesced(), pressureOf(), validView(), newStrokeId()

### Community 73 - "settings.ts"
Cohesion: 0.15
Nodes (20): addPersonalWord(), DICTIONARY_KEY, loadPersonalWords(), savePersonalWords(), tidy(), ACCOUNT_SETTINGS, accountSettings(), AI_MODELS (+12 more)

### Community 74 - "sidePanel.ts"
Cohesion: 0.18
Nodes (14): SuggestionItem, isConfidentAnswer(), CATEGORIES, symbolsInCategory(), cardPreviewTex(), formPreviewTex(), ParsedTemplate, parseTemplate() (+6 more)

### Community 75 - "toolbar.ts"
Cohesion: 0.12
Nodes (14): EditorCallbacks, MarkdownEditor, insertBlock(), insertTemplate(), wrapSelection(), SidePanelDeps, Action, createToolbar() (+6 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.06
Nodes (51): ALIGN, ARROW_NAMES, AT_ICONS, AT_NAMES, BASE_PRESETS, BIG_ARROWS, DB_PRESETS, Direction (+43 more)

### Community 79 - "Più avanti"
Cohesion: 0.14
Nodes (14): Abbonamento e funzioni a pagamento (da capire), Account: i propri appunti su ogni dispositivo, anche da condividere, Aiuto con gli esercizi, Altre idee, Calcoli e grafici: idee in più, Idee per il futuro, In programma, La lavagna: idee in più (+6 more)

### Community 82 - "editor.test.ts"
Cohesion: 0.07
Nodes (31): @lezer/common, closeMathBlockOnEnter(), tabOutOfMath(), templateInsertion(), CODE_NODES, CommandToken, commandTokenAt(), isInCode() (+23 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.20
Nodes (6): centerOf(), clickOn(), ffmpeg, SCENES, SIZE, work

### Community 90 - "Abbonamenti"
Cohesion: 0.14
Nodes (14): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+6 more)

### Community 91 - "suggestions.ts"
Cohesion: 0.22
Nodes (4): EditorMathContext, expand(), preferredIndex(), SuggestionController

### Community 92 - "several.ts"
Cohesion: 0.18
Nodes (25): at(), Candidate, candidates(), compiled(), constraintsOf(), COORDS, Critical, criticalPoints() (+17 more)

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
Cohesion: 0.29
Nodes (4): markdown-it, vite, firstVisit(), plainContext

### Community 101 - "package.json"
Cohesion: 0.05
Nodes (36): description, devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript (+28 more)

### Community 102 - "FoldersStore"
Cohesion: 0.08
Nodes (16): cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder(), loadClosedFolders(), RemoteFolder (+8 more)

### Community 103 - "I modelli e le chiavi API"
Cohesion: 0.50
Nodes (4): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), Le idee dello studente (5 ottobre 2026)

### Community 104 - "UndefinedName"
Cohesion: 0.29
Nodes (6): compileApply(), compileName(), conjugateOf(), constant(), nameLabel(), UndefinedName

### Community 105 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 106 - "fake-supabase.mjs"
Cohesion: 0.29
Nodes (5): b64(), CODE, GOOGLE_CODE, ROOT, SUPABASE_URL

### Community 107 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 108 - "gauss.ts"
Cohesion: 0.16
Nodes (19): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexValue(), isInequality() (+11 more)

### Community 109 - "Glifo – note per Claude"
Cohesion: 0.29
Nodes (7): Comandi, Come controllare il lavoro, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole, sqlite()

### Community 110 - "page.ts"
Cohesion: 0.06
Nodes (45): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), currentAccount(), PullResult, openShareDialog(), changeAccess() (+37 more)

### Community 113 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 115 - "parseSchema"
Cohesion: 0.18
Nodes (14): hide(), OPEN, schemasForFile(), schemasFromFile(), unhide(), isRecord(), num(), oneOf() (+6 more)

### Community 116 - "schemaTools.test.ts"
Cohesion: 0.22
Nodes (12): alignBoxes(), Alignment, Box, distributeBoxes(), Position, base64(), crc32(), svgSize() (+4 more)

### Community 117 - "formatNumber"
Cohesion: 0.10
Nodes (41): decimalSeparator(), Digits, formatNumber(), FormatOptions, formatRational(), fromNumber(), fromRational(), SUPERSCRIPT (+33 more)

### Community 121 - "Glifo"
Cohesion: 0.15
Nodes (13): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Funzionalità (+5 more)

### Community 122 - "spellcheck"
Cohesion: 0.21
Nodes (8): spellcheck(), close(), misspelledAt(), openAt(), replace(), tooltipView(), SpellChecker, SpellcheckOptions

### Community 123 - "severalGraph.ts"
Cohesion: 0.40
Nodes (9): criticalLine(), isSeveralLine(), named(), severalItems(), surface(), bounded(), extremaOf(), optimumOf() (+1 more)

### Community 124 - "Sheet"
Cohesion: 0.09
Nodes (27): fingerprint(), Sheet, text(), tex(), text(), check(), result(), text() (+19 more)

### Community 125 - ".showSpaces"
Cohesion: 0.29
Nodes (4): characteristicPolynomial(), LinearValue, signature(), signChanges()

### Community 126 - "grafo-html.mjs"
Cohesion: 0.25
Nodes (4): graphFile, names, namesFile, root

### Community 127 - "createFakeSupabase"
Cohesion: 0.60
Nodes (6): createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 128 - "criticalShown"
Cohesion: 0.70
Nodes (5): coordShown(), criticalShown(), extremaShown(), pointShown(), stacked()

## Knowledge Gaps
- **563 isolated node(s):** `session-start.sh script`, `name`, `private`, `version`, `description` (+558 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 770 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `touchlog.ts`, `main.ts`, `sync.ts`, `editor/lists.ts`, `svg.ts`, `compile`, `markdown.ts`, `MathError`, `assistant.ts`, `h`, `board.ts`, `distributions.ts`, `num`, `resize.ts`, `store.ts`, `NotesStore`, `ink.ts`, `editor/editor.ts`, `logo.ts`, `laplace.ts`, `linsys.ts`, `search.ts`, `strokes.ts`, `insert.ts`, `supabase.ts`, `domain.ts`, `templates.ts`, `settings.ts`, `sidePanel.ts`, `toolbar.ts`, `editor.test.ts`, `package.json`, `FoldersStore`, `page.ts`, `parseSchema`, `schemaTools.test.ts`, `Sheet`?**
  _High betweenness centrality (0.125) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `sheet.ts` to `touchlog.ts`, `parse.ts`, `main.ts`, `odesolve.ts`, `spec.ts`, `Rational`, `primitive.ts`, `graph/preview.ts`, `symbolic.ts`, `svg.ts`, `graph/file.ts`, `compile`, `numerical.ts`, `markdown.ts`, `.renderFormat`, `BoardStore`, `MathError`, `toLatex`, `assistant.ts`, `h`, `view3d.ts`, `distributions.ts`, `logic.ts`, `compileComplex`, `num`, `namesIn`, `probability.ts`, `NotesStore`, `study.ts`, `editor/editor.ts`, `logo.ts`, `linsys.ts`, `strokes.ts`, `finite.ts`, `graph.ts`, `supabase.ts`, `limits.ts`, `schema/preview.ts`, `MathNode`, `FormattedResult`, `settings.ts`, `schema/editor.ts`, `several.ts`, `Glifo – note per Claude`, `schemaTools.test.ts`, `severalGraph.ts`?**
  _High betweenness centrality (0.106) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `main.ts`, `graph/preview.ts`, `editor/lists.ts`, `Board`, `SchemaEditor`, `.renderFormat`, `board.ts`, `resize.ts`, `editor/editor.ts`, `files.ts`, `logo.ts`, `renderTex`, `schema/preview.ts`, `sidePanel.ts`, `toolbar.ts`, `schema/editor.ts`, `FoldersStore`, `page.ts`, `spellcheck`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **What connects `session-start.sh script`, `name`, `private` to the rest of the system?**
  _563 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `touchlog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08653061224489796 - nodes in this community are weakly interconnected._
- **Should `parse.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07719298245614035 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04671052631578947 - nodes in this community are weakly interconnected._