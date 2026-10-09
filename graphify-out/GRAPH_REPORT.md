# Graph Report - matherdown  (2026-10-09)

## Corpus Check
- 318 files · ~609,881 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5080 nodes · 18365 edges · 152 communities (119 shown, 33 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 590 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `cd274359`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- touchlog.ts
- Parser
- main.ts
- compile
- sync.ts
- spec.ts
- parse.ts
- num
- graph/preview.ts
- Dove sono le cose
- chart.ts
- editor/lists.ts
- svg.ts
- statsGraph.ts
- SchemaEditor
- Board
- SheetEditor
- editor/editor.ts
- numerical.ts
- arithmetic.ts
- index.ts
- engine.ts
- topics.ts
- planPreview.ts
- store.ts
- MathError
- view3d.ts
- assistant.ts
- linsys.ts
- toNode
- gantt.ts
- package.json
- search.ts
- spell.test.ts
- logic.ts
- graph.ts
- complex.ts
- namesIn
- supabase.ts
- resize.ts
- page.ts
- FoldersStore
- several.ts
- study.ts
- functions.ts
- finite.ts
- NotesStore
- graph/space.ts
- distributions.ts
- board/shapes.ts
- markdown.ts
- SidePanel
- Pt
- feedback.ts
- dialogs.ts
- ui/preview.ts
- 20261004091555_note_condivise.sql
- board.ts
- src/relocation.ts
- odesolve.ts
- Glifo
- dependencies
- h
- toLatex
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
- BoardStore
- tutorial.mjs
- Abbonamenti
- explainPanel.ts
- Costi
- supabase-stub.sql
- account-test.mjs
- statsShown.ts
- .render
- ui/relocation.ts
- spaces.ts
- .int
- siteUpdate.ts
- suggestions.ts
- mathSyntax.ts
- schema/preview.ts
- localModels.ts
- xlsx.ts
- schema/templates.ts
- schema/shapes.ts
- Il database degli account (Supabase)
- Commenti di chi prova Glifo
- ExplainPanel
- Rational
- severalGraph.ts
- files.ts
- Le spiegazioni, come funzionano
- AiPanel
- sheet.ts
- sql.ts
- geometry.test.ts
- spiegami-qwen.mjs
- createFakeSupabase
- graph/file.ts
- schemaBlocks
- solve.ts
- Parser
- Glifo – note per Claude
- 20261008130026_commenti.sql
- schemaBlocks.ts
- I modelli e le chiavi API
- graphNote.test.ts

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 272 edges
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
- `Trasloco: il sito su Cloudflare, con un dominio tutto di Glifo` --references--> `dist()`  [INFERRED]
  ROADMAP.md → src/board/shapes.ts
- `Dove sono le cose` --references--> `ConicElements`  [INFERRED]
  ARCHITETTURA.md → src/math/conics.ts
- `Dove sono le cose` --references--> `WidgetKind`  [INFERRED]
  ARCHITETTURA.md → src/editor/schemaBlocks.ts
- `Funzionalità` --references--> `k()`  [INFERRED]
  README.md → src/math/numerical.ts
- `Come viene pubblicata` --references--> `dist()`  [INFERRED]
  README.md → src/board/shapes.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (152 total, 33 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.09
Nodes (27): at(), browserStore, clip(), isSaved(), KINDS, LOG_KEY, LOG_MAX_LINES, LogStore (+19 more)

### Community 2 - "main.ts"
Cohesion: 0.03
Nodes (123): addToGraphBlock(), graphsForFile(), graphsFromFile(), hide(), unhide(), account, ACCOUNT_OFF, active (+115 more)

### Community 3 - "compile"
Cohesion: 0.05
Nodes (88): depth(), inequalityMargin(), integralRegion, LayeredSolid, Multiple, PlanePart, radiusOf(), spaceLayers() (+80 more)

### Community 4 - "sync.ts"
Cohesion: 0.05
Nodes (39): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+31 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (99): formulaAtCursor(), GraphLabelLines, insertGraphBlock(), setGraphLabels(), conicItems(), isConicLine(), quadricEquation(), isFourierLine() (+91 more)

### Community 6 - "parse.ts"
Cohesion: 0.05
Nodes (47): typedSliderValue(), errorMessage(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES (+39 more)

### Community 7 - "num"
Cohesion: 0.10
Nodes (106): atIntegers(), oneFraction(), withoutAbs(), exp(), hyperbolicToExp(), inverseRational(), sqrtEx(), termTransform() (+98 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (42): addLabel(), boxes, cameras, complexCoord(), coord(), drawings, drawnViews, endTex() (+34 more)

### Community 9 - "Dove sono le cose"
Cohesion: 0.06
Nodes (69): Dove sono le cose, Glifo – architettura, allNames(), answerFollowUp(), bareResult(), CHAT_SUBJECT, chatContext, ChatFn (+61 more)

### Community 10 - "chart.ts"
Cohesion: 0.14
Nodes (27): at(), breakEven(), Point, quantity(), tableItems(), textLabel(), chartData, chartFrom() (+19 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.09
Nodes (62): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+54 more)

### Community 12 - "svg.ts"
Cohesion: 0.07
Nodes (62): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseWindow(), chooseY(), clipLines(), dataWindow() (+54 more)

### Community 13 - "statsGraph.ts"
Cohesion: 0.19
Nodes (15): number(), testItems(), classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX, Line (+7 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.10
Nodes (6): isLanes(), SchemaEditor, SchemaEditorOptions, withLaneContents(), Schema, serializeSchema()

### Community 15 - "Board"
Cohesion: 0.09
Nodes (5): Board, loadPrefs(), penErases(), sizeChoice(), highlightName()

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (6): rangeLabel(), SheetEditor, CellRange, clearRange(), cloneSheet(), setCell()

### Community 17 - "editor/editor.ts"
Cohesion: 0.07
Nodes (30): @codemirror/language, @lezer/common, acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult, calcResults() (+22 more)

### Community 18 - "numerical.ts"
Cohesion: 0.12
Nodes (48): bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial(), interpolating() (+40 more)

### Community 19 - "arithmetic.ts"
Cohesion: 0.07
Nodes (76): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+68 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (39): b, bigops, c, calculus, fn, fr, fractions, functions (+31 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "topics.ts"
Cohesion: 0.10
Nodes (35): ATTRIBUTES, count(), cut(), ER_SHAPES, fieldText(), fitLines(), flowOrder(), formulaText() (+27 more)

### Community 23 - "planPreview.ts"
Cohesion: 0.12
Nodes (17): planSwatchSvg(), planFigure(), planName(), ganttWidth(), PlanView, loadDialect(), base64(), crc32() (+9 more)

### Community 24 - "store.ts"
Cohesion: 0.11
Nodes (14): fake-indexeddb, BoardBackend, done(), fromRecord(), IdbBoards, ofNote(), openBoardDatabase(), openDefault() (+6 more)

### Community 25 - "MathError"
Cohesion: 0.12
Nodes (56): MathError, angleBetween(), asMatrix(), basisOf(), circleText(), complexText(), cross(), Ctx (+48 more)

### Community 26 - "view3d.ts"
Cohesion: 0.09
Nodes (44): staticGraphSvg(), Box, chooseBox(), Face, planeTolerance(), regionFaces(), surfacePlane(), Plane (+36 more)

### Community 27 - "assistant.ts"
Cohesion: 0.14
Nodes (21): @anthropic-ai/sdk, AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible() (+13 more)

### Community 28 - "linsys.ts"
Cohesion: 0.14
Nodes (38): rref(), choices(), gcd(), linearSystem(), matrixEquation(), matrixSystem(), minorsGcd(), ONE (+30 more)

### Community 29 - "toNode"
Cohesion: 0.10
Nodes (37): close(), Definite, definiteIntegral(), exValue(), samples(), EMPTY_SCOPE, absOf(), boundsOf() (+29 more)

### Community 30 - "gantt.ts"
Cohesion: 0.07
Nodes (65): amount(), barColor(), crossings(), dateText(), dayOf(), fitText(), GanttOptions, ganttSvg() (+57 more)

### Community 31 - "package.json"
Cohesion: 0.06
Nodes (35): description, devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript (+27 more)

### Community 32 - "search.ts"
Cohesion: 0.17
Nodes (24): editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex() (+16 more)

### Community 33 - "spell.test.ts"
Cohesion: 0.09
Nodes (22): misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt(), openAt() (+14 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "graph.ts"
Cohesion: 0.10
Nodes (31): fieldInput(), AT_X, cellText(), COMPASS, createEdgeCell(), createGraph(), drawSchema(), edgeLook() (+23 more)

### Community 36 - "complex.ts"
Cohesion: 0.06
Nodes (64): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexValue(), isInequality() (+56 more)

### Community 37 - "namesIn"
Cohesion: 0.15
Nodes (33): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+25 more)

### Community 38 - "supabase.ts"
Cohesion: 0.11
Nodes (36): @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken(), ensureSessionOf() (+28 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "page.ts"
Cohesion: 0.06
Nodes (46): katex, accountDataFile(), currentAccount(), PullResult, openShareDialog(), changeAccess(), changeCopy(), copy() (+38 more)

### Community 41 - "FoldersStore"
Cohesion: 0.07
Nodes (25): Deletion, DeletionLog, cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder() (+17 more)

### Community 42 - "several.ts"
Cohesion: 0.14
Nodes (36): severalLimit, fractionNear(), at(), Candidate, candidates(), compiled(), constraintsOf(), COORDS (+28 more)

### Community 43 - "study.ts"
Cohesion: 0.07
Nodes (64): fracTex(), fracText(), nearFraction(), surd(), decimalSeparator(), Digits, formatNumber(), FormatOptions (+56 more)

### Community 44 - "functions.ts"
Cohesion: 0.08
Nodes (69): EMPTY, number(), addFormat(), decimalsOf(), divFormat(), fixedNumber(), GENERAL, generalNumber() (+61 more)

### Community 45 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 46 - "NotesStore"
Cohesion: 0.10
Nodes (23): accountSpace(), adoptGuestNotes(), forgetAccount(), guestNoteCount(), knowsAccount(), prefixOf(), setCurrentAccount(), completeSignIn() (+15 more)

### Community 47 - "graph/space.ts"
Cohesion: 0.11
Nodes (47): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+39 more)

### Community 48 - "distributions.ts"
Cohesion: 0.06
Nodes (63): addExp(), choose(), continuousQuantile(), discreteQuantile(), Distribution, exactIntervalProbability(), expSum, factorialBig() (+55 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.14
Nodes (33): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+25 more)

### Community 50 - "markdown.ts"
Cohesion: 0.12
Nodes (29): valueNode(), dataRange(), moveAttrs(), checkHtml(), checkTitle(), cache, escapeHtml(), renderTex() (+21 more)

### Community 51 - "SidePanel"
Cohesion: 0.20
Nodes (4): cleanKatexError(), displayCode(), preventFocusSteal(), SidePanel

### Community 52 - "Pt"
Cohesion: 0.11
Nodes (14): clampZoom(), coalesced(), Finger, LassoAction, PanAction, PinchAction, pointsOf(), pressureOf() (+6 more)

### Community 53 - "feedback.ts"
Cohesion: 0.08
Nodes (39): vite-plugin-pwa, AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountOffMessage(), Site, commentDate(), commentItem() (+31 more)

### Community 54 - "dialogs.ts"
Cohesion: 0.12
Nodes (16): EXPLAIN_TONES, ACCOUNT_SETTINGS, AI_MODELS, DEFAULT_SETTINGS, SETTINGS_KEY, SPELL_LANGUAGES, SpellLanguages, Theme (+8 more)

### Community 55 - "ui/preview.ts"
Cohesion: 0.10
Nodes (15): GraphLabels, renameGraphScope(), renameScopeKeys(), BlockKind, MoveDir, hydrateSheets(), BLOCK_NAMES, blockKindOf() (+7 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "board.ts"
Cohesion: 0.05
Nodes (67): Action, ACTION_NAMES, BoardOptions, DOT_SIZES, DrawAction, EraseAction, EraserMode, HANDLE_REACH (+59 more)

### Community 58 - "src/relocation.ts"
Cohesion: 0.11
Nodes (36): isWelcome(), BackupBoard, buildPackage(), importPackage(), isRelocationPackage(), NEW_ORIGIN, OLD_ORIGIN, openedForRelocation() (+28 more)

### Community 59 - "odesolve.ts"
Cohesion: 0.08
Nodes (80): linearIn(), addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames() (+72 more)

### Community 60 - "Glifo"
Cohesion: 0.13
Nodes (15): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Commenti, Compatibilità con VS Code, Condividere una nota con un link (+7 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "h"
Cohesion: 0.09
Nodes (35): SyncStatus, viewSwitch, AccountButton, confirmAccountDeletion(), messageOf(), openAccountDialog(), openLoginDialog(), codeStep() (+27 more)

### Community 63 - "toLatex"
Cohesion: 0.05
Nodes (53): vitest, fourierItems(), GraphItem, multipleLabel(), parseGraph(), names(), STUDY_GRAPH, studyItems() (+45 more)

### Community 64 - "explainSubjects.ts"
Cohesion: 0.18
Nodes (21): explainTarget, schemaTitle(), formulasUntil(), sheetBefore(), explanationMarkdown(), hasCalculation(), insertAfterBlock(), insertAfterText() (+13 more)

### Community 65 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 66 - "spreadsheet/editor.ts"
Cohesion: 0.07
Nodes (63): openSheet(), saveSheetBlock(), tablesNote(), currentCall(), Editing, MenuEntry, Move, openSheetEditor() (+55 more)

### Community 67 - "blockMove.ts"
Cohesion: 0.10
Nodes (36): @codemirror/commands, @codemirror/view, blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove (+28 more)

### Community 68 - "smoke-test.mjs"
Cohesion: 0.25
Nodes (5): markdown-it, playwright-core, fakeLlmWorker(), firstVisit(), plainContext

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
Cohesion: 0.12
Nodes (25): End, Family, CompileOptions, ExactScope, RelOp, ALL, complement(), endAt() (+17 more)

### Community 73 - "MarkdownEditor"
Cohesion: 0.15
Nodes (6): closeMathBlockOnEnter(), EditorCallbacks, MarkdownEditor, insertTemplate(), setup(), setup()

### Community 74 - "symbolic.ts"
Cohesion: 0.08
Nodes (45): primitive(), verified(), atValues(), Converter, coordinates(), decimalText(), definiteParts(), definiteValue() (+37 more)

### Community 75 - "sidePanel.ts"
Cohesion: 0.16
Nodes (15): SuggestionItem, isConfidentAnswer(), CATEGORIES, symbolsInCategory(), cardPreviewTex(), formPreviewTex(), ParsedTemplate, PLACEHOLDER_TEX (+7 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.05
Nodes (71): laneOf(), schemaSummary(), alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN (+63 more)

### Community 79 - "toolbar.ts"
Cohesion: 0.12
Nodes (21): insertBlock(), InsertOptions, toggleLinePrefix(), wrapSelection(), LIST_STYLES, besideSchema(), schemaBlockRanges(), Action (+13 more)

### Community 82 - "BoardStore"
Cohesion: 0.08
Nodes (13): BoardStore, MemoryBoards, backup(), BackupNote, backupNotes(), restoreBackup(), RestoreBoards, Restored (+5 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.12
Nodes (10): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+2 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.11
Nodes (19): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Deciso (5 ottobre 2026), Dopo (+11 more)

### Community 91 - "explainPanel.ts"
Cohesion: 0.07
Nodes (39): @codemirror/state, ExplainTone, Explanation, FollowUp, REPLY_TOKENS, definedName(), formulaTopic(), graphTopic() (+31 more)

### Community 92 - "Costi"
Cohesion: 0.21
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 96 - "account-test.mjs"
Cohesion: 0.13
Nodes (9): device(), login(), newContext, waitFor(), b64(), CODE, GOOGLE_CODE, ROOT (+1 more)

### Community 97 - "statsShown.ts"
Cohesion: 0.15
Nodes (35): expSumValue(), Lin, check(), correlation(), count(), covariance(), Data, DATA_FUNCTIONS (+27 more)

### Community 98 - ".render"
Cohesion: 0.12
Nodes (18): Prefs, BOARD_PALETTES, BoardPalette, BoardTheme, inkName(), mid(), outlineSvg(), PEN_SIZE (+10 more)

### Community 100 - "ui/relocation.ts"
Cohesion: 0.13
Nodes (19): PNG_ICONS, moveDayLabel(), RelocationResult, BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark() (+11 more)

### Community 101 - "spaces.ts"
Cohesion: 0.12
Nodes (30): formatRational(), eigenvectors(), EXACT, FLOAT, kernel(), lengthText(), splitRoot(), surdText() (+22 more)

### Community 102 - ".int"
Cohesion: 0.09
Nodes (10): characteristicPolynomial(), eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), Mat, polynomialIn() (+2 more)

### Community 103 - "siteUpdate.ts"
Cohesion: 0.19
Nodes (15): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, loadPart() (+7 more)

### Community 104 - "suggestions.ts"
Cohesion: 0.20
Nodes (7): templateInsertion(), EditorMathContext, expand(), preferredIndex(), SuggestionController, parseTemplate(), templateText()

### Community 105 - "mathSyntax.ts"
Cohesion: 0.18
Nodes (17): @lezer/highlight, @lezer/markdown, lineDepth(), mathDelimTag, mathTag, parseBlockMath(), mathBlockRule(), analyzeBlockOpen() (+9 more)

### Community 106 - "schema/preview.ts"
Cohesion: 0.15
Nodes (15): svg(), GraphLook, Look, Theme, draw(), drawCached(), drawn, errorHtml() (+7 more)

### Community 107 - "localModels.ts"
Cohesion: 0.08
Nodes (30): @mlc-ai/web-llm, chat(), GlifoError, Gpu, load(), post(), remove(), scope (+22 more)

### Community 108 - "xlsx.ts"
Cohesion: 0.07
Nodes (54): RFC-4180, fflate, sheetSummary(), csvDelimiter(), csvToSheet(), field(), italian(), parseCsv() (+46 more)

### Community 110 - "schema/templates.ts"
Cohesion: 0.12
Nodes (17): DEFAULT_EDGE, SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), conceptMap, cycle, er (+9 more)

### Community 113 - "schema/shapes.ts"
Cohesion: 0.08
Nodes (17): @maxgraph/core, ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape (+9 more)

### Community 116 - "Il database degli account (Supabase)"
Cohesion: 0.17
Nodes (11): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Il trasloco su glifo.page (ottobre 2026), Nell'app (+3 more)

### Community 117 - "Commenti di chi prova Glifo"
Cohesion: 0.14
Nodes (13): Promemoria per lo studente, Account: i propri appunti su ogni dispositivo, anche da condividere, Commenti di chi prova Glifo, Idee per il futuro, In programma, La lavagna: idee in più, Più avanti, Schemi: idee in più (+5 more)

### Community 118 - "ExplainPanel"
Cohesion: 0.16
Nodes (4): modelName(), ExplainChat, ExplainPanel, preventFocusSteal()

### Community 119 - "Rational"
Cohesion: 0.08
Nodes (48): Part, at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf() (+40 more)

### Community 120 - "severalGraph.ts"
Cohesion: 0.26
Nodes (13): FieldContext, criticalLine(), named(), severalItems(), surface(), Scope, LinearScope, bounded() (+5 more)

### Community 121 - "files.ts"
Cohesion: 0.13
Nodes (21): cache, capability(), ClaudeRuntime, hostDownloads, HostError, hostSample, inClaudeViewer(), ModelTier (+13 more)

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "AiPanel"
Cohesion: 0.32
Nodes (4): NoteSubject, AiPanel, graphLabel(), texInline()

### Community 124 - "sheet.ts"
Cohesion: 0.06
Nodes (52): Definition, Line, complex, ExactComplexScope, Ode, OdeFunction, withWorkLimit(), ExactRandom (+44 more)

### Community 125 - "sql.ts"
Cohesion: 0.16
Nodes (18): @electric-sql/pglite, Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote() (+10 more)

### Community 126 - "geometry.test.ts"
Cohesion: 0.25
Nodes (7): PALETTES, light, pts, result(), square, text(), triangle

### Community 127 - "spiegami-qwen.mjs"
Cohesion: 0.29
Nodes (4): vite, minutes, postMessage(), started

### Community 128 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 129 - "graph/file.ts"
Cohesion: 0.12
Nodes (32): figureName(), graphFigure(), graphImage(), graphImagesFor(), OPEN, swatchSvg(), titleBand(), ACCENTS (+24 more)

### Community 131 - "schemaBlocks"
Cohesion: 0.20
Nodes (6): BlockWidget, schemaBlocks(), create(), setup(), setup(), setup()

### Community 132 - "solve.ts"
Cohesion: 0.18
Nodes (23): piMultiple(), isStandardUnknown(), numericRoots(), breaks(), cubeRoot(), equation(), holds(), inequality() (+15 more)

### Community 136 - "Glifo – note per Claude"
Cohesion: 0.25
Nodes (8): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Regole, sqlite()

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 139 - "schemaBlocks.ts"
Cohesion: 0.38
Nodes (6): findWidgetBlocks(), guardBlocks(), KINDS, WidgetBlock, WidgetKind, SchemaBlock

### Community 140 - "I modelli e le chiavi API"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), In prova sul ramo `prova` (7 ottobre 2026): Qwen3 nel browser per «Spiegami», Le idee dello studente (5 ottobre 2026)

### Community 158 - "graphNote.test.ts"
Cohesion: 0.07
Nodes (30): @codemirror/lang-markdown, noIndentedCode, mathMarkdown, addPlaceholders, buildDecorations(), clearAllPlaceholders(), clearPlaceholders, CommandTarget (+22 more)

## Knowledge Gaps
- **692 isolated node(s):** `Account: i propri appunti su ogni dispositivo, anche da condividere`, `La lavagna: idee in più`, `Schemi: idee in più`, `Il progetto`, `Cosa c'è` (+687 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 968 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **33 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `touchlog.ts`, `graph/file.ts`, `main.ts`, `compile`, `Parser`, `spec.ts`, `parse.ts`, `num`, `graph/preview.ts`, `chart.ts`, `schemaBlocks.ts`, `svg.ts`, `SchemaEditor`, `Board`, `SheetEditor`, `numerical.ts`, `arithmetic.ts`, `topics.ts`, `planPreview.ts`, `MathError`, `assistant.ts`, `linsys.ts`, `toNode`, `gantt.ts`, `graphNote.test.ts`, `logic.ts`, `graph.ts`, `complex.ts`, `namesIn`, `supabase.ts`, `several.ts`, `study.ts`, `functions.ts`, `finite.ts`, `NotesStore`, `graph/space.ts`, `distributions.ts`, `board/shapes.ts`, `markdown.ts`, `SidePanel`, `Pt`, `feedback.ts`, `dialogs.ts`, `ui/preview.ts`, `board.ts`, `src/relocation.ts`, `odesolve.ts`, `h`, `toLatex`, `explainSubjects.ts`, `spreadsheet/editor.ts`, `blockMove.ts`, `smoke-test.mjs`, `MarkdownEditor`, `symbolic.ts`, `sidePanel.ts`, `schema/editor.ts`, `toolbar.ts`, `BoardStore`, `explainPanel.ts`, `statsShown.ts`, `.render`, `siteUpdate.ts`, `localModels.ts`, `xlsx.ts`, `schema/shapes.ts`, `ExplainPanel`, `Rational`, `severalGraph.ts`, `files.ts`, `AiPanel`, `sheet.ts`?**
  _High betweenness centrality (0.181) - this node is a cross-community bridge._
- **Why does `vitest` connect `toLatex` to `touchlog.ts`, `sync.ts`, `parse.ts`, `num`, `Dove sono le cose`, `chart.ts`, `editor/lists.ts`, `svg.ts`, `store.ts`, `view3d.ts`, `assistant.ts`, `linsys.ts`, `graphNote.test.ts`, `package.json`, `gantt.ts`, `search.ts`, `spell.test.ts`, `supabase.ts`, `resize.ts`, `page.ts`, `FoldersStore`, `NotesStore`, `distributions.ts`, `board/shapes.ts`, `markdown.ts`, `feedback.ts`, `dialogs.ts`, `ui/preview.ts`, `board.ts`, `src/relocation.ts`, `h`, `spreadsheet/editor.ts`, `blockMove.ts`, `MarkdownEditor`, `sidePanel.ts`, `schema/editor.ts`, `toolbar.ts`, `BoardStore`, `explainPanel.ts`, `.render`, `ui/relocation.ts`, `spaces.ts`, `siteUpdate.ts`, `schema/preview.ts`, `localModels.ts`, `xlsx.ts`, `sheet.ts`, `sql.ts`, `geometry.test.ts`?**
  _High betweenness centrality (0.110) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `main.ts`, `graph/preview.ts`, `SchemaEditor`, `Board`, `SheetEditor`, `planPreview.ts`, `spell.test.ts`, `graph.ts`, `resize.ts`, `page.ts`, `FoldersStore`, `markdown.ts`, `SidePanel`, `feedback.ts`, `dialogs.ts`, `ui/preview.ts`, `board.ts`, `spreadsheet/editor.ts`, `sidePanel.ts`, `schema/editor.ts`, `toolbar.ts`, `explainPanel.ts`, `ui/relocation.ts`, `ExplainPanel`, `AiPanel`?**
  _High betweenness centrality (0.048) - this node is a cross-community bridge._
- **Are the 271 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `adoptGuestNotes()`) actually correct?**
  _`Dove sono le cose` has 271 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Account: i propri appunti su ogni dispositivo, anche da condividere`, `La lavagna: idee in più`, `Schemi: idee in più` to the rest of the system?**
  _692 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `touchlog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08653061224489796 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.034973798131692865 - nodes in this community are weakly interconnected._