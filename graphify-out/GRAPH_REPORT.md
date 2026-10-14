# Graph Report - Glifo  (2026-10-14)

## Corpus Check
- 345 files · ~713,489 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5519 nodes · 20240 edges · 175 communities (134 shown, 41 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 679 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `fd41271e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- i18n.ts
- graph/file.ts
- main.ts
- compile
- sync.ts
- spec.ts
- tutorial.ts
- num
- graph/preview.ts
- Dove sono le cose
- distributions.ts
- h
- svg.ts
- sheet.ts
- SchemaEditor
- editor/editor.ts
- SheetEditor
- NotesStore
- MathError
- arithmetic.ts
- index.ts
- engine.ts
- schema/editor.ts
- noteWordsMath.test.ts
- BoardStore
- parse.ts
- board.ts
- ui/preview.ts
- render/lists.ts
- several.ts
- gantt.ts
- study.ts
- store/settings.ts
- assistant.ts
- logic.ts
- linsys.ts
- complex.ts
- namesIn
- translations.test.ts
- resize.ts
- view3d.ts
- restore.ts
- localModels.ts
- markdown.ts
- functions.ts
- linear.ts
- topics.ts
- .render
- suggestions.ts
- board/shapes.ts
- toolbar.ts
- SidePanel
- texts
- laplace.ts
- probability.ts
- inference.ts
- 20261004091555_note_condivise.sql
- .renderFormat
- database.ts
- finite.ts
- calcResults.ts
- dependencies
- Welcome to Glifo
- spreadsheet/editor.ts
- conics.ts
- odesolve.ts
- statsShown.ts
- smoke-test.mjs
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
- schemaBlocks.ts
- dom.ts
- In programma
- schemaEn.test.ts
- symbolsEn.test.ts
- siteUpdate.ts
- labels.ts
- SuggestionController
- solve.ts
- spellcheck.ts
- spaces.ts
- graph.ts
- vitest
- supabase.ts
- Rational
- src/relocation.ts
- calcPlugin
- spreadsheet/format.ts
- Le spiegazioni, come funzionano
- selection.ts
- Sheet
- page.ts
- createFakeSupabase
- tools.ts
- Piano per piano
- Parser
- Board
- 20261008130026_commenti.sql
- plan.ts
- .constructor
- xlsx.ts
- editor/lists.ts
- feedback.ts
- deploy.test.ts
- Glifo
- vite
- Glifo – note per Claude
- planPreview.ts
- Distribution
- captcha.ts
- formatNumber
- Costi
- editor.test.ts
- La lavagna
- splitEquals
- suggest.ts
- AiPanel
- PlanView
- devDependencies
- scripts
- studyRows
- spreadsheet/file.ts
- appleTouch

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 315 edges
2. `MathError` - 151 edges
3. `Sheet` - 147 edges
4. `num()` - 145 edges
5. `h()` - 135 edges
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
- `Dove sono le cose` --references--> `WidgetKind`  [INFERRED]
  ARCHITETTURA.md → src/editor/schemaBlocks.ts
- `Funzionalità` --references--> `k()`  [INFERRED]
  README.md → src/math/numerical.ts
- `Come viene pubblicata` --references--> `dist()`  [INFERRED]
  README.md → src/board/shapes.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (175 total, 41 thin omitted)

### Community 0 - "i18n.ts"
Cohesion: 0.05
Nodes (62): 3. Le impostazioni divise in sezioni, SyncStatus, browserLanguages(), dateLocale(), Entry, lang, LANGUAGES, numberLocale() (+54 more)

### Community 1 - "graph/file.ts"
Cohesion: 0.05
Nodes (64): formulaAtCursor(), GraphLabelLines, insertGraphBlock(), LABEL_KEYS, setGraphLabels(), FIGURE_PALETTE, graphImagesFor(), graphsForFile() (+56 more)

### Community 2 - "main.ts"
Cohesion: 0.03
Nodes (123): addToGraphBlock(), blockMoveTransaction(), account, ACCOUNT_OFF, active, aiShown(), aiToggle, aiWork (+115 more)

### Community 3 - "compile"
Cohesion: 0.05
Nodes (87): integralRegion, LayeredSolid, Multiple, PlanePart, radiusOf(), spaceLayers(), spaceMargin(), spacePoint() (+79 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (31): AccountSync, withLock(), Account, EMPTY_STATE, FolderChange, FolderRow, isEmpty(), iso() (+23 more)

### Community 5 - "spec.ts"
Cohesion: 0.04
Nodes (135): conicItems(), isConicLine(), quadricEquation(), T, fourierItems(), isFourierLine(), T, isNumericalLine() (+127 more)

### Community 6 - "tutorial.ts"
Cohesion: 0.15
Nodes (12): HINT_MS, markTutorialSeen(), openTutorial(), show(), richText(), showTutorialHint(), close(), T (+4 more)

### Community 7 - "num"
Cohesion: 0.13
Nodes (92): atIntegers(), withoutAbs(), exp(), hyperbolicToExp(), inverseRational(), sqrtEx(), termTransform(), polyEx() (+84 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (44): addLabel(), boxes, cameras, complexCoord(), containing(), coord(), coordinates(), drawings (+36 more)

### Community 9 - "Dove sono le cose"
Cohesion: 0.09
Nodes (45): Dove sono le cose, Glifo – architettura, answerFollowUp(), chatContext, ChatFn, chatSubject(), chatSystemPrompt(), checkFormulas() (+37 more)

### Community 10 - "distributions.ts"
Cohesion: 0.16
Nodes (29): choose(), continuousQuantile(), decimals(), expSumValue(), factorialBig(), FAMILIES, integerParam(), invalid() (+21 more)

### Community 11 - "h"
Cohesion: 0.07
Nodes (48): board, sidebarToggle(), viewSwitch, moveDayLabel(), RelocationResult, copy(), confirmDialog(), dialogShell() (+40 more)

### Community 12 - "svg.ts"
Cohesion: 0.08
Nodes (58): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), dataWindow(), decimalText() (+50 more)

### Community 13 - "sheet.ts"
Cohesion: 0.04
Nodes (64): FieldContext, EMPTY_COMPLEX_SCOPE, close(), Definite, definiteIntegral(), exValue(), samples(), OdeFunction (+56 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.10
Nodes (5): isLanes(), SchemaEditor, withLaneContents(), serializeSchema(), Template

### Community 15 - "editor/editor.ts"
Cohesion: 0.07
Nodes (35): description, name, private, type, version, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands (+27 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (8): functionLabel(), SheetEditor, englishTyping(), serializeSheet(), sheetSize(), CellRange, clearRange(), cloneSheet()

### Community 17 - "NotesStore"
Cohesion: 0.08
Nodes (23): Deletion, DeletionLog, isUuid(), newId(), createdAtFromId(), deriveTitle(), Note, NotesStore (+15 more)

### Community 18 - "MathError"
Cohesion: 0.12
Nodes (50): usesDecimalComma(), MathError, bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint() (+42 more)

### Community 19 - "arithmetic.ts"
Cohesion: 0.10
Nodes (51): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+43 more)

### Community 20 - "index.ts"
Cohesion: 0.06
Nodes (46): pick(), errorName(), b, bigops, c, calculus, fn, fr (+38 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "schema/editor.ts"
Cohesion: 0.05
Nodes (62): fieldText(), flowOrder(), laneOf(), listText(), schemaLabel(), schemaTopic(), shapeKindName(), shapeText() (+54 more)

### Community 23 - "noteWordsMath.test.ts"
Cohesion: 0.12
Nodes (15): AstNode, childrenOf(), DATA, ENGLISH, englishTexts(), FUNCTIONS, isNode(), ITALIAN (+7 more)

### Community 24 - "BoardStore"
Cohesion: 0.05
Nodes (15): BoardOptions, BoardBackend, BoardStore, done(), IdbBoards, MemoryBoards, ofNote(), openBoardDatabase() (+7 more)

### Community 25 - "parse.ts"
Cohesion: 0.07
Nodes (40): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe(), differentialInFraction() (+32 more)

### Community 26 - "board.ts"
Cohesion: 0.05
Nodes (61): Action, DOT_SIZES, DrawAction, EraseAction, EraserMode, Finger, HANDLE_REACH, ICON (+53 more)

### Community 27 - "ui/preview.ts"
Cohesion: 0.07
Nodes (34): GraphLabels, GraphLook, renameGraphScope(), renameScopeKeys(), BlockKind, MoveDir, Look, Theme (+26 more)

### Community 28 - "render/lists.ts"
Cohesion: 0.27
Nodes (13): ListStyle, bulletGroup(), Marker, sameList(), alignInside(), asciiTrim(), findMarker(), Found (+5 more)

### Community 29 - "several.ts"
Cohesion: 0.10
Nodes (45): criticalLine(), isSeveralLine(), named(), severalItems(), surface(), T, at(), bounded() (+37 more)

### Community 30 - "gantt.ts"
Cohesion: 0.06
Nodes (77): searchPhrases(), amount(), barColor(), crossings(), dateText(), dayMonth(), dayOf(), fitText() (+69 more)

### Community 31 - "study.ts"
Cohesion: 0.11
Nodes (41): Piece, Condition, Family, Group, Root, Shape, Constraint, Coord (+33 more)

### Community 32 - "store/settings.ts"
Cohesion: 0.09
Nodes (53): 1. «Cambia account», accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), knowsAccount(), prefixOf() (+45 more)

### Community 33 - "assistant.ts"
Cohesion: 0.12
Nodes (26): AiAnswer, AiError, AiResult, AiSettings, answerSchema(), askAi(), askCompatible(), askThroughHost() (+18 more)

### Community 34 - "logic.ts"
Cohesion: 0.11
Nodes (30): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+22 more)

### Community 35 - "linsys.ts"
Cohesion: 0.11
Nodes (49): choices(), exText(), gcd(), matrixEquation(), matrixSystem(), minorsGcd(), ONE, parametricRows() (+41 more)

### Community 36 - "complex.ts"
Cohesion: 0.05
Nodes (82): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexLine(), isComplexValue() (+74 more)

### Community 37 - "namesIn"
Cohesion: 0.14
Nodes (34): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+26 more)

### Community 38 - "translations.test.ts"
Cohesion: 0.17
Nodes (18): AstNode, calleeName(), check(), checkPair(), visit(), children(), entryPairs(), files (+10 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (24): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+16 more)

### Community 40 - "view3d.ts"
Cohesion: 0.06
Nodes (84): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+76 more)

### Community 41 - "restore.ts"
Cohesion: 0.22
Nodes (11): restore(), BackupNote, backupNotes(), restoreBackup(), RestoreBoards, Restored, restoredMessage(), T (+3 more)

### Community 42 - "localModels.ts"
Cohesion: 0.09
Nodes (31): @mlc-ai/web-llm, chat(), GlifoError, Gpu, load(), post(), remove(), scope (+23 more)

### Community 43 - "markdown.ts"
Cohesion: 0.08
Nodes (44): labelHtml(), planRange(), texHtml(), dataRange(), tableChartKind(), checkHtml(), checkTitle(), T (+36 more)

### Community 44 - "functions.ts"
Cohesion: 0.08
Nodes (60): CellResult, EMPTY, number(), T, addFormat(), Format, tidy(), FormulaNode (+52 more)

### Community 45 - "linear.ts"
Cohesion: 0.11
Nodes (55): angleBetween(), asMatrix(), basisOf(), circleText(), complexText(), cross(), Ctx, dataOf() (+47 more)

### Community 46 - "topics.ts"
Cohesion: 0.06
Nodes (72): ATTRIBUTES, cut(), ER_SHAPES, fitLines(), formulaText(), FREE_NAMES, readSheet(), T (+64 more)

### Community 47 - ".render"
Cohesion: 0.17
Nodes (7): MoveAction, shapeSvg(), handleScale(), moveBox(), movePoint(), Transform, Box

### Community 48 - "suggestions.ts"
Cohesion: 0.21
Nodes (13): expand(), preferredIndex(), SuggestionItem, commandNames(), cardPreviewTex(), formPreviewTex(), ParsedTemplate, parseTemplate() (+5 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (35): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+27 more)

### Community 50 - "toolbar.ts"
Cohesion: 0.18
Nodes (15): insertBlock(), wrapSelection(), Action, createToolbar(), insertCode(), insertLink(), listStyle(), MenuItem (+7 more)

### Community 51 - "SidePanel"
Cohesion: 0.18
Nodes (6): localizeTex(), symbolsInCategory(), cardPreview(), displayCode(), preventFocusSteal(), SidePanel

### Community 52 - "texts"
Cohesion: 0.06
Nodes (40): Explanation, REPLY_TOKENS, LocalAbort, ChatMessage, ChatOptions, modelName(), MarkdownEditor, insertTemplate() (+32 more)

### Community 53 - "laplace.ts"
Cohesion: 0.12
Nodes (44): factoredPolynomial(), absOf(), boundsOf(), close(), definite(), fourierProblem, fourierShown(), isTrig() (+36 more)

### Community 54 - "probability.ts"
Cohesion: 0.12
Nodes (26): addExp(), End, expSum, Family, subtractExp(), ExactScope, ALL, complement() (+18 more)

### Community 55 - "inference.ts"
Cohesion: 0.14
Nodes (27): between(), chiSquareTest(), confidence(), confidenceShown(), decimals(), Given, hypothesisTest(), InferenceContext (+19 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - ".renderFormat"
Cohesion: 0.15
Nodes (15): fieldInput(), cellText(), createEdgeCell(), edgeLook(), edgeStyle(), edgeTextAt(), insertSchema(), nodeLook() (+7 more)

### Community 58 - "database.ts"
Cohesion: 0.23
Nodes (6): createDatabase(), createUser(), databaseTests(), feedbackTests(), migrations, shareTests()

### Community 59 - "finite.ts"
Cohesion: 0.16
Nodes (30): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+22 more)

### Community 60 - "calcResults.ts"
Cohesion: 0.10
Nodes (30): @codemirror/language, @lezer/common, acceptCalcResult(), CalcCheck, calcOutcomes(), CalcResult, calcResults(), formulasUntil() (+22 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "Welcome to Glifo"
Cohesion: 0.20
Nodes (9): A few examples, Calculations and graphs, For programming too, Handy shortcuts, How to write formulas, Lists, Spell check, Try it now (+1 more)

### Community 63 - "spreadsheet/editor.ts"
Cohesion: 0.09
Nodes (44): currentCall(), Editing, MenuEntry, Move, PATHS, SheetEditorOptions, Snapshot, T (+36 more)

### Community 64 - "conics.ts"
Cohesion: 0.19
Nodes (28): at(), centralCanonical(), Coefficients, coneCanonical(), conicOf(), det2(), det3(), determinant() (+20 more)

### Community 65 - "odesolve.ts"
Cohesion: 0.08
Nodes (78): primed(), withPrimes(), linearIn(), addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots() (+70 more)

### Community 66 - "statsShown.ts"
Cohesion: 0.16
Nodes (33): check(), correlation(), count(), covariance(), Data, dataStatistic(), deviation(), fail() (+25 more)

### Community 67 - "smoke-test.mjs"
Cohesion: 0.15
Nodes (6): markdown-it, playwright-core, PNG_ICONS, fakeLlmWorker(), firstVisit(), plainContext

### Community 68 - "blockMove.ts"
Cohesion: 0.10
Nodes (33): blockMoved, blockMoves(), LineMap, blank(), BlockMove, blockPlace(), closed(), closeIdx() (+25 more)

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
Cohesion: 0.23
Nodes (17): SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), conceptMap(), cycle(), edge(), er() (+9 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.06
Nodes (60): quadraticIn(), atValues(), cancelLinear(), Converter, coordinates(), decimalText(), definiteParts(), definiteValue() (+52 more)

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
Cohesion: 0.13
Nodes (17): definedName(), formulaTopic(), graphTopic(), numberText(), studyOf(), theoremTopic(), topicOf(), fakeModel() (+9 more)

### Community 79 - "FoldersStore"
Cohesion: 0.13
Nodes (9): cleanFolderName(), Folder, FOLDER_NAME_MAX, FoldersStore, groupByFolder(), loadClosedFolders(), RemoteFolder, sameName() (+1 more)

### Community 82 - "Il database degli account (Supabase)"
Cohesion: 0.14
Nodes (13): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il controllo anti-robot (CAPTCHA, ottobre 2026), Il database degli account (Supabase), Il progetto, Il trasloco su glifo.page (ottobre 2026) (+5 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.11
Nodes (11): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+3 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.11
Nodes (19): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Deciso (5 ottobre 2026), Fonti (controllate il 4 ottobre 2026) (+11 more)

### Community 91 - "explainSubjects.ts"
Cohesion: 0.23
Nodes (15): explainTarget, schemaTitle(), hasCalculation(), targetAt(), SubjectKind, subjectsIn(), THEOREM_START, THEOREM_WORDS (+7 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.10
Nodes (11): @electric-sql/pglite, device(), login(), newContext, waitFor(), b64(), CAPTCHA_TOKEN, CODE (+3 more)

### Community 97 - "schemaBlocks.ts"
Cohesion: 0.08
Nodes (27): @codemirror/state, @codemirror/view, toggleLinePrefix(), LIST_STYLES, blockLine, inlineRegion, marks, mathHighlighter (+19 more)

### Community 98 - "dom.ts"
Cohesion: 0.12
Nodes (14): FolderGroup, saveClosedFolders(), NoteMeta, append(), Child, clear(), formatDate(), Props (+6 more)

### Community 100 - "In programma"
Cohesion: 0.22
Nodes (9): Account: i propri appunti su ogni dispositivo, anche da condividere, Commenti di chi prova Glifo, Idee per il futuro, In programma, La grafica: account, impostazioni, commenti, AI e lingua (chiesto il 10 ottobre 2026, se ne parla), La lavagna: idee in più, Più avanti, Schemi: idee in più (+1 more)

### Community 101 - "schemaEn.test.ts"
Cohesion: 0.06
Nodes (50): readSchema(), schemaSummary(), svg(), openSchemaEditor(), SchemaEditorOptions, base64(), hide(), OPEN (+42 more)

### Community 102 - "symbolsEn.test.ts"
Cohesion: 0.13
Nodes (29): editDistance(), singular(), stem(), STOPWORDS, words(), BOTH, buildIndex(), containsPhrase() (+21 more)

### Community 103 - "siteUpdate.ts"
Cohesion: 0.13
Nodes (21): Promemoria per lo studente, 2. La pagina dei commenti, tipo FAQ, checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion() (+13 more)

### Community 104 - "labels.ts"
Cohesion: 0.16
Nodes (18): ACCENTS, BLACKBOARD, CALLIGRAPHIC, closing(), convert(), escapeXml(), FUNCTIONS, GREEK (+10 more)

### Community 106 - "solve.ts"
Cohesion: 0.13
Nodes (30): formatRational(), fromRational(), splitRoot(), surdText(), isStandardUnknown(), linearSystem(), RelOp, breaks() (+22 more)

### Community 107 - "spellcheck.ts"
Cohesion: 0.08
Nodes (23): misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt(), openAt() (+15 more)

### Community 108 - "spaces.ts"
Cohesion: 0.10
Nodes (30): FormatOptions, Eigenvalue, eigenvectors(), EXACT, FLOAT, image(), kernel(), LinearValue (+22 more)

### Community 113 - "graph.ts"
Cohesion: 0.05
Nodes (41): @maxgraph/core, AT_X, cellHtml(), COMPASS, createGraph(), drawSchema(), isEdgeLook(), isNodeLook() (+33 more)

### Community 116 - "vitest"
Cohesion: 0.07
Nodes (35): vitest, figureName(), graphFigure(), graphImage(), swatchSvg(), titleBand(), texSvg(), staticGraphSvg() (+27 more)

### Community 117 - "supabase.ts"
Cohesion: 0.11
Nodes (35): @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken(), ensureSessionOf() (+27 more)

### Community 118 - "Rational"
Cohesion: 0.10
Nodes (23): Part, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactFunction, ExactRandom, exactRoot() (+15 more)

### Community 119 - "src/relocation.ts"
Cohesion: 0.12
Nodes (27): isWelcome(), BackupBoard, buildPackage(), importPackage(), isRelocationPackage(), NEW_ORIGIN, OLD_ORIGIN, openedForRelocation() (+19 more)

### Community 120 - "calcPlugin"
Cohesion: 0.17
Nodes (4): calcPlugin, CheckWidget, ResultWidget, valueNode()

### Community 121 - "spreadsheet/format.ts"
Cohesion: 0.10
Nodes (30): chartFrom(), chartLines(), chartRange(), ChartTable, currentRegion(), isNumber(), Results, T (+22 more)

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "selection.ts"
Cohesion: 0.14
Nodes (20): centerOn(), copyStrokes(), cross(), IDENTITY, insideLasso(), keepInside(), LASSO_SHARE, lassoed() (+12 more)

### Community 124 - "Sheet"
Cohesion: 0.08
Nodes (30): ExactComplexScope, ConicInfo, Ode, withWorkLimit(), FiniteContext, FormattedResult, differentialRequest, pieces() (+22 more)

### Community 125 - "page.ts"
Cohesion: 0.07
Nodes (44): katex, accountDataFile(), PullResult, openShareDialog(), changeAccess(), changeCopy(), refreshChanged(), render() (+36 more)

### Community 128 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 129 - "tools.ts"
Cohesion: 0.09
Nodes (21): Conversation, converse(), ExplainEvents, said(), wrongs(), ALL_TOOLS, callOf(), checkTool (+13 more)

### Community 132 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 136 - "Board"
Cohesion: 0.07
Nodes (10): Board, clampZoom(), coalesced(), loadPrefs(), pointsOf(), pressureOf(), validView(), selectionBox() (+2 more)

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 139 - "plan.ts"
Cohesion: 0.18
Nodes (15): ITALIAN, NumberStyle, cellText(), columnRole(), columnsOf(), durationUnit(), isNumber(), isPlanRange() (+7 more)

### Community 141 - "xlsx.ts"
Cohesion: 0.09
Nodes (46): RFC-4180, fflate, tablesNote(), csvCell(), csvDelimiter(), csvNumbers(), csvToSheet(), digitsOf() (+38 more)

### Community 142 - "editor/lists.ts"
Cohesion: 0.11
Nodes (51): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+43 more)

### Community 143 - "feedback.ts"
Cohesion: 0.07
Nodes (44): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, Site, T, commentDate(), commentItem(), COMMENTS_MAX (+36 more)

### Community 144 - "deploy.test.ts"
Cohesion: 0.29
Nodes (4): vite-plugin-pwa, accountOffMessage(), defineFor(), MAIN_BRANCH

### Community 146 - "Glifo"
Cohesion: 0.12
Nodes (16): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Domande frequenti e commenti (+8 more)

### Community 154 - "vite"
Cohesion: 0.29
Nodes (4): vite, minutes, postMessage(), started

### Community 156 - "Glifo – note per Claude"
Cohesion: 0.25
Nodes (8): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Regole, sqlite()

### Community 157 - "planPreview.ts"
Cohesion: 0.11
Nodes (26): T, cache, capability(), ClaudeRuntime, hostDownloads, HostError, inClaudeViewer(), ModelTier (+18 more)

### Community 158 - "Distribution"
Cohesion: 0.16
Nodes (10): discreteQuantile(), Distribution, exactIntervalProbability(), integerRange(), intervalProbability(), pValue(), rejection(), TestResult (+2 more)

### Community 159 - "captcha.ts"
Cohesion: 0.21
Nodes (8): captchaToken(), loadTurnstile(), Turnstile, TURNSTILE_SCRIPT, Window, TURNSTILE_SITE_KEY, accountFailure(), Options

### Community 160 - "formatNumber"
Cohesion: 0.08
Nodes (42): isTestLine(), number(), T, testItems(), classes(), dataOf(), distributionExtent(), distributionLabel() (+34 more)

### Community 161 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 162 - "editor.test.ts"
Cohesion: 0.10
Nodes (20): InsertOptions, templateInsertion(), addPlaceholders, buildDecorations(), clearAllPlaceholders(), clearPlaceholders, CommandTarget, contains() (+12 more)

### Community 163 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 166 - "splitEquals"
Cohesion: 0.27
Nodes (13): allNames(), bareResult(), checkSteps(), checkTopicFormula(), formulaNames(), integralsIn(), parsed(), sameSolutions() (+5 more)

### Community 167 - "suggest.ts"
Cohesion: 0.27
Nodes (11): normalizeText(), IndexedEntry, SearchResult, getIndex(), isSubsequence(), keysOf(), MatchKind, suggestCommands() (+3 more)

### Community 168 - "AiPanel"
Cohesion: 0.36
Nodes (3): NoteSubject, AiPanel, kindName()

### Community 169 - "PlanView"
Cohesion: 0.33
Nodes (3): ganttWidth(), PlanView, Palette

### Community 170 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

### Community 171 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 172 - "studyRows"
Cohesion: 0.48
Nodes (7): asymptoteText(), extremumText(), none(), noteText(), pointText(), studyPart(), studyRows()

### Community 173 - "spreadsheet/file.ts"
Cohesion: 0.38
Nodes (6): hide(), OPEN, sheetsForFile(), sheetsFromFile(), T, unhide()

## Knowledge Gaps
- **860 isolated node(s):** `Condividere una nota con un link`, `Domande frequenti e commenti`, `Provarlo sul tuo computer`, `Assistente AI`, `Spiegami (in prova)` (+855 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1173 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **41 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `texts` connect `texts` to `i18n.ts`, `tools.ts`, `graph/file.ts`, `main.ts`, `compile`, `spec.ts`, `tutorial.ts`, `graph/preview.ts`, `Dove sono le cose`, `distributions.ts`, `plan.ts`, `svg.ts`, `sheet.ts`, `editor/lists.ts`, `editor/editor.ts`, `feedback.ts`, `xlsx.ts`, `MathError`, `arithmetic.ts`, `index.ts`, `NotesStore`, `schema/editor.ts`, `parse.ts`, `board.ts`, `ui/preview.ts`, `planPreview.ts`, `gantt.ts`, `several.ts`, `formatNumber`, `assistant.ts`, `logic.ts`, `linsys.ts`, `complex.ts`, `namesIn`, `study.ts`, `store/settings.ts`, `resize.ts`, `restore.ts`, `localModels.ts`, `markdown.ts`, `functions.ts`, `linear.ts`, `topics.ts`, `spreadsheet/file.ts`, `toolbar.ts`, `laplace.ts`, `probability.ts`, `inference.ts`, `h`, `finite.ts`, `calcResults.ts`, `spreadsheet/editor.ts`, `conics.ts`, `odesolve.ts`, `statsShown.ts`, `schema/templates.ts`, `symbolic.ts`, `schemaBlocks.ts`, `dom.ts`, `schemaEn.test.ts`, `siteUpdate.ts`, `solve.ts`, `spellcheck.ts`, `spaces.ts`, `supabase.ts`, `src/relocation.ts`, `spreadsheet/format.ts`, `page.ts`?**
  _High betweenness centrality (0.129) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `Dove sono le cose` to `i18n.ts`, `graph/file.ts`, `main.ts`, `compile`, `spec.ts`, `tutorial.ts`, `num`, `graph/preview.ts`, `h`, `svg.ts`, `sheet.ts`, `SchemaEditor`, `SheetEditor`, `NotesStore`, `MathError`, `arithmetic.ts`, `schema/editor.ts`, `BoardStore`, `parse.ts`, `board.ts`, `ui/preview.ts`, `several.ts`, `gantt.ts`, `study.ts`, `store/settings.ts`, `assistant.ts`, `logic.ts`, `linsys.ts`, `complex.ts`, `namesIn`, `view3d.ts`, `localModels.ts`, `markdown.ts`, `functions.ts`, `linear.ts`, `topics.ts`, `.render`, `board/shapes.ts`, `toolbar.ts`, `SidePanel`, `texts`, `laplace.ts`, `inference.ts`, `.renderFormat`, `finite.ts`, `calcResults.ts`, `spreadsheet/editor.ts`, `odesolve.ts`, `smoke-test.mjs`, `blockMove.ts`, `symbolic.ts`, `aiPanel.test.ts`, `tutorial.mjs`, `explainSubjects.ts`, `schemaBlocks.ts`, `schemaEn.test.ts`, `siteUpdate.ts`, `graph.ts`, `vitest`, `supabase.ts`, `Rational`, `src/relocation.ts`, `spreadsheet/format.ts`, `selection.ts`, `Sheet`, `tools.ts`, `Board`, `plan.ts`, `.constructor`, `xlsx.ts`, `feedback.ts`, `deploy.test.ts`, `planPreview.ts`, `formatNumber`, `splitEquals`, `AiPanel`, `PlanView`, `studyRows`?**
  _High betweenness centrality (0.115) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `i18n.ts`, `graph/file.ts`, `main.ts`, `tutorial.ts`, `num`, `Dove sono le cose`, `distributions.ts`, `h`, `plan.ts`, `sheet.ts`, `editor/lists.ts`, `editor/editor.ts`, `feedback.ts`, `deploy.test.ts`, `NotesStore`, `xlsx.ts`, `schema/editor.ts`, `noteWordsMath.test.ts`, `board.ts`, `ui/preview.ts`, `several.ts`, `gantt.ts`, `captcha.ts`, `store/settings.ts`, `assistant.ts`, `editor.test.ts`, `linsys.ts`, `complex.ts`, `translations.test.ts`, `resize.ts`, `view3d.ts`, `restore.ts`, `localModels.ts`, `appleTouch`, `topics.ts`, `suggestions.ts`, `board/shapes.ts`, `texts`, `database.ts`, `spreadsheet/editor.ts`, `blockMove.ts`, `aiPanel.test.ts`, `FoldersStore`, `schemaBlocks.ts`, `schemaEn.test.ts`, `symbolsEn.test.ts`, `siteUpdate.ts`, `spellcheck.ts`, `spaces.ts`, `supabase.ts`, `src/relocation.ts`, `selection.ts`, `Sheet`, `page.ts`?**
  _High betweenness centrality (0.094) - this node is a cross-community bridge._
- **Are the 314 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `tutorialModel()`) actually correct?**
  _`Dove sono le cose` has 314 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Condividere una nota con un link`, `Domande frequenti e commenti`, `Provarlo sul tuo computer` to the rest of the system?**
  _860 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `i18n.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04554455445544554 - nodes in this community are weakly interconnected._
- **Should `graph/file.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05098934550989345 - nodes in this community are weakly interconnected._