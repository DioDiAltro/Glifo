# Graph Report - matherdown  (2026-10-05)

## Corpus Check
- 232 files · ~439,476 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 3826 nodes · 13728 edges · 120 communities (102 shown, 18 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 380 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f28256f5`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- linsys.ts
- Parser
- main.ts
- odesolve.ts
- sync.ts
- spec.ts
- arithmetic.ts
- num
- graph/preview.ts
- downloadText
- symbolic.ts
- editor/lists.ts
- svg.ts
- Board
- SchemaEditor
- Rational
- graph/space.ts
- compile
- numerical.ts
- FoldersStore
- index.ts
- engine.ts
- markdown.ts
- graph.ts
- BoardStore
- MathError
- toLatex
- assistant.ts
- parseSchema
- conics.ts
- board.ts
- view3d.ts
- distributions.ts
- calcResults.ts
- logic.ts
- scopeWith
- laplace.ts
- namesIn
- probability.ts
- resize.ts
- statsShown.ts
- store.ts
- NotesStore
- study.ts
- complex.ts
- formatNumber
- regions.ts
- vitest
- parse.ts
- spellcheck
- inference.ts
- solve.ts
- sidePanel.ts
- fourier.ts
- strokes.ts
- finite.ts
- 20261004091555_note_condivise.sql
- insert.ts
- Field
- renderTex
- shapes.ts
- dependencies
- supabase.ts
- .add
- schema/preview.ts
- sheet.ts
- Sheet
- Glifo
- sql.ts
- Benvenuto in Glifo
- compilerOptions
- editor/editor.ts
- .setView
- templates.ts
- logo.ts
- toolbar.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- graph/file.ts
- session-start.sh
- .claude/CLAUDE.md
- editor.test.ts
- tutorial.mjs
- Abbonamenti
- grafo-html.mjs
- several.ts
- supabase-stub.sql
- account-test.mjs
- Il database degli account (Supabase)
- Costi
- smoke-test.mjs
- createFakeSupabase
- h
- I modelli e le chiavi API
- numericalGraph.ts
- Le spiegazioni, come funzionano
- fake-supabase.mjs
- Piano per piano
- devDependencies
- Glifo – note per Claude
- page.ts
- icons.mjs
- La lavagna
- severalGraph.ts
- scripts
- spaces.ts

## God Nodes (most connected - your core abstractions)
1. `MathError` - 151 edges
2. `num()` - 145 edges
3. `Sheet` - 129 edges
4. `MathNode` - 128 edges
5. `mul()` - 124 edges
6. `compile()` - 113 edges
7. `Rational` - 111 edges
8. `Dove sono le cose` - 110 edges
9. `toLatex()` - 101 edges
10. `add()` - 98 edges

## Surprising Connections (you probably didn't know these)
- `Funzionalità` --references--> `k()`  [INFERRED]
  README.md → src/math/numerical.ts
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

## Communities (120 total, 18 thin omitted)

### Community 0 - "linsys.ts"
Cohesion: 0.14
Nodes (41): evaluateLinear(), choices(), gcd(), matrixEquation(), matrixSystem(), minorsGcd(), ONE, parametricRows() (+33 more)

### Community 1 - "Parser"
Cohesion: 0.11
Nodes (18): Abbonamento e funzioni a pagamento (da capire), Account: i propri appunti su ogni dispositivo, anche da condividere, Aiuto con gli esercizi, Altre idee, Calcoli e grafici: idee in più, Idee per il futuro, In programma, La lavagna (la base è fatta sul ramo `prova`: da provare) (+10 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (97): addToGraphBlock(), setGraphLabels(), account, accountButton, active, app, applySpellcheck(), applyTheme() (+89 more)

### Community 3 - "odesolve.ts"
Cohesion: 0.08
Nodes (76): addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames(), constantParticular() (+68 more)

### Community 4 - "sync.ts"
Cohesion: 0.05
Nodes (38): @electric-sql/pglite, AccountSync, withLock(), Account, EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+30 more)

### Community 5 - "spec.ts"
Cohesion: 0.07
Nodes (71): conicItems(), isConicLine(), quadricEquation(), isComplexLine(), isComplexValue(), isSegmentNode(), areaFor(), areaOf() (+63 more)

### Community 6 - "arithmetic.ts"
Cohesion: 0.08
Nodes (63): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+55 more)

### Community 7 - "num"
Cohesion: 0.14
Nodes (80): atIntegers(), polyEx(), similarSolution(), algebraic(), bigGcd(), byParts(), candidates(), canon() (+72 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (45): addLabel(), boxes, cameras, complexCoord(), containing(), coord(), drawings, drawnViews (+37 more)

### Community 9 - "downloadText"
Cohesion: 0.29
Nodes (9): base64(), crc32(), svgSize(), svgToPng(), withDensity(), downloadBlob(), downloadText(), fileNameFor() (+1 more)

### Community 10 - "symbolic.ts"
Cohesion: 0.07
Nodes (62): primitive(), verified(), atValues(), combine(), commonMonomial(), Converter, coordinates(), decimalText() (+54 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.12
Nodes (49): applyListStyle(), continueList(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext(), isBlank() (+41 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (53): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), domainEdge(), features() (+45 more)

### Community 13 - "Board"
Cohesion: 0.12
Nodes (3): Board, penErases(), BoardTheme

### Community 15 - "Rational"
Cohesion: 0.10
Nodes (25): exactSqrt(), unavailable(), expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactRandom (+17 more)

### Community 16 - "graph/space.ts"
Cohesion: 0.12
Nodes (43): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+35 more)

### Community 17 - "compile"
Cohesion: 0.09
Nodes (42): argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot(), fieldOn(), outward() (+34 more)

### Community 18 - "numerical.ts"
Cohesion: 0.12
Nodes (47): bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial(), interpolating() (+39 more)

### Community 19 - "FoldersStore"
Cohesion: 0.07
Nodes (20): cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder(), loadClosedFolders(), RemoteFolder (+12 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (42): b, bigops, c, calculus, fn, fr, fractions, functions (+34 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "markdown.ts"
Cohesion: 0.08
Nodes (41): dompurify, highlight.js, markdown-it-footnote, commandTokenAt(), bulletGroup(), sameList(), renderTexOrError(), renderTexWithResult() (+33 more)

### Community 23 - "graph.ts"
Cohesion: 0.13
Nodes (26): AT_X, cellHtml(), cellText(), COMPASS, createEdgeCell(), createGraph(), drawSchema(), edgeLook() (+18 more)

### Community 24 - "BoardStore"
Cohesion: 0.09
Nodes (5): BoardOptions, BoardBackend, BoardStore, MemoryBoards, applyAccountChange()

### Community 25 - "MathError"
Cohesion: 0.11
Nodes (62): MathError, angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, dataOf() (+54 more)

### Community 26 - "toLatex"
Cohesion: 0.11
Nodes (31): fourierItems(), isFourierLine(), names(), STUDY_GRAPH, studyItems(), partialSum(), ACCENT_COMMANDS, COMPLEX_FUNCTIONS (+23 more)

### Community 27 - "assistant.ts"
Cohesion: 0.07
Nodes (39): AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible(), askThroughHost() (+31 more)

### Community 28 - "parseSchema"
Cohesion: 0.14
Nodes (17): SchemaEditorOptions, hide(), OPEN, schemasForFile(), schemasFromFile(), unhide(), isRecord(), num() (+9 more)

### Community 29 - "conics.ts"
Cohesion: 0.21
Nodes (27): at(), centralCanonical(), Coefficients, coneCanonical(), conicOf(), det2(), det3(), determinant() (+19 more)

### Community 30 - "board.ts"
Cohesion: 0.11
Nodes (26): perfect-freehand, Action, DrawAction, EraseAction, ERASER_RADIUS, Finger, ICON, loadPrefs() (+18 more)

### Community 31 - "view3d.ts"
Cohesion: 0.09
Nodes (40): tickLabel(), Face, planeSide(), planeTolerance(), regionFaces(), splitFace(), splitLine(), splitPolygon() (+32 more)

### Community 32 - "distributions.ts"
Cohesion: 0.12
Nodes (33): addExp(), choose(), continuousQuantile(), discreteQuantile(), exactIntervalProbability(), factorialBig(), FAMILIES, Family (+25 more)

### Community 33 - "calcResults.ts"
Cohesion: 0.06
Nodes (33): katex, @lezer/common, acceptCalcResult(), CalcCheck, calcPlugin, CalcResult, CheckWidget, formulasUntil() (+25 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (27): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+19 more)

### Community 35 - "scopeWith"
Cohesion: 0.14
Nodes (27): axesIn(), bestAlong(), boundingBox(), combine(), compileDomain(), compileMultiple(), conditionsOf(), constantOf() (+19 more)

### Community 36 - "laplace.ts"
Cohesion: 0.15
Nodes (30): factoredPolynomial(), beyondPoles(), compiled(), E, exp(), fractionShown(), HALF, hyperbolicToExp() (+22 more)

### Community 37 - "namesIn"
Cohesion: 0.13
Nodes (36): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+28 more)

### Community 38 - "probability.ts"
Cohesion: 0.14
Nodes (24): End, compare(), compileCondition(), fractionNear(), ALL, compileOf(), complement(), endAt() (+16 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "statsShown.ts"
Cohesion: 0.17
Nodes (31): check(), correlation(), count(), covariance(), Data, dataStatistic(), deviation(), fail() (+23 more)

### Community 41 - "store.ts"
Cohesion: 0.12
Nodes (18): Prefs, BoardPalette, BackupBoard, done(), fromRecord(), IdbBoards, ofNote(), openBoardDatabase() (+10 more)

### Community 42 - "NotesStore"
Cohesion: 0.08
Nodes (29): accountSpace(), adoptGuestNotes(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf(), setCurrentAccount() (+21 more)

### Community 43 - "study.ts"
Cohesion: 0.09
Nodes (47): close(), Definite, definiteIntegral(), exValue(), samples(), EMPTY_SCOPE, Piece, limit() (+39 more)

### Community 44 - "complex.ts"
Cohesion: 0.05
Nodes (76): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isInequality(), onlyComplex() (+68 more)

### Community 45 - "formatNumber"
Cohesion: 0.13
Nodes (23): isTestLine(), number(), testItems(), classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX (+15 more)

### Community 46 - "regions.ts"
Cohesion: 0.12
Nodes (30): constantIntegrand(), depth(), inequalityMargin(), integralRegion, LayeredSolid, Multiple, multipleOf(), planeMargin() (+22 more)

### Community 47 - "vitest"
Cohesion: 0.08
Nodes (35): vitest, staticGraphSvg(), chooseWindow(), chooseBox(), surfacePlane(), formulaGraph(), GraphItem, parseGraph() (+27 more)

### Community 48 - "parse.ts"
Cohesion: 0.07
Nodes (37): hasWord(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, differentialInFraction() (+29 more)

### Community 49 - "spellcheck"
Cohesion: 0.21
Nodes (8): spellcheck(), close(), misspelledAt(), openAt(), replace(), tooltipView(), SpellChecker, SpellcheckOptions

### Community 50 - "inference.ts"
Cohesion: 0.14
Nodes (25): chiSquareTest(), confidence(), confidenceShown(), Given, hypothesisTest(), InferenceContext, interval(), meanOf() (+17 more)

### Community 51 - "solve.ts"
Cohesion: 0.16
Nodes (27): nameLatex(), LinearScope, isStandardUnknown(), linearSystem(), RelOp, breaks(), cubeRoot(), equation() (+19 more)

### Community 52 - "sidePanel.ts"
Cohesion: 0.08
Nodes (42): templateInsertion(), EditorMathContext, expand(), preferredIndex(), SuggestionController, SuggestionItem, editDistance(), normalizeText() (+34 more)

### Community 53 - "fourier.ts"
Cohesion: 0.22
Nodes (20): absOf(), boundsOf(), close(), definite(), fourierProblem, fourierShown(), isTrig(), isZero() (+12 more)

### Community 54 - "strokes.ts"
Cohesion: 0.16
Nodes (15): between(), Box, boxesTouch(), capsuleSpan(), circleSpan(), compareStrokes(), eraseStroke(), intersect() (+7 more)

### Community 55 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "insert.ts"
Cohesion: 0.14
Nodes (16): @codemirror/view, InsertOptions, toggleLinePrefix(), LIST_STYLES, besideSchema(), guardBlocks(), schemaBlockRanges(), schemaBlocks() (+8 more)

### Community 58 - "Field"
Cohesion: 0.13
Nodes (5): eigenvalues(), Field, interpolate(), interpolateFloat(), polynomialIn()

### Community 59 - "renderTex"
Cohesion: 0.23
Nodes (6): formulaAtCursor(), cleanKatexError(), renderTex(), displayCode(), preventFocusSteal(), SidePanel

### Community 60 - "shapes.ts"
Cohesion: 0.09
Nodes (15): @maxgraph/core, ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape (+7 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (24): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+16 more)

### Community 62 - "supabase.ts"
Cohesion: 0.11
Nodes (36): @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken(), ensureSessionOf() (+28 more)

### Community 63 - ".add"
Cohesion: 0.10
Nodes (17): text(), tex(), text(), result(), text(), text(), text(), result() (+9 more)

### Community 64 - "schema/preview.ts"
Cohesion: 0.14
Nodes (14): GraphLabels, GraphLook, Look, Theme, draw(), drawCached(), drawn, errorHtml() (+6 more)

### Community 65 - "sheet.ts"
Cohesion: 0.04
Nodes (57): Dove sono le cose, calcOutcomes(), FieldContext, ComplexDefinitions, withoutResult(), numericPartials(), complex, ComplexFunction (+49 more)

### Community 66 - "Sheet"
Cohesion: 0.11
Nodes (19): ExactComplexScope, ConicInfo, Ode, expSumValue(), withWorkLimit(), ExactScope, FormattedResult, differentialRequest (+11 more)

### Community 67 - "Glifo"
Cohesion: 0.15
Nodes (13): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Funzionalità (+5 more)

### Community 68 - "sql.ts"
Cohesion: 0.16
Nodes (19): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+11 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "editor/editor.ts"
Cohesion: 0.04
Nodes (56): description, name, private, type, version, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands (+48 more)

### Community 72 - ".setView"
Cohesion: 0.20
Nodes (5): clampZoom(), coalesced(), pressureOf(), validView(), newStrokeId()

### Community 73 - "templates.ts"
Cohesion: 0.13
Nodes (15): DEFAULT_EDGE, SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), conceptMap, cycle, er (+7 more)

### Community 74 - "logo.ts"
Cohesion: 0.33
Nodes (6): sidebarToggle(), BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark()

### Community 75 - "toolbar.ts"
Cohesion: 0.11
Nodes (16): EditorCallbacks, MarkdownEditor, insertBlock(), insertTemplate(), wrapSelection(), SidePanelDeps, Action, createToolbar() (+8 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.05
Nodes (60): alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ARROW_NAMES, AT_ICONS (+52 more)

### Community 79 - "graph/file.ts"
Cohesion: 0.09
Nodes (42): calcResults(), FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsForFile(), graphsFromFile() (+34 more)

### Community 82 - "editor.test.ts"
Cohesion: 0.10
Nodes (18): addPlaceholders, buildDecorations(), clearAllPlaceholders(), clearPlaceholders, CommandTarget, contains(), currentIndex(), filledMark (+10 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.20
Nodes (6): centerOf(), clickOn(), ffmpeg, SCENES, SIZE, work

### Community 90 - "Abbonamenti"
Cohesion: 0.14
Nodes (14): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+6 more)

### Community 91 - "grafo-html.mjs"
Cohesion: 0.25
Nodes (4): graphFile, names, namesFile, root

### Community 92 - "several.ts"
Cohesion: 0.15
Nodes (34): at(), bounded(), Candidate, candidates(), compiled(), COORDS, coordShown(), Critical (+26 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.20
Nodes (4): device(), login(), newContext, waitFor()

### Community 97 - "Il database degli account (Supabase)"
Cohesion: 0.17
Nodes (11): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Nell'app, Note condivise con un link (+3 more)

### Community 98 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, Quando lo studente dice di cominciare

### Community 100 - "smoke-test.mjs"
Cohesion: 0.29
Nodes (4): markdown-it, vite, firstVisit(), plainContext

### Community 101 - "createFakeSupabase"
Cohesion: 0.60
Nodes (6): createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 102 - "h"
Cohesion: 0.07
Nodes (47): SyncStatus, helpButton, openGuide(), viewSwitch, openSignedOut(), printButton(), ShareDialogDeps, DEFAULT_SETTINGS (+39 more)

### Community 103 - "I modelli e le chiavi API"
Cohesion: 0.50
Nodes (4): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), Le idee dello studente (5 ottobre 2026)

### Community 104 - "numericalGraph.ts"
Cohesion: 0.80
Nodes (4): isNumericalLine(), numericalItems(), isPlottedNumerical(), numericalPlot()

### Community 105 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 106 - "fake-supabase.mjs"
Cohesion: 0.29
Nodes (5): b64(), CODE, GOOGLE_CODE, ROOT, SUPABASE_URL

### Community 107 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 108 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

### Community 109 - "Glifo – note per Claude"
Cohesion: 0.29
Nodes (7): Comandi, Come controllare il lavoro, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole, sqlite()

### Community 110 - "page.ts"
Cohesion: 0.06
Nodes (46): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), currentAccount(), PullResult, openShareDialog(), changeAccess() (+38 more)

### Community 113 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta il 5 ottobre 2026 sul ramo `prova`, da provare)

### Community 114 - "severalGraph.ts"
Cohesion: 0.54
Nodes (7): criticalLine(), isSeveralLine(), named(), severalItems(), surface(), optimumOf(), severalOf()

### Community 115 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 117 - "spaces.ts"
Cohesion: 0.12
Nodes (28): decimalSeparator(), Digits, FormatOptions, formatRational(), fromNumber(), fromRational(), SUPERSCRIPT, writeDigits() (+20 more)

## Knowledge Gaps
- **553 isolated node(s):** `session-start.sh script`, `name`, `private`, `version`, `description` (+548 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 755 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `linsys.ts`, `main.ts`, `sync.ts`, `num`, `editor/lists.ts`, `svg.ts`, `FoldersStore`, `markdown.ts`, `MathError`, `assistant.ts`, `parseSchema`, `board.ts`, `distributions.ts`, `scopeWith`, `resize.ts`, `store.ts`, `NotesStore`, `sidePanel.ts`, `strokes.ts`, `insert.ts`, `supabase.ts`, `.add`, `sheet.ts`, `sql.ts`, `editor/editor.ts`, `logo.ts`, `schema/editor.ts`, `graph/file.ts`, `editor.test.ts`, `h`, `page.ts`?**
  _High betweenness centrality (0.138) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `sheet.ts` to `linsys.ts`, `Parser`, `main.ts`, `odesolve.ts`, `spec.ts`, `arithmetic.ts`, `num`, `graph/preview.ts`, `downloadText`, `symbolic.ts`, `svg.ts`, `Rational`, `graph/space.ts`, `numerical.ts`, `markdown.ts`, `BoardStore`, `MathError`, `toLatex`, `assistant.ts`, `namesIn`, `NotesStore`, `study.ts`, `complex.ts`, `formatNumber`, `parse.ts`, `inference.ts`, `fourier.ts`, `strokes.ts`, `finite.ts`, `supabase.ts`, `schema/preview.ts`, `Sheet`, `logo.ts`, `schema/editor.ts`, `graph/file.ts`, `several.ts`, `h`, `numericalGraph.ts`, `Glifo – note per Claude`?**
  _High betweenness centrality (0.094) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `schema/preview.ts`, `main.ts`, `editor/editor.ts`, `graph/preview.ts`, `resize.ts`, `logo.ts`, `toolbar.ts`, `Board`, `schema/editor.ts`, `SchemaEditor`, `page.ts`, `spellcheck`, `FoldersStore`, `sidePanel.ts`, `renderTex`, `board.ts`?**
  _High betweenness centrality (0.048) - this node is a cross-community bridge._
- **What connects `session-start.sh script`, `name`, `private` to the rest of the system?**
  _553 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `linsys.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1393939393939394 - nodes in this community are weakly interconnected._
- **Should `Parser` be split into smaller, more focused modules?**
  _Cohesion score 0.11495495495495496 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04162419300033979 - nodes in this community are weakly interconnected._