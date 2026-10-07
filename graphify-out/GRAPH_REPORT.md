# Graph Report - matherdown  (2026-10-07)

## Corpus Check
- 281 files · ~549,330 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 4618 nodes · 16809 edges · 136 communities (110 shown, 26 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 517 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `fb0d9db6`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- touchlog.ts
- Parser
- main.ts
- num
- sync.ts
- spec.ts
- several.ts
- primitive.ts
- graph/preview.ts
- vitest
- complex.ts
- editor/lists.ts
- svg.ts
- spreadsheet/editor.ts
- SchemaEditor
- conics.ts
- SheetEditor
- compile
- numerical.ts
- markdown.ts
- index.ts
- engine.ts
- Board
- distributions.ts
- store.ts
- MathError
- assistant.ts
- downloadText
- supabase.ts
- toLatex
- gantt.ts
- graph/space.ts
- Dove sono le cose
- calcResults.ts
- logic.ts
- linsys.ts
- arithmetic.ts
- namesIn
- schemaGuard.test.ts
- resize.ts
- formatNumber
- schemaTools.test.ts
- NotesStore
- study.ts
- functions.ts
- plan.ts
- Stroke
- parse.ts
- probability.ts
- board/shapes.ts
- tidy
- Rational
- search.ts
- dialogs.ts
- dialogShell
- finite.ts
- 20261004091555_note_condivise.sql
- board.ts
- Field
- grafo-html.mjs
- graph.ts
- dependencies
- FoldersStore
- Le spiegazioni, come funzionano
- ui/preview.ts
- spaces.ts
- parseSchema
- statsGraph.ts
- view3d.ts
- Benvenuto in Glifo
- compilerOptions
- selection.ts
- Piano per piano
- blockMove.ts
- symbolic.ts
- sheet.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- spreadsheet/format.ts
- session-start.sh
- .claude/CLAUDE.md
- editor/editor.ts
- tutorial.mjs
- Abbonamenti
- touchLog
- Costi
- supabase-stub.sql
- account-test.mjs
- Il database degli account (Supabase)
- package.json
- Parser
- spell.test.ts
- toolbar.ts
- numericalGraph.ts
- schedule.ts
- icons.mjs
- fake-supabase.mjs
- limits.ts
- xlsx.ts
- Glifo – note per Claude
- openShareDialog
- boardTouchLog.test.ts
- sidePanel.ts
- graph/file.ts
- solve.ts
- HighlightColor
- SheetModel
- renderTex
- SlotWidget
- sql.ts
- page.ts
- Glifo
- createFakeSupabase
- smoke-test.mjs
- h
- SuggestionController

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 202 edges
2. `MathError` - 151 edges
3. `num()` - 145 edges
4. `Sheet` - 129 edges
5. `MathNode` - 128 edges
6. `mul()` - 124 edges
7. `Board` - 118 edges
8. `compile()` - 113 edges
9. `Rational` - 111 edges
10. `toLatex()` - 101 edges

## Surprising Connections (you probably didn't know these)
- `Dove sono le cose` --references--> `ConicElements`  [INFERRED]
  ARCHITETTURA.md → src/math/conics.ts
- `Dove sono le cose` --references--> `texts()`  [INFERRED]
  ARCHITETTURA.md → tests/boardTouchLog.test.ts
- `Funzionalità` --references--> `k()`  [INFERRED]
  README.md → src/math/numerical.ts
- `Come viene pubblicata` --references--> `dist()`  [INFERRED]
  README.md → src/board/shapes.ts
- `Dove sono le cose` --references--> `adoptGuestNotes()`  [INFERRED]
  ARCHITETTURA.md → src/account/space.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (136 total, 26 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.15
Nodes (16): at(), browserStore, clip(), KINDS, LOG_KEY, Moves, MOVES_MAX, pointerDetail() (+8 more)

### Community 2 - "main.ts"
Cohesion: 0.05
Nodes (99): setCurrentAccount(), deleteAccount(), addToGraphBlock(), account, accountButton, accountProblem(), active, app (+91 more)

### Community 3 - "num"
Cohesion: 0.08
Nodes (91): linearIn(), termTransform(), addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled() (+83 more)

### Community 4 - "sync.ts"
Cohesion: 0.05
Nodes (39): @electric-sql/pglite, AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow (+31 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (109): formulaAtCursor(), GraphLabelLines, setGraphLabels(), mathRegionAt(), isConicLine(), quadricEquation(), isFourierLine(), isComplexLine() (+101 more)

### Community 6 - "several.ts"
Cohesion: 0.09
Nodes (49): Definite, Piece, LimitValue, severalLimit, Condition, Family, Group, Root (+41 more)

### Community 7 - "primitive.ts"
Cohesion: 0.15
Nodes (66): polyEx(), pscale(), algebraic(), bigGcd(), byParts(), candidates(), canon(), combineLogs() (+58 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (43): FIGURE_PALETTE, addLabel(), boxes, cameras, complexCoord(), containing(), coord(), drawings (+35 more)

### Community 9 - "vitest"
Cohesion: 0.05
Nodes (51): vitest, staticGraphSvg(), chooseWindow(), SliderState, Box, chooseBox(), GraphItem, parseGraph() (+43 more)

### Community 10 - "complex.ts"
Cohesion: 0.06
Nodes (56): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexValue(), isInequality() (+48 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.09
Nodes (61): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+53 more)

### Community 12 - "svg.ts"
Cohesion: 0.08
Nodes (57): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), dataWindow(), domainEdge() (+49 more)

### Community 13 - "spreadsheet/editor.ts"
Cohesion: 0.09
Nodes (52): tablesNote(), currentCall(), Editing, MenuEntry, Move, openSheetEditor(), PATHS, decimalsOf() (+44 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.10
Nodes (5): isLanes(), SchemaEditor, withLaneContents(), NodeLook, serializeSchema()

### Community 15 - "conics.ts"
Cohesion: 0.18
Nodes (29): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+21 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (4): rangeLabel(), SheetEditor, CellRange, cloneSheet()

### Community 17 - "compile"
Cohesion: 0.05
Nodes (83): integralRegion, areaFor(), constantValue(), argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension() (+75 more)

### Community 18 - "numerical.ts"
Cohesion: 0.12
Nodes (47): bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial(), interpolating() (+39 more)

### Community 19 - "markdown.ts"
Cohesion: 0.09
Nodes (37): lineDepth(), parseBlockMath(), dataRange(), checkHtml(), checkTitle(), cache, escapeHtml(), renderTexMathml() (+29 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (41): b, bigops, c, calculus, fn, fr, fractions, functions (+33 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "Board"
Cohesion: 0.09
Nodes (5): Board, clampZoom(), loadPrefs(), validView(), highlightName()

### Community 23 - "distributions.ts"
Cohesion: 0.07
Nodes (61): addExp(), choose(), continuousQuantile(), discreteQuantile(), exactIntervalProbability(), expSumValue(), factorialBig(), FAMILIES (+53 more)

### Community 24 - "store.ts"
Cohesion: 0.06
Nodes (18): fake-indexeddb, BoardBackend, BoardChange, BoardData, BoardStore, done(), fromRecord(), IdbBoards (+10 more)

### Community 25 - "MathError"
Cohesion: 0.10
Nodes (65): MathError, nameLabel(), UndefinedName, angleBetween(), asMatrix(), basisOf(), circleText(), cross() (+57 more)

### Community 26 - "assistant.ts"
Cohesion: 0.10
Nodes (27): AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible(), askThroughHost() (+19 more)

### Community 27 - "downloadText"
Cohesion: 0.33
Nodes (6): loadDialect(), svgSize(), svgToPng(), downloadBlob(), downloadText(), fileNameFor()

### Community 28 - "supabase.ts"
Cohesion: 0.12
Nodes (30): @supabase/supabase-js, AUTH_STORAGE_KEY, accountError, appUrl(), call(), currentSession(), emailLinkToken(), ensureSessionOf() (+22 more)

### Community 29 - "toLatex"
Cohesion: 0.09
Nodes (38): conicItems(), FieldContext, fourierItems(), criticalLine(), named(), severalItems(), surface(), names() (+30 more)

### Community 30 - "gantt.ts"
Cohesion: 0.07
Nodes (53): amount(), barColor(), crossings(), dateText(), dayOf(), fitText(), GanttOptions, ganttSvg() (+45 more)

### Community 31 - "graph/space.ts"
Cohesion: 0.12
Nodes (48): LayeredSolid, addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon() (+40 more)

### Community 32 - "Dove sono le cose"
Cohesion: 0.10
Nodes (30): Dove sono le cose, Glifo – architettura, findWidgetBlocks(), guardBlocks(), KINDS, sheetSummary(), WidgetBlock, WidgetKind (+22 more)

### Community 33 - "calcResults.ts"
Cohesion: 0.11
Nodes (15): acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult, calcResults(), CheckWidget, formulasUntil() (+7 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "linsys.ts"
Cohesion: 0.16
Nodes (37): choices(), gcd(), matrixEquation(), matrixSystem(), minorsGcd(), ONE, parametricRows(), parametricSystem() (+29 more)

### Community 36 - "arithmetic.ts"
Cohesion: 0.07
Nodes (71): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+63 more)

### Community 37 - "namesIn"
Cohesion: 0.14
Nodes (35): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+27 more)

### Community 38 - "schemaGuard.test.ts"
Cohesion: 0.11
Nodes (13): toggleLinePrefix(), LIST_STYLES, besideSchema(), BlockWidget, schemaBlockRanges(), schemaBlocks(), create(), heading() (+5 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "formatNumber"
Cohesion: 0.14
Nodes (37): formatNumber(), complexText(), formatEigenvalues(), Lin, check(), correlation(), count(), covariance() (+29 more)

### Community 41 - "schemaTools.test.ts"
Cohesion: 0.14
Nodes (22): alignBoxes(), Alignment, Box, distributeBoxes(), Position, crc32(), withDensity(), labelHtml() (+14 more)

### Community 42 - "NotesStore"
Cohesion: 0.08
Nodes (28): accountSpace(), adoptGuestNotes(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf(), Deletion (+20 more)

### Community 43 - "study.ts"
Cohesion: 0.16
Nodes (33): nameLatex(), limit(), Asymptote, compiled(), cutsOf(), defined(), domainOf(), exact() (+25 more)

### Community 44 - "functions.ts"
Cohesion: 0.09
Nodes (60): EMPTY, number(), addFormat(), divFormat(), GENERAL, most(), mulFormat(), tidy() (+52 more)

### Community 45 - "plan.ts"
Cohesion: 0.16
Nodes (17): cellText(), columnRole(), columnsOf(), durationUnit(), isNumber(), isPlanRange(), MAX_ACTIVITIES, plain() (+9 more)

### Community 46 - "Stroke"
Cohesion: 0.14
Nodes (14): BOARD_PALETTES, BoardTheme, inkName(), mid(), outlineSvg(), PEN_SIZE, shapeSvg(), strokeOptions() (+6 more)

### Community 47 - "parse.ts"
Cohesion: 0.06
Nodes (37): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, differentialInFraction(), DISTRIBUTION_EXAMPLES (+29 more)

### Community 48 - "probability.ts"
Cohesion: 0.13
Nodes (24): End, CompileOptions, ExactScope, RelOp, fractionNear(), ALL, complement(), endAt() (+16 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.14
Nodes (34): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+26 more)

### Community 50 - "tidy"
Cohesion: 0.10
Nodes (48): factorShown(), homogeneous(), homogeneousParts(), monomial(), numShown(), polyPart(), sumShown(), termPowers() (+40 more)

### Community 51 - "Rational"
Cohesion: 0.09
Nodes (28): evaluateExactComplex(), exactSqrt(), unavailable(), expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact() (+20 more)

### Community 52 - "search.ts"
Cohesion: 0.17
Nodes (24): editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex() (+16 more)

### Community 53 - "dialogs.ts"
Cohesion: 0.08
Nodes (38): AI_SERVICES, aiService, inClaudeViewer(), canWriteFilesDirectly(), FsWindow, isAbort(), MD_TYPES, OPEN_TYPES (+30 more)

### Community 54 - "dialogShell"
Cohesion: 0.20
Nodes (15): SyncStatus, AccountButton, confirmAccountDeletion(), messageOf(), openAccountDialog(), openLoginDialog(), codeStep(), emailStep() (+7 more)

### Community 55 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "board.ts"
Cohesion: 0.05
Nodes (39): Action, ACTION_NAMES, BoardOptions, coalesced(), DOT_SIZES, DrawAction, EraseAction, EraserMode (+31 more)

### Community 58 - "Field"
Cohesion: 0.13
Nodes (6): eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn()

### Community 59 - "grafo-html.mjs"
Cohesion: 0.25
Nodes (4): graphFile, names, namesFile, root

### Community 60 - "graph.ts"
Cohesion: 0.06
Nodes (40): @maxgraph/core, AT_X, cellHtml(), cellText(), COMPASS, createEdgeCell(), createGraph(), drawSchema() (+32 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (25): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+17 more)

### Community 62 - "FoldersStore"
Cohesion: 0.07
Nodes (20): cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder(), loadClosedFolders(), RemoteFolder (+12 more)

### Community 63 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 64 - "ui/preview.ts"
Cohesion: 0.08
Nodes (24): GraphLabels, renameGraphScope(), renameScopeKeys(), BlockKind, MoveDir, draw(), drawCached(), drawn (+16 more)

### Community 65 - "spaces.ts"
Cohesion: 0.12
Nodes (28): decimalSeparator(), Digits, FormatOptions, formatRational(), fromNumber(), fromRational(), SUPERSCRIPT, writeDigits() (+20 more)

### Community 66 - "parseSchema"
Cohesion: 0.12
Nodes (21): schemaSummary(), svg(), SchemaEditorOptions, base64(), hide(), OPEN, schemasForFile(), schemasFromFile() (+13 more)

### Community 67 - "statsGraph.ts"
Cohesion: 0.18
Nodes (16): number(), testItems(), classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX, Line (+8 more)

### Community 68 - "view3d.ts"
Cohesion: 0.09
Nodes (34): Detail, Face, FAST, FINE, planeTolerance(), Plane, Vec3, arcPoints() (+26 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "selection.ts"
Cohesion: 0.09
Nodes (37): centerOn(), copyStrokes(), cross(), IDENTITY, insideLasso(), keepInside(), LASSO_SHARE, lassoed() (+29 more)

### Community 72 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 73 - "blockMove.ts"
Cohesion: 0.11
Nodes (34): blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove, blockPlace(), closed() (+26 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.06
Nodes (68): primitive(), verified(), linearCells(), atValues(), cancelLinear(), combine(), commonMonomial(), commonPositive() (+60 more)

### Community 75 - "sheet.ts"
Cohesion: 0.06
Nodes (51): numericPartials(), complex, ExactComplexScope, Ode, OdeFunction, withWorkLimit(), ExactFunction, FiniteContext (+43 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.05
Nodes (61): ALIGN, ARROW_NAMES, AT_ICONS, AT_NAMES, BASE_PRESETS, BIG_ARROWS, DB_PRESETS, Direction (+53 more)

### Community 79 - "spreadsheet/format.ts"
Cohesion: 0.13
Nodes (29): at(), breakEven(), Point, quantity(), tableItems(), textLabel(), chartData, chartFrom() (+21 more)

### Community 82 - "editor/editor.ts"
Cohesion: 0.06
Nodes (49): @codemirror/lang-markdown, @codemirror/language, @codemirror/state, @codemirror/view, @lezer/highlight, highlight, italianPhrases, InsertOptions (+41 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.20
Nodes (6): centerOf(), clickOn(), ffmpeg, SCENES, SIZE, work

### Community 90 - "Abbonamenti"
Cohesion: 0.09
Nodes (23): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Deciso (5 ottobre 2026), Deciso (5 ottobre 2026) (+15 more)

### Community 91 - "touchLog"
Cohesion: 0.29
Nodes (3): movesLine(), seconds(), touchLog

### Community 92 - "Costi"
Cohesion: 0.13
Nodes (12): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, Quando lo studente dice di cominciare, Account: i propri appunti su ogni dispositivo, anche da condividere, Idee per il futuro (+4 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.20
Nodes (4): device(), login(), newContext, waitFor()

### Community 97 - "Il database degli account (Supabase)"
Cohesion: 0.17
Nodes (11): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Nell'app, Note condivise con un link (+3 more)

### Community 98 - "package.json"
Cohesion: 0.05
Nodes (40): description, devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript (+32 more)

### Community 101 - "spell.test.ts"
Cohesion: 0.09
Nodes (22): misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt(), openAt() (+14 more)

### Community 102 - "toolbar.ts"
Cohesion: 0.08
Nodes (23): @codemirror/commands, closeMathBlockOnEnter(), EditorCallbacks, MarkdownEditor, tabOutOfMath(), insertBlock(), insertTemplate(), wrapSelection() (+15 more)

### Community 103 - "numericalGraph.ts"
Cohesion: 0.80
Nodes (4): isNumericalLine(), numericalItems(), isPlottedNumerical(), numericalPlot()

### Community 104 - "schedule.ts"
Cohesion: 0.18
Nodes (17): checkGiven(), criticalPaths(), key(), Link, LinkType, listText(), offset(), order() (+9 more)

### Community 106 - "fake-supabase.mjs"
Cohesion: 0.29
Nodes (5): b64(), CODE, GOOGLE_CODE, ROOT, SUPABASE_URL

### Community 107 - "limits.ts"
Cohesion: 0.23
Nodes (15): exponentialForm(), fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), close() (+7 more)

### Community 108 - "xlsx.ts"
Cohesion: 0.07
Nodes (58): RFC-4180, fflate, csvDelimiter(), csvToSheet(), field(), italian(), parseCsv(), sheetToCsv() (+50 more)

### Community 109 - "Glifo – note per Claude"
Cohesion: 0.22
Nodes (9): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole (+1 more)

### Community 110 - "openShareDialog"
Cohesion: 0.09
Nodes (31): SUPABASE_KEY, SUPABASE_URL, accountDataFile(), PullResult, openShareDialog(), changeAccess(), changeCopy(), copy() (+23 more)

### Community 111 - "boardTouchLog.test.ts"
Cohesion: 0.20
Nodes (8): isSaved(), LOG_MAX_LINES, LogStore, SavedLog, clock(), memoryStore(), newLog(), texts()

### Community 113 - "sidePanel.ts"
Cohesion: 0.24
Nodes (13): SuggestionItem, CATEGORIES, cardPreviewTex(), formPreviewTex(), ParsedTemplate, parseTemplate(), PLACEHOLDER_TEX, placeholderPreview() (+5 more)

### Community 116 - "graph/file.ts"
Cohesion: 0.10
Nodes (38): figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsForFile(), graphsFromFile(), hide(), OPEN (+30 more)

### Community 117 - "solve.ts"
Cohesion: 0.18
Nodes (24): LinearScope, isStandardUnknown(), linearSystem(), breaks(), cubeRoot(), equation(), holds(), inequality() (+16 more)

### Community 121 - "HighlightColor"
Cohesion: 0.47
Nodes (6): Prefs, BoardPalette, SizeChoice, BackupBoard, HighlightColor, InkColor

### Community 122 - "SheetModel"
Cohesion: 0.40
Nodes (4): SheetEditorOptions, Snapshot, SheetModel, XlsxSheet

### Community 123 - "renderTex"
Cohesion: 0.19
Nodes (8): insertGraphBlock(), cleanKatexError(), renderTex(), isConfidentAnswer(), symbolsInCategory(), clear(), preventFocusSteal(), SidePanel

### Community 125 - "sql.ts"
Cohesion: 0.17
Nodes (17): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+9 more)

### Community 126 - "page.ts"
Cohesion: 0.10
Nodes (22): katex, currentAccount(), SharedNote, body, draw(), isDark(), load(), saveButton (+14 more)

### Community 127 - "Glifo"
Cohesion: 0.15
Nodes (13): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Funzionalità (+5 more)

### Community 128 - "createFakeSupabase"
Cohesion: 0.60
Nodes (6): createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 129 - "smoke-test.mjs"
Cohesion: 0.29
Nodes (4): markdown-it, vite, firstVisit(), plainContext

### Community 131 - "h"
Cohesion: 0.09
Nodes (22): viewSwitch, fieldInput(), isNodeLook(), nodeLook(), EdgeLook, same(), h(), icon() (+14 more)

### Community 133 - "SuggestionController"
Cohesion: 0.20
Nodes (4): EditorMathContext, expand(), preferredIndex(), SuggestionController

## Knowledge Gaps
- **624 isolated node(s):** `Comandi`, `Promemoria per lo studente`, `Regole`, `Condividere una nota con un link`, `Provarlo sul tuo computer` (+619 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 860 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **26 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `touchlog.ts`, `Parser`, `main.ts`, `num`, `.exportBoards`, `spec.ts`, `several.ts`, `primitive.ts`, `graph/preview.ts`, `vitest`, `complex.ts`, `h`, `svg.ts`, `spreadsheet/editor.ts`, `SchemaEditor`, `conics.ts`, `SheetEditor`, `compile`, `numerical.ts`, `markdown.ts`, `Board`, `distributions.ts`, `store.ts`, `MathError`, `assistant.ts`, `downloadText`, `supabase.ts`, `toLatex`, `gantt.ts`, `graph/space.ts`, `logic.ts`, `linsys.ts`, `arithmetic.ts`, `namesIn`, `formatNumber`, `schemaTools.test.ts`, `NotesStore`, `study.ts`, `functions.ts`, `plan.ts`, `Stroke`, `parse.ts`, `board/shapes.ts`, `tidy`, `dialogs.ts`, `finite.ts`, `board.ts`, `graph.ts`, `ui/preview.ts`, `selection.ts`, `blockMove.ts`, `symbolic.ts`, `sheet.ts`, `schema/editor.ts`, `spreadsheet/format.ts`, `touchLog`, `toolbar.ts`, `numericalGraph.ts`, `schedule.ts`, `xlsx.ts`, `boardTouchLog.test.ts`, `graph/file.ts`?**
  _High betweenness centrality (0.175) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `touchlog.ts`, `h`, `sync.ts`, `primitive.ts`, `editor/lists.ts`, `svg.ts`, `spreadsheet/editor.ts`, `compile`, `markdown.ts`, `distributions.ts`, `store.ts`, `MathError`, `assistant.ts`, `supabase.ts`, `gantt.ts`, `schemaGuard.test.ts`, `resize.ts`, `schemaTools.test.ts`, `NotesStore`, `plan.ts`, `Stroke`, `parse.ts`, `board/shapes.ts`, `Rational`, `search.ts`, `dialogs.ts`, `board.ts`, `FoldersStore`, `ui/preview.ts`, `parseSchema`, `selection.ts`, `blockMove.ts`, `sheet.ts`, `spreadsheet/format.ts`, `editor/editor.ts`, `package.json`, `spell.test.ts`, `toolbar.ts`, `xlsx.ts`, `openShareDialog`, `boardTouchLog.test.ts`, `sidePanel.ts`, `sql.ts`, `page.ts`?**
  _High betweenness centrality (0.107) - this node is a cross-community bridge._
- **Why does `Board` connect `Board` to `HighlightColor`, `main.ts`, `selection.ts`, `Stroke`, `board.ts`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **Are the 201 inferred relationships involving `Dove sono le cose` (e.g. with `adoptGuestNotes()` and `sharedLinks()`) actually correct?**
  _`Dove sono le cose` has 201 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Comandi`, `Promemoria per lo studente`, `Regole` to the rest of the system?**
  _624 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.045366795366795366 - nodes in this community are weakly interconnected._
- **Should `num` be split into smaller, more focused modules?**
  _Cohesion score 0.08289536550406115 - nodes in this community are weakly interconnected._