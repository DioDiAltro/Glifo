# Graph Report - Glifo  (2026-10-17)

## Corpus Check
- 363 files · ~749,531 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5735 nodes · 20894 edges · 163 communities (122 shown, 41 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 731 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2885108a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- i18n.ts
- vitest
- main.ts
- toNode
- sync.ts
- spec.ts
- src/relocation.ts
- num
- graph/preview.ts
- conics.ts
- distributions.ts
- explainPanel.ts
- svg.ts
- sheet.ts
- SchemaEditor
- laplace.ts
- SheetEditor
- formulaReader.ts
- numerical.ts
- arithmetic.ts
- index.ts
- client.ts
- schema/editor.ts
- topics.ts
- store.ts
- parse.ts
- board.ts
- NotesStore
- tutorial.mjs
- several.ts
- gantt.ts
- study.ts
- Rational
- assistant.ts
- logic.ts
- Parser
- complex.ts
- package.json
- translations.test.ts
- resize.ts
- view3d.ts
- markdown.ts
- localModels.ts
- schemaTools.test.ts
- functions.ts
- MathError
- prova-lettori.py
- ink.ts
- toolbar.ts
- board/shapes.ts
- schema/shapes.ts
- sidePanel.ts
- spreadsheet/format.ts
- graph.ts
- SuggestionController
- page.ts
- 20261004091555_note_condivise.sql
- compile
- noteWordsMath.test.ts
- finite.ts
- ui/preview.ts
- dependencies
- Welcome to Glifo
- spreadsheet/editor.ts
- spreadsheetEn.test.ts
- odesolve.ts
- blockMove.ts
- linsys.ts
- calcResults.ts
- Benvenuto in Glifo
- compilerOptions
- fields.ts
- files.ts
- symbolic.ts
- probability.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- latex.ts
- aiPanel.test.ts
- session-start.sh
- .claude/CLAUDE.md
- Il database degli account (Supabase)
- engine.ts
- Abbonamenti
- plan.ts
- Glifo – note per Claude
- supabase-stub.sql
- account-test.mjs
- texts
- supabase.ts
- parseSchema
- schemaBlocks.ts
- symbolsEn.test.ts
- siteUpdate.ts
- graph/file.ts
- Distribution
- mathEn2.test.ts
- spellcheck.ts
- .constructor
- grafo-html.mjs
- smoke-test.mjs
- schema/templates.ts
- tutorial.ts
- L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota
- createFakeSupabase
- Glifo
- editor/editor.ts
- ExplainPanel
- Sheet
- relocation-test.mjs
- LlamaWorker
- Dove sono le cose
- I modelli e le chiavi API
- Costi
- Board
- 20261008130026_commenti.sql
- Le spiegazioni, come funzionano
- xlsx.ts
- feedback.ts
- schemaEn.test.ts
- inference.ts
- schema/preview.ts
- lettore-vero.mjs
- restore.ts
- editor/lists.ts
- planPreview.ts
- In programma
- Piano per piano
- 2. Dalla lavagna alla nota

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 349 edges
2. `MathError` - 151 edges
3. `Sheet` - 150 edges
4. `num()` - 145 edges
5. `h()` - 143 edges
6. `MathNode` - 131 edges
7. `texts` - 125 edges
8. `mul()` - 124 edges
9. `Board` - 119 edges
10. `compile()` - 116 edges

## Surprising Connections (you probably didn't know these)
- `Dove sono le cose` --references--> `fakeLlmWorker()`  [INFERRED]
  ARCHITETTURA.md → scripts/smoke-test.mjs
- `Dove sono le cose` --references--> `tutorialModel()`  [INFERRED]
  ARCHITETTURA.md → scripts/tutorial.mjs
- `Dove sono le cose` --references--> `tutorialReader()`  [INFERRED]
  ARCHITETTURA.md → scripts/tutorial.mjs
- `Come viene pubblicata` --references--> `dist()`  [INFERRED]
  README.md → src/board/shapes.ts
- `Trasloco: il sito su Cloudflare, con un dominio tutto di Glifo` --references--> `dist()`  [INFERRED]
  ROADMAP.md → src/board/shapes.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (163 total, 41 thin omitted)

### Community 0 - "i18n.ts"
Cohesion: 0.03
Nodes (112): SyncStatus, downloadSize(), Gpu, gpuF16(), modelsInBrowser(), modelVariant, browserLang(), browserLanguages() (+104 more)

### Community 1 - "vitest"
Cohesion: 0.06
Nodes (35): vitest, formulaAtCursor(), formulaGraph(), parseGraph(), DrawOptions, Palette, PALETTES, DEFAULT_CAMERA (+27 more)

### Community 2 - "main.ts"
Cohesion: 0.03
Nodes (114): addToGraphBlock(), account, ACCOUNT_OFF, accountButton, active, aiShown(), aiToggle, aiWork (+106 more)

### Community 3 - "toNode"
Cohesion: 0.10
Nodes (38): close(), Definite, definiteIntegral(), exValue(), samples(), EMPTY_SCOPE, absOf(), boundsOf() (+30 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (31): AccountSync, withLock(), Account, EMPTY_STATE, FolderChange, FolderRow, isEmpty(), iso() (+23 more)

### Community 5 - "spec.ts"
Cohesion: 0.04
Nodes (136): conicItems(), isConicLine(), quadricEquation(), T, FieldContext, valueLabel(), fourierItems(), isFourierLine() (+128 more)

### Community 6 - "src/relocation.ts"
Cohesion: 0.06
Nodes (72): accountSpace(), adoptGuestNotes(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf(), prefsKey() (+64 more)

### Community 7 - "num"
Cohesion: 0.13
Nodes (88): atIntegers(), withoutAbs(), hyperbolicToExp(), polyEx(), similarSolution(), algebraic(), bigGcd(), byParts() (+80 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (47): addLabel(), boxes, cameras, complexCoord(), containing(), coord(), coordinates(), drawings (+39 more)

### Community 9 - "conics.ts"
Cohesion: 0.17
Nodes (30): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+22 more)

### Community 10 - "distributions.ts"
Cohesion: 0.15
Nodes (29): choose(), decimals(), expSumValue(), factorialBig(), FAMILIES, Family, integerParam(), invalid() (+21 more)

### Community 11 - "explainPanel.ts"
Cohesion: 0.14
Nodes (27): explainTarget, Explanation, schemaTitle(), formulasUntil(), sheetBefore(), explanationMarkdown(), hasCalculation(), insertAfterBlock() (+19 more)

### Community 12 - "svg.ts"
Cohesion: 0.08
Nodes (61): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseWindow(), chooseY(), clipLines(), dataWindow() (+53 more)

### Community 13 - "sheet.ts"
Cohesion: 0.08
Nodes (57): dataOf(), Lin, statisticOf(), NUMERICAL, bracketParts(), BRACKETS, CHECK_VALUES, checks (+49 more)

### Community 15 - "laplace.ts"
Cohesion: 0.10
Nodes (54): factoredPolynomial(), beyondPoles(), compiled(), E, exp(), fractionShown(), HALF, inverseLaplaceShown() (+46 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (5): SheetEditor, serializeSheet(), sheetSize(), CellRange, cloneSheet()

### Community 17 - "formulaReader.ts"
Cohesion: 0.08
Nodes (37): ENGINE_BYTES, FromReader, READER_CACHE, READER_DOWNLOAD, READER_FILES, READER_MODEL, READER_REVISION, ReaderErrorCode (+29 more)

### Community 18 - "numerical.ts"
Cohesion: 0.11
Nodes (48): FormatOptions, bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial() (+40 more)

### Community 19 - "arithmetic.ts"
Cohesion: 0.10
Nodes (47): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+39 more)

### Community 20 - "index.ts"
Cohesion: 0.06
Nodes (46): SuggestionItem, b, bigops, c, calculus, fn, fr, fractions (+38 more)

### Community 21 - "client.ts"
Cohesion: 0.10
Nodes (13): Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download(), fetchDictionary() (+5 more)

### Community 22 - "schema/editor.ts"
Cohesion: 0.05
Nodes (51): ALIGN, ALIGN_NAMES, ARROW_NAMES, AT_ICONS, AT_NAMES, BASE_PRESETS, BIG_ARROWS, DB_PRESETS (+43 more)

### Community 23 - "topics.ts"
Cohesion: 0.20
Nodes (18): ATTRIBUTES, containerOf(), cut(), ER_SHAPES, fieldText(), fitLines(), flowOrder(), FREE_NAMES (+10 more)

### Community 24 - "store.ts"
Cohesion: 0.06
Nodes (16): BoardBackend, BoardStore, done(), fromRecord(), IdbBoards, MemoryBoards, ofNote(), openBoardDatabase() (+8 more)

### Community 25 - "parse.ts"
Cohesion: 0.07
Nodes (44): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, derivativeOperator(), describe() (+36 more)

### Community 26 - "board.ts"
Cohesion: 0.05
Nodes (73): Action, coalesced(), DOT_SIZES, DrawAction, EraseAction, EraserMode, Finger, HANDLE_REACH (+65 more)

### Community 27 - "NotesStore"
Cohesion: 0.04
Nodes (39): Deletion, DeletionLog, cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder() (+31 more)

### Community 28 - "tutorial.mjs"
Cohesion: 0.14
Nodes (8): centerOf(), clickOn(), ffmpeg, SCENES, SIZE, tutorialModel(), tutorialReader(), work

### Community 29 - "several.ts"
Cohesion: 0.13
Nodes (39): exText(), fractionNear(), at(), Candidate, candidates(), compiled(), constraintsOf(), COORDS (+31 more)

### Community 30 - "gantt.ts"
Cohesion: 0.04
Nodes (101): insertGraphBlock(), setGraphLabels(), graphImagesFor(), amount(), barColor(), crossings(), dateText(), dayMonth() (+93 more)

### Community 31 - "study.ts"
Cohesion: 0.13
Nodes (39): limit(), severalLimit, Asymptote, asymptoteText(), compiled(), cutsOf(), defined(), domainOf() (+31 more)

### Community 32 - "Rational"
Cohesion: 0.10
Nodes (27): Part, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactFunction, exactRoot(), factorialExact() (+19 more)

### Community 33 - "assistant.ts"
Cohesion: 0.08
Nodes (34): AiAnswer, AiError, AiSettings, answerSchema(), askAi(), askCompatible(), askThroughHost(), capitalized() (+26 more)

### Community 34 - "logic.ts"
Cohesion: 0.11
Nodes (30): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+22 more)

### Community 36 - "complex.ts"
Cohesion: 0.05
Nodes (86): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexValue(), isInequality() (+78 more)

### Community 37 - "package.json"
Cohesion: 0.05
Nodes (42): description, devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript (+34 more)

### Community 38 - "translations.test.ts"
Cohesion: 0.17
Nodes (18): AstNode, calleeName(), check(), checkPair(), visit(), children(), entryPairs(), files (+10 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (24): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+16 more)

### Community 40 - "view3d.ts"
Cohesion: 0.06
Nodes (87): staticGraphSvg(), addMesh(), addTet(), affinePlane(), Axis, centroid(), chooseBox(), clipBy() (+79 more)

### Community 41 - "markdown.ts"
Cohesion: 0.09
Nodes (40): dompurify, highlight.js, markdown-it-footnote, lineDepth(), mathTag, parseBlockMath(), dataRange(), bulletGroup() (+32 more)

### Community 42 - "localModels.ts"
Cohesion: 0.05
Nodes (51): chat(), GlifoError, Gpu, load(), post(), remove(), scope, shaderF16() (+43 more)

### Community 43 - "schemaTools.test.ts"
Cohesion: 0.14
Nodes (21): laneOf(), alignBoxes(), Alignment, Box, distributeBoxes(), Position, cellHtml(), labelHtml() (+13 more)

### Community 44 - "functions.ts"
Cohesion: 0.08
Nodes (64): EMPTY, number(), T, addFormat(), divFormat(), GENERAL, most(), mulFormat() (+56 more)

### Community 45 - "MathError"
Cohesion: 0.05
Nodes (106): MathError, decimalSeparator(), Digits, formatNumber(), formatRational(), fromNumber(), fromRational(), SUPERSCRIPT (+98 more)

### Community 46 - "prova-lettori.py"
Cohesion: 0.12
Nodes (4): byte_table(), read(), Reader, tidy()

### Community 47 - "ink.ts"
Cohesion: 0.10
Nodes (31): IMAGE_SIZE, Prefs, BOARD_PALETTES, BoardPalette, BoardTheme, highlightName(), inkName(), mid() (+23 more)

### Community 48 - "toolbar.ts"
Cohesion: 0.17
Nodes (15): insertBlock(), wrapSelection(), ListStyleId, Action, createToolbar(), insertCode(), insertLink(), listStyle() (+7 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.14
Nodes (33): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+25 more)

### Community 50 - "schema/shapes.ts"
Cohesion: 0.08
Nodes (16): ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape, IdentifyingRelationShape (+8 more)

### Community 51 - "sidePanel.ts"
Cohesion: 0.11
Nodes (19): AiResult, localizeTex(), cleanKatexError(), isConfidentAnswer(), symbolsInCategory(), append(), Child, clear() (+11 more)

### Community 52 - "spreadsheet/format.ts"
Cohesion: 0.10
Nodes (35): valueText(), quantity(), hide(), OPEN, sheetsForFile(), sheetsFromFile(), T, unhide() (+27 more)

### Community 53 - "graph.ts"
Cohesion: 0.10
Nodes (35): isContainer(), isLanes(), AT_X, cellText(), COMPASS, createEdgeCell(), drawSchema(), edgeLook() (+27 more)

### Community 54 - "SuggestionController"
Cohesion: 0.14
Nodes (11): expand(), preferredIndex(), SuggestionController, CATEGORIES, cardPreviewTex(), formPreviewTex(), ParsedTemplate, parseTemplate() (+3 more)

### Community 55 - "page.ts"
Cohesion: 0.06
Nodes (49): katex, accountDataFile(), currentAccount(), PullResult, openShareDialog(), changeAccess(), changeCopy(), refreshChanged() (+41 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "compile"
Cohesion: 0.04
Nodes (102): depth(), integralRegion, LayeredSolid, Multiple, planeMargin(), PlanePart, radiusOf(), spaceLayers() (+94 more)

### Community 58 - "noteWordsMath.test.ts"
Cohesion: 0.07
Nodes (27): BLOCKS, FROM_ENGLISH, FUNCTIONS, functionWordPairs(), GRAPH_KEY_FORMS, GRAPH_KEY_LINE, GRAPH_KEYS, graphKeyWord() (+19 more)

### Community 59 - "finite.ts"
Cohesion: 0.17
Nodes (28): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+20 more)

### Community 60 - "ui/preview.ts"
Cohesion: 0.09
Nodes (19): GraphLabels, BlockKind, hydrateSheets(), T, BLOCK_NAMES, blockHiddenMessage(), blockKindOf(), blockMovedMessage() (+11 more)

### Community 61 - "dependencies"
Cohesion: 0.07
Nodes (27): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+19 more)

### Community 62 - "Welcome to Glifo"
Cohesion: 0.20
Nodes (9): A few examples, Calculations and graphs, For programming too, Handy shortcuts, How to write formulas, Lists, Spell check, Try it now (+1 more)

### Community 63 - "spreadsheet/editor.ts"
Cohesion: 0.08
Nodes (52): sheetSummary(), currentCall(), Editing, MenuEntry, Move, openSheetEditor(), PATHS, SheetEditorOptions (+44 more)

### Community 64 - "spreadsheetEn.test.ts"
Cohesion: 0.13
Nodes (36): formulaText(), functionLabel(), englishNumber(), italianNumber(), readEnglishInput(), readInput(), swapSeparators(), BinOp (+28 more)

### Community 65 - "odesolve.ts"
Cohesion: 0.08
Nodes (79): addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames(), constantParticular() (+71 more)

### Community 66 - "blockMove.ts"
Cohesion: 0.11
Nodes (35): @codemirror/commands, blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove, blockPlace() (+27 more)

### Community 67 - "linsys.ts"
Cohesion: 0.09
Nodes (46): choices(), gcd(), isStandardUnknown(), linearSystem(), matrixEquation(), matrixSystem(), minorsGcd(), ONE (+38 more)

### Community 68 - "calcResults.ts"
Cohesion: 0.11
Nodes (14): @lezer/common, acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult, calcResults(), CheckWidget (+6 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "fields.ts"
Cohesion: 0.13
Nodes (34): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+26 more)

### Community 73 - "files.ts"
Cohesion: 0.13
Nodes (25): ReadProgress, inClaudeViewer(), canWriteFilesDirectly(), FsWindow, isAbort(), mdTypes(), OpenedFile, openMarkdownFiles() (+17 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (63): primitive(), verified(), atValues(), Converter, coordinates(), decimalText(), definiteParts(), definiteValue() (+55 more)

### Community 75 - "probability.ts"
Cohesion: 0.11
Nodes (29): addExp(), End, expSum, subtractExp(), CompileOptions, ExactScope, ALL, complement() (+21 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Errore o imprevisto → nel dettaglio, 3. Serve una decisione → frasi complete, 4. Fine del compito → un solo riepilogo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "latex.ts"
Cohesion: 0.11
Nodes (25): ACCENT_COMMANDS, DISTRIBUTION_LATEX, distributionLatex(), domainLatex(), fnLatex(), fnName(), formLatex(), GREEK_COMMANDS (+17 more)

### Community 79 - "aiPanel.test.ts"
Cohesion: 0.06
Nodes (41): ExplainTone, FollowUp, REPLY_TOKENS, definedName(), formulaTopic(), graphTopic(), numberText(), studyOf() (+33 more)

### Community 82 - "Il database degli account (Supabase)"
Cohesion: 0.20
Nodes (9): Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Note condivise con un link, Sincronizzazione, `sync_pull({ since })`: scarica le novità (+1 more)

### Community 83 - "engine.ts"
Cohesion: 0.16
Nodes (10): @farscrl/hunspell-wasm, capitalize(), COMMON_FIXES, DictionaryData, ELISIONS, inGlossary(), lower(), SpellEngine (+2 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.10
Nodes (20): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Deciso (5 ottobre 2026), Dopo (+12 more)

### Community 91 - "plan.ts"
Cohesion: 0.07
Nodes (50): at(), breakEven(), Point, T, tableItems(), textLabel(), graphKeyLine(), chartData (+42 more)

### Community 92 - "Glifo – note per Claude"
Cohesion: 0.20
Nodes (9): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole (+1 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.11
Nodes (10): device(), login(), newContext, waitFor(), b64(), CAPTCHA_TOKEN, CODE, GOOGLE_CODE (+2 more)

### Community 97 - "texts"
Cohesion: 0.15
Nodes (22): closing(), FUNCTIONS, tidyLatex(), withoutLooseGroups(), texHtml(), toolButton(), texts, checkHtml() (+14 more)

### Community 98 - "supabase.ts"
Cohesion: 0.07
Nodes (45): @supabase/supabase-js, captchaToken(), loadTurnstile(), Turnstile, TURNSTILE_SCRIPT, Window, AUTH_STORAGE_KEY, TURNSTILE_SITE_KEY (+37 more)

### Community 100 - "parseSchema"
Cohesion: 0.16
Nodes (17): @maxgraph/core, openSchemaEditor(), createGraph(), styleHandles(), isRecord(), num(), oneOf(), parseSchema() (+9 more)

### Community 101 - "schemaBlocks.ts"
Cohesion: 0.09
Nodes (28): toggleLinePrefix(), besideSchema(), BlockWidget, findWidgetBlocks(), guardBlocks(), KINDS, schemaBlockRanges(), schemaBlocks() (+20 more)

### Community 102 - "symbolsEn.test.ts"
Cohesion: 0.11
Nodes (39): editDistance(), normalizeText(), singular(), stem(), STOPWORDS, words(), BOTH, buildIndex() (+31 more)

### Community 103 - "siteUpdate.ts"
Cohesion: 0.15
Nodes (19): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, loadPart() (+11 more)

### Community 104 - "graph/file.ts"
Cohesion: 0.10
Nodes (37): FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), graphsForFile(), graphsFromFile(), hide(), OPEN (+29 more)

### Community 105 - "Distribution"
Cohesion: 0.15
Nodes (11): continuousQuantile(), discreteQuantile(), Distribution, exactIntervalProbability(), integerRange(), intervalProbability(), pValue(), rejection() (+3 more)

### Community 106 - "mathEn2.test.ts"
Cohesion: 0.28
Nodes (7): EMPTY_COMPLEX_SCOPE, Interval, args(), q(), result(), tex(), text()

### Community 107 - "spellcheck.ts"
Cohesion: 0.07
Nodes (28): @codemirror/lang-markdown, formulaInsertion(), mathMarkdown, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck() (+20 more)

### Community 108 - ".constructor"
Cohesion: 0.18
Nodes (4): closeMathBlockOnEnter(), EditorCallbacks, searchPhrases(), tabOutOfMath()

### Community 113 - "grafo-html.mjs"
Cohesion: 0.17
Nodes (5): graphFile, names, namesFile, root, PNG_ICONS

### Community 116 - "smoke-test.mjs"
Cohesion: 0.22
Nodes (5): markdown-it, fakeFormulaWorker(), fakeLlmWorker(), firstVisit(), plainContext

### Community 117 - "schema/templates.ts"
Cohesion: 0.16
Nodes (22): DEFAULT_EDGE, defaultPlace(), SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), tableMetrics(), TextPlace (+14 more)

### Community 118 - "tutorial.ts"
Cohesion: 0.16
Nodes (11): HINT_MS, openTutorial(), show(), richText(), showTutorialHint(), close(), T, TUTORIAL_PAGES (+3 more)

### Community 119 - "L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota"
Cohesion: 0.29
Nodes (7): 3. Da una foto alla nota, 4. Dettare: la voce diventa testo nella nota, 5. Registrare le lezioni e trascriverle, Da sistemare con il primo punto che tocca l'AI, Fonti (controllate il 14 ottobre 2026), In che ordine, L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota

### Community 120 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 121 - "Glifo"
Cohesion: 0.12
Nodes (16): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Domande frequenti e commenti (+8 more)

### Community 122 - "editor/editor.ts"
Cohesion: 0.06
Nodes (47): @codemirror/language, @codemirror/state, @codemirror/view, highlight, T, GraphLabelLines, LABEL_KEYS, InsertOptions (+39 more)

### Community 123 - "ExplainPanel"
Cohesion: 0.16
Nodes (4): ExplainChat, ExplainPanel, preventFocusSteal(), formulasSummary()

### Community 124 - "Sheet"
Cohesion: 0.06
Nodes (37): ExactComplexScope, Ode, withWorkLimit(), ExactRandom, FiniteContext, FormattedResult, Mat, differentialRequest (+29 more)

### Community 125 - "relocation-test.mjs"
Cohesion: 0.18
Nodes (7): AFTER_MOVE, ids, newBrowser(), NOTICE_DAY, out, serve(), TYPES

### Community 129 - "Dove sono le cose"
Cohesion: 0.05
Nodes (81): 1. A cosa serve l'AI dei modelli di frontiera, Dove sono le cose, Glifo – architettura, allNames(), answerFollowUp(), bareResult(), chained(), chatContext (+73 more)

### Community 132 - "I modelli e le chiavi API"
Cohesion: 0.33
Nodes (6): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), In prova sul ramo `prova` (7 ottobre 2026): Qwen3 nel browser per «Spiegami», La chiave, il server locale e la scelta del modello (14 ottobre 2026), Le idee dello studente (5 ottobre 2026)

### Community 133 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 136 - "Board"
Cohesion: 0.07
Nodes (8): Board, clampZoom(), loadPrefs(), penErases(), pressureOf(), validView(), SizeChoice, shapePoints()

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 139 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 141 - "xlsx.ts"
Cohesion: 0.07
Nodes (47): RFC-4180, fflate, tablesNote(), csvCell(), csvDelimiter(), csvNumbers(), csvToSheet(), digitsOf() (+39 more)

### Community 143 - "feedback.ts"
Cohesion: 0.06
Nodes (52): SUPABASE_KEY, SUPABASE_URL, feedbackButton, openFeedback(), NEW_ORIGIN, accountOffMessage(), Site, T (+44 more)

### Community 146 - "schemaEn.test.ts"
Cohesion: 0.10
Nodes (26): @electric-sql/pglite, SchemaEditorOptions, COLOR_NAMES, Schema, SHAPE_NAMES, Column, DEFAULT_TYPE, findForeignKeys() (+18 more)

### Community 156 - "inference.ts"
Cohesion: 0.14
Nodes (27): between(), chiSquareTest(), confidence(), confidenceShown(), decimals(), Given, hypothesisTest(), InferenceContext (+19 more)

### Community 159 - "schema/preview.ts"
Cohesion: 0.08
Nodes (34): markdownForFile(), openSchema(), saveSchemaBlock(), findSchemaBlock(), findSchemaBlocks(), schemaBlockAtLine(), base64(), hide() (+26 more)

### Community 160 - "lettore-vero.mjs"
Cohesion: 0.15
Nodes (7): playwright-core, vite, GLYPHS, WRITING, minutes, postMessage(), started

### Community 162 - "restore.ts"
Cohesion: 0.20
Nodes (12): restore(), BackupNote, backupNotes(), restoreBackup(), RestoreBoards, Restored, restoredMessage(), T (+4 more)

### Community 166 - "editor/lists.ts"
Cohesion: 0.09
Nodes (58): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+50 more)

### Community 170 - "planPreview.ts"
Cohesion: 0.17
Nodes (10): labelHtml(), planName(), ganttWidth(), PlanView, T, GraphLook, downloadBlob(), downloadText() (+2 more)

### Community 172 - "In programma"
Cohesion: 0.22
Nodes (9): Account: i propri appunti su ogni dispositivo, anche da condividere, Commenti di chi prova Glifo, Idee per il futuro, In programma, L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota (14 ottobre 2026, se ne parla), La lavagna: idee in più, Più avanti, Schemi: idee in più (+1 more)

### Community 173 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

## Knowledge Gaps
- **892 isolated node(s):** `session-start.sh script`, `name`, `private`, `version`, `description` (+887 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1238 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **41 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `i18n.ts`, `vitest`, `main.ts`, `toNode`, `spec.ts`, `src/relocation.ts`, `num`, `Board`, `graph/preview.ts`, `conics.ts`, `explainPanel.ts`, `svg.ts`, `xlsx.ts`, `feedback.ts`, `SheetEditor`, `formulaReader.ts`, `numerical.ts`, `arithmetic.ts`, `schema/editor.ts`, `topics.ts`, `store.ts`, `parse.ts`, `board.ts`, `NotesStore`, `tutorial.mjs`, `inference.ts`, `gantt.ts`, `several.ts`, `Rational`, `assistant.ts`, `logic.ts`, `study.ts`, `complex.ts`, `schema/preview.ts`, `view3d.ts`, `markdown.ts`, `localModels.ts`, `planPreview.ts`, `schemaTools.test.ts`, `MathError`, `2. Dalla lavagna alla nota`, `ink.ts`, `functions.ts`, `board/shapes.ts`, `schema/shapes.ts`, `sidePanel.ts`, `spreadsheet/format.ts`, `graph.ts`, `toolbar.ts`, `compile`, `finite.ts`, `ui/preview.ts`, `spreadsheet/editor.ts`, `spreadsheetEn.test.ts`, `odesolve.ts`, `blockMove.ts`, `linsys.ts`, `fields.ts`, `files.ts`, `symbolic.ts`, `probability.ts`, `aiPanel.test.ts`, `plan.ts`, `texts`, `supabase.ts`, `schemaBlocks.ts`, `siteUpdate.ts`, `graph/file.ts`, `spellcheck.ts`, `.constructor`, `smoke-test.mjs`, `schema/templates.ts`, `tutorial.ts`, `ExplainPanel`, `Sheet`?**
  _High betweenness centrality (0.131) - this node is a cross-community bridge._
- **Why does `texts` connect `texts` to `i18n.ts`, `Dove sono le cose`, `main.ts`, `toNode`, `spec.ts`, `src/relocation.ts`, `graph/preview.ts`, `conics.ts`, `distributions.ts`, `explainPanel.ts`, `svg.ts`, `sheet.ts`, `xlsx.ts`, `laplace.ts`, `feedback.ts`, `formulaReader.ts`, `numerical.ts`, `arithmetic.ts`, `schemaEn.test.ts`, `index.ts`, `schema/editor.ts`, `topics.ts`, `parse.ts`, `board.ts`, `NotesStore`, `inference.ts`, `several.ts`, `gantt.ts`, `study.ts`, `Rational`, `assistant.ts`, `logic.ts`, `schema/preview.ts`, `complex.ts`, `restore.ts`, `editor/lists.ts`, `resize.ts`, `localModels.ts`, `planPreview.ts`, `functions.ts`, `MathError`, `ink.ts`, `toolbar.ts`, `sidePanel.ts`, `spreadsheet/format.ts`, `page.ts`, `compile`, `finite.ts`, `ui/preview.ts`, `spreadsheet/editor.ts`, `spreadsheetEn.test.ts`, `odesolve.ts`, `linsys.ts`, `calcResults.ts`, `fields.ts`, `files.ts`, `symbolic.ts`, `probability.ts`, `latex.ts`, `aiPanel.test.ts`, `plan.ts`, `supabase.ts`, `schemaBlocks.ts`, `siteUpdate.ts`, `graph/file.ts`, `spellcheck.ts`, `schema/templates.ts`, `tutorial.ts`, `editor/editor.ts`?**
  _High betweenness centrality (0.100) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `i18n.ts`, `Dove sono le cose`, `src/relocation.ts`, `num`, `graph/preview.ts`, `distributions.ts`, `svg.ts`, `xlsx.ts`, `feedback.ts`, `laplace.ts`, `formulaReader.ts`, `schemaEn.test.ts`, `store.ts`, `parse.ts`, `board.ts`, `NotesStore`, `gantt.ts`, `schema/preview.ts`, `assistant.ts`, `restore.ts`, `package.json`, `editor/lists.ts`, `resize.ts`, `view3d.ts`, `translations.test.ts`, `localModels.ts`, `schemaTools.test.ts`, `MathError`, `ink.ts`, `board/shapes.ts`, `graph.ts`, `SuggestionController`, `page.ts`, `compile`, `noteWordsMath.test.ts`, `spreadsheet/editor.ts`, `spreadsheetEn.test.ts`, `blockMove.ts`, `linsys.ts`, `aiPanel.test.ts`, `plan.ts`, `supabase.ts`, `parseSchema`, `schemaBlocks.ts`, `symbolsEn.test.ts`, `siteUpdate.ts`, `graph/file.ts`, `mathEn2.test.ts`, `spellcheck.ts`, `tutorial.ts`, `editor/editor.ts`, `Sheet`?**
  _High betweenness centrality (0.078) - this node is a cross-community bridge._
- **Are the 348 inferred relationships involving `Dove sono le cose` (e.g. with `fakeFormulaWorker()` and `fakeLlmWorker()`) actually correct?**
  _`Dove sono le cose` has 348 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `name`, `private` to the rest of the system?**
  _892 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `i18n.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.030733713296298967 - nodes in this community are weakly interconnected._
- **Should `vitest` be split into smaller, more focused modules?**
  _Cohesion score 0.06015037593984962 - nodes in this community are weakly interconnected._