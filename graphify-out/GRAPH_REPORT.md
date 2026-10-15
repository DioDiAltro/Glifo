# Graph Report - Glifo  (2026-10-15)

## Corpus Check
- 346 files · ~729,009 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5569 nodes · 20376 edges · 175 communities (133 shown, 42 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 689 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `93b47bd7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- h
- vitest
- main.ts
- compile
- sync.ts
- spec.ts
- noteWordsGraph.test.ts
- num
- graph/preview.ts
- markdown.ts
- distributions.ts
- formatNumber
- svg.ts
- statsShown.ts
- SchemaEditor
- plan.ts
- SheetEditor
- Pt
- Rational
- arithmetic.ts
- index.ts
- engine.ts
- schema/editor.ts
- chart.ts
- store.ts
- parse.ts
- ink.ts
- supabase.ts
- editor/editor.ts
- several.ts
- gantt.ts
- study.ts
- view3d.ts
- assistant.ts
- logic.ts
- usesDecimalComma
- complex.ts
- namesIn
- translations.test.ts
- resize.ts
- graph/space.ts
- .constructor
- ui/settings.ts
- schemaEn.test.ts
- functions.ts
- MathError
- i18n.ts
- probability.ts
- conics.ts
- board/shapes.ts
- NotesStore
- sidePanel.ts
- linsys.ts
- graph.ts
- FoldersStore
- page.ts
- 20261004091555_note_condivise.sql
- editor/lists.ts
- database.ts
- finite.ts
- ui/preview.ts
- dependencies
- Welcome to Glifo
- spreadsheet/editor.ts
- spreadsheetEn.test.ts
- odesolve.ts
- toolbar.ts
- laplace.ts
- aiPanel.ts
- Benvenuto in Glifo
- compilerOptions
- relocation-test.mjs
- toLatex
- symbolic.ts
- Field
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- SuggestionController
- Settings
- session-start.sh
- .claude/CLAUDE.md
- Il database degli account (Supabase)
- tutorial.mjs
- Abbonamenti
- topics.ts
- BoardStore
- supabase-stub.sql
- account-test.mjs
- files.ts
- Le spiegazioni, come funzionano
- noteWordsMath.test.ts
- createFakeSupabase
- symbolsEn.test.ts
- siteUpdate.ts
- graph/file.ts
- calcResults.ts
- ExplainPanel
- spellcheck.ts
- schemaTools.test.ts
- .paintVertexShape
- MarkdownEditor
- schema/templates.ts
- tools.ts
- src/relocation.ts
- ui/relocation.ts
- spreadsheet/format.ts
- editor.test.ts
- board.ts
- sheet.ts
- vite
- noteWords.ts
- Dove sono le cose
- aiPanel.test.ts
- Parser
- Board
- 20261008130026_commenti.sql
- calcPlugin
- Glifo
- xlsx.ts
- .folderItem
- feedback.ts
- smoke-test.mjs
- settingsSections.test.ts
- L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota
- Glifo – note per Claude
- render/lists.ts
- picture.ts
- schema/preview.ts
- LlamaWorker
- site.ts
- Schema
- In programma
- devDependencies
- La lavagna
- scripts
- Piano per piano
- Costi
- select
- MLCEngine
- BoardOptions
- I modelli e le chiavi API

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 331 edges
2. `MathError` - 151 edges
3. `Sheet` - 148 edges
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

## Communities (175 total, 42 thin omitted)

### Community 0 - "h"
Cohesion: 0.05
Nodes (67): SyncStatus, T, rich(), texts, viewSwitch, openSignedOut(), printButton(), ShareDialogDeps (+59 more)

### Community 1 - "vitest"
Cohesion: 0.06
Nodes (33): vitest, formulaGraph(), GraphItem, parseGraph(), light, text(), item(), light (+25 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (115): newStrokeId(), addToGraphBlock(), account, ACCOUNT_OFF, active, aiShown(), aiToggle, aiWork (+107 more)

### Community 3 - "compile"
Cohesion: 0.04
Nodes (106): T, T, integralRegion, LayeredSolid, Multiple, criticalLine(), named(), severalItems() (+98 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (31): AccountSync, withLock(), Account, EMPTY_STATE, FolderChange, FolderRow, isEmpty(), iso() (+23 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (103): conicItems(), isConicLine(), quadricEquation(), fourierItems(), isFourierLine(), isComplexLine(), isNumericalLine(), numericalItems() (+95 more)

### Community 6 - "noteWordsGraph.test.ts"
Cohesion: 0.10
Nodes (37): @codemirror/state, @codemirror/view, formulaAtCursor(), GraphLabelLines, insertGraphBlock(), LABEL_KEYS, setGraphLabels(), graphImagesFor() (+29 more)

### Community 7 - "num"
Cohesion: 0.12
Nodes (95): atIntegers(), withoutAbs(), exp(), hyperbolicToExp(), inverseRational(), sqrtEx(), termTransform(), polyEx() (+87 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (44): FIGURE_PALETTE, addLabel(), boxes, cameras, complexCoord(), coord(), coordinates(), drawings (+36 more)

### Community 9 - "markdown.ts"
Cohesion: 0.08
Nodes (51): @codemirror/commands, blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blockKind, blank(), BlockMove (+43 more)

### Community 10 - "distributions.ts"
Cohesion: 0.06
Nodes (68): addExp(), choose(), continuousQuantile(), decimals(), discreteQuantile(), Distribution, exactIntervalProbability(), factorialBig() (+60 more)

### Community 11 - "formatNumber"
Cohesion: 0.10
Nodes (39): exponentialForm(), fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), decimalSeparator() (+31 more)

### Community 12 - "svg.ts"
Cohesion: 0.08
Nodes (60): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseWindow(), chooseY(), clipLines(), dataWindow() (+52 more)

### Community 13 - "statsShown.ts"
Cohesion: 0.12
Nodes (39): EMPTY_COMPLEX_SCOPE, check(), correlation(), count(), covariance(), Data, dataStatistic(), deviation() (+31 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.09
Nodes (9): fieldInput(), isLanes(), SchemaEditor, withLaneContents(), edgeTextAt(), EdgeLook, insideLanes(), laneNames() (+1 more)

### Community 15 - "plan.ts"
Cohesion: 0.15
Nodes (17): cellText(), columnRole(), columnsOf(), durationUnit(), isNumber(), isPlanRange(), MAX_ACTIVITIES, plain() (+9 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (8): functionLabel(), SheetEditor, englishTyping(), sheetSize(), CellRange, clearRange(), cloneSheet(), setCell()

### Community 17 - "Pt"
Cohesion: 0.16
Nodes (8): clampZoom(), PanAction, PinchAction, pressureOf(), validView(), EllipseFit, BoardView, Pt

### Community 18 - "Rational"
Cohesion: 0.06
Nodes (66): expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactRandom, exactRoot(), factorialExact() (+58 more)

### Community 19 - "arithmetic.ts"
Cohesion: 0.09
Nodes (55): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+47 more)

### Community 20 - "index.ts"
Cohesion: 0.06
Nodes (43): b, bigops, c, calculus, fn, fr, fractions, functions (+35 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "schema/editor.ts"
Cohesion: 0.05
Nodes (48): ALIGN, ALIGN_NAMES, ARROW_NAMES, AT_ICONS, AT_NAMES, BASE_PRESETS, BIG_ARROWS, DB_PRESETS (+40 more)

### Community 23 - "chart.ts"
Cohesion: 0.14
Nodes (28): at(), breakEven(), Point, quantity(), T, tableItems(), textLabel(), graphKeyLine() (+20 more)

### Community 24 - "store.ts"
Cohesion: 0.08
Nodes (19): EraseAction, Step, BoardBackend, BoardChange, BoardData, done(), fromRecord(), IdbBoards (+11 more)

### Community 25 - "parse.ts"
Cohesion: 0.07
Nodes (44): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, derivativeOperator(), describe() (+36 more)

### Community 26 - "ink.ts"
Cohesion: 0.15
Nodes (17): Prefs, BOARD_PALETTES, BoardPalette, highlightName(), inkName(), mid(), outlineSvg(), PEN_SIZE (+9 more)

### Community 27 - "supabase.ts"
Cohesion: 0.06
Nodes (53): @supabase/supabase-js, captchaToken(), loadTurnstile(), Turnstile, TURNSTILE_SCRIPT, Window, TURNSTILE_SITE_KEY, accountError (+45 more)

### Community 28 - "editor/editor.ts"
Cohesion: 0.05
Nodes (49): description, name, private, type, version, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/lang-markdown (+41 more)

### Community 29 - "several.ts"
Cohesion: 0.10
Nodes (47): Piece, Condition, Family, Group, Root, Shape, at(), bounded() (+39 more)

### Community 30 - "gantt.ts"
Cohesion: 0.05
Nodes (80): amount(), barColor(), crossings(), dateText(), dayMonth(), dayOf(), fitText(), GanttOptions (+72 more)

### Community 31 - "study.ts"
Cohesion: 0.14
Nodes (36): Asymptote, asymptoteText(), compiled(), cutsOf(), defined(), domainOf(), exact(), extremumText() (+28 more)

### Community 32 - "view3d.ts"
Cohesion: 0.12
Nodes (29): Box, Face, planeTolerance(), Plane, Vec3, escapeXml(), arrowHead(), boxShape() (+21 more)

### Community 33 - "assistant.ts"
Cohesion: 0.09
Nodes (32): AiAnswer, AiError, AiResult, AiSettings, answerSchema(), askAi(), askCompatible(), askThroughHost() (+24 more)

### Community 34 - "logic.ts"
Cohesion: 0.11
Nodes (30): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+22 more)

### Community 35 - "usesDecimalComma"
Cohesion: 0.18
Nodes (19): isTestLine(), number(), T, testItems(), figureText(), classes(), dataOf(), distributionExtent() (+11 more)

### Community 36 - "complex.ts"
Cohesion: 0.05
Nodes (74): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexValue(), isInequality() (+66 more)

### Community 37 - "namesIn"
Cohesion: 0.13
Nodes (38): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+30 more)

### Community 38 - "translations.test.ts"
Cohesion: 0.17
Nodes (18): AstNode, calleeName(), check(), checkPair(), visit(), children(), entryPairs(), files (+10 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (24): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+16 more)

### Community 40 - "graph/space.ts"
Cohesion: 0.10
Nodes (57): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+49 more)

### Community 41 - ".constructor"
Cohesion: 0.15
Nodes (3): loadPrefs(), appleTouch(), UA

### Community 42 - "ui/settings.ts"
Cohesion: 0.05
Nodes (70): Explanation, REPLY_TOKENS, chat(), GlifoError, Gpu, load(), post(), remove() (+62 more)

### Community 43 - "schemaEn.test.ts"
Cohesion: 0.07
Nodes (42): @electric-sql/pglite, schemaSummary(), svg(), openSchemaEditor(), base64(), hide(), OPEN, schemasForFile() (+34 more)

### Community 44 - "functions.ts"
Cohesion: 0.08
Nodes (64): EMPTY, number(), T, addFormat(), divFormat(), GENERAL, mulFormat(), tidy() (+56 more)

### Community 45 - "MathError"
Cohesion: 0.10
Nodes (66): MathError, angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, dataOf() (+58 more)

### Community 46 - "i18n.ts"
Cohesion: 0.08
Nodes (36): browserLang(), browserLanguages(), dateLocale(), detectLang(), Entry, isLang(), LANGUAGES, numberLocale() (+28 more)

### Community 47 - "probability.ts"
Cohesion: 0.14
Nodes (23): End, Family, ExactScope, fractionNear(), ALL, complement(), endAt(), EventContext (+15 more)

### Community 48 - "conics.ts"
Cohesion: 0.17
Nodes (31): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+23 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (36): DrawAction, adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners() (+28 more)

### Community 50 - "NotesStore"
Cohesion: 0.10
Nodes (10): adoptGuestNotes(), guestNoteCount(), DeletionLog, newId(), createdAtFromId(), deriveTitle(), NotesStore, readItem() (+2 more)

### Community 51 - "sidePanel.ts"
Cohesion: 0.08
Nodes (32): AI_SERVICES, aiSettingsOf(), T, templateInsertion(), preferredIndex(), SuggestionItem, Text, localizeTex() (+24 more)

### Community 52 - "linsys.ts"
Cohesion: 0.06
Nodes (93): formatRational(), eigenvalues(), FLOAT, LinearScope, polynomialIn(), rref(), splitRoot(), surdText() (+85 more)

### Community 53 - "graph.ts"
Cohesion: 0.09
Nodes (33): @maxgraph/core, AT_X, cellHtml(), cellText(), COMPASS, createEdgeCell(), createGraph(), drawSchema() (+25 more)

### Community 54 - "FoldersStore"
Cohesion: 0.10
Nodes (14): Deletion, cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder(), loadClosedFolders() (+6 more)

### Community 55 - "page.ts"
Cohesion: 0.07
Nodes (45): katex, accountDataFile(), PullResult, board, openShareDialog(), changeAccess(), changeCopy(), copy() (+37 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "editor/lists.ts"
Cohesion: 0.11
Nodes (50): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+42 more)

### Community 58 - "database.ts"
Cohesion: 0.23
Nodes (6): createDatabase(), createUser(), databaseTests(), feedbackTests(), migrations, shareTests()

### Community 59 - "finite.ts"
Cohesion: 0.17
Nodes (28): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+20 more)

### Community 60 - "ui/preview.ts"
Cohesion: 0.09
Nodes (19): GraphLabels, BlockKind, hydrateSheets(), T, BLOCK_NAMES, blockHiddenMessage(), blockKindOf(), blockMovedMessage() (+11 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "Welcome to Glifo"
Cohesion: 0.20
Nodes (9): A few examples, Calculations and graphs, For programming too, Handy shortcuts, How to write formulas, Lists, Spell check, Try it now (+1 more)

### Community 63 - "spreadsheet/editor.ts"
Cohesion: 0.07
Nodes (57): KINDS, sheetSummary(), T, tablesNote(), ChartTable, currentCall(), Editing, MenuEntry (+49 more)

### Community 64 - "spreadsheetEn.test.ts"
Cohesion: 0.08
Nodes (55): formulaText(), readSheet(), tableTopic(), valueText(), evaluateSheet(), SheetEvaluator, hide(), OPEN (+47 more)

### Community 65 - "odesolve.ts"
Cohesion: 0.08
Nodes (69): addWave(), arrange(), cauchy(), characteristicRoots(), compiled(), constantNames(), constantParticular(), constantRoots() (+61 more)

### Community 66 - "toolbar.ts"
Cohesion: 0.16
Nodes (17): insertBlock(), wrapSelection(), ListStyleId, Action, createToolbar(), insertCode(), insertLink(), listMenu() (+9 more)

### Community 67 - "laplace.ts"
Cohesion: 0.11
Nodes (46): factoredPolynomial(), absOf(), boundsOf(), close(), definite(), fourierProblem, fourierShown(), isTrig() (+38 more)

### Community 68 - "aiPanel.ts"
Cohesion: 0.12
Nodes (24): valueNode(), NoteSubject, labelHtml(), texHtml(), checkHtml(), checkTitle(), T, cache (+16 more)

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
Cohesion: 0.10
Nodes (32): names(), STUDY_GRAPH, studyItems(), T, ACCENT_COMMANDS, diffLatex(), DISTRIBUTION_LATEX, distributionLatex() (+24 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (64): linearIn(), linearParts(), valueAt(), primitive(), verified(), atValues(), Converter, coordinates() (+56 more)

### Community 75 - "Field"
Cohesion: 0.12
Nodes (3): Field, formatPolynomial(), interpolate()

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Errore o imprevisto → nel dettaglio, 3. Serve una decisione → frasi complete, 4. Fine del compito → un solo riepilogo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "SuggestionController"
Cohesion: 0.26
Nodes (3): EditorMathContext, expand(), SuggestionController

### Community 79 - "Settings"
Cohesion: 0.10
Nodes (14): ExplainTone, Settings, AI_NEWS_TITLE, AI_WORKING_TITLE, aiActivity, AiWork, T, AiPanelDeps (+6 more)

### Community 82 - "Il database degli account (Supabase)"
Cohesion: 0.22
Nodes (8): Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Note condivise con un link, Sincronizzazione, `sync_pull({ since })`: scarica le novità

### Community 83 - "tutorial.mjs"
Cohesion: 0.11
Nodes (11): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+3 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.13
Nodes (15): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+7 more)

### Community 91 - "topics.ts"
Cohesion: 0.11
Nodes (28): EXPLAIN_TONES, ATTRIBUTES, cut(), definedName(), ER_SHAPES, fieldText(), fitLines(), flowOrder() (+20 more)

### Community 92 - "BoardStore"
Cohesion: 0.08
Nodes (16): BoardStore, MemoryBoards, applyAccountChange(), backup(), signOutAccount(), BackupNote, backupNotes(), restoreBackup() (+8 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.11
Nodes (10): device(), login(), newContext, waitFor(), b64(), CAPTCHA_TOKEN, CODE, GOOGLE_CODE (+2 more)

### Community 97 - "files.ts"
Cohesion: 0.17
Nodes (18): hostDownloads, inClaudeViewer(), canWriteFilesDirectly(), downloadBlob(), downloadText(), fileNameFor(), FsWindow, isAbort() (+10 more)

### Community 98 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 100 - "noteWordsMath.test.ts"
Cohesion: 0.12
Nodes (15): AstNode, childrenOf(), DATA, ENGLISH, englishTexts(), FUNCTIONS, isNode(), ITALIAN (+7 more)

### Community 101 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 102 - "symbolsEn.test.ts"
Cohesion: 0.12
Nodes (36): editDistance(), normalizeText(), singular(), stem(), STOPWORDS, words(), BOTH, buildIndex() (+28 more)

### Community 103 - "siteUpdate.ts"
Cohesion: 0.18
Nodes (14): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, PartNotLoaded (+6 more)

### Community 104 - "graph/file.ts"
Cohesion: 0.11
Nodes (33): figureName(), graphFigure(), graphImage(), graphsForFile(), graphsFromFile(), hide(), OPEN, swatchSvg() (+25 more)

### Community 105 - "calcResults.ts"
Cohesion: 0.11
Nodes (34): @codemirror/language, explainTarget, formulaNames(), acceptCalcResult(), CalcCheck, calcOutcomes(), CalcResult, calcResults() (+26 more)

### Community 106 - "ExplainPanel"
Cohesion: 0.17
Nodes (3): ExplainChat, ExplainPanel, preventFocusSteal()

### Community 107 - "spellcheck.ts"
Cohesion: 0.07
Nodes (25): misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt(), openAt() (+17 more)

### Community 108 - "schemaTools.test.ts"
Cohesion: 0.13
Nodes (21): alignBoxes(), Alignment, Box, distributeBoxes(), Position, crc32(), svgSize(), svgToPng() (+13 more)

### Community 113 - ".paintVertexShape"
Cohesion: 0.12
Nodes (6): DotShape, IdentifyingRelationShape, LanesShape, NoteShape, TableShape, WeakEntityShape

### Community 116 - "MarkdownEditor"
Cohesion: 0.13
Nodes (7): closeMathBlockOnEnter(), EditorCallbacks, MarkdownEditor, searchPhrases(), tabOutOfMath(), insertTemplate(), setup()

### Community 117 - "schema/templates.ts"
Cohesion: 0.21
Nodes (18): DEFAULT_EDGE, SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), conceptMap(), cycle(), edge() (+10 more)

### Community 118 - "tools.ts"
Cohesion: 0.10
Nodes (15): ExplainEvents, ExplainStep, ALL_TOOLS, callOf(), checkTool, FormulaCheck, Identities, looseJson() (+7 more)

### Community 119 - "src/relocation.ts"
Cohesion: 0.07
Nodes (67): accountSpace(), currentAccount(), forgetAccount(), isWelcome(), knowsAccount(), prefixOf(), prefsKey(), restorePrefs() (+59 more)

### Community 120 - "ui/relocation.ts"
Cohesion: 0.10
Nodes (24): sidebarToggle(), relocationMessage(), RelocationResult, comments, faq, settings, T, BOX (+16 more)

### Community 121 - "spreadsheet/format.ts"
Cohesion: 0.12
Nodes (20): decimalsOf(), ENGLISH, fixedNumber(), generalNumber(), group(), MAX_DECIMALS, most(), numberFrom() (+12 more)

### Community 122 - "editor.test.ts"
Cohesion: 0.07
Nodes (32): @lezer/common, InsertOptions, toggleLinePrefix(), CODE_NODES, CommandToken, commandTokenAt(), isInCode(), MATH_NODES (+24 more)

### Community 123 - "board.ts"
Cohesion: 0.06
Nodes (62): Action, coalesced(), DOT_SIZES, EraserMode, Finger, HANDLE_REACH, ICON, LassoAction (+54 more)

### Community 124 - "sheet.ts"
Cohesion: 0.05
Nodes (63): FieldContext, numericPartials(), ExactComplexScope, Ode, OdeFunction, expSumValue(), withWorkLimit(), ExactFunction (+55 more)

### Community 125 - "vite"
Cohesion: 0.33
Nodes (4): vite, minutes, postMessage(), started

### Community 128 - "noteWords.ts"
Cohesion: 0.06
Nodes (36): BlockWidget, findWidgetBlocks(), guardBlocks(), schemaBlocks(), WidgetBlock, placeChart(), BLOCKS, blockWord() (+28 more)

### Community 129 - "Dove sono le cose"
Cohesion: 0.09
Nodes (59): Dove sono le cose, Glifo – architettura, allNames(), answerFollowUp(), bareResult(), chained(), chatContext, chatSubject() (+51 more)

### Community 132 - "aiPanel.test.ts"
Cohesion: 0.12
Nodes (13): 1. A cosa serve l'AI dei modelli di frontiera, ChatFn, Conversation, ChatMessage, SheetFactory, fakeModel(), FLOW, GRAPH_FIXED (+5 more)

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 139 - "calcPlugin"
Cohesion: 0.21
Nodes (3): calcPlugin, CheckWidget, ResultWidget

### Community 140 - "Glifo"
Cohesion: 0.12
Nodes (16): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Domande frequenti e commenti (+8 more)

### Community 141 - "xlsx.ts"
Cohesion: 0.09
Nodes (42): RFC-4180, fflate, csvCell(), csvDelimiter(), csvNumbers(), csvToSheet(), digitsOf(), field() (+34 more)

### Community 143 - "feedback.ts"
Cohesion: 0.10
Nodes (38): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, Site, commentDate(), commentItem(), COMMENTS_MAX, CommentsDeps (+30 more)

### Community 144 - "smoke-test.mjs"
Cohesion: 0.15
Nodes (6): markdown-it, playwright-core, PNG_ICONS, fakeLlmWorker(), firstVisit(), plainContext

### Community 146 - "settingsSections.test.ts"
Cohesion: 0.16
Nodes (8): License, licenseOf(), LICENSES, T, SettingsSection, texts, open(), removeModel

### Community 154 - "L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota"
Cohesion: 0.25
Nodes (8): 2. Dalla lavagna alla nota, 3. Da una foto alla nota, 4. Dettare: la voce diventa testo nella nota, 5. Registrare le lezioni e trascriverle, Da sistemare con il primo punto che tocca l'AI, Fonti (controllate il 14 ottobre 2026), In che ordine, L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota

### Community 156 - "Glifo – note per Claude"
Cohesion: 0.25
Nodes (8): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Regole, sqlite()

### Community 157 - "render/lists.ts"
Cohesion: 0.27
Nodes (13): ListStyle, bulletGroup(), Marker, sameList(), alignInside(), asciiTrim(), findMarker(), Found (+5 more)

### Community 158 - "picture.ts"
Cohesion: 0.21
Nodes (10): staticGraphSvg(), containing(), chooseBox(), GraphSpec, DrawOptions, DEFAULT_CAMERA, Quality, sceneSvg() (+2 more)

### Community 159 - "schema/preview.ts"
Cohesion: 0.22
Nodes (12): Look, SchemaError, Theme, draw(), drawCached(), drawn, errorHtml(), fill() (+4 more)

### Community 160 - "LlamaWorker"
Cohesion: 0.21
Nodes (7): Promemoria per lo studente, Commenti di chi prova Glifo, constructor(), LlamaWorker, Commenti di chi prova Glifo, page(), site()

### Community 161 - "site.ts"
Cohesion: 0.20
Nodes (7): @mlc-ai/web-llm, vite-plugin-pwa, accountOffMessage(), T, defineFor(), MAIN_BRANCH, webllmModels

### Community 162 - "Schema"
Cohesion: 0.29
Nodes (4): loadDialect(), SchemaEditorOptions, Schema, serializeSchema()

### Community 163 - "In programma"
Cohesion: 0.25
Nodes (8): Account: i propri appunti su ogni dispositivo, anche da condividere, Idee per il futuro, In programma, L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota (14 ottobre 2026, se ne parla), La lavagna: idee in più, Più avanti, Schemi: idee in più, Trasloco: il sito su Cloudflare, con un dominio tutto di Glifo

### Community 166 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

### Community 167 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 168 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 169 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 170 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 171 - "select"
Cohesion: 0.50
Nodes (3): onPhone(), select(), Section

### Community 179 - "I modelli e le chiavi API"
Cohesion: 0.33
Nodes (6): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), In prova sul ramo `prova` (7 ottobre 2026): Qwen3 nel browser per «Spiegami», La chiave, il server locale e la scelta del modello (14 ottobre 2026), Le idee dello studente (5 ottobre 2026)

## Knowledge Gaps
- **874 isolated node(s):** `Condividere una nota con un link`, `Domande frequenti e commenti`, `Provarlo sul tuo computer`, `Assistente AI`, `Spiegami (in prova)` (+869 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1196 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **42 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `noteWords.ts`, `vitest`, `main.ts`, `compile`, `h`, `spec.ts`, `noteWordsGraph.test.ts`, `num`, `Board`, `markdown.ts`, `graph/preview.ts`, `distributions.ts`, `svg.ts`, `formatNumber`, `SchemaEditor`, `xlsx.ts`, `smoke-test.mjs`, `Pt`, `Rational`, `arithmetic.ts`, `SheetEditor`, `plan.ts`, `schema/editor.ts`, `chart.ts`, `feedback.ts`, `parse.ts`, `ink.ts`, `supabase.ts`, `aiPanel.test.ts`, `several.ts`, `gantt.ts`, `picture.ts`, `study.ts`, `assistant.ts`, `logic.ts`, `usesDecimalComma`, `complex.ts`, `namesIn`, `site.ts`, `graph/space.ts`, `ui/settings.ts`, `functions.ts`, `MathError`, `i18n.ts`, `conics.ts`, `board/shapes.ts`, `NotesStore`, `sidePanel.ts`, `linsys.ts`, `finite.ts`, `ui/preview.ts`, `spreadsheet/editor.ts`, `spreadsheetEn.test.ts`, `odesolve.ts`, `toolbar.ts`, `laplace.ts`, `aiPanel.ts`, `toLatex`, `symbolic.ts`, `Settings`, `tutorial.mjs`, `topics.ts`, `BoardStore`, `files.ts`, `siteUpdate.ts`, `graph/file.ts`, `calcResults.ts`, `ExplainPanel`, `schemaTools.test.ts`, `.paintVertexShape`, `MarkdownEditor`, `src/relocation.ts`, `ui/relocation.ts`, `board.ts`, `sheet.ts`?**
  _High betweenness centrality (0.122) - this node is a cross-community bridge._
- **Why does `texts` connect `h` to `Dove sono le cose`, `main.ts`, `compile`, `spec.ts`, `noteWordsGraph.test.ts`, `graph/preview.ts`, `distributions.ts`, `formatNumber`, `svg.ts`, `statsShown.ts`, `xlsx.ts`, `plan.ts`, `feedback.ts`, `Rational`, `arithmetic.ts`, `index.ts`, `settingsSections.test.ts`, `schema/editor.ts`, `chart.ts`, `parse.ts`, `ink.ts`, `supabase.ts`, `editor/editor.ts`, `several.ts`, `gantt.ts`, `study.ts`, `schema/preview.ts`, `assistant.ts`, `logic.ts`, `usesDecimalComma`, `complex.ts`, `namesIn`, `site.ts`, `resize.ts`, `ui/settings.ts`, `schemaEn.test.ts`, `functions.ts`, `MathError`, `i18n.ts`, `probability.ts`, `conics.ts`, `sidePanel.ts`, `linsys.ts`, `page.ts`, `editor/lists.ts`, `finite.ts`, `ui/preview.ts`, `spreadsheet/editor.ts`, `spreadsheetEn.test.ts`, `odesolve.ts`, `toolbar.ts`, `laplace.ts`, `aiPanel.ts`, `toLatex`, `symbolic.ts`, `Settings`, `topics.ts`, `BoardStore`, `files.ts`, `siteUpdate.ts`, `graph/file.ts`, `calcResults.ts`, `spellcheck.ts`, `schemaTools.test.ts`, `schema/templates.ts`, `tools.ts`, `src/relocation.ts`, `ui/relocation.ts`, `spreadsheet/format.ts`, `board.ts`, `sheet.ts`?**
  _High betweenness centrality (0.117) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `h`, `Dove sono le cose`, `noteWords.ts`, `compile`, `aiPanel.test.ts`, `noteWordsGraph.test.ts`, `num`, `markdown.ts`, `distributions.ts`, `svg.ts`, `statsShown.ts`, `xlsx.ts`, `feedback.ts`, `plan.ts`, `settingsSections.test.ts`, `chart.ts`, `store.ts`, `parse.ts`, `ink.ts`, `supabase.ts`, `editor/editor.ts`, `gantt.ts`, `picture.ts`, `assistant.ts`, `site.ts`, `translations.test.ts`, `resize.ts`, `graph/space.ts`, `.constructor`, `ui/settings.ts`, `schemaEn.test.ts`, `MathError`, `i18n.ts`, `board/shapes.ts`, `NotesStore`, `sidePanel.ts`, `FoldersStore`, `page.ts`, `editor/lists.ts`, `database.ts`, `spreadsheet/editor.ts`, `spreadsheetEn.test.ts`, `Settings`, `topics.ts`, `BoardStore`, `noteWordsMath.test.ts`, `symbolsEn.test.ts`, `siteUpdate.ts`, `spellcheck.ts`, `schemaTools.test.ts`, `MarkdownEditor`, `src/relocation.ts`, `ui/relocation.ts`, `editor.test.ts`, `board.ts`, `sheet.ts`?**
  _High betweenness centrality (0.067) - this node is a cross-community bridge._
- **Are the 330 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `tutorialModel()`) actually correct?**
  _`Dove sono le cose` has 330 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Condividere una nota con un link`, `Domande frequenti e commenti`, `Provarlo sul tuo computer` to the rest of the system?**
  _874 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `h` be split into smaller, more focused modules?**
  _Cohesion score 0.04567095750308588 - nodes in this community are weakly interconnected._
- **Should `vitest` be split into smaller, more focused modules?**
  _Cohesion score 0.059932659932659935 - nodes in this community are weakly interconnected._