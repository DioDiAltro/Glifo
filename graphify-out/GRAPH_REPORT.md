# Graph Report - Glifo  (2026-10-14)

## Corpus Check
- 346 files · ~723,343 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5558 nodes · 20332 edges · 168 communities (124 shown, 44 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 689 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `66dd57f3`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- vitest
- markdown.ts
- main.ts
- compile
- sync.ts
- spec.ts
- openShareDialog
- mul
- graph/preview.ts
- explain.ts
- distributions.ts
- MLCEngine
- svg.ts
- fourier.ts
- SchemaEditor
- parseGraph
- SheetEditor
- src/relocation.ts
- numerical.ts
- linsys.ts
- index.ts
- client.ts
- schemaEn.test.ts
- graph/file.ts
- store.ts
- parse.ts
- ink.ts
- planPreview.ts
- NotesStore
- arithmetic.ts
- gantt.ts
- study.ts
- formatNumber
- assistant.ts
- logic.ts
- several.ts
- complex.ts
- fields.ts
- translations.test.ts
- resize.ts
- view3d.ts
- .render
- toLatex
- spreadsheet/format.ts
- functions.ts
- MathError
- spreadsheetEn.test.ts
- Pt
- plan.ts
- board/shapes.ts
- toolbar.ts
- sidePanel.ts
- AiPanel
- conics.ts
- page.ts
- mathEn2.test.ts
- 20261004091555_note_condivise.sql
- BoardOptions
- SheetEvaluator
- finite.ts
- i18n.ts
- dependencies
- Welcome to Glifo
- spreadsheet/editor.ts
- feedback.ts
- num
- statsShown.ts
- smoke-test.mjs
- blockMove.ts
- Benvenuto in Glifo
- compilerOptions
- relocation-test.mjs
- La grafica: le otto richieste del 10 ottobre 2026
- schema/templates.ts
- symbolic.ts
- probability.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- captcha.ts
- FoldersStore
- session-start.sh
- .claude/CLAUDE.md
- Il database degli account (Supabase)
- tutorial.mjs
- Abbonamenti
- topics.ts
- supabase-stub.sql
- account-test.mjs
- link.ts
- symbolsEn.test.ts
- In programma
- .int
- search.ts
- engine.ts
- sql.ts
- noteWordsMath.test.ts
- pow
- spellcheck
- I modelli e le chiavi API
- graph.ts
- SlotWidget
- labels.ts
- Rational
- BoardStore
- Dove sono le cose
- explainPanel.ts
- Le spiegazioni, come funzionano
- board.ts
- sheet.ts
- supabase.ts
- createFakeSupabase
- siteUpdate.ts
- Piano per piano
- Parser
- Board
- 20261008130026_commenti.sql
- database.ts
- Schema
- xlsx.ts
- editor/lists.ts
- comments.ts
- schema/editor.ts
- Glifo
- vite
- Glifo – note per Claude
- files.ts
- AccountSync
- SpellClient
- LlamaWorker
- Costi
- numerical.test.ts
- La lavagna
- study.test.ts
- scripts

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 320 edges
2. `MathError` - 151 edges
3. `Sheet` - 147 edges
4. `num()` - 145 edges
5. `h()` - 136 edges
6. `MathNode` - 131 edges
7. `texts` - 125 edges
8. `mul()` - 124 edges
9. `Board` - 117 edges
10. `compile()` - 116 edges

## Surprising Connections (you probably didn't know these)
- `Dove sono le cose` --references--> `fakeLlmWorker()`  [INFERRED]
  ARCHITETTURA.md → scripts/smoke-test.mjs
- `Dove sono le cose` --references--> `tutorialModel()`  [INFERRED]
  ARCHITETTURA.md → scripts/tutorial.mjs
- `Dove sono le cose` --references--> `WidgetKind`  [INFERRED]
  ARCHITETTURA.md → src/editor/schemaBlocks.ts
- `Attenzione a` --references--> `renderMarkdown()`  [INFERRED]
  CLAUDE.md → src/render/markdown.ts
- `4. Più modelli per «Spiegami»` --references--> `webllmId()`  [INFERRED]
  GRAFICA.md → src/ai/localModels.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (168 total, 44 thin omitted)

### Community 0 - "vitest"
Cohesion: 0.06
Nodes (24): @mlc-ai/web-llm, vite-plugin-pwa, vitest, ExplainTone, DEFAULT_LOCAL_MODEL, accountOffMessage(), T, ACCOUNT_SETTINGS (+16 more)

### Community 1 - "markdown.ts"
Cohesion: 0.06
Nodes (62): valueNode(), setGraphLabels(), monthOf(), MONTHS, MONTHS_EN, parseDate(), planBlock, PlanKind (+54 more)

### Community 2 - "main.ts"
Cohesion: 0.03
Nodes (124): newStrokeId(), addToGraphBlock(), remapGraphLines(), account, ACCOUNT_OFF, active, aiShown(), aiToggle (+116 more)

### Community 3 - "compile"
Cohesion: 0.04
Nodes (114): constantIntegrand(), inequalityMargin(), integralRegion, planeMargin(), planeParts(), radiusOf(), spaceLayers(), spaceMargin() (+106 more)

### Community 4 - "sync.ts"
Cohesion: 0.07
Nodes (29): withLock(), Account, EMPTY_STATE, FolderChange, FolderRow, isEmpty(), iso(), LocalChange (+21 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (101): quadricEquation(), isComplexLine(), onlyComplex(), isTestLine(), number(), T, testItems(), isNumericalLine() (+93 more)

### Community 6 - "openShareDialog"
Cohesion: 0.18
Nodes (15): openShareDialog(), changeAccess(), changeCopy(), copy(), refreshChanged(), render(), run(), setStatus() (+7 more)

### Community 7 - "mul"
Cohesion: 0.16
Nodes (65): atIntegers(), polyEx(), shapeValue(), similarSolution(), algebraic(), bigGcd(), byParts(), candidates() (+57 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (45): FIGURE_PALETTE, addLabel(), boxes, cameras, complexCoord(), containing(), coord(), coordinates() (+37 more)

### Community 9 - "explain.ts"
Cohesion: 0.05
Nodes (77): allNames(), answerFollowUp(), bareResult(), chained(), ChatFn, chatSubject(), chatSystemPrompt(), checkFormulas() (+69 more)

### Community 10 - "distributions.ts"
Cohesion: 0.10
Nodes (38): addExp(), choose(), continuousQuantile(), decimals(), discreteQuantile(), Distribution, exactIntervalProbability(), factorialBig() (+30 more)

### Community 12 - "svg.ts"
Cohesion: 0.08
Nodes (59): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseWindow(), chooseY(), clipLines(), dataWindow() (+51 more)

### Community 13 - "fourier.ts"
Cohesion: 0.12
Nodes (28): absOf(), boundsOf(), close(), definite(), fourierProblem, fourierShown(), isTrig(), isZero() (+20 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.09
Nodes (9): fieldInput(), isLanes(), SchemaEditor, withLaneContents(), nodeLook(), nodeStyle(), EdgeLook, laneNames() (+1 more)

### Community 15 - "parseGraph"
Cohesion: 0.08
Nodes (25): specFor(), GraphItem, parseGraph(), item(), light, result(), light, pts (+17 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (6): functionLabel(), SheetEditor, englishTyping(), serializeSheet(), sheetSize(), cloneSheet()

### Community 17 - "src/relocation.ts"
Cohesion: 0.08
Nodes (59): 1. «Cambia account», accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount() (+51 more)

### Community 18 - "numerical.ts"
Cohesion: 0.11
Nodes (49): bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial(), interpolating() (+41 more)

### Community 19 - "linsys.ts"
Cohesion: 0.06
Nodes (96): FormatOptions, formatRational(), fromRational(), nameLatex(), EXACT, FLOAT, LinearScope, rref() (+88 more)

### Community 20 - "index.ts"
Cohesion: 0.06
Nodes (44): b, bigops, c, calculus, fn, fr, fractions, functions (+36 more)

### Community 21 - "client.ts"
Cohesion: 0.13
Nodes (12): Backend, pageBackend(), SpellClientOptions, workerBackend(), WorkerUnavailable, download(), fetchDictionary(), FILES (+4 more)

### Community 22 - "schemaEn.test.ts"
Cohesion: 0.08
Nodes (33): schemaSummary(), svg(), openSchemaEditor(), hide(), OPEN, schemasForFile(), schemasFromFile(), T (+25 more)

### Community 23 - "graph/file.ts"
Cohesion: 0.09
Nodes (39): figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsForFile(), graphsFromFile(), hide(), OPEN (+31 more)

### Community 24 - "store.ts"
Cohesion: 0.09
Nodes (16): fake-indexeddb, BoardBackend, BoardData, done(), fromRecord(), IdbBoards, ofNote(), openBoardDatabase() (+8 more)

### Community 25 - "parse.ts"
Cohesion: 0.07
Nodes (40): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe(), differentialInFraction() (+32 more)

### Community 26 - "ink.ts"
Cohesion: 0.15
Nodes (17): Prefs, BOARD_PALETTES, BoardPalette, BoardTheme, highlightName(), inkName(), mid(), outlineSvg() (+9 more)

### Community 27 - "planPreview.ts"
Cohesion: 0.12
Nodes (17): labelHtml(), readPlan(), ganttWidth(), PlanView, T, GraphLabels, GraphLook, Palette (+9 more)

### Community 28 - "NotesStore"
Cohesion: 0.08
Nodes (22): Deletion, DeletionLog, isUuid(), newId(), createdAtFromId(), deriveTitle(), Note, NotesStore (+14 more)

### Community 29 - "arithmetic.ts"
Cohesion: 0.07
Nodes (68): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+60 more)

### Community 30 - "gantt.ts"
Cohesion: 0.06
Nodes (72): amount(), barColor(), crossings(), dateText(), dayMonth(), dayOf(), fitText(), GanttOptions (+64 more)

### Community 31 - "study.ts"
Cohesion: 0.13
Nodes (38): breaks(), periodOf(), Asymptote, asymptoteText(), boundaries(), compiled(), cutsOf(), defined() (+30 more)

### Community 32 - "formatNumber"
Cohesion: 0.12
Nodes (28): decimalSeparator(), Digits, formatNumber(), fromNumber(), SUPERSCRIPT, writeDigits(), alternating(), close() (+20 more)

### Community 33 - "assistant.ts"
Cohesion: 0.13
Nodes (26): AiAnswer, AiError, AiSettings, answerSchema(), askAi(), askCompatible(), askThroughHost(), capitalized() (+18 more)

### Community 34 - "logic.ts"
Cohesion: 0.11
Nodes (30): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+22 more)

### Community 35 - "several.ts"
Cohesion: 0.10
Nodes (46): criticalLine(), isSeveralLine(), named(), severalItems(), surface(), T, severalLimit, at() (+38 more)

### Community 36 - "complex.ts"
Cohesion: 0.06
Nodes (67): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexValue(), isInequality() (+59 more)

### Community 37 - "fields.ts"
Cohesion: 0.12
Nodes (35): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+27 more)

### Community 38 - "translations.test.ts"
Cohesion: 0.17
Nodes (18): AstNode, calleeName(), check(), checkPair(), visit(), children(), entryPairs(), files (+10 more)

### Community 39 - "resize.ts"
Cohesion: 0.13
Nodes (21): EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, SizeLimits, SYMBOLS_WIDTH (+13 more)

### Community 40 - "view3d.ts"
Cohesion: 0.06
Nodes (93): staticGraphSvg(), LayeredSolid, addMesh(), addTet(), affinePlane(), Axis, Box, centroid() (+85 more)

### Community 41 - ".render"
Cohesion: 0.15
Nodes (3): penErases(), handleScale(), shapePoints()

### Community 42 - "toLatex"
Cohesion: 0.06
Nodes (52): fourierItems(), isFourierLine(), T, EMPTY_SCOPE, errorMessage(), partialSum(), ACCENT_COMMANDS, diffLatex() (+44 more)

### Community 43 - "spreadsheet/format.ts"
Cohesion: 0.07
Nodes (50): at(), breakEven(), Point, quantity(), T, tableItems(), textLabel(), chartData (+42 more)

### Community 44 - "functions.ts"
Cohesion: 0.10
Nodes (51): addFormat(), FormulaNode, ARGS, boolArg(), BY_NAME, compareValues(), conditional(), criterion() (+43 more)

### Community 45 - "MathError"
Cohesion: 0.12
Nodes (58): MathError, angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, dataOf() (+50 more)

### Community 46 - "spreadsheetEn.test.ts"
Cohesion: 0.12
Nodes (33): englishNumber(), italianNumber(), readEnglishInput(), readInput(), swapSeparators(), BinOp, COMPARE, englishFormula() (+25 more)

### Community 47 - "Pt"
Cohesion: 0.11
Nodes (15): clampZoom(), coalesced(), EraseAction, Finger, LassoAction, MoveAction, PanAction, PinchAction (+7 more)

### Community 48 - "plan.ts"
Cohesion: 0.13
Nodes (19): ITALIAN, NumberStyle, cellText(), columnRole(), columnsOf(), durationUnit(), isNumber(), isPlanRange() (+11 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (35): DrawAction, adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners() (+27 more)

### Community 50 - "toolbar.ts"
Cohesion: 0.09
Nodes (19): closeMathBlockOnEnter(), EditorCallbacks, searchPhrases(), insertBlock(), insertTemplate(), wrapSelection(), Action, createToolbar() (+11 more)

### Community 51 - "sidePanel.ts"
Cohesion: 0.07
Nodes (33): AiResult, formulaAtCursor(), templateInsertion(), EditorMathContext, expand(), SuggestionController, SuggestionItem, localizeTex() (+25 more)

### Community 52 - "AiPanel"
Cohesion: 0.36
Nodes (3): NoteSubject, AiPanel, kindName()

### Community 53 - "conics.ts"
Cohesion: 0.16
Nodes (32): conicItems(), isConicLine(), T, at(), centralCanonical(), Coefficients, coneCanonical(), ConicInfo (+24 more)

### Community 54 - "page.ts"
Cohesion: 0.10
Nodes (20): katex, body, saveButton, saveCopy(), settings, status, systemDark, T (+12 more)

### Community 55 - "mathEn2.test.ts"
Cohesion: 0.12
Nodes (32): between(), chiSquareTest(), confidence(), confidenceShown(), decimals(), Given, hypothesisTest(), InferenceContext (+24 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "BoardOptions"
Cohesion: 0.29
Nodes (3): BoardOptions, appleTouch(), UA

### Community 58 - "SheetEvaluator"
Cohesion: 0.09
Nodes (34): valueText(), sheetSummary(), openSheetEditor(), number(), SheetEvaluator, hide(), OPEN, sheetsForFile() (+26 more)

### Community 59 - "finite.ts"
Cohesion: 0.17
Nodes (28): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+20 more)

### Community 60 - "i18n.ts"
Cohesion: 0.03
Nodes (127): 3. Le impostazioni divise in sezioni, SyncStatus, downloadSize(), gpuF16(), modelVariant, browserLang(), browserLanguages(), dateLocale() (+119 more)

### Community 61 - "dependencies"
Cohesion: 0.05
Nodes (36): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+28 more)

### Community 62 - "Welcome to Glifo"
Cohesion: 0.20
Nodes (9): A few examples, Calculations and graphs, For programming too, Handy shortcuts, How to write formulas, Lists, Spell check, Try it now (+1 more)

### Community 63 - "spreadsheet/editor.ts"
Cohesion: 0.10
Nodes (45): currentCall(), Editing, MenuEntry, Move, PATHS, SheetEditorOptions, Snapshot, T (+37 more)

### Community 64 - "feedback.ts"
Cohesion: 0.15
Nodes (20): SUPABASE_KEY, SUPABASE_URL, Site, CommentsDeps, AUTHOR_MAX, browserInfo(), draft, FeedbackDeps (+12 more)

### Community 65 - "num"
Cohesion: 0.08
Nodes (83): primed(), linearIn(), addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled() (+75 more)

### Community 66 - "statsShown.ts"
Cohesion: 0.16
Nodes (32): Lin, check(), correlation(), count(), covariance(), Data, DATA_FUNCTIONS, dataStatistic() (+24 more)

### Community 67 - "smoke-test.mjs"
Cohesion: 0.15
Nodes (6): markdown-it, playwright-core, PNG_ICONS, fakeLlmWorker(), firstVisit(), plainContext

### Community 68 - "blockMove.ts"
Cohesion: 0.05
Nodes (47): blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockKind, BlockMove, blockPlace() (+39 more)

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
Cohesion: 0.14
Nodes (14): Promemoria per lo studente, 2. La pagina dei commenti, tipo FAQ, 4. Più modelli per «Spiegami», 5. A cosa serve la chiave dell'AI, 6. Glifo anche in inglese, 7. Via il registro dei tocchi, 8. Il pulsante ✨ con il contorno, Gli abbonamenti, in tutto questo (+6 more)

### Community 73 - "schema/templates.ts"
Cohesion: 0.21
Nodes (18): DEFAULT_EDGE, SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), conceptMap(), cycle(), edge() (+10 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.06
Nodes (72): valueAt(), primitive(), verified(), assumePositive(), atValues(), cancelLinear(), commonMonomial(), commonPositive() (+64 more)

### Community 75 - "probability.ts"
Cohesion: 0.11
Nodes (27): End, Family, RelOp, ALL, compileOf(), complement(), endAt(), EventContext (+19 more)

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
Cohesion: 0.09
Nodes (15): cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder(), loadClosedFolders(), RemoteFolder (+7 more)

### Community 82 - "Il database degli account (Supabase)"
Cohesion: 0.14
Nodes (13): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il controllo anti-robot (CAPTCHA, ottobre 2026), Il database degli account (Supabase), Il progetto, Il trasloco su glifo.page (ottobre 2026) (+5 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.11
Nodes (11): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+3 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.14
Nodes (14): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+6 more)

### Community 91 - "topics.ts"
Cohesion: 0.17
Nodes (21): ATTRIBUTES, cut(), ER_SHAPES, fieldText(), fitLines(), flowOrder(), formulaText(), FREE_NAMES (+13 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.10
Nodes (11): @electric-sql/pglite, device(), login(), newContext, waitFor(), b64(), CAPTCHA_TOKEN, CODE (+3 more)

### Community 97 - "link.ts"
Cohesion: 0.16
Nodes (15): accountDataFile(), PullResult, isShareToken(), parseSharedNote(), readSharedNote(), SHARE_PAGE, SharedNote, ShareReadError (+7 more)

### Community 98 - "symbolsEn.test.ts"
Cohesion: 0.20
Nodes (16): preferredIndex(), normalizeText(), STOPWORDS, words(), getIndex(), isSubsequence(), keysOf(), MatchKind (+8 more)

### Community 100 - "In programma"
Cohesion: 0.25
Nodes (8): Account: i propri appunti su ogni dispositivo, anche da condividere, Idee per il futuro, In programma, La grafica: account, impostazioni, commenti, AI e lingua (chiesto il 10 ottobre 2026, se ne parla), La lavagna: idee in più, Più avanti, Schemi: idee in più, Trasloco: il sito su Cloudflare, con un dominio tutto di Glifo

### Community 101 - ".int"
Cohesion: 0.11
Nodes (8): characteristicPolynomial(), eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn(), R()

### Community 102 - "search.ts"
Cohesion: 0.17
Nodes (20): singular(), stem(), BOTH, buildIndex(), containsPhrase(), getIndex(), IndexedEntry, Langs (+12 more)

### Community 103 - "engine.ts"
Cohesion: 0.15
Nodes (11): @farscrl/hunspell-wasm, editDistance(), capitalize(), COMMON_FIXES, DictionaryData, ELISIONS, inGlossary(), lower() (+3 more)

### Community 104 - "sql.ts"
Cohesion: 0.16
Nodes (19): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+11 more)

### Community 105 - "noteWordsMath.test.ts"
Cohesion: 0.02
Nodes (129): description, name, private, type, version, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands (+121 more)

### Community 106 - "pow"
Cohesion: 0.22
Nodes (20): factoredPolynomial(), oneFraction(), E, exp(), fractionShown(), HALF, hyperbolicToExp(), inverseRational() (+12 more)

### Community 107 - "spellcheck"
Cohesion: 0.21
Nodes (8): spellcheck(), close(), misspelledAt(), openAt(), replace(), tooltipView(), SpellChecker, SpellcheckOptions

### Community 108 - "I modelli e le chiavi API"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), In prova sul ramo `prova` (7 ottobre 2026): Qwen3 nel browser per «Spiegami», Le idee dello studente (5 ottobre 2026)

### Community 113 - "graph.ts"
Cohesion: 0.05
Nodes (40): @maxgraph/core, AT_X, cellHtml(), cellText(), COMPASS, createEdgeCell(), createGraph(), drawSchema() (+32 more)

### Community 117 - "labels.ts"
Cohesion: 0.16
Nodes (19): ACCENTS, BLACKBOARD, CALLIGRAPHIC, closing(), convert(), escapeXml(), FUNCTIONS, GREEK (+11 more)

### Community 118 - "Rational"
Cohesion: 0.09
Nodes (25): Part, expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactRandom, exactRoot() (+17 more)

### Community 119 - "BoardStore"
Cohesion: 0.08
Nodes (15): BoardStore, MemoryBoards, applyAccountChange(), backup(), BackupNote, backupNotes(), restoreBackup(), RestoreBoards (+7 more)

### Community 120 - "Dove sono le cose"
Cohesion: 0.06
Nodes (50): Dove sono le cose, Glifo – architettura, @codemirror/language, @lezer/common, explainTarget, schemaTitle(), acceptCalcResult(), calcOutcomes() (+42 more)

### Community 121 - "explainPanel.ts"
Cohesion: 0.03
Nodes (95): chatContext, explain(), explainTopic, Explanation, questionPrompt(), REPLY_TOKENS, sheetFactory(), chat() (+87 more)

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "board.ts"
Cohesion: 0.07
Nodes (53): Action, DOT_SIZES, EraserMode, HANDLE_REACH, ICON, MODE_NAMES, SIZE_NAMES, SizedTool (+45 more)

### Community 124 - "sheet.ts"
Cohesion: 0.05
Nodes (64): CalcCheck, numericPartials(), complex, ExactComplexScope, formatComplex(), formatGauss(), formatList(), join() (+56 more)

### Community 125 - "supabase.ts"
Cohesion: 0.09
Nodes (40): @supabase/supabase-js, AUTH_STORAGE_KEY, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken() (+32 more)

### Community 128 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 129 - "siteUpdate.ts"
Cohesion: 0.18
Nodes (14): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, PartNotLoaded (+6 more)

### Community 132 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 136 - "Board"
Cohesion: 0.11
Nodes (6): Board, loadPrefs(), sizeChoice(), SizeChoice, BoardChange, Stroke

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 139 - "database.ts"
Cohesion: 0.23
Nodes (6): createDatabase(), createUser(), databaseTests(), feedbackTests(), migrations, shareTests()

### Community 140 - "Schema"
Cohesion: 0.25
Nodes (5): loadDialect(), SchemaEditorOptions, Schema, serializeSchema(), Template

### Community 141 - "xlsx.ts"
Cohesion: 0.09
Nodes (45): RFC-4180, fflate, tablesNote(), csvCell(), csvDelimiter(), csvNumbers(), csvToSheet(), digitsOf() (+37 more)

### Community 142 - "editor/lists.ts"
Cohesion: 0.08
Nodes (65): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+57 more)

### Community 143 - "comments.ts"
Cohesion: 0.18
Nodes (18): commentDate(), commentItem(), COMMENTS_MAX, CommentsError, commentsOffInClaude(), commentsView(), refresh(), render() (+10 more)

### Community 144 - "schema/editor.ts"
Cohesion: 0.05
Nodes (66): laneOf(), alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ALIGN_NAMES (+58 more)

### Community 146 - "Glifo"
Cohesion: 0.12
Nodes (16): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Domande frequenti e commenti (+8 more)

### Community 154 - "vite"
Cohesion: 0.33
Nodes (4): vite, minutes, postMessage(), started

### Community 156 - "Glifo – note per Claude"
Cohesion: 0.25
Nodes (8): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Regole, sqlite()

### Community 157 - "files.ts"
Cohesion: 0.14
Nodes (21): cache, capability(), ClaudeRuntime, hostDownloads, HostError, inClaudeViewer(), ModelTier, runtime() (+13 more)

### Community 161 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 162 - "numerical.test.ts"
Cohesion: 0.60
Nodes (3): result(), text(), verdict()

### Community 163 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 170 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

## Knowledge Gaps
- **870 isolated node(s):** `Comandi`, `Regole`, `6. Glifo anche in inglese`, `8. Il pulsante ✨ con il contorno`, `Gli abbonamenti, in tutto questo` (+865 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1190 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **44 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `texts` connect `i18n.ts` to `vitest`, `markdown.ts`, `main.ts`, `compile`, `siteUpdate.ts`, `spec.ts`, `graph/preview.ts`, `explain.ts`, `distributions.ts`, `svg.ts`, `fourier.ts`, `editor/lists.ts`, `xlsx.ts`, `schema/editor.ts`, `src/relocation.ts`, `numerical.ts`, `linsys.ts`, `NotesStore`, `index.ts`, `schemaEn.test.ts`, `graph/file.ts`, `comments.ts`, `parse.ts`, `ink.ts`, `planPreview.ts`, `Glifo – note per Claude`, `arithmetic.ts`, `gantt.ts`, `study.ts`, `formatNumber`, `assistant.ts`, `logic.ts`, `several.ts`, `complex.ts`, `fields.ts`, `files.ts`, `resize.ts`, `toLatex`, `spreadsheet/format.ts`, `functions.ts`, `MathError`, `spreadsheetEn.test.ts`, `plan.ts`, `toolbar.ts`, `sidePanel.ts`, `conics.ts`, `page.ts`, `mathEn2.test.ts`, `SheetEvaluator`, `finite.ts`, `spreadsheet/editor.ts`, `feedback.ts`, `num`, `statsShown.ts`, `blockMove.ts`, `schema/templates.ts`, `symbolic.ts`, `probability.ts`, `FoldersStore`, `topics.ts`, `link.ts`, `sql.ts`, `noteWordsMath.test.ts`, `BoardStore`, `Dove sono le cose`, `explainPanel.ts`, `board.ts`, `sheet.ts`, `supabase.ts`?**
  _High betweenness centrality (0.158) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `Dove sono le cose` to `vitest`, `markdown.ts`, `main.ts`, `compile`, `siteUpdate.ts`, `spec.ts`, `mul`, `Board`, `explain.ts`, `graph/preview.ts`, `svg.ts`, `xlsx.ts`, `fourier.ts`, `parseGraph`, `SchemaEditor`, `src/relocation.ts`, `numerical.ts`, `linsys.ts`, `schema/editor.ts`, `SheetEditor`, `comments.ts`, `graph/file.ts`, `parse.ts`, `ink.ts`, `planPreview.ts`, `NotesStore`, `files.ts`, `gantt.ts`, `arithmetic.ts`, `formatNumber`, `assistant.ts`, `logic.ts`, `several.ts`, `complex.ts`, `fields.ts`, `study.ts`, `view3d.ts`, `.render`, `toLatex`, `spreadsheet/format.ts`, `functions.ts`, `MathError`, `spreadsheetEn.test.ts`, `Pt`, `plan.ts`, `board/shapes.ts`, `toolbar.ts`, `sidePanel.ts`, `AiPanel`, `page.ts`, `mathEn2.test.ts`, `SheetEvaluator`, `finite.ts`, `i18n.ts`, `spreadsheet/editor.ts`, `num`, `smoke-test.mjs`, `blockMove.ts`, `symbolic.ts`, `tutorial.mjs`, `topics.ts`, `noteWordsMath.test.ts`, `graph.ts`, `BoardStore`, `explainPanel.ts`, `board.ts`, `sheet.ts`, `supabase.ts`?**
  _High betweenness centrality (0.088) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `markdown.ts`, `siteUpdate.ts`, `mul`, `graph/preview.ts`, `explain.ts`, `distributions.ts`, `database.ts`, `svg.ts`, `xlsx.ts`, `editor/lists.ts`, `comments.ts`, `parseGraph`, `src/relocation.ts`, `schema/editor.ts`, `linsys.ts`, `schemaEn.test.ts`, `graph/file.ts`, `store.ts`, `ink.ts`, `NotesStore`, `gantt.ts`, `assistant.ts`, `numerical.test.ts`, `several.ts`, `study.test.ts`, `resize.ts`, `view3d.ts`, `translations.test.ts`, `toLatex`, `spreadsheet/format.ts`, `spreadsheetEn.test.ts`, `plan.ts`, `board/shapes.ts`, `sidePanel.ts`, `page.ts`, `mathEn2.test.ts`, `BoardOptions`, `SheetEvaluator`, `i18n.ts`, `spreadsheet/editor.ts`, `feedback.ts`, `blockMove.ts`, `captcha.ts`, `FoldersStore`, `link.ts`, `symbolsEn.test.ts`, `search.ts`, `sql.ts`, `noteWordsMath.test.ts`, `Rational`, `BoardStore`, `Dove sono le cose`, `explainPanel.ts`, `board.ts`, `sheet.ts`, `supabase.ts`?**
  _High betweenness centrality (0.073) - this node is a cross-community bridge._
- **Are the 319 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `tutorialModel()`) actually correct?**
  _`Dove sono le cose` has 319 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Comandi`, `Regole`, `6. Glifo anche in inglese` to the rest of the system?**
  _870 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `vitest` be split into smaller, more focused modules?**
  _Cohesion score 0.059233449477351915 - nodes in this community are weakly interconnected._
- **Should `markdown.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06116700201207243 - nodes in this community are weakly interconnected._