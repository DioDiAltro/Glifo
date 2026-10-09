# Graph Report - matherdown  (2026-10-09)

## Corpus Check
- 320 files · ~611,720 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5099 nodes · 18411 edges · 156 communities (121 shown, 35 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 598 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9ced817b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- touchlog.ts
- parse.ts
- main.ts
- compile
- sync.ts
- spec.ts
- spreadsheet/evaluate.ts
- mul
- graph/preview.ts
- explain.ts
- plan.ts
- editor/lists.ts
- svg.ts
- statsGraph.ts
- SchemaEditor
- Board
- SheetEditor
- editor/editor.ts
- MathError
- arithmetic.ts
- index.ts
- engine.ts
- topics.ts
- parseSchema
- store.ts
- linear.ts
- Rational
- assistant.ts
- laplace.ts
- toNode
- gantt.ts
- devDependencies
- search.ts
- spell.test.ts
- logic.ts
- graph.ts
- complex.ts
- namesIn
- supabase.ts
- resize.ts
- openShareDialog
- FoldersStore
- several.ts
- study.ts
- functions.ts
- finite.ts
- NotesStore
- view3d.ts
- distributions.ts
- board/shapes.ts
- markdown.ts
- SidePanel
- Pt
- feedback.ts
- aiPanel.test.ts
- ui/preview.ts
- 20261004091555_note_condivise.sql
- strokes.ts
- src/relocation.ts
- num
- Glifo
- dependencies
- h
- vitest
- explainSubjects.ts
- Piano per piano
- spreadsheet/editor.ts
- blockMove.ts
- smoke-test.mjs
- Benvenuto in Glifo
- compilerOptions
- relocation-test.mjs
- probability.ts
- MarkdownEditor
- symbolic.ts
- sidePanel.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- toolbar.ts
- session-start.sh
- .claude/CLAUDE.md
- restore.test.ts
- tutorial.mjs
- Abbonamenti
- explainPanel.ts
- Costi
- supabase-stub.sql
- account-test.mjs
- sheet.ts
- board.ts
- ui/relocation.ts
- linsys.ts
- Field
- siteUpdate.ts
- SuggestionController
- Dove sono le cose
- Stroke
- localModels.ts
- xlsx.ts
- touchLog
- schema/shapes.ts
- Il database degli account (Supabase)
- Commenti di chi prova Glifo
- ExplainPanel
- conics.ts
- toLatex
- planPreview.ts
- Le spiegazioni, come funzionano
- AiPanel
- Sheet
- sql.ts
- calcPlugin
- grafo-html.mjs
- createFakeSupabase
- graph/file.ts
- schemaBlocks.ts
- database.ts
- Parser
- Glifo – note per Claude
- 20261008130026_commenti.sql
- boardTouchLog.test.ts
- planBlock.ts
- render/lists.ts
- Schema
- scripts
- ExplainChat
- SlotWidget

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 280 edges
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

## Communities (156 total, 35 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.15
Nodes (16): at(), browserStore, clip(), KINDS, LOG_KEY, Moves, MOVES_MAX, pointerDetail() (+8 more)

### Community 1 - "parse.ts"
Cohesion: 0.07
Nodes (44): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe(), differentialInFraction() (+36 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (120): setCurrentAccount(), deleteAccount(), ensureSessionOf(), setSharedCopy(), sharedLinks(), shareNote(), supabaseBackendFor(), unshareNote() (+112 more)

### Community 3 - "compile"
Cohesion: 0.05
Nodes (96): integralRegion, LayeredSolid, areaFor(), constantValue(), argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS (+88 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (33): AccountSync, withLock(), Account, EMPTY_STATE, FolderChange, FolderRow, isEmpty(), iso() (+25 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (100): conicItems(), isConicLine(), quadricEquation(), FieldContext, isComplexLine(), isComplexValue(), isSegmentNode(), isTestLine() (+92 more)

### Community 6 - "spreadsheet/evaluate.ts"
Cohesion: 0.09
Nodes (44): formulaText(), tableTopic(), valueText(), sheetSummary(), quantity(), sheetToCsv(), CellResult, EMPTY (+36 more)

### Community 7 - "mul"
Cohesion: 0.15
Nodes (69): atIntegers(), polyEx(), shapeValue(), similarSolution(), degree(), algebraic(), bigGcd(), byParts() (+61 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (42): addLabel(), boxes, cameras, complexCoord(), coord(), drawings, drawnViews, endTex() (+34 more)

### Community 9 - "explain.ts"
Cohesion: 0.06
Nodes (59): allNames(), bareResult(), CHAT_SUBJECT, ChatFn, checkFormulas(), checkSteps(), checkTopicFormula(), checkTopicSteps() (+51 more)

### Community 10 - "plan.ts"
Cohesion: 0.09
Nodes (41): at(), breakEven(), dataLine(), dataRange(), Point, tableItems(), textLabel(), chartData (+33 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.09
Nodes (57): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+49 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (55): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), dataWindow(), domainEdge() (+47 more)

### Community 13 - "statsGraph.ts"
Cohesion: 0.22
Nodes (15): classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX, Line, number(), pmfBars() (+7 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.09
Nodes (13): isLanes(), SchemaEditor, withLaneContents(), cellText(), createEdgeCell(), edgeLook(), edgeStyle(), nodeLook() (+5 more)

### Community 15 - "Board"
Cohesion: 0.09
Nodes (3): Board, loadPrefs(), penErases()

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (6): rangeLabel(), SheetEditor, CellRange, clearRange(), cloneSheet(), setCell()

### Community 17 - "editor/editor.ts"
Cohesion: 0.05
Nodes (56): @codemirror/language, @codemirror/state, @codemirror/view, @lezer/common, acceptCalcResult(), CalcCheck, calcOutcomes(), CalcResult (+48 more)

### Community 18 - "MathError"
Cohesion: 0.11
Nodes (52): isNumericalLine(), numericalItems(), MathError, bisection(), cholesky(), condition(), derivative(), exactPolynomial() (+44 more)

### Community 19 - "arithmetic.ts"
Cohesion: 0.10
Nodes (48): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+40 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (42): b, bigops, c, calculus, fn, fr, fractions, functions (+34 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "topics.ts"
Cohesion: 0.13
Nodes (29): ATTRIBUTES, count(), cut(), definedName(), ER_SHAPES, fieldText(), fitLines(), flowOrder() (+21 more)

### Community 23 - "parseSchema"
Cohesion: 0.11
Nodes (24): schemaSummary(), svg(), base64(), hide(), OPEN, schemasForFile(), schemasFromFile(), unhide() (+16 more)

### Community 24 - "store.ts"
Cohesion: 0.06
Nodes (20): fake-indexeddb, BoardOptions, BoardBackend, BoardStore, done(), fromRecord(), IdbBoards, MemoryBoards (+12 more)

### Community 25 - "linear.ts"
Cohesion: 0.09
Nodes (61): angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, dataOf(), determinant() (+53 more)

### Community 26 - "Rational"
Cohesion: 0.10
Nodes (24): Part, expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactFunction, ExactRandom (+16 more)

### Community 27 - "assistant.ts"
Cohesion: 0.11
Nodes (26): @anthropic-ai/sdk, AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible() (+18 more)

### Community 28 - "laplace.ts"
Cohesion: 0.11
Nodes (46): factoredPolynomial(), oneFraction(), beyondPoles(), compiled(), E, fractionShown(), HALF, inverseLaplaceShown() (+38 more)

### Community 29 - "toNode"
Cohesion: 0.14
Nodes (29): EMPTY_SCOPE, absOf(), boundsOf(), close(), definite(), fourierProblem, fourierShown(), isTrig() (+21 more)

### Community 30 - "gantt.ts"
Cohesion: 0.07
Nodes (62): amount(), barColor(), crossings(), dateText(), dayOf(), fitText(), GanttOptions, ganttSvg() (+54 more)

### Community 31 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

### Community 32 - "search.ts"
Cohesion: 0.14
Nodes (26): preferredIndex(), editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase() (+18 more)

### Community 33 - "spell.test.ts"
Cohesion: 0.08
Nodes (24): @codemirror/lang-markdown, mathMarkdown, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close() (+16 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "graph.ts"
Cohesion: 0.10
Nodes (29): AT_X, cellHtml(), COMPASS, createGraph(), drawSchema(), edgeTextAt(), insertSchema(), isEdgeLook() (+21 more)

### Community 36 - "complex.ts"
Cohesion: 0.05
Nodes (74): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isInequality(), onlyComplex() (+66 more)

### Community 37 - "namesIn"
Cohesion: 0.13
Nodes (38): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+30 more)

### Community 38 - "supabase.ts"
Cohesion: 0.09
Nodes (28): @supabase/supabase-js, captchaToken(), loadTurnstile(), Turnstile, TURNSTILE_SCRIPT, Window, TURNSTILE_SITE_KEY, accountError (+20 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "openShareDialog"
Cohesion: 0.10
Nodes (27): accountDataFile(), PullResult, openShareDialog(), changeAccess(), changeCopy(), copy(), refreshChanged(), render() (+19 more)

### Community 41 - "FoldersStore"
Cohesion: 0.08
Nodes (16): cleanFolderName(), Folder, FolderGroup, FoldersStore, groupByFolder(), sameName(), saveClosedFolders(), Note (+8 more)

### Community 42 - "several.ts"
Cohesion: 0.10
Nodes (48): Piece, Condition, Family, Group, Root, Shape, fractionNear(), at() (+40 more)

### Community 43 - "study.ts"
Cohesion: 0.16
Nodes (32): Asymptote, boundaries(), compiled(), cutsOf(), defined(), domainOf(), exact(), inDomain() (+24 more)

### Community 44 - "functions.ts"
Cohesion: 0.11
Nodes (46): FormulaNode, boolArg(), BY_NAME, callFunction(), conditional(), criterion(), Ctx, define() (+38 more)

### Community 45 - "finite.ts"
Cohesion: 0.16
Nodes (29): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteContext (+21 more)

### Community 46 - "NotesStore"
Cohesion: 0.06
Nodes (41): accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), prefixOf(), body (+33 more)

### Community 47 - "view3d.ts"
Cohesion: 0.06
Nodes (85): addMesh(), addTet(), affinePlane(), Axis, Box, centroid(), clipBy(), clipPolygon() (+77 more)

### Community 48 - "distributions.ts"
Cohesion: 0.06
Nodes (63): addExp(), choose(), continuousQuantile(), discreteQuantile(), Distribution, exactIntervalProbability(), factorialBig(), FAMILIES (+55 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.14
Nodes (34): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+26 more)

### Community 50 - "markdown.ts"
Cohesion: 0.06
Nodes (51): description, name, private, type, version, @codemirror/autocomplete, @codemirror/language-data, @codemirror/search (+43 more)

### Community 51 - "SidePanel"
Cohesion: 0.16
Nodes (8): katex, cache, cleanKatexError(), renderTex(), TexRender, displayCode(), preventFocusSteal(), SidePanel

### Community 52 - "Pt"
Cohesion: 0.11
Nodes (14): clampZoom(), coalesced(), Finger, LassoAction, MoveAction, PanAction, PinchAction, pointsOf() (+6 more)

### Community 53 - "feedback.ts"
Cohesion: 0.08
Nodes (39): vite-plugin-pwa, AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountOffMessage(), Site, commentDate(), commentItem() (+31 more)

### Community 54 - "aiPanel.test.ts"
Cohesion: 0.15
Nodes (18): answerFollowUp(), chatContext, chatSystemPrompt(), explainTopic, explanationText(), sheetFactory(), topicFeedback(), topicPrompt() (+10 more)

### Community 55 - "ui/preview.ts"
Cohesion: 0.08
Nodes (22): GraphLabels, renameGraphScope(), renameScopeKeys(), BlockKind, MoveDir, draw(), drawCached(), drawn (+14 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "strokes.ts"
Cohesion: 0.09
Nodes (38): centerOn(), copyStrokes(), cross(), handleScale(), IDENTITY, insideLasso(), keepInside(), LASSO_SHARE (+30 more)

### Community 58 - "src/relocation.ts"
Cohesion: 0.07
Nodes (50): knowsAccount(), ExplainTone, DEFAULT_LOCAL_MODEL, aiSettingsOf(), buildPackage(), importPackage(), isRelocationPackage(), NEW_ORIGIN (+42 more)

### Community 59 - "num"
Cohesion: 0.08
Nodes (87): withoutAbs(), exp(), hyperbolicToExp(), linearIn(), sqrtEx(), termTransform(), addWave(), arrange() (+79 more)

### Community 60 - "Glifo"
Cohesion: 0.13
Nodes (15): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Commenti, Compatibilità con VS Code, Condividere una nota con un link (+7 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "h"
Cohesion: 0.06
Nodes (56): SyncStatus, AI_SERVICES, board, viewSwitch, openSignedOut(), printButton(), ShareDialogDeps, Settings (+48 more)

### Community 63 - "vitest"
Cohesion: 0.05
Nodes (44): vitest, staticGraphSvg(), chooseWindow(), specFor(), chooseBox(), GraphItem, parseGraph(), DrawOptions (+36 more)

### Community 64 - "explainSubjects.ts"
Cohesion: 0.20
Nodes (19): explainTarget, formulasUntil(), explanationMarkdown(), hasCalculation(), insertAfterBlock(), insertAfterText(), insertExplanation(), nextLineText() (+11 more)

### Community 65 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 66 - "spreadsheet/editor.ts"
Cohesion: 0.09
Nodes (48): tablesNote(), currentCall(), Editing, MenuEntry, Move, openSheetEditor(), PATHS, SheetEditorOptions (+40 more)

### Community 67 - "blockMove.ts"
Cohesion: 0.11
Nodes (33): blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove, blockPlace(), closed() (+25 more)

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

### Community 72 - "probability.ts"
Cohesion: 0.13
Nodes (23): End, Family, CompileOptions, ExactScope, ALL, complement(), distributionOf(), endAt() (+15 more)

### Community 73 - "MarkdownEditor"
Cohesion: 0.14
Nodes (7): @codemirror/commands, closeMathBlockOnEnter(), EditorCallbacks, MarkdownEditor, tabOutOfMath(), insertTemplate(), setup()

### Community 74 - "symbolic.ts"
Cohesion: 0.06
Nodes (73): freeLetters(), satisfies(), valueAt(), primitive(), verified(), linearCells(), assumePositive(), atValues() (+65 more)

### Community 75 - "sidePanel.ts"
Cohesion: 0.24
Nodes (13): SuggestionItem, CATEGORIES, cardPreviewTex(), formPreviewTex(), ParsedTemplate, parseTemplate(), PLACEHOLDER_TEX, placeholderPreview() (+5 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.04
Nodes (68): GraphLook, alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ARROW_NAMES (+60 more)

### Community 79 - "toolbar.ts"
Cohesion: 0.19
Nodes (15): insertBlock(), wrapSelection(), Action, createToolbar(), insertCode(), insertLink(), listMenu(), listStyle() (+7 more)

### Community 82 - "restore.test.ts"
Cohesion: 0.24
Nodes (9): BackupNote, backupNotes(), restoreBackup(), RestoreBoards, Restored, restoredMessage(), time(), backup (+1 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.20
Nodes (6): centerOf(), clickOn(), ffmpeg, SCENES, SIZE, work

### Community 90 - "Abbonamenti"
Cohesion: 0.08
Nodes (24): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Deciso (5 ottobre 2026), Deciso (5 ottobre 2026) (+16 more)

### Community 91 - "explainPanel.ts"
Cohesion: 0.12
Nodes (22): Explanation, FollowUp, REPLY_TOKENS, checkHtml(), checkTitle(), escapeHtml(), AI_NEWS_TITLE, AI_WORKING_TITLE (+14 more)

### Community 92 - "Costi"
Cohesion: 0.21
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 96 - "account-test.mjs"
Cohesion: 0.12
Nodes (10): device(), login(), newContext, waitFor(), b64(), CAPTCHA_TOKEN, CODE, GOOGLE_CODE (+2 more)

### Community 97 - "sheet.ts"
Cohesion: 0.08
Nodes (56): formatGauss(), expSumValue(), formatNumber(), recognize(), complexText(), formatEigenvalues(), Lin, bracketParts() (+48 more)

### Community 98 - "board.ts"
Cohesion: 0.07
Nodes (38): perfect-freehand, Action, ACTION_NAMES, DOT_SIZES, DrawAction, EraserMode, HANDLE_REACH, ICON (+30 more)

### Community 100 - "ui/relocation.ts"
Cohesion: 0.17
Nodes (17): moveDayLabel(), RelocationResult, BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark(), downloadButton() (+9 more)

### Community 101 - "linsys.ts"
Cohesion: 0.06
Nodes (76): decimalSeparator(), Digits, FormatOptions, formatRational(), fromNumber(), fromRational(), SUPERSCRIPT, writeDigits() (+68 more)

### Community 102 - "Field"
Cohesion: 0.12
Nodes (7): characteristicPolynomial(), eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn()

### Community 103 - "siteUpdate.ts"
Cohesion: 0.14
Nodes (20): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, loadPart() (+12 more)

### Community 104 - "SuggestionController"
Cohesion: 0.26
Nodes (3): EditorMathContext, expand(), SuggestionController

### Community 105 - "Dove sono le cose"
Cohesion: 0.19
Nodes (16): Dove sono le cose, Glifo – architettura, loadingEditor(), openSheet(), placeChart(), saveSheetBlock(), tableChartKind(), warmEditors() (+8 more)

### Community 106 - "Stroke"
Cohesion: 0.20
Nodes (7): EraseAction, Step, shapeSvg(), shapePoints(), BoardChange, BoardData, Stroke

### Community 107 - "localModels.ts"
Cohesion: 0.09
Nodes (28): @mlc-ai/web-llm, chat(), GlifoError, Gpu, load(), post(), remove(), scope (+20 more)

### Community 108 - "xlsx.ts"
Cohesion: 0.07
Nodes (53): RFC-4180, fflate, csvDelimiter(), csvToSheet(), field(), italian(), parseCsv(), splitRecords() (+45 more)

### Community 110 - "touchLog"
Cohesion: 0.29
Nodes (3): movesLine(), seconds(), touchLog

### Community 113 - "schema/shapes.ts"
Cohesion: 0.08
Nodes (17): @maxgraph/core, ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape (+9 more)

### Community 116 - "Il database degli account (Supabase)"
Cohesion: 0.14
Nodes (13): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il controllo anti-robot (CAPTCHA, ottobre 2026), Il database degli account (Supabase), Il progetto, Il trasloco su glifo.page (ottobre 2026) (+5 more)

### Community 117 - "Commenti di chi prova Glifo"
Cohesion: 0.17
Nodes (11): Promemoria per lo studente, Account: i propri appunti su ogni dispositivo, anche da condividere, Commenti di chi prova Glifo, Idee per il futuro, In programma, La lavagna: idee in più, Più avanti, Schemi: idee in più (+3 more)

### Community 118 - "ExplainPanel"
Cohesion: 0.21
Nodes (4): ExplainPanel, preventFocusSteal(), formulasSummary(), setup()

### Community 119 - "conics.ts"
Cohesion: 0.18
Nodes (29): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+21 more)

### Community 120 - "toLatex"
Cohesion: 0.09
Nodes (38): fourierItems(), isFourierLine(), criticalLine(), isSeveralLine(), named(), severalItems(), surface(), names() (+30 more)

### Community 121 - "planPreview.ts"
Cohesion: 0.16
Nodes (18): inClaudeViewer(), feedbackButton, openComments(), canWriteFilesDirectly(), downloadBlob(), downloadText(), fileNameFor(), FsWindow (+10 more)

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 124 - "Sheet"
Cohesion: 0.08
Nodes (23): ExactComplexScope, Ode, withWorkLimit(), FormattedResult, MathNode, chainOf(), close(), definitionTarget() (+15 more)

### Community 125 - "sql.ts"
Cohesion: 0.17
Nodes (18): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+10 more)

### Community 126 - "calcPlugin"
Cohesion: 0.17
Nodes (4): calcPlugin, CheckWidget, ResultWidget, valueNode()

### Community 127 - "grafo-html.mjs"
Cohesion: 0.17
Nodes (5): graphFile, names, namesFile, root, PNG_ICONS

### Community 128 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 129 - "graph/file.ts"
Cohesion: 0.08
Nodes (43): FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsForFile(), graphsFromFile(), hide() (+35 more)

### Community 131 - "schemaBlocks.ts"
Cohesion: 0.11
Nodes (16): toggleLinePrefix(), BlockWidget, findWidgetBlocks(), guardBlocks(), KINDS, schemaBlocks(), WidgetBlock, WidgetKind (+8 more)

### Community 132 - "database.ts"
Cohesion: 0.23
Nodes (6): @electric-sql/pglite, createDatabase(), databaseTests(), feedbackTests(), migrations, shareTests()

### Community 136 - "Glifo – note per Claude"
Cohesion: 0.25
Nodes (8): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Regole, sqlite()

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 139 - "boardTouchLog.test.ts"
Cohesion: 0.20
Nodes (8): isSaved(), LOG_MAX_LINES, LogStore, SavedLog, clock(), memoryStore(), newLog(), texts()

### Community 140 - "planBlock.ts"
Cohesion: 0.36
Nodes (10): MONTHS, parseDate(), planBlock, PlanKind, planRange(), blockLines(), GraphError, graphNames() (+2 more)

### Community 141 - "render/lists.ts"
Cohesion: 0.38
Nodes (10): bulletGroup(), sameList(), alignInside(), asciiTrim(), findMarker(), isOrdered(), listAttrs(), listRule() (+2 more)

### Community 142 - "Schema"
Cohesion: 0.29
Nodes (4): loadDialect(), SchemaEditorOptions, Schema, serializeSchema()

### Community 143 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

## Knowledge Gaps
- **696 isolated node(s):** `Comandi`, `Regole`, `Oggi: tutto gratis, tranne il dominio`, `Gratis anche quando Glifo sarà aperto a tutti`, `Da attivare solo quando lo dice lo studente` (+691 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 976 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **35 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `touchlog.ts`, `graph/file.ts`, `main.ts`, `schemaBlocks.ts`, `compile`, `spec.ts`, `spreadsheet/evaluate.ts`, `parse.ts`, `graph/preview.ts`, `explain.ts`, `plan.ts`, `mul`, `svg.ts`, `planBlock.ts`, `SchemaEditor`, `Board`, `SheetEditor`, `ExplainChat`, `MathError`, `arithmetic.ts`, `boardTouchLog.test.ts`, `topics.ts`, `parseSchema`, `store.ts`, `linear.ts`, `Rational`, `assistant.ts`, `toNode`, `gantt.ts`, `logic.ts`, `graph.ts`, `complex.ts`, `namesIn`, `several.ts`, `study.ts`, `functions.ts`, `finite.ts`, `NotesStore`, `view3d.ts`, `distributions.ts`, `board/shapes.ts`, `markdown.ts`, `SidePanel`, `Pt`, `feedback.ts`, `aiPanel.test.ts`, `ui/preview.ts`, `strokes.ts`, `src/relocation.ts`, `num`, `h`, `vitest`, `explainSubjects.ts`, `spreadsheet/editor.ts`, `blockMove.ts`, `smoke-test.mjs`, `MarkdownEditor`, `symbolic.ts`, `sidePanel.ts`, `schema/editor.ts`, `toolbar.ts`, `explainPanel.ts`, `sheet.ts`, `linsys.ts`, `siteUpdate.ts`, `Stroke`, `localModels.ts`, `xlsx.ts`, `touchLog`, `schema/shapes.ts`, `ExplainPanel`, `conics.ts`, `toLatex`, `planPreview.ts`, `AiPanel`, `Sheet`?**
  _High betweenness centrality (0.176) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `touchlog.ts`, `parse.ts`, `graph/file.ts`, `compile`, `database.ts`, `schemaBlocks.ts`, `sync.ts`, `mul`, `explain.ts`, `plan.ts`, `boardTouchLog.test.ts`, `svg.ts`, `editor/lists.ts`, `editor/editor.ts`, `parseSchema`, `store.ts`, `linear.ts`, `assistant.ts`, `laplace.ts`, `gantt.ts`, `search.ts`, `spell.test.ts`, `supabase.ts`, `resize.ts`, `openShareDialog`, `FoldersStore`, `NotesStore`, `view3d.ts`, `distributions.ts`, `board/shapes.ts`, `markdown.ts`, `feedback.ts`, `aiPanel.test.ts`, `ui/preview.ts`, `strokes.ts`, `src/relocation.ts`, `h`, `spreadsheet/editor.ts`, `blockMove.ts`, `MarkdownEditor`, `sidePanel.ts`, `schema/editor.ts`, `restore.test.ts`, `explainPanel.ts`, `board.ts`, `ui/relocation.ts`, `linsys.ts`, `siteUpdate.ts`, `localModels.ts`, `xlsx.ts`, `Sheet`, `sql.ts`?**
  _High betweenness centrality (0.130) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `main.ts`, `graph/preview.ts`, `SchemaEditor`, `Board`, `Schema`, `SheetEditor`, `ExplainChat`, `spell.test.ts`, `resize.ts`, `openShareDialog`, `FoldersStore`, `NotesStore`, `SidePanel`, `feedback.ts`, `ui/preview.ts`, `spreadsheet/editor.ts`, `sidePanel.ts`, `schema/editor.ts`, `toolbar.ts`, `explainPanel.ts`, `board.ts`, `ui/relocation.ts`, `siteUpdate.ts`, `ExplainPanel`, `planPreview.ts`, `AiPanel`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **Are the 279 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `adoptGuestNotes()`) actually correct?**
  _`Dove sono le cose` has 279 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Comandi`, `Regole`, `Oggi: tutto gratis, tranne il dominio` to the rest of the system?**
  _696 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `parse.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06986483913953931 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.037805605247465714 - nodes in this community are weakly interconnected._