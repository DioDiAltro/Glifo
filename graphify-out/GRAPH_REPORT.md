# Graph Report - matherdown  (2026-10-04)

## Corpus Check
- 219 files · ~403,759 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 3500 nodes · 12751 edges · 108 communities (92 shown, 16 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 339 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `fa1ba04a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- linsys.ts
- Parser
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
- polynomial.ts
- SchemaEditor
- editor/lists.ts
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
- sheet.ts
- view3d.ts
- distributions.ts
- markdown.ts
- logic.ts
- MathNode
- graphNote.test.ts
- Dove sono le cose
- gauss.ts
- resize.ts
- statsShown.ts
- scopeWith
- NotesStore
- study.ts
- model.ts
- supabase.ts
- probability.ts
- complex.ts
- parse.ts
- editor/editor.ts
- openShareDialog
- latex.ts
- search.ts
- laplace.ts
- files.ts
- finite.ts
- 20261004091555_note_condivise.sql
- insert.ts
- Field
- SidePanel
- shapes.ts
- dependencies
- page.ts
- num
- schema/preview.ts
- render/lists.ts
- Schema
- tutorial.mjs
- sql.ts
- Benvenuto in Glifo
- compilerOptions
- smoke-test.mjs
- suggestions.ts
- statsGraph.ts
- editor.test.ts
- toolbar.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- grafo-html.mjs
- severalGraph.ts
- session-start.sh
- .claude/CLAUDE.md
- Glifo
- sidePanel.ts
- Abbonamenti
- createFakeSupabase
- powerseries.ts
- supabase-stub.sql
- account-test.mjs
- numericalGraph.ts
- formatLinear
- icons.mjs
- Glifo – note per Claude
- vitest
- Piano per piano
- Poly
- scripts
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
- `Dove sono le cose` --references--> `Converter`  [INFERRED]
  CLAUDE.md → src/math/symbolic.ts
- `Dove sono le cose` --references--> `NumericContext`  [INFERRED]
  CLAUDE.md → src/math/numerical.ts
- `Dove sono le cose` --references--> `InferenceContext`  [INFERRED]
  CLAUDE.md → src/math/inference.ts
- `Dove sono le cose` --references--> `ConicElements`  [INFERRED]
  CLAUDE.md → src/math/conics.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (108 total, 16 thin omitted)

### Community 0 - "linsys.ts"
Cohesion: 0.12
Nodes (37): LinearScope, choices(), exText(), gcd(), isStandardUnknown(), linearSystem(), matrixEquation(), matrixSystem() (+29 more)

### Community 1 - "Parser"
Cohesion: 0.12
Nodes (16): Abbonamento e funzioni a pagamento (da capire), Account: i propri appunti su ogni dispositivo, anche da condividere, Aiuto con gli esercizi, Altre idee, Calcoli e grafici: idee in più, Controllare e mostrare quello che si scrive, Idee per il futuro, In programma (+8 more)

### Community 2 - "main.ts"
Cohesion: 0.05
Nodes (84): graphsForFile(), graphsFromFile(), hide(), unhide(), account, accountButton, active, app (+76 more)

### Community 3 - "odesolve.ts"
Cohesion: 0.08
Nodes (73): addWave(), arrange(), cauchy(), characteristicRoots(), compiled(), constantNames(), constantParticular(), constantRoots() (+65 more)

### Community 4 - "sync.ts"
Cohesion: 0.05
Nodes (37): AccountSync, withLock(), Account, EMPTY_STATE, FolderChange, FolderRow, isEmpty(), iso() (+29 more)

### Community 5 - "spec.ts"
Cohesion: 0.06
Nodes (86): conicItems(), isConicLine(), quadricEquation(), fourierItems(), isFourierLine(), hasExponential(), valueLabel(), inequalityMargin() (+78 more)

### Community 6 - "arithmetic.ts"
Cohesion: 0.11
Nodes (39): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+31 more)

### Community 7 - "primitive.ts"
Cohesion: 0.16
Nodes (60): similarSolution(), algebraic(), bigGcd(), byParts(), candidates(), canon(), combineLogs(), compareKeys() (+52 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (43): addLabel(), boxes, cameras, complexCoord(), coord(), drawings, drawnViews, endTex() (+35 more)

### Community 9 - "schema/editor.ts"
Cohesion: 0.06
Nodes (43): alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ARROW_NAMES, AT_ICONS (+35 more)

### Community 10 - "symbolic.ts"
Cohesion: 0.07
Nodes (62): primitive(), verified(), atValues(), cancelLinear(), commonMonomial(), Converter, coordinates(), decimalText() (+54 more)

### Community 11 - "graph.ts"
Cohesion: 0.09
Nodes (38): fieldInput(), textWidth(), AT_X, cellHtml(), cellText(), COMPASS, createEdgeCell(), createGraph() (+30 more)

### Community 12 - "svg.ts"
Cohesion: 0.08
Nodes (57): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseWindow(), chooseY(), clipLines(), domainEdge() (+49 more)

### Community 13 - "polynomial.ts"
Cohesion: 0.16
Nodes (31): factoredPolynomial(), factorShown(), factorsOf(), homogeneousParts(), monomial(), polyPart(), sumShown(), univariateParts() (+23 more)

### Community 15 - "editor/lists.ts"
Cohesion: 0.10
Nodes (52): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+44 more)

### Community 16 - "graph/space.ts"
Cohesion: 0.09
Nodes (58): sampleRegion(), addMesh(), addTet(), affinePlane(), Axis, centroid(), chooseBox(), clipBy() (+50 more)

### Community 17 - "compile"
Cohesion: 0.08
Nodes (50): argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot(), fieldOn(), numericPartials() (+42 more)

### Community 18 - "numerical.ts"
Cohesion: 0.12
Nodes (47): FormatOptions, bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial() (+39 more)

### Community 19 - "FoldersStore"
Cohesion: 0.07
Nodes (19): cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder(), loadClosedFolders(), RemoteFolder (+11 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (41): b, bigops, c, calculus, fn, fr, fractions, functions (+33 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "Rational"
Cohesion: 0.09
Nodes (27): Part, R(), expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactFunction (+19 more)

### Community 23 - "conics.ts"
Cohesion: 0.17
Nodes (31): at(), centralCanonical(), Coefficients, coneCanonical(), ConicInfo, conicOf(), det2(), det3() (+23 more)

### Community 24 - "several.ts"
Cohesion: 0.14
Nodes (36): severalLimit, fractionNear(), at(), bounded(), Candidate, candidates(), compiled(), COORDS (+28 more)

### Community 25 - "MathError"
Cohesion: 0.16
Nodes (45): MathError, angleBetween(), asMatrix(), basisOf(), cross(), Ctx, dataOf(), determinant() (+37 more)

### Community 26 - "h"
Cohesion: 0.06
Nodes (55): SyncStatus, helpButton, openGuide(), ACCOUNT_SETTINGS, accountSettings(), AI_MODELS, DEFAULT_SETTINGS, Settings (+47 more)

### Community 27 - "assistant.ts"
Cohesion: 0.19
Nodes (13): AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askThroughHost(), checkShape() (+5 more)

### Community 28 - "spell.test.ts"
Cohesion: 0.08
Nodes (23): @codemirror/lang-markdown, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt() (+15 more)

### Community 29 - "fake-supabase.mjs"
Cohesion: 0.25
Nodes (6): @electric-sql/pglite, b64(), CODE, GOOGLE_CODE, ROOT, SUPABASE_URL

### Community 30 - "sheet.ts"
Cohesion: 0.08
Nodes (46): formatGauss(), decimalSeparator(), Digits, formatRational(), fromNumber(), fromRational(), SUPERSCRIPT, writeDigits() (+38 more)

### Community 31 - "view3d.ts"
Cohesion: 0.10
Nodes (33): Box, Face, planeTolerance(), Plane, Vec3, escapeXml(), arcPoints(), arrowHead() (+25 more)

### Community 32 - "distributions.ts"
Cohesion: 0.07
Nodes (60): addExp(), choose(), continuousQuantile(), discreteQuantile(), exactIntervalProbability(), expSumValue(), factorialBig(), FAMILIES (+52 more)

### Community 33 - "markdown.ts"
Cohesion: 0.11
Nodes (30): cache, escapeHtml(), renderTexMathml(), renderTexOrError(), renderTexWithResult(), TexRender, configurePurify(), createMarkdownIt() (+22 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "MathNode"
Cohesion: 0.07
Nodes (42): Definition, Line, ExactComplexScope, Ode, withWorkLimit(), FiniteContext, FormattedResult, differentialRequest (+34 more)

### Community 36 - "graphNote.test.ts"
Cohesion: 0.10
Nodes (24): @codemirror/language, @codemirror/state, @codemirror/view, acceptCalcResult(), calcPlugin, CalcResult, calcResults(), formulasUntil() (+16 more)

### Community 37 - "Dove sono le cose"
Cohesion: 0.11
Nodes (42): Dove sono le cose, bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel() (+34 more)

### Community 38 - "gauss.ts"
Cohesion: 0.11
Nodes (23): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, inZ(), isComplexLine(), isComplexValue(), isInequality() (+15 more)

### Community 39 - "resize.ts"
Cohesion: 0.13
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "statsShown.ts"
Cohesion: 0.17
Nodes (31): check(), correlation(), count(), covariance(), Data, dataStatistic(), deviation(), fail() (+23 more)

### Community 41 - "scopeWith"
Cohesion: 0.10
Nodes (42): constantIntegrand(), depth(), integralRegion, LayeredSolid, Multiple, multipleOf(), planeMargin(), radiusOf() (+34 more)

### Community 42 - "NotesStore"
Cohesion: 0.07
Nodes (35): accountSpace(), adoptGuestNotes(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf(), setCurrentAccount() (+27 more)

### Community 43 - "study.ts"
Cohesion: 0.15
Nodes (34): limit(), breaks(), periodOf(), scanRoots(), Asymptote, compiled(), cutsOf(), defined() (+26 more)

### Community 44 - "model.ts"
Cohesion: 0.07
Nodes (39): base64(), hide(), OPEN, schemasForFile(), schemasFromFile(), unhide(), ARROWS, COLOR_NAMES (+31 more)

### Community 45 - "supabase.ts"
Cohesion: 0.07
Nodes (50): @supabase/supabase-js, AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), accountError, appUrl(), call() (+42 more)

### Community 46 - "probability.ts"
Cohesion: 0.14
Nodes (22): End, CompileOptions, ALL, compileOf(), complement(), distributionOf(), endAt(), EventContext (+14 more)

### Community 47 - "complex.ts"
Cohesion: 0.06
Nodes (69): add(), allRoots(), arg(), asin(), atan(), compileApply(), compileComplex(), compileFunction() (+61 more)

### Community 48 - "parse.ts"
Cohesion: 0.05
Nodes (46): formulaAtCursor(), formulaGraphLine(), hasWord(), withoutResult(), errorMessage(), ACCENTS, AND_WORDS, BARE_WORDS (+38 more)

### Community 49 - "editor/editor.ts"
Cohesion: 0.07
Nodes (31): description, name, private, type, version, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands (+23 more)

### Community 50 - "openShareDialog"
Cohesion: 0.16
Nodes (19): openShareDialog(), changeAccess(), changeCopy(), refreshChanged(), render(), run(), setStatus(), shareNow() (+11 more)

### Community 51 - "latex.ts"
Cohesion: 0.12
Nodes (23): ACCENT_COMMANDS, COMPLEX_FUNCTIONS, DISTRIBUTION_LATEX, distributionLatex(), domainLatex(), fnLatex(), fnName(), formLatex() (+15 more)

### Community 52 - "search.ts"
Cohesion: 0.17
Nodes (24): editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex() (+16 more)

### Community 53 - "laplace.ts"
Cohesion: 0.16
Nodes (29): beyondPoles(), compiled(), E, exp(), fractionShown(), HALF, hyperbolicToExp(), inverseLaplaceShown() (+21 more)

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
Cohesion: 0.14
Nodes (16): InsertOptions, toggleLinePrefix(), addPlaceholders, Placeholder, besideSchema(), guardBlocks(), schemaBlockRanges(), schemaBlocks() (+8 more)

### Community 58 - "Field"
Cohesion: 0.12
Nodes (7): characteristicPolynomial(), eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn()

### Community 59 - "SidePanel"
Cohesion: 0.21
Nodes (7): cleanKatexError(), renderTex(), isConfidentAnswer(), symbolsInCategory(), displayCode(), preventFocusSteal(), SidePanel

### Community 60 - "shapes.ts"
Cohesion: 0.09
Nodes (15): @maxgraph/core, ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape (+7 more)

### Community 61 - "dependencies"
Cohesion: 0.06
Nodes (32): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+24 more)

### Community 62 - "page.ts"
Cohesion: 0.11
Nodes (22): katex, currentAccount(), body, draw(), isDark(), load(), saveButton, saveCopy() (+14 more)

### Community 63 - "num"
Cohesion: 0.14
Nodes (44): absOf(), atIntegers(), boundsOf(), close(), definite(), fourierProblem, fourierShown(), isTrig() (+36 more)

### Community 64 - "schema/preview.ts"
Cohesion: 0.16
Nodes (12): Look, Theme, draw(), drawCached(), drawn, errorHtml(), fill(), hydrateSchemas() (+4 more)

### Community 65 - "render/lists.ts"
Cohesion: 0.27
Nodes (13): ListStyle, bulletGroup(), Marker, sameList(), alignInside(), asciiTrim(), findMarker(), Found (+5 more)

### Community 66 - "Schema"
Cohesion: 0.20
Nodes (8): loadDialect(), SchemaEditorOptions, Schema, serializeSchema(), Template, downloadBlob(), downloadText(), fileNameFor()

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

### Community 72 - "suggestions.ts"
Cohesion: 0.22
Nodes (4): EditorMathContext, expand(), preferredIndex(), SuggestionController

### Community 73 - "statsGraph.ts"
Cohesion: 0.17
Nodes (18): isTestLine(), number(), testItems(), classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX (+10 more)

### Community 74 - "editor.test.ts"
Cohesion: 0.08
Nodes (29): @lezer/common, closeMathBlockOnEnter(), tabOutOfMath(), templateInsertion(), CODE_NODES, CommandToken, commandTokenAt(), isInCode() (+21 more)

### Community 75 - "toolbar.ts"
Cohesion: 0.12
Nodes (14): EditorCallbacks, MarkdownEditor, insertBlock(), insertTemplate(), wrapSelection(), Action, createToolbar(), insertCode() (+6 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "grafo-html.mjs"
Cohesion: 0.25
Nodes (4): graphFile, names, namesFile, root

### Community 79 - "severalGraph.ts"
Cohesion: 0.54
Nodes (7): criticalLine(), isSeveralLine(), named(), severalItems(), surface(), optimumOf(), severalOf()

### Community 82 - "Glifo"
Cohesion: 0.15
Nodes (13): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Funzionalità (+5 more)

### Community 83 - "sidePanel.ts"
Cohesion: 0.22
Nodes (12): SuggestionItem, CATEGORIES, cardPreviewTex(), formPreviewTex(), ParsedTemplate, parseTemplate(), PLACEHOLDER_TEX, placeholderPreview() (+4 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.14
Nodes (14): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+6 more)

### Community 91 - "createFakeSupabase"
Cohesion: 0.60
Nodes (6): createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 92 - "powerseries.ts"
Cohesion: 0.12
Nodes (23): EMPTY_SCOPE, Piece, Condition, Family, Group, Root, Shape, convergesAt() (+15 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.20
Nodes (4): device(), login(), newContext, waitFor()

### Community 97 - "numericalGraph.ts"
Cohesion: 0.80
Nodes (4): isNumericalLine(), numericalItems(), isPlottedNumerical(), numericalPlot()

### Community 98 - "formatLinear"
Cohesion: 0.36
Nodes (10): circleText(), degreesText(), entry(), formatLinear(), lineText(), matrixTex(), plainArea(), planeText() (+2 more)

### Community 101 - "Glifo – note per Claude"
Cohesion: 0.29
Nodes (7): Comandi, Come controllare il lavoro, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole, sqlite()

### Community 102 - "vitest"
Cohesion: 0.08
Nodes (29): vitest, graphImage(), graphImagesFor(), OPEN, staticGraphSvg(), formulaGraph(), GraphItem, parseGraph() (+21 more)

### Community 103 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Super: per studiare

### Community 106 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 107 - "Il database degli account (Supabase)"
Cohesion: 0.17
Nodes (11): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Nell'app, Note condivise con un link (+3 more)

## Knowledge Gaps
- **509 isolated node(s):** `Deciso`, `Com'è andata la discussione`, `La proposta dello studente (4 ottobre 2026)`, `Il parere di Claude, in breve`, `Come si decide cosa far pagare` (+504 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 682 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `linsys.ts`, `sync.ts`, `primitive.ts`, `schema/editor.ts`, `svg.ts`, `editor/lists.ts`, `graph/space.ts`, `FoldersStore`, `h`, `assistant.ts`, `spell.test.ts`, `sheet.ts`, `distributions.ts`, `markdown.ts`, `graphNote.test.ts`, `resize.ts`, `scopeWith`, `NotesStore`, `model.ts`, `supabase.ts`, `parse.ts`, `editor/editor.ts`, `search.ts`, `insert.ts`, `page.ts`, `sql.ts`, `editor.test.ts`, `sidePanel.ts`?**
  _High betweenness centrality (0.118) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `Dove sono le cose` to `linsys.ts`, `Parser`, `main.ts`, `odesolve.ts`, `spec.ts`, `arithmetic.ts`, `primitive.ts`, `graph/preview.ts`, `schema/editor.ts`, `symbolic.ts`, `graph.ts`, `svg.ts`, `graph/space.ts`, `numerical.ts`, `Rational`, `several.ts`, `MathError`, `h`, `distributions.ts`, `markdown.ts`, `logic.ts`, `MathNode`, `graphNote.test.ts`, `gauss.ts`, `study.ts`, `supabase.ts`, `complex.ts`, `finite.ts`, `num`, `schema/preview.ts`, `powerseries.ts`, `numericalGraph.ts`, `Glifo – note per Claude`?**
  _High betweenness centrality (0.074) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `schema/preview.ts`, `main.ts`, `Schema`, `resize.ts`, `schema/editor.ts`, `graph.ts`, `toolbar.ts`, `SchemaEditor`, `openShareDialog`, `FoldersStore`, `sidePanel.ts`, `SidePanel`, `spell.test.ts`, `page.ts`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **What connects `Deciso`, `Com'è andata la discussione`, `La proposta dello studente (4 ottobre 2026)` to the rest of the system?**
  _509 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `linsys.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1173054587688734 - nodes in this community are weakly interconnected._
- **Should `Parser` be split into smaller, more focused modules?**
  _Cohesion score 0.12245696400625979 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04945054945054945 - nodes in this community are weakly interconnected._