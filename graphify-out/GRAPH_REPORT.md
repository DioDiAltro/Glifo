# Graph Report - matherdown  (2026-10-13)

## Corpus Check
- 345 files · ~712,814 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5518 nodes · 20225 edges · 173 communities (133 shown, 40 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 668 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `fcc010c6`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- i18n.ts
- noteWordsGraph.test.ts
- main.ts
- compile
- sync.ts
- spec.ts
- h
- num
- graph/preview.ts
- explain.ts
- distributions.ts
- src/relocation.ts
- svg.ts
- laplace.ts
- SchemaEditor
- editor/editor.ts
- SheetEditor
- NotesStore
- numerical.ts
- linsys.ts
- index.ts
- engine.ts
- schema/editor.ts
- noteWordsMath.test.ts
- store.ts
- parse.ts
- board.ts
- ui/preview.ts
- markdown.ts
- toLatex
- gantt.ts
- study.ts
- solve.ts
- assistant.ts
- logic.ts
- sheet.ts
- complex.ts
- namesIn
- translations.test.ts
- resize.ts
- view3d.ts
- restore.ts
- explainPanel.ts
- chart.ts
- functions.ts
- MathError
- spreadsheetEn.test.ts
- Pt
- template.ts
- board/shapes.ts
- toolbar.ts
- sidePanel.ts
- aiActivity.ts
- schema/blocks.ts
- probability.ts
- page.ts
- 20261004091555_note_condivise.sql
- plan.ts
- database.ts
- finite.ts
- topics.ts
- dependencies
- Welcome to Glifo
- spreadsheet/editor.ts
- latex.ts
- odesolve.ts
- statsShown.ts
- smoke-test.mjs
- blockMove.ts
- Benvenuto in Glifo
- compilerOptions
- relocation-test.mjs
- La grafica: le otto richieste del 10 ottobre 2026
- schema/templates.ts
- symbolic.ts
- Field
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- aiPanel.ts
- FoldersStore
- session-start.sh
- .claude/CLAUDE.md
- Il database degli account (Supabase)
- tutorial.mjs
- Abbonamenti
- explainSubjects.ts
- supabase-stub.sql
- account-test.mjs
- schemaBlocks.ts
- captcha.ts
- In programma
- schemaEn.test.ts
- symbolsEn.test.ts
- siteUpdate.ts
- graph/file.ts
- suggestions.ts
- faq.ts
- spellcheck.ts
- usesDecimalComma
- graph.ts
- vitest
- supabase.ts
- Rational
- .folderItem
- calcResults.ts
- ExplainPanel
- Le spiegazioni, come funzionano
- Dove sono le cose
- Sheet
- link.ts
- createFakeSupabase
- tools.ts
- Piano per piano
- Parser
- Board
- 20261008130026_commenti.sql
- aiEn.test.ts
- .constructor
- xlsx.ts
- editor/lists.ts
- feedback.ts
- explain.test.ts
- Glifo
- vite
- Glifo – note per Claude
- files.ts
- Stroke
- splitEquals
- statsGraph.ts
- Costi
- editor.test.ts
- La lavagna
- .visible
- I modelli e le chiavi API
- suggest.ts
- accountSection
- devDependencies
- scripts
- spreadsheet/file.ts

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 303 edges
2. `MathError` - 151 edges
3. `Sheet` - 147 edges
4. `num()` - 145 edges
5. `h()` - 135 edges
6. `MathNode` - 131 edges
7. `texts` - 124 edges
8. `mul()` - 124 edges
9. `Board` - 117 edges
10. `compile()` - 116 edges

## Surprising Connections (you probably didn't know these)
- `Attenzione a` --references--> `renderMarkdown()`  [INFERRED]
  CLAUDE.md → src/render/markdown.ts
- `4. Più modelli per «Spiegami»` --references--> `webllmId()`  [INFERRED]
  GRAFICA.md → src/ai/localModels.ts
- `7. Via il registro dei tocchi` --references--> `forgetOldKeys()`  [INFERRED]
  GRAFICA.md → src/store/storage.ts
- `Trasloco: il sito su Cloudflare, con un dominio tutto di Glifo` --references--> `dist()`  [INFERRED]
  ROADMAP.md → src/board/shapes.ts
- `Dove sono le cose` --references--> `WidgetKind`  [INFERRED]
  ARCHITETTURA.md → src/editor/schemaBlocks.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (173 total, 40 thin omitted)

### Community 0 - "i18n.ts"
Cohesion: 0.05
Nodes (60): 3. Le impostazioni divise in sezioni, ExplainTone, AI_SERVICES, aiService, T, browserLang(), browserLanguages(), dateLocale() (+52 more)

### Community 1 - "noteWordsGraph.test.ts"
Cohesion: 0.15
Nodes (24): insertGraphBlock(), setGraphLabels(), monthOf(), MONTHS, MONTHS_EN, parseDate(), planBlock, PlanKind (+16 more)

### Community 2 - "main.ts"
Cohesion: 0.03
Nodes (122): addToGraphBlock(), remapGraphLines(), account, ACCOUNT_OFF, accountButton, active, aiShown(), aiToggle (+114 more)

### Community 3 - "compile"
Cohesion: 0.04
Nodes (98): integralRegion, LayeredSolid, argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot() (+90 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (32): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+24 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (104): conicItems(), isConicLine(), quadricEquation(), T, fourierItems(), isFourierLine(), T, onlyComplex() (+96 more)

### Community 6 - "h"
Cohesion: 0.06
Nodes (55): T, texts, moveDayLabel(), openSignedOut(), printButton(), ShareDialogDeps, T, AccountButton (+47 more)

### Community 7 - "num"
Cohesion: 0.11
Nodes (103): atIntegers(), oneFraction(), signsUp(), splitAbs(), symbolicCoefficient(), withoutAbs(), hyperbolicToExp(), polyEx() (+95 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (43): addLabel(), boxes, cameras, complexCoord(), containing(), coord(), coordinates(), drawings (+35 more)

### Community 9 - "explain.ts"
Cohesion: 0.10
Nodes (28): answerFollowUp(), checkTopicSteps(), Conversation, converse(), ExplainError, ExplainEvents, ExplainKind, ExplainStep (+20 more)

### Community 10 - "distributions.ts"
Cohesion: 0.05
Nodes (73): isTestLine(), number(), T, testItems(), addExp(), choose(), continuousQuantile(), decimals() (+65 more)

### Community 11 - "src/relocation.ts"
Cohesion: 0.09
Nodes (53): 1. «Cambia account», accountSpace(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf() (+45 more)

### Community 12 - "svg.ts"
Cohesion: 0.08
Nodes (58): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), dataWindow(), decimalText() (+50 more)

### Community 13 - "laplace.ts"
Cohesion: 0.11
Nodes (40): absOf(), boundsOf(), close(), definite(), fourierProblem, fourierShown(), isTrig(), isZero() (+32 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.08
Nodes (13): fieldInput(), isLanes(), loadDialect(), SchemaEditor, withLaneContents(), edgeLook(), nodeLook(), nodeStyle() (+5 more)

### Community 15 - "editor/editor.ts"
Cohesion: 0.06
Nodes (38): description, name, private, type, version, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/lang-markdown (+30 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (6): functionLabel(), SheetEditor, englishTyping(), serializeSheet(), sheetSize(), cloneSheet()

### Community 17 - "NotesStore"
Cohesion: 0.07
Nodes (33): adoptGuestNotes(), Deletion, DeletionLog, Folder, FOLDER_NAME_MAX, FolderGroup, groupByFolder(), loadClosedFolders() (+25 more)

### Community 18 - "numerical.ts"
Cohesion: 0.12
Nodes (48): bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial(), interpolating() (+40 more)

### Community 19 - "linsys.ts"
Cohesion: 0.09
Nodes (55): EMPTY_SCOPE, EXACT, FLOAT, choices(), gcd(), matrixEquation(), matrixSystem(), minorsGcd() (+47 more)

### Community 20 - "index.ts"
Cohesion: 0.06
Nodes (44): pick(), errorName(), b, bigops, c, calculus, fn, fr (+36 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "schema/editor.ts"
Cohesion: 0.05
Nodes (56): alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ALIGN_NAMES, ARROW_NAMES (+48 more)

### Community 23 - "noteWordsMath.test.ts"
Cohesion: 0.07
Nodes (27): BLOCKS, FROM_ENGLISH, FUNCTIONS, functionWordPairs(), GRAPH_KEY_FORMS, GRAPH_KEY_LINE, GRAPH_KEYS, GraphKey (+19 more)

### Community 24 - "store.ts"
Cohesion: 0.05
Nodes (18): BoardOptions, BoardBackend, BoardStore, done(), fromRecord(), IdbBoards, MemoryBoards, ofNote() (+10 more)

### Community 25 - "parse.ts"
Cohesion: 0.07
Nodes (44): hasWord(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe() (+36 more)

### Community 26 - "board.ts"
Cohesion: 0.07
Nodes (38): Action, DOT_SIZES, EraserMode, HANDLE_REACH, ICON, MODE_NAMES, penErases(), Prefs (+30 more)

### Community 27 - "ui/preview.ts"
Cohesion: 0.07
Nodes (34): GraphLabels, remapLineKeys(), renameGraphScope(), renameScopeKeys(), BlockKind, MoveDir, Look, Theme (+26 more)

### Community 28 - "markdown.ts"
Cohesion: 0.07
Nodes (49): dompurify, highlight.js, markdown-it-footnote, lineDepth(), parseBlockMath(), dataRange(), bulletGroup(), Marker (+41 more)

### Community 29 - "toLatex"
Cohesion: 0.04
Nodes (125): criticalLine(), isSeveralLine(), named(), severalItems(), surface(), T, ARITHMETIC, arithmeticShown() (+117 more)

### Community 30 - "gantt.ts"
Cohesion: 0.07
Nodes (68): amount(), barColor(), crossings(), dateText(), dayMonth(), dayOf(), fitText(), GanttOptions (+60 more)

### Community 31 - "study.ts"
Cohesion: 0.12
Nodes (43): names(), studyItems(), T, nameLatex(), limit(), breaks(), periodOf(), Asymptote (+35 more)

### Community 32 - "solve.ts"
Cohesion: 0.12
Nodes (35): exponentialForm(), fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), close() (+27 more)

### Community 33 - "assistant.ts"
Cohesion: 0.15
Nodes (22): AiAnswer, AiError, AiSettings, answerSchema(), askAi(), askCompatible(), askThroughHost(), capitalized() (+14 more)

### Community 34 - "logic.ts"
Cohesion: 0.11
Nodes (30): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+22 more)

### Community 35 - "sheet.ts"
Cohesion: 0.07
Nodes (31): FieldContext, close(), Definite, definiteIntegral(), exValue(), samples(), Scope, LimitValue (+23 more)

### Community 36 - "complex.ts"
Cohesion: 0.06
Nodes (67): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexLine(), isComplexValue() (+59 more)

### Community 37 - "namesIn"
Cohesion: 0.12
Nodes (40): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+32 more)

### Community 38 - "translations.test.ts"
Cohesion: 0.17
Nodes (18): AstNode, calleeName(), check(), checkPair(), visit(), children(), entryPairs(), files (+10 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (24): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+16 more)

### Community 40 - "view3d.ts"
Cohesion: 0.06
Nodes (85): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+77 more)

### Community 41 - "restore.ts"
Cohesion: 0.16
Nodes (16): newStrokeId(), receiveRelocation(), relocationReceived(), restore(), BackupNote, backupNotes(), restoreBackup(), RestoreBoards (+8 more)

### Community 42 - "explainPanel.ts"
Cohesion: 0.05
Nodes (57): @mlc-ai/web-llm, Explanation, REPLY_TOKENS, chat(), GlifoError, Gpu, load(), post() (+49 more)

### Community 43 - "chart.ts"
Cohesion: 0.16
Nodes (25): at(), breakEven(), Point, quantity(), T, tableItems(), textLabel(), chartData (+17 more)

### Community 44 - "functions.ts"
Cohesion: 0.06
Nodes (80): tableTopic(), valueText(), EMPTY, evaluateSheet(), number(), SheetEvaluator, T, addFormat() (+72 more)

### Community 45 - "MathError"
Cohesion: 0.11
Nodes (61): MathError, angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, dataOf() (+53 more)

### Community 46 - "spreadsheetEn.test.ts"
Cohesion: 0.09
Nodes (48): formulaText(), decimalsOf(), ENGLISH, englishNumber(), fixedNumber(), generalNumber(), group(), italianNumber() (+40 more)

### Community 47 - "Pt"
Cohesion: 0.10
Nodes (15): clampZoom(), coalesced(), EraseAction, Finger, LassoAction, MoveAction, PanAction, PinchAction (+7 more)

### Community 48 - "template.ts"
Cohesion: 0.23
Nodes (9): SuggestionItem, cardPreviewTex(), formPreviewTex(), ParsedTemplate, PLACEHOLDER_TEX, placeholderPreview(), Category, CategoryId (+1 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (36): DrawAction, adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners() (+28 more)

### Community 50 - "toolbar.ts"
Cohesion: 0.16
Nodes (17): insertBlock(), wrapSelection(), ListStyle, ListStyleId, Action, createToolbar(), insertCode(), insertLink() (+9 more)

### Community 51 - "sidePanel.ts"
Cohesion: 0.14
Nodes (12): AiResult, localizeTex(), isConfidentAnswer(), symbolsInCategory(), AiState, cardPreview(), displayCode(), EMPTY_GROUP_TEX (+4 more)

### Community 52 - "aiActivity.ts"
Cohesion: 0.31
Nodes (4): AI_NEWS_TITLE, AI_WORKING_TITLE, aiActivity, T

### Community 53 - "schema/blocks.ts"
Cohesion: 0.44
Nodes (7): placeChart(), blockKind, blockWord(), findFencedBlocks(), OpenFence, schemaBlockText(), findSheetBySource()

### Community 54 - "probability.ts"
Cohesion: 0.10
Nodes (26): End, expSum, Family, CompileOptions, ExactRandom, ExactScope, ALL, compileOf() (+18 more)

### Community 55 - "page.ts"
Cohesion: 0.09
Nodes (23): katex, sidebarToggle(), NEW_ORIGIN, body, draw(), isDark(), saveButton, saveCopy() (+15 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "plan.ts"
Cohesion: 0.14
Nodes (20): shownStyle(), cellText(), columnRole(), columnsOf(), durationUnit(), isNumber(), isPlanRange(), MAX_ACTIVITIES (+12 more)

### Community 58 - "database.ts"
Cohesion: 0.23
Nodes (6): createDatabase(), createUser(), databaseTests(), feedbackTests(), migrations, shareTests()

### Community 59 - "finite.ts"
Cohesion: 0.17
Nodes (28): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+20 more)

### Community 60 - "topics.ts"
Cohesion: 0.15
Nodes (28): ATTRIBUTES, cut(), definedName(), ER_SHAPES, fieldText(), fitLines(), flowOrder(), formulaTopic() (+20 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "Welcome to Glifo"
Cohesion: 0.20
Nodes (9): A few examples, Calculations and graphs, For programming too, Handy shortcuts, How to write formulas, Lists, Spell check, Try it now (+1 more)

### Community 63 - "spreadsheet/editor.ts"
Cohesion: 0.07
Nodes (60): sheetSummary(), currentCall(), Editing, MenuEntry, Move, openSheetEditor(), PATHS, SheetEditorOptions (+52 more)

### Community 64 - "latex.ts"
Cohesion: 0.11
Nodes (27): ACCENT_COMMANDS, diffLatex(), DISTRIBUTION_LATEX, distributionLatex(), domainLatex(), fnLatex(), fnName(), formLatex() (+19 more)

### Community 65 - "odesolve.ts"
Cohesion: 0.08
Nodes (65): addWave(), arrange(), cauchy(), characteristicRoots(), compiled(), constantNames(), constantParticular(), constantRoots() (+57 more)

### Community 66 - "statsShown.ts"
Cohesion: 0.16
Nodes (33): check(), correlation(), count(), covariance(), Data, dataStatistic(), deviation(), fail() (+25 more)

### Community 67 - "smoke-test.mjs"
Cohesion: 0.15
Nodes (6): markdown-it, playwright-core, PNG_ICONS, fakeLlmWorker(), firstVisit(), plainContext

### Community 68 - "blockMove.ts"
Cohesion: 0.11
Nodes (34): @codemirror/commands, blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove, blockPlace() (+26 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "relocation-test.mjs"
Cohesion: 0.18
Nodes (7): AFTER_MOVE, ids, newBrowser(), NOTICE_DAY, out, serve(), TYPES

### Community 72 - "La grafica: le otto richieste del 10 ottobre 2026"
Cohesion: 0.25
Nodes (8): 4. Più modelli per «Spiegami», 5. A cosa serve la chiave dell'AI, 6. Glifo anche in inglese, 7. Via il registro dei tocchi, 8. Il pulsante ✨ con il contorno, Gli abbonamenti, in tutto questo, In che ordine, La grafica: le otto richieste del 10 ottobre 2026

### Community 73 - "schema/templates.ts"
Cohesion: 0.21
Nodes (18): DEFAULT_EDGE, SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), conceptMap(), cycle(), edge() (+10 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (63): linearParts(), valueAt(), primitive(), verified(), linearCells(), pairUp(), atValues(), Converter (+55 more)

### Community 75 - "Field"
Cohesion: 0.12
Nodes (7): characteristicPolynomial(), eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn()

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Errore o imprevisto → nel dettaglio, 3. Serve una decisione → frasi complete, 4. Fine del compito → un solo riepilogo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "aiPanel.ts"
Cohesion: 0.13
Nodes (22): valueNode(), NoteSubject, texHtml(), checkHtml(), checkTitle(), T, cache, cleanKatexError() (+14 more)

### Community 79 - "FoldersStore"
Cohesion: 0.18
Nodes (3): cleanFolderName(), FoldersStore, sameName()

### Community 82 - "Il database degli account (Supabase)"
Cohesion: 0.20
Nodes (9): Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Note condivise con un link, Sincronizzazione, `sync_pull({ since })`: scarica le novità (+1 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.11
Nodes (11): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+3 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.14
Nodes (14): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+6 more)

### Community 91 - "explainSubjects.ts"
Cohesion: 0.15
Nodes (25): explainTarget, formulasUntil(), sheetBefore(), explanationMarkdown(), hasCalculation(), insertAfterBlock(), insertAfterText(), insertExplanation() (+17 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.10
Nodes (11): @electric-sql/pglite, device(), login(), newContext, waitFor(), b64(), CAPTCHA_TOKEN, CODE (+3 more)

### Community 97 - "schemaBlocks.ts"
Cohesion: 0.09
Nodes (26): @codemirror/state, @codemirror/view, InsertOptions, toggleLinePrefix(), addPlaceholders, Placeholder, besideSchema(), BlockWidget (+18 more)

### Community 98 - "captcha.ts"
Cohesion: 0.15
Nodes (12): captchaToken(), loadTurnstile(), Turnstile, TURNSTILE_SCRIPT, Window, TURNSTILE_SITE_KEY, accountFailure(), Accesso con Google (+4 more)

### Community 100 - "In programma"
Cohesion: 0.22
Nodes (9): Account: i propri appunti su ogni dispositivo, anche da condividere, Commenti di chi prova Glifo, Idee per il futuro, In programma, La grafica: account, impostazioni, commenti, AI e lingua (chiesto il 10 ottobre 2026, se ne parla), La lavagna: idee in più, Più avanti, Schemi: idee in più (+1 more)

### Community 101 - "schemaEn.test.ts"
Cohesion: 0.06
Nodes (49): schemaSummary(), svg(), openSchemaEditor(), SchemaEditorOptions, base64(), hide(), OPEN, schemasFromFile() (+41 more)

### Community 102 - "symbolsEn.test.ts"
Cohesion: 0.14
Nodes (28): editDistance(), singular(), stem(), STOPWORDS, words(), BOTH, buildIndex(), containsPhrase() (+20 more)

### Community 103 - "siteUpdate.ts"
Cohesion: 0.17
Nodes (17): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, loadPart() (+9 more)

### Community 104 - "graph/file.ts"
Cohesion: 0.07
Nodes (49): FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsForFile(), graphsFromFile(), hide() (+41 more)

### Community 105 - "suggestions.ts"
Cohesion: 0.20
Nodes (7): EditorMathContext, expand(), preferredIndex(), SuggestionController, commandNames(), parseTemplate(), templateText()

### Community 106 - "faq.ts"
Cohesion: 0.19
Nodes (14): copyLink(), FaqGroup, faqGroups(), FaqQuestion, faqSection, kbd(), list(), p() (+6 more)

### Community 107 - "spellcheck.ts"
Cohesion: 0.08
Nodes (23): misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt(), openAt() (+15 more)

### Community 108 - "usesDecimalComma"
Cohesion: 0.09
Nodes (39): numberText(), endTex(), multipleLabel(), usesDecimalComma(), decimalSeparator(), Digits, formatNumber(), FormatOptions (+31 more)

### Community 113 - "graph.ts"
Cohesion: 0.06
Nodes (40): @maxgraph/core, AT_X, cellHtml(), cellText(), COMPASS, createEdgeCell(), createGraph(), drawSchema() (+32 more)

### Community 116 - "vitest"
Cohesion: 0.05
Nodes (42): vite-plugin-pwa, vitest, GraphLabelLines, LABEL_KEYS, staticGraphSvg(), chooseWindow(), chooseBox(), formulaGraph() (+34 more)

### Community 117 - "supabase.ts"
Cohesion: 0.11
Nodes (36): @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken(), ensureSessionOf() (+28 more)

### Community 118 - "Rational"
Cohesion: 0.07
Nodes (50): Part, at(), centralCanonical(), Coefficients, coneCanonical(), conicOf(), det2(), det3() (+42 more)

### Community 120 - "calcResults.ts"
Cohesion: 0.13
Nodes (11): acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult, calcResults(), CheckWidget, insertResult() (+3 more)

### Community 121 - "ExplainPanel"
Cohesion: 0.17
Nodes (3): ExplainChat, ExplainPanel, preventFocusSteal()

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "Dove sono le cose"
Cohesion: 0.08
Nodes (42): Dove sono le cose, Glifo – architettura, centerOn(), copyStrokes(), cross(), handleScale(), insideLasso(), keepInside() (+34 more)

### Community 124 - "Sheet"
Cohesion: 0.08
Nodes (30): ExactComplexScope, ConicInfo, Ode, withWorkLimit(), FiniteContext, FormattedResult, MathNode, chainOf() (+22 more)

### Community 125 - "link.ts"
Cohesion: 0.09
Nodes (32): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), PullResult, openShareDialog(), changeAccess(), changeCopy() (+24 more)

### Community 128 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 129 - "tools.ts"
Cohesion: 0.14
Nodes (13): ALL_TOOLS, callOf(), checkTool, Identities, looseJson(), repairTex(), resultOf(), runTool() (+5 more)

### Community 132 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 139 - "aiEn.test.ts"
Cohesion: 0.18
Nodes (11): chatSubject(), chatSystemPrompt(), EXPLAIN_TONES, systemPrompt(), toneRule(), topicSystemPrompt(), topicTask(), toolsPrompt() (+3 more)

### Community 140 - ".constructor"
Cohesion: 0.15
Nodes (4): closeMathBlockOnEnter(), EditorCallbacks, searchPhrases(), insertTemplate()

### Community 141 - "xlsx.ts"
Cohesion: 0.09
Nodes (45): RFC-4180, fflate, tablesNote(), csvCell(), csvDelimiter(), csvNumbers(), csvToSheet(), digitsOf() (+37 more)

### Community 142 - "editor/lists.ts"
Cohesion: 0.10
Nodes (55): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+47 more)

### Community 143 - "feedback.ts"
Cohesion: 0.07
Nodes (50): rich(), Site, T, messageOf(), openLoginDialog(), codeStep(), emailStep(), commentDate() (+42 more)

### Community 144 - "explain.test.ts"
Cohesion: 0.22
Nodes (12): chatContext, ChatFn, engineHints(), explain(), feedback(), integralsIn(), questionPrompt(), sheetFactory() (+4 more)

### Community 146 - "Glifo"
Cohesion: 0.12
Nodes (16): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Domande frequenti e commenti (+8 more)

### Community 154 - "vite"
Cohesion: 0.29
Nodes (4): vite, minutes, postMessage(), started

### Community 156 - "Glifo – note per Claude"
Cohesion: 0.25
Nodes (8): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Regole, sqlite()

### Community 157 - "files.ts"
Cohesion: 0.14
Nodes (21): cache, capability(), ClaudeRuntime, hostDownloads, HostError, inClaudeViewer(), ModelTier, runtime() (+13 more)

### Community 158 - "Stroke"
Cohesion: 0.27
Nodes (4): Step, BoardChange, BoardData, Stroke

### Community 159 - "splitEquals"
Cohesion: 0.33
Nodes (12): allNames(), bareResult(), checkFormulas(), checkSteps(), checkTopicFormula(), formulaNames(), parsed(), sameSolutions() (+4 more)

### Community 160 - "statsGraph.ts"
Cohesion: 0.25
Nodes (13): classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX, Line, number(), pmfBars() (+5 more)

### Community 161 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 162 - "editor.test.ts"
Cohesion: 0.08
Nodes (26): @lezer/common, tabOutOfMath(), templateInsertion(), CODE_NODES, CommandToken, commandTokenAt(), isInCode(), MATH_NODES (+18 more)

### Community 163 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 166 - ".visible"
Cohesion: 0.40
Nodes (5): Promemoria per lo studente, 2. La pagina dei commenti, tipo FAQ, Commenti di chi prova Glifo, page(), site()

### Community 167 - "I modelli e le chiavi API"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), In prova sul ramo `prova` (7 ottobre 2026): Qwen3 nel browser per «Spiegami», Le idee dello studente (5 ottobre 2026)

### Community 168 - "suggest.ts"
Cohesion: 0.27
Nodes (11): normalizeText(), IndexedEntry, SearchResult, getIndex(), isSubsequence(), keysOf(), MatchKind, suggestCommands() (+3 more)

### Community 169 - "accountSection"
Cohesion: 0.33
Nodes (3): SyncStatus, accountSection(), AccountSectionDeps

### Community 170 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

### Community 171 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 172 - "spreadsheet/file.ts"
Cohesion: 0.38
Nodes (6): hide(), OPEN, sheetsForFile(), sheetsFromFile(), T, unhide()

## Knowledge Gaps
- **860 isolated node(s):** `Comandi`, `Regole`, `6. Glifo anche in inglese`, `8. Il pulsante ✨ con il contorno`, `Gli abbonamenti, in tutto questo` (+855 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1173 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **40 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `texts` connect `h` to `i18n.ts`, `tools.ts`, `noteWordsGraph.test.ts`, `main.ts`, `compile`, `spec.ts`, `graph/preview.ts`, `explain.ts`, `distributions.ts`, `src/relocation.ts`, `svg.ts`, `laplace.ts`, `editor/lists.ts`, `editor/editor.ts`, `feedback.ts`, `xlsx.ts`, `numerical.ts`, `linsys.ts`, `index.ts`, `NotesStore`, `schema/editor.ts`, `files.ts`, `parse.ts`, `board.ts`, `ui/preview.ts`, `Glifo – note per Claude`, `toLatex`, `gantt.ts`, `study.ts`, `statsGraph.ts`, `assistant.ts`, `logic.ts`, `sheet.ts`, `complex.ts`, `namesIn`, `solve.ts`, `resize.ts`, `restore.ts`, `explainPanel.ts`, `chart.ts`, `functions.ts`, `MathError`, `spreadsheet/file.ts`, `spreadsheetEn.test.ts`, `toolbar.ts`, `sidePanel.ts`, `aiActivity.ts`, `probability.ts`, `page.ts`, `plan.ts`, `finite.ts`, `topics.ts`, `spreadsheet/editor.ts`, `latex.ts`, `odesolve.ts`, `statsShown.ts`, `schema/templates.ts`, `symbolic.ts`, `aiPanel.ts`, `schemaBlocks.ts`, `schemaEn.test.ts`, `siteUpdate.ts`, `graph/file.ts`, `faq.ts`, `spellcheck.ts`, `usesDecimalComma`, `supabase.ts`, `Rational`, `calcResults.ts`, `link.ts`?**
  _High betweenness centrality (0.138) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `i18n.ts`, `noteWordsGraph.test.ts`, `main.ts`, `compile`, `h`, `num`, `distributions.ts`, `src/relocation.ts`, `aiEn.test.ts`, `svg.ts`, `editor/lists.ts`, `editor/editor.ts`, `feedback.ts`, `explain.test.ts`, `NotesStore`, `linsys.ts`, `xlsx.ts`, `schema/editor.ts`, `noteWordsMath.test.ts`, `store.ts`, `parse.ts`, `board.ts`, `ui/preview.ts`, `markdown.ts`, `gantt.ts`, `assistant.ts`, `editor.test.ts`, `sheet.ts`, `translations.test.ts`, `resize.ts`, `view3d.ts`, `restore.ts`, `explainPanel.ts`, `chart.ts`, `MathError`, `spreadsheetEn.test.ts`, `template.ts`, `board/shapes.ts`, `aiActivity.ts`, `schema/blocks.ts`, `page.ts`, `plan.ts`, `database.ts`, `spreadsheet/editor.ts`, `blockMove.ts`, `schemaBlocks.ts`, `captcha.ts`, `schemaEn.test.ts`, `symbolsEn.test.ts`, `siteUpdate.ts`, `graph/file.ts`, `faq.ts`, `spellcheck.ts`, `supabase.ts`, `Dove sono le cose`, `link.ts`?**
  _High betweenness centrality (0.087) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `Dove sono le cose` to `i18n.ts`, `noteWordsGraph.test.ts`, `main.ts`, `compile`, `spec.ts`, `h`, `num`, `graph/preview.ts`, `explain.ts`, `distributions.ts`, `src/relocation.ts`, `svg.ts`, `laplace.ts`, `SchemaEditor`, `editor/editor.ts`, `SheetEditor`, `NotesStore`, `numerical.ts`, `linsys.ts`, `schema/editor.ts`, `store.ts`, `parse.ts`, `board.ts`, `ui/preview.ts`, `markdown.ts`, `toLatex`, `gantt.ts`, `study.ts`, `assistant.ts`, `logic.ts`, `sheet.ts`, `complex.ts`, `namesIn`, `view3d.ts`, `explainPanel.ts`, `chart.ts`, `functions.ts`, `MathError`, `spreadsheetEn.test.ts`, `Pt`, `board/shapes.ts`, `toolbar.ts`, `sidePanel.ts`, `schema/blocks.ts`, `probability.ts`, `page.ts`, `plan.ts`, `finite.ts`, `topics.ts`, `spreadsheet/editor.ts`, `odesolve.ts`, `smoke-test.mjs`, `blockMove.ts`, `symbolic.ts`, `aiPanel.ts`, `tutorial.mjs`, `explainSubjects.ts`, `schemaBlocks.ts`, `schemaEn.test.ts`, `siteUpdate.ts`, `graph/file.ts`, `faq.ts`, `usesDecimalComma`, `graph.ts`, `vitest`, `supabase.ts`, `Rational`, `ExplainPanel`, `Sheet`, `Board`, `aiEn.test.ts`, `.constructor`, `xlsx.ts`, `feedback.ts`, `explain.test.ts`, `files.ts`, `splitEquals`, `accountSection`?**
  _High betweenness centrality (0.075) - this node is a cross-community bridge._
- **Are the 302 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `tutorialModel()`) actually correct?**
  _`Dove sono le cose` has 302 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Comandi`, `Regole`, `6. Glifo anche in inglese` to the rest of the system?**
  _860 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `i18n.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04932844932844933 - nodes in this community are weakly interconnected._
- **Should `noteWordsGraph.test.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.14814814814814814 - nodes in this community are weakly interconnected._