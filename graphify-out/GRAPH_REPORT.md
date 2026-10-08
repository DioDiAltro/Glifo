# Graph Report - matherdown  (2026-10-08)

## Corpus Check
- 299 files · ~583,848 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 4903 nodes · 17804 edges · 145 communities (112 shown, 33 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 551 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `1b0f2b51`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- touchlog.ts
- Parser
- main.ts
- compile
- sync.ts
- spec.ts
- arithmetic.ts
- num
- graph/preview.ts
- Dove sono le cose
- math/format.ts
- editor/lists.ts
- svg.ts
- dialogs.ts
- SchemaEditor
- Rational
- SheetEditor
- Stroke
- numerical.ts
- aiPanel.test.ts
- index.ts
- engine.ts
- graphNote.test.ts
- topics.ts
- store.ts
- linear.ts
- assistant.ts
- graph.ts
- BoardStore
- several.ts
- gantt.ts
- plan.ts
- search.ts
- editor/editor.ts
- logic.ts
- NotesStore
- complex.ts
- MathError
- view3d.ts
- resize.ts
- sheet.ts
- Board
- linsys.ts
- study.ts
- functions.ts
- finite.ts
- SheetEvaluator
- parse.ts
- distributions.ts
- board/shapes.ts
- schema/templates.ts
- SidePanel
- suggestions.ts
- supabase.ts
- downloadText
- MarkdownEditor
- 20261004091555_note_condivise.sql
- board.ts
- openShareDialog
- odesolve.ts
- schema/shapes.ts
- dependencies
- limits.ts
- grafo-html.mjs
- ui/preview.ts
- conics.ts
- icons.mjs
- statsGraph.ts
- smoke-test.mjs
- Benvenuto in Glifo
- compilerOptions
- ink.ts
- toLatex
- openMenu
- symbolic.ts
- Sheet
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- spreadsheet/format.ts
- session-start.sh
- .claude/CLAUDE.md
- blockMove.ts
- tutorial.mjs
- Abbonamenti
- spiegami-qwen.mjs
- supabase-stub.sql
- account-test.mjs
- Il database degli account (Supabase)
- Pt
- Parser
- spell.test.ts
- appleTouch
- scopeWith
- schemaBlocks.ts
- fake-supabase.mjs
- explainPanel.ts
- xlsx.ts
- page.ts
- markdown.ts
- spreadsheet/editor.ts
- Piano per piano
- Costi
- Idee per il futuro
- Glifo – note per Claude
- .int
- Le spiegazioni, come funzionano
- toNode
- La lavagna
- sql.ts
- I modelli e le chiavi API
- deploy.test.ts
- graph/file.ts
- h
- laplace.ts
- severalGraph.ts
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
- `Dove sono le cose` --references--> `WidgetKind`  [INFERRED]
  ARCHITETTURA.md → src/editor/schemaBlocks.ts
- `Dove sono le cose` --references--> `texts()`  [INFERRED]
  ARCHITETTURA.md → tests/boardTouchLog.test.ts
- `Come viene pubblicata` --references--> `dist()`  [INFERRED]
  README.md → src/board/shapes.ts
- `Dove sono le cose` --references--> `fakeLlmWorker()`  [INFERRED]
  ARCHITETTURA.md → scripts/smoke-test.mjs
- `graphify` --references--> `explain()`  [INFERRED]
  CLAUDE.md → src/ai/explain.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (145 total, 33 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.09
Nodes (27): at(), browserStore, clip(), isSaved(), KINDS, LOG_KEY, LOG_MAX_LINES, LogStore (+19 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (112): addToGraphBlock(), insertGraphBlock(), graphsForFile(), remapGraphLines(), graphBlockText(), account, ACCOUNT_OFF, active (+104 more)

### Community 3 - "compile"
Cohesion: 0.08
Nodes (47): argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot(), fieldOn(), numericPartials() (+39 more)

### Community 4 - "sync.ts"
Cohesion: 0.05
Nodes (38): @electric-sql/pglite, AccountSync, withLock(), Account, EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+30 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (95): conicItems(), isConicLine(), quadricEquation(), fourierItems(), isFourierLine(), isComplexLine(), onlyComplex(), isTestLine() (+87 more)

### Community 6 - "arithmetic.ts"
Cohesion: 0.10
Nodes (49): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+41 more)

### Community 7 - "num"
Cohesion: 0.14
Nodes (86): atIntegers(), withoutAbs(), hyperbolicToExp(), polyEx(), similarSolution(), algebraic(), bigGcd(), byParts() (+78 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (38): addLabel(), boxes, cameras, complexCoord(), coord(), drawings, drawnViews, endTex() (+30 more)

### Community 9 - "Dove sono le cose"
Cohesion: 0.06
Nodes (70): Dove sono le cose, Glifo – architettura, allNames(), answerFollowUp(), bareResult(), CHAT_SUBJECT, chatContext, ChatFn (+62 more)

### Community 10 - "math/format.ts"
Cohesion: 0.33
Nodes (6): decimalSeparator(), Digits, fromNumber(), fromRational(), SUPERSCRIPT, writeDigits()

### Community 11 - "editor/lists.ts"
Cohesion: 0.08
Nodes (68): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+60 more)

### Community 12 - "svg.ts"
Cohesion: 0.08
Nodes (59): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseWindow(), chooseY(), clipLines(), dataWindow() (+51 more)

### Community 13 - "dialogs.ts"
Cohesion: 0.06
Nodes (41): EXPLAIN_TONES, DEFAULT_LOCAL_MODEL, AI_SERVICES, inClaudeViewer(), board, canWriteFilesDirectly(), FsWindow, isAbort() (+33 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.11
Nodes (3): SchemaEditor, withLaneContents(), serializeSchema()

### Community 15 - "Rational"
Cohesion: 0.09
Nodes (24): expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactRandom, exactRoot(), ExactUnavailable (+16 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (4): rangeLabel(), SheetEditor, CellRange, cloneSheet()

### Community 17 - "Stroke"
Cohesion: 0.15
Nodes (5): EraseAction, Step, shapePoints(), Box, Stroke

### Community 18 - "numerical.ts"
Cohesion: 0.08
Nodes (61): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Funzionalità (+53 more)

### Community 19 - "aiPanel.test.ts"
Cohesion: 0.09
Nodes (25): definedName(), formulaTopic(), graphTopic(), studyOf(), theoremTopic(), NoteSubject, SubjectKind, DEFAULT_SETTINGS (+17 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (39): b, bigops, c, calculus, fn, fr, fractions, functions (+31 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "graphNote.test.ts"
Cohesion: 0.05
Nodes (60): @codemirror/state, @lezer/common, explainTarget, schemaTitle(), acceptCalcResult(), calcOutcomes(), calcPlugin, CalcResult (+52 more)

### Community 23 - "topics.ts"
Cohesion: 0.10
Nodes (39): ATTRIBUTES, count(), cut(), ER_SHAPES, fieldText(), fitLines(), flowOrder(), formulaText() (+31 more)

### Community 24 - "store.ts"
Cohesion: 0.10
Nodes (14): BoardBackend, BoardChange, BoardData, done(), fromRecord(), IdbBoards, ofNote(), openBoardDatabase() (+6 more)

### Community 25 - "linear.ts"
Cohesion: 0.11
Nodes (57): angleBetween(), asMatrix(), basisOf(), circleText(), complexText(), cross(), Ctx, dataOf() (+49 more)

### Community 26 - "assistant.ts"
Cohesion: 0.10
Nodes (26): AiAnswer, AiError, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible(), askThroughHost(), checkShape() (+18 more)

### Community 27 - "graph.ts"
Cohesion: 0.09
Nodes (33): fieldInput(), isLanes(), AT_X, cellText(), COMPASS, createEdgeCell(), createGraph(), drawSchema() (+25 more)

### Community 28 - "BoardStore"
Cohesion: 0.12
Nodes (4): BoardStore, MemoryBoards, validView(), backup()

### Community 29 - "several.ts"
Cohesion: 0.14
Nodes (37): fractionNear(), at(), bounded(), Candidate, candidates(), compiled(), constraintsOf(), COORDS (+29 more)

### Community 30 - "gantt.ts"
Cohesion: 0.06
Nodes (71): amount(), barColor(), crossings(), dateText(), dayOf(), fitText(), GanttOptions, ganttSvg() (+63 more)

### Community 31 - "plan.ts"
Cohesion: 0.14
Nodes (19): NO_TABLE, number(), cellText(), columnRole(), columnsOf(), durationUnit(), isNumber(), isPlanRange() (+11 more)

### Community 32 - "search.ts"
Cohesion: 0.17
Nodes (23): editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex() (+15 more)

### Community 33 - "editor/editor.ts"
Cohesion: 0.04
Nodes (60): description, name, private, scripts, build, dev, preview, test (+52 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "NotesStore"
Cohesion: 0.05
Nodes (47): accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf() (+39 more)

### Community 36 - "complex.ts"
Cohesion: 0.08
Nodes (42): add(), allRoots(), arg(), asin(), atan(), compileApply(), compileComplex(), compileFunction() (+34 more)

### Community 37 - "MathError"
Cohesion: 0.15
Nodes (36): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+28 more)

### Community 38 - "view3d.ts"
Cohesion: 0.06
Nodes (93): staticGraphSvg(), addMesh(), addTet(), affinePlane(), Axis, Box, centroid(), chooseBox() (+85 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "sheet.ts"
Cohesion: 0.07
Nodes (59): CalcCheck, number(), Ode, OdeFunction, ExactFunction, formatNumber(), Eigenvalue, Lin (+51 more)

### Community 41 - "Board"
Cohesion: 0.10
Nodes (5): Board, BoardOptions, loadPrefs(), highlightName(), inkName()

### Community 42 - "linsys.ts"
Cohesion: 0.08
Nodes (64): formatRational(), EXACT, rref(), splitRoot(), surdText(), choices(), gcd(), isStandardUnknown() (+56 more)

### Community 43 - "study.ts"
Cohesion: 0.16
Nodes (32): limit(), Asymptote, compiled(), cutsOf(), defined(), domainOf(), exact(), inDomain() (+24 more)

### Community 44 - "functions.ts"
Cohesion: 0.09
Nodes (60): CellResult, EMPTY, evaluateSheet(), addFormat(), divFormat(), Format, most(), mulFormat() (+52 more)

### Community 45 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 46 - "SheetEvaluator"
Cohesion: 0.33
Nodes (3): SheetEvaluator, readInput(), sheetError

### Community 47 - "parse.ts"
Cohesion: 0.03
Nodes (83): vitest, GraphItem, parseGraph(), typedSliderValue(), errorMessage(), FLOAT, ACCENTS, AND_WORDS (+75 more)

### Community 48 - "distributions.ts"
Cohesion: 0.07
Nodes (62): addExp(), choose(), continuousQuantile(), discreteQuantile(), Distribution, exactIntervalProbability(), expSumValue(), factorialBig() (+54 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.12
Nodes (36): DrawAction, adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners() (+28 more)

### Community 50 - "schema/templates.ts"
Cohesion: 0.10
Nodes (18): DEFAULT_EDGE, NodeLook, SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), tableMetrics(), conceptMap (+10 more)

### Community 51 - "SidePanel"
Cohesion: 0.21
Nodes (3): displayCode(), preventFocusSteal(), SidePanel

### Community 52 - "suggestions.ts"
Cohesion: 0.19
Nodes (7): templateInsertion(), EditorMathContext, expand(), preferredIndex(), SuggestionController, commandNames(), parseTemplate()

### Community 53 - "supabase.ts"
Cohesion: 0.11
Nodes (38): @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken(), ensureSessionOf() (+30 more)

### Community 54 - "downloadText"
Cohesion: 0.23
Nodes (10): loadDialect(), base64(), crc32(), svgSize(), svgToPng(), withDensity(), downloadBlob(), downloadText() (+2 more)

### Community 55 - "MarkdownEditor"
Cohesion: 0.08
Nodes (24): ExplainTone, EditorCallbacks, MarkdownEditor, tabOutOfMath(), insertBlock(), insertTemplate(), wrapSelection(), Settings (+16 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "board.ts"
Cohesion: 0.06
Nodes (62): Action, ACTION_NAMES, coalesced(), DOT_SIZES, EraserMode, Finger, HANDLE_REACH, ICON (+54 more)

### Community 58 - "openShareDialog"
Cohesion: 0.09
Nodes (34): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), PullResult, openShareDialog(), changeAccess(), changeCopy() (+26 more)

### Community 59 - "odesolve.ts"
Cohesion: 0.08
Nodes (76): addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames(), constantParticular() (+68 more)

### Community 60 - "schema/shapes.ts"
Cohesion: 0.08
Nodes (17): @maxgraph/core, ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape (+9 more)

### Community 61 - "dependencies"
Cohesion: 0.05
Nodes (36): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+28 more)

### Community 62 - "limits.ts"
Cohesion: 0.18
Nodes (19): fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), spend(), alternating() (+11 more)

### Community 63 - "grafo-html.mjs"
Cohesion: 0.25
Nodes (4): graphFile, names, namesFile, root

### Community 64 - "ui/preview.ts"
Cohesion: 0.07
Nodes (27): svg(), GraphLabels, BlockKind, MoveDir, draw(), drawCached(), drawn, errorHtml() (+19 more)

### Community 65 - "conics.ts"
Cohesion: 0.20
Nodes (27): at(), centralCanonical(), Coefficients, coneCanonical(), conicOf(), det2(), det3(), determinant() (+19 more)

### Community 67 - "statsGraph.ts"
Cohesion: 0.24
Nodes (12): classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX, Line, number(), pmfBars() (+4 more)

### Community 68 - "smoke-test.mjs"
Cohesion: 0.29
Nodes (4): markdown-it, fakeLlmWorker(), firstVisit(), plainContext

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "ink.ts"
Cohesion: 0.15
Nodes (17): Prefs, BOARD_PALETTES, BoardPalette, BoardTheme, mid(), outlineSvg(), PEN_SIZE, shapeSvg() (+9 more)

### Community 72 - "toLatex"
Cohesion: 0.10
Nodes (41): areaFor(), condLabel(), isStraight(), isVectorName(), itemFor(), multipleLabel(), planeOf(), restrict() (+33 more)

### Community 73 - "openMenu"
Cohesion: 0.16
Nodes (6): clear(), formatDate(), MenuEntry, openMenu(), NotesPanel, NotesPanelDeps

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (64): linearIn(), primitive(), verified(), linearCells(), atValues(), cancelLinear(), Converter, coordinates() (+56 more)

### Community 75 - "Sheet"
Cohesion: 0.08
Nodes (26): Definition, Line, ExactComplexScope, ConicInfo, withWorkLimit(), FormattedResult, differentialRequest, pieces() (+18 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.05
Nodes (73): laneOf(), readSchema(), schemaSummary(), alignBoxes(), Alignment, Box, distributeBoxes(), Position (+65 more)

### Community 79 - "spreadsheet/format.ts"
Cohesion: 0.14
Nodes (29): at(), breakEven(), dataLine(), dataRange(), Point, quantity(), tableItems(), textLabel() (+21 more)

### Community 82 - "blockMove.ts"
Cohesion: 0.11
Nodes (32): blockMoveTransaction(), blank(), BlockMove, blockPlace(), closed(), closeIdx(), contentHash(), fenceClosed() (+24 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.20
Nodes (6): centerOf(), clickOn(), ffmpeg, SCENES, SIZE, work

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
Cohesion: 0.18
Nodes (10): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Nell'app, Note condivise con un link (+2 more)

### Community 98 - "Pt"
Cohesion: 0.12
Nodes (9): clampZoom(), MoveAction, PanAction, PinchAction, pressureOf(), validView(), Transform, BoardView (+1 more)

### Community 101 - "spell.test.ts"
Cohesion: 0.09
Nodes (22): misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt(), openAt() (+14 more)

### Community 103 - "scopeWith"
Cohesion: 0.08
Nodes (52): integralRegion, LayeredSolid, End, Family, axesIn(), bestAlong(), boundingBox(), combine() (+44 more)

### Community 105 - "schemaBlocks.ts"
Cohesion: 0.07
Nodes (28): InsertOptions, toggleLinePrefix(), addPlaceholders, buildDecorations(), clearAllPlaceholders(), clearPlaceholders, contains(), currentIndex() (+20 more)

### Community 106 - "fake-supabase.mjs"
Cohesion: 0.29
Nodes (5): b64(), CODE, GOOGLE_CODE, ROOT, SUPABASE_URL

### Community 107 - "explainPanel.ts"
Cohesion: 0.06
Nodes (42): @mlc-ai/web-llm, Explanation, FollowUp, REPLY_TOKENS, chat(), GlifoError, Gpu, load() (+34 more)

### Community 108 - "xlsx.ts"
Cohesion: 0.09
Nodes (41): RFC-4180, fflate, csvDelimiter(), csvToSheet(), field(), italian(), parseCsv(), sheetToCsv() (+33 more)

### Community 110 - "page.ts"
Cohesion: 0.11
Nodes (20): SharedNote, body, draw(), isDark(), saveButton, saveCopy(), settings, showProblem() (+12 more)

### Community 113 - "markdown.ts"
Cohesion: 0.11
Nodes (30): valueNode(), labelHtml(), swatchClass(), texHtml(), moveAttrs(), checkHtml(), checkTitle(), cache (+22 more)

### Community 116 - "spreadsheet/editor.ts"
Cohesion: 0.08
Nodes (57): sheetSummary(), currentCall(), Editing, MenuEntry, Move, openSheetEditor(), PATHS, SheetEditorOptions (+49 more)

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

### Community 121 - ".int"
Cohesion: 0.11
Nodes (9): characteristicPolynomial(), eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn(), quadraticIn() (+1 more)

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "toNode"
Cohesion: 0.08
Nodes (47): close(), Definite, definiteIntegral(), exValue(), samples(), EMPTY_SCOPE, absOf(), boundsOf() (+39 more)

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

### Community 129 - "graph/file.ts"
Cohesion: 0.10
Nodes (34): figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsFromFile(), hide(), OPEN, swatchSvg() (+26 more)

### Community 131 - "h"
Cohesion: 0.11
Nodes (29): SyncStatus, AccountButton, confirmAccountDeletion(), messageOf(), openAccountDialog(), openLoginDialog(), codeStep(), emailStep() (+21 more)

### Community 132 - "laplace.ts"
Cohesion: 0.10
Nodes (52): factoredPolynomial(), beyondPoles(), compiled(), E, exp(), fractionShown(), HALF, inverseLaplaceShown() (+44 more)

### Community 136 - "severalGraph.ts"
Cohesion: 0.24
Nodes (13): FieldContext, criticalLine(), named(), severalItems(), surface(), Scope, FiniteContext, partialSum() (+5 more)

### Community 138 - "gauss.ts"
Cohesion: 0.14
Nodes (22): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexValue(), isInequality() (+14 more)

### Community 139 - "sidePanel.ts"
Cohesion: 0.15
Nodes (17): AiResult, SuggestionItem, isConfidentAnswer(), CATEGORIES, symbolsInCategory(), cardPreviewTex(), formPreviewTex(), ParsedTemplate (+9 more)

### Community 145 - "createFakeSupabase"
Cohesion: 0.60
Nodes (6): createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom()

## Knowledge Gaps
- **658 isolated node(s):** `Account: i propri appunti su ogni dispositivo, anche da condividere`, `La lavagna: idee in più`, `Schemi: idee in più`, `ExplainKind`, `TopicKind` (+653 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 916 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **33 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `touchlog.ts`, `graph/file.ts`, `main.ts`, `compile`, `laplace.ts`, `spec.ts`, `arithmetic.ts`, `Parser`, `graph/preview.ts`, `severalGraph.ts`, `num`, `sidePanel.ts`, `svg.ts`, `dialogs.ts`, `SchemaEditor`, `Rational`, `SheetEditor`, `Stroke`, `numerical.ts`, `aiPanel.test.ts`, `h`, `graphNote.test.ts`, `topics.ts`, `linear.ts`, `assistant.ts`, `graph.ts`, `BoardStore`, `several.ts`, `gantt.ts`, `plan.ts`, `editor/editor.ts`, `logic.ts`, `NotesStore`, `complex.ts`, `MathError`, `view3d.ts`, `sheet.ts`, `Board`, `linsys.ts`, `study.ts`, `functions.ts`, `finite.ts`, `SheetEvaluator`, `parse.ts`, `distributions.ts`, `board/shapes.ts`, `SidePanel`, `supabase.ts`, `downloadText`, `MarkdownEditor`, `board.ts`, `odesolve.ts`, `schema/shapes.ts`, `limits.ts`, `ui/preview.ts`, `smoke-test.mjs`, `ink.ts`, `toLatex`, `symbolic.ts`, `Sheet`, `schema/editor.ts`, `spreadsheet/format.ts`, `blockMove.ts`, `Pt`, `schemaBlocks.ts`, `explainPanel.ts`, `xlsx.ts`, `markdown.ts`, `spreadsheet/editor.ts`, `toNode`, `deploy.test.ts`?**
  _High betweenness centrality (0.181) - this node is a cross-community bridge._
- **Why does `vitest` connect `parse.ts` to `touchlog.ts`, `main.ts`, `h`, `sync.ts`, `laplace.ts`, `num`, `graph/preview.ts`, `Dove sono le cose`, `editor/lists.ts`, `svg.ts`, `dialogs.ts`, `sidePanel.ts`, `Rational`, `aiPanel.test.ts`, `graphNote.test.ts`, `store.ts`, `assistant.ts`, `gantt.ts`, `plan.ts`, `search.ts`, `editor/editor.ts`, `NotesStore`, `view3d.ts`, `resize.ts`, `distributions.ts`, `board/shapes.ts`, `supabase.ts`, `MarkdownEditor`, `board.ts`, `openShareDialog`, `ui/preview.ts`, `ink.ts`, `Sheet`, `schema/editor.ts`, `spreadsheet/format.ts`, `blockMove.ts`, `spell.test.ts`, `appleTouch`, `schemaBlocks.ts`, `explainPanel.ts`, `xlsx.ts`, `page.ts`, `markdown.ts`, `spreadsheet/editor.ts`, `sql.ts`, `deploy.test.ts`?**
  _High betweenness centrality (0.133) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `main.ts`, `graph/preview.ts`, `sidePanel.ts`, `dialogs.ts`, `SchemaEditor`, `SheetEditor`, `aiPanel.test.ts`, `graph.ts`, `gantt.ts`, `NotesStore`, `resize.ts`, `Board`, `SidePanel`, `downloadText`, `MarkdownEditor`, `board.ts`, `openShareDialog`, `ui/preview.ts`, `openMenu`, `schema/editor.ts`, `spell.test.ts`, `explainPanel.ts`, `page.ts`, `spreadsheet/editor.ts`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **Are the 255 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `adoptGuestNotes()`) actually correct?**
  _`Dove sono le cose` has 255 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Account: i propri appunti su ogni dispositivo, anche da condividere`, `La lavagna: idee in più`, `Schemi: idee in più` to the rest of the system?**
  _658 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `touchlog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08653061224489796 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.03907684238132704 - nodes in this community are weakly interconnected._