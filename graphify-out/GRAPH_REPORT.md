# Graph Report - matherdown  (2026-10-06)

## Corpus Check
- 266 files · ~515,699 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 4407 nodes · 15884 edges · 137 communities (111 shown, 26 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 471 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f09fdeb0`
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
- num
- graph/preview.ts
- vitest
- complex.ts
- editor/lists.ts
- svg.ts
- spreadsheet/editor.ts
- SchemaEditor
- conics.ts
- SheetEditor
- MathError
- numerical.ts
- markdown.ts
- index.ts
- engine.ts
- Board
- distributions.ts
- store.ts
- linear.ts
- statsGraph.ts
- assistant.ts
- tutorial.ts
- graph.ts
- Pt
- graph/space.ts
- spreadsheet/evaluate.ts
- graphInsert.ts
- logic.ts
- notesPanel.ts
- arithmetic.ts
- toLatex
- probability.ts
- resize.ts
- statsShown.ts
- view3d.ts
- NotesStore
- study.ts
- functions.ts
- scopeWith
- ink.ts
- gauss.ts
- formatNumber
- board/shapes.ts
- laplace.ts
- linsys.ts
- search.ts
- h
- FoldersStore
- latex.ts
- 20261004091555_note_condivise.sql
- account/space.ts
- Field
- grafo-html.mjs
- schema/shapes.ts
- dependencies
- supabase.ts
- Le spiegazioni, come funzionano
- ui/preview.ts
- openShareDialog
- parseSchema
- Sheet
- settings.ts
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
- supabase-stub.sql
- account-test.mjs
- Il database degli account (Supabase)
- scripts
- Parser
- logo.ts
- AccountSync
- editor/editor.ts
- severalGraph.ts
- Costi
- fake-supabase.mjs
- createFakeSupabase
- files.ts
- Glifo – note per Claude
- page.ts
- sidePanel.ts
- toolbar.ts
- graph/file.ts
- sheet.ts
- Rational
- @codemirror/state
- SidePanel
- Idee per il futuro
- sql.ts
- suggestions.ts
- Glifo
- La lavagna
- smoke-test.mjs
- SheetModel
- numerical.test.ts
- I modelli e le chiavi API
- icons.mjs

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 166 edges
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
- `Come viene pubblicata` --references--> `dist()`  [INFERRED]
  README.md → src/board/shapes.ts
- `Dove sono le cose` --references--> `adoptGuestNotes()`  [INFERRED]
  ARCHITETTURA.md → src/account/space.ts
- `Dove sono le cose` --references--> `sharedLinks()`  [INFERRED]
  ARCHITETTURA.md → src/account/supabase.ts
- `Dove sono le cose` --references--> `shareNote()`  [INFERRED]
  ARCHITETTURA.md → src/account/supabase.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (137 total, 26 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.09
Nodes (25): at(), browserStore, clip(), isSaved(), KINDS, LOG_KEY, LOG_MAX_LINES, LogStore (+17 more)

### Community 1 - "parse.ts"
Cohesion: 0.08
Nodes (38): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe(), differentialInFraction() (+30 more)

### Community 2 - "main.ts"
Cohesion: 0.05
Nodes (91): addToGraphBlock(), blockMoveTransaction(), graphsForFile(), hide(), account, active, app, applyAccountChange() (+83 more)

### Community 3 - "odesolve.ts"
Cohesion: 0.08
Nodes (80): linearIn(), termTransform(), addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled() (+72 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (37): withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty(), iso() (+29 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (98): conicItems(), isConicLine(), quadricEquation(), isFourierLine(), isTestLine(), number(), testItems(), isNumericalLine() (+90 more)

### Community 6 - "several.ts"
Cohesion: 0.06
Nodes (78): Definite, EMPTY_SCOPE, absOf(), boundsOf(), close(), definite(), fourierProblem, fourierShown() (+70 more)

### Community 7 - "num"
Cohesion: 0.12
Nodes (92): atIntegers(), oneFraction(), withoutAbs(), oneFraction(), polyEx(), constantParticular(), exp(), expOf() (+84 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (43): addLabel(), boxes, cameras, complexCoord(), coord(), drawings, drawnViews, endTex() (+35 more)

### Community 9 - "vitest"
Cohesion: 0.08
Nodes (32): vitest, staticGraphSvg(), chooseWindow(), chooseBox(), GraphItem, parseGraph(), DrawOptions, PALETTES (+24 more)

### Community 10 - "complex.ts"
Cohesion: 0.08
Nodes (38): add(), arg(), asin(), atan(), compileFunction(), ComplexCompiled, ComplexVars, conjugateOf() (+30 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.09
Nodes (64): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+56 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (52): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), domainEdge(), features() (+44 more)

### Community 13 - "spreadsheet/editor.ts"
Cohesion: 0.07
Nodes (70): openSheet(), saveSheetBlock(), currentCall(), Editing, MenuEntry, Move, openSheetEditor(), PATHS (+62 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.10
Nodes (4): SchemaEditor, serializeSchema(), tableHeight(), tableMetrics()

### Community 15 - "conics.ts"
Cohesion: 0.21
Nodes (27): at(), centralCanonical(), Coefficients, coneCanonical(), conicOf(), det2(), det3(), determinant() (+19 more)

### Community 16 - "SheetEditor"
Cohesion: 0.10
Nodes (4): SheetEditor, serializeSheet(), sheetSize(), cloneSheet()

### Community 17 - "MathError"
Cohesion: 0.08
Nodes (55): fourierItems(), typedSliderValue(), argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot() (+47 more)

### Community 18 - "numerical.ts"
Cohesion: 0.11
Nodes (47): Funzionalità, bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial() (+39 more)

### Community 19 - "markdown.ts"
Cohesion: 0.06
Nodes (42): @codemirror/language, acceptCalcResult(), CalcCheck, calcPlugin, CalcResult, CheckWidget, insertResult(), ResultWidget (+34 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (41): b, bigops, c, calculus, fn, fr, fractions, functions (+33 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 23 - "distributions.ts"
Cohesion: 0.06
Nodes (63): addExp(), choose(), continuousQuantile(), discreteQuantile(), Distribution, exactIntervalProbability(), expSumValue(), factorialBig() (+55 more)

### Community 24 - "store.ts"
Cohesion: 0.08
Nodes (18): EraseAction, Step, BoardBackend, BoardChange, BoardData, done(), fromRecord(), IdbBoards (+10 more)

### Community 25 - "linear.ts"
Cohesion: 0.11
Nodes (55): angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, dataOf(), determinant() (+47 more)

### Community 26 - "statsGraph.ts"
Cohesion: 0.27
Nodes (12): classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX, Line, number(), pmfBars() (+4 more)

### Community 27 - "assistant.ts"
Cohesion: 0.10
Nodes (27): AiAnswer, AiError, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible(), askThroughHost(), checkShape() (+19 more)

### Community 28 - "tutorial.ts"
Cohesion: 0.18
Nodes (11): HINT_MS, markSeen(), openTutorial(), show(), richText(), showTutorialHint(), close(), TUTORIAL_PAGES (+3 more)

### Community 29 - "graph.ts"
Cohesion: 0.13
Nodes (28): AT_X, cellHtml(), cellText(), COMPASS, createEdgeCell(), createGraph(), drawSchema(), edgeLook() (+20 more)

### Community 30 - "Pt"
Cohesion: 0.25
Nodes (5): MoveAction, pressureOf(), Transform, EllipseFit, Pt

### Community 31 - "graph/space.ts"
Cohesion: 0.12
Nodes (46): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+38 more)

### Community 32 - "spreadsheet/evaluate.ts"
Cohesion: 0.09
Nodes (39): CellResult, EMPTY, evaluateSheet(), number(), SheetEvaluator, decimalsOf(), divFormat(), fixedNumber() (+31 more)

### Community 33 - "graphInsert.ts"
Cohesion: 0.22
Nodes (14): calcOutcomes(), formulasUntil(), sheetBefore(), formulaAtCursor(), GraphLabelLines, insertGraphBlock(), setGraphLabels(), formulaGraphLine() (+6 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "notesPanel.ts"
Cohesion: 0.15
Nodes (11): Folder, FolderGroup, groupByFolder(), loadClosedFolders(), saveClosedFolders(), Note, NoteMeta, clear() (+3 more)

### Community 36 - "arithmetic.ts"
Cohesion: 0.10
Nodes (47): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+39 more)

### Community 37 - "toLatex"
Cohesion: 0.11
Nodes (41): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+33 more)

### Community 38 - "probability.ts"
Cohesion: 0.13
Nodes (23): End, CompileOptions, ExactScope, ALL, compileOf(), complement(), endAt(), EventContext (+15 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "statsShown.ts"
Cohesion: 0.17
Nodes (31): check(), correlation(), count(), covariance(), Data, dataStatistic(), deviation(), fail() (+23 more)

### Community 41 - "view3d.ts"
Cohesion: 0.10
Nodes (36): Face, planeTolerance(), regionFaces(), surfacePlane(), Plane, Vec3, Palette, arcPoints() (+28 more)

### Community 42 - "NotesStore"
Cohesion: 0.08
Nodes (23): Deletion, DeletionLog, FOLDER_NAME_MAX, RemoteFolder, isUuid(), newId(), createdAtFromId(), deriveTitle() (+15 more)

### Community 43 - "study.ts"
Cohesion: 0.15
Nodes (35): nameLatex(), splitRoot(), breaks(), periodOf(), Asymptote, compiled(), cutsOf(), defined() (+27 more)

### Community 44 - "functions.ts"
Cohesion: 0.12
Nodes (44): addFormat(), boolArg(), BY_NAME, conditional(), criterion(), Ctx, define(), EURO (+36 more)

### Community 45 - "scopeWith"
Cohesion: 0.09
Nodes (46): depth(), integralRegion, LayeredSolid, Multiple, planeMargin(), PlanePart, radiusOf(), spaceLayers() (+38 more)

### Community 46 - "ink.ts"
Cohesion: 0.10
Nodes (20): loadPrefs(), Prefs, BOARD_PALETTES, BoardPalette, BoardTheme, highlightName(), inkName(), mid() (+12 more)

### Community 47 - "gauss.ts"
Cohesion: 0.15
Nodes (26): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexLine(), isComplexValue() (+18 more)

### Community 48 - "formatNumber"
Cohesion: 0.13
Nodes (26): exponentialForm(), fracTex(), fracText(), nearFraction(), piMultiple(), surd(), decimalSeparator(), Digits (+18 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (35): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+27 more)

### Community 50 - "laplace.ts"
Cohesion: 0.11
Nodes (48): integerPoly(), beyondPoles(), compiled(), E, exp(), fractionShown(), HALF, hyperbolicToExp() (+40 more)

### Community 51 - "linsys.ts"
Cohesion: 0.10
Nodes (45): LinearScope, Mat, rref(), choices(), isStandardUnknown(), linearSystem(), matrixEquation(), matrixSystem() (+37 more)

### Community 52 - "search.ts"
Cohesion: 0.17
Nodes (24): editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex() (+16 more)

### Community 53 - "h"
Cohesion: 0.09
Nodes (40): SyncStatus, board, viewSwitch, openSignedOut(), printButton(), ShareDialogDeps, DEFAULT_SETTINGS, AccountButton (+32 more)

### Community 54 - "FoldersStore"
Cohesion: 0.16
Nodes (4): cleanFolderName(), FoldersStore, sameName(), names()

### Community 55 - "latex.ts"
Cohesion: 0.08
Nodes (51): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteContext (+43 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "account/space.ts"
Cohesion: 0.23
Nodes (17): accountSpace(), adoptGuestNotes(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf(), setCurrentAccount() (+9 more)

### Community 58 - "Field"
Cohesion: 0.12
Nodes (7): characteristicPolynomial(), eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn()

### Community 59 - "grafo-html.mjs"
Cohesion: 0.25
Nodes (4): graphFile, names, namesFile, root

### Community 60 - "schema/shapes.ts"
Cohesion: 0.09
Nodes (14): @maxgraph/core, ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape (+6 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (24): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+16 more)

### Community 62 - "supabase.ts"
Cohesion: 0.13
Nodes (28): @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken(), ensureSessionOf() (+20 more)

### Community 63 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 64 - "ui/preview.ts"
Cohesion: 0.08
Nodes (23): GraphLabels, renameGraphScope(), renameScopeKeys(), BlockKind, MoveDir, draw(), drawCached(), drawn (+15 more)

### Community 65 - "openShareDialog"
Cohesion: 0.19
Nodes (14): openShareDialog(), changeAccess(), changeCopy(), copy(), refreshChanged(), render(), run(), setStatus() (+6 more)

### Community 66 - "parseSchema"
Cohesion: 0.16
Nodes (16): schemaSummary(), base64(), hide(), OPEN, schemasForFile(), schemasFromFile(), unhide(), isRecord() (+8 more)

### Community 67 - "Sheet"
Cohesion: 0.06
Nodes (47): ExactComplexScope, ConicInfo, Ode, withWorkLimit(), FormattedResult, differentialRequest, pieces(), MathNode (+39 more)

### Community 68 - "settings.ts"
Cohesion: 0.14
Nodes (19): addPersonalWord(), DICTIONARY_KEY, loadPersonalWords(), savePersonalWords(), tidy(), ACCOUNT_SETTINGS, accountSettings(), AI_MODELS (+11 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "Dove sono le cose"
Cohesion: 0.08
Nodes (44): Dove sono le cose, Glifo – architettura, LassoAction, centerOn(), copyStrokes(), cross(), handleScale(), IDENTITY (+36 more)

### Community 72 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 73 - "blockMove.ts"
Cohesion: 0.06
Nodes (47): blockMoved, blockMoves(), LineMap, BlockWidget, findWidgetBlocks(), guardBlocks(), KINDS, schemaBlocks() (+39 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (59): primitive(), verified(), linearCells(), pairUp(), atValues(), cancelLinear(), Converter, coordinates() (+51 more)

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
Nodes (81): alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ARROW_NAMES, AT_ICONS (+73 more)

### Community 79 - "board.ts"
Cohesion: 0.06
Nodes (30): Action, ACTION_NAMES, BoardOptions, clampZoom(), coalesced(), DOT_SIZES, DrawAction, EraserMode (+22 more)

### Community 82 - "editor.test.ts"
Cohesion: 0.07
Nodes (31): @lezer/common, closeMathBlockOnEnter(), tabOutOfMath(), CODE_NODES, CommandToken, commandTokenAt(), isInCode(), MATH_NODES (+23 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.20
Nodes (6): centerOf(), clickOn(), ffmpeg, SCENES, SIZE, work

### Community 90 - "Abbonamenti"
Cohesion: 0.14
Nodes (14): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+6 more)

### Community 91 - "BoardStore"
Cohesion: 0.16
Nodes (3): BoardStore, validView(), backup()

### Community 96 - "account-test.mjs"
Cohesion: 0.20
Nodes (4): device(), login(), newContext, waitFor()

### Community 97 - "Il database degli account (Supabase)"
Cohesion: 0.17
Nodes (11): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Nell'app, Note condivise con un link (+3 more)

### Community 98 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 101 - "logo.ts"
Cohesion: 0.39
Nodes (5): BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark()

### Community 103 - "editor/editor.ts"
Cohesion: 0.05
Nodes (49): description, name, private, type, version, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands (+41 more)

### Community 104 - "severalGraph.ts"
Cohesion: 0.54
Nodes (7): criticalLine(), named(), severalItems(), surface(), extremaOf(), optimumOf(), severalOf()

### Community 105 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, Quando lo studente dice di cominciare

### Community 106 - "fake-supabase.mjs"
Cohesion: 0.25
Nodes (6): @electric-sql/pglite, b64(), CODE, GOOGLE_CODE, ROOT, SUPABASE_URL

### Community 107 - "createFakeSupabase"
Cohesion: 0.60
Nodes (6): createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 108 - "files.ts"
Cohesion: 0.19
Nodes (15): inClaudeViewer(), loadDialect(), canWriteFilesDirectly(), downloadBlob(), downloadText(), fileNameFor(), FsWindow, isAbort() (+7 more)

### Community 109 - "Glifo – note per Claude"
Cohesion: 0.22
Nodes (9): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole (+1 more)

### Community 110 - "page.ts"
Cohesion: 0.09
Nodes (31): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), currentAccount(), PullResult, isShareToken(), parseSharedNote() (+23 more)

### Community 111 - "sidePanel.ts"
Cohesion: 0.17
Nodes (15): AiResult, SuggestionItem, isConfidentAnswer(), Settings, CATEGORIES, symbolsInCategory(), cardPreviewTex(), formPreviewTex() (+7 more)

### Community 113 - "toolbar.ts"
Cohesion: 0.08
Nodes (24): EditorCallbacks, MarkdownEditor, insertBlock(), InsertOptions, insertTemplate(), toggleLinePrefix(), wrapSelection(), LIST_STYLES (+16 more)

### Community 116 - "graph/file.ts"
Cohesion: 0.09
Nodes (39): calcResults(), FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsFromFile(), OPEN (+31 more)

### Community 117 - "sheet.ts"
Cohesion: 0.06
Nodes (48): formatGauss(), OdeFunction, formatRational(), LimitValue, Eigenvalue, EXACT, FLOAT, Lin (+40 more)

### Community 121 - "Rational"
Cohesion: 0.11
Nodes (22): Part, expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactFunction, ExactRandom (+14 more)

### Community 122 - "@codemirror/state"
Cohesion: 0.07
Nodes (28): @codemirror/lang-markdown, @codemirror/state, noIndentedCode, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck() (+20 more)

### Community 123 - "SidePanel"
Cohesion: 0.25
Nodes (3): displayCode(), preventFocusSteal(), SidePanel

### Community 124 - "Idee per il futuro"
Cohesion: 0.33
Nodes (6): Account: i propri appunti su ogni dispositivo, anche da condividere, Idee per il futuro, In programma, La lavagna: idee in più, Più avanti, Schemi: idee in più

### Community 125 - "sql.ts"
Cohesion: 0.17
Nodes (18): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+10 more)

### Community 126 - "suggestions.ts"
Cohesion: 0.19
Nodes (7): templateInsertion(), EditorMathContext, expand(), preferredIndex(), SuggestionController, parseTemplate(), templateText()

### Community 127 - "Glifo"
Cohesion: 0.17
Nodes (12): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Glifo (+4 more)

### Community 128 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 129 - "smoke-test.mjs"
Cohesion: 0.29
Nodes (4): markdown-it, vite, firstVisit(), plainContext

### Community 131 - "SheetModel"
Cohesion: 0.50
Nodes (3): SheetEditorOptions, Snapshot, SheetModel

### Community 132 - "numerical.test.ts"
Cohesion: 0.60
Nodes (3): result(), text(), verdict()

### Community 133 - "I modelli e le chiavi API"
Cohesion: 0.50
Nodes (4): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), Le idee dello studente (5 ottobre 2026)

## Knowledge Gaps
- **593 isolated node(s):** `Comandi`, `Promemoria per lo studente`, `Regole`, `Condividere una nota con un link`, `Provarlo sul tuo computer` (+588 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 822 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **26 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `touchlog.ts`, `parse.ts`, `main.ts`, `odesolve.ts`, `spec.ts`, `several.ts`, `num`, `graph/preview.ts`, `complex.ts`, `svg.ts`, `spreadsheet/editor.ts`, `SheetEditor`, `MathError`, `numerical.ts`, `markdown.ts`, `Board`, `distributions.ts`, `linear.ts`, `assistant.ts`, `tutorial.ts`, `Pt`, `graph/space.ts`, `spreadsheet/evaluate.ts`, `graphInsert.ts`, `logic.ts`, `arithmetic.ts`, `toLatex`, `NotesStore`, `study.ts`, `functions.ts`, `ink.ts`, `gauss.ts`, `board/shapes.ts`, `linsys.ts`, `latex.ts`, `account/space.ts`, `supabase.ts`, `ui/preview.ts`, `Sheet`, `settings.ts`, `blockMove.ts`, `symbolic.ts`, `schema/editor.ts`, `BoardStore`, `severalGraph.ts`, `toolbar.ts`, `graph/file.ts`, `sheet.ts`, `Rational`?**
  _High betweenness centrality (0.165) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `touchlog.ts`, `main.ts`, `sync.ts`, `numerical.test.ts`, `num`, `editor/lists.ts`, `svg.ts`, `spreadsheet/editor.ts`, `markdown.ts`, `distributions.ts`, `store.ts`, `assistant.ts`, `tutorial.ts`, `notesPanel.ts`, `resize.ts`, `NotesStore`, `scopeWith`, `ink.ts`, `board/shapes.ts`, `laplace.ts`, `linsys.ts`, `search.ts`, `h`, `account/space.ts`, `supabase.ts`, `ui/preview.ts`, `parseSchema`, `Sheet`, `settings.ts`, `Dove sono le cose`, `blockMove.ts`, `schema/editor.ts`, `board.ts`, `editor.test.ts`, `logo.ts`, `editor/editor.ts`, `page.ts`, `sidePanel.ts`, `toolbar.ts`, `graph/file.ts`, `sheet.ts`, `@codemirror/state`, `sql.ts`?**
  _High betweenness centrality (0.118) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `main.ts`, `graph/preview.ts`, `spreadsheet/editor.ts`, `SchemaEditor`, `SheetEditor`, `Board`, `tutorial.ts`, `notesPanel.ts`, `resize.ts`, `ink.ts`, `ui/preview.ts`, `openShareDialog`, `schema/editor.ts`, `board.ts`, `files.ts`, `page.ts`, `sidePanel.ts`, `toolbar.ts`, `@codemirror/state`, `SidePanel`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **Are the 165 inferred relationships involving `Dove sono le cose` (e.g. with `adoptGuestNotes()` and `sharedLinks()`) actually correct?**
  _`Dove sono le cose` has 165 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Comandi`, `Promemoria per lo studente`, `Regole` to the rest of the system?**
  _593 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `touchlog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08673469387755102 - nodes in this community are weakly interconnected._
- **Should `parse.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07816349384098545 - nodes in this community are weakly interconnected._