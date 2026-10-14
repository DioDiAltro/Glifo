# Graph Report - Glifo  (2026-10-14)

## Corpus Check
- 346 files · ~723,343 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5562 nodes · 20326 edges · 171 communities (129 shown, 42 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 679 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d89cb6c3`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- vite.config.ts
- vitest
- main.ts
- compile
- sync.ts
- spec.ts
- parse.ts
- mul
- graph/preview.ts
- Dove sono le cose
- distributions.ts
- ui/settings.ts
- svg.ts
- num
- SchemaEditor
- sheet.ts
- SheetEditor
- src/relocation.ts
- numerical.ts
- linsys.ts
- index.ts
- engine.ts
- schemaEn.test.ts
- schema/blocks.ts
- store.ts
- Parser
- ink.ts
- planPreview.ts
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
- view3d.ts
- Board
- toLatex
- plan.ts
- functions.ts
- MathError
- formula.ts
- ui/preview.ts
- graph/space.ts
- board/shapes.ts
- toolbar.ts
- SidePanel
- aiPanel.ts
- conics.ts
- subst
- noteWordsMath.test.ts
- 20261004091555_note_condivise.sql
- Stroke
- texts
- finite.ts
- i18n.ts
- dependencies
- Welcome to Glifo
- spreadsheet/editor.ts
- graphEn.test.ts
- odesolve.ts
- statsShown.ts
- smoke-test.mjs
- blockMove.ts
- Benvenuto in Glifo
- compilerOptions
- relocation-test.mjs
- LlamaWorker
- schema/templates.ts
- symbolic.ts
- scopeWith
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- captcha.ts
- .folderItem
- session-start.sh
- .claude/CLAUDE.md
- Il database degli account (Supabase)
- tutorial.mjs
- Abbonamenti
- topics.ts
- supabase-stub.sql
- account-test.mjs
- ExplainPanel
- sidePanel.ts
- In programma
- Field
- symbolsEn.test.ts
- aiPanel.test.ts
- sql.ts
- editor/editor.ts
- .renderFormat
- spellcheck.ts
- I modelli e le chiavi API
- graph.ts
- editor.test.ts
- graph/file.ts
- Rational
- MarkdownEditor
- calcResults.ts
- explainPanel.ts
- Le spiegazioni, come funzionano
- board.ts
- Sheet
- page.ts
- createFakeSupabase
- siteUpdate.ts
- Piano per piano
- complex.test.ts
- .constructor
- 20261008130026_commenti.sql
- database.ts
- markdown.ts
- xlsx.ts
- editor/lists.ts
- faqPage.ts
- schema/editor.ts
- Glifo
- vite
- Glifo – note per Claude
- files.ts
- SuggestionController
- schemaBlocks
- host.ts
- Costi
- devDependencies
- La lavagna
- La grafica: le otto richieste del 10 ottobre 2026
- licenses.ts
- aiSettings.test.ts
- NodeLook
- scripts

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 310 edges
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

## Communities (171 total, 42 thin omitted)

### Community 0 - "vite.config.ts"
Cohesion: 0.25
Nodes (5): @mlc-ai/web-llm, vite-plugin-pwa, defineFor(), MAIN_BRANCH, webllmModels

### Community 1 - "vitest"
Cohesion: 0.06
Nodes (48): @codemirror/state, @codemirror/view, vitest, addToGraphBlock(), formulaAtCursor(), GraphLabelLines, insertGraphBlock(), LABEL_KEYS (+40 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (122): account, ACCOUNT_OFF, accountButton, active, aiShown(), aiToggle, aiWork, app (+114 more)

### Community 3 - "compile"
Cohesion: 0.05
Nodes (73): argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot(), fieldOn(), numericPartials() (+65 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (31): AccountSync, withLock(), Account, EMPTY_STATE, FolderChange, FolderRow, isEmpty(), iso() (+23 more)

### Community 5 - "spec.ts"
Cohesion: 0.06
Nodes (89): conicItems(), isConicLine(), quadricEquation(), T, fourierItems(), isFourierLine(), isComplexLine(), onlyComplex() (+81 more)

### Community 6 - "parse.ts"
Cohesion: 0.05
Nodes (54): EMPTY_SCOPE, errorMessage(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES (+46 more)

### Community 7 - "mul"
Cohesion: 0.17
Nodes (64): polyEx(), similarSolution(), algebraic(), bigGcd(), byParts(), candidates(), canon(), combineLogs() (+56 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (45): decimalText(), addLabel(), boxes, cameras, complexCoord(), containing(), coord(), coordinates() (+37 more)

### Community 9 - "Dove sono le cose"
Cohesion: 0.06
Nodes (79): Dove sono le cose, Glifo – architettura, allNames(), answerFollowUp(), bareResult(), chained(), chatContext, ChatFn (+71 more)

### Community 10 - "distributions.ts"
Cohesion: 0.06
Nodes (64): addExp(), choose(), continuousQuantile(), decimals(), discreteQuantile(), exactIntervalProbability(), expSumValue(), factorialBig() (+56 more)

### Community 11 - "ui/settings.ts"
Cohesion: 0.05
Nodes (56): chat(), GlifoError, Gpu, load(), post(), remove(), scope, shaderF16() (+48 more)

### Community 12 - "svg.ts"
Cohesion: 0.08
Nodes (57): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), dataWindow(), domainEdge() (+49 more)

### Community 13 - "num"
Cohesion: 0.13
Nodes (37): absOf(), atIntegers(), close(), definite(), fourierShown(), isTrig(), isZero(), linearTrig() (+29 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.10
Nodes (6): isLanes(), loadDialect(), SchemaEditor, withLaneContents(), serializeSchema(), fileNameFor()

### Community 15 - "sheet.ts"
Cohesion: 0.05
Nodes (42): FieldContext, T, GraphItem, Scope, numericCoefficients(), partialSum(), LinearScope, bracketParts() (+34 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (7): functionLabel(), SheetEditor, englishTyping(), serializeSheet(), sheetSize(), CellRange, cloneSheet()

### Community 17 - "src/relocation.ts"
Cohesion: 0.06
Nodes (78): 1. «Cambia account», accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount() (+70 more)

### Community 18 - "numerical.ts"
Cohesion: 0.11
Nodes (49): bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial(), interpolating() (+41 more)

### Community 19 - "linsys.ts"
Cohesion: 0.09
Nodes (63): formatRational(), Eigenvalue, LinearValue, rref(), choices(), gcd(), linearSystem(), matrixEquation() (+55 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (42): b, bigops, c, calculus, fn, fr, fractions, functions (+34 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "schemaEn.test.ts"
Cohesion: 0.09
Nodes (28): schemaSummary(), GraphLook, openSchemaEditor(), Look, COLOR_NAMES, isRecord(), num(), oneOf() (+20 more)

### Community 23 - "schema/blocks.ts"
Cohesion: 0.14
Nodes (20): svg(), graphsForFile(), hide(), markdownForFile(), findFencedBlocks(), findSchemaBlock(), findSchemaBlocks(), OpenFence (+12 more)

### Community 24 - "store.ts"
Cohesion: 0.06
Nodes (19): BoardBackend, BoardData, BoardStore, done(), fromRecord(), IdbBoards, MemoryBoards, ofNote() (+11 more)

### Community 26 - "ink.ts"
Cohesion: 0.13
Nodes (18): Prefs, BOARD_PALETTES, BoardPalette, BoardTheme, highlightName(), inkName(), mid(), outlineSvg() (+10 more)

### Community 27 - "planPreview.ts"
Cohesion: 0.16
Nodes (12): planSwatchSvg(), planPicture, ganttWidth(), PlanView, T, crc32(), svgSize(), svgToPng() (+4 more)

### Community 28 - "NotesStore"
Cohesion: 0.04
Nodes (46): Deletion, DeletionLog, cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder() (+38 more)

### Community 29 - "arithmetic.ts"
Cohesion: 0.07
Nodes (68): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+60 more)

### Community 30 - "gantt.ts"
Cohesion: 0.09
Nodes (49): searchPhrases(), amount(), barColor(), crossings(), dateText(), dayMonth(), dayOf(), fitText() (+41 more)

### Community 31 - "study.ts"
Cohesion: 0.10
Nodes (42): Piece, Condition, Family, Group, Root, Shape, Constraint, Coord (+34 more)

### Community 32 - "solve.ts"
Cohesion: 0.09
Nodes (45): exponentialForm(), fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), decimalSeparator() (+37 more)

### Community 33 - "assistant.ts"
Cohesion: 0.12
Nodes (24): AiAnswer, AiError, AiResult, AiSettings, answerSchema(), askAi(), askCompatible(), askThroughHost() (+16 more)

### Community 34 - "logic.ts"
Cohesion: 0.11
Nodes (30): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+22 more)

### Community 35 - "several.ts"
Cohesion: 0.10
Nodes (50): criticalLine(), named(), severalItems(), surface(), T, boundsOf(), fourierProblem, value() (+42 more)

### Community 36 - "complex.ts"
Cohesion: 0.08
Nodes (44): add(), allRoots(), arg(), asin(), atan(), compileApply(), compileComplex(), compileFunction() (+36 more)

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
Cohesion: 0.09
Nodes (40): tickLabel(), Face, lerp(), planeSide(), planeTolerance(), regionFaces(), splitFace(), splitLine() (+32 more)

### Community 41 - "Board"
Cohesion: 0.09
Nodes (10): Board, clampZoom(), coalesced(), pointsOf(), pressureOf(), validView(), handleScale(), shapePoints() (+2 more)

### Community 42 - "toLatex"
Cohesion: 0.04
Nodes (87): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexValue(), isInequality() (+79 more)

### Community 43 - "plan.ts"
Cohesion: 0.08
Nodes (48): at(), breakEven(), Point, quantity(), T, tableItems(), textLabel(), chartData (+40 more)

### Community 44 - "functions.ts"
Cohesion: 0.06
Nodes (67): EMPTY, evaluateSheet(), number(), SheetEvaluator, T, addFormat(), decimalsOf(), divFormat() (+59 more)

### Community 45 - "MathError"
Cohesion: 0.12
Nodes (58): MathError, angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, dataOf() (+50 more)

### Community 46 - "formula.ts"
Cohesion: 0.12
Nodes (24): BinOp, COMPARE, englishFormula(), ERRORS_BY_LENGTH, formulaBody(), FormulaError, formulaRefs(), isFormula() (+16 more)

### Community 47 - "ui/preview.ts"
Cohesion: 0.10
Nodes (17): GraphLabels, BlockKind, MoveDir, BLOCK_NAMES, blockHiddenMessage(), blockKindOf(), blockMovedMessage(), BlockNames (+9 more)

### Community 48 - "graph/space.ts"
Cohesion: 0.13
Nodes (41): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+33 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (36): DrawAction, adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners() (+28 more)

### Community 50 - "toolbar.ts"
Cohesion: 0.11
Nodes (23): insertBlock(), InsertOptions, toggleLinePrefix(), wrapSelection(), LIST_STYLES, ListStyleId, addPlaceholders, Placeholder (+15 more)

### Community 51 - "SidePanel"
Cohesion: 0.18
Nodes (6): localizeTex(), cardPreview(), displayCode(), formPreview(), preventFocusSteal(), SidePanel

### Community 52 - "aiPanel.ts"
Cohesion: 0.13
Nodes (23): NoteSubject, labelHtml(), texHtml(), checkHtml(), checkTitle(), T, cache, cleanKatexError() (+15 more)

### Community 53 - "conics.ts"
Cohesion: 0.17
Nodes (30): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+22 more)

### Community 54 - "subst"
Cohesion: 0.17
Nodes (22): linearIn(), primitive(), verified(), linearCells(), atValues(), Converter, coordinates(), definiteParts() (+14 more)

### Community 55 - "noteWordsMath.test.ts"
Cohesion: 0.08
Nodes (27): EMPTY_COMPLEX_SCOPE, EXACT, FLOAT, A, B, q(), result(), text() (+19 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "Stroke"
Cohesion: 0.23
Nodes (3): BoardOptions, BoardChange, Stroke

### Community 58 - "texts"
Cohesion: 0.07
Nodes (68): valueText(), KINDS, sheetSummary(), T, WidgetBlock, pick(), texts, SchemaBlock (+60 more)

### Community 59 - "finite.ts"
Cohesion: 0.17
Nodes (28): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+20 more)

### Community 60 - "i18n.ts"
Cohesion: 0.03
Nodes (119): 3. Le impostazioni divise in sezioni, SyncStatus, browserLanguages(), dateLocale(), Entry, lang, numberLocale(), rich() (+111 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "Welcome to Glifo"
Cohesion: 0.20
Nodes (9): A few examples, Calculations and graphs, For programming too, Handy shortcuts, How to write formulas, Lists, Spell check, Try it now (+1 more)

### Community 63 - "spreadsheet/editor.ts"
Cohesion: 0.11
Nodes (41): currentCall(), Editing, MenuEntry, Move, PATHS, SheetEditorOptions, Snapshot, T (+33 more)

### Community 64 - "graphEn.test.ts"
Cohesion: 0.08
Nodes (32): hydrateGraphs(), checkGiven(), criticalPaths(), key(), Link, LinkType, listText(), offset() (+24 more)

### Community 65 - "odesolve.ts"
Cohesion: 0.08
Nodes (81): primed(), addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames() (+73 more)

### Community 66 - "statsShown.ts"
Cohesion: 0.15
Nodes (34): Lin, check(), correlation(), count(), covariance(), Data, dataStatistic(), deviation() (+26 more)

### Community 67 - "smoke-test.mjs"
Cohesion: 0.15
Nodes (6): markdown-it, playwright-core, PNG_ICONS, fakeLlmWorker(), firstVisit(), plainContext

### Community 68 - "blockMove.ts"
Cohesion: 0.11
Nodes (34): @codemirror/commands, blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove, blockPlace() (+26 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "relocation-test.mjs"
Cohesion: 0.18
Nodes (7): AFTER_MOVE, ids, newBrowser(), NOTICE_DAY, out, serve(), TYPES

### Community 72 - "LlamaWorker"
Cohesion: 0.22
Nodes (7): 2. La pagina dei commenti, tipo FAQ, Commenti di chi prova Glifo, constructor(), LlamaWorker, Commenti di chi prova Glifo, page(), site()

### Community 73 - "schema/templates.ts"
Cohesion: 0.21
Nodes (18): DEFAULT_EDGE, SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), conceptMap(), cycle(), edge() (+10 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (50): cancelLinear(), combine(), commonMonomial(), commonPositive(), decimalText(), definiteValue(), degree(), denominatorPart() (+42 more)

### Community 75 - "scopeWith"
Cohesion: 0.05
Nodes (77): constantIntegrand(), depth(), inequalityMargin(), integralRegion, LayeredSolid, Multiple, planeMargin(), PlanePart (+69 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Errore o imprevisto → nel dettaglio, 3. Serve una decisione → frasi complete, 4. Fine del compito → un solo riepilogo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "captcha.ts"
Cohesion: 0.21
Nodes (8): captchaToken(), loadTurnstile(), Turnstile, TURNSTILE_SCRIPT, Window, TURNSTILE_SITE_KEY, accountFailure(), Options

### Community 79 - ".folderItem"
Cohesion: 0.22
Nodes (3): clear(), NotesPanel, NotesPanelDeps

### Community 82 - "Il database degli account (Supabase)"
Cohesion: 0.14
Nodes (13): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il controllo anti-robot (CAPTCHA, ottobre 2026), Il database degli account (Supabase), Il progetto, Il trasloco su glifo.page (ottobre 2026) (+5 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.11
Nodes (11): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+3 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.14
Nodes (14): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+6 more)

### Community 91 - "topics.ts"
Cohesion: 0.17
Nodes (22): ATTRIBUTES, cut(), ER_SHAPES, fieldText(), fitLines(), flowOrder(), formulaText(), FREE_NAMES (+14 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.10
Nodes (11): @electric-sql/pglite, device(), login(), newContext, waitFor(), b64(), CAPTCHA_TOKEN, CODE (+3 more)

### Community 97 - "ExplainPanel"
Cohesion: 0.16
Nodes (5): modelName(), modelOf(), ExplainChat, ExplainPanel, preventFocusSteal()

### Community 98 - "sidePanel.ts"
Cohesion: 0.14
Nodes (20): expand(), preferredIndex(), SuggestionItem, isConfidentAnswer(), commandNames(), symbolsInCategory(), cardPreviewTex(), formPreviewTex() (+12 more)

### Community 100 - "In programma"
Cohesion: 0.25
Nodes (8): Account: i propri appunti su ogni dispositivo, anche da condividere, Idee per il futuro, In programma, La grafica: account, impostazioni, commenti, AI e lingua (chiesto il 10 ottobre 2026, se ne parla), La lavagna: idee in più, Più avanti, Schemi: idee in più, Trasloco: il sito su Cloudflare, con un dominio tutto di Glifo

### Community 101 - "Field"
Cohesion: 0.12
Nodes (7): characteristicPolynomial(), eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn()

### Community 102 - "symbolsEn.test.ts"
Cohesion: 0.11
Nodes (39): editDistance(), normalizeText(), singular(), stem(), STOPWORDS, words(), BOTH, buildIndex() (+31 more)

### Community 103 - "aiPanel.test.ts"
Cohesion: 0.10
Nodes (19): definedName(), formulaTopic(), graphTopic(), numberText(), studyOf(), theoremTopic(), AI_NEWS_TITLE, AI_WORKING_TITLE (+11 more)

### Community 104 - "sql.ts"
Cohesion: 0.14
Nodes (20): SchemaEditorOptions, Schema, Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey() (+12 more)

### Community 105 - "editor/editor.ts"
Cohesion: 0.05
Nodes (47): description, name, private, type, version, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/lang-markdown (+39 more)

### Community 106 - ".renderFormat"
Cohesion: 0.17
Nodes (12): fieldInput(), createEdgeCell(), edgeLook(), edgeStyle(), edgeTextAt(), nodeLook(), nodeStyle(), readSchema() (+4 more)

### Community 107 - "spellcheck.ts"
Cohesion: 0.08
Nodes (23): misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt(), openAt() (+15 more)

### Community 108 - "I modelli e le chiavi API"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), In prova sul ramo `prova` (7 ottobre 2026): Qwen3 nel browser per «Spiegami», Le idee dello studente (5 ottobre 2026)

### Community 113 - "graph.ts"
Cohesion: 0.06
Nodes (38): @maxgraph/core, AT_X, cellHtml(), cellText(), COMPASS, createGraph(), drawSchema(), insertSchema() (+30 more)

### Community 116 - "editor.test.ts"
Cohesion: 0.08
Nodes (24): tabOutOfMath(), templateInsertion(), commandTokenAt(), isInCode(), mathContextAt(), openMathBefore(), buildDecorations(), clearAllPlaceholders() (+16 more)

### Community 117 - "graph/file.ts"
Cohesion: 0.10
Nodes (37): FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsFromFile(), OPEN, swatchSvg() (+29 more)

### Community 118 - "Rational"
Cohesion: 0.09
Nodes (28): Part, expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactFunction, ExactRandom (+20 more)

### Community 119 - "MarkdownEditor"
Cohesion: 0.15
Nodes (5): closeMathBlockOnEnter(), EditorCallbacks, MarkdownEditor, insertTemplate(), setup()

### Community 120 - "calcResults.ts"
Cohesion: 0.06
Nodes (46): @codemirror/language, @lezer/common, explainTarget, schemaTitle(), acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin (+38 more)

### Community 121 - "explainPanel.ts"
Cohesion: 0.08
Nodes (29): Explanation, FollowUp, REPLY_TOKENS, glifoError(), LocalAbort, localErrorMessage(), localLlm, Pending (+21 more)

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "board.ts"
Cohesion: 0.05
Nodes (64): Action, DOT_SIZES, EraseAction, EraserMode, Finger, HANDLE_REACH, ICON, LassoAction (+56 more)

### Community 124 - "Sheet"
Cohesion: 0.08
Nodes (24): ExactComplexScope, Ode, withWorkLimit(), FiniteContext, FormattedResult, MathNode, chainOf(), close() (+16 more)

### Community 125 - "page.ts"
Cohesion: 0.05
Nodes (74): katex, @supabase/supabase-js, AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), accountError, appUrl() (+66 more)

### Community 128 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 129 - "siteUpdate.ts"
Cohesion: 0.20
Nodes (13): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, siteChanged() (+5 more)

### Community 132 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 133 - "complex.test.ts"
Cohesion: 0.14
Nodes (18): staticGraphSvg(), chooseWindow(), Box, chooseBox(), GraphSpec, DrawOptions, graphSvg(), DEFAULT_CAMERA (+10 more)

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 139 - "database.ts"
Cohesion: 0.23
Nodes (6): createDatabase(), createUser(), databaseTests(), feedbackTests(), migrations, shareTests()

### Community 140 - "markdown.ts"
Cohesion: 0.16
Nodes (19): blockKind, moveAttrs(), renderTexOrError(), renderTexWithResult(), configurePurify(), createMarkdownIt(), FORBIDDEN_TAGS, HLJS_LANGUAGES (+11 more)

### Community 141 - "xlsx.ts"
Cohesion: 0.09
Nodes (42): RFC-4180, fflate, csvCell(), csvDelimiter(), csvNumbers(), csvToSheet(), digitsOf(), field() (+34 more)

### Community 142 - "editor/lists.ts"
Cohesion: 0.08
Nodes (66): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+58 more)

### Community 143 - "faqPage.ts"
Cohesion: 0.08
Nodes (33): accountOffMessage(), Site, T, commentDate(), commentItem(), COMMENTS_MAX, CommentsDeps, CommentsError (+25 more)

### Community 144 - "schema/editor.ts"
Cohesion: 0.05
Nodes (55): alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ALIGN_NAMES, ARROW_NAMES (+47 more)

### Community 146 - "Glifo"
Cohesion: 0.12
Nodes (16): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Domande frequenti e commenti (+8 more)

### Community 154 - "vite"
Cohesion: 0.33
Nodes (4): vite, minutes, postMessage(), started

### Community 156 - "Glifo – note per Claude"
Cohesion: 0.22
Nodes (9): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole (+1 more)

### Community 157 - "files.ts"
Cohesion: 0.23
Nodes (15): inClaudeViewer(), canWriteFilesDirectly(), downloadText(), FsWindow, isAbort(), mdTypes(), OpenedFile, openMarkdownFiles() (+7 more)

### Community 159 - "schemaBlocks"
Cohesion: 0.18
Nodes (8): BlockWidget, findWidgetBlocks(), guardBlocks(), schemaBlocks(), create(), setup(), setup(), setup()

### Community 160 - "host.ts"
Cohesion: 0.21
Nodes (9): cache, capability(), ClaudeRuntime, hostDownloads, HostError, hostSample, isHostError(), ModelTier (+1 more)

### Community 161 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 162 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

### Community 163 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 166 - "La grafica: le otto richieste del 10 ottobre 2026"
Cohesion: 0.25
Nodes (8): 4. Più modelli per «Spiegami», 5. A cosa serve la chiave dell'AI, 6. Glifo anche in inglese, 7. Via il registro dei tocchi, 8. Il pulsante ✨ con il contorno, Gli abbonamenti, in tutto questo, In che ordine, La grafica: le otto richieste del 10 ottobre 2026

### Community 167 - "licenses.ts"
Cohesion: 0.32
Nodes (5): License, licenseOf(), LICENSES, T, texts

### Community 170 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

## Knowledge Gaps
- **870 isolated node(s):** `session-start.sh script`, `name`, `private`, `version`, `description` (+865 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1194 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **42 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `texts` connect `texts` to `vitest`, `main.ts`, `compile`, `siteUpdate.ts`, `spec.ts`, `parse.ts`, `graph/preview.ts`, `Dove sono le cose`, `distributions.ts`, `ui/settings.ts`, `svg.ts`, `num`, `editor/lists.ts`, `sheet.ts`, `schema/editor.ts`, `src/relocation.ts`, `numerical.ts`, `linsys.ts`, `faqPage.ts`, `xlsx.ts`, `schemaEn.test.ts`, `schema/blocks.ts`, `index.ts`, `ink.ts`, `planPreview.ts`, `NotesStore`, `arithmetic.ts`, `gantt.ts`, `study.ts`, `solve.ts`, `assistant.ts`, `logic.ts`, `several.ts`, `complex.ts`, `namesIn`, `files.ts`, `licenses.ts`, `resize.ts`, `toLatex`, `plan.ts`, `functions.ts`, `MathError`, `formula.ts`, `ui/preview.ts`, `toolbar.ts`, `aiPanel.ts`, `conics.ts`, `finite.ts`, `i18n.ts`, `spreadsheet/editor.ts`, `graphEn.test.ts`, `odesolve.ts`, `statsShown.ts`, `schema/templates.ts`, `symbolic.ts`, `scopeWith`, `topics.ts`, `sidePanel.ts`, `aiPanel.test.ts`, `sql.ts`, `editor/editor.ts`, `spellcheck.ts`, `graph/file.ts`, `calcResults.ts`, `explainPanel.ts`, `board.ts`, `page.ts`?**
  _High betweenness centrality (0.134) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `Dove sono le cose` to `vitest`, `main.ts`, `compile`, `spec.ts`, `parse.ts`, `mul`, `graph/preview.ts`, `distributions.ts`, `ui/settings.ts`, `svg.ts`, `num`, `SchemaEditor`, `sheet.ts`, `SheetEditor`, `src/relocation.ts`, `numerical.ts`, `linsys.ts`, `store.ts`, `Parser`, `ink.ts`, `planPreview.ts`, `NotesStore`, `arithmetic.ts`, `gantt.ts`, `study.ts`, `assistant.ts`, `logic.ts`, `several.ts`, `complex.ts`, `namesIn`, `view3d.ts`, `Board`, `toLatex`, `plan.ts`, `functions.ts`, `MathError`, `formula.ts`, `ui/preview.ts`, `graph/space.ts`, `board/shapes.ts`, `toolbar.ts`, `SidePanel`, `aiPanel.ts`, `conics.ts`, `subst`, `Stroke`, `texts`, `finite.ts`, `i18n.ts`, `spreadsheet/editor.ts`, `graphEn.test.ts`, `odesolve.ts`, `smoke-test.mjs`, `blockMove.ts`, `symbolic.ts`, `tutorial.mjs`, `topics.ts`, `ExplainPanel`, `sidePanel.ts`, `aiPanel.test.ts`, `.renderFormat`, `graph.ts`, `graph/file.ts`, `Rational`, `MarkdownEditor`, `calcResults.ts`, `explainPanel.ts`, `board.ts`, `Sheet`, `page.ts`, `siteUpdate.ts`, `markdown.ts`, `xlsx.ts`, `faqPage.ts`, `schema/editor.ts`, `files.ts`, `schemaBlocks`?**
  _High betweenness centrality (0.119) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `vite.config.ts`, `siteUpdate.ts`, `complex.test.ts`, `parse.ts`, `mul`, `graph/preview.ts`, `Dove sono le cose`, `distributions.ts`, `database.ts`, `svg.ts`, `ui/settings.ts`, `editor/lists.ts`, `faqPage.ts`, `sheet.ts`, `src/relocation.ts`, `markdown.ts`, `schema/editor.ts`, `num`, `xlsx.ts`, `schemaEn.test.ts`, `schema/blocks.ts`, `store.ts`, `ink.ts`, `NotesStore`, `gantt.ts`, `assistant.ts`, `translations.test.ts`, `resize.ts`, `aiSettings.test.ts`, `licenses.ts`, `toLatex`, `plan.ts`, `board/shapes.ts`, `toolbar.ts`, `noteWordsMath.test.ts`, `texts`, `i18n.ts`, `spreadsheet/editor.ts`, `graphEn.test.ts`, `blockMove.ts`, `captcha.ts`, `sidePanel.ts`, `symbolsEn.test.ts`, `aiPanel.test.ts`, `sql.ts`, `editor/editor.ts`, `spellcheck.ts`, `editor.test.ts`, `graph/file.ts`, `Rational`, `MarkdownEditor`, `explainPanel.ts`, `board.ts`, `Sheet`, `page.ts`?**
  _High betweenness centrality (0.065) - this node is a cross-community bridge._
- **Are the 309 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `tutorialModel()`) actually correct?**
  _`Dove sono le cose` has 309 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `name`, `private` to the rest of the system?**
  _870 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `vitest` be split into smaller, more focused modules?**
  _Cohesion score 0.06271186440677966 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.036942829457364344 - nodes in this community are weakly interconnected._