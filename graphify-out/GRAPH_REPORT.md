# Graph Report - Glifo  (2026-10-15)

## Corpus Check
- 349 files · ~736,368 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5615 nodes · 20543 edges · 178 communities (141 shown, 37 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 715 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9b37591a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- i18n.ts
- vitest
- main.ts
- compile
- sync.ts
- spec.ts
- h
- primitive.ts
- graph/preview.ts
- blockMove.ts
- distributions.ts
- Dove sono le cose
- svg.ts
- sheet.ts
- SchemaEditor
- spreadsheet/format.ts
- SheetEditor
- namesIn
- numerical.ts
- arithmetic.ts
- index.ts
- client.ts
- schema/editor.ts
- formula.ts
- store.ts
- parse.ts
- board.ts
- graph/file.ts
- NotesStore
- several.ts
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
- Board
- localModels.ts
- parseSchema
- functions.ts
- MathError
- prova-lettori.py
- laplace.ts
- account/space.ts
- board/shapes.ts
- schema/shapes.ts
- sidePanel.ts
- linsys.ts
- graph.ts
- restore.ts
- page.ts
- 20261004091555_note_condivise.sql
- editor/lists.ts
- src/relocation.ts
- finite.ts
- texts
- dependencies
- Welcome to Glifo
- spreadsheet/editor.ts
- spreadsheetEn.test.ts
- num
- explainPanel.test.ts
- probability.ts
- editor/editor.ts
- Benvenuto in Glifo
- compilerOptions
- Glifo
- ABBONAMENTI.md
- inference.ts
- symbolic.ts
- noteWords.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- plan.ts
- explainPanel.ts
- session-start.sh
- .claude/CLAUDE.md
- Il database degli account (Supabase)
- tutorial.mjs
- Abbonamenti
- strokes.ts
- .reply
- supabase-stub.sql
- account-test.mjs
- escapeHtml
- supabase.ts
- noteWordsMath.test.ts
- schemaBlocks.ts
- search.ts
- siteUpdate.ts
- markdown.ts
- rich
- latex.ts
- spellcheck.ts
- MarkdownEditor
- topics.ts
- smoke-test.mjs
- schema/templates.ts
- BoardStore
- FoldersStore
- toolbar.ts
- statsGraph.ts
- @codemirror/state
- ExplainPanel
- Sheet
- relocation-test.mjs
- Glifo – note per Claude
- explain.ts
- faq.ts
- engine.ts
- Stroke
- 20261008130026_commenti.sql
- Le spiegazioni, come funzionano
- L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota
- xlsx.ts
- createFakeSupabase
- feedback.ts
- symbolsEn.test.ts
- .folderItem
- ink.ts
- In programma
- mathDelims.ts
- tutorial.ts
- sql.ts
- vite
- downloadText
- captcha.ts
- files.ts
- render/lists.ts
- suggest.ts
- AiPanel
- Piano per piano
- vite.config.ts
- severalGraph.ts
- chiSquareTest
- logo.ts
- scripts
- intervalProbability
- NodeLook
- I modelli e le chiavi API

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 343 edges
2. `MathError` - 151 edges
3. `Sheet` - 148 edges
4. `num()` - 145 edges
5. `h()` - 136 edges
6. `MathNode` - 131 edges
7. `texts` - 124 edges
8. `mul()` - 124 edges
9. `Board` - 118 edges
10. `compile()` - 116 edges

## Surprising Connections (you probably didn't know these)
- `Dove sono le cose` --references--> `fakeLlmWorker()`  [INFERRED]
  ARCHITETTURA.md → scripts/smoke-test.mjs
- `Dove sono le cose` --references--> `tutorialModel()`  [INFERRED]
  ARCHITETTURA.md → scripts/tutorial.mjs
- `Dove sono le cose` --references--> `WidgetKind`  [INFERRED]
  ARCHITETTURA.md → src/editor/schemaBlocks.ts
- `Dove sono le cose` --references--> `ConicElements`  [INFERRED]
  ARCHITETTURA.md → src/math/conics.ts
- `Funzionalità` --references--> `k()`  [INFERRED]
  README.md → src/math/numerical.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (178 total, 37 thin omitted)

### Community 0 - "i18n.ts"
Cohesion: 0.05
Nodes (57): DEFAULT_LOCAL_MODEL, browserLang(), browserLanguages(), dateLocale(), detectLang(), Entry, isLang(), lang (+49 more)

### Community 1 - "vitest"
Cohesion: 0.06
Nodes (44): vitest, formulaAtCursor(), GraphLabelLines, insertGraphBlock(), LABEL_KEYS, staticGraphSvg(), chooseBox(), formulaGraph() (+36 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (95): account, ACCOUNT_OFF, active, aiShown(), aiToggle, aiWork, app, applyTheme() (+87 more)

### Community 3 - "compile"
Cohesion: 0.05
Nodes (79): integralRegion, argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot(), fieldOn() (+71 more)

### Community 4 - "sync.ts"
Cohesion: 0.07
Nodes (30): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+22 more)

### Community 5 - "spec.ts"
Cohesion: 0.04
Nodes (131): conicItems(), isConicLine(), quadricEquation(), T, FieldContext, fourierItems(), isFourierLine(), T (+123 more)

### Community 6 - "h"
Cohesion: 0.10
Nodes (38): T, board, createFolder(), folderNameProblem(), renameFolder(), moveDayLabel(), RelocationResult, copy() (+30 more)

### Community 7 - "primitive.ts"
Cohesion: 0.15
Nodes (62): degree(), algebraic(), bigGcd(), byParts(), candidates(), canon(), combineLogs(), compareKeys() (+54 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (48): addLabel(), boxes, cameras, complexCoord(), containing(), coord(), coordinates(), drawings (+40 more)

### Community 9 - "blockMove.ts"
Cohesion: 0.10
Nodes (34): blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove, blockPlace(), closed() (+26 more)

### Community 10 - "distributions.ts"
Cohesion: 0.16
Nodes (29): choose(), continuousQuantile(), decimals(), expSumValue(), factorialBig(), FAMILIES, integerParam(), invalid() (+21 more)

### Community 11 - "Dove sono le cose"
Cohesion: 0.15
Nodes (26): Dove sono le cose, Glifo – architettura, explainTarget, tableTitle(), formulasUntil(), sheetBefore(), explanationMarkdown(), hasCalculation() (+18 more)

### Community 12 - "svg.ts"
Cohesion: 0.08
Nodes (58): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseWindow(), chooseY(), clipLines(), dataWindow() (+50 more)

### Community 13 - "sheet.ts"
Cohesion: 0.07
Nodes (65): EMPTY_COMPLEX_SCOPE, OdeFunction, dataOf(), Lin, statisticOf(), NUMERICAL, bracketParts(), BRACKETS (+57 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.08
Nodes (20): isContainer(), isLanes(), SchemaEditor, cellText(), createEdgeCell(), edgeLook(), edgeStyle(), insertSchema() (+12 more)

### Community 15 - "spreadsheet/format.ts"
Cohesion: 0.18
Nodes (19): quantity(), tableItems(), decimalsOf(), ENGLISH, fixedNumber(), formatNumber(), generalNumber(), group() (+11 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (5): functionLabel(), SheetEditor, englishTyping(), serializeSheet(), cloneSheet()

### Community 17 - "namesIn"
Cohesion: 0.13
Nodes (38): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+30 more)

### Community 18 - "numerical.ts"
Cohesion: 0.12
Nodes (47): bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial(), interpolating() (+39 more)

### Community 19 - "arithmetic.ts"
Cohesion: 0.10
Nodes (49): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+41 more)

### Community 20 - "index.ts"
Cohesion: 0.06
Nodes (45): b, bigops, c, calculus, fn, fr, fractions, functions (+37 more)

### Community 21 - "client.ts"
Cohesion: 0.10
Nodes (13): Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download(), fetchDictionary() (+5 more)

### Community 22 - "schema/editor.ts"
Cohesion: 0.05
Nodes (68): laneOf(), alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ALIGN_NAMES (+60 more)

### Community 23 - "formula.ts"
Cohesion: 0.11
Nodes (19): pick(), BinOp, COMPARE, ERRORS_BY_LENGTH, FormulaError, OPERATORS, Parser, Ref (+11 more)

### Community 24 - "store.ts"
Cohesion: 0.09
Nodes (15): BoardBackend, done(), fromRecord(), IdbBoards, ofNote(), openBoardDatabase(), openDefault(), recordBytes() (+7 more)

### Community 25 - "parse.ts"
Cohesion: 0.06
Nodes (58): errorMessage(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, derivativeOperator() (+50 more)

### Community 26 - "board.ts"
Cohesion: 0.06
Nodes (49): Action, coalesced(), DOT_SIZES, EraserMode, Finger, HANDLE_REACH, ICON, LassoAction (+41 more)

### Community 27 - "graph/file.ts"
Cohesion: 0.06
Nodes (57): addToGraphBlock(), FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsForFile(), graphsFromFile() (+49 more)

### Community 28 - "NotesStore"
Cohesion: 0.11
Nodes (15): newId(), createdAtFromId(), deriveTitle(), NotesStore, forgetOldKeys(), hasLocalStorage(), memory, migrateKeyPrefix() (+7 more)

### Community 29 - "several.ts"
Cohesion: 0.07
Nodes (58): Definite, FormatOptions, Piece, LimitValue, Condition, Family, Group, Root (+50 more)

### Community 30 - "gantt.ts"
Cohesion: 0.07
Nodes (62): amount(), barColor(), crossings(), dateText(), dayMonth(), dayOf(), GanttOptions, ganttSvg() (+54 more)

### Community 31 - "study.ts"
Cohesion: 0.14
Nodes (38): limit(), Asymptote, asymptoteText(), boundaries(), compiled(), cutsOf(), defined(), domainOf() (+30 more)

### Community 32 - "Rational"
Cohesion: 0.07
Nodes (52): Part, at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf() (+44 more)

### Community 33 - "assistant.ts"
Cohesion: 0.09
Nodes (33): AiAnswer, AiError, AiSettings, answerSchema(), askAi(), askCompatible(), askThroughHost(), capitalized() (+25 more)

### Community 34 - "logic.ts"
Cohesion: 0.11
Nodes (30): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+22 more)

### Community 35 - "solve.ts"
Cohesion: 0.07
Nodes (62): decimalSeparator(), Digits, formatNumber(), formatRational(), fromNumber(), fromRational(), SUPERSCRIPT, writeDigits() (+54 more)

### Community 36 - "complex.ts"
Cohesion: 0.05
Nodes (75): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexLine(), isComplexValue() (+67 more)

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
Nodes (87): LayeredSolid, addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon() (+79 more)

### Community 41 - "Board"
Cohesion: 0.10
Nodes (8): Board, clampZoom(), loadPrefs(), pressureOf(), sizeChoice(), validView(), SizeChoice, Pt

### Community 42 - "localModels.ts"
Cohesion: 0.07
Nodes (43): chat(), GlifoError, Gpu, load(), post(), remove(), scope, shaderF16() (+35 more)

### Community 43 - "parseSchema"
Cohesion: 0.07
Nodes (42): @electric-sql/pglite, openSchemaEditor(), SchemaEditorOptions, base64(), hide(), OPEN, schemasForFile(), schemasFromFile() (+34 more)

### Community 44 - "functions.ts"
Cohesion: 0.08
Nodes (63): CellResult, EMPTY, number(), T, addFormat(), divFormat(), Format, mulFormat() (+55 more)

### Community 45 - "MathError"
Cohesion: 0.07
Nodes (68): MathError, angleBetween(), asMatrix(), basisOf(), characteristicPolynomial(), circleText(), cross(), Ctx (+60 more)

### Community 46 - "prova-lettori.py"
Cohesion: 0.12
Nodes (4): byte_table(), read(), Reader, tidy()

### Community 47 - "laplace.ts"
Cohesion: 0.10
Nodes (52): factoredPolynomial(), close(), definiteIntegral(), exValue(), samples(), EMPTY_SCOPE, scopeWith(), atIntegers() (+44 more)

### Community 48 - "account/space.ts"
Cohesion: 0.14
Nodes (26): accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), knowsAccount(), prefixOf(), prefsKey() (+18 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (36): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+28 more)

### Community 50 - "schema/shapes.ts"
Cohesion: 0.08
Nodes (16): ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape, IdentifyingRelationShape (+8 more)

### Community 51 - "sidePanel.ts"
Cohesion: 0.12
Nodes (17): AiResult, SuggestionItem, viewSwitch, localizeTex(), cleanKatexError(), isConfidentAnswer(), SymbolForm, icon() (+9 more)

### Community 52 - "linsys.ts"
Cohesion: 0.11
Nodes (46): inverseRational(), choices(), exText(), gcd(), matrixEquation(), matrixSystem(), minorsGcd(), ONE (+38 more)

### Community 53 - "graph.ts"
Cohesion: 0.10
Nodes (27): @maxgraph/core, AT_X, COMPASS, createGraph(), drawSchema(), edgeTextAt(), isEdgeLook(), loadSchema() (+19 more)

### Community 54 - "restore.ts"
Cohesion: 0.15
Nodes (18): newStrokeId(), applySpellcheck(), receiveRelocation(), relocationReceived(), restore(), setPersonalWords(), wordsChangedHere(), BackupNote (+10 more)

### Community 55 - "page.ts"
Cohesion: 0.07
Nodes (40): accountDataFile(), PullResult, openShareDialog(), changeAccess(), changeCopy(), refreshChanged(), render(), run() (+32 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "editor/lists.ts"
Cohesion: 0.10
Nodes (56): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+48 more)

### Community 58 - "src/relocation.ts"
Cohesion: 0.08
Nodes (44): isWelcome(), buildPackage(), importPackage(), isRelocationPackage(), OLD_ORIGIN, openedForRelocation(), RECEIVE_URL, receiveFromOldSite() (+36 more)

### Community 59 - "finite.ts"
Cohesion: 0.18
Nodes (26): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, FiniteError, FiniteResult (+18 more)

### Community 60 - "texts"
Cohesion: 0.09
Nodes (20): GraphLabels, texts, BlockKind, hydrateSheets(), T, BLOCK_NAMES, blockHiddenMessage(), blockKindOf() (+12 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "Welcome to Glifo"
Cohesion: 0.20
Nodes (9): A few examples, Calculations and graphs, For programming too, Handy shortcuts, How to write formulas, Lists, Spell check, Try it now (+1 more)

### Community 63 - "spreadsheet/editor.ts"
Cohesion: 0.07
Nodes (61): readSheet(), sheetSummary(), currentCall(), Editing, MenuEntry, Move, openSheetEditor(), PATHS (+53 more)

### Community 64 - "spreadsheetEn.test.ts"
Cohesion: 0.11
Nodes (39): formulaText(), tableTopic(), valueText(), evaluateSheet(), SheetEvaluator, hide(), OPEN, sheetsForFile() (+31 more)

### Community 65 - "num"
Cohesion: 0.07
Nodes (107): absOf(), splitAbs(), withoutAbs(), linearIn(), sqrtEx(), termTransform(), polyEx(), addWave() (+99 more)

### Community 66 - "explainPanel.test.ts"
Cohesion: 0.11
Nodes (13): glifoError(), LocalAbort, localErrorMessage(), localLlm, Pending, ChatMessage, ChatOptions, LoadProgress (+5 more)

### Community 67 - "probability.ts"
Cohesion: 0.09
Nodes (29): addExp(), End, exactIntervalProbability(), expSum, Family, subtractExp(), CompileOptions, ExactScope (+21 more)

### Community 68 - "editor/editor.ts"
Cohesion: 0.04
Nodes (51): description, name, private, type, version, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands (+43 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "Glifo"
Cohesion: 0.12
Nodes (16): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Domande frequenti e commenti (+8 more)

### Community 72 - "ABBONAMENTI.md"
Cohesion: 0.23
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 73 - "inference.ts"
Cohesion: 0.21
Nodes (20): between(), confidence(), confidenceShown(), decimals(), hypothesisTest(), interval(), meanOf(), num() (+12 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (64): primitive(), linearCells(), assumePositive(), atValues(), commonMonomial(), commonPositive(), Converter, coordinates() (+56 more)

### Community 75 - "noteWords.ts"
Cohesion: 0.10
Nodes (27): WidgetBlock, markdownForFile(), blockKind, BLOCKS, blockWord(), FROM_ENGLISH, FUNCTIONS, functionWordPairs() (+19 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Errore o imprevisto → nel dettaglio, 3. Serve una decisione → frasi complete, 4. Fine del compito → un solo riepilogo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "plan.ts"
Cohesion: 0.08
Nodes (38): textLabel(), graphKeyLine(), chartData, chartFrom(), chartLines(), chartRange(), ChartTable, currentRegion() (+30 more)

### Community 79 - "explainPanel.ts"
Cohesion: 0.09
Nodes (29): ExplainTone, Explanation, FollowUp, REPLY_TOKENS, SubjectKind, Settings, AI_NEWS_TITLE, AI_WORKING_TITLE (+21 more)

### Community 82 - "Il database degli account (Supabase)"
Cohesion: 0.15
Nodes (12): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il controllo anti-robot (CAPTCHA, ottobre 2026), Il database degli account (Supabase), Il progetto, Il trasloco su glifo.page (ottobre 2026) (+4 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.11
Nodes (11): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+3 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.10
Nodes (20): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Deciso (5 ottobre 2026), Dopo (+12 more)

### Community 91 - "strokes.ts"
Cohesion: 0.23
Nodes (13): between(), capsuleSpan(), circleSpan(), eraserGrowth(), eraseStroke(), intersect(), linearSpan(), pieceLength() (+5 more)

### Community 92 - ".reply"
Cohesion: 0.32
Nodes (5): Promemoria per lo studente, Commenti di chi prova Glifo, Commenti di chi prova Glifo, page(), site()

### Community 96 - "account-test.mjs"
Cohesion: 0.11
Nodes (10): device(), login(), newContext, waitFor(), b64(), CAPTCHA_TOKEN, CODE, GOOGLE_CODE (+2 more)

### Community 97 - "escapeHtml"
Cohesion: 0.12
Nodes (23): katex, planSwatchSvg(), labelHtml(), ganttWidth(), PlanView, GraphLook, texHtml(), checkHtml() (+15 more)

### Community 98 - "supabase.ts"
Cohesion: 0.10
Nodes (37): @supabase/supabase-js, AUTH_STORAGE_KEY, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken() (+29 more)

### Community 100 - "noteWordsMath.test.ts"
Cohesion: 0.11
Nodes (16): AstNode, childrenOf(), DATA, ENGLISH, englishTexts(), FUNCTIONS, inBothLanguages(), isNode() (+8 more)

### Community 101 - "schemaBlocks.ts"
Cohesion: 0.11
Nodes (19): InsertOptions, toggleLinePrefix(), besideSchema(), BlockWidget, findWidgetBlocks(), guardBlocks(), KINDS, schemaBlockRanges() (+11 more)

### Community 102 - "search.ts"
Cohesion: 0.18
Nodes (21): editDistance(), singular(), stem(), STOPWORDS, words(), BOTH, buildIndex(), containsPhrase() (+13 more)

### Community 103 - "siteUpdate.ts"
Cohesion: 0.18
Nodes (16): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, loadPart() (+8 more)

### Community 104 - "markdown.ts"
Cohesion: 0.10
Nodes (38): setGraphLabels(), monthOf(), MONTHS, MONTHS_EN, parseDate(), planBlock, PlanKind, planRange() (+30 more)

### Community 105 - "rich"
Cohesion: 0.16
Nodes (15): SyncStatus, rich(), AccountButton, accountSection(), AccountSectionDeps, confirmAccountDeletion(), messageOf(), openLoginDialog() (+7 more)

### Community 106 - "latex.ts"
Cohesion: 0.11
Nodes (25): ACCENT_COMMANDS, DISTRIBUTION_LATEX, distributionLatex(), domainLatex(), fnLatex(), fnName(), formLatex(), GREEK_COMMANDS (+17 more)

### Community 107 - "spellcheck.ts"
Cohesion: 0.08
Nodes (24): @codemirror/lang-markdown, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt() (+16 more)

### Community 108 - "MarkdownEditor"
Cohesion: 0.08
Nodes (20): closeMathBlockOnEnter(), EditorCallbacks, MarkdownEditor, searchPhrases(), tabOutOfMath(), insertTemplate(), templateInsertion(), CODE_NODES (+12 more)

### Community 113 - "topics.ts"
Cohesion: 0.16
Nodes (23): ATTRIBUTES, containerOf(), cut(), definedName(), ER_SHAPES, fieldText(), fitLines(), flowOrder() (+15 more)

### Community 116 - "smoke-test.mjs"
Cohesion: 0.15
Nodes (6): markdown-it, playwright-core, PNG_ICONS, fakeLlmWorker(), firstVisit(), plainContext

### Community 117 - "schema/templates.ts"
Cohesion: 0.22
Nodes (18): SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), conceptMap(), cycle(), edge(), er() (+10 more)

### Community 118 - "BoardStore"
Cohesion: 0.13
Nodes (4): BoardStore, MemoryBoards, backup(), boardsFor()

### Community 119 - "FoldersStore"
Cohesion: 0.08
Nodes (21): Deletion, DeletionLog, cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder() (+13 more)

### Community 120 - "toolbar.ts"
Cohesion: 0.17
Nodes (16): insertBlock(), wrapSelection(), ListStyleId, Action, createToolbar(), insertCode(), insertLink(), listStyle() (+8 more)

### Community 121 - "statsGraph.ts"
Cohesion: 0.16
Nodes (16): classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX, Line, number(), pmfBars() (+8 more)

### Community 122 - "@codemirror/state"
Cohesion: 0.09
Nodes (20): @codemirror/state, addPlaceholders, buildDecorations(), clearAllPlaceholders(), clearPlaceholders, contains(), currentIndex(), filledMark (+12 more)

### Community 123 - "ExplainPanel"
Cohesion: 0.14
Nodes (6): MathRegion, ExplainChat, ExplainPanel, preventFocusSteal(), formulasSummary(), setup()

### Community 124 - "Sheet"
Cohesion: 0.07
Nodes (34): ExactComplexScope, Ode, withWorkLimit(), FiniteContext, FormattedResult, Mat, MathNode, criticalShown() (+26 more)

### Community 125 - "relocation-test.mjs"
Cohesion: 0.18
Nodes (7): AFTER_MOVE, ids, newBrowser(), NOTICE_DAY, out, serve(), TYPES

### Community 128 - "Glifo – note per Claude"
Cohesion: 0.25
Nodes (8): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Regole, sqlite()

### Community 129 - "explain.ts"
Cohesion: 0.05
Nodes (78): 1. A cosa serve l'AI dei modelli di frontiera, allNames(), answerFollowUp(), bareResult(), chained(), chatContext, ChatFn, chatSubject() (+70 more)

### Community 132 - "faq.ts"
Cohesion: 0.16
Nodes (17): setLangForTests(), copyLink(), FaqGroup, faqGroups(), FaqQuestion, faqSection, kbd(), list() (+9 more)

### Community 133 - "engine.ts"
Cohesion: 0.16
Nodes (10): @farscrl/hunspell-wasm, capitalize(), COMMON_FIXES, DictionaryData, ELISIONS, inGlossary(), lower(), SpellEngine (+2 more)

### Community 136 - "Stroke"
Cohesion: 0.10
Nodes (7): DrawAction, EraseAction, pointsOf(), Step, BoardChange, BoardData, Stroke

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
Cohesion: 0.09
Nodes (45): RFC-4180, fflate, tablesNote(), csvCell(), csvDelimiter(), csvNumbers(), csvToSheet(), digitsOf() (+37 more)

### Community 142 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 143 - "feedback.ts"
Cohesion: 0.07
Nodes (47): SUPABASE_KEY, SUPABASE_URL, NEW_ORIGIN, Site, T, commentDate(), commentItem(), COMMENTS_MAX (+39 more)

### Community 144 - "symbolsEn.test.ts"
Cohesion: 0.17
Nodes (15): CATEGORIES, symbolById(), SYMBOLS, cardPreviewTex(), formPreviewTex(), ParsedTemplate, parseTemplate(), PLACEHOLDER_TEX (+7 more)

### Community 146 - ".folderItem"
Cohesion: 0.20
Nodes (4): clear(), formatDate(), NotesPanel, NotesPanelDeps

### Community 154 - "ink.ts"
Cohesion: 0.10
Nodes (21): 2. Dalla lavagna alla nota, BoardOptions, Prefs, BOARD_PALETTES, BoardPalette, BoardTheme, highlightName(), inkName() (+13 more)

### Community 156 - "In programma"
Cohesion: 0.25
Nodes (8): Account: i propri appunti su ogni dispositivo, anche da condividere, Idee per il futuro, In programma, L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota (14 ottobre 2026, se ne parla), La lavagna: idee in più, Più avanti, Schemi: idee in più, Trasloco: il sito su Cloudflare, con un dominio tutto di Glifo

### Community 157 - "mathDelims.ts"
Cohesion: 0.31
Nodes (9): analyzeBlockOpen(), BlockOpen, countOccurrences(), findUnescaped(), InlineMathMatch, isEscaped(), isSpace(), isWordChar() (+1 more)

### Community 158 - "tutorial.ts"
Cohesion: 0.15
Nodes (12): HINT_MS, markTutorialSeen(), openTutorial(), show(), richText(), showTutorialHint(), close(), T (+4 more)

### Community 159 - "sql.ts"
Cohesion: 0.19
Nodes (16): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+8 more)

### Community 160 - "vite"
Cohesion: 0.22
Nodes (6): vite, constructor(), LlamaWorker, minutes, postMessage(), started

### Community 161 - "downloadText"
Cohesion: 0.22
Nodes (10): loadDialect(), crc32(), svgSize(), svgToPng(), T, withDensity(), downloadBlob(), downloadText() (+2 more)

### Community 162 - "captcha.ts"
Cohesion: 0.21
Nodes (8): captchaToken(), loadTurnstile(), Turnstile, TURNSTILE_SCRIPT, Window, TURNSTILE_SITE_KEY, accountFailure(), Options

### Community 163 - "files.ts"
Cohesion: 0.24
Nodes (14): inClaudeViewer(), canWriteFilesDirectly(), FsWindow, isAbort(), mdTypes(), OpenedFile, openMarkdownFiles(), openTypes() (+6 more)

### Community 166 - "render/lists.ts"
Cohesion: 0.27
Nodes (13): ListStyle, bulletGroup(), Marker, sameList(), alignInside(), asciiTrim(), findMarker(), Found (+5 more)

### Community 167 - "suggest.ts"
Cohesion: 0.26
Nodes (12): normalizeText(), IndexedEntry, SearchResult, getIndex(), isSubsequence(), keysOf(), MatchKind, suggestCommands() (+4 more)

### Community 168 - "AiPanel"
Cohesion: 0.36
Nodes (3): NoteSubject, AiPanel, kindName()

### Community 169 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 170 - "vite.config.ts"
Cohesion: 0.22
Nodes (6): @mlc-ai/web-llm, vite-plugin-pwa, accountOffMessage(), defineFor(), MAIN_BRANCH, webllmModels

### Community 171 - "severalGraph.ts"
Cohesion: 0.38
Nodes (9): criticalLine(), named(), severalItems(), surface(), T, bounded(), extremaOf(), optimumOf() (+1 more)

### Community 172 - "chiSquareTest"
Cohesion: 0.29
Nodes (7): chiSquareTest(), Given, InferenceContext, nameOf(), opOf(), significance(), squared()

### Community 173 - "logo.ts"
Cohesion: 0.33
Nodes (6): sidebarToggle(), BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark()

### Community 174 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 175 - "intervalProbability"
Cohesion: 0.33
Nodes (5): discreteQuantile(), integerRange(), intervalProbability(), pValue(), setProbability()

### Community 179 - "I modelli e le chiavi API"
Cohesion: 0.33
Nodes (6): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), In prova sul ramo `prova` (7 ottobre 2026): Qwen3 nel browser per «Spiegami», La chiave, il server locale e la scelta del modello (14 ottobre 2026), Le idee dello studente (5 ottobre 2026)

## Knowledge Gaps
- **879 isolated node(s):** `Condividere una nota con un link`, `Domande frequenti e commenti`, `Provarlo sul tuo computer`, `Assistente AI`, `Spiegami (in prova)` (+874 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1213 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **37 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `texts` connect `texts` to `i18n.ts`, `explain.ts`, `main.ts`, `compile`, `faq.ts`, `spec.ts`, `h`, `graph/preview.ts`, `tutorial.ts`, `distributions.ts`, `Dove sono le cose`, `svg.ts`, `sheet.ts`, `xlsx.ts`, `feedback.ts`, `namesIn`, `numerical.ts`, `arithmetic.ts`, `index.ts`, `schema/editor.ts`, `formula.ts`, `parse.ts`, `ink.ts`, `board.ts`, `graph/file.ts`, `several.ts`, `gantt.ts`, `study.ts`, `Rational`, `assistant.ts`, `logic.ts`, `solve.ts`, `complex.ts`, `downloadText`, `sql.ts`, `files.ts`, `resize.ts`, `localModels.ts`, `severalGraph.ts`, `parseSchema`, `MathError`, `functions.ts`, `laplace.ts`, `sidePanel.ts`, `linsys.ts`, `restore.ts`, `page.ts`, `editor/lists.ts`, `src/relocation.ts`, `finite.ts`, `spreadsheet/editor.ts`, `spreadsheetEn.test.ts`, `num`, `probability.ts`, `editor/editor.ts`, `inference.ts`, `symbolic.ts`, `plan.ts`, `explainPanel.ts`, `escapeHtml`, `supabase.ts`, `schemaBlocks.ts`, `siteUpdate.ts`, `markdown.ts`, `rich`, `latex.ts`, `spellcheck.ts`, `topics.ts`, `schema/templates.ts`, `FoldersStore`, `toolbar.ts`, `statsGraph.ts`?**
  _High betweenness centrality (0.140) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `Dove sono le cose` to `i18n.ts`, `vitest`, `main.ts`, `compile`, `spec.ts`, `h`, `primitive.ts`, `graph/preview.ts`, `blockMove.ts`, `svg.ts`, `sheet.ts`, `SchemaEditor`, `SheetEditor`, `namesIn`, `numerical.ts`, `arithmetic.ts`, `schema/editor.ts`, `parse.ts`, `board.ts`, `graph/file.ts`, `NotesStore`, `several.ts`, `gantt.ts`, `study.ts`, `Rational`, `assistant.ts`, `logic.ts`, `complex.ts`, `view3d.ts`, `Board`, `localModels.ts`, `functions.ts`, `MathError`, `laplace.ts`, `account/space.ts`, `board/shapes.ts`, `schema/shapes.ts`, `sidePanel.ts`, `linsys.ts`, `graph.ts`, `src/relocation.ts`, `finite.ts`, `texts`, `spreadsheet/editor.ts`, `spreadsheetEn.test.ts`, `num`, `explainPanel.test.ts`, `inference.ts`, `symbolic.ts`, `noteWords.ts`, `plan.ts`, `explainPanel.ts`, `tutorial.mjs`, `strokes.ts`, `escapeHtml`, `supabase.ts`, `schemaBlocks.ts`, `siteUpdate.ts`, `markdown.ts`, `rich`, `MarkdownEditor`, `topics.ts`, `smoke-test.mjs`, `BoardStore`, `toolbar.ts`, `ExplainPanel`, `Sheet`, `explain.ts`, `faq.ts`, `Stroke`, `xlsx.ts`, `feedback.ts`, `ink.ts`, `tutorial.ts`, `downloadText`, `files.ts`, `AiPanel`, `vite.config.ts`, `severalGraph.ts`, `chiSquareTest`, `logo.ts`?**
  _High betweenness centrality (0.129) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `i18n.ts`, `explain.ts`, `faq.ts`, `primitive.ts`, `graph/preview.ts`, `blockMove.ts`, `distributions.ts`, `svg.ts`, `sheet.ts`, `xlsx.ts`, `feedback.ts`, `symbolsEn.test.ts`, `schema/editor.ts`, `store.ts`, `parse.ts`, `ink.ts`, `board.ts`, `graph/file.ts`, `NotesStore`, `gantt.ts`, `tutorial.ts`, `assistant.ts`, `captcha.ts`, `translations.test.ts`, `resize.ts`, `view3d.ts`, `vite.config.ts`, `localModels.ts`, `parseSchema`, `MathError`, `logo.ts`, `account/space.ts`, `board/shapes.ts`, `linsys.ts`, `graph.ts`, `restore.ts`, `page.ts`, `editor/lists.ts`, `src/relocation.ts`, `spreadsheet/editor.ts`, `spreadsheetEn.test.ts`, `explainPanel.test.ts`, `editor/editor.ts`, `noteWords.ts`, `plan.ts`, `explainPanel.ts`, `strokes.ts`, `supabase.ts`, `noteWordsMath.test.ts`, `schemaBlocks.ts`, `search.ts`, `siteUpdate.ts`, `markdown.ts`, `spellcheck.ts`, `FoldersStore`, `@codemirror/state`, `Sheet`?**
  _High betweenness centrality (0.076) - this node is a cross-community bridge._
- **Are the 342 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `tutorialModel()`) actually correct?**
  _`Dove sono le cose` has 342 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Condividere una nota con un link`, `Domande frequenti e commenti`, `Provarlo sul tuo computer` to the rest of the system?**
  _879 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `i18n.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04664224664224664 - nodes in this community are weakly interconnected._
- **Should `vitest` be split into smaller, more focused modules?**
  _Cohesion score 0.056692242114237 - nodes in this community are weakly interconnected._