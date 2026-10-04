# Graph Report - matherdown  (2026-10-04)

## Corpus Check
- 214 files · ~388,591 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 3403 nodes · 12428 edges · 95 communities (81 shown, 14 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 327 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b93cc122`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- limits.ts
- Parser
- main.ts
- odesolve.ts
- sync.ts
- spec.ts
- Rational
- num
- graph/preview.ts
- schema/editor.ts
- symbolic.ts
- h
- svg.ts
- FoldersStore
- SchemaEditor
- vitest
- graph/space.ts
- compile
- numerical.ts
- notes.ts
- index.ts
- engine.ts
- markdown.ts
- conics.ts
- domain.ts
- MathError
- graph.ts
- assistant.ts
- toLatex
- account-test.mjs
- sheet.ts
- view3d.ts
- several.ts
- editor/editor.ts
- logic.ts
- package.json
- spell.test.ts
- Dove sono le cose
- editor/lists.ts
- resize.ts
- statsShown.ts
- inference.ts
- NotesStore
- study.ts
- shapes.ts
- supabase.ts
- linsys.ts
- complex.ts
- distributions.ts
- toolbar.ts
- page.ts
- calcResults.ts
- search.ts
- markers.ts
- probability.ts
- parse.ts
- 20261004091555_note_condivise.sql
- insert.ts
- .int
- SidePanel
- formatNumber
- dependencies
- schema/preview.ts
- MathNode
- settings.ts
- laplace.ts
- editor.test.ts
- schemaTools.test.ts
- sql.ts
- Benvenuto in Glifo
- compilerOptions
- SuggestionController
- math/calculus.ts
- statsGraph.ts
- .renderFormat
- parseSchema
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- graphNote.test.ts
- AccountSync
- session-start.sh
- .claude/CLAUDE.md
- numericalGraph.ts
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

## Communities (95 total, 14 thin omitted)

### Community 0 - "limits.ts"
Cohesion: 0.20
Nodes (17): close(), Definite, definiteIntegral(), exValue(), samples(), alternating(), close(), derivatives() (+9 more)

### Community 1 - "Parser"
Cohesion: 0.12
Nodes (16): Abbonamento e funzioni a pagamento (da capire), Account: i propri appunti su ogni dispositivo, anche da condividere, Aiuto con gli esercizi, Altre idee, Calcoli e grafici: idee in più, Controllare e mostrare quello che si scrive, Idee per il futuro, In programma (+8 more)

### Community 2 - "main.ts"
Cohesion: 0.07
Nodes (62): addToGraphBlock(), account, active, app, applyAccountChange(), applySpellcheck(), applyTheme(), backdrop (+54 more)

### Community 3 - "odesolve.ts"
Cohesion: 0.08
Nodes (80): addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames(), constantParticular() (+72 more)

### Community 4 - "sync.ts"
Cohesion: 0.08
Nodes (27): EMPTY_STATE, FolderChange, FolderRow, isEmpty(), iso(), LocalChange, merge(), ms() (+19 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (101): isConicLine(), quadricEquation(), isComplexLine(), onlyComplex(), constantIntegrand(), depth(), inequalityMargin(), Multiple (+93 more)

### Community 6 - "Rational"
Cohesion: 0.07
Nodes (72): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+64 more)

### Community 7 - "num"
Cohesion: 0.16
Nodes (71): atIntegers(), withoutAbs(), exp(), hyperbolicToExp(), inverseRational(), sqrtEx(), termTransform(), polyEx() (+63 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (43): addLabel(), boxes, cameras, complexCoord(), coord(), drawings, drawnViews, endTex() (+35 more)

### Community 9 - "schema/editor.ts"
Cohesion: 0.05
Nodes (58): ALIGN, ARROW_NAMES, AT_ICONS, AT_NAMES, BASE_PRESETS, BIG_ARROWS, DB_PRESETS, Direction (+50 more)

### Community 10 - "symbolic.ts"
Cohesion: 0.08
Nodes (56): linearIn(), verified(), atValues(), Converter, coordinates(), decimalText(), definiteParts(), degree() (+48 more)

### Community 11 - "h"
Cohesion: 0.08
Nodes (43): SyncStatus, viewSwitch, openShareDialog(), changeAccess(), changeCopy(), copy(), refreshChanged(), render() (+35 more)

### Community 12 - "svg.ts"
Cohesion: 0.08
Nodes (59): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseWindow(), chooseY(), clipLines(), domainEdge() (+51 more)

### Community 13 - "FoldersStore"
Cohesion: 0.12
Nodes (15): accountSpace(), adoptGuestNotes(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf(), setCurrentAccount() (+7 more)

### Community 15 - "vitest"
Cohesion: 0.05
Nodes (49): vite-plugin-pwa, vitest, GraphItem, parseGraph(), PALETTES, errorMessage(), MathSyntaxError, parseMath() (+41 more)

### Community 16 - "graph/space.ts"
Cohesion: 0.12
Nodes (51): LayeredSolid, addMesh(), addTet(), affinePlane(), Axis, centroid(), chooseBox(), clipBy() (+43 more)

### Community 17 - "compile"
Cohesion: 0.09
Nodes (44): integralRegion, Interval, compileDomain(), compileMultiple(), layersOf(), marginOf(), renameVars(), binomial() (+36 more)

### Community 18 - "numerical.ts"
Cohesion: 0.05
Nodes (78): Comandi, Come controllare il lavoro, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole, Account, Aggiungere un simbolo (+70 more)

### Community 19 - "notes.ts"
Cohesion: 0.09
Nodes (21): Deletion, Folder, FOLDER_NAME_MAX, FolderGroup, groupByFolder(), loadClosedFolders(), RemoteFolder, saveClosedFolders() (+13 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (41): b, bigops, c, calculus, fn, fr, fractions, functions (+33 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "markdown.ts"
Cohesion: 0.11
Nodes (30): dompurify, highlight.js, markdown-it-footnote, ListStyle, bulletGroup(), Marker, sameList(), renderTexOrError() (+22 more)

### Community 23 - "conics.ts"
Cohesion: 0.09
Nodes (41): conicItems(), at(), centralCanonical(), coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+33 more)

### Community 24 - "domain.ts"
Cohesion: 0.16
Nodes (19): axesIn(), bestAlong(), boundingBox(), combine(), conditionsOf(), constantOf(), Domain, insideIntervals() (+11 more)

### Community 25 - "MathError"
Cohesion: 0.16
Nodes (44): MathError, angleBetween(), asMatrix(), basisOf(), cross(), Ctx, dataOf(), determinant() (+36 more)

### Community 26 - "graph.ts"
Cohesion: 0.11
Nodes (29): fieldInput(), textWidth(), AT_X, cellHtml(), cellText(), COMPASS, createEdgeCell(), createGraph() (+21 more)

### Community 27 - "assistant.ts"
Cohesion: 0.19
Nodes (13): AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askThroughHost(), checkShape() (+5 more)

### Community 28 - "toLatex"
Cohesion: 0.10
Nodes (36): FieldContext, fourierItems(), isFourierLine(), names(), STUDY_GRAPH, studyItems(), Scope, partialSum() (+28 more)

### Community 29 - "account-test.mjs"
Cohesion: 0.08
Nodes (19): @electric-sql/pglite, login(), waitFor(), b64(), CODE, createFakeSupabase(), handle(), rpc() (+11 more)

### Community 30 - "sheet.ts"
Cohesion: 0.08
Nodes (43): formatRational(), Eigenvalue, eigenvectors(), EXACT, FLOAT, kernel(), lengthText(), Lin (+35 more)

### Community 31 - "view3d.ts"
Cohesion: 0.09
Nodes (35): Detail, Face, FAST, FINE, planeTolerance(), Plane, Vec3, escapeXml() (+27 more)

### Community 32 - "several.ts"
Cohesion: 0.14
Nodes (36): criticalLine(), named(), severalItems(), surface(), at(), bounded(), Candidate, candidates() (+28 more)

### Community 33 - "editor/editor.ts"
Cohesion: 0.11
Nodes (25): @lezer/highlight, highlight, italianPhrases, listMarkers, blockLine, inlineRegion, marks, mathHighlighter (+17 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "package.json"
Cohesion: 0.04
Nodes (41): description, devDependencies, @electric-sql/pglite, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+33 more)

### Community 36 - "spell.test.ts"
Cohesion: 0.08
Nodes (25): @codemirror/lang-markdown, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt() (+17 more)

### Community 37 - "Dove sono le cose"
Cohesion: 0.13
Nodes (39): Dove sono le cose, bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel() (+31 more)

### Community 38 - "editor/lists.ts"
Cohesion: 0.17
Nodes (32): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+24 more)

### Community 39 - "resize.ts"
Cohesion: 0.13
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "statsShown.ts"
Cohesion: 0.17
Nodes (31): check(), correlation(), count(), covariance(), Data, dataStatistic(), deviation(), fail() (+23 more)

### Community 41 - "inference.ts"
Cohesion: 0.14
Nodes (26): chiSquareTest(), confidence(), confidenceShown(), Given, hypothesisTest(), InferenceContext, interval(), meanOf() (+18 more)

### Community 42 - "NotesStore"
Cohesion: 0.15
Nodes (7): createdAtFromId(), deriveTitle(), NotesStore, readItem(), removeItem(), writeItem(), titles()

### Community 43 - "study.ts"
Cohesion: 0.10
Nodes (43): Piece, Condition, Family, Group, Root, Shape, Constraint, Coord (+35 more)

### Community 44 - "shapes.ts"
Cohesion: 0.09
Nodes (15): @maxgraph/core, ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape (+7 more)

### Community 45 - "supabase.ts"
Cohesion: 0.10
Nodes (39): @supabase/supabase-js, withLock(), Account, accountError, appUrl(), call(), currentSession(), deleteAccount() (+31 more)

### Community 46 - "linsys.ts"
Cohesion: 0.12
Nodes (44): nameLatex(), rref(), choices(), gcd(), isStandardUnknown(), linearSystem(), matrixEquation(), matrixSystem() (+36 more)

### Community 47 - "complex.ts"
Cohesion: 0.05
Nodes (72): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexValue(), isInequality() (+64 more)

### Community 48 - "distributions.ts"
Cohesion: 0.16
Nodes (28): choose(), continuousQuantile(), discreteQuantile(), expSumValue(), factorialBig(), FAMILIES, integerParam(), invalid() (+20 more)

### Community 49 - "toolbar.ts"
Cohesion: 0.10
Nodes (16): @codemirror/commands, EditorCallbacks, MarkdownEditor, insertBlock(), insertTemplate(), wrapSelection(), Action, createToolbar() (+8 more)

### Community 50 - "page.ts"
Cohesion: 0.08
Nodes (35): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), currentAccount(), PullResult, isShareToken(), parseSharedNote() (+27 more)

### Community 51 - "calcResults.ts"
Cohesion: 0.16
Nodes (10): @codemirror/language, acceptCalcResult(), calcPlugin, CalcResult, calcResults(), formulasUntil(), insertResult(), ResultWidget (+2 more)

### Community 52 - "search.ts"
Cohesion: 0.17
Nodes (24): editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex() (+16 more)

### Community 53 - "markers.ts"
Cohesion: 0.19
Nodes (20): bullet(), childMarker(), column(), firstMarker(), label(), lettersMarker(), MarkerKind, MarkerStyle (+12 more)

### Community 54 - "probability.ts"
Cohesion: 0.08
Nodes (35): addExp(), Distribution, End, exactIntervalProbability(), expSum, Family, integerRange(), intervalProbability() (+27 more)

### Community 55 - "parse.ts"
Cohesion: 0.06
Nodes (62): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+54 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "insert.ts"
Cohesion: 0.15
Nodes (15): @codemirror/state, @codemirror/view, InsertOptions, toggleLinePrefix(), besideSchema(), guardBlocks(), schemaBlockRanges(), schemaBlocks() (+7 more)

### Community 58 - ".int"
Cohesion: 0.09
Nodes (12): characteristicPolynomial(), eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), Mat, polynomialIn() (+4 more)

### Community 59 - "SidePanel"
Cohesion: 0.18
Nodes (10): formulaAtCursor(), insertGraphBlock(), graphBlockText(), insertGraph(), cleanKatexError(), renderTex(), isConfidentAnswer(), displayCode() (+2 more)

### Community 60 - "formatNumber"
Cohesion: 0.15
Nodes (21): decimalSeparator(), Digits, formatNumber(), FormatOptions, fromNumber(), fromRational(), SUPERSCRIPT, writeDigits() (+13 more)

### Community 61 - "dependencies"
Cohesion: 0.09
Nodes (23): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+15 more)

### Community 62 - "schema/preview.ts"
Cohesion: 0.15
Nodes (13): GraphLook, Look, Theme, draw(), drawCached(), drawn, errorHtml(), fill() (+5 more)

### Community 63 - "MathNode"
Cohesion: 0.15
Nodes (11): ExactComplexScope, Ode, withWorkLimit(), FiniteContext, FormattedResult, MathNode, parseCached(), Sheet (+3 more)

### Community 64 - "settings.ts"
Cohesion: 0.09
Nodes (28): DeletionLog, addPersonalWord(), DICTIONARY_KEY, loadPersonalWords(), savePersonalWords(), tidy(), ACCOUNT_SETTINGS, accountSettings() (+20 more)

### Community 65 - "laplace.ts"
Cohesion: 0.08
Nodes (64): factoredPolynomial(), numShown(), polynomialOf(), polyShown(), ruffiniShown(), Coefficients, EMPTY_SCOPE, absOf() (+56 more)

### Community 66 - "editor.test.ts"
Cohesion: 0.07
Nodes (31): @lezer/common, closeMathBlockOnEnter(), tabOutOfMath(), CODE_NODES, CommandToken, commandTokenAt(), isInCode(), MATH_NODES (+23 more)

### Community 67 - "schemaTools.test.ts"
Cohesion: 0.19
Nodes (16): escapeHtml(), renderTexMathml(), crc32(), svgSize(), svgToPng(), withDensity(), labelHtml(), plainHtml() (+8 more)

### Community 68 - "sql.ts"
Cohesion: 0.17
Nodes (18): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+10 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "SuggestionController"
Cohesion: 0.20
Nodes (4): EditorMathContext, expand(), preferredIndex(), SuggestionController

### Community 72 - "math/calculus.ts"
Cohesion: 0.33
Nodes (12): argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot(), fieldOn(), numericPartials() (+4 more)

### Community 73 - "statsGraph.ts"
Cohesion: 0.22
Nodes (15): isTestLine(), number(), testItems(), classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX (+7 more)

### Community 74 - ".renderFormat"
Cohesion: 0.18
Nodes (8): alignBoxes(), Alignment, Box, distributeBoxes(), Position, edgeTextAt(), withTextAt(), TextAt

### Community 75 - "parseSchema"
Cohesion: 0.13
Nodes (22): findSchemaBlock(), findSchemaBlocks(), OpenFence, SchemaBlock, schemaBlockAtLine(), schemaBlockText(), base64(), hide() (+14 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "graphNote.test.ts"
Cohesion: 0.17
Nodes (18): graphImage(), graphImagesFor(), graphsForFile(), graphsFromFile(), hide(), OPEN, unhide(), staticGraphSvg() (+10 more)

### Community 82 - "numericalGraph.ts"
Cohesion: 0.80
Nodes (4): isNumericalLine(), numericalItems(), isPlottedNumerical(), numericalPlot()

### Community 83 - "files.ts"
Cohesion: 0.13
Nodes (21): cache, capability(), ClaudeRuntime, hostDownloads, HostError, inClaudeViewer(), ModelTier, runtime() (+13 more)

### Community 97 - "sidePanel.ts"
Cohesion: 0.18
Nodes (16): templateInsertion(), SuggestionItem, cache, TexRender, CATEGORIES, cardPreviewTex(), formPreviewTex(), ParsedTemplate (+8 more)

## Knowledge Gaps
- **476 isolated node(s):** `Comandi`, `Promemoria per lo studente`, `Regole`, `graphify`, `Controllare e mostrare quello che si scrive` (+471 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 644 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `sync.ts`, `Rational`, `num`, `svg.ts`, `FoldersStore`, `graph/space.ts`, `notes.ts`, `markdown.ts`, `assistant.ts`, `account-test.mjs`, `sheet.ts`, `package.json`, `spell.test.ts`, `editor/lists.ts`, `resize.ts`, `NotesStore`, `supabase.ts`, `distributions.ts`, `toolbar.ts`, `page.ts`, `search.ts`, `markers.ts`, `insert.ts`, `settings.ts`, `editor.test.ts`, `schemaTools.test.ts`, `sql.ts`, `parseSchema`, `graphNote.test.ts`, `sidePanel.ts`?**
  _High betweenness centrality (0.133) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `Dove sono le cose` to `limits.ts`, `Parser`, `main.ts`, `odesolve.ts`, `spec.ts`, `Rational`, `graph/preview.ts`, `schema/editor.ts`, `symbolic.ts`, `svg.ts`, `graph/space.ts`, `numerical.ts`, `markdown.ts`, `conics.ts`, `MathError`, `graph.ts`, `toLatex`, `sheet.ts`, `several.ts`, `logic.ts`, `inference.ts`, `study.ts`, `supabase.ts`, `linsys.ts`, `complex.ts`, `parse.ts`, `schema/preview.ts`, `MathNode`, `laplace.ts`, `schemaTools.test.ts`, `numericalGraph.ts`?**
  _High betweenness centrality (0.060) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `sidePanel.ts`, `main.ts`, `spell.test.ts`, `resize.ts`, `schema/editor.ts`, `.renderFormat`, `SchemaEditor`, `toolbar.ts`, `page.ts`, `notes.ts`, `files.ts`, `graph.ts`, `SidePanel`, `schema/preview.ts`?**
  _High betweenness centrality (0.041) - this node is a cross-community bridge._
- **What connects `Comandi`, `Promemoria per lo studente`, `Regole` to the rest of the system?**
  _476 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Parser` be split into smaller, more focused modules?**
  _Cohesion score 0.12245696400625979 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0741745816372682 - nodes in this community are weakly interconnected._
- **Should `odesolve.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07962962962962963 - nodes in this community are weakly interconnected._