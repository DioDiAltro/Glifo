# Graph Report - matherdown  (2026-10-08)

## Corpus Check
- 303 files · ~588,453 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 4942 nodes · 17893 edges · 157 communities (121 shown, 36 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 558 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d2f80555`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- touchlog.ts
- parse.ts
- main.ts
- math/evaluate.ts
- sync.ts
- spec.ts
- arithmetic.ts
- num
- graph/preview.ts
- explain.ts
- SheetEvaluator
- editor/lists.ts
- svg.ts
- Sheet
- SchemaEditor
- spaces.ts
- SheetEditor
- domain.ts
- numerical.ts
- escapeHtml
- index.ts
- engine.ts
- calcResults.ts
- topics.ts
- store.ts
- MathError
- assistant.ts
- MarkdownEditor
- SuggestionController
- sheet.ts
- gantt.ts
- plan.ts
- search.ts
- package.json
- logic.ts
- NotesStore
- complex.ts
- namesIn
- view3d.ts
- resize.ts
- statistics.ts
- Board
- solve.ts
- toLatex
- functions.ts
- finite.ts
- FoldersStore
- vitest
- distributions.ts
- board/shapes.ts
- BoardStore
- renderTex
- aiPanel.ts
- page.ts
- gauss.ts
- toolbar.ts
- 20261004091555_note_condivise.sql
- Dove sono le cose
- MathNode
- odesolve.ts
- graph.ts
- dependencies
- ExplainChat
- editor.test.ts
- ui/preview.ts
- Rational
- spreadsheet/editor.ts
- statsGraph.ts
- smoke-test.mjs
- Benvenuto in Glifo
- compilerOptions
- board.ts
- inference.ts
- h
- symbolic.ts
- .resultOf
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
- Stroke
- Distribution
- graphNote.test.ts
- supabase.ts
- files.ts
- Glifo
- editor/editor.ts
- fake-supabase.mjs
- explainPanel.ts
- xlsx.ts
- llmWorker.ts
- markdown.ts
- chart.ts
- Piano per piano
- ExplainPanel
- probability.ts
- siteUpdate.ts
- .int
- Le spiegazioni, come funzionano
- formatLinear
- .sameAs
- sql.ts
- .solveAll
- ExplainEvents
- aiPanel.test.ts
- graph/file.ts
- tutorial.ts
- laplace.ts
- Parser
- BoardOptions
- 20261008130026_commenti.sql
- sidePanel.ts
- Glifo – note per Claude
- schedule.ts
- icons.mjs
- spellcheck
- logo.ts
- Costi
- Idee per il futuro
- La lavagna
- I modelli e le chiavi API

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
10. `h()` - 107 edges

## Surprising Connections (you probably didn't know these)
- `Dove sono le cose` --references--> `fakeLlmWorker()`  [INFERRED]
  ARCHITETTURA.md → scripts/smoke-test.mjs
- `Come viene pubblicata` --references--> `dist()`  [INFERRED]
  README.md → src/board/shapes.ts
- `Dove sono le cose` --references--> `WidgetKind`  [INFERRED]
  ARCHITETTURA.md → src/editor/schemaBlocks.ts
- `Funzionalità` --references--> `k()`  [INFERRED]
  README.md → src/math/numerical.ts
- `Dove sono le cose` --references--> `texts()`  [INFERRED]
  ARCHITETTURA.md → tests/boardTouchLog.test.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (157 total, 36 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.09
Nodes (27): at(), browserStore, clip(), isSaved(), KINDS, LOG_KEY, LOG_MAX_LINES, LogStore (+19 more)

### Community 1 - "parse.ts"
Cohesion: 0.07
Nodes (49): hasWord(), errorMessage(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES (+41 more)

### Community 2 - "main.ts"
Cohesion: 0.03
Nodes (134): ExplainTone, DEFAULT_LOCAL_MODEL, graphsForFile(), remapGraphLines(), account, ACCOUNT_OFF, accountButton, accountProblem() (+126 more)

### Community 3 - "math/evaluate.ts"
Cohesion: 0.07
Nodes (39): argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot(), fieldOn(), numericPartials() (+31 more)

### Community 4 - "sync.ts"
Cohesion: 0.05
Nodes (40): @electric-sql/pglite, AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow (+32 more)

### Community 5 - "spec.ts"
Cohesion: 0.06
Nodes (84): isConicLine(), quadricEquation(), isFourierLine(), onlyComplex(), isNumericalLine(), numericalItems(), depth(), Multiple (+76 more)

### Community 6 - "arithmetic.ts"
Cohesion: 0.10
Nodes (47): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+39 more)

### Community 7 - "num"
Cohesion: 0.10
Nodes (111): atIntegers(), definite(), linearTrig(), oneFraction(), signsUp(), symbolicCoefficient(), withoutAbs(), exp() (+103 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (47): FIGURE_PALETTE, addLabel(), boxes, cameras, complexCoord(), containing(), coord(), drawings (+39 more)

### Community 9 - "explain.ts"
Cohesion: 0.07
Nodes (58): allNames(), bareResult(), CHAT_SUBJECT, ChatFn, chatSystemPrompt(), checkFormulas(), checkSteps(), checkTopicFormula() (+50 more)

### Community 10 - "SheetEvaluator"
Cohesion: 0.09
Nodes (32): RFC-4180, sheetSummary(), csvDelimiter(), csvToSheet(), field(), italian(), parseCsv(), sheetToCsv() (+24 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.09
Nodes (60): continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext(), isBlank() (+52 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (56): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), dataWindow(), domainEdge() (+48 more)

### Community 13 - "Sheet"
Cohesion: 0.10
Nodes (14): ExactComplexScope, Ode, Mat, fingerprint(), Sheet, text(), check(), result() (+6 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.09
Nodes (9): fieldInput(), isLanes(), SchemaEditor, withLaneContents(), nodeLook(), nodeStyle(), EdgeLook, laneNames() (+1 more)

### Community 15 - "spaces.ts"
Cohesion: 0.10
Nodes (33): decimalSeparator(), formatRational(), fromRational(), writeDigits(), eigenvectors(), EXACT, FLOAT, kernel() (+25 more)

### Community 16 - "SheetEditor"
Cohesion: 0.09
Nodes (4): rangeLabel(), SheetEditor, serializeSheet(), cloneSheet()

### Community 17 - "domain.ts"
Cohesion: 0.10
Nodes (43): constantIntegrand(), inequalityMargin(), integralRegion, LayeredSolid, planeMargin(), radiusOf(), spaceLayers(), spaceMargin() (+35 more)

### Community 18 - "numerical.ts"
Cohesion: 0.12
Nodes (47): bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial(), interpolating() (+39 more)

### Community 19 - "escapeHtml"
Cohesion: 0.17
Nodes (12): valueNode(), NoteSubject, texHtml(), checkHtml(), checkTitle(), escapeHtml(), AiPanel, graphLabel() (+4 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (41): b, bigops, c, calculus, fn, fr, fractions, functions (+33 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "calcResults.ts"
Cohesion: 0.07
Nodes (45): @codemirror/language, @lezer/common, explainTarget, acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult (+37 more)

### Community 23 - "topics.ts"
Cohesion: 0.16
Nodes (27): ATTRIBUTES, count(), cut(), definedName(), ER_SHAPES, fieldText(), fitLines(), flowOrder() (+19 more)

### Community 24 - "store.ts"
Cohesion: 0.09
Nodes (16): fake-indexeddb, PEN_SIZE, BoardBackend, BoardChange, BoardData, done(), fromRecord(), IdbBoards (+8 more)

### Community 25 - "MathError"
Cohesion: 0.16
Nodes (45): MathError, angleBetween(), asMatrix(), basisOf(), cross(), Ctx, dataOf(), determinant() (+37 more)

### Community 26 - "assistant.ts"
Cohesion: 0.14
Nodes (19): @anthropic-ai/sdk, AiAnswer, AiError, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible(), askThroughHost() (+11 more)

### Community 27 - "MarkdownEditor"
Cohesion: 0.13
Nodes (7): closeMathBlockOnEnter(), EditorCallbacks, MarkdownEditor, insertTemplate(), SidePanelDeps, setup(), setup()

### Community 28 - "SuggestionController"
Cohesion: 0.20
Nodes (4): EditorMathContext, expand(), preferredIndex(), SuggestionController

### Community 29 - "sheet.ts"
Cohesion: 0.04
Nodes (137): conicItems(), FieldContext, fourierItems(), criticalLine(), named(), severalItems(), surface(), areaFor() (+129 more)

### Community 30 - "gantt.ts"
Cohesion: 0.07
Nodes (57): graphImagesFor(), amount(), barColor(), crossings(), dateText(), dayOf(), fitText(), GanttOptions (+49 more)

### Community 31 - "plan.ts"
Cohesion: 0.18
Nodes (16): NO_TABLE, cellText(), columnRole(), columnsOf(), durationUnit(), isNumber(), isPlanRange(), MAX_ACTIVITIES (+8 more)

### Community 32 - "search.ts"
Cohesion: 0.17
Nodes (23): editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex() (+15 more)

### Community 33 - "package.json"
Cohesion: 0.05
Nodes (36): description, devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript (+28 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "NotesStore"
Cohesion: 0.07
Nodes (40): accountSpace(), adoptGuestNotes(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf(), setCurrentAccount() (+32 more)

### Community 36 - "complex.ts"
Cohesion: 0.07
Nodes (52): add(), arg(), asin(), atan(), compileApply(), compileComplex(), compileFunction(), compileName() (+44 more)

### Community 37 - "namesIn"
Cohesion: 0.13
Nodes (38): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+30 more)

### Community 38 - "view3d.ts"
Cohesion: 0.06
Nodes (81): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+73 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "statistics.ts"
Cohesion: 0.18
Nodes (27): Lin, check(), correlation(), count(), covariance(), Data, DATA_FUNCTIONS, dataStatistic() (+19 more)

### Community 41 - "Board"
Cohesion: 0.09
Nodes (6): Board, clampZoom(), penErases(), pressureOf(), validView(), Pt

### Community 42 - "solve.ts"
Cohesion: 0.14
Nodes (28): formatNumber(), fromNumber(), complexText(), formatEigenvalues(), isStandardUnknown(), linearSystem(), RelOp, breaks() (+20 more)

### Community 43 - "toLatex"
Cohesion: 0.08
Nodes (60): names(), STUDY_GRAPH, studyItems(), ACCENT_COMMANDS, COMPLEX_FUNCTIONS, diffLatex(), DISTRIBUTION_LATEX, distributionLatex() (+52 more)

### Community 44 - "functions.ts"
Cohesion: 0.08
Nodes (67): EMPTY, number(), addFormat(), decimalsOf(), divFormat(), GENERAL, MAX_DECIMALS, most() (+59 more)

### Community 45 - "finite.ts"
Cohesion: 0.19
Nodes (26): countOf(), elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError, FiniteResult (+18 more)

### Community 46 - "FoldersStore"
Cohesion: 0.17
Nodes (3): cleanFolderName(), FoldersStore, sameName()

### Community 47 - "vitest"
Cohesion: 0.06
Nodes (40): vite-plugin-pwa, vitest, staticGraphSvg(), chooseWindow(), chooseBox(), GraphItem, parseGraph(), DrawOptions (+32 more)

### Community 48 - "distributions.ts"
Cohesion: 0.17
Nodes (27): choose(), continuousQuantile(), factorialBig(), FAMILIES, Family, integerParam(), invalid(), makeDistribution() (+19 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (36): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+28 more)

### Community 50 - "BoardStore"
Cohesion: 0.12
Nodes (4): BoardStore, MemoryBoards, validView(), backup()

### Community 51 - "renderTex"
Cohesion: 0.17
Nodes (7): cache, cleanKatexError(), renderTex(), TexRender, displayCode(), preventFocusSteal(), SidePanel

### Community 52 - "aiPanel.ts"
Cohesion: 0.27
Nodes (8): SubjectKind, Settings, AiPanelDeps, KIND_NAMES, ExplainChatDeps, ExplainModel, ExplainPanelDeps, ExplainSubject

### Community 53 - "page.ts"
Cohesion: 0.06
Nodes (47): katex, AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), currentAccount(), PullResult, openShareDialog() (+39 more)

### Community 54 - "gauss.ts"
Cohesion: 0.16
Nodes (22): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexLine(), isComplexValue() (+14 more)

### Community 55 - "toolbar.ts"
Cohesion: 0.12
Nodes (24): insertBlock(), InsertOptions, toggleLinePrefix(), wrapSelection(), applyListStyle(), LIST_STYLES, besideSchema(), schemaBlockRanges() (+16 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "Dove sono le cose"
Cohesion: 0.08
Nodes (43): Dove sono le cose, Glifo – architettura, centerOn(), copyStrokes(), cross(), handleScale(), IDENTITY, insideLasso() (+35 more)

### Community 58 - "MathNode"
Cohesion: 0.17
Nodes (9): ConicInfo, ExactRandom, Elem, FiniteContext, FormattedResult, MathNode, Definition, Found (+1 more)

### Community 59 - "odesolve.ts"
Cohesion: 0.08
Nodes (77): linearIn(), substitute(), addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled() (+69 more)

### Community 60 - "graph.ts"
Cohesion: 0.05
Nodes (40): @maxgraph/core, AT_X, cellHtml(), cellText(), COMPASS, createEdgeCell(), createGraph(), drawSchema() (+32 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 63 - "editor.test.ts"
Cohesion: 0.08
Nodes (24): tabOutOfMath(), templateInsertion(), commandTokenAt(), isInCode(), mathContextAt(), openMathBefore(), addPlaceholders, buildDecorations() (+16 more)

### Community 64 - "ui/preview.ts"
Cohesion: 0.11
Nodes (12): GraphLabels, BlockKind, MoveDir, hydrateSheets(), BLOCK_NAMES, blockKindOf(), MOVABLE_BLOCKS, moveButtonsHtml() (+4 more)

### Community 65 - "Rational"
Cohesion: 0.09
Nodes (44): Part, at(), centralCanonical(), Coefficients, coneCanonical(), conicOf(), det2(), det3() (+36 more)

### Community 66 - "spreadsheet/editor.ts"
Cohesion: 0.09
Nodes (46): currentCall(), Editing, MenuEntry, Move, openSheetEditor(), PATHS, SheetEditorOptions, Snapshot (+38 more)

### Community 67 - "statsGraph.ts"
Cohesion: 0.22
Nodes (15): isTestLine(), number(), testItems(), classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX (+7 more)

### Community 68 - "smoke-test.mjs"
Cohesion: 0.25
Nodes (5): fflate, markdown-it, fakeLlmWorker(), firstVisit(), plainContext

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "board.ts"
Cohesion: 0.05
Nodes (46): Action, ACTION_NAMES, coalesced(), DOT_SIZES, DrawAction, EraserMode, Finger, HANDLE_REACH (+38 more)

### Community 72 - "inference.ts"
Cohesion: 0.16
Nodes (24): chiSquareTest(), confidence(), confidenceShown(), Given, hypothesisTest(), InferenceContext, interval(), meanOf() (+16 more)

### Community 73 - "h"
Cohesion: 0.07
Nodes (44): SyncStatus, aiService, openSignedOut(), printButton(), ShareDialogDeps, Folder, saveClosedFolders(), DEFAULT_SETTINGS (+36 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (53): constant(), atValues(), Converter, coordinates(), decimalText(), definiteParts(), definiteValue(), degree() (+45 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.04
Nodes (82): laneOf(), alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ARROW_NAMES (+74 more)

### Community 79 - "parseSchema"
Cohesion: 0.09
Nodes (32): schemaSummary(), svg(), base64(), hide(), OPEN, schemasForFile(), schemasFromFile(), unhide() (+24 more)

### Community 82 - "blockMove.ts"
Cohesion: 0.14
Nodes (25): blank(), BlockMove, blockPlace(), closed(), closeIdx(), contentHash(), fenceClosed(), fenceName() (+17 more)

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

### Community 98 - "Stroke"
Cohesion: 0.15
Nodes (7): EraseAction, pointsOf(), Step, strokeSummary(), highlightName(), newStrokeId(), Stroke

### Community 100 - "Distribution"
Cohesion: 0.11
Nodes (15): addExp(), discreteQuantile(), Distribution, exactIntervalProbability(), expSum, integerRange(), intervalProbability(), subtractExp() (+7 more)

### Community 101 - "graphNote.test.ts"
Cohesion: 0.08
Nodes (31): @codemirror/lang-markdown, @lezer/markdown, addToGraphBlock(), noIndentedCode, lineDepth(), mathDelimTag, mathMarkdown, mathTag (+23 more)

### Community 102 - "supabase.ts"
Cohesion: 0.12
Nodes (30): @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken(), ensureSessionOf() (+22 more)

### Community 103 - "files.ts"
Cohesion: 0.11
Nodes (25): cache, capability(), ClaudeRuntime, hostDownloads, HostError, hostSample, inClaudeViewer(), ModelTier (+17 more)

### Community 104 - "Glifo"
Cohesion: 0.14
Nodes (14): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Funzionalità (+6 more)

### Community 105 - "editor/editor.ts"
Cohesion: 0.08
Nodes (32): @codemirror/commands, @codemirror/state, @codemirror/view, highlight, italianPhrases, listMarkers, blockLine, inlineRegion (+24 more)

### Community 106 - "fake-supabase.mjs"
Cohesion: 0.22
Nodes (11): b64(), CODE, createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom() (+3 more)

### Community 107 - "explainPanel.ts"
Cohesion: 0.11
Nodes (22): Explanation, REPLY_TOKENS, LocalAbort, localErrorMessage(), localLlm, Pending, WorkerLike, ChatMessage (+14 more)

### Community 108 - "xlsx.ts"
Cohesion: 0.10
Nodes (40): sameFormat(), BinOp, COMPARE, ERRORS_BY_LENGTH, formulaBody(), formulaRefs(), isFormula(), normalizeFormula() (+32 more)

### Community 110 - "llmWorker.ts"
Cohesion: 0.26
Nodes (12): @mlc-ai/web-llm, chat(), GlifoError, Gpu, load(), post(), remove(), scope (+4 more)

### Community 113 - "markdown.ts"
Cohesion: 0.11
Nodes (29): moveAttrs(), renderTexOrError(), renderTexWithResult(), configurePurify(), createMarkdownIt(), FORBIDDEN_TAGS, HLJS_LANGUAGES, mathBlockRule() (+21 more)

### Community 116 - "chart.ts"
Cohesion: 0.12
Nodes (32): at(), breakEven(), dataLine(), dataRange(), Point, quantity(), tableItems(), textLabel() (+24 more)

### Community 117 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 119 - "probability.ts"
Cohesion: 0.13
Nodes (24): End, CompileOptions, ExactScope, ALL, complement(), distributionOf(), endAt(), EventContext (+16 more)

### Community 120 - "siteUpdate.ts"
Cohesion: 0.17
Nodes (15): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, PartNotLoaded (+7 more)

### Community 121 - ".int"
Cohesion: 0.11
Nodes (9): characteristicPolynomial(), eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn(), quadraticIn() (+1 more)

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "formatLinear"
Cohesion: 0.36
Nodes (10): circleText(), degreesText(), entry(), formatLinear(), lineText(), matrixTex(), plainArea(), planeText() (+2 more)

### Community 124 - ".sameAs"
Cohesion: 0.14
Nodes (10): bracketParts(), chainOf(), close(), definitionTarget(), digitsMatch(), isLiteral(), parseCached(), sameExactLinear() (+2 more)

### Community 125 - "sql.ts"
Cohesion: 0.17
Nodes (18): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+10 more)

### Community 126 - ".solveAll"
Cohesion: 0.27
Nodes (3): splitPieces(), styleOf(), walk()

### Community 127 - "ExplainEvents"
Cohesion: 0.33
Nodes (3): ExplainEvents, ToolCall, scripted()

### Community 128 - "aiPanel.test.ts"
Cohesion: 0.15
Nodes (16): answerFollowUp(), chatContext, checkTopicSteps(), explainTopic, explanationText(), sheetFactory(), tooLong(), topicFeedback() (+8 more)

### Community 129 - "graph/file.ts"
Cohesion: 0.11
Nodes (32): figureName(), graphFigure(), graphImage(), graphsFromFile(), hide(), OPEN, swatchSvg(), titleBand() (+24 more)

### Community 131 - "tutorial.ts"
Cohesion: 0.18
Nodes (11): HINT_MS, markSeen(), openTutorial(), show(), richText(), showTutorialHint(), close(), TUTORIAL_PAGES (+3 more)

### Community 132 - "laplace.ts"
Cohesion: 0.09
Nodes (62): factoredPolynomial(), integerPoly(), beyondPoles(), compiled(), E, fractionShown(), HALF, inverseLaplaceShown() (+54 more)

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 139 - "sidePanel.ts"
Cohesion: 0.19
Nodes (17): AiResult, SuggestionItem, SearchResult, CATEGORIES, cardPreviewTex(), formPreviewTex(), ParsedTemplate, parseTemplate() (+9 more)

### Community 140 - "Glifo – note per Claude"
Cohesion: 0.22
Nodes (9): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole (+1 more)

### Community 142 - "schedule.ts"
Cohesion: 0.18
Nodes (17): checkGiven(), criticalPaths(), key(), Link, LinkType, listText(), offset(), order() (+9 more)

### Community 155 - "spellcheck"
Cohesion: 0.21
Nodes (8): spellcheck(), close(), misspelledAt(), openAt(), replace(), tooltipView(), SpellChecker, SpellcheckOptions

### Community 157 - "logo.ts"
Cohesion: 0.39
Nodes (5): BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark()

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
- **664 isolated node(s):** `session-start.sh script`, `name`, `private`, `version`, `description` (+659 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 931 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **36 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `aiPanel.test.ts`, `touchlog.ts`, `graph/file.ts`, `main.ts`, `math/evaluate.ts`, `spec.ts`, `arithmetic.ts`, `num`, `graph/preview.ts`, `explain.ts`, `laplace.ts`, `parse.ts`, `svg.ts`, `SheetEvaluator`, `schedule.ts`, `SchemaEditor`, `SheetEditor`, `sidePanel.ts`, `numerical.ts`, `escapeHtml`, `tutorial.ts`, `calcResults.ts`, `topics.ts`, `MathError`, `assistant.ts`, `MarkdownEditor`, `sheet.ts`, `gantt.ts`, `plan.ts`, `logic.ts`, `NotesStore`, `complex.ts`, `namesIn`, `view3d.ts`, `Board`, `toLatex`, `functions.ts`, `finite.ts`, `vitest`, `board/shapes.ts`, `BoardStore`, `renderTex`, `aiPanel.ts`, `gauss.ts`, `toolbar.ts`, `odesolve.ts`, `graph.ts`, `ui/preview.ts`, `Rational`, `spreadsheet/editor.ts`, `smoke-test.mjs`, `board.ts`, `inference.ts`, `h`, `symbolic.ts`, `.resultOf`, `schema/editor.ts`, `parseSchema`, `blockMove.ts`, `Stroke`, `Distribution`, `graphNote.test.ts`, `supabase.ts`, `files.ts`, `editor/editor.ts`, `explainPanel.ts`, `xlsx.ts`, `llmWorker.ts`, `markdown.ts`, `chart.ts`, `ExplainPanel`, `siteUpdate.ts`, `.sameAs`, `.solveAll`?**
  _High betweenness centrality (0.167) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `aiPanel.test.ts`, `parse.ts`, `touchlog.ts`, `main.ts`, `sync.ts`, `laplace.ts`, `tutorial.ts`, `num`, `graph/preview.ts`, `explain.ts`, `SheetEvaluator`, `editor/lists.ts`, `svg.ts`, `Sheet`, `sidePanel.ts`, `spaces.ts`, `store.ts`, `assistant.ts`, `MarkdownEditor`, `logo.ts`, `gantt.ts`, `plan.ts`, `search.ts`, `package.json`, `NotesStore`, `resize.ts`, `toLatex`, `distributions.ts`, `board/shapes.ts`, `page.ts`, `toolbar.ts`, `Dove sono le cose`, `editor.test.ts`, `spreadsheet/editor.ts`, `board.ts`, `h`, `schema/editor.ts`, `parseSchema`, `blockMove.ts`, `graphNote.test.ts`, `supabase.ts`, `editor/editor.ts`, `explainPanel.ts`, `markdown.ts`, `chart.ts`, `siteUpdate.ts`, `sql.ts`?**
  _High betweenness centrality (0.105) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `main.ts`, `tutorial.ts`, `graph/preview.ts`, `sidePanel.ts`, `SchemaEditor`, `SheetEditor`, `escapeHtml`, `spellcheck`, `gantt.ts`, `resize.ts`, `Board`, `renderTex`, `aiPanel.ts`, `page.ts`, `toolbar.ts`, `ExplainChat`, `ui/preview.ts`, `spreadsheet/editor.ts`, `board.ts`, `schema/editor.ts`, `Stroke`, `graphNote.test.ts`, `files.ts`, `explainPanel.ts`, `ExplainPanel`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **Are the 260 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `adoptGuestNotes()`) actually correct?**
  _`Dove sono le cose` has 260 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `name`, `private` to the rest of the system?**
  _664 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `touchlog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08653061224489796 - nodes in this community are weakly interconnected._
- **Should `parse.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06505421184320268 - nodes in this community are weakly interconnected._