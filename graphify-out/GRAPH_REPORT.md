# Graph Report - matherdown  (2026-10-04)

## Corpus Check
- 218 files · ~395,627 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 3458 nodes · 12529 edges · 108 communities (94 shown, 14 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 330 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d3ecf674`
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
- sheet.ts
- view3d.ts
- num
- markdown.ts
- logic.ts
- devDependencies
- graphNote.test.ts
- Dove sono le cose
- gauss.ts
- resize.ts
- statsShown.ts
- inference.ts
- NotesStore
- study.ts
- openShareDialog
- supabase.ts
- probability.ts
- complex.ts
- distributions.ts
- editor/editor.ts
- page.ts
- severalGraph.ts
- search.ts
- tutorial.ts
- graph3d.test.ts
- finite.ts
- 20261004091555_note_condivise.sql
- toolbar.ts
- Field
- SidePanel
- shapes.ts
- dependencies
- katex.ts
- database.ts
- expSum
- editor/lists.ts
- suggestions.ts
- tutorial.mjs
- sql.ts
- Benvenuto in Glifo
- compilerOptions
- smoke-test.mjs
- settings.ts
- statsGraph.ts
- editor.test.ts
- MarkdownEditor
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- logo.ts
- graph/file.ts
- session-start.sh
- .claude/CLAUDE.md
- Glifo
- sidePanel.ts
- icons.mjs
- toNode
- supabase-stub.sql
- account-test.mjs
- Più avanti
- AccountSync
- Glifo – note per Claude
- toLatex
- MathNode
- ROADMAP.md
- grafo-html.mjs
- Il database degli account (Supabase)
- createFakeSupabase
- Sincronizzazione
- Account

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
- `Funzionalità` --references--> `k()`  [INFERRED]
  README.md → src/math/numerical.ts
- `Dove sono le cose` --references--> `shareNote()`  [INFERRED]
  CLAUDE.md → src/account/supabase.ts
- `Dove sono le cose` --references--> `sharedLinks()`  [INFERRED]
  CLAUDE.md → src/account/supabase.ts
- `Dove sono le cose` --references--> `addToGraphBlock()`  [INFERRED]
  CLAUDE.md → src/editor/graphInsert.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (108 total, 14 thin omitted)

### Community 0 - "solve.ts"
Cohesion: 0.16
Nodes (25): splitRoot(), surdText(), isStandardUnknown(), numericRoots(), endAt(), scanSet(), cubeRoot(), equation() (+17 more)

### Community 1 - "parse.ts"
Cohesion: 0.08
Nodes (39): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe(), differentialInFraction() (+31 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (92): graphsForFile(), graphsFromFile(), hide(), unhide(), inClaudeViewer(), account, active, app (+84 more)

### Community 3 - "odesolve.ts"
Cohesion: 0.09
Nodes (65): linearIn(), addWave(), arrange(), cauchy(), compiled(), constantNames(), equalities(), factorial() (+57 more)

### Community 4 - "sync.ts"
Cohesion: 0.07
Nodes (31): withLock(), Account, EMPTY_STATE, FolderChange, FolderRow, isEmpty(), iso(), LocalChange (+23 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (86): conicItems(), isConicLine(), quadricEquation(), onlyComplex(), isTestLine(), constantIntegrand(), depth(), inequalityMargin() (+78 more)

### Community 6 - "arithmetic.ts"
Cohesion: 0.07
Nodes (71): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+63 more)

### Community 7 - "primitive.ts"
Cohesion: 0.18
Nodes (50): algebraic(), bigGcd(), byParts(), candidates(), canon(), combineLogs(), compareKeys(), exponentials() (+42 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (40): addLabel(), boxes, cameras, complexCoord(), coord(), drawings, drawnViews, endTex() (+32 more)

### Community 9 - "schema/editor.ts"
Cohesion: 0.04
Nodes (82): alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ARROW_NAMES, AT_ICONS (+74 more)

### Community 10 - "symbolic.ts"
Cohesion: 0.08
Nodes (47): atValues(), Converter, coordinates(), decimalText(), definiteParts(), degree(), exactRoot(), expandCalculus() (+39 more)

### Community 11 - "graph.ts"
Cohesion: 0.10
Nodes (31): AT_X, cellHtml(), cellText(), COMPASS, createGraph(), drawSchema(), edgeLook(), edgeStyle() (+23 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (54): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), domainEdge(), features() (+46 more)

### Community 13 - "linsys.ts"
Cohesion: 0.12
Nodes (47): factorsOf(), univariateParts(), formatRational(), evaluateLinear(), rref(), choices(), gcd(), linearSystem() (+39 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.09
Nodes (10): loadDialect(), SchemaEditor, createEdgeCell(), EdgeLook, NodeLook, serializeSchema(), tableMetrics(), downloadBlob() (+2 more)

### Community 15 - "Sheet"
Cohesion: 0.05
Nodes (54): vitest, formulaGraph(), GraphItem, parseGraph(), errorMessage(), parseMath(), Sheet, splitPieces() (+46 more)

### Community 16 - "graph/space.ts"
Cohesion: 0.12
Nodes (46): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+38 more)

### Community 17 - "compile"
Cohesion: 0.06
Nodes (76): integralRegion, LayeredSolid, complexValue(), define(), argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS (+68 more)

### Community 18 - "numerical.ts"
Cohesion: 0.12
Nodes (46): bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial(), interpolating() (+38 more)

### Community 19 - "FoldersStore"
Cohesion: 0.16
Nodes (4): cleanFolderName(), FoldersStore, sameName(), names()

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (41): b, bigops, c, calculus, fn, fr, fractions, functions (+33 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "Rational"
Cohesion: 0.09
Nodes (32): primitivePart(), asin(), atan(), compileComplex(), compileFunction(), evaluateExactComplex(), exactSqrt(), exp() (+24 more)

### Community 23 - "conics.ts"
Cohesion: 0.18
Nodes (29): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+21 more)

### Community 24 - "several.ts"
Cohesion: 0.09
Nodes (50): Definite, Piece, LimitValue, severalLimit, Condition, Family, Group, Root (+42 more)

### Community 25 - "MathError"
Cohesion: 0.12
Nodes (58): MathError, UndefinedName, angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx (+50 more)

### Community 26 - "h"
Cohesion: 0.08
Nodes (38): SyncStatus, viewSwitch, openSignedOut(), printButton(), ShareDialogDeps, saveClosedFolders(), Settings, AccountButton (+30 more)

### Community 27 - "assistant.ts"
Cohesion: 0.10
Nodes (21): @anthropic-ai/sdk, AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askThroughHost() (+13 more)

### Community 28 - "spell.test.ts"
Cohesion: 0.07
Nodes (27): @codemirror/lang-markdown, noIndentedCode, mathMarkdown, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck() (+19 more)

### Community 29 - "fake-supabase.mjs"
Cohesion: 0.25
Nodes (6): @electric-sql/pglite, b64(), CODE, GOOGLE_CODE, ROOT, SUPABASE_URL

### Community 30 - "sheet.ts"
Cohesion: 0.07
Nodes (38): complex, ExactFunction, characteristicPolynomial(), Eigenvalue, EXACT, FLOAT, Lin, LinearScope (+30 more)

### Community 31 - "view3d.ts"
Cohesion: 0.11
Nodes (34): Face, planeTolerance(), regionFaces(), Plane, Vec3, escapeXml(), arcPoints(), arrowHead() (+26 more)

### Community 32 - "num"
Cohesion: 0.16
Nodes (45): atIntegers(), signsUp(), symbolicCoefficient(), withoutAbs(), hyperbolicToExp(), polyEx(), bernoulliFamily(), characteristicRoots() (+37 more)

### Community 33 - "markdown.ts"
Cohesion: 0.08
Nodes (43): dompurify, highlight.js, @lezer/highlight, @lezer/markdown, markdown-it-footnote, lineDepth(), mathDelimTag, mathTag (+35 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "devDependencies"
Cohesion: 0.22
Nodes (9): devDependencies, @electric-sql/pglite, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite, vite-plugin-pwa (+1 more)

### Community 36 - "graphNote.test.ts"
Cohesion: 0.12
Nodes (21): @codemirror/state, acceptCalcResult(), calcPlugin, CalcResult, calcResults(), formulasUntil(), insertResult(), ResultWidget (+13 more)

### Community 37 - "Dove sono le cose"
Cohesion: 0.12
Nodes (39): Dove sono le cose, bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel() (+31 more)

### Community 38 - "gauss.ts"
Cohesion: 0.17
Nodes (19): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexLine(), isComplexValue() (+11 more)

### Community 39 - "resize.ts"
Cohesion: 0.13
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "statsShown.ts"
Cohesion: 0.16
Nodes (33): expSumValue(), check(), correlation(), count(), covariance(), Data, dataStatistic(), deviation() (+25 more)

### Community 41 - "inference.ts"
Cohesion: 0.16
Nodes (24): chiSquareTest(), confidence(), confidenceShown(), Given, hypothesisTest(), InferenceContext, interval(), meanOf() (+16 more)

### Community 42 - "NotesStore"
Cohesion: 0.07
Nodes (39): accountSpace(), adoptGuestNotes(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf(), setCurrentAccount() (+31 more)

### Community 43 - "study.ts"
Cohesion: 0.15
Nodes (34): limit(), breaks(), periodOf(), Asymptote, compiled(), cutsOf(), defined(), domainOf() (+26 more)

### Community 44 - "openShareDialog"
Cohesion: 0.17
Nodes (16): openShareDialog(), changeAccess(), changeCopy(), copy(), refreshChanged(), render(), run(), setStatus() (+8 more)

### Community 45 - "supabase.ts"
Cohesion: 0.11
Nodes (36): @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken(), ensureSessionOf() (+28 more)

### Community 46 - "probability.ts"
Cohesion: 0.13
Nodes (22): End, Family, CompileOptions, ExactScope, RelOp, ALL, complement(), EventContext (+14 more)

### Community 47 - "complex.ts"
Cohesion: 0.05
Nodes (61): add(), allRoots(), arg(), compileApply(), compileName(), ComplexCompiled, complexScopeWith(), conjugateOf() (+53 more)

### Community 48 - "distributions.ts"
Cohesion: 0.18
Nodes (26): choose(), continuousQuantile(), discreteQuantile(), factorialBig(), FAMILIES, integerParam(), invalid(), makeDistribution() (+18 more)

### Community 49 - "editor/editor.ts"
Cohesion: 0.06
Nodes (34): description, name, private, scripts, build, dev, preview, test (+26 more)

### Community 50 - "page.ts"
Cohesion: 0.09
Nodes (30): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), currentAccount(), PullResult, isShareToken(), parseSharedNote() (+22 more)

### Community 51 - "severalGraph.ts"
Cohesion: 0.23
Nodes (14): FieldContext, fourierItems(), isFourierLine(), criticalLine(), isSeveralLine(), named(), severalItems(), surface() (+6 more)

### Community 52 - "search.ts"
Cohesion: 0.17
Nodes (24): editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex() (+16 more)

### Community 53 - "tutorial.ts"
Cohesion: 0.16
Nodes (12): HINT_MS, markSeen(), openTutorial(), show(), richText(), showTutorialHint(), close(), TUTORIAL_PAGES (+4 more)

### Community 54 - "graph3d.test.ts"
Cohesion: 0.23
Nodes (12): staticGraphSvg(), chooseWindow(), chooseBox(), surfacePlane(), DrawOptions, Palette, DEFAULT_CAMERA, Quality (+4 more)

### Community 55 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "toolbar.ts"
Cohesion: 0.09
Nodes (25): @codemirror/view, insertBlock(), InsertOptions, toggleLinePrefix(), wrapSelection(), LIST_STYLES, guardBlocks(), schemaBlocks() (+17 more)

### Community 58 - "Field"
Cohesion: 0.12
Nodes (7): eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn(), walk()

### Community 59 - "SidePanel"
Cohesion: 0.24
Nodes (5): cleanKatexError(), renderTex(), displayCode(), preventFocusSteal(), SidePanel

### Community 60 - "shapes.ts"
Cohesion: 0.08
Nodes (16): @maxgraph/core, tableMetricsFor(), ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape (+8 more)

### Community 61 - "dependencies"
Cohesion: 0.09
Nodes (23): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+15 more)

### Community 62 - "katex.ts"
Cohesion: 0.11
Nodes (20): GraphLook, cache, escapeHtml(), renderTexMathml(), renderTexOrError(), renderTexWithResult(), TexRender, Look (+12 more)

### Community 63 - "database.ts"
Cohesion: 0.27
Nodes (5): createDatabase(), createUser(), databaseTests(), migrations, shareTests()

### Community 64 - "expSum"
Cohesion: 0.16
Nodes (10): addExp(), exactIntervalProbability(), expSum, integerRange(), intervalProbability(), subtractExp(), pValue(), divideExp() (+2 more)

### Community 65 - "editor/lists.ts"
Cohesion: 0.11
Nodes (53): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+45 more)

### Community 66 - "suggestions.ts"
Cohesion: 0.20
Nodes (4): EditorMathContext, expand(), preferredIndex(), SuggestionController

### Community 67 - "tutorial.mjs"
Cohesion: 0.20
Nodes (6): centerOf(), clickOn(), ffmpeg, SCENES, SIZE, work

### Community 68 - "sql.ts"
Cohesion: 0.17
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

### Community 72 - "settings.ts"
Cohesion: 0.11
Nodes (27): applySpellcheck(), backup(), openSettings(), restore(), setPersonalWords(), sidebarBottom, wordsChangedHere(), addPersonalWord() (+19 more)

### Community 73 - "statsGraph.ts"
Cohesion: 0.15
Nodes (17): number(), testItems(), classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX, Line (+9 more)

### Community 74 - "editor.test.ts"
Cohesion: 0.07
Nodes (31): @lezer/common, closeMathBlockOnEnter(), tabOutOfMath(), templateInsertion(), CODE_NODES, CommandToken, commandTokenAt(), isInCode() (+23 more)

### Community 75 - "MarkdownEditor"
Cohesion: 0.23
Nodes (3): EditorCallbacks, MarkdownEditor, insertTemplate()

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "logo.ts"
Cohesion: 0.39
Nodes (5): BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark()

### Community 79 - "graph/file.ts"
Cohesion: 0.48
Nodes (6): graphImage(), graphImagesFor(), OPEN, areaColor(), graphTitle(), itemColors()

### Community 82 - "Glifo"
Cohesion: 0.20
Nodes (10): Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Funzionalità, Glifo, Idee per il futuro (+2 more)

### Community 83 - "sidePanel.ts"
Cohesion: 0.20
Nodes (14): SuggestionItem, isConfidentAnswer(), CATEGORIES, symbolsInCategory(), cardPreviewTex(), formPreviewTex(), ParsedTemplate, parseTemplate() (+6 more)

### Community 92 - "toNode"
Cohesion: 0.12
Nodes (35): numShown(), close(), definiteIntegral(), exValue(), samples(), EMPTY_SCOPE, absOf(), boundsOf() (+27 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.20
Nodes (4): device(), login(), newContext, waitFor()

### Community 97 - "Più avanti"
Cohesion: 0.22
Nodes (9): Abbonamento e funzioni a pagamento (da capire), Aiuto con gli esercizi, Calcoli e grafici: idee in più, Matematica per i corsi: idee in più, Non solo appunti, Più avanti, Schemi: idee in più, Trascrizione delle lezioni in appunti (+1 more)

### Community 101 - "Glifo – note per Claude"
Cohesion: 0.25
Nodes (7): Comandi, Come controllare il lavoro, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole, sqlite()

### Community 102 - "toLatex"
Cohesion: 0.10
Nodes (41): isNumericalLine(), numericalItems(), areaFor(), condLabel(), isStraight(), isVectorName(), itemFor(), multipleLabel() (+33 more)

### Community 104 - "MathNode"
Cohesion: 0.11
Nodes (14): Definition, Line, withWorkLimit(), ExactRandom, FiniteContext, FormattedResult, differentialRequest, pieces() (+6 more)

### Community 105 - "ROADMAP.md"
Cohesion: 0.29
Nodes (5): Account: i propri appunti su ogni dispositivo, anche da condividere, Altre idee, Controllare e mostrare quello che si scrive, Idee per il futuro, In programma

### Community 106 - "grafo-html.mjs"
Cohesion: 0.22
Nodes (4): graphFile, names, namesFile, root

### Community 107 - "Il database degli account (Supabase)"
Cohesion: 0.25
Nodes (8): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Nell'app, Note condivise con un link

### Community 110 - "createFakeSupabase"
Cohesion: 0.60
Nodes (6): createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 113 - "Sincronizzazione"
Cohesion: 0.50
Nodes (3): Sincronizzazione, `sync_pull({ since })`: scarica le novità, `sync_push({ changes })`: manda le modifiche

### Community 114 - "Account"
Cohesion: 0.67
Nodes (3): Account, Condividere una nota con un link, Usarla tutti i giorni

## Knowledge Gaps
- **489 isolated node(s):** `session-start.sh script`, `name`, `private`, `version`, `description` (+484 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 665 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `Sheet` to `main.ts`, `sync.ts`, `schema/editor.ts`, `svg.ts`, `Rational`, `assistant.ts`, `spell.test.ts`, `sheet.ts`, `markdown.ts`, `graphNote.test.ts`, `resize.ts`, `NotesStore`, `supabase.ts`, `distributions.ts`, `editor/editor.ts`, `page.ts`, `search.ts`, `tutorial.ts`, `graph3d.test.ts`, `toolbar.ts`, `database.ts`, `editor/lists.ts`, `sql.ts`, `settings.ts`, `editor.test.ts`, `logo.ts`, `sidePanel.ts`?**
  _High betweenness centrality (0.127) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `Dove sono le cose` to `parse.ts`, `main.ts`, `odesolve.ts`, `spec.ts`, `arithmetic.ts`, `primitive.ts`, `schema/editor.ts`, `symbolic.ts`, `graph.ts`, `svg.ts`, `linsys.ts`, `graph/space.ts`, `numerical.ts`, `Rational`, `conics.ts`, `several.ts`, `MathError`, `markdown.ts`, `logic.ts`, `graphNote.test.ts`, `gauss.ts`, `statsShown.ts`, `inference.ts`, `study.ts`, `supabase.ts`, `complex.ts`, `severalGraph.ts`, `tutorial.ts`, `finite.ts`, `katex.ts`, `expSum`, `toNode`, `Glifo – note per Claude`, `toLatex`, `MathNode`?**
  _High betweenness centrality (0.081) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `main.ts`, `resize.ts`, `settings.ts`, `schema/editor.ts`, `graph.ts`, `openShareDialog`, `SchemaEditor`, `page.ts`, `sidePanel.ts`, `tutorial.ts`, `toolbar.ts`, `SidePanel`, `spell.test.ts`, `katex.ts`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **What connects `session-start.sh script`, `name`, `private` to the rest of the system?**
  _489 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `parse.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07785087719298246 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0435026138909634 - nodes in this community are weakly interconnected._
- **Should `odesolve.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09324009324009325 - nodes in this community are weakly interconnected._