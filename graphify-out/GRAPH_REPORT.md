# Graph Report - Glifo  (2026-10-15)

## Corpus Check
- 349 files · ~736,373 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5615 nodes · 20532 edges · 175 communities (135 shown, 40 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 704 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b3c13390`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- i18n.ts
- vitest
- main.ts
- math/evaluate.ts
- sync.ts
- spec.ts
- h
- primitive.ts
- graph/preview.ts
- blockMove.ts
- distributions.ts
- explainSubjects.ts
- svg.ts
- statsShown.ts
- SchemaEditor
- markdown.ts
- SheetEditor
- namesIn
- numerical.ts
- toLatex
- index.ts
- client.ts
- schema/editor.ts
- formula.ts
- store.ts
- parse.ts
- board.ts
- graph/file.ts
- NotesStore
- compile
- gantt.ts
- study.ts
- Rational
- assistant.ts
- logic.ts
- laplace.ts
- complex.ts
- devDependencies
- translations.test.ts
- resize.ts
- view3d.ts
- Board
- aiEn.test.ts
- parseSchema
- functions.ts
- MathError
- prova-lettori.py
- restore.ts
- toolbar.ts
- board/shapes.ts
- schema/shapes.ts
- sidePanel.ts
- sheet.ts
- graph.ts
- domain.ts
- page.ts
- 20261004091555_note_condivise.sql
- editor/lists.ts
- src/relocation.ts
- finite.ts
- ui/preview.ts
- dependencies
- Welcome to Glifo
- spreadsheet/editor.ts
- spreadsheetEn.test.ts
- num
- engine.ts
- probability.ts
- editor/editor.ts
- Benvenuto in Glifo
- compilerOptions
- Glifo
- inference.ts
- symbolic.ts
- symbolsEn.test.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- plan.ts
- explainPanel.ts
- session-start.sh
- .claude/CLAUDE.md
- Il database degli account (Supabase)
- tutorial.mjs
- Abbonamenti
- fourier.ts
- LlamaWorker
- supabase-stub.sql
- account-test.mjs
- escapeHtml
- supabase.ts
- noteWordsMath.test.ts
- schemaBlocks.ts
- search.ts
- siteUpdate.ts
- spreadsheet/format.ts
- rich
- latex.ts
- spellcheck.ts
- MarkdownEditor
- strokes.ts
- smoke-test.mjs
- schema/templates.ts
- BoardStore
- FoldersStore
- suggest.ts
- AiPanel
- @codemirror/state
- ExplainPanel
- Sheet
- relocation-test.mjs
- Glifo – note per Claude
- Dove sono le cose
- mathDelims.ts
- database.ts
- Stroke
- 20261008130026_commenti.sql
- Le spiegazioni, come funzionano
- L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota
- xlsx.ts
- createFakeSupabase
- feedback.ts
- logo.ts
- .folderItem
- ink.ts
- In programma
- NodeLook
- tutorial.ts
- sql.ts
- vite
- downloadText
- captcha.ts
- files.ts
- render/lists.ts
- topics.ts
- vite.config.ts
- chiSquareTest
- scripts
- Distribution
- Costi
- La lavagna
- I modelli e le chiavi API

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 332 edges
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
- `Trasloco: il sito su Cloudflare, con un dominio tutto di Glifo` --references--> `dist()`  [INFERRED]
  ROADMAP.md → src/board/shapes.ts
- `Dove sono le cose` --references--> `WidgetKind`  [INFERRED]
  ARCHITETTURA.md → src/editor/schemaBlocks.ts
- `Dove sono le cose` --references--> `ConicElements`  [INFERRED]
  ARCHITETTURA.md → src/math/conics.ts
- `Dove sono le cose` --references--> `fakeLlmWorker()`  [INFERRED]
  ARCHITETTURA.md → scripts/smoke-test.mjs
- `Il controllo anti-robot (CAPTCHA, ottobre 2026)` --references--> `captchaToken()`  [INFERRED]
  supabase/README.md → src/account/captcha.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (175 total, 40 thin omitted)

### Community 0 - "i18n.ts"
Cohesion: 0.05
Nodes (59): DEFAULT_LOCAL_MODEL, browserLang(), browserLanguages(), dateLocale(), detectLang(), Entry, isLang(), lang (+51 more)

### Community 1 - "vitest"
Cohesion: 0.05
Nodes (36): vitest, addToGraphBlock(), formulaAtCursor(), GraphLabelLines, insertGraphBlock(), LABEL_KEYS, formulaGraph(), formulaGraphLines() (+28 more)

### Community 2 - "main.ts"
Cohesion: 0.03
Nodes (116): WidgetBlock, account, ACCOUNT_OFF, active, aiShown(), aiToggle, aiWork, app (+108 more)

### Community 3 - "math/evaluate.ts"
Cohesion: 0.07
Nodes (41): argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot(), fieldOn(), numericPartials() (+33 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (32): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+24 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (105): conicItems(), isConicLine(), quadricEquation(), T, isFourierLine(), isComplexLine(), isComplexValue(), isSegmentNode() (+97 more)

### Community 6 - "h"
Cohesion: 0.07
Nodes (57): T, texts, createFolder(), folderNameProblem(), renameFolder(), sidebarToggle(), viewSwitch, moveDayLabel() (+49 more)

### Community 7 - "primitive.ts"
Cohesion: 0.17
Nodes (60): atIntegers(), algebraic(), bigGcd(), byParts(), candidates(), canon(), combineLogs(), compareKeys() (+52 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (46): addLabel(), boxes, cameras, complexCoord(), containing(), coord(), coordinates(), drawings (+38 more)

### Community 9 - "blockMove.ts"
Cohesion: 0.10
Nodes (34): blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove, blockPlace(), closed() (+26 more)

### Community 10 - "distributions.ts"
Cohesion: 0.16
Nodes (29): choose(), continuousQuantile(), decimals(), expSumValue(), factorialBig(), FAMILIES, integerParam(), invalid() (+21 more)

### Community 11 - "explainSubjects.ts"
Cohesion: 0.18
Nodes (22): explainTarget, formulaNames(), formulasUntil(), sheetBefore(), explanationMarkdown(), hasCalculation(), insertAfterBlock(), insertAfterText() (+14 more)

### Community 12 - "svg.ts"
Cohesion: 0.08
Nodes (60): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseWindow(), chooseY(), clipLines(), dataWindow() (+52 more)

### Community 13 - "statsShown.ts"
Cohesion: 0.12
Nodes (40): EMPTY_COMPLEX_SCOPE, randomScope(), check(), correlation(), count(), covariance(), Data, dataStatistic() (+32 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.08
Nodes (20): isContainer(), isLanes(), SchemaEditor, cellText(), createEdgeCell(), edgeLook(), edgeStyle(), insertSchema() (+12 more)

### Community 15 - "markdown.ts"
Cohesion: 0.06
Nodes (60): setGraphLabels(), monthOf(), MONTHS, MONTHS_EN, parseDate(), planBlock, PlanKind, planRange() (+52 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (5): functionLabel(), SheetEditor, englishTyping(), serializeSheet(), cloneSheet()

### Community 17 - "namesIn"
Cohesion: 0.14
Nodes (36): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+28 more)

### Community 18 - "numerical.ts"
Cohesion: 0.12
Nodes (48): bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial(), interpolating() (+40 more)

### Community 19 - "toLatex"
Cohesion: 0.06
Nodes (89): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+81 more)

### Community 20 - "index.ts"
Cohesion: 0.06
Nodes (45): b, bigops, c, calculus, fn, fr, fractions, functions (+37 more)

### Community 21 - "client.ts"
Cohesion: 0.10
Nodes (13): Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download(), fetchDictionary() (+5 more)

### Community 22 - "schema/editor.ts"
Cohesion: 0.05
Nodes (68): laneOf(), alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ALIGN_NAMES (+60 more)

### Community 23 - "formula.ts"
Cohesion: 0.11
Nodes (19): pick(), BinOp, COMPARE, ERRORS_BY_LENGTH, FormulaError, OPERATORS, Parser, Ref (+11 more)

### Community 24 - "store.ts"
Cohesion: 0.09
Nodes (15): BoardBackend, done(), fromRecord(), IdbBoards, ofNote(), openBoardDatabase(), openDefault(), recordBytes() (+7 more)

### Community 25 - "parse.ts"
Cohesion: 0.06
Nodes (58): errorMessage(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, derivativeOperator() (+50 more)

### Community 26 - "board.ts"
Cohesion: 0.06
Nodes (49): Action, coalesced(), DOT_SIZES, EraserMode, Finger, HANDLE_REACH, ICON, LassoAction (+41 more)

### Community 27 - "graph/file.ts"
Cohesion: 0.09
Nodes (43): FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsForFile(), graphsFromFile(), hide() (+35 more)

### Community 28 - "NotesStore"
Cohesion: 0.12
Nodes (13): adoptGuestNotes(), guestNoteCount(), isWelcome(), buildPackage(), newId(), createdAtFromId(), deriveTitle(), NotesStore (+5 more)

### Community 29 - "compile"
Cohesion: 0.06
Nodes (81): criticalLine(), named(), severalItems(), surface(), T, close(), Definite, definiteIntegral() (+73 more)

### Community 30 - "gantt.ts"
Cohesion: 0.06
Nodes (69): amount(), barColor(), crossings(), dateText(), dayMonth(), dayOf(), fitText(), GanttOptions (+61 more)

### Community 31 - "study.ts"
Cohesion: 0.14
Nodes (38): limit(), Asymptote, asymptoteText(), boundaries(), compiled(), cutsOf(), defined(), domainOf() (+30 more)

### Community 32 - "Rational"
Cohesion: 0.05
Nodes (90): Part, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactFunction, exactRoot(), factorialExact() (+82 more)

### Community 33 - "assistant.ts"
Cohesion: 0.12
Nodes (28): AiAnswer, AiError, AiSettings, answerSchema(), askAi(), askCompatible(), askThroughHost(), capitalized() (+20 more)

### Community 34 - "logic.ts"
Cohesion: 0.11
Nodes (30): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+22 more)

### Community 35 - "laplace.ts"
Cohesion: 0.20
Nodes (23): factoredPolynomial(), beyondPoles(), compiled(), E, fractionShown(), HALF, inverseLaplaceShown(), laplaceEx() (+15 more)

### Community 36 - "complex.ts"
Cohesion: 0.05
Nodes (82): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isInequality(), onlyComplex() (+74 more)

### Community 37 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

### Community 38 - "translations.test.ts"
Cohesion: 0.17
Nodes (18): AstNode, calleeName(), check(), checkPair(), visit(), children(), entryPairs(), files (+10 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (24): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+16 more)

### Community 40 - "view3d.ts"
Cohesion: 0.06
Nodes (94): staticGraphSvg(), LayeredSolid, addMesh(), addTet(), affinePlane(), Axis, Box, centroid() (+86 more)

### Community 41 - "Board"
Cohesion: 0.10
Nodes (8): Board, clampZoom(), loadPrefs(), pressureOf(), sizeChoice(), validView(), SizeChoice, Pt

### Community 42 - "aiEn.test.ts"
Cohesion: 0.04
Nodes (60): EXPLAIN_TONES, chat(), GlifoError, Gpu, load(), post(), remove(), scope (+52 more)

### Community 43 - "parseSchema"
Cohesion: 0.07
Nodes (42): @electric-sql/pglite, openSchemaEditor(), SchemaEditorOptions, base64(), hide(), OPEN, schemasForFile(), schemasFromFile() (+34 more)

### Community 44 - "functions.ts"
Cohesion: 0.08
Nodes (63): CellResult, EMPTY, number(), T, addFormat(), divFormat(), Format, mulFormat() (+55 more)

### Community 45 - "MathError"
Cohesion: 0.06
Nodes (74): MathError, angleBetween(), asMatrix(), basisOf(), characteristicPolynomial(), circleText(), cross(), Ctx (+66 more)

### Community 46 - "prova-lettori.py"
Cohesion: 0.12
Nodes (4): byte_table(), read(), Reader, tidy()

### Community 47 - "restore.ts"
Cohesion: 0.16
Nodes (17): newStrokeId(), applySpellcheck(), receiveRelocation(), restore(), setPersonalWords(), wordsChangedHere(), BackupNote, backupNotes() (+9 more)

### Community 48 - "toolbar.ts"
Cohesion: 0.17
Nodes (16): insertBlock(), wrapSelection(), ListStyleId, Action, createToolbar(), insertCode(), insertLink(), listStyle() (+8 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (36): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+28 more)

### Community 50 - "schema/shapes.ts"
Cohesion: 0.08
Nodes (16): ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape, IdentifyingRelationShape (+8 more)

### Community 51 - "sidePanel.ts"
Cohesion: 0.13
Nodes (15): AiResult, SuggestionItem, localizeTex(), cleanKatexError(), isConfidentAnswer(), SymbolForm, AiState, cardPreview() (+7 more)

### Community 52 - "sheet.ts"
Cohesion: 0.05
Nodes (77): FieldContext, isTestLine(), number(), T, testItems(), endTex(), classes(), dataOf() (+69 more)

### Community 53 - "graph.ts"
Cohesion: 0.10
Nodes (27): @maxgraph/core, AT_X, COMPASS, createGraph(), drawSchema(), edgeTextAt(), isEdgeLook(), loadSchema() (+19 more)

### Community 54 - "domain.ts"
Cohesion: 0.14
Nodes (26): inequalityMargin(), integralRegion, axesIn(), bestAlong(), boundingBox(), combine(), compileDomain(), compileMultiple() (+18 more)

### Community 55 - "page.ts"
Cohesion: 0.07
Nodes (41): SUPABASE_KEY, SUPABASE_URL, accountDataFile(), PullResult, board, openShareDialog(), changeAccess(), changeCopy() (+33 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "editor/lists.ts"
Cohesion: 0.10
Nodes (56): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+48 more)

### Community 58 - "src/relocation.ts"
Cohesion: 0.08
Nodes (58): accountSpace(), currentAccount(), forgetAccount(), knowsAccount(), prefixOf(), prefsKey(), restorePrefs(), setAsidePrefs() (+50 more)

### Community 59 - "finite.ts"
Cohesion: 0.18
Nodes (25): countOf(), Elem, elemTex(), elemText(), EMPTY, FiniteError, FiniteResult, finiteSetOf() (+17 more)

### Community 60 - "ui/preview.ts"
Cohesion: 0.09
Nodes (19): GraphLabels, BlockKind, hydrateSheets(), T, BLOCK_NAMES, blockHiddenMessage(), blockKindOf(), blockMovedMessage() (+11 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "Welcome to Glifo"
Cohesion: 0.20
Nodes (9): A few examples, Calculations and graphs, For programming too, Handy shortcuts, How to write formulas, Lists, Spell check, Try it now (+1 more)

### Community 63 - "spreadsheet/editor.ts"
Cohesion: 0.07
Nodes (61): readSheet(), sheetSummary(), currentCall(), Editing, MenuEntry, Move, openSheetEditor(), PATHS (+53 more)

### Community 64 - "spreadsheetEn.test.ts"
Cohesion: 0.11
Nodes (39): formulaText(), tableTopic(), valueText(), evaluateSheet(), SheetEvaluator, hide(), OPEN, sheetsForFile() (+31 more)

### Community 65 - "num"
Cohesion: 0.07
Nodes (108): absOf(), oneFraction(), splitAbs(), withoutAbs(), exp(), hyperbolicToExp(), linearIn(), sqrtEx() (+100 more)

### Community 66 - "engine.ts"
Cohesion: 0.16
Nodes (10): @farscrl/hunspell-wasm, capitalize(), COMMON_FIXES, DictionaryData, ELISIONS, inGlossary(), lower(), SpellEngine (+2 more)

### Community 67 - "probability.ts"
Cohesion: 0.10
Nodes (29): addExp(), End, expSum, Family, subtractExp(), CompileOptions, ExactScope, RelOp (+21 more)

### Community 68 - "editor/editor.ts"
Cohesion: 0.04
Nodes (51): description, name, private, type, version, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands (+43 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "Glifo"
Cohesion: 0.12
Nodes (16): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Domande frequenti e commenti (+8 more)

### Community 73 - "inference.ts"
Cohesion: 0.18
Nodes (22): between(), confidence(), confidenceShown(), decimals(), hypothesisTest(), interval(), meanOf(), num() (+14 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (63): primitive(), linearCells(), atValues(), cancelLinear(), commonMonomial(), Converter, coordinates(), decimalText() (+55 more)

### Community 75 - "symbolsEn.test.ts"
Cohesion: 0.17
Nodes (15): CATEGORIES, symbolById(), SYMBOLS, cardPreviewTex(), formPreviewTex(), ParsedTemplate, parseTemplate(), PLACEHOLDER_TEX (+7 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Errore o imprevisto → nel dettaglio, 3. Serve una decisione → frasi complete, 4. Fine del compito → un solo riepilogo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "plan.ts"
Cohesion: 0.08
Nodes (38): textLabel(), graphKeyLine(), chartData, chartFrom(), chartLines(), chartRange(), ChartTable, currentRegion() (+30 more)

### Community 79 - "explainPanel.ts"
Cohesion: 0.12
Nodes (20): ExplainTone, Explanation, FollowUp, REPLY_TOKENS, Settings, AI_NEWS_TITLE, AI_WORKING_TITLE, aiActivity (+12 more)

### Community 82 - "Il database degli account (Supabase)"
Cohesion: 0.15
Nodes (12): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il controllo anti-robot (CAPTCHA, ottobre 2026), Il database degli account (Supabase), Il progetto, Il trasloco su glifo.page (ottobre 2026) (+4 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.11
Nodes (11): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+3 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.10
Nodes (21): Abbonamenti, Classico, gratis: per scrivere e controllare, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026) (+13 more)

### Community 91 - "fourier.ts"
Cohesion: 0.21
Nodes (18): fourierItems(), T, boundsOf(), close(), definite(), fourierProblem, fourierShown(), isTrig() (+10 more)

### Community 92 - "LlamaWorker"
Cohesion: 0.25
Nodes (5): Promemoria per lo studente, Commenti di chi prova Glifo, constructor(), LlamaWorker, Commenti di chi prova Glifo

### Community 96 - "account-test.mjs"
Cohesion: 0.11
Nodes (10): device(), login(), newContext, waitFor(), b64(), CAPTCHA_TOKEN, CODE, GOOGLE_CODE (+2 more)

### Community 97 - "escapeHtml"
Cohesion: 0.12
Nodes (21): katex, planSwatchSvg(), labelHtml(), ganttWidth(), PlanView, GraphLook, texHtml(), checkHtml() (+13 more)

### Community 98 - "supabase.ts"
Cohesion: 0.10
Nodes (41): @supabase/supabase-js, AUTH_STORAGE_KEY, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken() (+33 more)

### Community 100 - "noteWordsMath.test.ts"
Cohesion: 0.11
Nodes (16): AstNode, childrenOf(), DATA, ENGLISH, englishTexts(), FUNCTIONS, inBothLanguages(), isNode() (+8 more)

### Community 101 - "schemaBlocks.ts"
Cohesion: 0.11
Nodes (19): InsertOptions, toggleLinePrefix(), besideSchema(), BlockWidget, findWidgetBlocks(), guardBlocks(), KINDS, schemaBlockRanges() (+11 more)

### Community 102 - "search.ts"
Cohesion: 0.18
Nodes (21): editDistance(), singular(), stem(), STOPWORDS, words(), BOTH, buildIndex(), containsPhrase() (+13 more)

### Community 103 - "siteUpdate.ts"
Cohesion: 0.16
Nodes (18): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, loadPart() (+10 more)

### Community 104 - "spreadsheet/format.ts"
Cohesion: 0.18
Nodes (19): quantity(), tableItems(), decimalsOf(), ENGLISH, fixedNumber(), formatNumber(), generalNumber(), group() (+11 more)

### Community 105 - "rich"
Cohesion: 0.14
Nodes (17): SyncStatus, rich(), AccountButton, accountSection(), AccountSectionDeps, confirmAccountDeletion(), messageOf(), openLoginDialog() (+9 more)

### Community 106 - "latex.ts"
Cohesion: 0.08
Nodes (37): isNumericalLine(), numericalItems(), names(), STUDY_GRAPH, studyItems(), T, ACCENT_COMMANDS, diffLatex() (+29 more)

### Community 107 - "spellcheck.ts"
Cohesion: 0.08
Nodes (24): @codemirror/lang-markdown, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt() (+16 more)

### Community 108 - "MarkdownEditor"
Cohesion: 0.08
Nodes (20): closeMathBlockOnEnter(), EditorCallbacks, MarkdownEditor, searchPhrases(), tabOutOfMath(), insertTemplate(), templateInsertion(), CODE_NODES (+12 more)

### Community 113 - "strokes.ts"
Cohesion: 0.23
Nodes (13): between(), capsuleSpan(), circleSpan(), eraserGrowth(), eraseStroke(), intersect(), linearSpan(), pieceLength() (+5 more)

### Community 116 - "smoke-test.mjs"
Cohesion: 0.15
Nodes (6): markdown-it, playwright-core, PNG_ICONS, fakeLlmWorker(), firstVisit(), plainContext

### Community 117 - "schema/templates.ts"
Cohesion: 0.22
Nodes (18): SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), conceptMap(), cycle(), edge(), er() (+10 more)

### Community 118 - "BoardStore"
Cohesion: 0.12
Nodes (6): BoardStore, MemoryBoards, applyAccountChange(), backup(), signOutAccount(), boardsFor()

### Community 119 - "FoldersStore"
Cohesion: 0.08
Nodes (15): Deletion, DeletionLog, cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder() (+7 more)

### Community 120 - "suggest.ts"
Cohesion: 0.26
Nodes (12): normalizeText(), IndexedEntry, SearchResult, getIndex(), isSubsequence(), keysOf(), MatchKind, suggestCommands() (+4 more)

### Community 122 - "@codemirror/state"
Cohesion: 0.09
Nodes (20): @codemirror/state, addPlaceholders, buildDecorations(), clearAllPlaceholders(), clearPlaceholders, contains(), currentIndex(), filledMark (+12 more)

### Community 123 - "ExplainPanel"
Cohesion: 0.14
Nodes (6): MathRegion, ExplainChat, ExplainPanel, preventFocusSteal(), formulasSummary(), setup()

### Community 124 - "Sheet"
Cohesion: 0.06
Nodes (38): ExactComplexScope, Ode, bound(), withWorkLimit(), ExactRandom, FiniteContext, FormattedResult, Mat (+30 more)

### Community 125 - "relocation-test.mjs"
Cohesion: 0.18
Nodes (7): AFTER_MOVE, ids, newBrowser(), NOTICE_DAY, out, serve(), TYPES

### Community 128 - "Glifo – note per Claude"
Cohesion: 0.25
Nodes (8): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Regole, sqlite()

### Community 129 - "Dove sono le cose"
Cohesion: 0.06
Nodes (77): 1. A cosa serve l'AI dei modelli di frontiera, Dove sono le cose, Glifo – architettura, allNames(), answerFollowUp(), bareResult(), chained(), chatContext (+69 more)

### Community 132 - "mathDelims.ts"
Cohesion: 0.31
Nodes (9): analyzeBlockOpen(), BlockOpen, countOccurrences(), findUnescaped(), InlineMathMatch, isEscaped(), isSpace(), isWordChar() (+1 more)

### Community 133 - "database.ts"
Cohesion: 0.23
Nodes (6): createDatabase(), createUser(), databaseTests(), feedbackTests(), migrations, shareTests()

### Community 136 - "Stroke"
Cohesion: 0.10
Nodes (7): DrawAction, EraseAction, pointsOf(), Step, BoardChange, BoardData, Stroke

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 139 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 140 - "L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota"
Cohesion: 0.29
Nodes (7): 3. Da una foto alla nota, 4. Dettare: la voce diventa testo nella nota, 5. Registrare le lezioni e trascriverle, Da sistemare con il primo punto che tocca l'AI, Fonti (controllate il 14 ottobre 2026), In che ordine, L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota

### Community 141 - "xlsx.ts"
Cohesion: 0.09
Nodes (45): RFC-4180, fflate, tablesNote(), csvCell(), csvDelimiter(), csvNumbers(), csvToSheet(), digitsOf() (+37 more)

### Community 142 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 143 - "feedback.ts"
Cohesion: 0.07
Nodes (45): NEW_ORIGIN, Site, T, commentDate(), commentItem(), COMMENTS_MAX, CommentsDeps, CommentsError (+37 more)

### Community 144 - "logo.ts"
Cohesion: 0.38
Nodes (4): BOX, glyph(), LOGO_COLOR, logoIcon()

### Community 154 - "ink.ts"
Cohesion: 0.10
Nodes (21): 2. Dalla lavagna alla nota, BoardOptions, Prefs, BOARD_PALETTES, BoardPalette, BoardTheme, highlightName(), inkName() (+13 more)

### Community 156 - "In programma"
Cohesion: 0.25
Nodes (8): Account: i propri appunti su ogni dispositivo, anche da condividere, Idee per il futuro, In programma, L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota (14 ottobre 2026, se ne parla), La lavagna: idee in più, Più avanti, Schemi: idee in più, Trasloco: il sito su Cloudflare, con un dominio tutto di Glifo

### Community 158 - "tutorial.ts"
Cohesion: 0.15
Nodes (12): HINT_MS, markTutorialSeen(), openTutorial(), show(), richText(), showTutorialHint(), close(), T (+4 more)

### Community 159 - "sql.ts"
Cohesion: 0.19
Nodes (16): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+8 more)

### Community 160 - "vite"
Cohesion: 0.33
Nodes (4): vite, minutes, postMessage(), started

### Community 161 - "downloadText"
Cohesion: 0.22
Nodes (10): loadDialect(), crc32(), svgSize(), svgToPng(), T, withDensity(), downloadBlob(), downloadText() (+2 more)

### Community 162 - "captcha.ts"
Cohesion: 0.21
Nodes (8): captchaToken(), loadTurnstile(), Turnstile, TURNSTILE_SCRIPT, Window, TURNSTILE_SITE_KEY, accountFailure(), Options

### Community 163 - "files.ts"
Cohesion: 0.14
Nodes (21): cache, capability(), ClaudeRuntime, hostDownloads, HostError, inClaudeViewer(), ModelTier, runtime() (+13 more)

### Community 166 - "render/lists.ts"
Cohesion: 0.27
Nodes (13): ListStyle, bulletGroup(), Marker, sameList(), alignInside(), asciiTrim(), findMarker(), Found (+5 more)

### Community 168 - "topics.ts"
Cohesion: 0.10
Nodes (34): ATTRIBUTES, containerOf(), cut(), definedName(), ER_SHAPES, fieldText(), fitLines(), flowOrder() (+26 more)

### Community 170 - "vite.config.ts"
Cohesion: 0.22
Nodes (6): @mlc-ai/web-llm, vite-plugin-pwa, accountOffMessage(), defineFor(), MAIN_BRANCH, webllmModels

### Community 172 - "chiSquareTest"
Cohesion: 0.29
Nodes (7): chiSquareTest(), Given, InferenceContext, nameOf(), opOf(), significance(), squared()

### Community 174 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 175 - "Distribution"
Cohesion: 0.19
Nodes (8): discreteQuantile(), Distribution, exactIntervalProbability(), integerRange(), intervalProbability(), pValue(), TestResult, setProbability()

### Community 176 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 177 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 179 - "I modelli e le chiavi API"
Cohesion: 0.33
Nodes (6): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), In prova sul ramo `prova` (7 ottobre 2026): Qwen3 nel browser per «Spiegami», La chiave, il server locale e la scelta del modello (14 ottobre 2026), Le idee dello studente (5 ottobre 2026)

## Knowledge Gaps
- **879 isolated node(s):** `L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota (14 ottobre 2026, se ne parla)`, `Account: i propri appunti su ogni dispositivo, anche da condividere`, `La lavagna: idee in più`, `Schemi: idee in più`, `Entry` (+874 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1213 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **40 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `texts` connect `h` to `i18n.ts`, `Dove sono le cose`, `main.ts`, `math/evaluate.ts`, `spec.ts`, `graph/preview.ts`, `tutorial.ts`, `distributions.ts`, `svg.ts`, `statsShown.ts`, `xlsx.ts`, `markdown.ts`, `feedback.ts`, `namesIn`, `numerical.ts`, `toLatex`, `index.ts`, `schema/editor.ts`, `formula.ts`, `parse.ts`, `ink.ts`, `board.ts`, `graph/file.ts`, `compile`, `gantt.ts`, `study.ts`, `Rational`, `assistant.ts`, `logic.ts`, `downloadText`, `complex.ts`, `sql.ts`, `files.ts`, `resize.ts`, `topics.ts`, `aiEn.test.ts`, `parseSchema`, `functions.ts`, `MathError`, `restore.ts`, `toolbar.ts`, `sidePanel.ts`, `sheet.ts`, `domain.ts`, `page.ts`, `editor/lists.ts`, `src/relocation.ts`, `finite.ts`, `ui/preview.ts`, `spreadsheet/editor.ts`, `spreadsheetEn.test.ts`, `num`, `probability.ts`, `editor/editor.ts`, `inference.ts`, `symbolic.ts`, `plan.ts`, `explainPanel.ts`, `fourier.ts`, `escapeHtml`, `supabase.ts`, `schemaBlocks.ts`, `siteUpdate.ts`, `rich`, `latex.ts`, `spellcheck.ts`, `schema/templates.ts`?**
  _High betweenness centrality (0.128) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `Dove sono le cose` to `i18n.ts`, `vitest`, `main.ts`, `math/evaluate.ts`, `spec.ts`, `h`, `primitive.ts`, `Stroke`, `blockMove.ts`, `graph/preview.ts`, `explainSubjects.ts`, `svg.ts`, `xlsx.ts`, `SchemaEditor`, `markdown.ts`, `SheetEditor`, `namesIn`, `numerical.ts`, `toLatex`, `feedback.ts`, `schema/editor.ts`, `parse.ts`, `board.ts`, `ink.ts`, `NotesStore`, `graph/file.ts`, `gantt.ts`, `compile`, `Rational`, `assistant.ts`, `logic.ts`, `files.ts`, `complex.ts`, `study.ts`, `downloadText`, `tutorial.ts`, `topics.ts`, `Board`, `aiEn.test.ts`, `view3d.ts`, `chiSquareTest`, `MathError`, `vite.config.ts`, `functions.ts`, `toolbar.ts`, `board/shapes.ts`, `schema/shapes.ts`, `sidePanel.ts`, `sheet.ts`, `graph.ts`, `src/relocation.ts`, `finite.ts`, `ui/preview.ts`, `spreadsheet/editor.ts`, `spreadsheetEn.test.ts`, `num`, `probability.ts`, `inference.ts`, `symbolic.ts`, `plan.ts`, `explainPanel.ts`, `tutorial.mjs`, `fourier.ts`, `escapeHtml`, `supabase.ts`, `schemaBlocks.ts`, `siteUpdate.ts`, `rich`, `latex.ts`, `MarkdownEditor`, `strokes.ts`, `smoke-test.mjs`, `BoardStore`, `AiPanel`, `ExplainPanel`, `Sheet`?**
  _High betweenness centrality (0.104) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `i18n.ts`, `Dove sono le cose`, `main.ts`, `database.ts`, `h`, `graph/preview.ts`, `blockMove.ts`, `distributions.ts`, `svg.ts`, `statsShown.ts`, `xlsx.ts`, `feedback.ts`, `logo.ts`, `markdown.ts`, `schema/editor.ts`, `store.ts`, `parse.ts`, `board.ts`, `ink.ts`, `graph/file.ts`, `NotesStore`, `gantt.ts`, `tutorial.ts`, `Rational`, `assistant.ts`, `captcha.ts`, `translations.test.ts`, `resize.ts`, `topics.ts`, `view3d.ts`, `aiEn.test.ts`, `vite.config.ts`, `parseSchema`, `MathError`, `restore.ts`, `board/shapes.ts`, `graph.ts`, `page.ts`, `editor/lists.ts`, `src/relocation.ts`, `spreadsheet/editor.ts`, `spreadsheetEn.test.ts`, `num`, `editor/editor.ts`, `symbolsEn.test.ts`, `plan.ts`, `explainPanel.ts`, `supabase.ts`, `noteWordsMath.test.ts`, `schemaBlocks.ts`, `search.ts`, `siteUpdate.ts`, `spellcheck.ts`, `strokes.ts`, `FoldersStore`, `@codemirror/state`, `Sheet`?**
  _High betweenness centrality (0.086) - this node is a cross-community bridge._
- **Are the 331 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `tutorialModel()`) actually correct?**
  _`Dove sono le cose` has 331 INFERRED edges - model-reasoned connections that need verification._
- **What connects `L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota (14 ottobre 2026, se ne parla)`, `Account: i propri appunti su ogni dispositivo, anche da condividere`, `La lavagna: idee in più` to the rest of the system?**
  _879 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `i18n.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.047619047619047616 - nodes in this community are weakly interconnected._
- **Should `vitest` be split into smaller, more focused modules?**
  _Cohesion score 0.05202661826981246 - nodes in this community are weakly interconnected._