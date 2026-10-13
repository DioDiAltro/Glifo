# Graph Report - matherdown  (2026-10-13)

## Corpus Check
- 346 files · ~720,453 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5549 nodes · 20304 edges · 164 communities (123 shown, 41 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 681 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `13c0c337`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- i18n.ts
- markdown.ts
- main.ts
- math/evaluate.ts
- sync.ts
- spec.ts
- h
- num
- graph/preview.ts
- Dove sono le cose
- mathEn2.test.ts
- localModels.ts
- svg.ts
- compile
- SchemaEditor
- editor/editor.ts
- SheetEditor
- src/relocation.ts
- numerical.ts
- linsys.ts
- index.ts
- engine.ts
- schema/editor.ts
- noteWordsMath.test.ts
- MemoryBoards
- parse.ts
- board.ts
- ui/preview.ts
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
- BoardStore
- graph/file.ts
- plan.ts
- functions.ts
- MathError
- spreadsheetEn.test.ts
- Pt
- topics.ts
- board/shapes.ts
- toolbar.ts
- sidePanel.ts
- explainPanel.ts
- toLatex
- markers.ts
- account.ts
- 20261004091555_note_condivise.sql
- ui/relocation.ts
- database.ts
- finite.ts
- tutorial.ts
- dependencies
- Welcome to Glifo
- spreadsheet/editor.ts
- Preview
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
- katex.ts
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
- spreadsheetNote.test.ts
- .visible
- schemaEn.test.ts
- symbolsEn.test.ts
- siteUpdate.ts
- AiPanel
- suggestions.ts
- schema/preview.ts
- spellcheck.ts
- sheet.ts
- graph.ts
- vitest
- supabase.ts
- Rational
- restore.ts
- calcResults.ts
- escapeHtml
- Le spiegazioni, come funzionano
- strokes.ts
- Sheet
- page.ts
- createFakeSupabase
- PreviewCallbacks
- Piano per piano
- texts
- Board
- 20261008130026_commenti.sql
- MLCEngine
- MarkdownEditor
- xlsx.ts
- editor/lists.ts
- feedback.ts
- Glifo
- vite
- Glifo – note per Claude
- planPreview.ts
- Costi
- @codemirror/state
- La lavagna
- devDependencies
- scripts

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 316 edges
2. `MathError` - 151 edges
3. `Sheet` - 147 edges
4. `num()` - 145 edges
5. `h()` - 136 edges
6. `MathNode` - 131 edges
7. `texts` - 125 edges
8. `mul()` - 124 edges
9. `Board` - 117 edges
10. `compile()` - 116 edges

## Surprising Connections (you probably didn't know these)
- `Dove sono le cose` --references--> `ConicElements`  [INFERRED]
  ARCHITETTURA.md → src/math/conics.ts
- `Dove sono le cose` --references--> `WidgetKind`  [INFERRED]
  ARCHITETTURA.md → src/editor/schemaBlocks.ts
- `4. Più modelli per «Spiegami»` --references--> `webllmId()`  [INFERRED]
  GRAFICA.md → src/ai/localModels.ts
- `Attenzione a` --references--> `renderMarkdown()`  [INFERRED]
  CLAUDE.md → src/render/markdown.ts
- `7. Via il registro dei tocchi` --references--> `forgetOldKeys()`  [INFERRED]
  GRAFICA.md → src/store/storage.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (164 total, 41 thin omitted)

### Community 0 - "i18n.ts"
Cohesion: 0.04
Nodes (68): 3. Le impostazioni divise in sezioni, ExplainTone, DEFAULT_LOCAL_MODEL, downloadSize(), gpuF16(), modelsInBrowser(), modelVariant, browserLang() (+60 more)

### Community 1 - "markdown.ts"
Cohesion: 0.05
Nodes (71): GraphLabelLines, insertGraphBlock(), LABEL_KEYS, setGraphLabels(), monthOf(), MONTHS, MONTHS_EN, parseDate() (+63 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (109): addToGraphBlock(), remapGraphLines(), remapLineKeys(), account, ACCOUNT_OFF, active, aiShown(), aiToggle (+101 more)

### Community 3 - "math/evaluate.ts"
Cohesion: 0.04
Nodes (83): LayeredSolid, argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot(), fieldOn() (+75 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (32): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+24 more)

### Community 5 - "spec.ts"
Cohesion: 0.04
Nodes (137): numberText(), formulaAtCursor(), isConicLine(), quadricEquation(), valueLabel(), fourierItems(), isFourierLine(), T (+129 more)

### Community 6 - "h"
Cohesion: 0.08
Nodes (29): viewSwitch, fieldInput(), nodeLook(), same(), guestAccountSection(), append(), Child, h() (+21 more)

### Community 7 - "num"
Cohesion: 0.11
Nodes (102): atIntegers(), withoutAbs(), exp(), hyperbolicToExp(), inverseRational(), sqrtEx(), termTransform(), polyEx() (+94 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (44): addLabel(), boxes, cameras, complexCoord(), containing(), coord(), coordinates(), drawings (+36 more)

### Community 9 - "Dove sono le cose"
Cohesion: 0.06
Nodes (77): Dove sono le cose, Glifo – architettura, allNames(), answerFollowUp(), bareResult(), chatContext, ChatFn, chatSubject() (+69 more)

### Community 10 - "mathEn2.test.ts"
Cohesion: 0.06
Nodes (71): EMPTY_COMPLEX_SCOPE, addExp(), choose(), continuousQuantile(), decimals(), discreteQuantile(), Distribution, exactIntervalProbability() (+63 more)

### Community 11 - "localModels.ts"
Cohesion: 0.05
Nodes (50): chat(), GlifoError, Gpu, load(), post(), remove(), scope, shaderF16() (+42 more)

### Community 12 - "svg.ts"
Cohesion: 0.08
Nodes (59): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseWindow(), chooseY(), clipLines(), dataWindow() (+51 more)

### Community 13 - "compile"
Cohesion: 0.10
Nodes (46): surface(), close(), definiteIntegral(), exValue(), samples(), compileOde(), compile(), constant() (+38 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.10
Nodes (6): isLanes(), SchemaEditor, withLaneContents(), NodeLook, serializeSchema(), tableMetrics()

### Community 15 - "editor/editor.ts"
Cohesion: 0.05
Nodes (60): description, name, private, type, version, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands (+52 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (8): functionLabel(), SheetEditor, decimalsOf(), englishTyping(), serializeSheet(), sheetSize(), clearRange(), cloneSheet()

### Community 17 - "src/relocation.ts"
Cohesion: 0.09
Nodes (56): 1. «Cambia account», accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount() (+48 more)

### Community 18 - "numerical.ts"
Cohesion: 0.11
Nodes (49): FormatOptions, bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial() (+41 more)

### Community 19 - "linsys.ts"
Cohesion: 0.14
Nodes (40): choices(), exText(), minorsGcd(), ONE, parametricRows(), parametricSystem(), PARAMS, polyDeterminant() (+32 more)

### Community 20 - "index.ts"
Cohesion: 0.06
Nodes (44): b, bigops, c, calculus, fn, fr, fractions, functions (+36 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "schema/editor.ts"
Cohesion: 0.05
Nodes (71): laneOf(), GraphLook, alignBoxes(), Alignment, Box, distributeBoxes(), Position, schemaBlockAtLine() (+63 more)

### Community 23 - "noteWordsMath.test.ts"
Cohesion: 0.12
Nodes (15): AstNode, childrenOf(), DATA, ENGLISH, englishTexts(), FUNCTIONS, isNode(), ITALIAN (+7 more)

### Community 24 - "MemoryBoards"
Cohesion: 0.06
Nodes (16): fake-indexeddb, BoardBackend, done(), fromRecord(), IdbBoards, MemoryBoards, ofNote(), openBoardDatabase() (+8 more)

### Community 25 - "parse.ts"
Cohesion: 0.07
Nodes (43): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe(), differentialInFraction() (+35 more)

### Community 26 - "board.ts"
Cohesion: 0.07
Nodes (42): Action, BoardOptions, DOT_SIZES, EraserMode, HANDLE_REACH, ICON, MODE_NAMES, PanAction (+34 more)

### Community 27 - "ui/preview.ts"
Cohesion: 0.19
Nodes (14): BlockKind, MoveDir, hydrateSheets(), T, BLOCK_NAMES, blockHiddenMessage(), blockMovedMessage(), BlockNames (+6 more)

### Community 28 - "NotesStore"
Cohesion: 0.08
Nodes (21): Deletion, DeletionLog, isUuid(), newId(), createdAtFromId(), deriveTitle(), NotesStore, RemoteNote (+13 more)

### Community 29 - "arithmetic.ts"
Cohesion: 0.07
Nodes (71): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+63 more)

### Community 30 - "gantt.ts"
Cohesion: 0.06
Nodes (76): amount(), barColor(), crossings(), dateText(), dayMonth(), dayOf(), fitText(), GanttOptions (+68 more)

### Community 31 - "study.ts"
Cohesion: 0.14
Nodes (38): limit(), Asymptote, asymptoteText(), boundaries(), compiled(), cutsOf(), defined(), domainOf() (+30 more)

### Community 32 - "solve.ts"
Cohesion: 0.06
Nodes (49): exponentialForm(), fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), alternating() (+41 more)

### Community 33 - "assistant.ts"
Cohesion: 0.09
Nodes (32): AiAnswer, AiError, AiSettings, answerSchema(), askAi(), askCompatible(), askThroughHost(), capitalized() (+24 more)

### Community 34 - "logic.ts"
Cohesion: 0.11
Nodes (30): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+22 more)

### Community 35 - "several.ts"
Cohesion: 0.08
Nodes (58): criticalLine(), named(), severalItems(), T, Definite, Piece, LimitValue, severalLimit (+50 more)

### Community 36 - "complex.ts"
Cohesion: 0.06
Nodes (65): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexValue(), isInequality() (+57 more)

### Community 37 - "namesIn"
Cohesion: 0.20
Nodes (26): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+18 more)

### Community 38 - "translations.test.ts"
Cohesion: 0.17
Nodes (18): AstNode, calleeName(), check(), checkPair(), visit(), children(), entryPairs(), files (+10 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (24): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+16 more)

### Community 40 - "view3d.ts"
Cohesion: 0.06
Nodes (90): staticGraphSvg(), addMesh(), addTet(), affinePlane(), Axis, Box, centroid(), chooseBox() (+82 more)

### Community 42 - "graph/file.ts"
Cohesion: 0.09
Nodes (41): FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsForFile(), graphsFromFile(), hide() (+33 more)

### Community 43 - "plan.ts"
Cohesion: 0.09
Nodes (32): chartFrom(), chartLines(), chartRange(), ChartTable, currentRegion(), isNumber(), Results, T (+24 more)

### Community 44 - "functions.ts"
Cohesion: 0.08
Nodes (63): EMPTY, number(), T, addFormat(), divFormat(), GENERAL, most(), mulFormat() (+55 more)

### Community 45 - "MathError"
Cohesion: 0.09
Nodes (69): MathError, UndefinedName, angleBetween(), asMatrix(), basisOf(), circleText(), complexText(), cross() (+61 more)

### Community 46 - "spreadsheetEn.test.ts"
Cohesion: 0.09
Nodes (56): valueText(), sheetSummary(), openSheetEditor(), hide(), OPEN, sheetsForFile(), sheetsFromFile(), T (+48 more)

### Community 47 - "Pt"
Cohesion: 0.10
Nodes (14): clampZoom(), coalesced(), EraseAction, Finger, LassoAction, MoveAction, pointsOf(), pressureOf() (+6 more)

### Community 48 - "topics.ts"
Cohesion: 0.12
Nodes (24): ATTRIBUTES, cut(), ER_SHAPES, fieldText(), fitLines(), flowOrder(), formulaText(), FREE_NAMES (+16 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (37): DrawAction, adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners() (+29 more)

### Community 50 - "toolbar.ts"
Cohesion: 0.17
Nodes (16): insertBlock(), wrapSelection(), ListStyleId, Action, createToolbar(), insertCode(), insertLink(), listStyle() (+8 more)

### Community 51 - "sidePanel.ts"
Cohesion: 0.14
Nodes (15): AiResult, localizeTex(), cleanKatexError(), renderTex(), symbolsInCategory(), SymbolForm, AiState, cardPreview() (+7 more)

### Community 52 - "explainPanel.ts"
Cohesion: 0.08
Nodes (34): Explanation, FollowUp, REPLY_TOKENS, modelName(), modelOf(), definedName(), formulaTopic(), graphTopic() (+26 more)

### Community 53 - "toLatex"
Cohesion: 0.07
Nodes (60): conicItems(), T, at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo (+52 more)

### Community 54 - "markers.ts"
Cohesion: 0.11
Nodes (37): Item, ListStyle, bullet(), bulletGroup(), childMarker(), column(), firstMarker(), label() (+29 more)

### Community 55 - "account.ts"
Cohesion: 0.12
Nodes (19): SyncStatus, AccountButton, accountSection(), AccountSectionDeps, confirmAccountDeletion(), messageOf(), openLoginDialog(), codeStep() (+11 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "ui/relocation.ts"
Cohesion: 0.14
Nodes (20): moveDayLabel(), relocationMessage(), RelocationResult, BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark() (+12 more)

### Community 58 - "database.ts"
Cohesion: 0.21
Nodes (7): @electric-sql/pglite, createDatabase(), createUser(), databaseTests(), feedbackTests(), migrations, shareTests()

### Community 59 - "finite.ts"
Cohesion: 0.17
Nodes (27): countOf(), Elem, elemTex(), elemText(), EMPTY, expandDots(), FiniteError, FiniteResult (+19 more)

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
Cohesion: 0.09
Nodes (47): openSheet(), Editing, MenuEntry, Move, PATHS, SheetEditorOptions, Snapshot, T (+39 more)

### Community 64 - "Preview"
Cohesion: 0.21
Nodes (3): blockKindOf(), hidden(), Preview

### Community 65 - "odesolve.ts"
Cohesion: 0.08
Nodes (74): primed(), withPrimes(), addWave(), arrange(), cauchy(), characteristicRoots(), compiled(), constantNames() (+66 more)

### Community 66 - "statsShown.ts"
Cohesion: 0.14
Nodes (36): expSumValue(), Lin, check(), correlation(), count(), covariance(), Data, dataStatistic() (+28 more)

### Community 67 - "smoke-test.mjs"
Cohesion: 0.15
Nodes (6): markdown-it, playwright-core, PNG_ICONS, fakeLlmWorker(), firstVisit(), plainContext

### Community 68 - "blockMove.ts"
Cohesion: 0.15
Nodes (20): blank(), BlockMove, blockPlace(), closed(), closeIdx(), fenceClosed(), findBlock(), invisible() (+12 more)

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
Nodes (61): fnLabel(), linearIn(), letters(), linearCells(), atValues(), Converter, coordinates(), decimalText() (+53 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Errore o imprevisto → nel dettaglio, 3. Serve una decisione → frasi complete, 4. Fine del compito → un solo riepilogo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "katex.ts"
Cohesion: 0.40
Nodes (4): katex, cache, T, TexRender

### Community 79 - "FoldersStore"
Cohesion: 0.08
Nodes (19): cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder(), loadClosedFolders(), RemoteFolder (+11 more)

### Community 82 - "Il database degli account (Supabase)"
Cohesion: 0.20
Nodes (9): Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Note condivise con un link, Sincronizzazione, `sync_pull({ since })`: scarica le novità (+1 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.11
Nodes (11): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+3 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.11
Nodes (19): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Deciso (5 ottobre 2026), Fonti (controllate il 4 ottobre 2026) (+11 more)

### Community 91 - "explainSubjects.ts"
Cohesion: 0.15
Nodes (24): explainTarget, formulasUntil(), sheetBefore(), explanationMarkdown(), hasCalculation(), insertAfterBlock(), insertAfterText(), insertExplanation() (+16 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.11
Nodes (10): device(), login(), newContext, waitFor(), b64(), CAPTCHA_TOKEN, CODE, GOOGLE_CODE (+2 more)

### Community 97 - "schemaBlocks.ts"
Cohesion: 0.10
Nodes (18): toggleLinePrefix(), BlockWidget, findWidgetBlocks(), guardBlocks(), KINDS, schemaBlocks(), T, WidgetBlock (+10 more)

### Community 98 - "spreadsheetNote.test.ts"
Cohesion: 0.28
Nodes (11): blockMoveTransaction(), contentHash(), fenceName(), parseBlocks(), findSheetBlock(), apply(), blocks(), move() (+3 more)

### Community 100 - ".visible"
Cohesion: 0.14
Nodes (14): Promemoria per lo studente, 2. La pagina dei commenti, tipo FAQ, Account: i propri appunti su ogni dispositivo, anche da condividere, Commenti di chi prova Glifo, Idee per il futuro, In programma, La grafica: account, impostazioni, commenti, AI e lingua (chiesto il 10 ottobre 2026, se ne parla), La lavagna: idee in più (+6 more)

### Community 101 - "schemaEn.test.ts"
Cohesion: 0.07
Nodes (42): schemaSummary(), svg(), openSchemaEditor(), base64(), hide(), OPEN, schemasForFile(), schemasFromFile() (+34 more)

### Community 102 - "symbolsEn.test.ts"
Cohesion: 0.10
Nodes (41): SuggestionItem, editDistance(), normalizeText(), singular(), stem(), STOPWORDS, words(), BOTH (+33 more)

### Community 103 - "siteUpdate.ts"
Cohesion: 0.18
Nodes (16): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, loadPart() (+8 more)

### Community 104 - "AiPanel"
Cohesion: 0.29
Nodes (5): NoteSubject, AiPanel, graphLabel(), kindName(), texInline()

### Community 105 - "suggestions.ts"
Cohesion: 0.16
Nodes (12): EditorMathContext, expand(), preferredIndex(), SuggestionController, commandNames(), cardPreviewTex(), formPreviewTex(), ParsedTemplate (+4 more)

### Community 106 - "schema/preview.ts"
Cohesion: 0.23
Nodes (11): renameGraphScope(), renameScopeKeys(), draw(), drawCached(), drawn, errorHtml(), fill(), hydrateSchemas() (+3 more)

### Community 107 - "spellcheck.ts"
Cohesion: 0.08
Nodes (24): @codemirror/lang-markdown, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt() (+16 more)

### Community 108 - "sheet.ts"
Cohesion: 0.05
Nodes (62): FieldContext, DDOT, DOT, OdeFunction, odeSolution(), OdeSystem, step(), T (+54 more)

### Community 113 - "graph.ts"
Cohesion: 0.05
Nodes (42): @maxgraph/core, AT_X, cellHtml(), cellText(), COMPASS, createEdgeCell(), createGraph(), drawSchema() (+34 more)

### Community 116 - "vitest"
Cohesion: 0.06
Nodes (30): vitest, GraphItem, parseGraph(), parseMath(), light, item(), light, light (+22 more)

### Community 117 - "supabase.ts"
Cohesion: 0.06
Nodes (51): @supabase/supabase-js, captchaToken(), loadTurnstile(), Turnstile, TURNSTILE_SCRIPT, Window, TURNSTILE_SITE_KEY, accountError (+43 more)

### Community 118 - "Rational"
Cohesion: 0.06
Nodes (51): Part, End, expSum, Family, CompileOptions, bigGcd(), binomExact(), conditionExact() (+43 more)

### Community 119 - "restore.ts"
Cohesion: 0.22
Nodes (10): BackupNote, backupNotes(), restoreBackup(), RestoreBoards, Restored, restoredMessage(), T, time() (+2 more)

### Community 120 - "calcResults.ts"
Cohesion: 0.11
Nodes (13): @lezer/common, acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult, calcResults(), CheckWidget (+5 more)

### Community 121 - "escapeHtml"
Cohesion: 0.12
Nodes (13): MathRegion, checkHtml(), checkTitle(), T, escapeHtml(), ExplainChat, ExplainPanel, preventFocusSteal() (+5 more)

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "strokes.ts"
Cohesion: 0.09
Nodes (37): centerOn(), copyStrokes(), cross(), IDENTITY, insideLasso(), keepInside(), LASSO_SHARE, lassoed() (+29 more)

### Community 124 - "Sheet"
Cohesion: 0.07
Nodes (33): Definition, Line, ExactComplexScope, Ode, withWorkLimit(), FiniteContext, FormattedResult, MathNode (+25 more)

### Community 125 - "page.ts"
Cohesion: 0.06
Nodes (56): accountDataFile(), PullResult, board, openShareDialog(), changeAccess(), changeCopy(), copy(), refreshChanged() (+48 more)

### Community 128 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 132 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 133 - "texts"
Cohesion: 0.10
Nodes (21): pick(), texts, currentCall(), BinOp, COMPARE, ERRORS_BY_LENGTH, FormulaError, formulaRefs() (+13 more)

### Community 136 - "Board"
Cohesion: 0.11
Nodes (5): Board, Step, BoardTheme, BoardData, Stroke

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 140 - "MarkdownEditor"
Cohesion: 0.18
Nodes (4): EditorCallbacks, MarkdownEditor, searchPhrases(), insertTemplate()

### Community 141 - "xlsx.ts"
Cohesion: 0.09
Nodes (45): RFC-4180, fflate, tablesNote(), csvCell(), csvDelimiter(), csvNumbers(), csvToSheet(), digitsOf() (+37 more)

### Community 142 - "editor/lists.ts"
Cohesion: 0.16
Nodes (33): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+25 more)

### Community 143 - "feedback.ts"
Cohesion: 0.06
Nodes (53): @mlc-ai/web-llm, vite-plugin-pwa, AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, feedbackButton, openFeedback(), NEW_ORIGIN (+45 more)

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
Cohesion: 0.12
Nodes (26): planName(), T, inClaudeViewer(), loadDialect(), crc32(), svgSize(), svgToPng(), T (+18 more)

### Community 161 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 162 - "@codemirror/state"
Cohesion: 0.09
Nodes (24): @codemirror/state, @codemirror/view, InsertOptions, templateInsertion(), addPlaceholders, buildDecorations(), clearAllPlaceholders(), clearPlaceholders (+16 more)

### Community 163 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 170 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

### Community 171 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

## Knowledge Gaps
- **870 isolated node(s):** `T`, `Entry`, `License`, `GraphLabelLines`, `PlanKind` (+865 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1190 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **41 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `texts` connect `texts` to `i18n.ts`, `markdown.ts`, `main.ts`, `math/evaluate.ts`, `spec.ts`, `h`, `graph/preview.ts`, `Dove sono le cose`, `mathEn2.test.ts`, `localModels.ts`, `svg.ts`, `compile`, `editor/lists.ts`, `editor/editor.ts`, `feedback.ts`, `src/relocation.ts`, `numerical.ts`, `linsys.ts`, `xlsx.ts`, `NotesStore`, `schema/editor.ts`, `index.ts`, `parse.ts`, `board.ts`, `ui/preview.ts`, `Glifo – note per Claude`, `planPreview.ts`, `gantt.ts`, `arithmetic.ts`, `solve.ts`, `assistant.ts`, `logic.ts`, `several.ts`, `complex.ts`, `namesIn`, `study.ts`, `resize.ts`, `graph/file.ts`, `plan.ts`, `functions.ts`, `MathError`, `spreadsheetEn.test.ts`, `topics.ts`, `toolbar.ts`, `sidePanel.ts`, `explainPanel.ts`, `toLatex`, `account.ts`, `ui/relocation.ts`, `finite.ts`, `tutorial.ts`, `spreadsheet/editor.ts`, `odesolve.ts`, `statsShown.ts`, `schema/templates.ts`, `symbolic.ts`, `katex.ts`, `FoldersStore`, `schemaBlocks.ts`, `schemaEn.test.ts`, `siteUpdate.ts`, `schema/preview.ts`, `spellcheck.ts`, `sheet.ts`, `supabase.ts`, `Rational`, `restore.ts`, `calcResults.ts`, `escapeHtml`, `page.ts`?**
  _High betweenness centrality (0.137) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `Dove sono le cose` to `i18n.ts`, `markdown.ts`, `main.ts`, `math/evaluate.ts`, `spec.ts`, `h`, `num`, `graph/preview.ts`, `mathEn2.test.ts`, `localModels.ts`, `svg.ts`, `compile`, `SchemaEditor`, `editor/editor.ts`, `SheetEditor`, `src/relocation.ts`, `numerical.ts`, `linsys.ts`, `schema/editor.ts`, `parse.ts`, `board.ts`, `ui/preview.ts`, `NotesStore`, `arithmetic.ts`, `gantt.ts`, `study.ts`, `solve.ts`, `assistant.ts`, `logic.ts`, `several.ts`, `complex.ts`, `namesIn`, `view3d.ts`, `BoardStore`, `graph/file.ts`, `plan.ts`, `functions.ts`, `MathError`, `spreadsheetEn.test.ts`, `Pt`, `topics.ts`, `board/shapes.ts`, `toolbar.ts`, `sidePanel.ts`, `explainPanel.ts`, `toLatex`, `account.ts`, `ui/relocation.ts`, `finite.ts`, `tutorial.ts`, `spreadsheet/editor.ts`, `Preview`, `odesolve.ts`, `statsShown.ts`, `smoke-test.mjs`, `blockMove.ts`, `symbolic.ts`, `tutorial.mjs`, `explainSubjects.ts`, `schemaBlocks.ts`, `spreadsheetNote.test.ts`, `siteUpdate.ts`, `AiPanel`, `schema/preview.ts`, `sheet.ts`, `graph.ts`, `vitest`, `supabase.ts`, `escapeHtml`, `strokes.ts`, `Sheet`, `page.ts`, `PreviewCallbacks`, `texts`, `Board`, `MarkdownEditor`, `xlsx.ts`, `feedback.ts`, `planPreview.ts`?**
  _High betweenness centrality (0.120) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `i18n.ts`, `markdown.ts`, `main.ts`, `math/evaluate.ts`, `h`, `num`, `Dove sono le cose`, `mathEn2.test.ts`, `localModels.ts`, `svg.ts`, `compile`, `editor/lists.ts`, `editor/editor.ts`, `feedback.ts`, `src/relocation.ts`, `xlsx.ts`, `schema/editor.ts`, `noteWordsMath.test.ts`, `MemoryBoards`, `parse.ts`, `board.ts`, `NotesStore`, `gantt.ts`, `assistant.ts`, `@codemirror/state`, `translations.test.ts`, `resize.ts`, `view3d.ts`, `graph/file.ts`, `plan.ts`, `MathError`, `spreadsheetEn.test.ts`, `board/shapes.ts`, `explainPanel.ts`, `markers.ts`, `ui/relocation.ts`, `database.ts`, `tutorial.ts`, `spreadsheet/editor.ts`, `FoldersStore`, `schemaBlocks.ts`, `spreadsheetNote.test.ts`, `schemaEn.test.ts`, `symbolsEn.test.ts`, `siteUpdate.ts`, `suggestions.ts`, `schema/preview.ts`, `spellcheck.ts`, `supabase.ts`, `Rational`, `restore.ts`, `strokes.ts`, `Sheet`, `page.ts`?**
  _High betweenness centrality (0.072) - this node is a cross-community bridge._
- **Are the 315 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `tutorialModel()`) actually correct?**
  _`Dove sono le cose` has 315 INFERRED edges - model-reasoned connections that need verification._
- **What connects `T`, `Entry`, `License` to the rest of the system?**
  _870 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `i18n.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.042071197411003236 - nodes in this community are weakly interconnected._
- **Should `markdown.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05154320987654321 - nodes in this community are weakly interconnected._