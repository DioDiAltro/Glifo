# Graph Report - matherdown  (2026-10-08)

## Corpus Check
- 311 files · ~599,423 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 4999 nodes · 18064 edges · 151 communities (115 shown, 36 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 571 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `4fc7943a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- touchlog.ts
- Parser
- main.ts
- compile
- sync.ts
- spec.ts
- sheet.ts
- num
- graph/preview.ts
- Dove sono le cose
- picture.ts
- editor/lists.ts
- svg.ts
- parse.ts
- SchemaEditor
- Board
- SheetEditor
- editor.test.ts
- MathError
- Rational
- index.ts
- engine.ts
- explainSubjects.ts
- aiPanel.test.ts
- BoardStore
- linear.ts
- assistant.ts
- dialogs.ts
- dom.ts
- several.ts
- gantt.ts
- calcResults.ts
- sidePanel.ts
- graphNote.test.ts
- logic.ts
- NotesStore
- complex.ts
- namesIn
- view3d.ts
- resize.ts
- statsShown.ts
- vitest
- domain.ts
- study.ts
- functions.ts
- finite.ts
- exact.ts
- toLatex
- distributions.ts
- board/shapes.ts
- topics.ts
- escapeHtml
- Pt
- feedback.ts
- graph.ts
- ui/preview.ts
- 20261004091555_note_condivise.sql
- selection.ts
- FoldersStore
- odesolve.ts
- plan.ts
- dependencies
- page.ts
- h
- Glifo – note per Claude
- Piano per piano
- spreadsheet/editor.ts
- probability.ts
- smoke-test.mjs
- Benvenuto in Glifo
- compilerOptions
- linsys.ts
- Field
- MarkdownEditor
- symbolic.ts
- Costi
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- parseSchema
- session-start.sh
- .claude/CLAUDE.md
- markdown.ts
- tutorial.mjs
- Abbonamenti
- spiegami-qwen.mjs
- supabase-stub.sql
- account-test.mjs
- Il database degli account (Supabase)
- board.ts
- Glifo
- logo.ts
- supabase.ts
- files.ts
- limits.ts
- La lavagna
- I modelli e le chiavi API
- localModels.ts
- xlsx.ts
- explainPanel.ts
- .paintVertexShape
- spreadsheet/format.ts
- Più avanti
- ExplainPanel
- conics.ts
- siteUpdate.ts
- scripts
- Le spiegazioni, come funzionano
- schedule.ts
- Sheet
- sql.ts
- storage.test.ts
- grafo-html.mjs
- createFakeSupabase
- graph/file.ts
- .constructor
- laplace.ts
- Parser
- appleTouch
- 20261008130026_commenti.sql
- ExplainChat
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
- `Dove sono le cose` --references--> `ConicElements`  [INFERRED]
  ARCHITETTURA.md → src/math/conics.ts
- `Dove sono le cose` --references--> `texts()`  [INFERRED]
  ARCHITETTURA.md → tests/boardTouchLog.test.ts
- `Funzionalità` --references--> `k()`  [INFERRED]
  README.md → src/math/numerical.ts
- `Come viene pubblicata` --references--> `dist()`  [INFERRED]
  README.md → src/board/shapes.ts
- `Dove sono le cose` --references--> `fakeLlmWorker()`  [INFERRED]
  ARCHITETTURA.md → scripts/smoke-test.mjs

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (151 total, 36 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.09
Nodes (27): at(), browserStore, clip(), isSaved(), KINDS, LOG_KEY, LOG_MAX_LINES, LogStore (+19 more)

### Community 1 - "Parser"
Cohesion: 0.12
Nodes (16): SyncStatus, describe(), MathSyntaxError, Parser, AccountButton, messageOf(), openAccountDialog(), openLoginDialog() (+8 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (112): WidgetBlock, graphsForFile(), hide(), account, ACCOUNT_OFF, active, aiShown(), aiToggle (+104 more)

### Community 3 - "compile"
Cohesion: 0.07
Nodes (54): criticalLine(), named(), severalItems(), surface(), areaFor(), constantValue(), argumentOrder(), compileLineIntegral() (+46 more)

### Community 4 - "sync.ts"
Cohesion: 0.05
Nodes (40): @electric-sql/pglite, AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow (+32 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (97): conicItems(), isConicLine(), quadricEquation(), isFourierLine(), isComplexLine(), isTestLine(), constantIntegrand(), inequalityMargin() (+89 more)

### Community 6 - "sheet.ts"
Cohesion: 0.04
Nodes (58): parseGraph(), typedSliderValue(), PALETTES, numericPartials(), complex, OdeFunction, errorMessage(), characteristicPolynomial() (+50 more)

### Community 7 - "num"
Cohesion: 0.13
Nodes (85): atIntegers(), withoutAbs(), hyperbolicToExp(), polyEx(), bernoulliFamily(), shapeValue(), similarSolution(), squareRoot() (+77 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (43): FIGURE_PALETTE, addLabel(), boxes, cameras, complexCoord(), coord(), drawings, drawnViews (+35 more)

### Community 9 - "Dove sono le cose"
Cohesion: 0.06
Nodes (71): Dove sono le cose, Glifo – architettura, allNames(), answerFollowUp(), bareResult(), CHAT_SUBJECT, chatContext, ChatFn (+63 more)

### Community 10 - "picture.ts"
Cohesion: 0.24
Nodes (11): staticGraphSvg(), chooseWindow(), containing(), chooseBox(), GraphSpec, DrawOptions, graphSvg(), Quality (+3 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.08
Nodes (66): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+58 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (55): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), dataWindow(), domainEdge() (+47 more)

### Community 13 - "parse.ts"
Cohesion: 0.06
Nodes (37): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, differentialInFraction(), DISTRIBUTION_EXAMPLES (+29 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.10
Nodes (4): isLanes(), SchemaEditor, withLaneContents(), serializeSchema()

### Community 15 - "Board"
Cohesion: 0.09
Nodes (4): Board, clampZoom(), validView(), BoardTheme

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (5): rangeLabel(), SheetEditor, CellRange, clearRange(), cloneSheet()

### Community 17 - "editor.test.ts"
Cohesion: 0.08
Nodes (27): closeMathBlockOnEnter(), tabOutOfMath(), CODE_NODES, CommandToken, commandTokenAt(), isInCode(), MATH_NODES, mathContextAt() (+19 more)

### Community 18 - "MathError"
Cohesion: 0.13
Nodes (47): MathError, bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial() (+39 more)

### Community 19 - "Rational"
Cohesion: 0.09
Nodes (48): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+40 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (42): b, bigops, c, calculus, fn, fr, fractions, functions (+34 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "explainSubjects.ts"
Cohesion: 0.21
Nodes (19): explainTarget, tableTitle(), formulasUntil(), sheetBefore(), hasCalculation(), insertAfterBlock(), insertAfterText(), insertExplanation() (+11 more)

### Community 23 - "aiPanel.test.ts"
Cohesion: 0.11
Nodes (19): definedName(), formulaText(), formulaTopic(), graphTopic(), studyOf(), tableTopic(), theoremTopic(), NoteSubject (+11 more)

### Community 24 - "BoardStore"
Cohesion: 0.06
Nodes (15): BoardOptions, BoardBackend, BoardStore, done(), IdbBoards, MemoryBoards, ofNote(), openBoardDatabase() (+7 more)

### Community 25 - "linear.ts"
Cohesion: 0.09
Nodes (62): angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, dataOf(), determinant() (+54 more)

### Community 26 - "assistant.ts"
Cohesion: 0.14
Nodes (21): @anthropic-ai/sdk, AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible() (+13 more)

### Community 27 - "dialogs.ts"
Cohesion: 0.11
Nodes (20): EXPLAIN_TONES, DEFAULT_LOCAL_MODEL, ACCOUNT_SETTINGS, accountSettings(), AI_MODELS, DEFAULT_SETTINGS, SETTINGS_KEY, sharedSettings() (+12 more)

### Community 28 - "dom.ts"
Cohesion: 0.11
Nodes (17): Folder, FolderGroup, groupByFolder(), saveClosedFolders(), Note, NoteMeta, append(), Child (+9 more)

### Community 29 - "several.ts"
Cohesion: 0.06
Nodes (89): close(), Definite, definiteIntegral(), exValue(), samples(), EMPTY_SCOPE, integrate(), absOf() (+81 more)

### Community 30 - "gantt.ts"
Cohesion: 0.07
Nodes (57): amount(), barColor(), crossings(), dateText(), dayOf(), fitText(), GanttOptions, ganttSvg() (+49 more)

### Community 31 - "calcResults.ts"
Cohesion: 0.11
Nodes (13): @lezer/common, acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult, calcResults(), CheckWidget (+5 more)

### Community 32 - "sidePanel.ts"
Cohesion: 0.07
Nodes (43): Promemoria per lo studente, templateInsertion(), EditorMathContext, expand(), preferredIndex(), SuggestionController, SuggestionItem, editDistance() (+35 more)

### Community 33 - "graphNote.test.ts"
Cohesion: 0.06
Nodes (35): @codemirror/lang-markdown, addToGraphBlock(), formulaAtCursor(), GraphLabelLines, insertGraphBlock(), setGraphLabels(), misspelledMark, refreshSpelling (+27 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "NotesStore"
Cohesion: 0.07
Nodes (41): accountSpace(), adoptGuestNotes(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf(), setCurrentAccount() (+33 more)

### Community 36 - "complex.ts"
Cohesion: 0.06
Nodes (63): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexValue(), isInequality() (+55 more)

### Community 37 - "namesIn"
Cohesion: 0.14
Nodes (36): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+28 more)

### Community 38 - "view3d.ts"
Cohesion: 0.06
Nodes (84): sampleRegion(), addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon() (+76 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "statsShown.ts"
Cohesion: 0.15
Nodes (35): expSumValue(), Lin, check(), correlation(), count(), covariance(), Data, DATA_FUNCTIONS (+27 more)

### Community 41 - "vitest"
Cohesion: 0.10
Nodes (21): @codemirror/state, @codemirror/view, vitest, InsertOptions, toggleLinePrefix(), addPlaceholders, Placeholder, besideSchema() (+13 more)

### Community 42 - "domain.ts"
Cohesion: 0.14
Nodes (30): depth(), integralRegion, LayeredSolid, Multiple, PlanePart, axesIn(), bestAlong(), boundingBox() (+22 more)

### Community 43 - "study.ts"
Cohesion: 0.13
Nodes (37): limit(), pvalue(), rationalRoots(), breaks(), periodOf(), Asymptote, boundaries(), compiled() (+29 more)

### Community 44 - "functions.ts"
Cohesion: 0.08
Nodes (62): EMPTY, evaluateSheet(), number(), SheetEvaluator, addFormat(), divFormat(), GENERAL, most() (+54 more)

### Community 45 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 46 - "exact.ts"
Cohesion: 0.14
Nodes (16): bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactFunction, ExactRandom, exactRoot(), ExactUnavailable (+8 more)

### Community 47 - "toLatex"
Cohesion: 0.07
Nodes (53): FieldContext, fourierItems(), number(), testItems(), isNumericalLine(), numericalItems(), GraphItem, classes() (+45 more)

### Community 48 - "distributions.ts"
Cohesion: 0.06
Nodes (65): addExp(), choose(), continuousQuantile(), discreteQuantile(), Distribution, exactIntervalProbability(), expSum, factorialBig() (+57 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (35): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+27 more)

### Community 50 - "topics.ts"
Cohesion: 0.16
Nodes (26): ATTRIBUTES, count(), cut(), ER_SHAPES, fieldText(), fitLines(), flowOrder(), FREE_NAMES (+18 more)

### Community 51 - "escapeHtml"
Cohesion: 0.12
Nodes (19): katex, texHtml(), checkHtml(), checkTitle(), cache, cleanKatexError(), escapeHtml(), renderTex() (+11 more)

### Community 52 - "Pt"
Cohesion: 0.14
Nodes (12): coalesced(), Finger, LassoAction, MoveAction, pointsOf(), pressureOf(), moveBox(), movePoint() (+4 more)

### Community 53 - "feedback.ts"
Cohesion: 0.08
Nodes (35): vite-plugin-pwa, accountOffMessage(), Site, commentDate(), commentItem(), COMMENTS_MAX, CommentsDeps, CommentsError (+27 more)

### Community 54 - "graph.ts"
Cohesion: 0.08
Nodes (38): @maxgraph/core, AT_X, cellHtml(), cellText(), COMPASS, createEdgeCell(), createGraph(), drawSchema() (+30 more)

### Community 55 - "ui/preview.ts"
Cohesion: 0.08
Nodes (23): GraphLabels, renameGraphScope(), renameScopeKeys(), BlockKind, MoveDir, draw(), drawCached(), drawn (+15 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "selection.ts"
Cohesion: 0.12
Nodes (22): centerOn(), copyStrokes(), cross(), handleScale(), IDENTITY, insideLasso(), keepInside(), LASSO_SHARE (+14 more)

### Community 58 - "FoldersStore"
Cohesion: 0.18
Nodes (3): cleanFolderName(), FoldersStore, sameName()

### Community 59 - "odesolve.ts"
Cohesion: 0.08
Nodes (70): addWave(), arrange(), cauchy(), characteristicRoots(), compiled(), constantNames(), constantParticular(), constantRoots() (+62 more)

### Community 60 - "plan.ts"
Cohesion: 0.16
Nodes (17): cellText(), columnRole(), columnsOf(), durationUnit(), isNumber(), isPlanRange(), MAX_ACTIVITIES, plain() (+9 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "page.ts"
Cohesion: 0.06
Nodes (52): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), currentAccount(), PullResult, board, openShareDialog() (+44 more)

### Community 63 - "h"
Cohesion: 0.14
Nodes (19): viewSwitch, h(), icon(), kb(), touchLogFieldset(), touchLogFileName(), touchLogHeader(), HINT_MS (+11 more)

### Community 64 - "Glifo – note per Claude"
Cohesion: 0.25
Nodes (8): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Regole, sqlite()

### Community 65 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 66 - "spreadsheet/editor.ts"
Cohesion: 0.09
Nodes (51): readSheet(), valueText(), currentCall(), Editing, MenuEntry, Move, openSheetEditor(), PATHS (+43 more)

### Community 67 - "probability.ts"
Cohesion: 0.12
Nodes (26): End, Family, CompileOptions, ExactScope, RelOp, ALL, complement(), endAt() (+18 more)

### Community 68 - "smoke-test.mjs"
Cohesion: 0.25
Nodes (5): fflate, markdown-it, fakeLlmWorker(), firstVisit(), plainContext

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "linsys.ts"
Cohesion: 0.06
Nodes (75): numberText(), decimalSeparator(), Digits, formatNumber(), FormatOptions, formatRational(), fromNumber(), fromRational() (+67 more)

### Community 72 - "Field"
Cohesion: 0.13
Nodes (6): eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn()

### Community 73 - "MarkdownEditor"
Cohesion: 0.10
Nodes (19): EditorCallbacks, MarkdownEditor, insertBlock(), insertTemplate(), wrapSelection(), Action, createToolbar(), insertCode() (+11 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (70): linearParts(), valueAt(), primitive(), verified(), linearCells(), assumePositive(), atValues(), combine() (+62 more)

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
Nodes (71): alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ARROW_NAMES, AT_ICONS (+63 more)

### Community 79 - "parseSchema"
Cohesion: 0.08
Nodes (31): schemaSummary(), svg(), loadDialect(), SchemaEditorOptions, base64(), hide(), OPEN, schemasForFile() (+23 more)

### Community 82 - "markdown.ts"
Cohesion: 0.06
Nodes (63): lineDepth(), parseBlockMath(), blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove (+55 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.20
Nodes (6): centerOf(), clickOn(), ffmpeg, SCENES, SIZE, work

### Community 90 - "Abbonamenti"
Cohesion: 0.14
Nodes (14): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+6 more)

### Community 91 - "spiegami-qwen.mjs"
Cohesion: 0.25
Nodes (5): playwright-core, vite, minutes, postMessage(), started

### Community 96 - "account-test.mjs"
Cohesion: 0.13
Nodes (9): device(), login(), newContext, waitFor(), b64(), CODE, GOOGLE_CODE, ROOT (+1 more)

### Community 97 - "Il database degli account (Supabase)"
Cohesion: 0.18
Nodes (10): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Nell'app, Note condivise con un link (+2 more)

### Community 98 - "board.ts"
Cohesion: 0.06
Nodes (63): Action, ACTION_NAMES, DOT_SIZES, DrawAction, EraseAction, EraserMode, HANDLE_REACH, ICON (+55 more)

### Community 100 - "Glifo"
Cohesion: 0.13
Nodes (15): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Commenti, Compatibilità con VS Code, Condividere una nota con un link (+7 more)

### Community 101 - "logo.ts"
Cohesion: 0.24
Nodes (7): PNG_ICONS, sidebarToggle(), BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark()

### Community 102 - "supabase.ts"
Cohesion: 0.14
Nodes (27): @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken(), ensureSessionOf() (+19 more)

### Community 103 - "files.ts"
Cohesion: 0.11
Nodes (23): cache, capability(), ClaudeRuntime, hostDownloads, HostError, hostSample, inClaudeViewer(), ModelTier (+15 more)

### Community 104 - "limits.ts"
Cohesion: 0.21
Nodes (17): exponentialForm(), fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), alternating() (+9 more)

### Community 105 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 106 - "I modelli e le chiavi API"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), In prova sul ramo `prova` (7 ottobre 2026): Qwen3 nel browser per «Spiegami», Le idee dello studente (5 ottobre 2026)

### Community 107 - "localModels.ts"
Cohesion: 0.09
Nodes (29): @mlc-ai/web-llm, chat(), GlifoError, Gpu, load(), post(), remove(), scope (+21 more)

### Community 108 - "xlsx.ts"
Cohesion: 0.06
Nodes (64): RFC-4180, sheetSummary(), csvDelimiter(), csvToSheet(), field(), italian(), parseCsv(), sheetToCsv() (+56 more)

### Community 110 - "explainPanel.ts"
Cohesion: 0.13
Nodes (19): ExplainTone, Explanation, FollowUp, REPLY_TOKENS, ChatMessage, Settings, AI_NEWS_TITLE, AI_WORKING_TITLE (+11 more)

### Community 113 - ".paintVertexShape"
Cohesion: 0.12
Nodes (6): DotShape, IdentifyingRelationShape, LanesShape, NoteShape, TableShape, WeakEntityShape

### Community 116 - "spreadsheet/format.ts"
Cohesion: 0.11
Nodes (36): at(), breakEven(), dataLine(), dataRange(), Point, quantity(), tableItems(), textLabel() (+28 more)

### Community 117 - "Più avanti"
Cohesion: 0.25
Nodes (8): Account: i propri appunti su ogni dispositivo, anche da condividere, Commenti di chi prova Glifo, Idee per il futuro, In programma, La lavagna: idee in più, Più avanti, Schemi: idee in più, Trasloco: il sito su Cloudflare, con un dominio tutto di Glifo

### Community 118 - "ExplainPanel"
Cohesion: 0.23
Nodes (3): explanationMarkdown(), ExplainPanel, preventFocusSteal()

### Community 119 - "conics.ts"
Cohesion: 0.18
Nodes (29): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+21 more)

### Community 120 - "siteUpdate.ts"
Cohesion: 0.16
Nodes (17): tablesNote(), checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure (+9 more)

### Community 121 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "schedule.ts"
Cohesion: 0.18
Nodes (17): checkGiven(), criticalPaths(), key(), Link, LinkType, listText(), offset(), order() (+9 more)

### Community 124 - "Sheet"
Cohesion: 0.08
Nodes (26): ExactComplexScope, Ode, withWorkLimit(), FiniteContext, FormattedResult, Mat, MathNode, chainOf() (+18 more)

### Community 125 - "sql.ts"
Cohesion: 0.17
Nodes (18): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+10 more)

### Community 126 - "storage.test.ts"
Cohesion: 0.38
Nodes (8): addPersonalWord(), DICTIONARY_KEY, loadPersonalWords(), savePersonalWords(), tidy(), loadSettings(), saveSettings(), stored()

### Community 127 - "grafo-html.mjs"
Cohesion: 0.22
Nodes (4): graphFile, names, namesFile, root

### Community 128 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 129 - "graph/file.ts"
Cohesion: 0.11
Nodes (33): figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsFromFile(), OPEN, swatchSvg(), titleBand() (+25 more)

### Community 132 - "laplace.ts"
Cohesion: 0.10
Nodes (53): factoredPolynomial(), factorsOf(), beyondPoles(), compiled(), E, exp(), fractionShown(), HALF (+45 more)

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 158 - "editor/editor.ts"
Cohesion: 0.05
Nodes (43): description, devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript (+35 more)

## Knowledge Gaps
- **675 isolated node(s):** `Deciso`, `Com'è andata la discussione`, `La proposta dello studente (4 ottobre 2026)`, `Il parere di Claude, in breve`, `Come si decide cosa far pagare` (+670 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 946 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **36 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `touchlog.ts`, `graph/file.ts`, `main.ts`, `compile`, `Parser`, `spec.ts`, `sheet.ts`, `num`, `graph/preview.ts`, `picture.ts`, `svg.ts`, `parse.ts`, `SchemaEditor`, `Board`, `SheetEditor`, `MathError`, `Rational`, `ExplainChat`, `explainSubjects.ts`, `aiPanel.test.ts`, `BoardStore`, `linear.ts`, `assistant.ts`, `dialogs.ts`, `several.ts`, `gantt.ts`, `graphNote.test.ts`, `logic.ts`, `NotesStore`, `complex.ts`, `namesIn`, `view3d.ts`, `statsShown.ts`, `vitest`, `study.ts`, `functions.ts`, `finite.ts`, `toLatex`, `distributions.ts`, `board/shapes.ts`, `topics.ts`, `escapeHtml`, `Pt`, `feedback.ts`, `graph.ts`, `ui/preview.ts`, `selection.ts`, `odesolve.ts`, `plan.ts`, `h`, `spreadsheet/editor.ts`, `smoke-test.mjs`, `linsys.ts`, `MarkdownEditor`, `symbolic.ts`, `schema/editor.ts`, `parseSchema`, `markdown.ts`, `board.ts`, `logo.ts`, `supabase.ts`, `files.ts`, `limits.ts`, `localModels.ts`, `xlsx.ts`, `explainPanel.ts`, `.paintVertexShape`, `spreadsheet/format.ts`, `ExplainPanel`, `conics.ts`, `siteUpdate.ts`, `schedule.ts`, `Sheet`?**
  _High betweenness centrality (0.159) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `touchlog.ts`, `sync.ts`, `laplace.ts`, `sheet.ts`, `num`, `appleTouch`, `Dove sono le cose`, `picture.ts`, `editor/lists.ts`, `svg.ts`, `parse.ts`, `editor.test.ts`, `aiPanel.test.ts`, `BoardStore`, `linear.ts`, `assistant.ts`, `dialogs.ts`, `dom.ts`, `editor/editor.ts`, `gantt.ts`, `sidePanel.ts`, `graphNote.test.ts`, `NotesStore`, `view3d.ts`, `resize.ts`, `toLatex`, `distributions.ts`, `board/shapes.ts`, `feedback.ts`, `ui/preview.ts`, `selection.ts`, `plan.ts`, `page.ts`, `h`, `spreadsheet/editor.ts`, `linsys.ts`, `schema/editor.ts`, `parseSchema`, `markdown.ts`, `board.ts`, `logo.ts`, `supabase.ts`, `localModels.ts`, `xlsx.ts`, `explainPanel.ts`, `spreadsheet/format.ts`, `siteUpdate.ts`, `Sheet`, `sql.ts`, `storage.test.ts`?**
  _High betweenness centrality (0.087) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `Parser`, `main.ts`, `.constructor`, `graph/preview.ts`, `SchemaEditor`, `Board`, `SheetEditor`, `ExplainChat`, `aiPanel.test.ts`, `dialogs.ts`, `dom.ts`, `gantt.ts`, `sidePanel.ts`, `graphNote.test.ts`, `resize.ts`, `escapeHtml`, `feedback.ts`, `graph.ts`, `ui/preview.ts`, `page.ts`, `spreadsheet/editor.ts`, `MarkdownEditor`, `schema/editor.ts`, `parseSchema`, `board.ts`, `logo.ts`, `explainPanel.ts`, `ExplainPanel`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **Are the 266 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `adoptGuestNotes()`) actually correct?**
  _`Dove sono le cose` has 266 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Deciso`, `Com'è andata la discussione`, `La proposta dello studente (4 ottobre 2026)` to the rest of the system?**
  _675 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `touchlog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08653061224489796 - nodes in this community are weakly interconnected._
- **Should `Parser` be split into smaller, more focused modules?**
  _Cohesion score 0.11543859649122808 - nodes in this community are weakly interconnected._