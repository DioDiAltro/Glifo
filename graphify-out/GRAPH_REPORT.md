# Graph Report - matherdown  (2026-10-10)

## Corpus Check
- 321 files · ~616,433 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5110 nodes · 18430 edges · 155 communities (118 shown, 37 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 604 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `191449b4`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- touchlog.ts
- Parser
- main.ts
- compile
- sync.ts
- spec.ts
- SheetEvaluator
- num
- graph/preview.ts
- Dove sono le cose
- chart.ts
- editor/lists.ts
- svg.ts
- editor/editor.ts
- SchemaEditor
- Board
- SheetEditor
- editor.test.ts
- numerical.ts
- arithmetic.ts
- index.ts
- engine.ts
- topics.ts
- graph.ts
- store.ts
- MathError
- exact.ts
- assistant.ts
- parse.ts
- view3d.ts
- gantt.ts
- markdown.ts
- search.ts
- spell.test.ts
- logic.ts
- feedback.ts
- complex.ts
- namesIn
- Rational
- resize.ts
- Stroke
- sheet.ts
- several.ts
- study.ts
- functions.ts
- finite.ts
- NotesStore
- formatNumber
- probability.ts
- board/shapes.ts
- FoldersStore
- SidePanel
- In programma
- supabase.ts
- aiActivity.ts
- planPreview.ts
- 20261004091555_note_condivise.sql
- gauss.ts
- dialogs.ts
- odesolve.ts
- Glifo
- dependencies
- openMenu
- toLatex
- h
- Piano per piano
- spreadsheet/editor.ts
- blockMove.ts
- smoke-test.mjs
- Benvenuto in Glifo
- compilerOptions
- relocation-test.mjs
- .int
- toolbar.ts
- symbolic.ts
- sidePanel.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- distributions.ts
- session-start.sh
- .claude/CLAUDE.md
- Costi
- tutorial.mjs
- Abbonamenti
- calcResults.ts
- supabase-stub.sql
- account-test.mjs
- statsShown.ts
- La lavagna
- page.ts
- linsys.ts
- schema/templates.ts
- siteUpdate.ts
- ui/preview.ts
- .constructor
- board.ts
- explainPanel.ts
- xlsx.ts
- render/lists.ts
- schema/shapes.ts
- Il database degli account (Supabase)
- Glifo – note per Claude
- ExplainPanel
- conics.ts
- aiPanel.ts
- files.ts
- Le spiegazioni, come funzionano
- strokes.ts
- Sheet
- sql.ts
- plan.ts
- grafo-html.mjs
- createFakeSupabase
- graph/file.ts
- schemaBlocks.ts
- SuggestionController
- formula.ts
- spiegami-qwen.mjs
- 20261008130026_commenti.sql
- Schema
- vitest
- I modelli e le chiavi API
- BoardOptions
- devDependencies
- restore.test.ts

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 272 edges
2. `MathError` - 151 edges
3. `num()` - 145 edges
4. `Sheet` - 139 edges
5. `MathNode` - 129 edges
6. `mul()` - 124 edges
7. `h()` - 120 edges
8. `Board` - 118 edges
9. `compile()` - 113 edges
10. `Rational` - 111 edges

## Surprising Connections (you probably didn't know these)
- `Dove sono le cose` --references--> `fakeLlmWorker()`  [INFERRED]
  ARCHITETTURA.md → scripts/smoke-test.mjs
- `Il controllo anti-robot (CAPTCHA, ottobre 2026)` --references--> `captchaToken()`  [INFERRED]
  supabase/README.md → src/account/captcha.ts
- `Come viene pubblicata` --references--> `dist()`  [INFERRED]
  README.md → src/board/shapes.ts
- `Trasloco: il sito su Cloudflare, con un dominio tutto di Glifo` --references--> `dist()`  [INFERRED]
  ROADMAP.md → src/board/shapes.ts
- `Dove sono le cose` --references--> `WidgetKind`  [INFERRED]
  ARCHITETTURA.md → src/editor/schemaBlocks.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (155 total, 37 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.09
Nodes (27): at(), browserStore, clip(), isSaved(), KINDS, LOG_KEY, LOG_MAX_LINES, LogStore (+19 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (119): addToGraphBlock(), graphsForFile(), hide(), account, ACCOUNT_OFF, active, aiShown(), aiToggle (+111 more)

### Community 3 - "compile"
Cohesion: 0.05
Nodes (73): argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot(), fieldOn(), outward() (+65 more)

### Community 4 - "sync.ts"
Cohesion: 0.05
Nodes (40): @electric-sql/pglite, AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow (+32 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (105): formulaAtCursor(), GraphLabelLines, insertGraphBlock(), setGraphLabels(), conicItems(), isConicLine(), quadricEquation(), constantIntegrand() (+97 more)

### Community 6 - "SheetEvaluator"
Cohesion: 0.12
Nodes (19): sheetSummary(), openSheetEditor(), evaluateSheet(), SheetEvaluator, hide(), OPEN, sheetsForFile(), sheetsFromFile() (+11 more)

### Community 7 - "num"
Cohesion: 0.13
Nodes (88): atIntegers(), withoutAbs(), exp(), hyperbolicToExp(), inverseRational(), sqrtEx(), termTransform(), polyEx() (+80 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (42): addLabel(), boxes, cameras, complexCoord(), coord(), drawings, drawnViews, endTex() (+34 more)

### Community 9 - "Dove sono le cose"
Cohesion: 0.06
Nodes (69): Dove sono le cose, Glifo – architettura, allNames(), answerFollowUp(), bareResult(), CHAT_SUBJECT, chatContext, ChatFn (+61 more)

### Community 10 - "chart.ts"
Cohesion: 0.13
Nodes (29): at(), breakEven(), Point, quantity(), tableItems(), textLabel(), chartData, chartFrom() (+21 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.12
Nodes (48): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+40 more)

### Community 12 - "svg.ts"
Cohesion: 0.08
Nodes (57): graphImage(), contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), dataWindow() (+49 more)

### Community 13 - "editor/editor.ts"
Cohesion: 0.06
Nodes (33): description, name, private, type, version, @codemirror/autocomplete, @codemirror/commands, @codemirror/language-data (+25 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.12
Nodes (3): isLanes(), SchemaEditor, withLaneContents()

### Community 15 - "Board"
Cohesion: 0.08
Nodes (6): Board, clampZoom(), loadPrefs(), penErases(), pressureOf(), validView()

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (7): rangeLabel(), SheetEditor, decimalsOf(), sameFormat(), CellRange, clearRange(), cloneSheet()

### Community 17 - "editor.test.ts"
Cohesion: 0.07
Nodes (30): @lezer/common, tabOutOfMath(), InsertOptions, insertTemplate(), templateInsertion(), CODE_NODES, CommandToken, commandTokenAt() (+22 more)

### Community 18 - "numerical.ts"
Cohesion: 0.12
Nodes (47): bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial(), interpolating() (+39 more)

### Community 19 - "arithmetic.ts"
Cohesion: 0.07
Nodes (77): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+69 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (41): b, bigops, c, calculus, fn, fr, fractions, functions (+33 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "topics.ts"
Cohesion: 0.07
Nodes (51): ATTRIBUTES, count(), cut(), definedName(), ER_SHAPES, fieldText(), fitLines(), flowOrder() (+43 more)

### Community 23 - "graph.ts"
Cohesion: 0.11
Nodes (29): fieldInput(), textWidth(), AT_X, cellHtml(), cellText(), COMPASS, createEdgeCell(), createGraph() (+21 more)

### Community 24 - "store.ts"
Cohesion: 0.06
Nodes (18): fake-indexeddb, BoardBackend, BoardData, BoardStore, done(), fromRecord(), IdbBoards, MemoryBoards (+10 more)

### Community 25 - "MathError"
Cohesion: 0.12
Nodes (57): MathError, nameLabel(), UndefinedName, angleBetween(), asMatrix(), basisOf(), circleText(), cross() (+49 more)

### Community 26 - "exact.ts"
Cohesion: 0.17
Nodes (14): bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactFunction, ExactRandom, exactRoot(), ExactUnavailable (+6 more)

### Community 27 - "assistant.ts"
Cohesion: 0.09
Nodes (29): 4. Più modelli per «Spiegami», 5. A cosa serve la chiave dell'AI, 6. Glifo anche in inglese, La grafica: le otto richieste del 10 ottobre 2026, @anthropic-ai/sdk, AiAnswer, AiError, AiResult (+21 more)

### Community 28 - "parse.ts"
Cohesion: 0.06
Nodes (38): hasWord(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, differentialInFraction() (+30 more)

### Community 29 - "view3d.ts"
Cohesion: 0.06
Nodes (84): tickLabel(), addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon() (+76 more)

### Community 30 - "gantt.ts"
Cohesion: 0.06
Nodes (65): amount(), barColor(), crossings(), dateText(), dayOf(), fitText(), GanttOptions, ganttSvg() (+57 more)

### Community 31 - "markdown.ts"
Cohesion: 0.09
Nodes (36): @lezer/highlight, @lezer/markdown, lineDepth(), mathDelimTag, mathTag, parseBlockMath(), dataRange(), moveAttrs() (+28 more)

### Community 32 - "search.ts"
Cohesion: 0.18
Nodes (23): editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex() (+15 more)

### Community 33 - "spell.test.ts"
Cohesion: 0.07
Nodes (29): @codemirror/lang-markdown, noIndentedCode, mathMarkdown, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck() (+21 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "feedback.ts"
Cohesion: 0.06
Nodes (47): vite-plugin-pwa, captchaToken(), loadTurnstile(), Turnstile, TURNSTILE_SCRIPT, Window, AUTH_STORAGE_KEY, SUPABASE_KEY (+39 more)

### Community 36 - "complex.ts"
Cohesion: 0.08
Nodes (40): add(), allRoots(), arg(), asin(), atan(), compileApply(), compileComplex(), compileFunction() (+32 more)

### Community 37 - "namesIn"
Cohesion: 0.14
Nodes (35): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+27 more)

### Community 38 - "Rational"
Cohesion: 0.12
Nodes (32): Part, Rational, absOf(), boundsOf(), close(), definite(), fourierProblem, fourierShown() (+24 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 41 - "sheet.ts"
Cohesion: 0.06
Nodes (43): FieldContext, criticalLine(), isSeveralLine(), named(), severalItems(), surface(), numericPartials(), Ode (+35 more)

### Community 42 - "several.ts"
Cohesion: 0.13
Nodes (38): severalLimit, fractionNear(), at(), bounded(), Candidate, candidates(), compiled(), constraintsOf() (+30 more)

### Community 43 - "study.ts"
Cohesion: 0.07
Nodes (61): close(), Definite, definiteIntegral(), exValue(), samples(), EMPTY_SCOPE, Piece, alternating() (+53 more)

### Community 44 - "functions.ts"
Cohesion: 0.08
Nodes (66): EMPTY, number(), addFormat(), divFormat(), GENERAL, MAX_DECIMALS, most(), mulFormat() (+58 more)

### Community 45 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 46 - "NotesStore"
Cohesion: 0.05
Nodes (73): accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf() (+65 more)

### Community 47 - "formatNumber"
Cohesion: 0.09
Nodes (37): realPart(), decimalSeparator(), Digits, formatNumber(), formatRational(), fromNumber(), fromRational(), SUPERSCRIPT (+29 more)

### Community 48 - "probability.ts"
Cohesion: 0.09
Nodes (29): End, Family, CompileOptions, ExactScope, rejection(), RelOp, ALL, compileOf() (+21 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (35): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+27 more)

### Community 50 - "FoldersStore"
Cohesion: 0.17
Nodes (3): cleanFolderName(), FoldersStore, sameName()

### Community 51 - "SidePanel"
Cohesion: 0.22
Nodes (3): displayCode(), preventFocusSteal(), SidePanel

### Community 52 - "In programma"
Cohesion: 0.25
Nodes (8): Account: i propri appunti su ogni dispositivo, anche da condividere, Idee per il futuro, In programma, La grafica: account, impostazioni, commenti, AI e lingua (chiesto il 10 ottobre 2026, se ne parla), La lavagna: idee in più, Più avanti, Schemi: idee in più, Trasloco: il sito su Cloudflare, con un dominio tutto di Glifo

### Community 53 - "supabase.ts"
Cohesion: 0.10
Nodes (36): @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken(), ensureSessionOf() (+28 more)

### Community 54 - "aiActivity.ts"
Cohesion: 0.36
Nodes (3): AI_NEWS_TITLE, AI_WORKING_TITLE, aiActivity

### Community 55 - "planPreview.ts"
Cohesion: 0.16
Nodes (14): labelPlain(), planName(), planPicture, ganttWidth(), PlanView, base64(), crc32(), svgSize() (+6 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "gauss.ts"
Cohesion: 0.13
Nodes (24): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexLine(), isComplexValue() (+16 more)

### Community 58 - "dialogs.ts"
Cohesion: 0.09
Nodes (23): 3. Le impostazioni divise in sezioni, EXPLAIN_TONES, ExplainTone, DEFAULT_LOCAL_MODEL, AI_SERVICES, aiService, aiSettingsOf(), ACCOUNT_SETTINGS (+15 more)

### Community 59 - "odesolve.ts"
Cohesion: 0.08
Nodes (82): linearIn(), addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames() (+74 more)

### Community 60 - "Glifo"
Cohesion: 0.13
Nodes (15): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Commenti, Compatibilità con VS Code, Condividere una nota con un link (+7 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "openMenu"
Cohesion: 0.16
Nodes (6): clear(), formatDate(), MenuEntry, openMenu(), NotesPanel, NotesPanelDeps

### Community 63 - "toLatex"
Cohesion: 0.07
Nodes (54): fourierItems(), isFourierLine(), isTestLine(), number(), testItems(), isNumericalLine(), numericalItems(), figureText() (+46 more)

### Community 64 - "h"
Cohesion: 0.05
Nodes (67): 1. «Cambia account», SyncStatus, board, helpButton, openGuide(), sidebarToggle(), signOutAccount(), viewSwitch (+59 more)

### Community 65 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 66 - "spreadsheet/editor.ts"
Cohesion: 0.10
Nodes (48): currentCall(), Editing, MenuEntry, Move, PATHS, SheetEditorOptions, Snapshot, CellResult (+40 more)

### Community 67 - "blockMove.ts"
Cohesion: 0.14
Nodes (29): blockMoveTransaction(), blank(), blockPlace(), closed(), closeIdx(), contentHash(), fenceClosed(), fenceName() (+21 more)

### Community 68 - "smoke-test.mjs"
Cohesion: 0.25
Nodes (5): markdown-it, playwright-core, fakeLlmWorker(), firstVisit(), plainContext

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "relocation-test.mjs"
Cohesion: 0.18
Nodes (7): AFTER_MOVE, ids, newBrowser(), NOTICE_DAY, out, serve(), TYPES

### Community 72 - ".int"
Cohesion: 0.11
Nodes (8): characteristicPolynomial(), eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn(), R()

### Community 73 - "toolbar.ts"
Cohesion: 0.19
Nodes (15): insertBlock(), wrapSelection(), Action, createToolbar(), insertCode(), insertLink(), listMenu(), listStyle() (+7 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (60): primitive(), verified(), atValues(), Converter, coordinates(), decimalText(), definiteParts(), definiteValue() (+52 more)

### Community 75 - "sidePanel.ts"
Cohesion: 0.15
Nodes (18): expand(), preferredIndex(), SuggestionItem, isConfidentAnswer(), SearchResult, CATEGORIES, symbolsInCategory(), cardPreviewTex() (+10 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Errore o imprevisto → nel dettaglio, 3. Serve una decisione → frasi complete, 4. Fine del compito → un solo riepilogo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.05
Nodes (55): schemaSummary(), svg(), alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN (+47 more)

### Community 79 - "distributions.ts"
Cohesion: 0.06
Nodes (64): addExp(), choose(), continuousQuantile(), discreteQuantile(), Distribution, exactIntervalProbability(), expSum, expSumValue() (+56 more)

### Community 82 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 83 - "tutorial.mjs"
Cohesion: 0.20
Nodes (6): centerOf(), clickOn(), ffmpeg, SCENES, SIZE, work

### Community 90 - "Abbonamenti"
Cohesion: 0.14
Nodes (14): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+6 more)

### Community 91 - "calcResults.ts"
Cohesion: 0.08
Nodes (36): @codemirror/language, @codemirror/state, explainTarget, schemaTitle(), acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin (+28 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.12
Nodes (10): device(), login(), newContext, waitFor(), b64(), CAPTCHA_TOKEN, CODE, GOOGLE_CODE (+2 more)

### Community 97 - "statsShown.ts"
Cohesion: 0.17
Nodes (32): check(), correlation(), count(), covariance(), Data, dataStatistic(), deviation(), fail() (+24 more)

### Community 98 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 100 - "page.ts"
Cohesion: 0.07
Nodes (40): accountDataFile(), PullResult, openShareDialog(), changeAccess(), changeCopy(), copy(), refreshChanged(), render() (+32 more)

### Community 101 - "linsys.ts"
Cohesion: 0.08
Nodes (68): fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), FormatOptions, recognize() (+60 more)

### Community 102 - "schema/templates.ts"
Cohesion: 0.11
Nodes (17): DEFAULT_EDGE, SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), tableMetrics(), conceptMap, cycle (+9 more)

### Community 103 - "siteUpdate.ts"
Cohesion: 0.17
Nodes (15): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, PartNotLoaded (+7 more)

### Community 104 - "ui/preview.ts"
Cohesion: 0.08
Nodes (24): GraphLabels, GraphLook, BlockKind, MoveDir, Look, SchemaError, Theme, draw() (+16 more)

### Community 106 - "board.ts"
Cohesion: 0.06
Nodes (54): Action, ACTION_NAMES, coalesced(), DOT_SIZES, DrawAction, EraseAction, EraserMode, Finger (+46 more)

### Community 107 - "explainPanel.ts"
Cohesion: 0.07
Nodes (44): @mlc-ai/web-llm, Explanation, FollowUp, REPLY_TOKENS, chat(), GlifoError, Gpu, load() (+36 more)

### Community 108 - "xlsx.ts"
Cohesion: 0.11
Nodes (35): RFC-4180, fflate, csvDelimiter(), csvToSheet(), field(), italian(), parseCsv(), sheetToCsv() (+27 more)

### Community 110 - "render/lists.ts"
Cohesion: 0.27
Nodes (13): ListStyle, bulletGroup(), Marker, sameList(), alignInside(), asciiTrim(), findMarker(), Found (+5 more)

### Community 113 - "schema/shapes.ts"
Cohesion: 0.08
Nodes (17): @maxgraph/core, tableMetricsFor(), ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape (+9 more)

### Community 116 - "Il database degli account (Supabase)"
Cohesion: 0.15
Nodes (12): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il controllo anti-robot (CAPTCHA, ottobre 2026), Il database degli account (Supabase), Il progetto, Il trasloco su glifo.page (ottobre 2026) (+4 more)

### Community 117 - "Glifo – note per Claude"
Cohesion: 0.15
Nodes (12): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole (+4 more)

### Community 118 - "ExplainPanel"
Cohesion: 0.17
Nodes (3): ExplainChat, ExplainPanel, preventFocusSteal()

### Community 119 - "conics.ts"
Cohesion: 0.18
Nodes (29): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+21 more)

### Community 120 - "aiPanel.ts"
Cohesion: 0.13
Nodes (20): valueNode(), NoteSubject, SubjectKind, texHtml(), checkHtml(), checkTitle(), cache, cleanKatexError() (+12 more)

### Community 121 - "files.ts"
Cohesion: 0.18
Nodes (16): 2. La pagina dei commenti, tipo FAQ, inClaudeViewer(), feedbackButton, openComments(), canWriteFilesDirectly(), FsWindow, isAbort(), MD_TYPES (+8 more)

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "strokes.ts"
Cohesion: 0.09
Nodes (38): centerOn(), copyStrokes(), cross(), handleScale(), IDENTITY, insideLasso(), keepInside(), LASSO_SHARE (+30 more)

### Community 124 - "Sheet"
Cohesion: 0.08
Nodes (27): Definition, Line, ExactComplexScope, withWorkLimit(), FormattedResult, differentialRequest, pieces(), MathNode (+19 more)

### Community 125 - "sql.ts"
Cohesion: 0.17
Nodes (18): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+10 more)

### Community 126 - "plan.ts"
Cohesion: 0.18
Nodes (16): NO_TABLE, cellText(), columnRole(), columnsOf(), durationUnit(), isNumber(), isPlanRange(), MAX_ACTIVITIES (+8 more)

### Community 127 - "grafo-html.mjs"
Cohesion: 0.17
Nodes (5): graphFile, names, namesFile, root, PNG_ICONS

### Community 128 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 129 - "graph/file.ts"
Cohesion: 0.09
Nodes (35): FIGURE_PALETTE, figureName(), graphFigure(), graphImagesFor(), graphsFromFile(), OPEN, swatchSvg(), titleBand() (+27 more)

### Community 131 - "schemaBlocks.ts"
Cohesion: 0.11
Nodes (19): toggleLinePrefix(), LIST_STYLES, besideSchema(), BlockWidget, findWidgetBlocks(), guardBlocks(), KINDS, schemaBlockRanges() (+11 more)

### Community 133 - "formula.ts"
Cohesion: 0.13
Nodes (18): BinOp, COMPARE, ERRORS_BY_LENGTH, formulaBody(), FormulaError, OPERATORS, parseFormula(), Parser (+10 more)

### Community 136 - "spiegami-qwen.mjs"
Cohesion: 0.29
Nodes (4): vite, minutes, postMessage(), started

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 139 - "Schema"
Cohesion: 0.26
Nodes (5): loadDialect(), SchemaEditorOptions, Schema, serializeSchema(), Template

### Community 140 - "vitest"
Cohesion: 0.06
Nodes (47): vitest, staticGraphSvg(), chooseWindow(), Box, chooseBox(), formulaGraph(), GraphItem, parseGraph() (+39 more)

### Community 141 - "I modelli e le chiavi API"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), In prova sul ramo `prova` (7 ottobre 2026): Qwen3 nel browser per «Spiegami», Le idee dello studente (5 ottobre 2026)

### Community 144 - "devDependencies"
Cohesion: 0.10
Nodes (18): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+10 more)

### Community 145 - "restore.test.ts"
Cohesion: 0.22
Nodes (12): newStrokeId(), receiveRelocation(), restore(), BackupNote, backupNotes(), restoreBackup(), RestoreBoards, Restored (+4 more)

## Knowledge Gaps
- **698 isolated node(s):** `session-start.sh script`, `name`, `private`, `version`, `description` (+693 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 980 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **37 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `touchlog.ts`, `graph/file.ts`, `main.ts`, `schemaBlocks.ts`, `compile`, `spec.ts`, `Parser`, `num`, `graph/preview.ts`, `SheetEvaluator`, `chart.ts`, `formula.ts`, `svg.ts`, `editor/editor.ts`, `vitest`, `Board`, `SchemaEditor`, `SheetEditor`, `numerical.ts`, `arithmetic.ts`, `topics.ts`, `graph.ts`, `store.ts`, `MathError`, `assistant.ts`, `parse.ts`, `view3d.ts`, `gantt.ts`, `markdown.ts`, `logic.ts`, `feedback.ts`, `complex.ts`, `namesIn`, `Rational`, `Stroke`, `several.ts`, `study.ts`, `functions.ts`, `finite.ts`, `NotesStore`, `board/shapes.ts`, `SidePanel`, `supabase.ts`, `planPreview.ts`, `gauss.ts`, `dialogs.ts`, `odesolve.ts`, `toLatex`, `h`, `spreadsheet/editor.ts`, `blockMove.ts`, `smoke-test.mjs`, `toolbar.ts`, `symbolic.ts`, `sidePanel.ts`, `distributions.ts`, `calcResults.ts`, `statsShown.ts`, `linsys.ts`, `siteUpdate.ts`, `ui/preview.ts`, `.constructor`, `board.ts`, `explainPanel.ts`, `xlsx.ts`, `ExplainPanel`, `conics.ts`, `aiPanel.ts`, `files.ts`, `strokes.ts`, `Sheet`, `plan.ts`?**
  _High betweenness centrality (0.202) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `touchlog.ts`, `graph/file.ts`, `main.ts`, `compile`, `sync.ts`, `schemaBlocks.ts`, `SheetEvaluator`, `num`, `graph/preview.ts`, `Dove sono le cose`, `chart.ts`, `editor/lists.ts`, `editor/editor.ts`, `editor.test.ts`, `restore.test.ts`, `topics.ts`, `store.ts`, `assistant.ts`, `parse.ts`, `gantt.ts`, `markdown.ts`, `search.ts`, `spell.test.ts`, `feedback.ts`, `resize.ts`, `sheet.ts`, `NotesStore`, `board/shapes.ts`, `supabase.ts`, `aiActivity.ts`, `dialogs.ts`, `h`, `spreadsheet/editor.ts`, `blockMove.ts`, `sidePanel.ts`, `schema/editor.ts`, `distributions.ts`, `page.ts`, `linsys.ts`, `siteUpdate.ts`, `board.ts`, `explainPanel.ts`, `xlsx.ts`, `strokes.ts`, `Sheet`, `sql.ts`, `plan.ts`?**
  _High betweenness centrality (0.101) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `main.ts`, `graph/preview.ts`, `Schema`, `SchemaEditor`, `Board`, `SheetEditor`, `restore.test.ts`, `graph.ts`, `spell.test.ts`, `feedback.ts`, `resize.ts`, `Stroke`, `NotesStore`, `SidePanel`, `planPreview.ts`, `dialogs.ts`, `openMenu`, `spreadsheet/editor.ts`, `toolbar.ts`, `sidePanel.ts`, `schema/editor.ts`, `page.ts`, `ui/preview.ts`, `board.ts`, `explainPanel.ts`, `ExplainPanel`, `aiPanel.ts`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **Are the 271 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `adoptGuestNotes()`) actually correct?**
  _`Dove sono le cose` has 271 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `name`, `private` to the rest of the system?**
  _698 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `touchlog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08653061224489796 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0360540223135643 - nodes in this community are weakly interconnected._