# Graph Report - matherdown  (2026-10-08)

## Corpus Check
- 299 files · ~583,410 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 4902 nodes · 17792 edges · 140 communities (113 shown, 27 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 555 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `eb483719`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- touchlog.ts
- Parser
- main.ts
- compile
- sync.ts
- spec.ts
- arithmetic.ts
- num
- graph/preview.ts
- Dove sono le cose
- spaces.ts
- editor/lists.ts
- svg.ts
- settings.ts
- SchemaEditor
- Rational
- SheetEditor
- parse.ts
- numerical.ts
- explainPanel.ts
- index.ts
- engine.ts
- Stroke
- topics.ts
- store.ts
- MathError
- sidePanel.ts
- .renderFormat
- laplace.ts
- several.ts
- gantt.ts
- graph/space.ts
- search.ts
- editor/editor.ts
- logic.ts
- NotesStore
- complex.ts
- fields.ts
- view3d.ts
- resize.ts
- statsShown.ts
- Board
- solve.ts
- study.ts
- functions.ts
- finite.ts
- xlsx.test.ts
- vitest
- distributions.ts
- board/shapes.ts
- schemaBlocks.ts
- SidePanel
- SuggestionController
- supabase.ts
- parseSchema
- toolbar.ts
- 20261004091555_note_condivise.sql
- selection.ts
- tutorial.ts
- odesolve.ts
- graph.ts
- dependencies
- devDependencies
- .openMenu
- ui/preview.ts
- conics.ts
- logo.ts
- statsGraph.ts
- smoke-test.mjs
- Benvenuto in Glifo
- compilerOptions
- board.ts
- toLatex
- folders.ts
- symbolic.ts
- sheet.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- plan.ts
- session-start.sh
- .claude/CLAUDE.md
- blockMove.ts
- tutorial.mjs
- Abbonamenti
- spiegami-qwen.mjs
- supabase-stub.sql
- account-test.mjs
- Il database degli account (Supabase)
- Pt
- Parser
- spell.test.ts
- Glifo
- FoldersStore
- files.ts
- placeholders.ts
- fake-supabase.mjs
- localModels.ts
- xlsx.ts
- page.ts
- markdown.ts
- spreadsheet/editor.ts
- Piano per piano
- Costi
- Idee per il futuro
- Glifo – note per Claude
- Field
- Le spiegazioni, come funzionano
- sync.test.ts
- La lavagna
- sql.ts
- I modelli e le chiavi API
- deploy.test.ts
- calcPlugin
- grafo-html.mjs
- h
- formatLinear
- AccountSync
- severalGraph.ts
- ExplainPanel

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 262 edges
2. `MathError` - 151 edges
3. `num()` - 145 edges
4. `Sheet` - 139 edges
5. `MathNode` - 129 edges
6. `mul()` - 124 edges
7. `Board` - 118 edges
8. `compile()` - 113 edges
9. `Rational` - 111 edges
10. `h()` - 107 edges

## Surprising Connections (you probably didn't know these)
- `Dove sono le cose` --references--> `fakeLlmWorker()`  [INFERRED]
  ARCHITETTURA.md → scripts/smoke-test.mjs
- `Dove sono le cose` --references--> `WidgetKind`  [INFERRED]
  ARCHITETTURA.md → src/editor/schemaBlocks.ts
- `Dove sono le cose` --references--> `texts()`  [INFERRED]
  ARCHITETTURA.md → tests/boardTouchLog.test.ts
- `Come viene pubblicata` --references--> `dist()`  [INFERRED]
  README.md → src/board/shapes.ts
- `Dove sono le cose` --references--> `adoptGuestNotes()`  [INFERRED]
  ARCHITETTURA.md → src/account/space.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (140 total, 27 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.09
Nodes (27): at(), browserStore, clip(), isSaved(), KINDS, LOG_KEY, LOG_MAX_LINES, LogStore (+19 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (109): unshareNote(), addToGraphBlock(), insertGraphBlock(), setGraphLabels(), graphsForFile(), graphsFromFile(), hide(), unhide() (+101 more)

### Community 3 - "compile"
Cohesion: 0.05
Nodes (94): integralRegion, LayeredSolid, argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot() (+86 more)

### Community 4 - "sync.ts"
Cohesion: 0.08
Nodes (28): withLock(), Account, EMPTY_STATE, FolderChange, FolderRow, isEmpty(), iso(), merge() (+20 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (113): conicItems(), isConicLine(), quadricEquation(), fourierItems(), isFourierLine(), hasExponential(), isComplexLine(), isComplexValue() (+105 more)

### Community 6 - "arithmetic.ts"
Cohesion: 0.10
Nodes (46): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+38 more)

### Community 7 - "num"
Cohesion: 0.13
Nodes (91): atIntegers(), withoutAbs(), exp(), hyperbolicToExp(), inverseRational(), sqrtEx(), termTransform(), polyEx() (+83 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (39): FIGURE_PALETTE, boxes, cameras, complexCoord(), containing(), coord(), drawings, drawnViews (+31 more)

### Community 9 - "Dove sono le cose"
Cohesion: 0.05
Nodes (92): Dove sono le cose, Glifo – architettura, allNames(), answerFollowUp(), CHAT_SUBJECT, chatContext, ChatFn, chatSystemPrompt() (+84 more)

### Community 10 - "spaces.ts"
Cohesion: 0.11
Nodes (33): decimalSeparator(), Digits, formatRational(), fromNumber(), fromRational(), SUPERSCRIPT, writeDigits(), Eigenvalue (+25 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.08
Nodes (66): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+58 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (54): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), dataWindow(), domainEdge() (+46 more)

### Community 13 - "settings.ts"
Cohesion: 0.12
Nodes (16): DEFAULT_LOCAL_MODEL, ACCOUNT_SETTINGS, accountSettings(), AI_MODELS, DEFAULT_SETTINGS, loadSettings(), saveSettings(), SETTINGS_KEY (+8 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.10
Nodes (4): SchemaEditor, withLaneContents(), createEdgeCell(), serializeSchema()

### Community 15 - "Rational"
Cohesion: 0.09
Nodes (27): Part, expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactRandom, exactRoot() (+19 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (10): rangeLabel(), SheetEditor, generalNumber(), sameFormat(), serializeSheet(), sheetSize(), CellRange, clearRange() (+2 more)

### Community 17 - "parse.ts"
Cohesion: 0.05
Nodes (56): hasWord(), typedSliderValue(), errorMessage(), EXACT, FLOAT, ACCENTS, AND_WORDS, BARE_WORDS (+48 more)

### Community 18 - "numerical.ts"
Cohesion: 0.11
Nodes (47): Funzionalità, bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial() (+39 more)

### Community 19 - "explainPanel.ts"
Cohesion: 0.06
Nodes (43): ExplainTone, Explanation, REPLY_TOKENS, MarkdownEditor, NoteSubject, SubjectKind, labelHtml(), texHtml() (+35 more)

### Community 20 - "index.ts"
Cohesion: 0.06
Nodes (44): SuggestionItem, b, bigops, c, calculus, fn, fr, fractions (+36 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (24): @farscrl/hunspell-wasm, editDistance(), Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable (+16 more)

### Community 22 - "Stroke"
Cohesion: 0.19
Nodes (6): pointsOf(), strokeSummary(), shapeSvg(), Box, newStrokeId(), Stroke

### Community 23 - "topics.ts"
Cohesion: 0.13
Nodes (29): ATTRIBUTES, count(), cut(), definedName(), ER_SHAPES, fieldText(), fitLines(), flowOrder() (+21 more)

### Community 24 - "store.ts"
Cohesion: 0.05
Nodes (22): fake-indexeddb, BoardOptions, BoardBackend, BoardChange, BoardData, BoardStore, done(), fromRecord() (+14 more)

### Community 25 - "MathError"
Cohesion: 0.15
Nodes (47): MathError, angleBetween(), asMatrix(), basisOf(), complexText(), cross(), Ctx, dataOf() (+39 more)

### Community 26 - "sidePanel.ts"
Cohesion: 0.08
Nodes (31): AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible(), askThroughHost() (+23 more)

### Community 27 - ".renderFormat"
Cohesion: 0.16
Nodes (14): fieldInput(), isLanes(), cellText(), edgeLook(), edgeStyle(), edgeTextAt(), insertSchema(), nodeLook() (+6 more)

### Community 28 - "laplace.ts"
Cohesion: 0.09
Nodes (62): factoredPolynomial(), oneFraction(), beyondPoles(), compiled(), E, fractionShown(), HALF, inverseLaplaceShown() (+54 more)

### Community 29 - "several.ts"
Cohesion: 0.06
Nodes (85): close(), Definite, definiteIntegral(), exValue(), samples(), EMPTY_SCOPE, FormatOptions, absOf() (+77 more)

### Community 30 - "gantt.ts"
Cohesion: 0.06
Nodes (71): amount(), barColor(), crossings(), dateText(), dayOf(), fitText(), GanttOptions, ganttSvg() (+63 more)

### Community 31 - "graph/space.ts"
Cohesion: 0.12
Nodes (50): addMesh(), addTet(), affinePlane(), Axis, centroid(), chooseBox(), clipBy(), clipPolygon() (+42 more)

### Community 32 - "search.ts"
Cohesion: 0.16
Nodes (24): normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex(), IndexedEntry (+16 more)

### Community 33 - "editor/editor.ts"
Cohesion: 0.05
Nodes (65): description, name, private, type, version, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands (+57 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "NotesStore"
Cohesion: 0.08
Nodes (22): Deletion, DeletionLog, isUuid(), newId(), createdAtFromId(), deriveTitle(), Note, noteIdsInBrowser() (+14 more)

### Community 36 - "complex.ts"
Cohesion: 0.06
Nodes (66): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, inZ(), isInequality(), onlyComplex(), realEverywhere() (+58 more)

### Community 37 - "fields.ts"
Cohesion: 0.12
Nodes (36): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+28 more)

### Community 38 - "view3d.ts"
Cohesion: 0.08
Nodes (40): tickLabel(), addLabel(), Box, Detail, Face, FAST, FINE, planeTolerance() (+32 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "statsShown.ts"
Cohesion: 0.17
Nodes (32): check(), correlation(), count(), covariance(), Data, dataStatistic(), deviation(), fail() (+24 more)

### Community 41 - "Board"
Cohesion: 0.10
Nodes (4): Board, clampZoom(), penErases(), validView()

### Community 42 - "solve.ts"
Cohesion: 0.10
Nodes (43): exponentialForm(), fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), formatNumber() (+35 more)

### Community 43 - "study.ts"
Cohesion: 0.21
Nodes (25): limit(), Asymptote, boundaries(), compiled(), cutsOf(), defined(), domainOf(), exact() (+17 more)

### Community 44 - "functions.ts"
Cohesion: 0.08
Nodes (71): EMPTY, number(), addFormat(), decimalsOf(), divFormat(), fixedNumber(), GENERAL, group() (+63 more)

### Community 45 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 46 - "xlsx.test.ts"
Cohesion: 0.16
Nodes (18): RFC-4180, fflate, valueText(), openSheet(), saveSheetBlock(), tablesNote(), csvDelimiter(), csvToSheet() (+10 more)

### Community 47 - "vitest"
Cohesion: 0.04
Nodes (70): vitest, figureName(), graphFigure(), graphImage(), OPEN, swatchSvg(), titleBand(), ACCENTS (+62 more)

### Community 48 - "distributions.ts"
Cohesion: 0.07
Nodes (61): addExp(), choose(), continuousQuantile(), discreteQuantile(), exactIntervalProbability(), expSumValue(), factorialBig(), FAMILIES (+53 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (36): DrawAction, adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners() (+28 more)

### Community 50 - "schemaBlocks.ts"
Cohesion: 0.10
Nodes (22): InsertOptions, toggleLinePrefix(), besideSchema(), BlockWidget, findWidgetBlocks(), guardBlocks(), KINDS, schemaBlockRanges() (+14 more)

### Community 51 - "SidePanel"
Cohesion: 0.19
Nodes (4): clear(), displayCode(), preventFocusSteal(), SidePanel

### Community 52 - "SuggestionController"
Cohesion: 0.13
Nodes (11): expand(), preferredIndex(), SuggestionController, CATEGORIES, cardPreviewTex(), formPreviewTex(), ParsedTemplate, parseTemplate() (+3 more)

### Community 53 - "supabase.ts"
Cohesion: 0.08
Nodes (43): @supabase/supabase-js, AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), accountError, appUrl(), call() (+35 more)

### Community 54 - "parseSchema"
Cohesion: 0.08
Nodes (32): schemaSummary(), svg(), GraphLook, base64(), hide(), OPEN, schemasForFile(), schemasFromFile() (+24 more)

### Community 55 - "toolbar.ts"
Cohesion: 0.10
Nodes (19): closeMathBlockOnEnter(), EditorCallbacks, tabOutOfMath(), insertBlock(), insertTemplate(), wrapSelection(), Action, createToolbar() (+11 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "selection.ts"
Cohesion: 0.10
Nodes (38): centerOn(), copyStrokes(), cross(), IDENTITY, insideLasso(), keepInside(), LASSO_SHARE, lassoed() (+30 more)

### Community 58 - "tutorial.ts"
Cohesion: 0.15
Nodes (14): helpButton, openGuide(), HINT_MS, markSeen(), openTutorial(), show(), richText(), showTutorialHint() (+6 more)

### Community 59 - "odesolve.ts"
Cohesion: 0.08
Nodes (76): addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames(), constantParticular() (+68 more)

### Community 60 - "graph.ts"
Cohesion: 0.05
Nodes (42): @maxgraph/core, AT_X, cellHtml(), COMPASS, createGraph(), drawSchema(), isEdgeLook(), isNodeLook() (+34 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "devDependencies"
Cohesion: 0.10
Nodes (18): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+10 more)

### Community 64 - "ui/preview.ts"
Cohesion: 0.10
Nodes (17): GraphLabels, renameGraphScope(), renameScopeKeys(), BlockKind, MoveDir, fill(), hydrateSchemas(), hydrateSheets() (+9 more)

### Community 65 - "conics.ts"
Cohesion: 0.20
Nodes (27): at(), centralCanonical(), Coefficients, coneCanonical(), conicOf(), det2(), det3(), determinant() (+19 more)

### Community 66 - "logo.ts"
Cohesion: 0.21
Nodes (6): playwright-core, PNG_ICONS, BOX, glyph(), LOGO_COLOR, logoIcon()

### Community 67 - "statsGraph.ts"
Cohesion: 0.15
Nodes (19): isTestLine(), number(), testItems(), classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX (+11 more)

### Community 68 - "smoke-test.mjs"
Cohesion: 0.29
Nodes (4): markdown-it, fakeLlmWorker(), firstVisit(), plainContext

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "board.ts"
Cohesion: 0.07
Nodes (38): Action, ACTION_NAMES, DOT_SIZES, EraserMode, HANDLE_REACH, ICON, MODE_NAMES, PanAction (+30 more)

### Community 72 - "toLatex"
Cohesion: 0.10
Nodes (38): valueLabel(), areaFor(), multipleLabel(), names(), studyItems(), ACCENT_COMMANDS, COMPLEX_FUNCTIONS, diffLatex() (+30 more)

### Community 73 - "folders.ts"
Cohesion: 0.16
Nodes (11): Folder, FOLDER_NAME_MAX, FolderGroup, groupByFolder(), loadClosedFolders(), RemoteFolder, saveClosedFolders(), NoteMeta (+3 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (62): linearIn(), primitive(), verified(), linearCells(), atValues(), Converter, coordinates(), decimalText() (+54 more)

### Community 75 - "sheet.ts"
Cohesion: 0.06
Nodes (47): ExactComplexScope, ConicInfo, Ode, withWorkLimit(), ExactFunction, ExactScope, FiniteContext, FormattedResult (+39 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.04
Nodes (67): alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ARROW_NAMES, AT_ICONS (+59 more)

### Community 79 - "plan.ts"
Cohesion: 0.08
Nodes (43): at(), breakEven(), dataLine(), dataRange(), Point, quantity(), tableItems(), textLabel() (+35 more)

### Community 82 - "blockMove.ts"
Cohesion: 0.10
Nodes (35): blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove, blockPlace(), closed() (+27 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.20
Nodes (6): centerOf(), clickOn(), ffmpeg, SCENES, SIZE, work

### Community 90 - "Abbonamenti"
Cohesion: 0.14
Nodes (14): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+6 more)

### Community 91 - "spiegami-qwen.mjs"
Cohesion: 0.29
Nodes (4): vite, minutes, postMessage(), started

### Community 96 - "account-test.mjs"
Cohesion: 0.20
Nodes (4): device(), login(), newContext, waitFor()

### Community 97 - "Il database degli account (Supabase)"
Cohesion: 0.18
Nodes (10): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Nell'app, Note condivise con un link (+2 more)

### Community 98 - "Pt"
Cohesion: 0.15
Nodes (10): coalesced(), EraseAction, Finger, LassoAction, MoveAction, pressureOf(), handleScale(), Transform (+2 more)

### Community 101 - "spell.test.ts"
Cohesion: 0.09
Nodes (22): misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt(), openAt() (+14 more)

### Community 102 - "Glifo"
Cohesion: 0.15
Nodes (13): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Glifo (+5 more)

### Community 103 - "FoldersStore"
Cohesion: 0.16
Nodes (4): cleanFolderName(), FoldersStore, sameName(), names()

### Community 104 - "files.ts"
Cohesion: 0.24
Nodes (13): inClaudeViewer(), canWriteFilesDirectly(), FsWindow, isAbort(), MD_TYPES, OPEN_TYPES, OpenedFile, openMarkdownFiles() (+5 more)

### Community 105 - "placeholders.ts"
Cohesion: 0.10
Nodes (13): addPlaceholders, buildDecorations(), clearAllPlaceholders(), clearPlaceholders, contains(), currentIndex(), filledMark, getPlaceholders() (+5 more)

### Community 106 - "fake-supabase.mjs"
Cohesion: 0.22
Nodes (11): b64(), CODE, createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom() (+3 more)

### Community 107 - "localModels.ts"
Cohesion: 0.10
Nodes (28): @mlc-ai/web-llm, chat(), GlifoError, Gpu, load(), post(), remove(), scope (+20 more)

### Community 108 - "xlsx.ts"
Cohesion: 0.07
Nodes (62): formulaText(), tableTopic(), evaluateSheet(), SheetEvaluator, hide(), OPEN, sheetsForFile(), sheetsFromFile() (+54 more)

### Community 110 - "page.ts"
Cohesion: 0.10
Nodes (33): katex, accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount() (+25 more)

### Community 113 - "markdown.ts"
Cohesion: 0.10
Nodes (31): dompurify, highlight.js, markdown-it-footnote, renderTexOrError(), renderTexWithResult(), configurePurify(), createMarkdownIt(), FORBIDDEN_TAGS (+23 more)

### Community 116 - "spreadsheet/editor.ts"
Cohesion: 0.09
Nodes (41): sheetSummary(), currentCall(), Editing, MenuEntry, Move, openSheetEditor(), PATHS, SheetEditorOptions (+33 more)

### Community 117 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 118 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, Quando lo studente dice di cominciare

### Community 119 - "Idee per il futuro"
Cohesion: 0.33
Nodes (6): Account: i propri appunti su ogni dispositivo, anche da condividere, Idee per il futuro, In programma, La lavagna: idee in più, Più avanti, Schemi: idee in più

### Community 120 - "Glifo – note per Claude"
Cohesion: 0.22
Nodes (9): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole (+1 more)

### Community 121 - "Field"
Cohesion: 0.11
Nodes (5): eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat()

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "sync.test.ts"
Cohesion: 0.19
Nodes (9): @electric-sql/pglite, LocalChange, callAs(), createDatabase(), createUser(), databaseTests(), migrations, shareTests() (+1 more)

### Community 124 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 125 - "sql.ts"
Cohesion: 0.17
Nodes (18): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+10 more)

### Community 126 - "I modelli e le chiavi API"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), In prova sul ramo `prova` (7 ottobre 2026): Qwen3 nel browser per «Spiegami», Le idee dello studente (5 ottobre 2026)

### Community 127 - "deploy.test.ts"
Cohesion: 0.28
Nodes (4): vite-plugin-pwa, accountOffMessage(), Site, defineFor()

### Community 128 - "calcPlugin"
Cohesion: 0.16
Nodes (4): calcPlugin, CheckWidget, ResultWidget, valueNode()

### Community 129 - "grafo-html.mjs"
Cohesion: 0.22
Nodes (4): graphFile, names, namesFile, root

### Community 131 - "h"
Cohesion: 0.07
Nodes (52): SyncStatus, board, viewSwitch, openShareDialog(), changeAccess(), changeCopy(), copy(), refreshChanged() (+44 more)

### Community 132 - "formatLinear"
Cohesion: 0.42
Nodes (9): circleText(), entry(), formatLinear(), lineText(), matrixTex(), plainArea(), planeText(), terms() (+1 more)

### Community 136 - "severalGraph.ts"
Cohesion: 0.54
Nodes (7): criticalLine(), isSeveralLine(), named(), severalItems(), surface(), optimumOf(), severalOf()

### Community 141 - "ExplainPanel"
Cohesion: 0.17
Nodes (3): ExplainChat, ExplainPanel, preventFocusSteal()

## Knowledge Gaps
- **658 isolated node(s):** `Comandi`, `Promemoria per lo studente`, `Regole`, `Condividere una nota con un link`, `Provarlo sul tuo computer` (+653 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 916 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **27 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `touchlog.ts`, `Parser`, `main.ts`, `compile`, `h`, `spec.ts`, `arithmetic.ts`, `num`, `graph/preview.ts`, `svg.ts`, `settings.ts`, `SchemaEditor`, `Rational`, `SheetEditor`, `parse.ts`, `numerical.ts`, `explainPanel.ts`, `ExplainPanel`, `Stroke`, `topics.ts`, `store.ts`, `MathError`, `sidePanel.ts`, `.renderFormat`, `laplace.ts`, `several.ts`, `gantt.ts`, `graph/space.ts`, `logic.ts`, `NotesStore`, `complex.ts`, `fields.ts`, `view3d.ts`, `statsShown.ts`, `Board`, `solve.ts`, `functions.ts`, `finite.ts`, `xlsx.test.ts`, `vitest`, `distributions.ts`, `board/shapes.ts`, `schemaBlocks.ts`, `SidePanel`, `supabase.ts`, `parseSchema`, `toolbar.ts`, `selection.ts`, `tutorial.ts`, `odesolve.ts`, `graph.ts`, `ui/preview.ts`, `smoke-test.mjs`, `toLatex`, `symbolic.ts`, `sheet.ts`, `schema/editor.ts`, `plan.ts`, `blockMove.ts`, `Pt`, `files.ts`, `localModels.ts`, `xlsx.ts`, `page.ts`, `markdown.ts`, `spreadsheet/editor.ts`, `deploy.test.ts`?**
  _High betweenness centrality (0.156) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `touchlog.ts`, `main.ts`, `num`, `Dove sono le cose`, `editor/lists.ts`, `settings.ts`, `parse.ts`, `explainPanel.ts`, `store.ts`, `sidePanel.ts`, `laplace.ts`, `gantt.ts`, `graph/space.ts`, `search.ts`, `editor/editor.ts`, `NotesStore`, `resize.ts`, `xlsx.test.ts`, `distributions.ts`, `board/shapes.ts`, `schemaBlocks.ts`, `SuggestionController`, `supabase.ts`, `parseSchema`, `selection.ts`, `tutorial.ts`, `ui/preview.ts`, `logo.ts`, `board.ts`, `folders.ts`, `sheet.ts`, `schema/editor.ts`, `plan.ts`, `blockMove.ts`, `spell.test.ts`, `localModels.ts`, `xlsx.ts`, `page.ts`, `markdown.ts`, `spreadsheet/editor.ts`, `sync.test.ts`, `sql.ts`, `deploy.test.ts`?**
  _High betweenness centrality (0.104) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `main.ts`, `graph/preview.ts`, `ExplainPanel`, `SchemaEditor`, `SheetEditor`, `explainPanel.ts`, `sidePanel.ts`, `.renderFormat`, `gantt.ts`, `resize.ts`, `Board`, `SidePanel`, `toolbar.ts`, `tutorial.ts`, `.openMenu`, `ui/preview.ts`, `board.ts`, `folders.ts`, `schema/editor.ts`, `spell.test.ts`, `page.ts`, `spreadsheet/editor.ts`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **Are the 261 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `adoptGuestNotes()`) actually correct?**
  _`Dove sono le cose` has 261 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Comandi`, `Promemoria per lo studente`, `Regole` to the rest of the system?**
  _658 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `touchlog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08653061224489796 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0390510462481674 - nodes in this community are weakly interconnected._