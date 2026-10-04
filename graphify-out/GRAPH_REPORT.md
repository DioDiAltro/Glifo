# Graph Report - matherdown  (2026-10-04)

## Corpus Check
- 218 files · ~395,143 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 3457 nodes · 12528 edges · 115 communities (99 shown, 16 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 330 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `022f80ae`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- solve.ts
- parse.ts
- main.ts
- odesolve.ts
- sync.ts
- spec.ts
- toLatex
- num
- graph/preview.ts
- schema/editor.ts
- symbolic.ts
- numericalGraph.ts
- svg.ts
- linsys.ts
- SchemaEditor
- vitest
- graph/space.ts
- evaluate.ts
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
- package.json
- graphNote.test.ts
- fields.ts
- .folderItem
- resize.ts
- sheet.ts
- files.ts
- NotesStore
- study.ts
- account/space.ts
- supabase.ts
- probability.ts
- complex.ts
- distributions.ts
- editor/editor.ts
- page.ts
- calcPlugin
- search.ts
- editor/lists.ts
- domain.ts
- finite.ts
- 20261004091555_note_condivise.sql
- schemaBlocks.ts
- Field
- SidePanel
- graph.ts
- dependencies
- schema/preview.ts
- MathNode
- inference.ts
- markers.ts
- SuggestionController
- tutorial.mjs
- parseSchema
- Benvenuto in Glifo
- compilerOptions
- icons.mjs
- settings.ts
- statsGraph.ts
- placeholders.ts
- toolbar.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- Distribution
- limits.ts
- session-start.sh
- .claude/CLAUDE.md
- Glifo
- sidePanel.ts
- namesIn
- Dove sono le cose
- powerseries.ts
- supabase-stub.sql
- account-test.mjs
- Più avanti
- .solveAll
- AccountSync
- Glifo – note per Claude
- compile
- smoke-test.mjs
- Sheet
- ROADMAP.md
- grafo-html.mjs
- Il database degli account (Supabase)
- logo.ts
- graph/file.ts
- createFakeSupabase
- fourierGraph.ts
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
- `Funzionalità` --references--> `k()`  [INFERRED]
  README.md → src/math/numerical.ts
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

## Communities (115 total, 16 thin omitted)

### Community 0 - "solve.ts"
Cohesion: 0.17
Nodes (25): Scope, LinearScope, isStandardUnknown(), RelOp, numericRoots(), breaks(), cubeRoot(), equation() (+17 more)

### Community 1 - "parse.ts"
Cohesion: 0.08
Nodes (40): hasWord(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe() (+32 more)

### Community 2 - "main.ts"
Cohesion: 0.05
Nodes (90): addToGraphBlock(), graphsForFile(), graphsFromFile(), hide(), unhide(), account, active, app (+82 more)

### Community 3 - "odesolve.ts"
Cohesion: 0.08
Nodes (80): primed(), addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames() (+72 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (37): withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty(), iso() (+29 more)

### Community 5 - "spec.ts"
Cohesion: 0.06
Nodes (76): conicItems(), isConicLine(), quadricEquation(), hasExponential(), Multiple, multipleOf(), PlanePart, areaOf() (+68 more)

### Community 6 - "toLatex"
Cohesion: 0.06
Nodes (74): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+66 more)

### Community 7 - "num"
Cohesion: 0.15
Nodes (75): atIntegers(), signsUp(), symbolicCoefficient(), withoutAbs(), exp(), hyperbolicToExp(), inverseRational(), sqrtEx() (+67 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (42): addLabel(), boxes, cameras, complexCoord(), coord(), drawings, drawnViews, endTex() (+34 more)

### Community 9 - "schema/editor.ts"
Cohesion: 0.04
Nodes (73): alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ARROW_NAMES, AT_ICONS (+65 more)

### Community 10 - "symbolic.ts"
Cohesion: 0.07
Nodes (57): EMPTY_SCOPE, linearIn(), verified(), atValues(), Converter, coordinates(), decimalText(), definiteParts() (+49 more)

### Community 11 - "numericalGraph.ts"
Cohesion: 0.80
Nodes (4): isNumericalLine(), numericalItems(), isPlottedNumerical(), numericalPlot()

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (52): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), domainEdge(), features() (+44 more)

### Community 13 - "linsys.ts"
Cohesion: 0.12
Nodes (46): evaluateLinear(), rref(), choices(), gcd(), linearSystem(), matrixEquation(), matrixSystem(), minorsGcd() (+38 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.08
Nodes (15): SchemaEditor, cellText(), createEdgeCell(), edgeLook(), edgeStyle(), edgeTextAt(), insertSchema(), nodeLook() (+7 more)

### Community 15 - "vitest"
Cohesion: 0.08
Nodes (29): vitest, staticGraphSvg(), chooseWindow(), chooseBox(), GraphItem, parseGraph(), DrawOptions, PALETTES (+21 more)

### Community 16 - "graph/space.ts"
Cohesion: 0.13
Nodes (48): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+40 more)

### Community 17 - "evaluate.ts"
Cohesion: 0.08
Nodes (33): Interval, binomial(), compare(), compileApply(), compileCondition(), compileDerivative(), compileFunction(), compileRandomFunction() (+25 more)

### Community 18 - "numerical.ts"
Cohesion: 0.12
Nodes (47): bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial(), interpolating() (+39 more)

### Community 19 - "FoldersStore"
Cohesion: 0.08
Nodes (21): Deletion, DeletionLog, cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder() (+13 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (41): b, bigops, c, calculus, fn, fr, fractions, functions (+33 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "Rational"
Cohesion: 0.11
Nodes (22): expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactRandom, exactRoot(), factorialExact() (+14 more)

### Community 23 - "conics.ts"
Cohesion: 0.19
Nodes (28): at(), centralCanonical(), Coefficients, coneCanonical(), ConicInfo, conicOf(), det2(), det3() (+20 more)

### Community 24 - "several.ts"
Cohesion: 0.07
Nodes (65): criticalLine(), isSeveralLine(), named(), severalItems(), surface(), ACCENT_COMMANDS, COMPLEX_FUNCTIONS, diffLatex() (+57 more)

### Community 25 - "MathError"
Cohesion: 0.13
Nodes (52): MathError, UndefinedName, angleBetween(), asMatrix(), basisOf(), cross(), Ctx, dataOf() (+44 more)

### Community 26 - "h"
Cohesion: 0.07
Nodes (45): SyncStatus, openGuide(), viewSwitch, openSignedOut(), printButton(), ShareDialogDeps, Settings, AccountButton (+37 more)

### Community 27 - "assistant.ts"
Cohesion: 0.17
Nodes (13): @anthropic-ai/sdk, AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askThroughHost() (+5 more)

### Community 28 - "spell.test.ts"
Cohesion: 0.08
Nodes (23): @codemirror/lang-markdown, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt() (+15 more)

### Community 29 - "fake-supabase.mjs"
Cohesion: 0.25
Nodes (6): @electric-sql/pglite, b64(), CODE, GOOGLE_CODE, ROOT, SUPABASE_URL

### Community 30 - "spaces.ts"
Cohesion: 0.09
Nodes (43): formatGauss(), decimalSeparator(), Digits, formatNumber(), FormatOptions, formatRational(), fromNumber(), fromRational() (+35 more)

### Community 31 - "view3d.ts"
Cohesion: 0.09
Nodes (37): Detail, Face, FAST, FINE, planeTolerance(), Plane, Vec3, escapeXml() (+29 more)

### Community 32 - "laplace.ts"
Cohesion: 0.14
Nodes (33): factoredPolynomial(), polynomialOf(), definite(), isTrig(), linearTrig(), oneFraction(), beyondPoles(), compiled() (+25 more)

### Community 33 - "markdown.ts"
Cohesion: 0.11
Nodes (30): lineDepth(), parseBlockMath(), blockLines(), graphNames(), renderTexOrError(), renderTexWithResult(), configurePurify(), createMarkdownIt() (+22 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "package.json"
Cohesion: 0.05
Nodes (37): description, devDependencies, @electric-sql/pglite, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+29 more)

### Community 36 - "graphNote.test.ts"
Cohesion: 0.09
Nodes (33): @codemirror/language, @codemirror/state, @codemirror/view, acceptCalcResult(), CalcResult, calcResults(), formulasUntil(), insertResult() (+25 more)

### Community 37 - "fields.ts"
Cohesion: 0.14
Nodes (31): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+23 more)

### Community 38 - ".folderItem"
Cohesion: 0.22
Nodes (3): formatDate(), NotesPanel, NotesPanelDeps

### Community 39 - "resize.ts"
Cohesion: 0.13
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "sheet.ts"
Cohesion: 0.12
Nodes (41): expSumValue(), ExactFunction, Lin, INFERENCE, parsed, SPACES, STATISTICS, STUDY (+33 more)

### Community 41 - "files.ts"
Cohesion: 0.13
Nodes (21): cache, capability(), ClaudeRuntime, hostDownloads, HostError, hostSample, inClaudeViewer(), ModelTier (+13 more)

### Community 42 - "NotesStore"
Cohesion: 0.13
Nodes (11): createdAtFromId(), deriveTitle(), NotesStore, hasLocalStorage(), memory, migrateKeyPrefix(), readItem(), removeItem() (+3 more)

### Community 43 - "study.ts"
Cohesion: 0.14
Nodes (36): names(), STUDY_GRAPH, studyItems(), nameLatex(), limit(), Asymptote, compiled(), cutsOf() (+28 more)

### Community 44 - "account/space.ts"
Cohesion: 0.20
Nodes (18): accountSpace(), adoptGuestNotes(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf(), setCurrentAccount() (+10 more)

### Community 45 - "supabase.ts"
Cohesion: 0.13
Nodes (29): @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken(), ensureSessionOf() (+21 more)

### Community 46 - "probability.ts"
Cohesion: 0.13
Nodes (23): End, Family, CompileOptions, ExactScope, ALL, complement(), distributionOf(), EventContext (+15 more)

### Community 47 - "complex.ts"
Cohesion: 0.06
Nodes (63): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, inZ(), isComplexLine(), isComplexValue(), isInequality() (+55 more)

### Community 48 - "distributions.ts"
Cohesion: 0.18
Nodes (26): choose(), continuousQuantile(), discreteQuantile(), factorialBig(), FAMILIES, integerParam(), invalid(), makeDistribution() (+18 more)

### Community 49 - "editor/editor.ts"
Cohesion: 0.09
Nodes (18): @codemirror/commands, @lezer/highlight, closeMathBlockOnEnter(), EditorCallbacks, highlight, italianPhrases, MarkdownEditor, tabOutOfMath() (+10 more)

### Community 50 - "page.ts"
Cohesion: 0.06
Nodes (46): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), currentAccount(), PullResult, hydrateGraphs(), openShareDialog() (+38 more)

### Community 52 - "search.ts"
Cohesion: 0.18
Nodes (23): editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex() (+15 more)

### Community 53 - "editor/lists.ts"
Cohesion: 0.19
Nodes (29): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+21 more)

### Community 54 - "domain.ts"
Cohesion: 0.09
Nodes (46): constantIntegrand(), depth(), inequalityMargin(), integralRegion, LayeredSolid, planeMargin(), planeParts(), radiusOf() (+38 more)

### Community 55 - "finite.ts"
Cohesion: 0.19
Nodes (26): countOf(), elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError, FiniteResult (+18 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "schemaBlocks.ts"
Cohesion: 0.16
Nodes (11): toggleLinePrefix(), besideSchema(), guardBlocks(), schemaBlockRanges(), schemaBlocks(), SchemaWidget, summary(), heading() (+3 more)

### Community 58 - "Field"
Cohesion: 0.10
Nodes (9): numericPartials(), characteristicPolynomial(), eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn() (+1 more)

### Community 59 - "SidePanel"
Cohesion: 0.19
Nodes (9): formulaAtCursor(), insertGraphBlock(), graphBlockText(), insertGraph(), cleanKatexError(), renderTex(), displayCode(), preventFocusSteal() (+1 more)

### Community 60 - "graph.ts"
Cohesion: 0.05
Nodes (40): @maxgraph/core, escapeHtml(), renderTexMathml(), AT_X, cellHtml(), COMPASS, createGraph(), drawSchema() (+32 more)

### Community 61 - "dependencies"
Cohesion: 0.09
Nodes (23): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+15 more)

### Community 62 - "schema/preview.ts"
Cohesion: 0.16
Nodes (12): Look, Theme, draw(), drawCached(), drawn, errorHtml(), fill(), hydrateSchemas() (+4 more)

### Community 63 - "MathNode"
Cohesion: 0.19
Nodes (10): ExactComplexScope, Ode, withWorkLimit(), Elem, FiniteContext, FormattedResult, MathNode, Definition (+2 more)

### Community 64 - "inference.ts"
Cohesion: 0.18
Nodes (23): confidence(), confidenceShown(), Given, hypothesisTest(), interval(), meanOf(), nameOf(), num() (+15 more)

### Community 65 - "markers.ts"
Cohesion: 0.11
Nodes (36): Item, ListStyle, bullet(), bulletGroup(), childMarker(), column(), firstMarker(), label() (+28 more)

### Community 66 - "SuggestionController"
Cohesion: 0.23
Nodes (3): expand(), preferredIndex(), SuggestionController

### Community 67 - "tutorial.mjs"
Cohesion: 0.20
Nodes (6): centerOf(), clickOn(), ffmpeg, SCENES, SIZE, work

### Community 68 - "parseSchema"
Cohesion: 0.09
Nodes (30): SchemaEditorOptions, isRecord(), num(), oneOf(), parseSchema(), point(), Schema, SchemaError (+22 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 72 - "settings.ts"
Cohesion: 0.13
Nodes (20): addPersonalWord(), DICTIONARY_KEY, loadPersonalWords(), savePersonalWords(), tidy(), ACCOUNT_SETTINGS, accountSettings(), AI_MODELS (+12 more)

### Community 73 - "statsGraph.ts"
Cohesion: 0.19
Nodes (15): isTestLine(), number(), testItems(), classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX (+7 more)

### Community 74 - "placeholders.ts"
Cohesion: 0.13
Nodes (12): addPlaceholders, buildDecorations(), clearAllPlaceholders(), clearPlaceholders, contains(), currentIndex(), filledMark, getPlaceholders() (+4 more)

### Community 75 - "toolbar.ts"
Cohesion: 0.23
Nodes (12): insertBlock(), wrapSelection(), Action, createToolbar(), insertCode(), insertLink(), listMenu(), close() (+4 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "Distribution"
Cohesion: 0.17
Nodes (10): addExp(), Distribution, exactIntervalProbability(), integerRange(), intervalProbability(), subtractExp(), pValue(), TestResult (+2 more)

### Community 79 - "limits.ts"
Cohesion: 0.23
Nodes (15): valueLabel(), exponentialForm(), fracTex(), fracText(), nearFraction(), piMultiple(), surd(), close() (+7 more)

### Community 82 - "Glifo"
Cohesion: 0.20
Nodes (10): Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Funzionalità, Glifo, Idee per il futuro (+2 more)

### Community 83 - "sidePanel.ts"
Cohesion: 0.13
Nodes (19): katex, SuggestionItem, cache, TexRender, isConfidentAnswer(), SearchResult, CATEGORIES, symbolsInCategory() (+11 more)

### Community 90 - "namesIn"
Cohesion: 0.24
Nodes (3): namesIn(), definitionTarget(), scopeWithSets()

### Community 91 - "Dove sono le cose"
Cohesion: 0.21
Nodes (10): Dove sono le cose, ConicElements, odeOf(), systemOf(), withPrimes(), chiSquareTest(), InferenceContext, Wave (+2 more)

### Community 92 - "powerseries.ts"
Cohesion: 0.26
Nodes (11): alternating(), derivatives(), seriesSum(), convergesAt(), gcdInt(), logParts(), nearConstant(), PowerSeries (+3 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.20
Nodes (4): device(), login(), newContext, waitFor()

### Community 97 - "Più avanti"
Cohesion: 0.22
Nodes (9): Abbonamento e funzioni a pagamento (da capire), Aiuto con gli esercizi, Calcoli e grafici: idee in più, Matematica per i corsi: idee in più, Non solo appunti, Più avanti, Schemi: idee in più, Trascrizione delle lezioni in appunti (+1 more)

### Community 98 - ".solveAll"
Cohesion: 0.22
Nodes (6): differentialRequest, pieces(), parseCached(), splitPieces(), styleOf(), walk()

### Community 101 - "Glifo – note per Claude"
Cohesion: 0.25
Nodes (7): Comandi, Come controllare il lavoro, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole, sqlite()

### Community 102 - "compile"
Cohesion: 0.17
Nodes (26): areaFor(), constantValue(), argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot() (+18 more)

### Community 103 - "smoke-test.mjs"
Cohesion: 0.29
Nodes (4): markdown-it, vite, firstVisit(), plainContext

### Community 104 - "Sheet"
Cohesion: 0.11
Nodes (25): Sheet, text(), tex(), text(), result(), text(), result(), text() (+17 more)

### Community 105 - "ROADMAP.md"
Cohesion: 0.29
Nodes (5): Account: i propri appunti su ogni dispositivo, anche da condividere, Altre idee, Controllare e mostrare quello che si scrive, Idee per il futuro, In programma

### Community 106 - "grafo-html.mjs"
Cohesion: 0.25
Nodes (4): graphFile, names, namesFile, root

### Community 107 - "Il database degli account (Supabase)"
Cohesion: 0.25
Nodes (8): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Nell'app, Note condivise con un link

### Community 108 - "logo.ts"
Cohesion: 0.48
Nodes (4): glyph(), LOGO_COLOR, logoIcon(), logoMark()

### Community 109 - "graph/file.ts"
Cohesion: 0.48
Nodes (6): graphImage(), graphImagesFor(), OPEN, areaColor(), graphTitle(), itemColors()

### Community 110 - "createFakeSupabase"
Cohesion: 0.60
Nodes (6): createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 112 - "fourierGraph.ts"
Cohesion: 0.83
Nodes (3): fourierItems(), isFourierLine(), partialSum()

### Community 113 - "Sincronizzazione"
Cohesion: 0.50
Nodes (3): Sincronizzazione, `sync_pull({ since })`: scarica le novità, `sync_push({ changes })`: manda le modifiche

### Community 114 - "Account"
Cohesion: 0.67
Nodes (3): Account, Condividere una nota con un link, Usarla tutti i giorni

## Knowledge Gaps
- **488 isolated node(s):** `session-start.sh script`, `name`, `private`, `version`, `description` (+483 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 664 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `sync.ts`, `num`, `schema/editor.ts`, `svg.ts`, `linsys.ts`, `graph/space.ts`, `evaluate.ts`, `FoldersStore`, `MathError`, `h`, `assistant.ts`, `spell.test.ts`, `markdown.ts`, `package.json`, `graphNote.test.ts`, `resize.ts`, `account/space.ts`, `supabase.ts`, `distributions.ts`, `editor/editor.ts`, `page.ts`, `search.ts`, `editor/lists.ts`, `schemaBlocks.ts`, `markers.ts`, `parseSchema`, `settings.ts`, `sidePanel.ts`, `compile`, `Sheet`, `logo.ts`?**
  _High betweenness centrality (0.124) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `Dove sono le cose` to `parse.ts`, `main.ts`, `odesolve.ts`, `spec.ts`, `toLatex`, `graph/preview.ts`, `schema/editor.ts`, `symbolic.ts`, `numericalGraph.ts`, `svg.ts`, `linsys.ts`, `SchemaEditor`, `graph/space.ts`, `numerical.ts`, `Rational`, `several.ts`, `MathError`, `h`, `laplace.ts`, `markdown.ts`, `logic.ts`, `fields.ts`, `study.ts`, `supabase.ts`, `complex.ts`, `finite.ts`, `graph.ts`, `schema/preview.ts`, `MathNode`, `inference.ts`, `limits.ts`, `namesIn`, `powerseries.ts`, `.solveAll`, `Glifo – note per Claude`, `fourierGraph.ts`?**
  _High betweenness centrality (0.077) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `main.ts`, `.folderItem`, `resize.ts`, `schema/editor.ts`, `toolbar.ts`, `SchemaEditor`, `page.ts`, `FoldersStore`, `sidePanel.ts`, `SidePanel`, `spell.test.ts`, `schema/preview.ts`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **What connects `session-start.sh script`, `name`, `private` to the rest of the system?**
  _488 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `parse.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07646048109965636 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04658833230261802 - nodes in this community are weakly interconnected._
- **Should `odesolve.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07993827160493827 - nodes in this community are weakly interconnected._