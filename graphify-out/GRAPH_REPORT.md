# Graph Report - matherdown  (2026-10-07)

## Corpus Check
- 297 files · ~573,743 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 4849 nodes · 17547 edges · 152 communities (126 shown, 26 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 531 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0f041d3b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- touchlog.ts
- Parser
- main.ts
- toNode
- sync.ts
- spec.ts
- arithmetic.ts
- num
- GraphView
- explain.ts
- spaces.ts
- editor/lists.ts
- svg.ts
- scopeWith
- SchemaEditor
- Rational
- SheetEditor
- compile
- numerical.ts
- explainPanel.ts
- index.ts
- engine.ts
- Board
- inference.ts
- BoardStore
- MathError
- assistant.ts
- .renderFormat
- supabase.ts
- several.ts
- graph/file.ts
- graph/space.ts
- search.ts
- graphNote.test.ts
- logic.ts
- NotesStore
- complex.ts
- namesIn
- localModels.ts
- resize.ts
- statsShown.ts
- Pt
- linsys.ts
- study.ts
- functions.ts
- spreadsheet/editor.ts
- probability.ts
- vitest
- distributions.ts
- board/shapes.ts
- schemaBlocks.ts
- SidePanel
- toolbar.ts
- settings.ts
- MarkdownEditor
- finite.ts
- 20261004091555_note_condivise.sql
- board.ts
- tutorial.ts
- odesolve.ts
- schema/shapes.ts
- dependencies
- view3d.ts
- schema/blocks.ts
- ui/preview.ts
- conics.ts
- icons.mjs
- formatNumber
- smoke-test.mjs
- Benvenuto in Glifo
- compilerOptions
- strokes.ts
- toLatex
- parse.ts
- symbolic.ts
- Sheet
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- chart.ts
- session-start.sh
- .claude/CLAUDE.md
- Dove sono le cose
- tutorial.mjs
- Abbonamenti
- spiegami-qwen.mjs
- Costi
- supabase-stub.sql
- account-test.mjs
- Il database degli account (Supabase)
- graph/preview.ts
- Parser
- editor/editor.ts
- plan.ts
- createFakeSupabase
- files.ts
- sheet.ts
- fake-supabase.mjs
- limits.ts
- xlsx.ts
- page.ts
- markdown.ts
- SheetEvaluator
- downloadText
- llmWorker.ts
- .constructor
- Glifo – note per Claude
- Field
- Le spiegazioni, come funzionano
- graph.ts
- suggestions.ts
- sql.ts
- gauss.ts
- Glifo
- markers.ts
- schema/templates.ts
- h
- La lavagna
- schedule.ts
- tools.ts
- touchLog
- sidePanel.ts
- render/lists.ts
- placeholders.ts
- calcPlugin
- spreadsheet/format.ts
- insert.ts
- checkSteps
- boardTouchLog.test.ts
- deploy.test.ts
- logo.ts
- ExplainEvents

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 243 edges
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

## Communities (152 total, 26 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.14
Nodes (16): at(), browserStore, clip(), KINDS, LOG_KEY, Moves, MOVES_MAX, pointerDetail() (+8 more)

### Community 1 - "Parser"
Cohesion: 0.17
Nodes (3): describe(), MathSyntaxError, Parser

### Community 2 - "main.ts"
Cohesion: 0.05
Nodes (96): setCurrentAccount(), deleteAccount(), ensureSessionOf(), setSharedCopy(), sharedLinks(), shareNote(), unshareNote(), remapGraphLines() (+88 more)

### Community 3 - "toNode"
Cohesion: 0.11
Nodes (37): close(), Definite, definiteIntegral(), exValue(), samples(), EMPTY_SCOPE, integrate(), absOf() (+29 more)

### Community 4 - "sync.ts"
Cohesion: 0.05
Nodes (38): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+30 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (88): conicItems(), isConicLine(), quadricEquation(), FieldContext, isComplexLine(), onlyComplex(), isTestLine(), number() (+80 more)

### Community 6 - "arithmetic.ts"
Cohesion: 0.06
Nodes (95): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+87 more)

### Community 7 - "num"
Cohesion: 0.13
Nodes (91): atIntegers(), withoutAbs(), exp(), hyperbolicToExp(), inverseRational(), sqrtEx(), termTransform(), polyEx() (+83 more)

### Community 8 - "GraphView"
Cohesion: 0.13
Nodes (13): complexCoord(), coord(), explicitWindow(), graphSize(), GraphView, hydrateGraphs(), remember(), sameCamera() (+5 more)

### Community 9 - "explain.ts"
Cohesion: 0.10
Nodes (34): ChatFn, Conversation, converse(), explain(), EXPLAIN_TONES, ExplainError, ExplainKind, explainTopic (+26 more)

### Community 10 - "spaces.ts"
Cohesion: 0.17
Nodes (21): formatRational(), Eigenvalue, EXACT, surdText(), cartesianEquations(), Cell, coordinateNames(), diagonalize() (+13 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.19
Nodes (28): continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext(), isBlank() (+20 more)

### Community 12 - "svg.ts"
Cohesion: 0.08
Nodes (55): graphify, contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), dataWindow() (+47 more)

### Community 13 - "scopeWith"
Cohesion: 0.07
Nodes (57): constantIntegrand(), depth(), inequalityMargin(), integralRegion, LayeredSolid, Multiple, multipleOf(), planeMargin() (+49 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.11
Nodes (4): isLanes(), SchemaEditor, withLaneContents(), serializeSchema()

### Community 15 - "Rational"
Cohesion: 0.10
Nodes (24): Part, expSum, spend(), bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactRandom (+16 more)

### Community 16 - "SheetEditor"
Cohesion: 0.09
Nodes (3): rangeLabel(), SheetEditor, cloneSheet()

### Community 17 - "compile"
Cohesion: 0.08
Nodes (43): argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot(), fieldOn(), numericPartials() (+35 more)

### Community 18 - "numerical.ts"
Cohesion: 0.12
Nodes (47): bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial(), interpolating() (+39 more)

### Community 19 - "explainPanel.ts"
Cohesion: 0.05
Nodes (43): Explanation, modelName(), definedName(), FREE_NAMES, graphTopic(), numberText(), studyOf(), valueNode() (+35 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (43): SuggestionItem, b, bigops, c, calculus, fn, fr, fractions (+35 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "Board"
Cohesion: 0.09
Nodes (4): Board, clampZoom(), validView(), BoardTheme

### Community 23 - "inference.ts"
Cohesion: 0.11
Nodes (29): Distribution, chiSquareTest(), confidence(), confidenceShown(), Given, hypothesisTest(), InferenceContext, interval() (+21 more)

### Community 24 - "BoardStore"
Cohesion: 0.06
Nodes (14): BoardOptions, BoardBackend, BoardStore, done(), IdbBoards, MemoryBoards, ofNote(), openBoardDatabase() (+6 more)

### Community 25 - "MathError"
Cohesion: 0.12
Nodes (58): MathError, angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, dataOf() (+50 more)

### Community 26 - "assistant.ts"
Cohesion: 0.16
Nodes (19): AiAnswer, AiError, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible(), askThroughHost(), checkShape() (+11 more)

### Community 27 - ".renderFormat"
Cohesion: 0.17
Nodes (13): fieldInput(), createEdgeCell(), edgeLook(), edgeStyle(), edgeTextAt(), insertSchema(), nodeLook(), nodeStyle() (+5 more)

### Community 28 - "supabase.ts"
Cohesion: 0.17
Nodes (20): @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), emailLinkToken(), loadClient(), loginDetails() (+12 more)

### Community 29 - "several.ts"
Cohesion: 0.12
Nodes (39): severalLimit, at(), bounded(), Candidate, candidates(), compiled(), Constraint, constraintsOf() (+31 more)

### Community 30 - "graph/file.ts"
Cohesion: 0.05
Nodes (80): figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsForFile(), graphsFromFile(), hide(), OPEN (+72 more)

### Community 31 - "graph/space.ts"
Cohesion: 0.12
Nodes (47): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+39 more)

### Community 32 - "search.ts"
Cohesion: 0.18
Nodes (22): editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex() (+14 more)

### Community 33 - "graphNote.test.ts"
Cohesion: 0.07
Nodes (53): @codemirror/language, @codemirror/state, @codemirror/view, @lezer/common, explainTarget, acceptCalcResult(), CalcCheck, calcOutcomes() (+45 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "NotesStore"
Cohesion: 0.05
Nodes (41): accountSpace(), adoptGuestNotes(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf(), Deletion (+33 more)

### Community 36 - "complex.ts"
Cohesion: 0.09
Nodes (40): allRoots(), arg(), asin(), atan(), compileApply(), compileComplex(), compileFunction(), compileName() (+32 more)

### Community 37 - "namesIn"
Cohesion: 0.14
Nodes (36): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+28 more)

### Community 38 - "localModels.ts"
Cohesion: 0.12
Nodes (18): @mlc-ai/web-llm, LocalAbort, localErrorMessage(), localLlm, Pending, WorkerLike, ChatMessage, ChatOptions (+10 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "statsShown.ts"
Cohesion: 0.18
Nodes (30): check(), correlation(), count(), covariance(), Data, dataStatistic(), deviation(), fail() (+22 more)

### Community 41 - "Pt"
Cohesion: 0.15
Nodes (11): coalesced(), Finger, LassoAction, PanAction, PinchAction, pointsOf(), pressureOf(), EllipseFit (+3 more)

### Community 42 - "linsys.ts"
Cohesion: 0.12
Nodes (43): nameLatex(), FLOAT, LinearScope, rref(), choices(), gcd(), isStandardUnknown(), linearSystem() (+35 more)

### Community 43 - "study.ts"
Cohesion: 0.14
Nodes (36): limit(), breaks(), periodOf(), Asymptote, boundaries(), compiled(), cutsOf(), defined() (+28 more)

### Community 44 - "functions.ts"
Cohesion: 0.08
Nodes (62): ChartTable, CellResult, EMPTY, number(), addFormat(), divFormat(), Format, mulFormat() (+54 more)

### Community 45 - "spreadsheet/editor.ts"
Cohesion: 0.08
Nodes (55): openSheet(), saveSheetBlock(), tablesNote(), currentCall(), Editing, MenuEntry, Move, openSheetEditor() (+47 more)

### Community 46 - "probability.ts"
Cohesion: 0.10
Nodes (30): addExp(), End, exactIntervalProbability(), Family, integerRange(), intervalProbability(), subtractExp(), ExactScope (+22 more)

### Community 47 - "vitest"
Cohesion: 0.06
Nodes (49): vitest, staticGraphSvg(), chooseWindow(), chooseBox(), formulaGraph(), formulaGraphLine(), GraphItem, parseGraph() (+41 more)

### Community 48 - "distributions.ts"
Cohesion: 0.17
Nodes (27): choose(), continuousQuantile(), discreteQuantile(), factorialBig(), FAMILIES, integerParam(), invalid(), makeDistribution() (+19 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (35): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+27 more)

### Community 50 - "schemaBlocks.ts"
Cohesion: 0.15
Nodes (13): BlockWidget, findWidgetBlocks(), guardBlocks(), KINDS, schemaBlocks(), WidgetBlock, WidgetKind, SchemaBlock (+5 more)

### Community 51 - "SidePanel"
Cohesion: 0.19
Nodes (3): displayCode(), preventFocusSteal(), SidePanel

### Community 52 - "toolbar.ts"
Cohesion: 0.19
Nodes (15): insertBlock(), wrapSelection(), Action, createToolbar(), insertCode(), insertLink(), listMenu(), listStyle() (+7 more)

### Community 53 - "settings.ts"
Cohesion: 0.10
Nodes (25): ExplainTone, addPersonalWord(), DICTIONARY_KEY, loadPersonalWords(), savePersonalWords(), tidy(), ACCOUNT_SETTINGS, accountSettings() (+17 more)

### Community 54 - "MarkdownEditor"
Cohesion: 0.19
Nodes (4): closeMathBlockOnEnter(), EditorCallbacks, MarkdownEditor, insertTemplate()

### Community 55 - "finite.ts"
Cohesion: 0.19
Nodes (26): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+18 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "board.ts"
Cohesion: 0.06
Nodes (54): Action, ACTION_NAMES, DOT_SIZES, DrawAction, EraseAction, EraserMode, HANDLE_REACH, ICON (+46 more)

### Community 58 - "tutorial.ts"
Cohesion: 0.15
Nodes (14): helpButton, openGuide(), HINT_MS, markSeen(), openTutorial(), show(), richText(), showTutorialHint() (+6 more)

### Community 59 - "odesolve.ts"
Cohesion: 0.07
Nodes (86): Piece, linearIn(), addWave(), arrange(), cauchy(), characteristicRoots(), compiled(), Condition (+78 more)

### Community 60 - "schema/shapes.ts"
Cohesion: 0.08
Nodes (17): @maxgraph/core, ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape (+9 more)

### Community 61 - "dependencies"
Cohesion: 0.04
Nodes (44): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+36 more)

### Community 62 - "view3d.ts"
Cohesion: 0.09
Nodes (39): tickLabel(), Detail, Face, FAST, FINE, planeTolerance(), GRAPH_WORK, Plane (+31 more)

### Community 63 - "schema/blocks.ts"
Cohesion: 0.24
Nodes (12): saveSchemaBlock(), findSchemaBlock(), findSchemaBlocks(), OpenFence, schemaBlockAtLine(), schemaBlockText(), hide(), OPEN (+4 more)

### Community 64 - "ui/preview.ts"
Cohesion: 0.09
Nodes (22): GraphLabels, renameGraphScope(), renameScopeKeys(), BlockKind, MoveDir, draw(), drawCached(), drawn (+14 more)

### Community 65 - "conics.ts"
Cohesion: 0.18
Nodes (29): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+21 more)

### Community 67 - "formatNumber"
Cohesion: 0.13
Nodes (22): classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX, Line, number(), pmfBars() (+14 more)

### Community 68 - "smoke-test.mjs"
Cohesion: 0.29
Nodes (4): markdown-it, fakeLlmWorker(), firstVisit(), plainContext

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "strokes.ts"
Cohesion: 0.10
Nodes (33): Prefs, BOARD_PALETTES, BoardPalette, highlightName(), inkName(), mid(), outlineSvg(), PEN_SIZE (+25 more)

### Community 72 - "toLatex"
Cohesion: 0.11
Nodes (30): fourierItems(), isFourierLine(), names(), STUDY_GRAPH, studyItems(), partialSum(), ACCENT_COMMANDS, COMPLEX_FUNCTIONS (+22 more)

### Community 73 - "parse.ts"
Cohesion: 0.06
Nodes (40): hasWord(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, differentialInFraction() (+32 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (64): fnLabel(), primitive(), verified(), atValues(), cancelLinear(), Converter, coordinates(), decimalText() (+56 more)

### Community 75 - "Sheet"
Cohesion: 0.08
Nodes (25): ExactComplexScope, Ode, withWorkLimit(), FormattedResult, Mat, MathNode, chainOf(), close() (+17 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.05
Nodes (59): schemaSummary(), alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ARROW_NAMES (+51 more)

### Community 79 - "chart.ts"
Cohesion: 0.13
Nodes (29): MONTHS, parseDate(), planBlock, PlanKind, planRange(), blockLines(), GraphError, labelLine() (+21 more)

### Community 82 - "Dove sono le cose"
Cohesion: 0.09
Nodes (40): Dove sono le cose, Glifo – architettura, blockMoved, blockMoves(), blockMoveTransaction(), LineMap, placeChart(), tableChartKind() (+32 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.12
Nodes (10): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+2 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.08
Nodes (25): Abbonamenti, Classico, gratis: per scrivere e controllare, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Deciso (5 ottobre 2026) (+17 more)

### Community 91 - "spiegami-qwen.mjs"
Cohesion: 0.29
Nodes (4): vite, minutes, postMessage(), started

### Community 92 - "Costi"
Cohesion: 0.13
Nodes (12): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, Quando lo studente dice di cominciare, Account: i propri appunti su ogni dispositivo, anche da condividere, Idee per il futuro (+4 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.20
Nodes (4): device(), login(), newContext, waitFor()

### Community 97 - "Il database degli account (Supabase)"
Cohesion: 0.17
Nodes (11): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Nell'app, Note condivise con un link (+3 more)

### Community 98 - "graph/preview.ts"
Cohesion: 0.09
Nodes (29): addLabel(), boxes, cameras, drawings, drawnViews, endTex(), FIGURE_SIZE, fitField() (+21 more)

### Community 101 - "editor/editor.ts"
Cohesion: 0.04
Nodes (51): description, name, private, type, version, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands (+43 more)

### Community 102 - "plan.ts"
Cohesion: 0.14
Nodes (17): SheetEditorOptions, Snapshot, SheetModel, cellText(), columnRole(), columnsOf(), durationUnit(), isNumber() (+9 more)

### Community 103 - "createFakeSupabase"
Cohesion: 0.60
Nodes (6): createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 104 - "files.ts"
Cohesion: 0.13
Nodes (21): cache, capability(), ClaudeRuntime, hostDownloads, HostError, hostSample, inClaudeViewer(), ModelTier (+13 more)

### Community 105 - "sheet.ts"
Cohesion: 0.07
Nodes (33): criticalLine(), isSeveralLine(), named(), severalItems(), surface(), OdeFunction, expSumValue(), ExactFunction (+25 more)

### Community 106 - "fake-supabase.mjs"
Cohesion: 0.25
Nodes (6): @electric-sql/pglite, b64(), CODE, GOOGLE_CODE, ROOT, SUPABASE_URL

### Community 107 - "limits.ts"
Cohesion: 0.21
Nodes (17): exponentialForm(), fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), alternating() (+9 more)

### Community 108 - "xlsx.ts"
Cohesion: 0.09
Nodes (43): BinOp, COMPARE, ERRORS_BY_LENGTH, formulaBody(), isFormula(), normalizeFormula(), OPERATORS, parseFormula() (+35 more)

### Community 110 - "page.ts"
Cohesion: 0.06
Nodes (48): katex, AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), currentAccount(), PullResult, openShareDialog() (+40 more)

### Community 113 - "markdown.ts"
Cohesion: 0.09
Nodes (36): @lezer/highlight, @lezer/markdown, lineDepth(), mathDelimTag, mathTag, parseBlockMath(), moveAttrs(), renderTexOrError() (+28 more)

### Community 116 - "SheetEvaluator"
Cohesion: 0.11
Nodes (24): RFC-4180, fflate, sheetSummary(), csvDelimiter(), csvToSheet(), field(), italian(), parseCsv() (+16 more)

### Community 117 - "downloadText"
Cohesion: 0.22
Nodes (10): loadDialect(), base64(), crc32(), svgSize(), svgToPng(), withDensity(), downloadBlob(), downloadText() (+2 more)

### Community 118 - "llmWorker.ts"
Cohesion: 0.29
Nodes (11): chat(), GlifoError, Gpu, load(), post(), remove(), scope, shaderF16() (+3 more)

### Community 120 - "Glifo – note per Claude"
Cohesion: 0.25
Nodes (8): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, Promemoria per lo studente, Regole, sqlite()

### Community 121 - "Field"
Cohesion: 0.13
Nodes (5): eigenvalues(), Field, interpolate(), interpolateFloat(), polynomialIn()

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "graph.ts"
Cohesion: 0.10
Nodes (30): GraphLook, AT_X, cellHtml(), cellText(), COMPASS, createGraph(), drawSchema(), isEdgeLook() (+22 more)

### Community 124 - "suggestions.ts"
Cohesion: 0.17
Nodes (9): templateInsertion(), EditorMathContext, expand(), preferredIndex(), SuggestionController, isSubsequence(), suggestCommands(), parseTemplate() (+1 more)

### Community 125 - "sql.ts"
Cohesion: 0.11
Nodes (22): svg(), SchemaEditorOptions, Schema, Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom() (+14 more)

### Community 126 - "gauss.ts"
Cohesion: 0.14
Nodes (22): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexValue(), isInequality() (+14 more)

### Community 127 - "Glifo"
Cohesion: 0.14
Nodes (14): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Funzionalità (+6 more)

### Community 128 - "markers.ts"
Cohesion: 0.18
Nodes (21): bullet(), childMarker(), column(), firstMarker(), label(), lettersMarker(), MarkerKind, MarkerStyle (+13 more)

### Community 129 - "schema/templates.ts"
Cohesion: 0.10
Nodes (18): DEFAULT_EDGE, NodeLook, SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), tableMetrics(), conceptMap (+10 more)

### Community 131 - "h"
Cohesion: 0.07
Nodes (41): SyncStatus, viewSwitch, saveClosedFolders(), AccountButton, confirmAccountDeletion(), messageOf(), openAccountDialog(), openLoginDialog() (+33 more)

### Community 132 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 133 - "schedule.ts"
Cohesion: 0.18
Nodes (17): checkGiven(), criticalPaths(), key(), Link, LinkType, listText(), offset(), order() (+9 more)

### Community 136 - "tools.ts"
Cohesion: 0.15
Nodes (12): ExplainStep, ALL_TOOLS, callOf(), checkTool, FormulaCheck, Identities, looseJson(), repairTex() (+4 more)

### Community 137 - "touchLog"
Cohesion: 0.31
Nodes (3): movesLine(), seconds(), touchLog

### Community 138 - "sidePanel.ts"
Cohesion: 0.15
Nodes (12): AiResult, isConfidentAnswer(), CATEGORIES, symbolsInCategory(), cardPreviewTex(), formPreviewTex(), ParsedTemplate, PLACEHOLDER_TEX (+4 more)

### Community 139 - "render/lists.ts"
Cohesion: 0.21
Nodes (16): Item, ListStyle, bulletGroup(), ListLine, Marker, resolveMarker(), sameList(), alignInside() (+8 more)

### Community 140 - "placeholders.ts"
Cohesion: 0.15
Nodes (10): buildDecorations(), clearAllPlaceholders(), clearPlaceholders, contains(), currentIndex(), filledMark, getPlaceholders(), jumpPlaceholder() (+2 more)

### Community 141 - "calcPlugin"
Cohesion: 0.21
Nodes (3): calcPlugin, CheckWidget, ResultWidget

### Community 142 - "spreadsheet/format.ts"
Cohesion: 0.21
Nodes (16): decimalsOf(), fixedNumber(), formatNumber(), GENERAL, generalNumber(), group(), MAX_DECIMALS, most() (+8 more)

### Community 143 - "insert.ts"
Cohesion: 0.18
Nodes (12): InsertOptions, toggleLinePrefix(), applyListStyle(), addPlaceholders, CommandTarget, Placeholder, besideSchema(), schemaBlockRanges() (+4 more)

### Community 144 - "checkSteps"
Cohesion: 0.24
Nodes (13): allNames(), checkSteps(), checkTopicFormula(), checkTopicSteps(), engineHints(), formulaNames(), integralsIn(), parsed() (+5 more)

### Community 145 - "boardTouchLog.test.ts"
Cohesion: 0.20
Nodes (8): isSaved(), LOG_MAX_LINES, LogStore, SavedLog, clock(), memoryStore(), newLog(), texts()

### Community 146 - "deploy.test.ts"
Cohesion: 0.28
Nodes (4): vite-plugin-pwa, accountOffMessage(), Site, defineFor()

### Community 147 - "logo.ts"
Cohesion: 0.39
Nodes (5): BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark()

### Community 148 - "ExplainEvents"
Cohesion: 0.33
Nodes (3): ExplainEvents, ToolCall, scripted()

## Knowledge Gaps
- **651 isolated node(s):** `Condividere una nota con un link`, `Provarlo sul tuo computer`, `Assistente AI`, `Spiegami (in prova)`, `Compatibilità con VS Code` (+646 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 906 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **26 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `touchlog.ts`, `Parser`, `main.ts`, `toNode`, `spec.ts`, `arithmetic.ts`, `num`, `GraphView`, `explain.ts`, `svg.ts`, `SchemaEditor`, `Rational`, `SheetEditor`, `compile`, `numerical.ts`, `explainPanel.ts`, `Board`, `inference.ts`, `BoardStore`, `MathError`, `assistant.ts`, `.renderFormat`, `several.ts`, `graph/file.ts`, `graph/space.ts`, `graphNote.test.ts`, `logic.ts`, `NotesStore`, `complex.ts`, `namesIn`, `localModels.ts`, `Pt`, `linsys.ts`, `study.ts`, `functions.ts`, `spreadsheet/editor.ts`, `vitest`, `board/shapes.ts`, `schemaBlocks.ts`, `SidePanel`, `toolbar.ts`, `settings.ts`, `MarkdownEditor`, `finite.ts`, `board.ts`, `tutorial.ts`, `odesolve.ts`, `schema/shapes.ts`, `view3d.ts`, `ui/preview.ts`, `conics.ts`, `smoke-test.mjs`, `strokes.ts`, `toLatex`, `parse.ts`, `symbolic.ts`, `Sheet`, `schema/editor.ts`, `chart.ts`, `graph/preview.ts`, `plan.ts`, `files.ts`, `sheet.ts`, `limits.ts`, `xlsx.ts`, `markdown.ts`, `SheetEvaluator`, `downloadText`, `llmWorker.ts`, `graph.ts`, `h`, `schedule.ts`, `touchLog`, `sidePanel.ts`, `checkSteps`, `boardTouchLog.test.ts`, `deploy.test.ts`, `.exportBoards`?**
  _High betweenness centrality (0.166) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `touchlog.ts`, `markers.ts`, `sync.ts`, `arithmetic.ts`, `num`, `explain.ts`, `sidePanel.ts`, `editor/lists.ts`, `scopeWith`, `Rational`, `insert.ts`, `boardTouchLog.test.ts`, `deploy.test.ts`, `explainPanel.ts`, `logo.ts`, `BoardStore`, `assistant.ts`, `supabase.ts`, `graph/file.ts`, `graph/space.ts`, `search.ts`, `graphNote.test.ts`, `NotesStore`, `localModels.ts`, `resize.ts`, `spreadsheet/editor.ts`, `distributions.ts`, `board/shapes.ts`, `schemaBlocks.ts`, `settings.ts`, `board.ts`, `tutorial.ts`, `schema/blocks.ts`, `ui/preview.ts`, `strokes.ts`, `parse.ts`, `schema/editor.ts`, `chart.ts`, `Dove sono le cose`, `editor/editor.ts`, `plan.ts`, `sheet.ts`, `page.ts`, `markdown.ts`, `SheetEvaluator`, `sql.ts`?**
  _High betweenness centrality (0.101) - this node is a cross-community bridge._
- **Why does `Board` connect `Board` to `main.ts`, `strokes.ts`, `Pt`, `.constructor`, `board.ts`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **Are the 242 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `adoptGuestNotes()`) actually correct?**
  _`Dove sono le cose` has 242 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Condividere una nota con un link`, `Provarlo sul tuo computer`, `Assistente AI` to the rest of the system?**
  _651 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `touchlog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04779686333084392 - nodes in this community are weakly interconnected._