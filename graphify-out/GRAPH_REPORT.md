# Graph Report - matherdown  (2026-10-07)

## Corpus Check
- 297 files · ~579,867 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 4879 nodes · 17691 edges · 142 communities (114 shown, 28 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 546 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `05fcdd92`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- touchlog.ts
- parse.ts
- main.ts
- MathError
- sync.ts
- spec.ts
- arithmetic.ts
- num
- graph/preview.ts
- explain.ts
- spaces.ts
- editor/lists.ts
- svg.ts
- spreadsheet/evaluate.ts
- SchemaEditor
- Rational
- SheetEditor
- laplace.ts
- numerical.ts
- aiPanel.test.ts
- index.ts
- client.ts
- Stroke
- Dove sono le cose
- IdbBoards
- linear.ts
- assistant.ts
- .renderFormat
- linsys.ts
- several.ts
- gantt.ts
- view3d.ts
- search.ts
- editor.test.ts
- logic.ts
- NotesStore
- complex.ts
- namesIn
- localModels.ts
- resize.ts
- statsShown.ts
- Board
- solve.ts
- study.ts
- functions.ts
- graph/file.ts
- probability.ts
- vitest
- distributions.ts
- board/shapes.ts
- schemaBlocks.ts
- SidePanel
- MarkdownEditor
- supabase.ts
- parseSchema
- finite.ts
- 20261004091555_note_condivise.sql
- selection.ts
- tutorial.ts
- odesolve.ts
- graph.ts
- dependencies
- editor/editor.ts
- .constructor
- ui/preview.ts
- conics.ts
- icons.mjs
- formatNumber
- smoke-test.mjs
- Benvenuto in Glifo
- compilerOptions
- board.ts
- toLatex
- .folderItem
- symbolic.ts
- sheet.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- plan.ts
- session-start.sh
- .claude/CLAUDE.md
- blockMove.ts
- tutorial.mjs
- Abbonamenti
- spiegami-qwen.mjs
- Costi
- supabase-stub.sql
- account-test.mjs
- Il database degli account (Supabase)
- tools.ts
- Parser
- spell.test.ts
- touchLog
- createFakeSupabase
- files.ts
- engine.ts
- fake-supabase.mjs
- localLlm
- xlsx.ts
- page.ts
- markdown.ts
- spreadsheet/editor.ts
- Piano per piano
- splitEquals
- boardTouchLog.test.ts
- Glifo – note per Claude
- Field
- Le spiegazioni, come funzionano
- schemaTools.test.ts
- sidePanel.ts
- sql.ts
- devDependencies
- deploy.test.ts
- scripts
- BoardStore
- h
- AccountSync
- SpellClient
- ExplainEvents
- BoardOptions
- numerical.test.ts
- graphNote.test.ts

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 252 edges
2. `MathError` - 151 edges
3. `num()` - 145 edges
4. `Sheet` - 139 edges
5. `MathNode` - 129 edges
6. `mul()` - 124 edges
7. `Board` - 118 edges
8. `compile()` - 113 edges
9. `Rational` - 111 edges
10. `toLatex()` - 103 edges

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

## Communities (142 total, 28 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.15
Nodes (15): at(), browserStore, clip(), KINDS, LOG_KEY, Moves, MOVES_MAX, pointerDetail() (+7 more)

### Community 1 - "parse.ts"
Cohesion: 0.07
Nodes (40): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe(), differentialInFraction() (+32 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (96): ExplainTone, account, ACCOUNT_OFF, active, aiToggle, app, applySpellcheck(), applyTheme() (+88 more)

### Community 3 - "MathError"
Cohesion: 0.05
Nodes (95): conicItems(), integralRegion, LayeredSolid, criticalLine(), named(), severalItems(), surface(), areaFor() (+87 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (36): withLock(), Account, EMPTY_STATE, FolderChange, FolderRow, isEmpty(), iso(), LocalChange (+28 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (104): isConicLine(), quadricEquation(), fourierItems(), isFourierLine(), onlyComplex(), isTestLine(), isNumericalLine(), numericalItems() (+96 more)

### Community 6 - "arithmetic.ts"
Cohesion: 0.09
Nodes (50): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+42 more)

### Community 7 - "num"
Cohesion: 0.10
Nodes (112): atIntegers(), signsUp(), symbolicCoefficient(), withoutAbs(), exp(), hyperbolicToExp(), inverseRational(), sqrtEx() (+104 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (47): addLabel(), boxes, cameras, complexCoord(), containing(), coord(), drawings, drawnViews (+39 more)

### Community 9 - "explain.ts"
Cohesion: 0.10
Nodes (35): ChatFn, Conversation, converse(), explain(), EXPLAIN_TONES, ExplainError, ExplainKind, explainTopic (+27 more)

### Community 10 - "spaces.ts"
Cohesion: 0.13
Nodes (23): decimalSeparator(), Digits, formatRational(), fromNumber(), fromRational(), SUPERSCRIPT, writeDigits(), Eigenvalue (+15 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.08
Nodes (70): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+62 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (56): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), dataWindow(), domainEdge() (+48 more)

### Community 13 - "spreadsheet/evaluate.ts"
Cohesion: 0.08
Nodes (41): CellResult, EMPTY, evaluateSheet(), number(), SheetEvaluator, hide(), OPEN, sheetsForFile() (+33 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.11
Nodes (4): isLanes(), SchemaEditor, withLaneContents(), serializeSchema()

### Community 15 - "Rational"
Cohesion: 0.11
Nodes (20): expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactRandom, exactRoot(), factorialExact() (+12 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (5): rangeLabel(), SheetEditor, sheetSize(), CellRange, cloneSheet()

### Community 17 - "laplace.ts"
Cohesion: 0.12
Nodes (40): factoredPolynomial(), absOf(), boundsOf(), close(), definite(), fourierProblem, fourierShown(), isTrig() (+32 more)

### Community 18 - "numerical.ts"
Cohesion: 0.08
Nodes (62): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Funzionalità (+54 more)

### Community 19 - "aiPanel.test.ts"
Cohesion: 0.11
Nodes (14): theoremTopic(), NoteSubject, AiPanel, fakeModel(), FLOW, GRAPH_FIXED, GRAPH_STEPS, NOTE (+6 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (42): b, bigops, c, calculus, fn, fr, fractions, functions (+34 more)

### Community 21 - "client.ts"
Cohesion: 0.12
Nodes (13): Backend, pageBackend(), SpellClientOptions, workerBackend(), WorkerUnavailable, download(), fetchDictionary(), FILES (+5 more)

### Community 22 - "Stroke"
Cohesion: 0.14
Nodes (4): inkName(), shapeSvg(), shapePoints(), Stroke

### Community 23 - "Dove sono le cose"
Cohesion: 0.11
Nodes (37): Dove sono le cose, Glifo – architettura, ATTRIBUTES, count(), cut(), definedName(), ER_SHAPES, fieldText() (+29 more)

### Community 24 - "IdbBoards"
Cohesion: 0.07
Nodes (13): BoardBackend, done(), fromRecord(), IdbBoards, MemoryBoards, ofNote(), openBoardDatabase(), openDefault() (+5 more)

### Community 25 - "linear.ts"
Cohesion: 0.09
Nodes (63): angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, dataOf(), determinant() (+55 more)

### Community 26 - "assistant.ts"
Cohesion: 0.10
Nodes (28): AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible(), askThroughHost() (+20 more)

### Community 27 - ".renderFormat"
Cohesion: 0.18
Nodes (12): fieldInput(), createEdgeCell(), edgeLook(), edgeStyle(), edgeTextAt(), insertSchema(), nodeLook(), nodeStyle() (+4 more)

### Community 28 - "linsys.ts"
Cohesion: 0.14
Nodes (41): choices(), gcd(), matrixEquation(), matrixSystem(), minorsGcd(), ONE, parametricRows(), parametricSystem() (+33 more)

### Community 29 - "several.ts"
Cohesion: 0.08
Nodes (59): Piece, exText(), Condition, Family, Group, Root, Shape, convergesAt() (+51 more)

### Community 30 - "gantt.ts"
Cohesion: 0.06
Nodes (70): amount(), barColor(), crossings(), dateText(), dayOf(), fitText(), GanttOptions, ganttSvg() (+62 more)

### Community 31 - "view3d.ts"
Cohesion: 0.06
Nodes (84): addMesh(), addTet(), affinePlane(), Axis, Box, centroid(), clipBy(), clipPolygon() (+76 more)

### Community 32 - "search.ts"
Cohesion: 0.17
Nodes (24): editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex() (+16 more)

### Community 33 - "editor.test.ts"
Cohesion: 0.08
Nodes (23): tabOutOfMath(), templateInsertion(), commandTokenAt(), isInCode(), mathContextAt(), openMathBefore(), addPlaceholders, buildDecorations() (+15 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "NotesStore"
Cohesion: 0.05
Nodes (49): accountSpace(), adoptGuestNotes(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf(), setCurrentAccount() (+41 more)

### Community 36 - "complex.ts"
Cohesion: 0.06
Nodes (69): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexLine(), isComplexValue() (+61 more)

### Community 37 - "namesIn"
Cohesion: 0.13
Nodes (38): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+30 more)

### Community 38 - "localModels.ts"
Cohesion: 0.17
Nodes (19): @mlc-ai/web-llm, chat(), GlifoError, Gpu, load(), post(), remove(), scope (+11 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "statsShown.ts"
Cohesion: 0.18
Nodes (30): check(), correlation(), count(), covariance(), Data, dataStatistic(), deviation(), fail() (+22 more)

### Community 41 - "Board"
Cohesion: 0.09
Nodes (14): Board, clampZoom(), coalesced(), EraseAction, Finger, LassoAction, MoveAction, pointsOf() (+6 more)

### Community 42 - "solve.ts"
Cohesion: 0.16
Nodes (25): splitRoot(), surdText(), isStandardUnknown(), linearSystem(), breaks(), cubeRoot(), equation(), holds() (+17 more)

### Community 43 - "study.ts"
Cohesion: 0.17
Nodes (32): nameLatex(), Asymptote, compiled(), cutsOf(), defined(), domainOf(), exact(), inDomain() (+24 more)

### Community 44 - "functions.ts"
Cohesion: 0.11
Nodes (47): addFormat(), boolArg(), BY_NAME, callFunction(), compareValues(), conditional(), criterion(), Ctx (+39 more)

### Community 45 - "graph/file.ts"
Cohesion: 0.09
Nodes (36): FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsFromFile(), hide(), OPEN (+28 more)

### Community 46 - "probability.ts"
Cohesion: 0.12
Nodes (24): End, Family, Interval, ExactScope, RelOp, ALL, complement(), endAt() (+16 more)

### Community 47 - "vitest"
Cohesion: 0.07
Nodes (35): vitest, staticGraphSvg(), chooseWindow(), chooseBox(), GraphItem, parseGraph(), DrawOptions, PALETTES (+27 more)

### Community 48 - "distributions.ts"
Cohesion: 0.07
Nodes (61): addExp(), choose(), continuousQuantile(), discreteQuantile(), Distribution, exactIntervalProbability(), factorialBig(), FAMILIES (+53 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (35): DrawAction, adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners() (+27 more)

### Community 50 - "schemaBlocks.ts"
Cohesion: 0.10
Nodes (20): BlockWidget, findWidgetBlocks(), guardBlocks(), KINDS, schemaBlocks(), WidgetBlock, WidgetKind, graphsForFile() (+12 more)

### Community 51 - "SidePanel"
Cohesion: 0.18
Nodes (5): formulaAtCursor(), isConfidentAnswer(), displayCode(), preventFocusSteal(), SidePanel

### Community 52 - "MarkdownEditor"
Cohesion: 0.10
Nodes (20): closeMathBlockOnEnter(), EditorCallbacks, MarkdownEditor, insertBlock(), InsertOptions, insertTemplate(), toggleLinePrefix(), wrapSelection() (+12 more)

### Community 53 - "supabase.ts"
Cohesion: 0.12
Nodes (32): @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken(), ensureSessionOf() (+24 more)

### Community 54 - "parseSchema"
Cohesion: 0.10
Nodes (26): readSchema(), schemaSummary(), svg(), GraphLook, hide(), OPEN, schemasForFile(), schemasFromFile() (+18 more)

### Community 55 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "selection.ts"
Cohesion: 0.09
Nodes (39): centerOn(), copyStrokes(), cross(), IDENTITY, insideLasso(), keepInside(), LASSO_SHARE, lassoed() (+31 more)

### Community 58 - "tutorial.ts"
Cohesion: 0.15
Nodes (14): helpButton, openGuide(), HINT_MS, markSeen(), openTutorial(), show(), richText(), showTutorialHint() (+6 more)

### Community 59 - "odesolve.ts"
Cohesion: 0.09
Nodes (65): linearIn(), addWave(), arrange(), cauchy(), compiled(), constantNames(), equalities(), factorial() (+57 more)

### Community 60 - "graph.ts"
Cohesion: 0.05
Nodes (42): @maxgraph/core, AT_X, cellHtml(), cellText(), COMPASS, createGraph(), drawSchema(), isEdgeLook() (+34 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "editor/editor.ts"
Cohesion: 0.06
Nodes (43): description, name, private, type, version, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands (+35 more)

### Community 64 - "ui/preview.ts"
Cohesion: 0.10
Nodes (15): GraphLabels, BlockKind, MoveDir, fill(), hydrateSchemas(), hydrateSheets(), BLOCK_NAMES, blockKindOf() (+7 more)

### Community 65 - "conics.ts"
Cohesion: 0.18
Nodes (29): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+21 more)

### Community 67 - "formatNumber"
Cohesion: 0.09
Nodes (38): number(), testItems(), classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX, Line (+30 more)

### Community 68 - "smoke-test.mjs"
Cohesion: 0.29
Nodes (4): markdown-it, fakeLlmWorker(), firstVisit(), plainContext

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "board.ts"
Cohesion: 0.07
Nodes (43): Action, ACTION_NAMES, DOT_SIZES, EraserMode, HANDLE_REACH, ICON, MODE_NAMES, PanAction (+35 more)

### Community 72 - "toLatex"
Cohesion: 0.10
Nodes (35): FieldContext, names(), STUDY_GRAPH, studyItems(), Scope, numericCoefficients(), partialSum(), ACCENT_COMMANDS (+27 more)

### Community 73 - ".folderItem"
Cohesion: 0.20
Nodes (4): clear(), formatDate(), NotesPanel, NotesPanelDeps

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (54): primitive(), verified(), linearCells(), atValues(), Converter, coordinates(), decimalText(), definiteParts() (+46 more)

### Community 75 - "sheet.ts"
Cohesion: 0.05
Nodes (58): numericPartials(), ExactComplexScope, Ode, OdeFunction, expSumValue(), withWorkLimit(), ExactFunction, FiniteContext (+50 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.04
Nodes (62): ALIGN, ARROW_NAMES, AT_ICONS, AT_NAMES, BASE_PRESETS, BIG_ARROWS, DB_PRESETS, Direction (+54 more)

### Community 79 - "plan.ts"
Cohesion: 0.08
Nodes (42): at(), breakEven(), dataLine(), dataRange(), Point, quantity(), tableItems(), textLabel() (+34 more)

### Community 82 - "blockMove.ts"
Cohesion: 0.11
Nodes (33): blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove, blockPlace(), closed() (+25 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.12
Nodes (10): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+2 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.08
Nodes (24): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Deciso (5 ottobre 2026), Deciso (5 ottobre 2026) (+16 more)

### Community 91 - "spiegami-qwen.mjs"
Cohesion: 0.29
Nodes (4): vite, minutes, postMessage(), started

### Community 92 - "Costi"
Cohesion: 0.13
Nodes (12): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, Quando lo studente dice di cominciare, Account: i propri appunti su ogni dispositivo, anche da condividere, Idee per il futuro (+4 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.20
Nodes (4): device(), login(), newContext, waitFor()

### Community 97 - "Il database degli account (Supabase)"
Cohesion: 0.17
Nodes (11): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Nell'app, Note condivise con un link (+3 more)

### Community 98 - "tools.ts"
Cohesion: 0.14
Nodes (13): ExplainStep, ALL_TOOLS, callOf(), checkTool, FormulaCheck, Identities, looseJson(), repairTex() (+5 more)

### Community 101 - "spell.test.ts"
Cohesion: 0.08
Nodes (21): @codemirror/lang-markdown, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt() (+13 more)

### Community 102 - "touchLog"
Cohesion: 0.28
Nodes (4): movesLine(), seconds(), touchLog, writingLine()

### Community 103 - "createFakeSupabase"
Cohesion: 0.60
Nodes (6): createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 104 - "files.ts"
Cohesion: 0.24
Nodes (13): inClaudeViewer(), canWriteFilesDirectly(), FsWindow, isAbort(), MD_TYPES, OPEN_TYPES, OpenedFile, openMarkdownFiles() (+5 more)

### Community 105 - "engine.ts"
Cohesion: 0.20
Nodes (9): @farscrl/hunspell-wasm, capitalize(), COMMON_FIXES, ELISIONS, inGlossary(), lower(), SpellEngine, GLOSSARY (+1 more)

### Community 106 - "fake-supabase.mjs"
Cohesion: 0.25
Nodes (6): @electric-sql/pglite, b64(), CODE, GOOGLE_CODE, ROOT, SUPABASE_URL

### Community 107 - "localLlm"
Cohesion: 0.23
Nodes (6): localErrorMessage(), localLlm, Pending, LoadProgress, localModel, fakeModel()

### Community 108 - "xlsx.ts"
Cohesion: 0.08
Nodes (55): RFC-4180, fflate, csvDelimiter(), csvToSheet(), field(), italian(), parseCsv(), sheetToCsv() (+47 more)

### Community 110 - "page.ts"
Cohesion: 0.05
Nodes (51): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), currentAccount(), PullResult, sidebarToggle(), openShareDialog() (+43 more)

### Community 113 - "markdown.ts"
Cohesion: 0.05
Nodes (50): Explanation, LocalAbort, modelName(), valueNode(), explanationMarkdown(), insertAfterText(), markMoves(), moveAttrs() (+42 more)

### Community 116 - "spreadsheet/editor.ts"
Cohesion: 0.09
Nodes (50): sheetSummary(), tablesNote(), currentCall(), Editing, MenuEntry, Move, openSheetEditor(), PATHS (+42 more)

### Community 117 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 118 - "splitEquals"
Cohesion: 0.29
Nodes (13): allNames(), checkSteps(), checkTopicFormula(), checkTopicSteps(), engineHints(), formulaNames(), integralsIn(), parsed() (+5 more)

### Community 119 - "boardTouchLog.test.ts"
Cohesion: 0.20
Nodes (8): isSaved(), LOG_MAX_LINES, LogStore, SavedLog, clock(), memoryStore(), newLog(), texts()

### Community 120 - "Glifo – note per Claude"
Cohesion: 0.22
Nodes (9): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole (+1 more)

### Community 121 - "Field"
Cohesion: 0.13
Nodes (5): eigenvalues(), Field, interpolate(), interpolateFloat(), polynomialIn()

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "schemaTools.test.ts"
Cohesion: 0.20
Nodes (13): alignBoxes(), Alignment, Box, distributeBoxes(), Position, base64(), crc32(), svgSize() (+5 more)

### Community 124 - "sidePanel.ts"
Cohesion: 0.11
Nodes (16): EditorMathContext, expand(), preferredIndex(), SuggestionController, SuggestionItem, CATEGORIES, cardPreviewTex(), formPreviewTex() (+8 more)

### Community 125 - "sql.ts"
Cohesion: 0.17
Nodes (17): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+9 more)

### Community 126 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

### Community 127 - "deploy.test.ts"
Cohesion: 0.28
Nodes (4): vite-plugin-pwa, accountOffMessage(), Site, defineFor()

### Community 128 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 129 - "BoardStore"
Cohesion: 0.18
Nodes (3): BoardStore, applyAccountChange(), backup()

### Community 131 - "h"
Cohesion: 0.07
Nodes (48): SyncStatus, planName(), accountProblem(), board, downloadAccountData(), viewSwitch, openSignedOut(), printButton() (+40 more)

### Community 136 - "ExplainEvents"
Cohesion: 0.33
Nodes (3): ExplainEvents, ToolCall, scripted()

### Community 138 - "numerical.test.ts"
Cohesion: 0.60
Nodes (3): result(), text(), verdict()

### Community 141 - "graphNote.test.ts"
Cohesion: 0.06
Nodes (52): @codemirror/language, @codemirror/state, @codemirror/view, @lezer/common, explainTarget, schemaTitle(), acceptCalcResult(), CalcCheck (+44 more)

## Knowledge Gaps
- **657 isolated node(s):** `Condividere una nota con un link`, `Provarlo sul tuo computer`, `Assistente AI`, `Spiegami (in prova)`, `Compatibilità con VS Code` (+652 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 912 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **28 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `touchlog.ts`, `BoardStore`, `main.ts`, `MathError`, `parse.ts`, `spec.ts`, `arithmetic.ts`, `num`, `graph/preview.ts`, `explain.ts`, `h`, `svg.ts`, `graphNote.test.ts`, `SchemaEditor`, `spreadsheet/evaluate.ts`, `SheetEditor`, `laplace.ts`, `numerical.ts`, `aiPanel.test.ts`, `Stroke`, `linear.ts`, `assistant.ts`, `.renderFormat`, `linsys.ts`, `several.ts`, `gantt.ts`, `view3d.ts`, `logic.ts`, `NotesStore`, `complex.ts`, `namesIn`, `localModels.ts`, `Board`, `study.ts`, `functions.ts`, `graph/file.ts`, `vitest`, `distributions.ts`, `board/shapes.ts`, `schemaBlocks.ts`, `SidePanel`, `MarkdownEditor`, `supabase.ts`, `finite.ts`, `selection.ts`, `tutorial.ts`, `odesolve.ts`, `graph.ts`, `ui/preview.ts`, `conics.ts`, `formatNumber`, `smoke-test.mjs`, `toLatex`, `symbolic.ts`, `sheet.ts`, `schema/editor.ts`, `plan.ts`, `blockMove.ts`, `touchLog`, `files.ts`, `localLlm`, `xlsx.ts`, `page.ts`, `markdown.ts`, `spreadsheet/editor.ts`, `splitEquals`, `boardTouchLog.test.ts`, `schemaTools.test.ts`, `deploy.test.ts`?**
  _High betweenness centrality (0.159) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `touchlog.ts`, `parse.ts`, `main.ts`, `h`, `sync.ts`, `MathError`, `num`, `graph/preview.ts`, `explain.ts`, `numerical.test.ts`, `editor/lists.ts`, `svg.ts`, `graphNote.test.ts`, `aiPanel.test.ts`, `IdbBoards`, `linear.ts`, `assistant.ts`, `linsys.ts`, `gantt.ts`, `view3d.ts`, `search.ts`, `editor.test.ts`, `NotesStore`, `localModels.ts`, `resize.ts`, `distributions.ts`, `board/shapes.ts`, `schemaBlocks.ts`, `supabase.ts`, `parseSchema`, `selection.ts`, `tutorial.ts`, `editor/editor.ts`, `board.ts`, `sheet.ts`, `plan.ts`, `blockMove.ts`, `spell.test.ts`, `xlsx.ts`, `page.ts`, `markdown.ts`, `spreadsheet/editor.ts`, `boardTouchLog.test.ts`, `schemaTools.test.ts`, `sidePanel.ts`, `sql.ts`, `deploy.test.ts`?**
  _High betweenness centrality (0.114) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `main.ts`, `graph/preview.ts`, `SchemaEditor`, `SheetEditor`, `aiPanel.test.ts`, `Stroke`, `.renderFormat`, `gantt.ts`, `NotesStore`, `resize.ts`, `SidePanel`, `MarkdownEditor`, `tutorial.ts`, `.constructor`, `ui/preview.ts`, `board.ts`, `.folderItem`, `schema/editor.ts`, `spell.test.ts`, `page.ts`, `markdown.ts`, `spreadsheet/editor.ts`, `sidePanel.ts`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **Are the 251 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `adoptGuestNotes()`) actually correct?**
  _`Dove sono le cose` has 251 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Condividere una nota con un link`, `Provarlo sul tuo computer`, `Assistente AI` to the rest of the system?**
  _657 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `parse.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0744792762465811 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04232057838123788 - nodes in this community are weakly interconnected._