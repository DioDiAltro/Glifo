# Graph Report - matherdown  (2026-10-08)

## Corpus Check
- 301 files · ~587,152 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 4931 nodes · 17889 edges · 156 communities (123 shown, 33 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 566 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `4f7b0dd2`
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
- spaces.ts
- editor/lists.ts
- svg.ts
- explainPanel.ts
- SchemaEditor
- Rational
- SheetEditor
- domain.ts
- MathError
- aiPanel.test.ts
- index.ts
- engine.ts
- calcPlugin
- topics.ts
- store.ts
- linear.ts
- assistant.ts
- graph.ts
- graphNote.test.ts
- several.ts
- gantt.ts
- plan.ts
- search.ts
- editor/editor.ts
- logic.ts
- NotesStore
- complex.ts
- namesIn
- graph/space.ts
- resize.ts
- statsShown.ts
- Board
- linsys.ts
- study.ts
- functions.ts
- finite.ts
- spreadsheet.test.ts
- vitest
- distributions.ts
- board/shapes.ts
- account/space.ts
- SidePanel
- SuggestionController
- page.ts
- parse.ts
- toolbar.ts
- 20261004091555_note_condivise.sql
- selection.ts
- h
- odesolve.ts
- schema/shapes.ts
- dependencies
- view3d.ts
- .constructor
- ui/preview.ts
- toNode
- spreadsheet/editor.ts
- statsGraph.ts
- smoke-test.mjs
- Benvenuto in Glifo
- compilerOptions
- board.ts
- toLatex
- FoldersStore
- symbolic.ts
- sheet.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- schema/file.ts
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
- supabase.ts
- files.ts
- Glifo
- schemaGuard.test.ts
- fake-supabase.mjs
- localModels.ts
- xlsx.ts
- explainSubjects.ts
- markdown.ts
- spreadsheet/format.ts
- Piano per piano
- ExplainPanel
- probability.ts
- siteUpdate.ts
- Field
- Le spiegazioni, come funzionano
- fourier.ts
- tools.ts
- schema/templates.ts
- .render
- escapeHtml
- touchLog
- graph/file.ts
- tutorial.ts
- laplace.ts
- Parser
- boardTouchLog.test.ts
- host.ts
- powerseries.ts
- sidePanel.ts
- Glifo – note per Claude
- deploy.test.ts
- planBlock.ts
- grafo-html.mjs
- linear.test.ts
- createFakeSupabase
- icons.mjs
- BoardOptions

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 269 edges
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
- `Dove sono le cose` --references--> `texts()`  [INFERRED]
  ARCHITETTURA.md → tests/boardTouchLog.test.ts
- `Come viene pubblicata` --references--> `dist()`  [INFERRED]
  README.md → src/board/shapes.ts
- `Funzionalità` --references--> `k()`  [INFERRED]
  README.md → src/math/numerical.ts
- `Dove sono le cose` --references--> `adoptGuestNotes()`  [INFERRED]
  ARCHITETTURA.md → src/account/space.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (156 total, 33 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.15
Nodes (16): at(), browserStore, clip(), KINDS, LOG_KEY, Moves, MOVES_MAX, pointerDetail() (+8 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (121): DEFAULT_LOCAL_MODEL, addToGraphBlock(), graphsForFile(), hide(), account, ACCOUNT_OFF, active, aiToggle (+113 more)

### Community 3 - "compile"
Cohesion: 0.07
Nodes (57): areaFor(), constantValue(), argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot() (+49 more)

### Community 4 - "sync.ts"
Cohesion: 0.05
Nodes (38): @electric-sql/pglite, AccountSync, withLock(), Account, EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+30 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (90): formulaAtCursor(), GraphLabelLines, insertGraphBlock(), setGraphLabels(), conicItems(), isConicLine(), quadricEquation(), FieldContext (+82 more)

### Community 6 - "arithmetic.ts"
Cohesion: 0.10
Nodes (45): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+37 more)

### Community 7 - "num"
Cohesion: 0.13
Nodes (87): atIntegers(), withoutAbs(), hyperbolicToExp(), polyEx(), similarSolution(), algebraic(), bigGcd(), byParts() (+79 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (42): addLabel(), boxes, cameras, complexCoord(), coord(), drawings, drawnViews, endTex() (+34 more)

### Community 9 - "Dove sono le cose"
Cohesion: 0.09
Nodes (56): Dove sono le cose, Glifo – architettura, allNames(), answerFollowUp(), bareResult(), CHAT_SUBJECT, chatContext, chatSystemPrompt() (+48 more)

### Community 10 - "spaces.ts"
Cohesion: 0.12
Nodes (28): decimalSeparator(), Digits, FormatOptions, formatRational(), fromNumber(), fromRational(), SUPERSCRIPT, writeDigits() (+20 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.10
Nodes (56): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+48 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (54): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), dataWindow(), domainEdge() (+46 more)

### Community 13 - "explainPanel.ts"
Cohesion: 0.14
Nodes (18): ExplainTone, FollowUp, REPLY_TOKENS, LocalAbort, ChatMessage, ChatOptions, MarkdownEditor, DEFAULT_SETTINGS (+10 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.08
Nodes (12): isLanes(), SchemaEditor, withLaneContents(), createEdgeCell(), nodeLook(), nodeStyle(), turn(), EdgeLook (+4 more)

### Community 15 - "Rational"
Cohesion: 0.09
Nodes (26): Part, expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactRandom, exactRoot() (+18 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (3): rangeLabel(), SheetEditor, cloneSheet()

### Community 17 - "domain.ts"
Cohesion: 0.08
Nodes (52): constantIntegrand(), depth(), inequalityMargin(), integralRegion, LayeredSolid, multipleOf(), planeMargin(), planeParts() (+44 more)

### Community 18 - "MathError"
Cohesion: 0.13
Nodes (48): MathError, bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial() (+40 more)

### Community 19 - "aiPanel.test.ts"
Cohesion: 0.10
Nodes (23): ChatFn, definedName(), formulaTopic(), graphTopic(), numberText(), studyOf(), theoremTopic(), NoteSubject (+15 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (42): b, bigops, c, calculus, fn, fr, fractions, functions (+34 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "calcPlugin"
Cohesion: 0.21
Nodes (3): calcPlugin, CheckWidget, ResultWidget

### Community 23 - "topics.ts"
Cohesion: 0.11
Nodes (31): ATTRIBUTES, count(), cut(), ER_SHAPES, fieldText(), fitLines(), flowOrder(), formulaText() (+23 more)

### Community 24 - "store.ts"
Cohesion: 0.09
Nodes (17): EraseAction, Step, BoardBackend, BoardChange, BoardData, done(), fromRecord(), IdbBoards (+9 more)

### Community 25 - "linear.ts"
Cohesion: 0.10
Nodes (58): formatNumber(), angleBetween(), asMatrix(), basisOf(), circleText(), complexText(), cross(), Ctx (+50 more)

### Community 26 - "assistant.ts"
Cohesion: 0.15
Nodes (20): AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible(), askThroughHost() (+12 more)

### Community 27 - "graph.ts"
Cohesion: 0.11
Nodes (28): GraphLook, AT_X, cellHtml(), cellText(), COMPASS, createGraph(), drawSchema(), edgeLook() (+20 more)

### Community 28 - "graphNote.test.ts"
Cohesion: 0.06
Nodes (48): @codemirror/lang-markdown, @codemirror/state, @codemirror/view, @lezer/common, acceptCalcResult(), CalcCheck, calcOutcomes(), CalcResult (+40 more)

### Community 29 - "several.ts"
Cohesion: 0.10
Nodes (47): Piece, Condition, Family, Group, Root, Shape, fractionNear(), at() (+39 more)

### Community 30 - "gantt.ts"
Cohesion: 0.06
Nodes (61): amount(), barColor(), crossings(), dateText(), dayOf(), fitText(), GanttOptions, ganttSvg() (+53 more)

### Community 31 - "plan.ts"
Cohesion: 0.16
Nodes (17): cellText(), columnRole(), columnsOf(), durationUnit(), isNumber(), isPlanRange(), MAX_ACTIVITIES, plain() (+9 more)

### Community 32 - "search.ts"
Cohesion: 0.16
Nodes (25): SuggestionItem, editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase() (+17 more)

### Community 33 - "editor/editor.ts"
Cohesion: 0.06
Nodes (36): description, name, private, type, version, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands (+28 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "NotesStore"
Cohesion: 0.12
Nodes (12): isUuid(), newId(), createdAtFromId(), deriveTitle(), NotesStore, hasLocalStorage(), memory, migrateKeyPrefix() (+4 more)

### Community 36 - "complex.ts"
Cohesion: 0.05
Nodes (71): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexLine(), isComplexValue() (+63 more)

### Community 37 - "namesIn"
Cohesion: 0.13
Nodes (38): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+30 more)

### Community 38 - "graph/space.ts"
Cohesion: 0.11
Nodes (47): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+39 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "statsShown.ts"
Cohesion: 0.17
Nodes (31): Lin, check(), correlation(), count(), covariance(), Data, dataStatistic(), deviation() (+23 more)

### Community 42 - "linsys.ts"
Cohesion: 0.11
Nodes (46): eigenvalues(), interpolateFloat(), LinearScope, rref(), splitRoot(), choices(), gcd(), isStandardUnknown() (+38 more)

### Community 43 - "study.ts"
Cohesion: 0.17
Nodes (32): nameLatex(), Asymptote, compiled(), cutsOf(), defined(), domainOf(), exact(), inDomain() (+24 more)

### Community 44 - "functions.ts"
Cohesion: 0.09
Nodes (59): EMPTY, number(), addFormat(), divFormat(), GENERAL, mulFormat(), tidy(), withCents() (+51 more)

### Community 45 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 46 - "spreadsheet.test.ts"
Cohesion: 0.10
Nodes (34): KINDS, sheetSummary(), WidgetBlock, openSheet(), saveSheetBlock(), tablesNote(), SchemaBlock, openSheetEditor() (+26 more)

### Community 47 - "vitest"
Cohesion: 0.06
Nodes (48): vitest, staticGraphSvg(), chooseWindow(), chooseBox(), formulaGraph(), GraphItem, parseGraph(), typedSliderValue() (+40 more)

### Community 48 - "distributions.ts"
Cohesion: 0.07
Nodes (61): addExp(), choose(), continuousQuantile(), discreteQuantile(), exactIntervalProbability(), factorialBig(), FAMILIES, Family (+53 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.14
Nodes (33): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+25 more)

### Community 50 - "account/space.ts"
Cohesion: 0.09
Nodes (21): accountSpace(), adoptGuestNotes(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf(), setCurrentAccount() (+13 more)

### Community 51 - "SidePanel"
Cohesion: 0.21
Nodes (4): cleanKatexError(), displayCode(), preventFocusSteal(), SidePanel

### Community 52 - "SuggestionController"
Cohesion: 0.21
Nodes (4): EditorMathContext, expand(), preferredIndex(), SuggestionController

### Community 53 - "page.ts"
Cohesion: 0.07
Nodes (36): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), currentAccount(), PullResult, isShareToken(), parseSharedNote() (+28 more)

### Community 54 - "parse.ts"
Cohesion: 0.06
Nodes (39): hasWord(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, differentialInFraction() (+31 more)

### Community 55 - "toolbar.ts"
Cohesion: 0.19
Nodes (14): insertBlock(), wrapSelection(), Action, createToolbar(), insertCode(), insertLink(), listStyle(), MenuItem (+6 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "selection.ts"
Cohesion: 0.09
Nodes (40): centerOn(), copyStrokes(), cross(), IDENTITY, insideLasso(), keepInside(), LASSO_SHARE, lassoed() (+32 more)

### Community 58 - "h"
Cohesion: 0.06
Nodes (55): SyncStatus, board, viewSwitch, openShareDialog(), changeAccess(), changeCopy(), copy(), refreshChanged() (+47 more)

### Community 59 - "odesolve.ts"
Cohesion: 0.08
Nodes (76): addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames(), constantParticular() (+68 more)

### Community 60 - "schema/shapes.ts"
Cohesion: 0.08
Nodes (17): @maxgraph/core, ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape (+9 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "view3d.ts"
Cohesion: 0.10
Nodes (35): tickLabel(), Face, planeTolerance(), regionFaces(), surfacePlane(), Vec3, arcPoints(), arrowHead() (+27 more)

### Community 63 - ".constructor"
Cohesion: 0.18
Nodes (3): closeMathBlockOnEnter(), EditorCallbacks, tabOutOfMath()

### Community 64 - "ui/preview.ts"
Cohesion: 0.08
Nodes (24): GraphLabels, renameGraphScope(), renameScopeKeys(), BlockKind, MoveDir, draw(), drawCached(), drawn (+16 more)

### Community 65 - "toNode"
Cohesion: 0.15
Nodes (35): numShown(), polyShown(), ruffiniShown(), at(), centralCanonical(), Coefficients, coneCanonical(), conicOf() (+27 more)

### Community 66 - "spreadsheet/editor.ts"
Cohesion: 0.12
Nodes (32): currentCall(), Editing, MenuEntry, Move, PATHS, SheetEditorOptions, Snapshot, adjustFormula() (+24 more)

### Community 67 - "statsGraph.ts"
Cohesion: 0.19
Nodes (14): classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX, Line, number(), pmfBars() (+6 more)

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
Nodes (37): Action, ACTION_NAMES, DOT_SIZES, DrawAction, EraserMode, HANDLE_REACH, ICON, MODE_NAMES (+29 more)

### Community 72 - "toLatex"
Cohesion: 0.10
Nodes (37): fourierItems(), isFourierLine(), criticalLine(), isSeveralLine(), named(), severalItems(), surface(), names() (+29 more)

### Community 73 - "FoldersStore"
Cohesion: 0.06
Nodes (25): Deletion, DeletionLog, cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder() (+17 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (60): primitive(), verified(), atValues(), Converter, coordinates(), decimalText(), definiteParts(), definiteValue() (+52 more)

### Community 75 - "sheet.ts"
Cohesion: 0.06
Nodes (49): numericPartials(), complex, ExactComplexScope, ConicInfo, Ode, expSumValue(), withWorkLimit(), ExactFunction (+41 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.05
Nodes (69): laneOf(), readSchema(), schemaSummary(), alignBoxes(), Alignment, Box, distributeBoxes(), Position (+61 more)

### Community 79 - "schema/file.ts"
Cohesion: 0.18
Nodes (14): svg(), base64(), hide(), OPEN, schemasForFile(), schemasFromFile(), unhide(), crc32() (+6 more)

### Community 82 - "blockMove.ts"
Cohesion: 0.10
Nodes (34): blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove, blockPlace(), closed() (+26 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.20
Nodes (6): centerOf(), clickOn(), ffmpeg, SCENES, SIZE, work

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
Cohesion: 0.09
Nodes (16): clampZoom(), coalesced(), Finger, LassoAction, MoveAction, PanAction, penErases(), PinchAction (+8 more)

### Community 100 - "devDependencies"
Cohesion: 0.10
Nodes (18): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+10 more)

### Community 101 - "spell.test.ts"
Cohesion: 0.09
Nodes (22): misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt(), openAt() (+14 more)

### Community 102 - "supabase.ts"
Cohesion: 0.13
Nodes (29): @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken(), ensureSessionOf() (+21 more)

### Community 103 - "files.ts"
Cohesion: 0.17
Nodes (16): loadDialect(), canWriteFilesDirectly(), downloadBlob(), downloadText(), fileNameFor(), FsWindow, isAbort(), MD_TYPES (+8 more)

### Community 104 - "Glifo"
Cohesion: 0.14
Nodes (14): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Funzionalità (+6 more)

### Community 105 - "schemaGuard.test.ts"
Cohesion: 0.12
Nodes (14): toggleLinePrefix(), besideSchema(), BlockWidget, findWidgetBlocks(), guardBlocks(), schemaBlockRanges(), schemaBlocks(), create() (+6 more)

### Community 106 - "fake-supabase.mjs"
Cohesion: 0.29
Nodes (5): b64(), CODE, GOOGLE_CODE, ROOT, SUPABASE_URL

### Community 107 - "localModels.ts"
Cohesion: 0.10
Nodes (25): @mlc-ai/web-llm, chat(), GlifoError, Gpu, load(), post(), remove(), scope (+17 more)

### Community 108 - "xlsx.ts"
Cohesion: 0.10
Nodes (42): RFC-4180, fflate, csvDelimiter(), csvToSheet(), field(), italian(), parseCsv(), sheetToCsv() (+34 more)

### Community 110 - "explainSubjects.ts"
Cohesion: 0.15
Nodes (24): @codemirror/language, explainTarget, Explanation, schemaTitle(), formulasUntil(), sheetBefore(), explanationMarkdown(), hasCalculation() (+16 more)

### Community 113 - "markdown.ts"
Cohesion: 0.09
Nodes (37): bulletGroup(), sameList(), moveAttrs(), alignInside(), asciiTrim(), findMarker(), isOrdered(), listAttrs() (+29 more)

### Community 116 - "spreadsheet/format.ts"
Cohesion: 0.09
Nodes (39): at(), breakEven(), dataRange(), Point, quantity(), tableItems(), textLabel(), chartData (+31 more)

### Community 117 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 118 - "ExplainPanel"
Cohesion: 0.15
Nodes (6): MathRegion, inClaudeViewer(), ExplainChat, ExplainPanel, preventFocusSteal(), formulasSummary()

### Community 119 - "probability.ts"
Cohesion: 0.13
Nodes (24): End, CompileOptions, ExactScope, RelOp, ALL, complement(), distributionOf(), endAt() (+16 more)

### Community 120 - "siteUpdate.ts"
Cohesion: 0.16
Nodes (19): loadingEditor(), checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure (+11 more)

### Community 121 - "Field"
Cohesion: 0.13
Nodes (4): characteristicPolynomial(), Field, interpolate(), polynomialIn()

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "fourier.ts"
Cohesion: 0.24
Nodes (17): absOf(), boundsOf(), close(), definite(), fourierProblem, fourierShown(), isTrig(), isZero() (+9 more)

### Community 124 - "tools.ts"
Cohesion: 0.10
Nodes (15): ExplainEvents, ExplainStep, ALL_TOOLS, callOf(), checkTool, FormulaCheck, Identities, looseJson() (+7 more)

### Community 125 - "schema/templates.ts"
Cohesion: 0.07
Nodes (36): SchemaEditorOptions, DEFAULT_EDGE, Schema, SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), Column (+28 more)

### Community 126 - ".render"
Cohesion: 0.19
Nodes (3): strokeSummary(), handleScale(), shapePoints()

### Community 127 - "escapeHtml"
Cohesion: 0.25
Nodes (15): valueNode(), labelHtml(), texHtml(), checkHtml(), checkTitle(), cache, escapeHtml(), renderTex() (+7 more)

### Community 128 - "touchLog"
Cohesion: 0.29
Nodes (3): movesLine(), seconds(), touchLog

### Community 129 - "graph/file.ts"
Cohesion: 0.11
Nodes (33): figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsFromFile(), OPEN, swatchSvg(), titleBand() (+25 more)

### Community 131 - "tutorial.ts"
Cohesion: 0.18
Nodes (11): HINT_MS, markSeen(), openTutorial(), show(), richText(), showTutorialHint(), close(), TUTORIAL_PAGES (+3 more)

### Community 132 - "laplace.ts"
Cohesion: 0.10
Nodes (54): factoredPolynomial(), polynomialOf(), oneFraction(), beyondPoles(), compiled(), E, exp(), fractionShown() (+46 more)

### Community 136 - "boardTouchLog.test.ts"
Cohesion: 0.20
Nodes (8): isSaved(), LOG_MAX_LINES, LogStore, SavedLog, clock(), memoryStore(), newLog(), texts()

### Community 137 - "host.ts"
Cohesion: 0.23
Nodes (8): cache, capability(), ClaudeRuntime, hostDownloads, HostError, hostSample, ModelTier, runtime()

### Community 138 - "powerseries.ts"
Cohesion: 0.16
Nodes (25): exponentialForm(), fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), alternating() (+17 more)

### Community 139 - "sidePanel.ts"
Cohesion: 0.19
Nodes (13): isConfidentAnswer(), CATEGORIES, symbolsInCategory(), cardPreviewTex(), formPreviewTex(), ParsedTemplate, parseTemplate(), PLACEHOLDER_TEX (+5 more)

### Community 140 - "Glifo – note per Claude"
Cohesion: 0.22
Nodes (9): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole (+1 more)

### Community 141 - "deploy.test.ts"
Cohesion: 0.28
Nodes (4): vite-plugin-pwa, accountOffMessage(), Site, defineFor()

### Community 142 - "planBlock.ts"
Cohesion: 0.42
Nodes (8): MONTHS, parseDate(), planBlock, PlanKind, planRange(), blockLines(), GraphError, planLine()

### Community 143 - "grafo-html.mjs"
Cohesion: 0.25
Nodes (4): graphFile, names, namesFile, root

### Community 144 - "linear.test.ts"
Cohesion: 0.29
Nodes (7): EXACT, FLOAT, A, B, q(), result(), text()

### Community 145 - "createFakeSupabase"
Cohesion: 0.60
Nodes (6): createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom()

## Knowledge Gaps
- **664 isolated node(s):** `Account: i propri appunti su ogni dispositivo, anche da condividere`, `La lavagna: idee in più`, `Schemi: idee in più`, `settings`, `account` (+659 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 925 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **33 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `touchLog`, `touchlog.ts`, `main.ts`, `graph/file.ts`, `compile`, `spec.ts`, `arithmetic.ts`, `laplace.ts`, `graph/preview.ts`, `Parser`, `powerseries.ts`, `num`, `svg.ts`, `deploy.test.ts`, `planBlock.ts`, `SchemaEditor`, `SheetEditor`, `explainPanel.ts`, `MathError`, `aiPanel.test.ts`, `sidePanel.ts`, `tutorial.ts`, `topics.ts`, `linear.ts`, `assistant.ts`, `graphNote.test.ts`, `several.ts`, `gantt.ts`, `plan.ts`, `logic.ts`, `complex.ts`, `namesIn`, `graph/space.ts`, `Board`, `linsys.ts`, `study.ts`, `functions.ts`, `finite.ts`, `spreadsheet.test.ts`, `vitest`, `distributions.ts`, `board/shapes.ts`, `account/space.ts`, `SidePanel`, `boardTouchLog.test.ts`, `parse.ts`, `toolbar.ts`, `selection.ts`, `odesolve.ts`, `schema/shapes.ts`, `view3d.ts`, `.constructor`, `ui/preview.ts`, `spreadsheet/editor.ts`, `smoke-test.mjs`, `board.ts`, `toLatex`, `FoldersStore`, `symbolic.ts`, `sheet.ts`, `schema/editor.ts`, `schema/file.ts`, `blockMove.ts`, `Pt`, `supabase.ts`, `schemaGuard.test.ts`, `localModels.ts`, `xlsx.ts`, `explainSubjects.ts`, `markdown.ts`, `spreadsheet/format.ts`, `ExplainPanel`, `siteUpdate.ts`, `fourier.ts`, `.render`, `escapeHtml`?**
  _High betweenness centrality (0.174) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `touchlog.ts`, `main.ts`, `compile`, `sync.ts`, `laplace.ts`, `tutorial.ts`, `num`, `boardTouchLog.test.ts`, `Dove sono le cose`, `editor/lists.ts`, `sidePanel.ts`, `deploy.test.ts`, `explainPanel.ts`, `Rational`, `linear.test.ts`, `domain.ts`, `aiPanel.test.ts`, `store.ts`, `assistant.ts`, `graphNote.test.ts`, `gantt.ts`, `plan.ts`, `search.ts`, `editor/editor.ts`, `resize.ts`, `spreadsheet.test.ts`, `distributions.ts`, `board/shapes.ts`, `account/space.ts`, `page.ts`, `parse.ts`, `selection.ts`, `h`, `ui/preview.ts`, `board.ts`, `FoldersStore`, `sheet.ts`, `schema/editor.ts`, `schema/file.ts`, `blockMove.ts`, `spell.test.ts`, `supabase.ts`, `schemaGuard.test.ts`, `localModels.ts`, `xlsx.ts`, `markdown.ts`, `spreadsheet/format.ts`, `siteUpdate.ts`, `schema/templates.ts`?**
  _High betweenness centrality (0.127) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `main.ts`, `tutorial.ts`, `graph/preview.ts`, `sidePanel.ts`, `explainPanel.ts`, `SchemaEditor`, `SheetEditor`, `aiPanel.test.ts`, `gantt.ts`, `resize.ts`, `Board`, `SidePanel`, `page.ts`, `toolbar.ts`, `ui/preview.ts`, `spreadsheet/editor.ts`, `board.ts`, `FoldersStore`, `schema/editor.ts`, `spell.test.ts`, `files.ts`, `localModels.ts`, `ExplainPanel`, `escapeHtml`?**
  _High betweenness centrality (0.041) - this node is a cross-community bridge._
- **Are the 268 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `adoptGuestNotes()`) actually correct?**
  _`Dove sono le cose` has 268 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Account: i propri appunti su ogni dispositivo, anche da condividere`, `La lavagna: idee in più`, `Schemi: idee in più` to the rest of the system?**
  _664 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.03523734709909101 - nodes in this community are weakly interconnected._
- **Should `compile` be split into smaller, more focused modules?**
  _Cohesion score 0.07033248081841433 - nodes in this community are weakly interconnected._