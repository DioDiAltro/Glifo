# Graph Report - matherdown  (2026-10-07)

## Corpus Check
- 293 files · ~566,706 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 4781 nodes · 17302 edges · 143 communities (116 shown, 27 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 505 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a4452128`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- touchlog.ts
- Parser
- main.ts
- num
- sync.ts
- spec.ts
- arithmetic.ts
- primitive.ts
- graph/preview.ts
- explain.ts
- sheet.ts
- editor/lists.ts
- svg.ts
- toLatex
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
- graph.ts
- account/space.ts
- several.ts
- gantt.ts
- view3d.ts
- linsys.ts
- editor.test.ts
- logic.ts
- NotesStore
- complex.ts
- namesIn
- explainPanel.test.ts
- resize.ts
- statsShown.ts
- Pt
- spreadsheet/editor.ts
- study.ts
- functions.ts
- spreadsheet.test.ts
- probability.ts
- parse.ts
- laplace.ts
- board/shapes.ts
- schemaBlocks.ts
- .render
- powerseries.ts
- settings.ts
- MarkdownEditor
- finite.ts
- 20261004091555_note_condivise.sql
- board.ts
- spaces.ts
- odesolve.ts
- schema/shapes.ts
- dependencies
- FoldersStore
- parseSchema
- Preview
- conics.ts
- icons.mjs
- nameLatex
- smoke-test.mjs
- Benvenuto in Glifo
- compilerOptions
- selection.ts
- solve.ts
- blockMove.ts
- symbolic.ts
- Sheet
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- plan.ts
- session-start.sh
- .claude/CLAUDE.md
- blockMoveEditor.test.ts
- tutorial.mjs
- Abbonamenti
- spiegami-qwen.mjs
- supabase-stub.sql
- account-test.mjs
- Il database degli account (Supabase)
- devDependencies
- Parser
- graphNote.test.ts
- schema/templates.ts
- createFakeSupabase
- files.ts
- editor/editor.ts
- fake-supabase.mjs
- page.ts
- Dove sono le cose
- supabase.ts
- tools.ts
- graph/file.ts
- schedule.ts
- localModels.ts
- ui/preview.ts
- Glifo – note per Claude
- Field
- Le spiegazioni, come funzionano
- PreviewCallbacks
- Piano per piano
- sql.ts
- Costi
- Glifo
- deploy.test.ts
- Idee per il futuro
- h
- La lavagna
- ExplainEvents
- I modelli e le chiavi API
- sidePanel.ts
- calcResults.ts
- schema/preview.ts

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 219 edges
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
- `Dove sono le cose` --references--> `WidgetKind`  [INFERRED]
  ARCHITETTURA.md → src/editor/schemaBlocks.ts
- `Dove sono le cose` --references--> `ConicElements`  [INFERRED]
  ARCHITETTURA.md → src/math/conics.ts
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

## Communities (143 total, 27 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.09
Nodes (27): at(), browserStore, clip(), isSaved(), KINDS, LOG_KEY, LOG_MAX_LINES, LogStore (+19 more)

### Community 1 - "Parser"
Cohesion: 0.17
Nodes (4): describe(), MathSyntaxError, Parser, parseStatement()

### Community 2 - "main.ts"
Cohesion: 0.05
Nodes (93): graphsForFile(), remapGraphLines(), account, ACCOUNT_OFF, accountProblem(), active, app, applyAccountChange() (+85 more)

### Community 3 - "num"
Cohesion: 0.12
Nodes (72): withoutAbs(), exp(), hyperbolicToExp(), inverseRational(), linearIn(), sqrtEx(), termTransform(), polyEx() (+64 more)

### Community 4 - "sync.ts"
Cohesion: 0.05
Nodes (38): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+30 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (101): isConicLine(), quadricEquation(), isFourierLine(), isNumericalLine(), numericalItems(), constantIntegrand(), depth(), inequalityMargin() (+93 more)

### Community 6 - "arithmetic.ts"
Cohesion: 0.10
Nodes (46): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+38 more)

### Community 7 - "primitive.ts"
Cohesion: 0.16
Nodes (55): algebraic(), bigGcd(), byParts(), candidates(), canon(), combineLogs(), compareKeys(), exponentials() (+47 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (45): FIGURE_PALETTE, addLabel(), boxes, cameras, complexCoord(), containing(), coord(), drawings (+37 more)

### Community 9 - "explain.ts"
Cohesion: 0.14
Nodes (32): allNames(), ChatFn, checkSteps(), engineHints(), explain(), EXPLAIN_TONES, ExplainError, ExplainKind (+24 more)

### Community 10 - "sheet.ts"
Cohesion: 0.06
Nodes (40): numericPartials(), formatComplex(), formatGauss(), formatList(), join(), OdeFunction, expSumValue(), ExactFunction (+32 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.09
Nodes (61): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+53 more)

### Community 12 - "svg.ts"
Cohesion: 0.08
Nodes (63): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), staticGraphSvg(), chooseWindow(), chooseY(), clipLines() (+55 more)

### Community 13 - "toLatex"
Cohesion: 0.10
Nodes (34): FieldContext, fourierItems(), names(), STUDY_GRAPH, studyItems(), Scope, partialSum(), ACCENT_COMMANDS (+26 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.10
Nodes (4): isLanes(), SchemaEditor, withLaneContents(), serializeSchema()

### Community 15 - "Rational"
Cohesion: 0.10
Nodes (25): Part, expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactRandom, exactRoot() (+17 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (3): rangeLabel(), SheetEditor, cloneSheet()

### Community 17 - "compile"
Cohesion: 0.05
Nodes (86): conicItems(), integralRegion, LayeredSolid, argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension() (+78 more)

### Community 18 - "numerical.ts"
Cohesion: 0.12
Nodes (45): Funzionalità, bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial() (+37 more)

### Community 19 - "markdown.ts"
Cohesion: 0.09
Nodes (32): Explanation, REPLY_TOKENS, modelName(), explanationMarkdown(), checkHtml(), checkTitle(), cache, escapeHtml() (+24 more)

### Community 20 - "index.ts"
Cohesion: 0.06
Nodes (43): b, bigops, c, calculus, fn, fr, fractions, functions (+35 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (22): Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download(), fetchDictionary() (+14 more)

### Community 22 - "Board"
Cohesion: 0.09
Nodes (5): Board, loadPrefs(), penErases(), sizeChoice(), highlightName()

### Community 23 - "distributions.ts"
Cohesion: 0.06
Nodes (66): isTestLine(), number(), testItems(), addExp(), choose(), continuousQuantile(), discreteQuantile(), Distribution (+58 more)

### Community 24 - "store.ts"
Cohesion: 0.09
Nodes (20): fake-indexeddb, Prefs, BoardPalette, SizeChoice, BackupBoard, BoardBackend, done(), fromRecord() (+12 more)

### Community 25 - "MathError"
Cohesion: 0.12
Nodes (57): MathError, nameLabel(), UndefinedName, angleBetween(), asMatrix(), basisOf(), circleText(), cross() (+49 more)

### Community 26 - "assistant.ts"
Cohesion: 0.14
Nodes (21): AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible(), askThroughHost() (+13 more)

### Community 27 - "graph.ts"
Cohesion: 0.11
Nodes (32): AT_X, cellHtml(), cellText(), COMPASS, createEdgeCell(), createGraph(), drawSchema(), edgeLook() (+24 more)

### Community 28 - "account/space.ts"
Cohesion: 0.09
Nodes (18): accountSpace(), adoptGuestNotes(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf(), setCurrentAccount() (+10 more)

### Community 29 - "several.ts"
Cohesion: 0.11
Nodes (46): criticalLine(), named(), severalItems(), surface(), shown(), size(), exText(), norm() (+38 more)

### Community 30 - "gantt.ts"
Cohesion: 0.08
Nodes (47): amount(), barColor(), crossings(), dateText(), dayOf(), fitText(), GanttOptions, ganttSvg() (+39 more)

### Community 31 - "view3d.ts"
Cohesion: 0.06
Nodes (85): addMesh(), addTet(), affinePlane(), Axis, Box, centroid(), clipBy(), clipPolygon() (+77 more)

### Community 32 - "linsys.ts"
Cohesion: 0.16
Nodes (33): choices(), minorsGcd(), ONE, parametricRows(), PARAMS, polyDeterminant(), substitute(), ZERO (+25 more)

### Community 33 - "editor.test.ts"
Cohesion: 0.07
Nodes (28): @lezer/common, tabOutOfMath(), CODE_NODES, CommandToken, commandTokenAt(), isInCode(), MATH_NODES, mathContextAt() (+20 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "NotesStore"
Cohesion: 0.08
Nodes (27): Deletion, DeletionLog, addPersonalWord(), DICTIONARY_KEY, loadPersonalWords(), savePersonalWords(), tidy(), FOLDER_NAME_MAX (+19 more)

### Community 36 - "complex.ts"
Cohesion: 0.06
Nodes (59): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexLine(), isComplexValue() (+51 more)

### Community 37 - "namesIn"
Cohesion: 0.14
Nodes (36): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+28 more)

### Community 38 - "explainPanel.test.ts"
Cohesion: 0.14
Nodes (12): LocalAbort, localErrorMessage(), localLlm, Pending, ChatMessage, ChatOptions, LoadProgress, localModel (+4 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "statsShown.ts"
Cohesion: 0.20
Nodes (27): Lin, check(), correlation(), count(), covariance(), Data, dataStatistic(), deviation() (+19 more)

### Community 41 - "Pt"
Cohesion: 0.12
Nodes (13): clampZoom(), coalesced(), Finger, LassoAction, MoveAction, pointsOf(), pressureOf(), validView() (+5 more)

### Community 42 - "spreadsheet/editor.ts"
Cohesion: 0.12
Nodes (30): currentCall(), Editing, MenuEntry, Move, PATHS, SheetEditorOptions, Snapshot, adjustFormula() (+22 more)

### Community 43 - "study.ts"
Cohesion: 0.20
Nodes (26): Asymptote, boundaries(), cutsOf(), defined(), domainOf(), exact(), inDomain(), inside() (+18 more)

### Community 44 - "functions.ts"
Cohesion: 0.08
Nodes (63): EMPTY, evaluateSheet(), number(), SheetEvaluator, addFormat(), divFormat(), GENERAL, mulFormat() (+55 more)

### Community 45 - "spreadsheet.test.ts"
Cohesion: 0.10
Nodes (39): sheetSummary(), tablesNote(), openSheetEditor(), decimalsOf(), fixedNumber(), formatCode(), formatNumber(), generalNumber() (+31 more)

### Community 46 - "probability.ts"
Cohesion: 0.13
Nodes (23): End, ExactScope, RelOp, ALL, complement(), endAt(), EventContext, eventSet() (+15 more)

### Community 47 - "parse.ts"
Cohesion: 0.03
Nodes (78): vitest, GraphItem, parseGraph(), PALETTES, errorMessage(), ACCENTS, AND_WORDS, BARE_WORDS (+70 more)

### Community 48 - "laplace.ts"
Cohesion: 0.12
Nodes (39): factoredPolynomial(), absOf(), atIntegers(), boundsOf(), close(), definite(), fourierProblem, fourierShown() (+31 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.14
Nodes (34): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+26 more)

### Community 50 - "schemaBlocks.ts"
Cohesion: 0.07
Nodes (35): @codemirror/view, insertBlock(), InsertOptions, toggleLinePrefix(), wrapSelection(), LIST_STYLES, besideSchema(), BlockWidget (+27 more)

### Community 51 - ".render"
Cohesion: 0.14
Nodes (13): BOARD_PALETTES, BoardTheme, inkName(), mid(), outlineSvg(), PEN_SIZE, shapeSvg(), strokeOptions() (+5 more)

### Community 52 - "powerseries.ts"
Cohesion: 0.14
Nodes (21): FormatOptions, alternating(), close(), derivatives(), limit(), LimitPath, oneSided(), same() (+13 more)

### Community 53 - "settings.ts"
Cohesion: 0.10
Nodes (20): ExplainTone, ACCOUNT_SETTINGS, accountSettings(), AI_MODELS, DEFAULT_SETTINGS, loadSettings(), saveSettings(), Settings (+12 more)

### Community 54 - "MarkdownEditor"
Cohesion: 0.18
Nodes (3): EditorCallbacks, MarkdownEditor, insertTemplate()

### Community 55 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "board.ts"
Cohesion: 0.07
Nodes (29): Action, ACTION_NAMES, BoardOptions, DOT_SIZES, DrawAction, EraseAction, EraserMode, HANDLE_REACH (+21 more)

### Community 58 - "spaces.ts"
Cohesion: 0.16
Nodes (24): formatRational(), Eigenvalue, eigenvectors(), EXACT, kernel(), splitRoot(), surdText(), cartesianEquations() (+16 more)

### Community 59 - "odesolve.ts"
Cohesion: 0.07
Nodes (56): EMPTY_SCOPE, Piece, addWave(), arrange(), cauchy(), compiled(), Condition, constantNames() (+48 more)

### Community 60 - "schema/shapes.ts"
Cohesion: 0.08
Nodes (17): @maxgraph/core, tableMetricsFor(), ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape (+9 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "FoldersStore"
Cohesion: 0.08
Nodes (17): cleanFolderName(), Folder, FolderGroup, FoldersStore, groupByFolder(), loadClosedFolders(), sameName(), saveClosedFolders() (+9 more)

### Community 63 - "parseSchema"
Cohesion: 0.13
Nodes (16): schemaSummary(), svg(), SchemaEditorOptions, isRecord(), num(), oneOf(), parseSchema(), point() (+8 more)

### Community 64 - "Preview"
Cohesion: 0.21
Nodes (3): blockKindOf(), hidden(), Preview

### Community 65 - "conics.ts"
Cohesion: 0.18
Nodes (29): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+21 more)

### Community 67 - "nameLatex"
Cohesion: 0.11
Nodes (29): areaFor(), figureText(), linearItem(), classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX (+21 more)

### Community 68 - "smoke-test.mjs"
Cohesion: 0.29
Nodes (4): markdown-it, fakeLlmWorker(), firstVisit(), plainContext

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "selection.ts"
Cohesion: 0.09
Nodes (37): centerOn(), copyStrokes(), cross(), IDENTITY, insideLasso(), keepInside(), LASSO_SHARE, lassoed() (+29 more)

### Community 72 - "solve.ts"
Cohesion: 0.11
Nodes (42): exponentialForm(), fracTex(), fracText(), nearFraction(), piMultiple(), surd(), recognize(), rref() (+34 more)

### Community 73 - "blockMove.ts"
Cohesion: 0.18
Nodes (18): blank(), BlockMove, blockPlace(), closed(), closeIdx(), fenceClosed(), findBlock(), invisible() (+10 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.08
Nodes (59): valueAt(), primitive(), verified(), assumePositive(), atValues(), commonPositive(), Converter, coordinates() (+51 more)

### Community 75 - "Sheet"
Cohesion: 0.08
Nodes (24): ExactComplexScope, Ode, withWorkLimit(), FiniteContext, FormattedResult, Mat, MathNode, chainOf() (+16 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.05
Nodes (59): alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ARROW_NAMES, AT_ICONS (+51 more)

### Community 79 - "plan.ts"
Cohesion: 0.08
Nodes (47): at(), breakEven(), dataLine(), dataRange(), Point, quantity(), tableItems(), textLabel() (+39 more)

### Community 82 - "blockMoveEditor.test.ts"
Cohesion: 0.16
Nodes (17): blockMoved, blockMoves(), blockMoveTransaction(), LineMap, contentHash(), fenceName(), MOVABLE, moveAttrs() (+9 more)

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
Cohesion: 0.10
Nodes (18): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+10 more)

### Community 101 - "graphNote.test.ts"
Cohesion: 0.07
Nodes (32): @codemirror/lang-markdown, @codemirror/state, noIndentedCode, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck() (+24 more)

### Community 102 - "schema/templates.ts"
Cohesion: 0.10
Nodes (18): DEFAULT_EDGE, NodeLook, SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), tableMetrics(), conceptMap (+10 more)

### Community 103 - "createFakeSupabase"
Cohesion: 0.60
Nodes (6): createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 104 - "files.ts"
Cohesion: 0.08
Nodes (34): cache, capability(), ClaudeRuntime, hostDownloads, HostError, inClaudeViewer(), ModelTier, runtime() (+26 more)

### Community 105 - "editor/editor.ts"
Cohesion: 0.05
Nodes (47): description, name, private, type, version, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands (+39 more)

### Community 106 - "fake-supabase.mjs"
Cohesion: 0.25
Nodes (6): @electric-sql/pglite, b64(), CODE, GOOGLE_CODE, ROOT, SUPABASE_URL

### Community 107 - "page.ts"
Cohesion: 0.10
Nodes (24): katex, currentAccount(), sidebarToggle(), SharedNote, body, draw(), isDark(), load() (+16 more)

### Community 108 - "Dove sono le cose"
Cohesion: 0.08
Nodes (55): Dove sono le cose, Glifo – architettura, RFC-4180, fflate, csvDelimiter(), csvToSheet(), field(), italian() (+47 more)

### Community 110 - "supabase.ts"
Cohesion: 0.06
Nodes (58): @supabase/supabase-js, AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), accountError, appUrl(), call() (+50 more)

### Community 113 - "tools.ts"
Cohesion: 0.13
Nodes (14): ExplainStep, ALL_TOOLS, callOf(), checkTool, FormulaCheck, Identities, looseJson(), repairTex() (+6 more)

### Community 116 - "graph/file.ts"
Cohesion: 0.08
Nodes (45): figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsFromFile(), hide(), OPEN, swatchSvg() (+37 more)

### Community 117 - "schedule.ts"
Cohesion: 0.18
Nodes (17): checkGiven(), criticalPaths(), key(), Link, LinkType, listText(), offset(), order() (+9 more)

### Community 118 - "localModels.ts"
Cohesion: 0.17
Nodes (18): @mlc-ai/web-llm, chat(), GlifoError, Gpu, load(), post(), remove(), scope (+10 more)

### Community 119 - "ui/preview.ts"
Cohesion: 0.35
Nodes (7): BlockKind, MoveDir, hydrateSheets(), BLOCK_NAMES, MOVABLE_BLOCKS, moveButtonsHtml(), PATHS

### Community 120 - "Glifo – note per Claude"
Cohesion: 0.22
Nodes (9): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole (+1 more)

### Community 121 - "Field"
Cohesion: 0.13
Nodes (5): eigenvalues(), Field, interpolate(), interpolateFloat(), polynomialIn()

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 124 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 125 - "sql.ts"
Cohesion: 0.17
Nodes (18): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+10 more)

### Community 126 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, Quando lo studente dice di cominciare

### Community 127 - "Glifo"
Cohesion: 0.15
Nodes (13): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Glifo (+5 more)

### Community 128 - "deploy.test.ts"
Cohesion: 0.28
Nodes (4): vite-plugin-pwa, accountOffMessage(), Site, defineFor()

### Community 129 - "Idee per il futuro"
Cohesion: 0.33
Nodes (6): Account: i propri appunti su ogni dispositivo, anche da condividere, Idee per il futuro, In programma, La lavagna: idee in più, Più avanti, Schemi: idee in più

### Community 131 - "h"
Cohesion: 0.07
Nodes (51): SyncStatus, board, helpButton, openGuide(), viewSwitch, openSignedOut(), printButton(), ShareDialogDeps (+43 more)

### Community 132 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 133 - "ExplainEvents"
Cohesion: 0.33
Nodes (3): ExplainEvents, ToolCall, scripted()

### Community 136 - "I modelli e le chiavi API"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), In prova sul ramo `prova` (7 ottobre 2026): Qwen3 nel browser per «Spiegami», Le idee dello studente (5 ottobre 2026)

### Community 137 - "sidePanel.ts"
Cohesion: 0.06
Nodes (45): templateInsertion(), EditorMathContext, expand(), preferredIndex(), SuggestionController, SuggestionItem, cleanKatexError(), editDistance() (+37 more)

### Community 141 - "calcResults.ts"
Cohesion: 0.07
Nodes (32): explainTarget, acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult, calcResults(), CheckWidget (+24 more)

### Community 142 - "schema/preview.ts"
Cohesion: 0.21
Nodes (12): remapLineKeys(), renameGraphScope(), renameScopeKeys(), draw(), drawCached(), drawn, errorHtml(), fill() (+4 more)

## Knowledge Gaps
- **641 isolated node(s):** `Account: i propri appunti su ogni dispositivo, anche da condividere`, `La lavagna: idee in più`, `Schemi: idee in più`, `Moves`, `Writing` (+636 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 890 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **27 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `touchlog.ts`, `Parser`, `main.ts`, `num`, `deploy.test.ts`, `spec.ts`, `arithmetic.ts`, `primitive.ts`, `graph/preview.ts`, `explain.ts`, `sheet.ts`, `h`, `svg.ts`, `calcResults.ts`, `schema/preview.ts`, `Rational`, `toLatex`, `compile`, `numerical.ts`, `markdown.ts`, `SchemaEditor`, `SheetEditor`, `Board`, `distributions.ts`, `MathError`, `assistant.ts`, `graph.ts`, `account/space.ts`, `several.ts`, `gantt.ts`, `view3d.ts`, `linsys.ts`, `logic.ts`, `NotesStore`, `complex.ts`, `namesIn`, `explainPanel.test.ts`, `Pt`, `spreadsheet/editor.ts`, `functions.ts`, `spreadsheet.test.ts`, `parse.ts`, `laplace.ts`, `board/shapes.ts`, `schemaBlocks.ts`, `.render`, `powerseries.ts`, `settings.ts`, `MarkdownEditor`, `finite.ts`, `odesolve.ts`, `schema/shapes.ts`, `Preview`, `conics.ts`, `nameLatex`, `smoke-test.mjs`, `selection.ts`, `solve.ts`, `blockMove.ts`, `symbolic.ts`, `Sheet`, `schema/editor.ts`, `plan.ts`, `blockMoveEditor.test.ts`, `files.ts`, `page.ts`, `supabase.ts`, `graph/file.ts`, `schedule.ts`, `localModels.ts`, `ui/preview.ts`, `PreviewCallbacks`?**
  _High betweenness centrality (0.203) - this node is a cross-community bridge._
- **Why does `vitest` connect `parse.ts` to `touchlog.ts`, `deploy.test.ts`, `num`, `sync.ts`, `spec.ts`, `h`, `explain.ts`, `sheet.ts`, `editor/lists.ts`, `svg.ts`, `sidePanel.ts`, `schema/preview.ts`, `Rational`, `compile`, `markdown.ts`, `distributions.ts`, `store.ts`, `assistant.ts`, `account/space.ts`, `gantt.ts`, `view3d.ts`, `linsys.ts`, `editor.test.ts`, `NotesStore`, `explainPanel.test.ts`, `resize.ts`, `spreadsheet.test.ts`, `board/shapes.ts`, `schemaBlocks.ts`, `.render`, `settings.ts`, `board.ts`, `FoldersStore`, `parseSchema`, `selection.ts`, `schema/editor.ts`, `plan.ts`, `blockMoveEditor.test.ts`, `graphNote.test.ts`, `editor/editor.ts`, `page.ts`, `Dove sono le cose`, `supabase.ts`, `graph/file.ts`, `localModels.ts`, `sql.ts`?**
  _High betweenness centrality (0.112) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `main.ts`, `graph/preview.ts`, `sidePanel.ts`, `SchemaEditor`, `SheetEditor`, `markdown.ts`, `Board`, `graph.ts`, `gantt.ts`, `resize.ts`, `spreadsheet/editor.ts`, `schemaBlocks.ts`, `board.ts`, `FoldersStore`, `schema/editor.ts`, `graphNote.test.ts`, `files.ts`, `page.ts`, `supabase.ts`, `ui/preview.ts`, `PreviewCallbacks`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Are the 218 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `adoptGuestNotes()`) actually correct?**
  _`Dove sono le cose` has 218 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Account: i propri appunti su ogni dispositivo, anche da condividere`, `La lavagna: idee in più`, `Schemi: idee in più` to the rest of the system?**
  _641 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `touchlog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08653061224489796 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04930693069306931 - nodes in this community are weakly interconnected._