# Graph Report - matherdown  (2026-10-06)

## Corpus Check
- 240 files · ~461,612 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 3960 nodes · 14147 edges · 125 communities (107 shown, 18 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 394 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `243b0d53`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- touchlog.ts
- Parser
- main.ts
- MathNode
- sync.ts
- spec.ts
- several.ts
- num
- graph/preview.ts
- Sheet
- odesolve.ts
- editor/lists.ts
- svg.ts
- Board
- SchemaEditor
- Rational
- toNode
- compile
- numerical.ts
- markdown.ts
- index.ts
- engine.ts
- .constructor
- solve.ts
- store.ts
- MathError
- toLatex
- assistant.ts
- h
- conics.ts
- board.ts
- view3d.ts
- distributions.ts
- calcResults.ts
- logic.ts
- templates.ts
- arithmetic.ts
- namesIn
- probability.ts
- resize.ts
- sheet.ts
- Dove sono le cose
- NotesStore
- study.ts
- complex.ts
- graph.ts
- editor/editor.ts
- Converter
- files.ts
- board/shapes.ts
- laplace.ts
- linsys.ts
- search.ts
- statsGraph.ts
- limits.ts
- finite.ts
- 20261004091555_note_condivise.sql
- logo.ts
- Field
- SidePanel
- schema/shapes.ts
- dependencies
- supabase.ts
- parse.ts
- schema/preview.ts
- scopeWith
- parseSchema
- FormattedResult
- sql.ts
- Benvenuto in Glifo
- compilerOptions
- spellcheck
- math/calculus.ts
- insert.ts
- symbolic.ts
- toolbar.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- ink.ts
- session-start.sh
- .claude/CLAUDE.md
- editor.test.ts
- tutorial.mjs
- Abbonamenti
- inference.ts
- .sameAs
- supabase-stub.sql
- account-test.mjs
- Il database degli account (Supabase)
- devDependencies
- database.ts
- .folderItem
- scripts
- suggestions.ts
- Le spiegazioni, come funzionano
- fake-supabase.mjs
- Piano per piano
- Costi
- Glifo – note per Claude
- page.ts
- La lavagna
- I modelli e le chiavi API
- graph/file.ts
- spaces.ts
- Glifo
- spell.test.ts
- render/lists.ts
- icons.mjs
- symbols.test.ts
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
- `Dove sono le cose` --references--> `ConicElements`  [INFERRED]
  CLAUDE.md → src/math/conics.ts
- `Come viene pubblicata` --references--> `dist()`  [INFERRED]
  README.md → src/board/shapes.ts
- `Dove sono le cose` --references--> `expSum`  [INFERRED]
  CLAUDE.md → src/math/distributions.ts
- `Dove sono le cose` --references--> `Wave`  [INFERRED]
  CLAUDE.md → src/math/odesolve.ts
- `Dove sono le cose` --references--> `ViewMode`  [INFERRED]
  CLAUDE.md → src/store/settings.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (125 total, 18 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.09
Nodes (26): at(), browserStore, clip(), isSaved(), KINDS, LOG_KEY, LOG_MAX_LINES, LogStore (+18 more)

### Community 1 - "Parser"
Cohesion: 0.12
Nodes (16): Abbonamento e funzioni a pagamento (da capire), Account: i propri appunti su ogni dispositivo, anche da condividere, Aiuto con gli esercizi, Altre idee, Calcoli e grafici: idee in più, Idee per il futuro, In programma, La lavagna: idee in più (+8 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (96): addToGraphBlock(), graphsForFile(), hide(), account, active, app, applyAccountChange(), applySpellcheck() (+88 more)

### Community 3 - "MathNode"
Cohesion: 0.12
Nodes (15): FieldContext, Definition, Line, ExactComplexScope, DDOT, DOT, Ode, OdeFunction (+7 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (33): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+25 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (106): formulaAtCursor(), GraphLabelLines, insertGraphBlock(), setGraphLabels(), conicItems(), isConicLine(), quadricEquation(), fourierItems() (+98 more)

### Community 6 - "several.ts"
Cohesion: 0.09
Nodes (53): criticalLine(), named(), severalItems(), surface(), Piece, Condition, Family, Group (+45 more)

### Community 7 - "num"
Cohesion: 0.14
Nodes (82): atIntegers(), withoutAbs(), hyperbolicToExp(), polyEx(), similarSolution(), algebraic(), bigGcd(), byParts() (+74 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (43): addLabel(), boxes, cameras, complexCoord(), coord(), drawings, drawnViews, endTex() (+35 more)

### Community 9 - "Sheet"
Cohesion: 0.12
Nodes (22): Sheet, text(), tex(), text(), check(), result(), text(), result() (+14 more)

### Community 10 - "odesolve.ts"
Cohesion: 0.08
Nodes (82): linearIn(), addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames() (+74 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.11
Nodes (51): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+43 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (51): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseWindow(), chooseY(), clipLines(), domainEdge() (+43 more)

### Community 13 - "Board"
Cohesion: 0.09
Nodes (8): Board, clampZoom(), coalesced(), penErases(), pointsOf(), pressureOf(), validView(), newStrokeId()

### Community 14 - "SchemaEditor"
Cohesion: 0.10
Nodes (4): SchemaEditor, NodeLook, serializeSchema(), tableMetrics()

### Community 15 - "Rational"
Cohesion: 0.12
Nodes (19): expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactRandom, exactRoot(), factorialExact() (+11 more)

### Community 16 - "toNode"
Cohesion: 0.14
Nodes (31): EMPTY_SCOPE, absOf(), boundsOf(), close(), definite(), fourierProblem, fourierShown(), isTrig() (+23 more)

### Community 17 - "compile"
Cohesion: 0.09
Nodes (34): Interval, binomial(), compare(), compile(), compileApply(), compileDerivative(), compileFunction(), CompileOptions (+26 more)

### Community 18 - "numerical.ts"
Cohesion: 0.12
Nodes (47): Funzionalità, bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial() (+39 more)

### Community 19 - "markdown.ts"
Cohesion: 0.10
Nodes (35): @lezer/highlight, lineDepth(), mathDelimTag, parseBlockMath(), checkHtml(), checkTitle(), cache, cleanKatexError() (+27 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (42): b, bigops, c, calculus, fn, fr, fractions, functions (+34 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - ".constructor"
Cohesion: 0.18
Nodes (3): loadPrefs(), appleTouch(), UA

### Community 23 - "solve.ts"
Cohesion: 0.13
Nodes (30): decimalSeparator(), Digits, formatNumber(), FormatOptions, fromNumber(), fromRational(), SUPERSCRIPT, writeDigits() (+22 more)

### Community 24 - "store.ts"
Cohesion: 0.06
Nodes (17): fake-indexeddb, BoardOptions, BoardBackend, BoardStore, done(), fromRecord(), IdbBoards, MemoryBoards (+9 more)

### Community 25 - "MathError"
Cohesion: 0.10
Nodes (66): MathError, angleBetween(), asMatrix(), basisOf(), circleText(), complexText(), cross(), Ctx (+58 more)

### Community 26 - "toLatex"
Cohesion: 0.05
Nodes (56): vitest, GraphItem, parseGraph(), names(), STUDY_GRAPH, studyItems(), PALETTES, errorMessage() (+48 more)

### Community 27 - "assistant.ts"
Cohesion: 0.10
Nodes (28): AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible(), askThroughHost() (+20 more)

### Community 28 - "h"
Cohesion: 0.06
Nodes (55): SyncStatus, board, openGuide(), viewSwitch, openSignedOut(), printButton(), ShareDialogDeps, DEFAULT_SETTINGS (+47 more)

### Community 29 - "conics.ts"
Cohesion: 0.17
Nodes (29): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+21 more)

### Community 30 - "board.ts"
Cohesion: 0.08
Nodes (45): Action, ACTION_NAMES, DOT_SIZES, DrawAction, EraseAction, EraserMode, Finger, ICON (+37 more)

### Community 31 - "view3d.ts"
Cohesion: 0.06
Nodes (93): staticGraphSvg(), tickLabel(), addMesh(), addTet(), affinePlane(), Axis, Box, centroid() (+85 more)

### Community 32 - "distributions.ts"
Cohesion: 0.17
Nodes (26): choose(), continuousQuantile(), discreteQuantile(), factorialBig(), FAMILIES, integerParam(), invalid(), makeDistribution() (+18 more)

### Community 33 - "calcResults.ts"
Cohesion: 0.12
Nodes (14): acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult, calcResults(), CheckWidget, formulasUntil() (+6 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "templates.ts"
Cohesion: 0.11
Nodes (18): SchemaEditorOptions, DEFAULT_EDGE, Schema, SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), conceptMap (+10 more)

### Community 36 - "arithmetic.ts"
Cohesion: 0.10
Nodes (48): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+40 more)

### Community 37 - "namesIn"
Cohesion: 0.16
Nodes (31): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+23 more)

### Community 38 - "probability.ts"
Cohesion: 0.08
Nodes (35): addExp(), Distribution, End, exactIntervalProbability(), Family, integerRange(), intervalProbability(), subtractExp() (+27 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "sheet.ts"
Cohesion: 0.09
Nodes (53): expSumValue(), ExactFunction, Lin, NUMERICAL, bracketParts(), BRACKETS, CHECK_VALUES, checks (+45 more)

### Community 41 - "Dove sono le cose"
Cohesion: 0.14
Nodes (14): Dove sono le cose, chiSquareTest(), InferenceContext, readBases(), chainOf(), definitionTarget(), parseCached(), solveRequest() (+6 more)

### Community 42 - "NotesStore"
Cohesion: 0.05
Nodes (48): accountSpace(), adoptGuestNotes(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf(), setCurrentAccount() (+40 more)

### Community 43 - "study.ts"
Cohesion: 0.16
Nodes (33): nameLatex(), breaks(), periodOf(), Asymptote, compiled(), cutsOf(), defined(), domainOf() (+25 more)

### Community 44 - "complex.ts"
Cohesion: 0.05
Nodes (75): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexValue(), isInequality() (+67 more)

### Community 45 - "graph.ts"
Cohesion: 0.13
Nodes (26): AT_X, cellHtml(), cellText(), COMPASS, createEdgeCell(), createGraph(), drawSchema(), edgeLook() (+18 more)

### Community 46 - "editor/editor.ts"
Cohesion: 0.06
Nodes (34): description, name, private, type, version, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands (+26 more)

### Community 47 - "Converter"
Cohesion: 0.20
Nodes (14): Converter, definiteParts(), definiteValue(), expandCalculus(), fieldName(), functionOf(), isField(), isVectorBody() (+6 more)

### Community 48 - "files.ts"
Cohesion: 0.27
Nodes (11): inClaudeViewer(), canWriteFilesDirectly(), FsWindow, isAbort(), MD_TYPES, OpenedFile, openMarkdownFiles(), PickerType (+3 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.14
Nodes (34): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+26 more)

### Community 50 - "laplace.ts"
Cohesion: 0.17
Nodes (29): factoredPolynomial(), oneFraction(), beyondPoles(), compiled(), E, exp(), fractionShown(), HALF (+21 more)

### Community 51 - "linsys.ts"
Cohesion: 0.12
Nodes (46): rref(), choices(), gcd(), linearSystem(), matrixEquation(), matrixSystem(), minorsGcd(), ONE (+38 more)

### Community 52 - "search.ts"
Cohesion: 0.17
Nodes (23): editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex() (+15 more)

### Community 53 - "statsGraph.ts"
Cohesion: 0.28
Nodes (11): classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX, Line, number(), pmfBars() (+3 more)

### Community 54 - "limits.ts"
Cohesion: 0.17
Nodes (21): close(), Definite, definiteIntegral(), exValue(), samples(), integrate(), kronrod(), Scope (+13 more)

### Community 55 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "logo.ts"
Cohesion: 0.33
Nodes (6): sidebarToggle(), BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark()

### Community 58 - "Field"
Cohesion: 0.12
Nodes (7): characteristicPolynomial(), eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn()

### Community 59 - "SidePanel"
Cohesion: 0.25
Nodes (4): isConfidentAnswer(), displayCode(), preventFocusSteal(), SidePanel

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
Nodes (42): isNumericalLine(), numericalItems(), hasWord(), isPlottedNumerical(), numericalPlot(), ACCENTS, AND_WORDS, BARE_WORDS (+34 more)

### Community 64 - "schema/preview.ts"
Cohesion: 0.14
Nodes (14): GraphLabels, Look, SchemaError, Theme, draw(), drawCached(), drawn, errorHtml() (+6 more)

### Community 65 - "scopeWith"
Cohesion: 0.12
Nodes (36): depth(), integralRegion, LayeredSolid, Multiple, planeMargin(), radiusOf(), spaceLayers(), spaceMargin() (+28 more)

### Community 66 - "parseSchema"
Cohesion: 0.18
Nodes (14): base64(), hide(), OPEN, schemasForFile(), schemasFromFile(), unhide(), isRecord(), num() (+6 more)

### Community 67 - "FormattedResult"
Cohesion: 0.21
Nodes (3): withWorkLimit(), FormattedResult, needsSymbols()

### Community 68 - "sql.ts"
Cohesion: 0.12
Nodes (22): loadDialect(), Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote() (+14 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "spellcheck"
Cohesion: 0.21
Nodes (8): spellcheck(), close(), misspelledAt(), openAt(), replace(), tooltipView(), SpellChecker, SpellcheckOptions

### Community 72 - "math/calculus.ts"
Cohesion: 0.33
Nodes (12): argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot(), fieldOn(), numericPartials() (+4 more)

### Community 73 - "insert.ts"
Cohesion: 0.14
Nodes (15): @codemirror/view, InsertOptions, toggleLinePrefix(), LIST_STYLES, besideSchema(), guardBlocks(), schemaBlockRanges(), schemaBlocks() (+7 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.08
Nodes (43): atValues(), cancelLinear(), coordinates(), decimalText(), degree(), denominatorPart(), denominators(), divideLinear() (+35 more)

### Community 75 - "toolbar.ts"
Cohesion: 0.13
Nodes (12): EditorCallbacks, MarkdownEditor, insertBlock(), insertTemplate(), wrapSelection(), Action, createToolbar(), insertCode() (+4 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.05
Nodes (63): alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ARROW_NAMES, AT_ICONS (+55 more)

### Community 79 - "ink.ts"
Cohesion: 0.13
Nodes (19): Prefs, BOARD_PALETTES, BoardPalette, BoardTheme, highlightName(), inkName(), mid(), outlineSvg() (+11 more)

### Community 82 - "editor.test.ts"
Cohesion: 0.07
Nodes (33): @lezer/common, closeMathBlockOnEnter(), tabOutOfMath(), templateInsertion(), CODE_NODES, CommandToken, commandTokenAt(), isInCode() (+25 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.12
Nodes (10): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+2 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.14
Nodes (14): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+6 more)

### Community 91 - "inference.ts"
Cohesion: 0.18
Nodes (24): confidence(), confidenceShown(), Given, hypothesisTest(), interval(), meanOf(), nameOf(), num() (+16 more)

### Community 92 - ".sameAs"
Cohesion: 0.21
Nodes (6): close(), digitsMatch(), isLiteral(), linearCells(), pairUp(), writtenDecimals()

### Community 96 - "account-test.mjs"
Cohesion: 0.20
Nodes (4): device(), login(), newContext, waitFor()

### Community 97 - "Il database degli account (Supabase)"
Cohesion: 0.17
Nodes (11): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Nell'app, Note condivise con un link (+3 more)

### Community 100 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

### Community 101 - "database.ts"
Cohesion: 0.24
Nodes (6): @electric-sql/pglite, createDatabase(), createUser(), databaseTests(), migrations, shareTests()

### Community 102 - ".folderItem"
Cohesion: 0.21
Nodes (5): saveClosedFolders(), Note, NoteMeta, NotesPanel, NotesPanelDeps

### Community 103 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 104 - "suggestions.ts"
Cohesion: 0.17
Nodes (7): EditorMathContext, expand(), preferredIndex(), SuggestionController, SuggestionItem, suggestCommands(), SymbolForm

### Community 105 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 106 - "fake-supabase.mjs"
Cohesion: 0.22
Nodes (11): b64(), CODE, createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom() (+3 more)

### Community 107 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 108 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, Quando lo studente dice di cominciare

### Community 109 - "Glifo – note per Claude"
Cohesion: 0.29
Nodes (7): Comandi, Come controllare il lavoro, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole, sqlite()

### Community 110 - "page.ts"
Cohesion: 0.06
Nodes (45): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), currentAccount(), PullResult, openShareDialog(), changeAccess() (+37 more)

### Community 111 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 112 - "I modelli e le chiavi API"
Cohesion: 0.50
Nodes (4): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), Le idee dello studente (5 ottobre 2026)

### Community 116 - "graph/file.ts"
Cohesion: 0.09
Nodes (40): FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsFromFile(), OPEN, swatchSvg() (+32 more)

### Community 117 - "spaces.ts"
Cohesion: 0.18
Nodes (20): formatRational(), surdText(), limitText(), cartesianEquations(), Cell, coordinateNames(), diagonalize(), dot() (+12 more)

### Community 121 - "Glifo"
Cohesion: 0.17
Nodes (12): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Glifo (+4 more)

### Community 122 - "spell.test.ts"
Cohesion: 0.11
Nodes (21): @codemirror/lang-markdown, @codemirror/state, mathMarkdown, misspelledMark, refreshSpelling, setTarget, SKIP, SpellTarget (+13 more)

### Community 124 - "render/lists.ts"
Cohesion: 0.27
Nodes (13): ListStyle, bulletGroup(), Marker, sameList(), alignInside(), asciiTrim(), findMarker(), Found (+5 more)

### Community 128 - "symbols.test.ts"
Cohesion: 0.33
Nodes (8): CATEGORIES, cardPreviewTex(), formPreviewTex(), ParsedTemplate, parseTemplate(), PLACEHOLDER_TEX, placeholderPreview(), templateText()

### Community 129 - "smoke-test.mjs"
Cohesion: 0.29
Nodes (4): markdown-it, vite, firstVisit(), plainContext

## Knowledge Gaps
- **569 isolated node(s):** `Account: i propri appunti su ogni dispositivo, anche da condividere`, `La lavagna: idee in più`, `Schemi: idee in più`, `Abbonamento e funzioni a pagamento (da capire)`, `Trascrizione delle lezioni in appunti` (+564 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 779 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `toLatex` to `touchlog.ts`, `symbols.test.ts`, `main.ts`, `sync.ts`, `num`, `Sheet`, `editor/lists.ts`, `markdown.ts`, `.constructor`, `store.ts`, `MathError`, `assistant.ts`, `h`, `board.ts`, `view3d.ts`, `distributions.ts`, `resize.ts`, `NotesStore`, `editor/editor.ts`, `board/shapes.ts`, `linsys.ts`, `search.ts`, `logo.ts`, `supabase.ts`, `parseSchema`, `sql.ts`, `insert.ts`, `schema/editor.ts`, `ink.ts`, `editor.test.ts`, `database.ts`, `page.ts`, `graph/file.ts`, `spell.test.ts`?**
  _High betweenness centrality (0.129) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `Dove sono le cose` to `touchlog.ts`, `Parser`, `main.ts`, `MathNode`, `spec.ts`, `several.ts`, `num`, `graph/preview.ts`, `odesolve.ts`, `svg.ts`, `Board`, `Rational`, `toNode`, `numerical.ts`, `markdown.ts`, `store.ts`, `MathError`, `assistant.ts`, `h`, `conics.ts`, `board.ts`, `view3d.ts`, `logic.ts`, `arithmetic.ts`, `namesIn`, `sheet.ts`, `NotesStore`, `study.ts`, `complex.ts`, `Converter`, `board/shapes.ts`, `linsys.ts`, `limits.ts`, `finite.ts`, `logo.ts`, `supabase.ts`, `parse.ts`, `schema/preview.ts`, `FormattedResult`, `math/calculus.ts`, `symbolic.ts`, `schema/editor.ts`, `ink.ts`, `inference.ts`, `Glifo – note per Claude`, `graph/file.ts`?**
  _High betweenness centrality (0.118) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `schema/preview.ts`, `main.ts`, `sql.ts`, `spec.ts`, `.folderItem`, `spellcheck`, `graph/preview.ts`, `resize.ts`, `toolbar.ts`, `editor/lists.ts`, `schema/editor.ts`, `SchemaEditor`, `page.ts`, `.constructor`, `logo.ts`, `spell.test.ts`, `SidePanel`, `board.ts`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **What connects `Account: i propri appunti su ogni dispositivo, anche da condividere`, `La lavagna: idee in più`, `Schemi: idee in più` to the rest of the system?**
  _569 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `touchlog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08653061224489796 - nodes in this community are weakly interconnected._
- **Should `Parser` be split into smaller, more focused modules?**
  _Cohesion score 0.12245696400625979 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.041615235408217245 - nodes in this community are weakly interconnected._