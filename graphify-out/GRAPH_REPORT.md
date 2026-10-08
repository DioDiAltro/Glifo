# Graph Report - matherdown  (2026-10-08)

## Corpus Check
- 308 files · ~596,887 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 4983 nodes · 18022 edges · 145 communities (110 shown, 35 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 573 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b1d19709`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- touchlog.ts
- Parser
- main.ts
- compile
- sync.ts
- spec.ts
- laplace.ts
- primitive.ts
- graph/preview.ts
- Dove sono le cose
- parseGraph
- editor/lists.ts
- svg.ts
- Converter
- SchemaEditor
- .constructor
- SheetEditor
- Pt
- numerical.ts
- arithmetic.ts
- index.ts
- engine.ts
- graphNote.test.ts
- topics.ts
- BoardStore
- linear.ts
- vitest
- schemaTools.test.ts
- h
- several.ts
- gantt.ts
- parse.ts
- sidePanel.ts
- editor/editor.ts
- logic.ts
- NotesStore
- complex.ts
- MathError
- view3d.ts
- resize.ts
- statsShown.ts
- Board
- formatNumber
- study.ts
- functions.ts
- finite.ts
- FoldersStore
- toLatex
- distributions.ts
- board/shapes.ts
- toNode
- renderTex
- blockMoveEditor.test.ts
- page.ts
- .renderFormat
- Preview
- 20261004091555_note_condivise.sql
- board.ts
- PreviewCallbacks
- odesolve.ts
- graph.ts
- dependencies
- grafo-html.mjs
- linear.test.ts
- ui/preview.ts
- Piano per piano
- spreadsheet/editor.ts
- probability.ts
- smoke-test.mjs
- Benvenuto in Glifo
- compilerOptions
- solve.ts
- Field
- symbolic.ts
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
- strokes.ts
- spell.test.ts
- supabase.ts
- files.ts
- sheet.ts
- touchLog
- explainPanel.ts
- xlsx.ts
- aiPanel.test.ts
- markdown.ts
- spreadsheet/format.ts
- ExplainPanel
- Rational
- siteUpdate.ts
- scripts
- Le spiegazioni, come funzionano
- Sheet
- sql.ts
- boardTouchLog.test.ts
- createFakeSupabase
- graph/file.ts
- linsys.ts
- formula.ts
- tutorial.ts
- 20261008130026_commenti.sql
- Glifo – note per Claude
- plan.ts
- logo.ts
- devDependencies

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 269 edges
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
- `Dove sono le cose` --references--> `ConicElements`  [INFERRED]
  ARCHITETTURA.md → src/math/conics.ts
- `Dove sono le cose` --references--> `texts()`  [INFERRED]
  ARCHITETTURA.md → tests/boardTouchLog.test.ts
- `Come viene pubblicata` --references--> `dist()`  [INFERRED]
  README.md → src/board/shapes.ts
- `Dove sono le cose` --references--> `adoptGuestNotes()`  [INFERRED]
  ARCHITETTURA.md → src/account/space.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (145 total, 35 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.14
Nodes (16): at(), browserStore, clip(), KINDS, LOG_KEY, Moves, MOVES_MAX, pointerDetail() (+8 more)

### Community 1 - "Parser"
Cohesion: 0.17
Nodes (4): describe(), MathSyntaxError, Parser, parseStatement()

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (116): DEFAULT_LOCAL_MODEL, graphsForFile(), hide(), account, ACCOUNT_OFF, active, aiToggle, app (+108 more)

### Community 3 - "compile"
Cohesion: 0.05
Nodes (92): integralRegion, typedSliderValue(), argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot() (+84 more)

### Community 4 - "sync.ts"
Cohesion: 0.05
Nodes (38): AccountSync, withLock(), Account, EMPTY_STATE, FolderChange, FolderRow, isEmpty(), iso() (+30 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (104): conicItems(), isConicLine(), quadricEquation(), fourierItems(), isFourierLine(), onlyComplex(), isTestLine(), isNumericalLine() (+96 more)

### Community 6 - "laplace.ts"
Cohesion: 0.22
Nodes (21): beyondPoles(), compiled(), E, fractionShown(), HALF, inverseLaplaceShown(), laplaceEx(), laplaceShown() (+13 more)

### Community 7 - "primitive.ts"
Cohesion: 0.17
Nodes (59): atIntegers(), similarSolution(), algebraic(), bigGcd(), byParts(), candidates(), canon(), combineLogs() (+51 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (41): FIGURE_PALETTE, addLabel(), boxes, cameras, complexCoord(), coord(), drawings, drawnViews (+33 more)

### Community 9 - "Dove sono le cose"
Cohesion: 0.06
Nodes (70): Dove sono le cose, Glifo – architettura, allNames(), answerFollowUp(), bareResult(), CHAT_SUBJECT, chatContext, ChatFn (+62 more)

### Community 10 - "parseGraph"
Cohesion: 0.11
Nodes (24): staticGraphSvg(), chooseBox(), parseGraph(), DrawOptions, Palette, PALETTES, DEFAULT_CAMERA, Quality (+16 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.05
Nodes (90): insertBlock(), toggleLinePrefix(), wrapSelection(), applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings() (+82 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (56): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseWindow(), chooseY(), clipLines(), dataWindow() (+48 more)

### Community 13 - "Converter"
Cohesion: 0.17
Nodes (15): quadraticIn(), atValues(), Converter, definiteParts(), definiteValue(), expandCalculus(), fieldName(), infiniteSide() (+7 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.10
Nodes (4): isLanes(), SchemaEditor, withLaneContents(), serializeSchema()

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (4): rangeLabel(), SheetEditor, CellRange, cloneSheet()

### Community 17 - "Pt"
Cohesion: 0.15
Nodes (11): coalesced(), Finger, LassoAction, PanAction, PinchAction, pointsOf(), pressureOf(), EllipseFit (+3 more)

### Community 18 - "numerical.ts"
Cohesion: 0.08
Nodes (62): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Commenti, Compatibilità con VS Code, Condividere una nota con un link (+54 more)

### Community 19 - "arithmetic.ts"
Cohesion: 0.10
Nodes (52): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+44 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (42): b, bigops, c, calculus, fn, fr, fractions, functions (+34 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "graphNote.test.ts"
Cohesion: 0.05
Nodes (53): katex, @lezer/common, explainTarget, acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult (+45 more)

### Community 23 - "topics.ts"
Cohesion: 0.17
Nodes (24): ATTRIBUTES, count(), cut(), ER_SHAPES, fieldText(), fitLines(), flowOrder(), FREE_NAMES (+16 more)

### Community 24 - "BoardStore"
Cohesion: 0.06
Nodes (14): BoardOptions, BoardBackend, BoardStore, done(), IdbBoards, MemoryBoards, ofNote(), openBoardDatabase() (+6 more)

### Community 25 - "linear.ts"
Cohesion: 0.11
Nodes (54): angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, dataOf(), degreesText() (+46 more)

### Community 26 - "vitest"
Cohesion: 0.06
Nodes (31): vite-plugin-pwa, vitest, AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi() (+23 more)

### Community 27 - "schemaTools.test.ts"
Cohesion: 0.16
Nodes (17): alignBoxes(), Alignment, Box, distributeBoxes(), Position, base64(), crc32(), svgSize() (+9 more)

### Community 28 - "h"
Cohesion: 0.05
Nodes (56): SyncStatus, EXPLAIN_TONES, planSwatchSvg(), ganttWidth(), PlanView, GraphLook, board, viewSwitch (+48 more)

### Community 29 - "several.ts"
Cohesion: 0.10
Nodes (48): Piece, Condition, Family, Group, Root, Shape, fractionNear(), at() (+40 more)

### Community 30 - "gantt.ts"
Cohesion: 0.07
Nodes (65): amount(), barColor(), crossings(), dateText(), dayOf(), fitText(), GanttOptions, ganttSvg() (+57 more)

### Community 31 - "parse.ts"
Cohesion: 0.05
Nodes (46): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, differentialInFraction(), DISTRIBUTION_EXAMPLES (+38 more)

### Community 32 - "sidePanel.ts"
Cohesion: 0.08
Nodes (41): EditorMathContext, expand(), preferredIndex(), SuggestionController, SuggestionItem, editDistance(), normalizeText(), stem() (+33 more)

### Community 33 - "editor/editor.ts"
Cohesion: 0.03
Nodes (83): description, name, private, type, version, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands (+75 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "NotesStore"
Cohesion: 0.07
Nodes (36): accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf() (+28 more)

### Community 36 - "complex.ts"
Cohesion: 0.06
Nodes (66): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexLine(), isComplexValue() (+58 more)

### Community 37 - "MathError"
Cohesion: 0.12
Nodes (43): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+35 more)

### Community 38 - "view3d.ts"
Cohesion: 0.06
Nodes (83): LayeredSolid, addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon() (+75 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "statsShown.ts"
Cohesion: 0.17
Nodes (31): Lin, check(), correlation(), count(), covariance(), Data, dataStatistic(), deviation() (+23 more)

### Community 41 - "Board"
Cohesion: 0.09
Nodes (4): Board, clampZoom(), validView(), BoardTheme

### Community 42 - "formatNumber"
Cohesion: 0.11
Nodes (33): decimalSeparator(), Digits, formatNumber(), FormatOptions, formatRational(), fromNumber(), fromRational(), SUPERSCRIPT (+25 more)

### Community 43 - "study.ts"
Cohesion: 0.16
Nodes (34): nameLatex(), Asymptote, boundaries(), compiled(), cutsOf(), defined(), domainOf(), exact() (+26 more)

### Community 44 - "functions.ts"
Cohesion: 0.09
Nodes (59): EMPTY, number(), addFormat(), divFormat(), GENERAL, mulFormat(), tidy(), withCents() (+51 more)

### Community 45 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 46 - "FoldersStore"
Cohesion: 0.08
Nodes (18): cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder(), loadClosedFolders(), RemoteFolder (+10 more)

### Community 47 - "toLatex"
Cohesion: 0.05
Nodes (65): FieldContext, number(), testItems(), criticalLine(), named(), severalItems(), surface(), GraphItem (+57 more)

### Community 48 - "distributions.ts"
Cohesion: 0.06
Nodes (62): addExp(), choose(), continuousQuantile(), discreteQuantile(), Distribution, exactIntervalProbability(), factorialBig(), FAMILIES (+54 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (35): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+27 more)

### Community 50 - "toNode"
Cohesion: 0.27
Nodes (17): absOf(), boundsOf(), close(), definite(), fourierProblem, fourierShown(), isTrig(), isZero() (+9 more)

### Community 51 - "renderTex"
Cohesion: 0.19
Nodes (6): cleanKatexError(), renderTex(), isConfidentAnswer(), displayCode(), preventFocusSteal(), SidePanel

### Community 52 - "blockMoveEditor.test.ts"
Cohesion: 0.26
Nodes (12): blockMoveTransaction(), contentHash(), fenceName(), MOVABLE, parseBlocks(), findSheetBlock(), apply(), blocks() (+4 more)

### Community 53 - "page.ts"
Cohesion: 0.05
Nodes (65): SUPABASE_KEY, SUPABASE_URL, accountDataFile(), PullResult, hydrateGraphs(), setPrinting(), isShareToken(), parseSharedNote() (+57 more)

### Community 54 - ".renderFormat"
Cohesion: 0.17
Nodes (10): fieldInput(), textWidth(), createEdgeCell(), isNodeLook(), nodeLook(), nodeStyle(), turn(), EdgeLook (+2 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "board.ts"
Cohesion: 0.06
Nodes (55): Action, ACTION_NAMES, DOT_SIZES, DrawAction, EraseAction, EraserMode, HANDLE_REACH, ICON (+47 more)

### Community 59 - "odesolve.ts"
Cohesion: 0.08
Nodes (82): linearIn(), addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames() (+74 more)

### Community 60 - "graph.ts"
Cohesion: 0.06
Nodes (41): @maxgraph/core, AT_X, cellHtml(), cellText(), COMPASS, createGraph(), drawSchema(), edgeLook() (+33 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "grafo-html.mjs"
Cohesion: 0.22
Nodes (4): graphFile, names, namesFile, root

### Community 63 - "linear.test.ts"
Cohesion: 0.29
Nodes (7): EXACT, FLOAT, A, B, q(), result(), text()

### Community 64 - "ui/preview.ts"
Cohesion: 0.23
Nodes (11): renameGraphScope(), renameScopeKeys(), BlockKind, MoveDir, hydrateSheets(), BLOCK_NAMES, blockKindOf(), MOVABLE_BLOCKS (+3 more)

### Community 65 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 66 - "spreadsheet/editor.ts"
Cohesion: 0.07
Nodes (59): findWidgetBlocks(), guardBlocks(), KINDS, sheetSummary(), WidgetBlock, openSheet(), placeChart(), saveSheetBlock() (+51 more)

### Community 67 - "probability.ts"
Cohesion: 0.13
Nodes (24): End, Vars, ExactScope, RelOp, ALL, complement(), endAt(), EventContext (+16 more)

### Community 68 - "smoke-test.mjs"
Cohesion: 0.25
Nodes (4): markdown-it, fakeLlmWorker(), firstVisit(), plainContext

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "solve.ts"
Cohesion: 0.17
Nodes (24): rref(), splitRoot(), isStandardUnknown(), linearSystem(), breaks(), cubeRoot(), equation(), holds() (+16 more)

### Community 72 - "Field"
Cohesion: 0.13
Nodes (6): eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn()

### Community 74 - "symbolic.ts"
Cohesion: 0.08
Nodes (72): oneFraction(), withoutAbs(), exp(), hyperbolicToExp(), inverseRational(), sqrtEx(), polyEx(), distribute() (+64 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.05
Nodes (59): ALIGN, ARROW_NAMES, AT_ICONS, AT_NAMES, BASE_PRESETS, BIG_ARROWS, DB_PRESETS, Direction (+51 more)

### Community 79 - "parseSchema"
Cohesion: 0.10
Nodes (27): schemaSummary(), svg(), hide(), OPEN, schemasForFile(), schemasFromFile(), unhide(), Look (+19 more)

### Community 82 - "blockMove.ts"
Cohesion: 0.16
Nodes (18): blank(), BlockMove, blockPlace(), closed(), closeIdx(), fenceClosed(), findBlock(), invisible() (+10 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.20
Nodes (6): centerOf(), clickOn(), ffmpeg, SCENES, SIZE, work

### Community 90 - "Abbonamenti"
Cohesion: 0.08
Nodes (24): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Deciso (5 ottobre 2026), Deciso (5 ottobre 2026) (+16 more)

### Community 91 - "spiegami-qwen.mjs"
Cohesion: 0.25
Nodes (5): playwright-core, vite, minutes, postMessage(), started

### Community 92 - "Costi"
Cohesion: 0.21
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, Quando lo studente dice di cominciare

### Community 96 - "account-test.mjs"
Cohesion: 0.12
Nodes (10): @electric-sql/pglite, device(), login(), newContext, waitFor(), b64(), CODE, GOOGLE_CODE (+2 more)

### Community 97 - "Il database degli account (Supabase)"
Cohesion: 0.18
Nodes (10): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Nell'app, Note condivise con un link (+2 more)

### Community 98 - "strokes.ts"
Cohesion: 0.10
Nodes (33): Prefs, BOARD_PALETTES, BoardPalette, highlightName(), inkName(), mid(), outlineSvg(), PEN_SIZE (+25 more)

### Community 101 - "spell.test.ts"
Cohesion: 0.08
Nodes (23): @codemirror/lang-markdown, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt() (+15 more)

### Community 102 - "supabase.ts"
Cohesion: 0.12
Nodes (33): @supabase/supabase-js, AUTH_STORAGE_KEY, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken() (+25 more)

### Community 103 - "files.ts"
Cohesion: 0.11
Nodes (25): cache, capability(), ClaudeRuntime, hostDownloads, HostError, inClaudeViewer(), ModelTier, runtime() (+17 more)

### Community 104 - "sheet.ts"
Cohesion: 0.07
Nodes (47): fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), expSumValue(), ExactFunction (+39 more)

### Community 105 - "touchLog"
Cohesion: 0.31
Nodes (3): movesLine(), seconds(), touchLog

### Community 107 - "explainPanel.ts"
Cohesion: 0.07
Nodes (46): @mlc-ai/web-llm, ExplainTone, Explanation, FollowUp, REPLY_TOKENS, chat(), GlifoError, Gpu (+38 more)

### Community 108 - "xlsx.ts"
Cohesion: 0.09
Nodes (47): RFC-4180, fflate, tableTopic(), valueText(), csvDelimiter(), csvToSheet(), field(), italian() (+39 more)

### Community 110 - "aiPanel.test.ts"
Cohesion: 0.10
Nodes (25): definedName(), formulaTopic(), graphTopic(), numberText(), studyOf(), theoremTopic(), NoteSubject, SubjectKind (+17 more)

### Community 113 - "markdown.ts"
Cohesion: 0.17
Nodes (18): markMoves(), moveAttrs(), renderTexOrError(), renderTexWithResult(), configurePurify(), createMarkdownIt(), FORBIDDEN_TAGS, HLJS_LANGUAGES (+10 more)

### Community 116 - "spreadsheet/format.ts"
Cohesion: 0.10
Nodes (39): at(), breakEven(), dataLine(), dataRange(), Point, quantity(), tableItems(), textLabel() (+31 more)

### Community 119 - "Rational"
Cohesion: 0.08
Nodes (49): Part, at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf() (+41 more)

### Community 120 - "siteUpdate.ts"
Cohesion: 0.16
Nodes (19): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, loadPart() (+11 more)

### Community 121 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 124 - "Sheet"
Cohesion: 0.08
Nodes (25): ExactComplexScope, Ode, withWorkLimit(), FiniteContext, FormattedResult, Mat, MathNode, chainOf() (+17 more)

### Community 125 - "sql.ts"
Cohesion: 0.17
Nodes (18): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+10 more)

### Community 126 - "boardTouchLog.test.ts"
Cohesion: 0.20
Nodes (8): isSaved(), LOG_MAX_LINES, LogStore, SavedLog, clock(), memoryStore(), newLog(), texts()

### Community 128 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 129 - "graph/file.ts"
Cohesion: 0.10
Nodes (36): figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsFromFile(), OPEN, swatchSvg(), titleBand() (+28 more)

### Community 132 - "linsys.ts"
Cohesion: 0.12
Nodes (45): choices(), exText(), gcd(), matrixEquation(), matrixSystem(), minorsGcd(), ONE, parametricRows() (+37 more)

### Community 133 - "formula.ts"
Cohesion: 0.10
Nodes (24): formulaText(), BinOp, COMPARE, ERRORS_BY_LENGTH, formulaBody(), FormulaError, formulaRefs(), normalizeFormula() (+16 more)

### Community 136 - "tutorial.ts"
Cohesion: 0.15
Nodes (14): helpButton, openGuide(), HINT_MS, markSeen(), openTutorial(), show(), richText(), showTutorialHint() (+6 more)

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 140 - "Glifo – note per Claude"
Cohesion: 0.12
Nodes (16): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole (+8 more)

### Community 142 - "plan.ts"
Cohesion: 0.15
Nodes (18): NO_TABLE, cellText(), columnRole(), columnsOf(), durationUnit(), isNumber(), isPlanRange(), MAX_ACTIVITIES (+10 more)

### Community 157 - "logo.ts"
Cohesion: 0.24
Nodes (7): PNG_ICONS, sidebarToggle(), BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark()

### Community 158 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

## Knowledge Gaps
- **673 isolated node(s):** `Comandi`, `Regole`, `Condividere una nota con un link`, `Commenti`, `Provarlo sul tuo computer` (+668 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 939 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **35 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `touchlog.ts`, `graph/file.ts`, `main.ts`, `compile`, `linsys.ts`, `spec.ts`, `Parser`, `primitive.ts`, `graph/preview.ts`, `formula.ts`, `parseGraph`, `editor/lists.ts`, `svg.ts`, `Converter`, `SchemaEditor`, `plan.ts`, `SheetEditor`, `Pt`, `numerical.ts`, `arithmetic.ts`, `graphNote.test.ts`, `topics.ts`, `BoardStore`, `linear.ts`, `vitest`, `schemaTools.test.ts`, `h`, `logo.ts`, `gantt.ts`, `parse.ts`, `several.ts`, `editor/editor.ts`, `logic.ts`, `NotesStore`, `complex.ts`, `MathError`, `view3d.ts`, `sidePanel.ts`, `Board`, `study.ts`, `functions.ts`, `finite.ts`, `tutorial.ts`, `toLatex`, `distributions.ts`, `board/shapes.ts`, `toNode`, `renderTex`, `blockMoveEditor.test.ts`, `page.ts`, `.renderFormat`, `Preview`, `board.ts`, `PreviewCallbacks`, `odesolve.ts`, `graph.ts`, `ui/preview.ts`, `spreadsheet/editor.ts`, `smoke-test.mjs`, `symbolic.ts`, `blockMove.ts`, `strokes.ts`, `supabase.ts`, `files.ts`, `sheet.ts`, `touchLog`, `explainPanel.ts`, `xlsx.ts`, `aiPanel.test.ts`, `markdown.ts`, `spreadsheet/format.ts`, `ExplainPanel`, `Rational`, `siteUpdate.ts`, `Sheet`, `boardTouchLog.test.ts`?**
  _High betweenness centrality (0.172) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `touchlog.ts`, `graph/file.ts`, `main.ts`, `compile`, `sync.ts`, `linsys.ts`, `tutorial.ts`, `Dove sono le cose`, `parseGraph`, `editor/lists.ts`, `svg.ts`, `plan.ts`, `graphNote.test.ts`, `BoardStore`, `schemaTools.test.ts`, `h`, `logo.ts`, `gantt.ts`, `parse.ts`, `sidePanel.ts`, `editor/editor.ts`, `NotesStore`, `resize.ts`, `FoldersStore`, `toLatex`, `distributions.ts`, `board/shapes.ts`, `blockMoveEditor.test.ts`, `page.ts`, `board.ts`, `linear.test.ts`, `ui/preview.ts`, `spreadsheet/editor.ts`, `symbolic.ts`, `parseSchema`, `strokes.ts`, `spell.test.ts`, `supabase.ts`, `explainPanel.ts`, `xlsx.ts`, `aiPanel.test.ts`, `markdown.ts`, `spreadsheet/format.ts`, `siteUpdate.ts`, `Sheet`, `sql.ts`, `boardTouchLog.test.ts`?**
  _High betweenness centrality (0.117) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `main.ts`, `graph/preview.ts`, `tutorial.ts`, `editor/lists.ts`, `SchemaEditor`, `.constructor`, `SheetEditor`, `logo.ts`, `sidePanel.ts`, `resize.ts`, `Board`, `FoldersStore`, `renderTex`, `page.ts`, `.renderFormat`, `board.ts`, `PreviewCallbacks`, `ui/preview.ts`, `spreadsheet/editor.ts`, `schema/editor.ts`, `spell.test.ts`, `explainPanel.ts`, `aiPanel.test.ts`, `ExplainPanel`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **Are the 268 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `adoptGuestNotes()`) actually correct?**
  _`Dove sono le cose` has 268 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Comandi`, `Regole`, `Condividere una nota con un link` to the rest of the system?**
  _673 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `touchlog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0361714621256606 - nodes in this community are weakly interconnected._