# Graph Report - matherdown  (2026-10-10)

## Corpus Check
- 321 files · ~616,433 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5107 nodes · 18427 edges · 153 communities (118 shown, 35 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 604 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `50bfe213`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- touchlog.ts
- Parser
- main.ts
- compile
- sync.ts
- spec.ts
- spreadsheet/evaluate.ts
- num
- graph/preview.ts
- Dove sono le cose
- spreadsheet/format.ts
- editor/lists.ts
- svg.ts
- editor/editor.ts
- SchemaEditor
- Board
- SheetEditor
- editor.test.ts
- numerical.ts
- laplace.ts
- index.ts
- engine.ts
- topics.ts
- .renderFormat
- store.ts
- MathError
- Rational
- assistant.ts
- parse.ts
- view3d.ts
- graph/file.ts
- tutorial.ts
- search.ts
- vitest
- logic.ts
- page.ts
- complex.ts
- namesIn
- arithmetic.ts
- resize.ts
- calcPlugin
- solve.ts
- several.ts
- study.ts
- functions.ts
- finite.ts
- NotesStore
- spaces.ts
- inference.ts
- board/shapes.ts
- FoldersStore
- sidePanel.ts
- In programma
- supabase.ts
- aiPanel.test.ts
- parseSchema
- 20261004091555_note_condivise.sql
- Pt
- dialogs.ts
- odesolve.ts
- Glifo
- dependencies
- dom.ts
- toLatex
- ui/relocation.ts
- Piano per piano
- spreadsheet/editor.ts
- markdown.ts
- smoke-test.mjs
- Benvenuto in Glifo
- compilerOptions
- relocation-test.mjs
- Field
- toolbar.ts
- symbolic.ts
- llmWorker.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- probability.ts
- session-start.sh
- .claude/CLAUDE.md
- Costi
- tutorial.mjs
- Abbonamenti
- aiPanel.ts
- supabase-stub.sql
- account-test.mjs
- statsShown.ts
- La lavagna
- icon
- linsys.ts
- schedule.ts
- siteUpdate.ts
- ui/preview.ts
- MarkdownEditor
- Stroke
- explainPanel.ts
- xlsx.ts
- appleTouch
- graph.ts
- Il database degli account (Supabase)
- Glifo – note per Claude
- h
- conics.ts
- AiPanel
- files.ts
- Le spiegazioni, come funzionano
- board.ts
- sheet.ts
- sql.ts
- plan.ts
- grafo-html.mjs
- createFakeSupabase
- labels.ts
- schemaBlocks.ts
- xlsx.test.ts
- Parser
- spiegami-qwen.mjs
- 20261008130026_commenti.sql
- deploy.test.ts
- geometry.test.ts
- devDependencies
- src/relocation.ts

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
- `Trasloco: il sito su Cloudflare, con un dominio tutto di Glifo` --references--> `dist()`  [INFERRED]
  ROADMAP.md → src/board/shapes.ts
- `Dove sono le cose` --references--> `ConicElements`  [INFERRED]
  ARCHITETTURA.md → src/math/conics.ts
- `Dove sono le cose` --references--> `texts()`  [INFERRED]
  ARCHITETTURA.md → tests/boardTouchLog.test.ts
- `Funzionalità` --references--> `k()`  [INFERRED]
  README.md → src/math/numerical.ts
- `Il controllo anti-robot (CAPTCHA, ottobre 2026)` --references--> `captchaToken()`  [INFERRED]
  supabase/README.md → src/account/captcha.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (153 total, 35 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.09
Nodes (27): at(), browserStore, clip(), isSaved(), KINDS, LOG_KEY, LOG_MAX_LINES, LogStore (+19 more)

### Community 1 - "Parser"
Cohesion: 0.17
Nodes (3): describe(), MathSyntaxError, Parser

### Community 2 - "main.ts"
Cohesion: 0.03
Nodes (118): 2. La pagina dei commenti, tipo FAQ, graphsForFile(), hide(), account, ACCOUNT_OFF, accountButton, active, aiShown() (+110 more)

### Community 3 - "compile"
Cohesion: 0.05
Nodes (98): integralRegion, LayeredSolid, criticalLine(), named(), severalItems(), surface(), areaFor(), complexValue() (+90 more)

### Community 4 - "sync.ts"
Cohesion: 0.05
Nodes (40): @electric-sql/pglite, AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow (+32 more)

### Community 5 - "spec.ts"
Cohesion: 0.06
Nodes (94): conicItems(), isConicLine(), quadricEquation(), isFourierLine(), isComplexLine(), isTestLine(), constantIntegrand(), depth() (+86 more)

### Community 6 - "spreadsheet/evaluate.ts"
Cohesion: 0.13
Nodes (26): formulaText(), tableTopic(), valueText(), sheetSummary(), CellResult, EMPTY, evaluateSheet(), number() (+18 more)

### Community 7 - "num"
Cohesion: 0.13
Nodes (92): atIntegers(), linearTrig(), signsUp(), symbolicCoefficient(), withoutAbs(), hyperbolicToExp(), inverseRational(), sqrtEx() (+84 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (41): FIGURE_PALETTE, addLabel(), boxes, cameras, complexCoord(), containing(), coord(), drawings (+33 more)

### Community 9 - "Dove sono le cose"
Cohesion: 0.06
Nodes (72): Dove sono le cose, Glifo – architettura, allNames(), answerFollowUp(), bareResult(), CHAT_SUBJECT, chatContext, ChatFn (+64 more)

### Community 10 - "spreadsheet/format.ts"
Cohesion: 0.10
Nodes (37): at(), breakEven(), Point, quantity(), tableItems(), textLabel(), chartData, chartFrom() (+29 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.09
Nodes (61): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+53 more)

### Community 12 - "svg.ts"
Cohesion: 0.07
Nodes (63): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseWindow(), chooseY(), clipLines(), dataWindow() (+55 more)

### Community 13 - "editor/editor.ts"
Cohesion: 0.05
Nodes (43): description, name, private, scripts, build, dev, preview, test (+35 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.08
Nodes (10): SchemaEditor, SchemaEditorOptions, withLaneContents(), createEdgeCell(), EdgeLook, laneNames(), NodeLook, Schema (+2 more)

### Community 15 - "Board"
Cohesion: 0.08
Nodes (6): Board, clampZoom(), loadPrefs(), penErases(), validView(), highlightName()

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (6): tablesNote(), rangeLabel(), SheetEditor, serializeSheet(), CellRange, cloneSheet()

### Community 17 - "editor.test.ts"
Cohesion: 0.08
Nodes (30): @lezer/common, closeMathBlockOnEnter(), tabOutOfMath(), templateInsertion(), CODE_NODES, CommandToken, commandTokenAt(), isInCode() (+22 more)

### Community 18 - "numerical.ts"
Cohesion: 0.12
Nodes (47): FormatOptions, bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial() (+39 more)

### Community 19 - "laplace.ts"
Cohesion: 0.07
Nodes (68): factoredPolynomial(), factorShown(), homogeneous(), homogeneousParts(), monomial(), numShown(), polynomialOf(), polyShown() (+60 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (40): b, bigops, c, calculus, fn, fr, fractions, functions (+32 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "topics.ts"
Cohesion: 0.17
Nodes (23): ATTRIBUTES, count(), cut(), ER_SHAPES, fieldText(), fitLines(), flowOrder(), FREE_NAMES (+15 more)

### Community 23 - ".renderFormat"
Cohesion: 0.23
Nodes (11): fieldInput(), isLanes(), edgeLook(), edgeStyle(), edgeTextAt(), insertSchema(), nodeLook(), nodeStyle() (+3 more)

### Community 24 - "store.ts"
Cohesion: 0.05
Nodes (23): fake-indexeddb, BoardOptions, BoardBackend, BoardChange, BoardData, BoardStore, done(), fromRecord() (+15 more)

### Community 25 - "MathError"
Cohesion: 0.10
Nodes (65): MathError, angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, dataOf() (+57 more)

### Community 26 - "Rational"
Cohesion: 0.08
Nodes (30): Part, R(), expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactFunction (+22 more)

### Community 27 - "assistant.ts"
Cohesion: 0.09
Nodes (29): @anthropic-ai/sdk, AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible() (+21 more)

### Community 28 - "parse.ts"
Cohesion: 0.06
Nodes (46): typedSliderValue(), errorMessage(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES (+38 more)

### Community 29 - "view3d.ts"
Cohesion: 0.06
Nodes (92): staticGraphSvg(), addMesh(), addTet(), affinePlane(), Axis, Box, centroid(), chooseBox() (+84 more)

### Community 30 - "graph/file.ts"
Cohesion: 0.06
Nodes (70): figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsFromFile(), OPEN, swatchSvg(), titleBand() (+62 more)

### Community 31 - "tutorial.ts"
Cohesion: 0.16
Nodes (12): receiveRelocation(), HINT_MS, markTutorialSeen(), openTutorial(), show(), richText(), showTutorialHint(), close() (+4 more)

### Community 32 - "search.ts"
Cohesion: 0.18
Nodes (22): editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex() (+14 more)

### Community 33 - "vitest"
Cohesion: 0.06
Nodes (39): @codemirror/lang-markdown, @codemirror/state, vitest, addToGraphBlock(), GraphLabelLines, insertGraphBlock(), setGraphLabels(), mathMarkdown (+31 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "page.ts"
Cohesion: 0.05
Nodes (61): SUPABASE_KEY, SUPABASE_URL, accountDataFile(), PullResult, hydrateGraphs(), setPrinting(), NEW_ORIGIN, isShareToken() (+53 more)

### Community 36 - "complex.ts"
Cohesion: 0.06
Nodes (61): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexValue(), isInequality() (+53 more)

### Community 37 - "namesIn"
Cohesion: 0.12
Nodes (40): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+32 more)

### Community 38 - "arithmetic.ts"
Cohesion: 0.12
Nodes (34): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+26 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "calcPlugin"
Cohesion: 0.21
Nodes (3): calcPlugin, CheckWidget, ResultWidget

### Community 41 - "solve.ts"
Cohesion: 0.14
Nodes (32): exponentialForm(), fracTex(), fracText(), nearFraction(), piMultiple(), surd(), formatNumber(), recognize() (+24 more)

### Community 42 - "several.ts"
Cohesion: 0.15
Nodes (35): at(), bounded(), Candidate, candidates(), compiled(), constraintsOf(), COORDS, coordShown() (+27 more)

### Community 43 - "study.ts"
Cohesion: 0.07
Nodes (61): close(), Definite, definiteIntegral(), exValue(), samples(), EMPTY_SCOPE, Piece, close() (+53 more)

### Community 44 - "functions.ts"
Cohesion: 0.11
Nodes (45): addFormat(), Arg, boolArg(), BY_NAME, compareValues(), conditional(), criterion(), Ctx (+37 more)

### Community 45 - "finite.ts"
Cohesion: 0.18
Nodes (24): countOf(), Elem, elemTex(), elemText(), EMPTY, FiniteError, FiniteResult, finiteSetOf() (+16 more)

### Community 46 - "NotesStore"
Cohesion: 0.07
Nodes (43): 1. «Cambia account», accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount() (+35 more)

### Community 47 - "spaces.ts"
Cohesion: 0.14
Nodes (25): decimalSeparator(), Digits, formatRational(), fromNumber(), fromRational(), SUPERSCRIPT, writeDigits(), surdText() (+17 more)

### Community 48 - "inference.ts"
Cohesion: 0.08
Nodes (42): number(), testItems(), classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX, Line (+34 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (36): DrawAction, adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners() (+28 more)

### Community 50 - "FoldersStore"
Cohesion: 0.16
Nodes (4): cleanFolderName(), FoldersStore, sameName(), names()

### Community 51 - "sidePanel.ts"
Cohesion: 0.07
Nodes (44): acceptCalcResult(), CalcCheck, calcOutcomes(), CalcResult, calcResults(), insertResult(), valueNode(), formulaAtCursor() (+36 more)

### Community 52 - "In programma"
Cohesion: 0.25
Nodes (8): Account: i propri appunti su ogni dispositivo, anche da condividere, Idee per il futuro, In programma, La grafica: account, impostazioni, commenti, AI e lingua (chiesto il 10 ottobre 2026, se ne parla), La lavagna: idee in più, Più avanti, Schemi: idee in più, Trasloco: il sito su Cloudflare, con un dominio tutto di Glifo

### Community 53 - "supabase.ts"
Cohesion: 0.08
Nodes (40): @supabase/supabase-js, captchaToken(), loadTurnstile(), Turnstile, TURNSTILE_SCRIPT, Window, AUTH_STORAGE_KEY, TURNSTILE_SITE_KEY (+32 more)

### Community 54 - "aiPanel.test.ts"
Cohesion: 0.12
Nodes (15): definedName(), formulaTopic(), graphTopic(), studyOf(), theoremTopic(), AI_NEWS_TITLE, AI_WORKING_TITLE, aiActivity (+7 more)

### Community 55 - "parseSchema"
Cohesion: 0.15
Nodes (17): schemaSummary(), svg(), base64(), hide(), OPEN, schemasForFile(), schemasFromFile(), unhide() (+9 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "Pt"
Cohesion: 0.13
Nodes (14): coalesced(), EraseAction, Finger, LassoAction, MoveAction, PanAction, PinchAction, pointsOf() (+6 more)

### Community 58 - "dialogs.ts"
Cohesion: 0.09
Nodes (26): 3. Le impostazioni divise in sezioni, EXPLAIN_TONES, ExplainTone, DEFAULT_LOCAL_MODEL, ACCOUNT_SETTINGS, AI_MODELS, DEFAULT_SETTINGS, Settings (+18 more)

### Community 59 - "odesolve.ts"
Cohesion: 0.08
Nodes (78): addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames(), constantParticular() (+70 more)

### Community 60 - "Glifo"
Cohesion: 0.13
Nodes (15): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Commenti, Compatibilità con VS Code, Condividere una nota con un link (+7 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "dom.ts"
Cohesion: 0.12
Nodes (16): Folder, FolderGroup, groupByFolder(), loadClosedFolders(), saveClosedFolders(), Note, NoteMeta, append() (+8 more)

### Community 63 - "toLatex"
Cohesion: 0.05
Nodes (55): FieldContext, fourierItems(), isNumericalLine(), numericalItems(), GraphItem, parseGraph(), names(), STUDY_GRAPH (+47 more)

### Community 64 - "ui/relocation.ts"
Cohesion: 0.17
Nodes (17): moveDayLabel(), RelocationResult, BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark(), downloadButton() (+9 more)

### Community 65 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 66 - "spreadsheet/editor.ts"
Cohesion: 0.09
Nodes (49): currentCall(), Editing, MenuEntry, Move, openSheetEditor(), PATHS, SheetEditorOptions, Snapshot (+41 more)

### Community 67 - "markdown.ts"
Cohesion: 0.06
Nodes (62): blockMoved, blockMoves(), blockMoveTransaction(), LineMap, dataRange(), blank(), BlockMove, blockPlace() (+54 more)

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

### Community 72 - "Field"
Cohesion: 0.13
Nodes (6): eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn()

### Community 73 - "toolbar.ts"
Cohesion: 0.19
Nodes (15): insertBlock(), wrapSelection(), Action, createToolbar(), insertCode(), insertLink(), listMenu(), listStyle() (+7 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (61): definite(), primitive(), verified(), linearCells(), atValues(), Converter, coordinates(), decimalText() (+53 more)

### Community 75 - "llmWorker.ts"
Cohesion: 0.18
Nodes (16): 4. Più modelli per «Spiegami», 5. A cosa serve la chiave dell'AI, 6. Glifo anche in inglese, La grafica: le otto richieste del 10 ottobre 2026, @mlc-ai/web-llm, chat(), GlifoError, Gpu (+8 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Errore o imprevisto → nel dettaglio, 3. Serve una decisione → frasi complete, 4. Fine del compito → un solo riepilogo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.04
Nodes (75): alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ARROW_NAMES, AT_ICONS (+67 more)

### Community 79 - "probability.ts"
Cohesion: 0.07
Nodes (56): addExp(), choose(), continuousQuantile(), discreteQuantile(), End, exactIntervalProbability(), factorialBig(), FAMILIES (+48 more)

### Community 82 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 83 - "tutorial.mjs"
Cohesion: 0.20
Nodes (6): centerOf(), clickOn(), ffmpeg, SCENES, SIZE, work

### Community 90 - "Abbonamenti"
Cohesion: 0.11
Nodes (19): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Deciso (5 ottobre 2026), Fonti (controllate il 4 ottobre 2026) (+11 more)

### Community 91 - "aiPanel.ts"
Cohesion: 0.14
Nodes (25): explainTarget, Explanation, formulasUntil(), sheetBefore(), explanationMarkdown(), hasCalculation(), insertAfterBlock(), insertAfterText() (+17 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.12
Nodes (10): device(), login(), newContext, waitFor(), b64(), CAPTCHA_TOKEN, CODE, GOOGLE_CODE (+2 more)

### Community 97 - "statsShown.ts"
Cohesion: 0.17
Nodes (31): check(), correlation(), count(), covariance(), Data, dataStatistic(), deviation(), fail() (+23 more)

### Community 98 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 100 - "icon"
Cohesion: 0.10
Nodes (29): SyncStatus, openShareDialog(), changeAccess(), changeCopy(), copy(), refreshChanged(), render(), run() (+21 more)

### Community 101 - "linsys.ts"
Cohesion: 0.11
Nodes (48): rref(), choices(), gcd(), linearSystem(), matrixEquation(), matrixSystem(), minorsGcd(), ONE (+40 more)

### Community 102 - "schedule.ts"
Cohesion: 0.18
Nodes (17): checkGiven(), criticalPaths(), key(), Link, LinkType, listText(), offset(), order() (+9 more)

### Community 103 - "siteUpdate.ts"
Cohesion: 0.19
Nodes (15): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, loadPart() (+7 more)

### Community 104 - "ui/preview.ts"
Cohesion: 0.08
Nodes (26): GraphLabels, GraphLook, renameGraphScope(), renameScopeKeys(), BlockKind, MoveDir, Look, Theme (+18 more)

### Community 105 - "MarkdownEditor"
Cohesion: 0.11
Nodes (7): EditorCallbacks, MarkdownEditor, insertTemplate(), EditorMathContext, expand(), preferredIndex(), SuggestionController

### Community 106 - "Stroke"
Cohesion: 0.14
Nodes (14): BOARD_PALETTES, BoardTheme, inkName(), mid(), outlineSvg(), PEN_SIZE, shapeSvg(), strokeOptions() (+6 more)

### Community 107 - "explainPanel.ts"
Cohesion: 0.10
Nodes (25): REPLY_TOKENS, LocalAbort, localErrorMessage(), localLlm, Pending, WorkerLike, ChatMessage, ChatOptions (+17 more)

### Community 108 - "xlsx.ts"
Cohesion: 0.09
Nodes (44): BinOp, COMPARE, ERRORS_BY_LENGTH, formulaBody(), formulaRefs(), isFormula(), normalizeFormula(), OPERATORS (+36 more)

### Community 113 - "graph.ts"
Cohesion: 0.06
Nodes (37): @maxgraph/core, AT_X, cellHtml(), cellText(), COMPASS, createGraph(), drawSchema(), isEdgeLook() (+29 more)

### Community 116 - "Il database degli account (Supabase)"
Cohesion: 0.15
Nodes (12): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il controllo anti-robot (CAPTCHA, ottobre 2026), Il database degli account (Supabase), Il progetto, Il trasloco su glifo.page (ottobre 2026) (+4 more)

### Community 117 - "Glifo – note per Claude"
Cohesion: 0.13
Nodes (14): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole (+6 more)

### Community 118 - "h"
Cohesion: 0.12
Nodes (11): viewSwitch, messageOf(), openLoginDialog(), codeStep(), emailStep(), h(), ExplainChat, ExplainPanel (+3 more)

### Community 119 - "conics.ts"
Cohesion: 0.18
Nodes (29): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+21 more)

### Community 121 - "files.ts"
Cohesion: 0.13
Nodes (21): inClaudeViewer(), backup(), canWriteFilesDirectly(), downloadBlob(), downloadText(), fileNameFor(), FsWindow, isAbort() (+13 more)

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "board.ts"
Cohesion: 0.06
Nodes (62): Action, ACTION_NAMES, DOT_SIZES, EraserMode, HANDLE_REACH, ICON, MODE_NAMES, Prefs (+54 more)

### Community 124 - "sheet.ts"
Cohesion: 0.06
Nodes (45): Definition, Line, ExactComplexScope, Ode, OdeFunction, expSumValue(), withWorkLimit(), FiniteContext (+37 more)

### Community 125 - "sql.ts"
Cohesion: 0.17
Nodes (17): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+9 more)

### Community 126 - "plan.ts"
Cohesion: 0.20
Nodes (15): cellText(), columnRole(), columnsOf(), durationUnit(), isNumber(), isPlanRange(), MAX_ACTIVITIES, plain() (+7 more)

### Community 127 - "grafo-html.mjs"
Cohesion: 0.17
Nodes (5): graphFile, names, namesFile, root, PNG_ICONS

### Community 128 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 129 - "labels.ts"
Cohesion: 0.16
Nodes (16): ACCENTS, BLACKBOARD, CALLIGRAPHIC, closing(), convert(), escapeXml(), FUNCTIONS, GREEK (+8 more)

### Community 131 - "schemaBlocks.ts"
Cohesion: 0.10
Nodes (23): @codemirror/view, InsertOptions, toggleLinePrefix(), LIST_STYLES, addPlaceholders, Placeholder, besideSchema(), BlockWidget (+15 more)

### Community 132 - "xlsx.test.ts"
Cohesion: 0.23
Nodes (13): RFC-4180, fflate, csvDelimiter(), csvToSheet(), field(), italian(), parseCsv(), sheetToCsv() (+5 more)

### Community 136 - "spiegami-qwen.mjs"
Cohesion: 0.29
Nodes (4): vite, minutes, postMessage(), started

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 139 - "deploy.test.ts"
Cohesion: 0.28
Nodes (4): vite-plugin-pwa, accountOffMessage(), defineFor(), MAIN_BRANCH

### Community 140 - "geometry.test.ts"
Cohesion: 0.29
Nodes (6): light, pts, result(), square, text(), triangle

### Community 144 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

### Community 145 - "src/relocation.ts"
Cohesion: 0.08
Nodes (43): relocationReceived(), restore(), transferToNewSite(), buildPackage(), importPackage(), isRelocationPackage(), OLD_ORIGIN, openedForRelocation() (+35 more)

## Knowledge Gaps
- **698 isolated node(s):** `Comandi`, `Regole`, `6. Glifo anche in inglese`, `La grafica: account, impostazioni, commenti, AI e lingua (chiesto il 10 ottobre 2026, se ne parla)`, `Account: i propri appunti su ogni dispositivo, anche da condividere` (+693 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 977 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **35 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `touchlog.ts`, `Parser`, `main.ts`, `schemaBlocks.ts`, `compile`, `spec.ts`, `spreadsheet/evaluate.ts`, `num`, `graph/preview.ts`, `xlsx.test.ts`, `spreadsheet/format.ts`, `deploy.test.ts`, `svg.ts`, `SchemaEditor`, `Board`, `SheetEditor`, `src/relocation.ts`, `numerical.ts`, `topics.ts`, `.renderFormat`, `store.ts`, `MathError`, `Rational`, `assistant.ts`, `parse.ts`, `view3d.ts`, `graph/file.ts`, `tutorial.ts`, `vitest`, `logic.ts`, `page.ts`, `complex.ts`, `namesIn`, `arithmetic.ts`, `several.ts`, `study.ts`, `functions.ts`, `finite.ts`, `NotesStore`, `inference.ts`, `board/shapes.ts`, `sidePanel.ts`, `supabase.ts`, `aiPanel.test.ts`, `Pt`, `dialogs.ts`, `odesolve.ts`, `toLatex`, `spreadsheet/editor.ts`, `markdown.ts`, `smoke-test.mjs`, `toolbar.ts`, `symbolic.ts`, `llmWorker.ts`, `schema/editor.ts`, `aiPanel.ts`, `icon`, `linsys.ts`, `schedule.ts`, `siteUpdate.ts`, `ui/preview.ts`, `MarkdownEditor`, `Stroke`, `explainPanel.ts`, `xlsx.ts`, `graph.ts`, `h`, `conics.ts`, `AiPanel`, `files.ts`, `board.ts`, `sheet.ts`, `plan.ts`?**
  _High betweenness centrality (0.157) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `touchlog.ts`, `main.ts`, `schemaBlocks.ts`, `sync.ts`, `xlsx.test.ts`, `num`, `Dove sono le cose`, `deploy.test.ts`, `svg.ts`, `editor/editor.ts`, `geometry.test.ts`, `editor/lists.ts`, `editor.test.ts`, `src/relocation.ts`, `store.ts`, `MathError`, `assistant.ts`, `parse.ts`, `view3d.ts`, `graph/file.ts`, `tutorial.ts`, `search.ts`, `page.ts`, `namesIn`, `resize.ts`, `NotesStore`, `board/shapes.ts`, `sidePanel.ts`, `supabase.ts`, `aiPanel.test.ts`, `parseSchema`, `dialogs.ts`, `dom.ts`, `toLatex`, `ui/relocation.ts`, `spreadsheet/editor.ts`, `markdown.ts`, `schema/editor.ts`, `probability.ts`, `linsys.ts`, `siteUpdate.ts`, `ui/preview.ts`, `Stroke`, `explainPanel.ts`, `appleTouch`, `board.ts`, `sheet.ts`, `sql.ts`, `plan.ts`?**
  _High betweenness centrality (0.111) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `main.ts`, `graph/preview.ts`, `SchemaEditor`, `Board`, `SheetEditor`, `src/relocation.ts`, `.renderFormat`, `graph/file.ts`, `tutorial.ts`, `vitest`, `page.ts`, `resize.ts`, `sidePanel.ts`, `dialogs.ts`, `dom.ts`, `ui/relocation.ts`, `spreadsheet/editor.ts`, `toolbar.ts`, `schema/editor.ts`, `aiPanel.ts`, `icon`, `ui/preview.ts`, `explainPanel.ts`, `AiPanel`, `files.ts`, `board.ts`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **Are the 271 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `adoptGuestNotes()`) actually correct?**
  _`Dove sono le cose` has 271 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Comandi`, `Regole`, `6. Glifo anche in inglese` to the rest of the system?**
  _698 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `touchlog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08653061224489796 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.03438363736871199 - nodes in this community are weakly interconnected._