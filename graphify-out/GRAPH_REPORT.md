# Graph Report - Glifo  (2026-10-13)

## Corpus Check
- 345 files · ~712,814 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5521 nodes · 20227 edges · 167 communities (128 shown, 39 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 667 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d9acd9eb`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- h
- noteWords.ts
- main.ts
- compile
- sync.ts
- spec.ts
- tutorial.ts
- num
- graph/preview.ts
- explain.ts
- distributions.ts
- src/relocation.ts
- svg.ts
- parse.ts
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
- i18n.ts
- markers.ts
- several.ts
- gantt.ts
- toLatex
- limits.ts
- assistant.ts
- logic.ts
- scopeWith
- complex.ts
- namesIn
- translations.test.ts
- resize.ts
- graph/space.ts
- BoardStore
- localModels.ts
- view3d.ts
- functions.ts
- MathError
- spreadsheetEn.test.ts
- Pt
- sidePanel.ts
- board/shapes.ts
- toolbar.ts
- SidePanel
- explainPanel.ts
- schema/blocks.ts
- probability.ts
- mathEn2.test.ts
- 20261004091555_note_condivise.sql
- .renderFormat
- database.ts
- finite.ts
- topics.ts
- dependencies
- Welcome to Glifo
- spreadsheet/editor.ts
- conics.ts
- odesolve.ts
- statsShown.ts
- smoke-test.mjs
- markdown.ts
- Benvenuto in Glifo
- compilerOptions
- relocation-test.mjs
- La grafica: le otto richieste del 10 ottobre 2026
- schema/templates.ts
- symbolic.ts
- Field
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- aiPanel.test.ts
- FoldersStore
- session-start.sh
- .claude/CLAUDE.md
- Il database degli account (Supabase)
- tutorial.mjs
- Abbonamenti
- explainSubjects.ts
- supabase-stub.sql
- account-test.mjs
- schemaBlocks
- plot.ts
- In programma
- sql.ts
- symbolsEn.test.ts
- siteUpdate.ts
- graph/file.ts
- SuggestionController
- .openMenu
- spellcheck.ts
- sheet.ts
- graph.ts
- vitest
- supabase.ts
- Rational
- parseSchema
- calcResults.ts
- ExplainPanel
- Le spiegazioni, come funzionano
- strokes.ts
- Sheet
- page.ts
- createFakeSupabase
- tools.ts
- Piano per piano
- Parser
- Board
- 20261008130026_commenti.sql
- severalGraph.ts
- MarkdownEditor
- xlsx.ts
- editor/lists.ts
- feedback.ts
- deploy.test.ts
- Glifo
- vite
- Glifo – note per Claude
- files.ts
- statsGraph.ts
- Costi
- editor.test.ts
- La lavagna
- .visible
- I modelli e le chiavi API
- devDependencies

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 303 edges
2. `MathError` - 151 edges
3. `Sheet` - 147 edges
4. `num()` - 145 edges
5. `h()` - 135 edges
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
- `4. Più modelli per «Spiegami»` --references--> `webllmId()`  [INFERRED]
  GRAFICA.md → src/ai/localModels.ts
- `Come viene pubblicata` --references--> `dist()`  [INFERRED]
  README.md → src/board/shapes.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (167 total, 39 thin omitted)

### Community 0 - "h"
Cohesion: 0.03
Nodes (98): 3. Le impostazioni divise in sezioni, SyncStatus, aiService, inClaudeViewer(), browserLanguages(), dateLocale(), lang, LANGUAGES (+90 more)

### Community 1 - "noteWords.ts"
Cohesion: 0.06
Nodes (61): formulaAtCursor(), GraphLabelLines, insertGraphBlock(), LABEL_KEYS, setGraphLabels(), monthOf(), MONTHS, MONTHS_EN (+53 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (117): newStrokeId(), addToGraphBlock(), remapGraphLines(), account, ACCOUNT_OFF, active, aiShown(), aiToggle (+109 more)

### Community 3 - "compile"
Cohesion: 0.08
Nodes (49): argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot(), fieldOn(), numericPartials() (+41 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (31): AccountSync, withLock(), Account, EMPTY_STATE, FolderChange, FolderRow, isEmpty(), iso() (+23 more)

### Community 5 - "spec.ts"
Cohesion: 0.06
Nodes (74): conicItems(), isConicLine(), quadricEquation(), T, fourierItems(), isFourierLine(), T, areaFor() (+66 more)

### Community 6 - "tutorial.ts"
Cohesion: 0.15
Nodes (12): HINT_MS, markTutorialSeen(), openTutorial(), show(), richText(), showTutorialHint(), close(), T (+4 more)

### Community 7 - "num"
Cohesion: 0.12
Nodes (95): atIntegers(), definite(), linearTrig(), signsUp(), symbolicCoefficient(), withoutAbs(), exp(), hyperbolicToExp() (+87 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (45): decimalText(), tickLabel(), addLabel(), boxes, cameras, complexCoord(), containing(), coord() (+37 more)

### Community 9 - "explain.ts"
Cohesion: 0.09
Nodes (55): allNames(), answerFollowUp(), bareResult(), chatContext, ChatFn, chatSubject(), chatSystemPrompt(), checkFormulas() (+47 more)

### Community 10 - "distributions.ts"
Cohesion: 0.08
Nodes (43): addExp(), choose(), continuousQuantile(), decimals(), discreteQuantile(), Distribution, exactIntervalProbability(), expSum (+35 more)

### Community 11 - "src/relocation.ts"
Cohesion: 0.08
Nodes (36): isRelocationPackage(), moveDayLabel(), NEW_ORIGIN, OLD_ORIGIN, openedForRelocation(), RECEIVE_URL, receiveFromOldSite(), RELOCATION_DATES (+28 more)

### Community 12 - "svg.ts"
Cohesion: 0.12
Nodes (33): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), gcd(), piLabel(), Polyline, ticks (+25 more)

### Community 13 - "parse.ts"
Cohesion: 0.05
Nodes (57): hasWord(), parseLine(), errorMessage(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS (+49 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.11
Nodes (3): SchemaEditor, withLaneContents(), serializeSchema()

### Community 15 - "editor/editor.ts"
Cohesion: 0.06
Nodes (42): description, name, private, type, version, @codemirror/autocomplete, @codemirror/lang-markdown, @codemirror/language-data (+34 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (10): functionLabel(), SheetEditor, SheetEditorOptions, englishTyping(), serializeSheet(), SheetModel, CellRange, clearRange() (+2 more)

### Community 17 - "Dove sono le cose"
Cohesion: 0.06
Nodes (68): Dove sono le cose, Glifo – architettura, 1. «Cambia account», accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount() (+60 more)

### Community 18 - "numerical.ts"
Cohesion: 0.10
Nodes (52): isNumericalLine(), numericalItems(), bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint() (+44 more)

### Community 19 - "arithmetic.ts"
Cohesion: 0.06
Nodes (97): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+89 more)

### Community 20 - "index.ts"
Cohesion: 0.06
Nodes (45): b, bigops, c, calculus, fn, fr, fractions, functions (+37 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "schema/editor.ts"
Cohesion: 0.05
Nodes (60): laneOf(), alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ALIGN_NAMES (+52 more)

### Community 23 - "noteWordsMath.test.ts"
Cohesion: 0.12
Nodes (15): AstNode, childrenOf(), DATA, ENGLISH, englishTexts(), FUNCTIONS, isNode(), ITALIAN (+7 more)

### Community 24 - "IdbBoards"
Cohesion: 0.08
Nodes (14): fake-indexeddb, BoardBackend, done(), fromRecord(), IdbBoards, ofNote(), openBoardDatabase(), openDefault() (+6 more)

### Community 26 - "board.ts"
Cohesion: 0.06
Nodes (44): perfect-freehand, Action, BoardOptions, DOT_SIZES, EraserMode, HANDLE_REACH, ICON, MODE_NAMES (+36 more)

### Community 27 - "i18n.ts"
Cohesion: 0.05
Nodes (43): GraphLabels, GraphLook, remapLineKeys(), renameGraphScope(), renameScopeKeys(), Entry, texts, usedBefore() (+35 more)

### Community 28 - "markers.ts"
Cohesion: 0.11
Nodes (35): Item, ListStyle, bullet(), bulletGroup(), childMarker(), column(), firstMarker(), label() (+27 more)

### Community 29 - "several.ts"
Cohesion: 0.06
Nodes (75): EMPTY_SCOPE, absOf(), boundsOf(), close(), fourierProblem, fourierShown(), isTrig(), isZero() (+67 more)

### Community 30 - "gantt.ts"
Cohesion: 0.05
Nodes (90): searchPhrases(), amount(), barColor(), crossings(), dateText(), dayMonth(), dayOf(), fitText() (+82 more)

### Community 31 - "toLatex"
Cohesion: 0.04
Nodes (117): names(), STUDY_GRAPH, studyItems(), T, elemOf(), Digits, FormatOptions, SUPERSCRIPT (+109 more)

### Community 32 - "limits.ts"
Cohesion: 0.20
Nodes (19): exponentialForm(), fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), alternating() (+11 more)

### Community 33 - "assistant.ts"
Cohesion: 0.09
Nodes (32): @anthropic-ai/sdk, AiAnswer, AiError, AiResult, AiSettings, answerSchema(), askAi(), askCompatible() (+24 more)

### Community 34 - "logic.ts"
Cohesion: 0.11
Nodes (30): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+22 more)

### Community 35 - "scopeWith"
Cohesion: 0.08
Nodes (52): constantIntegrand(), depth(), inequalityMargin(), integralRegion, LayeredSolid, Multiple, multipleOf(), planeMargin() (+44 more)

### Community 36 - "complex.ts"
Cohesion: 0.05
Nodes (69): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexLine(), isComplexValue() (+61 more)

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
Cohesion: 0.12
Nodes (44): sampleRegion(), addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon() (+36 more)

### Community 41 - "BoardStore"
Cohesion: 0.08
Nodes (18): BoardStore, MemoryBoards, applyAccountChange(), BackupNote, backupNotes(), restoreBackup(), RestoreBoards, Restored (+10 more)

### Community 42 - "localModels.ts"
Cohesion: 0.07
Nodes (38): @mlc-ai/web-llm, chat(), GlifoError, Gpu, load(), post(), remove(), scope (+30 more)

### Community 43 - "view3d.ts"
Cohesion: 0.09
Nodes (40): Face, planeSide(), planeTolerance(), splitFace(), splitLine(), splitPolygon(), surfacePlane(), GRAPH_WORK (+32 more)

### Community 44 - "functions.ts"
Cohesion: 0.07
Nodes (66): EMPTY, evaluateSheet(), number(), SheetEvaluator, T, addFormat(), divFormat(), GENERAL (+58 more)

### Community 45 - "MathError"
Cohesion: 0.09
Nodes (69): MathError, angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, dataOf() (+61 more)

### Community 46 - "spreadsheetEn.test.ts"
Cohesion: 0.07
Nodes (66): quantity(), pick(), hide(), OPEN, sheetsForFile(), sheetsFromFile(), T, unhide() (+58 more)

### Community 47 - "Pt"
Cohesion: 0.11
Nodes (13): clampZoom(), coalesced(), EraseAction, Finger, LassoAction, MoveAction, pointsOf(), pressureOf() (+5 more)

### Community 48 - "sidePanel.ts"
Cohesion: 0.17
Nodes (18): templateInsertion(), SuggestionItem, localizeTex(), cleanKatexError(), CATEGORIES, cardPreviewTex(), formPreviewTex(), ParsedTemplate (+10 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (37): DrawAction, adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners() (+29 more)

### Community 50 - "toolbar.ts"
Cohesion: 0.10
Nodes (26): insertBlock(), InsertOptions, toggleLinePrefix(), wrapSelection(), LIST_STYLES, ListStyleId, addPlaceholders, Placeholder (+18 more)

### Community 51 - "SidePanel"
Cohesion: 0.21
Nodes (4): symbolsInCategory(), cardPreview(), preventFocusSteal(), SidePanel

### Community 52 - "explainPanel.ts"
Cohesion: 0.09
Nodes (24): Conversation, ExplainTone, Explanation, FollowUp, REPLY_TOKENS, ChatMessage, SheetFactory, Settings (+16 more)

### Community 53 - "schema/blocks.ts"
Cohesion: 0.16
Nodes (19): graphsForFile(), hide(), markdownForFile(), findFencedBlocks(), findSchemaBlock(), findSchemaBlocks(), OpenFence, schemaBlockAtLine() (+11 more)

### Community 54 - "probability.ts"
Cohesion: 0.14
Nodes (24): End, bound(), compileCondition(), ALL, complement(), endAt(), EventContext, eventSet() (+16 more)

### Community 55 - "mathEn2.test.ts"
Cohesion: 0.10
Nodes (38): isTestLine(), number(), T, testItems(), EMPTY_COMPLEX_SCOPE, between(), chiSquareTest(), confidence() (+30 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - ".renderFormat"
Cohesion: 0.15
Nodes (15): fieldInput(), isLanes(), cellText(), createEdgeCell(), edgeLook(), edgeStyle(), edgeTextAt(), insertSchema() (+7 more)

### Community 58 - "database.ts"
Cohesion: 0.21
Nodes (7): @electric-sql/pglite, createDatabase(), createUser(), databaseTests(), feedbackTests(), migrations, shareTests()

### Community 59 - "finite.ts"
Cohesion: 0.18
Nodes (25): countOf(), Elem, elemTex(), elemText(), EMPTY, FiniteError, FiniteResult, finiteSetOf() (+17 more)

### Community 60 - "topics.ts"
Cohesion: 0.12
Nodes (28): ATTRIBUTES, cut(), ER_SHAPES, fieldText(), fitLines(), flowOrder(), formulaText(), FREE_NAMES (+20 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "Welcome to Glifo"
Cohesion: 0.20
Nodes (9): A few examples, Calculations and graphs, For programming too, Handy shortcuts, How to write formulas, Lists, Spell check, Try it now (+1 more)

### Community 63 - "spreadsheet/editor.ts"
Cohesion: 0.08
Nodes (58): ChartTable, currentCall(), Editing, MenuEntry, Move, openSheetEditor(), PATHS, Snapshot (+50 more)

### Community 64 - "conics.ts"
Cohesion: 0.19
Nodes (28): at(), centralCanonical(), Coefficients, coneCanonical(), conicOf(), det2(), det3(), determinant() (+20 more)

### Community 65 - "odesolve.ts"
Cohesion: 0.08
Nodes (84): linearIn(), substitute(), addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled() (+76 more)

### Community 66 - "statsShown.ts"
Cohesion: 0.16
Nodes (33): check(), correlation(), count(), covariance(), Data, dataStatistic(), deviation(), fail() (+25 more)

### Community 67 - "smoke-test.mjs"
Cohesion: 0.15
Nodes (6): markdown-it, playwright-core, PNG_ICONS, fakeLlmWorker(), firstVisit(), plainContext

### Community 68 - "markdown.ts"
Cohesion: 0.06
Nodes (61): @codemirror/commands, @codemirror/language, @codemirror/state, @codemirror/view, blockLine, inlineRegion, marks, mathHighlighter (+53 more)

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
Cohesion: 0.17
Nodes (19): NodeLook, SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), tableMetrics(), conceptMap(), cycle() (+11 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.06
Nodes (62): letters(), primitive(), verified(), linearCells(), atValues(), cancelLinear(), Converter, coordinates() (+54 more)

### Community 75 - "Field"
Cohesion: 0.12
Nodes (7): characteristicPolynomial(), eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn()

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Errore o imprevisto → nel dettaglio, 3. Serve una decisione → frasi complete, 4. Fine del compito → un solo riepilogo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "aiPanel.test.ts"
Cohesion: 0.12
Nodes (19): definedName(), formulaTopic(), graphTopic(), numberText(), studyOf(), theoremTopic(), NoteSubject, SubjectKind (+11 more)

### Community 79 - "FoldersStore"
Cohesion: 0.08
Nodes (18): cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder(), loadClosedFolders(), RemoteFolder (+10 more)

### Community 82 - "Il database degli account (Supabase)"
Cohesion: 0.14
Nodes (13): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il controllo anti-robot (CAPTCHA, ottobre 2026), Il database degli account (Supabase), Il progetto, Il trasloco su glifo.page (ottobre 2026) (+5 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.11
Nodes (11): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+3 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.14
Nodes (14): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+6 more)

### Community 91 - "explainSubjects.ts"
Cohesion: 0.14
Nodes (25): explainTarget, schemaTitle(), formulasUntil(), sheetBefore(), explanationMarkdown(), hasCalculation(), insertAfterBlock(), insertAfterText() (+17 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.11
Nodes (10): device(), login(), newContext, waitFor(), b64(), CAPTCHA_TOKEN, CODE, GOOGLE_CODE (+2 more)

### Community 97 - "schemaBlocks"
Cohesion: 0.18
Nodes (8): BlockWidget, findWidgetBlocks(), guardBlocks(), schemaBlocks(), create(), setup(), setup(), setup()

### Community 98 - "plot.ts"
Cohesion: 0.15
Nodes (24): chooseWindow(), chooseY(), clipLines(), dataWindow(), domainEdge(), features(), findWindow(), jump() (+16 more)

### Community 100 - "In programma"
Cohesion: 0.22
Nodes (9): Account: i propri appunti su ogni dispositivo, anche da condividere, Commenti di chi prova Glifo, Idee per il futuro, In programma, La grafica: account, impostazioni, commenti, AI e lingua (chiesto il 10 ottobre 2026, se ne parla), La lavagna: idee in più, Più avanti, Schemi: idee in più (+1 more)

### Community 101 - "sql.ts"
Cohesion: 0.13
Nodes (21): SchemaEditorOptions, Schema, Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey() (+13 more)

### Community 102 - "symbolsEn.test.ts"
Cohesion: 0.11
Nodes (39): editDistance(), normalizeText(), singular(), stem(), STOPWORDS, words(), BOTH, buildIndex() (+31 more)

### Community 103 - "siteUpdate.ts"
Cohesion: 0.18
Nodes (14): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, PartNotLoaded (+6 more)

### Community 104 - "graph/file.ts"
Cohesion: 0.10
Nodes (37): FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsFromFile(), OPEN, swatchSvg() (+29 more)

### Community 105 - "SuggestionController"
Cohesion: 0.23
Nodes (4): EditorMathContext, expand(), preferredIndex(), SuggestionController

### Community 107 - "spellcheck.ts"
Cohesion: 0.07
Nodes (26): misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt(), openAt() (+18 more)

### Community 108 - "sheet.ts"
Cohesion: 0.05
Nodes (56): Ode, OdeFunction, expSumValue(), FiniteContext, decimalSeparator(), formatNumber(), formatRational(), fromNumber() (+48 more)

### Community 113 - "graph.ts"
Cohesion: 0.05
Nodes (42): @maxgraph/core, AT_X, cellHtml(), COMPASS, createGraph(), drawSchema(), isEdgeLook(), isNodeLook() (+34 more)

### Community 116 - "vitest"
Cohesion: 0.05
Nodes (43): vitest, staticGraphSvg(), chooseBox(), formulaGraph(), GraphItem, parseGraph(), imaginaryLabel(), DEFAULT_CAMERA (+35 more)

### Community 117 - "supabase.ts"
Cohesion: 0.07
Nodes (46): @supabase/supabase-js, captchaToken(), loadTurnstile(), Turnstile, TURNSTILE_SCRIPT, Window, TURNSTILE_SITE_KEY, accountError (+38 more)

### Community 118 - "Rational"
Cohesion: 0.11
Nodes (23): Part, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactFunction, exactRoot(), ExactScope (+15 more)

### Community 119 - "parseSchema"
Cohesion: 0.15
Nodes (13): schemaSummary(), svg(), openSchemaEditor(), isRecord(), num(), oneOf(), parseSchema(), point() (+5 more)

### Community 120 - "calcResults.ts"
Cohesion: 0.09
Nodes (27): acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult, calcResults(), CheckWidget, insertResult() (+19 more)

### Community 121 - "ExplainPanel"
Cohesion: 0.16
Nodes (4): ExplainChat, ExplainPanel, preventFocusSteal(), formulasSummary()

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "strokes.ts"
Cohesion: 0.08
Nodes (37): centerOn(), copyStrokes(), cross(), IDENTITY, insideLasso(), keepInside(), LASSO_SHARE, lassoed() (+29 more)

### Community 124 - "Sheet"
Cohesion: 0.07
Nodes (28): complex, ExactComplexScope, ConicInfo, withWorkLimit(), FormattedResult, Mat, differentialRequest, pieces() (+20 more)

### Community 125 - "page.ts"
Cohesion: 0.06
Nodes (47): accountDataFile(), PullResult, board, openShareDialog(), changeAccess(), changeCopy(), copy(), refreshChanged() (+39 more)

### Community 128 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 129 - "tools.ts"
Cohesion: 0.09
Nodes (17): ExplainEvents, ExplainStep, ALL_TOOLS, callOf(), checkTool, FormulaCheck, Identities, looseJson() (+9 more)

### Community 132 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 133 - "Parser"
Cohesion: 0.26
Nodes (4): FormulaError, Parser, cellText(), planFrom()

### Community 136 - "Board"
Cohesion: 0.11
Nodes (4): Board, Step, BoardChange, Stroke

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 139 - "severalGraph.ts"
Cohesion: 0.35
Nodes (10): criticalLine(), isSeveralLine(), named(), severalItems(), surface(), T, bounded(), extremaOf() (+2 more)

### Community 140 - "MarkdownEditor"
Cohesion: 0.16
Nodes (4): EditorCallbacks, MarkdownEditor, insertTemplate(), setup()

### Community 141 - "xlsx.ts"
Cohesion: 0.08
Nodes (47): RFC-4180, fflate, csvCell(), csvDelimiter(), csvNumbers(), csvToSheet(), digitsOf(), field() (+39 more)

### Community 142 - "editor/lists.ts"
Cohesion: 0.21
Nodes (29): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+21 more)

### Community 143 - "feedback.ts"
Cohesion: 0.07
Nodes (47): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, feedbackButton, openFeedback(), accountOffMessage(), Site, T (+39 more)

### Community 144 - "deploy.test.ts"
Cohesion: 0.33
Nodes (3): vite-plugin-pwa, defineFor(), MAIN_BRANCH

### Community 146 - "Glifo"
Cohesion: 0.12
Nodes (16): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Domande frequenti e commenti (+8 more)

### Community 154 - "vite"
Cohesion: 0.29
Nodes (4): vite, minutes, postMessage(), started

### Community 156 - "Glifo – note per Claude"
Cohesion: 0.25
Nodes (8): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Regole, sqlite()

### Community 157 - "files.ts"
Cohesion: 0.11
Nodes (19): ganttWidth(), PlanView, hostDownloads, canWriteFilesDirectly(), downloadBlob(), downloadText(), fileNameFor(), FsWindow (+11 more)

### Community 160 - "statsGraph.ts"
Cohesion: 0.25
Nodes (12): classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX, Line, number(), pmfBars() (+4 more)

### Community 161 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 162 - "editor.test.ts"
Cohesion: 0.07
Nodes (29): @lezer/common, closeMathBlockOnEnter(), tabOutOfMath(), CODE_NODES, CommandToken, commandTokenAt(), isInCode(), MATH_NODES (+21 more)

### Community 163 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 166 - ".visible"
Cohesion: 0.40
Nodes (5): Promemoria per lo studente, 2. La pagina dei commenti, tipo FAQ, Commenti di chi prova Glifo, page(), site()

### Community 167 - "I modelli e le chiavi API"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), In prova sul ramo `prova` (7 ottobre 2026): Qwen3 nel browser per «Spiegami», Le idee dello studente (5 ottobre 2026)

### Community 170 - "devDependencies"
Cohesion: 0.10
Nodes (18): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+10 more)

## Knowledge Gaps
- **860 isolated node(s):** `session-start.sh script`, `name`, `private`, `version`, `description` (+855 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1176 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **39 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `texts` connect `i18n.ts` to `h`, `tools.ts`, `noteWords.ts`, `main.ts`, `compile`, `spec.ts`, `tutorial.ts`, `graph/preview.ts`, `explain.ts`, `distributions.ts`, `severalGraph.ts`, `svg.ts`, `parse.ts`, `editor/lists.ts`, `editor/editor.ts`, `src/relocation.ts`, `feedback.ts`, `numerical.ts`, `arithmetic.ts`, `xlsx.ts`, `Dove sono le cose`, `schema/editor.ts`, `index.ts`, `board.ts`, `several.ts`, `gantt.ts`, `toLatex`, `statsGraph.ts`, `assistant.ts`, `logic.ts`, `scopeWith`, `complex.ts`, `namesIn`, `files.ts`, `resize.ts`, `BoardStore`, `localModels.ts`, `functions.ts`, `MathError`, `spreadsheetEn.test.ts`, `sidePanel.ts`, `toolbar.ts`, `explainPanel.ts`, `schema/blocks.ts`, `probability.ts`, `mathEn2.test.ts`, `finite.ts`, `topics.ts`, `spreadsheet/editor.ts`, `conics.ts`, `odesolve.ts`, `statsShown.ts`, `schema/templates.ts`, `symbolic.ts`, `aiPanel.test.ts`, `FoldersStore`, `sql.ts`, `siteUpdate.ts`, `graph/file.ts`, `spellcheck.ts`, `sheet.ts`, `supabase.ts`, `calcResults.ts`, `page.ts`?**
  _High betweenness centrality (0.126) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `Dove sono le cose` to `h`, `noteWords.ts`, `main.ts`, `compile`, `spec.ts`, `tutorial.ts`, `num`, `Board`, `explain.ts`, `graph/preview.ts`, `distributions.ts`, `MarkdownEditor`, `svg.ts`, `parse.ts`, `severalGraph.ts`, `src/relocation.ts`, `SchemaEditor`, `numerical.ts`, `arithmetic.ts`, `feedback.ts`, `xlsx.ts`, `schema/editor.ts`, `SheetEditor`, `Parser`, `board.ts`, `i18n.ts`, `files.ts`, `gantt.ts`, `toLatex`, `limits.ts`, `assistant.ts`, `logic.ts`, `several.ts`, `complex.ts`, `namesIn`, `graph/space.ts`, `BoardStore`, `localModels.ts`, `functions.ts`, `MathError`, `spreadsheetEn.test.ts`, `Pt`, `sidePanel.ts`, `board/shapes.ts`, `toolbar.ts`, `SidePanel`, `explainPanel.ts`, `schema/blocks.ts`, `mathEn2.test.ts`, `.renderFormat`, `finite.ts`, `topics.ts`, `spreadsheet/editor.ts`, `odesolve.ts`, `smoke-test.mjs`, `markdown.ts`, `symbolic.ts`, `aiPanel.test.ts`, `tutorial.mjs`, `explainSubjects.ts`, `schemaBlocks`, `plot.ts`, `siteUpdate.ts`, `graph/file.ts`, `spellcheck.ts`, `sheet.ts`, `graph.ts`, `vitest`, `supabase.ts`, `Rational`, `calcResults.ts`, `ExplainPanel`, `strokes.ts`, `Sheet`?**
  _High betweenness centrality (0.106) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `h`, `noteWords.ts`, `tutorial.ts`, `num`, `explain.ts`, `distributions.ts`, `src/relocation.ts`, `MarkdownEditor`, `parse.ts`, `xlsx.ts`, `editor/editor.ts`, `feedback.ts`, `Dove sono le cose`, `deploy.test.ts`, `schema/editor.ts`, `noteWordsMath.test.ts`, `IdbBoards`, `board.ts`, `i18n.ts`, `markers.ts`, `gantt.ts`, `assistant.ts`, `editor.test.ts`, `translations.test.ts`, `resize.ts`, `BoardStore`, `localModels.ts`, `MathError`, `spreadsheetEn.test.ts`, `sidePanel.ts`, `board/shapes.ts`, `toolbar.ts`, `explainPanel.ts`, `schema/blocks.ts`, `mathEn2.test.ts`, `database.ts`, `spreadsheet/editor.ts`, `markdown.ts`, `aiPanel.test.ts`, `FoldersStore`, `plot.ts`, `sql.ts`, `symbolsEn.test.ts`, `siteUpdate.ts`, `graph/file.ts`, `spellcheck.ts`, `supabase.ts`, `Rational`, `parseSchema`, `strokes.ts`, `Sheet`, `page.ts`?**
  _High betweenness centrality (0.082) - this node is a cross-community bridge._
- **Are the 302 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `tutorialModel()`) actually correct?**
  _`Dove sono le cose` has 302 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `name`, `private` to the rest of the system?**
  _860 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `h` be split into smaller, more focused modules?**
  _Cohesion score 0.033216783216783216 - nodes in this community are weakly interconnected._
- **Should `noteWords.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05995975855130785 - nodes in this community are weakly interconnected._