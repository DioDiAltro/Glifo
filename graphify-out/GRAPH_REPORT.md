# Graph Report - matherdown  (2026-10-08)

## Corpus Check
- 305 files · ~591,576 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 4958 nodes · 17954 edges · 150 communities (117 shown, 33 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 568 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b2623ed9`
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
- explain.ts
- view3d.ts
- editor/lists.ts
- svg.ts
- graph.ts
- SchemaEditor
- schemaTools.test.ts
- h
- limits.ts
- numerical.ts
- aiPanel.ts
- index.ts
- engine.ts
- graphNote.test.ts
- topics.ts
- BoardStore
- MathError
- assistant.ts
- MarkdownEditor
- fourier.ts
- several.ts
- gantt.ts
- plan.ts
- sidePanel.ts
- devDependencies
- logic.ts
- NotesStore
- complex.ts
- namesIn
- graph/space.ts
- resize.ts
- sheet.ts
- Board
- solve.ts
- toLatex
- functions.ts
- finite.ts
- FoldersStore
- numerical.test.ts
- distributions.ts
- board/shapes.ts
- laplace.ts
- SidePanel
- dialogs.ts
- page.ts
- gauss.ts
- dom.ts
- 20261004091555_note_condivise.sql
- board.ts
- Dove sono le cose
- odesolve.ts
- schema/shapes.ts
- dependencies
- ExplainChat
- editor.test.ts
- ui/preview.ts
- conics.ts
- spreadsheet/editor.ts
- statsGraph.ts
- smoke-test.mjs
- Benvenuto in Glifo
- compilerOptions
- strokes.ts
- inference.ts
- icon
- symbolic.ts
- evaluateExactComplex
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
- Costi
- supabase-stub.sql
- account-test.mjs
- Il database degli account (Supabase)
- Pt
- Distribution
- vitest
- supabase.ts
- files.ts
- Glifo
- touchLog
- fake-supabase.mjs
- explainPanel.ts
- xlsx.ts
- llmWorker.ts
- markdown.ts
- spreadsheet/format.ts
- Piano per piano
- ExplainPanel
- probability.ts
- siteUpdate.ts
- .constructor
- Le spiegazioni, come funzionano
- .folderItem
- Sheet
- sql.ts
- boardTouchLog.test.ts
- compileComplex
- createFakeSupabase
- planPreview.ts
- tutorial.ts
- Rational
- Parser
- 20261008130026_commenti.sql
- Glifo – note per Claude
- grafo-html.mjs
- logo.ts
- Più avanti

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 269 edges
2. `MathError` - 151 edges
3. `num()` - 145 edges
4. `Sheet` - 139 edges
5. `MathNode` - 129 edges
6. `mul()` - 124 edges
7. `Board` - 118 edges
8. `compile()` - 113 edges
9. `Rational` - 111 edges
10. `h()` - 109 edges

## Surprising Connections (you probably didn't know these)
- `Dove sono le cose` --references--> `fakeLlmWorker()`  [INFERRED]
  ARCHITETTURA.md → scripts/smoke-test.mjs
- `Dove sono le cose` --references--> `WidgetKind`  [INFERRED]
  ARCHITETTURA.md → src/editor/schemaBlocks.ts
- `Dove sono le cose` --references--> `ConicElements`  [INFERRED]
  ARCHITETTURA.md → src/math/conics.ts
- `Dove sono le cose` --references--> `texts()`  [INFERRED]
  ARCHITETTURA.md → tests/boardTouchLog.test.ts
- `Funzionalità` --references--> `k()`  [INFERRED]
  README.md → src/math/numerical.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (150 total, 33 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.15
Nodes (16): at(), browserStore, clip(), KINDS, LOG_KEY, Moves, MOVES_MAX, pointerDetail() (+8 more)

### Community 1 - "parse.ts"
Cohesion: 0.08
Nodes (40): hasWord(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe() (+32 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (109): graphsForFile(), hide(), account, ACCOUNT_OFF, active, aiToggle, app, applySpellcheck() (+101 more)

### Community 3 - "compile"
Cohesion: 0.04
Nodes (99): depth(), integralRegion, LayeredSolid, Multiple, PlanePart, criticalLine(), named(), severalItems() (+91 more)

### Community 4 - "sync.ts"
Cohesion: 0.05
Nodes (38): @electric-sql/pglite, AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow (+30 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (102): conicItems(), isConicLine(), quadricEquation(), fourierItems(), isFourierLine(), isTestLine(), constantIntegrand(), inequalityMargin() (+94 more)

### Community 6 - "arithmetic.ts"
Cohesion: 0.10
Nodes (45): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+37 more)

### Community 7 - "num"
Cohesion: 0.12
Nodes (97): atIntegers(), oneFraction(), withoutAbs(), oneFraction(), polyEx(), constantParticular(), exp(), expOf() (+89 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (43): addLabel(), boxes, cameras, complexCoord(), containing(), coord(), drawings, drawnViews (+35 more)

### Community 9 - "explain.ts"
Cohesion: 0.06
Nodes (69): allNames(), answerFollowUp(), bareResult(), CHAT_SUBJECT, chatContext, ChatFn, chatSystemPrompt(), checkFormulas() (+61 more)

### Community 10 - "view3d.ts"
Cohesion: 0.07
Nodes (53): FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsFromFile(), OPEN, swatchSvg() (+45 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.09
Nodes (62): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+54 more)

### Community 12 - "svg.ts"
Cohesion: 0.05
Nodes (85): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), staticGraphSvg(), chooseWindow(), chooseY(), clipLines() (+77 more)

### Community 13 - "graph.ts"
Cohesion: 0.10
Nodes (31): fieldInput(), AT_X, cellText(), COMPASS, createEdgeCell(), createGraph(), drawSchema(), edgeLook() (+23 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.11
Nodes (4): isLanes(), SchemaEditor, withLaneContents(), serializeSchema()

### Community 15 - "schemaTools.test.ts"
Cohesion: 0.13
Nodes (25): laneOf(), alignBoxes(), Alignment, Box, distributeBoxes(), Position, cellHtml(), crc32() (+17 more)

### Community 16 - "h"
Cohesion: 0.08
Nodes (8): rangeLabel(), SheetEditor, CellRange, clearRange(), cloneSheet(), setCell(), confirmDialog(), h()

### Community 17 - "limits.ts"
Cohesion: 0.18
Nodes (20): exponentialForm(), fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), kronrod() (+12 more)

### Community 18 - "numerical.ts"
Cohesion: 0.11
Nodes (51): isNumericalLine(), numericalItems(), FormatOptions, bisection(), cholesky(), condition(), derivative(), exactPolynomial() (+43 more)

### Community 19 - "aiPanel.ts"
Cohesion: 0.22
Nodes (8): theoremTopic(), NoteSubject, SubjectKind, AiPanel, graphLabel(), KIND_NAMES, texInline(), ExplainSubject

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (42): b, bigops, c, calculus, fn, fr, fractions, functions (+34 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "graphNote.test.ts"
Cohesion: 0.08
Nodes (26): @codemirror/view, @lezer/common, acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult, calcResults() (+18 more)

### Community 23 - "topics.ts"
Cohesion: 0.10
Nodes (36): ATTRIBUTES, count(), cut(), definedName(), ER_SHAPES, fieldText(), fitLines(), flowOrder() (+28 more)

### Community 24 - "BoardStore"
Cohesion: 0.06
Nodes (15): BoardOptions, BoardBackend, BoardStore, done(), IdbBoards, MemoryBoards, ofNote(), openBoardDatabase() (+7 more)

### Community 25 - "MathError"
Cohesion: 0.07
Nodes (70): MathError, angleBetween(), asMatrix(), basisOf(), characteristicPolynomial(), circleText(), cross(), Ctx (+62 more)

### Community 26 - "assistant.ts"
Cohesion: 0.12
Nodes (25): AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible(), askThroughHost() (+17 more)

### Community 27 - "MarkdownEditor"
Cohesion: 0.14
Nodes (7): closeMathBlockOnEnter(), EditorCallbacks, MarkdownEditor, tabOutOfMath(), insertTemplate(), SidePanelDeps, setup()

### Community 28 - "fourier.ts"
Cohesion: 0.12
Nodes (27): absOf(), boundsOf(), close(), definite(), fourierProblem, fourierShown(), isTrig(), isZero() (+19 more)

### Community 29 - "several.ts"
Cohesion: 0.09
Nodes (54): numShown(), EMPTY_SCOPE, shown(), size(), exText(), convergesAt(), gcdInt(), logParts() (+46 more)

### Community 30 - "gantt.ts"
Cohesion: 0.07
Nodes (67): amount(), barColor(), crossings(), dateText(), dayOf(), fitText(), GanttOptions, ganttSvg() (+59 more)

### Community 31 - "plan.ts"
Cohesion: 0.15
Nodes (18): NO_TABLE, cellText(), columnRole(), columnsOf(), durationUnit(), isNumber(), isPlanRange(), MAX_ACTIVITIES (+10 more)

### Community 32 - "sidePanel.ts"
Cohesion: 0.08
Nodes (41): EditorMathContext, expand(), preferredIndex(), SuggestionController, SuggestionItem, editDistance(), normalizeText(), stem() (+33 more)

### Community 33 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "NotesStore"
Cohesion: 0.07
Nodes (42): accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf() (+34 more)

### Community 36 - "complex.ts"
Cohesion: 0.11
Nodes (24): add(), arg(), compileFunction(), ComplexCompiled, ComplexVars, cos(), cosh(), EMPTY_COMPLEX_SCOPE (+16 more)

### Community 37 - "namesIn"
Cohesion: 0.13
Nodes (37): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+29 more)

### Community 38 - "graph/space.ts"
Cohesion: 0.13
Nodes (48): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+40 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "sheet.ts"
Cohesion: 0.08
Nodes (57): formatList(), OdeFunction, expSumValue(), ExactFunction, ExactScope, Lin, NUMERICAL, bracketParts() (+49 more)

### Community 41 - "Board"
Cohesion: 0.09
Nodes (4): Board, clampZoom(), validView(), BoardTheme

### Community 42 - "solve.ts"
Cohesion: 0.07
Nodes (57): formatGauss(), decimalSeparator(), Digits, formatNumber(), formatRational(), fromNumber(), fromRational(), SUPERSCRIPT (+49 more)

### Community 43 - "toLatex"
Cohesion: 0.08
Nodes (65): names(), STUDY_GRAPH, studyItems(), ACCENT_COMMANDS, COMPLEX_FUNCTIONS, diffLatex(), DISTRIBUTION_LATEX, distributionLatex() (+57 more)

### Community 44 - "functions.ts"
Cohesion: 0.09
Nodes (59): EMPTY, number(), addFormat(), divFormat(), GENERAL, mulFormat(), tidy(), withCents() (+51 more)

### Community 45 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 46 - "FoldersStore"
Cohesion: 0.17
Nodes (3): cleanFolderName(), FoldersStore, sameName()

### Community 47 - "numerical.test.ts"
Cohesion: 0.60
Nodes (3): result(), text(), verdict()

### Community 48 - "distributions.ts"
Cohesion: 0.18
Nodes (25): choose(), factorialBig(), FAMILIES, integerParam(), invalid(), makeDistribution(), ONE, positiveParam() (+17 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (35): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+27 more)

### Community 50 - "laplace.ts"
Cohesion: 0.18
Nodes (25): factoredPolynomial(), beyondPoles(), compiled(), E, exp(), fractionShown(), HALF, hyperbolicToExp() (+17 more)

### Community 51 - "SidePanel"
Cohesion: 0.19
Nodes (4): isConfidentAnswer(), displayCode(), preventFocusSteal(), SidePanel

### Community 52 - "dialogs.ts"
Cohesion: 0.09
Nodes (25): EXPLAIN_TONES, ExplainTone, DEFAULT_LOCAL_MODEL, AI_SERVICES, aiSettingsOf(), ACCOUNT_SETTINGS, accountSettings(), AI_MODELS (+17 more)

### Community 53 - "page.ts"
Cohesion: 0.06
Nodes (48): katex, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), PullResult, openShareDialog(), changeAccess(), changeCopy() (+40 more)

### Community 54 - "gauss.ts"
Cohesion: 0.16
Nodes (21): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexLine(), isComplexValue() (+13 more)

### Community 55 - "dom.ts"
Cohesion: 0.06
Nodes (40): insertBlock(), InsertOptions, toggleLinePrefix(), wrapSelection(), LIST_STYLES, besideSchema(), BlockWidget, findWidgetBlocks() (+32 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "board.ts"
Cohesion: 0.06
Nodes (54): Action, ACTION_NAMES, DOT_SIZES, DrawAction, EraseAction, EraserMode, HANDLE_REACH, ICON (+46 more)

### Community 58 - "Dove sono le cose"
Cohesion: 0.20
Nodes (21): Dove sono le cose, Glifo – architettura, explainTarget, schemaTitle(), formulasUntil(), explanationMarkdown(), hasCalculation(), insertAfterBlock() (+13 more)

### Community 59 - "odesolve.ts"
Cohesion: 0.09
Nodes (72): linearIn(), addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames() (+64 more)

### Community 60 - "schema/shapes.ts"
Cohesion: 0.08
Nodes (17): @maxgraph/core, ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape (+9 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 63 - "editor.test.ts"
Cohesion: 0.08
Nodes (28): templateInsertion(), CODE_NODES, CommandToken, commandTokenAt(), isInCode(), MATH_NODES, mathContextAt(), mathRegionAt() (+20 more)

### Community 64 - "ui/preview.ts"
Cohesion: 0.07
Nodes (30): GraphLabels, renameGraphScope(), renameScopeKeys(), BlockKind, MoveDir, configurePurify(), renderMarkdown(), draw() (+22 more)

### Community 65 - "conics.ts"
Cohesion: 0.18
Nodes (29): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+21 more)

### Community 66 - "spreadsheet/editor.ts"
Cohesion: 0.08
Nodes (55): openSheet(), saveSheetBlock(), tablesNote(), currentCall(), Editing, MenuEntry, Move, openSheetEditor() (+47 more)

### Community 67 - "statsGraph.ts"
Cohesion: 0.12
Nodes (21): FieldContext, number(), testItems(), classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX (+13 more)

### Community 68 - "smoke-test.mjs"
Cohesion: 0.25
Nodes (5): markdown-it, playwright-core, fakeLlmWorker(), firstVisit(), plainContext

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "strokes.ts"
Cohesion: 0.10
Nodes (33): Prefs, BOARD_PALETTES, BoardPalette, highlightName(), inkName(), mid(), outlineSvg(), PEN_SIZE (+25 more)

### Community 72 - "inference.ts"
Cohesion: 0.19
Nodes (22): confidence(), confidenceShown(), Given, hypothesisTest(), interval(), meanOf(), nameOf(), num() (+14 more)

### Community 73 - "icon"
Cohesion: 0.07
Nodes (38): vite-plugin-pwa, SyncStatus, board, accountOffMessage(), Site, AccountButton, confirmAccountDeletion(), messageOf() (+30 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (57): primitive(), verified(), atValues(), Converter, coordinates(), decimalText(), definiteParts(), definiteValue() (+49 more)

### Community 75 - "evaluateExactComplex"
Cohesion: 0.24
Nodes (8): asin(), atan(), evaluateExactComplex(), GaussRational, sinh(), slope(), Wave, waveOf()

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.04
Nodes (65): ALIGN, ARROW_NAMES, AT_ICONS, AT_NAMES, BASE_PRESETS, BIG_ARROWS, DB_PRESETS, Direction (+57 more)

### Community 79 - "parseSchema"
Cohesion: 0.14
Nodes (18): readSchema(), schemaSummary(), svg(), base64(), hide(), OPEN, schemasForFile(), schemasFromFile() (+10 more)

### Community 82 - "blockMove.ts"
Cohesion: 0.10
Nodes (35): @codemirror/commands, blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove, blockPlace() (+27 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.20
Nodes (6): centerOf(), clickOn(), ffmpeg, SCENES, SIZE, work

### Community 90 - "Abbonamenti"
Cohesion: 0.08
Nodes (24): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Deciso (5 ottobre 2026), Deciso (5 ottobre 2026) (+16 more)

### Community 91 - "spiegami-qwen.mjs"
Cohesion: 0.29
Nodes (4): vite, minutes, postMessage(), started

### Community 92 - "Costi"
Cohesion: 0.21
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, Quando lo studente dice di cominciare

### Community 96 - "account-test.mjs"
Cohesion: 0.20
Nodes (4): device(), login(), newContext, waitFor()

### Community 97 - "Il database degli account (Supabase)"
Cohesion: 0.17
Nodes (11): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Nell'app, Note condivise con un link (+3 more)

### Community 98 - "Pt"
Cohesion: 0.15
Nodes (11): coalesced(), Finger, LassoAction, PanAction, PinchAction, pointsOf(), pressureOf(), EllipseFit (+3 more)

### Community 100 - "Distribution"
Cohesion: 0.13
Nodes (14): addExp(), continuousQuantile(), discreteQuantile(), Distribution, exactIntervalProbability(), expSum, integerRange(), intervalProbability() (+6 more)

### Community 101 - "vitest"
Cohesion: 0.03
Nodes (71): description, name, private, scripts, build, dev, preview, test (+63 more)

### Community 102 - "supabase.ts"
Cohesion: 0.09
Nodes (39): @supabase/supabase-js, AUTH_STORAGE_KEY, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken() (+31 more)

### Community 103 - "files.ts"
Cohesion: 0.24
Nodes (13): inClaudeViewer(), canWriteFilesDirectly(), FsWindow, isAbort(), MD_TYPES, OPEN_TYPES, OpenedFile, openMarkdownFiles() (+5 more)

### Community 104 - "Glifo"
Cohesion: 0.13
Nodes (15): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Funzionalità (+7 more)

### Community 105 - "touchLog"
Cohesion: 0.29
Nodes (3): movesLine(), seconds(), touchLog

### Community 106 - "fake-supabase.mjs"
Cohesion: 0.25
Nodes (5): b64(), CODE, GOOGLE_CODE, ROOT, SUPABASE_URL

### Community 107 - "explainPanel.ts"
Cohesion: 0.08
Nodes (32): Explanation, REPLY_TOKENS, LocalAbort, localErrorMessage(), localLlm, Pending, WorkerLike, ChatMessage (+24 more)

### Community 108 - "xlsx.ts"
Cohesion: 0.08
Nodes (52): RFC-4180, fflate, csvDelimiter(), csvToSheet(), field(), italian(), parseCsv(), sheetToCsv() (+44 more)

### Community 110 - "llmWorker.ts"
Cohesion: 0.26
Nodes (12): @mlc-ai/web-llm, chat(), GlifoError, Gpu, load(), post(), remove(), scope (+4 more)

### Community 113 - "markdown.ts"
Cohesion: 0.11
Nodes (35): texHtml(), moveAttrs(), checkHtml(), checkTitle(), cache, cleanKatexError(), escapeHtml(), renderTex() (+27 more)

### Community 116 - "spreadsheet/format.ts"
Cohesion: 0.11
Nodes (35): at(), breakEven(), dataLine(), dataRange(), Point, quantity(), tableItems(), textLabel() (+27 more)

### Community 117 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 118 - "ExplainPanel"
Cohesion: 0.23
Nodes (3): ExplainPanel, preventFocusSteal(), setup()

### Community 119 - "probability.ts"
Cohesion: 0.13
Nodes (23): End, Family, CompileOptions, rejection(), ALL, complement(), endAt(), EventContext (+15 more)

### Community 120 - "siteUpdate.ts"
Cohesion: 0.16
Nodes (18): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, loadPart() (+10 more)

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 124 - "Sheet"
Cohesion: 0.08
Nodes (25): ExactComplexScope, Ode, withWorkLimit(), ExactRandom, FiniteContext, FormattedResult, differentialRequest, pieces() (+17 more)

### Community 125 - "sql.ts"
Cohesion: 0.17
Nodes (17): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+9 more)

### Community 126 - "boardTouchLog.test.ts"
Cohesion: 0.20
Nodes (8): isSaved(), LOG_MAX_LINES, LogStore, SavedLog, clock(), memoryStore(), newLog(), texts()

### Community 127 - "compileComplex"
Cohesion: 0.32
Nodes (8): onlyComplex(), complexValue(), compileApply(), compileComplex(), compileName(), conjugateOf(), constant(), productPower()

### Community 128 - "createFakeSupabase"
Cohesion: 0.60
Nodes (6): createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 129 - "planPreview.ts"
Cohesion: 0.09
Nodes (28): ACCENTS, BLACKBOARD, CALLIGRAPHIC, closing(), convert(), escapeXml(), FUNCTIONS, GREEK (+20 more)

### Community 131 - "tutorial.ts"
Cohesion: 0.14
Nodes (15): helpButton, openGuide(), openHelpDialog(), HINT_MS, markSeen(), openTutorial(), show(), richText() (+7 more)

### Community 132 - "Rational"
Cohesion: 0.06
Nodes (67): factorsOf(), exactSqrt(), unavailable(), bigGcd(), binomExact(), conditionExact(), evaluateExact(), exactRoot() (+59 more)

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 140 - "Glifo – note per Claude"
Cohesion: 0.22
Nodes (9): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole (+1 more)

### Community 146 - "grafo-html.mjs"
Cohesion: 0.22
Nodes (4): graphFile, names, namesFile, root

### Community 157 - "logo.ts"
Cohesion: 0.24
Nodes (7): PNG_ICONS, sidebarToggle(), BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark()

### Community 162 - "Più avanti"
Cohesion: 0.29
Nodes (7): Account: i propri appunti su ogni dispositivo, anche da condividere, Commenti di chi prova Glifo, Idee per il futuro, In programma, La lavagna: idee in più, Più avanti, Schemi: idee in più

## Knowledge Gaps
- **671 isolated node(s):** `Comandi`, `Promemoria per lo studente`, `Regole`, `Condividere una nota con un link`, `Mandaci un commento` (+666 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 935 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **33 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `touchlog.ts`, `planPreview.ts`, `main.ts`, `compile`, `Rational`, `spec.ts`, `arithmetic.ts`, `parse.ts`, `graph/preview.ts`, `explain.ts`, `view3d.ts`, `num`, `svg.ts`, `graph.ts`, `SchemaEditor`, `schemaTools.test.ts`, `h`, `limits.ts`, `numerical.ts`, `aiPanel.ts`, `tutorial.ts`, `graphNote.test.ts`, `topics.ts`, `BoardStore`, `MathError`, `assistant.ts`, `MarkdownEditor`, `fourier.ts`, `logo.ts`, `gantt.ts`, `several.ts`, `plan.ts`, `sidePanel.ts`, `logic.ts`, `NotesStore`, `namesIn`, `graph/space.ts`, `sheet.ts`, `Board`, `toLatex`, `functions.ts`, `finite.ts`, `board/shapes.ts`, `SidePanel`, `dialogs.ts`, `gauss.ts`, `dom.ts`, `board.ts`, `odesolve.ts`, `schema/shapes.ts`, `ui/preview.ts`, `conics.ts`, `spreadsheet/editor.ts`, `statsGraph.ts`, `smoke-test.mjs`, `strokes.ts`, `inference.ts`, `icon`, `symbolic.ts`, `evaluateExactComplex`, `schema/editor.ts`, `blockMove.ts`, `Pt`, `supabase.ts`, `files.ts`, `touchLog`, `explainPanel.ts`, `xlsx.ts`, `llmWorker.ts`, `markdown.ts`, `spreadsheet/format.ts`, `ExplainPanel`, `siteUpdate.ts`, `Sheet`, `boardTouchLog.test.ts`, `compileComplex`?**
  _High betweenness centrality (0.177) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `touchlog.ts`, `parse.ts`, `main.ts`, `compile`, `sync.ts`, `spec.ts`, `Rational`, `num`, `tutorial.ts`, `explain.ts`, `editor/lists.ts`, `svg.ts`, `schemaTools.test.ts`, `graphNote.test.ts`, `BoardStore`, `MathError`, `assistant.ts`, `MarkdownEditor`, `logo.ts`, `gantt.ts`, `plan.ts`, `sidePanel.ts`, `NotesStore`, `namesIn`, `graph/space.ts`, `resize.ts`, `numerical.test.ts`, `distributions.ts`, `board/shapes.ts`, `dialogs.ts`, `page.ts`, `dom.ts`, `board.ts`, `editor.test.ts`, `ui/preview.ts`, `spreadsheet/editor.ts`, `strokes.ts`, `icon`, `symbolic.ts`, `parseSchema`, `blockMove.ts`, `supabase.ts`, `explainPanel.ts`, `xlsx.ts`, `spreadsheet/format.ts`, `siteUpdate.ts`, `Sheet`, `sql.ts`, `boardTouchLog.test.ts`?**
  _High betweenness centrality (0.114) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `planPreview.ts`, `main.ts`, `tutorial.ts`, `graph/preview.ts`, `graph.ts`, `SchemaEditor`, `aiPanel.ts`, `logo.ts`, `sidePanel.ts`, `NotesStore`, `resize.ts`, `Board`, `SidePanel`, `dialogs.ts`, `page.ts`, `dom.ts`, `board.ts`, `ExplainChat`, `ui/preview.ts`, `spreadsheet/editor.ts`, `icon`, `schema/editor.ts`, `vitest`, `explainPanel.ts`, `markdown.ts`, `ExplainPanel`, `.constructor`, `.folderItem`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **Are the 268 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `adoptGuestNotes()`) actually correct?**
  _`Dove sono le cose` has 268 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Comandi`, `Promemoria per lo studente`, `Regole` to the rest of the system?**
  _671 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `parse.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07560137457044673 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.03931760629081701 - nodes in this community are weakly interconnected._