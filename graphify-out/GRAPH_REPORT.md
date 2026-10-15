# Graph Report - Glifo  (2026-10-15)

## Corpus Check
- 347 files · ~730,901 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5593 nodes · 20412 edges · 156 communities (118 shown, 38 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 692 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `898e2ea3`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- i18n.ts
- parseGraph
- main.ts
- MathError
- supabase.ts
- spec.ts
- inference.ts
- mul
- graph/preview.ts
- schemaBlocks.ts
- probability.ts
- explainSubjects.ts
- svg.ts
- sheet.ts
- SchemaEditor
- plan.ts
- SheetEditor
- parse.ts
- numerical.ts
- arithmetic.ts
- index.ts
- engine.ts
- schema/editor.ts
- chart.ts
- store.ts
- Parser
- board.ts
- gauss.ts
- devDependencies
- several.ts
- gantt.ts
- study.ts
- Rational
- assistant.ts
- logic.ts
- solve.ts
- complex.ts
- powerseries.ts
- translations.test.ts
- resize.ts
- view3d.ts
- Board
- localModels.ts
- schemaEn.test.ts
- functions.ts
- linear.ts
- prova-lettori.py
- functionWord
- conics.ts
- board/shapes.ts
- .paintVertexShape
- sidePanel.ts
- linsys.ts
- graph.ts
- FoldersStore
- page.ts
- 20261004091555_note_condivise.sql
- editor/lists.ts
- database.ts
- finite.ts
- ui/preview.ts
- dependencies
- Welcome to Glifo
- spreadsheet/editor.ts
- spreadsheetEn.test.ts
- num
- client.ts
- laplace.ts
- aiPanel.ts
- Benvenuto in Glifo
- compilerOptions
- Glifo
- L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota
- toLatex
- symbolic.ts
- Field
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- SuggestionController
- aiPanel.test.ts
- session-start.sh
- .claude/CLAUDE.md
- Il database degli account (Supabase)
- tutorial.mjs
- Abbonamenti
- topics.ts
- BoardStore
- supabase-stub.sql
- account-test.mjs
- files.ts
- captcha.ts
- noteWordsMath.test.ts
- spellcheck
- symbolsEn.test.ts
- toast
- graph/file.ts
- PlanView
- explainPanel.ts
- spellcheck.ts
- planPreview.ts
- template.ts
- smoke-test.mjs
- schema/templates.ts
- dictionaries.ts
- src/relocation.ts
- scripts
- SpellClient
- editor/editor.ts
- strokes.ts
- Sheet
- Dove sono le cose
- pick
- Stroke
- 20261008130026_commenti.sql
- xlsx.ts
- feedback.ts
- ink.ts
- Glifo – note per Claude
- vitest
- complex.test.ts
- vite
- Piano per piano
- I modelli e le chiavi API

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 321 edges
2. `MathError` - 151 edges
3. `Sheet` - 148 edges
4. `num()` - 145 edges
5. `h()` - 136 edges
6. `MathNode` - 131 edges
7. `mul()` - 124 edges
8. `texts` - 123 edges
9. `Board` - 118 edges
10. `compile()` - 116 edges

## Surprising Connections (you probably didn't know these)
- `Dove sono le cose` --references--> `fakeLlmWorker()`  [INFERRED]
  ARCHITETTURA.md → scripts/smoke-test.mjs
- `Dove sono le cose` --references--> `tutorialModel()`  [INFERRED]
  ARCHITETTURA.md → scripts/tutorial.mjs
- `Il controllo anti-robot (CAPTCHA, ottobre 2026)` --references--> `captchaToken()`  [INFERRED]
  supabase/README.md → src/account/captcha.ts
- `Come viene pubblicata` --references--> `dist()`  [INFERRED]
  README.md → src/board/shapes.ts
- `Trasloco: il sito su Cloudflare, con un dominio tutto di Glifo` --references--> `dist()`  [INFERRED]
  ROADMAP.md → src/board/shapes.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (156 total, 38 thin omitted)

### Community 0 - "i18n.ts"
Cohesion: 0.03
Nodes (125): SyncStatus, DownloadedModel, Gpu, gpuF16(), MODEL_LICENSES, ModelGroup, modelVariant, AI_SERVICES (+117 more)

### Community 1 - "parseGraph"
Cohesion: 0.09
Nodes (22): formulaGraph(), GraphItem, parseGraph(), light, text(), text(), light, pts (+14 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (108): account, ACCOUNT_OFF, accountButton, active, aiShown(), aiToggle, aiWork, app (+100 more)

### Community 3 - "MathError"
Cohesion: 0.04
Nodes (117): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+109 more)

### Community 4 - "supabase.ts"
Cohesion: 0.04
Nodes (66): @supabase/supabase-js, AccountSync, withLock(), accountDataFile(), Account, accountError, appUrl(), call() (+58 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (104): conicItems(), isConicLine(), quadricEquation(), isFourierLine(), onlyComplex(), isTestLine(), constantIntegrand(), depth() (+96 more)

### Community 6 - "inference.ts"
Cohesion: 0.07
Nodes (48): number(), T, testItems(), Range, classes(), dataOf(), distributionExtent(), distributionLabel() (+40 more)

### Community 7 - "mul"
Cohesion: 0.16
Nodes (66): atIntegers(), polyEx(), similarSolution(), algebraic(), bigGcd(), byParts(), candidates(), canon() (+58 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (45): FIGURE_PALETTE, addLabel(), boxes, cameras, complexCoord(), coord(), coordinates(), drawings (+37 more)

### Community 9 - "schemaBlocks.ts"
Cohesion: 0.06
Nodes (59): blockMoved, blockMoves(), blockMoveTransaction(), LineMap, BlockWidget, findWidgetBlocks(), guardBlocks(), KINDS (+51 more)

### Community 10 - "probability.ts"
Cohesion: 0.06
Nodes (61): addExp(), choose(), continuousQuantile(), decimals(), discreteQuantile(), End, exactIntervalProbability(), expSumValue() (+53 more)

### Community 11 - "explainSubjects.ts"
Cohesion: 0.09
Nodes (39): @codemirror/language, @lezer/common, explainTarget, schemaTitle(), formulasUntil(), sheetBefore(), hasCalculation(), insertAfterBlock() (+31 more)

### Community 12 - "svg.ts"
Cohesion: 0.08
Nodes (57): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), dataWindow(), decimalText() (+49 more)

### Community 13 - "sheet.ts"
Cohesion: 0.07
Nodes (62): EMPTY_COMPLEX_SCOPE, OdeFunction, EXACT, FLOAT, Lin, Mat, BRACKETS, CHECK_VALUES (+54 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.11
Nodes (4): isLanes(), SchemaEditor, withLaneContents(), serializeSchema()

### Community 15 - "plan.ts"
Cohesion: 0.14
Nodes (19): NumberStyle, columnRole(), columnsOf(), durationUnit(), isNumber(), isPlanRange(), MAX_ACTIVITIES, plain() (+11 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (9): functionLabel(), SheetEditor, englishTyping(), serializeSheet(), sheetSize(), CellRange, clearRange(), cloneSheet() (+1 more)

### Community 17 - "parse.ts"
Cohesion: 0.04
Nodes (61): Line, typedSliderValue(), errorMessage(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS (+53 more)

### Community 18 - "numerical.ts"
Cohesion: 0.12
Nodes (32): cholesky(), condition(), exactPolynomial(), floatPolynomial(), interpolating(), interpolation(), inverseOf(), iterative() (+24 more)

### Community 19 - "arithmetic.ts"
Cohesion: 0.11
Nodes (39): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+31 more)

### Community 20 - "index.ts"
Cohesion: 0.06
Nodes (45): Text, b, bigops, c, calculus, fn, fr, fractions (+37 more)

### Community 21 - "engine.ts"
Cohesion: 0.17
Nodes (9): @farscrl/hunspell-wasm, capitalize(), COMMON_FIXES, ELISIONS, inGlossary(), lower(), SpellEngine, GLOSSARY (+1 more)

### Community 22 - "schema/editor.ts"
Cohesion: 0.05
Nodes (59): alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ALIGN_NAMES, ARROW_NAMES (+51 more)

### Community 23 - "chart.ts"
Cohesion: 0.12
Nodes (31): at(), breakEven(), Point, quantity(), T, tableItems(), textLabel(), chartData (+23 more)

### Community 24 - "store.ts"
Cohesion: 0.09
Nodes (14): BoardBackend, done(), fromRecord(), IdbBoards, ofNote(), openBoardDatabase(), openDefault(), recordBytes() (+6 more)

### Community 25 - "Parser"
Cohesion: 0.16
Nodes (4): numericPartials(), derivativeOperator(), describe(), Parser

### Community 26 - "board.ts"
Cohesion: 0.07
Nodes (47): Action, coalesced(), DOT_SIZES, EraserMode, Finger, HANDLE_REACH, ICON, LassoAction (+39 more)

### Community 27 - "gauss.ts"
Cohesion: 0.12
Nodes (28): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexLine(), isComplexValue() (+20 more)

### Community 28 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

### Community 29 - "several.ts"
Cohesion: 0.14
Nodes (37): at(), bounded(), Candidate, candidates(), compiled(), constraintsOf(), COORDS, coordShown() (+29 more)

### Community 30 - "gantt.ts"
Cohesion: 0.06
Nodes (71): amount(), barColor(), crossings(), dateText(), dayMonth(), dayOf(), fitText(), GanttOptions (+63 more)

### Community 31 - "study.ts"
Cohesion: 0.14
Nodes (36): Asymptote, asymptoteText(), compiled(), cutsOf(), defined(), domainOf(), exact(), extremumText() (+28 more)

### Community 32 - "Rational"
Cohesion: 0.10
Nodes (24): primitivePart(), expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactFunction, ExactRandom (+16 more)

### Community 33 - "assistant.ts"
Cohesion: 0.09
Nodes (29): @anthropic-ai/sdk, AiAnswer, AiError, AiSettings, answerSchema(), askAi(), askCompatible(), askThroughHost() (+21 more)

### Community 34 - "logic.ts"
Cohesion: 0.11
Nodes (30): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+22 more)

### Community 35 - "solve.ts"
Cohesion: 0.08
Nodes (53): exponentialForm(), fracTex(), fracText(), nearFraction(), piMultiple(), surd(), decimalSeparator(), Digits (+45 more)

### Community 36 - "complex.ts"
Cohesion: 0.08
Nodes (41): add(), arg(), asin(), atan(), compileFunction(), ComplexCompiled, ComplexVars, conjugateOf() (+33 more)

### Community 37 - "powerseries.ts"
Cohesion: 0.10
Nodes (28): close(), Definite, definiteIntegral(), exValue(), samples(), EMPTY_SCOPE, Piece, limit() (+20 more)

### Community 38 - "translations.test.ts"
Cohesion: 0.17
Nodes (18): AstNode, calleeName(), check(), checkPair(), visit(), children(), entryPairs(), files (+10 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (24): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+16 more)

### Community 40 - "view3d.ts"
Cohesion: 0.06
Nodes (86): addMesh(), addTet(), affinePlane(), Axis, Box, centroid(), clipBy(), clipPolygon() (+78 more)

### Community 41 - "Board"
Cohesion: 0.10
Nodes (8): Board, clampZoom(), loadPrefs(), pressureOf(), sizeChoice(), validView(), SizeChoice, Pt

### Community 42 - "localModels.ts"
Cohesion: 0.06
Nodes (37): @mlc-ai/web-llm, vite-plugin-pwa, chat(), GlifoError, Gpu, load(), post(), remove() (+29 more)

### Community 43 - "schemaEn.test.ts"
Cohesion: 0.06
Nodes (48): @electric-sql/pglite, markdownForFile(), findSchemaBlocks(), schemaBlockAtLine(), openSchemaEditor(), SchemaEditorOptions, base64(), hide() (+40 more)

### Community 44 - "functions.ts"
Cohesion: 0.06
Nodes (71): EMPTY, evaluateSheet(), number(), SheetEvaluator, T, addFormat(), decimalsOf(), divFormat() (+63 more)

### Community 45 - "linear.ts"
Cohesion: 0.11
Nodes (59): angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, dataOf(), degreesText() (+51 more)

### Community 46 - "prova-lettori.py"
Cohesion: 0.12
Nodes (4): byte_table(), read(), Reader, tidy()

### Community 47 - "functionWord"
Cohesion: 0.29
Nodes (17): bisection(), derivative(), fixedPoint(), intervalOf(), k(), newton(), NormKind, numberShown() (+9 more)

### Community 48 - "conics.ts"
Cohesion: 0.17
Nodes (30): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+22 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (36): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+28 more)

### Community 50 - ".paintVertexShape"
Cohesion: 0.12
Nodes (6): DotShape, IdentifyingRelationShape, LanesShape, NoteShape, TableShape, WeakEntityShape

### Community 51 - "sidePanel.ts"
Cohesion: 0.13
Nodes (15): AiResult, aiSettingsOf(), localizeTex(), cleanKatexError(), isConfidentAnswer(), symbolsInCategory(), SymbolForm, AiState (+7 more)

### Community 52 - "linsys.ts"
Cohesion: 0.08
Nodes (69): factorsOf(), formatRational(), eigenvalues(), evaluateLinear(), interpolateFloat(), surdText(), choices(), gcd() (+61 more)

### Community 53 - "graph.ts"
Cohesion: 0.06
Nodes (44): @maxgraph/core, fieldInput(), AT_X, cellHtml(), cellText(), COMPASS, createEdgeCell(), createGraph() (+36 more)

### Community 54 - "FoldersStore"
Cohesion: 0.06
Nodes (22): Deletion, DeletionLog, cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder() (+14 more)

### Community 55 - "page.ts"
Cohesion: 0.07
Nodes (44): board, openShareDialog(), changeAccess(), changeCopy(), copy(), refreshChanged(), render(), run() (+36 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "editor/lists.ts"
Cohesion: 0.05
Nodes (86): insertBlock(), toggleLinePrefix(), wrapSelection(), applyListStyle(), continueList(), endEmptyItem(), followingSiblings(), indentListItems() (+78 more)

### Community 58 - "database.ts"
Cohesion: 0.23
Nodes (6): createDatabase(), createUser(), databaseTests(), feedbackTests(), migrations, shareTests()

### Community 59 - "finite.ts"
Cohesion: 0.17
Nodes (28): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+20 more)

### Community 60 - "ui/preview.ts"
Cohesion: 0.07
Nodes (30): GraphLabels, BlockKind, Look, Theme, draw(), drawCached(), drawn, errorHtml() (+22 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "Welcome to Glifo"
Cohesion: 0.20
Nodes (9): A few examples, Calculations and graphs, For programming too, Handy shortcuts, How to write formulas, Lists, Spell check, Try it now (+1 more)

### Community 63 - "spreadsheet/editor.ts"
Cohesion: 0.08
Nodes (52): currentCall(), Editing, MenuEntry, Move, PATHS, SheetEditorOptions, Snapshot, T (+44 more)

### Community 64 - "spreadsheetEn.test.ts"
Cohesion: 0.08
Nodes (61): formulaText(), readSheet(), tableTitle(), tableTopic(), valueText(), sheetSummary(), openSheetEditor(), hide() (+53 more)

### Community 65 - "num"
Cohesion: 0.08
Nodes (82): sumShown(), linearIn(), addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled() (+74 more)

### Community 66 - "client.ts"
Cohesion: 0.20
Nodes (9): Backend, pageBackend(), SpellClientOptions, workerBackend(), WorkerUnavailable, SpellLanguage, createSpellService(), SpellRequest (+1 more)

### Community 67 - "laplace.ts"
Cohesion: 0.09
Nodes (57): factoredPolynomial(), numShown(), polynomialOf(), polyShown(), ruffiniShown(), absOf(), boundsOf(), close() (+49 more)

### Community 68 - "aiPanel.ts"
Cohesion: 0.06
Nodes (37): katex, definedName(), formulaTopic(), graphTopic(), studyOf(), acceptCalcResult(), CalcCheck, calcOutcomes() (+29 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "Glifo"
Cohesion: 0.12
Nodes (16): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Domande frequenti e commenti (+8 more)

### Community 72 - "L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota"
Cohesion: 0.13
Nodes (13): 3. Da una foto alla nota, 4. Dettare: la voce diventa testo nella nota, 5. Registrare le lezioni e trascriverle, Da sistemare con il primo punto che tocca l'AI, Fonti (controllate il 14 ottobre 2026), In che ordine, L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota, Attivato (+5 more)

### Community 73 - "toLatex"
Cohesion: 0.07
Nodes (55): T, FieldContext, fourierItems(), T, isNumericalLine(), numericalItems(), criticalLine(), named() (+47 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.06
Nodes (79): primitive(), verified(), atValues(), cancelLinear(), combine(), commonMonomial(), commonPositive(), Converter (+71 more)

### Community 75 - "Field"
Cohesion: 0.12
Nodes (5): characteristicPolynomial(), Field, formatPolynomial(), interpolate(), polynomialIn()

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Errore o imprevisto → nel dettaglio, 3. Serve una decisione → frasi complete, 4. Fine del compito → un solo riepilogo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 79 - "aiPanel.test.ts"
Cohesion: 0.13
Nodes (11): AI_NEWS_TITLE, AI_WORKING_TITLE, aiActivity, T, fakeModel(), FLOW, GRAPH_FIXED, GRAPH_STEPS (+3 more)

### Community 82 - "Il database degli account (Supabase)"
Cohesion: 0.12
Nodes (16): Accesso con Google, Cambiare il database, Commenti di chi prova Glifo, Cosa c'è, Eliminare l'account, Il controllo anti-robot (CAPTCHA, ottobre 2026), Il database degli account (Supabase), Il progetto (+8 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.06
Nodes (20): playwright-core, graphFile, names, namesFile, root, PNG_ICONS, AFTER_MOVE, ids (+12 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.07
Nodes (27): Abbonamenti, Com'è andata la discussione, Come si costruisce (per dopo), Come si decide cosa far pagare, Cosa fare, in ordine, Cosa succede dietro, Cosa vede chi studia, Da approfondire (+19 more)

### Community 91 - "topics.ts"
Cohesion: 0.15
Nodes (23): ATTRIBUTES, cut(), ER_SHAPES, fieldText(), fitLines(), flowOrder(), FREE_NAMES, laneOf() (+15 more)

### Community 92 - "BoardStore"
Cohesion: 0.08
Nodes (15): BoardStore, MemoryBoards, applyAccountChange(), backup(), BackupNote, backupNotes(), restoreBackup(), RestoreBoards (+7 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.10
Nodes (17): device(), login(), newContext, waitFor(), b64(), CAPTCHA_TOKEN, CODE, createFakeSupabase() (+9 more)

### Community 97 - "files.ts"
Cohesion: 0.24
Nodes (14): inClaudeViewer(), canWriteFilesDirectly(), FsWindow, isAbort(), mdTypes(), OpenedFile, openMarkdownFiles(), openTypes() (+6 more)

### Community 98 - "captcha.ts"
Cohesion: 0.21
Nodes (8): captchaToken(), loadTurnstile(), Turnstile, TURNSTILE_SCRIPT, Window, TURNSTILE_SITE_KEY, accountFailure(), Options

### Community 100 - "noteWordsMath.test.ts"
Cohesion: 0.07
Nodes (29): BLOCKS, FROM_ENGLISH, FUNCTIONS, functionWordPairs(), GRAPH_KEY_FORMS, GRAPH_KEY_LINE, GRAPH_KEYS, GraphKey (+21 more)

### Community 101 - "spellcheck"
Cohesion: 0.21
Nodes (8): spellcheck(), close(), misspelledAt(), openAt(), replace(), tooltipView(), SpellChecker, SpellcheckOptions

### Community 102 - "symbolsEn.test.ts"
Cohesion: 0.10
Nodes (43): preferredIndex(), SuggestionItem, editDistance(), normalizeText(), singular(), stem(), STOPWORDS, words() (+35 more)

### Community 103 - "toast"
Cohesion: 0.07
Nodes (40): loadingEditor(), openSheet(), RelocationResult, BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark() (+32 more)

### Community 104 - "graph/file.ts"
Cohesion: 0.10
Nodes (35): figureName(), graphFigure(), graphImage(), graphsForFile(), graphsFromFile(), hide(), OPEN, swatchSvg() (+27 more)

### Community 105 - "PlanView"
Cohesion: 0.26
Nodes (5): labelHtml(), ganttWidth(), PlanView, GraphLook, Palette

### Community 106 - "explainPanel.ts"
Cohesion: 0.06
Nodes (41): ExplainTone, Explanation, FollowUp, REPLY_TOKENS, glifoError(), LocalAbort, localErrorMessage(), localLlm (+33 more)

### Community 107 - "spellcheck.ts"
Cohesion: 0.12
Nodes (15): misspelledMark, refreshSpelling, setTarget, SKIP, SpellTarget, T, wordsToCheck(), findWords() (+7 more)

### Community 108 - "planPreview.ts"
Cohesion: 0.35
Nodes (7): planName(), T, loadDialect(), svgToPng(), downloadBlob(), downloadText(), fileNameFor()

### Community 113 - "template.ts"
Cohesion: 0.38
Nodes (7): cardPreviewTex(), formPreviewTex(), ParsedTemplate, parseTemplate(), PLACEHOLDER_TEX, placeholderPreview(), templateText()

### Community 116 - "smoke-test.mjs"
Cohesion: 0.25
Nodes (4): markdown-it, fakeLlmWorker(), firstVisit(), plainContext

### Community 117 - "schema/templates.ts"
Cohesion: 0.28
Nodes (15): SHAPE_SIZE, tableHeight(), conceptMap(), cycle(), edge(), er(), flowchart(), node() (+7 more)

### Community 118 - "dictionaries.ts"
Cohesion: 0.25
Nodes (4): download(), fetchDictionary(), FILES, DictionaryData

### Community 119 - "src/relocation.ts"
Cohesion: 0.05
Nodes (85): accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf() (+77 more)

### Community 120 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 122 - "editor/editor.ts"
Cohesion: 0.03
Nodes (71): description, name, private, type, version, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown (+63 more)

### Community 123 - "strokes.ts"
Cohesion: 0.20
Nodes (15): between(), Box, capsuleSpan(), circleSpan(), eraserGrowth(), eraseStroke(), intersect(), linearSpan() (+7 more)

### Community 124 - "Sheet"
Cohesion: 0.07
Nodes (33): ExactComplexScope, Ode, withWorkLimit(), FiniteContext, FormattedResult, MathNode, bracketParts(), chainOf() (+25 more)

### Community 129 - "Dove sono le cose"
Cohesion: 0.06
Nodes (79): 1. A cosa serve l'AI dei modelli di frontiera, Dove sono le cose, Glifo – architettura, allNames(), answerFollowUp(), bareResult(), chained(), chatContext (+71 more)

### Community 133 - "pick"
Cohesion: 0.26
Nodes (4): pick(), FormulaError, Parser, errorName()

### Community 136 - "Stroke"
Cohesion: 0.09
Nodes (9): DrawAction, EraseAction, pointsOf(), Step, shapeSvg(), BoardChange, BoardData, newStrokeId() (+1 more)

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 141 - "xlsx.ts"
Cohesion: 0.09
Nodes (47): RFC-4180, fflate, tablesNote(), csvCell(), csvDelimiter(), csvNumbers(), csvToSheet(), digitsOf() (+39 more)

### Community 143 - "feedback.ts"
Cohesion: 0.06
Nodes (43): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountOffMessage(), Site, T, commentDate(), commentItem() (+35 more)

### Community 154 - "ink.ts"
Cohesion: 0.11
Nodes (20): 2. Dalla lavagna alla nota, BoardOptions, Prefs, BOARD_PALETTES, BoardPalette, BoardTheme, highlightName(), inkName() (+12 more)

### Community 156 - "Glifo – note per Claude"
Cohesion: 0.11
Nodes (18): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole (+10 more)

### Community 157 - "vitest"
Cohesion: 0.05
Nodes (63): vitest, addToGraphBlock(), setGraphLabels(), commandTokenAt(), lineDepth(), parseBlockMath(), graphImagesFor(), monthOf() (+55 more)

### Community 158 - "complex.test.ts"
Cohesion: 0.20
Nodes (12): staticGraphSvg(), chooseWindow(), chooseBox(), DrawOptions, graphSvg(), DEFAULT_CAMERA, sceneSvg(), item() (+4 more)

### Community 160 - "vite"
Cohesion: 0.19
Nodes (6): vite, constructor(), LlamaWorker, minutes, postMessage(), started

### Community 169 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 179 - "I modelli e le chiavi API"
Cohesion: 0.33
Nodes (6): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), In prova sul ramo `prova` (7 ottobre 2026): Qwen3 nel browser per «Spiegami», La chiave, il server locale e la scelta del modello (14 ottobre 2026), Le idee dello studente (5 ottobre 2026)

## Knowledge Gaps
- **874 isolated node(s):** `session-start.sh script`, `name`, `private`, `version`, `description` (+869 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1212 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **38 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `texts` connect `i18n.ts` to `Dove sono le cose`, `main.ts`, `MathError`, `supabase.ts`, `spec.ts`, `inference.ts`, `pick`, `graph/preview.ts`, `schemaBlocks.ts`, `probability.ts`, `svg.ts`, `sheet.ts`, `xlsx.ts`, `feedback.ts`, `plan.ts`, `parse.ts`, `numerical.ts`, `arithmetic.ts`, `index.ts`, `schema/editor.ts`, `chart.ts`, `ink.ts`, `gauss.ts`, `board.ts`, `vitest`, `gantt.ts`, `several.ts`, `study.ts`, `assistant.ts`, `logic.ts`, `solve.ts`, `complex.ts`, `powerseries.ts`, `resize.ts`, `localModels.ts`, `schemaEn.test.ts`, `functions.ts`, `linear.ts`, `conics.ts`, `sidePanel.ts`, `linsys.ts`, `FoldersStore`, `page.ts`, `editor/lists.ts`, `finite.ts`, `ui/preview.ts`, `spreadsheet/editor.ts`, `spreadsheetEn.test.ts`, `num`, `laplace.ts`, `aiPanel.ts`, `toLatex`, `symbolic.ts`, `aiPanel.test.ts`, `topics.ts`, `BoardStore`, `files.ts`, `toast`, `graph/file.ts`, `explainPanel.ts`, `spellcheck.ts`, `planPreview.ts`, `schema/templates.ts`, `src/relocation.ts`, `editor/editor.ts`?**
  _High betweenness centrality (0.118) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `Dove sono le cose` to `i18n.ts`, `parseGraph`, `main.ts`, `MathError`, `supabase.ts`, `spec.ts`, `inference.ts`, `mul`, `Stroke`, `schemaBlocks.ts`, `graph/preview.ts`, `explainSubjects.ts`, `svg.ts`, `xlsx.ts`, `sheet.ts`, `SchemaEditor`, `feedback.ts`, `parse.ts`, `numerical.ts`, `arithmetic.ts`, `SheetEditor`, `plan.ts`, `schema/editor.ts`, `chart.ts`, `Parser`, `board.ts`, `gauss.ts`, `vitest`, `gantt.ts`, `several.ts`, `Rational`, `assistant.ts`, `logic.ts`, `solve.ts`, `complex.ts`, `study.ts`, `view3d.ts`, `Board`, `localModels.ts`, `functions.ts`, `linear.ts`, `functionWord`, `conics.ts`, `board/shapes.ts`, `.paintVertexShape`, `sidePanel.ts`, `linsys.ts`, `graph.ts`, `editor/lists.ts`, `finite.ts`, `ui/preview.ts`, `spreadsheet/editor.ts`, `spreadsheetEn.test.ts`, `num`, `laplace.ts`, `aiPanel.ts`, `toLatex`, `symbolic.ts`, `tutorial.mjs`, `topics.ts`, `BoardStore`, `files.ts`, `toast`, `graph/file.ts`, `PlanView`, `explainPanel.ts`, `planPreview.ts`, `smoke-test.mjs`, `src/relocation.ts`, `editor/editor.ts`, `strokes.ts`, `Sheet`?**
  _High betweenness centrality (0.114) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `i18n.ts`, `Dove sono le cose`, `parseGraph`, `supabase.ts`, `schemaBlocks.ts`, `probability.ts`, `svg.ts`, `sheet.ts`, `xlsx.ts`, `feedback.ts`, `plan.ts`, `parse.ts`, `schema/editor.ts`, `chart.ts`, `store.ts`, `board.ts`, `ink.ts`, `complex.test.ts`, `gantt.ts`, `assistant.ts`, `translations.test.ts`, `resize.ts`, `view3d.ts`, `localModels.ts`, `schemaEn.test.ts`, `board/shapes.ts`, `linsys.ts`, `FoldersStore`, `editor/lists.ts`, `database.ts`, `ui/preview.ts`, `spreadsheet/editor.ts`, `spreadsheetEn.test.ts`, `symbolic.ts`, `aiPanel.test.ts`, `BoardStore`, `captcha.ts`, `noteWordsMath.test.ts`, `symbolsEn.test.ts`, `toast`, `explainPanel.ts`, `spellcheck.ts`, `template.ts`, `src/relocation.ts`, `editor/editor.ts`, `strokes.ts`, `Sheet`?**
  _High betweenness centrality (0.079) - this node is a cross-community bridge._
- **Are the 320 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `tutorialModel()`) actually correct?**
  _`Dove sono le cose` has 320 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `name`, `private` to the rest of the system?**
  _874 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `i18n.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.027179058758006126 - nodes in this community are weakly interconnected._
- **Should `parseGraph` be split into smaller, more focused modules?**
  _Cohesion score 0.08907563025210084 - nodes in this community are weakly interconnected._