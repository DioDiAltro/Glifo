# Graph Report - matherdown  (2026-10-05)

## Corpus Check
- 238 files · ~447,987 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 3889 nodes · 13896 edges · 125 communities (107 shown, 18 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 386 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3a3c9418`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- touchlog.ts
- parse.ts
- main.ts
- odesolve.ts
- sync.ts
- spec.ts
- arithmetic.ts
- num
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
- BoardStore
- MathError
- toLatex
- assistant.ts
- h
- conics.ts
- board.ts
- graph/space.ts
- distributions.ts
- calcPlugin
- logic.ts
- compileComplex
- Rational
- namesIn
- probability.ts
- resize.ts
- statsShown.ts
- store.ts
- NotesStore
- study.ts
- complex.ts
- ink.ts
- editor/editor.ts
- vitest
- dialogs.ts
- logo.ts
- inference.ts
- linsys.ts
- search.ts
- statsGraph.ts
- strokes.ts
- finite.ts
- 20261004091555_note_condivise.sql
- insert.ts
- Field
- SidePanel
- shapes.ts
- dependencies
- supabase.ts
- limits.ts
- parseSchema
- .int
- Sheet
- suggestions.ts
- sql.ts
- Benvenuto in Glifo
- compilerOptions
- spell.test.ts
- .setView
- complex.test.ts
- schema/file.ts
- toolbar.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- Più avanti
- session-start.sh
- .claude/CLAUDE.md
- editor.test.ts
- tutorial.mjs
- Abbonamenti
- sidePanel.ts
- several.ts
- supabase-stub.sql
- account-test.mjs
- Il database degli account (Supabase)
- Costi
- smoke-test.mjs
- package.json
- FoldersStore
- I modelli e le chiavi API
- .neg
- Le spiegazioni, come funzionano
- fake-supabase.mjs
- Piano per piano
- gauss.ts
- Glifo – note per Claude
- page.ts
- icons.mjs
- La lavagna
- tutorial.ts
- intervalProbability
- spaces.ts
- Glifo
- database.ts
- formatNumber
- linear.test.ts

## God Nodes (most connected - your core abstractions)
1. `MathError` - 151 edges
2. `num()` - 145 edges
3. `Sheet` - 129 edges
4. `MathNode` - 128 edges
5. `mul()` - 124 edges
6. `Dove sono le cose` - 115 edges
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

## Communities (125 total, 18 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.09
Nodes (26): at(), browserStore, clip(), isSaved(), KINDS, LOG_KEY, LOG_MAX_LINES, LogStore (+18 more)

### Community 1 - "parse.ts"
Cohesion: 0.08
Nodes (39): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe(), differentialInFraction() (+31 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (98): graphsFromFile(), unhide(), account, active, app, applyAccountChange(), applySpellcheck(), applyTheme() (+90 more)

### Community 3 - "odesolve.ts"
Cohesion: 0.08
Nodes (82): linearIn(), addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames() (+74 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (33): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+25 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (100): isComplexLine(), onlyComplex(), constantIntegrand(), depth(), integralRegion, LayeredSolid, Multiple, multipleOf() (+92 more)

### Community 6 - "arithmetic.ts"
Cohesion: 0.06
Nodes (94): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+86 more)

### Community 7 - "num"
Cohesion: 0.14
Nodes (86): atIntegers(), withoutAbs(), exp(), hyperbolicToExp(), inverseRational(), sqrtEx(), termTransform(), polyEx() (+78 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (43): addLabel(), boxes, cameras, complexCoord(), coord(), drawings, drawnViews, endTex() (+35 more)

### Community 9 - "view3d.ts"
Cohesion: 0.11
Nodes (30): tickLabel(), Face, planeTolerance(), Plane, Vec3, escapeXml(), arrowHead(), boxShape() (+22 more)

### Community 10 - "symbolic.ts"
Cohesion: 0.07
Nodes (58): atValues(), combine(), commonMonomial(), Converter, coordinates(), decimalText(), definiteParts(), definiteValue() (+50 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.11
Nodes (50): applyListStyle(), continueList(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext(), isBlank() (+42 more)

### Community 12 - "svg.ts"
Cohesion: 0.10
Nodes (49): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), domainEdge(), features() (+41 more)

### Community 13 - "Board"
Cohesion: 0.12
Nodes (4): Board, loadPrefs(), penErases(), BoardTheme

### Community 14 - "SchemaEditor"
Cohesion: 0.11
Nodes (3): SchemaEditor, NodeLook, serializeSchema()

### Community 15 - "exact.ts"
Cohesion: 0.16
Nodes (16): exactSqrt(), unavailable(), bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactFunction, ExactRandom (+8 more)

### Community 16 - "graph/file.ts"
Cohesion: 0.10
Nodes (36): figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsForFile(), hide(), OPEN, swatchSvg() (+28 more)

### Community 17 - "compile"
Cohesion: 0.06
Nodes (77): inequalityMargin(), argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot(), fieldOn() (+69 more)

### Community 18 - "numerical.ts"
Cohesion: 0.12
Nodes (46): bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial(), interpolating() (+38 more)

### Community 19 - "markdown.ts"
Cohesion: 0.07
Nodes (52): dompurify, highlight.js, katex, markdown-it-footnote, valueNode(), bulletGroup(), sameList(), checkHtml() (+44 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (39): b, bigops, c, calculus, fn, fr, fractions, functions (+31 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "sheet.ts"
Cohesion: 0.05
Nodes (54): Dove sono le cose, CalcCheck, calcOutcomes(), CalcResult, calcResults(), formulasUntil(), sheetBefore(), addToGraphBlock() (+46 more)

### Community 23 - "graph.ts"
Cohesion: 0.10
Nodes (32): fieldInput(), textWidth(), AT_X, cellHtml(), cellText(), COMPASS, createEdgeCell(), createGraph() (+24 more)

### Community 24 - "BoardStore"
Cohesion: 0.08
Nodes (4): BoardOptions, BoardBackend, BoardStore, MemoryBoards

### Community 25 - "MathError"
Cohesion: 0.10
Nodes (62): compileApply(), MathError, nameLabel(), UndefinedName, formatRational(), angleBetween(), asMatrix(), basisOf() (+54 more)

### Community 26 - "toLatex"
Cohesion: 0.08
Nodes (46): conicItems(), isConicLine(), quadricEquation(), FieldContext, fourierItems(), isFourierLine(), criticalLine(), isSeveralLine() (+38 more)

### Community 27 - "assistant.ts"
Cohesion: 0.15
Nodes (20): AiAnswer, AiError, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible(), askThroughHost(), checkShape() (+12 more)

### Community 28 - "h"
Cohesion: 0.18
Nodes (18): SyncStatus, viewSwitch, AccountButton, confirmAccountDeletion(), messageOf(), openAccountDialog(), openLoginDialog(), codeStep() (+10 more)

### Community 29 - "conics.ts"
Cohesion: 0.19
Nodes (28): at(), centralCanonical(), Coefficients, coneCanonical(), ConicInfo, conicOf(), det2(), det3() (+20 more)

### Community 30 - "board.ts"
Cohesion: 0.13
Nodes (21): Action, ACTION_NAMES, DrawAction, EraseAction, ERASER_RADIUS, Finger, ICON, PanAction (+13 more)

### Community 31 - "graph/space.ts"
Cohesion: 0.10
Nodes (56): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+48 more)

### Community 32 - "distributions.ts"
Cohesion: 0.17
Nodes (26): choose(), continuousQuantile(), discreteQuantile(), factorialBig(), FAMILIES, integerParam(), invalid(), makeDistribution() (+18 more)

### Community 33 - "calcPlugin"
Cohesion: 0.16
Nodes (5): acceptCalcResult(), calcPlugin, CheckWidget, insertResult(), ResultWidget

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "compileComplex"
Cohesion: 0.24
Nodes (12): asin(), atan(), compileComplex(), compileFunction(), evaluateExactComplex(), GaussRational, log(), pow() (+4 more)

### Community 36 - "Rational"
Cohesion: 0.14
Nodes (22): Part, Rational, absOf(), boundsOf(), close(), definite(), fourierProblem, fourierShown() (+14 more)

### Community 37 - "namesIn"
Cohesion: 0.14
Nodes (36): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+28 more)

### Community 38 - "probability.ts"
Cohesion: 0.11
Nodes (24): End, Family, Interval, ExactScope, rejection(), ALL, complement(), endAt() (+16 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "statsShown.ts"
Cohesion: 0.15
Nodes (34): expSumValue(), Lin, check(), correlation(), count(), covariance(), Data, DATA_FUNCTIONS (+26 more)

### Community 41 - "store.ts"
Cohesion: 0.14
Nodes (14): fake-indexeddb, done(), fromRecord(), IdbBoards, ofNote(), openBoardDatabase(), openDefault(), request() (+6 more)

### Community 42 - "NotesStore"
Cohesion: 0.09
Nodes (27): accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf() (+19 more)

### Community 43 - "study.ts"
Cohesion: 0.09
Nodes (51): close(), Definite, definiteIntegral(), exValue(), samples(), EMPTY_SCOPE, Piece, limit() (+43 more)

### Community 44 - "complex.ts"
Cohesion: 0.11
Nodes (22): add(), ComplexCompiled, cos(), cosh(), EMPTY_COMPLEX_SCOPE, ExactComplexScope, exp(), formatComplex() (+14 more)

### Community 45 - "ink.ts"
Cohesion: 0.15
Nodes (13): perfect-freehand, Prefs, BOARD_PALETTES, BoardPalette, inkName(), mid(), outlineSvg(), PEN_SIZE (+5 more)

### Community 46 - "editor/editor.ts"
Cohesion: 0.10
Nodes (25): @codemirror/lang-markdown, @codemirror/language, @lezer/highlight, highlight, italianPhrases, deleteListMarker(), listMarkers, noIndentedCode (+17 more)

### Community 47 - "vitest"
Cohesion: 0.05
Nodes (43): vitest, formulaGraph(), GraphItem, parseGraph(), parseMath(), light, text(), tex() (+35 more)

### Community 48 - "dialogs.ts"
Cohesion: 0.08
Nodes (34): cache, capability(), ClaudeRuntime, hostDownloads, HostError, inClaudeViewer(), ModelTier, runtime() (+26 more)

### Community 49 - "logo.ts"
Cohesion: 0.33
Nodes (6): sidebarToggle(), BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark()

### Community 50 - "inference.ts"
Cohesion: 0.19
Nodes (22): confidence(), confidenceShown(), Given, hypothesisTest(), interval(), meanOf(), nameOf(), num() (+14 more)

### Community 51 - "linsys.ts"
Cohesion: 0.11
Nodes (45): nameLatex(), FLOAT, rref(), choices(), gcd(), isStandardUnknown(), linearSystem(), matrixEquation() (+37 more)

### Community 52 - "search.ts"
Cohesion: 0.17
Nodes (24): editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex() (+16 more)

### Community 53 - "statsGraph.ts"
Cohesion: 0.22
Nodes (15): isTestLine(), number(), testItems(), classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX (+7 more)

### Community 54 - "strokes.ts"
Cohesion: 0.17
Nodes (15): between(), Box, boxesTouch(), capsuleSpan(), circleSpan(), compareStrokes(), eraseStroke(), intersect() (+7 more)

### Community 55 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "insert.ts"
Cohesion: 0.07
Nodes (28): @codemirror/state, @codemirror/view, InsertOptions, toggleLinePrefix(), LIST_STYLES, addPlaceholders, buildDecorations(), clearAllPlaceholders() (+20 more)

### Community 58 - "Field"
Cohesion: 0.13
Nodes (6): characteristicPolynomial(), eigenvalues(), Field, interpolate(), interpolateFloat(), polynomialIn()

### Community 59 - "SidePanel"
Cohesion: 0.25
Nodes (3): displayCode(), preventFocusSteal(), SidePanel

### Community 60 - "shapes.ts"
Cohesion: 0.09
Nodes (14): @maxgraph/core, ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape (+6 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (24): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+16 more)

### Community 62 - "supabase.ts"
Cohesion: 0.11
Nodes (36): @supabase/supabase-js, AUTH_STORAGE_KEY, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken() (+28 more)

### Community 63 - "limits.ts"
Cohesion: 0.26
Nodes (14): exponentialForm(), fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), close() (+6 more)

### Community 64 - "parseSchema"
Cohesion: 0.10
Nodes (22): GraphLabels, GraphLook, Look, isRecord(), num(), oneOf(), parseSchema(), point() (+14 more)

### Community 65 - ".int"
Cohesion: 0.19
Nodes (10): addExp(), Distribution, exactIntervalProbability(), expSum, subtractExp(), TestResult, divideExp(), exactSetProbability() (+2 more)

### Community 66 - "Sheet"
Cohesion: 0.09
Nodes (22): Ode, withWorkLimit(), FiniteContext, FormattedResult, MathNode, chainOf(), close(), definitionTarget() (+14 more)

### Community 67 - "suggestions.ts"
Cohesion: 0.19
Nodes (7): templateInsertion(), EditorMathContext, expand(), preferredIndex(), SuggestionController, parseTemplate(), templateText()

### Community 68 - "sql.ts"
Cohesion: 0.17
Nodes (18): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+10 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "spell.test.ts"
Cohesion: 0.09
Nodes (22): misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt(), openAt() (+14 more)

### Community 72 - ".setView"
Cohesion: 0.20
Nodes (5): clampZoom(), coalesced(), pressureOf(), validView(), newStrokeId()

### Community 73 - "complex.test.ts"
Cohesion: 0.20
Nodes (12): staticGraphSvg(), chooseWindow(), containing(), chooseBox(), GraphSpec, DrawOptions, graphSvg(), PALETTES (+4 more)

### Community 74 - "schema/file.ts"
Cohesion: 0.23
Nodes (9): SchemaEditorOptions, hide(), OPEN, schemasForFile(), schemasFromFile(), unhide(), Schema, Template (+1 more)

### Community 75 - "toolbar.ts"
Cohesion: 0.10
Nodes (18): @codemirror/commands, EditorCallbacks, MarkdownEditor, insertBlock(), insertTemplate(), wrapSelection(), SidePanelDeps, Action (+10 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.04
Nodes (71): alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ARROW_NAMES, AT_ICONS (+63 more)

### Community 79 - "Più avanti"
Cohesion: 0.14
Nodes (14): Abbonamento e funzioni a pagamento (da capire), Account: i propri appunti su ogni dispositivo, anche da condividere, Aiuto con gli esercizi, Altre idee, Calcoli e grafici: idee in più, Idee per il futuro, In programma, La lavagna: idee in più (+6 more)

### Community 82 - "editor.test.ts"
Cohesion: 0.12
Nodes (18): @lezer/common, closeMathBlockOnEnter(), tabOutOfMath(), CODE_NODES, CommandToken, commandTokenAt(), isInCode(), MATH_NODES (+10 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.12
Nodes (10): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+2 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.14
Nodes (14): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+6 more)

### Community 91 - "sidePanel.ts"
Cohesion: 0.16
Nodes (15): AiResult, SuggestionItem, isConfidentAnswer(), CATEGORIES, symbolsInCategory(), cardPreviewTex(), formPreviewTex(), ParsedTemplate (+7 more)

### Community 92 - "several.ts"
Cohesion: 0.10
Nodes (52): shown(), severalLimit, exText(), fractionNear(), convergesAt(), gcdInt(), logParts(), nearConstant() (+44 more)

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

### Community 101 - "package.json"
Cohesion: 0.05
Nodes (35): description, devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript (+27 more)

### Community 102 - "FoldersStore"
Cohesion: 0.06
Nodes (30): Deletion, DeletionLog, cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder() (+22 more)

### Community 103 - "I modelli e le chiavi API"
Cohesion: 0.50
Nodes (4): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), Le idee dello studente (5 ottobre 2026)

### Community 104 - ".neg"
Cohesion: 0.29
Nodes (4): compileApply(), compileName(), conjugateOf(), constant()

### Community 105 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 106 - "fake-supabase.mjs"
Cohesion: 0.22
Nodes (11): b64(), CODE, createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom() (+3 more)

### Community 107 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 108 - "gauss.ts"
Cohesion: 0.15
Nodes (22): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexValue(), isInequality() (+14 more)

### Community 109 - "Glifo – note per Claude"
Cohesion: 0.29
Nodes (7): Comandi, Come controllare il lavoro, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole, sqlite()

### Community 110 - "page.ts"
Cohesion: 0.07
Nodes (45): SUPABASE_KEY, SUPABASE_URL, accountDataFile(), PullResult, openShareDialog(), changeAccess(), changeCopy(), copy() (+37 more)

### Community 113 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 115 - "tutorial.ts"
Cohesion: 0.16
Nodes (12): HINT_MS, markSeen(), openTutorial(), show(), richText(), showTutorialHint(), close(), TUTORIAL_PAGES (+4 more)

### Community 116 - "intervalProbability"
Cohesion: 0.40
Nodes (4): integerRange(), intervalProbability(), pValue(), setProbability()

### Community 117 - "spaces.ts"
Cohesion: 0.15
Nodes (21): eigenvectors(), kernel(), Mat, splitRoot(), cartesianEquations(), Cell, coordinateNames(), diagonalize() (+13 more)

### Community 121 - "Glifo"
Cohesion: 0.15
Nodes (13): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Funzionalità (+5 more)

### Community 122 - "database.ts"
Cohesion: 0.24
Nodes (6): @electric-sql/pglite, createDatabase(), createUser(), databaseTests(), migrations, shareTests()

### Community 123 - "formatNumber"
Cohesion: 0.27
Nodes (9): decimalSeparator(), Digits, formatNumber(), FormatOptions, fromNumber(), fromRational(), SUPERSCRIPT, writeDigits() (+1 more)

### Community 124 - "linear.test.ts"
Cohesion: 0.33
Nodes (6): EXACT, A, B, q(), result(), text()

## Knowledge Gaps
- **563 isolated node(s):** `Comandi`, `Promemoria per lo studente`, `Regole`, `graphify`, `LOG_KEY` (+558 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 767 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `touchlog.ts`, `main.ts`, `sync.ts`, `arithmetic.ts`, `editor/lists.ts`, `graph/file.ts`, `compile`, `markdown.ts`, `assistant.ts`, `board.ts`, `graph/space.ts`, `distributions.ts`, `resize.ts`, `store.ts`, `NotesStore`, `ink.ts`, `editor/editor.ts`, `dialogs.ts`, `logo.ts`, `search.ts`, `strokes.ts`, `insert.ts`, `supabase.ts`, `Sheet`, `sql.ts`, `spell.test.ts`, `complex.test.ts`, `schema/file.ts`, `toolbar.ts`, `schema/editor.ts`, `editor.test.ts`, `sidePanel.ts`, `package.json`, `FoldersStore`, `page.ts`, `tutorial.ts`, `database.ts`, `linear.test.ts`?**
  _High betweenness centrality (0.126) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `sheet.ts` to `touchlog.ts`, `parse.ts`, `main.ts`, `odesolve.ts`, `spec.ts`, `arithmetic.ts`, `num`, `graph/preview.ts`, `symbolic.ts`, `svg.ts`, `graph/file.ts`, `compile`, `numerical.ts`, `markdown.ts`, `graph.ts`, `BoardStore`, `MathError`, `toLatex`, `assistant.ts`, `graph/space.ts`, `logic.ts`, `compileComplex`, `Rational`, `namesIn`, `NotesStore`, `study.ts`, `logo.ts`, `inference.ts`, `linsys.ts`, `strokes.ts`, `finite.ts`, `supabase.ts`, `limits.ts`, `parseSchema`, `Sheet`, `complex.test.ts`, `schema/editor.ts`, `several.ts`, `Glifo – note per Claude`, `tutorial.ts`?**
  _High betweenness centrality (0.102) - this node is a cross-community bridge._
- **Why does `Board` connect `Board` to `main.ts`, `.setView`, `ink.ts`, `strokes.ts`, `board.ts`?**
  _High betweenness centrality (0.035) - this node is a cross-community bridge._
- **What connects `Comandi`, `Promemoria per lo studente`, `Regole` to the rest of the system?**
  _563 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `touchlog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08653061224489796 - nodes in this community are weakly interconnected._
- **Should `parse.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07689003436426117 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04088482074752098 - nodes in this community are weakly interconnected._