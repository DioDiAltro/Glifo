# Graph Report - matherdown  (2026-10-13)

## Corpus Check
- 346 files · ~720,599 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5549 nodes · 20297 edges · 161 communities (122 shown, 39 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 673 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `dac28e16`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- i18n.ts
- markdown.ts
- main.ts
- math/evaluate.ts
- sync.ts
- spec.ts
- dom.ts
- num
- graph/preview.ts
- Dove sono le cose
- distributions.ts
- localModels.ts
- vitest
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
- store.ts
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
- fields.ts
- translations.test.ts
- resize.ts
- view3d.ts
- domain.ts
- usesDecimalComma
- plan.ts
- functions.ts
- MathError
- spreadsheetEn.test.ts
- Pt
- topics.ts
- board/shapes.ts
- toolbar.ts
- renderTex
- aiPanel.ts
- toLatex
- render/lists.ts
- inference.ts
- 20261004091555_note_condivise.sql
- Field
- database.ts
- finite.ts
- h
- dependencies
- Welcome to Glifo
- spreadsheet/editor.ts
- rich
- odesolve.ts
- sheet.ts
- smoke-test.mjs
- blockMove.ts
- Benvenuto in Glifo
- compilerOptions
- relocation-test.mjs
- La grafica: le otto richieste del 10 ottobre 2026
- schema/templates.ts
- symbolic.ts
- local.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- ui/relocation.ts
- FoldersStore
- session-start.sh
- .claude/CLAUDE.md
- Il database degli account (Supabase)
- tutorial.mjs
- Abbonamenti
- Distribution
- supabase-stub.sql
- account-test.mjs
- schemaBlocks.ts
- SuggestionController
- .visible
- sql.ts
- symbolsEn.test.ts
- siteUpdate.ts
- Parser
- @codemirror/state
- spellcheck.ts
- spaces.ts
- graph.ts
- numerical.test.ts
- Rational
- restore.ts
- calcResults.ts
- explainPanel.ts
- Le spiegazioni, come funzionano
- strokes.ts
- Sheet
- page.ts
- createFakeSupabase
- probability.ts
- Piano per piano
- texts
- Board
- 20261008130026_commenti.sql
- sidePanel.ts
- xlsx.ts
- editor/lists.ts
- feedback.ts
- schemaTools.test.ts
- Glifo
- vite
- Glifo – note per Claude
- planPreview.ts
- Costi
- La lavagna
- mathEn2.test.ts
- devDependencies

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
- `7. Via il registro dei tocchi` --references--> `forgetOldKeys()`  [INFERRED]
  GRAFICA.md → src/store/storage.ts
- `Dove sono le cose` --references--> `WidgetKind`  [INFERRED]
  ARCHITETTURA.md → src/editor/schemaBlocks.ts
- `Dove sono le cose` --references--> `ConicElements`  [INFERRED]
  ARCHITETTURA.md → src/math/conics.ts
- `Funzionalità` --references--> `k()`  [INFERRED]
  README.md → src/math/numerical.ts
- `Come viene pubblicata` --references--> `dist()`  [INFERRED]
  README.md → src/board/shapes.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (161 total, 39 thin omitted)

### Community 0 - "i18n.ts"
Cohesion: 0.04
Nodes (62): 3. Le impostazioni divise in sezioni, browserLang(), browserLanguages(), dateLocale(), detectLang(), Entry, isLang(), lang (+54 more)

### Community 1 - "markdown.ts"
Cohesion: 0.06
Nodes (61): GraphLabelLines, insertGraphBlock(), LABEL_KEYS, setGraphLabels(), monthOf(), MONTHS, MONTHS_EN, parseDate() (+53 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (111): addToGraphBlock(), remapGraphLines(), remapLineKeys(), account, ACCOUNT_OFF, accountButton, accountProblem(), active (+103 more)

### Community 3 - "math/evaluate.ts"
Cohesion: 0.07
Nodes (45): argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot(), fieldOn(), numericPartials() (+37 more)

### Community 4 - "sync.ts"
Cohesion: 0.07
Nodes (30): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+22 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (114): formulaAtCursor(), isConicLine(), quadricEquation(), fourierItems(), isFourierLine(), T, isComplexLine(), isTestLine() (+106 more)

### Community 6 - "dom.ts"
Cohesion: 0.08
Nodes (35): board, openShareDialog(), changeAccess(), changeCopy(), copy(), refreshChanged(), render(), run() (+27 more)

### Community 7 - "num"
Cohesion: 0.11
Nodes (102): atIntegers(), withoutAbs(), exp(), hyperbolicToExp(), inverseRational(), sqrtEx(), termTransform(), polyEx() (+94 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (40): addLabel(), boxes, cameras, complexCoord(), coord(), coordinates(), drawings, drawnViews (+32 more)

### Community 9 - "Dove sono le cose"
Cohesion: 0.05
Nodes (83): Dove sono le cose, Glifo – architettura, allNames(), answerFollowUp(), bareResult(), chatContext, ChatFn, chatSubject() (+75 more)

### Community 10 - "distributions.ts"
Cohesion: 0.16
Nodes (29): choose(), continuousQuantile(), decimals(), discreteQuantile(), factorialBig(), FAMILIES, integerParam(), invalid() (+21 more)

### Community 11 - "localModels.ts"
Cohesion: 0.07
Nodes (42): 4. Più modelli per «Spiegami», chat(), GlifoError, Gpu, load(), post(), remove(), scope (+34 more)

### Community 12 - "vitest"
Cohesion: 0.04
Nodes (92): vitest, contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), staticGraphSvg(), chooseWindow(), chooseY() (+84 more)

### Community 13 - "compile"
Cohesion: 0.10
Nodes (46): surface(), close(), definiteIntegral(), exValue(), samples(), compileOde(), compile(), constant() (+38 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.09
Nodes (12): isLanes(), SchemaEditor, withLaneContents(), cellText(), edgeLook(), nodeLook(), nodeStyle(), readSchema() (+4 more)

### Community 15 - "editor/editor.ts"
Cohesion: 0.06
Nodes (38): description, name, private, scripts, build, dev, preview, test (+30 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (8): functionLabel(), SheetEditor, decimalsOf(), englishTyping(), serializeSheet(), sheetSize(), clearRange(), cloneSheet()

### Community 17 - "src/relocation.ts"
Cohesion: 0.08
Nodes (61): 1. «Cambia account», accountSpace(), currentAccount(), forgetAccount(), knowsAccount(), prefixOf(), prefsKey(), restorePrefs() (+53 more)

### Community 18 - "numerical.ts"
Cohesion: 0.11
Nodes (49): FormatOptions, bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial() (+41 more)

### Community 19 - "linsys.ts"
Cohesion: 0.14
Nodes (40): choices(), exText(), minorsGcd(), ONE, parametricRows(), parametricSystem(), PARAMS, polyDeterminant() (+32 more)

### Community 20 - "index.ts"
Cohesion: 0.06
Nodes (45): b, bigops, c, calculus, fn, fr, fractions, functions (+37 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "schema/editor.ts"
Cohesion: 0.04
Nodes (74): schemaSummary(), svg(), GraphLook, schemaBlockAtLine(), ALIGN, ALIGN_NAMES, ARROW_NAMES, AT_ICONS (+66 more)

### Community 23 - "noteWordsMath.test.ts"
Cohesion: 0.07
Nodes (28): @codemirror/lang-markdown, BLOCKS, FROM_ENGLISH, FUNCTIONS, functionWordPairs(), GRAPH_KEY_FORMS, GRAPH_KEY_LINE, GRAPH_KEYS (+20 more)

### Community 24 - "store.ts"
Cohesion: 0.06
Nodes (19): fake-indexeddb, BoardOptions, BoardBackend, BoardStore, done(), fromRecord(), IdbBoards, MemoryBoards (+11 more)

### Community 25 - "parse.ts"
Cohesion: 0.07
Nodes (43): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe(), differentialInFraction() (+35 more)

### Community 26 - "board.ts"
Cohesion: 0.06
Nodes (43): Action, DOT_SIZES, DrawAction, EraserMode, HANDLE_REACH, ICON, MODE_NAMES, penErases() (+35 more)

### Community 27 - "ui/preview.ts"
Cohesion: 0.07
Nodes (31): GraphLabels, renameGraphScope(), renameScopeKeys(), BlockKind, MoveDir, draw(), drawCached(), drawn (+23 more)

### Community 28 - "NotesStore"
Cohesion: 0.07
Nodes (26): adoptGuestNotes(), guestNoteCount(), isWelcome(), Deletion, DeletionLog, FOLDER_NAME_MAX, RemoteFolder, isUuid() (+18 more)

### Community 29 - "arithmetic.ts"
Cohesion: 0.07
Nodes (71): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+63 more)

### Community 30 - "gantt.ts"
Cohesion: 0.06
Nodes (73): amount(), barColor(), crossings(), dateText(), dayMonth(), dayOf(), fitText(), GanttOptions (+65 more)

### Community 31 - "study.ts"
Cohesion: 0.14
Nodes (38): limit(), Asymptote, asymptoteText(), boundaries(), compiled(), cutsOf(), defined(), domainOf() (+30 more)

### Community 32 - "solve.ts"
Cohesion: 0.08
Nodes (49): FieldContext, exponentialForm(), fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd() (+41 more)

### Community 33 - "assistant.ts"
Cohesion: 0.13
Nodes (25): AiAnswer, AiError, AiSettings, answerSchema(), askAi(), askCompatible(), askThroughHost(), capitalized() (+17 more)

### Community 34 - "logic.ts"
Cohesion: 0.13
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "several.ts"
Cohesion: 0.08
Nodes (58): criticalLine(), named(), severalItems(), T, Definite, Piece, LimitValue, severalLimit (+50 more)

### Community 36 - "complex.ts"
Cohesion: 0.06
Nodes (63): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexValue(), isInequality() (+55 more)

### Community 37 - "fields.ts"
Cohesion: 0.13
Nodes (33): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+25 more)

### Community 38 - "translations.test.ts"
Cohesion: 0.17
Nodes (18): AstNode, calleeName(), check(), checkPair(), visit(), children(), entryPairs(), files (+10 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (24): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+16 more)

### Community 40 - "view3d.ts"
Cohesion: 0.06
Nodes (86): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+78 more)

### Community 41 - "domain.ts"
Cohesion: 0.11
Nodes (32): axesIn(), bestAlong(), boundingBox(), combine(), compileDomain(), compileMultiple(), conditionsOf(), constantOf() (+24 more)

### Community 42 - "usesDecimalComma"
Cohesion: 0.05
Nodes (74): numberText(), FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsForFile(), graphsFromFile() (+66 more)

### Community 43 - "plan.ts"
Cohesion: 0.09
Nodes (32): chartFrom(), chartLines(), chartRange(), ChartTable, currentRegion(), isNumber(), Results, T (+24 more)

### Community 44 - "functions.ts"
Cohesion: 0.08
Nodes (63): EMPTY, number(), T, addFormat(), divFormat(), GENERAL, most(), mulFormat() (+55 more)

### Community 45 - "MathError"
Cohesion: 0.09
Nodes (68): MathError, angleBetween(), asMatrix(), basisOf(), circleText(), complexText(), cross(), Ctx (+60 more)

### Community 46 - "spreadsheetEn.test.ts"
Cohesion: 0.09
Nodes (56): valueText(), sheetSummary(), openSheetEditor(), hide(), OPEN, sheetsForFile(), sheetsFromFile(), T (+48 more)

### Community 47 - "Pt"
Cohesion: 0.13
Nodes (13): coalesced(), EraseAction, Finger, LassoAction, MoveAction, PanAction, PinchAction, pointsOf() (+5 more)

### Community 48 - "topics.ts"
Cohesion: 0.12
Nodes (24): ATTRIBUTES, cut(), ER_SHAPES, fieldText(), fitLines(), flowOrder(), formulaText(), FREE_NAMES (+16 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (35): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+27 more)

### Community 50 - "toolbar.ts"
Cohesion: 0.09
Nodes (20): EditorCallbacks, MarkdownEditor, searchPhrases(), insertBlock(), insertTemplate(), wrapSelection(), ListStyleId, Action (+12 more)

### Community 51 - "renderTex"
Cohesion: 0.18
Nodes (8): localizeTex(), cleanKatexError(), renderTex(), cardPreview(), displayCode(), formPreview(), preventFocusSteal(), SidePanel

### Community 52 - "aiPanel.ts"
Cohesion: 0.09
Nodes (25): ExplainTone, definedName(), formulaTopic(), graphTopic(), studyOf(), NoteSubject, SubjectKind, Settings (+17 more)

### Community 53 - "toLatex"
Cohesion: 0.07
Nodes (60): conicItems(), T, at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo (+52 more)

### Community 54 - "render/lists.ts"
Cohesion: 0.27
Nodes (13): ListStyle, bulletGroup(), Marker, sameList(), alignInside(), asciiTrim(), findMarker(), Found (+5 more)

### Community 55 - "inference.ts"
Cohesion: 0.14
Nodes (27): between(), chiSquareTest(), confidence(), confidenceShown(), decimals(), Given, hypothesisTest(), InferenceContext (+19 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "Field"
Cohesion: 0.12
Nodes (7): characteristicPolynomial(), eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn()

### Community 58 - "database.ts"
Cohesion: 0.21
Nodes (7): @electric-sql/pglite, createDatabase(), createUser(), databaseTests(), feedbackTests(), migrations, shareTests()

### Community 59 - "finite.ts"
Cohesion: 0.17
Nodes (27): countOf(), Elem, elemTex(), elemText(), EMPTY, expandDots(), FiniteError, FiniteResult (+19 more)

### Community 60 - "h"
Cohesion: 0.08
Nodes (31): viewSwitch, guestAccountSection(), h(), icon(), copyLink(), FaqGroup, faqGroups(), FaqQuestion (+23 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "Welcome to Glifo"
Cohesion: 0.20
Nodes (9): A few examples, Calculations and graphs, For programming too, Handy shortcuts, How to write formulas, Lists, Spell check, Try it now (+1 more)

### Community 63 - "spreadsheet/editor.ts"
Cohesion: 0.09
Nodes (47): openSheet(), Editing, MenuEntry, Move, PATHS, SheetEditorOptions, Snapshot, T (+39 more)

### Community 64 - "rich"
Cohesion: 0.12
Nodes (20): SyncStatus, rich(), AccountButton, accountSection(), AccountSectionDeps, confirmAccountDeletion(), messageOf(), openLoginDialog() (+12 more)

### Community 65 - "odesolve.ts"
Cohesion: 0.08
Nodes (74): primed(), withPrimes(), addWave(), arrange(), cauchy(), characteristicRoots(), compiled(), constantNames() (+66 more)

### Community 66 - "sheet.ts"
Cohesion: 0.08
Nodes (55): ExactComplexScope, expSumValue(), Lin, NUMERICAL, bracketParts(), BRACKETS, CHECK_VALUES, checks (+47 more)

### Community 67 - "smoke-test.mjs"
Cohesion: 0.15
Nodes (6): markdown-it, playwright-core, PNG_ICONS, fakeLlmWorker(), firstVisit(), plainContext

### Community 68 - "blockMove.ts"
Cohesion: 0.08
Nodes (48): blockMoved, blockMoves(), blockMoveTransaction(), LineMap, WidgetBlock, placeChart(), saveSheetBlock(), blockKind (+40 more)

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
Cohesion: 0.29
Nodes (7): 5. A cosa serve la chiave dell'AI, 6. Glifo anche in inglese, 7. Via il registro dei tocchi, 8. Il pulsante ✨ con il contorno, Gli abbonamenti, in tutto questo, In che ordine, La grafica: le otto richieste del 10 ottobre 2026

### Community 73 - "schema/templates.ts"
Cohesion: 0.23
Nodes (17): SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), conceptMap(), cycle(), edge(), er() (+9 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (61): fnLabel(), linearIn(), letters(), linearCells(), atValues(), Converter, coordinates(), decimalText() (+53 more)

### Community 75 - "local.ts"
Cohesion: 0.11
Nodes (14): glifoError(), LocalAbort, localErrorMessage(), localLlm, Pending, T, WorkerLike, ChatOptions (+6 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Errore o imprevisto → nel dettaglio, 3. Serve una decisione → frasi complete, 4. Fine del compito → un solo riepilogo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "ui/relocation.ts"
Cohesion: 0.13
Nodes (21): sidebarToggle(), relocationMessage(), RelocationResult, BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark() (+13 more)

### Community 79 - "FoldersStore"
Cohesion: 0.08
Nodes (13): cleanFolderName(), Folder, FolderGroup, FoldersStore, groupByFolder(), loadClosedFolders(), sameName(), saveClosedFolders() (+5 more)

### Community 82 - "Il database degli account (Supabase)"
Cohesion: 0.20
Nodes (9): Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Note condivise con un link, Sincronizzazione, `sync_pull({ since })`: scarica le novità (+1 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.11
Nodes (11): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+3 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.11
Nodes (19): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Deciso (5 ottobre 2026), Fonti (controllate il 4 ottobre 2026) (+11 more)

### Community 91 - "Distribution"
Cohesion: 0.19
Nodes (9): addExp(), Distribution, exactIntervalProbability(), integerRange(), intervalProbability(), subtractExp(), pValue(), TestResult (+1 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.11
Nodes (10): device(), login(), newContext, waitFor(), b64(), CAPTCHA_TOKEN, CODE, GOOGLE_CODE (+2 more)

### Community 97 - "schemaBlocks.ts"
Cohesion: 0.11
Nodes (19): @codemirror/view, InsertOptions, toggleLinePrefix(), addPlaceholders, Placeholder, besideSchema(), BlockWidget, findWidgetBlocks() (+11 more)

### Community 100 - ".visible"
Cohesion: 0.14
Nodes (14): Promemoria per lo studente, 2. La pagina dei commenti, tipo FAQ, Account: i propri appunti su ogni dispositivo, anche da condividere, Commenti di chi prova Glifo, Idee per il futuro, In programma, La grafica: account, impostazioni, commenti, AI e lingua (chiesto il 10 ottobre 2026, se ne parla), La lavagna: idee in più (+6 more)

### Community 101 - "sql.ts"
Cohesion: 0.17
Nodes (18): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+10 more)

### Community 102 - "symbolsEn.test.ts"
Cohesion: 0.12
Nodes (38): editDistance(), normalizeText(), singular(), stem(), STOPWORDS, words(), BOTH, buildIndex() (+30 more)

### Community 103 - "siteUpdate.ts"
Cohesion: 0.18
Nodes (16): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, loadPart() (+8 more)

### Community 105 - "@codemirror/state"
Cohesion: 0.07
Nodes (30): @codemirror/state, closeMathBlockOnEnter(), tabOutOfMath(), templateInsertion(), CODE_NODES, CommandToken, commandTokenAt(), isInCode() (+22 more)

### Community 107 - "spellcheck.ts"
Cohesion: 0.06
Nodes (38): lineDepth(), mathDelimTag, mathMarkdown, mathTag, parseBlockMath(), misspelledMark, refreshSpelling, setTarget (+30 more)

### Community 108 - "spaces.ts"
Cohesion: 0.11
Nodes (30): decimalSeparator(), Digits, formatRational(), fromNumber(), fromRational(), SUPERSCRIPT, writeDigits(), surdText() (+22 more)

### Community 113 - "graph.ts"
Cohesion: 0.05
Nodes (44): @maxgraph/core, AT_X, cellHtml(), COMPASS, createEdgeCell(), createGraph(), drawSchema(), edgeStyle() (+36 more)

### Community 116 - "numerical.test.ts"
Cohesion: 0.60
Nodes (3): result(), text(), verdict()

### Community 118 - "Rational"
Cohesion: 0.09
Nodes (29): Part, expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactFunction, ExactRandom (+21 more)

### Community 119 - "restore.ts"
Cohesion: 0.22
Nodes (10): BackupNote, backupNotes(), restoreBackup(), RestoreBoards, Restored, restoredMessage(), T, time() (+2 more)

### Community 120 - "calcResults.ts"
Cohesion: 0.07
Nodes (31): @lezer/common, explainTarget, schemaTitle(), acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult (+23 more)

### Community 121 - "explainPanel.ts"
Cohesion: 0.08
Nodes (29): Explanation, FollowUp, REPLY_TOKENS, localModel, explanationMarkdown(), insertAfterBlock(), insertAfterText(), insertExplanation() (+21 more)

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "strokes.ts"
Cohesion: 0.08
Nodes (39): centerOn(), copyStrokes(), cross(), handleScale(), IDENTITY, insideLasso(), keepInside(), LASSO_SHARE (+31 more)

### Community 124 - "Sheet"
Cohesion: 0.07
Nodes (30): Definition, Line, withWorkLimit(), FormattedResult, Mat, MathNode, chainOf(), close() (+22 more)

### Community 125 - "page.ts"
Cohesion: 0.04
Nodes (70): @supabase/supabase-js, captchaToken(), loadTurnstile(), Turnstile, TURNSTILE_SCRIPT, Window, AUTH_STORAGE_KEY, SUPABASE_KEY (+62 more)

### Community 128 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 129 - "probability.ts"
Cohesion: 0.12
Nodes (25): End, Family, CompileOptions, ExactScope, rejection(), ALL, complement(), endAt() (+17 more)

### Community 132 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 133 - "texts"
Cohesion: 0.10
Nodes (21): pick(), texts, currentCall(), BinOp, COMPARE, ERRORS_BY_LENGTH, FormulaError, formulaRefs() (+13 more)

### Community 136 - "Board"
Cohesion: 0.08
Nodes (4): Board, clampZoom(), loadPrefs(), validView()

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 139 - "sidePanel.ts"
Cohesion: 0.11
Nodes (23): katex, AiResult, expand(), preferredIndex(), SuggestionItem, cache, T, TexRender (+15 more)

### Community 141 - "xlsx.ts"
Cohesion: 0.09
Nodes (45): RFC-4180, fflate, tablesNote(), csvCell(), csvDelimiter(), csvNumbers(), csvToSheet(), digitsOf() (+37 more)

### Community 142 - "editor/lists.ts"
Cohesion: 0.10
Nodes (56): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+48 more)

### Community 143 - "feedback.ts"
Cohesion: 0.06
Nodes (49): @mlc-ai/web-llm, vite-plugin-pwa, feedbackButton, openFeedback(), accountOffMessage(), Site, T, commentDate() (+41 more)

### Community 144 - "schemaTools.test.ts"
Cohesion: 0.11
Nodes (23): laneOf(), alignBoxes(), Alignment, Box, distributeBoxes(), Position, fieldInput(), textWidth() (+15 more)

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
Nodes (27): planName(), T, cache, capability(), ClaudeRuntime, hostDownloads, HostError, inClaudeViewer() (+19 more)

### Community 161 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 163 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 166 - "mathEn2.test.ts"
Cohesion: 0.28
Nodes (7): EMPTY_COMPLEX_SCOPE, Interval, args(), q(), result(), tex(), text()

### Community 170 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

## Knowledge Gaps
- **870 isolated node(s):** `6. Glifo anche in inglese`, `8. Il pulsante ✨ con il contorno`, `Gli abbonamenti, in tutto questo`, `In che ordine`, `Entry` (+865 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1189 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **39 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `i18n.ts`, `markdown.ts`, `main.ts`, `math/evaluate.ts`, `spec.ts`, `texts`, `num`, `Board`, `graph/preview.ts`, `dom.ts`, `localModels.ts`, `vitest`, `xlsx.ts`, `compile`, `SchemaEditor`, `schemaTools.test.ts`, `src/relocation.ts`, `numerical.ts`, `linsys.ts`, `feedback.ts`, `SheetEditor`, `store.ts`, `parse.ts`, `board.ts`, `ui/preview.ts`, `NotesStore`, `planPreview.ts`, `gantt.ts`, `arithmetic.ts`, `solve.ts`, `assistant.ts`, `logic.ts`, `several.ts`, `complex.ts`, `fields.ts`, `study.ts`, `view3d.ts`, `usesDecimalComma`, `plan.ts`, `functions.ts`, `MathError`, `spreadsheetEn.test.ts`, `Pt`, `topics.ts`, `board/shapes.ts`, `toolbar.ts`, `renderTex`, `aiPanel.ts`, `toLatex`, `inference.ts`, `finite.ts`, `h`, `sidePanel.ts`, `spreadsheet/editor.ts`, `rich`, `odesolve.ts`, `sheet.ts`, `smoke-test.mjs`, `blockMove.ts`, `symbolic.ts`, `local.ts`, `ui/relocation.ts`, `tutorial.mjs`, `schemaBlocks.ts`, `siteUpdate.ts`, `spaces.ts`, `graph.ts`, `Rational`, `calcResults.ts`, `explainPanel.ts`, `strokes.ts`, `Sheet`, `page.ts`?**
  _High betweenness centrality (0.116) - this node is a cross-community bridge._
- **Why does `texts` connect `texts` to `i18n.ts`, `markdown.ts`, `main.ts`, `math/evaluate.ts`, `probability.ts`, `spec.ts`, `dom.ts`, `graph/preview.ts`, `Dove sono le cose`, `distributions.ts`, `localModels.ts`, `vitest`, `compile`, `editor/lists.ts`, `editor/editor.ts`, `sidePanel.ts`, `src/relocation.ts`, `numerical.ts`, `linsys.ts`, `schemaTools.test.ts`, `feedback.ts`, `schema/editor.ts`, `index.ts`, `parse.ts`, `board.ts`, `ui/preview.ts`, `NotesStore`, `planPreview.ts`, `gantt.ts`, `arithmetic.ts`, `solve.ts`, `assistant.ts`, `logic.ts`, `several.ts`, `complex.ts`, `fields.ts`, `study.ts`, `resize.ts`, `domain.ts`, `usesDecimalComma`, `plan.ts`, `functions.ts`, `MathError`, `spreadsheetEn.test.ts`, `topics.ts`, `toolbar.ts`, `aiPanel.ts`, `toLatex`, `inference.ts`, `finite.ts`, `h`, `spreadsheet/editor.ts`, `rich`, `odesolve.ts`, `sheet.ts`, `xlsx.ts`, `schema/templates.ts`, `symbolic.ts`, `local.ts`, `ui/relocation.ts`, `schemaBlocks.ts`, `sql.ts`, `siteUpdate.ts`, `spellcheck.ts`, `spaces.ts`, `restore.ts`, `calcResults.ts`, `explainPanel.ts`, `page.ts`?**
  _High betweenness centrality (0.108) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `i18n.ts`, `markdown.ts`, `num`, `Dove sono le cose`, `distributions.ts`, `localModels.ts`, `sidePanel.ts`, `compile`, `editor/lists.ts`, `editor/editor.ts`, `feedback.ts`, `src/relocation.ts`, `schemaTools.test.ts`, `xlsx.ts`, `schema/editor.ts`, `noteWordsMath.test.ts`, `store.ts`, `parse.ts`, `board.ts`, `ui/preview.ts`, `NotesStore`, `gantt.ts`, `assistant.ts`, `mathEn2.test.ts`, `resize.ts`, `view3d.ts`, `domain.ts`, `usesDecimalComma`, `plan.ts`, `translations.test.ts`, `MathError`, `spreadsheetEn.test.ts`, `board/shapes.ts`, `aiPanel.ts`, `database.ts`, `h`, `spreadsheet/editor.ts`, `blockMove.ts`, `local.ts`, `ui/relocation.ts`, `FoldersStore`, `schemaBlocks.ts`, `sql.ts`, `symbolsEn.test.ts`, `siteUpdate.ts`, `@codemirror/state`, `spellcheck.ts`, `numerical.test.ts`, `Rational`, `restore.ts`, `strokes.ts`, `Sheet`, `page.ts`?**
  _High betweenness centrality (0.086) - this node is a cross-community bridge._
- **Are the 307 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `tutorialModel()`) actually correct?**
  _`Dove sono le cose` has 307 INFERRED edges - model-reasoned connections that need verification._
- **What connects `6. Glifo anche in inglese`, `8. Il pulsante ✨ con il contorno`, `Gli abbonamenti, in tutto questo` to the rest of the system?**
  _870 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `i18n.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04451754385964912 - nodes in this community are weakly interconnected._
- **Should `markdown.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06335403726708075 - nodes in this community are weakly interconnected._