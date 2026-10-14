# Graph Report - Glifo  (2026-10-14)

## Corpus Check
- 346 files · ~724,528 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5560 nodes · 20327 edges · 170 communities (128 shown, 42 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 684 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `27d8cc49`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- licenses.ts
- parse.ts
- main.ts
- math/evaluate.ts
- sync.ts
- spec.ts
- BoardStore
- primitive.ts
- graph/preview.ts
- Dove sono le cose
- distributions.ts
- src/relocation.ts
- svg.ts
- plan.ts
- SchemaEditor
- markdown.ts
- SheetEditor
- Rational
- numerical.ts
- arithmetic.ts
- index.ts
- engine.ts
- schema/editor.ts
- ExplainPanel
- store.ts
- Parser
- ink.ts
- ui/preview.ts
- aiPanel.ts
- several.ts
- gantt.ts
- toLatex
- toolbar.ts
- assistant.ts
- logic.ts
- usesDecimalComma
- complex.ts
- namesIn
- translations.test.ts
- resize.ts
- view3d.ts
- graphNote.test.ts
- localModels.ts
- inference.ts
- functions.ts
- MathError
- spreadsheet/format.ts
- .render
- schema/shapes.ts
- board/shapes.ts
- editor/lists.ts
- define.ts
- sidePanel.ts
- noteWordsGraph.test.ts
- linsys.ts
- evaluateExactComplex
- 20261004091555_note_condivise.sql
- sql.ts
- Glifo
- finite.ts
- spreadsheetEn.test.ts
- dependencies
- Welcome to Glifo
- spreadsheet/editor.ts
- .constructor
- odesolve.ts
- sheet.ts
- schemaEn.test.ts
- blockMove.ts
- Benvenuto in Glifo
- compilerOptions
- render/lists.ts
- Pt
- picture.ts
- symbolic.ts
- texts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- package.json
- ui/relocation.ts
- session-start.sh
- .claude/CLAUDE.md
- Il database degli account (Supabase)
- tutorial.mjs
- Abbonamenti
- topics.ts
- files.ts
- supabase-stub.sql
- account-test.mjs
- schemaBlocks.ts
- FoldersStore
- In programma
- relocation-test.mjs
- symbolsEn.test.ts
- schemaTools.test.ts
- graph/file.ts
- client.ts
- suggest.ts
- spellcheck.ts
- i18n.ts
- graph.ts
- spellcheck
- supabase.ts
- probability.ts
- conics.ts
- dictionaries.ts
- data/calculus.ts
- Le spiegazioni, come funzionano
- board.ts
- Sheet
- page.ts
- createFakeSupabase
- I modelli e le chiavi API
- Piano per piano
- Parser
- Board
- 20261008130026_commenti.sql
- siteUpdate.ts
- Costi
- xlsx.ts
- schema/templates.ts
- feedback.ts
- captcha.ts
- smoke-test.mjs
- L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota
- Glifo – note per Claude
- vite
- database.ts
- mathEn2.test.ts
- LlamaWorker
- BoardOptions
- laplace.ts
- La lavagna
- SpellClient
- num
- Distribution

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 326 edges
2. `MathError` - 151 edges
3. `Sheet` - 147 edges
4. `num()` - 145 edges
5. `h()` - 136 edges
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

## Communities (170 total, 42 thin omitted)

### Community 0 - "licenses.ts"
Cohesion: 0.32
Nodes (5): License, licenseOf(), LICENSES, T, texts

### Community 1 - "parse.ts"
Cohesion: 0.04
Nodes (61): hasWord(), EMPTY_SCOPE, errorMessage(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS (+53 more)

### Community 2 - "main.ts"
Cohesion: 0.03
Nodes (123): newStrokeId(), remapGraphLines(), account, ACCOUNT_OFF, active, aiShown(), aiToggle, aiWork (+115 more)

### Community 3 - "math/evaluate.ts"
Cohesion: 0.05
Nodes (81): inequalityMargin(), integralRegion, LayeredSolid, planeMargin(), radiusOf(), spaceLayers(), spaceMargin(), spacePoint() (+73 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (31): AccountSync, withLock(), Account, EMPTY_STATE, FolderChange, FolderRow, isEmpty(), iso() (+23 more)

### Community 5 - "spec.ts"
Cohesion: 0.04
Nodes (104): conicItems(), isConicLine(), quadricEquation(), T, fourierItems(), isFourierLine(), T, isComplexLine() (+96 more)

### Community 6 - "BoardStore"
Cohesion: 0.07
Nodes (16): BoardStore, MemoryBoards, applyAccountChange(), backup(), signOutAccount(), BackupNote, backupNotes(), restoreBackup() (+8 more)

### Community 7 - "primitive.ts"
Cohesion: 0.16
Nodes (57): algebraic(), bigGcd(), byParts(), candidates(), canon(), combineLogs(), compareKeys(), exponentials() (+49 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (43): FIGURE_PALETTE, addLabel(), boxes, cameras, complexCoord(), coord(), coordinates(), drawings (+35 more)

### Community 9 - "Dove sono le cose"
Cohesion: 0.05
Nodes (87): 1. A cosa serve l'AI dei modelli di frontiera, Dove sono le cose, Glifo – architettura, allNames(), answerFollowUp(), bareResult(), chained(), chatContext (+79 more)

### Community 10 - "distributions.ts"
Cohesion: 0.16
Nodes (29): choose(), continuousQuantile(), decimals(), expSumValue(), factorialBig(), FAMILIES, integerParam(), invalid() (+21 more)

### Community 11 - "src/relocation.ts"
Cohesion: 0.05
Nodes (78): accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf() (+70 more)

### Community 12 - "svg.ts"
Cohesion: 0.08
Nodes (59): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), dataWindow(), decimalText() (+51 more)

### Community 13 - "plan.ts"
Cohesion: 0.07
Nodes (49): at(), breakEven(), Point, quantity(), T, tableItems(), textLabel(), graphKeyLine() (+41 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.10
Nodes (5): isLanes(), SchemaEditor, withLaneContents(), serializeSchema(), fileNameFor()

### Community 15 - "markdown.ts"
Cohesion: 0.09
Nodes (37): @lezer/highlight, @lezer/markdown, lineDepth(), mathDelimTag, mathTag, parseBlockMath(), dataRange(), markMoves() (+29 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (3): SheetEditor, CellRange, cloneSheet()

### Community 17 - "Rational"
Cohesion: 0.09
Nodes (24): expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactFunction, ExactRandom, exactRoot() (+16 more)

### Community 18 - "numerical.ts"
Cohesion: 0.05
Nodes (80): bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial(), interpolating() (+72 more)

### Community 19 - "arithmetic.ts"
Cohesion: 0.09
Nodes (50): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+42 more)

### Community 20 - "index.ts"
Cohesion: 0.10
Nodes (20): ac, accents, d, delimiters, fonts, ft, st, structures (+12 more)

### Community 21 - "engine.ts"
Cohesion: 0.17
Nodes (9): @farscrl/hunspell-wasm, capitalize(), COMMON_FIXES, ELISIONS, inGlossary(), lower(), SpellEngine, GLOSSARY (+1 more)

### Community 22 - "schema/editor.ts"
Cohesion: 0.06
Nodes (42): ALIGN, ALIGN_NAMES, ARROW_NAMES, AT_ICONS, AT_NAMES, BASE_PRESETS, BIG_ARROWS, DB_PRESETS (+34 more)

### Community 24 - "store.ts"
Cohesion: 0.09
Nodes (15): BoardBackend, BoardData, done(), fromRecord(), IdbBoards, ofNote(), openBoardDatabase(), openDefault() (+7 more)

### Community 26 - "ink.ts"
Cohesion: 0.14
Nodes (18): perfect-freehand, Prefs, BOARD_PALETTES, BoardPalette, BoardTheme, highlightName(), inkName(), mid() (+10 more)

### Community 27 - "ui/preview.ts"
Cohesion: 0.09
Nodes (20): GraphLabels, remapLineKeys(), renameGraphScope(), renameScopeKeys(), BlockKind, MoveDir, BLOCK_NAMES, blockHiddenMessage() (+12 more)

### Community 28 - "aiPanel.ts"
Cohesion: 0.09
Nodes (21): NoteSubject, SubjectKind, formulaAtCursor(), labelHtml(), texHtml(), cache, cleanKatexError(), escapeHtml() (+13 more)

### Community 29 - "several.ts"
Cohesion: 0.11
Nodes (45): criticalLine(), isSeveralLine(), named(), severalItems(), surface(), T, severalLimit, at() (+37 more)

### Community 30 - "gantt.ts"
Cohesion: 0.07
Nodes (59): searchPhrases(), amount(), barColor(), crossings(), dateText(), dayMonth(), dayOf(), GanttOptions (+51 more)

### Community 31 - "toLatex"
Cohesion: 0.06
Nodes (74): multipleLabel(), names(), STUDY_GRAPH, studyItems(), T, close(), Definite, definiteIntegral() (+66 more)

### Community 32 - "toolbar.ts"
Cohesion: 0.16
Nodes (17): insertBlock(), wrapSelection(), ListStyleId, Action, createToolbar(), insertCode(), insertLink(), listMenu() (+9 more)

### Community 33 - "assistant.ts"
Cohesion: 0.09
Nodes (35): AiAnswer, AiError, AiResult, AiSettings, answerSchema(), askAi(), askCompatible(), askThroughHost() (+27 more)

### Community 34 - "logic.ts"
Cohesion: 0.11
Nodes (30): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+22 more)

### Community 35 - "usesDecimalComma"
Cohesion: 0.16
Nodes (19): numberText(), isTestLine(), number(), T, testItems(), endTex(), classes(), distributionExtent() (+11 more)

### Community 36 - "complex.ts"
Cohesion: 0.04
Nodes (105): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isInequality(), onlyComplex() (+97 more)

### Community 37 - "namesIn"
Cohesion: 0.09
Nodes (47): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+39 more)

### Community 38 - "translations.test.ts"
Cohesion: 0.17
Nodes (18): AstNode, calleeName(), check(), checkPair(), visit(), children(), entryPairs(), files (+10 more)

### Community 39 - "resize.ts"
Cohesion: 0.13
Nodes (21): EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, SizeLimits, SYMBOLS_WIDTH (+13 more)

### Community 40 - "view3d.ts"
Cohesion: 0.06
Nodes (85): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+77 more)

### Community 41 - "graphNote.test.ts"
Cohesion: 0.05
Nodes (57): @codemirror/lang-markdown, @codemirror/language, @codemirror/state, explainTarget, schemaTitle(), acceptCalcResult(), CalcCheck, calcOutcomes() (+49 more)

### Community 42 - "localModels.ts"
Cohesion: 0.07
Nodes (40): @mlc-ai/web-llm, chat(), GlifoError, Gpu, load(), post(), remove(), scope (+32 more)

### Community 43 - "inference.ts"
Cohesion: 0.14
Nodes (27): between(), chiSquareTest(), confidence(), confidenceShown(), decimals(), Given, hypothesisTest(), InferenceContext (+19 more)

### Community 44 - "functions.ts"
Cohesion: 0.08
Nodes (64): EMPTY, number(), T, addFormat(), divFormat(), GENERAL, mulFormat(), tidy() (+56 more)

### Community 45 - "MathError"
Cohesion: 0.05
Nodes (103): figureText(), linearItem(), dataOf(), MathError, UndefinedName, formatRational(), angleBetween(), asMatrix() (+95 more)

### Community 46 - "spreadsheet/format.ts"
Cohesion: 0.12
Nodes (20): decimalsOf(), ENGLISH, fixedNumber(), generalNumber(), group(), MAX_DECIMALS, most(), numberFrom() (+12 more)

### Community 47 - ".render"
Cohesion: 0.15
Nodes (3): penErases(), handleScale(), shapePoints()

### Community 48 - "schema/shapes.ts"
Cohesion: 0.08
Nodes (17): @maxgraph/core, ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape (+9 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (35): DrawAction, adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners() (+27 more)

### Community 50 - "editor/lists.ts"
Cohesion: 0.10
Nodes (55): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+47 more)

### Community 51 - "define.ts"
Cohesion: 0.13
Nodes (18): g, greek, ch, chemistry, m, misc, l, logic (+10 more)

### Community 52 - "sidePanel.ts"
Cohesion: 0.04
Nodes (59): @codemirror/view, @lezer/common, closeMathBlockOnEnter(), highlight, T, tabOutOfMath(), InsertOptions, insertTemplate() (+51 more)

### Community 53 - "noteWordsGraph.test.ts"
Cohesion: 0.19
Nodes (19): monthOf(), MONTHS, MONTHS_EN, parseDate(), planBlock, PlanKind, planRange(), T (+11 more)

### Community 54 - "linsys.ts"
Cohesion: 0.10
Nodes (51): choices(), gcd(), isStandardUnknown(), linearSystem(), matrixEquation(), matrixSystem(), minorsGcd(), ONE (+43 more)

### Community 55 - "evaluateExactComplex"
Cohesion: 0.22
Nodes (12): asin(), atan(), evaluateExactComplex(), exactSqrt(), GaussRational, sinh(), sqrt(), unavailable() (+4 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "sql.ts"
Cohesion: 0.16
Nodes (18): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+10 more)

### Community 58 - "Glifo"
Cohesion: 0.12
Nodes (16): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Domande frequenti e commenti (+8 more)

### Community 59 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 60 - "spreadsheetEn.test.ts"
Cohesion: 0.13
Nodes (36): functionLabel(), englishNumber(), italianNumber(), readEnglishInput(), readInput(), swapSeparators(), BinOp, COMPARE (+28 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "Welcome to Glifo"
Cohesion: 0.20
Nodes (9): A few examples, Calculations and graphs, For programming too, Handy shortcuts, How to write formulas, Lists, Spell check, Try it now (+1 more)

### Community 63 - "spreadsheet/editor.ts"
Cohesion: 0.08
Nodes (57): sheetSummary(), tablesNote(), ChartTable, currentCall(), Editing, MenuEntry, Move, openSheetEditor() (+49 more)

### Community 65 - "odesolve.ts"
Cohesion: 0.08
Nodes (68): Piece, linearIn(), addWave(), arrange(), cauchy(), compiled(), Condition, constantNames() (+60 more)

### Community 66 - "sheet.ts"
Cohesion: 0.08
Nodes (55): Lin, bracketParts(), BRACKETS, CHECK_VALUES, checks, Definition, digitsMatch(), fingerprint() (+47 more)

### Community 67 - "schemaEn.test.ts"
Cohesion: 0.07
Nodes (38): schemaSummary(), svg(), markdownForFile(), findSchemaBlocks(), openSchemaEditor(), SchemaEditorOptions, hide(), OPEN (+30 more)

### Community 68 - "blockMove.ts"
Cohesion: 0.09
Nodes (41): @codemirror/commands, blockMoved, blockMoves(), blockMoveTransaction(), LineMap, placeChart(), tableChartKind(), blockKind (+33 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "render/lists.ts"
Cohesion: 0.27
Nodes (13): ListStyle, bulletGroup(), Marker, sameList(), alignInside(), asciiTrim(), findMarker(), Found (+5 more)

### Community 72 - "Pt"
Cohesion: 0.11
Nodes (15): clampZoom(), coalesced(), EraseAction, Finger, LassoAction, MoveAction, PanAction, PinchAction (+7 more)

### Community 73 - "picture.ts"
Cohesion: 0.17
Nodes (14): staticGraphSvg(), chooseWindow(), chooseBox(), DrawOptions, graphSvg(), sceneSvg(), light, pts (+6 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.06
Nodes (67): fnLabel(), primitive(), verified(), linearCells(), assumePositive(), atValues(), combine(), commonMonomial() (+59 more)

### Community 75 - "texts"
Cohesion: 0.05
Nodes (49): ExplainTone, Explanation, FollowUp, REPLY_TOKENS, glifoError(), LocalAbort, localErrorMessage(), localLlm (+41 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Errore o imprevisto → nel dettaglio, 3. Serve una decisione → frasi complete, 4. Fine del compito → un solo riepilogo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "package.json"
Cohesion: 0.05
Nodes (36): description, devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript (+28 more)

### Community 79 - "ui/relocation.ts"
Cohesion: 0.12
Nodes (22): moveDayLabel(), RelocationError, relocationMessage(), relocationPhase, RelocationResult, startOf(), BOX, glyph() (+14 more)

### Community 82 - "Il database degli account (Supabase)"
Cohesion: 0.14
Nodes (13): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il controllo anti-robot (CAPTCHA, ottobre 2026), Il database degli account (Supabase), Il progetto, Il trasloco su glifo.page (ottobre 2026) (+5 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.11
Nodes (11): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+3 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.13
Nodes (15): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+7 more)

### Community 91 - "topics.ts"
Cohesion: 0.09
Nodes (36): ATTRIBUTES, cut(), ER_SHAPES, fieldText(), fitLines(), flowOrder(), formulaText(), FREE_NAMES (+28 more)

### Community 92 - "files.ts"
Cohesion: 0.20
Nodes (15): downloadRelocation(), canWriteFilesDirectly(), downloadText(), FsWindow, isAbort(), mdTypes(), OpenedFile, openMarkdownFiles() (+7 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.10
Nodes (11): @electric-sql/pglite, device(), login(), newContext, waitFor(), b64(), CAPTCHA_TOKEN, CODE (+3 more)

### Community 97 - "schemaBlocks.ts"
Cohesion: 0.08
Nodes (27): toggleLinePrefix(), besideSchema(), BlockWidget, findWidgetBlocks(), guardBlocks(), KINDS, schemaBlockRanges(), schemaBlocks() (+19 more)

### Community 98 - "FoldersStore"
Cohesion: 0.08
Nodes (16): cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder(), loadClosedFolders(), RemoteFolder (+8 more)

### Community 100 - "In programma"
Cohesion: 0.40
Nodes (5): Account: i propri appunti su ogni dispositivo, anche da condividere, Idee per il futuro, In programma, L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota (14 ottobre 2026, se ne parla), Trasloco: il sito su Cloudflare, con un dominio tutto di Glifo

### Community 101 - "relocation-test.mjs"
Cohesion: 0.18
Nodes (7): AFTER_MOVE, ids, newBrowser(), NOTICE_DAY, out, serve(), TYPES

### Community 102 - "symbolsEn.test.ts"
Cohesion: 0.14
Nodes (28): preferredIndex(), editDistance(), singular(), stem(), STOPWORDS, words(), BOTH, buildIndex() (+20 more)

### Community 103 - "schemaTools.test.ts"
Cohesion: 0.14
Nodes (24): laneOf(), alignBoxes(), Alignment, Box, distributeBoxes(), Position, base64(), cellHtml() (+16 more)

### Community 104 - "graph/file.ts"
Cohesion: 0.06
Nodes (59): figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsForFile(), graphsFromFile(), hide(), OPEN (+51 more)

### Community 105 - "client.ts"
Cohesion: 0.20
Nodes (9): Backend, pageBackend(), SpellClientOptions, workerBackend(), WorkerUnavailable, SpellLanguage, createSpellService(), SpellRequest (+1 more)

### Community 106 - "suggest.ts"
Cohesion: 0.21
Nodes (13): normalizeText(), IndexedEntry, SearchResult, getIndex(), isSubsequence(), keysOf(), MatchKind, suggestCommands() (+5 more)

### Community 107 - "spellcheck.ts"
Cohesion: 0.12
Nodes (15): misspelledMark, refreshSpelling, setTarget, SKIP, SpellTarget, T, wordsToCheck(), findWords() (+7 more)

### Community 108 - "i18n.ts"
Cohesion: 0.03
Nodes (102): vitest, SyncStatus, downloadSize(), gpuF16(), modelVariant, browserLang(), browserLanguages(), dateLocale() (+94 more)

### Community 113 - "graph.ts"
Cohesion: 0.09
Nodes (33): fieldInput(), AT_X, cellText(), COMPASS, createEdgeCell(), createGraph(), drawSchema(), edgeLook() (+25 more)

### Community 116 - "spellcheck"
Cohesion: 0.21
Nodes (8): spellcheck(), close(), misspelledAt(), openAt(), replace(), tooltipView(), SpellChecker, SpellcheckOptions

### Community 117 - "supabase.ts"
Cohesion: 0.10
Nodes (41): @supabase/supabase-js, AUTH_STORAGE_KEY, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken() (+33 more)

### Community 118 - "probability.ts"
Cohesion: 0.13
Nodes (24): End, Family, ExactScope, rejection(), fractionNear(), ALL, complement(), endAt() (+16 more)

### Community 119 - "conics.ts"
Cohesion: 0.19
Nodes (28): at(), centralCanonical(), Coefficients, coneCanonical(), conicOf(), det2(), det3(), determinant() (+20 more)

### Community 120 - "dictionaries.ts"
Cohesion: 0.25
Nodes (4): download(), fetchDictionary(), FILES, DictionaryData

### Community 121 - "data/calculus.ts"
Cohesion: 0.22
Nodes (8): b, bigops, c, calculus, fn, fr, fractions, functions

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "board.ts"
Cohesion: 0.07
Nodes (53): Action, DOT_SIZES, EraserMode, HANDLE_REACH, ICON, MODE_NAMES, SIZE_NAMES, SizedTool (+45 more)

### Community 124 - "Sheet"
Cohesion: 0.07
Nodes (33): areaFor(), constantValue(), define(), itemFor(), restrict(), ExactComplexScope, ConicInfo, compileOde() (+25 more)

### Community 125 - "page.ts"
Cohesion: 0.07
Nodes (45): katex, accountDataFile(), PullResult, openShareDialog(), changeAccess(), changeCopy(), refreshChanged(), render() (+37 more)

### Community 128 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 129 - "I modelli e le chiavi API"
Cohesion: 0.33
Nodes (6): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), In prova sul ramo `prova` (7 ottobre 2026): Qwen3 nel browser per «Spiegami», La chiave, il server locale e la scelta del modello (14 ottobre 2026), Le idee dello studente (5 ottobre 2026)

### Community 132 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 136 - "Board"
Cohesion: 0.11
Nodes (6): Board, loadPrefs(), sizeChoice(), SizeChoice, BoardChange, Stroke

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 139 - "siteUpdate.ts"
Cohesion: 0.18
Nodes (16): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, loadPart() (+8 more)

### Community 140 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 141 - "xlsx.ts"
Cohesion: 0.09
Nodes (44): RFC-4180, fflate, csvCell(), csvDelimiter(), csvNumbers(), csvToSheet(), digitsOf(), field() (+36 more)

### Community 142 - "schema/templates.ts"
Cohesion: 0.21
Nodes (18): SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), tableMetrics(), conceptMap(), cycle(), edge() (+10 more)

### Community 143 - "feedback.ts"
Cohesion: 0.06
Nodes (52): vite-plugin-pwa, SUPABASE_KEY, SUPABASE_URL, feedbackButton, openFeedback(), NEW_ORIGIN, accountOffMessage(), Site (+44 more)

### Community 144 - "captcha.ts"
Cohesion: 0.21
Nodes (8): captchaToken(), loadTurnstile(), Turnstile, TURNSTILE_SCRIPT, Window, TURNSTILE_SITE_KEY, accountFailure(), Options

### Community 146 - "smoke-test.mjs"
Cohesion: 0.15
Nodes (6): markdown-it, playwright-core, PNG_ICONS, fakeLlmWorker(), firstVisit(), plainContext

### Community 154 - "L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota"
Cohesion: 0.25
Nodes (8): 2. Dalla lavagna alla nota, 3. Da una foto alla nota, 4. Dettare: la voce diventa testo nella nota, 5. Registrare le lezioni e trascriverle, Da sistemare con il primo punto che tocca l'AI, Fonti (controllate il 14 ottobre 2026), In che ordine, L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota

### Community 156 - "Glifo – note per Claude"
Cohesion: 0.25
Nodes (8): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Regole, sqlite()

### Community 157 - "vite"
Cohesion: 0.33
Nodes (4): vite, minutes, postMessage(), started

### Community 158 - "database.ts"
Cohesion: 0.23
Nodes (6): createDatabase(), createUser(), databaseTests(), feedbackTests(), migrations, shareTests()

### Community 159 - "mathEn2.test.ts"
Cohesion: 0.32
Nodes (6): EMPTY_COMPLEX_SCOPE, Interval, args(), result(), tex(), text()

### Community 160 - "LlamaWorker"
Cohesion: 0.16
Nodes (10): Promemoria per lo studente, Commenti di chi prova Glifo, La lavagna: idee in più, Più avanti, Schemi: idee in più, constructor(), LlamaWorker, Commenti di chi prova Glifo (+2 more)

### Community 162 - "BoardOptions"
Cohesion: 0.29
Nodes (3): BoardOptions, appleTouch(), UA

### Community 163 - "laplace.ts"
Cohesion: 0.10
Nodes (50): factoredPolynomial(), numShown(), polyShown(), absOf(), boundsOf(), close(), definite(), fourierProblem (+42 more)

### Community 166 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 168 - "num"
Cohesion: 0.14
Nodes (56): atIntegers(), withoutAbs(), exp(), hyperbolicToExp(), inverseRational(), sqrtEx(), termTransform(), polyEx() (+48 more)

### Community 169 - "Distribution"
Cohesion: 0.15
Nodes (11): addExp(), discreteQuantile(), Distribution, exactIntervalProbability(), integerRange(), intervalProbability(), subtractExp(), pValue() (+3 more)

## Knowledge Gaps
- **873 isolated node(s):** `Condividere una nota con un link`, `Domande frequenti e commenti`, `Provarlo sul tuo computer`, `Assistente AI`, `Spiegami (in prova)` (+868 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1195 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **42 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `texts` connect `texts` to `licenses.ts`, `parse.ts`, `main.ts`, `math/evaluate.ts`, `spec.ts`, `BoardStore`, `graph/preview.ts`, `Dove sono le cose`, `distributions.ts`, `src/relocation.ts`, `svg.ts`, `plan.ts`, `schema/templates.ts`, `feedback.ts`, `xlsx.ts`, `siteUpdate.ts`, `numerical.ts`, `arithmetic.ts`, `index.ts`, `schema/editor.ts`, `ink.ts`, `ui/preview.ts`, `aiPanel.ts`, `several.ts`, `gantt.ts`, `toLatex`, `toolbar.ts`, `assistant.ts`, `logic.ts`, `usesDecimalComma`, `complex.ts`, `namesIn`, `laplace.ts`, `resize.ts`, `graphNote.test.ts`, `localModels.ts`, `inference.ts`, `functions.ts`, `MathError`, `spreadsheet/format.ts`, `editor/lists.ts`, `sidePanel.ts`, `noteWordsGraph.test.ts`, `linsys.ts`, `sql.ts`, `finite.ts`, `spreadsheetEn.test.ts`, `spreadsheet/editor.ts`, `odesolve.ts`, `sheet.ts`, `schemaEn.test.ts`, `symbolic.ts`, `ui/relocation.ts`, `topics.ts`, `files.ts`, `schemaBlocks.ts`, `FoldersStore`, `schemaTools.test.ts`, `graph/file.ts`, `spellcheck.ts`, `i18n.ts`, `supabase.ts`, `probability.ts`, `conics.ts`, `board.ts`, `page.ts`?**
  _High betweenness centrality (0.139) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `Dove sono le cose` to `parse.ts`, `main.ts`, `math/evaluate.ts`, `spec.ts`, `BoardStore`, `primitive.ts`, `Board`, `graph/preview.ts`, `src/relocation.ts`, `svg.ts`, `plan.ts`, `SchemaEditor`, `markdown.ts`, `feedback.ts`, `Rational`, `smoke-test.mjs`, `arithmetic.ts`, `numerical.ts`, `xlsx.ts`, `schema/editor.ts`, `SheetEditor`, `ExplainPanel`, `Parser`, `ink.ts`, `ui/preview.ts`, `aiPanel.ts`, `several.ts`, `gantt.ts`, `toLatex`, `toolbar.ts`, `assistant.ts`, `logic.ts`, `usesDecimalComma`, `complex.ts`, `namesIn`, `laplace.ts`, `view3d.ts`, `graphNote.test.ts`, `localModels.ts`, `inference.ts`, `num`, `MathError`, `functions.ts`, `.render`, `schema/shapes.ts`, `board/shapes.ts`, `sidePanel.ts`, `noteWordsGraph.test.ts`, `linsys.ts`, `evaluateExactComplex`, `finite.ts`, `spreadsheetEn.test.ts`, `siteUpdate.ts`, `spreadsheet/editor.ts`, `.constructor`, `odesolve.ts`, `sheet.ts`, `blockMove.ts`, `Pt`, `symbolic.ts`, `texts`, `tutorial.mjs`, `topics.ts`, `schemaBlocks.ts`, `schemaTools.test.ts`, `graph/file.ts`, `i18n.ts`, `graph.ts`, `supabase.ts`, `board.ts`, `Sheet`?**
  _High betweenness centrality (0.104) - this node is a cross-community bridge._
- **Why does `vitest` connect `i18n.ts` to `licenses.ts`, `parse.ts`, `spec.ts`, `BoardStore`, `Dove sono le cose`, `distributions.ts`, `src/relocation.ts`, `svg.ts`, `plan.ts`, `siteUpdate.ts`, `feedback.ts`, `captcha.ts`, `markdown.ts`, `numerical.ts`, `xlsx.ts`, `store.ts`, `ink.ts`, `ui/preview.ts`, `database.ts`, `gantt.ts`, `mathEn2.test.ts`, `assistant.ts`, `BoardOptions`, `complex.ts`, `translations.test.ts`, `resize.ts`, `view3d.ts`, `graphNote.test.ts`, `localModels.ts`, `num`, `MathError`, `board/shapes.ts`, `editor/lists.ts`, `sidePanel.ts`, `noteWordsGraph.test.ts`, `linsys.ts`, `sql.ts`, `spreadsheetEn.test.ts`, `spreadsheet/editor.ts`, `schemaEn.test.ts`, `blockMove.ts`, `picture.ts`, `texts`, `package.json`, `ui/relocation.ts`, `schemaBlocks.ts`, `FoldersStore`, `symbolsEn.test.ts`, `schemaTools.test.ts`, `graph/file.ts`, `suggest.ts`, `spellcheck.ts`, `supabase.ts`, `board.ts`, `Sheet`, `page.ts`?**
  _High betweenness centrality (0.069) - this node is a cross-community bridge._
- **Are the 325 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `tutorialModel()`) actually correct?**
  _`Dove sono le cose` has 325 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Condividere una nota con un link`, `Domande frequenti e commenti`, `Provarlo sul tuo computer` to the rest of the system?**
  _873 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `parse.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.041851106639839035 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.03394850763271816 - nodes in this community are weakly interconnected._