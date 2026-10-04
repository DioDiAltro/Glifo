# Graph Report - matherdown  (2026-10-04)

## Corpus Check
- 215 files · ~389,852 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 3414 nodes · 12440 edges · 95 communities (81 shown, 14 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 325 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `bbcd427d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- formatNumber
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
- dialogs.ts
- svg.ts
- linsys.ts
- SchemaEditor
- toLatex
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
- settings.ts
- assistant.ts
- numericalGraph.ts
- account-test.mjs
- spaces.ts
- view3d.ts
- toNode
- markdown.ts
- logic.ts
- package.json
- editor.test.ts
- Dove sono le cose
- h
- resize.ts
- sheet.ts
- graph/file.ts
- NotesStore
- study.ts
- graph.ts
- supabase.ts
- probability.ts
- complex.ts
- distributions.ts
- MarkdownEditor
- page.ts
- editor/editor.ts
- search.ts
- editor/lists.ts
- solve.ts
- finite.ts
- 20261004091555_note_condivise.sql
- toolbar.ts
- Field
- sidePanel.ts
- shapes.ts
- dependencies
- schema/preview.ts
- MathNode
- inference.ts
- laplace.ts
- fixedPoint
- Distribution
- sql.ts
- Benvenuto in Glifo
- compilerOptions
- severalGraph.ts
- spellcheck
- statsGraph.ts
- Glifo
- Il database degli account (Supabase)
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- parseSchema
- Glifo – note per Claude
- session-start.sh
- .claude/CLAUDE.md
- Più avanti
- linear.test.ts
- FormatOptions
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
- `Funzionalità` --references--> `k()`  [INFERRED]
  README.md → src/math/numerical.ts
- `Dove sono le cose` --references--> `shareNote()`  [INFERRED]
  CLAUDE.md → src/account/supabase.ts
- `Dove sono le cose` --references--> `sharedLinks()`  [INFERRED]
  CLAUDE.md → src/account/supabase.ts
- `Dove sono le cose` --references--> `addToGraphBlock()`  [INFERRED]
  CLAUDE.md → src/editor/graphInsert.ts
- `Dove sono le cose` --references--> `sampleArea()`  [INFERRED]
  CLAUDE.md → src/graph/plot.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (95 total, 14 thin omitted)

### Community 0 - "formatNumber"
Cohesion: 0.13
Nodes (25): exponentialForm(), fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), decimalSeparator() (+17 more)

### Community 1 - "parse.ts"
Cohesion: 0.08
Nodes (39): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe(), differentialInFraction() (+31 more)

### Community 2 - "main.ts"
Cohesion: 0.07
Nodes (63): addToGraphBlock(), account, active, app, applyAccountChange(), applyTheme(), backdrop, changedHere() (+55 more)

### Community 3 - "odesolve.ts"
Cohesion: 0.08
Nodes (78): addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames(), constantParticular() (+70 more)

### Community 4 - "sync.ts"
Cohesion: 0.05
Nodes (38): @electric-sql/pglite, AccountSync, withLock(), Account, EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+30 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (99): quadricEquation(), onlyComplex(), constantIntegrand(), depth(), inequalityMargin(), Multiple, multipleOf(), planeMargin() (+91 more)

### Community 6 - "arithmetic.ts"
Cohesion: 0.10
Nodes (50): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+42 more)

### Community 7 - "num"
Cohesion: 0.16
Nodes (72): atIntegers(), withoutAbs(), exp(), hyperbolicToExp(), inverseRational(), sqrtEx(), termTransform(), polyEx() (+64 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (45): addLabel(), boxes, cameras, complexCoord(), coord(), drawings, drawnViews, endTex() (+37 more)

### Community 9 - "schema/editor.ts"
Cohesion: 0.04
Nodes (74): alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ARROW_NAMES, AT_ICONS (+66 more)

### Community 10 - "symbolic.ts"
Cohesion: 0.07
Nodes (60): linearIn(), verified(), atValues(), combine(), commonMonomial(), Converter, coordinates(), decimalText() (+52 more)

### Community 11 - "dialogs.ts"
Cohesion: 0.08
Nodes (35): SyncStatus, inClaudeViewer(), canWriteFilesDirectly(), downloadText(), FsWindow, isAbort(), MD_TYPES, OpenedFile (+27 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (53): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), domainEdge(), features() (+45 more)

### Community 13 - "linsys.ts"
Cohesion: 0.14
Nodes (42): choices(), gcd(), matrixEquation(), matrixSystem(), minorsGcd(), ONE, parametricRows(), parametricSystem() (+34 more)

### Community 15 - "toLatex"
Cohesion: 0.05
Nodes (55): vitest, fourierItems(), isFourierLine(), formulaGraph(), GraphItem, parseGraph(), partialSum(), ACCENT_COMMANDS (+47 more)

### Community 16 - "graph/space.ts"
Cohesion: 0.13
Nodes (48): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+40 more)

### Community 17 - "compile"
Cohesion: 0.05
Nodes (90): conicItems(), isConicLine(), integralRegion, LayeredSolid, areaFor(), constantValue(), argumentOrder(), compileLineIntegral() (+82 more)

### Community 18 - "numerical.ts"
Cohesion: 0.14
Nodes (30): cholesky(), condition(), exactPolynomial(), floatPolynomial(), interpolating(), interpolation(), inverseOf(), iterative() (+22 more)

### Community 19 - "FoldersStore"
Cohesion: 0.08
Nodes (15): Deletion, DeletionLog, cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder() (+7 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (42): b, bigops, c, calculus, fn, fr, fractions, functions (+34 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "Rational"
Cohesion: 0.11
Nodes (20): expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactRandom, exactRoot(), factorialExact() (+12 more)

### Community 23 - "conics.ts"
Cohesion: 0.19
Nodes (28): at(), centralCanonical(), Coefficients, coneCanonical(), ConicInfo, conicOf(), det2(), det3() (+20 more)

### Community 24 - "several.ts"
Cohesion: 0.15
Nodes (35): severalLimit, at(), bounded(), Candidate, candidates(), compiled(), COORDS, coordShown() (+27 more)

### Community 25 - "MathError"
Cohesion: 0.12
Nodes (57): MathError, angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, dataOf() (+49 more)

### Community 26 - "settings.ts"
Cohesion: 0.12
Nodes (27): applySpellcheck(), backup(), openSettings(), setPersonalWords(), updateSettings(), wordsChangedHere(), addPersonalWord(), loadPersonalWords() (+19 more)

### Community 27 - "assistant.ts"
Cohesion: 0.10
Nodes (21): @anthropic-ai/sdk, AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askThroughHost() (+13 more)

### Community 28 - "numericalGraph.ts"
Cohesion: 0.80
Nodes (4): isNumericalLine(), numericalItems(), isPlottedNumerical(), numericalPlot()

### Community 29 - "account-test.mjs"
Cohesion: 0.06
Nodes (22): login(), waitFor(), b64(), CODE, createFakeSupabase(), handle(), rpc(), session() (+14 more)

### Community 30 - "spaces.ts"
Cohesion: 0.17
Nodes (21): formatRational(), Eigenvalue, LinearValue, surdText(), cartesianEquations(), Cell, coordinateNames(), diagonalize() (+13 more)

### Community 31 - "view3d.ts"
Cohesion: 0.09
Nodes (36): Detail, Face, FAST, FINE, planeTolerance(), GRAPH_WORK, Plane, Vec3 (+28 more)

### Community 32 - "toNode"
Cohesion: 0.09
Nodes (40): EMPTY_SCOPE, absOf(), boundsOf(), close(), definite(), fourierProblem, fourierShown(), isTrig() (+32 more)

### Community 33 - "markdown.ts"
Cohesion: 0.09
Nodes (38): lineDepth(), parseBlockMath(), bulletGroup(), sameList(), renderTexOrError(), renderTexWithResult(), alignInside(), asciiTrim() (+30 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "package.json"
Cohesion: 0.05
Nodes (40): description, devDependencies, @electric-sql/pglite, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+32 more)

### Community 36 - "editor.test.ts"
Cohesion: 0.06
Nodes (39): @codemirror/lang-markdown, @codemirror/state, templateInsertion(), mathMarkdown, addPlaceholders, buildDecorations(), clearAllPlaceholders(), clearPlaceholders (+31 more)

### Community 37 - "Dove sono le cose"
Cohesion: 0.12
Nodes (39): Dove sono le cose, bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel() (+31 more)

### Community 38 - "h"
Cohesion: 0.15
Nodes (12): saveClosedFolders(), append(), Child, clear(), formatDate(), h(), icon(), Props (+4 more)

### Community 39 - "resize.ts"
Cohesion: 0.13
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "sheet.ts"
Cohesion: 0.11
Nodes (44): OdeFunction, ExactFunction, characteristicPolynomial(), Lin, NUMERICAL, Definition, INFERENCE, parsed (+36 more)

### Community 41 - "graph/file.ts"
Cohesion: 0.13
Nodes (23): graphImage(), graphImagesFor(), graphsForFile(), graphsFromFile(), hide(), OPEN, unhide(), staticGraphSvg() (+15 more)

### Community 42 - "NotesStore"
Cohesion: 0.10
Nodes (23): accountSpace(), adoptGuestNotes(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf(), setCurrentAccount() (+15 more)

### Community 43 - "study.ts"
Cohesion: 0.17
Nodes (32): nameLatex(), limit(), Asymptote, compiled(), cutsOf(), defined(), domainOf(), exact() (+24 more)

### Community 44 - "graph.ts"
Cohesion: 0.10
Nodes (32): AT_X, cellHtml(), cellText(), COMPASS, createEdgeCell(), createGraph(), drawSchema(), edgeLook() (+24 more)

### Community 45 - "supabase.ts"
Cohesion: 0.11
Nodes (35): @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken(), ensureSessionOf() (+27 more)

### Community 46 - "probability.ts"
Cohesion: 0.12
Nodes (24): End, Family, CompileOptions, ExactScope, rejection(), fractionNear(), ALL, complement() (+16 more)

### Community 47 - "complex.ts"
Cohesion: 0.06
Nodes (65): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexValue(), isInequality() (+57 more)

### Community 48 - "distributions.ts"
Cohesion: 0.16
Nodes (28): choose(), continuousQuantile(), discreteQuantile(), expSumValue(), factorialBig(), FAMILIES, integerParam(), invalid() (+20 more)

### Community 49 - "MarkdownEditor"
Cohesion: 0.12
Nodes (7): closeMathBlockOnEnter(), EditorCallbacks, MarkdownEditor, insertTemplate(), EditorMathContext, SuggestionController, SidePanelDeps

### Community 50 - "page.ts"
Cohesion: 0.06
Nodes (49): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), currentAccount(), PullResult, openShareDialog(), changeAccess() (+41 more)

### Community 51 - "editor/editor.ts"
Cohesion: 0.06
Nodes (41): @codemirror/commands, @codemirror/language, @codemirror/view, @lezer/common, acceptCalcResult(), calcPlugin, CalcResult, calcResults() (+33 more)

### Community 52 - "search.ts"
Cohesion: 0.17
Nodes (24): editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex() (+16 more)

### Community 53 - "editor/lists.ts"
Cohesion: 0.10
Nodes (56): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+48 more)

### Community 54 - "solve.ts"
Cohesion: 0.17
Nodes (25): splitRoot(), isStandardUnknown(), linearSystem(), RelOp, breaks(), cubeRoot(), equation(), holds() (+17 more)

### Community 55 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "toolbar.ts"
Cohesion: 0.10
Nodes (20): insertBlock(), InsertOptions, toggleLinePrefix(), wrapSelection(), LIST_STYLES, guardBlocks(), schemaBlocks(), SchemaWidget (+12 more)

### Community 58 - "Field"
Cohesion: 0.12
Nodes (6): eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn()

### Community 59 - "sidePanel.ts"
Cohesion: 0.11
Nodes (23): katex, expand(), preferredIndex(), SuggestionItem, cache, cleanKatexError(), renderTex(), TexRender (+15 more)

### Community 60 - "shapes.ts"
Cohesion: 0.09
Nodes (15): @maxgraph/core, ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape (+7 more)

### Community 61 - "dependencies"
Cohesion: 0.09
Nodes (23): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+15 more)

### Community 62 - "schema/preview.ts"
Cohesion: 0.16
Nodes (12): Look, Theme, draw(), drawCached(), drawn, errorHtml(), fill(), hydrateSchemas() (+4 more)

### Community 63 - "MathNode"
Cohesion: 0.09
Nodes (29): ExactComplexScope, Ode, withWorkLimit(), FiniteContext, FormattedResult, differentialRequest, pieces(), MathNode (+21 more)

### Community 64 - "inference.ts"
Cohesion: 0.19
Nodes (22): confidence(), confidenceShown(), Given, hypothesisTest(), interval(), meanOf(), nameOf(), num() (+14 more)

### Community 65 - "laplace.ts"
Cohesion: 0.19
Nodes (25): factoredPolynomial(), oneFraction(), beyondPoles(), compiled(), E, fractionShown(), HALF, inverseLaplaceShown() (+17 more)

### Community 66 - "fixedPoint"
Cohesion: 0.35
Nodes (15): bisection(), derivative(), fixedPoint(), intervalOf(), k(), newton(), NormKind, numberShown() (+7 more)

### Community 67 - "Distribution"
Cohesion: 0.16
Nodes (10): addExp(), Distribution, exactIntervalProbability(), integerRange(), intervalProbability(), subtractExp(), pValue(), TestResult (+2 more)

### Community 68 - "sql.ts"
Cohesion: 0.14
Nodes (20): loadDialect(), Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote() (+12 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "severalGraph.ts"
Cohesion: 0.20
Nodes (16): FieldContext, criticalLine(), isSeveralLine(), named(), severalItems(), surface(), names(), STUDY_GRAPH (+8 more)

### Community 72 - "spellcheck"
Cohesion: 0.21
Nodes (8): spellcheck(), close(), misspelledAt(), openAt(), replace(), tooltipView(), SpellChecker, SpellcheckOptions

### Community 73 - "statsGraph.ts"
Cohesion: 0.16
Nodes (17): isTestLine(), number(), testItems(), classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX (+9 more)

### Community 74 - "Glifo"
Cohesion: 0.15
Nodes (13): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Funzionalità (+5 more)

### Community 75 - "Il database degli account (Supabase)"
Cohesion: 0.17
Nodes (11): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Nell'app, Note condivise con un link (+3 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "parseSchema"
Cohesion: 0.11
Nodes (25): findSchemaBlock(), findSchemaBlocks(), OpenFence, SchemaBlock, schemaBlockAtLine(), schemaBlockText(), SchemaEditorOptions, base64() (+17 more)

### Community 79 - "Glifo – note per Claude"
Cohesion: 0.20
Nodes (7): Comandi, Come controllare il lavoro, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole, sqlite()

### Community 82 - "Più avanti"
Cohesion: 0.14
Nodes (14): Abbonamento e funzioni a pagamento (da capire), Account: i propri appunti su ogni dispositivo, anche da condividere, Aiuto con gli esercizi, Altre idee, Calcoli e grafici: idee in più, Controllare e mostrare quello che si scrive, Idee per il futuro, In programma (+6 more)

### Community 83 - "linear.test.ts"
Cohesion: 0.29
Nodes (7): EXACT, FLOAT, A, B, q(), result(), text()

## Knowledge Gaps
- **478 isolated node(s):** `session-start.sh script`, `name`, `private`, `version`, `description` (+473 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 650 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `toLatex` to `sync.ts`, `num`, `schema/editor.ts`, `svg.ts`, `graph/space.ts`, `compile`, `FoldersStore`, `settings.ts`, `assistant.ts`, `account-test.mjs`, `markdown.ts`, `package.json`, `editor.test.ts`, `resize.ts`, `graph/file.ts`, `NotesStore`, `supabase.ts`, `distributions.ts`, `page.ts`, `editor/editor.ts`, `search.ts`, `editor/lists.ts`, `toolbar.ts`, `sidePanel.ts`, `MathNode`, `sql.ts`, `parseSchema`, `linear.test.ts`?**
  _High betweenness centrality (0.097) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `Dove sono le cose` to `formatNumber`, `parse.ts`, `main.ts`, `odesolve.ts`, `spec.ts`, `arithmetic.ts`, `graph/preview.ts`, `schema/editor.ts`, `symbolic.ts`, `svg.ts`, `linsys.ts`, `toLatex`, `graph/space.ts`, `compile`, `numerical.ts`, `Rational`, `several.ts`, `MathError`, `numericalGraph.ts`, `toNode`, `markdown.ts`, `logic.ts`, `study.ts`, `supabase.ts`, `complex.ts`, `finite.ts`, `schema/preview.ts`, `MathNode`, `inference.ts`, `statsGraph.ts`, `Glifo – note per Claude`, `FormatOptions`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `main.ts`, `editor.test.ts`, `sql.ts`, `resize.ts`, `spellcheck`, `schema/editor.ts`, `dialogs.ts`, `SchemaEditor`, `page.ts`, `editor/lists.ts`, `toolbar.ts`, `sidePanel.ts`, `schema/preview.ts`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **What connects `session-start.sh script`, `name`, `private` to the rest of the system?**
  _478 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `formatNumber` be split into smaller, more focused modules?**
  _Cohesion score 0.1339031339031339 - nodes in this community are weakly interconnected._
- **Should `parse.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07785087719298246 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0650103519668737 - nodes in this community are weakly interconnected._