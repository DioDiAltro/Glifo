# Graph Report - matherdown  (2026-10-08)

## Corpus Check
- 311 files · ~598,922 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5001 nodes · 18066 edges · 147 communities (111 shown, 36 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 571 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `bd642680`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- touchlog.ts
- parse.ts
- main.ts
- compile
- sync.ts
- spec.ts
- sheet.ts
- num
- graph/preview.ts
- Dove sono le cose
- parseGraph
- editor/lists.ts
- svg.ts
- view3d.ts
- SchemaEditor
- Board
- SheetEditor
- editor/editor.ts
- numerical.ts
- arithmetic.ts
- index.ts
- engine.ts
- explainSubjects.ts
- topics.ts
- BoardStore
- MathError
- assistant.ts
- dialogs.ts
- FoldersStore
- toLatex
- gantt.ts
- markdown.ts
- search.ts
- spell.test.ts
- logic.ts
- NotesStore
- complex.ts
- namesIn
- graph/space.ts
- resize.ts
- statsShown.ts
- planPreview.ts
- spaces.ts
- study.ts
- functions.ts
- finite.ts
- formatNumber
- latex.ts
- distributions.ts
- board/shapes.ts
- schema/blocks.ts
- sidePanel.ts
- Pt
- vitest
- graph.ts
- ui/preview.ts
- 20261004091555_note_condivise.sql
- board.ts
- laplace.ts
- odesolve.ts
- formula.ts
- dependencies
- page.ts
- h
- Glifo – note per Claude
- Piano per piano
- spreadsheet.test.ts
- probability.ts
- smoke-test.mjs
- Benvenuto in Glifo
- compilerOptions
- solve.ts
- Field
- MarkdownEditor
- symbolic.ts
- Costi
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- parseSchema
- session-start.sh
- .claude/CLAUDE.md
- blockMove.ts
- tutorial.mjs
- Abbonamenti
- spiegami-qwen.mjs
- supabase-stub.sql
- account-test.mjs
- Il database degli account (Supabase)
- strokes.ts
- Glifo
- icons.mjs
- supabase.ts
- files.ts
- limits.ts
- La lavagna
- I modelli e le chiavi API
- localModels.ts
- xlsx.ts
- explainPanel.ts
- mathSyntax.ts
- spreadsheet/editor.ts
- Più avanti
- ExplainPanel
- Rational
- siteUpdate.ts
- scripts
- Le spiegazioni, come funzionano
- Sheet
- sql.ts
- createFakeSupabase
- labels.ts
- .constructor
- linsys.ts
- Parser
- 20261008130026_commenti.sql
- ExplainChat
- devDependencies

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 267 edges
2. `MathError` - 151 edges
3. `num()` - 145 edges
4. `Sheet` - 139 edges
5. `MathNode` - 129 edges
6. `mul()` - 124 edges
7. `Board` - 118 edges
8. `compile()` - 113 edges
9. `h()` - 113 edges
10. `Rational` - 111 edges

## Surprising Connections (you probably didn't know these)
- `Dove sono le cose` --references--> `fakeLlmWorker()`  [INFERRED]
  ARCHITETTURA.md → scripts/smoke-test.mjs
- `Come viene pubblicata` --references--> `dist()`  [INFERRED]
  README.md → src/board/shapes.ts
- `Funzionalità` --references--> `k()`  [INFERRED]
  README.md → src/math/numerical.ts
- `Dove sono le cose` --references--> `texts()`  [INFERRED]
  ARCHITETTURA.md → tests/boardTouchLog.test.ts
- `Dove sono le cose` --references--> `adoptGuestNotes()`  [INFERRED]
  ARCHITETTURA.md → src/account/space.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (147 total, 36 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.09
Nodes (27): at(), browserStore, clip(), isSaved(), KINDS, LOG_KEY, LOG_MAX_LINES, LogStore (+19 more)

### Community 1 - "parse.ts"
Cohesion: 0.07
Nodes (41): hasWord(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe() (+33 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (109): insertGraphBlock(), graphsFromFile(), unhide(), graphBlockText(), account, ACCOUNT_OFF, active, aiShown() (+101 more)

### Community 3 - "compile"
Cohesion: 0.05
Nodes (90): integralRegion, areaFor(), constantValue(), argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension() (+82 more)

### Community 4 - "sync.ts"
Cohesion: 0.05
Nodes (39): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+31 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (101): conicItems(), isConicLine(), quadricEquation(), fourierItems(), isFourierLine(), onlyComplex(), isTestLine(), constantIntegrand() (+93 more)

### Community 6 - "sheet.ts"
Cohesion: 0.06
Nodes (30): GraphItem, OdeFunction, chiSquareTest(), InferenceContext, characteristicPolynomial(), Eigenvalue, LinearValue, NUMERICAL (+22 more)

### Community 7 - "num"
Cohesion: 0.09
Nodes (124): absOf(), atIntegers(), boundsOf(), close(), definite(), fourierProblem, fourierShown(), isTrig() (+116 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (44): FIGURE_PALETTE, addLabel(), boxes, cameras, complexCoord(), containing(), coord(), drawings (+36 more)

### Community 9 - "Dove sono le cose"
Cohesion: 0.06
Nodes (71): Dove sono le cose, Glifo – architettura, allNames(), answerFollowUp(), bareResult(), CHAT_SUBJECT, chatContext, ChatFn (+63 more)

### Community 10 - "parseGraph"
Cohesion: 0.07
Nodes (37): staticGraphSvg(), chooseWindow(), specFor(), Box, chooseBox(), parseGraph(), DrawOptions, graphSvg() (+29 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.07
Nodes (72): toggleLinePrefix(), applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf() (+64 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (55): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), dataWindow(), domainEdge() (+47 more)

### Community 13 - "view3d.ts"
Cohesion: 0.09
Nodes (39): Detail, Face, FAST, FINE, planeTolerance(), regionFaces(), surfacePlane(), Plane (+31 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.09
Nodes (13): fieldInput(), isLanes(), SchemaEditor, withLaneContents(), cellText(), edgeLook(), nodeLook(), nodeStyle() (+5 more)

### Community 15 - "Board"
Cohesion: 0.10
Nodes (6): Board, penErases(), BoardTheme, BoardChange, Box, Stroke

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (5): SheetEditor, serializeSheet(), sheetSize(), clearRange(), cloneSheet()

### Community 17 - "editor/editor.ts"
Cohesion: 0.04
Nodes (78): description, name, private, type, version, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown (+70 more)

### Community 18 - "numerical.ts"
Cohesion: 0.12
Nodes (46): bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial(), interpolating() (+38 more)

### Community 19 - "arithmetic.ts"
Cohesion: 0.10
Nodes (46): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+38 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (41): b, bigops, c, calculus, fn, fr, fractions, functions (+33 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "explainSubjects.ts"
Cohesion: 0.15
Nodes (17): explainTarget, hasCalculation(), targetAt(), NoteSubject, SubjectKind, subjectsIn(), THEOREM_START, THEOREM_WORDS (+9 more)

### Community 23 - "topics.ts"
Cohesion: 0.11
Nodes (33): ATTRIBUTES, count(), cut(), definedName(), ER_SHAPES, fieldText(), fitLines(), flowOrder() (+25 more)

### Community 24 - "BoardStore"
Cohesion: 0.07
Nodes (9): BoardBackend, BoardStore, done(), IdbBoards, MemoryBoards, ofNote(), request(), toRecord() (+1 more)

### Community 25 - "MathError"
Cohesion: 0.10
Nodes (67): MathError, UndefinedName, angleBetween(), asMatrix(), basisOf(), circleText(), complexText(), cross() (+59 more)

### Community 26 - "assistant.ts"
Cohesion: 0.09
Nodes (29): @anthropic-ai/sdk, AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible() (+21 more)

### Community 27 - "dialogs.ts"
Cohesion: 0.11
Nodes (20): EXPLAIN_TONES, ExplainTone, DEFAULT_LOCAL_MODEL, ACCOUNT_SETTINGS, accountSettings(), AI_MODELS, DEFAULT_SETTINGS, SETTINGS_KEY (+12 more)

### Community 28 - "FoldersStore"
Cohesion: 0.09
Nodes (16): cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder(), loadClosedFolders(), RemoteFolder (+8 more)

### Community 29 - "toLatex"
Cohesion: 0.09
Nodes (63): criticalLine(), isSeveralLine(), named(), severalItems(), surface(), numShown(), EMPTY_SCOPE, shown() (+55 more)

### Community 30 - "gantt.ts"
Cohesion: 0.07
Nodes (65): amount(), barColor(), crossings(), dateText(), dayOf(), fitText(), GanttOptions, ganttSvg() (+57 more)

### Community 31 - "markdown.ts"
Cohesion: 0.08
Nodes (37): dompurify, highlight.js, markdown-it-footnote, acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult (+29 more)

### Community 32 - "search.ts"
Cohesion: 0.15
Nodes (25): preferredIndex(), editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase() (+17 more)

### Community 33 - "spell.test.ts"
Cohesion: 0.09
Nodes (22): misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt(), openAt() (+14 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "NotesStore"
Cohesion: 0.07
Nodes (34): accountSpace(), adoptGuestNotes(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf(), setCurrentAccount() (+26 more)

### Community 36 - "complex.ts"
Cohesion: 0.06
Nodes (62): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexLine(), isComplexValue() (+54 more)

### Community 37 - "namesIn"
Cohesion: 0.11
Nodes (42): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+34 more)

### Community 38 - "graph/space.ts"
Cohesion: 0.12
Nodes (45): LayeredSolid, addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon() (+37 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "statsShown.ts"
Cohesion: 0.15
Nodes (35): formatRational(), Lin, check(), correlation(), count(), covariance(), Data, DATA_FUNCTIONS (+27 more)

### Community 41 - "planPreview.ts"
Cohesion: 0.13
Nodes (15): planSwatchSvg(), labelHtml(), readPlan(), ganttWidth(), PlanView, GraphLook, loadDialect(), crc32() (+7 more)

### Community 42 - "spaces.ts"
Cohesion: 0.16
Nodes (18): FormatOptions, Mat, cartesianEquations(), Cell, coordinateNames(), diagonalize(), dot(), gramSchmidt() (+10 more)

### Community 43 - "study.ts"
Cohesion: 0.12
Nodes (37): Piece, limit(), Condition, Family, Group, Root, Shape, Constraint (+29 more)

### Community 44 - "functions.ts"
Cohesion: 0.09
Nodes (58): EMPTY, number(), addFormat(), divFormat(), mulFormat(), tidy(), withCents(), FormulaNode (+50 more)

### Community 45 - "finite.ts"
Cohesion: 0.20
Nodes (25): countOf(), elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError, FiniteResult (+17 more)

### Community 46 - "formatNumber"
Cohesion: 0.11
Nodes (33): figureName(), graphFigure(), graphImage(), graphImagesFor(), OPEN, swatchSvg(), titleBand(), number() (+25 more)

### Community 47 - "latex.ts"
Cohesion: 0.08
Nodes (39): isNumericalLine(), numericalItems(), names(), STUDY_GRAPH, studyItems(), ACCENT_COMMANDS, COMPLEX_FUNCTIONS, diffLatex() (+31 more)

### Community 48 - "distributions.ts"
Cohesion: 0.07
Nodes (62): addExp(), choose(), continuousQuantile(), discreteQuantile(), Distribution, exactIntervalProbability(), expSum, expSumValue() (+54 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (37): DrawAction, adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners() (+29 more)

### Community 50 - "schema/blocks.ts"
Cohesion: 0.16
Nodes (19): graphsForFile(), hide(), markdownForFile(), placeChart(), saveSchemaBlock(), tableChartKind(), findFencedBlocks(), findSchemaBlock() (+11 more)

### Community 51 - "sidePanel.ts"
Cohesion: 0.11
Nodes (19): formulaAtCursor(), SuggestionItem, isConfidentAnswer(), CATEGORIES, symbolsInCategory(), cardPreviewTex(), formPreviewTex(), ParsedTemplate (+11 more)

### Community 52 - "Pt"
Cohesion: 0.12
Nodes (13): clampZoom(), coalesced(), EraseAction, Finger, LassoAction, PanAction, PinchAction, pointsOf() (+5 more)

### Community 53 - "vitest"
Cohesion: 0.06
Nodes (41): vite-plugin-pwa, vitest, accountOffMessage(), Site, commentDate(), commentItem(), COMMENTS_MAX, CommentsDeps (+33 more)

### Community 54 - "graph.ts"
Cohesion: 0.05
Nodes (48): @maxgraph/core, AT_X, cellHtml(), COMPASS, createEdgeCell(), createGraph(), drawSchema(), edgeStyle() (+40 more)

### Community 55 - "ui/preview.ts"
Cohesion: 0.07
Nodes (33): GraphLabels, renameGraphScope(), renameScopeKeys(), BlockKind, MoveDir, configurePurify(), renderMarkdown(), Theme (+25 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "board.ts"
Cohesion: 0.07
Nodes (46): Action, ACTION_NAMES, DOT_SIZES, EraserMode, HANDLE_REACH, ICON, MODE_NAMES, MoveAction (+38 more)

### Community 58 - "laplace.ts"
Cohesion: 0.20
Nodes (21): beyondPoles(), compiled(), E, fractionShown(), HALF, inverseLaplaceShown(), laplaceEx(), laplaceShown() (+13 more)

### Community 59 - "odesolve.ts"
Cohesion: 0.09
Nodes (65): linearIn(), addWave(), arrange(), cauchy(), compiled(), constantNames(), equalities(), factorial() (+57 more)

### Community 60 - "formula.ts"
Cohesion: 0.15
Nodes (18): BinOp, COMPARE, ERRORS_BY_LENGTH, formulaRefs(), isFormula(), normalizeFormula(), OPERATORS, refText() (+10 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "page.ts"
Cohesion: 0.06
Nodes (46): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), currentAccount(), PullResult, openShareDialog(), changeAccess() (+38 more)

### Community 63 - "h"
Cohesion: 0.08
Nodes (39): SyncStatus, AccountButton, confirmAccountDeletion(), messageOf(), openAccountDialog(), openLoginDialog(), codeStep(), emailStep() (+31 more)

### Community 64 - "Glifo – note per Claude"
Cohesion: 0.25
Nodes (8): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Regole, sqlite()

### Community 65 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 66 - "spreadsheet.test.ts"
Cohesion: 0.09
Nodes (48): KINDS, sheetSummary(), WidgetBlock, SchemaBlock, openSheetEditor(), decimalsOf(), fixedNumber(), formatCode() (+40 more)

### Community 67 - "probability.ts"
Cohesion: 0.12
Nodes (24): End, Family, CompileOptions, ExactScope, rejection(), ALL, complement(), endAt() (+16 more)

### Community 68 - "smoke-test.mjs"
Cohesion: 0.29
Nodes (4): markdown-it, fakeLlmWorker(), firstVisit(), plainContext

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "solve.ts"
Cohesion: 0.12
Nodes (32): formatPolynomial(), polynomialIn(), splitRoot(), surdText(), isStandardUnknown(), linearSystem(), parametricRows(), substitute() (+24 more)

### Community 72 - "Field"
Cohesion: 0.13
Nodes (4): eigenvalues(), Field, interpolate(), interpolateFloat()

### Community 73 - "MarkdownEditor"
Cohesion: 0.07
Nodes (22): EditorCallbacks, MarkdownEditor, tabOutOfMath(), insertBlock(), insertTemplate(), wrapSelection(), EditorMathContext, expand() (+14 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (61): primitive(), verified(), linearCells(), pairUp(), assumePositive(), atValues(), Converter, coordinates() (+53 more)

### Community 75 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, Quando lo studente dice di cominciare

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.04
Nodes (68): laneOf(), alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ARROW_NAMES (+60 more)

### Community 79 - "parseSchema"
Cohesion: 0.12
Nodes (20): schemaSummary(), svg(), SchemaEditorOptions, base64(), hide(), OPEN, schemasForFile(), schemasFromFile() (+12 more)

### Community 82 - "blockMove.ts"
Cohesion: 0.07
Nodes (43): blockMoved, blockMoves(), blockMoveTransaction(), LineMap, BlockWidget, findWidgetBlocks(), guardBlocks(), schemaBlocks() (+35 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.12
Nodes (10): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+2 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.14
Nodes (14): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+6 more)

### Community 91 - "spiegami-qwen.mjs"
Cohesion: 0.29
Nodes (4): vite, minutes, postMessage(), started

### Community 96 - "account-test.mjs"
Cohesion: 0.12
Nodes (10): @electric-sql/pglite, device(), login(), newContext, waitFor(), b64(), CODE, GOOGLE_CODE (+2 more)

### Community 97 - "Il database degli account (Supabase)"
Cohesion: 0.17
Nodes (11): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Nell'app, Note condivise con un link (+3 more)

### Community 98 - "strokes.ts"
Cohesion: 0.08
Nodes (39): Prefs, BOARD_PALETTES, BoardPalette, highlightName(), inkName(), mid(), outlineSvg(), PEN_SIZE (+31 more)

### Community 100 - "Glifo"
Cohesion: 0.13
Nodes (15): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Commenti, Compatibilità con VS Code, Condividere una nota con un link (+7 more)

### Community 102 - "supabase.ts"
Cohesion: 0.10
Nodes (36): @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken(), ensureSessionOf() (+28 more)

### Community 103 - "files.ts"
Cohesion: 0.24
Nodes (13): inClaudeViewer(), canWriteFilesDirectly(), FsWindow, isAbort(), MD_TYPES, OPEN_TYPES, OpenedFile, openMarkdownFiles() (+5 more)

### Community 104 - "limits.ts"
Cohesion: 0.19
Nodes (18): fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), alternating(), close() (+10 more)

### Community 105 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 106 - "I modelli e le chiavi API"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), In prova sul ramo `prova` (7 ottobre 2026): Qwen3 nel browser per «Spiegami», Le idee dello studente (5 ottobre 2026)

### Community 107 - "localModels.ts"
Cohesion: 0.09
Nodes (29): @mlc-ai/web-llm, chat(), GlifoError, Gpu, load(), post(), remove(), scope (+21 more)

### Community 108 - "xlsx.ts"
Cohesion: 0.08
Nodes (47): RFC-4180, fflate, csvDelimiter(), csvToSheet(), field(), italian(), parseCsv(), sheetToCsv() (+39 more)

### Community 110 - "explainPanel.ts"
Cohesion: 0.13
Nodes (20): Explanation, FollowUp, REPLY_TOKENS, LocalAbort, Settings, AI_NEWS_TITLE, AI_WORKING_TITLE, aiActivity (+12 more)

### Community 113 - "mathSyntax.ts"
Cohesion: 0.19
Nodes (16): @lezer/markdown, lineDepth(), mathDelimTag, mathTag, parseBlockMath(), mathBlockRule(), analyzeBlockOpen(), BlockOpen (+8 more)

### Community 116 - "spreadsheet/editor.ts"
Cohesion: 0.06
Nodes (61): at(), breakEven(), dataLine(), dataRange(), Point, quantity(), tableItems(), textLabel() (+53 more)

### Community 117 - "Più avanti"
Cohesion: 0.20
Nodes (9): Promemoria per lo studente, Account: i propri appunti su ogni dispositivo, anche da condividere, Commenti di chi prova Glifo, Idee per il futuro, In programma, La lavagna: idee in più, Più avanti, Schemi: idee in più (+1 more)

### Community 118 - "ExplainPanel"
Cohesion: 0.21
Nodes (3): ExplainPanel, preventFocusSteal(), setup()

### Community 119 - "Rational"
Cohesion: 0.09
Nodes (44): Part, at(), centralCanonical(), Coefficients, coneCanonical(), conicOf(), det2(), det3() (+36 more)

### Community 120 - "siteUpdate.ts"
Cohesion: 0.17
Nodes (15): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, PartNotLoaded (+7 more)

### Community 121 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 124 - "Sheet"
Cohesion: 0.07
Nodes (29): ExactComplexScope, ConicInfo, Ode, withWorkLimit(), ExactRandom, Elem, FiniteContext, FormattedResult (+21 more)

### Community 125 - "sql.ts"
Cohesion: 0.17
Nodes (18): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+10 more)

### Community 128 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 129 - "labels.ts"
Cohesion: 0.15
Nodes (20): ACCENTS, BLACKBOARD, CALLIGRAPHIC, closing(), convert(), escapeXml(), FUNCTIONS, GREEK (+12 more)

### Community 132 - "linsys.ts"
Cohesion: 0.14
Nodes (40): choices(), gcd(), matrixEquation(), matrixSystem(), minorsGcd(), ONE, parametricSystem(), PARAMS (+32 more)

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 158 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

## Knowledge Gaps
- **674 isolated node(s):** `session-start.sh script`, `name`, `private`, `version`, `description` (+669 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 948 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **36 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `touchlog.ts`, `parse.ts`, `main.ts`, `compile`, `linsys.ts`, `spec.ts`, `sheet.ts`, `num`, `graph/preview.ts`, `parseGraph`, `svg.ts`, `SchemaEditor`, `Board`, `SheetEditor`, `editor/editor.ts`, `numerical.ts`, `arithmetic.ts`, `ExplainChat`, `explainSubjects.ts`, `topics.ts`, `BoardStore`, `MathError`, `assistant.ts`, `dialogs.ts`, `toLatex`, `gantt.ts`, `markdown.ts`, `logic.ts`, `NotesStore`, `complex.ts`, `namesIn`, `graph/space.ts`, `statsShown.ts`, `planPreview.ts`, `functions.ts`, `finite.ts`, `formatNumber`, `latex.ts`, `distributions.ts`, `board/shapes.ts`, `schema/blocks.ts`, `sidePanel.ts`, `Pt`, `vitest`, `graph.ts`, `ui/preview.ts`, `board.ts`, `odesolve.ts`, `formula.ts`, `h`, `spreadsheet.test.ts`, `smoke-test.mjs`, `MarkdownEditor`, `symbolic.ts`, `schema/editor.ts`, `blockMove.ts`, `strokes.ts`, `supabase.ts`, `files.ts`, `limits.ts`, `localModels.ts`, `xlsx.ts`, `explainPanel.ts`, `spreadsheet/editor.ts`, `ExplainPanel`, `Rational`, `siteUpdate.ts`, `Sheet`?**
  _High betweenness centrality (0.177) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `touchlog.ts`, `parse.ts`, `main.ts`, `compile`, `sync.ts`, `linsys.ts`, `sheet.ts`, `num`, `Dove sono le cose`, `parseGraph`, `editor/lists.ts`, `svg.ts`, `editor/editor.ts`, `topics.ts`, `MathError`, `assistant.ts`, `dialogs.ts`, `FoldersStore`, `toLatex`, `gantt.ts`, `search.ts`, `spell.test.ts`, `NotesStore`, `resize.ts`, `distributions.ts`, `board/shapes.ts`, `schema/blocks.ts`, `sidePanel.ts`, `ui/preview.ts`, `board.ts`, `page.ts`, `h`, `spreadsheet.test.ts`, `MarkdownEditor`, `schema/editor.ts`, `parseSchema`, `blockMove.ts`, `strokes.ts`, `supabase.ts`, `localModels.ts`, `xlsx.ts`, `explainPanel.ts`, `spreadsheet/editor.ts`, `siteUpdate.ts`, `Sheet`, `sql.ts`?**
  _High betweenness centrality (0.109) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `main.ts`, `.constructor`, `graph/preview.ts`, `SchemaEditor`, `Board`, `SheetEditor`, `ExplainChat`, `explainSubjects.ts`, `dialogs.ts`, `FoldersStore`, `markdown.ts`, `spell.test.ts`, `resize.ts`, `planPreview.ts`, `sidePanel.ts`, `vitest`, `ui/preview.ts`, `board.ts`, `page.ts`, `MarkdownEditor`, `schema/editor.ts`, `explainPanel.ts`, `spreadsheet/editor.ts`, `ExplainPanel`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **Are the 266 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `adoptGuestNotes()`) actually correct?**
  _`Dove sono le cose` has 266 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `name`, `private` to the rest of the system?**
  _674 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `touchlog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08653061224489796 - nodes in this community are weakly interconnected._
- **Should `parse.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07318078746650175 - nodes in this community are weakly interconnected._