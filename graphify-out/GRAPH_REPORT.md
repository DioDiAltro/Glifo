# Graph Report - matherdown  (2026-10-12)

## Corpus Check
- 321 files · ~619,285 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5120 nodes · 18528 edges · 148 communities (111 shown, 37 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 621 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `020184aa`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- touchlog.ts
- parse.ts
- main.ts
- compile
- sync.ts
- spec.ts
- SheetEvaluator
- primitive.ts
- graph/preview.ts
- Dove sono le cose
- plan.ts
- editor/lists.ts
- svg.ts
- parseSchema
- SchemaEditor
- Board
- SheetEditor
- editor/editor.ts
- numerical.ts
- arithmetic.ts
- index.ts
- engine.ts
- topics.ts
- graph.ts
- store.ts
- MathError
- markers.ts
- assistant.ts
- blockMoveEditor.test.ts
- view3d.ts
- gantt.ts
- markdown.ts
- touchLog
- spell.test.ts
- logic.ts
- feedback.ts
- complex.ts
- namesIn
- num
- resize.ts
- Stroke
- client.ts
- several.ts
- study.ts
- functions.ts
- finite.ts
- NotesStore
- spellcheck
- Rational
- board/shapes.ts
- FoldersStore
- sidePanel.ts
- schema/preview.ts
- supabase.ts
- explainChat.ts
- schemaTools.test.ts
- 20261004091555_note_condivise.sql
- ui/preview.ts
- database.ts
- odesolve.ts
- Glifo
- dependencies
- boardTouchLog.test.ts
- toLatex
- h
- Piano per piano
- spreadsheet/editor.ts
- blockMove.ts
- smoke-test.mjs
- Benvenuto in Glifo
- compilerOptions
- relocation-test.mjs
- dictionaries.ts
- toolbar.ts
- symbolic.ts
- PreviewCallbacks
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- distributions.ts
- session-start.sh
- .claude/CLAUDE.md
- scripts
- tutorial.mjs
- Abbonamenti
- explainPanel.ts
- Costi
- supabase-stub.sql
- account-test.mjs
- sheet.ts
- SpellClient
- page.ts
- linsys.ts
- renderMarkdown
- siteUpdate.ts
- Preview
- board.ts
- localModels.ts
- xlsx.ts
- render/lists.ts
- schema/shapes.ts
- Il database degli account (Supabase)
- Glifo – note per Claude
- ExplainPanel
- conics.ts
- planPreview.ts
- Le spiegazioni, come funzionano
- strokes.ts
- Sheet
- sql.ts
- ref_node_fs
- createFakeSupabase
- graph/file.ts
- schemaBlocks.ts
- formula.ts
- 20261008130026_commenti.sql
- vitest
- BoardOptions
- devDependencies
- restore.test.ts

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 286 edges
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
- `Dove sono le cose` --references--> `fakeLlmWorker()`  [INFERRED]
  ARCHITETTURA.md → scripts/smoke-test.mjs
- `Dove sono le cose` --references--> `WidgetKind`  [INFERRED]
  ARCHITETTURA.md → src/editor/schemaBlocks.ts
- `Dove sono le cose` --references--> `ConicElements`  [INFERRED]
  ARCHITETTURA.md → src/math/conics.ts
- `Dove sono le cose` --references--> `texts()`  [INFERRED]
  ARCHITETTURA.md → tests/boardTouchLog.test.ts
- `Funzionalità` --references--> `k()`  [INFERRED]
  README.md → src/math/numerical.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (148 total, 37 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.14
Nodes (16): at(), browserStore, clip(), KINDS, LOG_KEY, Moves, MOVES_MAX, pointerDetail() (+8 more)

### Community 1 - "parse.ts"
Cohesion: 0.08
Nodes (40): hasWord(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe() (+32 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (112): newStrokeId(), remapGraphLines(), account, ACCOUNT_OFF, active, aiShown(), aiToggle, aiWork (+104 more)

### Community 3 - "compile"
Cohesion: 0.05
Nodes (92): integralRegion, LayeredSolid, argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot() (+84 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (32): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+24 more)

### Community 5 - "spec.ts"
Cohesion: 0.04
Nodes (110): quadricEquation(), fourierItems(), isFourierLine(), onlyComplex(), isTestLine(), number(), testItems(), constantIntegrand() (+102 more)

### Community 6 - "SheetEvaluator"
Cohesion: 0.13
Nodes (18): sheetToCsv(), evaluateSheet(), SheetEvaluator, hide(), OPEN, sheetsForFile(), sheetsFromFile(), unhide() (+10 more)

### Community 7 - "primitive.ts"
Cohesion: 0.17
Nodes (58): degree(), algebraic(), bigGcd(), byParts(), candidates(), canon(), combineLogs(), compareKeys() (+50 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (40): FIGURE_PALETTE, addLabel(), boxes, cameras, complexCoord(), coord(), drawings, drawnViews (+32 more)

### Community 9 - "Dove sono le cose"
Cohesion: 0.06
Nodes (69): Dove sono le cose, Glifo – architettura, allNames(), answerFollowUp(), bareResult(), CHAT_SUBJECT, chatContext, ChatFn (+61 more)

### Community 10 - "plan.ts"
Cohesion: 0.09
Nodes (41): at(), breakEven(), dataLine(), Point, quantity(), tableItems(), textLabel(), chartData (+33 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.16
Nodes (31): continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext(), isBlank() (+23 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (56): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), dataWindow(), domainEdge() (+48 more)

### Community 13 - "parseSchema"
Cohesion: 0.11
Nodes (24): schemaSummary(), svg(), findSchemaBlock(), findSchemaBlocks(), OpenFence, schemaBlockAtLine(), schemaBlockText(), base64() (+16 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.10
Nodes (5): isLanes(), SchemaEditor, withLaneContents(), createEdgeCell(), serializeSchema()

### Community 15 - "Board"
Cohesion: 0.08
Nodes (6): Board, clampZoom(), loadPrefs(), penErases(), pressureOf(), validView()

### Community 16 - "SheetEditor"
Cohesion: 0.07
Nodes (10): currentCall(), MenuEntry, rangeLabel(), SheetEditor, decimalsOf(), sameFormat(), serializeSheet(), CellRange (+2 more)

### Community 17 - "editor/editor.ts"
Cohesion: 0.03
Nodes (73): description, name, private, type, version, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands (+65 more)

### Community 18 - "numerical.ts"
Cohesion: 0.11
Nodes (51): isNumericalLine(), numericalItems(), FormatOptions, bisection(), cholesky(), condition(), derivative(), exactPolynomial() (+43 more)

### Community 19 - "arithmetic.ts"
Cohesion: 0.06
Nodes (90): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+82 more)

### Community 20 - "index.ts"
Cohesion: 0.05
Nodes (65): editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex() (+57 more)

### Community 21 - "engine.ts"
Cohesion: 0.22
Nodes (9): @farscrl/hunspell-wasm, capitalize(), COMMON_FIXES, ELISIONS, inGlossary(), lower(), SpellEngine, GLOSSARY (+1 more)

### Community 22 - "topics.ts"
Cohesion: 0.08
Nodes (42): @codemirror/lang-markdown, ATTRIBUTES, count(), cut(), definedName(), ER_SHAPES, fieldText(), fitLines() (+34 more)

### Community 23 - "graph.ts"
Cohesion: 0.10
Nodes (30): fieldInput(), AT_X, cellText(), COMPASS, createGraph(), drawSchema(), edgeLook(), edgeStyle() (+22 more)

### Community 24 - "store.ts"
Cohesion: 0.06
Nodes (18): fake-indexeddb, BoardBackend, BoardData, BoardStore, done(), fromRecord(), IdbBoards, MemoryBoards (+10 more)

### Community 25 - "MathError"
Cohesion: 0.11
Nodes (61): MathError, angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, dataOf() (+53 more)

### Community 26 - "markers.ts"
Cohesion: 0.20
Nodes (20): bullet(), childMarker(), firstMarker(), label(), lettersMarker(), MarkerKind, MarkerStyle, nextMarker() (+12 more)

### Community 27 - "assistant.ts"
Cohesion: 0.09
Nodes (30): AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible(), askThroughHost() (+22 more)

### Community 28 - "blockMoveEditor.test.ts"
Cohesion: 0.20
Nodes (16): blockMoveTransaction(), placeChart(), contentHash(), fenceName(), MOVABLE, parseBlocks(), findFencedBlocks(), findSheetBlock() (+8 more)

### Community 29 - "view3d.ts"
Cohesion: 0.06
Nodes (84): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+76 more)

### Community 30 - "gantt.ts"
Cohesion: 0.06
Nodes (71): amount(), barColor(), crossings(), dateText(), dayOf(), fitText(), GanttOptions, ganttSvg() (+63 more)

### Community 31 - "markdown.ts"
Cohesion: 0.10
Nodes (36): parseBlockMath(), texHtml(), dataRange(), tableChartKind(), moveAttrs(), checkHtml(), checkTitle(), cache (+28 more)

### Community 32 - "touchLog"
Cohesion: 0.31
Nodes (3): movesLine(), seconds(), touchLog

### Community 33 - "spell.test.ts"
Cohesion: 0.13
Nodes (14): misspelledMark, refreshSpelling, setTarget, SKIP, SpellTarget, wordsToCheck(), findWords(), isProseCase() (+6 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "feedback.ts"
Cohesion: 0.08
Nodes (41): 2. La pagina dei commenti, tipo FAQ, vite-plugin-pwa, SUPABASE_KEY, SUPABASE_URL, feedbackButton, openComments(), accountOffMessage(), Site (+33 more)

### Community 36 - "complex.ts"
Cohesion: 0.05
Nodes (77): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexLine(), isComplexValue() (+69 more)

### Community 37 - "namesIn"
Cohesion: 0.13
Nodes (37): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+29 more)

### Community 38 - "num"
Cohesion: 0.10
Nodes (71): monomial(), absOf(), atIntegers(), close(), definite(), fourierProblem, fourierShown(), isTrig() (+63 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 41 - "client.ts"
Cohesion: 0.21
Nodes (8): Backend, pageBackend(), SpellClientOptions, workerBackend(), WorkerUnavailable, SpellLanguage, SpellRequest, handle

### Community 42 - "several.ts"
Cohesion: 0.07
Nodes (71): criticalLine(), isSeveralLine(), named(), severalItems(), surface(), numShown(), EMPTY_SCOPE, Piece (+63 more)

### Community 43 - "study.ts"
Cohesion: 0.13
Nodes (37): names(), STUDY_GRAPH, studyItems(), limit(), breaks(), periodOf(), Asymptote, compiled() (+29 more)

### Community 44 - "functions.ts"
Cohesion: 0.08
Nodes (66): EMPTY, number(), addFormat(), divFormat(), GENERAL, MAX_DECIMALS, most(), mulFormat() (+58 more)

### Community 45 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 46 - "NotesStore"
Cohesion: 0.06
Nodes (72): accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf() (+64 more)

### Community 47 - "spellcheck"
Cohesion: 0.21
Nodes (8): spellcheck(), close(), misspelledAt(), openAt(), replace(), tooltipView(), SpellChecker, SpellcheckOptions

### Community 48 - "Rational"
Cohesion: 0.06
Nodes (52): evaluateExactComplex(), exactSqrt(), unavailable(), End, expSum, Family, CompileOptions, bigGcd() (+44 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (35): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+27 more)

### Community 50 - "FoldersStore"
Cohesion: 0.08
Nodes (15): cleanFolderName(), Folder, FolderGroup, FoldersStore, groupByFolder(), loadClosedFolders(), sameName(), saveClosedFolders() (+7 more)

### Community 51 - "sidePanel.ts"
Cohesion: 0.11
Nodes (20): SuggestionItem, cleanKatexError(), renderTex(), isConfidentAnswer(), CATEGORIES, symbolsInCategory(), cardPreviewTex(), formPreviewTex() (+12 more)

### Community 52 - "schema/preview.ts"
Cohesion: 0.21
Nodes (12): remapLineKeys(), renameGraphScope(), renameScopeKeys(), draw(), drawCached(), drawn, errorHtml(), fill() (+4 more)

### Community 53 - "supabase.ts"
Cohesion: 0.06
Nodes (52): 1. «Cambia account», 5. A cosa serve la chiave dell'AI, 6. Glifo anche in inglese, La grafica: le otto richieste del 10 ottobre 2026, @supabase/supabase-js, captchaToken(), loadTurnstile(), Turnstile (+44 more)

### Community 54 - "explainChat.ts"
Cohesion: 0.15
Nodes (14): ExplainTone, FollowUp, REPLY_TOKENS, Settings, AI_NEWS_TITLE, AI_WORKING_TITLE, aiActivity, AiWork (+6 more)

### Community 55 - "schemaTools.test.ts"
Cohesion: 0.12
Nodes (26): laneOf(), alignBoxes(), Alignment, Box, distributeBoxes(), Position, cellHtml(), crc32() (+18 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "ui/preview.ts"
Cohesion: 0.26
Nodes (9): BlockKind, MoveDir, hydrateSheets(), BLOCK_NAMES, blockKindOf(), MOVABLE_BLOCKS, moveButtonsHtml(), PATHS (+1 more)

### Community 58 - "database.ts"
Cohesion: 0.21
Nodes (7): @electric-sql/pglite, createDatabase(), createUser(), databaseTests(), feedbackTests(), migrations, shareTests()

### Community 59 - "odesolve.ts"
Cohesion: 0.09
Nodes (66): linearIn(), addWave(), arrange(), cauchy(), compiled(), constantNames(), equalities(), expOf() (+58 more)

### Community 60 - "Glifo"
Cohesion: 0.13
Nodes (15): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Commenti, Compatibilità con VS Code, Condividere una nota con un link (+7 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "boardTouchLog.test.ts"
Cohesion: 0.20
Nodes (8): isSaved(), LOG_MAX_LINES, LogStore, SavedLog, clock(), memoryStore(), newLog(), texts()

### Community 63 - "toLatex"
Cohesion: 0.13
Nodes (26): ACCENT_COMMANDS, COMPLEX_FUNCTIONS, diffLatex(), DISTRIBUTION_LATEX, distributionLatex(), domainLatex(), fnLatex(), fnName() (+18 more)

### Community 64 - "h"
Cohesion: 0.05
Nodes (69): 3. Le impostazioni divise in sezioni, SyncStatus, EXPLAIN_TONES, board, helpButton, openGuide(), viewSwitch, moveDayLabel() (+61 more)

### Community 65 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 66 - "spreadsheet/editor.ts"
Cohesion: 0.10
Nodes (49): Editing, Move, openSheetEditor(), PATHS, CellResult, Format, formatCode(), formatValue() (+41 more)

### Community 67 - "blockMove.ts"
Cohesion: 0.15
Nodes (21): blockMoved, LineMap, blank(), BlockMove, blockPlace(), closed(), closeIdx(), fenceClosed() (+13 more)

### Community 68 - "smoke-test.mjs"
Cohesion: 0.14
Nodes (9): markdown-it, playwright-core, vite, fakeLlmWorker(), firstVisit(), plainContext, minutes, postMessage() (+1 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "relocation-test.mjs"
Cohesion: 0.18
Nodes (7): AFTER_MOVE, ids, newBrowser(), NOTICE_DAY, out, serve(), TYPES

### Community 72 - "dictionaries.ts"
Cohesion: 0.20
Nodes (5): download(), fetchDictionary(), FILES, DictionaryData, createSpellService()

### Community 73 - "toolbar.ts"
Cohesion: 0.20
Nodes (14): insertBlock(), Action, createToolbar(), insertCode(), insertLink(), listMenu(), listStyle(), MenuItem (+6 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (55): primitive(), verified(), atValues(), Converter, coordinates(), decimalText(), definiteParts(), definiteValue() (+47 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Errore o imprevisto → nel dettaglio, 3. Serve una decisione → frasi complete, 4. Fine del compito → un solo riepilogo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.05
Nodes (59): ALIGN, ARROW_NAMES, AT_ICONS, AT_NAMES, BASE_PRESETS, BIG_ARROWS, DB_PRESETS, Direction (+51 more)

### Community 79 - "distributions.ts"
Cohesion: 0.07
Nodes (59): addExp(), choose(), continuousQuantile(), discreteQuantile(), Distribution, exactIntervalProbability(), expSumValue(), factorialBig() (+51 more)

### Community 82 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 83 - "tutorial.mjs"
Cohesion: 0.12
Nodes (10): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+2 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.08
Nodes (24): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Deciso (5 ottobre 2026), Deciso (5 ottobre 2026) (+16 more)

### Community 91 - "explainPanel.ts"
Cohesion: 0.06
Nodes (51): @codemirror/language, explainTarget, Explanation, acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult (+43 more)

### Community 92 - "Costi"
Cohesion: 0.22
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 96 - "account-test.mjs"
Cohesion: 0.11
Nodes (10): device(), login(), newContext, waitFor(), b64(), CAPTCHA_TOKEN, CODE, GOOGLE_CODE (+2 more)

### Community 97 - "sheet.ts"
Cohesion: 0.06
Nodes (57): OdeFunction, ExactFunction, characteristicPolynomial(), Field, interpolate(), Lin, NUMERICAL, bracketParts() (+49 more)

### Community 100 - "page.ts"
Cohesion: 0.06
Nodes (46): katex, accountDataFile(), PullResult, openShareDialog(), changeAccess(), changeCopy(), copy(), refreshChanged() (+38 more)

### Community 101 - "linsys.ts"
Cohesion: 0.06
Nodes (82): areaFor(), decimalSeparator(), Digits, formatNumber(), formatRational(), fromNumber(), fromRational(), SUPERSCRIPT (+74 more)

### Community 102 - "renderMarkdown"
Cohesion: 0.29
Nodes (6): configurePurify(), renderMarkdown(), hints(), preview(), preview(), dom()

### Community 103 - "siteUpdate.ts"
Cohesion: 0.15
Nodes (17): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, PartNotLoaded (+9 more)

### Community 106 - "board.ts"
Cohesion: 0.06
Nodes (54): Action, ACTION_NAMES, coalesced(), DOT_SIZES, DrawAction, EraseAction, EraserMode, Finger (+46 more)

### Community 107 - "localModels.ts"
Cohesion: 0.09
Nodes (30): 4. Più modelli per «Spiegami», @mlc-ai/web-llm, chat(), GlifoError, Gpu, load(), post(), remove() (+22 more)

### Community 108 - "xlsx.ts"
Cohesion: 0.10
Nodes (36): RFC-4180, fflate, csvDelimiter(), csvToSheet(), field(), italian(), parseCsv(), splitRecords() (+28 more)

### Community 110 - "render/lists.ts"
Cohesion: 0.23
Nodes (15): Item, ListStyle, bulletGroup(), ListLine, Marker, sameList(), alignInside(), asciiTrim() (+7 more)

### Community 113 - "schema/shapes.ts"
Cohesion: 0.08
Nodes (17): @maxgraph/core, ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape (+9 more)

### Community 116 - "Il database degli account (Supabase)"
Cohesion: 0.15
Nodes (12): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il controllo anti-robot (CAPTCHA, ottobre 2026), Il database degli account (Supabase), Il progetto, Il trasloco su glifo.page (ottobre 2026) (+4 more)

### Community 117 - "Glifo – note per Claude"
Cohesion: 0.11
Nodes (18): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole (+10 more)

### Community 118 - "ExplainPanel"
Cohesion: 0.14
Nodes (6): modelName(), ExplainChat, ExplainPanel, preventFocusSteal(), formulasSummary(), setup()

### Community 119 - "conics.ts"
Cohesion: 0.16
Nodes (31): conicItems(), isConicLine(), at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo (+23 more)

### Community 121 - "planPreview.ts"
Cohesion: 0.16
Nodes (18): planName(), loadDialect(), svgToPng(), canWriteFilesDirectly(), downloadBlob(), downloadText(), fileNameFor(), FsWindow (+10 more)

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "strokes.ts"
Cohesion: 0.09
Nodes (38): centerOn(), copyStrokes(), cross(), handleScale(), IDENTITY, insideLasso(), keepInside(), LASSO_SHARE (+30 more)

### Community 124 - "Sheet"
Cohesion: 0.07
Nodes (29): ExactComplexScope, Ode, withWorkLimit(), FiniteContext, FormattedResult, chiSquareTest(), InferenceContext, Mat (+21 more)

### Community 125 - "sql.ts"
Cohesion: 0.15
Nodes (20): parseTable(), splitTable(), Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey() (+12 more)

### Community 128 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 129 - "graph/file.ts"
Cohesion: 0.10
Nodes (37): figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsForFile(), graphsFromFile(), hide(), OPEN (+29 more)

### Community 131 - "schemaBlocks.ts"
Cohesion: 0.11
Nodes (19): toggleLinePrefix(), applyListStyle(), besideSchema(), BlockWidget, findWidgetBlocks(), guardBlocks(), KINDS, schemaBlockRanges() (+11 more)

### Community 133 - "formula.ts"
Cohesion: 0.13
Nodes (18): BinOp, COMPARE, ERRORS_BY_LENGTH, formulaBody(), FormulaError, OPERATORS, parseFormula(), Parser (+10 more)

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 140 - "vitest"
Cohesion: 0.06
Nodes (45): vitest, staticGraphSvg(), chooseWindow(), specFor(), chooseBox(), formulaGraph(), GraphItem, parseGraph() (+37 more)

### Community 144 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

### Community 145 - "restore.test.ts"
Cohesion: 0.24
Nodes (9): BackupNote, backupNotes(), restoreBackup(), RestoreBoards, Restored, restoredMessage(), time(), backup (+1 more)

## Knowledge Gaps
- **699 isolated node(s):** `6. Glifo anche in inglese`, `Condividere una nota con un link`, `Commenti`, `Provarlo sul tuo computer`, `Assistente AI` (+694 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 981 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **37 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `touchlog.ts`, `graph/file.ts`, `main.ts`, `schemaBlocks.ts`, `compile`, `spec.ts`, `parse.ts`, `primitive.ts`, `graph/preview.ts`, `SheetEvaluator`, `plan.ts`, `formula.ts`, `svg.ts`, `vitest`, `SchemaEditor`, `Board`, `SheetEditor`, `editor/editor.ts`, `numerical.ts`, `arithmetic.ts`, `topics.ts`, `graph.ts`, `store.ts`, `MathError`, `assistant.ts`, `blockMoveEditor.test.ts`, `view3d.ts`, `gantt.ts`, `markdown.ts`, `touchLog`, `logic.ts`, `feedback.ts`, `complex.ts`, `namesIn`, `num`, `Stroke`, `several.ts`, `study.ts`, `functions.ts`, `finite.ts`, `NotesStore`, `Rational`, `board/shapes.ts`, `sidePanel.ts`, `schema/preview.ts`, `supabase.ts`, `explainChat.ts`, `schemaTools.test.ts`, `ui/preview.ts`, `odesolve.ts`, `boardTouchLog.test.ts`, `h`, `spreadsheet/editor.ts`, `blockMove.ts`, `smoke-test.mjs`, `toolbar.ts`, `symbolic.ts`, `PreviewCallbacks`, `distributions.ts`, `explainPanel.ts`, `sheet.ts`, `linsys.ts`, `renderMarkdown`, `siteUpdate.ts`, `Preview`, `board.ts`, `localModels.ts`, `xlsx.ts`, `schema/shapes.ts`, `ExplainPanel`, `conics.ts`, `planPreview.ts`, `strokes.ts`, `Sheet`, `sql.ts`?**
  _High betweenness centrality (0.181) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `touchlog.ts`, `compile`, `schemaBlocks.ts`, `Dove sono le cose`, `plan.ts`, `editor/lists.ts`, `svg.ts`, `parseSchema`, `editor/editor.ts`, `restore.test.ts`, `arithmetic.ts`, `index.ts`, `topics.ts`, `store.ts`, `MathError`, `markers.ts`, `assistant.ts`, `blockMoveEditor.test.ts`, `view3d.ts`, `gantt.ts`, `spell.test.ts`, `feedback.ts`, `num`, `resize.ts`, `NotesStore`, `Rational`, `board/shapes.ts`, `FoldersStore`, `sidePanel.ts`, `schema/preview.ts`, `supabase.ts`, `explainChat.ts`, `schemaTools.test.ts`, `ui/preview.ts`, `database.ts`, `boardTouchLog.test.ts`, `toLatex`, `h`, `spreadsheet/editor.ts`, `distributions.ts`, `explainPanel.ts`, `page.ts`, `renderMarkdown`, `siteUpdate.ts`, `board.ts`, `localModels.ts`, `xlsx.ts`, `strokes.ts`, `Sheet`, `sql.ts`?**
  _High betweenness centrality (0.119) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `main.ts`, `graph/preview.ts`, `SchemaEditor`, `Board`, `SheetEditor`, `topics.ts`, `graph.ts`, `markdown.ts`, `spell.test.ts`, `feedback.ts`, `resize.ts`, `Stroke`, `spellcheck`, `FoldersStore`, `sidePanel.ts`, `explainChat.ts`, `ui/preview.ts`, `spreadsheet/editor.ts`, `toolbar.ts`, `PreviewCallbacks`, `schema/editor.ts`, `explainPanel.ts`, `page.ts`, `board.ts`, `localModels.ts`, `ExplainPanel`, `planPreview.ts`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **Are the 285 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `adoptGuestNotes()`) actually correct?**
  _`Dove sono le cose` has 285 INFERRED edges - model-reasoned connections that need verification._
- **What connects `6. Glifo anche in inglese`, `Condividere una nota con un link`, `Commenti` to the rest of the system?**
  _699 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `touchlog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._
- **Should `parse.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07646048109965636 - nodes in this community are weakly interconnected._