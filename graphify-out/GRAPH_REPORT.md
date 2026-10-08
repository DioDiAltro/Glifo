# Graph Report - matherdown  (2026-10-08)

## Corpus Check
- 301 files · ~587,152 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 4934 nodes · 17884 edges · 166 communities (130 shown, 36 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 558 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3e5d9529`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- touchlog.ts
- Parser
- main.ts
- compile
- sync.ts
- spec.ts
- arithmetic.ts
- primitive.ts
- GraphView
- Dove sono le cose
- num
- editor/lists.ts
- svg.ts
- explainPanel.ts
- SchemaEditor
- Rational
- h
- scopeWith
- MathError
- aiPanel.ts
- index.ts
- engine.ts
- calcResults.ts
- topics.ts
- BoardStore
- linear.ts
- assistant.ts
- icon
- editor.test.ts
- several.ts
- gantt.ts
- plan.ts
- search.ts
- editor/editor.ts
- logic.ts
- NotesStore
- complex.ts
- namesIn
- graph/space.ts
- resize.ts
- sheet.ts
- Board
- solve.ts
- study.ts
- functions.ts
- finite.ts
- Sheet
- toLatex
- distributions.ts
- board/shapes.ts
- storage.test.ts
- SidePanel
- dialogs.ts
- page.ts
- parse.ts
- toolbar.ts
- 20261004091555_note_condivise.sql
- board.ts
- dialogShell
- odesolve.ts
- graph.ts
- dependencies
- view3d.ts
- .constructor
- ui/preview.ts
- conics.ts
- spreadsheet/editor.ts
- statsGraph.ts
- smoke-test.mjs
- Benvenuto in Glifo
- compilerOptions
- strokes.ts
- planPreview.ts
- FoldersStore
- symbolic.ts
- MathNode
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- parseSchema
- session-start.sh
- .claude/CLAUDE.md
- blockMove.ts
- tutorial.mjs
- Abbonamenti
- spiegami-qwen.mjs
- supabase-stub.sql
- account-test.mjs
- Il database degli account (Supabase)
- Pt
- devDependencies
- graphNote.test.ts
- supabase.ts
- files.ts
- Glifo
- schemaBlocks.ts
- fake-supabase.mjs
- localModels.ts
- xlsx.ts
- explainSubjects.ts
- markdown.ts
- spreadsheet/format.ts
- Piano per piano
- ExplainPanel
- probability.ts
- siteUpdate.ts
- Field
- Le spiegazioni, come funzionano
- fourier.ts
- inference.ts
- sql.ts
- .sameAs
- graph/preview.ts
- aiPanel.test.ts
- labels.ts
- tutorial.ts
- linsys.ts
- formula.ts
- plot.ts
- graphInsert.ts
- formatNumber
- sidePanel.ts
- Glifo – note per Claude
- deploy.test.ts
- planBlock.ts
- grafo-html.mjs
- .constructor
- createFakeSupabase
- icons.mjs
- schedule.ts
- spellcheck
- logo.ts
- scripts
- AccountSync
- SpellClient
- Costi
- Idee per il futuro
- La lavagna
- I modelli e le chiavi API
- sampleRegion

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 261 edges
2. `MathError` - 151 edges
3. `num()` - 145 edges
4. `Sheet` - 139 edges
5. `MathNode` - 129 edges
6. `mul()` - 124 edges
7. `Board` - 118 edges
8. `compile()` - 113 edges
9. `Rational` - 111 edges
10. `h()` - 107 edges

## Surprising Connections (you probably didn't know these)
- `Dove sono le cose` --references--> `fakeLlmWorker()`  [INFERRED]
  ARCHITETTURA.md → scripts/smoke-test.mjs
- `Come viene pubblicata` --references--> `dist()`  [INFERRED]
  README.md → src/board/shapes.ts
- `Dove sono le cose` --references--> `ConicElements`  [INFERRED]
  ARCHITETTURA.md → src/math/conics.ts
- `Funzionalità` --references--> `k()`  [INFERRED]
  README.md → src/math/numerical.ts
- `Dove sono le cose` --references--> `texts()`  [INFERRED]
  ARCHITETTURA.md → tests/boardTouchLog.test.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (166 total, 36 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.08
Nodes (31): at(), browserStore, clip(), isSaved(), KINDS, LOG_KEY, LOG_MAX_LINES, LogStore (+23 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (104): addToGraphBlock(), graphsFromFile(), unhide(), account, ACCOUNT_OFF, active, aiToggle, app (+96 more)

### Community 3 - "compile"
Cohesion: 0.07
Nodes (52): argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot(), fieldOn(), numericPartials() (+44 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (38): @electric-sql/pglite, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+30 more)

### Community 5 - "spec.ts"
Cohesion: 0.06
Nodes (85): constantIntegrand(), depth(), inequalityMargin(), integralRegion, LayeredSolid, Multiple, multipleOf(), planeMargin() (+77 more)

### Community 6 - "arithmetic.ts"
Cohesion: 0.06
Nodes (100): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+92 more)

### Community 7 - "primitive.ts"
Cohesion: 0.16
Nodes (60): PartialFraction, algebraic(), bigGcd(), byParts(), candidates(), canon(), combineLogs(), compareKeys() (+52 more)

### Community 8 - "GraphView"
Cohesion: 0.10
Nodes (21): addLabel(), complexCoord(), coord(), endTex(), explicitWindow(), fitField(), graphSize(), GraphView (+13 more)

### Community 9 - "Dove sono le cose"
Cohesion: 0.06
Nodes (70): Dove sono le cose, Glifo – architettura, allNames(), answerFollowUp(), bareResult(), CHAT_SUBJECT, chatContext, ChatFn (+62 more)

### Community 10 - "num"
Cohesion: 0.12
Nodes (64): monomial(), splitAbs(), withoutAbs(), exp(), hyperbolicToExp(), inverseRational(), linearIn(), sqrtEx() (+56 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.09
Nodes (61): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+53 more)

### Community 12 - "svg.ts"
Cohesion: 0.13
Nodes (33): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), Polyline, tickLabel(), ticks, Viewport (+25 more)

### Community 13 - "explainPanel.ts"
Cohesion: 0.14
Nodes (17): Explanation, FollowUp, REPLY_TOKENS, explanationMarkdown(), append(), Child, ICONS, Props (+9 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.11
Nodes (3): SchemaEditor, withLaneContents(), serializeSchema()

### Community 15 - "Rational"
Cohesion: 0.08
Nodes (40): expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactRandom, exactRoot(), factorialExact() (+32 more)

### Community 16 - "h"
Cohesion: 0.08
Nodes (9): rangeLabel(), SheetEditor, serializeSheet(), autoSum(), CellRange, cloneSheet(), rangeName(), confirmDialog() (+1 more)

### Community 17 - "scopeWith"
Cohesion: 0.11
Nodes (36): conicItems(), isConicLine(), quadricEquation(), FieldContext, criticalLine(), isSeveralLine(), named(), severalItems() (+28 more)

### Community 18 - "MathError"
Cohesion: 0.12
Nodes (51): isNumericalLine(), numericalItems(), MathError, bisection(), cholesky(), condition(), derivative(), exactPolynomial() (+43 more)

### Community 19 - "aiPanel.ts"
Cohesion: 0.12
Nodes (22): definedName(), formulaTopic(), graphTopic(), numberText(), studyOf(), theoremTopic(), NoteSubject, SubjectKind (+14 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (39): b, bigops, c, calculus, fn, fr, fractions, functions (+31 more)

### Community 21 - "engine.ts"
Cohesion: 0.08
Nodes (22): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClientOptions, workerBackend(), WorkerUnavailable, download(), fetchDictionary() (+14 more)

### Community 22 - "calcResults.ts"
Cohesion: 0.11
Nodes (13): @lezer/common, acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult, calcResults(), CheckWidget (+5 more)

### Community 23 - "topics.ts"
Cohesion: 0.12
Nodes (27): ATTRIBUTES, count(), cut(), ER_SHAPES, fieldText(), fitLines(), flowOrder(), formulaText() (+19 more)

### Community 24 - "BoardStore"
Cohesion: 0.06
Nodes (15): BoardOptions, BoardBackend, BoardStore, done(), IdbBoards, MemoryBoards, ofNote(), openBoardDatabase() (+7 more)

### Community 25 - "linear.ts"
Cohesion: 0.09
Nodes (65): angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, dataOf(), degreesText() (+57 more)

### Community 26 - "assistant.ts"
Cohesion: 0.10
Nodes (26): @anthropic-ai/sdk, AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible() (+18 more)

### Community 27 - "icon"
Cohesion: 0.15
Nodes (16): fieldInput(), isLanes(), cellText(), createEdgeCell(), edgeLook(), edgeStyle(), edgeTextAt(), insertSchema() (+8 more)

### Community 28 - "editor.test.ts"
Cohesion: 0.09
Nodes (20): closeMathBlockOnEnter(), CODE_NODES, CommandToken, commandTokenAt(), EditorMathContext, isInCode(), MATH_NODES, mathContextAt() (+12 more)

### Community 29 - "several.ts"
Cohesion: 0.14
Nodes (37): severalLimit, at(), bounded(), Candidate, candidates(), compiled(), constraintsOf(), COORDS (+29 more)

### Community 30 - "gantt.ts"
Cohesion: 0.14
Nodes (32): amount(), barColor(), crossings(), dateText(), dayOf(), fitText(), GanttOptions, ganttSvg() (+24 more)

### Community 31 - "plan.ts"
Cohesion: 0.20
Nodes (15): cellText(), columnRole(), columnsOf(), durationUnit(), isNumber(), isPlanRange(), MAX_ACTIVITIES, plain() (+7 more)

### Community 32 - "search.ts"
Cohesion: 0.17
Nodes (24): editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex() (+16 more)

### Community 33 - "editor/editor.ts"
Cohesion: 0.08
Nodes (27): description, name, private, type, version, @codemirror/autocomplete, @codemirror/language, @codemirror/language-data (+19 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "NotesStore"
Cohesion: 0.08
Nodes (33): accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf() (+25 more)

### Community 36 - "complex.ts"
Cohesion: 0.06
Nodes (65): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexValue(), isInequality() (+57 more)

### Community 37 - "namesIn"
Cohesion: 0.13
Nodes (37): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+29 more)

### Community 38 - "graph/space.ts"
Cohesion: 0.13
Nodes (43): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+35 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "sheet.ts"
Cohesion: 0.09
Nodes (50): OdeFunction, ExactFunction, ExactScope, LimitValue, Lin, NUMERICAL, BRACKETS, CHECK_VALUES (+42 more)

### Community 41 - "Board"
Cohesion: 0.09
Nodes (4): Board, clampZoom(), validView(), BoardTheme

### Community 42 - "solve.ts"
Cohesion: 0.18
Nodes (24): LinearScope, isStandardUnknown(), linearSystem(), breaks(), cubeRoot(), equation(), holds(), inequality() (+16 more)

### Community 43 - "study.ts"
Cohesion: 0.17
Nodes (32): nameLatex(), Asymptote, compiled(), cutsOf(), defined(), domainOf(), exact(), inDomain() (+24 more)

### Community 44 - "functions.ts"
Cohesion: 0.09
Nodes (59): EMPTY, number(), addFormat(), divFormat(), GENERAL, mulFormat(), tidy(), withCents() (+51 more)

### Community 45 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 46 - "Sheet"
Cohesion: 0.07
Nodes (20): ExactComplexScope, expSumValue(), fingerprint(), Sheet, text(), tex(), text(), check() (+12 more)

### Community 47 - "toLatex"
Cohesion: 0.05
Nodes (69): vitest, fourierItems(), isFourierLine(), staticGraphSvg(), chooseWindow(), Box, chooseBox(), formulaGraph() (+61 more)

### Community 48 - "distributions.ts"
Cohesion: 0.10
Nodes (36): addExp(), choose(), continuousQuantile(), discreteQuantile(), Distribution, exactIntervalProbability(), factorialBig(), FAMILIES (+28 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (35): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+27 more)

### Community 50 - "storage.test.ts"
Cohesion: 0.23
Nodes (10): backup(), addPersonalWord(), DICTIONARY_KEY, loadPersonalWords(), savePersonalWords(), tidy(), loadSettings(), saveSettings() (+2 more)

### Community 51 - "SidePanel"
Cohesion: 0.18
Nodes (6): cleanKatexError(), isConfidentAnswer(), symbolsInCategory(), clear(), preventFocusSteal(), SidePanel

### Community 52 - "dialogs.ts"
Cohesion: 0.09
Nodes (26): EXPLAIN_TONES, ExplainTone, DEFAULT_LOCAL_MODEL, AI_SERVICES, aiService, aiSettingsOf(), ACCOUNT_SETTINGS, accountSettings() (+18 more)

### Community 53 - "page.ts"
Cohesion: 0.06
Nodes (46): katex, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), PullResult, openShareDialog(), changeAccess(), changeCopy() (+38 more)

### Community 54 - "parse.ts"
Cohesion: 0.06
Nodes (39): hasWord(), names(), STUDY_GRAPH, studyItems(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING (+31 more)

### Community 55 - "toolbar.ts"
Cohesion: 0.10
Nodes (27): insertBlock(), InsertOptions, insertTemplate(), templateInsertion(), toggleLinePrefix(), wrapSelection(), LIST_STYLES, addPlaceholders (+19 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "board.ts"
Cohesion: 0.06
Nodes (54): Action, ACTION_NAMES, DOT_SIZES, DrawAction, EraseAction, EraserMode, HANDLE_REACH, ICON (+46 more)

### Community 58 - "dialogShell"
Cohesion: 0.20
Nodes (15): SyncStatus, AccountButton, confirmAccountDeletion(), messageOf(), openAccountDialog(), openLoginDialog(), codeStep(), emailStep() (+7 more)

### Community 59 - "odesolve.ts"
Cohesion: 0.07
Nodes (57): Definite, primed(), Piece, addWave(), arrange(), compiled(), Condition, constantNames() (+49 more)

### Community 60 - "graph.ts"
Cohesion: 0.05
Nodes (41): @maxgraph/core, AT_X, cellHtml(), COMPASS, createGraph(), drawSchema(), isEdgeLook(), isNodeLook() (+33 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "view3d.ts"
Cohesion: 0.09
Nodes (38): Detail, Face, FAST, FINE, planeTolerance(), surfacePlane(), Plane, Vec3 (+30 more)

### Community 63 - ".constructor"
Cohesion: 0.10
Nodes (12): EditorCallbacks, tabOutOfMath(), buildDecorations(), clearAllPlaceholders(), clearPlaceholders, contains(), currentIndex(), filledMark (+4 more)

### Community 64 - "ui/preview.ts"
Cohesion: 0.10
Nodes (13): GraphLabels, BlockKind, hydrateSheets(), BLOCK_NAMES, blockKindOf(), MOVABLE_BLOCKS, moveButtonsHtml(), PATHS (+5 more)

### Community 65 - "conics.ts"
Cohesion: 0.18
Nodes (29): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+21 more)

### Community 66 - "spreadsheet/editor.ts"
Cohesion: 0.09
Nodes (48): currentCall(), Editing, MenuEntry, Move, openSheetEditor(), PATHS, SheetEditorOptions, Snapshot (+40 more)

### Community 67 - "statsGraph.ts"
Cohesion: 0.17
Nodes (17): isTestLine(), number(), testItems(), Range, classes(), dataOf(), distributionExtent(), distributionLabel() (+9 more)

### Community 68 - "smoke-test.mjs"
Cohesion: 0.29
Nodes (4): markdown-it, fakeLlmWorker(), firstVisit(), plainContext

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "strokes.ts"
Cohesion: 0.10
Nodes (33): Prefs, BOARD_PALETTES, BoardPalette, highlightName(), inkName(), mid(), outlineSvg(), PEN_SIZE (+25 more)

### Community 72 - "planPreview.ts"
Cohesion: 0.12
Nodes (21): measured(), PLAN_FONT, planSwatchSvg(), textWidth(), labelPlain(), readPlan(), FIGURE, FIGURE_WIDTH (+13 more)

### Community 73 - "FoldersStore"
Cohesion: 0.08
Nodes (18): cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder(), loadClosedFolders(), RemoteFolder (+10 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.06
Nodes (64): primitive(), linearCells(), assumePositive(), atValues(), combine(), commonMonomial(), commonPositive(), Converter (+56 more)

### Community 75 - "MathNode"
Cohesion: 0.14
Nodes (16): Definition, Line, Ode, OdeSystem, withWorkLimit(), FiniteContext, FormattedResult, differentialRequest (+8 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.04
Nodes (73): laneOf(), alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ARROW_NAMES (+65 more)

### Community 79 - "parseSchema"
Cohesion: 0.08
Nodes (32): readSchema(), schemaSummary(), svg(), SchemaEditorOptions, base64(), hide(), OPEN, schemasForFile() (+24 more)

### Community 82 - "blockMove.ts"
Cohesion: 0.10
Nodes (37): @codemirror/commands, blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove, blockPlace() (+29 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.20
Nodes (6): centerOf(), clickOn(), ffmpeg, SCENES, SIZE, work

### Community 90 - "Abbonamenti"
Cohesion: 0.14
Nodes (14): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+6 more)

### Community 91 - "spiegami-qwen.mjs"
Cohesion: 0.29
Nodes (4): vite, minutes, postMessage(), started

### Community 96 - "account-test.mjs"
Cohesion: 0.20
Nodes (4): device(), login(), newContext, waitFor()

### Community 97 - "Il database degli account (Supabase)"
Cohesion: 0.17
Nodes (11): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Nell'app, Note condivise con un link (+3 more)

### Community 98 - "Pt"
Cohesion: 0.15
Nodes (11): coalesced(), Finger, LassoAction, PanAction, PinchAction, pointsOf(), pressureOf(), EllipseFit (+3 more)

### Community 100 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

### Community 101 - "graphNote.test.ts"
Cohesion: 0.10
Nodes (25): @codemirror/lang-markdown, @codemirror/state, noIndentedCode, mathMarkdown, misspelledMark, refreshSpelling, setTarget, SKIP (+17 more)

### Community 102 - "supabase.ts"
Cohesion: 0.10
Nodes (36): @supabase/supabase-js, AUTH_STORAGE_KEY, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken() (+28 more)

### Community 103 - "files.ts"
Cohesion: 0.23
Nodes (12): canWriteFilesDirectly(), FsWindow, isAbort(), MD_TYPES, OPEN_TYPES, OpenedFile, openMarkdownFiles(), PickerType (+4 more)

### Community 104 - "Glifo"
Cohesion: 0.14
Nodes (14): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Funzionalità (+6 more)

### Community 105 - "schemaBlocks.ts"
Cohesion: 0.11
Nodes (20): BlockWidget, findWidgetBlocks(), guardBlocks(), KINDS, schemaBlocks(), sheetSummary(), WidgetBlock, graphsForFile() (+12 more)

### Community 106 - "fake-supabase.mjs"
Cohesion: 0.29
Nodes (5): b64(), CODE, GOOGLE_CODE, ROOT, SUPABASE_URL

### Community 107 - "localModels.ts"
Cohesion: 0.09
Nodes (29): @mlc-ai/web-llm, chat(), GlifoError, Gpu, load(), post(), remove(), scope (+21 more)

### Community 108 - "xlsx.ts"
Cohesion: 0.10
Nodes (40): RFC-4180, fflate, csvDelimiter(), csvToSheet(), field(), italian(), parseCsv(), sheetToCsv() (+32 more)

### Community 110 - "explainSubjects.ts"
Cohesion: 0.19
Nodes (20): explainTarget, schemaTitle(), formulasUntil(), sheetBefore(), hasCalculation(), insertAfterBlock(), insertAfterText(), insertExplanation() (+12 more)

### Community 113 - "markdown.ts"
Cohesion: 0.09
Nodes (36): @lezer/highlight, @lezer/markdown, lineDepth(), mathDelimTag, mathTag, parseBlockMath(), dataRange(), moveAttrs() (+28 more)

### Community 116 - "spreadsheet/format.ts"
Cohesion: 0.11
Nodes (33): at(), breakEven(), Point, quantity(), tableItems(), textLabel(), chartData, chartFrom() (+25 more)

### Community 117 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 119 - "probability.ts"
Cohesion: 0.13
Nodes (23): End, CompileOptions, RelOp, ALL, compileOf(), complement(), distributionOf(), endAt() (+15 more)

### Community 120 - "siteUpdate.ts"
Cohesion: 0.17
Nodes (15): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, PartNotLoaded (+7 more)

### Community 121 - "Field"
Cohesion: 0.12
Nodes (7): characteristicPolynomial(), eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn()

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "fourier.ts"
Cohesion: 0.28
Nodes (14): absOf(), atIntegers(), close(), definite(), fourierShown(), isTrig(), isZero(), linearTrig() (+6 more)

### Community 124 - "inference.ts"
Cohesion: 0.16
Nodes (24): chiSquareTest(), confidence(), confidenceShown(), Given, hypothesisTest(), InferenceContext, interval(), meanOf() (+16 more)

### Community 125 - "sql.ts"
Cohesion: 0.15
Nodes (19): parseTable(), splitTable(), Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey() (+11 more)

### Community 126 - ".sameAs"
Cohesion: 0.13
Nodes (11): bracketParts(), chainOf(), close(), definitionTarget(), digitsMatch(), isLiteral(), parseCached(), sameExactLinear() (+3 more)

### Community 127 - "graph/preview.ts"
Cohesion: 0.11
Nodes (22): FIGURE_PALETTE, boxes, cameras, containing(), drawings, drawnViews, FIGURE_SIZE, hydrateGraphs() (+14 more)

### Community 128 - "aiPanel.test.ts"
Cohesion: 0.11
Nodes (13): MarkdownEditor, AiPanelDeps, ExplainChatDeps, ExplainModel, fakeModel(), FLOW, GRAPH_FIXED, GRAPH_STEPS (+5 more)

### Community 129 - "labels.ts"
Cohesion: 0.16
Nodes (19): ACCENTS, BLACKBOARD, CALLIGRAPHIC, closing(), convert(), escapeXml(), FUNCTIONS, GREEK (+11 more)

### Community 131 - "tutorial.ts"
Cohesion: 0.16
Nodes (12): HINT_MS, markSeen(), openTutorial(), show(), richText(), showTutorialHint(), close(), TUTORIAL_PAGES (+4 more)

### Community 132 - "linsys.ts"
Cohesion: 0.14
Nodes (42): evaluateLinear(), choices(), gcd(), matrixEquation(), matrixSystem(), minorsGcd(), ONE, parametricRows() (+34 more)

### Community 133 - "formula.ts"
Cohesion: 0.12
Nodes (20): BinOp, COMPARE, ERRORS_BY_LENGTH, FormulaError, formulaRefs(), isFormula(), normalizeFormula(), OPERATORS (+12 more)

### Community 136 - "plot.ts"
Cohesion: 0.18
Nodes (21): chooseY(), clipLines(), dataWindow(), domainEdge(), features(), findWindow(), gcd(), jump() (+13 more)

### Community 137 - "graphInsert.ts"
Cohesion: 0.16
Nodes (15): formulaAtCursor(), GraphLabelLines, insertGraphBlock(), setGraphLabels(), formulaGraphLine(), graphBlockText(), graphNames(), labelLine() (+7 more)

### Community 138 - "formatNumber"
Cohesion: 0.09
Nodes (39): figureName(), graphFigure(), graphImage(), graphImagesFor(), OPEN, swatchSvg(), titleBand(), areaColor() (+31 more)

### Community 139 - "sidePanel.ts"
Cohesion: 0.18
Nodes (16): SuggestionItem, CATEGORIES, cardPreviewTex(), formPreviewTex(), ParsedTemplate, parseTemplate(), PLACEHOLDER_TEX, placeholderPreview() (+8 more)

### Community 140 - "Glifo – note per Claude"
Cohesion: 0.22
Nodes (9): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole (+1 more)

### Community 141 - "deploy.test.ts"
Cohesion: 0.28
Nodes (4): vite-plugin-pwa, accountOffMessage(), Site, defineFor()

### Community 142 - "planBlock.ts"
Cohesion: 0.42
Nodes (8): MONTHS, parseDate(), planBlock, PlanKind, planRange(), blockLines(), GraphError, planLine()

### Community 143 - "grafo-html.mjs"
Cohesion: 0.25
Nodes (4): graphFile, names, namesFile, root

### Community 145 - "createFakeSupabase"
Cohesion: 0.60
Nodes (6): createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 155 - "schedule.ts"
Cohesion: 0.18
Nodes (16): criticalPaths(), key(), Link, LinkType, listText(), offset(), order(), parseLinks() (+8 more)

### Community 156 - "spellcheck"
Cohesion: 0.21
Nodes (8): spellcheck(), close(), misspelledAt(), openAt(), replace(), tooltipView(), SpellChecker, SpellcheckOptions

### Community 157 - "logo.ts"
Cohesion: 0.33
Nodes (6): sidebarToggle(), BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark()

### Community 158 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 161 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, Quando lo studente dice di cominciare

### Community 162 - "Idee per il futuro"
Cohesion: 0.33
Nodes (6): Account: i propri appunti su ogni dispositivo, anche da condividere, Idee per il futuro, In programma, La lavagna: idee in più, Più avanti, Schemi: idee in più

### Community 163 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 164 - "I modelli e le chiavi API"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), In prova sul ramo `prova` (7 ottobre 2026): Qwen3 nel browser per «Spiegami», Le idee dello studente (5 ottobre 2026)

## Knowledge Gaps
- **664 isolated node(s):** `session-start.sh script`, `name`, `private`, `version`, `description` (+659 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 928 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **36 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `touchlog.ts`, `Parser`, `main.ts`, `compile`, `spec.ts`, `arithmetic.ts`, `primitive.ts`, `num`, `svg.ts`, `SchemaEditor`, `Rational`, `h`, `MathError`, `aiPanel.ts`, `topics.ts`, `BoardStore`, `linear.ts`, `assistant.ts`, `icon`, `several.ts`, `gantt.ts`, `plan.ts`, `logic.ts`, `NotesStore`, `complex.ts`, `namesIn`, `graph/space.ts`, `sheet.ts`, `Board`, `study.ts`, `functions.ts`, `finite.ts`, `toLatex`, `board/shapes.ts`, `storage.test.ts`, `SidePanel`, `dialogs.ts`, `parse.ts`, `toolbar.ts`, `board.ts`, `odesolve.ts`, `graph.ts`, `.constructor`, `ui/preview.ts`, `conics.ts`, `spreadsheet/editor.ts`, `smoke-test.mjs`, `strokes.ts`, `planPreview.ts`, `symbolic.ts`, `MathNode`, `schema/editor.ts`, `blockMove.ts`, `Pt`, `supabase.ts`, `schemaBlocks.ts`, `localModels.ts`, `xlsx.ts`, `explainSubjects.ts`, `markdown.ts`, `spreadsheet/format.ts`, `ExplainPanel`, `siteUpdate.ts`, `fourier.ts`, `inference.ts`, `sql.ts`, `.sameAs`, `graph/preview.ts`, `aiPanel.test.ts`, `tutorial.ts`, `linsys.ts`, `formula.ts`, `plot.ts`, `graphInsert.ts`, `formatNumber`, `sidePanel.ts`, `deploy.test.ts`, `planBlock.ts`, `schedule.ts`, `logo.ts`?**
  _High betweenness centrality (0.171) - this node is a cross-community bridge._
- **Why does `vitest` connect `toLatex` to `aiPanel.test.ts`, `touchlog.ts`, `compile`, `sync.ts`, `linsys.ts`, `tutorial.ts`, `Dove sono le cose`, `num`, `editor/lists.ts`, `sidePanel.ts`, `deploy.test.ts`, `Rational`, `scopeWith`, `BoardStore`, `linear.ts`, `assistant.ts`, `editor.test.ts`, `logo.ts`, `gantt.ts`, `plan.ts`, `search.ts`, `editor/editor.ts`, `NotesStore`, `resize.ts`, `Sheet`, `distributions.ts`, `board/shapes.ts`, `storage.test.ts`, `dialogs.ts`, `page.ts`, `toolbar.ts`, `board.ts`, `graph.ts`, `ui/preview.ts`, `spreadsheet/editor.ts`, `strokes.ts`, `FoldersStore`, `schema/editor.ts`, `parseSchema`, `blockMove.ts`, `graphNote.test.ts`, `supabase.ts`, `localModels.ts`, `xlsx.ts`, `markdown.ts`, `spreadsheet/format.ts`, `siteUpdate.ts`, `sql.ts`, `graph/preview.ts`?**
  _High betweenness centrality (0.116) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `touchlog.ts`, `main.ts`, `tutorial.ts`, `GraphView`, `sidePanel.ts`, `explainPanel.ts`, `SchemaEditor`, `.constructor`, `aiPanel.ts`, `icon`, `spellcheck`, `logo.ts`, `resize.ts`, `Board`, `SidePanel`, `dialogs.ts`, `page.ts`, `toolbar.ts`, `board.ts`, `dialogShell`, `ui/preview.ts`, `spreadsheet/editor.ts`, `planPreview.ts`, `FoldersStore`, `schema/editor.ts`, `graphNote.test.ts`, `ExplainPanel`, `graph/preview.ts`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **Are the 260 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `adoptGuestNotes()`) actually correct?**
  _`Dove sono le cose` has 260 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `name`, `private` to the rest of the system?**
  _664 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `touchlog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07878787878787878 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.043275418275418275 - nodes in this community are weakly interconnected._