# Graph Report - matherdown  (2026-10-13)

## Corpus Check
- 346 files · ~720,418 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5550 nodes · 20305 edges · 164 communities (124 shown, 40 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 681 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `81a65e8d`
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
- primitive.ts
- graph/preview.ts
- explain.ts
- distributions.ts
- localModels.ts
- svg.ts
- fourier.ts
- SchemaEditor
- editor/editor.ts
- SheetEditor
- src/relocation.ts
- numerical.ts
- linsys.ts
- index.ts
- engine.ts
- schema/editor.ts
- toLatex
- store.ts
- parse.ts
- ink.ts
- ui/preview.ts
- markdown.ts
- arithmetic.ts
- gantt.ts
- study.ts
- solve.ts
- assistant.ts
- logic.ts
- several.ts
- complex.ts
- namesIn
- translations.test.ts
- resize.ts
- view3d.ts
- BoardStore
- local.ts
- plan.ts
- functions.ts
- MathError
- topics.ts
- board.ts
- sidePanel.ts
- board/shapes.ts
- toolbar.ts
- SidePanel
- explainPanel.ts
- toNode
- markers.ts
- spreadsheet/format.ts
- 20261004091555_note_condivise.sql
- Converter
- database.ts
- finite.ts
- schemaTools.test.ts
- dependencies
- Welcome to Glifo
- spreadsheet/editor.ts
- .renderFormat
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
- .constructor
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- escapeHtml
- FoldersStore
- session-start.sh
- .claude/CLAUDE.md
- Il database degli account (Supabase)
- tutorial.mjs
- Abbonamenti
- Dove sono le cose
- supabase-stub.sql
- account-test.mjs
- schemaGuard.test.ts
- gauss.ts
- .visible
- schemaEn.test.ts
- symbolsEn.test.ts
- siteUpdate.ts
- AiPanel
- suggestions.ts
- schema/preview.ts
- spellcheck.ts
- sheet.ts
- graph.ts
- vitest
- supabase.ts
- Rational
- .folderItem
- calcResults.ts
- ExplainPanel
- Le spiegazioni, come funzionano
- strokes.ts
- Sheet
- page.ts
- createFakeSupabase
- vite.config.ts
- Piano per piano
- Parser
- Board
- 20261008130026_commenti.sql
- ExplainChat
- .constructor
- xlsx.ts
- editor/lists.ts
- feedback.ts
- Glifo
- vite
- Glifo – note per Claude
- files.ts
- Costi
- editor.test.ts
- La lavagna
- devDependencies
- scripts

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 316 edges
2. `MathError` - 151 edges
3. `Sheet` - 147 edges
4. `num()` - 145 edges
5. `h()` - 136 edges
6. `MathNode` - 131 edges
7. `texts` - 125 edges
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
- `Attenzione a` --references--> `renderMarkdown()`  [INFERRED]
  CLAUDE.md → src/render/markdown.ts
- `4. Più modelli per «Spiegami»` --references--> `webllmId()`  [INFERRED]
  GRAFICA.md → src/ai/localModels.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (164 total, 40 thin omitted)

### Community 0 - "i18n.ts"
Cohesion: 0.04
Nodes (68): 3. Le impostazioni divise in sezioni, SyncStatus, downloadSize(), gpuF16(), modelVariant, browserLang(), browserLanguages(), dateLocale() (+60 more)

### Community 1 - "noteWordsGraph.test.ts"
Cohesion: 0.11
Nodes (30): @codemirror/language, addToGraphBlock(), formulaAtCursor(), GraphLabelLines, insertGraphBlock(), LABEL_KEYS, setGraphLabels(), monthOf() (+22 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (118): newStrokeId(), WidgetBlock, account, ACCOUNT_OFF, active, aiShown(), aiToggle, aiWork (+110 more)

### Community 3 - "compile"
Cohesion: 0.05
Nodes (83): conicItems(), T, argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot() (+75 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (31): AccountSync, withLock(), Account, EMPTY_STATE, FolderChange, FolderRow, isEmpty(), iso() (+23 more)

### Community 5 - "spec.ts"
Cohesion: 0.04
Nodes (127): numberText(), isConicLine(), quadricEquation(), isFourierLine(), isTestLine(), number(), T, testItems() (+119 more)

### Community 6 - "h"
Cohesion: 0.04
Nodes (79): rich(), texts, viewSwitch, moveDayLabel(), relocationMessage(), RelocationResult, openSignedOut(), printButton() (+71 more)

### Community 7 - "primitive.ts"
Cohesion: 0.16
Nodes (57): degree(), algebraic(), bigGcd(), byParts(), candidates(), canon(), combineLogs(), compareKeys() (+49 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (44): addLabel(), boxes, cameras, complexCoord(), containing(), coord(), coordinates(), drawings (+36 more)

### Community 9 - "explain.ts"
Cohesion: 0.05
Nodes (77): allNames(), answerFollowUp(), bareResult(), ChatFn, chatSubject(), chatSystemPrompt(), checkFormulas(), checkSteps() (+69 more)

### Community 10 - "distributions.ts"
Cohesion: 0.06
Nodes (67): addExp(), choose(), continuousQuantile(), decimals(), discreteQuantile(), Distribution, exactIntervalProbability(), factorialBig() (+59 more)

### Community 11 - "localModels.ts"
Cohesion: 0.07
Nodes (38): chat(), GlifoError, Gpu, load(), post(), remove(), scope, shaderF16() (+30 more)

### Community 12 - "svg.ts"
Cohesion: 0.08
Nodes (56): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseWindow(), chooseY(), clipLines(), dataWindow() (+48 more)

### Community 13 - "fourier.ts"
Cohesion: 0.20
Nodes (18): absOf(), boundsOf(), close(), definite(), fourierProblem, fourierShown(), isTrig(), isZero() (+10 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.10
Nodes (6): loadDialect(), SchemaEditor, withLaneContents(), EdgeLook, serializeSchema(), fileNameFor()

### Community 15 - "editor/editor.ts"
Cohesion: 0.07
Nodes (31): description, name, private, type, version, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/language-data (+23 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (6): tablesNote(), functionLabel(), SheetEditor, englishTyping(), serializeSheet(), cloneSheet()

### Community 17 - "src/relocation.ts"
Cohesion: 0.04
Nodes (91): 1. «Cambia account», accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount() (+83 more)

### Community 18 - "numerical.ts"
Cohesion: 0.11
Nodes (49): FormatOptions, bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial() (+41 more)

### Community 19 - "linsys.ts"
Cohesion: 0.11
Nodes (41): choices(), exText(), minorsGcd(), ONE, parametricRows(), parametricSystem(), PARAMS, polyDeterminant() (+33 more)

### Community 20 - "index.ts"
Cohesion: 0.06
Nodes (46): Text, b, bigops, c, calculus, fn, fr, fractions (+38 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "schema/editor.ts"
Cohesion: 0.05
Nodes (55): schemaSummary(), ALIGN, ALIGN_NAMES, ARROW_NAMES, AT_ICONS, AT_NAMES, BASE_PRESETS, BIG_ARROWS (+47 more)

### Community 23 - "toLatex"
Cohesion: 0.05
Nodes (59): fourierItems(), T, partialSum(), ACCENT_COMMANDS, diffLatex(), DISTRIBUTION_LATEX, distributionLatex(), domainLatex() (+51 more)

### Community 24 - "store.ts"
Cohesion: 0.07
Nodes (19): fake-indexeddb, BoardBackend, BoardChange, BoardData, done(), fromRecord(), IdbBoards, ofNote() (+11 more)

### Community 25 - "parse.ts"
Cohesion: 0.07
Nodes (43): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe(), differentialInFraction() (+35 more)

### Community 26 - "ink.ts"
Cohesion: 0.13
Nodes (20): Prefs, BOARD_PALETTES, BoardPalette, BoardTheme, highlightName(), inkName(), mid(), outlineSvg() (+12 more)

### Community 27 - "ui/preview.ts"
Cohesion: 0.09
Nodes (19): BlockKind, MoveDir, hydrateSheets(), T, BLOCK_NAMES, blockHiddenMessage(), blockKindOf(), blockMovedMessage() (+11 more)

### Community 28 - "markdown.ts"
Cohesion: 0.13
Nodes (25): lineDepth(), parseBlockMath(), dataRange(), tableChartKind(), moveAttrs(), configurePurify(), createMarkdownIt(), FORBIDDEN_TAGS (+17 more)

### Community 29 - "arithmetic.ts"
Cohesion: 0.08
Nodes (71): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+63 more)

### Community 30 - "gantt.ts"
Cohesion: 0.04
Nodes (99): searchPhrases(), amount(), barColor(), crossings(), dateText(), dayMonth(), dayOf(), fitText() (+91 more)

### Community 31 - "study.ts"
Cohesion: 0.08
Nodes (56): close(), Definite, definiteIntegral(), exValue(), samples(), EMPTY_SCOPE, Piece, limit() (+48 more)

### Community 32 - "solve.ts"
Cohesion: 0.07
Nodes (57): FieldContext, names(), STUDY_GRAPH, T, fracTex(), fracText(), gcdInt(), nearFraction() (+49 more)

### Community 33 - "assistant.ts"
Cohesion: 0.13
Nodes (25): AiAnswer, AiError, AiSettings, answerSchema(), askAi(), askCompatible(), askThroughHost(), capitalized() (+17 more)

### Community 34 - "logic.ts"
Cohesion: 0.11
Nodes (30): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+22 more)

### Community 35 - "several.ts"
Cohesion: 0.12
Nodes (43): criticalLine(), named(), severalItems(), surface(), T, at(), bounded(), Candidate (+35 more)

### Community 36 - "complex.ts"
Cohesion: 0.07
Nodes (52): ComplexDefinitions, add(), allRoots(), arg(), asin(), atan(), compileApply(), compileComplex() (+44 more)

### Community 37 - "namesIn"
Cohesion: 0.13
Nodes (37): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+29 more)

### Community 38 - "translations.test.ts"
Cohesion: 0.17
Nodes (18): AstNode, calleeName(), check(), checkPair(), visit(), children(), entryPairs(), files (+10 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (24): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+16 more)

### Community 40 - "view3d.ts"
Cohesion: 0.06
Nodes (92): staticGraphSvg(), sampleRegion(), addMesh(), addTet(), affinePlane(), Axis, Box, centroid() (+84 more)

### Community 41 - "BoardStore"
Cohesion: 0.08
Nodes (15): BoardStore, MemoryBoards, applyAccountChange(), backup(), BackupNote, backupNotes(), restoreBackup(), RestoreBoards (+7 more)

### Community 42 - "local.ts"
Cohesion: 0.13
Nodes (13): glifoError(), localErrorMessage(), localLlm, Pending, T, WorkerLike, ChatMessage, ChatOptions (+5 more)

### Community 43 - "plan.ts"
Cohesion: 0.09
Nodes (44): at(), breakEven(), Point, quantity(), T, tableItems(), textLabel(), graphKeyLine() (+36 more)

### Community 44 - "functions.ts"
Cohesion: 0.07
Nodes (62): EMPTY, evaluateSheet(), number(), SheetEvaluator, T, addFormat(), GENERAL, tidy() (+54 more)

### Community 45 - "MathError"
Cohesion: 0.11
Nodes (62): MathError, angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, dataOf() (+54 more)

### Community 46 - "topics.ts"
Cohesion: 0.07
Nodes (74): ATTRIBUTES, cut(), ER_SHAPES, fieldText(), fitLines(), flowOrder(), formulaText(), FREE_NAMES (+66 more)

### Community 47 - "board.ts"
Cohesion: 0.06
Nodes (35): Action, clampZoom(), coalesced(), DOT_SIZES, DrawAction, EraseAction, EraserMode, Finger (+27 more)

### Community 48 - "sidePanel.ts"
Cohesion: 0.16
Nodes (15): AiResult, isConfidentAnswer(), CATEGORIES, symbolsInCategory(), cardPreviewTex(), formPreviewTex(), ParsedTemplate, PLACEHOLDER_TEX (+7 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.14
Nodes (33): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+25 more)

### Community 50 - "toolbar.ts"
Cohesion: 0.17
Nodes (16): insertBlock(), wrapSelection(), ListStyleId, Action, createToolbar(), insertCode(), insertLink(), listMenu() (+8 more)

### Community 51 - "SidePanel"
Cohesion: 0.19
Nodes (6): localizeTex(), SymbolForm, cardPreview(), displayCode(), preventFocusSteal(), SidePanel

### Community 52 - "explainPanel.ts"
Cohesion: 0.07
Nodes (37): chatContext, REPLY_TOKENS, LocalAbort, definedName(), formulaTopic(), graphTopic(), studyOf(), theoremTopic() (+29 more)

### Community 53 - "toNode"
Cohesion: 0.12
Nodes (40): factorShown(), homogeneous(), homogeneousParts(), numShown(), sumShown(), termPowers(), at(), centralCanonical() (+32 more)

### Community 54 - "markers.ts"
Cohesion: 0.11
Nodes (37): Item, ListStyle, bullet(), bulletGroup(), childMarker(), column(), firstMarker(), label() (+29 more)

### Community 55 - "spreadsheet/format.ts"
Cohesion: 0.09
Nodes (31): ChartTable, CellResult, decimalsOf(), divFormat(), ENGLISH, englishNumber(), fixedNumber(), Format (+23 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "Converter"
Cohesion: 0.17
Nodes (16): linearCells(), pairUp(), Converter, definiteParts(), definiteValue(), expandCalculus(), fieldName(), functionOf() (+8 more)

### Community 58 - "database.ts"
Cohesion: 0.23
Nodes (6): createDatabase(), createUser(), databaseTests(), feedbackTests(), migrations, shareTests()

### Community 59 - "finite.ts"
Cohesion: 0.17
Nodes (28): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+20 more)

### Community 60 - "schemaTools.test.ts"
Cohesion: 0.12
Nodes (25): laneOf(), alignBoxes(), Alignment, Box, distributeBoxes(), Position, crc32(), svgSize() (+17 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "Welcome to Glifo"
Cohesion: 0.20
Nodes (9): A few examples, Calculations and graphs, For programming too, Handy shortcuts, How to write formulas, Lists, Spell check, Try it now (+1 more)

### Community 63 - "spreadsheet/editor.ts"
Cohesion: 0.08
Nodes (50): currentCall(), Editing, MenuEntry, Move, openSheetEditor(), PATHS, SheetEditorOptions, Snapshot (+42 more)

### Community 64 - ".renderFormat"
Cohesion: 0.18
Nodes (11): fieldInput(), isLanes(), edgeLook(), edgeTextAt(), nodeLook(), nodeStyle(), readSchema(), restyle() (+3 more)

### Community 65 - "odesolve.ts"
Cohesion: 0.08
Nodes (82): linearIn(), addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames() (+74 more)

### Community 66 - "statsShown.ts"
Cohesion: 0.14
Nodes (36): expSumValue(), Lin, check(), correlation(), count(), covariance(), Data, dataStatistic() (+28 more)

### Community 67 - "smoke-test.mjs"
Cohesion: 0.15
Nodes (6): markdown-it, playwright-core, PNG_ICONS, fakeLlmWorker(), firstVisit(), plainContext

### Community 68 - "blockMove.ts"
Cohesion: 0.10
Nodes (33): @codemirror/commands, blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove, blockPlace() (+25 more)

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
Cohesion: 0.08
Nodes (78): monomial(), atIntegers(), withoutAbs(), exp(), hyperbolicToExp(), termTransform(), polyEx(), homogeneousGroups() (+70 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Errore o imprevisto → nel dettaglio, 3. Serve una decisione → frasi complete, 4. Fine del compito → un solo riepilogo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "escapeHtml"
Cohesion: 0.20
Nodes (18): swatchClass(), texHtml(), checkHtml(), checkTitle(), T, cache, cleanKatexError(), escapeHtml() (+10 more)

### Community 79 - "FoldersStore"
Cohesion: 0.15
Nodes (4): cleanFolderName(), FoldersStore, sameName(), names()

### Community 82 - "Il database degli account (Supabase)"
Cohesion: 0.22
Nodes (8): Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Note condivise con un link, Sincronizzazione, `sync_pull({ since })`: scarica le novità

### Community 83 - "tutorial.mjs"
Cohesion: 0.11
Nodes (11): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+3 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.11
Nodes (19): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Deciso (5 ottobre 2026), Fonti (controllate il 4 ottobre 2026) (+11 more)

### Community 91 - "Dove sono le cose"
Cohesion: 0.13
Nodes (29): Dove sono le cose, Glifo – architettura, explainTarget, Explanation, schemaTitle(), formulasUntil(), sheetBefore(), explanationMarkdown() (+21 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.11
Nodes (10): device(), login(), newContext, waitFor(), b64(), CAPTCHA_TOKEN, CODE, GOOGLE_CODE (+2 more)

### Community 97 - "schemaGuard.test.ts"
Cohesion: 0.12
Nodes (12): toggleLinePrefix(), BlockWidget, findWidgetBlocks(), guardBlocks(), schemaBlocks(), create(), heading(), schemas() (+4 more)

### Community 98 - "gauss.ts"
Cohesion: 0.13
Nodes (24): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexLine(), isComplexValue() (+16 more)

### Community 100 - ".visible"
Cohesion: 0.14
Nodes (14): Promemoria per lo studente, 2. La pagina dei commenti, tipo FAQ, Account: i propri appunti su ogni dispositivo, anche da condividere, Commenti di chi prova Glifo, Idee per il futuro, In programma, La grafica: account, impostazioni, commenti, AI e lingua (chiesto il 10 ottobre 2026, se ne parla), La lavagna: idee in più (+6 more)

### Community 101 - "schemaEn.test.ts"
Cohesion: 0.08
Nodes (36): @electric-sql/pglite, svg(), openSchemaEditor(), SchemaEditorOptions, base64(), hide(), OPEN, schemasForFile() (+28 more)

### Community 102 - "symbolsEn.test.ts"
Cohesion: 0.11
Nodes (39): SuggestionItem, editDistance(), normalizeText(), singular(), stem(), STOPWORDS, words(), BOTH (+31 more)

### Community 103 - "siteUpdate.ts"
Cohesion: 0.17
Nodes (17): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, loadPart() (+9 more)

### Community 104 - "AiPanel"
Cohesion: 0.29
Nodes (5): NoteSubject, AiPanel, graphLabel(), kindName(), texInline()

### Community 105 - "suggestions.ts"
Cohesion: 0.22
Nodes (6): EditorMathContext, expand(), preferredIndex(), SuggestionController, parseTemplate(), templateText()

### Community 106 - "schema/preview.ts"
Cohesion: 0.24
Nodes (11): Look, Theme, draw(), drawCached(), drawn, errorHtml(), fill(), hydrateSchemas() (+3 more)

### Community 107 - "spellcheck.ts"
Cohesion: 0.08
Nodes (24): @codemirror/lang-markdown, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt() (+16 more)

### Community 108 - "sheet.ts"
Cohesion: 0.04
Nodes (67): ComplexScope, EMPTY_COMPLEX_SCOPE, decimalSeparator(), Digits, formatRational(), fromNumber(), fromRational(), SUPERSCRIPT (+59 more)

### Community 113 - "graph.ts"
Cohesion: 0.06
Nodes (34): @maxgraph/core, AT_X, cellHtml(), cellText(), COMPASS, createEdgeCell(), createGraph(), drawSchema() (+26 more)

### Community 116 - "vitest"
Cohesion: 0.05
Nodes (57): @codemirror/state, @codemirror/view, vitest, FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), graphImagesFor() (+49 more)

### Community 117 - "supabase.ts"
Cohesion: 0.06
Nodes (51): @supabase/supabase-js, captchaToken(), loadTurnstile(), Turnstile, TURNSTILE_SCRIPT, Window, AUTH_STORAGE_KEY, TURNSTILE_SITE_KEY (+43 more)

### Community 118 - "Rational"
Cohesion: 0.05
Nodes (54): Part, End, expSum, Family, CompileOptions, bigGcd(), binomExact(), conditionExact() (+46 more)

### Community 119 - ".folderItem"
Cohesion: 0.22
Nodes (3): formatDate(), NotesPanel, NotesPanelDeps

### Community 120 - "calcResults.ts"
Cohesion: 0.11
Nodes (13): @lezer/common, acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult, calcResults(), CheckWidget (+5 more)

### Community 121 - "ExplainPanel"
Cohesion: 0.23
Nodes (3): ExplainPanel, preventFocusSteal(), setup()

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "strokes.ts"
Cohesion: 0.09
Nodes (38): centerOn(), copyStrokes(), cross(), IDENTITY, insideLasso(), keepInside(), LASSO_SHARE, lassoed() (+30 more)

### Community 124 - "Sheet"
Cohesion: 0.07
Nodes (32): Definition, Line, ExactComplexScope, Ode, withWorkLimit(), FiniteContext, FormattedResult, differentialRequest (+24 more)

### Community 125 - "page.ts"
Cohesion: 0.06
Nodes (45): accountDataFile(), PullResult, openShareDialog(), changeAccess(), changeCopy(), copy(), refreshChanged(), render() (+37 more)

### Community 128 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 129 - "vite.config.ts"
Cohesion: 0.22
Nodes (6): @mlc-ai/web-llm, vite-plugin-pwa, accountOffMessage(), defineFor(), MAIN_BRANCH, webllmModels

### Community 132 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 133 - "Parser"
Cohesion: 0.29
Nodes (3): FormulaError, parseFormula(), Parser

### Community 136 - "Board"
Cohesion: 0.11
Nodes (4): Board, Step, Box, Stroke

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 141 - "xlsx.ts"
Cohesion: 0.10
Nodes (40): RFC-4180, fflate, csvCell(), csvDelimiter(), csvNumbers(), csvToSheet(), digitsOf(), field() (+32 more)

### Community 142 - "editor/lists.ts"
Cohesion: 0.16
Nodes (33): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+25 more)

### Community 143 - "feedback.ts"
Cohesion: 0.07
Nodes (46): SUPABASE_KEY, SUPABASE_URL, feedbackButton, openFeedback(), NEW_ORIGIN, Site, T, commentDate() (+38 more)

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
Cohesion: 0.13
Nodes (23): cache, capability(), ClaudeRuntime, hostDownloads, HostError, inClaudeViewer(), ModelTier, runtime() (+15 more)

### Community 161 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 162 - "editor.test.ts"
Cohesion: 0.07
Nodes (33): closeMathBlockOnEnter(), InsertOptions, insertTemplate(), templateInsertion(), CODE_NODES, CommandToken, commandTokenAt(), isInCode() (+25 more)

### Community 163 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 170 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

### Community 171 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

## Knowledge Gaps
- **870 isolated node(s):** `Deciso`, `Com'è andata la discussione`, `La proposta dello studente (4 ottobre 2026)`, `Il parere di Claude, in breve`, `Come si decide cosa far pagare` (+865 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1191 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **40 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `texts` connect `h` to `i18n.ts`, `noteWordsGraph.test.ts`, `main.ts`, `compile`, `spec.ts`, `graph/preview.ts`, `explain.ts`, `distributions.ts`, `localModels.ts`, `svg.ts`, `fourier.ts`, `editor/lists.ts`, `editor/editor.ts`, `feedback.ts`, `src/relocation.ts`, `numerical.ts`, `linsys.ts`, `xlsx.ts`, `index.ts`, `schema/editor.ts`, `toLatex`, `parse.ts`, `ink.ts`, `ui/preview.ts`, `Glifo – note per Claude`, `arithmetic.ts`, `gantt.ts`, `study.ts`, `solve.ts`, `assistant.ts`, `logic.ts`, `several.ts`, `complex.ts`, `namesIn`, `files.ts`, `resize.ts`, `BoardStore`, `local.ts`, `plan.ts`, `functions.ts`, `MathError`, `topics.ts`, `board.ts`, `sidePanel.ts`, `toolbar.ts`, `explainPanel.ts`, `toNode`, `spreadsheet/format.ts`, `finite.ts`, `schemaTools.test.ts`, `spreadsheet/editor.ts`, `odesolve.ts`, `statsShown.ts`, `schema/templates.ts`, `symbolic.ts`, `escapeHtml`, `Dove sono le cose`, `gauss.ts`, `schemaEn.test.ts`, `siteUpdate.ts`, `schema/preview.ts`, `spellcheck.ts`, `sheet.ts`, `vitest`, `supabase.ts`, `Rational`, `calcResults.ts`, `page.ts`?**
  _High betweenness centrality (0.163) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `Dove sono le cose` to `i18n.ts`, `noteWordsGraph.test.ts`, `main.ts`, `compile`, `spec.ts`, `h`, `primitive.ts`, `graph/preview.ts`, `explain.ts`, `distributions.ts`, `localModels.ts`, `svg.ts`, `fourier.ts`, `SchemaEditor`, `SheetEditor`, `src/relocation.ts`, `numerical.ts`, `linsys.ts`, `schema/editor.ts`, `toLatex`, `store.ts`, `parse.ts`, `ink.ts`, `ui/preview.ts`, `markdown.ts`, `arithmetic.ts`, `gantt.ts`, `study.ts`, `solve.ts`, `assistant.ts`, `logic.ts`, `several.ts`, `complex.ts`, `namesIn`, `view3d.ts`, `BoardStore`, `local.ts`, `plan.ts`, `functions.ts`, `MathError`, `topics.ts`, `board.ts`, `sidePanel.ts`, `board/shapes.ts`, `toolbar.ts`, `SidePanel`, `explainPanel.ts`, `toNode`, `spreadsheet/format.ts`, `Converter`, `finite.ts`, `schemaTools.test.ts`, `spreadsheet/editor.ts`, `.renderFormat`, `odesolve.ts`, `statsShown.ts`, `smoke-test.mjs`, `blockMove.ts`, `symbolic.ts`, `escapeHtml`, `tutorial.mjs`, `schemaGuard.test.ts`, `gauss.ts`, `siteUpdate.ts`, `AiPanel`, `graph.ts`, `vitest`, `supabase.ts`, `Rational`, `ExplainPanel`, `strokes.ts`, `Sheet`, `vite.config.ts`, `Parser`, `Board`, `ExplainChat`, `.constructor`, `xlsx.ts`, `feedback.ts`, `files.ts`?**
  _High betweenness centrality (0.115) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `i18n.ts`, `vite.config.ts`, `main.ts`, `compile`, `noteWordsGraph.test.ts`, `h`, `explain.ts`, `distributions.ts`, `localModels.ts`, `svg.ts`, `xlsx.ts`, `editor/lists.ts`, `editor/editor.ts`, `feedback.ts`, `src/relocation.ts`, `linsys.ts`, `schema/editor.ts`, `toLatex`, `store.ts`, `parse.ts`, `ink.ts`, `gantt.ts`, `assistant.ts`, `editor.test.ts`, `translations.test.ts`, `resize.ts`, `view3d.ts`, `BoardStore`, `local.ts`, `plan.ts`, `MathError`, `topics.ts`, `board.ts`, `sidePanel.ts`, `board/shapes.ts`, `explainPanel.ts`, `markers.ts`, `database.ts`, `schemaTools.test.ts`, `spreadsheet/editor.ts`, `blockMove.ts`, `symbolic.ts`, `schemaGuard.test.ts`, `schemaEn.test.ts`, `symbolsEn.test.ts`, `siteUpdate.ts`, `spellcheck.ts`, `sheet.ts`, `supabase.ts`, `Rational`, `strokes.ts`, `Sheet`, `page.ts`?**
  _High betweenness centrality (0.079) - this node is a cross-community bridge._
- **Are the 315 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `tutorialModel()`) actually correct?**
  _`Dove sono le cose` has 315 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Deciso`, `Com'è andata la discussione`, `La proposta dello studente (4 ottobre 2026)` to the rest of the system?**
  _870 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `i18n.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.038984438984438985 - nodes in this community are weakly interconnected._
- **Should `noteWordsGraph.test.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11092436974789915 - nodes in this community are weakly interconnected._