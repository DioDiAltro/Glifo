# Graph Report - principale  (2026-10-14)

## Corpus Check
- 346 files · ~723,767 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 6, .css 1)

## Summary
- 5563 nodes · 20324 edges · 166 communities (126 shown, 40 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 669 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2dee2502`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- i18n.ts
- NotesStore
- main.ts
- compile
- supabase.ts
- spec.ts
- parse.ts
- num
- graph/preview.ts
- blockMove.ts
- distributions.ts
- view3d.ts
- svg.ts
- sheet.ts
- SchemaEditor
- chart.ts
- SheetEditor
- markdown.ts
- numerical.ts
- arithmetic.ts
- index.ts
- engine.ts
- schema/editor.ts
- noteWordsMath.test.ts
- IdbBoards
- Parser
- board.ts
- toNode
- smoke-test.mjs
- several.ts
- gantt.ts
- study.ts
- .constructor
- assistant.ts
- logic.ts
- h
- complex.ts
- namesIn
- translations.test.ts
- resize.ts
- graph/space.ts
- Pt
- localModels.ts
- sql.ts
- functions.ts
- MathError
- spreadsheetEn.test.ts
- laplace.ts
- sidePanel.ts
- board/shapes.ts
- schedule.ts
- SidePanel
- complex.test.ts
- mathEn2.test.ts
- noteWordsGraph.test.ts
- PlanView
- 20261004091555_note_condivise.sql
- noteWords.ts
- database.ts
- finite.ts
- editor/editor.ts
- dependencies
- Welcome to Glifo
- spreadsheet/editor.ts
- conics.ts
- odesolve.ts
- statsShown.ts
- schemaEn.test.ts
- ui/preview.ts
- Benvenuto in Glifo
- compilerOptions
- relocation-test.mjs
- latex.ts
- symbolic.ts
- schemaBlocks
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- plan.ts
- aiPanel.test.ts
- session-start.sh
- .claude/CLAUDE.md
- Il database degli account (Supabase)
- tutorial.mjs
- Abbonamenti
- topics.ts
- BoardStore
- supabase-stub.sql
- account-test.mjs
- explainPanel.ts
- Le spiegazioni, come funzionano
- probability.ts
- createFakeSupabase
- symbolsEn.test.ts
- siteUpdate.ts
- graph/file.ts
- renderMarkdown
- Costi
- spellcheck.ts
- editor/lists.ts
- graph.ts
- Field
- schema/templates.ts
- Rational
- src/relocation.ts
- Glifo
- captcha.ts
- graphNote.test.ts
- strokes.ts
- Sheet
- vite
- files.ts
- Dove sono le cose
- La lavagna
- Parser
- Board
- 20261008130026_commenti.sql
- BoardOptions
- toolbar.ts
- xlsx.ts
- page.ts
- suggestions.ts
- L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota
- Glifo – note per Claude
- LlamaWorker
- severalGraph.ts
- In programma
- vitest
- Piano per piano
- tutorial.ts
- statsGraph.ts
- suggest.ts
- I modelli e le chiavi API

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 311 edges
2. `MathError` - 151 edges
3. `Sheet` - 147 edges
4. `num()` - 145 edges
5. `h()` - 136 edges
6. `MathNode` - 131 edges
7. `mul()` - 124 edges
8. `texts` - 123 edges
9. `Board` - 117 edges
10. `compile()` - 116 edges

## Surprising Connections (you probably didn't know these)
- `Dove sono le cose` --references--> `fakeLlmWorker()`  [INFERRED]
  ARCHITETTURA.md → scripts/smoke-test.mjs
- `Dove sono le cose` --references--> `tutorialModel()`  [INFERRED]
  ARCHITETTURA.md → scripts/tutorial.mjs
- `Il controllo anti-robot (CAPTCHA, ottobre 2026)` --references--> `captchaToken()`  [INFERRED]
  supabase/README.md → src/account/captcha.ts
- `Come viene pubblicata` --references--> `dist()`  [INFERRED]
  README.md → src/board/shapes.ts
- `Trasloco: il sito su Cloudflare, con un dominio tutto di Glifo` --references--> `dist()`  [INFERRED]
  ROADMAP.md → src/board/shapes.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (166 total, 40 thin omitted)

### Community 0 - "i18n.ts"
Cohesion: 0.04
Nodes (76): SyncStatus, DownloadedModel, gpuF16(), MODEL_LICENSES, ModelGroup, modelVariant, AI_SERVICES, aiService (+68 more)

### Community 1 - "NotesStore"
Cohesion: 0.04
Nodes (45): resizer, Deletion, DeletionLog, cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore (+37 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (112): unshareNote(), newStrokeId(), remapGraphLines(), account, ACCOUNT_OFF, accountButton, active, aiShown() (+104 more)

### Community 3 - "compile"
Cohesion: 0.05
Nodes (90): inequalityMargin(), integralRegion, LayeredSolid, radiusOf(), spaceLayers(), spaceMargin(), spacePoint(), argumentOrder() (+82 more)

### Community 4 - "supabase.ts"
Cohesion: 0.04
Nodes (64): @supabase/supabase-js, AccountSync, withLock(), accountDataFile(), Account, accountError, appUrl(), call() (+56 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (103): conicItems(), isConicLine(), quadricEquation(), T, FieldContext, onlyComplex(), isTestLine(), isNumericalLine() (+95 more)

### Community 6 - "parse.ts"
Cohesion: 0.06
Nodes (40): hasWord(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, differentialInFraction() (+32 more)

### Community 7 - "num"
Cohesion: 0.13
Nodes (91): atIntegers(), oneFraction(), withoutAbs(), hyperbolicToExp(), oneFraction(), termTransform(), polyEx(), similarSolution() (+83 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (48): FIGURE_PALETTE, addLabel(), boxes, cameras, complexCoord(), containing(), coord(), coordinates() (+40 more)

### Community 9 - "blockMove.ts"
Cohesion: 0.11
Nodes (34): @codemirror/commands, blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove, blockPlace() (+26 more)

### Community 10 - "distributions.ts"
Cohesion: 0.09
Nodes (40): addExp(), choose(), continuousQuantile(), decimals(), discreteQuantile(), Distribution, exactIntervalProbability(), factorialBig() (+32 more)

### Community 11 - "view3d.ts"
Cohesion: 0.09
Nodes (33): Box, Detail, Face, FAST, FINE, Plane, Vec3, arcPoints() (+25 more)

### Community 12 - "svg.ts"
Cohesion: 0.08
Nodes (60): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseWindow(), chooseY(), clipLines(), dataWindow() (+52 more)

### Community 13 - "sheet.ts"
Cohesion: 0.05
Nodes (78): numberText(), endTex(), figureText(), usesDecimalComma(), formatGauss(), OdeFunction, expSumValue(), decimalSeparator() (+70 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.09
Nodes (13): fieldInput(), isLanes(), SchemaEditor, withLaneContents(), cellText(), edgeLook(), nodeLook(), nodeStyle() (+5 more)

### Community 15 - "chart.ts"
Cohesion: 0.13
Nodes (31): at(), breakEven(), Point, quantity(), T, tableItems(), textLabel(), chartData (+23 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (7): functionLabel(), MenuEntry, SheetEditor, englishTyping(), serializeSheet(), CellRange, cloneSheet()

### Community 17 - "markdown.ts"
Cohesion: 0.08
Nodes (48): valueNode(), lineDepth(), parseBlockMath(), planRange(), texHtml(), dataRange(), tableChartKind(), moveAttrs() (+40 more)

### Community 18 - "numerical.ts"
Cohesion: 0.11
Nodes (49): FormatOptions, bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial() (+41 more)

### Community 19 - "arithmetic.ts"
Cohesion: 0.10
Nodes (49): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+41 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (42): b, bigops, c, calculus, fn, fr, fractions, functions (+34 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "schema/editor.ts"
Cohesion: 0.06
Nodes (53): laneOf(), alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ALIGN_NAMES (+45 more)

### Community 23 - "noteWordsMath.test.ts"
Cohesion: 0.11
Nodes (17): logicShown(), AstNode, childrenOf(), DATA, ENGLISH, englishTexts(), FUNCTIONS, isNode() (+9 more)

### Community 24 - "IdbBoards"
Cohesion: 0.08
Nodes (13): BoardBackend, done(), fromRecord(), IdbBoards, ofNote(), openBoardDatabase(), openDefault(), recordBytes() (+5 more)

### Community 25 - "Parser"
Cohesion: 0.17
Nodes (3): numericPartials(), describe(), Parser

### Community 26 - "board.ts"
Cohesion: 0.06
Nodes (50): Action, coalesced(), DOT_SIZES, EraseAction, EraserMode, Finger, HANDLE_REACH, ICON (+42 more)

### Community 27 - "toNode"
Cohesion: 0.08
Nodes (47): close(), Definite, definiteIntegral(), exValue(), samples(), EMPTY_SCOPE, absOf(), boundsOf() (+39 more)

### Community 28 - "smoke-test.mjs"
Cohesion: 0.15
Nodes (6): markdown-it, playwright-core, PNG_ICONS, fakeLlmWorker(), firstVisit(), plainContext

### Community 29 - "several.ts"
Cohesion: 0.14
Nodes (37): severalLimit, fractionNear(), at(), Candidate, candidates(), compiled(), constraintsOf(), COORDS (+29 more)

### Community 30 - "gantt.ts"
Cohesion: 0.08
Nodes (58): amount(), barColor(), crossings(), dateText(), dayMonth(), dayOf(), fitText(), GanttOptions (+50 more)

### Community 31 - "study.ts"
Cohesion: 0.14
Nodes (37): limit(), Asymptote, asymptoteText(), boundaries(), compiled(), cutsOf(), defined(), domainOf() (+29 more)

### Community 33 - "assistant.ts"
Cohesion: 0.09
Nodes (29): AiAnswer, AiError, AiResult, AiSettings, answerSchema(), askAi(), askCompatible(), askThroughHost() (+21 more)

### Community 34 - "logic.ts"
Cohesion: 0.11
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "h"
Cohesion: 0.05
Nodes (76): T, setLangForTests(), board, loadingEditor(), openSheet(), viewSwitch, RelocationResult, openShareDialog() (+68 more)

### Community 36 - "complex.ts"
Cohesion: 0.05
Nodes (81): COMPLEX_FUNCTIONS, farthest(), gaussItem(), hasExponential(), inZ(), isComplexLine(), isComplexValue(), isInequality() (+73 more)

### Community 37 - "namesIn"
Cohesion: 0.14
Nodes (35): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+27 more)

### Community 38 - "translations.test.ts"
Cohesion: 0.17
Nodes (18): AstNode, calleeName(), check(), checkPair(), visit(), children(), entryPairs(), files (+10 more)

### Community 39 - "resize.ts"
Cohesion: 0.13
Nodes (19): EDITOR_SHARE, LAYOUT_KEY, NOTES_WIDTH, PANE_LIMITS, PaneSizes, SizeLimits, SYMBOLS_WIDTH, aria() (+11 more)

### Community 40 - "graph/space.ts"
Cohesion: 0.12
Nodes (51): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+43 more)

### Community 41 - "Pt"
Cohesion: 0.17
Nodes (7): clampZoom(), MoveAction, pressureOf(), validView(), Transform, EllipseFit, Pt

### Community 42 - "localModels.ts"
Cohesion: 0.05
Nodes (49): chat(), GlifoError, Gpu, load(), post(), remove(), scope, shaderF16() (+41 more)

### Community 43 - "sql.ts"
Cohesion: 0.16
Nodes (19): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+11 more)

### Community 44 - "functions.ts"
Cohesion: 0.08
Nodes (63): EMPTY, number(), T, addFormat(), divFormat(), GENERAL, mulFormat(), tidy() (+55 more)

### Community 45 - "MathError"
Cohesion: 0.12
Nodes (55): MathError, angleBetween(), asMatrix(), basisOf(), cross(), Ctx, dataOf(), determinant() (+47 more)

### Community 46 - "spreadsheetEn.test.ts"
Cohesion: 0.07
Nodes (67): pick(), hide(), OPEN, sheetsForFile(), sheetsFromFile(), T, unhide(), booleanText() (+59 more)

### Community 47 - "laplace.ts"
Cohesion: 0.05
Nodes (99): beyondPoles(), compiled(), E, exp(), fractionShown(), HALF, inverseLaplaceShown(), inverseRational() (+91 more)

### Community 48 - "sidePanel.ts"
Cohesion: 0.14
Nodes (17): aiSettingsOf(), SuggestionItem, cleanKatexError(), isConfidentAnswer(), symbolsInCategory(), cardPreviewTex(), formPreviewTex(), ParsedTemplate (+9 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (36): DrawAction, adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners() (+28 more)

### Community 50 - "schedule.ts"
Cohesion: 0.16
Nodes (18): checkGiven(), criticalPaths(), key(), Link, LinkType, listText(), offset(), order() (+10 more)

### Community 51 - "SidePanel"
Cohesion: 0.19
Nodes (5): localizeTex(), cardPreview(), displayCode(), preventFocusSteal(), SidePanel

### Community 52 - "complex.test.ts"
Cohesion: 0.21
Nodes (9): staticGraphSvg(), chooseBox(), DrawOptions, DEFAULT_CAMERA, item(), light, result(), item() (+1 more)

### Community 53 - "mathEn2.test.ts"
Cohesion: 0.11
Nodes (34): number(), T, testItems(), between(), chiSquareTest(), confidence(), confidenceShown(), decimals() (+26 more)

### Community 54 - "noteWordsGraph.test.ts"
Cohesion: 0.14
Nodes (18): monthOf(), MONTHS, MONTHS_EN, PlanKind, T, blockLines(), GraphError, graphNames() (+10 more)

### Community 55 - "PlanView"
Cohesion: 0.26
Nodes (4): readPlan(), ganttWidth(), PlanView, Palette

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "noteWords.ts"
Cohesion: 0.12
Nodes (23): WidgetBlock, placeChart(), saveSheetBlock(), blockKind, BLOCKS, blockWord(), FROM_ENGLISH, FUNCTIONS (+15 more)

### Community 58 - "database.ts"
Cohesion: 0.23
Nodes (6): createDatabase(), createUser(), databaseTests(), feedbackTests(), migrations, shareTests()

### Community 59 - "finite.ts"
Cohesion: 0.17
Nodes (28): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+20 more)

### Community 60 - "editor/editor.ts"
Cohesion: 0.03
Nodes (84): description, name, private, type, version, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/lang-markdown (+76 more)

### Community 61 - "dependencies"
Cohesion: 0.04
Nodes (44): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+36 more)

### Community 62 - "Welcome to Glifo"
Cohesion: 0.20
Nodes (9): A few examples, Calculations and graphs, For programming too, Handy shortcuts, How to write formulas, Lists, Spell check, Try it now (+1 more)

### Community 63 - "spreadsheet/editor.ts"
Cohesion: 0.10
Nodes (44): currentCall(), Editing, Move, PATHS, SheetEditorOptions, Snapshot, T, formatCode() (+36 more)

### Community 64 - "conics.ts"
Cohesion: 0.19
Nodes (28): at(), centralCanonical(), Coefficients, coneCanonical(), conicOf(), det2(), det3(), determinant() (+20 more)

### Community 65 - "odesolve.ts"
Cohesion: 0.08
Nodes (79): addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames(), constantParticular() (+71 more)

### Community 66 - "statsShown.ts"
Cohesion: 0.17
Nodes (31): check(), correlation(), count(), covariance(), Data, dataStatistic(), deviation(), fail() (+23 more)

### Community 67 - "schemaEn.test.ts"
Cohesion: 0.07
Nodes (43): schemaSummary(), svg(), GraphLook, findSchemaBlocks(), schemaBlockAtLine(), openSchemaEditor(), SchemaEditorOptions, base64() (+35 more)

### Community 68 - "ui/preview.ts"
Cohesion: 0.09
Nodes (19): GraphLabels, BlockKind, MoveDir, hydrateSheets(), T, BLOCK_NAMES, blockHiddenMessage(), blockKindOf() (+11 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "relocation-test.mjs"
Cohesion: 0.18
Nodes (7): AFTER_MOVE, ids, newBrowser(), NOTICE_DAY, out, serve(), TYPES

### Community 73 - "latex.ts"
Cohesion: 0.09
Nodes (29): fourierItems(), isFourierLine(), T, partialSum(), ACCENT_COMMANDS, DISTRIBUTION_LATEX, distributionLatex(), domainLatex() (+21 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (64): linearIn(), primitive(), verified(), linearCells(), pairUp(), atValues(), Converter, coordinates() (+56 more)

### Community 75 - "schemaBlocks"
Cohesion: 0.18
Nodes (8): BlockWidget, findWidgetBlocks(), guardBlocks(), schemaBlocks(), create(), setup(), setup(), setup()

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Errore o imprevisto → nel dettaglio, 3. Serve una decisione → frasi complete, 4. Fine del compito → un solo riepilogo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "plan.ts"
Cohesion: 0.18
Nodes (15): NumberStyle, cellText(), columnRole(), columnsOf(), durationUnit(), isNumber(), isPlanRange(), MAX_ACTIVITIES (+7 more)

### Community 79 - "aiPanel.test.ts"
Cohesion: 0.05
Nodes (41): ExplainTone, FollowUp, REPLY_TOKENS, definedName(), fieldText(), formulaTopic(), graphTopic(), listText() (+33 more)

### Community 82 - "Il database degli account (Supabase)"
Cohesion: 0.15
Nodes (12): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il controllo anti-robot (CAPTCHA, ottobre 2026), Il database degli account (Supabase), Il progetto, Il trasloco su glifo.page (ottobre 2026) (+4 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.11
Nodes (11): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+3 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.13
Nodes (15): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+7 more)

### Community 91 - "topics.ts"
Cohesion: 0.17
Nodes (18): ATTRIBUTES, cut(), ER_SHAPES, fitLines(), flowOrder(), formulaText(), FREE_NAMES, readSheet() (+10 more)

### Community 92 - "BoardStore"
Cohesion: 0.09
Nodes (14): BoardStore, MemoryBoards, backup(), BackupNote, backupNotes(), restoreBackup(), RestoreBoards, Restored (+6 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.10
Nodes (11): @electric-sql/pglite, device(), login(), newContext, waitFor(), b64(), CAPTCHA_TOKEN, CODE (+3 more)

### Community 97 - "explainPanel.ts"
Cohesion: 0.08
Nodes (34): explainTarget, Explanation, readSchema(), schemaTitle(), formulasUntil(), sheetBefore(), explanationMarkdown(), hasCalculation() (+26 more)

### Community 98 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 100 - "probability.ts"
Cohesion: 0.14
Nodes (22): End, RelOp, ALL, complement(), distributionOf(), endAt(), EventContext, eventSet() (+14 more)

### Community 101 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 102 - "symbolsEn.test.ts"
Cohesion: 0.14
Nodes (28): editDistance(), singular(), stem(), STOPWORDS, words(), BOTH, buildIndex(), containsPhrase() (+20 more)

### Community 103 - "siteUpdate.ts"
Cohesion: 0.18
Nodes (16): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, loadPart() (+8 more)

### Community 104 - "graph/file.ts"
Cohesion: 0.09
Nodes (39): figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsForFile(), graphsFromFile(), hide(), OPEN (+31 more)

### Community 105 - "renderMarkdown"
Cohesion: 0.29
Nodes (6): configurePurify(), renderMarkdown(), hints(), preview(), preview(), preview()

### Community 106 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 107 - "spellcheck.ts"
Cohesion: 0.08
Nodes (23): misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt(), openAt() (+15 more)

### Community 108 - "editor/lists.ts"
Cohesion: 0.09
Nodes (63): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+55 more)

### Community 113 - "graph.ts"
Cohesion: 0.05
Nodes (41): @maxgraph/core, AT_X, COMPASS, createEdgeCell(), createGraph(), drawSchema(), edgeStyle(), edgeTextAt() (+33 more)

### Community 116 - "Field"
Cohesion: 0.13
Nodes (3): Field, formatPolynomial(), interpolate()

### Community 117 - "schema/templates.ts"
Cohesion: 0.23
Nodes (17): SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), conceptMap(), cycle(), edge(), er() (+9 more)

### Community 118 - "Rational"
Cohesion: 0.12
Nodes (20): Part, expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactFunction, ExactRandom (+12 more)

### Community 119 - "src/relocation.ts"
Cohesion: 0.07
Nodes (66): accountSpace(), adoptGuestNotes(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf(), prefsKey() (+58 more)

### Community 120 - "Glifo"
Cohesion: 0.12
Nodes (16): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Domande frequenti e commenti (+8 more)

### Community 121 - "captcha.ts"
Cohesion: 0.21
Nodes (8): captchaToken(), loadTurnstile(), Turnstile, TURNSTILE_SCRIPT, Window, TURNSTILE_SITE_KEY, accountFailure(), Options

### Community 122 - "graphNote.test.ts"
Cohesion: 0.09
Nodes (22): acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult, calcResults(), CheckWidget, insertResult() (+14 more)

### Community 123 - "strokes.ts"
Cohesion: 0.09
Nodes (37): centerOn(), copyStrokes(), cross(), handleScale(), insideLasso(), keepInside(), LASSO_SHARE, lassoed() (+29 more)

### Community 124 - "Sheet"
Cohesion: 0.06
Nodes (37): GaussLine, Definition, Line, ExactComplexScope, ConicInfo, Ode, OdeSystem, withWorkLimit() (+29 more)

### Community 125 - "vite"
Cohesion: 0.33
Nodes (4): vite, minutes, postMessage(), started

### Community 128 - "files.ts"
Cohesion: 0.12
Nodes (23): loadDialect(), crc32(), svgSize(), svgToPng(), T, withDensity(), canWriteFilesDirectly(), downloadBlob() (+15 more)

### Community 129 - "Dove sono le cose"
Cohesion: 0.05
Nodes (82): 1. A cosa serve l'AI dei modelli di frontiera, Dove sono le cose, Glifo – architettura, allNames(), answerFollowUp(), bareResult(), chained(), chatContext (+74 more)

### Community 132 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 136 - "Board"
Cohesion: 0.11
Nodes (3): Board, Box, Stroke

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 140 - "toolbar.ts"
Cohesion: 0.09
Nodes (22): EditorCallbacks, MarkdownEditor, searchPhrases(), insertBlock(), insertTemplate(), wrapSelection(), ListStyleId, Action (+14 more)

### Community 141 - "xlsx.ts"
Cohesion: 0.06
Nodes (57): RFC-4180, fflate, tablesNote(), csvCell(), csvDelimiter(), csvNumbers(), csvToSheet(), digitsOf() (+49 more)

### Community 143 - "page.ts"
Cohesion: 0.04
Nodes (74): katex, AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, currentAccount(), isShareToken(), parseSharedNote(), readSharedNote() (+66 more)

### Community 144 - "suggestions.ts"
Cohesion: 0.20
Nodes (7): EditorMathContext, expand(), preferredIndex(), SuggestionController, commandNames(), parseTemplate(), templateText()

### Community 154 - "L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota"
Cohesion: 0.25
Nodes (8): 2. Dalla lavagna alla nota, 3. Da una foto alla nota, 4. Dettare: la voce diventa testo nella nota, 5. Registrare le lezioni e trascriverle, Da sistemare con il primo punto che tocca l'AI, Fonti (controllate il 14 ottobre 2026), In che ordine, L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota

### Community 156 - "Glifo – note per Claude"
Cohesion: 0.25
Nodes (8): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Regole, sqlite()

### Community 160 - "LlamaWorker"
Cohesion: 0.21
Nodes (7): Promemoria per lo studente, Commenti di chi prova Glifo, constructor(), LlamaWorker, Commenti di chi prova Glifo, page(), site()

### Community 161 - "severalGraph.ts"
Cohesion: 0.35
Nodes (10): criticalLine(), isSeveralLine(), named(), severalItems(), surface(), T, bounded(), extremaOf() (+2 more)

### Community 163 - "In programma"
Cohesion: 0.25
Nodes (8): Account: i propri appunti su ogni dispositivo, anche da condividere, Idee per il futuro, In programma, L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota (14 ottobre 2026, se ne parla), La lavagna: idee in più, Più avanti, Schemi: idee in più, Trasloco: il sito su Cloudflare, con un dominio tutto di Glifo

### Community 166 - "vitest"
Cohesion: 0.06
Nodes (39): vitest, formulaGraph(), GraphItem, parseGraph(), errorMessage(), MathSyntaxError, parseMath(), parseStatement() (+31 more)

### Community 172 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 173 - "tutorial.ts"
Cohesion: 0.15
Nodes (12): HINT_MS, markTutorialSeen(), openTutorial(), show(), richText(), showTutorialHint(), close(), T (+4 more)

### Community 175 - "statsGraph.ts"
Cohesion: 0.20
Nodes (15): classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX, Line, number(), pmfBars() (+7 more)

### Community 176 - "suggest.ts"
Cohesion: 0.19
Nodes (14): Text, normalizeText(), IndexedEntry, SearchResult, getIndex(), isSubsequence(), keysOf(), MatchKind (+6 more)

### Community 179 - "I modelli e le chiavi API"
Cohesion: 0.33
Nodes (6): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), In prova sul ramo `prova` (7 ottobre 2026): Qwen3 nel browser per «Spiegami», La chiave, il server locale e la scelta del modello (14 ottobre 2026), Le idee dello studente (5 ottobre 2026)

## Knowledge Gaps
- **873 isolated node(s):** `session-start.sh script`, `name`, `private`, `version`, `description` (+868 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1197 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **40 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `texts` connect `i18n.ts` to `files.ts`, `Dove sono le cose`, `main.ts`, `compile`, `supabase.ts`, `spec.ts`, `parse.ts`, `NotesStore`, `graph/preview.ts`, `distributions.ts`, `svg.ts`, `sheet.ts`, `xlsx.ts`, `chart.ts`, `page.ts`, `markdown.ts`, `numerical.ts`, `arithmetic.ts`, `index.ts`, `toolbar.ts`, `schema/editor.ts`, `board.ts`, `toNode`, `several.ts`, `gantt.ts`, `study.ts`, `assistant.ts`, `severalGraph.ts`, `h`, `complex.ts`, `namesIn`, `logic.ts`, `resize.ts`, `localModels.ts`, `sql.ts`, `functions.ts`, `MathError`, `spreadsheetEn.test.ts`, `statsGraph.ts`, `laplace.ts`, `sidePanel.ts`, `schedule.ts`, `tutorial.ts`, `mathEn2.test.ts`, `noteWordsGraph.test.ts`, `finite.ts`, `editor/editor.ts`, `spreadsheet/editor.ts`, `conics.ts`, `odesolve.ts`, `statsShown.ts`, `schemaEn.test.ts`, `ui/preview.ts`, `latex.ts`, `symbolic.ts`, `plan.ts`, `aiPanel.test.ts`, `topics.ts`, `BoardStore`, `explainPanel.ts`, `probability.ts`, `siteUpdate.ts`, `graph/file.ts`, `spellcheck.ts`, `editor/lists.ts`, `schema/templates.ts`, `src/relocation.ts`, `graphNote.test.ts`?**
  _High betweenness centrality (0.133) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `Dove sono le cose` to `i18n.ts`, `files.ts`, `main.ts`, `compile`, `supabase.ts`, `spec.ts`, `parse.ts`, `num`, `Board`, `blockMove.ts`, `graph/preview.ts`, `NotesStore`, `toolbar.ts`, `svg.ts`, `sheet.ts`, `chart.ts`, `xlsx.ts`, `markdown.ts`, `numerical.ts`, `arithmetic.ts`, `SchemaEditor`, `page.ts`, `schema/editor.ts`, `noteWordsMath.test.ts`, `SheetEditor`, `Parser`, `board.ts`, `toNode`, `smoke-test.mjs`, `several.ts`, `gantt.ts`, `study.ts`, `assistant.ts`, `severalGraph.ts`, `h`, `complex.ts`, `namesIn`, `vitest`, `graph/space.ts`, `Pt`, `localModels.ts`, `functions.ts`, `MathError`, `spreadsheetEn.test.ts`, `laplace.ts`, `sidePanel.ts`, `board/shapes.ts`, `schedule.ts`, `SidePanel`, `tutorial.ts`, `mathEn2.test.ts`, `noteWordsGraph.test.ts`, `PlanView`, `noteWords.ts`, `finite.ts`, `spreadsheet/editor.ts`, `odesolve.ts`, `ui/preview.ts`, `latex.ts`, `symbolic.ts`, `schemaBlocks`, `plan.ts`, `aiPanel.test.ts`, `tutorial.mjs`, `topics.ts`, `BoardStore`, `explainPanel.ts`, `siteUpdate.ts`, `graph/file.ts`, `renderMarkdown`, `graph.ts`, `Rational`, `src/relocation.ts`, `graphNote.test.ts`, `strokes.ts`, `Sheet`?**
  _High betweenness centrality (0.110) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `i18n.ts`, `Dove sono le cose`, `NotesStore`, `supabase.ts`, `parse.ts`, `num`, `graph/preview.ts`, `blockMove.ts`, `distributions.ts`, `toolbar.ts`, `svg.ts`, `xlsx.ts`, `chart.ts`, `page.ts`, `schema/editor.ts`, `noteWordsMath.test.ts`, `IdbBoards`, `board.ts`, `gantt.ts`, `assistant.ts`, `h`, `translations.test.ts`, `resize.ts`, `graph/space.ts`, `localModels.ts`, `sql.ts`, `MathError`, `spreadsheetEn.test.ts`, `laplace.ts`, `sidePanel.ts`, `board/shapes.ts`, `tutorial.ts`, `complex.test.ts`, `mathEn2.test.ts`, `noteWordsGraph.test.ts`, `noteWords.ts`, `database.ts`, `editor/editor.ts`, `spreadsheet/editor.ts`, `schemaEn.test.ts`, `plan.ts`, `aiPanel.test.ts`, `BoardStore`, `symbolsEn.test.ts`, `siteUpdate.ts`, `graph/file.ts`, `renderMarkdown`, `spellcheck.ts`, `editor/lists.ts`, `Rational`, `src/relocation.ts`, `captcha.ts`, `graphNote.test.ts`, `strokes.ts`, `Sheet`?**
  _High betweenness centrality (0.070) - this node is a cross-community bridge._
- **Are the 310 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `tutorialModel()`) actually correct?**
  _`Dove sono le cose` has 310 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `name`, `private` to the rest of the system?**
  _873 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `i18n.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.03708532522091844 - nodes in this community are weakly interconnected._
- **Should `NotesStore` be split into smaller, more focused modules?**
  _Cohesion score 0.041736694677871146 - nodes in this community are weakly interconnected._