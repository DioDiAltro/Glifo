# Graph Report - Glifo  (2026-10-14)

## Corpus Check
- 345 files · ~713,489 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5522 nodes · 20232 edges · 160 communities (120 shown, 40 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 668 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ae0e24e1`
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
- primitive.ts
- graph/preview.ts
- Dove sono le cose
- probability.ts
- ExplainPanel
- vitest
- numerical.test.ts
- SchemaEditor
- editor/editor.ts
- SheetEditor
- NotesStore
- numerical.ts
- toLatex
- index.ts
- engine.ts
- schema/editor.ts
- noteWordsMath.test.ts
- store.ts
- parse.ts
- board.ts
- ui/preview.ts
- render/lists.ts
- several.ts
- gantt.ts
- study.ts
- .constructor
- assistant.ts
- logic.ts
- schemaTools.test.ts
- complex.ts
- namesIn
- translations.test.ts
- resize.ts
- view3d.ts
- BoardStore
- aiEn.test.ts
- markdown.ts
- functions.ts
- MathError
- spreadsheetEn.test.ts
- Pt
- suggestions.ts
- board/shapes.ts
- toolbar.ts
- sidePanel.ts
- explainPanel.ts
- schema/preview.ts
- downloadText
- usesDecimalComma
- 20261004091555_note_condivise.sql
- graph.ts
- database.ts
- finite.ts
- calcResults.ts
- dependencies
- Welcome to Glifo
- spreadsheet/editor.ts
- conics.ts
- num
- sheet.ts
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
- FoldersStore
- session-start.sh
- .claude/CLAUDE.md
- Il database degli account (Supabase)
- tutorial.mjs
- Abbonamenti
- topics.ts
- supabase-stub.sql
- account-test.mjs
- schemaBlocks.ts
- .folderItem
- In programma
- schemaEn.test.ts
- symbolsEn.test.ts
- siteUpdate.ts
- graph/file.ts
- solve.ts
- spellcheck.ts
- schema/shapes.ts
- supabase.ts
- Rational
- src/relocation.ts
- calcPlugin
- spreadsheet/format.ts
- Le spiegazioni, come funzionano
- strokes.ts
- Sheet
- page.ts
- createFakeSupabase
- explain.ts
- Piano per piano
- Parser
- Board
- 20261008130026_commenti.sql
- plan.ts
- MarkdownEditor
- xlsx.ts
- editor/lists.ts
- feedback.ts
- vite
- Glifo – note per Claude
- files.ts
- Costi
- editor.test.ts
- La lavagna
- AiPanel
- devDependencies
- scripts

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 304 edges
2. `MathError` - 151 edges
3. `Sheet` - 147 edges
4. `num()` - 145 edges
5. `h()` - 135 edges
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

## Communities (160 total, 40 thin omitted)

### Community 0 - "i18n.ts"
Cohesion: 0.03
Nodes (125): 3. Le impostazioni divise in sezioni, SyncStatus, AI_SERVICES, aiService, T, browserLang(), browserLanguages(), byLang() (+117 more)

### Community 1 - "noteWords.ts"
Cohesion: 0.08
Nodes (43): GraphLabelLines, insertGraphBlock(), LABEL_KEYS, setGraphLabels(), monthOf(), MONTHS, MONTHS_EN, parseDate() (+35 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (118): addToGraphBlock(), remapGraphLines(), account, ACCOUNT_OFF, active, aiShown(), aiToggle, aiWork (+110 more)

### Community 3 - "compile"
Cohesion: 0.04
Nodes (114): conicItems(), T, depth(), integralRegion, LayeredSolid, Multiple, planeMargin(), radiusOf() (+106 more)

### Community 4 - "sync.ts"
Cohesion: 0.07
Nodes (30): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+22 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (102): formulaAtCursor(), isConicLine(), quadricEquation(), fourierItems(), isFourierLine(), T, isComplexLine(), isTestLine() (+94 more)

### Community 6 - "latex.ts"
Cohesion: 0.11
Nodes (27): ACCENT_COMMANDS, diffLatex(), DISTRIBUTION_LATEX, distributionLatex(), domainLatex(), fnLatex(), fnName(), formLatex() (+19 more)

### Community 7 - "primitive.ts"
Cohesion: 0.11
Nodes (80): degree(), Factor, factorQ(), monic(), ONE, PartialFraction, partialFractions(), pderiv() (+72 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (47): decimalText(), addLabel(), boxes, cameras, complexCoord(), containing(), coord(), coordinates() (+39 more)

### Community 9 - "Dove sono le cose"
Cohesion: 0.10
Nodes (31): Dove sono le cose, Glifo – architettura, answerFollowUp(), chatContext, chatSubject(), chatSystemPrompt(), checkTopicSteps(), explainTopic (+23 more)

### Community 10 - "probability.ts"
Cohesion: 0.06
Nodes (62): addExp(), choose(), continuousQuantile(), decimals(), discreteQuantile(), Distribution, End, exactIntervalProbability() (+54 more)

### Community 11 - "ExplainPanel"
Cohesion: 0.15
Nodes (4): ExplainChat, ExplainPanel, preventFocusSteal(), formulasSummary()

### Community 12 - "vitest"
Cohesion: 0.05
Nodes (87): vitest, contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), staticGraphSvg(), chooseWindow(), chooseY() (+79 more)

### Community 13 - "numerical.test.ts"
Cohesion: 0.60
Nodes (3): result(), text(), verdict()

### Community 14 - "SchemaEditor"
Cohesion: 0.10
Nodes (6): isLanes(), SchemaEditor, withLaneContents(), createEdgeCell(), EdgeLook, serializeSchema()

### Community 15 - "editor/editor.ts"
Cohesion: 0.07
Nodes (32): description, name, private, type, version, @codemirror/autocomplete, @codemirror/commands, @codemirror/language-data (+24 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (5): functionLabel(), SheetEditor, englishTyping(), CellRange, cloneSheet()

### Community 17 - "NotesStore"
Cohesion: 0.05
Nodes (71): 1. «Cambia account», accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount() (+63 more)

### Community 18 - "numerical.ts"
Cohesion: 0.07
Nodes (63): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Domande frequenti e commenti (+55 more)

### Community 19 - "toLatex"
Cohesion: 0.05
Nodes (110): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+102 more)

### Community 20 - "index.ts"
Cohesion: 0.06
Nodes (44): Text, b, bigops, c, calculus, fn, fr, fractions (+36 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "schema/editor.ts"
Cohesion: 0.06
Nodes (43): alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ALIGN_NAMES, ARROW_NAMES (+35 more)

### Community 23 - "noteWordsMath.test.ts"
Cohesion: 0.11
Nodes (16): AstNode, childrenOf(), DATA, ENGLISH, englishTexts(), FUNCTIONS, inBothLanguages(), isNode() (+8 more)

### Community 24 - "store.ts"
Cohesion: 0.08
Nodes (19): EraseAction, Step, BoardBackend, BoardChange, BoardData, done(), fromRecord(), IdbBoards (+11 more)

### Community 25 - "parse.ts"
Cohesion: 0.07
Nodes (41): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe(), differentialInFraction() (+33 more)

### Community 26 - "board.ts"
Cohesion: 0.07
Nodes (40): Action, coalesced(), DOT_SIZES, EraserMode, Finger, HANDLE_REACH, ICON, LassoAction (+32 more)

### Community 27 - "ui/preview.ts"
Cohesion: 0.09
Nodes (19): BlockKind, MoveDir, hydrateSheets(), T, BLOCK_NAMES, blockHiddenMessage(), blockKindOf(), blockMovedMessage() (+11 more)

### Community 28 - "render/lists.ts"
Cohesion: 0.14
Nodes (17): markdown-it, fakeLlmWorker(), firstVisit(), plainContext, ListStyle, bulletGroup(), Marker, sameList() (+9 more)

### Community 29 - "several.ts"
Cohesion: 0.08
Nodes (56): criticalLine(), named(), severalItems(), surface(), T, Piece, Condition, Family (+48 more)

### Community 30 - "gantt.ts"
Cohesion: 0.05
Nodes (75): amount(), barColor(), crossings(), dateText(), dayMonth(), dayOf(), fitText(), GanttOptions (+67 more)

### Community 31 - "study.ts"
Cohesion: 0.13
Nodes (39): numericRoots(), Asymptote, asymptoteText(), boundaries(), compiled(), cutsOf(), defined(), domainOf() (+31 more)

### Community 33 - "assistant.ts"
Cohesion: 0.09
Nodes (30): @anthropic-ai/sdk, AiAnswer, AiError, AiSettings, answerSchema(), askAi(), askCompatible(), askThroughHost() (+22 more)

### Community 34 - "logic.ts"
Cohesion: 0.11
Nodes (30): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+22 more)

### Community 35 - "schemaTools.test.ts"
Cohesion: 0.17
Nodes (19): base64(), cellHtml(), crc32(), svgSize(), svgToPng(), T, withDensity(), labelHtml() (+11 more)

### Community 36 - "complex.ts"
Cohesion: 0.07
Nodes (56): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexValue(), isInequality() (+48 more)

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
Nodes (87): sampleRegion(), addMesh(), addTet(), affinePlane(), Axis, Box, centroid(), chooseBox() (+79 more)

### Community 41 - "BoardStore"
Cohesion: 0.08
Nodes (15): BoardStore, MemoryBoards, applyAccountChange(), backup(), BackupNote, backupNotes(), restoreBackup(), RestoreBoards (+7 more)

### Community 42 - "aiEn.test.ts"
Cohesion: 0.07
Nodes (41): @mlc-ai/web-llm, EXPLAIN_TONES, chat(), GlifoError, Gpu, load(), post(), remove() (+33 more)

### Community 43 - "markdown.ts"
Cohesion: 0.13
Nodes (26): lineDepth(), parseBlockMath(), dataRange(), renderTexOrError(), renderTexWithResult(), configurePurify(), createMarkdownIt(), FORBIDDEN_TAGS (+18 more)

### Community 44 - "functions.ts"
Cohesion: 0.07
Nodes (61): EMPTY, evaluateSheet(), number(), SheetEvaluator, T, addFormat(), GENERAL, FormulaNode (+53 more)

### Community 45 - "MathError"
Cohesion: 0.06
Nodes (94): MathError, formatRational(), angleBetween(), asMatrix(), basisOf(), circleText(), complexText(), cross() (+86 more)

### Community 46 - "spreadsheetEn.test.ts"
Cohesion: 0.09
Nodes (52): formulaText(), readSheet(), tableTitle(), tableTopic(), valueText(), sheetSummary(), pick(), booleanText() (+44 more)

### Community 47 - "Pt"
Cohesion: 0.15
Nodes (10): clampZoom(), MoveAction, PanAction, PinchAction, pressureOf(), validView(), Transform, EllipseFit (+2 more)

### Community 48 - "suggestions.ts"
Cohesion: 0.13
Nodes (16): templateInsertion(), EditorMathContext, expand(), preferredIndex(), SuggestionController, SuggestionItem, CATEGORIES, commandNames() (+8 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (36): DrawAction, adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners() (+28 more)

### Community 50 - "toolbar.ts"
Cohesion: 0.16
Nodes (17): insertBlock(), wrapSelection(), ListStyleId, Action, createToolbar(), insertCode(), insertLink(), listMenu() (+9 more)

### Community 51 - "sidePanel.ts"
Cohesion: 0.12
Nodes (18): AiResult, localizeTex(), cache, cleanKatexError(), renderTex(), T, TexRender, isConfidentAnswer() (+10 more)

### Community 52 - "explainPanel.ts"
Cohesion: 0.09
Nodes (28): Explanation, FollowUp, REPLY_TOKENS, ChatMessage, checkHtml(), checkTitle(), T, escapeHtml() (+20 more)

### Community 53 - "schema/preview.ts"
Cohesion: 0.22
Nodes (12): Look, SchemaError, Theme, draw(), drawCached(), drawn, errorHtml(), fill() (+4 more)

### Community 54 - "downloadText"
Cohesion: 0.46
Nodes (4): loadDialect(), downloadBlob(), downloadText(), fileNameFor()

### Community 55 - "usesDecimalComma"
Cohesion: 0.07
Nodes (53): number(), T, testItems(), figureText(), classes(), dataOf(), distributionExtent(), distributionLabel() (+45 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "graph.ts"
Cohesion: 0.10
Nodes (30): fieldInput(), textWidth(), AT_X, cellText(), COMPASS, createGraph(), drawSchema(), edgeLook() (+22 more)

### Community 58 - "database.ts"
Cohesion: 0.23
Nodes (6): createDatabase(), createUser(), databaseTests(), feedbackTests(), migrations, shareTests()

### Community 59 - "finite.ts"
Cohesion: 0.15
Nodes (30): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteContext (+22 more)

### Community 60 - "calcResults.ts"
Cohesion: 0.09
Nodes (40): @codemirror/language, @codemirror/state, @lezer/common, explainTarget, acceptCalcResult(), CalcCheck, calcOutcomes(), CalcResult (+32 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "Welcome to Glifo"
Cohesion: 0.20
Nodes (9): A few examples, Calculations and graphs, For programming too, Handy shortcuts, How to write formulas, Lists, Spell check, Try it now (+1 more)

### Community 63 - "spreadsheet/editor.ts"
Cohesion: 0.07
Nodes (62): tablesNote(), currentCall(), Editing, MenuEntry, Move, openSheetEditor(), PATHS, SheetEditorOptions (+54 more)

### Community 64 - "conics.ts"
Cohesion: 0.19
Nodes (28): at(), centralCanonical(), Coefficients, coneCanonical(), conicOf(), det2(), det3(), determinant() (+20 more)

### Community 65 - "num"
Cohesion: 0.07
Nodes (108): absOf(), splitAbs(), withoutAbs(), linearIn(), sqrtEx(), termTransform(), polyEx(), addWave() (+100 more)

### Community 66 - "sheet.ts"
Cohesion: 0.07
Nodes (64): numberText(), endTex(), OdeFunction, expSumValue(), decimalSeparator(), Digits, formatNumber(), FormatOptions (+56 more)

### Community 67 - "I modelli e le chiavi API"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), In prova sul ramo `prova` (7 ottobre 2026): Qwen3 nel browser per «Spiegami», Le idee dello studente (5 ottobre 2026)

### Community 68 - "blockMove.ts"
Cohesion: 0.10
Nodes (36): blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove, blockPlace(), closed() (+28 more)

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
Nodes (12): Promemoria per lo studente, 2. La pagina dei commenti, tipo FAQ, 4. Più modelli per «Spiegami», 5. A cosa serve la chiave dell'AI, 6. Glifo anche in inglese, 7. Via il registro dei tocchi, 8. Il pulsante ✨ con il contorno, Gli abbonamenti, in tutto questo (+4 more)

### Community 73 - "schema/templates.ts"
Cohesion: 0.28
Nodes (15): SHAPE_SIZE, tableHeight(), conceptMap(), cycle(), edge(), er(), flowchart(), node() (+7 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (60): primitive(), verified(), atValues(), Converter, coordinates(), decimalText(), definiteParts(), definiteValue() (+52 more)

### Community 75 - "Field"
Cohesion: 0.13
Nodes (6): characteristicPolynomial(), eigenvalues(), Field, interpolate(), interpolateFloat(), polynomialIn()

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Errore o imprevisto → nel dettaglio, 3. Serve una decisione → frasi complete, 4. Fine del compito → un solo riepilogo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 79 - "FoldersStore"
Cohesion: 0.17
Nodes (3): cleanFolderName(), FoldersStore, sameName()

### Community 82 - "Il database degli account (Supabase)"
Cohesion: 0.14
Nodes (13): Accesso con Google, Cambiare il database, Commenti di chi prova Glifo, Cosa c'è, Eliminare l'account, Il controllo anti-robot (CAPTCHA, ottobre 2026), Il database degli account (Supabase), Il progetto (+5 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.09
Nodes (13): playwright-core, graphFile, names, namesFile, root, PNG_ICONS, centerOf(), clickOn() (+5 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.14
Nodes (14): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+6 more)

### Community 91 - "topics.ts"
Cohesion: 0.16
Nodes (23): ATTRIBUTES, cut(), ER_SHAPES, fieldText(), fitLines(), flowOrder(), FREE_NAMES, laneOf() (+15 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.11
Nodes (10): device(), login(), newContext, waitFor(), b64(), CAPTCHA_TOKEN, CODE, GOOGLE_CODE (+2 more)

### Community 97 - "schemaBlocks.ts"
Cohesion: 0.10
Nodes (21): toggleLinePrefix(), LIST_STYLES, besideSchema(), BlockWidget, findWidgetBlocks(), guardBlocks(), KINDS, schemaBlockRanges() (+13 more)

### Community 98 - ".folderItem"
Cohesion: 0.22
Nodes (3): clear(), NotesPanel, NotesPanelDeps

### Community 100 - "In programma"
Cohesion: 0.22
Nodes (9): Account: i propri appunti su ogni dispositivo, anche da condividere, Commenti di chi prova Glifo, Idee per il futuro, In programma, La grafica: account, impostazioni, commenti, AI e lingua (chiesto il 10 ottobre 2026, se ne parla), La lavagna: idee in più, Più avanti, Schemi: idee in più (+1 more)

### Community 101 - "schemaEn.test.ts"
Cohesion: 0.06
Nodes (45): @electric-sql/pglite, markdownForFile(), findSchemaBlocks(), schemaBlockAtLine(), openSchemaEditor(), SchemaEditorOptions, hide(), OPEN (+37 more)

### Community 102 - "symbolsEn.test.ts"
Cohesion: 0.11
Nodes (39): editDistance(), normalizeText(), singular(), stem(), STOPWORDS, words(), BOTH, buildIndex() (+31 more)

### Community 103 - "siteUpdate.ts"
Cohesion: 0.18
Nodes (16): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, loadPart() (+8 more)

### Community 104 - "graph/file.ts"
Cohesion: 0.07
Nodes (51): @codemirror/view, FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsForFile(), graphsFromFile() (+43 more)

### Community 106 - "solve.ts"
Cohesion: 0.09
Nodes (47): FieldContext, exponentialForm(), fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd() (+39 more)

### Community 107 - "spellcheck.ts"
Cohesion: 0.07
Nodes (29): @codemirror/lang-markdown, noIndentedCode, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close() (+21 more)

### Community 113 - "schema/shapes.ts"
Cohesion: 0.08
Nodes (17): @maxgraph/core, ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape (+9 more)

### Community 117 - "supabase.ts"
Cohesion: 0.07
Nodes (46): @supabase/supabase-js, captchaToken(), loadTurnstile(), Turnstile, TURNSTILE_SCRIPT, Window, AUTH_STORAGE_KEY, TURNSTILE_SITE_KEY (+38 more)

### Community 118 - "Rational"
Cohesion: 0.06
Nodes (54): evaluateExactComplex(), exactSqrt(), GaussRational, unavailable(), bigGcd(), binomExact(), conditionExact(), evaluateExact() (+46 more)

### Community 119 - "src/relocation.ts"
Cohesion: 0.07
Nodes (42): buildPackage(), isRelocationPackage(), moveDayLabel(), NEW_ORIGIN, OLD_ORIGIN, openedForRelocation(), RECEIVE_URL, receiveFromOldSite() (+34 more)

### Community 120 - "calcPlugin"
Cohesion: 0.17
Nodes (4): calcPlugin, CheckWidget, ResultWidget, valueNode()

### Community 121 - "spreadsheet/format.ts"
Cohesion: 0.07
Nodes (52): at(), breakEven(), Point, quantity(), T, tableItems(), textLabel(), chartData (+44 more)

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "strokes.ts"
Cohesion: 0.08
Nodes (41): centerOn(), copyStrokes(), cross(), handleScale(), IDENTITY, insideLasso(), keepInside(), LASSO_SHARE (+33 more)

### Community 124 - "Sheet"
Cohesion: 0.06
Nodes (35): Definition, Line, ExactComplexScope, ConicInfo, Ode, withWorkLimit(), ExactRandom, FormattedResult (+27 more)

### Community 125 - "page.ts"
Cohesion: 0.07
Nodes (45): katex, accountDataFile(), PullResult, openShareDialog(), changeAccess(), changeCopy(), refreshChanged(), render() (+37 more)

### Community 128 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 129 - "explain.ts"
Cohesion: 0.07
Nodes (54): allNames(), bareResult(), ChatFn, checkFormulas(), checkSteps(), checkTopicFormula(), Conversation, converse() (+46 more)

### Community 132 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 139 - "plan.ts"
Cohesion: 0.14
Nodes (20): cellText(), columnRole(), columnsOf(), durationUnit(), isNumber(), isPlanRange(), MAX_ACTIVITIES, plain() (+12 more)

### Community 140 - "MarkdownEditor"
Cohesion: 0.15
Nodes (6): closeMathBlockOnEnter(), EditorCallbacks, MarkdownEditor, searchPhrases(), insertTemplate(), setup()

### Community 141 - "xlsx.ts"
Cohesion: 0.10
Nodes (43): RFC-4180, fflate, csvCell(), csvDelimiter(), csvNumbers(), csvToSheet(), digitsOf(), field() (+35 more)

### Community 142 - "editor/lists.ts"
Cohesion: 0.11
Nodes (50): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+42 more)

### Community 143 - "feedback.ts"
Cohesion: 0.06
Nodes (49): vite-plugin-pwa, SUPABASE_KEY, SUPABASE_URL, feedbackButton, openFeedback(), accountOffMessage(), Site, T (+41 more)

### Community 154 - "vite"
Cohesion: 0.29
Nodes (4): vite, minutes, postMessage(), started

### Community 156 - "Glifo – note per Claude"
Cohesion: 0.25
Nodes (8): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Regole, sqlite()

### Community 157 - "files.ts"
Cohesion: 0.24
Nodes (14): inClaudeViewer(), canWriteFilesDirectly(), FsWindow, isAbort(), mdTypes(), OpenedFile, openMarkdownFiles(), openTypes() (+6 more)

### Community 161 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 162 - "editor.test.ts"
Cohesion: 0.09
Nodes (24): tabOutOfMath(), InsertOptions, commandTokenAt(), isInCode(), mathContextAt(), openMathBefore(), addPlaceholders, buildDecorations() (+16 more)

### Community 163 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 168 - "AiPanel"
Cohesion: 0.36
Nodes (3): NoteSubject, AiPanel, kindName()

### Community 170 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

### Community 171 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

## Knowledge Gaps
- **860 isolated node(s):** `session-start.sh script`, `name`, `private`, `version`, `description` (+855 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1176 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **40 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `texts` connect `i18n.ts` to `explain.ts`, `noteWords.ts`, `compile`, `main.ts`, `spec.ts`, `latex.ts`, `primitive.ts`, `graph/preview.ts`, `probability.ts`, `plan.ts`, `vitest`, `xlsx.ts`, `editor/lists.ts`, `editor/editor.ts`, `feedback.ts`, `NotesStore`, `numerical.ts`, `toLatex`, `index.ts`, `schema/editor.ts`, `parse.ts`, `board.ts`, `ui/preview.ts`, `several.ts`, `gantt.ts`, `study.ts`, `files.ts`, `assistant.ts`, `logic.ts`, `schemaTools.test.ts`, `complex.ts`, `namesIn`, `resize.ts`, `BoardStore`, `aiEn.test.ts`, `functions.ts`, `MathError`, `spreadsheetEn.test.ts`, `toolbar.ts`, `sidePanel.ts`, `explainPanel.ts`, `schema/preview.ts`, `usesDecimalComma`, `finite.ts`, `calcResults.ts`, `spreadsheet/editor.ts`, `conics.ts`, `num`, `sheet.ts`, `schema/templates.ts`, `symbolic.ts`, `topics.ts`, `schemaBlocks.ts`, `schemaEn.test.ts`, `siteUpdate.ts`, `graph/file.ts`, `solve.ts`, `spellcheck.ts`, `supabase.ts`, `Rational`, `src/relocation.ts`, `spreadsheet/format.ts`, `page.ts`?**
  _High betweenness centrality (0.130) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `Dove sono le cose` to `i18n.ts`, `explain.ts`, `main.ts`, `noteWords.ts`, `compile`, `spec.ts`, `primitive.ts`, `Board`, `graph/preview.ts`, `probability.ts`, `plan.ts`, `MarkdownEditor`, `vitest`, `SchemaEditor`, `feedback.ts`, `xlsx.ts`, `NotesStore`, `numerical.ts`, `toLatex`, `SheetEditor`, `schema/editor.ts`, `parse.ts`, `board.ts`, `ui/preview.ts`, `render/lists.ts`, `files.ts`, `gantt.ts`, `several.ts`, `study.ts`, `assistant.ts`, `logic.ts`, `schemaTools.test.ts`, `complex.ts`, `namesIn`, `view3d.ts`, `BoardStore`, `aiEn.test.ts`, `AiPanel`, `functions.ts`, `MathError`, `spreadsheetEn.test.ts`, `Pt`, `board/shapes.ts`, `toolbar.ts`, `sidePanel.ts`, `explainPanel.ts`, `usesDecimalComma`, `ExplainPanel`, `graph.ts`, `finite.ts`, `calcResults.ts`, `spreadsheet/editor.ts`, `num`, `blockMove.ts`, `symbolic.ts`, `tutorial.mjs`, `topics.ts`, `schemaBlocks.ts`, `siteUpdate.ts`, `graph/file.ts`, `solve.ts`, `schema/shapes.ts`, `supabase.ts`, `Rational`, `src/relocation.ts`, `spreadsheet/format.ts`, `strokes.ts`, `Sheet`?**
  _High betweenness centrality (0.100) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `i18n.ts`, `explain.ts`, `noteWords.ts`, `compile`, `spec.ts`, `primitive.ts`, `graph/preview.ts`, `Dove sono le cose`, `probability.ts`, `plan.ts`, `numerical.test.ts`, `editor/lists.ts`, `editor/editor.ts`, `feedback.ts`, `NotesStore`, `xlsx.ts`, `noteWordsMath.test.ts`, `store.ts`, `parse.ts`, `board.ts`, `gantt.ts`, `assistant.ts`, `editor.test.ts`, `schemaTools.test.ts`, `translations.test.ts`, `resize.ts`, `view3d.ts`, `BoardStore`, `aiEn.test.ts`, `MathError`, `spreadsheetEn.test.ts`, `suggestions.ts`, `board/shapes.ts`, `explainPanel.ts`, `usesDecimalComma`, `database.ts`, `spreadsheet/editor.ts`, `num`, `blockMove.ts`, `schemaBlocks.ts`, `schemaEn.test.ts`, `symbolsEn.test.ts`, `siteUpdate.ts`, `graph/file.ts`, `spellcheck.ts`, `supabase.ts`, `src/relocation.ts`, `spreadsheet/format.ts`, `strokes.ts`, `Sheet`, `page.ts`?**
  _High betweenness centrality (0.098) - this node is a cross-community bridge._
- **Are the 303 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `tutorialModel()`) actually correct?**
  _`Dove sono le cose` has 303 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `name`, `private` to the rest of the system?**
  _860 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `i18n.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.028672203891227672 - nodes in this community are weakly interconnected._
- **Should `noteWords.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0783673469387755 - nodes in this community are weakly interconnected._