# Graph Report - matherdown  (2026-10-05)

## Corpus Check
- 220 files · ~408,147 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 3527 nodes · 12780 edges · 118 communities (101 shown, 17 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 339 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b3c0c12a`
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
- editor/editor.ts
- svg.ts
- linsys.ts
- SchemaEditor
- editor/lists.ts
- graph/space.ts
- compile
- numerical.ts
- .folderItem
- index.ts
- client.ts
- exact.ts
- graph.ts
- sheet.ts
- MathError
- h
- assistant.ts
- markers.ts
- Rational
- spaces.ts
- view3d.ts
- distributions.ts
- markdown.ts
- logic.ts
- MathNode
- placeholders.ts
- namesIn
- complex.test.ts
- resize.ts
- statsShown.ts
- Sheet
- NotesStore
- study.ts
- complex.ts
- statsGraph.ts
- FoldersStore
- compileComplex
- Distribution
- spell.test.ts
- probability.ts
- gauss.ts
- search.ts
- graph/file.ts
- limits.ts
- finite.ts
- 20261004091555_note_condivise.sql
- toolbar.ts
- .int
- sidePanel.ts
- shapes.ts
- dependencies
- supabase.ts
- templates.ts
- schema/preview.ts
- NodeLook
- calcPlugin
- Glifo
- sql.ts
- Benvenuto in Glifo
- compilerOptions
- package.json
- suggestions.ts
- inference.ts
- toLatex
- MarkdownEditor
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/file.ts
- engine.ts
- session-start.sh
- .claude/CLAUDE.md
- Più avanti
- tutorial.mjs
- Abbonamenti
- severalGraph.ts
- several.ts
- supabase-stub.sql
- account-test.mjs
- Il database degli account (Supabase)
- Costi
- smoke-test.mjs
- Idee per il futuro
- page.ts
- I modelli e le chiavi API
- files.ts
- Le spiegazioni, come funzionano
- fake-supabase.mjs
- Piano per piano
- icons.mjs
- Glifo – note per Claude
- logo.ts
- grafo-html.mjs
- La lavagna
- UndefinedName
- createFakeSupabase
- .openSql
- SpellClient

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

## Communities (118 total, 17 thin omitted)

### Community 0 - "solve.ts"
Cohesion: 0.11
Nodes (35): decimalSeparator(), Digits, formatNumber(), FormatOptions, fromNumber(), fromRational(), SUPERSCRIPT, writeDigits() (+27 more)

### Community 1 - "parse.ts"
Cohesion: 0.08
Nodes (39): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe(), differentialInFraction() (+31 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (102): graphsForFile(), hide(), account, accountButton, active, app, applyAccountChange(), applySpellcheck() (+94 more)

### Community 3 - "odesolve.ts"
Cohesion: 0.08
Nodes (87): elemOf(), linearIn(), termTransform(), addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots() (+79 more)

### Community 4 - "sync.ts"
Cohesion: 0.05
Nodes (38): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+30 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (109): conicItems(), isConicLine(), quadricEquation(), isFourierLine(), isComplexLine(), onlyComplex(), isTestLine(), constantIntegrand() (+101 more)

### Community 6 - "arithmetic.ts"
Cohesion: 0.07
Nodes (73): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+65 more)

### Community 7 - "num"
Cohesion: 0.13
Nodes (83): atIntegers(), withoutAbs(), exp(), hyperbolicToExp(), inverseRational(), sqrtEx(), polyEx(), similarSolution() (+75 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (41): addLabel(), boxes, cameras, complexCoord(), coord(), drawings, drawnViews, endTex() (+33 more)

### Community 9 - "schema/editor.ts"
Cohesion: 0.05
Nodes (59): alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ARROW_NAMES, AT_ICONS (+51 more)

### Community 10 - "symbolic.ts"
Cohesion: 0.08
Nodes (42): atValues(), cancelLinear(), commonMonomial(), coordinates(), decimalText(), degree(), denominatorPart(), exactRoot() (+34 more)

### Community 11 - "editor/editor.ts"
Cohesion: 0.09
Nodes (38): @codemirror/language, @codemirror/state, @codemirror/view, @lezer/common, @lezer/highlight, acceptCalcResult(), CalcResult, insertResult() (+30 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (53): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseWindow(), chooseY(), clipLines(), domainEdge() (+45 more)

### Community 13 - "linsys.ts"
Cohesion: 0.13
Nodes (45): rref(), choices(), gcd(), linearSystem(), matrixEquation(), matrixSystem(), minorsGcd(), ONE (+37 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.11
Nodes (3): SchemaEditor, createEdgeCell(), serializeSchema()

### Community 15 - "editor/lists.ts"
Cohesion: 0.16
Nodes (34): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+26 more)

### Community 16 - "graph/space.ts"
Cohesion: 0.11
Nodes (47): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+39 more)

### Community 17 - "compile"
Cohesion: 0.09
Nodes (44): argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot(), fieldOn(), numericPartials() (+36 more)

### Community 18 - "numerical.ts"
Cohesion: 0.11
Nodes (48): Funzionalità, bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial() (+40 more)

### Community 19 - ".folderItem"
Cohesion: 0.16
Nodes (6): clear(), formatDate(), MenuEntry, openMenu(), NotesPanel, NotesPanelDeps

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (40): b, bigops, c, calculus, fn, fr, fractions, functions (+32 more)

### Community 21 - "client.ts"
Cohesion: 0.13
Nodes (12): Backend, pageBackend(), SpellClientOptions, workerBackend(), WorkerUnavailable, download(), fetchDictionary(), FILES (+4 more)

### Community 22 - "exact.ts"
Cohesion: 0.17
Nodes (14): expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactFunction, ExactRandom, exactRoot() (+6 more)

### Community 23 - "graph.ts"
Cohesion: 0.10
Nodes (30): AT_X, cellHtml(), cellText(), COMPASS, createGraph(), drawSchema(), edgeLook(), edgeStyle() (+22 more)

### Community 24 - "sheet.ts"
Cohesion: 0.10
Nodes (30): Dove sono le cose, Ode, OdeFunction, chiSquareTest(), InferenceContext, Eigenvalue, LinearValue, CHECK_VALUES (+22 more)

### Community 25 - "MathError"
Cohesion: 0.13
Nodes (53): MathError, angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, dataOf() (+45 more)

### Community 26 - "h"
Cohesion: 0.07
Nodes (46): SyncStatus, helpButton, openGuide(), viewSwitch, openSignedOut(), printButton(), ShareDialogDeps, Settings (+38 more)

### Community 27 - "assistant.ts"
Cohesion: 0.10
Nodes (21): @anthropic-ai/sdk, AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askThroughHost() (+13 more)

### Community 28 - "markers.ts"
Cohesion: 0.12
Nodes (32): ListStyle, bullet(), bulletGroup(), childMarker(), column(), firstMarker(), label(), lettersMarker() (+24 more)

### Community 29 - "Rational"
Cohesion: 0.11
Nodes (35): Part, at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf() (+27 more)

### Community 30 - "spaces.ts"
Cohesion: 0.11
Nodes (29): formatRational(), eigenvectors(), EXACT, FLOAT, kernel(), lengthText(), Mat, splitRoot() (+21 more)

### Community 31 - "view3d.ts"
Cohesion: 0.10
Nodes (37): Face, planeTolerance(), regionFaces(), surfacePlane(), Plane, Vec3, escapeXml(), Palette (+29 more)

### Community 32 - "distributions.ts"
Cohesion: 0.18
Nodes (26): choose(), expSumValue(), factorialBig(), FAMILIES, Family, integerParam(), invalid(), makeDistribution() (+18 more)

### Community 33 - "markdown.ts"
Cohesion: 0.10
Nodes (35): katex, lineDepth(), parseBlockMath(), cache, escapeHtml(), renderTexMathml(), renderTexOrError(), renderTexWithResult() (+27 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "MathNode"
Cohesion: 0.08
Nodes (37): integralRegion, axesIn(), bestAlong(), boundingBox(), combine(), compileDomain(), compileMultiple(), conditionsOf() (+29 more)

### Community 36 - "placeholders.ts"
Cohesion: 0.10
Nodes (14): addPlaceholders, buildDecorations(), clearAllPlaceholders(), clearPlaceholders, contains(), currentIndex(), filledMark, getPlaceholders() (+6 more)

### Community 37 - "namesIn"
Cohesion: 0.14
Nodes (36): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+28 more)

### Community 38 - "complex.test.ts"
Cohesion: 0.10
Nodes (26): staticGraphSvg(), chooseBox(), parseGraph(), DrawOptions, graphSvg(), PALETTES, DEFAULT_CAMERA, sceneSvg() (+18 more)

### Community 39 - "resize.ts"
Cohesion: 0.13
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "statsShown.ts"
Cohesion: 0.15
Nodes (34): Lin, check(), correlation(), count(), covariance(), Data, DATA_FUNCTIONS, dataStatistic() (+26 more)

### Community 41 - "Sheet"
Cohesion: 0.07
Nodes (34): vitest, calcResults(), formulasUntil(), sheetBefore(), Sheet, text(), tex(), text() (+26 more)

### Community 42 - "NotesStore"
Cohesion: 0.06
Nodes (49): accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf() (+41 more)

### Community 43 - "study.ts"
Cohesion: 0.22
Nodes (24): Asymptote, compiled(), cutsOf(), defined(), domainOf(), exact(), inDomain(), inside() (+16 more)

### Community 44 - "complex.ts"
Cohesion: 0.11
Nodes (22): add(), allRoots(), arg(), ComplexCompiled, cos(), cosh(), EMPTY_COMPLEX_SCOPE, formatComplex() (+14 more)

### Community 45 - "statsGraph.ts"
Cohesion: 0.23
Nodes (13): number(), testItems(), classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX, Line (+5 more)

### Community 46 - "FoldersStore"
Cohesion: 0.17
Nodes (3): cleanFolderName(), FoldersStore, sameName()

### Community 47 - "compileComplex"
Cohesion: 0.16
Nodes (19): asin(), atan(), compileComplex(), compileFunction(), evaluateExactComplex(), ExactComplexScope, exactSqrt(), exp() (+11 more)

### Community 48 - "Distribution"
Cohesion: 0.12
Nodes (14): addExp(), continuousQuantile(), discreteQuantile(), Distribution, exactIntervalProbability(), integerRange(), intervalProbability(), subtractExp() (+6 more)

### Community 49 - "spell.test.ts"
Cohesion: 0.08
Nodes (23): @codemirror/lang-markdown, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt() (+15 more)

### Community 50 - "probability.ts"
Cohesion: 0.15
Nodes (20): End, CompileOptions, ExactScope, ALL, complement(), EventContext, eventSet(), exactSqrt() (+12 more)

### Community 51 - "gauss.ts"
Cohesion: 0.18
Nodes (18): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexValue(), isInequality() (+10 more)

### Community 52 - "search.ts"
Cohesion: 0.17
Nodes (23): preferredIndex(), editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase() (+15 more)

### Community 53 - "graph/file.ts"
Cohesion: 0.36
Nodes (8): graphImage(), graphImagesFor(), graphsFromFile(), OPEN, unhide(), areaColor(), graphTitle(), itemColors()

### Community 54 - "limits.ts"
Cohesion: 0.18
Nodes (20): exponentialForm(), fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), spend() (+12 more)

### Community 55 - "finite.ts"
Cohesion: 0.18
Nodes (26): countOf(), Elem, elemTex(), elemText(), EMPTY, expandDots(), FiniteError, FiniteResult (+18 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "toolbar.ts"
Cohesion: 0.10
Nodes (25): insertBlock(), InsertOptions, toggleLinePrefix(), wrapSelection(), besideSchema(), guardBlocks(), schemaBlockRanges(), schemaBlocks() (+17 more)

### Community 58 - ".int"
Cohesion: 0.11
Nodes (9): characteristicPolynomial(), eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn(), endAt() (+1 more)

### Community 59 - "sidePanel.ts"
Cohesion: 0.11
Nodes (25): formulaAtCursor(), insertGraphBlock(), SuggestionItem, graphBlockText(), cleanKatexError(), renderTex(), isConfidentAnswer(), SearchResult (+17 more)

### Community 60 - "shapes.ts"
Cohesion: 0.09
Nodes (15): @maxgraph/core, tableMetricsFor(), ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape (+7 more)

### Community 61 - "dependencies"
Cohesion: 0.09
Nodes (23): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+15 more)

### Community 62 - "supabase.ts"
Cohesion: 0.13
Nodes (29): @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken(), ensureSessionOf() (+21 more)

### Community 63 - "templates.ts"
Cohesion: 0.11
Nodes (18): SchemaEditorOptions, DEFAULT_EDGE, Schema, SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), conceptMap (+10 more)

### Community 64 - "schema/preview.ts"
Cohesion: 0.15
Nodes (13): GraphLook, Look, Theme, draw(), drawCached(), drawn, errorHtml(), fill() (+5 more)

### Community 67 - "Glifo"
Cohesion: 0.17
Nodes (12): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Glifo (+4 more)

### Community 68 - "sql.ts"
Cohesion: 0.17
Nodes (17): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+9 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "package.json"
Cohesion: 0.05
Nodes (36): description, devDependencies, @electric-sql/pglite, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+28 more)

### Community 72 - "suggestions.ts"
Cohesion: 0.22
Nodes (4): templateInsertion(), EditorMathContext, expand(), SuggestionController

### Community 73 - "inference.ts"
Cohesion: 0.19
Nodes (22): confidence(), confidenceShown(), Given, hypothesisTest(), interval(), meanOf(), nameOf(), num() (+14 more)

### Community 74 - "toLatex"
Cohesion: 0.07
Nodes (46): isNumericalLine(), numericalItems(), names(), STUDY_GRAPH, studyItems(), errorMessage(), ACCENT_COMMANDS, COMPLEX_FUNCTIONS (+38 more)

### Community 75 - "MarkdownEditor"
Cohesion: 0.17
Nodes (6): @codemirror/commands, closeMathBlockOnEnter(), EditorCallbacks, MarkdownEditor, insertTemplate(), setup()

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/file.ts"
Cohesion: 0.21
Nodes (12): base64(), hide(), OPEN, schemasForFile(), schemasFromFile(), unhide(), crc32(), svgSize() (+4 more)

### Community 79 - "engine.ts"
Cohesion: 0.16
Nodes (10): @farscrl/hunspell-wasm, capitalize(), COMMON_FIXES, DictionaryData, ELISIONS, inGlossary(), lower(), SpellEngine (+2 more)

### Community 82 - "Più avanti"
Cohesion: 0.22
Nodes (9): Abbonamento e funzioni a pagamento (da capire), Aiuto con gli esercizi, Calcoli e grafici: idee in più, Matematica per i corsi: idee in più, Non solo appunti, Più avanti, Schemi: idee in più, Trascrizione delle lezioni in appunti (+1 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.20
Nodes (6): centerOf(), clickOn(), ffmpeg, SCENES, SIZE, work

### Community 90 - "Abbonamenti"
Cohesion: 0.14
Nodes (14): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+6 more)

### Community 91 - "severalGraph.ts"
Cohesion: 0.25
Nodes (13): FieldContext, fourierItems(), criticalLine(), named(), severalItems(), surface(), Scope, partialSum() (+5 more)

### Community 92 - "several.ts"
Cohesion: 0.06
Nodes (84): close(), Definite, definiteIntegral(), exValue(), samples(), EMPTY_SCOPE, absOf(), boundsOf() (+76 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.20
Nodes (4): device(), login(), newContext, waitFor()

### Community 97 - "Il database degli account (Supabase)"
Cohesion: 0.17
Nodes (11): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Nell'app, Note condivise con un link (+3 more)

### Community 98 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, Quando lo studente dice di cominciare

### Community 100 - "smoke-test.mjs"
Cohesion: 0.29
Nodes (4): markdown-it, vite, firstVisit(), plainContext

### Community 101 - "Idee per il futuro"
Cohesion: 0.33
Nodes (6): Account: i propri appunti su ogni dispositivo, anche da condividere, Altre idee, Controllare e mostrare quello che si scrive, Idee per il futuro, In programma, La lavagna (si comincia quando lo dice lo studente)

### Community 102 - "page.ts"
Cohesion: 0.07
Nodes (40): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), PullResult, openShareDialog(), changeAccess(), changeCopy() (+32 more)

### Community 103 - "I modelli e le chiavi API"
Cohesion: 0.50
Nodes (4): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), Le idee dello studente (5 ottobre 2026)

### Community 104 - "files.ts"
Cohesion: 0.27
Nodes (11): inClaudeViewer(), canWriteFilesDirectly(), FsWindow, isAbort(), MD_TYPES, OpenedFile, openMarkdownFiles(), PickerType (+3 more)

### Community 105 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 106 - "fake-supabase.mjs"
Cohesion: 0.25
Nodes (6): @electric-sql/pglite, b64(), CODE, GOOGLE_CODE, ROOT, SUPABASE_URL

### Community 107 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 109 - "Glifo – note per Claude"
Cohesion: 0.29
Nodes (7): Comandi, Come controllare il lavoro, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole, sqlite()

### Community 110 - "logo.ts"
Cohesion: 0.33
Nodes (6): sidebarToggle(), BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark()

### Community 111 - "grafo-html.mjs"
Cohesion: 0.25
Nodes (4): graphFile, names, namesFile, root

### Community 113 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (proposta, da costruire quando lo dice lo studente)

### Community 114 - "UndefinedName"
Cohesion: 0.29
Nodes (6): compileApply(), compileName(), conjugateOf(), constant(), nameLabel(), UndefinedName

### Community 115 - "createFakeSupabase"
Cohesion: 0.60
Nodes (6): createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 116 - ".openSql"
Cohesion: 0.47
Nodes (4): loadDialect(), downloadBlob(), downloadText(), fileNameFor()

## Knowledge Gaps
- **528 isolated node(s):** `session-start.sh script`, `name`, `private`, `version`, `description` (+523 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 704 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `Sheet` to `main.ts`, `sync.ts`, `num`, `schema/editor.ts`, `editor/editor.ts`, `svg.ts`, `editor/lists.ts`, `h`, `assistant.ts`, `markers.ts`, `spaces.ts`, `markdown.ts`, `complex.test.ts`, `resize.ts`, `NotesStore`, `spell.test.ts`, `search.ts`, `toolbar.ts`, `sidePanel.ts`, `supabase.ts`, `sql.ts`, `package.json`, `toLatex`, `MarkdownEditor`, `schema/file.ts`, `page.ts`, `logo.ts`?**
  _High betweenness centrality (0.107) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `sheet.ts` to `parse.ts`, `main.ts`, `odesolve.ts`, `spec.ts`, `arithmetic.ts`, `num`, `graph/preview.ts`, `schema/editor.ts`, `symbolic.ts`, `editor/editor.ts`, `svg.ts`, `linsys.ts`, `graph/space.ts`, `numerical.ts`, `exact.ts`, `graph.ts`, `MathError`, `h`, `Rational`, `markdown.ts`, `logic.ts`, `MathNode`, `namesIn`, `statsShown.ts`, `compileComplex`, `limits.ts`, `finite.ts`, `supabase.ts`, `schema/preview.ts`, `inference.ts`, `toLatex`, `severalGraph.ts`, `several.ts`, `Glifo – note per Claude`, `logo.ts`?**
  _High betweenness centrality (0.096) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `schema/preview.ts`, `main.ts`, `page.ts`, `resize.ts`, `schema/editor.ts`, `NotesStore`, `logo.ts`, `SchemaEditor`, `spell.test.ts`, `.folderItem`, `.openSql`, `graph.ts`, `toolbar.ts`, `sidePanel.ts`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **What connects `session-start.sh script`, `name`, `private` to the rest of the system?**
  _528 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `solve.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10796221322537113 - nodes in this community are weakly interconnected._
- **Should `parse.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07689003436426117 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04012204424103737 - nodes in this community are weakly interconnected._