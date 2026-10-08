# Graph Report - matherdown  (2026-10-08)

## Corpus Check
- 299 files · ~583,410 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 4905 nodes · 17804 edges · 155 communities (121 shown, 34 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 551 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `dd229a3f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- touchlog.ts
- parse.ts
- main.ts
- compile
- sync.ts
- spec.ts
- arithmetic.ts
- num
- graph/preview.ts
- Dove sono le cose
- sheet.ts
- editor/lists.ts
- svg.ts
- dialogs.ts
- SchemaEditor
- exact.ts
- SheetEditor
- linear.test.ts
- numerical.ts
- aiPanel.ts
- index.ts
- engine.ts
- graphNote.test.ts
- topics.ts
- BoardStore
- MathError
- assistant.ts
- graph.ts
- Rational
- several.ts
- gantt.ts
- graph/space.ts
- search.ts
- editor/editor.ts
- logic.ts
- NotesStore
- complex.ts
- namesIn
- view3d.ts
- resize.ts
- formatNumber
- Board
- solve.ts
- study.ts
- functions.ts
- finite.ts
- spreadsheet/evaluate.ts
- vitest
- distributions.ts
- board/shapes.ts
- schemaGuard.test.ts
- icon
- suggestions.ts
- supabase.ts
- parseSchema
- toolbar.ts
- 20261004091555_note_condivise.sql
- board.ts
- openShareDialog
- odesolve.ts
- schema/shapes.ts
- dependencies
- devDependencies
- .constructor
- ui/preview.ts
- conics.ts
- icons.mjs
- statsGraph.ts
- smoke-test.mjs
- Benvenuto in Glifo
- compilerOptions
- strokes.ts
- toLatex
- FoldersStore
- symbolic.ts
- Sheet
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- plan.ts
- session-start.sh
- .claude/CLAUDE.md
- blockMove.ts
- tutorial.mjs
- Abbonamenti
- spiegami-qwen.mjs
- supabase-stub.sql
- account-test.mjs
- Il database degli account (Supabase)
- Pt
- Parser
- spell.test.ts
- Glifo
- domain.ts
- files.ts
- editor.test.ts
- fake-supabase.mjs
- explainPanel.ts
- xlsx.ts
- page.ts
- markdown.ts
- spreadsheet/editor.ts
- Piano per piano
- Costi
- Idee per il futuro
- Glifo – note per Claude
- .int
- Le spiegazioni, come funzionano
- toNode
- La lavagna
- sql.ts
- I modelli e le chiavi API
- deploy.test.ts
- calcPlugin
- graph/file.ts
- h
- laplace.ts
- probability.ts
- severalGraph.ts
- schemaTools.test.ts
- gauss.ts
- sidePanel.ts
- downloadText
- ExplainPanel
- llmWorker.ts
- scripts
- ExplainChat
- createFakeSupabase
- SheetModel

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 256 edges
2. `MathError` - 151 edges
3. `num()` - 145 edges
4. `Sheet` - 139 edges
5. `MathNode` - 129 edges
6. `mul()` - 124 edges
7. `Board` - 118 edges
8. `compile()` - 113 edges
9. `Rational` - 111 edges
10. `h()` - 107 edges

## Surprising Connections (you probably didn't know these)
- `Dove sono le cose` --references--> `fakeLlmWorker()`  [INFERRED]
  ARCHITETTURA.md → scripts/smoke-test.mjs
- `Come viene pubblicata` --references--> `dist()`  [INFERRED]
  README.md → src/board/shapes.ts
- `Dove sono le cose` --references--> `ConicElements`  [INFERRED]
  ARCHITETTURA.md → src/math/conics.ts
- `Funzionalità` --references--> `k()`  [INFERRED]
  README.md → src/math/numerical.ts
- `Dove sono le cose` --references--> `texts()`  [INFERRED]
  ARCHITETTURA.md → tests/boardTouchLog.test.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (155 total, 34 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.09
Nodes (27): at(), browserStore, clip(), isSaved(), KINDS, LOG_KEY, LOG_MAX_LINES, LogStore (+19 more)

### Community 1 - "parse.ts"
Cohesion: 0.08
Nodes (37): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe(), differentialInFraction() (+29 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (108): graphsForFile(), graphsFromFile(), hide(), unhide(), remapGraphLines(), remapLineKeys(), account, ACCOUNT_OFF (+100 more)

### Community 3 - "compile"
Cohesion: 0.09
Nodes (41): argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot(), fieldOn(), numericPartials() (+33 more)

### Community 4 - "sync.ts"
Cohesion: 0.05
Nodes (38): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+30 more)

### Community 5 - "spec.ts"
Cohesion: 0.07
Nodes (71): conicItems(), isConicLine(), quadricEquation(), areaOf(), AXES, ComplexDefinitions, complexValue(), condLabel() (+63 more)

### Community 6 - "arithmetic.ts"
Cohesion: 0.11
Nodes (47): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+39 more)

### Community 7 - "num"
Cohesion: 0.14
Nodes (82): atIntegers(), withoutAbs(), hyperbolicToExp(), polyEx(), similarSolution(), algebraic(), bigGcd(), byParts() (+74 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (40): FIGURE_PALETTE, addLabel(), boxes, cameras, complexCoord(), containing(), coord(), drawings (+32 more)

### Community 9 - "Dove sono le cose"
Cohesion: 0.06
Nodes (67): Dove sono le cose, Glifo – architettura, allNames(), answerFollowUp(), CHAT_SUBJECT, chatContext, ChatFn, chatSystemPrompt() (+59 more)

### Community 10 - "sheet.ts"
Cohesion: 0.06
Nodes (49): Ode, OdeFunction, decimalSeparator(), Digits, formatRational(), fromNumber(), fromRational(), SUPERSCRIPT (+41 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.09
Nodes (61): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+53 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (54): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), dataWindow(), domainEdge() (+46 more)

### Community 13 - "dialogs.ts"
Cohesion: 0.08
Nodes (28): EXPLAIN_TONES, ExplainTone, DEFAULT_LOCAL_MODEL, AI_SERVICES, aiService, MarkdownEditor, ACCOUNT_SETTINGS, accountSettings() (+20 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.09
Nodes (10): fieldInput(), isLanes(), SchemaEditor, withLaneContents(), cellText(), isNodeLook(), nodeLook(), laneNames() (+2 more)

### Community 15 - "exact.ts"
Cohesion: 0.16
Nodes (16): expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactFunction, ExactRandom, exactRoot() (+8 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (9): currentCall(), MenuEntry, SheetEditor, CellResult, normalizeFormula(), FunctionSpec, CellRange, clearRange() (+1 more)

### Community 17 - "linear.test.ts"
Cohesion: 0.13
Nodes (17): errorMessage(), MathSyntaxError, parseMath(), parseStatement(), tex(), text(), A, B (+9 more)

### Community 18 - "numerical.ts"
Cohesion: 0.11
Nodes (47): bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial(), interpolating() (+39 more)

### Community 19 - "aiPanel.ts"
Cohesion: 0.16
Nodes (17): NoteSubject, texHtml(), checkHtml(), checkTitle(), cache, escapeHtml(), renderTex(), renderTexMathml() (+9 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (41): b, bigops, c, calculus, fn, fr, fractions, functions (+33 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "graphNote.test.ts"
Cohesion: 0.09
Nodes (46): @codemirror/language, @codemirror/state, @codemirror/view, @lezer/common, explainTarget, acceptCalcResult(), CalcCheck, calcOutcomes() (+38 more)

### Community 23 - "topics.ts"
Cohesion: 0.10
Nodes (35): ATTRIBUTES, count(), cut(), definedName(), ER_SHAPES, fieldText(), fitLines(), flowOrder() (+27 more)

### Community 24 - "BoardStore"
Cohesion: 0.06
Nodes (14): BoardOptions, BoardBackend, BoardStore, done(), IdbBoards, MemoryBoards, ofNote(), openBoardDatabase() (+6 more)

### Community 25 - "MathError"
Cohesion: 0.12
Nodes (57): MathError, angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, dataOf() (+49 more)

### Community 26 - "assistant.ts"
Cohesion: 0.09
Nodes (26): @anthropic-ai/sdk, AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible() (+18 more)

### Community 27 - "graph.ts"
Cohesion: 0.14
Nodes (22): AT_X, COMPASS, createEdgeCell(), createGraph(), drawSchema(), edgeLook(), edgeStyle(), edgeTextAt() (+14 more)

### Community 28 - "Rational"
Cohesion: 0.10
Nodes (48): Part, Rational, choices(), exText(), gcd(), matrixSystem(), minorsGcd(), ONE (+40 more)

### Community 29 - "several.ts"
Cohesion: 0.09
Nodes (50): Definite, Piece, LimitValue, severalLimit, Condition, Family, Group, Root (+42 more)

### Community 30 - "gantt.ts"
Cohesion: 0.06
Nodes (69): amount(), barColor(), crossings(), dateText(), dayOf(), fitText(), GanttOptions, ganttSvg() (+61 more)

### Community 31 - "graph/space.ts"
Cohesion: 0.13
Nodes (41): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+33 more)

### Community 32 - "search.ts"
Cohesion: 0.17
Nodes (24): editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex() (+16 more)

### Community 33 - "editor/editor.ts"
Cohesion: 0.06
Nodes (33): description, name, private, type, version, @codemirror/autocomplete, @codemirror/language-data, @codemirror/search (+25 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "NotesStore"
Cohesion: 0.08
Nodes (31): accountSpace(), adoptGuestNotes(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf(), setCurrentAccount() (+23 more)

### Community 36 - "complex.ts"
Cohesion: 0.07
Nodes (48): add(), allRoots(), arg(), asin(), atan(), compileApply(), compileComplex(), compileFunction() (+40 more)

### Community 37 - "namesIn"
Cohesion: 0.15
Nodes (34): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+26 more)

### Community 38 - "view3d.ts"
Cohesion: 0.09
Nodes (41): tickLabel(), Face, lerp(), planeSide(), planeTolerance(), regionFaces(), splitFace(), splitLine() (+33 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "formatNumber"
Cohesion: 0.15
Nodes (35): endTex(), formatNumber(), complexText(), formatEigenvalues(), check(), correlation(), count(), covariance() (+27 more)

### Community 41 - "Board"
Cohesion: 0.09
Nodes (4): Board, clampZoom(), validView(), BoardTheme

### Community 42 - "solve.ts"
Cohesion: 0.09
Nodes (43): exponentialForm(), fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), alternating() (+35 more)

### Community 43 - "study.ts"
Cohesion: 0.16
Nodes (32): limit(), Asymptote, boundaries(), compiled(), cutsOf(), defined(), domainOf(), exact() (+24 more)

### Community 44 - "functions.ts"
Cohesion: 0.12
Nodes (43): boolArg(), BY_NAME, conditional(), criterion(), Ctx, define(), EURO, exact() (+35 more)

### Community 45 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 46 - "spreadsheet/evaluate.ts"
Cohesion: 0.09
Nodes (37): KINDS, sheetSummary(), WidgetBlock, SchemaBlock, EMPTY, evaluateSheet(), number(), SheetEvaluator (+29 more)

### Community 47 - "vitest"
Cohesion: 0.05
Nodes (46): vitest, staticGraphSvg(), chooseWindow(), Box, chooseBox(), GraphItem, parseGraph(), DrawOptions (+38 more)

### Community 48 - "distributions.ts"
Cohesion: 0.07
Nodes (62): addExp(), choose(), continuousQuantile(), discreteQuantile(), Distribution, exactIntervalProbability(), expSumValue(), factorialBig() (+54 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (35): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+27 more)

### Community 50 - "schemaGuard.test.ts"
Cohesion: 0.12
Nodes (14): toggleLinePrefix(), LIST_STYLES, besideSchema(), BlockWidget, findWidgetBlocks(), guardBlocks(), schemaBlockRanges(), schemaBlocks() (+6 more)

### Community 51 - "icon"
Cohesion: 0.20
Nodes (4): icon(), displayCode(), preventFocusSteal(), SidePanel

### Community 52 - "suggestions.ts"
Cohesion: 0.19
Nodes (7): templateInsertion(), EditorMathContext, expand(), preferredIndex(), SuggestionController, parseTemplate(), templateText()

### Community 53 - "supabase.ts"
Cohesion: 0.11
Nodes (36): @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken(), ensureSessionOf() (+28 more)

### Community 54 - "parseSchema"
Cohesion: 0.08
Nodes (34): schemaSummary(), svg(), base64(), hide(), OPEN, schemasForFile(), schemasFromFile(), unhide() (+26 more)

### Community 55 - "toolbar.ts"
Cohesion: 0.10
Nodes (18): closeMathBlockOnEnter(), EditorCallbacks, insertBlock(), insertTemplate(), wrapSelection(), Action, createToolbar(), insertCode() (+10 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "board.ts"
Cohesion: 0.06
Nodes (55): Action, ACTION_NAMES, DOT_SIZES, DrawAction, EraseAction, EraserMode, HANDLE_REACH, ICON (+47 more)

### Community 58 - "openShareDialog"
Cohesion: 0.09
Nodes (35): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), PullResult, openShareDialog(), changeAccess(), changeCopy() (+27 more)

### Community 59 - "odesolve.ts"
Cohesion: 0.08
Nodes (82): addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames(), constantParticular() (+74 more)

### Community 60 - "schema/shapes.ts"
Cohesion: 0.08
Nodes (17): @maxgraph/core, ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape (+9 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

### Community 64 - "ui/preview.ts"
Cohesion: 0.10
Nodes (17): GraphLabels, hydrateGraphs(), renameGraphScope(), renameScopeKeys(), setPrinting(), BlockKind, MoveDir, hydrateSheets() (+9 more)

### Community 65 - "conics.ts"
Cohesion: 0.18
Nodes (29): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+21 more)

### Community 67 - "statsGraph.ts"
Cohesion: 0.14
Nodes (21): isTestLine(), number(), testItems(), figureText(), linearItem(), tryFormat(), classes(), dataOf() (+13 more)

### Community 68 - "smoke-test.mjs"
Cohesion: 0.29
Nodes (4): markdown-it, fakeLlmWorker(), firstVisit(), plainContext

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "strokes.ts"
Cohesion: 0.10
Nodes (33): Prefs, BOARD_PALETTES, BoardPalette, highlightName(), inkName(), mid(), outlineSvg(), PEN_SIZE (+25 more)

### Community 72 - "toLatex"
Cohesion: 0.11
Nodes (34): isNumericalLine(), numericalItems(), areaFor(), multipleLabel(), names(), studyItems(), ACCENT_COMMANDS, COMPLEX_FUNCTIONS (+26 more)

### Community 73 - "FoldersStore"
Cohesion: 0.08
Nodes (17): cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder(), loadClosedFolders(), RemoteFolder (+9 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (59): primitive(), verified(), linearCells(), assumePositive(), atValues(), commonPositive(), Converter, coordinates() (+51 more)

### Community 75 - "Sheet"
Cohesion: 0.07
Nodes (29): GaussLine, Definition, Line, withWorkLimit(), FiniteContext, FormattedResult, Mat, differentialRequest (+21 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.05
Nodes (60): ALIGN, ARROW_NAMES, AT_ICONS, AT_NAMES, BASE_PRESETS, BIG_ARROWS, DB_PRESETS, Direction (+52 more)

### Community 79 - "plan.ts"
Cohesion: 0.09
Nodes (42): at(), breakEven(), Point, quantity(), tableItems(), textLabel(), chartData, chartFrom() (+34 more)

### Community 82 - "blockMove.ts"
Cohesion: 0.10
Nodes (35): @codemirror/commands, blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove, blockPlace() (+27 more)

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

### Community 98 - "Pt"
Cohesion: 0.15
Nodes (11): coalesced(), Finger, LassoAction, PanAction, PinchAction, pointsOf(), pressureOf(), EllipseFit (+3 more)

### Community 101 - "spell.test.ts"
Cohesion: 0.07
Nodes (28): @codemirror/lang-markdown, noIndentedCode, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close() (+20 more)

### Community 102 - "Glifo"
Cohesion: 0.14
Nodes (14): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Funzionalità (+6 more)

### Community 103 - "domain.ts"
Cohesion: 0.09
Nodes (50): constantIntegrand(), depth(), inequalityMargin(), integralRegion, LayeredSolid, Multiple, multipleOf(), planeMargin() (+42 more)

### Community 104 - "files.ts"
Cohesion: 0.24
Nodes (13): inClaudeViewer(), canWriteFilesDirectly(), FsWindow, isAbort(), MD_TYPES, OPEN_TYPES, OpenedFile, openMarkdownFiles() (+5 more)

### Community 105 - "editor.test.ts"
Cohesion: 0.09
Nodes (24): tabOutOfMath(), InsertOptions, commandTokenAt(), isInCode(), mathContextAt(), openMathBefore(), addPlaceholders, buildDecorations() (+16 more)

### Community 106 - "fake-supabase.mjs"
Cohesion: 0.25
Nodes (6): @electric-sql/pglite, b64(), CODE, GOOGLE_CODE, ROOT, SUPABASE_URL

### Community 107 - "explainPanel.ts"
Cohesion: 0.10
Nodes (24): Explanation, FollowUp, REPLY_TOKENS, LocalAbort, localErrorMessage(), localLlm, Pending, WorkerLike (+16 more)

### Community 108 - "xlsx.ts"
Cohesion: 0.08
Nodes (51): RFC-4180, fflate, csvDelimiter(), csvToSheet(), field(), italian(), parseCsv(), sheetToCsv() (+43 more)

### Community 110 - "page.ts"
Cohesion: 0.10
Nodes (22): katex, currentAccount(), sidebarToggle(), SharedNote, body, draw(), isDark(), saveButton (+14 more)

### Community 113 - "markdown.ts"
Cohesion: 0.11
Nodes (30): dataRange(), moveAttrs(), renderTexOrError(), renderTexWithResult(), configurePurify(), createMarkdownIt(), FORBIDDEN_TAGS, HLJS_LANGUAGES (+22 more)

### Community 116 - "spreadsheet/editor.ts"
Cohesion: 0.09
Nodes (52): openSheet(), saveSheetBlock(), tablesNote(), Editing, Move, openSheetEditor(), PATHS, rangeLabel() (+44 more)

### Community 117 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 118 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, Quando lo studente dice di cominciare

### Community 119 - "Idee per il futuro"
Cohesion: 0.33
Nodes (6): Account: i propri appunti su ogni dispositivo, anche da condividere, Idee per il futuro, In programma, La lavagna: idee in più, Più avanti, Schemi: idee in più

### Community 120 - "Glifo – note per Claude"
Cohesion: 0.22
Nodes (9): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole (+1 more)

### Community 121 - ".int"
Cohesion: 0.11
Nodes (8): characteristicPolynomial(), eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn(), R()

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "toNode"
Cohesion: 0.11
Nodes (37): close(), definiteIntegral(), exValue(), samples(), EMPTY_SCOPE, scopeWith(), FormatOptions, absOf() (+29 more)

### Community 124 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 125 - "sql.ts"
Cohesion: 0.17
Nodes (18): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+10 more)

### Community 126 - "I modelli e le chiavi API"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), In prova sul ramo `prova` (7 ottobre 2026): Qwen3 nel browser per «Spiegami», Le idee dello studente (5 ottobre 2026)

### Community 128 - "calcPlugin"
Cohesion: 0.16
Nodes (4): calcPlugin, CheckWidget, ResultWidget, valueNode()

### Community 129 - "graph/file.ts"
Cohesion: 0.11
Nodes (33): figureName(), graphFigure(), graphImage(), graphImagesFor(), OPEN, swatchSvg(), titleBand(), ACCENTS (+25 more)

### Community 131 - "h"
Cohesion: 0.07
Nodes (43): SyncStatus, helpButton, openGuide(), showProblem(), AccountButton, confirmAccountDeletion(), messageOf(), openAccountDialog() (+35 more)

### Community 132 - "laplace.ts"
Cohesion: 0.16
Nodes (29): factoredPolynomial(), beyondPoles(), compiled(), E, exp(), fractionShown(), HALF, inverseLaplaceShown() (+21 more)

### Community 133 - "probability.ts"
Cohesion: 0.11
Nodes (27): End, Family, CompileOptions, ExactScope, ALL, compileOf(), complement(), distributionOf() (+19 more)

### Community 136 - "severalGraph.ts"
Cohesion: 0.21
Nodes (16): FieldContext, fourierItems(), isFourierLine(), criticalLine(), isSeveralLine(), named(), severalItems(), surface() (+8 more)

### Community 137 - "schemaTools.test.ts"
Cohesion: 0.16
Nodes (19): laneOf(), alignBoxes(), Alignment, Box, distributeBoxes(), Position, cellHtml(), labelHtml() (+11 more)

### Community 138 - "gauss.ts"
Cohesion: 0.17
Nodes (19): COMPLEX_FUNCTIONS, farthest(), gaussItem(), hasExponential(), inZ(), isComplexLine(), isComplexValue(), isInequality() (+11 more)

### Community 139 - "sidePanel.ts"
Cohesion: 0.18
Nodes (14): aiSettingsOf(), SuggestionItem, cleanKatexError(), isConfidentAnswer(), CATEGORIES, symbolsInCategory(), cardPreviewTex(), formPreviewTex() (+6 more)

### Community 140 - "downloadText"
Cohesion: 0.22
Nodes (7): loadDialect(), SchemaEditorOptions, Schema, serializeSchema(), downloadBlob(), downloadText(), fileNameFor()

### Community 141 - "ExplainPanel"
Cohesion: 0.14
Nodes (9): ExplainEvents, explanationMarkdown(), insertAfterBlock(), insertAfterText(), insertExplanation(), nextLineText(), ExplainPanel, preventFocusSteal() (+1 more)

### Community 142 - "llmWorker.ts"
Cohesion: 0.26
Nodes (12): @mlc-ai/web-llm, chat(), GlifoError, Gpu, load(), post(), remove(), scope (+4 more)

### Community 143 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 145 - "createFakeSupabase"
Cohesion: 0.60
Nodes (6): createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 146 - "SheetModel"
Cohesion: 0.47
Nodes (4): SheetEditorOptions, Snapshot, SheetModel, XlsxSheet

## Knowledge Gaps
- **658 isolated node(s):** `session-start.sh script`, `name`, `private`, `version`, `description` (+653 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 919 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **34 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `touchlog.ts`, `graph/file.ts`, `main.ts`, `compile`, `parse.ts`, `spec.ts`, `arithmetic.ts`, `num`, `graph/preview.ts`, `severalGraph.ts`, `gauss.ts`, `sheet.ts`, `svg.ts`, `ExplainPanel`, `llmWorker.ts`, `exact.ts`, `SchemaEditor`, `schemaTools.test.ts`, `numerical.ts`, `aiPanel.ts`, `SheetEditor`, `dialogs.ts`, `graphNote.test.ts`, `topics.ts`, `BoardStore`, `MathError`, `assistant.ts`, `h`, `Rational`, `several.ts`, `gantt.ts`, `graph/space.ts`, `logic.ts`, `NotesStore`, `complex.ts`, `namesIn`, `view3d.ts`, `Board`, `solve.ts`, `study.ts`, `functions.ts`, `finite.ts`, `spreadsheet/evaluate.ts`, `vitest`, `distributions.ts`, `board/shapes.ts`, `schemaGuard.test.ts`, `icon`, `supabase.ts`, `parseSchema`, `toolbar.ts`, `board.ts`, `odesolve.ts`, `schema/shapes.ts`, `ui/preview.ts`, `conics.ts`, `statsGraph.ts`, `smoke-test.mjs`, `strokes.ts`, `toLatex`, `symbolic.ts`, `Sheet`, `schema/editor.ts`, `plan.ts`, `blockMove.ts`, `Pt`, `files.ts`, `explainPanel.ts`, `xlsx.ts`, `page.ts`, `markdown.ts`, `spreadsheet/editor.ts`, `toNode`?**
  _High betweenness centrality (0.163) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `touchlog.ts`, `graph/file.ts`, `main.ts`, `h`, `sync.ts`, `num`, `Dove sono le cose`, `schemaTools.test.ts`, `editor/lists.ts`, `svg.ts`, `dialogs.ts`, `sidePanel.ts`, `linear.test.ts`, `graphNote.test.ts`, `topics.ts`, `BoardStore`, `assistant.ts`, `Rational`, `gantt.ts`, `search.ts`, `editor/editor.ts`, `NotesStore`, `resize.ts`, `distributions.ts`, `board/shapes.ts`, `schemaGuard.test.ts`, `supabase.ts`, `parseSchema`, `board.ts`, `openShareDialog`, `ui/preview.ts`, `strokes.ts`, `FoldersStore`, `Sheet`, `plan.ts`, `blockMove.ts`, `spell.test.ts`, `editor.test.ts`, `explainPanel.ts`, `xlsx.ts`, `page.ts`, `markdown.ts`, `spreadsheet/editor.ts`, `sql.ts`, `deploy.test.ts`?**
  _High betweenness centrality (0.116) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `main.ts`, `graph/preview.ts`, `sidePanel.ts`, `downloadText`, `dialogs.ts`, `SchemaEditor`, `ExplainPanel`, `SheetEditor`, `ExplainChat`, `aiPanel.ts`, `gantt.ts`, `resize.ts`, `Board`, `icon`, `toolbar.ts`, `board.ts`, `openShareDialog`, `.constructor`, `ui/preview.ts`, `FoldersStore`, `schema/editor.ts`, `plan.ts`, `spell.test.ts`, `explainPanel.ts`, `page.ts`, `spreadsheet/editor.ts`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **Are the 255 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `adoptGuestNotes()`) actually correct?**
  _`Dove sono le cose` has 255 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `name`, `private` to the rest of the system?**
  _658 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `touchlog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08653061224489796 - nodes in this community are weakly interconnected._
- **Should `parse.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08087891538101917 - nodes in this community are weakly interconnected._