# Graph Report - matherdown  (2026-10-06)

## Corpus Check
- 250 files · ~484,009 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 4102 nodes · 14683 edges · 127 communities (105 shown, 22 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 433 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9b3c8c2b`
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
- primitive.ts
- graph/preview.ts
- sheet.ts
- complex.ts
- editor/lists.ts
- svg.ts
- parse.ts
- SchemaEditor
- conics.ts
- fourier.ts
- compile
- numerical.ts
- markdown.ts
- index.ts
- engine.ts
- Board
- inference.ts
- store.ts
- MathError
- toLatex
- assistant.ts
- h
- graph.ts
- Pt
- graph/space.ts
- distributions.ts
- graphNote.test.ts
- logic.ts
- FoldersStore
- arithmetic.ts
- namesIn
- probability.ts
- resize.ts
- statsShown.ts
- view3d.ts
- NotesStore
- study.ts
- insert.ts
- laplace.ts
- .constructor
- gauss.ts
- Distribution
- board/shapes.ts
- linsys.ts
- solve.ts
- search.ts
- account.ts
- touchLog
- finite.ts
- 20261004091555_note_condivise.sql
- picture.ts
- Field
- grafo-html.mjs
- schema/shapes.ts
- dependencies
- supabase.ts
- Le spiegazioni, come funzionano
- ui/preview.ts
- boardTouchLog.test.ts
- parseSchema
- MathNode
- dialogs.ts
- Benvenuto in Glifo
- compilerOptions
- Dove sono le cose
- Piano per piano
- blockMove.ts
- symbolic.ts
- devDependencies
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- board.ts
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
- scripts
- schemaTools.test.ts
- BoardOptions
- editor/editor.ts
- fake-supabase.mjs
- createFakeSupabase
- downloadText
- Glifo – note per Claude
- page.ts
- sidePanel.ts
- toolbar.ts
- graph/file.ts
- spaces.ts
- Rational
- spell.test.ts
- renderTex
- sql.ts
- suggestions.ts
- Glifo
- smoke-test.mjs
- icons.mjs

## God Nodes (most connected - your core abstractions)
1. `MathError` - 151 edges
2. `num()` - 145 edges
3. `Dove sono le cose` - 141 edges
4. `Sheet` - 129 edges
5. `MathNode` - 128 edges
6. `mul()` - 124 edges
7. `Board` - 118 edges
8. `compile()` - 113 edges
9. `Rational` - 111 edges
10. `toLatex()` - 101 edges

## Surprising Connections (you probably didn't know these)
- `Come viene pubblicata` --references--> `dist()`  [INFERRED]
  README.md → src/board/shapes.ts
- `Funzionalità` --references--> `k()`  [INFERRED]
  README.md → src/math/numerical.ts
- `Dove sono le cose` --references--> `adoptGuestNotes()`  [INFERRED]
  ARCHITETTURA.md → src/account/space.ts
- `Dove sono le cose` --references--> `shareNote()`  [INFERRED]
  ARCHITETTURA.md → src/account/supabase.ts
- `Dove sono le cose` --references--> `sharedLinks()`  [INFERRED]
  ARCHITETTURA.md → src/account/supabase.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (127 total, 22 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.14
Nodes (16): at(), browserStore, clip(), KINDS, LOG_KEY, Moves, MOVES_MAX, pointerDetail() (+8 more)

### Community 1 - "Parser"
Cohesion: 0.12
Nodes (16): Abbonamento e funzioni a pagamento (da capire), Account: i propri appunti su ogni dispositivo, anche da condividere, Aiuto con gli esercizi, Altre idee, Calcoli e grafici: idee in più, Idee per il futuro, In programma, La lavagna: idee in più (+8 more)

### Community 2 - "main.ts"
Cohesion: 0.05
Nodes (86): addToGraphBlock(), account, active, app, applySpellcheck(), applyTheme(), backdrop, BAR (+78 more)

### Community 3 - "odesolve.ts"
Cohesion: 0.07
Nodes (62): boundsOf(), Piece, addWave(), arrange(), cauchy(), compiled(), Condition, constantNames() (+54 more)

### Community 4 - "sync.ts"
Cohesion: 0.05
Nodes (39): @electric-sql/pglite, AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow (+31 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (105): formulaAtCursor(), GraphLabelLines, insertGraphBlock(), setGraphLabels(), mathRegionAt(), conicItems(), isConicLine(), quadricEquation() (+97 more)

### Community 6 - "several.ts"
Cohesion: 0.10
Nodes (53): numShown(), polyShown(), ruffiniShown(), EMPTY_SCOPE, size(), convergesAt(), gcdInt(), logParts() (+45 more)

### Community 7 - "primitive.ts"
Cohesion: 0.15
Nodes (63): wronskianAt(), algebraic(), bigGcd(), byParts(), candidates(), canon(), combineLogs(), compareKeys() (+55 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (44): addLabel(), boxes, cameras, complexCoord(), coord(), drawings, drawnViews, endTex() (+36 more)

### Community 9 - "sheet.ts"
Cohesion: 0.03
Nodes (86): vitest, GraphItem, parseGraph(), typedSliderValue(), PALETTES, formatGauss(), formatList(), expSumValue() (+78 more)

### Community 10 - "complex.ts"
Cohesion: 0.08
Nodes (46): add(), allRoots(), arg(), asin(), atan(), compileApply(), compileComplex(), compileFunction() (+38 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.09
Nodes (57): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+49 more)

### Community 12 - "svg.ts"
Cohesion: 0.10
Nodes (49): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), domainEdge(), features() (+41 more)

### Community 13 - "parse.ts"
Cohesion: 0.06
Nodes (38): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, differentialInFraction(), DISTRIBUTION_EXAMPLES (+30 more)

### Community 15 - "conics.ts"
Cohesion: 0.21
Nodes (27): at(), centralCanonical(), Coefficients, coneCanonical(), conicOf(), det2(), det3(), determinant() (+19 more)

### Community 16 - "fourier.ts"
Cohesion: 0.28
Nodes (14): absOf(), close(), definite(), fourierShown(), isTrig(), isZero(), linearTrig(), numericCoefficients() (+6 more)

### Community 17 - "compile"
Cohesion: 0.05
Nodes (96): depth(), integralRegion, LayeredSolid, Multiple, planeMargin(), PlanePart, radiusOf(), spaceLayers() (+88 more)

### Community 18 - "numerical.ts"
Cohesion: 0.12
Nodes (47): bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial(), interpolating() (+39 more)

### Community 19 - "markdown.ts"
Cohesion: 0.09
Nodes (40): bulletGroup(), sameList(), markMoves(), moveAttrs(), checkHtml(), checkTitle(), escapeHtml(), alignInside() (+32 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (42): b, bigops, c, calculus, fn, fr, fractions, functions (+34 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "Board"
Cohesion: 0.12
Nodes (3): Board, Box, Stroke

### Community 23 - "inference.ts"
Cohesion: 0.16
Nodes (24): chiSquareTest(), confidence(), confidenceShown(), Given, hypothesisTest(), InferenceContext, interval(), meanOf() (+16 more)

### Community 24 - "store.ts"
Cohesion: 0.07
Nodes (18): fake-indexeddb, PEN_SIZE, BoardBackend, BoardChange, BoardData, done(), fromRecord(), IdbBoards (+10 more)

### Community 25 - "MathError"
Cohesion: 0.10
Nodes (66): MathError, formatNumber(), angleBetween(), asMatrix(), basisOf(), circleText(), complexText(), cross() (+58 more)

### Community 26 - "toLatex"
Cohesion: 0.06
Nodes (59): FieldContext, fourierItems(), number(), testItems(), isNumericalLine(), numericalItems(), criticalLine(), named() (+51 more)

### Community 27 - "assistant.ts"
Cohesion: 0.09
Nodes (26): @anthropic-ai/sdk, AiAnswer, AiError, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible(), askThroughHost() (+18 more)

### Community 28 - "h"
Cohesion: 0.11
Nodes (18): viewSwitch, fieldInput(), textWidth(), tableField, h(), icon(), HINT_MS, markSeen() (+10 more)

### Community 29 - "graph.ts"
Cohesion: 0.13
Nodes (26): AT_X, cellHtml(), cellText(), COMPASS, createEdgeCell(), createGraph(), drawSchema(), edgeLook() (+18 more)

### Community 30 - "Pt"
Cohesion: 0.12
Nodes (11): coalesced(), EraseAction, Finger, MoveAction, penErases(), pointsOf(), pressureOf(), Transform (+3 more)

### Community 31 - "graph/space.ts"
Cohesion: 0.12
Nodes (51): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+43 more)

### Community 32 - "distributions.ts"
Cohesion: 0.19
Nodes (26): choose(), continuousQuantile(), discreteQuantile(), factorialBig(), FAMILIES, integerParam(), invalid(), makeDistribution() (+18 more)

### Community 33 - "graphNote.test.ts"
Cohesion: 0.09
Nodes (20): acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult, calcResults(), CheckWidget, formulasUntil() (+12 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "FoldersStore"
Cohesion: 0.07
Nodes (23): cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder(), loadClosedFolders(), RemoteFolder (+15 more)

### Community 36 - "arithmetic.ts"
Cohesion: 0.11
Nodes (41): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+33 more)

### Community 37 - "namesIn"
Cohesion: 0.11
Nodes (39): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+31 more)

### Community 38 - "probability.ts"
Cohesion: 0.15
Nodes (22): End, Family, Interval, fractionNear(), ALL, complement(), endAt(), EventContext (+14 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "statsShown.ts"
Cohesion: 0.17
Nodes (31): Lin, check(), correlation(), count(), covariance(), Data, dataStatistic(), deviation() (+23 more)

### Community 41 - "view3d.ts"
Cohesion: 0.09
Nodes (33): tickLabel(), Detail, Face, FAST, FINE, Plane, Vec3, arcPoints() (+25 more)

### Community 42 - "NotesStore"
Cohesion: 0.08
Nodes (33): accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf() (+25 more)

### Community 43 - "study.ts"
Cohesion: 0.16
Nodes (34): limit(), Asymptote, boundaries(), compiled(), cutsOf(), defined(), domainOf(), exact() (+26 more)

### Community 44 - "insert.ts"
Cohesion: 0.12
Nodes (16): @codemirror/state, @codemirror/view, InsertOptions, toggleLinePrefix(), addPlaceholders, Placeholder, guardBlocks(), schemaBlocks() (+8 more)

### Community 45 - "laplace.ts"
Cohesion: 0.19
Nodes (26): factoredPolynomial(), polynomialOf(), beyondPoles(), compiled(), E, exp(), fractionShown(), HALF (+18 more)

### Community 46 - ".constructor"
Cohesion: 0.13
Nodes (5): clampZoom(), loadPrefs(), validView(), highlightName(), inkName()

### Community 47 - "gauss.ts"
Cohesion: 0.15
Nodes (22): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexLine(), isComplexValue() (+14 more)

### Community 48 - "Distribution"
Cohesion: 0.13
Nodes (12): addExp(), Distribution, exactIntervalProbability(), integerRange(), intervalProbability(), subtractExp(), pValue(), rejection() (+4 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (35): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+27 more)

### Community 50 - "linsys.ts"
Cohesion: 0.14
Nodes (40): inverseRational(), R(), choices(), exText(), minorsGcd(), ONE, parametricRows(), parametricSystem() (+32 more)

### Community 51 - "solve.ts"
Cohesion: 0.08
Nodes (47): fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), decimalSeparator(), Digits (+39 more)

### Community 52 - "search.ts"
Cohesion: 0.16
Nodes (25): SuggestionItem, editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase() (+17 more)

### Community 53 - "account.ts"
Cohesion: 0.20
Nodes (14): SyncStatus, AccountButton, confirmAccountDeletion(), messageOf(), openAccountDialog(), openLoginDialog(), codeStep(), emailStep() (+6 more)

### Community 54 - "touchLog"
Cohesion: 0.31
Nodes (3): movesLine(), seconds(), touchLog

### Community 55 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "picture.ts"
Cohesion: 0.24
Nodes (11): staticGraphSvg(), chooseWindow(), chooseBox(), GraphSpec, DrawOptions, graphSvg(), DEFAULT_CAMERA, Quality (+3 more)

### Community 58 - "Field"
Cohesion: 0.13
Nodes (4): eigenvalues(), Field, interpolate(), interpolateFloat()

### Community 59 - "grafo-html.mjs"
Cohesion: 0.25
Nodes (4): graphFile, names, namesFile, root

### Community 60 - "schema/shapes.ts"
Cohesion: 0.09
Nodes (15): @maxgraph/core, ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape (+7 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (24): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+16 more)

### Community 62 - "supabase.ts"
Cohesion: 0.09
Nodes (41): @supabase/supabase-js, AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountError, appUrl(), call(), currentSession() (+33 more)

### Community 63 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 64 - "ui/preview.ts"
Cohesion: 0.09
Nodes (17): GraphLabels, renameGraphScope(), renameScopeKeys(), BlockKind, draw(), drawCached(), drawn, errorHtml() (+9 more)

### Community 65 - "boardTouchLog.test.ts"
Cohesion: 0.20
Nodes (7): isSaved(), LOG_MAX_LINES, LogStore, SavedLog, clock(), memoryStore(), newLog()

### Community 66 - "parseSchema"
Cohesion: 0.18
Nodes (13): hide(), OPEN, schemasForFile(), schemasFromFile(), unhide(), isRecord(), num(), oneOf() (+5 more)

### Community 67 - "MathNode"
Cohesion: 0.08
Nodes (30): ExactComplexScope, ConicInfo, withWorkLimit(), FiniteContext, FormattedResult, MathNode, close(), digitsMatch() (+22 more)

### Community 68 - "dialogs.ts"
Cohesion: 0.08
Nodes (34): AI_SERVICES, aiService, inClaudeViewer(), canWriteFilesDirectly(), FsWindow, isAbort(), MD_TYPES, OpenedFile (+26 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "Dove sono le cose"
Cohesion: 0.09
Nodes (42): Dove sono le cose, Glifo – architettura, LassoAction, centerOn(), copyStrokes(), cross(), handleScale(), IDENTITY (+34 more)

### Community 72 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 73 - "blockMove.ts"
Cohesion: 0.10
Nodes (34): blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove, blockPlace(), closed() (+26 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (96): fnLabel(), atIntegers(), fourierProblem, oneFraction(), splitAbs(), withoutAbs(), hyperbolicToExp(), sqrtEx() (+88 more)

### Community 75 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.04
Nodes (65): alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ARROW_NAMES, AT_ICONS (+57 more)

### Community 79 - "board.ts"
Cohesion: 0.06
Nodes (41): Action, ACTION_NAMES, DOT_SIZES, DrawAction, EraserMode, HANDLE_REACH, ICON, MODE_NAMES (+33 more)

### Community 82 - "editor.test.ts"
Cohesion: 0.08
Nodes (27): @lezer/common, tabOutOfMath(), CODE_NODES, CommandToken, commandTokenAt(), isInCode(), MATH_NODES, mathContextAt() (+19 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.20
Nodes (6): centerOf(), clickOn(), ffmpeg, SCENES, SIZE, work

### Community 90 - "Abbonamenti"
Cohesion: 0.09
Nodes (23): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Deciso (5 ottobre 2026), Deciso (5 ottobre 2026) (+15 more)

### Community 91 - "BoardStore"
Cohesion: 0.18
Nodes (4): BoardStore, applyAccountChange(), backup(), restore()

### Community 92 - "Costi"
Cohesion: 0.23
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, Quando lo studente dice di cominciare

### Community 96 - "account-test.mjs"
Cohesion: 0.20
Nodes (4): device(), login(), newContext, waitFor()

### Community 97 - "Il database degli account (Supabase)"
Cohesion: 0.17
Nodes (11): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Nell'app, Note condivise con un link (+3 more)

### Community 98 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 100 - "schemaTools.test.ts"
Cohesion: 0.18
Nodes (17): base64(), crc32(), svgSize(), svgToPng(), withDensity(), labelHtml(), plainHtml(), tableHtml() (+9 more)

### Community 103 - "editor/editor.ts"
Cohesion: 0.06
Nodes (37): description, name, private, type, version, @codemirror/autocomplete, @codemirror/commands, @codemirror/language (+29 more)

### Community 106 - "fake-supabase.mjs"
Cohesion: 0.29
Nodes (5): b64(), CODE, GOOGLE_CODE, ROOT, SUPABASE_URL

### Community 107 - "createFakeSupabase"
Cohesion: 0.60
Nodes (6): createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 108 - "downloadText"
Cohesion: 0.48
Nodes (4): loadDialect(), downloadBlob(), downloadText(), fileNameFor()

### Community 109 - "Glifo – note per Claude"
Cohesion: 0.22
Nodes (9): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole (+1 more)

### Community 110 - "page.ts"
Cohesion: 0.06
Nodes (53): accountDataFile(), PullResult, hydrateGraphs(), board, openShareDialog(), changeAccess(), changeCopy(), copy() (+45 more)

### Community 111 - "sidePanel.ts"
Cohesion: 0.21
Nodes (11): AiResult, isConfidentAnswer(), CATEGORIES, symbolsInCategory(), cardPreviewTex(), formPreviewTex(), ParsedTemplate, PLACEHOLDER_TEX (+3 more)

### Community 113 - "toolbar.ts"
Cohesion: 0.11
Nodes (17): closeMathBlockOnEnter(), EditorCallbacks, MarkdownEditor, insertBlock(), insertTemplate(), wrapSelection(), SidePanelDeps, Action (+9 more)

### Community 116 - "graph/file.ts"
Cohesion: 0.10
Nodes (37): figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsForFile(), graphsFromFile(), hide(), OPEN (+29 more)

### Community 117 - "spaces.ts"
Cohesion: 0.16
Nodes (19): characteristicPolynomial(), Eigenvalue, LinearValue, cartesianEquations(), Cell, coordinateNames(), diagonalize(), dot() (+11 more)

### Community 121 - "Rational"
Cohesion: 0.10
Nodes (23): Part, expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactRandom, exactRoot() (+15 more)

### Community 122 - "spell.test.ts"
Cohesion: 0.08
Nodes (23): @codemirror/lang-markdown, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt() (+15 more)

### Community 123 - "renderTex"
Cohesion: 0.18
Nodes (9): cache, cleanKatexError(), renderTex(), renderTexOrError(), renderTexWithResult(), TexRender, displayCode(), preventFocusSteal() (+1 more)

### Community 125 - "sql.ts"
Cohesion: 0.16
Nodes (19): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+11 more)

### Community 126 - "suggestions.ts"
Cohesion: 0.20
Nodes (7): templateInsertion(), EditorMathContext, expand(), preferredIndex(), SuggestionController, parseTemplate(), templateText()

### Community 127 - "Glifo"
Cohesion: 0.15
Nodes (13): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Funzionalità (+5 more)

### Community 129 - "smoke-test.mjs"
Cohesion: 0.29
Nodes (4): markdown-it, vite, firstVisit(), plainContext

## Knowledge Gaps
- **577 isolated node(s):** `session-start.sh script`, `name`, `private`, `version`, `description` (+572 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 801 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **22 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `touchlog.ts`, `Parser`, `main.ts`, `odesolve.ts`, `spec.ts`, `several.ts`, `primitive.ts`, `graph/preview.ts`, `sheet.ts`, `complex.ts`, `svg.ts`, `parse.ts`, `fourier.ts`, `compile`, `numerical.ts`, `markdown.ts`, `Board`, `inference.ts`, `MathError`, `toLatex`, `assistant.ts`, `h`, `Pt`, `graph/space.ts`, `graphNote.test.ts`, `logic.ts`, `arithmetic.ts`, `namesIn`, `NotesStore`, `study.ts`, `gauss.ts`, `board/shapes.ts`, `linsys.ts`, `solve.ts`, `touchLog`, `finite.ts`, `supabase.ts`, `ui/preview.ts`, `MathNode`, `dialogs.ts`, `blockMove.ts`, `symbolic.ts`, `board.ts`, `BoardStore`, `schemaTools.test.ts`, `toolbar.ts`, `graph/file.ts`, `Rational`?**
  _High betweenness centrality (0.124) - this node is a cross-community bridge._
- **Why does `vitest` connect `sheet.ts` to `touchlog.ts`, `main.ts`, `sync.ts`, `editor/lists.ts`, `markdown.ts`, `store.ts`, `MathError`, `assistant.ts`, `h`, `graph/space.ts`, `graphNote.test.ts`, `FoldersStore`, `resize.ts`, `NotesStore`, `insert.ts`, `board/shapes.ts`, `linsys.ts`, `search.ts`, `picture.ts`, `supabase.ts`, `ui/preview.ts`, `boardTouchLog.test.ts`, `parseSchema`, `dialogs.ts`, `Dove sono le cose`, `blockMove.ts`, `symbolic.ts`, `board.ts`, `editor.test.ts`, `schemaTools.test.ts`, `editor/editor.ts`, `page.ts`, `sidePanel.ts`, `Rational`, `spell.test.ts`, `sql.ts`?**
  _High betweenness centrality (0.111) - this node is a cross-community bridge._
- **Why does `Board` connect `Board` to `main.ts`, `Dove sono le cose`, `.constructor`, `board.ts`, `Pt`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **Are the 140 inferred relationships involving `Dove sono le cose` (e.g. with `adoptGuestNotes()` and `sharedLinks()`) actually correct?**
  _`Dove sono le cose` has 140 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `name`, `private` to the rest of the system?**
  _577 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `touchlog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._
- **Should `Parser` be split into smaller, more focused modules?**
  _Cohesion score 0.12245696400625979 - nodes in this community are weakly interconnected._