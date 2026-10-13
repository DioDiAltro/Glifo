# Graph Report - matherdown  (2026-10-12)

## Corpus Check
- 339 files · ~704,338 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5496 nodes · 20109 edges · 162 communities (125 shown, 37 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 654 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9fa99c0f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- touchlog.ts
- parseGraph
- main.ts
- compile
- sync.ts
- spec.ts
- schemaEn.test.ts
- num
- graph/preview.ts
- Dove sono le cose
- mathEn2.test.ts
- i18n.ts
- svg.ts
- toLatex
- SchemaEditor
- package.json
- SheetEditor
- explainSubjects.ts
- numerical.ts
- arithmetic.ts
- index.ts
- client.ts
- linsys.ts
- feedback.ts
- store.ts
- Parser
- Pt
- ui/preview.ts
- domain.ts
- several.ts
- gantt.ts
- study.ts
- view3d.ts
- texts
- logic.ts
- noteWords.ts
- complex.ts
- namesIn
- translations.test.ts
- resize.ts
- ExplainPanel
- restore.ts
- explainPanel.ts
- FoldersStore
- functions.ts
- MathError
- assistant.ts
- ink.ts
- Rational
- board/shapes.ts
- .int
- sidePanel.ts
- Board
- supabase.ts
- markdown.ts
- spreadsheetEn.test.ts
- 20261004091555_note_condivise.sql
- ui/relocation.ts
- database.ts
- finite.ts
- NotesStore
- dependencies
- Welcome to Glifo
- spreadsheet/editor.ts
- probability.ts
- odesolve.ts
- formatNumber
- parseSchema
- blockMove.ts
- Benvenuto in Glifo
- compilerOptions
- relocation-test.mjs
- touchLog
- files.ts
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
- aiActivity.ts
- Glifo – note per Claude
- schema/file.ts
- symbolsEn.test.ts
- siteUpdate.ts
- vitest
- page.ts
- spreadsheet/format.ts
- noteWordsMath.test.ts
- schema/templates.ts
- schema/shapes.ts
- parse.ts
- plan.ts
- toolbar.ts
- grafo-html.mjs
- boardTouchLog.test.ts
- engine.ts
- Le spiegazioni, come funzionano
- board.ts
- Sheet
- BoardOptions
- createFakeSupabase
- deploy.test.ts
- template.ts
- pick
- .constructor
- 20261008130026_commenti.sql
- limits.ts
- captcha.ts
- xlsx.ts
- editor/lists.ts
- spellcheck
- PlanView
- Glifo
- graph.ts
- topics.ts
- sheet.ts
- statsGraph.ts
- editor/editor.ts

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 294 edges
2. `MathError` - 151 edges
3. `Sheet` - 147 edges
4. `num()` - 145 edges
5. `MathNode` - 131 edges
6. `mul()` - 124 edges
7. `texts` - 120 edges
8. `h()` - 120 edges
9. `Board` - 118 edges
10. `compile()` - 116 edges

## Surprising Connections (you probably didn't know these)
- `Dove sono le cose` --references--> `fakeLlmWorker()`  [INFERRED]
  ARCHITETTURA.md → scripts/smoke-test.mjs
- `Dove sono le cose` --references--> `tutorialModel()`  [INFERRED]
  ARCHITETTURA.md → scripts/tutorial.mjs
- `Il controllo anti-robot (CAPTCHA, ottobre 2026)` --references--> `captchaToken()`  [INFERRED]
  supabase/README.md → src/account/captcha.ts
- `4. Più modelli per «Spiegami»` --references--> `webllmId()`  [INFERRED]
  GRAFICA.md → src/ai/localModels.ts
- `Come viene pubblicata` --references--> `dist()`  [INFERRED]
  README.md → src/board/shapes.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (162 total, 37 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.15
Nodes (16): at(), browserStore, clip(), KINDS, LOG_KEY, Moves, MOVES_MAX, pointerDetail() (+8 more)

### Community 1 - "parseGraph"
Cohesion: 0.07
Nodes (28): GraphItem, parseGraph(), light, text(), text(), light, pts, result() (+20 more)

### Community 2 - "main.ts"
Cohesion: 0.03
Nodes (134): newStrokeId(), addToGraphBlock(), remapGraphLines(), account, ACCOUNT_OFF, active, aiShown(), aiToggle (+126 more)

### Community 3 - "compile"
Cohesion: 0.08
Nodes (46): areaFor(), constantValue(), argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot() (+38 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (31): AccountSync, withLock(), Account, EMPTY_STATE, FolderChange, FolderRow, isEmpty(), iso() (+23 more)

### Community 5 - "spec.ts"
Cohesion: 0.07
Nodes (77): conicItems(), isConicLine(), quadricEquation(), T, FieldContext, multipleOf(), isSeveralLine(), areaOf() (+69 more)

### Community 6 - "schemaEn.test.ts"
Cohesion: 0.10
Nodes (26): @electric-sql/pglite, openSchemaEditor(), SchemaEditorOptions, COLOR_NAMES, Schema, SHAPE_NAMES, Column, DEFAULT_TYPE (+18 more)

### Community 7 - "num"
Cohesion: 0.13
Nodes (89): atIntegers(), withoutAbs(), exp(), hyperbolicToExp(), inverseRational(), sqrtEx(), termTransform(), polyEx() (+81 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (43): addLabel(), boxes, cameras, complexCoord(), coord(), coordinates(), drawings, drawnViews (+35 more)

### Community 9 - "Dove sono le cose"
Cohesion: 0.05
Nodes (83): Dove sono le cose, Glifo – architettura, allNames(), answerFollowUp(), bareResult(), chatContext, ChatFn, chatSubject() (+75 more)

### Community 10 - "mathEn2.test.ts"
Cohesion: 0.06
Nodes (71): addExp(), choose(), continuousQuantile(), decimals(), discreteQuantile(), Distribution, exactIntervalProbability(), expSum (+63 more)

### Community 11 - "i18n.ts"
Cohesion: 0.05
Nodes (69): 3. Le impostazioni divise in sezioni, SyncStatus, browserLang(), browserLanguages(), dateLocale(), detectLang(), Entry, lang (+61 more)

### Community 12 - "svg.ts"
Cohesion: 0.07
Nodes (63): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseWindow(), chooseY(), clipLines(), dataWindow() (+55 more)

### Community 13 - "toLatex"
Cohesion: 0.08
Nodes (39): fourierItems(), isFourierLine(), T, multipleLabel(), names(), studyItems(), T, partialSum() (+31 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.10
Nodes (7): isLanes(), SchemaEditor, withLaneContents(), serializeSchema(), downloadBlob(), downloadText(), fileNameFor()

### Community 15 - "package.json"
Cohesion: 0.06
Nodes (35): description, devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript (+27 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (9): functionLabel(), SheetEditor, englishTyping(), serializeSheet(), sheetSize(), CellRange, clearRange(), cloneSheet() (+1 more)

### Community 17 - "explainSubjects.ts"
Cohesion: 0.14
Nodes (26): explainTarget, Explanation, schemaTitle(), formulasUntil(), sheetBefore(), explanationMarkdown(), hasCalculation(), insertAfterBlock() (+18 more)

### Community 18 - "numerical.ts"
Cohesion: 0.12
Nodes (48): bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial(), interpolating() (+40 more)

### Community 19 - "arithmetic.ts"
Cohesion: 0.07
Nodes (78): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+70 more)

### Community 20 - "index.ts"
Cohesion: 0.06
Nodes (45): b, bigops, c, calculus, fn, fr, fractions, functions (+37 more)

### Community 21 - "client.ts"
Cohesion: 0.10
Nodes (13): Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download(), fetchDictionary() (+5 more)

### Community 22 - "linsys.ts"
Cohesion: 0.06
Nodes (69): Scope, eigenvalues(), interpolateFloat(), LinearScope, splitRoot(), surdText(), choices(), gcd() (+61 more)

### Community 23 - "feedback.ts"
Cohesion: 0.09
Nodes (38): SUPABASE_KEY, SUPABASE_URL, accountOffMessage(), Site, T, commentDate(), commentItem(), COMMENTS_MAX (+30 more)

### Community 24 - "store.ts"
Cohesion: 0.06
Nodes (22): fake-indexeddb, Prefs, BoardPalette, BoardBackend, BoardStore, done(), fromRecord(), IdbBoards (+14 more)

### Community 25 - "Parser"
Cohesion: 0.12
Nodes (16): errorMessage(), describe(), MathSyntaxError, parseMath(), Parser, parseStatement(), error(), result() (+8 more)

### Community 26 - "Pt"
Cohesion: 0.14
Nodes (10): clampZoom(), MoveAction, PanAction, PinchAction, pressureOf(), validView(), Transform, EllipseFit (+2 more)

### Community 27 - "ui/preview.ts"
Cohesion: 0.10
Nodes (17): GraphLabels, BlockKind, MoveDir, BLOCK_NAMES, blockHiddenMessage(), blockKindOf(), blockMovedMessage(), BlockNames (+9 more)

### Community 28 - "domain.ts"
Cohesion: 0.08
Nodes (51): constantIntegrand(), depth(), inequalityMargin(), integralRegion, LayeredSolid, Multiple, planeMargin(), PlanePart (+43 more)

### Community 29 - "several.ts"
Cohesion: 0.05
Nodes (101): criticalLine(), named(), severalItems(), surface(), T, close(), Definite, definiteIntegral() (+93 more)

### Community 30 - "gantt.ts"
Cohesion: 0.06
Nodes (71): searchPhrases(), amount(), barColor(), crossings(), dateText(), dayMonth(), dayOf(), fitText() (+63 more)

### Community 31 - "study.ts"
Cohesion: 0.14
Nodes (38): limit(), Asymptote, asymptoteText(), boundaries(), compiled(), cutsOf(), defined(), domainOf() (+30 more)

### Community 32 - "view3d.ts"
Cohesion: 0.06
Nodes (88): addMesh(), addTet(), affinePlane(), Axis, centroid(), chooseBox(), clipBy(), clipPolygon() (+80 more)

### Community 33 - "texts"
Cohesion: 0.06
Nodes (46): definedName(), formulaTopic(), graphTopic(), numberText(), studyOf(), acceptCalcResult(), CalcCheck, calcOutcomes() (+38 more)

### Community 34 - "logic.ts"
Cohesion: 0.11
Nodes (30): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+22 more)

### Community 35 - "noteWords.ts"
Cohesion: 0.08
Nodes (41): formulaAtCursor(), GraphLabelLines, insertGraphBlock(), LABEL_KEYS, setGraphLabels(), monthOf(), MONTHS, MONTHS_EN (+33 more)

### Community 36 - "complex.ts"
Cohesion: 0.06
Nodes (67): COMPLEX_FUNCTIONS, farthest(), gaussItem(), hasExponential(), inZ(), isComplexLine(), isComplexValue(), isInequality() (+59 more)

### Community 37 - "namesIn"
Cohesion: 0.12
Nodes (39): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+31 more)

### Community 38 - "translations.test.ts"
Cohesion: 0.17
Nodes (18): AstNode, calleeName(), check(), checkPair(), visit(), children(), entryPairs(), files (+10 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (24): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+16 more)

### Community 40 - "ExplainPanel"
Cohesion: 0.15
Nodes (5): MathRegion, ExplainChat, ExplainPanel, preventFocusSteal(), setup()

### Community 41 - "restore.ts"
Cohesion: 0.22
Nodes (10): BackupNote, backupNotes(), restoreBackup(), RestoreBoards, Restored, restoredMessage(), T, time() (+2 more)

### Community 42 - "explainPanel.ts"
Cohesion: 0.06
Nodes (50): @mlc-ai/web-llm, ExplainTone, FollowUp, REPLY_TOKENS, chat(), GlifoError, Gpu, load() (+42 more)

### Community 43 - "FoldersStore"
Cohesion: 0.08
Nodes (14): cleanFolderName(), Folder, FolderGroup, FoldersStore, groupByFolder(), loadClosedFolders(), sameName(), saveClosedFolders() (+6 more)

### Community 44 - "functions.ts"
Cohesion: 0.09
Nodes (58): EMPTY, number(), T, addFormat(), tidy(), FormulaNode, Arg, ARGS (+50 more)

### Community 45 - "MathError"
Cohesion: 0.12
Nodes (58): MathError, angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, dataOf() (+50 more)

### Community 46 - "assistant.ts"
Cohesion: 0.12
Nodes (25): AiAnswer, AiError, AiSettings, answerSchema(), askAi(), askCompatible(), askThroughHost(), capitalized() (+17 more)

### Community 47 - "ink.ts"
Cohesion: 0.16
Nodes (13): perfect-freehand, BOARD_PALETTES, BoardTheme, inkName(), mid(), outlineSvg(), PEN_SIZE, shapeSvg() (+5 more)

### Community 48 - "Rational"
Cohesion: 0.08
Nodes (48): Part, at(), centralCanonical(), Coefficients, coneCanonical(), conicOf(), det2(), det3() (+40 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (37): DrawAction, adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners() (+29 more)

### Community 50 - ".int"
Cohesion: 0.11
Nodes (8): characteristicPolynomial(), Field, formatPolynomial(), interpolate(), polynomialIn(), divideExp(), q(), R()

### Community 51 - "sidePanel.ts"
Cohesion: 0.13
Nodes (13): AiResult, localizeTex(), isConfidentAnswer(), SymbolForm, AiState, cardPreview(), displayCode(), EMPTY_GROUP_TEX (+5 more)

### Community 52 - "Board"
Cohesion: 0.10
Nodes (7): Board, EraseAction, penErases(), Step, BoardChange, BoardData, Stroke

### Community 53 - "supabase.ts"
Cohesion: 0.09
Nodes (42): 1. «Cambia account», @supabase/supabase-js, AUTH_STORAGE_KEY, accountError, appUrl(), call(), currentSession(), deleteAccount() (+34 more)

### Community 54 - "markdown.ts"
Cohesion: 0.09
Nodes (40): @lezer/highlight, @lezer/markdown, lineDepth(), mathDelimTag, mathTag, parseBlockMath(), dataRange(), bulletGroup() (+32 more)

### Community 55 - "spreadsheetEn.test.ts"
Cohesion: 0.09
Nodes (54): valueText(), sheetSummary(), hide(), OPEN, sheetsForFile(), sheetsFromFile(), T, unhide() (+46 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "ui/relocation.ts"
Cohesion: 0.14
Nodes (20): sidebarToggle(), relocationMessage(), RelocationResult, BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark() (+12 more)

### Community 58 - "database.ts"
Cohesion: 0.23
Nodes (6): createDatabase(), createUser(), databaseTests(), feedbackTests(), migrations, shareTests()

### Community 59 - "finite.ts"
Cohesion: 0.17
Nodes (28): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+20 more)

### Community 60 - "NotesStore"
Cohesion: 0.08
Nodes (22): Deletion, DeletionLog, FOLDER_NAME_MAX, RemoteFolder, isUuid(), newId(), createdAtFromId(), deriveTitle() (+14 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "Welcome to Glifo"
Cohesion: 0.20
Nodes (9): A few examples, Calculations and graphs, For programming too, Handy shortcuts, How to write formulas, Lists, Spell check, Try it now (+1 more)

### Community 63 - "spreadsheet/editor.ts"
Cohesion: 0.10
Nodes (37): currentCall(), Editing, MenuEntry, Move, openSheetEditor(), PATHS, SheetEditorOptions, Snapshot (+29 more)

### Community 64 - "probability.ts"
Cohesion: 0.10
Nodes (29): End, Family, ExactScope, rejection(), RelOp, ALL, compileOf(), complement() (+21 more)

### Community 65 - "odesolve.ts"
Cohesion: 0.07
Nodes (96): primed(), absOf(), splitAbs(), linearIn(), addWave(), arrange(), bernoulliFamily(), cauchy() (+88 more)

### Community 66 - "formatNumber"
Cohesion: 0.10
Nodes (47): decimalSeparator(), Digits, formatNumber(), FormatOptions, formatRational(), fromNumber(), fromRational(), SUPERSCRIPT (+39 more)

### Community 67 - "parseSchema"
Cohesion: 0.10
Nodes (25): schemaSummary(), svg(), Look, isRecord(), num(), oneOf(), parseSchema(), point() (+17 more)

### Community 68 - "blockMove.ts"
Cohesion: 0.11
Nodes (34): @codemirror/commands, blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove, blockPlace() (+26 more)

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

### Community 73 - "files.ts"
Cohesion: 0.09
Nodes (31): 2. La pagina dei commenti, tipo FAQ, 4. Più modelli per «Spiegami», 5. A cosa serve la chiave dell'AI, 6. Glifo anche in inglese, 8. Il pulsante ✨ con il contorno, Gli abbonamenti, in tutto questo, In che ordine, La grafica: le otto richieste del 10 ottobre 2026 (+23 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (61): primitive(), linearCells(), atValues(), Converter, coordinates(), decimalText(), definiteParts(), definiteValue() (+53 more)

### Community 75 - "MarkdownEditor"
Cohesion: 0.16
Nodes (4): EditorCallbacks, MarkdownEditor, insertTemplate(), setup()

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Errore o imprevisto → nel dettaglio, 3. Serve una decisione → frasi complete, 4. Fine del compito → un solo riepilogo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.05
Nodes (67): laneOf(), alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ALIGN_NAMES (+59 more)

### Community 79 - "src/relocation.ts"
Cohesion: 0.08
Nodes (64): accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf() (+56 more)

### Community 82 - "Il database degli account (Supabase)"
Cohesion: 0.15
Nodes (12): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il controllo anti-robot (CAPTCHA, ottobre 2026), Il database degli account (Supabase), Il progetto, Il trasloco su glifo.page (ottobre 2026) (+4 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.17
Nodes (7): centerOf(), clickOn(), ffmpeg, SCENES, SIZE, tutorialModel(), work

### Community 90 - "Abbonamenti"
Cohesion: 0.07
Nodes (30): Abbonamenti, Classico, gratis: per scrivere e controllare, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Deciso (5 ottobre 2026) (+22 more)

### Community 91 - "smoke-test.mjs"
Cohesion: 0.14
Nodes (9): markdown-it, playwright-core, vite, fakeLlmWorker(), firstVisit(), plainContext, minutes, postMessage() (+1 more)

### Community 92 - "Costi"
Cohesion: 0.22
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 96 - "account-test.mjs"
Cohesion: 0.11
Nodes (10): device(), login(), newContext, waitFor(), b64(), CAPTCHA_TOKEN, CODE, GOOGLE_CODE (+2 more)

### Community 97 - "schemaBlocks.ts"
Cohesion: 0.10
Nodes (20): toggleLinePrefix(), LIST_STYLES, besideSchema(), BlockWidget, findWidgetBlocks(), guardBlocks(), KINDS, schemaBlockRanges() (+12 more)

### Community 98 - "aiActivity.ts"
Cohesion: 0.31
Nodes (4): AI_NEWS_TITLE, AI_WORKING_TITLE, aiActivity, T

### Community 100 - "Glifo – note per Claude"
Cohesion: 0.10
Nodes (19): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole (+11 more)

### Community 101 - "schema/file.ts"
Cohesion: 0.21
Nodes (12): base64(), hide(), OPEN, schemasFromFile(), T, unhide(), crc32(), svgSize() (+4 more)

### Community 102 - "symbolsEn.test.ts"
Cohesion: 0.10
Nodes (40): SuggestionItem, editDistance(), normalizeText(), singular(), stem(), STOPWORDS, words(), BOTH (+32 more)

### Community 103 - "siteUpdate.ts"
Cohesion: 0.15
Nodes (19): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, loadPart() (+11 more)

### Community 104 - "vitest"
Cohesion: 0.06
Nodes (53): vitest, FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsForFile(), graphsFromFile() (+45 more)

### Community 105 - "page.ts"
Cohesion: 0.06
Nodes (48): accountDataFile(), PullResult, hydrateGraphs(), setPrinting(), openShareDialog(), changeAccess(), changeCopy(), refreshChanged() (+40 more)

### Community 106 - "spreadsheet/format.ts"
Cohesion: 0.14
Nodes (21): decimalsOf(), divFormat(), ENGLISH, fixedNumber(), formatCode(), GENERAL, generalNumber(), group() (+13 more)

### Community 107 - "noteWordsMath.test.ts"
Cohesion: 0.06
Nodes (39): @codemirror/lang-markdown, @codemirror/state, katex, noIndentedCode, mathMarkdown, misspelledMark, refreshSpelling, setTarget (+31 more)

### Community 108 - "schema/templates.ts"
Cohesion: 0.21
Nodes (18): DEFAULT_EDGE, SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), conceptMap(), cycle(), edge() (+10 more)

### Community 113 - "schema/shapes.ts"
Cohesion: 0.08
Nodes (16): @maxgraph/core, ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape (+8 more)

### Community 116 - "parse.ts"
Cohesion: 0.05
Nodes (49): isTestLine(), number(), T, testItems(), isNumericalLine(), numericalItems(), hasWord(), usesDecimalComma() (+41 more)

### Community 117 - "plan.ts"
Cohesion: 0.17
Nodes (17): ITALIAN, NumberStyle, columnRole(), columnsOf(), durationUnit(), isNumber(), isPlanRange(), MAX_ACTIVITIES (+9 more)

### Community 118 - "toolbar.ts"
Cohesion: 0.17
Nodes (16): insertBlock(), wrapSelection(), ListStyleId, Action, createToolbar(), insertCode(), insertLink(), listStyle() (+8 more)

### Community 119 - "grafo-html.mjs"
Cohesion: 0.17
Nodes (5): graphFile, names, namesFile, root, PNG_ICONS

### Community 120 - "boardTouchLog.test.ts"
Cohesion: 0.22
Nodes (7): isSaved(), LOG_MAX_LINES, LogStore, SavedLog, clock(), memoryStore(), newLog()

### Community 121 - "engine.ts"
Cohesion: 0.16
Nodes (10): @farscrl/hunspell-wasm, capitalize(), COMMON_FIXES, DictionaryData, ELISIONS, inGlossary(), lower(), SpellEngine (+2 more)

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "board.ts"
Cohesion: 0.05
Nodes (64): Action, ACTION_NAMES, coalesced(), DOT_SIZES, EraserMode, Finger, HANDLE_REACH, ICON (+56 more)

### Community 124 - "Sheet"
Cohesion: 0.07
Nodes (30): GaussLine, Definition, Line, ExactComplexScope, formatGauss(), ConicInfo, withWorkLimit(), FiniteContext (+22 more)

### Community 128 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 129 - "deploy.test.ts"
Cohesion: 0.33
Nodes (3): vite-plugin-pwa, defineFor(), MAIN_BRANCH

### Community 132 - "template.ts"
Cohesion: 0.33
Nodes (8): SYMBOLS, cardPreviewTex(), formPreviewTex(), ParsedTemplate, parseTemplate(), PLACEHOLDER_TEX, placeholderPreview(), templateText()

### Community 133 - "pick"
Cohesion: 0.26
Nodes (4): pick(), FormulaError, Parser, errorName()

### Community 136 - ".constructor"
Cohesion: 0.23
Nodes (3): loadPrefs(), sizeChoice(), highlightName()

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 139 - "limits.ts"
Cohesion: 0.23
Nodes (16): exponentialForm(), fracTex(), fracText(), nearFraction(), piMultiple(), surd(), alternating(), close() (+8 more)

### Community 140 - "captcha.ts"
Cohesion: 0.21
Nodes (8): captchaToken(), loadTurnstile(), Turnstile, TURNSTILE_SCRIPT, Window, TURNSTILE_SITE_KEY, accountFailure(), Options

### Community 141 - "xlsx.ts"
Cohesion: 0.07
Nodes (59): RFC-4180, fflate, csvCell(), csvDelimiter(), csvNumbers(), csvToSheet(), digitsOf(), field() (+51 more)

### Community 142 - "editor/lists.ts"
Cohesion: 0.11
Nodes (53): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+45 more)

### Community 143 - "spellcheck"
Cohesion: 0.21
Nodes (8): spellcheck(), close(), misspelledAt(), openAt(), replace(), tooltipView(), SpellChecker, SpellcheckOptions

### Community 144 - "PlanView"
Cohesion: 0.25
Nodes (4): ganttWidth(), PlanView, GraphLook, Palette

### Community 146 - "Glifo"
Cohesion: 0.12
Nodes (16): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Commenti, Compatibilità con VS Code, Condividere una nota con un link (+8 more)

### Community 156 - "graph.ts"
Cohesion: 0.11
Nodes (29): fieldInput(), AT_X, cellHtml(), cellText(), COMPASS, createEdgeCell(), createGraph(), drawSchema() (+21 more)

### Community 157 - "topics.ts"
Cohesion: 0.07
Nodes (48): ATTRIBUTES, cut(), ER_SHAPES, fieldText(), fitLines(), flowOrder(), formulaText(), FREE_NAMES (+40 more)

### Community 159 - "sheet.ts"
Cohesion: 0.07
Nodes (32): Ode, ExactFunction, Eigenvalue, EXACT, FLOAT, Lin, LinearValue, NUMERICAL (+24 more)

### Community 160 - "statsGraph.ts"
Cohesion: 0.25
Nodes (13): classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX, Line, number(), pmfBars() (+5 more)

### Community 162 - "editor/editor.ts"
Cohesion: 0.05
Nodes (45): @codemirror/language, @codemirror/view, @lezer/common, closeMathBlockOnEnter(), highlight, T, tabOutOfMath(), InsertOptions (+37 more)

## Knowledge Gaps
- **857 isolated node(s):** `session-start.sh script`, `name`, `private`, `version`, `description` (+852 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1168 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **37 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `touchlog.ts`, `parseGraph`, `main.ts`, `compile`, `spec.ts`, `num`, `graph/preview.ts`, `mathEn2.test.ts`, `i18n.ts`, `svg.ts`, `toLatex`, `limits.ts`, `SchemaEditor`, `PlanView`, `explainSubjects.ts`, `numerical.ts`, `arithmetic.ts`, `xlsx.ts`, `SheetEditor`, `linsys.ts`, `feedback.ts`, `store.ts`, `Parser`, `Pt`, `ui/preview.ts`, `graph.ts`, `topics.ts`, `gantt.ts`, `several.ts`, `view3d.ts`, `texts`, `logic.ts`, `noteWords.ts`, `complex.ts`, `namesIn`, `study.ts`, `sheet.ts`, `ExplainPanel`, `explainPanel.ts`, `functions.ts`, `MathError`, `assistant.ts`, `ink.ts`, `Rational`, `board/shapes.ts`, `sidePanel.ts`, `Board`, `supabase.ts`, `spreadsheetEn.test.ts`, `ui/relocation.ts`, `finite.ts`, `NotesStore`, `spreadsheet/editor.ts`, `odesolve.ts`, `blockMove.ts`, `touchLog`, `files.ts`, `symbolic.ts`, `MarkdownEditor`, `schema/editor.ts`, `src/relocation.ts`, `tutorial.mjs`, `smoke-test.mjs`, `schemaBlocks.ts`, `Glifo – note per Claude`, `schema/file.ts`, `siteUpdate.ts`, `vitest`, `page.ts`, `spreadsheet/format.ts`, `schema/shapes.ts`, `parse.ts`, `plan.ts`, `toolbar.ts`, `board.ts`, `Sheet`?**
  _High betweenness centrality (0.127) - this node is a cross-community bridge._
- **Why does `texts` connect `texts` to `main.ts`, `compile`, `spec.ts`, `pick`, `schemaEn.test.ts`, `graph/preview.ts`, `Dove sono le cose`, `mathEn2.test.ts`, `i18n.ts`, `svg.ts`, `toLatex`, `editor/lists.ts`, `xlsx.ts`, `numerical.ts`, `arithmetic.ts`, `index.ts`, `linsys.ts`, `feedback.ts`, `ui/preview.ts`, `domain.ts`, `topics.ts`, `gantt.ts`, `several.ts`, `statsGraph.ts`, `sheet.ts`, `editor/editor.ts`, `noteWords.ts`, `complex.ts`, `namesIn`, `logic.ts`, `study.ts`, `resize.ts`, `restore.ts`, `explainPanel.ts`, `FoldersStore`, `functions.ts`, `MathError`, `assistant.ts`, `ink.ts`, `Rational`, `sidePanel.ts`, `supabase.ts`, `spreadsheetEn.test.ts`, `ui/relocation.ts`, `finite.ts`, `NotesStore`, `spreadsheet/editor.ts`, `probability.ts`, `odesolve.ts`, `formatNumber`, `parseSchema`, `files.ts`, `symbolic.ts`, `schema/editor.ts`, `src/relocation.ts`, `schemaBlocks.ts`, `aiActivity.ts`, `schema/file.ts`, `siteUpdate.ts`, `vitest`, `page.ts`, `noteWordsMath.test.ts`, `schema/templates.ts`, `parse.ts`, `plan.ts`, `toolbar.ts`, `board.ts`?**
  _High betweenness centrality (0.123) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `touchlog.ts`, `parseGraph`, `deploy.test.ts`, `main.ts`, `template.ts`, `schemaEn.test.ts`, `num`, `Dove sono le cose`, `mathEn2.test.ts`, `i18n.ts`, `captcha.ts`, `svg.ts`, `editor/lists.ts`, `package.json`, `toLatex`, `xlsx.ts`, `feedback.ts`, `store.ts`, `Parser`, `domain.ts`, `gantt.ts`, `sheet.ts`, `view3d.ts`, `editor/editor.ts`, `noteWords.ts`, `translations.test.ts`, `resize.ts`, `restore.ts`, `explainPanel.ts`, `FoldersStore`, `assistant.ts`, `ink.ts`, `Rational`, `board/shapes.ts`, `supabase.ts`, `spreadsheetEn.test.ts`, `ui/relocation.ts`, `database.ts`, `NotesStore`, `spreadsheet/editor.ts`, `parseSchema`, `blockMove.ts`, `MarkdownEditor`, `schema/editor.ts`, `src/relocation.ts`, `schemaBlocks.ts`, `aiActivity.ts`, `symbolsEn.test.ts`, `siteUpdate.ts`, `page.ts`, `noteWordsMath.test.ts`, `parse.ts`, `plan.ts`, `boardTouchLog.test.ts`, `board.ts`, `Sheet`?**
  _High betweenness centrality (0.077) - this node is a cross-community bridge._
- **Are the 293 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `tutorialModel()`) actually correct?**
  _`Dove sono le cose` has 293 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `name`, `private` to the rest of the system?**
  _857 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `parseGraph` be split into smaller, more focused modules?**
  _Cohesion score 0.06747638326585695 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.03297118564005668 - nodes in this community are weakly interconnected._