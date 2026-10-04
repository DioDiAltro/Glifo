# Graph Report - matherdown  (2026-10-04)

## Corpus Check
- 219 files · ~404,879 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 3507 nodes · 12758 edges · 103 communities (89 shown, 14 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 339 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `13718e30`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- solve.ts
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
- settings.ts
- svg.ts
- linsys.ts
- SchemaEditor
- editor/lists.ts
- graph/space.ts
- compile
- MathError
- FoldersStore
- index.ts
- engine.ts
- Rational
- conics.ts
- several.ts
- linear.ts
- h
- assistant.ts
- spell.test.ts
- fake-supabase.mjs
- sheet.ts
- view3d.ts
- distributions.ts
- markdown.ts
- logic.ts
- MathNode
- graphNote.test.ts
- namesIn
- gauss.ts
- resize.ts
- statsShown.ts
- scopeWith
- NotesStore
- study.ts
- parseSchema
- supabase.ts
- probability.ts
- complex.ts
- parse.ts
- editor/editor.ts
- openShareDialog
- toLatex
- search.ts
- laplace.ts
- files.ts
- finite.ts
- 20261004091555_note_condivise.sql
- vitest
- Field
- SidePanel
- graph.ts
- dependencies
- page.ts
- inference.ts
- schema/preview.ts
- markers.ts
- .openSql
- tutorial.mjs
- sql.ts
- Benvenuto in Glifo
- compilerOptions
- smoke-test.mjs
- insert.ts
- statsGraph.ts
- placeholders.ts
- toolbar.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- grafo-html.mjs
- limits.ts
- session-start.sh
- .claude/CLAUDE.md
- .int
- sidePanel.ts
- Abbonamenti
- createFakeSupabase
- toNode
- supabase-stub.sql
- account-test.mjs
- End
- formatNumber
- icons.mjs
- graph/file.ts
- devDependencies

## God Nodes (most connected - your core abstractions)
1. `MathError` - 151 edges
2. `num()` - 145 edges
3. `mul()` - 124 edges
4. `MathNode` - 113 edges
5. `compile()` - 112 edges
6. `Rational` - 110 edges
7. `Sheet` - 109 edges
8. `toLatex()` - 101 edges
9. `add()` - 98 edges
10. `pow()` - 94 edges

## Surprising Connections (you probably didn't know these)
- `Dove sono le cose` --references--> `ConicElements`  [INFERRED]
  CLAUDE.md → src/math/conics.ts
- `Funzionalità` --references--> `k()`  [INFERRED]
  README.md → src/math/numerical.ts
- `Dove sono le cose` --references--> `Converter`  [INFERRED]
  CLAUDE.md → src/math/symbolic.ts
- `Dove sono le cose` --references--> `NumericContext`  [INFERRED]
  CLAUDE.md → src/math/numerical.ts
- `Dove sono le cose` --references--> `expSum`  [INFERRED]
  CLAUDE.md → src/math/distributions.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (103 total, 14 thin omitted)

### Community 0 - "solve.ts"
Cohesion: 0.16
Nodes (27): LinearScope, splitRoot(), isStandardUnknown(), linearSystem(), matrixEquation(), rationalRoots(), breaks(), cubeRoot() (+19 more)

### Community 1 - "Parser"
Cohesion: 0.06
Nodes (47): Comandi, Come controllare il lavoro, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole, Account, Aggiungere un simbolo (+39 more)

### Community 2 - "main.ts"
Cohesion: 0.05
Nodes (83): addToGraphBlock(), graphsFromFile(), unhide(), account, active, app, applyAccountChange(), applySpellcheck() (+75 more)

### Community 3 - "odesolve.ts"
Cohesion: 0.08
Nodes (84): linearIn(), termTransform(), addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled() (+76 more)

### Community 4 - "sync.ts"
Cohesion: 0.05
Nodes (38): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+30 more)

### Community 5 - "spec.ts"
Cohesion: 0.06
Nodes (83): Dove sono le cose, conicItems(), isConicLine(), quadricEquation(), isFourierLine(), isComplexLine(), isTestLine(), isNumericalLine() (+75 more)

### Community 6 - "arithmetic.ts"
Cohesion: 0.10
Nodes (46): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+38 more)

### Community 7 - "num"
Cohesion: 0.14
Nodes (75): withoutAbs(), polyEx(), squareRoot(), algebraic(), bigGcd(), byParts(), candidates(), canon() (+67 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (44): addLabel(), boxes, cameras, complexCoord(), coord(), drawings, drawnViews, endTex() (+36 more)

### Community 9 - "schema/editor.ts"
Cohesion: 0.04
Nodes (72): alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ARROW_NAMES, AT_ICONS (+64 more)

### Community 10 - "symbolic.ts"
Cohesion: 0.07
Nodes (63): primitive(), verified(), atValues(), combine(), commonMonomial(), Converter, coordinates(), decimalText() (+55 more)

### Community 11 - "settings.ts"
Cohesion: 0.11
Nodes (25): addPersonalWord(), DICTIONARY_KEY, loadPersonalWords(), savePersonalWords(), tidy(), ACCOUNT_SETTINGS, accountSettings(), AI_MODELS (+17 more)

### Community 12 - "svg.ts"
Cohesion: 0.07
Nodes (65): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), staticGraphSvg(), chooseWindow(), chooseY(), clipLines() (+57 more)

### Community 13 - "linsys.ts"
Cohesion: 0.16
Nodes (34): choices(), minorsGcd(), ONE, parametricRows(), parametricSystem(), PARAMS, polyDeterminant(), substitute() (+26 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.09
Nodes (10): SchemaEditor, cellText(), edgeLook(), nodeLook(), nodeStyle(), readSchema(), restyle(), EdgeLook (+2 more)

### Community 15 - "editor/lists.ts"
Cohesion: 0.18
Nodes (30): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+22 more)

### Community 16 - "graph/space.ts"
Cohesion: 0.12
Nodes (50): sampleRegion(), addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon() (+42 more)

### Community 17 - "compile"
Cohesion: 0.08
Nodes (48): criticalLine(), named(), severalItems(), surface(), argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS (+40 more)

### Community 18 - "MathError"
Cohesion: 0.13
Nodes (47): MathError, bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial() (+39 more)

### Community 19 - "FoldersStore"
Cohesion: 0.08
Nodes (17): Deletion, DeletionLog, cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder() (+9 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (41): b, bigops, c, calculus, fn, fr, fractions, functions (+33 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "Rational"
Cohesion: 0.11
Nodes (23): Part, expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactFunction, ExactRandom (+15 more)

### Community 23 - "conics.ts"
Cohesion: 0.18
Nodes (28): at(), centralCanonical(), coneCanonical(), ConicElements, ConicInfo, conicOf(), det2(), det3() (+20 more)

### Community 24 - "several.ts"
Cohesion: 0.15
Nodes (35): fractionNear(), at(), bounded(), Candidate, candidates(), compiled(), COORDS, coordShown() (+27 more)

### Community 25 - "linear.ts"
Cohesion: 0.14
Nodes (45): angleBetween(), asMatrix(), basisOf(), cross(), Ctx, dataOf(), determinant(), dims() (+37 more)

### Community 26 - "h"
Cohesion: 0.06
Nodes (39): SyncStatus, viewSwitch, AccountButton, confirmAccountDeletion(), messageOf(), openAccountDialog(), openLoginDialog(), codeStep() (+31 more)

### Community 27 - "assistant.ts"
Cohesion: 0.13
Nodes (19): AiAnswer, AiError, AiSettings, ANSWER_SCHEMA, askAi(), askThroughHost(), checkShape(), stripDelimiters() (+11 more)

### Community 28 - "spell.test.ts"
Cohesion: 0.08
Nodes (24): @codemirror/commands, @codemirror/lang-markdown, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close() (+16 more)

### Community 29 - "fake-supabase.mjs"
Cohesion: 0.25
Nodes (6): @electric-sql/pglite, b64(), CODE, GOOGLE_CODE, ROOT, SUPABASE_URL

### Community 30 - "sheet.ts"
Cohesion: 0.07
Nodes (48): formatGauss(), OdeFunction, expSumValue(), formatRational(), Eigenvalue, eigenvectors(), EXACT, FLOAT (+40 more)

### Community 31 - "view3d.ts"
Cohesion: 0.09
Nodes (36): Detail, Face, FAST, FINE, planeTolerance(), GRAPH_WORK, Plane, Vec3 (+28 more)

### Community 32 - "distributions.ts"
Cohesion: 0.15
Nodes (30): choose(), continuousQuantile(), discreteQuantile(), factorialBig(), FAMILIES, Family, integerParam(), integerRange() (+22 more)

### Community 33 - "markdown.ts"
Cohesion: 0.13
Nodes (24): lineDepth(), parseBlockMath(), configurePurify(), createMarkdownIt(), FORBIDDEN_TAGS, HLJS_LANGUAGES, mathBlockRule(), mathInlineRule() (+16 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "MathNode"
Cohesion: 0.06
Nodes (47): GaussLine, Definition, Line, ExactComplexScope, Ode, OdeSystem, withWorkLimit(), FiniteContext (+39 more)

### Community 36 - "graphNote.test.ts"
Cohesion: 0.07
Nodes (37): @codemirror/state, @lezer/common, acceptCalcResult(), calcPlugin, CalcResult, calcResults(), formulasUntil(), insertResult() (+29 more)

### Community 37 - "namesIn"
Cohesion: 0.13
Nodes (36): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+28 more)

### Community 38 - "gauss.ts"
Cohesion: 0.10
Nodes (33): COMPLEX_FUNCTIONS, farthest(), gaussItem(), hasExponential(), inZ(), isComplexValue(), isInequality(), isSegmentNode() (+25 more)

### Community 39 - "resize.ts"
Cohesion: 0.13
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "statsShown.ts"
Cohesion: 0.17
Nodes (31): check(), correlation(), count(), covariance(), Data, dataStatistic(), deviation(), fail() (+23 more)

### Community 41 - "scopeWith"
Cohesion: 0.09
Nodes (48): constantIntegrand(), depth(), inequalityMargin(), integralRegion, LayeredSolid, Multiple, planeMargin(), PlanePart (+40 more)

### Community 42 - "NotesStore"
Cohesion: 0.10
Nodes (27): accountSpace(), adoptGuestNotes(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf(), setCurrentAccount() (+19 more)

### Community 43 - "study.ts"
Cohesion: 0.16
Nodes (32): limit(), Asymptote, compiled(), cutsOf(), defined(), domainOf(), exact(), inDomain() (+24 more)

### Community 44 - "parseSchema"
Cohesion: 0.12
Nodes (21): base64(), hide(), OPEN, schemasForFile(), schemasFromFile(), unhide(), crc32(), svgSize() (+13 more)

### Community 45 - "supabase.ts"
Cohesion: 0.11
Nodes (36): @supabase/supabase-js, AUTH_STORAGE_KEY, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken() (+28 more)

### Community 46 - "probability.ts"
Cohesion: 0.17
Nodes (21): compileCondition(), RelOp, ALL, complement(), endAt(), eventSet(), FLIP, intersect() (+13 more)

### Community 47 - "complex.ts"
Cohesion: 0.09
Nodes (35): add(), asin(), atan(), compileFunction(), ComplexCompiled, ComplexVars, conjugateOf(), cos() (+27 more)

### Community 48 - "parse.ts"
Cohesion: 0.07
Nodes (41): errorMessage(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, differentialInFraction() (+33 more)

### Community 49 - "editor/editor.ts"
Cohesion: 0.08
Nodes (30): description, name, private, type, version, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/language (+22 more)

### Community 50 - "openShareDialog"
Cohesion: 0.10
Nodes (31): SUPABASE_KEY, SUPABASE_URL, accountDataFile(), PullResult, openShareDialog(), changeAccess(), changeCopy(), refreshChanged() (+23 more)

### Community 51 - "toLatex"
Cohesion: 0.06
Nodes (51): fourierItems(), areaFor(), condLabel(), GraphItem, isStraight(), isVectorName(), itemFor(), multipleLabel() (+43 more)

### Community 52 - "search.ts"
Cohesion: 0.17
Nodes (24): editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex() (+16 more)

### Community 53 - "laplace.ts"
Cohesion: 0.17
Nodes (29): factoredPolynomial(), Coefficients, oneFraction(), beyondPoles(), compiled(), E, exp(), fractionShown() (+21 more)

### Community 54 - "files.ts"
Cohesion: 0.27
Nodes (11): inClaudeViewer(), canWriteFilesDirectly(), FsWindow, isAbort(), MD_TYPES, OpenedFile, openMarkdownFiles(), PickerType (+3 more)

### Community 55 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "vitest"
Cohesion: 0.09
Nodes (17): @codemirror/view, vite-plugin-pwa, vitest, toggleLinePrefix(), besideSchema(), guardBlocks(), schemaBlockRanges(), schemaBlocks() (+9 more)

### Community 58 - "Field"
Cohesion: 0.12
Nodes (7): characteristicPolynomial(), eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn()

### Community 59 - "SidePanel"
Cohesion: 0.17
Nodes (10): katex, cache, cleanKatexError(), renderTex(), renderTexOrError(), renderTexWithResult(), TexRender, displayCode() (+2 more)

### Community 60 - "graph.ts"
Cohesion: 0.06
Nodes (38): @maxgraph/core, AT_X, cellHtml(), COMPASS, createEdgeCell(), createGraph(), drawSchema(), edgeStyle() (+30 more)

### Community 61 - "dependencies"
Cohesion: 0.09
Nodes (23): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+15 more)

### Community 62 - "page.ts"
Cohesion: 0.11
Nodes (20): currentAccount(), SharedNote, body, draw(), isDark(), saveButton, saveCopy(), settings (+12 more)

### Community 63 - "inference.ts"
Cohesion: 0.14
Nodes (26): chiSquareTest(), confidence(), confidenceShown(), Given, hypothesisTest(), InferenceContext, interval(), meanOf() (+18 more)

### Community 64 - "schema/preview.ts"
Cohesion: 0.16
Nodes (12): Look, Theme, draw(), drawCached(), drawn, errorHtml(), fill(), hydrateSchemas() (+4 more)

### Community 65 - "markers.ts"
Cohesion: 0.11
Nodes (36): Item, ListStyle, bullet(), bulletGroup(), childMarker(), column(), firstMarker(), label() (+28 more)

### Community 66 - ".openSql"
Cohesion: 0.47
Nodes (4): loadDialect(), downloadBlob(), downloadText(), fileNameFor()

### Community 67 - "tutorial.mjs"
Cohesion: 0.20
Nodes (6): centerOf(), clickOn(), ffmpeg, SCENES, SIZE, work

### Community 68 - "sql.ts"
Cohesion: 0.17
Nodes (18): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+10 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "smoke-test.mjs"
Cohesion: 0.29
Nodes (4): markdown-it, vite, firstVisit(), plainContext

### Community 72 - "insert.ts"
Cohesion: 0.18
Nodes (8): InsertOptions, templateInsertion(), EditorMathContext, expand(), preferredIndex(), SuggestionController, parseTemplate(), templateText()

### Community 73 - "statsGraph.ts"
Cohesion: 0.20
Nodes (14): number(), testItems(), classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX, Line (+6 more)

### Community 74 - "placeholders.ts"
Cohesion: 0.14
Nodes (12): addPlaceholders, buildDecorations(), clearAllPlaceholders(), clearPlaceholders, contains(), currentIndex(), filledMark, getPlaceholders() (+4 more)

### Community 75 - "toolbar.ts"
Cohesion: 0.11
Nodes (16): EditorCallbacks, MarkdownEditor, insertBlock(), insertTemplate(), wrapSelection(), Action, createToolbar(), insertCode() (+8 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "grafo-html.mjs"
Cohesion: 0.25
Nodes (4): graphFile, names, namesFile, root

### Community 79 - "limits.ts"
Cohesion: 0.15
Nodes (22): fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), close(), Definite (+14 more)

### Community 82 - ".int"
Cohesion: 0.18
Nodes (8): addExp(), Distribution, exactIntervalProbability(), subtractExp(), TestResult, Mat, exactSetProbability(), R()

### Community 83 - "sidePanel.ts"
Cohesion: 0.19
Nodes (13): AiResult, SuggestionItem, isConfidentAnswer(), CATEGORIES, symbolsInCategory(), cardPreviewTex(), formPreviewTex(), ParsedTemplate (+5 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.07
Nodes (27): Abbonamenti, Classico, gratis: per scrivere e controllare, Com'è andata la discussione, Come si costruisce (per dopo), Come si decide cosa far pagare, Cosa fare, in ordine, Cosa succede dietro, Cosa vede chi studia (+19 more)

### Community 91 - "createFakeSupabase"
Cohesion: 0.60
Nodes (6): createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 92 - "toNode"
Cohesion: 0.08
Nodes (46): EMPTY_SCOPE, absOf(), atIntegers(), boundsOf(), close(), definite(), fourierProblem, fourierShown() (+38 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.20
Nodes (4): device(), login(), newContext, waitFor()

### Community 98 - "formatNumber"
Cohesion: 0.14
Nodes (22): decimalSeparator(), Digits, formatNumber(), FormatOptions, fromNumber(), fromRational(), SUPERSCRIPT, writeDigits() (+14 more)

### Community 102 - "graph/file.ts"
Cohesion: 0.33
Nodes (10): graphImage(), graphImagesFor(), graphsForFile(), hide(), OPEN, areaColor(), itemColors(), markdownForFile() (+2 more)

### Community 106 - "devDependencies"
Cohesion: 0.11
Nodes (17): devDependencies, @electric-sql/pglite, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite, vite-plugin-pwa (+9 more)

## Knowledge Gaps
- **515 isolated node(s):** `Deciso`, `Com'è andata la discussione`, `La proposta dello studente (4 ottobre 2026)`, `Il parere di Claude, in breve`, `Come si decide cosa far pagare` (+510 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 688 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `sync.ts`, `spec.ts`, `num`, `schema/editor.ts`, `settings.ts`, `svg.ts`, `linsys.ts`, `editor/lists.ts`, `graph/space.ts`, `FoldersStore`, `h`, `assistant.ts`, `spell.test.ts`, `sheet.ts`, `distributions.ts`, `markdown.ts`, `MathNode`, `graphNote.test.ts`, `namesIn`, `resize.ts`, `NotesStore`, `parseSchema`, `supabase.ts`, `parse.ts`, `editor/editor.ts`, `openShareDialog`, `toLatex`, `search.ts`, `page.ts`, `markers.ts`, `sql.ts`, `toolbar.ts`, `sidePanel.ts`?**
  _High betweenness centrality (0.121) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `spec.ts` to `solve.ts`, `Parser`, `main.ts`, `odesolve.ts`, `arithmetic.ts`, `num`, `schema/editor.ts`, `symbolic.ts`, `svg.ts`, `linsys.ts`, `graph/space.ts`, `MathError`, `Rational`, `conics.ts`, `several.ts`, `linear.ts`, `h`, `sheet.ts`, `markdown.ts`, `logic.ts`, `MathNode`, `namesIn`, `gauss.ts`, `scopeWith`, `study.ts`, `supabase.ts`, `complex.ts`, `toLatex`, `finite.ts`, `graph.ts`, `inference.ts`, `schema/preview.ts`, `limits.ts`, `toNode`?**
  _High betweenness centrality (0.082) - this node is a cross-community bridge._
- **Why does `MathError` connect `MathError` to `solve.ts`, `odesolve.ts`, `spec.ts`, `num`, `symbolic.ts`, `linsys.ts`, `compile`, `linear.ts`, `sheet.ts`, `distributions.ts`, `MathNode`, `namesIn`, `gauss.ts`, `statsShown.ts`, `scopeWith`, `probability.ts`, `complex.ts`, `toLatex`, `Field`, `inference.ts`, `statsGraph.ts`, `.int`, `toNode`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **What connects `Deciso`, `Com'è andata la discussione`, `La proposta dello studente (4 ottobre 2026)` to the rest of the system?**
  _515 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Parser` be split into smaller, more focused modules?**
  _Cohesion score 0.06040152301834545 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05103785103785104 - nodes in this community are weakly interconnected._
- **Should `odesolve.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08319327731092437 - nodes in this community are weakly interconnected._