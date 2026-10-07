# Graph Report - matherdown  (2026-10-07)

## Corpus Check
- 267 files · ~516,484 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 4414 nodes · 15900 edges · 137 communities (112 shown, 25 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 472 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d4aa78af`
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
- linsys.ts
- toLatex
- inference.ts
- view3d.ts
- spreadsheet/evaluate.ts
- graphNote.test.ts
- logic.ts
- FoldersStore
- arithmetic.ts
- namesIn
- schemaBlocks.ts
- resize.ts
- sheet.ts
- suggestions.ts
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
- graph.ts
- finite.ts
- 20261004091555_note_condivise.sql
- Pt
- Field
- grafo-html.mjs
- schema/shapes.ts
- dependencies
- supabase.ts
- Le spiegazioni, come funzionano
- ui/preview.ts
- spaces.ts
- graph/file.ts
- Sheet
- drawScene
- Benvenuto in Glifo
- compilerOptions
- Dove sono le cose
- Piano per piano
- blockMove.ts
- symbolic.ts
- .solveAll
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- formatNumber
- session-start.sh
- .claude/CLAUDE.md
- editor.test.ts
- tutorial.mjs
- Abbonamenti
- account/space.ts
- Costi
- supabase-stub.sql
- account-test.mjs
- Il database degli account (Supabase)
- editor/editor.ts
- Parser
- tutorial.ts
- .sameAs
- devDependencies
- severalGraph.ts
- icons.mjs
- fake-supabase.mjs
- Idee per il futuro
- files.ts
- Glifo – note per Claude
- openShareDialog
- .constructor
- .constructor
- labels.ts
- solve.ts
- Rational
- spell.test.ts
- sidePanel.ts
- sql.ts
- page.ts
- Glifo
- createFakeSupabase
- smoke-test.mjs
- La lavagna
- I modelli e le chiavi API
- vite.config.ts
- SheetModel

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 164 edges
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
- `Come viene pubblicata` --references--> `dist()`  [INFERRED]
  README.md → src/board/shapes.ts
- `Dove sono le cose` --references--> `ConicElements`  [INFERRED]
  ARCHITETTURA.md → src/math/conics.ts
- `Funzionalità` --references--> `k()`  [INFERRED]
  README.md → src/math/numerical.ts
- `Dove sono le cose` --references--> `adoptGuestNotes()`  [INFERRED]
  ARCHITETTURA.md → src/account/space.ts
- `Dove sono le cose` --references--> `shareNote()`  [INFERRED]
  ARCHITETTURA.md → src/account/supabase.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (137 total, 25 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.09
Nodes (26): at(), browserStore, clip(), isSaved(), KINDS, LOG_KEY, LOG_MAX_LINES, LogStore (+18 more)

### Community 1 - "parse.ts"
Cohesion: 0.08
Nodes (39): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe(), differentialInFraction() (+31 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (90): account, active, app, applyAccountChange(), applySpellcheck(), applyTheme(), backdrop, backup() (+82 more)

### Community 3 - "odesolve.ts"
Cohesion: 0.08
Nodes (80): linearIn(), addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames() (+72 more)

### Community 4 - "sync.ts"
Cohesion: 0.05
Nodes (38): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+30 more)

### Community 5 - "spec.ts"
Cohesion: 0.06
Nodes (82): conicItems(), isConicLine(), quadricEquation(), isComplexLine(), isTestLine(), number(), testItems(), depth() (+74 more)

### Community 6 - "several.ts"
Cohesion: 0.06
Nodes (79): close(), Definite, definiteIntegral(), exValue(), samples(), EMPTY_SCOPE, absOf(), boundsOf() (+71 more)

### Community 7 - "num"
Cohesion: 0.15
Nodes (80): atIntegers(), withoutAbs(), hyperbolicToExp(), polyEx(), similarSolution(), algebraic(), bigGcd(), byParts() (+72 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.05
Nodes (54): FIGURE_PALETTE, addLabel(), boxes, cameras, complexCoord(), containing(), coord(), drawings (+46 more)

### Community 9 - "vitest"
Cohesion: 0.06
Nodes (38): vitest, staticGraphSvg(), chooseWindow(), chooseY(), features(), findWindow(), nearOrigin(), regionExtent() (+30 more)

### Community 10 - "complex.ts"
Cohesion: 0.06
Nodes (63): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexValue(), isInequality() (+55 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.09
Nodes (60): continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext(), isBlank() (+52 more)

### Community 12 - "svg.ts"
Cohesion: 0.11
Nodes (45): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), clipLines(), domainEdge(), gcd(), jump() (+37 more)

### Community 13 - "spreadsheet/editor.ts"
Cohesion: 0.07
Nodes (66): openSheet(), saveSheetBlock(), Editing, Move, openSheetEditor(), PATHS, formatCode(), formatValue() (+58 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.09
Nodes (10): SchemaEditor, cellText(), edgeLook(), nodeLook(), nodeStyle(), readSchema(), restyle(), EdgeLook (+2 more)

### Community 15 - "conics.ts"
Cohesion: 0.18
Nodes (29): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+21 more)

### Community 16 - "SheetEditor"
Cohesion: 0.09
Nodes (8): currentCall(), MenuEntry, rangeLabel(), SheetEditor, serializeSheet(), CellRange, clearRange(), cloneSheet()

### Community 17 - "compile"
Cohesion: 0.07
Nodes (53): areaFor(), constantValue(), define(), argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension() (+45 more)

### Community 18 - "numerical.ts"
Cohesion: 0.12
Nodes (46): bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial(), interpolating() (+38 more)

### Community 19 - "markdown.ts"
Cohesion: 0.09
Nodes (38): valueNode(), texHtml(), moveAttrs(), checkHtml(), checkTitle(), cache, cleanKatexError(), escapeHtml() (+30 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (41): b, bigops, c, calculus, fn, fr, fractions, functions (+33 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "Board"
Cohesion: 0.09
Nodes (5): Board, clampZoom(), validView(), BoardTheme, Box

### Community 23 - "distributions.ts"
Cohesion: 0.12
Nodes (34): addExp(), choose(), continuousQuantile(), discreteQuantile(), Distribution, exactIntervalProbability(), factorialBig(), FAMILIES (+26 more)

### Community 24 - "store.ts"
Cohesion: 0.06
Nodes (16): fake-indexeddb, BoardBackend, BoardStore, done(), fromRecord(), IdbBoards, MemoryBoards, ofNote() (+8 more)

### Community 25 - "MathError"
Cohesion: 0.11
Nodes (61): MathError, angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, dataOf() (+53 more)

### Community 26 - "statsGraph.ts"
Cohesion: 0.27
Nodes (12): classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX, Line, number(), pmfBars() (+4 more)

### Community 27 - "assistant.ts"
Cohesion: 0.09
Nodes (26): @anthropic-ai/sdk, AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible() (+18 more)

### Community 28 - "linsys.ts"
Cohesion: 0.14
Nodes (41): choices(), gcd(), matrixEquation(), matrixSystem(), minorsGcd(), ONE, parametricRows(), parametricSystem() (+33 more)

### Community 29 - "toLatex"
Cohesion: 0.10
Nodes (38): FieldContext, fourierItems(), isFourierLine(), isNumericalLine(), numericalItems(), multipleLabel(), names(), STUDY_GRAPH (+30 more)

### Community 30 - "inference.ts"
Cohesion: 0.16
Nodes (24): chiSquareTest(), confidence(), confidenceShown(), Given, hypothesisTest(), InferenceContext, interval(), meanOf() (+16 more)

### Community 31 - "view3d.ts"
Cohesion: 0.08
Nodes (68): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+60 more)

### Community 32 - "spreadsheet/evaluate.ts"
Cohesion: 0.09
Nodes (36): sheetSummary(), CellResult, EMPTY, evaluateSheet(), number(), SheetEvaluator, decimalsOf(), fixedNumber() (+28 more)

### Community 33 - "graphNote.test.ts"
Cohesion: 0.07
Nodes (37): @codemirror/language, @codemirror/state, @codemirror/view, @lezer/common, acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin (+29 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "FoldersStore"
Cohesion: 0.06
Nodes (25): Deletion, DeletionLog, cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder() (+17 more)

### Community 36 - "arithmetic.ts"
Cohesion: 0.10
Nodes (48): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+40 more)

### Community 37 - "namesIn"
Cohesion: 0.13
Nodes (37): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+29 more)

### Community 38 - "schemaBlocks.ts"
Cohesion: 0.07
Nodes (36): insertBlock(), InsertOptions, toggleLinePrefix(), wrapSelection(), applyListStyle(), LIST_STYLES, besideSchema(), BlockWidget (+28 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "sheet.ts"
Cohesion: 0.09
Nodes (53): expSumValue(), Lin, NUMERICAL, bracketParts(), BRACKETS, CHECK_VALUES, checks, Definition (+45 more)

### Community 41 - "suggestions.ts"
Cohesion: 0.14
Nodes (12): templateInsertion(), EditorMathContext, expand(), preferredIndex(), SuggestionController, cardPreviewTex(), formPreviewTex(), ParsedTemplate (+4 more)

### Community 42 - "NotesStore"
Cohesion: 0.13
Nodes (11): createdAtFromId(), deriveTitle(), NotesStore, hasLocalStorage(), memory, migrateKeyPrefix(), readItem(), removeItem() (+3 more)

### Community 43 - "study.ts"
Cohesion: 0.16
Nodes (32): limit(), Asymptote, compiled(), cutsOf(), defined(), domainOf(), exact(), inDomain() (+24 more)

### Community 44 - "functions.ts"
Cohesion: 0.10
Nodes (51): addFormat(), divFormat(), mulFormat(), withCents(), FormulaNode, boolArg(), BY_NAME, callFunction() (+43 more)

### Community 45 - "domain.ts"
Cohesion: 0.09
Nodes (50): constantIntegrand(), inequalityMargin(), integralRegion, LayeredSolid, Multiple, planeMargin(), PlanePart, planeParts() (+42 more)

### Community 46 - "board.ts"
Cohesion: 0.06
Nodes (45): Action, ACTION_NAMES, DOT_SIZES, DrawAction, EraseAction, EraserMode, HANDLE_REACH, ICON (+37 more)

### Community 47 - "MathNode"
Cohesion: 0.17
Nodes (6): Definition, Line, ExactComplexScope, Ode, FiniteContext, MathNode

### Community 48 - "probability.ts"
Cohesion: 0.12
Nodes (25): End, Family, CompileOptions, ExactScope, rejection(), ALL, complement(), distributionOf() (+17 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (35): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+27 more)

### Community 50 - "laplace.ts"
Cohesion: 0.16
Nodes (29): factoredPolynomial(), oneFraction(), beyondPoles(), compiled(), E, exp(), fractionShown(), HALF (+21 more)

### Community 51 - "FormattedResult"
Cohesion: 0.22
Nodes (4): withWorkLimit(), FormattedResult, Found, needsSymbols()

### Community 52 - "search.ts"
Cohesion: 0.17
Nodes (24): editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex() (+16 more)

### Community 53 - "h"
Cohesion: 0.08
Nodes (43): SyncStatus, aiService, board, viewSwitch, openSignedOut(), printButton(), ShareDialogDeps, DEFAULT_SETTINGS (+35 more)

### Community 54 - "graph.ts"
Cohesion: 0.10
Nodes (29): AT_X, cellHtml(), COMPASS, createEdgeCell(), createGraph(), drawSchema(), edgeStyle(), edgeTextAt() (+21 more)

### Community 55 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "Pt"
Cohesion: 0.12
Nodes (11): coalesced(), Finger, LassoAction, MoveAction, penErases(), pointsOf(), pressureOf(), Transform (+3 more)

### Community 58 - "Field"
Cohesion: 0.12
Nodes (7): characteristicPolynomial(), eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn()

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
Cohesion: 0.08
Nodes (44): @supabase/supabase-js, AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), accountError, appUrl(), call() (+36 more)

### Community 63 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 64 - "ui/preview.ts"
Cohesion: 0.09
Nodes (20): GraphLabels, BlockKind, MoveDir, draw(), drawCached(), drawn, errorHtml(), fill() (+12 more)

### Community 65 - "spaces.ts"
Cohesion: 0.17
Nodes (21): formatRational(), Eigenvalue, LinearValue, surdText(), cartesianEquations(), Cell, coordinateNames(), diagonalize() (+13 more)

### Community 66 - "graph/file.ts"
Cohesion: 0.07
Nodes (47): schemaSummary(), svg(), figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsForFile(), graphsFromFile() (+39 more)

### Community 67 - "Sheet"
Cohesion: 0.11
Nodes (25): Sheet, text(), tex(), text(), check(), result(), text(), text() (+17 more)

### Community 68 - "drawScene"
Cohesion: 0.19
Nodes (13): Vec3, arrowHead(), boxShape(), Coverage, Directions, dot(), drawScene(), f1() (+5 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "Dove sono le cose"
Cohesion: 0.09
Nodes (43): Dove sono le cose, Glifo – architettura, centerOn(), copyStrokes(), cross(), handleScale(), IDENTITY, insideLasso() (+35 more)

### Community 72 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 73 - "blockMove.ts"
Cohesion: 0.10
Nodes (36): @codemirror/commands, blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove, blockPlace() (+28 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.06
Nodes (64): primitive(), verified(), linearCells(), atValues(), cancelLinear(), Converter, coordinates(), decimalText() (+56 more)

### Community 75 - ".solveAll"
Cohesion: 0.16
Nodes (9): chainOf(), definitionTarget(), parseCached(), splitPieces(), styleOf(), walk(), withoutDots(), mapNode() (+1 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.04
Nodes (73): alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ARROW_NAMES, AT_ICONS (+65 more)

### Community 79 - "formatNumber"
Cohesion: 0.10
Nodes (33): exponentialForm(), fracTex(), fracText(), nearFraction(), piMultiple(), surd(), decimalSeparator(), Digits (+25 more)

### Community 82 - "editor.test.ts"
Cohesion: 0.08
Nodes (23): tabOutOfMath(), commandTokenAt(), isInCode(), mathContextAt(), openMathBefore(), addPlaceholders, buildDecorations(), clearAllPlaceholders() (+15 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.20
Nodes (6): centerOf(), clickOn(), ffmpeg, SCENES, SIZE, work

### Community 90 - "Abbonamenti"
Cohesion: 0.14
Nodes (14): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+6 more)

### Community 91 - "account/space.ts"
Cohesion: 0.18
Nodes (19): accountSpace(), adoptGuestNotes(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf(), setCurrentAccount() (+11 more)

### Community 92 - "Costi"
Cohesion: 0.21
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, Quando lo studente dice di cominciare

### Community 96 - "account-test.mjs"
Cohesion: 0.20
Nodes (4): device(), login(), newContext, waitFor()

### Community 97 - "Il database degli account (Supabase)"
Cohesion: 0.18
Nodes (10): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Nell'app, Note condivise con un link (+2 more)

### Community 98 - "editor/editor.ts"
Cohesion: 0.07
Nodes (35): description, name, private, scripts, build, dev, preview, test (+27 more)

### Community 100 - "Parser"
Cohesion: 0.29
Nodes (3): FormulaError, parseFormula(), Parser

### Community 101 - "tutorial.ts"
Cohesion: 0.18
Nodes (11): HINT_MS, markSeen(), openTutorial(), show(), richText(), showTutorialHint(), close(), TUTORIAL_PAGES (+3 more)

### Community 102 - ".sameAs"
Cohesion: 0.27
Nodes (4): close(), digitsMatch(), isLiteral(), writtenDecimals()

### Community 103 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

### Community 104 - "severalGraph.ts"
Cohesion: 0.54
Nodes (7): criticalLine(), isSeveralLine(), named(), severalItems(), surface(), optimumOf(), severalOf()

### Community 106 - "fake-supabase.mjs"
Cohesion: 0.25
Nodes (6): @electric-sql/pglite, b64(), CODE, GOOGLE_CODE, ROOT, SUPABASE_URL

### Community 107 - "Idee per il futuro"
Cohesion: 0.33
Nodes (6): Account: i propri appunti su ogni dispositivo, anche da condividere, Idee per il futuro, In programma, La lavagna: idee in più, Più avanti, Schemi: idee in più

### Community 108 - "files.ts"
Cohesion: 0.19
Nodes (15): inClaudeViewer(), loadDialect(), canWriteFilesDirectly(), downloadBlob(), downloadText(), fileNameFor(), FsWindow, isAbort() (+7 more)

### Community 109 - "Glifo – note per Claude"
Cohesion: 0.22
Nodes (9): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole (+1 more)

### Community 110 - "openShareDialog"
Cohesion: 0.19
Nodes (14): openShareDialog(), changeAccess(), changeCopy(), copy(), refreshChanged(), render(), run(), setStatus() (+6 more)

### Community 113 - ".constructor"
Cohesion: 0.17
Nodes (5): closeMathBlockOnEnter(), EditorCallbacks, MarkdownEditor, insertTemplate(), setup()

### Community 116 - "labels.ts"
Cohesion: 0.16
Nodes (20): ACCENTS, BLACKBOARD, CALLIGRAPHIC, closing(), convert(), escapeXml(), FUNCTIONS, GREEK (+12 more)

### Community 117 - "solve.ts"
Cohesion: 0.15
Nodes (27): LinearScope, splitRoot(), isStandardUnknown(), linearSystem(), RelOp, breaks(), cubeRoot(), equation() (+19 more)

### Community 121 - "Rational"
Cohesion: 0.09
Nodes (27): exactSqrt(), unavailable(), expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactFunction (+19 more)

### Community 122 - "spell.test.ts"
Cohesion: 0.07
Nodes (28): @codemirror/lang-markdown, noIndentedCode, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close() (+20 more)

### Community 123 - "sidePanel.ts"
Cohesion: 0.14
Nodes (14): AI_SERVICES, aiSettingsOf(), SuggestionItem, isConfidentAnswer(), Settings, CATEGORIES, symbolsInCategory(), SymbolForm (+6 more)

### Community 125 - "sql.ts"
Cohesion: 0.17
Nodes (18): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+10 more)

### Community 126 - "page.ts"
Cohesion: 0.10
Nodes (21): katex, currentAccount(), SharedNote, body, draw(), isDark(), saveButton, saveCopy() (+13 more)

### Community 127 - "Glifo"
Cohesion: 0.15
Nodes (13): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Funzionalità (+5 more)

### Community 128 - "createFakeSupabase"
Cohesion: 0.60
Nodes (6): createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 129 - "smoke-test.mjs"
Cohesion: 0.29
Nodes (4): markdown-it, vite, firstVisit(), plainContext

### Community 131 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 132 - "I modelli e le chiavi API"
Cohesion: 0.50
Nodes (4): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), Le idee dello studente (5 ottobre 2026)

### Community 136 - "SheetModel"
Cohesion: 0.67
Nodes (3): SheetEditorOptions, Snapshot, SheetModel

## Knowledge Gaps
- **593 isolated node(s):** `session-start.sh script`, `name`, `private`, `version`, `description` (+588 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 825 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **25 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `touchlog.ts`, `parse.ts`, `main.ts`, `odesolve.ts`, `spec.ts`, `several.ts`, `num`, `graph/preview.ts`, `complex.ts`, `svg.ts`, `spreadsheet/editor.ts`, `SchemaEditor`, `conics.ts`, `SheetEditor`, `compile`, `numerical.ts`, `markdown.ts`, `Board`, `store.ts`, `MathError`, `assistant.ts`, `linsys.ts`, `toLatex`, `inference.ts`, `view3d.ts`, `spreadsheet/evaluate.ts`, `graphNote.test.ts`, `logic.ts`, `arithmetic.ts`, `namesIn`, `schemaBlocks.ts`, `sheet.ts`, `study.ts`, `functions.ts`, `board.ts`, `board/shapes.ts`, `FormattedResult`, `graph.ts`, `finite.ts`, `Pt`, `supabase.ts`, `ui/preview.ts`, `graph/file.ts`, `blockMove.ts`, `symbolic.ts`, `.solveAll`, `schema/editor.ts`, `formatNumber`, `account/space.ts`, `Parser`, `tutorial.ts`, `.constructor`, `Rational`?**
  _High betweenness centrality (0.184) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `touchlog.ts`, `main.ts`, `sync.ts`, `vite.config.ts`, `num`, `graph/preview.ts`, `editor/lists.ts`, `svg.ts`, `spreadsheet/editor.ts`, `compile`, `markdown.ts`, `distributions.ts`, `store.ts`, `MathError`, `assistant.ts`, `linsys.ts`, `view3d.ts`, `graphNote.test.ts`, `FoldersStore`, `schemaBlocks.ts`, `resize.ts`, `suggestions.ts`, `domain.ts`, `board.ts`, `board/shapes.ts`, `search.ts`, `h`, `supabase.ts`, `graph/file.ts`, `Sheet`, `Dove sono le cose`, `blockMove.ts`, `schema/editor.ts`, `editor.test.ts`, `account/space.ts`, `editor/editor.ts`, `tutorial.ts`, `.constructor`, `spell.test.ts`, `sql.ts`, `page.ts`?**
  _High betweenness centrality (0.116) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `main.ts`, `graph/preview.ts`, `spreadsheet/editor.ts`, `SchemaEditor`, `SheetEditor`, `Board`, `FoldersStore`, `schemaBlocks.ts`, `resize.ts`, `board.ts`, `ui/preview.ts`, `schema/editor.ts`, `tutorial.ts`, `files.ts`, `openShareDialog`, `.constructor`, `spell.test.ts`, `sidePanel.ts`, `page.ts`?**
  _High betweenness centrality (0.043) - this node is a cross-community bridge._
- **Are the 163 inferred relationships involving `Dove sono le cose` (e.g. with `adoptGuestNotes()` and `sharedLinks()`) actually correct?**
  _`Dove sono le cose` has 163 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `name`, `private` to the rest of the system?**
  _593 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `touchlog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08653061224489796 - nodes in this community are weakly interconnected._
- **Should `parse.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07689003436426117 - nodes in this community are weakly interconnected._