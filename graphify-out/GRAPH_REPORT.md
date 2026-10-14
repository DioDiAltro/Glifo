# Graph Report - Glifo  (2026-10-14)

## Corpus Check
- 346 files · ~724,018 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5563 nodes · 20331 edges · 183 communities (141 shown, 42 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 680 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d89cb6c3`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- i18n.ts
- noteWords.ts
- main.ts
- compile
- sync.ts
- spec.ts
- latex.ts
- num
- graph/preview.ts
- aiPanel.test.ts
- distributions.ts
- ExplainPanel
- svg.ts
- sheet.ts
- SchemaEditor
- editor/editor.ts
- SheetEditor
- NotesStore
- numerical.ts
- arithmetic.ts
- index.ts
- engine.ts
- schema/editor.ts
- noteWordsMath.test.ts
- IdbBoards
- Parser
- board.ts
- Preview
- smoke-test.mjs
- several.ts
- gantt.ts
- study.ts
- .constructor
- assistant.ts
- logic.ts
- h
- complex.ts
- namesIn
- translations.test.ts
- resize.ts
- view3d.ts
- probability.ts
- localModels.ts
- markdown.ts
- functions.ts
- MathError
- spreadsheet/format.ts
- laplace.ts
- sidePanel.ts
- board/shapes.ts
- toolbar.ts
- SidePanel
- local.ts
- parseSchema
- parse.ts
- supabase.ts
- 20261004091555_note_condivise.sql
- graph.ts
- database.ts
- finite.ts
- graphNote.test.ts
- dependencies
- Welcome to Glifo
- spreadsheet/editor.ts
- conics.ts
- odesolve.ts
- statsShown.ts
- I modelli e le chiavi API
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
- toNode
- explainPanel.ts
- session-start.sh
- .claude/CLAUDE.md
- Il database degli account (Supabase)
- tutorial.mjs
- Abbonamenti
- topics.ts
- BoardStore
- supabase-stub.sql
- account-test.mjs
- insert.ts
- icon
- In programma
- schemaEn.test.ts
- symbolsEn.test.ts
- siteUpdate.ts
- graph/file.ts
- mathEn2.test.ts
- limits.ts
- spellcheck.ts
- editor/lists.ts
- schema/shapes.ts
- BoardOptions
- captcha.ts
- Rational
- src/relocation.ts
- Glifo
- chart.ts
- Le spiegazioni, come funzionano
- strokes.ts
- Sheet
- link.ts
- createFakeSupabase
- Dove sono le cose
- Piano per piano
- Parser
- Board
- 20261008130026_commenti.sql
- geometry.test.ts
- .constructor
- xlsx.ts
- markers.ts
- feedback.ts
- suggestions.ts
- rich
- vite
- Glifo – note per Claude
- files.ts
- site.ts
- Pt
- LlamaWorker
- Costi
- editor.test.ts
- La lavagna
- plan.ts
- aiEn.test.ts
- faq.ts
- ui/relocation.ts
- devDependencies
- tools.ts
- regions.ts
- tutorial.ts
- ui/preview.ts
- statsGraph.ts
- suggest.ts
- previewMove.test.ts
- blockMoveEditor.test.ts
- severalGraph.ts
- vectorcalc.test.ts
- MLCEngine

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 311 edges
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
- `Dove sono le cose` --references--> `fakeLlmWorker()`  [INFERRED]
  ARCHITETTURA.md → scripts/smoke-test.mjs
- `Dove sono le cose` --references--> `tutorialModel()`  [INFERRED]
  ARCHITETTURA.md → scripts/tutorial.mjs
- `Il controllo anti-robot (CAPTCHA, ottobre 2026)` --references--> `captchaToken()`  [INFERRED]
  supabase/README.md → src/account/captcha.ts
- `4. Più modelli per «Spiegami»` --references--> `webllmId()`  [INFERRED]
  GRAFICA.md → src/ai/localModels.ts
- `Come viene pubblicata` --references--> `dist()`  [INFERRED]
  README.md → src/board/shapes.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (183 total, 42 thin omitted)

### Community 0 - "i18n.ts"
Cohesion: 0.04
Nodes (60): 3. Le impostazioni divise in sezioni, DownloadedModel, Gpu, gpuF16(), MODEL_LICENSES, ModelGroup, modelVariant, AI_SERVICES (+52 more)

### Community 1 - "noteWords.ts"
Cohesion: 0.09
Nodes (35): monthOf(), MONTHS, MONTHS_EN, parseDate(), planBlock, PlanKind, planRange(), T (+27 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (115): newStrokeId(), remapGraphLines(), account, ACCOUNT_OFF, active, aiShown(), aiToggle, aiWork (+107 more)

### Community 3 - "compile"
Cohesion: 0.06
Nodes (72): integralRegion, argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot(), fieldOn() (+64 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (32): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+24 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (105): vitest, conicItems(), isConicLine(), quadricEquation(), T, fourierItems(), isFourierLine(), T (+97 more)

### Community 6 - "latex.ts"
Cohesion: 0.11
Nodes (26): ACCENT_COMMANDS, diffLatex(), DISTRIBUTION_LATEX, distributionLatex(), domainLatex(), fnLatex(), fnName(), formLatex() (+18 more)

### Community 7 - "num"
Cohesion: 0.13
Nodes (91): atIntegers(), oneFraction(), withoutAbs(), hyperbolicToExp(), oneFraction(), termTransform(), polyEx(), similarSolution() (+83 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (42): FIGURE_PALETTE, addLabel(), boxes, cameras, complexCoord(), coord(), coordinates(), drawings (+34 more)

### Community 9 - "aiPanel.test.ts"
Cohesion: 0.10
Nodes (23): definedName(), fieldText(), formulaTopic(), graphTopic(), listText(), schemaTopic(), shapeKindName(), studyOf() (+15 more)

### Community 10 - "distributions.ts"
Cohesion: 0.09
Nodes (40): addExp(), choose(), continuousQuantile(), decimals(), discreteQuantile(), Distribution, exactIntervalProbability(), factorialBig() (+32 more)

### Community 11 - "ExplainPanel"
Cohesion: 0.14
Nodes (6): inClaudeViewer(), ExplainChat, ExplainPanel, preventFocusSteal(), formulasSummary(), setup()

### Community 12 - "svg.ts"
Cohesion: 0.06
Nodes (68): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), staticGraphSvg(), chooseWindow(), chooseY(), clipLines() (+60 more)

### Community 13 - "sheet.ts"
Cohesion: 0.05
Nodes (78): numberText(), endTex(), figureText(), usesDecimalComma(), formatGauss(), OdeFunction, expSumValue(), decimalSeparator() (+70 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.10
Nodes (6): SchemaEditor, withLaneContents(), cellText(), NodeLook, serializeSchema(), tableMetrics()

### Community 15 - "editor/editor.ts"
Cohesion: 0.06
Nodes (40): description, name, private, scripts, build, dev, preview, test (+32 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (6): functionLabel(), SheetEditor, englishTyping(), serializeSheet(), sheetSize(), cloneSheet()

### Community 17 - "NotesStore"
Cohesion: 0.05
Nodes (39): adoptGuestNotes(), guestNoteCount(), isWelcome(), Deletion, DeletionLog, cleanFolderName(), Folder, FOLDER_NAME_MAX (+31 more)

### Community 18 - "numerical.ts"
Cohesion: 0.11
Nodes (49): FormatOptions, bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial() (+41 more)

### Community 19 - "arithmetic.ts"
Cohesion: 0.10
Nodes (49): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+41 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (42): b, bigops, c, calculus, fn, fr, fractions, functions (+34 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "schema/editor.ts"
Cohesion: 0.06
Nodes (53): laneOf(), alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ALIGN_NAMES (+45 more)

### Community 23 - "noteWordsMath.test.ts"
Cohesion: 0.11
Nodes (17): logicShown(), AstNode, childrenOf(), DATA, ENGLISH, englishTexts(), FUNCTIONS, isNode() (+9 more)

### Community 24 - "IdbBoards"
Cohesion: 0.08
Nodes (13): BoardBackend, done(), fromRecord(), IdbBoards, ofNote(), openBoardDatabase(), openDefault(), recordBytes() (+5 more)

### Community 25 - "Parser"
Cohesion: 0.17
Nodes (3): numericPartials(), describe(), Parser

### Community 26 - "board.ts"
Cohesion: 0.06
Nodes (50): Action, coalesced(), DOT_SIZES, EraseAction, EraserMode, Finger, HANDLE_REACH, ICON (+42 more)

### Community 28 - "smoke-test.mjs"
Cohesion: 0.15
Nodes (6): markdown-it, playwright-core, PNG_ICONS, fakeLlmWorker(), firstVisit(), plainContext

### Community 29 - "several.ts"
Cohesion: 0.14
Nodes (37): severalLimit, fractionNear(), at(), Candidate, candidates(), compiled(), constraintsOf(), COORDS (+29 more)

### Community 30 - "gantt.ts"
Cohesion: 0.05
Nodes (72): amount(), barColor(), crossings(), dateText(), dayMonth(), dayOf(), fitText(), GanttOptions (+64 more)

### Community 31 - "study.ts"
Cohesion: 0.14
Nodes (37): limit(), Asymptote, asymptoteText(), boundaries(), compiled(), cutsOf(), defined(), domainOf() (+29 more)

### Community 33 - "assistant.ts"
Cohesion: 0.09
Nodes (29): AiAnswer, AiError, AiResult, AiSettings, answerSchema(), askAi(), askCompatible(), askThroughHost() (+21 more)

### Community 34 - "logic.ts"
Cohesion: 0.11
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "h"
Cohesion: 0.11
Nodes (29): T, texts, openSignedOut(), printButton(), ShareDialogDeps, T, confirmDialog(), dialogShell() (+21 more)

### Community 36 - "complex.ts"
Cohesion: 0.05
Nodes (70): COMPLEX_FUNCTIONS, farthest(), gaussItem(), hasExponential(), inZ(), isComplexLine(), isComplexValue(), isInequality() (+62 more)

### Community 37 - "namesIn"
Cohesion: 0.11
Nodes (41): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+33 more)

### Community 38 - "translations.test.ts"
Cohesion: 0.17
Nodes (18): AstNode, calleeName(), check(), checkPair(), visit(), children(), entryPairs(), files (+10 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (24): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+16 more)

### Community 40 - "view3d.ts"
Cohesion: 0.06
Nodes (86): addMesh(), addTet(), affinePlane(), Axis, Box, centroid(), clipBy(), clipPolygon() (+78 more)

### Community 41 - "probability.ts"
Cohesion: 0.14
Nodes (22): End, CompileOptions, RelOp, ALL, complement(), endAt(), EventContext, eventSet() (+14 more)

### Community 42 - "localModels.ts"
Cohesion: 0.09
Nodes (35): @mlc-ai/web-llm, chat(), GlifoError, Gpu, load(), post(), remove(), scope (+27 more)

### Community 43 - "markdown.ts"
Cohesion: 0.07
Nodes (52): valueNode(), lineDepth(), parseBlockMath(), texHtml(), checkHtml(), checkTitle(), T, cache (+44 more)

### Community 44 - "functions.ts"
Cohesion: 0.07
Nodes (68): pick(), CellResult, EMPTY, evaluateSheet(), number(), T, addFormat(), divFormat() (+60 more)

### Community 45 - "MathError"
Cohesion: 0.12
Nodes (55): MathError, angleBetween(), asMatrix(), basisOf(), cross(), Ctx, dataOf(), determinant() (+47 more)

### Community 46 - "spreadsheet/format.ts"
Cohesion: 0.08
Nodes (48): KINDS, sheetSummary(), T, WidgetBlock, SchemaBlock, decimalsOf(), ENGLISH, englishNumber() (+40 more)

### Community 47 - "laplace.ts"
Cohesion: 0.05
Nodes (99): beyondPoles(), compiled(), E, exp(), fractionShown(), HALF, inverseLaplaceShown(), inverseRational() (+91 more)

### Community 48 - "sidePanel.ts"
Cohesion: 0.14
Nodes (17): aiSettingsOf(), SuggestionItem, cleanKatexError(), isConfidentAnswer(), symbolsInCategory(), cardPreviewTex(), formPreviewTex(), ParsedTemplate (+9 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (36): DrawAction, adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners() (+28 more)

### Community 50 - "toolbar.ts"
Cohesion: 0.16
Nodes (17): insertBlock(), wrapSelection(), ListStyleId, Action, createToolbar(), insertCode(), insertLink(), listMenu() (+9 more)

### Community 51 - "SidePanel"
Cohesion: 0.19
Nodes (5): localizeTex(), cardPreview(), displayCode(), preventFocusSteal(), SidePanel

### Community 52 - "local.ts"
Cohesion: 0.12
Nodes (14): glifoError(), LocalAbort, localErrorMessage(), localLlm, Pending, T, WorkerLike, ChatMessage (+6 more)

### Community 53 - "parseSchema"
Cohesion: 0.07
Nodes (37): schemaSummary(), svg(), GraphLook, base64(), hide(), OPEN, schemasForFile(), schemasFromFile() (+29 more)

### Community 54 - "parse.ts"
Cohesion: 0.05
Nodes (54): errorMessage(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, differentialInFraction() (+46 more)

### Community 55 - "supabase.ts"
Cohesion: 0.10
Nodes (36): @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken(), ensureSessionOf() (+28 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "graph.ts"
Cohesion: 0.09
Nodes (32): fieldInput(), isLanes(), AT_X, COMPASS, createEdgeCell(), createGraph(), drawSchema(), edgeLook() (+24 more)

### Community 58 - "database.ts"
Cohesion: 0.23
Nodes (6): createDatabase(), createUser(), databaseTests(), feedbackTests(), migrations, shareTests()

### Community 59 - "finite.ts"
Cohesion: 0.17
Nodes (28): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+20 more)

### Community 60 - "graphNote.test.ts"
Cohesion: 0.07
Nodes (38): @codemirror/language, @codemirror/state, @lezer/common, acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult (+30 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "Welcome to Glifo"
Cohesion: 0.20
Nodes (9): A few examples, Calculations and graphs, For programming too, Handy shortcuts, How to write formulas, Lists, Spell check, Try it now (+1 more)

### Community 63 - "spreadsheet/editor.ts"
Cohesion: 0.10
Nodes (44): currentCall(), Editing, MenuEntry, Move, PATHS, T, formatCode(), parseFormatCode() (+36 more)

### Community 64 - "conics.ts"
Cohesion: 0.19
Nodes (28): at(), centralCanonical(), Coefficients, coneCanonical(), conicOf(), det2(), det3(), determinant() (+20 more)

### Community 65 - "odesolve.ts"
Cohesion: 0.08
Nodes (79): addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames(), constantParticular() (+71 more)

### Community 66 - "statsShown.ts"
Cohesion: 0.17
Nodes (31): check(), correlation(), count(), covariance(), Data, dataStatistic(), deviation(), fail() (+23 more)

### Community 67 - "I modelli e le chiavi API"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), In prova sul ramo `prova` (7 ottobre 2026): Qwen3 nel browser per «Spiegami», Le idee dello studente (5 ottobre 2026)

### Community 68 - "blockMove.ts"
Cohesion: 0.16
Nodes (26): blank(), blockPlace(), closed(), closeIdx(), contentHash(), fenceClosed(), fenceName(), findBlock() (+18 more)

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
Cohesion: 0.18
Nodes (8): 4. Più modelli per «Spiegami», 5. A cosa serve la chiave dell'AI, 6. Glifo anche in inglese, 7. Via il registro dei tocchi, 8. Il pulsante ✨ con il contorno, Gli abbonamenti, in tutto questo, In che ordine, La grafica: le otto richieste del 10 ottobre 2026

### Community 73 - "schema/templates.ts"
Cohesion: 0.23
Nodes (17): SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), conceptMap(), cycle(), edge(), er() (+9 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (64): linearIn(), primitive(), verified(), linearCells(), pairUp(), atValues(), Converter, coordinates() (+56 more)

### Community 75 - "Field"
Cohesion: 0.13
Nodes (3): Field, formatPolynomial(), interpolate()

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Errore o imprevisto → nel dettaglio, 3. Serve una decisione → frasi complete, 4. Fine del compito → un solo riepilogo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "toNode"
Cohesion: 0.08
Nodes (47): close(), Definite, definiteIntegral(), exValue(), samples(), EMPTY_SCOPE, absOf(), boundsOf() (+39 more)

### Community 79 - "explainPanel.ts"
Cohesion: 0.09
Nodes (27): ExplainTone, Explanation, FollowUp, REPLY_TOKENS, MarkdownEditor, explanationMarkdown(), insertAfterBlock(), insertAfterText() (+19 more)

### Community 82 - "Il database degli account (Supabase)"
Cohesion: 0.15
Nodes (12): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il controllo anti-robot (CAPTCHA, ottobre 2026), Il database degli account (Supabase), Il progetto, Il trasloco su glifo.page (ottobre 2026) (+4 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.11
Nodes (11): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+3 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.14
Nodes (14): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+6 more)

### Community 91 - "topics.ts"
Cohesion: 0.09
Nodes (47): ATTRIBUTES, cut(), ER_SHAPES, fitLines(), flowOrder(), formulaText(), FREE_NAMES, readSheet() (+39 more)

### Community 92 - "BoardStore"
Cohesion: 0.08
Nodes (15): BoardStore, MemoryBoards, applyAccountChange(), backup(), BackupNote, backupNotes(), restoreBackup(), RestoreBoards (+7 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.10
Nodes (11): @electric-sql/pglite, device(), login(), newContext, waitFor(), b64(), CAPTCHA_TOKEN, CODE (+3 more)

### Community 97 - "insert.ts"
Cohesion: 0.10
Nodes (17): InsertOptions, toggleLinePrefix(), addPlaceholders, Placeholder, besideSchema(), BlockWidget, findWidgetBlocks(), guardBlocks() (+9 more)

### Community 98 - "icon"
Cohesion: 0.20
Nodes (4): viewSwitch, icon(), NotesPanel, NotesPanelDeps

### Community 100 - "In programma"
Cohesion: 0.25
Nodes (8): Account: i propri appunti su ogni dispositivo, anche da condividere, Idee per il futuro, In programma, La grafica: account, impostazioni, commenti, AI e lingua (chiesto il 10 ottobre 2026, se ne parla), La lavagna: idee in più, Più avanti, Schemi: idee in più, Trasloco: il sito su Cloudflare, con un dominio tutto di Glifo

### Community 101 - "schemaEn.test.ts"
Cohesion: 0.10
Nodes (25): openSchemaEditor(), SchemaEditorOptions, COLOR_NAMES, Schema, SHAPE_NAMES, Column, DEFAULT_TYPE, findForeignKeys() (+17 more)

### Community 102 - "symbolsEn.test.ts"
Cohesion: 0.14
Nodes (28): editDistance(), singular(), stem(), STOPWORDS, words(), BOTH, buildIndex(), containsPhrase() (+20 more)

### Community 103 - "siteUpdate.ts"
Cohesion: 0.18
Nodes (14): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, PartNotLoaded (+6 more)

### Community 104 - "graph/file.ts"
Cohesion: 0.09
Nodes (42): figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsForFile(), graphsFromFile(), hide(), OPEN (+34 more)

### Community 105 - "mathEn2.test.ts"
Cohesion: 0.11
Nodes (34): number(), T, testItems(), between(), chiSquareTest(), confidence(), confidenceShown(), decimals() (+26 more)

### Community 106 - "limits.ts"
Cohesion: 0.21
Nodes (17): exponentialForm(), fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), alternating() (+9 more)

### Community 107 - "spellcheck.ts"
Cohesion: 0.08
Nodes (24): @codemirror/lang-markdown, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt() (+16 more)

### Community 108 - "editor/lists.ts"
Cohesion: 0.15
Nodes (35): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+27 more)

### Community 113 - "schema/shapes.ts"
Cohesion: 0.07
Nodes (18): @maxgraph/core, laneHeadFor(), ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape (+10 more)

### Community 117 - "captcha.ts"
Cohesion: 0.19
Nodes (9): captchaToken(), loadTurnstile(), Turnstile, TURNSTILE_SCRIPT, Window, AUTH_STORAGE_KEY, TURNSTILE_SITE_KEY, accountFailure() (+1 more)

### Community 118 - "Rational"
Cohesion: 0.12
Nodes (20): Part, expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactFunction, ExactRandom (+12 more)

### Community 119 - "src/relocation.ts"
Cohesion: 0.05
Nodes (81): 1. «Cambia account», katex, accountSpace(), currentAccount(), forgetAccount(), knowsAccount(), prefixOf(), prefsKey() (+73 more)

### Community 120 - "Glifo"
Cohesion: 0.12
Nodes (16): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Domande frequenti e commenti (+8 more)

### Community 121 - "chart.ts"
Cohesion: 0.13
Nodes (28): at(), breakEven(), Point, quantity(), T, tableItems(), textLabel(), chartFrom() (+20 more)

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "strokes.ts"
Cohesion: 0.09
Nodes (37): centerOn(), copyStrokes(), cross(), handleScale(), insideLasso(), keepInside(), LASSO_SHARE, lassoed() (+29 more)

### Community 124 - "Sheet"
Cohesion: 0.06
Nodes (37): GaussLine, Definition, Line, ExactComplexScope, ConicInfo, Ode, OdeSystem, withWorkLimit() (+29 more)

### Community 125 - "link.ts"
Cohesion: 0.09
Nodes (30): accountDataFile(), PullResult, openShareDialog(), changeAccess(), changeCopy(), copy(), refreshChanged(), render() (+22 more)

### Community 128 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 129 - "Dove sono le cose"
Cohesion: 0.09
Nodes (61): Dove sono le cose, Glifo – architettura, allNames(), answerFollowUp(), bareResult(), chained(), chatContext, ChatFn (+53 more)

### Community 132 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 136 - "Board"
Cohesion: 0.11
Nodes (3): Board, Box, Stroke

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 139 - "geometry.test.ts"
Cohesion: 0.29
Nodes (6): light, pts, result(), square, text(), triangle

### Community 140 - ".constructor"
Cohesion: 0.19
Nodes (3): EditorCallbacks, searchPhrases(), insertTemplate()

### Community 141 - "xlsx.ts"
Cohesion: 0.09
Nodes (44): RFC-4180, fflate, tablesNote(), csvCell(), csvDelimiter(), csvNumbers(), csvToSheet(), digitsOf() (+36 more)

### Community 142 - "markers.ts"
Cohesion: 0.12
Nodes (33): ListStyle, bullet(), bulletGroup(), childMarker(), column(), firstMarker(), label(), lettersMarker() (+25 more)

### Community 143 - "feedback.ts"
Cohesion: 0.08
Nodes (41): SUPABASE_KEY, SUPABASE_URL, Site, commentDate(), commentItem(), COMMENTS_MAX, CommentsDeps, CommentsError (+33 more)

### Community 144 - "suggestions.ts"
Cohesion: 0.20
Nodes (7): EditorMathContext, expand(), preferredIndex(), SuggestionController, commandNames(), parseTemplate(), templateText()

### Community 146 - "rich"
Cohesion: 0.15
Nodes (16): SyncStatus, rich(), AccountButton, accountSection(), AccountSectionDeps, confirmAccountDeletion(), messageOf(), openLoginDialog() (+8 more)

### Community 154 - "vite"
Cohesion: 0.33
Nodes (4): vite, minutes, postMessage(), started

### Community 156 - "Glifo – note per Claude"
Cohesion: 0.25
Nodes (8): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Regole, sqlite()

### Community 157 - "files.ts"
Cohesion: 0.18
Nodes (16): canWriteFilesDirectly(), downloadBlob(), downloadText(), fileNameFor(), FsWindow, isAbort(), mdTypes(), OpenedFile (+8 more)

### Community 158 - "site.ts"
Cohesion: 0.22
Nodes (6): vite-plugin-pwa, accountOffMessage(), T, defineFor(), MAIN_BRANCH, webllmModels

### Community 159 - "Pt"
Cohesion: 0.17
Nodes (7): clampZoom(), MoveAction, pressureOf(), validView(), Transform, EllipseFit, Pt

### Community 160 - "LlamaWorker"
Cohesion: 0.21
Nodes (8): Promemoria per lo studente, 2. La pagina dei commenti, tipo FAQ, Commenti di chi prova Glifo, constructor(), LlamaWorker, Commenti di chi prova Glifo, page(), site()

### Community 161 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 162 - "editor.test.ts"
Cohesion: 0.08
Nodes (23): tabOutOfMath(), templateInsertion(), commandTokenAt(), isInCode(), mathContextAt(), openMathBefore(), buildDecorations(), clearAllPlaceholders() (+15 more)

### Community 163 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 166 - "plan.ts"
Cohesion: 0.12
Nodes (20): SheetEditorOptions, Snapshot, NumberStyle, shownStyle(), SheetModel, cellText(), columnRole(), columnsOf() (+12 more)

### Community 167 - "aiEn.test.ts"
Cohesion: 0.13
Nodes (20): EXPLAIN_TONES, explainTarget, readSchema(), schemaTitle(), targetAt(), SubjectKind, subjectsIn(), THEOREM_START (+12 more)

### Community 168 - "faq.ts"
Cohesion: 0.13
Nodes (19): setLangForTests(), copyLink(), FaqGroup, faqGroups(), FaqQuestion, faqSection, kbd(), list() (+11 more)

### Community 169 - "ui/relocation.ts"
Cohesion: 0.16
Nodes (17): moveDayLabel(), BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark(), downloadButton(), NEW_HOST (+9 more)

### Community 170 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

### Community 171 - "tools.ts"
Cohesion: 0.09
Nodes (15): ExplainEvents, ExplainStep, ALL_TOOLS, callOf(), checkTool, FormulaCheck, Identities, looseJson() (+7 more)

### Community 172 - "regions.ts"
Cohesion: 0.16
Nodes (20): constantIntegrand(), depth(), inequalityMargin(), LayeredSolid, Multiple, planeMargin(), PlanePart, radiusOf() (+12 more)

### Community 173 - "tutorial.ts"
Cohesion: 0.14
Nodes (14): helpButton, openGuide(), HINT_MS, markTutorialSeen(), openTutorial(), show(), richText(), showTutorialHint() (+6 more)

### Community 174 - "ui/preview.ts"
Cohesion: 0.16
Nodes (16): BlockKind, MoveDir, hydrateSheets(), T, BLOCK_NAMES, blockHiddenMessage(), blockKindOf(), blockMovedMessage() (+8 more)

### Community 175 - "statsGraph.ts"
Cohesion: 0.20
Nodes (15): classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX, Line, number(), pmfBars() (+7 more)

### Community 176 - "suggest.ts"
Cohesion: 0.19
Nodes (14): Text, normalizeText(), IndexedEntry, SearchResult, getIndex(), isSubsequence(), keysOf(), MatchKind (+6 more)

### Community 177 - "previewMove.test.ts"
Cohesion: 0.19
Nodes (6): GraphLabels, remapLineKeys(), renameGraphScope(), renameScopeKeys(), PreviewCallbacks, setup()

### Community 178 - "blockMoveEditor.test.ts"
Cohesion: 0.20
Nodes (9): @codemirror/commands, blockMoved, blockMoves(), blockMoveTransaction(), LineMap, BlockMove, MoveFailure, fences() (+1 more)

### Community 179 - "severalGraph.ts"
Cohesion: 0.35
Nodes (10): criticalLine(), isSeveralLine(), named(), severalItems(), surface(), T, bounded(), extremaOf() (+2 more)

### Community 180 - "vectorcalc.test.ts"
Cohesion: 0.32
Nodes (6): circle, light, result(), sphere, tex(), text()

## Knowledge Gaps
- **870 isolated node(s):** `session-start.sh script`, `name`, `private`, `version`, `description` (+865 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1194 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **42 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `texts` connect `h` to `i18n.ts`, `Dove sono le cose`, `noteWords.ts`, `main.ts`, `compile`, `spec.ts`, `latex.ts`, `graph/preview.ts`, `aiPanel.test.ts`, `distributions.ts`, `svg.ts`, `sheet.ts`, `xlsx.ts`, `editor/editor.ts`, `feedback.ts`, `NotesStore`, `numerical.ts`, `arithmetic.ts`, `index.ts`, `rich`, `schema/editor.ts`, `board.ts`, `several.ts`, `gantt.ts`, `study.ts`, `site.ts`, `assistant.ts`, `logic.ts`, `files.ts`, `complex.ts`, `namesIn`, `plan.ts`, `resize.ts`, `faq.ts`, `probability.ts`, `localModels.ts`, `tools.ts`, `functions.ts`, `MathError`, `spreadsheet/format.ts`, `statsGraph.ts`, `laplace.ts`, `markdown.ts`, `ui/preview.ts`, `severalGraph.ts`, `local.ts`, `parseSchema`, `parse.ts`, `supabase.ts`, `sidePanel.ts`, `toolbar.ts`, `finite.ts`, `graphNote.test.ts`, `spreadsheet/editor.ts`, `conics.ts`, `odesolve.ts`, `statsShown.ts`, `schema/templates.ts`, `symbolic.ts`, `toNode`, `explainPanel.ts`, `ui/relocation.ts`, `topics.ts`, `BoardStore`, `schemaEn.test.ts`, `siteUpdate.ts`, `graph/file.ts`, `mathEn2.test.ts`, `tutorial.ts`, `spellcheck.ts`, `editor/lists.ts`, `src/relocation.ts`, `chart.ts`, `link.ts`?**
  _High betweenness centrality (0.132) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `Dove sono le cose` to `i18n.ts`, `noteWords.ts`, `main.ts`, `compile`, `spec.ts`, `num`, `graph/preview.ts`, `aiPanel.test.ts`, `ExplainPanel`, `svg.ts`, `sheet.ts`, `SchemaEditor`, `SheetEditor`, `NotesStore`, `numerical.ts`, `arithmetic.ts`, `schema/editor.ts`, `noteWordsMath.test.ts`, `Parser`, `board.ts`, `Preview`, `smoke-test.mjs`, `several.ts`, `gantt.ts`, `study.ts`, `assistant.ts`, `h`, `complex.ts`, `namesIn`, `view3d.ts`, `localModels.ts`, `markdown.ts`, `functions.ts`, `MathError`, `spreadsheet/format.ts`, `laplace.ts`, `sidePanel.ts`, `board/shapes.ts`, `toolbar.ts`, `SidePanel`, `local.ts`, `parseSchema`, `parse.ts`, `supabase.ts`, `graph.ts`, `finite.ts`, `graphNote.test.ts`, `spreadsheet/editor.ts`, `odesolve.ts`, `blockMove.ts`, `symbolic.ts`, `toNode`, `explainPanel.ts`, `tutorial.mjs`, `topics.ts`, `BoardStore`, `insert.ts`, `siteUpdate.ts`, `graph/file.ts`, `mathEn2.test.ts`, `limits.ts`, `schema/shapes.ts`, `Rational`, `src/relocation.ts`, `chart.ts`, `strokes.ts`, `Sheet`, `Board`, `.constructor`, `xlsx.ts`, `feedback.ts`, `rich`, `site.ts`, `Pt`, `plan.ts`, `aiEn.test.ts`, `faq.ts`, `tutorial.ts`, `ui/preview.ts`, `previewMove.test.ts`, `blockMoveEditor.test.ts`, `severalGraph.ts`?**
  _High betweenness centrality (0.110) - this node is a cross-community bridge._
- **Why does `vitest` connect `spec.ts` to `i18n.ts`, `Dove sono le cose`, `main.ts`, `noteWords.ts`, `num`, `aiPanel.test.ts`, `distributions.ts`, `geometry.test.ts`, `svg.ts`, `xlsx.ts`, `markers.ts`, `editor/editor.ts`, `feedback.ts`, `NotesStore`, `schema/editor.ts`, `noteWordsMath.test.ts`, `IdbBoards`, `board.ts`, `site.ts`, `gantt.ts`, `assistant.ts`, `editor.test.ts`, `namesIn`, `plan.ts`, `aiEn.test.ts`, `faq.ts`, `view3d.ts`, `resize.ts`, `localModels.ts`, `ui/relocation.ts`, `MathError`, `markdown.ts`, `laplace.ts`, `ui/preview.ts`, `board/shapes.ts`, `blockMoveEditor.test.ts`, `previewMove.test.ts`, `local.ts`, `parseSchema`, `parse.ts`, `supabase.ts`, `sidePanel.ts`, `theme.test.ts`, `database.ts`, `vectorcalc.test.ts`, `graphNote.test.ts`, `spreadsheet/editor.ts`, `translations.test.ts`, `blockMove.ts`, `explainPanel.ts`, `topics.ts`, `BoardStore`, `insert.ts`, `schemaEn.test.ts`, `symbolsEn.test.ts`, `siteUpdate.ts`, `graph/file.ts`, `mathEn2.test.ts`, `tutorial.ts`, `spellcheck.ts`, `editor/lists.ts`, `captcha.ts`, `Rational`, `src/relocation.ts`, `chart.ts`, `strokes.ts`, `Sheet`, `link.ts`?**
  _High betweenness centrality (0.065) - this node is a cross-community bridge._
- **Are the 310 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `tutorialModel()`) actually correct?**
  _`Dove sono le cose` has 310 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `name`, `private` to the rest of the system?**
  _870 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `i18n.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04232922732362822 - nodes in this community are weakly interconnected._
- **Should `noteWords.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08906882591093117 - nodes in this community are weakly interconnected._