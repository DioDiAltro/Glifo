# Graph Report - matherdown  (2026-10-09)

## Corpus Check
- 318 files · ~609,602 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5081 nodes · 18366 edges · 157 communities (122 shown, 35 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 590 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f955aa45`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- touchlog.ts
- Parser
- main.ts
- compile
- sync.ts
- spec.ts
- parse.ts
- primitive.ts
- graph/preview.ts
- explain.ts
- spreadsheet/format.ts
- editor/lists.ts
- svg.ts
- statsGraph.ts
- SchemaEditor
- Board
- SheetEditor
- calcPlugin
- numerical.ts
- arithmetic.ts
- index.ts
- engine.ts
- topics.ts
- schema/file.ts
- store.ts
- MathError
- domain.ts
- assistant.ts
- Rational
- toNode
- gantt.ts
- devDependencies
- search.ts
- spell.test.ts
- logic.ts
- graph.ts
- complex.ts
- namesIn
- board.ts
- resize.ts
- page.ts
- NotesStore
- several.ts
- study.ts
- functions.ts
- finite.ts
- view3d.ts
- FoldersStore
- distributions.ts
- board/shapes.ts
- markdown.ts
- SidePanel
- .onMove
- feedback.ts
- dialogs.ts
- ui/preview.ts
- 20261004091555_note_condivise.sql
- strokes.ts
- src/relocation.ts
- num
- Glifo
- dependencies
- h
- vitest
- calcResults.ts
- Piano per piano
- spreadsheet/editor.ts
- blockMove.ts
- smoke-test.mjs
- Benvenuto in Glifo
- compilerOptions
- relocation-test.mjs
- probability.ts
- MarkdownEditor
- symbolic.ts
- sidePanel.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- toolbar.ts
- session-start.sh
- .claude/CLAUDE.md
- sheet.ts
- tutorial.mjs
- Abbonamenti
- explainPanel.ts
- Costi
- supabase-stub.sql
- account-test.mjs
- BoardStore
- ink.ts
- logo.ts
- toLatex
- .int
- formatNumber
- suggestions.ts
- plan.ts
- escapeHtml
- localModels.ts
- xlsx.ts
- siteUpdate.ts
- schema/shapes.ts
- Il database degli account (Supabase)
- Commenti di chi prova Glifo
- ExplainPanel
- conics.ts
- .renderFormat
- files.ts
- Le spiegazioni, come funzionano
- AiPanel
- Sheet
- sql.ts
- schemaTools.test.ts
- spiegami-qwen.mjs
- createFakeSupabase
- graph/file.ts
- render/lists.ts
- linsys.ts
- Parser
- Scope
- 20261008130026_commenti.sql
- Dove sono le cose
- Glifo – note per Claude
- grafo-html.mjs
- ExplainChat
- scripts
- La lavagna
- I modelli e le chiavi API
- editor/editor.ts

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
- `Funzionalità` --references--> `k()`  [INFERRED]
  README.md → src/math/numerical.ts
- `Come viene pubblicata` --references--> `dist()`  [INFERRED]
  README.md → src/board/shapes.ts
- `Trasloco: il sito su Cloudflare, con un dominio tutto di Glifo` --references--> `dist()`  [INFERRED]
  ROADMAP.md → src/board/shapes.ts
- `Dove sono le cose` --references--> `ConicElements`  [INFERRED]
  ARCHITETTURA.md → src/math/conics.ts
- `Dove sono le cose` --references--> `texts()`  [INFERRED]
  ARCHITETTURA.md → tests/boardTouchLog.test.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (157 total, 35 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.09
Nodes (27): at(), browserStore, clip(), isSaved(), KINDS, LOG_KEY, LOG_MAX_LINES, LogStore (+19 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (115): addToGraphBlock(), graphsForFile(), hide(), remapGraphLines(), remapLineKeys(), account, ACCOUNT_OFF, accountProblem() (+107 more)

### Community 3 - "compile"
Cohesion: 0.07
Nodes (57): conicItems(), criticalLine(), named(), severalItems(), surface(), argumentOrder(), compileLineIntegral(), compileSurfaceIntegral() (+49 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (30): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+22 more)

### Community 5 - "spec.ts"
Cohesion: 0.06
Nodes (85): formulaAtCursor(), GraphLabelLines, insertGraphBlock(), setGraphLabels(), isConicLine(), quadricEquation(), isComplexLine(), isNumericalLine() (+77 more)

### Community 6 - "parse.ts"
Cohesion: 0.06
Nodes (42): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, differentialInFraction(), DISTRIBUTION_EXAMPLES (+34 more)

### Community 7 - "primitive.ts"
Cohesion: 0.15
Nodes (62): degree(), algebraic(), bigGcd(), byParts(), candidates(), canon(), combineLogs(), compareKeys() (+54 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (38): addLabel(), boxes, cameras, complexCoord(), coord(), drawings, drawnViews, endTex() (+30 more)

### Community 9 - "explain.ts"
Cohesion: 0.06
Nodes (57): allNames(), bareResult(), CHAT_SUBJECT, ChatFn, checkFormulas(), checkSteps(), checkTopicFormula(), Conversation (+49 more)

### Community 10 - "spreadsheet/format.ts"
Cohesion: 0.12
Nodes (33): at(), breakEven(), Point, quantity(), tableItems(), textLabel(), chartData, chartFrom() (+25 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.11
Nodes (51): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+43 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (57): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseWindow(), chooseY(), clipLines(), dataWindow() (+49 more)

### Community 13 - "statsGraph.ts"
Cohesion: 0.18
Nodes (16): isTestLine(), number(), testItems(), classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX (+8 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.11
Nodes (4): isLanes(), SchemaEditor, withLaneContents(), serializeSchema()

### Community 15 - "Board"
Cohesion: 0.09
Nodes (3): Board, penErases(), Box

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (5): rangeLabel(), SheetEditor, serializeSheet(), CellRange, cloneSheet()

### Community 17 - "calcPlugin"
Cohesion: 0.16
Nodes (5): acceptCalcResult(), calcPlugin, CheckWidget, insertResult(), ResultWidget

### Community 18 - "numerical.ts"
Cohesion: 0.12
Nodes (48): bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial(), interpolating() (+40 more)

### Community 19 - "arithmetic.ts"
Cohesion: 0.06
Nodes (92): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+84 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (41): b, bigops, c, calculus, fn, fr, fractions, functions (+33 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "topics.ts"
Cohesion: 0.10
Nodes (36): ATTRIBUTES, count(), cut(), ER_SHAPES, fieldText(), fitLines(), flowOrder(), formulaText() (+28 more)

### Community 23 - "schema/file.ts"
Cohesion: 0.19
Nodes (13): svg(), base64(), hide(), OPEN, schemasForFile(), schemasFromFile(), unhide(), crc32() (+5 more)

### Community 24 - "store.ts"
Cohesion: 0.10
Nodes (14): fake-indexeddb, BoardBackend, done(), fromRecord(), IdbBoards, ofNote(), openBoardDatabase(), openDefault() (+6 more)

### Community 25 - "MathError"
Cohesion: 0.10
Nodes (63): MathError, angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, dataOf() (+55 more)

### Community 26 - "domain.ts"
Cohesion: 0.09
Nodes (48): constantIntegrand(), depth(), inequalityMargin(), integralRegion, LayeredSolid, Multiple, multipleOf(), planeMargin() (+40 more)

### Community 27 - "assistant.ts"
Cohesion: 0.10
Nodes (26): @anthropic-ai/sdk, AiAnswer, AiError, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible(), askThroughHost() (+18 more)

### Community 28 - "Rational"
Cohesion: 0.09
Nodes (23): Part, expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactRandom, exactRoot() (+15 more)

### Community 29 - "toNode"
Cohesion: 0.14
Nodes (31): numShown(), absOf(), atIntegers(), boundsOf(), close(), definite(), fourierProblem, fourierShown() (+23 more)

### Community 30 - "gantt.ts"
Cohesion: 0.06
Nodes (67): amount(), barColor(), crossings(), dateText(), dayOf(), fitText(), GanttOptions, ganttSvg() (+59 more)

### Community 31 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

### Community 32 - "search.ts"
Cohesion: 0.16
Nodes (25): SuggestionItem, editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase() (+17 more)

### Community 33 - "spell.test.ts"
Cohesion: 0.07
Nodes (29): @codemirror/lang-markdown, noIndentedCode, mathMarkdown, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck() (+21 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "graph.ts"
Cohesion: 0.10
Nodes (30): fieldInput(), textWidth(), AT_X, cellText(), COMPASS, createEdgeCell(), createGraph(), drawSchema() (+22 more)

### Community 36 - "complex.ts"
Cohesion: 0.06
Nodes (67): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexValue(), isInequality() (+59 more)

### Community 37 - "namesIn"
Cohesion: 0.14
Nodes (35): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+27 more)

### Community 38 - "board.ts"
Cohesion: 0.07
Nodes (36): Action, ACTION_NAMES, BoardOptions, DOT_SIZES, DrawAction, EraseAction, EraserMode, Finger (+28 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "page.ts"
Cohesion: 0.04
Nodes (78): @supabase/supabase-js, AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), accountError, appUrl(), call() (+70 more)

### Community 41 - "NotesStore"
Cohesion: 0.06
Nodes (47): accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), knowsAccount(), prefixOf(), setCurrentAccount() (+39 more)

### Community 42 - "several.ts"
Cohesion: 0.13
Nodes (38): severalLimit, fractionNear(), at(), bounded(), Candidate, candidates(), compiled(), constraintsOf() (+30 more)

### Community 43 - "study.ts"
Cohesion: 0.09
Nodes (51): close(), Definite, definiteIntegral(), exValue(), samples(), EMPTY_SCOPE, Piece, limit() (+43 more)

### Community 44 - "functions.ts"
Cohesion: 0.09
Nodes (59): EMPTY, number(), addFormat(), divFormat(), GENERAL, mulFormat(), tidy(), withCents() (+51 more)

### Community 45 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 46 - "view3d.ts"
Cohesion: 0.06
Nodes (87): staticGraphSvg(), addMesh(), addTet(), affinePlane(), Axis, centroid(), chooseBox(), clipBy() (+79 more)

### Community 47 - "FoldersStore"
Cohesion: 0.09
Nodes (12): LocalChange, cleanFolderName(), FoldersStore, sameName(), callAs(), createDatabase(), createUser(), databaseTests() (+4 more)

### Community 48 - "distributions.ts"
Cohesion: 0.06
Nodes (62): addExp(), choose(), continuousQuantile(), discreteQuantile(), Distribution, exactIntervalProbability(), expSumValue(), factorialBig() (+54 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (35): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+27 more)

### Community 50 - "markdown.ts"
Cohesion: 0.09
Nodes (36): @lezer/highlight, @lezer/markdown, lineDepth(), mathDelimTag, mathTag, parseBlockMath(), dataRange(), moveAttrs() (+28 more)

### Community 51 - "SidePanel"
Cohesion: 0.20
Nodes (4): SymbolForm, displayCode(), preventFocusSteal(), SidePanel

### Community 52 - ".onMove"
Cohesion: 0.15
Nodes (5): clampZoom(), coalesced(), pointsOf(), pressureOf(), validView()

### Community 53 - "feedback.ts"
Cohesion: 0.08
Nodes (33): vite-plugin-pwa, accountOffMessage(), Site, commentDate(), commentItem(), COMMENTS_MAX, CommentsDeps, CommentsError (+25 more)

### Community 54 - "dialogs.ts"
Cohesion: 0.11
Nodes (19): ExplainTone, DEFAULT_LOCAL_MODEL, AI_SERVICES, aiService, ACCOUNT_SETTINGS, AI_MODELS, DEFAULT_SETTINGS, SETTINGS_KEY (+11 more)

### Community 55 - "ui/preview.ts"
Cohesion: 0.08
Nodes (23): GraphLabels, renameGraphScope(), renameScopeKeys(), BlockKind, MoveDir, draw(), drawCached(), drawn (+15 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "strokes.ts"
Cohesion: 0.10
Nodes (37): centerOn(), copyStrokes(), cross(), handleScale(), IDENTITY, insideLasso(), keepInside(), LASSO_SHARE (+29 more)

### Community 58 - "src/relocation.ts"
Cohesion: 0.08
Nodes (48): isWelcome(), newStrokeId(), receiveRelocation(), restore(), buildPackage(), importPackage(), isRelocationPackage(), moveDayLabel() (+40 more)

### Community 59 - "num"
Cohesion: 0.08
Nodes (101): splitAbs(), withoutAbs(), exp(), hyperbolicToExp(), linearIn(), sqrtEx(), termTransform(), polyEx() (+93 more)

### Community 60 - "Glifo"
Cohesion: 0.13
Nodes (15): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Commenti, Compatibilità con VS Code, Condividere una nota con un link (+7 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "h"
Cohesion: 0.05
Nodes (59): SyncStatus, helpButton, openGuide(), RelocationResult, saveClosedFolders(), AccountButton, confirmAccountDeletion(), messageOf() (+51 more)

### Community 63 - "vitest"
Cohesion: 0.05
Nodes (40): vitest, GraphItem, parseGraph(), DrawOptions, Palette, PALETTES, DEFAULT_CAMERA, Quality (+32 more)

### Community 64 - "calcResults.ts"
Cohesion: 0.11
Nodes (33): @codemirror/language, @codemirror/state, @lezer/common, explainTarget, CalcCheck, calcOutcomes(), CalcResult, calcResults() (+25 more)

### Community 65 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 66 - "spreadsheet/editor.ts"
Cohesion: 0.07
Nodes (66): RFC-4180, fflate, openSheet(), saveSheetBlock(), tablesNote(), csvDelimiter(), csvToSheet(), field() (+58 more)

### Community 67 - "blockMove.ts"
Cohesion: 0.11
Nodes (34): blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove, blockPlace(), closed() (+26 more)

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

### Community 72 - "probability.ts"
Cohesion: 0.12
Nodes (26): End, Family, CompileOptions, ExactScope, RelOp, ALL, complement(), endAt() (+18 more)

### Community 73 - "MarkdownEditor"
Cohesion: 0.17
Nodes (5): closeMathBlockOnEnter(), EditorCallbacks, MarkdownEditor, insertTemplate(), setup()

### Community 74 - "symbolic.ts"
Cohesion: 0.06
Nodes (65): primitive(), verified(), linearCells(), assumePositive(), atValues(), commonMonomial(), commonPositive(), Converter (+57 more)

### Community 75 - "sidePanel.ts"
Cohesion: 0.19
Nodes (14): AiResult, isConfidentAnswer(), CATEGORIES, symbolsInCategory(), cardPreviewTex(), formPreviewTex(), ParsedTemplate, parseTemplate() (+6 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.04
Nodes (70): schemaSummary(), GraphLook, ALIGN, ARROW_NAMES, AT_ICONS, AT_NAMES, BASE_PRESETS, BIG_ARROWS (+62 more)

### Community 79 - "toolbar.ts"
Cohesion: 0.07
Nodes (33): insertBlock(), InsertOptions, toggleLinePrefix(), wrapSelection(), LIST_STYLES, addPlaceholders, Placeholder, besideSchema() (+25 more)

### Community 82 - "sheet.ts"
Cohesion: 0.08
Nodes (54): OdeFunction, ExactFunction, Eigenvalue, Lin, LinearValue, NUMERICAL, bracketParts(), BRACKETS (+46 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.20
Nodes (6): centerOf(), clickOn(), ffmpeg, SCENES, SIZE, work

### Community 90 - "Abbonamenti"
Cohesion: 0.14
Nodes (14): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+6 more)

### Community 91 - "explainPanel.ts"
Cohesion: 0.12
Nodes (19): Explanation, REPLY_TOKENS, LocalAbort, ChatMessage, Settings, AI_NEWS_TITLE, AI_WORKING_TITLE, aiActivity (+11 more)

### Community 92 - "Costi"
Cohesion: 0.21
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 96 - "account-test.mjs"
Cohesion: 0.12
Nodes (10): @electric-sql/pglite, device(), login(), newContext, waitFor(), b64(), CODE, GOOGLE_CODE (+2 more)

### Community 97 - "BoardStore"
Cohesion: 0.12
Nodes (4): BoardStore, MemoryBoards, backup(), boardsFor()

### Community 98 - "ink.ts"
Cohesion: 0.09
Nodes (22): perfect-freehand, loadPrefs(), Prefs, BOARD_PALETTES, BoardPalette, BoardTheme, highlightName(), inkName() (+14 more)

### Community 100 - "logo.ts"
Cohesion: 0.39
Nodes (5): BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark()

### Community 101 - "toLatex"
Cohesion: 0.13
Nodes (30): areaFor(), multipleLabel(), names(), STUDY_GRAPH, studyItems(), ACCENT_COMMANDS, COMPLEX_FUNCTIONS, diffLatex() (+22 more)

### Community 102 - ".int"
Cohesion: 0.11
Nodes (8): characteristicPolynomial(), Field, formatPolynomial(), interpolate(), polynomialIn(), parametricRows(), substitute(), R()

### Community 103 - "formatNumber"
Cohesion: 0.17
Nodes (21): exponentialForm(), fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), formatNumber() (+13 more)

### Community 104 - "suggestions.ts"
Cohesion: 0.20
Nodes (5): templateInsertion(), EditorMathContext, expand(), preferredIndex(), SuggestionController

### Community 105 - "plan.ts"
Cohesion: 0.18
Nodes (16): NO_TABLE, cellText(), columnRole(), columnsOf(), durationUnit(), isNumber(), isPlanRange(), MAX_ACTIVITIES (+8 more)

### Community 106 - "escapeHtml"
Cohesion: 0.23
Nodes (14): valueNode(), texHtml(), toolButton(), checkHtml(), checkTitle(), cache, cleanKatexError(), escapeHtml() (+6 more)

### Community 107 - "localModels.ts"
Cohesion: 0.11
Nodes (25): @mlc-ai/web-llm, chat(), GlifoError, Gpu, load(), post(), remove(), scope (+17 more)

### Community 108 - "xlsx.ts"
Cohesion: 0.09
Nodes (44): readNumber(), readUnsigned(), sameFormat(), BinOp, COMPARE, ERRORS_BY_LENGTH, formulaBody(), formulaRefs() (+36 more)

### Community 110 - "siteUpdate.ts"
Cohesion: 0.20
Nodes (14): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, loadPart() (+6 more)

### Community 113 - "schema/shapes.ts"
Cohesion: 0.08
Nodes (17): @maxgraph/core, ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape (+9 more)

### Community 116 - "Il database degli account (Supabase)"
Cohesion: 0.17
Nodes (11): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Il trasloco su glifo.page (ottobre 2026), Nell'app (+3 more)

### Community 117 - "Commenti di chi prova Glifo"
Cohesion: 0.14
Nodes (13): Promemoria per lo studente, Account: i propri appunti su ogni dispositivo, anche da condividere, Commenti di chi prova Glifo, Idee per il futuro, In programma, La lavagna: idee in più, Più avanti, Schemi: idee in più (+5 more)

### Community 119 - "conics.ts"
Cohesion: 0.18
Nodes (29): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+21 more)

### Community 120 - ".renderFormat"
Cohesion: 0.18
Nodes (8): alignBoxes(), Alignment, Box, distributeBoxes(), Position, edgeTextAt(), withTextAt(), TextAt

### Community 121 - "files.ts"
Cohesion: 0.16
Nodes (18): inClaudeViewer(), feedbackButton, openComments(), canWriteFilesDirectly(), downloadBlob(), downloadText(), fileNameFor(), FsWindow (+10 more)

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "AiPanel"
Cohesion: 0.32
Nodes (4): NoteSubject, AiPanel, graphLabel(), texInline()

### Community 124 - "Sheet"
Cohesion: 0.08
Nodes (28): Definition, Line, ExactComplexScope, Ode, withWorkLimit(), FiniteContext, FormattedResult, differentialRequest (+20 more)

### Community 125 - "sql.ts"
Cohesion: 0.17
Nodes (18): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+10 more)

### Community 126 - "schemaTools.test.ts"
Cohesion: 0.20
Nodes (16): laneOf(), cellHtml(), labelHtml(), lanesHtml(), plainHtml(), tableHtml(), fieldLine(), insideLanes() (+8 more)

### Community 127 - "spiegami-qwen.mjs"
Cohesion: 0.29
Nodes (4): vite, minutes, postMessage(), started

### Community 128 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 129 - "graph/file.ts"
Cohesion: 0.09
Nodes (42): FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsFromFile(), OPEN, swatchSvg() (+34 more)

### Community 131 - "render/lists.ts"
Cohesion: 0.38
Nodes (10): bulletGroup(), sameList(), alignInside(), asciiTrim(), findMarker(), isOrdered(), listAttrs(), listRule() (+2 more)

### Community 132 - "linsys.ts"
Cohesion: 0.07
Nodes (70): decimalSeparator(), Digits, FormatOptions, formatRational(), fromNumber(), fromRational(), SUPERSCRIPT, writeDigits() (+62 more)

### Community 136 - "Scope"
Cohesion: 0.36
Nodes (8): FieldContext, fourierItems(), isFourierLine(), Scope, partialSum(), LinearScope, SolveScope, SymbolScope

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 139 - "Dove sono le cose"
Cohesion: 0.10
Nodes (34): Dove sono le cose, Glifo – architettura, answerFollowUp(), chatContext, chatSystemPrompt(), checkTopicSteps(), explainTopic, explanationText() (+26 more)

### Community 140 - "Glifo – note per Claude"
Cohesion: 0.25
Nodes (8): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Regole, sqlite()

### Community 141 - "grafo-html.mjs"
Cohesion: 0.17
Nodes (5): graphFile, names, namesFile, root, PNG_ICONS

### Community 143 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 144 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 145 - "I modelli e le chiavi API"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), In prova sul ramo `prova` (7 ottobre 2026): Qwen3 nel browser per «Spiegami», Le idee dello studente (5 ottobre 2026)

### Community 158 - "editor/editor.ts"
Cohesion: 0.05
Nodes (48): description, name, private, type, version, @codemirror/autocomplete, @codemirror/commands, @codemirror/language-data (+40 more)

## Knowledge Gaps
- **692 isolated node(s):** `Oggi: tutto gratis, tranne il dominio`, `Gratis anche quando Glifo sarà aperto a tutti`, `Da attivare solo quando lo dice lo studente`, `Quando lo studente dice di cominciare`, `Attivato` (+687 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 969 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **35 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `touchlog.ts`, `Parser`, `main.ts`, `compile`, `spec.ts`, `parse.ts`, `primitive.ts`, `graph/preview.ts`, `explain.ts`, `spreadsheet/format.ts`, `svg.ts`, `SchemaEditor`, `Board`, `SheetEditor`, `numerical.ts`, `arithmetic.ts`, `topics.ts`, `schema/file.ts`, `MathError`, `assistant.ts`, `Rational`, `toNode`, `gantt.ts`, `logic.ts`, `graph.ts`, `complex.ts`, `namesIn`, `board.ts`, `page.ts`, `NotesStore`, `several.ts`, `study.ts`, `functions.ts`, `finite.ts`, `view3d.ts`, `distributions.ts`, `board/shapes.ts`, `markdown.ts`, `SidePanel`, `.onMove`, `feedback.ts`, `dialogs.ts`, `ui/preview.ts`, `strokes.ts`, `src/relocation.ts`, `num`, `h`, `vitest`, `calcResults.ts`, `spreadsheet/editor.ts`, `blockMove.ts`, `smoke-test.mjs`, `MarkdownEditor`, `symbolic.ts`, `sidePanel.ts`, `toolbar.ts`, `sheet.ts`, `explainPanel.ts`, `BoardStore`, `ink.ts`, `formatNumber`, `plan.ts`, `escapeHtml`, `localModels.ts`, `xlsx.ts`, `siteUpdate.ts`, `schema/shapes.ts`, `ExplainPanel`, `conics.ts`, `files.ts`, `AiPanel`, `Sheet`, `schemaTools.test.ts`, `graph/file.ts`, `linsys.ts`, `Scope`, `ExplainChat`?**
  _High betweenness centrality (0.179) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `touchlog.ts`, `graph/file.ts`, `main.ts`, `compile`, `parse.ts`, `primitive.ts`, `explain.ts`, `spreadsheet/format.ts`, `Dove sono le cose`, `svg.ts`, `editor/lists.ts`, `arithmetic.ts`, `schema/file.ts`, `store.ts`, `MathError`, `assistant.ts`, `Rational`, `editor/editor.ts`, `gantt.ts`, `search.ts`, `spell.test.ts`, `board.ts`, `resize.ts`, `page.ts`, `NotesStore`, `view3d.ts`, `FoldersStore`, `distributions.ts`, `board/shapes.ts`, `markdown.ts`, `feedback.ts`, `dialogs.ts`, `ui/preview.ts`, `strokes.ts`, `src/relocation.ts`, `h`, `spreadsheet/editor.ts`, `blockMove.ts`, `sidePanel.ts`, `toolbar.ts`, `explainPanel.ts`, `ink.ts`, `logo.ts`, `plan.ts`, `localModels.ts`, `siteUpdate.ts`, `Sheet`, `sql.ts`, `schemaTools.test.ts`?**
  _High betweenness centrality (0.115) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `main.ts`, `graph/preview.ts`, `Dove sono le cose`, `SchemaEditor`, `Board`, `SheetEditor`, `ExplainChat`, `gantt.ts`, `spell.test.ts`, `graph.ts`, `board.ts`, `resize.ts`, `page.ts`, `SidePanel`, `feedback.ts`, `dialogs.ts`, `ui/preview.ts`, `src/relocation.ts`, `spreadsheet/editor.ts`, `sidePanel.ts`, `schema/editor.ts`, `toolbar.ts`, `explainPanel.ts`, `ink.ts`, `escapeHtml`, `ExplainPanel`, `.renderFormat`, `AiPanel`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **Are the 271 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `adoptGuestNotes()`) actually correct?**
  _`Dove sono le cose` has 271 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Oggi: tutto gratis, tranne il dominio`, `Gratis anche quando Glifo sarà aperto a tutti`, `Da attivare solo quando lo dice lo studente` to the rest of the system?**
  _692 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `touchlog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08653061224489796 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.03690322580645161 - nodes in this community are weakly interconnected._