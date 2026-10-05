# Graph Report - matherdown  (2026-10-05)

## Corpus Check
- 219 files · ~406,292 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 3513 nodes · 12764 edges · 96 communities (84 shown, 12 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 339 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d7b693c5`
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
- primitive.ts
- graph/preview.ts
- schema/editor.ts
- symbolic.ts
- num
- svg.ts
- linsys.ts
- SchemaEditor
- editor/lists.ts
- view3d.ts
- MathError
- numerical.ts
- FoldersStore
- index.ts
- engine.ts
- Rational
- parse.ts
- several.ts
- linear.ts
- h
- assistant.ts
- settings.ts
- numericalShown
- formatNumber
- drawScene
- distributions.ts
- markdown.ts
- logic.ts
- MathNode
- placeholders.ts
- namesIn
- domain.ts
- resize.ts
- statsShown.ts
- vitest
- NotesStore
- study.ts
- toolbar.ts
- supabase.ts
- probability.ts
- complex.ts
- database.ts
- spell.test.ts
- leastSquares
- toLatex
- search.ts
- files.ts
- finite.ts
- 20261004091555_note_condivise.sql
- insert.ts
- .int
- SidePanel
- graph.ts
- dependencies
- openShareDialog
- schema/preview.ts
- markers.ts
- graphNote.test.ts
- sql.ts
- Benvenuto in Glifo
- compilerOptions
- package.json
- editor.test.ts
- statsGraph.ts
- severalGraph.ts
- editor/editor.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- sheet.ts
- session-start.sh
- .claude/CLAUDE.md
- sidePanel.ts
- Abbonamenti
- Glifo
- toNode
- supabase-stub.sql
- account-test.mjs
- Il database degli account (Supabase)
- page.ts
- Glifo – note per Claude

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
- `Dove sono le cose` --references--> `expSum`  [INFERRED]
  CLAUDE.md → src/math/distributions.ts
- `Dove sono le cose` --references--> `GaussRational`  [INFERRED]
  CLAUDE.md → src/math/complex.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (96 total, 12 thin omitted)

### Community 0 - "solve.ts"
Cohesion: 0.18
Nodes (23): isStandardUnknown(), RelOp, breaks(), cubeRoot(), equation(), holds(), inequality(), minus() (+15 more)

### Community 1 - "Parser"
Cohesion: 0.12
Nodes (17): Abbonamento e funzioni a pagamento (da capire), Account: i propri appunti su ogni dispositivo, anche da condividere, Aiuto con gli esercizi, Altre idee, Calcoli e grafici: idee in più, Controllare e mostrare quello che si scrive, Idee per il futuro, In programma (+9 more)

### Community 2 - "main.ts"
Cohesion: 0.05
Nodes (94): graphImage(), graphImagesFor(), graphsForFile(), graphsFromFile(), hide(), OPEN, unhide(), areaColor() (+86 more)

### Community 3 - "odesolve.ts"
Cohesion: 0.09
Nodes (76): primed(), linearIn(), termTransform(), addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots() (+68 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (33): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+25 more)

### Community 5 - "spec.ts"
Cohesion: 0.07
Nodes (71): isConicLine(), quadricEquation(), fourierItems(), isFourierLine(), isTestLine(), inequalityMargin(), multipleOf(), isSeveralLine() (+63 more)

### Community 6 - "arithmetic.ts"
Cohesion: 0.07
Nodes (77): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+69 more)

### Community 7 - "primitive.ts"
Cohesion: 0.18
Nodes (54): algebraic(), bigGcd(), byParts(), candidates(), canon(), combineLogs(), compareKeys(), exponentials() (+46 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (43): addLabel(), boxes, cameras, complexCoord(), coord(), drawings, drawnViews, endTex() (+35 more)

### Community 9 - "schema/editor.ts"
Cohesion: 0.04
Nodes (81): @electric-sql/pglite, alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ARROW_NAMES (+73 more)

### Community 10 - "symbolic.ts"
Cohesion: 0.07
Nodes (57): primitive(), verified(), assumePositive(), atValues(), Converter, coordinates(), decimalText(), definiteParts() (+49 more)

### Community 11 - "num"
Cohesion: 0.16
Nodes (41): atIntegers(), exp(), hyperbolicToExp(), inverseRational(), sqrtEx(), polyEx(), constantParticular(), exp() (+33 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (54): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), domainEdge(), features() (+46 more)

### Community 13 - "linsys.ts"
Cohesion: 0.13
Nodes (44): factorsOf(), rref(), choices(), exText(), gcd(), linearSystem(), matrixEquation(), matrixSystem() (+36 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.08
Nodes (17): SchemaEditor, cellText(), createEdgeCell(), edgeLook(), edgeStyle(), edgeTextAt(), insertSchema(), nodeLook() (+9 more)

### Community 15 - "editor/lists.ts"
Cohesion: 0.18
Nodes (30): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+22 more)

### Community 16 - "view3d.ts"
Cohesion: 0.08
Nodes (68): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+60 more)

### Community 17 - "MathError"
Cohesion: 0.07
Nodes (61): conicItems(), areaFor(), condLabel(), constantValue(), define(), isStraight(), isVectorName(), itemFor() (+53 more)

### Community 18 - "numerical.ts"
Cohesion: 0.12
Nodes (26): FormatOptions, cholesky(), condition(), inverseOf(), iterative(), lu(), matrixShown(), norm() (+18 more)

### Community 19 - "FoldersStore"
Cohesion: 0.18
Nodes (3): cleanFolderName(), FoldersStore, sameName()

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (41): b, bigops, c, calculus, fn, fr, fractions, functions (+33 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "Rational"
Cohesion: 0.06
Nodes (64): Part, asin(), atan(), compileFunction(), evaluateExactComplex(), exactSqrt(), GaussRational, log() (+56 more)

### Community 23 - "parse.ts"
Cohesion: 0.05
Nodes (43): EMPTY_SCOPE, errorMessage(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES (+35 more)

### Community 24 - "several.ts"
Cohesion: 0.15
Nodes (35): fractionNear(), at(), bounded(), Candidate, candidates(), compiled(), COORDS, coordShown() (+27 more)

### Community 25 - "linear.ts"
Cohesion: 0.10
Nodes (60): angleBetween(), asMatrix(), basisOf(), circleText(), complexText(), cross(), Ctx, dataOf() (+52 more)

### Community 26 - "h"
Cohesion: 0.06
Nodes (44): SyncStatus, viewSwitch, fieldInput(), FolderGroup, saveClosedFolders(), Note, NoteMeta, AccountButton (+36 more)

### Community 27 - "assistant.ts"
Cohesion: 0.12
Nodes (20): AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askThroughHost(), checkShape() (+12 more)

### Community 28 - "settings.ts"
Cohesion: 0.11
Nodes (24): addPersonalWord(), DICTIONARY_KEY, loadPersonalWords(), savePersonalWords(), tidy(), ACCOUNT_SETTINGS, accountSettings(), AI_MODELS (+16 more)

### Community 29 - "numericalShown"
Cohesion: 0.39
Nodes (15): bisection(), derivative(), fixedPoint(), intervalOf(), k(), newton(), numberShown(), numericalShown() (+7 more)

### Community 30 - "formatNumber"
Cohesion: 0.13
Nodes (29): decimalSeparator(), Digits, formatNumber(), formatRational(), fromNumber(), fromRational(), SUPERSCRIPT, writeDigits() (+21 more)

### Community 31 - "drawScene"
Cohesion: 0.15
Nodes (17): Vec3, escapeXml(), arrowHead(), boxShape(), Coverage, Directions, dot(), drawScene() (+9 more)

### Community 32 - "distributions.ts"
Cohesion: 0.07
Nodes (60): addExp(), choose(), continuousQuantile(), discreteQuantile(), exactIntervalProbability(), expSumValue(), factorialBig(), FAMILIES (+52 more)

### Community 33 - "markdown.ts"
Cohesion: 0.11
Nodes (29): cache, escapeHtml(), renderTexOrError(), renderTexWithResult(), TexRender, configurePurify(), createMarkdownIt(), FORBIDDEN_TAGS (+21 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "MathNode"
Cohesion: 0.07
Nodes (42): Dove sono le cose, Definition, Line, ExactComplexScope, ConicElements, Ode, withWorkLimit(), FiniteContext (+34 more)

### Community 36 - "placeholders.ts"
Cohesion: 0.13
Nodes (12): addPlaceholders, buildDecorations(), clearAllPlaceholders(), clearPlaceholders, contains(), currentIndex(), filledMark, getPlaceholders() (+4 more)

### Community 37 - "namesIn"
Cohesion: 0.13
Nodes (36): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+28 more)

### Community 38 - "domain.ts"
Cohesion: 0.10
Nodes (44): constantIntegrand(), depth(), integralRegion, LayeredSolid, Multiple, planeMargin(), PlanePart, radiusOf() (+36 more)

### Community 39 - "resize.ts"
Cohesion: 0.13
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "statsShown.ts"
Cohesion: 0.17
Nodes (32): Lin, check(), correlation(), count(), covariance(), Data, dataStatistic(), deviation() (+24 more)

### Community 41 - "vitest"
Cohesion: 0.06
Nodes (37): vite-plugin-pwa, vitest, staticGraphSvg(), chooseWindow(), chooseBox(), GraphItem, parseGraph(), PALETTES (+29 more)

### Community 42 - "NotesStore"
Cohesion: 0.07
Nodes (38): accountSpace(), adoptGuestNotes(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf(), setCurrentAccount() (+30 more)

### Community 43 - "study.ts"
Cohesion: 0.16
Nodes (31): Asymptote, boundaries(), compiled(), cutsOf(), defined(), domainOf(), exact(), inDomain() (+23 more)

### Community 44 - "toolbar.ts"
Cohesion: 0.23
Nodes (12): insertBlock(), wrapSelection(), Action, createToolbar(), insertCode(), insertLink(), listMenu(), close() (+4 more)

### Community 45 - "supabase.ts"
Cohesion: 0.11
Nodes (35): @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken(), ensureSessionOf() (+27 more)

### Community 46 - "probability.ts"
Cohesion: 0.15
Nodes (21): End, CompileOptions, ExactScope, ALL, complement(), endAt(), EventContext, eventSet() (+13 more)

### Community 47 - "complex.ts"
Cohesion: 0.07
Nodes (51): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, inZ(), isComplexLine(), isComplexValue(), isInequality() (+43 more)

### Community 48 - "database.ts"
Cohesion: 0.27
Nodes (5): createDatabase(), createUser(), databaseTests(), migrations, shareTests()

### Community 49 - "spell.test.ts"
Cohesion: 0.08
Nodes (23): @codemirror/lang-markdown, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt() (+15 more)

### Community 50 - "leastSquares"
Cohesion: 0.43
Nodes (7): exactPolynomial(), floatPolynomial(), interpolating(), interpolation(), leastSquares(), plotData(), pointsOf()

### Community 51 - "toLatex"
Cohesion: 0.10
Nodes (36): hasExponential(), valueLabel(), isNumericalLine(), numericalItems(), multipleLabel(), names(), STUDY_GRAPH, studyItems() (+28 more)

### Community 52 - "search.ts"
Cohesion: 0.18
Nodes (23): editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex() (+15 more)

### Community 54 - "files.ts"
Cohesion: 0.27
Nodes (11): inClaudeViewer(), canWriteFilesDirectly(), FsWindow, isAbort(), MD_TYPES, OpenedFile, openMarkdownFiles(), PickerType (+3 more)

### Community 55 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "insert.ts"
Cohesion: 0.11
Nodes (19): @codemirror/state, @codemirror/view, InsertOptions, toggleLinePrefix(), blockLine, inlineRegion, marks, mathHighlighter (+11 more)

### Community 58 - ".int"
Cohesion: 0.11
Nodes (8): characteristicPolynomial(), eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn(), R()

### Community 59 - "SidePanel"
Cohesion: 0.24
Nodes (5): cleanKatexError(), renderTex(), displayCode(), preventFocusSteal(), SidePanel

### Community 60 - "graph.ts"
Cohesion: 0.05
Nodes (40): @maxgraph/core, AT_X, cellHtml(), COMPASS, createGraph(), drawSchema(), isEdgeLook(), isNodeLook() (+32 more)

### Community 61 - "dependencies"
Cohesion: 0.06
Nodes (32): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+24 more)

### Community 62 - "openShareDialog"
Cohesion: 0.09
Nodes (35): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), PullResult, openShareDialog(), changeAccess(), changeCopy() (+27 more)

### Community 64 - "schema/preview.ts"
Cohesion: 0.15
Nodes (13): Look, SchemaError, Theme, draw(), drawCached(), drawn, errorHtml(), fill() (+5 more)

### Community 65 - "markers.ts"
Cohesion: 0.11
Nodes (36): Item, ListStyle, bullet(), bulletGroup(), childMarker(), column(), firstMarker(), label() (+28 more)

### Community 66 - "graphNote.test.ts"
Cohesion: 0.11
Nodes (22): @codemirror/language, acceptCalcResult(), calcPlugin, CalcResult, calcResults(), formulasUntil(), insertResult(), ResultWidget (+14 more)

### Community 68 - "sql.ts"
Cohesion: 0.14
Nodes (18): loadDialect(), Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote() (+10 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "package.json"
Cohesion: 0.06
Nodes (32): description, name, private, scripts, build, dev, preview, test (+24 more)

### Community 72 - "editor.test.ts"
Cohesion: 0.10
Nodes (18): templateInsertion(), CODE_NODES, CommandToken, commandTokenAt(), EditorMathContext, isInCode(), MATH_NODES, mathContextAt() (+10 more)

### Community 73 - "statsGraph.ts"
Cohesion: 0.17
Nodes (17): number(), testItems(), SliderState, Range, classes(), dataOf(), distributionExtent(), distributionLabel() (+9 more)

### Community 74 - "severalGraph.ts"
Cohesion: 0.29
Nodes (11): FieldContext, criticalLine(), named(), severalItems(), surface(), Scope, LinearScope, optimumOf() (+3 more)

### Community 75 - "editor/editor.ts"
Cohesion: 0.11
Nodes (16): @codemirror/commands, @lezer/highlight, closeMathBlockOnEnter(), EditorCallbacks, highlight, italianPhrases, MarkdownEditor, tabOutOfMath() (+8 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 79 - "sheet.ts"
Cohesion: 0.09
Nodes (41): exponentialForm(), fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), close() (+33 more)

### Community 83 - "sidePanel.ts"
Cohesion: 0.19
Nodes (15): SuggestionItem, isConfidentAnswer(), CATEGORIES, SYMBOLS, symbolsInCategory(), cardPreviewTex(), formPreviewTex(), ParsedTemplate (+7 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.06
Nodes (32): Abbonamenti, Classico, gratis: per scrivere e controllare, Com'è andata la discussione, Come si costruisce (per dopo), Come si decide cosa far pagare, Cosa fare, in ordine, Cosa succede dietro, Cosa vede chi studia (+24 more)

### Community 91 - "Glifo"
Cohesion: 0.15
Nodes (13): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Funzionalità (+5 more)

### Community 92 - "toNode"
Cohesion: 0.12
Nodes (32): absOf(), boundsOf(), close(), definite(), fourierProblem, fourierShown(), isTrig(), isZero() (+24 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.05
Nodes (27): playwright-core, device(), login(), newContext, waitFor(), b64(), CODE, createFakeSupabase() (+19 more)

### Community 97 - "Il database degli account (Supabase)"
Cohesion: 0.17
Nodes (11): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Nell'app, Note condivise con un link (+3 more)

### Community 102 - "page.ts"
Cohesion: 0.11
Nodes (20): currentAccount(), body, draw(), isDark(), load(), saveButton, saveCopy(), settings (+12 more)

### Community 109 - "Glifo – note per Claude"
Cohesion: 0.20
Nodes (7): Comandi, Come controllare il lavoro, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole, sqlite()

## Knowledge Gaps
- **520 isolated node(s):** `Deciso`, `Com'è andata la discussione`, `La proposta dello studente (4 ottobre 2026)`, `Il parere di Claude, in breve`, `Come si decide cosa far pagare` (+515 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 693 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `main.ts`, `sync.ts`, `schema/editor.ts`, `num`, `svg.ts`, `linsys.ts`, `editor/lists.ts`, `view3d.ts`, `parse.ts`, `linear.ts`, `h`, `assistant.ts`, `settings.ts`, `distributions.ts`, `markdown.ts`, `MathNode`, `resize.ts`, `NotesStore`, `supabase.ts`, `database.ts`, `spell.test.ts`, `search.ts`, `insert.ts`, `openShareDialog`, `markers.ts`, `graphNote.test.ts`, `package.json`, `editor.test.ts`, `editor/editor.ts`, `sidePanel.ts`, `page.ts`?**
  _High betweenness centrality (0.114) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `MathNode` to `Parser`, `main.ts`, `odesolve.ts`, `spec.ts`, `arithmetic.ts`, `primitive.ts`, `graph/preview.ts`, `schema/editor.ts`, `symbolic.ts`, `num`, `svg.ts`, `linsys.ts`, `SchemaEditor`, `view3d.ts`, `MathError`, `numerical.ts`, `Rational`, `several.ts`, `linear.ts`, `h`, `numericalShown`, `distributions.ts`, `markdown.ts`, `logic.ts`, `namesIn`, `study.ts`, `supabase.ts`, `complex.ts`, `toLatex`, `finite.ts`, `graph.ts`, `schema/preview.ts`, `graphNote.test.ts`, `sheet.ts`, `toNode`, `Glifo – note per Claude`?**
  _High betweenness centrality (0.079) - this node is a cross-community bridge._
- **Why does `Rational` connect `Rational` to `solve.ts`, `odesolve.ts`, `arithmetic.ts`, `primitive.ts`, `symbolic.ts`, `num`, `linsys.ts`, `numerical.ts`, `several.ts`, `linear.ts`, `formatNumber`, `distributions.ts`, `MathNode`, `statsShown.ts`, `study.ts`, `probability.ts`, `complex.ts`, `finite.ts`, `.int`, `statsGraph.ts`, `severalGraph.ts`, `sheet.ts`, `toNode`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **What connects `Deciso`, `Com'è andata la discussione`, `La proposta dello studente (4 ottobre 2026)` to the rest of the system?**
  _520 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Parser` be split into smaller, more focused modules?**
  _Cohesion score 0.12167449139280125 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04564240790655885 - nodes in this community are weakly interconnected._
- **Should `odesolve.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08783321941216678 - nodes in this community are weakly interconnected._