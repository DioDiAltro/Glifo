# Graph Report - matherdown  (2026-10-06)

## Corpus Check
- 250 files · ~483,943 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 4099 nodes · 14683 edges · 138 communities (111 shown, 27 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 436 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `fb9e9f1a`
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
- sheet.ts
- SchemaEditor
- Rational
- toNode
- compile
- numerical.ts
- mathSyntax.ts
- index.ts
- engine.ts
- Board
- domain.ts
- IdbBoards
- MathError
- toLatex
- assistant.ts
- h
- graph.ts
- Pt
- graph/space.ts
- distributions.ts
- calcResults.ts
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
- editor/editor.ts
- notes.ts
- .constructor
- account/space.ts
- limits.ts
- board/shapes.ts
- linsys.ts
- solve.ts
- search.ts
- statsGraph.ts
- graphInsert.ts
- finite.ts
- 20261004091555_note_condivise.sql
- toolbar.ts
- Field
- grafo-html.mjs
- schema/shapes.ts
- dependencies
- supabase.ts
- Le spiegazioni, come funzionano
- ui/preview.ts
- Più avanti
- parseSchema
- MathNode
- dialogs.ts
- Benvenuto in Glifo
- compilerOptions
- Dove sono le cose
- Piano per piano
- markdown.ts
- symbolic.ts
- AccountSync
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
- schemaTools.test.ts
- La lavagna
- .folderItem
- package.json
- Sheet
- I modelli e le chiavi API
- fake-supabase.mjs
- createFakeSupabase
- toast
- Glifo – note per Claude
- page.ts
- sidePanel.ts
- .constructor
- graph/file.ts
- formatNumber
- sync.test.ts
- spell.test.ts
- SidePanel
- .solveAll
- sql.ts
- SuggestionController
- Glifo
- render/lists.ts
- smoke-test.mjs
- formatLinear
- .showSpaces
- logo.ts
- linear.test.ts
- .record
- icons.mjs
- ExactRandom

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

## Communities (138 total, 27 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.09
Nodes (26): at(), browserStore, clip(), isSaved(), KINDS, LOG_KEY, LOG_MAX_LINES, LogStore (+18 more)

### Community 1 - "parse.ts"
Cohesion: 0.08
Nodes (40): hasWord(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe() (+32 more)

### Community 2 - "main.ts"
Cohesion: 0.05
Nodes (82): newStrokeId(), addToGraphBlock(), graphsFromFile(), unhide(), account, active, app, applySpellcheck() (+74 more)

### Community 3 - "odesolve.ts"
Cohesion: 0.09
Nodes (72): linearIn(), addWave(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames(), constantParticular() (+64 more)

### Community 4 - "sync.ts"
Cohesion: 0.08
Nodes (29): withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty(), iso() (+21 more)

### Community 5 - "spec.ts"
Cohesion: 0.07
Nodes (72): quadricEquation(), isComplexLine(), isComplexValue(), isSegmentNode(), areaOf(), AXES, blockLines(), ComplexDefinitions (+64 more)

### Community 6 - "several.ts"
Cohesion: 0.13
Nodes (39): criticalLine(), isSeveralLine(), named(), severalItems(), surface(), at(), bounded(), Candidate (+31 more)

### Community 7 - "num"
Cohesion: 0.13
Nodes (88): atIntegers(), withoutAbs(), exp(), hyperbolicToExp(), inverseRational(), sqrtEx(), termTransform(), polyEx() (+80 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (44): addLabel(), boxes, cameras, complexCoord(), containing(), coord(), drawings, drawnViews (+36 more)

### Community 9 - "vitest"
Cohesion: 0.09
Nodes (26): vitest, staticGraphSvg(), chooseWindow(), chooseBox(), formulaGraph(), GraphItem, parseGraph(), PALETTES (+18 more)

### Community 10 - "complex.ts"
Cohesion: 0.06
Nodes (70): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isInequality(), onlyComplex() (+62 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.10
Nodes (57): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+49 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (54): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), domainEdge(), features() (+46 more)

### Community 13 - "sheet.ts"
Cohesion: 0.09
Nodes (23): Ode, OdeFunction, BRACKETS, CHECK_VALUES, checks, close(), Definition, digitsMatch() (+15 more)

### Community 15 - "Rational"
Cohesion: 0.09
Nodes (44): at(), centralCanonical(), Coefficients, coneCanonical(), conicOf(), det2(), det3(), determinant() (+36 more)

### Community 16 - "toNode"
Cohesion: 0.08
Nodes (47): numShown(), EMPTY_SCOPE, absOf(), boundsOf(), close(), definite(), fourierProblem, fourierShown() (+39 more)

### Community 17 - "compile"
Cohesion: 0.07
Nodes (53): conicItems(), isConicLine(), areaFor(), constantValue(), argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS (+45 more)

### Community 18 - "numerical.ts"
Cohesion: 0.12
Nodes (47): bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial(), interpolating() (+39 more)

### Community 19 - "mathSyntax.ts"
Cohesion: 0.18
Nodes (17): @lezer/highlight, @lezer/markdown, lineDepth(), mathDelimTag, mathTag, parseBlockMath(), mathBlockRule(), analyzeBlockOpen() (+9 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (42): b, bigops, c, calculus, fn, fr, fractions, functions (+34 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "Board"
Cohesion: 0.12
Nodes (3): Board, Box, Stroke

### Community 23 - "domain.ts"
Cohesion: 0.08
Nodes (50): constantIntegrand(), depth(), inequalityMargin(), integralRegion, LayeredSolid, Multiple, multipleOf(), planeMargin() (+42 more)

### Community 24 - "IdbBoards"
Cohesion: 0.09
Nodes (13): fake-indexeddb, BoardBackend, done(), fromRecord(), IdbBoards, ofNote(), openBoardDatabase(), openDefault() (+5 more)

### Community 25 - "MathError"
Cohesion: 0.14
Nodes (50): MathError, UndefinedName, angleBetween(), asMatrix(), basisOf(), cross(), Ctx, dataOf() (+42 more)

### Community 26 - "toLatex"
Cohesion: 0.08
Nodes (47): fourierItems(), isFourierLine(), isNumericalLine(), numericalItems(), multipleLabel(), names(), STUDY_GRAPH, studyItems() (+39 more)

### Community 27 - "assistant.ts"
Cohesion: 0.10
Nodes (27): AiAnswer, AiError, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible(), askThroughHost(), checkShape() (+19 more)

### Community 28 - "h"
Cohesion: 0.09
Nodes (36): SyncStatus, fieldInput(), AccountButton, confirmAccountDeletion(), messageOf(), openAccountDialog(), openLoginDialog(), codeStep() (+28 more)

### Community 29 - "graph.ts"
Cohesion: 0.10
Nodes (31): AT_X, cellHtml(), cellText(), COMPASS, createEdgeCell(), createGraph(), drawSchema(), edgeLook() (+23 more)

### Community 30 - "Pt"
Cohesion: 0.13
Nodes (10): coalesced(), EraseAction, Finger, MoveAction, penErases(), pointsOf(), pressureOf(), Transform (+2 more)

### Community 31 - "graph/space.ts"
Cohesion: 0.09
Nodes (58): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+50 more)

### Community 32 - "distributions.ts"
Cohesion: 0.06
Nodes (67): addExp(), choose(), continuousQuantile(), discreteQuantile(), Distribution, exactIntervalProbability(), expSum, expSumValue() (+59 more)

### Community 33 - "calcResults.ts"
Cohesion: 0.12
Nodes (14): acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult, calcResults(), CheckWidget, formulasUntil() (+6 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "FoldersStore"
Cohesion: 0.15
Nodes (4): cleanFolderName(), FoldersStore, sameName(), names()

### Community 36 - "arithmetic.ts"
Cohesion: 0.08
Nodes (69): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+61 more)

### Community 37 - "namesIn"
Cohesion: 0.13
Nodes (37): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+29 more)

### Community 38 - "probability.ts"
Cohesion: 0.14
Nodes (24): End, ExactScope, fractionNear(), ALL, compileOf(), complement(), endAt(), EventContext (+16 more)

### Community 39 - "resize.ts"
Cohesion: 0.13
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "statsShown.ts"
Cohesion: 0.17
Nodes (31): check(), correlation(), count(), covariance(), Data, dataStatistic(), deviation(), fail() (+23 more)

### Community 41 - "view3d.ts"
Cohesion: 0.12
Nodes (28): Face, planeTolerance(), Plane, Vec3, arrowHead(), boxShape(), Coverage, DETAILS (+20 more)

### Community 42 - "NotesStore"
Cohesion: 0.16
Nodes (5): createdAtFromId(), deriveTitle(), NotesStore, readItem(), writeItem()

### Community 43 - "study.ts"
Cohesion: 0.15
Nodes (33): breaks(), Asymptote, boundaries(), cutsOf(), defined(), domainOf(), exact(), inDomain() (+25 more)

### Community 44 - "editor/editor.ts"
Cohesion: 0.09
Nodes (25): @codemirror/commands, @codemirror/language, @codemirror/state, @codemirror/view, highlight, italianPhrases, listMarkers, blockLine (+17 more)

### Community 45 - "notes.ts"
Cohesion: 0.15
Nodes (17): Deletion, DeletionLog, Folder, FOLDER_NAME_MAX, FolderGroup, groupByFolder(), loadClosedFolders(), RemoteFolder (+9 more)

### Community 46 - ".constructor"
Cohesion: 0.12
Nodes (5): BoardOptions, clampZoom(), loadPrefs(), validView(), highlightName()

### Community 47 - "account/space.ts"
Cohesion: 0.17
Nodes (19): accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf() (+11 more)

### Community 48 - "limits.ts"
Cohesion: 0.20
Nodes (17): close(), Definite, definiteIntegral(), exValue(), samples(), alternating(), close(), derivatives() (+9 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (37): DrawAction, adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners() (+29 more)

### Community 50 - "linsys.ts"
Cohesion: 0.14
Nodes (42): factorsOf(), choices(), gcd(), matrixEquation(), matrixSystem(), minorsGcd(), ONE, parametricRows() (+34 more)

### Community 51 - "solve.ts"
Cohesion: 0.16
Nodes (26): splitRoot(), surdText(), isStandardUnknown(), linearSystem(), RelOp, cubeRoot(), equation(), holds() (+18 more)

### Community 52 - "search.ts"
Cohesion: 0.17
Nodes (23): editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex() (+15 more)

### Community 53 - "statsGraph.ts"
Cohesion: 0.17
Nodes (18): FieldContext, isTestLine(), number(), testItems(), classes(), dataOf(), distributionExtent(), distributionLabel() (+10 more)

### Community 54 - "graphInsert.ts"
Cohesion: 0.25
Nodes (13): formulaAtCursor(), GraphLabelLines, insertGraphBlock(), setGraphLabels(), mathRegionAt(), formulaGraphLine(), graphBlockText(), graphNames() (+5 more)

### Community 55 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "toolbar.ts"
Cohesion: 0.14
Nodes (17): insertBlock(), InsertOptions, toggleLinePrefix(), wrapSelection(), LIST_STYLES, addPlaceholders, Placeholder, Action (+9 more)

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
Cohesion: 0.11
Nodes (36): @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken(), ensureSessionOf() (+28 more)

### Community 63 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 64 - "ui/preview.ts"
Cohesion: 0.09
Nodes (20): GraphLabels, remapGraphLines(), remapLineKeys(), renameGraphScope(), renameScopeKeys(), BlockKind, MoveDir, draw() (+12 more)

### Community 65 - "Più avanti"
Cohesion: 0.14
Nodes (14): Abbonamento e funzioni a pagamento (da capire), Account: i propri appunti su ogni dispositivo, anche da condividere, Aiuto con gli esercizi, Altre idee, Calcoli e grafici: idee in più, Idee per il futuro, In programma, La lavagna: idee in più (+6 more)

### Community 66 - "parseSchema"
Cohesion: 0.12
Nodes (25): graphsForFile(), hide(), markdownForFile(), findFencedBlocks(), findSchemaBlock(), findSchemaBlocks(), OpenFence, SchemaBlock (+17 more)

### Community 67 - "MathNode"
Cohesion: 0.18
Nodes (7): ExactComplexScope, ConicInfo, withWorkLimit(), FormattedResult, MathNode, Found, needsSymbols()

### Community 68 - "dialogs.ts"
Cohesion: 0.13
Nodes (19): ACCOUNT_SETTINGS, accountSettings(), AI_MODELS, DEFAULT_SETTINGS, loadSettings(), saveSettings(), Settings, SETTINGS_KEY (+11 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "Dove sono le cose"
Cohesion: 0.08
Nodes (44): Dove sono le cose, Glifo – architettura, LassoAction, shapeSvg(), centerOn(), copyStrokes(), cross(), handleScale() (+36 more)

### Community 72 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 73 - "markdown.ts"
Cohesion: 0.08
Nodes (51): texHtml(), blank(), blockPlace(), closed(), closeIdx(), contentHash(), fenceClosed(), fenceName() (+43 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (58): primitive(), verified(), atValues(), Converter, coordinates(), decimalText(), definiteParts(), definiteValue() (+50 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.04
Nodes (63): GraphLook, ALIGN, ARROW_NAMES, AT_ICONS, AT_NAMES, BASE_PRESETS, BIG_ARROWS, DB_PRESETS (+55 more)

### Community 79 - "board.ts"
Cohesion: 0.07
Nodes (44): Action, ACTION_NAMES, DOT_SIZES, EraserMode, HANDLE_REACH, ICON, MODE_NAMES, PanAction (+36 more)

### Community 82 - "editor.test.ts"
Cohesion: 0.08
Nodes (27): @lezer/common, tabOutOfMath(), templateInsertion(), CODE_NODES, CommandToken, commandTokenAt(), isInCode(), MATH_NODES (+19 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.20
Nodes (6): centerOf(), clickOn(), ffmpeg, SCENES, SIZE, work

### Community 90 - "Abbonamenti"
Cohesion: 0.14
Nodes (14): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+6 more)

### Community 91 - "BoardStore"
Cohesion: 0.13
Nodes (6): BoardStore, MemoryBoards, applyAccountChange(), completeSignIn(), reloadPage(), signOutAccount()

### Community 92 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, Quando lo studente dice di cominciare

### Community 96 - "account-test.mjs"
Cohesion: 0.20
Nodes (4): device(), login(), newContext, waitFor()

### Community 97 - "Il database degli account (Supabase)"
Cohesion: 0.17
Nodes (11): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Nell'app, Note condivise con un link (+3 more)

### Community 100 - "schemaTools.test.ts"
Cohesion: 0.14
Nodes (20): alignBoxes(), Alignment, Box, distributeBoxes(), Position, base64(), crc32(), svgSize() (+12 more)

### Community 101 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 103 - "package.json"
Cohesion: 0.05
Nodes (39): description, devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript (+31 more)

### Community 104 - "Sheet"
Cohesion: 0.11
Nodes (24): Sheet, text(), tex(), text(), check(), result(), text(), result() (+16 more)

### Community 105 - "I modelli e le chiavi API"
Cohesion: 0.50
Nodes (4): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), Le idee dello studente (5 ottobre 2026)

### Community 106 - "fake-supabase.mjs"
Cohesion: 0.29
Nodes (5): b64(), CODE, GOOGLE_CODE, ROOT, SUPABASE_URL

### Community 107 - "createFakeSupabase"
Cohesion: 0.60
Nodes (6): createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 108 - "toast"
Cohesion: 0.13
Nodes (24): inClaudeViewer(), board, loadDialect(), copy(), canWriteFilesDirectly(), downloadBlob(), downloadText(), fileNameFor() (+16 more)

### Community 109 - "Glifo – note per Claude"
Cohesion: 0.22
Nodes (9): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole (+1 more)

### Community 110 - "page.ts"
Cohesion: 0.07
Nodes (44): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), PullResult, openShareDialog(), changeAccess(), changeCopy() (+36 more)

### Community 111 - "sidePanel.ts"
Cohesion: 0.20
Nodes (15): AiResult, preferredIndex(), SuggestionItem, CATEGORIES, commandNames(), cardPreviewTex(), formPreviewTex(), ParsedTemplate (+7 more)

### Community 113 - ".constructor"
Cohesion: 0.15
Nodes (6): closeMathBlockOnEnter(), EditorCallbacks, MarkdownEditor, insertTemplate(), SidePanelDeps, setup()

### Community 116 - "graph/file.ts"
Cohesion: 0.11
Nodes (34): FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), graphImagesFor(), OPEN, swatchSvg(), titleBand() (+26 more)

### Community 117 - "formatNumber"
Cohesion: 0.11
Nodes (30): decimalSeparator(), Digits, formatNumber(), FormatOptions, formatRational(), fromNumber(), fromRational(), SUPERSCRIPT (+22 more)

### Community 121 - "sync.test.ts"
Cohesion: 0.19
Nodes (9): @electric-sql/pglite, LocalChange, callAs(), createDatabase(), createUser(), databaseTests(), migrations, shareTests() (+1 more)

### Community 122 - "spell.test.ts"
Cohesion: 0.07
Nodes (29): @codemirror/lang-markdown, noIndentedCode, mathMarkdown, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck() (+21 more)

### Community 123 - "SidePanel"
Cohesion: 0.24
Nodes (4): isConfidentAnswer(), displayCode(), preventFocusSteal(), SidePanel

### Community 124 - ".solveAll"
Cohesion: 0.16
Nodes (8): bracketParts(), chainOf(), definitionTarget(), parseCached(), splitPieces(), withoutDots(), mapNode(), scopeWithSets()

### Community 125 - "sql.ts"
Cohesion: 0.17
Nodes (18): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+10 more)

### Community 126 - "SuggestionController"
Cohesion: 0.26
Nodes (3): EditorMathContext, expand(), SuggestionController

### Community 127 - "Glifo"
Cohesion: 0.15
Nodes (13): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Funzionalità (+5 more)

### Community 128 - "render/lists.ts"
Cohesion: 0.38
Nodes (10): bulletGroup(), sameList(), alignInside(), asciiTrim(), findMarker(), isOrdered(), listAttrs(), listRule() (+2 more)

### Community 129 - "smoke-test.mjs"
Cohesion: 0.29
Nodes (4): markdown-it, vite, firstVisit(), plainContext

### Community 131 - "formatLinear"
Cohesion: 0.36
Nodes (10): circleText(), entry(), formatLinear(), lineCoefficients(), lineText(), matrixTex(), plainArea(), planeText() (+2 more)

### Community 133 - "logo.ts"
Cohesion: 0.33
Nodes (6): sidebarToggle(), BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark()

### Community 134 - "linear.test.ts"
Cohesion: 0.29
Nodes (7): EXACT, FLOAT, A, B, q(), result(), text()

## Knowledge Gaps
- **577 isolated node(s):** `Comandi`, `Promemoria per lo studente`, `Regole`, `Moves`, `Writing` (+572 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 798 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **27 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `touchlog.ts`, `parse.ts`, `main.ts`, `odesolve.ts`, `spec.ts`, `logo.ts`, `num`, `graph/preview.ts`, `several.ts`, `complex.ts`, `svg.ts`, `Rational`, `toNode`, `compile`, `numerical.ts`, `Board`, `IdbBoards`, `MathError`, `toLatex`, `assistant.ts`, `h`, `graph.ts`, `Pt`, `graph/space.ts`, `distributions.ts`, `logic.ts`, `arithmetic.ts`, `namesIn`, `study.ts`, `editor/editor.ts`, `account/space.ts`, `limits.ts`, `board/shapes.ts`, `linsys.ts`, `graphInsert.ts`, `finite.ts`, `supabase.ts`, `ui/preview.ts`, `MathNode`, `dialogs.ts`, `markdown.ts`, `symbolic.ts`, `schema/editor.ts`, `board.ts`, `BoardStore`, `schemaTools.test.ts`, `.constructor`, `graph/file.ts`, `.solveAll`?**
  _High betweenness centrality (0.124) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `touchlog.ts`, `main.ts`, `logo.ts`, `linear.test.ts`, `num`, `editor/lists.ts`, `svg.ts`, `Rational`, `compile`, `IdbBoards`, `assistant.ts`, `h`, `graph/space.ts`, `resize.ts`, `editor/editor.ts`, `notes.ts`, `account/space.ts`, `board/shapes.ts`, `linsys.ts`, `search.ts`, `toolbar.ts`, `supabase.ts`, `ui/preview.ts`, `parseSchema`, `dialogs.ts`, `Dove sono le cose`, `markdown.ts`, `board.ts`, `editor.test.ts`, `schemaTools.test.ts`, `package.json`, `Sheet`, `page.ts`, `sidePanel.ts`, `.constructor`, `graph/file.ts`, `sync.test.ts`, `spell.test.ts`, `sql.ts`?**
  _High betweenness centrality (0.112) - this node is a cross-community bridge._
- **Why does `Board` connect `Board` to `main.ts`, `Dove sono le cose`, `.constructor`, `board.ts`, `Pt`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **Are the 143 inferred relationships involving `Dove sono le cose` (e.g. with `adoptGuestNotes()` and `sharedLinks()`) actually correct?**
  _`Dove sono le cose` has 143 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Comandi`, `Promemoria per lo studente`, `Regole` to the rest of the system?**
  _577 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `touchlog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08653061224489796 - nodes in this community are weakly interconnected._
- **Should `parse.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07553124342520513 - nodes in this community are weakly interconnected._