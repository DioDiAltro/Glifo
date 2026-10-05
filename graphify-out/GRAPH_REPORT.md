# Graph Report - matherdown  (2026-10-05)

## Corpus Check
- 234 files · ~441,555 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 3829 nodes · 13739 edges · 119 communities (100 shown, 19 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 383 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9f2ca8cc`
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
- schemaTools.test.ts
- symbolic.ts
- editor/lists.ts
- svg.ts
- Board
- SchemaEditor
- Rational
- sheet.ts
- compile
- numerical.ts
- .folderItem
- index.ts
- engine.ts
- render/lists.ts
- graph.ts
- BoardStore
- MathError
- latex.ts
- assistant.ts
- settings.ts
- conics.ts
- board.ts
- view3d.ts
- distributions.ts
- markdown.ts
- logic.ts
- domain.ts
- toLatex
- fields.ts
- probability.ts
- resize.ts
- statsShown.ts
- store.ts
- NotesStore
- study.ts
- complex.ts
- limits.ts
- editor/editor.ts
- vitest
- files.ts
- gauss.ts
- evaluateExactComplex
- solve.ts
- search.ts
- parseSchema
- strokes.ts
- finite.ts
- 20261004091555_note_condivise.sql
- insert.ts
- Field
- SidePanel
- shapes.ts
- dependencies
- supabase.ts
- .constructor
- schema/preview.ts
- Sheet
- MathNode
- SuggestionController
- sql.ts
- Benvenuto in Glifo
- compilerOptions
- spell.test.ts
- Pt
- Glifo
- tutorial.ts
- toolbar.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- Più avanti
- session-start.sh
- .claude/CLAUDE.md
- editor.test.ts
- tutorial.mjs
- Abbonamenti
- suggestions.ts
- several.ts
- supabase-stub.sql
- account-test.mjs
- Il database degli account (Supabase)
- Costi
- smoke-test.mjs
- database.ts
- h
- I modelli e le chiavi API
- sidePanel.ts
- Le spiegazioni, come funzionano
- fake-supabase.mjs
- Piano per piano
- package.json
- Glifo – note per Claude
- page.ts
- icons.mjs
- La lavagna
- formatNumber

## God Nodes (most connected - your core abstractions)
1. `MathError` - 151 edges
2. `num()` - 145 edges
3. `Sheet` - 129 edges
4. `MathNode` - 128 edges
5. `mul()` - 124 edges
6. `Dove sono le cose` - 113 edges
7. `compile()` - 113 edges
8. `Rational` - 111 edges
9. `toLatex()` - 101 edges
10. `add()` - 98 edges

## Surprising Connections (you probably didn't know these)
- `Funzionalità` --references--> `k()`  [INFERRED]
  README.md → src/math/numerical.ts
- `Dove sono le cose` --references--> `adoptGuestNotes()`  [INFERRED]
  CLAUDE.md → src/account/space.ts
- `Dove sono le cose` --references--> `sharedLinks()`  [INFERRED]
  CLAUDE.md → src/account/supabase.ts
- `Dove sono le cose` --references--> `shareNote()`  [INFERRED]
  CLAUDE.md → src/account/supabase.ts
- `Dove sono le cose` --references--> `askCompatible()`  [INFERRED]
  CLAUDE.md → src/ai/assistant.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (119 total, 19 thin omitted)

### Community 0 - "linsys.ts"
Cohesion: 0.12
Nodes (46): factorsOf(), choices(), gcd(), matrixEquation(), matrixSystem(), minorsGcd(), ONE, parametricRows() (+38 more)

### Community 1 - "parse.ts"
Cohesion: 0.08
Nodes (35): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe(), differentialInFraction() (+27 more)

### Community 2 - "main.ts"
Cohesion: 0.05
Nodes (80): graphsForFile(), graphsFromFile(), hide(), unhide(), account, active, app, applyAccountChange() (+72 more)

### Community 3 - "odesolve.ts"
Cohesion: 0.08
Nodes (81): primed(), linearIn(), addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled() (+73 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (31): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+23 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (122): Dove sono le cose, setGraphLabels(), conicItems(), isConicLine(), quadricEquation(), fourierItems(), isFourierLine(), isComplexLine() (+114 more)

### Community 6 - "arithmetic.ts"
Cohesion: 0.11
Nodes (44): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+36 more)

### Community 7 - "num"
Cohesion: 0.14
Nodes (86): atIntegers(), withoutAbs(), exp(), hyperbolicToExp(), inverseRational(), sqrtEx(), termTransform(), polyEx() (+78 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (36): addLabel(), boxes, cameras, complexCoord(), coord(), drawings, drawnViews, explicitWindow() (+28 more)

### Community 9 - "schemaTools.test.ts"
Cohesion: 0.15
Nodes (20): fieldInput(), textWidth(), base64(), crc32(), svgSize(), svgToPng(), withDensity(), labelHtml() (+12 more)

### Community 10 - "symbolic.ts"
Cohesion: 0.06
Nodes (60): verified(), linearCells(), cancelLinear(), Converter, coordinates(), decimalText(), definiteParts(), definiteValue() (+52 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.12
Nodes (48): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+40 more)

### Community 12 - "svg.ts"
Cohesion: 0.10
Nodes (50): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), domainEdge(), features() (+42 more)

### Community 13 - "Board"
Cohesion: 0.14
Nodes (3): Board, BoardTheme, boxesTouch()

### Community 14 - "SchemaEditor"
Cohesion: 0.11
Nodes (3): SchemaEditor, serializeSchema(), icon()

### Community 15 - "Rational"
Cohesion: 0.10
Nodes (23): Part, expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactRandom, exactRoot() (+15 more)

### Community 16 - "sheet.ts"
Cohesion: 0.08
Nodes (28): FieldContext, Scope, ExactFunction, FiniteContext, LinearScope, NUMERICAL, BRACKETS, CHECK_VALUES (+20 more)

### Community 17 - "compile"
Cohesion: 0.07
Nodes (59): areaFor(), constantValue(), argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot() (+51 more)

### Community 18 - "numerical.ts"
Cohesion: 0.12
Nodes (46): bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial(), interpolating() (+38 more)

### Community 19 - ".folderItem"
Cohesion: 0.21
Nodes (4): Folder, saveClosedFolders(), NotesPanel, NotesPanelDeps

### Community 20 - "index.ts"
Cohesion: 0.06
Nodes (43): b, bigops, c, calculus, fn, fr, fractions, functions (+35 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "render/lists.ts"
Cohesion: 0.27
Nodes (13): ListStyle, bulletGroup(), Marker, sameList(), alignInside(), asciiTrim(), findMarker(), Found (+5 more)

### Community 23 - "graph.ts"
Cohesion: 0.13
Nodes (27): AT_X, cellHtml(), cellText(), COMPASS, createEdgeCell(), createGraph(), drawSchema(), edgeLook() (+19 more)

### Community 25 - "MathError"
Cohesion: 0.10
Nodes (64): MathError, angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, dataOf() (+56 more)

### Community 26 - "latex.ts"
Cohesion: 0.12
Nodes (23): ACCENT_COMMANDS, COMPLEX_FUNCTIONS, diffLatex(), DISTRIBUTION_LATEX, distributionLatex(), domainLatex(), fnLatex(), fnName() (+15 more)

### Community 27 - "assistant.ts"
Cohesion: 0.15
Nodes (19): AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible(), askThroughHost() (+11 more)

### Community 28 - "settings.ts"
Cohesion: 0.12
Nodes (26): applySpellcheck(), openSettings(), restore(), setPersonalWords(), sidebarBottom, wordsChangedHere(), addPersonalWord(), DICTIONARY_KEY (+18 more)

### Community 29 - "conics.ts"
Cohesion: 0.21
Nodes (27): at(), centralCanonical(), Coefficients, coneCanonical(), conicOf(), det2(), det3(), determinant() (+19 more)

### Community 30 - "board.ts"
Cohesion: 0.10
Nodes (27): Action, ERASER_RADIUS, ICON, loadPrefs(), PanAction, PinchAction, Prefs, START (+19 more)

### Community 31 - "view3d.ts"
Cohesion: 0.06
Nodes (94): tickLabel(), addMesh(), addTet(), affinePlane(), Axis, Box, centroid(), chooseBox() (+86 more)

### Community 32 - "distributions.ts"
Cohesion: 0.06
Nodes (65): number(), testItems(), distributionExtent(), pmfBars(), addExp(), choose(), continuousQuantile(), discreteQuantile() (+57 more)

### Community 33 - "markdown.ts"
Cohesion: 0.07
Nodes (35): acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult, calcResults(), CheckWidget, formulasUntil() (+27 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "domain.ts"
Cohesion: 0.14
Nodes (26): LayeredSolid, axesIn(), bestAlong(), boundingBox(), combine(), compileDomain(), compileMultiple(), conditionsOf() (+18 more)

### Community 36 - "toLatex"
Cohesion: 0.09
Nodes (57): factoredPolynomial(), numShown(), EMPTY_SCOPE, absOf(), boundsOf(), close(), definite(), fourierProblem (+49 more)

### Community 37 - "fields.ts"
Cohesion: 0.14
Nodes (32): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+24 more)

### Community 38 - "probability.ts"
Cohesion: 0.13
Nodes (24): End, Family, CompileOptions, ExactScope, ALL, complement(), endAt(), EventContext (+16 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "statsShown.ts"
Cohesion: 0.11
Nodes (42): classes(), dataOf(), distributionLabel(), FAMILY_TEX, Line, number(), statisticsItems(), STATS_GRAPH (+34 more)

### Community 41 - "store.ts"
Cohesion: 0.08
Nodes (15): BoardBackend, done(), fromRecord(), IdbBoards, MemoryBoards, ofNote(), openBoardDatabase(), openDefault() (+7 more)

### Community 42 - "NotesStore"
Cohesion: 0.05
Nodes (41): accountSpace(), adoptGuestNotes(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf(), setCurrentAccount() (+33 more)

### Community 43 - "study.ts"
Cohesion: 0.13
Nodes (40): names(), STUDY_GRAPH, studyItems(), nameLatex(), limit(), splitRoot(), surdText(), normalized() (+32 more)

### Community 44 - "complex.ts"
Cohesion: 0.10
Nodes (27): add(), arg(), compileFunction(), ComplexCompiled, cos(), cosh(), EMPTY_COMPLEX_SCOPE, exp() (+19 more)

### Community 45 - "limits.ts"
Cohesion: 0.19
Nodes (19): exponentialForm(), fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), spend() (+11 more)

### Community 46 - "editor/editor.ts"
Cohesion: 0.11
Nodes (23): @codemirror/language, @lezer/highlight, highlight, italianPhrases, listMarkers, blockLine, inlineRegion, marks (+15 more)

### Community 47 - "vitest"
Cohesion: 0.04
Nodes (66): vitest, FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), graphImagesFor(), OPEN, swatchSvg() (+58 more)

### Community 48 - "files.ts"
Cohesion: 0.13
Nodes (21): cache, capability(), ClaudeRuntime, hostDownloads, HostError, inClaudeViewer(), ModelTier, runtime() (+13 more)

### Community 49 - "gauss.ts"
Cohesion: 0.15
Nodes (24): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexValue(), isInequality() (+16 more)

### Community 50 - "evaluateExactComplex"
Cohesion: 0.24
Nodes (11): asin(), atan(), evaluateExactComplex(), exactSqrt(), GaussRational, sinh(), unavailable(), ExactUnavailable (+3 more)

### Community 51 - "solve.ts"
Cohesion: 0.18
Nodes (23): isStandardUnknown(), linearSystem(), RelOp, breaks(), cubeRoot(), equation(), holds(), inequality() (+15 more)

### Community 52 - "search.ts"
Cohesion: 0.17
Nodes (24): editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex() (+16 more)

### Community 53 - "parseSchema"
Cohesion: 0.18
Nodes (14): hide(), OPEN, schemasForFile(), schemasFromFile(), unhide(), isRecord(), num(), oneOf() (+6 more)

### Community 54 - "strokes.ts"
Cohesion: 0.17
Nodes (15): between(), Box, capsuleSpan(), circleSpan(), compareStrokes(), eraseStroke(), INK_COLORS, intersect() (+7 more)

### Community 55 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "insert.ts"
Cohesion: 0.08
Nodes (28): @codemirror/state, @codemirror/view, InsertOptions, toggleLinePrefix(), LIST_STYLES, addPlaceholders, buildDecorations(), clearAllPlaceholders() (+20 more)

### Community 58 - "Field"
Cohesion: 0.12
Nodes (7): characteristicPolynomial(), eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn()

### Community 59 - "SidePanel"
Cohesion: 0.23
Nodes (5): cleanKatexError(), isConfidentAnswer(), displayCode(), preventFocusSteal(), SidePanel

### Community 60 - "shapes.ts"
Cohesion: 0.09
Nodes (15): @maxgraph/core, ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape (+7 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (24): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+16 more)

### Community 62 - "supabase.ts"
Cohesion: 0.10
Nodes (39): @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken(), ensureSessionOf() (+31 more)

### Community 63 - ".constructor"
Cohesion: 0.20
Nodes (3): BoardOptions, clampZoom(), validView()

### Community 64 - "schema/preview.ts"
Cohesion: 0.14
Nodes (14): GraphLabels, GraphLook, Look, Theme, draw(), drawCached(), drawn, errorHtml() (+6 more)

### Community 65 - "Sheet"
Cohesion: 0.08
Nodes (31): bracketParts(), chainOf(), definitionTarget(), fingerprint(), parseCached(), Sheet, splitPieces(), withoutDots() (+23 more)

### Community 66 - "MathNode"
Cohesion: 0.14
Nodes (11): Definition, Line, ExactComplexScope, ConicInfo, withWorkLimit(), FormattedResult, MathNode, Found (+3 more)

### Community 67 - "SuggestionController"
Cohesion: 0.20
Nodes (4): EditorMathContext, expand(), preferredIndex(), SuggestionController

### Community 68 - "sql.ts"
Cohesion: 0.17
Nodes (18): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+10 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "spell.test.ts"
Cohesion: 0.07
Nodes (28): @codemirror/lang-markdown, noIndentedCode, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close() (+20 more)

### Community 72 - "Pt"
Cohesion: 0.16
Nodes (8): coalesced(), DrawAction, EraseAction, Finger, penErases(), pressureOf(), newStrokeId(), Pt

### Community 73 - "Glifo"
Cohesion: 0.15
Nodes (13): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Funzionalità (+5 more)

### Community 74 - "tutorial.ts"
Cohesion: 0.16
Nodes (12): HINT_MS, markSeen(), openTutorial(), show(), richText(), showTutorialHint(), close(), TUTORIAL_PAGES (+4 more)

### Community 75 - "toolbar.ts"
Cohesion: 0.09
Nodes (19): @codemirror/commands, closeMathBlockOnEnter(), EditorCallbacks, MarkdownEditor, insertBlock(), insertTemplate(), wrapSelection(), SidePanelDeps (+11 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.05
Nodes (62): alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ARROW_NAMES, AT_ICONS (+54 more)

### Community 79 - "Più avanti"
Cohesion: 0.14
Nodes (14): Abbonamento e funzioni a pagamento (da capire), Account: i propri appunti su ogni dispositivo, anche da condividere, Aiuto con gli esercizi, Altre idee, Calcoli e grafici: idee in più, Idee per il futuro, In programma, La lavagna: idee in più (+6 more)

### Community 82 - "editor.test.ts"
Cohesion: 0.12
Nodes (19): @lezer/common, tabOutOfMath(), templateInsertion(), CODE_NODES, CommandToken, commandTokenAt(), isInCode(), MATH_NODES (+11 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.12
Nodes (10): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+2 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.14
Nodes (14): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+6 more)

### Community 91 - "suggestions.ts"
Cohesion: 0.31
Nodes (9): SuggestionItem, cardPreviewTex(), formPreviewTex(), ParsedTemplate, parseTemplate(), PLACEHOLDER_TEX, placeholderPreview(), templateText() (+1 more)

### Community 92 - "several.ts"
Cohesion: 0.09
Nodes (53): criticalLine(), named(), severalItems(), surface(), Piece, Condition, Family, Group (+45 more)

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

### Community 102 - "h"
Cohesion: 0.08
Nodes (38): SyncStatus, AI_SERVICES, aiService, loadDialect(), openSignedOut(), printButton(), ShareDialogDeps, DEFAULT_SETTINGS (+30 more)

### Community 103 - "I modelli e le chiavi API"
Cohesion: 0.50
Nodes (4): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), Le idee dello studente (5 ottobre 2026)

### Community 104 - "sidePanel.ts"
Cohesion: 0.27
Nodes (9): addToGraphBlock(), formulaAtCursor(), GraphLabelLines, insertGraphBlock(), mathRegionAt(), graphBlockText(), calculationRequest(), AiState (+1 more)

### Community 105 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 106 - "fake-supabase.mjs"
Cohesion: 0.22
Nodes (11): b64(), CODE, createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom() (+3 more)

### Community 107 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 108 - "package.json"
Cohesion: 0.05
Nodes (41): description, devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript (+33 more)

### Community 109 - "Glifo – note per Claude"
Cohesion: 0.29
Nodes (7): Comandi, Come controllare il lavoro, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole, sqlite()

### Community 110 - "page.ts"
Cohesion: 0.05
Nodes (52): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), currentAccount(), PullResult, hydrateGraphs(), setPrinting() (+44 more)

### Community 113 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 117 - "formatNumber"
Cohesion: 0.10
Nodes (34): endTex(), decimalSeparator(), Digits, formatNumber(), FormatOptions, formatRational(), fromNumber(), fromRational() (+26 more)

## Knowledge Gaps
- **554 isolated node(s):** `Deciso`, `Com'è andata la discussione`, `La proposta dello studente (4 ottobre 2026)`, `Il parere di Claude, in breve`, `Come si decide cosa far pagare` (+549 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 754 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **19 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `linsys.ts`, `main.ts`, `sync.ts`, `num`, `schemaTools.test.ts`, `editor/lists.ts`, `compile`, `MathError`, `assistant.ts`, `settings.ts`, `board.ts`, `view3d.ts`, `distributions.ts`, `markdown.ts`, `domain.ts`, `resize.ts`, `store.ts`, `NotesStore`, `search.ts`, `parseSchema`, `strokes.ts`, `insert.ts`, `supabase.ts`, `Sheet`, `sql.ts`, `spell.test.ts`, `tutorial.ts`, `toolbar.ts`, `editor.test.ts`, `suggestions.ts`, `database.ts`, `h`, `package.json`, `page.ts`?**
  _High betweenness centrality (0.151) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `spec.ts` to `linsys.ts`, `parse.ts`, `main.ts`, `odesolve.ts`, `arithmetic.ts`, `num`, `graph/preview.ts`, `schemaTools.test.ts`, `symbolic.ts`, `svg.ts`, `Rational`, `sheet.ts`, `numerical.ts`, `BoardStore`, `MathError`, `assistant.ts`, `settings.ts`, `view3d.ts`, `distributions.ts`, `markdown.ts`, `logic.ts`, `toLatex`, `fields.ts`, `statsShown.ts`, `NotesStore`, `study.ts`, `limits.ts`, `vitest`, `gauss.ts`, `evaluateExactComplex`, `strokes.ts`, `finite.ts`, `supabase.ts`, `schema/preview.ts`, `Sheet`, `MathNode`, `tutorial.ts`, `several.ts`, `sidePanel.ts`, `Glifo – note per Claude`, `page.ts`?**
  _High betweenness centrality (0.098) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `schema/preview.ts`, `main.ts`, `spell.test.ts`, `graph/preview.ts`, `schemaTools.test.ts`, `resize.ts`, `sidePanel.ts`, `toolbar.ts`, `tutorial.ts`, `page.ts`, `schema/editor.ts`, `SchemaEditor`, `.folderItem`, `SidePanel`, `settings.ts`, `board.ts`, `.constructor`?**
  _High betweenness centrality (0.041) - this node is a cross-community bridge._
- **What connects `Deciso`, `Com'è andata la discussione`, `La proposta dello studente (4 ottobre 2026)` to the rest of the system?**
  _554 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `linsys.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11686274509803922 - nodes in this community are weakly interconnected._
- **Should `parse.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0817009077878643 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05030643513789581 - nodes in this community are weakly interconnected._