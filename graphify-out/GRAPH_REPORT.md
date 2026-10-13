# Graph Report - matherdown  (2026-10-13)

## Corpus Check
- 341 files · ~705,699 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5492 nodes · 20127 edges · 169 communities (126 shown, 43 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 660 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `6f64c95a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- graph.ts
- noteWords.ts
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
- editor/editor.ts
- SheetEditor
- Dove sono le cose
- numerical.ts
- arithmetic.ts
- index.ts
- engine.ts
- schema/editor.ts
- noteWordsMath.test.ts
- IdbBoards
- Parser
- board.ts
- ui/preview.ts
- parse.ts
- toLatex
- gantt.ts
- study.ts
- view3d.ts
- assistant.ts
- logic.ts
- schemaTools.test.ts
- complex.ts
- namesIn
- translations.test.ts
- resize.ts
- ExplainPanel
- BoardStore
- aiEn.test.ts
- vitest
- functions.ts
- MathError
- files.ts
- Pt
- sidePanel.ts
- board/shapes.ts
- toolbar.ts
- SidePanel
- .constructor
- probability.ts
- aiPanel.ts
- spreadsheet/format.ts
- 20261004091555_note_condivise.sql
- h
- database.ts
- mathEn2.test.ts
- topics.ts
- dependencies
- Welcome to Glifo
- spreadsheet/editor.ts
- Rational
- odesolve.ts
- statistics.ts
- GraphItem
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
- smoke-test.mjs
- supabase-stub.sql
- account-test.mjs
- schemaBlocks
- explainPanel.ts
- In programma
- parseGraph
- symbolsEn.test.ts
- siteUpdate.ts
- graph/file.ts
- suggestions.ts
- devDependencies
- spellcheck.ts
- laplace.ts
- schema/shapes.ts
- placeholders.ts
- captcha.ts
- scripts
- i18n.ts
- calcResults.ts
- Preview
- Le spiegazioni, come funzionano
- strokes.ts
- sheet.ts
- page.ts
- createFakeSupabase
- spreadsheetEn.test.ts
- Piano per piano
- Parser
- Board
- 20261008130026_commenti.sql
- blockMoveEditor.test.ts
- .constructor
- xlsx.ts
- editor/lists.ts
- site.ts
- markers.ts
- Glifo
- vite
- Glifo – note per Claude
- chart.ts
- PreviewCallbacks
- formatNumber
- schema/preview.ts
- Costi
- @codemirror/state
- La lavagna
- I modelli e le chiavi API
- moveBlock.ts
- linear.test.ts

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 300 edges
2. `MathError` - 151 edges
3. `Sheet` - 147 edges
4. `num()` - 145 edges
5. `MathNode` - 131 edges
6. `h()` - 125 edges
7. `mul()` - 124 edges
8. `texts` - 121 edges
9. `Board` - 117 edges
10. `compile()` - 116 edges

## Surprising Connections (you probably didn't know these)
- `Dove sono le cose` --references--> `fakeLlmWorker()`  [INFERRED]
  ARCHITETTURA.md → scripts/smoke-test.mjs
- `Dove sono le cose` --references--> `tutorialModel()`  [INFERRED]
  ARCHITETTURA.md → scripts/tutorial.mjs
- `Il controllo anti-robot (CAPTCHA, ottobre 2026)` --references--> `captchaToken()`  [INFERRED]
  supabase/README.md → src/account/captcha.ts
- `4. Più modelli per «Spiegami»` --references--> `webllmId()`  [INFERRED]
  GRAFICA.md → src/ai/localModels.ts
- `Come viene pubblicata` --references--> `dist()`  [INFERRED]
  README.md → src/board/shapes.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (169 total, 43 thin omitted)

### Community 0 - "graph.ts"
Cohesion: 0.10
Nodes (31): isLanes(), AT_X, cellText(), COMPASS, createGraph(), drawSchema(), edgeLook(), edgeStyle() (+23 more)

### Community 1 - "noteWords.ts"
Cohesion: 0.09
Nodes (37): GraphLabelLines, insertGraphBlock(), LABEL_KEYS, setGraphLabels(), monthOf(), MONTHS, MONTHS_EN, parseDate() (+29 more)

### Community 2 - "main.ts"
Cohesion: 0.03
Nodes (156): 1. «Cambia account», setCurrentAccount(), accountError, appUrl(), currentSession(), deleteAccount(), loadClient(), loginDetails() (+148 more)

### Community 3 - "compile"
Cohesion: 0.05
Nodes (82): inequalityMargin(), integralRegion, LayeredSolid, areaFor(), constantValue(), define(), argumentOrder(), compileLineIntegral() (+74 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (32): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+24 more)

### Community 5 - "spec.ts"
Cohesion: 0.04
Nodes (124): conicItems(), isConicLine(), quadricEquation(), T, FieldContext, valueLabel(), fourierItems(), isFourierLine() (+116 more)

### Community 6 - "schemaEn.test.ts"
Cohesion: 0.07
Nodes (34): @electric-sql/pglite, svg(), openSchemaEditor(), SchemaEditorOptions, hide(), OPEN, schemasFromFile(), T (+26 more)

### Community 7 - "num"
Cohesion: 0.09
Nodes (128): atIntegers(), definite(), linearTrig(), signsUp(), symbolicCoefficient(), withoutAbs(), hyperbolicToExp(), linearIn() (+120 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (41): addLabel(), boxes, cameras, complexCoord(), coord(), coordinates(), drawings, drawnViews (+33 more)

### Community 9 - "explain.ts"
Cohesion: 0.05
Nodes (78): allNames(), answerFollowUp(), bareResult(), chatContext, ChatFn, chatSubject(), chatSystemPrompt(), checkFormulas() (+70 more)

### Community 10 - "distributions.ts"
Cohesion: 0.06
Nodes (67): addExp(), choose(), continuousQuantile(), decimals(), discreteQuantile(), Distribution, exactIntervalProbability(), factorialBig() (+59 more)

### Community 11 - "src/relocation.ts"
Cohesion: 0.09
Nodes (53): accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf() (+45 more)

### Community 12 - "svg.ts"
Cohesion: 0.08
Nodes (59): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseWindow(), chooseY(), clipLines(), dataWindow() (+51 more)

### Community 13 - "plan.ts"
Cohesion: 0.16
Nodes (18): ITALIAN, NumberStyle, cellText(), columnRole(), columnsOf(), durationUnit(), isNumber(), isPlanRange() (+10 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.10
Nodes (5): SchemaEditor, withLaneContents(), createEdgeCell(), EdgeLook, serializeSchema()

### Community 15 - "editor/editor.ts"
Cohesion: 0.06
Nodes (46): description, name, private, type, version, @codemirror/autocomplete, @codemirror/commands, @codemirror/language-data (+38 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (4): SheetEditor, serializeSheet(), CellRange, cloneSheet()

### Community 17 - "Dove sono le cose"
Cohesion: 0.11
Nodes (34): Dove sono le cose, Glifo – architettura, explainTarget, fieldText(), flowOrder(), listText(), readSchema(), schemaLabel() (+26 more)

### Community 18 - "numerical.ts"
Cohesion: 0.12
Nodes (47): bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial(), interpolating() (+39 more)

### Community 19 - "arithmetic.ts"
Cohesion: 0.10
Nodes (45): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+37 more)

### Community 20 - "index.ts"
Cohesion: 0.06
Nodes (45): b, bigops, c, calculus, fn, fr, fractions, functions (+37 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "schema/editor.ts"
Cohesion: 0.05
Nodes (50): schemaSummary(), ALIGN, ALIGN_NAMES, ARROW_NAMES, AT_ICONS, AT_NAMES, BASE_PRESETS, BIG_ARROWS (+42 more)

### Community 23 - "noteWordsMath.test.ts"
Cohesion: 0.11
Nodes (17): args(), AstNode, childrenOf(), DATA, ENGLISH, englishTexts(), FUNCTIONS, isNode() (+9 more)

### Community 24 - "IdbBoards"
Cohesion: 0.07
Nodes (14): fake-indexeddb, BoardBackend, done(), fromRecord(), IdbBoards, ofNote(), openBoardDatabase(), openDefault() (+6 more)

### Community 26 - "board.ts"
Cohesion: 0.07
Nodes (47): Action, DOT_SIZES, DrawAction, EraseAction, EraserMode, HANDLE_REACH, ICON, MODE_NAMES (+39 more)

### Community 27 - "ui/preview.ts"
Cohesion: 0.17
Nodes (16): BlockKind, MoveDir, fill(), hydrateSheets(), T, BLOCK_NAMES, blockHiddenMessage(), blockKindOf() (+8 more)

### Community 28 - "parse.ts"
Cohesion: 0.04
Nodes (61): hasWord(), typedSliderValue(), errorMessage(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS (+53 more)

### Community 29 - "toLatex"
Cohesion: 0.04
Nodes (112): numShown(), sumShown(), close(), Definite, definiteIntegral(), exValue(), samples(), expSumValue() (+104 more)

### Community 30 - "gantt.ts"
Cohesion: 0.05
Nodes (75): searchPhrases(), amount(), barColor(), crossings(), dateText(), dayMonth(), dayOf(), fitText() (+67 more)

### Community 31 - "study.ts"
Cohesion: 0.08
Nodes (64): nameLatex(), limit(), splitRoot(), isStandardUnknown(), RelOp, breaks(), cubeRoot(), equation() (+56 more)

### Community 32 - "view3d.ts"
Cohesion: 0.06
Nodes (91): staticGraphSvg(), addMesh(), addTet(), affinePlane(), Axis, Box, centroid(), chooseBox() (+83 more)

### Community 33 - "assistant.ts"
Cohesion: 0.09
Nodes (30): @anthropic-ai/sdk, AiAnswer, AiError, AiSettings, answerSchema(), askAi(), askCompatible(), askThroughHost() (+22 more)

### Community 34 - "logic.ts"
Cohesion: 0.11
Nodes (29): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+21 more)

### Community 35 - "schemaTools.test.ts"
Cohesion: 0.12
Nodes (26): laneOf(), alignBoxes(), Alignment, Box, distributeBoxes(), Position, base64(), cellHtml() (+18 more)

### Community 36 - "complex.ts"
Cohesion: 0.04
Nodes (87): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexLine(), isComplexValue() (+79 more)

### Community 37 - "namesIn"
Cohesion: 0.10
Nodes (45): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+37 more)

### Community 38 - "translations.test.ts"
Cohesion: 0.17
Nodes (18): AstNode, calleeName(), check(), checkPair(), visit(), children(), entryPairs(), files (+10 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (24): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+16 more)

### Community 40 - "ExplainPanel"
Cohesion: 0.15
Nodes (6): modelName(), inClaudeViewer(), ExplainChat, ExplainPanel, preventFocusSteal(), formulasSummary()

### Community 41 - "BoardStore"
Cohesion: 0.09
Nodes (13): BoardStore, MemoryBoards, BackupNote, backupNotes(), restoreBackup(), RestoreBoards, Restored, restoredMessage() (+5 more)

### Community 42 - "aiEn.test.ts"
Cohesion: 0.06
Nodes (41): @mlc-ai/web-llm, EXPLAIN_TONES, chat(), GlifoError, Gpu, load(), post(), remove() (+33 more)

### Community 43 - "vitest"
Cohesion: 0.12
Nodes (19): vitest, renameGraphScope(), renameScopeKeys(), moveAttrs(), renderTexOrError(), renderTexWithResult(), configurePurify(), createMarkdownIt() (+11 more)

### Community 44 - "functions.ts"
Cohesion: 0.07
Nodes (67): EMPTY, evaluateSheet(), number(), SheetEvaluator, T, addFormat(), divFormat(), mulFormat() (+59 more)

### Community 45 - "MathError"
Cohesion: 0.16
Nodes (43): MathError, angleBetween(), asMatrix(), basisOf(), cross(), Ctx, determinant(), dims() (+35 more)

### Community 46 - "files.ts"
Cohesion: 0.15
Nodes (17): loadDialect(), canWriteFilesDirectly(), downloadBlob(), downloadText(), fileNameFor(), FsWindow, isAbort(), mdTypes() (+9 more)

### Community 47 - "Pt"
Cohesion: 0.10
Nodes (13): clampZoom(), coalesced(), Finger, LassoAction, MoveAction, pointsOf(), pressureOf(), validView() (+5 more)

### Community 48 - "sidePanel.ts"
Cohesion: 0.15
Nodes (20): AiResult, SuggestionItem, localizeTex(), cleanKatexError(), CATEGORIES, cardPreviewTex(), formPreviewTex(), ParsedTemplate (+12 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.14
Nodes (34): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+26 more)

### Community 50 - "toolbar.ts"
Cohesion: 0.10
Nodes (25): insertBlock(), InsertOptions, insertTemplate(), templateInsertion(), toggleLinePrefix(), wrapSelection(), ListStyleId, besideSchema() (+17 more)

### Community 51 - "SidePanel"
Cohesion: 0.19
Nodes (5): formulaAtCursor(), isConfidentAnswer(), symbolsInCategory(), preventFocusSteal(), SidePanel

### Community 53 - "probability.ts"
Cohesion: 0.13
Nodes (24): End, Family, CompileOptions, ExactScope, ALL, complement(), distributionOf(), endAt() (+16 more)

### Community 54 - "aiPanel.ts"
Cohesion: 0.17
Nodes (14): definedName(), formulaTopic(), graphTopic(), studyOf(), theoremTopic(), NoteSubject, SubjectKind, AiPanel (+6 more)

### Community 55 - "spreadsheet/format.ts"
Cohesion: 0.10
Nodes (25): pick(), decimalsOf(), ENGLISH, englishNumber(), fixedNumber(), GENERAL, generalNumber(), group() (+17 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "h"
Cohesion: 0.03
Nodes (113): 3. Le impostazioni divise in sezioni, SyncStatus, DownloadedModel, AI_SERVICES, aiService, T, T, rich() (+105 more)

### Community 58 - "database.ts"
Cohesion: 0.23
Nodes (6): createDatabase(), createUser(), databaseTests(), feedbackTests(), migrations, shareTests()

### Community 59 - "mathEn2.test.ts"
Cohesion: 0.13
Nodes (34): EMPTY_COMPLEX_SCOPE, countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots() (+26 more)

### Community 60 - "topics.ts"
Cohesion: 0.08
Nodes (43): ATTRIBUTES, cut(), ER_SHAPES, fitLines(), formulaText(), FREE_NAMES, readSheet(), T (+35 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "Welcome to Glifo"
Cohesion: 0.20
Nodes (9): A few examples, Calculations and graphs, For programming too, Handy shortcuts, How to write formulas, Lists, Spell check, Try it now (+1 more)

### Community 63 - "spreadsheet/editor.ts"
Cohesion: 0.10
Nodes (46): currentCall(), Editing, MenuEntry, Move, PATHS, SheetEditorOptions, Snapshot, T (+38 more)

### Community 64 - "Rational"
Cohesion: 0.07
Nodes (49): Part, at(), centralCanonical(), Coefficients, coneCanonical(), conicOf(), det2(), det3() (+41 more)

### Community 65 - "odesolve.ts"
Cohesion: 0.07
Nodes (54): Piece, addWave(), arrange(), compiled(), Condition, constantNames(), equalities(), factorial() (+46 more)

### Community 66 - "statistics.ts"
Cohesion: 0.15
Nodes (32): dataOf(), isVector(), Lin, statisticOf(), check(), correlation(), count(), covariance() (+24 more)

### Community 67 - "GraphItem"
Cohesion: 0.13
Nodes (16): criticalLine(), isSeveralLine(), named(), severalItems(), surface(), T, GraphItem, bounded() (+8 more)

### Community 68 - "blockMove.ts"
Cohesion: 0.21
Nodes (16): blank(), blockPlace(), closeIdx(), findBlock(), invisible(), markMoves(), MOVABLE, moveFencedBlock() (+8 more)

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
Cohesion: 0.22
Nodes (9): 2. La pagina dei commenti, tipo FAQ, 4. Più modelli per «Spiegami», 5. A cosa serve la chiave dell'AI, 6. Glifo anche in inglese, 7. Via il registro dei tocchi, 8. Il pulsante ✨ con il contorno, Gli abbonamenti, in tutto questo, In che ordine (+1 more)

### Community 73 - "schema/templates.ts"
Cohesion: 0.23
Nodes (17): SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), conceptMap(), cycle(), edge(), er() (+9 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (60): letters(), primitive(), verified(), linearCells(), Converter, coordinates(), decimalText(), definiteParts() (+52 more)

### Community 75 - "Field"
Cohesion: 0.11
Nodes (8): characteristicPolynomial(), eigenvalues(), eigenvectors(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn()

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
Cohesion: 0.04
Nodes (40): Deletion, DeletionLog, cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder() (+32 more)

### Community 82 - "Il database degli account (Supabase)"
Cohesion: 0.15
Nodes (12): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il controllo anti-robot (CAPTCHA, ottobre 2026), Il database degli account (Supabase), Il progetto, Il trasloco su glifo.page (ottobre 2026) (+4 more)

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

### Community 97 - "schemaBlocks"
Cohesion: 0.18
Nodes (8): BlockWidget, findWidgetBlocks(), guardBlocks(), schemaBlocks(), create(), setup(), setup(), setup()

### Community 98 - "explainPanel.ts"
Cohesion: 0.13
Nodes (20): Explanation, FollowUp, REPLY_TOKENS, MarkdownEditor, Settings, AI_NEWS_TITLE, AI_WORKING_TITLE, aiActivity (+12 more)

### Community 100 - "In programma"
Cohesion: 0.18
Nodes (10): Promemoria per lo studente, Account: i propri appunti su ogni dispositivo, anche da condividere, Commenti di chi prova Glifo, Idee per il futuro, In programma, La grafica: account, impostazioni, commenti, AI e lingua (chiesto il 10 ottobre 2026, se ne parla), La lavagna: idee in più, Più avanti (+2 more)

### Community 101 - "parseGraph"
Cohesion: 0.11
Nodes (16): parseGraph(), PALETTES, light, text(), item(), light, result(), light (+8 more)

### Community 102 - "symbolsEn.test.ts"
Cohesion: 0.12
Nodes (38): editDistance(), normalizeText(), singular(), stem(), STOPWORDS, words(), BOTH, buildIndex() (+30 more)

### Community 103 - "siteUpdate.ts"
Cohesion: 0.15
Nodes (19): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, loadPart() (+11 more)

### Community 104 - "graph/file.ts"
Cohesion: 0.08
Nodes (47): FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsForFile(), graphsFromFile(), hide() (+39 more)

### Community 105 - "suggestions.ts"
Cohesion: 0.22
Nodes (4): EditorMathContext, expand(), preferredIndex(), SuggestionController

### Community 106 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

### Community 107 - "spellcheck.ts"
Cohesion: 0.08
Nodes (24): @codemirror/lang-markdown, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt() (+16 more)

### Community 108 - "laplace.ts"
Cohesion: 0.06
Nodes (85): factoredPolynomial(), oneFraction(), beyondPoles(), compiled(), E, exp(), fractionShown(), HALF (+77 more)

### Community 113 - "schema/shapes.ts"
Cohesion: 0.08
Nodes (17): @maxgraph/core, ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape (+9 more)

### Community 116 - "placeholders.ts"
Cohesion: 0.14
Nodes (12): addPlaceholders, buildDecorations(), clearAllPlaceholders(), clearPlaceholders, contains(), currentIndex(), filledMark, getPlaceholders() (+4 more)

### Community 117 - "captcha.ts"
Cohesion: 0.21
Nodes (8): captchaToken(), loadTurnstile(), Turnstile, TURNSTILE_SCRIPT, Window, TURNSTILE_SITE_KEY, accountFailure(), Options

### Community 118 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 119 - "i18n.ts"
Cohesion: 0.06
Nodes (46): DEFAULT_LOCAL_MODEL, browserLang(), browserLanguages(), dateLocale(), detectLang(), Entry, isLang(), lang (+38 more)

### Community 120 - "calcResults.ts"
Cohesion: 0.09
Nodes (26): acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult, calcResults(), CheckWidget, insertResult() (+18 more)

### Community 121 - "Preview"
Cohesion: 0.21
Nodes (3): hidden(), Preview, setup()

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "strokes.ts"
Cohesion: 0.09
Nodes (38): centerOn(), copyStrokes(), cross(), IDENTITY, insideLasso(), keepInside(), LASSO_SHARE, lassoed() (+30 more)

### Community 124 - "sheet.ts"
Cohesion: 0.06
Nodes (54): numericPartials(), ExactComplexScope, ConicInfo, Ode, OdeFunction, withWorkLimit(), ExactFunction, FiniteContext (+46 more)

### Community 125 - "page.ts"
Cohesion: 0.04
Nodes (67): @supabase/supabase-js, AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), call(), emailLinkToken(), ensureSessionOf() (+59 more)

### Community 128 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 129 - "spreadsheetEn.test.ts"
Cohesion: 0.16
Nodes (30): functionLabel(), readEnglishInput(), readInput(), BinOp, COMPARE, englishFormula(), ERRORS_BY_LENGTH, formulaBody() (+22 more)

### Community 132 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 139 - "blockMoveEditor.test.ts"
Cohesion: 0.25
Nodes (12): blockMoveTransaction(), closed(), contentHash(), fenceClosed(), fenceName(), parseBlocks(), apply(), blocks() (+4 more)

### Community 141 - "xlsx.ts"
Cohesion: 0.09
Nodes (40): RFC-4180, fflate, csvCell(), csvDelimiter(), csvNumbers(), csvToSheet(), digitsOf(), field() (+32 more)

### Community 142 - "editor/lists.ts"
Cohesion: 0.15
Nodes (35): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+27 more)

### Community 143 - "site.ts"
Cohesion: 0.24
Nodes (5): vite-plugin-pwa, accountOffMessage(), T, defineFor(), MAIN_BRANCH

### Community 144 - "markers.ts"
Cohesion: 0.12
Nodes (34): ListStyle, bullet(), bulletGroup(), childMarker(), column(), firstMarker(), label(), lettersMarker() (+26 more)

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
Cohesion: 0.14
Nodes (29): at(), breakEven(), dataLine(), dataRange(), Point, quantity(), T, tableItems() (+21 more)

### Community 159 - "formatNumber"
Cohesion: 0.11
Nodes (33): numberText(), decimalSeparator(), formatNumber(), formatRational(), fromNumber(), fromRational(), writeDigits(), circleText() (+25 more)

### Community 160 - "schema/preview.ts"
Cohesion: 0.27
Nodes (9): Look, Theme, draw(), drawCached(), drawn, errorHtml(), pending, PreviewLook (+1 more)

### Community 161 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 162 - "@codemirror/state"
Cohesion: 0.11
Nodes (21): @codemirror/language, @codemirror/state, @lezer/common, closeMathBlockOnEnter(), tabOutOfMath(), CODE_NODES, CommandToken, commandTokenAt() (+13 more)

### Community 163 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 166 - "I modelli e le chiavi API"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), In prova sul ramo `prova` (7 ottobre 2026): Qwen3 nel browser per «Spiegami», Le idee dello studente (5 ottobre 2026)

### Community 167 - "moveBlock.ts"
Cohesion: 0.29
Nodes (4): blockMoved, LineMap, BlockMove, MoveFailure

### Community 168 - "linear.test.ts"
Cohesion: 0.33
Nodes (6): EXACT, A, B, q(), result(), text()

## Knowledge Gaps
- **852 isolated node(s):** `session-start.sh script`, `name`, `private`, `version`, `description` (+847 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1166 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **43 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `texts` connect `h` to `noteWords.ts`, `main.ts`, `compile`, `spreadsheetEn.test.ts`, `spec.ts`, `schemaEn.test.ts`, `graph/preview.ts`, `explain.ts`, `distributions.ts`, `src/relocation.ts`, `svg.ts`, `plan.ts`, `editor/lists.ts`, `editor/editor.ts`, `site.ts`, `xlsx.ts`, `numerical.ts`, `arithmetic.ts`, `index.ts`, `schema/editor.ts`, `board.ts`, `ui/preview.ts`, `parse.ts`, `chart.ts`, `gantt.ts`, `toLatex`, `study.ts`, `assistant.ts`, `logic.ts`, `schemaTools.test.ts`, `complex.ts`, `namesIn`, `schema/preview.ts`, `resize.ts`, `BoardStore`, `aiEn.test.ts`, `functions.ts`, `MathError`, `files.ts`, `sidePanel.ts`, `toolbar.ts`, `probability.ts`, `aiPanel.ts`, `spreadsheet/format.ts`, `mathEn2.test.ts`, `topics.ts`, `spreadsheet/editor.ts`, `Rational`, `odesolve.ts`, `statistics.ts`, `GraphItem`, `schema/templates.ts`, `symbolic.ts`, `NotesStore`, `explainPanel.ts`, `siteUpdate.ts`, `graph/file.ts`, `spellcheck.ts`, `laplace.ts`, `i18n.ts`, `calcResults.ts`, `sheet.ts`, `page.ts`?**
  _High betweenness centrality (0.125) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `Dove sono le cose` to `graph.ts`, `noteWords.ts`, `main.ts`, `compile`, `spreadsheetEn.test.ts`, `spec.ts`, `num`, `Board`, `explain.ts`, `graph/preview.ts`, `src/relocation.ts`, `.constructor`, `svg.ts`, `distributions.ts`, `blockMoveEditor.test.ts`, `SchemaEditor`, `site.ts`, `numerical.ts`, `arithmetic.ts`, `xlsx.ts`, `SheetEditor`, `schema/editor.ts`, `Parser`, `board.ts`, `ui/preview.ts`, `parse.ts`, `chart.ts`, `gantt.ts`, `toLatex`, `view3d.ts`, `assistant.ts`, `logic.ts`, `study.ts`, `complex.ts`, `namesIn`, `schemaTools.test.ts`, `PreviewCallbacks`, `ExplainPanel`, `BoardStore`, `aiEn.test.ts`, `vitest`, `functions.ts`, `MathError`, `Pt`, `sidePanel.ts`, `board/shapes.ts`, `toolbar.ts`, `SidePanel`, `aiPanel.ts`, `h`, `mathEn2.test.ts`, `topics.ts`, `spreadsheet/editor.ts`, `Rational`, `odesolve.ts`, `plan.ts`, `GraphItem`, `blockMove.ts`, `symbolic.ts`, `logo.ts`, `NotesStore`, `tutorial.mjs`, `smoke-test.mjs`, `schemaBlocks`, `explainPanel.ts`, `parseGraph`, `siteUpdate.ts`, `graph/file.ts`, `laplace.ts`, `schema/shapes.ts`, `i18n.ts`, `calcResults.ts`, `Preview`, `strokes.ts`, `sheet.ts`, `page.ts`?**
  _High betweenness centrality (0.112) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `noteWords.ts`, `main.ts`, `spreadsheetEn.test.ts`, `schemaEn.test.ts`, `num`, `explain.ts`, `distributions.ts`, `src/relocation.ts`, `blockMoveEditor.test.ts`, `svg.ts`, `editor/lists.ts`, `editor/editor.ts`, `site.ts`, `markers.ts`, `plan.ts`, `xlsx.ts`, `noteWordsMath.test.ts`, `IdbBoards`, `board.ts`, `parse.ts`, `chart.ts`, `gantt.ts`, `toLatex`, `view3d.ts`, `assistant.ts`, `@codemirror/state`, `schemaTools.test.ts`, `namesIn`, `translations.test.ts`, `resize.ts`, `linear.test.ts`, `BoardStore`, `aiEn.test.ts`, `sidePanel.ts`, `board/shapes.ts`, `toolbar.ts`, `h`, `database.ts`, `mathEn2.test.ts`, `topics.ts`, `spreadsheet/editor.ts`, `GraphItem`, `logo.ts`, `NotesStore`, `explainPanel.ts`, `parseGraph`, `symbolsEn.test.ts`, `siteUpdate.ts`, `graph/file.ts`, `spellcheck.ts`, `laplace.ts`, `captcha.ts`, `i18n.ts`, `strokes.ts`, `sheet.ts`, `page.ts`?**
  _High betweenness centrality (0.065) - this node is a cross-community bridge._
- **Are the 299 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `tutorialModel()`) actually correct?**
  _`Dove sono le cose` has 299 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `name`, `private` to the rest of the system?**
  _852 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `graph.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09805735430157261 - nodes in this community are weakly interconnected._
- **Should `noteWords.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08826945412311266 - nodes in this community are weakly interconnected._