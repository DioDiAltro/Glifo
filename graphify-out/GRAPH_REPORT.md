# Graph Report - matherdown  (2026-10-07)

## Corpus Check
- 291 files · ~564,961 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 4771 nodes · 17310 edges · 128 communities (106 shown, 22 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 541 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `851a0089`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- touchlog.ts
- parse.ts
- main.ts
- odesolve.ts
- sync.ts
- spec.ts
- toLatex
- num
- graph/preview.ts
- explain.ts
- complex.ts
- editor/lists.ts
- vitest
- spreadsheet/editor.ts
- SchemaEditor
- conics.ts
- h
- compile
- numerical.ts
- markdown.ts
- index.ts
- engine.ts
- Board
- probability.ts
- BoardStore
- MathError
- assistant.ts
- graph.ts
- supabase.ts
- numericalGraph.ts
- gantt.ts
- graph/space.ts
- SheetEvaluator
- calcResults.ts
- logic.ts
- laplace.ts
- Rational
- namesIn
- localModels.ts
- resize.ts
- statsShown.ts
- Pt
- NotesStore
- study.ts
- functions.ts
- plan.ts
- graphNote.test.ts
- numerical.test.ts
- planPreview.ts
- board/shapes.ts
- schemaBlocks.ts
- exact.ts
- search.ts
- dialogs.ts
- MarkdownEditor
- latex.ts
- 20261004091555_note_condivise.sql
- board.ts
- schemaTools.test.ts
- grafo-html.mjs
- schema/shapes.ts
- dependencies
- FoldersStore
- account/space.ts
- ui/preview.ts
- linsys.ts
- parseSchema
- inference.ts
- explainPanel.ts
- Benvenuto in Glifo
- compilerOptions
- selection.ts
- FormatOptions
- blockMove.ts
- symbolic.ts
- Sheet
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- Dove sono le cose
- session-start.sh
- .claude/CLAUDE.md
- editor/editor.ts
- tutorial.mjs
- Abbonamenti
- .folderItem
- Costi
- supabase-stub.sql
- account-test.mjs
- Il database degli account (Supabase)
- package.json
- Parser
- spell.test.ts
- toolbar.ts
- .constructor
- files.ts
- ExplainPanel
- fake-supabase.mjs
- logo.ts
- xlsx.ts
- page.ts
- sidePanel.ts
- view3d.ts
- sheet.ts
- renderTex
- sql.ts
- Glifo
- createFakeSupabase
- smoke-test.mjs
- dom.ts
- SuggestionController

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 222 edges
2. `MathError` - 151 edges
3. `num()` - 145 edges
4. `Sheet` - 135 edges
5. `MathNode` - 129 edges
6. `mul()` - 124 edges
7. `Board` - 118 edges
8. `compile()` - 113 edges
9. `Rational` - 111 edges
10. `toLatex()` - 103 edges

## Surprising Connections (you probably didn't know these)
- `Dove sono le cose` --references--> `fakeLlmWorker()`  [INFERRED]
  ARCHITETTURA.md → scripts/smoke-test.mjs
- `Dove sono le cose` --references--> `WidgetKind`  [INFERRED]
  ARCHITETTURA.md → src/editor/schemaBlocks.ts
- `Dove sono le cose` --references--> `ConicElements`  [INFERRED]
  ARCHITETTURA.md → src/math/conics.ts
- `Dove sono le cose` --references--> `texts()`  [INFERRED]
  ARCHITETTURA.md → tests/boardTouchLog.test.ts
- `Funzionalità` --references--> `k()`  [INFERRED]
  README.md → src/math/numerical.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (128 total, 22 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.07
Nodes (36): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole (+28 more)

### Community 1 - "parse.ts"
Cohesion: 0.07
Nodes (41): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe(), differentialInFraction() (+33 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (103): graphsForFile(), hide(), remapGraphLines(), remapLineKeys(), account, active, app, applyAccountChange() (+95 more)

### Community 3 - "odesolve.ts"
Cohesion: 0.08
Nodes (76): addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames(), constantParticular() (+68 more)

### Community 4 - "sync.ts"
Cohesion: 0.05
Nodes (38): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+30 more)

### Community 5 - "spec.ts"
Cohesion: 0.06
Nodes (80): isConicLine(), quadricEquation(), fourierItems(), isFourierLine(), onlyComplex(), isTestLine(), testItems(), constantIntegrand() (+72 more)

### Community 6 - "toLatex"
Cohesion: 0.06
Nodes (99): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+91 more)

### Community 7 - "num"
Cohesion: 0.15
Nodes (80): monomial(), atIntegers(), withoutAbs(), hyperbolicToExp(), polyEx(), similarSolution(), bigGcd(), byParts() (+72 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (46): addLabel(), boxes, cameras, complexCoord(), coord(), drawings, drawnViews, endTex() (+38 more)

### Community 9 - "explain.ts"
Cohesion: 0.08
Nodes (48): allNames(), ChatFn, checkSteps(), engineHints(), explain(), ExplainError, ExplainEvents, ExplainKind (+40 more)

### Community 10 - "complex.ts"
Cohesion: 0.05
Nodes (76): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexLine(), isComplexValue() (+68 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.11
Nodes (50): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+42 more)

### Community 12 - "vitest"
Cohesion: 0.05
Nodes (87): vitest, contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), staticGraphSvg(), chooseWindow(), chooseY() (+79 more)

### Community 13 - "spreadsheet/editor.ts"
Cohesion: 0.08
Nodes (52): openSheet(), saveSheetBlock(), tablesNote(), currentCall(), Editing, MenuEntry, Move, PATHS (+44 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.11
Nodes (3): SchemaEditor, withLaneContents(), serializeSchema()

### Community 15 - "conics.ts"
Cohesion: 0.18
Nodes (29): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+21 more)

### Community 16 - "h"
Cohesion: 0.08
Nodes (4): rangeLabel(), SheetEditor, cloneSheet(), h()

### Community 17 - "compile"
Cohesion: 0.05
Nodes (91): conicItems(), integralRegion, areaFor(), condLabel(), constantValue(), define(), isStraight(), isVectorName() (+83 more)

### Community 18 - "numerical.ts"
Cohesion: 0.14
Nodes (31): cholesky(), condition(), exactPolynomial(), floatPolynomial(), interpolating(), interpolation(), inverseOf(), iterative() (+23 more)

### Community 19 - "markdown.ts"
Cohesion: 0.09
Nodes (38): bulletGroup(), sameList(), moveAttrs(), alignInside(), asciiTrim(), findMarker(), Found, isOrdered() (+30 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (41): b, bigops, c, calculus, fn, fr, fractions, functions (+33 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "Board"
Cohesion: 0.09
Nodes (4): Board, clampZoom(), validView(), BoardTheme

### Community 23 - "probability.ts"
Cohesion: 0.06
Nodes (60): addExp(), choose(), continuousQuantile(), discreteQuantile(), Distribution, End, exactIntervalProbability(), factorialBig() (+52 more)

### Community 24 - "BoardStore"
Cohesion: 0.06
Nodes (14): BoardBackend, BoardStore, done(), fromRecord(), IdbBoards, MemoryBoards, ofNote(), openBoardDatabase() (+6 more)

### Community 25 - "MathError"
Cohesion: 0.09
Nodes (72): figureText(), linearItem(), MathError, UndefinedName, formatNumber(), angleBetween(), asMatrix(), basisOf() (+64 more)

### Community 26 - "assistant.ts"
Cohesion: 0.12
Nodes (24): AiAnswer, AiError, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible(), askThroughHost(), checkShape() (+16 more)

### Community 27 - "graph.ts"
Cohesion: 0.09
Nodes (34): fieldInput(), isLanes(), AT_X, cellText(), COMPASS, createEdgeCell(), createGraph(), drawSchema() (+26 more)

### Community 28 - "supabase.ts"
Cohesion: 0.13
Nodes (27): @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken(), ensureSessionOf() (+19 more)

### Community 29 - "numericalGraph.ts"
Cohesion: 0.80
Nodes (4): isNumericalLine(), numericalItems(), isPlottedNumerical(), numericalPlot()

### Community 30 - "gantt.ts"
Cohesion: 0.06
Nodes (68): graphImagesFor(), amount(), barColor(), crossings(), dateText(), dayOf(), fitText(), GanttOptions (+60 more)

### Community 31 - "graph/space.ts"
Cohesion: 0.12
Nodes (50): addMesh(), addTet(), affinePlane(), Axis, centroid(), chooseBox(), clipBy(), clipPolygon() (+42 more)

### Community 32 - "SheetEvaluator"
Cohesion: 0.13
Nodes (19): sheetSummary(), sheetToCsv(), openSheetEditor(), evaluateSheet(), number(), SheetEvaluator, readInput(), tidy() (+11 more)

### Community 33 - "calcResults.ts"
Cohesion: 0.12
Nodes (12): acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult, calcResults(), CheckWidget, insertResult() (+4 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "laplace.ts"
Cohesion: 0.10
Nodes (52): factoredPolynomial(), factorsOf(), homogeneousParts(), integerPoly(), oneFraction(), beyondPoles(), compiled(), E (+44 more)

### Community 36 - "Rational"
Cohesion: 0.12
Nodes (21): Part, primitivePart(), R(), Rational, absOf(), boundsOf(), close(), definite() (+13 more)

### Community 37 - "namesIn"
Cohesion: 0.12
Nodes (42): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+34 more)

### Community 38 - "localModels.ts"
Cohesion: 0.09
Nodes (30): @mlc-ai/web-llm, chat(), GlifoError, Gpu, load(), post(), remove(), scope (+22 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "statsShown.ts"
Cohesion: 0.10
Nodes (46): classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX, Line, number(), pmfBars() (+38 more)

### Community 41 - "Pt"
Cohesion: 0.15
Nodes (10): coalesced(), Finger, LassoAction, MoveAction, pointsOf(), pressureOf(), Transform, EllipseFit (+2 more)

### Community 42 - "NotesStore"
Cohesion: 0.08
Nodes (30): Deletion, DeletionLog, Folder, FOLDER_NAME_MAX, FolderGroup, groupByFolder(), loadClosedFolders(), RemoteFolder (+22 more)

### Community 43 - "study.ts"
Cohesion: 0.09
Nodes (50): close(), Definite, definiteIntegral(), exValue(), samples(), EMPTY_SCOPE, Piece, limit() (+42 more)

### Community 44 - "functions.ts"
Cohesion: 0.11
Nodes (48): addFormat(), FormulaNode, boolArg(), BY_NAME, callFunction(), compareValues(), conditional(), criterion() (+40 more)

### Community 45 - "plan.ts"
Cohesion: 0.18
Nodes (16): NO_TABLE, cellText(), columnRole(), columnsOf(), durationUnit(), isNumber(), isPlanRange(), MAX_ACTIVITIES (+8 more)

### Community 46 - "graphNote.test.ts"
Cohesion: 0.18
Nodes (15): addToGraphBlock(), formulaAtCursor(), GraphLabelLines, insertGraphBlock(), setGraphLabels(), FIGURE_PALETTE, containing(), graphBlockText() (+7 more)

### Community 47 - "numerical.test.ts"
Cohesion: 0.29
Nodes (3): result(), text(), verdict()

### Community 48 - "planPreview.ts"
Cohesion: 0.13
Nodes (17): labelHtml(), planName(), ganttWidth(), PlanView, GraphLabels, GraphLook, cache, escapeHtml() (+9 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (35): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+27 more)

### Community 50 - "schemaBlocks.ts"
Cohesion: 0.10
Nodes (21): toggleLinePrefix(), LIST_STYLES, besideSchema(), BlockWidget, findWidgetBlocks(), guardBlocks(), KINDS, schemaBlockRanges() (+13 more)

### Community 51 - "exact.ts"
Cohesion: 0.16
Nodes (17): expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactFunction, ExactRandom, exactRoot() (+9 more)

### Community 52 - "search.ts"
Cohesion: 0.17
Nodes (24): editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex() (+16 more)

### Community 53 - "dialogs.ts"
Cohesion: 0.07
Nodes (34): EXPLAIN_TONES, ExplainTone, AI_SERVICES, aiSettingsOf(), board, ACCOUNT_SETTINGS, accountSettings(), AI_MODELS (+26 more)

### Community 54 - "MarkdownEditor"
Cohesion: 0.16
Nodes (5): @codemirror/commands, EditorCallbacks, MarkdownEditor, insertTemplate(), setup()

### Community 55 - "latex.ts"
Cohesion: 0.08
Nodes (50): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+42 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "board.ts"
Cohesion: 0.06
Nodes (50): Action, ACTION_NAMES, DOT_SIZES, DrawAction, EraseAction, EraserMode, HANDLE_REACH, ICON (+42 more)

### Community 58 - "schemaTools.test.ts"
Cohesion: 0.13
Nodes (23): alignBoxes(), Alignment, Box, distributeBoxes(), Position, cellHtml(), crc32(), svgSize() (+15 more)

### Community 59 - "grafo-html.mjs"
Cohesion: 0.17
Nodes (5): graphFile, names, namesFile, root, PNG_ICONS

### Community 60 - "schema/shapes.ts"
Cohesion: 0.08
Nodes (17): @maxgraph/core, ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape (+9 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "FoldersStore"
Cohesion: 0.15
Nodes (4): cleanFolderName(), FoldersStore, sameName(), names()

### Community 63 - "account/space.ts"
Cohesion: 0.17
Nodes (19): accountSpace(), adoptGuestNotes(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf(), setCurrentAccount() (+11 more)

### Community 64 - "ui/preview.ts"
Cohesion: 0.08
Nodes (23): renameGraphScope(), renameScopeKeys(), BlockKind, Look, Theme, draw(), drawCached(), drawn (+15 more)

### Community 65 - "linsys.ts"
Cohesion: 0.05
Nodes (80): decimalSeparator(), Digits, formatRational(), fromNumber(), fromRational(), SUPERSCRIPT, writeDigits(), nameLatex() (+72 more)

### Community 66 - "parseSchema"
Cohesion: 0.15
Nodes (17): schemaSummary(), svg(), base64(), hide(), OPEN, schemasForFile(), schemasFromFile(), unhide() (+9 more)

### Community 67 - "inference.ts"
Cohesion: 0.14
Nodes (26): number(), chiSquareTest(), confidence(), confidenceShown(), Given, hypothesisTest(), InferenceContext, interval() (+18 more)

### Community 68 - "explainPanel.ts"
Cohesion: 0.17
Nodes (17): explainTarget, Explanation, REPLY_TOKENS, formulasUntil(), sheetBefore(), explanationMarkdown(), insertExplanation(), nextLineText() (+9 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "selection.ts"
Cohesion: 0.09
Nodes (38): centerOn(), copyStrokes(), cross(), handleScale(), insideLasso(), keepInside(), LASSO_SHARE, lassoed() (+30 more)

### Community 72 - "FormatOptions"
Cohesion: 0.25
Nodes (17): FormatOptions, bisection(), derivative(), fixedPoint(), intervalOf(), k(), newton(), NormKind (+9 more)

### Community 73 - "blockMove.ts"
Cohesion: 0.11
Nodes (35): blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove, blockPlace(), closed() (+27 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (64): valueAt(), primitive(), verified(), assumePositive(), atValues(), cancelLinear(), commonPositive(), Converter (+56 more)

### Community 75 - "Sheet"
Cohesion: 0.06
Nodes (43): Definition, Line, ExactComplexScope, errorMessage(), withWorkLimit(), FormattedResult, Mat, MathNode (+35 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.05
Nodes (61): ALIGN, ARROW_NAMES, AT_ICONS, AT_NAMES, BASE_PRESETS, BIG_ARROWS, DB_PRESETS, Direction (+53 more)

### Community 79 - "Dove sono le cose"
Cohesion: 0.09
Nodes (46): Dove sono le cose, Glifo – architettura, at(), breakEven(), Point, quantity(), tableItems(), textLabel() (+38 more)

### Community 82 - "editor/editor.ts"
Cohesion: 0.06
Nodes (50): @codemirror/language, @codemirror/state, @codemirror/view, @lezer/common, @lezer/highlight, closeMathBlockOnEnter(), highlight, italianPhrases (+42 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.20
Nodes (6): centerOf(), clickOn(), ffmpeg, SCENES, SIZE, work

### Community 90 - "Abbonamenti"
Cohesion: 0.05
Nodes (37): Abbonamenti, Classico, gratis: per scrivere e controllare, Com'è andata la discussione, Come si costruisce (per dopo), Come si decide cosa far pagare, Cosa fare, in ordine, Cosa succede dietro, Cosa vede chi studia (+29 more)

### Community 91 - ".folderItem"
Cohesion: 0.22
Nodes (3): formatDate(), NotesPanel, NotesPanelDeps

### Community 92 - "Costi"
Cohesion: 0.13
Nodes (12): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, Quando lo studente dice di cominciare, Account: i propri appunti su ogni dispositivo, anche da condividere, Idee per il futuro (+4 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.20
Nodes (4): device(), login(), newContext, waitFor()

### Community 97 - "Il database degli account (Supabase)"
Cohesion: 0.18
Nodes (10): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Nell'app, Note condivise con un link (+2 more)

### Community 98 - "package.json"
Cohesion: 0.04
Nodes (42): description, devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript (+34 more)

### Community 101 - "spell.test.ts"
Cohesion: 0.07
Nodes (28): @codemirror/lang-markdown, noIndentedCode, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close() (+20 more)

### Community 102 - "toolbar.ts"
Cohesion: 0.19
Nodes (15): insertBlock(), wrapSelection(), Action, createToolbar(), insertCode(), insertLink(), listMenu(), listStyle() (+7 more)

### Community 104 - "files.ts"
Cohesion: 0.24
Nodes (13): inClaudeViewer(), canWriteFilesDirectly(), FsWindow, isAbort(), MD_TYPES, OPEN_TYPES, OpenedFile, openMarkdownFiles() (+5 more)

### Community 105 - "ExplainPanel"
Cohesion: 0.30
Nodes (4): ExplainPanel, preventFocusSteal(), sentenceHtml(), texHtml()

### Community 106 - "fake-supabase.mjs"
Cohesion: 0.25
Nodes (6): @electric-sql/pglite, b64(), CODE, GOOGLE_CODE, ROOT, SUPABASE_URL

### Community 107 - "logo.ts"
Cohesion: 0.39
Nodes (5): BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark()

### Community 108 - "xlsx.ts"
Cohesion: 0.08
Nodes (52): RFC-4180, fflate, csvDelimiter(), csvToSheet(), italian(), parseCsv(), splitRecords(), readNumber() (+44 more)

### Community 110 - "page.ts"
Cohesion: 0.06
Nodes (49): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), currentAccount(), PullResult, openShareDialog(), changeAccess() (+41 more)

### Community 113 - "sidePanel.ts"
Cohesion: 0.20
Nodes (6): AiResult, isConfidentAnswer(), CATEGORIES, symbolsInCategory(), AiState, EMPTY_GROUP_TEX

### Community 116 - "view3d.ts"
Cohesion: 0.06
Nodes (64): figureName(), graphFigure(), graphImage(), graphsFromFile(), OPEN, swatchSvg(), titleBand(), unhide() (+56 more)

### Community 121 - "sheet.ts"
Cohesion: 0.07
Nodes (41): FieldContext, criticalLine(), named(), severalItems(), surface(), names(), STUDY_GRAPH, studyItems() (+33 more)

### Community 123 - "renderTex"
Cohesion: 0.25
Nodes (5): cleanKatexError(), renderTex(), displayCode(), preventFocusSteal(), SidePanel

### Community 125 - "sql.ts"
Cohesion: 0.17
Nodes (17): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+9 more)

### Community 127 - "Glifo"
Cohesion: 0.14
Nodes (14): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Funzionalità (+6 more)

### Community 128 - "createFakeSupabase"
Cohesion: 0.60
Nodes (6): createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 129 - "smoke-test.mjs"
Cohesion: 0.25
Nodes (5): playwright-core, vite, fakeLlmWorker(), firstVisit(), plainContext

### Community 131 - "dom.ts"
Cohesion: 0.08
Nodes (30): SyncStatus, AccountButton, messageOf(), openAccountDialog(), openLoginDialog(), codeStep(), emailStep(), shortStatus() (+22 more)

### Community 133 - "SuggestionController"
Cohesion: 0.14
Nodes (11): EditorMathContext, expand(), preferredIndex(), SuggestionController, cardPreviewTex(), formPreviewTex(), ParsedTemplate, parseTemplate() (+3 more)

## Knowledge Gaps
- **639 isolated node(s):** `Deciso`, `Com'è andata la discussione`, `La proposta dello studente (4 ottobre 2026)`, `Il parere di Claude, in breve`, `Come si decide cosa far pagare` (+634 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 886 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **22 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `touchlog.ts`, `smoke-test.mjs`, `main.ts`, `odesolve.ts`, `parse.ts`, `spec.ts`, `toLatex`, `num`, `graph/preview.ts`, `explain.ts`, `complex.ts`, `dom.ts`, `vitest`, `spreadsheet/editor.ts`, `SchemaEditor`, `conics.ts`, `h`, `compile`, `numerical.ts`, `markdown.ts`, `Board`, `BoardStore`, `MathError`, `assistant.ts`, `graph.ts`, `supabase.ts`, `numericalGraph.ts`, `gantt.ts`, `graph/space.ts`, `SheetEvaluator`, `logic.ts`, `Rational`, `namesIn`, `localModels.ts`, `statsShown.ts`, `Pt`, `NotesStore`, `study.ts`, `functions.ts`, `plan.ts`, `graphNote.test.ts`, `planPreview.ts`, `board/shapes.ts`, `schemaBlocks.ts`, `dialogs.ts`, `MarkdownEditor`, `latex.ts`, `board.ts`, `schemaTools.test.ts`, `schema/shapes.ts`, `account/space.ts`, `ui/preview.ts`, `linsys.ts`, `inference.ts`, `explainPanel.ts`, `selection.ts`, `FormatOptions`, `blockMove.ts`, `symbolic.ts`, `Sheet`, `schema/editor.ts`, `toolbar.ts`, `xlsx.ts`, `view3d.ts`?**
  _High betweenness centrality (0.165) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `touchlog.ts`, `parse.ts`, `main.ts`, `dom.ts`, `sync.ts`, `SuggestionController`, `num`, `explain.ts`, `editor/lists.ts`, `spreadsheet/editor.ts`, `markdown.ts`, `BoardStore`, `MathError`, `assistant.ts`, `supabase.ts`, `gantt.ts`, `graph/space.ts`, `SheetEvaluator`, `laplace.ts`, `localModels.ts`, `resize.ts`, `NotesStore`, `plan.ts`, `graphNote.test.ts`, `numerical.test.ts`, `board/shapes.ts`, `schemaBlocks.ts`, `search.ts`, `dialogs.ts`, `MarkdownEditor`, `board.ts`, `schemaTools.test.ts`, `account/space.ts`, `ui/preview.ts`, `linsys.ts`, `parseSchema`, `selection.ts`, `blockMove.ts`, `Sheet`, `editor/editor.ts`, `package.json`, `spell.test.ts`, `logo.ts`, `xlsx.ts`, `page.ts`, `sql.ts`?**
  _High betweenness centrality (0.085) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `main.ts`, `dom.ts`, `graph/preview.ts`, `spreadsheet/editor.ts`, `SchemaEditor`, `Board`, `graph.ts`, `resize.ts`, `NotesStore`, `planPreview.ts`, `dialogs.ts`, `board.ts`, `account/space.ts`, `ui/preview.ts`, `explainPanel.ts`, `schema/editor.ts`, `.folderItem`, `spell.test.ts`, `toolbar.ts`, `.constructor`, `ExplainPanel`, `page.ts`, `sidePanel.ts`, `renderTex`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Are the 221 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `adoptGuestNotes()`) actually correct?**
  _`Dove sono le cose` has 221 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Deciso`, `Com'è andata la discussione`, `La proposta dello studente (4 ottobre 2026)` to the rest of the system?**
  _639 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `touchlog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06721215663354763 - nodes in this community are weakly interconnected._
- **Should `parse.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07333333333333333 - nodes in this community are weakly interconnected._