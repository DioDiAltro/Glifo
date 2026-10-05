# Graph Report - matherdown  (2026-10-05)

## Corpus Check
- 225 files · ~423,762 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 3626 nodes · 13142 edges · 124 communities (104 shown, 20 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 356 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `28240cc8`
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
- schemaTools.test.ts
- symbolic.ts
- num
- svg.ts
- dialogs.ts
- SchemaEditor
- editor/lists.ts
- graph/space.ts
- compile
- numerical.ts
- FoldersStore
- index.ts
- client.ts
- markdown.ts
- graph.ts
- account/space.ts
- MathError
- h
- assistant.ts
- laplace.ts
- conics.ts
- sidePanel.ts
- view3d.ts
- distributions.ts
- calcResults.ts
- logic.ts
- gauss.ts
- editor.test.ts
- namesIn
- Rational
- resize.ts
- statsShown.ts
- parseGraph
- NotesStore
- study.ts
- complex.ts
- formatNumber
- domain.ts
- toLatex
- parse.ts
- spellcheck.ts
- toNode
- parseMath
- search.ts
- fourier.ts
- tutorial.ts
- finite.ts
- 20261004091555_note_condivise.sql
- insert.ts
- Field
- SidePanel
- shapes.ts
- dependencies
- supabase.ts
- Sheet
- schema/preview.ts
- sheet.ts
- Dove sono le cose
- Glifo
- sql.ts
- Benvenuto in Glifo
- compilerOptions
- editor/editor.ts
- suggestions.ts
- formulaGraph
- Più avanti
- toolbar.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- graph/file.ts
- session-start.sh
- .claude/CLAUDE.md
- engine.ts
- tutorial.mjs
- Abbonamenti
- scopeWith
- several.ts
- supabase-stub.sql
- account-test.mjs
- Il database degli account (Supabase)
- Costi
- smoke-test.mjs
- laplaceShown
- openShareDialog
- I modelli e le chiavi API
- files.ts
- Le spiegazioni, come funzionano
- fake-supabase.mjs
- Piano per piano
- devDependencies
- Glifo – note per Claude
- page.ts
- icons.mjs
- La lavagna
- .integral
- scripts
- grafo-html.mjs
- SpellClient
- downloadText
- .constructor
- createFakeSupabase
- icon
- numericalGraph.ts
- vite.config.ts

## God Nodes (most connected - your core abstractions)
1. `MathError` - 151 edges
2. `num()` - 145 edges
3. `Sheet` - 129 edges
4. `MathNode` - 128 edges
5. `mul()` - 124 edges
6. `compile()` - 113 edges
7. `Rational` - 111 edges
8. `Dove sono le cose` - 105 edges
9. `toLatex()` - 101 edges
10. `add()` - 98 edges

## Surprising Connections (you probably didn't know these)
- `Funzionalità` --references--> `k()`  [INFERRED]
  README.md → src/math/numerical.ts
- `Dove sono le cose` --references--> `NumericContext`  [INFERRED]
  CLAUDE.md → src/math/numerical.ts
- `Dove sono le cose` --references--> `Wave`  [INFERRED]
  CLAUDE.md → src/math/odesolve.ts
- `Dove sono le cose` --references--> `GaussRational`  [INFERRED]
  CLAUDE.md → src/math/complex.ts
- `Dove sono le cose` --references--> `Converter`  [INFERRED]
  CLAUDE.md → src/math/symbolic.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (124 total, 20 thin omitted)

### Community 0 - "linsys.ts"
Cohesion: 0.07
Nodes (70): FormatOptions, formatRational(), nameLatex(), eigenvalues(), EXACT, FLOAT, interpolateFloat(), rref() (+62 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (100): addToGraphBlock(), setGraphLabels(), graphsForFile(), hide(), account, active, app, applyAccountChange() (+92 more)

### Community 3 - "odesolve.ts"
Cohesion: 0.08
Nodes (69): linearIn(), addWave(), arrange(), bernoulliFamily(), cauchy(), compiled(), constantNames(), constantRoots() (+61 more)

### Community 4 - "sync.ts"
Cohesion: 0.05
Nodes (37): AccountSync, withLock(), Account, EMPTY_STATE, FolderChange, FolderRow, isEmpty(), iso() (+29 more)

### Community 5 - "spec.ts"
Cohesion: 0.08
Nodes (53): conicItems(), isConicLine(), quadricEquation(), fourierItems(), isFourierLine(), isTestLine(), testItems(), AXES (+45 more)

### Community 6 - "arithmetic.ts"
Cohesion: 0.10
Nodes (48): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+40 more)

### Community 7 - "primitive.ts"
Cohesion: 0.16
Nodes (60): degree(), PartialFraction, algebraic(), bigGcd(), byParts(), candidates(), canon(), combineLogs() (+52 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (46): addLabel(), boxes, cameras, complexCoord(), containing(), coord(), drawings, drawnViews (+38 more)

### Community 9 - "schemaTools.test.ts"
Cohesion: 0.15
Nodes (19): alignBoxes(), Alignment, Box, distributeBoxes(), Position, base64(), crc32(), svgSize() (+11 more)

### Community 10 - "symbolic.ts"
Cohesion: 0.07
Nodes (58): primitive(), verified(), assumePositive(), atValues(), cancelLinear(), commonPositive(), Converter, coordinates() (+50 more)

### Community 11 - "num"
Cohesion: 0.16
Nodes (41): polyEx(), characteristicRoots(), constantParticular(), exp(), expOf(), firstOrderShape(), halfRoot(), homogeneousGroups() (+33 more)

### Community 12 - "svg.ts"
Cohesion: 0.10
Nodes (51): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), domainEdge(), features() (+43 more)

### Community 13 - "dialogs.ts"
Cohesion: 0.15
Nodes (16): ACCOUNT_SETTINGS, accountSettings(), AI_MODELS, DEFAULT_SETTINGS, Settings, SETTINGS_KEY, SPELL_LANGUAGES, SpellLanguages (+8 more)

### Community 15 - "editor/lists.ts"
Cohesion: 0.10
Nodes (52): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+44 more)

### Community 16 - "graph/space.ts"
Cohesion: 0.13
Nodes (43): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+35 more)

### Community 17 - "compile"
Cohesion: 0.07
Nodes (53): argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot(), fieldOn(), numericPartials() (+45 more)

### Community 18 - "numerical.ts"
Cohesion: 0.12
Nodes (45): bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial(), interpolating() (+37 more)

### Community 19 - "FoldersStore"
Cohesion: 0.07
Nodes (23): Deletion, DeletionLog, cleanFolderName(), Folder, FolderGroup, FoldersStore, groupByFolder(), loadClosedFolders() (+15 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (43): SuggestionItem, b, bigops, c, calculus, fn, fr, fractions (+35 more)

### Community 21 - "client.ts"
Cohesion: 0.12
Nodes (13): Backend, pageBackend(), SpellClientOptions, workerBackend(), WorkerUnavailable, download(), fetchDictionary(), FILES (+5 more)

### Community 22 - "markdown.ts"
Cohesion: 0.09
Nodes (40): lineDepth(), parseBlockMath(), bulletGroup(), readMarker(), sameList(), alignInside(), asciiTrim(), findMarker() (+32 more)

### Community 23 - "graph.ts"
Cohesion: 0.11
Nodes (30): AT_X, cellHtml(), cellText(), COMPASS, createEdgeCell(), createGraph(), drawSchema(), edgeLook() (+22 more)

### Community 24 - "account/space.ts"
Cohesion: 0.20
Nodes (18): accountSpace(), adoptGuestNotes(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf(), setCurrentAccount() (+10 more)

### Community 25 - "MathError"
Cohesion: 0.11
Nodes (62): MathError, angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, dataOf() (+54 more)

### Community 26 - "h"
Cohesion: 0.21
Nodes (17): SyncStatus, AccountButton, confirmAccountDeletion(), messageOf(), openAccountDialog(), openLoginDialog(), codeStep(), emailStep() (+9 more)

### Community 27 - "assistant.ts"
Cohesion: 0.15
Nodes (20): AiAnswer, AiError, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible(), askThroughHost(), checkShape() (+12 more)

### Community 28 - "laplace.ts"
Cohesion: 0.15
Nodes (33): factoredPolynomial(), EMPTY_SCOPE, atIntegers(), oneFraction(), E, exp(), fractionShown(), HALF (+25 more)

### Community 29 - "conics.ts"
Cohesion: 0.19
Nodes (28): at(), centralCanonical(), Coefficients, coneCanonical(), ConicInfo, conicOf(), det2(), det3() (+20 more)

### Community 30 - "sidePanel.ts"
Cohesion: 0.14
Nodes (10): AiResult, isConfidentAnswer(), CATEGORIES, symbolsInCategory(), append(), Child, clear(), Props (+2 more)

### Community 31 - "view3d.ts"
Cohesion: 0.10
Nodes (37): Detail, Face, FAST, FINE, planeTolerance(), regionFaces(), surfacePlane(), Plane (+29 more)

### Community 32 - "distributions.ts"
Cohesion: 0.08
Nodes (56): choose(), continuousQuantile(), discreteQuantile(), factorialBig(), FAMILIES, Family, integerParam(), integerRange() (+48 more)

### Community 33 - "calcResults.ts"
Cohesion: 0.10
Nodes (24): acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult, calcResults(), CheckWidget, formulasUntil() (+16 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "gauss.ts"
Cohesion: 0.13
Nodes (23): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexLine(), isComplexValue() (+15 more)

### Community 36 - "editor.test.ts"
Cohesion: 0.07
Nodes (26): @codemirror/lang-markdown, @codemirror/state, templateInsertion(), mathMarkdown, addPlaceholders, buildDecorations(), clearAllPlaceholders(), clearPlaceholders (+18 more)

### Community 37 - "namesIn"
Cohesion: 0.12
Nodes (40): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+32 more)

### Community 38 - "Rational"
Cohesion: 0.05
Nodes (52): addExp(), Distribution, End, exactIntervalProbability(), expSum, subtractExp(), CompileOptions, bigGcd() (+44 more)

### Community 39 - "resize.ts"
Cohesion: 0.13
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "statsShown.ts"
Cohesion: 0.16
Nodes (33): expSumValue(), check(), correlation(), count(), covariance(), Data, dataStatistic(), deviation() (+25 more)

### Community 41 - "parseGraph"
Cohesion: 0.09
Nodes (33): staticGraphSvg(), chooseWindow(), Box, chooseBox(), GraphItem, parseGraph(), DrawOptions, graphSvg() (+25 more)

### Community 42 - "NotesStore"
Cohesion: 0.13
Nodes (11): createdAtFromId(), deriveTitle(), NotesStore, hasLocalStorage(), memory, migrateKeyPrefix(), readItem(), removeItem() (+3 more)

### Community 43 - "study.ts"
Cohesion: 0.15
Nodes (32): names(), studyItems(), limit(), Asymptote, compiled(), cutsOf(), defined(), domainOf() (+24 more)

### Community 44 - "complex.ts"
Cohesion: 0.08
Nodes (45): allRoots(), arg(), asin(), atan(), compileApply(), compileComplex(), compileFunction(), compileName() (+37 more)

### Community 45 - "formatNumber"
Cohesion: 0.09
Nodes (38): valueLabel(), number(), classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX, number() (+30 more)

### Community 46 - "domain.ts"
Cohesion: 0.10
Nodes (44): constantIntegrand(), depth(), inequalityMargin(), integralRegion, LayeredSolid, Multiple, multipleOf(), planeMargin() (+36 more)

### Community 47 - "toLatex"
Cohesion: 0.15
Nodes (24): ACCENT_COMMANDS, COMPLEX_FUNCTIONS, diffLatex(), DISTRIBUTION_LATEX, distributionLatex(), domainLatex(), fnLatex(), fnName() (+16 more)

### Community 48 - "parse.ts"
Cohesion: 0.07
Nodes (33): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, DISTRIBUTION_EXAMPLES, DISTRIBUTIONS (+25 more)

### Community 49 - "spellcheck.ts"
Cohesion: 0.11
Nodes (19): misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt(), openAt() (+11 more)

### Community 50 - "toNode"
Cohesion: 0.15
Nodes (22): shown(), shortest(), size(), alternating(), derivatives(), seriesSum(), exText(), norm() (+14 more)

### Community 51 - "parseMath"
Cohesion: 0.31
Nodes (7): errorMessage(), MathSyntaxError, parseMath(), error(), value(), parseError(), scopeWithSets()

### Community 52 - "search.ts"
Cohesion: 0.17
Nodes (24): editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex() (+16 more)

### Community 53 - "fourier.ts"
Cohesion: 0.24
Nodes (17): absOf(), boundsOf(), close(), definite(), fourierProblem, fourierShown(), isTrig(), isZero() (+9 more)

### Community 54 - "tutorial.ts"
Cohesion: 0.15
Nodes (13): ICONS, HINT_MS, markSeen(), openTutorial(), show(), richText(), showTutorialHint(), close() (+5 more)

### Community 55 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "insert.ts"
Cohesion: 0.14
Nodes (14): @codemirror/view, InsertOptions, toggleLinePrefix(), besideSchema(), guardBlocks(), schemaBlockRanges(), schemaBlocks(), SchemaWidget (+6 more)

### Community 58 - "Field"
Cohesion: 0.12
Nodes (5): characteristicPolynomial(), Field, formatPolynomial(), interpolate(), polynomialIn()

### Community 59 - "SidePanel"
Cohesion: 0.25
Nodes (3): displayCode(), preventFocusSteal(), SidePanel

### Community 60 - "shapes.ts"
Cohesion: 0.09
Nodes (15): @maxgraph/core, ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape (+7 more)

### Community 61 - "dependencies"
Cohesion: 0.09
Nodes (23): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+15 more)

### Community 62 - "supabase.ts"
Cohesion: 0.13
Nodes (29): @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken(), ensureSessionOf() (+21 more)

### Community 63 - "Sheet"
Cohesion: 0.06
Nodes (31): vitest, fingerprint(), parseCached(), Sheet, solveRequest(), withoutDots(), text(), tex() (+23 more)

### Community 64 - "schema/preview.ts"
Cohesion: 0.22
Nodes (11): Look, Theme, draw(), drawCached(), drawn, errorHtml(), fill(), hydrateSchemas() (+3 more)

### Community 65 - "sheet.ts"
Cohesion: 0.06
Nodes (42): FieldContext, Line, complex, ComplexFunction, Ode, Scope, ExactFunction, FiniteContext (+34 more)

### Community 66 - "Dove sono le cose"
Cohesion: 0.15
Nodes (12): Dove sono le cose, ConicElements, withWorkLimit(), differentialRequest, pieces(), Shape, bracketParts(), close() (+4 more)

### Community 67 - "Glifo"
Cohesion: 0.15
Nodes (13): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Funzionalità (+5 more)

### Community 68 - "sql.ts"
Cohesion: 0.18
Nodes (17): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+9 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "editor/editor.ts"
Cohesion: 0.06
Nodes (41): description, name, private, type, version, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/language (+33 more)

### Community 72 - "suggestions.ts"
Cohesion: 0.15
Nodes (11): EditorMathContext, expand(), preferredIndex(), SuggestionController, cardPreviewTex(), formPreviewTex(), ParsedTemplate, parseTemplate() (+3 more)

### Community 73 - "formulaGraph"
Cohesion: 0.18
Nodes (18): formulaAtCursor(), GraphLabelLines, insertGraphBlock(), isSeveralLine(), areaOf(), blockLines(), ComplexDefinitions, formulaGraph() (+10 more)

### Community 74 - "Più avanti"
Cohesion: 0.14
Nodes (14): Abbonamento e funzioni a pagamento (da capire), Account: i propri appunti su ogni dispositivo, anche da condividere, Aiuto con gli esercizi, Altre idee, Calcoli e grafici: idee in più, Idee per il futuro, In programma, La lavagna (si comincia quando lo dice lo studente) (+6 more)

### Community 75 - "toolbar.ts"
Cohesion: 0.10
Nodes (18): @codemirror/commands, EditorCallbacks, MarkdownEditor, insertBlock(), insertTemplate(), wrapSelection(), SidePanelDeps, Action (+10 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.04
Nodes (69): ALIGN, ARROW_NAMES, AT_ICONS, AT_NAMES, BASE_PRESETS, BIG_ARROWS, DB_PRESETS, Direction (+61 more)

### Community 79 - "graph/file.ts"
Cohesion: 0.10
Nodes (37): FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsFromFile(), OPEN, swatchSvg() (+29 more)

### Community 82 - "engine.ts"
Cohesion: 0.20
Nodes (9): @farscrl/hunspell-wasm, capitalize(), COMMON_FIXES, ELISIONS, inGlossary(), lower(), SpellEngine, GLOSSARY (+1 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.20
Nodes (6): centerOf(), clickOn(), ffmpeg, SCENES, SIZE, work

### Community 90 - "Abbonamenti"
Cohesion: 0.14
Nodes (14): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+6 more)

### Community 91 - "scopeWith"
Cohesion: 0.21
Nodes (16): areaFor(), complexValue(), condLabel(), define(), isStraight(), isVectorName(), itemFor(), planeOf() (+8 more)

### Community 92 - "several.ts"
Cohesion: 0.09
Nodes (51): criticalLine(), named(), severalItems(), surface(), Piece, Condition, Family, Group (+43 more)

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

### Community 101 - "laplaceShown"
Cohesion: 0.36
Nodes (10): beyondPoles(), compiled(), inverseLaplaceShown(), laplaceShown(), letterOf(), letters(), numericLaplace(), sameNumbers() (+2 more)

### Community 102 - "openShareDialog"
Cohesion: 0.09
Nodes (33): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), PullResult, openShareDialog(), changeAccess(), changeCopy() (+25 more)

### Community 103 - "I modelli e le chiavi API"
Cohesion: 0.50
Nodes (4): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), Le idee dello studente (5 ottobre 2026)

### Community 104 - "files.ts"
Cohesion: 0.15
Nodes (18): cache, capability(), ClaudeRuntime, hostDownloads, HostError, inClaudeViewer(), ModelTier, runtime() (+10 more)

### Community 105 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 106 - "fake-supabase.mjs"
Cohesion: 0.25
Nodes (6): @electric-sql/pglite, b64(), CODE, GOOGLE_CODE, ROOT, SUPABASE_URL

### Community 107 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 108 - "devDependencies"
Cohesion: 0.22
Nodes (9): devDependencies, @electric-sql/pglite, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite, vite-plugin-pwa (+1 more)

### Community 109 - "Glifo – note per Claude"
Cohesion: 0.29
Nodes (7): Comandi, Come controllare il lavoro, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole, sqlite()

### Community 110 - "page.ts"
Cohesion: 0.10
Nodes (23): katex, currentAccount(), sidebarToggle(), SharedNote, body, draw(), isDark(), load() (+15 more)

### Community 113 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (proposta, da costruire quando lo dice lo studente)

### Community 115 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 116 - "grafo-html.mjs"
Cohesion: 0.25
Nodes (4): graphFile, names, namesFile, root

### Community 118 - "downloadText"
Cohesion: 0.38
Nodes (5): loadDialect(), schemaImage(), downloadBlob(), downloadText(), fileNameFor()

### Community 120 - "createFakeSupabase"
Cohesion: 0.60
Nodes (6): createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 121 - "icon"
Cohesion: 0.40
Nodes (3): icon(), MenuEntry, openMenu()

### Community 122 - "numericalGraph.ts"
Cohesion: 0.80
Nodes (4): isNumericalLine(), numericalItems(), isPlottedNumerical(), numericalPlot()

## Knowledge Gaps
- **541 isolated node(s):** `SIZE`, `SCENES`, `ffmpeg`, `work`, `Digits` (+536 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 721 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `Sheet` to `linsys.ts`, `main.ts`, `sync.ts`, `schemaTools.test.ts`, `num`, `svg.ts`, `dialogs.ts`, `editor/lists.ts`, `FoldersStore`, `markdown.ts`, `account/space.ts`, `MathError`, `assistant.ts`, `laplace.ts`, `distributions.ts`, `editor.test.ts`, `resize.ts`, `parseGraph`, `parseMath`, `search.ts`, `tutorial.ts`, `insert.ts`, `supabase.ts`, `sql.ts`, `editor/editor.ts`, `suggestions.ts`, `toolbar.ts`, `schema/editor.ts`, `graph/file.ts`, `openShareDialog`, `page.ts`, `vite.config.ts`?**
  _High betweenness centrality (0.130) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `Dove sono le cose` to `linsys.ts`, `Parser`, `main.ts`, `odesolve.ts`, `spec.ts`, `arithmetic.ts`, `primitive.ts`, `graph/preview.ts`, `schemaTools.test.ts`, `symbolic.ts`, `num`, `svg.ts`, `graph/space.ts`, `numerical.ts`, `markdown.ts`, `MathError`, `assistant.ts`, `distributions.ts`, `logic.ts`, `gauss.ts`, `namesIn`, `Rational`, `study.ts`, `complex.ts`, `formatNumber`, `parse.ts`, `toNode`, `fourier.ts`, `tutorial.ts`, `finite.ts`, `supabase.ts`, `Sheet`, `schema/preview.ts`, `formulaGraph`, `schema/editor.ts`, `graph/file.ts`, `scopeWith`, `several.ts`, `Glifo – note per Claude`, `page.ts`, `.constructor`, `numericalGraph.ts`?**
  _High betweenness centrality (0.087) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `main.ts`, `openShareDialog`, `resize.ts`, `graph/preview.ts`, `toolbar.ts`, `dialogs.ts`, `page.ts`, `schema/editor.ts`, `SchemaEditor`, `spellcheck.ts`, `FoldersStore`, `downloadText`, `.constructor`, `tutorial.ts`, `icon`, `SidePanel`, `sidePanel.ts`?**
  _High betweenness centrality (0.043) - this node is a cross-community bridge._
- **What connects `SIZE`, `SCENES`, `ffmpeg` to the rest of the system?**
  _541 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `linsys.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07092907092907093 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04298356510745891 - nodes in this community are weakly interconnected._
- **Should `odesolve.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08157349896480331 - nodes in this community are weakly interconnected._