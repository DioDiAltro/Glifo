# Graph Report - matherdown  (2026-10-04)

## Corpus Check
- 219 files · ~403,508 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 3498 nodes · 12752 edges · 109 communities (92 shown, 17 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 342 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `318d9d39`
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
- graph.ts
- svg.ts
- Rational
- SchemaEditor
- editor/lists.ts
- graph/space.ts
- compile
- numerical.ts
- FoldersStore
- index.ts
- engine.ts
- exact.ts
- conics.ts
- several.ts
- MathError
- h
- assistant.ts
- spell.test.ts
- fake-supabase.mjs
- formatNumber
- view3d.ts
- inference.ts
- markdown.ts
- logic.ts
- MathNode
- graphNote.test.ts
- Dove sono le cose
- gauss.ts
- resize.ts
- statsShown.ts
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
- image.ts
- files.ts
- finite.ts
- 20261004091555_note_condivise.sql
- schemaBlocks.ts
- Field
- SidePanel
- shapes.ts
- dependencies
- schema/preview.ts
- database.ts
- .int
- markers.ts
- templates.ts
- tutorial.mjs
- sql.ts
- Benvenuto in Glifo
- compilerOptions
- smoke-test.mjs
- Parser
- statsGraph.ts
- editor.test.ts
- toolbar.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- logo.ts
- graph/file.ts
- session-start.sh
- .claude/CLAUDE.md
- Glifo
- sidePanel.ts
- Abbonamenti
- SuggestionController
- laplace.ts
- supabase-stub.sql
- account-test.mjs
- Più avanti
- sheet.ts
- icons.mjs
- Distribution
- toLatex
- compileComplex
- powerseries.ts
- scripts
- Il database degli account (Supabase)
- intervalProbability

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
- `Dove sono le cose` --references--> `sharedLinks()`  [INFERRED]
  CLAUDE.md → src/account/supabase.ts
- `Dove sono le cose` --references--> `shareNote()`  [INFERRED]
  CLAUDE.md → src/account/supabase.ts
- `Dove sono le cose` --references--> `addToGraphBlock()`  [INFERRED]
  CLAUDE.md → src/editor/graphInsert.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (109 total, 17 thin omitted)

### Community 0 - "solve.ts"
Cohesion: 0.11
Nodes (38): exponentialForm(), fracTex(), fracText(), nearFraction(), piMultiple(), surd(), FormatOptions, close() (+30 more)

### Community 1 - "parse.ts"
Cohesion: 0.06
Nodes (37): hasWord(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, differentialInFraction() (+29 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (93): graphsFromFile(), unhide(), account, accountProblem(), active, app, applyAccountChange(), applySpellcheck() (+85 more)

### Community 3 - "odesolve.ts"
Cohesion: 0.08
Nodes (85): linearIn(), termTransform(), addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled() (+77 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (33): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+25 more)

### Community 5 - "spec.ts"
Cohesion: 0.06
Nodes (77): conicItems(), isConicLine(), quadricEquation(), isComplexLine(), isNumericalLine(), numericalItems(), depth(), Multiple (+69 more)

### Community 6 - "arithmetic.ts"
Cohesion: 0.11
Nodes (43): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+35 more)

### Community 7 - "num"
Cohesion: 0.13
Nodes (85): atIntegers(), withoutAbs(), exp(), hyperbolicToExp(), inverseRational(), R(), sqrtEx(), polyEx() (+77 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (41): addLabel(), boxes, cameras, complexCoord(), coord(), drawings, drawnViews, endTex() (+33 more)

### Community 9 - "schema/editor.ts"
Cohesion: 0.06
Nodes (54): alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ARROW_NAMES, AT_ICONS (+46 more)

### Community 10 - "symbolic.ts"
Cohesion: 0.07
Nodes (59): primitive(), verified(), atValues(), cancelLinear(), Converter, coordinates(), decimalText(), definiteParts() (+51 more)

### Community 11 - "graph.ts"
Cohesion: 0.10
Nodes (30): AT_X, cellHtml(), cellText(), COMPASS, createEdgeCell(), createGraph(), drawSchema(), edgeLook() (+22 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (53): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), domainEdge(), features() (+45 more)

### Community 13 - "Rational"
Cohesion: 0.11
Nodes (45): factorsOf(), Part, R(), Rational, choices(), minorsGcd(), ONE, parametricRows() (+37 more)

### Community 15 - "editor/lists.ts"
Cohesion: 0.17
Nodes (31): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+23 more)

### Community 16 - "graph/space.ts"
Cohesion: 0.11
Nodes (51): LayeredSolid, addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon() (+43 more)

### Community 17 - "compile"
Cohesion: 0.05
Nodes (106): constantIntegrand(), inequalityMargin(), integralRegion, planeMargin(), planeParts(), radiusOf(), spaceLayers(), spaceMargin() (+98 more)

### Community 18 - "numerical.ts"
Cohesion: 0.12
Nodes (47): bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial(), interpolating() (+39 more)

### Community 19 - "FoldersStore"
Cohesion: 0.18
Nodes (4): cleanFolderName(), FoldersStore, sameName(), StoreOptions

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (41): b, bigops, c, calculus, fn, fr, fractions, functions (+33 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "exact.ts"
Cohesion: 0.21
Nodes (14): bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactRandom, exactRoot(), ExactUnavailable, factorialExact() (+6 more)

### Community 23 - "conics.ts"
Cohesion: 0.18
Nodes (28): at(), centralCanonical(), coneCanonical(), ConicElements, ConicInfo, conicOf(), det2(), det3() (+20 more)

### Community 24 - "several.ts"
Cohesion: 0.15
Nodes (35): severalLimit, at(), bounded(), Candidate, candidates(), compiled(), COORDS, coordShown() (+27 more)

### Community 25 - "MathError"
Cohesion: 0.12
Nodes (56): MathError, angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, dataOf() (+48 more)

### Community 26 - "h"
Cohesion: 0.06
Nodes (48): SyncStatus, helpButton, openGuide(), viewSwitch, Settings, AccountButton, confirmAccountDeletion(), messageOf() (+40 more)

### Community 27 - "assistant.ts"
Cohesion: 0.12
Nodes (20): @anthropic-ai/sdk, AiAnswer, AiError, AiSettings, ANSWER_SCHEMA, askAi(), askThroughHost(), checkShape() (+12 more)

### Community 28 - "spell.test.ts"
Cohesion: 0.08
Nodes (23): @codemirror/lang-markdown, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt() (+15 more)

### Community 29 - "fake-supabase.mjs"
Cohesion: 0.22
Nodes (11): b64(), CODE, createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom() (+3 more)

### Community 30 - "formatNumber"
Cohesion: 0.10
Nodes (38): decimalSeparator(), Digits, formatNumber(), formatRational(), fromNumber(), fromRational(), SUPERSCRIPT, writeDigits() (+30 more)

### Community 31 - "view3d.ts"
Cohesion: 0.09
Nodes (38): tickLabel(), Box, Detail, Face, FAST, FINE, planeTolerance(), Plane (+30 more)

### Community 32 - "inference.ts"
Cohesion: 0.16
Nodes (24): chiSquareTest(), confidence(), confidenceShown(), Given, hypothesisTest(), InferenceContext, interval(), meanOf() (+16 more)

### Community 33 - "markdown.ts"
Cohesion: 0.10
Nodes (31): dompurify, highlight.js, markdown-it-footnote, lineDepth(), parseBlockMath(), renderTexOrError(), renderTexWithResult(), configurePurify() (+23 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "MathNode"
Cohesion: 0.08
Nodes (31): ExactComplexScope, Ode, withWorkLimit(), FiniteContext, FormattedResult, Mat, MathNode, definitionTarget() (+23 more)

### Community 36 - "graphNote.test.ts"
Cohesion: 0.12
Nodes (19): acceptCalcResult(), calcPlugin, CalcResult, calcResults(), formulasUntil(), insertResult(), ResultWidget, sheetBefore() (+11 more)

### Community 37 - "Dove sono le cose"
Cohesion: 0.12
Nodes (38): Dove sono le cose, bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel() (+30 more)

### Community 38 - "gauss.ts"
Cohesion: 0.13
Nodes (24): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexValue(), isInequality() (+16 more)

### Community 39 - "resize.ts"
Cohesion: 0.13
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "statsShown.ts"
Cohesion: 0.19
Nodes (29): Lin, check(), correlation(), count(), covariance(), Data, dataStatistic(), deviation() (+21 more)

### Community 42 - "NotesStore"
Cohesion: 0.06
Nodes (48): accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf() (+40 more)

### Community 43 - "study.ts"
Cohesion: 0.10
Nodes (44): close(), Definite, definiteIntegral(), exValue(), samples(), EMPTY_SCOPE, Piece, limit() (+36 more)

### Community 44 - "parseSchema"
Cohesion: 0.12
Nodes (24): graphsForFile(), hide(), markdownForFile(), findFencedBlocks(), findSchemaBlocks(), OpenFence, SchemaBlock, schemaBlockAtLine() (+16 more)

### Community 45 - "supabase.ts"
Cohesion: 0.11
Nodes (32): @supabase/supabase-js, AUTH_STORAGE_KEY, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken() (+24 more)

### Community 46 - "probability.ts"
Cohesion: 0.14
Nodes (22): End, Family, Interval, ALL, complement(), endAt(), EventContext, eventSet() (+14 more)

### Community 47 - "complex.ts"
Cohesion: 0.08
Nodes (25): add(), arg(), compileName(), ComplexCompiled, ComplexVars, conjugateOf(), constant(), cos() (+17 more)

### Community 48 - "distributions.ts"
Cohesion: 0.20
Nodes (24): choose(), factorialBig(), FAMILIES, integerParam(), invalid(), makeDistribution(), ONE, positiveParam() (+16 more)

### Community 49 - "editor/editor.ts"
Cohesion: 0.07
Nodes (30): description, name, private, type, version, @codemirror/autocomplete, @codemirror/commands, @codemirror/language-data (+22 more)

### Community 50 - "page.ts"
Cohesion: 0.07
Nodes (41): SUPABASE_KEY, SUPABASE_URL, accountDataFile(), PullResult, openShareDialog(), changeAccess(), changeCopy(), refreshChanged() (+33 more)

### Community 51 - "severalGraph.ts"
Cohesion: 0.21
Nodes (15): FieldContext, fourierItems(), isFourierLine(), criticalLine(), isSeveralLine(), named(), severalItems(), surface() (+7 more)

### Community 52 - "search.ts"
Cohesion: 0.18
Nodes (22): editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex() (+14 more)

### Community 53 - "image.ts"
Cohesion: 0.48
Nodes (6): base64(), crc32(), svgSize(), svgToPng(), withDensity(), chunks()

### Community 54 - "files.ts"
Cohesion: 0.21
Nodes (14): inClaudeViewer(), canWriteFilesDirectly(), downloadBlob(), downloadText(), fileNameFor(), FsWindow, isAbort(), MD_TYPES (+6 more)

### Community 55 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "schemaBlocks.ts"
Cohesion: 0.15
Nodes (11): @codemirror/view, toggleLinePrefix(), guardBlocks(), schemaBlocks(), SchemaWidget, summary(), heading(), schemas() (+3 more)

### Community 58 - "Field"
Cohesion: 0.13
Nodes (5): eigenvalues(), Field, interpolate(), interpolateFloat(), polynomialIn()

### Community 59 - "SidePanel"
Cohesion: 0.24
Nodes (5): cleanKatexError(), renderTex(), displayCode(), preventFocusSteal(), SidePanel

### Community 60 - "shapes.ts"
Cohesion: 0.09
Nodes (15): @maxgraph/core, ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape (+7 more)

### Community 61 - "dependencies"
Cohesion: 0.06
Nodes (32): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+24 more)

### Community 62 - "schema/preview.ts"
Cohesion: 0.16
Nodes (12): Look, Theme, draw(), drawCached(), drawn, errorHtml(), fill(), hydrateSchemas() (+4 more)

### Community 63 - "database.ts"
Cohesion: 0.24
Nodes (6): @electric-sql/pglite, createDatabase(), createUser(), databaseTests(), migrations, shareTests()

### Community 64 - ".int"
Cohesion: 0.17
Nodes (8): evaluateExactComplex(), exactSqrt(), GaussRational, unavailable(), slope(), waveOf(), quadraticIn(), R()

### Community 65 - "markers.ts"
Cohesion: 0.11
Nodes (36): Item, ListStyle, bullet(), bulletGroup(), childMarker(), column(), firstMarker(), label() (+28 more)

### Community 66 - "templates.ts"
Cohesion: 0.10
Nodes (18): DEFAULT_EDGE, NodeLook, SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), tableMetrics(), conceptMap (+10 more)

### Community 67 - "tutorial.mjs"
Cohesion: 0.12
Nodes (10): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+2 more)

### Community 68 - "sql.ts"
Cohesion: 0.15
Nodes (20): SchemaEditorOptions, Schema, Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey() (+12 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "smoke-test.mjs"
Cohesion: 0.29
Nodes (4): markdown-it, vite, firstVisit(), plainContext

### Community 73 - "statsGraph.ts"
Cohesion: 0.20
Nodes (16): isTestLine(), number(), testItems(), classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX (+8 more)

### Community 74 - "editor.test.ts"
Cohesion: 0.08
Nodes (32): @codemirror/language, @codemirror/state, InsertOptions, templateInsertion(), CODE_NODES, CommandToken, commandTokenAt(), EditorMathContext (+24 more)

### Community 75 - "toolbar.ts"
Cohesion: 0.11
Nodes (17): closeMathBlockOnEnter(), EditorCallbacks, MarkdownEditor, tabOutOfMath(), insertBlock(), insertTemplate(), wrapSelection(), Action (+9 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "logo.ts"
Cohesion: 0.33
Nodes (6): sidebarToggle(), BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark()

### Community 79 - "graph/file.ts"
Cohesion: 0.20
Nodes (15): graphImage(), graphImagesFor(), OPEN, staticGraphSvg(), chooseWindow(), chooseBox(), areaColor(), DrawOptions (+7 more)

### Community 82 - "Glifo"
Cohesion: 0.15
Nodes (13): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Funzionalità (+5 more)

### Community 83 - "sidePanel.ts"
Cohesion: 0.13
Nodes (18): katex, AiResult, SuggestionItem, cache, TexRender, isConfidentAnswer(), SearchResult, CATEGORIES (+10 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.11
Nodes (18): Abbonamenti, Classico, gratis: per scrivere e controllare, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Fonti (controllate il 4 ottobre 2026), I prezzi, Il parere di Claude, in breve (+10 more)

### Community 91 - "SuggestionController"
Cohesion: 0.20
Nodes (5): expand(), preferredIndex(), SuggestionController, parseTemplate(), templateText()

### Community 92 - "laplace.ts"
Cohesion: 0.12
Nodes (47): factoredPolynomial(), numShown(), polyShown(), absOf(), boundsOf(), close(), definite(), fourierProblem (+39 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.20
Nodes (4): device(), login(), newContext, waitFor()

### Community 97 - "Più avanti"
Cohesion: 0.14
Nodes (14): Abbonamento e funzioni a pagamento (da capire), Account: i propri appunti su ogni dispositivo, anche da condividere, Aiuto con gli esercizi, Altre idee, Calcoli e grafici: idee in più, Controllare e mostrare quello che si scrive, Idee per il futuro, In programma (+6 more)

### Community 98 - "sheet.ts"
Cohesion: 0.07
Nodes (32): formatGauss(), formatList(), join(), expSumValue(), ExactFunction, ExactScope, characteristicPolynomial(), EXACT (+24 more)

### Community 101 - "Distribution"
Cohesion: 0.15
Nodes (10): addExp(), Distribution, exactIntervalProbability(), expSum, subtractExp(), rejection(), TestResult, divideExp() (+2 more)

### Community 102 - "toLatex"
Cohesion: 0.05
Nodes (60): vitest, GraphItem, parseGraph(), names(), studyItems(), errorMessage(), ACCENT_COMMANDS, COMPLEX_FUNCTIONS (+52 more)

### Community 103 - "compileComplex"
Cohesion: 0.38
Nodes (8): asin(), atan(), compileApply(), compileComplex(), compileFunction(), exp(), log(), pow()

### Community 105 - "powerseries.ts"
Cohesion: 0.31
Nodes (10): convergesAt(), gcdInt(), logParts(), nearConstant(), PowerSeries, powerSeriesOf(), powerSeriesShown(), radius() (+2 more)

### Community 106 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 107 - "Il database degli account (Supabase)"
Cohesion: 0.09
Nodes (18): Comandi, Come controllare il lavoro, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole, Accesso con Google, Cambiare il database (+10 more)

### Community 108 - "intervalProbability"
Cohesion: 0.29
Nodes (6): continuousQuantile(), discreteQuantile(), integerRange(), intervalProbability(), pValue(), setProbability()

## Knowledge Gaps
- **507 isolated node(s):** `La proposta dello studente (4 ottobre 2026)`, `Il parere di Claude, in breve`, `Come si decide cosa far pagare`, `Classico, gratis: per scrivere e controllare`, `Super: per studiare` (+502 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 680 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `toLatex` to `main.ts`, `sync.ts`, `num`, `schema/editor.ts`, `svg.ts`, `Rational`, `editor/lists.ts`, `graph/space.ts`, `h`, `assistant.ts`, `spell.test.ts`, `markdown.ts`, `MathNode`, `graphNote.test.ts`, `resize.ts`, `NotesStore`, `parseSchema`, `supabase.ts`, `distributions.ts`, `editor/editor.ts`, `page.ts`, `search.ts`, `schemaBlocks.ts`, `database.ts`, `markers.ts`, `sql.ts`, `editor.test.ts`, `logo.ts`, `graph/file.ts`, `sidePanel.ts`, `sheet.ts`?**
  _High betweenness centrality (0.117) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `Dove sono le cose` to `solve.ts`, `parse.ts`, `main.ts`, `odesolve.ts`, `spec.ts`, `arithmetic.ts`, `num`, `schema/editor.ts`, `symbolic.ts`, `graph.ts`, `svg.ts`, `Rational`, `graph/space.ts`, `compile`, `numerical.ts`, `conics.ts`, `several.ts`, `MathError`, `h`, `inference.ts`, `markdown.ts`, `logic.ts`, `MathNode`, `graphNote.test.ts`, `.error`, `study.ts`, `supabase.ts`, `severalGraph.ts`, `finite.ts`, `schema/preview.ts`, `.int`, `statsGraph.ts`, `logo.ts`, `laplace.ts`, `toLatex`, `compileComplex`, `Il database degli account (Supabase)`?**
  _High betweenness centrality (0.077) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `main.ts`, `resize.ts`, `schema/editor.ts`, `NotesStore`, `graph.ts`, `toolbar.ts`, `logo.ts`, `SchemaEditor`, `page.ts`, `sidePanel.ts`, `files.ts`, `SidePanel`, `spell.test.ts`, `schema/preview.ts`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **What connects `La proposta dello studente (4 ottobre 2026)`, `Il parere di Claude, in breve`, `Come si decide cosa far pagare` to the rest of the system?**
  _507 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `solve.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10685249709639953 - nodes in this community are weakly interconnected._
- **Should `parse.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06342780026990553 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04384546271338724 - nodes in this community are weakly interconnected._