# Graph Report - matherdown  (2026-10-09)

## Corpus Check
- 318 files · ~609,459 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5083 nodes · 18368 edges · 144 communities (108 shown, 36 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 590 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d5f4346a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- touchlog.ts
- Parser
- main.ts
- compile
- sync.ts
- spec.ts
- parse.ts
- num
- graph/preview.ts
- Dove sono le cose
- spreadsheet/format.ts
- editor/lists.ts
- svg.ts
- statsGraph.ts
- SchemaEditor
- Board
- SheetEditor
- graphNote.test.ts
- MathError
- arithmetic.ts
- index.ts
- engine.ts
- topics.ts
- downloadText
- store.ts
- linear.ts
- touchLog
- assistant.ts
- .folderItem
- laplace.ts
- gantt.ts
- editor/editor.ts
- search.ts
- spell.test.ts
- logic.ts
- .renderFormat
- complex.ts
- namesIn
- tutorial.ts
- resize.ts
- page.ts
- NotesStore
- several.ts
- study.ts
- functions.ts
- finite.ts
- view3d.ts
- host.ts
- distributions.ts
- board/shapes.ts
- markdown.ts
- SidePanel
- Pt
- vitest
- boardTouchLog.test.ts
- ui/preview.ts
- 20261004091555_note_condivise.sql
- board.ts
- src/relocation.ts
- odesolve.ts
- Glifo
- dependencies
- h
- geometry.test.ts
- explainSubjects.ts
- Piano per piano
- plan.ts
- blockMove.ts
- smoke-test.mjs
- Benvenuto in Glifo
- compilerOptions
- relocation-test.mjs
- probability.ts
- MarkdownEditor
- symbolic.ts
- sidePanel.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- toolbar.ts
- session-start.sh
- .claude/CLAUDE.md
- sheet.ts
- tutorial.mjs
- Abbonamenti
- explainPanel.ts
- Costi
- supabase-stub.sql
- account-test.mjs
- SheetModel
- ink.ts
- logo.ts
- toLatex
- suggestions.ts
- localModels.ts
- spreadsheet/editor.ts
- graph.ts
- Il database degli account (Supabase)
- Glifo – note per Claude
- ExplainPanel
- conics.ts
- supabase.ts
- Le spiegazioni, come funzionano
- Sheet
- sql.ts
- schemaTools.test.ts
- spiegami-qwen.mjs
- createFakeSupabase
- graph/file.ts
- Rational
- Parser
- 20261008130026_commenti.sql
- aiPanel.test.ts
- ref_node_fs
- scripts
- editor.test.ts

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 272 edges
2. `MathError` - 151 edges
3. `num()` - 145 edges
4. `Sheet` - 139 edges
5. `MathNode` - 129 edges
6. `mul()` - 124 edges
7. `h()` - 120 edges
8. `Board` - 118 edges
9. `compile()` - 113 edges
10. `Rational` - 111 edges

## Surprising Connections (you probably didn't know these)
- `Dove sono le cose` --references--> `fakeLlmWorker()`  [INFERRED]
  ARCHITETTURA.md → scripts/smoke-test.mjs
- `Come viene pubblicata` --references--> `dist()`  [INFERRED]
  README.md → src/board/shapes.ts
- `Trasloco: il sito su Cloudflare, con un dominio tutto di Glifo` --references--> `dist()`  [INFERRED]
  ROADMAP.md → src/board/shapes.ts
- `Dove sono le cose` --references--> `ConicElements`  [INFERRED]
  ARCHITETTURA.md → src/math/conics.ts
- `Funzionalità` --references--> `k()`  [INFERRED]
  README.md → src/math/numerical.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (144 total, 36 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.14
Nodes (16): at(), browserStore, clip(), KINDS, LOG_KEY, Moves, MOVES_MAX, pointerDetail() (+8 more)

### Community 2 - "main.ts"
Cohesion: 0.03
Nodes (121): remapGraphLines(), remapLineKeys(), account, ACCOUNT_OFF, active, aiShown(), aiToggle, aiWork (+113 more)

### Community 3 - "compile"
Cohesion: 0.04
Nodes (107): constantIntegrand(), depth(), inequalityMargin(), integralRegion, LayeredSolid, Multiple, planeMargin(), PlanePart (+99 more)

### Community 4 - "sync.ts"
Cohesion: 0.05
Nodes (40): @electric-sql/pglite, AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow (+32 more)

### Community 5 - "spec.ts"
Cohesion: 0.04
Nodes (103): conicItems(), isConicLine(), quadricEquation(), fourierItems(), isFourierLine(), isComplexLine(), isComplexValue(), isSegmentNode() (+95 more)

### Community 6 - "parse.ts"
Cohesion: 0.05
Nodes (52): hasWord(), typedSliderValue(), errorMessage(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS (+44 more)

### Community 7 - "num"
Cohesion: 0.13
Nodes (91): atIntegers(), withoutAbs(), exp(), hyperbolicToExp(), inverseRational(), sqrtEx(), termTransform(), polyEx() (+83 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (40): FIGURE_PALETTE, addLabel(), boxes, cameras, complexCoord(), containing(), coord(), drawings (+32 more)

### Community 9 - "Dove sono le cose"
Cohesion: 0.06
Nodes (71): Dove sono le cose, Glifo – architettura, allNames(), answerFollowUp(), bareResult(), CHAT_SUBJECT, chatContext, ChatFn (+63 more)

### Community 10 - "spreadsheet/format.ts"
Cohesion: 0.07
Nodes (48): sheetSummary(), at(), breakEven(), dataLine(), dataRange(), Point, quantity(), tableItems() (+40 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.09
Nodes (63): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+55 more)

### Community 12 - "svg.ts"
Cohesion: 0.08
Nodes (61): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseWindow(), chooseY(), clipLines(), dataWindow() (+53 more)

### Community 13 - "statsGraph.ts"
Cohesion: 0.14
Nodes (20): isTestLine(), number(), testItems(), Range, classes(), dataOf(), distributionExtent(), distributionLabel() (+12 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.12
Nodes (3): SchemaEditor, withLaneContents(), serializeSchema()

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (6): SheetEditor, decimalsOf(), serializeSheet(), sheetSize(), CellRange, cloneSheet()

### Community 17 - "graphNote.test.ts"
Cohesion: 0.09
Nodes (24): acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult, calcResults(), CheckWidget, formulasUntil() (+16 more)

### Community 18 - "MathError"
Cohesion: 0.13
Nodes (47): MathError, bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial() (+39 more)

### Community 19 - "arithmetic.ts"
Cohesion: 0.10
Nodes (47): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+39 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (41): b, bigops, c, calculus, fn, fr, fractions, functions (+33 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "topics.ts"
Cohesion: 0.20
Nodes (20): ATTRIBUTES, count(), cut(), ER_SHAPES, fieldText(), fitLines(), flowOrder(), formulaText() (+12 more)

### Community 23 - "downloadText"
Cohesion: 0.12
Nodes (20): svg(), graphsForFile(), hide(), markdownForFile(), loadDialect(), base64(), hide(), OPEN (+12 more)

### Community 24 - "store.ts"
Cohesion: 0.06
Nodes (19): fake-indexeddb, BoardOptions, BoardBackend, BoardStore, done(), fromRecord(), IdbBoards, MemoryBoards (+11 more)

### Community 25 - "linear.ts"
Cohesion: 0.05
Nodes (90): angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, dataOf(), determinant() (+82 more)

### Community 26 - "touchLog"
Cohesion: 0.31
Nodes (3): movesLine(), seconds(), touchLog

### Community 27 - "assistant.ts"
Cohesion: 0.13
Nodes (19): @anthropic-ai/sdk, AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible() (+11 more)

### Community 29 - "laplace.ts"
Cohesion: 0.08
Nodes (53): expSumValue(), EMPTY_SCOPE, absOf(), boundsOf(), close(), definite(), fourierProblem, fourierShown() (+45 more)

### Community 30 - "gantt.ts"
Cohesion: 0.06
Nodes (72): amount(), barColor(), crossings(), dateText(), dayOf(), fitText(), GanttOptions, ganttSvg() (+64 more)

### Community 31 - "editor/editor.ts"
Cohesion: 0.06
Nodes (35): description, devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript (+27 more)

### Community 32 - "search.ts"
Cohesion: 0.17
Nodes (24): editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex() (+16 more)

### Community 33 - "spell.test.ts"
Cohesion: 0.08
Nodes (23): @codemirror/lang-markdown, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt() (+15 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - ".renderFormat"
Cohesion: 0.15
Nodes (15): fieldInput(), isLanes(), cellText(), createEdgeCell(), edgeLook(), edgeStyle(), edgeTextAt(), insertSchema() (+7 more)

### Community 36 - "complex.ts"
Cohesion: 0.06
Nodes (63): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isInequality(), onlyComplex() (+55 more)

### Community 37 - "namesIn"
Cohesion: 0.14
Nodes (36): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+28 more)

### Community 38 - "tutorial.ts"
Cohesion: 0.18
Nodes (11): HINT_MS, markTutorialSeen(), openTutorial(), show(), richText(), showTutorialHint(), close(), TUTORIAL_PAGES (+3 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "page.ts"
Cohesion: 0.05
Nodes (60): katex, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), PullResult, isShareToken(), parseSharedNote(), readSharedNote() (+52 more)

### Community 41 - "NotesStore"
Cohesion: 0.05
Nodes (45): accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), knowsAccount(), prefixOf(), setCurrentAccount() (+37 more)

### Community 42 - "several.ts"
Cohesion: 0.10
Nodes (48): Piece, Condition, Family, Group, Root, Shape, fractionNear(), at() (+40 more)

### Community 43 - "study.ts"
Cohesion: 0.16
Nodes (32): Asymptote, boundaries(), compiled(), cutsOf(), defined(), domainOf(), exact(), inDomain() (+24 more)

### Community 44 - "functions.ts"
Cohesion: 0.09
Nodes (60): EMPTY, number(), addFormat(), divFormat(), GENERAL, most(), mulFormat(), tidy() (+52 more)

### Community 45 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 46 - "view3d.ts"
Cohesion: 0.06
Nodes (91): staticGraphSvg(), addMesh(), addTet(), affinePlane(), Axis, Box, centroid(), chooseBox() (+83 more)

### Community 47 - "host.ts"
Cohesion: 0.21
Nodes (9): cache, capability(), ClaudeRuntime, hostDownloads, HostError, hostSample, isHostError(), ModelTier (+1 more)

### Community 48 - "distributions.ts"
Cohesion: 0.07
Nodes (61): addExp(), choose(), continuousQuantile(), discreteQuantile(), exactIntervalProbability(), factorialBig(), FAMILIES, Family (+53 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (35): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+27 more)

### Community 50 - "markdown.ts"
Cohesion: 0.09
Nodes (43): dompurify, highlight.js, markdown-it-footnote, lineDepth(), parseBlockMath(), texHtml(), moveAttrs(), checkHtml() (+35 more)

### Community 51 - "SidePanel"
Cohesion: 0.20
Nodes (4): cleanKatexError(), displayCode(), preventFocusSteal(), SidePanel

### Community 52 - "Pt"
Cohesion: 0.11
Nodes (13): clampZoom(), coalesced(), Finger, LassoAction, PanAction, penErases(), PinchAction, pointsOf() (+5 more)

### Community 53 - "vitest"
Cohesion: 0.18
Nodes (4): vite-plugin-pwa, vitest, defineFor(), MAIN_BRANCH

### Community 54 - "boardTouchLog.test.ts"
Cohesion: 0.20
Nodes (8): isSaved(), LOG_MAX_LINES, LogStore, SavedLog, clock(), memoryStore(), newLog(), texts()

### Community 55 - "ui/preview.ts"
Cohesion: 0.08
Nodes (23): GraphLabels, renameGraphScope(), renameScopeKeys(), BlockKind, MoveDir, draw(), drawCached(), drawn (+15 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "board.ts"
Cohesion: 0.05
Nodes (68): Action, ACTION_NAMES, DOT_SIZES, DrawAction, EraseAction, EraserMode, HANDLE_REACH, ICON (+60 more)

### Community 58 - "src/relocation.ts"
Cohesion: 0.07
Nodes (52): isWelcome(), newStrokeId(), applySpellcheck(), receiveRelocation(), relocationReceived(), restore(), setPersonalWords(), wordsChangedHere() (+44 more)

### Community 59 - "odesolve.ts"
Cohesion: 0.08
Nodes (84): linearIn(), substitute(), addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled() (+76 more)

### Community 60 - "Glifo"
Cohesion: 0.13
Nodes (15): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Commenti, Compatibilità con VS Code, Condividere una nota con un link (+7 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "h"
Cohesion: 0.04
Nodes (81): SyncStatus, DEFAULT_LOCAL_MODEL, aiService, board, moveDayLabel(), RelocationResult, openShareDialog(), changeAccess() (+73 more)

### Community 63 - "geometry.test.ts"
Cohesion: 0.29
Nodes (6): light, pts, result(), square, text(), triangle

### Community 64 - "explainSubjects.ts"
Cohesion: 0.26
Nodes (13): explainTarget, hasCalculation(), targetAt(), SubjectKind, subjectsIn(), THEOREM_START, THEOREM_WORDS, theoremsIn() (+5 more)

### Community 65 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 66 - "plan.ts"
Cohesion: 0.08
Nodes (41): RFC-4180, csvDelimiter(), csvToSheet(), field(), italian(), parseCsv(), sheetToCsv(), splitRecords() (+33 more)

### Community 67 - "blockMove.ts"
Cohesion: 0.06
Nodes (53): @codemirror/commands, @codemirror/state, @codemirror/view, blockMoved, blockMoves(), blockMoveTransaction(), LineMap, BlockWidget (+45 more)

### Community 68 - "smoke-test.mjs"
Cohesion: 0.25
Nodes (5): fflate, markdown-it, fakeLlmWorker(), firstVisit(), plainContext

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "relocation-test.mjs"
Cohesion: 0.18
Nodes (7): AFTER_MOVE, ids, newBrowser(), NOTICE_DAY, out, serve(), TYPES

### Community 72 - "probability.ts"
Cohesion: 0.11
Nodes (27): End, CompileOptions, ExactScope, ALL, compileOf(), complement(), distributionOf(), divideExp() (+19 more)

### Community 73 - "MarkdownEditor"
Cohesion: 0.17
Nodes (4): EditorCallbacks, MarkdownEditor, insertTemplate(), setup()

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (58): primitive(), verified(), linearCells(), atValues(), Converter, coordinates(), decimalText(), definiteParts() (+50 more)

### Community 75 - "sidePanel.ts"
Cohesion: 0.19
Nodes (15): SuggestionItem, isConfidentAnswer(), CATEGORIES, symbolsInCategory(), cardPreviewTex(), formPreviewTex(), ParsedTemplate, parseTemplate() (+7 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.04
Nodes (72): schemaSummary(), ALIGN, ARROW_NAMES, AT_ICONS, AT_NAMES, BASE_PRESETS, BIG_ARROWS, DB_PRESETS (+64 more)

### Community 79 - "toolbar.ts"
Cohesion: 0.10
Nodes (25): insertBlock(), InsertOptions, toggleLinePrefix(), wrapSelection(), LIST_STYLES, addPlaceholders, Placeholder, besideSchema() (+17 more)

### Community 82 - "sheet.ts"
Cohesion: 0.04
Nodes (86): FieldContext, fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), realPart(), surd() (+78 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.12
Nodes (10): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+2 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.08
Nodes (24): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Deciso (5 ottobre 2026), Deciso (5 ottobre 2026) (+16 more)

### Community 91 - "explainPanel.ts"
Cohesion: 0.11
Nodes (24): ExplainTone, Explanation, FollowUp, REPLY_TOKENS, explanationMarkdown(), insertAfterBlock(), insertAfterText(), insertExplanation() (+16 more)

### Community 92 - "Costi"
Cohesion: 0.21
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 96 - "account-test.mjs"
Cohesion: 0.13
Nodes (9): device(), login(), newContext, waitFor(), b64(), CODE, GOOGLE_CODE, ROOT (+1 more)

### Community 97 - "SheetModel"
Cohesion: 0.47
Nodes (3): SheetEditorOptions, Snapshot, SheetModel

### Community 98 - "ink.ts"
Cohesion: 0.10
Nodes (19): perfect-freehand, loadPrefs(), Prefs, BOARD_PALETTES, BoardPalette, BoardTheme, highlightName(), inkName() (+11 more)

### Community 100 - "logo.ts"
Cohesion: 0.39
Nodes (5): BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark()

### Community 101 - "toLatex"
Cohesion: 0.10
Nodes (36): areaFor(), multipleLabel(), names(), STUDY_GRAPH, studyItems(), ACCENT_COMMANDS, COMPLEX_FUNCTIONS, diffLatex() (+28 more)

### Community 104 - "suggestions.ts"
Cohesion: 0.22
Nodes (4): EditorMathContext, expand(), preferredIndex(), SuggestionController

### Community 107 - "localModels.ts"
Cohesion: 0.09
Nodes (28): @mlc-ai/web-llm, chat(), GlifoError, Gpu, load(), post(), remove(), scope (+20 more)

### Community 108 - "spreadsheet/editor.ts"
Cohesion: 0.07
Nodes (76): currentCall(), Editing, MenuEntry, Move, PATHS, rangeLabel(), adjustFormula(), BinOp (+68 more)

### Community 113 - "graph.ts"
Cohesion: 0.05
Nodes (35): @maxgraph/core, AT_X, COMPASS, createGraph(), drawSchema(), isEdgeLook(), isNodeLook(), loadSchema() (+27 more)

### Community 116 - "Il database degli account (Supabase)"
Cohesion: 0.13
Nodes (14): Accesso con Google, Cambiare il database, Commenti di chi prova Glifo, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Il trasloco su glifo.page (ottobre 2026) (+6 more)

### Community 117 - "Glifo – note per Claude"
Cohesion: 0.11
Nodes (17): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole (+9 more)

### Community 118 - "ExplainPanel"
Cohesion: 0.14
Nodes (5): ExplainChat, ExplainPanel, preventFocusSteal(), formulasSummary(), setup()

### Community 119 - "conics.ts"
Cohesion: 0.18
Nodes (29): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+21 more)

### Community 121 - "supabase.ts"
Cohesion: 0.07
Nodes (49): @supabase/supabase-js, AUTH_STORAGE_KEY, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken() (+41 more)

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 124 - "Sheet"
Cohesion: 0.08
Nodes (28): ExactComplexScope, Ode, withWorkLimit(), FiniteContext, FormattedResult, Mat, MathNode, chainOf() (+20 more)

### Community 125 - "sql.ts"
Cohesion: 0.17
Nodes (17): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+9 more)

### Community 126 - "schemaTools.test.ts"
Cohesion: 0.17
Nodes (18): laneOf(), alignBoxes(), Alignment, Box, distributeBoxes(), Position, cellHtml(), labelHtml() (+10 more)

### Community 127 - "spiegami-qwen.mjs"
Cohesion: 0.29
Nodes (4): vite, minutes, postMessage(), started

### Community 128 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 129 - "graph/file.ts"
Cohesion: 0.09
Nodes (39): figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsFromFile(), OPEN, swatchSvg(), titleBand() (+31 more)

### Community 132 - "Rational"
Cohesion: 0.06
Nodes (80): integerPoly(), Part, expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactRandom (+72 more)

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 139 - "aiPanel.test.ts"
Cohesion: 0.12
Nodes (16): definedName(), formulaTopic(), graphTopic(), numberText(), studyOf(), theoremTopic(), NoteSubject, AiPanel (+8 more)

### Community 143 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 158 - "editor.test.ts"
Cohesion: 0.06
Nodes (37): @codemirror/language, @lezer/common, closeMathBlockOnEnter(), tabOutOfMath(), regionToExplain(), templateInsertion(), noIndentedCode, CODE_NODES (+29 more)

## Knowledge Gaps
- **692 isolated node(s):** `session-start.sh script`, `name`, `private`, `version`, `description` (+687 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 971 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **36 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `touchlog.ts`, `graph/file.ts`, `main.ts`, `compile`, `Rational`, `spec.ts`, `parse.ts`, `Parser`, `graph/preview.ts`, `num`, `spreadsheet/format.ts`, `aiPanel.test.ts`, `svg.ts`, `SchemaEditor`, `Board`, `SheetEditor`, `graphNote.test.ts`, `MathError`, `arithmetic.ts`, `topics.ts`, `downloadText`, `store.ts`, `linear.ts`, `touchLog`, `assistant.ts`, `laplace.ts`, `editor.test.ts`, `gantt.ts`, `logic.ts`, `.renderFormat`, `complex.ts`, `namesIn`, `tutorial.ts`, `page.ts`, `NotesStore`, `several.ts`, `study.ts`, `functions.ts`, `finite.ts`, `view3d.ts`, `distributions.ts`, `board/shapes.ts`, `markdown.ts`, `SidePanel`, `Pt`, `boardTouchLog.test.ts`, `ui/preview.ts`, `board.ts`, `src/relocation.ts`, `odesolve.ts`, `h`, `explainSubjects.ts`, `plan.ts`, `blockMove.ts`, `smoke-test.mjs`, `MarkdownEditor`, `symbolic.ts`, `sidePanel.ts`, `schema/editor.ts`, `toolbar.ts`, `sheet.ts`, `explainPanel.ts`, `ink.ts`, `localModels.ts`, `spreadsheet/editor.ts`, `graph.ts`, `ExplainPanel`, `conics.ts`, `supabase.ts`, `Sheet`, `schemaTools.test.ts`?**
  _High betweenness centrality (0.193) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `touchlog.ts`, `graph/file.ts`, `main.ts`, `sync.ts`, `spec.ts`, `parse.ts`, `Rational`, `num`, `Dove sono le cose`, `aiPanel.test.ts`, `svg.ts`, `editor/lists.ts`, `graphNote.test.ts`, `downloadText`, `store.ts`, `linear.ts`, `assistant.ts`, `editor.test.ts`, `editor/editor.ts`, `gantt.ts`, `search.ts`, `spell.test.ts`, `tutorial.ts`, `resize.ts`, `page.ts`, `NotesStore`, `view3d.ts`, `distributions.ts`, `board/shapes.ts`, `boardTouchLog.test.ts`, `ui/preview.ts`, `board.ts`, `src/relocation.ts`, `h`, `geometry.test.ts`, `plan.ts`, `blockMove.ts`, `MarkdownEditor`, `sidePanel.ts`, `toolbar.ts`, `sheet.ts`, `explainPanel.ts`, `ink.ts`, `logo.ts`, `toLatex`, `localModels.ts`, `spreadsheet/editor.ts`, `supabase.ts`, `Sheet`, `sql.ts`, `schemaTools.test.ts`?**
  _High betweenness centrality (0.116) - this node is a cross-community bridge._
- **Why does `Board` connect `Board` to `board.ts`, `ink.ts`, `main.ts`, `Pt`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **Are the 271 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `adoptGuestNotes()`) actually correct?**
  _`Dove sono le cose` has 271 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `name`, `private` to the rest of the system?**
  _692 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `touchlog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.033877995642701525 - nodes in this community are weakly interconnected._