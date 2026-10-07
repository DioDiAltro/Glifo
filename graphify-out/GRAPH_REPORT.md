# Graph Report - matherdown  (2026-10-07)

## Corpus Check
- 270 files · ~523,949 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 4444 nodes · 16072 edges · 153 communities (125 shown, 28 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 483 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `dbd42511`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- touchlog.ts
- parse.ts
- main.ts
- odesolve.ts
- sync.ts
- spec.ts
- several.ts
- num
- graph/preview.ts
- vitest
- complex.ts
- markers.ts
- svg.ts
- spreadsheet/editor.ts
- SchemaEditor
- Rational
- SheetEditor
- compile
- numerical.ts
- markdown.ts
- index.ts
- engine.ts
- Board
- distributions.ts
- store.ts
- MathError
- assistant.ts
- files.ts
- supabase.ts
- toLatex
- gauss.ts
- graph/space.ts
- SheetEvaluator
- calcResults.ts
- logic.ts
- MathNode
- arithmetic.ts
- namesIn
- insert.ts
- resize.ts
- statsShown.ts
- graph.ts
- NotesStore
- study.ts
- functions.ts
- domain.ts
- Stroke
- Sheet
- probability.ts
- board/shapes.ts
- laplace.ts
- compileComplex
- search.ts
- h
- FormattedResult
- finite.ts
- 20261004091555_note_condivise.sql
- Pt
- Field
- grafo-html.mjs
- schema/shapes.ts
- dependencies
- .folderItem
- Le spiegazioni, come funzionano
- Preview
- formatNumber
- parseSchema
- statsGraph.ts
- view3d.ts
- Benvenuto in Glifo
- compilerOptions
- board.ts
- Piano per piano
- blockMove.ts
- symbolic.ts
- sheet.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- Dove sono le cose
- session-start.sh
- .claude/CLAUDE.md
- editor.test.ts
- tutorial.mjs
- Abbonamenti
- schema/templates.ts
- supabase-stub.sql
- account-test.mjs
- Il database degli account (Supabase)
- editor/editor.ts
- Parser
- @codemirror/state
- toolbar.ts
- formulaGraph
- editor/lists.ts
- icons.mjs
- fake-supabase.mjs
- inference.ts
- spreadsheet/format.ts
- Glifo – note per Claude
- page.ts
- mathContext.ts
- sidePanel.ts
- graph/file.ts
- solve.ts
- .int
- .constructor
- renderTex
- spellcheck
- sql.ts
- logo.ts
- Glifo
- createFakeSupabase
- smoke-test.mjs
- tutorial.ts
- blockMoveEditor.test.ts
- SuggestionController
- math/calculus.ts
- schema/preview.ts
- Distribution
- scripts
- ui/preview.ts
- integrate
- devDependencies
- PreviewCallbacks
- moveBlock.ts
- linear.test.ts
- Costi
- Idee per il futuro
- .store
- La lavagna
- I modelli e le chiavi API
- appleTouch
- NodeLook

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 174 edges
2. `MathError` - 151 edges
3. `num()` - 145 edges
4. `Sheet` - 129 edges
5. `MathNode` - 128 edges
6. `mul()` - 124 edges
7. `Board` - 118 edges
8. `compile()` - 113 edges
9. `Rational` - 111 edges
10. `toLatex()` - 101 edges

## Surprising Connections (you probably didn't know these)
- `Dove sono le cose` --references--> `ConicElements`  [INFERRED]
  ARCHITETTURA.md → src/math/conics.ts
- `Dove sono le cose` --references--> `WidgetKind`  [INFERRED]
  ARCHITETTURA.md → src/editor/schemaBlocks.ts
- `Dove sono le cose` --references--> `texts()`  [INFERRED]
  ARCHITETTURA.md → tests/boardTouchLog.test.ts
- `Funzionalità` --references--> `k()`  [INFERRED]
  README.md → src/math/numerical.ts
- `Come viene pubblicata` --references--> `dist()`  [INFERRED]
  README.md → src/board/shapes.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (153 total, 28 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.09
Nodes (27): at(), browserStore, clip(), isSaved(), KINDS, LOG_KEY, LOG_MAX_LINES, LogStore (+19 more)

### Community 1 - "parse.ts"
Cohesion: 0.07
Nodes (44): errorMessage(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe() (+36 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (98): graphsFromFile(), unhide(), remapGraphLines(), remapLineKeys(), account, active, app, applyAccountChange() (+90 more)

### Community 3 - "odesolve.ts"
Cohesion: 0.08
Nodes (82): linearIn(), addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames() (+74 more)

### Community 4 - "sync.ts"
Cohesion: 0.05
Nodes (39): @electric-sql/pglite, AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow (+31 more)

### Community 5 - "spec.ts"
Cohesion: 0.06
Nodes (68): conicItems(), isConicLine(), quadricEquation(), onlyComplex(), inequalityMargin(), multipleOf(), planeParts(), spaceParts() (+60 more)

### Community 6 - "several.ts"
Cohesion: 0.07
Nodes (63): criticalLine(), named(), severalItems(), surface(), Definite, Piece, LimitValue, Condition (+55 more)

### Community 7 - "num"
Cohesion: 0.13
Nodes (90): atIntegers(), oneFraction(), withoutAbs(), exp(), hyperbolicToExp(), inverseRational(), oneFraction(), sqrtEx() (+82 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (42): addLabel(), boxes, cameras, complexCoord(), coord(), drawings, drawnViews, endTex() (+34 more)

### Community 9 - "vitest"
Cohesion: 0.07
Nodes (34): vitest, staticGraphSvg(), chooseWindow(), chooseBox(), GraphItem, parseGraph(), DrawOptions, PALETTES (+26 more)

### Community 10 - "complex.ts"
Cohesion: 0.08
Nodes (40): add(), allRoots(), arg(), ComplexCompiled, cos(), cosh(), EMPTY_COMPLEX_SCOPE, exponentialForm() (+32 more)

### Community 11 - "markers.ts"
Cohesion: 0.11
Nodes (37): Item, ListStyle, bullet(), bulletGroup(), childMarker(), column(), firstMarker(), label() (+29 more)

### Community 12 - "svg.ts"
Cohesion: 0.08
Nodes (58): labelSvg(), contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), dataWindow() (+50 more)

### Community 13 - "spreadsheet/editor.ts"
Cohesion: 0.06
Nodes (73): openSheet(), saveSheetBlock(), currentCall(), Editing, MenuEntry, Move, openSheetEditor(), PATHS (+65 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.11
Nodes (3): SchemaEditor, edgeTextAt(), serializeSchema()

### Community 15 - "Rational"
Cohesion: 0.09
Nodes (44): Part, at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf() (+36 more)

### Community 16 - "SheetEditor"
Cohesion: 0.09
Nodes (6): rangeLabel(), SheetEditor, sameFormat(), serializeSheet(), CellRange, cloneSheet()

### Community 17 - "compile"
Cohesion: 0.11
Nodes (33): binomial(), compare(), compile(), compileApply(), compileCondition(), compileDerivative(), compileFunction(), CompileOptions (+25 more)

### Community 18 - "numerical.ts"
Cohesion: 0.12
Nodes (47): FormatOptions, bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial() (+39 more)

### Community 19 - "markdown.ts"
Cohesion: 0.15
Nodes (22): graphImagesFor(), readChart(), checkHtml(), checkTitle(), cache, escapeHtml(), renderTexOrError(), renderTexWithResult() (+14 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (41): b, bigops, c, calculus, fn, fr, fractions, functions (+33 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "Board"
Cohesion: 0.09
Nodes (5): Board, clampZoom(), loadPrefs(), validView(), highlightName()

### Community 23 - "distributions.ts"
Cohesion: 0.16
Nodes (28): choose(), continuousQuantile(), discreteQuantile(), expSumValue(), factorialBig(), FAMILIES, integerParam(), invalid() (+20 more)

### Community 24 - "store.ts"
Cohesion: 0.06
Nodes (19): fake-indexeddb, BoardOptions, BoardBackend, BoardChange, BoardData, BoardStore, done(), fromRecord() (+11 more)

### Community 25 - "MathError"
Cohesion: 0.15
Nodes (45): MathError, angleBetween(), asMatrix(), basisOf(), cross(), Ctx, dataOf(), determinant() (+37 more)

### Community 26 - "assistant.ts"
Cohesion: 0.15
Nodes (19): AiAnswer, AiError, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible(), askThroughHost(), checkShape() (+11 more)

### Community 27 - "files.ts"
Cohesion: 0.13
Nodes (21): cache, capability(), ClaudeRuntime, hostDownloads, HostError, inClaudeViewer(), ModelTier, runtime() (+13 more)

### Community 28 - "supabase.ts"
Cohesion: 0.11
Nodes (36): @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken(), ensureSessionOf() (+28 more)

### Community 29 - "toLatex"
Cohesion: 0.09
Nodes (42): areaFor(), condLabel(), isStraight(), isVectorName(), itemFor(), linearItem(), looksLikePoint(), restrict() (+34 more)

### Community 30 - "gauss.ts"
Cohesion: 0.18
Nodes (16): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), isComplexValue(), isInequality(), isSegmentNode() (+8 more)

### Community 31 - "graph/space.ts"
Cohesion: 0.12
Nodes (46): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+38 more)

### Community 32 - "SheetEvaluator"
Cohesion: 0.11
Nodes (21): graphsForFile(), hide(), markdownForFile(), placeChart(), findFencedBlocks(), findSheetBySource(), SheetEditorOptions, Snapshot (+13 more)

### Community 33 - "calcResults.ts"
Cohesion: 0.12
Nodes (13): acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult, calcResults(), CheckWidget, formulasUntil() (+5 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "MathNode"
Cohesion: 0.10
Nodes (14): Definition, Line, ExactRandom, Elem, FiniteContext, chiSquareTest(), InferenceContext, MathNode (+6 more)

### Community 36 - "arithmetic.ts"
Cohesion: 0.06
Nodes (95): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+87 more)

### Community 37 - "namesIn"
Cohesion: 0.15
Nodes (34): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+26 more)

### Community 38 - "insert.ts"
Cohesion: 0.10
Nodes (19): @codemirror/view, InsertOptions, toggleLinePrefix(), LIST_STYLES, addPlaceholders, Placeholder, besideSchema(), BlockWidget (+11 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "statsShown.ts"
Cohesion: 0.15
Nodes (35): Lin, statisticOf(), check(), correlation(), count(), covariance(), Data, DATA_FUNCTIONS (+27 more)

### Community 41 - "graph.ts"
Cohesion: 0.12
Nodes (28): AT_X, cellHtml(), cellText(), COMPASS, createEdgeCell(), createGraph(), drawSchema(), edgeLook() (+20 more)

### Community 42 - "NotesStore"
Cohesion: 0.05
Nodes (46): accountSpace(), adoptGuestNotes(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf(), setCurrentAccount() (+38 more)

### Community 43 - "study.ts"
Cohesion: 0.16
Nodes (33): limit(), Asymptote, boundaries(), compiled(), cutsOf(), defined(), domainOf(), exact() (+25 more)

### Community 44 - "functions.ts"
Cohesion: 0.09
Nodes (60): ChartTable, CellResult, EMPTY, number(), addFormat(), divFormat(), Format, mulFormat() (+52 more)

### Community 45 - "domain.ts"
Cohesion: 0.12
Nodes (33): constantIntegrand(), depth(), integralRegion, LayeredSolid, Multiple, planeMargin(), PlanePart, radiusOf() (+25 more)

### Community 46 - "Stroke"
Cohesion: 0.14
Nodes (14): BOARD_PALETTES, BoardTheme, inkName(), mid(), outlineSvg(), PEN_SIZE, shapeSvg(), strokeOptions() (+6 more)

### Community 47 - "Sheet"
Cohesion: 0.11
Nodes (23): sheetBefore(), Mat, Sheet, RenderEnv, text(), tex(), text(), result() (+15 more)

### Community 48 - "probability.ts"
Cohesion: 0.12
Nodes (25): End, Family, Interval, ExactScope, fractionNear(), ALL, compileOf(), complement() (+17 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (36): DrawAction, adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners() (+28 more)

### Community 50 - "laplace.ts"
Cohesion: 0.10
Nodes (47): close(), definiteIntegral(), exValue(), samples(), EMPTY_SCOPE, scopeWith(), absOf(), boundsOf() (+39 more)

### Community 51 - "compileComplex"
Cohesion: 0.16
Nodes (22): inZ(), asin(), atan(), compileApply(), compileComplex(), compileFunction(), compileName(), complexScopeWith() (+14 more)

### Community 52 - "search.ts"
Cohesion: 0.18
Nodes (23): editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex() (+15 more)

### Community 53 - "h"
Cohesion: 0.08
Nodes (43): SyncStatus, AI_SERVICES, board, viewSwitch, openSignedOut(), printButton(), ShareDialogDeps, DEFAULT_SETTINGS (+35 more)

### Community 54 - "FormattedResult"
Cohesion: 0.20
Nodes (4): withWorkLimit(), FormattedResult, styleOf(), needsSymbols()

### Community 55 - "finite.ts"
Cohesion: 0.19
Nodes (26): countOf(), elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError, FiniteResult (+18 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "Pt"
Cohesion: 0.10
Nodes (16): coalesced(), EraseAction, Finger, LassoAction, MoveAction, PanAction, penErases(), PinchAction (+8 more)

### Community 58 - "Field"
Cohesion: 0.12
Nodes (7): characteristicPolynomial(), eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn()

### Community 59 - "grafo-html.mjs"
Cohesion: 0.25
Nodes (4): graphFile, names, namesFile, root

### Community 60 - "schema/shapes.ts"
Cohesion: 0.09
Nodes (14): @maxgraph/core, ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape (+6 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (24): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+16 more)

### Community 62 - ".folderItem"
Cohesion: 0.20
Nodes (4): clear(), formatDate(), NotesPanel, NotesPanelDeps

### Community 63 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 65 - "formatNumber"
Cohesion: 0.09
Nodes (41): decimalSeparator(), Digits, formatNumber(), formatRational(), fromNumber(), fromRational(), SUPERSCRIPT, writeDigits() (+33 more)

### Community 66 - "parseSchema"
Cohesion: 0.15
Nodes (17): schemaSummary(), svg(), base64(), hide(), OPEN, schemasForFile(), schemasFromFile(), unhide() (+9 more)

### Community 67 - "statsGraph.ts"
Cohesion: 0.14
Nodes (22): FieldContext, fourierItems(), isFourierLine(), isTestLine(), number(), testItems(), classes(), dataOf() (+14 more)

### Community 68 - "view3d.ts"
Cohesion: 0.10
Nodes (37): Face, planeTolerance(), regionFaces(), surfacePlane(), Plane, Vec3, escapeXml(), arcPoints() (+29 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "board.ts"
Cohesion: 0.06
Nodes (62): Action, ACTION_NAMES, DOT_SIZES, EraserMode, HANDLE_REACH, ICON, MODE_NAMES, Prefs (+54 more)

### Community 72 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 73 - "blockMove.ts"
Cohesion: 0.22
Nodes (17): blank(), blockPlace(), closed(), closeIdx(), fenceClosed(), findBlock(), invisible(), markMoves() (+9 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (57): primitive(), linearCells(), atValues(), Converter, coordinates(), decimalText(), definiteParts(), definiteValue() (+49 more)

### Community 75 - "sheet.ts"
Cohesion: 0.07
Nodes (31): Ode, OdeFunction, NUMERICAL, differentialRequest, pieces(), bracketParts(), BRACKETS, chainOf() (+23 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.05
Nodes (63): alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ARROW_NAMES, AT_ICONS (+55 more)

### Community 79 - "Dove sono le cose"
Cohesion: 0.15
Nodes (24): Dove sono le cose, Glifo – architettura, isComplexLine(), GraphError, at(), breakEven(), dataLine(), dataRange() (+16 more)

### Community 82 - "editor.test.ts"
Cohesion: 0.10
Nodes (18): @codemirror/lang-markdown, templateInsertion(), buildDecorations(), clearAllPlaceholders(), clearPlaceholders, CommandTarget, contains(), currentIndex() (+10 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.20
Nodes (6): centerOf(), clickOn(), ffmpeg, SCENES, SIZE, work

### Community 90 - "Abbonamenti"
Cohesion: 0.14
Nodes (14): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+6 more)

### Community 91 - "schema/templates.ts"
Cohesion: 0.11
Nodes (18): SchemaEditorOptions, DEFAULT_EDGE, Schema, SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), conceptMap (+10 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.20
Nodes (4): device(), login(), newContext, waitFor()

### Community 97 - "Il database degli account (Supabase)"
Cohesion: 0.17
Nodes (11): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Nell'app, Note condivise con un link (+3 more)

### Community 98 - "editor/editor.ts"
Cohesion: 0.06
Nodes (39): description, name, private, type, version, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands (+31 more)

### Community 100 - "Parser"
Cohesion: 0.29
Nodes (3): FormulaError, parseFormula(), Parser

### Community 101 - "@codemirror/state"
Cohesion: 0.11
Nodes (20): @codemirror/state, noIndentedCode, misspelledMark, refreshSpelling, setTarget, SKIP, SpellTarget, wordsToCheck() (+12 more)

### Community 102 - "toolbar.ts"
Cohesion: 0.19
Nodes (15): insertBlock(), wrapSelection(), Action, createToolbar(), insertCode(), insertLink(), listMenu(), listStyle() (+7 more)

### Community 103 - "formulaGraph"
Cohesion: 0.13
Nodes (25): addToGraphBlock(), formulaAtCursor(), GraphLabelLines, insertGraphBlock(), setGraphLabels(), mathRegionAt(), isNumericalLine(), numericalItems() (+17 more)

### Community 104 - "editor/lists.ts"
Cohesion: 0.24
Nodes (25): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+17 more)

### Community 106 - "fake-supabase.mjs"
Cohesion: 0.29
Nodes (5): b64(), CODE, GOOGLE_CODE, ROOT, SUPABASE_URL

### Community 107 - "inference.ts"
Cohesion: 0.19
Nodes (22): confidence(), confidenceShown(), Given, hypothesisTest(), interval(), meanOf(), nameOf(), num() (+14 more)

### Community 108 - "spreadsheet/format.ts"
Cohesion: 0.16
Nodes (20): KINDS, sheetSummary(), WidgetBlock, WidgetKind, SchemaBlock, decimalsOf(), fixedNumber(), formatNumber() (+12 more)

### Community 109 - "Glifo – note per Claude"
Cohesion: 0.22
Nodes (9): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole (+1 more)

### Community 110 - "page.ts"
Cohesion: 0.06
Nodes (45): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), currentAccount(), PullResult, openShareDialog(), changeAccess() (+37 more)

### Community 111 - "mathContext.ts"
Cohesion: 0.14
Nodes (19): @lezer/common, tabOutOfMath(), CODE_NODES, CommandToken, commandTokenAt(), isInCode(), MATH_NODES, mathContextAt() (+11 more)

### Community 113 - "sidePanel.ts"
Cohesion: 0.19
Nodes (16): AiResult, SuggestionItem, isConfidentAnswer(), SearchResult, CATEGORIES, symbolsInCategory(), cardPreviewTex(), formPreviewTex() (+8 more)

### Community 116 - "graph/file.ts"
Cohesion: 0.11
Nodes (29): FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), OPEN, swatchSvg(), titleBand(), ACCENTS (+21 more)

### Community 117 - "solve.ts"
Cohesion: 0.17
Nodes (24): splitRoot(), isStandardUnknown(), RelOp, breaks(), cubeRoot(), equation(), holds(), inequality() (+16 more)

### Community 121 - ".int"
Cohesion: 0.24
Nodes (8): addExp(), exactIntervalProbability(), expSum, subtractExp(), divideExp(), exactSetProbability(), quadraticIn(), R()

### Community 122 - ".constructor"
Cohesion: 0.18
Nodes (4): closeMathBlockOnEnter(), EditorCallbacks, MarkdownEditor, insertTemplate()

### Community 123 - "renderTex"
Cohesion: 0.24
Nodes (5): cleanKatexError(), renderTex(), displayCode(), preventFocusSteal(), SidePanel

### Community 124 - "spellcheck"
Cohesion: 0.21
Nodes (8): spellcheck(), close(), misspelledAt(), openAt(), replace(), tooltipView(), SpellChecker, SpellcheckOptions

### Community 125 - "sql.ts"
Cohesion: 0.17
Nodes (18): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+10 more)

### Community 126 - "logo.ts"
Cohesion: 0.33
Nodes (6): sidebarToggle(), BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark()

### Community 127 - "Glifo"
Cohesion: 0.15
Nodes (13): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Funzionalità (+5 more)

### Community 128 - "createFakeSupabase"
Cohesion: 0.60
Nodes (6): createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 129 - "smoke-test.mjs"
Cohesion: 0.29
Nodes (4): markdown-it, vite, firstVisit(), plainContext

### Community 131 - "tutorial.ts"
Cohesion: 0.15
Nodes (14): helpButton, openGuide(), HINT_MS, markSeen(), openTutorial(), show(), richText(), showTutorialHint() (+6 more)

### Community 132 - "blockMoveEditor.test.ts"
Cohesion: 0.24
Nodes (13): blockMoveTransaction(), contentHash(), fenceName(), MOVABLE, moveAttrs(), parseBlocks(), findSheetBlock(), apply() (+5 more)

### Community 133 - "SuggestionController"
Cohesion: 0.21
Nodes (4): EditorMathContext, expand(), preferredIndex(), SuggestionController

### Community 136 - "math/calculus.ts"
Cohesion: 0.30
Nodes (13): argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot(), fieldOn(), numericPartials() (+5 more)

### Community 137 - "schema/preview.ts"
Cohesion: 0.23
Nodes (11): renameGraphScope(), renameScopeKeys(), draw(), drawCached(), drawn, errorHtml(), fill(), hydrateSchemas() (+3 more)

### Community 138 - "Distribution"
Cohesion: 0.18
Nodes (8): Distribution, integerRange(), intervalProbability(), pValue(), rejection(), TestResult, numericExpectation(), setProbability()

### Community 139 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 140 - "ui/preview.ts"
Cohesion: 0.32
Nodes (8): BlockKind, MoveDir, hydrateSheets(), BLOCK_NAMES, blockKindOf(), MOVABLE_BLOCKS, moveButtonsHtml(), PATHS

### Community 141 - "integrate"
Cohesion: 0.27
Nodes (11): bestAlong(), boundingBox(), insideIntervals(), integrateDomain(), integrateEdges(), integrate(), kronrod(), spend() (+3 more)

### Community 142 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

### Community 144 - "moveBlock.ts"
Cohesion: 0.25
Nodes (5): blockMoved, blockMoves(), LineMap, BlockMove, MoveFailure

### Community 145 - "linear.test.ts"
Cohesion: 0.29
Nodes (7): EXACT, FLOAT, A, B, q(), result(), text()

### Community 146 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, Quando lo studente dice di cominciare

### Community 147 - "Idee per il futuro"
Cohesion: 0.33
Nodes (6): Account: i propri appunti su ogni dispositivo, anche da condividere, Idee per il futuro, In programma, La lavagna: idee in più, Più avanti, Schemi: idee in più

### Community 149 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 150 - "I modelli e le chiavi API"
Cohesion: 0.50
Nodes (4): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), Le idee dello studente (5 ottobre 2026)

## Knowledge Gaps
- **596 isolated node(s):** `Account: i propri appunti su ogni dispositivo, anche da condividere`, `La lavagna: idee in più`, `Schemi: idee in più`, `Moves`, `Writing` (+591 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 825 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **28 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `touchlog.ts`, `parse.ts`, `main.ts`, `odesolve.ts`, `blockMoveEditor.test.ts`, `spec.ts`, `several.ts`, `num`, `graph/preview.ts`, `schema/preview.ts`, `math/calculus.ts`, `tutorial.ts`, `svg.ts`, `spreadsheet/editor.ts`, `integrate`, `Rational`, `moveBlock.ts`, `SheetEditor`, `numerical.ts`, `markdown.ts`, `ui/preview.ts`, `PreviewCallbacks`, `Board`, `store.ts`, `MathError`, `assistant.ts`, `supabase.ts`, `toLatex`, `graph/space.ts`, `SheetEvaluator`, `logic.ts`, `MathNode`, `arithmetic.ts`, `namesIn`, `insert.ts`, `statsShown.ts`, `graph.ts`, `NotesStore`, `study.ts`, `functions.ts`, `Stroke`, `board/shapes.ts`, `laplace.ts`, `compileComplex`, `FormattedResult`, `finite.ts`, `Pt`, `Preview`, `statsGraph.ts`, `board.ts`, `blockMove.ts`, `symbolic.ts`, `sheet.ts`, `schema/editor.ts`, `Parser`, `toolbar.ts`, `formulaGraph`, `inference.ts`, `spreadsheet/format.ts`, `graph/file.ts`, `.int`, `.constructor`, `logo.ts`?**
  _High betweenness centrality (0.169) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `touchlog.ts`, `parse.ts`, `main.ts`, `tutorial.ts`, `blockMoveEditor.test.ts`, `sync.ts`, `num`, `schema/preview.ts`, `markers.ts`, `svg.ts`, `spreadsheet/editor.ts`, `linear.test.ts`, `markdown.ts`, `appleTouch`, `store.ts`, `distributions.ts`, `assistant.ts`, `supabase.ts`, `arithmetic.ts`, `insert.ts`, `resize.ts`, `NotesStore`, `Stroke`, `Sheet`, `board/shapes.ts`, `search.ts`, `h`, `parseSchema`, `board.ts`, `sheet.ts`, `schema/editor.ts`, `Dove sono le cose`, `editor.test.ts`, `editor/editor.ts`, `@codemirror/state`, `formulaGraph`, `page.ts`, `sidePanel.ts`, `sql.ts`, `logo.ts`?**
  _High betweenness centrality (0.124) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `main.ts`, `tutorial.ts`, `graph/preview.ts`, `ui/preview.ts`, `spreadsheet/editor.ts`, `SchemaEditor`, `PreviewCallbacks`, `SheetEditor`, `Board`, `resize.ts`, `graph.ts`, `NotesStore`, `.folderItem`, `board.ts`, `schema/editor.ts`, `@codemirror/state`, `toolbar.ts`, `page.ts`, `sidePanel.ts`, `renderTex`, `spellcheck`, `logo.ts`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._
- **Are the 173 inferred relationships involving `Dove sono le cose` (e.g. with `adoptGuestNotes()` and `sharedLinks()`) actually correct?**
  _`Dove sono le cose` has 173 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Account: i propri appunti su ogni dispositivo, anche da condividere`, `La lavagna: idee in più`, `Schemi: idee in più` to the rest of the system?**
  _596 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `touchlog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08653061224489796 - nodes in this community are weakly interconnected._
- **Should `parse.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07214924804873406 - nodes in this community are weakly interconnected._