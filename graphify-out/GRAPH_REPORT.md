# Graph Report - matherdown  (2026-10-08)

## Corpus Check
- 311 files · ~599,423 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5002 nodes · 18067 edges · 151 communities (117 shown, 34 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 571 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9d773f2b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- touchlog.ts
- parse.ts
- main.ts
- compile
- sync.ts
- spec.ts
- vitest
- mul
- graph/preview.ts
- Dove sono le cose
- markdown.ts
- editor/lists.ts
- svg.ts
- Stroke
- SchemaEditor
- Board
- SheetEditor
- editor.test.ts
- numerical.ts
- arithmetic.ts
- index.ts
- engine.ts
- explainPanel.ts
- escapeHtml
- store.ts
- MathError
- assistant.ts
- dialogs.ts
- .folderItem
- several.ts
- gantt.ts
- calcResults.ts
- search.ts
- spell.test.ts
- logic.ts
- NotesStore
- complex.ts
- namesIn
- view3d.ts
- resize.ts
- statsShown.ts
- schemaBlocks.ts
- scopeWith
- study.ts
- functions.ts
- finite.ts
- sheet.ts
- toLatex
- probability.ts
- board/shapes.ts
- topics.ts
- SidePanel
- Pt
- feedback.ts
- graph.ts
- ui/preview.ts
- 20261004091555_note_condivise.sql
- selection.ts
- FoldersStore
- num
- plan.ts
- dependencies
- h
- inference.ts
- Glifo – note per Claude
- Piano per piano
- spreadsheet/editor.ts
- sidePanel.ts
- smoke-test.mjs
- Benvenuto in Glifo
- compilerOptions
- formatNumber
- Field
- MarkdownEditor
- symbolic.ts
- Costi
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- statsGraph.ts
- session-start.sh
- .claude/CLAUDE.md
- blockMove.ts
- tutorial.mjs
- Abbonamenti
- spiegami-qwen.mjs
- supabase-stub.sql
- account-test.mjs
- Il database degli account (Supabase)
- board.ts
- Glifo
- page.ts
- supabase.ts
- files.ts
- solve.ts
- La lavagna
- I modelli e le chiavi API
- localModels.ts
- xlsx.ts
- aiPanel.test.ts
- schema/shapes.ts
- spreadsheet/format.ts
- Più avanti
- ExplainPanel
- conics.ts
- siteUpdate.ts
- devDependencies
- Le spiegazioni, come funzionano
- BoardStore
- Sheet
- sql.ts
- severalGraph.ts
- SuggestionController
- createFakeSupabase
- graph/file.ts
- database.ts
- Rational
- Parser
- fake-supabase.mjs
- 20261008130026_commenti.sql
- deploy.test.ts
- editor/editor.ts

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 267 edges
2. `MathError` - 151 edges
3. `num()` - 145 edges
4. `Sheet` - 139 edges
5. `MathNode` - 129 edges
6. `mul()` - 124 edges
7. `Board` - 118 edges
8. `compile()` - 113 edges
9. `h()` - 113 edges
10. `Rational` - 111 edges

## Surprising Connections (you probably didn't know these)
- `Dove sono le cose` --references--> `fakeLlmWorker()`  [INFERRED]
  ARCHITETTURA.md → scripts/smoke-test.mjs
- `Come viene pubblicata` --references--> `dist()`  [INFERRED]
  README.md → src/board/shapes.ts
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

## Communities (151 total, 34 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.09
Nodes (27): at(), browserStore, clip(), isSaved(), KINDS, LOG_KEY, LOG_MAX_LINES, LogStore (+19 more)

### Community 1 - "parse.ts"
Cohesion: 0.07
Nodes (45): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe(), differentialInFraction() (+37 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (124): addToGraphBlock(), graphsForFile(), hide(), account, ACCOUNT_OFF, accountButton, accountProblem(), active (+116 more)

### Community 3 - "compile"
Cohesion: 0.08
Nodes (48): argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot(), fieldOn(), outward() (+40 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (33): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+25 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (92): formulaAtCursor(), GraphLabelLines, insertGraphBlock(), setGraphLabels(), conicItems(), isConicLine(), quadricEquation(), isComplexLine() (+84 more)

### Community 6 - "vitest"
Cohesion: 0.06
Nodes (33): vitest, specFor(), GraphItem, parseGraph(), PALETTES, light, text(), item() (+25 more)

### Community 7 - "mul"
Cohesion: 0.15
Nodes (67): atIntegers(), polyEx(), algebraic(), bigGcd(), byParts(), candidates(), canon(), combineLogs() (+59 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (44): addLabel(), boxes, cameras, complexCoord(), coord(), drawings, drawnViews, endTex() (+36 more)

### Community 9 - "Dove sono le cose"
Cohesion: 0.06
Nodes (69): Dove sono le cose, Glifo – architettura, allNames(), answerFollowUp(), bareResult(), CHAT_SUBJECT, chatContext, ChatFn (+61 more)

### Community 10 - "markdown.ts"
Cohesion: 0.09
Nodes (40): dataRange(), bulletGroup(), sameList(), moveAttrs(), renderTexOrError(), renderTexWithResult(), alignInside(), asciiTrim() (+32 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.10
Nodes (55): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+47 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (55): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), dataWindow(), domainEdge() (+47 more)

### Community 13 - "Stroke"
Cohesion: 0.15
Nodes (12): BOARD_PALETTES, BoardTheme, mid(), outlineSvg(), PEN_SIZE, shapeSvg(), strokeOptions(), strokeOutline() (+4 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.10
Nodes (6): SchemaEditor, withLaneContents(), cellText(), NodeLook, serializeSchema(), tableMetrics()

### Community 15 - "Board"
Cohesion: 0.10
Nodes (4): Board, loadPrefs(), highlightName(), inkName()

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (6): tablesNote(), rangeLabel(), SheetEditor, serializeSheet(), CellRange, cloneSheet()

### Community 17 - "editor.test.ts"
Cohesion: 0.07
Nodes (30): @lezer/common, closeMathBlockOnEnter(), tabOutOfMath(), templateInsertion(), CODE_NODES, CommandToken, commandTokenAt(), isInCode() (+22 more)

### Community 18 - "numerical.ts"
Cohesion: 0.12
Nodes (47): FormatOptions, bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial() (+39 more)

### Community 19 - "arithmetic.ts"
Cohesion: 0.08
Nodes (63): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+55 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (41): b, bigops, c, calculus, fn, fr, fractions, functions (+33 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "explainPanel.ts"
Cohesion: 0.15
Nodes (23): explainTarget, Explanation, REPLY_TOKENS, explanationMarkdown(), hasCalculation(), insertAfterBlock(), insertAfterText(), insertExplanation() (+15 more)

### Community 23 - "escapeHtml"
Cohesion: 0.21
Nodes (10): NoteSubject, checkHtml(), checkTitle(), escapeHtml(), AiPanel, graphLabel(), texInline(), sentenceHtml() (+2 more)

### Community 24 - "store.ts"
Cohesion: 0.08
Nodes (16): fake-indexeddb, BoardBackend, BoardChange, BoardData, done(), fromRecord(), IdbBoards, MemoryBoards (+8 more)

### Community 25 - "MathError"
Cohesion: 0.10
Nodes (65): MathError, angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, dataOf() (+57 more)

### Community 26 - "assistant.ts"
Cohesion: 0.16
Nodes (18): @anthropic-ai/sdk, AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible() (+10 more)

### Community 27 - "dialogs.ts"
Cohesion: 0.09
Nodes (24): EXPLAIN_TONES, ExplainTone, DEFAULT_LOCAL_MODEL, AI_SERVICES, aiService, aiSettingsOf(), ACCOUNT_SETTINGS, accountSettings() (+16 more)

### Community 28 - ".folderItem"
Cohesion: 0.20
Nodes (4): clear(), formatDate(), NotesPanel, NotesPanelDeps

### Community 29 - "several.ts"
Cohesion: 0.07
Nodes (76): EMPTY_SCOPE, absOf(), boundsOf(), close(), fourierProblem, fourierShown(), isTrig(), isZero() (+68 more)

### Community 30 - "gantt.ts"
Cohesion: 0.05
Nodes (71): amount(), barColor(), crossings(), dateText(), dayOf(), fitText(), GanttOptions, ganttSvg() (+63 more)

### Community 31 - "calcResults.ts"
Cohesion: 0.11
Nodes (15): acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult, calcResults(), CheckWidget, formulasUntil() (+7 more)

### Community 32 - "search.ts"
Cohesion: 0.17
Nodes (23): editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex() (+15 more)

### Community 33 - "spell.test.ts"
Cohesion: 0.08
Nodes (23): @codemirror/lang-markdown, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt() (+15 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "NotesStore"
Cohesion: 0.07
Nodes (45): accountSpace(), adoptGuestNotes(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf(), setCurrentAccount() (+37 more)

### Community 36 - "complex.ts"
Cohesion: 0.06
Nodes (64): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isInequality(), realEverywhere() (+56 more)

### Community 37 - "namesIn"
Cohesion: 0.15
Nodes (33): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+25 more)

### Community 38 - "view3d.ts"
Cohesion: 0.06
Nodes (87): addMesh(), addTet(), affinePlane(), Axis, Box, centroid(), chooseBox(), clipBy() (+79 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "statsShown.ts"
Cohesion: 0.17
Nodes (31): check(), correlation(), count(), covariance(), Data, dataStatistic(), deviation(), fail() (+23 more)

### Community 41 - "schemaBlocks.ts"
Cohesion: 0.10
Nodes (24): @codemirror/state, @codemirror/view, InsertOptions, toggleLinePrefix(), addPlaceholders, Placeholder, besideSchema(), BlockWidget (+16 more)

### Community 42 - "scopeWith"
Cohesion: 0.10
Nodes (45): constantIntegrand(), inequalityMargin(), integralRegion, LayeredSolid, planeMargin(), planeParts(), radiusOf(), spaceLayers() (+37 more)

### Community 43 - "study.ts"
Cohesion: 0.15
Nodes (34): limit(), Asymptote, boundaries(), compiled(), cutsOf(), defined(), domainOf(), exact() (+26 more)

### Community 44 - "functions.ts"
Cohesion: 0.09
Nodes (59): EMPTY, number(), addFormat(), divFormat(), GENERAL, mulFormat(), tidy(), withCents() (+51 more)

### Community 45 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 46 - "sheet.ts"
Cohesion: 0.06
Nodes (35): numericPartials(), complex, expSumValue(), isCounter(), ExactFunction, ExactScope, Lin, LinearValue (+27 more)

### Community 47 - "toLatex"
Cohesion: 0.12
Nodes (33): isNumericalLine(), numericalItems(), areaFor(), names(), STUDY_GRAPH, studyItems(), ACCENT_COMMANDS, COMPLEX_FUNCTIONS (+25 more)

### Community 48 - "probability.ts"
Cohesion: 0.06
Nodes (63): addExp(), choose(), continuousQuantile(), discreteQuantile(), Distribution, End, exactIntervalProbability(), expSum (+55 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (35): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+27 more)

### Community 50 - "topics.ts"
Cohesion: 0.08
Nodes (45): ATTRIBUTES, count(), cut(), ER_SHAPES, fieldText(), fitLines(), flowOrder(), FREE_NAMES (+37 more)

### Community 51 - "SidePanel"
Cohesion: 0.20
Nodes (5): cleanKatexError(), renderTex(), displayCode(), preventFocusSteal(), SidePanel

### Community 52 - "Pt"
Cohesion: 0.12
Nodes (12): clampZoom(), coalesced(), EraseAction, Finger, LassoAction, pointsOf(), pressureOf(), validView() (+4 more)

### Community 53 - "feedback.ts"
Cohesion: 0.07
Nodes (46): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), PullResult, isShareToken(), parseSharedNote(), readSharedNote() (+38 more)

### Community 54 - "graph.ts"
Cohesion: 0.11
Nodes (27): fieldInput(), isLanes(), AT_X, COMPASS, createEdgeCell(), createGraph(), drawSchema(), edgeLook() (+19 more)

### Community 55 - "ui/preview.ts"
Cohesion: 0.10
Nodes (14): BlockKind, MoveDir, fill(), hydrateSchemas(), hydrateSheets(), BLOCK_NAMES, blockKindOf(), MOVABLE_BLOCKS (+6 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "selection.ts"
Cohesion: 0.09
Nodes (38): centerOn(), copyStrokes(), cross(), IDENTITY, insideLasso(), keepInside(), LASSO_SHARE, lassoed() (+30 more)

### Community 58 - "FoldersStore"
Cohesion: 0.17
Nodes (3): cleanFolderName(), FoldersStore, sameName()

### Community 59 - "num"
Cohesion: 0.07
Nodes (109): primed(), definite(), linearTrig(), E, exp(), HALF, hyperbolicToExp(), inverseRational() (+101 more)

### Community 60 - "plan.ts"
Cohesion: 0.16
Nodes (17): cellText(), columnRole(), columnsOf(), durationUnit(), isNumber(), isPlanRange(), MAX_ACTIVITIES, plain() (+9 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "h"
Cohesion: 0.06
Nodes (55): SyncStatus, viewSwitch, openShareDialog(), changeAccess(), changeCopy(), copy(), refreshChanged(), render() (+47 more)

### Community 63 - "inference.ts"
Cohesion: 0.16
Nodes (24): chiSquareTest(), confidence(), confidenceShown(), Given, hypothesisTest(), InferenceContext, interval(), meanOf() (+16 more)

### Community 64 - "Glifo – note per Claude"
Cohesion: 0.25
Nodes (8): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Regole, sqlite()

### Community 65 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 66 - "spreadsheet/editor.ts"
Cohesion: 0.08
Nodes (59): sheetSummary(), currentCall(), Editing, MenuEntry, Move, openSheetEditor(), PATHS, SheetEditorOptions (+51 more)

### Community 67 - "sidePanel.ts"
Cohesion: 0.16
Nodes (18): expand(), preferredIndex(), SuggestionItem, isConfidentAnswer(), CATEGORIES, commandNames(), symbolsInCategory(), cardPreviewTex() (+10 more)

### Community 68 - "smoke-test.mjs"
Cohesion: 0.16
Nodes (6): markdown-it, playwright-core, PNG_ICONS, fakeLlmWorker(), firstVisit(), plainContext

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "formatNumber"
Cohesion: 0.11
Nodes (32): formatGauss(), decimalSeparator(), Digits, formatNumber(), formatRational(), fromNumber(), fromRational(), SUPERSCRIPT (+24 more)

### Community 72 - "Field"
Cohesion: 0.12
Nodes (7): characteristicPolynomial(), eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn()

### Community 73 - "MarkdownEditor"
Cohesion: 0.10
Nodes (18): EditorCallbacks, MarkdownEditor, insertBlock(), insertTemplate(), wrapSelection(), Action, createToolbar(), insertCode() (+10 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.06
Nodes (60): primitive(), atValues(), combine(), commonMonomial(), commonPositive(), Converter, coordinates(), decimalText() (+52 more)

### Community 75 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, Quando lo studente dice di cominciare

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.04
Nodes (80): schemaSummary(), svg(), ALIGN, ARROW_NAMES, AT_ICONS, AT_NAMES, BASE_PRESETS, BIG_ARROWS (+72 more)

### Community 79 - "statsGraph.ts"
Cohesion: 0.18
Nodes (17): isTestLine(), number(), testItems(), classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX (+9 more)

### Community 82 - "blockMove.ts"
Cohesion: 0.10
Nodes (34): blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove, blockPlace(), closed() (+26 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.12
Nodes (10): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+2 more)

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

### Community 98 - "board.ts"
Cohesion: 0.06
Nodes (35): Action, ACTION_NAMES, BoardOptions, DOT_SIZES, DrawAction, EraserMode, HANDLE_REACH, ICON (+27 more)

### Community 100 - "Glifo"
Cohesion: 0.13
Nodes (15): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Commenti, Compatibilità con VS Code, Condividere una nota con un link (+7 more)

### Community 101 - "page.ts"
Cohesion: 0.10
Nodes (23): katex, currentAccount(), sidebarToggle(), SharedNote, body, draw(), isDark(), load() (+15 more)

### Community 102 - "supabase.ts"
Cohesion: 0.12
Nodes (31): @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken(), ensureSessionOf() (+23 more)

### Community 103 - "files.ts"
Cohesion: 0.11
Nodes (27): cache, capability(), ClaudeRuntime, hostDownloads, HostError, inClaudeViewer(), ModelTier, runtime() (+19 more)

### Community 104 - "solve.ts"
Cohesion: 0.11
Nodes (39): fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), alternating(), close() (+31 more)

### Community 105 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 106 - "I modelli e le chiavi API"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), In prova sul ramo `prova` (7 ottobre 2026): Qwen3 nel browser per «Spiegami», Le idee dello studente (5 ottobre 2026)

### Community 107 - "localModels.ts"
Cohesion: 0.09
Nodes (30): @mlc-ai/web-llm, chat(), GlifoError, Gpu, load(), post(), remove(), scope (+22 more)

### Community 108 - "xlsx.ts"
Cohesion: 0.06
Nodes (60): RFC-4180, fflate, formulaText(), tableTopic(), valueText(), csvDelimiter(), csvToSheet(), field() (+52 more)

### Community 110 - "aiPanel.test.ts"
Cohesion: 0.10
Nodes (26): FollowUp, definedName(), formulaTopic(), graphTopic(), numberText(), studyOf(), theoremTopic(), Settings (+18 more)

### Community 113 - "schema/shapes.ts"
Cohesion: 0.08
Nodes (17): @maxgraph/core, ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape (+9 more)

### Community 116 - "spreadsheet/format.ts"
Cohesion: 0.11
Nodes (35): at(), breakEven(), Point, quantity(), tableItems(), textLabel(), chartData, chartFrom() (+27 more)

### Community 117 - "Più avanti"
Cohesion: 0.18
Nodes (10): Promemoria per lo studente, Account: i propri appunti su ogni dispositivo, anche da condividere, Commenti di chi prova Glifo, Idee per il futuro, In programma, La lavagna: idee in più, Più avanti, Schemi: idee in più (+2 more)

### Community 118 - "ExplainPanel"
Cohesion: 0.14
Nodes (5): ExplainChat, ExplainPanel, preventFocusSteal(), formulasSummary(), setup()

### Community 119 - "conics.ts"
Cohesion: 0.18
Nodes (29): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+21 more)

### Community 120 - "siteUpdate.ts"
Cohesion: 0.17
Nodes (17): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, loadPart() (+9 more)

### Community 121 - "devDependencies"
Cohesion: 0.10
Nodes (18): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+10 more)

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "BoardStore"
Cohesion: 0.18
Nodes (4): BoardStore, validView(), applyAccountChange(), backup()

### Community 124 - "Sheet"
Cohesion: 0.07
Nodes (31): ExactComplexScope, compileOde(), Ode, bound(), withWorkLimit(), ExactRandom, FiniteContext, FormattedResult (+23 more)

### Community 125 - "sql.ts"
Cohesion: 0.17
Nodes (17): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+9 more)

### Community 126 - "severalGraph.ts"
Cohesion: 0.19
Nodes (17): FieldContext, fourierItems(), isFourierLine(), criticalLine(), isSeveralLine(), named(), severalItems(), surface() (+9 more)

### Community 128 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 129 - "graph/file.ts"
Cohesion: 0.08
Nodes (48): FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsFromFile(), OPEN, swatchSvg() (+40 more)

### Community 131 - "database.ts"
Cohesion: 0.23
Nodes (6): createDatabase(), createUser(), databaseTests(), feedbackTests(), migrations, shareTests()

### Community 132 - "Rational"
Cohesion: 0.07
Nodes (61): Part, bigGcd(), binomExact(), conditionExact(), evaluateExact(), exactRoot(), factorialExact(), modPow() (+53 more)

### Community 136 - "fake-supabase.mjs"
Cohesion: 0.25
Nodes (6): @electric-sql/pglite, b64(), CODE, GOOGLE_CODE, ROOT, SUPABASE_URL

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 139 - "deploy.test.ts"
Cohesion: 0.32
Nodes (3): vite-plugin-pwa, accountOffMessage(), defineFor()

### Community 158 - "editor/editor.ts"
Cohesion: 0.07
Nodes (34): description, name, private, type, version, @codemirror/autocomplete, @codemirror/commands, @codemirror/language (+26 more)

## Knowledge Gaps
- **675 isolated node(s):** `session-start.sh script`, `name`, `private`, `version`, `description` (+670 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 949 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **34 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `touchlog.ts`, `graph/file.ts`, `main.ts`, `compile`, `Rational`, `spec.ts`, `vitest`, `parse.ts`, `graph/preview.ts`, `mul`, `markdown.ts`, `deploy.test.ts`, `svg.ts`, `Stroke`, `SchemaEditor`, `Board`, `SheetEditor`, `numerical.ts`, `arithmetic.ts`, `explainPanel.ts`, `escapeHtml`, `MathError`, `assistant.ts`, `dialogs.ts`, `several.ts`, `gantt.ts`, `calcResults.ts`, `logic.ts`, `NotesStore`, `complex.ts`, `namesIn`, `view3d.ts`, `schemaBlocks.ts`, `study.ts`, `functions.ts`, `finite.ts`, `sheet.ts`, `toLatex`, `probability.ts`, `board/shapes.ts`, `topics.ts`, `SidePanel`, `Pt`, `graph.ts`, `ui/preview.ts`, `selection.ts`, `num`, `plan.ts`, `h`, `inference.ts`, `spreadsheet/editor.ts`, `sidePanel.ts`, `smoke-test.mjs`, `MarkdownEditor`, `symbolic.ts`, `schema/editor.ts`, `blockMove.ts`, `board.ts`, `page.ts`, `supabase.ts`, `files.ts`, `solve.ts`, `localModels.ts`, `xlsx.ts`, `aiPanel.test.ts`, `schema/shapes.ts`, `spreadsheet/format.ts`, `ExplainPanel`, `conics.ts`, `siteUpdate.ts`, `BoardStore`, `Sheet`, `severalGraph.ts`?**
  _High betweenness centrality (0.177) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `touchlog.ts`, `parse.ts`, `graph/file.ts`, `database.ts`, `Rational`, `compile`, `main.ts`, `mul`, `graph/preview.ts`, `Dove sono le cose`, `markdown.ts`, `deploy.test.ts`, `svg.ts`, `Stroke`, `editor/lists.ts`, `editor.test.ts`, `sync.ts`, `store.ts`, `MathError`, `assistant.ts`, `dialogs.ts`, `editor/editor.ts`, `gantt.ts`, `search.ts`, `spell.test.ts`, `NotesStore`, `view3d.ts`, `resize.ts`, `schemaBlocks.ts`, `sheet.ts`, `probability.ts`, `board/shapes.ts`, `topics.ts`, `feedback.ts`, `selection.ts`, `plan.ts`, `h`, `spreadsheet/editor.ts`, `sidePanel.ts`, `schema/editor.ts`, `blockMove.ts`, `board.ts`, `page.ts`, `supabase.ts`, `localModels.ts`, `xlsx.ts`, `aiPanel.test.ts`, `spreadsheet/format.ts`, `siteUpdate.ts`, `sql.ts`?**
  _High betweenness centrality (0.109) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `main.ts`, `graph/preview.ts`, `SchemaEditor`, `Board`, `SheetEditor`, `explainPanel.ts`, `escapeHtml`, `dialogs.ts`, `.folderItem`, `gantt.ts`, `spell.test.ts`, `NotesStore`, `resize.ts`, `SidePanel`, `feedback.ts`, `graph.ts`, `ui/preview.ts`, `spreadsheet/editor.ts`, `sidePanel.ts`, `MarkdownEditor`, `schema/editor.ts`, `board.ts`, `page.ts`, `files.ts`, `aiPanel.test.ts`, `ExplainPanel`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **Are the 266 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `adoptGuestNotes()`) actually correct?**
  _`Dove sono le cose` has 266 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `name`, `private` to the rest of the system?**
  _675 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `touchlog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08653061224489796 - nodes in this community are weakly interconnected._
- **Should `parse.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07001493651979089 - nodes in this community are weakly interconnected._