# Graph Report - matherdown  (2026-10-09)

## Corpus Check
- 317 files · ~609,101 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5079 nodes · 18370 edges · 144 communities (109 shown, 35 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 598 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `439aa1b6`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- touchlog.ts
- parse.ts
- main.ts
- compile
- sync.ts
- spec.ts
- parseGraph
- num
- graph/preview.ts
- Dove sono le cose
- markdown.ts
- editor/lists.ts
- svg.ts
- Stroke
- SchemaEditor
- Board
- SheetEditor
- editor/editor.ts
- numerical.ts
- arithmetic.ts
- index.ts
- client.ts
- topics.ts
- parseSchema
- store.ts
- MathError
- ui/preview.ts
- vitest
- .folderItem
- several.ts
- gantt.ts
- calcPlugin
- search.ts
- spell.test.ts
- logic.ts
- NotesStore
- complex.ts
- namesIn
- view3d.ts
- resize.ts
- sheet.ts
- schemaBlocks.ts
- laplace.ts
- study.ts
- functions.ts
- finite.ts
- engine.ts
- openShareDialog
- probability.ts
- board/shapes.ts
- schemaTools.test.ts
- sidePanel.ts
- Pt
- feedback.ts
- .renderFormat
- Preview
- 20261004091555_note_condivise.sql
- strokes.ts
- src/relocation.ts
- odesolve.ts
- plan.ts
- dependencies
- h
- inference.ts
- touchLog
- Piano per piano
- spreadsheet/editor.ts
- blockMove.ts
- smoke-test.mjs
- Benvenuto in Glifo
- compilerOptions
- relocation-test.mjs
- boardTouchLog.test.ts
- MarkdownEditor
- symbolic.ts
- SheetEvaluator
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- BoardOptions
- session-start.sh
- .claude/CLAUDE.md
- blockMoveEditor.test.ts
- tutorial.mjs
- Abbonamenti
- spiegami-qwen.mjs
- Costi
- supabase-stub.sql
- account-test.mjs
- SlotWidget
- board.ts
- BlockMove
- logo.ts
- page.ts
- files.ts
- La lavagna
- explainPanel.ts
- xlsx.ts
- aiPanel.test.ts
- graph.ts
- spreadsheet/format.ts
- Glifo – note per Claude
- ExplainPanel
- Rational
- siteUpdate.ts
- Le spiegazioni, come funzionano
- BoardStore
- Sheet
- sql.ts
- severalGraph.ts
- createFakeSupabase
- graph/file.ts
- linsys.ts
- Parser
- 20261008130026_commenti.sql
- package.json

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 280 edges
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
- `Dove sono le cose` --references--> `WidgetKind`  [INFERRED]
  ARCHITETTURA.md → src/editor/schemaBlocks.ts
- `Dove sono le cose` --references--> `ConicElements`  [INFERRED]
  ARCHITETTURA.md → src/math/conics.ts
- `Dove sono le cose` --references--> `texts()`  [INFERRED]
  ARCHITETTURA.md → tests/boardTouchLog.test.ts
- `Come viene pubblicata` --references--> `dist()`  [INFERRED]
  README.md → src/board/shapes.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (144 total, 35 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.15
Nodes (16): at(), browserStore, clip(), KINDS, LOG_KEY, Moves, MOVES_MAX, pointerDetail() (+8 more)

### Community 1 - "parse.ts"
Cohesion: 0.07
Nodes (42): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe(), differentialInFraction() (+34 more)

### Community 2 - "main.ts"
Cohesion: 0.03
Nodes (130): WidgetBlock, graphsForFile(), graphsFromFile(), hide(), unhide(), remapGraphLines(), remapLineKeys(), account (+122 more)

### Community 3 - "compile"
Cohesion: 0.05
Nodes (76): argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot(), fieldOn(), numericPartials() (+68 more)

### Community 4 - "sync.ts"
Cohesion: 0.05
Nodes (39): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+31 more)

### Community 5 - "spec.ts"
Cohesion: 0.03
Nodes (147): conicItems(), isConicLine(), quadricEquation(), fourierItems(), isFourierLine(), isComplexLine(), isNumericalLine(), numericalItems() (+139 more)

### Community 6 - "parseGraph"
Cohesion: 0.07
Nodes (34): staticGraphSvg(), chooseWindow(), specFor(), chooseBox(), parseGraph(), DrawOptions, graphSvg(), PALETTES (+26 more)

### Community 7 - "num"
Cohesion: 0.11
Nodes (101): atIntegers(), definite(), linearTrig(), oneFraction(), signsUp(), symbolicCoefficient(), withoutAbs(), exp() (+93 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (40): addLabel(), boxes, cameras, complexCoord(), containing(), coord(), drawings, drawnViews (+32 more)

### Community 9 - "Dove sono le cose"
Cohesion: 0.06
Nodes (71): Dove sono le cose, Glifo – architettura, allNames(), answerFollowUp(), bareResult(), CHAT_SUBJECT, chatContext, ChatFn (+63 more)

### Community 10 - "markdown.ts"
Cohesion: 0.16
Nodes (19): dataRange(), moveAttrs(), renderTexOrError(), renderTexWithResult(), configurePurify(), createMarkdownIt(), FORBIDDEN_TAGS, HLJS_LANGUAGES (+11 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.06
Nodes (76): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+68 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (56): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), dataWindow(), domainEdge() (+48 more)

### Community 13 - "Stroke"
Cohesion: 0.27
Nodes (5): EraseAction, Step, BoardChange, BoardData, Stroke

### Community 14 - "SchemaEditor"
Cohesion: 0.10
Nodes (4): isLanes(), SchemaEditor, withLaneContents(), serializeSchema()

### Community 15 - "Board"
Cohesion: 0.09
Nodes (6): Board, BoardTheme, highlightName(), inkName(), shapePoints(), Box

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (5): rangeLabel(), SheetEditor, clearRange(), cloneSheet(), setCell()

### Community 17 - "editor/editor.ts"
Cohesion: 0.04
Nodes (86): @codemirror/lang-markdown, @codemirror/language, @codemirror/state, @codemirror/view, @lezer/common, explainTarget, acceptCalcResult(), CalcCheck (+78 more)

### Community 18 - "numerical.ts"
Cohesion: 0.08
Nodes (63): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Commenti, Compatibilità con VS Code, Condividere una nota con un link (+55 more)

### Community 19 - "arithmetic.ts"
Cohesion: 0.10
Nodes (49): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+41 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (41): b, bigops, c, calculus, fn, fr, fractions, functions (+33 more)

### Community 21 - "client.ts"
Cohesion: 0.10
Nodes (14): Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download(), fetchDictionary() (+6 more)

### Community 22 - "topics.ts"
Cohesion: 0.10
Nodes (37): ATTRIBUTES, count(), cut(), ER_SHAPES, fieldText(), fitLines(), flowOrder(), formulaText() (+29 more)

### Community 23 - "parseSchema"
Cohesion: 0.12
Nodes (21): schemaSummary(), svg(), SchemaEditorOptions, hide(), OPEN, schemasForFile(), schemasFromFile(), unhide() (+13 more)

### Community 24 - "store.ts"
Cohesion: 0.11
Nodes (13): BoardBackend, done(), fromRecord(), IdbBoards, ofNote(), openBoardDatabase(), openDefault(), request() (+5 more)

### Community 25 - "MathError"
Cohesion: 0.10
Nodes (65): MathError, nameLabel(), UndefinedName, angleBetween(), asMatrix(), basisOf(), circleText(), cross() (+57 more)

### Community 26 - "ui/preview.ts"
Cohesion: 0.15
Nodes (19): renameGraphScope(), renameScopeKeys(), BlockKind, MoveDir, draw(), drawCached(), drawn, errorHtml() (+11 more)

### Community 27 - "vitest"
Cohesion: 0.06
Nodes (39): vitest, AiAnswer, AiError, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible(), askThroughHost() (+31 more)

### Community 28 - ".folderItem"
Cohesion: 0.23
Nodes (3): saveClosedFolders(), NotesPanel, NotesPanelDeps

### Community 29 - "several.ts"
Cohesion: 0.08
Nodes (61): absOf(), boundsOf(), close(), fourierProblem, fourierShown(), isTrig(), isZero(), numericCoefficients() (+53 more)

### Community 30 - "gantt.ts"
Cohesion: 0.06
Nodes (72): graphImagesFor(), amount(), barColor(), crossings(), dateText(), dayOf(), fitText(), GanttOptions (+64 more)

### Community 31 - "calcPlugin"
Cohesion: 0.19
Nodes (3): calcPlugin, CheckWidget, ResultWidget

### Community 32 - "search.ts"
Cohesion: 0.17
Nodes (24): editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex() (+16 more)

### Community 33 - "spell.test.ts"
Cohesion: 0.09
Nodes (22): misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt(), openAt() (+14 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "NotesStore"
Cohesion: 0.07
Nodes (28): Deletion, DeletionLog, Folder, FOLDER_NAME_MAX, FolderGroup, groupByFolder(), loadClosedFolders(), RemoteFolder (+20 more)

### Community 36 - "complex.ts"
Cohesion: 0.06
Nodes (65): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexValue(), isInequality() (+57 more)

### Community 37 - "namesIn"
Cohesion: 0.14
Nodes (35): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+27 more)

### Community 38 - "view3d.ts"
Cohesion: 0.06
Nodes (83): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+75 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "sheet.ts"
Cohesion: 0.05
Nodes (59): OdeFunction, characteristicPolynomial(), Eigenvalue, Field, formatPolynomial(), interpolate(), Lin, LinearValue (+51 more)

### Community 41 - "schemaBlocks.ts"
Cohesion: 0.12
Nodes (16): toggleLinePrefix(), LIST_STYLES, besideSchema(), BlockWidget, findWidgetBlocks(), guardBlocks(), KINDS, schemaBlockRanges() (+8 more)

### Community 42 - "laplace.ts"
Cohesion: 0.20
Nodes (20): factoredPolynomial(), beyondPoles(), compiled(), E, fractionShown(), HALF, inverseLaplaceShown(), laplaceEx() (+12 more)

### Community 43 - "study.ts"
Cohesion: 0.06
Nodes (79): numberText(), fracTex(), fracText(), nearFraction(), piMultiple(), surd(), close(), Definite (+71 more)

### Community 44 - "functions.ts"
Cohesion: 0.09
Nodes (58): EMPTY, number(), addFormat(), divFormat(), GENERAL, mulFormat(), withCents(), FormulaNode (+50 more)

### Community 45 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 46 - "engine.ts"
Cohesion: 0.17
Nodes (9): @farscrl/hunspell-wasm, capitalize(), COMMON_FIXES, ELISIONS, inGlossary(), lower(), SpellEngine, GLOSSARY (+1 more)

### Community 47 - "openShareDialog"
Cohesion: 0.19
Nodes (13): openShareDialog(), changeAccess(), changeCopy(), copy(), refreshChanged(), render(), run(), setStatus() (+5 more)

### Community 48 - "probability.ts"
Cohesion: 0.07
Nodes (59): addExp(), choose(), continuousQuantile(), discreteQuantile(), End, exactIntervalProbability(), expSumValue(), factorialBig() (+51 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.14
Nodes (34): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+26 more)

### Community 50 - "schemaTools.test.ts"
Cohesion: 0.14
Nodes (25): laneOf(), alignBoxes(), Alignment, Box, distributeBoxes(), Position, base64(), cellHtml() (+17 more)

### Community 51 - "sidePanel.ts"
Cohesion: 0.08
Nodes (30): AiResult, valueNode(), SuggestionItem, texHtml(), checkHtml(), checkTitle(), cache, cleanKatexError() (+22 more)

### Community 52 - "Pt"
Cohesion: 0.10
Nodes (15): clampZoom(), coalesced(), Finger, LassoAction, MoveAction, PanAction, PinchAction, pointsOf() (+7 more)

### Community 53 - "feedback.ts"
Cohesion: 0.08
Nodes (36): vite-plugin-pwa, accountOffMessage(), Site, commentDate(), commentItem(), COMMENTS_MAX, CommentsDeps, CommentsError (+28 more)

### Community 54 - ".renderFormat"
Cohesion: 0.16
Nodes (13): fieldInput(), textWidth(), cellText(), createEdgeCell(), edgeLook(), edgeStyle(), nodeLook(), nodeStyle() (+5 more)

### Community 55 - "Preview"
Cohesion: 0.14
Nodes (4): GraphLabels, hidden(), Preview, PreviewCallbacks

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "strokes.ts"
Cohesion: 0.10
Nodes (37): centerOn(), copyStrokes(), cross(), IDENTITY, insideLasso(), keepInside(), LASSO_SHARE, lassoed() (+29 more)

### Community 58 - "src/relocation.ts"
Cohesion: 0.06
Nodes (49): accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf() (+41 more)

### Community 59 - "odesolve.ts"
Cohesion: 0.08
Nodes (82): linearIn(), addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames() (+74 more)

### Community 60 - "plan.ts"
Cohesion: 0.15
Nodes (19): autoSum(), cellText(), columnRole(), columnsOf(), durationUnit(), isNumber(), isPlanRange(), MAX_ACTIVITIES (+11 more)

### Community 61 - "dependencies"
Cohesion: 0.04
Nodes (44): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+36 more)

### Community 62 - "h"
Cohesion: 0.06
Nodes (65): SyncStatus, inClaudeViewer(), board, viewSwitch, RelocationResult, openSignedOut(), printButton(), ShareDialogDeps (+57 more)

### Community 63 - "inference.ts"
Cohesion: 0.08
Nodes (44): isTestLine(), number(), testItems(), classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX (+36 more)

### Community 64 - "touchLog"
Cohesion: 0.29
Nodes (3): movesLine(), seconds(), touchLog

### Community 65 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 66 - "spreadsheet/editor.ts"
Cohesion: 0.07
Nodes (67): openSheet(), saveSheetBlock(), tablesNote(), chartFrom(), chartLines(), chartRange(), ChartTable, currentRegion() (+59 more)

### Community 67 - "blockMove.ts"
Cohesion: 0.22
Nodes (17): blank(), blockPlace(), closed(), closeIdx(), fenceClosed(), findBlock(), invisible(), markMoves() (+9 more)

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

### Community 72 - "boardTouchLog.test.ts"
Cohesion: 0.20
Nodes (8): isSaved(), LOG_MAX_LINES, LogStore, SavedLog, clock(), memoryStore(), newLog(), texts()

### Community 73 - "MarkdownEditor"
Cohesion: 0.07
Nodes (23): @codemirror/commands, EditorCallbacks, MarkdownEditor, insertBlock(), wrapSelection(), expand(), preferredIndex(), SuggestionController (+15 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (53): atValues(), Converter, coordinates(), decimalText(), definiteParts(), definiteValue(), degree(), denominatorPart() (+45 more)

### Community 75 - "SheetEvaluator"
Cohesion: 0.27
Nodes (5): sheetSummary(), evaluateSheet(), SheetEvaluator, readInput(), Ref

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.05
Nodes (59): ALIGN, ARROW_NAMES, AT_ICONS, AT_NAMES, BASE_PRESETS, BIG_ARROWS, DB_PRESETS, Direction (+51 more)

### Community 82 - "blockMoveEditor.test.ts"
Cohesion: 0.19
Nodes (16): blockMoved, blockMoves(), blockMoveTransaction(), LineMap, contentHash(), fenceName(), MOVABLE, MoveFailure (+8 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.12
Nodes (10): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+2 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.11
Nodes (19): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Deciso (5 ottobre 2026), Fonti (controllate il 4 ottobre 2026) (+11 more)

### Community 91 - "spiegami-qwen.mjs"
Cohesion: 0.29
Nodes (4): vite, minutes, postMessage(), started

### Community 92 - "Costi"
Cohesion: 0.21
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 96 - "account-test.mjs"
Cohesion: 0.13
Nodes (9): device(), login(), newContext, waitFor(), b64(), CODE, GOOGLE_CODE, ROOT (+1 more)

### Community 98 - "board.ts"
Cohesion: 0.07
Nodes (38): Action, ACTION_NAMES, DOT_SIZES, DrawAction, EraserMode, HANDLE_REACH, ICON, loadPrefs() (+30 more)

### Community 101 - "logo.ts"
Cohesion: 0.27
Nodes (6): PNG_ICONS, BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark()

### Community 102 - "page.ts"
Cohesion: 0.05
Nodes (66): @supabase/supabase-js, AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), accountError, appUrl(), call() (+58 more)

### Community 103 - "files.ts"
Cohesion: 0.12
Nodes (18): ganttWidth(), PlanView, GraphLook, canWriteFilesDirectly(), downloadBlob(), downloadText(), fileNameFor(), FsWindow (+10 more)

### Community 105 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 107 - "explainPanel.ts"
Cohesion: 0.07
Nodes (41): @mlc-ai/web-llm, Explanation, FollowUp, REPLY_TOKENS, chat(), GlifoError, Gpu, load() (+33 more)

### Community 108 - "xlsx.ts"
Cohesion: 0.10
Nodes (38): RFC-4180, fflate, csvDelimiter(), csvToSheet(), field(), italian(), parseCsv(), sheetToCsv() (+30 more)

### Community 110 - "aiPanel.test.ts"
Cohesion: 0.09
Nodes (24): definedName(), formulaTopic(), graphTopic(), studyOf(), theoremTopic(), NoteSubject, SubjectKind, AI_NEWS_TITLE (+16 more)

### Community 113 - "graph.ts"
Cohesion: 0.05
Nodes (36): @maxgraph/core, AT_X, COMPASS, createGraph(), drawSchema(), edgeTextAt(), insertSchema(), isEdgeLook() (+28 more)

### Community 116 - "spreadsheet/format.ts"
Cohesion: 0.15
Nodes (25): at(), breakEven(), Point, quantity(), tableItems(), textLabel(), chartData, NO_TABLE (+17 more)

### Community 117 - "Glifo – note per Claude"
Cohesion: 0.11
Nodes (17): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole (+9 more)

### Community 118 - "ExplainPanel"
Cohesion: 0.17
Nodes (3): ExplainChat, ExplainPanel, preventFocusSteal()

### Community 119 - "Rational"
Cohesion: 0.07
Nodes (49): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+41 more)

### Community 120 - "siteUpdate.ts"
Cohesion: 0.19
Nodes (14): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, siteChanged() (+6 more)

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "BoardStore"
Cohesion: 0.08
Nodes (14): BoardStore, MemoryBoards, backup(), signOutAccount(), BackupNote, backupNotes(), restoreBackup(), RestoreBoards (+6 more)

### Community 124 - "Sheet"
Cohesion: 0.09
Nodes (24): ExactComplexScope, Ode, withWorkLimit(), FiniteContext, FormattedResult, MathNode, chainOf(), close() (+16 more)

### Community 125 - "sql.ts"
Cohesion: 0.16
Nodes (19): @electric-sql/pglite, Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote() (+11 more)

### Community 126 - "severalGraph.ts"
Cohesion: 0.25
Nodes (14): FieldContext, criticalLine(), isSeveralLine(), named(), severalItems(), surface(), Scope, LinearScope (+6 more)

### Community 128 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 129 - "graph/file.ts"
Cohesion: 0.10
Nodes (33): FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), OPEN, swatchSvg(), titleBand(), ACCENTS (+25 more)

### Community 132 - "linsys.ts"
Cohesion: 0.06
Nodes (93): formatRational(), eigenvalues(), EXACT, FLOAT, interpolateFloat(), surdText(), choices(), exText() (+85 more)

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 158 - "package.json"
Cohesion: 0.07
Nodes (37): description, name, private, type, version, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/language-data (+29 more)

## Knowledge Gaps
- **693 isolated node(s):** `Deciso`, `Com'è andata la discussione`, `La proposta dello studente (4 ottobre 2026)`, `Il parere di Claude, in breve`, `Come si decide cosa far pagare` (+688 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 970 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **35 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `touchlog.ts`, `graph/file.ts`, `main.ts`, `compile`, `linsys.ts`, `spec.ts`, `parseGraph`, `num`, `graph/preview.ts`, `parse.ts`, `markdown.ts`, `svg.ts`, `SchemaEditor`, `Board`, `SheetEditor`, `editor/editor.ts`, `numerical.ts`, `arithmetic.ts`, `topics.ts`, `MathError`, `ui/preview.ts`, `vitest`, `several.ts`, `gantt.ts`, `logic.ts`, `NotesStore`, `complex.ts`, `namesIn`, `view3d.ts`, `sheet.ts`, `schemaBlocks.ts`, `study.ts`, `functions.ts`, `finite.ts`, `board/shapes.ts`, `schemaTools.test.ts`, `sidePanel.ts`, `Pt`, `feedback.ts`, `.renderFormat`, `Preview`, `strokes.ts`, `src/relocation.ts`, `odesolve.ts`, `plan.ts`, `h`, `inference.ts`, `touchLog`, `spreadsheet/editor.ts`, `blockMove.ts`, `smoke-test.mjs`, `boardTouchLog.test.ts`, `MarkdownEditor`, `symbolic.ts`, `SheetEvaluator`, `schema/editor.ts`, `blockMoveEditor.test.ts`, `board.ts`, `page.ts`, `files.ts`, `explainPanel.ts`, `xlsx.ts`, `aiPanel.test.ts`, `graph.ts`, `spreadsheet/format.ts`, `ExplainPanel`, `Rational`, `siteUpdate.ts`, `BoardStore`, `Sheet`, `severalGraph.ts`?**
  _High betweenness centrality (0.165) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `touchlog.ts`, `parse.ts`, `graph/file.ts`, `compile`, `sync.ts`, `spec.ts`, `parseGraph`, `linsys.ts`, `num`, `Dove sono le cose`, `markdown.ts`, `editor/lists.ts`, `svg.ts`, `editor/editor.ts`, `parseSchema`, `store.ts`, `MathError`, `ui/preview.ts`, `package.json`, `gantt.ts`, `search.ts`, `spell.test.ts`, `NotesStore`, `view3d.ts`, `resize.ts`, `schemaBlocks.ts`, `probability.ts`, `board/shapes.ts`, `schemaTools.test.ts`, `sidePanel.ts`, `feedback.ts`, `strokes.ts`, `src/relocation.ts`, `plan.ts`, `h`, `spreadsheet/editor.ts`, `boardTouchLog.test.ts`, `MarkdownEditor`, `blockMoveEditor.test.ts`, `board.ts`, `logo.ts`, `page.ts`, `explainPanel.ts`, `xlsx.ts`, `aiPanel.test.ts`, `siteUpdate.ts`, `BoardStore`, `Sheet`, `sql.ts`?**
  _High betweenness centrality (0.105) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `main.ts`, `graph/preview.ts`, `SchemaEditor`, `Board`, `SheetEditor`, `ui/preview.ts`, `.folderItem`, `gantt.ts`, `spell.test.ts`, `resize.ts`, `openShareDialog`, `sidePanel.ts`, `feedback.ts`, `.renderFormat`, `Preview`, `spreadsheet/editor.ts`, `MarkdownEditor`, `schema/editor.ts`, `board.ts`, `page.ts`, `files.ts`, `explainPanel.ts`, `aiPanel.test.ts`, `ExplainPanel`?**
  _High betweenness centrality (0.063) - this node is a cross-community bridge._
- **Are the 279 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `adoptGuestNotes()`) actually correct?**
  _`Dove sono le cose` has 279 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Deciso`, `Com'è andata la discussione`, `La proposta dello studente (4 ottobre 2026)` to the rest of the system?**
  _693 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `parse.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07414141414141415 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.03144912641315519 - nodes in this community are weakly interconnected._