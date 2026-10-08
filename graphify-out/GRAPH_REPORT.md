# Graph Report - matherdown  (2026-10-08)

## Corpus Check
- 310 files · ~598,529 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 4995 nodes · 18053 edges · 147 communities (117 shown, 30 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 579 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `1e6a9b13`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- touchlog.ts
- parse.ts
- main.ts
- compile
- sync.ts
- spec.ts
- laplace.ts
- num
- graph/preview.ts
- Dove sono le cose
- parseGraph
- editor/lists.ts
- svg.ts
- mathContext.ts
- SchemaEditor
- Board
- SheetEditor
- editor.test.ts
- numerical.ts
- arithmetic.ts
- index.ts
- engine.ts
- explainPanel.ts
- topics.ts
- store.ts
- MathError
- assistant.ts
- dialogs.ts
- h
- toLatex
- gantt.ts
- sheet.ts
- search.ts
- editor/editor.ts
- logic.ts
- NotesStore
- complex.ts
- namesIn
- view3d.ts
- resize.ts
- statsShown.ts
- Stroke
- spaces.ts
- study.ts
- functions.ts
- finite.ts
- statsGraph.ts
- latex.ts
- distributions.ts
- board/shapes.ts
- BoardStore
- renderTex
- MarkdownEditor
- vitest
- graph.ts
- ui/preview.ts
- 20261004091555_note_condivise.sql
- selection.ts
- explainSubjects.ts
- odesolve.ts
- schema/shapes.ts
- dependencies
- icons.mjs
- spreadsheet/format.ts
- storage.test.ts
- Piano per piano
- spreadsheet.test.ts
- probability.ts
- smoke-test.mjs
- Benvenuto in Glifo
- compilerOptions
- solve.ts
- Field
- toolbar.ts
- symbolic.ts
- schemaGuard.test.ts
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
- board.ts
- Glifo
- spellcheck.ts
- supabase.ts
- planPreview.ts
- formatNumber
- database.ts
- host.ts
- localModels.ts
- xlsx.ts
- aiPanel.test.ts
- markdown.ts
- spreadsheet/editor.ts
- Più avanti
- ExplainPanel
- Rational
- toast
- scripts
- Le spiegazioni, come funzionano
- Costi
- Sheet
- sql.ts
- La lavagna
- I modelli e le chiavi API
- createFakeSupabase
- graph/file.ts
- BoardOptions
- linsys.ts
- Parser
- 20261008130026_commenti.sql
- Glifo – note per Claude
- escapeHtml
- sidePanel.ts
- page.ts
- devDependencies

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 275 edges
2. `MathError` - 151 edges
3. `num()` - 145 edges
4. `Sheet` - 139 edges
5. `MathNode` - 129 edges
6. `mul()` - 124 edges
7. `Board` - 118 edges
8. `h()` - 113 edges
9. `compile()` - 113 edges
10. `Rational` - 111 edges

## Surprising Connections (you probably didn't know these)
- `Dove sono le cose` --references--> `fakeLlmWorker()`  [INFERRED]
  ARCHITETTURA.md → scripts/smoke-test.mjs
- `Dove sono le cose` --references--> `texts()`  [INFERRED]
  ARCHITETTURA.md → tests/boardTouchLog.test.ts
- `Funzionalità` --references--> `k()`  [INFERRED]
  README.md → src/math/numerical.ts
- `Come viene pubblicata` --references--> `dist()`  [INFERRED]
  README.md → src/board/shapes.ts
- `Dove sono le cose` --references--> `adoptGuestNotes()`  [INFERRED]
  ARCHITETTURA.md → src/account/space.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (147 total, 30 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.08
Nodes (31): at(), browserStore, clip(), isSaved(), KINDS, LOG_KEY, LOG_MAX_LINES, LogStore (+23 more)

### Community 1 - "parse.ts"
Cohesion: 0.07
Nodes (41): hasWord(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe() (+33 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (98): insertGraphBlock(), graphsForFile(), hide(), graphBlockText(), account, ACCOUNT_OFF, active, aiShown() (+90 more)

### Community 3 - "compile"
Cohesion: 0.05
Nodes (80): integralRegion, argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot(), fieldOn() (+72 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (32): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+24 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (104): conicItems(), isConicLine(), quadricEquation(), fourierItems(), isFourierLine(), isComplexLine(), isComplexValue(), isSegmentNode() (+96 more)

### Community 6 - "laplace.ts"
Cohesion: 0.20
Nodes (21): beyondPoles(), compiled(), E, fractionShown(), HALF, inverseLaplaceShown(), laplaceEx(), laplaceShown() (+13 more)

### Community 7 - "num"
Cohesion: 0.09
Nodes (124): absOf(), atIntegers(), boundsOf(), close(), definite(), fourierProblem, fourierShown(), isTrig() (+116 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (46): FIGURE_PALETTE, addLabel(), boxes, cameras, complexCoord(), containing(), coord(), drawings (+38 more)

### Community 9 - "Dove sono le cose"
Cohesion: 0.06
Nodes (72): Dove sono le cose, Glifo – architettura, allNames(), answerFollowUp(), bareResult(), CHAT_SUBJECT, chatContext, ChatFn (+64 more)

### Community 10 - "parseGraph"
Cohesion: 0.08
Nodes (30): staticGraphSvg(), chooseWindow(), specFor(), chooseBox(), parseGraph(), DrawOptions, graphSvg(), PALETTES (+22 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.10
Nodes (56): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+48 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (55): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), dataWindow(), domainEdge() (+47 more)

### Community 13 - "mathContext.ts"
Cohesion: 0.09
Nodes (22): Promemoria per lo studente, @lezer/common, tabOutOfMath(), CODE_NODES, CommandToken, commandTokenAt(), EditorMathContext, isInCode() (+14 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.10
Nodes (5): isLanes(), SchemaEditor, withLaneContents(), NodeLook, serializeSchema()

### Community 15 - "Board"
Cohesion: 0.09
Nodes (11): Board, clampZoom(), loadPrefs(), MoveAction, pressureOf(), sizeChoice(), validView(), SizeChoice (+3 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (4): SheetEditor, serializeSheet(), clearRange(), cloneSheet()

### Community 17 - "editor.test.ts"
Cohesion: 0.09
Nodes (23): InsertOptions, templateInsertion(), toggleLinePrefix(), addPlaceholders, buildDecorations(), clearAllPlaceholders(), clearPlaceholders, CommandTarget (+15 more)

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

### Community 22 - "explainPanel.ts"
Cohesion: 0.19
Nodes (15): Explanation, formulasUntil(), sheetBefore(), explanationMarkdown(), insertAfterBlock(), insertAfterText(), insertExplanation(), nextLineText() (+7 more)

### Community 23 - "topics.ts"
Cohesion: 0.09
Nodes (33): ATTRIBUTES, count(), cut(), ER_SHAPES, fieldText(), fitLines(), flowOrder(), formulaText() (+25 more)

### Community 24 - "store.ts"
Cohesion: 0.11
Nodes (13): BoardBackend, done(), fromRecord(), IdbBoards, ofNote(), openBoardDatabase(), openDefault(), request() (+5 more)

### Community 25 - "MathError"
Cohesion: 0.10
Nodes (67): MathError, UndefinedName, angleBetween(), asMatrix(), basisOf(), circleText(), complexText(), cross() (+59 more)

### Community 26 - "assistant.ts"
Cohesion: 0.15
Nodes (20): AiAnswer, AiError, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible(), askThroughHost(), checkShape() (+12 more)

### Community 27 - "dialogs.ts"
Cohesion: 0.11
Nodes (22): EXPLAIN_TONES, ExplainTone, DEFAULT_LOCAL_MODEL, ACCOUNT_SETTINGS, accountSettings(), AI_MODELS, DEFAULT_SETTINGS, Settings (+14 more)

### Community 28 - "h"
Cohesion: 0.06
Nodes (42): SyncStatus, viewSwitch, saveClosedFolders(), AccountButton, confirmAccountDeletion(), messageOf(), openAccountDialog(), openLoginDialog() (+34 more)

### Community 29 - "toLatex"
Cohesion: 0.09
Nodes (63): criticalLine(), isSeveralLine(), named(), severalItems(), surface(), numShown(), EMPTY_SCOPE, shown() (+55 more)

### Community 30 - "gantt.ts"
Cohesion: 0.07
Nodes (67): amount(), barColor(), crossings(), dateText(), dayOf(), fitText(), GanttOptions, ganttSvg() (+59 more)

### Community 31 - "sheet.ts"
Cohesion: 0.06
Nodes (33): CalcCheck, GraphItem, OdeFunction, characteristicPolynomial(), Eigenvalue, LinearValue, NUMERICAL, bracketParts() (+25 more)

### Community 32 - "search.ts"
Cohesion: 0.16
Nodes (25): preferredIndex(), editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase() (+17 more)

### Community 33 - "editor/editor.ts"
Cohesion: 0.04
Nodes (59): description, name, private, type, version, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/lang-markdown (+51 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "NotesStore"
Cohesion: 0.05
Nodes (42): accountSpace(), adoptGuestNotes(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf(), setCurrentAccount() (+34 more)

### Community 36 - "complex.ts"
Cohesion: 0.06
Nodes (64): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isInequality(), realEverywhere() (+56 more)

### Community 37 - "namesIn"
Cohesion: 0.13
Nodes (37): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+29 more)

### Community 38 - "view3d.ts"
Cohesion: 0.06
Nodes (85): LayeredSolid, addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon() (+77 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "statsShown.ts"
Cohesion: 0.15
Nodes (35): formatRational(), Lin, check(), correlation(), count(), covariance(), Data, DATA_FUNCTIONS (+27 more)

### Community 41 - "Stroke"
Cohesion: 0.10
Nodes (9): EraseAction, Step, strokeSummary(), copyStrokes(), transformStrokes(), shapePoints(), BoardChange, BoardData (+1 more)

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

### Community 46 - "statsGraph.ts"
Cohesion: 0.13
Nodes (21): FieldContext, isTestLine(), number(), testItems(), classes(), dataOf(), distributionExtent(), distributionLabel() (+13 more)

### Community 47 - "latex.ts"
Cohesion: 0.08
Nodes (39): isNumericalLine(), numericalItems(), names(), STUDY_GRAPH, studyItems(), ACCENT_COMMANDS, COMPLEX_FUNCTIONS, diffLatex() (+31 more)

### Community 48 - "distributions.ts"
Cohesion: 0.07
Nodes (62): addExp(), choose(), continuousQuantile(), discreteQuantile(), Distribution, exactIntervalProbability(), expSum, expSumValue() (+54 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (35): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+27 more)

### Community 50 - "BoardStore"
Cohesion: 0.13
Nodes (5): BoardStore, MemoryBoards, applyAccountChange(), reloadPage(), signOutAccount()

### Community 51 - "renderTex"
Cohesion: 0.18
Nodes (7): cleanKatexError(), renderTex(), isConfidentAnswer(), symbolsInCategory(), displayCode(), preventFocusSteal(), SidePanel

### Community 52 - "MarkdownEditor"
Cohesion: 0.15
Nodes (6): @codemirror/commands, closeMathBlockOnEnter(), EditorCallbacks, MarkdownEditor, insertTemplate(), setup()

### Community 53 - "vitest"
Cohesion: 0.04
Nodes (68): vite-plugin-pwa, vitest, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), PullResult, openShareDialog(), changeAccess() (+60 more)

### Community 54 - "graph.ts"
Cohesion: 0.09
Nodes (33): fieldInput(), AT_X, cellText(), COMPASS, createEdgeCell(), createGraph(), drawSchema(), edgeLook() (+25 more)

### Community 55 - "ui/preview.ts"
Cohesion: 0.10
Nodes (16): GraphLabels, renameGraphScope(), renameScopeKeys(), BlockKind, MoveDir, hydrateSheets(), BLOCK_NAMES, blockKindOf() (+8 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "selection.ts"
Cohesion: 0.08
Nodes (38): centerOn(), cross(), handleScale(), IDENTITY, insideLasso(), keepInside(), LASSO_SHARE, lassoed() (+30 more)

### Community 58 - "explainSubjects.ts"
Cohesion: 0.17
Nodes (13): explainTarget, hasCalculation(), NoteSubject, subjectsIn(), THEOREM_START, THEOREM_WORDS, theoremsIn(), theoremTitle() (+5 more)

### Community 59 - "odesolve.ts"
Cohesion: 0.09
Nodes (65): linearIn(), addWave(), arrange(), cauchy(), compiled(), constantNames(), equalities(), factorial() (+57 more)

### Community 60 - "schema/shapes.ts"
Cohesion: 0.08
Nodes (16): @maxgraph/core, ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape (+8 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 63 - "spreadsheet/format.ts"
Cohesion: 0.14
Nodes (18): KINDS, sheetSummary(), WidgetBlock, SchemaBlock, decimalsOf(), fixedNumber(), formatNumber(), generalNumber() (+10 more)

### Community 64 - "storage.test.ts"
Cohesion: 0.18
Nodes (16): applySpellcheck(), backup(), openSettings(), restore(), setPersonalWords(), sidebarBottom, wordsChangedHere(), addPersonalWord() (+8 more)

### Community 65 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 66 - "spreadsheet.test.ts"
Cohesion: 0.10
Nodes (43): formatCode(), formatValue(), parseFormatCode(), adjustFormula(), BinOp, COMPARE, ERRORS_BY_LENGTH, formulaRefs() (+35 more)

### Community 67 - "probability.ts"
Cohesion: 0.11
Nodes (27): End, Family, CompileOptions, ExactScope, rejection(), ALL, complement(), distributionOf() (+19 more)

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

### Community 73 - "toolbar.ts"
Cohesion: 0.19
Nodes (15): insertBlock(), wrapSelection(), Action, createToolbar(), insertCode(), insertLink(), listMenu(), listStyle() (+7 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (61): primitive(), verified(), linearCells(), pairUp(), assumePositive(), atValues(), Converter, coordinates() (+53 more)

### Community 75 - "schemaGuard.test.ts"
Cohesion: 0.12
Nodes (11): BlockWidget, findWidgetBlocks(), guardBlocks(), schemaBlocks(), create(), heading(), schemas(), setup() (+3 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.04
Nodes (80): laneOf(), alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ARROW_NAMES (+72 more)

### Community 79 - "parseSchema"
Cohesion: 0.09
Nodes (30): schemaSummary(), svg(), SchemaEditorOptions, base64(), hide(), OPEN, schemasForFile(), schemasFromFile() (+22 more)

### Community 82 - "blockMove.ts"
Cohesion: 0.10
Nodes (35): blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove, blockPlace(), closed() (+27 more)

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

### Community 98 - "board.ts"
Cohesion: 0.06
Nodes (43): Action, ACTION_NAMES, coalesced(), DOT_SIZES, DrawAction, EraserMode, Finger, HANDLE_REACH (+35 more)

### Community 100 - "Glifo"
Cohesion: 0.13
Nodes (15): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Commenti, Compatibilità con VS Code, Condividere una nota con un link (+7 more)

### Community 101 - "spellcheck.ts"
Cohesion: 0.11
Nodes (19): misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt(), openAt() (+11 more)

### Community 102 - "supabase.ts"
Cohesion: 0.10
Nodes (36): @supabase/supabase-js, AUTH_STORAGE_KEY, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken() (+28 more)

### Community 103 - "planPreview.ts"
Cohesion: 0.12
Nodes (21): planName(), ganttWidth(), PlanView, GraphLook, inClaudeViewer(), svgToPng(), canWriteFilesDirectly(), downloadBlob() (+13 more)

### Community 104 - "formatNumber"
Cohesion: 0.13
Nodes (26): exponentialForm(), fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), decimalSeparator() (+18 more)

### Community 105 - "database.ts"
Cohesion: 0.25
Nodes (5): createDatabase(), databaseTests(), feedbackTests(), migrations, shareTests()

### Community 106 - "host.ts"
Cohesion: 0.27
Nodes (7): cache, capability(), ClaudeRuntime, hostDownloads, HostError, ModelTier, runtime()

### Community 107 - "localModels.ts"
Cohesion: 0.09
Nodes (30): @mlc-ai/web-llm, chat(), GlifoError, Gpu, load(), post(), remove(), scope (+22 more)

### Community 108 - "xlsx.ts"
Cohesion: 0.10
Nodes (42): RFC-4180, fflate, csvDelimiter(), csvToSheet(), field(), italian(), parseCsv(), sheetToCsv() (+34 more)

### Community 110 - "aiPanel.test.ts"
Cohesion: 0.09
Nodes (23): definedName(), formulaTopic(), graphTopic(), numberText(), studyOf(), theoremTopic(), SubjectKind, AI_NEWS_TITLE (+15 more)

### Community 113 - "markdown.ts"
Cohesion: 0.11
Nodes (30): dompurify, highlight.js, markdown-it-footnote, bulletGroup(), sameList(), renderTexOrError(), renderTexWithResult(), alignInside() (+22 more)

### Community 116 - "spreadsheet/editor.ts"
Cohesion: 0.06
Nodes (59): at(), breakEven(), dataLine(), dataRange(), Point, quantity(), tableItems(), textLabel() (+51 more)

### Community 117 - "Più avanti"
Cohesion: 0.29
Nodes (7): Account: i propri appunti su ogni dispositivo, anche da condividere, Commenti di chi prova Glifo, Idee per il futuro, In programma, La lavagna: idee in più, Più avanti, Schemi: idee in più

### Community 119 - "Rational"
Cohesion: 0.09
Nodes (44): Part, at(), centralCanonical(), Coefficients, coneCanonical(), conicOf(), det2(), det3() (+36 more)

### Community 120 - "toast"
Cohesion: 0.12
Nodes (26): loadingEditor(), openSheet(), saveSheetBlock(), tablesNote(), sheetBlockText(), checkSite(), current, entryScripts() (+18 more)

### Community 121 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, Quando lo studente dice di cominciare

### Community 124 - "Sheet"
Cohesion: 0.07
Nodes (29): ExactComplexScope, ConicInfo, Ode, withWorkLimit(), ExactRandom, Elem, FiniteContext, FormattedResult (+21 more)

### Community 125 - "sql.ts"
Cohesion: 0.17
Nodes (17): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+9 more)

### Community 126 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 127 - "I modelli e le chiavi API"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), In prova sul ramo `prova` (7 ottobre 2026): Qwen3 nel browser per «Spiegami», Le idee dello studente (5 ottobre 2026)

### Community 128 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 129 - "graph/file.ts"
Cohesion: 0.10
Nodes (38): figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsFromFile(), OPEN, swatchSvg(), titleBand() (+30 more)

### Community 132 - "linsys.ts"
Cohesion: 0.14
Nodes (40): choices(), gcd(), matrixEquation(), matrixSystem(), minorsGcd(), ONE, parametricSystem(), PARAMS (+32 more)

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 140 - "Glifo – note per Claude"
Cohesion: 0.25
Nodes (8): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Regole, sqlite()

### Community 147 - "escapeHtml"
Cohesion: 0.17
Nodes (11): FollowUp, REPLY_TOKENS, checkHtml(), checkTitle(), escapeHtml(), ExplainChat, Turn, formulasSummary() (+3 more)

### Community 152 - "sidePanel.ts"
Cohesion: 0.12
Nodes (17): katex, AiResult, SuggestionItem, cache, TexRender, CATEGORIES, cardPreviewTex(), formPreviewTex() (+9 more)

### Community 157 - "page.ts"
Cohesion: 0.10
Nodes (22): currentAccount(), sidebarToggle(), SharedNote, body, draw(), isDark(), saveButton, saveCopy() (+14 more)

### Community 158 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

## Knowledge Gaps
- **674 isolated node(s):** `Condividere una nota con un link`, `Commenti`, `Provarlo sul tuo computer`, `Assistente AI`, `Spiegami (in prova)` (+669 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 942 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **30 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `touchlog.ts`, `graph/file.ts`, `main.ts`, `compile`, `linsys.ts`, `spec.ts`, `parse.ts`, `num`, `graph/preview.ts`, `parseGraph`, `svg.ts`, `SchemaEditor`, `Board`, `SheetEditor`, `numerical.ts`, `arithmetic.ts`, `escapeHtml`, `explainPanel.ts`, `topics.ts`, `sidePanel.ts`, `MathError`, `assistant.ts`, `dialogs.ts`, `h`, `page.ts`, `gantt.ts`, `toLatex`, `editor/editor.ts`, `logic.ts`, `NotesStore`, `complex.ts`, `namesIn`, `view3d.ts`, `statsShown.ts`, `Stroke`, `functions.ts`, `finite.ts`, `statsGraph.ts`, `latex.ts`, `distributions.ts`, `board/shapes.ts`, `BoardStore`, `renderTex`, `MarkdownEditor`, `vitest`, `graph.ts`, `ui/preview.ts`, `selection.ts`, `explainSubjects.ts`, `odesolve.ts`, `schema/shapes.ts`, `storage.test.ts`, `spreadsheet.test.ts`, `smoke-test.mjs`, `toolbar.ts`, `symbolic.ts`, `schemaGuard.test.ts`, `schema/editor.ts`, `blockMove.ts`, `board.ts`, `supabase.ts`, `planPreview.ts`, `formatNumber`, `localModels.ts`, `xlsx.ts`, `aiPanel.test.ts`, `markdown.ts`, `spreadsheet/editor.ts`, `ExplainPanel`, `Rational`, `toast`, `Sheet`?**
  _High betweenness centrality (0.189) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `touchlog.ts`, `parse.ts`, `main.ts`, `compile`, `linsys.ts`, `graph/file.ts`, `sync.ts`, `num`, `Dove sono le cose`, `parseGraph`, `editor/lists.ts`, `svg.ts`, `editor.test.ts`, `store.ts`, `MathError`, `assistant.ts`, `dialogs.ts`, `sidePanel.ts`, `page.ts`, `gantt.ts`, `sheet.ts`, `search.ts`, `editor/editor.ts`, `toLatex`, `NotesStore`, `h`, `view3d.ts`, `resize.ts`, `distributions.ts`, `board/shapes.ts`, `MarkdownEditor`, `ui/preview.ts`, `selection.ts`, `storage.test.ts`, `spreadsheet.test.ts`, `schemaGuard.test.ts`, `schema/editor.ts`, `parseSchema`, `blockMove.ts`, `board.ts`, `supabase.ts`, `database.ts`, `localModels.ts`, `xlsx.ts`, `aiPanel.test.ts`, `markdown.ts`, `spreadsheet/editor.ts`, `toast`, `Sheet`, `sql.ts`?**
  _High betweenness centrality (0.100) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `touchlog.ts`, `main.ts`, `graph/preview.ts`, `SchemaEditor`, `Board`, `SheetEditor`, `escapeHtml`, `explainPanel.ts`, `sidePanel.ts`, `dialogs.ts`, `page.ts`, `resize.ts`, `Stroke`, `renderTex`, `vitest`, `graph.ts`, `ui/preview.ts`, `explainSubjects.ts`, `storage.test.ts`, `toolbar.ts`, `schema/editor.ts`, `board.ts`, `spellcheck.ts`, `planPreview.ts`, `aiPanel.test.ts`, `spreadsheet/editor.ts`, `ExplainPanel`, `toast`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **Are the 274 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `adoptGuestNotes()`) actually correct?**
  _`Dove sono le cose` has 274 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Condividere una nota con un link`, `Commenti`, `Provarlo sul tuo computer` to the rest of the system?**
  _674 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `touchlog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07878787878787878 - nodes in this community are weakly interconnected._
- **Should `parse.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07318078746650175 - nodes in this community are weakly interconnected._