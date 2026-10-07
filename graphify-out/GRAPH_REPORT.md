# Graph Report - matherdown  (2026-10-07)

## Corpus Check
- 270 files · ~523,941 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 4447 nodes · 16075 edges · 128 communities (105 shown, 23 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 483 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `fdf90336`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- touchlog.ts
- Parser
- main.ts
- odesolve.ts
- sync.ts
- spec.ts
- several.ts
- num
- graph/preview.ts
- parse.ts
- complex.ts
- editor/lists.ts
- svg.ts
- spreadsheet/editor.ts
- SchemaEditor
- conics.ts
- SheetEditor
- compile
- MathError
- markdown.ts
- index.ts
- engine.ts
- Board
- distributions.ts
- store.ts
- linear.ts
- dialogs.ts
- files.ts
- Stroke
- toLatex
- gauss.ts
- graph/space.ts
- SheetEvaluator
- calcResults.ts
- logic.ts
- FoldersStore
- arithmetic.ts
- namesIn
- schemaBlocks.ts
- resize.ts
- statsShown.ts
- graph3d.test.ts
- NotesStore
- study.ts
- functions.ts
- scopeWith
- board.ts
- page.ts
- probability.ts
- board/shapes.ts
- laplace.ts
- touchLog
- sidePanel.ts
- h
- schemaTools.test.ts
- finite.ts
- 20261004091555_note_condivise.sql
- Pt
- Field
- grafo-html.mjs
- schema/shapes.ts
- dependencies
- .folderItem
- Le spiegazioni, come funzionano
- ui/preview.ts
- formatNumber
- parseSchema
- fourier.ts
- view3d.ts
- Benvenuto in Glifo
- compilerOptions
- Dove sono le cose
- Piano per piano
- blockMove.ts
- symbolic.ts
- sheet.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- spreadsheet/format.ts
- session-start.sh
- .claude/CLAUDE.md
- placeholders.ts
- tutorial.mjs
- Abbonamenti
- schema/templates.ts
- Costi
- supabase-stub.sql
- account-test.mjs
- Il database degli account (Supabase)
- vitest
- Parser
- boardTouchLog.test.ts
- toolbar.ts
- icons.mjs
- fake-supabase.mjs
- Schema
- Glifo – note per Claude
- supabase.ts
- graph/file.ts
- linsys.ts
- Rational
- SidePanel
- spellcheck
- sql.ts
- logo.ts
- Glifo
- createFakeSupabase
- smoke-test.mjs
- scripts

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
- `Come viene pubblicata` --references--> `dist()`  [INFERRED]
  README.md → src/board/shapes.ts
- `Dove sono le cose` --references--> `ConicElements`  [INFERRED]
  ARCHITETTURA.md → src/math/conics.ts
- `Funzionalità` --references--> `k()`  [INFERRED]
  README.md → src/math/numerical.ts
- `Dove sono le cose` --references--> `texts()`  [INFERRED]
  ARCHITETTURA.md → tests/boardTouchLog.test.ts
- `Dove sono le cose` --references--> `adoptGuestNotes()`  [INFERRED]
  ARCHITETTURA.md → src/account/space.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (128 total, 23 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.15
Nodes (16): at(), browserStore, clip(), KINDS, LOG_KEY, Moves, MOVES_MAX, pointerDetail() (+8 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (115): addToGraphBlock(), setGraphLabels(), WidgetBlock, graphsForFile(), remapGraphLines(), account, accountButton, accountProblem() (+107 more)

### Community 3 - "odesolve.ts"
Cohesion: 0.08
Nodes (77): addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames(), constantParticular() (+69 more)

### Community 4 - "sync.ts"
Cohesion: 0.05
Nodes (37): AccountSync, withLock(), Account, EMPTY_STATE, FolderChange, FolderRow, isEmpty(), iso() (+29 more)

### Community 5 - "spec.ts"
Cohesion: 0.06
Nodes (92): conicItems(), isConicLine(), quadricEquation(), fourierItems(), isFourierLine(), onlyComplex(), isTestLine(), multipleOf() (+84 more)

### Community 6 - "several.ts"
Cohesion: 0.09
Nodes (49): Piece, severalLimit, Condition, Family, Group, Root, Shape, fractionNear() (+41 more)

### Community 7 - "num"
Cohesion: 0.14
Nodes (85): atIntegers(), withoutAbs(), hyperbolicToExp(), polyEx(), similarSolution(), bigGcd(), byParts(), candidates() (+77 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (40): addLabel(), boxes, cameras, complexCoord(), containing(), coord(), drawings, drawnViews (+32 more)

### Community 9 - "parse.ts"
Cohesion: 0.03
Nodes (81): GraphItem, parseGraph(), PALETTES, EMPTY_SCOPE, errorMessage(), ACCENTS, AND_WORDS, BARE_WORDS (+73 more)

### Community 10 - "complex.ts"
Cohesion: 0.07
Nodes (55): add(), allRoots(), arg(), asin(), atan(), compileApply(), compileComplex(), compileFunction() (+47 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.09
Nodes (62): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+54 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (54): graphify, contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), dataWindow() (+46 more)

### Community 13 - "spreadsheet/editor.ts"
Cohesion: 0.08
Nodes (64): currentCall(), Editing, MenuEntry, Move, openSheetEditor(), PATHS, formatCode(), formatValue() (+56 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.08
Nodes (16): SchemaEditor, cellText(), createEdgeCell(), edgeLook(), edgeStyle(), edgeTextAt(), insertSchema(), nodeLook() (+8 more)

### Community 15 - "conics.ts"
Cohesion: 0.16
Nodes (30): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+22 more)

### Community 16 - "SheetEditor"
Cohesion: 0.09
Nodes (5): rangeLabel(), SheetEditor, serializeSheet(), CellRange, cloneSheet()

### Community 17 - "compile"
Cohesion: 0.07
Nodes (58): argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot(), fieldOn(), outward() (+50 more)

### Community 18 - "MathError"
Cohesion: 0.12
Nodes (51): isNumericalLine(), numericalItems(), MathError, bisection(), cholesky(), condition(), derivative(), exactPolynomial() (+43 more)

### Community 19 - "markdown.ts"
Cohesion: 0.09
Nodes (39): lineDepth(), parseBlockMath(), labelHtml(), texHtml(), dataRange(), checkHtml(), checkTitle(), cache (+31 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (41): b, bigops, c, calculus, fn, fr, fractions, functions (+33 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "Board"
Cohesion: 0.10
Nodes (3): Board, loadPrefs(), highlightName()

### Community 23 - "distributions.ts"
Cohesion: 0.07
Nodes (60): addExp(), choose(), continuousQuantile(), discreteQuantile(), exactIntervalProbability(), factorialBig(), FAMILIES, Family (+52 more)

### Community 24 - "store.ts"
Cohesion: 0.06
Nodes (17): fake-indexeddb, BoardOptions, BoardBackend, BoardStore, done(), fromRecord(), IdbBoards, MemoryBoards (+9 more)

### Community 25 - "linear.ts"
Cohesion: 0.10
Nodes (58): angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, determinant(), dims() (+50 more)

### Community 26 - "dialogs.ts"
Cohesion: 0.06
Nodes (46): @anthropic-ai/sdk, AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible() (+38 more)

### Community 27 - "files.ts"
Cohesion: 0.11
Nodes (26): cache, capability(), ClaudeRuntime, hostDownloads, HostError, hostSample, inClaudeViewer(), ModelTier (+18 more)

### Community 28 - "Stroke"
Cohesion: 0.19
Nodes (8): EraseAction, Step, shapeSvg(), handleScale(), shapePoints(), BoardChange, BoardData, Stroke

### Community 29 - "toLatex"
Cohesion: 0.10
Nodes (36): FieldContext, criticalLine(), named(), severalItems(), surface(), names(), STUDY_GRAPH, studyItems() (+28 more)

### Community 30 - "gauss.ts"
Cohesion: 0.17
Nodes (19): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexLine(), isComplexValue() (+11 more)

### Community 31 - "graph/space.ts"
Cohesion: 0.12
Nodes (49): sampleRegion(), addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon() (+41 more)

### Community 32 - "SheetEvaluator"
Cohesion: 0.16
Nodes (12): sheetSummary(), SheetEditorOptions, Snapshot, evaluateSheet(), SheetEvaluator, SheetModel, sheetSize(), cellName() (+4 more)

### Community 33 - "calcResults.ts"
Cohesion: 0.12
Nodes (13): CalcCheck, calcOutcomes(), calcPlugin, CalcResult, calcResults(), CheckWidget, formulasUntil(), insertResult() (+5 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "FoldersStore"
Cohesion: 0.20
Nodes (3): cleanFolderName(), FoldersStore, sameName()

### Community 36 - "arithmetic.ts"
Cohesion: 0.09
Nodes (56): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+48 more)

### Community 37 - "namesIn"
Cohesion: 0.14
Nodes (35): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+27 more)

### Community 38 - "schemaBlocks.ts"
Cohesion: 0.12
Nodes (18): @codemirror/view, InsertOptions, toggleLinePrefix(), LIST_STYLES, besideSchema(), BlockWidget, findWidgetBlocks(), guardBlocks() (+10 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "statsShown.ts"
Cohesion: 0.19
Nodes (29): check(), correlation(), count(), covariance(), Data, dataStatistic(), deviation(), fail() (+21 more)

### Community 41 - "graph3d.test.ts"
Cohesion: 0.20
Nodes (14): staticGraphSvg(), chooseWindow(), Box, chooseBox(), GraphSpec, graphSvg(), DEFAULT_CAMERA, Quality (+6 more)

### Community 42 - "NotesStore"
Cohesion: 0.07
Nodes (41): accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf() (+33 more)

### Community 43 - "study.ts"
Cohesion: 0.15
Nodes (34): nameLatex(), breaks(), periodOf(), Asymptote, compiled(), cutsOf(), defined(), domainOf() (+26 more)

### Community 44 - "functions.ts"
Cohesion: 0.08
Nodes (62): EMPTY, number(), addFormat(), divFormat(), GENERAL, most(), mulFormat(), withCents() (+54 more)

### Community 45 - "scopeWith"
Cohesion: 0.09
Nodes (48): constantIntegrand(), depth(), inequalityMargin(), integralRegion, LayeredSolid, Multiple, planeMargin(), PlanePart (+40 more)

### Community 46 - "board.ts"
Cohesion: 0.07
Nodes (38): Action, ACTION_NAMES, DOT_SIZES, DrawAction, EraserMode, HANDLE_REACH, ICON, MODE_NAMES (+30 more)

### Community 47 - "page.ts"
Cohesion: 0.14
Nodes (16): hydrateGraphs(), SharedNote, body, draw(), isDark(), saveButton, saveCopy(), settings (+8 more)

### Community 48 - "probability.ts"
Cohesion: 0.07
Nodes (39): number(), testItems(), classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX, Line (+31 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.14
Nodes (34): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+26 more)

### Community 50 - "laplace.ts"
Cohesion: 0.10
Nodes (53): factoredPolynomial(), oneFraction(), beyondPoles(), compiled(), E, exp(), fractionShown(), HALF (+45 more)

### Community 51 - "touchLog"
Cohesion: 0.29
Nodes (3): movesLine(), seconds(), touchLog

### Community 52 - "sidePanel.ts"
Cohesion: 0.07
Nodes (42): templateInsertion(), EditorMathContext, expand(), preferredIndex(), SuggestionController, SuggestionItem, editDistance(), normalizeText() (+34 more)

### Community 53 - "h"
Cohesion: 0.08
Nodes (37): SyncStatus, viewSwitch, AccountButton, confirmAccountDeletion(), messageOf(), openAccountDialog(), openLoginDialog(), codeStep() (+29 more)

### Community 54 - "schemaTools.test.ts"
Cohesion: 0.16
Nodes (17): alignBoxes(), Alignment, Box, distributeBoxes(), Position, base64(), crc32(), svgSize() (+9 more)

### Community 55 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "Pt"
Cohesion: 0.10
Nodes (15): clampZoom(), coalesced(), Finger, MoveAction, PanAction, penErases(), PinchAction, pointsOf() (+7 more)

### Community 58 - "Field"
Cohesion: 0.12
Nodes (7): characteristicPolynomial(), eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn()

### Community 59 - "grafo-html.mjs"
Cohesion: 0.22
Nodes (4): graphFile, names, namesFile, root

### Community 60 - "schema/shapes.ts"
Cohesion: 0.09
Nodes (15): @maxgraph/core, ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape (+7 more)

### Community 61 - "dependencies"
Cohesion: 0.06
Nodes (34): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+26 more)

### Community 62 - ".folderItem"
Cohesion: 0.22
Nodes (3): formatDate(), NotesPanel, NotesPanelDeps

### Community 63 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 64 - "ui/preview.ts"
Cohesion: 0.08
Nodes (24): GraphLabels, remapLineKeys(), renameGraphScope(), renameScopeKeys(), BlockKind, MoveDir, draw(), drawCached() (+16 more)

### Community 65 - "formatNumber"
Cohesion: 0.10
Nodes (39): realPart(), decimalSeparator(), Digits, formatNumber(), FormatOptions, formatRational(), fromNumber(), fromRational() (+31 more)

### Community 66 - "parseSchema"
Cohesion: 0.15
Nodes (16): schemaSummary(), svg(), hide(), OPEN, schemasForFile(), schemasFromFile(), unhide(), isRecord() (+8 more)

### Community 67 - "fourier.ts"
Cohesion: 0.25
Nodes (16): absOf(), boundsOf(), close(), definite(), fourierProblem, fourierShown(), isTrig(), isZero() (+8 more)

### Community 68 - "view3d.ts"
Cohesion: 0.09
Nodes (34): tickLabel(), Detail, Face, FAST, FINE, Plane, Vec3, escapeXml() (+26 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "Dove sono le cose"
Cohesion: 0.08
Nodes (41): Dove sono le cose, Glifo – architettura, LassoAction, centerOn(), copyStrokes(), cross(), IDENTITY, insideLasso() (+33 more)

### Community 72 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 73 - "blockMove.ts"
Cohesion: 0.11
Nodes (34): blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove, blockPlace(), closed() (+26 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (64): fnLabel(), primitive(), verified(), atValues(), cancelLinear(), Converter, coordinates(), decimalText() (+56 more)

### Community 75 - "sheet.ts"
Cohesion: 0.06
Nodes (56): numericPartials(), ExactComplexScope, formatGauss(), formatList(), join(), Ode, OdeFunction, expSumValue() (+48 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.05
Nodes (63): ALIGN, ARROW_NAMES, AT_ICONS, AT_NAMES, BASE_PRESETS, BIG_ARROWS, DB_PRESETS, Direction (+55 more)

### Community 79 - "spreadsheet/format.ts"
Cohesion: 0.10
Nodes (36): at(), breakEven(), Point, quantity(), tableItems(), textLabel(), chartData, chartFrom() (+28 more)

### Community 82 - "placeholders.ts"
Cohesion: 0.10
Nodes (14): addPlaceholders, buildDecorations(), clearAllPlaceholders(), clearPlaceholders, contains(), currentIndex(), filledMark, getPlaceholders() (+6 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.20
Nodes (6): centerOf(), clickOn(), ffmpeg, SCENES, SIZE, work

### Community 90 - "Abbonamenti"
Cohesion: 0.09
Nodes (23): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Deciso (5 ottobre 2026), Deciso (5 ottobre 2026) (+15 more)

### Community 91 - "schema/templates.ts"
Cohesion: 0.13
Nodes (15): DEFAULT_EDGE, SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), conceptMap, cycle, er (+7 more)

### Community 92 - "Costi"
Cohesion: 0.13
Nodes (12): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, Quando lo studente dice di cominciare, Account: i propri appunti su ogni dispositivo, anche da condividere, Idee per il futuro (+4 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.20
Nodes (4): device(), login(), newContext, waitFor()

### Community 97 - "Il database degli account (Supabase)"
Cohesion: 0.17
Nodes (11): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Nell'app, Note condivise con un link (+3 more)

### Community 98 - "vitest"
Cohesion: 0.03
Nodes (79): description, name, private, type, version, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown (+71 more)

### Community 100 - "Parser"
Cohesion: 0.29
Nodes (3): FormulaError, parseFormula(), Parser

### Community 101 - "boardTouchLog.test.ts"
Cohesion: 0.20
Nodes (8): isSaved(), LOG_MAX_LINES, LogStore, SavedLog, clock(), memoryStore(), newLog(), texts()

### Community 102 - "toolbar.ts"
Cohesion: 0.10
Nodes (19): EditorCallbacks, MarkdownEditor, insertBlock(), insertTemplate(), wrapSelection(), SidePanelDeps, Action, createToolbar() (+11 more)

### Community 106 - "fake-supabase.mjs"
Cohesion: 0.25
Nodes (6): @electric-sql/pglite, b64(), CODE, GOOGLE_CODE, ROOT, SUPABASE_URL

### Community 108 - "Schema"
Cohesion: 0.39
Nodes (3): SchemaEditorOptions, Schema, serializeSchema()

### Community 109 - "Glifo – note per Claude"
Cohesion: 0.25
Nodes (8): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, Promemoria per lo studente, Regole, sqlite()

### Community 110 - "supabase.ts"
Cohesion: 0.06
Nodes (61): @supabase/supabase-js, AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), accountError, appUrl(), call() (+53 more)

### Community 116 - "graph/file.ts"
Cohesion: 0.10
Nodes (35): FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsFromFile(), hide(), OPEN (+27 more)

### Community 117 - "linsys.ts"
Cohesion: 0.11
Nodes (42): evaluateLinear(), LinearScope, rref(), choices(), gcd(), isStandardUnknown(), linearSystem(), matrixEquation() (+34 more)

### Community 121 - "Rational"
Cohesion: 0.10
Nodes (24): Part, expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactRandom, exactRoot() (+16 more)

### Community 123 - "SidePanel"
Cohesion: 0.22
Nodes (5): formulaAtCursor(), SymbolForm, displayCode(), preventFocusSteal(), SidePanel

### Community 124 - "spellcheck"
Cohesion: 0.21
Nodes (8): spellcheck(), close(), misspelledAt(), openAt(), replace(), tooltipView(), SpellChecker, SpellcheckOptions

### Community 125 - "sql.ts"
Cohesion: 0.17
Nodes (18): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+10 more)

### Community 126 - "logo.ts"
Cohesion: 0.39
Nodes (5): BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark()

### Community 127 - "Glifo"
Cohesion: 0.15
Nodes (13): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Funzionalità (+5 more)

### Community 128 - "createFakeSupabase"
Cohesion: 0.60
Nodes (6): createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 129 - "smoke-test.mjs"
Cohesion: 0.29
Nodes (4): markdown-it, vite, firstVisit(), plainContext

### Community 139 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

## Knowledge Gaps
- **596 isolated node(s):** `session-start.sh script`, `name`, `private`, `version`, `description` (+591 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 828 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **23 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `touchlog.ts`, `Parser`, `main.ts`, `odesolve.ts`, `spec.ts`, `several.ts`, `num`, `graph/preview.ts`, `parse.ts`, `complex.ts`, `svg.ts`, `spreadsheet/editor.ts`, `SchemaEditor`, `conics.ts`, `SheetEditor`, `compile`, `MathError`, `markdown.ts`, `Board`, `distributions.ts`, `store.ts`, `linear.ts`, `dialogs.ts`, `Stroke`, `gauss.ts`, `graph/space.ts`, `SheetEvaluator`, `logic.ts`, `arithmetic.ts`, `namesIn`, `schemaBlocks.ts`, `NotesStore`, `study.ts`, `functions.ts`, `board/shapes.ts`, `laplace.ts`, `touchLog`, `h`, `schemaTools.test.ts`, `finite.ts`, `Pt`, `ui/preview.ts`, `fourier.ts`, `view3d.ts`, `blockMove.ts`, `symbolic.ts`, `sheet.ts`, `schema/editor.ts`, `spreadsheet/format.ts`, `Parser`, `boardTouchLog.test.ts`, `toolbar.ts`, `supabase.ts`, `graph/file.ts`, `linsys.ts`, `Rational`?**
  _High betweenness centrality (0.159) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `touchlog.ts`, `main.ts`, `sync.ts`, `spec.ts`, `num`, `parse.ts`, `editor/lists.ts`, `spreadsheet/editor.ts`, `markdown.ts`, `distributions.ts`, `store.ts`, `linear.ts`, `dialogs.ts`, `schemaBlocks.ts`, `resize.ts`, `graph3d.test.ts`, `NotesStore`, `board.ts`, `board/shapes.ts`, `laplace.ts`, `sidePanel.ts`, `h`, `schemaTools.test.ts`, `ui/preview.ts`, `parseSchema`, `Dove sono le cose`, `blockMove.ts`, `sheet.ts`, `spreadsheet/format.ts`, `boardTouchLog.test.ts`, `supabase.ts`, `sql.ts`, `logo.ts`?**
  _High betweenness centrality (0.097) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `main.ts`, `graph/preview.ts`, `spreadsheet/editor.ts`, `SchemaEditor`, `SheetEditor`, `Board`, `dialogs.ts`, `files.ts`, `resize.ts`, `NotesStore`, `board.ts`, `page.ts`, `sidePanel.ts`, `.folderItem`, `ui/preview.ts`, `schema/editor.ts`, `vitest`, `toolbar.ts`, `supabase.ts`, `SidePanel`, `spellcheck`?**
  _High betweenness centrality (0.041) - this node is a cross-community bridge._
- **Are the 173 inferred relationships involving `Dove sono le cose` (e.g. with `adoptGuestNotes()` and `sharedLinks()`) actually correct?**
  _`Dove sono le cose` has 173 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `name`, `private` to the rest of the system?**
  _596 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.03912010998625172 - nodes in this community are weakly interconnected._
- **Should `odesolve.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08225108225108226 - nodes in this community are weakly interconnected._