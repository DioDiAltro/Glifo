# Graph Report - matherdown  (2026-10-08)

## Corpus Check
- 301 files · ~587,184 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 4931 nodes · 17887 edges · 156 communities (124 shown, 32 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 564 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ad68425c`
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
- toLatex
- editor/lists.ts
- svg.ts
- formatNumber
- SchemaEditor
- Rational
- SheetEditor
- domain.ts
- numerical.ts
- aiPanel.ts
- index.ts
- engine.ts
- calcResults.ts
- topics.ts
- store.ts
- MathError
- assistant.ts
- h
- suggestions.ts
- several.ts
- gantt.ts
- plan.ts
- search.ts
- editor/editor.ts
- logic.ts
- NotesStore
- complex.ts
- namesIn
- view3d.ts
- resize.ts
- statsShown.ts
- Board
- linsys.ts
- study.ts
- functions.ts
- finite.ts
- FoldersStore
- vitest
- distributions.ts
- board/shapes.ts
- storage.test.ts
- SidePanel
- dialogs.ts
- page.ts
- parse.ts
- toolbar.ts
- 20261004091555_note_condivise.sql
- board.ts
- schemaTools.test.ts
- odesolve.ts
- graph.ts
- dependencies
- strokes.ts
- MarkdownEditor
- ui/preview.ts
- toNode
- spreadsheet/editor.ts
- statsGraph.ts
- smoke-test.mjs
- Benvenuto in Glifo
- compilerOptions
- ink.ts
- llmWorker.ts
- notesPanel.ts
- symbolic.ts
- sheet.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- parseSchema
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
- devDependencies
- graphNote.test.ts
- supabase.ts
- files.ts
- Glifo
- spreadsheet.test.ts
- fake-supabase.mjs
- explainPanel.ts
- xlsx.ts
- explainSubjects.ts
- markdown.ts
- spreadsheet/format.ts
- Piano per piano
- ExplainPanel
- probability.ts
- toast
- .int
- Le spiegazioni, come funzionano
- fourier.ts
- Stroke
- sql.ts
- aiPanel.test.ts
- graph/file.ts
- tutorial.ts
- laplace.ts
- Parser
- powerseries.ts
- sidePanel.ts
- Glifo – note per Claude
- deploy.test.ts
- grafo-html.mjs
- .constructor
- createFakeSupabase
- icons.mjs
- logo.ts
- scripts
- Costi
- Idee per il futuro
- La lavagna
- I modelli e le chiavi API

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 267 edges
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
- `Dove sono le cose` --references--> `texts()`  [INFERRED]
  ARCHITETTURA.md → tests/boardTouchLog.test.ts
- `Funzionalità` --references--> `k()`  [INFERRED]
  README.md → src/math/numerical.ts
- `Come viene pubblicata` --references--> `dist()`  [INFERRED]
  README.md → src/board/shapes.ts
- `Dove sono le cose` --references--> `adoptGuestNotes()`  [INFERRED]
  ARCHITETTURA.md → src/account/space.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (156 total, 32 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.09
Nodes (27): at(), browserStore, clip(), isSaved(), KINDS, LOG_KEY, LOG_MAX_LINES, LogStore (+19 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (92): addToGraphBlock(), graphsForFile(), hide(), account, ACCOUNT_OFF, active, aiToggle, app (+84 more)

### Community 3 - "compile"
Cohesion: 0.07
Nodes (57): areaFor(), constantValue(), argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot() (+49 more)

### Community 4 - "sync.ts"
Cohesion: 0.05
Nodes (39): @electric-sql/pglite, AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow (+31 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (90): formulaAtCursor(), GraphLabelLines, insertGraphBlock(), setGraphLabels(), conicItems(), isConicLine(), quadricEquation(), FieldContext (+82 more)

### Community 6 - "arithmetic.ts"
Cohesion: 0.10
Nodes (45): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+37 more)

### Community 7 - "num"
Cohesion: 0.13
Nodes (87): atIntegers(), withoutAbs(), hyperbolicToExp(), polyEx(), similarSolution(), algebraic(), bigGcd(), byParts() (+79 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (42): addLabel(), boxes, cameras, complexCoord(), coord(), drawings, drawnViews, endTex() (+34 more)

### Community 9 - "Dove sono le cose"
Cohesion: 0.06
Nodes (71): Dove sono le cose, Glifo – architettura, allNames(), answerFollowUp(), bareResult(), CHAT_SUBJECT, chatContext, ChatFn (+63 more)

### Community 10 - "toLatex"
Cohesion: 0.10
Nodes (37): fourierItems(), isFourierLine(), criticalLine(), isSeveralLine(), named(), severalItems(), surface(), names() (+29 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.09
Nodes (61): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+53 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (55): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), dataWindow(), domainEdge() (+47 more)

### Community 13 - "formatNumber"
Cohesion: 0.11
Nodes (36): numberText(), decimalSeparator(), Digits, formatNumber(), FormatOptions, formatRational(), fromNumber(), fromRational() (+28 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.10
Nodes (5): isLanes(), SchemaEditor, withLaneContents(), createEdgeCell(), serializeSchema()

### Community 15 - "Rational"
Cohesion: 0.09
Nodes (24): Part, expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactRandom, exactRoot() (+16 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (3): rangeLabel(), SheetEditor, cloneSheet()

### Community 17 - "domain.ts"
Cohesion: 0.08
Nodes (52): constantIntegrand(), depth(), inequalityMargin(), integralRegion, LayeredSolid, multipleOf(), planeMargin(), planeParts() (+44 more)

### Community 18 - "numerical.ts"
Cohesion: 0.12
Nodes (47): bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial(), interpolating() (+39 more)

### Community 19 - "aiPanel.ts"
Cohesion: 0.12
Nodes (24): NoteSubject, texHtml(), checkHtml(), checkTitle(), cache, cleanKatexError(), escapeHtml(), renderTex() (+16 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (42): b, bigops, c, calculus, fn, fr, fractions, functions (+34 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "calcResults.ts"
Cohesion: 0.06
Nodes (31): @lezer/common, acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult, calcResults(), CheckWidget (+23 more)

### Community 23 - "topics.ts"
Cohesion: 0.11
Nodes (31): ATTRIBUTES, count(), cut(), ER_SHAPES, fieldText(), fitLines(), flowOrder(), formulaText() (+23 more)

### Community 24 - "store.ts"
Cohesion: 0.07
Nodes (15): BoardBackend, BoardStore, done(), fromRecord(), IdbBoards, MemoryBoards, ofNote(), openBoardDatabase() (+7 more)

### Community 25 - "MathError"
Cohesion: 0.10
Nodes (63): MathError, angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, dataOf() (+55 more)

### Community 26 - "assistant.ts"
Cohesion: 0.12
Nodes (24): AiAnswer, AiError, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible(), askThroughHost(), checkShape() (+16 more)

### Community 27 - "h"
Cohesion: 0.10
Nodes (30): SyncStatus, viewSwitch, fieldInput(), edgeLook(), edgeStyle(), edgeTextAt(), insertSchema(), nodeLook() (+22 more)

### Community 28 - "suggestions.ts"
Cohesion: 0.22
Nodes (4): EditorMathContext, expand(), preferredIndex(), SuggestionController

### Community 29 - "several.ts"
Cohesion: 0.10
Nodes (47): Piece, Condition, Family, Group, Root, Shape, fractionNear(), at() (+39 more)

### Community 30 - "gantt.ts"
Cohesion: 0.07
Nodes (64): amount(), barColor(), crossings(), dateText(), dayOf(), fitText(), GanttOptions, ganttSvg() (+56 more)

### Community 31 - "plan.ts"
Cohesion: 0.16
Nodes (17): cellText(), columnRole(), columnsOf(), durationUnit(), isNumber(), isPlanRange(), MAX_ACTIVITIES, plain() (+9 more)

### Community 32 - "search.ts"
Cohesion: 0.15
Nodes (25): SuggestionItem, editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase() (+17 more)

### Community 33 - "editor/editor.ts"
Cohesion: 0.05
Nodes (45): description, name, private, type, version, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/language-data (+37 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "NotesStore"
Cohesion: 0.07
Nodes (42): accountSpace(), adoptGuestNotes(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf(), setCurrentAccount() (+34 more)

### Community 36 - "complex.ts"
Cohesion: 0.05
Nodes (71): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexLine(), isComplexValue() (+63 more)

### Community 37 - "namesIn"
Cohesion: 0.13
Nodes (38): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+30 more)

### Community 38 - "view3d.ts"
Cohesion: 0.06
Nodes (82): addMesh(), addTet(), affinePlane(), Axis, Box, centroid(), clipBy(), clipPolygon() (+74 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "statsShown.ts"
Cohesion: 0.17
Nodes (31): Lin, check(), correlation(), count(), covariance(), Data, dataStatistic(), deviation() (+23 more)

### Community 41 - "Board"
Cohesion: 0.10
Nodes (3): Board, clampZoom(), validView()

### Community 42 - "linsys.ts"
Cohesion: 0.12
Nodes (39): LinearScope, choices(), gcd(), isStandardUnknown(), linearSystem(), matrixEquation(), matrixSystem(), minorsGcd() (+31 more)

### Community 43 - "study.ts"
Cohesion: 0.17
Nodes (32): nameLatex(), Asymptote, compiled(), cutsOf(), defined(), domainOf(), exact(), inDomain() (+24 more)

### Community 44 - "functions.ts"
Cohesion: 0.09
Nodes (59): EMPTY, number(), addFormat(), divFormat(), GENERAL, mulFormat(), tidy(), withCents() (+51 more)

### Community 45 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 46 - "FoldersStore"
Cohesion: 0.16
Nodes (4): cleanFolderName(), FoldersStore, sameName(), names()

### Community 47 - "vitest"
Cohesion: 0.06
Nodes (48): vitest, staticGraphSvg(), chooseWindow(), chooseBox(), formulaGraph(), GraphItem, parseGraph(), typedSliderValue() (+40 more)

### Community 48 - "distributions.ts"
Cohesion: 0.07
Nodes (61): addExp(), choose(), continuousQuantile(), discreteQuantile(), exactIntervalProbability(), factorialBig(), FAMILIES, Family (+53 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (36): DrawAction, adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners() (+28 more)

### Community 50 - "storage.test.ts"
Cohesion: 0.18
Nodes (16): applySpellcheck(), backup(), openSettings(), restore(), setPersonalWords(), sidebarBottom, wordsChangedHere(), addPersonalWord() (+8 more)

### Community 51 - "SidePanel"
Cohesion: 0.22
Nodes (3): displayCode(), preventFocusSteal(), SidePanel

### Community 52 - "dialogs.ts"
Cohesion: 0.09
Nodes (25): EXPLAIN_TONES, ExplainTone, DEFAULT_LOCAL_MODEL, AI_SERVICES, aiService, aiSettingsOf(), ACCOUNT_SETTINGS, accountSettings() (+17 more)

### Community 53 - "page.ts"
Cohesion: 0.06
Nodes (46): SUPABASE_KEY, SUPABASE_URL, accountDataFile(), currentAccount(), PullResult, openShareDialog(), changeAccess(), changeCopy() (+38 more)

### Community 54 - "parse.ts"
Cohesion: 0.06
Nodes (39): hasWord(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, differentialInFraction() (+31 more)

### Community 55 - "toolbar.ts"
Cohesion: 0.07
Nodes (33): insertBlock(), InsertOptions, toggleLinePrefix(), wrapSelection(), LIST_STYLES, addPlaceholders, Placeholder, besideSchema() (+25 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "board.ts"
Cohesion: 0.07
Nodes (48): Action, ACTION_NAMES, DOT_SIZES, EraserMode, HANDLE_REACH, ICON, MODE_NAMES, MoveAction (+40 more)

### Community 58 - "schemaTools.test.ts"
Cohesion: 0.19
Nodes (19): laneOf(), cellHtml(), crc32(), withDensity(), labelHtml(), lanesHtml(), plainHtml(), tableHtml() (+11 more)

### Community 59 - "odesolve.ts"
Cohesion: 0.08
Nodes (76): addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames(), constantParticular() (+68 more)

### Community 60 - "graph.ts"
Cohesion: 0.05
Nodes (38): @maxgraph/core, AT_X, cellText(), COMPASS, createGraph(), drawSchema(), isEdgeLook(), isNodeLook() (+30 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "strokes.ts"
Cohesion: 0.21
Nodes (16): between(), Box, capsuleSpan(), circleSpan(), eraserGrowth(), eraseStroke(), intersect(), linearSpan() (+8 more)

### Community 63 - "MarkdownEditor"
Cohesion: 0.16
Nodes (5): EditorCallbacks, MarkdownEditor, insertTemplate(), SidePanelDeps, setup()

### Community 64 - "ui/preview.ts"
Cohesion: 0.08
Nodes (23): GraphLabels, renameGraphScope(), renameScopeKeys(), BlockKind, draw(), drawCached(), drawn, errorHtml() (+15 more)

### Community 65 - "toNode"
Cohesion: 0.15
Nodes (35): numShown(), polyShown(), ruffiniShown(), at(), centralCanonical(), Coefficients, coneCanonical(), conicOf() (+27 more)

### Community 66 - "spreadsheet/editor.ts"
Cohesion: 0.12
Nodes (32): currentCall(), Editing, MenuEntry, Move, PATHS, SheetEditorOptions, Snapshot, adjustFormula() (+24 more)

### Community 67 - "statsGraph.ts"
Cohesion: 0.19
Nodes (14): classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX, Line, number(), pmfBars() (+6 more)

### Community 68 - "smoke-test.mjs"
Cohesion: 0.29
Nodes (4): markdown-it, fakeLlmWorker(), firstVisit(), plainContext

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "ink.ts"
Cohesion: 0.14
Nodes (17): Prefs, BOARD_PALETTES, BoardPalette, BoardTheme, inkName(), mid(), outlineSvg(), PEN_SIZE (+9 more)

### Community 72 - "llmWorker.ts"
Cohesion: 0.26
Nodes (12): @mlc-ai/web-llm, chat(), GlifoError, Gpu, load(), post(), remove(), scope (+4 more)

### Community 73 - "notesPanel.ts"
Cohesion: 0.16
Nodes (10): Folder, FolderGroup, groupByFolder(), loadClosedFolders(), saveClosedFolders(), NoteMeta, clear(), formatDate() (+2 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (60): primitive(), verified(), atValues(), Converter, coordinates(), decimalText(), definiteParts(), definiteValue() (+52 more)

### Community 75 - "sheet.ts"
Cohesion: 0.06
Nodes (49): numericPartials(), complex, ExactComplexScope, ConicInfo, Ode, expSumValue(), withWorkLimit(), ExactFunction (+41 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.04
Nodes (65): alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ARROW_NAMES, AT_ICONS (+57 more)

### Community 79 - "parseSchema"
Cohesion: 0.14
Nodes (17): readSchema(), schemaSummary(), svg(), hide(), OPEN, schemasForFile(), schemasFromFile(), unhide() (+9 more)

### Community 82 - "blockMove.ts"
Cohesion: 0.10
Nodes (36): @codemirror/commands, blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove, blockPlace() (+28 more)

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
Cohesion: 0.17
Nodes (11): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Nell'app, Note condivise con un link (+3 more)

### Community 98 - "Pt"
Cohesion: 0.18
Nodes (8): coalesced(), Finger, LassoAction, pointsOf(), pressureOf(), EllipseFit, newStrokeId(), Pt

### Community 100 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

### Community 101 - "graphNote.test.ts"
Cohesion: 0.06
Nodes (34): @codemirror/lang-markdown, @codemirror/state, noIndentedCode, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck() (+26 more)

### Community 102 - "supabase.ts"
Cohesion: 0.12
Nodes (30): @supabase/supabase-js, AUTH_STORAGE_KEY, accountError, appUrl(), call(), currentSession(), emailLinkToken(), ensureSessionOf() (+22 more)

### Community 103 - "files.ts"
Cohesion: 0.12
Nodes (23): loadDialect(), base64(), svgSize(), svgToPng(), canWriteFilesDirectly(), downloadBlob(), downloadText(), fileNameFor() (+15 more)

### Community 104 - "Glifo"
Cohesion: 0.14
Nodes (14): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Funzionalità (+6 more)

### Community 105 - "spreadsheet.test.ts"
Cohesion: 0.10
Nodes (34): KINDS, sheetSummary(), WidgetBlock, openSheet(), saveSheetBlock(), tablesNote(), SchemaBlock, openSheetEditor() (+26 more)

### Community 106 - "fake-supabase.mjs"
Cohesion: 0.29
Nodes (5): b64(), CODE, GOOGLE_CODE, ROOT, SUPABASE_URL

### Community 107 - "explainPanel.ts"
Cohesion: 0.09
Nodes (27): Explanation, FollowUp, REPLY_TOKENS, LocalAbort, localErrorMessage(), localLlm, Pending, WorkerLike (+19 more)

### Community 108 - "xlsx.ts"
Cohesion: 0.10
Nodes (42): RFC-4180, fflate, csvDelimiter(), csvToSheet(), field(), italian(), parseCsv(), sheetToCsv() (+34 more)

### Community 110 - "explainSubjects.ts"
Cohesion: 0.14
Nodes (25): @codemirror/language, explainTarget, schemaTitle(), formulasUntil(), sheetBefore(), explanationMarkdown(), hasCalculation(), insertAfterBlock() (+17 more)

### Community 113 - "markdown.ts"
Cohesion: 0.12
Nodes (26): moveAttrs(), configurePurify(), createMarkdownIt(), FORBIDDEN_TAGS, HLJS_LANGUAGES, mathBlockRule(), mathInlineRule(), RenderEnv (+18 more)

### Community 116 - "spreadsheet/format.ts"
Cohesion: 0.09
Nodes (39): at(), breakEven(), dataRange(), Point, quantity(), tableItems(), textLabel(), chartData (+31 more)

### Community 117 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 118 - "ExplainPanel"
Cohesion: 0.16
Nodes (4): ExplainChat, ExplainPanel, preventFocusSteal(), formulasSummary()

### Community 119 - "probability.ts"
Cohesion: 0.13
Nodes (24): End, CompileOptions, ExactScope, RelOp, ALL, complement(), distributionOf(), endAt() (+16 more)

### Community 120 - "toast"
Cohesion: 0.13
Nodes (23): loadingEditor(), copy(), checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion() (+15 more)

### Community 121 - ".int"
Cohesion: 0.10
Nodes (9): characteristicPolynomial(), eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn(), quadraticIn() (+1 more)

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "fourier.ts"
Cohesion: 0.24
Nodes (17): absOf(), boundsOf(), close(), definite(), fourierProblem, fourierShown(), isTrig(), isZero() (+9 more)

### Community 124 - "Stroke"
Cohesion: 0.22
Nodes (6): EraseAction, Step, shapeSvg(), BoardChange, BoardData, Stroke

### Community 125 - "sql.ts"
Cohesion: 0.16
Nodes (19): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+11 more)

### Community 128 - "aiPanel.test.ts"
Cohesion: 0.17
Nodes (12): definedName(), formulaTopic(), graphTopic(), studyOf(), theoremTopic(), topicOf(), FLOW, GRAPH_FIXED (+4 more)

### Community 129 - "graph/file.ts"
Cohesion: 0.08
Nodes (39): figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsFromFile(), OPEN, swatchSvg(), titleBand() (+31 more)

### Community 131 - "tutorial.ts"
Cohesion: 0.16
Nodes (12): HINT_MS, markSeen(), openTutorial(), show(), richText(), showTutorialHint(), close(), TUTORIAL_PAGES (+4 more)

### Community 132 - "laplace.ts"
Cohesion: 0.10
Nodes (54): factoredPolynomial(), polynomialOf(), oneFraction(), beyondPoles(), compiled(), E, exp(), fractionShown() (+46 more)

### Community 138 - "powerseries.ts"
Cohesion: 0.16
Nodes (25): exponentialForm(), fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), alternating() (+17 more)

### Community 139 - "sidePanel.ts"
Cohesion: 0.19
Nodes (14): AiResult, isConfidentAnswer(), CATEGORIES, symbolsInCategory(), cardPreviewTex(), formPreviewTex(), ParsedTemplate, parseTemplate() (+6 more)

### Community 140 - "Glifo – note per Claude"
Cohesion: 0.22
Nodes (9): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole (+1 more)

### Community 141 - "deploy.test.ts"
Cohesion: 0.28
Nodes (4): vite-plugin-pwa, accountOffMessage(), Site, defineFor()

### Community 143 - "grafo-html.mjs"
Cohesion: 0.25
Nodes (4): graphFile, names, namesFile, root

### Community 144 - ".constructor"
Cohesion: 0.18
Nodes (3): BoardOptions, loadPrefs(), highlightName()

### Community 145 - "createFakeSupabase"
Cohesion: 0.60
Nodes (6): createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 157 - "logo.ts"
Cohesion: 0.33
Nodes (6): sidebarToggle(), BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark()

### Community 158 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 161 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, Quando lo studente dice di cominciare

### Community 162 - "Idee per il futuro"
Cohesion: 0.33
Nodes (6): Account: i propri appunti su ogni dispositivo, anche da condividere, Idee per il futuro, In programma, La lavagna: idee in più, Più avanti, Schemi: idee in più

### Community 163 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 164 - "I modelli e le chiavi API"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), In prova sul ramo `prova` (7 ottobre 2026): Qwen3 nel browser per «Spiegami», Le idee dello studente (5 ottobre 2026)

## Knowledge Gaps
- **664 isolated node(s):** `Comandi`, `Promemoria per lo studente`, `Regole`, `Account: i propri appunti su ogni dispositivo, anche da condividere`, `La lavagna: idee in più` (+659 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 925 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **32 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `aiPanel.test.ts`, `touchlog.ts`, `main.ts`, `graph/file.ts`, `compile`, `spec.ts`, `arithmetic.ts`, `laplace.ts`, `graph/preview.ts`, `Parser`, `toLatex`, `powerseries.ts`, `svg.ts`, `num`, `SchemaEditor`, `deploy.test.ts`, `SheetEditor`, `sidePanel.ts`, `numerical.ts`, `aiPanel.ts`, `tutorial.ts`, `topics.ts`, `store.ts`, `MathError`, `assistant.ts`, `h`, `logo.ts`, `gantt.ts`, `several.ts`, `plan.ts`, `logic.ts`, `NotesStore`, `complex.ts`, `namesIn`, `view3d.ts`, `Board`, `linsys.ts`, `study.ts`, `functions.ts`, `finite.ts`, `vitest`, `distributions.ts`, `board/shapes.ts`, `storage.test.ts`, `SidePanel`, `dialogs.ts`, `parse.ts`, `toolbar.ts`, `board.ts`, `schemaTools.test.ts`, `odesolve.ts`, `graph.ts`, `strokes.ts`, `MarkdownEditor`, `ui/preview.ts`, `spreadsheet/editor.ts`, `smoke-test.mjs`, `llmWorker.ts`, `symbolic.ts`, `sheet.ts`, `schema/editor.ts`, `blockMove.ts`, `Pt`, `graphNote.test.ts`, `supabase.ts`, `files.ts`, `spreadsheet.test.ts`, `explainPanel.ts`, `xlsx.ts`, `explainSubjects.ts`, `markdown.ts`, `spreadsheet/format.ts`, `ExplainPanel`, `toast`, `fourier.ts`, `Stroke`?**
  _High betweenness centrality (0.164) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `aiPanel.test.ts`, `touchlog.ts`, `main.ts`, `compile`, `sync.ts`, `laplace.ts`, `tutorial.ts`, `num`, `Dove sono le cose`, `editor/lists.ts`, `sidePanel.ts`, `deploy.test.ts`, `Rational`, `domain.ts`, `calcResults.ts`, `store.ts`, `MathError`, `assistant.ts`, `logo.ts`, `gantt.ts`, `plan.ts`, `search.ts`, `editor/editor.ts`, `NotesStore`, `resize.ts`, `distributions.ts`, `board/shapes.ts`, `storage.test.ts`, `dialogs.ts`, `page.ts`, `parse.ts`, `toolbar.ts`, `board.ts`, `schemaTools.test.ts`, `strokes.ts`, `MarkdownEditor`, `ui/preview.ts`, `ink.ts`, `notesPanel.ts`, `sheet.ts`, `parseSchema`, `blockMove.ts`, `graphNote.test.ts`, `supabase.ts`, `spreadsheet.test.ts`, `explainPanel.ts`, `xlsx.ts`, `markdown.ts`, `spreadsheet/format.ts`, `toast`, `sql.ts`?**
  _High betweenness centrality (0.090) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `graph/file.ts`, `main.ts`, `tutorial.ts`, `graph/preview.ts`, `sidePanel.ts`, `SchemaEditor`, `.constructor`, `SheetEditor`, `aiPanel.ts`, `logo.ts`, `resize.ts`, `Board`, `storage.test.ts`, `SidePanel`, `dialogs.ts`, `page.ts`, `toolbar.ts`, `board.ts`, `ui/preview.ts`, `spreadsheet/editor.ts`, `notesPanel.ts`, `schema/editor.ts`, `graphNote.test.ts`, `files.ts`, `explainPanel.ts`, `ExplainPanel`, `toast`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **Are the 266 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `adoptGuestNotes()`) actually correct?**
  _`Dove sono le cose` has 266 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Comandi`, `Promemoria per lo studente`, `Regole` to the rest of the system?**
  _664 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `touchlog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08653061224489796 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0438749757328674 - nodes in this community are weakly interconnected._