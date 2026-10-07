# Graph Report - matherdown  (2026-10-07)

## Corpus Check
- 291 files · ~564,961 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 4774 nodes · 17285 edges · 141 communities (115 shown, 26 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 503 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a3ab4071`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- touchlog.ts
- parse.ts
- main.ts
- odesolve.ts
- sync.ts
- spec.ts
- Rational
- num
- graph/preview.ts
- explain.ts
- complex.ts
- editor/lists.ts
- svg.ts
- spreadsheet/editor.ts
- SchemaEditor
- conics.ts
- SheetEditor
- compile
- MathError
- markdown.ts
- index.ts
- engine.ts
- Board
- distributions.ts
- store.ts
- linear.ts
- assistant.ts
- .renderFormat
- supabase.ts
- several.ts
- gantt.ts
- view3d.ts
- spreadsheet.test.ts
- graphNote.test.ts
- logic.ts
- laplace.ts
- scopeWith
- namesIn
- explainPanel.ts
- resize.ts
- sheet.ts
- Pt
- NotesStore
- study.ts
- functions.ts
- toLatex
- probability.ts
- vitest
- schema/preview.ts
- board/shapes.ts
- schemaBlocks.ts
- exact.ts
- search.ts
- settings.ts
- toolbar.ts
- finite.ts
- 20261004091555_note_condivise.sql
- ink.ts
- schemaTools.test.ts
- grafo-html.mjs
- schema/shapes.ts
- dependencies
- FoldersStore
- .int
- ui/preview.ts
- linsys.ts
- graph.ts
- statsGraph.ts
- explainTarget
- Benvenuto in Glifo
- compilerOptions
- board.ts
- solve.ts
- blockMove.ts
- symbolic.ts
- Sheet
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- plan.ts
- session-start.sh
- .claude/CLAUDE.md
- editor.test.ts
- tutorial.mjs
- Abbonamenti
- editor/editor.ts
- supabase-stub.sql
- account-test.mjs
- Il database degli account (Supabase)
- package.json
- Parser
- spell.test.ts
- schema/templates.ts
- .constructor
- files.ts
- ExplainPanel
- fake-supabase.mjs
- logo.ts
- Dove sono le cose
- page.ts
- sidePanel.ts
- graph/file.ts
- tools.ts
- llmWorker.ts
- database.ts
- Glifo – note per Claude
- severalGraph.ts
- Le spiegazioni, come funzionano
- renderTex
- Piano per piano
- sql.ts
- Costi
- Glifo
- createFakeSupabase
- Idee per il futuro
- h
- La lavagna
- suggestions.ts
- I modelli e le chiavi API
- appleTouch

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 217 edges
2. `MathError` - 151 edges
3. `num()` - 145 edges
4. `Sheet` - 135 edges
5. `MathNode` - 129 edges
6. `mul()` - 124 edges
7. `Board` - 118 edges
8. `compile()` - 113 edges
9. `Rational` - 111 edges
10. `toLatex()` - 103 edges

## Surprising Connections (you probably didn't know these)
- `Dove sono le cose` --references--> `fakeLlmWorker()`  [INFERRED]
  ARCHITETTURA.md → scripts/smoke-test.mjs
- `Come viene pubblicata` --references--> `dist()`  [INFERRED]
  README.md → src/board/shapes.ts
- `Dove sono le cose` --references--> `WidgetKind`  [INFERRED]
  ARCHITETTURA.md → src/editor/schemaBlocks.ts
- `Dove sono le cose` --references--> `ConicElements`  [INFERRED]
  ARCHITETTURA.md → src/math/conics.ts
- `Funzionalità` --references--> `k()`  [INFERRED]
  README.md → src/math/numerical.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (141 total, 26 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.09
Nodes (27): at(), browserStore, clip(), isSaved(), KINDS, LOG_KEY, LOG_MAX_LINES, LogStore (+19 more)

### Community 1 - "parse.ts"
Cohesion: 0.07
Nodes (40): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe(), differentialInFraction() (+32 more)

### Community 2 - "main.ts"
Cohesion: 0.05
Nodes (89): graphsForFile(), hide(), planName(), account, active, app, applyAccountChange(), applySpellcheck() (+81 more)

### Community 3 - "odesolve.ts"
Cohesion: 0.08
Nodes (78): addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames(), constantParticular() (+70 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (32): AccountSync, withLock(), Account, EMPTY_STATE, FolderChange, FolderRow, isEmpty(), iso() (+24 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (98): conicItems(), isConicLine(), quadricEquation(), FieldContext, fourierItems(), isFourierLine(), isComplexLine(), isNumericalLine() (+90 more)

### Community 6 - "Rational"
Cohesion: 0.08
Nodes (51): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+43 more)

### Community 7 - "num"
Cohesion: 0.11
Nodes (99): atIntegers(), definite(), linearTrig(), signsUp(), symbolicCoefficient(), withoutAbs(), exp(), hyperbolicToExp() (+91 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (48): FIGURE_PALETTE, addLabel(), boxes, cameras, complexCoord(), containing(), coord(), drawings (+40 more)

### Community 9 - "explain.ts"
Cohesion: 0.11
Nodes (37): allNames(), ChatFn, checkSteps(), engineHints(), explain(), EXPLAIN_TONES, ExplainError, ExplainEvents (+29 more)

### Community 10 - "complex.ts"
Cohesion: 0.05
Nodes (71): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexValue(), isInequality() (+63 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.09
Nodes (61): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+53 more)

### Community 12 - "svg.ts"
Cohesion: 0.08
Nodes (54): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), dataWindow(), domainEdge() (+46 more)

### Community 13 - "spreadsheet/editor.ts"
Cohesion: 0.09
Nodes (41): sheetSummary(), currentCall(), Editing, MenuEntry, Move, openSheetEditor(), PATHS, SheetEditorOptions (+33 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.11
Nodes (4): SchemaEditor, withLaneContents(), serializeSchema(), MenuEntry

### Community 15 - "conics.ts"
Cohesion: 0.16
Nodes (30): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+22 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (8): rangeLabel(), SheetEditor, generalNumber(), serializeSheet(), sheetSize(), clearRange(), cloneSheet(), setCell()

### Community 17 - "compile"
Cohesion: 0.08
Nodes (45): argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot(), fieldOn(), numericPartials() (+37 more)

### Community 18 - "MathError"
Cohesion: 0.13
Nodes (47): MathError, bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial() (+39 more)

### Community 19 - "markdown.ts"
Cohesion: 0.19
Nodes (19): graphNames(), moveAttrs(), checkHtml(), checkTitle(), cache, escapeHtml(), renderTexOrError(), renderTexWithResult() (+11 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (40): b, bigops, c, calculus, fn, fr, fractions, functions (+32 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "Board"
Cohesion: 0.09
Nodes (4): Board, clampZoom(), validView(), shapeSvg()

### Community 23 - "distributions.ts"
Cohesion: 0.06
Nodes (62): addExp(), choose(), continuousQuantile(), discreteQuantile(), Distribution, exactIntervalProbability(), expSumValue(), factorialBig() (+54 more)

### Community 24 - "store.ts"
Cohesion: 0.07
Nodes (15): BoardBackend, BoardStore, done(), fromRecord(), IdbBoards, MemoryBoards, ofNote(), openBoardDatabase() (+7 more)

### Community 25 - "linear.ts"
Cohesion: 0.10
Nodes (60): angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, degreesText(), determinant() (+52 more)

### Community 26 - "assistant.ts"
Cohesion: 0.11
Nodes (25): @anthropic-ai/sdk, AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible() (+17 more)

### Community 27 - ".renderFormat"
Cohesion: 0.13
Nodes (16): fieldInput(), isLanes(), textWidth(), cellText(), createEdgeCell(), edgeLook(), edgeStyle(), edgeTextAt() (+8 more)

### Community 28 - "supabase.ts"
Cohesion: 0.10
Nodes (36): @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken(), ensureSessionOf() (+28 more)

### Community 29 - "several.ts"
Cohesion: 0.09
Nodes (48): Definite, Piece, LimitValue, severalLimit, Condition, Family, Group, Root (+40 more)

### Community 30 - "gantt.ts"
Cohesion: 0.05
Nodes (75): graphImagesFor(), amount(), barColor(), crossings(), dateText(), dayOf(), fitText(), GanttOptions (+67 more)

### Community 31 - "view3d.ts"
Cohesion: 0.06
Nodes (85): sampleRegion(), addMesh(), addTet(), affinePlane(), Axis, Box, centroid(), clipBy() (+77 more)

### Community 32 - "spreadsheet.test.ts"
Cohesion: 0.12
Nodes (22): evaluateSheet(), SheetEvaluator, hide(), OPEN, sheetsForFile(), sheetsFromFile(), unhide(), formatNumber() (+14 more)

### Community 33 - "graphNote.test.ts"
Cohesion: 0.06
Nodes (42): @codemirror/language, @codemirror/state, @codemirror/view, acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult (+34 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "laplace.ts"
Cohesion: 0.08
Nodes (58): factoredPolynomial(), polyShown(), close(), definiteIntegral(), exValue(), samples(), EMPTY_SCOPE, elemOf() (+50 more)

### Community 36 - "scopeWith"
Cohesion: 0.14
Nodes (33): inequalityMargin(), integralRegion, LayeredSolid, radiusOf(), spaceLayers(), spaceMargin(), spacePoint(), axesIn() (+25 more)

### Community 37 - "namesIn"
Cohesion: 0.14
Nodes (36): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+28 more)

### Community 38 - "explainPanel.ts"
Cohesion: 0.12
Nodes (19): REPLY_TOKENS, LocalAbort, localErrorMessage(), localLlm, Pending, WorkerLike, ChatMessage, ChatOptions (+11 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "sheet.ts"
Cohesion: 0.09
Nodes (51): OdeFunction, dataOf(), Lin, statisticOf(), NUMERICAL, bracketParts(), BRACKETS, CHECK_VALUES (+43 more)

### Community 41 - "Pt"
Cohesion: 0.14
Nodes (13): coalesced(), Finger, LassoAction, MoveAction, PanAction, PinchAction, pointsOf(), pressureOf() (+5 more)

### Community 42 - "NotesStore"
Cohesion: 0.08
Nodes (32): accountSpace(), adoptGuestNotes(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf(), setCurrentAccount() (+24 more)

### Community 43 - "study.ts"
Cohesion: 0.14
Nodes (36): names(), STUDY_GRAPH, studyItems(), nameLatex(), limit(), Asymptote, compiled(), cutsOf() (+28 more)

### Community 44 - "functions.ts"
Cohesion: 0.08
Nodes (71): EMPTY, number(), addFormat(), decimalsOf(), divFormat(), fixedNumber(), GENERAL, group() (+63 more)

### Community 45 - "toLatex"
Cohesion: 0.10
Nodes (32): errorMessage(), ACCENT_COMMANDS, COMPLEX_FUNCTIONS, diffLatex(), DISTRIBUTION_LATEX, distributionLatex(), domainLatex(), fnLatex() (+24 more)

### Community 46 - "probability.ts"
Cohesion: 0.09
Nodes (31): End, Family, compare(), compileCondition(), CompileOptions, ExactScope, RelOp, fractionNear() (+23 more)

### Community 47 - "vitest"
Cohesion: 0.05
Nodes (45): vite-plugin-pwa, vitest, staticGraphSvg(), chooseWindow(), specFor(), chooseBox(), GraphItem, parseGraph() (+37 more)

### Community 48 - "schema/preview.ts"
Cohesion: 0.19
Nodes (13): GraphLook, Look, Theme, draw(), drawCached(), drawn, errorHtml(), fill() (+5 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.14
Nodes (34): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+26 more)

### Community 50 - "schemaBlocks.ts"
Cohesion: 0.09
Nodes (23): InsertOptions, toggleLinePrefix(), LIST_STYLES, addPlaceholders, Placeholder, besideSchema(), BlockWidget, findWidgetBlocks() (+15 more)

### Community 51 - "exact.ts"
Cohesion: 0.15
Nodes (14): expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactFunction, ExactRandom, exactRoot() (+6 more)

### Community 52 - "search.ts"
Cohesion: 0.16
Nodes (25): editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex() (+17 more)

### Community 53 - "settings.ts"
Cohesion: 0.08
Nodes (29): ExplainTone, DEFAULT_LOCAL_MODEL, AI_SERVICES, aiSettingsOf(), addPersonalWord(), DICTIONARY_KEY, loadPersonalWords(), savePersonalWords() (+21 more)

### Community 54 - "toolbar.ts"
Cohesion: 0.09
Nodes (21): @codemirror/commands, closeMathBlockOnEnter(), EditorCallbacks, MarkdownEditor, insertBlock(), insertTemplate(), wrapSelection(), Action (+13 more)

### Community 55 - "finite.ts"
Cohesion: 0.18
Nodes (26): countOf(), Elem, elemTex(), elemText(), EMPTY, expandDots(), FiniteError, FiniteResult (+18 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "ink.ts"
Cohesion: 0.14
Nodes (17): Prefs, BOARD_PALETTES, BoardPalette, BoardTheme, inkName(), mid(), outlineSvg(), PEN_SIZE (+9 more)

### Community 58 - "schemaTools.test.ts"
Cohesion: 0.13
Nodes (24): alignBoxes(), Alignment, Box, distributeBoxes(), Position, base64(), cellHtml(), crc32() (+16 more)

### Community 59 - "grafo-html.mjs"
Cohesion: 0.15
Nodes (6): playwright-core, graphFile, names, namesFile, root, PNG_ICONS

### Community 60 - "schema/shapes.ts"
Cohesion: 0.08
Nodes (17): @maxgraph/core, ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape (+9 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "FoldersStore"
Cohesion: 0.08
Nodes (16): cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder(), loadClosedFolders(), RemoteFolder (+8 more)

### Community 63 - ".int"
Cohesion: 0.11
Nodes (8): characteristicPolynomial(), eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn(), R()

### Community 64 - "ui/preview.ts"
Cohesion: 0.11
Nodes (13): GraphLabels, BlockKind, MoveDir, hydrateSheets(), BLOCK_NAMES, blockKindOf(), MOVABLE_BLOCKS, moveButtonsHtml() (+5 more)

### Community 65 - "linsys.ts"
Cohesion: 0.08
Nodes (59): Eigenvalue, LinearValue, Mat, rref(), choices(), gcd(), linearSystem(), matrixEquation() (+51 more)

### Community 66 - "graph.ts"
Cohesion: 0.11
Nodes (20): AT_X, COMPASS, createGraph(), drawSchema(), insertSchema(), isEdgeLook(), isNodeLook(), loadSchema() (+12 more)

### Community 67 - "statsGraph.ts"
Cohesion: 0.18
Nodes (17): isTestLine(), number(), testItems(), classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX (+9 more)

### Community 68 - "explainTarget"
Cohesion: 0.47
Nodes (6): explainTarget, targetAt(), calculationRequest(), solveRequest(), Asked, target()

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "board.ts"
Cohesion: 0.06
Nodes (65): Action, ACTION_NAMES, DOT_SIZES, DrawAction, EraseAction, EraserMode, HANDLE_REACH, ICON (+57 more)

### Community 72 - "solve.ts"
Cohesion: 0.08
Nodes (54): fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), decimalSeparator(), Digits (+46 more)

### Community 73 - "blockMove.ts"
Cohesion: 0.11
Nodes (34): blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove, blockPlace(), closed() (+26 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (64): absOf(), splitAbs(), linearIn(), linearCells(), atValues(), Converter, coordinates(), decimalText() (+56 more)

### Community 75 - "Sheet"
Cohesion: 0.08
Nodes (25): ExactComplexScope, Ode, withWorkLimit(), FiniteContext, FormattedResult, differentialRequest, pieces(), MathNode (+17 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.05
Nodes (54): schemaSummary(), svg(), ALIGN, ARROW_NAMES, AT_ICONS, AT_NAMES, BASE_PRESETS, BIG_ARROWS (+46 more)

### Community 79 - "plan.ts"
Cohesion: 0.08
Nodes (43): at(), breakEven(), dataLine(), dataRange(), Point, quantity(), tableItems(), textLabel() (+35 more)

### Community 82 - "editor.test.ts"
Cohesion: 0.09
Nodes (22): tabOutOfMath(), templateInsertion(), commandTokenAt(), isInCode(), mathContextAt(), openMathBefore(), buildDecorations(), clearAllPlaceholders() (+14 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.20
Nodes (6): centerOf(), clickOn(), ffmpeg, SCENES, SIZE, work

### Community 90 - "Abbonamenti"
Cohesion: 0.14
Nodes (14): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+6 more)

### Community 91 - "editor/editor.ts"
Cohesion: 0.16
Nodes (19): @lezer/highlight, highlight, italianPhrases, listMarkers, lineDepth(), mathDelimTag, mathMarkdown, mathTag (+11 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.20
Nodes (4): device(), login(), newContext, waitFor()

### Community 97 - "Il database degli account (Supabase)"
Cohesion: 0.18
Nodes (10): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Nell'app, Note condivise con un link (+2 more)

### Community 98 - "package.json"
Cohesion: 0.04
Nodes (43): description, devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript (+35 more)

### Community 101 - "spell.test.ts"
Cohesion: 0.07
Nodes (27): @codemirror/lang-markdown, noIndentedCode, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close() (+19 more)

### Community 102 - "schema/templates.ts"
Cohesion: 0.10
Nodes (18): DEFAULT_EDGE, NodeLook, SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), tableMetrics(), conceptMap (+10 more)

### Community 103 - ".constructor"
Cohesion: 0.18
Nodes (3): BoardOptions, loadPrefs(), highlightName()

### Community 104 - "files.ts"
Cohesion: 0.24
Nodes (13): inClaudeViewer(), canWriteFilesDirectly(), FsWindow, isAbort(), MD_TYPES, OPEN_TYPES, OpenedFile, openMarkdownFiles() (+5 more)

### Community 105 - "ExplainPanel"
Cohesion: 0.20
Nodes (7): Explanation, explanationMarkdown(), ExplainPanel, preventFocusSteal(), sentenceHtml(), texHtml(), setup()

### Community 106 - "fake-supabase.mjs"
Cohesion: 0.29
Nodes (5): b64(), CODE, GOOGLE_CODE, ROOT, SUPABASE_URL

### Community 107 - "logo.ts"
Cohesion: 0.33
Nodes (6): sidebarToggle(), BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark()

### Community 108 - "Dove sono le cose"
Cohesion: 0.07
Nodes (58): Dove sono le cose, Glifo – architettura, RFC-4180, fflate, openSheet(), saveSheetBlock(), tablesNote(), csvDelimiter() (+50 more)

### Community 110 - "page.ts"
Cohesion: 0.06
Nodes (46): katex, AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), currentAccount(), PullResult, openShareDialog() (+38 more)

### Community 113 - "sidePanel.ts"
Cohesion: 0.20
Nodes (14): SuggestionItem, CATEGORIES, cardPreviewTex(), formPreviewTex(), ParsedTemplate, parseTemplate(), PLACEHOLDER_TEX, placeholderPreview() (+6 more)

### Community 116 - "graph/file.ts"
Cohesion: 0.11
Nodes (34): figureName(), graphFigure(), graphImage(), graphsFromFile(), OPEN, swatchSvg(), titleBand(), unhide() (+26 more)

### Community 117 - "tools.ts"
Cohesion: 0.13
Nodes (12): ExplainStep, ALL_TOOLS, callOf(), checkTool, FormulaCheck, Identities, looseJson(), repairTex() (+4 more)

### Community 118 - "llmWorker.ts"
Cohesion: 0.26
Nodes (12): @mlc-ai/web-llm, chat(), GlifoError, Gpu, load(), post(), remove(), scope (+4 more)

### Community 119 - "database.ts"
Cohesion: 0.24
Nodes (6): @electric-sql/pglite, createDatabase(), createUser(), databaseTests(), migrations, shareTests()

### Community 120 - "Glifo – note per Claude"
Cohesion: 0.22
Nodes (9): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole (+1 more)

### Community 121 - "severalGraph.ts"
Cohesion: 0.54
Nodes (7): criticalLine(), isSeveralLine(), named(), severalItems(), surface(), optimumOf(), severalOf()

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "renderTex"
Cohesion: 0.24
Nodes (5): cleanKatexError(), renderTex(), displayCode(), preventFocusSteal(), SidePanel

### Community 124 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 125 - "sql.ts"
Cohesion: 0.15
Nodes (19): SchemaEditorOptions, Schema, Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey() (+11 more)

### Community 126 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, Quando lo studente dice di cominciare

### Community 127 - "Glifo"
Cohesion: 0.14
Nodes (14): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Funzionalità (+6 more)

### Community 128 - "createFakeSupabase"
Cohesion: 0.60
Nodes (6): createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 129 - "Idee per il futuro"
Cohesion: 0.33
Nodes (6): Account: i propri appunti su ogni dispositivo, anche da condividere, Idee per il futuro, In programma, La lavagna: idee in più, Più avanti, Schemi: idee in più

### Community 131 - "h"
Cohesion: 0.07
Nodes (52): SyncStatus, aiService, board, viewSwitch, openSignedOut(), printButton(), ShareDialogDeps, AccountButton (+44 more)

### Community 132 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 133 - "suggestions.ts"
Cohesion: 0.20
Nodes (4): EditorMathContext, expand(), preferredIndex(), SuggestionController

### Community 136 - "I modelli e le chiavi API"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), In prova sul ramo `prova` (7 ottobre 2026): Qwen3 nel browser per «Spiegami», Le idee dello studente (5 ottobre 2026)

## Knowledge Gaps
- **639 isolated node(s):** `session-start.sh script`, `name`, `private`, `version`, `description` (+634 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 889 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **26 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `touchlog.ts`, `parse.ts`, `main.ts`, `odesolve.ts`, `h`, `spec.ts`, `Rational`, `num`, `graph/preview.ts`, `explain.ts`, `complex.ts`, `svg.ts`, `spreadsheet/editor.ts`, `SchemaEditor`, `conics.ts`, `SheetEditor`, `compile`, `MathError`, `markdown.ts`, `Board`, `distributions.ts`, `store.ts`, `linear.ts`, `assistant.ts`, `.renderFormat`, `supabase.ts`, `several.ts`, `gantt.ts`, `view3d.ts`, `spreadsheet.test.ts`, `graphNote.test.ts`, `logic.ts`, `laplace.ts`, `namesIn`, `explainPanel.ts`, `sheet.ts`, `Pt`, `NotesStore`, `study.ts`, `functions.ts`, `vitest`, `board/shapes.ts`, `schemaBlocks.ts`, `exact.ts`, `settings.ts`, `toolbar.ts`, `finite.ts`, `schemaTools.test.ts`, `schema/shapes.ts`, `ui/preview.ts`, `linsys.ts`, `explainTarget`, `board.ts`, `blockMove.ts`, `symbolic.ts`, `Sheet`, `schema/editor.ts`, `plan.ts`, `package.json`, `logo.ts`, `graph/file.ts`, `llmWorker.ts`?**
  _High betweenness centrality (0.172) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `touchlog.ts`, `parse.ts`, `main.ts`, `h`, `sync.ts`, `num`, `graph/preview.ts`, `appleTouch`, `explain.ts`, `editor/lists.ts`, `svg.ts`, `spreadsheet/editor.ts`, `distributions.ts`, `store.ts`, `linear.ts`, `assistant.ts`, `supabase.ts`, `gantt.ts`, `view3d.ts`, `spreadsheet.test.ts`, `graphNote.test.ts`, `explainPanel.ts`, `resize.ts`, `NotesStore`, `toLatex`, `schema/preview.ts`, `board/shapes.ts`, `schemaBlocks.ts`, `search.ts`, `settings.ts`, `toolbar.ts`, `ink.ts`, `schemaTools.test.ts`, `FoldersStore`, `linsys.ts`, `board.ts`, `blockMove.ts`, `Sheet`, `schema/editor.ts`, `plan.ts`, `editor.test.ts`, `package.json`, `spell.test.ts`, `logo.ts`, `Dove sono le cose`, `page.ts`, `sidePanel.ts`, `graph/file.ts`, `database.ts`, `sql.ts`?**
  _High betweenness centrality (0.121) - this node is a cross-community bridge._
- **Why does `Rational` connect `Rational` to `odesolve.ts`, `spec.ts`, `num`, `complex.ts`, `conics.ts`, `MathError`, `distributions.ts`, `linear.ts`, `several.ts`, `laplace.ts`, `sheet.ts`, `study.ts`, `probability.ts`, `exact.ts`, `finite.ts`, `.int`, `linsys.ts`, `solve.ts`, `symbolic.ts`, `Sheet`?**
  _High betweenness centrality (0.035) - this node is a cross-community bridge._
- **Are the 216 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `adoptGuestNotes()`) actually correct?**
  _`Dove sono le cose` has 216 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `name`, `private` to the rest of the system?**
  _639 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `touchlog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08653061224489796 - nodes in this community are weakly interconnected._
- **Should `parse.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0744792762465811 - nodes in this community are weakly interconnected._