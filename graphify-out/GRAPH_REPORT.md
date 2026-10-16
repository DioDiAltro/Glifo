# Graph Report - Glifo  (2026-10-16)

## Corpus Check
- 362 files · ~747,120 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5720 nodes · 20859 edges · 160 communities (118 shown, 42 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 738 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d4f84814`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- i18n.ts
- vitest
- main.ts
- compile
- sync.ts
- spec.ts
- src/relocation.ts
- num
- graph/preview.ts
- Rational
- probability.ts
- explainSubjects.ts
- svg.ts
- formatNumber
- SchemaEditor
- markdown.ts
- SheetEditor
- formulaWorker.ts
- numerical.ts
- arithmetic.ts
- index.ts
- engine.ts
- schema/editor.ts
- spreadsheet/format.ts
- store.ts
- parse.ts
- strokes.ts
- graph/file.ts
- lettore-vero.mjs
- several.ts
- gantt.ts
- toLatex
- laplace.ts
- assistant.ts
- logic.ts
- Parser
- complex.ts
- devDependencies
- translations.test.ts
- resize.ts
- view3d.ts
- .constructor
- localModels.ts
- parseSchema
- functions.ts
- MathError
- prova-lettori.py
- board.ts
- toolbar.ts
- board/shapes.ts
- schema/shapes.ts
- sidePanel.ts
- spellcheck
- graph.ts
- SuggestionController
- link.ts
- 20261004091555_note_condivise.sql
- editor/lists.ts
- page.ts
- finite.ts
- blockMove.ts
- dependencies
- Welcome to Glifo
- spreadsheet/editor.ts
- topics.ts
- odesolve.ts
- PlanView
- solve.ts
- editor/editor.ts
- Benvenuto in Glifo
- compilerOptions
- Glifo
- Piano per piano
- symbolic.ts
- suggestions.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- plan.ts
- explainPanel.ts
- session-start.sh
- .claude/CLAUDE.md
- Il database degli account (Supabase)
- tutorial.mjs
- Abbonamenti
- LlamaWorker
- supabase-stub.sql
- account-test.mjs
- calcResults.ts
- supabase.ts
- noteWordsMath.test.ts
- schemaBlocks.ts
- symbolsEn.test.ts
- siteUpdate.ts
- @codemirror/state
- .constructor
- smoke-test.mjs
- schema/templates.ts
- BoardStore
- FoldersStore
- suggest.ts
- AiPanel
- placeholders.ts
- ExplainPanel
- sheet.ts
- relocation-test.mjs
- Glifo – note per Claude
- Dove sono le cose
- database.ts
- Board
- 20261008130026_commenti.sql
- Le spiegazioni, come funzionano
- L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota
- xlsx.ts
- createFakeSupabase
- feedback.ts
- ink.ts
- In programma
- sql.ts
- vite
- schemaTools.test.ts
- latexDialog.ts
- markers.ts
- vite.config.ts
- scripts
- Costi
- I modelli e le chiavi API

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 357 edges
2. `MathError` - 151 edges
3. `Sheet` - 150 edges
4. `num()` - 145 edges
5. `h()` - 143 edges
6. `MathNode` - 131 edges
7. `texts` - 127 edges
8. `mul()` - 124 edges
9. `Board` - 119 edges
10. `compile()` - 116 edges

## Surprising Connections (you probably didn't know these)
- `Dove sono le cose` --references--> `fakeLlmWorker()`  [INFERRED]
  ARCHITETTURA.md → scripts/smoke-test.mjs
- `Dove sono le cose` --references--> `tutorialModel()`  [INFERRED]
  ARCHITETTURA.md → scripts/tutorial.mjs
- `Dove sono le cose` --references--> `WidgetKind`  [INFERRED]
  ARCHITETTURA.md → src/editor/schemaBlocks.ts
- `Attenzione a` --references--> `renderMarkdown()`  [INFERRED]
  CLAUDE.md → src/render/markdown.ts
- `Funzionalità` --references--> `k()`  [INFERRED]
  README.md → src/math/numerical.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (160 total, 42 thin omitted)

### Community 0 - "i18n.ts"
Cohesion: 0.03
Nodes (132): SyncStatus, gpuF16(), modelVariant, AI_SERVICES, aiService, T, T, browserLang() (+124 more)

### Community 1 - "vitest"
Cohesion: 0.05
Nodes (45): vitest, formulaAtCursor(), GraphLabelLines, LABEL_KEYS, staticGraphSvg(), chooseWindow(), chooseBox(), formulaGraph() (+37 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (110): addToGraphBlock(), account, ACCOUNT_OFF, active, aiShown(), aiToggle, aiWork, app (+102 more)

### Community 3 - "compile"
Cohesion: 0.04
Nodes (113): integralRegion, LayeredSolid, criticalLine(), isSeveralLine(), named(), severalItems(), surface(), T (+105 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (30): AccountSync, withLock(), Account, EMPTY_STATE, FolderChange, FolderRow, isEmpty(), iso() (+22 more)

### Community 5 - "spec.ts"
Cohesion: 0.04
Nodes (146): conicItems(), isConicLine(), quadricEquation(), T, bodyField(), calculusDims(), calculusItems(), compiledField() (+138 more)

### Community 6 - "src/relocation.ts"
Cohesion: 0.06
Nodes (46): buildPackage(), isRelocationPackage(), moveDayLabel(), NEW_ORIGIN, OLD_ORIGIN, openedForRelocation(), RECEIVE_URL, receiveFromOldSite() (+38 more)

### Community 7 - "num"
Cohesion: 0.13
Nodes (92): atIntegers(), withoutAbs(), exp(), hyperbolicToExp(), inverseRational(), sqrtEx(), termTransform(), polyEx() (+84 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (45): addLabel(), boxes, cameras, complexCoord(), coord(), coordinates(), drawings, drawnViews (+37 more)

### Community 9 - "Rational"
Cohesion: 0.09
Nodes (44): Part, at(), centralCanonical(), Coefficients, coneCanonical(), conicOf(), det2(), det3() (+36 more)

### Community 10 - "probability.ts"
Cohesion: 0.04
Nodes (102): EMPTY_COMPLEX_SCOPE, addExp(), choose(), continuousQuantile(), decimals(), discreteQuantile(), Distribution, End (+94 more)

### Community 11 - "explainSubjects.ts"
Cohesion: 0.14
Nodes (25): explainTarget, schemaTitle(), formulasUntil(), sheetBefore(), explanationMarkdown(), hasCalculation(), insertAfterBlock(), insertAfterText() (+17 more)

### Community 12 - "svg.ts"
Cohesion: 0.08
Nodes (60): labelSvg(), contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), dataWindow() (+52 more)

### Community 13 - "formatNumber"
Cohesion: 0.08
Nodes (61): isTestLine(), number(), T, testItems(), classes(), dataOf(), distributionExtent(), distributionLabel() (+53 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.08
Nodes (12): fieldInput(), isContainer(), isLanes(), SchemaEditor, textWidth(), createEdgeCell(), isFrame(), isNodeLook() (+4 more)

### Community 15 - "markdown.ts"
Cohesion: 0.06
Nodes (55): insertGraphBlock(), setGraphLabels(), monthOf(), MONTHS, MONTHS_EN, parseDate(), planBlock, PlanKind (+47 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (4): functionLabel(), SheetEditor, englishTyping(), cloneSheet()

### Community 17 - "formulaWorker.ts"
Cohesion: 0.08
Nodes (35): onnxruntime-web, ENGINE_BYTES, FromReader, IMAGE_SIZE, READER_CACHE, READER_DOWNLOAD, READER_FILES, READER_MODEL (+27 more)

### Community 18 - "numerical.ts"
Cohesion: 0.10
Nodes (53): isNumericalLine(), numericalItems(), FormatOptions, bisection(), cholesky(), condition(), derivative(), exactPolynomial() (+45 more)

### Community 19 - "arithmetic.ts"
Cohesion: 0.10
Nodes (47): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+39 more)

### Community 20 - "index.ts"
Cohesion: 0.06
Nodes (45): b, bigops, c, calculus, fn, fr, fractions, functions (+37 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "schema/editor.ts"
Cohesion: 0.05
Nodes (49): alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ALIGN_NAMES, ARROW_NAMES (+41 more)

### Community 23 - "spreadsheet/format.ts"
Cohesion: 0.07
Nodes (35): decimalsOf(), ENGLISH, englishNumber(), fixedNumber(), generalNumber(), group(), italianNumber(), MAX_DECIMALS (+27 more)

### Community 24 - "store.ts"
Cohesion: 0.08
Nodes (19): Prefs, BoardPalette, BackupBoard, BoardBackend, done(), fromRecord(), IdbBoards, ofNote() (+11 more)

### Community 25 - "parse.ts"
Cohesion: 0.07
Nodes (45): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, derivativeOperator(), describe() (+37 more)

### Community 26 - "strokes.ts"
Cohesion: 0.09
Nodes (36): centerOn(), copyStrokes(), cross(), IDENTITY, insideLasso(), keepInside(), LASSO_SHARE, lassoed() (+28 more)

### Community 27 - "graph/file.ts"
Cohesion: 0.07
Nodes (47): FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsForFile(), graphsFromFile(), hide() (+39 more)

### Community 28 - "lettore-vero.mjs"
Cohesion: 0.11
Nodes (8): playwright-core, graphFile, names, namesFile, root, PNG_ICONS, GLYPHS, WRITING

### Community 29 - "several.ts"
Cohesion: 0.05
Nodes (87): close(), Definite, definiteIntegral(), exValue(), samples(), EMPTY_SCOPE, absOf(), boundsOf() (+79 more)

### Community 30 - "gantt.ts"
Cohesion: 0.06
Nodes (74): searchPhrases(), amount(), barColor(), crossings(), dateText(), dayMonth(), dayOf(), fitText() (+66 more)

### Community 31 - "toLatex"
Cohesion: 0.05
Nodes (86): names(), STUDY_GRAPH, studyItems(), T, ACCENT_COMMANDS, diffLatex(), DISTRIBUTION_LATEX, distributionLatex() (+78 more)

### Community 32 - "laplace.ts"
Cohesion: 0.08
Nodes (69): factoredPolynomial(), oneFraction(), beyondPoles(), compiled(), E, fractionShown(), HALF, inverseLaplaceShown() (+61 more)

### Community 33 - "assistant.ts"
Cohesion: 0.13
Nodes (24): AiAnswer, AiError, AiSettings, answerSchema(), askAi(), askCompatible(), askThroughHost(), capitalized() (+16 more)

### Community 34 - "logic.ts"
Cohesion: 0.11
Nodes (30): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+22 more)

### Community 36 - "complex.ts"
Cohesion: 0.06
Nodes (70): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isInequality(), onlyComplex() (+62 more)

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
Nodes (85): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+77 more)

### Community 41 - ".constructor"
Cohesion: 0.18
Nodes (3): loadPrefs(), sizeChoice(), SizeChoice

### Community 42 - "localModels.ts"
Cohesion: 0.07
Nodes (41): chat(), GlifoError, Gpu, load(), post(), remove(), scope, shaderF16() (+33 more)

### Community 43 - "parseSchema"
Cohesion: 0.08
Nodes (37): markdownForFile(), findSchemaBlocks(), SchemaEditorOptions, hide(), OPEN, schemasForFile(), schemasFromFile(), T (+29 more)

### Community 44 - "functions.ts"
Cohesion: 0.08
Nodes (65): EMPTY, number(), T, addFormat(), divFormat(), GENERAL, mulFormat(), tidy() (+57 more)

### Community 45 - "MathError"
Cohesion: 0.05
Nodes (100): endTex(), figureText(), linearItem(), usesDecimalComma(), MathError, UndefinedName, angleBetween(), asMatrix() (+92 more)

### Community 46 - "prova-lettori.py"
Cohesion: 0.12
Nodes (4): byte_table(), read(), Reader, tidy()

### Community 47 - "board.ts"
Cohesion: 0.06
Nodes (40): Action, clampZoom(), coalesced(), DOT_SIZES, DrawAction, EraseAction, EraserMode, Finger (+32 more)

### Community 48 - "toolbar.ts"
Cohesion: 0.17
Nodes (16): insertBlock(), wrapSelection(), ListStyleId, Action, createToolbar(), insertCode(), insertLink(), listStyle() (+8 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.14
Nodes (34): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+26 more)

### Community 50 - "schema/shapes.ts"
Cohesion: 0.08
Nodes (17): @maxgraph/core, ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape (+9 more)

### Community 51 - "sidePanel.ts"
Cohesion: 0.13
Nodes (13): AiResult, localizeTex(), cleanKatexError(), isConfidentAnswer(), AiState, cardPreview(), displayCode(), EMPTY_GROUP_TEX (+5 more)

### Community 52 - "spellcheck"
Cohesion: 0.21
Nodes (8): spellcheck(), close(), misspelledAt(), openAt(), replace(), tooltipView(), SpellChecker, SpellcheckOptions

### Community 53 - "graph.ts"
Cohesion: 0.09
Nodes (39): openSchemaEditor(), placeIcon(), AT_X, cellText(), COMPASS, createGraph(), drawSchema(), edgeLook() (+31 more)

### Community 55 - "link.ts"
Cohesion: 0.09
Nodes (30): accountDataFile(), PullResult, openShareDialog(), changeAccess(), changeCopy(), copy(), refreshChanged(), render() (+22 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "editor/lists.ts"
Cohesion: 0.16
Nodes (33): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+25 more)

### Community 58 - "page.ts"
Cohesion: 0.05
Nodes (72): accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf() (+64 more)

### Community 59 - "finite.ts"
Cohesion: 0.17
Nodes (28): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+20 more)

### Community 60 - "blockMove.ts"
Cohesion: 0.05
Nodes (53): blockMoved, blockMoves(), blockMoveTransaction(), LineMap, GraphLabels, blank(), BlockKind, BlockMove (+45 more)

### Community 61 - "dependencies"
Cohesion: 0.07
Nodes (27): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+19 more)

### Community 62 - "Welcome to Glifo"
Cohesion: 0.20
Nodes (9): A few examples, Calculations and graphs, For programming too, Handy shortcuts, How to write formulas, Lists, Spell check, Try it now (+1 more)

### Community 63 - "spreadsheet/editor.ts"
Cohesion: 0.08
Nodes (50): tablesNote(), currentCall(), Editing, MenuEntry, Move, PATHS, SheetEditorOptions, Snapshot (+42 more)

### Community 64 - "topics.ts"
Cohesion: 0.07
Nodes (64): ATTRIBUTES, containerOf(), cut(), ER_SHAPES, fieldText(), fitLines(), flowOrder(), formulaText() (+56 more)

### Community 65 - "odesolve.ts"
Cohesion: 0.10
Nodes (63): addWave(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames(), constantParticular(), constantRoots() (+55 more)

### Community 66 - "PlanView"
Cohesion: 0.26
Nodes (5): readPlan(), ganttWidth(), PlanView, GraphLook, Palette

### Community 67 - "solve.ts"
Cohesion: 0.17
Nodes (25): isStandardUnknown(), linearSystem(), RelOp, breaks(), cubeRoot(), equation(), holds(), inequality() (+17 more)

### Community 68 - "editor/editor.ts"
Cohesion: 0.05
Nodes (61): description, name, private, type, version, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands (+53 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "Glifo"
Cohesion: 0.12
Nodes (16): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Domande frequenti e commenti (+8 more)

### Community 73 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (61): linearIn(), primitive(), verified(), atValues(), Converter, coordinates(), decimalText(), definiteParts() (+53 more)

### Community 75 - "suggestions.ts"
Cohesion: 0.22
Nodes (13): templateInsertion(), expand(), preferredIndex(), SuggestionItem, commandNames(), cardPreviewTex(), formPreviewTex(), ParsedTemplate (+5 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Errore o imprevisto → nel dettaglio, 3. Serve una decisione → frasi complete, 4. Fine del compito → un solo riepilogo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "plan.ts"
Cohesion: 0.08
Nodes (45): at(), breakEven(), Point, quantity(), T, tableItems(), textLabel(), chartData (+37 more)

### Community 79 - "explainPanel.ts"
Cohesion: 0.05
Nodes (52): ExplainTone, Explanation, FollowUp, REPLY_TOKENS, glifoError(), LocalAbort, localErrorMessage(), localLlm (+44 more)

### Community 82 - "Il database degli account (Supabase)"
Cohesion: 0.20
Nodes (10): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il controllo anti-robot (CAPTCHA, ottobre 2026), Il database degli account (Supabase), Il progetto, Il trasloco su glifo.page (ottobre 2026) (+2 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.17
Nodes (7): centerOf(), clickOn(), ffmpeg, SCENES, SIZE, tutorialModel(), work

### Community 90 - "Abbonamenti"
Cohesion: 0.10
Nodes (20): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Deciso (5 ottobre 2026), Dopo (+12 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.10
Nodes (11): @electric-sql/pglite, device(), login(), newContext, waitFor(), b64(), CAPTCHA_TOKEN, CODE (+3 more)

### Community 97 - "calcResults.ts"
Cohesion: 0.09
Nodes (25): katex, acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult, calcResults(), CheckWidget (+17 more)

### Community 98 - "supabase.ts"
Cohesion: 0.10
Nodes (38): @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken(), ensureSessionOf() (+30 more)

### Community 100 - "noteWordsMath.test.ts"
Cohesion: 0.12
Nodes (15): AstNode, childrenOf(), DATA, ENGLISH, englishTexts(), FUNCTIONS, isNode(), ITALIAN (+7 more)

### Community 101 - "schemaBlocks.ts"
Cohesion: 0.09
Nodes (24): InsertOptions, toggleLinePrefix(), addPlaceholders, Placeholder, besideSchema(), BlockWidget, findWidgetBlocks(), guardBlocks() (+16 more)

### Community 102 - "symbolsEn.test.ts"
Cohesion: 0.14
Nodes (28): editDistance(), singular(), stem(), STOPWORDS, words(), BOTH, buildIndex(), containsPhrase() (+20 more)

### Community 103 - "siteUpdate.ts"
Cohesion: 0.15
Nodes (19): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, loadPart() (+11 more)

### Community 107 - "@codemirror/state"
Cohesion: 0.07
Nodes (29): @codemirror/lang-markdown, @codemirror/state, formulaInsertion(), misspelledMark, refreshSpelling, setTarget, SKIP, SpellTarget (+21 more)

### Community 116 - "smoke-test.mjs"
Cohesion: 0.22
Nodes (5): markdown-it, fakeFormulaWorker(), fakeLlmWorker(), firstVisit(), plainContext

### Community 117 - "schema/templates.ts"
Cohesion: 0.21
Nodes (18): DEFAULT_EDGE, SchemaEdge, SchemaNode, SHAPE_SIZE, conceptMap(), cycle(), edge(), er() (+10 more)

### Community 118 - "BoardStore"
Cohesion: 0.08
Nodes (15): BoardStore, MemoryBoards, applyAccountChange(), backup(), BackupNote, backupNotes(), restoreBackup(), RestoreBoards (+7 more)

### Community 119 - "FoldersStore"
Cohesion: 0.07
Nodes (20): cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder(), loadClosedFolders(), RemoteFolder (+12 more)

### Community 120 - "suggest.ts"
Cohesion: 0.27
Nodes (11): normalizeText(), IndexedEntry, SearchResult, getIndex(), isSubsequence(), keysOf(), MatchKind, suggestCommands() (+3 more)

### Community 121 - "AiPanel"
Cohesion: 0.29
Nodes (5): NoteSubject, AiPanel, graphLabel(), kindName(), texInline()

### Community 122 - "placeholders.ts"
Cohesion: 0.15
Nodes (10): buildDecorations(), clearAllPlaceholders(), clearPlaceholders, contains(), currentIndex(), filledMark, getPlaceholders(), jumpPlaceholder() (+2 more)

### Community 123 - "ExplainPanel"
Cohesion: 0.17
Nodes (3): ExplainChat, ExplainPanel, preventFocusSteal()

### Community 124 - "sheet.ts"
Cohesion: 0.05
Nodes (58): ExactComplexScope, ConicInfo, Ode, OdeFunction, expSumValue(), withWorkLimit(), ExactFunction, FiniteContext (+50 more)

### Community 125 - "relocation-test.mjs"
Cohesion: 0.18
Nodes (7): AFTER_MOVE, ids, newBrowser(), NOTICE_DAY, out, serve(), TYPES

### Community 128 - "Glifo – note per Claude"
Cohesion: 0.20
Nodes (9): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole (+1 more)

### Community 129 - "Dove sono le cose"
Cohesion: 0.05
Nodes (80): 1. A cosa serve l'AI dei modelli di frontiera, Dove sono le cose, Glifo – architettura, allNames(), answerFollowUp(), bareResult(), chained(), chatContext (+72 more)

### Community 133 - "database.ts"
Cohesion: 0.23
Nodes (6): createDatabase(), createUser(), databaseTests(), feedbackTests(), migrations, shareTests()

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
Nodes (43): RFC-4180, fflate, csvCell(), csvDelimiter(), csvNumbers(), csvToSheet(), digitsOf(), field() (+35 more)

### Community 142 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 143 - "feedback.ts"
Cohesion: 0.06
Nodes (47): captchaToken(), loadTurnstile(), Turnstile, TURNSTILE_SCRIPT, Window, AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL (+39 more)

### Community 154 - "ink.ts"
Cohesion: 0.10
Nodes (27): 2. Dalla lavagna alla nota, BoardOptions, BOARD_PALETTES, BoardTheme, highlightName(), inkName(), mid(), outlineSvg() (+19 more)

### Community 156 - "In programma"
Cohesion: 0.22
Nodes (9): Account: i propri appunti su ogni dispositivo, anche da condividere, Commenti di chi prova Glifo, Idee per il futuro, In programma, L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota (14 ottobre 2026, se ne parla), La lavagna: idee in più, Più avanti, Schemi: idee in più (+1 more)

### Community 159 - "sql.ts"
Cohesion: 0.16
Nodes (19): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+11 more)

### Community 160 - "vite"
Cohesion: 0.33
Nodes (4): vite, minutes, postMessage(), started

### Community 161 - "schemaTools.test.ts"
Cohesion: 0.13
Nodes (27): laneOf(), base64(), cellHtml(), crc32(), svgSize(), svgToPng(), T, withDensity() (+19 more)

### Community 163 - "latexDialog.ts"
Cohesion: 0.06
Nodes (43): ReadProgress, closing(), FUNCTIONS, tidyLatex(), withoutLooseGroups(), cache, capability(), ClaudeRuntime (+35 more)

### Community 166 - "markers.ts"
Cohesion: 0.11
Nodes (35): Item, ListStyle, bullet(), bulletGroup(), childMarker(), column(), firstMarker(), label() (+27 more)

### Community 170 - "vite.config.ts"
Cohesion: 0.22
Nodes (6): @mlc-ai/web-llm, vite-plugin-pwa, accountOffMessage(), defineFor(), MAIN_BRANCH, webllmModels

### Community 174 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 176 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 179 - "I modelli e le chiavi API"
Cohesion: 0.33
Nodes (6): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), In prova sul ramo `prova` (7 ottobre 2026): Qwen3 nel browser per «Spiegami», La chiave, il server locale e la scelta del modello (14 ottobre 2026), Le idee dello studente (5 ottobre 2026)

## Knowledge Gaps
- **894 isolated node(s):** `3. Da una foto alla nota`, `4. Dettare: la voce diventa testo nella nota`, `5. Registrare le lezioni e trascriverle`, `Da sistemare con il primo punto che tocca l'AI`, `In che ordine` (+889 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1233 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **42 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `texts` connect `i18n.ts` to `Glifo – note per Claude`, `Dove sono le cose`, `main.ts`, `compile`, `spec.ts`, `src/relocation.ts`, `graph/preview.ts`, `Rational`, `probability.ts`, `svg.ts`, `formatNumber`, `xlsx.ts`, `markdown.ts`, `feedback.ts`, `formulaWorker.ts`, `numerical.ts`, `arithmetic.ts`, `index.ts`, `schema/editor.ts`, `spreadsheet/format.ts`, `parse.ts`, `ink.ts`, `graph/file.ts`, `several.ts`, `gantt.ts`, `toLatex`, `laplace.ts`, `assistant.ts`, `logic.ts`, `schemaTools.test.ts`, `complex.ts`, `sql.ts`, `latexDialog.ts`, `resize.ts`, `localModels.ts`, `parseSchema`, `functions.ts`, `MathError`, `board.ts`, `toolbar.ts`, `sidePanel.ts`, `link.ts`, `editor/lists.ts`, `page.ts`, `finite.ts`, `blockMove.ts`, `spreadsheet/editor.ts`, `topics.ts`, `odesolve.ts`, `solve.ts`, `editor/editor.ts`, `symbolic.ts`, `plan.ts`, `explainPanel.ts`, `calcResults.ts`, `supabase.ts`, `schemaBlocks.ts`, `siteUpdate.ts`, `@codemirror/state`, `schema/templates.ts`, `BoardStore`, `FoldersStore`, `sheet.ts`?**
  _High betweenness centrality (0.155) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `Dove sono le cose` to `i18n.ts`, `vitest`, `main.ts`, `compile`, `spec.ts`, `src/relocation.ts`, `num`, `Board`, `graph/preview.ts`, `probability.ts`, `explainSubjects.ts`, `svg.ts`, `Rational`, `SchemaEditor`, `markdown.ts`, `xlsx.ts`, `formulaWorker.ts`, `numerical.ts`, `arithmetic.ts`, `SheetEditor`, `feedback.ts`, `schema/editor.ts`, `parse.ts`, `strokes.ts`, `ink.ts`, `graph/file.ts`, `several.ts`, `gantt.ts`, `toLatex`, `laplace.ts`, `assistant.ts`, `logic.ts`, `latexDialog.ts`, `complex.ts`, `schemaTools.test.ts`, `view3d.ts`, `localModels.ts`, `vite.config.ts`, `functions.ts`, `MathError`, `board.ts`, `toolbar.ts`, `board/shapes.ts`, `schema/shapes.ts`, `sidePanel.ts`, `graph.ts`, `page.ts`, `finite.ts`, `blockMove.ts`, `spreadsheet/editor.ts`, `topics.ts`, `odesolve.ts`, `PlanView`, `symbolic.ts`, `plan.ts`, `explainPanel.ts`, `tutorial.mjs`, `calcResults.ts`, `supabase.ts`, `schemaBlocks.ts`, `siteUpdate.ts`, `@codemirror/state`, `.constructor`, `smoke-test.mjs`, `BoardStore`, `AiPanel`, `ExplainPanel`, `sheet.ts`?**
  _High betweenness centrality (0.128) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `i18n.ts`, `Dove sono le cose`, `compile`, `database.ts`, `src/relocation.ts`, `num`, `graph/preview.ts`, `probability.ts`, `svg.ts`, `xlsx.ts`, `feedback.ts`, `markdown.ts`, `formulaWorker.ts`, `store.ts`, `parse.ts`, `strokes.ts`, `ink.ts`, `graph/file.ts`, `gantt.ts`, `sql.ts`, `laplace.ts`, `assistant.ts`, `schemaTools.test.ts`, `latexDialog.ts`, `toLatex`, `markers.ts`, `resize.ts`, `view3d.ts`, `translations.test.ts`, `vite.config.ts`, `localModels.ts`, `parseSchema`, `MathError`, `board.ts`, `board/shapes.ts`, `graph.ts`, `link.ts`, `editor/lists.ts`, `page.ts`, `blockMove.ts`, `spreadsheet/editor.ts`, `topics.ts`, `editor/editor.ts`, `suggestions.ts`, `plan.ts`, `explainPanel.ts`, `supabase.ts`, `noteWordsMath.test.ts`, `schemaBlocks.ts`, `symbolsEn.test.ts`, `siteUpdate.ts`, `@codemirror/state`, `BoardStore`, `FoldersStore`, `sheet.ts`?**
  _High betweenness centrality (0.066) - this node is a cross-community bridge._
- **Are the 356 inferred relationships involving `Dove sono le cose` (e.g. with `fakeFormulaWorker()` and `fakeLlmWorker()`) actually correct?**
  _`Dove sono le cose` has 356 INFERRED edges - model-reasoned connections that need verification._
- **What connects `3. Da una foto alla nota`, `4. Dettare: la voce diventa testo nella nota`, `5. Registrare le lezioni e trascriverle` to the rest of the system?**
  _894 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `i18n.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.027001569858712715 - nodes in this community are weakly interconnected._
- **Should `vitest` be split into smaller, more focused modules?**
  _Cohesion score 0.05300207039337474 - nodes in this community are weakly interconnected._