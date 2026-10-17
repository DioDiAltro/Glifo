# Graph Report - Glifo  (2026-10-17)

## Corpus Check
- 363 files · ~748,724 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5733 nodes · 20891 edges · 171 communities (132 shown, 39 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 729 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `813eed6f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- h
- vitest
- main.ts
- compile
- sync.ts
- spec.ts
- src/relocation.ts
- num
- graph/preview.ts
- conics.ts
- usesDecimalComma
- Dove sono le cose
- svg.ts
- sheet.ts
- SchemaEditor
- namesIn
- SheetEditor
- formulaReader.ts
- numerical.ts
- arithmetic.ts
- index.ts
- engine.ts
- schema/editor.ts
- spreadsheetEn.test.ts
- store.ts
- Parser
- board.ts
- labels.ts
- tutorial.mjs
- toLatex
- gantt.ts
- study.ts
- Rational
- assistant.ts
- logic.ts
- Parser
- complex.ts
- devDependencies
- translations.test.ts
- resize.ts
- view3d.ts
- latex.ts
- localModels.ts
- schema/blocks.ts
- functions.ts
- MathError
- prova-lettori.py
- ink.ts
- toolbar.ts
- board/shapes.ts
- schema/shapes.ts
- SidePanel
- parse.ts
- graph.ts
- suggestions.ts
- icon
- 20261004091555_note_condivise.sql
- editor/lists.ts
- FoldersStore
- mathEn2.test.ts
- ui/preview.ts
- dependencies
- Welcome to Glifo
- spreadsheet/editor.ts
- spreadsheet/format.ts
- odesolve.ts
- markdown.ts
- linsys.ts
- editor/editor.ts
- Benvenuto in Glifo
- compilerOptions
- fields.ts
- ABBONAMENTI.md
- files.ts
- symbolic.ts
- sidePanel.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- plan.ts
- explainPanel.ts
- session-start.sh
- .claude/CLAUDE.md
- Il database degli account (Supabase)
- topics.ts
- Abbonamenti
- noteWordsGraph.test.ts
- LlamaWorker
- supabase-stub.sql
- account-test.mjs
- renderTex
- supabase.ts
- Pt
- schemaBlocks.ts
- symbolsEn.test.ts
- siteUpdate.ts
- calcResults.ts
- noteWordsMath.test.ts
- BoardStore
- spellcheck.ts
- parseMath
- .folderItem
- smoke-test.mjs
- schema/templates.ts
- tutorial.ts
- Field
- client.ts
- Glifo
- placeholders.ts
- ExplainPanel
- Sheet
- relocation-test.mjs
- Glifo – note per Claude
- explain.ts
- .integral
- database.ts
- Board
- 20261008130026_commenti.sql
- Le spiegazioni, come funzionano
- L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota
- xlsx.ts
- createFakeSupabase
- feedback.ts
- .constructor
- spellcheck
- Stroke
- statsGraph.ts
- schema/preview.ts
- logo.ts
- parseSchema
- lettore-vero.mjs
- scripts
- dictionaries.ts
- i18n.ts
- markers.ts
- SpellClient
- La lavagna
- Costi
- I modelli e le chiavi API

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 348 edges
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

## Communities (171 total, 39 thin omitted)

### Community 0 - "h"
Cohesion: 0.03
Nodes (86): SyncStatus, DEFAULT_LOCAL_MODEL, AI_SERVICES, aiService, T, lang, rich(), setLangForTests() (+78 more)

### Community 1 - "vitest"
Cohesion: 0.05
Nodes (60): vitest, formulaAtCursor(), FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsForFile() (+52 more)

### Community 2 - "main.ts"
Cohesion: 0.03
Nodes (114): newStrokeId(), account, ACCOUNT_OFF, accountProblem(), active, aiShown(), aiToggle, aiWork (+106 more)

### Community 3 - "compile"
Cohesion: 0.04
Nodes (106): conicItems(), T, FieldContext, fourierItems(), T, argumentOrder(), compileLineIntegral(), compileSurfaceIntegral() (+98 more)

### Community 4 - "sync.ts"
Cohesion: 0.07
Nodes (30): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+22 more)

### Community 5 - "spec.ts"
Cohesion: 0.06
Nodes (86): isConicLine(), quadricEquation(), isFourierLine(), isComplexLine(), isTestLine(), number(), T, testItems() (+78 more)

### Community 6 - "src/relocation.ts"
Cohesion: 0.04
Nodes (91): accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf() (+83 more)

### Community 7 - "num"
Cohesion: 0.12
Nodes (100): atIntegers(), oneFraction(), signsUp(), splitAbs(), symbolicCoefficient(), withoutAbs(), exp(), hyperbolicToExp() (+92 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (45): addLabel(), boxes, cameras, complexCoord(), coord(), coordinates(), drawings, drawnViews (+37 more)

### Community 9 - "conics.ts"
Cohesion: 0.19
Nodes (28): at(), centralCanonical(), Coefficients, coneCanonical(), conicOf(), det2(), det3(), determinant() (+20 more)

### Community 10 - "usesDecimalComma"
Cohesion: 0.04
Nodes (96): endTex(), usesDecimalComma(), addExp(), choose(), continuousQuantile(), decimals(), discreteQuantile(), Distribution (+88 more)

### Community 11 - "Dove sono le cose"
Cohesion: 0.14
Nodes (27): Dove sono le cose, Glifo – architettura, explainTarget, schemaTitle(), tableTitle(), formulasUntil(), sheetBefore(), explanationMarkdown() (+19 more)

### Community 12 - "svg.ts"
Cohesion: 0.08
Nodes (60): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseWindow(), chooseY(), clipLines(), dataWindow() (+52 more)

### Community 13 - "sheet.ts"
Cohesion: 0.07
Nodes (65): numericPartials(), OdeFunction, expSumValue(), ExactFunction, characteristicPolynomial(), dataOf(), Eigenvalue, Lin (+57 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.10
Nodes (6): SchemaEditor, createEdgeCell(), isFrame(), withContents(), EdgeLook, serializeSchema()

### Community 15 - "namesIn"
Cohesion: 0.09
Nodes (49): constantIntegrand(), depth(), inequalityMargin(), integralRegion, LayeredSolid, multipleOf(), planeMargin(), planeParts() (+41 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (8): functionLabel(), SheetEditor, englishTyping(), serializeSheet(), CellRange, clearRange(), cloneSheet(), setCell()

### Community 17 - "formulaReader.ts"
Cohesion: 0.08
Nodes (39): onnxruntime-web, ENGINE_BYTES, FromReader, IMAGE_SIZE, READER_CACHE, READER_DOWNLOAD, READER_FILES, READER_MODEL (+31 more)

### Community 18 - "numerical.ts"
Cohesion: 0.11
Nodes (51): isNumericalLine(), numericalItems(), bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint() (+43 more)

### Community 19 - "arithmetic.ts"
Cohesion: 0.06
Nodes (97): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+89 more)

### Community 20 - "index.ts"
Cohesion: 0.06
Nodes (45): Text, b, bigops, c, calculus, fn, fr, fractions (+37 more)

### Community 21 - "engine.ts"
Cohesion: 0.15
Nodes (11): @farscrl/hunspell-wasm, editDistance(), capitalize(), COMMON_FIXES, DictionaryData, ELISIONS, inGlossary(), lower() (+3 more)

### Community 22 - "schema/editor.ts"
Cohesion: 0.05
Nodes (61): alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ALIGN_NAMES, ARROW_NAMES (+53 more)

### Community 23 - "spreadsheetEn.test.ts"
Cohesion: 0.16
Nodes (31): readSheet(), tableTopic(), valueText(), sheetSummary(), sheetToCsv(), openSheetEditor(), SheetEvaluator, booleanText() (+23 more)

### Community 24 - "store.ts"
Cohesion: 0.08
Nodes (18): fake-indexeddb, PEN_SIZE, BoardBackend, BoardChange, BoardData, done(), fromRecord(), IdbBoards (+10 more)

### Community 26 - "board.ts"
Cohesion: 0.07
Nodes (53): Action, DOT_SIZES, EraserMode, HANDLE_REACH, ICON, MODE_NAMES, SIZE_NAMES, sizeChoice() (+45 more)

### Community 27 - "labels.ts"
Cohesion: 0.16
Nodes (19): ACCENTS, BLACKBOARD, CALLIGRAPHIC, closing(), convert(), escapeXml(), FUNCTIONS, GREEK (+11 more)

### Community 28 - "tutorial.mjs"
Cohesion: 0.09
Nodes (12): graphFile, names, namesFile, root, PNG_ICONS, centerOf(), clickOn(), ffmpeg (+4 more)

### Community 29 - "toLatex"
Cohesion: 0.11
Nodes (52): criticalLine(), named(), severalItems(), surface(), T, shown(), simplest(), toLatex() (+44 more)

### Community 30 - "gantt.ts"
Cohesion: 0.06
Nodes (75): amount(), barColor(), crossings(), dateText(), dayMonth(), dayOf(), fitText(), GanttOptions (+67 more)

### Community 31 - "study.ts"
Cohesion: 0.11
Nodes (42): names(), STUDY_GRAPH, studyItems(), T, Asymptote, asymptoteText(), boundaries(), compiled() (+34 more)

### Community 32 - "Rational"
Cohesion: 0.10
Nodes (21): bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactRandom, exactRoot(), factorialExact(), Rational (+13 more)

### Community 33 - "assistant.ts"
Cohesion: 0.14
Nodes (21): AiAnswer, AiError, AiSettings, answerSchema(), askAi(), askCompatible(), askThroughHost(), capitalized() (+13 more)

### Community 34 - "logic.ts"
Cohesion: 0.11
Nodes (30): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+22 more)

### Community 35 - "Parser"
Cohesion: 0.29
Nodes (3): FormulaError, parseFormula(), Parser

### Community 36 - "complex.ts"
Cohesion: 0.06
Nodes (72): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexValue(), isInequality() (+64 more)

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
Nodes (90): addMesh(), addTet(), affinePlane(), Axis, Box, centroid(), chooseBox(), clipBy() (+82 more)

### Community 41 - "latex.ts"
Cohesion: 0.10
Nodes (27): ACCENT_COMMANDS, diffLatex(), DISTRIBUTION_LATEX, distributionLatex(), domainLatex(), fnLatex(), fnName(), formLatex() (+19 more)

### Community 42 - "localModels.ts"
Cohesion: 0.05
Nodes (56): @mlc-ai/web-llm, chat(), GlifoError, Gpu, load(), post(), remove(), scope (+48 more)

### Community 43 - "schema/blocks.ts"
Cohesion: 0.11
Nodes (26): markdownForFile(), openSchema(), saveSchemaBlock(), blockWord(), findSchemaBlock(), findSchemaBlocks(), OpenFence, schemaBlockAtLine() (+18 more)

### Community 44 - "functions.ts"
Cohesion: 0.07
Nodes (63): EMPTY, evaluateSheet(), number(), T, addFormat(), GENERAL, tidy(), FormulaNode (+55 more)

### Community 45 - "MathError"
Cohesion: 0.11
Nodes (59): MathError, angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, determinant() (+51 more)

### Community 46 - "prova-lettori.py"
Cohesion: 0.12
Nodes (4): byte_table(), read(), Reader, tidy()

### Community 47 - "ink.ts"
Cohesion: 0.11
Nodes (20): 2. Dalla lavagna alla nota, BoardOptions, Prefs, BOARD_PALETTES, BoardPalette, BoardTheme, highlightName(), inkName() (+12 more)

### Community 48 - "toolbar.ts"
Cohesion: 0.17
Nodes (16): insertBlock(), wrapSelection(), ListStyleId, Action, createToolbar(), insertCode(), insertLink(), listStyle() (+8 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (36): DrawAction, adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners() (+28 more)

### Community 50 - "schema/shapes.ts"
Cohesion: 0.08
Nodes (16): ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape, IdentifyingRelationShape (+8 more)

### Community 51 - "SidePanel"
Cohesion: 0.21
Nodes (4): isConfidentAnswer(), symbolsInCategory(), preventFocusSteal(), SidePanel

### Community 52 - "parse.ts"
Cohesion: 0.06
Nodes (39): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, differentialInFraction(), DISTRIBUTION_EXAMPLES (+31 more)

### Community 53 - "graph.ts"
Cohesion: 0.09
Nodes (39): fieldInput(), isContainer(), isLanes(), placeIcon(), AT_X, cellText(), COMPASS, createGraph() (+31 more)

### Community 54 - "suggestions.ts"
Cohesion: 0.19
Nodes (10): templateInsertion(), EditorMathContext, expand(), preferredIndex(), SuggestionController, SuggestionItem, commandNames(), parseTemplate() (+2 more)

### Community 55 - "icon"
Cohesion: 0.07
Nodes (46): accountDataFile(), PullResult, openShareDialog(), changeAccess(), changeCopy(), refreshChanged(), render(), run() (+38 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "editor/lists.ts"
Cohesion: 0.17
Nodes (32): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+24 more)

### Community 58 - "FoldersStore"
Cohesion: 0.17
Nodes (4): cleanFolderName(), FoldersStore, sameName(), StoreOptions

### Community 59 - "mathEn2.test.ts"
Cohesion: 0.13
Nodes (34): EMPTY_COMPLEX_SCOPE, countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots() (+26 more)

### Community 60 - "ui/preview.ts"
Cohesion: 0.09
Nodes (20): GraphLabels, BlockKind, MoveDir, hydrateSheets(), T, BLOCK_NAMES, blockHiddenMessage(), blockKindOf() (+12 more)

### Community 61 - "dependencies"
Cohesion: 0.07
Nodes (27): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+19 more)

### Community 62 - "Welcome to Glifo"
Cohesion: 0.20
Nodes (9): A few examples, Calculations and graphs, For programming too, Handy shortcuts, How to write formulas, Lists, Spell check, Try it now (+1 more)

### Community 63 - "spreadsheet/editor.ts"
Cohesion: 0.09
Nodes (46): currentCall(), Editing, MenuEntry, Move, PATHS, SheetEditorOptions, Snapshot, T (+38 more)

### Community 64 - "spreadsheet/format.ts"
Cohesion: 0.07
Nodes (52): formulaText(), CellResult, decimalsOf(), divFormat(), ENGLISH, englishNumber(), fixedNumber(), generalNumber() (+44 more)

### Community 65 - "odesolve.ts"
Cohesion: 0.08
Nodes (81): addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames(), constantParticular() (+73 more)

### Community 66 - "markdown.ts"
Cohesion: 0.08
Nodes (51): blockMoved, blockMoves(), blockMoveTransaction(), LineMap, dataRange(), placeChart(), tableChartKind(), blockKind (+43 more)

### Community 67 - "linsys.ts"
Cohesion: 0.06
Nodes (86): decimalSeparator(), Digits, formatNumber(), FormatOptions, formatRational(), fromNumber(), fromRational(), SUPERSCRIPT (+78 more)

### Community 68 - "editor/editor.ts"
Cohesion: 0.06
Nodes (45): description, name, private, type, version, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands (+37 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "fields.ts"
Cohesion: 0.12
Nodes (37): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+29 more)

### Community 72 - "ABBONAMENTI.md"
Cohesion: 0.26
Nodes (5): Account: i propri appunti su ogni dispositivo, anche da condividere, Idee per il futuro, In programma, L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota (14 ottobre 2026, se ne parla), Trasloco: il sito su Cloudflare, con un dominio tutto di Glifo

### Community 73 - "files.ts"
Cohesion: 0.10
Nodes (24): cache, capability(), ClaudeRuntime, hostDownloads, HostError, inClaudeViewer(), ModelTier, runtime() (+16 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (56): linearIn(), linearCells(), atValues(), Converter, coordinates(), decimalText(), definiteParts(), definiteValue() (+48 more)

### Community 75 - "sidePanel.ts"
Cohesion: 0.13
Nodes (20): katex, AiResult, aiSettingsOf(), localizeTex(), cache, cleanKatexError(), T, TexRender (+12 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Errore o imprevisto → nel dettaglio, 3. Serve una decisione → frasi complete, 4. Fine del compito → un solo riepilogo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "plan.ts"
Cohesion: 0.07
Nodes (49): at(), breakEven(), Point, quantity(), T, tableItems(), textLabel(), chartData (+41 more)

### Community 79 - "explainPanel.ts"
Cohesion: 0.07
Nodes (39): ExplainTone, Explanation, FollowUp, REPLY_TOKENS, definedName(), formulaTopic(), graphTopic(), numberText() (+31 more)

### Community 82 - "Il database degli account (Supabase)"
Cohesion: 0.15
Nodes (12): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il controllo anti-robot (CAPTCHA, ottobre 2026), Il database degli account (Supabase), Il progetto, Nell'app (+4 more)

### Community 83 - "topics.ts"
Cohesion: 0.15
Nodes (22): ATTRIBUTES, containerOf(), cut(), ER_SHAPES, fieldText(), fitLines(), flowOrder(), FREE_NAMES (+14 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.10
Nodes (21): Abbonamenti, Classico, gratis: per scrivere e controllare, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026) (+13 more)

### Community 91 - "noteWordsGraph.test.ts"
Cohesion: 0.12
Nodes (30): @codemirror/view, addToGraphBlock(), GraphLabelLines, insertGraphBlock(), LABEL_KEYS, setGraphLabels(), monthOf(), MONTHS (+22 more)

### Community 92 - "LlamaWorker"
Cohesion: 0.16
Nodes (10): Promemoria per lo studente, Commenti di chi prova Glifo, La lavagna: idee in più, Più avanti, Schemi: idee in più, constructor(), LlamaWorker, Commenti di chi prova Glifo (+2 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.11
Nodes (10): device(), login(), newContext, waitFor(), b64(), CAPTCHA_TOKEN, CODE, GOOGLE_CODE (+2 more)

### Community 97 - "renderTex"
Cohesion: 0.15
Nodes (17): valueNode(), NoteSubject, labelHtml(), texHtml(), checkHtml(), checkTitle(), T, escapeHtml() (+9 more)

### Community 98 - "supabase.ts"
Cohesion: 0.06
Nodes (47): @supabase/supabase-js, captchaToken(), loadTurnstile(), Turnstile, TURNSTILE_SCRIPT, Window, AUTH_STORAGE_KEY, TURNSTILE_SITE_KEY (+39 more)

### Community 100 - "Pt"
Cohesion: 0.10
Nodes (15): clampZoom(), coalesced(), EraseAction, Finger, LassoAction, MoveAction, PanAction, PinchAction (+7 more)

### Community 101 - "schemaBlocks.ts"
Cohesion: 0.09
Nodes (24): InsertOptions, toggleLinePrefix(), addPlaceholders, Placeholder, besideSchema(), BlockWidget, findWidgetBlocks(), guardBlocks() (+16 more)

### Community 102 - "symbolsEn.test.ts"
Cohesion: 0.11
Nodes (38): normalizeText(), singular(), stem(), STOPWORDS, words(), BOTH, buildIndex(), containsPhrase() (+30 more)

### Community 103 - "siteUpdate.ts"
Cohesion: 0.16
Nodes (18): loadingEditor(), checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure (+10 more)

### Community 104 - "calcResults.ts"
Cohesion: 0.07
Nodes (34): @codemirror/lang-markdown, @codemirror/language, @codemirror/state, @lezer/common, acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin (+26 more)

### Community 105 - "noteWordsMath.test.ts"
Cohesion: 0.08
Nodes (26): BLOCKS, FROM_ENGLISH, FUNCTIONS, functionWordPairs(), GRAPH_KEY_FORMS, GRAPH_KEY_LINE, GRAPH_KEYS, TEXT_WORDS (+18 more)

### Community 106 - "BoardStore"
Cohesion: 0.13
Nodes (4): BoardStore, MemoryBoards, backup(), boardsFor()

### Community 107 - "spellcheck.ts"
Cohesion: 0.12
Nodes (15): misspelledMark, refreshSpelling, setTarget, SKIP, SpellTarget, T, wordsToCheck(), findWords() (+7 more)

### Community 108 - "parseMath"
Cohesion: 0.15
Nodes (17): errorMessage(), describe(), MathSyntaxError, parseMath(), parseStatement(), error(), result(), value() (+9 more)

### Community 113 - ".folderItem"
Cohesion: 0.20
Nodes (5): FolderGroup, Note, NoteMeta, NotesPanel, NotesPanelDeps

### Community 116 - "smoke-test.mjs"
Cohesion: 0.22
Nodes (5): markdown-it, fakeFormulaWorker(), fakeLlmWorker(), firstVisit(), plainContext

### Community 117 - "schema/templates.ts"
Cohesion: 0.22
Nodes (18): defaultPlace(), SHAPE_SIZE, tableHeight(), TextPlace, conceptMap(), cycle(), edge(), er() (+10 more)

### Community 118 - "tutorial.ts"
Cohesion: 0.15
Nodes (12): HINT_MS, markTutorialSeen(), openTutorial(), show(), richText(), showTutorialHint(), close(), T (+4 more)

### Community 119 - "Field"
Cohesion: 0.12
Nodes (3): Field, formatPolynomial(), interpolate()

### Community 120 - "client.ts"
Cohesion: 0.20
Nodes (9): Backend, pageBackend(), SpellClientOptions, workerBackend(), WorkerUnavailable, SpellLanguage, createSpellService(), SpellRequest (+1 more)

### Community 121 - "Glifo"
Cohesion: 0.12
Nodes (16): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Domande frequenti e commenti (+8 more)

### Community 122 - "placeholders.ts"
Cohesion: 0.11
Nodes (12): buildDecorations(), clearAllPlaceholders(), clearPlaceholders, contains(), currentIndex(), filledMark, getPlaceholders(), jumpPlaceholder() (+4 more)

### Community 123 - "ExplainPanel"
Cohesion: 0.16
Nodes (4): ExplainChat, ExplainPanel, preventFocusSteal(), formulasSummary()

### Community 124 - "Sheet"
Cohesion: 0.06
Nodes (38): Definition, Line, ExactComplexScope, ConicInfo, Ode, withWorkLimit(), FiniteContext, FormattedResult (+30 more)

### Community 125 - "relocation-test.mjs"
Cohesion: 0.18
Nodes (7): AFTER_MOVE, ids, newBrowser(), NOTICE_DAY, out, serve(), TYPES

### Community 128 - "Glifo – note per Claude"
Cohesion: 0.25
Nodes (8): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Regole, sqlite()

### Community 129 - "explain.ts"
Cohesion: 0.05
Nodes (80): 1. A cosa serve l'AI dei modelli di frontiera, allNames(), answerFollowUp(), bareResult(), chained(), chatContext, ChatFn, chatSubject() (+72 more)

### Community 133 - "database.ts"
Cohesion: 0.23
Nodes (6): createDatabase(), createUser(), databaseTests(), feedbackTests(), migrations, shareTests()

### Community 136 - "Board"
Cohesion: 0.10
Nodes (3): Board, loadPrefs(), penErases()

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
Nodes (43): RFC-4180, fflate, openSheet(), saveSheetBlock(), tablesNote(), csvCell(), csvDelimiter(), csvNumbers() (+35 more)

### Community 142 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 143 - "feedback.ts"
Cohesion: 0.06
Nodes (52): vite-plugin-pwa, SUPABASE_KEY, SUPABASE_URL, feedbackButton, openFeedback(), NEW_ORIGIN, accountOffMessage(), Site (+44 more)

### Community 144 - ".constructor"
Cohesion: 0.20
Nodes (4): closeMathBlockOnEnter(), EditorCallbacks, searchPhrases(), insertTemplate()

### Community 146 - "spellcheck"
Cohesion: 0.21
Nodes (8): spellcheck(), close(), misspelledAt(), openAt(), replace(), tooltipView(), SpellChecker, SpellcheckOptions

### Community 154 - "Stroke"
Cohesion: 0.15
Nodes (15): shapeSvg(), draw(), formulaLines(), lineImage(), linePreview(), modelPixels(), paddedBox(), strokesBox() (+7 more)

### Community 156 - "statsGraph.ts"
Cohesion: 0.27
Nodes (12): classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX, Line, number(), pmfBars() (+4 more)

### Community 157 - "schema/preview.ts"
Cohesion: 0.24
Nodes (11): Look, Theme, draw(), drawCached(), drawn, errorHtml(), fill(), hydrateSchemas() (+3 more)

### Community 158 - "logo.ts"
Cohesion: 0.33
Nodes (6): sidebarToggle(), BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark()

### Community 159 - "parseSchema"
Cohesion: 0.07
Nodes (42): @electric-sql/pglite, @maxgraph/core, openSchemaEditor(), SchemaEditorOptions, loadSchema(), COLOR_NAMES, isRecord(), num() (+34 more)

### Community 160 - "lettore-vero.mjs"
Cohesion: 0.15
Nodes (7): playwright-core, vite, GLYPHS, WRITING, minutes, postMessage(), started

### Community 161 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 162 - "dictionaries.ts"
Cohesion: 0.29
Nodes (3): download(), fetchDictionary(), FILES

### Community 163 - "i18n.ts"
Cohesion: 0.06
Nodes (55): ReadProgress, closing(), FUNCTIONS, tidyLatex(), withoutLooseGroups(), T, browserLang(), browserLanguages() (+47 more)

### Community 166 - "markers.ts"
Cohesion: 0.11
Nodes (37): Item, ListStyle, bullet(), bulletGroup(), childMarker(), column(), firstMarker(), label() (+29 more)

### Community 168 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 176 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 179 - "I modelli e le chiavi API"
Cohesion: 0.33
Nodes (6): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), In prova sul ramo `prova` (7 ottobre 2026): Qwen3 nel browser per «Spiegami», La chiave, il server locale e la scelta del modello (14 ottobre 2026), Le idee dello studente (5 ottobre 2026)

## Knowledge Gaps
- **892 isolated node(s):** `session-start.sh script`, `name`, `private`, `version`, `description` (+887 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1237 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **39 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `h`, `vitest`, `main.ts`, `compile`, `spec.ts`, `src/relocation.ts`, `num`, `graph/preview.ts`, `usesDecimalComma`, `svg.ts`, `sheet.ts`, `SchemaEditor`, `SheetEditor`, `formulaReader.ts`, `numerical.ts`, `arithmetic.ts`, `schema/editor.ts`, `spreadsheetEn.test.ts`, `Parser`, `board.ts`, `tutorial.mjs`, `toLatex`, `gantt.ts`, `study.ts`, `Rational`, `assistant.ts`, `logic.ts`, `Parser`, `complex.ts`, `view3d.ts`, `latex.ts`, `localModels.ts`, `schema/blocks.ts`, `functions.ts`, `MathError`, `ink.ts`, `toolbar.ts`, `board/shapes.ts`, `schema/shapes.ts`, `SidePanel`, `parse.ts`, `graph.ts`, `mathEn2.test.ts`, `ui/preview.ts`, `spreadsheet/editor.ts`, `spreadsheet/format.ts`, `odesolve.ts`, `markdown.ts`, `linsys.ts`, `fields.ts`, `files.ts`, `symbolic.ts`, `sidePanel.ts`, `plan.ts`, `explainPanel.ts`, `topics.ts`, `noteWordsGraph.test.ts`, `renderTex`, `supabase.ts`, `Pt`, `schemaBlocks.ts`, `siteUpdate.ts`, `calcResults.ts`, `BoardStore`, `parseMath`, `smoke-test.mjs`, `schema/templates.ts`, `tutorial.ts`, `ExplainPanel`, `Sheet`, `explain.ts`, `.integral`, `Board`, `xlsx.ts`, `feedback.ts`, `.constructor`, `Stroke`, `logo.ts`, `i18n.ts`?**
  _High betweenness centrality (0.132) - this node is a cross-community bridge._
- **Why does `texts` connect `i18n.ts` to `h`, `explain.ts`, `vitest`, `compile`, `main.ts`, `spec.ts`, `src/relocation.ts`, `graph/preview.ts`, `conics.ts`, `usesDecimalComma`, `svg.ts`, `sheet.ts`, `xlsx.ts`, `namesIn`, `feedback.ts`, `formulaReader.ts`, `numerical.ts`, `arithmetic.ts`, `index.ts`, `schema/editor.ts`, `spreadsheetEn.test.ts`, `board.ts`, `statsGraph.ts`, `toLatex`, `gantt.ts`, `study.ts`, `schema/preview.ts`, `assistant.ts`, `logic.ts`, `parseSchema`, `complex.ts`, `resize.ts`, `latex.ts`, `localModels.ts`, `schema/blocks.ts`, `functions.ts`, `MathError`, `ink.ts`, `toolbar.ts`, `parse.ts`, `icon`, `editor/lists.ts`, `mathEn2.test.ts`, `ui/preview.ts`, `spreadsheet/editor.ts`, `spreadsheet/format.ts`, `odesolve.ts`, `linsys.ts`, `editor/editor.ts`, `fields.ts`, `files.ts`, `symbolic.ts`, `sidePanel.ts`, `plan.ts`, `explainPanel.ts`, `topics.ts`, `noteWordsGraph.test.ts`, `renderTex`, `supabase.ts`, `schemaBlocks.ts`, `siteUpdate.ts`, `calcResults.ts`, `spellcheck.ts`, `schema/templates.ts`, `tutorial.ts`?**
  _High betweenness centrality (0.113) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `h`, `explain.ts`, `main.ts`, `database.ts`, `src/relocation.ts`, `num`, `graph/preview.ts`, `usesDecimalComma`, `svg.ts`, `xlsx.ts`, `feedback.ts`, `formulaReader.ts`, `arithmetic.ts`, `schema/editor.ts`, `spreadsheetEn.test.ts`, `store.ts`, `board.ts`, `Stroke`, `gantt.ts`, `logo.ts`, `Rational`, `assistant.ts`, `parseSchema`, `i18n.ts`, `markers.ts`, `resize.ts`, `view3d.ts`, `translations.test.ts`, `localModels.ts`, `schema/blocks.ts`, `MathError`, `ink.ts`, `board/shapes.ts`, `parse.ts`, `icon`, `editor/lists.ts`, `mathEn2.test.ts`, `spreadsheet/editor.ts`, `markdown.ts`, `editor/editor.ts`, `sidePanel.ts`, `plan.ts`, `explainPanel.ts`, `noteWordsGraph.test.ts`, `supabase.ts`, `schemaBlocks.ts`, `symbolsEn.test.ts`, `siteUpdate.ts`, `calcResults.ts`, `noteWordsMath.test.ts`, `spellcheck.ts`, `parseMath`, `tutorial.ts`, `Sheet`?**
  _High betweenness centrality (0.088) - this node is a cross-community bridge._
- **Are the 347 inferred relationships involving `Dove sono le cose` (e.g. with `fakeFormulaWorker()` and `fakeLlmWorker()`) actually correct?**
  _`Dove sono le cose` has 347 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `name`, `private` to the rest of the system?**
  _892 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `h` be split into smaller, more focused modules?**
  _Cohesion score 0.034174985320023485 - nodes in this community are weakly interconnected._
- **Should `vitest` be split into smaller, more focused modules?**
  _Cohesion score 0.04517508687516707 - nodes in this community are weakly interconnected._