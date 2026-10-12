# Graph Report - matherdown  (2026-10-12)

## Corpus Check
- 326 files · ~623,033 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5170 nodes · 18629 edges · 155 communities (120 shown, 35 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 618 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `eec2d3be`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- touchlog.ts
- parse.ts
- main.ts
- compile
- sync.ts
- spec.ts
- .constructor
- primitive.ts
- graph/preview.ts
- explain.ts
- chart.ts
- editor/lists.ts
- svg.ts
- schema/preview.ts
- SchemaEditor
- Board
- SheetEditor
- sidePanel.ts
- numerical.ts
- arithmetic.ts
- index.ts
- client.ts
- i18n.ts
- graph.ts
- store.ts
- MathError
- markers.ts
- assistant.ts
- markdown.ts
- page.ts
- gantt.ts
- renderMarkdown
- view3d.ts
- graphNote.test.ts
- logic.ts
- tutorial.ts
- complex.ts
- namesIn
- translations.test.ts
- resize.ts
- engine.ts
- schemaBlocks
- several.ts
- study.ts
- functions.ts
- finite.ts
- src/relocation.ts
- board.ts
- Rational
- board/shapes.ts
- FoldersStore
- SidePanel
- inference.ts
- supabase.ts
- render/lists.ts
- probability.ts
- 20261004091555_note_condivise.sql
- blockMoveEditor.test.ts
- database.ts
- num
- Glifo
- dependencies
- ui/preview.ts
- toLatex
- h
- Piano per piano
- spreadsheet/editor.ts
- blockMove.ts
- smoke-test.mjs
- Benvenuto in Glifo
- compilerOptions
- relocation-test.mjs
- deploy.test.ts
- toolbar.ts
- symbolic.ts
- SpellClient
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- distributions.ts
- session-start.sh
- .claude/CLAUDE.md
- Dove sono le cose
- tutorial.mjs
- Abbonamenti
- calcResults.ts
- Costi
- supabase-stub.sql
- account-test.mjs
- sheet.ts
- aiPanel.test.ts
- NotesStore
- linsys.ts
- search.ts
- siteUpdate.ts
- Preview
- spreadsheet/file.ts
- ink.ts
- explainPanel.ts
- topics.ts
- schema/shapes.ts
- Il database degli account (Supabase)
- Glifo – note per Claude
- ExplainPanel
- conics.ts
- schema/templates.ts
- files.ts
- Le spiegazioni, come funzionano
- strokes.ts
- Sheet
- sql.ts
- createFakeSupabase
- graph/file.ts
- listCommands.test.ts
- MarkdownEditor
- Parser
- touchLog
- 20261008130026_commenti.sql
- vitest
- schemaTools.test.ts
- plan.ts
- devDependencies
- restore.test.ts
- Distribution
- boardTouchLog.test.ts

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 278 edges
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
- `Dove sono le cose` --references--> `ConicElements`  [INFERRED]
  ARCHITETTURA.md → src/math/conics.ts
- `Dove sono le cose` --references--> `texts()`  [INFERRED]
  ARCHITETTURA.md → tests/boardTouchLog.test.ts
- `Funzionalità` --references--> `k()`  [INFERRED]
  README.md → src/math/numerical.ts
- `Come viene pubblicata` --references--> `dist()`  [INFERRED]
  README.md → src/board/shapes.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (155 total, 35 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.15
Nodes (16): at(), browserStore, clip(), KINDS, LOG_KEY, Moves, MOVES_MAX, pointerDetail() (+8 more)

### Community 1 - "parse.ts"
Cohesion: 0.07
Nodes (41): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe(), differentialInFraction() (+33 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (106): graphsForFile(), hide(), account, ACCOUNT_OFF, active, aiShown(), aiToggle, aiWork (+98 more)

### Community 3 - "compile"
Cohesion: 0.05
Nodes (92): typedSliderValue(), argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot(), fieldOn() (+84 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (32): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+24 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (104): conicItems(), isConicLine(), quadricEquation(), isFourierLine(), onlyComplex(), isTestLine(), constantIntegrand(), depth() (+96 more)

### Community 6 - ".constructor"
Cohesion: 0.14
Nodes (3): loadPrefs(), highlightName(), inkName()

### Community 7 - "primitive.ts"
Cohesion: 0.15
Nodes (61): algebraic(), bigGcd(), byParts(), candidates(), canon(), combineLogs(), compareKeys(), distribute() (+53 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (43): FIGURE_PALETTE, addLabel(), boxes, cameras, complexCoord(), containing(), coord(), drawings (+35 more)

### Community 9 - "explain.ts"
Cohesion: 0.05
Nodes (73): 4. Più modelli per «Spiegami», 5. A cosa serve la chiave dell'AI, 6. Glifo anche in inglese, La grafica: le otto richieste del 10 ottobre 2026, allNames(), answerFollowUp(), bareResult(), CHAT_SUBJECT (+65 more)

### Community 10 - "chart.ts"
Cohesion: 0.14
Nodes (26): at(), breakEven(), dataLine(), dataRange(), Point, quantity(), tableItems(), textLabel() (+18 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.24
Nodes (24): continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext(), isBlank() (+16 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (57): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseWindow(), chooseY(), clipLines(), dataWindow() (+49 more)

### Community 13 - "schema/preview.ts"
Cohesion: 0.17
Nodes (13): svg(), renameGraphScope(), renameScopeKeys(), draw(), drawCached(), drawn, errorHtml(), fill() (+5 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.10
Nodes (6): isLanes(), loadDialect(), SchemaEditor, withLaneContents(), serializeSchema(), fileNameFor()

### Community 15 - "Board"
Cohesion: 0.10
Nodes (6): Board, clampZoom(), Step, validView(), BoardTheme, Stroke

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (6): rangeLabel(), SheetEditor, CellRange, clearRange(), cloneSheet(), setCell()

### Community 17 - "sidePanel.ts"
Cohesion: 0.05
Nodes (47): @codemirror/view, @lezer/common, tabOutOfMath(), InsertOptions, templateInsertion(), CODE_NODES, CommandToken, commandTokenAt() (+39 more)

### Community 18 - "numerical.ts"
Cohesion: 0.11
Nodes (51): isNumericalLine(), numericalItems(), FormatOptions, bisection(), cholesky(), condition(), derivative(), exactPolynomial() (+43 more)

### Community 19 - "arithmetic.ts"
Cohesion: 0.07
Nodes (71): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+63 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (42): b, bigops, c, calculus, fn, fr, fractions, functions (+34 more)

### Community 21 - "client.ts"
Cohesion: 0.12
Nodes (13): Backend, pageBackend(), SpellClientOptions, workerBackend(), WorkerUnavailable, download(), fetchDictionary(), FILES (+5 more)

### Community 22 - "i18n.ts"
Cohesion: 0.18
Nodes (19): browserLang(), browserLanguages(), byLang(), chooseLang(), dateLocale(), detectLang(), Entry, isLang() (+11 more)

### Community 23 - "graph.ts"
Cohesion: 0.11
Nodes (27): AT_X, cellHtml(), cellText(), COMPASS, createEdgeCell(), createGraph(), drawSchema(), edgeLook() (+19 more)

### Community 24 - "store.ts"
Cohesion: 0.06
Nodes (19): BoardOptions, BoardBackend, BoardChange, BoardData, BoardStore, done(), fromRecord(), IdbBoards (+11 more)

### Community 25 - "MathError"
Cohesion: 0.10
Nodes (64): MathError, angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, dataOf() (+56 more)

### Community 26 - "markers.ts"
Cohesion: 0.19
Nodes (22): bullet(), childMarker(), column(), firstMarker(), label(), lettersMarker(), MarkerKind, MarkerStyle (+14 more)

### Community 27 - "assistant.ts"
Cohesion: 0.09
Nodes (29): @anthropic-ai/sdk, AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible() (+21 more)

### Community 28 - "markdown.ts"
Cohesion: 0.04
Nodes (68): description, name, private, scripts, build, dev, preview, test (+60 more)

### Community 29 - "page.ts"
Cohesion: 0.05
Nodes (61): SUPABASE_KEY, SUPABASE_URL, accountDataFile(), PullResult, render(), isShareToken(), parseSharedNote(), readSharedNote() (+53 more)

### Community 30 - "gantt.ts"
Cohesion: 0.06
Nodes (69): amount(), barColor(), crossings(), dateText(), dayOf(), fitText(), GanttOptions, ganttSvg() (+61 more)

### Community 31 - "renderMarkdown"
Cohesion: 0.29
Nodes (6): configurePurify(), renderMarkdown(), hints(), preview(), preview(), dom()

### Community 32 - "view3d.ts"
Cohesion: 0.06
Nodes (87): LayeredSolid, addMesh(), addTet(), affinePlane(), Axis, Box, centroid(), chooseBox() (+79 more)

### Community 33 - "graphNote.test.ts"
Cohesion: 0.07
Nodes (29): @codemirror/lang-markdown, @codemirror/state, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close() (+21 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "tutorial.ts"
Cohesion: 0.16
Nodes (13): helpButton, openGuide(), HINT_MS, markTutorialSeen(), openTutorial(), show(), richText(), showTutorialHint() (+5 more)

### Community 36 - "complex.ts"
Cohesion: 0.05
Nodes (76): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexLine(), isComplexValue() (+68 more)

### Community 37 - "namesIn"
Cohesion: 0.14
Nodes (35): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+27 more)

### Community 38 - "translations.test.ts"
Cohesion: 0.18
Nodes (17): AstNode, calleeName(), check(), checkPair(), visit(), children(), entryPairs(), files (+9 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "engine.ts"
Cohesion: 0.20
Nodes (9): @farscrl/hunspell-wasm, capitalize(), COMMON_FIXES, ELISIONS, inGlossary(), lower(), SpellEngine, GLOSSARY (+1 more)

### Community 41 - "schemaBlocks"
Cohesion: 0.20
Nodes (7): BlockWidget, findWidgetBlocks(), guardBlocks(), schemaBlocks(), create(), setup(), setup()

### Community 42 - "several.ts"
Cohesion: 0.06
Nodes (78): EMPTY_SCOPE, atIntegers(), boundsOf(), close(), definite(), fourierProblem, fourierShown(), isTrig() (+70 more)

### Community 43 - "study.ts"
Cohesion: 0.15
Nodes (34): limit(), Asymptote, boundaries(), compiled(), cutsOf(), defined(), domainOf(), exact() (+26 more)

### Community 44 - "functions.ts"
Cohesion: 0.08
Nodes (67): EMPTY, number(), addFormat(), decimalsOf(), divFormat(), fixedNumber(), GENERAL, generalNumber() (+59 more)

### Community 45 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 46 - "src/relocation.ts"
Cohesion: 0.07
Nodes (70): 1. «Cambia account», accountSpace(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf() (+62 more)

### Community 47 - "board.ts"
Cohesion: 0.07
Nodes (35): Action, ACTION_NAMES, coalesced(), DOT_SIZES, DrawAction, EraseAction, EraserMode, Finger (+27 more)

### Community 48 - "Rational"
Cohesion: 0.10
Nodes (24): R(), expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactRandom, exactRoot() (+16 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (35): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+27 more)

### Community 50 - "FoldersStore"
Cohesion: 0.07
Nodes (21): Deletion, DeletionLog, cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder() (+13 more)

### Community 51 - "SidePanel"
Cohesion: 0.20
Nodes (5): cleanKatexError(), renderTex(), displayCode(), preventFocusSteal(), SidePanel

### Community 52 - "inference.ts"
Cohesion: 0.20
Nodes (21): confidence(), confidenceShown(), Given, hypothesisTest(), interval(), meanOf(), nameOf(), num() (+13 more)

### Community 53 - "supabase.ts"
Cohesion: 0.07
Nodes (46): @supabase/supabase-js, captchaToken(), loadTurnstile(), Turnstile, TURNSTILE_SCRIPT, Window, AUTH_STORAGE_KEY, TURNSTILE_SITE_KEY (+38 more)

### Community 54 - "render/lists.ts"
Cohesion: 0.23
Nodes (15): Item, ListStyle, bulletGroup(), ListLine, Marker, sameList(), alignInside(), asciiTrim() (+7 more)

### Community 55 - "probability.ts"
Cohesion: 0.13
Nodes (23): End, Family, CompileOptions, RelOp, ALL, complement(), endAt(), EventContext (+15 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "blockMoveEditor.test.ts"
Cohesion: 0.28
Nodes (11): blockMoveTransaction(), contentHash(), fenceName(), parseBlocks(), findSheetBlock(), apply(), blocks(), move() (+3 more)

### Community 58 - "database.ts"
Cohesion: 0.21
Nodes (7): @electric-sql/pglite, createDatabase(), createUser(), databaseTests(), feedbackTests(), migrations, shareTests()

### Community 59 - "num"
Cohesion: 0.08
Nodes (107): primed(), absOf(), splitAbs(), withoutAbs(), exp(), hyperbolicToExp(), linearIn(), sqrtEx() (+99 more)

### Community 60 - "Glifo"
Cohesion: 0.13
Nodes (15): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Commenti, Compatibilità con VS Code, Condividere una nota con un link (+7 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "ui/preview.ts"
Cohesion: 0.26
Nodes (9): BlockKind, MoveDir, hydrateSheets(), BLOCK_NAMES, blockKindOf(), MOVABLE_BLOCKS, moveButtonsHtml(), PATHS (+1 more)

### Community 63 - "toLatex"
Cohesion: 0.07
Nodes (55): FieldContext, fourierItems(), number(), testItems(), criticalLine(), named(), severalItems(), surface() (+47 more)

### Community 64 - "h"
Cohesion: 0.04
Nodes (83): 3. Le impostazioni divise in sezioni, SyncStatus, EXPLAIN_TONES, board, loadingEditor(), sidebarToggle(), viewSwitch, RelocationResult (+75 more)

### Community 65 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 66 - "spreadsheet/editor.ts"
Cohesion: 0.06
Nodes (67): RFC-4180, fflate, KINDS, sheetSummary(), WidgetBlock, tablesNote(), SchemaBlock, csvDelimiter() (+59 more)

### Community 67 - "blockMove.ts"
Cohesion: 0.13
Nodes (22): blockMoved, blockMoves(), LineMap, blank(), BlockMove, blockPlace(), closed(), closeIdx() (+14 more)

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

### Community 72 - "deploy.test.ts"
Cohesion: 0.28
Nodes (4): vite-plugin-pwa, accountOffMessage(), defineFor(), MAIN_BRANCH

### Community 73 - "toolbar.ts"
Cohesion: 0.19
Nodes (15): insertBlock(), wrapSelection(), Action, createToolbar(), insertCode(), insertLink(), listMenu(), listStyle() (+7 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (58): primitive(), verified(), atValues(), cancelLinear(), Converter, coordinates(), decimalText(), definiteParts() (+50 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Errore o imprevisto → nel dettaglio, 3. Serve una decisione → frasi complete, 4. Fine del compito → un solo riepilogo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.05
Nodes (58): schemaSummary(), ALIGN, ARROW_NAMES, AT_ICONS, AT_NAMES, BASE_PRESETS, BIG_ARROWS, DB_PRESETS (+50 more)

### Community 79 - "distributions.ts"
Cohesion: 0.17
Nodes (27): choose(), continuousQuantile(), discreteQuantile(), factorialBig(), FAMILIES, integerParam(), invalid(), makeDistribution() (+19 more)

### Community 82 - "Dove sono le cose"
Cohesion: 0.11
Nodes (36): Dove sono le cose, Glifo – architettura, @codemirror/language, explainTarget, Explanation, formulasUntil(), sheetBefore(), explanationMarkdown() (+28 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.10
Nodes (11): graphFile, names, namesFile, root, PNG_ICONS, centerOf(), clickOn(), ffmpeg (+3 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.08
Nodes (24): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Deciso (5 ottobre 2026), Deciso (5 ottobre 2026) (+16 more)

### Community 91 - "calcResults.ts"
Cohesion: 0.12
Nodes (12): acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult, calcResults(), CheckWidget, insertResult() (+4 more)

### Community 92 - "Costi"
Cohesion: 0.22
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 96 - "account-test.mjs"
Cohesion: 0.11
Nodes (10): device(), login(), newContext, waitFor(), b64(), CAPTCHA_TOKEN, CODE, GOOGLE_CODE (+2 more)

### Community 97 - "sheet.ts"
Cohesion: 0.05
Nodes (73): OdeFunction, expSumValue(), ExactFunction, ExactScope, decimalSeparator(), Digits, formatNumber(), formatRational() (+65 more)

### Community 98 - "aiPanel.test.ts"
Cohesion: 0.08
Nodes (27): definedName(), formulaTopic(), graphTopic(), numberText(), studyOf(), theoremTopic(), NoteSubject, SubjectKind (+19 more)

### Community 100 - "NotesStore"
Cohesion: 0.11
Nodes (13): adoptGuestNotes(), createdAtFromId(), deriveTitle(), NotesStore, hasLocalStorage(), memory, migrateKeyPrefix(), readItem() (+5 more)

### Community 101 - "linsys.ts"
Cohesion: 0.05
Nodes (93): factorsOf(), inverseRational(), Eigenvalue, eigenvalues(), interpolate(), polynomialIn(), splitRoot(), surdText() (+85 more)

### Community 102 - "search.ts"
Cohesion: 0.16
Nodes (25): editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex() (+17 more)

### Community 103 - "siteUpdate.ts"
Cohesion: 0.17
Nodes (17): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, loadPart() (+9 more)

### Community 104 - "Preview"
Cohesion: 0.14
Nodes (4): GraphLabels, hidden(), Preview, PreviewCallbacks

### Community 105 - "spreadsheet/file.ts"
Cohesion: 0.47
Nodes (5): hide(), OPEN, sheetsForFile(), sheetsFromFile(), unhide()

### Community 106 - "ink.ts"
Cohesion: 0.16
Nodes (16): Prefs, BOARD_PALETTES, BoardPalette, mid(), outlineSvg(), PEN_SIZE, shapeSvg(), SizeChoice (+8 more)

### Community 107 - "explainPanel.ts"
Cohesion: 0.07
Nodes (41): @mlc-ai/web-llm, ExplainTone, REPLY_TOKENS, chat(), GlifoError, Gpu, load(), post() (+33 more)

### Community 108 - "topics.ts"
Cohesion: 0.06
Nodes (77): ATTRIBUTES, count(), cut(), ER_SHAPES, fieldText(), fitLines(), flowOrder(), formulaText() (+69 more)

### Community 113 - "schema/shapes.ts"
Cohesion: 0.08
Nodes (17): @maxgraph/core, ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape (+9 more)

### Community 116 - "Il database degli account (Supabase)"
Cohesion: 0.12
Nodes (15): Accesso con Google, Cambiare il database, Commenti di chi prova Glifo, Cosa c'è, Eliminare l'account, Il controllo anti-robot (CAPTCHA, ottobre 2026), Il database degli account (Supabase), Il progetto (+7 more)

### Community 117 - "Glifo – note per Claude"
Cohesion: 0.11
Nodes (18): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole (+10 more)

### Community 118 - "ExplainPanel"
Cohesion: 0.14
Nodes (7): checkHtml(), ExplainChat, ExplainPanel, preventFocusSteal(), sentenceHtml(), stepsList(), texHtml()

### Community 119 - "conics.ts"
Cohesion: 0.18
Nodes (29): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+21 more)

### Community 120 - "schema/templates.ts"
Cohesion: 0.10
Nodes (20): SchemaEditorOptions, DEFAULT_EDGE, Schema, SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), tableMetrics() (+12 more)

### Community 121 - "files.ts"
Cohesion: 0.18
Nodes (16): 2. La pagina dei commenti, tipo FAQ, inClaudeViewer(), feedbackButton, openComments(), canWriteFilesDirectly(), FsWindow, isAbort(), MD_TYPES (+8 more)

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "strokes.ts"
Cohesion: 0.08
Nodes (39): centerOn(), copyStrokes(), cross(), handleScale(), IDENTITY, insideLasso(), keepInside(), LASSO_SHARE (+31 more)

### Community 124 - "Sheet"
Cohesion: 0.08
Nodes (25): ExactComplexScope, Ode, withWorkLimit(), FiniteContext, FormattedResult, chiSquareTest(), InferenceContext, Mat (+17 more)

### Community 125 - "sql.ts"
Cohesion: 0.17
Nodes (18): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+10 more)

### Community 128 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 129 - "graph/file.ts"
Cohesion: 0.10
Nodes (39): figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsFromFile(), OPEN, swatchSvg(), titleBand() (+31 more)

### Community 131 - "listCommands.test.ts"
Cohesion: 0.15
Nodes (13): toggleLinePrefix(), applyListStyle(), LIST_STYLES, noIndentedCode, CommandTarget, besideSchema(), schemaBlockRanges(), run() (+5 more)

### Community 132 - "MarkdownEditor"
Cohesion: 0.16
Nodes (5): closeMathBlockOnEnter(), EditorCallbacks, MarkdownEditor, insertTemplate(), setup()

### Community 136 - "touchLog"
Cohesion: 0.29
Nodes (3): movesLine(), seconds(), touchLog

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 140 - "vitest"
Cohesion: 0.06
Nodes (36): vitest, staticGraphSvg(), GraphItem, DrawOptions, PALETTES, DEFAULT_CAMERA, Quality, light (+28 more)

### Community 141 - "schemaTools.test.ts"
Cohesion: 0.13
Nodes (24): laneOf(), alignBoxes(), Alignment, Box, distributeBoxes(), Position, base64(), crc32() (+16 more)

### Community 143 - "plan.ts"
Cohesion: 0.18
Nodes (17): autoSum(), cellText(), columnRole(), columnsOf(), durationUnit(), isNumber(), isPlanRange(), MAX_ACTIVITIES (+9 more)

### Community 144 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

### Community 145 - "restore.test.ts"
Cohesion: 0.20
Nodes (12): relocationReceived(), restore(), BackupNote, backupNotes(), restoreBackup(), RestoreBoards, Restored, restoredMessage() (+4 more)

### Community 146 - "Distribution"
Cohesion: 0.13
Nodes (12): addExp(), Distribution, exactIntervalProbability(), integerRange(), intervalProbability(), subtractExp(), pValue(), rejection() (+4 more)

### Community 147 - "boardTouchLog.test.ts"
Cohesion: 0.20
Nodes (8): isSaved(), LOG_MAX_LINES, LogStore, SavedLog, clock(), memoryStore(), newLog(), texts()

## Knowledge Gaps
- **711 isolated node(s):** `Text`, `Entry`, `T`, `settings`, `account` (+706 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 997 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **35 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `touchlog.ts`, `graph/file.ts`, `main.ts`, `compile`, `MarkdownEditor`, `spec.ts`, `.constructor`, `parse.ts`, `touchLog`, `explain.ts`, `graph/preview.ts`, `chart.ts`, `svg.ts`, `schema/preview.ts`, `primitive.ts`, `Board`, `SchemaEditor`, `schemaTools.test.ts`, `numerical.ts`, `arithmetic.ts`, `SheetEditor`, `plan.ts`, `sidePanel.ts`, `graph.ts`, `store.ts`, `MathError`, `boardTouchLog.test.ts`, `assistant.ts`, `gantt.ts`, `renderMarkdown`, `view3d.ts`, `logic.ts`, `tutorial.ts`, `complex.ts`, `namesIn`, `schemaBlocks`, `several.ts`, `study.ts`, `functions.ts`, `finite.ts`, `src/relocation.ts`, `board.ts`, `Rational`, `board/shapes.ts`, `SidePanel`, `inference.ts`, `supabase.ts`, `blockMoveEditor.test.ts`, `num`, `ui/preview.ts`, `toLatex`, `h`, `spreadsheet/editor.ts`, `blockMove.ts`, `smoke-test.mjs`, `deploy.test.ts`, `toolbar.ts`, `symbolic.ts`, `schema/editor.ts`, `sheet.ts`, `aiPanel.test.ts`, `NotesStore`, `linsys.ts`, `siteUpdate.ts`, `Preview`, `ink.ts`, `explainPanel.ts`, `topics.ts`, `schema/shapes.ts`, `ExplainPanel`, `conics.ts`, `files.ts`, `strokes.ts`, `Sheet`?**
  _High betweenness centrality (0.158) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `touchlog.ts`, `parse.ts`, `main.ts`, `listCommands.test.ts`, `compile`, `primitive.ts`, `explain.ts`, `chart.ts`, `svg.ts`, `schema/preview.ts`, `schemaTools.test.ts`, `plan.ts`, `sidePanel.ts`, `restore.test.ts`, `boardTouchLog.test.ts`, `i18n.ts`, `store.ts`, `MathError`, `markers.ts`, `assistant.ts`, `markdown.ts`, `page.ts`, `gantt.ts`, `renderMarkdown`, `view3d.ts`, `graphNote.test.ts`, `tutorial.ts`, `translations.test.ts`, `resize.ts`, `several.ts`, `src/relocation.ts`, `board.ts`, `board/shapes.ts`, `FoldersStore`, `supabase.ts`, `blockMoveEditor.test.ts`, `database.ts`, `ui/preview.ts`, `h`, `spreadsheet/editor.ts`, `deploy.test.ts`, `distributions.ts`, `aiPanel.test.ts`, `NotesStore`, `linsys.ts`, `search.ts`, `siteUpdate.ts`, `ink.ts`, `explainPanel.ts`, `strokes.ts`, `Sheet`, `sql.ts`?**
  _High betweenness centrality (0.100) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `main.ts`, `.constructor`, `graph/preview.ts`, `SchemaEditor`, `SheetEditor`, `restore.test.ts`, `sidePanel.ts`, `graph.ts`, `page.ts`, `gantt.ts`, `graphNote.test.ts`, `tutorial.ts`, `resize.ts`, `board.ts`, `FoldersStore`, `SidePanel`, `ui/preview.ts`, `spreadsheet/editor.ts`, `toolbar.ts`, `schema/editor.ts`, `aiPanel.test.ts`, `Preview`, `explainPanel.ts`, `ExplainPanel`?**
  _High betweenness centrality (0.059) - this node is a cross-community bridge._
- **Are the 277 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `adoptGuestNotes()`) actually correct?**
  _`Dove sono le cose` has 277 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Text`, `Entry`, `T` to the rest of the system?**
  _711 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `parse.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07421150278293136 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.038443935926773455 - nodes in this community are weakly interconnected._