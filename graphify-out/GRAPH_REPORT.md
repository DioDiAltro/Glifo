# Graph Report - Glifo  (2026-10-14)

## Corpus Check
- 346 files · ~725,504 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5563 nodes · 20356 edges · 157 communities (117 shown, 40 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 693 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9598c966`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- ui/settings.ts
- vitest
- main.ts
- compile
- sync.ts
- spec.ts
- src/relocation.ts
- primitive.ts
- graph/preview.ts
- Dove sono le cose
- distributions.ts
- page.ts
- svg.ts
- schemaTools.test.ts
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
- store.ts
- Parser
- ink.ts
- ui/preview.ts
- strokes.ts
- several.ts
- gantt.ts
- study.ts
- parseGraph
- assistant.ts
- logic.ts
- linsys.ts
- complex.ts
- namesIn
- translations.test.ts
- resize.ts
- view3d.ts
- downloadText
- localModels.ts
- escapeHtml
- functions.ts
- MathError
- topics.ts
- Board
- sidePanel.ts
- board/shapes.ts
- scripts
- SidePanel
- explainPanel.ts
- toLatex
- num
- ExplainChat
- 20261004091555_note_condivise.sql
- graph.ts
- database.ts
- finite.ts
- ExplainPanel
- dependencies
- Welcome to Glifo
- spreadsheet/editor.ts
- conics.ts
- odesolve.ts
- sheet.ts
- schema/blocks.ts
- blockMove.ts
- Benvenuto in Glifo
- compilerOptions
- relocation-test.mjs
- La grafica: le otto richieste del 10 ottobre 2026
- plan.ts
- symbolic.ts
- explainPanel.test.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- NodeLook
- session-start.sh
- .claude/CLAUDE.md
- Il database degli account (Supabase)
- tutorial.mjs
- Abbonamenti
- planPreview.ts
- supabase-stub.sql
- account-test.mjs
- toolbar.ts
- FoldersStore
- In programma
- sql.ts
- symbolsEn.test.ts
- siteUpdate.ts
- graph/file.ts
- AiPanel
- spellcheck.ts
- schema/shapes.ts
- supabase.ts
- Rational
- tools.ts
- calcResults.ts
- Le spiegazioni, come funzionano
- board.ts
- Sheet
- openShareDialog
- createFakeSupabase
- Piano per piano
- Parser
- Stroke
- 20261008130026_commenti.sql
- usesDecimalComma
- xlsx.ts
- editor/lists.ts
- i18n.ts
- smoke-test.mjs
- vite
- Glifo – note per Claude
- files.ts
- MarkdownEditor
- LlamaWorker
- Costi
- graphNote.test.ts
- La lavagna
- schema/templates.ts

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 324 edges
2. `MathError` - 151 edges
3. `Sheet` - 147 edges
4. `num()` - 145 edges
5. `h()` - 136 edges
6. `MathNode` - 131 edges
7. `texts` - 124 edges
8. `mul()` - 124 edges
9. `Board` - 117 edges
10. `compile()` - 116 edges

## Surprising Connections (you probably didn't know these)
- `Dove sono le cose` --references--> `fakeLlmWorker()`  [INFERRED]
  ARCHITETTURA.md → scripts/smoke-test.mjs
- `Dove sono le cose` --references--> `tutorialModel()`  [INFERRED]
  ARCHITETTURA.md → scripts/tutorial.mjs
- `Dove sono le cose` --references--> `ConicElements`  [INFERRED]
  ARCHITETTURA.md → src/math/conics.ts
- `Come viene pubblicata` --references--> `dist()`  [INFERRED]
  README.md → src/board/shapes.ts
- `Trasloco: il sito su Cloudflare, con un dominio tutto di Glifo` --references--> `dist()`  [INFERRED]
  ROADMAP.md → src/board/shapes.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (157 total, 40 thin omitted)

### Community 0 - "ui/settings.ts"
Cohesion: 0.04
Nodes (58): 3. Le impostazioni divise in sezioni, SyncStatus, DEFAULT_LOCAL_MODEL, DownloadedModel, gpuF16(), MODEL_LICENSES, ModelGroup, LANGUAGES (+50 more)

### Community 1 - "vitest"
Cohesion: 0.06
Nodes (55): vitest, setGraphLabels(), graphImagesFor(), monthOf(), MONTHS, MONTHS_EN, parseDate(), planBlock (+47 more)

### Community 2 - "main.ts"
Cohesion: 0.03
Nodes (123): 1. «Cambia account», setCurrentAccount(), BoardStore, newStrokeId(), addToGraphBlock(), account, ACCOUNT_OFF, accountButton (+115 more)

### Community 3 - "compile"
Cohesion: 0.05
Nodes (83): criticalLine(), named(), severalItems(), surface(), T, areaFor(), constantValue(), argumentOrder() (+75 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (31): AccountSync, withLock(), Account, EMPTY_STATE, FolderChange, FolderRow, isEmpty(), iso() (+23 more)

### Community 5 - "spec.ts"
Cohesion: 0.04
Nodes (126): conicItems(), isConicLine(), quadricEquation(), T, fourierItems(), isFourierLine(), T, isComplexLine() (+118 more)

### Community 6 - "src/relocation.ts"
Cohesion: 0.06
Nodes (48): MemoryBoards, isRelocationPackage(), moveDayLabel(), NEW_ORIGIN, OLD_ORIGIN, openedForRelocation(), RECEIVE_URL, receiveFromOldSite() (+40 more)

### Community 7 - "primitive.ts"
Cohesion: 0.15
Nodes (54): degree(), pscale(), algebraic(), bigGcd(), byParts(), candidates(), canon(), combineLogs() (+46 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (42): addLabel(), boxes, cameras, complexCoord(), containing(), coord(), coordinates(), drawings (+34 more)

### Community 9 - "Dove sono le cose"
Cohesion: 0.08
Nodes (62): Dove sono le cose, Glifo – architettura, allNames(), answerFollowUp(), bareResult(), chained(), chatContext, ChatFn (+54 more)

### Community 10 - "distributions.ts"
Cohesion: 0.07
Nodes (62): addExp(), choose(), continuousQuantile(), decimals(), discreteQuantile(), exactIntervalProbability(), factorialBig(), FAMILIES (+54 more)

### Community 11 - "page.ts"
Cohesion: 0.10
Nodes (23): isShareToken(), parseSharedNote(), readSharedNote(), SharedNote, ShareReadError, tokenFromHash(), body, load() (+15 more)

### Community 12 - "svg.ts"
Cohesion: 0.08
Nodes (58): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), dataWindow(), decimalText() (+50 more)

### Community 13 - "schemaTools.test.ts"
Cohesion: 0.15
Nodes (17): laneOf(), alignBoxes(), Alignment, Box, distributeBoxes(), Position, base64(), crc32() (+9 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.09
Nodes (11): fieldInput(), isLanes(), SchemaEditor, withLaneContents(), nodeLook(), nodeStyle(), EdgeLook, laneNames() (+3 more)

### Community 15 - "editor/editor.ts"
Cohesion: 0.06
Nodes (42): description, name, private, type, version, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/language-data (+34 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (7): functionLabel(), SheetEditor, englishTyping(), serializeSheet(), CellRange, clearRange(), cloneSheet()

### Community 17 - "NotesStore"
Cohesion: 0.06
Nodes (54): accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf() (+46 more)

### Community 18 - "numerical.ts"
Cohesion: 0.07
Nodes (64): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Domande frequenti e commenti (+56 more)

### Community 19 - "arithmetic.ts"
Cohesion: 0.06
Nodes (95): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+87 more)

### Community 20 - "index.ts"
Cohesion: 0.06
Nodes (44): b, bigops, c, calculus, fn, fr, fractions, functions (+36 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "schema/editor.ts"
Cohesion: 0.05
Nodes (67): schemaSummary(), ALIGN, ALIGN_NAMES, ARROW_NAMES, AT_ICONS, AT_NAMES, BASE_PRESETS, BIG_ARROWS (+59 more)

### Community 23 - "noteWordsMath.test.ts"
Cohesion: 0.07
Nodes (29): katex, BLOCKS, FROM_ENGLISH, FUNCTIONS, functionWordPairs(), GRAPH_KEY_FORMS, GRAPH_KEY_LINE, GRAPH_KEYS (+21 more)

### Community 24 - "store.ts"
Cohesion: 0.08
Nodes (17): BoardBackend, BoardChange, BoardData, done(), fromRecord(), IdbBoards, ofNote(), openBoardDatabase() (+9 more)

### Community 25 - "Parser"
Cohesion: 0.17
Nodes (3): describe(), Parser, slashText()

### Community 26 - "ink.ts"
Cohesion: 0.12
Nodes (20): perfect-freehand, Prefs, BOARD_PALETTES, BoardPalette, BoardTheme, highlightName(), inkName(), mid() (+12 more)

### Community 27 - "ui/preview.ts"
Cohesion: 0.09
Nodes (21): GraphLabels, BlockKind, fill(), hydrateSchemas(), hydrateSheets(), T, BLOCK_NAMES, blockHiddenMessage() (+13 more)

### Community 28 - "strokes.ts"
Cohesion: 0.23
Nodes (13): between(), capsuleSpan(), circleSpan(), eraserGrowth(), eraseStroke(), intersect(), linearSpan(), pieceLength() (+5 more)

### Community 29 - "several.ts"
Cohesion: 0.06
Nodes (67): close(), Definite, definiteIntegral(), exValue(), samples(), EMPTY_SCOPE, Piece, LimitValue (+59 more)

### Community 30 - "gantt.ts"
Cohesion: 0.06
Nodes (67): amount(), barColor(), crossings(), dateText(), dayMonth(), dayOf(), fitText(), GanttOptions (+59 more)

### Community 31 - "study.ts"
Cohesion: 0.14
Nodes (37): limit(), Asymptote, asymptoteText(), boundaries(), compiled(), cutsOf(), defined(), domainOf() (+29 more)

### Community 32 - "parseGraph"
Cohesion: 0.11
Nodes (23): staticGraphSvg(), chooseWindow(), specFor(), chooseBox(), parseGraph(), DrawOptions, graphSvg(), PALETTES (+15 more)

### Community 33 - "assistant.ts"
Cohesion: 0.13
Nodes (25): AiAnswer, AiError, AiSettings, answerSchema(), askAi(), askCompatible(), askThroughHost(), capitalized() (+17 more)

### Community 34 - "logic.ts"
Cohesion: 0.11
Nodes (30): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+22 more)

### Community 35 - "linsys.ts"
Cohesion: 0.05
Nodes (104): multipleLabel(), exponentialForm(), fracTex(), fracText(), nearFraction(), piMultiple(), surd(), decimalSeparator() (+96 more)

### Community 36 - "complex.ts"
Cohesion: 0.06
Nodes (67): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexValue(), isInequality() (+59 more)

### Community 37 - "namesIn"
Cohesion: 0.11
Nodes (40): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+32 more)

### Community 38 - "translations.test.ts"
Cohesion: 0.17
Nodes (18): AstNode, calleeName(), check(), checkPair(), visit(), children(), entryPairs(), files (+10 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (24): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+16 more)

### Community 40 - "view3d.ts"
Cohesion: 0.06
Nodes (86): addMesh(), addTet(), affinePlane(), Axis, Box, centroid(), clipBy(), clipPolygon() (+78 more)

### Community 41 - "downloadText"
Cohesion: 0.20
Nodes (6): loadDialect(), SchemaEditorOptions, Schema, downloadBlob(), downloadText(), fileNameFor()

### Community 42 - "localModels.ts"
Cohesion: 0.07
Nodes (40): @mlc-ai/web-llm, chat(), GlifoError, Gpu, load(), post(), remove(), scope (+32 more)

### Community 43 - "escapeHtml"
Cohesion: 0.23
Nodes (17): texHtml(), checkHtml(), checkTitle(), T, cache, cleanKatexError(), escapeHtml(), renderTex() (+9 more)

### Community 44 - "functions.ts"
Cohesion: 0.05
Nodes (89): pick(), CellResult, EMPTY, evaluateSheet(), number(), T, addFormat(), decimalsOf() (+81 more)

### Community 45 - "MathError"
Cohesion: 0.10
Nodes (61): MathError, angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, degreesText() (+53 more)

### Community 46 - "topics.ts"
Cohesion: 0.08
Nodes (59): ATTRIBUTES, cut(), ER_SHAPES, fitLines(), flowOrder(), formulaText(), FREE_NAMES, readSheet() (+51 more)

### Community 47 - "Board"
Cohesion: 0.10
Nodes (8): Board, clampZoom(), loadPrefs(), pressureOf(), sizeChoice(), validView(), SizeChoice, Pt

### Community 48 - "sidePanel.ts"
Cohesion: 0.16
Nodes (15): AiResult, isConfidentAnswer(), symbolsInCategory(), cardPreviewTex(), formPreviewTex(), ParsedTemplate, parseTemplate(), PLACEHOLDER_TEX (+7 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (36): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+28 more)

### Community 50 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 51 - "SidePanel"
Cohesion: 0.18
Nodes (6): localizeTex(), SymbolForm, cardPreview(), displayCode(), preventFocusSteal(), SidePanel

### Community 52 - "explainPanel.ts"
Cohesion: 0.07
Nodes (43): ExplainTone, Explanation, FollowUp, REPLY_TOKENS, definedName(), fieldText(), formulaTopic(), graphTopic() (+35 more)

### Community 53 - "toLatex"
Cohesion: 0.03
Nodes (92): typedSliderValue(), errorMessage(), ACCENT_COMMANDS, diffLatex(), DISTRIBUTION_LATEX, distributionLatex(), domainLatex(), fnLatex() (+84 more)

### Community 54 - "num"
Cohesion: 0.11
Nodes (77): monomial(), absOf(), atIntegers(), boundsOf(), close(), definite(), fourierProblem, fourierShown() (+69 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "graph.ts"
Cohesion: 0.12
Nodes (29): AT_X, cellHtml(), cellText(), COMPASS, createEdgeCell(), createGraph(), drawSchema(), edgeLook() (+21 more)

### Community 58 - "database.ts"
Cohesion: 0.23
Nodes (6): createDatabase(), createUser(), databaseTests(), feedbackTests(), migrations, shareTests()

### Community 59 - "finite.ts"
Cohesion: 0.17
Nodes (28): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+20 more)

### Community 61 - "dependencies"
Cohesion: 0.05
Nodes (36): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+28 more)

### Community 62 - "Welcome to Glifo"
Cohesion: 0.20
Nodes (9): A few examples, Calculations and graphs, For programming too, Handy shortcuts, How to write formulas, Lists, Spell check, Try it now (+1 more)

### Community 63 - "spreadsheet/editor.ts"
Cohesion: 0.09
Nodes (47): openSheet(), saveSheetBlock(), tablesNote(), currentCall(), Editing, MenuEntry, Move, PATHS (+39 more)

### Community 64 - "conics.ts"
Cohesion: 0.17
Nodes (30): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+22 more)

### Community 65 - "odesolve.ts"
Cohesion: 0.09
Nodes (65): linearIn(), addWave(), arrange(), cauchy(), compiled(), constantNames(), equalities(), firstOrderShape() (+57 more)

### Community 66 - "sheet.ts"
Cohesion: 0.06
Nodes (60): expSumValue(), ExactFunction, characteristicPolynomial(), dataOf(), Field, formatPolynomial(), interpolate(), Lin (+52 more)

### Community 67 - "schema/blocks.ts"
Cohesion: 0.15
Nodes (18): svg(), markdownForFile(), openSchema(), saveSchemaBlock(), tools, blockWord(), findSchemaBlock(), findSchemaBlocks() (+10 more)

### Community 68 - "blockMove.ts"
Cohesion: 0.11
Nodes (35): @codemirror/commands, blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove, blockPlace() (+27 more)

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

### Community 73 - "plan.ts"
Cohesion: 0.07
Nodes (51): at(), breakEven(), Point, quantity(), T, tableItems(), textLabel(), chartData (+43 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (56): primitive(), verified(), atValues(), Converter, coordinates(), decimalText(), definiteParts(), definiteValue() (+48 more)

### Community 75 - "explainPanel.test.ts"
Cohesion: 0.12
Nodes (11): glifoError(), LocalAbort, localErrorMessage(), localLlm, Pending, ChatMessage, ChatOptions, LoadProgress (+3 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Errore o imprevisto → nel dettaglio, 3. Serve una decisione → frasi complete, 4. Fine del compito → un solo riepilogo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 82 - "Il database degli account (Supabase)"
Cohesion: 0.14
Nodes (13): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il controllo anti-robot (CAPTCHA, ottobre 2026), Il database degli account (Supabase), Il progetto, Il trasloco su glifo.page (ottobre 2026) (+5 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.11
Nodes (11): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+3 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.11
Nodes (19): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Deciso (5 ottobre 2026), Fonti (controllate il 4 ottobre 2026) (+11 more)

### Community 92 - "planPreview.ts"
Cohesion: 0.23
Nodes (7): labelHtml(), readPlan(), ganttWidth(), PlanView, T, GraphLook, Palette

### Community 96 - "account-test.mjs"
Cohesion: 0.10
Nodes (11): @electric-sql/pglite, device(), login(), newContext, waitFor(), b64(), CAPTCHA_TOKEN, CODE (+3 more)

### Community 97 - "toolbar.ts"
Cohesion: 0.07
Nodes (32): insertBlock(), InsertOptions, toggleLinePrefix(), wrapSelection(), ListStyleId, besideSchema(), BlockWidget, findWidgetBlocks() (+24 more)

### Community 98 - "FoldersStore"
Cohesion: 0.07
Nodes (20): cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder(), loadClosedFolders(), RemoteFolder (+12 more)

### Community 100 - "In programma"
Cohesion: 0.25
Nodes (8): Account: i propri appunti su ogni dispositivo, anche da condividere, Idee per il futuro, In programma, La grafica: account, impostazioni, commenti, AI e lingua (chiesto il 10 ottobre 2026, se ne parla), La lavagna: idee in più, Più avanti, Schemi: idee in più, Trasloco: il sito su Cloudflare, con un dominio tutto di Glifo

### Community 101 - "sql.ts"
Cohesion: 0.16
Nodes (19): parseTable(), Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote() (+11 more)

### Community 102 - "symbolsEn.test.ts"
Cohesion: 0.10
Nodes (42): SuggestionItem, editDistance(), normalizeText(), singular(), stem(), STOPWORDS, words(), BOTH (+34 more)

### Community 103 - "siteUpdate.ts"
Cohesion: 0.18
Nodes (16): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, loadPart() (+8 more)

### Community 104 - "graph/file.ts"
Cohesion: 0.10
Nodes (33): FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), graphsForFile(), graphsFromFile(), hide(), OPEN (+25 more)

### Community 105 - "AiPanel"
Cohesion: 0.29
Nodes (5): NoteSubject, AiPanel, graphLabel(), kindName(), texInline()

### Community 107 - "spellcheck.ts"
Cohesion: 0.08
Nodes (23): misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt(), openAt() (+15 more)

### Community 113 - "schema/shapes.ts"
Cohesion: 0.08
Nodes (17): @maxgraph/core, laneHeadFor(), ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape (+9 more)

### Community 117 - "supabase.ts"
Cohesion: 0.08
Nodes (41): @supabase/supabase-js, captchaToken(), loadTurnstile(), Turnstile, TURNSTILE_SCRIPT, Window, AUTH_STORAGE_KEY, TURNSTILE_SITE_KEY (+33 more)

### Community 118 - "Rational"
Cohesion: 0.06
Nodes (53): Part, EMPTY_COMPLEX_SCOPE, End, expSum, Family, Interval, CompileOptions, bigGcd() (+45 more)

### Community 119 - "tools.ts"
Cohesion: 0.09
Nodes (17): ExplainEvents, ExplainStep, ALL_TOOLS, callOf(), checkTool, FormulaCheck, Identities, looseJson() (+9 more)

### Community 120 - "calcResults.ts"
Cohesion: 0.05
Nodes (56): @codemirror/language, @codemirror/state, @codemirror/view, @lezer/common, explainTarget, readSchema(), schemaTitle(), acceptCalcResult() (+48 more)

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "board.ts"
Cohesion: 0.06
Nodes (48): Action, coalesced(), DOT_SIZES, EraserMode, Finger, HANDLE_REACH, ICON, LassoAction (+40 more)

### Community 124 - "Sheet"
Cohesion: 0.08
Nodes (26): ExactComplexScope, Ode, withWorkLimit(), FiniteContext, FormattedResult, chiSquareTest(), InferenceContext, Mat (+18 more)

### Community 125 - "openShareDialog"
Cohesion: 0.13
Nodes (19): accountDataFile(), PullResult, openShareDialog(), changeAccess(), changeCopy(), copy(), refreshChanged(), render() (+11 more)

### Community 128 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 132 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 136 - "Stroke"
Cohesion: 0.10
Nodes (6): BoardOptions, DrawAction, EraseAction, pointsOf(), Step, Stroke

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 139 - "usesDecimalComma"
Cohesion: 0.08
Nodes (34): numberText(), FieldContext, valueLabel(), number(), T, testItems(), endTex(), Range (+26 more)

### Community 141 - "xlsx.ts"
Cohesion: 0.07
Nodes (56): RFC-4180, fflate, csvCell(), csvDelimiter(), csvNumbers(), csvToSheet(), digitsOf(), field() (+48 more)

### Community 142 - "editor/lists.ts"
Cohesion: 0.08
Nodes (67): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+59 more)

### Community 143 - "i18n.ts"
Cohesion: 0.03
Nodes (114): SUPABASE_KEY, SUPABASE_URL, browserLanguages(), byLang(), dateLocale(), Entry, lang, rich() (+106 more)

### Community 146 - "smoke-test.mjs"
Cohesion: 0.15
Nodes (6): markdown-it, playwright-core, PNG_ICONS, fakeLlmWorker(), firstVisit(), plainContext

### Community 154 - "vite"
Cohesion: 0.33
Nodes (4): vite, minutes, postMessage(), started

### Community 156 - "Glifo – note per Claude"
Cohesion: 0.25
Nodes (8): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Regole, sqlite()

### Community 157 - "files.ts"
Cohesion: 0.14
Nodes (21): cache, capability(), ClaudeRuntime, hostDownloads, HostError, inClaudeViewer(), ModelTier, runtime() (+13 more)

### Community 159 - "MarkdownEditor"
Cohesion: 0.09
Nodes (12): closeMathBlockOnEnter(), EditorCallbacks, MarkdownEditor, searchPhrases(), insertTemplate(), templateInsertion(), EditorMathContext, expand() (+4 more)

### Community 160 - "LlamaWorker"
Cohesion: 0.21
Nodes (8): Promemoria per lo studente, 2. La pagina dei commenti, tipo FAQ, Commenti di chi prova Glifo, constructor(), LlamaWorker, Commenti di chi prova Glifo, page(), site()

### Community 161 - "Costi"
Cohesion: 0.22
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 162 - "graphNote.test.ts"
Cohesion: 0.07
Nodes (28): @codemirror/lang-markdown, tabOutOfMath(), commandTokenAt(), isInCode(), mathContextAt(), openMathBefore(), addPlaceholders, buildDecorations() (+20 more)

### Community 163 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 172 - "schema/templates.ts"
Cohesion: 0.19
Nodes (19): DEFAULT_EDGE, SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), conceptMap(), cycle(), edge() (+11 more)

## Knowledge Gaps
- **870 isolated node(s):** `Condividere una nota con un link`, `Domande frequenti e commenti`, `Provarlo sul tuo computer`, `Assistente AI`, `Spiegami (in prova)` (+865 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1190 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **40 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `texts` connect `i18n.ts` to `ui/settings.ts`, `vitest`, `main.ts`, `compile`, `spec.ts`, `src/relocation.ts`, `graph/preview.ts`, `Dove sono le cose`, `distributions.ts`, `usesDecimalComma`, `svg.ts`, `schemaTools.test.ts`, `editor/lists.ts`, `editor/editor.ts`, `page.ts`, `xlsx.ts`, `numerical.ts`, `arithmetic.ts`, `NotesStore`, `index.ts`, `schema/editor.ts`, `ink.ts`, `ui/preview.ts`, `several.ts`, `gantt.ts`, `study.ts`, `files.ts`, `assistant.ts`, `logic.ts`, `linsys.ts`, `complex.ts`, `namesIn`, `resize.ts`, `localModels.ts`, `escapeHtml`, `functions.ts`, `MathError`, `topics.ts`, `schema/templates.ts`, `sidePanel.ts`, `explainPanel.ts`, `toLatex`, `num`, `finite.ts`, `spreadsheet/editor.ts`, `conics.ts`, `odesolve.ts`, `sheet.ts`, `schema/blocks.ts`, `plan.ts`, `symbolic.ts`, `planPreview.ts`, `toolbar.ts`, `FoldersStore`, `sql.ts`, `siteUpdate.ts`, `graph/file.ts`, `spellcheck.ts`, `supabase.ts`, `Rational`, `tools.ts`, `calcResults.ts`, `board.ts`?**
  _High betweenness centrality (0.132) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `Dove sono le cose` to `ui/settings.ts`, `vitest`, `main.ts`, `compile`, `spec.ts`, `src/relocation.ts`, `primitive.ts`, `Stroke`, `graph/preview.ts`, `distributions.ts`, `usesDecimalComma`, `svg.ts`, `schemaTools.test.ts`, `SchemaEditor`, `i18n.ts`, `xlsx.ts`, `NotesStore`, `smoke-test.mjs`, `arithmetic.ts`, `numerical.ts`, `SheetEditor`, `schema/editor.ts`, `Parser`, `ink.ts`, `ui/preview.ts`, `strokes.ts`, `files.ts`, `gantt.ts`, `MarkdownEditor`, `parseGraph`, `assistant.ts`, `several.ts`, `linsys.ts`, `complex.ts`, `namesIn`, `logic.ts`, `study.ts`, `view3d.ts`, `localModels.ts`, `escapeHtml`, `functions.ts`, `MathError`, `topics.ts`, `Board`, `sidePanel.ts`, `board/shapes.ts`, `SidePanel`, `explainPanel.ts`, `toLatex`, `num`, `ExplainChat`, `graph.ts`, `finite.ts`, `ExplainPanel`, `spreadsheet/editor.ts`, `conics.ts`, `odesolve.ts`, `sheet.ts`, `schema/blocks.ts`, `blockMove.ts`, `plan.ts`, `symbolic.ts`, `explainPanel.test.ts`, `tutorial.mjs`, `planPreview.ts`, `toolbar.ts`, `siteUpdate.ts`, `graph/file.ts`, `AiPanel`, `schema/shapes.ts`, `supabase.ts`, `calcResults.ts`, `board.ts`, `Sheet`?**
  _High betweenness centrality (0.093) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `ui/settings.ts`, `spec.ts`, `src/relocation.ts`, `Dove sono le cose`, `distributions.ts`, `page.ts`, `svg.ts`, `schemaTools.test.ts`, `editor/lists.ts`, `editor/editor.ts`, `i18n.ts`, `NotesStore`, `xlsx.ts`, `schema/editor.ts`, `noteWordsMath.test.ts`, `store.ts`, `ink.ts`, `strokes.ts`, `gantt.ts`, `MarkdownEditor`, `parseGraph`, `assistant.ts`, `graphNote.test.ts`, `linsys.ts`, `namesIn`, `translations.test.ts`, `resize.ts`, `view3d.ts`, `localModels.ts`, `MathError`, `topics.ts`, `sidePanel.ts`, `board/shapes.ts`, `explainPanel.ts`, `toLatex`, `num`, `database.ts`, `spreadsheet/editor.ts`, `schema/blocks.ts`, `blockMove.ts`, `plan.ts`, `explainPanel.test.ts`, `toolbar.ts`, `FoldersStore`, `sql.ts`, `symbolsEn.test.ts`, `siteUpdate.ts`, `spellcheck.ts`, `supabase.ts`, `Rational`, `calcResults.ts`, `board.ts`, `Sheet`, `openShareDialog`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **Are the 323 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `tutorialModel()`) actually correct?**
  _`Dove sono le cose` has 323 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Condividere una nota con un link`, `Domande frequenti e commenti`, `Provarlo sul tuo computer` to the rest of the system?**
  _870 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `ui/settings.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.040313549832026875 - nodes in this community are weakly interconnected._
- **Should `vitest` be split into smaller, more focused modules?**
  _Cohesion score 0.060528559249786874 - nodes in this community are weakly interconnected._