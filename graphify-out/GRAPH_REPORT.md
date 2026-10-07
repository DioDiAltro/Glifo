# Graph Report - matherdown  (2026-10-07)

## Corpus Check
- 293 files · ~566,591 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 4784 nodes · 17305 edges · 142 communities (114 shown, 28 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 505 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `eb12fcc7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- touchlog.ts
- parse.ts
- main.ts
- symbolic.ts
- sync.ts
- spec.ts
- arithmetic.ts
- primitive.ts
- graph/preview.ts
- explain.ts
- domain.ts
- markers.ts
- svg.ts
- inference.ts
- SchemaEditor
- exact.ts
- SheetEditor
- compile
- numerical.ts
- markdown.ts
- index.ts
- engine.ts
- Board
- distributions.ts
- BoardStore
- MathError
- assistant.ts
- graph.ts
- supabase.ts
- toLatex
- gantt.ts
- view3d.ts
- plan.ts
- editor.test.ts
- logic.ts
- NotesStore
- complex.ts
- namesIn
- explainPanel.test.ts
- resize.ts
- sheet.ts
- Pt
- editor/lists.ts
- study.ts
- functions.ts
- spreadsheet/editor.ts
- probability.ts
- vitest
- Rational
- board/shapes.ts
- toolbar.ts
- explainPanel.ts
- search.ts
- settings.ts
- MarkdownEditor
- latex.ts
- 20261004091555_note_condivise.sql
- board.ts
- linsys.ts
- odesolve.ts
- schema/shapes.ts
- dependencies
- FoldersStore
- parseSchema
- ui/preview.ts
- conics.ts
- icons.mjs
- formatNumber
- smoke-test.mjs
- Benvenuto in Glifo
- compilerOptions
- Dove sono le cose
- solve.ts
- blockMove.ts
- symbols
- Sheet
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- spreadsheet/format.ts
- session-start.sh
- .claude/CLAUDE.md
- schemaTools.test.ts
- tutorial.mjs
- Abbonamenti
- spiegami-qwen.mjs
- supabase-stub.sql
- account-test.mjs
- Il database degli account (Supabase)
- devDependencies
- Parser
- spell.test.ts
- laplace.ts
- createFakeSupabase
- files.ts
- editor/editor.ts
- fake-supabase.mjs
- logo.ts
- xlsx.ts
- page.ts
- .openMenu
- labels.ts
- spellcheck
- localModels.ts
- PlanView
- Glifo – note per Claude
- Field
- Le spiegazioni, come funzionano
- renderTex
- Piano per piano
- sql.ts
- Costi
- Glifo
- host.ts
- Idee per il futuro
- h
- La lavagna
- I modelli e le chiavi API
- sidePanel.ts
- calcResults.ts
- schema/preview.ts

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 219 edges
2. `MathError` - 151 edges
3. `num()` - 145 edges
4. `Sheet` - 135 edges
5. `MathNode` - 129 edges
6. `mul()` - 124 edges
7. `Board` - 118 edges
8. `compile()` - 113 edges
9. `Rational` - 111 edges
10. `toLatex()` - 103 edges

## Surprising Connections (you probably didn't know these)
- `Dove sono le cose` --references--> `fakeLlmWorker()`  [INFERRED]
  ARCHITETTURA.md → scripts/smoke-test.mjs
- `Come viene pubblicata` --references--> `dist()`  [INFERRED]
  README.md → src/board/shapes.ts
- `Dove sono le cose` --references--> `WidgetKind`  [INFERRED]
  ARCHITETTURA.md → src/editor/schemaBlocks.ts
- `Dove sono le cose` --references--> `ConicElements`  [INFERRED]
  ARCHITETTURA.md → src/math/conics.ts
- `Dove sono le cose` --references--> `texts()`  [INFERRED]
  ARCHITETTURA.md → tests/boardTouchLog.test.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (142 total, 28 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.09
Nodes (26): at(), browserStore, clip(), isSaved(), KINDS, LOG_KEY, LOG_MAX_LINES, LogStore (+18 more)

### Community 1 - "parse.ts"
Cohesion: 0.07
Nodes (42): hasWord(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe() (+34 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (102): addToGraphBlock(), insertGraphBlock(), setGraphLabels(), graphsForFile(), hide(), remapGraphLines(), account, ACCOUNT_OFF (+94 more)

### Community 3 - "symbolic.ts"
Cohesion: 0.07
Nodes (80): oneFraction(), splitAbs(), withoutAbs(), exp(), hyperbolicToExp(), inverseRational(), oneFraction(), sqrtEx() (+72 more)

### Community 4 - "sync.ts"
Cohesion: 0.05
Nodes (36): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+28 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (81): conicItems(), isConicLine(), quadricEquation(), fourierItems(), isFourierLine(), isNumericalLine(), numericalItems(), areaFor() (+73 more)

### Community 6 - "arithmetic.ts"
Cohesion: 0.07
Nodes (76): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+68 more)

### Community 7 - "primitive.ts"
Cohesion: 0.17
Nodes (61): atIntegers(), similarSolution(), degree(), algebraic(), bigGcd(), byParts(), candidates(), canon() (+53 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (45): addLabel(), boxes, cameras, complexCoord(), coord(), drawings, drawnViews, endTex() (+37 more)

### Community 9 - "explain.ts"
Cohesion: 0.07
Nodes (50): allNames(), ChatFn, checkSteps(), engineHints(), explain(), EXPLAIN_TONES, ExplainError, ExplainEvents (+42 more)

### Community 10 - "domain.ts"
Cohesion: 0.08
Nodes (52): constantIntegrand(), depth(), inequalityMargin(), integralRegion, LayeredSolid, Multiple, multipleOf(), planeMargin() (+44 more)

### Community 11 - "markers.ts"
Cohesion: 0.12
Nodes (36): ListStyle, bullet(), bulletGroup(), childMarker(), column(), firstMarker(), label(), lettersMarker() (+28 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (54): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), dataWindow(), domainEdge() (+46 more)

### Community 13 - "inference.ts"
Cohesion: 0.13
Nodes (27): Distribution, chiSquareTest(), confidence(), confidenceShown(), Given, hypothesisTest(), InferenceContext, interval() (+19 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.10
Nodes (6): SchemaEditor, withLaneContents(), serializeSchema(), downloadBlob(), downloadText(), fileNameFor()

### Community 15 - "exact.ts"
Cohesion: 0.16
Nodes (16): expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactFunction, ExactRandom, exactRoot() (+8 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (12): MenuEntry, SheetEditor, CellResult, formulaRefs(), isFormula(), normalizeFormula(), autoSum(), CellRange (+4 more)

### Community 17 - "compile"
Cohesion: 0.07
Nodes (51): argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot(), fieldOn(), numericPartials() (+43 more)

### Community 18 - "numerical.ts"
Cohesion: 0.12
Nodes (46): Funzionalità, bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial() (+38 more)

### Community 19 - "markdown.ts"
Cohesion: 0.09
Nodes (45): @codemirror/state, @codemirror/view, katex, FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), graphImagesFor() (+37 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (41): b, bigops, c, calculus, fn, fr, fractions, functions (+33 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 23 - "distributions.ts"
Cohesion: 0.12
Nodes (34): addExp(), choose(), continuousQuantile(), discreteQuantile(), exactIntervalProbability(), factorialBig(), FAMILIES, integerParam() (+26 more)

### Community 24 - "BoardStore"
Cohesion: 0.05
Nodes (15): BoardOptions, BoardBackend, BoardStore, done(), fromRecord(), IdbBoards, MemoryBoards, ofNote() (+7 more)

### Community 25 - "MathError"
Cohesion: 0.12
Nodes (55): MathError, angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, dataOf() (+47 more)

### Community 26 - "assistant.ts"
Cohesion: 0.13
Nodes (20): AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible(), askThroughHost() (+12 more)

### Community 27 - "graph.ts"
Cohesion: 0.11
Nodes (27): isLanes(), AT_X, cellText(), COMPASS, createEdgeCell(), createGraph(), drawSchema(), edgeLook() (+19 more)

### Community 28 - "supabase.ts"
Cohesion: 0.09
Nodes (39): @supabase/supabase-js, AUTH_STORAGE_KEY, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken() (+31 more)

### Community 29 - "toLatex"
Cohesion: 0.09
Nodes (62): criticalLine(), isSeveralLine(), named(), severalItems(), surface(), numShown(), EMPTY_SCOPE, scopeWith() (+54 more)

### Community 30 - "gantt.ts"
Cohesion: 0.06
Nodes (70): amount(), barColor(), crossings(), dateText(), dayOf(), fitText(), GanttOptions, ganttSvg() (+62 more)

### Community 31 - "view3d.ts"
Cohesion: 0.06
Nodes (85): addMesh(), addTet(), affinePlane(), Axis, Box, centroid(), clipBy(), clipPolygon() (+77 more)

### Community 32 - "plan.ts"
Cohesion: 0.16
Nodes (17): cellText(), columnRole(), columnsOf(), durationUnit(), isNumber(), isPlanRange(), MAX_ACTIVITIES, plain() (+9 more)

### Community 33 - "editor.test.ts"
Cohesion: 0.10
Nodes (18): addPlaceholders, buildDecorations(), clearAllPlaceholders(), clearPlaceholders, CommandTarget, contains(), currentIndex(), filledMark (+10 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "NotesStore"
Cohesion: 0.08
Nodes (32): accountSpace(), adoptGuestNotes(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf(), setCurrentAccount() (+24 more)

### Community 36 - "complex.ts"
Cohesion: 0.05
Nodes (78): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexLine(), isComplexValue() (+70 more)

### Community 37 - "namesIn"
Cohesion: 0.13
Nodes (37): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+29 more)

### Community 38 - "explainPanel.test.ts"
Cohesion: 0.14
Nodes (10): localErrorMessage(), localLlm, Pending, ChatMessage, ChatOptions, LoadProgress, localModel, ExplainModel (+2 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "sheet.ts"
Cohesion: 0.08
Nodes (57): formatGauss(), OdeFunction, expSumValue(), FormatOptions, Eigenvalue, Lin, LinearValue, NumericContext (+49 more)

### Community 41 - "Pt"
Cohesion: 0.10
Nodes (14): clampZoom(), coalesced(), Finger, MoveAction, pointsOf(), pressureOf(), validView(), handleScale() (+6 more)

### Community 42 - "editor/lists.ts"
Cohesion: 0.22
Nodes (25): continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext(), isBlank() (+17 more)

### Community 43 - "study.ts"
Cohesion: 0.09
Nodes (50): close(), Definite, definiteIntegral(), exValue(), samples(), Piece, limit(), LimitValue (+42 more)

### Community 44 - "functions.ts"
Cohesion: 0.08
Nodes (57): EMPTY, evaluateSheet(), number(), SheetEvaluator, addFormat(), readInput(), FormulaNode, Ref (+49 more)

### Community 45 - "spreadsheet/editor.ts"
Cohesion: 0.06
Nodes (70): KINDS, sheetSummary(), WidgetBlock, WidgetKind, SchemaBlock, currentCall(), Editing, Move (+62 more)

### Community 46 - "probability.ts"
Cohesion: 0.11
Nodes (28): End, Family, CompileOptions, ExactScope, rejection(), ALL, compileOf(), complement() (+20 more)

### Community 47 - "vitest"
Cohesion: 0.06
Nodes (44): vite-plugin-pwa, vitest, formulaAtCursor(), GraphLabelLines, staticGraphSvg(), chooseWindow(), containing(), chooseBox() (+36 more)

### Community 48 - "Rational"
Cohesion: 0.14
Nodes (20): Part, Rational, absOf(), boundsOf(), close(), definite(), fourierProblem, fourierShown() (+12 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.14
Nodes (34): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+26 more)

### Community 50 - "toolbar.ts"
Cohesion: 0.08
Nodes (31): insertBlock(), toggleLinePrefix(), wrapSelection(), applyListStyle(), LIST_STYLES, besideSchema(), BlockWidget, findWidgetBlocks() (+23 more)

### Community 51 - "explainPanel.ts"
Cohesion: 0.17
Nodes (11): Explanation, REPLY_TOKENS, explanationMarkdown(), regionToExplain(), Asked, ExplainPanel, preventFocusSteal(), sentenceHtml() (+3 more)

### Community 52 - "search.ts"
Cohesion: 0.17
Nodes (24): editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex() (+16 more)

### Community 53 - "settings.ts"
Cohesion: 0.09
Nodes (26): ExplainTone, DEFAULT_LOCAL_MODEL, addPersonalWord(), DICTIONARY_KEY, loadPersonalWords(), savePersonalWords(), tidy(), ACCOUNT_SETTINGS (+18 more)

### Community 54 - "MarkdownEditor"
Cohesion: 0.19
Nodes (3): EditorCallbacks, MarkdownEditor, insertTemplate()

### Community 55 - "latex.ts"
Cohesion: 0.08
Nodes (50): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+42 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "board.ts"
Cohesion: 0.06
Nodes (49): Action, ACTION_NAMES, DOT_SIZES, DrawAction, EraseAction, EraserMode, HANDLE_REACH, ICON (+41 more)

### Community 58 - "linsys.ts"
Cohesion: 0.08
Nodes (52): formatRational(), nameLatex(), eigenvalues(), eigenvectors(), EXACT, FLOAT, interpolateFloat(), kernel() (+44 more)

### Community 59 - "odesolve.ts"
Cohesion: 0.09
Nodes (73): linearIn(), addWave(), arrange(), cauchy(), compiled(), constantNames(), constantParticular(), equalities() (+65 more)

### Community 60 - "schema/shapes.ts"
Cohesion: 0.08
Nodes (17): @maxgraph/core, ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape (+9 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "FoldersStore"
Cohesion: 0.08
Nodes (18): cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder(), loadClosedFolders(), RemoteFolder (+10 more)

### Community 63 - "parseSchema"
Cohesion: 0.13
Nodes (21): schemaSummary(), svg(), base64(), hide(), OPEN, schemasForFile(), schemasFromFile(), unhide() (+13 more)

### Community 64 - "ui/preview.ts"
Cohesion: 0.11
Nodes (12): GraphLabels, BlockKind, MoveDir, hydrateSheets(), BLOCK_NAMES, blockKindOf(), MOVABLE_BLOCKS, moveButtonsHtml() (+4 more)

### Community 65 - "conics.ts"
Cohesion: 0.18
Nodes (29): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+21 more)

### Community 67 - "formatNumber"
Cohesion: 0.13
Nodes (26): isTestLine(), number(), testItems(), figureText(), linearItem(), classes(), dataOf(), distributionExtent() (+18 more)

### Community 68 - "smoke-test.mjs"
Cohesion: 0.29
Nodes (4): markdown-it, fakeLlmWorker(), firstVisit(), plainContext

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "Dove sono le cose"
Cohesion: 0.09
Nodes (41): Dove sono le cose, Glifo – architettura, LassoAction, centerOn(), copyStrokes(), cross(), IDENTITY, insideLasso() (+33 more)

### Community 72 - "solve.ts"
Cohesion: 0.13
Nodes (30): FieldContext, Scope, FiniteContext, LinearScope, splitRoot(), isStandardUnknown(), RelOp, breaks() (+22 more)

### Community 73 - "blockMove.ts"
Cohesion: 0.10
Nodes (35): blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove, blockPlace(), closed() (+27 more)

### Community 74 - "symbols"
Cohesion: 0.15
Nodes (21): linearCells(), atValues(), Converter, coordinates(), definiteParts(), expandCalculus(), fieldName(), functionOf() (+13 more)

### Community 75 - "Sheet"
Cohesion: 0.08
Nodes (28): complex, ExactComplexScope, Ode, withWorkLimit(), FormattedResult, MathNode, chainOf(), close() (+20 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.04
Nodes (66): ALIGN, ARROW_NAMES, AT_ICONS, AT_NAMES, BASE_PRESETS, BIG_ARROWS, DB_PRESETS, Direction (+58 more)

### Community 79 - "spreadsheet/format.ts"
Cohesion: 0.10
Nodes (39): at(), breakEven(), dataLine(), dataRange(), Point, quantity(), tableItems(), textLabel() (+31 more)

### Community 82 - "schemaTools.test.ts"
Cohesion: 0.17
Nodes (18): alignBoxes(), Alignment, Box, distributeBoxes(), Position, cellHtml(), labelHtml(), lanesHtml() (+10 more)

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
Cohesion: 0.20
Nodes (4): device(), login(), newContext, waitFor()

### Community 97 - "Il database degli account (Supabase)"
Cohesion: 0.18
Nodes (10): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Nell'app, Note condivise con un link (+2 more)

### Community 98 - "devDependencies"
Cohesion: 0.10
Nodes (18): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+10 more)

### Community 101 - "spell.test.ts"
Cohesion: 0.10
Nodes (20): @codemirror/lang-markdown, noIndentedCode, misspelledMark, refreshSpelling, setTarget, SKIP, SpellTarget, wordsToCheck() (+12 more)

### Community 102 - "laplace.ts"
Cohesion: 0.23
Nodes (18): beyondPoles(), compiled(), E, fractionShown(), HALF, inverseLaplaceShown(), laplaceEx(), laplaceShown() (+10 more)

### Community 103 - "createFakeSupabase"
Cohesion: 0.60
Nodes (6): createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 104 - "files.ts"
Cohesion: 0.24
Nodes (13): inClaudeViewer(), canWriteFilesDirectly(), FsWindow, isAbort(), MD_TYPES, OPEN_TYPES, OpenedFile, openMarkdownFiles() (+5 more)

### Community 105 - "editor/editor.ts"
Cohesion: 0.05
Nodes (57): description, name, private, type, version, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands (+49 more)

### Community 106 - "fake-supabase.mjs"
Cohesion: 0.25
Nodes (6): @electric-sql/pglite, b64(), CODE, GOOGLE_CODE, ROOT, SUPABASE_URL

### Community 107 - "logo.ts"
Cohesion: 0.33
Nodes (6): sidebarToggle(), BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark()

### Community 108 - "xlsx.ts"
Cohesion: 0.10
Nodes (42): RFC-4180, fflate, csvDelimiter(), csvToSheet(), field(), italian(), parseCsv(), sheetToCsv() (+34 more)

### Community 110 - "page.ts"
Cohesion: 0.07
Nodes (45): SUPABASE_KEY, SUPABASE_URL, accountDataFile(), currentAccount(), PullResult, openShareDialog(), changeAccess(), changeCopy() (+37 more)

### Community 116 - "labels.ts"
Cohesion: 0.16
Nodes (20): ACCENTS, BLACKBOARD, CALLIGRAPHIC, closing(), convert(), escapeXml(), FUNCTIONS, GREEK (+12 more)

### Community 117 - "spellcheck"
Cohesion: 0.21
Nodes (8): spellcheck(), close(), misspelledAt(), openAt(), replace(), tooltipView(), SpellChecker, SpellcheckOptions

### Community 118 - "localModels.ts"
Cohesion: 0.16
Nodes (19): @mlc-ai/web-llm, chat(), GlifoError, Gpu, load(), post(), remove(), scope (+11 more)

### Community 119 - "PlanView"
Cohesion: 0.28
Nodes (3): ganttWidth(), PlanView, Palette

### Community 120 - "Glifo – note per Claude"
Cohesion: 0.22
Nodes (9): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole (+1 more)

### Community 121 - "Field"
Cohesion: 0.12
Nodes (5): characteristicPolynomial(), Field, formatPolynomial(), interpolate(), polynomialIn()

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "renderTex"
Cohesion: 0.22
Nodes (7): cleanKatexError(), renderTex(), isConfidentAnswer(), symbolsInCategory(), displayCode(), preventFocusSteal(), SidePanel

### Community 124 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 125 - "sql.ts"
Cohesion: 0.17
Nodes (18): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+10 more)

### Community 126 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, Quando lo studente dice di cominciare

### Community 127 - "Glifo"
Cohesion: 0.15
Nodes (13): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Glifo (+5 more)

### Community 128 - "host.ts"
Cohesion: 0.23
Nodes (8): cache, capability(), ClaudeRuntime, hostDownloads, HostError, hostSample, ModelTier, runtime()

### Community 129 - "Idee per il futuro"
Cohesion: 0.33
Nodes (6): Account: i propri appunti su ogni dispositivo, anche da condividere, Idee per il futuro, In programma, La lavagna: idee in più, Più avanti, Schemi: idee in più

### Community 131 - "h"
Cohesion: 0.07
Nodes (49): SyncStatus, helpButton, openGuide(), viewSwitch, openSignedOut(), printButton(), ShareDialogDeps, AccountButton (+41 more)

### Community 132 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 136 - "I modelli e le chiavi API"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), In prova sul ramo `prova` (7 ottobre 2026): Qwen3 nel browser per «Spiegami», Le idee dello studente (5 ottobre 2026)

### Community 137 - "sidePanel.ts"
Cohesion: 0.12
Nodes (18): InsertOptions, templateInsertion(), EditorMathContext, expand(), preferredIndex(), SuggestionController, SuggestionItem, CATEGORIES (+10 more)

### Community 141 - "calcResults.ts"
Cohesion: 0.10
Nodes (22): explainTarget, acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult, calcResults(), CheckWidget (+14 more)

### Community 142 - "schema/preview.ts"
Cohesion: 0.22
Nodes (12): GraphLook, Look, SchemaError, Theme, draw(), drawCached(), drawn, errorHtml() (+4 more)

## Knowledge Gaps
- **641 isolated node(s):** `session-start.sh script`, `name`, `private`, `version`, `description` (+636 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 893 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **28 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `touchlog.ts`, `parse.ts`, `main.ts`, `symbolic.ts`, `h`, `spec.ts`, `arithmetic.ts`, `primitive.ts`, `graph/preview.ts`, `explain.ts`, `svg.ts`, `calcResults.ts`, `inference.ts`, `exact.ts`, `SchemaEditor`, `compile`, `numerical.ts`, `markdown.ts`, `SheetEditor`, `Board`, `BoardStore`, `MathError`, `assistant.ts`, `graph.ts`, `supabase.ts`, `toLatex`, `gantt.ts`, `view3d.ts`, `plan.ts`, `logic.ts`, `NotesStore`, `complex.ts`, `namesIn`, `explainPanel.test.ts`, `sheet.ts`, `Pt`, `study.ts`, `functions.ts`, `spreadsheet/editor.ts`, `vitest`, `Rational`, `board/shapes.ts`, `toolbar.ts`, `explainPanel.ts`, `settings.ts`, `MarkdownEditor`, `latex.ts`, `board.ts`, `linsys.ts`, `odesolve.ts`, `schema/shapes.ts`, `parseSchema`, `ui/preview.ts`, `conics.ts`, `formatNumber`, `smoke-test.mjs`, `blockMove.ts`, `symbols`, `Sheet`, `schema/editor.ts`, `spreadsheet/format.ts`, `schemaTools.test.ts`, `files.ts`, `logo.ts`, `xlsx.ts`, `localModels.ts`, `PlanView`?**
  _High betweenness centrality (0.170) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `touchlog.ts`, `parse.ts`, `main.ts`, `symbolic.ts`, `sync.ts`, `h`, `arithmetic.ts`, `graph/preview.ts`, `explain.ts`, `domain.ts`, `markers.ts`, `svg.ts`, `sidePanel.ts`, `compile`, `markdown.ts`, `distributions.ts`, `BoardStore`, `assistant.ts`, `supabase.ts`, `gantt.ts`, `view3d.ts`, `plan.ts`, `editor.test.ts`, `NotesStore`, `explainPanel.test.ts`, `resize.ts`, `spreadsheet/editor.ts`, `board/shapes.ts`, `toolbar.ts`, `search.ts`, `settings.ts`, `board.ts`, `linsys.ts`, `FoldersStore`, `parseSchema`, `Dove sono le cose`, `blockMove.ts`, `Sheet`, `spreadsheet/format.ts`, `schemaTools.test.ts`, `spell.test.ts`, `editor/editor.ts`, `logo.ts`, `xlsx.ts`, `page.ts`, `localModels.ts`, `sql.ts`?**
  _High betweenness centrality (0.125) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `main.ts`, `graph/preview.ts`, `sidePanel.ts`, `SchemaEditor`, `SheetEditor`, `Board`, `graph.ts`, `resize.ts`, `spreadsheet/editor.ts`, `toolbar.ts`, `explainPanel.ts`, `board.ts`, `FoldersStore`, `ui/preview.ts`, `schema/editor.ts`, `spreadsheet/format.ts`, `spell.test.ts`, `logo.ts`, `page.ts`, `.openMenu`, `spellcheck`, `PlanView`, `renderTex`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **Are the 218 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `adoptGuestNotes()`) actually correct?**
  _`Dove sono le cose` has 218 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `name`, `private` to the rest of the system?**
  _641 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `touchlog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08673469387755102 - nodes in this community are weakly interconnected._
- **Should `parse.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07292929292929293 - nodes in this community are weakly interconnected._