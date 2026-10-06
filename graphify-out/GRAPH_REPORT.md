# Graph Report - matherdown  (2026-10-06)

## Corpus Check
- 249 files · ~483,507 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 4095 nodes · 14677 edges · 131 communities (110 shown, 21 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 433 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `6dfa8305`
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
- GraphView
- parseGraph
- complex.ts
- editor/lists.ts
- svg.ts
- inference.ts
- SchemaEditor
- exact.ts
- toNode
- compile
- numerical.ts
- markdown.ts
- index.ts
- engine.ts
- Board
- graph.ts
- store.ts
- MathError
- toLatex
- assistant.ts
- h
- Rational
- .onMove
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
- gauss.ts
- parse.ts
- dialogs.ts
- BoardStore
- schemaTools.test.ts
- board/shapes.ts
- linsys.ts
- solve.ts
- search.ts
- statsGraph.ts
- laplace.ts
- finite.ts
- 20261004091555_note_condivise.sql
- toolbar.ts
- .int
- grafo-html.mjs
- .paintVertexShape
- dependencies
- supabase.ts
- Le spiegazioni, come funzionano
- graph/preview.ts
- openShareDialog
- parseSchema
- Sheet
- insert.ts
- Benvenuto in Glifo
- compilerOptions
- Dove sono le cose
- Piano per piano
- blockMove.ts
- symbolic.ts
- .constructor
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- board.ts
- session-start.sh
- .claude/CLAUDE.md
- editor.test.ts
- tutorial.mjs
- Abbonamenti
- sql.ts
- Costi
- supabase-stub.sql
- account-test.mjs
- Il database degli account (Supabase)
- devDependencies
- La lavagna
- notesPanel.ts
- editor/editor.ts
- sheet.ts
- I modelli e le chiavi API
- fake-supabase.mjs
- createFakeSupabase
- toast
- Glifo – note per Claude
- page.ts
- suggestions.ts
- tutorial.ts
- graph/file.ts
- spaces.ts
- database.ts
- spell.test.ts
- Distribution
- render/lists.ts
- Glifo
- logo.ts
- icons.mjs
- sidePanel.ts
- smoke-test.mjs

## God Nodes (most connected - your core abstractions)
1. `MathError` - 151 edges
2. `num()` - 145 edges
3. `Dove sono le cose` - 144 edges
4. `Sheet` - 129 edges
5. `MathNode` - 128 edges
6. `mul()` - 124 edges
7. `Board` - 118 edges
8. `compile()` - 113 edges
9. `Rational` - 111 edges
10. `toLatex()` - 101 edges

## Surprising Connections (you probably didn't know these)
- `Funzionalità` --references--> `k()`  [INFERRED]
  README.md → src/math/numerical.ts
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

## Communities (131 total, 21 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.09
Nodes (26): at(), browserStore, clip(), isSaved(), KINDS, LOG_KEY, LOG_MAX_LINES, LogStore (+18 more)

### Community 1 - "Parser"
Cohesion: 0.12
Nodes (16): Abbonamento e funzioni a pagamento (da capire), Account: i propri appunti su ogni dispositivo, anche da condividere, Aiuto con gli esercizi, Altre idee, Calcoli e grafici: idee in più, Idee per il futuro, In programma, La lavagna: idee in più (+8 more)

### Community 2 - "main.ts"
Cohesion: 0.05
Nodes (78): account, active, app, applySpellcheck(), applyTheme(), backdrop, backup(), BAR (+70 more)

### Community 3 - "odesolve.ts"
Cohesion: 0.08
Nodes (76): primed(), linearIn(), addWave(), arrange(), cauchy(), characteristicRoots(), compiled(), constantNames() (+68 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (33): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+25 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (103): conicItems(), isConicLine(), quadricEquation(), hasExponential(), constantIntegrand(), depth(), inequalityMargin(), integralRegion (+95 more)

### Community 6 - "several.ts"
Cohesion: 0.10
Nodes (48): Piece, Condition, Family, Group, Root, Shape, fractionNear(), at() (+40 more)

### Community 7 - "num"
Cohesion: 0.13
Nodes (91): atIntegers(), withoutAbs(), hyperbolicToExp(), polyEx(), bernoulliFamily(), expOf(), invert(), mobius() (+83 more)

### Community 8 - "GraphView"
Cohesion: 0.09
Nodes (24): addLabel(), complexCoord(), containing(), coord(), endTex(), explicitWindow(), fitField(), graphSize() (+16 more)

### Community 9 - "parseGraph"
Cohesion: 0.11
Nodes (17): specFor(), parseGraph(), light, pts, result(), square, text(), triangle (+9 more)

### Community 10 - "complex.ts"
Cohesion: 0.06
Nodes (57): add(), allRoots(), arg(), asin(), atan(), compileApply(), compileComplex(), compileFunction() (+49 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.10
Nodes (56): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+48 more)

### Community 12 - "svg.ts"
Cohesion: 0.08
Nodes (59): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), staticGraphSvg(), chooseWindow(), chooseY(), clipLines() (+51 more)

### Community 13 - "inference.ts"
Cohesion: 0.15
Nodes (26): chiSquareTest(), confidence(), confidenceShown(), Given, hypothesisTest(), InferenceContext, interval(), meanOf() (+18 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.11
Nodes (3): SchemaEditor, NodeLook, serializeSchema()

### Community 15 - "exact.ts"
Cohesion: 0.19
Nodes (15): expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactFunction, ExactRandom, exactRoot() (+7 more)

### Community 16 - "toNode"
Cohesion: 0.13
Nodes (32): EMPTY_SCOPE, absOf(), boundsOf(), close(), definite(), fourierProblem, fourierShown(), isTrig() (+24 more)

### Community 17 - "compile"
Cohesion: 0.05
Nodes (97): criticalLine(), isSeveralLine(), named(), severalItems(), surface(), areaFor(), constantValue(), argumentOrder() (+89 more)

### Community 18 - "numerical.ts"
Cohesion: 0.12
Nodes (46): bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial(), interpolating() (+38 more)

### Community 19 - "markdown.ts"
Cohesion: 0.11
Nodes (30): lineDepth(), parseBlockMath(), moveAttrs(), renderTexOrError(), renderTexWithResult(), configurePurify(), createMarkdownIt(), FORBIDDEN_TAGS (+22 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (41): b, bigops, c, calculus, fn, fr, fractions, functions (+33 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "Board"
Cohesion: 0.09
Nodes (7): Board, penErases(), Step, BoardChange, BoardData, Box, Stroke

### Community 23 - "graph.ts"
Cohesion: 0.07
Nodes (39): @maxgraph/core, AT_X, cellHtml(), cellText(), COMPASS, createEdgeCell(), createGraph(), drawSchema() (+31 more)

### Community 24 - "store.ts"
Cohesion: 0.11
Nodes (13): BoardBackend, done(), fromRecord(), IdbBoards, ofNote(), openBoardDatabase(), openDefault(), request() (+5 more)

### Community 25 - "MathError"
Cohesion: 0.13
Nodes (55): MathError, angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, dataOf() (+47 more)

### Community 26 - "toLatex"
Cohesion: 0.11
Nodes (35): fourierItems(), isFourierLine(), valueLabel(), isNumericalLine(), numericalItems(), names(), STUDY_GRAPH, studyItems() (+27 more)

### Community 27 - "assistant.ts"
Cohesion: 0.14
Nodes (22): AiAnswer, AiError, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible(), askThroughHost(), checkShape() (+14 more)

### Community 28 - "h"
Cohesion: 0.13
Nodes (29): SyncStatus, board, viewSwitch, AccountButton, confirmAccountDeletion(), messageOf(), openAccountDialog(), openLoginDialog() (+21 more)

### Community 29 - "Rational"
Cohesion: 0.12
Nodes (31): Part, at(), centralCanonical(), Coefficients, coneCanonical(), conicOf(), det2(), det3() (+23 more)

### Community 30 - ".onMove"
Cohesion: 0.13
Nodes (7): clampZoom(), coalesced(), pointsOf(), pressureOf(), validView(), handleScale(), newStrokeId()

### Community 31 - "graph/space.ts"
Cohesion: 0.10
Nodes (56): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+48 more)

### Community 32 - "distributions.ts"
Cohesion: 0.18
Nodes (26): choose(), continuousQuantile(), expSumValue(), factorialBig(), FAMILIES, integerParam(), invalid(), makeDistribution() (+18 more)

### Community 33 - "graphNote.test.ts"
Cohesion: 0.08
Nodes (27): @codemirror/state, acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult, calcResults(), CheckWidget (+19 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "FoldersStore"
Cohesion: 0.16
Nodes (4): cleanFolderName(), FoldersStore, sameName(), names()

### Community 36 - "arithmetic.ts"
Cohesion: 0.11
Nodes (46): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+38 more)

### Community 37 - "namesIn"
Cohesion: 0.12
Nodes (39): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+31 more)

### Community 38 - "probability.ts"
Cohesion: 0.12
Nodes (24): End, Family, CompileOptions, ExactScope, ALL, complement(), endAt(), EventContext (+16 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "statsShown.ts"
Cohesion: 0.17
Nodes (31): check(), correlation(), count(), covariance(), Data, dataStatistic(), deviation(), fail() (+23 more)

### Community 41 - "view3d.ts"
Cohesion: 0.10
Nodes (33): SliderState, Box, Face, planeSide(), planeTolerance(), Plane, Range, Vec3 (+25 more)

### Community 42 - "NotesStore"
Cohesion: 0.08
Nodes (35): accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf() (+27 more)

### Community 43 - "study.ts"
Cohesion: 0.14
Nodes (35): Poly, Fraction, Asymptote, boundaries(), compiled(), cutsOf(), defined(), domainOf() (+27 more)

### Community 44 - "gauss.ts"
Cohesion: 0.18
Nodes (17): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, inZ(), isComplexLine(), isComplexValue(), isInequality() (+9 more)

### Community 45 - "parse.ts"
Cohesion: 0.06
Nodes (38): hasWord(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, differentialInFraction() (+30 more)

### Community 46 - "dialogs.ts"
Cohesion: 0.11
Nodes (20): AI_SERVICES, aiService, aiSettingsOf(), ACCOUNT_SETTINGS, accountSettings(), AI_MODELS, DEFAULT_SETTINGS, Settings (+12 more)

### Community 47 - "BoardStore"
Cohesion: 0.13
Nodes (5): BoardStore, MemoryBoards, applyAccountChange(), reloadPage(), signOutAccount()

### Community 48 - "schemaTools.test.ts"
Cohesion: 0.12
Nodes (23): cache, escapeHtml(), renderTexMathml(), TexRender, alignBoxes(), Alignment, Box, distributeBoxes() (+15 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (35): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+27 more)

### Community 50 - "linsys.ts"
Cohesion: 0.14
Nodes (41): choices(), gcd(), matrixEquation(), matrixSystem(), minorsGcd(), ONE, parametricRows(), parametricSystem() (+33 more)

### Community 51 - "solve.ts"
Cohesion: 0.11
Nodes (34): decimalSeparator(), Digits, formatNumber(), FormatOptions, fromNumber(), fromRational(), SUPERSCRIPT, writeDigits() (+26 more)

### Community 52 - "search.ts"
Cohesion: 0.16
Nodes (25): SuggestionItem, editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase() (+17 more)

### Community 53 - "statsGraph.ts"
Cohesion: 0.22
Nodes (15): isTestLine(), number(), testItems(), classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX (+7 more)

### Community 54 - "laplace.ts"
Cohesion: 0.17
Nodes (27): factoredPolynomial(), beyondPoles(), compiled(), E, exp(), fractionShown(), HALF, inverseLaplaceShown() (+19 more)

### Community 55 - "finite.ts"
Cohesion: 0.17
Nodes (28): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteContext (+20 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "toolbar.ts"
Cohesion: 0.12
Nodes (13): EditorCallbacks, MarkdownEditor, insertBlock(), insertTemplate(), templateInsertion(), wrapSelection(), Action, createToolbar() (+5 more)

### Community 58 - ".int"
Cohesion: 0.10
Nodes (9): characteristicPolynomial(), eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), Mat, polynomialIn() (+1 more)

### Community 59 - "grafo-html.mjs"
Cohesion: 0.25
Nodes (4): graphFile, names, namesFile, root

### Community 60 - ".paintVertexShape"
Cohesion: 0.15
Nodes (5): DotShape, IdentifyingRelationShape, NoteShape, TableShape, WeakEntityShape

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (24): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+16 more)

### Community 62 - "supabase.ts"
Cohesion: 0.11
Nodes (35): @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken(), ensureSessionOf() (+27 more)

### Community 63 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 64 - "graph/preview.ts"
Cohesion: 0.05
Nodes (42): boxes, cameras, drawings, drawnViews, FIGURE_SIZE, GraphLabels, GraphLook, hydrateGraphs() (+34 more)

### Community 65 - "openShareDialog"
Cohesion: 0.16
Nodes (17): openShareDialog(), changeAccess(), changeCopy(), copy(), refreshChanged(), run(), setStatus(), shareNow() (+9 more)

### Community 66 - "parseSchema"
Cohesion: 0.11
Nodes (26): markdownForFile(), openSchema(), saveSchemaBlock(), findFencedBlocks(), findSchemaBlock(), findSchemaBlocks(), OpenFence, SchemaBlock (+18 more)

### Community 67 - "Sheet"
Cohesion: 0.09
Nodes (22): ConicInfo, Ode, withWorkLimit(), FormattedResult, MathNode, chainOf(), close(), definitionTarget() (+14 more)

### Community 68 - "insert.ts"
Cohesion: 0.13
Nodes (15): @codemirror/view, InsertOptions, toggleLinePrefix(), besideSchema(), guardBlocks(), schemaBlockRanges(), schemaBlocks(), SchemaWidget (+7 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "Dove sono le cose"
Cohesion: 0.10
Nodes (39): Dove sono le cose, LassoAction, centerOn(), copyStrokes(), cross(), IDENTITY, insideLasso(), keepInside() (+31 more)

### Community 72 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 73 - "blockMove.ts"
Cohesion: 0.11
Nodes (33): blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove, blockPlace(), closed() (+25 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (60): primitive(), verified(), linearCells(), pairUp(), atValues(), Converter, coordinates(), decimalText() (+52 more)

### Community 75 - ".constructor"
Cohesion: 0.16
Nodes (4): BoardOptions, loadPrefs(), sizeChoice(), highlightName()

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.05
Nodes (60): ALIGN, ARROW_NAMES, AT_ICONS, AT_NAMES, BASE_PRESETS, BIG_ARROWS, DB_PRESETS, Direction (+52 more)

### Community 79 - "board.ts"
Cohesion: 0.06
Nodes (47): Action, ACTION_NAMES, DOT_SIZES, DrawAction, EraseAction, EraserMode, Finger, HANDLE_REACH (+39 more)

### Community 82 - "editor.test.ts"
Cohesion: 0.07
Nodes (31): @lezer/common, closeMathBlockOnEnter(), tabOutOfMath(), CODE_NODES, CommandToken, commandTokenAt(), isInCode(), MATH_NODES (+23 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.20
Nodes (6): centerOf(), clickOn(), ffmpeg, SCENES, SIZE, work

### Community 90 - "Abbonamenti"
Cohesion: 0.14
Nodes (14): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+6 more)

### Community 91 - "sql.ts"
Cohesion: 0.18
Nodes (17): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+9 more)

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
Cohesion: 0.10
Nodes (18): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+10 more)

### Community 101 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 102 - "notesPanel.ts"
Cohesion: 0.17
Nodes (8): Folder, groupByFolder(), loadClosedFolders(), saveClosedFolders(), clear(), formatDate(), NotesPanel, NotesPanelDeps

### Community 103 - "editor/editor.ts"
Cohesion: 0.06
Nodes (37): description, name, private, type, version, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands (+29 more)

### Community 104 - "sheet.ts"
Cohesion: 0.04
Nodes (54): vitest, formulaGraph(), GraphItem, errorMessage(), Lin, NUMERICAL, MathSyntaxError, parseMath() (+46 more)

### Community 105 - "I modelli e le chiavi API"
Cohesion: 0.50
Nodes (4): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), Le idee dello studente (5 ottobre 2026)

### Community 106 - "fake-supabase.mjs"
Cohesion: 0.25
Nodes (6): @electric-sql/pglite, b64(), CODE, GOOGLE_CODE, ROOT, SUPABASE_URL

### Community 107 - "createFakeSupabase"
Cohesion: 0.60
Nodes (6): createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 108 - "toast"
Cohesion: 0.15
Nodes (19): hostDownloads, inClaudeViewer(), saveToFile(), loadDialect(), canWriteFilesDirectly(), downloadBlob(), downloadText(), fileNameFor() (+11 more)

### Community 109 - "Glifo – note per Claude"
Cohesion: 0.29
Nodes (7): Comandi, Come controllare il lavoro, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole, sqlite()

### Community 110 - "page.ts"
Cohesion: 0.09
Nodes (32): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), PullResult, render(), isShareToken(), parseSharedNote() (+24 more)

### Community 111 - "suggestions.ts"
Cohesion: 0.22
Nodes (4): EditorMathContext, expand(), preferredIndex(), SuggestionController

### Community 113 - "tutorial.ts"
Cohesion: 0.17
Nodes (12): openGuide(), HINT_MS, markSeen(), openTutorial(), show(), richText(), showTutorialHint(), close() (+4 more)

### Community 116 - "graph/file.ts"
Cohesion: 0.10
Nodes (35): FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsForFile(), graphsFromFile(), hide() (+27 more)

### Community 117 - "spaces.ts"
Cohesion: 0.11
Nodes (32): formatRational(), Eigenvalue, eigenvectors(), EXACT, FLOAT, kernel(), lengthText(), LinearValue (+24 more)

### Community 121 - "database.ts"
Cohesion: 0.27
Nodes (5): createDatabase(), createUser(), databaseTests(), migrations, shareTests()

### Community 122 - "spell.test.ts"
Cohesion: 0.08
Nodes (23): @codemirror/lang-markdown, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt() (+15 more)

### Community 123 - "Distribution"
Cohesion: 0.17
Nodes (10): addExp(), discreteQuantile(), Distribution, exactIntervalProbability(), integerRange(), intervalProbability(), subtractExp(), TestResult (+2 more)

### Community 124 - "render/lists.ts"
Cohesion: 0.27
Nodes (13): ListStyle, bulletGroup(), Marker, sameList(), alignInside(), asciiTrim(), findMarker(), Found (+5 more)

### Community 125 - "Glifo"
Cohesion: 0.15
Nodes (13): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Funzionalità (+5 more)

### Community 126 - "logo.ts"
Cohesion: 0.39
Nodes (5): BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark()

### Community 128 - "sidePanel.ts"
Cohesion: 0.12
Nodes (20): AiResult, cleanKatexError(), renderTex(), isConfidentAnswer(), CATEGORIES, symbolsInCategory(), cardPreviewTex(), formPreviewTex() (+12 more)

### Community 129 - "smoke-test.mjs"
Cohesion: 0.29
Nodes (4): markdown-it, vite, firstVisit(), plainContext

## Knowledge Gaps
- **578 isolated node(s):** `Comandi`, `Promemoria per lo studente`, `Regole`, `graphify`, `Moves` (+573 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 798 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **21 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `touchlog.ts`, `Parser`, `main.ts`, `odesolve.ts`, `spec.ts`, `several.ts`, `num`, `GraphView`, `complex.ts`, `svg.ts`, `inference.ts`, `toNode`, `compile`, `numerical.ts`, `markdown.ts`, `Board`, `graph.ts`, `MathError`, `toLatex`, `assistant.ts`, `Rational`, `.onMove`, `graph/space.ts`, `graphNote.test.ts`, `logic.ts`, `arithmetic.ts`, `namesIn`, `NotesStore`, `study.ts`, `gauss.ts`, `parse.ts`, `dialogs.ts`, `BoardStore`, `schemaTools.test.ts`, `board/shapes.ts`, `linsys.ts`, `finite.ts`, `toolbar.ts`, `supabase.ts`, `graph/preview.ts`, `Sheet`, `blockMove.ts`, `symbolic.ts`, `schema/editor.ts`, `board.ts`, `sheet.ts`, `Glifo – note per Claude`, `tutorial.ts`, `graph/file.ts`?**
  _High betweenness centrality (0.127) - this node is a cross-community bridge._
- **Why does `vitest` connect `sheet.ts` to `touchlog.ts`, `sidePanel.ts`, `main.ts`, `sync.ts`, `num`, `parseGraph`, `editor/lists.ts`, `svg.ts`, `markdown.ts`, `store.ts`, `assistant.ts`, `graph/space.ts`, `distributions.ts`, `graphNote.test.ts`, `resize.ts`, `NotesStore`, `dialogs.ts`, `schemaTools.test.ts`, `board/shapes.ts`, `search.ts`, `supabase.ts`, `graph/preview.ts`, `parseSchema`, `Sheet`, `insert.ts`, `Dove sono le cose`, `blockMove.ts`, `board.ts`, `editor.test.ts`, `sql.ts`, `notesPanel.ts`, `editor/editor.ts`, `page.ts`, `tutorial.ts`, `spaces.ts`, `database.ts`, `spell.test.ts`, `logo.ts`?**
  _High betweenness centrality (0.106) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `sidePanel.ts`, `main.ts`, `editor/lists.ts`, `SchemaEditor`, `Board`, `graph.ts`, `resize.ts`, `dialogs.ts`, `toolbar.ts`, `graph/preview.ts`, `openShareDialog`, `.constructor`, `schema/editor.ts`, `board.ts`, `notesPanel.ts`, `toast`, `page.ts`, `tutorial.ts`, `spell.test.ts`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **Are the 143 inferred relationships involving `Dove sono le cose` (e.g. with `adoptGuestNotes()` and `sharedLinks()`) actually correct?**
  _`Dove sono le cose` has 143 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Comandi`, `Promemoria per lo studente`, `Regole` to the rest of the system?**
  _578 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `touchlog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08653061224489796 - nodes in this community are weakly interconnected._
- **Should `Parser` be split into smaller, more focused modules?**
  _Cohesion score 0.12245696400625979 - nodes in this community are weakly interconnected._