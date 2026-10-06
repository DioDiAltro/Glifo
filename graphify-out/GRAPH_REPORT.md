# Graph Report - matherdown  (2026-10-06)

## Corpus Check
- 266 files · ~515,748 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 4410 nodes · 15887 edges · 128 communities (104 shown, 24 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 471 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `44e82c0c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- touchlog.ts
- Parser
- main.ts
- odesolve.ts
- sync.ts
- spec.ts
- several.ts
- num
- graph/preview.ts
- toLatex
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
- client.ts
- Board
- distributions.ts
- store.ts
- linear.ts
- statsGraph.ts
- assistant.ts
- parse.ts
- schema/templates.ts
- Pt
- graph/space.ts
- spreadsheet/evaluate.ts
- graphNote.test.ts
- logic.ts
- FoldersStore
- arithmetic.ts
- namesIn
- vitest
- resize.ts
- statsShown.ts
- view3d.ts
- NotesStore
- study.ts
- functions.ts
- scopeWith
- ink.ts
- picture.ts
- fourier.ts
- board/shapes.ts
- linsys.ts
- solve.ts
- search.ts
- h
- engine.ts
- finite.ts
- 20261004091555_note_condivise.sql
- schemaTools.test.ts
- Field
- grafo-html.mjs
- graph.ts
- dependencies
- supabase.ts
- Le spiegazioni, come funzionano
- ui/preview.ts
- Stroke
- parseSchema
- Sheet
- spreadsheet/file.ts
- Benvenuto in Glifo
- compilerOptions
- Dove sono le cose
- Piano per piano
- blockMove.ts
- symbolic.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- session-start.sh
- .claude/CLAUDE.md
- editor.test.ts
- tutorial.mjs
- Abbonamenti
- supabase-stub.sql
- account-test.mjs
- Il database degli account (Supabase)
- scripts
- Parser
- editor/editor.ts
- Costi
- fake-supabase.mjs
- createFakeSupabase
- downloadText
- Glifo – note per Claude
- page.ts
- toolbar.ts
- graph/file.ts
- sheet.ts
- Rational
- spell.test.ts
- sidePanel.ts
- Idee per il futuro
- sql.ts
- Glifo
- La lavagna
- smoke-test.mjs
- numerical.test.ts
- I modelli e le chiavi API
- icons.mjs

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 163 edges
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
- `Come viene pubblicata` --references--> `dist()`  [INFERRED]
  README.md → src/board/shapes.ts
- `Dove sono le cose` --references--> `ConicElements`  [INFERRED]
  ARCHITETTURA.md → src/math/conics.ts
- `Funzionalità` --references--> `k()`  [INFERRED]
  README.md → src/math/numerical.ts
- `Dove sono le cose` --references--> `adoptGuestNotes()`  [INFERRED]
  ARCHITETTURA.md → src/account/space.ts
- `Dove sono le cose` --references--> `shareNote()`  [INFERRED]
  ARCHITETTURA.md → src/account/supabase.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (128 total, 24 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.09
Nodes (26): at(), browserStore, clip(), isSaved(), KINDS, LOG_KEY, LOG_MAX_LINES, LogStore (+18 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (103): graphsFromFile(), unhide(), account, active, app, applySpellcheck(), applyTheme(), backdrop (+95 more)

### Community 3 - "odesolve.ts"
Cohesion: 0.08
Nodes (76): addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames(), constantParticular() (+68 more)

### Community 4 - "sync.ts"
Cohesion: 0.05
Nodes (42): AccountSync, withLock(), accountDataFile(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow (+34 more)

### Community 5 - "spec.ts"
Cohesion: 0.06
Nodes (91): conicItems(), isConicLine(), quadricEquation(), isFourierLine(), isTestLine(), constantIntegrand(), inequalityMargin(), multipleOf() (+83 more)

### Community 6 - "several.ts"
Cohesion: 0.10
Nodes (53): numShown(), shown(), size(), severalLimit, exText(), fractionNear(), convergesAt(), gcdInt() (+45 more)

### Community 7 - "num"
Cohesion: 0.14
Nodes (81): atIntegers(), hyperbolicToExp(), polyEx(), similarSolution(), algebraic(), bigGcd(), byParts(), candidates() (+73 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (42): addLabel(), boxes, cameras, complexCoord(), coord(), drawings, drawnViews, endTex() (+34 more)

### Community 9 - "toLatex"
Cohesion: 0.06
Nodes (57): FieldContext, fourierItems(), isNumericalLine(), numericalItems(), criticalLine(), named(), severalItems(), surface() (+49 more)

### Community 10 - "complex.ts"
Cohesion: 0.06
Nodes (65): COMPLEX_FUNCTIONS, farthest(), gaussItem(), hasExponential(), inZ(), isComplexLine(), isComplexValue(), isInequality() (+57 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.09
Nodes (59): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+51 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (54): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseWindow(), chooseY(), clipLines(), domainEdge() (+46 more)

### Community 13 - "spreadsheet/editor.ts"
Cohesion: 0.07
Nodes (70): openSheet(), saveSheetBlock(), currentCall(), Editing, MenuEntry, Move, openSheetEditor(), PATHS (+62 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.09
Nodes (12): SchemaEditor, cellText(), createEdgeCell(), edgeLook(), edgeStyle(), nodeLook(), nodeStyle(), readSchema() (+4 more)

### Community 15 - "conics.ts"
Cohesion: 0.18
Nodes (29): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+21 more)

### Community 16 - "SheetEditor"
Cohesion: 0.09
Nodes (7): rangeLabel(), SheetEditor, serializeSheet(), CellRange, clearRange(), cloneSheet(), setCell()

### Community 17 - "compile"
Cohesion: 0.09
Nodes (43): areaFor(), constantValue(), argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot() (+35 more)

### Community 18 - "MathError"
Cohesion: 0.13
Nodes (48): MathError, FormatOptions, bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint() (+40 more)

### Community 19 - "markdown.ts"
Cohesion: 0.11
Nodes (32): bulletGroup(), sameList(), moveAttrs(), checkHtml(), checkTitle(), cache, escapeHtml(), renderTexOrError() (+24 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (42): b, bigops, c, calculus, fn, fr, fractions, functions (+34 more)

### Community 21 - "client.ts"
Cohesion: 0.10
Nodes (14): Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download(), fetchDictionary() (+6 more)

### Community 22 - "Board"
Cohesion: 0.09
Nodes (7): Board, loadPrefs(), penErases(), sizeChoice(), BoardTheme, highlightName(), inkName()

### Community 23 - "distributions.ts"
Cohesion: 0.06
Nodes (62): addExp(), choose(), continuousQuantile(), discreteQuantile(), Distribution, exactIntervalProbability(), factorialBig(), FAMILIES (+54 more)

### Community 24 - "store.ts"
Cohesion: 0.05
Nodes (23): fake-indexeddb, BoardOptions, BoardBackend, BoardChange, BoardData, BoardStore, done(), fromRecord() (+15 more)

### Community 25 - "linear.ts"
Cohesion: 0.10
Nodes (57): formatNumber(), angleBetween(), asMatrix(), basisOf(), circleText(), complexText(), cross(), Ctx (+49 more)

### Community 26 - "statsGraph.ts"
Cohesion: 0.20
Nodes (14): number(), testItems(), classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX, Line (+6 more)

### Community 27 - "assistant.ts"
Cohesion: 0.07
Nodes (39): @anthropic-ai/sdk, AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible() (+31 more)

### Community 28 - "parse.ts"
Cohesion: 0.05
Nodes (48): typedSliderValue(), errorMessage(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES (+40 more)

### Community 29 - "schema/templates.ts"
Cohesion: 0.11
Nodes (17): DEFAULT_EDGE, NodeLook, SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), tableMetrics(), conceptMap (+9 more)

### Community 30 - "Pt"
Cohesion: 0.16
Nodes (8): clampZoom(), PanAction, PinchAction, pressureOf(), validView(), EllipseFit, BoardView, Pt

### Community 31 - "graph/space.ts"
Cohesion: 0.10
Nodes (57): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+49 more)

### Community 32 - "spreadsheet/evaluate.ts"
Cohesion: 0.09
Nodes (42): sheetSummary(), CellResult, EMPTY, evaluateSheet(), number(), SheetEvaluator, decimalsOf(), divFormat() (+34 more)

### Community 33 - "graphNote.test.ts"
Cohesion: 0.09
Nodes (25): acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult, calcResults(), CheckWidget, formulasUntil() (+17 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "FoldersStore"
Cohesion: 0.08
Nodes (18): cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder(), loadClosedFolders(), RemoteFolder (+10 more)

### Community 36 - "arithmetic.ts"
Cohesion: 0.07
Nodes (71): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+63 more)

### Community 37 - "namesIn"
Cohesion: 0.13
Nodes (37): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+29 more)

### Community 38 - "vitest"
Cohesion: 0.08
Nodes (22): @codemirror/state, @codemirror/view, vite-plugin-pwa, vitest, InsertOptions, toggleLinePrefix(), addPlaceholders, Placeholder (+14 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "statsShown.ts"
Cohesion: 0.17
Nodes (31): check(), correlation(), count(), covariance(), Data, dataStatistic(), deviation(), fail() (+23 more)

### Community 41 - "view3d.ts"
Cohesion: 0.12
Nodes (29): Face, planeTolerance(), Plane, Vec3, escapeXml(), arrowHead(), boxShape(), Coverage (+21 more)

### Community 42 - "NotesStore"
Cohesion: 0.07
Nodes (38): accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf() (+30 more)

### Community 43 - "study.ts"
Cohesion: 0.10
Nodes (43): close(), Definite, definiteIntegral(), exValue(), samples(), EMPTY_SCOPE, Piece, limit() (+35 more)

### Community 44 - "functions.ts"
Cohesion: 0.12
Nodes (44): addFormat(), boolArg(), BY_NAME, conditional(), criterion(), Ctx, define(), EURO (+36 more)

### Community 45 - "scopeWith"
Cohesion: 0.07
Nodes (61): depth(), integralRegion, LayeredSolid, Multiple, planeMargin(), PlanePart, radiusOf(), spaceLayers() (+53 more)

### Community 46 - "ink.ts"
Cohesion: 0.18
Nodes (14): Prefs, BOARD_PALETTES, BoardPalette, mid(), outlineSvg(), PEN_SIZE, shapeSvg(), SizeChoice (+6 more)

### Community 47 - "picture.ts"
Cohesion: 0.12
Nodes (18): staticGraphSvg(), containing(), chooseBox(), GraphSpec, DrawOptions, Palette, PALETTES, DEFAULT_CAMERA (+10 more)

### Community 48 - "fourier.ts"
Cohesion: 0.23
Nodes (19): absOf(), boundsOf(), close(), definite(), fourierProblem, fourierShown(), isTrig(), isZero() (+11 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (37): DrawAction, adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners() (+29 more)

### Community 50 - "linsys.ts"
Cohesion: 0.14
Nodes (40): choices(), gcd(), matrixSystem(), minorsGcd(), ONE, parametricSystem(), PARAMS, polyDeterminant() (+32 more)

### Community 51 - "solve.ts"
Cohesion: 0.15
Nodes (30): polynomialIn(), rref(), splitRoot(), isStandardUnknown(), linearSystem(), matrixEquation(), parametricRows(), substitute() (+22 more)

### Community 52 - "search.ts"
Cohesion: 0.15
Nodes (26): SuggestionItem, editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase() (+18 more)

### Community 53 - "h"
Cohesion: 0.07
Nodes (52): SyncStatus, aiService, board, openGuide(), viewSwitch, openSignedOut(), printButton(), ShareDialogDeps (+44 more)

### Community 54 - "engine.ts"
Cohesion: 0.17
Nodes (9): @farscrl/hunspell-wasm, capitalize(), COMMON_FIXES, ELISIONS, inGlossary(), lower(), SpellEngine, GLOSSARY (+1 more)

### Community 55 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "schemaTools.test.ts"
Cohesion: 0.20
Nodes (13): alignBoxes(), Alignment, Box, distributeBoxes(), Position, base64(), crc32(), svgSize() (+5 more)

### Community 58 - "Field"
Cohesion: 0.13
Nodes (3): Field, formatPolynomial(), interpolate()

### Community 59 - "grafo-html.mjs"
Cohesion: 0.25
Nodes (4): graphFile, names, namesFile, root

### Community 60 - "graph.ts"
Cohesion: 0.06
Nodes (35): @maxgraph/core, AT_X, cellHtml(), COMPASS, createGraph(), drawSchema(), insertSchema(), isEdgeLook() (+27 more)

### Community 61 - "dependencies"
Cohesion: 0.06
Nodes (34): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+26 more)

### Community 62 - "supabase.ts"
Cohesion: 0.11
Nodes (30): @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken(), ensureSessionOf() (+22 more)

### Community 63 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 64 - "ui/preview.ts"
Cohesion: 0.08
Nodes (23): GraphLabels, renameGraphScope(), renameScopeKeys(), BlockKind, MoveDir, draw(), drawCached(), drawn (+15 more)

### Community 65 - "Stroke"
Cohesion: 0.32
Nodes (3): EraseAction, Step, Stroke

### Community 66 - "parseSchema"
Cohesion: 0.13
Nodes (18): schemaSummary(), svg(), SchemaEditorOptions, hide(), OPEN, schemasForFile(), schemasFromFile(), unhide() (+10 more)

### Community 67 - "Sheet"
Cohesion: 0.06
Nodes (49): GaussLine, Definition, Line, ExactComplexScope, Ode, withWorkLimit(), FiniteContext, FormattedResult (+41 more)

### Community 68 - "spreadsheet/file.ts"
Cohesion: 0.47
Nodes (5): hide(), OPEN, sheetsForFile(), sheetsFromFile(), unhide()

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "Dove sono le cose"
Cohesion: 0.05
Nodes (65): Dove sono le cose, Glifo – architettura, Action, ACTION_NAMES, coalesced(), DOT_SIZES, EraserMode, Finger (+57 more)

### Community 72 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 73 - "blockMove.ts"
Cohesion: 0.10
Nodes (35): blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove, blockPlace(), closed() (+27 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (63): linearIn(), primitive(), verified(), atValues(), combine(), commonMonomial(), Converter, coordinates() (+55 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.06
Nodes (49): ALIGN, ARROW_NAMES, AT_ICONS, AT_NAMES, BASE_PRESETS, BIG_ARROWS, DB_PRESETS, Direction (+41 more)

### Community 82 - "editor.test.ts"
Cohesion: 0.06
Nodes (30): templateInsertion(), CODE_NODES, CommandToken, commandTokenAt(), EditorMathContext, isInCode(), MATH_NODES, mathContextAt() (+22 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.20
Nodes (6): centerOf(), clickOn(), ffmpeg, SCENES, SIZE, work

### Community 90 - "Abbonamenti"
Cohesion: 0.14
Nodes (14): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+6 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.20
Nodes (4): device(), login(), newContext, waitFor()

### Community 97 - "Il database degli account (Supabase)"
Cohesion: 0.17
Nodes (11): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Nell'app, Note condivise con un link (+3 more)

### Community 98 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 100 - "Parser"
Cohesion: 0.29
Nodes (3): FormulaError, parseFormula(), Parser

### Community 103 - "editor/editor.ts"
Cohesion: 0.05
Nodes (47): description, name, private, type, version, @codemirror/autocomplete, @codemirror/commands, @codemirror/language (+39 more)

### Community 105 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, Quando lo studente dice di cominciare

### Community 106 - "fake-supabase.mjs"
Cohesion: 0.25
Nodes (6): @electric-sql/pglite, b64(), CODE, GOOGLE_CODE, ROOT, SUPABASE_URL

### Community 107 - "createFakeSupabase"
Cohesion: 0.60
Nodes (6): createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 108 - "downloadText"
Cohesion: 0.48
Nodes (4): loadDialect(), downloadBlob(), downloadText(), fileNameFor()

### Community 109 - "Glifo – note per Claude"
Cohesion: 0.22
Nodes (9): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole (+1 more)

### Community 110 - "page.ts"
Cohesion: 0.06
Nodes (46): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, openShareDialog(), changeAccess(), changeCopy(), copy(), refreshChanged() (+38 more)

### Community 113 - "toolbar.ts"
Cohesion: 0.10
Nodes (18): closeMathBlockOnEnter(), EditorCallbacks, MarkdownEditor, tabOutOfMath(), insertBlock(), insertTemplate(), wrapSelection(), Action (+10 more)

### Community 116 - "graph/file.ts"
Cohesion: 0.10
Nodes (36): FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsForFile(), hide(), OPEN (+28 more)

### Community 117 - "sheet.ts"
Cohesion: 0.04
Nodes (75): numericPartials(), formatGauss(), formatList(), imaginary(), join(), expSumValue(), isCounter(), ExactFunction (+67 more)

### Community 121 - "Rational"
Cohesion: 0.08
Nodes (34): Part, asin(), atan(), evaluateExactComplex(), exactSqrt(), GaussRational, sinh(), sqrt() (+26 more)

### Community 122 - "spell.test.ts"
Cohesion: 0.08
Nodes (23): @codemirror/lang-markdown, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt() (+15 more)

### Community 123 - "sidePanel.ts"
Cohesion: 0.14
Nodes (16): cleanKatexError(), renderTex(), CATEGORIES, cardPreviewTex(), formPreviewTex(), ParsedTemplate, parseTemplate(), PLACEHOLDER_TEX (+8 more)

### Community 124 - "Idee per il futuro"
Cohesion: 0.33
Nodes (6): Account: i propri appunti su ogni dispositivo, anche da condividere, Idee per il futuro, In programma, La lavagna: idee in più, Più avanti, Schemi: idee in più

### Community 125 - "sql.ts"
Cohesion: 0.17
Nodes (18): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+10 more)

### Community 127 - "Glifo"
Cohesion: 0.15
Nodes (13): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Funzionalità (+5 more)

### Community 128 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 129 - "smoke-test.mjs"
Cohesion: 0.29
Nodes (4): markdown-it, vite, firstVisit(), plainContext

### Community 132 - "numerical.test.ts"
Cohesion: 0.60
Nodes (3): result(), text(), verdict()

### Community 133 - "I modelli e le chiavi API"
Cohesion: 0.50
Nodes (4): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), Le idee dello studente (5 ottobre 2026)

## Knowledge Gaps
- **593 isolated node(s):** `session-start.sh script`, `name`, `private`, `version`, `description` (+588 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 824 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **24 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `touchlog.ts`, `Parser`, `main.ts`, `odesolve.ts`, `spec.ts`, `several.ts`, `num`, `graph/preview.ts`, `toLatex`, `complex.ts`, `svg.ts`, `spreadsheet/editor.ts`, `conics.ts`, `SheetEditor`, `compile`, `MathError`, `markdown.ts`, `Board`, `distributions.ts`, `store.ts`, `linear.ts`, `assistant.ts`, `parse.ts`, `Pt`, `graph/space.ts`, `spreadsheet/evaluate.ts`, `graphNote.test.ts`, `logic.ts`, `arithmetic.ts`, `namesIn`, `vitest`, `NotesStore`, `functions.ts`, `ink.ts`, `picture.ts`, `fourier.ts`, `board/shapes.ts`, `linsys.ts`, `solve.ts`, `h`, `finite.ts`, `schemaTools.test.ts`, `graph.ts`, `supabase.ts`, `ui/preview.ts`, `Sheet`, `blockMove.ts`, `symbolic.ts`, `schema/editor.ts`, `Parser`, `toolbar.ts`, `graph/file.ts`, `sheet.ts`, `Rational`?**
  _High betweenness centrality (0.179) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `touchlog.ts`, `main.ts`, `sync.ts`, `numerical.test.ts`, `num`, `toLatex`, `editor/lists.ts`, `svg.ts`, `spreadsheet/editor.ts`, `distributions.ts`, `store.ts`, `assistant.ts`, `parse.ts`, `graph/space.ts`, `graphNote.test.ts`, `FoldersStore`, `namesIn`, `resize.ts`, `NotesStore`, `ink.ts`, `picture.ts`, `board/shapes.ts`, `linsys.ts`, `search.ts`, `h`, `schemaTools.test.ts`, `supabase.ts`, `ui/preview.ts`, `parseSchema`, `Sheet`, `Dove sono le cose`, `blockMove.ts`, `editor.test.ts`, `editor/editor.ts`, `page.ts`, `sheet.ts`, `spell.test.ts`, `sidePanel.ts`, `sql.ts`?**
  _High betweenness centrality (0.118) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `ui/preview.ts`, `main.ts`, `FoldersStore`, `Dove sono le cose`, `graph/preview.ts`, `resize.ts`, `downloadText`, `spreadsheet/editor.ts`, `schema/editor.ts`, `SchemaEditor`, `page.ts`, `SheetEditor`, `toolbar.ts`, `Board`, `spell.test.ts`, `sidePanel.ts`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **Are the 162 inferred relationships involving `Dove sono le cose` (e.g. with `adoptGuestNotes()` and `sharedLinks()`) actually correct?**
  _`Dove sono le cose` has 162 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `name`, `private` to the rest of the system?**
  _593 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `touchlog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08653061224489796 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.039280359820089955 - nodes in this community are weakly interconnected._