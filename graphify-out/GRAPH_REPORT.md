# Graph Report - matherdown  (2026-10-03)

## Corpus Check
- 206 files · ~379,509 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 3316 nodes · 12168 edges · 96 communities (83 shown, 13 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 313 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `72f12943`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- MathNode
- parse.ts
- main.ts
- odesolve.ts
- sync.ts
- spec.ts
- arithmetic.ts
- primitive.ts
- graph/preview.ts
- schema/editor.ts
- symbolic.ts
- h
- svg.ts
- gauss.ts
- SchemaEditor
- complex.test.ts
- graph/space.ts
- compile
- numerical.ts
- FoldersStore
- index.ts
- engine.ts
- linsys.ts
- suggestions.ts
- domain.ts
- MathError
- graph.ts
- assistant.ts
- toLatex
- account-test.mjs
- formatRational
- view3d.ts
- several.ts
- markdown.ts
- logic.ts
- vitest
- spell.test.ts
- Dove sono le cose
- editor/lists.ts
- resize.ts
- statsShown.ts
- Glifo
- NotesStore
- study.ts
- shapes.ts
- supabase.ts
- solve.ts
- complex.ts
- distributions.ts
- toolbar.ts
- conics.ts
- editor/editor.ts
- search.ts
- markers.ts
- probability.ts
- finite.ts
- num
- insert.ts
- Field
- SidePanel
- Rational
- dependencies
- schema/preview.ts
- define.ts
- settings.ts
- laplace.ts
- editor.test.ts
- fourier.ts
- sql.ts
- Benvenuto in Glifo
- compilerOptions
- sheet.ts
- .folderItem
- statsGraph.ts
- templates.ts
- schema/file.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- graph/file.ts
- AccountSync
- session-start.sh
- .claude/CLAUDE.md
- Scope
- files.ts
- .openSql
- numericalGraph.ts
- NodeLook
- supabase-stub.sql

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
- `Dove sono le cose` --references--> `ConicElements`  [INFERRED]
  CLAUDE.md → src/math/conics.ts
- `Funzionalità` --references--> `k()`  [INFERRED]
  README.md → src/math/numerical.ts
- `Dove sono le cose` --references--> `addToGraphBlock()`  [INFERRED]
  CLAUDE.md → src/editor/graphInsert.ts
- `Dove sono le cose` --references--> `isComplexLine()`  [INFERRED]
  CLAUDE.md → src/graph/gauss.ts
- `Dove sono le cose` --references--> `sampleArea()`  [INFERRED]
  CLAUDE.md → src/graph/plot.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (96 total, 13 thin omitted)

### Community 0 - "MathNode"
Cohesion: 0.07
Nodes (40): GaussLine, Definition, Line, ExactComplexScope, Ode, withWorkLimit(), Elem, FormattedResult (+32 more)

### Community 1 - "parse.ts"
Cohesion: 0.07
Nodes (47): errorMessage(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe() (+39 more)

### Community 2 - "main.ts"
Cohesion: 0.05
Nodes (82): graphsForFile(), account, accountButton, accountProblem(), active, app, applyAccountChange(), applySpellcheck() (+74 more)

### Community 3 - "odesolve.ts"
Cohesion: 0.09
Nodes (76): linearIn(), addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames() (+68 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (40): withLock(), accountDataFile(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+32 more)

### Community 5 - "spec.ts"
Cohesion: 0.06
Nodes (78): conicItems(), isConicLine(), quadricEquation(), depth(), multipleOf(), areaOf(), AXES, blockLines() (+70 more)

### Community 6 - "arithmetic.ts"
Cohesion: 0.11
Nodes (39): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+31 more)

### Community 7 - "primitive.ts"
Cohesion: 0.17
Nodes (49): yPowers(), algebraic(), bigGcd(), byParts(), candidates(), canon(), combineLogs(), compareKeys() (+41 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (43): addLabel(), boxes, cameras, complexCoord(), coord(), drawings, drawnViews, endTex() (+35 more)

### Community 9 - "schema/editor.ts"
Cohesion: 0.06
Nodes (53): alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ARROW_NAMES, AT_ICONS (+45 more)

### Community 10 - "symbolic.ts"
Cohesion: 0.08
Nodes (51): EMPTY_SCOPE, atValues(), Converter, coordinates(), decimalText(), definiteParts(), degree(), denominatorPart() (+43 more)

### Community 11 - "h"
Cohesion: 0.09
Nodes (33): SyncStatus, viewSwitch, Settings, AccountButton, confirmAccountDeletion(), messageOf(), openAccountDialog(), openLoginDialog() (+25 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (52): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), domainEdge(), features() (+44 more)

### Community 13 - "gauss.ts"
Cohesion: 0.18
Nodes (18): COMPLEX_FUNCTIONS, farthest(), gaussItem(), hasExponential(), inZ(), isComplexLine(), isComplexValue(), isInequality() (+10 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.10
Nodes (6): openSchemaEditor(), SchemaEditor, cellText(), createEdgeCell(), EdgeLook, serializeSchema()

### Community 15 - "complex.test.ts"
Cohesion: 0.09
Nodes (30): staticGraphSvg(), chooseWindow(), chooseBox(), parseGraph(), DrawOptions, graphSvg(), PALETTES, sceneSvg() (+22 more)

### Community 16 - "graph/space.ts"
Cohesion: 0.13
Nodes (48): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+40 more)

### Community 17 - "compile"
Cohesion: 0.07
Nodes (57): criticalLine(), isSeveralLine(), named(), severalItems(), surface(), areaFor(), constantValue(), argumentOrder() (+49 more)

### Community 18 - "numerical.ts"
Cohesion: 0.12
Nodes (47): bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial(), interpolating() (+39 more)

### Community 19 - "FoldersStore"
Cohesion: 0.17
Nodes (3): cleanFolderName(), FoldersStore, sameName()

### Community 20 - "index.ts"
Cohesion: 0.10
Nodes (23): b, bigops, c, calculus, fn, fr, fractions, functions (+15 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "linsys.ts"
Cohesion: 0.12
Nodes (42): factorShown(), factorsOf(), homogeneousParts(), monomial(), polyPart(), sumShown(), univariateParts(), choices() (+34 more)

### Community 23 - "suggestions.ts"
Cohesion: 0.15
Nodes (11): EditorMathContext, expand(), preferredIndex(), SuggestionController, cardPreviewTex(), formPreviewTex(), ParsedTemplate, parseTemplate() (+3 more)

### Community 24 - "domain.ts"
Cohesion: 0.09
Nodes (48): constantIntegrand(), inequalityMargin(), integralRegion, LayeredSolid, Multiple, planeMargin(), PlanePart, radiusOf() (+40 more)

### Community 25 - "MathError"
Cohesion: 0.15
Nodes (47): MathError, angleBetween(), asMatrix(), basisOf(), cross(), Ctx, dataOf(), determinant() (+39 more)

### Community 26 - "graph.ts"
Cohesion: 0.10
Nodes (34): fieldInput(), textWidth(), AT_X, cellHtml(), COMPASS, createGraph(), drawSchema(), edgeLook() (+26 more)

### Community 27 - "assistant.ts"
Cohesion: 0.10
Nodes (21): @anthropic-ai/sdk, AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askThroughHost() (+13 more)

### Community 28 - "toLatex"
Cohesion: 0.14
Nodes (24): ACCENT_COMMANDS, COMPLEX_FUNCTIONS, diffLatex(), DISTRIBUTION_LATEX, distributionLatex(), domainLatex(), fnLatex(), fnName() (+16 more)

### Community 29 - "account-test.mjs"
Cohesion: 0.08
Nodes (18): login(), waitFor(), b64(), CODE, createFakeSupabase(), handle(), rpc(), session() (+10 more)

### Community 30 - "formatRational"
Cohesion: 0.11
Nodes (29): formatRational(), fromRational(), circleText(), complexText(), degreesText(), entry(), formatEigenvalues(), formatLinear() (+21 more)

### Community 31 - "view3d.ts"
Cohesion: 0.09
Nodes (37): Box, Detail, Face, FAST, FINE, planeTolerance(), GRAPH_WORK, Plane (+29 more)

### Community 32 - "several.ts"
Cohesion: 0.10
Nodes (51): shown(), exText(), fractionNear(), convergesAt(), gcdInt(), logParts(), nearConstant(), PowerSeries (+43 more)

### Community 33 - "markdown.ts"
Cohesion: 0.11
Nodes (30): lineDepth(), parseBlockMath(), cache, escapeHtml(), renderTexOrError(), renderTexWithResult(), TexRender, configurePurify() (+22 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "vitest"
Cohesion: 0.04
Nodes (40): description, devDependencies, @electric-sql/pglite, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+32 more)

### Community 36 - "spell.test.ts"
Cohesion: 0.09
Nodes (22): misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt(), openAt() (+14 more)

### Community 37 - "Dove sono le cose"
Cohesion: 0.13
Nodes (37): Dove sono le cose, bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel() (+29 more)

### Community 38 - "editor/lists.ts"
Cohesion: 0.17
Nodes (32): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+24 more)

### Community 39 - "resize.ts"
Cohesion: 0.13
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "statsShown.ts"
Cohesion: 0.16
Nodes (33): Lin, check(), correlation(), count(), covariance(), Data, dataStatistic(), deviation() (+25 more)

### Community 41 - "Glifo"
Cohesion: 0.04
Nodes (43): Comandi, Come controllare il lavoro, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole, Account, Aggiungere un simbolo (+35 more)

### Community 42 - "NotesStore"
Cohesion: 0.07
Nodes (40): accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf() (+32 more)

### Community 43 - "study.ts"
Cohesion: 0.14
Nodes (36): names(), STUDY_GRAPH, studyItems(), nameLatex(), limit(), Asymptote, compiled(), cutsOf() (+28 more)

### Community 44 - "shapes.ts"
Cohesion: 0.09
Nodes (15): @maxgraph/core, ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape (+7 more)

### Community 45 - "supabase.ts"
Cohesion: 0.13
Nodes (24): @supabase/supabase-js, AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountError, appUrl(), call(), currentSession() (+16 more)

### Community 46 - "solve.ts"
Cohesion: 0.11
Nodes (39): decimalSeparator(), Digits, formatNumber(), FormatOptions, fromNumber(), SUPERSCRIPT, writeDigits(), isStandardUnknown() (+31 more)

### Community 47 - "complex.ts"
Cohesion: 0.06
Nodes (69): add(), allRoots(), arg(), asin(), atan(), compileApply(), compileComplex(), compileFunction() (+61 more)

### Community 48 - "distributions.ts"
Cohesion: 0.07
Nodes (60): addExp(), choose(), continuousQuantile(), discreteQuantile(), Distribution, exactIntervalProbability(), expSumValue(), factorialBig() (+52 more)

### Community 49 - "toolbar.ts"
Cohesion: 0.11
Nodes (13): @codemirror/commands, EditorCallbacks, MarkdownEditor, insertBlock(), insertTemplate(), wrapSelection(), Action, createToolbar() (+5 more)

### Community 50 - "conics.ts"
Cohesion: 0.18
Nodes (29): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+21 more)

### Community 51 - "editor/editor.ts"
Cohesion: 0.07
Nodes (33): @codemirror/lang-markdown, @codemirror/language, @lezer/highlight, acceptCalcResult(), calcPlugin, CalcResult, calcResults(), formulasUntil() (+25 more)

### Community 52 - "search.ts"
Cohesion: 0.16
Nodes (25): SuggestionItem, editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase() (+17 more)

### Community 53 - "markers.ts"
Cohesion: 0.11
Nodes (36): Item, ListStyle, bullet(), bulletGroup(), childMarker(), column(), firstMarker(), label() (+28 more)

### Community 54 - "probability.ts"
Cohesion: 0.14
Nodes (22): End, Family, ExactScope, ALL, complement(), distributionOf(), EventContext, eventSet() (+14 more)

### Community 55 - "finite.ts"
Cohesion: 0.19
Nodes (26): countOf(), elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError, FiniteResult (+18 more)

### Community 56 - "num"
Cohesion: 0.21
Nodes (34): atIntegers(), oneFraction(), exp(), hyperbolicToExp(), inverseRational(), oneFraction(), sqrtEx(), termTransform() (+26 more)

### Community 57 - "insert.ts"
Cohesion: 0.08
Nodes (27): @codemirror/state, @codemirror/view, InsertOptions, toggleLinePrefix(), addPlaceholders, buildDecorations(), clearAllPlaceholders(), clearPlaceholders (+19 more)

### Community 58 - "Field"
Cohesion: 0.11
Nodes (8): characteristicPolynomial(), eigenvalues(), eigenvectors(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn()

### Community 59 - "SidePanel"
Cohesion: 0.21
Nodes (7): cleanKatexError(), renderTex(), isConfidentAnswer(), SymbolForm, displayCode(), preventFocusSteal(), SidePanel

### Community 60 - "Rational"
Cohesion: 0.10
Nodes (23): R(), expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactRandom, exactRoot() (+15 more)

### Community 61 - "dependencies"
Cohesion: 0.09
Nodes (23): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+15 more)

### Community 62 - "schema/preview.ts"
Cohesion: 0.22
Nodes (11): Look, Theme, draw(), drawCached(), drawn, errorHtml(), fill(), hydrateSchemas() (+3 more)

### Community 63 - "define.ts"
Cohesion: 0.11
Nodes (20): g, greek, ch, chemistry, m, misc, o, operators (+12 more)

### Community 64 - "settings.ts"
Cohesion: 0.13
Nodes (20): addPersonalWord(), DICTIONARY_KEY, loadPersonalWords(), savePersonalWords(), tidy(), ACCOUNT_SETTINGS, accountSettings(), AI_MODELS (+12 more)

### Community 65 - "laplace.ts"
Cohesion: 0.20
Nodes (20): factoredPolynomial(), beyondPoles(), compiled(), E, fractionShown(), HALF, inverseLaplaceShown(), laplaceEx() (+12 more)

### Community 66 - "editor.test.ts"
Cohesion: 0.12
Nodes (19): @lezer/common, closeMathBlockOnEnter(), tabOutOfMath(), templateInsertion(), CODE_NODES, CommandToken, commandTokenAt(), isInCode() (+11 more)

### Community 67 - "fourier.ts"
Cohesion: 0.12
Nodes (31): absOf(), boundsOf(), close(), definite(), fourierProblem, fourierShown(), isTrig(), isZero() (+23 more)

### Community 68 - "sql.ts"
Cohesion: 0.16
Nodes (19): @electric-sql/pglite, Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote() (+11 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "sheet.ts"
Cohesion: 0.11
Nodes (23): ExactFunction, FiniteContext, Eigenvalue, EXACT, FLOAT, LinearScope, LinearValue, Poly (+15 more)

### Community 72 - ".folderItem"
Cohesion: 0.22
Nodes (3): formatDate(), NotesPanel, NotesPanelDeps

### Community 73 - "statsGraph.ts"
Cohesion: 0.18
Nodes (16): isTestLine(), number(), testItems(), classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX (+8 more)

### Community 74 - "templates.ts"
Cohesion: 0.11
Nodes (18): SchemaEditorOptions, DEFAULT_EDGE, Schema, SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), conceptMap (+10 more)

### Community 75 - "schema/file.ts"
Cohesion: 0.20
Nodes (11): base64(), hide(), OPEN, schemasFromFile(), unhide(), crc32(), svgSize(), svgToPng() (+3 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "graph/file.ts"
Cohesion: 0.31
Nodes (9): graphImage(), graphImagesFor(), graphsFromFile(), hide(), OPEN, unhide(), areaColor(), itemColors() (+1 more)

### Community 82 - "Scope"
Cohesion: 0.47
Nodes (5): FieldContext, fourierItems(), isFourierLine(), Scope, partialSum()

### Community 83 - "files.ts"
Cohesion: 0.27
Nodes (11): inClaudeViewer(), canWriteFilesDirectly(), FsWindow, isAbort(), MD_TYPES, OpenedFile, openMarkdownFiles(), PickerType (+3 more)

### Community 90 - ".openSql"
Cohesion: 0.47
Nodes (4): loadDialect(), downloadBlob(), downloadText(), fileNameFor()

### Community 91 - "numericalGraph.ts"
Cohesion: 0.80
Nodes (4): isNumericalLine(), numericalItems(), isPlottedNumerical(), numericalPlot()

## Knowledge Gaps
- **462 isolated node(s):** `session-start.sh script`, `name`, `private`, `version`, `description` (+457 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 619 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `MathNode`, `parse.ts`, `main.ts`, `sync.ts`, `primitive.ts`, `schema/editor.ts`, `svg.ts`, `complex.test.ts`, `graph/space.ts`, `suggestions.ts`, `MathError`, `assistant.ts`, `toLatex`, `account-test.mjs`, `markdown.ts`, `spell.test.ts`, `editor/lists.ts`, `resize.ts`, `NotesStore`, `supabase.ts`, `distributions.ts`, `toolbar.ts`, `editor/editor.ts`, `search.ts`, `markers.ts`, `num`, `insert.ts`, `Rational`, `settings.ts`, `editor.test.ts`, `sql.ts`, `schema/file.ts`?**
  _High betweenness centrality (0.133) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `Dove sono le cose` to `MathNode`, `parse.ts`, `odesolve.ts`, `spec.ts`, `arithmetic.ts`, `primitive.ts`, `schema/editor.ts`, `symbolic.ts`, `h`, `svg.ts`, `gauss.ts`, `graph/space.ts`, `numerical.ts`, `linsys.ts`, `MathError`, `graph.ts`, `several.ts`, `logic.ts`, `statsShown.ts`, `Glifo`, `study.ts`, `solve.ts`, `complex.ts`, `distributions.ts`, `conics.ts`, `editor/editor.ts`, `finite.ts`, `Rational`, `fourier.ts`, `Scope`, `numericalGraph.ts`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `main.ts`, `spell.test.ts`, `.openSql`, `editor/lists.ts`, `resize.ts`, `.folderItem`, `schema/editor.ts`, `NotesStore`, `SchemaEditor`, `toolbar.ts`, `graph.ts`, `SidePanel`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **What connects `session-start.sh script`, `name`, `private` to the rest of the system?**
  _462 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `MathNode` be split into smaller, more focused modules?**
  _Cohesion score 0.0692785475394171 - nodes in this community are weakly interconnected._
- **Should `parse.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06555462885738116 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.054945054945054944 - nodes in this community are weakly interconnected._