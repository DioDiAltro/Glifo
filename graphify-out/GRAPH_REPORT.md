# Graph Report - matherdown  (2026-10-03)

## Corpus Check
- 206 files · ~379,453 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 3291 nodes · 12130 edges · 89 communities (78 shown, 11 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 313 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8309327e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Sheet
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
- regions.ts
- SchemaEditor
- complex.test.ts
- graph/space.ts
- compile
- numerical.ts
- FoldersStore
- index.ts
- engine.ts
- account/space.ts
- sidePanel.ts
- domain.ts
- MathError
- graph.ts
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
- Più avanti
- NotesStore
- study.ts
- shapes.ts
- supabase.ts
- linsys.ts
- complex.ts
- distributions.ts
- toolbar.ts
- conics.ts
- editor/editor.ts
- search.ts
- .scope
- probability.ts
- finite.ts
- inference.ts
- insert.ts
- Field
- SidePanel
- Rational
- dependencies
- schema/preview.ts
- schemaTools.test.ts
- settings.ts
- .calculate
- Harness
- toNode
- sql.ts
- Benvenuto in Glifo
- compilerOptions
- MathNode
- .folderItem
- statsGraph.ts
- Distribution
- parseSchema
- Le quattro modalità
- limits.ts
- severalGraph.ts
- .usesDecimals
- session-start.sh
- .claude/CLAUDE.md
- files.ts

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
- `Dove sono le cose` --references--> `addToGraphBlock()`  [INFERRED]
  CLAUDE.md → src/editor/graphInsert.ts
- `Dove sono le cose` --references--> `sampleArea()`  [INFERRED]
  CLAUDE.md → src/graph/plot.ts
- `Dove sono le cose` --references--> `solidFaces()`  [INFERRED]
  CLAUDE.md → src/graph/space.ts
- `Dove sono le cose` --references--> `layeredFaces()`  [INFERRED]
  CLAUDE.md → src/graph/space.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (89 total, 11 thin omitted)

### Community 0 - "Sheet"
Cohesion: 0.10
Nodes (24): Sheet, solveRequest(), text(), tex(), text(), result(), text(), result() (+16 more)

### Community 1 - "parse.ts"
Cohesion: 0.08
Nodes (39): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe(), differentialInFraction() (+31 more)

### Community 2 - "main.ts"
Cohesion: 0.05
Nodes (78): graphImagesFor(), graphsForFile(), graphsFromFile(), hide(), OPEN, unhide(), account, active (+70 more)

### Community 3 - "odesolve.ts"
Cohesion: 0.08
Nodes (84): primed(), linearIn(), addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled() (+76 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (36): @electric-sql/pglite, accountDataFile(), EMPTY_STATE, FolderChange, FolderRow, isEmpty(), iso(), LocalChange (+28 more)

### Community 5 - "spec.ts"
Cohesion: 0.06
Nodes (74): conicItems(), isConicLine(), quadricEquation(), fourierItems(), isFourierLine(), onlyComplex(), isNumericalLine(), numericalItems() (+66 more)

### Community 6 - "arithmetic.ts"
Cohesion: 0.06
Nodes (96): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+88 more)

### Community 7 - "num"
Cohesion: 0.16
Nodes (72): atIntegers(), withoutAbs(), exp(), hyperbolicToExp(), termTransform(), polyEx(), similarSolution(), algebraic() (+64 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (46): addLabel(), boxes, cameras, complexCoord(), coord(), drawings, drawnViews, endTex() (+38 more)

### Community 9 - "schema/editor.ts"
Cohesion: 0.05
Nodes (64): ALIGN, ARROW_NAMES, AT_ICONS, AT_NAMES, BASE_PRESETS, BIG_ARROWS, DB_PRESETS, Direction (+56 more)

### Community 10 - "symbolic.ts"
Cohesion: 0.08
Nodes (49): atValues(), Converter, coordinates(), decimalText(), definiteParts(), degree(), denominatorPart(), denominators() (+41 more)

### Community 11 - "h"
Cohesion: 0.12
Nodes (29): SyncStatus, viewSwitch, Settings, AccountButton, confirmAccountDeletion(), messageOf(), openAccountDialog(), openLoginDialog() (+21 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (52): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), domainEdge(), features() (+44 more)

### Community 13 - "regions.ts"
Cohesion: 0.17
Nodes (24): constantIntegrand(), depth(), inequalityMargin(), integralRegion, multipleOf(), planeMargin(), planeParts(), radiusOf() (+16 more)

### Community 15 - "complex.test.ts"
Cohesion: 0.10
Nodes (24): graphImage(), staticGraphSvg(), chooseWindow(), chooseBox(), parseGraph(), areaColor(), DrawOptions, graphSvg() (+16 more)

### Community 16 - "graph/space.ts"
Cohesion: 0.09
Nodes (59): sampleRegion(), LayeredSolid, addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy() (+51 more)

### Community 17 - "compile"
Cohesion: 0.07
Nodes (54): areaFor(), condLabel(), constantValue(), define(), isStraight(), isVectorName(), itemFor(), restrict() (+46 more)

### Community 18 - "numerical.ts"
Cohesion: 0.08
Nodes (60): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Funzionalità, Glifo (+52 more)

### Community 19 - "FoldersStore"
Cohesion: 0.09
Nodes (20): Deletion, DeletionLog, cleanFolderName(), Folder, FolderGroup, FoldersStore, groupByFolder(), loadClosedFolders() (+12 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (42): b, bigops, c, calculus, fn, fr, fractions, functions (+34 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "account/space.ts"
Cohesion: 0.21
Nodes (17): accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf() (+9 more)

### Community 23 - "sidePanel.ts"
Cohesion: 0.12
Nodes (18): templateInsertion(), EditorMathContext, expand(), preferredIndex(), SuggestionController, SuggestionItem, CATEGORIES, cardPreviewTex() (+10 more)

### Community 24 - "domain.ts"
Cohesion: 0.10
Nodes (39): argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot(), fieldOn(), numericPartials() (+31 more)

### Community 25 - "MathError"
Cohesion: 0.13
Nodes (51): MathError, angleBetween(), asMatrix(), basisOf(), cross(), Ctx, dataOf(), determinant() (+43 more)

### Community 26 - "graph.ts"
Cohesion: 0.12
Nodes (28): AT_X, cellHtml(), cellText(), COMPASS, createEdgeCell(), createGraph(), drawSchema(), edgeLook() (+20 more)

### Community 27 - "assistant.ts"
Cohesion: 0.10
Nodes (21): @anthropic-ai/sdk, AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askThroughHost() (+13 more)

### Community 28 - "toLatex"
Cohesion: 0.07
Nodes (42): vitest, names(), STUDY_GRAPH, studyItems(), errorMessage(), ACCENT_COMMANDS, COMPLEX_FUNCTIONS, diffLatex() (+34 more)

### Community 29 - "account-test.mjs"
Cohesion: 0.08
Nodes (18): login(), waitFor(), b64(), CODE, createFakeSupabase(), handle(), rpc(), session() (+10 more)

### Community 30 - "spaces.ts"
Cohesion: 0.10
Nodes (41): decimalSeparator(), Digits, formatNumber(), formatRational(), fromNumber(), fromRational(), SUPERSCRIPT, writeDigits() (+33 more)

### Community 31 - "view3d.ts"
Cohesion: 0.12
Nodes (28): Face, planeSide(), planeTolerance(), Vec3, escapeXml(), arrowHead(), boxShape(), Coverage (+20 more)

### Community 32 - "several.ts"
Cohesion: 0.10
Nodes (46): Piece, Condition, Family, Group, Root, Shape, fractionNear(), at() (+38 more)

### Community 33 - "markdown.ts"
Cohesion: 0.11
Nodes (33): bulletGroup(), sameList(), alignInside(), asciiTrim(), findMarker(), isOrdered(), listAttrs(), listRule() (+25 more)

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
Cohesion: 0.13
Nodes (37): Dove sono le cose, bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel() (+29 more)

### Community 38 - "editor/lists.ts"
Cohesion: 0.09
Nodes (59): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+51 more)

### Community 39 - "resize.ts"
Cohesion: 0.13
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "sheet.ts"
Cohesion: 0.12
Nodes (43): expSumValue(), Eigenvalue, Lin, Definition, INFERENCE, parsed, SPACES, STATISTICS (+35 more)

### Community 41 - "Più avanti"
Cohesion: 0.06
Nodes (31): Comandi, Come controllare il lavoro, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole, Abbonamento e funzioni a pagamento (da capire), Account: i propri appunti su ogni dispositivo, anche da condividere (+23 more)

### Community 42 - "NotesStore"
Cohesion: 0.13
Nodes (11): createdAtFromId(), deriveTitle(), NotesStore, hasLocalStorage(), memory, migrateKeyPrefix(), readItem(), removeItem() (+3 more)

### Community 43 - "study.ts"
Cohesion: 0.16
Nodes (33): limit(), breaks(), periodOf(), Asymptote, compiled(), cutsOf(), defined(), domainOf() (+25 more)

### Community 44 - "shapes.ts"
Cohesion: 0.09
Nodes (14): @maxgraph/core, ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape (+6 more)

### Community 45 - "supabase.ts"
Cohesion: 0.08
Nodes (33): @supabase/supabase-js, AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, AccountSync, withLock(), Account, accountError (+25 more)

### Community 46 - "linsys.ts"
Cohesion: 0.13
Nodes (40): nameLatex(), FLOAT, rref(), choices(), gcd(), isStandardUnknown(), linearSystem(), matrixEquation() (+32 more)

### Community 47 - "complex.ts"
Cohesion: 0.06
Nodes (67): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexValue(), isInequality() (+59 more)

### Community 48 - "distributions.ts"
Cohesion: 0.19
Nodes (25): choose(), continuousQuantile(), factorialBig(), FAMILIES, integerParam(), invalid(), makeDistribution(), ONE (+17 more)

### Community 49 - "toolbar.ts"
Cohesion: 0.12
Nodes (13): @codemirror/commands, EditorCallbacks, MarkdownEditor, insertBlock(), insertTemplate(), wrapSelection(), Action, createToolbar() (+5 more)

### Community 50 - "conics.ts"
Cohesion: 0.18
Nodes (29): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+21 more)

### Community 51 - "editor/editor.ts"
Cohesion: 0.06
Nodes (50): @codemirror/language, @codemirror/state, @lezer/common, @lezer/highlight, acceptCalcResult(), calcPlugin, CalcResult, calcResults() (+42 more)

### Community 52 - "search.ts"
Cohesion: 0.17
Nodes (24): editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex() (+16 more)

### Community 53 - ".scope"
Cohesion: 0.16
Nodes (3): ExactComplexScope, definitionTarget(), scopeWithSets()

### Community 54 - "probability.ts"
Cohesion: 0.12
Nodes (26): addExp(), End, expSum, Family, subtractExp(), ExactScope, ALL, compileOf() (+18 more)

### Community 55 - "finite.ts"
Cohesion: 0.19
Nodes (26): countOf(), elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError, FiniteResult (+18 more)

### Community 56 - "inference.ts"
Cohesion: 0.14
Nodes (26): chiSquareTest(), confidence(), confidenceShown(), Given, hypothesisTest(), InferenceContext, interval(), meanOf() (+18 more)

### Community 57 - "insert.ts"
Cohesion: 0.08
Nodes (26): @codemirror/view, InsertOptions, toggleLinePrefix(), addPlaceholders, buildDecorations(), clearAllPlaceholders(), clearPlaceholders, contains() (+18 more)

### Community 58 - "Field"
Cohesion: 0.12
Nodes (7): characteristicPolynomial(), eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn()

### Community 59 - "SidePanel"
Cohesion: 0.17
Nodes (10): katex, cache, cleanKatexError(), renderTex(), renderTexOrError(), renderTexWithResult(), TexRender, isConfidentAnswer() (+2 more)

### Community 60 - "Rational"
Cohesion: 0.11
Nodes (24): Part, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactFunction, exactRoot(), factorialExact() (+16 more)

### Community 61 - "dependencies"
Cohesion: 0.09
Nodes (23): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+15 more)

### Community 62 - "schema/preview.ts"
Cohesion: 0.16
Nodes (12): Look, Theme, draw(), drawCached(), drawn, errorHtml(), fill(), hydrateSchemas() (+4 more)

### Community 63 - "schemaTools.test.ts"
Cohesion: 0.13
Nodes (18): alignBoxes(), Alignment, Box, distributeBoxes(), Position, crc32(), svgSize(), svgToPng() (+10 more)

### Community 64 - "settings.ts"
Cohesion: 0.13
Nodes (20): addPersonalWord(), DICTIONARY_KEY, loadPersonalWords(), savePersonalWords(), tidy(), ACCOUNT_SETTINGS, accountSettings(), AI_MODELS (+12 more)

### Community 65 - ".calculate"
Cohesion: 0.26
Nodes (5): withWorkLimit(), FormattedResult, parseCached(), splitPieces(), needsSymbols()

### Community 67 - "toNode"
Cohesion: 0.14
Nodes (31): EMPTY_SCOPE, absOf(), boundsOf(), close(), definite(), fourierProblem, fourierShown(), isTrig() (+23 more)

### Community 68 - "sql.ts"
Cohesion: 0.17
Nodes (18): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+10 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "MathNode"
Cohesion: 0.17
Nodes (10): Definition, Line, Ode, ExactRandom, Elem, FiniteContext, differentialRequest, pieces() (+2 more)

### Community 72 - ".folderItem"
Cohesion: 0.20
Nodes (4): clear(), formatDate(), NotesPanel, NotesPanelDeps

### Community 73 - "statsGraph.ts"
Cohesion: 0.17
Nodes (19): FieldContext, isTestLine(), number(), testItems(), classes(), dataOf(), distributionExtent(), distributionLabel() (+11 more)

### Community 74 - "Distribution"
Cohesion: 0.21
Nodes (8): discreteQuantile(), Distribution, exactIntervalProbability(), integerRange(), intervalProbability(), pValue(), TestResult, setProbability()

### Community 75 - "parseSchema"
Cohesion: 0.17
Nodes (15): base64(), hide(), OPEN, schemasForFile(), schemasFromFile(), unhide(), isRecord(), num() (+7 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "limits.ts"
Cohesion: 0.31
Nodes (12): fracTex(), fracText(), nearFraction(), piMultiple(), surd(), close(), LimitPath, oneSided() (+4 more)

### Community 78 - "severalGraph.ts"
Cohesion: 0.40
Nodes (9): criticalLine(), isSeveralLine(), named(), severalItems(), surface(), bounded(), extremaOf(), optimumOf() (+1 more)

### Community 83 - "files.ts"
Cohesion: 0.22
Nodes (14): inClaudeViewer(), canWriteFilesDirectly(), downloadBlob(), downloadText(), fileNameFor(), FsWindow, isAbort(), MD_TYPES (+6 more)

## Knowledge Gaps
- **461 isolated node(s):** `session-start.sh script`, `name`, `private`, `version`, `description` (+456 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 609 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `toLatex` to `Sheet`, `main.ts`, `sync.ts`, `arithmetic.ts`, `num`, `svg.ts`, `complex.test.ts`, `graph/space.ts`, `FoldersStore`, `account/space.ts`, `sidePanel.ts`, `MathError`, `assistant.ts`, `account-test.mjs`, `markdown.ts`, `package.json`, `spell.test.ts`, `editor/lists.ts`, `resize.ts`, `supabase.ts`, `linsys.ts`, `distributions.ts`, `toolbar.ts`, `editor/editor.ts`, `search.ts`, `insert.ts`, `schemaTools.test.ts`, `settings.ts`, `sql.ts`, `parseSchema`?**
  _High betweenness centrality (0.130) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `Dove sono le cose` to `Sheet`, `parse.ts`, `odesolve.ts`, `spec.ts`, `arithmetic.ts`, `graph/preview.ts`, `schema/editor.ts`, `symbolic.ts`, `svg.ts`, `graph/space.ts`, `compile`, `numerical.ts`, `domain.ts`, `MathError`, `several.ts`, `logic.ts`, `sheet.ts`, `Più avanti`, `study.ts`, `linsys.ts`, `complex.ts`, `conics.ts`, `editor/editor.ts`, `.scope`, `probability.ts`, `finite.ts`, `inference.ts`, `schema/preview.ts`, `schemaTools.test.ts`, `.calculate`, `toNode`, `limits.ts`, `severalGraph.ts`?**
  _High betweenness centrality (0.059) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `main.ts`, `spell.test.ts`, `editor/lists.ts`, `resize.ts`, `.folderItem`, `schema/editor.ts`, `SchemaEditor`, `toolbar.ts`, `FoldersStore`, `sidePanel.ts`, `SidePanel`, `schema/preview.ts`, `schemaTools.test.ts`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **What connects `session-start.sh script`, `name`, `private` to the rest of the system?**
  _461 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Sheet` be split into smaller, more focused modules?**
  _Cohesion score 0.10416666666666667 - nodes in this community are weakly interconnected._
- **Should `parse.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07785087719298246 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05372405372405373 - nodes in this community are weakly interconnected._