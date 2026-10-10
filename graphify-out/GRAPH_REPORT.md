# Graph Report - matherdown  (2026-10-10)

## Corpus Check
- 320 files · ~613,457 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5099 nodes · 18403 edges · 160 communities (122 shown, 38 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 590 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `dc0731c1`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- touchlog.ts
- Parser
- main.ts
- compile
- SyncEngine
- spec.ts
- solve.ts
- num
- graph/preview.ts
- Dove sono le cose
- chart.ts
- editor/lists.ts
- svg.ts
- editor/editor.ts
- SchemaEditor
- Board
- SheetEditor
- editor.test.ts
- numerical.ts
- arithmetic.ts
- index.ts
- engine.ts
- topics.ts
- parse.ts
- store.ts
- MathError
- Rational
- assistant.ts
- linsys.ts
- graph/space.ts
- gantt.ts
- tutorial.ts
- search.ts
- @codemirror/state
- logic.ts
- feedback.ts
- complex.ts
- sheet.ts
- captcha.ts
- resize.ts
- graphNote.test.ts
- toNode
- several.ts
- study.ts
- functions.ts
- finite.ts
- NotesStore
- view3d.ts
- statsGraph.ts
- board/shapes.ts
- sidePanel.ts
- SidePanel
- BoardOptions
- sync.ts
- aiPanel.test.ts
- ui/preview.ts
- 20261004091555_note_condivise.sql
- Pt
- settings.ts
- odesolve.ts
- Glifo
- dependencies
- h
- toLatex
- markdown.ts
- Piano per piano
- spreadsheet/editor.ts
- blockMove.ts
- smoke-test.mjs
- Benvenuto in Glifo
- compilerOptions
- relocation-test.mjs
- Stroke
- toolbar.ts
- symbolic.ts
- BoardStore
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- distributions.ts
- session-start.sh
- .claude/CLAUDE.md
- FoldersStore
- tutorial.mjs
- Abbonamenti
- explainSubjects.ts
- Costi
- supabase-stub.sql
- account-test.mjs
- statsShown.ts
- notesPanel.ts
- openShareDialog
- formatNumber
- .int
- siteUpdate.ts
- planBlock.ts
- MarkdownEditor
- board.ts
- explainPanel.ts
- xlsx.ts
- touchLog
- graph.ts
- Il database degli account (Supabase)
- Glifo – note per Claude
- ExplainPanel
- conics.ts
- escapeHtml
- files.ts
- Le spiegazioni, come funzionano
- strokes.ts
- Sheet
- sql.ts
- plan.ts
- grafo-html.mjs
- createFakeSupabase
- graph/file.ts
- renderMarkdown
- deploy.test.ts
- Parser
- spiegami-qwen.mjs
- 20261008130026_commenti.sql
- boardTouchLog.test.ts
- SuggestionController
- page.ts
- llmWorker.ts
- scripts
- devDependencies
- logo.ts
- AccountSync
- linear.test.ts
- ExplainChat
- studyRows

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
- `Trasloco: il sito su Cloudflare, con un dominio tutto di Glifo` --references--> `dist()`  [INFERRED]
  ROADMAP.md → src/board/shapes.ts
- `Dove sono le cose` --references--> `ConicElements`  [INFERRED]
  ARCHITETTURA.md → src/math/conics.ts
- `Dove sono le cose` --references--> `texts()`  [INFERRED]
  ARCHITETTURA.md → tests/boardTouchLog.test.ts
- `Funzionalità` --references--> `k()`  [INFERRED]
  README.md → src/math/numerical.ts
- `Il controllo anti-robot (CAPTCHA, ottobre 2026)` --references--> `captchaToken()`  [INFERRED]
  supabase/README.md → src/account/captcha.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (160 total, 38 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.15
Nodes (16): at(), browserStore, clip(), KINDS, LOG_KEY, Moves, MOVES_MAX, pointerDetail() (+8 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (106): graphsForFile(), hide(), account, ACCOUNT_OFF, active, aiShown(), aiToggle, aiWork (+98 more)

### Community 3 - "compile"
Cohesion: 0.04
Nodes (105): integralRegion, LayeredSolid, criticalLine(), named(), severalItems(), surface(), areaFor(), complexValue() (+97 more)

### Community 4 - "SyncEngine"
Cohesion: 0.07
Nodes (22): @electric-sql/pglite, isEmpty(), iso(), LocalChange, merge(), ms(), noChange(), Prefs (+14 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (96): conicItems(), isConicLine(), quadricEquation(), isFourierLine(), isComplexLine(), onlyComplex(), isTestLine(), number() (+88 more)

### Community 6 - "solve.ts"
Cohesion: 0.15
Nodes (30): nameLatex(), LinearScope, rref(), gcd(), isStandardUnknown(), linearSystem(), matrixEquation(), matrixSystem() (+22 more)

### Community 7 - "num"
Cohesion: 0.09
Nodes (120): atIntegers(), signsUp(), symbolicCoefficient(), withoutAbs(), exp(), hyperbolicToExp(), inverseRational(), sqrtEx() (+112 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (42): addLabel(), boxes, cameras, complexCoord(), coord(), drawings, drawnViews, endTex() (+34 more)

### Community 9 - "Dove sono le cose"
Cohesion: 0.06
Nodes (73): Dove sono le cose, Glifo – architettura, allNames(), answerFollowUp(), bareResult(), CHAT_SUBJECT, chatContext, ChatFn (+65 more)

### Community 10 - "chart.ts"
Cohesion: 0.12
Nodes (32): at(), breakEven(), dataLine(), dataRange(), Point, quantity(), tableItems(), textLabel() (+24 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.11
Nodes (51): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+43 more)

### Community 12 - "svg.ts"
Cohesion: 0.08
Nodes (58): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), dataWindow(), domainEdge() (+50 more)

### Community 13 - "editor/editor.ts"
Cohesion: 0.07
Nodes (33): description, name, private, type, version, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/language-data (+25 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.09
Nodes (9): isLanes(), SchemaEditor, withLaneContents(), nodeLook(), nodeStyle(), EdgeLook, laneNames(), NodeLook (+1 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (6): rangeLabel(), SheetEditor, CellRange, clearRange(), cloneSheet(), setCell()

### Community 17 - "editor.test.ts"
Cohesion: 0.10
Nodes (18): addPlaceholders, buildDecorations(), clearAllPlaceholders(), clearPlaceholders, CommandTarget, contains(), currentIndex(), filledMark (+10 more)

### Community 18 - "numerical.ts"
Cohesion: 0.12
Nodes (47): bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial(), interpolating() (+39 more)

### Community 19 - "arithmetic.ts"
Cohesion: 0.08
Nodes (69): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+61 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (42): b, bigops, c, calculus, fn, fr, fractions, functions (+34 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "topics.ts"
Cohesion: 0.13
Nodes (27): ATTRIBUTES, count(), cut(), ER_SHAPES, fieldText(), fitLines(), flowOrder(), formulaText() (+19 more)

### Community 23 - "parse.ts"
Cohesion: 0.06
Nodes (40): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, differentialInFraction(), DISTRIBUTION_EXAMPLES (+32 more)

### Community 24 - "store.ts"
Cohesion: 0.11
Nodes (13): BoardBackend, done(), fromRecord(), IdbBoards, ofNote(), openBoardDatabase(), openDefault(), request() (+5 more)

### Community 25 - "MathError"
Cohesion: 0.16
Nodes (44): MathError, angleBetween(), asMatrix(), basisOf(), cross(), Ctx, dataOf(), determinant() (+36 more)

### Community 26 - "Rational"
Cohesion: 0.13
Nodes (19): Part, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactRandom, exactRoot(), ExactUnavailable (+11 more)

### Community 27 - "assistant.ts"
Cohesion: 0.16
Nodes (19): AiAnswer, AiError, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible(), askThroughHost(), checkShape() (+11 more)

### Community 28 - "linsys.ts"
Cohesion: 0.14
Nodes (40): choices(), exText(), minorsGcd(), ONE, parametricRows(), parametricSystem(), PARAMS, polyDeterminant() (+32 more)

### Community 29 - "graph/space.ts"
Cohesion: 0.14
Nodes (40): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+32 more)

### Community 30 - "gantt.ts"
Cohesion: 0.08
Nodes (60): amount(), barColor(), crossings(), dateText(), dayOf(), fitText(), GanttOptions, ganttSvg() (+52 more)

### Community 31 - "tutorial.ts"
Cohesion: 0.15
Nodes (14): helpButton, openGuide(), receiveRelocation(), HINT_MS, markTutorialSeen(), openTutorial(), show(), richText() (+6 more)

### Community 32 - "search.ts"
Cohesion: 0.16
Nodes (25): SuggestionItem, editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase() (+17 more)

### Community 33 - "@codemirror/state"
Cohesion: 0.07
Nodes (28): @codemirror/lang-markdown, @codemirror/state, noIndentedCode, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck() (+20 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "feedback.ts"
Cohesion: 0.11
Nodes (32): Site, commentDate(), commentItem(), COMMENTS_MAX, CommentsDeps, CommentsError, isComment(), KINDS (+24 more)

### Community 36 - "complex.ts"
Cohesion: 0.04
Nodes (86): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexValue(), isInequality() (+78 more)

### Community 37 - "sheet.ts"
Cohesion: 0.05
Nodes (75): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+67 more)

### Community 38 - "captcha.ts"
Cohesion: 0.21
Nodes (8): captchaToken(), loadTurnstile(), Turnstile, TURNSTILE_SCRIPT, Window, TURNSTILE_SITE_KEY, accountFailure(), Options

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "graphNote.test.ts"
Cohesion: 0.06
Nodes (38): @codemirror/language, @lezer/common, acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult, calcResults() (+30 more)

### Community 41 - "toNode"
Cohesion: 0.12
Nodes (33): close(), Definite, definiteIntegral(), exValue(), samples(), EMPTY_SCOPE, absOf(), boundsOf() (+25 more)

### Community 42 - "several.ts"
Cohesion: 0.12
Nodes (39): severalLimit, at(), bounded(), Candidate, candidates(), compiled(), Constraint, constraintsOf() (+31 more)

### Community 43 - "study.ts"
Cohesion: 0.21
Nodes (25): limit(), Asymptote, boundaries(), compiled(), cutsOf(), defined(), domainOf(), exact() (+17 more)

### Community 44 - "functions.ts"
Cohesion: 0.09
Nodes (59): EMPTY, number(), addFormat(), divFormat(), GENERAL, mulFormat(), tidy(), withCents() (+51 more)

### Community 45 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 46 - "NotesStore"
Cohesion: 0.05
Nodes (69): currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf(), setCurrentAccount(), restore() (+61 more)

### Community 47 - "view3d.ts"
Cohesion: 0.09
Nodes (41): Box, Detail, Face, FAST, FINE, planeSide(), planeTolerance(), regionFaces() (+33 more)

### Community 48 - "statsGraph.ts"
Cohesion: 0.18
Nodes (16): classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX, Line, number(), pmfBars() (+8 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.14
Nodes (33): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+25 more)

### Community 50 - "sidePanel.ts"
Cohesion: 0.20
Nodes (14): AiResult, templateInsertion(), CATEGORIES, cardPreviewTex(), formPreviewTex(), ParsedTemplate, parseTemplate(), PLACEHOLDER_TEX (+6 more)

### Community 51 - "SidePanel"
Cohesion: 0.14
Nodes (12): katex, cache, cleanKatexError(), renderTex(), renderTexOrError(), renderTexWithResult(), TexRender, isConfidentAnswer() (+4 more)

### Community 53 - "sync.ts"
Cohesion: 0.07
Nodes (52): @supabase/supabase-js, AUTH_STORAGE_KEY, withLock(), Account, accountError, appUrl(), call(), currentSession() (+44 more)

### Community 54 - "aiPanel.test.ts"
Cohesion: 0.08
Nodes (29): ExplainTone, definedName(), formulaTopic(), graphTopic(), numberText(), studyOf(), theoremTopic(), SubjectKind (+21 more)

### Community 55 - "ui/preview.ts"
Cohesion: 0.08
Nodes (23): GraphLabels, renameGraphScope(), renameScopeKeys(), BlockKind, MoveDir, draw(), drawCached(), drawn (+15 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "Pt"
Cohesion: 0.09
Nodes (17): clampZoom(), coalesced(), EraseAction, Finger, LassoAction, MoveAction, PanAction, penErases() (+9 more)

### Community 58 - "settings.ts"
Cohesion: 0.10
Nodes (22): DEFAULT_LOCAL_MODEL, applySpellcheck(), backup(), openSettings(), setPersonalWords(), sidebarBottom, wordsChangedHere(), addPersonalWord() (+14 more)

### Community 59 - "odesolve.ts"
Cohesion: 0.08
Nodes (69): Piece, linearIn(), addWave(), arrange(), cauchy(), compiled(), Condition, constantNames() (+61 more)

### Community 60 - "Glifo"
Cohesion: 0.13
Nodes (15): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Commenti, Compatibilità con VS Code, Condividere una nota con un link (+7 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "h"
Cohesion: 0.06
Nodes (57): SyncStatus, board, viewSwitch, RelocationResult, fieldInput(), loadDialect(), openSignedOut(), printButton() (+49 more)

### Community 63 - "toLatex"
Cohesion: 0.04
Nodes (83): vitest, FieldContext, fourierItems(), staticGraphSvg(), chooseWindow(), chooseBox(), GraphItem, parseGraph() (+75 more)

### Community 64 - "markdown.ts"
Cohesion: 0.11
Nodes (32): parseBlockMath(), bulletGroup(), sameList(), moveAttrs(), alignInside(), asciiTrim(), findMarker(), isOrdered() (+24 more)

### Community 65 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 66 - "spreadsheet/editor.ts"
Cohesion: 0.06
Nodes (81): RFC-4180, fflate, KINDS, sheetSummary(), WidgetBlock, openSheet(), saveSheetBlock(), tablesNote() (+73 more)

### Community 67 - "blockMove.ts"
Cohesion: 0.10
Nodes (35): @codemirror/commands, blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove, blockPlace() (+27 more)

### Community 68 - "smoke-test.mjs"
Cohesion: 0.25
Nodes (5): markdown-it, playwright-core, fakeLlmWorker(), firstVisit(), plainContext

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "relocation-test.mjs"
Cohesion: 0.18
Nodes (7): AFTER_MOVE, ids, newBrowser(), NOTICE_DAY, out, serve(), TYPES

### Community 72 - "Stroke"
Cohesion: 0.15
Nodes (7): Step, strokeSummary(), handleScale(), shapePoints(), BoardChange, BoardData, Stroke

### Community 73 - "toolbar.ts"
Cohesion: 0.12
Nodes (23): insertBlock(), InsertOptions, toggleLinePrefix(), wrapSelection(), LIST_STYLES, besideSchema(), schemaBlockRanges(), Action (+15 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.08
Nodes (46): primitive(), verified(), quadraticIn(), atValues(), Converter, coordinates(), decimalText(), definiteParts() (+38 more)

### Community 75 - "BoardStore"
Cohesion: 0.12
Nodes (5): BoardStore, MemoryBoards, deleteNote(), signOutAccount(), boardsFor()

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Errore o imprevisto → nel dettaglio, 3. Serve una decisione → frasi complete, 4. Fine del compito → un solo riepilogo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.03
Nodes (99): laneOf(), schemaSummary(), GraphLook, alignBoxes(), Alignment, Box, distributeBoxes(), Position (+91 more)

### Community 79 - "distributions.ts"
Cohesion: 0.06
Nodes (64): addExp(), choose(), continuousQuantile(), discreteQuantile(), Distribution, exactIntervalProbability(), expSum, factorialBig() (+56 more)

### Community 82 - "FoldersStore"
Cohesion: 0.15
Nodes (7): accountSpace(), adoptGuestNotes(), completeSignIn(), cleanFolderName(), FoldersStore, sameName(), names()

### Community 83 - "tutorial.mjs"
Cohesion: 0.20
Nodes (6): centerOf(), clickOn(), ffmpeg, SCENES, SIZE, work

### Community 90 - "Abbonamenti"
Cohesion: 0.08
Nodes (24): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Deciso (5 ottobre 2026), Deciso (5 ottobre 2026) (+16 more)

### Community 91 - "explainSubjects.ts"
Cohesion: 0.18
Nodes (21): explainTarget, Explanation, formulasUntil(), sheetBefore(), explanationMarkdown(), hasCalculation(), insertAfterBlock(), insertAfterText() (+13 more)

### Community 92 - "Costi"
Cohesion: 0.21
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 96 - "account-test.mjs"
Cohesion: 0.12
Nodes (10): device(), login(), newContext, waitFor(), b64(), CAPTCHA_TOKEN, CODE, GOOGLE_CODE (+2 more)

### Community 97 - "statsShown.ts"
Cohesion: 0.18
Nodes (30): check(), correlation(), count(), covariance(), Data, dataStatistic(), deviation(), fail() (+22 more)

### Community 98 - "notesPanel.ts"
Cohesion: 0.17
Nodes (6): saveClosedFolders(), formatDate(), MenuEntry, openMenu(), NotesPanel, NotesPanelDeps

### Community 100 - "openShareDialog"
Cohesion: 0.09
Nodes (32): SUPABASE_KEY, SUPABASE_URL, accountDataFile(), PullResult, openShareDialog(), changeAccess(), changeCopy(), copy() (+24 more)

### Community 101 - "formatNumber"
Cohesion: 0.09
Nodes (45): decimalSeparator(), Digits, formatNumber(), FormatOptions, formatRational(), fromNumber(), fromRational(), SUPERSCRIPT (+37 more)

### Community 102 - ".int"
Cohesion: 0.10
Nodes (9): characteristicPolynomial(), eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), Mat, polynomialIn() (+1 more)

### Community 103 - "siteUpdate.ts"
Cohesion: 0.16
Nodes (19): loadingEditor(), checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure (+11 more)

### Community 104 - "planBlock.ts"
Cohesion: 0.16
Nodes (13): MONTHS, parseDate(), planBlock, PlanKind, planRange(), readPlan(), ganttWidth(), PlanView (+5 more)

### Community 105 - "MarkdownEditor"
Cohesion: 0.17
Nodes (4): EditorCallbacks, MarkdownEditor, insertTemplate(), setup()

### Community 106 - "board.ts"
Cohesion: 0.07
Nodes (37): Action, ACTION_NAMES, DOT_SIZES, DrawAction, EraserMode, HANDLE_REACH, ICON, MODE_NAMES (+29 more)

### Community 107 - "explainPanel.ts"
Cohesion: 0.12
Nodes (21): REPLY_TOKENS, LocalAbort, localErrorMessage(), localLlm, Pending, WorkerLike, ChatMessage, ChatOptions (+13 more)

### Community 108 - "xlsx.ts"
Cohesion: 0.09
Nodes (40): sameFormat(), BinOp, COMPARE, ERRORS_BY_LENGTH, formulaBody(), formulaRefs(), OPERATORS, parseFormula() (+32 more)

### Community 110 - "touchLog"
Cohesion: 0.29
Nodes (3): movesLine(), seconds(), touchLog

### Community 113 - "graph.ts"
Cohesion: 0.05
Nodes (48): @maxgraph/core, AT_X, cellHtml(), cellText(), COMPASS, createEdgeCell(), createGraph(), drawSchema() (+40 more)

### Community 116 - "Il database degli account (Supabase)"
Cohesion: 0.12
Nodes (15): Accesso con Google, Cambiare il database, Commenti di chi prova Glifo, Cosa c'è, Eliminare l'account, Il controllo anti-robot (CAPTCHA, ottobre 2026), Il database degli account (Supabase), Il progetto (+7 more)

### Community 117 - "Glifo – note per Claude"
Cohesion: 0.11
Nodes (18): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole (+10 more)

### Community 119 - "conics.ts"
Cohesion: 0.18
Nodes (29): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+21 more)

### Community 120 - "escapeHtml"
Cohesion: 0.21
Nodes (10): NoteSubject, checkHtml(), checkTitle(), escapeHtml(), AiPanel, graphLabel(), texInline(), sentenceHtml() (+2 more)

### Community 121 - "files.ts"
Cohesion: 0.13
Nodes (21): cache, capability(), ClaudeRuntime, hostDownloads, HostError, hostSample, inClaudeViewer(), ModelTier (+13 more)

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "strokes.ts"
Cohesion: 0.09
Nodes (40): centerOn(), copyStrokes(), cross(), IDENTITY, insideLasso(), keepInside(), LASSO_SHARE, lassoed() (+32 more)

### Community 124 - "Sheet"
Cohesion: 0.09
Nodes (22): Definition, Line, withWorkLimit(), FormattedResult, MathNode, chainOf(), close(), definitionTarget() (+14 more)

### Community 125 - "sql.ts"
Cohesion: 0.21
Nodes (15): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+7 more)

### Community 126 - "plan.ts"
Cohesion: 0.20
Nodes (15): cellText(), columnRole(), columnsOf(), durationUnit(), isNumber(), isPlanRange(), MAX_ACTIVITIES, plain() (+7 more)

### Community 127 - "grafo-html.mjs"
Cohesion: 0.17
Nodes (5): graphFile, names, namesFile, root, PNG_ICONS

### Community 128 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 129 - "graph/file.ts"
Cohesion: 0.11
Nodes (32): figureName(), graphFigure(), graphImage(), graphsFromFile(), OPEN, swatchSvg(), titleBand(), unhide() (+24 more)

### Community 131 - "renderMarkdown"
Cohesion: 0.08
Nodes (22): BlockWidget, findWidgetBlocks(), guardBlocks(), schemaBlocks(), svg(), graphImagesFor(), readChart(), configurePurify() (+14 more)

### Community 132 - "deploy.test.ts"
Cohesion: 0.28
Nodes (4): vite-plugin-pwa, accountOffMessage(), defineFor(), MAIN_BRANCH

### Community 136 - "spiegami-qwen.mjs"
Cohesion: 0.29
Nodes (4): vite, minutes, postMessage(), started

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 139 - "boardTouchLog.test.ts"
Cohesion: 0.20
Nodes (8): isSaved(), LOG_MAX_LINES, LogStore, SavedLog, clock(), memoryStore(), newLog(), texts()

### Community 140 - "SuggestionController"
Cohesion: 0.23
Nodes (4): EditorMathContext, expand(), preferredIndex(), SuggestionController

### Community 141 - "page.ts"
Cohesion: 0.17
Nodes (12): NEW_ORIGIN, body, saveButton, saveCopy(), settings, status, systemDark, title (+4 more)

### Community 142 - "llmWorker.ts"
Cohesion: 0.26
Nodes (12): @mlc-ai/web-llm, chat(), GlifoError, Gpu, load(), post(), remove(), scope (+4 more)

### Community 143 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 144 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

### Community 145 - "logo.ts"
Cohesion: 0.33
Nodes (6): sidebarToggle(), BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark()

### Community 147 - "linear.test.ts"
Cohesion: 0.29
Nodes (7): EXACT, FLOAT, A, B, q(), result(), text()

### Community 149 - "studyRows"
Cohesion: 0.33
Nodes (7): LE(), phrase(), pointText(), spansText(), spanText(), studyPart(), studyRows()

## Knowledge Gaps
- **697 isolated node(s):** `Deciso`, `Com'è andata la discussione`, `La proposta dello studente (4 ottobre 2026)`, `Il parere di Claude, in breve`, `Come si decide cosa far pagare` (+692 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 976 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **38 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `touchlog.ts`, `Parser`, `main.ts`, `compile`, `spec.ts`, `solve.ts`, `num`, `graph/preview.ts`, `chart.ts`, `svg.ts`, `SchemaEditor`, `Board`, `SheetEditor`, `numerical.ts`, `arithmetic.ts`, `topics.ts`, `parse.ts`, `MathError`, `Rational`, `assistant.ts`, `linsys.ts`, `graph/space.ts`, `gantt.ts`, `tutorial.ts`, `logic.ts`, `complex.ts`, `sheet.ts`, `graphNote.test.ts`, `toNode`, `several.ts`, `functions.ts`, `finite.ts`, `NotesStore`, `board/shapes.ts`, `sidePanel.ts`, `SidePanel`, `sync.ts`, `aiPanel.test.ts`, `ui/preview.ts`, `Pt`, `settings.ts`, `odesolve.ts`, `h`, `toLatex`, `spreadsheet/editor.ts`, `blockMove.ts`, `smoke-test.mjs`, `Stroke`, `toolbar.ts`, `symbolic.ts`, `BoardStore`, `schema/editor.ts`, `distributions.ts`, `FoldersStore`, `explainSubjects.ts`, `siteUpdate.ts`, `planBlock.ts`, `MarkdownEditor`, `board.ts`, `explainPanel.ts`, `xlsx.ts`, `touchLog`, `graph.ts`, `ExplainPanel`, `conics.ts`, `escapeHtml`, `files.ts`, `strokes.ts`, `Sheet`, `plan.ts`, `graph/file.ts`, `renderMarkdown`, `deploy.test.ts`, `boardTouchLog.test.ts`, `llmWorker.ts`, `logo.ts`, `ExplainChat`, `studyRows`?**
  _High betweenness centrality (0.166) - this node is a cross-community bridge._
- **Why does `vitest` connect `toLatex` to `touchlog.ts`, `main.ts`, `renderMarkdown`, `SyncEngine`, `deploy.test.ts`, `num`, `Dove sono le cose`, `chart.ts`, `boardTouchLog.test.ts`, `svg.ts`, `editor/editor.ts`, `editor/lists.ts`, `editor.test.ts`, `logo.ts`, `linear.test.ts`, `parse.ts`, `store.ts`, `assistant.ts`, `linsys.ts`, `gantt.ts`, `tutorial.ts`, `search.ts`, `@codemirror/state`, `feedback.ts`, `sheet.ts`, `captcha.ts`, `resize.ts`, `graphNote.test.ts`, `NotesStore`, `board/shapes.ts`, `sidePanel.ts`, `sync.ts`, `aiPanel.test.ts`, `ui/preview.ts`, `settings.ts`, `h`, `spreadsheet/editor.ts`, `blockMove.ts`, `toolbar.ts`, `schema/editor.ts`, `distributions.ts`, `openShareDialog`, `siteUpdate.ts`, `MarkdownEditor`, `board.ts`, `explainPanel.ts`, `strokes.ts`, `Sheet`, `plan.ts`?**
  _High betweenness centrality (0.092) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `main.ts`, `graph/preview.ts`, `page.ts`, `SchemaEditor`, `Board`, `SheetEditor`, `logo.ts`, `ExplainChat`, `tutorial.ts`, `@codemirror/state`, `feedback.ts`, `resize.ts`, `NotesStore`, `sidePanel.ts`, `SidePanel`, `aiPanel.test.ts`, `ui/preview.ts`, `spreadsheet/editor.ts`, `toolbar.ts`, `schema/editor.ts`, `notesPanel.ts`, `openShareDialog`, `planBlock.ts`, `board.ts`, `explainPanel.ts`, `ExplainPanel`, `escapeHtml`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **Are the 271 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `adoptGuestNotes()`) actually correct?**
  _`Dove sono le cose` has 271 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Deciso`, `Com'è andata la discussione`, `La proposta dello studente (4 ottobre 2026)` to the rest of the system?**
  _697 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.03768115942028986 - nodes in this community are weakly interconnected._
- **Should `compile` be split into smaller, more focused modules?**
  _Cohesion score 0.042440318302387266 - nodes in this community are weakly interconnected._