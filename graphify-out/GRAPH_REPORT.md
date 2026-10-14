# Graph Report - Glifo  (2026-10-14)

## Corpus Check
- 346 files · ~724,006 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5567 nodes · 20337 edges · 167 communities (128 shown, 39 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 670 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `6dfde6d0`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- i18n.ts
- local.ts
- main.ts
- compile
- sync.ts
- spec.ts
- BoardStore
- num
- graph/preview.ts
- Dove sono le cose
- distributions.ts
- NotesStore
- svg.ts
- mul
- SchemaEditor
- editor/editor.ts
- SheetEditor
- src/relocation.ts
- numericalGraph.ts
- arithmetic.ts
- index.ts
- engine.ts
- schema/editor.ts
- .run
- IdbBoards
- parse.ts
- board.ts
- ui/preview.ts
- sidePanel.ts
- toLatex
- gantt.ts
- study.ts
- GraphItem
- assistant.ts
- logic.ts
- usesDecimalComma
- complex.ts
- namesIn
- translations.test.ts
- resize.ts
- graph/space.ts
- calcResults.ts
- localModels.ts
- noteWordsMath.test.ts
- functions.ts
- MathError
- topics.ts
- .constructor
- view3d.ts
- board/shapes.ts
- editor/lists.ts
- suggestions.ts
- editor.test.ts
- icon
- linsys.ts
- dom.ts
- 20261004091555_note_condivise.sql
- .renderFormat
- Glifo
- finite.ts
- h
- dependencies
- Welcome to Glifo
- spreadsheet/editor.ts
- gauss.ts
- odesolve.ts
- sheet.ts
- schemaEn.test.ts
- blockMove.ts
- Benvenuto in Glifo
- compilerOptions
- regions.ts
- Pt
- plan.ts
- symbolic.ts
- MarkdownEditor
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- devDependencies
- ui/relocation.ts
- session-start.sh
- .claude/CLAUDE.md
- Il database degli account (Supabase)
- tutorial.mjs
- Abbonamenti
- aiEn.test.ts
- planPreview.ts
- supabase-stub.sql
- account-test.mjs
- toolbar.ts
- FoldersStore
- In programma
- sql.ts
- symbolsEn.test.ts
- schemaTools.test.ts
- vitest
- aiPanel.test.ts
- domain.ts
- @codemirror/state
- rich
- graph.ts
- markdown.ts
- supabase.ts
- Rational
- conicOf
- explainPanel.ts
- tutorial.ts
- Le spiegazioni, come funzionano
- strokes.ts
- Sheet
- dialog.ts
- labels.ts
- spreadsheet/format.ts
- Piano per piano
- Parser
- Board
- 20261008130026_commenti.sql
- siteUpdate.ts
- shapeNode
- xlsx.ts
- schema/templates.ts
- texts
- captcha.ts
- smoke-test.mjs
- L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota
- Glifo – note per Claude
- symbols
- database.ts
- vite.config.ts
- vite
- Costi
- numerical.test.ts
- linearTrig
- BoardOptions

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 312 edges
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

## Communities (167 total, 39 thin omitted)

### Community 0 - "i18n.ts"
Cohesion: 0.05
Nodes (51): DownloadedModel, gpuF16(), MODEL_LICENSES, ModelGroup, modelVariant, AI_SERVICES, browserLang(), browserLanguages() (+43 more)

### Community 1 - "local.ts"
Cohesion: 0.12
Nodes (14): glifoError(), LocalAbort, localErrorMessage(), localLlm, Pending, T, WorkerLike, ChatMessage (+6 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (110): newStrokeId(), addToGraphBlock(), account, ACCOUNT_OFF, active, aiShown(), aiToggle, aiWork (+102 more)

### Community 3 - "compile"
Cohesion: 0.04
Nodes (102): conicItems(), criticalLine(), named(), severalItems(), surface(), T, areaFor(), constantValue() (+94 more)

### Community 4 - "sync.ts"
Cohesion: 0.07
Nodes (30): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+22 more)

### Community 5 - "spec.ts"
Cohesion: 0.06
Nodes (70): isConicLine(), quadricEquation(), isFourierLine(), isSeveralLine(), areaOf(), AXES, complexValue(), condLabel() (+62 more)

### Community 6 - "BoardStore"
Cohesion: 0.08
Nodes (15): BoardStore, MemoryBoards, applyAccountChange(), backup(), BackupNote, backupNotes(), restoreBackup(), RestoreBoards (+7 more)

### Community 7 - "num"
Cohesion: 0.15
Nodes (64): polyEx(), homogeneousGroups(), algebraic(), bigGcd(), byParts(), candidates(), canon(), combineLogs() (+56 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (44): addLabel(), boxes, cameras, complexCoord(), coord(), coordinates(), drawings, drawnViews (+36 more)

### Community 9 - "Dove sono le cose"
Cohesion: 0.06
Nodes (77): 1. A cosa serve l'AI dei modelli di frontiera, Dove sono le cose, Glifo – architettura, allNames(), answerFollowUp(), bareResult(), chained(), chatContext (+69 more)

### Community 10 - "distributions.ts"
Cohesion: 0.06
Nodes (70): isTestLine(), number(), T, testItems(), choose(), continuousQuantile(), decimals(), discreteQuantile() (+62 more)

### Community 11 - "NotesStore"
Cohesion: 0.08
Nodes (31): Deletion, DeletionLog, Folder, FOLDER_NAME_MAX, FolderGroup, groupByFolder(), loadClosedFolders(), RemoteFolder (+23 more)

### Community 12 - "svg.ts"
Cohesion: 0.08
Nodes (60): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseWindow(), chooseY(), clipLines(), dataWindow() (+52 more)

### Community 13 - "mul"
Cohesion: 0.12
Nodes (27): exp(), hyperbolicToExp(), inverseRational(), sqrtEx(), pathLabel(), cancelLinear(), commonPositive(), deriveFn() (+19 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.10
Nodes (4): SchemaEditor, withLaneContents(), createEdgeCell(), serializeSchema()

### Community 15 - "editor/editor.ts"
Cohesion: 0.05
Nodes (53): description, name, private, scripts, build, dev, preview, test (+45 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (9): functionLabel(), SheetEditor, englishTyping(), serializeSheet(), sheetSize(), CellRange, clearRange(), cloneSheet() (+1 more)

### Community 17 - "src/relocation.ts"
Cohesion: 0.06
Nodes (80): katex, accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount() (+72 more)

### Community 18 - "numericalGraph.ts"
Cohesion: 0.80
Nodes (4): isNumericalLine(), numericalItems(), isPlottedNumerical(), numericalPlot()

### Community 19 - "arithmetic.ts"
Cohesion: 0.08
Nodes (59): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+51 more)

### Community 20 - "index.ts"
Cohesion: 0.06
Nodes (46): Text, b, bigops, c, calculus, fn, fr, fractions (+38 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "schema/editor.ts"
Cohesion: 0.06
Nodes (46): alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ALIGN_NAMES, ARROW_NAMES (+38 more)

### Community 23 - ".run"
Cohesion: 0.16
Nodes (4): ExplainEvents, inClaudeViewer(), ExplainChat, scripted()

### Community 24 - "IdbBoards"
Cohesion: 0.08
Nodes (13): BoardBackend, done(), fromRecord(), IdbBoards, ofNote(), openBoardDatabase(), openDefault(), recordBytes() (+5 more)

### Community 25 - "parse.ts"
Cohesion: 0.05
Nodes (62): Line, hasWord(), errorMessage(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS (+54 more)

### Community 26 - "board.ts"
Cohesion: 0.06
Nodes (50): Action, coalesced(), DOT_SIZES, EraseAction, EraserMode, Finger, HANDLE_REACH, ICON (+42 more)

### Community 27 - "ui/preview.ts"
Cohesion: 0.09
Nodes (20): GraphLabels, BlockKind, MoveDir, hydrateSheets(), T, BLOCK_NAMES, blockHiddenMessage(), blockKindOf() (+12 more)

### Community 28 - "sidePanel.ts"
Cohesion: 0.14
Nodes (15): insertGraphBlock(), localizeTex(), cleanKatexError(), renderTex(), symbolsInCategory(), clear(), AiState, cardPreview() (+7 more)

### Community 29 - "toLatex"
Cohesion: 0.04
Nodes (131): T, FieldContext, fourierItems(), T, names(), studyItems(), T, ConicInfo (+123 more)

### Community 30 - "gantt.ts"
Cohesion: 0.06
Nodes (72): amount(), barColor(), crossings(), dateText(), dayMonth(), dayOf(), fitText(), GanttOptions (+64 more)

### Community 31 - "study.ts"
Cohesion: 0.14
Nodes (38): limit(), breaks(), periodOf(), Asymptote, asymptoteText(), compiled(), cutsOf(), defined() (+30 more)

### Community 32 - "GraphItem"
Cohesion: 0.07
Nodes (29): staticGraphSvg(), containing(), chooseBox(), GraphItem, GraphSpec, DrawOptions, DEFAULT_CAMERA, Quality (+21 more)

### Community 33 - "assistant.ts"
Cohesion: 0.09
Nodes (31): AiAnswer, AiError, AiResult, AiSettings, answerSchema(), askAi(), askCompatible(), askThroughHost() (+23 more)

### Community 34 - "logic.ts"
Cohesion: 0.11
Nodes (30): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+22 more)

### Community 35 - "usesDecimalComma"
Cohesion: 0.10
Nodes (34): numberText(), valueLabel(), endTex(), multipleLabel(), classes(), dataOf(), distributionExtent(), distributionLabel() (+26 more)

### Community 36 - "complex.ts"
Cohesion: 0.08
Nodes (46): allRoots(), arg(), asin(), atan(), compileApply(), compileComplex(), compileFunction(), compileName() (+38 more)

### Community 37 - "namesIn"
Cohesion: 0.12
Nodes (39): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+31 more)

### Community 38 - "translations.test.ts"
Cohesion: 0.17
Nodes (18): AstNode, calleeName(), check(), checkPair(), visit(), children(), entryPairs(), files (+10 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (24): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+16 more)

### Community 40 - "graph/space.ts"
Cohesion: 0.09
Nodes (59): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+51 more)

### Community 41 - "calcResults.ts"
Cohesion: 0.08
Nodes (26): @codemirror/language, @lezer/common, acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult, calcResults() (+18 more)

### Community 42 - "localModels.ts"
Cohesion: 0.07
Nodes (38): @mlc-ai/web-llm, chat(), GlifoError, Gpu, load(), post(), remove(), scope (+30 more)

### Community 43 - "noteWordsMath.test.ts"
Cohesion: 0.07
Nodes (29): BLOCKS, FROM_ENGLISH, FUNCTIONS, functionWordPairs(), GRAPH_KEY_FORMS, GRAPH_KEY_LINE, GRAPH_KEYS, graphKeyWord() (+21 more)

### Community 44 - "functions.ts"
Cohesion: 0.07
Nodes (67): EMPTY, evaluateSheet(), number(), SheetEvaluator, T, addFormat(), divFormat(), GENERAL (+59 more)

### Community 45 - "MathError"
Cohesion: 0.06
Nodes (107): MathError, UndefinedName, angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx (+99 more)

### Community 46 - "topics.ts"
Cohesion: 0.11
Nodes (41): ATTRIBUTES, cut(), ER_SHAPES, fitLines(), formulaText(), FREE_NAMES, readSheet(), T (+33 more)

### Community 48 - "view3d.ts"
Cohesion: 0.12
Nodes (26): Face, Plane, Vec3, arrowHead(), boxShape(), Coverage, DETAILS, Directions (+18 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (36): DrawAction, adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners() (+28 more)

### Community 50 - "editor/lists.ts"
Cohesion: 0.09
Nodes (63): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+55 more)

### Community 51 - "suggestions.ts"
Cohesion: 0.15
Nodes (12): EditorMathContext, expand(), preferredIndex(), SuggestionController, commandNames(), cardPreviewTex(), formPreviewTex(), ParsedTemplate (+4 more)

### Community 52 - "editor.test.ts"
Cohesion: 0.08
Nodes (24): tabOutOfMath(), templateInsertion(), commandTokenAt(), isInCode(), mathContextAt(), openMathBefore(), addPlaceholders, buildDecorations() (+16 more)

### Community 53 - "icon"
Cohesion: 0.12
Nodes (19): SyncStatus, viewSwitch, AccountButton, accountSection(), AccountSectionDeps, confirmAccountDeletion(), guestAccountSection(), shortStatus() (+11 more)

### Community 54 - "linsys.ts"
Cohesion: 0.06
Nodes (101): FormatOptions, formatRational(), nameLatex(), eigenvalues(), EXACT, FLOAT, interpolateFloat(), polynomialIn() (+93 more)

### Community 55 - "dom.ts"
Cohesion: 0.11
Nodes (12): append(), Child, formatDate(), Props, T, MenuEntry, NotesPanel, NotesPanelDeps (+4 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - ".renderFormat"
Cohesion: 0.16
Nodes (14): fieldInput(), isLanes(), cellText(), edgeLook(), edgeStyle(), edgeTextAt(), insertSchema(), nodeLook() (+6 more)

### Community 58 - "Glifo"
Cohesion: 0.12
Nodes (16): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Domande frequenti e commenti (+8 more)

### Community 59 - "finite.ts"
Cohesion: 0.17
Nodes (28): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+20 more)

### Community 60 - "h"
Cohesion: 0.11
Nodes (22): h(), ExplainPanel, preventFocusSteal(), formulasSummary(), sentenceHtml(), stepsList(), T, texHtml() (+14 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "Welcome to Glifo"
Cohesion: 0.20
Nodes (9): A few examples, Calculations and graphs, For programming too, Handy shortcuts, How to write formulas, Lists, Spell check, Try it now (+1 more)

### Community 63 - "spreadsheet/editor.ts"
Cohesion: 0.06
Nodes (68): KINDS, sheetSummary(), T, WidgetBlock, SchemaBlock, currentCall(), Editing, MenuEntry (+60 more)

### Community 64 - "gauss.ts"
Cohesion: 0.10
Nodes (27): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexLine(), isComplexValue() (+19 more)

### Community 65 - "odesolve.ts"
Cohesion: 0.08
Nodes (80): absOf(), definite(), splitAbs(), withoutAbs(), linearIn(), termTransform(), addWave(), bernoulliFamily() (+72 more)

### Community 66 - "sheet.ts"
Cohesion: 0.05
Nodes (64): ComplexFunction, OdeFunction, expSumValue(), ExactFunction, characteristicPolynomial(), Eigenvalue, Field, formatPolynomial() (+56 more)

### Community 67 - "schemaEn.test.ts"
Cohesion: 0.07
Nodes (39): schemaSummary(), svg(), openSchemaEditor(), SchemaEditorOptions, base64(), hide(), OPEN, schemasForFile() (+31 more)

### Community 68 - "blockMove.ts"
Cohesion: 0.11
Nodes (34): blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove, blockPlace(), closed() (+26 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "regions.ts"
Cohesion: 0.14
Nodes (27): constantIntegrand(), depth(), integralRegion, LayeredSolid, Multiple, multipleOf(), planeMargin(), PlanePart (+19 more)

### Community 72 - "Pt"
Cohesion: 0.17
Nodes (7): clampZoom(), MoveAction, pressureOf(), validView(), Transform, EllipseFit, Pt

### Community 73 - "plan.ts"
Cohesion: 0.07
Nodes (52): at(), breakEven(), Point, quantity(), T, tableItems(), textLabel(), graphKeyLine() (+44 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.08
Nodes (42): constant(), linearCells(), pairUp(), Converter, coordinates(), decimalText(), definiteParts(), definiteValue() (+34 more)

### Community 75 - "MarkdownEditor"
Cohesion: 0.11
Nodes (17): ExplainTone, FollowUp, REPLY_TOKENS, MarkdownEditor, Settings, AI_NEWS_TITLE, AI_WORKING_TITLE, aiActivity (+9 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Errore o imprevisto → nel dettaglio, 3. Serve una decisione → frasi complete, 4. Fine del compito → un solo riepilogo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

### Community 79 - "ui/relocation.ts"
Cohesion: 0.14
Nodes (20): sidebarToggle(), moveDayLabel(), relocationMessage(), BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark() (+12 more)

### Community 82 - "Il database degli account (Supabase)"
Cohesion: 0.15
Nodes (12): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il controllo anti-robot (CAPTCHA, ottobre 2026), Il database degli account (Supabase), Il progetto, Il trasloco su glifo.page (ottobre 2026) (+4 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.06
Nodes (20): playwright-core, graphFile, names, namesFile, root, PNG_ICONS, AFTER_MOVE, ids (+12 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.08
Nodes (26): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Deciso (5 ottobre 2026), Deciso (5 ottobre 2026) (+18 more)

### Community 91 - "aiEn.test.ts"
Cohesion: 0.14
Nodes (13): EXPLAIN_TONES, T, fieldText(), flowOrder(), listText(), readSchema(), schemaLabel(), schemaTitle() (+5 more)

### Community 92 - "planPreview.ts"
Cohesion: 0.10
Nodes (28): planSwatchSvg(), labelHtml(), planName(), planPicture, ganttWidth(), PlanView, T, GraphLook (+20 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.09
Nodes (18): @electric-sql/pglite, device(), login(), newContext, waitFor(), b64(), CAPTCHA_TOKEN, CODE (+10 more)

### Community 97 - "toolbar.ts"
Cohesion: 0.05
Nodes (35): closeMathBlockOnEnter(), EditorCallbacks, searchPhrases(), insertBlock(), InsertOptions, insertTemplate(), toggleLinePrefix(), wrapSelection() (+27 more)

### Community 98 - "FoldersStore"
Cohesion: 0.15
Nodes (4): cleanFolderName(), FoldersStore, sameName(), names()

### Community 100 - "In programma"
Cohesion: 0.25
Nodes (8): Account: i propri appunti su ogni dispositivo, anche da condividere, Idee per il futuro, In programma, L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota (14 ottobre 2026, se ne parla), La lavagna: idee in più, Più avanti, Schemi: idee in più, Trasloco: il sito su Cloudflare, con un dominio tutto di Glifo

### Community 101 - "sql.ts"
Cohesion: 0.16
Nodes (19): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+11 more)

### Community 102 - "symbolsEn.test.ts"
Cohesion: 0.10
Nodes (42): SuggestionItem, editDistance(), normalizeText(), singular(), stem(), STOPWORDS, words(), BOTH (+34 more)

### Community 103 - "schemaTools.test.ts"
Cohesion: 0.16
Nodes (20): laneOf(), cellHtml(), crc32(), svgSize(), T, withDensity(), labelHtml(), lanesHtml() (+12 more)

### Community 104 - "vitest"
Cohesion: 0.08
Nodes (42): @codemirror/view, vitest, FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsForFile() (+34 more)

### Community 105 - "aiPanel.test.ts"
Cohesion: 0.11
Nodes (22): definedName(), formulaTopic(), graphTopic(), studyOf(), theoremTopic(), NoteSubject, SubjectKind, AiPanel (+14 more)

### Community 106 - "domain.ts"
Cohesion: 0.17
Nodes (21): inequalityMargin(), axesIn(), bestAlong(), boundingBox(), combine(), compileDomain(), compileMultiple(), conditionsOf() (+13 more)

### Community 107 - "@codemirror/state"
Cohesion: 0.07
Nodes (30): @codemirror/lang-markdown, @codemirror/state, noIndentedCode, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck() (+22 more)

### Community 108 - "rich"
Cohesion: 0.16
Nodes (13): rich(), messageOf(), openLoginDialog(), codeStep(), emailStep(), privacyLink(), aboutSection(), aiFieldset() (+5 more)

### Community 113 - "graph.ts"
Cohesion: 0.05
Nodes (35): @maxgraph/core, AT_X, COMPASS, createGraph(), drawSchema(), isEdgeLook(), isNodeLook(), loadSchema() (+27 more)

### Community 116 - "markdown.ts"
Cohesion: 0.09
Nodes (39): setGraphLabels(), monthOf(), MONTHS, MONTHS_EN, parseDate(), planBlock, PlanKind, planRange() (+31 more)

### Community 117 - "supabase.ts"
Cohesion: 0.10
Nodes (35): @supabase/supabase-js, AUTH_STORAGE_KEY, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken() (+27 more)

### Community 118 - "Rational"
Cohesion: 0.09
Nodes (26): addExp(), expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactRandom, exactRoot() (+18 more)

### Community 119 - "conicOf"
Cohesion: 0.19
Nodes (21): at(), centralCanonical(), Coefficients, coneCanonical(), conicOf(), det2(), det3(), determinant() (+13 more)

### Community 120 - "explainPanel.ts"
Cohesion: 0.13
Nodes (27): explainTarget, Explanation, formulasUntil(), explanationMarkdown(), hasCalculation(), insertAfterBlock(), insertAfterText(), insertExplanation() (+19 more)

### Community 121 - "tutorial.ts"
Cohesion: 0.14
Nodes (14): helpButton, openGuide(), HINT_MS, markTutorialSeen(), openTutorial(), show(), richText(), showTutorialHint() (+6 more)

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "strokes.ts"
Cohesion: 0.09
Nodes (37): centerOn(), copyStrokes(), cross(), handleScale(), insideLasso(), keepInside(), LASSO_SHARE, lassoed() (+29 more)

### Community 124 - "Sheet"
Cohesion: 0.09
Nodes (22): ExactComplexScope, Ode, withWorkLimit(), FiniteContext, FormattedResult, MathNode, chainOf(), close() (+14 more)

### Community 125 - "dialog.ts"
Cohesion: 0.08
Nodes (36): SUPABASE_KEY, SUPABASE_URL, accountDataFile(), PullResult, openShareDialog(), changeAccess(), changeCopy(), copy() (+28 more)

### Community 128 - "labels.ts"
Cohesion: 0.16
Nodes (19): ACCENTS, BLACKBOARD, CALLIGRAPHIC, closing(), convert(), escapeXml(), FUNCTIONS, GREEK (+11 more)

### Community 129 - "spreadsheet/format.ts"
Cohesion: 0.18
Nodes (18): ENGLISH, englishNumber(), fixedNumber(), generalNumber(), group(), italianNumber(), numberFrom(), NumberParts (+10 more)

### Community 132 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 136 - "Board"
Cohesion: 0.11
Nodes (3): Board, Box, Stroke

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 139 - "siteUpdate.ts"
Cohesion: 0.18
Nodes (14): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, PartNotLoaded (+6 more)

### Community 140 - "shapeNode"
Cohesion: 0.20
Nodes (18): arrange(), constantNames(), equalities(), generalShown(), implicitShown(), isConstantName(), monomialDegree(), negate() (+10 more)

### Community 141 - "xlsx.ts"
Cohesion: 0.09
Nodes (46): RFC-4180, fflate, csvCell(), csvDelimiter(), csvNumbers(), csvToSheet(), digitsOf(), field() (+38 more)

### Community 142 - "schema/templates.ts"
Cohesion: 0.23
Nodes (17): SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), conceptMap(), cycle(), edge(), er() (+9 more)

### Community 143 - "texts"
Cohesion: 0.07
Nodes (48): texts, feedbackButton, openFeedback(), Site, T, commentDate(), commentItem(), COMMENTS_MAX (+40 more)

### Community 144 - "captcha.ts"
Cohesion: 0.21
Nodes (8): captchaToken(), loadTurnstile(), Turnstile, TURNSTILE_SCRIPT, Window, TURNSTILE_SITE_KEY, accountFailure(), Options

### Community 146 - "smoke-test.mjs"
Cohesion: 0.25
Nodes (4): markdown-it, fakeLlmWorker(), firstVisit(), plainContext

### Community 154 - "L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota"
Cohesion: 0.25
Nodes (8): 2. Dalla lavagna alla nota, 3. Da una foto alla nota, 4. Dettare: la voce diventa testo nella nota, 5. Registrare le lezioni e trascriverle, Da sistemare con il primo punto che tocca l'AI, Fonti (controllate il 14 ottobre 2026), In che ordine, L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota

### Community 156 - "Glifo – note per Claude"
Cohesion: 0.25
Nodes (8): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Regole, sqlite()

### Community 157 - "symbols"
Cohesion: 0.21
Nodes (15): combine(), commonMonomial(), degree(), denominatorPart(), denominators(), factorOut(), inOrder(), isNegative() (+7 more)

### Community 158 - "database.ts"
Cohesion: 0.23
Nodes (6): createDatabase(), createUser(), databaseTests(), feedbackTests(), migrations, shareTests()

### Community 159 - "vite.config.ts"
Cohesion: 0.25
Nodes (5): vite-plugin-pwa, accountOffMessage(), defineFor(), MAIN_BRANCH, webllmModels

### Community 160 - "vite"
Cohesion: 0.13
Nodes (11): Promemoria per lo studente, vite, Commenti di chi prova Glifo, constructor(), LlamaWorker, minutes, postMessage(), started (+3 more)

### Community 161 - "Costi"
Cohesion: 0.22
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 162 - "numerical.test.ts"
Cohesion: 0.60
Nodes (3): result(), text(), verdict()

### Community 163 - "linearTrig"
Cohesion: 0.50
Nodes (4): isTrig(), linearTrig(), laplaceEx(), laplaceTerms()

## Knowledge Gaps
- **873 isolated node(s):** `session-start.sh script`, `name`, `private`, `version`, `description` (+868 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1197 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **39 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `texts` connect `texts` to `i18n.ts`, `local.ts`, `main.ts`, `compile`, `spec.ts`, `BoardStore`, `graph/preview.ts`, `Dove sono le cose`, `distributions.ts`, `NotesStore`, `svg.ts`, `xlsx.ts`, `schema/templates.ts`, `editor/editor.ts`, `siteUpdate.ts`, `src/relocation.ts`, `arithmetic.ts`, `index.ts`, `schema/editor.ts`, `parse.ts`, `board.ts`, `ui/preview.ts`, `sidePanel.ts`, `toLatex`, `gantt.ts`, `study.ts`, `assistant.ts`, `logic.ts`, `usesDecimalComma`, `complex.ts`, `namesIn`, `resize.ts`, `calcResults.ts`, `localModels.ts`, `functions.ts`, `MathError`, `topics.ts`, `editor/lists.ts`, `icon`, `linsys.ts`, `dom.ts`, `finite.ts`, `h`, `spreadsheet/editor.ts`, `gauss.ts`, `odesolve.ts`, `sheet.ts`, `schemaEn.test.ts`, `plan.ts`, `symbolic.ts`, `MarkdownEditor`, `ui/relocation.ts`, `aiEn.test.ts`, `planPreview.ts`, `toolbar.ts`, `sql.ts`, `schemaTools.test.ts`, `vitest`, `aiPanel.test.ts`, `domain.ts`, `@codemirror/state`, `markdown.ts`, `supabase.ts`, `explainPanel.ts`, `tutorial.ts`, `dialog.ts`?**
  _High betweenness centrality (0.132) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `Dove sono le cose` to `i18n.ts`, `local.ts`, `main.ts`, `compile`, `spec.ts`, `BoardStore`, `num`, `Board`, `graph/preview.ts`, `distributions.ts`, `NotesStore`, `svg.ts`, `mul`, `SchemaEditor`, `xlsx.ts`, `SheetEditor`, `src/relocation.ts`, `smoke-test.mjs`, `arithmetic.ts`, `numericalGraph.ts`, `texts`, `schema/editor.ts`, `.run`, `parse.ts`, `board.ts`, `ui/preview.ts`, `sidePanel.ts`, `toLatex`, `gantt.ts`, `study.ts`, `GraphItem`, `assistant.ts`, `logic.ts`, `usesDecimalComma`, `complex.ts`, `namesIn`, `linearTrig`, `vite.config.ts`, `graph/space.ts`, `localModels.ts`, `functions.ts`, `MathError`, `topics.ts`, `board/shapes.ts`, `icon`, `linsys.ts`, `.renderFormat`, `finite.ts`, `h`, `siteUpdate.ts`, `spreadsheet/editor.ts`, `gauss.ts`, `odesolve.ts`, `sheet.ts`, `blockMove.ts`, `Pt`, `plan.ts`, `symbolic.ts`, `MarkdownEditor`, `ui/relocation.ts`, `tutorial.mjs`, `aiEn.test.ts`, `planPreview.ts`, `toolbar.ts`, `schemaTools.test.ts`, `vitest`, `aiPanel.test.ts`, `rich`, `graph.ts`, `markdown.ts`, `supabase.ts`, `Rational`, `explainPanel.ts`, `tutorial.ts`, `strokes.ts`, `Sheet`?**
  _High betweenness centrality (0.111) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `i18n.ts`, `local.ts`, `spec.ts`, `BoardStore`, `graph/preview.ts`, `Dove sono le cose`, `distributions.ts`, `NotesStore`, `svg.ts`, `mul`, `siteUpdate.ts`, `editor/editor.ts`, `captcha.ts`, `src/relocation.ts`, `texts`, `xlsx.ts`, `IdbBoards`, `parse.ts`, `board.ts`, `toLatex`, `gantt.ts`, `database.ts`, `GraphItem`, `assistant.ts`, `vite.config.ts`, `numerical.test.ts`, `translations.test.ts`, `resize.ts`, `graph/space.ts`, `localModels.ts`, `noteWordsMath.test.ts`, `topics.ts`, `board/shapes.ts`, `editor/lists.ts`, `suggestions.ts`, `editor.test.ts`, `linsys.ts`, `h`, `spreadsheet/editor.ts`, `schemaEn.test.ts`, `blockMove.ts`, `plan.ts`, `MarkdownEditor`, `ui/relocation.ts`, `aiEn.test.ts`, `toolbar.ts`, `sql.ts`, `symbolsEn.test.ts`, `schemaTools.test.ts`, `aiPanel.test.ts`, `@codemirror/state`, `markdown.ts`, `supabase.ts`, `Rational`, `tutorial.ts`, `strokes.ts`, `Sheet`, `dialog.ts`?**
  _High betweenness centrality (0.082) - this node is a cross-community bridge._
- **Are the 311 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `tutorialModel()`) actually correct?**
  _`Dove sono le cose` has 311 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `name`, `private` to the rest of the system?**
  _873 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `i18n.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05365296803652968 - nodes in this community are weakly interconnected._
- **Should `local.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11693548387096774 - nodes in this community are weakly interconnected._