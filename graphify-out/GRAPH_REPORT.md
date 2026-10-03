# Graph Report - matherdown  (2026-10-03)

## Corpus Check
- 207 files · ~379,701 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 3324 nodes · 12177 edges · 101 communities (83 shown, 18 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 313 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `cb62c3ac`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- .calculate
- Parser
- main.ts
- odesolve.ts
- sync.ts
- spec.ts
- arithmetic.ts
- num
- graph/preview.ts
- schema/editor.ts
- symbolic.ts
- h
- svg.ts
- gauss.ts
- SchemaEditor
- vitest
- view3d.ts
- sheet.ts
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
- spaces.ts
- drawScene
- several.ts
- markdown.ts
- logic.ts
- package.json
- spell.test.ts
- namesIn
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
- Dove sono le cose
- calcPlugin
- search.ts
- markers.ts
- probability.ts
- finite.ts
- parse.ts
- editor/editor.ts
- Field
- SidePanel
- Rational
- dependencies
- schema/preview.ts
- Sheet
- settings.ts
- laplace.ts
- editor.test.ts
- fourier.ts
- sql.ts
- Benvenuto in Glifo
- compilerOptions
- MathNode
- compileComplex
- statsGraph.ts
- schemaTools.test.ts
- parseSchema
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- graphNote.test.ts
- AccountSync
- session-start.sh
- .claude/CLAUDE.md
- Scope
- files.ts
- graphInsert.ts
- complex.test.ts
- linear.test.ts
- supabase-stub.sql
- .scope
- symbols.test.ts
- .showSpaces
- Preview
- .usesDecimals

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
- `Funzionalità` --references--> `k()`  [INFERRED]
  README.md → src/math/numerical.ts
- `Dove sono le cose` --references--> `addToGraphBlock()`  [INFERRED]
  CLAUDE.md → src/editor/graphInsert.ts
- `Dove sono le cose` --references--> `isComplexLine()`  [INFERRED]
  CLAUDE.md → src/graph/gauss.ts
- `Dove sono le cose` --references--> `sampleArea()`  [INFERRED]
  CLAUDE.md → src/graph/plot.ts
- `Dove sono le cose` --references--> `solidFaces()`  [INFERRED]
  CLAUDE.md → src/graph/space.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (101 total, 18 thin omitted)

### Community 0 - ".calculate"
Cohesion: 0.25
Nodes (6): withWorkLimit(), FormattedResult, Special, parseCached(), splitPieces(), needsSymbols()

### Community 1 - "Parser"
Cohesion: 0.12
Nodes (16): Abbonamento e funzioni a pagamento (da capire), Account: i propri appunti su ogni dispositivo, anche da condividere, Aiuto con gli esercizi, Altre idee, Calcoli e grafici: idee in più, Controllare e mostrare quello che si scrive, Idee per il futuro, In programma (+8 more)

### Community 2 - "main.ts"
Cohesion: 0.06
Nodes (75): signOut(), addToGraphBlock(), account, accountButton, accountProblem(), active, app, applyAccountChange() (+67 more)

### Community 3 - "odesolve.ts"
Cohesion: 0.08
Nodes (83): primed(), linearIn(), addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled() (+75 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (37): @electric-sql/pglite, accountDataFile(), EMPTY_STATE, FolderChange, FolderRow, isEmpty(), iso(), LocalChange (+29 more)

### Community 5 - "spec.ts"
Cohesion: 0.06
Nodes (71): constantIntegrand(), depth(), inequalityMargin(), integralRegion, LayeredSolid, Multiple, multipleOf(), planeMargin() (+63 more)

### Community 6 - "arithmetic.ts"
Cohesion: 0.07
Nodes (74): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+66 more)

### Community 7 - "num"
Cohesion: 0.13
Nodes (85): monomial(), atIntegers(), signsUp(), symbolicCoefficient(), withoutAbs(), exp(), hyperbolicToExp(), inverseRational() (+77 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (45): addLabel(), boxes, cameras, complexCoord(), coord(), drawings, drawnViews, endTex() (+37 more)

### Community 9 - "schema/editor.ts"
Cohesion: 0.05
Nodes (61): ALIGN, ARROW_NAMES, AT_ICONS, AT_NAMES, BASE_PRESETS, BIG_ARROWS, DB_PRESETS, Direction (+53 more)

### Community 10 - "symbolic.ts"
Cohesion: 0.08
Nodes (49): atValues(), Converter, coordinates(), decimalText(), definiteParts(), degree(), denominatorPart(), denominators() (+41 more)

### Community 11 - "h"
Cohesion: 0.09
Nodes (31): SyncStatus, viewSwitch, saveClosedFolders(), NoteMeta, AccountButton, confirmAccountDeletion(), messageOf(), openAccountDialog() (+23 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (52): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), domainEdge(), features() (+44 more)

### Community 13 - "gauss.ts"
Cohesion: 0.11
Nodes (27): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexLine(), isComplexValue() (+19 more)

### Community 15 - "vitest"
Cohesion: 0.09
Nodes (21): vitest, formulaGraph(), GraphItem, parseGraph(), parseMath(), light, light, pts (+13 more)

### Community 16 - "view3d.ts"
Cohesion: 0.08
Nodes (67): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+59 more)

### Community 17 - "sheet.ts"
Cohesion: 0.06
Nodes (72): criticalLine(), isSeveralLine(), named(), severalItems(), surface(), complexValue(), define(), argumentOrder() (+64 more)

### Community 18 - "numerical.ts"
Cohesion: 0.11
Nodes (48): FormatOptions, bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial() (+40 more)

### Community 19 - "FoldersStore"
Cohesion: 0.11
Nodes (12): Deletion, cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder(), loadClosedFolders() (+4 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (42): b, bigops, c, calculus, fn, fr, fractions, functions (+34 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "linsys.ts"
Cohesion: 0.16
Nodes (38): choices(), gcd(), matrixEquation(), matrixSystem(), minorsGcd(), ONE, parametricRows(), parametricSystem() (+30 more)

### Community 23 - "suggestions.ts"
Cohesion: 0.17
Nodes (8): EditorMathContext, expand(), preferredIndex(), SuggestionController, isSubsequence(), suggestCommands(), parseTemplate(), templateText()

### Community 24 - "domain.ts"
Cohesion: 0.18
Nodes (21): axesIn(), bestAlong(), boundingBox(), combine(), compileDomain(), compileMultiple(), conditionsOf(), constantOf() (+13 more)

### Community 25 - "MathError"
Cohesion: 0.13
Nodes (50): MathError, UndefinedName, angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx (+42 more)

### Community 26 - "graph.ts"
Cohesion: 0.11
Nodes (28): textWidth(), AT_X, cellHtml(), cellText(), COMPASS, createEdgeCell(), createGraph(), drawSchema() (+20 more)

### Community 27 - "assistant.ts"
Cohesion: 0.10
Nodes (21): @anthropic-ai/sdk, AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askThroughHost() (+13 more)

### Community 28 - "toLatex"
Cohesion: 0.09
Nodes (44): isNumericalLine(), numericalItems(), areaFor(), areaOf(), condLabel(), isStraight(), isVectorName(), itemFor() (+36 more)

### Community 29 - "account-test.mjs"
Cohesion: 0.06
Nodes (25): markdown-it, playwright-core, vite, login(), waitFor(), b64(), CODE, createFakeSupabase() (+17 more)

### Community 30 - "spaces.ts"
Cohesion: 0.12
Nodes (30): decimalSeparator(), Digits, formatNumber(), formatRational(), fromNumber(), fromRational(), SUPERSCRIPT, writeDigits() (+22 more)

### Community 31 - "drawScene"
Cohesion: 0.15
Nodes (17): Vec3, escapeXml(), arrowHead(), boxShape(), Coverage, Directions, dot(), drawScene() (+9 more)

### Community 32 - "several.ts"
Cohesion: 0.15
Nodes (35): severalLimit, at(), bounded(), Candidate, candidates(), compiled(), COORDS, coordShown() (+27 more)

### Community 33 - "markdown.ts"
Cohesion: 0.13
Nodes (25): @lezer/highlight, @lezer/markdown, lineDepth(), mathDelimTag, mathMarkdown, mathTag, parseBlockMath(), createMarkdownIt() (+17 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "package.json"
Cohesion: 0.05
Nodes (35): description, devDependencies, @electric-sql/pglite, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+27 more)

### Community 36 - "spell.test.ts"
Cohesion: 0.08
Nodes (23): @codemirror/lang-markdown, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt() (+15 more)

### Community 37 - "namesIn"
Cohesion: 0.13
Nodes (37): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+29 more)

### Community 38 - "editor/lists.ts"
Cohesion: 0.16
Nodes (34): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+26 more)

### Community 39 - "resize.ts"
Cohesion: 0.13
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "statsShown.ts"
Cohesion: 0.19
Nodes (29): check(), correlation(), count(), covariance(), Data, dataStatistic(), deviation(), fail() (+21 more)

### Community 41 - "Glifo"
Cohesion: 0.06
Nodes (29): Comandi, Come controllare il lavoro, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole, Account, Aggiungere un simbolo (+21 more)

### Community 42 - "NotesStore"
Cohesion: 0.08
Nodes (30): accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf() (+22 more)

### Community 43 - "study.ts"
Cohesion: 0.10
Nodes (49): fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), alternating(), close() (+41 more)

### Community 44 - "shapes.ts"
Cohesion: 0.09
Nodes (15): @maxgraph/core, ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape (+7 more)

### Community 45 - "supabase.ts"
Cohesion: 0.12
Nodes (27): @supabase/supabase-js, AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, withLock(), Account, accountError, appUrl() (+19 more)

### Community 46 - "solve.ts"
Cohesion: 0.16
Nodes (25): surdText(), isStandardUnknown(), linearSystem(), RelOp, breaks(), cubeRoot(), equation(), holds() (+17 more)

### Community 47 - "complex.ts"
Cohesion: 0.09
Nodes (28): add(), allRoots(), arg(), ComplexCompiled, cos(), cosh(), EMPTY_COMPLEX_SCOPE, exp() (+20 more)

### Community 48 - "distributions.ts"
Cohesion: 0.07
Nodes (61): addExp(), choose(), continuousQuantile(), discreteQuantile(), Distribution, exactIntervalProbability(), expSumValue(), factorialBig() (+53 more)

### Community 49 - "toolbar.ts"
Cohesion: 0.10
Nodes (18): @codemirror/commands, closeMathBlockOnEnter(), EditorCallbacks, MarkdownEditor, tabOutOfMath(), insertBlock(), insertTemplate(), wrapSelection() (+10 more)

### Community 50 - "Dove sono le cose"
Cohesion: 0.33
Nodes (6): Dove sono le cose, ConicElements, chiSquareTest(), InferenceContext, solveRequest(), studyTable()

### Community 52 - "search.ts"
Cohesion: 0.17
Nodes (23): editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex() (+15 more)

### Community 53 - "markers.ts"
Cohesion: 0.12
Nodes (32): ListStyle, bullet(), bulletGroup(), childMarker(), column(), firstMarker(), label(), lettersMarker() (+24 more)

### Community 54 - "probability.ts"
Cohesion: 0.15
Nodes (23): End, compileCondition(), ExactScope, fractionNear(), ALL, complement(), endAt(), EventContext (+15 more)

### Community 55 - "finite.ts"
Cohesion: 0.19
Nodes (26): countOf(), elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError, FiniteResult (+18 more)

### Community 56 - "parse.ts"
Cohesion: 0.07
Nodes (36): hasWord(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, differentialInFraction() (+28 more)

### Community 57 - "editor/editor.ts"
Cohesion: 0.08
Nodes (33): @codemirror/language, @codemirror/state, @codemirror/view, acceptCalcResult(), CalcResult, calcResults(), formulasUntil(), insertResult() (+25 more)

### Community 58 - "Field"
Cohesion: 0.11
Nodes (8): characteristicPolynomial(), eigenvalues(), eigenvectors(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn()

### Community 59 - "SidePanel"
Cohesion: 0.18
Nodes (9): cache, cleanKatexError(), renderTex(), renderTexOrError(), renderTexWithResult(), TexRender, displayCode(), preventFocusSteal() (+1 more)

### Community 60 - "Rational"
Cohesion: 0.10
Nodes (27): Part, exactSqrt(), unavailable(), expSum, spend(), bigGcd(), binomExact(), conditionExact() (+19 more)

### Community 61 - "dependencies"
Cohesion: 0.09
Nodes (23): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+15 more)

### Community 62 - "schema/preview.ts"
Cohesion: 0.22
Nodes (12): GraphLook, SchemaEditorOptions, Look, Theme, draw(), drawCached(), drawn, errorHtml() (+4 more)

### Community 63 - "Sheet"
Cohesion: 0.13
Nodes (23): Sheet, text(), tex(), text(), result(), text(), result(), text() (+15 more)

### Community 64 - "settings.ts"
Cohesion: 0.11
Nodes (24): addPersonalWord(), DICTIONARY_KEY, loadPersonalWords(), savePersonalWords(), tidy(), ACCOUNT_SETTINGS, accountSettings(), AI_MODELS (+16 more)

### Community 65 - "laplace.ts"
Cohesion: 0.19
Nodes (26): factoredPolynomial(), polynomialOf(), oneFraction(), simplest(), beyondPoles(), compiled(), E, fractionShown() (+18 more)

### Community 66 - "editor.test.ts"
Cohesion: 0.08
Nodes (26): @lezer/common, templateInsertion(), CODE_NODES, CommandToken, commandTokenAt(), isInCode(), MATH_NODES, mathContextAt() (+18 more)

### Community 67 - "fourier.ts"
Cohesion: 0.09
Nodes (36): absOf(), boundsOf(), close(), definite(), fourierProblem, fourierShown(), isTrig(), isZero() (+28 more)

### Community 68 - "sql.ts"
Cohesion: 0.19
Nodes (15): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+7 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "MathNode"
Cohesion: 0.17
Nodes (10): Definition, Line, Line, ExactComplexScope, Ode, ExactFunction, Elem, FiniteContext (+2 more)

### Community 72 - "compileComplex"
Cohesion: 0.22
Nodes (15): asin(), atan(), compileApply(), compileComplex(), compileFunction(), compileName(), complexScopeWith(), conjugateOf() (+7 more)

### Community 73 - "statsGraph.ts"
Cohesion: 0.19
Nodes (16): isTestLine(), number(), testItems(), classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX (+8 more)

### Community 74 - "schemaTools.test.ts"
Cohesion: 0.14
Nodes (20): alignBoxes(), Alignment, Box, distributeBoxes(), Position, base64(), crc32(), svgSize() (+12 more)

### Community 75 - "parseSchema"
Cohesion: 0.12
Nodes (21): OpenFence, SchemaBlock, schemaBlockAtLine(), schemaBlockText(), hide(), OPEN, schemasForFile(), schemasFromFile() (+13 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "graphNote.test.ts"
Cohesion: 0.15
Nodes (20): graphImage(), graphImagesFor(), graphsForFile(), graphsFromFile(), hide(), OPEN, unhide(), areaColor() (+12 more)

### Community 82 - "Scope"
Cohesion: 0.24
Nodes (11): conicItems(), isConicLine(), quadricEquation(), FieldContext, fourierItems(), isFourierLine(), Scope, partialSum() (+3 more)

### Community 83 - "files.ts"
Cohesion: 0.19
Nodes (15): inClaudeViewer(), loadDialect(), canWriteFilesDirectly(), downloadBlob(), downloadText(), fileNameFor(), FsWindow, isAbort() (+7 more)

### Community 90 - "graphInsert.ts"
Cohesion: 0.19
Nodes (15): formulaAtCursor(), insertGraphBlock(), mathRegionAt(), blockLines(), formulaGraphLine(), graphBlockText(), graphNames(), parseLine() (+7 more)

### Community 91 - "complex.test.ts"
Cohesion: 0.19
Nodes (13): staticGraphSvg(), chooseWindow(), chooseBox(), DrawOptions, graphSvg(), Palette, PALETTES, DEFAULT_CAMERA (+5 more)

### Community 92 - "linear.test.ts"
Cohesion: 0.20
Nodes (14): dims(), EXACT, identity(), inverse(), kernel(), maxSize(), multiply(), power() (+6 more)

### Community 97 - "symbols.test.ts"
Cohesion: 0.27
Nodes (8): SuggestionItem, CATEGORIES, cardPreviewTex(), formPreviewTex(), ParsedTemplate, PLACEHOLDER_TEX, placeholderPreview(), SymbolForm

## Knowledge Gaps
- **466 isolated node(s):** `session-start.sh script`, `name`, `private`, `version`, `description` (+461 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 625 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `sync.ts`, `num`, `svg.ts`, `view3d.ts`, `sheet.ts`, `FoldersStore`, `linsys.ts`, `domain.ts`, `assistant.ts`, `account-test.mjs`, `package.json`, `spell.test.ts`, `editor/lists.ts`, `resize.ts`, `NotesStore`, `supabase.ts`, `distributions.ts`, `toolbar.ts`, `search.ts`, `markers.ts`, `editor/editor.ts`, `Rational`, `settings.ts`, `editor.test.ts`, `schemaTools.test.ts`, `parseSchema`, `graphNote.test.ts`, `complex.test.ts`, `linear.test.ts`, `symbols.test.ts`?**
  _High betweenness centrality (0.116) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `Dove sono le cose` to `.calculate`, `Parser`, `main.ts`, `odesolve.ts`, `spec.ts`, `arithmetic.ts`, `num`, `graph/preview.ts`, `schema/editor.ts`, `symbolic.ts`, `svg.ts`, `gauss.ts`, `view3d.ts`, `numerical.ts`, `linsys.ts`, `MathError`, `graph.ts`, `toLatex`, `several.ts`, `logic.ts`, `namesIn`, `Glifo`, `study.ts`, `distributions.ts`, `finite.ts`, `parse.ts`, `Rational`, `fourier.ts`, `compileComplex`, `schemaTools.test.ts`, `Scope`, `.scope`, `Preview`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `settings.ts`, `main.ts`, `Preview`, `spell.test.ts`, `resize.ts`, `schema/editor.ts`, `SchemaEditor`, `toolbar.ts`, `files.ts`, `graph.ts`, `SidePanel`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **What connects `session-start.sh script`, `name`, `private` to the rest of the system?**
  _466 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Parser` be split into smaller, more focused modules?**
  _Cohesion score 0.12245696400625979 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05938375350140056 - nodes in this community are weakly interconnected._
- **Should `odesolve.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08175559380378658 - nodes in this community are weakly interconnected._