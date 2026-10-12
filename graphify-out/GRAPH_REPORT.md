# Graph Report - matherdown  (2026-10-12)

## Corpus Check
- 321 files · ~619,285 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5122 nodes · 18522 edges · 166 communities (129 shown, 37 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 613 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7d29fe13`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- touchlog.ts
- Parser
- main.ts
- math/evaluate.ts
- sync.ts
- spec.ts
- view3d.ts
- num
- graph/preview.ts
- Dove sono le cose
- spreadsheet/format.ts
- editor/lists.ts
- svg.ts
- parseSchema
- SchemaEditor
- Board
- SheetEditor
- editor.test.ts
- numerical.ts
- arithmetic.ts
- index.ts
- engine.ts
- topics.ts
- .renderFormat
- store.ts
- MathError
- markers.ts
- assistant.ts
- editor/editor.ts
- graph/space.ts
- gantt.ts
- markdown.ts
- touchLog
- spell.test.ts
- logic.ts
- feedback.ts
- complex.ts
- namesIn
- parse.ts
- resize.ts
- Sheet
- planPreview.ts
- several.ts
- sheet.ts
- functions.ts
- finite.ts
- src/relocation.ts
- Pt
- Rational
- board/shapes.ts
- NotesStore
- SidePanel
- inference.ts
- supabase.ts
- explainPanel.ts
- schemaTools.test.ts
- 20261004091555_note_condivise.sql
- gantt.test.ts
- database.ts
- odesolve.ts
- Glifo
- dependencies
- boardTouchLog.test.ts
- toLatex
- h
- Piano per piano
- spreadsheet/editor.ts
- blockMove.ts
- smoke-test.mjs
- Benvenuto in Glifo
- compilerOptions
- relocation-test.mjs
- probability.ts
- toolbar.ts
- symbolic.ts
- .sameAs
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- distributions.ts
- session-start.sh
- .claude/CLAUDE.md
- tools.ts
- tutorial.mjs
- Abbonamenti
- aiPanel.ts
- Costi
- supabase-stub.sql
- account-test.mjs
- statsShown.ts
- Field
- page.ts
- linsys.ts
- search.ts
- siteUpdate.ts
- ui/preview.ts
- MathNode
- ink.ts
- localModels.ts
- xlsx.ts
- explainSubjects.ts
- graph.ts
- Il database degli account (Supabase)
- Glifo – note per Claude
- ExplainPanel
- conics.ts
- schema/templates.ts
- files.ts
- Le spiegazioni, come funzionano
- board.ts
- FormattedResult
- sql.ts
- aiPanel.test.ts
- ref_node_fs
- createFakeSupabase
- graph/file.ts
- schemaGuard.test.ts
- MarkdownEditor
- Parser
- suggestions.ts
- 20261008130026_commenti.sql
- sidePanel.ts
- vitest
- graph3d.test.ts
- .folderItem
- statsGraph.ts
- devDependencies
- restore.test.ts
- plan.ts
- Distribution
- math/calculus.ts
- AiPanel
- .showSpaces
- .int
- linear.test.ts
- logo.ts
- La grafica: le otto richieste del 10 ottobre 2026
- appleTouch

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 278 edges
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
- `Dove sono le cose` --references--> `ConicElements`  [INFERRED]
  ARCHITETTURA.md → src/math/conics.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (166 total, 37 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.15
Nodes (16): at(), browserStore, clip(), KINDS, LOG_KEY, Moves, MOVES_MAX, pointerDetail() (+8 more)

### Community 1 - "Parser"
Cohesion: 0.17
Nodes (3): describe(), MathSyntaxError, Parser

### Community 2 - "main.ts"
Cohesion: 0.03
Nodes (124): 2. La pagina dei commenti, tipo FAQ, newStrokeId(), addToGraphBlock(), graphsForFile(), hide(), account, ACCOUNT_OFF, accountButton (+116 more)

### Community 3 - "math/evaluate.ts"
Cohesion: 0.07
Nodes (48): axesIn(), bestAlong(), boundingBox(), combine(), compileDomain(), compileMultiple(), conditionsOf(), constantOf() (+40 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (31): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+23 more)

### Community 5 - "spec.ts"
Cohesion: 0.06
Nodes (81): conicItems(), isConicLine(), quadricEquation(), constantIntegrand(), depth(), inequalityMargin(), integralRegion, LayeredSolid (+73 more)

### Community 6 - "view3d.ts"
Cohesion: 0.10
Nodes (38): tickLabel(), Face, lerp(), planeSide(), planeTolerance(), regionFaces(), splitFace(), splitLine() (+30 more)

### Community 7 - "num"
Cohesion: 0.11
Nodes (107): atIntegers(), definite(), linearTrig(), oneFraction(), signsUp(), symbolicCoefficient(), withoutAbs(), exp() (+99 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (44): addLabel(), boxes, cameras, complexCoord(), coord(), drawings, drawnViews, endTex() (+36 more)

### Community 9 - "Dove sono le cose"
Cohesion: 0.09
Nodes (55): Dove sono le cose, Glifo – architettura, allNames(), answerFollowUp(), bareResult(), CHAT_SUBJECT, chatContext, ChatFn (+47 more)

### Community 10 - "spreadsheet/format.ts"
Cohesion: 0.13
Nodes (27): quantity(), tableItems(), textLabel(), chartData, chartFrom(), chartLines(), chartRange(), ChartTable (+19 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.18
Nodes (31): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+23 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (53): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), dataWindow(), domainEdge() (+45 more)

### Community 13 - "parseSchema"
Cohesion: 0.15
Nodes (16): schemaSummary(), svg(), hide(), OPEN, schemasForFile(), schemasFromFile(), unhide(), isRecord() (+8 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.11
Nodes (3): SchemaEditor, withLaneContents(), serializeSchema()

### Community 15 - "Board"
Cohesion: 0.09
Nodes (6): Board, clampZoom(), penErases(), Step, validView(), Stroke

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (7): rangeLabel(), SheetEditor, serializeSheet(), CellRange, clearRange(), cloneSheet(), setCell()

### Community 17 - "editor.test.ts"
Cohesion: 0.08
Nodes (30): InsertOptions, templateInsertion(), CODE_NODES, CommandToken, commandTokenAt(), isInCode(), MATH_NODES, mathContextAt() (+22 more)

### Community 18 - "numerical.ts"
Cohesion: 0.12
Nodes (47): bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial(), interpolating() (+39 more)

### Community 19 - "arithmetic.ts"
Cohesion: 0.07
Nodes (83): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+75 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (41): b, bigops, c, calculus, fn, fr, fractions, functions (+33 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (24): @farscrl/hunspell-wasm, editDistance(), Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable (+16 more)

### Community 22 - "topics.ts"
Cohesion: 0.17
Nodes (26): ATTRIBUTES, count(), cut(), ER_SHAPES, fieldText(), fitLines(), flowOrder(), formulaText() (+18 more)

### Community 23 - ".renderFormat"
Cohesion: 0.16
Nodes (13): fieldInput(), isLanes(), textWidth(), cellText(), edgeLook(), edgeTextAt(), nodeLook(), nodeStyle() (+5 more)

### Community 24 - "store.ts"
Cohesion: 0.05
Nodes (22): fake-indexeddb, BoardOptions, BoardBackend, BoardChange, BoardData, BoardStore, done(), fromRecord() (+14 more)

### Community 25 - "MathError"
Cohesion: 0.12
Nodes (57): MathError, nameLabel(), UndefinedName, angleBetween(), asMatrix(), basisOf(), circleText(), cross() (+49 more)

### Community 26 - "markers.ts"
Cohesion: 0.11
Nodes (36): Item, ListStyle, bullet(), bulletGroup(), childMarker(), column(), firstMarker(), label() (+28 more)

### Community 27 - "assistant.ts"
Cohesion: 0.13
Nodes (19): @anthropic-ai/sdk, AiAnswer, AiError, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible(), askThroughHost() (+11 more)

### Community 28 - "editor/editor.ts"
Cohesion: 0.07
Nodes (33): description, name, private, type, version, @codemirror/autocomplete, @codemirror/commands, @codemirror/language (+25 more)

### Community 29 - "graph/space.ts"
Cohesion: 0.12
Nodes (42): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+34 more)

### Community 30 - "gantt.ts"
Cohesion: 0.09
Nodes (45): amount(), barColor(), crossings(), dateText(), dayOf(), fitText(), GanttOptions, ganttSvg() (+37 more)

### Community 31 - "markdown.ts"
Cohesion: 0.11
Nodes (28): lineDepth(), parseBlockMath(), dataRange(), moveAttrs(), configurePurify(), createMarkdownIt(), FORBIDDEN_TAGS, HLJS_LANGUAGES (+20 more)

### Community 32 - "touchLog"
Cohesion: 0.29
Nodes (3): movesLine(), seconds(), touchLog

### Community 33 - "spell.test.ts"
Cohesion: 0.08
Nodes (23): @codemirror/lang-markdown, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt() (+15 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "feedback.ts"
Cohesion: 0.08
Nodes (39): vite-plugin-pwa, AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountOffMessage(), Site, commentDate(), commentItem() (+31 more)

### Community 36 - "complex.ts"
Cohesion: 0.05
Nodes (70): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexLine(), isComplexValue() (+62 more)

### Community 37 - "namesIn"
Cohesion: 0.12
Nodes (38): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+30 more)

### Community 38 - "parse.ts"
Cohesion: 0.06
Nodes (38): hasWord(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, differentialInFraction() (+30 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "Sheet"
Cohesion: 0.08
Nodes (19): FiniteContext, definitionTarget(), fingerprint(), Sheet, text(), tex(), text(), check() (+11 more)

### Community 41 - "planPreview.ts"
Cohesion: 0.14
Nodes (17): measured(), PLAN_FONT, PlanDrawing, planSwatchSvg(), textWidth(), FIGURE, FIGURE_WIDTH, PlanError (+9 more)

### Community 42 - "several.ts"
Cohesion: 0.09
Nodes (54): criticalLine(), named(), severalItems(), surface(), Definite, Piece, Condition, Family (+46 more)

### Community 43 - "sheet.ts"
Cohesion: 0.04
Nodes (122): fracTex(), fracText(), nearFraction(), piMultiple(), surd(), close(), definiteIntegral(), exValue() (+114 more)

### Community 44 - "functions.ts"
Cohesion: 0.08
Nodes (60): EMPTY, evaluateSheet(), number(), SheetEvaluator, addFormat(), divFormat(), GENERAL, most() (+52 more)

### Community 45 - "finite.ts"
Cohesion: 0.19
Nodes (26): countOf(), elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError, FiniteResult (+18 more)

### Community 46 - "src/relocation.ts"
Cohesion: 0.06
Nodes (71): 1. «Cambia account», accountSpace(), adoptGuestNotes(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf() (+63 more)

### Community 47 - "Pt"
Cohesion: 0.13
Nodes (14): coalesced(), EraseAction, Finger, LassoAction, MoveAction, PanAction, PinchAction, pointsOf() (+6 more)

### Community 48 - "Rational"
Cohesion: 0.13
Nodes (20): Part, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactFunction, exactRoot(), factorialExact() (+12 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (37): DrawAction, adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners() (+29 more)

### Community 50 - "NotesStore"
Cohesion: 0.06
Nodes (33): Deletion, DeletionLog, cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder() (+25 more)

### Community 51 - "SidePanel"
Cohesion: 0.17
Nodes (6): cleanKatexError(), isConfidentAnswer(), symbolsInCategory(), displayCode(), preventFocusSteal(), SidePanel

### Community 52 - "inference.ts"
Cohesion: 0.16
Nodes (24): chiSquareTest(), confidence(), confidenceShown(), Given, hypothesisTest(), InferenceContext, interval(), meanOf() (+16 more)

### Community 53 - "supabase.ts"
Cohesion: 0.08
Nodes (37): @supabase/supabase-js, captchaToken(), loadTurnstile(), Turnstile, TURNSTILE_SCRIPT, Window, TURNSTILE_SITE_KEY, accountError (+29 more)

### Community 54 - "explainPanel.ts"
Cohesion: 0.10
Nodes (21): ExplainTone, Explanation, FollowUp, REPLY_TOKENS, explanationMarkdown(), Settings, AI_NEWS_TITLE, AI_WORKING_TITLE (+13 more)

### Community 55 - "schemaTools.test.ts"
Cohesion: 0.18
Nodes (14): alignBoxes(), Alignment, Box, distributeBoxes(), Position, base64(), crc32(), svgSize() (+6 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "gantt.test.ts"
Cohesion: 0.12
Nodes (23): graphImagesFor(), MONTHS, parseDate(), planBlock, PlanKind, planRange(), readPlan(), blockLines() (+15 more)

### Community 58 - "database.ts"
Cohesion: 0.21
Nodes (7): @electric-sql/pglite, createDatabase(), createUser(), databaseTests(), feedbackTests(), migrations, shareTests()

### Community 59 - "odesolve.ts"
Cohesion: 0.08
Nodes (75): primed(), linearIn(), substitute(), addWave(), arrange(), cauchy(), characteristicRoots(), compiled() (+67 more)

### Community 60 - "Glifo"
Cohesion: 0.13
Nodes (15): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Commenti, Compatibilità con VS Code, Condividere una nota con un link (+7 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "boardTouchLog.test.ts"
Cohesion: 0.20
Nodes (8): isSaved(), LOG_MAX_LINES, LogStore, SavedLog, clock(), memoryStore(), newLog(), texts()

### Community 63 - "toLatex"
Cohesion: 0.08
Nodes (46): fourierItems(), isFourierLine(), isNumericalLine(), numericalItems(), areaFor(), condLabel(), constantValue(), isStraight() (+38 more)

### Community 64 - "h"
Cohesion: 0.04
Nodes (86): 3. Le impostazioni divise in sezioni, SyncStatus, EXPLAIN_TONES, aiService, board, loadingEditor(), sidebarToggle(), viewSwitch (+78 more)

### Community 65 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 66 - "spreadsheet/editor.ts"
Cohesion: 0.06
Nodes (75): RFC-4180, fflate, KINDS, sheetSummary(), WidgetBlock, tablesNote(), SchemaBlock, csvDelimiter() (+67 more)

### Community 67 - "blockMove.ts"
Cohesion: 0.10
Nodes (35): @codemirror/state, @codemirror/view, blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove (+27 more)

### Community 68 - "smoke-test.mjs"
Cohesion: 0.14
Nodes (9): markdown-it, playwright-core, vite, fakeLlmWorker(), firstVisit(), plainContext, minutes, postMessage() (+1 more)

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
Cohesion: 0.12
Nodes (24): End, Family, Interval, CompileOptions, ExactScope, ALL, complement(), endAt() (+16 more)

### Community 73 - "toolbar.ts"
Cohesion: 0.19
Nodes (14): insertBlock(), wrapSelection(), Action, createToolbar(), insertCode(), insertLink(), listStyle(), MenuItem (+6 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (54): numericPartials(), primitive(), linearCells(), atValues(), Converter, coordinates(), decimalText(), definiteParts() (+46 more)

### Community 75 - ".sameAs"
Cohesion: 0.14
Nodes (11): bracketParts(), chainOf(), close(), digitsMatch(), isLiteral(), parseCached(), sameExactLinear(), splitPieces() (+3 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Errore o imprevisto → nel dettaglio, 3. Serve una decisione → frasi complete, 4. Fine del compito → un solo riepilogo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.06
Nodes (46): ALIGN, ARROW_NAMES, AT_ICONS, AT_NAMES, BASE_PRESETS, BIG_ARROWS, DB_PRESETS, Direction (+38 more)

### Community 79 - "distributions.ts"
Cohesion: 0.18
Nodes (26): choose(), continuousQuantile(), factorialBig(), FAMILIES, integerParam(), invalid(), makeDistribution(), ONE (+18 more)

### Community 82 - "tools.ts"
Cohesion: 0.10
Nodes (16): ExplainEvents, ExplainStep, ALL_TOOLS, callOf(), checkTool, FormulaCheck, Identities, looseJson() (+8 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.12
Nodes (10): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+2 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.08
Nodes (24): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Deciso (5 ottobre 2026), Deciso (5 ottobre 2026) (+16 more)

### Community 91 - "aiPanel.ts"
Cohesion: 0.09
Nodes (28): acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult, calcResults(), CheckWidget, insertResult() (+20 more)

### Community 92 - "Costi"
Cohesion: 0.22
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 96 - "account-test.mjs"
Cohesion: 0.11
Nodes (10): device(), login(), newContext, waitFor(), b64(), CAPTCHA_TOKEN, CODE, GOOGLE_CODE (+2 more)

### Community 97 - "statsShown.ts"
Cohesion: 0.16
Nodes (33): Lin, check(), correlation(), count(), covariance(), Data, DATA_FUNCTIONS, dataStatistic() (+25 more)

### Community 98 - "Field"
Cohesion: 0.11
Nodes (8): characteristicPolynomial(), eigenvalues(), eigenvectors(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn()

### Community 100 - "page.ts"
Cohesion: 0.10
Nodes (28): katex, accountDataFile(), currentAccount(), PullResult, isShareToken(), parseSharedNote(), readSharedNote(), SHARE_PAGE (+20 more)

### Community 101 - "linsys.ts"
Cohesion: 0.08
Nodes (66): integerPoly(), formatGauss(), formatRational(), fromRational(), surdText(), choices(), gcd(), linearSystem() (+58 more)

### Community 102 - "search.ts"
Cohesion: 0.19
Nodes (20): normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex(), IndexedEntry (+12 more)

### Community 103 - "siteUpdate.ts"
Cohesion: 0.15
Nodes (18): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, loadPart() (+10 more)

### Community 104 - "ui/preview.ts"
Cohesion: 0.08
Nodes (27): GraphLabels, GraphLook, renameGraphScope(), renameScopeKeys(), BlockKind, MoveDir, Look, Theme (+19 more)

### Community 105 - "MathNode"
Cohesion: 0.13
Nodes (12): Definition, Line, ExactComplexScope, Ode, OdeSystem, ExactRandom, Elem, differentialRequest (+4 more)

### Community 106 - "ink.ts"
Cohesion: 0.11
Nodes (18): loadPrefs(), Prefs, BOARD_PALETTES, BoardPalette, BoardTheme, highlightName(), inkName(), mid() (+10 more)

### Community 107 - "localModels.ts"
Cohesion: 0.09
Nodes (29): @mlc-ai/web-llm, chat(), GlifoError, Gpu, load(), post(), remove(), scope (+21 more)

### Community 108 - "xlsx.ts"
Cohesion: 0.09
Nodes (44): readNumber(), sameFormat(), BinOp, COMPARE, ERRORS_BY_LENGTH, formulaBody(), formulaRefs(), OPERATORS (+36 more)

### Community 110 - "explainSubjects.ts"
Cohesion: 0.19
Nodes (19): explainTarget, formulasUntil(), sheetBefore(), hasCalculation(), insertAfterBlock(), insertAfterText(), insertExplanation(), nextLineText() (+11 more)

### Community 113 - "graph.ts"
Cohesion: 0.06
Nodes (38): @maxgraph/core, AT_X, cellHtml(), COMPASS, createGraph(), drawSchema(), isEdgeLook(), isNodeLook() (+30 more)

### Community 116 - "Il database degli account (Supabase)"
Cohesion: 0.14
Nodes (13): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il controllo anti-robot (CAPTCHA, ottobre 2026), Il database degli account (Supabase), Il progetto, Il trasloco su glifo.page (ottobre 2026) (+5 more)

### Community 117 - "Glifo – note per Claude"
Cohesion: 0.11
Nodes (18): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole (+10 more)

### Community 119 - "conics.ts"
Cohesion: 0.18
Nodes (29): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+21 more)

### Community 120 - "schema/templates.ts"
Cohesion: 0.11
Nodes (19): SchemaEditorOptions, DEFAULT_EDGE, Schema, SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), conceptMap (+11 more)

### Community 121 - "files.ts"
Cohesion: 0.14
Nodes (20): cache, capability(), ClaudeRuntime, hostDownloads, HostError, inClaudeViewer(), ModelTier, runtime() (+12 more)

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "board.ts"
Cohesion: 0.07
Nodes (54): Action, ACTION_NAMES, DOT_SIZES, EraserMode, HANDLE_REACH, ICON, MODE_NAMES, SIZE_NAMES (+46 more)

### Community 124 - "FormattedResult"
Cohesion: 0.23
Nodes (5): withWorkLimit(), FormattedResult, SheetLine, styleOf(), needsSymbols()

### Community 125 - "sql.ts"
Cohesion: 0.17
Nodes (18): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+10 more)

### Community 126 - "aiPanel.test.ts"
Cohesion: 0.13
Nodes (17): definedName(), formulaTopic(), graphTopic(), numberText(), studyOf(), theoremTopic(), topicOf(), fakeModel() (+9 more)

### Community 128 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 129 - "graph/file.ts"
Cohesion: 0.10
Nodes (35): FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), graphsFromFile(), OPEN, swatchSvg(), titleBand() (+27 more)

### Community 131 - "schemaGuard.test.ts"
Cohesion: 0.13
Nodes (12): toggleLinePrefix(), besideSchema(), BlockWidget, findWidgetBlocks(), guardBlocks(), schemaBlockRanges(), schemaBlocks(), create() (+4 more)

### Community 132 - "MarkdownEditor"
Cohesion: 0.16
Nodes (5): closeMathBlockOnEnter(), EditorCallbacks, MarkdownEditor, tabOutOfMath(), insertTemplate()

### Community 136 - "suggestions.ts"
Cohesion: 0.19
Nodes (6): EditorMathContext, expand(), preferredIndex(), SuggestionController, isSubsequence(), suggestCommands()

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 139 - "sidePanel.ts"
Cohesion: 0.19
Nodes (15): AiResult, SuggestionItem, SearchResult, CATEGORIES, cardPreviewTex(), formPreviewTex(), ParsedTemplate, parseTemplate() (+7 more)

### Community 140 - "vitest"
Cohesion: 0.06
Nodes (49): vitest, formulaAtCursor(), GraphLabelLines, insertGraphBlock(), setGraphLabels(), isSeveralLine(), formulaGraph(), formulaGraphLine() (+41 more)

### Community 141 - "graph3d.test.ts"
Cohesion: 0.18
Nodes (15): staticGraphSvg(), chooseWindow(), containing(), chooseBox(), surfacePlane(), DrawOptions, graphSvg(), DEFAULT_CAMERA (+7 more)

### Community 142 - ".folderItem"
Cohesion: 0.20
Nodes (4): clear(), formatDate(), NotesPanel, NotesPanelDeps

### Community 143 - "statsGraph.ts"
Cohesion: 0.22
Nodes (15): isTestLine(), number(), testItems(), classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX (+7 more)

### Community 144 - "devDependencies"
Cohesion: 0.10
Nodes (18): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+10 more)

### Community 145 - "restore.test.ts"
Cohesion: 0.24
Nodes (9): BackupNote, backupNotes(), restoreBackup(), RestoreBoards, Restored, restoredMessage(), time(), backup (+1 more)

### Community 146 - "plan.ts"
Cohesion: 0.20
Nodes (14): NO_TABLE, cellText(), columnRole(), columnsOf(), durationUnit(), isNumber(), isPlanRange(), MAX_ACTIVITIES (+6 more)

### Community 147 - "Distribution"
Cohesion: 0.15
Nodes (9): discreteQuantile(), Distribution, integerRange(), intervalProbability(), pValue(), rejection(), TestResult, numericExpectation() (+1 more)

### Community 148 - "math/calculus.ts"
Cohesion: 0.38
Nodes (11): argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot(), fieldOn(), outward() (+3 more)

### Community 153 - ".int"
Cohesion: 0.31
Nodes (8): addExp(), exactIntervalProbability(), expSum, subtractExp(), divideExp(), exactSetProbability(), quadraticIn(), R()

### Community 154 - "linear.test.ts"
Cohesion: 0.29
Nodes (7): EXACT, FLOAT, A, B, q(), result(), text()

### Community 157 - "logo.ts"
Cohesion: 0.38
Nodes (4): BOX, glyph(), LOGO_COLOR, logoIcon()

### Community 158 - "La grafica: le otto richieste del 10 ottobre 2026"
Cohesion: 0.50
Nodes (4): 4. Più modelli per «Spiegami», 5. A cosa serve la chiave dell'AI, 6. Glifo anche in inglese, La grafica: le otto richieste del 10 ottobre 2026

## Knowledge Gaps
- **699 isolated node(s):** `session-start.sh script`, `name`, `private`, `version`, `description` (+694 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 983 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **37 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `touchlog.ts`, `Parser`, `main.ts`, `spec.ts`, `view3d.ts`, `num`, `graph/preview.ts`, `spreadsheet/format.ts`, `svg.ts`, `SchemaEditor`, `Board`, `SheetEditor`, `numerical.ts`, `arithmetic.ts`, `topics.ts`, `.renderFormat`, `store.ts`, `MathError`, `assistant.ts`, `graph/space.ts`, `gantt.ts`, `markdown.ts`, `touchLog`, `logic.ts`, `feedback.ts`, `complex.ts`, `namesIn`, `parse.ts`, `planPreview.ts`, `several.ts`, `sheet.ts`, `functions.ts`, `finite.ts`, `src/relocation.ts`, `Pt`, `Rational`, `board/shapes.ts`, `NotesStore`, `SidePanel`, `inference.ts`, `supabase.ts`, `explainPanel.ts`, `schemaTools.test.ts`, `gantt.test.ts`, `odesolve.ts`, `boardTouchLog.test.ts`, `toLatex`, `h`, `spreadsheet/editor.ts`, `blockMove.ts`, `smoke-test.mjs`, `toolbar.ts`, `symbolic.ts`, `.sameAs`, `schema/editor.ts`, `aiPanel.ts`, `linsys.ts`, `siteUpdate.ts`, `ui/preview.ts`, `ink.ts`, `localModels.ts`, `xlsx.ts`, `explainSubjects.ts`, `graph.ts`, `ExplainPanel`, `conics.ts`, `files.ts`, `board.ts`, `FormattedResult`, `aiPanel.test.ts`, `graph/file.ts`, `schemaGuard.test.ts`, `MarkdownEditor`, `sidePanel.ts`, `vitest`, `graph3d.test.ts`, `plan.ts`, `math/calculus.ts`, `AiPanel`, `.int`?**
  _High betweenness centrality (0.181) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `touchlog.ts`, `graph/file.ts`, `main.ts`, `schemaGuard.test.ts`, `num`, `Dove sono le cose`, `spreadsheet/format.ts`, `editor/lists.ts`, `sidePanel.ts`, `graph3d.test.ts`, `parseSchema`, `editor.test.ts`, `restore.test.ts`, `plan.ts`, `store.ts`, `linear.test.ts`, `assistant.ts`, `editor/editor.ts`, `markers.ts`, `logo.ts`, `markdown.ts`, `spell.test.ts`, `appleTouch`, `feedback.ts`, `complex.ts`, `resize.ts`, `Sheet`, `src/relocation.ts`, `Rational`, `board/shapes.ts`, `NotesStore`, `supabase.ts`, `explainPanel.ts`, `schemaTools.test.ts`, `gantt.test.ts`, `database.ts`, `boardTouchLog.test.ts`, `h`, `spreadsheet/editor.ts`, `blockMove.ts`, `distributions.ts`, `page.ts`, `linsys.ts`, `search.ts`, `siteUpdate.ts`, `ui/preview.ts`, `ink.ts`, `localModels.ts`, `board.ts`, `sql.ts`, `aiPanel.test.ts`?**
  _High betweenness centrality (0.114) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `main.ts`, `graph/preview.ts`, `sidePanel.ts`, `SchemaEditor`, `Board`, `SheetEditor`, `.folderItem`, `AiPanel`, `.renderFormat`, `spell.test.ts`, `feedback.ts`, `resize.ts`, `planPreview.ts`, `NotesStore`, `SidePanel`, `explainPanel.ts`, `spreadsheet/editor.ts`, `toolbar.ts`, `schema/editor.ts`, `aiPanel.ts`, `page.ts`, `ui/preview.ts`, `ink.ts`, `ExplainPanel`, `board.ts`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **Are the 277 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `adoptGuestNotes()`) actually correct?**
  _`Dove sono le cose` has 277 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `name`, `private` to the rest of the system?**
  _699 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.03344226579520697 - nodes in this community are weakly interconnected._
- **Should `math/evaluate.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06531986531986532 - nodes in this community are weakly interconnected._