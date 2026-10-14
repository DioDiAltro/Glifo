# Graph Report - Glifo  (2026-10-14)

## Corpus Check
- 346 files · ~721,801 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5558 nodes · 20328 edges · 172 communities (133 shown, 39 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 682 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `5e55cce0`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- i18n.ts
- NotesStore
- main.ts
- compile
- sync.ts
- spec.ts
- parse.ts
- num
- graph/preview.ts
- aiPanel.test.ts
- distributions.ts
- ExplainPanel
- svg.ts
- linsys.ts
- SchemaEditor
- package.json
- SheetEditor
- escapeHtml
- MathError
- arithmetic.ts
- index.ts
- engine.ts
- schema/editor.ts
- noteWordsMath.test.ts
- BoardStore
- Parser
- store.ts
- fourier.ts
- smoke-test.mjs
- several.ts
- gantt.ts
- study.ts
- .openMenu
- assistant.ts
- logic.ts
- h
- complex.ts
- namesIn
- translations.test.ts
- resize.ts
- view3d.ts
- .renderFormat
- localModels.ts
- schema/preview.ts
- functions.ts
- linear.ts
- spreadsheet/format.ts
- laplace.ts
- template.ts
- board/shapes.ts
- toolbar.ts
- SidePanel
- localLlm
- sheet.ts
- markdown.ts
- supabase.ts
- 20261004091555_note_condivise.sql
- schema/blocks.ts
- database.ts
- mathEn2.test.ts
- calcResults.ts
- dependencies
- Welcome to Glifo
- spreadsheet/editor.ts
- Rational
- odesolve.ts
- statsShown.ts
- schemaEn.test.ts
- blockMove.ts
- Benvenuto in Glifo
- compilerOptions
- FoldersStore
- Costi
- toLatex
- symbolic.ts
- schemaBlocks.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- plan.ts
- sidePanel.ts
- session-start.sh
- .claude/CLAUDE.md
- Il database degli account (Supabase)
- tutorial.mjs
- Abbonamenti
- topics.ts
- restore.ts
- supabase-stub.sql
- account-test.mjs
- Dove sono le cose
- .folderItem
- scopeWith
- tools.ts
- symbolsEn.test.ts
- siteUpdate.ts
- graph/file.ts
- explainPanel.ts
- editor/editor.ts
- graphNote.test.ts
- editor/lists.ts
- graph.ts
- Field
- schema/templates.ts
- exact.ts
- src/relocation.ts
- Glifo
- captcha.ts
- calcPlugin
- board.ts
- Sheet
- page.ts
- downloadText
- explain.ts
- spellcheck
- formula.ts
- Board
- 20261008130026_commenti.sql
- Stroke
- MarkdownEditor
- xlsx.ts
- render/lists.ts
- feedback.ts
- SuggestionController
- AiPanel
- L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota
- Glifo – note per Claude
- files.ts
- vite
- severalGraph.ts
- placeholders.ts
- In programma
- vitest
- ui/relocation.ts
- Piano per piano
- tutorial.ts
- usesDecimalComma
- suggest.ts
- I modelli e le chiavi API
- MLCEngine

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 323 edges
2. `MathError` - 151 edges
3. `Sheet` - 147 edges
4. `num()` - 145 edges
5. `h()` - 136 edges
6. `MathNode` - 131 edges
7. `texts` - 125 edges
8. `mul()` - 124 edges
9. `Board` - 117 edges
10. `compile()` - 116 edges

## Surprising Connections (you probably didn't know these)
- `Dove sono le cose` --references--> `fakeLlmWorker()`  [INFERRED]
  ARCHITETTURA.md → scripts/smoke-test.mjs
- `Dove sono le cose` --references--> `tutorialModel()`  [INFERRED]
  ARCHITETTURA.md → scripts/tutorial.mjs
- `Dove sono le cose` --references--> `WidgetKind`  [INFERRED]
  ARCHITETTURA.md → src/editor/schemaBlocks.ts
- `Attenzione a` --references--> `renderMarkdown()`  [INFERRED]
  CLAUDE.md → src/render/markdown.ts
- `Funzionalità` --references--> `k()`  [INFERRED]
  README.md → src/math/numerical.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (172 total, 39 thin omitted)

### Community 0 - "i18n.ts"
Cohesion: 0.05
Nodes (58): DEFAULT_LOCAL_MODEL, gpuF16(), browserLang(), browserLanguages(), dateLocale(), detectLang(), Entry, isLang() (+50 more)

### Community 1 - "NotesStore"
Cohesion: 0.07
Nodes (25): Deletion, DeletionLog, isUuid(), newId(), createdAtFromId(), deriveTitle(), NotesStore, RemoteNote (+17 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (113): remapGraphLines(), account, ACCOUNT_OFF, accountButton, accountProblem(), active, aiShown(), aiToggle (+105 more)

### Community 3 - "compile"
Cohesion: 0.07
Nodes (53): argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot(), fieldOn(), outward() (+45 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (32): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+24 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (103): conicItems(), isConicLine(), quadricEquation(), T, constantIntegrand(), depth(), inequalityMargin(), integralRegion (+95 more)

### Community 6 - "parse.ts"
Cohesion: 0.04
Nodes (68): hasWord(), errorMessage(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES (+60 more)

### Community 7 - "num"
Cohesion: 0.12
Nodes (89): atIntegers(), hyperbolicToExp(), polyEx(), bernoulliFamily(), mobius(), shapeValue(), similarSolution(), squareRoot() (+81 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (48): addLabel(), boxes, cameras, complexCoord(), containing(), coord(), coordinates(), drawings (+40 more)

### Community 9 - "aiPanel.test.ts"
Cohesion: 0.16
Nodes (13): definedName(), formulaTopic(), graphTopic(), numberText(), studyOf(), theoremTopic(), topicOf(), FLOW (+5 more)

### Community 10 - "distributions.ts"
Cohesion: 0.06
Nodes (65): addExp(), choose(), continuousQuantile(), decimals(), discreteQuantile(), exactIntervalProbability(), factorialBig(), FAMILIES (+57 more)

### Community 11 - "ExplainPanel"
Cohesion: 0.16
Nodes (4): ExplainChat, ExplainPanel, preventFocusSteal(), formulasSummary()

### Community 12 - "svg.ts"
Cohesion: 0.08
Nodes (60): labelSvg(), contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), dataWindow() (+52 more)

### Community 13 - "linsys.ts"
Cohesion: 0.07
Nodes (79): decimalSeparator(), Digits, formatNumber(), FormatOptions, formatRational(), fromNumber(), fromRational(), SUPERSCRIPT (+71 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.11
Nodes (4): isLanes(), SchemaEditor, withLaneContents(), serializeSchema()

### Community 15 - "package.json"
Cohesion: 0.05
Nodes (38): description, devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript (+30 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (5): functionLabel(), SheetEditor, englishTyping(), CellRange, cloneSheet()

### Community 17 - "escapeHtml"
Cohesion: 0.11
Nodes (23): katex, labelHtml(), ganttWidth(), PlanView, GraphLook, texHtml(), Palette, checkHtml() (+15 more)

### Community 18 - "MathError"
Cohesion: 0.12
Nodes (49): MathError, bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial() (+41 more)

### Community 19 - "arithmetic.ts"
Cohesion: 0.10
Nodes (48): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+40 more)

### Community 20 - "index.ts"
Cohesion: 0.06
Nodes (45): b, bigops, c, calculus, fn, fr, fractions, functions (+37 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "schema/editor.ts"
Cohesion: 0.06
Nodes (59): laneOf(), alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ALIGN_NAMES (+51 more)

### Community 23 - "noteWordsMath.test.ts"
Cohesion: 0.12
Nodes (15): AstNode, childrenOf(), DATA, ENGLISH, englishTexts(), FUNCTIONS, isNode(), ITALIAN (+7 more)

### Community 24 - "BoardStore"
Cohesion: 0.05
Nodes (16): BoardOptions, BoardBackend, BoardStore, done(), fromRecord(), IdbBoards, MemoryBoards, ofNote() (+8 more)

### Community 26 - "store.ts"
Cohesion: 0.13
Nodes (21): Prefs, BOARD_PALETTES, BoardPalette, BoardTheme, highlightName(), inkName(), mid(), outlineSvg() (+13 more)

### Community 27 - "fourier.ts"
Cohesion: 0.16
Nodes (28): absOf(), boundsOf(), close(), definite(), fourierProblem, fourierShown(), isTrig(), isZero() (+20 more)

### Community 28 - "smoke-test.mjs"
Cohesion: 0.25
Nodes (4): markdown-it, fakeLlmWorker(), firstVisit(), plainContext

### Community 29 - "several.ts"
Cohesion: 0.07
Nodes (59): EMPTY_SCOPE, Piece, Condition, Family, Group, Root, Shape, fractionNear() (+51 more)

### Community 30 - "gantt.ts"
Cohesion: 0.07
Nodes (71): amount(), barColor(), crossings(), dateText(), dayMonth(), dayOf(), fitText(), GanttOptions (+63 more)

### Community 31 - "study.ts"
Cohesion: 0.14
Nodes (37): breaks(), periodOf(), Asymptote, asymptoteText(), compiled(), cutsOf(), defined(), domainOf() (+29 more)

### Community 33 - "assistant.ts"
Cohesion: 0.13
Nodes (25): AiAnswer, AiError, AiSettings, answerSchema(), askAi(), askCompatible(), askThroughHost(), capitalized() (+17 more)

### Community 34 - "logic.ts"
Cohesion: 0.11
Nodes (30): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+22 more)

### Community 35 - "h"
Cohesion: 0.06
Nodes (54): SyncStatus, T, rich(), texts, openSignedOut(), printButton(), ShareDialogDeps, T (+46 more)

### Community 36 - "complex.ts"
Cohesion: 0.05
Nodes (82): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexLine(), isComplexValue() (+74 more)

### Community 37 - "namesIn"
Cohesion: 0.12
Nodes (39): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+31 more)

### Community 38 - "translations.test.ts"
Cohesion: 0.17
Nodes (18): AstNode, calleeName(), check(), checkPair(), visit(), children(), entryPairs(), files (+10 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (24): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+16 more)

### Community 40 - "view3d.ts"
Cohesion: 0.07
Nodes (80): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+72 more)

### Community 41 - ".renderFormat"
Cohesion: 0.14
Nodes (16): fieldInput(), textWidth(), createEdgeCell(), edgeLook(), edgeStyle(), edgeTextAt(), isEdgeLook(), isNodeLook() (+8 more)

### Community 42 - "localModels.ts"
Cohesion: 0.08
Nodes (43): @mlc-ai/web-llm, chat(), GlifoError, Gpu, load(), post(), remove(), scope (+35 more)

### Community 43 - "schema/preview.ts"
Cohesion: 0.24
Nodes (11): Look, Theme, draw(), drawCached(), drawn, errorHtml(), fill(), hydrateSchemas() (+3 more)

### Community 44 - "functions.ts"
Cohesion: 0.08
Nodes (63): EMPTY, evaluateSheet(), number(), T, addFormat(), divFormat(), GENERAL, mulFormat() (+55 more)

### Community 45 - "linear.ts"
Cohesion: 0.09
Nodes (62): angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, dataOf(), determinant() (+54 more)

### Community 46 - "spreadsheet/format.ts"
Cohesion: 0.13
Nodes (24): decimalsOf(), ENGLISH, englishNumber(), fixedNumber(), formatNumber(), generalNumber(), group(), italianNumber() (+16 more)

### Community 47 - "laplace.ts"
Cohesion: 0.11
Nodes (47): factoredPolynomial(), oneFraction(), beyondPoles(), compiled(), E, fractionShown(), HALF, inverseLaplaceShown() (+39 more)

### Community 48 - "template.ts"
Cohesion: 0.33
Nodes (7): cardPreviewTex(), formPreviewTex(), ParsedTemplate, parseTemplate(), PLACEHOLDER_TEX, placeholderPreview(), templateText()

### Community 49 - "board/shapes.ts"
Cohesion: 0.14
Nodes (34): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+26 more)

### Community 50 - "toolbar.ts"
Cohesion: 0.19
Nodes (14): insertBlock(), Action, createToolbar(), insertCode(), insertLink(), listStyle(), MenuItem, T (+6 more)

### Community 51 - "SidePanel"
Cohesion: 0.16
Nodes (9): localizeTex(), cleanKatexError(), isConfidentAnswer(), SymbolForm, cardPreview(), displayCode(), formPreview(), preventFocusSteal() (+1 more)

### Community 52 - "localLlm"
Cohesion: 0.19
Nodes (7): glifoError(), localErrorMessage(), localLlm, Pending, fakeModel(), setup(), fakeModel()

### Community 53 - "sheet.ts"
Cohesion: 0.05
Nodes (37): CalcCheck, numericPartials(), complex, OdeFunction, expSumValue(), chiSquareTest(), InferenceContext, Eigenvalue (+29 more)

### Community 54 - "markdown.ts"
Cohesion: 0.07
Nodes (55): setGraphLabels(), monthOf(), MONTHS, MONTHS_EN, parseDate(), planBlock, PlanKind, planRange() (+47 more)

### Community 55 - "supabase.ts"
Cohesion: 0.12
Nodes (29): @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken(), ensureSessionOf() (+21 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "schema/blocks.ts"
Cohesion: 0.10
Nodes (34): insertGraphBlock(), graphsForFile(), graphsFromFile(), graphBlockText(), insertGraph(), markdownForFile(), openSchema(), openSheet() (+26 more)

### Community 58 - "database.ts"
Cohesion: 0.23
Nodes (6): createDatabase(), createUser(), databaseTests(), feedbackTests(), migrations, shareTests()

### Community 59 - "mathEn2.test.ts"
Cohesion: 0.13
Nodes (33): EMPTY_COMPLEX_SCOPE, countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots() (+25 more)

### Community 60 - "calcResults.ts"
Cohesion: 0.08
Nodes (35): @codemirror/language, @codemirror/state, @codemirror/view, @lezer/common, calcOutcomes(), CalcResult, calcResults(), sheetBefore() (+27 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "Welcome to Glifo"
Cohesion: 0.20
Nodes (9): A few examples, Calculations and graphs, For programming too, Handy shortcuts, How to write formulas, Lists, Spell check, Try it now (+1 more)

### Community 63 - "spreadsheet/editor.ts"
Cohesion: 0.07
Nodes (63): graphKeyLine(), chartFrom(), chartLines(), chartRange(), ChartTable, currentRegion(), isNumber(), Results (+55 more)

### Community 64 - "Rational"
Cohesion: 0.12
Nodes (33): Part, at(), centralCanonical(), Coefficients, coneCanonical(), conicOf(), det2(), det3() (+25 more)

### Community 65 - "odesolve.ts"
Cohesion: 0.08
Nodes (72): sqrtEx(), exText(), addWave(), arrange(), cauchy(), characteristicRoots(), compiled(), constantNames() (+64 more)

### Community 66 - "statsShown.ts"
Cohesion: 0.15
Nodes (34): check(), correlation(), count(), covariance(), Data, DATA_FUNCTIONS, dataStatistic(), deviation() (+26 more)

### Community 67 - "schemaEn.test.ts"
Cohesion: 0.06
Nodes (45): @electric-sql/pglite, readSchema(), schemaSummary(), svg(), openSchemaEditor(), SchemaEditorOptions, hide(), OPEN (+37 more)

### Community 68 - "blockMove.ts"
Cohesion: 0.05
Nodes (49): @codemirror/commands, blockMoved, blockMoves(), blockMoveTransaction(), LineMap, GraphLabels, blank(), BlockKind (+41 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "FoldersStore"
Cohesion: 0.11
Nodes (14): cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder(), loadClosedFolders(), RemoteFolder (+6 more)

### Community 72 - "Costi"
Cohesion: 0.22
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 73 - "toLatex"
Cohesion: 0.08
Nodes (38): fourierItems(), isFourierLine(), T, names(), STUDY_GRAPH, studyItems(), T, partialSum() (+30 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.06
Nodes (68): freeLetters(), linearParts(), satisfies(), primitive(), verified(), linearCells(), pairUp(), atValues() (+60 more)

### Community 75 - "schemaBlocks.ts"
Cohesion: 0.10
Nodes (20): toggleLinePrefix(), LIST_STYLES, besideSchema(), BlockWidget, findWidgetBlocks(), guardBlocks(), KINDS, schemaBlockRanges() (+12 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Errore o imprevisto → nel dettaglio, 3. Serve una decisione → frasi complete, 4. Fine del compito → un solo riepilogo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "plan.ts"
Cohesion: 0.18
Nodes (15): ITALIAN, NumberStyle, columnRole(), columnsOf(), durationUnit(), isNumber(), isPlanRange(), MAX_ACTIVITIES (+7 more)

### Community 79 - "sidePanel.ts"
Cohesion: 0.13
Nodes (16): AiResult, ExplainTone, Settings, AI_NEWS_TITLE, AI_WORKING_TITLE, aiActivity, AiWork, T (+8 more)

### Community 82 - "Il database degli account (Supabase)"
Cohesion: 0.20
Nodes (9): Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Note condivise con un link, Sincronizzazione, `sync_pull({ since })`: scarica le novità (+1 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.06
Nodes (20): playwright-core, graphFile, names, namesFile, root, PNG_ICONS, AFTER_MOVE, ids (+12 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.08
Nodes (26): Abbonamenti, Com'è andata la discussione, Come si costruisce (per dopo), Come si decide cosa far pagare, Cosa fare, in ordine, Cosa succede dietro, Cosa vede chi studia, Da approfondire (+18 more)

### Community 91 - "topics.ts"
Cohesion: 0.09
Nodes (54): ATTRIBUTES, cut(), ER_SHAPES, fieldText(), fitLines(), flowOrder(), formulaText(), FREE_NAMES (+46 more)

### Community 92 - "restore.ts"
Cohesion: 0.17
Nodes (15): newStrokeId(), receiveRelocation(), restore(), BackupNote, backupNotes(), restoreBackup(), RestoreBoards, Restored (+7 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.10
Nodes (17): device(), login(), newContext, waitFor(), b64(), CAPTCHA_TOKEN, CODE, createFakeSupabase() (+9 more)

### Community 97 - "Dove sono le cose"
Cohesion: 0.13
Nodes (28): Dove sono le cose, Glifo – architettura, explainTarget, schemaTitle(), formulasUntil(), explanationMarkdown(), hasCalculation(), insertAfterBlock() (+20 more)

### Community 98 - ".folderItem"
Cohesion: 0.22
Nodes (3): formatDate(), NotesPanel, NotesPanelDeps

### Community 100 - "scopeWith"
Cohesion: 0.08
Nodes (47): End, axesIn(), bestAlong(), boundingBox(), combine(), compileDomain(), compileMultiple(), conditionsOf() (+39 more)

### Community 101 - "tools.ts"
Cohesion: 0.10
Nodes (28): allNames(), bareResult(), chained(), checkFormulas(), checkSteps(), checkTopicFormula(), ExplainStep, formulaNames() (+20 more)

### Community 102 - "symbolsEn.test.ts"
Cohesion: 0.14
Nodes (30): preferredIndex(), editDistance(), singular(), stem(), STOPWORDS, words(), BOTH, buildIndex() (+22 more)

### Community 103 - "siteUpdate.ts"
Cohesion: 0.16
Nodes (18): loadingEditor(), checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure (+10 more)

### Community 104 - "graph/file.ts"
Cohesion: 0.08
Nodes (36): FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), graphImagesFor(), hide(), OPEN, swatchSvg() (+28 more)

### Community 105 - "explainPanel.ts"
Cohesion: 0.11
Nodes (18): Conversation, Explanation, FollowUp, REPLY_TOKENS, LocalAbort, ChatMessage, ChatOptions, LoadProgress (+10 more)

### Community 106 - "editor/editor.ts"
Cohesion: 0.16
Nodes (19): @lezer/highlight, highlight, T, listMarkers, lineDepth(), mathDelimTag, mathMarkdown, mathTag (+11 more)

### Community 107 - "graphNote.test.ts"
Cohesion: 0.09
Nodes (24): @codemirror/lang-markdown, noIndentedCode, misspelledMark, refreshSpelling, setTarget, SKIP, SpellTarget, T (+16 more)

### Community 108 - "editor/lists.ts"
Cohesion: 0.10
Nodes (54): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+46 more)

### Community 113 - "graph.ts"
Cohesion: 0.06
Nodes (34): @maxgraph/core, AT_X, cellHtml(), cellText(), COMPASS, createGraph(), drawSchema(), insertSchema() (+26 more)

### Community 116 - "Field"
Cohesion: 0.11
Nodes (5): eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat()

### Community 117 - "schema/templates.ts"
Cohesion: 0.23
Nodes (17): SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), conceptMap(), cycle(), edge(), er() (+9 more)

### Community 118 - "exact.ts"
Cohesion: 0.11
Nodes (21): expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactFunction, ExactRandom, exactRoot() (+13 more)

### Community 119 - "src/relocation.ts"
Cohesion: 0.09
Nodes (57): accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf() (+49 more)

### Community 120 - "Glifo"
Cohesion: 0.12
Nodes (16): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Domande frequenti e commenti (+8 more)

### Community 121 - "captcha.ts"
Cohesion: 0.15
Nodes (12): captchaToken(), loadTurnstile(), Turnstile, TURNSTILE_SCRIPT, Window, TURNSTILE_SITE_KEY, accountFailure(), Accesso con Google (+4 more)

### Community 122 - "calcPlugin"
Cohesion: 0.14
Nodes (6): acceptCalcResult(), calcPlugin, CheckWidget, insertResult(), ResultWidget, valueNode()

### Community 123 - "board.ts"
Cohesion: 0.06
Nodes (64): Action, DOT_SIZES, DrawAction, EraserMode, Finger, HANDLE_REACH, ICON, LassoAction (+56 more)

### Community 124 - "Sheet"
Cohesion: 0.08
Nodes (32): Definition, Line, ExactComplexScope, ConicInfo, Ode, withWorkLimit(), FiniteContext, FormattedResult (+24 more)

### Community 125 - "page.ts"
Cohesion: 0.08
Nodes (38): accountDataFile(), PullResult, openShareDialog(), changeAccess(), changeCopy(), copy(), refreshChanged(), render() (+30 more)

### Community 128 - "downloadText"
Cohesion: 0.22
Nodes (11): loadDialect(), base64(), crc32(), svgSize(), svgToPng(), T, withDensity(), downloadBlob() (+3 more)

### Community 129 - "explain.ts"
Cohesion: 0.08
Nodes (49): 1. A cosa serve l'AI dei modelli di frontiera, answerFollowUp(), chatContext, ChatFn, chatSubject(), chatSystemPrompt(), checkTopicSteps(), converse() (+41 more)

### Community 132 - "spellcheck"
Cohesion: 0.21
Nodes (8): spellcheck(), close(), misspelledAt(), openAt(), replace(), tooltipView(), SpellChecker, SpellcheckOptions

### Community 133 - "formula.ts"
Cohesion: 0.12
Nodes (21): BinOp, COMPARE, ERRORS_BY_LENGTH, formulaBody(), FormulaError, formulaRefs(), OPERATORS, parseFormula() (+13 more)

### Community 136 - "Board"
Cohesion: 0.08
Nodes (8): Board, clampZoom(), coalesced(), pointsOf(), pressureOf(), sizeChoice(), validView(), handleScale()

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 139 - "Stroke"
Cohesion: 0.27
Nodes (5): EraseAction, Step, BoardChange, BoardData, Stroke

### Community 140 - "MarkdownEditor"
Cohesion: 0.12
Nodes (9): closeMathBlockOnEnter(), EditorCallbacks, MarkdownEditor, searchPhrases(), tabOutOfMath(), insertTemplate(), wrapSelection(), setup() (+1 more)

### Community 141 - "xlsx.ts"
Cohesion: 0.10
Nodes (40): RFC-4180, fflate, csvCell(), csvDelimiter(), csvNumbers(), csvToSheet(), digitsOf(), field() (+32 more)

### Community 142 - "render/lists.ts"
Cohesion: 0.38
Nodes (10): bulletGroup(), sameList(), alignInside(), asciiTrim(), findMarker(), isOrdered(), listAttrs(), listRule() (+2 more)

### Community 143 - "feedback.ts"
Cohesion: 0.06
Nodes (50): vite-plugin-pwa, AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, NEW_ORIGIN, accountOffMessage(), Site, T (+42 more)

### Community 144 - "SuggestionController"
Cohesion: 0.29
Nodes (3): EditorMathContext, expand(), SuggestionController

### Community 146 - "AiPanel"
Cohesion: 0.36
Nodes (3): NoteSubject, AiPanel, kindName()

### Community 154 - "L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota"
Cohesion: 0.25
Nodes (8): 2. Dalla lavagna alla nota, 3. Da una foto alla nota, 4. Dettare: la voce diventa testo nella nota, 5. Registrare le lezioni e trascriverle, Da sistemare con il primo punto che tocca l'AI, Fonti (controllate il 14 ottobre 2026), In che ordine, L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota

### Community 156 - "Glifo – note per Claude"
Cohesion: 0.25
Nodes (8): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Regole, sqlite()

### Community 157 - "files.ts"
Cohesion: 0.13
Nodes (22): cache, capability(), ClaudeRuntime, hostDownloads, HostError, inClaudeViewer(), ModelTier, runtime() (+14 more)

### Community 160 - "vite"
Cohesion: 0.13
Nodes (11): Promemoria per lo studente, vite, Commenti di chi prova Glifo, constructor(), LlamaWorker, minutes, postMessage(), started (+3 more)

### Community 161 - "severalGraph.ts"
Cohesion: 0.35
Nodes (10): criticalLine(), isSeveralLine(), named(), severalItems(), surface(), T, bounded(), extremaOf() (+2 more)

### Community 162 - "placeholders.ts"
Cohesion: 0.14
Nodes (12): addPlaceholders, buildDecorations(), clearAllPlaceholders(), clearPlaceholders, contains(), currentIndex(), filledMark, getPlaceholders() (+4 more)

### Community 163 - "In programma"
Cohesion: 0.25
Nodes (8): Account: i propri appunti su ogni dispositivo, anche da condividere, Idee per il futuro, In programma, L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota (14 ottobre 2026, se ne parla), La lavagna: idee in più, Più avanti, Schemi: idee in più, Trasloco: il sito su Cloudflare, con un dominio tutto di Glifo

### Community 166 - "vitest"
Cohesion: 0.07
Nodes (40): vitest, staticGraphSvg(), chooseWindow(), Box, chooseBox(), GraphItem, parseGraph(), DrawOptions (+32 more)

### Community 169 - "ui/relocation.ts"
Cohesion: 0.15
Nodes (19): moveDayLabel(), relocationMessage(), RelocationResult, BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark() (+11 more)

### Community 172 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 173 - "tutorial.ts"
Cohesion: 0.16
Nodes (11): HINT_MS, openTutorial(), show(), richText(), showTutorialHint(), close(), T, TUTORIAL_PAGES (+3 more)

### Community 175 - "usesDecimalComma"
Cohesion: 0.12
Nodes (25): isTestLine(), number(), T, testItems(), isNumericalLine(), numericalItems(), classes(), dataOf() (+17 more)

### Community 176 - "suggest.ts"
Cohesion: 0.24
Nodes (12): SuggestionItem, normalizeText(), IndexedEntry, SearchResult, getIndex(), isSubsequence(), keysOf(), MatchKind (+4 more)

### Community 179 - "I modelli e le chiavi API"
Cohesion: 0.33
Nodes (6): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), In prova sul ramo `prova` (7 ottobre 2026): Qwen3 nel browser per «Spiegami», La chiave, il server locale e la scelta del modello (14 ottobre 2026), Le idee dello studente (5 ottobre 2026)

## Knowledge Gaps
- **873 isolated node(s):** `Deciso`, `Com'è andata la discussione`, `La proposta dello studente (4 ottobre 2026)`, `Il parere di Claude, in breve`, `Come si decide cosa far pagare` (+868 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1193 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **39 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `texts` connect `h` to `i18n.ts`, `explain.ts`, `main.ts`, `compile`, `downloadText`, `spec.ts`, `parse.ts`, `formula.ts`, `graph/preview.ts`, `NotesStore`, `distributions.ts`, `svg.ts`, `linsys.ts`, `xlsx.ts`, `feedback.ts`, `escapeHtml`, `MathError`, `arithmetic.ts`, `index.ts`, `schema/editor.ts`, `store.ts`, `fourier.ts`, `Glifo – note per Claude`, `several.ts`, `gantt.ts`, `study.ts`, `files.ts`, `assistant.ts`, `severalGraph.ts`, `logic.ts`, `complex.ts`, `namesIn`, `resize.ts`, `ui/relocation.ts`, `localModels.ts`, `schema/preview.ts`, `functions.ts`, `linear.ts`, `spreadsheet/format.ts`, `usesDecimalComma`, `laplace.ts`, `tutorial.ts`, `toolbar.ts`, `sheet.ts`, `markdown.ts`, `supabase.ts`, `schema/blocks.ts`, `mathEn2.test.ts`, `calcResults.ts`, `spreadsheet/editor.ts`, `Rational`, `odesolve.ts`, `statsShown.ts`, `schemaEn.test.ts`, `blockMove.ts`, `toLatex`, `symbolic.ts`, `schemaBlocks.ts`, `plan.ts`, `sidePanel.ts`, `topics.ts`, `restore.ts`, `Dove sono le cose`, `scopeWith`, `tools.ts`, `siteUpdate.ts`, `graph/file.ts`, `explainPanel.ts`, `editor/editor.ts`, `graphNote.test.ts`, `editor/lists.ts`, `schema/templates.ts`, `src/relocation.ts`, `board.ts`, `page.ts`?**
  _High betweenness centrality (0.149) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `Dove sono le cose` to `i18n.ts`, `NotesStore`, `main.ts`, `compile`, `spec.ts`, `parse.ts`, `num`, `graph/preview.ts`, `aiPanel.test.ts`, `distributions.ts`, `ExplainPanel`, `svg.ts`, `linsys.ts`, `SchemaEditor`, `SheetEditor`, `escapeHtml`, `MathError`, `arithmetic.ts`, `schema/editor.ts`, `BoardStore`, `Parser`, `store.ts`, `fourier.ts`, `smoke-test.mjs`, `several.ts`, `gantt.ts`, `study.ts`, `assistant.ts`, `logic.ts`, `h`, `complex.ts`, `namesIn`, `view3d.ts`, `.renderFormat`, `localModels.ts`, `functions.ts`, `linear.ts`, `laplace.ts`, `board/shapes.ts`, `toolbar.ts`, `SidePanel`, `localLlm`, `sheet.ts`, `markdown.ts`, `supabase.ts`, `schema/blocks.ts`, `mathEn2.test.ts`, `calcResults.ts`, `spreadsheet/editor.ts`, `Rational`, `odesolve.ts`, `blockMove.ts`, `toLatex`, `symbolic.ts`, `schemaBlocks.ts`, `plan.ts`, `sidePanel.ts`, `tutorial.mjs`, `topics.ts`, `tools.ts`, `siteUpdate.ts`, `graph/file.ts`, `explainPanel.ts`, `graph.ts`, `src/relocation.ts`, `board.ts`, `Sheet`, `downloadText`, `explain.ts`, `formula.ts`, `Board`, `MarkdownEditor`, `xlsx.ts`, `feedback.ts`, `AiPanel`, `files.ts`, `severalGraph.ts`, `vitest`, `ui/relocation.ts`, `tutorial.ts`, `usesDecimalComma`?**
  _High betweenness centrality (0.112) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `i18n.ts`, `explain.ts`, `NotesStore`, `parse.ts`, `num`, `graph/preview.ts`, `aiPanel.test.ts`, `distributions.ts`, `MarkdownEditor`, `svg.ts`, `xlsx.ts`, `package.json`, `feedback.ts`, `schema/editor.ts`, `noteWordsMath.test.ts`, `BoardStore`, `store.ts`, `several.ts`, `gantt.ts`, `assistant.ts`, `h`, `translations.test.ts`, `resize.ts`, `ui/relocation.ts`, `localModels.ts`, `linear.ts`, `tutorial.ts`, `laplace.ts`, `template.ts`, `board/shapes.ts`, `sheet.ts`, `markdown.ts`, `supabase.ts`, `schema/blocks.ts`, `database.ts`, `mathEn2.test.ts`, `calcResults.ts`, `spreadsheet/editor.ts`, `schemaEn.test.ts`, `blockMove.ts`, `FoldersStore`, `toLatex`, `schemaBlocks.ts`, `plan.ts`, `sidePanel.ts`, `topics.ts`, `restore.ts`, `symbolsEn.test.ts`, `siteUpdate.ts`, `graph/file.ts`, `explainPanel.ts`, `graphNote.test.ts`, `editor/lists.ts`, `exact.ts`, `src/relocation.ts`, `captcha.ts`, `board.ts`, `page.ts`?**
  _High betweenness centrality (0.067) - this node is a cross-community bridge._
- **Are the 322 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `tutorialModel()`) actually correct?**
  _`Dove sono le cose` has 322 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Deciso`, `Com'è andata la discussione`, `La proposta dello studente (4 ottobre 2026)` to the rest of the system?**
  _873 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `i18n.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04649947753396029 - nodes in this community are weakly interconnected._
- **Should `NotesStore` be split into smaller, more focused modules?**
  _Cohesion score 0.07475678443420379 - nodes in this community are weakly interconnected._