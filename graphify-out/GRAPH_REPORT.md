# Graph Report - matherdown  (2026-10-06)

## Corpus Check
- 242 files · ~470,786 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 4022 nodes · 14451 edges · 122 communities (103 shown, 19 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 414 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `269da502`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- touchlog.ts
- parse.ts
- main.ts
- odesolve.ts
- sync.ts
- spec.ts
- several.ts
- primitive.ts
- graph/preview.ts
- parseGraph
- num
- editor/lists.ts
- svg.ts
- sheet.ts
- SchemaEditor
- Rational
- laplace.ts
- compile
- numerical.ts
- markdown.ts
- index.ts
- engine.ts
- Board
- formatNumber
- store.ts
- MathError
- toLatex
- assistant.ts
- h
- conics.ts
- Pt
- graph/space.ts
- distributions.ts
- graphNote.test.ts
- logic.ts
- templates.ts
- arithmetic.ts
- namesIn
- probability.ts
- resize.ts
- statsShown.ts
- view3d.ts
- NotesStore
- study.ts
- complex.ts
- graph.ts
- editor/editor.ts
- linear.test.ts
- tutorial.ts
- board/shapes.ts
- linsys.ts
- solve.ts
- search.ts
- statsGraph.ts
- Più avanti
- finite.ts
- 20261004091555_note_condivise.sql
- database.ts
- Field
- renderTex
- schema/shapes.ts
- dependencies
- supabase.ts
- Le spiegazioni, come funzionano
- schema/preview.ts
- domain.ts
- parseSchema
- Sheet
- sql.ts
- Benvenuto in Glifo
- compilerOptions
- board.ts
- Piano per piano
- vitest
- symbolic.ts
- MarkdownEditor
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- Stroke
- session-start.sh
- .claude/CLAUDE.md
- editor.test.ts
- tutorial.mjs
- Abbonamenti
- inference.ts
- Costi
- supabase-stub.sql
- account-test.mjs
- Il database degli account (Supabase)
- devDependencies
- La lavagna
- FoldersStore
- scripts
- numerical.test.ts
- I modelli e le chiavi API
- fake-supabase.mjs
- appleTouch
- Glifo – note per Claude
- page.ts
- graph/file.ts
- spaces.ts
- Glifo
- spell.test.ts
- markers.ts
- icons.mjs
- sidePanel.ts
- smoke-test.mjs

## God Nodes (most connected - your core abstractions)
1. `MathError` - 151 edges
2. `num()` - 145 edges
3. `Dove sono le cose` - 137 edges
4. `Sheet` - 129 edges
5. `MathNode` - 128 edges
6. `mul()` - 124 edges
7. `Board` - 118 edges
8. `compile()` - 113 edges
9. `Rational` - 111 edges
10. `toLatex()` - 101 edges

## Surprising Connections (you probably didn't know these)
- `Dove sono le cose` --references--> `ConicElements`  [INFERRED]
  CLAUDE.md → src/math/conics.ts
- `Funzionalità` --references--> `k()`  [INFERRED]
  README.md → src/math/numerical.ts
- `Come viene pubblicata` --references--> `dist()`  [INFERRED]
  README.md → src/board/shapes.ts
- `Dove sono le cose` --references--> `adoptGuestNotes()`  [INFERRED]
  CLAUDE.md → src/account/space.ts
- `Dove sono le cose` --references--> `sharedLinks()`  [INFERRED]
  CLAUDE.md → src/account/supabase.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (122 total, 19 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.09
Nodes (26): at(), browserStore, clip(), isSaved(), KINDS, LOG_KEY, LOG_MAX_LINES, LogStore (+18 more)

### Community 1 - "parse.ts"
Cohesion: 0.08
Nodes (40): hasWord(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe() (+32 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (101): deleteAccount(), ensureSessionOf(), setSharedCopy(), sharedLinks(), shareNote(), supabaseBackendFor(), unshareNote(), addToGraphBlock() (+93 more)

### Community 3 - "odesolve.ts"
Cohesion: 0.08
Nodes (50): Piece, addWave(), arrange(), compiled(), Condition, constantNames(), equalities(), factorial() (+42 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (32): AccountSync, withLock(), Account, EMPTY_STATE, FolderChange, FolderRow, isEmpty(), iso() (+24 more)

### Community 5 - "spec.ts"
Cohesion: 0.06
Nodes (84): quadricEquation(), isFourierLine(), isTestLine(), isNumericalLine(), numericalItems(), isSeveralLine(), areaFor(), areaOf() (+76 more)

### Community 6 - "several.ts"
Cohesion: 0.13
Nodes (39): criticalLine(), named(), severalItems(), at(), bounded(), Candidate, candidates(), compiled() (+31 more)

### Community 7 - "primitive.ts"
Cohesion: 0.17
Nodes (59): algebraic(), bigGcd(), byParts(), candidates(), canon(), combineLogs(), compareKeys(), distribute() (+51 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (47): FIGURE_PALETTE, addLabel(), boxes, cameras, complexCoord(), containing(), coord(), drawings (+39 more)

### Community 9 - "parseGraph"
Cohesion: 0.09
Nodes (29): staticGraphSvg(), chooseWindow(), specFor(), chooseBox(), GraphItem, parseGraph(), DrawOptions, graphSvg() (+21 more)

### Community 10 - "num"
Cohesion: 0.13
Nodes (62): absOf(), splitAbs(), withoutAbs(), exp(), hyperbolicToExp(), linearIn(), sqrtEx(), termTransform() (+54 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.10
Nodes (45): insertBlock(), applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf() (+37 more)

### Community 12 - "svg.ts"
Cohesion: 0.10
Nodes (51): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), domainEdge(), features() (+43 more)

### Community 13 - "sheet.ts"
Cohesion: 0.05
Nodes (45): Dove sono le cose, formatComplex(), formatGauss(), formatList(), join(), realPart(), OdeFunction, expSumValue() (+37 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.11
Nodes (4): SchemaEditor, NodeLook, serializeSchema(), tableMetrics()

### Community 15 - "Rational"
Cohesion: 0.13
Nodes (20): expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactRandom, exactRoot(), factorialExact() (+12 more)

### Community 16 - "laplace.ts"
Cohesion: 0.12
Nodes (45): factoredPolynomial(), polynomialOf(), polyShown(), ruffiniShown(), atIntegers(), boundsOf(), close(), definite() (+37 more)

### Community 17 - "compile"
Cohesion: 0.06
Nodes (69): fourierItems(), surface(), typedSliderValue(), argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension() (+61 more)

### Community 18 - "numerical.ts"
Cohesion: 0.12
Nodes (46): bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial(), interpolating() (+38 more)

### Community 19 - "markdown.ts"
Cohesion: 0.09
Nodes (34): dompurify, highlight.js, katex, markdown-it-footnote, checkHtml(), checkTitle(), cache, escapeHtml() (+26 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (39): b, bigops, c, calculus, fn, fr, fractions, functions (+31 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (24): @farscrl/hunspell-wasm, editDistance(), Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable (+16 more)

### Community 22 - "Board"
Cohesion: 0.09
Nodes (5): Board, clampZoom(), loadPrefs(), validView(), highlightName()

### Community 23 - "formatNumber"
Cohesion: 0.11
Nodes (31): decimalSeparator(), Digits, formatNumber(), FormatOptions, fromNumber(), fromRational(), SUPERSCRIPT, writeDigits() (+23 more)

### Community 24 - "store.ts"
Cohesion: 0.06
Nodes (19): fake-indexeddb, BoardOptions, BoardBackend, BoardChange, BoardData, BoardStore, done(), fromRecord() (+11 more)

### Community 25 - "MathError"
Cohesion: 0.13
Nodes (51): compileApply(), MathError, nameLabel(), UndefinedName, angleBetween(), asMatrix(), basisOf(), circleText() (+43 more)

### Community 26 - "toLatex"
Cohesion: 0.07
Nodes (49): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexLine(), isComplexValue() (+41 more)

### Community 27 - "assistant.ts"
Cohesion: 0.08
Nodes (37): AiAnswer, AiError, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible(), askThroughHost(), checkShape() (+29 more)

### Community 28 - "h"
Cohesion: 0.07
Nodes (53): SyncStatus, AI_SERVICES, board, viewSwitch, openSignedOut(), printButton(), ShareDialogDeps, ACCOUNT_SETTINGS (+45 more)

### Community 29 - "conics.ts"
Cohesion: 0.16
Nodes (31): conicItems(), isConicLine(), at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo (+23 more)

### Community 30 - "Pt"
Cohesion: 0.10
Nodes (16): coalesced(), EraseAction, Finger, LassoAction, MoveAction, PanAction, penErases(), PinchAction (+8 more)

### Community 31 - "graph/space.ts"
Cohesion: 0.12
Nodes (44): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+36 more)

### Community 32 - "distributions.ts"
Cohesion: 0.13
Nodes (32): addExp(), choose(), continuousQuantile(), discreteQuantile(), exactIntervalProbability(), factorialBig(), FAMILIES, integerParam() (+24 more)

### Community 33 - "graphNote.test.ts"
Cohesion: 0.08
Nodes (26): acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult, calcResults(), CheckWidget, formulasUntil() (+18 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (27): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+19 more)

### Community 35 - "templates.ts"
Cohesion: 0.11
Nodes (18): SchemaEditorOptions, DEFAULT_EDGE, Schema, SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), conceptMap (+10 more)

### Community 36 - "arithmetic.ts"
Cohesion: 0.10
Nodes (43): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+35 more)

### Community 37 - "namesIn"
Cohesion: 0.12
Nodes (40): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+32 more)

### Community 38 - "probability.ts"
Cohesion: 0.16
Nodes (21): End, Family, fractionNear(), ALL, complement(), endAt(), EventContext, eventSet() (+13 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "statsShown.ts"
Cohesion: 0.17
Nodes (32): Lin, check(), correlation(), count(), covariance(), Data, DATA_FUNCTIONS, dataStatistic() (+24 more)

### Community 41 - "view3d.ts"
Cohesion: 0.09
Nodes (39): Face, planeTolerance(), regionFaces(), splitFace(), splitLine(), surfacePlane(), Vec3, Palette (+31 more)

### Community 42 - "NotesStore"
Cohesion: 0.07
Nodes (35): accountSpace(), adoptGuestNotes(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf(), setCurrentAccount() (+27 more)

### Community 43 - "study.ts"
Cohesion: 0.18
Nodes (29): Asymptote, boundaries(), compiled(), cutsOf(), defined(), domainOf(), exact(), inDomain() (+21 more)

### Community 44 - "complex.ts"
Cohesion: 0.08
Nodes (47): onlyComplex(), add(), arg(), asin(), atan(), compileComplex(), compileFunction(), compileName() (+39 more)

### Community 45 - "graph.ts"
Cohesion: 0.09
Nodes (33): fieldInput(), textWidth(), AT_X, cellHtml(), cellText(), COMPASS, createEdgeCell(), createGraph() (+25 more)

### Community 46 - "editor/editor.ts"
Cohesion: 0.07
Nodes (34): description, name, private, type, version, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands (+26 more)

### Community 47 - "linear.test.ts"
Cohesion: 0.17
Nodes (17): dims(), eigenvectors(), EXACT, FLOAT, identity(), inverse(), kernel(), maxSize() (+9 more)

### Community 48 - "tutorial.ts"
Cohesion: 0.16
Nodes (12): HINT_MS, markSeen(), openTutorial(), show(), richText(), showTutorialHint(), close(), TUTORIAL_PAGES (+4 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (36): DrawAction, adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners() (+28 more)

### Community 50 - "linsys.ts"
Cohesion: 0.13
Nodes (43): choices(), exText(), gcd(), matrixEquation(), matrixSystem(), minorsGcd(), ONE, parametricRows() (+35 more)

### Community 51 - "solve.ts"
Cohesion: 0.16
Nodes (26): polynomialIn(), splitRoot(), isStandardUnknown(), linearSystem(), RelOp, breaks(), cubeRoot(), equation() (+18 more)

### Community 52 - "search.ts"
Cohesion: 0.17
Nodes (22): normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex(), IndexedEntry (+14 more)

### Community 53 - "statsGraph.ts"
Cohesion: 0.17
Nodes (18): FieldContext, number(), testItems(), classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX (+10 more)

### Community 54 - "Più avanti"
Cohesion: 0.14
Nodes (14): Abbonamento e funzioni a pagamento (da capire), Account: i propri appunti su ogni dispositivo, anche da condividere, Aiuto con gli esercizi, Altre idee, Calcoli e grafici: idee in più, Idee per il futuro, In programma, La lavagna: idee in più (+6 more)

### Community 55 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "database.ts"
Cohesion: 0.24
Nodes (6): @electric-sql/pglite, createDatabase(), createUser(), databaseTests(), migrations, shareTests()

### Community 58 - "Field"
Cohesion: 0.12
Nodes (4): eigenvalues(), Field, interpolate(), interpolateFloat()

### Community 59 - "renderTex"
Cohesion: 0.24
Nodes (5): cleanKatexError(), renderTex(), displayCode(), preventFocusSteal(), SidePanel

### Community 60 - "schema/shapes.ts"
Cohesion: 0.09
Nodes (15): @maxgraph/core, ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape (+7 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (24): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+16 more)

### Community 62 - "supabase.ts"
Cohesion: 0.16
Nodes (20): @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), emailLinkToken(), loadClient(), loginDetails() (+12 more)

### Community 63 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 64 - "schema/preview.ts"
Cohesion: 0.13
Nodes (15): GraphLabels, GraphLook, Look, SchemaError, Theme, draw(), drawCached(), drawn (+7 more)

### Community 65 - "domain.ts"
Cohesion: 0.09
Nodes (50): constantIntegrand(), depth(), inequalityMargin(), integralRegion, LayeredSolid, Multiple, multipleOf(), planeMargin() (+42 more)

### Community 66 - "parseSchema"
Cohesion: 0.18
Nodes (14): base64(), hide(), OPEN, schemasForFile(), schemasFromFile(), unhide(), isRecord(), num() (+6 more)

### Community 67 - "Sheet"
Cohesion: 0.07
Nodes (33): ExactComplexScope, Ode, withWorkLimit(), FiniteContext, FormattedResult, Mat, MathNode, close() (+25 more)

### Community 68 - "sql.ts"
Cohesion: 0.17
Nodes (17): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+9 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "board.ts"
Cohesion: 0.06
Nodes (61): Action, ACTION_NAMES, DOT_SIZES, EraserMode, HANDLE_REACH, ICON, MODE_NAMES, Prefs (+53 more)

### Community 72 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 73 - "vitest"
Cohesion: 0.09
Nodes (13): @codemirror/view, vite-plugin-pwa, vitest, toggleLinePrefix(), guardBlocks(), schemaBlocks(), SchemaWidget, summary() (+5 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (68): valueAt(), primitive(), verified(), assumePositive(), atValues(), combine(), commonMonomial(), commonPositive() (+60 more)

### Community 75 - "MarkdownEditor"
Cohesion: 0.17
Nodes (6): closeMathBlockOnEnter(), EditorCallbacks, MarkdownEditor, tabOutOfMath(), insertTemplate(), wrapSelection()

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.06
Nodes (57): alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ARROW_NAMES, AT_ICONS (+49 more)

### Community 79 - "Stroke"
Cohesion: 0.14
Nodes (14): BOARD_PALETTES, BoardTheme, inkName(), mid(), outlineSvg(), PEN_SIZE, shapeSvg(), strokeOptions() (+6 more)

### Community 82 - "editor.test.ts"
Cohesion: 0.06
Nodes (38): @codemirror/state, InsertOptions, templateInsertion(), CODE_NODES, CommandToken, commandTokenAt(), EditorMathContext, isInCode() (+30 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.12
Nodes (10): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+2 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.14
Nodes (14): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+6 more)

### Community 91 - "inference.ts"
Cohesion: 0.13
Nodes (27): Distribution, confidence(), confidenceShown(), Given, hypothesisTest(), interval(), meanOf(), nameOf() (+19 more)

### Community 92 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, Quando lo studente dice di cominciare

### Community 96 - "account-test.mjs"
Cohesion: 0.20
Nodes (4): device(), login(), newContext, waitFor()

### Community 97 - "Il database degli account (Supabase)"
Cohesion: 0.17
Nodes (11): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Nell'app, Note condivise con un link (+3 more)

### Community 100 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

### Community 101 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 102 - "FoldersStore"
Cohesion: 0.08
Nodes (17): cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder(), loadClosedFolders(), RemoteFolder (+9 more)

### Community 103 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 104 - "numerical.test.ts"
Cohesion: 0.60
Nodes (3): result(), text(), verdict()

### Community 105 - "I modelli e le chiavi API"
Cohesion: 0.50
Nodes (4): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), Le idee dello studente (5 ottobre 2026)

### Community 106 - "fake-supabase.mjs"
Cohesion: 0.22
Nodes (11): b64(), CODE, createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom() (+3 more)

### Community 109 - "Glifo – note per Claude"
Cohesion: 0.29
Nodes (7): Comandi, Come controllare il lavoro, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole, sqlite()

### Community 110 - "page.ts"
Cohesion: 0.05
Nodes (52): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), currentAccount(), PullResult, hydrateGraphs(), setPrinting() (+44 more)

### Community 116 - "graph/file.ts"
Cohesion: 0.10
Nodes (38): figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsForFile(), graphsFromFile(), hide(), OPEN (+30 more)

### Community 117 - "spaces.ts"
Cohesion: 0.18
Nodes (20): formatRational(), Eigenvalue, surdText(), cartesianEquations(), Cell, coordinateNames(), diagonalize(), dot() (+12 more)

### Community 121 - "Glifo"
Cohesion: 0.15
Nodes (13): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Funzionalità (+5 more)

### Community 122 - "spell.test.ts"
Cohesion: 0.08
Nodes (23): @codemirror/lang-markdown, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt() (+15 more)

### Community 124 - "markers.ts"
Cohesion: 0.13
Nodes (33): bullet(), bulletGroup(), childMarker(), column(), firstMarker(), label(), lettersMarker(), MarkerKind (+25 more)

### Community 128 - "sidePanel.ts"
Cohesion: 0.15
Nodes (16): AiResult, SuggestionItem, isConfidentAnswer(), CATEGORIES, symbolsInCategory(), cardPreviewTex(), formPreviewTex(), ParsedTemplate (+8 more)

### Community 129 - "smoke-test.mjs"
Cohesion: 0.29
Nodes (4): markdown-it, vite, firstVisit(), plainContext

## Knowledge Gaps
- **573 isolated node(s):** `Comandi`, `Promemoria per lo studente`, `Regole`, `graphify`, `Condividere una nota con un link` (+568 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 786 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **19 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `sheet.ts` to `touchlog.ts`, `parse.ts`, `main.ts`, `odesolve.ts`, `spec.ts`, `several.ts`, `primitive.ts`, `graph/preview.ts`, `num`, `svg.ts`, `laplace.ts`, `compile`, `numerical.ts`, `markdown.ts`, `Board`, `formatNumber`, `store.ts`, `MathError`, `toLatex`, `assistant.ts`, `h`, `conics.ts`, `Pt`, `graph/space.ts`, `graphNote.test.ts`, `arithmetic.ts`, `namesIn`, `NotesStore`, `complex.ts`, `graph.ts`, `tutorial.ts`, `board/shapes.ts`, `linsys.ts`, `finite.ts`, `schema/preview.ts`, `Sheet`, `board.ts`, `symbolic.ts`, `schema/editor.ts`, `Stroke`, `inference.ts`, `Glifo – note per Claude`, `graph/file.ts`?**
  _High betweenness centrality (0.151) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `touchlog.ts`, `sidePanel.ts`, `main.ts`, `sync.ts`, `parseGraph`, `num`, `editor/lists.ts`, `svg.ts`, `sheet.ts`, `compile`, `markdown.ts`, `store.ts`, `toLatex`, `assistant.ts`, `h`, `distributions.ts`, `graphNote.test.ts`, `namesIn`, `resize.ts`, `view3d.ts`, `NotesStore`, `editor/editor.ts`, `linear.test.ts`, `tutorial.ts`, `board/shapes.ts`, `linsys.ts`, `search.ts`, `database.ts`, `supabase.ts`, `parseSchema`, `Sheet`, `sql.ts`, `board.ts`, `schema/editor.ts`, `Stroke`, `editor.test.ts`, `FoldersStore`, `numerical.test.ts`, `appleTouch`, `page.ts`, `spell.test.ts`, `markers.ts`?**
  _High betweenness centrality (0.118) - this node is a cross-community bridge._
- **Why does `Board` connect `Board` to `main.ts`, `Pt`, `Stroke`, `board.ts`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **Are the 136 inferred relationships involving `Dove sono le cose` (e.g. with `adoptGuestNotes()` and `sharedLinks()`) actually correct?**
  _`Dove sono le cose` has 136 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Comandi`, `Promemoria per lo studente`, `Regole` to the rest of the system?**
  _573 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `touchlog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08653061224489796 - nodes in this community are weakly interconnected._
- **Should `parse.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07553124342520513 - nodes in this community are weakly interconnected._