# Graph Report - matherdown  (2026-10-13)

## Corpus Check
- 345 files · ~712,581 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5518 nodes · 20232 edges · 175 communities (135 shown, 40 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 676 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2bec1c1d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- h
- noteWordsGraph.test.ts
- main.ts
- compile
- sync.ts
- spec.ts
- schemaEn.test.ts
- num
- graph/preview.ts
- explain.ts
- distributions.ts
- src/relocation.ts
- svg.ts
- plan.ts
- SchemaEditor
- markdown.ts
- SheetEditor
- explainSubjects.ts
- numerical.ts
- toLatex
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
- solve.ts
- complex.ts
- namesIn
- translations.test.ts
- resize.ts
- ExplainPanel
- BoardStore
- localModels.ts
- Dove sono le cose
- functions.ts
- MathError
- spreadsheetEn.test.ts
- Pt
- template.ts
- board/shapes.ts
- toolbar.ts
- sidePanel.ts
- texts
- probability.ts
- AiPanel
- domain.ts
- 20261004091555_note_condivise.sql
- i18n.ts
- database.ts
- finite.ts
- topics.ts
- dependencies
- Welcome to Glifo
- spreadsheet/editor.ts
- Rational
- odesolve.ts
- sheet.ts
- toNode
- blockMove.ts
- Benvenuto in Glifo
- compilerOptions
- relocation-test.mjs
- La grafica: le otto richieste del 10 ottobre 2026
- schema/templates.ts
- symbolic.ts
- Field
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- logo.ts
- NotesStore
- session-start.sh
- .claude/CLAUDE.md
- Il database degli account (Supabase)
- tutorial.mjs
- Abbonamenti
- rich
- supabase-stub.sql
- account-test.mjs
- schemaBlocks.ts
- .constructor
- In programma
- files.ts
- symbolsEn.test.ts
- siteUpdate.ts
- graph/file.ts
- suggestions.ts
- package.json
- spellcheck.ts
- linsys.ts
- graph.ts
- vitest
- supabase.ts
- conics.ts
- tutorial.ts
- calcResults.ts
- SlotWidget
- Le spiegazioni, come funzionano
- selection.ts
- Sheet
- icon
- createFakeSupabase
- laplace.ts
- Piano per piano
- Parser
- Board
- 20261008130026_commenti.sql
- latex.ts
- .constructor
- xlsx.ts
- editor/lists.ts
- feedback.ts
- render/lists.ts
- Glifo
- vite
- Glifo – note per Claude
- chart.ts
- gauss.ts
- formatNumber
- mathEn2.test.ts
- Costi
- editor/editor.ts
- La lavagna
- I modelli e le chiavi API
- tools.ts
- FoldersStore
- parseMath
- strokes.ts
- math/calculus.ts
- suggest.ts
- aiPanel.test.ts
- spreadsheet/file.ts

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 314 edges
2. `MathError` - 151 edges
3. `Sheet` - 147 edges
4. `num()` - 145 edges
5. `h()` - 135 edges
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
- `4. Più modelli per «Spiegami»` --references--> `webllmId()`  [INFERRED]
  GRAFICA.md → src/ai/localModels.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (175 total, 40 thin omitted)

### Community 0 - "h"
Cohesion: 0.06
Nodes (40): moveDayLabel(), append(), Child, clear(), formatDate(), h(), Props, T (+32 more)

### Community 1 - "noteWordsGraph.test.ts"
Cohesion: 0.15
Nodes (24): insertGraphBlock(), setGraphLabels(), monthOf(), MONTHS, MONTHS_EN, parseDate(), planBlock, PlanKind (+16 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (117): newStrokeId(), addToGraphBlock(), remapGraphLines(), account, ACCOUNT_OFF, active, aiShown(), aiToggle (+109 more)

### Community 3 - "compile"
Cohesion: 0.07
Nodes (54): integralRegion, areaFor(), areaOf(), condLabel(), constantValue(), define(), isStraight(), isVectorName() (+46 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (33): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+25 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (83): conicItems(), isConicLine(), quadricEquation(), T, fourierItems(), isFourierLine(), T, constantIntegrand() (+75 more)

### Community 6 - "schemaEn.test.ts"
Cohesion: 0.07
Nodes (41): schemaSummary(), svg(), openSchemaEditor(), SchemaEditorOptions, hide(), OPEN, schemasFromFile(), T (+33 more)

### Community 7 - "num"
Cohesion: 0.12
Nodes (92): atIntegers(), withoutAbs(), exp(), hyperbolicToExp(), inverseRational(), sqrtEx(), termTransform(), polyEx() (+84 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (43): addLabel(), boxes, cameras, complexCoord(), containing(), coord(), coordinates(), drawings (+35 more)

### Community 9 - "explain.ts"
Cohesion: 0.10
Nodes (33): allNames(), bareResult(), checkFormulas(), checkSteps(), checkTopicFormula(), checkTopicSteps(), Conversation, converse() (+25 more)

### Community 10 - "distributions.ts"
Cohesion: 0.05
Nodes (73): isTestLine(), number(), T, testItems(), addExp(), choose(), continuousQuantile(), decimals() (+65 more)

### Community 11 - "src/relocation.ts"
Cohesion: 0.06
Nodes (75): 1. «Cambia account», katex, accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome() (+67 more)

### Community 12 - "svg.ts"
Cohesion: 0.08
Nodes (58): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), dataWindow(), decimalText() (+50 more)

### Community 13 - "plan.ts"
Cohesion: 0.14
Nodes (20): shownStyle(), cellText(), columnRole(), columnsOf(), durationUnit(), isNumber(), isPlanRange(), MAX_ACTIVITIES (+12 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.08
Nodes (12): fieldInput(), isLanes(), SchemaEditor, withLaneContents(), isNodeLook(), nodeLook(), nodeStyle(), turn() (+4 more)

### Community 15 - "markdown.ts"
Cohesion: 0.08
Nodes (38): @lezer/highlight, @lezer/markdown, lineDepth(), mathDelimTag, mathTag, parseBlockMath(), dataRange(), markMoves() (+30 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (6): functionLabel(), SheetEditor, englishTyping(), serializeSheet(), sheetSize(), cloneSheet()

### Community 17 - "explainSubjects.ts"
Cohesion: 0.21
Nodes (15): explainTarget, hasCalculation(), regionToExplain(), targetAt(), SubjectKind, subjectsIn(), THEOREM_START, THEOREM_WORDS (+7 more)

### Community 18 - "numerical.ts"
Cohesion: 0.12
Nodes (48): bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial(), interpolating() (+40 more)

### Community 19 - "toLatex"
Cohesion: 0.09
Nodes (54): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+46 more)

### Community 20 - "index.ts"
Cohesion: 0.06
Nodes (44): pick(), errorName(), b, bigops, c, calculus, fn, fr (+36 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "schema/editor.ts"
Cohesion: 0.05
Nodes (61): alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ALIGN_NAMES, ARROW_NAMES (+53 more)

### Community 23 - "noteWordsMath.test.ts"
Cohesion: 0.07
Nodes (27): BLOCKS, FROM_ENGLISH, FUNCTIONS, functionWordPairs(), GRAPH_KEY_FORMS, GRAPH_KEY_LINE, GRAPH_KEYS, GraphKey (+19 more)

### Community 24 - "store.ts"
Cohesion: 0.09
Nodes (16): BoardBackend, BoardData, done(), fromRecord(), IdbBoards, ofNote(), openBoardDatabase(), openDefault() (+8 more)

### Community 25 - "Parser"
Cohesion: 0.18
Nodes (3): describe(), joinAnd(), Parser

### Community 26 - "board.ts"
Cohesion: 0.05
Nodes (50): Action, coalesced(), DOT_SIZES, DrawAction, EraseAction, EraserMode, Finger, HANDLE_REACH (+42 more)

### Community 27 - "ui/preview.ts"
Cohesion: 0.06
Nodes (36): GraphLabels, remapLineKeys(), renameGraphScope(), renameScopeKeys(), BlockKind, MoveDir, Look, Theme (+28 more)

### Community 28 - "parse.ts"
Cohesion: 0.06
Nodes (39): hasWord(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, differentialInFraction() (+31 more)

### Community 29 - "several.ts"
Cohesion: 0.08
Nodes (58): criticalLine(), isSeveralLine(), named(), severalItems(), surface(), T, Piece, severalLimit (+50 more)

### Community 30 - "gantt.ts"
Cohesion: 0.07
Nodes (68): amount(), barColor(), crossings(), dateText(), dayMonth(), dayOf(), fitText(), GanttOptions (+60 more)

### Community 31 - "study.ts"
Cohesion: 0.10
Nodes (50): isNumericalLine(), numericalItems(), multipleLabel(), names(), studyItems(), T, usesDecimalComma(), nameLatex() (+42 more)

### Community 32 - "view3d.ts"
Cohesion: 0.06
Nodes (85): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+77 more)

### Community 33 - "assistant.ts"
Cohesion: 0.13
Nodes (25): AiAnswer, AiError, AiSettings, answerSchema(), askAi(), askCompatible(), askThroughHost(), capitalized() (+17 more)

### Community 34 - "logic.ts"
Cohesion: 0.11
Nodes (30): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+22 more)

### Community 35 - "solve.ts"
Cohesion: 0.10
Nodes (41): exponentialForm(), fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), close() (+33 more)

### Community 36 - "complex.ts"
Cohesion: 0.08
Nodes (46): add(), allRoots(), arg(), asin(), atan(), compileApply(), compileComplex(), compileFunction() (+38 more)

### Community 37 - "namesIn"
Cohesion: 0.12
Nodes (39): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+31 more)

### Community 38 - "translations.test.ts"
Cohesion: 0.17
Nodes (18): AstNode, calleeName(), check(), checkPair(), visit(), children(), entryPairs(), files (+10 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (24): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+16 more)

### Community 40 - "ExplainPanel"
Cohesion: 0.15
Nodes (4): ExplainChat, ExplainPanel, preventFocusSteal(), formulasSummary()

### Community 41 - "BoardStore"
Cohesion: 0.08
Nodes (15): BoardStore, MemoryBoards, applyAccountChange(), backup(), BackupNote, backupNotes(), restoreBackup(), RestoreBoards (+7 more)

### Community 42 - "localModels.ts"
Cohesion: 0.07
Nodes (39): @mlc-ai/web-llm, chat(), GlifoError, Gpu, load(), post(), remove(), scope (+31 more)

### Community 43 - "Dove sono le cose"
Cohesion: 0.11
Nodes (29): Dove sono le cose, Glifo – architettura, answerFollowUp(), chatContext, chatSubject(), chatSystemPrompt(), engineHints(), explain() (+21 more)

### Community 44 - "functions.ts"
Cohesion: 0.06
Nodes (80): tableTopic(), valueText(), EMPTY, evaluateSheet(), number(), SheetEvaluator, T, addFormat() (+72 more)

### Community 45 - "MathError"
Cohesion: 0.11
Nodes (56): MathError, nameLabel(), UndefinedName, angleBetween(), asMatrix(), basisOf(), cross(), Ctx (+48 more)

### Community 46 - "spreadsheetEn.test.ts"
Cohesion: 0.09
Nodes (48): formulaText(), decimalsOf(), ENGLISH, englishNumber(), fixedNumber(), generalNumber(), group(), italianNumber() (+40 more)

### Community 47 - "Pt"
Cohesion: 0.19
Nodes (5): clampZoom(), pressureOf(), validView(), EllipseFit, Pt

### Community 48 - "template.ts"
Cohesion: 0.23
Nodes (9): SuggestionItem, cardPreviewTex(), formPreviewTex(), ParsedTemplate, PLACEHOLDER_TEX, placeholderPreview(), Category, CategoryId (+1 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.14
Nodes (34): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+26 more)

### Community 50 - "toolbar.ts"
Cohesion: 0.16
Nodes (15): insertBlock(), ListStyleId, Action, createToolbar(), insertCode(), insertLink(), listStyle(), MenuItem (+7 more)

### Community 51 - "sidePanel.ts"
Cohesion: 0.14
Nodes (13): AiResult, localizeTex(), cleanKatexError(), isConfidentAnswer(), symbolsInCategory(), AiState, cardPreview(), displayCode() (+5 more)

### Community 52 - "texts"
Cohesion: 0.08
Nodes (41): ExplainTone, Explanation, REPLY_TOKENS, valueNode(), MarkdownEditor, T, texHtml(), texts (+33 more)

### Community 53 - "probability.ts"
Cohesion: 0.13
Nodes (23): End, Family, CompileOptions, ExactScope, ALL, complement(), distributionOf(), endAt() (+15 more)

### Community 54 - "AiPanel"
Cohesion: 0.33
Nodes (3): NoteSubject, AiPanel, kindName()

### Community 55 - "domain.ts"
Cohesion: 0.11
Nodes (32): LayeredSolid, axesIn(), bestAlong(), boundingBox(), combine(), compileDomain(), compileMultiple(), conditionsOf() (+24 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "i18n.ts"
Cohesion: 0.05
Nodes (57): 3. Le impostazioni divise in sezioni, DEFAULT_LOCAL_MODEL, DownloadedModel, browserLang(), browserLanguages(), dateLocale(), detectLang(), Entry (+49 more)

### Community 58 - "database.ts"
Cohesion: 0.23
Nodes (6): createDatabase(), createUser(), databaseTests(), feedbackTests(), migrations, shareTests()

### Community 59 - "finite.ts"
Cohesion: 0.17
Nodes (28): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+20 more)

### Community 60 - "topics.ts"
Cohesion: 0.15
Nodes (28): ATTRIBUTES, cut(), definedName(), ER_SHAPES, fieldText(), fitLines(), flowOrder(), formulaTopic() (+20 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "Welcome to Glifo"
Cohesion: 0.20
Nodes (9): A few examples, Calculations and graphs, For programming too, Handy shortcuts, How to write formulas, Lists, Spell check, Try it now (+1 more)

### Community 63 - "spreadsheet/editor.ts"
Cohesion: 0.07
Nodes (60): sheetSummary(), currentCall(), Editing, MenuEntry, Move, openSheetEditor(), PATHS, SheetEditorOptions (+52 more)

### Community 64 - "Rational"
Cohesion: 0.11
Nodes (22): expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactRandom, exactRoot(), ExactUnavailable (+14 more)

### Community 65 - "odesolve.ts"
Cohesion: 0.08
Nodes (79): addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames(), constantParticular() (+71 more)

### Community 66 - "sheet.ts"
Cohesion: 0.08
Nodes (56): numericPartials(), OdeFunction, ExactFunction, characteristicPolynomial(), NUMERICAL, bracketParts(), BRACKETS, CHECK_VALUES (+48 more)

### Community 67 - "toNode"
Cohesion: 0.13
Nodes (30): EMPTY_SCOPE, absOf(), boundsOf(), close(), definite(), fourierProblem, fourierShown(), isTrig() (+22 more)

### Community 68 - "blockMove.ts"
Cohesion: 0.10
Nodes (35): @codemirror/commands, blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove, blockPlace() (+27 more)

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
Cohesion: 0.21
Nodes (18): DEFAULT_EDGE, SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), conceptMap(), cycle(), edge() (+10 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (63): linearIn(), primitive(), verified(), linearCells(), pairUp(), atValues(), Converter, coordinates() (+55 more)

### Community 75 - "Field"
Cohesion: 0.11
Nodes (5): eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat()

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Errore o imprevisto → nel dettaglio, 3. Serve una decisione → frasi complete, 4. Fine del compito → un solo riepilogo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "logo.ts"
Cohesion: 0.33
Nodes (6): sidebarToggle(), BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark()

### Community 79 - "NotesStore"
Cohesion: 0.07
Nodes (32): Deletion, DeletionLog, Folder, FOLDER_NAME_MAX, FolderGroup, groupByFolder(), loadClosedFolders(), RemoteFolder (+24 more)

### Community 82 - "Il database degli account (Supabase)"
Cohesion: 0.14
Nodes (13): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il controllo anti-robot (CAPTCHA, ottobre 2026), Il database degli account (Supabase), Il progetto, Il trasloco su glifo.page (ottobre 2026) (+5 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.09
Nodes (13): playwright-core, graphFile, names, namesFile, root, PNG_ICONS, centerOf(), clickOn() (+5 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.14
Nodes (14): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+6 more)

### Community 91 - "rich"
Cohesion: 0.13
Nodes (19): SyncStatus, rich(), AccountButton, accountSection(), AccountSectionDeps, confirmAccountDeletion(), messageOf(), openLoginDialog() (+11 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.10
Nodes (11): @electric-sql/pglite, device(), login(), newContext, waitFor(), b64(), CAPTCHA_TOKEN, CODE (+3 more)

### Community 97 - "schemaBlocks.ts"
Cohesion: 0.09
Nodes (28): toggleLinePrefix(), besideSchema(), BlockWidget, findWidgetBlocks(), guardBlocks(), KINDS, schemaBlockRanges(), schemaBlocks() (+20 more)

### Community 100 - "In programma"
Cohesion: 0.22
Nodes (9): Account: i propri appunti su ogni dispositivo, anche da condividere, Commenti di chi prova Glifo, Idee per il futuro, In programma, La grafica: account, impostazioni, commenti, AI e lingua (chiesto il 10 ottobre 2026, se ne parla), La lavagna: idee in più, Più avanti, Schemi: idee in più (+1 more)

### Community 101 - "files.ts"
Cohesion: 0.14
Nodes (21): cache, capability(), ClaudeRuntime, hostDownloads, HostError, inClaudeViewer(), ModelTier, runtime() (+13 more)

### Community 102 - "symbolsEn.test.ts"
Cohesion: 0.14
Nodes (28): editDistance(), singular(), stem(), STOPWORDS, words(), BOTH, buildIndex(), containsPhrase() (+20 more)

### Community 103 - "siteUpdate.ts"
Cohesion: 0.15
Nodes (19): 2. La pagina dei commenti, tipo FAQ, checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure (+11 more)

### Community 104 - "graph/file.ts"
Cohesion: 0.07
Nodes (49): FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsForFile(), graphsFromFile(), hide() (+41 more)

### Community 105 - "suggestions.ts"
Cohesion: 0.20
Nodes (7): EditorMathContext, expand(), preferredIndex(), SuggestionController, commandNames(), parseTemplate(), templateText()

### Community 106 - "package.json"
Cohesion: 0.05
Nodes (37): description, devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript (+29 more)

### Community 107 - "spellcheck.ts"
Cohesion: 0.08
Nodes (23): misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt(), openAt() (+15 more)

### Community 108 - "linsys.ts"
Cohesion: 0.08
Nodes (63): FormatOptions, Eigenvalue, LinearValue, choices(), gcd(), matrixEquation(), matrixSystem(), minorsGcd() (+55 more)

### Community 113 - "graph.ts"
Cohesion: 0.06
Nodes (44): @maxgraph/core, AT_X, cellHtml(), cellText(), COMPASS, createEdgeCell(), createGraph(), drawSchema() (+36 more)

### Community 116 - "vitest"
Cohesion: 0.05
Nodes (42): vite-plugin-pwa, vitest, GraphLabelLines, LABEL_KEYS, staticGraphSvg(), chooseWindow(), chooseBox(), formulaGraph() (+34 more)

### Community 117 - "supabase.ts"
Cohesion: 0.07
Nodes (44): @supabase/supabase-js, captchaToken(), loadTurnstile(), Turnstile, TURNSTILE_SCRIPT, Window, TURNSTILE_SITE_KEY, accountError (+36 more)

### Community 118 - "conics.ts"
Cohesion: 0.19
Nodes (28): at(), centralCanonical(), Coefficients, coneCanonical(), conicOf(), det2(), det3(), determinant() (+20 more)

### Community 119 - "tutorial.ts"
Cohesion: 0.16
Nodes (11): HINT_MS, openTutorial(), show(), richText(), showTutorialHint(), close(), T, TUTORIAL_PAGES (+3 more)

### Community 120 - "calcResults.ts"
Cohesion: 0.09
Nodes (26): @lezer/common, acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult, calcResults(), CheckWidget (+18 more)

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "selection.ts"
Cohesion: 0.14
Nodes (23): centerOn(), copyStrokes(), cross(), handleScale(), IDENTITY, insideLasso(), keepInside(), LASSO_SHARE (+15 more)

### Community 124 - "Sheet"
Cohesion: 0.07
Nodes (31): ExactComplexScope, ConicInfo, Ode, withWorkLimit(), FiniteContext, FormattedResult, MathNode, chainOf() (+23 more)

### Community 125 - "icon"
Cohesion: 0.08
Nodes (41): accountDataFile(), PullResult, openShareDialog(), changeAccess(), changeCopy(), copy(), refreshChanged(), render() (+33 more)

### Community 128 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 129 - "laplace.ts"
Cohesion: 0.16
Nodes (27): factoredPolynomial(), oneFraction(), beyondPoles(), compiled(), E, fractionShown(), HALF, inverseLaplaceShown() (+19 more)

### Community 132 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 136 - "Board"
Cohesion: 0.10
Nodes (5): Board, BoardOptions, BoardChange, Box, Stroke

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 139 - "latex.ts"
Cohesion: 0.11
Nodes (27): ACCENT_COMMANDS, diffLatex(), DISTRIBUTION_LATEX, distributionLatex(), domainLatex(), fnLatex(), fnName(), formLatex() (+19 more)

### Community 140 - ".constructor"
Cohesion: 0.18
Nodes (3): closeMathBlockOnEnter(), EditorCallbacks, searchPhrases()

### Community 141 - "xlsx.ts"
Cohesion: 0.09
Nodes (45): RFC-4180, fflate, tablesNote(), csvCell(), csvDelimiter(), csvNumbers(), csvToSheet(), digitsOf() (+37 more)

### Community 142 - "editor/lists.ts"
Cohesion: 0.10
Nodes (54): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+46 more)

### Community 143 - "feedback.ts"
Cohesion: 0.08
Nodes (44): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, Site, T, commentDate(), commentItem(), COMMENTS_MAX (+36 more)

### Community 144 - "render/lists.ts"
Cohesion: 0.14
Nodes (17): markdown-it, fakeLlmWorker(), firstVisit(), plainContext, ListStyle, bulletGroup(), Marker, sameList() (+9 more)

### Community 146 - "Glifo"
Cohesion: 0.12
Nodes (16): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Domande frequenti e commenti (+8 more)

### Community 154 - "vite"
Cohesion: 0.29
Nodes (4): vite, minutes, postMessage(), started

### Community 156 - "Glifo – note per Claude"
Cohesion: 0.18
Nodes (10): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole (+2 more)

### Community 157 - "chart.ts"
Cohesion: 0.16
Nodes (25): at(), breakEven(), Point, quantity(), T, tableItems(), textLabel(), chartData (+17 more)

### Community 158 - "gauss.ts"
Cohesion: 0.11
Nodes (24): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexLine(), isComplexValue() (+16 more)

### Community 159 - "formatNumber"
Cohesion: 0.16
Nodes (23): numberText(), endTex(), decimalSeparator(), Digits, formatNumber(), formatRational(), fromNumber(), fromRational() (+15 more)

### Community 160 - "mathEn2.test.ts"
Cohesion: 0.13
Nodes (23): FieldContext, classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX, Line, number() (+15 more)

### Community 161 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 162 - "editor/editor.ts"
Cohesion: 0.07
Nodes (38): @codemirror/lang-markdown, @codemirror/language, @codemirror/state, @codemirror/view, highlight, T, tabOutOfMath(), InsertOptions (+30 more)

### Community 163 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 166 - "I modelli e le chiavi API"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), In prova sul ramo `prova` (7 ottobre 2026): Qwen3 nel browser per «Spiegami», Le idee dello studente (5 ottobre 2026)

### Community 167 - "tools.ts"
Cohesion: 0.10
Nodes (19): ChatFn, feedback(), ALL_TOOLS, callOf(), checkTool, Identities, looseJson(), repairTex() (+11 more)

### Community 168 - "FoldersStore"
Cohesion: 0.16
Nodes (4): cleanFolderName(), FoldersStore, sameName(), names()

### Community 169 - "parseMath"
Cohesion: 0.16
Nodes (17): errorMessage(), MathSyntaxError, parseMath(), parseStatement(), error(), result(), value(), calcError() (+9 more)

### Community 170 - "strokes.ts"
Cohesion: 0.23
Nodes (13): between(), capsuleSpan(), circleSpan(), eraserGrowth(), eraseStroke(), intersect(), linearSpan(), pieceLength() (+5 more)

### Community 171 - "math/calculus.ts"
Cohesion: 0.38
Nodes (11): argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot(), fieldOn(), outward() (+3 more)

### Community 172 - "suggest.ts"
Cohesion: 0.27
Nodes (11): normalizeText(), IndexedEntry, SearchResult, getIndex(), isSubsequence(), keysOf(), MatchKind, suggestCommands() (+3 more)

### Community 173 - "aiPanel.test.ts"
Cohesion: 0.20
Nodes (8): FLOW, GRAPH_FIXED, GRAPH_STEPS, NOTE, SHEET, state(), makeView(), fullyParsed()

### Community 174 - "spreadsheet/file.ts"
Cohesion: 0.38
Nodes (6): hide(), OPEN, sheetsForFile(), sheetsFromFile(), T, unhide()

## Knowledge Gaps
- **860 isolated node(s):** `Comandi`, `Regole`, `6. Glifo anche in inglese`, `8. Il pulsante ✨ con il contorno`, `Gli abbonamenti, in tutto questo` (+855 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1173 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **40 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `texts` connect `texts` to `h`, `noteWordsGraph.test.ts`, `main.ts`, `compile`, `spec.ts`, `schemaEn.test.ts`, `graph/preview.ts`, `explain.ts`, `distributions.ts`, `latex.ts`, `svg.ts`, `parse.ts`, `editor/lists.ts`, `src/relocation.ts`, `feedback.ts`, `plan.ts`, `numerical.ts`, `toLatex`, `index.ts`, `xlsx.ts`, `schema/editor.ts`, `board.ts`, `ui/preview.ts`, `Glifo – note per Claude`, `several.ts`, `gauss.ts`, `gantt.ts`, `mathEn2.test.ts`, `assistant.ts`, `editor/editor.ts`, `study.ts`, `chart.ts`, `namesIn`, `complex.ts`, `tools.ts`, `logic.ts`, `solve.ts`, `localModels.ts`, `Dove sono le cose`, `math/calculus.ts`, `MathError`, `functions.ts`, `spreadsheet/file.ts`, `spreadsheetEn.test.ts`, `BoardStore`, `toolbar.ts`, `sidePanel.ts`, `probability.ts`, `domain.ts`, `i18n.ts`, `finite.ts`, `topics.ts`, `spreadsheet/editor.ts`, `odesolve.ts`, `sheet.ts`, `toNode`, `resize.ts`, `schema/templates.ts`, `symbolic.ts`, `NotesStore`, `rich`, `schemaBlocks.ts`, `files.ts`, `siteUpdate.ts`, `graph/file.ts`, `spellcheck.ts`, `linsys.ts`, `supabase.ts`, `conics.ts`, `tutorial.ts`, `calcResults.ts`, `icon`?**
  _High betweenness centrality (0.155) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `Dove sono le cose` to `h`, `noteWordsGraph.test.ts`, `main.ts`, `compile`, `spec.ts`, `num`, `graph/preview.ts`, `explain.ts`, `distributions.ts`, `src/relocation.ts`, `svg.ts`, `plan.ts`, `SchemaEditor`, `markdown.ts`, `SheetEditor`, `explainSubjects.ts`, `numerical.ts`, `toLatex`, `schema/editor.ts`, `Parser`, `board.ts`, `ui/preview.ts`, `parse.ts`, `several.ts`, `gantt.ts`, `study.ts`, `view3d.ts`, `assistant.ts`, `logic.ts`, `complex.ts`, `namesIn`, `ExplainPanel`, `BoardStore`, `localModels.ts`, `functions.ts`, `MathError`, `spreadsheetEn.test.ts`, `Pt`, `board/shapes.ts`, `toolbar.ts`, `sidePanel.ts`, `texts`, `AiPanel`, `domain.ts`, `i18n.ts`, `finite.ts`, `topics.ts`, `spreadsheet/editor.ts`, `Rational`, `odesolve.ts`, `sheet.ts`, `toNode`, `blockMove.ts`, `symbolic.ts`, `logo.ts`, `NotesStore`, `tutorial.mjs`, `rich`, `schemaBlocks.ts`, `files.ts`, `siteUpdate.ts`, `graph/file.ts`, `linsys.ts`, `graph.ts`, `vitest`, `supabase.ts`, `tutorial.ts`, `calcResults.ts`, `selection.ts`, `Sheet`, `icon`, `Board`, `.constructor`, `xlsx.ts`, `feedback.ts`, `render/lists.ts`, `chart.ts`, `gauss.ts`, `strokes.ts`, `math/calculus.ts`, `aiPanel.test.ts`?**
  _High betweenness centrality (0.098) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `h`, `noteWordsGraph.test.ts`, `main.ts`, `sync.ts`, `schemaEn.test.ts`, `num`, `distributions.ts`, `src/relocation.ts`, `svg.ts`, `plan.ts`, `editor/lists.ts`, `feedback.ts`, `markdown.ts`, `xlsx.ts`, `schema/editor.ts`, `noteWordsMath.test.ts`, `store.ts`, `board.ts`, `ui/preview.ts`, `parse.ts`, `chart.ts`, `gantt.ts`, `view3d.ts`, `assistant.ts`, `editor/editor.ts`, `mathEn2.test.ts`, `translations.test.ts`, `tools.ts`, `resize.ts`, `parseMath`, `strokes.ts`, `Dove sono le cose`, `localModels.ts`, `aiPanel.test.ts`, `MathError`, `BoardStore`, `spreadsheetEn.test.ts`, `board/shapes.ts`, `template.ts`, `texts`, `i18n.ts`, `database.ts`, `spreadsheet/editor.ts`, `blockMove.ts`, `logo.ts`, `NotesStore`, `schemaBlocks.ts`, `symbolsEn.test.ts`, `siteUpdate.ts`, `graph/file.ts`, `package.json`, `spellcheck.ts`, `linsys.ts`, `supabase.ts`, `tutorial.ts`, `selection.ts`, `Sheet`, `icon`?**
  _High betweenness centrality (0.066) - this node is a cross-community bridge._
- **Are the 313 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `tutorialModel()`) actually correct?**
  _`Dove sono le cose` has 313 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Comandi`, `Regole`, `6. Glifo anche in inglese` to the rest of the system?**
  _860 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `h` be split into smaller, more focused modules?**
  _Cohesion score 0.062111801242236024 - nodes in this community are weakly interconnected._
- **Should `noteWordsGraph.test.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.14814814814814814 - nodes in this community are weakly interconnected._