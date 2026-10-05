# Graph Report - matherdown  (2026-10-05)

## Corpus Check
- 238 files · ~448,163 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 3889 nodes · 13893 edges · 124 communities (105 shown, 19 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 383 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e3d7d3b4`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- touchlog.ts
- parse.ts
- main.ts
- odesolve.ts
- sync.ts
- spec.ts
- Rational
- mul
- graph/preview.ts
- view3d.ts
- symbolic.ts
- editor/lists.ts
- svg.ts
- Board
- SchemaEditor
- exact.ts
- graph/file.ts
- compile
- numerical.ts
- markdown.ts
- index.ts
- engine.ts
- sheet.ts
- .renderFormat
- BoardStore
- MathError
- toLatex
- dialogs.ts
- h
- conics.ts
- board.ts
- graph/space.ts
- distributions.ts
- calcPlugin
- logic.ts
- evaluateExactComplex
- inference.ts
- namesIn
- probability.ts
- resize.ts
- statsShown.ts
- store.ts
- NotesStore
- study.ts
- complex.ts
- ink.ts
- graphNote.test.ts
- parseGraph
- files.ts
- logo.ts
- num
- linsys.ts
- search.ts
- statsGraph.ts
- strokes.ts
- finite.ts
- 20261004091555_note_condivise.sql
- schemaBlocks.ts
- Field
- sidePanel.ts
- graph.ts
- dependencies
- supabase.ts
- limits.ts
- schema/preview.ts
- domain.ts
- Sheet
- .folderItem
- sql.ts
- Benvenuto in Glifo
- compilerOptions
- Distribution
- .setView
- database.ts
- devDependencies
- toolbar.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- Più avanti
- session-start.sh
- .claude/CLAUDE.md
- editor.test.ts
- tutorial.mjs
- Abbonamenti
- formatNumber
- several.ts
- supabase-stub.sql
- account-test.mjs
- Il database degli account (Supabase)
- Costi
- smoke-test.mjs
- editor/editor.ts
- FoldersStore
- I modelli e le chiavi API
- .neg
- Le spiegazioni, come funzionano
- fake-supabase.mjs
- Piano per piano
- gauss.ts
- Glifo – note per Claude
- page.ts
- icons.mjs
- La lavagna
- scripts
- numericalGraph.ts
- spaces.ts
- Glifo
- SlotWidget
- linear.test.ts

## God Nodes (most connected - your core abstractions)
1. `MathError` - 151 edges
2. `num()` - 145 edges
3. `Sheet` - 129 edges
4. `MathNode` - 128 edges
5. `mul()` - 124 edges
6. `compile()` - 113 edges
7. `Dove sono le cose` - 112 edges
8. `Rational` - 111 edges
9. `toLatex()` - 101 edges
10. `add()` - 98 edges

## Surprising Connections (you probably didn't know these)
- `Funzionalità` --references--> `k()`  [INFERRED]
  README.md → src/math/numerical.ts
- `Dove sono le cose` --references--> `Converter`  [INFERRED]
  CLAUDE.md → src/math/symbolic.ts
- `Dove sono le cose` --references--> `ViewMode`  [INFERRED]
  CLAUDE.md → src/store/settings.ts
- `Dove sono le cose` --references--> `ConicElements`  [INFERRED]
  CLAUDE.md → src/math/conics.ts
- `Dove sono le cose` --references--> `InferenceContext`  [INFERRED]
  CLAUDE.md → src/math/inference.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (124 total, 19 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.09
Nodes (26): at(), browserStore, clip(), isSaved(), KINDS, LOG_KEY, LOG_MAX_LINES, LogStore (+18 more)

### Community 1 - "parse.ts"
Cohesion: 0.08
Nodes (39): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe(), differentialInFraction() (+31 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (92): graphsFromFile(), unhide(), account, active, app, applyAccountChange(), applySpellcheck(), applyTheme() (+84 more)

### Community 3 - "odesolve.ts"
Cohesion: 0.09
Nodes (75): addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames(), constantParticular() (+67 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (33): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+25 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (97): addToGraphBlock(), formulaAtCursor(), GraphLabelLines, insertGraphBlock(), setGraphLabels(), conicItems(), isConicLine(), quadricEquation() (+89 more)

### Community 6 - "Rational"
Cohesion: 0.07
Nodes (71): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+63 more)

### Community 7 - "mul"
Cohesion: 0.17
Nodes (65): atIntegers(), polyEx(), similarSolution(), degree(), algebraic(), bigGcd(), byParts(), candidates() (+57 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (43): addLabel(), boxes, cameras, complexCoord(), containing(), coord(), drawings, drawnViews (+35 more)

### Community 9 - "view3d.ts"
Cohesion: 0.09
Nodes (35): Detail, Face, FAST, FINE, planeTolerance(), Plane, Vec3, escapeXml() (+27 more)

### Community 10 - "symbolic.ts"
Cohesion: 0.07
Nodes (65): primitive(), verified(), atValues(), cancelLinear(), combine(), commonMonomial(), Converter, coordinates() (+57 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.10
Nodes (56): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+48 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (51): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), domainEdge(), features() (+43 more)

### Community 13 - "Board"
Cohesion: 0.12
Nodes (4): Board, loadPrefs(), penErases(), BoardTheme

### Community 14 - "SchemaEditor"
Cohesion: 0.09
Nodes (7): loadDialect(), SchemaEditor, createEdgeCell(), EdgeLook, NodeLook, serializeSchema(), fileNameFor()

### Community 15 - "exact.ts"
Cohesion: 0.13
Nodes (20): expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactFunction, ExactRandom, exactRoot() (+12 more)

### Community 16 - "graph/file.ts"
Cohesion: 0.10
Nodes (36): figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsForFile(), hide(), OPEN, swatchSvg() (+28 more)

### Community 17 - "compile"
Cohesion: 0.06
Nodes (60): areaFor(), constantValue(), argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot() (+52 more)

### Community 18 - "numerical.ts"
Cohesion: 0.12
Nodes (46): bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial(), interpolating() (+38 more)

### Community 19 - "markdown.ts"
Cohesion: 0.08
Nodes (42): highlight.js, katex, markdown-it-footnote, bulletGroup(), checkHtml(), checkTitle(), cache, escapeHtml() (+34 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (41): b, bigops, c, calculus, fn, fr, fractions, functions (+33 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "sheet.ts"
Cohesion: 0.08
Nodes (34): FieldContext, criticalLine(), named(), severalItems(), surface(), numericPartials(), OdeFunction, Scope (+26 more)

### Community 23 - ".renderFormat"
Cohesion: 0.19
Nodes (11): edgeLook(), edgeStyle(), edgeTextAt(), insertSchema(), nodeLook(), nodeStyle(), readSchema(), restyle() (+3 more)

### Community 24 - "BoardStore"
Cohesion: 0.08
Nodes (4): BoardOptions, BoardBackend, BoardStore, MemoryBoards

### Community 25 - "MathError"
Cohesion: 0.10
Nodes (62): compileApply(), MathError, nameLabel(), UndefinedName, formatRational(), angleBetween(), asMatrix(), basisOf() (+54 more)

### Community 26 - "toLatex"
Cohesion: 0.04
Nodes (69): vitest, CalcCheck, calcOutcomes(), CalcResult, calcResults(), formulasUntil(), sheetBefore(), regionFromNode() (+61 more)

### Community 27 - "dialogs.ts"
Cohesion: 0.07
Nodes (39): AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible(), askThroughHost() (+31 more)

### Community 28 - "h"
Cohesion: 0.08
Nodes (37): SyncStatus, viewSwitch, AccountButton, confirmAccountDeletion(), messageOf(), openAccountDialog(), openLoginDialog(), codeStep() (+29 more)

### Community 29 - "conics.ts"
Cohesion: 0.19
Nodes (28): at(), centralCanonical(), Coefficients, coneCanonical(), ConicInfo, conicOf(), det2(), det3() (+20 more)

### Community 30 - "board.ts"
Cohesion: 0.13
Nodes (21): Action, ACTION_NAMES, DrawAction, EraseAction, ERASER_RADIUS, Finger, ICON, PanAction (+13 more)

### Community 31 - "graph/space.ts"
Cohesion: 0.13
Nodes (48): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+40 more)

### Community 32 - "distributions.ts"
Cohesion: 0.19
Nodes (25): choose(), continuousQuantile(), factorialBig(), FAMILIES, integerParam(), invalid(), makeDistribution(), ONE (+17 more)

### Community 33 - "calcPlugin"
Cohesion: 0.14
Nodes (6): acceptCalcResult(), calcPlugin, CheckWidget, insertResult(), ResultWidget, valueNode()

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "evaluateExactComplex"
Cohesion: 0.20
Nodes (11): asin(), atan(), evaluateExactComplex(), ExactComplexScope, exactSqrt(), GaussRational, sinh(), unavailable() (+3 more)

### Community 36 - "inference.ts"
Cohesion: 0.15
Nodes (26): chiSquareTest(), confidence(), confidenceShown(), Given, hypothesisTest(), InferenceContext, interval(), meanOf() (+18 more)

### Community 37 - "namesIn"
Cohesion: 0.12
Nodes (40): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+32 more)

### Community 38 - "probability.ts"
Cohesion: 0.15
Nodes (20): End, Family, ALL, complement(), endAt(), EventContext, eventSet(), FLIP (+12 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "statsShown.ts"
Cohesion: 0.15
Nodes (34): expSumValue(), Lin, check(), correlation(), count(), covariance(), Data, DATA_FUNCTIONS (+26 more)

### Community 41 - "store.ts"
Cohesion: 0.14
Nodes (14): fake-indexeddb, done(), fromRecord(), IdbBoards, ofNote(), openBoardDatabase(), openDefault(), request() (+6 more)

### Community 42 - "NotesStore"
Cohesion: 0.10
Nodes (25): accountSpace(), adoptGuestNotes(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf(), setCurrentAccount() (+17 more)

### Community 43 - "study.ts"
Cohesion: 0.16
Nodes (33): limit(), Asymptote, boundaries(), compiled(), cutsOf(), defined(), domainOf(), exact() (+25 more)

### Community 44 - "complex.ts"
Cohesion: 0.10
Nodes (27): add(), arg(), compileFunction(), ComplexCompiled, cos(), cosh(), EMPTY_COMPLEX_SCOPE, exp() (+19 more)

### Community 45 - "ink.ts"
Cohesion: 0.15
Nodes (13): perfect-freehand, Prefs, BOARD_PALETTES, BoardPalette, inkName(), mid(), outlineSvg(), PEN_SIZE (+5 more)

### Community 46 - "graphNote.test.ts"
Cohesion: 0.07
Nodes (30): @codemirror/lang-markdown, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt() (+22 more)

### Community 47 - "parseGraph"
Cohesion: 0.11
Nodes (23): staticGraphSvg(), chooseWindow(), specFor(), chooseBox(), GraphSpec, parseGraph(), DrawOptions, graphSvg() (+15 more)

### Community 48 - "files.ts"
Cohesion: 0.11
Nodes (25): cache, capability(), ClaudeRuntime, hostDownloads, HostError, hostSample, inClaudeViewer(), ModelTier (+17 more)

### Community 49 - "logo.ts"
Cohesion: 0.33
Nodes (6): sidebarToggle(), BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark()

### Community 50 - "num"
Cohesion: 0.13
Nodes (40): factoredPolynomial(), oneFraction(), beyondPoles(), compiled(), E, exp(), fractionShown(), HALF (+32 more)

### Community 51 - "linsys.ts"
Cohesion: 0.11
Nodes (45): nameLatex(), FLOAT, rref(), choices(), gcd(), isStandardUnknown(), linearSystem(), matrixEquation() (+37 more)

### Community 52 - "search.ts"
Cohesion: 0.16
Nodes (25): SuggestionItem, editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase() (+17 more)

### Community 53 - "statsGraph.ts"
Cohesion: 0.23
Nodes (13): number(), testItems(), classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX, Line (+5 more)

### Community 54 - "strokes.ts"
Cohesion: 0.17
Nodes (15): between(), Box, boxesTouch(), capsuleSpan(), circleSpan(), compareStrokes(), eraseStroke(), intersect() (+7 more)

### Community 55 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "schemaBlocks.ts"
Cohesion: 0.15
Nodes (12): toggleLinePrefix(), besideSchema(), guardBlocks(), schemaBlockRanges(), schemaBlocks(), SchemaWidget, summary(), heading() (+4 more)

### Community 58 - "Field"
Cohesion: 0.13
Nodes (6): characteristicPolynomial(), eigenvalues(), Field, interpolate(), interpolateFloat(), polynomialIn()

### Community 59 - "sidePanel.ts"
Cohesion: 0.13
Nodes (18): cleanKatexError(), renderTex(), isConfidentAnswer(), CATEGORIES, symbolsInCategory(), cardPreviewTex(), formPreviewTex(), ParsedTemplate (+10 more)

### Community 60 - "graph.ts"
Cohesion: 0.06
Nodes (35): @maxgraph/core, AT_X, cellHtml(), cellText(), COMPASS, createGraph(), drawSchema(), isEdgeLook() (+27 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (24): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+16 more)

### Community 62 - "supabase.ts"
Cohesion: 0.11
Nodes (36): @supabase/supabase-js, AUTH_STORAGE_KEY, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken() (+28 more)

### Community 63 - "limits.ts"
Cohesion: 0.26
Nodes (14): exponentialForm(), fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), close() (+6 more)

### Community 64 - "schema/preview.ts"
Cohesion: 0.13
Nodes (15): GraphLabels, GraphLook, Look, SchemaError, Theme, draw(), drawCached(), drawn (+7 more)

### Community 65 - "domain.ts"
Cohesion: 0.09
Nodes (48): constantIntegrand(), depth(), inequalityMargin(), integralRegion, LayeredSolid, Multiple, planeMargin(), PlanePart (+40 more)

### Community 66 - "Sheet"
Cohesion: 0.09
Nodes (25): Dove sono le cose, ConicElements, Ode, withWorkLimit(), FiniteContext, FormattedResult, MathNode, chainOf() (+17 more)

### Community 67 - ".folderItem"
Cohesion: 0.22
Nodes (3): formatDate(), NotesPanel, NotesPanelDeps

### Community 68 - "sql.ts"
Cohesion: 0.18
Nodes (16): parseTable(), splitTable(), Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey() (+8 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "Distribution"
Cohesion: 0.17
Nodes (10): addExp(), discreteQuantile(), Distribution, exactIntervalProbability(), integerRange(), intervalProbability(), subtractExp(), TestResult (+2 more)

### Community 72 - ".setView"
Cohesion: 0.20
Nodes (5): clampZoom(), coalesced(), pressureOf(), validView(), newStrokeId()

### Community 73 - "database.ts"
Cohesion: 0.24
Nodes (6): @electric-sql/pglite, createDatabase(), createUser(), databaseTests(), migrations, shareTests()

### Community 74 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

### Community 75 - "toolbar.ts"
Cohesion: 0.10
Nodes (20): @codemirror/commands, closeMathBlockOnEnter(), EditorCallbacks, MarkdownEditor, tabOutOfMath(), insertBlock(), insertTemplate(), wrapSelection() (+12 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.04
Nodes (85): alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ARROW_NAMES, AT_ICONS (+77 more)

### Community 79 - "Più avanti"
Cohesion: 0.14
Nodes (14): Abbonamento e funzioni a pagamento (da capire), Account: i propri appunti su ogni dispositivo, anche da condividere, Aiuto con gli esercizi, Altre idee, Calcoli e grafici: idee in più, Idee per il futuro, In programma, La lavagna: idee in più (+6 more)

### Community 82 - "editor.test.ts"
Cohesion: 0.07
Nodes (34): @codemirror/state, @codemirror/view, InsertOptions, templateInsertion(), CODE_NODES, CommandToken, commandTokenAt(), EditorMathContext (+26 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.12
Nodes (10): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+2 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.14
Nodes (14): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+6 more)

### Community 91 - "formatNumber"
Cohesion: 0.27
Nodes (9): decimalSeparator(), Digits, formatNumber(), FormatOptions, fromNumber(), fromRational(), SUPERSCRIPT, writeDigits() (+1 more)

### Community 92 - "several.ts"
Cohesion: 0.06
Nodes (87): numShown(), polyShown(), ruffiniShown(), EMPTY_SCOPE, absOf(), boundsOf(), close(), definite() (+79 more)

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

### Community 101 - "editor/editor.ts"
Cohesion: 0.07
Nodes (33): description, name, private, type, version, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/language (+25 more)

### Community 102 - "FoldersStore"
Cohesion: 0.08
Nodes (21): Deletion, DeletionLog, cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder() (+13 more)

### Community 103 - "I modelli e le chiavi API"
Cohesion: 0.50
Nodes (4): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), Le idee dello studente (5 ottobre 2026)

### Community 104 - ".neg"
Cohesion: 0.33
Nodes (3): compileName(), conjugateOf(), constant()

### Community 105 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 106 - "fake-supabase.mjs"
Cohesion: 0.22
Nodes (11): b64(), CODE, createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom() (+3 more)

### Community 107 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 108 - "gauss.ts"
Cohesion: 0.17
Nodes (21): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexValue(), isInequality() (+13 more)

### Community 109 - "Glifo – note per Claude"
Cohesion: 0.29
Nodes (7): Comandi, Come controllare il lavoro, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole, sqlite()

### Community 110 - "page.ts"
Cohesion: 0.06
Nodes (48): SUPABASE_KEY, SUPABASE_URL, accountDataFile(), currentAccount(), PullResult, openShareDialog(), changeAccess(), changeCopy() (+40 more)

### Community 113 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 115 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 116 - "numericalGraph.ts"
Cohesion: 0.80
Nodes (4): isNumericalLine(), numericalItems(), isPlottedNumerical(), numericalPlot()

### Community 117 - "spaces.ts"
Cohesion: 0.15
Nodes (21): eigenvectors(), kernel(), Mat, splitRoot(), cartesianEquations(), Cell, coordinateNames(), diagonalize() (+13 more)

### Community 121 - "Glifo"
Cohesion: 0.15
Nodes (13): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Funzionalità (+5 more)

### Community 124 - "linear.test.ts"
Cohesion: 0.33
Nodes (6): EXACT, A, B, q(), result(), text()

## Knowledge Gaps
- **563 isolated node(s):** `Deciso`, `Com'è andata la discussione`, `La proposta dello studente (4 ottobre 2026)`, `Il parere di Claude, in breve`, `Come si decide cosa far pagare` (+558 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 767 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **19 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Sheet` to `touchlog.ts`, `parse.ts`, `main.ts`, `odesolve.ts`, `spec.ts`, `Rational`, `mul`, `graph/preview.ts`, `symbolic.ts`, `svg.ts`, `exact.ts`, `graph/file.ts`, `compile`, `numerical.ts`, `markdown.ts`, `.renderFormat`, `BoardStore`, `MathError`, `toLatex`, `dialogs.ts`, `h`, `graph/space.ts`, `logic.ts`, `evaluateExactComplex`, `inference.ts`, `namesIn`, `NotesStore`, `study.ts`, `logo.ts`, `num`, `linsys.ts`, `strokes.ts`, `finite.ts`, `graph.ts`, `supabase.ts`, `limits.ts`, `schema/preview.ts`, `sql.ts`, `schema/editor.ts`, `several.ts`, `gauss.ts`, `Glifo – note per Claude`, `numericalGraph.ts`?**
  _High betweenness centrality (0.128) - this node is a cross-community bridge._
- **Why does `vitest` connect `toLatex` to `touchlog.ts`, `main.ts`, `sync.ts`, `Rational`, `mul`, `editor/lists.ts`, `graph/file.ts`, `compile`, `markdown.ts`, `dialogs.ts`, `h`, `board.ts`, `graph/space.ts`, `distributions.ts`, `resize.ts`, `store.ts`, `NotesStore`, `ink.ts`, `graphNote.test.ts`, `parseGraph`, `logo.ts`, `search.ts`, `strokes.ts`, `schemaBlocks.ts`, `sidePanel.ts`, `supabase.ts`, `Sheet`, `database.ts`, `toolbar.ts`, `schema/editor.ts`, `editor.test.ts`, `editor/editor.ts`, `FoldersStore`, `page.ts`, `linear.test.ts`?**
  _High betweenness centrality (0.124) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `schema/preview.ts`, `main.ts`, `.folderItem`, `FoldersStore`, `resize.ts`, `graph/preview.ts`, `sidePanel.ts`, `toolbar.ts`, `Board`, `graphNote.test.ts`, `schema/editor.ts`, `SchemaEditor`, `logo.ts`, `page.ts`, `files.ts`, `.renderFormat`, `dialogs.ts`, `board.ts`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **What connects `Deciso`, `Com'è andata la discussione`, `La proposta dello studente (4 ottobre 2026)` to the rest of the system?**
  _563 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `touchlog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08653061224489796 - nodes in this community are weakly interconnected._
- **Should `parse.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07689003436426117 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.044260271557044616 - nodes in this community are weakly interconnected._