# Graph Report - matherdown  (2026-10-05)

## Corpus Check
- 238 files · ~452,562 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 3910 nodes · 13980 edges · 123 communities (103 shown, 20 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 390 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e7e2a88d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- touchlog.ts
- parse.ts
- main.ts
- num
- sync.ts
- spec.ts
- arithmetic.ts
- mul
- graph/preview.ts
- view3d.ts
- symbolic.ts
- editor/lists.ts
- svg.ts
- Board
- SchemaEditor
- exact.ts
- graph/file.ts
- compile
- numerical.ts
- markdown.ts
- index.ts
- engine.ts
- sheet.ts
- graph.ts
- store.ts
- MathError
- toLatex
- assistant.ts
- h
- conics.ts
- board.ts
- graph/space.ts
- distributions.ts
- calcResults.ts
- logic.ts
- .int
- parseSchema
- namesIn
- probability.ts
- resize.ts
- statsShown.ts
- Pt
- NotesStore
- study.ts
- complex.ts
- sidePanel.ts
- editor/editor.ts
- parseGraph
- files.ts
- SuggestionController
- laplace.ts
- linsys.ts
- search.ts
- schemaTools.test.ts
- strokes.ts
- finite.ts
- 20261004091555_note_condivise.sql
- @codemirror/state
- Field
- renderTex
- shapes.ts
- dependencies
- supabase.ts
- Più avanti
- schema/preview.ts
- gauss.ts
- host.ts
- tutorial.ts
- sql.ts
- Benvenuto in Glifo
- compilerOptions
- Sheet
- database.ts
- BoardBackend
- linear.test.ts
- toolbar.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- scripts
- session-start.sh
- .claude/CLAUDE.md
- editor.test.ts
- tutorial.mjs
- Abbonamenti
- Rational
- supabase-stub.sql
- account-test.mjs
- Il database degli account (Supabase)
- Costi
- smoke-test.mjs
- devDependencies
- FoldersStore
- I modelli e le chiavi API
- UndefinedName
- Le spiegazioni, come funzionano
- fake-supabase.mjs
- Piano per piano
- compileComplex
- Glifo – note per Claude
- page.ts
- BoardStore
- La lavagna
- formatNumber
- Glifo
- graphNote.test.ts
- severalGraph.ts
- vitest
- icons.mjs

## God Nodes (most connected - your core abstractions)
1. `MathError` - 151 edges
2. `num()` - 145 edges
3. `Sheet` - 129 edges
4. `MathNode` - 128 edges
5. `mul()` - 124 edges
6. `Dove sono le cose` - 117 edges
7. `compile()` - 113 edges
8. `Rational` - 111 edges
9. `toLatex()` - 101 edges
10. `add()` - 98 edges

## Surprising Connections (you probably didn't know these)
- `Funzionalità` --references--> `k()`  [INFERRED]
  README.md → src/math/numerical.ts
- `Dove sono le cose` --references--> `adoptGuestNotes()`  [INFERRED]
  CLAUDE.md → src/account/space.ts
- `Dove sono le cose` --references--> `sharedLinks()`  [INFERRED]
  CLAUDE.md → src/account/supabase.ts
- `Dove sono le cose` --references--> `shareNote()`  [INFERRED]
  CLAUDE.md → src/account/supabase.ts
- `Dove sono le cose` --references--> `askCompatible()`  [INFERRED]
  CLAUDE.md → src/ai/assistant.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (123 total, 20 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.09
Nodes (26): at(), browserStore, clip(), isSaved(), KINDS, LOG_KEY, LOG_MAX_LINES, LogStore (+18 more)

### Community 1 - "parse.ts"
Cohesion: 0.08
Nodes (39): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe(), differentialInFraction() (+31 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (101): addToGraphBlock(), graphsFromFile(), unhide(), account, accountProblem(), active, app, applyAccountChange() (+93 more)

### Community 3 - "num"
Cohesion: 0.08
Nodes (89): absOf(), splitAbs(), linearIn(), sqrtEx(), addWave(), arrange(), bernoulliFamily(), cauchy() (+81 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (33): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+25 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (94): formulaAtCursor(), GraphLabelLines, constantIntegrand(), depth(), inequalityMargin(), integralRegion, LayeredSolid, Multiple (+86 more)

### Community 6 - "arithmetic.ts"
Cohesion: 0.10
Nodes (45): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+37 more)

### Community 7 - "mul"
Cohesion: 0.16
Nodes (71): atIntegers(), withoutAbs(), polyEx(), similarSolution(), algebraic(), bigGcd(), byParts(), candidates() (+63 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (46): addLabel(), boxes, cameras, complexCoord(), containing(), coord(), drawings, drawnViews (+38 more)

### Community 9 - "view3d.ts"
Cohesion: 0.11
Nodes (34): Box, Face, planeTolerance(), regionFaces(), Plane, Vec3, arcPoints(), arrowHead() (+26 more)

### Community 10 - "symbolic.ts"
Cohesion: 0.06
Nodes (66): fnLabel(), primitive(), verified(), atValues(), combine(), commonMonomial(), Converter, coordinates() (+58 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.11
Nodes (51): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+43 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (52): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), domainEdge(), features() (+44 more)

### Community 13 - "Board"
Cohesion: 0.11
Nodes (3): Board, loadPrefs(), boxesTouch()

### Community 15 - "exact.ts"
Cohesion: 0.20
Nodes (15): expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactRandom, exactRoot(), factorialExact() (+7 more)

### Community 16 - "graph/file.ts"
Cohesion: 0.11
Nodes (34): figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsForFile(), hide(), OPEN, swatchSvg() (+26 more)

### Community 17 - "compile"
Cohesion: 0.06
Nodes (67): conicItems(), isConicLine(), quadricEquation(), areaFor(), complexValue(), constantValue(), define(), argumentOrder() (+59 more)

### Community 18 - "numerical.ts"
Cohesion: 0.12
Nodes (47): bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial(), interpolating() (+39 more)

### Community 19 - "markdown.ts"
Cohesion: 0.09
Nodes (41): bulletGroup(), sameList(), checkHtml(), checkTitle(), cache, escapeHtml(), renderTexMathml(), renderTexOrError() (+33 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (41): b, bigops, c, calculus, fn, fr, fractions, functions (+33 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "sheet.ts"
Cohesion: 0.06
Nodes (39): Dove sono le cose, setGraphLabels(), isTestLine(), number(), testItems(), ComplexDefinitions, labelLine(), numericPartials() (+31 more)

### Community 23 - "graph.ts"
Cohesion: 0.10
Nodes (31): AT_X, cellHtml(), cellText(), COMPASS, createEdgeCell(), createGraph(), drawSchema(), edgeLook() (+23 more)

### Community 24 - "store.ts"
Cohesion: 0.13
Nodes (18): fake-indexeddb, BoardPalette, BackupBoard, done(), fromRecord(), IdbBoards, ofNote(), openBoardDatabase() (+10 more)

### Community 25 - "MathError"
Cohesion: 0.12
Nodes (58): MathError, angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, dataOf() (+50 more)

### Community 26 - "toLatex"
Cohesion: 0.07
Nodes (55): fourierItems(), isFourierLine(), isNumericalLine(), numericalItems(), figureText(), linearItem(), classes(), dataOf() (+47 more)

### Community 27 - "assistant.ts"
Cohesion: 0.15
Nodes (20): AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible(), askThroughHost() (+12 more)

### Community 28 - "h"
Cohesion: 0.09
Nodes (41): SyncStatus, board, viewSwitch, fieldInput(), openSignedOut(), printButton(), ShareDialogDeps, DEFAULT_SETTINGS (+33 more)

### Community 29 - "conics.ts"
Cohesion: 0.18
Nodes (28): at(), centralCanonical(), Coefficients, coneCanonical(), conicOf(), det2(), det3(), determinant() (+20 more)

### Community 30 - "board.ts"
Cohesion: 0.07
Nodes (37): perfect-freehand, Action, ACTION_NAMES, DOT_SIZES, DrawAction, EraseAction, EraserMode, ICON (+29 more)

### Community 31 - "graph/space.ts"
Cohesion: 0.12
Nodes (46): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+38 more)

### Community 32 - "distributions.ts"
Cohesion: 0.07
Nodes (59): addExp(), choose(), continuousQuantile(), discreteQuantile(), Distribution, exactIntervalProbability(), factorialBig(), FAMILIES (+51 more)

### Community 33 - "calcResults.ts"
Cohesion: 0.12
Nodes (14): acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult, calcResults(), CheckWidget, formulasUntil() (+6 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (27): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+19 more)

### Community 35 - ".int"
Cohesion: 0.13
Nodes (12): evaluateExactComplex(), exactSqrt(), GaussRational, sin(), sinh(), unavailable(), ExactUnavailable, slope() (+4 more)

### Community 36 - "parseSchema"
Cohesion: 0.11
Nodes (24): SchemaEditorOptions, hide(), OPEN, schemasForFile(), schemasFromFile(), unhide(), labelHtml(), plainHtml() (+16 more)

### Community 37 - "namesIn"
Cohesion: 0.12
Nodes (39): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+31 more)

### Community 38 - "probability.ts"
Cohesion: 0.13
Nodes (24): End, Family, compileCondition(), ExactScope, ALL, complement(), EventContext, eventSet() (+16 more)

### Community 39 - "resize.ts"
Cohesion: 0.13
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "statsShown.ts"
Cohesion: 0.19
Nodes (29): Lin, check(), correlation(), count(), covariance(), Data, dataStatistic(), deviation() (+21 more)

### Community 41 - "Pt"
Cohesion: 0.17
Nodes (9): clampZoom(), coalesced(), Finger, PanAction, PinchAction, pressureOf(), validView(), BoardView (+1 more)

### Community 42 - "NotesStore"
Cohesion: 0.07
Nodes (38): accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf() (+30 more)

### Community 43 - "study.ts"
Cohesion: 0.16
Nodes (31): Asymptote, boundaries(), compiled(), cutsOf(), defined(), domainOf(), exact(), inDomain() (+23 more)

### Community 44 - "complex.ts"
Cohesion: 0.10
Nodes (31): add(), allRoots(), arg(), ComplexCompiled, ComplexVars, cos(), cosh(), EMPTY_COMPLEX_SCOPE (+23 more)

### Community 45 - "sidePanel.ts"
Cohesion: 0.17
Nodes (16): insertGraphBlock(), SuggestionItem, isConfidentAnswer(), CATEGORIES, symbolsInCategory(), cardPreviewTex(), formPreviewTex(), ParsedTemplate (+8 more)

### Community 46 - "editor/editor.ts"
Cohesion: 0.06
Nodes (37): description, name, private, type, version, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands (+29 more)

### Community 47 - "parseGraph"
Cohesion: 0.08
Nodes (35): staticGraphSvg(), chooseWindow(), chooseBox(), surfacePlane(), GraphItem, parseGraph(), DrawOptions, Palette (+27 more)

### Community 48 - "files.ts"
Cohesion: 0.21
Nodes (14): inClaudeViewer(), canWriteFilesDirectly(), downloadBlob(), downloadText(), fileNameFor(), FsWindow, isAbort(), MD_TYPES (+6 more)

### Community 49 - "SuggestionController"
Cohesion: 0.20
Nodes (4): EditorMathContext, expand(), preferredIndex(), SuggestionController

### Community 50 - "laplace.ts"
Cohesion: 0.11
Nodes (50): factoredPolynomial(), beyondPoles(), compiled(), E, exp(), fractionShown(), HALF, hyperbolicToExp() (+42 more)

### Community 51 - "linsys.ts"
Cohesion: 0.10
Nodes (47): LinearScope, polynomialIn(), rref(), choices(), exText(), gcd(), isStandardUnknown(), linearSystem() (+39 more)

### Community 52 - "search.ts"
Cohesion: 0.17
Nodes (24): editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex() (+16 more)

### Community 53 - "schemaTools.test.ts"
Cohesion: 0.18
Nodes (14): alignBoxes(), Alignment, Box, distributeBoxes(), Position, base64(), crc32(), svgSize() (+6 more)

### Community 54 - "strokes.ts"
Cohesion: 0.17
Nodes (17): between(), Box, capsuleSpan(), circleSpan(), compareStrokes(), eraserGrowth(), eraseStroke(), intersect() (+9 more)

### Community 55 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "@codemirror/state"
Cohesion: 0.17
Nodes (12): @codemirror/state, besideSchema(), guardBlocks(), schemaBlockRanges(), schemaBlocks(), SchemaWidget, summary(), findSchemaBlocks() (+4 more)

### Community 58 - "Field"
Cohesion: 0.11
Nodes (5): eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat()

### Community 59 - "renderTex"
Cohesion: 0.24
Nodes (5): cleanKatexError(), renderTex(), displayCode(), preventFocusSteal(), SidePanel

### Community 60 - "shapes.ts"
Cohesion: 0.09
Nodes (15): @maxgraph/core, ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape (+7 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (24): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+16 more)

### Community 62 - "supabase.ts"
Cohesion: 0.13
Nodes (30): @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken(), ensureSessionOf() (+22 more)

### Community 63 - "Più avanti"
Cohesion: 0.14
Nodes (14): Abbonamento e funzioni a pagamento (da capire), Account: i propri appunti su ogni dispositivo, anche da condividere, Aiuto con gli esercizi, Altre idee, Calcoli e grafici: idee in più, Idee per il futuro, In programma, La lavagna: idee in più (+6 more)

### Community 64 - "schema/preview.ts"
Cohesion: 0.15
Nodes (13): GraphLabels, Look, Theme, draw(), drawCached(), drawn, errorHtml(), fill() (+5 more)

### Community 65 - "gauss.ts"
Cohesion: 0.09
Nodes (40): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexLine(), isComplexValue() (+32 more)

### Community 66 - "host.ts"
Cohesion: 0.23
Nodes (8): cache, capability(), ClaudeRuntime, hostDownloads, HostError, hostSample, ModelTier, runtime()

### Community 67 - "tutorial.ts"
Cohesion: 0.15
Nodes (14): helpButton, openGuide(), HINT_MS, markSeen(), openTutorial(), show(), richText(), showTutorialHint() (+6 more)

### Community 68 - "sql.ts"
Cohesion: 0.17
Nodes (17): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+9 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "Sheet"
Cohesion: 0.08
Nodes (26): ExactComplexScope, ConicInfo, Ode, withWorkLimit(), FiniteContext, FormattedResult, MathNode, chainOf() (+18 more)

### Community 72 - "database.ts"
Cohesion: 0.24
Nodes (6): @electric-sql/pglite, createDatabase(), createUser(), databaseTests(), migrations, shareTests()

### Community 74 - "linear.test.ts"
Cohesion: 0.29
Nodes (7): EXACT, FLOAT, A, B, q(), result(), text()

### Community 75 - "toolbar.ts"
Cohesion: 0.10
Nodes (19): closeMathBlockOnEnter(), EditorCallbacks, MarkdownEditor, tabOutOfMath(), insertBlock(), insertTemplate(), toggleLinePrefix(), wrapSelection() (+11 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.05
Nodes (56): ALIGN, ARROW_NAMES, AT_ICONS, AT_NAMES, BASE_PRESETS, BIG_ARROWS, DB_PRESETS, Direction (+48 more)

### Community 79 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 82 - "editor.test.ts"
Cohesion: 0.08
Nodes (32): @codemirror/view, @lezer/common, InsertOptions, templateInsertion(), CODE_NODES, CommandToken, commandTokenAt(), isInCode() (+24 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.12
Nodes (10): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+2 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.14
Nodes (14): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+6 more)

### Community 92 - "Rational"
Cohesion: 0.06
Nodes (77): Part, polyShown(), EMPTY_SCOPE, Rational, boundsOf(), close(), definite(), fourierProblem (+69 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.20
Nodes (4): device(), login(), newContext, waitFor()

### Community 97 - "Il database degli account (Supabase)"
Cohesion: 0.17
Nodes (11): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Nell'app, Note condivise con un link (+3 more)

### Community 98 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, Quando lo studente dice di cominciare

### Community 100 - "smoke-test.mjs"
Cohesion: 0.29
Nodes (4): markdown-it, vite, firstVisit(), plainContext

### Community 101 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

### Community 102 - "FoldersStore"
Cohesion: 0.07
Nodes (19): cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder(), loadClosedFolders(), RemoteFolder (+11 more)

### Community 103 - "I modelli e le chiavi API"
Cohesion: 0.50
Nodes (4): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), Le idee dello studente (5 ottobre 2026)

### Community 104 - "UndefinedName"
Cohesion: 0.33
Nodes (5): compileName(), conjugateOf(), constant(), nameLabel(), UndefinedName

### Community 105 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 106 - "fake-supabase.mjs"
Cohesion: 0.22
Nodes (11): b64(), CODE, createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom() (+3 more)

### Community 107 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 108 - "compileComplex"
Cohesion: 0.29
Nodes (12): asin(), atan(), compileApply(), compileComplex(), compileFunction(), complexScopeWith(), exp(), log() (+4 more)

### Community 109 - "Glifo – note per Claude"
Cohesion: 0.29
Nodes (7): Comandi, Come controllare il lavoro, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole, sqlite()

### Community 110 - "page.ts"
Cohesion: 0.06
Nodes (46): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), PullResult, openShareDialog(), changeAccess(), changeCopy() (+38 more)

### Community 111 - "BoardStore"
Cohesion: 0.10
Nodes (3): BoardOptions, BoardStore, MemoryBoards

### Community 113 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 117 - "formatNumber"
Cohesion: 0.09
Nodes (36): decimalSeparator(), Digits, formatNumber(), FormatOptions, formatRational(), fromNumber(), fromRational(), SUPERSCRIPT (+28 more)

### Community 121 - "Glifo"
Cohesion: 0.15
Nodes (13): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Funzionalità (+5 more)

### Community 122 - "graphNote.test.ts"
Cohesion: 0.06
Nodes (33): @codemirror/lang-markdown, LIST_STYLES, noIndentedCode, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck() (+25 more)

### Community 123 - "severalGraph.ts"
Cohesion: 0.47
Nodes (8): criticalLine(), isSeveralLine(), named(), severalItems(), surface(), extremaOf(), optimumOf(), severalOf()

### Community 124 - "vitest"
Cohesion: 0.07
Nodes (25): vitest, formulaGraph(), errorMessage(), parseMath(), text(), tex(), text(), result() (+17 more)

## Knowledge Gaps
- **567 isolated node(s):** `Comandi`, `Promemoria per lo studente`, `Regole`, `graphify`, `Condividere una nota con un link` (+562 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 772 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `touchlog.ts`, `main.ts`, `sync.ts`, `mul`, `editor/lists.ts`, `svg.ts`, `markdown.ts`, `store.ts`, `assistant.ts`, `h`, `board.ts`, `distributions.ts`, `parseSchema`, `resize.ts`, `NotesStore`, `sidePanel.ts`, `editor/editor.ts`, `parseGraph`, `laplace.ts`, `linsys.ts`, `search.ts`, `schemaTools.test.ts`, `strokes.ts`, `@codemirror/state`, `supabase.ts`, `tutorial.ts`, `sql.ts`, `Sheet`, `database.ts`, `linear.test.ts`, `editor.test.ts`, `FoldersStore`, `page.ts`, `graphNote.test.ts`?**
  _High betweenness centrality (0.113) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `sheet.ts` to `touchlog.ts`, `parse.ts`, `main.ts`, `num`, `spec.ts`, `arithmetic.ts`, `mul`, `graph/preview.ts`, `symbolic.ts`, `svg.ts`, `graph/file.ts`, `compile`, `numerical.ts`, `markdown.ts`, `graph.ts`, `MathError`, `toLatex`, `assistant.ts`, `graph/space.ts`, `distributions.ts`, `.int`, `parseSchema`, `namesIn`, `NotesStore`, `study.ts`, `complex.ts`, `linsys.ts`, `schemaTools.test.ts`, `strokes.ts`, `finite.ts`, `supabase.ts`, `schema/preview.ts`, `gauss.ts`, `tutorial.ts`, `Sheet`, `schema/editor.ts`, `Rational`, `FoldersStore`, `compileComplex`, `Glifo – note per Claude`, `BoardStore`, `severalGraph.ts`?**
  _High betweenness centrality (0.102) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `schema/preview.ts`, `main.ts`, `tutorial.ts`, `FoldersStore`, `resize.ts`, `graph/preview.ts`, `toolbar.ts`, `Board`, `schema/editor.ts`, `SchemaEditor`, `page.ts`, `sidePanel.ts`, `graph.ts`, `graphNote.test.ts`, `renderTex`, `board.ts`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **What connects `Comandi`, `Promemoria per lo studente`, `Regole` to the rest of the system?**
  _567 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `touchlog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08653061224489796 - nodes in this community are weakly interconnected._
- **Should `parse.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07785087719298246 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04061314791403287 - nodes in this community are weakly interconnected._