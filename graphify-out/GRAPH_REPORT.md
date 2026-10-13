# Graph Report - matherdown  (2026-10-13)

## Corpus Check
- 345 files · ~712,101 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5552 nodes · 20298 edges · 167 communities (124 shown, 43 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 672 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `68e8ae96`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- touchlog.ts
- vitest
- main.ts
- compile
- sync.ts
- spec.ts
- sql.ts
- num
- graph/preview.ts
- Dove sono le cose
- distributions.ts
- i18n.ts
- svg.ts
- parseMath
- SchemaEditor
- editor/editor.ts
- SheetEditor
- explainPanel.ts
- numerical.ts
- arithmetic.ts
- index.ts
- engine.ts
- schema/model.ts
- comments.ts
- store.ts
- Parser
- board.ts
- ui/preview.ts
- parse.ts
- several.ts
- gantt.ts
- study.ts
- view3d.ts
- calcResults.ts
- logic.ts
- noteWordsGraph.test.ts
- complex.ts
- namesIn
- translations.test.ts
- resize.ts
- ExplainPanel
- BoardStore
- localModels.ts
- FoldersStore
- functions.ts
- MathError
- assistant.ts
- Pt
- Rational
- board/shapes.ts
- schemaGuard.test.ts
- SidePanel
- Board
- suggestions.ts
- markdown.ts
- topics.ts
- 20261004091555_note_condivise.sql
- h
- database.ts
- latex.ts
- markers.ts
- dependencies
- Welcome to Glifo
- spreadsheet/editor.ts
- tutorial.ts
- odesolve.ts
- sheet.ts
- blockMove.ts
- blockMoveEditor.test.ts
- Benvenuto in Glifo
- compilerOptions
- relocation-test.mjs
- touchLog
- schema/templates.ts
- symbolic.ts
- MarkdownEditor
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- src/relocation.ts
- session-start.sh
- .claude/CLAUDE.md
- Il database degli account (Supabase)
- tutorial.mjs
- Abbonamenti
- smoke-test.mjs
- Costi
- supabase-stub.sql
- account-test.mjs
- schemaBlocks.ts
- aiPanel.test.ts
- Glifo – note per Claude
- schemaTools.test.ts
- symbolsEn.test.ts
- siteUpdate.ts
- graph/file.ts
- supabase.ts
- Distribution
- spellcheck.ts
- laplace.ts
- schema/shapes.ts
- inference.ts
- plan.ts
- toolbar.ts
- Preview
- render/lists.ts
- Parser
- Le spiegazioni, come funzionano
- strokes.ts
- Sheet
- logo.ts
- createFakeSupabase
- noteWordsMath.test.ts
- Schema
- Parser
- .constructor
- 20261008130026_commenti.sql
- .integral
- PreviewCallbacks
- spreadsheetEn.test.ts
- editor/lists.ts
- .folderItem
- La grafica: le otto richieste del 10 ottobre 2026
- Glifo
- vite
- suggest.ts
- spreadsheet/format.ts
- listCommands.test.ts
- linsys.ts
- mathEn2.test.ts
- numerical.test.ts
- @codemirror/state
- BlockMove
- La lavagna

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 309 edges
2. `MathError` - 151 edges
3. `Sheet` - 147 edges
4. `num()` - 145 edges
5. `MathNode` - 131 edges
6. `h()` - 127 edges
7. `mul()` - 124 edges
8. `texts` - 122 edges
9. `Board` - 118 edges
10. `compile()` - 116 edges

## Surprising Connections (you probably didn't know these)
- `Dove sono le cose` --references--> `fakeLlmWorker()`  [INFERRED]
  ARCHITETTURA.md → scripts/smoke-test.mjs
- `Dove sono le cose` --references--> `tutorialModel()`  [INFERRED]
  ARCHITETTURA.md → scripts/tutorial.mjs
- `Dove sono le cose` --references--> `ConicElements`  [INFERRED]
  ARCHITETTURA.md → src/math/conics.ts
- `4. Più modelli per «Spiegami»` --references--> `webllmId()`  [INFERRED]
  GRAFICA.md → src/ai/localModels.ts
- `Funzionalità` --references--> `k()`  [INFERRED]
  README.md → src/math/numerical.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (167 total, 43 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.09
Nodes (23): at(), browserStore, clip(), isSaved(), KINDS, LOG_KEY, LOG_MAX_LINES, LogStore (+15 more)

### Community 1 - "vitest"
Cohesion: 0.07
Nodes (33): vitest, staticGraphSvg(), chooseWindow(), specFor(), chooseBox(), GraphItem, parseGraph(), DrawOptions (+25 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (109): 2. La pagina dei commenti, tipo FAQ, newStrokeId(), remapGraphLines(), account, ACCOUNT_OFF, accountButton, active, aiShown() (+101 more)

### Community 3 - "compile"
Cohesion: 0.04
Nodes (115): depth(), integralRegion, LayeredSolid, Multiple, planeMargin(), PlanePart, radiusOf(), spaceLayers() (+107 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (32): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+24 more)

### Community 5 - "spec.ts"
Cohesion: 0.04
Nodes (129): conicItems(), isConicLine(), quadricEquation(), T, fourierItems(), isFourierLine(), T, isComplexLine() (+121 more)

### Community 6 - "sql.ts"
Cohesion: 0.16
Nodes (18): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+10 more)

### Community 7 - "num"
Cohesion: 0.11
Nodes (102): atIntegers(), withoutAbs(), exp(), hyperbolicToExp(), inverseRational(), sqrtEx(), termTransform(), polyEx() (+94 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (47): FIGURE_PALETTE, addLabel(), boxes, cameras, complexCoord(), coord(), coordinates(), drawings (+39 more)

### Community 9 - "Dove sono le cose"
Cohesion: 0.05
Nodes (78): Dove sono le cose, Glifo – architettura, allNames(), answerFollowUp(), bareResult(), chatContext, ChatFn, chatSubject() (+70 more)

### Community 10 - "distributions.ts"
Cohesion: 0.14
Nodes (31): addExp(), choose(), continuousQuantile(), decimals(), expSumValue(), factorialBig(), FAMILIES, integerParam() (+23 more)

### Community 11 - "i18n.ts"
Cohesion: 0.05
Nodes (45): browserLang(), browserLanguages(), dateLocale(), detectLang(), Entry, isLang(), lang, LANGUAGES (+37 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (57): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), dataWindow(), decimalText() (+49 more)

### Community 13 - "parseMath"
Cohesion: 0.18
Nodes (16): errorMessage(), MathSyntaxError, parseMath(), parseStatement(), error(), result(), value(), calcError() (+8 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.09
Nodes (12): isLanes(), SchemaEditor, withLaneContents(), createEdgeCell(), edgeLook(), isNodeLook(), nodeLook(), nodeStyle() (+4 more)

### Community 15 - "editor/editor.ts"
Cohesion: 0.05
Nodes (46): description, name, private, type, version, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/lang-markdown (+38 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (5): functionLabel(), SheetEditor, englishTyping(), CellRange, cloneSheet()

### Community 17 - "explainPanel.ts"
Cohesion: 0.11
Nodes (32): explainTarget, Explanation, REPLY_TOKENS, schemaTitle(), formulasUntil(), explanationMarkdown(), hasCalculation(), insertAfterBlock() (+24 more)

### Community 18 - "numerical.ts"
Cohesion: 0.12
Nodes (48): bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial(), interpolating() (+40 more)

### Community 19 - "arithmetic.ts"
Cohesion: 0.06
Nodes (80): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+72 more)

### Community 20 - "index.ts"
Cohesion: 0.06
Nodes (46): b, bigops, c, calculus, fn, fr, fractions, functions (+38 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "schema/model.ts"
Cohesion: 0.06
Nodes (44): schemaSummary(), svg(), openSchemaEditor(), schemasFromFile(), unhide(), Look, ARROWS, COLOR_NAMES (+36 more)

### Community 23 - "comments.ts"
Cohesion: 0.09
Nodes (26): vite-plugin-pwa, accountOffMessage(), Site, T, commentDate(), commentItem(), COMMENTS_MAX, CommentsDeps (+18 more)

### Community 24 - "store.ts"
Cohesion: 0.09
Nodes (16): fake-indexeddb, BoardBackend, BoardData, done(), fromRecord(), IdbBoards, ofNote(), openBoardDatabase() (+8 more)

### Community 26 - "board.ts"
Cohesion: 0.05
Nodes (53): Action, ACTION_NAMES, coalesced(), DOT_SIZES, DrawAction, EraseAction, EraserMode, Finger (+45 more)

### Community 27 - "ui/preview.ts"
Cohesion: 0.16
Nodes (15): GraphLabels, BlockKind, MoveDir, hydrateSheets(), T, BLOCK_NAMES, blockMovedMessage(), BlockNames (+7 more)

### Community 28 - "parse.ts"
Cohesion: 0.06
Nodes (37): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, DISTRIBUTION_EXAMPLES, distributionExample() (+29 more)

### Community 29 - "several.ts"
Cohesion: 0.07
Nodes (56): EMPTY_SCOPE, Piece, Condition, Family, Group, Root, Shape, convergesAt() (+48 more)

### Community 30 - "gantt.ts"
Cohesion: 0.05
Nodes (86): searchPhrases(), amount(), barColor(), crossings(), dateText(), dayMonth(), dayOf(), fitText() (+78 more)

### Community 31 - "study.ts"
Cohesion: 0.14
Nodes (38): limit(), breaks(), periodOf(), Asymptote, asymptoteText(), compiled(), cutsOf(), defined() (+30 more)

### Community 32 - "view3d.ts"
Cohesion: 0.06
Nodes (86): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+78 more)

### Community 33 - "calcResults.ts"
Cohesion: 0.11
Nodes (13): @lezer/common, acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult, calcResults(), CheckWidget (+5 more)

### Community 34 - "logic.ts"
Cohesion: 0.13
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "noteWordsGraph.test.ts"
Cohesion: 0.10
Nodes (31): @codemirror/view, sheetBefore(), addToGraphBlock(), formulaAtCursor(), GraphLabelLines, insertGraphBlock(), LABEL_KEYS, setGraphLabels() (+23 more)

### Community 36 - "complex.ts"
Cohesion: 0.05
Nodes (85): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexValue(), isInequality() (+77 more)

### Community 37 - "namesIn"
Cohesion: 0.11
Nodes (41): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+33 more)

### Community 38 - "translations.test.ts"
Cohesion: 0.17
Nodes (18): AstNode, calleeName(), check(), checkPair(), visit(), children(), entryPairs(), files (+10 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (24): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+16 more)

### Community 40 - "ExplainPanel"
Cohesion: 0.15
Nodes (5): ExplainChat, ExplainPanel, preventFocusSteal(), formulasSummary(), setup()

### Community 41 - "BoardStore"
Cohesion: 0.08
Nodes (15): BoardStore, MemoryBoards, applyAccountChange(), backup(), BackupNote, backupNotes(), restoreBackup(), RestoreBoards (+7 more)

### Community 42 - "localModels.ts"
Cohesion: 0.07
Nodes (39): @mlc-ai/web-llm, FollowUp, chat(), GlifoError, Gpu, load(), post(), remove() (+31 more)

### Community 43 - "FoldersStore"
Cohesion: 0.16
Nodes (4): cleanFolderName(), FoldersStore, sameName(), names()

### Community 44 - "functions.ts"
Cohesion: 0.07
Nodes (67): ChartTable, CellResult, EMPTY, evaluateSheet(), number(), SheetEvaluator, T, addFormat() (+59 more)

### Community 45 - "MathError"
Cohesion: 0.10
Nodes (63): MathError, angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, dataOf() (+55 more)

### Community 46 - "assistant.ts"
Cohesion: 0.07
Nodes (45): AiAnswer, AiError, AiResult, AiSettings, answerSchema(), askAi(), askCompatible(), askThroughHost() (+37 more)

### Community 47 - "Pt"
Cohesion: 0.17
Nodes (7): clampZoom(), MoveAction, pressureOf(), validView(), Transform, EllipseFit, Pt

### Community 48 - "Rational"
Cohesion: 0.08
Nodes (39): Part, R(), bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactFunction, ExactRandom (+31 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.14
Nodes (34): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+26 more)

### Community 50 - "schemaGuard.test.ts"
Cohesion: 0.11
Nodes (16): toggleLinePrefix(), applyListStyle(), LIST_STYLES, besideSchema(), BlockWidget, findWidgetBlocks(), guardBlocks(), schemaBlockRanges() (+8 more)

### Community 51 - "SidePanel"
Cohesion: 0.17
Nodes (8): localizeTex(), cleanKatexError(), isConfidentAnswer(), cardPreview(), displayCode(), formPreview(), preventFocusSteal(), SidePanel

### Community 53 - "suggestions.ts"
Cohesion: 0.16
Nodes (12): EditorMathContext, expand(), preferredIndex(), SuggestionController, commandNames(), cardPreviewTex(), formPreviewTex(), ParsedTemplate (+4 more)

### Community 54 - "markdown.ts"
Cohesion: 0.11
Nodes (36): katex, labelHtml(), texHtml(), dataRange(), checkHtml(), checkTitle(), T, cache (+28 more)

### Community 55 - "topics.ts"
Cohesion: 0.10
Nodes (45): ATTRIBUTES, cut(), ER_SHAPES, fieldText(), fitLines(), flowOrder(), formulaText(), FREE_NAMES (+37 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "h"
Cohesion: 0.03
Nodes (113): 3. Le impostazioni divise in sezioni, SyncStatus, AI_SERVICES, aiService, aiSettingsOf(), T, T, rich() (+105 more)

### Community 58 - "database.ts"
Cohesion: 0.21
Nodes (7): @electric-sql/pglite, createDatabase(), createUser(), databaseTests(), feedbackTests(), migrations, shareTests()

### Community 59 - "latex.ts"
Cohesion: 0.07
Nodes (53): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+45 more)

### Community 60 - "markers.ts"
Cohesion: 0.19
Nodes (22): bullet(), childMarker(), column(), firstMarker(), label(), lettersMarker(), MarkerKind, MarkerStyle (+14 more)

### Community 61 - "dependencies"
Cohesion: 0.04
Nodes (44): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+36 more)

### Community 62 - "Welcome to Glifo"
Cohesion: 0.20
Nodes (9): A few examples, Calculations and graphs, For programming too, Handy shortcuts, How to write formulas, Lists, Spell check, Try it now (+1 more)

### Community 63 - "spreadsheet/editor.ts"
Cohesion: 0.08
Nodes (58): tablesNote(), currentCall(), Editing, MenuEntry, Move, openSheetEditor(), PATHS, SheetEditorOptions (+50 more)

### Community 64 - "tutorial.ts"
Cohesion: 0.15
Nodes (12): HINT_MS, markTutorialSeen(), openTutorial(), show(), richText(), showTutorialHint(), close(), T (+4 more)

### Community 65 - "odesolve.ts"
Cohesion: 0.08
Nodes (79): addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames(), constantParticular() (+71 more)

### Community 66 - "sheet.ts"
Cohesion: 0.08
Nodes (56): characteristicPolynomial(), Eigenvalue, Lin, LinearValue, NUMERICAL, bracketParts(), BRACKETS, CHECK_VALUES (+48 more)

### Community 67 - "blockMove.ts"
Cohesion: 0.22
Nodes (17): blank(), blockPlace(), closed(), closeIdx(), fenceClosed(), findBlock(), invisible(), markMoves() (+9 more)

### Community 68 - "blockMoveEditor.test.ts"
Cohesion: 0.18
Nodes (16): @codemirror/commands, blockMoved, blockMoves(), blockMoveTransaction(), LineMap, contentHash(), fenceName(), MOVABLE (+8 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "relocation-test.mjs"
Cohesion: 0.18
Nodes (7): AFTER_MOVE, ids, newBrowser(), NOTICE_DAY, out, serve(), TYPES

### Community 72 - "touchLog"
Cohesion: 0.27
Nodes (4): 7. Via il registro dei tocchi, movesLine(), seconds(), touchLog

### Community 73 - "schema/templates.ts"
Cohesion: 0.23
Nodes (17): SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), conceptMap(), cycle(), edge(), er() (+9 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (57): linearIn(), primitive(), verified(), linearCells(), atValues(), Converter, coordinates(), decimalText() (+49 more)

### Community 75 - "MarkdownEditor"
Cohesion: 0.10
Nodes (14): ExplainTone, closeMathBlockOnEnter(), EditorCallbacks, MarkdownEditor, tabOutOfMath(), insertTemplate(), Settings, AiWork (+6 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Errore o imprevisto → nel dettaglio, 3. Serve una decisione → frasi complete, 4. Fine del compito → un solo riepilogo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.06
Nodes (51): alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ALIGN_NAMES, ARROW_NAMES (+43 more)

### Community 79 - "src/relocation.ts"
Cohesion: 0.04
Nodes (104): 1. «Cambia account», accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount() (+96 more)

### Community 82 - "Il database degli account (Supabase)"
Cohesion: 0.14
Nodes (13): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il controllo anti-robot (CAPTCHA, ottobre 2026), Il database degli account (Supabase), Il progetto, Il trasloco su glifo.page (ottobre 2026) (+5 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.11
Nodes (11): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+3 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.08
Nodes (25): Abbonamenti, Classico, gratis: per scrivere e controllare, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Deciso (5 ottobre 2026) (+17 more)

### Community 91 - "smoke-test.mjs"
Cohesion: 0.15
Nodes (6): markdown-it, playwright-core, PNG_ICONS, fakeLlmWorker(), firstVisit(), plainContext

### Community 92 - "Costi"
Cohesion: 0.22
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 96 - "account-test.mjs"
Cohesion: 0.11
Nodes (10): device(), login(), newContext, waitFor(), b64(), CAPTCHA_TOKEN, CODE, GOOGLE_CODE (+2 more)

### Community 97 - "schemaBlocks.ts"
Cohesion: 0.12
Nodes (25): KINDS, T, WidgetBlock, markdownForFile(), placeChart(), blockKind, blockWord(), findFencedBlocks() (+17 more)

### Community 98 - "aiPanel.test.ts"
Cohesion: 0.09
Nodes (20): definedName(), formulaTopic(), graphTopic(), numberText(), studyOf(), NoteSubject, AI_NEWS_TITLE, AI_WORKING_TITLE (+12 more)

### Community 100 - "Glifo – note per Claude"
Cohesion: 0.11
Nodes (18): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole (+10 more)

### Community 101 - "schemaTools.test.ts"
Cohesion: 0.14
Nodes (25): laneOf(), fieldInput(), textWidth(), cellHtml(), crc32(), withDensity(), labelHtml(), lanesHtml() (+17 more)

### Community 102 - "symbolsEn.test.ts"
Cohesion: 0.14
Nodes (28): editDistance(), normalizeText(), singular(), stem(), STOPWORDS, words(), BOTH, buildIndex() (+20 more)

### Community 103 - "siteUpdate.ts"
Cohesion: 0.15
Nodes (20): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, loadPart() (+12 more)

### Community 104 - "graph/file.ts"
Cohesion: 0.10
Nodes (36): figureName(), graphFigure(), graphImage(), graphImagesFor(), OPEN, swatchSvg(), T, titleBand() (+28 more)

### Community 105 - "supabase.ts"
Cohesion: 0.06
Nodes (55): @supabase/supabase-js, captchaToken(), loadTurnstile(), Turnstile, TURNSTILE_SCRIPT, Window, AUTH_STORAGE_KEY, SUPABASE_KEY (+47 more)

### Community 106 - "Distribution"
Cohesion: 0.15
Nodes (11): discreteQuantile(), Distribution, exactIntervalProbability(), expSum, integerRange(), intervalProbability(), pValue(), TestResult (+3 more)

### Community 107 - "spellcheck.ts"
Cohesion: 0.10
Nodes (21): misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt(), openAt() (+13 more)

### Community 108 - "laplace.ts"
Cohesion: 0.11
Nodes (45): factoredPolynomial(), integerPoly(), oneFraction(), beyondPoles(), compiled(), E, fractionShown(), HALF (+37 more)

### Community 113 - "schema/shapes.ts"
Cohesion: 0.08
Nodes (17): @maxgraph/core, ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape (+9 more)

### Community 116 - "inference.ts"
Cohesion: 0.14
Nodes (27): between(), chiSquareTest(), confidence(), confidenceShown(), decimals(), Given, hypothesisTest(), InferenceContext (+19 more)

### Community 117 - "plan.ts"
Cohesion: 0.12
Nodes (22): ITALIAN, NumberStyle, cellText(), columnRole(), columnsOf(), durationUnit(), isNumber(), isPlanRange() (+14 more)

### Community 118 - "toolbar.ts"
Cohesion: 0.18
Nodes (15): insertBlock(), wrapSelection(), Action, createToolbar(), insertCode(), insertLink(), listStyle(), MenuItem (+7 more)

### Community 119 - "Preview"
Cohesion: 0.21
Nodes (4): blockHiddenMessage(), blockKindOf(), hidden(), Preview

### Community 120 - "render/lists.ts"
Cohesion: 0.23
Nodes (15): Item, ListStyle, bulletGroup(), ListLine, Marker, sameList(), alignInside(), asciiTrim() (+7 more)

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "strokes.ts"
Cohesion: 0.09
Nodes (38): centerOn(), copyStrokes(), cross(), handleScale(), IDENTITY, insideLasso(), keepInside(), LASSO_SHARE (+30 more)

### Community 124 - "Sheet"
Cohesion: 0.06
Nodes (38): criticalLine(), named(), severalItems(), surface(), T, ExactComplexScope, Ode, withWorkLimit() (+30 more)

### Community 125 - "logo.ts"
Cohesion: 0.33
Nodes (6): sidebarToggle(), BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark()

### Community 128 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 129 - "noteWordsMath.test.ts"
Cohesion: 0.07
Nodes (27): BLOCKS, FROM_ENGLISH, FUNCTIONS, functionWordPairs(), GRAPH_KEY_FORMS, GRAPH_KEY_LINE, GRAPH_KEYS, GraphKey (+19 more)

### Community 132 - "Schema"
Cohesion: 0.33
Nodes (4): SchemaEditorOptions, Schema, serializeSchema(), Template

### Community 136 - ".constructor"
Cohesion: 0.14
Nodes (3): BoardOptions, loadPrefs(), highlightName()

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 141 - "spreadsheetEn.test.ts"
Cohesion: 0.07
Nodes (67): RFC-4180, fflate, csvCell(), csvDelimiter(), csvNumbers(), csvToSheet(), digitsOf(), field() (+59 more)

### Community 142 - "editor/lists.ts"
Cohesion: 0.22
Nodes (25): continueList(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext(), isBlank(), isNumbered() (+17 more)

### Community 143 - ".folderItem"
Cohesion: 0.21
Nodes (5): saveClosedFolders(), Note, NoteMeta, NotesPanel, NotesPanelDeps

### Community 144 - "La grafica: le otto richieste del 10 ottobre 2026"
Cohesion: 0.29
Nodes (7): 4. Più modelli per «Spiegami», 5. A cosa serve la chiave dell'AI, 6. Glifo anche in inglese, 8. Il pulsante ✨ con il contorno, Gli abbonamenti, in tutto questo, In che ordine, La grafica: le otto richieste del 10 ottobre 2026

### Community 146 - "Glifo"
Cohesion: 0.12
Nodes (16): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Commenti, Compatibilità con VS Code, Condividere una nota con un link (+8 more)

### Community 154 - "vite"
Cohesion: 0.29
Nodes (4): vite, minutes, postMessage(), started

### Community 156 - "suggest.ts"
Cohesion: 0.22
Nodes (12): SuggestionItem, IndexedEntry, SearchResult, getIndex(), isSubsequence(), keysOf(), MatchKind, suggestCommands() (+4 more)

### Community 157 - "spreadsheet/format.ts"
Cohesion: 0.09
Nodes (42): at(), breakEven(), Point, quantity(), T, tableItems(), textLabel(), chartData (+34 more)

### Community 158 - "listCommands.test.ts"
Cohesion: 0.33
Nodes (5): deleteListMarker(), noIndentedCode, CommandTarget, run(), setup()

### Community 159 - "linsys.ts"
Cohesion: 0.04
Nodes (93): decimalSeparator(), Digits, formatNumber(), FormatOptions, formatRational(), fromNumber(), fromRational(), SUPERSCRIPT (+85 more)

### Community 160 - "mathEn2.test.ts"
Cohesion: 0.38
Nodes (6): EMPTY_COMPLEX_SCOPE, args(), q(), result(), tex(), text()

### Community 161 - "numerical.test.ts"
Cohesion: 0.60
Nodes (3): result(), text(), verdict()

### Community 162 - "@codemirror/state"
Cohesion: 0.08
Nodes (29): @codemirror/state, InsertOptions, templateInsertion(), CODE_NODES, CommandToken, commandTokenAt(), isInCode(), MATH_NODES (+21 more)

### Community 167 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

## Knowledge Gaps
- **863 isolated node(s):** `Comandi`, `Regole`, `6. Glifo anche in inglese`, `8. Il pulsante ✨ con il contorno`, `Gli abbonamenti, in tutto questo` (+858 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1178 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **43 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `texts` connect `h` to `main.ts`, `compile`, `spec.ts`, `sql.ts`, `graph/preview.ts`, `Dove sono le cose`, `distributions.ts`, `i18n.ts`, `svg.ts`, `spreadsheetEn.test.ts`, `editor/lists.ts`, `editor/editor.ts`, `explainPanel.ts`, `numerical.ts`, `arithmetic.ts`, `index.ts`, `schema/model.ts`, `comments.ts`, `board.ts`, `ui/preview.ts`, `parse.ts`, `spreadsheet/format.ts`, `gantt.ts`, `linsys.ts`, `several.ts`, `calcResults.ts`, `logic.ts`, `study.ts`, `complex.ts`, `namesIn`, `resize.ts`, `BoardStore`, `localModels.ts`, `functions.ts`, `MathError`, `assistant.ts`, `Rational`, `markdown.ts`, `topics.ts`, `latex.ts`, `spreadsheet/editor.ts`, `tutorial.ts`, `odesolve.ts`, `sheet.ts`, `schema/templates.ts`, `symbolic.ts`, `schema/editor.ts`, `src/relocation.ts`, `schemaBlocks.ts`, `aiPanel.test.ts`, `siteUpdate.ts`, `graph/file.ts`, `supabase.ts`, `spellcheck.ts`, `laplace.ts`, `inference.ts`, `plan.ts`, `toolbar.ts`, `Sheet`?**
  _High betweenness centrality (0.134) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `Dove sono le cose` to `touchlog.ts`, `vitest`, `main.ts`, `compile`, `spec.ts`, `num`, `graph/preview.ts`, `i18n.ts`, `svg.ts`, `spreadsheetEn.test.ts`, `SchemaEditor`, `PreviewCallbacks`, `SheetEditor`, `explainPanel.ts`, `numerical.ts`, `arithmetic.ts`, `comments.ts`, `Parser`, `board.ts`, `ui/preview.ts`, `parse.ts`, `spreadsheet/format.ts`, `gantt.ts`, `linsys.ts`, `view3d.ts`, `several.ts`, `logic.ts`, `noteWordsGraph.test.ts`, `complex.ts`, `namesIn`, `study.ts`, `ExplainPanel`, `BoardStore`, `localModels.ts`, `functions.ts`, `MathError`, `assistant.ts`, `Pt`, `Rational`, `board/shapes.ts`, `schemaGuard.test.ts`, `SidePanel`, `Board`, `markdown.ts`, `topics.ts`, `h`, `latex.ts`, `spreadsheet/editor.ts`, `tutorial.ts`, `odesolve.ts`, `sheet.ts`, `blockMove.ts`, `blockMoveEditor.test.ts`, `touchLog`, `symbolic.ts`, `MarkdownEditor`, `src/relocation.ts`, `tutorial.mjs`, `smoke-test.mjs`, `schemaBlocks.ts`, `aiPanel.test.ts`, `schemaTools.test.ts`, `siteUpdate.ts`, `graph/file.ts`, `supabase.ts`, `schema/shapes.ts`, `inference.ts`, `plan.ts`, `toolbar.ts`, `Preview`, `strokes.ts`, `Sheet`, `logo.ts`?**
  _High betweenness centrality (0.100) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `touchlog.ts`, `noteWordsMath.test.ts`, `sql.ts`, `num`, `graph/preview.ts`, `Dove sono le cose`, `distributions.ts`, `i18n.ts`, `svg.ts`, `parseMath`, `spreadsheetEn.test.ts`, `editor/editor.ts`, `schema/model.ts`, `comments.ts`, `store.ts`, `board.ts`, `parse.ts`, `spreadsheet/format.ts`, `gantt.ts`, `linsys.ts`, `view3d.ts`, `listCommands.test.ts`, `@codemirror/state`, `noteWordsGraph.test.ts`, `mathEn2.test.ts`, `numerical.test.ts`, `translations.test.ts`, `resize.ts`, `BoardStore`, `localModels.ts`, `MathError`, `assistant.ts`, `board/shapes.ts`, `schemaGuard.test.ts`, `suggestions.ts`, `h`, `database.ts`, `markers.ts`, `spreadsheet/editor.ts`, `tutorial.ts`, `blockMoveEditor.test.ts`, `MarkdownEditor`, `src/relocation.ts`, `schemaBlocks.ts`, `aiPanel.test.ts`, `schemaTools.test.ts`, `symbolsEn.test.ts`, `siteUpdate.ts`, `graph/file.ts`, `supabase.ts`, `laplace.ts`, `plan.ts`, `strokes.ts`, `Sheet`, `logo.ts`?**
  _High betweenness centrality (0.074) - this node is a cross-community bridge._
- **Are the 308 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `tutorialModel()`) actually correct?**
  _`Dove sono le cose` has 308 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Comandi`, `Regole`, `6. Glifo anche in inglese` to the rest of the system?**
  _863 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `touchlog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09475806451612903 - nodes in this community are weakly interconnected._
- **Should `vitest` be split into smaller, more focused modules?**
  _Cohesion score 0.06936026936026936 - nodes in this community are weakly interconnected._