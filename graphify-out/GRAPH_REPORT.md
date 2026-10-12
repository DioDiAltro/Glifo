# Graph Report - matherdown  (2026-10-12)

## Corpus Check
- 327 files · ~641,939 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5233 nodes · 18573 edges · 141 communities (104 shown, 37 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 353 edges (avg confidence: 0.84)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `4bb90c8d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- touchlog.ts
- Parser
- main.ts
- compile
- sync.ts
- spec.ts
- BoardOptions
- num
- graph/preview.ts
- explain.ts
- spreadsheet/format.ts
- editor/lists.ts
- svg.ts
- feedback.ts
- SchemaEditor
- Board
- SheetEditor
- suggestions.ts
- numerical.ts
- arithmetic.ts
- index.ts
- engine.ts
- page.ts
- graph.ts
- BoardStore
- MathError
- SheetEvaluator
- assistant.ts
- editor/editor.ts
- tutorial.ts
- gantt.ts
- Stroke
- view3d.ts
- spellcheck.ts
- logic.ts
- topics.ts
- complex.ts
- namesIn
- translations.test.ts
- resize.ts
- files.ts
- calcPlugin
- toLatex
- study.ts
- functions.ts
- AiPanel
- NotesStore
- board.ts
- Rational
- board/shapes.ts
- boardTouchLog.test.ts
- SidePanel
- Piano per piano
- supabase.ts
- laplace.ts
- 20261004091555_note_condivise.sql
- vitest
- database.ts
- several.ts
- dependencies
- Welcome to Glifo
- h
- odesolve.ts
- spreadsheet/editor.ts
- blockMove.ts
- smoke-test.mjs
- Benvenuto in Glifo
- compilerOptions
- relocation-test.mjs
- parse.ts
- symbolic.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- distributions.ts
- session-start.sh
- .claude/CLAUDE.md
- graphNote.test.ts
- tutorial.mjs
- Abbonamenti
- markdown.ts
- Costi
- supabase-stub.sql
- account-test.mjs
- sheet.ts
- Commenti di chi prova Glifo
- solve.ts
- search.ts
- siteUpdate.ts
- ui/preview.ts
- probability.ts
- xlsx.ts
- schema/shapes.ts
- Il database degli account (Supabase)
- Glifo – note per Claude
- toolbar.ts
- schemaBlocks.ts
- schemaTools.test.ts
- Le spiegazioni, come funzionano
- strokes.ts
- Sheet
- sql.ts
- touchLog
- createFakeSupabase
- graph/file.ts
- editor.test.ts
- Parser
- 20261008130026_commenti.sql
- plan.ts
- vite
- devDependencies

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
- `Come viene pubblicata` --references--> `dist()`  [INFERRED]
  README.md → src/board/shapes.ts
- `Trasloco: il sito su Cloudflare, con un dominio tutto di Glifo` --references--> `dist()`  [INFERRED]
  ROADMAP.md → src/board/shapes.ts
- `Il controllo anti-robot (CAPTCHA, ottobre 2026)` --references--> `captchaToken()`  [INFERRED]
  supabase/README.md → src/account/captcha.ts
- `Dove sono le cose` --references--> `rich()`  [INFERRED]
  ARCHITETTURA.md → src/i18n.ts
- `Dove sono le cose` --references--> `languageChangedElsewhere()`  [INFERRED]
  ARCHITETTURA.md → src/main.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (141 total, 37 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.15
Nodes (16): at(), browserStore, clip(), KINDS, LOG_KEY, Moves, MOVES_MAX, pointerDetail() (+8 more)

### Community 2 - "main.ts"
Cohesion: 0.03
Nodes (126): unshareNote(), newStrokeId(), remapGraphLines(), account, ACCOUNT_OFF, accountButton, accountProblem(), active (+118 more)

### Community 3 - "compile"
Cohesion: 0.05
Nodes (84): integralRegion, LayeredSolid, Multiple, PlanePart, radiusOf(), spaceLayers(), spaceMargin(), spacePoint() (+76 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (32): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+24 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (98): conicItems(), isConicLine(), quadricEquation(), fourierItems(), isFourierLine(), isComplexLine(), isComplexValue(), isSegmentNode() (+90 more)

### Community 7 - "num"
Cohesion: 0.12
Nodes (92): atIntegers(), withoutAbs(), exp(), hyperbolicToExp(), inverseRational(), sqrtEx(), termTransform(), polyEx() (+84 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (40): FIGURE_PALETTE, addLabel(), boxes, cameras, complexCoord(), containing(), coord(), drawings (+32 more)

### Community 9 - "explain.ts"
Cohesion: 0.05
Nodes (79): allNames(), answerFollowUp(), bareResult(), CHAT_SUBJECT, chatContext, ChatFn, chatSystemPrompt(), checkFormulas() (+71 more)

### Community 10 - "spreadsheet/format.ts"
Cohesion: 0.10
Nodes (39): at(), breakEven(), dataLine(), dataRange(), Point, quantity(), tableItems(), textLabel() (+31 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.08
Nodes (69): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+61 more)

### Community 12 - "svg.ts"
Cohesion: 0.08
Nodes (60): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseWindow(), chooseY(), clipLines(), dataWindow() (+52 more)

### Community 13 - "feedback.ts"
Cohesion: 0.07
Nodes (41): vite-plugin-pwa, SUPABASE_KEY, SUPABASE_URL, accountOffMessage(), Site, T, commentDate(), commentItem() (+33 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.09
Nodes (11): isLanes(), loadDialect(), SchemaEditor, withLaneContents(), cellText(), edgeLook(), nodeLook(), readSchema() (+3 more)

### Community 15 - "Board"
Cohesion: 0.09
Nodes (5): Board, loadPrefs(), penErases(), pressureOf(), Pt

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (5): rangeLabel(), SheetEditor, serializeSheet(), CellRange, cloneSheet()

### Community 17 - "suggestions.ts"
Cohesion: 0.15
Nodes (13): templateInsertion(), EditorMathContext, expand(), preferredIndex(), SuggestionController, CATEGORIES, cardPreviewTex(), formPreviewTex() (+5 more)

### Community 18 - "numerical.ts"
Cohesion: 0.08
Nodes (62): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Commenti, Compatibilità con VS Code, Condividere una nota con un link (+54 more)

### Community 19 - "arithmetic.ts"
Cohesion: 0.10
Nodes (46): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+38 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (41): b, bigops, c, calculus, fn, fr, fractions, functions (+33 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "page.ts"
Cohesion: 0.05
Nodes (60): katex, accountDataFile(), PullResult, board, loadingEditor(), openShareDialog(), changeAccess(), changeCopy() (+52 more)

### Community 23 - "graph.ts"
Cohesion: 0.11
Nodes (29): AT_X, cellHtml(), COMPASS, createEdgeCell(), createGraph(), drawSchema(), edgeStyle(), insertSchema() (+21 more)

### Community 24 - "BoardStore"
Cohesion: 0.06
Nodes (16): fake-indexeddb, BoardBackend, BoardStore, done(), fromRecord(), IdbBoards, MemoryBoards, ofNote() (+8 more)

### Community 25 - "MathError"
Cohesion: 0.05
Nodes (100): MathError, FormatOptions, formatRational(), angleBetween(), asMatrix(), basisOf(), characteristicPolynomial(), circleText() (+92 more)

### Community 26 - "SheetEvaluator"
Cohesion: 0.12
Nodes (22): tableTopic(), valueText(), sheetSummary(), sheetToCsv(), evaluateSheet(), SheetEvaluator, hide(), OPEN (+14 more)

### Community 27 - "assistant.ts"
Cohesion: 0.12
Nodes (24): AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible(), askThroughHost() (+16 more)

### Community 28 - "editor/editor.ts"
Cohesion: 0.05
Nodes (52): description, name, private, scripts, build, dev, preview, test (+44 more)

### Community 29 - "tutorial.ts"
Cohesion: 0.14
Nodes (14): helpButton, openGuide(), HINT_MS, markTutorialSeen(), openTutorial(), show(), richText(), showTutorialHint() (+6 more)

### Community 30 - "gantt.ts"
Cohesion: 0.06
Nodes (72): amount(), barColor(), crossings(), dateText(), dayOf(), fitText(), GanttOptions, ganttSvg() (+64 more)

### Community 32 - "view3d.ts"
Cohesion: 0.06
Nodes (92): staticGraphSvg(), addMesh(), addTet(), affinePlane(), Axis, Box, centroid(), chooseBox() (+84 more)

### Community 33 - "spellcheck.ts"
Cohesion: 0.07
Nodes (26): @codemirror/lang-markdown, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt() (+18 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "topics.ts"
Cohesion: 0.15
Nodes (29): ATTRIBUTES, count(), cut(), definedName(), ER_SHAPES, fieldText(), fitLines(), flowOrder() (+21 more)

### Community 36 - "complex.ts"
Cohesion: 0.06
Nodes (67): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isInequality(), onlyComplex() (+59 more)

### Community 37 - "namesIn"
Cohesion: 0.13
Nodes (37): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+29 more)

### Community 38 - "translations.test.ts"
Cohesion: 0.17
Nodes (18): AstNode, calleeName(), check(), checkPair(), visit(), children(), entryPairs(), files (+10 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (24): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+16 more)

### Community 40 - "files.ts"
Cohesion: 0.18
Nodes (17): 2. La pagina dei commenti, tipo FAQ, inClaudeViewer(), feedbackButton, openComments(), canWriteFilesDirectly(), FsWindow, isAbort(), mdTypes() (+9 more)

### Community 41 - "calcPlugin"
Cohesion: 0.19
Nodes (3): calcPlugin, CheckWidget, ResultWidget

### Community 42 - "toLatex"
Cohesion: 0.07
Nodes (58): FieldContext, criticalLine(), isSeveralLine(), named(), severalItems(), surface(), multipleLabel(), classes() (+50 more)

### Community 43 - "study.ts"
Cohesion: 0.14
Nodes (35): limit(), breaks(), periodOf(), Asymptote, boundaries(), compiled(), cutsOf(), defined() (+27 more)

### Community 44 - "functions.ts"
Cohesion: 0.09
Nodes (59): EMPTY, number(), addFormat(), divFormat(), GENERAL, mulFormat(), tidy(), withCents() (+51 more)

### Community 45 - "AiPanel"
Cohesion: 0.29
Nodes (5): NoteSubject, AiPanel, graphLabel(), kindName(), texInline()

### Community 46 - "NotesStore"
Cohesion: 0.04
Nodes (92): accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf() (+84 more)

### Community 47 - "board.ts"
Cohesion: 0.05
Nodes (58): Action, ACTION_NAMES, clampZoom(), coalesced(), DOT_SIZES, DrawAction, EraseAction, EraserMode (+50 more)

### Community 48 - "Rational"
Cohesion: 0.09
Nodes (45): Part, at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, conicOf(), det2() (+37 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (35): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+27 more)

### Community 50 - "boardTouchLog.test.ts"
Cohesion: 0.22
Nodes (7): isSaved(), LOG_MAX_LINES, LogStore, SavedLog, clock(), memoryStore(), newLog()

### Community 51 - "SidePanel"
Cohesion: 0.17
Nodes (6): isConfidentAnswer(), symbolsInCategory(), SymbolForm, displayCode(), preventFocusSteal(), SidePanel

### Community 52 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 53 - "supabase.ts"
Cohesion: 0.08
Nodes (36): @supabase/supabase-js, captchaToken(), loadTurnstile(), Turnstile, TURNSTILE_SCRIPT, Window, AUTH_STORAGE_KEY, TURNSTILE_SITE_KEY (+28 more)

### Community 54 - "laplace.ts"
Cohesion: 0.09
Nodes (61): factoredPolynomial(), oneFraction(), beyondPoles(), compiled(), E, fractionShown(), HALF, inverseLaplaceShown() (+53 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "vitest"
Cohesion: 0.03
Nodes (104): Dove sono le cose, Glifo – architettura, 3. Le impostazioni divise in sezioni, @mlc-ai/web-llm, vitest, ExplainTone, Explanation, REPLY_TOKENS (+96 more)

### Community 58 - "database.ts"
Cohesion: 0.23
Nodes (6): createDatabase(), createUser(), databaseTests(), feedbackTests(), migrations, shareTests()

### Community 60 - "several.ts"
Cohesion: 0.06
Nodes (81): close(), Definite, definiteIntegral(), exValue(), samples(), EMPTY_SCOPE, absOf(), boundsOf() (+73 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "Welcome to Glifo"
Cohesion: 0.20
Nodes (9): A few examples, Calculations and graphs, For programming too, Handy shortcuts, How to write formulas, Lists, Spell check, Try it now (+1 more)

### Community 64 - "h"
Cohesion: 0.05
Nodes (53): 1. «Cambia account», 4. Più modelli per «Spiegami», 5. A cosa serve la chiave dell'AI, 6. Glifo anche in inglese, La grafica: le otto richieste del 10 ottobre 2026, SyncStatus, explanationMarkdown(), rich() (+45 more)

### Community 65 - "odesolve.ts"
Cohesion: 0.08
Nodes (76): linearIn(), addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames() (+68 more)

### Community 66 - "spreadsheet/editor.ts"
Cohesion: 0.09
Nodes (45): currentCall(), Editing, MenuEntry, Move, openSheetEditor(), PATHS, SheetEditorOptions, Snapshot (+37 more)

### Community 67 - "blockMove.ts"
Cohesion: 0.11
Nodes (35): blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove, blockPlace(), closed() (+27 more)

### Community 68 - "smoke-test.mjs"
Cohesion: 0.16
Nodes (5): markdown-it, playwright-core, PNG_ICONS, firstVisit(), plainContext

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
Cohesion: 0.03
Nodes (79): GraphItem, hasWord(), parseGraph(), typedSliderValue(), errorMessage(), ACCENTS, AND_WORDS, BARE_WORDS (+71 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (64): primitive(), verified(), linearCells(), atValues(), combine(), commonMonomial(), Converter, coordinates() (+56 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Errore o imprevisto → nel dettaglio, 3. Serve una decisione → frasi complete, 4. Fine del compito → un solo riepilogo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.04
Nodes (61): ALIGN, ARROW_NAMES, AT_ICONS, AT_NAMES, BASE_PRESETS, BIG_ARROWS, DB_PRESETS, Direction (+53 more)

### Community 79 - "distributions.ts"
Cohesion: 0.05
Nodes (82): choose(), continuousQuantile(), discreteQuantile(), factorialBig(), FAMILIES, integerParam(), integerRange(), intervalProbability() (+74 more)

### Community 82 - "graphNote.test.ts"
Cohesion: 0.08
Nodes (49): @codemirror/language, @codemirror/state, @codemirror/view, @lezer/common, explainTarget, acceptCalcResult(), CalcCheck, calcOutcomes() (+41 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.11
Nodes (10): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+2 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.08
Nodes (24): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Deciso (5 ottobre 2026), Deciso (5 ottobre 2026) (+16 more)

### Community 91 - "markdown.ts"
Cohesion: 0.10
Nodes (35): valueNode(), labelHtml(), texHtml(), moveAttrs(), checkHtml(), checkTitle(), T, cache (+27 more)

### Community 92 - "Costi"
Cohesion: 0.22
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 96 - "account-test.mjs"
Cohesion: 0.10
Nodes (11): @electric-sql/pglite, device(), login(), newContext, waitFor(), b64(), CAPTCHA_TOKEN, CODE (+3 more)

### Community 97 - "sheet.ts"
Cohesion: 0.09
Nodes (51): OdeFunction, expSumValue(), Lin, bracketParts(), BRACKETS, CHECK_VALUES, checks, Definition (+43 more)

### Community 100 - "Commenti di chi prova Glifo"
Cohesion: 0.15
Nodes (12): Promemoria per lo studente, Account: i propri appunti su ogni dispositivo, anche da condividere, Commenti di chi prova Glifo, Idee per il futuro, In programma, La grafica: account, impostazioni, commenti, AI e lingua (chiesto il 10 ottobre 2026, se ne parla), La lavagna: idee in più, Più avanti (+4 more)

### Community 101 - "solve.ts"
Cohesion: 0.09
Nodes (48): fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), decimalSeparator(), Digits (+40 more)

### Community 102 - "search.ts"
Cohesion: 0.16
Nodes (25): SuggestionItem, editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase() (+17 more)

### Community 103 - "siteUpdate.ts"
Cohesion: 0.16
Nodes (18): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, loadPart() (+10 more)

### Community 104 - "ui/preview.ts"
Cohesion: 0.07
Nodes (32): GraphLabels, remapLineKeys(), renameGraphScope(), renameScopeKeys(), BlockKind, Look, Theme, draw() (+24 more)

### Community 105 - "probability.ts"
Cohesion: 0.08
Nodes (34): addExp(), Distribution, End, exactIntervalProbability(), expSum, Family, subtractExp(), CompileOptions (+26 more)

### Community 108 - "xlsx.ts"
Cohesion: 0.07
Nodes (55): RFC-4180, fflate, formulaText(), csvDelimiter(), csvToSheet(), field(), italian(), parseCsv() (+47 more)

### Community 113 - "schema/shapes.ts"
Cohesion: 0.08
Nodes (17): @maxgraph/core, ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape (+9 more)

### Community 116 - "Il database degli account (Supabase)"
Cohesion: 0.15
Nodes (12): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il controllo anti-robot (CAPTCHA, ottobre 2026), Il database degli account (Supabase), Il progetto, Il trasloco su glifo.page (ottobre 2026) (+4 more)

### Community 117 - "Glifo – note per Claude"
Cohesion: 0.22
Nodes (9): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Regole, texts() (+1 more)

### Community 118 - "toolbar.ts"
Cohesion: 0.07
Nodes (29): closeMathBlockOnEnter(), EditorCallbacks, searchPhrases(), insertBlock(), InsertOptions, insertTemplate(), toggleLinePrefix(), wrapSelection() (+21 more)

### Community 120 - "schemaBlocks.ts"
Cohesion: 0.07
Nodes (38): BlockWidget, findWidgetBlocks(), guardBlocks(), KINDS, schemaBlocks(), schemaSummary(), svg(), T (+30 more)

### Community 121 - "schemaTools.test.ts"
Cohesion: 0.18
Nodes (14): alignBoxes(), Alignment, Box, distributeBoxes(), Position, base64(), crc32(), svgSize() (+6 more)

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "strokes.ts"
Cohesion: 0.09
Nodes (39): centerOn(), copyStrokes(), cross(), handleScale(), IDENTITY, insideLasso(), keepInside(), LASSO_SHARE (+31 more)

### Community 124 - "Sheet"
Cohesion: 0.07
Nodes (26): ExactComplexScope, ConicInfo, Ode, withWorkLimit(), ExactRandom, FiniteContext, FormattedResult, MathNode (+18 more)

### Community 125 - "sql.ts"
Cohesion: 0.17
Nodes (18): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+10 more)

### Community 127 - "touchLog"
Cohesion: 0.29
Nodes (3): movesLine(), seconds(), touchLog

### Community 128 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 129 - "graph/file.ts"
Cohesion: 0.09
Nodes (40): figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsForFile(), graphsFromFile(), hide(), OPEN (+32 more)

### Community 131 - "editor.test.ts"
Cohesion: 0.09
Nodes (20): tabOutOfMath(), commandTokenAt(), isInCode(), mathContextAt(), openMathBefore(), buildDecorations(), clearAllPlaceholders(), clearPlaceholders (+12 more)

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 139 - "plan.ts"
Cohesion: 0.19
Nodes (16): cellText(), columnRole(), columnsOf(), durationUnit(), isNumber(), isPlanRange(), MAX_ACTIVITIES, plain() (+8 more)

### Community 141 - "vite"
Cohesion: 0.29
Nodes (4): vite, minutes, postMessage(), started

### Community 144 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

## Knowledge Gaps
- **759 isolated node(s):** `6. Glifo anche in inglese`, `Condividere una nota con un link`, `Commenti`, `Provarlo sul tuo computer`, `Assistente AI` (+754 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1052 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **37 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `touchlog.ts`, `editor.test.ts`, `num`, `explain.ts`, `spreadsheet/format.ts`, `editor/lists.ts`, `svg.ts`, `feedback.ts`, `plan.ts`, `suggestions.ts`, `page.ts`, `BoardStore`, `MathError`, `assistant.ts`, `editor/editor.ts`, `tutorial.ts`, `gantt.ts`, `view3d.ts`, `spellcheck.ts`, `translations.test.ts`, `resize.ts`, `NotesStore`, `board.ts`, `board/shapes.ts`, `boardTouchLog.test.ts`, `supabase.ts`, `laplace.ts`, `database.ts`, `spreadsheet/editor.ts`, `blockMove.ts`, `parse.ts`, `distributions.ts`, `graphNote.test.ts`, `markdown.ts`, `search.ts`, `siteUpdate.ts`, `ui/preview.ts`, `xlsx.ts`, `toolbar.ts`, `schemaBlocks.ts`, `schemaTools.test.ts`, `strokes.ts`, `Sheet`, `sql.ts`?**
  _High betweenness centrality (0.143) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `main.ts`, `graph/preview.ts`, `feedback.ts`, `SchemaEditor`, `Board`, `SheetEditor`, `page.ts`, `tutorial.ts`, `gantt.ts`, `Stroke`, `spellcheck.ts`, `resize.ts`, `AiPanel`, `board.ts`, `SidePanel`, `vitest`, `spreadsheet/editor.ts`, `schema/editor.ts`, `markdown.ts`, `ui/preview.ts`, `toolbar.ts`?**
  _High betweenness centrality (0.050) - this node is a cross-community bridge._
- **Why does `Board` connect `Board` to `main.ts`, `BoardOptions`, `board.ts`, `strokes.ts`, `Stroke`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **What connects `6. Glifo anche in inglese`, `Condividere una nota con un link`, `Commenti` to the rest of the system?**
  _759 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.031654676258992806 - nodes in this community are weakly interconnected._
- **Should `compile` be split into smaller, more focused modules?**
  _Cohesion score 0.052850877192982454 - nodes in this community are weakly interconnected._
- **Should `sync.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0636523266022827 - nodes in this community are weakly interconnected._