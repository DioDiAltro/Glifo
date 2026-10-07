# Graph Report - matherdown  (2026-10-07)

## Corpus Check
- 281 files · ~549,330 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 4621 nodes · 16812 edges · 138 communities (111 shown, 27 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 515 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `5b4114f1`
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
- editor/lists.ts
- svg.ts
- spreadsheet/editor.ts
- SchemaEditor
- conics.ts
- SheetEditor
- compile
- numerical.ts
- markdown.ts
- index.ts
- spell.test.ts
- Board
- distributions.ts
- store.ts
- MathError
- assistant.ts
- graph.ts
- supabase.ts
- toLatex
- gantt.ts
- view3d.ts
- spreadsheet.test.ts
- calcResults.ts
- logic.ts
- laplace.ts
- arithmetic.ts
- namesIn
- scopeWith
- resize.ts
- sheet.ts
- Pt
- NotesStore
- study.ts
- functions.ts
- plan.ts
- formulaGraph
- .add
- probability.ts
- board/shapes.ts
- schema/templates.ts
- Rational
- search.ts
- h
- .constructor
- finite.ts
- 20261004091555_note_condivise.sql
- board.ts
- Field
- grafo-html.mjs
- schema/shapes.ts
- dependencies
- FoldersStore
- Le spiegazioni, come funzionano
- ui/preview.ts
- linsys.ts
- parseSchema
- statsGraph.ts
- gauss.ts
- Benvenuto in Glifo
- compilerOptions
- selection.ts
- Piano per piano
- blockMove.ts
- symbolic.ts
- Sheet
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- Dove sono le cose
- session-start.sh
- .claude/CLAUDE.md
- editor.test.ts
- tutorial.mjs
- Abbonamenti
- .folderItem
- supabase-stub.sql
- account-test.mjs
- Il database degli account (Supabase)
- editor/editor.ts
- Parser
- spellcheck
- toolbar.ts
- .openMenu
- files.ts
- icons.mjs
- fake-supabase.mjs
- render/lists.ts
- xlsx.ts
- Glifo – note per Claude
- page.ts
- devDependencies
- sidePanel.ts
- graph/file.ts
- solve.ts
- severalGraph.ts
- scripts
- renderTex
- Costi
- sql.ts
- Idee per il futuro
- Glifo
- createFakeSupabase
- smoke-test.mjs
- tutorial.ts
- La lavagna
- suggestions.ts
- I modelli e le chiavi API
- .formMatrix

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 199 edges
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
- `Dove sono le cose` --references--> `WidgetKind`  [INFERRED]
  ARCHITETTURA.md → src/editor/schemaBlocks.ts
- `Dove sono le cose` --references--> `texts()`  [INFERRED]
  ARCHITETTURA.md → tests/boardTouchLog.test.ts
- `Dove sono le cose` --references--> `adoptGuestNotes()`  [INFERRED]
  ARCHITETTURA.md → src/account/space.ts
- `Dove sono le cose` --references--> `shareNote()`  [INFERRED]
  ARCHITETTURA.md → src/account/supabase.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (138 total, 27 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.08
Nodes (28): Attenzione a, at(), browserStore, clip(), isSaved(), KINDS, LOG_KEY, LOG_MAX_LINES (+20 more)

### Community 1 - "parse.ts"
Cohesion: 0.08
Nodes (37): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe(), differentialInFraction() (+29 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (109): addToGraphBlock(), insertGraphBlock(), setGraphLabels(), WidgetBlock, graphsForFile(), remapGraphLines(), account, active (+101 more)

### Community 3 - "odesolve.ts"
Cohesion: 0.08
Nodes (80): substitute(), addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames() (+72 more)

### Community 4 - "sync.ts"
Cohesion: 0.05
Nodes (38): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+30 more)

### Community 5 - "spec.ts"
Cohesion: 0.06
Nodes (80): constantIntegrand(), depth(), inequalityMargin(), LayeredSolid, Multiple, multipleOf(), planeMargin(), PlanePart (+72 more)

### Community 6 - "several.ts"
Cohesion: 0.05
Nodes (87): close(), Definite, definiteIntegral(), exValue(), samples(), EMPTY_SCOPE, Digits, FormatOptions (+79 more)

### Community 7 - "num"
Cohesion: 0.13
Nodes (90): atIntegers(), linearTrig(), signsUp(), symbolicCoefficient(), withoutAbs(), hyperbolicToExp(), polyEx(), similarSolution() (+82 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (47): addLabel(), boxes, cameras, complexCoord(), coord(), drawings, drawnViews, endTex() (+39 more)

### Community 9 - "vitest"
Cohesion: 0.08
Nodes (31): vitest, staticGraphSvg(), chooseWindow(), chooseBox(), GraphItem, parseGraph(), graphSvg(), PALETTES (+23 more)

### Community 10 - "complex.ts"
Cohesion: 0.08
Nodes (44): add(), allRoots(), arg(), asin(), atan(), compileApply(), compileComplex(), compileFunction() (+36 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.12
Nodes (47): continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext(), isBlank() (+39 more)

### Community 12 - "svg.ts"
Cohesion: 0.08
Nodes (57): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), dataWindow(), domainEdge() (+49 more)

### Community 13 - "spreadsheet/editor.ts"
Cohesion: 0.12
Nodes (30): currentCall(), Editing, MenuEntry, Move, PATHS, SheetEditorOptions, Snapshot, adjustFormula() (+22 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.10
Nodes (6): isLanes(), SchemaEditor, withLaneContents(), NodeLook, serializeSchema(), tableMetrics()

### Community 15 - "conics.ts"
Cohesion: 0.21
Nodes (27): at(), centralCanonical(), Coefficients, coneCanonical(), conicOf(), det2(), det3(), determinant() (+19 more)

### Community 16 - "SheetEditor"
Cohesion: 0.09
Nodes (5): rangeLabel(), SheetEditor, serializeSheet(), sheetSize(), cloneSheet()

### Community 17 - "compile"
Cohesion: 0.09
Nodes (43): argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot(), fieldOn(), numericPartials() (+35 more)

### Community 18 - "numerical.ts"
Cohesion: 0.11
Nodes (47): Funzionalità, bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial() (+39 more)

### Community 19 - "markdown.ts"
Cohesion: 0.07
Nodes (41): @codemirror/state, schemaBlocks(), FIGURE_PALETTE, containing(), dataRange(), checkHtml(), checkTitle(), cache (+33 more)

### Community 20 - "index.ts"
Cohesion: 0.06
Nodes (42): b, bigops, c, calculus, fn, fr, fractions, functions (+34 more)

### Community 21 - "spell.test.ts"
Cohesion: 0.05
Nodes (32): @farscrl/hunspell-wasm, wordsToCheck(), Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable (+24 more)

### Community 22 - "Board"
Cohesion: 0.10
Nodes (4): Board, clampZoom(), validView(), Stroke

### Community 23 - "distributions.ts"
Cohesion: 0.06
Nodes (65): addExp(), choose(), continuousQuantile(), discreteQuantile(), Distribution, exactIntervalProbability(), expSum, expSumValue() (+57 more)

### Community 24 - "store.ts"
Cohesion: 0.05
Nodes (20): BoardOptions, BoardBackend, BoardChange, BoardData, BoardStore, done(), fromRecord(), IdbBoards (+12 more)

### Community 25 - "MathError"
Cohesion: 0.12
Nodes (57): MathError, angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, dataOf() (+49 more)

### Community 26 - "assistant.ts"
Cohesion: 0.09
Nodes (26): @anthropic-ai/sdk, AiAnswer, AiError, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible(), askThroughHost() (+18 more)

### Community 27 - "graph.ts"
Cohesion: 0.10
Nodes (31): AT_X, cellHtml(), cellText(), COMPASS, createEdgeCell(), createGraph(), drawSchema(), edgeLook() (+23 more)

### Community 28 - "supabase.ts"
Cohesion: 0.12
Nodes (32): @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken(), ensureSessionOf() (+24 more)

### Community 29 - "toLatex"
Cohesion: 0.10
Nodes (38): fourierItems(), isFourierLine(), isNumericalLine(), numericalItems(), areaFor(), linearItem(), names(), STUDY_GRAPH (+30 more)

### Community 30 - "gantt.ts"
Cohesion: 0.06
Nodes (71): graphImagesFor(), amount(), barColor(), crossings(), dateText(), dayOf(), fitText(), GanttOptions (+63 more)

### Community 31 - "view3d.ts"
Cohesion: 0.06
Nodes (81): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+73 more)

### Community 32 - "spreadsheet.test.ts"
Cohesion: 0.09
Nodes (30): BlockWidget, findWidgetBlocks(), guardBlocks(), KINDS, sheetSummary(), WidgetKind, openSheetEditor(), hide() (+22 more)

### Community 33 - "calcResults.ts"
Cohesion: 0.12
Nodes (14): acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult, calcResults(), CheckWidget, formulasUntil() (+6 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "laplace.ts"
Cohesion: 0.10
Nodes (52): factoredPolynomial(), beyondPoles(), compiled(), E, exp(), fractionShown(), HALF, inverseLaplaceShown() (+44 more)

### Community 36 - "arithmetic.ts"
Cohesion: 0.10
Nodes (46): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+38 more)

### Community 37 - "namesIn"
Cohesion: 0.11
Nodes (41): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+33 more)

### Community 38 - "scopeWith"
Cohesion: 0.15
Nodes (29): integralRegion, axesIn(), bestAlong(), boundingBox(), combine(), compileDomain(), compileMultiple(), conditionsOf() (+21 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "sheet.ts"
Cohesion: 0.09
Nodes (51): ExactFunction, ExactScope, Lin, bracketParts(), BRACKETS, CHECK_VALUES, checks, Definition (+43 more)

### Community 41 - "Pt"
Cohesion: 0.13
Nodes (12): coalesced(), EraseAction, Finger, LassoAction, MoveAction, pointsOf(), pressureOf(), handleScale() (+4 more)

### Community 42 - "NotesStore"
Cohesion: 0.06
Nodes (48): accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf() (+40 more)

### Community 43 - "study.ts"
Cohesion: 0.16
Nodes (32): limit(), Asymptote, boundaries(), compiled(), cutsOf(), defined(), domainOf(), exact() (+24 more)

### Community 44 - "functions.ts"
Cohesion: 0.08
Nodes (60): ChartTable, CellResult, EMPTY, evaluateSheet(), number(), SheetEvaluator, addFormat(), Format (+52 more)

### Community 45 - "plan.ts"
Cohesion: 0.16
Nodes (17): cellText(), columnRole(), columnsOf(), durationUnit(), isNumber(), isPlanRange(), MAX_ACTIVITIES, plain() (+9 more)

### Community 46 - "formulaGraph"
Cohesion: 0.14
Nodes (22): formulaAtCursor(), GraphLabelLines, mathRegionAt(), conicItems(), isConicLine(), quadricEquation(), formulaGraph(), formulaGraphLine() (+14 more)

### Community 47 - ".add"
Cohesion: 0.08
Nodes (24): readBases(), text(), tex(), text(), result(), text(), result(), text() (+16 more)

### Community 48 - "probability.ts"
Cohesion: 0.13
Nodes (24): End, compare(), compileCondition(), CompileOptions, ALL, compileOf(), complement(), distributionOf() (+16 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (36): DrawAction, adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners() (+28 more)

### Community 50 - "schema/templates.ts"
Cohesion: 0.10
Nodes (19): SchemaEditorOptions, DEFAULT_EDGE, Schema, SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), conceptMap (+11 more)

### Community 51 - "Rational"
Cohesion: 0.13
Nodes (21): Part, bigGcd(), binomExact(), conditionExact(), evaluateExact(), exactRoot(), factorialExact(), modPow() (+13 more)

### Community 52 - "search.ts"
Cohesion: 0.17
Nodes (23): editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex() (+15 more)

### Community 53 - "h"
Cohesion: 0.07
Nodes (53): SyncStatus, AI_SERVICES, aiService, board, createFolder(), folderNameProblem(), renameFolder(), viewSwitch (+45 more)

### Community 54 - ".constructor"
Cohesion: 0.16
Nodes (5): closeMathBlockOnEnter(), EditorCallbacks, MarkdownEditor, insertTemplate(), SidePanelDeps

### Community 55 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "board.ts"
Cohesion: 0.07
Nodes (41): Action, ACTION_NAMES, DOT_SIZES, EraserMode, HANDLE_REACH, ICON, MODE_NAMES, PanAction (+33 more)

### Community 58 - "Field"
Cohesion: 0.12
Nodes (7): characteristicPolynomial(), eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn()

### Community 59 - "grafo-html.mjs"
Cohesion: 0.25
Nodes (4): graphFile, names, namesFile, root

### Community 60 - "schema/shapes.ts"
Cohesion: 0.08
Nodes (17): @maxgraph/core, ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape (+9 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (25): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+17 more)

### Community 62 - "FoldersStore"
Cohesion: 0.17
Nodes (3): cleanFolderName(), FoldersStore, sameName()

### Community 63 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 64 - "ui/preview.ts"
Cohesion: 0.12
Nodes (10): GraphLabels, BlockKind, MoveDir, BLOCK_NAMES, blockKindOf(), MOVABLE_BLOCKS, PATHS, hidden() (+2 more)

### Community 65 - "linsys.ts"
Cohesion: 0.08
Nodes (49): formatRational(), fromRational(), Eigenvalue, EXACT, FLOAT, LinearValue, rref(), surdText() (+41 more)

### Community 66 - "parseSchema"
Cohesion: 0.08
Nodes (33): schemaSummary(), svg(), base64(), hide(), OPEN, schemasForFile(), schemasFromFile(), unhide() (+25 more)

### Community 67 - "statsGraph.ts"
Cohesion: 0.15
Nodes (20): FieldContext, isTestLine(), number(), testItems(), classes(), dataOf(), distributionExtent(), distributionLabel() (+12 more)

### Community 68 - "gauss.ts"
Cohesion: 0.19
Nodes (18): COMPLEX_FUNCTIONS, farthest(), gaussItem(), hasExponential(), inZ(), isComplexLine(), isComplexValue(), isInequality() (+10 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "selection.ts"
Cohesion: 0.09
Nodes (38): centerOn(), copyStrokes(), cross(), IDENTITY, insideLasso(), keepInside(), LASSO_SHARE, lassoed() (+30 more)

### Community 72 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 73 - "blockMove.ts"
Cohesion: 0.11
Nodes (34): blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove, blockPlace(), closed() (+26 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.08
Nodes (56): definite(), primitive(), verified(), atValues(), Converter, coordinates(), decimalText(), definiteParts() (+48 more)

### Community 75 - "Sheet"
Cohesion: 0.07
Nodes (30): GaussLine, Definition, Line, ExactComplexScope, ConicInfo, Ode, withWorkLimit(), ExactRandom (+22 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.06
Nodes (59): alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ARROW_NAMES, AT_ICONS (+51 more)

### Community 79 - "Dove sono le cose"
Cohesion: 0.09
Nodes (44): Dove sono le cose, Glifo – architettura, at(), breakEven(), Point, quantity(), readChart(), tableItems() (+36 more)

### Community 82 - "editor.test.ts"
Cohesion: 0.06
Nodes (37): @lezer/common, tabOutOfMath(), CODE_NODES, CommandToken, commandTokenAt(), isInCode(), MATH_NODES, mathContextAt() (+29 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.20
Nodes (6): centerOf(), clickOn(), ffmpeg, SCENES, SIZE, work

### Community 90 - "Abbonamenti"
Cohesion: 0.14
Nodes (14): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+6 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.20
Nodes (4): device(), login(), newContext, waitFor()

### Community 97 - "Il database degli account (Supabase)"
Cohesion: 0.17
Nodes (11): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Nell'app, Note condivise con un link (+3 more)

### Community 98 - "editor/editor.ts"
Cohesion: 0.05
Nodes (49): description, name, private, type, version, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown (+41 more)

### Community 101 - "spellcheck"
Cohesion: 0.21
Nodes (8): spellcheck(), close(), misspelledAt(), openAt(), replace(), tooltipView(), SpellChecker, SpellcheckOptions

### Community 102 - "toolbar.ts"
Cohesion: 0.12
Nodes (25): insertBlock(), InsertOptions, toggleLinePrefix(), wrapSelection(), applyListStyle(), LIST_STYLES, besideSchema(), schemaBlockRanges() (+17 more)

### Community 104 - "files.ts"
Cohesion: 0.22
Nodes (14): inClaudeViewer(), saveToFile(), canWriteFilesDirectly(), FsWindow, isAbort(), MD_TYPES, OPEN_TYPES, OpenedFile (+6 more)

### Community 106 - "fake-supabase.mjs"
Cohesion: 0.25
Nodes (6): @electric-sql/pglite, b64(), CODE, GOOGLE_CODE, ROOT, SUPABASE_URL

### Community 107 - "render/lists.ts"
Cohesion: 0.27
Nodes (13): ListStyle, bulletGroup(), Marker, sameList(), alignInside(), asciiTrim(), findMarker(), Found (+5 more)

### Community 108 - "xlsx.ts"
Cohesion: 0.07
Nodes (59): RFC-4180, fflate, csvDelimiter(), csvToSheet(), italian(), parseCsv(), sheetToCsv(), splitRecords() (+51 more)

### Community 109 - "Glifo – note per Claude"
Cohesion: 0.25
Nodes (8): Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole, sqlite()

### Community 110 - "page.ts"
Cohesion: 0.06
Nodes (48): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), PullResult, openShareDialog(), changeAccess(), changeCopy() (+40 more)

### Community 111 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

### Community 113 - "sidePanel.ts"
Cohesion: 0.21
Nodes (12): AiResult, SuggestionItem, cardPreviewTex(), formPreviewTex(), ParsedTemplate, PLACEHOLDER_TEX, placeholderPreview(), Category (+4 more)

### Community 116 - "graph/file.ts"
Cohesion: 0.11
Nodes (32): figureName(), graphFigure(), graphImage(), graphsFromFile(), hide(), OPEN, swatchSvg(), titleBand() (+24 more)

### Community 117 - "solve.ts"
Cohesion: 0.08
Nodes (50): exponentialForm(), fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), decimalSeparator() (+42 more)

### Community 121 - "severalGraph.ts"
Cohesion: 0.47
Nodes (8): criticalLine(), isSeveralLine(), named(), severalItems(), surface(), extremaOf(), optimumOf(), severalOf()

### Community 122 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 123 - "renderTex"
Cohesion: 0.24
Nodes (5): cleanKatexError(), renderTex(), displayCode(), preventFocusSteal(), SidePanel

### Community 124 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, Quando lo studente dice di cominciare

### Community 125 - "sql.ts"
Cohesion: 0.17
Nodes (17): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+9 more)

### Community 126 - "Idee per il futuro"
Cohesion: 0.33
Nodes (6): Account: i propri appunti su ogni dispositivo, anche da condividere, Idee per il futuro, In programma, La lavagna: idee in più, Più avanti, Schemi: idee in più

### Community 127 - "Glifo"
Cohesion: 0.17
Nodes (12): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Glifo (+4 more)

### Community 128 - "createFakeSupabase"
Cohesion: 0.60
Nodes (6): createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 129 - "smoke-test.mjs"
Cohesion: 0.29
Nodes (4): markdown-it, vite, firstVisit(), plainContext

### Community 131 - "tutorial.ts"
Cohesion: 0.16
Nodes (12): HINT_MS, markSeen(), openTutorial(), show(), richText(), showTutorialHint(), close(), TUTORIAL_PAGES (+4 more)

### Community 132 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 133 - "suggestions.ts"
Cohesion: 0.18
Nodes (8): templateInsertion(), EditorMathContext, expand(), preferredIndex(), SuggestionController, commandNames(), parseTemplate(), templateText()

### Community 136 - "I modelli e le chiavi API"
Cohesion: 0.50
Nodes (4): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), Le idee dello studente (5 ottobre 2026)

## Knowledge Gaps
- **624 isolated node(s):** `session-start.sh script`, `name`, `private`, `version`, `description` (+619 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 862 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **27 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `touchlog.ts`, `parse.ts`, `main.ts`, `odesolve.ts`, `tutorial.ts`, `spec.ts`, `several.ts`, `num`, `graph/preview.ts`, `vitest`, `complex.ts`, `svg.ts`, `spreadsheet/editor.ts`, `SchemaEditor`, `SheetEditor`, `compile`, `numerical.ts`, `markdown.ts`, `Board`, `distributions.ts`, `store.ts`, `MathError`, `assistant.ts`, `graph.ts`, `supabase.ts`, `toLatex`, `gantt.ts`, `view3d.ts`, `spreadsheet.test.ts`, `logic.ts`, `arithmetic.ts`, `namesIn`, `sheet.ts`, `Pt`, `NotesStore`, `study.ts`, `functions.ts`, `plan.ts`, `formulaGraph`, `.add`, `board/shapes.ts`, `Rational`, `.constructor`, `finite.ts`, `board.ts`, `schema/shapes.ts`, `ui/preview.ts`, `linsys.ts`, `parseSchema`, `gauss.ts`, `selection.ts`, `blockMove.ts`, `symbolic.ts`, `Sheet`, `schema/editor.ts`, `toolbar.ts`, `xlsx.ts`, `graph/file.ts`, `solve.ts`, `severalGraph.ts`?**
  _High betweenness centrality (0.174) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `touchlog.ts`, `main.ts`, `tutorial.ts`, `sync.ts`, `num`, `graph/preview.ts`, `editor/lists.ts`, `svg.ts`, `markdown.ts`, `index.ts`, `spell.test.ts`, `distributions.ts`, `store.ts`, `assistant.ts`, `supabase.ts`, `gantt.ts`, `spreadsheet.test.ts`, `laplace.ts`, `resize.ts`, `NotesStore`, `plan.ts`, `formulaGraph`, `.add`, `board/shapes.ts`, `search.ts`, `h`, `board.ts`, `linsys.ts`, `parseSchema`, `selection.ts`, `blockMove.ts`, `Sheet`, `schema/editor.ts`, `Dove sono le cose`, `editor.test.ts`, `editor/editor.ts`, `toolbar.ts`, `xlsx.ts`, `page.ts`, `sql.ts`?**
  _High betweenness centrality (0.103) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `main.ts`, `tutorial.ts`, `graph/preview.ts`, `spreadsheet/editor.ts`, `SchemaEditor`, `SheetEditor`, `Board`, `graph.ts`, `resize.ts`, `board.ts`, `ui/preview.ts`, `schema/editor.ts`, `.folderItem`, `editor/editor.ts`, `spellcheck`, `toolbar.ts`, `.openMenu`, `page.ts`, `sidePanel.ts`, `renderTex`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **Are the 198 inferred relationships involving `Dove sono le cose` (e.g. with `adoptGuestNotes()` and `sharedLinks()`) actually correct?**
  _`Dove sono le cose` has 198 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `name`, `private` to the rest of the system?**
  _624 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `touchlog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08392156862745098 - nodes in this community are weakly interconnected._
- **Should `parse.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07938686799359414 - nodes in this community are weakly interconnected._