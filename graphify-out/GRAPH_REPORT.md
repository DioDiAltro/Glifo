# Graph Report - matherdown  (2026-10-07)

## Corpus Check
- 293 files · ~567,641 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 4784 nodes · 17306 edges · 140 communities (112 shown, 28 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 506 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `1e70e901`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- touchlog.ts
- parse.ts
- main.ts
- num
- sync.ts
- spec.ts
- toLatex
- primitive.ts
- graph/preview.ts
- explain.ts
- sheet.ts
- editor/lists.ts
- svg.ts
- domain.ts
- SchemaEditor
- exact.ts
- SheetEditor
- compile
- numerical.ts
- explainPanel.ts
- index.ts
- engine.ts
- Board
- inference.ts
- BoardStore
- MathError
- assistant.ts
- .renderFormat
- supabase.ts
- several.ts
- gantt.ts
- view3d.ts
- search.ts
- editor.test.ts
- logic.ts
- NotesStore
- complex.ts
- namesIn
- localModels.ts
- resize.ts
- statsShown.ts
- Pt
- Rational
- study.ts
- functions.ts
- spreadsheet/editor.ts
- probability.ts
- vitest
- distributions.ts
- board/shapes.ts
- schemaBlocks
- sidePanel.ts
- toolbar.ts
- settings.ts
- MarkdownEditor
- latex.ts
- 20261004091555_note_condivise.sql
- board.ts
- tutorial.ts
- odesolve.ts
- graph.ts
- dependencies
- FoldersStore
- parseSchema
- Preview
- conics.ts
- icons.mjs
- formatNumber
- smoke-test.mjs
- Benvenuto in Glifo
- compilerOptions
- Dove sono le cose
- solve.ts
- blockMove.ts
- symbolic.ts
- Sheet
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- spreadsheet/format.ts
- session-start.sh
- .claude/CLAUDE.md
- blockMoveEditor.test.ts
- tutorial.mjs
- Abbonamenti
- spiegami-qwen.mjs
- supabase-stub.sql
- account-test.mjs
- Il database degli account (Supabase)
- devDependencies
- Parser
- editor/editor.ts
- plan.ts
- createFakeSupabase
- files.ts
- scripts
- fake-supabase.mjs
- limits.ts
- xlsx.ts
- page.ts
- markdown.ts
- graph/file.ts
- schemaTools.test.ts
- llmWorker.ts
- .openMenu
- Glifo – note per Claude
- Field
- Le spiegazioni, come funzionano
- spellcheck
- Piano per piano
- sql.ts
- Costi
- Glifo
- ui/preview.ts
- Idee per il futuro
- h
- La lavagna
- I modelli e le chiavi API
- calcResults.ts

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 220 edges
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

## Communities (140 total, 28 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.09
Nodes (26): at(), browserStore, clip(), isSaved(), KINDS, LOG_KEY, LOG_MAX_LINES, LogStore (+18 more)

### Community 1 - "parse.ts"
Cohesion: 0.07
Nodes (42): hasWord(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe() (+34 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (101): addToGraphBlock(), setGraphLabels(), graphsForFile(), hide(), remapGraphLines(), account, ACCOUNT_OFF, accountProblem() (+93 more)

### Community 3 - "num"
Cohesion: 0.10
Nodes (75): absOf(), splitAbs(), withoutAbs(), exp(), hyperbolicToExp(), inverseRational(), linearIn(), sqrtEx() (+67 more)

### Community 4 - "sync.ts"
Cohesion: 0.05
Nodes (38): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+30 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (85): conicItems(), isConicLine(), quadricEquation(), fourierItems(), isFourierLine(), isNumericalLine(), numericalItems(), MONTHS (+77 more)

### Community 6 - "toLatex"
Cohesion: 0.07
Nodes (93): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+85 more)

### Community 7 - "primitive.ts"
Cohesion: 0.17
Nodes (57): algebraic(), bigGcd(), byParts(), candidates(), canon(), combineLogs(), compareKeys(), exponentials() (+49 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (40): addLabel(), boxes, cameras, complexCoord(), coord(), drawings, drawnViews, endTex() (+32 more)

### Community 9 - "explain.ts"
Cohesion: 0.07
Nodes (50): allNames(), ChatFn, checkSteps(), engineHints(), explain(), EXPLAIN_TONES, ExplainError, ExplainEvents (+42 more)

### Community 10 - "sheet.ts"
Cohesion: 0.06
Nodes (52): formatGauss(), expSumValue(), FormatOptions, formatRational(), Eigenvalue, eigenvectors(), EXACT, FLOAT (+44 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.09
Nodes (62): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+54 more)

### Community 12 - "svg.ts"
Cohesion: 0.08
Nodes (59): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseWindow(), chooseY(), clipLines(), dataWindow() (+51 more)

### Community 13 - "domain.ts"
Cohesion: 0.08
Nodes (51): constantIntegrand(), depth(), inequalityMargin(), integralRegion, LayeredSolid, Multiple, multipleOf(), planeMargin() (+43 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.10
Nodes (6): isLanes(), SchemaEditor, withLaneContents(), createEdgeCell(), EdgeLook, serializeSchema()

### Community 15 - "exact.ts"
Cohesion: 0.16
Nodes (16): expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactFunction, ExactRandom, exactRoot() (+8 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (12): MenuEntry, SheetEditor, CellResult, formulaRefs(), isFormula(), normalizeFormula(), autoSum(), CellRange (+4 more)

### Community 17 - "compile"
Cohesion: 0.07
Nodes (48): argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot(), fieldOn(), numericPartials() (+40 more)

### Community 18 - "numerical.ts"
Cohesion: 0.12
Nodes (46): Funzionalità, bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial() (+38 more)

### Community 19 - "explainPanel.ts"
Cohesion: 0.15
Nodes (18): explainTarget, Explanation, REPLY_TOKENS, explanationMarkdown(), insertExplanation(), nextLineText(), regionToExplain(), targetAt() (+10 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (42): b, bigops, c, calculus, fn, fr, fractions, functions (+34 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 23 - "inference.ts"
Cohesion: 0.13
Nodes (27): Distribution, chiSquareTest(), confidence(), confidenceShown(), Given, hypothesisTest(), InferenceContext, interval() (+19 more)

### Community 24 - "BoardStore"
Cohesion: 0.05
Nodes (15): BoardOptions, BoardBackend, BoardStore, done(), fromRecord(), IdbBoards, MemoryBoards, ofNote() (+7 more)

### Community 25 - "MathError"
Cohesion: 0.12
Nodes (58): figureText(), linearItem(), MathError, angleBetween(), asMatrix(), basisOf(), circleText(), cross() (+50 more)

### Community 26 - "assistant.ts"
Cohesion: 0.18
Nodes (17): @anthropic-ai/sdk, AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible() (+9 more)

### Community 27 - ".renderFormat"
Cohesion: 0.18
Nodes (12): fieldInput(), edgeLook(), edgeStyle(), edgeTextAt(), insertSchema(), nodeLook(), nodeStyle(), readSchema() (+4 more)

### Community 28 - "supabase.ts"
Cohesion: 0.11
Nodes (31): @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken(), ensureSessionOf() (+23 more)

### Community 29 - "several.ts"
Cohesion: 0.09
Nodes (54): criticalLine(), isSeveralLine(), named(), severalItems(), surface(), scopeWith(), fractionNear(), convergesAt() (+46 more)

### Community 30 - "gantt.ts"
Cohesion: 0.06
Nodes (65): amount(), barColor(), crossings(), dateText(), dayOf(), fitText(), GanttOptions, ganttSvg() (+57 more)

### Community 31 - "view3d.ts"
Cohesion: 0.06
Nodes (89): staticGraphSvg(), tickLabel(), addMesh(), addTet(), affinePlane(), Axis, centroid(), chooseBox() (+81 more)

### Community 32 - "search.ts"
Cohesion: 0.16
Nodes (25): editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex() (+17 more)

### Community 33 - "editor.test.ts"
Cohesion: 0.07
Nodes (38): @codemirror/language, @codemirror/state, @codemirror/view, GraphLabelLines, InsertOptions, templateInsertion(), CODE_NODES, CommandToken (+30 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "NotesStore"
Cohesion: 0.07
Nodes (34): accountSpace(), adoptGuestNotes(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf(), setCurrentAccount() (+26 more)

### Community 36 - "complex.ts"
Cohesion: 0.06
Nodes (64): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexLine(), isComplexValue() (+56 more)

### Community 37 - "namesIn"
Cohesion: 0.13
Nodes (37): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+29 more)

### Community 38 - "localModels.ts"
Cohesion: 0.12
Nodes (18): LocalAbort, localErrorMessage(), localLlm, Pending, WorkerLike, ChatMessage, ChatOptions, FromWorker (+10 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "statsShown.ts"
Cohesion: 0.17
Nodes (32): check(), correlation(), count(), covariance(), Data, DATA_FUNCTIONS, dataStatistic(), deviation() (+24 more)

### Community 41 - "Pt"
Cohesion: 0.10
Nodes (14): clampZoom(), coalesced(), Finger, MoveAction, pointsOf(), pressureOf(), validView(), handleScale() (+6 more)

### Community 42 - "Rational"
Cohesion: 0.09
Nodes (54): Part, Rational, R(), rref(), choices(), gcd(), linearSystem(), matrixEquation() (+46 more)

### Community 43 - "study.ts"
Cohesion: 0.12
Nodes (40): close(), Definite, definiteIntegral(), exValue(), samples(), EMPTY_SCOPE, limit(), LimitValue (+32 more)

### Community 44 - "functions.ts"
Cohesion: 0.08
Nodes (57): EMPTY, evaluateSheet(), number(), SheetEvaluator, addFormat(), readInput(), FormulaNode, Ref (+49 more)

### Community 45 - "spreadsheet/editor.ts"
Cohesion: 0.06
Nodes (70): KINDS, sheetSummary(), WidgetBlock, WidgetKind, SchemaBlock, currentCall(), Editing, Move (+62 more)

### Community 46 - "probability.ts"
Cohesion: 0.08
Nodes (36): addExp(), End, exactIntervalProbability(), Family, integerRange(), intervalProbability(), subtractExp(), CompileOptions (+28 more)

### Community 47 - "vitest"
Cohesion: 0.06
Nodes (36): vite-plugin-pwa, vitest, formulaAtCursor(), specFor(), formulaGraph(), formulaGraphLine(), GraphItem, parseGraph() (+28 more)

### Community 48 - "distributions.ts"
Cohesion: 0.17
Nodes (27): choose(), continuousQuantile(), discreteQuantile(), factorialBig(), FAMILIES, integerParam(), invalid(), makeDistribution() (+19 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.14
Nodes (34): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+26 more)

### Community 50 - "schemaBlocks"
Cohesion: 0.20
Nodes (7): BlockWidget, findWidgetBlocks(), guardBlocks(), schemaBlocks(), create(), setup(), setup()

### Community 51 - "sidePanel.ts"
Cohesion: 0.11
Nodes (24): katex, insertGraphBlock(), SuggestionItem, graphBlockText(), cache, cleanKatexError(), renderTex(), renderTexOrError() (+16 more)

### Community 52 - "toolbar.ts"
Cohesion: 0.11
Nodes (23): insertBlock(), toggleLinePrefix(), wrapSelection(), LIST_STYLES, besideSchema(), schemaBlockRanges(), Action, createToolbar() (+15 more)

### Community 53 - "settings.ts"
Cohesion: 0.11
Nodes (23): DEFAULT_LOCAL_MODEL, addPersonalWord(), DICTIONARY_KEY, loadPersonalWords(), savePersonalWords(), tidy(), ACCOUNT_SETTINGS, accountSettings() (+15 more)

### Community 54 - "MarkdownEditor"
Cohesion: 0.10
Nodes (9): closeMathBlockOnEnter(), EditorCallbacks, MarkdownEditor, tabOutOfMath(), insertTemplate(), EditorMathContext, expand(), preferredIndex() (+1 more)

### Community 55 - "latex.ts"
Cohesion: 0.08
Nodes (50): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+42 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "board.ts"
Cohesion: 0.06
Nodes (49): Action, ACTION_NAMES, DOT_SIZES, DrawAction, EraseAction, EraserMode, HANDLE_REACH, ICON (+41 more)

### Community 58 - "tutorial.ts"
Cohesion: 0.15
Nodes (14): helpButton, openGuide(), HINT_MS, markSeen(), openTutorial(), show(), richText(), showTutorialHint() (+6 more)

### Community 59 - "odesolve.ts"
Cohesion: 0.07
Nodes (56): Piece, addWave(), arrange(), compiled(), Condition, constantNames(), constantParticular(), equalities() (+48 more)

### Community 60 - "graph.ts"
Cohesion: 0.06
Nodes (38): @maxgraph/core, AT_X, cellHtml(), cellText(), COMPASS, createGraph(), drawSchema(), isEdgeLook() (+30 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "FoldersStore"
Cohesion: 0.08
Nodes (19): cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder(), loadClosedFolders(), RemoteFolder (+11 more)

### Community 63 - "parseSchema"
Cohesion: 0.10
Nodes (25): schemaSummary(), svg(), base64(), hide(), OPEN, schemasForFile(), schemasFromFile(), unhide() (+17 more)

### Community 64 - "Preview"
Cohesion: 0.15
Nodes (3): hidden(), Preview, PreviewCallbacks

### Community 65 - "conics.ts"
Cohesion: 0.18
Nodes (29): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+21 more)

### Community 67 - "formatNumber"
Cohesion: 0.13
Nodes (25): valueLabel(), isTestLine(), number(), testItems(), classes(), dataOf(), distributionExtent(), distributionLabel() (+17 more)

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
Cohesion: 0.11
Nodes (34): FieldContext, names(), STUDY_GRAPH, studyItems(), Scope, FiniteContext, nameLatex(), LinearScope (+26 more)

### Community 73 - "blockMove.ts"
Cohesion: 0.18
Nodes (18): blank(), BlockMove, blockPlace(), closed(), closeIdx(), fenceClosed(), findBlock(), invisible() (+10 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (52): primitive(), verified(), linearCells(), atValues(), Converter, coordinates(), decimalText(), definiteParts() (+44 more)

### Community 75 - "Sheet"
Cohesion: 0.08
Nodes (28): ExactComplexScope, withWorkLimit(), FormattedResult, Mat, differentialRequest, pieces(), MathNode, chainOf() (+20 more)

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

### Community 82 - "blockMoveEditor.test.ts"
Cohesion: 0.19
Nodes (16): blockMoved, blockMoves(), blockMoveTransaction(), LineMap, contentHash(), fenceName(), MOVABLE, MoveFailure (+8 more)

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
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

### Community 101 - "editor/editor.ts"
Cohesion: 0.04
Nodes (59): description, name, private, type, version, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown (+51 more)

### Community 102 - "plan.ts"
Cohesion: 0.16
Nodes (17): cellText(), columnRole(), columnsOf(), durationUnit(), isNumber(), isPlanRange(), MAX_ACTIVITIES, plain() (+9 more)

### Community 103 - "createFakeSupabase"
Cohesion: 0.60
Nodes (6): createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 104 - "files.ts"
Cohesion: 0.11
Nodes (25): cache, capability(), ClaudeRuntime, hostDownloads, HostError, hostSample, inClaudeViewer(), ModelTier (+17 more)

### Community 105 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 106 - "fake-supabase.mjs"
Cohesion: 0.25
Nodes (6): @electric-sql/pglite, b64(), CODE, GOOGLE_CODE, ROOT, SUPABASE_URL

### Community 107 - "limits.ts"
Cohesion: 0.20
Nodes (18): exponentialForm(), fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), alternating() (+10 more)

### Community 108 - "xlsx.ts"
Cohesion: 0.10
Nodes (42): RFC-4180, fflate, csvDelimiter(), csvToSheet(), field(), italian(), parseCsv(), sheetToCsv() (+34 more)

### Community 110 - "page.ts"
Cohesion: 0.06
Nodes (50): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), currentAccount(), PullResult, openShareDialog(), changeAccess() (+42 more)

### Community 113 - "markdown.ts"
Cohesion: 0.18
Nodes (16): moveAttrs(), configurePurify(), createMarkdownIt(), FORBIDDEN_TAGS, HLJS_LANGUAGES, mathBlockRule(), mathInlineRule(), RenderEnv (+8 more)

### Community 116 - "graph/file.ts"
Cohesion: 0.09
Nodes (41): FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsFromFile(), OPEN, swatchSvg() (+33 more)

### Community 117 - "schemaTools.test.ts"
Cohesion: 0.18
Nodes (14): alignBoxes(), Alignment, Box, distributeBoxes(), Position, crc32(), svgSize(), svgToPng() (+6 more)

### Community 118 - "llmWorker.ts"
Cohesion: 0.26
Nodes (12): @mlc-ai/web-llm, chat(), GlifoError, Gpu, load(), post(), remove(), scope (+4 more)

### Community 120 - "Glifo – note per Claude"
Cohesion: 0.22
Nodes (9): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole (+1 more)

### Community 121 - "Field"
Cohesion: 0.12
Nodes (7): characteristicPolynomial(), eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn()

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "spellcheck"
Cohesion: 0.21
Nodes (8): spellcheck(), close(), misspelledAt(), openAt(), replace(), tooltipView(), SpellChecker, SpellcheckOptions

### Community 124 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 125 - "sql.ts"
Cohesion: 0.18
Nodes (17): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+9 more)

### Community 126 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, Quando lo studente dice di cominciare

### Community 127 - "Glifo"
Cohesion: 0.15
Nodes (13): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Glifo (+5 more)

### Community 128 - "ui/preview.ts"
Cohesion: 0.19
Nodes (14): remapLineKeys(), renameGraphScope(), renameScopeKeys(), BlockKind, MoveDir, fill(), hydrateSchemas(), hydrateSheets() (+6 more)

### Community 129 - "Idee per il futuro"
Cohesion: 0.33
Nodes (6): Account: i propri appunti su ogni dispositivo, anche da condividere, Idee per il futuro, In programma, La lavagna: idee in più, Più avanti, Schemi: idee in più

### Community 131 - "h"
Cohesion: 0.08
Nodes (46): SyncStatus, ExplainTone, AI_SERVICES, aiService, aiSettingsOf(), board, openSignedOut(), printButton() (+38 more)

### Community 132 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 136 - "I modelli e le chiavi API"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), In prova sul ramo `prova` (7 ottobre 2026): Qwen3 nel browser per «Spiegami», Le idee dello studente (5 ottobre 2026)

### Community 141 - "calcResults.ts"
Cohesion: 0.11
Nodes (16): acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult, calcResults(), CheckWidget, formulasUntil() (+8 more)

## Knowledge Gaps
- **641 isolated node(s):** `session-start.sh script`, `name`, `private`, `version`, `description` (+636 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 893 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **28 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `touchlog.ts`, `ui/preview.ts`, `main.ts`, `num`, `parse.ts`, `spec.ts`, `toLatex`, `primitive.ts`, `graph/preview.ts`, `explain.ts`, `sheet.ts`, `h`, `svg.ts`, `calcResults.ts`, `SchemaEditor`, `exact.ts`, `SheetEditor`, `compile`, `numerical.ts`, `explainPanel.ts`, `Board`, `inference.ts`, `BoardStore`, `MathError`, `assistant.ts`, `.renderFormat`, `supabase.ts`, `several.ts`, `gantt.ts`, `view3d.ts`, `logic.ts`, `NotesStore`, `complex.ts`, `namesIn`, `localModels.ts`, `Pt`, `Rational`, `study.ts`, `functions.ts`, `spreadsheet/editor.ts`, `vitest`, `board/shapes.ts`, `schemaBlocks`, `toolbar.ts`, `settings.ts`, `MarkdownEditor`, `latex.ts`, `board.ts`, `tutorial.ts`, `odesolve.ts`, `graph.ts`, `Preview`, `conics.ts`, `smoke-test.mjs`, `blockMove.ts`, `symbolic.ts`, `Sheet`, `schema/editor.ts`, `spreadsheet/format.ts`, `blockMoveEditor.test.ts`, `plan.ts`, `files.ts`, `limits.ts`, `xlsx.ts`, `markdown.ts`, `graph/file.ts`, `schemaTools.test.ts`, `llmWorker.ts`?**
  _High betweenness centrality (0.170) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `touchlog.ts`, `parse.ts`, `ui/preview.ts`, `h`, `sync.ts`, `main.ts`, `num`, `explain.ts`, `sheet.ts`, `editor/lists.ts`, `svg.ts`, `domain.ts`, `compile`, `BoardStore`, `assistant.ts`, `supabase.ts`, `gantt.ts`, `view3d.ts`, `search.ts`, `editor.test.ts`, `NotesStore`, `localModels.ts`, `resize.ts`, `Rational`, `spreadsheet/editor.ts`, `distributions.ts`, `board/shapes.ts`, `schemaBlocks`, `sidePanel.ts`, `toolbar.ts`, `settings.ts`, `board.ts`, `tutorial.ts`, `FoldersStore`, `parseSchema`, `Dove sono le cose`, `Sheet`, `spreadsheet/format.ts`, `blockMoveEditor.test.ts`, `editor/editor.ts`, `plan.ts`, `xlsx.ts`, `page.ts`, `markdown.ts`, `graph/file.ts`, `schemaTools.test.ts`, `sql.ts`?**
  _High betweenness centrality (0.125) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `ui/preview.ts`, `main.ts`, `graph/preview.ts`, `SchemaEditor`, `SheetEditor`, `explainPanel.ts`, `Board`, `.renderFormat`, `gantt.ts`, `resize.ts`, `spreadsheet/editor.ts`, `sidePanel.ts`, `toolbar.ts`, `board.ts`, `tutorial.ts`, `FoldersStore`, `Preview`, `schema/editor.ts`, `spreadsheet/format.ts`, `editor/editor.ts`, `files.ts`, `page.ts`, `.openMenu`, `spellcheck`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **Are the 219 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `adoptGuestNotes()`) actually correct?**
  _`Dove sono le cose` has 219 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `name`, `private` to the rest of the system?**
  _641 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `touchlog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08673469387755102 - nodes in this community are weakly interconnected._
- **Should `parse.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07292929292929293 - nodes in this community are weakly interconnected._