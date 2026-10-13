# Graph Report - matherdown  (2026-10-13)

## Corpus Check
- 341 files · ~705,732 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5489 nodes · 20124 edges · 169 communities (126 shown, 43 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 660 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `619041cf`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- .renderFormat
- noteWords.ts
- main.ts
- compile
- sync.ts
- spec.ts
- schemaEn.test.ts
- num
- graph/preview.ts
- Dove sono le cose
- distributions.ts
- src/relocation.ts
- svg.ts
- plan.ts
- SchemaEditor
- editor/editor.ts
- SheetEditor
- domain.ts
- numerical.ts
- arithmetic.ts
- index.ts
- engine.ts
- schema/editor.ts
- noteWordsMath.test.ts
- store.ts
- Parser
- ink.ts
- ui/preview.ts
- parse.ts
- several.ts
- gantt.ts
- study.ts
- view3d.ts
- assistant.ts
- logic.ts
- schema/file.ts
- complex.ts
- namesIn
- translations.test.ts
- resize.ts
- ExplainPanel
- BoardStore
- texts
- markdown.ts
- functions.ts
- MathError
- supabase.ts
- Board
- template.ts
- board/shapes.ts
- toolbar.ts
- sidePanel.ts
- Rational
- probability.ts
- aiPanel.test.ts
- usesDecimalComma
- 20261004091555_note_condivise.sql
- h
- database.ts
- finite.ts
- topics.ts
- dependencies
- Welcome to Glifo
- spreadsheet/editor.ts
- conics.ts
- odesolve.ts
- sheet.ts
- toLatex
- blockMove.ts
- Benvenuto in Glifo
- compilerOptions
- relocation-test.mjs
- La grafica: le otto richieste del 10 ottobre 2026
- schema/templates.ts
- symbolic.ts
- Field
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- page.ts
- NotesStore
- session-start.sh
- .claude/CLAUDE.md
- Il database degli account (Supabase)
- tutorial.mjs
- Abbonamenti
- smoke-test.mjs
- supabase-stub.sql
- account-test.mjs
- schemaBlocks.ts
- inference.ts
- In programma
- gauss.ts
- symbolsEn.test.ts
- siteUpdate.ts
- vitest
- suggestions.ts
- devDependencies
- spellcheck.ts
- laplace.ts
- graph.ts
- FoldersStore
- captcha.ts
- scripts
- i18n.ts
- calcResults.ts
- labels.ts
- Le spiegazioni, come funzionano
- board.ts
- Sheet
- link.ts
- createFakeSupabase
- fourier.ts
- Piano per piano
- Parser
- Stroke
- 20261008130026_commenti.sql
- .folderItem
- .constructor
- xlsx.ts
- editor/lists.ts
- feedback.ts
- markers.ts
- Glifo
- vite
- Glifo – note per Claude
- spreadsheet/format.ts
- Distribution
- linsys.ts
- suggest.ts
- Costi
- editor.test.ts
- La lavagna
- I modelli e le chiavi API
- licenses.ts
- NodeLook

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 300 edges
2. `MathError` - 151 edges
3. `Sheet` - 147 edges
4. `num()` - 145 edges
5. `MathNode` - 131 edges
6. `h()` - 125 edges
7. `mul()` - 124 edges
8. `texts` - 121 edges
9. `Board` - 117 edges
10. `compile()` - 116 edges

## Surprising Connections (you probably didn't know these)
- `4. Più modelli per «Spiegami»` --references--> `webllmId()`  [INFERRED]
  GRAFICA.md → src/ai/localModels.ts
- `7. Via il registro dei tocchi` --references--> `forgetOldKeys()`  [INFERRED]
  GRAFICA.md → src/store/storage.ts
- `Trasloco: il sito su Cloudflare, con un dominio tutto di Glifo` --references--> `dist()`  [INFERRED]
  ROADMAP.md → src/board/shapes.ts
- `Dove sono le cose` --references--> `WidgetKind`  [INFERRED]
  ARCHITETTURA.md → src/editor/schemaBlocks.ts
- `Dove sono le cose` --references--> `ConicElements`  [INFERRED]
  ARCHITETTURA.md → src/math/conics.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (169 total, 43 thin omitted)

### Community 0 - ".renderFormat"
Cohesion: 0.15
Nodes (15): fieldInput(), isLanes(), textWidth(), cellText(), edgeLook(), edgeStyle(), edgeTextAt(), nodeLook() (+7 more)

### Community 1 - "noteWords.ts"
Cohesion: 0.08
Nodes (39): GraphLabelLines, insertGraphBlock(), LABEL_KEYS, setGraphLabels(), monthOf(), MONTHS, MONTHS_EN, parseDate() (+31 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (126): 1. «Cambia account», setCurrentAccount(), newStrokeId(), addToGraphBlock(), blockMoveTransaction(), account, ACCOUNT_OFF, accountButton (+118 more)

### Community 3 - "compile"
Cohesion: 0.06
Nodes (67): areaFor(), condLabel(), constantValue(), define(), isStraight(), isVectorName(), itemFor(), planeOf() (+59 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (31): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+23 more)

### Community 5 - "spec.ts"
Cohesion: 0.07
Nodes (67): formulaAtCursor(), conicItems(), isConicLine(), quadricEquation(), T, fourierItems(), isFourierLine(), T (+59 more)

### Community 6 - "schemaEn.test.ts"
Cohesion: 0.06
Nodes (47): @electric-sql/pglite, openSchemaEditor(), SchemaEditorOptions, Look, COLOR_NAMES, isRecord(), num(), oneOf() (+39 more)

### Community 7 - "num"
Cohesion: 0.14
Nodes (85): atIntegers(), withoutAbs(), hyperbolicToExp(), polyEx(), similarSolution(), yPowers(), bigGcd(), byParts() (+77 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (40): addLabel(), boxes, cameras, complexCoord(), coord(), coordinates(), drawings, drawnViews (+32 more)

### Community 9 - "Dove sono le cose"
Cohesion: 0.04
Nodes (99): Dove sono le cose, Glifo – architettura, @codemirror/language, allNames(), answerFollowUp(), bareResult(), chatContext, ChatFn (+91 more)

### Community 10 - "distributions.ts"
Cohesion: 0.16
Nodes (29): choose(), continuousQuantile(), decimals(), expSumValue(), factorialBig(), FAMILIES, integerParam(), invalid() (+21 more)

### Community 11 - "src/relocation.ts"
Cohesion: 0.09
Nodes (52): accountSpace(), currentAccount(), forgetAccount(), isWelcome(), knowsAccount(), prefixOf(), prefsKey(), restorePrefs() (+44 more)

### Community 12 - "svg.ts"
Cohesion: 0.08
Nodes (60): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), dataWindow(), decimalText() (+52 more)

### Community 13 - "plan.ts"
Cohesion: 0.10
Nodes (33): checkGiven(), criticalPaths(), key(), LinkType, listText(), offset(), order(), parseLinks() (+25 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.11
Nodes (5): SchemaEditor, withLaneContents(), createEdgeCell(), EdgeLook, serializeSchema()

### Community 15 - "editor/editor.ts"
Cohesion: 0.07
Nodes (32): description, name, private, type, version, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands (+24 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (10): functionLabel(), SheetEditor, CellResult, decimalsOf(), Format, englishTyping(), CellRange, clearRange() (+2 more)

### Community 17 - "domain.ts"
Cohesion: 0.08
Nodes (51): constantIntegrand(), depth(), inequalityMargin(), integralRegion, LayeredSolid, Multiple, multipleOf(), planeMargin() (+43 more)

### Community 18 - "numerical.ts"
Cohesion: 0.11
Nodes (48): bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial(), interpolating() (+40 more)

### Community 19 - "arithmetic.ts"
Cohesion: 0.07
Nodes (68): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+60 more)

### Community 20 - "index.ts"
Cohesion: 0.06
Nodes (43): b, bigops, c, calculus, fn, fr, fractions, functions (+35 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "schema/editor.ts"
Cohesion: 0.06
Nodes (58): laneOf(), alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ALIGN_NAMES (+50 more)

### Community 23 - "noteWordsMath.test.ts"
Cohesion: 0.12
Nodes (15): AstNode, childrenOf(), DATA, ENGLISH, englishTexts(), FUNCTIONS, isNode(), ITALIAN (+7 more)

### Community 24 - "store.ts"
Cohesion: 0.08
Nodes (17): fake-indexeddb, BoardBackend, BoardChange, BoardData, done(), fromRecord(), IdbBoards, ofNote() (+9 more)

### Community 26 - "ink.ts"
Cohesion: 0.15
Nodes (17): Prefs, BOARD_PALETTES, BoardPalette, BoardTheme, highlightName(), inkName(), mid(), outlineSvg() (+9 more)

### Community 27 - "ui/preview.ts"
Cohesion: 0.06
Nodes (31): GraphLabels, renameGraphScope(), renameScopeKeys(), readChart(), BlockKind, MoveDir, renderMarkdown(), draw() (+23 more)

### Community 28 - "parse.ts"
Cohesion: 0.05
Nodes (52): errorMessage(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, differentialInFraction() (+44 more)

### Community 29 - "several.ts"
Cohesion: 0.09
Nodes (52): Definite, Piece, LimitValue, severalLimit, Condition, Family, Group, Root (+44 more)

### Community 30 - "gantt.ts"
Cohesion: 0.07
Nodes (62): graphImagesFor(), amount(), barColor(), crossings(), dateText(), dayMonth(), dayOf(), fitText() (+54 more)

### Community 31 - "study.ts"
Cohesion: 0.14
Nodes (37): limit(), Asymptote, asymptoteText(), boundaries(), compiled(), cutsOf(), defined(), domainOf() (+29 more)

### Community 32 - "view3d.ts"
Cohesion: 0.06
Nodes (84): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+76 more)

### Community 33 - "assistant.ts"
Cohesion: 0.07
Nodes (43): AiAnswer, AiError, AiResult, AiSettings, answerSchema(), askAi(), askCompatible(), askThroughHost() (+35 more)

### Community 34 - "logic.ts"
Cohesion: 0.11
Nodes (30): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+22 more)

### Community 35 - "schema/file.ts"
Cohesion: 0.13
Nodes (18): loadDialect(), base64(), hide(), OPEN, schemasForFile(), schemasFromFile(), T, unhide() (+10 more)

### Community 36 - "complex.ts"
Cohesion: 0.06
Nodes (56): add(), arg(), asin(), atan(), compileFunction(), compileName(), complex, ComplexCompiled (+48 more)

### Community 37 - "namesIn"
Cohesion: 0.12
Nodes (39): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+31 more)

### Community 38 - "translations.test.ts"
Cohesion: 0.17
Nodes (18): AstNode, calleeName(), check(), checkPair(), visit(), children(), entryPairs(), files (+10 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (24): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+16 more)

### Community 41 - "BoardStore"
Cohesion: 0.08
Nodes (14): BoardStore, MemoryBoards, validView(), BackupNote, backupNotes(), restoreBackup(), RestoreBoards, Restored (+6 more)

### Community 42 - "texts"
Cohesion: 0.05
Nodes (67): @mlc-ai/web-llm, Explanation, FollowUp, REPLY_TOKENS, chat(), GlifoError, Gpu, load() (+59 more)

### Community 43 - "markdown.ts"
Cohesion: 0.12
Nodes (26): dompurify, lineDepth(), parseBlockMath(), dataRange(), tableChartKind(), renderTexOrError(), renderTexWithResult(), configurePurify() (+18 more)

### Community 44 - "functions.ts"
Cohesion: 0.07
Nodes (66): EMPTY, evaluateSheet(), number(), SheetEvaluator, T, addFormat(), divFormat(), most() (+58 more)

### Community 45 - "MathError"
Cohesion: 0.09
Nodes (68): MathError, formatNumber(), angleBetween(), asMatrix(), basisOf(), circleText(), complexText(), cross() (+60 more)

### Community 46 - "supabase.ts"
Cohesion: 0.13
Nodes (30): @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken(), ensureSessionOf() (+22 more)

### Community 47 - "Board"
Cohesion: 0.10
Nodes (8): Board, clampZoom(), loadPrefs(), pressureOf(), sizeChoice(), validView(), SizeChoice, Pt

### Community 48 - "template.ts"
Cohesion: 0.23
Nodes (9): SuggestionItem, cardPreviewTex(), formPreviewTex(), ParsedTemplate, PLACEHOLDER_TEX, placeholderPreview(), Category, CategoryId (+1 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (36): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+28 more)

### Community 50 - "toolbar.ts"
Cohesion: 0.18
Nodes (15): insertBlock(), wrapSelection(), Action, createToolbar(), insertCode(), insertLink(), listStyle(), MenuItem (+7 more)

### Community 51 - "sidePanel.ts"
Cohesion: 0.12
Nodes (14): AI_SERVICES, aiSettingsOf(), T, localizeTex(), isConfidentAnswer(), AiState, cardPreview(), displayCode() (+6 more)

### Community 52 - "Rational"
Cohesion: 0.13
Nodes (20): Part, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactFunction, ExactRandom, exactRoot() (+12 more)

### Community 53 - "probability.ts"
Cohesion: 0.10
Nodes (29): addExp(), End, expSum, Family, Interval, subtractExp(), ExactScope, ALL (+21 more)

### Community 54 - "aiPanel.test.ts"
Cohesion: 0.06
Nodes (36): @codemirror/state, ExplainTone, definedName(), formulaTopic(), graphTopic(), numberText(), studyOf(), theoremTopic() (+28 more)

### Community 55 - "usesDecimalComma"
Cohesion: 0.11
Nodes (27): isTestLine(), number(), T, testItems(), isNumericalLine(), numericalItems(), classes(), dataOf() (+19 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "h"
Cohesion: 0.04
Nodes (85): 3. Le impostazioni divise in sezioni, SyncStatus, aiService, rich(), viewSwitch, moveDayLabel(), relocationMessage(), openSignedOut() (+77 more)

### Community 58 - "database.ts"
Cohesion: 0.23
Nodes (6): createDatabase(), createUser(), databaseTests(), feedbackTests(), migrations, shareTests()

### Community 59 - "finite.ts"
Cohesion: 0.17
Nodes (28): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+20 more)

### Community 60 - "topics.ts"
Cohesion: 0.08
Nodes (64): ATTRIBUTES, cut(), ER_SHAPES, fieldText(), fitLines(), flowOrder(), formulaText(), FREE_NAMES (+56 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "Welcome to Glifo"
Cohesion: 0.20
Nodes (9): A few examples, Calculations and graphs, For programming too, Handy shortcuts, How to write formulas, Lists, Spell check, Try it now (+1 more)

### Community 63 - "spreadsheet/editor.ts"
Cohesion: 0.09
Nodes (48): tablesNote(), currentCall(), Editing, MenuEntry, Move, PATHS, SheetEditorOptions, Snapshot (+40 more)

### Community 64 - "conics.ts"
Cohesion: 0.17
Nodes (30): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+22 more)

### Community 65 - "odesolve.ts"
Cohesion: 0.08
Nodes (84): linearIn(), addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames() (+76 more)

### Community 66 - "sheet.ts"
Cohesion: 0.07
Nodes (61): EMPTY_COMPLEX_SCOPE, characteristicPolynomial(), Eigenvalue, Lin, LinearValue, NUMERICAL, bracketParts(), BRACKETS (+53 more)

### Community 67 - "toLatex"
Cohesion: 0.08
Nodes (38): criticalLine(), isSeveralLine(), named(), severalItems(), surface(), T, ACCENT_COMMANDS, diffLatex() (+30 more)

### Community 68 - "blockMove.ts"
Cohesion: 0.08
Nodes (42): blockMoved, blockMoves(), LineMap, placeChart(), blockKind, blockWord(), blank(), BlockMove (+34 more)

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
Cohesion: 0.18
Nodes (11): 2. La pagina dei commenti, tipo FAQ, 4. Più modelli per «Spiegami», 5. A cosa serve la chiave dell'AI, 6. Glifo anche in inglese, 7. Via il registro dei tocchi, 8. Il pulsante ✨ con il contorno, Gli abbonamenti, in tutto questo, In che ordine (+3 more)

### Community 73 - "schema/templates.ts"
Cohesion: 0.23
Nodes (17): SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), conceptMap(), cycle(), edge(), er() (+9 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (58): linearCells(), atValues(), combine(), commonMonomial(), Converter, coordinates(), decimalText(), definiteParts() (+50 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Errore o imprevisto → nel dettaglio, 3. Serve una decisione → frasi complete, 4. Fine del compito → un solo riepilogo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "page.ts"
Cohesion: 0.10
Nodes (22): katex, sidebarToggle(), body, saveButton, saveCopy(), settings, status, systemDark (+14 more)

### Community 79 - "NotesStore"
Cohesion: 0.07
Nodes (32): adoptGuestNotes(), guestNoteCount(), Deletion, DeletionLog, Folder, FOLDER_NAME_MAX, FolderGroup, groupByFolder() (+24 more)

### Community 82 - "Il database degli account (Supabase)"
Cohesion: 0.14
Nodes (13): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il controllo anti-robot (CAPTCHA, ottobre 2026), Il database degli account (Supabase), Il progetto, Il trasloco su glifo.page (ottobre 2026) (+5 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.11
Nodes (11): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+3 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.14
Nodes (14): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+6 more)

### Community 91 - "smoke-test.mjs"
Cohesion: 0.15
Nodes (6): markdown-it, playwright-core, PNG_ICONS, fakeLlmWorker(), firstVisit(), plainContext

### Community 96 - "account-test.mjs"
Cohesion: 0.11
Nodes (10): device(), login(), newContext, waitFor(), b64(), CAPTCHA_TOKEN, CODE, GOOGLE_CODE (+2 more)

### Community 97 - "schemaBlocks.ts"
Cohesion: 0.10
Nodes (18): toggleLinePrefix(), BlockWidget, findWidgetBlocks(), guardBlocks(), KINDS, schemaBlocks(), schemaSummary(), svg() (+10 more)

### Community 98 - "inference.ts"
Cohesion: 0.14
Nodes (27): between(), chiSquareTest(), confidence(), confidenceShown(), decimals(), Given, hypothesisTest(), InferenceContext (+19 more)

### Community 100 - "In programma"
Cohesion: 0.18
Nodes (10): Promemoria per lo studente, Account: i propri appunti su ogni dispositivo, anche da condividere, Commenti di chi prova Glifo, Idee per il futuro, In programma, La grafica: account, impostazioni, commenti, AI e lingua (chiesto il 10 ottobre 2026, se ne parla), La lavagna: idee in più, Più avanti (+2 more)

### Community 101 - "gauss.ts"
Cohesion: 0.14
Nodes (27): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexLine(), isComplexValue() (+19 more)

### Community 102 - "symbolsEn.test.ts"
Cohesion: 0.14
Nodes (28): editDistance(), singular(), stem(), STOPWORDS, words(), BOTH, buildIndex(), containsPhrase() (+20 more)

### Community 103 - "siteUpdate.ts"
Cohesion: 0.15
Nodes (19): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, loadPart() (+11 more)

### Community 104 - "vitest"
Cohesion: 0.05
Nodes (58): vitest, FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), graphsForFile(), graphsFromFile(), hide() (+50 more)

### Community 105 - "suggestions.ts"
Cohesion: 0.20
Nodes (7): EditorMathContext, expand(), preferredIndex(), SuggestionController, commandNames(), parseTemplate(), templateText()

### Community 106 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

### Community 107 - "spellcheck.ts"
Cohesion: 0.08
Nodes (24): @codemirror/lang-markdown, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt() (+16 more)

### Community 108 - "laplace.ts"
Cohesion: 0.10
Nodes (50): factoredPolynomial(), integerPoly(), beyondPoles(), compiled(), E, exp(), fractionShown(), HALF (+42 more)

### Community 113 - "graph.ts"
Cohesion: 0.05
Nodes (34): @maxgraph/core, AT_X, COMPASS, createGraph(), drawSchema(), insertSchema(), isEdgeLook(), isNodeLook() (+26 more)

### Community 116 - "FoldersStore"
Cohesion: 0.18
Nodes (3): cleanFolderName(), FoldersStore, sameName()

### Community 117 - "captcha.ts"
Cohesion: 0.21
Nodes (8): captchaToken(), loadTurnstile(), Turnstile, TURNSTILE_SCRIPT, Window, TURNSTILE_SITE_KEY, accountFailure(), Options

### Community 118 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 119 - "i18n.ts"
Cohesion: 0.08
Nodes (32): browserLang(), browserLanguages(), dateLocale(), detectLang(), Entry, isLang(), lang, LANGUAGES (+24 more)

### Community 120 - "calcResults.ts"
Cohesion: 0.11
Nodes (15): acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult, calcResults(), CheckWidget, formulasUntil() (+7 more)

### Community 121 - "labels.ts"
Cohesion: 0.16
Nodes (20): ACCENTS, BLACKBOARD, CALLIGRAPHIC, closing(), convert(), escapeXml(), FUNCTIONS, GREEK (+12 more)

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "board.ts"
Cohesion: 0.05
Nodes (63): Action, coalesced(), DOT_SIZES, EraserMode, Finger, HANDLE_REACH, ICON, LassoAction (+55 more)

### Community 124 - "Sheet"
Cohesion: 0.07
Nodes (34): Definition, Line, ExactComplexScope, Ode, withWorkLimit(), FiniteContext, FormattedResult, Mat (+26 more)

### Community 125 - "link.ts"
Cohesion: 0.09
Nodes (33): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), PullResult, openShareDialog(), changeAccess(), changeCopy() (+25 more)

### Community 128 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 129 - "fourier.ts"
Cohesion: 0.21
Nodes (19): absOf(), boundsOf(), close(), definite(), fourierProblem, fourierShown(), isTrig(), isZero() (+11 more)

### Community 132 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 136 - "Stroke"
Cohesion: 0.10
Nodes (6): BoardOptions, DrawAction, EraseAction, pointsOf(), Step, Stroke

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 139 - ".folderItem"
Cohesion: 0.23
Nodes (3): saveClosedFolders(), NotesPanel, NotesPanelDeps

### Community 141 - "xlsx.ts"
Cohesion: 0.07
Nodes (60): RFC-4180, fflate, csvCell(), csvDelimiter(), csvNumbers(), csvToSheet(), digitsOf(), field() (+52 more)

### Community 142 - "editor/lists.ts"
Cohesion: 0.14
Nodes (39): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+31 more)

### Community 143 - "feedback.ts"
Cohesion: 0.07
Nodes (39): vite-plugin-pwa, accountOffMessage(), Site, T, commentDate(), commentItem(), COMMENTS_MAX, CommentsDeps (+31 more)

### Community 144 - "markers.ts"
Cohesion: 0.12
Nodes (33): ListStyle, bullet(), bulletGroup(), childMarker(), column(), firstMarker(), label(), lettersMarker() (+25 more)

### Community 146 - "Glifo"
Cohesion: 0.12
Nodes (16): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Commenti, Compatibilità con VS Code, Condividere una nota con un link (+8 more)

### Community 154 - "vite"
Cohesion: 0.29
Nodes (4): vite, minutes, postMessage(), started

### Community 156 - "Glifo – note per Claude"
Cohesion: 0.25
Nodes (8): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Regole, sqlite()

### Community 157 - "spreadsheet/format.ts"
Cohesion: 0.08
Nodes (41): at(), breakEven(), Point, quantity(), T, tableItems(), textLabel(), chartData (+33 more)

### Community 158 - "Distribution"
Cohesion: 0.15
Nodes (10): discreteQuantile(), Distribution, exactIntervalProbability(), integerRange(), intervalProbability(), pValue(), rejection(), TestResult (+2 more)

### Community 159 - "linsys.ts"
Cohesion: 0.06
Nodes (85): decimalSeparator(), Digits, FormatOptions, formatRational(), fromNumber(), fromRational(), SUPERSCRIPT, writeDigits() (+77 more)

### Community 160 - "suggest.ts"
Cohesion: 0.27
Nodes (11): normalizeText(), IndexedEntry, SearchResult, getIndex(), isSubsequence(), keysOf(), MatchKind, suggestCommands() (+3 more)

### Community 161 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 162 - "editor.test.ts"
Cohesion: 0.07
Nodes (34): @lezer/common, closeMathBlockOnEnter(), tabOutOfMath(), InsertOptions, insertTemplate(), templateInsertion(), CODE_NODES, CommandToken (+26 more)

### Community 163 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 166 - "I modelli e le chiavi API"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), In prova sul ramo `prova` (7 ottobre 2026): Qwen3 nel browser per «Spiegami», Le idee dello studente (5 ottobre 2026)

### Community 167 - "licenses.ts"
Cohesion: 0.32
Nodes (5): License, licenseOf(), LICENSES, T, texts

## Knowledge Gaps
- **852 isolated node(s):** `6. Glifo anche in inglese`, `8. Il pulsante ✨ con il contorno`, `Gli abbonamenti, in tutto questo`, `In che ordine`, `La grafica: account, impostazioni, commenti, AI e lingua (chiesto il 10 ottobre 2026, se ne parla)` (+847 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1163 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **43 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `texts` connect `texts` to `noteWords.ts`, `main.ts`, `compile`, `fourier.ts`, `spec.ts`, `schemaEn.test.ts`, `graph/preview.ts`, `Dove sono le cose`, `distributions.ts`, `src/relocation.ts`, `svg.ts`, `plan.ts`, `editor/lists.ts`, `editor/editor.ts`, `feedback.ts`, `domain.ts`, `numerical.ts`, `arithmetic.ts`, `xlsx.ts`, `index.ts`, `schema/editor.ts`, `ink.ts`, `ui/preview.ts`, `parse.ts`, `spreadsheet/format.ts`, `gantt.ts`, `linsys.ts`, `several.ts`, `assistant.ts`, `logic.ts`, `study.ts`, `complex.ts`, `namesIn`, `schema/file.ts`, `licenses.ts`, `resize.ts`, `BoardStore`, `functions.ts`, `MathError`, `supabase.ts`, `toolbar.ts`, `sidePanel.ts`, `probability.ts`, `aiPanel.test.ts`, `usesDecimalComma`, `h`, `finite.ts`, `topics.ts`, `spreadsheet/editor.ts`, `conics.ts`, `odesolve.ts`, `sheet.ts`, `toLatex`, `schema/templates.ts`, `symbolic.ts`, `page.ts`, `NotesStore`, `schemaBlocks.ts`, `inference.ts`, `gauss.ts`, `siteUpdate.ts`, `vitest`, `spellcheck.ts`, `laplace.ts`, `i18n.ts`, `calcResults.ts`, `board.ts`, `link.ts`?**
  _High betweenness centrality (0.136) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `Dove sono le cose` to `.renderFormat`, `noteWords.ts`, `main.ts`, `compile`, `fourier.ts`, `spec.ts`, `num`, `Stroke`, `graph/preview.ts`, `src/relocation.ts`, `.constructor`, `svg.ts`, `plan.ts`, `SchemaEditor`, `feedback.ts`, `xlsx.ts`, `numerical.ts`, `arithmetic.ts`, `SheetEditor`, `schema/editor.ts`, `Parser`, `ink.ts`, `ui/preview.ts`, `parse.ts`, `spreadsheet/format.ts`, `gantt.ts`, `linsys.ts`, `view3d.ts`, `assistant.ts`, `logic.ts`, `several.ts`, `complex.ts`, `namesIn`, `study.ts`, `schema/file.ts`, `ExplainPanel`, `BoardStore`, `texts`, `markdown.ts`, `functions.ts`, `MathError`, `supabase.ts`, `Board`, `board/shapes.ts`, `toolbar.ts`, `sidePanel.ts`, `Rational`, `probability.ts`, `aiPanel.test.ts`, `usesDecimalComma`, `h`, `finite.ts`, `topics.ts`, `spreadsheet/editor.ts`, `conics.ts`, `odesolve.ts`, `sheet.ts`, `blockMove.ts`, `symbolic.ts`, `page.ts`, `NotesStore`, `tutorial.mjs`, `smoke-test.mjs`, `schemaBlocks.ts`, `inference.ts`, `gauss.ts`, `siteUpdate.ts`, `vitest`, `graph.ts`, `i18n.ts`, `calcResults.ts`, `board.ts`, `Sheet`?**
  _High betweenness centrality (0.092) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `noteWords.ts`, `schemaEn.test.ts`, `num`, `Dove sono le cose`, `distributions.ts`, `src/relocation.ts`, `svg.ts`, `plan.ts`, `editor/lists.ts`, `editor/editor.ts`, `feedback.ts`, `markers.ts`, `xlsx.ts`, `schema/editor.ts`, `noteWordsMath.test.ts`, `store.ts`, `ink.ts`, `ui/preview.ts`, `parse.ts`, `gantt.ts`, `linsys.ts`, `view3d.ts`, `assistant.ts`, `editor.test.ts`, `schema/file.ts`, `translations.test.ts`, `resize.ts`, `licenses.ts`, `BoardStore`, `texts`, `MathError`, `supabase.ts`, `template.ts`, `board/shapes.ts`, `aiPanel.test.ts`, `h`, `database.ts`, `topics.ts`, `spreadsheet/editor.ts`, `sheet.ts`, `toLatex`, `blockMove.ts`, `page.ts`, `NotesStore`, `schemaBlocks.ts`, `symbolsEn.test.ts`, `siteUpdate.ts`, `spellcheck.ts`, `laplace.ts`, `captcha.ts`, `i18n.ts`, `board.ts`, `Sheet`, `link.ts`?**
  _High betweenness centrality (0.068) - this node is a cross-community bridge._
- **Are the 299 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `tutorialModel()`) actually correct?**
  _`Dove sono le cose` has 299 INFERRED edges - model-reasoned connections that need verification._
- **What connects `6. Glifo anche in inglese`, `8. Il pulsante ✨ con il contorno`, `Gli abbonamenti, in tutto questo` to the rest of the system?**
  _852 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `noteWords.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08456659619450317 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.037480063795853266 - nodes in this community are weakly interconnected._