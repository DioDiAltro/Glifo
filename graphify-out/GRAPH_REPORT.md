# Graph Report - matherdown  (2026-10-07)

## Corpus Check
- 292 files · ~565,964 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 4777 nodes · 17290 edges · 135 communities (109 shown, 26 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 503 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `66465da9`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- touchlog.ts
- parse.ts
- main.ts
- num
- sync.ts
- spec.ts
- arithmetic.ts
- primitive.ts
- graph/preview.ts
- explain.ts
- complex.ts
- editor/lists.ts
- svg.ts
- spreadsheet/editor.ts
- SchemaEditor
- Rational
- h
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
- graph.ts
- supabase.ts
- several.ts
- gantt.ts
- view3d.ts
- plan.ts
- graphNote.test.ts
- logic.ts
- NotesStore
- gauss.ts
- namesIn
- explainPanel.test.ts
- resize.ts
- sheet.ts
- Pt
- linsys.ts
- study.ts
- functions.ts
- toLatex
- probability.ts
- vitest
- laplace.ts
- board/shapes.ts
- schemaBlocks.ts
- BoardStore
- sidePanel.ts
- limits.ts
- toolbar.ts
- finite.ts
- 20261004091555_note_condivise.sql
- board.ts
- schemaTools.test.ts
- evaluateExactComplex
- schema/shapes.ts
- dependencies
- FoldersStore
- schema/file.ts
- ui/preview.ts
- Stroke
- icons.mjs
- statsGraph.ts
- smoke-test.mjs
- Benvenuto in Glifo
- compilerOptions
- Dove sono le cose
- solve.ts
- blockMove.ts
- symbolic.ts
- Sheet
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- spreadsheet/format.ts
- session-start.sh
- .claude/CLAUDE.md
- editor.test.ts
- tutorial.mjs
- Abbonamenti
- spiegami-qwen.mjs
- supabase-stub.sql
- account-test.mjs
- Il database degli account (Supabase)
- devDependencies
- Parser
- editor/editor.ts
- ExplainEvents
- createFakeSupabase
- files.ts
- explainPanel.ts
- fake-supabase.mjs
- logo.ts
- xlsx.ts
- page.ts
- graph/file.ts
- tools.ts
- localModels.ts
- Glifo – note per Claude
- Le spiegazioni, come funzionano
- renderTex
- Piano per piano
- sql.ts
- Costi
- Glifo
- Idee per il futuro
- icon
- La lavagna
- I modelli e le chiavi API

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 217 edges
2. `MathError` - 151 edges
3. `num()` - 145 edges
4. `Sheet` - 135 edges
5. `MathNode` - 129 edges
6. `mul()` - 124 edges
7. `Board` - 118 edges
8. `compile()` - 113 edges
9. `Rational` - 111 edges
10. `toLatex()` - 103 edges

## Surprising Connections (you probably didn't know these)
- `Dove sono le cose` --references--> `ConicElements`  [INFERRED]
  ARCHITETTURA.md → src/math/conics.ts
- `Dove sono le cose` --references--> `WidgetKind`  [INFERRED]
  ARCHITETTURA.md → src/editor/schemaBlocks.ts
- `Dove sono le cose` --references--> `texts()`  [INFERRED]
  ARCHITETTURA.md → tests/boardTouchLog.test.ts
- `Come viene pubblicata` --references--> `dist()`  [INFERRED]
  README.md → src/board/shapes.ts
- `Dove sono le cose` --references--> `fakeLlmWorker()`  [INFERRED]
  ARCHITETTURA.md → scripts/smoke-test.mjs

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (135 total, 26 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.09
Nodes (27): at(), browserStore, clip(), isSaved(), KINDS, LOG_KEY, LOG_MAX_LINES, LogStore (+19 more)

### Community 1 - "parse.ts"
Cohesion: 0.07
Nodes (40): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe(), differentialInFraction() (+32 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (108): addToGraphBlock(), setGraphLabels(), blockMoveTransaction(), graphsForFile(), hide(), account, accountButton, active (+100 more)

### Community 3 - "num"
Cohesion: 0.07
Nodes (102): absOf(), splitAbs(), withoutAbs(), exp(), hyperbolicToExp(), sqrtEx(), polyEx(), addWave() (+94 more)

### Community 4 - "sync.ts"
Cohesion: 0.05
Nodes (37): AccountSync, withLock(), Account, EMPTY_STATE, FolderChange, FolderRow, isEmpty(), iso() (+29 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (105): quadricEquation(), fourierItems(), isFourierLine(), isComplexLine(), constantIntegrand(), depth(), inequalityMargin(), integralRegion (+97 more)

### Community 6 - "arithmetic.ts"
Cohesion: 0.10
Nodes (46): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+38 more)

### Community 7 - "primitive.ts"
Cohesion: 0.16
Nodes (63): linearIn(), termTransform(), algebraic(), bigGcd(), byParts(), candidates(), canon(), combineLogs() (+55 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (44): FIGURE_PALETTE, addLabel(), boxes, cameras, complexCoord(), coord(), drawings, drawnViews (+36 more)

### Community 9 - "explain.ts"
Cohesion: 0.13
Nodes (37): allNames(), ChatFn, checkSteps(), engineHints(), explain(), ExplainError, ExplainKind, explainTarget (+29 more)

### Community 10 - "complex.ts"
Cohesion: 0.10
Nodes (24): add(), compileName(), ComplexCompiled, conjugateOf(), constant(), cos(), cosh(), EMPTY_COMPLEX_SCOPE (+16 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.08
Nodes (66): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+58 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (53): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), dataWindow(), domainEdge() (+45 more)

### Community 13 - "spreadsheet/editor.ts"
Cohesion: 0.08
Nodes (55): RFC-4180, csvDelimiter(), field(), italian(), sheetToCsv(), splitRecords(), currentCall(), Editing (+47 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.10
Nodes (4): isLanes(), SchemaEditor, withLaneContents(), serializeSchema()

### Community 15 - "Rational"
Cohesion: 0.07
Nodes (51): Part, at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf() (+43 more)

### Community 16 - "h"
Cohesion: 0.08
Nodes (7): rangeLabel(), SheetEditor, serializeSheet(), sheetSize(), CellRange, cloneSheet(), h()

### Community 17 - "compile"
Cohesion: 0.05
Nodes (94): conicItems(), isConicLine(), criticalLine(), isSeveralLine(), named(), severalItems(), surface(), areaFor() (+86 more)

### Community 18 - "numerical.ts"
Cohesion: 0.11
Nodes (47): Funzionalità, bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial() (+39 more)

### Community 19 - "markdown.ts"
Cohesion: 0.10
Nodes (33): dataRange(), checkHtml(), checkTitle(), cache, escapeHtml(), renderTexOrError(), renderTexWithResult(), TexRender (+25 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (41): b, bigops, c, calculus, fn, fr, fractions, functions (+33 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "Board"
Cohesion: 0.11
Nodes (3): Board, penErases(), highlightName()

### Community 23 - "distributions.ts"
Cohesion: 0.07
Nodes (60): addExp(), choose(), continuousQuantile(), discreteQuantile(), Distribution, exactIntervalProbability(), factorialBig(), FAMILIES (+52 more)

### Community 24 - "store.ts"
Cohesion: 0.09
Nodes (16): fake-indexeddb, PEN_SIZE, BoardBackend, BoardChange, BoardData, done(), fromRecord(), IdbBoards (+8 more)

### Community 25 - "MathError"
Cohesion: 0.05
Nodes (101): MathError, decimalSeparator(), formatNumber(), formatRational(), fromNumber(), fromRational(), writeDigits(), angleBetween() (+93 more)

### Community 26 - "assistant.ts"
Cohesion: 0.10
Nodes (27): AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible(), askThroughHost() (+19 more)

### Community 27 - "graph.ts"
Cohesion: 0.09
Nodes (33): fieldInput(), textWidth(), AT_X, cellText(), COMPASS, createEdgeCell(), createGraph(), drawSchema() (+25 more)

### Community 28 - "supabase.ts"
Cohesion: 0.12
Nodes (30): @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken(), ensureSessionOf() (+22 more)

### Community 29 - "several.ts"
Cohesion: 0.08
Nodes (55): expSumValue(), Digits, FormatOptions, SUPERSCRIPT, shown(), size(), exText(), norm() (+47 more)

### Community 30 - "gantt.ts"
Cohesion: 0.05
Nodes (78): amount(), barColor(), crossings(), dateText(), dayOf(), fitText(), GanttOptions, ganttSvg() (+70 more)

### Community 31 - "view3d.ts"
Cohesion: 0.06
Nodes (85): sampleRegion(), addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon() (+77 more)

### Community 32 - "plan.ts"
Cohesion: 0.16
Nodes (18): cellText(), columnRole(), columnsOf(), durationUnit(), isNumber(), isPlanRange(), MAX_ACTIVITIES, plain() (+10 more)

### Community 33 - "graphNote.test.ts"
Cohesion: 0.07
Nodes (34): @codemirror/state, @codemirror/view, acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult, calcResults() (+26 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "NotesStore"
Cohesion: 0.08
Nodes (32): accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf() (+24 more)

### Community 36 - "gauss.ts"
Cohesion: 0.14
Nodes (26): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexValue(), isInequality() (+18 more)

### Community 37 - "namesIn"
Cohesion: 0.14
Nodes (36): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+28 more)

### Community 38 - "explainPanel.test.ts"
Cohesion: 0.13
Nodes (11): localErrorMessage(), localLlm, Pending, ChatMessage, ChatOptions, LoadProgress, localModel, explainFieldset() (+3 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "sheet.ts"
Cohesion: 0.08
Nodes (52): OdeFunction, ExactFunction, dataOf(), isVector(), Lin, statisticOf(), bracketParts(), BRACKETS (+44 more)

### Community 41 - "Pt"
Cohesion: 0.12
Nodes (12): clampZoom(), coalesced(), EraseAction, Finger, MoveAction, pointsOf(), pressureOf(), validView() (+4 more)

### Community 42 - "linsys.ts"
Cohesion: 0.14
Nodes (39): inverseRational(), choices(), minorsGcd(), ONE, parametricRows(), parametricSystem(), PARAMS, polyDeterminant() (+31 more)

### Community 43 - "study.ts"
Cohesion: 0.09
Nodes (51): close(), Definite, definiteIntegral(), exValue(), samples(), EMPTY_SCOPE, Piece, limit() (+43 more)

### Community 44 - "functions.ts"
Cohesion: 0.09
Nodes (59): EMPTY, number(), addFormat(), divFormat(), GENERAL, mulFormat(), tidy(), withCents() (+51 more)

### Community 45 - "toLatex"
Cohesion: 0.10
Nodes (38): isNumericalLine(), numericalItems(), names(), STUDY_GRAPH, studyItems(), ACCENT_COMMANDS, COMPLEX_FUNCTIONS, diffLatex() (+30 more)

### Community 46 - "probability.ts"
Cohesion: 0.14
Nodes (23): End, Family, CompileOptions, ExactScope, ALL, complement(), distributionOf(), endAt() (+15 more)

### Community 47 - "vitest"
Cohesion: 0.04
Nodes (47): vite-plugin-pwa, vitest, staticGraphSvg(), chooseWindow(), containing(), specFor(), chooseBox(), parseGraph() (+39 more)

### Community 48 - "laplace.ts"
Cohesion: 0.13
Nodes (39): factoredPolynomial(), atIntegers(), boundsOf(), close(), definite(), fourierProblem, fourierShown(), isTrig() (+31 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.14
Nodes (34): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+26 more)

### Community 50 - "schemaBlocks.ts"
Cohesion: 0.16
Nodes (9): BlockWidget, findWidgetBlocks(), guardBlocks(), KINDS, schemaSummary(), sheetSummary(), WidgetBlock, WidgetKind (+1 more)

### Community 51 - "BoardStore"
Cohesion: 0.12
Nodes (4): BoardStore, MemoryBoards, validView(), backup()

### Community 52 - "sidePanel.ts"
Cohesion: 0.07
Nodes (43): templateInsertion(), EditorMathContext, expand(), preferredIndex(), SuggestionController, SuggestionItem, editDistance(), normalizeText() (+35 more)

### Community 53 - "limits.ts"
Cohesion: 0.19
Nodes (18): fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), alternating(), close() (+10 more)

### Community 54 - "toolbar.ts"
Cohesion: 0.09
Nodes (24): closeMathBlockOnEnter(), EditorCallbacks, MarkdownEditor, insertBlock(), InsertOptions, insertTemplate(), toggleLinePrefix(), wrapSelection() (+16 more)

### Community 55 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "board.ts"
Cohesion: 0.05
Nodes (43): Action, ACTION_NAMES, BoardOptions, DOT_SIZES, DrawAction, EraserMode, HANDLE_REACH, ICON (+35 more)

### Community 58 - "schemaTools.test.ts"
Cohesion: 0.15
Nodes (22): alignBoxes(), Alignment, Box, distributeBoxes(), Position, cellHtml(), labelHtml(), lanesHtml() (+14 more)

### Community 59 - "evaluateExactComplex"
Cohesion: 0.19
Nodes (13): asin(), atan(), compileFunction(), evaluateExactComplex(), exactSqrt(), GaussRational, log(), pow() (+5 more)

### Community 60 - "schema/shapes.ts"
Cohesion: 0.08
Nodes (17): @maxgraph/core, ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape (+9 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "FoldersStore"
Cohesion: 0.06
Nodes (25): Deletion, DeletionLog, cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder() (+17 more)

### Community 63 - "schema/file.ts"
Cohesion: 0.21
Nodes (12): svg(), base64(), hide(), OPEN, schemasForFile(), schemasFromFile(), unhide(), crc32() (+4 more)

### Community 64 - "ui/preview.ts"
Cohesion: 0.07
Nodes (29): GraphLabels, renameGraphScope(), renameScopeKeys(), BlockKind, MoveDir, Look, SchemaError, Theme (+21 more)

### Community 65 - "Stroke"
Cohesion: 0.33
Nodes (3): Step, Box, Stroke

### Community 67 - "statsGraph.ts"
Cohesion: 0.18
Nodes (17): isTestLine(), number(), testItems(), classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX (+9 more)

### Community 68 - "smoke-test.mjs"
Cohesion: 0.29
Nodes (4): markdown-it, fakeLlmWorker(), firstVisit(), plainContext

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "Dove sono le cose"
Cohesion: 0.09
Nodes (41): Dove sono le cose, Glifo – architettura, LassoAction, centerOn(), copyStrokes(), cross(), IDENTITY, insideLasso() (+33 more)

### Community 72 - "solve.ts"
Cohesion: 0.14
Nodes (29): FieldContext, Scope, LinearScope, isStandardUnknown(), linearSystem(), matrixEquation(), RelOp, breaks() (+21 more)

### Community 73 - "blockMove.ts"
Cohesion: 0.09
Nodes (35): blockMoved, blockMoves(), LineMap, schemaBlocks(), blank(), BlockMove, blockPlace(), closed() (+27 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (63): primitive(), quadraticIn(), assumePositive(), atValues(), commonMonomial(), commonPositive(), Converter, coordinates() (+55 more)

### Community 75 - "Sheet"
Cohesion: 0.08
Nodes (25): ExactComplexScope, Ode, withWorkLimit(), FiniteContext, FormattedResult, Mat, MathNode, chainOf() (+17 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.04
Nodes (63): ALIGN, ARROW_NAMES, AT_ICONS, AT_NAMES, BASE_PRESETS, BIG_ARROWS, DB_PRESETS, Direction (+55 more)

### Community 79 - "spreadsheet/format.ts"
Cohesion: 0.08
Nodes (45): at(), breakEven(), Point, quantity(), tableItems(), textLabel(), chartData, chartFrom() (+37 more)

### Community 82 - "editor.test.ts"
Cohesion: 0.08
Nodes (26): @lezer/common, tabOutOfMath(), CODE_NODES, CommandToken, commandTokenAt(), isInCode(), MATH_NODES, mathContextAt() (+18 more)

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

### Community 98 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

### Community 101 - "editor/editor.ts"
Cohesion: 0.04
Nodes (64): description, name, private, scripts, build, dev, preview, test (+56 more)

### Community 102 - "ExplainEvents"
Cohesion: 0.33
Nodes (3): ExplainEvents, ToolCall, scripted()

### Community 103 - "createFakeSupabase"
Cohesion: 0.60
Nodes (6): createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 104 - "files.ts"
Cohesion: 0.24
Nodes (13): inClaudeViewer(), canWriteFilesDirectly(), FsWindow, isAbort(), MD_TYPES, OPEN_TYPES, OpenedFile, openMarkdownFiles() (+5 more)

### Community 105 - "explainPanel.ts"
Cohesion: 0.17
Nodes (11): Explanation, REPLY_TOKENS, explanationMarkdown(), regionToExplain(), Asked, ExplainPanel, preventFocusSteal(), sentenceHtml() (+3 more)

### Community 106 - "fake-supabase.mjs"
Cohesion: 0.25
Nodes (6): @electric-sql/pglite, b64(), CODE, GOOGLE_CODE, ROOT, SUPABASE_URL

### Community 107 - "logo.ts"
Cohesion: 0.33
Nodes (6): sidebarToggle(), BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark()

### Community 108 - "xlsx.ts"
Cohesion: 0.08
Nodes (47): fflate, csvToSheet(), parseCsv(), readNumber(), sameFormat(), BinOp, COMPARE, ERRORS_BY_LENGTH (+39 more)

### Community 110 - "page.ts"
Cohesion: 0.07
Nodes (45): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), PullResult, openShareDialog(), changeAccess(), changeCopy() (+37 more)

### Community 116 - "graph/file.ts"
Cohesion: 0.10
Nodes (35): figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsFromFile(), OPEN, swatchSvg(), titleBand() (+27 more)

### Community 117 - "tools.ts"
Cohesion: 0.12
Nodes (13): ExplainStep, ALL_TOOLS, callOf(), checkTool, FormulaCheck, Identities, looseJson(), repairTex() (+5 more)

### Community 118 - "localModels.ts"
Cohesion: 0.15
Nodes (20): @mlc-ai/web-llm, chat(), GlifoError, Gpu, load(), post(), remove(), scope (+12 more)

### Community 120 - "Glifo – note per Claude"
Cohesion: 0.22
Nodes (9): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole (+1 more)

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "renderTex"
Cohesion: 0.24
Nodes (5): cleanKatexError(), renderTex(), displayCode(), preventFocusSteal(), SidePanel

### Community 124 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 125 - "sql.ts"
Cohesion: 0.17
Nodes (17): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+9 more)

### Community 126 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, Quando lo studente dice di cominciare

### Community 127 - "Glifo"
Cohesion: 0.15
Nodes (13): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Glifo (+5 more)

### Community 129 - "Idee per il futuro"
Cohesion: 0.33
Nodes (6): Account: i propri appunti su ogni dispositivo, anche da condividere, Idee per il futuro, In programma, La lavagna: idee in più, Più avanti, Schemi: idee in più

### Community 131 - "icon"
Cohesion: 0.04
Nodes (65): SyncStatus, EXPLAIN_TONES, ExplainTone, AI_SERVICES, board, helpButton, openGuide(), ACCOUNT_SETTINGS (+57 more)

### Community 132 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 136 - "I modelli e le chiavi API"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), In prova sul ramo `prova` (7 ottobre 2026): Qwen3 nel browser per «Spiegami», Le idee dello studente (5 ottobre 2026)

## Knowledge Gaps
- **641 isolated node(s):** `Comandi`, `Promemoria per lo studente`, `Regole`, `Account: i propri appunti su ogni dispositivo, anche da condividere`, `La lavagna: idee in più` (+636 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 890 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **26 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `touchlog.ts`, `parse.ts`, `main.ts`, `num`, `icon`, `spec.ts`, `arithmetic.ts`, `primitive.ts`, `graph/preview.ts`, `explain.ts`, `svg.ts`, `spreadsheet/editor.ts`, `SchemaEditor`, `Rational`, `h`, `compile`, `numerical.ts`, `markdown.ts`, `Board`, `distributions.ts`, `MathError`, `assistant.ts`, `graph.ts`, `supabase.ts`, `several.ts`, `gantt.ts`, `view3d.ts`, `plan.ts`, `graphNote.test.ts`, `logic.ts`, `NotesStore`, `gauss.ts`, `namesIn`, `explainPanel.test.ts`, `sheet.ts`, `Pt`, `linsys.ts`, `study.ts`, `functions.ts`, `toLatex`, `vitest`, `laplace.ts`, `board/shapes.ts`, `schemaBlocks.ts`, `BoardStore`, `limits.ts`, `toolbar.ts`, `finite.ts`, `board.ts`, `schemaTools.test.ts`, `evaluateExactComplex`, `schema/shapes.ts`, `schema/file.ts`, `ui/preview.ts`, `smoke-test.mjs`, `solve.ts`, `blockMove.ts`, `symbolic.ts`, `Sheet`, `spreadsheet/format.ts`, `explainPanel.ts`, `logo.ts`, `xlsx.ts`, `graph/file.ts`, `localModels.ts`?**
  _High betweenness centrality (0.162) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `touchlog.ts`, `parse.ts`, `main.ts`, `icon`, `sync.ts`, `num`, `explain.ts`, `editor/lists.ts`, `svg.ts`, `spreadsheet/editor.ts`, `compile`, `markdown.ts`, `distributions.ts`, `store.ts`, `MathError`, `assistant.ts`, `supabase.ts`, `gantt.ts`, `view3d.ts`, `plan.ts`, `graphNote.test.ts`, `NotesStore`, `explainPanel.test.ts`, `resize.ts`, `linsys.ts`, `board/shapes.ts`, `sidePanel.ts`, `board.ts`, `schemaTools.test.ts`, `FoldersStore`, `schema/file.ts`, `ui/preview.ts`, `Dove sono le cose`, `blockMove.ts`, `Sheet`, `spreadsheet/format.ts`, `editor.test.ts`, `editor/editor.ts`, `logo.ts`, `xlsx.ts`, `page.ts`, `graph/file.ts`, `localModels.ts`, `sql.ts`?**
  _High betweenness centrality (0.113) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `main.ts`, `icon`, `graph/preview.ts`, `spreadsheet/editor.ts`, `SchemaEditor`, `Board`, `graph.ts`, `gantt.ts`, `explainPanel.test.ts`, `resize.ts`, `sidePanel.ts`, `toolbar.ts`, `board.ts`, `FoldersStore`, `ui/preview.ts`, `schema/editor.ts`, `editor/editor.ts`, `explainPanel.ts`, `logo.ts`, `page.ts`, `renderTex`?**
  _High betweenness centrality (0.041) - this node is a cross-community bridge._
- **Are the 216 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `adoptGuestNotes()`) actually correct?**
  _`Dove sono le cose` has 216 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Comandi`, `Promemoria per lo studente`, `Regole` to the rest of the system?**
  _641 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `touchlog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08653061224489796 - nodes in this community are weakly interconnected._
- **Should `parse.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0744792762465811 - nodes in this community are weakly interconnected._