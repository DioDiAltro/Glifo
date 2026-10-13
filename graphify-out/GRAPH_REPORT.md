# Graph Report - matherdown  (2026-10-13)

## Corpus Check
- 346 files · ~720,453 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5553 nodes · 20301 edges · 171 communities (131 shown, 40 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 673 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d161c222`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- i18n.ts
- noteWords.ts
- main.ts
- compile
- sync.ts
- spec.ts
- h
- num
- graph/preview.ts
- Dove sono le cose
- distributions.ts
- localModels.ts
- svg.ts
- laplace.ts
- SchemaEditor
- editor/editor.ts
- SheetEditor
- src/relocation.ts
- MathError
- linsys.ts
- index.ts
- engine.ts
- schema/editor.ts
- noteWordsMath.test.ts
- store.ts
- Parser
- board.ts
- texts
- NotesStore
- arithmetic.ts
- gantt.ts
- study.ts
- solve.ts
- assistant.ts
- logic.ts
- several.ts
- complex.ts
- namesIn
- translations.test.ts
- resize.ts
- graph/space.ts
- parse.ts
- graph/file.ts
- plan.ts
- functions.ts
- linear.ts
- topics.ts
- Pt
- view3d.ts
- board/shapes.ts
- toolbar.ts
- renderTex
- explainPanel.ts
- toLatex
- markdown.ts
- sheet.ts
- 20261004091555_note_condivise.sql
- .int
- database.ts
- finite.ts
- tutorial.ts
- dependencies
- Welcome to Glifo
- spreadsheet/editor.ts
- GraphView
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
- .constructor
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- usesDecimalComma
- FoldersStore
- session-start.sh
- .claude/CLAUDE.md
- Il database degli account (Supabase)
- tutorial.mjs
- Abbonamenti
- plot.ts
- supabase-stub.sql
- account-test.mjs
- schemaBlocks.ts
- conics.ts
- In programma
- sql.ts
- symbolsEn.test.ts
- siteUpdate.ts
- .renderFormat
- editor.test.ts
- schema/preview.ts
- spellcheck
- spaces.ts
- graph.ts
- vitest
- supabase.ts
- Rational
- BoardStore
- calcResults.ts
- escapeHtml
- Le spiegazioni, come funzionano
- selection.ts
- Sheet
- page.ts
- createFakeSupabase
- probability.ts
- Piano per piano
- Parser
- Board
- 20261008130026_commenti.sql
- sidePanel.ts
- spreadsheet/format.ts
- xlsx.ts
- editor/lists.ts
- feedback.ts
- schemaTools.test.ts
- Glifo
- vite
- Glifo – note per Claude
- files.ts
- strokes.ts
- math/calculus.ts
- captcha.ts
- Costi
- PlanView
- La lavagna
- mathEn2.test.ts
- .visible
- I modelli e le chiavi API
- devDependencies
- scripts

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 308 edges
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
- `4. Più modelli per «Spiegami»` --references--> `webllmId()`  [INFERRED]
  GRAFICA.md → src/ai/localModels.ts
- `Come viene pubblicata` --references--> `dist()`  [INFERRED]
  README.md → src/board/shapes.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (171 total, 40 thin omitted)

### Community 0 - "i18n.ts"
Cohesion: 0.04
Nodes (71): 3. Le impostazioni divise in sezioni, SyncStatus, downloadSize(), gpuF16(), modelVariant, AI_SERVICES, aiService, T (+63 more)

### Community 1 - "noteWords.ts"
Cohesion: 0.08
Nodes (43): addToGraphBlock(), formulaAtCursor(), GraphLabelLines, insertGraphBlock(), LABEL_KEYS, setGraphLabels(), monthOf(), MONTHS (+35 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (111): newStrokeId(), account, ACCOUNT_OFF, active, aiShown(), aiToggle, aiWork, app (+103 more)

### Community 3 - "compile"
Cohesion: 0.06
Nodes (75): integralRegion, LayeredSolid, close(), Definite, definiteIntegral(), exValue(), samples(), Interval (+67 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (31): AccountSync, withLock(), Account, EMPTY_STATE, FolderChange, FolderRow, isEmpty(), iso() (+23 more)

### Community 5 - "spec.ts"
Cohesion: 0.06
Nodes (92): quadricEquation(), isComplexLine(), constantIntegrand(), depth(), inequalityMargin(), Multiple, multipleOf(), planeMargin() (+84 more)

### Community 6 - "h"
Cohesion: 0.05
Nodes (71): T, board, loadingEditor(), openSheet(), saveSheetBlock(), viewSwitch, moveDayLabel(), RelocationResult (+63 more)

### Community 7 - "num"
Cohesion: 0.14
Nodes (85): atIntegers(), withoutAbs(), hyperbolicToExp(), inverseRational(), sqrtEx(), polyEx(), similarSolution(), yPowers() (+77 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (38): decimalText(), addLabel(), boxes, cameras, containing(), drawings, drawnViews, endTex() (+30 more)

### Community 9 - "Dove sono le cose"
Cohesion: 0.06
Nodes (75): Dove sono le cose, Glifo – architettura, allNames(), answerFollowUp(), bareResult(), chatContext, ChatFn, chatSubject() (+67 more)

### Community 10 - "distributions.ts"
Cohesion: 0.07
Nodes (61): choose(), continuousQuantile(), decimals(), discreteQuantile(), Distribution, factorialBig(), FAMILIES, integerParam() (+53 more)

### Community 11 - "localModels.ts"
Cohesion: 0.05
Nodes (54): chat(), GlifoError, Gpu, load(), post(), remove(), scope, shaderF16() (+46 more)

### Community 12 - "svg.ts"
Cohesion: 0.11
Nodes (37): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), domainEdge(), jump(), lineAcross(), Polyline (+29 more)

### Community 13 - "laplace.ts"
Cohesion: 0.08
Nodes (59): factoredPolynomial(), EMPTY_SCOPE, absOf(), boundsOf(), close(), definite(), fourierProblem, fourierShown() (+51 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.11
Nodes (4): isLanes(), SchemaEditor, withLaneContents(), serializeSchema()

### Community 15 - "editor/editor.ts"
Cohesion: 0.05
Nodes (51): description, name, private, type, version, @codemirror/autocomplete, @codemirror/lang-markdown, @codemirror/language (+43 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (6): functionLabel(), SheetEditor, englishTyping(), serializeSheet(), sheetSize(), cloneSheet()

### Community 17 - "src/relocation.ts"
Cohesion: 0.06
Nodes (70): 1. «Cambia account», accountSpace(), adoptGuestNotes(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf() (+62 more)

### Community 18 - "MathError"
Cohesion: 0.11
Nodes (52): MathError, FormatOptions, bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint() (+44 more)

### Community 19 - "linsys.ts"
Cohesion: 0.12
Nodes (44): choices(), gcd(), matrixEquation(), matrixSystem(), minorsGcd(), ONE, parametricRows(), parametricSystem() (+36 more)

### Community 20 - "index.ts"
Cohesion: 0.06
Nodes (46): Text, b, bigops, c, calculus, fn, fr, fractions (+38 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "schema/editor.ts"
Cohesion: 0.05
Nodes (56): schemaSummary(), ALIGN, ALIGN_NAMES, ARROW_NAMES, AT_ICONS, AT_NAMES, BASE_PRESETS, BIG_ARROWS (+48 more)

### Community 23 - "noteWordsMath.test.ts"
Cohesion: 0.07
Nodes (26): katex, buildDecorations(), clearAllPlaceholders(), clearPlaceholders, contains(), currentIndex(), filledMark, getPlaceholders() (+18 more)

### Community 24 - "store.ts"
Cohesion: 0.09
Nodes (16): BoardBackend, BoardData, done(), fromRecord(), IdbBoards, ofNote(), openBoardDatabase(), openDefault() (+8 more)

### Community 26 - "board.ts"
Cohesion: 0.06
Nodes (44): Action, BoardOptions, coalesced(), DOT_SIZES, EraseAction, EraserMode, Finger, HANDLE_REACH (+36 more)

### Community 27 - "texts"
Cohesion: 0.09
Nodes (20): GraphLabels, texts, BlockKind, hydrateSheets(), T, BLOCK_NAMES, blockHiddenMessage(), blockKindOf() (+12 more)

### Community 28 - "NotesStore"
Cohesion: 0.08
Nodes (25): Deletion, DeletionLog, FOLDER_NAME_MAX, loadClosedFolders(), RemoteFolder, isUuid(), newId(), createdAtFromId() (+17 more)

### Community 29 - "arithmetic.ts"
Cohesion: 0.10
Nodes (47): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+39 more)

### Community 30 - "gantt.ts"
Cohesion: 0.06
Nodes (72): searchPhrases(), amount(), barColor(), crossings(), dateText(), dayMonth(), dayOf(), fitText() (+64 more)

### Community 31 - "study.ts"
Cohesion: 0.13
Nodes (40): limit(), Poly, Fraction, Asymptote, asymptoteText(), boundaries(), compiled(), cutsOf() (+32 more)

### Community 32 - "solve.ts"
Cohesion: 0.17
Nodes (24): isStandardUnknown(), linearSystem(), RelOp, breaks(), equation(), holds(), inequality(), minus() (+16 more)

### Community 33 - "assistant.ts"
Cohesion: 0.09
Nodes (29): @anthropic-ai/sdk, AiAnswer, AiError, AiSettings, answerSchema(), askAi(), askCompatible(), askThroughHost() (+21 more)

### Community 34 - "logic.ts"
Cohesion: 0.11
Nodes (30): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+22 more)

### Community 35 - "several.ts"
Cohesion: 0.09
Nodes (50): Piece, severalLimit, Condition, Family, Group, Root, Shape, fractionNear() (+42 more)

### Community 36 - "complex.ts"
Cohesion: 0.04
Nodes (83): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexValue(), isInequality() (+75 more)

### Community 37 - "namesIn"
Cohesion: 0.13
Nodes (36): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+28 more)

### Community 38 - "translations.test.ts"
Cohesion: 0.17
Nodes (18): AstNode, calleeName(), check(), checkPair(), visit(), children(), entryPairs(), files (+10 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (24): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+16 more)

### Community 40 - "graph/space.ts"
Cohesion: 0.10
Nodes (56): sampleRegion(), addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon() (+48 more)

### Community 41 - "parse.ts"
Cohesion: 0.05
Nodes (57): Line, errorMessage(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES (+49 more)

### Community 42 - "graph/file.ts"
Cohesion: 0.08
Nodes (44): FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsForFile(), graphsFromFile(), hide() (+36 more)

### Community 43 - "plan.ts"
Cohesion: 0.08
Nodes (44): at(), breakEven(), Point, T, tableItems(), textLabel(), chartData, chartFrom() (+36 more)

### Community 44 - "functions.ts"
Cohesion: 0.07
Nodes (67): CellResult, EMPTY, evaluateSheet(), number(), SheetEvaluator, T, addFormat(), divFormat() (+59 more)

### Community 45 - "linear.ts"
Cohesion: 0.11
Nodes (51): nameLabel(), UndefinedName, angleBetween(), asMatrix(), basisOf(), cross(), Ctx, dataOf() (+43 more)

### Community 46 - "topics.ts"
Cohesion: 0.07
Nodes (67): ATTRIBUTES, cut(), ER_SHAPES, fieldText(), fitLines(), flowOrder(), formulaText(), FREE_NAMES (+59 more)

### Community 47 - "Pt"
Cohesion: 0.15
Nodes (10): clampZoom(), MoveAction, PanAction, PinchAction, pressureOf(), validView(), Transform, EllipseFit (+2 more)

### Community 48 - "view3d.ts"
Cohesion: 0.10
Nodes (34): gcd(), piLabel(), tickLabel(), ticks, Face, FINE, planeSide(), planeTolerance() (+26 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (36): DrawAction, adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners() (+28 more)

### Community 50 - "toolbar.ts"
Cohesion: 0.09
Nodes (20): EditorCallbacks, MarkdownEditor, insertBlock(), insertTemplate(), wrapSelection(), ListStyleId, Action, createToolbar() (+12 more)

### Community 51 - "renderTex"
Cohesion: 0.19
Nodes (6): cleanKatexError(), renderTex(), isConfidentAnswer(), symbolsInCategory(), preventFocusSteal(), SidePanel

### Community 52 - "explainPanel.ts"
Cohesion: 0.05
Nodes (62): explainTarget, Explanation, FollowUp, REPLY_TOKENS, definedName(), formulaTopic(), graphTopic(), numberText() (+54 more)

### Community 53 - "toLatex"
Cohesion: 0.10
Nodes (35): conicItems(), isConicLine(), T, fourierItems(), isFourierLine(), T, partialSum(), ACCENT_COMMANDS (+27 more)

### Community 54 - "markdown.ts"
Cohesion: 0.09
Nodes (40): dataRange(), bulletGroup(), sameList(), moveAttrs(), renderTexOrError(), renderTexWithResult(), alignInside(), asciiTrim() (+32 more)

### Community 55 - "sheet.ts"
Cohesion: 0.07
Nodes (32): criticalLine(), named(), severalItems(), surface(), T, OdeFunction, ExactFunction, chiSquareTest() (+24 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - ".int"
Cohesion: 0.08
Nodes (17): addExp(), exactIntervalProbability(), expSum, subtractExp(), characteristicPolynomial(), eigenvalues(), Field, formatPolynomial() (+9 more)

### Community 58 - "database.ts"
Cohesion: 0.23
Nodes (6): createDatabase(), createUser(), databaseTests(), feedbackTests(), migrations, shareTests()

### Community 59 - "finite.ts"
Cohesion: 0.17
Nodes (28): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+20 more)

### Community 60 - "tutorial.ts"
Cohesion: 0.15
Nodes (12): HINT_MS, markTutorialSeen(), openTutorial(), show(), richText(), showTutorialHint(), close(), T (+4 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "Welcome to Glifo"
Cohesion: 0.20
Nodes (9): A few examples, Calculations and graphs, For programming too, Handy shortcuts, How to write formulas, Lists, Spell check, Try it now (+1 more)

### Community 63 - "spreadsheet/editor.ts"
Cohesion: 0.07
Nodes (60): sheetSummary(), currentCall(), Editing, MenuEntry, Move, openSheetEditor(), PATHS, SheetEditorOptions (+52 more)

### Community 64 - "GraphView"
Cohesion: 0.15
Nodes (12): complexCoord(), coord(), coordinates(), explicitWindow(), graphSize(), GraphView, remember(), sameCamera() (+4 more)

### Community 65 - "odesolve.ts"
Cohesion: 0.08
Nodes (83): primed(), linearIn(), addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled() (+75 more)

### Community 66 - "statsShown.ts"
Cohesion: 0.17
Nodes (32): check(), correlation(), count(), covariance(), Data, dataStatistic(), deviation(), fail() (+24 more)

### Community 67 - "smoke-test.mjs"
Cohesion: 0.15
Nodes (6): markdown-it, playwright-core, PNG_ICONS, fakeLlmWorker(), firstVisit(), plainContext

### Community 68 - "blockMove.ts"
Cohesion: 0.11
Nodes (36): @codemirror/commands, @codemirror/view, blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove (+28 more)

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
Nodes (60): primitive(), verified(), atValues(), cancelLinear(), combine(), commonMonomial(), Converter, coordinates() (+52 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Errore o imprevisto → nel dettaglio, 3. Serve una decisione → frasi complete, 4. Fine del compito → un solo riepilogo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "usesDecimalComma"
Cohesion: 0.11
Nodes (29): FieldContext, isTestLine(), number(), T, testItems(), isNumericalLine(), numericalItems(), classes() (+21 more)

### Community 79 - "FoldersStore"
Cohesion: 0.08
Nodes (12): cleanFolderName(), Folder, FolderGroup, FoldersStore, groupByFolder(), sameName(), saveClosedFolders(), Note (+4 more)

### Community 82 - "Il database degli account (Supabase)"
Cohesion: 0.15
Nodes (12): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il controllo anti-robot (CAPTCHA, ottobre 2026), Il database degli account (Supabase), Il progetto, Il trasloco su glifo.page (ottobre 2026) (+4 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.11
Nodes (11): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+3 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.14
Nodes (14): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+6 more)

### Community 91 - "plot.ts"
Cohesion: 0.13
Nodes (25): staticGraphSvg(), chooseWindow(), chooseY(), clipLines(), dataWindow(), features(), findWindow(), nearOrigin() (+17 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.10
Nodes (11): @electric-sql/pglite, device(), login(), newContext, waitFor(), b64(), CAPTCHA_TOKEN, CODE (+3 more)

### Community 97 - "schemaBlocks.ts"
Cohesion: 0.10
Nodes (22): InsertOptions, toggleLinePrefix(), addPlaceholders, Placeholder, besideSchema(), BlockWidget, findWidgetBlocks(), guardBlocks() (+14 more)

### Community 98 - "conics.ts"
Cohesion: 0.17
Nodes (30): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+22 more)

### Community 100 - "In programma"
Cohesion: 0.22
Nodes (9): Account: i propri appunti su ogni dispositivo, anche da condividere, Commenti di chi prova Glifo, Idee per il futuro, In programma, La grafica: account, impostazioni, commenti, AI e lingua (chiesto il 10 ottobre 2026, se ne parla), La lavagna: idee in più, Più avanti, Schemi: idee in più (+1 more)

### Community 101 - "sql.ts"
Cohesion: 0.16
Nodes (18): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+10 more)

### Community 102 - "symbolsEn.test.ts"
Cohesion: 0.10
Nodes (41): SuggestionItem, editDistance(), normalizeText(), singular(), stem(), STOPWORDS, words(), BOTH (+33 more)

### Community 103 - "siteUpdate.ts"
Cohesion: 0.18
Nodes (16): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, loadPart() (+8 more)

### Community 104 - ".renderFormat"
Cohesion: 0.15
Nodes (14): fieldInput(), createEdgeCell(), edgeLook(), edgeStyle(), edgeTextAt(), insertSchema(), nodeLook(), nodeStyle() (+6 more)

### Community 105 - "editor.test.ts"
Cohesion: 0.09
Nodes (23): @lezer/common, closeMathBlockOnEnter(), tabOutOfMath(), templateInsertion(), CODE_NODES, CommandToken, commandTokenAt(), EditorMathContext (+15 more)

### Community 106 - "schema/preview.ts"
Cohesion: 0.10
Nodes (25): svg(), SchemaEditorOptions, base64(), hide(), OPEN, schemasForFile(), schemasFromFile(), T (+17 more)

### Community 107 - "spellcheck"
Cohesion: 0.21
Nodes (8): spellcheck(), close(), misspelledAt(), openAt(), replace(), tooltipView(), SpellChecker, SpellcheckOptions

### Community 108 - "spaces.ts"
Cohesion: 0.09
Nodes (44): decimalSeparator(), Digits, formatNumber(), formatRational(), fromNumber(), fromRational(), SUPERSCRIPT, writeDigits() (+36 more)

### Community 113 - "graph.ts"
Cohesion: 0.06
Nodes (41): @maxgraph/core, laneOf(), AT_X, cellHtml(), cellText(), COMPASS, createGraph(), drawSchema() (+33 more)

### Community 116 - "vitest"
Cohesion: 0.07
Nodes (25): vitest, GraphItem, parseGraph(), light, light, pts, result(), square (+17 more)

### Community 117 - "supabase.ts"
Cohesion: 0.10
Nodes (38): @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken(), ensureSessionOf() (+30 more)

### Community 118 - "Rational"
Cohesion: 0.12
Nodes (20): Part, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactRandom, exactRoot(), factorialExact() (+12 more)

### Community 119 - "BoardStore"
Cohesion: 0.08
Nodes (14): BoardStore, MemoryBoards, backup(), BackupNote, backupNotes(), restoreBackup(), RestoreBoards, Restored (+6 more)

### Community 120 - "calcResults.ts"
Cohesion: 0.11
Nodes (15): acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult, calcResults(), CheckWidget, formulasUntil() (+7 more)

### Community 121 - "escapeHtml"
Cohesion: 0.09
Nodes (17): checkHtml(), checkTitle(), T, cache, escapeHtml(), renderTexMathml(), T, TexRender (+9 more)

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "selection.ts"
Cohesion: 0.13
Nodes (24): centerOn(), copyStrokes(), cross(), handleScale(), IDENTITY, insideLasso(), keepInside(), LASSO_SHARE (+16 more)

### Community 124 - "Sheet"
Cohesion: 0.07
Nodes (33): Definition, Line, Line, Ode, expSumValue(), withWorkLimit(), ExactScope, FiniteContext (+25 more)

### Community 125 - "page.ts"
Cohesion: 0.08
Nodes (37): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), currentAccount(), PullResult, isShareToken(), parseSharedNote() (+29 more)

### Community 128 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 129 - "probability.ts"
Cohesion: 0.13
Nodes (23): End, Family, CompileOptions, ALL, complement(), distributionOf(), endAt(), EventContext (+15 more)

### Community 132 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 136 - "Board"
Cohesion: 0.11
Nodes (3): Board, Box, Stroke

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 139 - "sidePanel.ts"
Cohesion: 0.16
Nodes (18): AiResult, aiSettingsOf(), localizeTex(), cardPreviewTex(), formPreviewTex(), ParsedTemplate, parseTemplate(), PLACEHOLDER_TEX (+10 more)

### Community 140 - "spreadsheet/format.ts"
Cohesion: 0.19
Nodes (18): quantity(), decimalsOf(), ENGLISH, fixedNumber(), formatNumber(), generalNumber(), group(), MAX_DECIMALS (+10 more)

### Community 141 - "xlsx.ts"
Cohesion: 0.09
Nodes (46): RFC-4180, fflate, tablesNote(), csvCell(), csvDelimiter(), csvNumbers(), csvToSheet(), digitsOf() (+38 more)

### Community 142 - "editor/lists.ts"
Cohesion: 0.09
Nodes (58): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+50 more)

### Community 143 - "feedback.ts"
Cohesion: 0.05
Nodes (57): @mlc-ai/web-llm, vite-plugin-pwa, openFeedback(), accountOffMessage(), Site, T, commentDate(), commentItem() (+49 more)

### Community 144 - "schemaTools.test.ts"
Cohesion: 0.16
Nodes (15): alignBoxes(), Alignment, Box, distributeBoxes(), Position, crc32(), T, withDensity() (+7 more)

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
Cohesion: 0.17
Nodes (18): svgSize(), svgToPng(), canWriteFilesDirectly(), downloadBlob(), downloadText(), fileNameFor(), FsWindow, isAbort() (+10 more)

### Community 158 - "strokes.ts"
Cohesion: 0.23
Nodes (13): between(), capsuleSpan(), circleSpan(), eraserGrowth(), eraseStroke(), intersect(), linearSpan(), pieceLength() (+5 more)

### Community 159 - "math/calculus.ts"
Cohesion: 0.27
Nodes (14): argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot(), fieldOn(), numericPartials() (+6 more)

### Community 160 - "captcha.ts"
Cohesion: 0.21
Nodes (8): captchaToken(), loadTurnstile(), Turnstile, TURNSTILE_SCRIPT, Window, TURNSTILE_SITE_KEY, accountFailure(), Options

### Community 161 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 162 - "PlanView"
Cohesion: 0.29
Nodes (3): ganttWidth(), PlanView, GraphLook

### Community 163 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 166 - "mathEn2.test.ts"
Cohesion: 0.23
Nodes (10): EXACT, FLOAT, A, B, q(), result(), text(), result() (+2 more)

### Community 167 - ".visible"
Cohesion: 0.40
Nodes (5): Promemoria per lo studente, 2. La pagina dei commenti, tipo FAQ, Commenti di chi prova Glifo, page(), site()

### Community 168 - "I modelli e le chiavi API"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), In prova sul ramo `prova` (7 ottobre 2026): Qwen3 nel browser per «Spiegami», Le idee dello studente (5 ottobre 2026)

### Community 170 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

### Community 171 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

## Knowledge Gaps
- **870 isolated node(s):** `session-start.sh script`, `name`, `private`, `version`, `description` (+865 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1193 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **40 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `texts` connect `texts` to `i18n.ts`, `noteWords.ts`, `main.ts`, `compile`, `probability.ts`, `spec.ts`, `h`, `graph/preview.ts`, `Dove sono le cose`, `distributions.ts`, `localModels.ts`, `svg.ts`, `laplace.ts`, `editor/lists.ts`, `editor/editor.ts`, `schemaTools.test.ts`, `src/relocation.ts`, `MathError`, `linsys.ts`, `feedback.ts`, `xlsx.ts`, `schema/editor.ts`, `files.ts`, `index.ts`, `board.ts`, `NotesStore`, `arithmetic.ts`, `gantt.ts`, `math/calculus.ts`, `solve.ts`, `assistant.ts`, `logic.ts`, `several.ts`, `complex.ts`, `namesIn`, `study.ts`, `resize.ts`, `parse.ts`, `graph/file.ts`, `plan.ts`, `functions.ts`, `linear.ts`, `topics.ts`, `toolbar.ts`, `explainPanel.ts`, `toLatex`, `sheet.ts`, `finite.ts`, `sidePanel.ts`, `tutorial.ts`, `spreadsheet/editor.ts`, `odesolve.ts`, `statsShown.ts`, `schema/templates.ts`, `symbolic.ts`, `usesDecimalComma`, `schemaBlocks.ts`, `conics.ts`, `sql.ts`, `siteUpdate.ts`, `schema/preview.ts`, `spaces.ts`, `supabase.ts`, `BoardStore`, `calcResults.ts`, `escapeHtml`, `page.ts`?**
  _High betweenness centrality (0.120) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `Dove sono le cose` to `i18n.ts`, `noteWords.ts`, `main.ts`, `compile`, `spec.ts`, `h`, `num`, `graph/preview.ts`, `distributions.ts`, `localModels.ts`, `svg.ts`, `laplace.ts`, `SchemaEditor`, `SheetEditor`, `src/relocation.ts`, `MathError`, `linsys.ts`, `schema/editor.ts`, `Parser`, `board.ts`, `texts`, `NotesStore`, `arithmetic.ts`, `gantt.ts`, `study.ts`, `assistant.ts`, `logic.ts`, `several.ts`, `complex.ts`, `namesIn`, `graph/space.ts`, `parse.ts`, `graph/file.ts`, `plan.ts`, `functions.ts`, `linear.ts`, `topics.ts`, `Pt`, `view3d.ts`, `board/shapes.ts`, `toolbar.ts`, `renderTex`, `explainPanel.ts`, `toLatex`, `markdown.ts`, `sheet.ts`, `.int`, `finite.ts`, `tutorial.ts`, `spreadsheet/editor.ts`, `odesolve.ts`, `smoke-test.mjs`, `blockMove.ts`, `symbolic.ts`, `usesDecimalComma`, `tutorial.mjs`, `plot.ts`, `schemaBlocks.ts`, `conics.ts`, `siteUpdate.ts`, `.renderFormat`, `graph.ts`, `vitest`, `supabase.ts`, `Rational`, `BoardStore`, `calcResults.ts`, `escapeHtml`, `selection.ts`, `Sheet`, `page.ts`, `Board`, `sidePanel.ts`, `xlsx.ts`, `feedback.ts`, `schemaTools.test.ts`, `files.ts`, `strokes.ts`, `math/calculus.ts`, `PlanView`?**
  _High betweenness centrality (0.120) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `i18n.ts`, `noteWords.ts`, `main.ts`, `h`, `num`, `graph/preview.ts`, `Dove sono le cose`, `distributions.ts`, `localModels.ts`, `sidePanel.ts`, `xlsx.ts`, `editor/lists.ts`, `editor/editor.ts`, `feedback.ts`, `src/relocation.ts`, `schemaTools.test.ts`, `linsys.ts`, `schema/editor.ts`, `noteWordsMath.test.ts`, `store.ts`, `board.ts`, `NotesStore`, `strokes.ts`, `gantt.ts`, `captcha.ts`, `assistant.ts`, `mathEn2.test.ts`, `resize.ts`, `graph/space.ts`, `parse.ts`, `graph/file.ts`, `plan.ts`, `translations.test.ts`, `topics.ts`, `board/shapes.ts`, `toolbar.ts`, `explainPanel.ts`, `markdown.ts`, `sheet.ts`, `database.ts`, `tutorial.ts`, `spreadsheet/editor.ts`, `blockMove.ts`, `FoldersStore`, `plot.ts`, `schemaBlocks.ts`, `sql.ts`, `symbolsEn.test.ts`, `siteUpdate.ts`, `editor.test.ts`, `schema/preview.ts`, `supabase.ts`, `BoardStore`, `selection.ts`, `page.ts`?**
  _High betweenness centrality (0.087) - this node is a cross-community bridge._
- **Are the 307 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `tutorialModel()`) actually correct?**
  _`Dove sono le cose` has 307 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `name`, `private` to the rest of the system?**
  _870 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `i18n.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.039580209895052475 - nodes in this community are weakly interconnected._
- **Should `noteWords.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07908163265306123 - nodes in this community are weakly interconnected._