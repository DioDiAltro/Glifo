# Graph Report - matherdown  (2026-10-07)

## Corpus Check
- 297 files · ~575,509 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 4856 nodes · 17570 edges · 141 communities (114 shown, 27 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 536 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e3a50ccd`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- touchlog.ts
- parse.ts
- main.ts
- compile
- sync.ts
- spec.ts
- arithmetic.ts
- num
- graph/preview.ts
- explain.ts
- spaces.ts
- editor/lists.ts
- svg.ts
- domain.ts
- SchemaEditor
- Rational
- SheetEditor
- Converter
- numerical.ts
- explainPanel.ts
- index.ts
- engine.ts
- Board
- inference.ts
- store.ts
- MathError
- assistant.ts
- .renderFormat
- linsys.ts
- several.ts
- gantt.ts
- view3d.ts
- search.ts
- editor.test.ts
- logic.ts
- NotesStore
- complex.ts
- namesIn
- localModels.ts
- resize.ts
- sheet.ts
- Pt
- solve.ts
- study.ts
- functions.ts
- graph/file.ts
- probability.ts
- vitest
- distributions.ts
- board/shapes.ts
- schemaBlocks.ts
- renderTex
- toolbar.ts
- settings.ts
- MarkdownEditor
- finite.ts
- 20261004091555_note_condivise.sql
- Dove sono le cose
- tutorial.ts
- odesolve.ts
- graph.ts
- dependencies
- package.json
- explainSubjects.ts
- ui/preview.ts
- conics.ts
- icons.mjs
- statsGraph.ts
- smoke-test.mjs
- Benvenuto in Glifo
- compilerOptions
- board.ts
- toLatex
- .folderItem
- symbolic.ts
- MathNode
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- plan.ts
- session-start.sh
- .claude/CLAUDE.md
- blockMove.ts
- tutorial.mjs
- Abbonamenti
- spiegami-qwen.mjs
- supabase-stub.sql
- account-test.mjs
- Il database degli account (Supabase)
- ExplainPanel
- Parser
- editor/editor.ts
- spellcheck
- createFakeSupabase
- files.ts
- Sheet
- fake-supabase.mjs
- Stroke
- spreadsheet/editor.ts
- page.ts
- markdown.ts
- spreadsheet/format.ts
- Piano per piano
- Costi
- Idee per il futuro
- Glifo – note per Claude
- Field
- Le spiegazioni, come funzionano
- schemaTools.test.ts
- suggestions.ts
- sql.ts
- gauss.ts
- Glifo
- I modelli e le chiavi API
- h
- La lavagna
- numericalGraph.ts
- sidePanel.ts
- calcResults.ts
- logo.ts

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 248 edges
2. `MathError` - 151 edges
3. `num()` - 145 edges
4. `Sheet` - 139 edges
5. `MathNode` - 129 edges
6. `mul()` - 124 edges
7. `Board` - 118 edges
8. `compile()` - 113 edges
9. `Rational` - 111 edges
10. `toLatex()` - 103 edges

## Surprising Connections (you probably didn't know these)
- `Dove sono le cose` --references--> `fakeLlmWorker()`  [INFERRED]
  ARCHITETTURA.md → scripts/smoke-test.mjs
- `Dove sono le cose` --references--> `WidgetKind`  [INFERRED]
  ARCHITETTURA.md → src/editor/schemaBlocks.ts
- `Dove sono le cose` --references--> `ConicElements`  [INFERRED]
  ARCHITETTURA.md → src/math/conics.ts
- `Dove sono le cose` --references--> `texts()`  [INFERRED]
  ARCHITETTURA.md → tests/boardTouchLog.test.ts
- `Funzionalità` --references--> `k()`  [INFERRED]
  README.md → src/math/numerical.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (141 total, 27 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.09
Nodes (27): at(), browserStore, clip(), isSaved(), KINDS, LOG_KEY, LOG_MAX_LINES, LogStore (+19 more)

### Community 1 - "parse.ts"
Cohesion: 0.08
Nodes (39): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe(), differentialInFraction() (+31 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (113): addToGraphBlock(), formulaAtCursor(), GraphLabelLines, insertGraphBlock(), setGraphLabels(), graphsForFile(), hide(), graphBlockText() (+105 more)

### Community 3 - "compile"
Cohesion: 0.05
Nodes (92): criticalLine(), named(), severalItems(), surface(), argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS (+84 more)

### Community 4 - "sync.ts"
Cohesion: 0.05
Nodes (38): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+30 more)

### Community 5 - "spec.ts"
Cohesion: 0.06
Nodes (79): isConicLine(), quadricEquation(), FieldContext, fourierItems(), isFourierLine(), isTestLine(), number(), testItems() (+71 more)

### Community 6 - "arithmetic.ts"
Cohesion: 0.07
Nodes (73): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+65 more)

### Community 7 - "num"
Cohesion: 0.12
Nodes (92): atIntegers(), withoutAbs(), exp(), hyperbolicToExp(), inverseRational(), sqrtEx(), termTransform(), polyEx() (+84 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (46): addLabel(), boxes, cameras, complexCoord(), containing(), coord(), drawings, drawnViews (+38 more)

### Community 9 - "explain.ts"
Cohesion: 0.06
Nodes (62): allNames(), ChatFn, checkSteps(), checkTopicFormula(), checkTopicSteps(), Conversation, converse(), engineHints() (+54 more)

### Community 10 - "spaces.ts"
Cohesion: 0.17
Nodes (17): Eigenvalue, LinearValue, cartesianEquations(), Cell, coordinateNames(), diagonalize(), dot(), gramSchmidt() (+9 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.09
Nodes (61): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+53 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (54): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), dataWindow(), domainEdge() (+46 more)

### Community 13 - "domain.ts"
Cohesion: 0.08
Nodes (51): constantIntegrand(), depth(), inequalityMargin(), integralRegion, LayeredSolid, Multiple, multipleOf(), planeMargin() (+43 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.11
Nodes (5): loadDialect(), SchemaEditor, withLaneContents(), serializeSchema(), fileNameFor()

### Community 15 - "Rational"
Cohesion: 0.11
Nodes (23): Part, exactSqrt(), unavailable(), expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact() (+15 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (6): SheetEditor, SheetEditorOptions, decimalsOf(), serializeSheet(), SheetModel, cloneSheet()

### Community 17 - "Converter"
Cohesion: 0.17
Nodes (16): linearCells(), pairUp(), Converter, definiteParts(), definiteValue(), expandCalculus(), fieldName(), functionOf() (+8 more)

### Community 18 - "numerical.ts"
Cohesion: 0.12
Nodes (47): FormatOptions, bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial() (+39 more)

### Community 19 - "explainPanel.ts"
Cohesion: 0.11
Nodes (22): REPLY_TOKENS, definedName(), formulaTopic(), FREE_NAMES, graphTopic(), numberText(), studyOf(), theoremTopic() (+14 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (41): b, bigops, c, calculus, fn, fr, fractions, functions (+33 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "Board"
Cohesion: 0.10
Nodes (4): Board, loadPrefs(), highlightName(), inkName()

### Community 23 - "inference.ts"
Cohesion: 0.14
Nodes (25): chiSquareTest(), confidence(), confidenceShown(), Given, hypothesisTest(), InferenceContext, interval(), meanOf() (+17 more)

### Community 24 - "store.ts"
Cohesion: 0.06
Nodes (17): fake-indexeddb, BoardOptions, BoardBackend, BoardStore, done(), fromRecord(), IdbBoards, MemoryBoards (+9 more)

### Community 25 - "MathError"
Cohesion: 0.10
Nodes (67): MathError, angleBetween(), asMatrix(), basisOf(), characteristicPolynomial(), circleText(), cross(), Ctx (+59 more)

### Community 26 - "assistant.ts"
Cohesion: 0.10
Nodes (27): AiAnswer, AiError, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible(), askThroughHost(), checkShape() (+19 more)

### Community 27 - ".renderFormat"
Cohesion: 0.16
Nodes (14): fieldInput(), isLanes(), cellText(), createEdgeCell(), edgeLook(), edgeStyle(), edgeTextAt(), nodeLook() (+6 more)

### Community 28 - "linsys.ts"
Cohesion: 0.13
Nodes (43): choices(), gcd(), matrixEquation(), matrixSystem(), minorsGcd(), ONE, parametricRows(), parametricSystem() (+35 more)

### Community 29 - "several.ts"
Cohesion: 0.10
Nodes (47): Definite, Piece, Condition, Family, Group, Root, Shape, at() (+39 more)

### Community 30 - "gantt.ts"
Cohesion: 0.05
Nodes (72): amount(), barColor(), crossings(), dateText(), dayOf(), fitText(), GanttOptions, ganttSvg() (+64 more)

### Community 31 - "view3d.ts"
Cohesion: 0.06
Nodes (86): tickLabel(), addMesh(), addTet(), affinePlane(), Axis, Box, centroid(), clipBy() (+78 more)

### Community 32 - "search.ts"
Cohesion: 0.17
Nodes (24): editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex() (+16 more)

### Community 33 - "editor.test.ts"
Cohesion: 0.08
Nodes (29): InsertOptions, templateInsertion(), CODE_NODES, CommandToken, commandTokenAt(), isInCode(), MATH_NODES, mathContextAt() (+21 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "NotesStore"
Cohesion: 0.05
Nodes (51): accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf() (+43 more)

### Community 36 - "complex.ts"
Cohesion: 0.08
Nodes (42): add(), allRoots(), arg(), asin(), atan(), compileApply(), compileComplex(), compileFunction() (+34 more)

### Community 37 - "namesIn"
Cohesion: 0.13
Nodes (36): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+28 more)

### Community 38 - "localModels.ts"
Cohesion: 0.10
Nodes (27): @mlc-ai/web-llm, chat(), GlifoError, Gpu, load(), post(), remove(), scope (+19 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "sheet.ts"
Cohesion: 0.10
Nodes (48): ExactFunction, ExactScope, Lin, NUMERICAL, BRACKETS, CHECK_VALUES, checks, GROUP (+40 more)

### Community 41 - "Pt"
Cohesion: 0.09
Nodes (15): clampZoom(), coalesced(), EraseAction, Finger, LassoAction, MoveAction, penErases(), pointsOf() (+7 more)

### Community 42 - "solve.ts"
Cohesion: 0.07
Nodes (57): exponentialForm(), formatGauss(), fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd() (+49 more)

### Community 43 - "study.ts"
Cohesion: 0.15
Nodes (33): names(), STUDY_GRAPH, studyItems(), nameLatex(), Asymptote, cutsOf(), defined(), domainOf() (+25 more)

### Community 44 - "functions.ts"
Cohesion: 0.08
Nodes (62): EMPTY, evaluateSheet(), number(), SheetEvaluator, addFormat(), divFormat(), GENERAL, most() (+54 more)

### Community 45 - "graph/file.ts"
Cohesion: 0.10
Nodes (38): FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsFromFile(), OPEN, swatchSvg() (+30 more)

### Community 46 - "probability.ts"
Cohesion: 0.08
Nodes (30): addExp(), Distribution, End, exactIntervalProbability(), Family, Interval, subtractExp(), RandomScope (+22 more)

### Community 47 - "vitest"
Cohesion: 0.04
Nodes (53): vite-plugin-pwa, vitest, staticGraphSvg(), chooseWindow(), specFor(), chooseBox(), GraphItem, parseGraph() (+45 more)

### Community 48 - "distributions.ts"
Cohesion: 0.15
Nodes (30): choose(), continuousQuantile(), discreteQuantile(), factorialBig(), FAMILIES, integerParam(), integerRange(), intervalProbability() (+22 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (35): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+27 more)

### Community 50 - "schemaBlocks.ts"
Cohesion: 0.09
Nodes (23): @codemirror/view, toggleLinePrefix(), LIST_STYLES, besideSchema(), BlockWidget, findWidgetBlocks(), guardBlocks(), KINDS (+15 more)

### Community 51 - "renderTex"
Cohesion: 0.17
Nodes (7): cleanKatexError(), renderTex(), isConfidentAnswer(), symbolsInCategory(), displayCode(), preventFocusSteal(), SidePanel

### Community 52 - "toolbar.ts"
Cohesion: 0.19
Nodes (15): insertBlock(), wrapSelection(), Action, createToolbar(), insertCode(), insertLink(), listMenu(), listStyle() (+7 more)

### Community 53 - "settings.ts"
Cohesion: 0.10
Nodes (21): ExplainTone, DEFAULT_LOCAL_MODEL, ACCOUNT_SETTINGS, accountSettings(), AI_MODELS, DEFAULT_SETTINGS, loadSettings(), saveSettings() (+13 more)

### Community 54 - "MarkdownEditor"
Cohesion: 0.14
Nodes (7): @codemirror/commands, closeMathBlockOnEnter(), EditorCallbacks, MarkdownEditor, tabOutOfMath(), insertTemplate(), setup()

### Community 55 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "Dove sono le cose"
Cohesion: 0.09
Nodes (40): Dove sono le cose, Glifo – architettura, centerOn(), copyStrokes(), cross(), IDENTITY, insideLasso(), keepInside() (+32 more)

### Community 58 - "tutorial.ts"
Cohesion: 0.18
Nodes (11): HINT_MS, markSeen(), openTutorial(), show(), richText(), close(), TUTORIAL_PAGES, TutorialOptions (+3 more)

### Community 59 - "odesolve.ts"
Cohesion: 0.08
Nodes (81): linearIn(), addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames() (+73 more)

### Community 60 - "graph.ts"
Cohesion: 0.06
Nodes (30): @maxgraph/core, AT_X, COMPASS, createGraph(), drawSchema(), insertSchema(), isEdgeLook(), isNodeLook() (+22 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "package.json"
Cohesion: 0.05
Nodes (38): description, devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript (+30 more)

### Community 63 - "explainSubjects.ts"
Cohesion: 0.18
Nodes (21): explainTarget, Explanation, formulasUntil(), sheetBefore(), explanationMarkdown(), hasCalculation(), insertAfterBlock(), insertAfterText() (+13 more)

### Community 64 - "ui/preview.ts"
Cohesion: 0.09
Nodes (22): GraphLabels, BlockKind, Look, Theme, draw(), drawCached(), drawn, errorHtml() (+14 more)

### Community 65 - "conics.ts"
Cohesion: 0.16
Nodes (30): conicItems(), at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf() (+22 more)

### Community 67 - "statsGraph.ts"
Cohesion: 0.22
Nodes (15): classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX, Line, number(), pmfBars() (+7 more)

### Community 68 - "smoke-test.mjs"
Cohesion: 0.29
Nodes (4): fflate, fakeLlmWorker(), firstVisit(), plainContext

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "board.ts"
Cohesion: 0.06
Nodes (41): Action, ACTION_NAMES, DOT_SIZES, DrawAction, EraserMode, HANDLE_REACH, ICON, MODE_NAMES (+33 more)

### Community 72 - "toLatex"
Cohesion: 0.13
Nodes (26): ACCENT_COMMANDS, COMPLEX_FUNCTIONS, diffLatex(), DISTRIBUTION_LATEX, distributionLatex(), domainLatex(), fnLatex(), fnName() (+18 more)

### Community 73 - ".folderItem"
Cohesion: 0.20
Nodes (5): FolderGroup, Note, NoteMeta, NotesPanel, NotesPanelDeps

### Community 74 - "symbolic.ts"
Cohesion: 0.08
Nodes (41): cancelLinear(), coordinates(), decimalText(), degree(), denominatorPart(), denominators(), exactRoot(), exponentOf() (+33 more)

### Community 75 - "MathNode"
Cohesion: 0.12
Nodes (15): ExactComplexScope, Ode, expSumValue(), withWorkLimit(), FiniteContext, FormattedResult, differentialRequest, pieces() (+7 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.04
Nodes (74): schemaSummary(), ALIGN, ARROW_NAMES, AT_ICONS, AT_NAMES, BASE_PRESETS, BIG_ARROWS, DB_PRESETS (+66 more)

### Community 79 - "plan.ts"
Cohesion: 0.08
Nodes (40): at(), breakEven(), dataLine(), dataRange(), Point, tableItems(), textLabel(), chartData (+32 more)

### Community 82 - "blockMove.ts"
Cohesion: 0.11
Nodes (35): blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove, blockPlace(), closed() (+27 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.12
Nodes (10): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+2 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.14
Nodes (14): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+6 more)

### Community 91 - "spiegami-qwen.mjs"
Cohesion: 0.29
Nodes (4): vite, minutes, postMessage(), started

### Community 96 - "account-test.mjs"
Cohesion: 0.20
Nodes (4): device(), login(), newContext, waitFor()

### Community 97 - "Il database degli account (Supabase)"
Cohesion: 0.17
Nodes (11): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Nell'app, Note condivise con un link (+3 more)

### Community 101 - "editor/editor.ts"
Cohesion: 0.06
Nodes (39): @codemirror/lang-markdown, @codemirror/language, @codemirror/state, @lezer/highlight, highlight, italianPhrases, listMarkers, noIndentedCode (+31 more)

### Community 102 - "spellcheck"
Cohesion: 0.21
Nodes (8): spellcheck(), close(), misspelledAt(), openAt(), replace(), tooltipView(), SpellChecker, SpellcheckOptions

### Community 103 - "createFakeSupabase"
Cohesion: 0.60
Nodes (6): createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 104 - "files.ts"
Cohesion: 0.24
Nodes (13): inClaudeViewer(), canWriteFilesDirectly(), FsWindow, isAbort(), MD_TYPES, OPEN_TYPES, OpenedFile, openMarkdownFiles() (+5 more)

### Community 105 - "Sheet"
Cohesion: 0.10
Nodes (18): bracketParts(), chainOf(), close(), definitionTarget(), digitsMatch(), fingerprint(), isLiteral(), parseCached() (+10 more)

### Community 106 - "fake-supabase.mjs"
Cohesion: 0.25
Nodes (6): @electric-sql/pglite, b64(), CODE, GOOGLE_CODE, ROOT, SUPABASE_URL

### Community 107 - "Stroke"
Cohesion: 0.28
Nodes (4): Step, BoardChange, BoardData, Stroke

### Community 108 - "spreadsheet/editor.ts"
Cohesion: 0.06
Nodes (82): currentCall(), Editing, MenuEntry, Move, PATHS, rangeLabel(), Snapshot, sameFormat() (+74 more)

### Community 110 - "page.ts"
Cohesion: 0.05
Nodes (67): @supabase/supabase-js, AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), accountError, appUrl(), call() (+59 more)

### Community 113 - "markdown.ts"
Cohesion: 0.09
Nodes (34): katex, lineDepth(), parseBlockMath(), moveAttrs(), cache, renderTexOrError(), renderTexWithResult(), TexRender (+26 more)

### Community 116 - "spreadsheet/format.ts"
Cohesion: 0.09
Nodes (42): RFC-4180, sheetSummary(), quantity(), csvDelimiter(), csvToSheet(), field(), italian(), parseCsv() (+34 more)

### Community 117 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 118 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, Quando lo studente dice di cominciare

### Community 119 - "Idee per il futuro"
Cohesion: 0.33
Nodes (6): Account: i propri appunti su ogni dispositivo, anche da condividere, Idee per il futuro, In programma, La lavagna: idee in più, Più avanti, Schemi: idee in più

### Community 120 - "Glifo – note per Claude"
Cohesion: 0.22
Nodes (9): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole (+1 more)

### Community 121 - "Field"
Cohesion: 0.13
Nodes (6): eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn()

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "schemaTools.test.ts"
Cohesion: 0.12
Nodes (25): alignBoxes(), Alignment, Box, distributeBoxes(), Position, base64(), cellHtml(), crc32() (+17 more)

### Community 124 - "suggestions.ts"
Cohesion: 0.18
Nodes (6): EditorMathContext, expand(), preferredIndex(), SuggestionController, SuggestionItem, SymbolForm

### Community 125 - "sql.ts"
Cohesion: 0.17
Nodes (17): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+9 more)

### Community 126 - "gauss.ts"
Cohesion: 0.12
Nodes (24): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexLine(), isComplexValue() (+16 more)

### Community 127 - "Glifo"
Cohesion: 0.14
Nodes (14): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Funzionalità (+6 more)

### Community 128 - "I modelli e le chiavi API"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), In prova sul ramo `prova` (7 ottobre 2026): Qwen3 nel browser per «Spiegami», Le idee dello studente (5 ottobre 2026)

### Community 131 - "h"
Cohesion: 0.07
Nodes (54): SyncStatus, board, viewSwitch, openShareDialog(), changeAccess(), changeCopy(), refreshChanged(), run() (+46 more)

### Community 132 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 133 - "numericalGraph.ts"
Cohesion: 0.80
Nodes (4): isNumericalLine(), numericalItems(), isPlottedNumerical(), numericalPlot()

### Community 138 - "sidePanel.ts"
Cohesion: 0.18
Nodes (12): AiResult, CATEGORIES, cardPreviewTex(), formPreviewTex(), ParsedTemplate, parseTemplate(), PLACEHOLDER_TEX, placeholderPreview() (+4 more)

### Community 141 - "calcResults.ts"
Cohesion: 0.11
Nodes (15): @lezer/common, acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult, calcResults(), CheckWidget (+7 more)

### Community 147 - "logo.ts"
Cohesion: 0.39
Nodes (5): BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark()

## Knowledge Gaps
- **653 isolated node(s):** `Condividere una nota con un link`, `Provarlo sul tuo computer`, `Assistente AI`, `Spiegami (in prova)`, `Compatibilità con VS Code` (+648 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 908 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **27 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `touchlog.ts`, `parse.ts`, `main.ts`, `compile`, `h`, `spec.ts`, `arithmetic.ts`, `numericalGraph.ts`, `graph/preview.ts`, `explain.ts`, `num`, `sidePanel.ts`, `svg.ts`, `calcResults.ts`, `SchemaEditor`, `SheetEditor`, `Converter`, `numerical.ts`, `explainPanel.ts`, `Board`, `inference.ts`, `store.ts`, `MathError`, `assistant.ts`, `.renderFormat`, `linsys.ts`, `several.ts`, `gantt.ts`, `view3d.ts`, `logic.ts`, `NotesStore`, `complex.ts`, `namesIn`, `localModels.ts`, `sheet.ts`, `Pt`, `solve.ts`, `study.ts`, `functions.ts`, `graph/file.ts`, `vitest`, `board/shapes.ts`, `schemaBlocks.ts`, `renderTex`, `toolbar.ts`, `settings.ts`, `MarkdownEditor`, `finite.ts`, `odesolve.ts`, `graph.ts`, `explainSubjects.ts`, `ui/preview.ts`, `conics.ts`, `smoke-test.mjs`, `board.ts`, `symbolic.ts`, `MathNode`, `schema/editor.ts`, `plan.ts`, `blockMove.ts`, `ExplainPanel`, `editor/editor.ts`, `files.ts`, `Sheet`, `spreadsheet/editor.ts`, `page.ts`, `markdown.ts`, `spreadsheet/format.ts`, `schemaTools.test.ts`, `gauss.ts`?**
  _High betweenness centrality (0.175) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `touchlog.ts`, `main.ts`, `sync.ts`, `num`, `graph/preview.ts`, `explain.ts`, `sidePanel.ts`, `editor/lists.ts`, `svg.ts`, `logo.ts`, `store.ts`, `MathError`, `assistant.ts`, `linsys.ts`, `gantt.ts`, `view3d.ts`, `search.ts`, `editor.test.ts`, `NotesStore`, `localModels.ts`, `resize.ts`, `graph/file.ts`, `distributions.ts`, `board/shapes.ts`, `schemaBlocks.ts`, `settings.ts`, `MarkdownEditor`, `Dove sono le cose`, `tutorial.ts`, `package.json`, `board.ts`, `toLatex`, `plan.ts`, `blockMove.ts`, `editor/editor.ts`, `Sheet`, `spreadsheet/editor.ts`, `page.ts`, `markdown.ts`, `spreadsheet/format.ts`, `schemaTools.test.ts`, `sql.ts`?**
  _High betweenness centrality (0.129) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `main.ts`, `graph/preview.ts`, `sidePanel.ts`, `SchemaEditor`, `SheetEditor`, `explainPanel.ts`, `Board`, `.renderFormat`, `gantt.ts`, `resize.ts`, `renderTex`, `toolbar.ts`, `tutorial.ts`, `ui/preview.ts`, `board.ts`, `.folderItem`, `schema/editor.ts`, `ExplainPanel`, `editor/editor.ts`, `spellcheck`, `spreadsheet/editor.ts`, `page.ts`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **Are the 247 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `adoptGuestNotes()`) actually correct?**
  _`Dove sono le cose` has 247 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Condividere una nota con un link`, `Provarlo sul tuo computer`, `Assistente AI` to the rest of the system?**
  _653 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `touchlog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08653061224489796 - nodes in this community are weakly interconnected._
- **Should `parse.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07785087719298246 - nodes in this community are weakly interconnected._