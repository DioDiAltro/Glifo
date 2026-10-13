# Graph Report - matherdown  (2026-10-13)

## Corpus Check
- 341 files · ~705,699 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5489 nodes · 20135 edges · 167 communities (127 shown, 40 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 672 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3aea9102`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- domain.ts
- vitest
- main.ts
- compile
- sync.ts
- spec.ts
- schemaEn.test.ts
- num
- graph/preview.ts
- Dove sono le cose
- distributions.ts
- src/relocation.ts
- svg.ts
- plan.ts
- SchemaEditor
- editor/editor.ts
- SheetEditor
- explainPanel.ts
- numerical.ts
- arithmetic.ts
- index.ts
- engine.ts
- schema/editor.ts
- noteWordsMath.test.ts
- store.ts
- Parser
- board.ts
- ui/preview.ts
- parse.ts
- several.ts
- gantt.ts
- study.ts
- view3d.ts
- assistant.ts
- logic.ts
- toLatex
- complex.ts
- fields.ts
- translations.test.ts
- resize.ts
- ExplainPanel
- restore.ts
- localModels.ts
- FoldersStore
- functions.ts
- MathError
- downloadText
- Pt
- Rational
- board/shapes.ts
- toolbar.ts
- SidePanel
- Stroke
- probability.ts
- inference.ts
- spreadsheet/format.ts
- 20261004091555_note_condivise.sql
- h
- database.ts
- finite.ts
- topics.ts
- dependencies
- Welcome to Glifo
- spreadsheet/editor.ts
- conics.ts
- odesolve.ts
- sheet.ts
- usesDecimalComma
- blockMove.ts
- Benvenuto in Glifo
- compilerOptions
- relocation-test.mjs
- La grafica: le otto richieste del 10 ottobre 2026
- schema/templates.ts
- symbolic.ts
- .int
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- page.ts
- NotesStore
- session-start.sh
- .claude/CLAUDE.md
- Il database degli account (Supabase)
- tutorial.mjs
- Abbonamenti
- smoke-test.mjs
- supabase-stub.sql
- account-test.mjs
- schemaBlocks.ts
- sidePanel.ts
- In programma
- complex.test.ts
- symbolsEn.test.ts
- siteUpdate.ts
- graph/file.ts
- supabase.ts
- devDependencies
- spellcheck.ts
- laplace.ts
- graph.ts
- fourier.ts
- captcha.ts
- scripts
- i18n.ts
- markdown.ts
- mathSyntax.ts
- Le spiegazioni, come funzionano
- strokes.ts
- Sheet
- feedback.ts
- createFakeSupabase
- formula.ts
- Piano per piano
- Parser
- Board
- 20261008130026_commenti.sql
- ui/relocation.ts
- Distribution
- xlsx.ts
- editor/lists.ts
- dom.ts
- render/lists.ts
- Glifo
- vite
- Glifo – note per Claude
- chart.ts
- AccountSync
- linsys.ts
- vectorcalc.test.ts
- Costi
- editor.test.ts
- La lavagna
- I modelli e le chiavi API

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 311 edges
2. `MathError` - 151 edges
3. `Sheet` - 147 edges
4. `num()` - 145 edges
5. `MathNode` - 131 edges
6. `h()` - 125 edges
7. `mul()` - 124 edges
8. `texts` - 123 edges
9. `Board` - 117 edges
10. `compile()` - 116 edges

## Surprising Connections (you probably didn't know these)
- `Dove sono le cose` --references--> `fakeLlmWorker()`  [INFERRED]
  ARCHITETTURA.md → scripts/smoke-test.mjs
- `Dove sono le cose` --references--> `tutorialModel()`  [INFERRED]
  ARCHITETTURA.md → scripts/tutorial.mjs
- `Dove sono le cose` --references--> `WidgetKind`  [INFERRED]
  ARCHITETTURA.md → src/editor/schemaBlocks.ts
- `Dove sono le cose` --references--> `ConicElements`  [INFERRED]
  ARCHITETTURA.md → src/math/conics.ts
- `Attenzione a` --references--> `renderMarkdown()`  [INFERRED]
  CLAUDE.md → src/render/markdown.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (167 total, 40 thin omitted)

### Community 0 - "domain.ts"
Cohesion: 0.09
Nodes (50): constantIntegrand(), inequalityMargin(), integralRegion, LayeredSolid, planeMargin(), planeParts(), radiusOf(), spaceLayers() (+42 more)

### Community 1 - "vitest"
Cohesion: 0.05
Nodes (56): vitest, formulaAtCursor(), GraphLabelLines, insertGraphBlock(), LABEL_KEYS, setGraphLabels(), monthOf(), MONTHS (+48 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (114): 2. La pagina dei commenti, tipo FAQ, addToGraphBlock(), remapGraphLines(), account, ACCOUNT_OFF, active, aiShown(), aiToggle (+106 more)

### Community 3 - "compile"
Cohesion: 0.07
Nodes (58): criticalLine(), isSeveralLine(), named(), severalItems(), surface(), T, argumentOrder(), compileLineIntegral() (+50 more)

### Community 4 - "sync.ts"
Cohesion: 0.07
Nodes (30): withLock(), Account, EMPTY_STATE, FolderChange, FolderRow, isEmpty(), iso(), LocalChange (+22 more)

### Community 5 - "spec.ts"
Cohesion: 0.06
Nodes (81): conicItems(), isConicLine(), quadricEquation(), T, isComplexLine(), depth(), Multiple, multipleOf() (+73 more)

### Community 6 - "schemaEn.test.ts"
Cohesion: 0.06
Nodes (48): @electric-sql/pglite, openSchemaEditor(), base64(), hide(), OPEN, schemasForFile(), schemasFromFile(), T (+40 more)

### Community 7 - "num"
Cohesion: 0.14
Nodes (85): atIntegers(), withoutAbs(), hyperbolicToExp(), polyEx(), similarSolution(), yPowers(), bigGcd(), byParts() (+77 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (46): addLabel(), boxes, cameras, complexCoord(), coord(), coordinates(), drawings, drawnViews (+38 more)

### Community 9 - "Dove sono le cose"
Cohesion: 0.05
Nodes (76): Dove sono le cose, Glifo – architettura, allNames(), answerFollowUp(), bareResult(), chatContext, ChatFn, chatSubject() (+68 more)

### Community 10 - "distributions.ts"
Cohesion: 0.16
Nodes (28): choose(), decimals(), expSumValue(), factorialBig(), FAMILIES, integerParam(), invalid(), makeDistribution() (+20 more)

### Community 11 - "src/relocation.ts"
Cohesion: 0.08
Nodes (60): 1. «Cambia account», accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount() (+52 more)

### Community 12 - "svg.ts"
Cohesion: 0.08
Nodes (58): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), dataWindow(), decimalText() (+50 more)

### Community 13 - "plan.ts"
Cohesion: 0.08
Nodes (40): checkGiven(), criticalPaths(), key(), Link, LinkType, listText(), numberText(), offset() (+32 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.10
Nodes (8): isLanes(), SchemaEditor, withLaneContents(), nodeLook(), nodeStyle(), EdgeLook, laneNames(), NodeLook

### Community 15 - "editor/editor.ts"
Cohesion: 0.04
Nodes (42): description, name, private, type, version, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands (+34 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (4): SheetEditor, serializeSheet(), sheetSize(), cloneSheet()

### Community 17 - "explainPanel.ts"
Cohesion: 0.08
Nodes (38): @codemirror/language, explainTarget, Explanation, formulaNames(), schemaTitle(), CalcCheck, calcOutcomes(), calcPlugin (+30 more)

### Community 18 - "numerical.ts"
Cohesion: 0.11
Nodes (49): FormatOptions, bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial() (+41 more)

### Community 19 - "arithmetic.ts"
Cohesion: 0.07
Nodes (68): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+60 more)

### Community 20 - "index.ts"
Cohesion: 0.06
Nodes (45): b, bigops, c, calculus, fn, fr, fractions, functions (+37 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "schema/editor.ts"
Cohesion: 0.06
Nodes (56): laneOf(), alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ALIGN_NAMES (+48 more)

### Community 23 - "noteWordsMath.test.ts"
Cohesion: 0.07
Nodes (26): @codemirror/lang-markdown, mathMarkdown, FIGURE_PALETTE, containing(), frame(), frames(), light, makeView() (+18 more)

### Community 24 - "store.ts"
Cohesion: 0.05
Nodes (20): fake-indexeddb, BoardOptions, BoardBackend, BoardStore, done(), fromRecord(), IdbBoards, MemoryBoards (+12 more)

### Community 26 - "board.ts"
Cohesion: 0.06
Nodes (44): Action, coalesced(), DOT_SIZES, EraserMode, Finger, HANDLE_REACH, ICON, LassoAction (+36 more)

### Community 27 - "ui/preview.ts"
Cohesion: 0.07
Nodes (30): GraphLabels, BlockKind, Look, Theme, draw(), drawCached(), drawn, errorHtml() (+22 more)

### Community 28 - "parse.ts"
Cohesion: 0.05
Nodes (55): hasWord(), errorMessage(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES (+47 more)

### Community 29 - "several.ts"
Cohesion: 0.09
Nodes (52): Definite, Piece, LimitValue, severalLimit, Condition, Family, Group, Root (+44 more)

### Community 30 - "gantt.ts"
Cohesion: 0.07
Nodes (51): amount(), barColor(), crossings(), dateText(), dayMonth(), dayOf(), fitText(), GanttOptions (+43 more)

### Community 31 - "study.ts"
Cohesion: 0.14
Nodes (37): limit(), Asymptote, asymptoteText(), boundaries(), compiled(), cutsOf(), defined(), domainOf() (+29 more)

### Community 32 - "view3d.ts"
Cohesion: 0.06
Nodes (83): sampleRegion(), addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon() (+75 more)

### Community 33 - "assistant.ts"
Cohesion: 0.07
Nodes (43): AiAnswer, AiError, AiResult, AiSettings, answerSchema(), askAi(), askCompatible(), askThroughHost() (+35 more)

### Community 34 - "logic.ts"
Cohesion: 0.11
Nodes (30): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+22 more)

### Community 35 - "toLatex"
Cohesion: 0.09
Nodes (37): fourierItems(), isFourierLine(), T, names(), STUDY_GRAPH, studyItems(), T, partialSum() (+29 more)

### Community 36 - "complex.ts"
Cohesion: 0.06
Nodes (63): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexValue(), isInequality() (+55 more)

### Community 37 - "fields.ts"
Cohesion: 0.12
Nodes (37): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+29 more)

### Community 38 - "translations.test.ts"
Cohesion: 0.17
Nodes (18): AstNode, calleeName(), check(), checkPair(), visit(), children(), entryPairs(), files (+10 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (24): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+16 more)

### Community 40 - "ExplainPanel"
Cohesion: 0.16
Nodes (4): modelName(), ExplainChat, ExplainPanel, preventFocusSteal()

### Community 41 - "restore.ts"
Cohesion: 0.18
Nodes (14): newStrokeId(), receiveRelocation(), restore(), BackupNote, backupNotes(), restoreBackup(), RestoreBoards, Restored (+6 more)

### Community 42 - "localModels.ts"
Cohesion: 0.07
Nodes (37): @mlc-ai/web-llm, chat(), GlifoError, Gpu, load(), post(), remove(), scope (+29 more)

### Community 43 - "FoldersStore"
Cohesion: 0.16
Nodes (4): cleanFolderName(), FoldersStore, sameName(), names()

### Community 44 - "functions.ts"
Cohesion: 0.07
Nodes (63): ChartTable, CellResult, EMPTY, evaluateSheet(), number(), SheetEvaluator, T, Format (+55 more)

### Community 45 - "MathError"
Cohesion: 0.10
Nodes (65): MathError, angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, dataOf() (+57 more)

### Community 46 - "downloadText"
Cohesion: 0.20
Nodes (8): loadDialect(), SchemaEditorOptions, Schema, serializeSchema(), Template, downloadBlob(), downloadText(), fileNameFor()

### Community 47 - "Pt"
Cohesion: 0.25
Nodes (5): MoveAction, pressureOf(), Transform, EllipseFit, Pt

### Community 48 - "Rational"
Cohesion: 0.13
Nodes (20): Part, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactFunction, ExactRandom, exactRoot() (+12 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (36): DrawAction, adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners() (+28 more)

### Community 50 - "toolbar.ts"
Cohesion: 0.18
Nodes (15): insertBlock(), wrapSelection(), Action, createToolbar(), insertCode(), insertLink(), listStyle(), MenuItem (+7 more)

### Community 51 - "SidePanel"
Cohesion: 0.17
Nodes (8): localizeTex(), isConfidentAnswer(), SymbolForm, cardPreview(), displayCode(), formPreview(), preventFocusSteal(), SidePanel

### Community 52 - "Stroke"
Cohesion: 0.25
Nodes (5): EraseAction, Step, BoardChange, BoardData, Stroke

### Community 53 - "probability.ts"
Cohesion: 0.10
Nodes (30): addExp(), End, expSum, Family, subtractExp(), ExactScope, rejection(), ALL (+22 more)

### Community 54 - "inference.ts"
Cohesion: 0.14
Nodes (27): between(), chiSquareTest(), confidence(), confidenceShown(), decimals(), Given, hypothesisTest(), InferenceContext (+19 more)

### Community 55 - "spreadsheet/format.ts"
Cohesion: 0.14
Nodes (25): quantity(), addFormat(), decimalsOf(), divFormat(), ENGLISH, englishNumber(), fixedNumber(), formatNumber() (+17 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "h"
Cohesion: 0.05
Nodes (61): 3. Le impostazioni divise in sezioni, SyncStatus, DownloadedModel, aiService, rich(), viewSwitch, AI_MODELS, DEFAULT_SETTINGS (+53 more)

### Community 58 - "database.ts"
Cohesion: 0.23
Nodes (6): createDatabase(), createUser(), databaseTests(), feedbackTests(), migrations, shareTests()

### Community 59 - "finite.ts"
Cohesion: 0.17
Nodes (28): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+20 more)

### Community 60 - "topics.ts"
Cohesion: 0.08
Nodes (61): ATTRIBUTES, cut(), ER_SHAPES, fieldText(), fitLines(), flowOrder(), formulaText(), FREE_NAMES (+53 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "Welcome to Glifo"
Cohesion: 0.20
Nodes (9): A few examples, Calculations and graphs, For programming too, Handy shortcuts, How to write formulas, Lists, Spell check, Try it now (+1 more)

### Community 63 - "spreadsheet/editor.ts"
Cohesion: 0.08
Nodes (49): currentCall(), Editing, MenuEntry, Move, PATHS, SheetEditorOptions, Snapshot, T (+41 more)

### Community 64 - "conics.ts"
Cohesion: 0.17
Nodes (30): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+22 more)

### Community 65 - "odesolve.ts"
Cohesion: 0.08
Nodes (84): linearIn(), addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames() (+76 more)

### Community 66 - "sheet.ts"
Cohesion: 0.08
Nodes (55): EMPTY_COMPLEX_SCOPE, Lin, NUMERICAL, bracketParts(), BRACKETS, CHECK_VALUES, checks, Definition (+47 more)

### Community 67 - "usesDecimalComma"
Cohesion: 0.13
Nodes (24): valueLabel(), isTestLine(), number(), T, testItems(), isNumericalLine(), numericalItems(), classes() (+16 more)

### Community 68 - "blockMove.ts"
Cohesion: 0.09
Nodes (42): blockMoved, blockMoves(), blockMoveTransaction(), LineMap, placeChart(), tableChartKind(), blockKind, blockWord() (+34 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "relocation-test.mjs"
Cohesion: 0.18
Nodes (7): AFTER_MOVE, ids, newBrowser(), NOTICE_DAY, out, serve(), TYPES

### Community 72 - "La grafica: le otto richieste del 10 ottobre 2026"
Cohesion: 0.25
Nodes (8): 4. Più modelli per «Spiegami», 5. A cosa serve la chiave dell'AI, 6. Glifo anche in inglese, 7. Via il registro dei tocchi, 8. Il pulsante ✨ con il contorno, Gli abbonamenti, in tutto questo, In che ordine, La grafica: le otto richieste del 10 ottobre 2026

### Community 73 - "schema/templates.ts"
Cohesion: 0.19
Nodes (19): DEFAULT_EDGE, SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), tableMetrics(), conceptMap(), cycle() (+11 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (58): linearCells(), atValues(), combine(), commonMonomial(), Converter, coordinates(), decimalText(), definiteParts() (+50 more)

### Community 75 - ".int"
Cohesion: 0.11
Nodes (9): characteristicPolynomial(), eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn(), q() (+1 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Errore o imprevisto → nel dettaglio, 3. Serve una decisione → frasi complete, 4. Fine del compito → un solo riepilogo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "page.ts"
Cohesion: 0.11
Nodes (20): katex, sidebarToggle(), body, draw(), isDark(), saveButton, saveCopy(), settings (+12 more)

### Community 79 - "NotesStore"
Cohesion: 0.07
Nodes (30): Deletion, DeletionLog, Folder, FOLDER_NAME_MAX, FolderGroup, groupByFolder(), loadClosedFolders(), RemoteFolder (+22 more)

### Community 82 - "Il database degli account (Supabase)"
Cohesion: 0.20
Nodes (9): Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Note condivise con un link, Sincronizzazione, `sync_pull({ since })`: scarica le novità (+1 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.11
Nodes (11): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+3 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.14
Nodes (14): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+6 more)

### Community 91 - "smoke-test.mjs"
Cohesion: 0.15
Nodes (6): markdown-it, playwright-core, PNG_ICONS, fakeLlmWorker(), firstVisit(), plainContext

### Community 96 - "account-test.mjs"
Cohesion: 0.11
Nodes (10): device(), login(), newContext, waitFor(), b64(), CAPTCHA_TOKEN, CODE, GOOGLE_CODE (+2 more)

### Community 97 - "schemaBlocks.ts"
Cohesion: 0.08
Nodes (30): @codemirror/state, @codemirror/view, InsertOptions, toggleLinePrefix(), blockLine, inlineRegion, marks, mathHighlighter (+22 more)

### Community 98 - "sidePanel.ts"
Cohesion: 0.05
Nodes (48): ExplainTone, FollowUp, REPLY_TOKENS, AI_SERVICES, aiSettingsOf(), T, definedName(), formulaTopic() (+40 more)

### Community 100 - "In programma"
Cohesion: 0.18
Nodes (10): Promemoria per lo studente, Account: i propri appunti su ogni dispositivo, anche da condividere, Commenti di chi prova Glifo, Idee per il futuro, In programma, La grafica: account, impostazioni, commenti, AI e lingua (chiesto il 10 ottobre 2026, se ne parla), La lavagna: idee in più, Più avanti (+2 more)

### Community 101 - "complex.test.ts"
Cohesion: 0.13
Nodes (18): staticGraphSvg(), chooseWindow(), chooseBox(), graphSvg(), imaginaryLabel(), PALETTES, sceneSvg(), item() (+10 more)

### Community 102 - "symbolsEn.test.ts"
Cohesion: 0.11
Nodes (41): SuggestionItem, editDistance(), normalizeText(), singular(), stem(), STOPWORDS, words(), BOTH (+33 more)

### Community 103 - "siteUpdate.ts"
Cohesion: 0.15
Nodes (19): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, loadPart() (+11 more)

### Community 104 - "graph/file.ts"
Cohesion: 0.09
Nodes (40): figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsForFile(), graphsFromFile(), hide(), OPEN (+32 more)

### Community 105 - "supabase.ts"
Cohesion: 0.10
Nodes (39): @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken(), ensureSessionOf() (+31 more)

### Community 106 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

### Community 107 - "spellcheck.ts"
Cohesion: 0.10
Nodes (20): misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt(), openAt() (+12 more)

### Community 108 - "laplace.ts"
Cohesion: 0.10
Nodes (50): factoredPolynomial(), integerPoly(), beyondPoles(), compiled(), E, exp(), fractionShown(), HALF (+42 more)

### Community 113 - "graph.ts"
Cohesion: 0.05
Nodes (46): @maxgraph/core, AT_X, cellHtml(), cellText(), COMPASS, createEdgeCell(), createGraph(), drawSchema() (+38 more)

### Community 116 - "fourier.ts"
Cohesion: 0.21
Nodes (19): absOf(), boundsOf(), close(), definite(), fourierProblem, fourierShown(), isTrig(), isZero() (+11 more)

### Community 117 - "captcha.ts"
Cohesion: 0.15
Nodes (12): captchaToken(), loadTurnstile(), Turnstile, TURNSTILE_SCRIPT, Window, TURNSTILE_SITE_KEY, accountFailure(), Accesso con Google (+4 more)

### Community 118 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 119 - "i18n.ts"
Cohesion: 0.06
Nodes (37): vite-plugin-pwa, browserLang(), browserLanguages(), dateLocale(), detectLang(), Entry, isLang(), lang (+29 more)

### Community 120 - "markdown.ts"
Cohesion: 0.10
Nodes (36): valueNode(), texHtml(), toolButton(), dataRange(), moveAttrs(), checkHtml(), checkTitle(), T (+28 more)

### Community 121 - "mathSyntax.ts"
Cohesion: 0.18
Nodes (16): @lezer/highlight, @lezer/markdown, lineDepth(), mathDelimTag, mathTag, parseBlockMath(), analyzeBlockOpen(), BlockOpen (+8 more)

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "strokes.ts"
Cohesion: 0.08
Nodes (37): centerOn(), copyStrokes(), cross(), handleScale(), IDENTITY, insideLasso(), keepInside(), LASSO_SHARE (+29 more)

### Community 124 - "Sheet"
Cohesion: 0.07
Nodes (30): Definition, Line, ExactComplexScope, Ode, withWorkLimit(), FiniteContext, FormattedResult, differentialRequest (+22 more)

### Community 125 - "feedback.ts"
Cohesion: 0.05
Nodes (71): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), PullResult, openShareDialog(), changeAccess(), changeCopy() (+63 more)

### Community 128 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 129 - "formula.ts"
Cohesion: 0.14
Nodes (15): BinOp, COMPARE, ERRORS_BY_LENGTH, OPERATORS, Ref, refText(), rewriteRefs(), T (+7 more)

### Community 132 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 136 - "Board"
Cohesion: 0.09
Nodes (4): Board, clampZoom(), loadPrefs(), validView()

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 139 - "ui/relocation.ts"
Cohesion: 0.22
Nodes (14): moveDayLabel(), relocationMessage(), downloadButton(), NEW_HOST, openNewSite(), relocationBanner(), relocationErrorMessage(), RelocationUiDeps (+6 more)

### Community 140 - "Distribution"
Cohesion: 0.17
Nodes (9): continuousQuantile(), discreteQuantile(), Distribution, exactIntervalProbability(), integerRange(), intervalProbability(), pValue(), TestResult (+1 more)

### Community 141 - "xlsx.ts"
Cohesion: 0.09
Nodes (47): RFC-4180, fflate, tablesNote(), csvCell(), csvDelimiter(), csvNumbers(), csvToSheet(), digitsOf() (+39 more)

### Community 142 - "editor/lists.ts"
Cohesion: 0.09
Nodes (60): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+52 more)

### Community 143 - "dom.ts"
Cohesion: 0.10
Nodes (16): T, append(), Child, clear(), formatDate(), ICONS, Props, T (+8 more)

### Community 144 - "render/lists.ts"
Cohesion: 0.38
Nodes (10): bulletGroup(), sameList(), alignInside(), asciiTrim(), findMarker(), isOrdered(), listAttrs(), listRule() (+2 more)

### Community 146 - "Glifo"
Cohesion: 0.12
Nodes (16): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Commenti, Compatibilità con VS Code, Condividere una nota con un link (+8 more)

### Community 154 - "vite"
Cohesion: 0.29
Nodes (4): vite, minutes, postMessage(), started

### Community 156 - "Glifo – note per Claude"
Cohesion: 0.25
Nodes (8): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Regole, sqlite()

### Community 157 - "chart.ts"
Cohesion: 0.15
Nodes (25): at(), breakEven(), Point, T, tableItems(), textLabel(), chartData, chartFrom() (+17 more)

### Community 159 - "linsys.ts"
Cohesion: 0.05
Nodes (105): exponentialForm(), fracTex(), fracText(), nearFraction(), piMultiple(), surd(), decimalSeparator(), Digits (+97 more)

### Community 160 - "vectorcalc.test.ts"
Cohesion: 0.32
Nodes (6): circle, light, result(), sphere, tex(), text()

### Community 161 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 162 - "editor.test.ts"
Cohesion: 0.07
Nodes (27): insertTemplate(), templateInsertion(), CODE_NODES, CommandToken, commandTokenAt(), EditorMathContext, isInCode(), MATH_NODES (+19 more)

### Community 163 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 166 - "I modelli e le chiavi API"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), In prova sul ramo `prova` (7 ottobre 2026): Qwen3 nel browser per «Spiegami», Le idee dello studente (5 ottobre 2026)

## Knowledge Gaps
- **852 isolated node(s):** `Comandi`, `Regole`, `6. Glifo anche in inglese`, `8. Il pulsante ✨ con il contorno`, `Gli abbonamenti, in tutto questo` (+847 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1163 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **40 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `texts` connect `i18n.ts` to `domain.ts`, `vitest`, `main.ts`, `compile`, `formula.ts`, `spec.ts`, `schemaEn.test.ts`, `graph/preview.ts`, `Dove sono le cose`, `distributions.ts`, `src/relocation.ts`, `svg.ts`, `plan.ts`, `editor/lists.ts`, `editor/editor.ts`, `dom.ts`, `explainPanel.ts`, `numerical.ts`, `arithmetic.ts`, `xlsx.ts`, `index.ts`, `schema/editor.ts`, `board.ts`, `ui/preview.ts`, `Glifo – note per Claude`, `chart.ts`, `gantt.ts`, `linsys.ts`, `parse.ts`, `assistant.ts`, `logic.ts`, `toLatex`, `complex.ts`, `fields.ts`, `several.ts`, `study.ts`, `resize.ts`, `restore.ts`, `localModels.ts`, `functions.ts`, `MathError`, `toolbar.ts`, `probability.ts`, `inference.ts`, `h`, `finite.ts`, `topics.ts`, `ui/relocation.ts`, `spreadsheet/editor.ts`, `conics.ts`, `odesolve.ts`, `sheet.ts`, `usesDecimalComma`, `schema/templates.ts`, `symbolic.ts`, `page.ts`, `NotesStore`, `schemaBlocks.ts`, `sidePanel.ts`, `siteUpdate.ts`, `graph/file.ts`, `supabase.ts`, `spellcheck.ts`, `laplace.ts`, `fourier.ts`, `markdown.ts`, `feedback.ts`?**
  _High betweenness centrality (0.141) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `Dove sono le cose` to `vitest`, `main.ts`, `compile`, `spec.ts`, `schemaEn.test.ts`, `num`, `Board`, `graph/preview.ts`, `src/relocation.ts`, `svg.ts`, `plan.ts`, `xlsx.ts`, `editor/editor.ts`, `SchemaEditor`, `explainPanel.ts`, `numerical.ts`, `arithmetic.ts`, `SheetEditor`, `schema/editor.ts`, `noteWordsMath.test.ts`, `store.ts`, `Parser`, `board.ts`, `ui/preview.ts`, `parse.ts`, `chart.ts`, `gantt.ts`, `linsys.ts`, `view3d.ts`, `assistant.ts`, `several.ts`, `toLatex`, `complex.ts`, `fields.ts`, `logic.ts`, `study.ts`, `ExplainPanel`, `localModels.ts`, `functions.ts`, `MathError`, `Pt`, `Rational`, `board/shapes.ts`, `toolbar.ts`, `SidePanel`, `inference.ts`, `spreadsheet/format.ts`, `h`, `finite.ts`, `topics.ts`, `ui/relocation.ts`, `spreadsheet/editor.ts`, `conics.ts`, `odesolve.ts`, `sheet.ts`, `usesDecimalComma`, `blockMove.ts`, `symbolic.ts`, `page.ts`, `NotesStore`, `tutorial.mjs`, `smoke-test.mjs`, `schemaBlocks.ts`, `sidePanel.ts`, `siteUpdate.ts`, `graph/file.ts`, `supabase.ts`, `graph.ts`, `fourier.ts`, `i18n.ts`, `markdown.ts`, `strokes.ts`, `Sheet`?**
  _High betweenness centrality (0.109) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `schemaEn.test.ts`, `num`, `graph/preview.ts`, `Dove sono le cose`, `distributions.ts`, `src/relocation.ts`, `svg.ts`, `plan.ts`, `editor/lists.ts`, `editor/editor.ts`, `xlsx.ts`, `schema/editor.ts`, `noteWordsMath.test.ts`, `store.ts`, `board.ts`, `parse.ts`, `chart.ts`, `linsys.ts`, `view3d.ts`, `assistant.ts`, `editor.test.ts`, `vectorcalc.test.ts`, `translations.test.ts`, `resize.ts`, `restore.ts`, `localModels.ts`, `MathError`, `board/shapes.ts`, `h`, `database.ts`, `topics.ts`, `spreadsheet/editor.ts`, `sheet.ts`, `blockMove.ts`, `page.ts`, `NotesStore`, `schemaBlocks.ts`, `sidePanel.ts`, `complex.test.ts`, `symbolsEn.test.ts`, `siteUpdate.ts`, `supabase.ts`, `laplace.ts`, `captcha.ts`, `i18n.ts`, `markdown.ts`, `strokes.ts`, `Sheet`, `feedback.ts`?**
  _High betweenness centrality (0.058) - this node is a cross-community bridge._
- **Are the 310 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `tutorialModel()`) actually correct?**
  _`Dove sono le cose` has 310 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Comandi`, `Regole`, `6. Glifo anche in inglese` to the rest of the system?**
  _852 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `domain.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08635703918722787 - nodes in this community are weakly interconnected._
- **Should `vitest` be split into smaller, more focused modules?**
  _Cohesion score 0.04842105263157895 - nodes in this community are weakly interconnected._