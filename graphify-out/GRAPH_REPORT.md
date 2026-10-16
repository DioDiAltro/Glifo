# Graph Report - Glifo  (2026-10-16)

## Corpus Check
- 363 files · ~748,724 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5729 nodes · 20899 edges · 158 communities (119 shown, 39 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 742 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0e891726`
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
- primitive.ts
- graph/preview.ts
- conics.ts
- distributions.ts
- explainPanel.ts
- svg.ts
- sheet.ts
- SchemaEditor
- markdown.ts
- SheetEditor
- formulaReader.ts
- numerical.ts
- arithmetic.ts
- index.ts
- engine.ts
- schema/editor.ts
- spreadsheetEn.test.ts
- BoardStore
- noteWordsMath.test.ts
- strokes.ts
- graph/file.ts
- tutorial.mjs
- several.ts
- gantt.ts
- study.ts
- Rational
- sidePanel.ts
- logic.ts
- Parser
- complex.ts
- devDependencies
- translations.test.ts
- resize.ts
- view3d.ts
- latex.ts
- localModels.ts
- schema/model.ts
- functions.ts
- MathError
- prova-lettori.py
- board.ts
- toolbar.ts
- board/shapes.ts
- schema/shapes.ts
- SidePanel
- parse.ts
- graph.ts
- SuggestionController
- page.ts
- 20261004091555_note_condivise.sql
- editor/lists.ts
- NotesStore
- finite.ts
- ui/preview.ts
- dependencies
- Welcome to Glifo
- spreadsheet/editor.ts
- spreadsheet/format.ts
- odesolve.ts
- blockMove.ts
- solve.ts
- editor/editor.ts
- Benvenuto in Glifo
- compilerOptions
- fields.ts
- ABBONAMENTI.md
- Piano per piano
- symbolic.ts
- suggestions.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- chart.ts
- MarkdownEditor
- session-start.sh
- .claude/CLAUDE.md
- Il database degli account (Supabase)
- topics.ts
- Abbonamenti
- Converter
- LlamaWorker
- supabase-stub.sql
- account-test.mjs
- aiPanel.ts
- supabase.ts
- Pt
- noteWords.ts
- symbolsEn.test.ts
- siteUpdate.ts
- calcPlugin
- Schema
- NodeLook
- spellcheck.ts
- smoke-test.mjs
- schema/templates.ts
- suggest.ts
- editor.test.ts
- ExplainPanel
- Sheet
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
- Stroke
- sql.ts
- lettore-vero.mjs
- schemaTools.test.ts
- tidyLatex
- render/lists.ts
- vite.config.ts
- Costi
- I modelli e le chiavi API

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 360 edges
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
- `Dove sono le cose` --references--> `ConicElements`  [INFERRED]
  ARCHITETTURA.md → src/math/conics.ts
- `Come viene pubblicata` --references--> `dist()`  [INFERRED]
  README.md → src/board/shapes.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (158 total, 39 thin omitted)

### Community 0 - "i18n.ts"
Cohesion: 0.03
Nodes (124): SyncStatus, ReadProgress, browserLang(), browserLanguages(), dateLocale(), detectLang(), Entry, isLang() (+116 more)

### Community 1 - "vitest"
Cohesion: 0.06
Nodes (41): vitest, staticGraphSvg(), chooseWindow(), chooseBox(), formulaGraph(), GraphItem, parseGraph(), graphSvg() (+33 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (122): unshareNote(), newStrokeId(), remapGraphLines(), account, ACCOUNT_OFF, accountButton, active, aiShown() (+114 more)

### Community 3 - "compile"
Cohesion: 0.04
Nodes (123): depth(), integralRegion, LayeredSolid, Multiple, PlanePart, radiusOf(), spaceLayers(), spaceMargin() (+115 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (31): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+23 more)

### Community 5 - "spec.ts"
Cohesion: 0.04
Nodes (134): conicItems(), isConicLine(), quadricEquation(), T, valueLabel(), fourierItems(), isFourierLine(), T (+126 more)

### Community 6 - "src/relocation.ts"
Cohesion: 0.06
Nodes (82): accountSpace(), adoptGuestNotes(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf(), prefsKey() (+74 more)

### Community 7 - "primitive.ts"
Cohesion: 0.17
Nodes (61): atIntegers(), similarSolution(), algebraic(), bigGcd(), byParts(), candidates(), canon(), combineLogs() (+53 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (41): addLabel(), boxes, cameras, complexCoord(), coord(), coordinates(), drawings, drawnViews (+33 more)

### Community 9 - "conics.ts"
Cohesion: 0.17
Nodes (30): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+22 more)

### Community 10 - "distributions.ts"
Cohesion: 0.06
Nodes (68): addExp(), choose(), continuousQuantile(), decimals(), discreteQuantile(), exactIntervalProbability(), expSum, factorialBig() (+60 more)

### Community 11 - "explainPanel.ts"
Cohesion: 0.07
Nodes (54): @codemirror/language, @codemirror/state, @codemirror/view, @lezer/common, explainTarget, Explanation, formulaNames(), CalcCheck (+46 more)

### Community 12 - "svg.ts"
Cohesion: 0.08
Nodes (61): labelSvg(), contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), dataWindow() (+53 more)

### Community 13 - "sheet.ts"
Cohesion: 0.07
Nodes (63): EMPTY_COMPLEX_SCOPE, OdeFunction, expSumValue(), EXACT, Lin, bracketParts(), BRACKETS, CHECK_VALUES (+55 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.09
Nodes (18): isContainer(), isLanes(), SchemaEditor, cellText(), createEdgeCell(), edgeLook(), isFrame(), nodeLook() (+10 more)

### Community 15 - "markdown.ts"
Cohesion: 0.11
Nodes (31): @lezer/highlight, @lezer/markdown, lineDepth(), mathDelimTag, mathTag, parseBlockMath(), dataRange(), moveAttrs() (+23 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (5): functionLabel(), SheetEditor, englishTyping(), CellRange, cloneSheet()

### Community 17 - "formulaReader.ts"
Cohesion: 0.08
Nodes (39): onnxruntime-web, ENGINE_BYTES, FromReader, IMAGE_SIZE, READER_CACHE, READER_DOWNLOAD, READER_FILES, READER_MODEL (+31 more)

### Community 18 - "numerical.ts"
Cohesion: 0.07
Nodes (67): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Domande frequenti e commenti (+59 more)

### Community 19 - "arithmetic.ts"
Cohesion: 0.07
Nodes (73): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+65 more)

### Community 20 - "index.ts"
Cohesion: 0.06
Nodes (45): b, bigops, c, calculus, fn, fr, fractions, functions (+37 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "schema/editor.ts"
Cohesion: 0.07
Nodes (31): alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ALIGN_NAMES, ARROW_NAMES (+23 more)

### Community 23 - "spreadsheetEn.test.ts"
Cohesion: 0.07
Nodes (51): RFC-4180, fflate, csvCell(), csvDelimiter(), csvNumbers(), csvToSheet(), digitsOf(), field() (+43 more)

### Community 24 - "BoardStore"
Cohesion: 0.05
Nodes (17): fake-indexeddb, BoardBackend, BoardStore, done(), fromRecord(), IdbBoards, MemoryBoards, ofNote() (+9 more)

### Community 25 - "noteWordsMath.test.ts"
Cohesion: 0.10
Nodes (19): derivativeOperator(), describe(), Parser, AstNode, childrenOf(), DATA, ENGLISH, englishTexts() (+11 more)

### Community 26 - "strokes.ts"
Cohesion: 0.08
Nodes (38): centerOn(), copyStrokes(), cross(), handleScale(), IDENTITY, insideLasso(), keepInside(), LASSO_SHARE (+30 more)

### Community 27 - "graph/file.ts"
Cohesion: 0.07
Nodes (44): FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsForFile(), graphsFromFile(), hide() (+36 more)

### Community 28 - "tutorial.mjs"
Cohesion: 0.09
Nodes (12): graphFile, names, namesFile, root, PNG_ICONS, centerOf(), clickOn(), ffmpeg (+4 more)

### Community 29 - "several.ts"
Cohesion: 0.06
Nodes (86): close(), Definite, definiteIntegral(), exValue(), samples(), EMPTY_SCOPE, absOf(), boundsOf() (+78 more)

### Community 30 - "gantt.ts"
Cohesion: 0.06
Nodes (77): amount(), barColor(), crossings(), dateText(), dayMonth(), dayOf(), fitText(), GanttOptions (+69 more)

### Community 31 - "study.ts"
Cohesion: 0.13
Nodes (40): limit(), breaks(), periodOf(), Asymptote, asymptoteText(), boundaries(), compiled(), cutsOf() (+32 more)

### Community 32 - "Rational"
Cohesion: 0.06
Nodes (70): Part, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactFunction, ExactRandom, exactRoot() (+62 more)

### Community 33 - "sidePanel.ts"
Cohesion: 0.06
Nodes (52): AiAnswer, AiError, AiResult, AiSettings, answerSchema(), askAi(), askCompatible(), askThroughHost() (+44 more)

### Community 34 - "logic.ts"
Cohesion: 0.11
Nodes (30): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+22 more)

### Community 36 - "complex.ts"
Cohesion: 0.06
Nodes (66): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexValue(), isInequality() (+58 more)

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
Nodes (82): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+74 more)

### Community 41 - "latex.ts"
Cohesion: 0.07
Nodes (40): classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX, Line, number(), pmfBars() (+32 more)

### Community 42 - "localModels.ts"
Cohesion: 0.05
Nodes (55): chat(), GlifoError, Gpu, load(), post(), remove(), scope, shaderF16() (+47 more)

### Community 43 - "schema/model.ts"
Cohesion: 0.05
Nodes (52): openSchemaEditor(), base64(), hide(), OPEN, schemasForFile(), schemasFromFile(), T, unhide() (+44 more)

### Community 44 - "functions.ts"
Cohesion: 0.08
Nodes (66): EMPTY, number(), T, addFormat(), divFormat(), GENERAL, most(), mulFormat() (+58 more)

### Community 45 - "MathError"
Cohesion: 0.05
Nodes (102): MathError, formatRational(), angleBetween(), asMatrix(), basisOf(), characteristicPolynomial(), circleText(), complexText() (+94 more)

### Community 46 - "prova-lettori.py"
Cohesion: 0.12
Nodes (4): byte_table(), read(), Reader, tidy()

### Community 47 - "board.ts"
Cohesion: 0.08
Nodes (34): Action, DOT_SIZES, EraserMode, HANDLE_REACH, ICON, MODE_NAMES, PanAction, PinchAction (+26 more)

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
Cohesion: 0.18
Nodes (7): localizeTex(), cleanKatexError(), cardPreview(), displayCode(), formPreview(), preventFocusSteal(), SidePanel

### Community 52 - "parse.ts"
Cohesion: 0.06
Nodes (40): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, differentialInFraction(), DISTRIBUTION_EXAMPLES (+32 more)

### Community 53 - "graph.ts"
Cohesion: 0.08
Nodes (33): @maxgraph/core, placeIcon(), AT_X, COMPASS, createGraph(), drawSchema(), edgeStyle(), edgeTextAt() (+25 more)

### Community 55 - "page.ts"
Cohesion: 0.06
Nodes (54): SUPABASE_URL, accountDataFile(), currentAccount(), PullResult, openShareDialog(), changeAccess(), changeCopy(), refreshChanged() (+46 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "editor/lists.ts"
Cohesion: 0.09
Nodes (58): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+50 more)

### Community 58 - "NotesStore"
Cohesion: 0.04
Nodes (48): Deletion, DeletionLog, cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder() (+40 more)

### Community 59 - "finite.ts"
Cohesion: 0.17
Nodes (28): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+20 more)

### Community 60 - "ui/preview.ts"
Cohesion: 0.08
Nodes (23): GraphLabels, remapLineKeys(), renameGraphScope(), renameScopeKeys(), BlockKind, MoveDir, hydrateSheets(), T (+15 more)

### Community 61 - "dependencies"
Cohesion: 0.07
Nodes (27): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+19 more)

### Community 62 - "Welcome to Glifo"
Cohesion: 0.20
Nodes (9): A few examples, Calculations and graphs, For programming too, Handy shortcuts, How to write formulas, Lists, Spell check, Try it now (+1 more)

### Community 63 - "spreadsheet/editor.ts"
Cohesion: 0.10
Nodes (46): currentCall(), Editing, MenuEntry, Move, PATHS, SheetEditorOptions, Snapshot, T (+38 more)

### Community 64 - "spreadsheet/format.ts"
Cohesion: 0.09
Nodes (43): formulaText(), readSheet(), tableTopic(), valueText(), sheetSummary(), hide(), OPEN, sheetsForFile() (+35 more)

### Community 65 - "odesolve.ts"
Cohesion: 0.07
Nodes (76): addWave(), arrange(), bernoulliFamily(), cauchy(), compiled(), constantNames(), constantParticular(), constantRoots() (+68 more)

### Community 66 - "blockMove.ts"
Cohesion: 0.11
Nodes (34): blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove, blockPlace(), closed() (+26 more)

### Community 67 - "solve.ts"
Cohesion: 0.08
Nodes (43): endTex(), exponentialForm(), fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd() (+35 more)

### Community 68 - "editor/editor.ts"
Cohesion: 0.05
Nodes (35): description, name, private, scripts, build, dev, preview, test (+27 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "fields.ts"
Cohesion: 0.11
Nodes (40): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+32 more)

### Community 72 - "ABBONAMENTI.md"
Cohesion: 0.26
Nodes (5): Account: i propri appunti su ogni dispositivo, anche da condividere, Idee per il futuro, In programma, L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota (14 ottobre 2026, se ne parla), Trasloco: il sito su Cloudflare, con un dominio tutto di Glifo

### Community 73 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 74 - "symbolic.ts"
Cohesion: 0.08
Nodes (82): splitAbs(), withoutAbs(), exp(), hyperbolicToExp(), inverseRational(), linearIn(), sqrtEx(), termTransform() (+74 more)

### Community 75 - "suggestions.ts"
Cohesion: 0.23
Nodes (12): expand(), preferredIndex(), SuggestionItem, commandNames(), cardPreviewTex(), formPreviewTex(), ParsedTemplate, parseTemplate() (+4 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Errore o imprevisto → nel dettaglio, 3. Serve una decisione → frasi complete, 4. Fine del compito → un solo riepilogo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "chart.ts"
Cohesion: 0.13
Nodes (29): at(), breakEven(), Point, quantity(), T, tableItems(), textLabel(), graphKeyLine() (+21 more)

### Community 79 - "MarkdownEditor"
Cohesion: 0.11
Nodes (17): ExplainTone, FollowUp, REPLY_TOKENS, MarkdownEditor, Settings, AI_NEWS_TITLE, AI_WORKING_TITLE, aiActivity (+9 more)

### Community 82 - "Il database degli account (Supabase)"
Cohesion: 0.15
Nodes (12): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il controllo anti-robot (CAPTCHA, ottobre 2026), Il database degli account (Supabase), Il progetto, Il trasloco su glifo.page (ottobre 2026) (+4 more)

### Community 83 - "topics.ts"
Cohesion: 0.10
Nodes (32): ATTRIBUTES, containerOf(), cut(), definedName(), ER_SHAPES, fieldText(), fitLines(), flowOrder() (+24 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.10
Nodes (20): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Deciso (5 ottobre 2026), Dopo (+12 more)

### Community 91 - "Converter"
Cohesion: 0.17
Nodes (16): linearCells(), pairUp(), Converter, definiteParts(), definiteValue(), expandCalculus(), fieldName(), functionOf() (+8 more)

### Community 92 - "LlamaWorker"
Cohesion: 0.16
Nodes (10): Promemoria per lo studente, Commenti di chi prova Glifo, La lavagna: idee in più, Più avanti, Schemi: idee in più, constructor(), LlamaWorker, Commenti di chi prova Glifo (+2 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.11
Nodes (10): device(), login(), newContext, waitFor(), b64(), CAPTCHA_TOKEN, CODE, GOOGLE_CODE (+2 more)

### Community 97 - "aiPanel.ts"
Cohesion: 0.10
Nodes (26): katex, valueNode(), NoteSubject, SubjectKind, setGraphLabels(), texHtml(), toolButton(), parseGraphKey() (+18 more)

### Community 98 - "supabase.ts"
Cohesion: 0.08
Nodes (36): @supabase/supabase-js, captchaToken(), loadTurnstile(), Turnstile, TURNSTILE_SCRIPT, Window, AUTH_STORAGE_KEY, TURNSTILE_SITE_KEY (+28 more)

### Community 100 - "Pt"
Cohesion: 0.16
Nodes (10): coalesced(), EraseAction, Finger, LassoAction, MoveAction, pointsOf(), pressureOf(), Transform (+2 more)

### Community 101 - "noteWords.ts"
Cohesion: 0.06
Nodes (40): toggleLinePrefix(), BlockWidget, findWidgetBlocks(), guardBlocks(), KINDS, schemaBlocks(), schemaSummary(), svg() (+32 more)

### Community 102 - "symbolsEn.test.ts"
Cohesion: 0.13
Nodes (30): editDistance(), singular(), stem(), STOPWORDS, words(), BOTH, buildIndex(), containsPhrase() (+22 more)

### Community 103 - "siteUpdate.ts"
Cohesion: 0.18
Nodes (16): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, loadPart() (+8 more)

### Community 104 - "calcPlugin"
Cohesion: 0.16
Nodes (5): acceptCalcResult(), calcPlugin, CheckWidget, insertResult(), ResultWidget

### Community 105 - "Schema"
Cohesion: 0.33
Nodes (4): SchemaEditorOptions, Schema, serializeSchema(), Template

### Community 107 - "spellcheck.ts"
Cohesion: 0.08
Nodes (23): misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt(), openAt() (+15 more)

### Community 116 - "smoke-test.mjs"
Cohesion: 0.22
Nodes (5): markdown-it, fakeFormulaWorker(), fakeLlmWorker(), firstVisit(), plainContext

### Community 117 - "schema/templates.ts"
Cohesion: 0.22
Nodes (18): SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), conceptMap(), cycle(), edge(), er() (+10 more)

### Community 120 - "suggest.ts"
Cohesion: 0.27
Nodes (11): normalizeText(), IndexedEntry, SearchResult, getIndex(), isSubsequence(), keysOf(), MatchKind, suggestCommands() (+3 more)

### Community 122 - "editor.test.ts"
Cohesion: 0.07
Nodes (31): @codemirror/lang-markdown, tabOutOfMath(), InsertOptions, templateInsertion(), formulaInsertion(), commandTokenAt(), isInCode(), mathContextAt() (+23 more)

### Community 123 - "ExplainPanel"
Cohesion: 0.15
Nodes (5): ExplainChat, ExplainPanel, preventFocusSteal(), formulasSummary(), setup()

### Community 124 - "Sheet"
Cohesion: 0.07
Nodes (36): Definition, Line, complex, ExactComplexScope, Ode, withWorkLimit(), FiniteContext, FormattedResult (+28 more)

### Community 125 - "relocation-test.mjs"
Cohesion: 0.18
Nodes (7): AFTER_MOVE, ids, newBrowser(), NOTICE_DAY, out, serve(), TYPES

### Community 128 - "Glifo – note per Claude"
Cohesion: 0.25
Nodes (8): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Regole, sqlite()

### Community 129 - "Dove sono le cose"
Cohesion: 0.05
Nodes (81): 1. A cosa serve l'AI dei modelli di frontiera, Dove sono le cose, Glifo – architettura, allNames(), answerFollowUp(), bareResult(), chained(), chatContext (+73 more)

### Community 133 - "database.ts"
Cohesion: 0.23
Nodes (6): createDatabase(), createUser(), databaseTests(), feedbackTests(), migrations, shareTests()

### Community 136 - "Board"
Cohesion: 0.08
Nodes (6): Board, clampZoom(), loadPrefs(), penErases(), validView(), BoardTheme

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
Cohesion: 0.08
Nodes (52): pick(), sameFormat(), BinOp, COMPARE, englishFormula(), ERRORS_BY_LENGTH, formulaBody(), formulaRefs() (+44 more)

### Community 142 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 143 - "feedback.ts"
Cohesion: 0.07
Nodes (44): SUPABASE_KEY, feedbackButton, openFeedback(), Site, T, commentDate(), commentItem(), COMMENTS_MAX (+36 more)

### Community 154 - "Stroke"
Cohesion: 0.11
Nodes (24): 2. Dalla lavagna alla nota, BoardOptions, Step, mid(), outlineSvg(), shapeSvg(), strokeOptions(), strokeOutline() (+16 more)

### Community 159 - "sql.ts"
Cohesion: 0.15
Nodes (19): @electric-sql/pglite, Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote() (+11 more)

### Community 160 - "lettore-vero.mjs"
Cohesion: 0.15
Nodes (7): playwright-core, vite, GLYPHS, WRITING, minutes, postMessage(), started

### Community 161 - "schemaTools.test.ts"
Cohesion: 0.12
Nodes (26): laneOf(), fieldInput(), textWidth(), cellHtml(), crc32(), T, withDensity(), labelHtml() (+18 more)

### Community 163 - "tidyLatex"
Cohesion: 0.31
Nodes (7): closing(), FUNCTIONS, tidyLatex(), withoutLooseGroups(), check(), HANDWRITTEN, PRINTED

### Community 166 - "render/lists.ts"
Cohesion: 0.27
Nodes (13): ListStyle, bulletGroup(), Marker, sameList(), alignInside(), asciiTrim(), findMarker(), Found (+5 more)

### Community 170 - "vite.config.ts"
Cohesion: 0.22
Nodes (6): @mlc-ai/web-llm, vite-plugin-pwa, accountOffMessage(), defineFor(), MAIN_BRANCH, webllmModels

### Community 176 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 179 - "I modelli e le chiavi API"
Cohesion: 0.33
Nodes (6): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), In prova sul ramo `prova` (7 ottobre 2026): Qwen3 nel browser per «Spiegami», La chiave, il server locale e la scelta del modello (14 ottobre 2026), Le idee dello studente (5 ottobre 2026)

## Knowledge Gaps
- **892 isolated node(s):** `Deciso`, `Com'è andata la discussione`, `La proposta dello studente (4 ottobre 2026)`, `Il parere di Claude, in breve`, `Se costa, è a pagamento? (14 ottobre 2026)` (+887 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1233 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **39 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `texts` connect `i18n.ts` to `Glifo – note per Claude`, `Dove sono le cose`, `main.ts`, `compile`, `spec.ts`, `src/relocation.ts`, `graph/preview.ts`, `conics.ts`, `distributions.ts`, `explainPanel.ts`, `svg.ts`, `xlsx.ts`, `sheet.ts`, `feedback.ts`, `formulaReader.ts`, `numerical.ts`, `arithmetic.ts`, `index.ts`, `schema/editor.ts`, `spreadsheetEn.test.ts`, `graph/file.ts`, `several.ts`, `gantt.ts`, `study.ts`, `Rational`, `sidePanel.ts`, `logic.ts`, `schemaTools.test.ts`, `complex.ts`, `sql.ts`, `resize.ts`, `latex.ts`, `localModels.ts`, `schema/model.ts`, `functions.ts`, `MathError`, `board.ts`, `toolbar.ts`, `parse.ts`, `page.ts`, `editor/lists.ts`, `NotesStore`, `finite.ts`, `ui/preview.ts`, `spreadsheet/editor.ts`, `spreadsheet/format.ts`, `odesolve.ts`, `solve.ts`, `editor/editor.ts`, `fields.ts`, `symbolic.ts`, `chart.ts`, `MarkdownEditor`, `topics.ts`, `aiPanel.ts`, `supabase.ts`, `noteWords.ts`, `siteUpdate.ts`, `spellcheck.ts`, `schema/templates.ts`?**
  _High betweenness centrality (0.130) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `Dove sono le cose` to `i18n.ts`, `vitest`, `main.ts`, `compile`, `spec.ts`, `src/relocation.ts`, `primitive.ts`, `Board`, `graph/preview.ts`, `conics.ts`, `explainPanel.ts`, `svg.ts`, `distributions.ts`, `sheet.ts`, `SchemaEditor`, `SheetEditor`, `formulaReader.ts`, `numerical.ts`, `arithmetic.ts`, `xlsx.ts`, `feedback.ts`, `schema/editor.ts`, `spreadsheetEn.test.ts`, `BoardStore`, `noteWordsMath.test.ts`, `strokes.ts`, `Stroke`, `tutorial.mjs`, `graph/file.ts`, `gantt.ts`, `several.ts`, `Rational`, `sidePanel.ts`, `logic.ts`, `tidyLatex`, `complex.ts`, `study.ts`, `schemaTools.test.ts`, `view3d.ts`, `localModels.ts`, `vite.config.ts`, `functions.ts`, `MathError`, `toolbar.ts`, `board/shapes.ts`, `schema/shapes.ts`, `SidePanel`, `parse.ts`, `graph.ts`, `NotesStore`, `finite.ts`, `ui/preview.ts`, `spreadsheet/editor.ts`, `spreadsheet/format.ts`, `odesolve.ts`, `blockMove.ts`, `solve.ts`, `editor/editor.ts`, `fields.ts`, `symbolic.ts`, `chart.ts`, `MarkdownEditor`, `topics.ts`, `Converter`, `aiPanel.ts`, `supabase.ts`, `Pt`, `noteWords.ts`, `siteUpdate.ts`, `smoke-test.mjs`, `editor.test.ts`, `ExplainPanel`, `Sheet`?**
  _High betweenness centrality (0.126) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `i18n.ts`, `Dove sono le cose`, `compile`, `database.ts`, `src/relocation.ts`, `spec.ts`, `distributions.ts`, `svg.ts`, `sheet.ts`, `feedback.ts`, `formulaReader.ts`, `spreadsheetEn.test.ts`, `BoardStore`, `noteWordsMath.test.ts`, `strokes.ts`, `graph/file.ts`, `Stroke`, `gantt.ts`, `sql.ts`, `Rational`, `sidePanel.ts`, `schemaTools.test.ts`, `tidyLatex`, `translations.test.ts`, `resize.ts`, `vite.config.ts`, `localModels.ts`, `schema/model.ts`, `MathError`, `board.ts`, `board/shapes.ts`, `parse.ts`, `graph.ts`, `page.ts`, `editor/lists.ts`, `NotesStore`, `ui/preview.ts`, `spreadsheet/editor.ts`, `blockMove.ts`, `editor/editor.ts`, `symbolic.ts`, `suggestions.ts`, `MarkdownEditor`, `topics.ts`, `supabase.ts`, `noteWords.ts`, `symbolsEn.test.ts`, `siteUpdate.ts`, `spellcheck.ts`, `editor.test.ts`, `Sheet`?**
  _High betweenness centrality (0.083) - this node is a cross-community bridge._
- **Are the 359 inferred relationships involving `Dove sono le cose` (e.g. with `fakeFormulaWorker()` and `fakeLlmWorker()`) actually correct?**
  _`Dove sono le cose` has 359 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Deciso`, `Com'è andata la discussione`, `La proposta dello studente (4 ottobre 2026)` to the rest of the system?**
  _892 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `i18n.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.027749634132612857 - nodes in this community are weakly interconnected._
- **Should `vitest` be split into smaller, more focused modules?**
  _Cohesion score 0.06376811594202898 - nodes in this community are weakly interconnected._