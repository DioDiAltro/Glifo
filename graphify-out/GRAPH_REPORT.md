# Graph Report - matherdown  (2026-10-05)

## Corpus Check
- 232 files · ~439,242 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 3823 nodes · 13728 edges · 127 communities (107 shown, 20 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 383 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e0b37171`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- linsys.ts
- Parser
- main.ts
- num
- sync.ts
- spec.ts
- arithmetic.ts
- primitive.ts
- graph/preview.ts
- files.ts
- symbolic.ts
- editor/lists.ts
- svg.ts
- Board
- SchemaEditor
- Rational
- view3d.ts
- MathError
- numerical.ts
- FoldersStore
- index.ts
- engine.ts
- markdown.ts
- graph.ts
- MemoryBoards
- linear.ts
- toLatex
- assistant.ts
- subst
- conics.ts
- board.ts
- drawScene
- distributions.ts
- graphNote.test.ts
- logic.ts
- gauss.ts
- laplace.ts
- namesIn
- probability.ts
- resize.ts
- statsShown.ts
- store.ts
- NotesStore
- study.ts
- complex.ts
- statsGraph.ts
- scopeWith
- vitest
- parse.ts
- spell.test.ts
- account/space.ts
- solve.ts
- search.ts
- settings.ts
- strokes.ts
- finite.ts
- 20261004091555_note_condivise.sql
- insert.ts
- Field
- renderTex
- .paintVertexShape
- dependencies
- supabase.ts
- evaluateExactComplex
- .constructor
- sheet.ts
- Sheet
- powerseries.ts
- sql.ts
- Benvenuto in Glifo
- compilerOptions
- editor/editor.ts
- Pt
- sidePanel.ts
- logo.ts
- toolbar.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- graph/file.ts
- session-start.sh
- .claude/CLAUDE.md
- editor.test.ts
- tutorial.mjs
- Abbonamenti
- grafo-html.mjs
- several.ts
- supabase-stub.sql
- account-test.mjs
- Il database degli account (Supabase)
- Costi
- smoke-test.mjs
- createFakeSupabase
- h
- I modelli e le chiavi API
- limits.ts
- Le spiegazioni, come funzionano
- fake-supabase.mjs
- Piano per piano
- devDependencies
- Glifo – note per Claude
- page.ts
- icons.mjs
- La lavagna
- severalGraph.ts
- scripts
- tutorial.ts
- formatNumber
- BoardStore
- SuggestionController
- katex.ts
- host.ts
- .int
- AccountSync

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
- `Dove sono le cose` --references--> `adoptGuestNotes()`  [INFERRED]
  CLAUDE.md → src/account/space.ts
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

## Communities (127 total, 20 thin omitted)

### Community 0 - "linsys.ts"
Cohesion: 0.15
Nodes (38): factorsOf(), choices(), minorsGcd(), ONE, parametricRows(), parametricSystem(), PARAMS, polyDeterminant() (+30 more)

### Community 1 - "Parser"
Cohesion: 0.12
Nodes (16): Abbonamento e funzioni a pagamento (da capire), Account: i propri appunti su ogni dispositivo, anche da condividere, Aiuto con gli esercizi, Altre idee, Calcoli e grafici: idee in più, Idee per il futuro, In programma, La lavagna: idee in più (+8 more)

### Community 2 - "main.ts"
Cohesion: 0.05
Nodes (81): newStrokeId(), addToGraphBlock(), setGraphLabels(), graphsForFile(), hide(), account, active, app (+73 more)

### Community 3 - "num"
Cohesion: 0.08
Nodes (82): withoutAbs(), linearIn(), addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled() (+74 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (37): withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty(), iso() (+29 more)

### Community 5 - "spec.ts"
Cohesion: 0.07
Nodes (73): conicItems(), isConicLine(), quadricEquation(), multipleOf(), areaOf(), AXES, blockLines(), ComplexDefinitions (+65 more)

### Community 6 - "arithmetic.ts"
Cohesion: 0.07
Nodes (66): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+58 more)

### Community 7 - "primitive.ts"
Cohesion: 0.17
Nodes (61): atIntegers(), similarSolution(), algebraic(), bigGcd(), byParts(), candidates(), canon(), combineLogs() (+53 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (44): FIGURE_PALETTE, labelHtml(), addLabel(), boxes, cameras, complexCoord(), containing(), coord() (+36 more)

### Community 9 - "files.ts"
Cohesion: 0.19
Nodes (15): inClaudeViewer(), loadDialect(), canWriteFilesDirectly(), downloadBlob(), downloadText(), fileNameFor(), FsWindow, isAbort() (+7 more)

### Community 10 - "symbolic.ts"
Cohesion: 0.08
Nodes (60): polyEx(), distribute(), recognizeEx(), assumePositive(), cancelLinear(), combine(), commonMonomial(), commonPositive() (+52 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.11
Nodes (51): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+43 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (54): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseWindow(), chooseY(), clipLines(), domainEdge() (+46 more)

### Community 13 - "Board"
Cohesion: 0.12
Nodes (4): Board, clampZoom(), loadPrefs(), validView()

### Community 14 - "SchemaEditor"
Cohesion: 0.11
Nodes (4): SchemaEditor, createEdgeCell(), EdgeLook, serializeSchema()

### Community 15 - "Rational"
Cohesion: 0.11
Nodes (20): Part, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactRandom, exactRoot(), factorialExact() (+12 more)

### Community 16 - "view3d.ts"
Cohesion: 0.08
Nodes (74): staticGraphSvg(), addMesh(), addTet(), affinePlane(), Axis, Box, centroid(), chooseBox() (+66 more)

### Community 17 - "MathError"
Cohesion: 0.09
Nodes (47): argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot(), fieldOn(), outward() (+39 more)

### Community 18 - "numerical.ts"
Cohesion: 0.08
Nodes (60): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Funzionalità (+52 more)

### Community 19 - "FoldersStore"
Cohesion: 0.07
Nodes (21): Deletion, DeletionLog, cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder() (+13 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (41): b, bigops, c, calculus, fn, fr, fractions, functions (+33 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "markdown.ts"
Cohesion: 0.13
Nodes (26): dompurify, highlight.js, markdown-it-footnote, bulletGroup(), sameList(), alignInside(), asciiTrim(), findMarker() (+18 more)

### Community 23 - "graph.ts"
Cohesion: 0.06
Nodes (48): @maxgraph/core, fieldInput(), textWidth(), AT_X, cellHtml(), cellText(), COMPASS, createGraph() (+40 more)

### Community 25 - "linear.ts"
Cohesion: 0.10
Nodes (60): angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, dataOf(), degreesText() (+52 more)

### Community 26 - "toLatex"
Cohesion: 0.11
Nodes (37): isNumericalLine(), numericalItems(), areaFor(), condLabel(), itemFor(), multipleLabel(), planeRegionFor(), names() (+29 more)

### Community 27 - "assistant.ts"
Cohesion: 0.15
Nodes (20): AiAnswer, AiError, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible(), askThroughHost(), checkShape() (+12 more)

### Community 28 - "subst"
Cohesion: 0.16
Nodes (23): valueAt(), primitive(), verified(), linearCells(), atValues(), Converter, coordinates(), definiteParts() (+15 more)

### Community 29 - "conics.ts"
Cohesion: 0.19
Nodes (28): at(), centralCanonical(), Coefficients, coneCanonical(), ConicInfo, conicOf(), det2(), det3() (+20 more)

### Community 30 - "board.ts"
Cohesion: 0.11
Nodes (23): perfect-freehand, Action, ERASER_RADIUS, ICON, PanAction, PinchAction, Prefs, START (+15 more)

### Community 31 - "drawScene"
Cohesion: 0.15
Nodes (16): Vec3, arrowHead(), boxShape(), Coverage, Directions, dot(), drawScene(), f1() (+8 more)

### Community 32 - "distributions.ts"
Cohesion: 0.07
Nodes (59): addExp(), choose(), continuousQuantile(), discreteQuantile(), Distribution, exactIntervalProbability(), factorialBig(), FAMILIES (+51 more)

### Community 33 - "graphNote.test.ts"
Cohesion: 0.10
Nodes (22): acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult, calcResults(), CheckWidget, formulasUntil() (+14 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "gauss.ts"
Cohesion: 0.15
Nodes (26): COMPLEX_FUNCTIONS, farthest(), gaussItem(), hasExponential(), inZ(), isComplexLine(), isComplexValue(), isInequality() (+18 more)

### Community 36 - "laplace.ts"
Cohesion: 0.15
Nodes (30): factoredPolynomial(), polyShown(), oneFraction(), beyondPoles(), compiled(), E, exp(), fractionShown() (+22 more)

### Community 37 - "namesIn"
Cohesion: 0.14
Nodes (36): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+28 more)

### Community 38 - "probability.ts"
Cohesion: 0.13
Nodes (23): End, CompileOptions, RelOp, ALL, compileOf(), complement(), distributionOf(), endAt() (+15 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "statsShown.ts"
Cohesion: 0.19
Nodes (29): check(), correlation(), count(), covariance(), Data, dataStatistic(), deviation(), fail() (+21 more)

### Community 41 - "store.ts"
Cohesion: 0.14
Nodes (15): BoardChange, BoardData, done(), fromRecord(), IdbBoards, ofNote(), openBoardDatabase(), openDefault() (+7 more)

### Community 42 - "NotesStore"
Cohesion: 0.12
Nodes (15): isUuid(), newId(), createdAtFromId(), deriveTitle(), noteIdsInBrowser(), NotesStore, RemoteNote, hasLocalStorage() (+7 more)

### Community 43 - "study.ts"
Cohesion: 0.16
Nodes (32): limit(), Asymptote, compiled(), cutsOf(), defined(), domainOf(), exact(), inDomain() (+24 more)

### Community 44 - "complex.ts"
Cohesion: 0.09
Nodes (25): add(), arg(), ComplexCompiled, ComplexVars, conjugateOf(), cos(), cosh(), EMPTY_COMPLEX_SCOPE (+17 more)

### Community 45 - "statsGraph.ts"
Cohesion: 0.19
Nodes (16): isTestLine(), number(), testItems(), classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX (+8 more)

### Community 46 - "scopeWith"
Cohesion: 0.08
Nodes (50): constantIntegrand(), depth(), inequalityMargin(), integralRegion, LayeredSolid, Multiple, planeMargin(), PlanePart (+42 more)

### Community 47 - "vitest"
Cohesion: 0.06
Nodes (32): vite-plugin-pwa, vitest, GraphItem, parseGraph(), PALETTES, parseMath(), light, item() (+24 more)

### Community 48 - "parse.ts"
Cohesion: 0.06
Nodes (41): hasWord(), errorMessage(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES (+33 more)

### Community 49 - "spell.test.ts"
Cohesion: 0.07
Nodes (28): @codemirror/lang-markdown, LIST_STYLES, noIndentedCode, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck() (+20 more)

### Community 50 - "account/space.ts"
Cohesion: 0.18
Nodes (19): accountSpace(), adoptGuestNotes(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf(), setCurrentAccount() (+11 more)

### Community 51 - "solve.ts"
Cohesion: 0.18
Nodes (24): polynomialIn(), isStandardUnknown(), linearSystem(), matrixEquation(), breaks(), cubeRoot(), equation(), holds() (+16 more)

### Community 52 - "search.ts"
Cohesion: 0.15
Nodes (26): preferredIndex(), SuggestionItem, editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex() (+18 more)

### Community 53 - "settings.ts"
Cohesion: 0.14
Nodes (20): addPersonalWord(), DICTIONARY_KEY, loadPersonalWords(), savePersonalWords(), tidy(), ACCOUNT_SETTINGS, accountSettings(), AI_MODELS (+12 more)

### Community 54 - "strokes.ts"
Cohesion: 0.15
Nodes (16): between(), Box, boxesTouch(), capsuleSpan(), circleSpan(), compareStrokes(), eraseStroke(), INK_COLORS (+8 more)

### Community 55 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "insert.ts"
Cohesion: 0.15
Nodes (17): @codemirror/state, @codemirror/view, InsertOptions, templateInsertion(), toggleLinePrefix(), besideSchema(), guardBlocks(), schemaBlockRanges() (+9 more)

### Community 58 - "Field"
Cohesion: 0.11
Nodes (5): eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat()

### Community 59 - "renderTex"
Cohesion: 0.23
Nodes (6): cleanKatexError(), renderTex(), SymbolForm, displayCode(), preventFocusSteal(), SidePanel

### Community 60 - ".paintVertexShape"
Cohesion: 0.15
Nodes (5): DotShape, IdentifyingRelationShape, NoteShape, TableShape, WeakEntityShape

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (24): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+16 more)

### Community 62 - "supabase.ts"
Cohesion: 0.13
Nodes (30): @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken(), ensureSessionOf() (+22 more)

### Community 63 - "evaluateExactComplex"
Cohesion: 0.22
Nodes (12): asin(), atan(), compileFunction(), evaluateExactComplex(), exactSqrt(), GaussRational, log(), pow() (+4 more)

### Community 65 - "sheet.ts"
Cohesion: 0.07
Nodes (32): close(), Definite, definiteIntegral(), exValue(), samples(), OdeFunction, expSumValue(), ExactFunction (+24 more)

### Community 66 - "Sheet"
Cohesion: 0.06
Nodes (50): Dove sono le cose, GaussLine, Definition, Line, ExactComplexScope, ConicElements, Ode, withWorkLimit() (+42 more)

### Community 67 - "powerseries.ts"
Cohesion: 0.12
Nodes (21): EMPTY_SCOPE, Piece, Condition, Family, Group, Root, Shape, convergesAt() (+13 more)

### Community 68 - "sql.ts"
Cohesion: 0.10
Nodes (27): SchemaEditorOptions, base64(), hide(), OPEN, schemasForFile(), schemasFromFile(), unhide(), Schema (+19 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "editor/editor.ts"
Cohesion: 0.06
Nodes (43): description, name, private, type, version, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands (+35 more)

### Community 72 - "Pt"
Cohesion: 0.19
Nodes (7): coalesced(), DrawAction, EraseAction, Finger, penErases(), pressureOf(), Pt

### Community 73 - "sidePanel.ts"
Cohesion: 0.19
Nodes (13): AiResult, isConfidentAnswer(), CATEGORIES, symbolsInCategory(), cardPreviewTex(), formPreviewTex(), ParsedTemplate, parseTemplate() (+5 more)

### Community 74 - "logo.ts"
Cohesion: 0.39
Nodes (5): BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark()

### Community 75 - "toolbar.ts"
Cohesion: 0.12
Nodes (15): EditorCallbacks, MarkdownEditor, insertBlock(), insertTemplate(), wrapSelection(), Action, createToolbar(), insertCode() (+7 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.04
Nodes (86): alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ARROW_NAMES, AT_ICONS (+78 more)

### Community 79 - "graph/file.ts"
Cohesion: 0.12
Nodes (32): figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsFromFile(), OPEN, swatchSvg(), titleBand() (+24 more)

### Community 82 - "editor.test.ts"
Cohesion: 0.07
Nodes (30): @lezer/common, closeMathBlockOnEnter(), tabOutOfMath(), CODE_NODES, CommandToken, commandTokenAt(), isInCode(), MATH_NODES (+22 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.20
Nodes (6): centerOf(), clickOn(), ffmpeg, SCENES, SIZE, work

### Community 90 - "Abbonamenti"
Cohesion: 0.14
Nodes (14): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+6 more)

### Community 91 - "grafo-html.mjs"
Cohesion: 0.25
Nodes (4): graphFile, names, namesFile, root

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

### Community 101 - "createFakeSupabase"
Cohesion: 0.60
Nodes (6): createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 102 - "h"
Cohesion: 0.07
Nodes (53): SyncStatus, board, viewSwitch, openShareDialog(), changeAccess(), changeCopy(), copy(), refreshChanged() (+45 more)

### Community 103 - "I modelli e le chiavi API"
Cohesion: 0.50
Nodes (4): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), Le idee dello studente (5 ottobre 2026)

### Community 104 - "limits.ts"
Cohesion: 0.23
Nodes (16): exponentialForm(), fracTex(), fracText(), nearFraction(), piMultiple(), surd(), alternating(), close() (+8 more)

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
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

### Community 109 - "Glifo – note per Claude"
Cohesion: 0.29
Nodes (7): Comandi, Come controllare il lavoro, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole, sqlite()

### Community 110 - "page.ts"
Cohesion: 0.08
Nodes (33): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), currentAccount(), PullResult, hydrateGraphs(), setPrinting() (+25 more)

### Community 113 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 114 - "severalGraph.ts"
Cohesion: 0.20
Nodes (16): FieldContext, fourierItems(), isFourierLine(), criticalLine(), isSeveralLine(), named(), severalItems(), surface() (+8 more)

### Community 115 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 116 - "tutorial.ts"
Cohesion: 0.18
Nodes (11): HINT_MS, markSeen(), openTutorial(), show(), richText(), showTutorialHint(), close(), TUTORIAL_PAGES (+3 more)

### Community 117 - "formatNumber"
Cohesion: 0.10
Nodes (38): endTex(), decimalSeparator(), Digits, formatNumber(), formatRational(), fromNumber(), fromRational(), SUPERSCRIPT (+30 more)

### Community 121 - "BoardStore"
Cohesion: 0.17
Nodes (3): BoardOptions, BoardStore, validView()

### Community 122 - "SuggestionController"
Cohesion: 0.23
Nodes (3): EditorMathContext, expand(), SuggestionController

### Community 123 - "katex.ts"
Cohesion: 0.22
Nodes (8): katex, valueNode(), checkHtml(), checkTitle(), cache, renderTexOrError(), renderTexWithResult(), TexRender

### Community 124 - "host.ts"
Cohesion: 0.27
Nodes (7): cache, capability(), ClaudeRuntime, hostDownloads, HostError, ModelTier, runtime()

### Community 125 - ".int"
Cohesion: 0.27
Nodes (6): expSum, Mat, divideExp(), exactSetProbability(), quadraticIn(), R()

## Knowledge Gaps
- **553 isolated node(s):** `Deciso`, `Com'è andata la discussione`, `La proposta dello studente (4 ottobre 2026)`, `Il parere di Claude, in breve`, `Come si decide cosa far pagare` (+548 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 752 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `linsys.ts`, `sync.ts`, `symbolic.ts`, `editor/lists.ts`, `svg.ts`, `Rational`, `view3d.ts`, `FoldersStore`, `markdown.ts`, `linear.ts`, `assistant.ts`, `board.ts`, `distributions.ts`, `graphNote.test.ts`, `resize.ts`, `store.ts`, `NotesStore`, `parse.ts`, `spell.test.ts`, `account/space.ts`, `search.ts`, `settings.ts`, `strokes.ts`, `insert.ts`, `supabase.ts`, `Sheet`, `sql.ts`, `editor/editor.ts`, `sidePanel.ts`, `logo.ts`, `schema/editor.ts`, `editor.test.ts`, `h`, `page.ts`, `tutorial.ts`?**
  _High betweenness centrality (0.126) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `Sheet` to `linsys.ts`, `Parser`, `main.ts`, `num`, `spec.ts`, `arithmetic.ts`, `primitive.ts`, `graph/preview.ts`, `symbolic.ts`, `svg.ts`, `Rational`, `view3d.ts`, `numerical.ts`, `markdown.ts`, `graph.ts`, `linear.ts`, `toLatex`, `assistant.ts`, `subst`, `distributions.ts`, `logic.ts`, `gauss.ts`, `namesIn`, `NotesStore`, `study.ts`, `account/space.ts`, `solve.ts`, `settings.ts`, `strokes.ts`, `finite.ts`, `supabase.ts`, `evaluateExactComplex`, `.constructor`, `powerseries.ts`, `schema/editor.ts`, `graph/file.ts`, `several.ts`, `limits.ts`, `Glifo – note per Claude`, `severalGraph.ts`, `tutorial.ts`, `BoardStore`?**
  _High betweenness centrality (0.114) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `.constructor`, `main.ts`, `resize.ts`, `graph/preview.ts`, `files.ts`, `sidePanel.ts`, `toolbar.ts`, `Board`, `schema/editor.ts`, `SchemaEditor`, `page.ts`, `spell.test.ts`, `FoldersStore`, `tutorial.ts`, `graph.ts`, `renderTex`, `board.ts`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **What connects `Deciso`, `Com'è andata la discussione`, `La proposta dello studente (4 ottobre 2026)` to the rest of the system?**
  _553 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Parser` be split into smaller, more focused modules?**
  _Cohesion score 0.12474849094567404 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.046583850931677016 - nodes in this community are weakly interconnected._
- **Should `num` be split into smaller, more focused modules?**
  _Cohesion score 0.08374963267704966 - nodes in this community are weakly interconnected._