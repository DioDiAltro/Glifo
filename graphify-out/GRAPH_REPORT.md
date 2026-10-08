# Graph Report - matherdown  (2026-10-08)

## Corpus Check
- 310 files · ~598,650 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 4998 nodes · 18058 edges · 165 communities (127 shown, 38 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 571 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `27dd022a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- touchlog.ts
- Parser
- main.ts
- compile
- sync.ts
- spec.ts
- Rational
- num
- graph/preview.ts
- Dove sono le cose
- vitest
- editor/lists.ts
- svg.ts
- parse.ts
- SchemaEditor
- Board
- SheetEditor
- editor.test.ts
- MathError
- arithmetic.ts
- index.ts
- engine.ts
- explainSubjects.ts
- topics.ts
- store.ts
- linear.ts
- assistant.ts
- dialogs.ts
- folders.ts
- several.ts
- gantt.ts
- calcResults.ts
- search.ts
- editor/editor.ts
- logic.ts
- NotesStore
- complex.ts
- namesIn
- view3d.ts
- resize.ts
- statsShown.ts
- Stroke
- formatNumber
- study.ts
- functions.ts
- finite.ts
- statsGraph.ts
- toLatex
- distributions.ts
- board/shapes.ts
- BoardStore
- SidePanel
- Pt
- feedback.ts
- graph.ts
- ui/preview.ts
- 20261004091555_note_condivise.sql
- selection.ts
- AiPanel
- odesolve.ts
- .paintVertexShape
- dependencies
- dialogShell
- h
- writeJson
- Piano per piano
- spreadsheet/editor.ts
- probability.ts
- smoke-test.mjs
- Benvenuto in Glifo
- compilerOptions
- linsys.ts
- Field
- MarkdownEditor
- symbolic.ts
- schemaBlocks.ts
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
- board.ts
- Glifo
- spellcheck
- supabase.ts
- toast
- limits.ts
- sync.test.ts
- host.ts
- localModels.ts
- xlsx.ts
- explainPanel.ts
- markdown.ts
- plan.ts
- Glifo – note per Claude
- ExplainPanel
- conics.ts
- siteUpdate.ts
- scripts
- Le spiegazioni, come funzionano
- flushSave
- sheet.ts
- sql.ts
- notes.ts
- FoldersStore
- createFakeSupabase
- graph/file.ts
- BoardOptions
- laplace.ts
- Parser
- SheetEvaluator
- 20261008130026_commenti.sql
- schema/templates.ts
- gauss.ts
- account.ts
- aiPanel.test.ts
- touchLog
- severalGraph.ts
- schedule.ts
- fourier.ts
- ExplainChat
- boardTouchLog.test.ts
- deploy.test.ts
- sidePanel.ts
- logo.ts
- AccountSync
- page.ts
- devDependencies

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 267 edges
2. `MathError` - 151 edges
3. `num()` - 145 edges
4. `Sheet` - 139 edges
5. `MathNode` - 129 edges
6. `mul()` - 124 edges
7. `Board` - 118 edges
8. `compile()` - 113 edges
9. `h()` - 113 edges
10. `Rational` - 111 edges

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

## Communities (165 total, 38 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.15
Nodes (16): at(), browserStore, clip(), KINDS, LOG_KEY, Moves, MOVES_MAX, pointerDetail() (+8 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (89): addToGraphBlock(), formulaAtCursor(), insertGraphBlock(), setGraphLabels(), graphImagesFor(), graphsForFile(), graphsFromFile(), account (+81 more)

### Community 3 - "compile"
Cohesion: 0.06
Nodes (81): inequalityMargin(), integralRegion, LayeredSolid, radiusOf(), spaceLayers(), spaceMargin(), spacePoint(), argumentOrder() (+73 more)

### Community 4 - "sync.ts"
Cohesion: 0.08
Nodes (28): withLock(), Account, EMPTY_STATE, FolderChange, FolderRow, isEmpty(), iso(), merge() (+20 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (100): GraphLabelLines, conicItems(), isConicLine(), quadricEquation(), hasExponential(), constantIntegrand(), depth(), Multiple (+92 more)

### Community 6 - "Rational"
Cohesion: 0.09
Nodes (26): Part, expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactFunction, ExactRandom (+18 more)

### Community 7 - "num"
Cohesion: 0.13
Nodes (88): atIntegers(), withoutAbs(), hyperbolicToExp(), polyEx(), similarSolution(), squareRoot(), yPowers(), algebraic() (+80 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (46): FIGURE_PALETTE, addLabel(), boxes, cameras, complexCoord(), containing(), coord(), drawings (+38 more)

### Community 9 - "Dove sono le cose"
Cohesion: 0.06
Nodes (71): Dove sono le cose, Glifo – architettura, allNames(), answerFollowUp(), bareResult(), CHAT_SUBJECT, chatContext, ChatFn (+63 more)

### Community 10 - "vitest"
Cohesion: 0.05
Nodes (53): vitest, staticGraphSvg(), chooseWindow(), chooseBox(), GraphItem, parseGraph(), typedSliderValue(), PALETTES (+45 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.09
Nodes (61): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+53 more)

### Community 12 - "svg.ts"
Cohesion: 0.08
Nodes (56): graphify, contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), dataWindow() (+48 more)

### Community 13 - "parse.ts"
Cohesion: 0.06
Nodes (39): hasWord(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, differentialInFraction() (+31 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.10
Nodes (6): isLanes(), SchemaEditor, withLaneContents(), NodeLook, serializeSchema(), tableMetrics()

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (4): rangeLabel(), SheetEditor, serializeSheet(), cloneSheet()

### Community 17 - "editor.test.ts"
Cohesion: 0.06
Nodes (32): closeMathBlockOnEnter(), tabOutOfMath(), templateInsertion(), CODE_NODES, CommandToken, commandTokenAt(), EditorMathContext, isInCode() (+24 more)

### Community 18 - "MathError"
Cohesion: 0.13
Nodes (47): MathError, bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial() (+39 more)

### Community 19 - "arithmetic.ts"
Cohesion: 0.10
Nodes (46): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+38 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (41): b, bigops, c, calculus, fn, fr, fractions, functions (+33 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "explainSubjects.ts"
Cohesion: 0.18
Nodes (20): explainTarget, formulasUntil(), sheetBefore(), explanationMarkdown(), hasCalculation(), insertAfterBlock(), insertAfterText(), insertExplanation() (+12 more)

### Community 23 - "topics.ts"
Cohesion: 0.19
Nodes (22): ATTRIBUTES, count(), cut(), ER_SHAPES, fieldText(), fitLines(), flowOrder(), FREE_NAMES (+14 more)

### Community 24 - "store.ts"
Cohesion: 0.11
Nodes (13): BoardBackend, done(), fromRecord(), IdbBoards, ofNote(), openBoardDatabase(), openDefault(), request() (+5 more)

### Community 25 - "linear.ts"
Cohesion: 0.11
Nodes (55): angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, dataOf(), determinant() (+47 more)

### Community 26 - "assistant.ts"
Cohesion: 0.13
Nodes (20): AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible(), askThroughHost() (+12 more)

### Community 27 - "dialogs.ts"
Cohesion: 0.11
Nodes (19): EXPLAIN_TONES, ExplainTone, DEFAULT_LOCAL_MODEL, ACCOUNT_SETTINGS, accountSettings(), AI_MODELS, SETTINGS_KEY, sharedSettings() (+11 more)

### Community 28 - "folders.ts"
Cohesion: 0.13
Nodes (14): Folder, FOLDER_NAME_MAX, FolderGroup, groupByFolder(), loadClosedFolders(), RemoteFolder, saveClosedFolders(), NoteMeta (+6 more)

### Community 29 - "several.ts"
Cohesion: 0.07
Nodes (69): close(), Definite, definiteIntegral(), exValue(), samples(), EMPTY_SCOPE, Piece, simplest() (+61 more)

### Community 30 - "gantt.ts"
Cohesion: 0.07
Nodes (56): amount(), barColor(), crossings(), dateText(), dayOf(), fitText(), GanttOptions, ganttSvg() (+48 more)

### Community 31 - "calcResults.ts"
Cohesion: 0.11
Nodes (14): @lezer/common, acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult, calcResults(), CheckWidget (+6 more)

### Community 32 - "search.ts"
Cohesion: 0.16
Nodes (25): SuggestionItem, editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase() (+17 more)

### Community 33 - "editor/editor.ts"
Cohesion: 0.04
Nodes (57): description, name, private, type, version, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands (+49 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "NotesStore"
Cohesion: 0.15
Nodes (10): createdAtFromId(), deriveTitle(), NotesStore, hasLocalStorage(), memory, migrateKeyPrefix(), readItem(), removeItem() (+2 more)

### Community 36 - "complex.ts"
Cohesion: 0.08
Nodes (44): add(), allRoots(), arg(), asin(), atan(), compileApply(), compileComplex(), compileFunction() (+36 more)

### Community 37 - "namesIn"
Cohesion: 0.14
Nodes (36): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+28 more)

### Community 38 - "view3d.ts"
Cohesion: 0.07
Nodes (79): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+71 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "statsShown.ts"
Cohesion: 0.17
Nodes (32): check(), correlation(), count(), covariance(), Data, dataStatistic(), deviation(), fail() (+24 more)

### Community 41 - "Stroke"
Cohesion: 0.15
Nodes (7): Step, strokeSummary(), handleScale(), shapePoints(), BoardChange, BoardData, Stroke

### Community 42 - "formatNumber"
Cohesion: 0.12
Nodes (31): decimalSeparator(), Digits, formatNumber(), FormatOptions, formatRational(), fromNumber(), fromRational(), SUPERSCRIPT (+23 more)

### Community 43 - "study.ts"
Cohesion: 0.16
Nodes (32): limit(), Asymptote, compiled(), cutsOf(), defined(), domainOf(), exact(), inDomain() (+24 more)

### Community 44 - "functions.ts"
Cohesion: 0.07
Nodes (76): quantity(), CellResult, EMPTY, evaluateSheet(), number(), addFormat(), decimalsOf(), divFormat() (+68 more)

### Community 45 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 46 - "statsGraph.ts"
Cohesion: 0.19
Nodes (16): isTestLine(), number(), testItems(), classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX (+8 more)

### Community 47 - "toLatex"
Cohesion: 0.11
Nodes (36): valueLabel(), isNumericalLine(), numericalItems(), areaFor(), multipleLabel(), names(), STUDY_GRAPH, studyItems() (+28 more)

### Community 48 - "distributions.ts"
Cohesion: 0.06
Nodes (64): addExp(), choose(), continuousQuantile(), discreteQuantile(), Distribution, exactIntervalProbability(), expSumValue(), factorialBig() (+56 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.14
Nodes (33): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+25 more)

### Community 50 - "BoardStore"
Cohesion: 0.13
Nodes (3): BoardStore, MemoryBoards, backup()

### Community 51 - "SidePanel"
Cohesion: 0.19
Nodes (6): cleanKatexError(), renderTex(), SymbolForm, displayCode(), preventFocusSteal(), SidePanel

### Community 52 - "Pt"
Cohesion: 0.09
Nodes (17): clampZoom(), coalesced(), EraseAction, Finger, LassoAction, MoveAction, PanAction, penErases() (+9 more)

### Community 53 - "feedback.ts"
Cohesion: 0.07
Nodes (47): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), PullResult, isShareToken(), parseSharedNote(), readSharedNote() (+39 more)

### Community 54 - "graph.ts"
Cohesion: 0.07
Nodes (43): @maxgraph/core, AT_X, cellHtml(), cellText(), COMPASS, createEdgeCell(), createGraph(), drawSchema() (+35 more)

### Community 55 - "ui/preview.ts"
Cohesion: 0.08
Nodes (23): GraphLabels, remapLineKeys(), renameGraphScope(), renameScopeKeys(), BlockKind, MoveDir, draw(), drawCached() (+15 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "selection.ts"
Cohesion: 0.09
Nodes (40): centerOn(), copyStrokes(), cross(), IDENTITY, insideLasso(), keepInside(), LASSO_SHARE, lassoed() (+32 more)

### Community 58 - "AiPanel"
Cohesion: 0.32
Nodes (4): NoteSubject, AiPanel, graphLabel(), texInline()

### Community 59 - "odesolve.ts"
Cohesion: 0.08
Nodes (73): addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames(), constantParticular() (+65 more)

### Community 60 - ".paintVertexShape"
Cohesion: 0.12
Nodes (6): DotShape, IdentifyingRelationShape, LanesShape, NoteShape, TableShape, WeakEntityShape

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "dialogShell"
Cohesion: 0.14
Nodes (21): openShareDialog(), changeAccess(), changeCopy(), copy(), refreshChanged(), render(), run(), setStatus() (+13 more)

### Community 63 - "h"
Cohesion: 0.13
Nodes (17): viewSwitch, fieldInput(), textWidth(), h(), icon(), HINT_MS, markSeen(), openTutorial() (+9 more)

### Community 64 - "writeJson"
Cohesion: 0.16
Nodes (11): Deletion, DeletionLog, addPersonalWord(), DICTIONARY_KEY, loadPersonalWords(), savePersonalWords(), tidy(), loadSettings() (+3 more)

### Community 65 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 66 - "spreadsheet/editor.ts"
Cohesion: 0.09
Nodes (50): currentCall(), Editing, MenuEntry, Move, openSheetEditor(), PATHS, SheetEditorOptions, Snapshot (+42 more)

### Community 67 - "probability.ts"
Cohesion: 0.13
Nodes (23): End, CompileOptions, ExactScope, ALL, compileOf(), complement(), distributionOf(), endAt() (+15 more)

### Community 68 - "smoke-test.mjs"
Cohesion: 0.16
Nodes (7): fflate, markdown-it, playwright-core, PNG_ICONS, fakeLlmWorker(), firstVisit(), plainContext

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "linsys.ts"
Cohesion: 0.11
Nodes (42): rref(), choices(), gcd(), isStandardUnknown(), linearSystem(), matrixEquation(), matrixSystem(), minorsGcd() (+34 more)

### Community 72 - "Field"
Cohesion: 0.12
Nodes (7): characteristicPolynomial(), eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn()

### Community 73 - "MarkdownEditor"
Cohesion: 0.09
Nodes (19): EditorCallbacks, MarkdownEditor, insertBlock(), insertTemplate(), wrapSelection(), Action, createToolbar(), insertCode() (+11 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (62): valueAt(), primitive(), verified(), linearCells(), atValues(), cancelLinear(), Converter, coordinates() (+54 more)

### Community 75 - "schemaBlocks.ts"
Cohesion: 0.08
Nodes (29): @codemirror/view, InsertOptions, toggleLinePrefix(), LIST_STYLES, addPlaceholders, Placeholder, besideSchema(), BlockWidget (+21 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.05
Nodes (61): schemaSummary(), alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ARROW_NAMES (+53 more)

### Community 79 - "schema/file.ts"
Cohesion: 0.26
Nodes (11): base64(), hide(), OPEN, schemasForFile(), schemasFromFile(), unhide(), crc32(), svgSize() (+3 more)

### Community 82 - "blockMove.ts"
Cohesion: 0.11
Nodes (33): blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove, blockPlace(), closed() (+25 more)

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
Cohesion: 0.21
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, Quando lo studente dice di cominciare

### Community 96 - "account-test.mjs"
Cohesion: 0.12
Nodes (10): @electric-sql/pglite, device(), login(), newContext, waitFor(), b64(), CODE, GOOGLE_CODE (+2 more)

### Community 97 - "Il database degli account (Supabase)"
Cohesion: 0.17
Nodes (11): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Nell'app, Note condivise con un link (+3 more)

### Community 98 - "board.ts"
Cohesion: 0.07
Nodes (37): Action, ACTION_NAMES, DOT_SIZES, DrawAction, EraserMode, HANDLE_REACH, ICON, MODE_NAMES (+29 more)

### Community 100 - "Glifo"
Cohesion: 0.13
Nodes (15): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Commenti, Compatibilità con VS Code, Condividere una nota con un link (+7 more)

### Community 101 - "spellcheck"
Cohesion: 0.21
Nodes (8): spellcheck(), close(), misspelledAt(), openAt(), replace(), tooltipView(), SpellChecker, SpellcheckOptions

### Community 102 - "supabase.ts"
Cohesion: 0.10
Nodes (37): @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken(), ensureSessionOf() (+29 more)

### Community 103 - "toast"
Cohesion: 0.11
Nodes (30): inClaudeViewer(), board, feedbackButton, loadingEditor(), openComments(), saveToFile(), canWriteFilesDirectly(), downloadBlob() (+22 more)

### Community 104 - "limits.ts"
Cohesion: 0.21
Nodes (16): exponentialForm(), fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), alternating() (+8 more)

### Community 105 - "sync.test.ts"
Cohesion: 0.18
Nodes (9): LocalChange, callAs(), createDatabase(), createUser(), databaseTests(), feedbackTests(), migrations, shareTests() (+1 more)

### Community 106 - "host.ts"
Cohesion: 0.23
Nodes (8): cache, capability(), ClaudeRuntime, hostDownloads, HostError, hostSample, ModelTier, runtime()

### Community 107 - "localModels.ts"
Cohesion: 0.09
Nodes (29): @mlc-ai/web-llm, chat(), GlifoError, Gpu, load(), post(), remove(), scope (+21 more)

### Community 108 - "xlsx.ts"
Cohesion: 0.08
Nodes (46): RFC-4180, csvDelimiter(), csvToSheet(), italian(), parseCsv(), splitRecords(), readNumber(), sameFormat() (+38 more)

### Community 110 - "explainPanel.ts"
Cohesion: 0.12
Nodes (27): Explanation, REPLY_TOKENS, checkHtml(), escapeHtml(), Settings, AI_NEWS_TITLE, AI_WORKING_TITLE, aiActivity (+19 more)

### Community 113 - "markdown.ts"
Cohesion: 0.11
Nodes (29): moveAttrs(), renderTexOrError(), renderTexWithResult(), configurePurify(), createMarkdownIt(), FORBIDDEN_TAGS, HLJS_LANGUAGES, mathBlockRule() (+21 more)

### Community 116 - "plan.ts"
Cohesion: 0.09
Nodes (42): at(), breakEven(), dataLine(), dataRange(), Point, tableItems(), textLabel(), chartData (+34 more)

### Community 117 - "Glifo – note per Claude"
Cohesion: 0.12
Nodes (15): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, Promemoria per lo studente, Regole, Account: i propri appunti su ogni dispositivo, anche da condividere (+7 more)

### Community 119 - "conics.ts"
Cohesion: 0.18
Nodes (29): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+21 more)

### Community 120 - "siteUpdate.ts"
Cohesion: 0.16
Nodes (18): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, loadPart() (+10 more)

### Community 121 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "flushSave"
Cohesion: 0.15
Nodes (25): remapGraphLines(), applyAccountChange(), changedHere(), createFolder(), createNote(), currentFolderId(), deleteFolder(), deleteNote() (+17 more)

### Community 124 - "sheet.ts"
Cohesion: 0.06
Nodes (48): numericPartials(), complex, ExactComplexScope, Ode, OdeFunction, withWorkLimit(), FiniteContext, FormattedResult (+40 more)

### Community 125 - "sql.ts"
Cohesion: 0.15
Nodes (19): loadDialect(), Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote() (+11 more)

### Community 126 - "notes.ts"
Cohesion: 0.18
Nodes (16): accountSpace(), adoptGuestNotes(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf(), setCurrentAccount() (+8 more)

### Community 127 - "FoldersStore"
Cohesion: 0.15
Nodes (5): cleanFolderName(), FoldersStore, sameName(), newId(), names()

### Community 128 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 129 - "graph/file.ts"
Cohesion: 0.12
Nodes (31): figureName(), graphFigure(), graphImage(), hide(), OPEN, swatchSvg(), titleBand(), unhide() (+23 more)

### Community 132 - "laplace.ts"
Cohesion: 0.10
Nodes (55): factoredPolynomial(), oneFraction(), beyondPoles(), compiled(), E, exp(), fractionShown(), HALF (+47 more)

### Community 136 - "SheetEvaluator"
Cohesion: 0.17
Nodes (16): formulaText(), tableTopic(), valueText(), field(), sheetToCsv(), SheetEvaluator, sheetSize(), cellName() (+8 more)

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 139 - "schema/templates.ts"
Cohesion: 0.11
Nodes (19): SchemaEditorOptions, DEFAULT_EDGE, Schema, SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), conceptMap (+11 more)

### Community 140 - "gauss.ts"
Cohesion: 0.16
Nodes (20): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, inZ(), isComplexLine(), isComplexValue(), isInequality() (+12 more)

### Community 141 - "account.ts"
Cohesion: 0.20
Nodes (14): SyncStatus, AccountButton, confirmAccountDeletion(), messageOf(), openAccountDialog(), openLoginDialog(), codeStep(), emailStep() (+6 more)

### Community 142 - "aiPanel.test.ts"
Cohesion: 0.14
Nodes (15): definedName(), formulaTopic(), graphTopic(), numberText(), studyOf(), theoremTopic(), topicOf(), fakeModel() (+7 more)

### Community 143 - "touchLog"
Cohesion: 0.29
Nodes (3): movesLine(), seconds(), touchLog

### Community 144 - "severalGraph.ts"
Cohesion: 0.20
Nodes (16): FieldContext, fourierItems(), isFourierLine(), criticalLine(), isSeveralLine(), named(), severalItems(), surface() (+8 more)

### Community 145 - "schedule.ts"
Cohesion: 0.18
Nodes (16): criticalPaths(), key(), Link, LinkType, listText(), offset(), order(), parseLinks() (+8 more)

### Community 146 - "fourier.ts"
Cohesion: 0.25
Nodes (15): absOf(), boundsOf(), close(), definite(), fourierProblem, fourierShown(), isTrig(), isZero() (+7 more)

### Community 148 - "boardTouchLog.test.ts"
Cohesion: 0.20
Nodes (8): isSaved(), LOG_MAX_LINES, LogStore, SavedLog, clock(), memoryStore(), newLog(), texts()

### Community 149 - "deploy.test.ts"
Cohesion: 0.32
Nodes (3): vite-plugin-pwa, accountOffMessage(), defineFor()

### Community 152 - "sidePanel.ts"
Cohesion: 0.16
Nodes (16): katex, cache, TexRender, isConfidentAnswer(), CATEGORIES, symbolsInCategory(), cardPreviewTex(), formPreviewTex() (+8 more)

### Community 153 - "logo.ts"
Cohesion: 0.39
Nodes (5): BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark()

### Community 157 - "page.ts"
Cohesion: 0.15
Nodes (16): currentAccount(), body, draw(), isDark(), load(), saveButton, saveCopy(), settings (+8 more)

### Community 158 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

## Knowledge Gaps
- **674 isolated node(s):** `session-start.sh script`, `name`, `private`, `version`, `description` (+669 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 947 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **38 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `touchlog.ts`, `Parser`, `main.ts`, `compile`, `spec.ts`, `Rational`, `num`, `graph/preview.ts`, `vitest`, `svg.ts`, `parse.ts`, `SchemaEditor`, `Board`, `SheetEditor`, `MathError`, `arithmetic.ts`, `explainSubjects.ts`, `topics.ts`, `linear.ts`, `assistant.ts`, `dialogs.ts`, `several.ts`, `gantt.ts`, `logic.ts`, `complex.ts`, `namesIn`, `view3d.ts`, `statsShown.ts`, `Stroke`, `study.ts`, `functions.ts`, `finite.ts`, `toLatex`, `distributions.ts`, `board/shapes.ts`, `BoardStore`, `SidePanel`, `Pt`, `graph.ts`, `ui/preview.ts`, `selection.ts`, `AiPanel`, `odesolve.ts`, `.paintVertexShape`, `h`, `spreadsheet/editor.ts`, `smoke-test.mjs`, `linsys.ts`, `MarkdownEditor`, `symbolic.ts`, `schemaBlocks.ts`, `schema/editor.ts`, `schema/file.ts`, `blockMove.ts`, `board.ts`, `supabase.ts`, `toast`, `localModels.ts`, `xlsx.ts`, `explainPanel.ts`, `markdown.ts`, `plan.ts`, `ExplainPanel`, `conics.ts`, `siteUpdate.ts`, `flushSave`, `sheet.ts`, `notes.ts`, `graph/file.ts`, `laplace.ts`, `SheetEvaluator`, `gauss.ts`, `aiPanel.test.ts`, `touchLog`, `severalGraph.ts`, `schedule.ts`, `fourier.ts`, `ExplainChat`, `boardTouchLog.test.ts`, `deploy.test.ts`, `sidePanel.ts`?**
  _High betweenness centrality (0.178) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `touchlog.ts`, `main.ts`, `laplace.ts`, `spec.ts`, `num`, `Dove sono le cose`, `editor/lists.ts`, `parse.ts`, `aiPanel.test.ts`, `editor.test.ts`, `boardTouchLog.test.ts`, `deploy.test.ts`, `store.ts`, `logo.ts`, `assistant.ts`, `dialogs.ts`, `folders.ts`, `sidePanel.ts`, `gantt.ts`, `search.ts`, `editor/editor.ts`, `resize.ts`, `distributions.ts`, `board/shapes.ts`, `feedback.ts`, `ui/preview.ts`, `selection.ts`, `h`, `writeJson`, `spreadsheet/editor.ts`, `schemaBlocks.ts`, `schema/editor.ts`, `blockMove.ts`, `board.ts`, `supabase.ts`, `sync.test.ts`, `localModels.ts`, `xlsx.ts`, `explainPanel.ts`, `markdown.ts`, `plan.ts`, `siteUpdate.ts`, `sheet.ts`, `sql.ts`, `notes.ts`?**
  _High betweenness centrality (0.106) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `main.ts`, `graph/preview.ts`, `account.ts`, `SchemaEditor`, `Board`, `SheetEditor`, `ExplainChat`, `sidePanel.ts`, `dialogs.ts`, `folders.ts`, `page.ts`, `gantt.ts`, `editor/editor.ts`, `resize.ts`, `SidePanel`, `feedback.ts`, `ui/preview.ts`, `AiPanel`, `dialogShell`, `spreadsheet/editor.ts`, `MarkdownEditor`, `schema/editor.ts`, `board.ts`, `spellcheck`, `toast`, `explainPanel.ts`, `ExplainPanel`, `flushSave`, `sql.ts`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **Are the 266 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `adoptGuestNotes()`) actually correct?**
  _`Dove sono le cose` has 266 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `name`, `private` to the rest of the system?**
  _674 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.041868293709236275 - nodes in this community are weakly interconnected._
- **Should `compile` be split into smaller, more focused modules?**
  _Cohesion score 0.05750350631136045 - nodes in this community are weakly interconnected._