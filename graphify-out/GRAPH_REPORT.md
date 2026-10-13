# Graph Report - Glifo  (2026-10-13)

## Corpus Check
- 346 files · ~720,599 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5553 nodes · 20301 edges · 159 communities (117 shown, 42 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 673 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `22a80482`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- ui/settings.ts
- vitest
- main.ts
- compile
- sync.ts
- spec.ts
- toast
- num
- graph/preview.ts
- Dove sono le cose
- distributions.ts
- MLCEngine
- svg.ts
- laplace.ts
- SchemaEditor
- editor/editor.ts
- SheetEditor
- src/relocation.ts
- MathError
- linsys.ts
- index.ts
- engine.ts
- schema/model.ts
- noteWordsMath.test.ts
- IdbBoards
- parse.ts
- board.ts
- texts
- NotesStore
- arithmetic.ts
- gantt.ts
- study.ts
- solve.ts
- assistant.ts
- logic.ts
- several.ts
- complex.ts
- namesIn
- translations.test.ts
- resize.ts
- view3d.ts
- .renderFormat
- toLatex
- plan.ts
- functions.ts
- linear.ts
- topics.ts
- Pt
- account/space.ts
- board/shapes.ts
- toolbar.ts
- renderTex
- aiPanel.ts
- conics.ts
- markdown.ts
- inference.ts
- 20261004091555_note_condivise.sql
- .constructor
- spreadsheet/format.ts
- finite.ts
- i18n.ts
- dependencies
- Welcome to Glifo
- spreadsheet/editor.ts
- feedback.ts
- odesolve.ts
- sheet.ts
- smoke-test.mjs
- blockMove.ts
- Benvenuto in Glifo
- compilerOptions
- relocation-test.mjs
- La grafica: le otto richieste del 10 ottobre 2026
- schema/templates.ts
- symbolic.ts
- .folderItem
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- captcha.ts
- FoldersStore
- session-start.sh
- .claude/CLAUDE.md
- Il database degli account (Supabase)
- tutorial.mjs
- Abbonamenti
- .int
- supabase-stub.sql
- account-test.mjs
- schemaBlocks.ts
- SuggestionController
- In programma
- sql.ts
- symbolsEn.test.ts
- site.ts
- I modelli e le chiavi API
- calcResults.ts
- SlotWidget
- spellcheck.ts
- graph.ts
- Rational
- BoardStore
- calcPlugin
- explainPanel.ts
- Le spiegazioni, come funzionano
- strokes.ts
- Sheet
- page.ts
- createFakeSupabase
- probability.ts
- Piano per piano
- Parser
- Board
- 20261008130026_commenti.sql
- sidePanel.ts
- xlsx.ts
- editor/lists.ts
- faqPage.ts
- schema/editor.ts
- Glifo
- vite
- Glifo – note per Claude
- files.ts
- Costi
- La lavagna
- devDependencies

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 308 edges
2. `MathError` - 151 edges
3. `Sheet` - 147 edges
4. `num()` - 145 edges
5. `h()` - 136 edges
6. `MathNode` - 131 edges
7. `mul()` - 124 edges
8. `texts` - 123 edges
9. `Board` - 117 edges
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

## Communities (159 total, 42 thin omitted)

### Community 0 - "ui/settings.ts"
Cohesion: 0.03
Nodes (80): 3. Le impostazioni divise in sezioni, 4. Più modelli per «Spiegami», chat(), GlifoError, Gpu, load(), post(), remove() (+72 more)

### Community 1 - "vitest"
Cohesion: 0.06
Nodes (51): vitest, addToGraphBlock(), formulaAtCursor(), GraphLabelLines, insertGraphBlock(), LABEL_KEYS, setGraphLabels(), graphImagesFor() (+43 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (94): account, ACCOUNT_OFF, accountProblem(), active, aiShown(), aiToggle, aiWork, app (+86 more)

### Community 3 - "compile"
Cohesion: 0.04
Nodes (103): integralRegion, criticalLine(), named(), severalItems(), surface(), T, argumentOrder(), compileLineIntegral() (+95 more)

### Community 4 - "sync.ts"
Cohesion: 0.05
Nodes (38): AccountSync, withLock(), Account, EMPTY_STATE, FolderChange, FolderRow, isEmpty(), iso() (+30 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (106): conicItems(), isConicLine(), quadricEquation(), T, FieldContext, fourierItems(), isFourierLine(), T (+98 more)

### Community 6 - "toast"
Cohesion: 0.07
Nodes (43): board, loadingEditor(), openSheet(), saveSheetBlock(), openShareDialog(), changeAccess(), changeCopy(), copy() (+35 more)

### Community 7 - "num"
Cohesion: 0.11
Nodes (104): atIntegers(), linearTrig(), withoutAbs(), exp(), hyperbolicToExp(), inverseRational(), laplaceEx(), laplaceTerms() (+96 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (51): FIGURE_PALETTE, addLabel(), boxes, cameras, complexCoord(), containing(), coord(), coordinates() (+43 more)

### Community 9 - "Dove sono le cose"
Cohesion: 0.04
Nodes (98): Dove sono le cose, Glifo – architettura, allNames(), answerFollowUp(), bareResult(), chatContext, ChatFn, chatSubject() (+90 more)

### Community 10 - "distributions.ts"
Cohesion: 0.15
Nodes (29): choose(), continuousQuantile(), decimals(), discreteQuantile(), factorialBig(), FAMILIES, integerParam(), invalid() (+21 more)

### Community 12 - "svg.ts"
Cohesion: 0.05
Nodes (91): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), staticGraphSvg(), chooseWindow(), chooseY(), clipLines() (+83 more)

### Community 13 - "laplace.ts"
Cohesion: 0.09
Nodes (53): EMPTY_SCOPE, absOf(), boundsOf(), close(), definite(), fourierProblem, fourierShown(), isTrig() (+45 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.10
Nodes (5): SchemaEditor, withLaneContents(), createEdgeCell(), EdgeLook, serializeSchema()

### Community 15 - "editor/editor.ts"
Cohesion: 0.07
Nodes (33): description, name, private, type, version, @codemirror/autocomplete, @codemirror/commands, @codemirror/language-data (+25 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (6): functionLabel(), SheetEditor, englishTyping(), serializeSheet(), sheetSize(), cloneSheet()

### Community 17 - "src/relocation.ts"
Cohesion: 0.07
Nodes (51): isWelcome(), ExplainTone, isLang(), buildPackage(), importPackage(), isRelocationPackage(), NEW_ORIGIN, OLD_ORIGIN (+43 more)

### Community 18 - "MathError"
Cohesion: 0.12
Nodes (51): MathError, FormatOptions, bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint() (+43 more)

### Community 19 - "linsys.ts"
Cohesion: 0.08
Nodes (63): eigenvalues(), EXACT, FLOAT, interpolateFloat(), polynomialIn(), choices(), gcd(), matrixEquation() (+55 more)

### Community 20 - "index.ts"
Cohesion: 0.06
Nodes (46): Text, b, bigops, c, calculus, fn, fr, fractions (+38 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "schema/model.ts"
Cohesion: 0.05
Nodes (60): schemaSummary(), svg(), openSchema(), saveSchemaBlock(), tools, findSchemaBlock(), findSchemaBlocks(), schemaBlockAtLine() (+52 more)

### Community 23 - "noteWordsMath.test.ts"
Cohesion: 0.07
Nodes (35): katex, placeChart(), tableChartKind(), blockKind, BLOCKS, blockWord(), FROM_ENGLISH, FUNCTIONS (+27 more)

### Community 24 - "IdbBoards"
Cohesion: 0.07
Nodes (14): fake-indexeddb, BoardBackend, done(), fromRecord(), IdbBoards, ofNote(), openBoardDatabase(), openDefault() (+6 more)

### Community 25 - "parse.ts"
Cohesion: 0.07
Nodes (42): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe(), differentialInFraction() (+34 more)

### Community 26 - "board.ts"
Cohesion: 0.07
Nodes (47): Action, DOT_SIZES, DrawAction, EraseAction, EraserMode, HANDLE_REACH, ICON, MODE_NAMES (+39 more)

### Community 27 - "texts"
Cohesion: 0.09
Nodes (21): T, GraphLabels, texts, BlockKind, hydrateSheets(), T, BLOCK_NAMES, blockHiddenMessage() (+13 more)

### Community 28 - "NotesStore"
Cohesion: 0.07
Nodes (32): Deletion, DeletionLog, Folder, FOLDER_NAME_MAX, FolderGroup, groupByFolder(), loadClosedFolders(), RemoteFolder (+24 more)

### Community 29 - "arithmetic.ts"
Cohesion: 0.10
Nodes (49): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+41 more)

### Community 30 - "gantt.ts"
Cohesion: 0.04
Nodes (95): searchPhrases(), amount(), barColor(), crossings(), dateText(), dayMonth(), dayOf(), fitText() (+87 more)

### Community 31 - "study.ts"
Cohesion: 0.14
Nodes (39): limit(), Asymptote, asymptoteText(), boundaries(), compiled(), cutsOf(), defined(), domainOf() (+31 more)

### Community 32 - "solve.ts"
Cohesion: 0.07
Nodes (62): exponentialForm(), fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), decimalSeparator() (+54 more)

### Community 33 - "assistant.ts"
Cohesion: 0.09
Nodes (29): @anthropic-ai/sdk, AiAnswer, AiError, AiSettings, answerSchema(), askAi(), askCompatible(), askThroughHost() (+21 more)

### Community 34 - "logic.ts"
Cohesion: 0.11
Nodes (30): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+22 more)

### Community 35 - "several.ts"
Cohesion: 0.13
Nodes (40): severalLimit, fractionNear(), at(), bounded(), Candidate, candidates(), compiled(), constraintsOf() (+32 more)

### Community 36 - "complex.ts"
Cohesion: 0.05
Nodes (73): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexValue(), isInequality() (+65 more)

### Community 37 - "namesIn"
Cohesion: 0.13
Nodes (37): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+29 more)

### Community 38 - "translations.test.ts"
Cohesion: 0.17
Nodes (18): AstNode, calleeName(), check(), checkPair(), visit(), children(), entryPairs(), files (+10 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (24): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+16 more)

### Community 40 - "view3d.ts"
Cohesion: 0.06
Nodes (83): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+75 more)

### Community 41 - ".renderFormat"
Cohesion: 0.15
Nodes (15): fieldInput(), isLanes(), cellText(), edgeLook(), edgeStyle(), edgeTextAt(), insertSchema(), nodeLook() (+7 more)

### Community 42 - "toLatex"
Cohesion: 0.06
Nodes (66): figureName(), graphFigure(), graphImage(), graphsFromFile(), OPEN, swatchSvg(), T, titleBand() (+58 more)

### Community 43 - "plan.ts"
Cohesion: 0.08
Nodes (44): at(), breakEven(), Point, T, tableItems(), textLabel(), chartData, chartFrom() (+36 more)

### Community 44 - "functions.ts"
Cohesion: 0.07
Nodes (67): CellResult, EMPTY, evaluateSheet(), number(), SheetEvaluator, T, addFormat(), divFormat() (+59 more)

### Community 45 - "linear.ts"
Cohesion: 0.06
Nodes (66): angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, dataOf(), degreesText() (+58 more)

### Community 46 - "topics.ts"
Cohesion: 0.07
Nodes (67): ATTRIBUTES, cut(), ER_SHAPES, fieldText(), fitLines(), flowOrder(), formulaText(), FREE_NAMES (+59 more)

### Community 47 - "Pt"
Cohesion: 0.11
Nodes (12): clampZoom(), coalesced(), Finger, LassoAction, MoveAction, pointsOf(), pressureOf(), validView() (+4 more)

### Community 48 - "account/space.ts"
Cohesion: 0.17
Nodes (25): 1. «Cambia account», accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), knowsAccount(), prefixOf() (+17 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.14
Nodes (34): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+26 more)

### Community 50 - "toolbar.ts"
Cohesion: 0.09
Nodes (22): closeMathBlockOnEnter(), EditorCallbacks, MarkdownEditor, tabOutOfMath(), insertBlock(), insertTemplate(), wrapSelection(), ListStyleId (+14 more)

### Community 51 - "renderTex"
Cohesion: 0.19
Nodes (6): cleanKatexError(), renderTex(), isConfidentAnswer(), symbolsInCategory(), preventFocusSteal(), SidePanel

### Community 52 - "aiPanel.ts"
Cohesion: 0.10
Nodes (26): definedName(), formulaTopic(), graphTopic(), numberText(), studyOf(), theoremTopic(), NoteSubject, checkHtml() (+18 more)

### Community 53 - "conics.ts"
Cohesion: 0.17
Nodes (30): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+22 more)

### Community 54 - "markdown.ts"
Cohesion: 0.11
Nodes (34): dataRange(), bulletGroup(), sameList(), moveAttrs(), renderTexOrError(), renderTexWithResult(), alignInside(), asciiTrim() (+26 more)

### Community 55 - "inference.ts"
Cohesion: 0.14
Nodes (27): between(), chiSquareTest(), confidence(), confidenceShown(), decimals(), Given, hypothesisTest(), InferenceContext (+19 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 58 - "spreadsheet/format.ts"
Cohesion: 0.19
Nodes (18): quantity(), decimalsOf(), ENGLISH, fixedNumber(), formatNumber(), generalNumber(), group(), MAX_DECIMALS (+10 more)

### Community 59 - "finite.ts"
Cohesion: 0.17
Nodes (28): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+20 more)

### Community 60 - "i18n.ts"
Cohesion: 0.05
Nodes (65): browserLang(), browserLanguages(), dateLocale(), detectLang(), Entry, lang, LANGUAGES, numberLocale() (+57 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "Welcome to Glifo"
Cohesion: 0.20
Nodes (9): A few examples, Calculations and graphs, For programming too, Handy shortcuts, How to write formulas, Lists, Spell check, Try it now (+1 more)

### Community 63 - "spreadsheet/editor.ts"
Cohesion: 0.07
Nodes (60): sheetSummary(), currentCall(), Editing, MenuEntry, Move, openSheetEditor(), PATHS, SheetEditorOptions (+52 more)

### Community 64 - "feedback.ts"
Cohesion: 0.07
Nodes (39): SyncStatus, rich(), Site, AccountButton, accountSection(), AccountSectionDeps, confirmAccountDeletion(), messageOf() (+31 more)

### Community 65 - "odesolve.ts"
Cohesion: 0.06
Nodes (79): primed(), Piece, addWave(), arrange(), cauchy(), characteristicRoots(), compiled(), Condition (+71 more)

### Community 66 - "sheet.ts"
Cohesion: 0.07
Nodes (61): OdeFunction, expSumValue(), ExactFunction, ExactScope, characteristicPolynomial(), Lin, LinearValue, NUMERICAL (+53 more)

### Community 67 - "smoke-test.mjs"
Cohesion: 0.15
Nodes (6): markdown-it, playwright-core, PNG_ICONS, fakeLlmWorker(), firstVisit(), plainContext

### Community 68 - "blockMove.ts"
Cohesion: 0.11
Nodes (34): blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove, blockPlace(), closed() (+26 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "relocation-test.mjs"
Cohesion: 0.18
Nodes (7): AFTER_MOVE, ids, newBrowser(), NOTICE_DAY, out, serve(), TYPES

### Community 72 - "La grafica: le otto richieste del 10 ottobre 2026"
Cohesion: 0.29
Nodes (7): 5. A cosa serve la chiave dell'AI, 6. Glifo anche in inglese, 7. Via il registro dei tocchi, 8. Il pulsante ✨ con il contorno, Gli abbonamenti, in tutto questo, In che ordine, La grafica: le otto richieste del 10 ottobre 2026

### Community 73 - "schema/templates.ts"
Cohesion: 0.23
Nodes (17): SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), conceptMap(), cycle(), edge(), er() (+9 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (59): linearIn(), linearParts(), valueAt(), primitive(), verified(), atValues(), cancelLinear(), Converter (+51 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Errore o imprevisto → nel dettaglio, 3. Serve una decisione → frasi complete, 4. Fine del compito → un solo riepilogo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "captcha.ts"
Cohesion: 0.21
Nodes (8): captchaToken(), loadTurnstile(), Turnstile, TURNSTILE_SCRIPT, Window, TURNSTILE_SITE_KEY, accountFailure(), Options

### Community 79 - "FoldersStore"
Cohesion: 0.16
Nodes (4): cleanFolderName(), FoldersStore, sameName(), names()

### Community 82 - "Il database degli account (Supabase)"
Cohesion: 0.15
Nodes (12): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il controllo anti-robot (CAPTCHA, ottobre 2026), Il database degli account (Supabase), Il progetto, Il trasloco su glifo.page (ottobre 2026) (+4 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.11
Nodes (11): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+3 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.14
Nodes (14): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+6 more)

### Community 91 - ".int"
Cohesion: 0.12
Nodes (15): addExp(), Distribution, exactIntervalProbability(), expSum, integerRange(), intervalProbability(), subtractExp(), pValue() (+7 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.10
Nodes (11): @electric-sql/pglite, device(), login(), newContext, waitFor(), b64(), CAPTCHA_TOKEN, CODE (+3 more)

### Community 97 - "schemaBlocks.ts"
Cohesion: 0.11
Nodes (19): toggleLinePrefix(), besideSchema(), BlockWidget, findWidgetBlocks(), guardBlocks(), KINDS, schemaBlockRanges(), schemaBlocks() (+11 more)

### Community 98 - "SuggestionController"
Cohesion: 0.16
Nodes (9): Promemoria per lo studente, 2. La pagina dei commenti, tipo FAQ, EditorMathContext, expand(), preferredIndex(), SuggestionController, Commenti di chi prova Glifo, page() (+1 more)

### Community 100 - "In programma"
Cohesion: 0.22
Nodes (9): Account: i propri appunti su ogni dispositivo, anche da condividere, Commenti di chi prova Glifo, Idee per il futuro, In programma, La grafica: account, impostazioni, commenti, AI e lingua (chiesto il 10 ottobre 2026, se ne parla), La lavagna: idee in più, Più avanti, Schemi: idee in più (+1 more)

### Community 101 - "sql.ts"
Cohesion: 0.16
Nodes (18): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+10 more)

### Community 102 - "symbolsEn.test.ts"
Cohesion: 0.10
Nodes (41): SuggestionItem, editDistance(), normalizeText(), singular(), stem(), STOPWORDS, words(), BOTH (+33 more)

### Community 103 - "site.ts"
Cohesion: 0.20
Nodes (7): @mlc-ai/web-llm, vite-plugin-pwa, accountOffMessage(), T, defineFor(), MAIN_BRANCH, webllmModels

### Community 104 - "I modelli e le chiavi API"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), In prova sul ramo `prova` (7 ottobre 2026): Qwen3 nel browser per «Spiegami», Le idee dello studente (5 ottobre 2026)

### Community 105 - "calcResults.ts"
Cohesion: 0.07
Nodes (44): @codemirror/language, @codemirror/state, @codemirror/view, @lezer/common, CalcCheck, calcOutcomes(), CalcResult, calcResults() (+36 more)

### Community 107 - "spellcheck.ts"
Cohesion: 0.08
Nodes (24): @codemirror/lang-markdown, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt() (+16 more)

### Community 113 - "graph.ts"
Cohesion: 0.05
Nodes (43): @maxgraph/core, AT_X, cellHtml(), COMPASS, createGraph(), drawSchema(), isEdgeLook(), isNodeLook() (+35 more)

### Community 118 - "Rational"
Cohesion: 0.11
Nodes (22): Part, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactRandom, exactRoot(), factorialExact() (+14 more)

### Community 119 - "BoardStore"
Cohesion: 0.08
Nodes (16): BoardStore, MemoryBoards, backup(), receiveRelocation(), restore(), BackupNote, backupNotes(), restoreBackup() (+8 more)

### Community 120 - "calcPlugin"
Cohesion: 0.16
Nodes (5): acceptCalcResult(), calcPlugin, CheckWidget, insertResult(), ResultWidget

### Community 121 - "explainPanel.ts"
Cohesion: 0.05
Nodes (44): Explanation, FollowUp, REPLY_TOKENS, glifoError(), LocalAbort, localErrorMessage(), localLlm, Pending (+36 more)

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "strokes.ts"
Cohesion: 0.09
Nodes (38): centerOn(), copyStrokes(), cross(), IDENTITY, insideLasso(), keepInside(), LASSO_SHARE, lassoed() (+30 more)

### Community 124 - "Sheet"
Cohesion: 0.07
Nodes (33): Definition, Line, Line, ExactComplexScope, Ode, withWorkLimit(), FiniteContext, FormattedResult (+25 more)

### Community 125 - "page.ts"
Cohesion: 0.05
Nodes (65): @supabase/supabase-js, AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), accountError, appUrl(), call() (+57 more)

### Community 128 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 129 - "probability.ts"
Cohesion: 0.12
Nodes (24): End, Family, CompileOptions, rejection(), ALL, complement(), endAt(), EventContext (+16 more)

### Community 132 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 136 - "Board"
Cohesion: 0.11
Nodes (3): Board, BoardTheme, newStrokeId()

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 139 - "sidePanel.ts"
Cohesion: 0.16
Nodes (18): AiResult, aiSettingsOf(), localizeTex(), cardPreviewTex(), formPreviewTex(), ParsedTemplate, parseTemplate(), PLACEHOLDER_TEX (+10 more)

### Community 141 - "xlsx.ts"
Cohesion: 0.09
Nodes (46): RFC-4180, fflate, tablesNote(), csvCell(), csvDelimiter(), csvNumbers(), csvToSheet(), digitsOf() (+38 more)

### Community 142 - "editor/lists.ts"
Cohesion: 0.10
Nodes (56): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+48 more)

### Community 143 - "faqPage.ts"
Cohesion: 0.08
Nodes (32): inClaudeViewer(), openFeedback(), commentDate(), commentItem(), COMMENTS_MAX, CommentsDeps, CommentsError, commentsOffInClaude() (+24 more)

### Community 144 - "schema/editor.ts"
Cohesion: 0.06
Nodes (40): laneOf(), alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ALIGN_NAMES (+32 more)

### Community 146 - "Glifo"
Cohesion: 0.12
Nodes (16): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Domande frequenti e commenti (+8 more)

### Community 154 - "vite"
Cohesion: 0.29
Nodes (4): vite, minutes, postMessage(), started

### Community 156 - "Glifo – note per Claude"
Cohesion: 0.25
Nodes (8): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Regole, sqlite()

### Community 157 - "files.ts"
Cohesion: 0.17
Nodes (18): svgSize(), svgToPng(), canWriteFilesDirectly(), downloadBlob(), downloadText(), fileNameFor(), FsWindow, isAbort() (+10 more)

### Community 161 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 163 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 170 - "devDependencies"
Cohesion: 0.10
Nodes (18): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+10 more)

## Knowledge Gaps
- **870 isolated node(s):** `session-start.sh script`, `name`, `private`, `version`, `description` (+865 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1193 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **42 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `texts` connect `texts` to `ui/settings.ts`, `vitest`, `main.ts`, `compile`, `probability.ts`, `spec.ts`, `toast`, `graph/preview.ts`, `Dove sono le cose`, `distributions.ts`, `sidePanel.ts`, `svg.ts`, `laplace.ts`, `editor/lists.ts`, `editor/editor.ts`, `schema/editor.ts`, `src/relocation.ts`, `MathError`, `linsys.ts`, `xlsx.ts`, `index.ts`, `schema/model.ts`, `faqPage.ts`, `parse.ts`, `board.ts`, `NotesStore`, `arithmetic.ts`, `gantt.ts`, `study.ts`, `solve.ts`, `assistant.ts`, `logic.ts`, `several.ts`, `complex.ts`, `namesIn`, `files.ts`, `resize.ts`, `toLatex`, `plan.ts`, `functions.ts`, `linear.ts`, `topics.ts`, `toolbar.ts`, `aiPanel.ts`, `conics.ts`, `inference.ts`, `finite.ts`, `i18n.ts`, `spreadsheet/editor.ts`, `feedback.ts`, `odesolve.ts`, `sheet.ts`, `schema/templates.ts`, `symbolic.ts`, `schemaBlocks.ts`, `sql.ts`, `site.ts`, `calcResults.ts`, `spellcheck.ts`, `BoardStore`, `explainPanel.ts`, `page.ts`?**
  _High betweenness centrality (0.120) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `Dove sono le cose` to `ui/settings.ts`, `vitest`, `main.ts`, `compile`, `spec.ts`, `toast`, `num`, `Board`, `graph/preview.ts`, `sidePanel.ts`, `svg.ts`, `xlsx.ts`, `laplace.ts`, `faqPage.ts`, `SchemaEditor`, `src/relocation.ts`, `MathError`, `linsys.ts`, `schema/editor.ts`, `SheetEditor`, `noteWordsMath.test.ts`, `parse.ts`, `board.ts`, `texts`, `NotesStore`, `arithmetic.ts`, `gantt.ts`, `study.ts`, `solve.ts`, `assistant.ts`, `logic.ts`, `several.ts`, `complex.ts`, `namesIn`, `files.ts`, `view3d.ts`, `.renderFormat`, `toLatex`, `plan.ts`, `functions.ts`, `linear.ts`, `topics.ts`, `Pt`, `account/space.ts`, `board/shapes.ts`, `toolbar.ts`, `renderTex`, `aiPanel.ts`, `conics.ts`, `inference.ts`, `finite.ts`, `i18n.ts`, `spreadsheet/editor.ts`, `feedback.ts`, `odesolve.ts`, `sheet.ts`, `smoke-test.mjs`, `blockMove.ts`, `symbolic.ts`, `tutorial.mjs`, `.int`, `schemaBlocks.ts`, `site.ts`, `calcResults.ts`, `graph.ts`, `Rational`, `BoardStore`, `explainPanel.ts`, `strokes.ts`, `Sheet`, `page.ts`?**
  _High betweenness centrality (0.120) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `ui/settings.ts`, `compile`, `sync.ts`, `toast`, `num`, `graph/preview.ts`, `Dove sono le cose`, `distributions.ts`, `sidePanel.ts`, `svg.ts`, `xlsx.ts`, `editor/lists.ts`, `editor/editor.ts`, `faqPage.ts`, `src/relocation.ts`, `schema/editor.ts`, `linsys.ts`, `schema/model.ts`, `noteWordsMath.test.ts`, `IdbBoards`, `parse.ts`, `board.ts`, `NotesStore`, `gantt.ts`, `assistant.ts`, `translations.test.ts`, `resize.ts`, `view3d.ts`, `toLatex`, `plan.ts`, `linear.ts`, `topics.ts`, `account/space.ts`, `board/shapes.ts`, `i18n.ts`, `spreadsheet/editor.ts`, `feedback.ts`, `blockMove.ts`, `captcha.ts`, `schemaBlocks.ts`, `sql.ts`, `symbolsEn.test.ts`, `site.ts`, `calcResults.ts`, `spellcheck.ts`, `BoardStore`, `explainPanel.ts`, `strokes.ts`, `Sheet`, `page.ts`?**
  _High betweenness centrality (0.087) - this node is a cross-community bridge._
- **Are the 307 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `tutorialModel()`) actually correct?**
  _`Dove sono le cose` has 307 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `name`, `private` to the rest of the system?**
  _870 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `ui/settings.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.03236914600550964 - nodes in this community are weakly interconnected._
- **Should `vitest` be split into smaller, more focused modules?**
  _Cohesion score 0.0625 - nodes in this community are weakly interconnected._