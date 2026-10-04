# Graph Report - matherdown  (2026-10-04)

## Corpus Check
- 215 files · ~388,942 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 3408 nodes · 12430 edges · 92 communities (79 shown, 13 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 324 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ad8542c8`
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
- h
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
- scopeWith
- MathError
- regions.ts
- assistant.ts
- toLatex
- account-test.mjs
- spaces.ts
- view3d.ts
- several.ts
- markdown.ts
- logic.ts
- package.json
- spell.test.ts
- Dove sono le cose
- editor/lists.ts
- resize.ts
- sheet.ts
- gauss.ts
- NotesStore
- study.ts
- graph.ts
- supabase.ts
- editor/editor.ts
- complex.ts
- distributions.ts
- toolbar.ts
- page.ts
- graphNote.test.ts
- search.ts
- markers.ts
- placeholders.ts
- finite.ts
- 20261004091555_note_condivise.sql
- insert.ts
- Field
- SidePanel
- .paintVertexShape
- dependencies
- parseSchema
- MathNode
- SuggestionController
- laplace.ts
- editor.test.ts
- templates.ts
- sql.ts
- Benvenuto in Glifo
- compilerOptions
- severalGraph.ts
- statsGraph.ts
- Schema
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- graph/file.ts
- session-start.sh
- .claude/CLAUDE.md
- Più avanti
- files.ts
- supabase-stub.sql
- sidePanel.ts

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
- `Dove sono le cose` --references--> `shareNote()`  [INFERRED]
  CLAUDE.md → src/account/supabase.ts
- `Dove sono le cose` --references--> `sharedLinks()`  [INFERRED]
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

## Communities (92 total, 13 thin omitted)

### Community 0 - "formatNumber"
Cohesion: 0.14
Nodes (27): exponentialForm(), fracTex(), fracText(), nearFraction(), piMultiple(), surd(), decimalSeparator(), Digits (+19 more)

### Community 1 - "parse.ts"
Cohesion: 0.07
Nodes (44): errorMessage(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe() (+36 more)

### Community 2 - "main.ts"
Cohesion: 0.05
Nodes (83): addToGraphBlock(), insertGraphBlock(), account, active, app, applyAccountChange(), applySpellcheck(), applyTheme() (+75 more)

### Community 3 - "odesolve.ts"
Cohesion: 0.08
Nodes (82): linearIn(), addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames() (+74 more)

### Community 4 - "sync.ts"
Cohesion: 0.05
Nodes (39): @electric-sql/pglite, AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow (+31 more)

### Community 5 - "spec.ts"
Cohesion: 0.06
Nodes (76): formulaAtCursor(), conicItems(), isConicLine(), quadricEquation(), onlyComplex(), areaOf(), AXES, blockLines() (+68 more)

### Community 6 - "arithmetic.ts"
Cohesion: 0.07
Nodes (78): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+70 more)

### Community 7 - "num"
Cohesion: 0.15
Nodes (73): atIntegers(), withoutAbs(), exp(), hyperbolicToExp(), inverseRational(), sqrtEx(), termTransform(), polyEx() (+65 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (40): addLabel(), boxes, cameras, complexCoord(), coord(), drawings, drawnViews, endTex() (+32 more)

### Community 9 - "schema/editor.ts"
Cohesion: 0.06
Nodes (56): alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ARROW_NAMES, AT_ICONS (+48 more)

### Community 10 - "symbolic.ts"
Cohesion: 0.09
Nodes (38): atValues(), coordinates(), decimalText(), degree(), denominatorPart(), denominators(), exactRoot(), factorOut() (+30 more)

### Community 11 - "h"
Cohesion: 0.09
Nodes (40): SyncStatus, viewSwitch, openShareDialog(), changeAccess(), changeCopy(), refreshChanged(), render(), run() (+32 more)

### Community 12 - "svg.ts"
Cohesion: 0.10
Nodes (51): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseWindow(), chooseY(), clipLines(), domainEdge() (+43 more)

### Community 13 - "linsys.ts"
Cohesion: 0.12
Nodes (38): rref(), choices(), gcd(), isStandardUnknown(), linearSystem(), matrixEquation(), matrixSystem(), minorsGcd() (+30 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.10
Nodes (5): openSchemaEditor(), SchemaEditor, createEdgeCell(), EdgeLook, Template

### Community 15 - "vitest"
Cohesion: 0.06
Nodes (37): vite-plugin-pwa, vitest, staticGraphSvg(), chooseBox(), GraphItem, parseGraph(), DrawOptions, graphSvg() (+29 more)

### Community 16 - "graph/space.ts"
Cohesion: 0.10
Nodes (57): sampleRegion(), addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon() (+49 more)

### Community 17 - "compile"
Cohesion: 0.08
Nodes (48): argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot(), fieldOn(), numericPartials() (+40 more)

### Community 18 - "numerical.ts"
Cohesion: 0.08
Nodes (60): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Funzionalità (+52 more)

### Community 19 - "FoldersStore"
Cohesion: 0.06
Nodes (27): Deletion, DeletionLog, cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder() (+19 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (41): b, bigops, c, calculus, fn, fr, fractions, functions (+33 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "Rational"
Cohesion: 0.07
Nodes (41): End, expSum, Family, CompileOptions, bigGcd(), binomExact(), conditionExact(), evaluateExact() (+33 more)

### Community 23 - "conics.ts"
Cohesion: 0.18
Nodes (29): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+21 more)

### Community 24 - "scopeWith"
Cohesion: 0.13
Nodes (32): integralRegion, axesIn(), bestAlong(), boundingBox(), combine(), compileDomain(), compileMultiple(), conditionsOf() (+24 more)

### Community 25 - "MathError"
Cohesion: 0.11
Nodes (61): MathError, angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, dataOf() (+53 more)

### Community 26 - "regions.ts"
Cohesion: 0.16
Nodes (21): constantIntegrand(), depth(), inequalityMargin(), LayeredSolid, Multiple, multipleOf(), planeMargin(), PlanePart (+13 more)

### Community 27 - "assistant.ts"
Cohesion: 0.15
Nodes (14): @anthropic-ai/sdk, AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askThroughHost() (+6 more)

### Community 28 - "toLatex"
Cohesion: 0.09
Nodes (40): isNumericalLine(), numericalItems(), areaFor(), condLabel(), itemFor(), multipleLabel(), planeRegionFor(), names() (+32 more)

### Community 29 - "account-test.mjs"
Cohesion: 0.07
Nodes (18): login(), waitFor(), b64(), CODE, createFakeSupabase(), handle(), rpc(), session() (+10 more)

### Community 30 - "spaces.ts"
Cohesion: 0.18
Nodes (21): formatRational(), lengthText(), splitRoot(), surdText(), cartesianEquations(), Cell, coordinateNames(), diagonalize() (+13 more)

### Community 31 - "view3d.ts"
Cohesion: 0.11
Nodes (30): Box, Face, FINE, planeTolerance(), Plane, Vec3, escapeXml(), arrowHead() (+22 more)

### Community 32 - "several.ts"
Cohesion: 0.06
Nodes (80): close(), Definite, definiteIntegral(), exValue(), samples(), EMPTY_SCOPE, absOf(), boundsOf() (+72 more)

### Community 33 - "markdown.ts"
Cohesion: 0.11
Nodes (33): cache, escapeHtml(), renderTexMathml(), renderTexOrError(), renderTexWithResult(), TexRender, configurePurify(), createMarkdownIt() (+25 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "package.json"
Cohesion: 0.05
Nodes (38): description, devDependencies, @electric-sql/pglite, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+30 more)

### Community 36 - "spell.test.ts"
Cohesion: 0.08
Nodes (23): @codemirror/lang-markdown, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt() (+15 more)

### Community 37 - "Dove sono le cose"
Cohesion: 0.12
Nodes (40): Dove sono le cose, bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel() (+32 more)

### Community 38 - "editor/lists.ts"
Cohesion: 0.18
Nodes (30): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+22 more)

### Community 39 - "resize.ts"
Cohesion: 0.13
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "sheet.ts"
Cohesion: 0.11
Nodes (46): formatGauss(), expSumValue(), ExactFunction, Eigenvalue, Lin, LinearValue, INFERENCE, parsed (+38 more)

### Community 41 - "gauss.ts"
Cohesion: 0.19
Nodes (18): COMPLEX_FUNCTIONS, farthest(), gaussItem(), hasExponential(), inZ(), isComplexLine(), isComplexValue(), isInequality() (+10 more)

### Community 42 - "NotesStore"
Cohesion: 0.10
Nodes (24): accountSpace(), adoptGuestNotes(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf(), setCurrentAccount() (+16 more)

### Community 43 - "study.ts"
Cohesion: 0.14
Nodes (36): limit(), radius(), breaks(), periodOf(), scanRoots(), Asymptote, compiled(), cutsOf() (+28 more)

### Community 44 - "graph.ts"
Cohesion: 0.08
Nodes (35): @maxgraph/core, fieldInput(), textWidth(), AT_X, cellHtml(), cellText(), COMPASS, createGraph() (+27 more)

### Community 45 - "supabase.ts"
Cohesion: 0.11
Nodes (34): @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken(), ensureSessionOf() (+26 more)

### Community 46 - "editor/editor.ts"
Cohesion: 0.15
Nodes (15): @codemirror/language, @lezer/highlight, highlight, italianPhrases, listMarkers, blockLine, inlineRegion, marks (+7 more)

### Community 47 - "complex.ts"
Cohesion: 0.08
Nodes (46): add(), allRoots(), arg(), asin(), atan(), compileApply(), compileComplex(), compileFunction() (+38 more)

### Community 48 - "distributions.ts"
Cohesion: 0.07
Nodes (61): addExp(), choose(), continuousQuantile(), discreteQuantile(), Distribution, exactIntervalProbability(), factorialBig(), FAMILIES (+53 more)

### Community 49 - "toolbar.ts"
Cohesion: 0.10
Nodes (16): @codemirror/commands, EditorCallbacks, MarkdownEditor, insertBlock(), insertTemplate(), wrapSelection(), Action, createToolbar() (+8 more)

### Community 50 - "page.ts"
Cohesion: 0.07
Nodes (37): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), currentAccount(), PullResult, isShareToken(), parseSharedNote() (+29 more)

### Community 51 - "graphNote.test.ts"
Cohesion: 0.15
Nodes (13): acceptCalcResult(), calcPlugin, CalcResult, calcResults(), formulasUntil(), insertResult(), ResultWidget, sheetBefore() (+5 more)

### Community 52 - "search.ts"
Cohesion: 0.17
Nodes (23): editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex() (+15 more)

### Community 53 - "markers.ts"
Cohesion: 0.11
Nodes (36): Item, ListStyle, bullet(), bulletGroup(), childMarker(), column(), firstMarker(), label() (+28 more)

### Community 54 - "placeholders.ts"
Cohesion: 0.14
Nodes (12): addPlaceholders, buildDecorations(), clearAllPlaceholders(), clearPlaceholders, contains(), currentIndex(), filledMark, getPlaceholders() (+4 more)

### Community 55 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "insert.ts"
Cohesion: 0.15
Nodes (15): @codemirror/state, @codemirror/view, InsertOptions, toggleLinePrefix(), besideSchema(), guardBlocks(), schemaBlockRanges(), schemaBlocks() (+7 more)

### Community 58 - "Field"
Cohesion: 0.12
Nodes (7): characteristicPolynomial(), eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn()

### Community 59 - "SidePanel"
Cohesion: 0.24
Nodes (5): cleanKatexError(), renderTex(), displayCode(), preventFocusSteal(), SidePanel

### Community 60 - ".paintVertexShape"
Cohesion: 0.15
Nodes (5): DotShape, IdentifyingRelationShape, NoteShape, TableShape, WeakEntityShape

### Community 61 - "dependencies"
Cohesion: 0.09
Nodes (23): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+15 more)

### Community 62 - "parseSchema"
Cohesion: 0.09
Nodes (22): GraphLook, Look, isRecord(), num(), oneOf(), parseSchema(), point(), SchemaError (+14 more)

### Community 63 - "MathNode"
Cohesion: 0.06
Nodes (49): GaussLine, Definition, Line, Line, ExactComplexScope, Ode, withWorkLimit(), FiniteContext (+41 more)

### Community 65 - "laplace.ts"
Cohesion: 0.22
Nodes (18): beyondPoles(), compiled(), E, HALF, inverseLaplaceShown(), laplaceEx(), laplaceShown(), laplaceTerms() (+10 more)

### Community 66 - "editor.test.ts"
Cohesion: 0.12
Nodes (19): @lezer/common, closeMathBlockOnEnter(), tabOutOfMath(), templateInsertion(), CODE_NODES, CommandToken, commandTokenAt(), isInCode() (+11 more)

### Community 67 - "templates.ts"
Cohesion: 0.15
Nodes (12): SchemaEdge, SchemaNode, conceptMap, cycle, er, flowchart, node(), NodeExtra (+4 more)

### Community 68 - "sql.ts"
Cohesion: 0.17
Nodes (17): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+9 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "severalGraph.ts"
Cohesion: 0.19
Nodes (17): FieldContext, fourierItems(), isFourierLine(), criticalLine(), isSeveralLine(), named(), severalItems(), surface() (+9 more)

### Community 73 - "statsGraph.ts"
Cohesion: 0.19
Nodes (16): isTestLine(), number(), testItems(), Range, classes(), dataOf(), distributionExtent(), distributionLabel() (+8 more)

### Community 75 - "Schema"
Cohesion: 0.15
Nodes (12): loadDialect(), SchemaEditorOptions, base64(), schemaImage(), crc32(), svgSize(), svgToPng(), withDensity() (+4 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "graph/file.ts"
Cohesion: 0.13
Nodes (25): graphImage(), graphImagesFor(), graphsForFile(), graphsFromFile(), hide(), OPEN, unhide(), areaColor() (+17 more)

### Community 82 - "Più avanti"
Cohesion: 0.06
Nodes (32): Comandi, Come controllare il lavoro, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole, Abbonamento e funzioni a pagamento (da capire), Account: i propri appunti su ogni dispositivo, anche da condividere (+24 more)

### Community 83 - "files.ts"
Cohesion: 0.14
Nodes (20): cache, capability(), ClaudeRuntime, hostDownloads, HostError, inClaudeViewer(), ModelTier, runtime() (+12 more)

### Community 97 - "sidePanel.ts"
Cohesion: 0.17
Nodes (17): expand(), preferredIndex(), SuggestionItem, isConfidentAnswer(), CATEGORIES, commandNames(), symbolsInCategory(), cardPreviewTex() (+9 more)

## Knowledge Gaps
- **476 isolated node(s):** `session-start.sh script`, `name`, `private`, `version`, `description` (+471 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 648 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `parse.ts`, `main.ts`, `sync.ts`, `arithmetic.ts`, `num`, `schema/editor.ts`, `svg.ts`, `linsys.ts`, `graph/space.ts`, `FoldersStore`, `MathError`, `assistant.ts`, `toLatex`, `several.ts`, `markdown.ts`, `package.json`, `spell.test.ts`, `editor/lists.ts`, `resize.ts`, `NotesStore`, `supabase.ts`, `distributions.ts`, `toolbar.ts`, `page.ts`, `graphNote.test.ts`, `search.ts`, `markers.ts`, `insert.ts`, `parseSchema`, `MathNode`, `editor.test.ts`, `sql.ts`, `graph/file.ts`, `sidePanel.ts`?**
  _High betweenness centrality (0.110) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `Dove sono le cose` to `formatNumber`, `parse.ts`, `main.ts`, `odesolve.ts`, `spec.ts`, `arithmetic.ts`, `graph/preview.ts`, `schema/editor.ts`, `symbolic.ts`, `svg.ts`, `linsys.ts`, `graph/space.ts`, `compile`, `numerical.ts`, `Rational`, `conics.ts`, `MathError`, `toLatex`, `several.ts`, `markdown.ts`, `logic.ts`, `sheet.ts`, `gauss.ts`, `study.ts`, `graph.ts`, `supabase.ts`, `complex.ts`, `distributions.ts`, `finite.ts`, `parseSchema`, `MathNode`, `severalGraph.ts`, `Più avanti`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `sidePanel.ts`, `main.ts`, `spell.test.ts`, `resize.ts`, `schema/editor.ts`, `Schema`, `graph.ts`, `SchemaEditor`, `toolbar.ts`, `page.ts`, `FoldersStore`, `SidePanel`, `parseSchema`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **What connects `session-start.sh script`, `name`, `private` to the rest of the system?**
  _476 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `formatNumber` be split into smaller, more focused modules?**
  _Cohesion score 0.1354679802955665 - nodes in this community are weakly interconnected._
- **Should `parse.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07132188200149366 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05225885225885226 - nodes in this community are weakly interconnected._