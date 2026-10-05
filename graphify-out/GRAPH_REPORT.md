# Graph Report - matherdown  (2026-10-05)

## Corpus Check
- 240 files · ~461,621 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 3960 nodes · 14151 edges · 131 communities (113 shown, 18 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 398 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `97d2072e`
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
- symbolic.ts
- editor/lists.ts
- svg.ts
- Board
- SchemaEditor
- Rational
- linsys.ts
- compile
- numerical.ts
- markdown.ts
- index.ts
- engine.ts
- ink.ts
- settings.ts
- store.ts
- MathError
- toLatex
- assistant.ts
- h
- conics.ts
- board.ts
- graph/space.ts
- distributions.ts
- calcResults.ts
- logic.ts
- gauss.ts
- arithmetic.ts
- namesIn
- probability.ts
- resize.ts
- statsShown.ts
- Pt
- NotesStore
- study.ts
- complex.ts
- graph.ts
- package.json
- vitest
- files.ts
- board/shapes.ts
- laplace.ts
- solve.ts
- search.ts
- statsGraph.ts
- strokes.ts
- finite.ts
- 20261004091555_note_condivise.sql
- logo.ts
- Field
- SidePanel
- schema/shapes.ts
- dependencies
- supabase.ts
- parse.ts
- ui/preview.ts
- scopeWith
- parseSchema
- FormattedResult
- sql.ts
- Benvenuto in Glifo
- compilerOptions
- Sheet
- Dove sono le cose
- insert.ts
- Converter
- toolbar.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- schemaTools.test.ts
- session-start.sh
- .claude/CLAUDE.md
- editor/editor.ts
- tutorial.mjs
- Abbonamenti
- inference.ts
- graphInsert.ts
- supabase-stub.sql
- account-test.mjs
- Il database degli account (Supabase)
- Costi
- MathNode
- regions.ts
- FoldersStore
- I modelli e le chiavi API
- suggestions.ts
- Le spiegazioni, come funzionano
- fake-supabase.mjs
- Piano per piano
- limits.ts
- Glifo – note per Claude
- page.ts
- BoardStore
- La lavagna
- graph/file.ts
- labels.ts
- sheet.ts
- Glifo
- spell.test.ts
- math/calculus.ts
- render/lists.ts
- .sameAs
- icons.mjs
- database.ts
- symbols.test.ts
- smoke-test.mjs
- downloadText

## God Nodes (most connected - your core abstractions)
1. `MathError` - 151 edges
2. `num()` - 145 edges
3. `Sheet` - 129 edges
4. `MathNode` - 128 edges
5. `Dove sono le cose` - 124 edges
6. `mul()` - 124 edges
7. `compile()` - 113 edges
8. `Rational` - 111 edges
9. `toLatex()` - 101 edges
10. `add()` - 98 edges

## Surprising Connections (you probably didn't know these)
- `Dove sono le cose` --references--> `ConicElements`  [INFERRED]
  CLAUDE.md → src/math/conics.ts
- `Come viene pubblicata` --references--> `dist()`  [INFERRED]
  README.md → src/board/shapes.ts
- `Dove sono le cose` --references--> `adoptGuestNotes()`  [INFERRED]
  CLAUDE.md → src/account/space.ts
- `Dove sono le cose` --references--> `sharedLinks()`  [INFERRED]
  CLAUDE.md → src/account/supabase.ts
- `Dove sono le cose` --references--> `shareNote()`  [INFERRED]
  CLAUDE.md → src/account/supabase.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (131 total, 18 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.09
Nodes (26): at(), browserStore, clip(), isSaved(), KINDS, LOG_KEY, LOG_MAX_LINES, LogStore (+18 more)

### Community 1 - "Parser"
Cohesion: 0.12
Nodes (16): Abbonamento e funzioni a pagamento (da capire), Account: i propri appunti su ogni dispositivo, anche da condividere, Aiuto con gli esercizi, Altre idee, Calcoli e grafici: idee in più, Idee per il futuro, In programma, La lavagna: idee in più (+8 more)

### Community 2 - "main.ts"
Cohesion: 0.05
Nodes (81): addToGraphBlock(), graphsForFile(), hide(), account, accountProblem(), active, app, applyAccountChange() (+73 more)

### Community 3 - "odesolve.ts"
Cohesion: 0.07
Nodes (55): Piece, addWave(), arrange(), compiled(), Condition, constantNames(), equalities(), Family (+47 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (33): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+25 more)

### Community 5 - "spec.ts"
Cohesion: 0.07
Nodes (70): conicItems(), isConicLine(), quadricEquation(), FieldContext, fourierItems(), isFourierLine(), isSeveralLine(), areaFor() (+62 more)

### Community 6 - "several.ts"
Cohesion: 0.08
Nodes (74): criticalLine(), named(), severalItems(), surface(), EMPTY_SCOPE, absOf(), boundsOf(), close() (+66 more)

### Community 7 - "primitive.ts"
Cohesion: 0.17
Nodes (59): atIntegers(), algebraic(), bigGcd(), byParts(), candidates(), canon(), combineLogs(), compareKeys() (+51 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (42): addLabel(), boxes, cameras, complexCoord(), coord(), drawings, drawnViews, endTex() (+34 more)

### Community 9 - "view3d.ts"
Cohesion: 0.09
Nodes (43): LayeredSolid, Face, FAST, planeTolerance(), splitFace(), splitLine(), surfacePlane(), Plane (+35 more)

### Community 10 - "symbolic.ts"
Cohesion: 0.07
Nodes (103): withoutAbs(), linearIn(), termTransform(), polyEx(), bernoulliFamily(), cauchy(), characteristicRoots(), constantParticular() (+95 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.10
Nodes (53): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+45 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (52): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), domainEdge(), features() (+44 more)

### Community 13 - "Board"
Cohesion: 0.10
Nodes (6): Board, clampZoom(), penErases(), sizeChoice(), validView(), BoardTheme

### Community 14 - "SchemaEditor"
Cohesion: 0.11
Nodes (3): SchemaEditor, createEdgeCell(), serializeSchema()

### Community 15 - "Rational"
Cohesion: 0.11
Nodes (22): expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactRandom, exactRoot(), factorialExact() (+14 more)

### Community 16 - "linsys.ts"
Cohesion: 0.14
Nodes (42): choices(), gcd(), matrixEquation(), matrixSystem(), minorsGcd(), ONE, parametricRows(), parametricSystem() (+34 more)

### Community 17 - "compile"
Cohesion: 0.11
Nodes (31): Interval, binomial(), compile(), compileApply(), compileDerivative(), compileFunction(), compileRandomFunction(), Condition (+23 more)

### Community 18 - "numerical.ts"
Cohesion: 0.11
Nodes (48): Funzionalità, FormatOptions, bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint() (+40 more)

### Community 19 - "markdown.ts"
Cohesion: 0.09
Nodes (40): @lezer/highlight, @lezer/markdown, lineDepth(), mathDelimTag, mathTag, parseBlockMath(), labelHtml(), checkHtml() (+32 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (42): b, bigops, c, calculus, fn, fr, fractions, functions (+34 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "ink.ts"
Cohesion: 0.11
Nodes (17): loadPrefs(), Prefs, BOARD_PALETTES, BoardPalette, highlightName(), inkName(), mid(), outlineSvg() (+9 more)

### Community 23 - "settings.ts"
Cohesion: 0.15
Nodes (20): addPersonalWord(), DICTIONARY_KEY, loadPersonalWords(), savePersonalWords(), tidy(), ACCOUNT_SETTINGS, accountSettings(), AI_MODELS (+12 more)

### Community 24 - "store.ts"
Cohesion: 0.10
Nodes (16): fake-indexeddb, BoardBackend, done(), fromRecord(), IdbBoards, ofNote(), openBoardDatabase(), openDefault() (+8 more)

### Community 25 - "MathError"
Cohesion: 0.11
Nodes (62): MathError, angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, dataOf() (+54 more)

### Community 26 - "toLatex"
Cohesion: 0.12
Nodes (32): isNumericalLine(), numericalItems(), names(), STUDY_GRAPH, studyItems(), ACCENT_COMMANDS, COMPLEX_FUNCTIONS, diffLatex() (+24 more)

### Community 27 - "assistant.ts"
Cohesion: 0.10
Nodes (28): AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible(), askThroughHost() (+20 more)

### Community 28 - "h"
Cohesion: 0.06
Nodes (57): SyncStatus, board, helpButton, openGuide(), viewSwitch, openSignedOut(), printButton(), ShareDialogDeps (+49 more)

### Community 29 - "conics.ts"
Cohesion: 0.17
Nodes (29): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+21 more)

### Community 30 - "board.ts"
Cohesion: 0.08
Nodes (26): Action, ACTION_NAMES, BoardOptions, DOT_SIZES, DrawAction, EraseAction, EraserMode, ICON (+18 more)

### Community 31 - "graph/space.ts"
Cohesion: 0.13
Nodes (43): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+35 more)

### Community 32 - "distributions.ts"
Cohesion: 0.17
Nodes (26): choose(), continuousQuantile(), discreteQuantile(), factorialBig(), FAMILIES, integerParam(), invalid(), makeDistribution() (+18 more)

### Community 33 - "calcResults.ts"
Cohesion: 0.12
Nodes (14): acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult, calcResults(), CheckWidget, formulasUntil() (+6 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "gauss.ts"
Cohesion: 0.14
Nodes (16): COMPLEX_FUNCTIONS, farthest(), hasExponential(), isComplexLine(), isComplexValue(), isSegmentNode(), onlyComplex(), SAMPLES (+8 more)

### Community 36 - "arithmetic.ts"
Cohesion: 0.10
Nodes (48): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+40 more)

### Community 37 - "namesIn"
Cohesion: 0.14
Nodes (35): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+27 more)

### Community 38 - "probability.ts"
Cohesion: 0.08
Nodes (34): addExp(), Distribution, End, exactIntervalProbability(), Family, integerRange(), intervalProbability(), subtractExp() (+26 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "statsShown.ts"
Cohesion: 0.19
Nodes (29): check(), correlation(), count(), covariance(), Data, dataStatistic(), deviation(), fail() (+21 more)

### Community 41 - "Pt"
Cohesion: 0.21
Nodes (7): coalesced(), Finger, pointsOf(), pressureOf(), EllipseFit, newStrokeId(), Pt

### Community 42 - "NotesStore"
Cohesion: 0.07
Nodes (34): accountSpace(), adoptGuestNotes(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf(), setCurrentAccount() (+26 more)

### Community 43 - "study.ts"
Cohesion: 0.14
Nodes (35): breaks(), periodOf(), Asymptote, boundaries(), compiled(), cutsOf(), defined(), domainOf() (+27 more)

### Community 44 - "complex.ts"
Cohesion: 0.06
Nodes (62): gaussItem(), inZ(), isInequality(), realEverywhere(), realSide(), setNode(), add(), allRoots() (+54 more)

### Community 45 - "graph.ts"
Cohesion: 0.10
Nodes (30): AT_X, cellHtml(), cellText(), COMPASS, createGraph(), drawSchema(), edgeLook(), edgeStyle() (+22 more)

### Community 46 - "package.json"
Cohesion: 0.05
Nodes (38): description, devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript (+30 more)

### Community 47 - "vitest"
Cohesion: 0.07
Nodes (37): vitest, staticGraphSvg(), chooseWindow(), formulaGraph(), GraphItem, GraphSpec, parseGraph(), typedSliderValue() (+29 more)

### Community 48 - "files.ts"
Cohesion: 0.27
Nodes (11): inClaudeViewer(), canWriteFilesDirectly(), FsWindow, isAbort(), MD_TYPES, OpenedFile, openMarkdownFiles(), PickerType (+3 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.14
Nodes (34): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+26 more)

### Community 50 - "laplace.ts"
Cohesion: 0.17
Nodes (27): factoredPolynomial(), beyondPoles(), compiled(), E, exp(), fractionShown(), HALF, hyperbolicToExp() (+19 more)

### Community 51 - "solve.ts"
Cohesion: 0.15
Nodes (27): LinearScope, splitRoot(), surdText(), isStandardUnknown(), linearSystem(), RelOp, cubeRoot(), equation() (+19 more)

### Community 52 - "search.ts"
Cohesion: 0.17
Nodes (23): editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex() (+15 more)

### Community 53 - "statsGraph.ts"
Cohesion: 0.22
Nodes (15): isTestLine(), number(), testItems(), classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX (+7 more)

### Community 54 - "strokes.ts"
Cohesion: 0.18
Nodes (18): between(), Box, boxesTouch(), capsuleSpan(), circleSpan(), compareStrokes(), eraserGrowth(), eraseStroke() (+10 more)

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
Cohesion: 0.11
Nodes (8): characteristicPolynomial(), eigenvalues(), eigenvectors(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn()

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
Cohesion: 0.12
Nodes (31): @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken(), ensureSessionOf() (+23 more)

### Community 63 - "parse.ts"
Cohesion: 0.07
Nodes (36): hasWord(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, differentialInFraction() (+28 more)

### Community 64 - "ui/preview.ts"
Cohesion: 0.26
Nodes (3): GraphLabels, Preview, PreviewCallbacks

### Community 65 - "scopeWith"
Cohesion: 0.16
Nodes (28): integralRegion, axesIn(), bestAlong(), boundingBox(), combine(), compileDomain(), compileMultiple(), conditionsOf() (+20 more)

### Community 66 - "parseSchema"
Cohesion: 0.10
Nodes (27): SchemaEditorOptions, hide(), OPEN, schemasForFile(), schemasFromFile(), unhide(), Look, isRecord() (+19 more)

### Community 67 - "FormattedResult"
Cohesion: 0.21
Nodes (5): withWorkLimit(), FormattedResult, styleOf(), walk(), needsSymbols()

### Community 68 - "sql.ts"
Cohesion: 0.17
Nodes (17): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+9 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "Sheet"
Cohesion: 0.12
Nodes (22): Sheet, text(), tex(), text(), check(), result(), text(), result() (+14 more)

### Community 72 - "Dove sono le cose"
Cohesion: 0.11
Nodes (14): Dove sono le cose, chiSquareTest(), InferenceContext, significance(), differentialRequest, pieces(), chainOf(), definitionTarget() (+6 more)

### Community 73 - "insert.ts"
Cohesion: 0.13
Nodes (17): @codemirror/state, @codemirror/view, InsertOptions, toggleLinePrefix(), addPlaceholders, Placeholder, besideSchema(), guardBlocks() (+9 more)

### Community 74 - "Converter"
Cohesion: 0.20
Nodes (14): Converter, definiteParts(), definiteValue(), expandCalculus(), fieldName(), functionOf(), isField(), isVectorBody() (+6 more)

### Community 75 - "toolbar.ts"
Cohesion: 0.11
Nodes (16): EditorCallbacks, MarkdownEditor, insertBlock(), insertTemplate(), wrapSelection(), Action, createToolbar(), insertCode() (+8 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.05
Nodes (57): ALIGN, ARROW_NAMES, AT_ICONS, AT_NAMES, BASE_PRESETS, BIG_ARROWS, DB_PRESETS, Direction (+49 more)

### Community 79 - "schemaTools.test.ts"
Cohesion: 0.14
Nodes (20): alignBoxes(), Alignment, Box, distributeBoxes(), Position, base64(), crc32(), svgSize() (+12 more)

### Community 82 - "editor/editor.ts"
Cohesion: 0.06
Nodes (39): @codemirror/autocomplete, @codemirror/language, @lezer/common, closeMathBlockOnEnter(), highlight, italianPhrases, tabOutOfMath(), templateInsertion() (+31 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.12
Nodes (10): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+2 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.14
Nodes (14): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+6 more)

### Community 91 - "inference.ts"
Cohesion: 0.18
Nodes (23): confidence(), confidenceShown(), Given, hypothesisTest(), interval(), meanOf(), nameOf(), num() (+15 more)

### Community 92 - "graphInsert.ts"
Cohesion: 0.15
Nodes (19): formulaAtCursor(), GraphLabelLines, insertGraphBlock(), setGraphLabels(), blockLines(), formulaGraphLine(), graphBlockText(), graphNames() (+11 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.20
Nodes (4): device(), login(), newContext, waitFor()

### Community 97 - "Il database degli account (Supabase)"
Cohesion: 0.17
Nodes (11): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Nell'app, Note condivise con un link (+3 more)

### Community 98 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, Quando lo studente dice di cominciare

### Community 100 - "MathNode"
Cohesion: 0.16
Nodes (8): GaussLine, Definition, Line, ExactComplexScope, Ode, FiniteContext, MathNode, Found

### Community 101 - "regions.ts"
Cohesion: 0.17
Nodes (22): constantIntegrand(), depth(), inequalityMargin(), Multiple, multipleOf(), planeMargin(), PlanePart, planeParts() (+14 more)

### Community 102 - "FoldersStore"
Cohesion: 0.08
Nodes (16): cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder(), loadClosedFolders(), RemoteFolder (+8 more)

### Community 103 - "I modelli e le chiavi API"
Cohesion: 0.50
Nodes (4): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), Le idee dello studente (5 ottobre 2026)

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

### Community 108 - "limits.ts"
Cohesion: 0.19
Nodes (19): close(), Definite, definiteIntegral(), exValue(), samples(), integrate(), kronrod(), alternating() (+11 more)

### Community 109 - "Glifo – note per Claude"
Cohesion: 0.29
Nodes (7): Comandi, Come controllare il lavoro, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole, sqlite()

### Community 110 - "page.ts"
Cohesion: 0.06
Nodes (45): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), currentAccount(), PullResult, openShareDialog(), changeAccess() (+37 more)

### Community 111 - "BoardStore"
Cohesion: 0.13
Nodes (3): BoardStore, MemoryBoards, backup()

### Community 113 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 115 - "graph/file.ts"
Cohesion: 0.19
Nodes (18): FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsFromFile(), OPEN, swatchSvg() (+10 more)

### Community 116 - "labels.ts"
Cohesion: 0.16
Nodes (19): ACCENTS, BLACKBOARD, CALLIGRAPHIC, closing(), convert(), escapeXml(), FUNCTIONS, GREEK (+11 more)

### Community 117 - "sheet.ts"
Cohesion: 0.06
Nodes (55): expSumValue(), ExactFunction, ExactScope, decimalSeparator(), Digits, formatNumber(), formatRational(), fromNumber() (+47 more)

### Community 121 - "Glifo"
Cohesion: 0.17
Nodes (12): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Glifo (+4 more)

### Community 122 - "spell.test.ts"
Cohesion: 0.08
Nodes (25): @codemirror/commands, @codemirror/lang-markdown, mathMarkdown, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck() (+17 more)

### Community 123 - "math/calculus.ts"
Cohesion: 0.30
Nodes (13): argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot(), fieldOn(), numericPartials() (+5 more)

### Community 124 - "render/lists.ts"
Cohesion: 0.27
Nodes (13): ListStyle, bulletGroup(), Marker, sameList(), alignInside(), asciiTrim(), findMarker(), Found (+5 more)

### Community 125 - ".sameAs"
Cohesion: 0.21
Nodes (6): close(), digitsMatch(), isLiteral(), linearCells(), pairUp(), writtenDecimals()

### Community 127 - "database.ts"
Cohesion: 0.24
Nodes (6): @electric-sql/pglite, createDatabase(), createUser(), databaseTests(), migrations, shareTests()

### Community 128 - "symbols.test.ts"
Cohesion: 0.33
Nodes (8): CATEGORIES, cardPreviewTex(), formPreviewTex(), ParsedTemplate, parseTemplate(), PLACEHOLDER_TEX, placeholderPreview(), templateText()

### Community 129 - "smoke-test.mjs"
Cohesion: 0.29
Nodes (4): markdown-it, vite, firstVisit(), plainContext

### Community 130 - "downloadText"
Cohesion: 0.48
Nodes (4): loadDialect(), downloadBlob(), downloadText(), fileNameFor()

## Knowledge Gaps
- **569 isolated node(s):** `Comandi`, `Promemoria per lo studente`, `Regole`, `graphify`, `Condividere una nota con un link` (+564 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 779 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `touchlog.ts`, `Parser`, `main.ts`, `odesolve.ts`, `spec.ts`, `several.ts`, `primitive.ts`, `graph/preview.ts`, `symbolic.ts`, `svg.ts`, `Board`, `linsys.ts`, `numerical.ts`, `markdown.ts`, `ink.ts`, `settings.ts`, `MathError`, `toLatex`, `assistant.ts`, `h`, `conics.ts`, `graph/space.ts`, `logic.ts`, `gauss.ts`, `arithmetic.ts`, `namesIn`, `Pt`, `NotesStore`, `study.ts`, `complex.ts`, `graph.ts`, `vitest`, `board/shapes.ts`, `strokes.ts`, `finite.ts`, `logo.ts`, `supabase.ts`, `parse.ts`, `ui/preview.ts`, `FormattedResult`, `Converter`, `schema/editor.ts`, `schemaTools.test.ts`, `inference.ts`, `graphInsert.ts`, `limits.ts`, `Glifo – note per Claude`, `BoardStore`, `graph/file.ts`, `sheet.ts`, `math/calculus.ts`?**
  _High betweenness centrality (0.148) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `touchlog.ts`, `symbols.test.ts`, `main.ts`, `sync.ts`, `view3d.ts`, `symbolic.ts`, `editor/lists.ts`, `Rational`, `linsys.ts`, `markdown.ts`, `ink.ts`, `settings.ts`, `store.ts`, `MathError`, `assistant.ts`, `h`, `board.ts`, `distributions.ts`, `resize.ts`, `NotesStore`, `package.json`, `board/shapes.ts`, `search.ts`, `strokes.ts`, `logo.ts`, `supabase.ts`, `parseSchema`, `sql.ts`, `Sheet`, `insert.ts`, `toolbar.ts`, `schemaTools.test.ts`, `editor/editor.ts`, `graphInsert.ts`, `FoldersStore`, `page.ts`, `graph/file.ts`, `spell.test.ts`, `database.ts`?**
  _High betweenness centrality (0.106) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `ui/preview.ts`, `main.ts`, `downloadText`, `FoldersStore`, `resize.ts`, `graph/preview.ts`, `toolbar.ts`, `Board`, `schema/editor.ts`, `graph.ts`, `SchemaEditor`, `page.ts`, `vitest`, `ink.ts`, `logo.ts`, `spell.test.ts`, `SidePanel`, `board.ts`?**
  _High betweenness centrality (0.055) - this node is a cross-community bridge._
- **Are the 123 inferred relationships involving `Dove sono le cose` (e.g. with `adoptGuestNotes()` and `sharedLinks()`) actually correct?**
  _`Dove sono le cose` has 123 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Comandi`, `Promemoria per lo studente`, `Regole` to the rest of the system?**
  _569 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `touchlog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08653061224489796 - nodes in this community are weakly interconnected._
- **Should `Parser` be split into smaller, more focused modules?**
  _Cohesion score 0.12245696400625979 - nodes in this community are weakly interconnected._