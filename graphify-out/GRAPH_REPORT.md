# Graph Report - Glifo  (2026-10-14)

## Corpus Check
- 346 files · ~726,249 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5562 nodes · 20347 edges · 170 communities (130 shown, 40 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 688 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `5df5fc6f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- h
- sheet.ts
- main.ts
- compile
- SyncEngine
- spec.ts
- parse.ts
- num
- GraphView
- markdown.ts
- probability.ts
- toNode
- svg.ts
- statsShown.ts
- SchemaEditor
- plan.ts
- SheetEditor
- mathEn2.test.ts
- numerical.ts
- arithmetic.ts
- index.ts
- engine.ts
- schema/editor.ts
- noteWords.ts
- store.ts
- Parser
- ink.ts
- supabase.ts
- smoke-test.mjs
- several.ts
- graph/file.ts
- study.ts
- view3d.ts
- assistant.ts
- logic.ts
- graph/preview.ts
- complex.ts
- namesIn
- translations.test.ts
- resize.ts
- graph/space.ts
- Board
- aiEn.test.ts
- sql.ts
- functions.ts
- MathError
- i18n.ts
- Rational
- conics.ts
- board/shapes.ts
- NotesStore
- sidePanel.ts
- spaces.ts
- graph.ts
- FoldersStore
- openShareDialog
- 20261004091555_note_condivise.sql
- editor/lists.ts
- database.ts
- finite.ts
- aiPanel.ts
- dependencies
- Welcome to Glifo
- spreadsheet/editor.ts
- spreadsheetEn.test.ts
- odesolve.ts
- toolbar.ts
- laplace.ts
- ui/preview.ts
- Benvenuto in Glifo
- compilerOptions
- relocation-test.mjs
- toLatex
- symbolic.ts
- Field
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- suggestions.ts
- ExplainPanel
- session-start.sh
- .claude/CLAUDE.md
- Il database degli account (Supabase)
- tutorial.mjs
- Abbonamenti
- topics.ts
- BoardStore
- supabase-stub.sql
- account-test.mjs
- downloadText
- Le spiegazioni, come funzionano
- noteWordsMath.test.ts
- createFakeSupabase
- symbolsEn.test.ts
- toast
- labels.ts
- explainPanel.ts
- Costi
- @codemirror/state
- schemaTools.test.ts
- schema/shapes.ts
- .folderItem
- schema/templates.ts
- solve.ts
- src/relocation.ts
- page.ts
- captcha.ts
- editor/editor.ts
- board.ts
- Sheet
- vite
- vitest
- Dove sono le cose
- faq.ts
- formula.ts
- Stroke
- 20261008130026_commenti.sql
- MLCEngine
- Glifo
- xlsx.ts
- template.ts
- feedback.ts
- suggest.ts
- .renderFormat
- L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota
- Glifo – note per Claude
- vite.config.ts
- logo.ts
- severalGraph.ts
- LlamaWorker
- AccountSync
- linear.test.ts
- In programma
- parseGraph
- La lavagna
- Piano per piano
- I modelli e le chiavi API

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 329 edges
2. `MathError` - 151 edges
3. `Sheet` - 147 edges
4. `num()` - 145 edges
5. `h()` - 136 edges
6. `MathNode` - 131 edges
7. `texts` - 124 edges
8. `mul()` - 124 edges
9. `Board` - 117 edges
10. `compile()` - 116 edges

## Surprising Connections (you probably didn't know these)
- `Dove sono le cose` --references--> `fakeLlmWorker()`  [INFERRED]
  ARCHITETTURA.md → scripts/smoke-test.mjs
- `Dove sono le cose` --references--> `tutorialModel()`  [INFERRED]
  ARCHITETTURA.md → scripts/tutorial.mjs
- `Dove sono le cose` --references--> `ConicElements`  [INFERRED]
  ARCHITETTURA.md → src/math/conics.ts
- `Funzionalità` --references--> `k()`  [INFERRED]
  README.md → src/math/numerical.ts
- `Come viene pubblicata` --references--> `dist()`  [INFERRED]
  README.md → src/board/shapes.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (170 total, 40 thin omitted)

### Community 0 - "h"
Cohesion: 0.04
Nodes (87): SyncStatus, gpuF16(), modelVariant, T, rich(), texts, moveDayLabel(), relocationMessage() (+79 more)

### Community 1 - "sheet.ts"
Cohesion: 0.05
Nodes (44): formulaGraph(), GraphItem, numericPartials(), OdeFunction, NUMERICAL, bracketParts(), BRACKETS, CHECK_VALUES (+36 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (101): LocalChange, account, ACCOUNT_OFF, accountButton, active, aiShown(), aiToggle, aiWork (+93 more)

### Community 3 - "compile"
Cohesion: 0.04
Nodes (111): conicItems(), isConicLine(), T, integralRegion, LayeredSolid, areaFor(), constantValue(), define() (+103 more)

### Community 4 - "SyncEngine"
Cohesion: 0.11
Nodes (13): isEmpty(), iso(), merge(), ms(), noChange(), Prefs, remoteFolder(), remoteNote() (+5 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (89): quadricEquation(), fourierItems(), isFourierLine(), T, isComplexLine(), isComplexValue(), isSegmentNode(), constantIntegrand() (+81 more)

### Community 6 - "parse.ts"
Cohesion: 0.05
Nodes (54): hasWord(), EMPTY_SCOPE, errorMessage(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS (+46 more)

### Community 7 - "num"
Cohesion: 0.12
Nodes (93): atIntegers(), withoutAbs(), hyperbolicToExp(), polyEx(), expOf(), invert(), logPart(), mobius() (+85 more)

### Community 8 - "GraphView"
Cohesion: 0.13
Nodes (12): explicitWindow(), fitField(), graphSize(), GraphView, remember(), sameCamera(), snap(), specFor() (+4 more)

### Community 9 - "markdown.ts"
Cohesion: 0.07
Nodes (51): @codemirror/commands, blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove, blockPlace() (+43 more)

### Community 10 - "probability.ts"
Cohesion: 0.05
Nodes (68): addExp(), choose(), continuousQuantile(), decimals(), discreteQuantile(), Distribution, End, exactIntervalProbability() (+60 more)

### Community 11 - "toNode"
Cohesion: 0.12
Nodes (33): absOf(), boundsOf(), close(), definite(), fourierProblem, fourierShown(), isTrig(), isZero() (+25 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (52): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), dataWindow(), domainEdge() (+44 more)

### Community 13 - "statsShown.ts"
Cohesion: 0.13
Nodes (37): expSumValue(), Lin, check(), correlation(), count(), covariance(), Data, DATA_FUNCTIONS (+29 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.10
Nodes (4): isLanes(), SchemaEditor, withLaneContents(), serializeSchema()

### Community 15 - "plan.ts"
Cohesion: 0.09
Nodes (38): tableItems(), textLabel(), chartData, chartFrom(), chartLines(), chartRange(), currentRegion(), isNumber() (+30 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (8): functionLabel(), SheetEditor, englishTyping(), serializeSheet(), sheetSize(), CellRange, clearRange(), cloneSheet()

### Community 17 - "mathEn2.test.ts"
Cohesion: 0.09
Nodes (38): isTestLine(), number(), T, testItems(), EMPTY_COMPLEX_SCOPE, Interval, between(), chiSquareTest() (+30 more)

### Community 18 - "numerical.ts"
Cohesion: 0.11
Nodes (50): bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial(), interpolating() (+42 more)

### Community 19 - "arithmetic.ts"
Cohesion: 0.10
Nodes (50): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+42 more)

### Community 20 - "index.ts"
Cohesion: 0.06
Nodes (43): b, bigops, c, calculus, fn, fr, fractions, functions (+35 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "schema/editor.ts"
Cohesion: 0.05
Nodes (54): ALIGN, ALIGN_NAMES, ARROW_NAMES, AT_ICONS, AT_NAMES, BASE_PRESETS, BIG_ARROWS, DB_PRESETS (+46 more)

### Community 23 - "noteWords.ts"
Cohesion: 0.07
Nodes (46): @codemirror/view, addToGraphBlock(), formulaAtCursor(), GraphLabelLines, insertGraphBlock(), LABEL_KEYS, setGraphLabels(), FIGURE_PALETTE (+38 more)

### Community 24 - "store.ts"
Cohesion: 0.08
Nodes (18): fake-indexeddb, BoardBackend, BoardChange, BoardData, done(), fromRecord(), IdbBoards, ofNote() (+10 more)

### Community 26 - "ink.ts"
Cohesion: 0.13
Nodes (19): Prefs, BOARD_PALETTES, BoardPalette, BoardTheme, highlightName(), inkName(), mid(), outlineSvg() (+11 more)

### Community 27 - "supabase.ts"
Cohesion: 0.06
Nodes (58): @supabase/supabase-js, withLock(), accountDataFile(), Account, accountError, appUrl(), call(), currentSession() (+50 more)

### Community 28 - "smoke-test.mjs"
Cohesion: 0.15
Nodes (6): markdown-it, playwright-core, PNG_ICONS, fakeLlmWorker(), firstVisit(), plainContext

### Community 29 - "several.ts"
Cohesion: 0.09
Nodes (49): Piece, Condition, Family, Group, Root, Shape, fractionNear(), at() (+41 more)

### Community 30 - "graph/file.ts"
Cohesion: 0.05
Nodes (92): graphImagesFor(), graphsFromFile(), OPEN, T, unhide(), amount(), barColor(), crossings() (+84 more)

### Community 31 - "study.ts"
Cohesion: 0.14
Nodes (37): Asymptote, asymptoteText(), boundaries(), compiled(), cutsOf(), defined(), domainOf(), exact() (+29 more)

### Community 32 - "view3d.ts"
Cohesion: 0.10
Nodes (36): Box, Face, planeSide(), planeTolerance(), GraphSpec, Plane, Vec3, arcPoints() (+28 more)

### Community 33 - "assistant.ts"
Cohesion: 0.07
Nodes (46): AiAnswer, AiError, AiSettings, answerSchema(), askAi(), askCompatible(), askThroughHost(), capitalized() (+38 more)

### Community 34 - "logic.ts"
Cohesion: 0.11
Nodes (30): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+22 more)

### Community 35 - "graph/preview.ts"
Cohesion: 0.07
Nodes (34): decimalText(), tickLabel(), addLabel(), boxes, cameras, complexCoord(), containing(), coord() (+26 more)

### Community 36 - "complex.ts"
Cohesion: 0.05
Nodes (75): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isInequality(), onlyComplex() (+67 more)

### Community 37 - "namesIn"
Cohesion: 0.12
Nodes (38): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+30 more)

### Community 38 - "translations.test.ts"
Cohesion: 0.17
Nodes (18): AstNode, calleeName(), check(), checkPair(), visit(), children(), entryPairs(), files (+10 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (24): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+16 more)

### Community 40 - "graph/space.ts"
Cohesion: 0.11
Nodes (48): sampleRegion(), addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon() (+40 more)

### Community 41 - "Board"
Cohesion: 0.10
Nodes (8): Board, clampZoom(), loadPrefs(), pressureOf(), sizeChoice(), validView(), SizeChoice, Pt

### Community 42 - "aiEn.test.ts"
Cohesion: 0.05
Nodes (55): EXPLAIN_TONES, chat(), GlifoError, Gpu, load(), post(), remove(), scope (+47 more)

### Community 43 - "sql.ts"
Cohesion: 0.19
Nodes (16): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+8 more)

### Community 44 - "functions.ts"
Cohesion: 0.08
Nodes (60): EMPTY, number(), T, addFormat(), divFormat(), mulFormat(), tidy(), withCents() (+52 more)

### Community 45 - "MathError"
Cohesion: 0.11
Nodes (61): MathError, formatNumber(), angleBetween(), asMatrix(), basisOf(), circleText(), complexText(), cross() (+53 more)

### Community 46 - "i18n.ts"
Cohesion: 0.06
Nodes (40): browserLang(), browserLanguages(), dateLocale(), detectLang(), Entry, isLang(), lang, LANGUAGES (+32 more)

### Community 47 - "Rational"
Cohesion: 0.07
Nodes (66): Part, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactFunction, exactRoot(), ExactScope (+58 more)

### Community 48 - "conics.ts"
Cohesion: 0.17
Nodes (30): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+22 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (36): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+28 more)

### Community 50 - "NotesStore"
Cohesion: 0.06
Nodes (36): newStrokeId(), receiveRelocation(), restore(), Deletion, DeletionLog, Folder, FOLDER_NAME_MAX, FolderGroup (+28 more)

### Community 51 - "sidePanel.ts"
Cohesion: 0.08
Nodes (31): katex, AiResult, valueNode(), texHtml(), toolButton(), localizeTex(), checkHtml(), checkTitle() (+23 more)

### Community 52 - "spaces.ts"
Cohesion: 0.11
Nodes (29): decimalSeparator(), Digits, FormatOptions, formatRational(), fromNumber(), fromRational(), SUPERSCRIPT, writeDigits() (+21 more)

### Community 53 - "graph.ts"
Cohesion: 0.13
Nodes (27): AT_X, cellHtml(), cellText(), COMPASS, createEdgeCell(), createGraph(), drawSchema(), edgeLook() (+19 more)

### Community 54 - "FoldersStore"
Cohesion: 0.15
Nodes (4): cleanFolderName(), FoldersStore, sameName(), names()

### Community 55 - "openShareDialog"
Cohesion: 0.19
Nodes (15): openShareDialog(), changeAccess(), changeCopy(), refreshChanged(), render(), run(), setStatus(), shareNow() (+7 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "editor/lists.ts"
Cohesion: 0.09
Nodes (61): continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext(), isBlank() (+53 more)

### Community 58 - "database.ts"
Cohesion: 0.23
Nodes (6): createDatabase(), createUser(), databaseTests(), feedbackTests(), migrations, shareTests()

### Community 59 - "finite.ts"
Cohesion: 0.17
Nodes (28): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+20 more)

### Community 60 - "aiPanel.ts"
Cohesion: 0.16
Nodes (15): definedName(), formulaTopic(), graphTopic(), numberText(), studyOf(), theoremTopic(), NoteSubject, SubjectKind (+7 more)

### Community 61 - "dependencies"
Cohesion: 0.05
Nodes (36): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+28 more)

### Community 62 - "Welcome to Glifo"
Cohesion: 0.20
Nodes (9): A few examples, Calculations and graphs, For programming too, Handy shortcuts, How to write formulas, Lists, Spell check, Try it now (+1 more)

### Community 63 - "spreadsheet/editor.ts"
Cohesion: 0.09
Nodes (50): sheetSummary(), ChartTable, currentCall(), Editing, MenuEntry, Move, openSheetEditor(), PATHS (+42 more)

### Community 64 - "spreadsheetEn.test.ts"
Cohesion: 0.07
Nodes (61): valueText(), quantity(), hide(), OPEN, sheetsForFile(), sheetsFromFile(), T, unhide() (+53 more)

### Community 65 - "odesolve.ts"
Cohesion: 0.08
Nodes (78): linearIn(), termTransform(), addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled() (+70 more)

### Community 66 - "toolbar.ts"
Cohesion: 0.06
Nodes (33): closeMathBlockOnEnter(), EditorCallbacks, MarkdownEditor, searchPhrases(), insertBlock(), InsertOptions, insertTemplate(), toggleLinePrefix() (+25 more)

### Community 67 - "laplace.ts"
Cohesion: 0.18
Nodes (24): beyondPoles(), compiled(), E, exp(), fractionShown(), HALF, inverseLaplaceShown(), inverseRational() (+16 more)

### Community 68 - "ui/preview.ts"
Cohesion: 0.07
Nodes (32): GraphLabels, GraphLook, BlockKind, MoveDir, Look, Theme, draw(), drawCached() (+24 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "relocation-test.mjs"
Cohesion: 0.18
Nodes (7): AFTER_MOVE, ids, newBrowser(), NOTICE_DAY, out, serve(), TYPES

### Community 73 - "toLatex"
Cohesion: 0.07
Nodes (50): isNumericalLine(), numericalItems(), classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX, Line (+42 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (60): atValues(), combine(), commonMonomial(), Converter, coordinates(), decimalText(), definiteParts(), definiteValue() (+52 more)

### Community 75 - "Field"
Cohesion: 0.11
Nodes (8): characteristicPolynomial(), eigenvalues(), eigenvectors(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn()

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Errore o imprevisto → nel dettaglio, 3. Serve una decisione → frasi complete, 4. Fine del compito → un solo riepilogo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "suggestions.ts"
Cohesion: 0.20
Nodes (7): EditorMathContext, expand(), preferredIndex(), SuggestionController, commandNames(), parseTemplate(), templateText()

### Community 79 - "ExplainPanel"
Cohesion: 0.07
Nodes (20): ExplainTone, FollowUp, REPLY_TOKENS, Settings, AI_NEWS_TITLE, AI_WORKING_TITLE, aiActivity, AiWork (+12 more)

### Community 82 - "Il database degli account (Supabase)"
Cohesion: 0.20
Nodes (9): Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Note condivise con un link, Sincronizzazione, `sync_pull({ since })`: scarica le novità (+1 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.11
Nodes (11): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+3 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.13
Nodes (15): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+7 more)

### Community 91 - "topics.ts"
Cohesion: 0.12
Nodes (27): ATTRIBUTES, cut(), ER_SHAPES, fieldText(), fitLines(), flowOrder(), formulaText(), FREE_NAMES (+19 more)

### Community 92 - "BoardStore"
Cohesion: 0.12
Nodes (5): BoardStore, MemoryBoards, applyAccountChange(), backup(), boardsFor()

### Community 96 - "account-test.mjs"
Cohesion: 0.11
Nodes (10): device(), login(), newContext, waitFor(), b64(), CAPTCHA_TOKEN, CODE, GOOGLE_CODE (+2 more)

### Community 97 - "downloadText"
Cohesion: 0.38
Nodes (5): loadDialect(), svgToPng(), downloadBlob(), downloadText(), fileNameFor()

### Community 98 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 100 - "noteWordsMath.test.ts"
Cohesion: 0.11
Nodes (16): AstNode, childrenOf(), DATA, ENGLISH, englishTexts(), FUNCTIONS, inBothLanguages(), isNode() (+8 more)

### Community 101 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 102 - "symbolsEn.test.ts"
Cohesion: 0.13
Nodes (29): editDistance(), singular(), stem(), STOPWORDS, words(), BOTH, buildIndex(), containsPhrase() (+21 more)

### Community 103 - "toast"
Cohesion: 0.10
Nodes (33): board, loadingEditor(), moveBlockInNote(), openSchema(), openSheet(), preview, saveSchemaBlock(), saveSheetBlock() (+25 more)

### Community 104 - "labels.ts"
Cohesion: 0.12
Nodes (28): figureName(), graphFigure(), graphImage(), swatchSvg(), titleBand(), ACCENTS, BLACKBOARD, CALLIGRAPHIC (+20 more)

### Community 105 - "explainPanel.ts"
Cohesion: 0.07
Nodes (42): @codemirror/language, explainTarget, Explanation, schemaTitle(), acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin (+34 more)

### Community 106 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 107 - "@codemirror/state"
Cohesion: 0.07
Nodes (29): @codemirror/lang-markdown, @codemirror/state, noIndentedCode, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck() (+21 more)

### Community 108 - "schemaTools.test.ts"
Cohesion: 0.19
Nodes (15): crc32(), svgSize(), T, withDensity(), labelHtml(), lanesHtml(), plainHtml(), tableHtml() (+7 more)

### Community 113 - "schema/shapes.ts"
Cohesion: 0.08
Nodes (16): @maxgraph/core, ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape (+8 more)

### Community 116 - ".folderItem"
Cohesion: 0.23
Nodes (3): saveClosedFolders(), NotesPanel, NotesPanelDeps

### Community 117 - "schema/templates.ts"
Cohesion: 0.19
Nodes (19): DEFAULT_EDGE, SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), conceptMap(), cycle(), edge() (+11 more)

### Community 118 - "solve.ts"
Cohesion: 0.15
Nodes (26): LinearScope, splitRoot(), isStandardUnknown(), linearSystem(), breaks(), cubeRoot(), equation(), holds() (+18 more)

### Community 119 - "src/relocation.ts"
Cohesion: 0.10
Nodes (49): accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf() (+41 more)

### Community 120 - "page.ts"
Cohesion: 0.08
Nodes (35): setCurrentAccount(), signOut(), accountDeps(), accountProblem(), deleteAccount(), reloadPage(), signOutAccount(), switchAccount() (+27 more)

### Community 121 - "captcha.ts"
Cohesion: 0.15
Nodes (12): captchaToken(), loadTurnstile(), Turnstile, TURNSTILE_SCRIPT, Window, TURNSTILE_SITE_KEY, accountFailure(), Accesso con Google (+4 more)

### Community 122 - "editor/editor.ts"
Cohesion: 0.03
Nodes (79): description, name, private, scripts, build, dev, preview, test (+71 more)

### Community 123 - "board.ts"
Cohesion: 0.06
Nodes (62): Action, coalesced(), DOT_SIZES, EraserMode, Finger, HANDLE_REACH, ICON, LassoAction (+54 more)

### Community 124 - "Sheet"
Cohesion: 0.09
Nodes (24): ExactComplexScope, Ode, withWorkLimit(), FiniteContext, FormattedResult, differentialRequest, pieces(), MathNode (+16 more)

### Community 125 - "vite"
Cohesion: 0.33
Nodes (4): vite, minutes, postMessage(), started

### Community 128 - "vitest"
Cohesion: 0.05
Nodes (50): @electric-sql/pglite, vitest, BlockWidget, findWidgetBlocks(), guardBlocks(), KINDS, schemaBlocks(), schemaSummary() (+42 more)

### Community 129 - "Dove sono le cose"
Cohesion: 0.05
Nodes (86): 1. A cosa serve l'AI dei modelli di frontiera, Dove sono le cose, Glifo – architettura, allNames(), answerFollowUp(), bareResult(), chained(), chatContext (+78 more)

### Community 132 - "faq.ts"
Cohesion: 0.18
Nodes (13): copyLink(), FaqGroup, faqGroups(), FaqQuestion, faqSection, kbd(), list(), p() (+5 more)

### Community 133 - "formula.ts"
Cohesion: 0.12
Nodes (18): pick(), BinOp, COMPARE, ERRORS_BY_LENGTH, FormulaError, formulaRefs(), OPERATORS, parseFormula() (+10 more)

### Community 136 - "Stroke"
Cohesion: 0.10
Nodes (6): BoardOptions, DrawAction, EraseAction, pointsOf(), Step, Stroke

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 140 - "Glifo"
Cohesion: 0.12
Nodes (16): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Domande frequenti e commenti (+8 more)

### Community 141 - "xlsx.ts"
Cohesion: 0.08
Nodes (46): RFC-4180, fflate, tablesNote(), csvCell(), csvDelimiter(), csvNumbers(), csvToSheet(), digitsOf() (+38 more)

### Community 142 - "template.ts"
Cohesion: 0.21
Nodes (10): SuggestionItem, CATEGORIES, cardPreviewTex(), formPreviewTex(), ParsedTemplate, PLACEHOLDER_TEX, placeholderPreview(), Category (+2 more)

### Community 143 - "feedback.ts"
Cohesion: 0.08
Nodes (42): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, Site, T, commentDate(), commentItem(), COMMENTS_MAX (+34 more)

### Community 144 - "suggest.ts"
Cohesion: 0.27
Nodes (11): normalizeText(), IndexedEntry, SearchResult, getIndex(), isSubsequence(), keysOf(), MatchKind, suggestCommands() (+3 more)

### Community 146 - ".renderFormat"
Cohesion: 0.25
Nodes (5): alignBoxes(), Alignment, Box, distributeBoxes(), Position

### Community 154 - "L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota"
Cohesion: 0.25
Nodes (8): 2. Dalla lavagna alla nota, 3. Da una foto alla nota, 4. Dettare: la voce diventa testo nella nota, 5. Registrare le lezioni e trascriverle, Da sistemare con il primo punto che tocca l'AI, Fonti (controllate il 14 ottobre 2026), In che ordine, L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota

### Community 156 - "Glifo – note per Claude"
Cohesion: 0.25
Nodes (8): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Regole, sqlite()

### Community 157 - "vite.config.ts"
Cohesion: 0.22
Nodes (6): @mlc-ai/web-llm, vite-plugin-pwa, accountOffMessage(), defineFor(), MAIN_BRANCH, webllmModels

### Community 158 - "logo.ts"
Cohesion: 0.33
Nodes (6): sidebarToggle(), BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark()

### Community 159 - "severalGraph.ts"
Cohesion: 0.44
Nodes (8): criticalLine(), isSeveralLine(), named(), severalItems(), surface(), T, optimumOf(), severalOf()

### Community 160 - "LlamaWorker"
Cohesion: 0.27
Nodes (4): Promemoria per lo studente, Commenti di chi prova Glifo, constructor(), LlamaWorker

### Community 162 - "linear.test.ts"
Cohesion: 0.29
Nodes (7): EXACT, FLOAT, A, B, q(), result(), text()

### Community 163 - "In programma"
Cohesion: 0.25
Nodes (8): Account: i propri appunti su ogni dispositivo, anche da condividere, Idee per il futuro, In programma, L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota (14 ottobre 2026, se ne parla), La lavagna: idee in più, Più avanti, Schemi: idee in più, Trasloco: il sito su Cloudflare, con un dominio tutto di Glifo

### Community 166 - "parseGraph"
Cohesion: 0.11
Nodes (24): staticGraphSvg(), chooseWindow(), chooseBox(), surfacePlane(), parseGraph(), DrawOptions, graphSvg(), DEFAULT_CAMERA (+16 more)

### Community 167 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 172 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 179 - "I modelli e le chiavi API"
Cohesion: 0.33
Nodes (6): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), In prova sul ramo `prova` (7 ottobre 2026): Qwen3 nel browser per «Spiegami», La chiave, il server locale e la scelta del modello (14 ottobre 2026), Le idee dello studente (5 ottobre 2026)

## Knowledge Gaps
- **873 isolated node(s):** `Condividere una nota con un link`, `Domande frequenti e commenti`, `Provarlo sul tuo computer`, `Assistente AI`, `Spiegami (in prova)` (+868 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1193 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **40 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `texts` connect `h` to `vitest`, `Dove sono le cose`, `main.ts`, `compile`, `sheet.ts`, `spec.ts`, `formula.ts`, `parse.ts`, `faq.ts`, `probability.ts`, `toNode`, `svg.ts`, `statsShown.ts`, `xlsx.ts`, `feedback.ts`, `plan.ts`, `mathEn2.test.ts`, `numerical.ts`, `arithmetic.ts`, `index.ts`, `schema/editor.ts`, `noteWords.ts`, `ink.ts`, `supabase.ts`, `several.ts`, `graph/file.ts`, `severalGraph.ts`, `study.ts`, `assistant.ts`, `logic.ts`, `graph/preview.ts`, `complex.ts`, `namesIn`, `resize.ts`, `aiEn.test.ts`, `sql.ts`, `functions.ts`, `MathError`, `i18n.ts`, `Rational`, `conics.ts`, `NotesStore`, `sidePanel.ts`, `spaces.ts`, `editor/lists.ts`, `finite.ts`, `aiPanel.ts`, `spreadsheet/editor.ts`, `spreadsheetEn.test.ts`, `odesolve.ts`, `toolbar.ts`, `ui/preview.ts`, `toLatex`, `symbolic.ts`, `ExplainPanel`, `topics.ts`, `toast`, `explainPanel.ts`, `@codemirror/state`, `schemaTools.test.ts`, `schema/templates.ts`, `solve.ts`, `src/relocation.ts`, `page.ts`, `editor/editor.ts`, `board.ts`?**
  _High betweenness centrality (0.116) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `Dove sono le cose` to `h`, `vitest`, `main.ts`, `compile`, `faq.ts`, `spec.ts`, `parse.ts`, `num`, `Stroke`, `markdown.ts`, `GraphView`, `toNode`, `svg.ts`, `xlsx.ts`, `statsShown.ts`, `SchemaEditor`, `plan.ts`, `mathEn2.test.ts`, `numerical.ts`, `arithmetic.ts`, `SheetEditor`, `feedback.ts`, `schema/editor.ts`, `noteWords.ts`, `vite.config.ts`, `Parser`, `ink.ts`, `supabase.ts`, `smoke-test.mjs`, `several.ts`, `graph/file.ts`, `logo.ts`, `study.ts`, `assistant.ts`, `logic.ts`, `graph/preview.ts`, `complex.ts`, `namesIn`, `parseGraph`, `formula.ts`, `graph/space.ts`, `Board`, `aiEn.test.ts`, `functions.ts`, `MathError`, `i18n.ts`, `Rational`, `conics.ts`, `board/shapes.ts`, `NotesStore`, `sidePanel.ts`, `graph.ts`, `finite.ts`, `aiPanel.ts`, `spreadsheet/editor.ts`, `spreadsheetEn.test.ts`, `odesolve.ts`, `toolbar.ts`, `ui/preview.ts`, `toLatex`, `symbolic.ts`, `ExplainPanel`, `tutorial.mjs`, `topics.ts`, `BoardStore`, `downloadText`, `toast`, `labels.ts`, `explainPanel.ts`, `schemaTools.test.ts`, `schema/shapes.ts`, `src/relocation.ts`, `page.ts`, `board.ts`, `Sheet`?**
  _High betweenness centrality (0.111) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `h`, `Dove sono le cose`, `sheet.ts`, `faq.ts`, `parse.ts`, `num`, `markdown.ts`, `probability.ts`, `xlsx.ts`, `template.ts`, `plan.ts`, `feedback.ts`, `mathEn2.test.ts`, `noteWords.ts`, `store.ts`, `ink.ts`, `supabase.ts`, `vite.config.ts`, `graph/file.ts`, `logo.ts`, `assistant.ts`, `linear.test.ts`, `complex.ts`, `parseGraph`, `resize.ts`, `translations.test.ts`, `aiEn.test.ts`, `i18n.ts`, `Rational`, `board/shapes.ts`, `NotesStore`, `editor/lists.ts`, `database.ts`, `spreadsheet/editor.ts`, `spreadsheetEn.test.ts`, `toolbar.ts`, `ui/preview.ts`, `ExplainPanel`, `noteWordsMath.test.ts`, `symbolsEn.test.ts`, `toast`, `@codemirror/state`, `schemaTools.test.ts`, `src/relocation.ts`, `captcha.ts`, `editor/editor.ts`, `board.ts`, `Sheet`?**
  _High betweenness centrality (0.095) - this node is a cross-community bridge._
- **Are the 328 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `tutorialModel()`) actually correct?**
  _`Dove sono le cose` has 328 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Condividere una nota con un link`, `Domande frequenti e commenti`, `Provarlo sul tuo computer` to the rest of the system?**
  _873 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `h` be split into smaller, more focused modules?**
  _Cohesion score 0.041103934233705224 - nodes in this community are weakly interconnected._
- **Should `sheet.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04597701149425287 - nodes in this community are weakly interconnected._