# Graph Report - matherdown  (2026-10-04)

## Corpus Check
- 218 files · ~394,703 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 3455 nodes · 12517 edges · 96 communities (84 shown, 12 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 330 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b6b77a67`
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
- Sheet
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
- spaces.ts
- view3d.ts
- laplace.ts
- markdown.ts
- logic.ts
- editor/editor.ts
- editor.test.ts
- sheet.ts
- define.ts
- resize.ts
- statsShown.ts
- graph/file.ts
- NotesStore
- study.ts
- .renderFormat
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
- graph.ts
- dependencies
- schema/preview.ts
- MathNode
- inference.ts
- Distribution
- suggestions.ts
- tutorial.mjs
- sql.ts
- Benvenuto in Glifo
- compilerOptions
- grafo-html.mjs
- linear.test.ts
- statsGraph.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- parseSchema
- session-start.sh
- .claude/CLAUDE.md
- Più avanti
- .openSql
- logo.ts
- supabase-stub.sql
- account-test.mjs
- devDependencies
- scripts
- smoke-test.mjs

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

## Communities (96 total, 12 thin omitted)

### Community 0 - "solve.ts"
Cohesion: 0.17
Nodes (24): isStandardUnknown(), linearSystem(), RelOp, breaks(), cubeRoot(), equation(), holds(), inequality() (+16 more)

### Community 1 - "parse.ts"
Cohesion: 0.08
Nodes (39): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe(), differentialInFraction() (+31 more)

### Community 2 - "main.ts"
Cohesion: 0.05
Nodes (94): graphsForFile(), graphsFromFile(), hide(), unhide(), account, active, app, applyAccountChange() (+86 more)

### Community 3 - "odesolve.ts"
Cohesion: 0.08
Nodes (77): addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames(), constantParticular() (+69 more)

### Community 4 - "sync.ts"
Cohesion: 0.05
Nodes (39): @electric-sql/pglite, AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow (+31 more)

### Community 5 - "spec.ts"
Cohesion: 0.06
Nodes (72): conicItems(), isConicLine(), quadricEquation(), isComplexLine(), onlyComplex(), isNumericalLine(), numericalItems(), Multiple (+64 more)

### Community 6 - "arithmetic.ts"
Cohesion: 0.11
Nodes (42): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+34 more)

### Community 7 - "num"
Cohesion: 0.13
Nodes (80): atIntegers(), withoutAbs(), hyperbolicToExp(), polyEx(), halfRoot(), homogeneousGroups(), similarSolution(), squareRoot() (+72 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (39): addLabel(), boxes, cameras, complexCoord(), coord(), drawings, drawnViews, endTex() (+31 more)

### Community 9 - "schema/editor.ts"
Cohesion: 0.05
Nodes (67): alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ARROW_NAMES, AT_ICONS (+59 more)

### Community 10 - "symbolic.ts"
Cohesion: 0.08
Nodes (49): linearIn(), verified(), atValues(), Converter, coordinates(), decimalText(), definiteParts(), denominators() (+41 more)

### Community 11 - "toLatex"
Cohesion: 0.08
Nodes (44): FieldContext, fourierItems(), isFourierLine(), criticalLine(), isSeveralLine(), named(), severalItems(), surface() (+36 more)

### Community 12 - "svg.ts"
Cohesion: 0.10
Nodes (51): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), domainEdge(), features() (+43 more)

### Community 13 - "linsys.ts"
Cohesion: 0.13
Nodes (43): choices(), gcd(), matrixEquation(), matrixSystem(), minorsGcd(), ONE, parametricRows(), parametricSystem() (+35 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.11
Nodes (3): SchemaEditor, createEdgeCell(), serializeSchema()

### Community 15 - "Sheet"
Cohesion: 0.06
Nodes (45): vitest, formulaGraph(), GraphItem, errorMessage(), parseMath(), calculationRequest(), parseCached(), Sheet (+37 more)

### Community 16 - "graph/space.ts"
Cohesion: 0.13
Nodes (41): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+33 more)

### Community 17 - "compile"
Cohesion: 0.07
Nodes (61): areaFor(), areaOf(), condLabel(), constantValue(), define(), isStraight(), isVectorName(), itemFor() (+53 more)

### Community 18 - "numerical.ts"
Cohesion: 0.08
Nodes (61): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Funzionalità (+53 more)

### Community 19 - "FoldersStore"
Cohesion: 0.07
Nodes (19): cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder(), loadClosedFolders(), RemoteFolder (+11 more)

### Community 20 - "index.ts"
Cohesion: 0.11
Nodes (21): b, bigops, c, calculus, fn, fr, fractions, functions (+13 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "Rational"
Cohesion: 0.11
Nodes (19): expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactRandom, exactRoot(), factorialExact() (+11 more)

### Community 23 - "conics.ts"
Cohesion: 0.18
Nodes (29): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+21 more)

### Community 24 - "several.ts"
Cohesion: 0.08
Nodes (54): close(), Definite, definiteIntegral(), exValue(), samples(), EMPTY_SCOPE, Piece, LimitValue (+46 more)

### Community 25 - "MathError"
Cohesion: 0.12
Nodes (60): MathError, formatNumber(), angleBetween(), asMatrix(), basisOf(), circleText(), complexText(), cross() (+52 more)

### Community 26 - "h"
Cohesion: 0.05
Nodes (65): SyncStatus, inClaudeViewer(), helpButton, openGuide(), canWriteFilesDirectly(), FsWindow, isAbort(), MD_TYPES (+57 more)

### Community 27 - "assistant.ts"
Cohesion: 0.10
Nodes (21): @anthropic-ai/sdk, AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askThroughHost() (+13 more)

### Community 28 - "spell.test.ts"
Cohesion: 0.08
Nodes (23): @codemirror/lang-markdown, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt() (+15 more)

### Community 29 - "fake-supabase.mjs"
Cohesion: 0.22
Nodes (11): b64(), CODE, createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom() (+3 more)

### Community 30 - "spaces.ts"
Cohesion: 0.13
Nodes (27): decimalSeparator(), Digits, formatRational(), fromNumber(), fromRational(), SUPERSCRIPT, writeDigits(), eigenvectors() (+19 more)

### Community 31 - "view3d.ts"
Cohesion: 0.09
Nodes (41): tickLabel(), Face, lerp(), planeSide(), planeTolerance(), regionFaces(), splitFace(), splitLine() (+33 more)

### Community 32 - "laplace.ts"
Cohesion: 0.09
Nodes (63): factoredPolynomial(), numShown(), polynomialOf(), polyShown(), ruffiniShown(), absOf(), boundsOf(), close() (+55 more)

### Community 33 - "markdown.ts"
Cohesion: 0.08
Nodes (44): bulletGroup(), sameList(), cache, cleanKatexError(), escapeHtml(), renderTex(), renderTexMathml(), renderTexOrError() (+36 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "editor/editor.ts"
Cohesion: 0.06
Nodes (36): description, name, private, type, version, @codemirror/autocomplete, @codemirror/commands, @codemirror/language (+28 more)

### Community 36 - "editor.test.ts"
Cohesion: 0.09
Nodes (19): addPlaceholders, buildDecorations(), clearAllPlaceholders(), clearPlaceholders, CommandTarget, contains(), currentIndex(), filledMark (+11 more)

### Community 37 - "sheet.ts"
Cohesion: 0.07
Nodes (56): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+48 more)

### Community 38 - "define.ts"
Cohesion: 0.11
Nodes (20): g, greek, ch, chemistry, m, misc, o, operators (+12 more)

### Community 39 - "resize.ts"
Cohesion: 0.13
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "statsShown.ts"
Cohesion: 0.17
Nodes (32): Lin, check(), correlation(), count(), covariance(), Data, DATA_FUNCTIONS, dataStatistic() (+24 more)

### Community 41 - "graph/file.ts"
Cohesion: 0.14
Nodes (23): graphImage(), graphImagesFor(), OPEN, staticGraphSvg(), chooseWindow(), specFor(), chooseBox(), surfacePlane() (+15 more)

### Community 42 - "NotesStore"
Cohesion: 0.08
Nodes (30): accountSpace(), adoptGuestNotes(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf(), setCurrentAccount() (+22 more)

### Community 43 - "study.ts"
Cohesion: 0.17
Nodes (32): nameLatex(), limit(), Asymptote, compiled(), cutsOf(), defined(), domainOf(), exact() (+24 more)

### Community 44 - ".renderFormat"
Cohesion: 0.15
Nodes (13): fieldInput(), textWidth(), edgeLook(), edgeStyle(), edgeTextAt(), insertSchema(), nodeLook(), nodeStyle() (+5 more)

### Community 45 - "supabase.ts"
Cohesion: 0.11
Nodes (35): @supabase/supabase-js, AUTH_STORAGE_KEY, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken() (+27 more)

### Community 46 - "probability.ts"
Cohesion: 0.14
Nodes (22): End, Family, CompileOptions, ALL, complement(), endAt(), EventContext, eventSet() (+14 more)

### Community 47 - "complex.ts"
Cohesion: 0.05
Nodes (80): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexValue(), isInequality() (+72 more)

### Community 48 - "distributions.ts"
Cohesion: 0.18
Nodes (26): choose(), continuousQuantile(), discreteQuantile(), factorialBig(), FAMILIES, integerParam(), invalid(), makeDistribution() (+18 more)

### Community 49 - "toolbar.ts"
Cohesion: 0.12
Nodes (15): EditorCallbacks, MarkdownEditor, insertBlock(), insertTemplate(), wrapSelection(), Action, createToolbar(), insertCode() (+7 more)

### Community 50 - "page.ts"
Cohesion: 0.07
Nodes (46): SUPABASE_KEY, SUPABASE_URL, accountDataFile(), currentAccount(), PullResult, openShareDialog(), changeAccess(), changeCopy() (+38 more)

### Community 51 - "graphNote.test.ts"
Cohesion: 0.08
Nodes (32): @lezer/common, acceptCalcResult(), calcPlugin, CalcResult, calcResults(), formulasUntil(), insertResult(), ResultWidget (+24 more)

### Community 52 - "search.ts"
Cohesion: 0.16
Nodes (25): SuggestionItem, editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase() (+17 more)

### Community 53 - "editor/lists.ts"
Cohesion: 0.10
Nodes (55): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+47 more)

### Community 54 - "domain.ts"
Cohesion: 0.09
Nodes (47): constantIntegrand(), depth(), inequalityMargin(), integralRegion, LayeredSolid, multipleOf(), planeMargin(), planeParts() (+39 more)

### Community 55 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "insert.ts"
Cohesion: 0.16
Nodes (14): @codemirror/state, @codemirror/view, InsertOptions, toggleLinePrefix(), besideSchema(), guardBlocks(), schemaBlockRanges(), schemaBlocks() (+6 more)

### Community 58 - ".int"
Cohesion: 0.12
Nodes (7): eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn(), R()

### Community 59 - "SidePanel"
Cohesion: 0.22
Nodes (6): isConfidentAnswer(), symbolsInCategory(), SymbolForm, displayCode(), preventFocusSteal(), SidePanel

### Community 60 - "graph.ts"
Cohesion: 0.06
Nodes (35): @maxgraph/core, AT_X, cellHtml(), cellText(), COMPASS, createGraph(), drawSchema(), isEdgeLook() (+27 more)

### Community 61 - "dependencies"
Cohesion: 0.09
Nodes (23): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+15 more)

### Community 62 - "schema/preview.ts"
Cohesion: 0.13
Nodes (16): GraphLook, hydrateGraphs(), Look, Theme, draw(), drawCached(), drawn, errorHtml() (+8 more)

### Community 63 - "MathNode"
Cohesion: 0.11
Nodes (17): Dove sono le cose, typedSliderValue(), ExactComplexScope, expSumValue(), withWorkLimit(), ExactScope, FiniteContext, FormattedResult (+9 more)

### Community 64 - "inference.ts"
Cohesion: 0.19
Nodes (22): confidence(), confidenceShown(), Given, hypothesisTest(), interval(), meanOf(), nameOf(), num() (+14 more)

### Community 65 - "Distribution"
Cohesion: 0.13
Nodes (12): addExp(), Distribution, exactIntervalProbability(), integerRange(), intervalProbability(), subtractExp(), pValue(), rejection() (+4 more)

### Community 66 - "suggestions.ts"
Cohesion: 0.13
Nodes (13): templateInsertion(), EditorMathContext, expand(), preferredIndex(), SuggestionController, CATEGORIES, cardPreviewTex(), formPreviewTex() (+5 more)

### Community 67 - "tutorial.mjs"
Cohesion: 0.20
Nodes (6): centerOf(), clickOn(), ffmpeg, SCENES, SIZE, work

### Community 68 - "sql.ts"
Cohesion: 0.18
Nodes (16): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+8 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "grafo-html.mjs"
Cohesion: 0.17
Nodes (5): graphFile, names, namesFile, root, PNG_ICONS

### Community 72 - "linear.test.ts"
Cohesion: 0.29
Nodes (7): EXACT, FLOAT, A, B, q(), result(), text()

### Community 73 - "statsGraph.ts"
Cohesion: 0.22
Nodes (15): isTestLine(), number(), testItems(), classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX (+7 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "parseSchema"
Cohesion: 0.14
Nodes (19): base64(), hide(), OPEN, schemasForFile(), schemasFromFile(), unhide(), crc32(), svgSize() (+11 more)

### Community 82 - "Più avanti"
Cohesion: 0.06
Nodes (32): Comandi, Come controllare il lavoro, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole, Abbonamento e funzioni a pagamento (da capire), Account: i propri appunti su ogni dispositivo, anche da condividere (+24 more)

### Community 83 - ".openSql"
Cohesion: 0.47
Nodes (4): loadDialect(), downloadBlob(), downloadText(), fileNameFor()

### Community 92 - "logo.ts"
Cohesion: 0.48
Nodes (4): glyph(), LOGO_COLOR, logoIcon(), logoMark()

### Community 96 - "account-test.mjs"
Cohesion: 0.20
Nodes (4): device(), login(), newContext, waitFor()

### Community 98 - "devDependencies"
Cohesion: 0.22
Nodes (9): devDependencies, @electric-sql/pglite, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite, vite-plugin-pwa (+1 more)

### Community 101 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 103 - "smoke-test.mjs"
Cohesion: 0.25
Nodes (5): markdown-it, playwright-core, vite, firstVisit(), plainContext

## Knowledge Gaps
- **489 isolated node(s):** `session-start.sh script`, `name`, `private`, `version`, `description` (+484 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 665 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `Sheet` to `main.ts`, `sync.ts`, `num`, `schema/editor.ts`, `svg.ts`, `FoldersStore`, `h`, `assistant.ts`, `spell.test.ts`, `markdown.ts`, `editor/editor.ts`, `editor.test.ts`, `sheet.ts`, `resize.ts`, `graph/file.ts`, `NotesStore`, `supabase.ts`, `distributions.ts`, `page.ts`, `graphNote.test.ts`, `search.ts`, `editor/lists.ts`, `insert.ts`, `suggestions.ts`, `sql.ts`, `linear.test.ts`, `parseSchema`, `logo.ts`?**
  _High betweenness centrality (0.120) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `MathNode` to `parse.ts`, `main.ts`, `odesolve.ts`, `spec.ts`, `arithmetic.ts`, `schema/editor.ts`, `symbolic.ts`, `toLatex`, `svg.ts`, `linsys.ts`, `Sheet`, `graph/space.ts`, `compile`, `numerical.ts`, `Rational`, `conics.ts`, `several.ts`, `MathError`, `h`, `laplace.ts`, `markdown.ts`, `logic.ts`, `sheet.ts`, `study.ts`, `.renderFormat`, `supabase.ts`, `complex.ts`, `graphNote.test.ts`, `finite.ts`, `schema/preview.ts`, `inference.ts`, `Più avanti`?**
  _High betweenness centrality (0.070) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `main.ts`, `resize.ts`, `schema/editor.ts`, `.renderFormat`, `SchemaEditor`, `toolbar.ts`, `page.ts`, `FoldersStore`, `.openSql`, `SidePanel`, `spell.test.ts`, `schema/preview.ts`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **What connects `session-start.sh script`, `name`, `private` to the rest of the system?**
  _489 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `parse.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07689003436426117 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.045283018867924525 - nodes in this community are weakly interconnected._
- **Should `odesolve.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08258408258408259 - nodes in this community are weakly interconnected._