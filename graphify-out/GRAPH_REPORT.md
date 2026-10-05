# Graph Report - matherdown  (2026-10-05)

## Corpus Check
- 225 files · ~423,722 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 3628 nodes · 13144 edges · 116 communities (101 shown, 15 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 356 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b5b4b634`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- linsys.ts
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
- dialogs.ts
- SchemaEditor
- editor/lists.ts
- view3d.ts
- compile
- numerical.ts
- FoldersStore
- index.ts
- engine.ts
- markers.ts
- graph.ts
- page.ts
- MathError
- h
- assistant.ts
- markdown.ts
- conics.ts
- sidePanel.ts
- drawScene
- distributions.ts
- calcResults.ts
- logic.ts
- gauss.ts
- editor.test.ts
- namesIn
- Rational
- resize.ts
- statsShown.ts
- vitest
- NotesStore
- study.ts
- complex.ts
- statsGraph.ts
- regions.ts
- toLatex
- Converter
- spell.test.ts
- probability.ts
- scopeWith
- search.ts
- toNode
- formatNumber
- finite.ts
- 20261004091555_note_condivise.sql
- insert.ts
- Field
- renderTex
- shapes.ts
- dependencies
- supabase.ts
- Sheet
- schema/preview.ts
- sheet.ts
- FormattedResult
- Glifo
- sql.ts
- Benvenuto in Glifo
- compilerOptions
- package.json
- suggestions.ts
- graphInsert.ts
- Più avanti
- toolbar.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- model.ts
- graph/file.ts
- session-start.sh
- .claude/CLAUDE.md
- templates.ts
- tutorial.mjs
- Abbonamenti
- MathNode
- several.ts
- supabase-stub.sql
- account-test.mjs
- Il database degli account (Supabase)
- Costi
- smoke-test.mjs
- database.ts
- openShareDialog
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
- severalGraph.ts
- numerical.test.ts

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
- `Dove sono le cose` --references--> `sharedLinks()`  [INFERRED]
  CLAUDE.md → src/account/supabase.ts
- `Dove sono le cose` --references--> `shareNote()`  [INFERRED]
  CLAUDE.md → src/account/supabase.ts
- `Dove sono le cose` --references--> `askCompatible()`  [INFERRED]
  CLAUDE.md → src/ai/assistant.ts
- `Dove sono le cose` --references--> `jsonIn()`  [INFERRED]
  CLAUDE.md → src/ai/assistant.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (116 total, 15 thin omitted)

### Community 0 - "linsys.ts"
Cohesion: 0.06
Nodes (98): integerPoly(), decimalSeparator(), Digits, FormatOptions, formatRational(), fromRational(), SUPERSCRIPT, writeDigits() (+90 more)

### Community 1 - "parse.ts"
Cohesion: 0.08
Nodes (39): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe(), differentialInFraction() (+31 more)

### Community 2 - "main.ts"
Cohesion: 0.05
Nodes (89): addToGraphBlock(), graphsForFile(), hide(), account, accountButton, accountProblem(), active, app (+81 more)

### Community 3 - "odesolve.ts"
Cohesion: 0.08
Nodes (71): linearIn(), addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames() (+63 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (33): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+25 more)

### Community 5 - "spec.ts"
Cohesion: 0.06
Nodes (79): conicItems(), isConicLine(), quadricEquation(), isNumericalLine(), numericalItems(), Multiple, PlanePart, areaFor() (+71 more)

### Community 6 - "arithmetic.ts"
Cohesion: 0.08
Nodes (68): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+60 more)

### Community 7 - "num"
Cohesion: 0.11
Nodes (105): atIntegers(), withoutAbs(), exp(), hyperbolicToExp(), inverseRational(), sqrtEx(), termTransform(), polyEx() (+97 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (43): addLabel(), boxes, cameras, complexCoord(), coord(), drawings, drawnViews, endTex() (+35 more)

### Community 9 - "schema/editor.ts"
Cohesion: 0.08
Nodes (28): alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ARROW_NAMES, AT_ICONS (+20 more)

### Community 10 - "symbolic.ts"
Cohesion: 0.08
Nodes (36): letters(), coordinates(), decimalText(), degree(), denominators(), exactRoot(), exponentOf(), floatOf() (+28 more)

### Community 11 - "editor/editor.ts"
Cohesion: 0.11
Nodes (24): @codemirror/language, @lezer/highlight, highlight, italianPhrases, listMarkers, blockLine, inlineRegion, marks (+16 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (52): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseWindow(), chooseY(), clipLines(), domainEdge() (+44 more)

### Community 13 - "dialogs.ts"
Cohesion: 0.10
Nodes (24): AI_SERVICES, aiService, aiSettingsOf(), ACCOUNT_SETTINGS, accountSettings(), AI_MODELS, DEFAULT_SETTINGS, loadSettings() (+16 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.11
Nodes (3): SchemaEditor, createEdgeCell(), serializeSchema()

### Community 15 - "editor/lists.ts"
Cohesion: 0.16
Nodes (35): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+27 more)

### Community 16 - "view3d.ts"
Cohesion: 0.08
Nodes (68): addMesh(), addTet(), affinePlane(), Axis, centroid(), chooseBox(), clipBy(), clipPolygon() (+60 more)

### Community 17 - "compile"
Cohesion: 0.08
Nodes (51): FieldContext, argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot(), fieldOn() (+43 more)

### Community 18 - "numerical.ts"
Cohesion: 0.12
Nodes (47): bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial(), interpolating() (+39 more)

### Community 19 - "FoldersStore"
Cohesion: 0.15
Nodes (4): cleanFolderName(), FoldersStore, sameName(), names()

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (41): b, bigops, c, calculus, fn, fr, fractions, functions (+33 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "markers.ts"
Cohesion: 0.12
Nodes (32): ListStyle, bullet(), bulletGroup(), childMarker(), column(), firstMarker(), label(), lettersMarker() (+24 more)

### Community 23 - "graph.ts"
Cohesion: 0.11
Nodes (30): AT_X, cellHtml(), cellText(), COMPASS, createGraph(), drawSchema(), edgeLook(), edgeStyle() (+22 more)

### Community 24 - "page.ts"
Cohesion: 0.12
Nodes (29): accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf() (+21 more)

### Community 25 - "MathError"
Cohesion: 0.12
Nodes (54): MathError, angleBetween(), asMatrix(), basisOf(), cross(), Ctx, dataOf(), determinant() (+46 more)

### Community 26 - "h"
Cohesion: 0.06
Nodes (45): SyncStatus, helpButton, openGuide(), fieldInput(), showProblem(), AccountButton, confirmAccountDeletion(), messageOf() (+37 more)

### Community 27 - "assistant.ts"
Cohesion: 0.16
Nodes (18): @anthropic-ai/sdk, AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible() (+10 more)

### Community 28 - "markdown.ts"
Cohesion: 0.15
Nodes (22): labelHtml(), checkHtml(), checkTitle(), cache, escapeHtml(), renderTexOrError(), renderTexWithResult(), TexRender (+14 more)

### Community 29 - "conics.ts"
Cohesion: 0.20
Nodes (27): at(), centralCanonical(), Coefficients, coneCanonical(), conicOf(), det2(), det3(), determinant() (+19 more)

### Community 30 - "sidePanel.ts"
Cohesion: 0.18
Nodes (10): SuggestionItem, CATEGORIES, cardPreviewTex(), formPreviewTex(), ParsedTemplate, PLACEHOLDER_TEX, placeholderPreview(), SymbolForm (+2 more)

### Community 31 - "drawScene"
Cohesion: 0.19
Nodes (13): Vec3, arrowHead(), boxShape(), Coverage, Directions, dot(), drawScene(), f1() (+5 more)

### Community 32 - "distributions.ts"
Cohesion: 0.07
Nodes (59): addExp(), choose(), continuousQuantile(), discreteQuantile(), exactIntervalProbability(), expSum, factorialBig(), FAMILIES (+51 more)

### Community 33 - "calcResults.ts"
Cohesion: 0.12
Nodes (14): acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult, calcResults(), CheckWidget, formulasUntil() (+6 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (27): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+19 more)

### Community 35 - "gauss.ts"
Cohesion: 0.16
Nodes (20): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexLine(), isComplexValue() (+12 more)

### Community 36 - "editor.test.ts"
Cohesion: 0.08
Nodes (28): @lezer/common, CODE_NODES, CommandToken, commandTokenAt(), isInCode(), MATH_NODES, mathContextAt(), MathRegion (+20 more)

### Community 37 - "namesIn"
Cohesion: 0.18
Nodes (27): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+19 more)

### Community 38 - "Rational"
Cohesion: 0.13
Nodes (18): Part, bigGcd(), binomExact(), conditionExact(), evaluateExact(), exactRoot(), factorialExact(), modPow() (+10 more)

### Community 39 - "resize.ts"
Cohesion: 0.13
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "statsShown.ts"
Cohesion: 0.19
Nodes (28): Lin, check(), correlation(), count(), covariance(), Data, DATA_FUNCTIONS, dataStatistic() (+20 more)

### Community 41 - "vitest"
Cohesion: 0.08
Nodes (24): vitest, parseGraph(), DrawOptions, Palette, PALETTES, DEFAULT_CAMERA, light, item() (+16 more)

### Community 42 - "NotesStore"
Cohesion: 0.08
Nodes (28): Deletion, DeletionLog, Folder, FolderGroup, groupByFolder(), loadClosedFolders(), RemoteFolder, saveClosedFolders() (+20 more)

### Community 43 - "study.ts"
Cohesion: 0.18
Nodes (30): nameLatex(), limit(), Asymptote, boundaries(), compiled(), cutsOf(), defined(), domainOf() (+22 more)

### Community 44 - "complex.ts"
Cohesion: 0.06
Nodes (62): add(), allRoots(), arg(), asin(), atan(), compileApply(), compileComplex(), compileFunction() (+54 more)

### Community 45 - "statsGraph.ts"
Cohesion: 0.16
Nodes (18): isTestLine(), number(), testItems(), classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX (+10 more)

### Community 46 - "regions.ts"
Cohesion: 0.16
Nodes (25): constantIntegrand(), depth(), inequalityMargin(), integralRegion, LayeredSolid, multipleOf(), planeMargin(), planeParts() (+17 more)

### Community 47 - "toLatex"
Cohesion: 0.10
Nodes (32): fourierItems(), isFourierLine(), GraphItem, names(), STUDY_GRAPH, studyItems(), partialSum(), ACCENT_COMMANDS (+24 more)

### Community 48 - "Converter"
Cohesion: 0.21
Nodes (12): Converter, definiteParts(), definiteValue(), expandCalculus(), fieldName(), isField(), operatorName(), partialDerivative() (+4 more)

### Community 49 - "spell.test.ts"
Cohesion: 0.08
Nodes (23): @codemirror/lang-markdown, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt() (+15 more)

### Community 50 - "probability.ts"
Cohesion: 0.13
Nodes (24): End, CompileOptions, RelOp, ALL, compileOf(), complement(), distributionOf(), endAt() (+16 more)

### Community 51 - "scopeWith"
Cohesion: 0.14
Nodes (29): axesIn(), bestAlong(), boundingBox(), combine(), compileDomain(), compileMultiple(), conditionsOf(), constantOf() (+21 more)

### Community 52 - "search.ts"
Cohesion: 0.17
Nodes (24): editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex() (+16 more)

### Community 53 - "toNode"
Cohesion: 0.08
Nodes (42): absOf(), boundsOf(), close(), definite(), fourierProblem, fourierShown(), isTrig(), isZero() (+34 more)

### Community 54 - "formatNumber"
Cohesion: 0.19
Nodes (18): formatNumber(), fromNumber(), circleText(), complexText(), degreesText(), entry(), formatEigenvalues(), formatLinear() (+10 more)

### Community 55 - "finite.ts"
Cohesion: 0.19
Nodes (26): countOf(), elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError, FiniteResult (+18 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "insert.ts"
Cohesion: 0.13
Nodes (15): @codemirror/state, @codemirror/view, InsertOptions, toggleLinePrefix(), addPlaceholders, Placeholder, guardBlocks(), schemaBlocks() (+7 more)

### Community 59 - "renderTex"
Cohesion: 0.21
Nodes (7): cleanKatexError(), renderTex(), isConfidentAnswer(), symbolsInCategory(), displayCode(), preventFocusSteal(), SidePanel

### Community 60 - "shapes.ts"
Cohesion: 0.09
Nodes (15): @maxgraph/core, ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape (+7 more)

### Community 61 - "dependencies"
Cohesion: 0.09
Nodes (23): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+15 more)

### Community 62 - "supabase.ts"
Cohesion: 0.11
Nodes (32): @supabase/supabase-js, AUTH_STORAGE_KEY, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken() (+24 more)

### Community 63 - "Sheet"
Cohesion: 0.08
Nodes (31): logicShown(), chainOf(), definitionTarget(), fingerprint(), parseCached(), Sheet, solveRequest(), splitPieces() (+23 more)

### Community 64 - "schema/preview.ts"
Cohesion: 0.14
Nodes (14): GraphLabels, GraphLook, Look, Theme, draw(), drawCached(), drawn, errorHtml() (+6 more)

### Community 65 - "sheet.ts"
Cohesion: 0.06
Nodes (45): Dove sono le cose, ConicElements, DDOT, DOT, Ode, OdeFunction, odeOf(), odeSolution() (+37 more)

### Community 66 - "FormattedResult"
Cohesion: 0.13
Nodes (11): numericPartials(), ExactComplexScope, ConicInfo, compileOde(), withWorkLimit(), FormattedResult, styleOf(), decimalShown() (+3 more)

### Community 67 - "Glifo"
Cohesion: 0.15
Nodes (13): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Funzionalità (+5 more)

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
Nodes (37): description, devDependencies, @electric-sql/pglite, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+29 more)

### Community 72 - "suggestions.ts"
Cohesion: 0.20
Nodes (7): templateInsertion(), EditorMathContext, expand(), preferredIndex(), SuggestionController, parseTemplate(), templateText()

### Community 73 - "graphInsert.ts"
Cohesion: 0.23
Nodes (14): formulaAtCursor(), GraphLabelLines, insertGraphBlock(), setGraphLabels(), blockLines(), formulaGraphLine(), graphBlockText(), graphNames() (+6 more)

### Community 74 - "Più avanti"
Cohesion: 0.14
Nodes (14): Abbonamento e funzioni a pagamento (da capire), Account: i propri appunti su ogni dispositivo, anche da condividere, Aiuto con gli esercizi, Altre idee, Calcoli e grafici: idee in più, Idee per il futuro, In programma, La lavagna (si comincia quando lo dice lo studente) (+6 more)

### Community 75 - "toolbar.ts"
Cohesion: 0.10
Nodes (20): @codemirror/commands, closeMathBlockOnEnter(), EditorCallbacks, MarkdownEditor, tabOutOfMath(), insertBlock(), insertTemplate(), wrapSelection() (+12 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "model.ts"
Cohesion: 0.06
Nodes (50): base64(), hide(), OPEN, schemasForFile(), schemasFromFile(), unhide(), crc32(), svgSize() (+42 more)

### Community 79 - "graph/file.ts"
Cohesion: 0.09
Nodes (41): FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsFromFile(), OPEN, swatchSvg() (+33 more)

### Community 82 - "templates.ts"
Cohesion: 0.11
Nodes (18): SchemaEditorOptions, DEFAULT_EDGE, Schema, SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), conceptMap (+10 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.12
Nodes (10): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+2 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.14
Nodes (14): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+6 more)

### Community 91 - "MathNode"
Cohesion: 0.14
Nodes (11): ExactRandom, Elem, FiniteContext, MathNode, close(), digitsMatch(), isLiteral(), linearCells() (+3 more)

### Community 92 - "several.ts"
Cohesion: 0.14
Nodes (36): severalLimit, fractionNear(), at(), bounded(), Candidate, candidates(), compiled(), COORDS (+28 more)

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

### Community 102 - "openShareDialog"
Cohesion: 0.09
Nodes (32): SUPABASE_KEY, SUPABASE_URL, accountDataFile(), PullResult, openShareDialog(), changeAccess(), changeCopy(), refreshChanged() (+24 more)

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
Cohesion: 0.22
Nodes (11): b64(), CODE, createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom() (+3 more)

### Community 107 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 108 - ".showSpaces"
Cohesion: 0.25
Nodes (5): characteristicPolynomial(), formatPolynomial(), LinearValue, signature(), signChanges()

### Community 109 - "Glifo – note per Claude"
Cohesion: 0.29
Nodes (7): Comandi, Come controllare il lavoro, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole, sqlite()

### Community 110 - "logo.ts"
Cohesion: 0.33
Nodes (6): sidebarToggle(), BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark()

### Community 113 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (proposta, da costruire quando lo dice lo studente)

### Community 114 - "severalGraph.ts"
Cohesion: 0.54
Nodes (7): criticalLine(), isSeveralLine(), named(), severalItems(), surface(), optimumOf(), severalOf()

### Community 115 - "numerical.test.ts"
Cohesion: 0.60
Nodes (3): result(), text(), verdict()

## Knowledge Gaps
- **541 isolated node(s):** `Deciso`, `Com'è andata la discussione`, `La proposta dello studente (4 ottobre 2026)`, `Il parere di Claude, in breve`, `Come si decide cosa far pagare` (+536 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 723 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `linsys.ts`, `main.ts`, `sync.ts`, `spec.ts`, `num`, `svg.ts`, `dialogs.ts`, `editor/lists.ts`, `view3d.ts`, `markers.ts`, `page.ts`, `MathError`, `h`, `assistant.ts`, `markdown.ts`, `sidePanel.ts`, `distributions.ts`, `editor.test.ts`, `resize.ts`, `NotesStore`, `toLatex`, `spell.test.ts`, `scopeWith`, `search.ts`, `insert.ts`, `supabase.ts`, `Sheet`, `sql.ts`, `package.json`, `toolbar.ts`, `model.ts`, `graph/file.ts`, `database.ts`, `openShareDialog`, `logo.ts`, `numerical.test.ts`?**
  _High betweenness centrality (0.140) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `sheet.ts` to `linsys.ts`, `parse.ts`, `main.ts`, `odesolve.ts`, `spec.ts`, `arithmetic.ts`, `num`, `graph/preview.ts`, `symbolic.ts`, `svg.ts`, `view3d.ts`, `compile`, `numerical.ts`, `graph.ts`, `MathError`, `h`, `assistant.ts`, `markdown.ts`, `distributions.ts`, `gauss.ts`, `namesIn`, `Rational`, `complex.ts`, `toLatex`, `Converter`, `toNode`, `finite.ts`, `supabase.ts`, `Sheet`, `schema/preview.ts`, `FormattedResult`, `graphInsert.ts`, `model.ts`, `graph/file.ts`, `MathNode`, `several.ts`, `Glifo – note per Claude`, `logo.ts`?**
  _High betweenness centrality (0.098) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `schema/preview.ts`, `main.ts`, `openShareDialog`, `resize.ts`, `graph/preview.ts`, `schema/editor.ts`, `NotesStore`, `toolbar.ts`, `dialogs.ts`, `logo.ts`, `SchemaEditor`, `spell.test.ts`, `graph.ts`, `page.ts`, `renderTex`, `sidePanel.ts`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **What connects `Deciso`, `Com'è andata la discussione`, `La proposta dello studente (4 ottobre 2026)` to the rest of the system?**
  _541 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `linsys.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05694011768778124 - nodes in this community are weakly interconnected._
- **Should `parse.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07872807017543859 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.047369442826635605 - nodes in this community are weakly interconnected._