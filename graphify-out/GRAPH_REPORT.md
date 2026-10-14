# Graph Report - Glifo  (2026-10-14)

## Corpus Check
- 346 files · ~725,149 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5564 nodes · 20329 edges · 168 communities (128 shown, 40 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 672 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `1dc6faaa`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- i18n.ts
- NotesStore
- main.ts
- compile
- sync.ts
- spec.ts
- parse.ts
- num
- graph/preview.ts
- blockMove.ts
- distributions.ts
- scopeWith
- svg.ts
- sheet.ts
- SchemaEditor
- spreadsheetEn.test.ts
- SheetEditor
- markdown.ts
- numerical.ts
- arithmetic.ts
- index.ts
- engine.ts
- schema/editor.ts
- noteWordsMath.test.ts
- store.ts
- Parser
- ink.ts
- supabase.ts
- smoke-test.mjs
- several.ts
- gantt.ts
- study.ts
- .constructor
- assistant.ts
- logic.ts
- h
- complex.ts
- namesIn
- translations.test.ts
- resize.ts
- view3d.ts
- Pt
- localModels.ts
- sql.ts
- functions.ts
- MathError
- spreadsheet/format.ts
- linsys.ts
- template.ts
- board/shapes.ts
- FoldersStore
- sidePanel.ts
- spaces.ts
- usesDecimalComma
- noteWordsGraph.test.ts
- openShareDialog
- 20261004091555_note_condivise.sql
- limits.ts
- database.ts
- finite.ts
- editor/editor.ts
- dependencies
- Welcome to Glifo
- spreadsheet/editor.ts
- .folderItem
- odesolve.ts
- restore.ts
- Schema
- ui/preview.ts
- Benvenuto in Glifo
- compilerOptions
- relocation-test.mjs
- toLatex
- symbolic.ts
- insert.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- placeholders.ts
- explainPanel.ts
- session-start.sh
- .claude/CLAUDE.md
- Il database degli account (Supabase)
- tutorial.mjs
- Abbonamenti
- topics.ts
- BoardStore
- supabase-stub.sql
- account-test.mjs
- files.ts
- Le spiegazioni, come funzionano
- probability.ts
- createFakeSupabase
- symbolsEn.test.ts
- siteUpdate.ts
- graph/file.ts
- calcPlugin
- Costi
- spellcheck.ts
- editor/lists.ts
- graph.ts
- .int
- schema/templates.ts
- Rational
- src/relocation.ts
- Glifo
- captcha.ts
- calcResults.ts
- board.ts
- Sheet
- vite
- schema/file.ts
- Dove sono le cose
- La lavagna
- Parser
- Board
- 20261008130026_commenti.sql
- BoardOptions
- .constructor
- xlsx.ts
- devDependencies
- vitest
- suggestions.ts
- scripts
- L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota
- Glifo – note per Claude
- spreadsheet/file.ts
- numerical.test.ts
- .reply
- severalGraph.ts
- In programma
- parseGraph
- Piano per piano
- suggest.ts
- I modelli e le chiavi API

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 314 edges
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
- `Come viene pubblicata` --references--> `dist()`  [INFERRED]
  README.md → src/board/shapes.ts
- `Trasloco: il sito su Cloudflare, con un dominio tutto di Glifo` --references--> `dist()`  [INFERRED]
  ROADMAP.md → src/board/shapes.ts
- `Funzionalità` --references--> `k()`  [INFERRED]
  README.md → src/math/numerical.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (168 total, 40 thin omitted)

### Community 0 - "i18n.ts"
Cohesion: 0.05
Nodes (59): SyncStatus, ExplainTone, modelVariant, AI_SERVICES, T, browserLang(), browserLanguages(), dateLocale() (+51 more)

### Community 1 - "NotesStore"
Cohesion: 0.08
Nodes (23): Deletion, DeletionLog, isUuid(), newId(), createdAtFromId(), deriveTitle(), noteIdsInBrowser(), NotesStore (+15 more)

### Community 2 - "main.ts"
Cohesion: 0.03
Nodes (125): setCurrentAccount(), signOut(), addToGraphBlock(), account, ACCOUNT_OFF, accountButton, accountDeps(), accountProblem() (+117 more)

### Community 3 - "compile"
Cohesion: 0.07
Nodes (51): fourierItems(), isFourierLine(), T, areaFor(), constantValue(), argumentOrder(), compileLineIntegral(), compileSurfaceIntegral() (+43 more)

### Community 4 - "sync.ts"
Cohesion: 0.07
Nodes (30): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+22 more)

### Community 5 - "spec.ts"
Cohesion: 0.06
Nodes (83): conicItems(), isConicLine(), quadricEquation(), T, FieldContext, isTestLine(), depth(), Multiple (+75 more)

### Community 6 - "parse.ts"
Cohesion: 0.05
Nodes (53): hasWord(), errorMessage(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES (+45 more)

### Community 7 - "num"
Cohesion: 0.10
Nodes (106): atIntegers(), exp(), hyperbolicToExp(), inverseRational(), sqrtEx(), termTransform(), polyEx(), bernoulliFamily() (+98 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (41): addLabel(), boxes, cameras, complexCoord(), coord(), coordinates(), drawings, drawnViews (+33 more)

### Community 9 - "blockMove.ts"
Cohesion: 0.11
Nodes (34): @codemirror/commands, blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove, blockPlace() (+26 more)

### Community 10 - "distributions.ts"
Cohesion: 0.09
Nodes (42): addExp(), choose(), continuousQuantile(), decimals(), discreteQuantile(), Distribution, exactIntervalProbability(), expSum (+34 more)

### Community 11 - "scopeWith"
Cohesion: 0.09
Nodes (47): constantIntegrand(), inequalityMargin(), integralRegion, LayeredSolid, planeMargin(), radiusOf(), spaceLayers(), spaceMargin() (+39 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (57): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), dataWindow(), decimalText() (+49 more)

### Community 13 - "sheet.ts"
Cohesion: 0.06
Nodes (70): numericPartials(), OdeFunction, expSumValue(), decimalSeparator(), Digits, formatNumber(), formatRational(), fromNumber() (+62 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.09
Nodes (12): fieldInput(), isLanes(), SchemaEditor, withLaneContents(), cellText(), edgeLook(), nodeLook(), nodeStyle() (+4 more)

### Community 15 - "spreadsheetEn.test.ts"
Cohesion: 0.06
Nodes (63): at(), breakEven(), Point, quantity(), T, tableItems(), textLabel(), graphKeyLine() (+55 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (8): functionLabel(), SheetEditor, englishTyping(), serializeSheet(), sheetSize(), CellRange, clearRange(), cloneSheet()

### Community 17 - "markdown.ts"
Cohesion: 0.09
Nodes (38): dataRange(), bulletGroup(), sameList(), moveAttrs(), alignInside(), asciiTrim(), findMarker(), isOrdered() (+30 more)

### Community 18 - "numerical.ts"
Cohesion: 0.11
Nodes (49): FormatOptions, bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial() (+41 more)

### Community 19 - "arithmetic.ts"
Cohesion: 0.07
Nodes (74): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+66 more)

### Community 20 - "index.ts"
Cohesion: 0.06
Nodes (46): b, bigops, c, calculus, fn, fr, fractions, functions (+38 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "schema/editor.ts"
Cohesion: 0.04
Nodes (78): laneOf(), schemaSummary(), alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN (+70 more)

### Community 23 - "noteWordsMath.test.ts"
Cohesion: 0.07
Nodes (31): BLOCKS, blockWord(), FROM_ENGLISH, FUNCTIONS, functionWordPairs(), GRAPH_KEY_FORMS, GRAPH_KEY_LINE, GRAPH_KEYS (+23 more)

### Community 24 - "store.ts"
Cohesion: 0.08
Nodes (20): EraseAction, Step, BoardBackend, BoardChange, BoardData, done(), fromRecord(), IdbBoards (+12 more)

### Community 26 - "ink.ts"
Cohesion: 0.15
Nodes (17): Prefs, BOARD_PALETTES, BoardPalette, highlightName(), inkName(), mid(), outlineSvg(), PEN_SIZE (+9 more)

### Community 27 - "supabase.ts"
Cohesion: 0.11
Nodes (32): @supabase/supabase-js, AUTH_STORAGE_KEY, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken() (+24 more)

### Community 28 - "smoke-test.mjs"
Cohesion: 0.15
Nodes (6): markdown-it, playwright-core, PNG_ICONS, fakeLlmWorker(), firstVisit(), plainContext

### Community 29 - "several.ts"
Cohesion: 0.07
Nodes (68): close(), Definite, definiteIntegral(), exValue(), samples(), EMPTY_SCOPE, Piece, LimitValue (+60 more)

### Community 30 - "gantt.ts"
Cohesion: 0.07
Nodes (56): amount(), barColor(), crossings(), dateText(), dayMonth(), dayOf(), fitText(), GanttOptions (+48 more)

### Community 31 - "study.ts"
Cohesion: 0.14
Nodes (37): limit(), Asymptote, asymptoteText(), boundaries(), compiled(), cutsOf(), defined(), domainOf() (+29 more)

### Community 32 - ".constructor"
Cohesion: 0.15
Nodes (3): loadPrefs(), appleTouch(), UA

### Community 33 - "assistant.ts"
Cohesion: 0.09
Nodes (33): AiAnswer, AiError, AiSettings, answerSchema(), askAi(), askCompatible(), askThroughHost(), capitalized() (+25 more)

### Community 34 - "logic.ts"
Cohesion: 0.11
Nodes (30): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+22 more)

### Community 35 - "h"
Cohesion: 0.04
Nodes (97): insertBlock(), T, rich(), setLangForTests(), texts, board, openGuide(), viewSwitch (+89 more)

### Community 36 - "complex.ts"
Cohesion: 0.06
Nodes (66): COMPLEX_FUNCTIONS, farthest(), gaussItem(), hasExponential(), inZ(), isComplexLine(), isComplexValue(), isInequality() (+58 more)

### Community 37 - "namesIn"
Cohesion: 0.13
Nodes (37): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+29 more)

### Community 38 - "translations.test.ts"
Cohesion: 0.17
Nodes (18): AstNode, calleeName(), check(), checkPair(), visit(), children(), entryPairs(), files (+10 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (24): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+16 more)

### Community 40 - "view3d.ts"
Cohesion: 0.06
Nodes (83): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+75 more)

### Community 41 - "Pt"
Cohesion: 0.16
Nodes (8): clampZoom(), PanAction, PinchAction, pressureOf(), validView(), EllipseFit, BoardView, Pt

### Community 42 - "localModels.ts"
Cohesion: 0.05
Nodes (54): chat(), GlifoError, Gpu, load(), post(), remove(), scope, shaderF16() (+46 more)

### Community 43 - "sql.ts"
Cohesion: 0.16
Nodes (19): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+11 more)

### Community 44 - "functions.ts"
Cohesion: 0.08
Nodes (64): EMPTY, number(), T, addFormat(), divFormat(), GENERAL, most(), mulFormat() (+56 more)

### Community 45 - "MathError"
Cohesion: 0.10
Nodes (67): MathError, angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, dataOf() (+59 more)

### Community 46 - "spreadsheet/format.ts"
Cohesion: 0.07
Nodes (59): KINDS, sheetSummary(), T, WidgetBlock, SchemaBlock, booleanText(), ENGLISH, englishNumber() (+51 more)

### Community 47 - "linsys.ts"
Cohesion: 0.08
Nodes (70): LinearScope, surdText(), choices(), gcd(), isStandardUnknown(), linearSystem(), matrixEquation(), matrixSystem() (+62 more)

### Community 48 - "template.ts"
Cohesion: 0.36
Nodes (6): CATEGORIES, cardPreviewTex(), formPreviewTex(), ParsedTemplate, PLACEHOLDER_TEX, placeholderPreview()

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (36): DrawAction, adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners() (+28 more)

### Community 50 - "FoldersStore"
Cohesion: 0.11
Nodes (13): cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder(), loadClosedFolders(), RemoteFolder (+5 more)

### Community 51 - "sidePanel.ts"
Cohesion: 0.09
Nodes (29): AiResult, valueNode(), labelHtml(), texHtml(), localizeTex(), checkHtml(), checkTitle(), T (+21 more)

### Community 52 - "spaces.ts"
Cohesion: 0.15
Nodes (20): Eigenvalue, LinearValue, cartesianEquations(), Cell, coordinateNames(), diagonalize(), dot(), gramSchmidt() (+12 more)

### Community 53 - "usesDecimalComma"
Cohesion: 0.08
Nodes (50): numberText(), number(), T, testItems(), endTex(), classes(), dataOf(), distributionExtent() (+42 more)

### Community 54 - "noteWordsGraph.test.ts"
Cohesion: 0.09
Nodes (39): setGraphLabels(), monthOf(), MONTHS, MONTHS_EN, parseDate(), planBlock, PlanKind, planRange() (+31 more)

### Community 55 - "openShareDialog"
Cohesion: 0.19
Nodes (14): openShareDialog(), changeAccess(), changeCopy(), copy(), refreshChanged(), render(), run(), setStatus() (+6 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "limits.ts"
Cohesion: 0.21
Nodes (17): exponentialForm(), fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), alternating() (+9 more)

### Community 58 - "database.ts"
Cohesion: 0.23
Nodes (6): createDatabase(), createUser(), databaseTests(), feedbackTests(), migrations, shareTests()

### Community 59 - "finite.ts"
Cohesion: 0.17
Nodes (28): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+20 more)

### Community 60 - "editor/editor.ts"
Cohesion: 0.07
Nodes (34): description, name, private, type, version, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/language-data (+26 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "Welcome to Glifo"
Cohesion: 0.20
Nodes (9): A few examples, Calculations and graphs, For programming too, Handy shortcuts, How to write formulas, Lists, Spell check, Try it now (+1 more)

### Community 63 - "spreadsheet/editor.ts"
Cohesion: 0.09
Nodes (47): ChartTable, currentCall(), Editing, MenuEntry, Move, PATHS, SheetEditorOptions, Snapshot (+39 more)

### Community 64 - ".folderItem"
Cohesion: 0.23
Nodes (3): saveClosedFolders(), NotesPanel, NotesPanelDeps

### Community 65 - "odesolve.ts"
Cohesion: 0.07
Nodes (89): absOf(), boundsOf(), close(), definite(), fourierProblem, fourierShown(), isZero(), oneFraction() (+81 more)

### Community 66 - "restore.ts"
Cohesion: 0.20
Nodes (13): newStrokeId(), receiveRelocation(), restore(), BackupNote, backupNotes(), restoreBackup(), RestoreBoards, Restored (+5 more)

### Community 67 - "Schema"
Cohesion: 0.33
Nodes (4): SchemaEditorOptions, Schema, serializeSchema(), Template

### Community 68 - "ui/preview.ts"
Cohesion: 0.06
Nodes (36): GraphLabels, GraphLook, renameGraphScope(), renameScopeKeys(), BlockKind, MoveDir, Look, Theme (+28 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "relocation-test.mjs"
Cohesion: 0.18
Nodes (7): AFTER_MOVE, ids, newBrowser(), NOTICE_DAY, out, serve(), TYPES

### Community 73 - "toLatex"
Cohesion: 0.07
Nodes (44): isNumericalLine(), numericalItems(), multipleLabel(), names(), STUDY_GRAPH, studyItems(), T, ACCENT_COMMANDS (+36 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (56): verified(), linearCells(), pairUp(), atValues(), Converter, coordinates(), decimalText(), definiteParts() (+48 more)

### Community 75 - "insert.ts"
Cohesion: 0.11
Nodes (16): InsertOptions, toggleLinePrefix(), addPlaceholders, Placeholder, besideSchema(), BlockWidget, findWidgetBlocks(), guardBlocks() (+8 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Errore o imprevisto → nel dettaglio, 3. Serve una decisione → frasi complete, 4. Fine del compito → un solo riepilogo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "placeholders.ts"
Cohesion: 0.15
Nodes (10): buildDecorations(), clearAllPlaceholders(), clearPlaceholders, contains(), currentIndex(), filledMark, getPlaceholders(), jumpPlaceholder() (+2 more)

### Community 79 - "explainPanel.ts"
Cohesion: 0.04
Nodes (52): Explanation, FollowUp, REPLY_TOKENS, definedName(), formulaTopic(), graphTopic(), studyOf(), theoremTopic() (+44 more)

### Community 82 - "Il database degli account (Supabase)"
Cohesion: 0.20
Nodes (9): Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Note condivise con un link, Sincronizzazione, `sync_pull({ since })`: scarica le novità (+1 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.11
Nodes (11): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+3 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.13
Nodes (15): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+7 more)

### Community 91 - "topics.ts"
Cohesion: 0.17
Nodes (22): ATTRIBUTES, cut(), ER_SHAPES, fieldText(), fitLines(), flowOrder(), formulaText(), FREE_NAMES (+14 more)

### Community 92 - "BoardStore"
Cohesion: 0.12
Nodes (4): BoardStore, MemoryBoards, applyAccountChange(), boardsFor()

### Community 96 - "account-test.mjs"
Cohesion: 0.10
Nodes (11): @electric-sql/pglite, device(), login(), newContext, waitFor(), b64(), CAPTCHA_TOKEN, CODE (+3 more)

### Community 97 - "files.ts"
Cohesion: 0.24
Nodes (14): inClaudeViewer(), canWriteFilesDirectly(), FsWindow, isAbort(), mdTypes(), OpenedFile, openMarkdownFiles(), openTypes() (+6 more)

### Community 98 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 100 - "probability.ts"
Cohesion: 0.11
Nodes (26): End, CompileOptions, RelOp, ALL, compileOf(), complement(), distributionOf(), endAt() (+18 more)

### Community 101 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 102 - "symbolsEn.test.ts"
Cohesion: 0.14
Nodes (28): editDistance(), singular(), stem(), STOPWORDS, words(), BOTH, buildIndex(), containsPhrase() (+20 more)

### Community 103 - "siteUpdate.ts"
Cohesion: 0.15
Nodes (20): loadingEditor(), checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure (+12 more)

### Community 104 - "graph/file.ts"
Cohesion: 0.08
Nodes (46): FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsForFile(), graphsFromFile(), hide() (+38 more)

### Community 105 - "calcPlugin"
Cohesion: 0.21
Nodes (3): calcPlugin, CheckWidget, ResultWidget

### Community 106 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 107 - "spellcheck.ts"
Cohesion: 0.08
Nodes (24): @codemirror/lang-markdown, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt() (+16 more)

### Community 108 - "editor/lists.ts"
Cohesion: 0.09
Nodes (59): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+51 more)

### Community 113 - "graph.ts"
Cohesion: 0.05
Nodes (36): @maxgraph/core, AT_X, COMPASS, createEdgeCell(), createGraph(), drawSchema(), edgeStyle(), edgeTextAt() (+28 more)

### Community 116 - ".int"
Cohesion: 0.11
Nodes (9): characteristicPolynomial(), eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn(), q() (+1 more)

### Community 117 - "schema/templates.ts"
Cohesion: 0.21
Nodes (18): DEFAULT_EDGE, SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), conceptMap(), cycle(), edge() (+10 more)

### Community 118 - "Rational"
Cohesion: 0.08
Nodes (48): Part, at(), centralCanonical(), Coefficients, coneCanonical(), conicOf(), det2(), det3() (+40 more)

### Community 119 - "src/relocation.ts"
Cohesion: 0.10
Nodes (49): accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf() (+41 more)

### Community 120 - "Glifo"
Cohesion: 0.12
Nodes (16): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Domande frequenti e commenti (+8 more)

### Community 121 - "captcha.ts"
Cohesion: 0.16
Nodes (11): captchaToken(), loadTurnstile(), Turnstile, TURNSTILE_SCRIPT, Window, TURNSTILE_SITE_KEY, accountFailure(), Accesso con Google (+3 more)

### Community 122 - "calcResults.ts"
Cohesion: 0.07
Nodes (39): @codemirror/language, @codemirror/state, @lezer/common, acceptCalcResult(), CalcCheck, calcOutcomes(), CalcResult, calcResults() (+31 more)

### Community 123 - "board.ts"
Cohesion: 0.06
Nodes (61): Action, coalesced(), DOT_SIZES, EraserMode, Finger, HANDLE_REACH, ICON, LassoAction (+53 more)

### Community 124 - "Sheet"
Cohesion: 0.07
Nodes (32): GaussLine, Definition, Line, ExactComplexScope, ConicInfo, Ode, withWorkLimit(), FiniteContext (+24 more)

### Community 125 - "vite"
Cohesion: 0.22
Nodes (6): vite, constructor(), LlamaWorker, minutes, postMessage(), started

### Community 128 - "schema/file.ts"
Cohesion: 0.11
Nodes (21): svg(), findSchemaBlocks(), schemaBlockAtLine(), loadDialect(), base64(), hide(), OPEN, schemasForFile() (+13 more)

### Community 129 - "Dove sono le cose"
Cohesion: 0.05
Nodes (100): 1. A cosa serve l'AI dei modelli di frontiera, Dove sono le cose, Glifo – architettura, allNames(), answerFollowUp(), bareResult(), chained(), chatContext (+92 more)

### Community 132 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 133 - "Parser"
Cohesion: 0.29
Nodes (3): FormulaError, parseFormula(), Parser

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 140 - ".constructor"
Cohesion: 0.10
Nodes (9): EditorCallbacks, searchPhrases(), insertTemplate(), wrapSelection(), createToolbar(), insertCode(), insertLink(), listStyle() (+1 more)

### Community 141 - "xlsx.ts"
Cohesion: 0.09
Nodes (43): RFC-4180, fflate, saveSheetBlock(), tablesNote(), csvCell(), csvDelimiter(), csvNumbers(), csvToSheet() (+35 more)

### Community 142 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

### Community 143 - "vitest"
Cohesion: 0.03
Nodes (83): katex, @mlc-ai/web-llm, vite-plugin-pwa, vitest, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), PullResult (+75 more)

### Community 144 - "suggestions.ts"
Cohesion: 0.20
Nodes (7): EditorMathContext, expand(), preferredIndex(), SuggestionController, commandNames(), parseTemplate(), templateText()

### Community 146 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 154 - "L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota"
Cohesion: 0.25
Nodes (8): 2. Dalla lavagna alla nota, 3. Da una foto alla nota, 4. Dettare: la voce diventa testo nella nota, 5. Registrare le lezioni e trascriverle, Da sistemare con il primo punto che tocca l'AI, Fonti (controllate il 14 ottobre 2026), In che ordine, L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota

### Community 156 - "Glifo – note per Claude"
Cohesion: 0.25
Nodes (8): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Regole, sqlite()

### Community 157 - "spreadsheet/file.ts"
Cohesion: 0.38
Nodes (6): hide(), OPEN, sheetsForFile(), sheetsFromFile(), T, unhide()

### Community 158 - "numerical.test.ts"
Cohesion: 0.60
Nodes (3): result(), text(), verdict()

### Community 160 - ".reply"
Cohesion: 0.47
Nodes (3): Promemoria per lo studente, Commenti di chi prova Glifo, Commenti di chi prova Glifo

### Community 161 - "severalGraph.ts"
Cohesion: 0.35
Nodes (10): criticalLine(), isSeveralLine(), named(), severalItems(), surface(), T, bounded(), extremaOf() (+2 more)

### Community 163 - "In programma"
Cohesion: 0.25
Nodes (8): Account: i propri appunti su ogni dispositivo, anche da condividere, Idee per il futuro, In programma, L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota (14 ottobre 2026, se ne parla), La lavagna: idee in più, Più avanti, Schemi: idee in più, Trasloco: il sito su Cloudflare, con un dominio tutto di Glifo

### Community 166 - "parseGraph"
Cohesion: 0.08
Nodes (34): staticGraphSvg(), chooseWindow(), Box, chooseBox(), parseGraph(), DrawOptions, graphSvg(), PALETTES (+26 more)

### Community 172 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 176 - "suggest.ts"
Cohesion: 0.24
Nodes (12): SuggestionItem, normalizeText(), IndexedEntry, SearchResult, getIndex(), isSubsequence(), keysOf(), MatchKind (+4 more)

### Community 179 - "I modelli e le chiavi API"
Cohesion: 0.33
Nodes (6): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), In prova sul ramo `prova` (7 ottobre 2026): Qwen3 nel browser per «Spiegami», La chiave, il server locale e la scelta del modello (14 ottobre 2026), Le idee dello studente (5 ottobre 2026)

## Knowledge Gaps
- **873 isolated node(s):** `session-start.sh script`, `name`, `private`, `version`, `description` (+868 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1197 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **40 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `texts` connect `h` to `i18n.ts`, `Dove sono le cose`, `main.ts`, `compile`, `schema/file.ts`, `spec.ts`, `parse.ts`, `NotesStore`, `graph/preview.ts`, `distributions.ts`, `scopeWith`, `svg.ts`, `sheet.ts`, `xlsx.ts`, `spreadsheetEn.test.ts`, `vitest`, `numerical.ts`, `arithmetic.ts`, `index.ts`, `schema/editor.ts`, `ink.ts`, `supabase.ts`, `several.ts`, `gantt.ts`, `study.ts`, `spreadsheet/file.ts`, `assistant.ts`, `severalGraph.ts`, `logic.ts`, `complex.ts`, `namesIn`, `resize.ts`, `localModels.ts`, `sql.ts`, `functions.ts`, `MathError`, `spreadsheet/format.ts`, `linsys.ts`, `sidePanel.ts`, `spaces.ts`, `usesDecimalComma`, `noteWordsGraph.test.ts`, `finite.ts`, `editor/editor.ts`, `spreadsheet/editor.ts`, `odesolve.ts`, `restore.ts`, `ui/preview.ts`, `toLatex`, `symbolic.ts`, `explainPanel.ts`, `topics.ts`, `files.ts`, `probability.ts`, `siteUpdate.ts`, `graph/file.ts`, `spellcheck.ts`, `editor/lists.ts`, `schema/templates.ts`, `Rational`, `src/relocation.ts`, `calcResults.ts`, `board.ts`?**
  _High betweenness centrality (0.132) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `Dove sono le cose` to `i18n.ts`, `schema/file.ts`, `main.ts`, `compile`, `NotesStore`, `spec.ts`, `parse.ts`, `num`, `Board`, `blockMove.ts`, `graph/preview.ts`, `distributions.ts`, `.constructor`, `svg.ts`, `xlsx.ts`, `spreadsheetEn.test.ts`, `vitest`, `sheet.ts`, `numerical.ts`, `arithmetic.ts`, `markdown.ts`, `SchemaEditor`, `schema/editor.ts`, `noteWordsMath.test.ts`, `SheetEditor`, `Parser`, `ink.ts`, `supabase.ts`, `smoke-test.mjs`, `several.ts`, `gantt.ts`, `study.ts`, `Parser`, `assistant.ts`, `logic.ts`, `h`, `complex.ts`, `namesIn`, `parseGraph`, `severalGraph.ts`, `view3d.ts`, `Pt`, `localModels.ts`, `functions.ts`, `MathError`, `spreadsheet/format.ts`, `linsys.ts`, `board/shapes.ts`, `sidePanel.ts`, `usesDecimalComma`, `noteWordsGraph.test.ts`, `limits.ts`, `finite.ts`, `spreadsheet/editor.ts`, `odesolve.ts`, `ui/preview.ts`, `toLatex`, `symbolic.ts`, `insert.ts`, `explainPanel.ts`, `tutorial.mjs`, `topics.ts`, `BoardStore`, `files.ts`, `siteUpdate.ts`, `graph/file.ts`, `graph.ts`, `Rational`, `src/relocation.ts`, `board.ts`, `Sheet`?**
  _High betweenness centrality (0.110) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `i18n.ts`, `Dove sono le cose`, `NotesStore`, `schema/file.ts`, `parse.ts`, `num`, `blockMove.ts`, `distributions.ts`, `scopeWith`, `svg.ts`, `xlsx.ts`, `spreadsheetEn.test.ts`, `markdown.ts`, `schema/editor.ts`, `noteWordsMath.test.ts`, `store.ts`, `ink.ts`, `supabase.ts`, `gantt.ts`, `numerical.test.ts`, `.constructor`, `assistant.ts`, `h`, `parseGraph`, `resize.ts`, `translations.test.ts`, `localModels.ts`, `sql.ts`, `MathError`, `linsys.ts`, `template.ts`, `board/shapes.ts`, `FoldersStore`, `usesDecimalComma`, `noteWordsGraph.test.ts`, `database.ts`, `editor/editor.ts`, `spreadsheet/editor.ts`, `restore.ts`, `ui/preview.ts`, `toLatex`, `insert.ts`, `explainPanel.ts`, `symbolsEn.test.ts`, `siteUpdate.ts`, `graph/file.ts`, `spellcheck.ts`, `editor/lists.ts`, `src/relocation.ts`, `captcha.ts`, `calcResults.ts`, `board.ts`, `Sheet`?**
  _High betweenness centrality (0.070) - this node is a cross-community bridge._
- **Are the 313 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `tutorialModel()`) actually correct?**
  _`Dove sono le cose` has 313 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `name`, `private` to the rest of the system?**
  _873 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `i18n.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04525252525252525 - nodes in this community are weakly interconnected._
- **Should `NotesStore` be split into smaller, more focused modules?**
  _Cohesion score 0.08065458796025717 - nodes in this community are weakly interconnected._