# Graph Report - matherdown  (2026-10-09)

## Corpus Check
- 318 files · ~609,283 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5080 nodes · 18373 edges · 155 communities (119 shown, 36 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 598 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `10b22d66`
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
- markers.ts
- svg.ts
- statsGraph.ts
- SchemaEditor
- Board
- SheetEditor
- scopeWith
- numerical.ts
- arithmetic.ts
- index.ts
- engine.ts
- topics.ts
- parseSchema
- store.ts
- MathError
- supabase.ts
- dialogs.ts
- linsys.ts
- laplace.ts
- gantt.ts
- mathSyntax.ts
- search.ts
- spell.test.ts
- logic.ts
- .renderFormat
- complex.ts
- sheet.ts
- view3d.ts
- resize.ts
- schemaTools.test.ts
- BoardStore
- several.ts
- study.ts
- functions.ts
- finite.ts
- .folderItem
- NotesStore
- distributions.ts
- board/shapes.ts
- markdown.ts
- SidePanel
- Pt
- feedback.ts
- schemaBlocks.ts
- ui/preview.ts
- 20261004091555_note_condivise.sql
- board.ts
- src/relocation.ts
- odesolve.ts
- Glifo
- dependencies
- h
- toLatex
- statsShown.ts
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
- editor/lists.ts
- tutorial.mjs
- Abbonamenti
- explainPanel.ts
- supabase-stub.sql
- account-test.mjs
- planPreview.ts
- .render
- FoldersStore
- siteUpdate.ts
- page.ts
- severalGraph.ts
- suggestions.ts
- client.ts
- spellcheck
- localModels.ts
- xlsx.ts
- AiPanel
- graph.ts
- Il database degli account (Supabase)
- Commenti di chi prova Glifo
- ExplainPanel
- Rational
- dictionaries.ts
- files.ts
- Le spiegazioni, come funzionano
- formatLinear
- Sheet
- sql.ts
- geometry.test.ts
- spiegami-qwen.mjs
- createFakeSupabase
- graph/file.ts
- Glifo – note per Claude
- Field
- Parser
- SpellClient
- 20261008130026_commenti.sql
- scripts
- Costi
- linear.test.ts
- La lavagna
- I modelli e le chiavi API
- editor/editor.ts

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

## Communities (155 total, 36 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.09
Nodes (27): at(), browserStore, clip(), isSaved(), KINDS, LOG_KEY, LOG_MAX_LINES, LogStore (+19 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (106): addToGraphBlock(), graphsFromFile(), unhide(), account, ACCOUNT_OFF, active, aiShown(), aiToggle (+98 more)

### Community 3 - "compile"
Cohesion: 0.07
Nodes (51): typedSliderValue(), argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot(), fieldOn() (+43 more)

### Community 4 - "sync.ts"
Cohesion: 0.05
Nodes (39): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+31 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (98): formulaAtCursor(), GraphLabelLines, insertGraphBlock(), setGraphLabels(), conicItems(), isConicLine(), quadricEquation(), isFourierLine() (+90 more)

### Community 6 - "parse.ts"
Cohesion: 0.07
Nodes (36): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, differentialInFraction(), DISTRIBUTION_EXAMPLES (+28 more)

### Community 7 - "num"
Cohesion: 0.12
Nodes (99): atIntegers(), oneFraction(), withoutAbs(), exp(), hyperbolicToExp(), inverseRational(), sqrtEx(), termTransform() (+91 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (47): addLabel(), boxes, cameras, complexCoord(), coord(), drawings, drawnViews, endTex() (+39 more)

### Community 9 - "Dove sono le cose"
Cohesion: 0.04
Nodes (99): Dove sono le cose, Glifo – architettura, allNames(), answerFollowUp(), bareResult(), CHAT_SUBJECT, chatContext, ChatFn (+91 more)

### Community 10 - "chart.ts"
Cohesion: 0.14
Nodes (27): at(), breakEven(), Point, quantity(), tableItems(), textLabel(), chartData, chartFrom() (+19 more)

### Community 11 - "markers.ts"
Cohesion: 0.11
Nodes (36): Item, ListStyle, bullet(), bulletGroup(), childMarker(), column(), firstMarker(), label() (+28 more)

### Community 12 - "svg.ts"
Cohesion: 0.07
Nodes (67): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), staticGraphSvg(), chooseWindow(), chooseY(), clipLines() (+59 more)

### Community 13 - "statsGraph.ts"
Cohesion: 0.19
Nodes (15): number(), testItems(), classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX, Line (+7 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.10
Nodes (7): SchemaEditor, withLaneContents(), cellText(), insideLanes(), NodeLook, serializeSchema(), tableMetrics()

### Community 15 - "Board"
Cohesion: 0.09
Nodes (5): Board, loadPrefs(), penErases(), sizeChoice(), highlightName()

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (6): rangeLabel(), SheetEditor, CellRange, clearRange(), cloneSheet(), setCell()

### Community 17 - "scopeWith"
Cohesion: 0.09
Nodes (47): constantIntegrand(), depth(), inequalityMargin(), integralRegion, LayeredSolid, Multiple, planeMargin(), PlanePart (+39 more)

### Community 18 - "numerical.ts"
Cohesion: 0.12
Nodes (48): bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial(), interpolating() (+40 more)

### Community 19 - "arithmetic.ts"
Cohesion: 0.10
Nodes (48): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+40 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (39): b, bigops, c, calculus, fn, fr, fractions, functions (+31 more)

### Community 21 - "engine.ts"
Cohesion: 0.22
Nodes (9): @farscrl/hunspell-wasm, capitalize(), COMMON_FIXES, ELISIONS, inGlossary(), lower(), SpellEngine, GLOSSARY (+1 more)

### Community 22 - "topics.ts"
Cohesion: 0.10
Nodes (35): ATTRIBUTES, count(), cut(), ER_SHAPES, fieldText(), fitLines(), flowOrder(), formulaText() (+27 more)

### Community 23 - "parseSchema"
Cohesion: 0.10
Nodes (27): schemaSummary(), svg(), base64(), hide(), OPEN, schemasForFile(), schemasFromFile(), unhide() (+19 more)

### Community 24 - "store.ts"
Cohesion: 0.11
Nodes (14): fake-indexeddb, BoardBackend, done(), fromRecord(), IdbBoards, ofNote(), openBoardDatabase(), openDefault() (+6 more)

### Community 25 - "MathError"
Cohesion: 0.16
Nodes (46): MathError, angleBetween(), asMatrix(), basisOf(), cross(), Ctx, dataOf(), determinant() (+38 more)

### Community 26 - "supabase.ts"
Cohesion: 0.11
Nodes (36): @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken(), ensureSessionOf() (+28 more)

### Community 27 - "dialogs.ts"
Cohesion: 0.07
Nodes (41): AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible(), askThroughHost() (+33 more)

### Community 28 - "linsys.ts"
Cohesion: 0.06
Nodes (90): factorsOf(), formatRational(), eigenvalues(), EXACT, FLOAT, interpolateFloat(), surdText(), choices() (+82 more)

### Community 29 - "laplace.ts"
Cohesion: 0.20
Nodes (22): factoredPolynomial(), beyondPoles(), compiled(), E, fractionShown(), HALF, inverseLaplaceShown(), laplaceEx() (+14 more)

### Community 30 - "gantt.ts"
Cohesion: 0.07
Nodes (65): amount(), barColor(), crossings(), dateText(), dayOf(), fitText(), GanttOptions, ganttSvg() (+57 more)

### Community 31 - "mathSyntax.ts"
Cohesion: 0.18
Nodes (16): @lezer/highlight, @lezer/markdown, lineDepth(), mathDelimTag, mathTag, parseBlockMath(), mathBlockRule(), analyzeBlockOpen() (+8 more)

### Community 32 - "search.ts"
Cohesion: 0.17
Nodes (24): editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex() (+16 more)

### Community 33 - "spell.test.ts"
Cohesion: 0.13
Nodes (14): misspelledMark, refreshSpelling, setTarget, SKIP, SpellTarget, wordsToCheck(), findWords(), isProseCase() (+6 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - ".renderFormat"
Cohesion: 0.19
Nodes (12): fieldInput(), isLanes(), createEdgeCell(), edgeLook(), edgeStyle(), edgeTextAt(), insertSchema(), nodeLook() (+4 more)

### Community 36 - "complex.ts"
Cohesion: 0.06
Nodes (64): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexValue(), isInequality() (+56 more)

### Community 37 - "sheet.ts"
Cohesion: 0.07
Nodes (54): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+46 more)

### Community 38 - "view3d.ts"
Cohesion: 0.06
Nodes (85): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+77 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "schemaTools.test.ts"
Cohesion: 0.13
Nodes (24): laneOf(), alignBoxes(), Alignment, Box, distributeBoxes(), Position, cellHtml(), crc32() (+16 more)

### Community 41 - "BoardStore"
Cohesion: 0.08
Nodes (14): BoardStore, MemoryBoards, backup(), restore(), BackupNote, backupNotes(), restoreBackup(), RestoreBoards (+6 more)

### Community 42 - "several.ts"
Cohesion: 0.08
Nodes (65): absOf(), boundsOf(), close(), definite(), fourierProblem, fourierShown(), isTrig(), isZero() (+57 more)

### Community 43 - "study.ts"
Cohesion: 0.07
Nodes (68): fracTex(), fracText(), nearFraction(), piMultiple(), surd(), EMPTY_SCOPE, decimalSeparator(), Digits (+60 more)

### Community 44 - "functions.ts"
Cohesion: 0.08
Nodes (69): EMPTY, number(), addFormat(), decimalsOf(), divFormat(), fixedNumber(), GENERAL, generalNumber() (+61 more)

### Community 45 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 46 - ".folderItem"
Cohesion: 0.20
Nodes (4): clear(), formatDate(), NotesPanel, NotesPanelDeps

### Community 47 - "NotesStore"
Cohesion: 0.07
Nodes (41): accountSpace(), adoptGuestNotes(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf(), setCurrentAccount() (+33 more)

### Community 48 - "distributions.ts"
Cohesion: 0.07
Nodes (61): addExp(), choose(), continuousQuantile(), discreteQuantile(), Distribution, exactIntervalProbability(), factorialBig(), FAMILIES (+53 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.14
Nodes (33): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+25 more)

### Community 50 - "markdown.ts"
Cohesion: 0.13
Nodes (22): dompurify, highlight.js, markdown-it-footnote, dataRange(), moveAttrs(), renderTexOrError(), renderTexWithResult(), configurePurify() (+14 more)

### Community 51 - "SidePanel"
Cohesion: 0.20
Nodes (4): cleanKatexError(), displayCode(), preventFocusSteal(), SidePanel

### Community 52 - "Pt"
Cohesion: 0.11
Nodes (14): clampZoom(), coalesced(), Finger, LassoAction, PanAction, PinchAction, pointsOf(), pressureOf() (+6 more)

### Community 53 - "feedback.ts"
Cohesion: 0.08
Nodes (39): vite-plugin-pwa, AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountOffMessage(), Site, commentDate(), commentItem() (+31 more)

### Community 54 - "schemaBlocks.ts"
Cohesion: 0.08
Nodes (29): BlockWidget, findWidgetBlocks(), guardBlocks(), KINDS, schemaBlocks(), WidgetBlock, WidgetKind, graphsForFile() (+21 more)

### Community 55 - "ui/preview.ts"
Cohesion: 0.12
Nodes (10): GraphLabels, BlockKind, MoveDir, BLOCK_NAMES, blockKindOf(), MOVABLE_BLOCKS, PATHS, hidden() (+2 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "board.ts"
Cohesion: 0.05
Nodes (67): Action, ACTION_NAMES, BoardOptions, DOT_SIZES, DrawAction, EraseAction, EraserMode, HANDLE_REACH (+59 more)

### Community 58 - "src/relocation.ts"
Cohesion: 0.07
Nodes (52): PNG_ICONS, BackupBoard, buildPackage(), importPackage(), isRelocationPackage(), moveDayLabel(), NEW_ORIGIN, OLD_ORIGIN (+44 more)

### Community 59 - "odesolve.ts"
Cohesion: 0.08
Nodes (74): linearIn(), addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames() (+66 more)

### Community 60 - "Glifo"
Cohesion: 0.13
Nodes (15): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Commenti, Compatibilità con VS Code, Condividere una nota con un link (+7 more)

### Community 61 - "dependencies"
Cohesion: 0.05
Nodes (36): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+28 more)

### Community 62 - "h"
Cohesion: 0.08
Nodes (37): SyncStatus, viewSwitch, AccountButton, confirmAccountDeletion(), messageOf(), openAccountDialog(), openLoginDialog(), codeStep() (+29 more)

### Community 63 - "toLatex"
Cohesion: 0.05
Nodes (62): vitest, areaFor(), GraphItem, multipleLabel(), parseGraph(), names(), STUDY_GRAPH, studyItems() (+54 more)

### Community 64 - "statsShown.ts"
Cohesion: 0.15
Nodes (35): expSumValue(), Lin, check(), correlation(), count(), covariance(), Data, DATA_FUNCTIONS (+27 more)

### Community 65 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 66 - "spreadsheet/editor.ts"
Cohesion: 0.07
Nodes (63): openSheet(), saveSheetBlock(), tablesNote(), currentCall(), Editing, MenuEntry, Move, openSheetEditor() (+55 more)

### Community 67 - "blockMove.ts"
Cohesion: 0.11
Nodes (34): blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove, blockPlace(), closed() (+26 more)

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
Cohesion: 0.11
Nodes (26): End, Family, CompileOptions, ExactScope, RelOp, ALL, compileOf(), complement() (+18 more)

### Community 73 - "MarkdownEditor"
Cohesion: 0.16
Nodes (5): @codemirror/commands, EditorCallbacks, MarkdownEditor, insertTemplate(), setup()

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (61): primitive(), verified(), atValues(), Converter, coordinates(), decimalText(), definiteParts(), definiteValue() (+53 more)

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
Nodes (60): ALIGN, ARROW_NAMES, AT_ICONS, AT_NAMES, BASE_PRESETS, BIG_ARROWS, DB_PRESETS, Direction (+52 more)

### Community 79 - "toolbar.ts"
Cohesion: 0.16
Nodes (19): insertBlock(), InsertOptions, toggleLinePrefix(), wrapSelection(), besideSchema(), schemaBlockRanges(), Action, createToolbar() (+11 more)

### Community 82 - "editor/lists.ts"
Cohesion: 0.18
Nodes (30): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+22 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.12
Nodes (10): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+2 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.14
Nodes (14): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+6 more)

### Community 91 - "explainPanel.ts"
Cohesion: 0.08
Nodes (40): Explanation, FollowUp, REPLY_TOKENS, definedName(), formulaTopic(), graphTopic(), numberText(), studyOf() (+32 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.13
Nodes (9): device(), login(), newContext, waitFor(), b64(), CODE, GOOGLE_CODE, ROOT (+1 more)

### Community 97 - "planPreview.ts"
Cohesion: 0.18
Nodes (11): planSwatchSvg(), planFigure(), planName(), ganttWidth(), PlanView, GraphLook, loadDialect(), svgToPng() (+3 more)

### Community 98 - ".render"
Cohesion: 0.12
Nodes (18): Prefs, BOARD_PALETTES, BoardPalette, BoardTheme, inkName(), mid(), outlineSvg(), PEN_SIZE (+10 more)

### Community 100 - "FoldersStore"
Cohesion: 0.18
Nodes (3): cleanFolderName(), FoldersStore, sameName()

### Community 101 - "siteUpdate.ts"
Cohesion: 0.17
Nodes (17): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, loadPart() (+9 more)

### Community 102 - "page.ts"
Cohesion: 0.06
Nodes (47): katex, accountDataFile(), currentAccount(), PullResult, openShareDialog(), changeAccess(), changeCopy(), copy() (+39 more)

### Community 103 - "severalGraph.ts"
Cohesion: 0.20
Nodes (15): FieldContext, fourierItems(), criticalLine(), named(), severalItems(), surface(), Scope, partialSum() (+7 more)

### Community 104 - "suggestions.ts"
Cohesion: 0.20
Nodes (7): templateInsertion(), EditorMathContext, expand(), preferredIndex(), SuggestionController, parseTemplate(), templateText()

### Community 105 - "client.ts"
Cohesion: 0.21
Nodes (8): Backend, pageBackend(), SpellClientOptions, workerBackend(), WorkerUnavailable, SpellLanguage, SpellRequest, handle

### Community 106 - "spellcheck"
Cohesion: 0.21
Nodes (8): spellcheck(), close(), misspelledAt(), openAt(), replace(), tooltipView(), SpellChecker, SpellcheckOptions

### Community 107 - "localModels.ts"
Cohesion: 0.09
Nodes (27): chat(), GlifoError, Gpu, load(), post(), remove(), scope, shaderF16() (+19 more)

### Community 108 - "xlsx.ts"
Cohesion: 0.07
Nodes (54): RFC-4180, fflate, sheetSummary(), csvDelimiter(), csvToSheet(), field(), italian(), parseCsv() (+46 more)

### Community 113 - "graph.ts"
Cohesion: 0.05
Nodes (35): @maxgraph/core, AT_X, COMPASS, createGraph(), drawSchema(), isEdgeLook(), isNodeLook(), loadSchema() (+27 more)

### Community 116 - "Il database degli account (Supabase)"
Cohesion: 0.17
Nodes (11): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Il trasloco su glifo.page (ottobre 2026), Nell'app (+3 more)

### Community 117 - "Commenti di chi prova Glifo"
Cohesion: 0.17
Nodes (11): Promemoria per lo studente, Account: i propri appunti su ogni dispositivo, anche da condividere, Commenti di chi prova Glifo, Idee per il futuro, In programma, La lavagna: idee in più, Più avanti, Schemi: idee in più (+3 more)

### Community 118 - "ExplainPanel"
Cohesion: 0.15
Nodes (5): modelName(), ExplainChat, ExplainPanel, preventFocusSteal(), formulasSummary()

### Community 119 - "Rational"
Cohesion: 0.07
Nodes (50): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+42 more)

### Community 120 - "dictionaries.ts"
Cohesion: 0.20
Nodes (5): download(), fetchDictionary(), FILES, DictionaryData, createSpellService()

### Community 121 - "files.ts"
Cohesion: 0.14
Nodes (20): cache, capability(), ClaudeRuntime, hostDownloads, HostError, inClaudeViewer(), ModelTier, runtime() (+12 more)

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "formatLinear"
Cohesion: 0.36
Nodes (10): circleText(), degreesText(), entry(), formatLinear(), lineText(), matrixTex(), plainArea(), planeText() (+2 more)

### Community 124 - "Sheet"
Cohesion: 0.08
Nodes (26): ExactComplexScope, Ode, withWorkLimit(), FiniteContext, FormattedResult, differentialRequest, pieces(), MathNode (+18 more)

### Community 125 - "sql.ts"
Cohesion: 0.16
Nodes (19): @electric-sql/pglite, Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote() (+11 more)

### Community 126 - "geometry.test.ts"
Cohesion: 0.29
Nodes (6): light, pts, result(), square, text(), triangle

### Community 127 - "spiegami-qwen.mjs"
Cohesion: 0.29
Nodes (4): vite, minutes, postMessage(), started

### Community 128 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 129 - "graph/file.ts"
Cohesion: 0.12
Nodes (32): figureName(), graphFigure(), graphImage(), graphImagesFor(), OPEN, swatchSvg(), titleBand(), ACCENTS (+24 more)

### Community 131 - "Glifo – note per Claude"
Cohesion: 0.25
Nodes (8): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Regole, sqlite()

### Community 132 - "Field"
Cohesion: 0.11
Nodes (8): characteristicPolynomial(), eigenvectors(), Field, formatPolynomial(), interpolate(), maxSize(), polynomialIn(), tolerance()

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 139 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 140 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 141 - "linear.test.ts"
Cohesion: 0.40
Nodes (5): A, B, q(), result(), text()

### Community 142 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 143 - "I modelli e le chiavi API"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), In prova sul ramo `prova` (7 ottobre 2026): Qwen3 nel browser per «Spiegami», Le idee dello studente (5 ottobre 2026)

### Community 158 - "editor/editor.ts"
Cohesion: 0.03
Nodes (75): description, name, private, type, version, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/lang-markdown (+67 more)

## Knowledge Gaps
- **692 isolated node(s):** `Comandi`, `Regole`, `Oggi: tutto gratis, tranne il dominio`, `Gratis anche quando Glifo sarà aperto a tutti`, `Da attivare solo quando lo dice lo studente` (+687 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 968 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **36 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `touchlog.ts`, `graph/file.ts`, `main.ts`, `compile`, `Parser`, `spec.ts`, `parse.ts`, `num`, `graph/preview.ts`, `chart.ts`, `svg.ts`, `SchemaEditor`, `Board`, `SheetEditor`, `numerical.ts`, `arithmetic.ts`, `topics.ts`, `MathError`, `supabase.ts`, `dialogs.ts`, `linsys.ts`, `gantt.ts`, `logic.ts`, `.renderFormat`, `complex.ts`, `sheet.ts`, `view3d.ts`, `schemaTools.test.ts`, `BoardStore`, `several.ts`, `study.ts`, `functions.ts`, `finite.ts`, `NotesStore`, `distributions.ts`, `board/shapes.ts`, `markdown.ts`, `SidePanel`, `Pt`, `feedback.ts`, `schemaBlocks.ts`, `ui/preview.ts`, `board.ts`, `src/relocation.ts`, `odesolve.ts`, `h`, `toLatex`, `statsShown.ts`, `spreadsheet/editor.ts`, `blockMove.ts`, `smoke-test.mjs`, `MarkdownEditor`, `symbolic.ts`, `sidePanel.ts`, `schema/editor.ts`, `toolbar.ts`, `explainPanel.ts`, `planPreview.ts`, `.render`, `siteUpdate.ts`, `severalGraph.ts`, `localModels.ts`, `xlsx.ts`, `AiPanel`, `graph.ts`, `ExplainPanel`, `Rational`, `files.ts`, `Sheet`?**
  _High betweenness centrality (0.174) - this node is a cross-community bridge._
- **Why does `vitest` connect `toLatex` to `touchlog.ts`, `sync.ts`, `num`, `graph/preview.ts`, `Dove sono le cose`, `chart.ts`, `markers.ts`, `svg.ts`, `linear.test.ts`, `parseSchema`, `store.ts`, `supabase.ts`, `dialogs.ts`, `linsys.ts`, `editor/editor.ts`, `gantt.ts`, `search.ts`, `spell.test.ts`, `sheet.ts`, `view3d.ts`, `resize.ts`, `schemaTools.test.ts`, `BoardStore`, `NotesStore`, `distributions.ts`, `board/shapes.ts`, `markdown.ts`, `feedback.ts`, `schemaBlocks.ts`, `board.ts`, `src/relocation.ts`, `h`, `spreadsheet/editor.ts`, `blockMove.ts`, `MarkdownEditor`, `sidePanel.ts`, `editor/lists.ts`, `explainPanel.ts`, `.render`, `siteUpdate.ts`, `page.ts`, `localModels.ts`, `xlsx.ts`, `Rational`, `sql.ts`, `geometry.test.ts`?**
  _High betweenness centrality (0.104) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `main.ts`, `graph/preview.ts`, `SchemaEditor`, `Board`, `SheetEditor`, `dialogs.ts`, `spell.test.ts`, `.renderFormat`, `resize.ts`, `BoardStore`, `.folderItem`, `NotesStore`, `SidePanel`, `feedback.ts`, `ui/preview.ts`, `board.ts`, `src/relocation.ts`, `spreadsheet/editor.ts`, `sidePanel.ts`, `schema/editor.ts`, `toolbar.ts`, `explainPanel.ts`, `planPreview.ts`, `page.ts`, `spellcheck`, `AiPanel`, `ExplainPanel`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **Are the 279 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `adoptGuestNotes()`) actually correct?**
  _`Dove sono le cose` has 279 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Comandi`, `Regole`, `Oggi: tutto gratis, tranne il dominio` to the rest of the system?**
  _692 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `touchlog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08653061224489796 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.03903286978508218 - nodes in this community are weakly interconnected._