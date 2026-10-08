# Graph Report - matherdown  (2026-10-08)

## Corpus Check
- 299 files · ~583,848 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 4906 nodes · 17807 edges · 139 communities (109 shown, 30 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 551 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `33772f81`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- touchlog.ts
- Parser
- main.ts
- MathError
- sync.ts
- spec.ts
- arithmetic.ts
- num
- graph/preview.ts
- Dove sono le cose
- spaces.ts
- editor/lists.ts
- svg.ts
- dialogs.ts
- SchemaEditor
- Rational
- SheetEditor
- linsys.ts
- numerical.ts
- AiPanel
- index.ts
- engine.ts
- graphNote.test.ts
- topics.ts
- BoardStore
- linear.ts
- assistant.ts
- h
- editor.test.ts
- several.ts
- gantt.ts
- plan.ts
- search.ts
- editor/editor.ts
- logic.ts
- NotesStore
- complex.ts
- namesIn
- view3d.ts
- resize.ts
- statsShown.ts
- Board
- solve.ts
- study.ts
- functions.ts
- finite.ts
- inference.ts
- parse.ts
- probability.ts
- board/shapes.ts
- FoldersStore
- SidePanel
- suggestions.ts
- page.ts
- schemaTools.test.ts
- toolbar.ts
- 20261004091555_note_condivise.sql
- board.ts
- openShareDialog
- odesolve.ts
- graph.ts
- dependencies
- FormatOptions
- MarkdownEditor
- ui/preview.ts
- conics.ts
- dialogShell
- formatNumber
- smoke-test.mjs
- Benvenuto in Glifo
- compilerOptions
- strokes.ts
- latex.ts
- dom.ts
- symbolic.ts
- sheet.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- parseSchema
- session-start.sh
- .claude/CLAUDE.md
- blockMove.ts
- tutorial.mjs
- Abbonamenti
- spiegami-qwen.mjs
- Costi
- supabase-stub.sql
- account-test.mjs
- Il database degli account (Supabase)
- Pt
- devDependencies
- spell.test.ts
- .constructor
- downloadText
- Glifo
- vitest
- fake-supabase.mjs
- explainPanel.ts
- xlsx.ts
- logo.ts
- markdown.ts
- spreadsheet/editor.ts
- Piano per piano
- Field
- Le spiegazioni, come funzionano
- toNode
- sql.ts
- graph/file.ts
- ICONS
- laplace.ts
- gauss.ts
- sidePanel.ts
- createFakeSupabase

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 256 edges
2. `MathError` - 151 edges
3. `num()` - 145 edges
4. `Sheet` - 139 edges
5. `MathNode` - 129 edges
6. `mul()` - 124 edges
7. `Board` - 118 edges
8. `compile()` - 113 edges
9. `Rational` - 111 edges
10. `h()` - 107 edges

## Surprising Connections (you probably didn't know these)
- `Dove sono le cose` --references--> `fakeLlmWorker()`  [INFERRED]
  ARCHITETTURA.md → scripts/smoke-test.mjs
- `Come viene pubblicata` --references--> `dist()`  [INFERRED]
  README.md → src/board/shapes.ts
- `Dove sono le cose` --references--> `WidgetKind`  [INFERRED]
  ARCHITETTURA.md → src/editor/schemaBlocks.ts
- `Dove sono le cose` --references--> `texts()`  [INFERRED]
  ARCHITETTURA.md → tests/boardTouchLog.test.ts
- `Dove sono le cose` --references--> `adoptGuestNotes()`  [INFERRED]
  ARCHITETTURA.md → src/account/space.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (139 total, 30 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.07
Nodes (36): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole (+28 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (105): graphsForFile(), hide(), account, ACCOUNT_OFF, accountProblem(), active, aiToggle, app (+97 more)

### Community 3 - "MathError"
Cohesion: 0.06
Nodes (84): conicItems(), criticalLine(), named(), severalItems(), surface(), complexValue(), define(), argumentOrder() (+76 more)

### Community 4 - "sync.ts"
Cohesion: 0.05
Nodes (38): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+30 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (115): isConicLine(), quadricEquation(), fourierItems(), isFourierLine(), onlyComplex(), isTestLine(), isNumericalLine(), numericalItems() (+107 more)

### Community 6 - "arithmetic.ts"
Cohesion: 0.09
Nodes (52): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+44 more)

### Community 7 - "num"
Cohesion: 0.13
Nodes (88): atIntegers(), withoutAbs(), hyperbolicToExp(), inverseRational(), sqrtEx(), polyEx(), similarSolution(), algebraic() (+80 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (49): staticGraphSvg(), chooseWindow(), addLabel(), boxes, cameras, complexCoord(), containing(), coord() (+41 more)

### Community 9 - "Dove sono le cose"
Cohesion: 0.05
Nodes (91): Dove sono le cose, Glifo – architettura, allNames(), answerFollowUp(), bareResult(), CHAT_SUBJECT, chatContext, ChatFn (+83 more)

### Community 10 - "spaces.ts"
Cohesion: 0.13
Nodes (27): decimalSeparator(), Digits, formatRational(), fromNumber(), fromRational(), SUPERSCRIPT, writeDigits(), lengthText() (+19 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.08
Nodes (67): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+59 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (56): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), dataWindow(), domainEdge() (+48 more)

### Community 13 - "dialogs.ts"
Cohesion: 0.07
Nodes (36): EXPLAIN_TONES, ExplainTone, DEFAULT_LOCAL_MODEL, AI_SERVICES, aiService, aiSettingsOf(), board, ACCOUNT_SETTINGS (+28 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.11
Nodes (4): isLanes(), SchemaEditor, withLaneContents(), serializeSchema()

### Community 15 - "Rational"
Cohesion: 0.10
Nodes (25): expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactRandom, exactRoot(), ExactUnavailable (+17 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (9): currentCall(), SheetEditor, SheetEditorOptions, serializeSheet(), SheetModel, sheetSize(), clearRange(), cloneSheet() (+1 more)

### Community 17 - "linsys.ts"
Cohesion: 0.14
Nodes (41): choices(), gcd(), matrixEquation(), matrixSystem(), minorsGcd(), ONE, parametricRows(), parametricSystem() (+33 more)

### Community 18 - "numerical.ts"
Cohesion: 0.14
Nodes (31): cholesky(), condition(), exactPolynomial(), floatPolynomial(), interpolating(), interpolation(), inverseOf(), iterative() (+23 more)

### Community 19 - "AiPanel"
Cohesion: 0.32
Nodes (4): NoteSubject, AiPanel, graphLabel(), texInline()

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (39): b, bigops, c, calculus, fn, fr, fractions, functions (+31 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "graphNote.test.ts"
Cohesion: 0.09
Nodes (30): @codemirror/language, @codemirror/state, @lezer/common, acceptCalcResult(), calcOutcomes(), calcPlugin, CalcResult, calcResults() (+22 more)

### Community 23 - "topics.ts"
Cohesion: 0.12
Nodes (34): ATTRIBUTES, count(), cut(), definedName(), ER_SHAPES, fieldText(), fitLines(), flowOrder() (+26 more)

### Community 24 - "BoardStore"
Cohesion: 0.06
Nodes (14): BoardOptions, BoardBackend, BoardStore, done(), IdbBoards, MemoryBoards, ofNote(), openBoardDatabase() (+6 more)

### Community 25 - "linear.ts"
Cohesion: 0.10
Nodes (61): angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, dataOf(), determinant() (+53 more)

### Community 26 - "assistant.ts"
Cohesion: 0.08
Nodes (38): @anthropic-ai/sdk, AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible() (+30 more)

### Community 27 - "h"
Cohesion: 0.15
Nodes (16): viewSwitch, fieldInput(), textWidth(), cellText(), createEdgeCell(), edgeLook(), edgeStyle(), insertSchema() (+8 more)

### Community 28 - "editor.test.ts"
Cohesion: 0.09
Nodes (22): tabOutOfMath(), templateInsertion(), isInCode(), mathContextAt(), openMathBefore(), buildDecorations(), clearAllPlaceholders(), clearPlaceholders (+14 more)

### Community 29 - "several.ts"
Cohesion: 0.14
Nodes (36): severalLimit, at(), bounded(), Candidate, candidates(), compiled(), COORDS, coordShown() (+28 more)

### Community 30 - "gantt.ts"
Cohesion: 0.07
Nodes (70): amount(), barColor(), crossings(), dateText(), dayOf(), fitText(), GanttOptions, ganttSvg() (+62 more)

### Community 31 - "plan.ts"
Cohesion: 0.13
Nodes (15): FormulaError, Parser, cellText(), columnRole(), columnsOf(), durationUnit(), isNumber(), isPlanRange() (+7 more)

### Community 32 - "search.ts"
Cohesion: 0.19
Nodes (21): editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex() (+13 more)

### Community 33 - "editor/editor.ts"
Cohesion: 0.06
Nodes (45): description, name, private, type, version, @codemirror/autocomplete, @codemirror/commands, @codemirror/language-data (+37 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "NotesStore"
Cohesion: 0.07
Nodes (39): accountSpace(), adoptGuestNotes(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf(), setCurrentAccount() (+31 more)

### Community 36 - "complex.ts"
Cohesion: 0.08
Nodes (43): add(), allRoots(), arg(), asin(), atan(), compileApply(), compileComplex(), compileFunction() (+35 more)

### Community 37 - "namesIn"
Cohesion: 0.14
Nodes (35): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+27 more)

### Community 38 - "view3d.ts"
Cohesion: 0.06
Nodes (85): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+77 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "statsShown.ts"
Cohesion: 0.15
Nodes (34): Lin, check(), correlation(), count(), covariance(), Data, DATA_FUNCTIONS, dataStatistic() (+26 more)

### Community 41 - "Board"
Cohesion: 0.09
Nodes (4): Board, clampZoom(), validView(), BoardTheme

### Community 42 - "solve.ts"
Cohesion: 0.18
Nodes (23): piMultiple(), isStandardUnknown(), linearSystem(), breaks(), cubeRoot(), equation(), holds(), inequality() (+15 more)

### Community 43 - "study.ts"
Cohesion: 0.11
Nodes (44): fracTex(), fracText(), nearFraction(), surd(), close(), limit(), LimitPath, oneSided() (+36 more)

### Community 44 - "functions.ts"
Cohesion: 0.08
Nodes (67): EMPTY, number(), addFormat(), decimalsOf(), divFormat(), GENERAL, most(), mulFormat() (+59 more)

### Community 45 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 46 - "inference.ts"
Cohesion: 0.14
Nodes (27): number(), testItems(), chiSquareTest(), confidence(), confidenceShown(), Given, hypothesisTest(), InferenceContext (+19 more)

### Community 47 - "parse.ts"
Cohesion: 0.03
Nodes (79): GraphItem, parseGraph(), typedSliderValue(), errorMessage(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING (+71 more)

### Community 48 - "probability.ts"
Cohesion: 0.06
Nodes (60): addExp(), choose(), continuousQuantile(), discreteQuantile(), Distribution, End, exactIntervalProbability(), factorialBig() (+52 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (35): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+27 more)

### Community 50 - "FoldersStore"
Cohesion: 0.15
Nodes (4): cleanFolderName(), FoldersStore, sameName(), names()

### Community 51 - "SidePanel"
Cohesion: 0.21
Nodes (3): displayCode(), preventFocusSteal(), SidePanel

### Community 52 - "suggestions.ts"
Cohesion: 0.20
Nodes (4): EditorMathContext, expand(), preferredIndex(), SuggestionController

### Community 53 - "page.ts"
Cohesion: 0.05
Nodes (61): katex, @supabase/supabase-js, AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), currentAccount(), accountError (+53 more)

### Community 54 - "schemaTools.test.ts"
Cohesion: 0.18
Nodes (14): alignBoxes(), Alignment, Box, distributeBoxes(), Position, base64(), crc32(), svgSize() (+6 more)

### Community 55 - "toolbar.ts"
Cohesion: 0.14
Nodes (21): insertBlock(), InsertOptions, toggleLinePrefix(), wrapSelection(), addPlaceholders, Placeholder, besideSchema(), schemaBlockRanges() (+13 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "board.ts"
Cohesion: 0.06
Nodes (54): Action, ACTION_NAMES, DOT_SIZES, DrawAction, EraseAction, EraserMode, HANDLE_REACH, ICON (+46 more)

### Community 58 - "openShareDialog"
Cohesion: 0.16
Nodes (17): openShareDialog(), changeAccess(), changeCopy(), copy(), refreshChanged(), render(), run(), setStatus() (+9 more)

### Community 59 - "odesolve.ts"
Cohesion: 0.08
Nodes (79): addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames(), constantParticular() (+71 more)

### Community 60 - "graph.ts"
Cohesion: 0.06
Nodes (40): @maxgraph/core, AT_X, cellHtml(), COMPASS, createGraph(), drawSchema(), isEdgeLook(), isNodeLook() (+32 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "FormatOptions"
Cohesion: 0.25
Nodes (17): Funzionalità, FormatOptions, bisection(), derivative(), fixedPoint(), intervalOf(), k(), newton() (+9 more)

### Community 63 - "MarkdownEditor"
Cohesion: 0.18
Nodes (4): closeMathBlockOnEnter(), EditorCallbacks, MarkdownEditor, insertTemplate()

### Community 64 - "ui/preview.ts"
Cohesion: 0.09
Nodes (22): GraphLabels, renameGraphScope(), renameScopeKeys(), BlockKind, MoveDir, draw(), drawCached(), drawn (+14 more)

### Community 65 - "conics.ts"
Cohesion: 0.20
Nodes (27): at(), centralCanonical(), Coefficients, coneCanonical(), conicOf(), det2(), det3(), determinant() (+19 more)

### Community 66 - "dialogShell"
Cohesion: 0.20
Nodes (15): SyncStatus, AccountButton, confirmAccountDeletion(), messageOf(), openAccountDialog(), openLoginDialog(), codeStep(), emailStep() (+7 more)

### Community 67 - "formatNumber"
Cohesion: 0.14
Nodes (21): FieldContext, classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX, Line, number() (+13 more)

### Community 68 - "smoke-test.mjs"
Cohesion: 0.18
Nodes (6): markdown-it, playwright-core, PNG_ICONS, fakeLlmWorker(), firstVisit(), plainContext

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "strokes.ts"
Cohesion: 0.10
Nodes (33): Prefs, BOARD_PALETTES, BoardPalette, highlightName(), inkName(), mid(), outlineSvg(), PEN_SIZE (+25 more)

### Community 72 - "latex.ts"
Cohesion: 0.12
Nodes (23): ACCENT_COMMANDS, COMPLEX_FUNCTIONS, DISTRIBUTION_LATEX, distributionLatex(), domainLatex(), fnLatex(), fnName(), formLatex() (+15 more)

### Community 73 - "dom.ts"
Cohesion: 0.13
Nodes (14): Folder, FolderGroup, groupByFolder(), loadClosedFolders(), saveClosedFolders(), Note, NoteMeta, append() (+6 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (60): primitive(), verified(), atValues(), Converter, coordinates(), decimalText(), definiteParts(), definiteValue() (+52 more)

### Community 75 - "sheet.ts"
Cohesion: 0.06
Nodes (52): Definition, Line, numericPartials(), complex, ExactComplexScope, ConicInfo, Ode, OdeFunction (+44 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.04
Nodes (67): GraphLook, ALIGN, ARROW_NAMES, AT_ICONS, AT_NAMES, BASE_PRESETS, BIG_ARROWS, DB_PRESETS (+59 more)

### Community 79 - "parseSchema"
Cohesion: 0.15
Nodes (16): schemaSummary(), svg(), hide(), OPEN, schemasForFile(), schemasFromFile(), unhide(), isRecord() (+8 more)

### Community 82 - "blockMove.ts"
Cohesion: 0.10
Nodes (35): blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove, blockPlace(), closed() (+27 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.12
Nodes (10): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+2 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.08
Nodes (24): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Deciso (5 ottobre 2026), Deciso (5 ottobre 2026) (+16 more)

### Community 91 - "spiegami-qwen.mjs"
Cohesion: 0.29
Nodes (4): vite, minutes, postMessage(), started

### Community 92 - "Costi"
Cohesion: 0.13
Nodes (12): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, Quando lo studente dice di cominciare, Account: i propri appunti su ogni dispositivo, anche da condividere, Idee per il futuro (+4 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.20
Nodes (4): device(), login(), newContext, waitFor()

### Community 97 - "Il database degli account (Supabase)"
Cohesion: 0.17
Nodes (11): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Nell'app, Note condivise con un link (+3 more)

### Community 98 - "Pt"
Cohesion: 0.15
Nodes (11): coalesced(), Finger, LassoAction, PanAction, PinchAction, pointsOf(), pressureOf(), EllipseFit (+3 more)

### Community 100 - "devDependencies"
Cohesion: 0.10
Nodes (18): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+10 more)

### Community 101 - "spell.test.ts"
Cohesion: 0.08
Nodes (23): @codemirror/lang-markdown, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt() (+15 more)

### Community 103 - "downloadText"
Cohesion: 0.23
Nodes (5): ganttWidth(), PlanView, downloadBlob(), downloadText(), fileNameFor()

### Community 104 - "Glifo"
Cohesion: 0.15
Nodes (13): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Glifo (+5 more)

### Community 105 - "vitest"
Cohesion: 0.08
Nodes (19): @codemirror/view, vite-plugin-pwa, vitest, BlockWidget, findWidgetBlocks(), guardBlocks(), KINDS, schemaBlocks() (+11 more)

### Community 106 - "fake-supabase.mjs"
Cohesion: 0.25
Nodes (6): @electric-sql/pglite, b64(), CODE, GOOGLE_CODE, ROOT, SUPABASE_URL

### Community 107 - "explainPanel.ts"
Cohesion: 0.05
Nodes (47): @mlc-ai/web-llm, Explanation, FollowUp, REPLY_TOKENS, chat(), GlifoError, Gpu, load() (+39 more)

### Community 108 - "xlsx.ts"
Cohesion: 0.06
Nodes (66): RFC-4180, fflate, saveSheetBlock(), tablesNote(), csvDelimiter(), csvToSheet(), field(), italian() (+58 more)

### Community 110 - "logo.ts"
Cohesion: 0.39
Nodes (5): BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark()

### Community 113 - "markdown.ts"
Cohesion: 0.11
Nodes (33): CalcCheck, valueNode(), EqualityCheck, markMoves(), moveAttrs(), checkHtml(), checkTitle(), cache (+25 more)

### Community 116 - "spreadsheet/editor.ts"
Cohesion: 0.06
Nodes (79): sheetSummary(), at(), breakEven(), dataLine(), dataRange(), Point, quantity(), tableItems() (+71 more)

### Community 117 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 121 - "Field"
Cohesion: 0.12
Nodes (7): characteristicPolynomial(), eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn()

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "toNode"
Cohesion: 0.08
Nodes (46): close(), Definite, definiteIntegral(), exValue(), samples(), EMPTY_SCOPE, absOf(), boundsOf() (+38 more)

### Community 125 - "sql.ts"
Cohesion: 0.17
Nodes (18): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+10 more)

### Community 129 - "graph/file.ts"
Cohesion: 0.10
Nodes (36): FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsFromFile(), OPEN, swatchSvg() (+28 more)

### Community 131 - "ICONS"
Cohesion: 0.13
Nodes (16): helpButton, openGuide(), openHelpDialog(), ICONS, HINT_MS, markSeen(), openTutorial(), show() (+8 more)

### Community 132 - "laplace.ts"
Cohesion: 0.15
Nodes (29): factoredPolynomial(), beyondPoles(), compiled(), E, exp(), fractionShown(), HALF, inverseLaplaceShown() (+21 more)

### Community 138 - "gauss.ts"
Cohesion: 0.15
Nodes (21): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexLine(), isComplexValue() (+13 more)

### Community 139 - "sidePanel.ts"
Cohesion: 0.14
Nodes (20): SuggestionItem, IndexedEntry, isConfidentAnswer(), SearchResult, CATEGORIES, symbolsInCategory(), cardPreviewTex(), formPreviewTex() (+12 more)

### Community 145 - "createFakeSupabase"
Cohesion: 0.60
Nodes (6): createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom()

## Knowledge Gaps
- **658 isolated node(s):** `session-start.sh script`, `name`, `private`, `version`, `description` (+653 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 919 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **30 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `touchlog.ts`, `graph/file.ts`, `main.ts`, `MathError`, `Parser`, `spec.ts`, `arithmetic.ts`, `num`, `graph/preview.ts`, `ICONS`, `gauss.ts`, `sidePanel.ts`, `svg.ts`, `dialogs.ts`, `SchemaEditor`, `Rational`, `SheetEditor`, `linsys.ts`, `numerical.ts`, `AiPanel`, `graphNote.test.ts`, `topics.ts`, `BoardStore`, `linear.ts`, `assistant.ts`, `h`, `several.ts`, `gantt.ts`, `plan.ts`, `logic.ts`, `NotesStore`, `complex.ts`, `namesIn`, `view3d.ts`, `statsShown.ts`, `Board`, `study.ts`, `functions.ts`, `finite.ts`, `inference.ts`, `parse.ts`, `board/shapes.ts`, `SidePanel`, `page.ts`, `schemaTools.test.ts`, `toolbar.ts`, `board.ts`, `odesolve.ts`, `graph.ts`, `FormatOptions`, `MarkdownEditor`, `ui/preview.ts`, `formatNumber`, `smoke-test.mjs`, `strokes.ts`, `symbolic.ts`, `sheet.ts`, `schema/editor.ts`, `blockMove.ts`, `Pt`, `downloadText`, `vitest`, `explainPanel.ts`, `xlsx.ts`, `markdown.ts`, `spreadsheet/editor.ts`, `toNode`?**
  _High betweenness centrality (0.142) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `touchlog.ts`, `main.ts`, `ICONS`, `sync.ts`, `num`, `Dove sono le cose`, `editor/lists.ts`, `svg.ts`, `dialogs.ts`, `sidePanel.ts`, `linsys.ts`, `graphNote.test.ts`, `BoardStore`, `linear.ts`, `assistant.ts`, `editor.test.ts`, `gantt.ts`, `plan.ts`, `search.ts`, `editor/editor.ts`, `NotesStore`, `view3d.ts`, `resize.ts`, `parse.ts`, `probability.ts`, `board/shapes.ts`, `page.ts`, `schemaTools.test.ts`, `board.ts`, `ui/preview.ts`, `strokes.ts`, `dom.ts`, `sheet.ts`, `parseSchema`, `blockMove.ts`, `spell.test.ts`, `explainPanel.ts`, `xlsx.ts`, `logo.ts`, `markdown.ts`, `spreadsheet/editor.ts`, `sql.ts`?**
  _High betweenness centrality (0.118) - this node is a cross-community bridge._
- **Why does `Sheet` connect `sheet.ts` to `MathError`, `formatNumber`, `spec.ts`, `num`, `statsShown.ts`, `Dove sono le cose`, `inference.ts`, `Rational`, `probability.ts`, `markdown.ts`, `parse.ts`, `linsys.ts`, `graphNote.test.ts`, `topics.ts`, `linear.ts`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **Are the 255 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `adoptGuestNotes()`) actually correct?**
  _`Dove sono le cose` has 255 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `name`, `private` to the rest of the system?**
  _658 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `touchlog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06721215663354763 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04103641456582633 - nodes in this community are weakly interconnected._