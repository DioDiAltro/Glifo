# Graph Report - matherdown  (2026-10-05)

## Corpus Check
- 219 files · ~405,695 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 3511 nodes · 12762 edges · 104 communities (90 shown, 14 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 339 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7f66bd69`
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
- numerical.ts
- folders.ts
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
- spaces.ts
- view3d.ts
- distributions.ts
- markdown.ts
- logic.ts
- MathNode
- editor.test.ts
- Dove sono le cose
- gauss.ts
- resize.ts
- statsShown.ts
- sheet.ts
- NotesStore
- study.ts
- parseSchema
- supabase.ts
- probability.ts
- complex.ts
- parse.ts
- editor/editor.ts
- graph.ts
- toLatex
- search.ts
- schemaTools.test.ts
- files.ts
- finite.ts
- 20261004091555_note_condivise.sql
- @codemirror/state
- Field
- SidePanel
- shapes.ts
- dependencies
- page.ts
- inference.ts
- schema/preview.ts
- markers.ts
- calcResults.ts
- tutorial.mjs
- sql.ts
- Benvenuto in Glifo
- compilerOptions
- smoke-test.mjs
- insert.ts
- statsGraph.ts
- severalGraph.ts
- toolbar.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- spellcheck
- formatNumber
- session-start.sh
- .claude/CLAUDE.md
- Distribution
- sidePanel.ts
- Abbonamenti
- database.ts
- toNode
- supabase-stub.sql
- account-test.mjs
- Schema
- scripts
- icons.mjs
- nameLabel
- graphNote.test.ts
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

## Communities (104 total, 14 thin omitted)

### Community 0 - "solve.ts"
Cohesion: 0.19
Nodes (22): isStandardUnknown(), linearSystem(), RelOp, breaks(), cubeRoot(), equation(), holds(), inequality() (+14 more)

### Community 1 - "Parser"
Cohesion: 0.06
Nodes (47): Comandi, Come controllare il lavoro, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole, Account, Aggiungere un simbolo (+39 more)

### Community 2 - "main.ts"
Cohesion: 0.06
Nodes (73): addToGraphBlock(), insertGraphBlock(), account, active, app, applyAccountChange(), applySpellcheck(), applyTheme() (+65 more)

### Community 3 - "odesolve.ts"
Cohesion: 0.08
Nodes (77): addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames(), constantParticular() (+69 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (33): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+25 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (89): conicItems(), isConicLine(), quadricEquation(), onlyComplex(), constantIntegrand(), depth(), inequalityMargin(), Multiple (+81 more)

### Community 6 - "arithmetic.ts"
Cohesion: 0.07
Nodes (72): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+64 more)

### Community 7 - "num"
Cohesion: 0.14
Nodes (83): atIntegers(), withoutAbs(), exp(), hyperbolicToExp(), inverseRational(), sqrtEx(), termTransform(), polyEx() (+75 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (45): addLabel(), boxes, cameras, complexCoord(), coord(), drawings, drawnViews, endTex() (+37 more)

### Community 9 - "schema/editor.ts"
Cohesion: 0.05
Nodes (56): ALIGN, ARROW_NAMES, AT_ICONS, AT_NAMES, BASE_PRESETS, BIG_ARROWS, DB_PRESETS, Direction (+48 more)

### Community 10 - "symbolic.ts"
Cohesion: 0.07
Nodes (70): linearIn(), primitive(), verified(), assumePositive(), atValues(), cancelLinear(), combine(), commonMonomial() (+62 more)

### Community 11 - "settings.ts"
Cohesion: 0.11
Nodes (25): addPersonalWord(), DICTIONARY_KEY, loadPersonalWords(), savePersonalWords(), tidy(), ACCOUNT_SETTINGS, accountSettings(), AI_MODELS (+17 more)

### Community 12 - "svg.ts"
Cohesion: 0.10
Nodes (50): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), domainEdge(), features() (+42 more)

### Community 13 - "linsys.ts"
Cohesion: 0.13
Nodes (43): choices(), gcd(), matrixEquation(), matrixSystem(), minorsGcd(), ONE, parametricRows(), parametricSystem() (+35 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.11
Nodes (5): SchemaEditor, createEdgeCell(), nodeStyle(), EdgeLook, Template

### Community 15 - "editor/lists.ts"
Cohesion: 0.24
Nodes (25): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+17 more)

### Community 16 - "graph/space.ts"
Cohesion: 0.12
Nodes (45): LayeredSolid, addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon() (+37 more)

### Community 17 - "compile"
Cohesion: 0.06
Nodes (80): integralRegion, argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot(), fieldOn() (+72 more)

### Community 18 - "numerical.ts"
Cohesion: 0.12
Nodes (47): bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial(), interpolating() (+39 more)

### Community 19 - "folders.ts"
Cohesion: 0.13
Nodes (15): Folder, FOLDER_NAME_MAX, FolderGroup, groupByFolder(), loadClosedFolders(), RemoteFolder, saveClosedFolders(), Note (+7 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (41): b, bigops, c, calculus, fn, fr, fractions, functions (+33 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "Rational"
Cohesion: 0.08
Nodes (30): expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactFunction, ExactRandom, exactRoot() (+22 more)

### Community 23 - "conics.ts"
Cohesion: 0.18
Nodes (29): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+21 more)

### Community 24 - "several.ts"
Cohesion: 0.15
Nodes (33): severalLimit, at(), bounded(), Candidate, candidates(), compiled(), COORDS, coordShown() (+25 more)

### Community 25 - "MathError"
Cohesion: 0.12
Nodes (56): MathError, UndefinedName, angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx (+48 more)

### Community 26 - "h"
Cohesion: 0.06
Nodes (53): SyncStatus, helpButton, openGuide(), openShareDialog(), changeAccess(), changeCopy(), refreshChanged(), render() (+45 more)

### Community 27 - "assistant.ts"
Cohesion: 0.13
Nodes (19): AiAnswer, AiError, AiSettings, ANSWER_SCHEMA, askAi(), askThroughHost(), checkShape(), stripDelimiters() (+11 more)

### Community 28 - "spell.test.ts"
Cohesion: 0.10
Nodes (21): @codemirror/lang-markdown, noIndentedCode, mathMarkdown, misspelledMark, refreshSpelling, setTarget, SKIP, SpellTarget (+13 more)

### Community 29 - "fake-supabase.mjs"
Cohesion: 0.22
Nodes (11): b64(), CODE, createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom() (+3 more)

### Community 30 - "spaces.ts"
Cohesion: 0.13
Nodes (27): decimalSeparator(), Digits, FormatOptions, formatRational(), fromNumber(), fromRational(), SUPERSCRIPT, writeDigits() (+19 more)

### Community 31 - "view3d.ts"
Cohesion: 0.09
Nodes (43): tickLabel(), Detail, Face, planeTolerance(), regionFaces(), splitFace(), splitLine(), surfacePlane() (+35 more)

### Community 32 - "distributions.ts"
Cohesion: 0.18
Nodes (26): choose(), expSumValue(), factorialBig(), FAMILIES, Family, integerParam(), invalid(), makeDistribution() (+18 more)

### Community 33 - "markdown.ts"
Cohesion: 0.11
Nodes (32): @lezer/highlight, lineDepth(), parseBlockMath(), cache, escapeHtml(), renderTexMathml(), renderTexOrError(), renderTexWithResult() (+24 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "MathNode"
Cohesion: 0.10
Nodes (27): Ode, withWorkLimit(), FiniteContext, FormattedResult, differentialRequest, pieces(), MathNode, definitionTarget() (+19 more)

### Community 36 - "editor.test.ts"
Cohesion: 0.08
Nodes (27): CODE_NODES, CommandToken, commandTokenAt(), isInCode(), MATH_NODES, mathContextAt(), MathRegion, openMathBefore() (+19 more)

### Community 37 - "Dove sono le cose"
Cohesion: 0.13
Nodes (37): Dove sono le cose, bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel() (+29 more)

### Community 38 - "gauss.ts"
Cohesion: 0.17
Nodes (20): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexLine(), isComplexValue() (+12 more)

### Community 39 - "resize.ts"
Cohesion: 0.13
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "statsShown.ts"
Cohesion: 0.17
Nodes (31): check(), correlation(), count(), covariance(), Data, dataStatistic(), deviation(), fail() (+23 more)

### Community 41 - "sheet.ts"
Cohesion: 0.05
Nodes (52): vitest, staticGraphSvg(), chooseWindow(), formulaGraph(), GraphItem, parseGraph(), typedSliderValue(), graphSvg() (+44 more)

### Community 42 - "NotesStore"
Cohesion: 0.06
Nodes (34): accountSpace(), adoptGuestNotes(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf(), setCurrentAccount() (+26 more)

### Community 43 - "study.ts"
Cohesion: 0.18
Nodes (29): limit(), Asymptote, compiled(), cutsOf(), defined(), domainOf(), exact(), inDomain() (+21 more)

### Community 44 - "parseSchema"
Cohesion: 0.14
Nodes (20): findSchemaBlock(), findSchemaBlocks(), OpenFence, SchemaBlock, schemaBlockAtLine(), schemaBlockText(), hide(), OPEN (+12 more)

### Community 45 - "supabase.ts"
Cohesion: 0.07
Nodes (52): @supabase/supabase-js, AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), accountError, appUrl(), call() (+44 more)

### Community 46 - "probability.ts"
Cohesion: 0.14
Nodes (22): End, Interval, CompileOptions, ExactScope, ALL, complement(), endAt(), EventContext (+14 more)

### Community 47 - "complex.ts"
Cohesion: 0.08
Nodes (45): add(), allRoots(), arg(), asin(), atan(), compileApply(), compileComplex(), compileFunction() (+37 more)

### Community 48 - "parse.ts"
Cohesion: 0.05
Nodes (45): errorMessage(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, differentialInFraction() (+37 more)

### Community 49 - "editor/editor.ts"
Cohesion: 0.06
Nodes (34): description, name, private, type, version, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands (+26 more)

### Community 50 - "graph.ts"
Cohesion: 0.10
Nodes (27): fieldInput(), AT_X, cellHtml(), cellText(), COMPASS, createGraph(), drawSchema(), edgeLook() (+19 more)

### Community 51 - "toLatex"
Cohesion: 0.08
Nodes (49): isNumericalLine(), numericalItems(), areaFor(), condLabel(), isStraight(), isVectorName(), itemFor(), multipleLabel() (+41 more)

### Community 52 - "search.ts"
Cohesion: 0.18
Nodes (21): editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex() (+13 more)

### Community 53 - "schemaTools.test.ts"
Cohesion: 0.14
Nodes (20): alignBoxes(), Alignment, Box, distributeBoxes(), Position, base64(), crc32(), svgSize() (+12 more)

### Community 54 - "files.ts"
Cohesion: 0.22
Nodes (14): inClaudeViewer(), backup(), canWriteFilesDirectly(), downloadBlob(), downloadText(), FsWindow, isAbort(), MD_TYPES (+6 more)

### Community 55 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "@codemirror/state"
Cohesion: 0.13
Nodes (15): @codemirror/state, @codemirror/view, toggleLinePrefix(), LIST_STYLES, besideSchema(), guardBlocks(), schemaBlockRanges(), schemaBlocks() (+7 more)

### Community 58 - "Field"
Cohesion: 0.12
Nodes (7): characteristicPolynomial(), eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn()

### Community 59 - "SidePanel"
Cohesion: 0.24
Nodes (5): cleanKatexError(), renderTex(), displayCode(), preventFocusSteal(), SidePanel

### Community 60 - "shapes.ts"
Cohesion: 0.09
Nodes (15): @maxgraph/core, ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape (+7 more)

### Community 61 - "dependencies"
Cohesion: 0.09
Nodes (23): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+15 more)

### Community 62 - "page.ts"
Cohesion: 0.11
Nodes (20): currentAccount(), SharedNote, body, draw(), isDark(), saveButton, saveCopy(), settings (+12 more)

### Community 63 - "inference.ts"
Cohesion: 0.16
Nodes (24): chiSquareTest(), confidence(), confidenceShown(), Given, hypothesisTest(), InferenceContext, interval(), meanOf() (+16 more)

### Community 64 - "schema/preview.ts"
Cohesion: 0.20
Nodes (12): Look, SchemaError, Theme, draw(), drawCached(), drawn, errorHtml(), fill() (+4 more)

### Community 65 - "markers.ts"
Cohesion: 0.11
Nodes (36): Item, ListStyle, bullet(), bulletGroup(), childMarker(), column(), firstMarker(), label() (+28 more)

### Community 66 - "calcResults.ts"
Cohesion: 0.15
Nodes (13): acceptCalcResult(), calcPlugin, CalcResult, calcResults(), formulasUntil(), insertResult(), ResultWidget, sheetBefore() (+5 more)

### Community 67 - "tutorial.mjs"
Cohesion: 0.12
Nodes (10): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+2 more)

### Community 68 - "sql.ts"
Cohesion: 0.18
Nodes (17): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+9 more)

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
Cohesion: 0.17
Nodes (8): InsertOptions, templateInsertion(), EditorMathContext, expand(), preferredIndex(), SuggestionController, commandNames(), parseTemplate()

### Community 73 - "statsGraph.ts"
Cohesion: 0.22
Nodes (14): isTestLine(), number(), testItems(), classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX (+6 more)

### Community 74 - "severalGraph.ts"
Cohesion: 0.22
Nodes (15): FieldContext, fourierItems(), isFourierLine(), criticalLine(), isSeveralLine(), named(), severalItems(), surface() (+7 more)

### Community 75 - "toolbar.ts"
Cohesion: 0.10
Nodes (17): closeMathBlockOnEnter(), EditorCallbacks, MarkdownEditor, tabOutOfMath(), insertBlock(), insertTemplate(), wrapSelection(), Action (+9 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "spellcheck"
Cohesion: 0.21
Nodes (8): spellcheck(), close(), misspelledAt(), openAt(), replace(), tooltipView(), SpellChecker, SpellcheckOptions

### Community 79 - "formatNumber"
Cohesion: 0.20
Nodes (18): exponentialForm(), fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), formatNumber() (+10 more)

### Community 82 - "Distribution"
Cohesion: 0.13
Nodes (13): addExp(), continuousQuantile(), discreteQuantile(), Distribution, exactIntervalProbability(), integerRange(), intervalProbability(), subtractExp() (+5 more)

### Community 83 - "sidePanel.ts"
Cohesion: 0.16
Nodes (16): AiResult, SuggestionItem, isConfidentAnswer(), SearchResult, CATEGORIES, SYMBOLS, symbolsInCategory(), cardPreviewTex() (+8 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.06
Nodes (31): Abbonamenti, Classico, gratis: per scrivere e controllare, Com'è andata la discussione, Come si costruisce (per dopo), Come si decide cosa far pagare, Cosa fare, in ordine, Cosa succede dietro, Cosa vede chi studia (+23 more)

### Community 91 - "database.ts"
Cohesion: 0.24
Nodes (6): @electric-sql/pglite, createDatabase(), createUser(), databaseTests(), migrations, shareTests()

### Community 92 - "toNode"
Cohesion: 0.09
Nodes (44): numShown(), EMPTY_SCOPE, absOf(), boundsOf(), close(), definite(), fourierProblem, fourierShown() (+36 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.20
Nodes (4): device(), login(), newContext, waitFor()

### Community 97 - "Schema"
Cohesion: 0.22
Nodes (6): loadDialect(), SchemaEditorOptions, schemaImage(), Schema, serializeSchema(), fileNameFor()

### Community 98 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 102 - "graphNote.test.ts"
Cohesion: 0.22
Nodes (15): graphImage(), graphImagesFor(), graphsForFile(), graphsFromFile(), hide(), OPEN, unhide(), areaColor() (+7 more)

### Community 106 - "devDependencies"
Cohesion: 0.22
Nodes (9): devDependencies, @electric-sql/pglite, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite, vite-plugin-pwa (+1 more)

## Knowledge Gaps
- **518 isolated node(s):** `Deciso`, `Com'è andata la discussione`, `La proposta dello studente (4 ottobre 2026)`, `Il parere di Claude, in breve`, `Come si decide cosa far pagare` (+513 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 691 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `Parser`, `main.ts`, `odesolve.ts`, `spec.ts`, `arithmetic.ts`, `num`, `schema/editor.ts`, `symbolic.ts`, `svg.ts`, `linsys.ts`, `graph/space.ts`, `compile`, `numerical.ts`, `Rational`, `conics.ts`, `several.ts`, `MathError`, `h`, `markdown.ts`, `logic.ts`, `MathNode`, `gauss.ts`, `sheet.ts`, `supabase.ts`, `complex.ts`, `parse.ts`, `graph.ts`, `toLatex`, `schemaTools.test.ts`, `finite.ts`, `inference.ts`, `schema/preview.ts`, `severalGraph.ts`, `formatNumber`, `toNode`?**
  _High betweenness centrality (0.104) - this node is a cross-community bridge._
- **Why does `vitest` connect `sheet.ts` to `sync.ts`, `num`, `settings.ts`, `linsys.ts`, `folders.ts`, `h`, `assistant.ts`, `spell.test.ts`, `view3d.ts`, `markdown.ts`, `editor.test.ts`, `resize.ts`, `NotesStore`, `parseSchema`, `supabase.ts`, `parse.ts`, `editor/editor.ts`, `search.ts`, `schemaTools.test.ts`, `@codemirror/state`, `page.ts`, `markers.ts`, `sql.ts`, `sidePanel.ts`, `database.ts`, `graphNote.test.ts`?**
  _High betweenness centrality (0.101) - this node is a cross-community bridge._
- **Why does `NotesStore` connect `NotesStore` to `main.ts`, `folders.ts`, `sync.ts`, `page.ts`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **What connects `Deciso`, `Com'è andata la discussione`, `La proposta dello studente (4 ottobre 2026)` to the rest of the system?**
  _518 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Parser` be split into smaller, more focused modules?**
  _Cohesion score 0.05980292218824329 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.059720869847452125 - nodes in this community are weakly interconnected._
- **Should `odesolve.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08291708291708291 - nodes in this community are weakly interconnected._