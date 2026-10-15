# Graph Report - Glifo  (2026-10-15)

## Corpus Check
- 349 files · ~736,368 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5619 nodes · 20536 edges · 181 communities (134 shown, 47 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 704 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `5e032cd7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- i18n.ts
- noteWordsGraph.test.ts
- main.ts
- math/evaluate.ts
- sync.ts
- spec.ts
- h
- num
- graph/preview.ts
- blockMove.ts
- distributions.ts
- Dove sono le cose
- svg.ts
- sheet.ts
- SchemaEditor
- Sheet
- SheetEditor
- namesIn
- numerical.ts
- arithmetic.ts
- index.ts
- engine.ts
- schema/editor.ts
- spreadsheetEn.test.ts
- IdbBoards
- Parser
- strokes.ts
- graph/file.ts
- NotesStore
- compile
- gantt.ts
- study.ts
- Rational
- assistant.ts
- logic.ts
- solve.ts
- complex.ts
- devDependencies
- translations.test.ts
- resize.ts
- view3d.ts
- Pt
- localModels.ts
- schema/preview.ts
- functions.ts
- MathError
- prova-lettori.py
- parse.ts
- tools.ts
- board/shapes.ts
- schema/shapes.ts
- sidePanel.ts
- spaces.ts
- graph.ts
- domain.ts
- page.ts
- 20261004091555_note_condivise.sql
- editor/lists.ts
- src/relocation.ts
- finite.ts
- ui/preview.ts
- dependencies
- Welcome to Glifo
- spreadsheet/editor.ts
- topics.ts
- odesolve.ts
- .constructor
- probability.ts
- editor/editor.ts
- Benvenuto in Glifo
- compilerOptions
- Glifo
- inference.ts
- symbolic.ts
- parseMath
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- plan.ts
- explainChat.ts
- session-start.sh
- .claude/CLAUDE.md
- Il database degli account (Supabase)
- tutorial.mjs
- Abbonamenti
- calcPlugin
- LlamaWorker
- supabase-stub.sql
- account-test.mjs
- escapeHtml
- supabase.ts
- noteWordsMath.test.ts
- schemaBlocks.ts
- symbolsEn.test.ts
- siteUpdate.ts
- Parser
- rich
- latex.ts
- spellcheck.ts
- toolbar.ts
- schemaTools.test.ts
- smoke-test.mjs
- schema/templates.ts
- BoardStore
- FoldersStore
- SuggestionController
- usesDecimalComma
- calcResults.ts
- ExplainPanel
- MathNode
- relocation-test.mjs
- Glifo – note per Claude
- explain.ts
- planPreview.ts
- database.ts
- Board
- 20261008130026_commenti.sql
- Le spiegazioni, come funzionano
- L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota
- xlsx.ts
- createFakeSupabase
- texts
- AccountSync
- .folderItem
- board.ts
- In programma
- mathEn2.test.ts
- tutorial.ts
- sql.ts
- vite
- Schema
- captcha.ts
- files.ts
- markdown.ts
- ExplainChat
- aiPanel.ts
- Piano per piano
- vite.config.ts
- vectorcalc.test.ts
- chiSquareTest
- 2. Dalla lavagna alla nota
- scripts
- expSum
- Costi
- La lavagna
- MLCEngine
- I modelli e le chiavi API
- SlotWidget

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 332 edges
2. `MathError` - 151 edges
3. `Sheet` - 148 edges
4. `num()` - 145 edges
5. `h()` - 136 edges
6. `MathNode` - 131 edges
7. `mul()` - 124 edges
8. `texts` - 123 edges
9. `Board` - 118 edges
10. `compile()` - 116 edges

## Surprising Connections (you probably didn't know these)
- `Dove sono le cose` --references--> `fakeLlmWorker()`  [INFERRED]
  ARCHITETTURA.md → scripts/smoke-test.mjs
- `Dove sono le cose` --references--> `tutorialModel()`  [INFERRED]
  ARCHITETTURA.md → scripts/tutorial.mjs
- `Come viene pubblicata` --references--> `dist()`  [INFERRED]
  README.md → src/board/shapes.ts
- `Trasloco: il sito su Cloudflare, con un dominio tutto di Glifo` --references--> `dist()`  [INFERRED]
  ROADMAP.md → src/board/shapes.ts
- `Dove sono le cose` --references--> `WidgetKind`  [INFERRED]
  ARCHITETTURA.md → src/editor/schemaBlocks.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (181 total, 47 thin omitted)

### Community 0 - "i18n.ts"
Cohesion: 0.05
Nodes (58): downloadSize(), gpuF16(), modelVariant, aiService, browserLang(), browserLanguages(), dateLocale(), detectLang() (+50 more)

### Community 1 - "noteWordsGraph.test.ts"
Cohesion: 0.06
Nodes (46): sheetBefore(), formulaAtCursor(), GraphLabelLines, insertGraphBlock(), LABEL_KEYS, setGraphLabels(), monthOf(), MONTHS (+38 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (114): addToGraphBlock(), remapGraphLines(), account, ACCOUNT_OFF, active, aiShown(), aiToggle, aiWork (+106 more)

### Community 3 - "math/evaluate.ts"
Cohesion: 0.08
Nodes (38): argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot(), fieldOn(), numericPartials() (+30 more)

### Community 4 - "sync.ts"
Cohesion: 0.07
Nodes (30): withLock(), Account, EMPTY_STATE, FolderChange, FolderRow, isEmpty(), iso(), LocalChange (+22 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (107): isConicLine(), quadricEquation(), isFourierLine(), onlyComplex(), isTestLine(), constantIntegrand(), depth(), inequalityMargin() (+99 more)

### Community 6 - "h"
Cohesion: 0.05
Nodes (59): sidebarToggle(), viewSwitch, moveDayLabel(), relocationMessage(), openSignedOut(), printButton(), ShareDialogDeps, T (+51 more)

### Community 7 - "num"
Cohesion: 0.13
Nodes (94): atIntegers(), linearTrig(), withoutAbs(), exp(), hyperbolicToExp(), inverseRational(), linearIn(), sqrtEx() (+86 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (40): addLabel(), boxes, cameras, complexCoord(), containing(), coord(), coordinates(), drawings (+32 more)

### Community 9 - "blockMove.ts"
Cohesion: 0.11
Nodes (33): blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove, blockPlace(), closed() (+25 more)

### Community 10 - "distributions.ts"
Cohesion: 0.14
Nodes (30): choose(), continuousQuantile(), decimals(), discreteQuantile(), factorialBig(), FAMILIES, Family, integerParam() (+22 more)

### Community 11 - "Dove sono le cose"
Cohesion: 0.11
Nodes (34): Dove sono le cose, Glifo – architettura, explainTarget, Explanation, schemaTitle(), formulasUntil(), explanationMarkdown(), hasCalculation() (+26 more)

### Community 12 - "svg.ts"
Cohesion: 0.07
Nodes (64): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseWindow(), chooseY(), clipLines(), dataWindow() (+56 more)

### Community 13 - "sheet.ts"
Cohesion: 0.08
Nodes (56): Ode, OdeFunction, Eigenvalue, Lin, NUMERICAL, BRACKETS, CHECK_VALUES, checks (+48 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.09
Nodes (16): fieldInput(), isContainer(), isLanes(), placeIcon(), SchemaEditor, cellText(), edgeLook(), nodeLook() (+8 more)

### Community 15 - "Sheet"
Cohesion: 0.06
Nodes (26): vitest, readBases(), bracketParts(), chainOf(), definitionTarget(), fingerprint(), parseCached(), piecesWithLines() (+18 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (5): functionLabel(), SheetEditor, englishTyping(), serializeSheet(), cloneSheet()

### Community 17 - "namesIn"
Cohesion: 0.13
Nodes (36): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+28 more)

### Community 18 - "numerical.ts"
Cohesion: 0.10
Nodes (53): isNumericalLine(), numericalItems(), FormatOptions, bisection(), cholesky(), condition(), derivative(), exactPolynomial() (+45 more)

### Community 19 - "arithmetic.ts"
Cohesion: 0.05
Nodes (111): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+103 more)

### Community 20 - "index.ts"
Cohesion: 0.06
Nodes (46): Text, b, bigops, c, calculus, fn, fr, fractions (+38 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "schema/editor.ts"
Cohesion: 0.05
Nodes (58): schemaSummary(), ALIGN, ALIGN_NAMES, ARROW_NAMES, AT_ICONS, AT_NAMES, BASE_PRESETS, BIG_ARROWS (+50 more)

### Community 23 - "spreadsheetEn.test.ts"
Cohesion: 0.09
Nodes (50): pick(), booleanText(), decimalsOf(), ENGLISH, englishNumber(), fixedNumber(), generalNumber(), group() (+42 more)

### Community 24 - "IdbBoards"
Cohesion: 0.08
Nodes (13): BoardBackend, done(), fromRecord(), IdbBoards, ofNote(), openBoardDatabase(), openDefault(), recordBytes() (+5 more)

### Community 26 - "strokes.ts"
Cohesion: 0.09
Nodes (38): centerOn(), copyStrokes(), cross(), IDENTITY, insideLasso(), keepInside(), LASSO_SHARE, lassoed() (+30 more)

### Community 27 - "graph/file.ts"
Cohesion: 0.07
Nodes (49): FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsForFile(), graphsFromFile(), hide() (+41 more)

### Community 28 - "NotesStore"
Cohesion: 0.07
Nodes (34): buildPackage(), Deletion, DeletionLog, Folder, FOLDER_NAME_MAX, FolderGroup, groupByFolder(), loadClosedFolders() (+26 more)

### Community 29 - "compile"
Cohesion: 0.05
Nodes (102): fourierItems(), T, criticalLine(), named(), severalItems(), surface(), T, close() (+94 more)

### Community 30 - "gantt.ts"
Cohesion: 0.06
Nodes (69): amount(), barColor(), crossings(), dateText(), dayMonth(), dayOf(), fitText(), GanttOptions (+61 more)

### Community 31 - "study.ts"
Cohesion: 0.14
Nodes (37): limit(), Asymptote, asymptoteText(), boundaries(), compiled(), cutsOf(), defined(), domainOf() (+29 more)

### Community 32 - "Rational"
Cohesion: 0.08
Nodes (48): conicItems(), T, Part, at(), centralCanonical(), Coefficients, coneCanonical(), ConicInfo (+40 more)

### Community 33 - "assistant.ts"
Cohesion: 0.12
Nodes (25): @anthropic-ai/sdk, AiAnswer, AiError, AiResult, AiSettings, answerSchema(), askAi(), askCompatible() (+17 more)

### Community 34 - "logic.ts"
Cohesion: 0.11
Nodes (30): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+22 more)

### Community 35 - "solve.ts"
Cohesion: 0.08
Nodes (52): exponentialForm(), fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), decimalSeparator() (+44 more)

### Community 36 - "complex.ts"
Cohesion: 0.05
Nodes (69): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexLine(), isComplexValue() (+61 more)

### Community 37 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

### Community 38 - "translations.test.ts"
Cohesion: 0.17
Nodes (18): AstNode, calleeName(), check(), checkPair(), visit(), children(), entryPairs(), files (+10 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (24): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+16 more)

### Community 40 - "view3d.ts"
Cohesion: 0.06
Nodes (91): staticGraphSvg(), addMesh(), addTet(), affinePlane(), Axis, Box, centroid(), chooseBox() (+83 more)

### Community 41 - "Pt"
Cohesion: 0.10
Nodes (13): clampZoom(), coalesced(), Finger, LassoAction, MoveAction, pointsOf(), pressureOf(), validView() (+5 more)

### Community 42 - "localModels.ts"
Cohesion: 0.05
Nodes (53): chat(), GlifoError, Gpu, load(), post(), remove(), scope, shaderF16() (+45 more)

### Community 43 - "schema/preview.ts"
Cohesion: 0.11
Nodes (21): svg(), base64(), hide(), OPEN, schemasForFile(), schemasFromFile(), T, unhide() (+13 more)

### Community 44 - "functions.ts"
Cohesion: 0.08
Nodes (63): EMPTY, number(), T, addFormat(), divFormat(), GENERAL, mulFormat(), tidy() (+55 more)

### Community 45 - "MathError"
Cohesion: 0.10
Nodes (63): MathError, angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, dataOf() (+55 more)

### Community 46 - "prova-lettori.py"
Cohesion: 0.12
Nodes (4): byte_table(), read(), Reader, tidy()

### Community 47 - "parse.ts"
Cohesion: 0.06
Nodes (37): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, derivativeOperator(), differentialInFraction() (+29 more)

### Community 48 - "tools.ts"
Cohesion: 0.09
Nodes (29): allNames(), bareResult(), chained(), checkFormulas(), checkSteps(), checkTopicFormula(), checkTopicSteps(), ExplainStep (+21 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (35): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+27 more)

### Community 50 - "schema/shapes.ts"
Cohesion: 0.08
Nodes (16): ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape, IdentifyingRelationShape (+8 more)

### Community 51 - "sidePanel.ts"
Cohesion: 0.10
Nodes (22): SuggestionItem, localizeTex(), cleanKatexError(), isConfidentAnswer(), CATEGORIES, symbolsInCategory(), cardPreviewTex(), formPreviewTex() (+14 more)

### Community 52 - "spaces.ts"
Cohesion: 0.06
Nodes (39): formatRational(), characteristicPolynomial(), eigenvalues(), eigenvectors(), Field, formatPolynomial(), interpolate(), interpolateFloat() (+31 more)

### Community 53 - "graph.ts"
Cohesion: 0.09
Nodes (34): @maxgraph/core, AT_X, COMPASS, createEdgeCell(), createGraph(), drawSchema(), edgeStyle(), edgeTextAt() (+26 more)

### Community 54 - "domain.ts"
Cohesion: 0.16
Nodes (25): axesIn(), bestAlong(), boundingBox(), combine(), compileDomain(), compileMultiple(), conditionsOf(), constantOf() (+17 more)

### Community 55 - "page.ts"
Cohesion: 0.05
Nodes (53): katex, AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), currentAccount(), PullResult, board (+45 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "editor/lists.ts"
Cohesion: 0.09
Nodes (57): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+49 more)

### Community 58 - "src/relocation.ts"
Cohesion: 0.07
Nodes (59): accountSpace(), adoptGuestNotes(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf(), prefsKey() (+51 more)

### Community 59 - "finite.ts"
Cohesion: 0.17
Nodes (28): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+20 more)

### Community 60 - "ui/preview.ts"
Cohesion: 0.08
Nodes (23): GraphLabels, remapLineKeys(), renameGraphScope(), renameScopeKeys(), BlockKind, MoveDir, hydrateSheets(), T (+15 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "Welcome to Glifo"
Cohesion: 0.20
Nodes (9): A few examples, Calculations and graphs, For programming too, Handy shortcuts, How to write formulas, Lists, Spell check, Try it now (+1 more)

### Community 63 - "spreadsheet/editor.ts"
Cohesion: 0.07
Nodes (60): currentCall(), Editing, MenuEntry, Move, openSheetEditor(), PATHS, SheetEditorOptions, Snapshot (+52 more)

### Community 64 - "topics.ts"
Cohesion: 0.08
Nodes (40): ATTRIBUTES, cut(), ER_SHAPES, fieldText(), fitLines(), flowOrder(), formulaText(), FREE_NAMES (+32 more)

### Community 65 - "odesolve.ts"
Cohesion: 0.08
Nodes (80): addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames(), constantParticular() (+72 more)

### Community 67 - "probability.ts"
Cohesion: 0.12
Nodes (27): End, compare(), compileCondition(), CompileOptions, ExactScope, ALL, complement(), endAt() (+19 more)

### Community 68 - "editor/editor.ts"
Cohesion: 0.07
Nodes (34): description, name, private, type, version, @codemirror/autocomplete, @codemirror/commands, @codemirror/language-data (+26 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "Glifo"
Cohesion: 0.12
Nodes (16): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Domande frequenti e commenti (+8 more)

### Community 73 - "inference.ts"
Cohesion: 0.19
Nodes (22): between(), confidence(), confidenceShown(), decimals(), hypothesisTest(), interval(), meanOf(), num() (+14 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.06
Nodes (62): constant(), fnLabel(), primitive(), linearCells(), pairUp(), atValues(), Converter, coordinates() (+54 more)

### Community 75 - "parseMath"
Cohesion: 0.19
Nodes (15): errorMessage(), MathSyntaxError, parseMath(), parseStatement(), error(), value(), calcError(), line() (+7 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Errore o imprevisto → nel dettaglio, 3. Serve una decisione → frasi complete, 4. Fine del compito → un solo riepilogo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "plan.ts"
Cohesion: 0.08
Nodes (46): at(), breakEven(), Point, quantity(), T, tableItems(), textLabel(), graphKeyLine() (+38 more)

### Community 79 - "explainChat.ts"
Cohesion: 0.13
Nodes (17): ExplainTone, FollowUp, REPLY_TOKENS, Settings, AI_NEWS_TITLE, AI_WORKING_TITLE, aiActivity, AiWork (+9 more)

### Community 82 - "Il database degli account (Supabase)"
Cohesion: 0.22
Nodes (8): Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Note condivise con un link, Sincronizzazione, `sync_pull({ since })`: scarica le novità

### Community 83 - "tutorial.mjs"
Cohesion: 0.11
Nodes (11): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+3 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.13
Nodes (15): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+7 more)

### Community 91 - "calcPlugin"
Cohesion: 0.16
Nodes (5): acceptCalcResult(), calcPlugin, CheckWidget, insertResult(), ResultWidget

### Community 92 - "LlamaWorker"
Cohesion: 0.25
Nodes (5): Promemoria per lo studente, Commenti di chi prova Glifo, constructor(), LlamaWorker, Commenti di chi prova Glifo

### Community 96 - "account-test.mjs"
Cohesion: 0.10
Nodes (11): @electric-sql/pglite, device(), login(), newContext, waitFor(), b64(), CAPTCHA_TOKEN, CODE (+3 more)

### Community 97 - "escapeHtml"
Cohesion: 0.20
Nodes (18): valueNode(), labelHtml(), texHtml(), checkHtml(), checkTitle(), T, cache, escapeHtml() (+10 more)

### Community 98 - "supabase.ts"
Cohesion: 0.09
Nodes (39): @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken(), ensureSessionOf() (+31 more)

### Community 100 - "noteWordsMath.test.ts"
Cohesion: 0.07
Nodes (28): BLOCKS, FROM_ENGLISH, FUNCTIONS, functionWordPairs(), GRAPH_KEY_FORMS, GRAPH_KEY_LINE, GRAPH_KEYS, GraphKey (+20 more)

### Community 101 - "schemaBlocks.ts"
Cohesion: 0.10
Nodes (17): toggleLinePrefix(), BlockWidget, findWidgetBlocks(), guardBlocks(), KINDS, schemaBlocks(), T, WidgetBlock (+9 more)

### Community 102 - "symbolsEn.test.ts"
Cohesion: 0.11
Nodes (39): preferredIndex(), editDistance(), normalizeText(), singular(), stem(), STOPWORDS, words(), BOTH (+31 more)

### Community 103 - "siteUpdate.ts"
Cohesion: 0.16
Nodes (18): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, loadPart() (+10 more)

### Community 105 - "rich"
Cohesion: 0.15
Nodes (16): SyncStatus, rich(), AccountButton, accountSection(), AccountSectionDeps, confirmAccountDeletion(), messageOf(), openLoginDialog() (+8 more)

### Community 106 - "latex.ts"
Cohesion: 0.09
Nodes (29): ACCENT_COMMANDS, diffLatex(), DISTRIBUTION_LATEX, distributionLatex(), domainLatex(), fnLatex(), fnName(), formLatex() (+21 more)

### Community 107 - "spellcheck.ts"
Cohesion: 0.08
Nodes (24): @codemirror/lang-markdown, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt() (+16 more)

### Community 108 - "toolbar.ts"
Cohesion: 0.09
Nodes (20): closeMathBlockOnEnter(), EditorCallbacks, MarkdownEditor, searchPhrases(), tabOutOfMath(), insertBlock(), wrapSelection(), ListStyleId (+12 more)

### Community 113 - "schemaTools.test.ts"
Cohesion: 0.12
Nodes (27): containerOf(), laneOf(), alignBoxes(), Alignment, Box, distributeBoxes(), Position, cellHtml() (+19 more)

### Community 116 - "smoke-test.mjs"
Cohesion: 0.15
Nodes (6): markdown-it, playwright-core, PNG_ICONS, fakeLlmWorker(), firstVisit(), plainContext

### Community 117 - "schema/templates.ts"
Cohesion: 0.19
Nodes (20): defaultPlace(), SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), TextPlace, conceptMap(), cycle() (+12 more)

### Community 118 - "BoardStore"
Cohesion: 0.09
Nodes (13): BoardStore, MemoryBoards, BackupNote, backupNotes(), restoreBackup(), RestoreBoards, Restored, restoredMessage() (+5 more)

### Community 119 - "FoldersStore"
Cohesion: 0.15
Nodes (4): cleanFolderName(), FoldersStore, sameName(), names()

### Community 120 - "SuggestionController"
Cohesion: 0.29
Nodes (3): EditorMathContext, expand(), SuggestionController

### Community 121 - "usesDecimalComma"
Cohesion: 0.10
Nodes (29): FieldContext, number(), T, testItems(), classes(), dataOf(), distributionExtent(), distributionLabel() (+21 more)

### Community 122 - "calcResults.ts"
Cohesion: 0.07
Nodes (41): @codemirror/language, @codemirror/state, @codemirror/view, @lezer/common, CalcCheck, calcOutcomes(), CalcResult, calcResults() (+33 more)

### Community 123 - "ExplainPanel"
Cohesion: 0.23
Nodes (3): ExplainPanel, preventFocusSteal(), setup()

### Community 124 - "MathNode"
Cohesion: 0.12
Nodes (16): expSumValue(), withWorkLimit(), FiniteContext, FormattedResult, differentialRequest, pieces(), MathNode, close() (+8 more)

### Community 125 - "relocation-test.mjs"
Cohesion: 0.18
Nodes (7): AFTER_MOVE, ids, newBrowser(), NOTICE_DAY, out, serve(), TYPES

### Community 128 - "Glifo – note per Claude"
Cohesion: 0.25
Nodes (8): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Regole, sqlite()

### Community 129 - "explain.ts"
Cohesion: 0.07
Nodes (53): 1. A cosa serve l'AI dei modelli di frontiera, answerFollowUp(), chatContext, ChatFn, chatSubject(), chatSystemPrompt(), Conversation, converse() (+45 more)

### Community 132 - "planPreview.ts"
Cohesion: 0.25
Nodes (6): planSwatchSvg(), ganttWidth(), PlanView, T, GraphLook, Palette

### Community 133 - "database.ts"
Cohesion: 0.23
Nodes (6): createDatabase(), createUser(), databaseTests(), feedbackTests(), migrations, shareTests()

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 139 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 140 - "L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota"
Cohesion: 0.29
Nodes (7): 3. Da una foto alla nota, 4. Dettare: la voce diventa testo nella nota, 5. Registrare le lezioni e trascriverle, Da sistemare con il primo punto che tocca l'AI, Fonti (controllate il 14 ottobre 2026), In che ordine, L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota

### Community 141 - "xlsx.ts"
Cohesion: 0.10
Nodes (43): RFC-4180, fflate, csvCell(), csvDelimiter(), csvNumbers(), csvToSheet(), digitsOf(), field() (+35 more)

### Community 142 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 143 - "texts"
Cohesion: 0.07
Nodes (48): texts, feedbackButton, openFeedback(), Site, T, commentDate(), commentItem(), COMMENTS_MAX (+40 more)

### Community 154 - "board.ts"
Cohesion: 0.07
Nodes (47): Action, DOT_SIZES, DrawAction, EraseAction, EraserMode, HANDLE_REACH, ICON, MODE_NAMES (+39 more)

### Community 156 - "In programma"
Cohesion: 0.25
Nodes (8): Account: i propri appunti su ogni dispositivo, anche da condividere, Idee per il futuro, In programma, L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota (14 ottobre 2026, se ne parla), La lavagna: idee in più, Più avanti, Schemi: idee in più, Trasloco: il sito su Cloudflare, con un dominio tutto di Glifo

### Community 157 - "mathEn2.test.ts"
Cohesion: 0.32
Nodes (6): Interval, args(), q(), result(), tex(), text()

### Community 158 - "tutorial.ts"
Cohesion: 0.14
Nodes (14): helpButton, openGuide(), HINT_MS, markTutorialSeen(), openTutorial(), show(), richText(), showTutorialHint() (+6 more)

### Community 159 - "sql.ts"
Cohesion: 0.16
Nodes (19): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+11 more)

### Community 160 - "vite"
Cohesion: 0.33
Nodes (4): vite, minutes, postMessage(), started

### Community 161 - "Schema"
Cohesion: 0.19
Nodes (9): loadDialect(), SchemaEditorOptions, svgSize(), svgToPng(), Schema, serializeSchema(), downloadBlob(), downloadText() (+1 more)

### Community 162 - "captcha.ts"
Cohesion: 0.15
Nodes (12): captchaToken(), loadTurnstile(), Turnstile, TURNSTILE_SCRIPT, Window, TURNSTILE_SITE_KEY, accountFailure(), Accesso con Google (+4 more)

### Community 163 - "files.ts"
Cohesion: 0.13
Nodes (22): cache, capability(), ClaudeRuntime, hostDownloads, HostError, hostSample, inClaudeViewer(), ModelTier (+14 more)

### Community 166 - "markdown.ts"
Cohesion: 0.10
Nodes (35): ListStyle, dataRange(), bulletGroup(), Marker, sameList(), moveAttrs(), alignInside(), asciiTrim() (+27 more)

### Community 168 - "aiPanel.ts"
Cohesion: 0.17
Nodes (14): definedName(), formulaTopic(), graphTopic(), numberText(), studyOf(), theoremTopic(), NoteSubject, AiPanel (+6 more)

### Community 169 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 170 - "vite.config.ts"
Cohesion: 0.22
Nodes (6): @mlc-ai/web-llm, vite-plugin-pwa, accountOffMessage(), defineFor(), MAIN_BRANCH, webllmModels

### Community 171 - "vectorcalc.test.ts"
Cohesion: 0.32
Nodes (6): circle, light, result(), sphere, tex(), text()

### Community 172 - "chiSquareTest"
Cohesion: 0.33
Nodes (6): chiSquareTest(), Given, InferenceContext, nameOf(), opOf(), squared()

### Community 174 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 175 - "expSum"
Cohesion: 0.18
Nodes (9): addExp(), exactIntervalProbability(), expSum, integerRange(), intervalProbability(), subtractExp(), divideExp(), exactSetProbability() (+1 more)

### Community 176 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 177 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 179 - "I modelli e le chiavi API"
Cohesion: 0.33
Nodes (6): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), In prova sul ramo `prova` (7 ottobre 2026): Qwen3 nel browser per «Spiegami», La chiave, il server locale e la scelta del modello (14 ottobre 2026), Le idee dello studente (5 ottobre 2026)

## Knowledge Gaps
- **879 isolated node(s):** `session-start.sh script`, `name`, `private`, `version`, `description` (+874 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1217 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **47 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `i18n.ts`, `noteWordsGraph.test.ts`, `main.ts`, `math/evaluate.ts`, `spec.ts`, `h`, `num`, `graph/preview.ts`, `blockMove.ts`, `svg.ts`, `sheet.ts`, `SchemaEditor`, `Sheet`, `SheetEditor`, `namesIn`, `numerical.ts`, `arithmetic.ts`, `schema/editor.ts`, `spreadsheetEn.test.ts`, `Parser`, `strokes.ts`, `graph/file.ts`, `NotesStore`, `compile`, `gantt.ts`, `study.ts`, `Rational`, `assistant.ts`, `logic.ts`, `solve.ts`, `complex.ts`, `view3d.ts`, `Pt`, `localModels.ts`, `functions.ts`, `MathError`, `tools.ts`, `board/shapes.ts`, `schema/shapes.ts`, `sidePanel.ts`, `graph.ts`, `page.ts`, `src/relocation.ts`, `finite.ts`, `ui/preview.ts`, `spreadsheet/editor.ts`, `topics.ts`, `odesolve.ts`, `inference.ts`, `symbolic.ts`, `parseMath`, `plan.ts`, `explainChat.ts`, `tutorial.mjs`, `escapeHtml`, `supabase.ts`, `schemaBlocks.ts`, `siteUpdate.ts`, `rich`, `latex.ts`, `toolbar.ts`, `schemaTools.test.ts`, `smoke-test.mjs`, `schema/templates.ts`, `BoardStore`, `usesDecimalComma`, `ExplainPanel`, `MathNode`, `explain.ts`, `planPreview.ts`, `Board`, `xlsx.ts`, `texts`, `board.ts`, `tutorial.ts`, `Schema`, `files.ts`, `ExplainChat`, `aiPanel.ts`, `vite.config.ts`, `chiSquareTest`, `expSum`?**
  _High betweenness centrality (0.124) - this node is a cross-community bridge._
- **Why does `texts` connect `texts` to `i18n.ts`, `explain.ts`, `noteWordsGraph.test.ts`, `main.ts`, `planPreview.ts`, `spec.ts`, `math/evaluate.ts`, `h`, `graph/preview.ts`, `tutorial.ts`, `distributions.ts`, `Dove sono le cose`, `svg.ts`, `sheet.ts`, `xlsx.ts`, `namesIn`, `numerical.ts`, `arithmetic.ts`, `index.ts`, `schema/editor.ts`, `spreadsheetEn.test.ts`, `board.ts`, `graph/file.ts`, `NotesStore`, `compile`, `gantt.ts`, `study.ts`, `Rational`, `assistant.ts`, `logic.ts`, `solve.ts`, `complex.ts`, `sql.ts`, `files.ts`, `resize.ts`, `aiPanel.ts`, `localModels.ts`, `schema/preview.ts`, `functions.ts`, `MathError`, `parse.ts`, `tools.ts`, `sidePanel.ts`, `spaces.ts`, `domain.ts`, `page.ts`, `editor/lists.ts`, `src/relocation.ts`, `finite.ts`, `ui/preview.ts`, `spreadsheet/editor.ts`, `topics.ts`, `odesolve.ts`, `probability.ts`, `editor/editor.ts`, `inference.ts`, `symbolic.ts`, `plan.ts`, `explainChat.ts`, `escapeHtml`, `supabase.ts`, `schemaBlocks.ts`, `siteUpdate.ts`, `rich`, `latex.ts`, `spellcheck.ts`, `toolbar.ts`, `schemaTools.test.ts`, `schema/templates.ts`, `BoardStore`, `usesDecimalComma`, `calcResults.ts`?**
  _High betweenness centrality (0.113) - this node is a cross-community bridge._
- **Why does `vitest` connect `Sheet` to `i18n.ts`, `explain.ts`, `noteWordsGraph.test.ts`, `main.ts`, `database.ts`, `h`, `num`, `blockMove.ts`, `distributions.ts`, `svg.ts`, `xlsx.ts`, `texts`, `schema/editor.ts`, `spreadsheetEn.test.ts`, `IdbBoards`, `strokes.ts`, `board.ts`, `NotesStore`, `graph/file.ts`, `gantt.ts`, `mathEn2.test.ts`, `sql.ts`, `assistant.ts`, `captcha.ts`, `tutorial.ts`, `translations.test.ts`, `resize.ts`, `view3d.ts`, `vite.config.ts`, `localModels.ts`, `schema/preview.ts`, `MathError`, `vectorcalc.test.ts`, `board/shapes.ts`, `sidePanel.ts`, `graph.ts`, `page.ts`, `editor/lists.ts`, `src/relocation.ts`, `ui/preview.ts`, `spreadsheet/editor.ts`, `editor/editor.ts`, `parseMath`, `plan.ts`, `explainChat.ts`, `supabase.ts`, `noteWordsMath.test.ts`, `schemaBlocks.ts`, `symbolsEn.test.ts`, `siteUpdate.ts`, `spellcheck.ts`, `schemaTools.test.ts`, `BoardStore`, `calcResults.ts`?**
  _High betweenness centrality (0.062) - this node is a cross-community bridge._
- **Are the 331 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `tutorialModel()`) actually correct?**
  _`Dove sono le cose` has 331 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `name`, `private` to the rest of the system?**
  _879 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `i18n.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04647599591419816 - nodes in this community are weakly interconnected._
- **Should `noteWordsGraph.test.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06110102843315184 - nodes in this community are weakly interconnected._