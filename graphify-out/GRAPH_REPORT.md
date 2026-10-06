# Graph Report - matherdown  (2026-10-06)

## Corpus Check
- 240 files · ~461,621 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 3963 nodes · 14150 edges · 124 communities (106 shown, 18 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 394 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ebb1c626`
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
- view3d.ts
- num
- editor/lists.ts
- svg.ts
- Board
- SchemaEditor
- exact.ts
- Rational
- compile
- numerical.ts
- markdown.ts
- index.ts
- engine.ts
- .constructor
- formatNumber
- store.ts
- MathError
- toLatex
- assistant.ts
- h
- conics.ts
- board.ts
- graph/space.ts
- distributions.ts
- calcPlugin
- logic.ts
- templates.ts
- arithmetic.ts
- Dove sono le cose
- probability.ts
- resize.ts
- statsShown.ts
- fixedPoint
- NotesStore
- study.ts
- complex.ts
- graph.ts
- editor/editor.ts
- parseGraph
- files.ts
- board/shapes.ts
- laplace.ts
- linsys.ts
- search.ts
- statsGraph.ts
- strokes.ts
- finite.ts
- 20261004091555_note_condivise.sql
- logo.ts
- .int
- renderTex
- schema/shapes.ts
- dependencies
- supabase.ts
- parse.ts
- schema/preview.ts
- scopeWith
- parseSchema
- Sheet
- sql.ts
- Benvenuto in Glifo
- compilerOptions
- Distribution
- placeholders.ts
- vitest
- symbolic.ts
- toolbar.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- ink.ts
- session-start.sh
- .claude/CLAUDE.md
- graphNote.test.ts
- tutorial.mjs
- Abbonamenti
- inference.ts
- host.ts
- supabase-stub.sql
- account-test.mjs
- Il database degli account (Supabase)
- Costi
- devDependencies
- formulaGraph
- FoldersStore
- scripts
- SuggestionController
- severalGraph.ts
- fake-supabase.mjs
- numericalGraph.ts
- BoardOptions
- Glifo – note per Claude
- page.ts
- BoardStore
- graph/file.ts
- sheet.ts
- Glifo
- spell.test.ts
- render/lists.ts
- grafo-html.mjs
- sidePanel.ts
- smoke-test.mjs

## God Nodes (most connected - your core abstractions)
1. `MathError` - 151 edges
2. `num()` - 145 edges
3. `Sheet` - 129 edges
4. `MathNode` - 128 edges
5. `mul()` - 124 edges
6. `Dove sono le cose` - 121 edges
7. `compile()` - 113 edges
8. `Rational` - 111 edges
9. `toLatex()` - 101 edges
10. `add()` - 98 edges

## Surprising Connections (you probably didn't know these)
- `Come viene pubblicata` --references--> `dist()`  [INFERRED]
  README.md → src/board/shapes.ts
- `Dove sono le cose` --references--> `adoptGuestNotes()`  [INFERRED]
  CLAUDE.md → src/account/space.ts
- `Dove sono le cose` --references--> `shareNote()`  [INFERRED]
  CLAUDE.md → src/account/supabase.ts
- `Dove sono le cose` --references--> `sharedLinks()`  [INFERRED]
  CLAUDE.md → src/account/supabase.ts
- `Dove sono le cose` --references--> `jsonIn()`  [INFERRED]
  CLAUDE.md → src/ai/assistant.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (124 total, 18 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.09
Nodes (26): at(), browserStore, clip(), isSaved(), KINDS, LOG_KEY, LOG_MAX_LINES, LogStore (+18 more)

### Community 1 - "Parser"
Cohesion: 0.12
Nodes (16): Abbonamento e funzioni a pagamento (da capire), Account: i propri appunti su ogni dispositivo, anche da condividere, Aiuto con gli esercizi, Altre idee, Calcoli e grafici: idee in più, Idee per il futuro, In programma, La lavagna: idee in più (+8 more)

### Community 2 - "main.ts"
Cohesion: 0.05
Nodes (87): addToGraphBlock(), setGraphLabels(), graphsForFile(), hide(), account, active, app, applyAccountChange() (+79 more)

### Community 3 - "odesolve.ts"
Cohesion: 0.08
Nodes (50): Piece, addWave(), arrange(), compiled(), Condition, constantNames(), equalities(), factorial() (+42 more)

### Community 4 - "sync.ts"
Cohesion: 0.05
Nodes (39): @electric-sql/pglite, AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow (+31 more)

### Community 5 - "spec.ts"
Cohesion: 0.06
Nodes (80): isComplexLine(), onlyComplex(), isTestLine(), number(), testItems(), areaFor(), areaOf(), AXES (+72 more)

### Community 6 - "several.ts"
Cohesion: 0.14
Nodes (38): fractionNear(), at(), bounded(), Candidate, candidates(), compiled(), constraintsOf(), COORDS (+30 more)

### Community 7 - "primitive.ts"
Cohesion: 0.17
Nodes (60): atIntegers(), degree(), algebraic(), bigGcd(), byParts(), candidates(), canon(), combineLogs() (+52 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (41): addLabel(), boxes, cameras, complexCoord(), containing(), coord(), drawings, drawnViews (+33 more)

### Community 9 - "view3d.ts"
Cohesion: 0.09
Nodes (35): Detail, Face, FAST, FINE, GRAPH_WORK, Plane, Vec3, escapeXml() (+27 more)

### Community 10 - "num"
Cohesion: 0.11
Nodes (74): oneFraction(), withoutAbs(), exp(), hyperbolicToExp(), linearIn(), termTransform(), polyEx(), bernoulliFamily() (+66 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.10
Nodes (53): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+45 more)

### Community 12 - "svg.ts"
Cohesion: 0.10
Nodes (50): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), domainEdge(), features() (+42 more)

### Community 13 - "Board"
Cohesion: 0.13
Nodes (3): Board, penErases(), shapeSvg()

### Community 15 - "exact.ts"
Cohesion: 0.17
Nodes (16): expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactFunction, ExactRandom, exactRoot() (+8 more)

### Community 16 - "Rational"
Cohesion: 0.10
Nodes (34): Part, EMPTY_SCOPE, Rational, absOf(), boundsOf(), close(), definite(), fourierProblem (+26 more)

### Community 17 - "compile"
Cohesion: 0.07
Nodes (52): argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot(), fieldOn(), numericPartials() (+44 more)

### Community 18 - "numerical.ts"
Cohesion: 0.14
Nodes (30): cholesky(), condition(), exactPolynomial(), floatPolynomial(), interpolating(), interpolation(), inverseOf(), iterative() (+22 more)

### Community 19 - "markdown.ts"
Cohesion: 0.09
Nodes (38): @lezer/highlight, @lezer/markdown, lineDepth(), mathDelimTag, mathTag, parseBlockMath(), checkHtml(), checkTitle() (+30 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (41): b, bigops, c, calculus, fn, fr, fractions, functions (+33 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (22): Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download(), fetchDictionary() (+14 more)

### Community 22 - ".constructor"
Cohesion: 0.14
Nodes (5): clampZoom(), coalesced(), loadPrefs(), validView(), highlightName()

### Community 23 - "formatNumber"
Cohesion: 0.13
Nodes (24): decimalSeparator(), Digits, formatNumber(), fromNumber(), fromRational(), SUPERSCRIPT, writeDigits(), circleText() (+16 more)

### Community 24 - "store.ts"
Cohesion: 0.10
Nodes (18): Prefs, BoardPalette, SizeChoice, BackupBoard, BoardBackend, done(), fromRecord(), IdbBoards (+10 more)

### Community 25 - "MathError"
Cohesion: 0.13
Nodes (50): MathError, angleBetween(), asMatrix(), basisOf(), cross(), Ctx, dataOf(), determinant() (+42 more)

### Community 26 - "toLatex"
Cohesion: 0.08
Nodes (37): conicItems(), isConicLine(), quadricEquation(), FieldContext, fourierItems(), isFourierLine(), names(), STUDY_GRAPH (+29 more)

### Community 27 - "assistant.ts"
Cohesion: 0.14
Nodes (19): @anthropic-ai/sdk, AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible() (+11 more)

### Community 28 - "h"
Cohesion: 0.05
Nodes (66): SyncStatus, AI_SERVICES, aiService, board, helpButton, openGuide(), ACCOUNT_SETTINGS, accountSettings() (+58 more)

### Community 29 - "conics.ts"
Cohesion: 0.20
Nodes (27): at(), centralCanonical(), Coefficients, coneCanonical(), conicOf(), det2(), det3(), determinant() (+19 more)

### Community 30 - "board.ts"
Cohesion: 0.07
Nodes (32): Action, ACTION_NAMES, DOT_SIZES, DrawAction, EraseAction, EraserMode, Finger, ICON (+24 more)

### Community 31 - "graph/space.ts"
Cohesion: 0.12
Nodes (48): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+40 more)

### Community 32 - "distributions.ts"
Cohesion: 0.18
Nodes (26): choose(), continuousQuantile(), expSumValue(), factorialBig(), FAMILIES, integerParam(), invalid(), makeDistribution() (+18 more)

### Community 33 - "calcPlugin"
Cohesion: 0.16
Nodes (4): calcPlugin, CheckWidget, ResultWidget, valueNode()

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "templates.ts"
Cohesion: 0.11
Nodes (19): SchemaEditorOptions, DEFAULT_EDGE, Schema, SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), tableMetrics() (+11 more)

### Community 36 - "arithmetic.ts"
Cohesion: 0.11
Nodes (46): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+38 more)

### Community 37 - "Dove sono le cose"
Cohesion: 0.14
Nodes (35): Dove sono le cose, bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel() (+27 more)

### Community 38 - "probability.ts"
Cohesion: 0.14
Nodes (21): End, Family, CompileOptions, ExactScope, ALL, complement(), EventContext, eventSet() (+13 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "statsShown.ts"
Cohesion: 0.19
Nodes (29): check(), correlation(), count(), covariance(), Data, dataStatistic(), deviation(), fail() (+21 more)

### Community 41 - "fixedPoint"
Cohesion: 0.25
Nodes (17): Funzionalità, bisection(), derivative(), fixedPoint(), intervalOf(), k(), newton(), NormKind (+9 more)

### Community 42 - "NotesStore"
Cohesion: 0.08
Nodes (31): accountSpace(), adoptGuestNotes(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf(), setCurrentAccount() (+23 more)

### Community 43 - "study.ts"
Cohesion: 0.15
Nodes (35): nameLatex(), limit(), splitRoot(), breaks(), periodOf(), Asymptote, compiled(), cutsOf() (+27 more)

### Community 44 - "complex.ts"
Cohesion: 0.05
Nodes (77): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexValue(), isInequality() (+69 more)

### Community 45 - "graph.ts"
Cohesion: 0.09
Nodes (39): fieldInput(), textWidth(), AT_X, cellHtml(), cellText(), COMPASS, createEdgeCell(), createGraph() (+31 more)

### Community 46 - "editor/editor.ts"
Cohesion: 0.07
Nodes (30): description, name, private, type, version, @codemirror/autocomplete, @codemirror/commands, @codemirror/language-data (+22 more)

### Community 47 - "parseGraph"
Cohesion: 0.09
Nodes (32): staticGraphSvg(), chooseWindow(), specFor(), Box, chooseBox(), GraphItem, parseGraph(), DrawOptions (+24 more)

### Community 48 - "files.ts"
Cohesion: 0.19
Nodes (15): inClaudeViewer(), loadDialect(), canWriteFilesDirectly(), downloadBlob(), downloadText(), fileNameFor(), FsWindow, isAbort() (+7 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (35): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+27 more)

### Community 50 - "laplace.ts"
Cohesion: 0.11
Nodes (47): factoredPolynomial(), integerPoly(), beyondPoles(), compiled(), E, fractionShown(), HALF, inverseLaplaceShown() (+39 more)

### Community 51 - "linsys.ts"
Cohesion: 0.10
Nodes (46): FormatOptions, FLOAT, LinearScope, rref(), choices(), gcd(), isStandardUnknown(), linearSystem() (+38 more)

### Community 52 - "search.ts"
Cohesion: 0.15
Nodes (26): preferredIndex(), SuggestionItem, editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex() (+18 more)

### Community 53 - "statsGraph.ts"
Cohesion: 0.27
Nodes (12): classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX, Line, number(), pmfBars() (+4 more)

### Community 54 - "strokes.ts"
Cohesion: 0.18
Nodes (17): between(), Box, boxesTouch(), capsuleSpan(), circleSpan(), compareStrokes(), eraserGrowth(), eraseStroke() (+9 more)

### Community 55 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "logo.ts"
Cohesion: 0.39
Nodes (5): BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark()

### Community 58 - ".int"
Cohesion: 0.10
Nodes (10): characteristicPolynomial(), eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn(), endAt() (+2 more)

### Community 59 - "renderTex"
Cohesion: 0.23
Nodes (6): cleanKatexError(), renderTex(), SymbolForm, displayCode(), preventFocusSteal(), SidePanel

### Community 60 - "schema/shapes.ts"
Cohesion: 0.09
Nodes (15): @maxgraph/core, ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape (+7 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (24): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+16 more)

### Community 62 - "supabase.ts"
Cohesion: 0.11
Nodes (36): @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken(), ensureSessionOf() (+28 more)

### Community 63 - "parse.ts"
Cohesion: 0.06
Nodes (46): hasWord(), typedSliderValue(), errorMessage(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS (+38 more)

### Community 64 - "schema/preview.ts"
Cohesion: 0.14
Nodes (14): GraphLabels, GraphLook, Look, Theme, draw(), drawCached(), drawn, errorHtml() (+6 more)

### Community 65 - "scopeWith"
Cohesion: 0.15
Nodes (29): integralRegion, axesIn(), bestAlong(), boundingBox(), combine(), compileDomain(), compileMultiple(), conditionsOf() (+21 more)

### Community 66 - "parseSchema"
Cohesion: 0.18
Nodes (14): hide(), OPEN, schemasForFile(), schemasFromFile(), unhide(), isRecord(), num(), oneOf() (+6 more)

### Community 67 - "Sheet"
Cohesion: 0.05
Nodes (54): Definition, Line, ExactComplexScope, ConicInfo, Ode, OdeSystem, withWorkLimit(), FiniteContext (+46 more)

### Community 68 - "sql.ts"
Cohesion: 0.17
Nodes (18): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+10 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "Distribution"
Cohesion: 0.13
Nodes (13): addExp(), discreteQuantile(), Distribution, exactIntervalProbability(), integerRange(), intervalProbability(), subtractExp(), pValue() (+5 more)

### Community 72 - "placeholders.ts"
Cohesion: 0.13
Nodes (12): addPlaceholders, buildDecorations(), clearAllPlaceholders(), clearPlaceholders, contains(), currentIndex(), filledMark, getPlaceholders() (+4 more)

### Community 73 - "vitest"
Cohesion: 0.09
Nodes (15): vite-plugin-pwa, vitest, toggleLinePrefix(), besideSchema(), guardBlocks(), schemaBlockRanges(), schemaBlocks(), SchemaWidget (+7 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (55): primitive(), verified(), linearCells(), assumePositive(), commonPositive(), Converter, coordinates(), decimalText() (+47 more)

### Community 75 - "toolbar.ts"
Cohesion: 0.11
Nodes (16): closeMathBlockOnEnter(), EditorCallbacks, MarkdownEditor, tabOutOfMath(), insertBlock(), insertTemplate(), wrapSelection(), Action (+8 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.06
Nodes (51): alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ARROW_NAMES, AT_ICONS (+43 more)

### Community 79 - "ink.ts"
Cohesion: 0.18
Nodes (11): BOARD_PALETTES, BoardTheme, inkName(), mid(), outlineSvg(), PEN_SIZE, strokeOptions(), strokeOutline() (+3 more)

### Community 82 - "graphNote.test.ts"
Cohesion: 0.08
Nodes (41): @codemirror/lang-markdown, @codemirror/language, @codemirror/state, @codemirror/view, acceptCalcResult(), CalcCheck, calcOutcomes(), CalcResult (+33 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.20
Nodes (6): centerOf(), clickOn(), ffmpeg, SCENES, SIZE, work

### Community 90 - "Abbonamenti"
Cohesion: 0.06
Nodes (36): Abbonamenti, Classico, gratis: per scrivere e controllare, Com'è andata la discussione, Come si costruisce (per dopo), Come si decide cosa far pagare, Cosa fare, in ordine, Cosa succede dietro, Cosa vede chi studia (+28 more)

### Community 91 - "inference.ts"
Cohesion: 0.16
Nodes (24): chiSquareTest(), confidence(), confidenceShown(), Given, hypothesisTest(), InferenceContext, interval(), meanOf() (+16 more)

### Community 92 - "host.ts"
Cohesion: 0.23
Nodes (8): cache, capability(), ClaudeRuntime, hostDownloads, HostError, hostSample, ModelTier, runtime()

### Community 96 - "account-test.mjs"
Cohesion: 0.20
Nodes (4): device(), login(), newContext, waitFor()

### Community 97 - "Il database degli account (Supabase)"
Cohesion: 0.17
Nodes (11): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Nell'app, Note condivise con un link (+3 more)

### Community 98 - "Costi"
Cohesion: 0.23
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, Quando lo studente dice di cominciare

### Community 100 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

### Community 101 - "formulaGraph"
Cohesion: 0.15
Nodes (26): constantIntegrand(), depth(), inequalityMargin(), LayeredSolid, Multiple, multipleOf(), planeMargin(), PlanePart (+18 more)

### Community 102 - "FoldersStore"
Cohesion: 0.08
Nodes (19): cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder(), loadClosedFolders(), RemoteFolder (+11 more)

### Community 103 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 104 - "SuggestionController"
Cohesion: 0.23
Nodes (3): EditorMathContext, expand(), SuggestionController

### Community 105 - "severalGraph.ts"
Cohesion: 0.54
Nodes (7): criticalLine(), isSeveralLine(), named(), severalItems(), surface(), optimumOf(), severalOf()

### Community 106 - "fake-supabase.mjs"
Cohesion: 0.22
Nodes (11): b64(), CODE, createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom() (+3 more)

### Community 107 - "numericalGraph.ts"
Cohesion: 0.80
Nodes (4): isNumericalLine(), numericalItems(), isPlottedNumerical(), numericalPlot()

### Community 109 - "Glifo – note per Claude"
Cohesion: 0.29
Nodes (7): Comandi, Come controllare il lavoro, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole, sqlite()

### Community 110 - "page.ts"
Cohesion: 0.06
Nodes (50): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), currentAccount(), PullResult, openShareDialog(), changeAccess() (+42 more)

### Community 111 - "BoardStore"
Cohesion: 0.11
Nodes (4): BoardStore, MemoryBoards, validView(), backup()

### Community 116 - "graph/file.ts"
Cohesion: 0.11
Nodes (33): FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsFromFile(), OPEN, swatchSvg() (+25 more)

### Community 117 - "sheet.ts"
Cohesion: 0.07
Nodes (44): OdeFunction, formatRational(), Eigenvalue, Lin, LinearValue, Mat, surdText(), NUMERICAL (+36 more)

### Community 121 - "Glifo"
Cohesion: 0.17
Nodes (12): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Glifo (+4 more)

### Community 122 - "spell.test.ts"
Cohesion: 0.09
Nodes (22): misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt(), openAt() (+14 more)

### Community 124 - "render/lists.ts"
Cohesion: 0.27
Nodes (13): ListStyle, bulletGroup(), Marker, sameList(), alignInside(), asciiTrim(), findMarker(), Found (+5 more)

### Community 126 - "grafo-html.mjs"
Cohesion: 0.17
Nodes (5): graphFile, names, namesFile, root, PNG_ICONS

### Community 128 - "sidePanel.ts"
Cohesion: 0.19
Nodes (13): isConfidentAnswer(), CATEGORIES, symbolsInCategory(), cardPreviewTex(), formPreviewTex(), ParsedTemplate, parseTemplate(), PLACEHOLDER_TEX (+5 more)

### Community 129 - "smoke-test.mjs"
Cohesion: 0.25
Nodes (5): markdown-it, playwright-core, vite, firstVisit(), plainContext

## Knowledge Gaps
- **569 isolated node(s):** `session-start.sh script`, `name`, `private`, `version`, `description` (+564 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 782 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `touchlog.ts`, `Parser`, `main.ts`, `odesolve.ts`, `spec.ts`, `several.ts`, `primitive.ts`, `graph/preview.ts`, `num`, `svg.ts`, `Board`, `exact.ts`, `Rational`, `compile`, `numerical.ts`, `markdown.ts`, `MathError`, `toLatex`, `assistant.ts`, `h`, `board.ts`, `graph/space.ts`, `logic.ts`, `arithmetic.ts`, `fixedPoint`, `NotesStore`, `study.ts`, `complex.ts`, `graph.ts`, `board/shapes.ts`, `linsys.ts`, `strokes.ts`, `finite.ts`, `supabase.ts`, `parse.ts`, `schema/preview.ts`, `Sheet`, `symbolic.ts`, `schema/editor.ts`, `inference.ts`, `numericalGraph.ts`, `Glifo – note per Claude`, `BoardStore`, `graph/file.ts`, `sheet.ts`?**
  _High betweenness centrality (0.140) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `touchlog.ts`, `sidePanel.ts`, `main.ts`, `sync.ts`, `num`, `editor/lists.ts`, `svg.ts`, `markdown.ts`, `store.ts`, `MathError`, `toLatex`, `assistant.ts`, `h`, `board.ts`, `distributions.ts`, `resize.ts`, `NotesStore`, `editor/editor.ts`, `parseGraph`, `board/shapes.ts`, `laplace.ts`, `linsys.ts`, `search.ts`, `strokes.ts`, `logo.ts`, `supabase.ts`, `parse.ts`, `parseSchema`, `Sheet`, `sql.ts`, `schema/editor.ts`, `ink.ts`, `graphNote.test.ts`, `FoldersStore`, `page.ts`, `spell.test.ts`?**
  _High betweenness centrality (0.103) - this node is a cross-community bridge._
- **Why does `Board` connect `Board` to `main.ts`, `ink.ts`, `strokes.ts`, `.constructor`, `store.ts`, `board.ts`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **What connects `session-start.sh script`, `name`, `private` to the rest of the system?**
  _569 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `touchlog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08653061224489796 - nodes in this community are weakly interconnected._
- **Should `Parser` be split into smaller, more focused modules?**
  _Cohesion score 0.12245696400625979 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05025773195876289 - nodes in this community are weakly interconnected._