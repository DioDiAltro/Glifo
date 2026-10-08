# Graph Report - matherdown  (2026-10-08)

## Corpus Check
- 305 files · ~591,576 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 4961 nodes · 17949 edges · 150 communities (118 shown, 32 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 560 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `587f4a87`
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
- explain.ts
- drawScene
- editor/lists.ts
- svg.ts
- graph.ts
- SchemaEditor
- schemaTools.test.ts
- SheetEditor
- domain.ts
- numerical.ts
- toLatex
- index.ts
- engine.ts
- calcPlugin
- Dove sono le cose
- store.ts
- MathError
- assistant.ts
- MarkdownEditor
- fourier.ts
- several.ts
- gantt.ts
- parse.ts
- search.ts
- editor/editor.ts
- logic.ts
- page.ts
- complex.ts
- namesIn
- view3d.ts
- resize.ts
- statsShown.ts
- Board
- sheet.ts
- study.ts
- functions.ts
- finite.ts
- FoldersStore
- vitest
- distributions.ts
- board/shapes.ts
- SheetEvaluator
- SidePanel
- dialogs.ts
- openShareDialog
- gauss.ts
- schemaBlocks.ts
- 20261004091555_note_condivise.sql
- selection.ts
- BoardStore
- odesolve.ts
- schema/shapes.ts
- dependencies
- explainPanel.ts
- calcResults.ts
- ui/preview.ts
- conics.ts
- spreadsheet/editor.ts
- statsGraph.ts
- smoke-test.mjs
- Benvenuto in Glifo
- compilerOptions
- Stroke
- Field
- feedback.ts
- symbolic.ts
- SuggestionController
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- downloadText
- session-start.sh
- .claude/CLAUDE.md
- blockMove.ts
- tutorial.mjs
- Abbonamenti
- spiegami-qwen.mjs
- Costi
- supabase-stub.sql
- account-test.mjs
- Il database degli account (Supabase)
- board.ts
- sidePanel.ts
- spell.test.ts
- supabase.ts
- files.ts
- severalGraph.ts
- touchLog
- fake-supabase.mjs
- localModels.ts
- xlsx.ts
- aiPanel.test.ts
- markdown.ts
- plan.ts
- Piano per piano
- ExplainPanel
- Rational
- siteUpdate.ts
- scripts
- Le spiegazioni, come funzionano
- BoardOptions
- Sheet
- sql.ts
- boardTouchLog.test.ts
- SlotWidget
- createFakeSupabase
- graph/file.ts
- h
- linsys.ts
- Parser
- 20261008130026_commenti.sql
- Glifo – note per Claude
- icons.mjs
- logo.ts
- Più avanti

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 261 edges
2. `MathError` - 151 edges
3. `num()` - 145 edges
4. `Sheet` - 139 edges
5. `MathNode` - 129 edges
6. `mul()` - 124 edges
7. `Board` - 118 edges
8. `compile()` - 113 edges
9. `Rational` - 111 edges
10. `h()` - 109 edges

## Surprising Connections (you probably didn't know these)
- `Dove sono le cose` --references--> `fakeLlmWorker()`  [INFERRED]
  ARCHITETTURA.md → scripts/smoke-test.mjs
- `Come viene pubblicata` --references--> `dist()`  [INFERRED]
  README.md → src/board/shapes.ts
- `Dove sono le cose` --references--> `WidgetKind`  [INFERRED]
  ARCHITETTURA.md → src/editor/schemaBlocks.ts
- `Dove sono le cose` --references--> `ConicElements`  [INFERRED]
  ARCHITETTURA.md → src/math/conics.ts
- `Dove sono le cose` --references--> `texts()`  [INFERRED]
  ARCHITETTURA.md → tests/boardTouchLog.test.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (150 total, 32 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.14
Nodes (16): at(), browserStore, clip(), KINDS, LOG_KEY, Moves, MOVES_MAX, pointerDetail() (+8 more)

### Community 1 - "Parser"
Cohesion: 0.17
Nodes (4): describe(), MathSyntaxError, Parser, parseStatement()

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (110): graphsForFile(), hide(), account, ACCOUNT_OFF, accountButton, active, aiToggle, app (+102 more)

### Community 3 - "compile"
Cohesion: 0.06
Nodes (59): complexValue(), define(), typedSliderValue(), argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension() (+51 more)

### Community 4 - "sync.ts"
Cohesion: 0.05
Nodes (43): AccountSync, withLock(), accountDataFile(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow (+35 more)

### Community 5 - "spec.ts"
Cohesion: 0.07
Nodes (56): conicItems(), isConicLine(), quadricEquation(), isNumericalLine(), numericalItems(), AXES, ComplexDefinitions, constantValue() (+48 more)

### Community 6 - "arithmetic.ts"
Cohesion: 0.06
Nodes (90): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+82 more)

### Community 7 - "num"
Cohesion: 0.13
Nodes (89): atIntegers(), withoutAbs(), exp(), hyperbolicToExp(), inverseRational(), sqrtEx(), termTransform(), polyEx() (+81 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (43): addLabel(), boxes, cameras, complexCoord(), containing(), coord(), drawings, drawnViews (+35 more)

### Community 9 - "explain.ts"
Cohesion: 0.06
Nodes (68): allNames(), answerFollowUp(), bareResult(), CHAT_SUBJECT, chatContext, ChatFn, chatSystemPrompt(), checkFormulas() (+60 more)

### Community 10 - "drawScene"
Cohesion: 0.18
Nodes (14): tickLabel(), Vec3, arrowHead(), boxShape(), Coverage, Directions, dot(), drawScene() (+6 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.09
Nodes (61): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+53 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (55): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseWindow(), chooseY(), clipLines(), dataWindow() (+47 more)

### Community 13 - "graph.ts"
Cohesion: 0.11
Nodes (29): AT_X, cellHtml(), cellText(), COMPASS, createEdgeCell(), createGraph(), drawSchema(), edgeLook() (+21 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.10
Nodes (4): isLanes(), SchemaEditor, withLaneContents(), serializeSchema()

### Community 15 - "schemaTools.test.ts"
Cohesion: 0.16
Nodes (18): laneOf(), alignBoxes(), Alignment, Box, distributeBoxes(), Position, labelHtml(), lanesHtml() (+10 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (4): rangeLabel(), SheetEditor, serializeSheet(), cloneSheet()

### Community 17 - "domain.ts"
Cohesion: 0.09
Nodes (48): constantIntegrand(), depth(), inequalityMargin(), integralRegion, LayeredSolid, Multiple, multipleOf(), planeMargin() (+40 more)

### Community 18 - "numerical.ts"
Cohesion: 0.08
Nodes (61): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Funzionalità (+53 more)

### Community 19 - "toLatex"
Cohesion: 0.09
Nodes (45): areaFor(), condLabel(), isStraight(), isVectorName(), itemFor(), linearItem(), looksLikePoint(), multipleLabel() (+37 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (41): b, bigops, c, calculus, fn, fr, fractions, functions (+33 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "calcPlugin"
Cohesion: 0.16
Nodes (5): acceptCalcResult(), calcPlugin, CheckWidget, insertResult(), ResultWidget

### Community 23 - "Dove sono le cose"
Cohesion: 0.12
Nodes (35): Dove sono le cose, Glifo – architettura, ATTRIBUTES, count(), cut(), definedName(), ER_SHAPES, fieldText() (+27 more)

### Community 24 - "store.ts"
Cohesion: 0.06
Nodes (33): fake-indexeddb, Prefs, BOARD_PALETTES, BoardPalette, BoardTheme, inkName(), mid(), outlineSvg() (+25 more)

### Community 25 - "MathError"
Cohesion: 0.10
Nodes (66): MathError, nameLabel(), UndefinedName, angleBetween(), asMatrix(), basisOf(), circleText(), cross() (+58 more)

### Community 26 - "assistant.ts"
Cohesion: 0.14
Nodes (18): @anthropic-ai/sdk, AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible() (+10 more)

### Community 27 - "MarkdownEditor"
Cohesion: 0.09
Nodes (20): closeMathBlockOnEnter(), EditorCallbacks, MarkdownEditor, tabOutOfMath(), insertBlock(), insertTemplate(), wrapSelection(), Action (+12 more)

### Community 28 - "fourier.ts"
Cohesion: 0.13
Nodes (25): boundsOf(), close(), definite(), fourierProblem, fourierShown(), isTrig(), isZero(), linearTrig() (+17 more)

### Community 29 - "several.ts"
Cohesion: 0.14
Nodes (36): at(), bounded(), Candidate, candidates(), compiled(), constraintsOf(), COORDS, coordShown() (+28 more)

### Community 30 - "gantt.ts"
Cohesion: 0.06
Nodes (68): amount(), barColor(), crossings(), dateText(), dayOf(), fitText(), GanttOptions, ganttSvg() (+60 more)

### Community 31 - "parse.ts"
Cohesion: 0.06
Nodes (38): hasWord(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, differentialInFraction() (+30 more)

### Community 32 - "search.ts"
Cohesion: 0.17
Nodes (24): editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex() (+16 more)

### Community 33 - "editor/editor.ts"
Cohesion: 0.06
Nodes (40): description, devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript (+32 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "page.ts"
Cohesion: 0.05
Nodes (58): accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf() (+50 more)

### Community 36 - "complex.ts"
Cohesion: 0.08
Nodes (52): add(), allRoots(), arg(), asin(), atan(), compileApply(), compileComplex(), compileFunction() (+44 more)

### Community 37 - "namesIn"
Cohesion: 0.15
Nodes (34): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+26 more)

### Community 38 - "view3d.ts"
Cohesion: 0.07
Nodes (79): staticGraphSvg(), addMesh(), addTet(), affinePlane(), Axis, Box, centroid(), chooseBox() (+71 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "statsShown.ts"
Cohesion: 0.17
Nodes (31): check(), correlation(), count(), covariance(), Data, dataStatistic(), deviation(), fail() (+23 more)

### Community 41 - "Board"
Cohesion: 0.09
Nodes (5): Board, loadPrefs(), penErases(), sizeChoice(), highlightName()

### Community 42 - "sheet.ts"
Cohesion: 0.06
Nodes (54): OdeFunction, decimalSeparator(), Digits, formatNumber(), FormatOptions, formatRational(), fromNumber(), fromRational() (+46 more)

### Community 43 - "study.ts"
Cohesion: 0.09
Nodes (50): close(), Definite, definiteIntegral(), exValue(), samples(), EMPTY_SCOPE, alternating(), close() (+42 more)

### Community 44 - "functions.ts"
Cohesion: 0.09
Nodes (59): EMPTY, number(), addFormat(), divFormat(), GENERAL, mulFormat(), tidy(), withCents() (+51 more)

### Community 45 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 46 - "FoldersStore"
Cohesion: 0.15
Nodes (4): cleanFolderName(), FoldersStore, sameName(), names()

### Community 47 - "vitest"
Cohesion: 0.06
Nodes (46): vitest, addToGraphBlock(), formulaAtCursor(), GraphLabelLines, insertGraphBlock(), setGraphLabels(), areaOf(), formulaGraph() (+38 more)

### Community 48 - "distributions.ts"
Cohesion: 0.06
Nodes (61): choose(), continuousQuantile(), discreteQuantile(), Distribution, expSumValue(), factorialBig(), FAMILIES, Family (+53 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.14
Nodes (33): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+25 more)

### Community 50 - "SheetEvaluator"
Cohesion: 0.12
Nodes (17): SheetEditorOptions, Snapshot, evaluateSheet(), SheetEvaluator, hide(), OPEN, sheetsForFile(), sheetsFromFile() (+9 more)

### Community 51 - "SidePanel"
Cohesion: 0.18
Nodes (5): isConfidentAnswer(), symbolsInCategory(), displayCode(), preventFocusSteal(), SidePanel

### Community 52 - "dialogs.ts"
Cohesion: 0.10
Nodes (25): EXPLAIN_TONES, ExplainTone, DEFAULT_LOCAL_MODEL, AI_SERVICES, aiService, ACCOUNT_SETTINGS, accountSettings(), AI_MODELS (+17 more)

### Community 53 - "openShareDialog"
Cohesion: 0.11
Nodes (28): openShareDialog(), changeAccess(), changeCopy(), refreshChanged(), render(), run(), setStatus(), shareNow() (+20 more)

### Community 54 - "gauss.ts"
Cohesion: 0.14
Nodes (22): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexLine(), isComplexValue() (+14 more)

### Community 55 - "schemaBlocks.ts"
Cohesion: 0.11
Nodes (19): toggleLinePrefix(), LIST_STYLES, besideSchema(), BlockWidget, findWidgetBlocks(), guardBlocks(), KINDS, schemaBlockRanges() (+11 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "selection.ts"
Cohesion: 0.09
Nodes (38): centerOn(), copyStrokes(), cross(), IDENTITY, insideLasso(), keepInside(), LASSO_SHARE, lassoed() (+30 more)

### Community 58 - "BoardStore"
Cohesion: 0.13
Nodes (4): BoardStore, MemoryBoards, applyAccountChange(), backup()

### Community 59 - "odesolve.ts"
Cohesion: 0.08
Nodes (82): absOf(), splitAbs(), linearIn(), addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots() (+74 more)

### Community 60 - "schema/shapes.ts"
Cohesion: 0.08
Nodes (16): @maxgraph/core, ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape (+8 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "explainPanel.ts"
Cohesion: 0.15
Nodes (12): Explanation, FollowUp, REPLY_TOKENS, explanationMarkdown(), ExplainChat, ExplainChatDeps, Turn, Asked (+4 more)

### Community 63 - "calcResults.ts"
Cohesion: 0.05
Nodes (60): @codemirror/language, @codemirror/state, @codemirror/view, @lezer/common, explainTarget, CalcCheck, calcOutcomes(), CalcResult (+52 more)

### Community 64 - "ui/preview.ts"
Cohesion: 0.08
Nodes (23): GraphLabels, renameGraphScope(), renameScopeKeys(), BlockKind, MoveDir, draw(), drawCached(), drawn (+15 more)

### Community 65 - "conics.ts"
Cohesion: 0.18
Nodes (29): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+21 more)

### Community 66 - "spreadsheet/editor.ts"
Cohesion: 0.07
Nodes (67): currentCall(), Editing, MenuEntry, Move, openSheetEditor(), PATHS, formatCode(), formatValue() (+59 more)

### Community 67 - "statsGraph.ts"
Cohesion: 0.22
Nodes (15): isTestLine(), number(), testItems(), classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX (+7 more)

### Community 68 - "smoke-test.mjs"
Cohesion: 0.29
Nodes (4): markdown-it, fakeLlmWorker(), firstVisit(), plainContext

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "Stroke"
Cohesion: 0.32
Nodes (3): shapeSvg(), shapePoints(), Stroke

### Community 72 - "Field"
Cohesion: 0.12
Nodes (5): characteristicPolynomial(), Field, formatPolynomial(), interpolate(), polynomialIn()

### Community 73 - "feedback.ts"
Cohesion: 0.08
Nodes (34): vite-plugin-pwa, AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, SyncStatus, accountOffMessage(), Site, AccountButton (+26 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (56): primitive(), linearCells(), atValues(), Converter, coordinates(), decimalText(), definiteParts(), definiteValue() (+48 more)

### Community 75 - "SuggestionController"
Cohesion: 0.20
Nodes (4): EditorMathContext, expand(), preferredIndex(), SuggestionController

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.04
Nodes (76): schemaSummary(), ALIGN, ARROW_NAMES, AT_ICONS, AT_NAMES, BASE_PRESETS, BIG_ARROWS, DB_PRESETS (+68 more)

### Community 79 - "downloadText"
Cohesion: 0.13
Nodes (18): svg(), loadDialect(), base64(), hide(), OPEN, schemasForFile(), schemasFromFile(), unhide() (+10 more)

### Community 82 - "blockMove.ts"
Cohesion: 0.11
Nodes (34): blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove, blockPlace(), closed() (+26 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.12
Nodes (10): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+2 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.08
Nodes (24): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Deciso (5 ottobre 2026), Deciso (5 ottobre 2026) (+16 more)

### Community 91 - "spiegami-qwen.mjs"
Cohesion: 0.29
Nodes (4): vite, minutes, postMessage(), started

### Community 92 - "Costi"
Cohesion: 0.21
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, Quando lo studente dice di cominciare

### Community 96 - "account-test.mjs"
Cohesion: 0.20
Nodes (4): device(), login(), newContext, waitFor()

### Community 97 - "Il database degli account (Supabase)"
Cohesion: 0.17
Nodes (11): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Nell'app, Note condivise con un link (+3 more)

### Community 98 - "board.ts"
Cohesion: 0.06
Nodes (38): Action, ACTION_NAMES, clampZoom(), coalesced(), DOT_SIZES, DrawAction, EraseAction, EraserMode (+30 more)

### Community 100 - "sidePanel.ts"
Cohesion: 0.24
Nodes (13): SuggestionItem, CATEGORIES, cardPreviewTex(), formPreviewTex(), ParsedTemplate, parseTemplate(), PLACEHOLDER_TEX, placeholderPreview() (+5 more)

### Community 101 - "spell.test.ts"
Cohesion: 0.07
Nodes (29): @codemirror/lang-markdown, noIndentedCode, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close() (+21 more)

### Community 102 - "supabase.ts"
Cohesion: 0.12
Nodes (30): @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken(), ensureSessionOf() (+22 more)

### Community 103 - "files.ts"
Cohesion: 0.12
Nodes (22): cache, capability(), ClaudeRuntime, hostDownloads, HostError, hostSample, inClaudeViewer(), isHostError() (+14 more)

### Community 104 - "severalGraph.ts"
Cohesion: 0.22
Nodes (15): FieldContext, fourierItems(), isFourierLine(), criticalLine(), isSeveralLine(), named(), severalItems(), surface() (+7 more)

### Community 105 - "touchLog"
Cohesion: 0.31
Nodes (3): movesLine(), seconds(), touchLog

### Community 106 - "fake-supabase.mjs"
Cohesion: 0.25
Nodes (6): @electric-sql/pglite, b64(), CODE, GOOGLE_CODE, ROOT, SUPABASE_URL

### Community 107 - "localModels.ts"
Cohesion: 0.10
Nodes (26): @mlc-ai/web-llm, chat(), GlifoError, Gpu, load(), post(), remove(), scope (+18 more)

### Community 108 - "xlsx.ts"
Cohesion: 0.08
Nodes (48): RFC-4180, fflate, csvDelimiter(), csvToSheet(), field(), italian(), parseCsv(), sheetToCsv() (+40 more)

### Community 110 - "aiPanel.test.ts"
Cohesion: 0.15
Nodes (9): Pending, fakeModel(), FLOW, GRAPH_FIXED, GRAPH_STEPS, NOTE, setup(), SHEET (+1 more)

### Community 113 - "markdown.ts"
Cohesion: 0.08
Nodes (43): valueNode(), labelHtml(), texHtml(), dataRange(), moveAttrs(), checkHtml(), checkTitle(), cache (+35 more)

### Community 116 - "plan.ts"
Cohesion: 0.09
Nodes (38): at(), breakEven(), Point, quantity(), tableItems(), textLabel(), chartData, chartFrom() (+30 more)

### Community 117 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 118 - "ExplainPanel"
Cohesion: 0.22
Nodes (3): ExplainPanel, preventFocusSteal(), setup()

### Community 119 - "Rational"
Cohesion: 0.06
Nodes (49): addExp(), End, exactIntervalProbability(), expSum, subtractExp(), bigGcd(), binomExact(), conditionExact() (+41 more)

### Community 120 - "siteUpdate.ts"
Cohesion: 0.16
Nodes (18): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, loadPart() (+10 more)

### Community 121 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 124 - "Sheet"
Cohesion: 0.07
Nodes (34): Definition, Line, ExactComplexScope, Ode, withWorkLimit(), FiniteContext, FormattedResult, differentialRequest (+26 more)

### Community 125 - "sql.ts"
Cohesion: 0.18
Nodes (17): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+9 more)

### Community 126 - "boardTouchLog.test.ts"
Cohesion: 0.20
Nodes (8): isSaved(), LOG_MAX_LINES, LogStore, SavedLog, clock(), memoryStore(), newLog(), texts()

### Community 128 - "createFakeSupabase"
Cohesion: 0.60
Nodes (6): createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 129 - "graph/file.ts"
Cohesion: 0.10
Nodes (37): FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsFromFile(), OPEN, swatchSvg() (+29 more)

### Community 131 - "h"
Cohesion: 0.06
Nodes (35): NoteSubject, viewSwitch, AiPanel, graphLabel(), KIND_NAMES, texInline(), append(), Child (+27 more)

### Community 132 - "linsys.ts"
Cohesion: 0.08
Nodes (66): choices(), gcd(), isStandardUnknown(), linearSystem(), matrixEquation(), matrixSystem(), minorsGcd(), ONE (+58 more)

### Community 133 - "Parser"
Cohesion: 0.29
Nodes (3): FormulaError, parseFormula(), Parser

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 140 - "Glifo – note per Claude"
Cohesion: 0.22
Nodes (9): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole (+1 more)

### Community 157 - "logo.ts"
Cohesion: 0.39
Nodes (5): BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark()

### Community 162 - "Più avanti"
Cohesion: 0.29
Nodes (7): Account: i propri appunti su ogni dispositivo, anche da condividere, Commenti di chi prova Glifo, Idee per il futuro, In programma, La lavagna: idee in più, Più avanti, Schemi: idee in più

## Knowledge Gaps
- **671 isolated node(s):** `session-start.sh script`, `name`, `private`, `version`, `description` (+666 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 938 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **32 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `touchlog.ts`, `Parser`, `main.ts`, `compile`, `spec.ts`, `arithmetic.ts`, `num`, `graph/preview.ts`, `explain.ts`, `drawScene`, `svg.ts`, `graph.ts`, `SchemaEditor`, `schemaTools.test.ts`, `SheetEditor`, `numerical.ts`, `toLatex`, `store.ts`, `MathError`, `assistant.ts`, `MarkdownEditor`, `fourier.ts`, `several.ts`, `gantt.ts`, `parse.ts`, `logic.ts`, `page.ts`, `complex.ts`, `namesIn`, `view3d.ts`, `Board`, `sheet.ts`, `study.ts`, `functions.ts`, `finite.ts`, `vitest`, `distributions.ts`, `board/shapes.ts`, `SheetEvaluator`, `SidePanel`, `dialogs.ts`, `gauss.ts`, `schemaBlocks.ts`, `selection.ts`, `BoardStore`, `odesolve.ts`, `schema/shapes.ts`, `explainPanel.ts`, `calcResults.ts`, `ui/preview.ts`, `conics.ts`, `spreadsheet/editor.ts`, `smoke-test.mjs`, `Stroke`, `feedback.ts`, `symbolic.ts`, `schema/editor.ts`, `downloadText`, `blockMove.ts`, `board.ts`, `sidePanel.ts`, `spell.test.ts`, `supabase.ts`, `files.ts`, `severalGraph.ts`, `touchLog`, `localModels.ts`, `xlsx.ts`, `markdown.ts`, `plan.ts`, `ExplainPanel`, `Rational`, `siteUpdate.ts`, `Sheet`, `boardTouchLog.test.ts`, `graph/file.ts`, `h`, `linsys.ts`, `Parser`?**
  _High betweenness centrality (0.160) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `touchlog.ts`, `graph/file.ts`, `main.ts`, `compile`, `sync.ts`, `h`, `num`, `explain.ts`, `editor/lists.ts`, `schemaTools.test.ts`, `store.ts`, `MathError`, `assistant.ts`, `logo.ts`, `gantt.ts`, `parse.ts`, `search.ts`, `editor/editor.ts`, `page.ts`, `view3d.ts`, `resize.ts`, `distributions.ts`, `board/shapes.ts`, `dialogs.ts`, `schemaBlocks.ts`, `selection.ts`, `calcResults.ts`, `ui/preview.ts`, `spreadsheet/editor.ts`, `feedback.ts`, `downloadText`, `blockMove.ts`, `board.ts`, `sidePanel.ts`, `spell.test.ts`, `supabase.ts`, `localModels.ts`, `xlsx.ts`, `aiPanel.test.ts`, `markdown.ts`, `plan.ts`, `Rational`, `siteUpdate.ts`, `Sheet`, `sql.ts`, `boardTouchLog.test.ts`?**
  _High betweenness centrality (0.109) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `main.ts`, `graph/preview.ts`, `graph.ts`, `SchemaEditor`, `SheetEditor`, `MarkdownEditor`, `gantt.ts`, `page.ts`, `resize.ts`, `Board`, `SidePanel`, `dialogs.ts`, `openShareDialog`, `explainPanel.ts`, `ui/preview.ts`, `spreadsheet/editor.ts`, `feedback.ts`, `schema/editor.ts`, `downloadText`, `board.ts`, `sidePanel.ts`, `spell.test.ts`, `markdown.ts`, `ExplainPanel`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **Are the 260 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `adoptGuestNotes()`) actually correct?**
  _`Dove sono le cose` has 260 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `name`, `private` to the rest of the system?**
  _671 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `touchlog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.039561035090096196 - nodes in this community are weakly interconnected._