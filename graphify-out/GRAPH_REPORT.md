# Graph Report - matherdown  (2026-10-13)

## Corpus Check
- 345 files · ~712,693 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5518 nodes · 20224 edges · 168 communities (129 shown, 39 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 667 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `83b789ff`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- h
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
- graph.ts
- SchemaEditor
- editor/editor.ts
- SheetEditor
- NotesStore
- numerical.ts
- arithmetic.ts
- index.ts
- engine.ts
- schema/editor.ts
- noteWordsMath.test.ts
- store.ts
- parse.ts
- board.ts
- ui/preview.ts
- markdown.ts
- toLatex
- gantt.ts
- study.ts
- view3d.ts
- assistant.ts
- logic.ts
- linsys.ts
- complex.ts
- namesIn
- translations.test.ts
- resize.ts
- laplace.ts
- BoardStore
- localModels.ts
- chart.ts
- functions.ts
- MathError
- spreadsheetEn.test.ts
- Pt
- suggestions.ts
- board/shapes.ts
- toolbar.ts
- sidePanel.ts
- explainPanel.ts
- limits.ts
- probability.ts
- sheet.ts
- 20261004091555_note_condivise.sql
- i18n.ts
- database.ts
- finite.ts
- topics.ts
- dependencies
- Welcome to Glifo
- spreadsheet/editor.ts
- latex.ts
- odesolve.ts
- statsShown.ts
- smoke-test.mjs
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
- plan.ts
- FoldersStore
- session-start.sh
- .claude/CLAUDE.md
- Il database degli account (Supabase)
- tutorial.mjs
- Abbonamenti
- page.ts
- supabase-stub.sql
- account-test.mjs
- schemaBlocks.ts
- .constructor
- In programma
- sql.ts
- symbolsEn.test.ts
- siteUpdate.ts
- graph/file.ts
- SuggestionController
- devDependencies
- spellcheck.ts
- solve.ts
- schema/shapes.ts
- vitest
- supabase.ts
- Rational
- restore.ts
- calcResults.ts
- tutorial.ts
- Le spiegazioni, come funzionano
- selection.ts
- Sheet
- link.ts
- createFakeSupabase
- strokes.ts
- Piano per piano
- Parser
- Board
- 20261008130026_commenti.sql
- captcha.ts
- .constructor
- xlsx.ts
- editor/lists.ts
- feedback.ts
- render/lists.ts
- Glifo
- vite
- Glifo – note per Claude
- scripts
- deploy.test.ts
- spreadsheet/file.ts
- usesDecimalComma
- Costi
- editor.test.ts
- La lavagna
- .visible
- I modelli e le chiavi API

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 303 edges
2. `MathError` - 151 edges
3. `Sheet` - 147 edges
4. `num()` - 145 edges
5. `h()` - 135 edges
6. `MathNode` - 131 edges
7. `mul()` - 124 edges
8. `texts` - 123 edges
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
- `Il controllo anti-robot (CAPTCHA, ottobre 2026)` --references--> `captchaToken()`  [INFERRED]
  supabase/README.md → src/account/captcha.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (168 total, 39 thin omitted)

### Community 0 - "h"
Cohesion: 0.04
Nodes (81): 3. Le impostazioni divise in sezioni, SyncStatus, T, rich(), texts, moveDayLabel(), relocationMessage(), openSignedOut() (+73 more)

### Community 1 - "noteWords.ts"
Cohesion: 0.09
Nodes (40): GraphLabelLines, insertGraphBlock(), LABEL_KEYS, setGraphLabels(), monthOf(), MONTHS, MONTHS_EN, parseDate() (+32 more)

### Community 2 - "main.ts"
Cohesion: 0.03
Nodes (123): addToGraphBlock(), remapGraphLines(), account, ACCOUNT_OFF, active, aiShown(), aiToggle, aiWork (+115 more)

### Community 3 - "compile"
Cohesion: 0.05
Nodes (74): areaFor(), constantValue(), argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot() (+66 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (32): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+24 more)

### Community 5 - "spec.ts"
Cohesion: 0.04
Nodes (107): conicItems(), isConicLine(), quadricEquation(), T, fourierItems(), isFourierLine(), T, constantIntegrand() (+99 more)

### Community 6 - "schemaEn.test.ts"
Cohesion: 0.08
Nodes (30): schemaSummary(), svg(), openSchemaEditor(), SchemaEditorOptions, base64(), hide(), OPEN, schemasFromFile() (+22 more)

### Community 7 - "num"
Cohesion: 0.13
Nodes (87): atIntegers(), signsUp(), symbolicCoefficient(), withoutAbs(), exp(), hyperbolicToExp(), inverseRational(), sqrtEx() (+79 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (42): addLabel(), boxes, cameras, complexCoord(), containing(), coord(), coordinates(), drawings (+34 more)

### Community 9 - "Dove sono le cose"
Cohesion: 0.04
Nodes (92): Dove sono le cose, Glifo – architettura, allNames(), answerFollowUp(), bareResult(), chatContext, ChatFn, chatSubject() (+84 more)

### Community 10 - "distributions.ts"
Cohesion: 0.05
Nodes (73): isTestLine(), number(), T, testItems(), addExp(), choose(), continuousQuantile(), decimals() (+65 more)

### Community 11 - "src/relocation.ts"
Cohesion: 0.10
Nodes (49): accountSpace(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf(), prefsKey() (+41 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (57): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), dataWindow(), decimalText() (+49 more)

### Community 13 - "graph.ts"
Cohesion: 0.11
Nodes (29): fieldInput(), isLanes(), AT_X, cellHtml(), cellText(), COMPASS, createEdgeCell(), createGraph() (+21 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.10
Nodes (5): SchemaEditor, withLaneContents(), EdgeLook, serializeSchema(), fileNameFor()

### Community 15 - "editor/editor.ts"
Cohesion: 0.07
Nodes (35): description, name, private, type, version, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/language (+27 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (6): functionLabel(), SheetEditor, englishTyping(), serializeSheet(), sheetSize(), cloneSheet()

### Community 17 - "NotesStore"
Cohesion: 0.08
Nodes (23): adoptGuestNotes(), Deletion, DeletionLog, isUuid(), newId(), createdAtFromId(), deriveTitle(), NotesStore (+15 more)

### Community 18 - "numerical.ts"
Cohesion: 0.11
Nodes (49): FormatOptions, bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial() (+41 more)

### Community 19 - "arithmetic.ts"
Cohesion: 0.09
Nodes (51): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+43 more)

### Community 20 - "index.ts"
Cohesion: 0.06
Nodes (43): b, bigops, c, calculus, fn, fr, fractions, functions (+35 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "schema/editor.ts"
Cohesion: 0.05
Nodes (59): alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ALIGN_NAMES, ARROW_NAMES (+51 more)

### Community 23 - "noteWordsMath.test.ts"
Cohesion: 0.12
Nodes (15): AstNode, childrenOf(), DATA, ENGLISH, englishTexts(), FUNCTIONS, isNode(), ITALIAN (+7 more)

### Community 24 - "store.ts"
Cohesion: 0.09
Nodes (16): BoardBackend, BoardData, done(), fromRecord(), IdbBoards, ofNote(), openBoardDatabase(), openDefault() (+8 more)

### Community 25 - "parse.ts"
Cohesion: 0.07
Nodes (42): hasWord(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe() (+34 more)

### Community 26 - "board.ts"
Cohesion: 0.05
Nodes (50): Action, coalesced(), DOT_SIZES, DrawAction, EraseAction, EraserMode, Finger, HANDLE_REACH (+42 more)

### Community 27 - "ui/preview.ts"
Cohesion: 0.07
Nodes (34): GraphLabels, remapLineKeys(), renameGraphScope(), renameScopeKeys(), BlockKind, MoveDir, Look, Theme (+26 more)

### Community 28 - "markdown.ts"
Cohesion: 0.10
Nodes (30): dataRange(), moveAttrs(), renderTexOrError(), renderTexWithResult(), configurePurify(), createMarkdownIt(), FORBIDDEN_TAGS, HLJS_LANGUAGES (+22 more)

### Community 29 - "toLatex"
Cohesion: 0.05
Nodes (96): at(), centralCanonical(), Coefficients, coneCanonical(), conicOf(), det2(), det3(), determinant() (+88 more)

### Community 30 - "gantt.ts"
Cohesion: 0.06
Nodes (70): amount(), barColor(), crossings(), dateText(), dayMonth(), dayOf(), fitText(), GanttOptions (+62 more)

### Community 31 - "study.ts"
Cohesion: 0.11
Nodes (45): names(), studyItems(), T, letters(), nameLatex(), setLatex(), limit(), breaks() (+37 more)

### Community 32 - "view3d.ts"
Cohesion: 0.06
Nodes (85): addMesh(), addTet(), affinePlane(), Axis, Box, centroid(), clipBy(), clipPolygon() (+77 more)

### Community 33 - "assistant.ts"
Cohesion: 0.07
Nodes (44): AiAnswer, AiError, AiSettings, answerSchema(), askAi(), askCompatible(), askThroughHost(), capitalized() (+36 more)

### Community 34 - "logic.ts"
Cohesion: 0.11
Nodes (30): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+22 more)

### Community 35 - "linsys.ts"
Cohesion: 0.11
Nodes (47): EXACT, choices(), gcd(), matrixEquation(), matrixSystem(), minorsGcd(), ONE, parametricRows() (+39 more)

### Community 36 - "complex.ts"
Cohesion: 0.06
Nodes (67): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexLine(), isComplexValue() (+59 more)

### Community 37 - "namesIn"
Cohesion: 0.12
Nodes (39): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+31 more)

### Community 38 - "translations.test.ts"
Cohesion: 0.17
Nodes (18): AstNode, calleeName(), check(), checkPair(), visit(), children(), entryPairs(), files (+10 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (24): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+16 more)

### Community 40 - "laplace.ts"
Cohesion: 0.11
Nodes (40): factoredPolynomial(), absOf(), boundsOf(), close(), definite(), fourierProblem, fourierShown(), isTrig() (+32 more)

### Community 41 - "BoardStore"
Cohesion: 0.11
Nodes (5): BoardStore, MemoryBoards, applyAccountChange(), backup(), boardsFor()

### Community 42 - "localModels.ts"
Cohesion: 0.08
Nodes (34): @mlc-ai/web-llm, chat(), GlifoError, Gpu, load(), post(), remove(), scope (+26 more)

### Community 43 - "chart.ts"
Cohesion: 0.16
Nodes (25): at(), breakEven(), Point, quantity(), T, tableItems(), textLabel(), chartData (+17 more)

### Community 44 - "functions.ts"
Cohesion: 0.06
Nodes (80): tableTopic(), valueText(), EMPTY, evaluateSheet(), number(), SheetEvaluator, T, addFormat() (+72 more)

### Community 45 - "MathError"
Cohesion: 0.10
Nodes (63): MathError, angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, dataOf() (+55 more)

### Community 46 - "spreadsheetEn.test.ts"
Cohesion: 0.09
Nodes (48): formulaText(), decimalsOf(), ENGLISH, englishNumber(), fixedNumber(), generalNumber(), group(), italianNumber() (+40 more)

### Community 47 - "Pt"
Cohesion: 0.19
Nodes (5): clampZoom(), pressureOf(), validView(), EllipseFit, Pt

### Community 48 - "suggestions.ts"
Cohesion: 0.14
Nodes (22): preferredIndex(), SuggestionItem, normalizeText(), IndexedEntry, SearchResult, getIndex(), isSubsequence(), keysOf() (+14 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.14
Nodes (34): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+26 more)

### Community 50 - "toolbar.ts"
Cohesion: 0.17
Nodes (16): insertBlock(), wrapSelection(), ListStyleId, Action, createToolbar(), insertCode(), insertLink(), listStyle() (+8 more)

### Community 51 - "sidePanel.ts"
Cohesion: 0.07
Nodes (36): AiResult, NoteSubject, SubjectKind, texHtml(), localizeTex(), checkHtml(), checkTitle(), T (+28 more)

### Community 52 - "explainPanel.ts"
Cohesion: 0.06
Nodes (29): Explanation, FollowUp, REPLY_TOKENS, LocalAbort, modelName(), MarkdownEditor, explanationMarkdown(), AI_NEWS_TITLE (+21 more)

### Community 53 - "limits.ts"
Cohesion: 0.21
Nodes (17): exponentialForm(), fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), alternating() (+9 more)

### Community 54 - "probability.ts"
Cohesion: 0.14
Nodes (25): End, Family, bound(), compileCondition(), ExactScope, ALL, complement(), endAt() (+17 more)

### Community 55 - "sheet.ts"
Cohesion: 0.06
Nodes (50): FieldContext, criticalLine(), isSeveralLine(), named(), severalItems(), surface(), T, OdeFunction (+42 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "i18n.ts"
Cohesion: 0.06
Nodes (50): ExplainTone, AI_SERVICES, T, browserLang(), browserLanguages(), dateLocale(), detectLang(), Entry (+42 more)

### Community 58 - "database.ts"
Cohesion: 0.23
Nodes (6): createDatabase(), createUser(), databaseTests(), feedbackTests(), migrations, shareTests()

### Community 59 - "finite.ts"
Cohesion: 0.15
Nodes (31): pick(), countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots() (+23 more)

### Community 60 - "topics.ts"
Cohesion: 0.14
Nodes (24): ATTRIBUTES, cut(), ER_SHAPES, fieldText(), fitLines(), flowOrder(), FREE_NAMES, laneOf() (+16 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "Welcome to Glifo"
Cohesion: 0.20
Nodes (9): A few examples, Calculations and graphs, For programming too, Handy shortcuts, How to write formulas, Lists, Spell check, Try it now (+1 more)

### Community 63 - "spreadsheet/editor.ts"
Cohesion: 0.07
Nodes (60): sheetSummary(), currentCall(), Editing, MenuEntry, Move, openSheetEditor(), PATHS, SheetEditorOptions (+52 more)

### Community 64 - "latex.ts"
Cohesion: 0.12
Nodes (25): ACCENT_COMMANDS, diffLatex(), DISTRIBUTION_LATEX, distributionLatex(), domainLatex(), fnLatex(), fnName(), formLatex() (+17 more)

### Community 65 - "odesolve.ts"
Cohesion: 0.08
Nodes (79): addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames(), constantParticular() (+71 more)

### Community 66 - "statsShown.ts"
Cohesion: 0.16
Nodes (33): check(), correlation(), count(), covariance(), Data, dataStatistic(), deviation(), fail() (+25 more)

### Community 67 - "smoke-test.mjs"
Cohesion: 0.15
Nodes (6): markdown-it, playwright-core, PNG_ICONS, fakeLlmWorker(), firstVisit(), plainContext

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

### Community 72 - "La grafica: le otto richieste del 10 ottobre 2026"
Cohesion: 0.25
Nodes (8): 4. Più modelli per «Spiegami», 5. A cosa serve la chiave dell'AI, 6. Glifo anche in inglese, 7. Via il registro dei tocchi, 8. Il pulsante ✨ con il contorno, Gli abbonamenti, in tutto questo, In che ordine, La grafica: le otto richieste del 10 ottobre 2026

### Community 73 - "schema/templates.ts"
Cohesion: 0.25
Nodes (16): DEFAULT_EDGE, SHAPE_SIZE, tableHeight(), conceptMap(), cycle(), edge(), er(), flowchart() (+8 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.06
Nodes (70): linearIn(), primitive(), verified(), linearCells(), pairUp(), atValues(), cancelLinear(), combine() (+62 more)

### Community 75 - "Field"
Cohesion: 0.12
Nodes (7): characteristicPolynomial(), eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn()

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Errore o imprevisto → nel dettaglio, 3. Serve una decisione → frasi complete, 4. Fine del compito → un solo riepilogo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "plan.ts"
Cohesion: 0.14
Nodes (20): shownStyle(), cellText(), columnRole(), columnsOf(), durationUnit(), isNumber(), isPlanRange(), MAX_ACTIVITIES (+12 more)

### Community 79 - "FoldersStore"
Cohesion: 0.08
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

### Community 91 - "page.ts"
Cohesion: 0.11
Nodes (19): katex, sidebarToggle(), body, draw(), isDark(), saveButton, saveCopy(), settings (+11 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.10
Nodes (11): @electric-sql/pglite, device(), login(), newContext, waitFor(), b64(), CAPTCHA_TOKEN, CODE (+3 more)

### Community 97 - "schemaBlocks.ts"
Cohesion: 0.08
Nodes (34): @codemirror/state, @codemirror/view, InsertOptions, toggleLinePrefix(), addPlaceholders, Placeholder, besideSchema(), BlockWidget (+26 more)

### Community 100 - "In programma"
Cohesion: 0.22
Nodes (9): Account: i propri appunti su ogni dispositivo, anche da condividere, Commenti di chi prova Glifo, Idee per il futuro, In programma, La grafica: account, impostazioni, commenti, AI e lingua (chiesto il 10 ottobre 2026, se ne parla), La lavagna: idee in più, Più avanti, Schemi: idee in più (+1 more)

### Community 101 - "sql.ts"
Cohesion: 0.16
Nodes (18): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+10 more)

### Community 102 - "symbolsEn.test.ts"
Cohesion: 0.14
Nodes (28): editDistance(), singular(), stem(), STOPWORDS, words(), BOTH, buildIndex(), containsPhrase() (+20 more)

### Community 103 - "siteUpdate.ts"
Cohesion: 0.18
Nodes (16): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, loadPart() (+8 more)

### Community 104 - "graph/file.ts"
Cohesion: 0.08
Nodes (46): FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsForFile(), graphsFromFile(), hide() (+38 more)

### Community 105 - "SuggestionController"
Cohesion: 0.26
Nodes (3): EditorMathContext, expand(), SuggestionController

### Community 106 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

### Community 107 - "spellcheck.ts"
Cohesion: 0.08
Nodes (24): @codemirror/lang-markdown, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt() (+16 more)

### Community 108 - "solve.ts"
Cohesion: 0.07
Nodes (57): decimalSeparator(), Digits, formatNumber(), formatRational(), fromNumber(), fromRational(), SUPERSCRIPT, writeDigits() (+49 more)

### Community 113 - "schema/shapes.ts"
Cohesion: 0.08
Nodes (17): @maxgraph/core, ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape (+9 more)

### Community 116 - "vitest"
Cohesion: 0.07
Nodes (37): vitest, staticGraphSvg(), chooseWindow(), chooseBox(), formulaGraph(), formulaGraphLine(), GraphItem, parseGraph() (+29 more)

### Community 117 - "supabase.ts"
Cohesion: 0.09
Nodes (42): 1. «Cambia account», @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken() (+34 more)

### Community 118 - "Rational"
Cohesion: 0.10
Nodes (23): expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactFunction, ExactRandom, exactRoot() (+15 more)

### Community 119 - "restore.ts"
Cohesion: 0.18
Nodes (14): newStrokeId(), receiveRelocation(), restore(), BackupNote, backupNotes(), restoreBackup(), RestoreBoards, Restored (+6 more)

### Community 120 - "calcResults.ts"
Cohesion: 0.07
Nodes (37): explainTarget, acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult, calcResults(), CheckWidget (+29 more)

### Community 121 - "tutorial.ts"
Cohesion: 0.16
Nodes (11): HINT_MS, openTutorial(), show(), richText(), showTutorialHint(), close(), T, TUTORIAL_PAGES (+3 more)

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "selection.ts"
Cohesion: 0.14
Nodes (23): centerOn(), copyStrokes(), cross(), handleScale(), IDENTITY, insideLasso(), keepInside(), LASSO_SHARE (+15 more)

### Community 124 - "Sheet"
Cohesion: 0.07
Nodes (33): ExactComplexScope, ConicInfo, Ode, withWorkLimit(), FiniteContext, FormattedResult, MathNode, chainOf() (+25 more)

### Community 125 - "link.ts"
Cohesion: 0.10
Nodes (29): accountDataFile(), PullResult, openShareDialog(), changeAccess(), changeCopy(), refreshChanged(), render(), run() (+21 more)

### Community 128 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 129 - "strokes.ts"
Cohesion: 0.23
Nodes (13): between(), capsuleSpan(), circleSpan(), eraserGrowth(), eraseStroke(), intersect(), linearSpan(), pieceLength() (+5 more)

### Community 132 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 136 - "Board"
Cohesion: 0.10
Nodes (5): Board, BoardOptions, BoardChange, Box, Stroke

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 139 - "captcha.ts"
Cohesion: 0.21
Nodes (8): captchaToken(), loadTurnstile(), Turnstile, TURNSTILE_SCRIPT, Window, TURNSTILE_SITE_KEY, accountFailure(), Options

### Community 140 - ".constructor"
Cohesion: 0.15
Nodes (4): closeMathBlockOnEnter(), EditorCallbacks, searchPhrases(), insertTemplate()

### Community 141 - "xlsx.ts"
Cohesion: 0.09
Nodes (45): RFC-4180, fflate, tablesNote(), csvCell(), csvDelimiter(), csvNumbers(), csvToSheet(), digitsOf() (+37 more)

### Community 142 - "editor/lists.ts"
Cohesion: 0.10
Nodes (55): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+47 more)

### Community 143 - "feedback.ts"
Cohesion: 0.08
Nodes (45): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, Site, T, commentDate(), commentItem(), COMMENTS_MAX (+37 more)

### Community 144 - "render/lists.ts"
Cohesion: 0.27
Nodes (13): ListStyle, bulletGroup(), Marker, sameList(), alignInside(), asciiTrim(), findMarker(), Found (+5 more)

### Community 146 - "Glifo"
Cohesion: 0.12
Nodes (16): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Domande frequenti e commenti (+8 more)

### Community 154 - "vite"
Cohesion: 0.29
Nodes (4): vite, minutes, postMessage(), started

### Community 156 - "Glifo – note per Claude"
Cohesion: 0.25
Nodes (8): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Regole, sqlite()

### Community 157 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 158 - "deploy.test.ts"
Cohesion: 0.29
Nodes (4): vite-plugin-pwa, accountOffMessage(), defineFor(), MAIN_BRANCH

### Community 159 - "spreadsheet/file.ts"
Cohesion: 0.38
Nodes (6): hide(), OPEN, sheetsForFile(), sheetsFromFile(), T, unhide()

### Community 160 - "usesDecimalComma"
Cohesion: 0.15
Nodes (21): numberText(), isNumericalLine(), numericalItems(), endTex(), multipleLabel(), classes(), dataOf(), distributionExtent() (+13 more)

### Community 161 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 162 - "editor.test.ts"
Cohesion: 0.08
Nodes (26): @lezer/common, tabOutOfMath(), templateInsertion(), CODE_NODES, CommandToken, commandTokenAt(), isInCode(), MATH_NODES (+18 more)

### Community 163 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 166 - ".visible"
Cohesion: 0.40
Nodes (5): Promemoria per lo studente, 2. La pagina dei commenti, tipo FAQ, Commenti di chi prova Glifo, page(), site()

### Community 167 - "I modelli e le chiavi API"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), In prova sul ramo `prova` (7 ottobre 2026): Qwen3 nel browser per «Spiegami», Le idee dello studente (5 ottobre 2026)

## Knowledge Gaps
- **860 isolated node(s):** `6. Glifo anche in inglese`, `8. Il pulsante ✨ con il contorno`, `Gli abbonamenti, in tutto questo`, `In che ordine`, `La grafica: account, impostazioni, commenti, AI e lingua (chiesto il 10 ottobre 2026, se ne parla)` (+855 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1173 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **39 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `texts` connect `h` to `noteWords.ts`, `main.ts`, `compile`, `spec.ts`, `schemaEn.test.ts`, `graph/preview.ts`, `Dove sono le cose`, `distributions.ts`, `src/relocation.ts`, `svg.ts`, `xlsx.ts`, `editor/lists.ts`, `editor/editor.ts`, `feedback.ts`, `NotesStore`, `numerical.ts`, `arithmetic.ts`, `index.ts`, `schema/editor.ts`, `parse.ts`, `board.ts`, `ui/preview.ts`, `toLatex`, `gantt.ts`, `study.ts`, `usesDecimalComma`, `assistant.ts`, `logic.ts`, `linsys.ts`, `complex.ts`, `namesIn`, `spreadsheet/file.ts`, `resize.ts`, `laplace.ts`, `localModels.ts`, `chart.ts`, `functions.ts`, `MathError`, `spreadsheetEn.test.ts`, `toolbar.ts`, `sidePanel.ts`, `explainPanel.ts`, `probability.ts`, `sheet.ts`, `i18n.ts`, `finite.ts`, `topics.ts`, `spreadsheet/editor.ts`, `latex.ts`, `odesolve.ts`, `statsShown.ts`, `schema/templates.ts`, `symbolic.ts`, `plan.ts`, `page.ts`, `schemaBlocks.ts`, `sql.ts`, `siteUpdate.ts`, `graph/file.ts`, `spellcheck.ts`, `solve.ts`, `supabase.ts`, `restore.ts`, `calcResults.ts`, `tutorial.ts`, `link.ts`?**
  _High betweenness centrality (0.113) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `Dove sono le cose` to `h`, `strokes.ts`, `main.ts`, `noteWords.ts`, `compile`, `spec.ts`, `schemaEn.test.ts`, `num`, `Board`, `graph/preview.ts`, `distributions.ts`, `src/relocation.ts`, `.constructor`, `svg.ts`, `xlsx.ts`, `graph.ts`, `SchemaEditor`, `NotesStore`, `numerical.ts`, `arithmetic.ts`, `SheetEditor`, `feedback.ts`, `schema/editor.ts`, `parse.ts`, `board.ts`, `ui/preview.ts`, `markdown.ts`, `toLatex`, `gantt.ts`, `study.ts`, `view3d.ts`, `assistant.ts`, `usesDecimalComma`, `linsys.ts`, `complex.ts`, `namesIn`, `logic.ts`, `deploy.test.ts`, `laplace.ts`, `BoardStore`, `localModels.ts`, `chart.ts`, `functions.ts`, `MathError`, `spreadsheetEn.test.ts`, `Pt`, `board/shapes.ts`, `toolbar.ts`, `sidePanel.ts`, `explainPanel.ts`, `limits.ts`, `sheet.ts`, `i18n.ts`, `finite.ts`, `topics.ts`, `spreadsheet/editor.ts`, `odesolve.ts`, `smoke-test.mjs`, `blockMove.ts`, `symbolic.ts`, `plan.ts`, `tutorial.mjs`, `page.ts`, `schemaBlocks.ts`, `siteUpdate.ts`, `graph/file.ts`, `schema/shapes.ts`, `vitest`, `supabase.ts`, `Rational`, `calcResults.ts`, `tutorial.ts`, `selection.ts`, `Sheet`?**
  _High betweenness centrality (0.105) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `h`, `strokes.ts`, `noteWords.ts`, `main.ts`, `schemaEn.test.ts`, `num`, `Dove sono le cose`, `distributions.ts`, `src/relocation.ts`, `captcha.ts`, `svg.ts`, `editor/lists.ts`, `editor/editor.ts`, `feedback.ts`, `NotesStore`, `xlsx.ts`, `schema/editor.ts`, `noteWordsMath.test.ts`, `store.ts`, `board.ts`, `ui/preview.ts`, `markdown.ts`, `deploy.test.ts`, `view3d.ts`, `assistant.ts`, `editor.test.ts`, `linsys.ts`, `translations.test.ts`, `resize.ts`, `localModels.ts`, `chart.ts`, `MathError`, `spreadsheetEn.test.ts`, `suggestions.ts`, `board/shapes.ts`, `explainPanel.ts`, `sheet.ts`, `i18n.ts`, `database.ts`, `spreadsheet/editor.ts`, `blockMove.ts`, `plan.ts`, `FoldersStore`, `page.ts`, `schemaBlocks.ts`, `sql.ts`, `symbolsEn.test.ts`, `siteUpdate.ts`, `graph/file.ts`, `spellcheck.ts`, `supabase.ts`, `restore.ts`, `tutorial.ts`, `selection.ts`, `Sheet`, `link.ts`?**
  _High betweenness centrality (0.104) - this node is a cross-community bridge._
- **Are the 302 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `tutorialModel()`) actually correct?**
  _`Dove sono le cose` has 302 INFERRED edges - model-reasoned connections that need verification._
- **What connects `6. Glifo anche in inglese`, `8. Il pulsante ✨ con il contorno`, `Gli abbonamenti, in tutto questo` to the rest of the system?**
  _860 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `h` be split into smaller, more focused modules?**
  _Cohesion score 0.042782886845261894 - nodes in this community are weakly interconnected._
- **Should `noteWords.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08502415458937199 - nodes in this community are weakly interconnected._