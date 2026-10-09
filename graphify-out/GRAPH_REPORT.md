# Graph Report - matherdown  (2026-10-09)

## Corpus Check
- 320 files · ~611,971 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5101 nodes · 18405 edges · 152 communities (120 shown, 32 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 590 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `6161aea1`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- touchlog.ts
- Parser
- main.ts
- compile
- sync.ts
- spec.ts
- solve.ts
- num
- graph/preview.ts
- Dove sono le cose
- spreadsheet.test.ts
- editor/lists.ts
- svg.ts
- domain.ts
- SchemaEditor
- .onKey
- SheetEditor
- editor.test.ts
- MathError
- arithmetic.ts
- index.ts
- engine.ts
- topics.ts
- parseSchema
- store.ts
- linear.ts
- Rational
- assistant.ts
- polynomial.ts
- parse.ts
- gantt.ts
- openShareDialog
- search.ts
- editor/editor.ts
- logic.ts
- .renderFormat
- complex.ts
- namesIn
- captcha.ts
- resize.ts
- calcResults.ts
- explainPanel.ts
- several.ts
- study.ts
- functions.ts
- finite.ts
- NotesStore
- view3d.ts
- inference.ts
- board/shapes.ts
- escapeHtml
- sidePanel.ts
- Board
- supabase.ts
- aiPanel.test.ts
- ui/preview.ts
- 20261004091555_note_condivise.sql
- board.ts
- src/relocation.ts
- odesolve.ts
- Glifo
- dependencies
- h
- sheet.ts
- explainChat.ts
- Piano per piano
- spreadsheet/editor.ts
- markdown.ts
- smoke-test.mjs
- Benvenuto in Glifo
- compilerOptions
- relocation-test.mjs
- probability.ts
- MarkdownEditor
- symbolic.ts
- schema/templates.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- distributions.ts
- session-start.sh
- .claude/CLAUDE.md
- BoardStore
- tutorial.mjs
- Abbonamenti
- plan.ts
- Costi
- supabase-stub.sql
- account-test.mjs
- statsShown.ts
- gauss.ts
- page.ts
- linsys.ts
- Field
- siteUpdate.ts
- .folderItem
- fourier.ts
- Stroke
- localModels.ts
- xlsx.ts
- touchLog
- graph.ts
- Il database degli account (Supabase)
- Glifo – note per Claude
- ExplainPanel
- conics.ts
- toLatex
- files.ts
- Le spiegazioni, come funzionano
- strokes.ts
- Sheet
- sql.ts
- devDependencies
- grafo-html.mjs
- createFakeSupabase
- graph/file.ts
- schemaBlocks.ts
- deploy.test.ts
- formula.ts
- spiegami-qwen.mjs
- 20261008130026_commenti.sql
- boardTouchLog.test.ts
- downloadText
- scripts

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 272 edges
2. `MathError` - 151 edges
3. `num()` - 145 edges
4. `Sheet` - 139 edges
5. `MathNode` - 129 edges
6. `mul()` - 124 edges
7. `h()` - 120 edges
8. `Board` - 118 edges
9. `compile()` - 113 edges
10. `Rational` - 111 edges

## Surprising Connections (you probably didn't know these)
- `Dove sono le cose` --references--> `fakeLlmWorker()`  [INFERRED]
  ARCHITETTURA.md → scripts/smoke-test.mjs
- `Il controllo anti-robot (CAPTCHA, ottobre 2026)` --references--> `captchaToken()`  [INFERRED]
  supabase/README.md → src/account/captcha.ts
- `Come viene pubblicata` --references--> `dist()`  [INFERRED]
  README.md → src/board/shapes.ts
- `Trasloco: il sito su Cloudflare, con un dominio tutto di Glifo` --references--> `dist()`  [INFERRED]
  ROADMAP.md → src/board/shapes.ts
- `Funzionalità` --references--> `k()`  [INFERRED]
  README.md → src/math/numerical.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (152 total, 32 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.14
Nodes (16): at(), browserStore, clip(), KINDS, LOG_KEY, Moves, MOVES_MAX, pointerDetail() (+8 more)

### Community 1 - "Parser"
Cohesion: 0.17
Nodes (4): describe(), MathSyntaxError, Parser, parseStatement()

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (102): account, ACCOUNT_OFF, active, aiShown(), aiToggle, aiWork, app, applySpellcheck() (+94 more)

### Community 3 - "compile"
Cohesion: 0.06
Nodes (70): criticalLine(), named(), severalItems(), surface(), areaFor(), complexValue(), condLabel(), constantValue() (+62 more)

### Community 4 - "sync.ts"
Cohesion: 0.05
Nodes (39): @electric-sql/pglite, AccountSync, withLock(), Account, EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+31 more)

### Community 5 - "spec.ts"
Cohesion: 0.06
Nodes (82): conicItems(), isConicLine(), quadricEquation(), isFourierLine(), onlyComplex(), isTestLine(), isNumericalLine(), numericalItems() (+74 more)

### Community 6 - "solve.ts"
Cohesion: 0.08
Nodes (49): fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), decimalSeparator(), Digits (+41 more)

### Community 7 - "num"
Cohesion: 0.12
Nodes (94): atIntegers(), withoutAbs(), exp(), hyperbolicToExp(), linearIn(), termTransform(), polyEx(), constantParticular() (+86 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (44): FIGURE_PALETTE, addLabel(), boxes, cameras, complexCoord(), containing(), coord(), drawings (+36 more)

### Community 9 - "Dove sono le cose"
Cohesion: 0.06
Nodes (73): Dove sono le cose, Glifo – architettura, allNames(), answerFollowUp(), bareResult(), CHAT_SUBJECT, chatContext, ChatFn (+65 more)

### Community 10 - "spreadsheet.test.ts"
Cohesion: 0.08
Nodes (56): sheetSummary(), at(), breakEven(), Point, quantity(), tableItems(), textLabel(), chartData (+48 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.09
Nodes (62): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+54 more)

### Community 12 - "svg.ts"
Cohesion: 0.07
Nodes (61): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), staticGraphSvg(), chooseWindow(), chooseY(), clipLines() (+53 more)

### Community 13 - "domain.ts"
Cohesion: 0.09
Nodes (48): constantIntegrand(), depth(), inequalityMargin(), integralRegion, LayeredSolid, Multiple, planeMargin(), PlanePart (+40 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.10
Nodes (6): isLanes(), SchemaEditor, withLaneContents(), createEdgeCell(), EdgeLook, serializeSchema()

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (5): rangeLabel(), SheetEditor, serializeSheet(), CellRange, cloneSheet()

### Community 17 - "editor.test.ts"
Cohesion: 0.06
Nodes (32): @codemirror/state, templateInsertion(), CODE_NODES, CommandToken, commandTokenAt(), EditorMathContext, isInCode(), MATH_NODES (+24 more)

### Community 18 - "MathError"
Cohesion: 0.13
Nodes (47): MathError, bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial() (+39 more)

### Community 19 - "arithmetic.ts"
Cohesion: 0.07
Nodes (91): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+83 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (41): b, bigops, c, calculus, fn, fr, fractions, functions (+33 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "topics.ts"
Cohesion: 0.17
Nodes (23): ATTRIBUTES, count(), cut(), ER_SHAPES, fieldText(), fitLines(), flowOrder(), formulaText() (+15 more)

### Community 23 - "parseSchema"
Cohesion: 0.08
Nodes (37): schemaSummary(), svg(), GraphLook, findSchemaBlock(), findSchemaBlocks(), OpenFence, schemaBlockAtLine(), schemaBlockText() (+29 more)

### Community 24 - "store.ts"
Cohesion: 0.08
Nodes (23): fake-indexeddb, Prefs, BoardPalette, PEN_SIZE, SizeChoice, BackupBoard, BoardBackend, BoardChange (+15 more)

### Community 25 - "linear.ts"
Cohesion: 0.11
Nodes (55): angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, dataOf(), degreesText() (+47 more)

### Community 26 - "Rational"
Cohesion: 0.10
Nodes (22): Part, spend(), bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactRandom, exactRoot() (+14 more)

### Community 27 - "assistant.ts"
Cohesion: 0.09
Nodes (29): @anthropic-ai/sdk, AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible() (+21 more)

### Community 28 - "polynomial.ts"
Cohesion: 0.22
Nodes (23): inverseRational(), R(), parametricRows(), degree(), Factor, factorQ(), monic(), ONE (+15 more)

### Community 29 - "parse.ts"
Cohesion: 0.06
Nodes (39): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, differentialInFraction(), DISTRIBUTION_EXAMPLES (+31 more)

### Community 30 - "gantt.ts"
Cohesion: 0.06
Nodes (58): amount(), barColor(), crossings(), dateText(), dayOf(), fitText(), GanttOptions, ganttSvg() (+50 more)

### Community 31 - "openShareDialog"
Cohesion: 0.15
Nodes (17): openShareDialog(), changeAccess(), changeCopy(), refreshChanged(), render(), run(), setStatus(), shareNow() (+9 more)

### Community 32 - "search.ts"
Cohesion: 0.16
Nodes (25): SuggestionItem, editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase() (+17 more)

### Community 33 - "editor/editor.ts"
Cohesion: 0.04
Nodes (67): description, name, private, type, version, @codemirror/autocomplete, @codemirror/lang-markdown, @codemirror/language (+59 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - ".renderFormat"
Cohesion: 0.18
Nodes (12): fieldInput(), edgeLook(), edgeStyle(), edgeTextAt(), insertSchema(), nodeLook(), nodeStyle(), readSchema() (+4 more)

### Community 36 - "complex.ts"
Cohesion: 0.09
Nodes (36): add(), asin(), atan(), compileApply(), compileComplex(), compileFunction(), compileName(), ComplexCompiled (+28 more)

### Community 37 - "namesIn"
Cohesion: 0.13
Nodes (37): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+29 more)

### Community 38 - "captcha.ts"
Cohesion: 0.21
Nodes (8): captchaToken(), loadTurnstile(), Turnstile, TURNSTILE_SCRIPT, Window, TURNSTILE_SITE_KEY, accountFailure(), Options

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "calcResults.ts"
Cohesion: 0.12
Nodes (14): @lezer/common, acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult, calcResults(), CheckWidget (+6 more)

### Community 41 - "explainPanel.ts"
Cohesion: 0.18
Nodes (21): explainTarget, Explanation, explanationMarkdown(), hasCalculation(), insertAfterBlock(), insertAfterText(), insertExplanation(), nextLineText() (+13 more)

### Community 42 - "several.ts"
Cohesion: 0.08
Nodes (55): close(), Definite, definiteIntegral(), exValue(), samples(), EMPTY_SCOPE, Piece, LimitValue (+47 more)

### Community 43 - "study.ts"
Cohesion: 0.14
Nodes (37): names(), STUDY_GRAPH, studyItems(), nameLatex(), limit(), Asymptote, compiled(), cutsOf() (+29 more)

### Community 44 - "functions.ts"
Cohesion: 0.08
Nodes (68): CellResult, EMPTY, number(), addFormat(), decimalsOf(), divFormat(), Format, GENERAL (+60 more)

### Community 45 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 46 - "NotesStore"
Cohesion: 0.05
Nodes (34): Deletion, DeletionLog, cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder() (+26 more)

### Community 47 - "view3d.ts"
Cohesion: 0.06
Nodes (86): sampleRegion(), tickLabel(), addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy() (+78 more)

### Community 48 - "inference.ts"
Cohesion: 0.07
Nodes (46): FieldContext, number(), testItems(), classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX (+38 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (35): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+27 more)

### Community 50 - "escapeHtml"
Cohesion: 0.22
Nodes (17): valueNode(), labelHtml(), texHtml(), checkHtml(), checkTitle(), cache, escapeHtml(), renderTex() (+9 more)

### Community 51 - "sidePanel.ts"
Cohesion: 0.11
Nodes (19): formulaAtCursor(), cleanKatexError(), isConfidentAnswer(), CATEGORIES, symbolsInCategory(), cardPreviewTex(), formPreviewTex(), ParsedTemplate (+11 more)

### Community 52 - "Board"
Cohesion: 0.10
Nodes (7): Board, clampZoom(), loadPrefs(), penErases(), pressureOf(), validView(), Pt

### Community 53 - "supabase.ts"
Cohesion: 0.04
Nodes (82): @supabase/supabase-js, AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), accountError, appUrl(), call() (+74 more)

### Community 54 - "aiPanel.test.ts"
Cohesion: 0.11
Nodes (20): definedName(), formulaTopic(), graphTopic(), numberText(), studyOf(), theoremTopic(), NoteSubject, SubjectKind (+12 more)

### Community 55 - "ui/preview.ts"
Cohesion: 0.10
Nodes (15): GraphLabels, renameGraphScope(), renameScopeKeys(), BlockKind, MoveDir, hydrateSheets(), BLOCK_NAMES, blockKindOf() (+7 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "board.ts"
Cohesion: 0.05
Nodes (58): Action, ACTION_NAMES, coalesced(), DOT_SIZES, DrawAction, EraseAction, EraserMode, Finger (+50 more)

### Community 58 - "src/relocation.ts"
Cohesion: 0.07
Nodes (55): accountSpace(), adoptGuestNotes(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf(), setCurrentAccount() (+47 more)

### Community 59 - "odesolve.ts"
Cohesion: 0.07
Nodes (74): primed(), addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames() (+66 more)

### Community 60 - "Glifo"
Cohesion: 0.13
Nodes (15): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Commenti, Compatibilità con VS Code, Condividere una nota con un link (+7 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "h"
Cohesion: 0.05
Nodes (64): SyncStatus, EXPLAIN_TONES, openGuide(), viewSwitch, moveDayLabel(), RelocationResult, DEFAULT_SETTINGS, AccountButton (+56 more)

### Community 63 - "sheet.ts"
Cohesion: 0.04
Nodes (70): vitest, GraphItem, parseGraph(), typedSliderValue(), PALETTES, numericPartials(), OdeFunction, errorMessage() (+62 more)

### Community 64 - "explainChat.ts"
Cohesion: 0.13
Nodes (14): ExplainTone, FollowUp, REPLY_TOKENS, Settings, AI_NEWS_TITLE, AI_WORKING_TITLE, aiActivity, AiWork (+6 more)

### Community 65 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 66 - "spreadsheet/editor.ts"
Cohesion: 0.09
Nodes (37): currentCall(), Editing, MenuEntry, Move, openSheetEditor(), PATHS, SheetEditorOptions, Snapshot (+29 more)

### Community 67 - "markdown.ts"
Cohesion: 0.06
Nodes (65): @codemirror/commands, lineDepth(), parseBlockMath(), blockMoved, blockMoves(), blockMoveTransaction(), LineMap, dataRange() (+57 more)

### Community 68 - "smoke-test.mjs"
Cohesion: 0.25
Nodes (5): markdown-it, playwright-core, fakeLlmWorker(), firstVisit(), plainContext

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "relocation-test.mjs"
Cohesion: 0.18
Nodes (7): AFTER_MOVE, ids, newBrowser(), NOTICE_DAY, out, serve(), TYPES

### Community 72 - "probability.ts"
Cohesion: 0.10
Nodes (32): addExp(), End, exactIntervalProbability(), expSum, Family, integerRange(), intervalProbability(), subtractExp() (+24 more)

### Community 73 - "MarkdownEditor"
Cohesion: 0.09
Nodes (20): closeMathBlockOnEnter(), EditorCallbacks, MarkdownEditor, tabOutOfMath(), insertBlock(), insertTemplate(), wrapSelection(), Action (+12 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.06
Nodes (61): primitive(), linearCells(), pairUp(), assumePositive(), atValues(), cancelLinear(), commonPositive(), Converter (+53 more)

### Community 75 - "schema/templates.ts"
Cohesion: 0.10
Nodes (18): DEFAULT_EDGE, NodeLook, SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), tableMetrics(), conceptMap (+10 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Errore o imprevisto → nel dettaglio, 3. Serve una decisione → frasi complete, 4. Fine del compito → un solo riepilogo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.05
Nodes (56): laneOf(), alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ARROW_NAMES (+48 more)

### Community 79 - "distributions.ts"
Cohesion: 0.16
Nodes (28): choose(), continuousQuantile(), discreteQuantile(), expSumValue(), factorialBig(), FAMILIES, integerParam(), invalid() (+20 more)

### Community 82 - "BoardStore"
Cohesion: 0.08
Nodes (17): BoardStore, MemoryBoards, newStrokeId(), applyAccountChange(), backup(), receiveRelocation(), restore(), BackupNote (+9 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.20
Nodes (6): centerOf(), clickOn(), ffmpeg, SCENES, SIZE, work

### Community 90 - "Abbonamenti"
Cohesion: 0.08
Nodes (24): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Deciso (5 ottobre 2026), Deciso (5 ottobre 2026) (+16 more)

### Community 91 - "plan.ts"
Cohesion: 0.20
Nodes (15): cellText(), columnRole(), columnsOf(), durationUnit(), isNumber(), isPlanRange(), MAX_ACTIVITIES, plain() (+7 more)

### Community 92 - "Costi"
Cohesion: 0.21
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 96 - "account-test.mjs"
Cohesion: 0.12
Nodes (10): device(), login(), newContext, waitFor(), b64(), CAPTCHA_TOKEN, CODE, GOOGLE_CODE (+2 more)

### Community 97 - "statsShown.ts"
Cohesion: 0.17
Nodes (31): Lin, check(), correlation(), count(), covariance(), Data, DATA_FUNCTIONS, dataStatistic() (+23 more)

### Community 98 - "gauss.ts"
Cohesion: 0.15
Nodes (24): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexLine(), isComplexValue() (+16 more)

### Community 100 - "page.ts"
Cohesion: 0.10
Nodes (22): katex, currentAccount(), SharedNote, body, draw(), isDark(), load(), saveButton (+14 more)

### Community 101 - "linsys.ts"
Cohesion: 0.10
Nodes (44): formatRational(), eigenvectors(), EXACT, FLOAT, kernel(), Mat, rref(), surdText() (+36 more)

### Community 102 - "Field"
Cohesion: 0.12
Nodes (7): characteristicPolynomial(), eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn()

### Community 103 - "siteUpdate.ts"
Cohesion: 0.15
Nodes (17): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, PartNotLoaded (+9 more)

### Community 104 - ".folderItem"
Cohesion: 0.20
Nodes (4): clear(), formatDate(), NotesPanel, NotesPanelDeps

### Community 105 - "fourier.ts"
Cohesion: 0.24
Nodes (17): absOf(), boundsOf(), close(), definite(), fourierProblem, fourierShown(), isTrig(), isZero() (+9 more)

### Community 106 - "Stroke"
Cohesion: 0.14
Nodes (13): BOARD_PALETTES, BoardTheme, inkName(), mid(), outlineSvg(), shapeSvg(), strokeOptions(), strokeOutline() (+5 more)

### Community 107 - "localModels.ts"
Cohesion: 0.09
Nodes (28): @mlc-ai/web-llm, chat(), GlifoError, Gpu, load(), post(), remove(), scope (+20 more)

### Community 108 - "xlsx.ts"
Cohesion: 0.10
Nodes (39): RFC-4180, fflate, csvDelimiter(), csvToSheet(), field(), italian(), parseCsv(), sheetToCsv() (+31 more)

### Community 110 - "touchLog"
Cohesion: 0.31
Nodes (3): movesLine(), seconds(), touchLog

### Community 113 - "graph.ts"
Cohesion: 0.06
Nodes (39): @maxgraph/core, AT_X, cellHtml(), cellText(), COMPASS, createGraph(), drawSchema(), isEdgeLook() (+31 more)

### Community 116 - "Il database degli account (Supabase)"
Cohesion: 0.15
Nodes (12): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il controllo anti-robot (CAPTCHA, ottobre 2026), Il database degli account (Supabase), Il progetto, Il trasloco su glifo.page (ottobre 2026) (+4 more)

### Community 117 - "Glifo – note per Claude"
Cohesion: 0.11
Nodes (17): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole (+9 more)

### Community 118 - "ExplainPanel"
Cohesion: 0.15
Nodes (5): ExplainChat, ExplainPanel, preventFocusSteal(), formulasSummary(), setup()

### Community 119 - "conics.ts"
Cohesion: 0.21
Nodes (27): at(), centralCanonical(), Coefficients, coneCanonical(), conicOf(), det2(), det3(), determinant() (+19 more)

### Community 120 - "toLatex"
Cohesion: 0.13
Nodes (26): fourierItems(), partialSum(), ACCENT_COMMANDS, COMPLEX_FUNCTIONS, diffLatex(), DISTRIBUTION_LATEX, distributionLatex(), domainLatex() (+18 more)

### Community 121 - "files.ts"
Cohesion: 0.24
Nodes (13): inClaudeViewer(), canWriteFilesDirectly(), FsWindow, isAbort(), MD_TYPES, OPEN_TYPES, OpenedFile, openMarkdownFiles() (+5 more)

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "strokes.ts"
Cohesion: 0.25
Nodes (13): between(), capsuleSpan(), circleSpan(), eraserGrowth(), eraseStroke(), intersect(), linearSpan(), pieceLength() (+5 more)

### Community 124 - "Sheet"
Cohesion: 0.09
Nodes (24): ExactComplexScope, ConicInfo, Ode, withWorkLimit(), FiniteContext, FormattedResult, MathNode, chainOf() (+16 more)

### Community 125 - "sql.ts"
Cohesion: 0.17
Nodes (17): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+9 more)

### Community 126 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

### Community 127 - "grafo-html.mjs"
Cohesion: 0.17
Nodes (5): graphFile, names, namesFile, root, PNG_ICONS

### Community 128 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 129 - "graph/file.ts"
Cohesion: 0.10
Nodes (39): figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsForFile(), graphsFromFile(), hide(), OPEN (+31 more)

### Community 131 - "schemaBlocks.ts"
Cohesion: 0.10
Nodes (22): @codemirror/view, InsertOptions, toggleLinePrefix(), LIST_STYLES, besideSchema(), BlockWidget, findWidgetBlocks(), guardBlocks() (+14 more)

### Community 132 - "deploy.test.ts"
Cohesion: 0.28
Nodes (4): vite-plugin-pwa, accountOffMessage(), defineFor(), MAIN_BRANCH

### Community 133 - "formula.ts"
Cohesion: 0.14
Nodes (16): BinOp, COMPARE, ERRORS_BY_LENGTH, FormulaError, formulaRefs(), OPERATORS, parseFormula(), Parser (+8 more)

### Community 136 - "spiegami-qwen.mjs"
Cohesion: 0.29
Nodes (4): vite, minutes, postMessage(), started

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 139 - "boardTouchLog.test.ts"
Cohesion: 0.20
Nodes (8): isSaved(), LOG_MAX_LINES, LogStore, SavedLog, clock(), memoryStore(), newLog(), texts()

### Community 140 - "downloadText"
Cohesion: 0.38
Nodes (6): loadDialect(), svgSize(), svgToPng(), downloadBlob(), downloadText(), fileNameFor()

### Community 143 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

## Knowledge Gaps
- **696 isolated node(s):** `session-start.sh script`, `name`, `private`, `version`, `description` (+691 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 978 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **32 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `touchlog.ts`, `Parser`, `main.ts`, `compile`, `spec.ts`, `solve.ts`, `num`, `graph/preview.ts`, `spreadsheet.test.ts`, `svg.ts`, `SchemaEditor`, `.onKey`, `SheetEditor`, `MathError`, `arithmetic.ts`, `topics.ts`, `linear.ts`, `Rational`, `assistant.ts`, `parse.ts`, `gantt.ts`, `editor/editor.ts`, `logic.ts`, `.renderFormat`, `complex.ts`, `namesIn`, `calcResults.ts`, `explainPanel.ts`, `several.ts`, `study.ts`, `functions.ts`, `finite.ts`, `NotesStore`, `view3d.ts`, `inference.ts`, `board/shapes.ts`, `escapeHtml`, `sidePanel.ts`, `Board`, `supabase.ts`, `aiPanel.test.ts`, `ui/preview.ts`, `board.ts`, `src/relocation.ts`, `odesolve.ts`, `h`, `sheet.ts`, `explainChat.ts`, `spreadsheet/editor.ts`, `markdown.ts`, `smoke-test.mjs`, `probability.ts`, `MarkdownEditor`, `symbolic.ts`, `schema/editor.ts`, `BoardStore`, `plan.ts`, `gauss.ts`, `linsys.ts`, `siteUpdate.ts`, `fourier.ts`, `Stroke`, `localModels.ts`, `xlsx.ts`, `touchLog`, `graph.ts`, `ExplainPanel`, `toLatex`, `files.ts`, `strokes.ts`, `Sheet`, `graph/file.ts`, `schemaBlocks.ts`, `deploy.test.ts`, `formula.ts`, `boardTouchLog.test.ts`, `downloadText`?**
  _High betweenness centrality (0.200) - this node is a cross-community bridge._
- **Why does `vitest` connect `sheet.ts` to `touchlog.ts`, `schemaBlocks.ts`, `sync.ts`, `deploy.test.ts`, `spec.ts`, `num`, `Dove sono le cose`, `spreadsheet.test.ts`, `boardTouchLog.test.ts`, `editor/lists.ts`, `svg.ts`, `editor.test.ts`, `parseSchema`, `store.ts`, `assistant.ts`, `polynomial.ts`, `parse.ts`, `search.ts`, `editor/editor.ts`, `captcha.ts`, `resize.ts`, `NotesStore`, `view3d.ts`, `board/shapes.ts`, `sidePanel.ts`, `supabase.ts`, `aiPanel.test.ts`, `ui/preview.ts`, `board.ts`, `src/relocation.ts`, `h`, `explainChat.ts`, `spreadsheet/editor.ts`, `markdown.ts`, `MarkdownEditor`, `schema/editor.ts`, `distributions.ts`, `BoardStore`, `plan.ts`, `page.ts`, `linsys.ts`, `siteUpdate.ts`, `Stroke`, `localModels.ts`, `xlsx.ts`, `strokes.ts`, `sql.ts`?**
  _High betweenness centrality (0.100) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `main.ts`, `graph/preview.ts`, `downloadText`, `SchemaEditor`, `.onKey`, `SheetEditor`, `gantt.ts`, `openShareDialog`, `editor/editor.ts`, `.renderFormat`, `resize.ts`, `explainPanel.ts`, `NotesStore`, `escapeHtml`, `sidePanel.ts`, `Board`, `supabase.ts`, `aiPanel.test.ts`, `ui/preview.ts`, `board.ts`, `explainChat.ts`, `spreadsheet/editor.ts`, `MarkdownEditor`, `schema/editor.ts`, `BoardStore`, `page.ts`, `.folderItem`, `ExplainPanel`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **Are the 271 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `adoptGuestNotes()`) actually correct?**
  _`Dove sono le cose` has 271 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `name`, `private` to the rest of the system?**
  _696 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `touchlog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.043202257097513665 - nodes in this community are weakly interconnected._