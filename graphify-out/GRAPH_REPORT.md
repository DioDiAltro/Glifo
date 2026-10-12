# Graph Report - matherdown  (2026-10-12)

## Corpus Check
- 339 files · ~704,338 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5493 nodes · 20081 edges · 158 communities (124 shown, 34 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 654 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a4fff9c2`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- touchlog.ts
- parseGraph
- main.ts
- compile
- sync.ts
- spec.ts
- sql.ts
- num
- GraphView
- explain.ts
- distributions.ts
- dialogs.ts
- svg.ts
- toLatex
- SchemaEditor
- editor/editor.ts
- SheetEditor
- Dove sono le cose
- numerical.ts
- arithmetic.ts
- index.ts
- engine.ts
- linsys.ts
- page.ts
- store.ts
- noteWordsMath.test.ts
- Board
- Preview
- domain.ts
- toNode
- gantt.ts
- study.ts
- graph/space.ts
- i18n.ts
- logic.ts
- noteWords.ts
- complex.ts
- namesIn
- translations.test.ts
- resize.ts
- ExplainPanel
- BoardStore
- aiEn.test.ts
- FoldersStore
- functions.ts
- MathError
- assistant.ts
- board.ts
- Rational
- board/shapes.ts
- Field
- SidePanel
- Stroke
- supabase.ts
- render/lists.ts
- gauss.ts
- 20261004091555_note_condivise.sql
- h
- database.ts
- finite.ts
- several.ts
- dependencies
- Welcome to Glifo
- AiPanel
- conics.ts
- odesolve.ts
- sheet.ts
- explainPanel.ts
- vitest
- Benvenuto in Glifo
- compilerOptions
- relocation-test.mjs
- touchLog
- La grafica: le otto richieste del 10 ottobre 2026
- symbolic.ts
- MarkdownEditor
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- src/relocation.ts
- session-start.sh
- .claude/CLAUDE.md
- Il database degli account (Supabase)
- tutorial.mjs
- Abbonamenti
- smoke-test.mjs
- Costi
- supabase-stub.sql
- account-test.mjs
- suggest.ts
- aiPanel.test.ts
- Glifo – note per Claude
- downloadText
- symbolsEn.test.ts
- siteUpdate.ts
- graph/file.ts
- icon
- graph3d.test.ts
- spellcheck.ts
- schema/templates.ts
- graph.ts
- parse.ts
- scripts
- toolbar.ts
- grafo-html.mjs
- boardTouchLog.test.ts
- mathContext.ts
- Le spiegazioni, come funzionano
- strokes.ts
- Sheet
- BoardOptions
- createFakeSupabase
- site.ts
- suggestions.ts
- template.ts
- Parser
- Piano per piano
- 20261008130026_commenti.sql
- view3d.ts
- spreadsheet/editor.ts
- editor/lists.ts
- Glifo
- .renderFormat
- topics.ts
- spaces.ts
- statsGraph.ts
- editor.test.ts
- devDependencies

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 302 edges
2. `MathError` - 151 edges
3. `Sheet` - 147 edges
4. `num()` - 145 edges
5. `MathNode` - 131 edges
6. `mul()` - 124 edges
7. `texts` - 120 edges
8. `h()` - 120 edges
9. `Board` - 118 edges
10. `compile()` - 116 edges

## Surprising Connections (you probably didn't know these)
- `Trasloco: il sito su Cloudflare, con un dominio tutto di Glifo` --references--> `dist()`  [INFERRED]
  ROADMAP.md → src/board/shapes.ts
- `Dove sono le cose` --references--> `fakeLlmWorker()`  [INFERRED]
  ARCHITETTURA.md → scripts/smoke-test.mjs
- `Dove sono le cose` --references--> `ConicElements`  [INFERRED]
  ARCHITETTURA.md → src/math/conics.ts
- `Funzionalità` --references--> `k()`  [INFERRED]
  README.md → src/math/numerical.ts
- `4. Più modelli per «Spiegami»` --references--> `webllmId()`  [INFERRED]
  GRAFICA.md → src/ai/localModels.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (158 total, 34 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.13
Nodes (18): Attenzione a, Dove sono le cose, at(), browserStore, clip(), KINDS, LOG_KEY, Moves (+10 more)

### Community 1 - "parseGraph"
Cohesion: 0.05
Nodes (32): GraphItem, parseGraph(), complex, light, text(), item(), light, result() (+24 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (112): addToGraphBlock(), remapGraphLines(), account, ACCOUNT_OFF, active, aiShown(), aiToggle, aiWork (+104 more)

### Community 3 - "compile"
Cohesion: 0.06
Nodes (67): criticalLine(), named(), severalItems(), surface(), T, areaFor(), condLabel(), constantValue() (+59 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (32): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+24 more)

### Community 5 - "spec.ts"
Cohesion: 0.06
Nodes (79): conicItems(), isConicLine(), quadricEquation(), T, isFourierLine(), isComplexLine(), isTestLine(), number() (+71 more)

### Community 6 - "sql.ts"
Cohesion: 0.12
Nodes (22): @electric-sql/pglite, SchemaEditorOptions, Schema, Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom() (+14 more)

### Community 7 - "num"
Cohesion: 0.13
Nodes (88): atIntegers(), withoutAbs(), exp(), hyperbolicToExp(), inverseRational(), sqrtEx(), termTransform(), polyEx() (+80 more)

### Community 8 - "GraphView"
Cohesion: 0.10
Nodes (21): addLabel(), complexCoord(), coord(), coordinates(), endTex(), explicitWindow(), fitField(), graphSize() (+13 more)

### Community 9 - "explain.ts"
Cohesion: 0.06
Nodes (73): allNames(), answerFollowUp(), bareResult(), chatContext, ChatFn, chatSubject(), chatSystemPrompt(), checkFormulas() (+65 more)

### Community 10 - "distributions.ts"
Cohesion: 0.07
Nodes (62): choose(), continuousQuantile(), decimals(), discreteQuantile(), factorialBig(), FAMILIES, Family, integerParam() (+54 more)

### Community 11 - "dialogs.ts"
Cohesion: 0.07
Nodes (36): 3. Le impostazioni divise in sezioni, ExplainTone, browserLang(), browserLanguages(), detectLang(), isLang(), lang, LANGUAGES (+28 more)

### Community 12 - "svg.ts"
Cohesion: 0.08
Nodes (57): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), dataWindow(), decimalText() (+49 more)

### Community 13 - "toLatex"
Cohesion: 0.11
Nodes (31): fourierItems(), T, partialSum(), ACCENT_COMMANDS, diffLatex(), DISTRIBUTION_LATEX, distributionLatex(), domainLatex() (+23 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.11
Nodes (4): isLanes(), SchemaEditor, withLaneContents(), serializeSchema()

### Community 15 - "editor/editor.ts"
Cohesion: 0.06
Nodes (40): description, name, private, type, version, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands (+32 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (7): functionLabel(), SheetEditor, englishTyping(), shownInput(), serializeSheet(), sheetSize(), cloneSheet()

### Community 17 - "Dove sono le cose"
Cohesion: 0.13
Nodes (29): Dove sono le cose, Glifo – architettura, @codemirror/language, explainTarget, schemaTitle(), tableTitle(), formulasUntil(), sheetBefore() (+21 more)

### Community 18 - "numerical.ts"
Cohesion: 0.11
Nodes (49): FormatOptions, bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial() (+41 more)

### Community 19 - "arithmetic.ts"
Cohesion: 0.07
Nodes (78): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+70 more)

### Community 20 - "index.ts"
Cohesion: 0.06
Nodes (46): b, bigops, c, calculus, fn, fr, fractions, functions (+38 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "linsys.ts"
Cohesion: 0.07
Nodes (75): nameLatex(), eigenvalues(), FLOAT, interpolateFloat(), polynomialIn(), rref(), choices(), gcd() (+67 more)

### Community 23 - "page.ts"
Cohesion: 0.06
Nodes (57): katex, SUPABASE_KEY, SUPABASE_URL, dateLocale(), isShareToken(), parseSharedNote(), readSharedNote(), SHARE_PAGE (+49 more)

### Community 24 - "store.ts"
Cohesion: 0.09
Nodes (17): BoardBackend, BoardChange, BoardData, done(), fromRecord(), IdbBoards, ofNote(), openBoardDatabase() (+9 more)

### Community 25 - "noteWordsMath.test.ts"
Cohesion: 0.09
Nodes (24): describe(), MathSyntaxError, Parser, parseStatement(), functionWordPairs(), TEXT_WORDS, textWord(), AstNode (+16 more)

### Community 26 - "Board"
Cohesion: 0.10
Nodes (8): Board, clampZoom(), loadPrefs(), MoveAction, pressureOf(), validView(), Transform, Pt

### Community 27 - "Preview"
Cohesion: 0.14
Nodes (4): blockKindOf(), hidden(), Preview, PreviewCallbacks

### Community 28 - "domain.ts"
Cohesion: 0.07
Nodes (56): constantIntegrand(), depth(), inequalityMargin(), integralRegion, LayeredSolid, Multiple, multipleOf(), planeMargin() (+48 more)

### Community 29 - "toNode"
Cohesion: 0.08
Nodes (47): close(), Definite, definiteIntegral(), exValue(), samples(), EMPTY_SCOPE, absOf(), boundsOf() (+39 more)

### Community 30 - "gantt.ts"
Cohesion: 0.04
Nodes (99): searchPhrases(), amount(), barColor(), crossings(), dateText(), dayMonth(), dayOf(), fitText() (+91 more)

### Community 31 - "study.ts"
Cohesion: 0.13
Nodes (39): limit(), breaks(), periodOf(), Asymptote, asymptoteText(), compiled(), cutsOf(), defined() (+31 more)

### Community 32 - "graph/space.ts"
Cohesion: 0.12
Nodes (47): sampleRegion(), addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon() (+39 more)

### Community 33 - "i18n.ts"
Cohesion: 0.04
Nodes (79): acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult, calcResults(), CheckWidget, insertResult() (+71 more)

### Community 34 - "logic.ts"
Cohesion: 0.11
Nodes (30): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+22 more)

### Community 35 - "noteWords.ts"
Cohesion: 0.07
Nodes (51): GraphLabelLines, insertGraphBlock(), LABEL_KEYS, setGraphLabels(), monthOf(), MONTHS, MONTHS_EN, parseDate() (+43 more)

### Community 36 - "complex.ts"
Cohesion: 0.06
Nodes (52): add(), arg(), asin(), atan(), compileFunction(), compileName(), ComplexCompiled, ComplexVars (+44 more)

### Community 37 - "namesIn"
Cohesion: 0.12
Nodes (37): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+29 more)

### Community 38 - "translations.test.ts"
Cohesion: 0.17
Nodes (18): AstNode, calleeName(), check(), checkPair(), visit(), children(), entryPairs(), files (+10 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (24): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+16 more)

### Community 40 - "ExplainPanel"
Cohesion: 0.16
Nodes (5): LoadProgress, modelName(), ExplainPanel, FORMULA, setup()

### Community 41 - "BoardStore"
Cohesion: 0.08
Nodes (17): BoardStore, MemoryBoards, applyAccountChange(), backup(), restore(), BackupNote, backupNotes(), restoreBackup() (+9 more)

### Community 42 - "aiEn.test.ts"
Cohesion: 0.08
Nodes (35): @mlc-ai/web-llm, EXPLAIN_TONES, chat(), GlifoError, Gpu, load(), post(), remove() (+27 more)

### Community 43 - "FoldersStore"
Cohesion: 0.06
Nodes (30): Deletion, cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder(), loadClosedFolders() (+22 more)

### Community 44 - "functions.ts"
Cohesion: 0.09
Nodes (50): parseTextFormat(), Arg, ARGS, boolArg(), BY_NAME, compareValues(), conditional(), criterion() (+42 more)

### Community 45 - "MathError"
Cohesion: 0.09
Nodes (69): compileApply(), MathError, nameLabel(), UndefinedName, angleBetween(), asMatrix(), basisOf(), circleText() (+61 more)

### Community 46 - "assistant.ts"
Cohesion: 0.06
Nodes (50): 2. La pagina dei commenti, tipo FAQ, AiAnswer, AiError, AiResult, AiSettings, answerSchema(), askAi(), askCompatible() (+42 more)

### Community 47 - "board.ts"
Cohesion: 0.06
Nodes (46): Action, ACTION_NAMES, coalesced(), DOT_SIZES, EraserMode, Finger, HANDLE_REACH, ICON (+38 more)

### Community 48 - "Rational"
Cohesion: 0.06
Nodes (50): Part, EMPTY_COMPLEX_SCOPE, addExp(), End, exactIntervalProbability(), expSum, subtractExp(), bigGcd() (+42 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.12
Nodes (36): DrawAction, adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners() (+28 more)

### Community 50 - "Field"
Cohesion: 0.12
Nodes (3): Field, formatPolynomial(), interpolate()

### Community 51 - "SidePanel"
Cohesion: 0.19
Nodes (6): localizeTex(), cardPreview(), displayCode(), formPreview(), preventFocusSteal(), SidePanel

### Community 52 - "Stroke"
Cohesion: 0.11
Nodes (4): EraseAction, Step, shapePoints(), Stroke

### Community 53 - "supabase.ts"
Cohesion: 0.07
Nodes (42): @supabase/supabase-js, captchaToken(), loadTurnstile(), Turnstile, TURNSTILE_SCRIPT, Window, AUTH_STORAGE_KEY, TURNSTILE_SITE_KEY (+34 more)

### Community 54 - "render/lists.ts"
Cohesion: 0.27
Nodes (13): ListStyle, bulletGroup(), Marker, sameList(), alignInside(), asciiTrim(), findMarker(), Found (+5 more)

### Community 55 - "gauss.ts"
Cohesion: 0.16
Nodes (23): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexValue(), isInequality() (+15 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "h"
Cohesion: 0.06
Nodes (51): 1. «Cambia account», SyncStatus, rich(), sidebarToggle(), RelocationResult, AccountButton, confirmAccountDeletion(), messageOf() (+43 more)

### Community 58 - "database.ts"
Cohesion: 0.23
Nodes (6): createDatabase(), createUser(), databaseTests(), feedbackTests(), migrations, shareTests()

### Community 59 - "finite.ts"
Cohesion: 0.17
Nodes (28): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+20 more)

### Community 60 - "several.ts"
Cohesion: 0.14
Nodes (37): severalLimit, at(), bounded(), Candidate, candidates(), compiled(), constraintsOf(), COORDS (+29 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "Welcome to Glifo"
Cohesion: 0.20
Nodes (9): A few examples, Calculations and graphs, For programming too, Handy shortcuts, How to write formulas, Lists, Spell check, Try it now (+1 more)

### Community 63 - "AiPanel"
Cohesion: 0.36
Nodes (3): NoteSubject, AiPanel, kindName()

### Community 64 - "conics.ts"
Cohesion: 0.17
Nodes (30): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+22 more)

### Community 65 - "odesolve.ts"
Cohesion: 0.07
Nodes (91): primed(), withPrimes(), linearIn(), addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots() (+83 more)

### Community 66 - "sheet.ts"
Cohesion: 0.07
Nodes (66): expSumValue(), ExactFunction, decimalSeparator(), Digits, formatNumber(), formatRational(), FormattedResult, fromNumber() (+58 more)

### Community 67 - "explainPanel.ts"
Cohesion: 0.11
Nodes (22): Explanation, FollowUp, REPLY_TOKENS, AiWork, AiPanelDeps, ExplainChat, ExplainChatDeps, T (+14 more)

### Community 68 - "vitest"
Cohesion: 0.04
Nodes (99): @codemirror/state, @codemirror/view, vitest, blockMoved, blockMoves(), blockMoveTransaction(), LineMap, BlockWidget (+91 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "relocation-test.mjs"
Cohesion: 0.18
Nodes (7): AFTER_MOVE, ids, newBrowser(), NOTICE_DAY, out, serve(), TYPES

### Community 72 - "touchLog"
Cohesion: 0.29
Nodes (4): 7. Via il registro dei tocchi, movesLine(), seconds(), touchLog

### Community 73 - "La grafica: le otto richieste del 10 ottobre 2026"
Cohesion: 0.29
Nodes (7): 4. Più modelli per «Spiegami», 5. A cosa serve la chiave dell'AI, 6. Glifo anche in inglese, 8. Il pulsante ✨ con il contorno, Gli abbonamenti, in tutto questo, In che ordine, La grafica: le otto richieste del 10 ottobre 2026

### Community 74 - "symbolic.ts"
Cohesion: 0.06
Nodes (61): linearCells(), pairUp(), atValues(), cancelLinear(), combine(), commonMonomial(), Converter, coordinates() (+53 more)

### Community 75 - "MarkdownEditor"
Cohesion: 0.18
Nodes (3): EditorCallbacks, MarkdownEditor, insertTemplate()

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Errore o imprevisto → nel dettaglio, 3. Serve una decisione → frasi complete, 4. Fine del compito → un solo riepilogo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.05
Nodes (59): alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ALIGN_NAMES, ARROW_NAMES (+51 more)

### Community 79 - "src/relocation.ts"
Cohesion: 0.05
Nodes (75): accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf() (+67 more)

### Community 82 - "Il database degli account (Supabase)"
Cohesion: 0.14
Nodes (13): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il controllo anti-robot (CAPTCHA, ottobre 2026), Il database degli account (Supabase), Il progetto, Il trasloco su glifo.page (ottobre 2026) (+5 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.17
Nodes (7): centerOf(), clickOn(), ffmpeg, SCENES, SIZE, tutorialModel(), work

### Community 90 - "Abbonamenti"
Cohesion: 0.08
Nodes (24): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Deciso (5 ottobre 2026), Deciso (5 ottobre 2026) (+16 more)

### Community 91 - "smoke-test.mjs"
Cohesion: 0.14
Nodes (9): markdown-it, playwright-core, vite, fakeLlmWorker(), firstVisit(), plainContext, minutes, postMessage() (+1 more)

### Community 92 - "Costi"
Cohesion: 0.22
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 96 - "account-test.mjs"
Cohesion: 0.11
Nodes (10): device(), login(), newContext, waitFor(), b64(), CAPTCHA_TOKEN, CODE, GOOGLE_CODE (+2 more)

### Community 97 - "suggest.ts"
Cohesion: 0.23
Nodes (12): normalizeText(), IndexedEntry, SearchResult, getIndex(), isSubsequence(), keysOf(), MatchKind, suggestCommands() (+4 more)

### Community 98 - "aiPanel.test.ts"
Cohesion: 0.11
Nodes (15): theoremTopic(), AI_NEWS_TITLE, AI_WORKING_TITLE, aiActivity, T, fakeModel(), FLOW, GRAPH_FIXED (+7 more)

### Community 100 - "Glifo – note per Claude"
Cohesion: 0.11
Nodes (17): Comandi, Come controllare il lavoro, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole, Account: i propri appunti su ogni dispositivo, anche da condividere, Commenti di chi prova Glifo (+9 more)

### Community 101 - "downloadText"
Cohesion: 0.38
Nodes (6): loadDialect(), svgSize(), svgToPng(), downloadBlob(), downloadText(), fileNameFor()

### Community 102 - "symbolsEn.test.ts"
Cohesion: 0.13
Nodes (30): editDistance(), singular(), stem(), STOPWORDS, words(), BOTH, buildIndex(), containsPhrase() (+22 more)

### Community 103 - "siteUpdate.ts"
Cohesion: 0.16
Nodes (18): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, loadPart() (+10 more)

### Community 104 - "graph/file.ts"
Cohesion: 0.08
Nodes (43): FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsForFile(), graphsFromFile(), hide() (+35 more)

### Community 105 - "icon"
Cohesion: 0.10
Nodes (28): accountDataFile(), PullResult, board, openShareDialog(), changeAccess(), changeCopy(), refreshChanged(), render() (+20 more)

### Community 106 - "graph3d.test.ts"
Cohesion: 0.18
Nodes (15): staticGraphSvg(), chooseWindow(), SliderState, Box, chooseBox(), surfacePlane(), Range, DrawOptions (+7 more)

### Community 107 - "spellcheck.ts"
Cohesion: 0.08
Nodes (23): misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt(), openAt() (+15 more)

### Community 108 - "schema/templates.ts"
Cohesion: 0.25
Nodes (16): DEFAULT_EDGE, SHAPE_SIZE, tableHeight(), conceptMap(), cycle(), edge(), er(), flowchart() (+8 more)

### Community 113 - "graph.ts"
Cohesion: 0.06
Nodes (33): @maxgraph/core, AT_X, cellHtml(), cellText(), COMPASS, createGraph(), drawSchema(), isEdgeLook() (+25 more)

### Community 116 - "parse.ts"
Cohesion: 0.05
Nodes (52): errorMessage(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, differentialInFraction() (+44 more)

### Community 117 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 118 - "toolbar.ts"
Cohesion: 0.10
Nodes (27): insertBlock(), InsertOptions, toggleLinePrefix(), wrapSelection(), LIST_STYLES, ListStyleId, addPlaceholders, Placeholder (+19 more)

### Community 119 - "grafo-html.mjs"
Cohesion: 0.17
Nodes (5): graphFile, names, namesFile, root, PNG_ICONS

### Community 120 - "boardTouchLog.test.ts"
Cohesion: 0.20
Nodes (7): isSaved(), LOG_MAX_LINES, LogStore, SavedLog, clock(), memoryStore(), newLog()

### Community 121 - "mathContext.ts"
Cohesion: 0.13
Nodes (22): @lezer/common, closeMathBlockOnEnter(), tabOutOfMath(), CODE_NODES, CommandToken, commandTokenAt(), isInCode(), MATH_NODES (+14 more)

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "strokes.ts"
Cohesion: 0.08
Nodes (40): centerOn(), copyStrokes(), cross(), handleScale(), IDENTITY, insideLasso(), keepInside(), LASSO_SHARE (+32 more)

### Community 124 - "Sheet"
Cohesion: 0.07
Nodes (28): Definition, Line, ExactComplexScope, withWorkLimit(), FiniteContext, MathNode, bracketParts(), chainOf() (+20 more)

### Community 128 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 129 - "site.ts"
Cohesion: 0.24
Nodes (5): vite-plugin-pwa, accountOffMessage(), T, defineFor(), MAIN_BRANCH

### Community 131 - "suggestions.ts"
Cohesion: 0.18
Nodes (5): EditorMathContext, expand(), preferredIndex(), SuggestionController, SuggestionItem

### Community 132 - "template.ts"
Cohesion: 0.38
Nodes (7): cardPreviewTex(), formPreviewTex(), ParsedTemplate, parseTemplate(), PLACEHOLDER_TEX, placeholderPreview(), templateText()

### Community 133 - "Parser"
Cohesion: 0.29
Nodes (3): FormulaError, parseFormula(), Parser

### Community 136 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 139 - "view3d.ts"
Cohesion: 0.10
Nodes (36): Detail, Face, planeTolerance(), GraphSpec, Plane, Vec3, arcPoints(), arrowHead() (+28 more)

### Community 141 - "spreadsheet/editor.ts"
Cohesion: 0.03
Nodes (195): RFC-4180, fflate, formulaText(), readSheet(), tableTopic(), valueText(), setLangForTests(), chartFrom() (+187 more)

### Community 142 - "editor/lists.ts"
Cohesion: 0.11
Nodes (50): applyListStyle(), continueList(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext(), isBlank() (+42 more)

### Community 146 - "Glifo"
Cohesion: 0.12
Nodes (16): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Commenti, Compatibilità con VS Code, Condividere una nota con un link (+8 more)

### Community 156 - ".renderFormat"
Cohesion: 0.18
Nodes (12): fieldInput(), createEdgeCell(), edgeLook(), edgeStyle(), edgeTextAt(), insertSchema(), nodeLook(), nodeStyle() (+4 more)

### Community 157 - "topics.ts"
Cohesion: 0.10
Nodes (41): ATTRIBUTES, cut(), definedName(), ER_SHAPES, fieldText(), fitLines(), flowOrder(), formulaTopic() (+33 more)

### Community 159 - "spaces.ts"
Cohesion: 0.13
Nodes (20): characteristicPolynomial(), Eigenvalue, LinearValue, cartesianEquations(), Cell, coordinateNames(), diagonalize(), dot() (+12 more)

### Community 160 - "statsGraph.ts"
Cohesion: 0.14
Nodes (19): classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX, Line, number(), pmfBars() (+11 more)

### Community 162 - "editor.test.ts"
Cohesion: 0.11
Nodes (17): templateInsertion(), buildDecorations(), clearAllPlaceholders(), clearPlaceholders, CommandTarget, contains(), currentIndex(), filledMark (+9 more)

### Community 166 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

## Knowledge Gaps
- **857 isolated node(s):** `Comandi`, `Regole`, `La grafica: account, impostazioni, commenti, AI e lingua (chiesto il 10 ottobre 2026, se ne parla)`, `Account: i propri appunti su ogni dispositivo, anche da condividere`, `La lavagna: idee in più` (+852 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1166 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **34 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `texts` connect `i18n.ts` to `site.ts`, `main.ts`, `compile`, `spec.ts`, `sql.ts`, `explain.ts`, `distributions.ts`, `dialogs.ts`, `svg.ts`, `toLatex`, `editor/lists.ts`, `editor/editor.ts`, `spreadsheet/editor.ts`, `numerical.ts`, `arithmetic.ts`, `index.ts`, `linsys.ts`, `page.ts`, `domain.ts`, `topics.ts`, `gantt.ts`, `toNode`, `statsGraph.ts`, `spaces.ts`, `logic.ts`, `noteWords.ts`, `complex.ts`, `namesIn`, `study.ts`, `resize.ts`, `BoardStore`, `aiEn.test.ts`, `FoldersStore`, `functions.ts`, `MathError`, `assistant.ts`, `board.ts`, `Rational`, `supabase.ts`, `gauss.ts`, `h`, `finite.ts`, `several.ts`, `conics.ts`, `odesolve.ts`, `sheet.ts`, `explainPanel.ts`, `vitest`, `symbolic.ts`, `schema/editor.ts`, `src/relocation.ts`, `aiPanel.test.ts`, `siteUpdate.ts`, `graph/file.ts`, `icon`, `spellcheck.ts`, `schema/templates.ts`, `parse.ts`, `toolbar.ts`?**
  _High betweenness centrality (0.133) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `touchlog.ts`, `parseGraph`, `site.ts`, `template.ts`, `sql.ts`, `num`, `explain.ts`, `distributions.ts`, `dialogs.ts`, `svg.ts`, `spreadsheet/editor.ts`, `editor/lists.ts`, `editor/editor.ts`, `linsys.ts`, `page.ts`, `store.ts`, `noteWordsMath.test.ts`, `topics.ts`, `gantt.ts`, `i18n.ts`, `editor.test.ts`, `noteWords.ts`, `translations.test.ts`, `resize.ts`, `ExplainPanel`, `BoardStore`, `aiEn.test.ts`, `FoldersStore`, `MathError`, `assistant.ts`, `board.ts`, `Rational`, `board/shapes.ts`, `supabase.ts`, `h`, `database.ts`, `src/relocation.ts`, `aiPanel.test.ts`, `symbolsEn.test.ts`, `siteUpdate.ts`, `graph/file.ts`, `icon`, `graph3d.test.ts`, `spellcheck.ts`, `parse.ts`, `toolbar.ts`, `boardTouchLog.test.ts`, `strokes.ts`, `Sheet`?**
  _High betweenness centrality (0.088) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `Dove sono le cose` to `touchlog.ts`, `parseGraph`, `main.ts`, `compile`, `site.ts`, `spec.ts`, `Parser`, `num`, `GraphView`, `explain.ts`, `distributions.ts`, `dialogs.ts`, `svg.ts`, `spreadsheet/editor.ts`, `toLatex`, `SchemaEditor`, `SheetEditor`, `.renderFormat`, `numerical.ts`, `arithmetic.ts`, `linsys.ts`, `page.ts`, `noteWordsMath.test.ts`, `Board`, `Preview`, `domain.ts`, `topics.ts`, `gantt.ts`, `toNode`, `graph/space.ts`, `i18n.ts`, `logic.ts`, `noteWords.ts`, `complex.ts`, `namesIn`, `study.ts`, `ExplainPanel`, `BoardStore`, `aiEn.test.ts`, `functions.ts`, `MathError`, `assistant.ts`, `board.ts`, `board/shapes.ts`, `SidePanel`, `Stroke`, `supabase.ts`, `gauss.ts`, `h`, `finite.ts`, `several.ts`, `AiPanel`, `conics.ts`, `odesolve.ts`, `sheet.ts`, `explainPanel.ts`, `vitest`, `touchLog`, `symbolic.ts`, `MarkdownEditor`, `schema/editor.ts`, `src/relocation.ts`, `tutorial.mjs`, `smoke-test.mjs`, `aiPanel.test.ts`, `downloadText`, `siteUpdate.ts`, `graph/file.ts`, `graph.ts`, `parse.ts`, `toolbar.ts`, `strokes.ts`, `Sheet`?**
  _High betweenness centrality (0.079) - this node is a cross-community bridge._
- **Are the 301 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `tutorialModel()`) actually correct?**
  _`Dove sono le cose` has 301 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Comandi`, `Regole`, `La grafica: account, impostazioni, commenti, AI e lingua (chiesto il 10 ottobre 2026, se ne parla)` to the rest of the system?**
  _857 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `touchlog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.12648221343873517 - nodes in this community are weakly interconnected._
- **Should `parseGraph` be split into smaller, more focused modules?**
  _Cohesion score 0.05442176870748299 - nodes in this community are weakly interconnected._