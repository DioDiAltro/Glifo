# Graph Report - matherdown  (2026-10-05)

## Corpus Check
- 234 files · ~441,667 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 3832 nodes · 13739 edges · 124 communities (99 shown, 25 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 380 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0ca6037c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- linsys.ts
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
- Rational
- graph/file.ts
- compile
- numerical.ts
- markdown.ts
- index.ts
- engine.ts
- markers.ts
- graph.ts
- BoardStore
- MathError
- toLatex
- assistant.ts
- settings.ts
- conics.ts
- board.ts
- graph/space.ts
- distributions.ts
- graphNote.test.ts
- logic.ts
- scopeWith
- fourier.ts
- namesIn
- probability.ts
- resize.ts
- statsShown.ts
- store.ts
- NotesStore
- study.ts
- complex.ts
- FoldersStore
- editor/editor.ts
- vitest
- downloadText
- templates.ts
- inference.ts
- solve.ts
- search.ts
- statsGraph.ts
- strokes.ts
- finite.ts
- 20261004091555_note_condivise.sql
- toolbar.ts
- Field
- SidePanel
- shapes.ts
- dependencies
- supabase.ts
- .warnOnce
- schema/preview.ts
- Distribution
- Sheet
- SuggestionController
- sql.ts
- Benvenuto in Glifo
- compilerOptions
- spell.test.ts
- .setView
- picture.ts
- chiSquareTest
- .constructor
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
- scripts
- h
- I modelli e le chiavi API
- grafo-html.mjs
- Le spiegazioni, come funzionano
- fake-supabase.mjs
- Piano per piano
- devDependencies
- Glifo – note per Claude
- page.ts
- icons.mjs
- La lavagna
- BoardBackend
- severalGraph.ts
- sheet.ts
- MarkdownEditor
- createFakeSupabase
- numericalGraph.ts

## God Nodes (most connected - your core abstractions)
1. `MathError` - 151 edges
2. `num()` - 145 edges
3. `Sheet` - 129 edges
4. `MathNode` - 128 edges
5. `mul()` - 124 edges
6. `compile()` - 113 edges
7. `Rational` - 111 edges
8. `Dove sono le cose` - 110 edges
9. `toLatex()` - 101 edges
10. `add()` - 98 edges

## Surprising Connections (you probably didn't know these)
- `Dove sono le cose` --references--> `ConicElements`  [INFERRED]
  CLAUDE.md → src/math/conics.ts
- `Dove sono le cose` --references--> `adoptGuestNotes()`  [INFERRED]
  CLAUDE.md → src/account/space.ts
- `Dove sono le cose` --references--> `shareNote()`  [INFERRED]
  CLAUDE.md → src/account/supabase.ts
- `Dove sono le cose` --references--> `sharedLinks()`  [INFERRED]
  CLAUDE.md → src/account/supabase.ts
- `Dove sono le cose` --references--> `jsonIn()`  [INFERRED]
  CLAUDE.md → src/ai/assistant.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (124 total, 25 thin omitted)

### Community 0 - "linsys.ts"
Cohesion: 0.13
Nodes (43): rref(), choices(), gcd(), linearSystem(), matrixEquation(), matrixSystem(), minorsGcd(), ONE (+35 more)

### Community 1 - "parse.ts"
Cohesion: 0.08
Nodes (38): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe(), differentialInFraction() (+30 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (98): unshareNote(), addToGraphBlock(), graphsForFile(), graphsFromFile(), hide(), unhide(), account, accountButton (+90 more)

### Community 3 - "odesolve.ts"
Cohesion: 0.08
Nodes (79): addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames(), constantParticular() (+71 more)

### Community 4 - "sync.ts"
Cohesion: 0.05
Nodes (39): @electric-sql/pglite, AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow (+31 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (101): formulaAtCursor(), GraphLabelLines, insertGraphBlock(), setGraphLabels(), mathRegionAt(), quadricEquation(), isComplexLine(), onlyComplex() (+93 more)

### Community 6 - "arithmetic.ts"
Cohesion: 0.07
Nodes (84): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+76 more)

### Community 7 - "num"
Cohesion: 0.13
Nodes (85): atIntegers(), withoutAbs(), hyperbolicToExp(), inverseRational(), sqrtEx(), polyEx(), similarSolution(), degree() (+77 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (40): addLabel(), boxes, cameras, complexCoord(), coord(), drawings, drawnViews, endTex() (+32 more)

### Community 9 - "view3d.ts"
Cohesion: 0.09
Nodes (34): Detail, Face, FAST, FINE, planeTolerance(), Plane, Vec3, arcPoints() (+26 more)

### Community 10 - "symbolic.ts"
Cohesion: 0.06
Nodes (65): linearIn(), linearCells(), pairUp(), atValues(), cancelLinear(), combine(), commonMonomial(), Converter (+57 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.16
Nodes (34): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+26 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (53): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), domainEdge(), features() (+45 more)

### Community 15 - "Rational"
Cohesion: 0.12
Nodes (19): expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactRandom, exactRoot(), factorialExact() (+11 more)

### Community 16 - "graph/file.ts"
Cohesion: 0.13
Nodes (29): figureName(), graphFigure(), graphImage(), graphImagesFor(), OPEN, swatchSvg(), titleBand(), ACCENTS (+21 more)

### Community 17 - "compile"
Cohesion: 0.07
Nodes (54): argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot(), fieldOn(), outward() (+46 more)

### Community 18 - "numerical.ts"
Cohesion: 0.08
Nodes (60): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Funzionalità (+52 more)

### Community 19 - "markdown.ts"
Cohesion: 0.14
Nodes (26): labelHtml(), texHtml(), checkHtml(), checkTitle(), cache, cleanKatexError(), escapeHtml(), renderTex() (+18 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (41): b, bigops, c, calculus, fn, fr, fractions, functions (+33 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "markers.ts"
Cohesion: 0.12
Nodes (32): ListStyle, bullet(), bulletGroup(), childMarker(), column(), firstMarker(), label(), lettersMarker() (+24 more)

### Community 23 - "graph.ts"
Cohesion: 0.09
Nodes (39): fieldInput(), textWidth(), AT_X, cellHtml(), cellText(), COMPASS, createEdgeCell(), createGraph() (+31 more)

### Community 24 - "BoardStore"
Cohesion: 0.15
Nodes (3): BoardStore, MemoryBoards, validView()

### Community 25 - "MathError"
Cohesion: 0.12
Nodes (57): MathError, nameLabel(), UndefinedName, angleBetween(), asMatrix(), basisOf(), circleText(), cross() (+49 more)

### Community 26 - "toLatex"
Cohesion: 0.12
Nodes (29): conicItems(), isConicLine(), fourierItems(), isFourierLine(), partialSum(), ACCENT_COMMANDS, COMPLEX_FUNCTIONS, diffLatex() (+21 more)

### Community 27 - "assistant.ts"
Cohesion: 0.07
Nodes (40): @anthropic-ai/sdk, AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible() (+32 more)

### Community 28 - "settings.ts"
Cohesion: 0.10
Nodes (27): applySpellcheck(), backup(), openSettings(), setPersonalWords(), sidebarBottom, updateSettings(), wordsChangedHere(), addPersonalWord() (+19 more)

### Community 29 - "conics.ts"
Cohesion: 0.18
Nodes (29): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+21 more)

### Community 30 - "board.ts"
Cohesion: 0.10
Nodes (28): Action, DrawAction, EraseAction, ERASER_RADIUS, Finger, ICON, loadPrefs(), PanAction (+20 more)

### Community 31 - "graph/space.ts"
Cohesion: 0.12
Nodes (50): LayeredSolid, addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon() (+42 more)

### Community 32 - "distributions.ts"
Cohesion: 0.17
Nodes (27): choose(), expSumValue(), factorialBig(), FAMILIES, Family, integerParam(), invalid(), makeDistribution() (+19 more)

### Community 33 - "graphNote.test.ts"
Cohesion: 0.09
Nodes (20): acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult, calcResults(), CheckWidget, formulasUntil() (+12 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "scopeWith"
Cohesion: 0.12
Nodes (35): depth(), integralRegion, Multiple, planeMargin(), PlanePart, radiusOf(), spaceLayers(), spaceMargin() (+27 more)

### Community 36 - "fourier.ts"
Cohesion: 0.10
Nodes (33): close(), Definite, definiteIntegral(), exValue(), samples(), EMPTY_SCOPE, absOf(), boundsOf() (+25 more)

### Community 37 - "namesIn"
Cohesion: 0.13
Nodes (36): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+28 more)

### Community 38 - "probability.ts"
Cohesion: 0.13
Nodes (23): End, CompileOptions, ExactScope, ALL, complement(), endAt(), EventContext, eventSet() (+15 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "statsShown.ts"
Cohesion: 0.19
Nodes (29): check(), correlation(), count(), covariance(), Data, dataStatistic(), deviation(), fail() (+21 more)

### Community 41 - "store.ts"
Cohesion: 0.11
Nodes (17): fake-indexeddb, Prefs, BoardPalette, BackupBoard, done(), fromRecord(), IdbBoards, ofNote() (+9 more)

### Community 42 - "NotesStore"
Cohesion: 0.07
Nodes (42): accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf() (+34 more)

### Community 43 - "study.ts"
Cohesion: 0.14
Nodes (36): names(), STUDY_GRAPH, studyItems(), nameLatex(), limit(), Asymptote, compiled(), cutsOf() (+28 more)

### Community 44 - "complex.ts"
Cohesion: 0.06
Nodes (63): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexValue(), isInequality() (+55 more)

### Community 45 - "FoldersStore"
Cohesion: 0.18
Nodes (3): cleanFolderName(), FoldersStore, sameName()

### Community 46 - "editor/editor.ts"
Cohesion: 0.05
Nodes (55): description, name, private, type, version, @codemirror/autocomplete, @codemirror/language, @codemirror/language-data (+47 more)

### Community 47 - "vitest"
Cohesion: 0.05
Nodes (53): vitest, formulaGraph(), GraphItem, parseGraph(), PALETTES, errorMessage(), parseMath(), parseStatement() (+45 more)

### Community 48 - "downloadText"
Cohesion: 0.36
Nodes (6): loadDialect(), svgSize(), svgToPng(), downloadBlob(), downloadText(), fileNameFor()

### Community 49 - "templates.ts"
Cohesion: 0.11
Nodes (19): SchemaEditorOptions, DEFAULT_EDGE, Schema, SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), tableMetrics() (+11 more)

### Community 50 - "inference.ts"
Cohesion: 0.21
Nodes (20): confidence(), confidenceShown(), hypothesisTest(), interval(), meanOf(), num(), Op, OP_TEX (+12 more)

### Community 51 - "solve.ts"
Cohesion: 0.10
Nodes (43): FieldContext, exponentialForm(), fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd() (+35 more)

### Community 52 - "search.ts"
Cohesion: 0.18
Nodes (21): editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex() (+13 more)

### Community 53 - "statsGraph.ts"
Cohesion: 0.22
Nodes (14): isTestLine(), number(), testItems(), classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX (+6 more)

### Community 54 - "strokes.ts"
Cohesion: 0.15
Nodes (16): between(), Box, boxesTouch(), capsuleSpan(), circleSpan(), compareStrokes(), eraseStroke(), INK_COLORS (+8 more)

### Community 55 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "toolbar.ts"
Cohesion: 0.08
Nodes (30): @codemirror/state, @codemirror/view, insertBlock(), InsertOptions, insertTemplate(), toggleLinePrefix(), wrapSelection(), addPlaceholders (+22 more)

### Community 58 - "Field"
Cohesion: 0.12
Nodes (7): characteristicPolynomial(), eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn()

### Community 59 - "SidePanel"
Cohesion: 0.25
Nodes (3): displayCode(), preventFocusSteal(), SidePanel

### Community 60 - "shapes.ts"
Cohesion: 0.09
Nodes (15): @maxgraph/core, ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape (+7 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (24): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+16 more)

### Community 62 - "supabase.ts"
Cohesion: 0.13
Nodes (26): @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken(), ensureSessionOf() (+18 more)

### Community 64 - "schema/preview.ts"
Cohesion: 0.14
Nodes (14): GraphLabels, GraphLook, Look, Theme, draw(), drawCached(), drawn, errorHtml() (+6 more)

### Community 65 - "Distribution"
Cohesion: 0.16
Nodes (11): addExp(), continuousQuantile(), discreteQuantile(), Distribution, exactIntervalProbability(), integerRange(), intervalProbability(), subtractExp() (+3 more)

### Community 66 - "Sheet"
Cohesion: 0.08
Nodes (32): Dove sono le cose, ExactComplexScope, Ode, withWorkLimit(), FiniteContext, FormattedResult, differentialRequest, pieces() (+24 more)

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
Cohesion: 0.08
Nodes (24): @codemirror/commands, @codemirror/lang-markdown, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close() (+16 more)

### Community 72 - ".setView"
Cohesion: 0.20
Nodes (5): clampZoom(), coalesced(), pressureOf(), validView(), newStrokeId()

### Community 73 - "picture.ts"
Cohesion: 0.29
Nodes (9): staticGraphSvg(), chooseWindow(), chooseBox(), DrawOptions, Palette, DEFAULT_CAMERA, Quality, sceneSvg() (+1 more)

### Community 74 - "chiSquareTest"
Cohesion: 0.33
Nodes (6): chiSquareTest(), Given, InferenceContext, nameOf(), opOf(), squared()

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.05
Nodes (57): alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ARROW_NAMES, AT_ICONS (+49 more)

### Community 79 - "Più avanti"
Cohesion: 0.14
Nodes (14): Abbonamento e funzioni a pagamento (da capire), Account: i propri appunti su ogni dispositivo, anche da condividere, Aiuto con gli esercizi, Altre idee, Calcoli e grafici: idee in più, Idee per il futuro, In programma, La lavagna: idee in più (+6 more)

### Community 82 - "editor.test.ts"
Cohesion: 0.10
Nodes (16): buildDecorations(), clearAllPlaceholders(), clearPlaceholders, contains(), currentIndex(), filledMark, getPlaceholders(), jumpPlaceholder() (+8 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.20
Nodes (6): centerOf(), clickOn(), ffmpeg, SCENES, SIZE, work

### Community 90 - "Abbonamenti"
Cohesion: 0.14
Nodes (14): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+6 more)

### Community 91 - "sidePanel.ts"
Cohesion: 0.15
Nodes (20): templateInsertion(), expand(), preferredIndex(), SuggestionItem, isConfidentAnswer(), SearchResult, CATEGORIES, commandNames() (+12 more)

### Community 92 - "several.ts"
Cohesion: 0.15
Nodes (35): severalLimit, at(), bounded(), Candidate, candidates(), compiled(), COORDS, coordShown() (+27 more)

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

### Community 101 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 102 - "h"
Cohesion: 0.05
Nodes (52): SyncStatus, openGuide(), viewSwitch, openSignedOut(), printButton(), ShareDialogDeps, saveClosedFolders(), DEFAULT_SETTINGS (+44 more)

### Community 103 - "I modelli e le chiavi API"
Cohesion: 0.50
Nodes (4): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), Le idee dello studente (5 ottobre 2026)

### Community 104 - "grafo-html.mjs"
Cohesion: 0.25
Nodes (4): graphFile, names, namesFile, root

### Community 105 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 106 - "fake-supabase.mjs"
Cohesion: 0.29
Nodes (5): b64(), CODE, GOOGLE_CODE, ROOT, SUPABASE_URL

### Community 107 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 108 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

### Community 109 - "Glifo – note per Claude"
Cohesion: 0.29
Nodes (7): Comandi, Come controllare il lavoro, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole, sqlite()

### Community 110 - "page.ts"
Cohesion: 0.06
Nodes (48): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), PullResult, hydrateGraphs(), setPrinting(), openShareDialog() (+40 more)

### Community 113 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 116 - "severalGraph.ts"
Cohesion: 0.54
Nodes (7): criticalLine(), isSeveralLine(), named(), severalItems(), surface(), optimumOf(), severalOf()

### Community 117 - "sheet.ts"
Cohesion: 0.07
Nodes (56): numericPartials(), ExactFunction, decimalSeparator(), Digits, formatNumber(), formatRational(), fromNumber(), fromRational() (+48 more)

### Community 122 - "createFakeSupabase"
Cohesion: 0.60
Nodes (6): createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 123 - "numericalGraph.ts"
Cohesion: 0.80
Nodes (4): isNumericalLine(), numericalItems(), isPlottedNumerical(), numericalPlot()

## Knowledge Gaps
- **554 isolated node(s):** `session-start.sh script`, `name`, `private`, `version`, `description` (+549 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 757 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **25 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `main.ts`, `sync.ts`, `num`, `editor/lists.ts`, `svg.ts`, `Rational`, `markdown.ts`, `markers.ts`, `assistant.ts`, `settings.ts`, `board.ts`, `graph/space.ts`, `distributions.ts`, `graphNote.test.ts`, `resize.ts`, `store.ts`, `NotesStore`, `editor/editor.ts`, `search.ts`, `strokes.ts`, `toolbar.ts`, `supabase.ts`, `Sheet`, `sql.ts`, `spell.test.ts`, `picture.ts`, `schema/editor.ts`, `editor.test.ts`, `sidePanel.ts`, `h`, `page.ts`, `sheet.ts`, `MarkdownEditor`?**
  _High betweenness centrality (0.139) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `Sheet` to `linsys.ts`, `parse.ts`, `main.ts`, `odesolve.ts`, `spec.ts`, `arithmetic.ts`, `num`, `graph/preview.ts`, `symbolic.ts`, `svg.ts`, `Rational`, `graph/file.ts`, `compile`, `numerical.ts`, `markdown.ts`, `graph.ts`, `BoardStore`, `MathError`, `toLatex`, `assistant.ts`, `settings.ts`, `conics.ts`, `graph/space.ts`, `graphNote.test.ts`, `logic.ts`, `fourier.ts`, `namesIn`, `NotesStore`, `study.ts`, `complex.ts`, `downloadText`, `inference.ts`, `solve.ts`, `strokes.ts`, `finite.ts`, `supabase.ts`, `schema/preview.ts`, `chiSquareTest`, `schema/editor.ts`, `several.ts`, `h`, `Glifo – note per Claude`, `sheet.ts`, `numericalGraph.ts`?**
  _High betweenness centrality (0.107) - this node is a cross-community bridge._
- **Why does `Board` connect `Board` to `main.ts`, `.setView`, `store.ts`, `strokes.ts`, `board.ts`, `.warnOnce`?**
  _High betweenness centrality (0.041) - this node is a cross-community bridge._
- **What connects `session-start.sh script`, `name`, `private` to the rest of the system?**
  _554 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `linsys.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13140096618357489 - nodes in this community are weakly interconnected._
- **Should `parse.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07816349384098545 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.044260271557044616 - nodes in this community are weakly interconnected._