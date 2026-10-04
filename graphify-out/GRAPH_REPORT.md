# Graph Report - matherdown  (2026-10-04)

## Corpus Check
- 218 files · ~400,057 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 3479 nodes · 12719 edges · 108 communities (94 shown, 14 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 336 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ed942f48`
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
- primitive.ts
- graph/preview.ts
- schema/editor.ts
- symbolic.ts
- graph.ts
- svg.ts
- linsys.ts
- SchemaEditor
- vitest
- view3d.ts
- compile
- numerical.ts
- FoldersStore
- index.ts
- engine.ts
- Rational
- conics.ts
- toLatex
- MathError
- h
- assistant.ts
- graphNote.test.ts
- fake-supabase.mjs
- formatNumber
- graph/file.ts
- num
- markdown.ts
- logic.ts
- devDependencies
- calcResults.ts
- namesIn
- gauss.ts
- resize.ts
- sheet.ts
- scopeWith
- NotesStore
- study.ts
- parseSchema
- supabase.ts
- probability.ts
- complex.ts
- distributions.ts
- editor/editor.ts
- page.ts
- severalGraph.ts
- search.ts
- evaluateExactComplex
- files.ts
- finite.ts
- 20261004091555_note_condivise.sql
- insert.ts
- Field
- SidePanel
- .paintVertexShape
- dependencies
- schema/preview.ts
- database.ts
- integrate
- editor/lists.ts
- SuggestionController
- tutorial.mjs
- templates.ts
- Benvenuto in Glifo
- compilerOptions
- smoke-test.mjs
- limits.ts
- statsGraph.ts
- editor.test.ts
- toolbar.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- logo.ts
- .folderItem
- session-start.sh
- .claude/CLAUDE.md
- Glifo
- sidePanel.ts
- fixedPoint
- spellcheck
- fourier.ts
- supabase-stub.sql
- account-test.mjs
- Più avanti
- render/lists.ts
- scripts
- Glifo – note per Claude
- latex.ts
- .openSql
- MathNode
- numericalGraph.ts
- vite.config.ts
- Il database degli account (Supabase)

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
- `Funzionalità` --references--> `k()`  [INFERRED]
  README.md → src/math/numerical.ts
- `Dove sono le cose` --references--> `sharedLinks()`  [INFERRED]
  CLAUDE.md → src/account/supabase.ts
- `Dove sono le cose` --references--> `shareNote()`  [INFERRED]
  CLAUDE.md → src/account/supabase.ts
- `Dove sono le cose` --references--> `addToGraphBlock()`  [INFERRED]
  CLAUDE.md → src/editor/graphInsert.ts
- `Dove sono le cose` --references--> `isComplexLine()`  [INFERRED]
  CLAUDE.md → src/graph/gauss.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (108 total, 14 thin omitted)

### Community 0 - "solve.ts"
Cohesion: 0.15
Nodes (27): Scope, LinearScope, isStandardUnknown(), linearSystem(), RelOp, breaks(), cubeRoot(), equation() (+19 more)

### Community 1 - "parse.ts"
Cohesion: 0.07
Nodes (44): errorMessage(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe() (+36 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (99): addToGraphBlock(), graphsForFile(), hide(), account, active, app, applyAccountChange(), applySpellcheck() (+91 more)

### Community 3 - "odesolve.ts"
Cohesion: 0.09
Nodes (63): primed(), linearIn(), termTransform(), addWave(), arrange(), cauchy(), characteristicRoots(), compiled() (+55 more)

### Community 4 - "sync.ts"
Cohesion: 0.07
Nodes (31): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+23 more)

### Community 5 - "spec.ts"
Cohesion: 0.06
Nodes (87): formulaAtCursor(), insertGraphBlock(), conicItems(), isConicLine(), quadricEquation(), fourierItems(), isFourierLine(), isComplexLine() (+79 more)

### Community 6 - "arithmetic.ts"
Cohesion: 0.07
Nodes (67): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+59 more)

### Community 7 - "primitive.ts"
Cohesion: 0.17
Nodes (57): algebraic(), bigGcd(), byParts(), candidates(), canon(), combineLogs(), compareKeys(), exponentials() (+49 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (46): addLabel(), boxes, cameras, complexCoord(), coord(), drawings, drawnViews, endTex() (+38 more)

### Community 9 - "schema/editor.ts"
Cohesion: 0.05
Nodes (61): alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ARROW_NAMES, AT_ICONS (+53 more)

### Community 10 - "symbolic.ts"
Cohesion: 0.07
Nodes (59): EMPTY_SCOPE, primitive(), verified(), atValues(), cancelLinear(), combine(), Converter, coordinates() (+51 more)

### Community 11 - "graph.ts"
Cohesion: 0.07
Nodes (36): @maxgraph/core, fieldInput(), textWidth(), AT_X, cellHtml(), cellText(), COMPASS, createEdgeCell() (+28 more)

### Community 12 - "svg.ts"
Cohesion: 0.10
Nodes (49): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), domainEdge(), features() (+41 more)

### Community 13 - "linsys.ts"
Cohesion: 0.14
Nodes (41): factorsOf(), choices(), gcd(), matrixEquation(), matrixSystem(), minorsGcd(), ONE, parametricRows() (+33 more)

### Community 15 - "vitest"
Cohesion: 0.08
Nodes (32): vitest, staticGraphSvg(), chooseWindow(), chooseBox(), GraphItem, parseGraph(), graphSvg(), PALETTES (+24 more)

### Community 16 - "view3d.ts"
Cohesion: 0.08
Nodes (67): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+59 more)

### Community 17 - "compile"
Cohesion: 0.10
Nodes (32): Interval, binomial(), compile(), compileApply(), compileDerivative(), compileFunction(), compileRandomFunction(), Condition (+24 more)

### Community 18 - "numerical.ts"
Cohesion: 0.12
Nodes (32): cholesky(), condition(), exactPolynomial(), floatPolynomial(), interpolating(), interpolation(), inverseOf(), iterative() (+24 more)

### Community 19 - "FoldersStore"
Cohesion: 0.17
Nodes (3): cleanFolderName(), FoldersStore, sameName()

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (41): b, bigops, c, calculus, fn, fr, fractions, functions (+33 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (22): Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download(), fetchDictionary() (+14 more)

### Community 22 - "Rational"
Cohesion: 0.10
Nodes (24): Part, expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactFunction, ExactRandom (+16 more)

### Community 23 - "conics.ts"
Cohesion: 0.21
Nodes (27): at(), centralCanonical(), Coefficients, coneCanonical(), conicOf(), det2(), det3(), determinant() (+19 more)

### Community 24 - "toLatex"
Cohesion: 0.11
Nodes (52): factorShown(), homogeneousParts(), numShown(), sumShown(), shown(), toLatex(), exText(), convergesAt() (+44 more)

### Community 25 - "MathError"
Cohesion: 0.14
Nodes (50): MathError, angleBetween(), asMatrix(), basisOf(), cross(), Ctx, dataOf(), determinant() (+42 more)

### Community 26 - "h"
Cohesion: 0.07
Nodes (45): SyncStatus, helpButton, openGuide(), viewSwitch, openSignedOut(), printButton(), ShareDialogDeps, Settings (+37 more)

### Community 27 - "assistant.ts"
Cohesion: 0.13
Nodes (20): katex, AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askThroughHost() (+12 more)

### Community 28 - "graphNote.test.ts"
Cohesion: 0.10
Nodes (24): @codemirror/lang-markdown, @codemirror/state, mathMarkdown, misspelledMark, refreshSpelling, setTarget, SKIP, SpellTarget (+16 more)

### Community 29 - "fake-supabase.mjs"
Cohesion: 0.22
Nodes (11): b64(), CODE, createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom() (+3 more)

### Community 30 - "formatNumber"
Cohesion: 0.08
Nodes (47): formatGauss(), decimalSeparator(), Digits, formatNumber(), FormatOptions, formatRational(), fromNumber(), fromRational() (+39 more)

### Community 31 - "graph/file.ts"
Cohesion: 0.12
Nodes (23): graphImage(), graphImagesFor(), graphsFromFile(), OPEN, unhide(), tickLabel(), Vec3, areaColor() (+15 more)

### Community 32 - "num"
Cohesion: 0.14
Nodes (50): monomial(), atIntegers(), exp(), hyperbolicToExp(), inverseRational(), sqrtEx(), polyEx(), bernoulliFamily() (+42 more)

### Community 33 - "markdown.ts"
Cohesion: 0.12
Nodes (26): lineDepth(), parseBlockMath(), configurePurify(), createMarkdownIt(), FORBIDDEN_TAGS, HLJS_LANGUAGES, mathBlockRule(), mathInlineRule() (+18 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "devDependencies"
Cohesion: 0.22
Nodes (9): devDependencies, @electric-sql/pglite, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite, vite-plugin-pwa (+1 more)

### Community 36 - "calcResults.ts"
Cohesion: 0.17
Nodes (10): acceptCalcResult(), calcPlugin, CalcResult, calcResults(), formulasUntil(), insertResult(), ResultWidget, sheetBefore() (+2 more)

### Community 37 - "namesIn"
Cohesion: 0.14
Nodes (34): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+26 more)

### Community 38 - "gauss.ts"
Cohesion: 0.15
Nodes (24): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexValue(), isInequality() (+16 more)

### Community 39 - "resize.ts"
Cohesion: 0.13
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "sheet.ts"
Cohesion: 0.12
Nodes (42): expSumValue(), Lin, CHECK_VALUES, INFERENCE, parsed, SPACES, STATISTICS, STUDY (+34 more)

### Community 41 - "scopeWith"
Cohesion: 0.10
Nodes (47): constantIntegrand(), inequalityMargin(), integralRegion, LayeredSolid, planeMargin(), planeParts(), radiusOf(), spaceLayers() (+39 more)

### Community 42 - "NotesStore"
Cohesion: 0.07
Nodes (41): accountSpace(), adoptGuestNotes(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf(), setCurrentAccount() (+33 more)

### Community 43 - "study.ts"
Cohesion: 0.14
Nodes (36): names(), STUDY_GRAPH, studyItems(), nameLatex(), limit(), Asymptote, compiled(), cutsOf() (+28 more)

### Community 44 - "parseSchema"
Cohesion: 0.13
Nodes (20): base64(), hide(), OPEN, schemasForFile(), schemasFromFile(), unhide(), crc32(), svgSize() (+12 more)

### Community 45 - "supabase.ts"
Cohesion: 0.09
Nodes (41): @supabase/supabase-js, AUTH_STORAGE_KEY, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken() (+33 more)

### Community 46 - "probability.ts"
Cohesion: 0.13
Nodes (25): End, compare(), compileCondition(), CompileOptions, fractionNear(), ALL, compileOf(), complement() (+17 more)

### Community 47 - "complex.ts"
Cohesion: 0.10
Nodes (26): ComplexDefinitions, add(), arg(), complex, ComplexCompiled, ComplexFunction, cos(), cosh() (+18 more)

### Community 48 - "distributions.ts"
Cohesion: 0.07
Nodes (61): addExp(), choose(), continuousQuantile(), discreteQuantile(), Distribution, exactIntervalProbability(), factorialBig(), FAMILIES (+53 more)

### Community 49 - "editor/editor.ts"
Cohesion: 0.07
Nodes (34): description, name, private, type, version, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands (+26 more)

### Community 50 - "page.ts"
Cohesion: 0.07
Nodes (44): SUPABASE_KEY, SUPABASE_URL, accountDataFile(), currentAccount(), PullResult, openShareDialog(), changeAccess(), changeCopy() (+36 more)

### Community 51 - "severalGraph.ts"
Cohesion: 0.40
Nodes (9): criticalLine(), isSeveralLine(), named(), severalItems(), surface(), bounded(), extremaOf(), optimumOf() (+1 more)

### Community 52 - "search.ts"
Cohesion: 0.19
Nodes (21): editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex() (+13 more)

### Community 53 - "evaluateExactComplex"
Cohesion: 0.21
Nodes (14): asin(), atan(), compileFunction(), evaluateExactComplex(), exactSqrt(), GaussRational, log(), pow() (+6 more)

### Community 54 - "files.ts"
Cohesion: 0.15
Nodes (18): cache, capability(), ClaudeRuntime, hostDownloads, HostError, inClaudeViewer(), ModelTier, runtime() (+10 more)

### Community 55 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "insert.ts"
Cohesion: 0.12
Nodes (17): @codemirror/view, InsertOptions, toggleLinePrefix(), LIST_STYLES, addPlaceholders, Placeholder, besideSchema(), guardBlocks() (+9 more)

### Community 58 - "Field"
Cohesion: 0.12
Nodes (7): eigenvalues(), eigenvectors(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn()

### Community 59 - "SidePanel"
Cohesion: 0.21
Nodes (5): isConfidentAnswer(), symbolsInCategory(), displayCode(), preventFocusSteal(), SidePanel

### Community 60 - ".paintVertexShape"
Cohesion: 0.15
Nodes (5): DotShape, IdentifyingRelationShape, NoteShape, TableShape, WeakEntityShape

### Community 61 - "dependencies"
Cohesion: 0.09
Nodes (23): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+15 more)

### Community 62 - "schema/preview.ts"
Cohesion: 0.15
Nodes (13): GraphLook, Look, Theme, draw(), drawCached(), drawn, errorHtml(), fill() (+5 more)

### Community 63 - "database.ts"
Cohesion: 0.24
Nodes (6): @electric-sql/pglite, createDatabase(), createUser(), databaseTests(), migrations, shareTests()

### Community 64 - "integrate"
Cohesion: 0.19
Nodes (19): argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot(), fieldOn(), numericPartials() (+11 more)

### Community 65 - "editor/lists.ts"
Cohesion: 0.12
Nodes (48): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+40 more)

### Community 66 - "SuggestionController"
Cohesion: 0.23
Nodes (3): expand(), preferredIndex(), SuggestionController

### Community 67 - "tutorial.mjs"
Cohesion: 0.12
Nodes (10): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+2 more)

### Community 68 - "templates.ts"
Cohesion: 0.08
Nodes (33): SchemaEditorOptions, Schema, SchemaEdge, SchemaNode, Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey (+25 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "smoke-test.mjs"
Cohesion: 0.18
Nodes (6): markdown-it, playwright-core, vite, PNG_ICONS, firstVisit(), plainContext

### Community 72 - "limits.ts"
Cohesion: 0.20
Nodes (18): exponentialForm(), fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), spend() (+10 more)

### Community 73 - "statsGraph.ts"
Cohesion: 0.29
Nodes (11): number(), classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX, number(), pmfBars() (+3 more)

### Community 74 - "editor.test.ts"
Cohesion: 0.09
Nodes (25): templateInsertion(), CODE_NODES, CommandToken, commandTokenAt(), isInCode(), MATH_NODES, mathContextAt(), mathRegionAt() (+17 more)

### Community 75 - "toolbar.ts"
Cohesion: 0.10
Nodes (19): closeMathBlockOnEnter(), EditorCallbacks, MarkdownEditor, tabOutOfMath(), insertBlock(), insertTemplate(), wrapSelection(), EditorMathContext (+11 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "logo.ts"
Cohesion: 0.39
Nodes (5): BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark()

### Community 79 - ".folderItem"
Cohesion: 0.20
Nodes (4): clear(), formatDate(), NotesPanel, NotesPanelDeps

### Community 82 - "Glifo"
Cohesion: 0.15
Nodes (13): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Funzionalità (+5 more)

### Community 83 - "sidePanel.ts"
Cohesion: 0.20
Nodes (15): SuggestionItem, IndexedEntry, SearchResult, CATEGORIES, cardPreviewTex(), formPreviewTex(), ParsedTemplate, parseTemplate() (+7 more)

### Community 90 - "fixedPoint"
Cohesion: 0.35
Nodes (15): bisection(), derivative(), fixedPoint(), intervalOf(), k(), newton(), NormKind, numberShown() (+7 more)

### Community 91 - "spellcheck"
Cohesion: 0.21
Nodes (8): spellcheck(), close(), misspelledAt(), openAt(), replace(), tooltipView(), SpellChecker, SpellcheckOptions

### Community 92 - "fourier.ts"
Cohesion: 0.11
Nodes (31): absOf(), boundsOf(), close(), definite(), fourierProblem, fourierShown(), isTrig(), isZero() (+23 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.20
Nodes (4): device(), login(), newContext, waitFor()

### Community 97 - "Più avanti"
Cohesion: 0.14
Nodes (14): Abbonamento e funzioni a pagamento (da capire), Account: i propri appunti su ogni dispositivo, anche da condividere, Aiuto con gli esercizi, Altre idee, Calcoli e grafici: idee in più, Controllare e mostrare quello che si scrive, Idee per il futuro, In programma (+6 more)

### Community 98 - "render/lists.ts"
Cohesion: 0.27
Nodes (13): ListStyle, bulletGroup(), Marker, sameList(), alignInside(), asciiTrim(), findMarker(), Found (+5 more)

### Community 100 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 101 - "Glifo – note per Claude"
Cohesion: 0.20
Nodes (7): Comandi, Come controllare il lavoro, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole, sqlite()

### Community 102 - "latex.ts"
Cohesion: 0.12
Nodes (23): ACCENT_COMMANDS, COMPLEX_FUNCTIONS, diffLatex(), DISTRIBUTION_LATEX, distributionLatex(), domainLatex(), fnLatex(), fnName() (+15 more)

### Community 103 - ".openSql"
Cohesion: 0.38
Nodes (5): loadDialect(), schemaImage(), downloadBlob(), downloadText(), fileNameFor()

### Community 104 - "MathNode"
Cohesion: 0.06
Nodes (53): Dove sono le cose, Definition, Line, Line, ExactComplexScope, ConicElements, ConicInfo, Ode (+45 more)

### Community 105 - "numericalGraph.ts"
Cohesion: 0.80
Nodes (4): isNumericalLine(), numericalItems(), isPlottedNumerical(), numericalPlot()

### Community 107 - "Il database degli account (Supabase)"
Cohesion: 0.17
Nodes (11): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Nell'app, Note condivise con un link (+3 more)

## Knowledge Gaps
- **491 isolated node(s):** `Comandi`, `Promemoria per lo studente`, `Regole`, `graphify`, `Condividere una nota con un link` (+486 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 665 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `parse.ts`, `main.ts`, `sync.ts`, `schema/editor.ts`, `linsys.ts`, `toLatex`, `MathError`, `h`, `assistant.ts`, `graphNote.test.ts`, `num`, `markdown.ts`, `resize.ts`, `NotesStore`, `parseSchema`, `supabase.ts`, `distributions.ts`, `editor/editor.ts`, `page.ts`, `search.ts`, `insert.ts`, `database.ts`, `editor/lists.ts`, `templates.ts`, `editor.test.ts`, `logo.ts`, `sidePanel.ts`, `MathNode`, `vite.config.ts`?**
  _High betweenness centrality (0.120) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `MathNode` to `parse.ts`, `main.ts`, `odesolve.ts`, `spec.ts`, `arithmetic.ts`, `primitive.ts`, `graph/preview.ts`, `schema/editor.ts`, `symbolic.ts`, `graph.ts`, `svg.ts`, `linsys.ts`, `view3d.ts`, `compile`, `numerical.ts`, `toLatex`, `MathError`, `h`, `num`, `markdown.ts`, `logic.ts`, `namesIn`, `gauss.ts`, `sheet.ts`, `study.ts`, `supabase.ts`, `distributions.ts`, `severalGraph.ts`, `evaluateExactComplex`, `finite.ts`, `schema/preview.ts`, `limits.ts`, `fourier.ts`, `Glifo – note per Claude`, `numericalGraph.ts`?**
  _High betweenness centrality (0.076) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `main.ts`, `.openSql`, `resize.ts`, `schema/editor.ts`, `NotesStore`, `graph.ts`, `SidePanel`, `toolbar.ts`, `SchemaEditor`, `.folderItem`, `page.ts`, `sidePanel.ts`, `spellcheck`, `graphNote.test.ts`, `schema/preview.ts`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **What connects `Comandi`, `Promemoria per lo studente`, `Regole` to the rest of the system?**
  _491 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `solve.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1471264367816092 - nodes in this community are weakly interconnected._
- **Should `parse.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07132188200149366 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04307944307944308 - nodes in this community are weakly interconnected._