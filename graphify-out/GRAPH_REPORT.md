# Graph Report - matherdown  (2026-10-09)

## Corpus Check
- 317 files · ~609,101 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5082 nodes · 18365 edges · 156 communities (118 shown, 38 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 590 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c8ba68fc`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- touchlog.ts
- parse.ts
- main.ts
- compile
- sync.ts
- spec.ts
- vitest
- num
- graph/preview.ts
- Dove sono le cose
- markdown.ts
- markers.ts
- svg.ts
- Stroke
- SchemaEditor
- Board
- SheetEditor
- graphNote.test.ts
- numerical.ts
- arithmetic.ts
- index.ts
- engine.ts
- topics.ts
- parseSchema
- IdbBoards
- MathError
- schema/preview.ts
- assistant.ts
- .folderItem
- toLatex
- gantt.ts
- editor/lists.ts
- search.ts
- spell.test.ts
- logic.ts
- NotesStore
- Rational
- namesIn
- view3d.ts
- resize.ts
- sheet.ts
- schemaBlocks.ts
- laplace.ts
- study.ts
- functions.ts
- latex.ts
- explainPanel.ts
- FoldersStore
- distributions.ts
- board/shapes.ts
- schemaTools.test.ts
- SidePanel
- Pt
- deploy.test.ts
- dom.ts
- Preview
- 20261004091555_note_condivise.sql
- strokes.ts
- dialogs.ts
- odesolve.ts
- plan.ts
- dependencies
- h
- statsGraph.ts
- probability.ts
- Piano per piano
- spreadsheet/editor.ts
- blockMove.ts
- smoke-test.mjs
- Benvenuto in Glifo
- compilerOptions
- relocation-test.mjs
- Field
- MarkdownEditor
- symbolic.ts
- sidePanel.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- toolbar.ts
- session-start.sh
- .claude/CLAUDE.md
- blockMove.test.ts
- tutorial.mjs
- Abbonamenti
- aiPanel.test.ts
- supabase-stub.sql
- account-test.mjs
- editor.test.ts
- board.ts
- explainSubjects.ts
- page.ts
- supabase.ts
- downloadText
- SuggestionController
- La lavagna
- grafo-html.mjs
- localModels.ts
- xlsx.ts
- aiPanel.ts
- graph.ts
- Il database degli account (Supabase)
- Più avanti
- ExplainPanel
- conics.ts
- toast
- host.ts
- Le spiegazioni, come funzionano
- BoardStore
- Sheet
- sql.ts
- ui/preview.ts
- devDependencies
- createFakeSupabase
- graph/file.ts
- PreviewCallbacks
- solve.ts
- Parser
- Glifo – note per Claude
- 20261008130026_commenti.sql
- scripts
- ExplainChat
- Costi
- ExplainEvents
- SheetModel
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
- `Dove sono le cose` --references--> `fakeLlmWorker()`  [INFERRED]
  ARCHITETTURA.md → scripts/smoke-test.mjs
- `Come viene pubblicata` --references--> `dist()`  [INFERRED]
  README.md → src/board/shapes.ts
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

## Communities (156 total, 38 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.09
Nodes (27): at(), browserStore, clip(), isSaved(), KINDS, LOG_KEY, LOG_MAX_LINES, LogStore (+19 more)

### Community 1 - "parse.ts"
Cohesion: 0.07
Nodes (41): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe(), differentialInFraction() (+33 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (111): inClaudeViewer(), account, ACCOUNT_OFF, accountButton, active, aiShown(), aiToggle, aiWork (+103 more)

### Community 3 - "compile"
Cohesion: 0.04
Nodes (98): conicItems(), integralRegion, LayeredSolid, areaFor(), constantValue(), isStraight(), isVectorName(), itemFor() (+90 more)

### Community 4 - "sync.ts"
Cohesion: 0.05
Nodes (40): @electric-sql/pglite, AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow (+32 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (96): isConicLine(), quadricEquation(), fourierItems(), isFourierLine(), isComplexLine(), onlyComplex(), isTestLine(), number() (+88 more)

### Community 6 - "vitest"
Cohesion: 0.07
Nodes (39): vitest, staticGraphSvg(), chooseWindow(), chooseBox(), GraphItem, parseGraph(), DrawOptions, PALETTES (+31 more)

### Community 7 - "num"
Cohesion: 0.11
Nodes (106): atIntegers(), oneFraction(), withoutAbs(), exp(), hyperbolicToExp(), inverseRational(), oneFraction(), sqrtEx() (+98 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (46): FIGURE_PALETTE, addLabel(), boxes, cameras, complexCoord(), containing(), coord(), drawings (+38 more)

### Community 9 - "Dove sono le cose"
Cohesion: 0.06
Nodes (68): Dove sono le cose, Glifo – architettura, allNames(), answerFollowUp(), bareResult(), CHAT_SUBJECT, chatContext, ChatFn (+60 more)

### Community 10 - "markdown.ts"
Cohesion: 0.08
Nodes (45): MONTHS, parseDate(), planBlock, PlanKind, planRange(), blockLines(), GraphError, graphNames() (+37 more)

### Community 11 - "markers.ts"
Cohesion: 0.11
Nodes (35): Item, ListStyle, bullet(), bulletGroup(), childMarker(), column(), firstMarker(), label() (+27 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (56): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), dataWindow(), domainEdge() (+48 more)

### Community 13 - "Stroke"
Cohesion: 0.26
Nodes (5): pointsOf(), strokeSummary(), shapeSvg(), newStrokeId(), Stroke

### Community 14 - "SchemaEditor"
Cohesion: 0.10
Nodes (10): isLanes(), SchemaEditor, withLaneContents(), cellText(), edgeLook(), nodeLook(), nodeStyle(), restyle() (+2 more)

### Community 15 - "Board"
Cohesion: 0.08
Nodes (6): Board, BoardOptions, loadPrefs(), penErases(), highlightName(), inkName()

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (4): SheetEditor, decimalsOf(), CellRange, cloneSheet()

### Community 17 - "graphNote.test.ts"
Cohesion: 0.06
Nodes (41): @codemirror/language, @codemirror/state, @codemirror/view, @lezer/common, acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin (+33 more)

### Community 18 - "numerical.ts"
Cohesion: 0.08
Nodes (62): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Commenti, Compatibilità con VS Code, Condividere una nota con un link (+54 more)

### Community 19 - "arithmetic.ts"
Cohesion: 0.07
Nodes (84): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+76 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (41): b, bigops, c, calculus, fn, fr, fractions, functions (+33 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "topics.ts"
Cohesion: 0.19
Nodes (22): ATTRIBUTES, count(), cut(), ER_SHAPES, fieldText(), fitLines(), flowOrder(), formulaText() (+14 more)

### Community 23 - "parseSchema"
Cohesion: 0.10
Nodes (29): schemaSummary(), svg(), graphsForFile(), hide(), markdownForFile(), openSchema(), saveSchemaBlock(), findSchemaBlock() (+21 more)

### Community 24 - "IdbBoards"
Cohesion: 0.09
Nodes (12): BoardBackend, done(), fromRecord(), IdbBoards, ofNote(), openBoardDatabase(), openDefault(), request() (+4 more)

### Community 25 - "MathError"
Cohesion: 0.10
Nodes (64): MathError, angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, dataOf() (+56 more)

### Community 26 - "schema/preview.ts"
Cohesion: 0.23
Nodes (11): renameGraphScope(), renameScopeKeys(), draw(), drawCached(), drawn, errorHtml(), fill(), hydrateSchemas() (+3 more)

### Community 27 - "assistant.ts"
Cohesion: 0.14
Nodes (19): @anthropic-ai/sdk, AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible() (+11 more)

### Community 28 - ".folderItem"
Cohesion: 0.22
Nodes (3): formatDate(), NotesPanel, NotesPanelDeps

### Community 29 - "toLatex"
Cohesion: 0.06
Nodes (89): numShown(), sumShown(), close(), Definite, definiteIntegral(), exValue(), samples(), EMPTY_SCOPE (+81 more)

### Community 30 - "gantt.ts"
Cohesion: 0.06
Nodes (64): amount(), barColor(), crossings(), dateText(), dayOf(), fitText(), GanttOptions, ganttSvg() (+56 more)

### Community 31 - "editor/lists.ts"
Cohesion: 0.17
Nodes (32): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+24 more)

### Community 32 - "search.ts"
Cohesion: 0.16
Nodes (25): preferredIndex(), editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase() (+17 more)

### Community 33 - "spell.test.ts"
Cohesion: 0.08
Nodes (23): @codemirror/lang-markdown, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt() (+15 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "NotesStore"
Cohesion: 0.06
Nodes (51): accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf() (+43 more)

### Community 36 - "Rational"
Cohesion: 0.04
Nodes (89): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexValue(), isInequality() (+81 more)

### Community 37 - "namesIn"
Cohesion: 0.14
Nodes (34): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+26 more)

### Community 38 - "view3d.ts"
Cohesion: 0.06
Nodes (81): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+73 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "sheet.ts"
Cohesion: 0.08
Nodes (53): OdeFunction, expSumValue(), ExactFunction, Lin, bracketParts(), BRACKETS, CHECK_VALUES, checks (+45 more)

### Community 41 - "schemaBlocks.ts"
Cohesion: 0.10
Nodes (20): InsertOptions, toggleLinePrefix(), besideSchema(), BlockWidget, findWidgetBlocks(), guardBlocks(), KINDS, schemaBlockRanges() (+12 more)

### Community 42 - "laplace.ts"
Cohesion: 0.22
Nodes (19): beyondPoles(), compiled(), E, fractionShown(), HALF, inverseLaplaceShown(), laplaceEx(), laplaceShown() (+11 more)

### Community 43 - "study.ts"
Cohesion: 0.13
Nodes (39): names(), STUDY_GRAPH, studyItems(), nameLatex(), setLatex(), limit(), Asymptote, boundaries() (+31 more)

### Community 44 - "functions.ts"
Cohesion: 0.08
Nodes (61): EMPTY, evaluateSheet(), number(), SheetEvaluator, addFormat(), divFormat(), GENERAL, most() (+53 more)

### Community 45 - "latex.ts"
Cohesion: 0.08
Nodes (48): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+40 more)

### Community 46 - "explainPanel.ts"
Cohesion: 0.14
Nodes (24): Explanation, REPLY_TOKENS, explanationMarkdown(), insertAfterBlock(), insertAfterText(), insertExplanation(), nextLineText(), checkHtml() (+16 more)

### Community 47 - "FoldersStore"
Cohesion: 0.15
Nodes (4): cleanFolderName(), FoldersStore, sameName(), names()

### Community 48 - "distributions.ts"
Cohesion: 0.07
Nodes (61): addExp(), choose(), continuousQuantile(), discreteQuantile(), Distribution, exactIntervalProbability(), factorialBig(), FAMILIES (+53 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (37): DrawAction, adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners() (+29 more)

### Community 50 - "schemaTools.test.ts"
Cohesion: 0.17
Nodes (15): laneOf(), alignBoxes(), Alignment, Box, distributeBoxes(), Position, crc32(), svgSize() (+7 more)

### Community 51 - "SidePanel"
Cohesion: 0.16
Nodes (9): cache, cleanKatexError(), renderTex(), renderTexOrError(), renderTexWithResult(), TexRender, displayCode(), preventFocusSteal() (+1 more)

### Community 52 - "Pt"
Cohesion: 0.12
Nodes (12): clampZoom(), coalesced(), EraseAction, Finger, LassoAction, MoveAction, pressureOf(), validView() (+4 more)

### Community 53 - "deploy.test.ts"
Cohesion: 0.28
Nodes (4): vite-plugin-pwa, accountOffMessage(), defineFor(), MAIN_BRANCH

### Community 54 - "dom.ts"
Cohesion: 0.15
Nodes (18): SyncStatus, AccountButton, confirmAccountDeletion(), messageOf(), openAccountDialog(), openLoginDialog(), codeStep(), emailStep() (+10 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "strokes.ts"
Cohesion: 0.09
Nodes (37): centerOn(), copyStrokes(), cross(), IDENTITY, insideLasso(), keepInside(), LASSO_SHARE, lassoed() (+29 more)

### Community 58 - "dialogs.ts"
Cohesion: 0.05
Nodes (56): EXPLAIN_TONES, ExplainTone, DEFAULT_LOCAL_MODEL, AI_SERVICES, aiService, relocationReceived(), importPackage(), isRelocationPackage() (+48 more)

### Community 59 - "odesolve.ts"
Cohesion: 0.08
Nodes (68): addWave(), arrange(), cauchy(), characteristicRoots(), compiled(), constantNames(), constantParticular(), constantRoots() (+60 more)

### Community 60 - "plan.ts"
Cohesion: 0.20
Nodes (15): cellText(), columnRole(), columnsOf(), durationUnit(), isNumber(), isPlanRange(), MAX_ACTIVITIES, plain() (+7 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "h"
Cohesion: 0.09
Nodes (27): viewSwitch, fieldInput(), textWidth(), tableField, append(), h(), icon(), MenuEntry (+19 more)

### Community 63 - "statsGraph.ts"
Cohesion: 0.13
Nodes (25): FieldContext, criticalLine(), named(), severalItems(), surface(), classes(), dataOf(), distributionExtent() (+17 more)

### Community 64 - "probability.ts"
Cohesion: 0.15
Nodes (21): End, Family, ExactScope, ALL, complement(), endAt(), EventContext, eventSet() (+13 more)

### Community 65 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 66 - "spreadsheet/editor.ts"
Cohesion: 0.07
Nodes (65): ChartTable, currentCall(), Editing, MenuEntry, Move, openSheetEditor(), PATHS, rangeLabel() (+57 more)

### Community 67 - "blockMove.ts"
Cohesion: 0.16
Nodes (19): blank(), BlockMove, blockPlace(), closed(), closeIdx(), fenceClosed(), findBlock(), invisible() (+11 more)

### Community 68 - "smoke-test.mjs"
Cohesion: 0.14
Nodes (9): markdown-it, playwright-core, vite, fakeLlmWorker(), firstVisit(), plainContext, minutes, postMessage() (+1 more)

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
Cohesion: 0.12
Nodes (7): characteristicPolynomial(), eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn()

### Community 73 - "MarkdownEditor"
Cohesion: 0.12
Nodes (9): @codemirror/commands, closeMathBlockOnEnter(), EditorCallbacks, MarkdownEditor, insertTemplate(), blockMoved, blockMoves(), LineMap (+1 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (60): linearIn(), letters(), valueAt(), primitive(), verified(), atValues(), Converter, coordinates() (+52 more)

### Community 75 - "sidePanel.ts"
Cohesion: 0.17
Nodes (15): SuggestionItem, isConfidentAnswer(), CATEGORIES, symbolsInCategory(), cardPreviewTex(), formPreviewTex(), ParsedTemplate, parseTemplate() (+7 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.04
Nodes (70): ALIGN, ARROW_NAMES, AT_ICONS, AT_NAMES, BASE_PRESETS, BIG_ARROWS, DB_PRESETS, Direction (+62 more)

### Community 79 - "toolbar.ts"
Cohesion: 0.19
Nodes (14): insertBlock(), wrapSelection(), Action, createToolbar(), insertCode(), insertLink(), listStyle(), MenuItem (+6 more)

### Community 82 - "blockMove.test.ts"
Cohesion: 0.27
Nodes (12): blockMoveTransaction(), contentHash(), fenceName(), MOVABLE, parseBlocks(), findSheetBlock(), apply(), blocks() (+4 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.20
Nodes (6): centerOf(), clickOn(), ffmpeg, SCENES, SIZE, work

### Community 90 - "Abbonamenti"
Cohesion: 0.14
Nodes (14): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+6 more)

### Community 91 - "aiPanel.test.ts"
Cohesion: 0.15
Nodes (9): AI_NEWS_TITLE, AI_WORKING_TITLE, aiActivity, FLOW, GRAPH_FIXED, GRAPH_STEPS, NOTE, SHEET (+1 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.13
Nodes (9): device(), login(), newContext, waitFor(), b64(), CODE, GOOGLE_CODE, ROOT (+1 more)

### Community 97 - "editor.test.ts"
Cohesion: 0.08
Nodes (23): tabOutOfMath(), templateInsertion(), commandTokenAt(), isInCode(), mathContextAt(), openMathBefore(), addPlaceholders, buildDecorations() (+15 more)

### Community 98 - "board.ts"
Cohesion: 0.07
Nodes (41): Action, ACTION_NAMES, DOT_SIZES, EraserMode, HANDLE_REACH, ICON, MODE_NAMES, PanAction (+33 more)

### Community 100 - "explainSubjects.ts"
Cohesion: 0.23
Nodes (15): explainTarget, hasCalculation(), targetAt(), subjectsIn(), THEOREM_START, THEOREM_WORDS, theoremsIn(), theoremTitle() (+7 more)

### Community 101 - "page.ts"
Cohesion: 0.11
Nodes (20): katex, isShareToken(), SharedNote, tokenFromHash(), body, draw(), isDark(), load() (+12 more)

### Community 102 - "supabase.ts"
Cohesion: 0.04
Nodes (91): @supabase/supabase-js, AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), accountError, appUrl(), call() (+83 more)

### Community 103 - "downloadText"
Cohesion: 0.24
Nodes (5): loadDialect(), serializeSchema(), downloadBlob(), downloadText(), fileNameFor()

### Community 105 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 106 - "grafo-html.mjs"
Cohesion: 0.17
Nodes (5): graphFile, names, namesFile, root, PNG_ICONS

### Community 107 - "localModels.ts"
Cohesion: 0.09
Nodes (30): @mlc-ai/web-llm, chat(), GlifoError, Gpu, load(), post(), remove(), scope (+22 more)

### Community 108 - "xlsx.ts"
Cohesion: 0.06
Nodes (67): RFC-4180, fflate, csvDelimiter(), csvToSheet(), field(), italian(), parseCsv(), sheetToCsv() (+59 more)

### Community 110 - "aiPanel.ts"
Cohesion: 0.16
Nodes (14): definedName(), formulaTopic(), graphTopic(), numberText(), studyOf(), theoremTopic(), NoteSubject, SubjectKind (+6 more)

### Community 113 - "graph.ts"
Cohesion: 0.06
Nodes (39): @maxgraph/core, AT_X, cellHtml(), COMPASS, createEdgeCell(), createGraph(), drawSchema(), edgeStyle() (+31 more)

### Community 116 - "Il database degli account (Supabase)"
Cohesion: 0.15
Nodes (12): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Il trasloco su glifo.page (ottobre 2026), Nell'app (+4 more)

### Community 117 - "Più avanti"
Cohesion: 0.20
Nodes (9): Promemoria per lo studente, Account: i propri appunti su ogni dispositivo, anche da condividere, Commenti di chi prova Glifo, Idee per il futuro, In programma, La lavagna: idee in più, Più avanti, Schemi: idee in più (+1 more)

### Community 119 - "conics.ts"
Cohesion: 0.18
Nodes (29): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+21 more)

### Community 120 - "toast"
Cohesion: 0.10
Nodes (33): board, loadingEditor(), openSheet(), saveSheetBlock(), tablesNote(), tools, copy(), openTouchLogDialog() (+25 more)

### Community 121 - "host.ts"
Cohesion: 0.23
Nodes (8): cache, capability(), ClaudeRuntime, hostDownloads, HostError, hostSample, ModelTier, runtime()

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "BoardStore"
Cohesion: 0.09
Nodes (12): BoardStore, MemoryBoards, BackupNote, backupNotes(), restoreBackup(), RestoreBoards, Restored, restoredMessage() (+4 more)

### Community 124 - "Sheet"
Cohesion: 0.07
Nodes (34): Definition, Line, ExactComplexScope, Ode, withWorkLimit(), FiniteContext, FormattedResult, differentialRequest (+26 more)

### Community 125 - "sql.ts"
Cohesion: 0.17
Nodes (18): parseTable(), splitTable(), Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey() (+10 more)

### Community 126 - "ui/preview.ts"
Cohesion: 0.32
Nodes (8): BlockKind, MoveDir, hydrateSheets(), BLOCK_NAMES, blockKindOf(), MOVABLE_BLOCKS, moveButtonsHtml(), PATHS

### Community 127 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

### Community 128 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 129 - "graph/file.ts"
Cohesion: 0.11
Nodes (34): figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsFromFile(), OPEN, swatchSvg(), titleBand() (+26 more)

### Community 132 - "solve.ts"
Cohesion: 0.06
Nodes (75): exponentialForm(), fracTex(), fracText(), nearFraction(), piMultiple(), surd(), decimalSeparator(), Digits (+67 more)

### Community 136 - "Glifo – note per Claude"
Cohesion: 0.25
Nodes (8): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Regole, sqlite()

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 139 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 141 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 142 - "ExplainEvents"
Cohesion: 0.33
Nodes (3): ExplainEvents, ToolCall, scripted()

### Community 143 - "SheetModel"
Cohesion: 0.47
Nodes (4): SheetEditorOptions, Snapshot, SheetModel, XlsxSheet

### Community 144 - "I modelli e le chiavi API"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), In prova sul ramo `prova` (7 ottobre 2026): Qwen3 nel browser per «Spiegami», Le idee dello studente (5 ottobre 2026)

### Community 158 - "editor/editor.ts"
Cohesion: 0.07
Nodes (39): description, name, private, type, version, @codemirror/autocomplete, @codemirror/language-data, @codemirror/search (+31 more)

## Knowledge Gaps
- **693 isolated node(s):** `session-start.sh script`, `name`, `private`, `version`, `description` (+688 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 973 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **38 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `touchlog.ts`, `graph/file.ts`, `main.ts`, `compile`, `solve.ts`, `spec.ts`, `vitest`, `parse.ts`, `graph/preview.ts`, `num`, `markdown.ts`, `PreviewCallbacks`, `svg.ts`, `Stroke`, `SchemaEditor`, `Board`, `SheetEditor`, `graphNote.test.ts`, `numerical.ts`, `arithmetic.ts`, `ExplainChat`, `topics.ts`, `MathError`, `schema/preview.ts`, `assistant.ts`, `toLatex`, `gantt.ts`, `logic.ts`, `NotesStore`, `Rational`, `namesIn`, `view3d.ts`, `sheet.ts`, `schemaBlocks.ts`, `study.ts`, `functions.ts`, `latex.ts`, `explainPanel.ts`, `distributions.ts`, `board/shapes.ts`, `schemaTools.test.ts`, `SidePanel`, `Pt`, `deploy.test.ts`, `Preview`, `strokes.ts`, `dialogs.ts`, `odesolve.ts`, `plan.ts`, `h`, `spreadsheet/editor.ts`, `blockMove.ts`, `smoke-test.mjs`, `MarkdownEditor`, `symbolic.ts`, `sidePanel.ts`, `schema/editor.ts`, `toolbar.ts`, `blockMove.test.ts`, `aiPanel.test.ts`, `explainSubjects.ts`, `supabase.ts`, `localModels.ts`, `xlsx.ts`, `aiPanel.ts`, `graph.ts`, `ExplainPanel`, `conics.ts`, `toast`, `BoardStore`, `Sheet`, `sql.ts`, `ui/preview.ts`?**
  _High betweenness centrality (0.191) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `touchlog.ts`, `parse.ts`, `graph/file.ts`, `compile`, `sync.ts`, `main.ts`, `num`, `Dove sono le cose`, `markdown.ts`, `markers.ts`, `svg.ts`, `graphNote.test.ts`, `parseSchema`, `IdbBoards`, `MathError`, `schema/preview.ts`, `assistant.ts`, `editor/editor.ts`, `gantt.ts`, `editor/lists.ts`, `search.ts`, `spell.test.ts`, `NotesStore`, `Rational`, `resize.ts`, `schemaBlocks.ts`, `distributions.ts`, `board/shapes.ts`, `schemaTools.test.ts`, `deploy.test.ts`, `strokes.ts`, `dialogs.ts`, `plan.ts`, `h`, `spreadsheet/editor.ts`, `MarkdownEditor`, `sidePanel.ts`, `schema/editor.ts`, `blockMove.test.ts`, `aiPanel.test.ts`, `editor.test.ts`, `board.ts`, `page.ts`, `supabase.ts`, `localModels.ts`, `xlsx.ts`, `toast`, `BoardStore`, `Sheet`?**
  _High betweenness centrality (0.122) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `main.ts`, `PreviewCallbacks`, `graph/preview.ts`, `ExplainChat`, `SchemaEditor`, `Board`, `SheetEditor`, `.folderItem`, `gantt.ts`, `spell.test.ts`, `NotesStore`, `resize.ts`, `explainPanel.ts`, `SidePanel`, `dom.ts`, `dialogs.ts`, `spreadsheet/editor.ts`, `sidePanel.ts`, `schema/editor.ts`, `toolbar.ts`, `board.ts`, `page.ts`, `supabase.ts`, `downloadText`, `aiPanel.ts`, `ExplainPanel`, `toast`, `ui/preview.ts`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **Are the 271 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `adoptGuestNotes()`) actually correct?**
  _`Dove sono le cose` has 271 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `name`, `private` to the rest of the system?**
  _693 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `touchlog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08653061224489796 - nodes in this community are weakly interconnected._
- **Should `parse.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07421150278293136 - nodes in this community are weakly interconnected._