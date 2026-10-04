# Graph Report - matherdown  (2026-10-04)

## Corpus Check
- 218 files · ~395,143 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 3454 nodes · 12528 edges · 105 communities (90 shown, 15 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 333 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `726864c3`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- solve.ts
- parse.ts
- main.ts
- odesolve.ts
- sync.ts
- spec.ts
- arithmetic.ts
- num
- graph/preview.ts
- schema/editor.ts
- symbolic.ts
- toLatex
- svg.ts
- linsys.ts
- SchemaEditor
- vitest
- graph/space.ts
- compile
- numerical.ts
- FoldersStore
- index.ts
- engine.ts
- Rational
- conics.ts
- several.ts
- MathError
- h
- assistant.ts
- spell.test.ts
- fake-supabase.mjs
- sheet.ts
- view3d.ts
- compileComplex
- markdown.ts
- logic.ts
- editor/editor.ts
- editor.test.ts
- Dove sono le cose
- .folderItem
- resize.ts
- statsShown.ts
- files.ts
- NotesStore
- study.ts
- graph.ts
- supabase.ts
- probability.ts
- complex.ts
- distributions.ts
- toolbar.ts
- page.ts
- graphNote.test.ts
- search.ts
- editor/lists.ts
- domain.ts
- finite.ts
- 20261004091555_note_condivise.sql
- insert.ts
- .int
- SidePanel
- shapes.ts
- dependencies
- schema/preview.ts
- MathNode
- inference.ts
- markers.ts
- suggestions.ts
- tutorial.mjs
- sql.ts
- Benvenuto in Glifo
- compilerOptions
- icons.mjs
- templates.ts
- formatNumber
- tutorial.ts
- gauss.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- parseSchema
- limits.ts
- session-start.sh
- .claude/CLAUDE.md
- Glifo
- sidePanel.ts
- severalGraph.ts
- schemaTools.test.ts
- katex.ts
- supabase-stub.sql
- account-test.mjs
- database.ts
- devDependencies
- AccountSync
- scripts
- integrate
- smoke-test.mjs
- numerical.test.ts

## God Nodes (most connected - your core abstractions)
1. `MathError` - 149 edges
2. `num()` - 133 edges
3. `mul()` - 112 edges
4. `MathNode` - 110 edges
5. `compile()` - 109 edges
6. `Rational` - 108 edges
7. `Sheet` - 107 edges
8. `toLatex()` - 100 edges
9. `add()` - 90 edges
10. `pow()` - 89 edges

## Surprising Connections (you probably didn't know these)
- `Dove sono le cose` --references--> `sharedLinks()`  [INFERRED]
  CLAUDE.md → src/account/supabase.ts
- `Dove sono le cose` --references--> `shareNote()`  [INFERRED]
  CLAUDE.md → src/account/supabase.ts
- `Dove sono le cose` --references--> `addToGraphBlock()`  [INFERRED]
  CLAUDE.md → src/editor/graphInsert.ts
- `Dove sono le cose` --references--> `sampleArea()`  [INFERRED]
  CLAUDE.md → src/graph/plot.ts
- `Dove sono le cose` --references--> `layeredFaces()`  [INFERRED]
  CLAUDE.md → src/graph/space.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (105 total, 15 thin omitted)

### Community 0 - "solve.ts"
Cohesion: 0.16
Nodes (27): LinearScope, isStandardUnknown(), linearSystem(), matrixEquation(), RelOp, numericRoots(), rationalRoots(), breaks() (+19 more)

### Community 1 - "parse.ts"
Cohesion: 0.08
Nodes (37): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe(), differentialInFraction() (+29 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (103): addToGraphBlock(), graphsForFile(), hide(), account, active, app, applyAccountChange(), applySpellcheck() (+95 more)

### Community 3 - "odesolve.ts"
Cohesion: 0.09
Nodes (80): linearIn(), addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames() (+72 more)

### Community 4 - "sync.ts"
Cohesion: 0.07
Nodes (30): withLock(), EMPTY_STATE, FolderChange, FolderRow, isEmpty(), iso(), LocalChange, merge() (+22 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (106): formulaAtCursor(), insertGraphBlock(), quadricEquation(), onlyComplex(), isTestLine(), number(), testItems(), constantIntegrand() (+98 more)

### Community 6 - "arithmetic.ts"
Cohesion: 0.07
Nodes (69): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+61 more)

### Community 7 - "num"
Cohesion: 0.10
Nodes (103): monomial(), Coefficients, absOf(), atIntegers(), boundsOf(), close(), definite(), fourierProblem (+95 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (41): addLabel(), boxes, cameras, complexCoord(), coord(), drawings, drawnViews, endTex() (+33 more)

### Community 9 - "schema/editor.ts"
Cohesion: 0.06
Nodes (47): ALIGN, ARROW_NAMES, AT_ICONS, AT_NAMES, BASE_PRESETS, BIG_ARROWS, DB_PRESETS, Direction (+39 more)

### Community 10 - "symbolic.ts"
Cohesion: 0.08
Nodes (47): atValues(), Converter, coordinates(), decimalText(), definiteParts(), degree(), denominatorPart(), denominators() (+39 more)

### Community 11 - "toLatex"
Cohesion: 0.09
Nodes (33): conicItems(), isConicLine(), fourierItems(), isFourierLine(), isNumericalLine(), numericalItems(), partialSum(), ACCENT_COMMANDS (+25 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (52): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseWindow(), chooseY(), clipLines(), domainEdge() (+44 more)

### Community 13 - "linsys.ts"
Cohesion: 0.16
Nodes (35): choices(), exText(), minorsGcd(), ONE, parametricRows(), parametricSystem(), PARAMS, polyDeterminant() (+27 more)

### Community 15 - "vitest"
Cohesion: 0.06
Nodes (39): vitest, graphImage(), graphImagesFor(), graphsFromFile(), OPEN, unhide(), staticGraphSvg(), GraphItem (+31 more)

### Community 16 - "graph/space.ts"
Cohesion: 0.12
Nodes (49): addMesh(), addTet(), affinePlane(), Axis, centroid(), chooseBox(), clipBy(), clipPolygon() (+41 more)

### Community 17 - "compile"
Cohesion: 0.07
Nodes (54): typedSliderValue(), argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot(), fieldOn() (+46 more)

### Community 18 - "numerical.ts"
Cohesion: 0.12
Nodes (47): Funzionalità, bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial() (+39 more)

### Community 19 - "FoldersStore"
Cohesion: 0.17
Nodes (3): cleanFolderName(), FoldersStore, sameName()

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (41): b, bigops, c, calculus, fn, fr, fractions, functions (+33 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "Rational"
Cohesion: 0.09
Nodes (27): Part, expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactFunction, ExactRandom (+19 more)

### Community 23 - "conics.ts"
Cohesion: 0.19
Nodes (27): at(), centralCanonical(), coneCanonical(), ConicInfo, conicOf(), det2(), det3(), determinant() (+19 more)

### Community 24 - "several.ts"
Cohesion: 0.07
Nodes (63): close(), Definite, definiteIntegral(), exValue(), samples(), EMPTY_SCOPE, Piece, LimitValue (+55 more)

### Community 25 - "MathError"
Cohesion: 0.12
Nodes (56): MathError, ExactUnavailable, angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx (+48 more)

### Community 26 - "h"
Cohesion: 0.08
Nodes (42): SyncStatus, viewSwitch, openShareDialog(), changeAccess(), changeCopy(), refreshChanged(), render(), run() (+34 more)

### Community 27 - "assistant.ts"
Cohesion: 0.19
Nodes (13): @anthropic-ai/sdk, AiAnswer, AiError, AiSettings, ANSWER_SCHEMA, askAi(), askThroughHost(), checkShape() (+5 more)

### Community 28 - "spell.test.ts"
Cohesion: 0.09
Nodes (22): misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt(), openAt() (+14 more)

### Community 29 - "fake-supabase.mjs"
Cohesion: 0.22
Nodes (11): b64(), CODE, createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom() (+3 more)

### Community 30 - "sheet.ts"
Cohesion: 0.08
Nodes (46): formatGauss(), formatRational(), Eigenvalue, eigenvectors(), EXACT, FLOAT, kernel(), lengthText() (+38 more)

### Community 31 - "view3d.ts"
Cohesion: 0.09
Nodes (37): tickLabel(), Detail, Face, FAST, FINE, planeTolerance(), Plane, Vec3 (+29 more)

### Community 32 - "compileComplex"
Cohesion: 0.23
Nodes (15): asin(), atan(), compileApply(), compileComplex(), compileFunction(), compileName(), conjugateOf(), constant() (+7 more)

### Community 33 - "markdown.ts"
Cohesion: 0.09
Nodes (38): dompurify, highlight.js, markdown-it-footnote, ListStyle, bulletGroup(), Marker, sameList(), alignInside() (+30 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "editor/editor.ts"
Cohesion: 0.07
Nodes (32): description, name, private, type, version, @codemirror/autocomplete, @codemirror/commands, @codemirror/language (+24 more)

### Community 36 - "editor.test.ts"
Cohesion: 0.07
Nodes (30): @codemirror/state, @lezer/common, closeMathBlockOnEnter(), tabOutOfMath(), CODE_NODES, CommandToken, commandTokenAt(), isInCode() (+22 more)

### Community 37 - "Dove sono le cose"
Cohesion: 0.11
Nodes (43): Dove sono le cose, bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel() (+35 more)

### Community 38 - ".folderItem"
Cohesion: 0.16
Nodes (6): clear(), formatDate(), MenuEntry, openMenu(), NotesPanel, NotesPanelDeps

### Community 39 - "resize.ts"
Cohesion: 0.13
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "statsShown.ts"
Cohesion: 0.19
Nodes (29): check(), correlation(), count(), covariance(), Data, dataStatistic(), deviation(), fail() (+21 more)

### Community 41 - "files.ts"
Cohesion: 0.15
Nodes (18): cache, capability(), ClaudeRuntime, hostDownloads, HostError, inClaudeViewer(), ModelTier, runtime() (+10 more)

### Community 42 - "NotesStore"
Cohesion: 0.07
Nodes (42): Account, accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount() (+34 more)

### Community 43 - "study.ts"
Cohesion: 0.17
Nodes (32): nameLatex(), limit(), Asymptote, compiled(), cutsOf(), defined(), domainOf(), exact() (+24 more)

### Community 44 - "graph.ts"
Cohesion: 0.12
Nodes (29): AT_X, cellHtml(), cellText(), COMPASS, createEdgeCell(), createGraph(), drawSchema(), edgeLook() (+21 more)

### Community 45 - "supabase.ts"
Cohesion: 0.07
Nodes (53): @supabase/supabase-js, AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), accountError, appUrl(), call() (+45 more)

### Community 46 - "probability.ts"
Cohesion: 0.09
Nodes (29): addExp(), Distribution, End, exactIntervalProbability(), Family, subtractExp(), rejection(), TestResult (+21 more)

### Community 47 - "complex.ts"
Cohesion: 0.10
Nodes (27): add(), allRoots(), arg(), ComplexCompiled, cos(), cosh(), EMPTY_COMPLEX_SCOPE, exactSqrt() (+19 more)

### Community 48 - "distributions.ts"
Cohesion: 0.15
Nodes (30): choose(), continuousQuantile(), discreteQuantile(), expSumValue(), factorialBig(), FAMILIES, integerParam(), integerRange() (+22 more)

### Community 49 - "toolbar.ts"
Cohesion: 0.12
Nodes (15): EditorCallbacks, MarkdownEditor, insertBlock(), insertTemplate(), wrapSelection(), Action, createToolbar(), insertCode() (+7 more)

### Community 50 - "page.ts"
Cohesion: 0.11
Nodes (20): katex, SharedNote, body, draw(), isDark(), saveButton, saveCopy(), settings (+12 more)

### Community 51 - "graphNote.test.ts"
Cohesion: 0.13
Nodes (15): @codemirror/lang-markdown, acceptCalcResult(), calcPlugin, CalcResult, calcResults(), formulasUntil(), insertResult(), ResultWidget (+7 more)

### Community 52 - "search.ts"
Cohesion: 0.18
Nodes (22): editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex() (+14 more)

### Community 53 - "editor/lists.ts"
Cohesion: 0.17
Nodes (33): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+25 more)

### Community 54 - "domain.ts"
Cohesion: 0.17
Nodes (25): depth(), integralRegion, LayeredSolid, Multiple, PlanePart, axesIn(), combine(), compileDomain() (+17 more)

### Community 55 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "insert.ts"
Cohesion: 0.13
Nodes (16): @codemirror/view, InsertOptions, toggleLinePrefix(), addPlaceholders, Placeholder, besideSchema(), guardBlocks(), schemaBlockRanges() (+8 more)

### Community 58 - ".int"
Cohesion: 0.10
Nodes (9): characteristicPolynomial(), eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), Mat, polynomialIn() (+1 more)

### Community 59 - "SidePanel"
Cohesion: 0.24
Nodes (5): cleanKatexError(), renderTex(), displayCode(), preventFocusSteal(), SidePanel

### Community 60 - "shapes.ts"
Cohesion: 0.09
Nodes (15): @maxgraph/core, ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape (+7 more)

### Community 61 - "dependencies"
Cohesion: 0.09
Nodes (23): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+15 more)

### Community 62 - "schema/preview.ts"
Cohesion: 0.15
Nodes (13): GraphLook, Look, Theme, draw(), drawCached(), drawn, errorHtml(), fill() (+5 more)

### Community 63 - "MathNode"
Cohesion: 0.09
Nodes (29): ExactComplexScope, Ode, withWorkLimit(), FiniteContext, FormattedResult, MathNode, Definition, definitionTarget() (+21 more)

### Community 64 - "inference.ts"
Cohesion: 0.14
Nodes (25): chiSquareTest(), confidence(), confidenceShown(), Given, hypothesisTest(), InferenceContext, interval(), meanOf() (+17 more)

### Community 65 - "markers.ts"
Cohesion: 0.18
Nodes (20): bullet(), childMarker(), column(), firstMarker(), label(), lettersMarker(), MarkerKind, MarkerStyle (+12 more)

### Community 66 - "suggestions.ts"
Cohesion: 0.17
Nodes (9): templateInsertion(), EditorMathContext, expand(), preferredIndex(), SuggestionController, isSubsequence(), suggestCommands(), parseTemplate() (+1 more)

### Community 67 - "tutorial.mjs"
Cohesion: 0.12
Nodes (10): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+2 more)

### Community 68 - "sql.ts"
Cohesion: 0.17
Nodes (18): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+10 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 72 - "templates.ts"
Cohesion: 0.11
Nodes (18): SchemaEditorOptions, DEFAULT_EDGE, Schema, SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), conceptMap (+10 more)

### Community 73 - "formatNumber"
Cohesion: 0.12
Nodes (25): classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX, Line, number(), pmfBars() (+17 more)

### Community 74 - "tutorial.ts"
Cohesion: 0.15
Nodes (14): helpButton, openGuide(), HINT_MS, markSeen(), openTutorial(), show(), richText(), showTutorialHint() (+6 more)

### Community 75 - "gauss.ts"
Cohesion: 0.18
Nodes (18): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexValue(), isInequality() (+10 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "parseSchema"
Cohesion: 0.17
Nodes (15): base64(), hide(), OPEN, schemasForFile(), schemasFromFile(), unhide(), isRecord(), num() (+7 more)

### Community 79 - "limits.ts"
Cohesion: 0.20
Nodes (18): exponentialForm(), fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), alternating() (+10 more)

### Community 82 - "Glifo"
Cohesion: 0.04
Nodes (44): Comandi, Come controllare il lavoro, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole, Account, Aggiungere un simbolo (+36 more)

### Community 83 - "sidePanel.ts"
Cohesion: 0.19
Nodes (13): AiResult, SuggestionItem, isConfidentAnswer(), CATEGORIES, symbolsInCategory(), cardPreviewTex(), formPreviewTex(), ParsedTemplate (+5 more)

### Community 90 - "severalGraph.ts"
Cohesion: 0.21
Nodes (14): FieldContext, criticalLine(), isSeveralLine(), named(), severalItems(), surface(), names(), STUDY_GRAPH (+6 more)

### Community 91 - "schemaTools.test.ts"
Cohesion: 0.21
Nodes (12): alignBoxes(), Alignment, Box, distributeBoxes(), Position, crc32(), svgSize(), svgToPng() (+4 more)

### Community 92 - "katex.ts"
Cohesion: 0.26
Nodes (12): cache, escapeHtml(), renderTexMathml(), renderTexOrError(), renderTexWithResult(), TexRender, labelHtml(), plainHtml() (+4 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.20
Nodes (4): device(), login(), newContext, waitFor()

### Community 97 - "database.ts"
Cohesion: 0.24
Nodes (6): @electric-sql/pglite, createDatabase(), createUser(), databaseTests(), migrations, shareTests()

### Community 98 - "devDependencies"
Cohesion: 0.22
Nodes (9): devDependencies, @electric-sql/pglite, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite, vite-plugin-pwa (+1 more)

### Community 101 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 102 - "integrate"
Cohesion: 0.39
Nodes (8): bestAlong(), boundingBox(), insideIntervals(), integrateDomain(), integrateEdges(), integrate(), kronrod(), spend()

### Community 103 - "smoke-test.mjs"
Cohesion: 0.29
Nodes (4): markdown-it, vite, firstVisit(), plainContext

### Community 104 - "numerical.test.ts"
Cohesion: 0.60
Nodes (3): result(), text(), verdict()

## Knowledge Gaps
- **488 isolated node(s):** `Comandi`, `Promemoria per lo studente`, `Regole`, `graphify`, `Condividere una nota con un link` (+483 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 661 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `main.ts`, `sync.ts`, `num`, `toLatex`, `svg.ts`, `graph/space.ts`, `compile`, `Rational`, `assistant.ts`, `spell.test.ts`, `sheet.ts`, `markdown.ts`, `editor/editor.ts`, `editor.test.ts`, `resize.ts`, `NotesStore`, `supabase.ts`, `distributions.ts`, `page.ts`, `graphNote.test.ts`, `search.ts`, `editor/lists.ts`, `insert.ts`, `MathNode`, `markers.ts`, `sql.ts`, `tutorial.ts`, `parseSchema`, `sidePanel.ts`, `schemaTools.test.ts`, `database.ts`, `numerical.test.ts`?**
  _High betweenness centrality (0.131) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `Dove sono le cose` to `solve.ts`, `parse.ts`, `main.ts`, `odesolve.ts`, `spec.ts`, `arithmetic.ts`, `num`, `schema/editor.ts`, `symbolic.ts`, `toLatex`, `svg.ts`, `linsys.ts`, `graph/space.ts`, `compile`, `numerical.ts`, `Rational`, `several.ts`, `MathError`, `compileComplex`, `markdown.ts`, `logic.ts`, `study.ts`, `supabase.ts`, `finite.ts`, `schema/preview.ts`, `MathNode`, `inference.ts`, `tutorial.ts`, `limits.ts`, `Glifo`, `severalGraph.ts`, `katex.ts`?**
  _High betweenness centrality (0.066) - this node is a cross-community bridge._
- **Why does `MathError` connect `MathError` to `solve.ts`, `odesolve.ts`, `spec.ts`, `num`, `symbolic.ts`, `toLatex`, `linsys.ts`, `compile`, `numerical.ts`, `sheet.ts`, `compileComplex`, `Dove sono le cose`, `statsShown.ts`, `probability.ts`, `complex.ts`, `distributions.ts`, `domain.ts`, `.int`, `MathNode`, `inference.ts`, `formatNumber`, `gauss.ts`, `severalGraph.ts`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **What connects `Comandi`, `Promemoria per lo studente`, `Regole` to the rest of the system?**
  _488 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `parse.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07838745800671892 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04088482074752098 - nodes in this community are weakly interconnected._
- **Should `odesolve.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08518518518518518 - nodes in this community are weakly interconnected._