# Graph Report - matherdown  (2026-10-06)

## Corpus Check
- 267 files · ~516,465 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 4411 nodes · 15900 edges · 132 communities (106 shown, 26 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 475 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `01359f57`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- touchlog.ts
- Parser
- main.ts
- odesolve.ts
- sync.ts
- spec.ts
- several.ts
- num
- graph/preview.ts
- toLatex
- complex.ts
- editor/lists.ts
- svg.ts
- spreadsheet/editor.ts
- SchemaEditor
- conics.ts
- SheetEditor
- compile
- numerical.ts
- markdown.ts
- index.ts
- engine.ts
- Board
- distributions.ts
- store.ts
- MathError
- statsGraph.ts
- assistant.ts
- parse.ts
- dialogs.ts
- inference.ts
- view3d.ts
- spreadsheet/evaluate.ts
- calcResults.ts
- logic.ts
- FoldersStore
- arithmetic.ts
- fields.ts
- schemaBlocks.ts
- resize.ts
- sheet.ts
- sidePanel.ts
- NotesStore
- study.ts
- functions.ts
- domain.ts
- board.ts
- MathNode
- probability.ts
- board/shapes.ts
- laplace.ts
- FormattedResult
- search.ts
- h
- .renderFormat
- finite.ts
- 20261004091555_note_condivise.sql
- schemaTools.test.ts
- Field
- grafo-html.mjs
- graph.ts
- dependencies
- supabase.ts
- Le spiegazioni, come funzionano
- ui/preview.ts
- Stroke
- schema/file.ts
- Sheet
- spreadsheet/file.ts
- Benvenuto in Glifo
- compilerOptions
- selection.ts
- Piano per piano
- blockMove.ts
- symbolic.ts
- .sameAs
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- limits.ts
- session-start.sh
- .claude/CLAUDE.md
- editor.test.ts
- tutorial.mjs
- Abbonamenti
- BoardStore
- Costi
- supabase-stub.sql
- account-test.mjs
- Il database degli account (Supabase)
- package.json
- Parser
- touchLog
- SuggestionController
- editor/editor.ts
- math/calculus.ts
- boardTouchLog.test.ts
- fake-supabase.mjs
- storage.test.ts
- files.ts
- Glifo – note per Claude
- page.ts
- .openMenu
- toolbar.ts
- graph/file.ts
- linsys.ts
- Rational
- @codemirror/state
- renderTex
- sql.ts
- logo.ts
- Glifo
- smoke-test.mjs

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 167 edges
2. `MathError` - 151 edges
3. `num()` - 145 edges
4. `Sheet` - 129 edges
5. `MathNode` - 128 edges
6. `mul()` - 124 edges
7. `Board` - 118 edges
8. `compile()` - 113 edges
9. `Rational` - 111 edges
10. `toLatex()` - 101 edges

## Surprising Connections (you probably didn't know these)
- `Dove sono le cose` --references--> `WidgetKind`  [INFERRED]
  ARCHITETTURA.md → src/editor/schemaBlocks.ts
- `Dove sono le cose` --references--> `ConicElements`  [INFERRED]
  ARCHITETTURA.md → src/math/conics.ts
- `Funzionalità` --references--> `k()`  [INFERRED]
  README.md → src/math/numerical.ts
- `Come viene pubblicata` --references--> `dist()`  [INFERRED]
  README.md → src/board/shapes.ts
- `Dove sono le cose` --references--> `adoptGuestNotes()`  [INFERRED]
  ARCHITETTURA.md → src/account/space.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (132 total, 26 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.14
Nodes (16): at(), browserStore, clip(), KINDS, LOG_KEY, Moves, MOVES_MAX, pointerDetail() (+8 more)

### Community 2 - "main.ts"
Cohesion: 0.05
Nodes (86): newStrokeId(), graphsForFile(), hide(), remapGraphLines(), account, active, app, applyAccountChange() (+78 more)

### Community 3 - "odesolve.ts"
Cohesion: 0.08
Nodes (78): primed(), linearIn(), termTransform(), addWave(), arrange(), cauchy(), characteristicRoots(), compiled() (+70 more)

### Community 4 - "sync.ts"
Cohesion: 0.05
Nodes (39): @electric-sql/pglite, AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow (+31 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (102): Dove sono le cose, Glifo – architettura, formulaAtCursor(), GraphLabelLines, insertGraphBlock(), setGraphLabels(), mathRegionAt(), isComplexLine() (+94 more)

### Community 6 - "several.ts"
Cohesion: 0.06
Nodes (84): criticalLine(), named(), severalItems(), surface(), EMPTY_SCOPE, elemOf(), absOf(), boundsOf() (+76 more)

### Community 7 - "num"
Cohesion: 0.13
Nodes (86): atIntegers(), withoutAbs(), hyperbolicToExp(), polyEx(), bernoulliFamily(), expOf(), invert(), mobius() (+78 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (44): addLabel(), boxes, cameras, complexCoord(), containing(), coord(), drawings, drawnViews (+36 more)

### Community 9 - "toLatex"
Cohesion: 0.05
Nodes (56): vitest, conicItems(), isConicLine(), quadricEquation(), fourierItems(), isFourierLine(), formulaGraph(), GraphItem (+48 more)

### Community 10 - "complex.ts"
Cohesion: 0.06
Nodes (64): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexValue(), isInequality() (+56 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.11
Nodes (52): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+44 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (50): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseWindow(), chooseY(), clipLines(), domainEdge() (+42 more)

### Community 13 - "spreadsheet/editor.ts"
Cohesion: 0.06
Nodes (73): currentCall(), Editing, MenuEntry, Move, openSheetEditor(), PATHS, rangeLabel(), SheetEditorOptions (+65 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.11
Nodes (4): SchemaEditor, createEdgeCell(), EdgeLook, serializeSchema()

### Community 15 - "conics.ts"
Cohesion: 0.18
Nodes (29): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+21 more)

### Community 16 - "SheetEditor"
Cohesion: 0.09
Nodes (7): SheetEditor, serializeSheet(), sheetSize(), CellRange, clearRange(), cloneSheet(), setCell()

### Community 17 - "compile"
Cohesion: 0.08
Nodes (44): areaFor(), constantValue(), close(), Definite, definiteIntegral(), exValue(), samples(), Interval (+36 more)

### Community 18 - "numerical.ts"
Cohesion: 0.12
Nodes (46): bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial(), interpolating() (+38 more)

### Community 19 - "markdown.ts"
Cohesion: 0.12
Nodes (31): bulletGroup(), sameList(), checkHtml(), checkTitle(), escapeHtml(), renderTexOrError(), renderTexWithResult(), alignInside() (+23 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (41): b, bigops, c, calculus, fn, fr, fractions, functions (+33 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "Board"
Cohesion: 0.08
Nodes (8): Board, clampZoom(), pointsOf(), pressureOf(), sizeChoice(), validView(), highlightName(), inkName()

### Community 23 - "distributions.ts"
Cohesion: 0.12
Nodes (34): addExp(), choose(), continuousQuantile(), discreteQuantile(), exactIntervalProbability(), expSumValue(), factorialBig(), FAMILIES (+26 more)

### Community 24 - "store.ts"
Cohesion: 0.08
Nodes (15): fake-indexeddb, BoardBackend, done(), fromRecord(), IdbBoards, MemoryBoards, ofNote(), openBoardDatabase() (+7 more)

### Community 25 - "MathError"
Cohesion: 0.11
Nodes (58): valueLabel(), MathError, formatNumber(), angleBetween(), asMatrix(), basisOf(), circleText(), complexText() (+50 more)

### Community 26 - "statsGraph.ts"
Cohesion: 0.22
Nodes (15): isTestLine(), number(), testItems(), classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX (+7 more)

### Community 27 - "assistant.ts"
Cohesion: 0.10
Nodes (26): AiAnswer, AiError, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible(), askThroughHost(), checkShape() (+18 more)

### Community 28 - "parse.ts"
Cohesion: 0.06
Nodes (38): hasWord(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, differentialInFraction() (+30 more)

### Community 29 - "dialogs.ts"
Cohesion: 0.08
Nodes (32): AI_SERVICES, board, ACCOUNT_SETTINGS, accountSettings(), AI_MODELS, DEFAULT_SETTINGS, loadSettings(), saveSettings() (+24 more)

### Community 30 - "inference.ts"
Cohesion: 0.11
Nodes (29): Distribution, chiSquareTest(), confidence(), confidenceShown(), Given, hypothesisTest(), InferenceContext, interval() (+21 more)

### Community 31 - "view3d.ts"
Cohesion: 0.06
Nodes (93): staticGraphSvg(), sampleRegion(), tickLabel(), addMesh(), addTet(), affinePlane(), Axis, Box (+85 more)

### Community 32 - "spreadsheet/evaluate.ts"
Cohesion: 0.10
Nodes (33): EMPTY, evaluateSheet(), number(), SheetEvaluator, addFormat(), decimalsOf(), divFormat(), fixedNumber() (+25 more)

### Community 33 - "calcResults.ts"
Cohesion: 0.12
Nodes (13): acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult, calcResults(), CheckWidget, formulasUntil() (+5 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "FoldersStore"
Cohesion: 0.07
Nodes (20): Deletion, DeletionLog, cleanFolderName(), Folder, FolderGroup, FoldersStore, groupByFolder(), loadClosedFolders() (+12 more)

### Community 36 - "arithmetic.ts"
Cohesion: 0.10
Nodes (46): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+38 more)

### Community 37 - "fields.ts"
Cohesion: 0.14
Nodes (32): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+24 more)

### Community 38 - "schemaBlocks.ts"
Cohesion: 0.10
Nodes (22): @codemirror/view, InsertOptions, toggleLinePrefix(), LIST_STYLES, addPlaceholders, Placeholder, besideSchema(), BlockWidget (+14 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "sheet.ts"
Cohesion: 0.08
Nodes (56): numericPartials(), ExactFunction, dataOf(), Lin, statisticOf(), NUMERICAL, bracketParts(), BRACKETS (+48 more)

### Community 41 - "sidePanel.ts"
Cohesion: 0.13
Nodes (21): AiResult, expand(), preferredIndex(), SuggestionItem, cache, TexRender, isConfidentAnswer(), CATEGORIES (+13 more)

### Community 42 - "NotesStore"
Cohesion: 0.09
Nodes (28): accountSpace(), adoptGuestNotes(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf(), setCurrentAccount() (+20 more)

### Community 43 - "study.ts"
Cohesion: 0.12
Nodes (39): names(), STUDY_GRAPH, studyItems(), limit(), splitRoot(), breaks(), periodOf(), Asymptote (+31 more)

### Community 44 - "functions.ts"
Cohesion: 0.11
Nodes (46): FormulaNode, boolArg(), BY_NAME, callFunction(), conditional(), criterion(), Ctx, define() (+38 more)

### Community 45 - "domain.ts"
Cohesion: 0.11
Nodes (39): depth(), integralRegion, LayeredSolid, Multiple, planeMargin(), radiusOf(), spaceLayers(), spaceMargin() (+31 more)

### Community 46 - "board.ts"
Cohesion: 0.05
Nodes (50): Action, ACTION_NAMES, BoardOptions, coalesced(), DOT_SIZES, DrawAction, EraseAction, EraserMode (+42 more)

### Community 47 - "MathNode"
Cohesion: 0.13
Nodes (11): Definition, Line, ExactComplexScope, Ode, Elem, FiniteContext, differentialRequest, pieces() (+3 more)

### Community 48 - "probability.ts"
Cohesion: 0.13
Nodes (25): End, Family, compare(), compileCondition(), ExactScope, fractionNear(), ALL, complement() (+17 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (35): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+27 more)

### Community 50 - "laplace.ts"
Cohesion: 0.10
Nodes (54): factoredPolynomial(), isTrig(), linearTrig(), oneFraction(), beyondPoles(), compiled(), E, exp() (+46 more)

### Community 51 - "FormattedResult"
Cohesion: 0.25
Nodes (4): withWorkLimit(), FormattedResult, styleOf(), needsSymbols()

### Community 52 - "search.ts"
Cohesion: 0.17
Nodes (23): editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex() (+15 more)

### Community 53 - "h"
Cohesion: 0.09
Nodes (35): SyncStatus, viewSwitch, openSignedOut(), printButton(), AccountButton, confirmAccountDeletion(), messageOf(), openAccountDialog() (+27 more)

### Community 54 - ".renderFormat"
Cohesion: 0.14
Nodes (15): fieldInput(), textWidth(), cellText(), edgeLook(), edgeStyle(), edgeTextAt(), isEdgeLook(), isNodeLook() (+7 more)

### Community 55 - "finite.ts"
Cohesion: 0.19
Nodes (25): countOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError, FiniteResult, finiteSetOf() (+17 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "schemaTools.test.ts"
Cohesion: 0.16
Nodes (17): alignBoxes(), Alignment, Box, distributeBoxes(), Position, base64(), crc32(), svgSize() (+9 more)

### Community 58 - "Field"
Cohesion: 0.11
Nodes (8): characteristicPolynomial(), eigenvectors(), Field, formatPolynomial(), interpolate(), maxSize(), polynomialIn(), tolerance()

### Community 59 - "grafo-html.mjs"
Cohesion: 0.17
Nodes (5): graphFile, names, namesFile, root, PNG_ICONS

### Community 60 - "graph.ts"
Cohesion: 0.06
Nodes (34): @maxgraph/core, AT_X, cellHtml(), COMPASS, createGraph(), drawSchema(), insertSchema(), loadSchema() (+26 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (24): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+16 more)

### Community 62 - "supabase.ts"
Cohesion: 0.11
Nodes (36): @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken(), ensureSessionOf() (+28 more)

### Community 63 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 64 - "ui/preview.ts"
Cohesion: 0.08
Nodes (25): GraphLabels, remapLineKeys(), renameGraphScope(), renameScopeKeys(), BlockKind, MoveDir, draw(), drawCached() (+17 more)

### Community 65 - "Stroke"
Cohesion: 0.24
Nodes (5): Step, BoardChange, BoardData, Box, Stroke

### Community 66 - "schema/file.ts"
Cohesion: 0.21
Nodes (10): svg(), SchemaEditorOptions, hide(), OPEN, schemasForFile(), schemasFromFile(), unhide(), Schema (+2 more)

### Community 67 - "Sheet"
Cohesion: 0.09
Nodes (28): sheetBefore(), Sheet, splitPieces(), withoutDots(), text(), tex(), text(), check() (+20 more)

### Community 68 - "spreadsheet/file.ts"
Cohesion: 0.47
Nodes (5): hide(), OPEN, sheetsForFile(), sheetsFromFile(), unhide()

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "selection.ts"
Cohesion: 0.09
Nodes (39): centerOn(), copyStrokes(), cross(), handleScale(), IDENTITY, insideLasso(), keepInside(), LASSO_SHARE (+31 more)

### Community 72 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 73 - "blockMove.ts"
Cohesion: 0.11
Nodes (34): blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove, blockPlace(), closed() (+26 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (60): linearCells(), pairUp(), atValues(), cancelLinear(), combine(), commonMonomial(), Converter, coordinates() (+52 more)

### Community 75 - ".sameAs"
Cohesion: 0.14
Nodes (9): chainOf(), close(), definitionTarget(), digitsMatch(), isLiteral(), parseCached(), walk(), writtenDecimals() (+1 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.04
Nodes (67): schemaSummary(), GraphLook, ALIGN, ARROW_NAMES, AT_ICONS, AT_NAMES, BASE_PRESETS, BIG_ARROWS (+59 more)

### Community 79 - "limits.ts"
Cohesion: 0.20
Nodes (17): exponentialForm(), fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), alternating() (+9 more)

### Community 82 - "editor.test.ts"
Cohesion: 0.08
Nodes (27): @lezer/common, tabOutOfMath(), templateInsertion(), CODE_NODES, CommandToken, commandTokenAt(), isInCode(), MATH_NODES (+19 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.20
Nodes (6): centerOf(), clickOn(), ffmpeg, SCENES, SIZE, work

### Community 90 - "Abbonamenti"
Cohesion: 0.09
Nodes (23): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Deciso (5 ottobre 2026), Deciso (5 ottobre 2026) (+15 more)

### Community 92 - "Costi"
Cohesion: 0.13
Nodes (12): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, Quando lo studente dice di cominciare, Account: i propri appunti su ogni dispositivo, anche da condividere, Idee per il futuro (+4 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.20
Nodes (4): device(), login(), newContext, waitFor()

### Community 97 - "Il database degli account (Supabase)"
Cohesion: 0.18
Nodes (10): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Nell'app, Note condivise con un link (+2 more)

### Community 98 - "package.json"
Cohesion: 0.05
Nodes (40): description, devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript (+32 more)

### Community 100 - "Parser"
Cohesion: 0.29
Nodes (3): FormulaError, parseFormula(), Parser

### Community 101 - "touchLog"
Cohesion: 0.31
Nodes (3): movesLine(), seconds(), touchLog

### Community 103 - "editor/editor.ts"
Cohesion: 0.11
Nodes (24): @codemirror/language, @lezer/highlight, highlight, italianPhrases, listMarkers, blockLine, inlineRegion, marks (+16 more)

### Community 104 - "math/calculus.ts"
Cohesion: 0.33
Nodes (12): argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot(), fieldOn(), outward() (+4 more)

### Community 105 - "boardTouchLog.test.ts"
Cohesion: 0.20
Nodes (7): isSaved(), LOG_MAX_LINES, LogStore, SavedLog, clock(), memoryStore(), newLog()

### Community 106 - "fake-supabase.mjs"
Cohesion: 0.22
Nodes (11): b64(), CODE, createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom() (+3 more)

### Community 107 - "storage.test.ts"
Cohesion: 0.42
Nodes (8): applySpellcheck(), setPersonalWords(), wordsChangedHere(), addPersonalWord(), DICTIONARY_KEY, loadPersonalWords(), savePersonalWords(), tidy()

### Community 108 - "files.ts"
Cohesion: 0.21
Nodes (14): inClaudeViewer(), canWriteFilesDirectly(), downloadBlob(), downloadText(), fileNameFor(), FsWindow, isAbort(), MD_TYPES (+6 more)

### Community 109 - "Glifo – note per Claude"
Cohesion: 0.22
Nodes (9): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole (+1 more)

### Community 110 - "page.ts"
Cohesion: 0.06
Nodes (47): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), currentAccount(), PullResult, openShareDialog(), changeAccess() (+39 more)

### Community 113 - "toolbar.ts"
Cohesion: 0.08
Nodes (21): @codemirror/commands, closeMathBlockOnEnter(), EditorCallbacks, MarkdownEditor, insertBlock(), insertTemplate(), wrapSelection(), SidePanelDeps (+13 more)

### Community 116 - "graph/file.ts"
Cohesion: 0.09
Nodes (40): addToGraphBlock(), FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsFromFile(), OPEN (+32 more)

### Community 117 - "linsys.ts"
Cohesion: 0.07
Nodes (73): decimalSeparator(), Digits, FormatOptions, formatRational(), fromNumber(), fromRational(), SUPERSCRIPT, writeDigits() (+65 more)

### Community 121 - "Rational"
Cohesion: 0.10
Nodes (26): Part, expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactRandom, exactRoot() (+18 more)

### Community 122 - "@codemirror/state"
Cohesion: 0.07
Nodes (29): @codemirror/lang-markdown, @codemirror/state, noIndentedCode, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck() (+21 more)

### Community 123 - "renderTex"
Cohesion: 0.25
Nodes (5): cleanKatexError(), renderTex(), displayCode(), preventFocusSteal(), SidePanel

### Community 125 - "sql.ts"
Cohesion: 0.17
Nodes (18): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+10 more)

### Community 126 - "logo.ts"
Cohesion: 0.39
Nodes (5): BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark()

### Community 127 - "Glifo"
Cohesion: 0.15
Nodes (13): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Funzionalità (+5 more)

### Community 129 - "smoke-test.mjs"
Cohesion: 0.25
Nodes (5): markdown-it, playwright-core, vite, firstVisit(), plainContext

## Knowledge Gaps
- **593 isolated node(s):** `PATHS`, `Editing`, `Move`, `Moves`, `Writing` (+588 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 822 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **26 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `spec.ts` to `touchlog.ts`, `Parser`, `main.ts`, `odesolve.ts`, `several.ts`, `num`, `graph/preview.ts`, `toLatex`, `complex.ts`, `svg.ts`, `spreadsheet/editor.ts`, `conics.ts`, `SheetEditor`, `numerical.ts`, `markdown.ts`, `Board`, `store.ts`, `MathError`, `assistant.ts`, `parse.ts`, `dialogs.ts`, `inference.ts`, `view3d.ts`, `spreadsheet/evaluate.ts`, `logic.ts`, `arithmetic.ts`, `fields.ts`, `schemaBlocks.ts`, `sheet.ts`, `NotesStore`, `study.ts`, `functions.ts`, `domain.ts`, `board.ts`, `MathNode`, `board/shapes.ts`, `laplace.ts`, `FormattedResult`, `h`, `.renderFormat`, `finite.ts`, `schemaTools.test.ts`, `graph.ts`, `supabase.ts`, `ui/preview.ts`, `Sheet`, `selection.ts`, `blockMove.ts`, `symbolic.ts`, `.sameAs`, `BoardStore`, `Parser`, `touchLog`, `math/calculus.ts`, `toolbar.ts`, `graph/file.ts`, `linsys.ts`?**
  _High betweenness centrality (0.144) - this node is a cross-community bridge._
- **Why does `vitest` connect `toLatex` to `touchlog.ts`, `main.ts`, `sync.ts`, `num`, `editor/lists.ts`, `spreadsheet/editor.ts`, `compile`, `markdown.ts`, `store.ts`, `assistant.ts`, `dialogs.ts`, `view3d.ts`, `FoldersStore`, `schemaBlocks.ts`, `resize.ts`, `sidePanel.ts`, `NotesStore`, `domain.ts`, `board.ts`, `board/shapes.ts`, `laplace.ts`, `search.ts`, `h`, `schemaTools.test.ts`, `supabase.ts`, `ui/preview.ts`, `schema/file.ts`, `Sheet`, `selection.ts`, `blockMove.ts`, `editor.test.ts`, `package.json`, `boardTouchLog.test.ts`, `storage.test.ts`, `page.ts`, `toolbar.ts`, `graph/file.ts`, `Rational`, `@codemirror/state`, `sql.ts`, `logo.ts`?**
  _High betweenness centrality (0.128) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `main.ts`, `graph/preview.ts`, `spreadsheet/editor.ts`, `SchemaEditor`, `SheetEditor`, `Board`, `dialogs.ts`, `FoldersStore`, `resize.ts`, `sidePanel.ts`, `board.ts`, `.renderFormat`, `ui/preview.ts`, `schema/editor.ts`, `page.ts`, `.openMenu`, `toolbar.ts`, `@codemirror/state`, `renderTex`?**
  _High betweenness centrality (0.035) - this node is a cross-community bridge._
- **Are the 166 inferred relationships involving `Dove sono le cose` (e.g. with `adoptGuestNotes()` and `sharedLinks()`) actually correct?**
  _`Dove sono le cose` has 166 INFERRED edges - model-reasoned connections that need verification._
- **What connects `PATHS`, `Editing`, `Move` to the rest of the system?**
  _593 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `touchlog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05239075726378403 - nodes in this community are weakly interconnected._