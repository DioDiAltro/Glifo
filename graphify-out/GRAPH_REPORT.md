# Graph Report - Glifo  (2026-10-13)

## Corpus Check
- 346 files · ~720,795 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5549 nodes · 20297 edges · 158 communities (116 shown, 42 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 673 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a9ee08a4`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- ui/settings.ts
- markdown.ts
- main.ts
- math/evaluate.ts
- sync.ts
- spec.ts
- siteUpdate.ts
- num
- graph/preview.ts
- Dove sono le cose
- probability.ts
- MLCEngine
- vitest
- laplace.ts
- SchemaEditor
- editor/editor.ts
- SheetEditor
- src/relocation.ts
- numerical.ts
- Field
- index.ts
- engine.ts
- schemaEn.test.ts
- noteWordsMath.test.ts
- IdbBoards
- parse.ts
- board.ts
- ui/preview.ts
- NotesStore
- arithmetic.ts
- gantt.ts
- study.ts
- solve.ts
- assistant.ts
- logic.ts
- compile
- complex.ts
- namesIn
- translations.test.ts
- resize.ts
- view3d.ts
- localModels.ts
- latex.ts
- plan.ts
- functions.ts
- MathError
- texts
- Pt
- graph/file.ts
- board/shapes.ts
- toolbar.ts
- sidePanel.ts
- aiPanel.test.ts
- conics.ts
- explainSubjects.ts
- mathEn2.test.ts
- 20261004091555_note_condivise.sql
- .constructor
- topics.ts
- finite.ts
- tutorial.ts
- dependencies
- Welcome to Glifo
- spreadsheet/editor.ts
- h
- odesolve.ts
- sheet.ts
- smoke-test.mjs
- blockMove.ts
- Benvenuto in Glifo
- compilerOptions
- relocation-test.mjs
- La grafica: le otto richieste del 10 ottobre 2026
- schema/templates.ts
- symbolic.ts
- ExplainPanel
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- supabase.ts
- FoldersStore
- session-start.sh
- .claude/CLAUDE.md
- Il database degli account (Supabase)
- tutorial.mjs
- Abbonamenti
- i18n.ts
- supabase-stub.sql
- account-test.mjs
- schemaBlocks.ts
- suggestions.ts
- In programma
- database.ts
- symbolsEn.test.ts
- vite.config.ts
- scripts
- editor.test.ts
- spreadsheet/file.ts
- spellcheck.ts
- graph.ts
- Rational
- BoardStore
- calcResults.ts
- explainPanel.ts
- Le spiegazioni, come funzionano
- strokes.ts
- Sheet
- page.ts
- createFakeSupabase
- Piano per piano
- Parser
- Board
- 20261008130026_commenti.sql
- xlsx.ts
- editor/lists.ts
- ui/relocation.ts
- schema/editor.ts
- Glifo
- vite
- Glifo – note per Claude
- planPreview.ts
- Costi
- La lavagna
- devDependencies

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 308 edges
2. `MathError` - 151 edges
3. `Sheet` - 147 edges
4. `num()` - 145 edges
5. `h()` - 136 edges
6. `MathNode` - 131 edges
7. `mul()` - 124 edges
8. `texts` - 123 edges
9. `Board` - 117 edges
10. `compile()` - 116 edges

## Surprising Connections (you probably didn't know these)
- `4. Più modelli per «Spiegami»` --references--> `webllmId()`  [INFERRED]
  GRAFICA.md → src/ai/localModels.ts
- `7. Via il registro dei tocchi` --references--> `forgetOldKeys()`  [INFERRED]
  GRAFICA.md → src/store/storage.ts
- `Dove sono le cose` --references--> `ConicElements`  [INFERRED]
  ARCHITETTURA.md → src/math/conics.ts
- `Dove sono le cose` --references--> `WidgetKind`  [INFERRED]
  ARCHITETTURA.md → src/editor/schemaBlocks.ts
- `Attenzione a` --references--> `renderMarkdown()`  [INFERRED]
  CLAUDE.md → src/render/markdown.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (158 total, 42 thin omitted)

### Community 0 - "ui/settings.ts"
Cohesion: 0.05
Nodes (39): 3. Le impostazioni divise in sezioni, ExplainTone, DownloadedModel, MODEL_LICENSES, ModelGroup, dateLocale(), numberLocale(), DEFAULT_SETTINGS (+31 more)

### Community 1 - "markdown.ts"
Cohesion: 0.05
Nodes (83): GraphLabelLines, insertGraphBlock(), LABEL_KEYS, setGraphLabels(), FIGURE_PALETTE, graphImagesFor(), graphsForFile(), hide() (+75 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (118): unshareNote(), addToGraphBlock(), remapGraphLines(), remapLineKeys(), account, ACCOUNT_OFF, accountButton, accountProblem() (+110 more)

### Community 3 - "math/evaluate.ts"
Cohesion: 0.04
Nodes (78): argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot(), fieldOn(), numericPartials() (+70 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (31): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+23 more)

### Community 5 - "spec.ts"
Cohesion: 0.04
Nodes (128): isConicLine(), quadricEquation(), fourierItems(), isFourierLine(), T, isComplexLine(), isTestLine(), number() (+120 more)

### Community 6 - "siteUpdate.ts"
Cohesion: 0.18
Nodes (16): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, loadPart() (+8 more)

### Community 7 - "num"
Cohesion: 0.13
Nodes (87): atIntegers(), withoutAbs(), exp(), hyperbolicToExp(), inverseRational(), sqrtEx(), termTransform(), polyEx() (+79 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (42): addLabel(), boxes, cameras, complexCoord(), coord(), coordinates(), drawings, drawnViews (+34 more)

### Community 9 - "Dove sono le cose"
Cohesion: 0.06
Nodes (76): Dove sono le cose, Glifo – architettura, allNames(), answerFollowUp(), bareResult(), chatContext, ChatFn, chatSubject() (+68 more)

### Community 10 - "probability.ts"
Cohesion: 0.05
Nodes (79): FieldContext, classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX, Line, number() (+71 more)

### Community 12 - "vitest"
Cohesion: 0.04
Nodes (100): vitest, formulaAtCursor(), contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), staticGraphSvg(), chooseWindow() (+92 more)

### Community 13 - "laplace.ts"
Cohesion: 0.19
Nodes (23): beyondPoles(), compiled(), E, fractionShown(), HALF, inverseLaplaceShown(), laplaceEx(), laplaceShown() (+15 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.07
Nodes (19): fieldInput(), isLanes(), SchemaEditor, withLaneContents(), createEdgeCell(), edgeLook(), edgeStyle(), edgeTextAt() (+11 more)

### Community 15 - "editor/editor.ts"
Cohesion: 0.06
Nodes (45): description, name, private, type, version, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands (+37 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (7): functionLabel(), SheetEditor, englishTyping(), serializeSheet(), sheetSize(), clearRange(), cloneSheet()

### Community 17 - "src/relocation.ts"
Cohesion: 0.07
Nodes (64): 1. «Cambia account», accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount() (+56 more)

### Community 18 - "numerical.ts"
Cohesion: 0.09
Nodes (56): DDOT, DOT, OdeFunction, odeSolution(), OdeSystem, step(), T, FormatOptions (+48 more)

### Community 19 - "Field"
Cohesion: 0.12
Nodes (7): characteristicPolynomial(), eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn()

### Community 20 - "index.ts"
Cohesion: 0.06
Nodes (46): SuggestionItem, b, bigops, c, calculus, fn, fr, fractions (+38 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "schemaEn.test.ts"
Cohesion: 0.06
Nodes (47): schemaSummary(), svg(), schemaBlockAtLine(), openSchemaEditor(), SchemaEditorOptions, base64(), hide(), OPEN (+39 more)

### Community 23 - "noteWordsMath.test.ts"
Cohesion: 0.08
Nodes (24): katex, setLangForTests(), cache, T, TexRender, AstNode, childrenOf(), DATA (+16 more)

### Community 24 - "IdbBoards"
Cohesion: 0.07
Nodes (14): fake-indexeddb, BoardBackend, done(), fromRecord(), IdbBoards, ofNote(), openBoardDatabase(), openDefault() (+6 more)

### Community 25 - "parse.ts"
Cohesion: 0.07
Nodes (43): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe(), differentialInFraction() (+35 more)

### Community 26 - "board.ts"
Cohesion: 0.07
Nodes (47): Action, DOT_SIZES, DrawAction, EraseAction, EraserMode, HANDLE_REACH, ICON, MODE_NAMES (+39 more)

### Community 27 - "ui/preview.ts"
Cohesion: 0.07
Nodes (34): GraphLabels, GraphLook, renameGraphScope(), renameScopeKeys(), BlockKind, MoveDir, Look, Theme (+26 more)

### Community 28 - "NotesStore"
Cohesion: 0.06
Nodes (35): Deletion, DeletionLog, Folder, FOLDER_NAME_MAX, FolderGroup, groupByFolder(), loadClosedFolders(), RemoteFolder (+27 more)

### Community 29 - "arithmetic.ts"
Cohesion: 0.06
Nodes (88): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+80 more)

### Community 30 - "gantt.ts"
Cohesion: 0.05
Nodes (74): amount(), barColor(), crossings(), dateText(), dayMonth(), dayOf(), fitText(), GanttOptions (+66 more)

### Community 31 - "study.ts"
Cohesion: 0.14
Nodes (37): limit(), Asymptote, asymptoteText(), boundaries(), compiled(), cutsOf(), defined(), domainOf() (+29 more)

### Community 32 - "solve.ts"
Cohesion: 0.08
Nodes (49): exponentialForm(), fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), decimalSeparator() (+41 more)

### Community 33 - "assistant.ts"
Cohesion: 0.13
Nodes (25): AiAnswer, AiError, AiSettings, answerSchema(), askAi(), askCompatible(), askThroughHost(), capitalized() (+17 more)

### Community 34 - "logic.ts"
Cohesion: 0.11
Nodes (30): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+22 more)

### Community 35 - "compile"
Cohesion: 0.05
Nodes (106): criticalLine(), named(), severalItems(), surface(), T, close(), Definite, definiteIntegral() (+98 more)

### Community 36 - "complex.ts"
Cohesion: 0.06
Nodes (63): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexValue(), isInequality() (+55 more)

### Community 37 - "namesIn"
Cohesion: 0.19
Nodes (27): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+19 more)

### Community 38 - "translations.test.ts"
Cohesion: 0.17
Nodes (18): AstNode, calleeName(), check(), checkPair(), visit(), children(), entryPairs(), files (+10 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (24): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+16 more)

### Community 40 - "view3d.ts"
Cohesion: 0.06
Nodes (82): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+74 more)

### Community 41 - "localModels.ts"
Cohesion: 0.06
Nodes (53): chat(), GlifoError, Gpu, load(), post(), remove(), scope, shaderF16() (+45 more)

### Community 42 - "latex.ts"
Cohesion: 0.12
Nodes (25): ACCENT_COMMANDS, diffLatex(), DISTRIBUTION_LATEX, distributionLatex(), domainLatex(), fnLatex(), fnName(), formLatex() (+17 more)

### Community 43 - "plan.ts"
Cohesion: 0.10
Nodes (28): chartFrom(), chartLines(), chartRange(), ChartTable, currentRegion(), isNumber(), Results, T (+20 more)

### Community 44 - "functions.ts"
Cohesion: 0.08
Nodes (65): EMPTY, number(), T, addFormat(), divFormat(), GENERAL, mulFormat(), roundTo() (+57 more)

### Community 45 - "MathError"
Cohesion: 0.07
Nodes (92): MathError, formatRational(), angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx (+84 more)

### Community 46 - "texts"
Cohesion: 0.08
Nodes (51): pick(), texts, decimalsOf(), ENGLISH, englishNumber(), fixedNumber(), generalNumber(), group() (+43 more)

### Community 47 - "Pt"
Cohesion: 0.10
Nodes (13): clampZoom(), coalesced(), Finger, LassoAction, MoveAction, pointsOf(), pressureOf(), validView() (+5 more)

### Community 48 - "graph/file.ts"
Cohesion: 0.11
Nodes (33): figureName(), graphFigure(), graphImage(), graphsFromFile(), OPEN, swatchSvg(), T, titleBand() (+25 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (35): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+27 more)

### Community 50 - "toolbar.ts"
Cohesion: 0.09
Nodes (22): EditorCallbacks, MarkdownEditor, searchPhrases(), insertBlock(), insertTemplate(), templateInsertion(), wrapSelection(), ListStyleId (+14 more)

### Community 51 - "sidePanel.ts"
Cohesion: 0.14
Nodes (15): AiResult, localizeTex(), cleanKatexError(), renderTex(), isConfidentAnswer(), symbolsInCategory(), AiState, cardPreview() (+7 more)

### Community 52 - "aiPanel.test.ts"
Cohesion: 0.12
Nodes (19): definedName(), formulaTopic(), graphTopic(), numberText(), studyOf(), theoremTopic(), NoteSubject, AiPanel (+11 more)

### Community 53 - "conics.ts"
Cohesion: 0.16
Nodes (32): conicItems(), T, at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo (+24 more)

### Community 54 - "explainSubjects.ts"
Cohesion: 0.15
Nodes (24): explainTarget, formulasUntil(), sheetBefore(), explanationMarkdown(), hasCalculation(), insertAfterBlock(), insertAfterText(), insertExplanation() (+16 more)

### Community 55 - "mathEn2.test.ts"
Cohesion: 0.11
Nodes (33): EMPTY_COMPLEX_SCOPE, between(), chiSquareTest(), confidence(), confidenceShown(), decimals(), Given, hypothesisTest() (+25 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 58 - "topics.ts"
Cohesion: 0.08
Nodes (47): ATTRIBUTES, cut(), ER_SHAPES, fieldText(), fitLines(), flowOrder(), formulaText(), FREE_NAMES (+39 more)

### Community 59 - "finite.ts"
Cohesion: 0.17
Nodes (27): countOf(), Elem, elemTex(), elemText(), EMPTY, expandDots(), FiniteError, FiniteResult (+19 more)

### Community 60 - "tutorial.ts"
Cohesion: 0.15
Nodes (12): HINT_MS, markTutorialSeen(), openTutorial(), show(), richText(), showTutorialHint(), close(), T (+4 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "Welcome to Glifo"
Cohesion: 0.20
Nodes (9): A few examples, Calculations and graphs, For programming too, Handy shortcuts, How to write formulas, Lists, Spell check, Try it now (+1 more)

### Community 63 - "spreadsheet/editor.ts"
Cohesion: 0.09
Nodes (45): currentCall(), Editing, MenuEntry, Move, openSheetEditor(), PATHS, SheetEditorOptions, Snapshot (+37 more)

### Community 64 - "h"
Cohesion: 0.05
Nodes (73): SyncStatus, rich(), viewSwitch, openShareDialog(), changeAccess(), changeCopy(), refreshChanged(), render() (+65 more)

### Community 65 - "odesolve.ts"
Cohesion: 0.07
Nodes (89): primed(), withPrimes(), linearIn(), addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots() (+81 more)

### Community 66 - "sheet.ts"
Cohesion: 0.08
Nodes (54): ExactFunction, Lin, NUMERICAL, bracketParts(), BRACKETS, CHECK_VALUES, checks, Definition (+46 more)

### Community 67 - "smoke-test.mjs"
Cohesion: 0.15
Nodes (6): markdown-it, playwright-core, PNG_ICONS, fakeLlmWorker(), firstVisit(), plainContext

### Community 68 - "blockMove.ts"
Cohesion: 0.11
Nodes (34): blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove, blockPlace(), closed() (+26 more)

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
Cohesion: 0.15
Nodes (13): Promemoria per lo studente, 2. La pagina dei commenti, tipo FAQ, 4. Più modelli per «Spiegami», 5. A cosa serve la chiave dell'AI, 6. Glifo anche in inglese, 7. Via il registro dei tocchi, 8. Il pulsante ✨ con il contorno, Gli abbonamenti, in tutto questo (+5 more)

### Community 73 - "schema/templates.ts"
Cohesion: 0.21
Nodes (18): DEFAULT_EDGE, SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), conceptMap(), cycle(), edge() (+10 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.06
Nodes (63): constant(), fnLabel(), primitive(), linearCells(), assumePositive(), atValues(), commonPositive(), Converter (+55 more)

### Community 75 - "ExplainPanel"
Cohesion: 0.16
Nodes (4): ExplainChat, ExplainPanel, preventFocusSteal(), formulasSummary()

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Errore o imprevisto → nel dettaglio, 3. Serve una decisione → frasi complete, 4. Fine del compito → un solo riepilogo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "supabase.ts"
Cohesion: 0.08
Nodes (39): @supabase/supabase-js, captchaToken(), loadTurnstile(), Turnstile, TURNSTILE_SCRIPT, Window, TURNSTILE_SITE_KEY, accountError (+31 more)

### Community 79 - "FoldersStore"
Cohesion: 0.15
Nodes (5): cleanFolderName(), FoldersStore, sameName(), StoreOptions, names()

### Community 82 - "Il database degli account (Supabase)"
Cohesion: 0.20
Nodes (9): Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Note condivise con un link, Sincronizzazione, `sync_pull({ since })`: scarica le novità (+1 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.11
Nodes (11): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+3 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.11
Nodes (19): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Deciso (5 ottobre 2026), Fonti (controllate il 4 ottobre 2026) (+11 more)

### Community 91 - "i18n.ts"
Cohesion: 0.14
Nodes (20): browserLang(), browserLanguages(), detectLang(), Entry, isLang(), lang, LANGUAGES, savedLang() (+12 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.11
Nodes (10): device(), login(), newContext, waitFor(), b64(), CAPTCHA_TOKEN, CODE, GOOGLE_CODE (+2 more)

### Community 97 - "schemaBlocks.ts"
Cohesion: 0.09
Nodes (33): @codemirror/state, @codemirror/view, InsertOptions, toggleLinePrefix(), besideSchema(), BlockWidget, findWidgetBlocks(), guardBlocks() (+25 more)

### Community 98 - "suggestions.ts"
Cohesion: 0.16
Nodes (11): EditorMathContext, expand(), preferredIndex(), SuggestionController, cardPreviewTex(), formPreviewTex(), ParsedTemplate, parseTemplate() (+3 more)

### Community 100 - "In programma"
Cohesion: 0.22
Nodes (9): Account: i propri appunti su ogni dispositivo, anche da condividere, Commenti di chi prova Glifo, Idee per il futuro, In programma, La grafica: account, impostazioni, commenti, AI e lingua (chiesto il 10 ottobre 2026, se ne parla), La lavagna: idee in più, Più avanti, Schemi: idee in più (+1 more)

### Community 101 - "database.ts"
Cohesion: 0.21
Nodes (7): @electric-sql/pglite, createDatabase(), createUser(), databaseTests(), feedbackTests(), migrations, shareTests()

### Community 102 - "symbolsEn.test.ts"
Cohesion: 0.11
Nodes (40): editDistance(), normalizeText(), singular(), stem(), STOPWORDS, words(), BOTH, buildIndex() (+32 more)

### Community 103 - "vite.config.ts"
Cohesion: 0.29
Nodes (5): @mlc-ai/web-llm, vite-plugin-pwa, defineFor(), MAIN_BRANCH, webllmModels

### Community 104 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 105 - "editor.test.ts"
Cohesion: 0.07
Nodes (28): closeMathBlockOnEnter(), tabOutOfMath(), CODE_NODES, CommandToken, commandTokenAt(), isInCode(), MATH_NODES, mathContextAt() (+20 more)

### Community 106 - "spreadsheet/file.ts"
Cohesion: 0.38
Nodes (6): hide(), OPEN, sheetsForFile(), sheetsFromFile(), T, unhide()

### Community 107 - "spellcheck.ts"
Cohesion: 0.07
Nodes (25): @codemirror/lang-markdown, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt() (+17 more)

### Community 113 - "graph.ts"
Cohesion: 0.06
Nodes (38): @maxgraph/core, AT_X, cellHtml(), cellText(), COMPASS, createGraph(), drawSchema(), isEdgeLook() (+30 more)

### Community 118 - "Rational"
Cohesion: 0.09
Nodes (27): Part, exactSqrt(), unavailable(), expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact() (+19 more)

### Community 119 - "BoardStore"
Cohesion: 0.09
Nodes (15): BoardStore, MemoryBoards, applyAccountChange(), backup(), BackupNote, backupNotes(), restoreBackup(), RestoreBoards (+7 more)

### Community 120 - "calcResults.ts"
Cohesion: 0.09
Nodes (22): @lezer/common, acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult, calcResults(), CheckWidget (+14 more)

### Community 121 - "explainPanel.ts"
Cohesion: 0.09
Nodes (22): Explanation, FollowUp, REPLY_TOKENS, ChatMessage, AI_NEWS_TITLE, AI_WORKING_TITLE, aiActivity, AiWork (+14 more)

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "strokes.ts"
Cohesion: 0.09
Nodes (37): centerOn(), copyStrokes(), cross(), IDENTITY, insideLasso(), keepInside(), LASSO_SHARE, lassoed() (+29 more)

### Community 124 - "Sheet"
Cohesion: 0.07
Nodes (34): Definition, Line, ExactComplexScope, Ode, withWorkLimit(), FiniteContext, FormattedResult, Mat (+26 more)

### Community 125 - "page.ts"
Cohesion: 0.04
Nodes (64): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), PullResult, NEW_ORIGIN, isShareToken(), parseSharedNote() (+56 more)

### Community 128 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 132 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 141 - "xlsx.ts"
Cohesion: 0.09
Nodes (45): RFC-4180, fflate, tablesNote(), csvCell(), csvDelimiter(), csvNumbers(), csvToSheet(), digitsOf() (+37 more)

### Community 142 - "editor/lists.ts"
Cohesion: 0.08
Nodes (69): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+61 more)

### Community 143 - "ui/relocation.ts"
Cohesion: 0.14
Nodes (20): relocationMessage(), RelocationResult, BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark(), downloadButton() (+12 more)

### Community 144 - "schema/editor.ts"
Cohesion: 0.05
Nodes (62): laneOf(), alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ALIGN_NAMES (+54 more)

### Community 146 - "Glifo"
Cohesion: 0.12
Nodes (16): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Domande frequenti e commenti (+8 more)

### Community 154 - "vite"
Cohesion: 0.29
Nodes (4): vite, minutes, postMessage(), started

### Community 156 - "Glifo – note per Claude"
Cohesion: 0.25
Nodes (8): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Regole, sqlite()

### Community 157 - "planPreview.ts"
Cohesion: 0.11
Nodes (27): planName(), T, cache, capability(), ClaudeRuntime, hostDownloads, HostError, inClaudeViewer() (+19 more)

### Community 161 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 163 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 170 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

## Knowledge Gaps
- **870 isolated node(s):** `6. Glifo anche in inglese`, `8. Il pulsante ✨ con il contorno`, `Gli abbonamenti, in tutto questo`, `In che ordine`, `Family` (+865 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1189 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **42 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `texts` connect `texts` to `ui/settings.ts`, `markdown.ts`, `main.ts`, `math/evaluate.ts`, `spec.ts`, `siteUpdate.ts`, `graph/preview.ts`, `Dove sono le cose`, `probability.ts`, `vitest`, `xlsx.ts`, `editor/lists.ts`, `editor/editor.ts`, `schema/editor.ts`, `src/relocation.ts`, `numerical.ts`, `ui/relocation.ts`, `index.ts`, `schemaEn.test.ts`, `noteWordsMath.test.ts`, `parse.ts`, `board.ts`, `ui/preview.ts`, `NotesStore`, `planPreview.ts`, `gantt.ts`, `arithmetic.ts`, `solve.ts`, `assistant.ts`, `logic.ts`, `compile`, `complex.ts`, `namesIn`, `study.ts`, `resize.ts`, `localModels.ts`, `latex.ts`, `plan.ts`, `functions.ts`, `MathError`, `graph/file.ts`, `toolbar.ts`, `sidePanel.ts`, `aiPanel.test.ts`, `conics.ts`, `mathEn2.test.ts`, `topics.ts`, `finite.ts`, `tutorial.ts`, `spreadsheet/editor.ts`, `h`, `odesolve.ts`, `sheet.ts`, `schema/templates.ts`, `symbolic.ts`, `supabase.ts`, `i18n.ts`, `schemaBlocks.ts`, `spreadsheet/file.ts`, `spellcheck.ts`, `BoardStore`, `calcResults.ts`, `explainPanel.ts`, `page.ts`?**
  _High betweenness centrality (0.134) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `Dove sono le cose` to `ui/settings.ts`, `markdown.ts`, `main.ts`, `math/evaluate.ts`, `spec.ts`, `siteUpdate.ts`, `num`, `Board`, `graph/preview.ts`, `vitest`, `xlsx.ts`, `SchemaEditor`, `ui/relocation.ts`, `schema/editor.ts`, `src/relocation.ts`, `numerical.ts`, `SheetEditor`, `noteWordsMath.test.ts`, `parse.ts`, `board.ts`, `ui/preview.ts`, `NotesStore`, `planPreview.ts`, `gantt.ts`, `arithmetic.ts`, `solve.ts`, `assistant.ts`, `logic.ts`, `compile`, `complex.ts`, `namesIn`, `study.ts`, `view3d.ts`, `localModels.ts`, `plan.ts`, `functions.ts`, `MathError`, `texts`, `Pt`, `graph/file.ts`, `board/shapes.ts`, `toolbar.ts`, `sidePanel.ts`, `aiPanel.test.ts`, `conics.ts`, `explainSubjects.ts`, `mathEn2.test.ts`, `topics.ts`, `finite.ts`, `tutorial.ts`, `spreadsheet/editor.ts`, `h`, `odesolve.ts`, `sheet.ts`, `smoke-test.mjs`, `blockMove.ts`, `symbolic.ts`, `ExplainPanel`, `supabase.ts`, `tutorial.mjs`, `i18n.ts`, `schemaBlocks.ts`, `graph.ts`, `Rational`, `BoardStore`, `calcResults.ts`, `explainPanel.ts`, `strokes.ts`, `Sheet`, `page.ts`?**
  _High betweenness centrality (0.115) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `ui/settings.ts`, `markdown.ts`, `math/evaluate.ts`, `siteUpdate.ts`, `num`, `Dove sono le cose`, `probability.ts`, `xlsx.ts`, `editor/lists.ts`, `editor/editor.ts`, `ui/relocation.ts`, `src/relocation.ts`, `schema/editor.ts`, `schemaEn.test.ts`, `noteWordsMath.test.ts`, `IdbBoards`, `parse.ts`, `board.ts`, `ui/preview.ts`, `NotesStore`, `gantt.ts`, `assistant.ts`, `compile`, `translations.test.ts`, `resize.ts`, `localModels.ts`, `plan.ts`, `MathError`, `texts`, `board/shapes.ts`, `aiPanel.test.ts`, `mathEn2.test.ts`, `tutorial.ts`, `spreadsheet/editor.ts`, `h`, `blockMove.ts`, `supabase.ts`, `i18n.ts`, `schemaBlocks.ts`, `suggestions.ts`, `database.ts`, `symbolsEn.test.ts`, `vite.config.ts`, `editor.test.ts`, `spellcheck.ts`, `theme.test.ts`, `Rational`, `BoardStore`, `explainPanel.ts`, `strokes.ts`, `Sheet`, `page.ts`?**
  _High betweenness centrality (0.061) - this node is a cross-community bridge._
- **Are the 307 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `tutorialModel()`) actually correct?**
  _`Dove sono le cose` has 307 INFERRED edges - model-reasoned connections that need verification._
- **What connects `6. Glifo anche in inglese`, `8. Il pulsante ✨ con il contorno`, `Gli abbonamenti, in tutto questo` to the rest of the system?**
  _870 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `ui/settings.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05472636815920398 - nodes in this community are weakly interconnected._
- **Should `markdown.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04675081813931744 - nodes in this community are weakly interconnected._