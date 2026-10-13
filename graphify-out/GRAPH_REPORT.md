# Graph Report - matherdown  (2026-10-13)

## Corpus Check
- 339 files · ~704,274 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5493 nodes · 20105 edges · 169 communities (130 shown, 39 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 653 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `1be246a5`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- touchlog.ts
- parseGraph
- main.ts
- compile
- sync.ts
- spec.ts
- sql.ts
- primitive.ts
- graph/preview.ts
- Dove sono le cose
- distributions.ts
- i18n.ts
- svg.ts
- parseMath
- SchemaEditor
- package.json
- SheetEditor
- explainSubjects.ts
- numerical.ts
- arithmetic.ts
- index.ts
- client.ts
- solve.ts
- vitest
- store.ts
- parse.ts
- board.ts
- texts
- domain.ts
- several.ts
- gantt.ts
- toLatex
- view3d.ts
- calcResults.ts
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
- Field
- sidePanel.ts
- Board
- suggestions.ts
- markdown.ts
- topics.ts
- 20261004091555_note_condivise.sql
- h
- database.ts
- finite.ts
- NotesStore
- dependencies
- Welcome to Glifo
- spreadsheet/editor.ts
- probability.ts
- num
- statsShown.ts
- linsys.ts
- blockMove.ts
- Benvenuto in Glifo
- compilerOptions
- relocation-test.mjs
- touchLog
- files.ts
- symbolic.ts
- .constructor
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
- supabase-stub.sql
- account-test.mjs
- schemaBlocks.ts
- aiPanel.test.ts
- In programma
- schemaTools.test.ts
- symbolsEn.test.ts
- toast
- graph/file.ts
- supabase.ts
- spreadsheet/format.ts
- spellcheck.ts
- laplace.ts
- graph.ts
- usesDecimalComma
- spreadsheetEn.test.ts
- toolbar.ts
- grafo-html.mjs
- boardTouchLog.test.ts
- engine.ts
- Le spiegazioni, come funzionano
- strokes.ts
- Sheet
- page.ts
- createFakeSupabase
- noteWordsMath.test.ts
- template.ts
- formula.ts
- .constructor
- 20261008130026_commenti.sql
- limits.ts
- captcha.ts
- xlsx.ts
- editor/lists.ts
- .folderItem
- PlanView
- Glifo
- host.ts
- SymbolEntry
- chart.ts
- downloadText
- sheet.ts
- statsGraph.ts
- Glifo – note per Claude
- editor/editor.ts
- Piano per piano
- Costi
- La lavagna
- I modelli e le chiavi API

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
- `4. Più modelli per «Spiegami»` --references--> `webllmId()`  [INFERRED]
  GRAFICA.md → src/ai/localModels.ts
- `Trasloco: il sito su Cloudflare, con un dominio tutto di Glifo` --references--> `dist()`  [INFERRED]
  ROADMAP.md → src/board/shapes.ts
- `Il controllo anti-robot (CAPTCHA, ottobre 2026)` --references--> `captchaToken()`  [INFERRED]
  supabase/README.md → src/account/captcha.ts
- `Dove sono le cose` --references--> `ConicElements`  [INFERRED]
  ARCHITETTURA.md → src/math/conics.ts
- `Dove sono le cose` --references--> `texts()`  [INFERRED]
  ARCHITETTURA.md → tests/boardTouchLog.test.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (169 total, 39 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.15
Nodes (16): at(), browserStore, clip(), KINDS, LOG_KEY, Moves, MOVES_MAX, pointerDetail() (+8 more)

### Community 1 - "parseGraph"
Cohesion: 0.07
Nodes (25): parseGraph(), light, text(), light, pts, result(), square, text() (+17 more)

### Community 2 - "main.ts"
Cohesion: 0.03
Nodes (112): 2. La pagina dei commenti, tipo FAQ, addToGraphBlock(), account, ACCOUNT_OFF, accountButton, accountProblem(), active, aiShown() (+104 more)

### Community 3 - "compile"
Cohesion: 0.06
Nodes (69): conicItems(), isConicLine(), T, FieldContext, criticalLine(), named(), severalItems(), surface() (+61 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (30): AccountSync, withLock(), Account, EMPTY_STATE, FolderChange, FolderRow, isEmpty(), iso() (+22 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (94): quadricEquation(), fourierItems(), isFourierLine(), T, onlyComplex(), constantIntegrand(), inequalityMargin(), multipleOf() (+86 more)

### Community 6 - "sql.ts"
Cohesion: 0.19
Nodes (16): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+8 more)

### Community 7 - "primitive.ts"
Cohesion: 0.16
Nodes (63): atIntegers(), algebraic(), bigGcd(), byParts(), candidates(), canon(), combineLogs(), compareKeys() (+55 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (45): addLabel(), boxes, cameras, complexCoord(), containing(), coord(), coordinates(), drawings (+37 more)

### Community 9 - "Dove sono le cose"
Cohesion: 0.05
Nodes (77): Dove sono le cose, Glifo – architettura, allNames(), answerFollowUp(), bareResult(), chatContext, ChatFn, chatSubject() (+69 more)

### Community 10 - "distributions.ts"
Cohesion: 0.09
Nodes (40): addExp(), choose(), continuousQuantile(), decimals(), discreteQuantile(), Distribution, exactIntervalProbability(), factorialBig() (+32 more)

### Community 11 - "i18n.ts"
Cohesion: 0.07
Nodes (43): 3. Le impostazioni divise in sezioni, ExplainTone, browserLang(), browserLanguages(), dateLocale(), detectLang(), Entry, isLang() (+35 more)

### Community 12 - "svg.ts"
Cohesion: 0.07
Nodes (63): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseWindow(), chooseY(), clipLines(), dataWindow() (+55 more)

### Community 13 - "parseMath"
Cohesion: 0.14
Nodes (17): errorMessage(), MathSyntaxError, parseMath(), parseStatement(), error(), result(), value(), calcError() (+9 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.08
Nodes (15): fieldInput(), isLanes(), SchemaEditor, withLaneContents(), cellText(), edgeLook(), nodeLook(), nodeStyle() (+7 more)

### Community 15 - "package.json"
Cohesion: 0.05
Nodes (38): description, devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript (+30 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (8): functionLabel(), SheetEditor, englishTyping(), serializeSheet(), CellRange, clearRange(), cloneSheet(), setCell()

### Community 17 - "explainSubjects.ts"
Cohesion: 0.13
Nodes (26): explainTarget, schemaTitle(), formulasUntil(), sheetBefore(), explanationMarkdown(), hasCalculation(), insertAfterBlock(), insertAfterText() (+18 more)

### Community 18 - "numerical.ts"
Cohesion: 0.10
Nodes (53): isNumericalLine(), numericalItems(), FormatOptions, bisection(), cholesky(), condition(), derivative(), exactPolynomial() (+45 more)

### Community 19 - "arithmetic.ts"
Cohesion: 0.10
Nodes (47): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+39 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (42): b, bigops, c, calculus, fn, fr, fractions, functions (+34 more)

### Community 21 - "client.ts"
Cohesion: 0.10
Nodes (13): Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download(), fetchDictionary() (+5 more)

### Community 22 - "solve.ts"
Cohesion: 0.14
Nodes (29): LinearScope, splitRoot(), surdText(), isStandardUnknown(), RelOp, breaks(), cubeRoot(), equation() (+21 more)

### Community 23 - "vitest"
Cohesion: 0.06
Nodes (40): vite-plugin-pwa, vitest, accountOffMessage(), Site, T, commentDate(), commentItem(), COMMENTS_MAX (+32 more)

### Community 24 - "store.ts"
Cohesion: 0.06
Nodes (17): BoardBackend, BoardData, BoardStore, done(), fromRecord(), IdbBoards, MemoryBoards, ofNote() (+9 more)

### Community 25 - "parse.ts"
Cohesion: 0.07
Nodes (42): hasWord(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe() (+34 more)

### Community 26 - "board.ts"
Cohesion: 0.06
Nodes (40): Action, ACTION_NAMES, clampZoom(), coalesced(), DOT_SIZES, DrawAction, EraseAction, EraserMode (+32 more)

### Community 27 - "texts"
Cohesion: 0.06
Nodes (36): GraphLabels, GraphLook, renameGraphScope(), renameScopeKeys(), texts, BlockKind, MoveDir, Look (+28 more)

### Community 28 - "domain.ts"
Cohesion: 0.12
Nodes (34): depth(), integralRegion, LayeredSolid, Multiple, PlanePart, axesIn(), bestAlong(), boundingBox() (+26 more)

### Community 29 - "several.ts"
Cohesion: 0.06
Nodes (78): EMPTY_SCOPE, boundsOf(), close(), definite(), fourierProblem, fourierShown(), isTrig(), isZero() (+70 more)

### Community 30 - "gantt.ts"
Cohesion: 0.06
Nodes (75): amount(), barColor(), crossings(), dateText(), dayMonth(), dayOf(), fitText(), GanttOptions (+67 more)

### Community 31 - "toLatex"
Cohesion: 0.07
Nodes (70): names(), STUDY_GRAPH, studyItems(), T, ACCENT_COMMANDS, diffLatex(), DISTRIBUTION_LATEX, distributionLatex() (+62 more)

### Community 32 - "view3d.ts"
Cohesion: 0.06
Nodes (90): staticGraphSvg(), addMesh(), addTet(), affinePlane(), Axis, Box, centroid(), chooseBox() (+82 more)

### Community 33 - "calcResults.ts"
Cohesion: 0.08
Nodes (26): @codemirror/language, @lezer/common, acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult, calcResults() (+18 more)

### Community 34 - "logic.ts"
Cohesion: 0.11
Nodes (30): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+22 more)

### Community 35 - "noteWords.ts"
Cohesion: 0.08
Nodes (40): formulaAtCursor(), GraphLabelLines, insertGraphBlock(), LABEL_KEYS, setGraphLabels(), monthOf(), MONTHS, MONTHS_EN (+32 more)

### Community 36 - "complex.ts"
Cohesion: 0.06
Nodes (64): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexLine(), isComplexValue() (+56 more)

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
Cohesion: 0.16
Nodes (4): ExplainChat, ExplainPanel, preventFocusSteal(), formulasSummary()

### Community 41 - "restore.ts"
Cohesion: 0.22
Nodes (11): restore(), BackupNote, backupNotes(), restoreBackup(), RestoreBoards, Restored, restoredMessage(), T (+3 more)

### Community 42 - "explainPanel.ts"
Cohesion: 0.06
Nodes (46): @mlc-ai/web-llm, Explanation, FollowUp, REPLY_TOKENS, chat(), GlifoError, Gpu, load() (+38 more)

### Community 43 - "FoldersStore"
Cohesion: 0.16
Nodes (4): cleanFolderName(), FoldersStore, sameName(), names()

### Community 44 - "functions.ts"
Cohesion: 0.07
Nodes (61): CellResult, EMPTY, evaluateSheet(), number(), SheetEvaluator, T, addFormat(), GENERAL (+53 more)

### Community 45 - "MathError"
Cohesion: 0.10
Nodes (67): MathError, ExactUnavailable, angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx (+59 more)

### Community 46 - "assistant.ts"
Cohesion: 0.10
Nodes (31): 4. Più modelli per «Spiegami», 5. A cosa serve la chiave dell'AI, 6. Glifo anche in inglese, 8. Il pulsante ✨ con il contorno, Gli abbonamenti, in tutto questo, In che ordine, La grafica: le otto richieste del 10 ottobre 2026, AiAnswer (+23 more)

### Community 47 - "ink.ts"
Cohesion: 0.13
Nodes (19): Prefs, BOARD_PALETTES, BoardPalette, BoardTheme, highlightName(), inkName(), mid(), outlineSvg() (+11 more)

### Community 48 - "Rational"
Cohesion: 0.07
Nodes (51): Part, at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf() (+43 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.14
Nodes (34): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+26 more)

### Community 50 - "Field"
Cohesion: 0.12
Nodes (7): characteristicPolynomial(), eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn()

### Community 51 - "sidePanel.ts"
Cohesion: 0.09
Nodes (28): AiResult, labelHtml(), texHtml(), localizeTex(), checkHtml(), checkTitle(), T, cache (+20 more)

### Community 52 - "Board"
Cohesion: 0.10
Nodes (5): Board, penErases(), shapeSvg(), Box, Stroke

### Community 53 - "suggestions.ts"
Cohesion: 0.18
Nodes (6): Promemoria per lo studente, EditorMathContext, expand(), preferredIndex(), SuggestionController, Commenti di chi prova Glifo

### Community 54 - "markdown.ts"
Cohesion: 0.10
Nodes (33): lineDepth(), parseBlockMath(), markMoves(), moveAttrs(), renderTexOrError(), renderTexWithResult(), configurePurify(), createMarkdownIt() (+25 more)

### Community 55 - "topics.ts"
Cohesion: 0.11
Nodes (46): ATTRIBUTES, cut(), ER_SHAPES, fieldText(), fitLines(), flowOrder(), formulaText(), FREE_NAMES (+38 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "h"
Cohesion: 0.07
Nodes (48): SyncStatus, rich(), viewSwitch, RelocationResult, AccountButton, confirmAccountDeletion(), messageOf(), openAccountDialog() (+40 more)

### Community 58 - "database.ts"
Cohesion: 0.23
Nodes (6): createDatabase(), createUser(), databaseTests(), feedbackTests(), migrations, shareTests()

### Community 59 - "finite.ts"
Cohesion: 0.17
Nodes (28): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+20 more)

### Community 60 - "NotesStore"
Cohesion: 0.07
Nodes (31): Deletion, DeletionLog, Folder, FOLDER_NAME_MAX, FolderGroup, groupByFolder(), loadClosedFolders(), RemoteFolder (+23 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "Welcome to Glifo"
Cohesion: 0.20
Nodes (9): A few examples, Calculations and graphs, For programming too, Handy shortcuts, How to write formulas, Lists, Spell check, Try it now (+1 more)

### Community 63 - "spreadsheet/editor.ts"
Cohesion: 0.08
Nodes (47): openSheet(), saveSheetBlock(), currentCall(), Editing, MenuEntry, Move, PATHS, SheetEditorOptions (+39 more)

### Community 64 - "probability.ts"
Cohesion: 0.15
Nodes (21): End, ALL, complement(), endAt(), EventContext, eventSet(), FLIP, intersect() (+13 more)

### Community 65 - "num"
Cohesion: 0.07
Nodes (108): absOf(), oneFraction(), splitAbs(), withoutAbs(), sqrtEx(), addWave(), arrange(), bernoulliFamily() (+100 more)

### Community 66 - "statsShown.ts"
Cohesion: 0.17
Nodes (31): check(), correlation(), count(), covariance(), Data, dataStatistic(), deviation(), fail() (+23 more)

### Community 67 - "linsys.ts"
Cohesion: 0.10
Nodes (51): factorsOf(), choices(), exText(), gcd(), linearSystem(), matrixEquation(), matrixSystem(), minorsGcd() (+43 more)

### Community 68 - "blockMove.ts"
Cohesion: 0.11
Nodes (31): @codemirror/commands, blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove, blockPlace() (+23 more)

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
Cohesion: 0.24
Nodes (14): inClaudeViewer(), canWriteFilesDirectly(), FsWindow, isAbort(), mdTypes(), OpenedFile, openMarkdownFiles(), openTypes() (+6 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (64): letters(), primitive(), verified(), linearCells(), pairUp(), atValues(), Converter, coordinates() (+56 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Errore o imprevisto → nel dettaglio, 3. Serve una decisione → frasi complete, 4. Fine del compito → un solo riepilogo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.04
Nodes (74): @electric-sql/pglite, alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ALIGN_NAMES (+66 more)

### Community 79 - "src/relocation.ts"
Cohesion: 0.08
Nodes (61): 1. «Cambia account», accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount() (+53 more)

### Community 82 - "Il database degli account (Supabase)"
Cohesion: 0.15
Nodes (12): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il controllo anti-robot (CAPTCHA, ottobre 2026), Il database degli account (Supabase), Il progetto, Il trasloco su glifo.page (ottobre 2026) (+4 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.17
Nodes (7): centerOf(), clickOn(), ffmpeg, SCENES, SIZE, tutorialModel(), work

### Community 90 - "Abbonamenti"
Cohesion: 0.14
Nodes (14): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+6 more)

### Community 91 - "smoke-test.mjs"
Cohesion: 0.14
Nodes (9): markdown-it, playwright-core, vite, fakeLlmWorker(), firstVisit(), plainContext, minutes, postMessage() (+1 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.11
Nodes (10): device(), login(), newContext, waitFor(), b64(), CAPTCHA_TOKEN, CODE, GOOGLE_CODE (+2 more)

### Community 97 - "schemaBlocks.ts"
Cohesion: 0.06
Nodes (47): BlockWidget, findWidgetBlocks(), guardBlocks(), KINDS, schemaBlocks(), schemaSummary(), svg(), T (+39 more)

### Community 98 - "aiPanel.test.ts"
Cohesion: 0.07
Nodes (29): definedName(), formulaTopic(), graphTopic(), numberText(), studyOf(), MarkdownEditor, NoteSubject, AI_NEWS_TITLE (+21 more)

### Community 100 - "In programma"
Cohesion: 0.22
Nodes (9): Account: i propri appunti su ogni dispositivo, anche da condividere, Commenti di chi prova Glifo, Idee per il futuro, In programma, La grafica: account, impostazioni, commenti, AI e lingua (chiesto il 10 ottobre 2026, se ne parla), La lavagna: idee in più, Più avanti, Schemi: idee in più (+1 more)

### Community 101 - "schemaTools.test.ts"
Cohesion: 0.16
Nodes (21): laneOf(), base64(), cellHtml(), crc32(), svgSize(), svgToPng(), T, withDensity() (+13 more)

### Community 102 - "symbolsEn.test.ts"
Cohesion: 0.12
Nodes (34): editDistance(), normalizeText(), singular(), stem(), STOPWORDS, words(), BOTH, buildIndex() (+26 more)

### Community 103 - "toast"
Cohesion: 0.12
Nodes (25): loadingEditor(), copy(), checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion() (+17 more)

### Community 104 - "graph/file.ts"
Cohesion: 0.10
Nodes (36): FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsForFile(), graphsFromFile(), hide() (+28 more)

### Community 105 - "supabase.ts"
Cohesion: 0.05
Nodes (66): @supabase/supabase-js, AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), accountError, appUrl(), call() (+58 more)

### Community 106 - "spreadsheet/format.ts"
Cohesion: 0.16
Nodes (22): quantity(), decimalsOf(), divFormat(), ENGLISH, englishNumber(), fixedNumber(), formatNumber(), generalNumber() (+14 more)

### Community 107 - "spellcheck.ts"
Cohesion: 0.08
Nodes (23): misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt(), openAt() (+15 more)

### Community 108 - "laplace.ts"
Cohesion: 0.17
Nodes (28): factoredPolynomial(), beyondPoles(), compiled(), E, exp(), fractionShown(), HALF, hyperbolicToExp() (+20 more)

### Community 113 - "graph.ts"
Cohesion: 0.05
Nodes (40): @maxgraph/core, AT_X, COMPASS, createEdgeCell(), createGraph(), drawSchema(), edgeStyle(), edgeTextAt() (+32 more)

### Community 116 - "usesDecimalComma"
Cohesion: 0.10
Nodes (37): isTestLine(), number(), T, testItems(), usesDecimalComma(), between(), chiSquareTest(), confidence() (+29 more)

### Community 117 - "spreadsheetEn.test.ts"
Cohesion: 0.10
Nodes (33): openSheetEditor(), formatValue(), NumberStyle, shownStyle(), parseSheet(), cellText(), columnRole(), columnsOf() (+25 more)

### Community 118 - "toolbar.ts"
Cohesion: 0.09
Nodes (28): insertBlock(), InsertOptions, insertTemplate(), templateInsertion(), toggleLinePrefix(), wrapSelection(), LIST_STYLES, ListStyleId (+20 more)

### Community 119 - "grafo-html.mjs"
Cohesion: 0.17
Nodes (5): graphFile, names, namesFile, root, PNG_ICONS

### Community 120 - "boardTouchLog.test.ts"
Cohesion: 0.20
Nodes (8): isSaved(), LOG_MAX_LINES, LogStore, SavedLog, clock(), memoryStore(), newLog(), texts()

### Community 121 - "engine.ts"
Cohesion: 0.16
Nodes (10): @farscrl/hunspell-wasm, capitalize(), COMMON_FIXES, DictionaryData, ELISIONS, inGlossary(), lower(), SpellEngine (+2 more)

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "strokes.ts"
Cohesion: 0.09
Nodes (38): centerOn(), copyStrokes(), cross(), IDENTITY, insideLasso(), keepInside(), LASSO_SHARE, lassoed() (+30 more)

### Community 124 - "Sheet"
Cohesion: 0.08
Nodes (27): complex, ExactComplexScope, Ode, withWorkLimit(), FiniteContext, FormattedResult, Mat, MathNode (+19 more)

### Community 125 - "page.ts"
Cohesion: 0.11
Nodes (19): katex, sidebarToggle(), SharedNote, body, draw(), isDark(), saveButton, settings (+11 more)

### Community 128 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 129 - "noteWordsMath.test.ts"
Cohesion: 0.11
Nodes (16): args(), AstNode, childrenOf(), DATA, ENGLISH, englishTexts(), FUNCTIONS, isNode() (+8 more)

### Community 132 - "template.ts"
Cohesion: 0.33
Nodes (8): CATEGORIES, cardPreviewTex(), formPreviewTex(), ParsedTemplate, parseTemplate(), PLACEHOLDER_TEX, placeholderPreview(), templateText()

### Community 133 - "formula.ts"
Cohesion: 0.09
Nodes (24): pick(), BinOp, COMPARE, ERRORS_BY_LENGTH, FormulaError, formulaRefs(), OPERATORS, parseFormula() (+16 more)

### Community 136 - ".constructor"
Cohesion: 0.15
Nodes (3): BoardOptions, loadPrefs(), sizeChoice()

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 139 - "limits.ts"
Cohesion: 0.20
Nodes (18): exponentialForm(), fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), alternating() (+10 more)

### Community 140 - "captcha.ts"
Cohesion: 0.21
Nodes (8): captchaToken(), loadTurnstile(), Turnstile, TURNSTILE_SCRIPT, Window, TURNSTILE_SITE_KEY, accountFailure(), Options

### Community 141 - "xlsx.ts"
Cohesion: 0.09
Nodes (44): RFC-4180, fflate, tablesNote(), csvCell(), csvDelimiter(), csvNumbers(), csvToSheet(), digitsOf() (+36 more)

### Community 142 - "editor/lists.ts"
Cohesion: 0.09
Nodes (61): applyListStyle(), continueList(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext(), isBlank() (+53 more)

### Community 143 - ".folderItem"
Cohesion: 0.22
Nodes (3): formatDate(), NotesPanel, NotesPanelDeps

### Community 146 - "Glifo"
Cohesion: 0.12
Nodes (16): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Commenti, Compatibilità con VS Code, Condividere una nota con un link (+8 more)

### Community 154 - "host.ts"
Cohesion: 0.23
Nodes (8): cache, capability(), ClaudeRuntime, hostDownloads, HostError, hostSample, ModelTier, runtime()

### Community 156 - "SymbolEntry"
Cohesion: 0.22
Nodes (9): SuggestionItem, IndexedEntry, SearchResult, SuggestIndex, Suggestion, Category, CategoryId, SymbolEntry (+1 more)

### Community 157 - "chart.ts"
Cohesion: 0.13
Nodes (29): at(), breakEven(), dataLine(), dataRange(), Point, T, tableItems(), textLabel() (+21 more)

### Community 158 - "downloadText"
Cohesion: 0.36
Nodes (7): downloadBlob(), downloadText(), kb(), T, touchLogFieldset(), touchLogFileName(), touchLogHeader()

### Community 159 - "sheet.ts"
Cohesion: 0.05
Nodes (57): formatGauss(), expSumValue(), decimalSeparator(), Digits, formatNumber(), formatRational(), fromNumber(), fromRational() (+49 more)

### Community 160 - "statsGraph.ts"
Cohesion: 0.25
Nodes (13): classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX, Line, number(), pmfBars() (+5 more)

### Community 161 - "Glifo – note per Claude"
Cohesion: 0.25
Nodes (8): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Regole, sqlite()

### Community 162 - "editor/editor.ts"
Cohesion: 0.06
Nodes (39): @codemirror/lang-markdown, @codemirror/state, @codemirror/view, @lezer/highlight, highlight, T, deleteListMarker(), listMarkers (+31 more)

### Community 163 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 166 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 167 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 168 - "I modelli e le chiavi API"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), In prova sul ramo `prova` (7 ottobre 2026): Qwen3 nel browser per «Spiegami», Le idee dello studente (5 ottobre 2026)

## Knowledge Gaps
- **857 isolated node(s):** `Comandi`, `Regole`, `6. Glifo anche in inglese`, `8. Il pulsante ✨ con il contorno`, `Gli abbonamenti, in tutto questo` (+852 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1165 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **39 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `texts` connect `texts` to `main.ts`, `compile`, `spec.ts`, `formula.ts`, `sql.ts`, `graph/preview.ts`, `Dove sono le cose`, `distributions.ts`, `i18n.ts`, `svg.ts`, `xlsx.ts`, `editor/lists.ts`, `numerical.ts`, `arithmetic.ts`, `index.ts`, `solve.ts`, `vitest`, `parse.ts`, `board.ts`, `downloadText`, `domain.ts`, `chart.ts`, `gantt.ts`, `toLatex`, `statsGraph.ts`, `calcResults.ts`, `editor/editor.ts`, `noteWords.ts`, `complex.ts`, `namesIn`, `several.ts`, `logic.ts`, `sheet.ts`, `restore.ts`, `explainPanel.ts`, `resize.ts`, `functions.ts`, `MathError`, `assistant.ts`, `ink.ts`, `Rational`, `sidePanel.ts`, `topics.ts`, `h`, `finite.ts`, `NotesStore`, `spreadsheet/editor.ts`, `probability.ts`, `num`, `statsShown.ts`, `linsys.ts`, `files.ts`, `symbolic.ts`, `schema/editor.ts`, `src/relocation.ts`, `schemaBlocks.ts`, `aiPanel.test.ts`, `schemaTools.test.ts`, `toast`, `graph/file.ts`, `supabase.ts`, `spellcheck.ts`, `usesDecimalComma`, `spreadsheetEn.test.ts`, `toolbar.ts`, `page.ts`?**
  _High betweenness centrality (0.124) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `Dove sono le cose` to `touchlog.ts`, `parseGraph`, `main.ts`, `compile`, `spec.ts`, `formula.ts`, `primitive.ts`, `graph/preview.ts`, `i18n.ts`, `svg.ts`, `xlsx.ts`, `limits.ts`, `SchemaEditor`, `PlanView`, `explainSubjects.ts`, `numerical.ts`, `arithmetic.ts`, `SheetEditor`, `vitest`, `store.ts`, `parse.ts`, `board.ts`, `texts`, `chart.ts`, `gantt.ts`, `several.ts`, `view3d.ts`, `toLatex`, `logic.ts`, `noteWords.ts`, `complex.ts`, `namesIn`, `sheet.ts`, `ExplainPanel`, `explainPanel.ts`, `functions.ts`, `MathError`, `assistant.ts`, `Rational`, `board/shapes.ts`, `sidePanel.ts`, `Board`, `markdown.ts`, `topics.ts`, `h`, `finite.ts`, `NotesStore`, `spreadsheet/editor.ts`, `num`, `linsys.ts`, `blockMove.ts`, `touchLog`, `files.ts`, `symbolic.ts`, `.constructor`, `schema/editor.ts`, `src/relocation.ts`, `tutorial.mjs`, `smoke-test.mjs`, `schemaBlocks.ts`, `aiPanel.test.ts`, `schemaTools.test.ts`, `toast`, `graph/file.ts`, `supabase.ts`, `spreadsheet/format.ts`, `graph.ts`, `usesDecimalComma`, `spreadsheetEn.test.ts`, `toolbar.ts`, `boardTouchLog.test.ts`, `strokes.ts`, `Sheet`, `page.ts`?**
  _High betweenness centrality (0.106) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `touchlog.ts`, `parseGraph`, `noteWordsMath.test.ts`, `template.ts`, `Dove sono le cose`, `distributions.ts`, `i18n.ts`, `captcha.ts`, `svg.ts`, `editor/lists.ts`, `package.json`, `parseMath`, `xlsx.ts`, `store.ts`, `parse.ts`, `board.ts`, `texts`, `chart.ts`, `gantt.ts`, `sheet.ts`, `view3d.ts`, `several.ts`, `editor/editor.ts`, `noteWords.ts`, `translations.test.ts`, `resize.ts`, `restore.ts`, `explainPanel.ts`, `MathError`, `assistant.ts`, `ink.ts`, `board/shapes.ts`, `markdown.ts`, `h`, `database.ts`, `NotesStore`, `spreadsheet/editor.ts`, `num`, `linsys.ts`, `blockMove.ts`, `schema/editor.ts`, `src/relocation.ts`, `schemaBlocks.ts`, `aiPanel.test.ts`, `schemaTools.test.ts`, `symbolsEn.test.ts`, `toast`, `supabase.ts`, `spellcheck.ts`, `usesDecimalComma`, `spreadsheetEn.test.ts`, `toolbar.ts`, `boardTouchLog.test.ts`, `strokes.ts`, `Sheet`, `page.ts`?**
  _High betweenness centrality (0.090) - this node is a cross-community bridge._
- **Are the 293 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `tutorialModel()`) actually correct?**
  _`Dove sono le cose` has 293 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Comandi`, `Regole`, `6. Glifo anche in inglese` to the rest of the system?**
  _857 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `parseGraph` be split into smaller, more focused modules?**
  _Cohesion score 0.07196969696969698 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.03278236914600551 - nodes in this community are weakly interconnected._