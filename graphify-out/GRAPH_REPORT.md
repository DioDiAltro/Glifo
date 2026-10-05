# Graph Report - matherdown  (2026-10-05)

## Corpus Check
- 223 files · ~420,379 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 3609 nodes · 13098 edges · 116 communities (100 shown, 16 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 354 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `bbe07617`
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
- num
- graph/preview.ts
- schema/editor.ts
- symbolic.ts
- mathContext.ts
- svg.ts
- parse.ts
- SchemaEditor
- editor/lists.ts
- graph/space.ts
- compile
- MathError
- FoldersStore
- index.ts
- engine.ts
- laplace.ts
- .renderFormat
- devDependencies
- linear.ts
- h
- assistant.ts
- markdown.ts
- conics.ts
- sidePanel.ts
- view3d.ts
- distributions.ts
- calcResults.ts
- logic.ts
- MathNode
- editor.test.ts
- fields.ts
- Rational
- resize.ts
- sheet.ts
- vitest
- NotesStore
- study.ts
- complex.ts
- statsGraph.ts
- spellcheck
- toLatex
- Distribution
- spell.test.ts
- probability.ts
- domain.ts
- search.ts
- fourier.ts
- spaces.ts
- finite.ts
- 20261004091555_note_condivise.sql
- insert.ts
- Field
- SidePanel
- graph.ts
- dependencies
- supabase.ts
- Sheet
- schema/preview.ts
- Dove sono le cose
- FormattedResult
- Glifo
- sql.ts
- Benvenuto in Glifo
- compilerOptions
- editor/editor.ts
- suggestions.ts
- inference.ts
- .folderItem
- toolbar.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- parseSchema
- labels.ts
- session-start.sh
- .claude/CLAUDE.md
- templates.ts
- tutorial.mjs
- Abbonamenti
- .sameAs
- several.ts
- supabase-stub.sql
- account-test.mjs
- Il database degli account (Supabase)
- Costi
- smoke-test.mjs
- database.ts
- page.ts
- I modelli e le chiavi API
- files.ts
- Le spiegazioni, come funzionano
- fake-supabase.mjs
- Piano per piano
- .showSpaces
- Glifo – note per Claude
- logo.ts
- icons.mjs
- La lavagna
- scripts
- NodeLook

## God Nodes (most connected - your core abstractions)
1. `MathError` - 151 edges
2. `num()` - 145 edges
3. `Sheet` - 129 edges
4. `MathNode` - 128 edges
5. `mul()` - 124 edges
6. `compile()` - 113 edges
7. `Rational` - 111 edges
8. `Dove sono le cose` - 103 edges
9. `toLatex()` - 101 edges
10. `add()` - 98 edges

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

## Communities (116 total, 16 thin omitted)

### Community 0 - "linsys.ts"
Cohesion: 0.10
Nodes (48): LinearScope, rref(), splitRoot(), choices(), gcd(), isStandardUnknown(), linearSystem(), matrixEquation() (+40 more)

### Community 1 - "Parser"
Cohesion: 0.12
Nodes (16): Abbonamento e funzioni a pagamento (da capire), Account: i propri appunti su ogni dispositivo, anche da condividere, Aiuto con gli esercizi, Altre idee, Calcoli e grafici: idee in più, Idee per il futuro, In programma, La lavagna (si comincia quando lo dice lo studente) (+8 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (98): addToGraphBlock(), graphsForFile(), hide(), account, active, app, applyAccountChange(), applySpellcheck() (+90 more)

### Community 3 - "odesolve.ts"
Cohesion: 0.08
Nodes (80): linearIn(), addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames() (+72 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (33): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+25 more)

### Community 5 - "spec.ts"
Cohesion: 0.06
Nodes (87): formulaAtCursor(), GraphLabelLines, insertGraphBlock(), isConicLine(), quadricEquation(), isFourierLine(), isComplexLine(), isTestLine() (+79 more)

### Community 6 - "arithmetic.ts"
Cohesion: 0.10
Nodes (51): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+43 more)

### Community 7 - "num"
Cohesion: 0.14
Nodes (86): atIntegers(), withoutAbs(), hyperbolicToExp(), inverseRational(), sqrtEx(), polyEx(), similarSolution(), bigGcd() (+78 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (39): addLabel(), boxes, cameras, complexCoord(), coord(), drawings, drawnViews, endTex() (+31 more)

### Community 9 - "schema/editor.ts"
Cohesion: 0.05
Nodes (56): alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ARROW_NAMES, AT_ICONS (+48 more)

### Community 10 - "symbolic.ts"
Cohesion: 0.07
Nodes (59): primitive(), verified(), linearCells(), pairUp(), atValues(), Converter, coordinates(), decimalText() (+51 more)

### Community 11 - "mathContext.ts"
Cohesion: 0.12
Nodes (22): @lezer/common, closeMathBlockOnEnter(), tabOutOfMath(), CODE_NODES, CommandToken, commandTokenAt(), isInCode(), MATH_NODES (+14 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (51): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), domainEdge(), features() (+43 more)

### Community 13 - "parse.ts"
Cohesion: 0.07
Nodes (36): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, differentialInFraction(), DISTRIBUTION_EXAMPLES (+28 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.11
Nodes (3): SchemaEditor, createEdgeCell(), serializeSchema()

### Community 15 - "editor/lists.ts"
Cohesion: 0.11
Nodes (51): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+43 more)

### Community 16 - "graph/space.ts"
Cohesion: 0.10
Nodes (57): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+49 more)

### Community 17 - "compile"
Cohesion: 0.07
Nodes (57): conicItems(), criticalLine(), named(), severalItems(), surface(), argumentOrder(), compileLineIntegral(), compileSurfaceIntegral() (+49 more)

### Community 18 - "MathError"
Cohesion: 0.13
Nodes (47): MathError, bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial() (+39 more)

### Community 19 - "FoldersStore"
Cohesion: 0.17
Nodes (3): cleanFolderName(), FoldersStore, sameName()

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (42): b, bigops, c, calculus, fn, fr, fractions, functions (+34 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "laplace.ts"
Cohesion: 0.10
Nodes (49): factoredPolynomial(), factorsOf(), integerPoly(), beyondPoles(), compiled(), E, exp(), fractionShown() (+41 more)

### Community 23 - ".renderFormat"
Cohesion: 0.16
Nodes (12): fieldInput(), textWidth(), edgeLook(), edgeStyle(), edgeTextAt(), isNodeLook(), nodeLook(), nodeStyle() (+4 more)

### Community 24 - "devDependencies"
Cohesion: 0.22
Nodes (9): devDependencies, @electric-sql/pglite, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite, vite-plugin-pwa (+1 more)

### Community 25 - "linear.ts"
Cohesion: 0.09
Nodes (62): angleBetween(), asMatrix(), basisOf(), circleText(), complexText(), cross(), Ctx, dataOf() (+54 more)

### Community 26 - "h"
Cohesion: 0.07
Nodes (46): SyncStatus, helpButton, openGuide(), viewSwitch, loadDialect(), openSignedOut(), printButton(), ShareDialogDeps (+38 more)

### Community 27 - "assistant.ts"
Cohesion: 0.22
Nodes (12): @anthropic-ai/sdk, AiAnswer, AiError, AiSettings, ANSWER_SCHEMA, askAi(), askThroughHost(), checkShape() (+4 more)

### Community 28 - "markdown.ts"
Cohesion: 0.13
Nodes (26): dompurify, highlight.js, markdown-it-footnote, bulletGroup(), sameList(), alignInside(), asciiTrim(), findMarker() (+18 more)

### Community 29 - "conics.ts"
Cohesion: 0.18
Nodes (29): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+21 more)

### Community 30 - "sidePanel.ts"
Cohesion: 0.21
Nodes (11): AiResult, isConfidentAnswer(), CATEGORIES, symbolsInCategory(), cardPreviewTex(), formPreviewTex(), ParsedTemplate, PLACEHOLDER_TEX (+3 more)

### Community 31 - "view3d.ts"
Cohesion: 0.12
Nodes (28): Face, planeTolerance(), Plane, Vec3, arrowHead(), boxShape(), Coverage, DETAILS (+20 more)

### Community 32 - "distributions.ts"
Cohesion: 0.18
Nodes (25): choose(), expSumValue(), factorialBig(), FAMILIES, integerParam(), invalid(), makeDistribution(), ONE (+17 more)

### Community 33 - "calcResults.ts"
Cohesion: 0.10
Nodes (24): acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult, calcResults(), CheckWidget, formulasUntil() (+16 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "MathNode"
Cohesion: 0.14
Nodes (7): GaussLine, Definition, Line, ExactComplexScope, Ode, MathNode, Found

### Community 36 - "editor.test.ts"
Cohesion: 0.10
Nodes (18): addPlaceholders, buildDecorations(), clearAllPlaceholders(), clearPlaceholders, CommandTarget, contains(), currentIndex(), filledMark (+10 more)

### Community 37 - "fields.ts"
Cohesion: 0.14
Nodes (34): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+26 more)

### Community 38 - "Rational"
Cohesion: 0.09
Nodes (27): Part, expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactFunction, ExactRandom (+19 more)

### Community 39 - "resize.ts"
Cohesion: 0.13
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "sheet.ts"
Cohesion: 0.09
Nodes (51): numericPartials(), OdeFunction, Lin, NUMERICAL, bracketParts(), BRACKETS, CHECK_VALUES, checks (+43 more)

### Community 41 - "vitest"
Cohesion: 0.06
Nodes (48): vitest, setGraphLabels(), FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsFromFile() (+40 more)

### Community 42 - "NotesStore"
Cohesion: 0.06
Nodes (44): accountSpace(), adoptGuestNotes(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf(), setCurrentAccount() (+36 more)

### Community 43 - "study.ts"
Cohesion: 0.16
Nodes (33): limit(), breaks(), periodOf(), Asymptote, compiled(), cutsOf(), defined(), domainOf() (+25 more)

### Community 44 - "complex.ts"
Cohesion: 0.05
Nodes (82): COMPLEX_FUNCTIONS, farthest(), gaussItem(), inZ(), isComplexValue(), isInequality(), isSegmentNode(), onlyComplex() (+74 more)

### Community 45 - "statsGraph.ts"
Cohesion: 0.23
Nodes (13): number(), testItems(), classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX, Line (+5 more)

### Community 46 - "spellcheck"
Cohesion: 0.21
Nodes (8): spellcheck(), close(), misspelledAt(), openAt(), replace(), tooltipView(), SpellChecker, SpellcheckOptions

### Community 47 - "toLatex"
Cohesion: 0.09
Nodes (42): fourierItems(), hasExponential(), valueLabel(), isNumericalLine(), numericalItems(), areaFor(), condLabel(), itemFor() (+34 more)

### Community 48 - "Distribution"
Cohesion: 0.13
Nodes (13): addExp(), continuousQuantile(), discreteQuantile(), Distribution, exactIntervalProbability(), integerRange(), intervalProbability(), subtractExp() (+5 more)

### Community 49 - "spell.test.ts"
Cohesion: 0.10
Nodes (20): @codemirror/lang-markdown, noIndentedCode, misspelledMark, refreshSpelling, setTarget, SKIP, SpellTarget, wordsToCheck() (+12 more)

### Community 50 - "probability.ts"
Cohesion: 0.11
Nodes (27): End, Family, Interval, compare(), compileCondition(), ExactScope, fractionNear(), ALL (+19 more)

### Community 51 - "domain.ts"
Cohesion: 0.09
Nodes (47): constantIntegrand(), depth(), inequalityMargin(), integralRegion, LayeredSolid, Multiple, planeMargin(), PlanePart (+39 more)

### Community 52 - "search.ts"
Cohesion: 0.16
Nodes (25): SuggestionItem, editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase() (+17 more)

### Community 53 - "fourier.ts"
Cohesion: 0.09
Nodes (36): close(), Definite, definiteIntegral(), exValue(), samples(), EMPTY_SCOPE, absOf(), boundsOf() (+28 more)

### Community 54 - "spaces.ts"
Cohesion: 0.13
Nodes (26): decimalSeparator(), Digits, FormatOptions, formatRational(), fromNumber(), fromRational(), SUPERSCRIPT, writeDigits() (+18 more)

### Community 55 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "insert.ts"
Cohesion: 0.15
Nodes (15): @codemirror/state, @codemirror/view, InsertOptions, toggleLinePrefix(), besideSchema(), guardBlocks(), schemaBlockRanges(), schemaBlocks() (+7 more)

### Community 58 - "Field"
Cohesion: 0.12
Nodes (7): characteristicPolynomial(), eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn()

### Community 59 - "SidePanel"
Cohesion: 0.26
Nodes (3): displayCode(), preventFocusSteal(), SidePanel

### Community 60 - "graph.ts"
Cohesion: 0.07
Nodes (33): @maxgraph/core, AT_X, cellHtml(), cellText(), COMPASS, createGraph(), drawSchema(), insertSchema() (+25 more)

### Community 61 - "dependencies"
Cohesion: 0.09
Nodes (23): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+15 more)

### Community 62 - "supabase.ts"
Cohesion: 0.12
Nodes (31): @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken(), ensureSessionOf() (+23 more)

### Community 63 - "Sheet"
Cohesion: 0.09
Nodes (30): Sheet, text(), tex(), text(), check(), result(), text(), result() (+22 more)

### Community 64 - "schema/preview.ts"
Cohesion: 0.14
Nodes (14): GraphLabels, Look, SchemaError, Theme, draw(), drawCached(), drawn, errorHtml() (+6 more)

### Community 65 - "Dove sono le cose"
Cohesion: 0.13
Nodes (14): Dove sono le cose, chiSquareTest(), InferenceContext, differentialRequest, pieces(), chainOf(), definitionTarget(), parseCached() (+6 more)

### Community 66 - "FormattedResult"
Cohesion: 0.28
Nodes (4): bound(), withWorkLimit(), FormattedResult, needsSymbols()

### Community 67 - "Glifo"
Cohesion: 0.15
Nodes (13): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Funzionalità (+5 more)

### Community 68 - "sql.ts"
Cohesion: 0.17
Nodes (18): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+10 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "editor/editor.ts"
Cohesion: 0.07
Nodes (34): description, name, private, type, version, @codemirror/autocomplete, @codemirror/commands, @codemirror/language (+26 more)

### Community 72 - "suggestions.ts"
Cohesion: 0.19
Nodes (7): templateInsertion(), EditorMathContext, expand(), preferredIndex(), SuggestionController, parseTemplate(), templateText()

### Community 73 - "inference.ts"
Cohesion: 0.19
Nodes (22): confidence(), confidenceShown(), Given, hypothesisTest(), interval(), meanOf(), nameOf(), num() (+14 more)

### Community 74 - ".folderItem"
Cohesion: 0.17
Nodes (7): FolderGroup, Note, NoteMeta, clear(), formatDate(), NotesPanel, NotesPanelDeps

### Community 75 - "toolbar.ts"
Cohesion: 0.11
Nodes (16): EditorCallbacks, MarkdownEditor, insertBlock(), insertTemplate(), wrapSelection(), LIST_STYLES, Action, createToolbar() (+8 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "parseSchema"
Cohesion: 0.14
Nodes (19): base64(), hide(), OPEN, schemasForFile(), schemasFromFile(), unhide(), crc32(), svgSize() (+11 more)

### Community 79 - "labels.ts"
Cohesion: 0.16
Nodes (20): ACCENTS, BLACKBOARD, CALLIGRAPHIC, closing(), convert(), escapeXml(), FUNCTIONS, GREEK (+12 more)

### Community 82 - "templates.ts"
Cohesion: 0.13
Nodes (16): SchemaEditorOptions, Schema, SchemaEdge, SchemaNode, tableHeight(), conceptMap, cycle, er (+8 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.12
Nodes (10): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+2 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.14
Nodes (14): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+6 more)

### Community 91 - ".sameAs"
Cohesion: 0.21
Nodes (5): FiniteContext, close(), digitsMatch(), isLiteral(), writtenDecimals()

### Community 92 - "several.ts"
Cohesion: 0.11
Nodes (41): convergesAt(), gcdInt(), logParts(), nearConstant(), powerSeriesOf(), powerSeriesShown(), radius(), shownOf() (+33 more)

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

### Community 101 - "database.ts"
Cohesion: 0.24
Nodes (6): @electric-sql/pglite, createDatabase(), createUser(), databaseTests(), migrations, shareTests()

### Community 102 - "page.ts"
Cohesion: 0.06
Nodes (47): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), currentAccount(), PullResult, hydrateGraphs(), setPrinting() (+39 more)

### Community 103 - "I modelli e le chiavi API"
Cohesion: 0.50
Nodes (4): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), Le idee dello studente (5 ottobre 2026)

### Community 104 - "files.ts"
Cohesion: 0.12
Nodes (22): cache, capability(), ClaudeRuntime, hostDownloads, HostError, hostSample, inClaudeViewer(), ModelTier (+14 more)

### Community 105 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 106 - "fake-supabase.mjs"
Cohesion: 0.22
Nodes (11): b64(), CODE, createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom() (+3 more)

### Community 107 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 109 - "Glifo – note per Claude"
Cohesion: 0.29
Nodes (7): Comandi, Come controllare il lavoro, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole, sqlite()

### Community 110 - "logo.ts"
Cohesion: 0.33
Nodes (6): sidebarToggle(), BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark()

### Community 113 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (proposta, da costruire quando lo dice lo studente)

### Community 114 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

## Knowledge Gaps
- **542 isolated node(s):** `Deciso`, `Com'è andata la discussione`, `La proposta dello studente (4 ottobre 2026)`, `Il parere di Claude, in breve`, `Come si decide cosa far pagare` (+537 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 717 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `linsys.ts`, `Parser`, `main.ts`, `odesolve.ts`, `spec.ts`, `arithmetic.ts`, `num`, `graph/preview.ts`, `schema/editor.ts`, `symbolic.ts`, `svg.ts`, `parse.ts`, `graph/space.ts`, `compile`, `MathError`, `.renderFormat`, `linear.ts`, `h`, `markdown.ts`, `conics.ts`, `logic.ts`, `fields.ts`, `Rational`, `vitest`, `study.ts`, `complex.ts`, `toLatex`, `fourier.ts`, `finite.ts`, `graph.ts`, `supabase.ts`, `schema/preview.ts`, `FormattedResult`, `inference.ts`, `parseSchema`, `several.ts`, `Glifo – note per Claude`, `logo.ts`?**
  _High betweenness centrality (0.092) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `linsys.ts`, `main.ts`, `sync.ts`, `num`, `schema/editor.ts`, `editor/lists.ts`, `graph/space.ts`, `compile`, `laplace.ts`, `linear.ts`, `h`, `assistant.ts`, `markdown.ts`, `sidePanel.ts`, `distributions.ts`, `editor.test.ts`, `resize.ts`, `NotesStore`, `spell.test.ts`, `domain.ts`, `search.ts`, `insert.ts`, `supabase.ts`, `Sheet`, `sql.ts`, `editor/editor.ts`, `parseSchema`, `database.ts`, `page.ts`, `logo.ts`?**
  _High betweenness centrality (0.091) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `schema/preview.ts`, `main.ts`, `page.ts`, `resize.ts`, `graph/preview.ts`, `schema/editor.ts`, `NotesStore`, `.folderItem`, `toolbar.ts`, `logo.ts`, `spellcheck`, `SchemaEditor`, `spell.test.ts`, `.renderFormat`, `SidePanel`, `sidePanel.ts`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._
- **What connects `Deciso`, `Com'è andata la discussione`, `La proposta dello studente (4 ottobre 2026)` to the rest of the system?**
  _542 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `linsys.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09783368273934312 - nodes in this community are weakly interconnected._
- **Should `Parser` be split into smaller, more focused modules?**
  _Cohesion score 0.12474849094567404 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04400271831464492 - nodes in this community are weakly interconnected._