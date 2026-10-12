# Graph Report - matherdown  (2026-10-12)

## Corpus Check
- 327 files · ~641,065 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5237 nodes · 18575 edges · 157 communities (122 shown, 35 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 351 edges (avg confidence: 0.84)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a7e15454`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- touchlog.ts
- Parser
- main.ts
- compile
- sync.ts
- spec.ts
- .constructor
- primitive.ts
- graph/preview.ts
- explain.ts
- spreadsheet/format.ts
- editor/lists.ts
- svg.ts
- feedback.ts
- SchemaEditor
- Board
- SheetEditor
- editor.test.ts
- numerical.ts
- arithmetic.ts
- index.ts
- engine.ts
- dialog.ts
- .renderFormat
- IdbBoards
- MathError
- domain.ts
- assistant.ts
- editor/editor.ts
- page.ts
- gantt.ts
- Pt
- view3d.ts
- spellcheck.ts
- logic.ts
- topics.ts
- complex.ts
- namesIn
- translations.test.ts
- resize.ts
- SpellEngine
- schemaGuard.test.ts
- toLatex
- study.ts
- functions.ts
- finite.ts
- src/relocation.ts
- board.ts
- Rational
- board/shapes.ts
- FoldersStore
- sidePanel.ts
- Converter
- supabase.ts
- laplace.ts
- NotesStore
- 20261004091555_note_condivise.sql
- i18n.ts
- database.ts
- num
- toNode
- dependencies
- Welcome to Glifo
- latex.ts
- h
- odesolve.ts
- spreadsheet/editor.ts
- blockMove.ts
- smoke-test.mjs
- Benvenuto in Glifo
- compilerOptions
- relocation-test.mjs
- parse.ts
- scripts
- symbolic.ts
- SpellClient
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- distributions.ts
- session-start.sh
- .claude/CLAUDE.md
- aiPanel.ts
- tutorial.mjs
- Abbonamenti
- markdown.ts
- Costi
- supabase-stub.sql
- account-test.mjs
- sheet.ts
- explainPanel.ts
- In programma
- linsys.ts
- search.ts
- siteUpdate.ts
- ui/preview.ts
- probability.ts
- Field
- local.ts
- xlsx.ts
- graph.ts
- Il database degli account (Supabase)
- boardTouchLog.test.ts
- toolbar.ts
- conics.ts
- parseSchema
- planPreview.ts
- Le spiegazioni, come funzionano
- strokes.ts
- Sheet
- sql.ts
- touchLog
- createFakeSupabase
- graph/file.ts
- placeholders.ts
- Glifo
- formula.ts
- MarkdownEditor
- 20261008130026_commenti.sql
- plan.ts
- vitest
- vite
- captcha.ts
- Commenti di chi prova Glifo
- devDependencies
- BoardStore
- formatNumber

## God Nodes (most connected - your core abstractions)
1. `MathError` - 151 edges
2. `num()` - 145 edges
3. `Sheet` - 139 edges
4. `MathNode` - 129 edges
5. `mul()` - 124 edges
6. `h()` - 120 edges
7. `Board` - 118 edges
8. `compile()` - 113 edges
9. `Rational` - 111 edges
10. `toLatex()` - 103 edges

## Surprising Connections (you probably didn't know these)
- `Il controllo anti-robot (CAPTCHA, ottobre 2026)` --references--> `captchaToken()`  [INFERRED]
  supabase/README.md → src/account/captcha.ts
- `Come viene pubblicata` --references--> `dist()`  [INFERRED]
  README.md → src/board/shapes.ts
- `Trasloco: il sito su Cloudflare, con un dominio tutto di Glifo` --references--> `dist()`  [INFERRED]
  ROADMAP.md → src/board/shapes.ts
- `Funzionalità` --references--> `k()`  [INFERRED]
  README.md → src/math/numerical.ts
- `Il trasloco su glifo.page (ottobre 2026)` --references--> `appUrl()`  [INFERRED]
  supabase/README.md → src/account/supabase.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (157 total, 35 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.11
Nodes (18): at(), browserStore, clip(), isSaved(), KINDS, LOG_KEY, LogStore, Moves (+10 more)

### Community 2 - "main.ts"
Cohesion: 0.03
Nodes (124): addToGraphBlock(), setGraphLabels(), graphsForFile(), hide(), account, ACCOUNT_OFF, accountButton, active (+116 more)

### Community 3 - "compile"
Cohesion: 0.08
Nodes (47): conicItems(), isConicLine(), argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot() (+39 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (31): AccountSync, withLock(), Account, EMPTY_STATE, FolderChange, FolderRow, isEmpty(), iso() (+23 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (101): quadricEquation(), hasExponential(), onlyComplex(), isNumericalLine(), numericalItems(), constantIntegrand(), depth(), inequalityMargin() (+93 more)

### Community 6 - ".constructor"
Cohesion: 0.17
Nodes (4): BoardOptions, loadPrefs(), sizeChoice(), highlightName()

### Community 7 - "primitive.ts"
Cohesion: 0.16
Nodes (61): degree(), algebraic(), bigGcd(), byParts(), candidates(), canon(), combineLogs(), compareKeys() (+53 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (40): addLabel(), boxes, cameras, complexCoord(), coord(), drawings, drawnViews, endTex() (+32 more)

### Community 9 - "explain.ts"
Cohesion: 0.05
Nodes (76): 4. Più modelli per «Spiegami», allNames(), answerFollowUp(), bareResult(), CHAT_SUBJECT, chatContext, ChatFn, chatSystemPrompt() (+68 more)

### Community 10 - "spreadsheet/format.ts"
Cohesion: 0.11
Nodes (37): at(), breakEven(), dataLine(), dataRange(), Point, quantity(), tableItems(), textLabel() (+29 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.09
Nodes (58): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+50 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (57): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseWindow(), chooseY(), clipLines(), dataWindow() (+49 more)

### Community 13 - "feedback.ts"
Cohesion: 0.10
Nodes (33): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, Site, T, commentDate(), commentItem(), COMMENTS_MAX (+25 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.10
Nodes (4): SchemaEditor, withLaneContents(), EdgeLook, serializeSchema()

### Community 15 - "Board"
Cohesion: 0.11
Nodes (4): Board, penErases(), shapeSvg(), Stroke

### Community 16 - "SheetEditor"
Cohesion: 0.07
Nodes (13): MenuEntry, rangeLabel(), SheetEditor, isFormula(), normalizeFormula(), serializeSheet(), autoSum(), CellRange (+5 more)

### Community 17 - "editor.test.ts"
Cohesion: 0.08
Nodes (32): @codemirror/language, @codemirror/state, @codemirror/view, GraphLabelLines, insertGraphBlock(), InsertOptions, templateInsertion(), CODE_NODES (+24 more)

### Community 18 - "numerical.ts"
Cohesion: 0.12
Nodes (46): bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial(), interpolating() (+38 more)

### Community 19 - "arithmetic.ts"
Cohesion: 0.11
Nodes (47): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+39 more)

### Community 20 - "index.ts"
Cohesion: 0.06
Nodes (45): SuggestionItem, b, bigops, c, calculus, fn, fr, fractions (+37 more)

### Community 21 - "engine.ts"
Cohesion: 0.11
Nodes (16): @farscrl/hunspell-wasm, Backend, SpellClientOptions, workerBackend(), WorkerUnavailable, download(), fetchDictionary(), FILES (+8 more)

### Community 22 - "dialog.ts"
Cohesion: 0.09
Nodes (34): accountDataFile(), PullResult, openShareDialog(), changeAccess(), changeCopy(), refreshChanged(), render(), run() (+26 more)

### Community 23 - ".renderFormat"
Cohesion: 0.26
Nodes (5): fieldInput(), isLanes(), nodeLook(), nodeStyle(), laneNames()

### Community 24 - "IdbBoards"
Cohesion: 0.09
Nodes (13): fake-indexeddb, BoardBackend, done(), fromRecord(), IdbBoards, ofNote(), openBoardDatabase(), openDefault() (+5 more)

### Community 25 - "MathError"
Cohesion: 0.10
Nodes (66): MathError, angleBetween(), asMatrix(), basisOf(), circleText(), complexText(), cross(), Ctx (+58 more)

### Community 26 - "domain.ts"
Cohesion: 0.11
Nodes (33): FieldContext, fourierItems(), isFourierLine(), axesIn(), bestAlong(), boundingBox(), combine(), compileDomain() (+25 more)

### Community 27 - "assistant.ts"
Cohesion: 0.06
Nodes (46): 2. La pagina dei commenti, tipo FAQ, 5. A cosa serve la chiave dell'AI, 6. Glifo anche in inglese, La grafica: le otto richieste del 10 ottobre 2026, @anthropic-ai/sdk, AiAnswer, AiError, AiResult (+38 more)

### Community 28 - "editor/editor.ts"
Cohesion: 0.08
Nodes (29): description, name, private, type, version, @codemirror/autocomplete, @codemirror/commands, @codemirror/language-data (+21 more)

### Community 29 - "page.ts"
Cohesion: 0.10
Nodes (20): sidebarToggle(), NEW_ORIGIN, body, saveButton, saveCopy(), settings, status, systemDark (+12 more)

### Community 30 - "gantt.ts"
Cohesion: 0.06
Nodes (70): amount(), barColor(), crossings(), dateText(), dayOf(), fitText(), GanttOptions, ganttSvg() (+62 more)

### Community 31 - "Pt"
Cohesion: 0.10
Nodes (12): coalesced(), EraseAction, Finger, LassoAction, MoveAction, pointsOf(), pressureOf(), handleScale() (+4 more)

### Community 32 - "view3d.ts"
Cohesion: 0.06
Nodes (85): addMesh(), addTet(), affinePlane(), Axis, Box, centroid(), chooseBox(), clipBy() (+77 more)

### Community 33 - "spellcheck.ts"
Cohesion: 0.07
Nodes (26): @codemirror/lang-markdown, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt() (+18 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "topics.ts"
Cohesion: 0.12
Nodes (34): ATTRIBUTES, count(), cut(), definedName(), ER_SHAPES, fieldText(), fitLines(), flowOrder() (+26 more)

### Community 36 - "complex.ts"
Cohesion: 0.06
Nodes (64): COMPLEX_FUNCTIONS, farthest(), gaussItem(), inZ(), isComplexLine(), isComplexValue(), isInequality(), isSegmentNode() (+56 more)

### Community 37 - "namesIn"
Cohesion: 0.13
Nodes (37): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+29 more)

### Community 38 - "translations.test.ts"
Cohesion: 0.17
Nodes (18): AstNode, calleeName(), check(), checkPair(), visit(), children(), entryPairs(), files (+10 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (24): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+16 more)

### Community 40 - "SpellEngine"
Cohesion: 0.23
Nodes (5): capitalize(), inGlossary(), lower(), SpellEngine, normalizeWord()

### Community 41 - "schemaGuard.test.ts"
Cohesion: 0.11
Nodes (14): toggleLinePrefix(), besideSchema(), BlockWidget, findWidgetBlocks(), guardBlocks(), schemaBlockRanges(), schemaBlocks(), create() (+6 more)

### Community 42 - "toLatex"
Cohesion: 0.10
Nodes (51): valueLabel(), criticalLine(), isSeveralLine(), named(), severalItems(), surface(), areaFor(), multipleLabel() (+43 more)

### Community 43 - "study.ts"
Cohesion: 0.15
Nodes (34): limit(), Asymptote, boundaries(), compiled(), cutsOf(), defined(), domainOf(), exact() (+26 more)

### Community 44 - "functions.ts"
Cohesion: 0.08
Nodes (58): EMPTY, evaluateSheet(), number(), SheetEvaluator, addFormat(), readInput(), formulaBody(), FormulaNode (+50 more)

### Community 45 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 46 - "src/relocation.ts"
Cohesion: 0.09
Nodes (57): 1. «Cambia account», accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount() (+49 more)

### Community 47 - "board.ts"
Cohesion: 0.06
Nodes (47): Action, ACTION_NAMES, clampZoom(), DOT_SIZES, EraserMode, HANDLE_REACH, ICON, MODE_NAMES (+39 more)

### Community 48 - "Rational"
Cohesion: 0.15
Nodes (17): Part, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactFunction, exactRoot(), factorialExact() (+9 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (37): DrawAction, adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners() (+29 more)

### Community 50 - "FoldersStore"
Cohesion: 0.08
Nodes (17): cleanFolderName(), Folder, FolderGroup, FoldersStore, groupByFolder(), loadClosedFolders(), sameName(), saveClosedFolders() (+9 more)

### Community 51 - "sidePanel.ts"
Cohesion: 0.09
Nodes (27): katex, aiSettingsOf(), formulaAtCursor(), texHtml(), checkHtml(), checkTitle(), T, cache (+19 more)

### Community 52 - "Converter"
Cohesion: 0.17
Nodes (16): linearCells(), pairUp(), Converter, definiteParts(), definiteValue(), expandCalculus(), fieldName(), functionOf() (+8 more)

### Community 53 - "supabase.ts"
Cohesion: 0.11
Nodes (37): @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken(), ensureSessionOf() (+29 more)

### Community 54 - "laplace.ts"
Cohesion: 0.12
Nodes (47): factoredPolynomial(), oneFraction(), beyondPoles(), compiled(), E, fractionShown(), HALF, inverseLaplaceShown() (+39 more)

### Community 55 - "NotesStore"
Cohesion: 0.08
Nodes (22): Deletion, DeletionLog, FOLDER_NAME_MAX, RemoteFolder, isUuid(), newId(), createdAtFromId(), deriveTitle() (+14 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "i18n.ts"
Cohesion: 0.07
Nodes (44): Dove sono le cose, Glifo – architettura, 3. Le impostazioni divise in sezioni, ExplainTone, DEFAULT_LOCAL_MODEL, LOCAL_MODELS, T, AI_SERVICES (+36 more)

### Community 58 - "database.ts"
Cohesion: 0.23
Nodes (6): createDatabase(), createUser(), databaseTests(), feedbackTests(), migrations, shareTests()

### Community 59 - "num"
Cohesion: 0.10
Nodes (79): splitAbs(), withoutAbs(), exp(), hyperbolicToExp(), linearIn(), sqrtEx(), termTransform(), polyEx() (+71 more)

### Community 60 - "toNode"
Cohesion: 0.10
Nodes (41): close(), Definite, definiteIntegral(), exValue(), samples(), EMPTY_SCOPE, absOf(), atIntegers() (+33 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "Welcome to Glifo"
Cohesion: 0.20
Nodes (9): A few examples, Calculations and graphs, For programming too, Handy shortcuts, How to write formulas, Lists, Spell check, Try it now (+1 more)

### Community 63 - "latex.ts"
Cohesion: 0.13
Nodes (21): ACCENT_COMMANDS, COMPLEX_FUNCTIONS, DISTRIBUTION_LATEX, distributionLatex(), domainLatex(), fnLatex(), fnName(), formLatex() (+13 more)

### Community 64 - "h"
Cohesion: 0.06
Nodes (67): SyncStatus, rich(), board, loadingEditor(), viewSwitch, RelocationResult, copy(), AccountButton (+59 more)

### Community 65 - "odesolve.ts"
Cohesion: 0.08
Nodes (49): Piece, addWave(), arrange(), compiled(), Condition, constantNames(), equalities(), factorial() (+41 more)

### Community 66 - "spreadsheet/editor.ts"
Cohesion: 0.08
Nodes (56): KINDS, sheetSummary(), T, WidgetBlock, WidgetKind, SchemaBlock, ChartTable, currentCall() (+48 more)

### Community 67 - "blockMove.ts"
Cohesion: 0.10
Nodes (35): blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove, blockPlace(), closed() (+27 more)

### Community 68 - "smoke-test.mjs"
Cohesion: 0.15
Nodes (6): fflate, markdown-it, playwright-core, PNG_ICONS, firstVisit(), plainContext

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "relocation-test.mjs"
Cohesion: 0.18
Nodes (7): AFTER_MOVE, ids, newBrowser(), NOTICE_DAY, out, serve(), TYPES

### Community 72 - "parse.ts"
Cohesion: 0.07
Nodes (36): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, differentialInFraction(), DISTRIBUTION_EXAMPLES (+28 more)

### Community 73 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 74 - "symbolic.ts"
Cohesion: 0.08
Nodes (37): atValues(), commonPositive(), coordinates(), decimalText(), degree(), exactRoot(), exponentOf(), floatOf() (+29 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Errore o imprevisto → nel dettaglio, 3. Serve una decisione → frasi complete, 4. Fine del compito → un solo riepilogo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.04
Nodes (72): alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ARROW_NAMES, AT_ICONS (+64 more)

### Community 79 - "distributions.ts"
Cohesion: 0.08
Nodes (56): choose(), continuousQuantile(), discreteQuantile(), expSumValue(), factorialBig(), FAMILIES, integerParam(), integerRange() (+48 more)

### Community 82 - "aiPanel.ts"
Cohesion: 0.07
Nodes (34): explainTarget, acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult, calcResults(), CheckWidget (+26 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.11
Nodes (10): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+2 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.07
Nodes (30): Abbonamenti, Classico, gratis: per scrivere e controllare, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Deciso (5 ottobre 2026) (+22 more)

### Community 91 - "markdown.ts"
Cohesion: 0.10
Nodes (35): dompurify, highlight.js, markdown-it-footnote, lineDepth(), parseBlockMath(), bulletGroup(), sameList(), alignInside() (+27 more)

### Community 92 - "Costi"
Cohesion: 0.22
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 96 - "account-test.mjs"
Cohesion: 0.10
Nodes (11): @electric-sql/pglite, device(), login(), newContext, waitFor(), b64(), CAPTCHA_TOKEN, CODE (+3 more)

### Community 97 - "sheet.ts"
Cohesion: 0.08
Nodes (54): OdeFunction, Lin, NUMERICAL, BRACKETS, CHECK_VALUES, checks, Definition, GROUP (+46 more)

### Community 98 - "explainPanel.ts"
Cohesion: 0.07
Nodes (28): Explanation, FollowUp, REPLY_TOKENS, explanationMarkdown(), insertAfterBlock(), insertAfterText(), insertExplanation(), nextLineText() (+20 more)

### Community 100 - "In programma"
Cohesion: 0.22
Nodes (9): Account: i propri appunti su ogni dispositivo, anche da condividere, Commenti di chi prova Glifo, Idee per il futuro, In programma, La grafica: account, impostazioni, commenti, AI e lingua (chiesto il 10 ottobre 2026, se ne parla), La lavagna: idee in più, Più avanti, Schemi: idee in più (+1 more)

### Community 101 - "linsys.ts"
Cohesion: 0.07
Nodes (70): FormatOptions, formatRational(), fromRational(), Eigenvalue, FLOAT, LinearScope, LinearValue, rref() (+62 more)

### Community 102 - "search.ts"
Cohesion: 0.15
Nodes (25): preferredIndex(), editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase() (+17 more)

### Community 103 - "siteUpdate.ts"
Cohesion: 0.15
Nodes (19): tablesNote(), checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure (+11 more)

### Community 104 - "ui/preview.ts"
Cohesion: 0.08
Nodes (25): GraphLabels, hydrateGraphs(), renameGraphScope(), renameScopeKeys(), BlockKind, MoveDir, draw(), isDark() (+17 more)

### Community 105 - "probability.ts"
Cohesion: 0.10
Nodes (30): addExp(), End, exactIntervalProbability(), expSum, Family, subtractExp(), compileCondition(), ExactScope (+22 more)

### Community 106 - "Field"
Cohesion: 0.12
Nodes (7): characteristicPolynomial(), eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn()

### Community 107 - "local.ts"
Cohesion: 0.08
Nodes (29): @mlc-ai/web-llm, chat(), GlifoError, Gpu, load(), post(), remove(), scope (+21 more)

### Community 108 - "xlsx.ts"
Cohesion: 0.10
Nodes (41): RFC-4180, csvDelimiter(), csvToSheet(), field(), italian(), parseCsv(), sheetToCsv(), splitRecords() (+33 more)

### Community 113 - "graph.ts"
Cohesion: 0.06
Nodes (44): @maxgraph/core, AT_X, cellHtml(), cellText(), COMPASS, createEdgeCell(), createGraph(), drawSchema() (+36 more)

### Community 116 - "Il database degli account (Supabase)"
Cohesion: 0.14
Nodes (13): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il controllo anti-robot (CAPTCHA, ottobre 2026), Il database degli account (Supabase), Il progetto, Il trasloco su glifo.page (ottobre 2026) (+5 more)

### Community 117 - "boardTouchLog.test.ts"
Cohesion: 0.15
Nodes (14): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Regole, LOG_MAX_LINES (+6 more)

### Community 118 - "toolbar.ts"
Cohesion: 0.16
Nodes (17): insertBlock(), wrapSelection(), ListStyleId, Action, createToolbar(), insertCode(), insertLink(), listMenu() (+9 more)

### Community 119 - "conics.ts"
Cohesion: 0.18
Nodes (29): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+21 more)

### Community 120 - "parseSchema"
Cohesion: 0.09
Nodes (29): schemaSummary(), svg(), SchemaEditorOptions, hide(), OPEN, schemasForFile(), schemasFromFile(), unhide() (+21 more)

### Community 121 - "planPreview.ts"
Cohesion: 0.16
Nodes (12): labelHtml(), planName(), ganttWidth(), PlanView, GraphLook, base64(), svgSize(), svgToPng() (+4 more)

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "strokes.ts"
Cohesion: 0.09
Nodes (36): centerOn(), copyStrokes(), cross(), IDENTITY, insideLasso(), keepInside(), LASSO_SHARE, lassoed() (+28 more)

### Community 124 - "Sheet"
Cohesion: 0.06
Nodes (41): GaussLine, Definition, Line, ExactComplexScope, Ode, withWorkLimit(), ExactRandom, FiniteContext (+33 more)

### Community 125 - "sql.ts"
Cohesion: 0.17
Nodes (18): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+10 more)

### Community 127 - "touchLog"
Cohesion: 0.31
Nodes (3): movesLine(), seconds(), touchLog

### Community 128 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 129 - "graph/file.ts"
Cohesion: 0.07
Nodes (49): FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsFromFile(), OPEN, swatchSvg() (+41 more)

### Community 131 - "placeholders.ts"
Cohesion: 0.13
Nodes (12): addPlaceholders, buildDecorations(), clearAllPlaceholders(), clearPlaceholders, contains(), currentIndex(), filledMark, getPlaceholders() (+4 more)

### Community 132 - "Glifo"
Cohesion: 0.12
Nodes (16): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Commenti, Compatibilità con VS Code, Condividere una nota con un link (+8 more)

### Community 133 - "formula.ts"
Cohesion: 0.12
Nodes (17): BinOp, COMPARE, ERRORS_BY_LENGTH, FormulaError, formulaRefs(), OPERATORS, parseFormula(), Parser (+9 more)

### Community 136 - "MarkdownEditor"
Cohesion: 0.15
Nodes (7): closeMathBlockOnEnter(), EditorCallbacks, MarkdownEditor, searchPhrases(), tabOutOfMath(), insertTemplate(), setup()

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 139 - "plan.ts"
Cohesion: 0.17
Nodes (16): cellText(), columnRole(), columnsOf(), durationUnit(), isNumber(), isPlanRange(), MAX_ACTIVITIES, plain() (+8 more)

### Community 140 - "vitest"
Cohesion: 0.05
Nodes (34): vite-plugin-pwa, vitest, specFor(), GraphItem, parseGraph(), DrawOptions, Palette, DEFAULT_CAMERA (+26 more)

### Community 141 - "vite"
Cohesion: 0.29
Nodes (4): vite, minutes, postMessage(), started

### Community 142 - "captcha.ts"
Cohesion: 0.21
Nodes (8): captchaToken(), loadTurnstile(), Turnstile, TURNSTILE_SCRIPT, Window, TURNSTILE_SITE_KEY, accountFailure(), Options

### Community 143 - "Commenti di chi prova Glifo"
Cohesion: 0.50
Nodes (3): Promemoria per lo studente, Commenti di chi prova Glifo, message()

### Community 144 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

### Community 145 - "BoardStore"
Cohesion: 0.09
Nodes (14): BoardStore, MemoryBoards, backup(), BackupNote, backupNotes(), restoreBackup(), RestoreBoards, Restored (+6 more)

### Community 146 - "formatNumber"
Cohesion: 0.08
Nodes (42): isTestLine(), number(), testItems(), classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX (+34 more)

## Knowledge Gaps
- **759 isolated node(s):** `session-start.sh script`, `name`, `private`, `version`, `description` (+754 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1055 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **35 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `touchlog.ts`, `graph/file.ts`, `main.ts`, `compile`, `explain.ts`, `spreadsheet/format.ts`, `editor/lists.ts`, `svg.ts`, `feedback.ts`, `captcha.ts`, `plan.ts`, `editor.test.ts`, `BoardStore`, `dialog.ts`, `IdbBoards`, `MathError`, `domain.ts`, `assistant.ts`, `editor/editor.ts`, `page.ts`, `gantt.ts`, `view3d.ts`, `spellcheck.ts`, `translations.test.ts`, `resize.ts`, `schemaGuard.test.ts`, `src/relocation.ts`, `board.ts`, `board/shapes.ts`, `FoldersStore`, `supabase.ts`, `laplace.ts`, `NotesStore`, `i18n.ts`, `database.ts`, `num`, `h`, `spreadsheet/editor.ts`, `blockMove.ts`, `schema/editor.ts`, `distributions.ts`, `sheet.ts`, `explainPanel.ts`, `search.ts`, `siteUpdate.ts`, `ui/preview.ts`, `local.ts`, `xlsx.ts`, `boardTouchLog.test.ts`, `parseSchema`, `strokes.ts`, `Sheet`, `sql.ts`?**
  _High betweenness centrality (0.148) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `main.ts`, `.constructor`, `graph/preview.ts`, `feedback.ts`, `SchemaEditor`, `Board`, `SheetEditor`, `dialog.ts`, `.renderFormat`, `page.ts`, `spellcheck.ts`, `resize.ts`, `board.ts`, `FoldersStore`, `sidePanel.ts`, `i18n.ts`, `spreadsheet/editor.ts`, `schema/editor.ts`, `aiPanel.ts`, `explainPanel.ts`, `ui/preview.ts`, `toolbar.ts`, `planPreview.ts`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **Why does `MathNode` connect `Sheet` to `compile`, `spec.ts`, `explain.ts`, `formatNumber`, `arithmetic.ts`, `numerical.ts`, `MathError`, `domain.ts`, `complex.ts`, `namesIn`, `toLatex`, `finite.ts`, `Rational`, `Converter`, `laplace.ts`, `num`, `toNode`, `latex.ts`, `odesolve.ts`, `parse.ts`, `symbolic.ts`, `distributions.ts`, `sheet.ts`, `linsys.ts`, `probability.ts`, `conics.ts`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **What connects `session-start.sh script`, `name`, `private` to the rest of the system?**
  _759 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `touchlog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11076923076923077 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.03254404668387386 - nodes in this community are weakly interconnected._
- **Should `compile` be split into smaller, more focused modules?**
  _Cohesion score 0.07890122735242548 - nodes in this community are weakly interconnected._