# Graph Report - matherdown  (2026-10-13)

## Corpus Check
- 345 files · ~711,780 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5555 nodes · 20292 edges · 155 communities (116 shown, 39 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 662 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e838b92a`
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
- explain.ts
- distributions.ts
- src/relocation.ts
- svg.ts
- graph.ts
- SchemaEditor
- editor/editor.ts
- SheetEditor
- calcPlugin
- numerical.ts
- arithmetic.ts
- index.ts
- engine.ts
- schema/editor.ts
- feedback.ts
- store.ts
- Parser
- board.ts
- ui/preview.ts
- parse.ts
- several.ts
- gantt.ts
- study.ts
- view3d.ts
- assistant.ts
- logic.ts
- site.ts
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
- planPreview.ts
- Pt
- Rational
- board/shapes.ts
- toolbar.ts
- sidePanel.ts
- .render
- SuggestionController
- PlanView
- spreadsheet/format.ts
- 20261004091555_note_condivise.sql
- i18n.ts
- database.ts
- finite.ts
- topics.ts
- dependencies
- Welcome to Glifo
- spreadsheet/editor.ts
- conics.ts
- odesolve.ts
- sheet.ts
- blockMove.ts
- Benvenuto in Glifo
- compilerOptions
- relocation-test.mjs
- touchLog
- schema/templates.ts
- symbolic.ts
- .constructor
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- boardTouchLog.test.ts
- NotesStore
- session-start.sh
- .claude/CLAUDE.md
- Il database degli account (Supabase)
- tutorial.mjs
- Abbonamenti
- smoke-test.mjs
- Costi
- supabase-stub.sql
- account-test.mjs
- schemaGuard.test.ts
- explainPanel.ts
- Glifo – note per Claude
- schemaTools.test.ts
- symbolsEn.test.ts
- siteUpdate.ts
- graph/file.ts
- supabase.ts
- devDependencies
- spellcheck.ts
- laplace.ts
- schema/shapes.ts
- scripts
- setLangForTests
- markdown.ts
- insert.ts
- Le spiegazioni, come funzionano
- strokes.ts
- Sheet
- page.ts
- createFakeSupabase
- Piano per piano
- Parser
- Board
- 20261008130026_commenti.sql
- xlsx.ts
- editor/lists.ts
- .folderItem
- Glifo
- vite
- suggestions.ts
- spreadsheetEn.test.ts
- solve.ts
- calcResults.ts

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 299 edges
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

## Communities (155 total, 39 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.14
Nodes (16): at(), browserStore, clip(), KINDS, LOG_KEY, Moves, MOVES_MAX, pointerDetail() (+8 more)

### Community 1 - "vitest"
Cohesion: 0.06
Nodes (38): vitest, formulaGraph(), formulaGraphLine(), GraphItem, parseGraph(), PALETTES, light, text() (+30 more)

### Community 2 - "main.ts"
Cohesion: 0.03
Nodes (142): Dove sono le cose, Glifo – architettura, addToGraphBlock(), insertGraphBlock(), setGraphLabels(), graphsForFile(), remapGraphLines(), graphBlockText() (+134 more)

### Community 3 - "compile"
Cohesion: 0.03
Nodes (140): constantIntegrand(), depth(), inequalityMargin(), integralRegion, LayeredSolid, Multiple, multipleOf(), planeMargin() (+132 more)

### Community 4 - "sync.ts"
Cohesion: 0.07
Nodes (30): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+22 more)

### Community 5 - "spec.ts"
Cohesion: 0.04
Nodes (121): conicItems(), isConicLine(), quadricEquation(), T, fourierItems(), isFourierLine(), T, isTestLine() (+113 more)

### Community 6 - "sql.ts"
Cohesion: 0.13
Nodes (21): SchemaEditorOptions, Schema, Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey() (+13 more)

### Community 7 - "num"
Cohesion: 0.11
Nodes (108): atIntegers(), definite(), linearTrig(), signsUp(), symbolicCoefficient(), withoutAbs(), exp(), hyperbolicToExp() (+100 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (42): addLabel(), boxes, cameras, complexCoord(), containing(), coord(), coordinates(), drawings (+34 more)

### Community 9 - "explain.ts"
Cohesion: 0.06
Nodes (73): allNames(), answerFollowUp(), bareResult(), chatContext, ChatFn, chatSubject(), chatSystemPrompt(), checkFormulas() (+65 more)

### Community 10 - "distributions.ts"
Cohesion: 0.06
Nodes (66): addExp(), choose(), continuousQuantile(), decimals(), discreteQuantile(), Distribution, exactIntervalProbability(), expSumValue() (+58 more)

### Community 11 - "src/relocation.ts"
Cohesion: 0.06
Nodes (77): 1. «Cambia account», accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount() (+69 more)

### Community 12 - "svg.ts"
Cohesion: 0.08
Nodes (59): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseWindow(), chooseY(), clipLines(), dataWindow() (+51 more)

### Community 13 - "graph.ts"
Cohesion: 0.09
Nodes (34): fieldInput(), isLanes(), AT_X, cellText(), COMPASS, createEdgeCell(), createGraph(), drawSchema() (+26 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.12
Nodes (3): SchemaEditor, withLaneContents(), serializeSchema()

### Community 15 - "editor/editor.ts"
Cohesion: 0.07
Nodes (35): description, name, private, type, version, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands (+27 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (5): functionLabel(), SheetEditor, englishTyping(), serializeSheet(), cloneSheet()

### Community 18 - "numerical.ts"
Cohesion: 0.11
Nodes (49): FormatOptions, bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial() (+41 more)

### Community 19 - "arithmetic.ts"
Cohesion: 0.10
Nodes (46): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+38 more)

### Community 20 - "index.ts"
Cohesion: 0.06
Nodes (46): pick(), errorName(), b, bigops, c, calculus, fn, fr (+38 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "schema/editor.ts"
Cohesion: 0.05
Nodes (54): schemaSummary(), ALIGN, ALIGN_NAMES, ARROW_NAMES, AT_ICONS, AT_NAMES, BASE_PRESETS, BIG_ARROWS (+46 more)

### Community 23 - "feedback.ts"
Cohesion: 0.10
Nodes (36): SUPABASE_KEY, SUPABASE_URL, Site, commentDate(), commentItem(), COMMENTS_MAX, CommentsDeps, CommentsError (+28 more)

### Community 24 - "store.ts"
Cohesion: 0.09
Nodes (15): fake-indexeddb, BoardBackend, done(), fromRecord(), IdbBoards, ofNote(), openBoardDatabase(), openDefault() (+7 more)

### Community 26 - "board.ts"
Cohesion: 0.06
Nodes (47): Action, ACTION_NAMES, DOT_SIZES, DrawAction, EraseAction, EraserMode, HANDLE_REACH, ICON (+39 more)

### Community 27 - "ui/preview.ts"
Cohesion: 0.06
Nodes (37): svg(), GraphLabels, remapLineKeys(), renameScopeKeys(), BlockKind, MoveDir, Look, Theme (+29 more)

### Community 28 - "parse.ts"
Cohesion: 0.03
Nodes (88): hasWord(), EMPTY_COMPLEX_SCOPE, errorMessage(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS (+80 more)

### Community 29 - "several.ts"
Cohesion: 0.05
Nodes (89): numShown(), close(), Definite, definiteIntegral(), exValue(), samples(), EMPTY_SCOPE, absOf() (+81 more)

### Community 30 - "gantt.ts"
Cohesion: 0.05
Nodes (90): searchPhrases(), amount(), barColor(), crossings(), dateText(), dayMonth(), dayOf(), fitText() (+82 more)

### Community 31 - "study.ts"
Cohesion: 0.14
Nodes (37): limit(), Asymptote, asymptoteText(), boundaries(), compiled(), cutsOf(), defined(), domainOf() (+29 more)

### Community 32 - "view3d.ts"
Cohesion: 0.06
Nodes (91): staticGraphSvg(), addMesh(), addTet(), affinePlane(), Axis, Box, centroid(), chooseBox() (+83 more)

### Community 33 - "assistant.ts"
Cohesion: 0.10
Nodes (29): 4. Più modelli per «Spiegami», 5. A cosa serve la chiave dell'AI, 6. Glifo anche in inglese, 8. Il pulsante ✨ con il contorno, Gli abbonamenti, in tutto questo, In che ordine, La grafica: le otto richieste del 10 ottobre 2026, AiAnswer (+21 more)

### Community 34 - "logic.ts"
Cohesion: 0.11
Nodes (30): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+22 more)

### Community 35 - "site.ts"
Cohesion: 0.24
Nodes (5): vite-plugin-pwa, accountOffMessage(), T, defineFor(), MAIN_BRANCH

### Community 36 - "complex.ts"
Cohesion: 0.04
Nodes (85): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexLine(), isComplexValue() (+77 more)

### Community 37 - "namesIn"
Cohesion: 0.13
Nodes (37): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+29 more)

### Community 38 - "translations.test.ts"
Cohesion: 0.17
Nodes (18): AstNode, calleeName(), check(), checkPair(), visit(), children(), entryPairs(), files (+10 more)

### Community 39 - "resize.ts"
Cohesion: 0.13
Nodes (19): EDITOR_SHARE, LAYOUT_KEY, NOTES_WIDTH, PANE_LIMITS, PaneSizes, SizeLimits, SYMBOLS_WIDTH, aria() (+11 more)

### Community 40 - "ExplainPanel"
Cohesion: 0.15
Nodes (4): ExplainChat, ExplainPanel, preventFocusSteal(), setup()

### Community 41 - "BoardStore"
Cohesion: 0.06
Nodes (29): 2. La pagina dei commenti, tipo FAQ, BoardStore, MemoryBoards, newStrokeId(), renameGraphScope(), applyAccountChange(), applySpellcheck(), backup() (+21 more)

### Community 42 - "localModels.ts"
Cohesion: 0.08
Nodes (36): @mlc-ai/web-llm, chat(), GlifoError, Gpu, load(), post(), remove(), scope (+28 more)

### Community 43 - "FoldersStore"
Cohesion: 0.16
Nodes (4): cleanFolderName(), FoldersStore, sameName(), names()

### Community 44 - "functions.ts"
Cohesion: 0.08
Nodes (65): EMPTY, number(), T, addFormat(), divFormat(), GENERAL, mulFormat(), withCents() (+57 more)

### Community 45 - "MathError"
Cohesion: 0.05
Nodes (99): usesDecimalComma(), MathError, angleBetween(), asMatrix(), basisOf(), characteristicPolynomial(), circleText(), cross() (+91 more)

### Community 46 - "planPreview.ts"
Cohesion: 0.09
Nodes (28): T, cache, capability(), ClaudeRuntime, hostDownloads, HostError, hostSample, inClaudeViewer() (+20 more)

### Community 47 - "Pt"
Cohesion: 0.12
Nodes (12): clampZoom(), coalesced(), Finger, LassoAction, MoveAction, pointsOf(), pressureOf(), validView() (+4 more)

### Community 48 - "Rational"
Cohesion: 0.11
Nodes (23): Part, expSum, kronrod(), spend(), bigGcd(), binomExact(), conditionExact(), evaluateExact() (+15 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.14
Nodes (34): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+26 more)

### Community 50 - "toolbar.ts"
Cohesion: 0.17
Nodes (16): insertBlock(), wrapSelection(), ListStyleId, Action, createToolbar(), insertCode(), insertLink(), listStyle() (+8 more)

### Community 51 - "sidePanel.ts"
Cohesion: 0.09
Nodes (31): valueNode(), SuggestionItem, labelHtml(), texHtml(), localizeTex(), checkHtml(), checkTitle(), T (+23 more)

### Community 53 - "SuggestionController"
Cohesion: 0.26
Nodes (3): EditorMathContext, expand(), SuggestionController

### Community 54 - "PlanView"
Cohesion: 0.29
Nodes (4): ganttWidth(), PlanView, GraphLook, Palette

### Community 55 - "spreadsheet/format.ts"
Cohesion: 0.07
Nodes (56): KINDS, sheetSummary(), T, WidgetBlock, WidgetKind, quantity(), SchemaBlock, booleanText() (+48 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "i18n.ts"
Cohesion: 0.04
Nodes (94): 3. Le impostazioni divise in sezioni, SyncStatus, AI_SERVICES, aiService, T, browserLanguages(), dateLocale(), Entry (+86 more)

### Community 58 - "database.ts"
Cohesion: 0.21
Nodes (7): @electric-sql/pglite, createDatabase(), createUser(), databaseTests(), feedbackTests(), migrations, shareTests()

### Community 59 - "finite.ts"
Cohesion: 0.17
Nodes (28): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+20 more)

### Community 60 - "topics.ts"
Cohesion: 0.11
Nodes (32): ATTRIBUTES, cut(), ER_SHAPES, fieldText(), fitLines(), flowOrder(), formulaText(), FREE_NAMES (+24 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "Welcome to Glifo"
Cohesion: 0.20
Nodes (9): A few examples, Calculations and graphs, For programming too, Handy shortcuts, How to write formulas, Lists, Spell check, Try it now (+1 more)

### Community 63 - "spreadsheet/editor.ts"
Cohesion: 0.08
Nodes (46): currentCall(), Editing, MenuEntry, Move, PATHS, SheetEditorOptions, Snapshot, T (+38 more)

### Community 64 - "conics.ts"
Cohesion: 0.17
Nodes (30): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+22 more)

### Community 65 - "odesolve.ts"
Cohesion: 0.08
Nodes (73): addWave(), arrange(), bernoulliFamily(), characteristicRoots(), compiled(), constantNames(), constantParticular(), constantRoots() (+65 more)

### Community 66 - "sheet.ts"
Cohesion: 0.07
Nodes (68): OdeFunction, ExactScope, decimalSeparator(), Digits, formatNumber(), formatRational(), fromNumber(), fromRational() (+60 more)

### Community 68 - "blockMove.ts"
Cohesion: 0.11
Nodes (32): blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove, blockPlace(), closed() (+24 more)

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
Cohesion: 0.29
Nodes (4): 7. Via il registro dei tocchi, movesLine(), seconds(), touchLog

### Community 73 - "schema/templates.ts"
Cohesion: 0.23
Nodes (17): SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), conceptMap(), cycle(), edge(), er() (+9 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (58): combine(), commonMonomial(), Converter, coordinates(), decimalText(), definiteParts(), definiteValue(), degree() (+50 more)

### Community 75 - ".constructor"
Cohesion: 0.18
Nodes (3): closeMathBlockOnEnter(), EditorCallbacks, tabOutOfMath()

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Errore o imprevisto → nel dettaglio, 3. Serve una decisione → frasi complete, 4. Fine del compito → un solo riepilogo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "boardTouchLog.test.ts"
Cohesion: 0.22
Nodes (7): isSaved(), LOG_MAX_LINES, LogStore, SavedLog, clock(), memoryStore(), newLog()

### Community 79 - "NotesStore"
Cohesion: 0.06
Nodes (38): resizer, Deletion, DeletionLog, Folder, FOLDER_NAME_MAX, FolderGroup, groupByFolder(), loadClosedFolders() (+30 more)

### Community 82 - "Il database degli account (Supabase)"
Cohesion: 0.14
Nodes (13): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il controllo anti-robot (CAPTCHA, ottobre 2026), Il database degli account (Supabase), Il progetto, Il trasloco su glifo.page (ottobre 2026) (+5 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.11
Nodes (11): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+3 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.08
Nodes (24): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Deciso (5 ottobre 2026), Deciso (5 ottobre 2026) (+16 more)

### Community 91 - "smoke-test.mjs"
Cohesion: 0.15
Nodes (6): markdown-it, playwright-core, PNG_ICONS, fakeLlmWorker(), firstVisit(), plainContext

### Community 92 - "Costi"
Cohesion: 0.22
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 96 - "account-test.mjs"
Cohesion: 0.11
Nodes (10): device(), login(), newContext, waitFor(), b64(), CAPTCHA_TOKEN, CODE, GOOGLE_CODE (+2 more)

### Community 97 - "schemaGuard.test.ts"
Cohesion: 0.12
Nodes (14): toggleLinePrefix(), besideSchema(), BlockWidget, findWidgetBlocks(), guardBlocks(), schemaBlockRanges(), schemaBlocks(), create() (+6 more)

### Community 98 - "explainPanel.ts"
Cohesion: 0.05
Nodes (69): explainTarget, ExplainTone, Explanation, FollowUp, REPLY_TOKENS, definedName(), formulaTopic(), graphTopic() (+61 more)

### Community 100 - "Glifo – note per Claude"
Cohesion: 0.10
Nodes (19): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole (+11 more)

### Community 101 - "schemaTools.test.ts"
Cohesion: 0.12
Nodes (25): laneOf(), alignBoxes(), Alignment, Box, distributeBoxes(), Position, cellHtml(), crc32() (+17 more)

### Community 102 - "symbolsEn.test.ts"
Cohesion: 0.14
Nodes (28): editDistance(), singular(), stem(), STOPWORDS, words(), BOTH, buildIndex(), containsPhrase() (+20 more)

### Community 103 - "siteUpdate.ts"
Cohesion: 0.15
Nodes (17): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, PartNotLoaded (+9 more)

### Community 104 - "graph/file.ts"
Cohesion: 0.09
Nodes (41): FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsFromFile(), hide(), OPEN (+33 more)

### Community 105 - "supabase.ts"
Cohesion: 0.07
Nodes (45): @supabase/supabase-js, captchaToken(), loadTurnstile(), Turnstile, TURNSTILE_SCRIPT, Window, AUTH_STORAGE_KEY, TURNSTILE_SITE_KEY (+37 more)

### Community 106 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

### Community 107 - "spellcheck.ts"
Cohesion: 0.08
Nodes (23): misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt(), openAt() (+15 more)

### Community 108 - "laplace.ts"
Cohesion: 0.09
Nodes (63): factoredPolynomial(), oneFraction(), beyondPoles(), compiled(), E, fractionShown(), HALF, inverseLaplaceShown() (+55 more)

### Community 113 - "schema/shapes.ts"
Cohesion: 0.08
Nodes (17): @maxgraph/core, ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape (+9 more)

### Community 118 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 119 - "setLangForTests"
Cohesion: 0.09
Nodes (15): setLangForTests(), DEFAULT_SETTINGS, License, licenseOf(), LICENSES, T, SettingsSection, open() (+7 more)

### Community 120 - "markdown.ts"
Cohesion: 0.09
Nodes (38): dataRange(), bulletGroup(), sameList(), moveAttrs(), alignInside(), asciiTrim(), findMarker(), isOrdered() (+30 more)

### Community 121 - "insert.ts"
Cohesion: 0.20
Nodes (10): InsertOptions, insertTemplate(), templateInsertion(), cardPreviewTex(), formPreviewTex(), ParsedTemplate, parseTemplate(), PLACEHOLDER_TEX (+2 more)

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "strokes.ts"
Cohesion: 0.09
Nodes (38): centerOn(), copyStrokes(), cross(), IDENTITY, insideLasso(), keepInside(), LASSO_SHARE, lassoed() (+30 more)

### Community 124 - "Sheet"
Cohesion: 0.07
Nodes (29): ExactComplexScope, Ode, withWorkLimit(), FiniteContext, FormattedResult, chiSquareTest(), InferenceContext, significance() (+21 more)

### Community 125 - "page.ts"
Cohesion: 0.06
Nodes (45): katex, accountDataFile(), PullResult, openShareDialog(), changeAccess(), changeCopy(), refreshChanged(), render() (+37 more)

### Community 128 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 132 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 133 - "Parser"
Cohesion: 0.29
Nodes (3): FormulaError, parseFormula(), Parser

### Community 136 - "Board"
Cohesion: 0.11
Nodes (5): Board, BoardOptions, loadPrefs(), highlightName(), inkName()

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 141 - "xlsx.ts"
Cohesion: 0.09
Nodes (44): RFC-4180, fflate, csvCell(), csvDelimiter(), csvNumbers(), csvToSheet(), digitsOf(), field() (+36 more)

### Community 142 - "editor/lists.ts"
Cohesion: 0.11
Nodes (53): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+45 more)

### Community 143 - ".folderItem"
Cohesion: 0.22
Nodes (3): clear(), NotesPanel, NotesPanelDeps

### Community 146 - "Glifo"
Cohesion: 0.12
Nodes (16): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Commenti, Compatibilità con VS Code, Condividere una nota con un link (+8 more)

### Community 154 - "vite"
Cohesion: 0.29
Nodes (4): vite, minutes, postMessage(), started

### Community 156 - "suggestions.ts"
Cohesion: 0.25
Nodes (13): preferredIndex(), normalizeText(), IndexedEntry, SearchResult, getIndex(), isSubsequence(), keysOf(), MatchKind (+5 more)

### Community 157 - "spreadsheetEn.test.ts"
Cohesion: 0.06
Nodes (61): at(), breakEven(), Point, T, tableItems(), textLabel(), graphKeyLine(), chartData (+53 more)

### Community 159 - "solve.ts"
Cohesion: 0.13
Nodes (30): FieldContext, Scope, LinearScope, isStandardUnknown(), linearSystem(), matrixEquation(), RelOp, breaks() (+22 more)

### Community 162 - "calcResults.ts"
Cohesion: 0.05
Nodes (50): @codemirror/language, @codemirror/state, @codemirror/view, @lezer/common, acceptCalcResult(), CalcCheck, calcOutcomes(), CalcResult (+42 more)

## Knowledge Gaps
- **863 isolated node(s):** `session-start.sh script`, `name`, `private`, `version`, `description` (+858 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1180 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **39 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `texts` connect `i18n.ts` to `main.ts`, `compile`, `spec.ts`, `sql.ts`, `graph/preview.ts`, `explain.ts`, `distributions.ts`, `src/relocation.ts`, `svg.ts`, `xlsx.ts`, `editor/lists.ts`, `editor/editor.ts`, `numerical.ts`, `arithmetic.ts`, `index.ts`, `schema/editor.ts`, `feedback.ts`, `board.ts`, `ui/preview.ts`, `parse.ts`, `spreadsheetEn.test.ts`, `gantt.ts`, `several.ts`, `solve.ts`, `assistant.ts`, `calcResults.ts`, `logic.ts`, `complex.ts`, `namesIn`, `study.ts`, `site.ts`, `resize.ts`, `BoardStore`, `localModels.ts`, `functions.ts`, `MathError`, `planPreview.ts`, `toolbar.ts`, `sidePanel.ts`, `spreadsheet/format.ts`, `finite.ts`, `topics.ts`, `spreadsheet/editor.ts`, `conics.ts`, `odesolve.ts`, `sheet.ts`, `schema/templates.ts`, `symbolic.ts`, `NotesStore`, `explainPanel.ts`, `schemaTools.test.ts`, `siteUpdate.ts`, `graph/file.ts`, `supabase.ts`, `spellcheck.ts`, `laplace.ts`, `setLangForTests`, `page.ts`?**
  _High betweenness centrality (0.119) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `main.ts` to `vitest`, `compile`, `spec.ts`, `Parser`, `num`, `Board`, `explain.ts`, `graph/preview.ts`, `src/relocation.ts`, `svg.ts`, `distributions.ts`, `graph.ts`, `SchemaEditor`, `xlsx.ts`, `SheetEditor`, `numerical.ts`, `arithmetic.ts`, `schema/editor.ts`, `Parser`, `ui/preview.ts`, `parse.ts`, `spreadsheetEn.test.ts`, `gantt.ts`, `solve.ts`, `view3d.ts`, `assistant.ts`, `logic.ts`, `several.ts`, `complex.ts`, `namesIn`, `study.ts`, `site.ts`, `ExplainPanel`, `BoardStore`, `localModels.ts`, `calcResults.ts`, `functions.ts`, `MathError`, `planPreview.ts`, `Pt`, `Rational`, `board/shapes.ts`, `toolbar.ts`, `sidePanel.ts`, `.render`, `PlanView`, `spreadsheet/format.ts`, `i18n.ts`, `finite.ts`, `topics.ts`, `spreadsheet/editor.ts`, `conics.ts`, `odesolve.ts`, `sheet.ts`, `blockMove.ts`, `symbolic.ts`, `.constructor`, `NotesStore`, `tutorial.mjs`, `smoke-test.mjs`, `schemaGuard.test.ts`, `explainPanel.ts`, `Glifo – note per Claude`, `schemaTools.test.ts`, `siteUpdate.ts`, `graph/file.ts`, `supabase.ts`, `laplace.ts`, `schema/shapes.ts`, `setLangForTests`, `markdown.ts`, `strokes.ts`, `Sheet`?**
  _High betweenness centrality (0.116) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `touchlog.ts`, `main.ts`, `sql.ts`, `num`, `explain.ts`, `distributions.ts`, `src/relocation.ts`, `svg.ts`, `xlsx.ts`, `editor/lists.ts`, `editor/editor.ts`, `schema/editor.ts`, `feedback.ts`, `store.ts`, `board.ts`, `ui/preview.ts`, `parse.ts`, `spreadsheetEn.test.ts`, `gantt.ts`, `view3d.ts`, `assistant.ts`, `calcResults.ts`, `site.ts`, `translations.test.ts`, `resize.ts`, `BoardStore`, `localModels.ts`, `MathError`, `Rational`, `board/shapes.ts`, `i18n.ts`, `database.ts`, `spreadsheet/editor.ts`, `blockMove.ts`, `boardTouchLog.test.ts`, `NotesStore`, `schemaGuard.test.ts`, `explainPanel.ts`, `schemaTools.test.ts`, `symbolsEn.test.ts`, `siteUpdate.ts`, `graph/file.ts`, `supabase.ts`, `spellcheck.ts`, `setLangForTests`, `markdown.ts`, `insert.ts`, `strokes.ts`, `Sheet`, `page.ts`?**
  _High betweenness centrality (0.074) - this node is a cross-community bridge._
- **Are the 298 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `tutorialModel()`) actually correct?**
  _`Dove sono le cose` has 298 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `name`, `private` to the rest of the system?**
  _863 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `touchlog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._
- **Should `vitest` be split into smaller, more focused modules?**
  _Cohesion score 0.05536723163841808 - nodes in this community are weakly interconnected._