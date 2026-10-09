# Graph Report - matherdown  (2026-10-09)

## Corpus Check
- 320 files · ~611,894 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5098 nodes · 18402 edges · 145 communities (113 shown, 32 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 590 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e72adfe3`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- touchlog.ts
- parse.ts
- main.ts
- compile
- sync.ts
- spec.ts
- linsys.ts
- primitive.ts
- graph/preview.ts
- Dove sono le cose
- plan.ts
- editor/lists.ts
- svg.ts
- schemaTools.test.ts
- SchemaEditor
- Board
- SheetEditor
- editor/editor.ts
- numerical.ts
- Rational
- index.ts
- engine.ts
- topics.ts
- schema/preview.ts
- store.ts
- MathError
- exact.ts
- assistant.ts
- laplace.ts
- tutorial.ts
- gantt.ts
- math/calculus.ts
- search.ts
- spell.test.ts
- logic.ts
- nodeLook
- complex.ts
- namesIn
- captcha.ts
- resize.ts
- several.ts
- study.ts
- functions.ts
- finite.ts
- NotesStore
- view3d.ts
- math/format.ts
- board/shapes.ts
- sidePanel.ts
- SidePanel
- .constructor
- supabase.ts
- aiPanel.test.ts
- ui/preview.ts
- 20261004091555_note_condivise.sql
- board.ts
- src/relocation.ts
- num
- Glifo
- dependencies
- h
- vitest
- explainPanel.ts
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
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- distributions.ts
- session-start.sh
- .claude/CLAUDE.md
- FoldersStore
- tutorial.mjs
- Abbonamenti
- Costi
- supabase-stub.sql
- account-test.mjs
- statsShown.ts
- limits.ts
- page.ts
- sheet.ts
- Field
- siteUpdate.ts
- ink.ts
- localModels.ts
- xlsx.ts
- touchLog
- graph.ts
- Sincronizzazione
- Glifo – note per Claude
- ExplainPanel
- conics.ts
- latex.ts
- files.ts
- Le spiegazioni, come funzionano
- strokes.ts
- Sheet
- sql.ts
- markdown.ts
- grafo-html.mjs
- createFakeSupabase
- graph/file.ts
- schemaBlocks.ts
- deploy.test.ts
- Parser
- spiegami-qwen.mjs
- 20261008130026_commenti.sql
- boardTouchLog.test.ts
- scripts

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
- `Dove sono le cose` --references--> `WidgetKind`  [INFERRED]
  ARCHITETTURA.md → src/editor/schemaBlocks.ts
- `Dove sono le cose` --references--> `ConicElements`  [INFERRED]
  ARCHITETTURA.md → src/math/conics.ts
- `Dove sono le cose` --references--> `texts()`  [INFERRED]
  ARCHITETTURA.md → tests/boardTouchLog.test.ts
- `Funzionalità` --references--> `k()`  [INFERRED]
  README.md → src/math/numerical.ts
- `Come viene pubblicata` --references--> `dist()`  [INFERRED]
  README.md → src/board/shapes.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (145 total, 32 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.14
Nodes (16): at(), browserStore, clip(), KINDS, LOG_KEY, Moves, MOVES_MAX, pointerDetail() (+8 more)

### Community 1 - "parse.ts"
Cohesion: 0.07
Nodes (41): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe(), differentialInFraction() (+33 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (127): WidgetBlock, graphsForFile(), account, ACCOUNT_OFF, active, aiShown(), aiToggle, aiWork (+119 more)

### Community 3 - "compile"
Cohesion: 0.05
Nodes (79): integralRegion, LayeredSolid, areaFor(), constantValue(), define(), close(), Definite, definiteIntegral() (+71 more)

### Community 4 - "sync.ts"
Cohesion: 0.05
Nodes (40): @electric-sql/pglite, AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow (+32 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (93): conicItems(), isConicLine(), quadricEquation(), fourierItems(), isFourierLine(), isTestLine(), testItems(), constantIntegrand() (+85 more)

### Community 6 - "linsys.ts"
Cohesion: 0.09
Nodes (53): Scope, nameLatex(), FLOAT, LinearScope, polynomialIn(), rref(), choices(), gcd() (+45 more)

### Community 7 - "primitive.ts"
Cohesion: 0.16
Nodes (63): atIntegers(), degree(), algebraic(), bigGcd(), byParts(), candidates(), canon(), combineLogs() (+55 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (44): FIGURE_PALETTE, addLabel(), boxes, cameras, complexCoord(), coord(), drawings, drawnViews (+36 more)

### Community 9 - "Dove sono le cose"
Cohesion: 0.06
Nodes (70): Dove sono le cose, Glifo – architettura, allNames(), answerFollowUp(), bareResult(), CHAT_SUBJECT, chatContext, ChatFn (+62 more)

### Community 10 - "plan.ts"
Cohesion: 0.09
Nodes (42): at(), breakEven(), dataLine(), dataRange(), Point, quantity(), tableItems(), textLabel() (+34 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.08
Nodes (67): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+59 more)

### Community 12 - "svg.ts"
Cohesion: 0.08
Nodes (57): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), dataWindow(), domainEdge() (+49 more)

### Community 13 - "schemaTools.test.ts"
Cohesion: 0.13
Nodes (17): alignBoxes(), Alignment, Box, distributeBoxes(), Position, textWidth(), crc32(), withDensity() (+9 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.10
Nodes (8): isLanes(), SchemaEditor, withLaneContents(), cellText(), edgeLook(), readSchema(), insideLanes(), serializeSchema()

### Community 15 - "Board"
Cohesion: 0.10
Nodes (9): Board, penErases(), highlightName(), inkName(), shapeSvg(), shapePoints(), BoardChange, Box (+1 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (6): rangeLabel(), SheetEditor, serializeSheet(), CellRange, clearRange(), cloneSheet()

### Community 17 - "editor/editor.ts"
Cohesion: 0.06
Nodes (45): @codemirror/lang-markdown, @codemirror/language, @codemirror/state, @codemirror/view, closeMathBlockOnEnter(), highlight, italianPhrases, tabOutOfMath() (+37 more)

### Community 18 - "numerical.ts"
Cohesion: 0.10
Nodes (51): isNumericalLine(), numericalItems(), FormatOptions, bisection(), cholesky(), condition(), derivative(), exactPolynomial() (+43 more)

### Community 19 - "Rational"
Cohesion: 0.06
Nodes (83): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+75 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (41): b, bigops, c, calculus, fn, fr, fractions, functions (+33 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "topics.ts"
Cohesion: 0.20
Nodes (20): ATTRIBUTES, count(), cut(), ER_SHAPES, fieldText(), fitLines(), flowOrder(), formulaText() (+12 more)

### Community 23 - "schema/preview.ts"
Cohesion: 0.11
Nodes (23): svg(), SchemaEditorOptions, base64(), hide(), OPEN, schemasForFile(), schemasFromFile(), unhide() (+15 more)

### Community 24 - "store.ts"
Cohesion: 0.06
Nodes (17): BoardBackend, BoardData, BoardStore, done(), fromRecord(), IdbBoards, MemoryBoards, ofNote() (+9 more)

### Community 25 - "MathError"
Cohesion: 0.12
Nodes (58): MathError, formatNumber(), angleBetween(), asMatrix(), basisOf(), circleText(), complexText(), cross() (+50 more)

### Community 26 - "exact.ts"
Cohesion: 0.17
Nodes (14): bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactFunction, ExactRandom, exactRoot(), ExactUnavailable (+6 more)

### Community 27 - "assistant.ts"
Cohesion: 0.15
Nodes (20): AiAnswer, AiError, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible(), askThroughHost(), checkShape() (+12 more)

### Community 28 - "laplace.ts"
Cohesion: 0.11
Nodes (47): factoredPolynomial(), factorsOf(), integerPoly(), beyondPoles(), compiled(), E, exp(), fractionShown() (+39 more)

### Community 29 - "tutorial.ts"
Cohesion: 0.18
Nodes (11): HINT_MS, markTutorialSeen(), openTutorial(), show(), richText(), showTutorialHint(), close(), TUTORIAL_PAGES (+3 more)

### Community 30 - "gantt.ts"
Cohesion: 0.06
Nodes (72): amount(), barColor(), crossings(), dateText(), dayOf(), fitText(), GanttOptions, ganttSvg() (+64 more)

### Community 31 - "math/calculus.ts"
Cohesion: 0.27
Nodes (14): argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot(), fieldOn(), numericPartials() (+6 more)

### Community 32 - "search.ts"
Cohesion: 0.17
Nodes (24): preferredIndex(), editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase() (+16 more)

### Community 33 - "spell.test.ts"
Cohesion: 0.08
Nodes (25): misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt(), openAt() (+17 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "nodeLook"
Cohesion: 0.19
Nodes (12): laneOf(), fieldInput(), createEdgeCell(), edgeStyle(), isNodeLook(), nodeLook(), nodeStyle(), restyle() (+4 more)

### Community 36 - "complex.ts"
Cohesion: 0.05
Nodes (66): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexLine(), isComplexValue() (+58 more)

### Community 37 - "namesIn"
Cohesion: 0.12
Nodes (40): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+32 more)

### Community 38 - "captcha.ts"
Cohesion: 0.10
Nodes (20): captchaToken(), loadTurnstile(), Turnstile, TURNSTILE_SCRIPT, Window, TURNSTILE_SITE_KEY, accountFailure(), Accesso con Google (+12 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 42 - "several.ts"
Cohesion: 0.09
Nodes (54): criticalLine(), named(), severalItems(), surface(), Piece, severalLimit, Condition, Family (+46 more)

### Community 43 - "study.ts"
Cohesion: 0.14
Nodes (35): names(), STUDY_GRAPH, studyItems(), limit(), Asymptote, compiled(), cutsOf(), defined() (+27 more)

### Community 44 - "functions.ts"
Cohesion: 0.08
Nodes (67): ChartTable, CellResult, EMPTY, number(), addFormat(), decimalsOf(), divFormat(), Format (+59 more)

### Community 45 - "finite.ts"
Cohesion: 0.17
Nodes (27): countOf(), elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError, FiniteResult (+19 more)

### Community 46 - "NotesStore"
Cohesion: 0.06
Nodes (34): Deletion, DeletionLog, Folder, FOLDER_NAME_MAX, FolderGroup, groupByFolder(), loadClosedFolders(), RemoteFolder (+26 more)

### Community 47 - "view3d.ts"
Cohesion: 0.06
Nodes (85): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+77 more)

### Community 48 - "math/format.ts"
Cohesion: 0.12
Nodes (21): number(), classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX, Line, number() (+13 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.14
Nodes (34): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+26 more)

### Community 50 - "sidePanel.ts"
Cohesion: 0.14
Nodes (18): katex, AiResult, SuggestionItem, cache, TexRender, SearchResult, CATEGORIES, cardPreviewTex() (+10 more)

### Community 51 - "SidePanel"
Cohesion: 0.18
Nodes (7): cleanKatexError(), renderTex(), isConfidentAnswer(), symbolsInCategory(), displayCode(), preventFocusSteal(), SidePanel

### Community 52 - ".constructor"
Cohesion: 0.11
Nodes (5): BoardOptions, loadPrefs(), Prefs, sizeChoice(), SizeChoice

### Community 53 - "supabase.ts"
Cohesion: 0.12
Nodes (33): @supabase/supabase-js, AUTH_STORAGE_KEY, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken() (+25 more)

### Community 54 - "aiPanel.test.ts"
Cohesion: 0.07
Nodes (40): FollowUp, REPLY_TOKENS, definedName(), formulaTopic(), graphTopic(), numberText(), studyOf(), theoremTopic() (+32 more)

### Community 55 - "ui/preview.ts"
Cohesion: 0.10
Nodes (14): GraphLabels, renameGraphScope(), renameScopeKeys(), BlockKind, hydrateSheets(), BLOCK_NAMES, blockKindOf(), MOVABLE_BLOCKS (+6 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "board.ts"
Cohesion: 0.06
Nodes (36): Action, ACTION_NAMES, clampZoom(), coalesced(), DOT_SIZES, DrawAction, EraseAction, EraserMode (+28 more)

### Community 58 - "src/relocation.ts"
Cohesion: 0.05
Nodes (69): accountSpace(), adoptGuestNotes(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf(), setCurrentAccount() (+61 more)

### Community 59 - "num"
Cohesion: 0.07
Nodes (104): absOf(), oneFraction(), splitAbs(), withoutAbs(), linearIn(), oneFraction(), sqrtEx(), polyEx() (+96 more)

### Community 60 - "Glifo"
Cohesion: 0.13
Nodes (15): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Commenti, Compatibilità con VS Code, Condividere una nota con un link (+7 more)

### Community 61 - "dependencies"
Cohesion: 0.05
Nodes (36): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+28 more)

### Community 62 - "h"
Cohesion: 0.05
Nodes (76): SUPABASE_KEY, SUPABASE_URL, SyncStatus, board, viewSwitch, openSignedOut(), printButton(), ShareDialogDeps (+68 more)

### Community 63 - "vitest"
Cohesion: 0.05
Nodes (42): vitest, staticGraphSvg(), chooseWindow(), containing(), chooseBox(), parseGraph(), DrawOptions, graphSvg() (+34 more)

### Community 64 - "explainPanel.ts"
Cohesion: 0.06
Nodes (48): explainTarget, Explanation, acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult, calcResults() (+40 more)

### Community 65 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 66 - "spreadsheet/editor.ts"
Cohesion: 0.08
Nodes (59): sheetSummary(), currentCall(), Editing, MenuEntry, Move, openSheetEditor(), PATHS, SheetEditorOptions (+51 more)

### Community 67 - "blockMove.ts"
Cohesion: 0.10
Nodes (35): @codemirror/commands, blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove, blockPlace() (+27 more)

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
Nodes (24): End, Family, ExactScope, rejection(), ALL, complement(), distributionOf(), EventContext (+16 more)

### Community 73 - "MarkdownEditor"
Cohesion: 0.10
Nodes (17): EditorCallbacks, MarkdownEditor, insertBlock(), wrapSelection(), Action, createToolbar(), insertCode(), insertLink() (+9 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (66): fnLabel(), primitive(), verified(), linearCells(), atValues(), cancelLinear(), Converter, coordinates() (+58 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Errore o imprevisto → nel dettaglio, 3. Serve una decisione → frasi complete, 4. Fine del compito → un solo riepilogo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.04
Nodes (63): schemaSummary(), ALIGN, ARROW_NAMES, AT_ICONS, AT_NAMES, BASE_PRESETS, BIG_ARROWS, DB_PRESETS (+55 more)

### Community 79 - "distributions.ts"
Cohesion: 0.07
Nodes (62): addExp(), choose(), continuousQuantile(), discreteQuantile(), Distribution, exactIntervalProbability(), expSum, expSumValue() (+54 more)

### Community 82 - "FoldersStore"
Cohesion: 0.09
Nodes (13): cleanFolderName(), FoldersStore, sameName(), BackupNote, backupNotes(), restoreBackup(), RestoreBoards, Restored (+5 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.20
Nodes (6): centerOf(), clickOn(), ffmpeg, SCENES, SIZE, work

### Community 90 - "Abbonamenti"
Cohesion: 0.08
Nodes (24): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Deciso (5 ottobre 2026), Deciso (5 ottobre 2026) (+16 more)

### Community 92 - "Costi"
Cohesion: 0.21
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 96 - "account-test.mjs"
Cohesion: 0.12
Nodes (10): device(), login(), newContext, waitFor(), b64(), CAPTCHA_TOKEN, CODE, GOOGLE_CODE (+2 more)

### Community 97 - "statsShown.ts"
Cohesion: 0.17
Nodes (31): check(), correlation(), count(), covariance(), Data, dataStatistic(), deviation(), fail() (+23 more)

### Community 98 - "limits.ts"
Cohesion: 0.19
Nodes (18): exponentialForm(), fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), alternating() (+10 more)

### Community 100 - "page.ts"
Cohesion: 0.06
Nodes (47): accountDataFile(), currentAccount(), PullResult, openShareDialog(), changeAccess(), changeCopy(), copy(), refreshChanged() (+39 more)

### Community 101 - "sheet.ts"
Cohesion: 0.06
Nodes (53): formatRational(), characteristicPolynomial(), Eigenvalue, eigenvectors(), EXACT, formatPolynomial(), kernel(), Lin (+45 more)

### Community 102 - "Field"
Cohesion: 0.13
Nodes (4): eigenvalues(), Field, interpolate(), interpolateFloat()

### Community 103 - "siteUpdate.ts"
Cohesion: 0.19
Nodes (14): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, siteChanged() (+6 more)

### Community 106 - "ink.ts"
Cohesion: 0.16
Nodes (14): BOARD_PALETTES, BoardPalette, BoardTheme, mid(), outlineSvg(), PEN_SIZE, strokeOptions(), strokeOutline() (+6 more)

### Community 107 - "localModels.ts"
Cohesion: 0.10
Nodes (26): chat(), GlifoError, Gpu, load(), post(), remove(), scope, shaderF16() (+18 more)

### Community 108 - "xlsx.ts"
Cohesion: 0.06
Nodes (58): RFC-4180, fflate, csvDelimiter(), csvToSheet(), field(), italian(), parseCsv(), sheetToCsv() (+50 more)

### Community 110 - "touchLog"
Cohesion: 0.31
Nodes (3): movesLine(), seconds(), touchLog

### Community 113 - "graph.ts"
Cohesion: 0.06
Nodes (39): @maxgraph/core, AT_X, cellHtml(), COMPASS, createGraph(), drawSchema(), insertSchema(), isEdgeLook() (+31 more)

### Community 116 - "Sincronizzazione"
Cohesion: 0.50
Nodes (3): Sincronizzazione, `sync_pull({ since })`: scarica le novità, `sync_push({ changes })`: manda le modifiche

### Community 117 - "Glifo – note per Claude"
Cohesion: 0.11
Nodes (17): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole (+9 more)

### Community 118 - "ExplainPanel"
Cohesion: 0.14
Nodes (6): modelName(), ExplainChat, ExplainPanel, preventFocusSteal(), formulasSummary(), setup()

### Community 119 - "conics.ts"
Cohesion: 0.18
Nodes (29): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+21 more)

### Community 120 - "latex.ts"
Cohesion: 0.12
Nodes (23): ACCENT_COMMANDS, COMPLEX_FUNCTIONS, diffLatex(), DISTRIBUTION_LATEX, distributionLatex(), domainLatex(), fnLatex(), fnName() (+15 more)

### Community 121 - "files.ts"
Cohesion: 0.11
Nodes (26): cache, capability(), ClaudeRuntime, hostDownloads, HostError, inClaudeViewer(), ModelTier, runtime() (+18 more)

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "strokes.ts"
Cohesion: 0.09
Nodes (38): centerOn(), copyStrokes(), cross(), handleScale(), IDENTITY, insideLasso(), keepInside(), LASSO_SHARE (+30 more)

### Community 124 - "Sheet"
Cohesion: 0.08
Nodes (27): ExactComplexScope, formatGauss(), Ode, withWorkLimit(), Elem, FiniteContext, FormattedResult, Mat (+19 more)

### Community 125 - "sql.ts"
Cohesion: 0.17
Nodes (18): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+10 more)

### Community 126 - "markdown.ts"
Cohesion: 0.05
Nodes (56): description, name, private, type, version, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/language-data (+48 more)

### Community 127 - "grafo-html.mjs"
Cohesion: 0.17
Nodes (5): graphFile, names, namesFile, root, PNG_ICONS

### Community 128 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 129 - "graph/file.ts"
Cohesion: 0.10
Nodes (36): figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsFromFile(), hide(), OPEN, swatchSvg() (+28 more)

### Community 131 - "schemaBlocks.ts"
Cohesion: 0.12
Nodes (16): toggleLinePrefix(), besideSchema(), BlockWidget, findWidgetBlocks(), guardBlocks(), KINDS, schemaBlockRanges(), schemaBlocks() (+8 more)

### Community 132 - "deploy.test.ts"
Cohesion: 0.28
Nodes (4): vite-plugin-pwa, accountOffMessage(), defineFor(), MAIN_BRANCH

### Community 136 - "spiegami-qwen.mjs"
Cohesion: 0.29
Nodes (4): vite, minutes, postMessage(), started

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 139 - "boardTouchLog.test.ts"
Cohesion: 0.20
Nodes (8): isSaved(), LOG_MAX_LINES, LogStore, SavedLog, clock(), memoryStore(), newLog(), texts()

### Community 143 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

## Knowledge Gaps
- **696 isolated node(s):** `1. Durante il lavoro → silenzio`, `2. Errore o imprevisto → nel dettaglio`, `3. Serve una decisione → frasi complete`, `4. Fine del compito → un solo riepilogo`, `Quando NON comprimere` (+691 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 975 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **32 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `touchlog.ts`, `graph/file.ts`, `main.ts`, `schemaBlocks.ts`, `parse.ts`, `spec.ts`, `linsys.ts`, `primitive.ts`, `graph/preview.ts`, `deploy.test.ts`, `plan.ts`, `boardTouchLog.test.ts`, `svg.ts`, `schemaTools.test.ts`, `SchemaEditor`, `Board`, `SheetEditor`, `numerical.ts`, `Rational`, `topics.ts`, `store.ts`, `MathError`, `assistant.ts`, `tutorial.ts`, `gantt.ts`, `math/calculus.ts`, `spell.test.ts`, `logic.ts`, `nodeLook`, `complex.ts`, `namesIn`, `several.ts`, `study.ts`, `functions.ts`, `finite.ts`, `NotesStore`, `view3d.ts`, `math/format.ts`, `board/shapes.ts`, `sidePanel.ts`, `SidePanel`, `.constructor`, `supabase.ts`, `aiPanel.test.ts`, `ui/preview.ts`, `board.ts`, `src/relocation.ts`, `num`, `h`, `vitest`, `explainPanel.ts`, `spreadsheet/editor.ts`, `blockMove.ts`, `smoke-test.mjs`, `MarkdownEditor`, `symbolic.ts`, `distributions.ts`, `limits.ts`, `sheet.ts`, `siteUpdate.ts`, `localModels.ts`, `xlsx.ts`, `touchLog`, `graph.ts`, `ExplainPanel`, `conics.ts`, `files.ts`, `strokes.ts`, `Sheet`, `markdown.ts`?**
  _High betweenness centrality (0.180) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `touchlog.ts`, `parse.ts`, `main.ts`, `compile`, `sync.ts`, `deploy.test.ts`, `linsys.ts`, `schemaBlocks.ts`, `graph/file.ts`, `Dove sono le cose`, `plan.ts`, `boardTouchLog.test.ts`, `svg.ts`, `editor/lists.ts`, `schemaTools.test.ts`, `editor/editor.ts`, `schema/preview.ts`, `store.ts`, `assistant.ts`, `laplace.ts`, `tutorial.ts`, `gantt.ts`, `search.ts`, `spell.test.ts`, `captcha.ts`, `resize.ts`, `NotesStore`, `view3d.ts`, `board/shapes.ts`, `sidePanel.ts`, `supabase.ts`, `aiPanel.test.ts`, `ui/preview.ts`, `board.ts`, `src/relocation.ts`, `num`, `h`, `explainPanel.ts`, `spreadsheet/editor.ts`, `blockMove.ts`, `MarkdownEditor`, `distributions.ts`, `FoldersStore`, `page.ts`, `sheet.ts`, `siteUpdate.ts`, `ink.ts`, `localModels.ts`, `xlsx.ts`, `strokes.ts`, `Sheet`, `sql.ts`, `markdown.ts`?**
  _High betweenness centrality (0.114) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `main.ts`, `graph/preview.ts`, `schemaTools.test.ts`, `SchemaEditor`, `Board`, `SheetEditor`, `tutorial.ts`, `gantt.ts`, `spell.test.ts`, `nodeLook`, `resize.ts`, `NotesStore`, `sidePanel.ts`, `SidePanel`, `.constructor`, `aiPanel.test.ts`, `ui/preview.ts`, `board.ts`, `src/relocation.ts`, `explainPanel.ts`, `spreadsheet/editor.ts`, `MarkdownEditor`, `schema/editor.ts`, `page.ts`, `ExplainPanel`, `files.ts`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **Are the 271 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `adoptGuestNotes()`) actually correct?**
  _`Dove sono le cose` has 271 INFERRED edges - model-reasoned connections that need verification._
- **What connects `1. Durante il lavoro → silenzio`, `2. Errore o imprevisto → nel dettaglio`, `3. Serve una decisione → frasi complete` to the rest of the system?**
  _696 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `touchlog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._
- **Should `parse.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07333333333333333 - nodes in this community are weakly interconnected._