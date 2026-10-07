# Graph Report - matherdown  (2026-10-07)

## Corpus Check
- 293 files · ~566,591 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 4781 nodes · 17309 edges · 146 communities (117 shown, 29 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 512 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `73f8a930`
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
- graph.ts
- supabase.ts
- several.ts
- gantt.ts
- view3d.ts
- plan.ts
- editor/editor.ts
- logic.ts
- NotesStore
- complex.ts
- namesIn
- explainPanel.test.ts
- resize.ts
- statsShown.ts
- Pt
- linsys.ts
- study.ts
- functions.ts
- spreadsheet.test.ts
- probability.ts
- toLatex
- laplace.ts
- board/shapes.ts
- schemaBlocks.ts
- parse.ts
- search.ts
- dialogs.ts
- toolbar.ts
- finite.ts
- 20261004091555_note_condivise.sql
- Stroke
- spaces.ts
- odesolve.ts
- schema/shapes.ts
- dependencies
- FoldersStore
- parseSchema
- Preview
- conics.ts
- icons.mjs
- statsGraph.ts
- smoke-test.mjs
- Benvenuto in Glifo
- compilerOptions
- board.ts
- solve.ts
- blockMove.ts
- symbolic.ts
- Sheet
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- chart.ts
- session-start.sh
- .claude/CLAUDE.md
- SlotWidget
- tutorial.mjs
- Abbonamenti
- spiegami-qwen.mjs
- supabase-stub.sql
- account-test.mjs
- Il database degli account (Supabase)
- devDependencies
- Parser
- spell.test.ts
- ExplainEvents
- createFakeSupabase
- toast
- package.json
- fake-supabase.mjs
- logo.ts
- Dove sono le cose
- page.ts
- blockMoveEditor.test.ts
- graph/file.ts
- tools.ts
- localModels.ts
- schema/templates.ts
- Glifo – note per Claude
- Field
- Le spiegazioni, come funzionano
- sidePanel.ts
- Piano per piano
- sql.ts
- Costi
- Glifo
- mathSyntax.ts
- Idee per il futuro
- h
- La lavagna
- schedule.ts
- I modelli e le chiavi API
- SuggestionController
- calcPlugin
- schema/preview.ts
- ui/preview.ts
- PreviewCallbacks
- appleTouch

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 226 edges
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
- `Dove sono le cose` --references--> `fakeLlmWorker()`  [INFERRED]
  ARCHITETTURA.md → scripts/smoke-test.mjs
- `Dove sono le cose` --references--> `WidgetKind`  [INFERRED]
  ARCHITETTURA.md → src/editor/schemaBlocks.ts
- `Dove sono le cose` --references--> `ConicElements`  [INFERRED]
  ARCHITETTURA.md → src/math/conics.ts
- `Dove sono le cose` --references--> `texts()`  [INFERRED]
  ARCHITETTURA.md → tests/boardTouchLog.test.ts
- `Come viene pubblicata` --references--> `dist()`  [INFERRED]
  README.md → src/board/shapes.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (146 total, 29 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.09
Nodes (27): at(), browserStore, clip(), isSaved(), KINDS, LOG_KEY, LOG_MAX_LINES, LogStore (+19 more)

### Community 1 - "Parser"
Cohesion: 0.17
Nodes (3): describe(), MathSyntaxError, Parser

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (104): graphsForFile(), remapGraphLines(), account, ACCOUNT_OFF, active, app, applyAccountChange(), applySpellcheck() (+96 more)

### Community 3 - "num"
Cohesion: 0.12
Nodes (72): withoutAbs(), exp(), hyperbolicToExp(), inverseRational(), linearIn(), sqrtEx(), termTransform(), polyEx() (+64 more)

### Community 4 - "sync.ts"
Cohesion: 0.05
Nodes (38): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+30 more)

### Community 5 - "spec.ts"
Cohesion: 0.06
Nodes (96): conicItems(), isConicLine(), quadricEquation(), isComplexLine(), constantIntegrand(), depth(), inequalityMargin(), integralRegion (+88 more)

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
Cohesion: 0.12
Nodes (33): allNames(), ChatFn, checkSteps(), engineHints(), explain(), EXPLAIN_TONES, ExplainError, ExplainKind (+25 more)

### Community 10 - "sheet.ts"
Cohesion: 0.05
Nodes (43): ComplexDefinitions, complex, ComplexFunction, ComplexScope, formatComplex(), formatGauss(), formatList(), join() (+35 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.08
Nodes (66): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+58 more)

### Community 12 - "svg.ts"
Cohesion: 0.08
Nodes (63): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), staticGraphSvg(), chooseWindow(), chooseY(), clipLines() (+55 more)

### Community 13 - "spreadsheet/editor.ts"
Cohesion: 0.12
Nodes (30): currentCall(), Editing, MenuEntry, Move, PATHS, SheetEditorOptions, Snapshot, adjustFormula() (+22 more)

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
Cohesion: 0.04
Nodes (104): surface(), areaFor(), complexValue(), constantValue(), define(), argumentOrder(), compileLineIntegral(), compileSurfaceIntegral() (+96 more)

### Community 18 - "numerical.ts"
Cohesion: 0.12
Nodes (45): Funzionalità, bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial() (+37 more)

### Community 19 - "markdown.ts"
Cohesion: 0.09
Nodes (33): Explanation, valueNode(), explanationMarkdown(), MathRegion, checkHtml(), checkTitle(), cache, escapeHtml() (+25 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (42): b, bigops, c, calculus, fn, fr, fractions, functions (+34 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (22): Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download(), fetchDictionary() (+14 more)

### Community 22 - "Board"
Cohesion: 0.09
Nodes (5): Board, clampZoom(), loadPrefs(), validView(), highlightName()

### Community 23 - "distributions.ts"
Cohesion: 0.06
Nodes (63): addExp(), choose(), continuousQuantile(), discreteQuantile(), Distribution, exactIntervalProbability(), factorialBig(), FAMILIES (+55 more)

### Community 24 - "store.ts"
Cohesion: 0.05
Nodes (19): fake-indexeddb, BoardOptions, BoardBackend, BoardChange, BoardData, BoardStore, done(), fromRecord() (+11 more)

### Community 25 - "MathError"
Cohesion: 0.10
Nodes (64): compileApply(), MathError, nameLabel(), UndefinedName, formatNumber(), formatRational(), angleBetween(), asMatrix() (+56 more)

### Community 26 - "assistant.ts"
Cohesion: 0.13
Nodes (22): @anthropic-ai/sdk, AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible() (+14 more)

### Community 27 - "graph.ts"
Cohesion: 0.11
Nodes (32): AT_X, cellHtml(), cellText(), COMPASS, createEdgeCell(), createGraph(), drawSchema(), edgeLook() (+24 more)

### Community 28 - "supabase.ts"
Cohesion: 0.13
Nodes (29): @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), emailLinkToken(), ensureSessionOf(), loadClient() (+21 more)

### Community 29 - "several.ts"
Cohesion: 0.09
Nodes (47): criticalLine(), isSeveralLine(), named(), severalItems(), FormatOptions, shown(), size(), exText() (+39 more)

### Community 30 - "gantt.ts"
Cohesion: 0.08
Nodes (47): amount(), barColor(), crossings(), dateText(), dayOf(), fitText(), GanttOptions, ganttSvg() (+39 more)

### Community 31 - "view3d.ts"
Cohesion: 0.06
Nodes (85): addMesh(), addTet(), affinePlane(), Axis, Box, centroid(), clipBy(), clipPolygon() (+77 more)

### Community 32 - "plan.ts"
Cohesion: 0.16
Nodes (17): cellText(), columnRole(), columnsOf(), durationUnit(), isNumber(), isPlanRange(), MAX_ACTIVITIES, plain() (+9 more)

### Community 33 - "editor/editor.ts"
Cohesion: 0.05
Nodes (69): @codemirror/language, @codemirror/state, @codemirror/view, explainTarget, acceptCalcResult(), CalcCheck, calcOutcomes(), CalcResult (+61 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "NotesStore"
Cohesion: 0.06
Nodes (47): accountSpace(), adoptGuestNotes(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf(), setCurrentAccount() (+39 more)

### Community 36 - "complex.ts"
Cohesion: 0.06
Nodes (64): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexValue(), isInequality() (+56 more)

### Community 37 - "namesIn"
Cohesion: 0.13
Nodes (37): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+29 more)

### Community 38 - "explainPanel.test.ts"
Cohesion: 0.13
Nodes (13): LocalAbort, localErrorMessage(), localLlm, Pending, WorkerLike, ChatMessage, ChatOptions, LoadProgress (+5 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "statsShown.ts"
Cohesion: 0.19
Nodes (29): Lin, check(), correlation(), count(), covariance(), Data, dataStatistic(), deviation() (+21 more)

### Community 41 - "Pt"
Cohesion: 0.10
Nodes (16): coalesced(), EraseAction, Finger, LassoAction, MoveAction, PanAction, penErases(), PinchAction (+8 more)

### Community 42 - "linsys.ts"
Cohesion: 0.16
Nodes (33): choices(), minorsGcd(), ONE, parametricRows(), PARAMS, polyDeterminant(), substitute(), ZERO (+25 more)

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
Nodes (24): End, CompileOptions, ExactScope, RelOp, ALL, complement(), distributionOf(), endAt() (+16 more)

### Community 47 - "toLatex"
Cohesion: 0.04
Nodes (77): vite-plugin-pwa, vitest, isNumericalLine(), numericalItems(), GraphItem, parseGraph(), names(), STUDY_GRAPH (+69 more)

### Community 48 - "laplace.ts"
Cohesion: 0.12
Nodes (39): factoredPolynomial(), absOf(), atIntegers(), boundsOf(), close(), definite(), fourierProblem, fourierShown() (+31 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (36): DrawAction, adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners() (+28 more)

### Community 50 - "schemaBlocks.ts"
Cohesion: 0.12
Nodes (17): toggleLinePrefix(), besideSchema(), BlockWidget, findWidgetBlocks(), guardBlocks(), KINDS, schemaBlockRanges(), schemaBlocks() (+9 more)

### Community 51 - "parse.ts"
Cohesion: 0.06
Nodes (38): hasWord(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, differentialInFraction() (+30 more)

### Community 52 - "search.ts"
Cohesion: 0.16
Nodes (25): SuggestionItem, editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase() (+17 more)

### Community 53 - "dialogs.ts"
Cohesion: 0.11
Nodes (23): ExplainTone, ACCOUNT_SETTINGS, accountSettings(), AI_MODELS, DEFAULT_SETTINGS, loadSettings(), saveSettings(), Settings (+15 more)

### Community 54 - "toolbar.ts"
Cohesion: 0.09
Nodes (20): closeMathBlockOnEnter(), EditorCallbacks, MarkdownEditor, tabOutOfMath(), insertBlock(), insertTemplate(), wrapSelection(), Action (+12 more)

### Community 55 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "Stroke"
Cohesion: 0.14
Nodes (14): BOARD_PALETTES, BoardTheme, inkName(), mid(), outlineSvg(), PEN_SIZE, shapeSvg(), strokeOptions() (+6 more)

### Community 58 - "spaces.ts"
Cohesion: 0.10
Nodes (27): decimalSeparator(), Digits, fromNumber(), fromRational(), SUPERSCRIPT, writeDigits(), Eigenvalue, eigenvectors() (+19 more)

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
Cohesion: 0.16
Nodes (4): cleanFolderName(), FoldersStore, sameName(), names()

### Community 63 - "parseSchema"
Cohesion: 0.13
Nodes (16): schemaSummary(), svg(), SchemaEditorOptions, isRecord(), num(), oneOf(), parseSchema(), point() (+8 more)

### Community 64 - "Preview"
Cohesion: 0.21
Nodes (3): blockKindOf(), hidden(), Preview

### Community 65 - "conics.ts"
Cohesion: 0.18
Nodes (29): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+21 more)

### Community 67 - "statsGraph.ts"
Cohesion: 0.13
Nodes (24): FieldContext, fourierItems(), isFourierLine(), isTestLine(), number(), testItems(), classes(), dataOf() (+16 more)

### Community 68 - "smoke-test.mjs"
Cohesion: 0.29
Nodes (4): markdown-it, fakeLlmWorker(), firstVisit(), plainContext

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "board.ts"
Cohesion: 0.06
Nodes (61): Action, ACTION_NAMES, DOT_SIZES, EraserMode, HANDLE_REACH, ICON, MODE_NAMES, Prefs (+53 more)

### Community 72 - "solve.ts"
Cohesion: 0.14
Nodes (34): rref(), gcd(), isStandardUnknown(), linearSystem(), matrixEquation(), matrixSystem(), parametricSystem(), rankAt() (+26 more)

### Community 73 - "blockMove.ts"
Cohesion: 0.18
Nodes (18): blank(), BlockMove, blockPlace(), closed(), closeIdx(), fenceClosed(), findBlock(), invisible() (+10 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.08
Nodes (59): valueAt(), primitive(), verified(), assumePositive(), atValues(), commonPositive(), Converter, coordinates() (+51 more)

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
Cohesion: 0.05
Nodes (59): alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ARROW_NAMES, AT_ICONS (+51 more)

### Community 79 - "chart.ts"
Cohesion: 0.13
Nodes (30): at(), breakEven(), dataLine(), dataRange(), Point, quantity(), tableItems(), textLabel() (+22 more)

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

### Community 101 - "spell.test.ts"
Cohesion: 0.08
Nodes (24): @codemirror/commands, @codemirror/lang-markdown, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close() (+16 more)

### Community 102 - "ExplainEvents"
Cohesion: 0.33
Nodes (3): ExplainEvents, ToolCall, scripted()

### Community 103 - "createFakeSupabase"
Cohesion: 0.60
Nodes (6): createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 104 - "toast"
Cohesion: 0.09
Nodes (36): cache, capability(), ClaudeRuntime, hostDownloads, HostError, inClaudeViewer(), ModelTier, runtime() (+28 more)

### Community 105 - "package.json"
Cohesion: 0.07
Nodes (27): description, name, private, scripts, build, dev, preview, test (+19 more)

### Community 106 - "fake-supabase.mjs"
Cohesion: 0.25
Nodes (6): @electric-sql/pglite, b64(), CODE, GOOGLE_CODE, ROOT, SUPABASE_URL

### Community 107 - "logo.ts"
Cohesion: 0.33
Nodes (6): sidebarToggle(), BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark()

### Community 108 - "Dove sono le cose"
Cohesion: 0.08
Nodes (55): Dove sono le cose, Glifo – architettura, RFC-4180, fflate, csvDelimiter(), csvToSheet(), field(), italian() (+47 more)

### Community 110 - "page.ts"
Cohesion: 0.06
Nodes (50): katex, AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), currentAccount(), PullResult, openShareDialog() (+42 more)

### Community 113 - "blockMoveEditor.test.ts"
Cohesion: 0.16
Nodes (17): blockMoved, blockMoves(), blockMoveTransaction(), LineMap, contentHash(), fenceName(), MOVABLE, moveAttrs() (+9 more)

### Community 116 - "graph/file.ts"
Cohesion: 0.08
Nodes (45): figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsFromFile(), hide(), OPEN, swatchSvg() (+37 more)

### Community 117 - "tools.ts"
Cohesion: 0.14
Nodes (15): solutionsOf(), ALL_TOOLS, callOf(), checkFormula(), checkTool, Identities, looseJson(), nameLike() (+7 more)

### Community 118 - "localModels.ts"
Cohesion: 0.17
Nodes (18): @mlc-ai/web-llm, chat(), GlifoError, Gpu, load(), post(), remove(), scope (+10 more)

### Community 119 - "schema/templates.ts"
Cohesion: 0.10
Nodes (18): DEFAULT_EDGE, NodeLook, SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), tableMetrics(), conceptMap (+10 more)

### Community 120 - "Glifo – note per Claude"
Cohesion: 0.22
Nodes (9): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole (+1 more)

### Community 121 - "Field"
Cohesion: 0.14
Nodes (5): eigenvalues(), Field, interpolate(), interpolateFloat(), polynomialIn()

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "sidePanel.ts"
Cohesion: 0.13
Nodes (16): cleanKatexError(), isConfidentAnswer(), CATEGORIES, symbolsInCategory(), cardPreviewTex(), formPreviewTex(), ParsedTemplate, parseTemplate() (+8 more)

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

### Community 128 - "mathSyntax.ts"
Cohesion: 0.18
Nodes (16): @lezer/highlight, @lezer/markdown, lineDepth(), mathDelimTag, mathMarkdown, mathTag, parseBlockMath(), analyzeBlockOpen() (+8 more)

### Community 129 - "Idee per il futuro"
Cohesion: 0.33
Nodes (6): Account: i propri appunti su ogni dispositivo, anche da condividere, Idee per il futuro, In programma, La lavagna: idee in più, Più avanti, Schemi: idee in più

### Community 131 - "h"
Cohesion: 0.06
Nodes (43): SyncStatus, helpButton, openGuide(), saveClosedFolders(), AccountButton, confirmAccountDeletion(), messageOf(), openAccountDialog() (+35 more)

### Community 132 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 133 - "schedule.ts"
Cohesion: 0.18
Nodes (17): checkGiven(), criticalPaths(), key(), Link, LinkType, listText(), offset(), order() (+9 more)

### Community 136 - "I modelli e le chiavi API"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), In prova sul ramo `prova` (7 ottobre 2026): Qwen3 nel browser per «Spiegami», Le idee dello studente (5 ottobre 2026)

### Community 137 - "SuggestionController"
Cohesion: 0.21
Nodes (3): expand(), preferredIndex(), SuggestionController

### Community 141 - "calcPlugin"
Cohesion: 0.19
Nodes (3): calcPlugin, CheckWidget, ResultWidget

### Community 142 - "schema/preview.ts"
Cohesion: 0.21
Nodes (12): remapLineKeys(), renameGraphScope(), renameScopeKeys(), draw(), drawCached(), drawn, errorHtml(), fill() (+4 more)

### Community 143 - "ui/preview.ts"
Cohesion: 0.35
Nodes (7): BlockKind, MoveDir, hydrateSheets(), BLOCK_NAMES, MOVABLE_BLOCKS, moveButtonsHtml(), PATHS

## Knowledge Gaps
- **641 isolated node(s):** `Condividere una nota con un link`, `Provarlo sul tuo computer`, `Assistente AI`, `Spiegami (in prova)`, `Compatibilità con VS Code` (+636 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 890 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **29 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `touchlog.ts`, `Parser`, `main.ts`, `num`, `h`, `spec.ts`, `schedule.ts`, `arithmetic.ts`, `graph/preview.ts`, `explain.ts`, `primitive.ts`, `sheet.ts`, `svg.ts`, `spreadsheet/editor.ts`, `schema/preview.ts`, `SchemaEditor`, `SheetEditor`, `compile`, `numerical.ts`, `markdown.ts`, `ui/preview.ts`, `PreviewCallbacks`, `Board`, `distributions.ts`, `store.ts`, `MathError`, `assistant.ts`, `graph.ts`, `supabase.ts`, `several.ts`, `gantt.ts`, `view3d.ts`, `plan.ts`, `editor/editor.ts`, `logic.ts`, `NotesStore`, `complex.ts`, `namesIn`, `explainPanel.test.ts`, `Pt`, `linsys.ts`, `functions.ts`, `spreadsheet.test.ts`, `toLatex`, `laplace.ts`, `board/shapes.ts`, `schemaBlocks.ts`, `parse.ts`, `dialogs.ts`, `toolbar.ts`, `finite.ts`, `Stroke`, `odesolve.ts`, `schema/shapes.ts`, `Preview`, `conics.ts`, `statsGraph.ts`, `smoke-test.mjs`, `board.ts`, `solve.ts`, `blockMove.ts`, `symbolic.ts`, `Sheet`, `schema/editor.ts`, `chart.ts`, `toast`, `logo.ts`, `blockMoveEditor.test.ts`, `graph/file.ts`, `tools.ts`, `localModels.ts`?**
  _High betweenness centrality (0.185) - this node is a cross-community bridge._
- **Why does `vitest` connect `toLatex` to `touchlog.ts`, `main.ts`, `num`, `sync.ts`, `h`, `explain.ts`, `sheet.ts`, `editor/lists.ts`, `svg.ts`, `schema/preview.ts`, `Rational`, `appleTouch`, `compile`, `markdown.ts`, `distributions.ts`, `store.ts`, `assistant.ts`, `supabase.ts`, `gantt.ts`, `view3d.ts`, `plan.ts`, `editor/editor.ts`, `NotesStore`, `explainPanel.test.ts`, `resize.ts`, `linsys.ts`, `spreadsheet.test.ts`, `board/shapes.ts`, `schemaBlocks.ts`, `parse.ts`, `search.ts`, `dialogs.ts`, `toolbar.ts`, `Stroke`, `parseSchema`, `board.ts`, `schema/editor.ts`, `chart.ts`, `spell.test.ts`, `package.json`, `logo.ts`, `Dove sono le cose`, `page.ts`, `blockMoveEditor.test.ts`, `graph/file.ts`, `localModels.ts`, `sidePanel.ts`, `sql.ts`?**
  _High betweenness centrality (0.108) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `main.ts`, `graph/preview.ts`, `spreadsheet/editor.ts`, `SchemaEditor`, `ui/preview.ts`, `SheetEditor`, `PreviewCallbacks`, `markdown.ts`, `Board`, `graph.ts`, `gantt.ts`, `resize.ts`, `dialogs.ts`, `toolbar.ts`, `board.ts`, `schema/editor.ts`, `spell.test.ts`, `toast`, `logo.ts`, `page.ts`, `sidePanel.ts`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **Are the 225 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `adoptGuestNotes()`) actually correct?**
  _`Dove sono le cose` has 225 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Condividere una nota con un link`, `Provarlo sul tuo computer`, `Assistente AI` to the rest of the system?**
  _641 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `touchlog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08653061224489796 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.041286397218600605 - nodes in this community are weakly interconnected._