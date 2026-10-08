# Graph Report - matherdown  (2026-10-08)

## Corpus Check
- 297 files · ~580,146 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 4879 nodes · 17689 edges · 139 communities (112 shown, 27 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 549 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `5af306b2`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- touchlog.ts
- parse.ts
- main.ts
- compile
- sync.ts
- spec.ts
- arithmetic.ts
- num
- graph/preview.ts
- explain.ts
- formatNumber
- editor/lists.ts
- svg.ts
- settings.ts
- SchemaEditor
- Rational
- SheetEditor
- fourier.ts
- MathError
- aiPanel.test.ts
- index.ts
- client.ts
- Stroke
- Dove sono le cose
- IdbBoards
- linear.ts
- assistant.ts
- .renderFormat
- linsys.ts
- several.ts
- gantt.ts
- view3d.ts
- search.ts
- editor/editor.ts
- logic.ts
- NotesStore
- complex.ts
- namesIn
- llmWorker.ts
- resize.ts
- statsShown.ts
- Board
- solve.ts
- study.ts
- functions.ts
- graph/file.ts
- plan.ts
- vitest
- probability.ts
- board/shapes.ts
- schemaBlocks.ts
- sidePanel.ts
- MarkdownEditor
- supabase.ts
- parseSchema
- toolbar.ts
- 20261004091555_note_condivise.sql
- selection.ts
- tutorial.ts
- odesolve.ts
- graph.ts
- dependencies
- package.json
- .constructor
- ui/preview.ts
- conics.ts
- icons.mjs
- inference.ts
- smoke-test.mjs
- Benvenuto in Glifo
- compilerOptions
- board.ts
- toLatex
- .folderItem
- symbolic.ts
- sheet.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- chart.ts
- session-start.sh
- .claude/CLAUDE.md
- blockMove.ts
- tutorial.mjs
- Abbonamenti
- spiegami-qwen.mjs
- supabase-stub.sql
- account-test.mjs
- Il database degli account (Supabase)
- tools.ts
- Parser
- spellcheck.ts
- Glifo
- createFakeSupabase
- files.ts
- engine.ts
- fake-supabase.mjs
- localModels.ts
- xlsx.ts
- page.ts
- markdown.ts
- spreadsheet/editor.ts
- Piano per piano
- Costi
- Idee per il futuro
- Glifo – note per Claude
- Field
- Le spiegazioni, come funzionano
- schemaTools.test.ts
- La lavagna
- sql.ts
- I modelli e le chiavi API
- deploy.test.ts
- BoardStore
- h
- converse
- BoardOptions
- numerical.test.ts
- explainPanel.ts

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 255 edges
2. `MathError` - 151 edges
3. `num()` - 145 edges
4. `Sheet` - 139 edges
5. `MathNode` - 129 edges
6. `mul()` - 124 edges
7. `Board` - 118 edges
8. `compile()` - 113 edges
9. `Rational` - 111 edges
10. `toLatex()` - 103 edges

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

## Communities (139 total, 27 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.09
Nodes (27): at(), browserStore, clip(), isSaved(), KINDS, LOG_KEY, LOG_MAX_LINES, LogStore (+19 more)

### Community 1 - "parse.ts"
Cohesion: 0.05
Nodes (67): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+59 more)

### Community 2 - "main.ts"
Cohesion: 0.05
Nodes (85): graphsForFile(), hide(), account, ACCOUNT_OFF, active, aiToggle, app, applySpellcheck() (+77 more)

### Community 3 - "compile"
Cohesion: 0.05
Nodes (94): conicItems(), FieldContext, argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot() (+86 more)

### Community 4 - "sync.ts"
Cohesion: 0.05
Nodes (37): AccountSync, withLock(), Account, EMPTY_STATE, FolderChange, FolderRow, isEmpty(), iso() (+29 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (107): isConicLine(), quadricEquation(), fourierItems(), isFourierLine(), isComplexLine(), onlyComplex(), isTestLine(), constantIntegrand() (+99 more)

### Community 6 - "arithmetic.ts"
Cohesion: 0.07
Nodes (83): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+75 more)

### Community 7 - "num"
Cohesion: 0.13
Nodes (87): atIntegers(), signsUp(), symbolicCoefficient(), withoutAbs(), exp(), hyperbolicToExp(), inverseRational(), sqrtEx() (+79 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (47): FIGURE_PALETTE, addLabel(), boxes, cameras, complexCoord(), coord(), drawings, drawnViews (+39 more)

### Community 9 - "explain.ts"
Cohesion: 0.11
Nodes (39): allNames(), ChatFn, checkSteps(), checkTopicFormula(), checkTopicSteps(), engineHints(), explain(), EXPLAIN_TONES (+31 more)

### Community 10 - "formatNumber"
Cohesion: 0.10
Nodes (40): decimalSeparator(), Digits, formatNumber(), FormatOptions, formatRational(), fromNumber(), fromRational(), SUPERSCRIPT (+32 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.08
Nodes (66): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+58 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (55): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), dataWindow(), domainEdge() (+47 more)

### Community 13 - "settings.ts"
Cohesion: 0.11
Nodes (22): DEFAULT_LOCAL_MODEL, addPersonalWord(), DICTIONARY_KEY, loadPersonalWords(), savePersonalWords(), tidy(), ACCOUNT_SETTINGS, accountSettings() (+14 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.11
Nodes (4): isLanes(), SchemaEditor, withLaneContents(), serializeSchema()

### Community 15 - "Rational"
Cohesion: 0.11
Nodes (20): expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactRandom, exactRoot(), factorialExact() (+12 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (6): rangeLabel(), SheetEditor, CellRange, clearRange(), cloneSheet(), setCell()

### Community 17 - "fourier.ts"
Cohesion: 0.25
Nodes (15): absOf(), boundsOf(), close(), definite(), fourierProblem, fourierShown(), isTrig(), isZero() (+7 more)

### Community 18 - "MathError"
Cohesion: 0.12
Nodes (51): isNumericalLine(), numericalItems(), MathError, bisection(), cholesky(), condition(), derivative(), exactPolynomial() (+43 more)

### Community 19 - "aiPanel.test.ts"
Cohesion: 0.10
Nodes (21): definedName(), formulaTopic(), graphTopic(), numberText(), studyOf(), theoremTopic(), NoteSubject, SubjectKind (+13 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (41): b, bigops, c, calculus, fn, fr, fractions, functions (+33 more)

### Community 21 - "client.ts"
Cohesion: 0.10
Nodes (14): Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download(), fetchDictionary() (+6 more)

### Community 22 - "Stroke"
Cohesion: 0.14
Nodes (4): inkName(), shapeSvg(), shapePoints(), Stroke

### Community 23 - "Dove sono le cose"
Cohesion: 0.08
Nodes (48): Dove sono le cose, Glifo – architettura, ATTRIBUTES, count(), cut(), ER_SHAPES, fieldText(), fitLines() (+40 more)

### Community 24 - "IdbBoards"
Cohesion: 0.07
Nodes (13): BoardBackend, done(), fromRecord(), IdbBoards, MemoryBoards, ofNote(), openBoardDatabase(), openDefault() (+5 more)

### Community 25 - "linear.ts"
Cohesion: 0.10
Nodes (60): angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, dataOf(), determinant() (+52 more)

### Community 26 - "assistant.ts"
Cohesion: 0.09
Nodes (29): @anthropic-ai/sdk, AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible() (+21 more)

### Community 27 - ".renderFormat"
Cohesion: 0.18
Nodes (12): fieldInput(), createEdgeCell(), edgeLook(), edgeStyle(), edgeTextAt(), insertSchema(), nodeLook(), nodeStyle() (+4 more)

### Community 28 - "linsys.ts"
Cohesion: 0.14
Nodes (39): choices(), gcd(), matrixEquation(), matrixSystem(), minorsGcd(), ONE, parametricRows(), parametricSystem() (+31 more)

### Community 29 - "several.ts"
Cohesion: 0.08
Nodes (54): EMPTY_SCOPE, Piece, Condition, Family, Group, Root, Shape, convergesAt() (+46 more)

### Community 30 - "gantt.ts"
Cohesion: 0.06
Nodes (70): amount(), barColor(), crossings(), dateText(), dayOf(), fitText(), GanttOptions, ganttSvg() (+62 more)

### Community 31 - "view3d.ts"
Cohesion: 0.06
Nodes (80): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+72 more)

### Community 32 - "search.ts"
Cohesion: 0.17
Nodes (24): editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex() (+16 more)

### Community 33 - "editor/editor.ts"
Cohesion: 0.05
Nodes (57): @codemirror/lang-markdown, @codemirror/language, @codemirror/state, @codemirror/view, @lezer/highlight, highlight, italianPhrases, addToGraphBlock() (+49 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "NotesStore"
Cohesion: 0.05
Nodes (48): accountSpace(), adoptGuestNotes(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf(), setCurrentAccount() (+40 more)

### Community 36 - "complex.ts"
Cohesion: 0.05
Nodes (72): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexValue(), isInequality() (+64 more)

### Community 37 - "namesIn"
Cohesion: 0.14
Nodes (36): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+28 more)

### Community 38 - "llmWorker.ts"
Cohesion: 0.29
Nodes (11): chat(), GlifoError, Gpu, load(), post(), remove(), scope, shaderF16() (+3 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "statsShown.ts"
Cohesion: 0.18
Nodes (30): check(), correlation(), count(), covariance(), Data, dataStatistic(), deviation(), fail() (+22 more)

### Community 41 - "Board"
Cohesion: 0.09
Nodes (14): Board, clampZoom(), coalesced(), EraseAction, Finger, LassoAction, MoveAction, pointsOf() (+6 more)

### Community 42 - "solve.ts"
Cohesion: 0.17
Nodes (25): LinearScope, isStandardUnknown(), linearSystem(), endAt(), breaks(), cubeRoot(), equation(), holds() (+17 more)

### Community 43 - "study.ts"
Cohesion: 0.17
Nodes (32): nameLatex(), Asymptote, compiled(), cutsOf(), defined(), domainOf(), exact(), inDomain() (+24 more)

### Community 44 - "functions.ts"
Cohesion: 0.09
Nodes (59): EMPTY, number(), addFormat(), divFormat(), GENERAL, mulFormat(), tidy(), withCents() (+51 more)

### Community 45 - "graph/file.ts"
Cohesion: 0.11
Nodes (36): figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsFromFile(), OPEN, swatchSvg(), titleBand() (+28 more)

### Community 46 - "plan.ts"
Cohesion: 0.16
Nodes (18): formatValue(), cellText(), columnRole(), columnsOf(), durationUnit(), isNumber(), isPlanRange(), MAX_ACTIVITIES (+10 more)

### Community 47 - "vitest"
Cohesion: 0.07
Nodes (39): vitest, staticGraphSvg(), chooseWindow(), containing(), chooseBox(), surfacePlane(), GraphItem, parseGraph() (+31 more)

### Community 48 - "probability.ts"
Cohesion: 0.06
Nodes (62): addExp(), choose(), continuousQuantile(), discreteQuantile(), Distribution, End, exactIntervalProbability(), factorialBig() (+54 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (35): DrawAction, adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners() (+27 more)

### Community 50 - "schemaBlocks.ts"
Cohesion: 0.11
Nodes (19): toggleLinePrefix(), besideSchema(), BlockWidget, findWidgetBlocks(), guardBlocks(), KINDS, schemaBlockRanges(), schemaBlocks() (+11 more)

### Community 51 - "sidePanel.ts"
Cohesion: 0.08
Nodes (25): formulaAtCursor(), insertGraphBlock(), SuggestionItem, graphBlockText(), insertGraph(), tools, cleanKatexError(), renderTex() (+17 more)

### Community 52 - "MarkdownEditor"
Cohesion: 0.08
Nodes (15): @codemirror/commands, ExplainTone, closeMathBlockOnEnter(), EditorCallbacks, MarkdownEditor, tabOutOfMath(), insertTemplate(), EditorMathContext (+7 more)

### Community 53 - "supabase.ts"
Cohesion: 0.12
Nodes (31): @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken(), ensureSessionOf() (+23 more)

### Community 54 - "parseSchema"
Cohesion: 0.10
Nodes (26): readSchema(), schemaSummary(), svg(), GraphLook, hide(), OPEN, schemasForFile(), schemasFromFile() (+18 more)

### Community 55 - "toolbar.ts"
Cohesion: 0.19
Nodes (15): insertBlock(), wrapSelection(), Action, createToolbar(), insertCode(), insertLink(), listMenu(), listStyle() (+7 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "selection.ts"
Cohesion: 0.09
Nodes (39): centerOn(), copyStrokes(), cross(), IDENTITY, insideLasso(), keepInside(), LASSO_SHARE, lassoed() (+31 more)

### Community 58 - "tutorial.ts"
Cohesion: 0.15
Nodes (14): helpButton, openGuide(), HINT_MS, markSeen(), openTutorial(), show(), richText(), showTutorialHint() (+6 more)

### Community 59 - "odesolve.ts"
Cohesion: 0.08
Nodes (83): linearIn(), termTransform(), addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled() (+75 more)

### Community 60 - "graph.ts"
Cohesion: 0.05
Nodes (42): @maxgraph/core, AT_X, cellHtml(), cellText(), COMPASS, createGraph(), drawSchema(), isEdgeLook() (+34 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "package.json"
Cohesion: 0.05
Nodes (38): description, devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript (+30 more)

### Community 64 - "ui/preview.ts"
Cohesion: 0.11
Nodes (13): GraphLabels, BlockKind, fill(), hydrateSchemas(), hydrateSheets(), BLOCK_NAMES, blockKindOf(), MOVABLE_BLOCKS (+5 more)

### Community 65 - "conics.ts"
Cohesion: 0.18
Nodes (29): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+21 more)

### Community 67 - "inference.ts"
Cohesion: 0.10
Nodes (37): number(), testItems(), classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX, Line (+29 more)

### Community 68 - "smoke-test.mjs"
Cohesion: 0.29
Nodes (4): markdown-it, fakeLlmWorker(), firstVisit(), plainContext

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "board.ts"
Cohesion: 0.07
Nodes (43): Action, ACTION_NAMES, DOT_SIZES, EraserMode, HANDLE_REACH, ICON, MODE_NAMES, PanAction (+35 more)

### Community 72 - "toLatex"
Cohesion: 0.10
Nodes (34): criticalLine(), named(), severalItems(), surface(), names(), STUDY_GRAPH, studyItems(), ACCENT_COMMANDS (+26 more)

### Community 73 - ".folderItem"
Cohesion: 0.20
Nodes (4): clear(), formatDate(), NotesPanel, NotesPanelDeps

### Community 74 - "symbolic.ts"
Cohesion: 0.06
Nodes (65): fnLabel(), primitive(), verified(), linearCells(), atValues(), cancelLinear(), Converter, coordinates() (+57 more)

### Community 75 - "sheet.ts"
Cohesion: 0.05
Nodes (60): ExactComplexScope, formatGauss(), formatList(), Ode, OdeFunction, expSumValue(), withWorkLimit(), ExactFunction (+52 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.04
Nodes (62): ALIGN, ARROW_NAMES, AT_ICONS, AT_NAMES, BASE_PRESETS, BIG_ARROWS, DB_PRESETS, Direction (+54 more)

### Community 79 - "chart.ts"
Cohesion: 0.14
Nodes (28): at(), breakEven(), dataLine(), dataRange(), Point, tableItems(), textLabel(), chartData (+20 more)

### Community 82 - "blockMove.ts"
Cohesion: 0.09
Nodes (38): blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove, blockPlace(), closed() (+30 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.12
Nodes (10): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+2 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.14
Nodes (14): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+6 more)

### Community 91 - "spiegami-qwen.mjs"
Cohesion: 0.29
Nodes (4): vite, minutes, postMessage(), started

### Community 96 - "account-test.mjs"
Cohesion: 0.20
Nodes (4): device(), login(), newContext, waitFor()

### Community 97 - "Il database degli account (Supabase)"
Cohesion: 0.17
Nodes (11): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Nell'app, Note condivise con un link (+3 more)

### Community 98 - "tools.ts"
Cohesion: 0.16
Nodes (11): ALL_TOOLS, callOf(), checkTool, Identities, looseJson(), repairTex(), resultOf(), runTool() (+3 more)

### Community 101 - "spellcheck.ts"
Cohesion: 0.11
Nodes (19): misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt(), openAt() (+11 more)

### Community 102 - "Glifo"
Cohesion: 0.14
Nodes (14): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Funzionalità (+6 more)

### Community 103 - "createFakeSupabase"
Cohesion: 0.60
Nodes (6): createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 104 - "files.ts"
Cohesion: 0.24
Nodes (13): inClaudeViewer(), canWriteFilesDirectly(), FsWindow, isAbort(), MD_TYPES, OPEN_TYPES, OpenedFile, openMarkdownFiles() (+5 more)

### Community 105 - "engine.ts"
Cohesion: 0.17
Nodes (9): @farscrl/hunspell-wasm, capitalize(), COMMON_FIXES, ELISIONS, inGlossary(), lower(), SpellEngine, GLOSSARY (+1 more)

### Community 106 - "fake-supabase.mjs"
Cohesion: 0.25
Nodes (6): @electric-sql/pglite, b64(), CODE, GOOGLE_CODE, ROOT, SUPABASE_URL

### Community 107 - "localModels.ts"
Cohesion: 0.14
Nodes (16): @mlc-ai/web-llm, LocalAbort, localErrorMessage(), localLlm, Pending, WorkerLike, ChatMessage, ChatOptions (+8 more)

### Community 108 - "xlsx.ts"
Cohesion: 0.08
Nodes (45): RFC-4180, fflate, csvDelimiter(), csvToSheet(), field(), italian(), parseCsv(), sheetToCsv() (+37 more)

### Community 110 - "page.ts"
Cohesion: 0.06
Nodes (51): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), currentAccount(), PullResult, openShareDialog(), changeAccess() (+43 more)

### Community 113 - "markdown.ts"
Cohesion: 0.10
Nodes (32): checkHtml(), checkTitle(), cache, escapeHtml(), renderTexOrError(), renderTexWithResult(), TexRender, configurePurify() (+24 more)

### Community 116 - "spreadsheet/editor.ts"
Cohesion: 0.07
Nodes (62): sheetSummary(), quantity(), tablesNote(), currentCall(), Editing, MenuEntry, Move, openSheetEditor() (+54 more)

### Community 117 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 118 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, Quando lo studente dice di cominciare

### Community 119 - "Idee per il futuro"
Cohesion: 0.33
Nodes (6): Account: i propri appunti su ogni dispositivo, anche da condividere, Idee per il futuro, In programma, La lavagna: idee in più, Più avanti, Schemi: idee in più

### Community 120 - "Glifo – note per Claude"
Cohesion: 0.22
Nodes (9): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole (+1 more)

### Community 121 - "Field"
Cohesion: 0.14
Nodes (3): Field, interpolate(), polynomialIn()

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "schemaTools.test.ts"
Cohesion: 0.20
Nodes (13): alignBoxes(), Alignment, Box, distributeBoxes(), Position, base64(), crc32(), svgSize() (+5 more)

### Community 124 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 125 - "sql.ts"
Cohesion: 0.17
Nodes (17): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+9 more)

### Community 126 - "I modelli e le chiavi API"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), In prova sul ramo `prova` (7 ottobre 2026): Qwen3 nel browser per «Spiegami», Le idee dello studente (5 ottobre 2026)

### Community 127 - "deploy.test.ts"
Cohesion: 0.28
Nodes (4): vite-plugin-pwa, accountOffMessage(), Site, defineFor()

### Community 129 - "BoardStore"
Cohesion: 0.18
Nodes (3): BoardStore, applyAccountChange(), backup()

### Community 131 - "h"
Cohesion: 0.08
Nodes (47): SyncStatus, planName(), accountProblem(), board, downloadAccountData(), viewSwitch, openSignedOut(), printButton() (+39 more)

### Community 136 - "converse"
Cohesion: 0.14
Nodes (11): Conversation, converse(), ExplainError, ExplainEvents, said(), tooLong(), wrongs(), SheetFactory (+3 more)

### Community 138 - "numerical.test.ts"
Cohesion: 0.60
Nodes (3): result(), text(), verdict()

### Community 141 - "explainPanel.ts"
Cohesion: 0.05
Nodes (47): @lezer/common, explainTarget, Explanation, REPLY_TOKENS, schemaTitle(), acceptCalcResult(), CalcCheck, calcOutcomes() (+39 more)

## Knowledge Gaps
- **657 isolated node(s):** `Account: i propri appunti su ogni dispositivo, anche da condividere`, `La lavagna: idee in più`, `Schemi: idee in più`, `STUDY`, `SPACES` (+652 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 913 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **27 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `touchlog.ts`, `BoardStore`, `main.ts`, `compile`, `parse.ts`, `spec.ts`, `arithmetic.ts`, `num`, `converse`, `explain.ts`, `graph/preview.ts`, `h`, `svg.ts`, `explainPanel.ts`, `SchemaEditor`, `settings.ts`, `SheetEditor`, `fourier.ts`, `MathError`, `aiPanel.test.ts`, `Stroke`, `linear.ts`, `assistant.ts`, `.renderFormat`, `linsys.ts`, `several.ts`, `gantt.ts`, `view3d.ts`, `editor/editor.ts`, `logic.ts`, `NotesStore`, `complex.ts`, `namesIn`, `llmWorker.ts`, `Board`, `study.ts`, `functions.ts`, `graph/file.ts`, `plan.ts`, `vitest`, `board/shapes.ts`, `schemaBlocks.ts`, `sidePanel.ts`, `MarkdownEditor`, `supabase.ts`, `toolbar.ts`, `selection.ts`, `tutorial.ts`, `odesolve.ts`, `graph.ts`, `ui/preview.ts`, `conics.ts`, `inference.ts`, `smoke-test.mjs`, `symbolic.ts`, `sheet.ts`, `schema/editor.ts`, `chart.ts`, `blockMove.ts`, `files.ts`, `localModels.ts`, `xlsx.ts`, `markdown.ts`, `spreadsheet/editor.ts`, `schemaTools.test.ts`, `deploy.test.ts`?**
  _High betweenness centrality (0.168) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `touchlog.ts`, `parse.ts`, `main.ts`, `compile`, `sync.ts`, `num`, `graph/preview.ts`, `explain.ts`, `numerical.test.ts`, `editor/lists.ts`, `svg.ts`, `settings.ts`, `explainPanel.ts`, `aiPanel.test.ts`, `IdbBoards`, `linear.ts`, `assistant.ts`, `linsys.ts`, `gantt.ts`, `search.ts`, `editor/editor.ts`, `NotesStore`, `resize.ts`, `plan.ts`, `probability.ts`, `board/shapes.ts`, `schemaBlocks.ts`, `sidePanel.ts`, `MarkdownEditor`, `supabase.ts`, `parseSchema`, `selection.ts`, `tutorial.ts`, `package.json`, `board.ts`, `sheet.ts`, `chart.ts`, `blockMove.ts`, `localModels.ts`, `xlsx.ts`, `page.ts`, `markdown.ts`, `spreadsheet/editor.ts`, `schemaTools.test.ts`, `sql.ts`, `deploy.test.ts`?**
  _High betweenness centrality (0.134) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `main.ts`, `graph/preview.ts`, `explainPanel.ts`, `SchemaEditor`, `SheetEditor`, `aiPanel.test.ts`, `Stroke`, `.renderFormat`, `gantt.ts`, `NotesStore`, `resize.ts`, `sidePanel.ts`, `toolbar.ts`, `tutorial.ts`, `.constructor`, `ui/preview.ts`, `board.ts`, `.folderItem`, `schema/editor.ts`, `spellcheck.ts`, `page.ts`, `spreadsheet/editor.ts`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Are the 254 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `adoptGuestNotes()`) actually correct?**
  _`Dove sono le cose` has 254 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Account: i propri appunti su ogni dispositivo, anche da condividere`, `La lavagna: idee in più`, `Schemi: idee in più` to the rest of the system?**
  _657 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `touchlog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08653061224489796 - nodes in this community are weakly interconnected._
- **Should `parse.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.053714285714285714 - nodes in this community are weakly interconnected._