# Graph Report - matherdown  (2026-10-05)

## Corpus Check
- 238 files · ~450,718 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 3909 nodes · 13971 edges · 126 communities (107 shown, 19 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 384 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0c79e368`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- touchlog.ts
- Parser
- main.ts
- odesolve.ts
- sync.ts
- spec.ts
- arithmetic.ts
- num
- graph/preview.ts
- view3d.ts
- symbolic.ts
- editor/lists.ts
- svg.ts
- Board
- SchemaEditor
- Rational
- labels.ts
- compile
- numerical.ts
- markdown.ts
- index.ts
- engine.ts
- sheet.ts
- linsys.ts
- BoardStore
- MathError
- latex.ts
- assistant.ts
- h
- conics.ts
- board.ts
- graph/space.ts
- distributions.ts
- graphNote.test.ts
- logic.ts
- evaluateExactComplex
- fourier.ts
- namesIn
- probability.ts
- resize.ts
- statsShown.ts
- parse.ts
- NotesStore
- study.ts
- complex.ts
- store.ts
- vitest
- graph/file.ts
- files.ts
- openShareDialog
- laplace.ts
- solve.ts
- sidePanel.ts
- statsGraph.ts
- strokes.ts
- finite.ts
- 20261004091555_note_condivise.sql
- insert.ts
- Field
- SidePanel
- graph.ts
- dependencies
- supabase.ts
- limits.ts
- schema/preview.ts
- scopeWith
- .sameAs
- tutorial.ts
- sql.ts
- Benvenuto in Glifo
- compilerOptions
- MathNode
- .render
- settings.ts
- math/calculus.ts
- toolbar.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- scripts
- session-start.sh
- .claude/CLAUDE.md
- editor.test.ts
- tutorial.mjs
- Abbonamenti
- AccountSync
- toLatex
- supabase-stub.sql
- account-test.mjs
- Il database degli account (Supabase)
- Costi
- smoke-test.mjs
- devDependencies
- FoldersStore
- I modelli e le chiavi API
- compileComplex
- Le spiegazioni, come funzionano
- fake-supabase.mjs
- Piano per piano
- gauss.ts
- Glifo – note per Claude
- page.ts
- BoardOptions
- La lavagna
- numerical.test.ts
- formatNumber
- Glifo
- spell.test.ts
- formulaGraph
- Sheet
- grafo-html.mjs
- createFakeSupabase

## God Nodes (most connected - your core abstractions)
1. `MathError` - 151 edges
2. `num()` - 145 edges
3. `Sheet` - 129 edges
4. `MathNode` - 128 edges
5. `mul()` - 124 edges
6. `compile()` - 113 edges
7. `Dove sono le cose` - 112 edges
8. `Rational` - 111 edges
9. `toLatex()` - 101 edges
10. `add()` - 98 edges

## Surprising Connections (you probably didn't know these)
- `Funzionalità` --references--> `k()`  [INFERRED]
  README.md → src/math/numerical.ts
- `Dove sono le cose` --references--> `capsuleSpan()`  [INFERRED]
  CLAUDE.md → src/board/strokes.ts
- `Dove sono le cose` --references--> `eraseStroke()`  [INFERRED]
  CLAUDE.md → src/board/strokes.ts
- `Dove sono le cose` --references--> `Converter`  [INFERRED]
  CLAUDE.md → src/math/symbolic.ts
- `Dove sono le cose` --references--> `ConicElements`  [INFERRED]
  CLAUDE.md → src/math/conics.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (126 total, 19 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.09
Nodes (26): at(), browserStore, clip(), isSaved(), KINDS, LOG_KEY, LOG_MAX_LINES, LogStore (+18 more)

### Community 1 - "Parser"
Cohesion: 0.12
Nodes (16): Abbonamento e funzioni a pagamento (da capire), Account: i propri appunti su ogni dispositivo, anche da condividere, Aiuto con gli esercizi, Altre idee, Calcoli e grafici: idee in più, Idee per il futuro, In programma, La lavagna: idee in più (+8 more)

### Community 2 - "main.ts"
Cohesion: 0.05
Nodes (75): addToGraphBlock(), setGraphLabels(), graphsFromFile(), unhide(), account, accountButton, accountProblem(), active (+67 more)

### Community 3 - "odesolve.ts"
Cohesion: 0.09
Nodes (74): addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames(), constantParticular() (+66 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (37): withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty(), iso() (+29 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (103): formulaAtCursor(), FieldContext, isComplexLine(), onlyComplex(), constantIntegrand(), depth(), inequalityMargin(), integralRegion (+95 more)

### Community 6 - "arithmetic.ts"
Cohesion: 0.11
Nodes (45): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+37 more)

### Community 7 - "num"
Cohesion: 0.13
Nodes (87): atIntegers(), withoutAbs(), hyperbolicToExp(), polyEx(), shapeValue(), similarSolution(), yPowers(), algebraic() (+79 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (44): FIGURE_PALETTE, addLabel(), boxes, cameras, complexCoord(), containing(), coord(), drawings (+36 more)

### Community 9 - "view3d.ts"
Cohesion: 0.11
Nodes (31): tickLabel(), Face, planeSide(), planeTolerance(), Plane, Vec3, escapeXml(), arrowHead() (+23 more)

### Community 10 - "symbolic.ts"
Cohesion: 0.07
Nodes (62): primitive(), verified(), linearCells(), pairUp(), atValues(), Converter, coordinates(), decimalText() (+54 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.10
Nodes (54): applyListStyle(), continueList(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext(), isBlank() (+46 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (52): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), domainEdge(), features() (+44 more)

### Community 13 - "Board"
Cohesion: 0.11
Nodes (3): Board, coalesced(), pressureOf()

### Community 14 - "SchemaEditor"
Cohesion: 0.08
Nodes (14): SchemaEditor, createEdgeCell(), edgeLook(), edgeStyle(), insertSchema(), nodeLook(), nodeStyle(), readSchema() (+6 more)

### Community 15 - "Rational"
Cohesion: 0.10
Nodes (22): Part, expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactRandom, exactRoot() (+14 more)

### Community 16 - "labels.ts"
Cohesion: 0.16
Nodes (20): ACCENTS, BLACKBOARD, CALLIGRAPHIC, closing(), convert(), escapeXml(), FUNCTIONS, GREEK (+12 more)

### Community 17 - "compile"
Cohesion: 0.10
Nodes (34): close(), definiteIntegral(), exValue(), samples(), Interval, binomial(), compile(), compileApply() (+26 more)

### Community 18 - "numerical.ts"
Cohesion: 0.12
Nodes (46): FormatOptions, bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial() (+38 more)

### Community 19 - "markdown.ts"
Cohesion: 0.12
Nodes (33): markdown-it, texHtml(), bulletGroup(), sameList(), checkHtml(), checkTitle(), cache, cleanKatexError() (+25 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (42): b, bigops, c, calculus, fn, fr, fractions, functions (+34 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "sheet.ts"
Cohesion: 0.07
Nodes (39): Dove sono le cose, numericPartials(), ConicElements, compileOde(), DDOT, DOT, Ode, OdeFunction (+31 more)

### Community 23 - "linsys.ts"
Cohesion: 0.13
Nodes (41): choices(), gcd(), matrixEquation(), matrixSystem(), minorsGcd(), ONE, parametricSystem(), PARAMS (+33 more)

### Community 24 - "BoardStore"
Cohesion: 0.06
Nodes (14): fake-indexeddb, BoardBackend, BoardStore, done(), IdbBoards, MemoryBoards, ofNote(), openBoardDatabase() (+6 more)

### Community 25 - "MathError"
Cohesion: 0.11
Nodes (61): MathError, angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, dataOf() (+53 more)

### Community 26 - "latex.ts"
Cohesion: 0.12
Nodes (23): ACCENT_COMMANDS, COMPLEX_FUNCTIONS, diffLatex(), DISTRIBUTION_LATEX, distributionLatex(), domainLatex(), fnLatex(), fnName() (+15 more)

### Community 27 - "assistant.ts"
Cohesion: 0.10
Nodes (28): AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible(), askThroughHost() (+20 more)

### Community 28 - "h"
Cohesion: 0.08
Nodes (45): SyncStatus, board, openSignedOut(), printButton(), ShareDialogDeps, AI_MODELS, DEFAULT_SETTINGS, Settings (+37 more)

### Community 29 - "conics.ts"
Cohesion: 0.21
Nodes (27): at(), centralCanonical(), Coefficients, coneCanonical(), conicOf(), det2(), det3(), determinant() (+19 more)

### Community 30 - "board.ts"
Cohesion: 0.09
Nodes (29): Action, ACTION_NAMES, clampZoom(), DrawAction, EraseAction, EraserMode, Finger, ICON (+21 more)

### Community 31 - "graph/space.ts"
Cohesion: 0.10
Nodes (56): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+48 more)

### Community 32 - "distributions.ts"
Cohesion: 0.07
Nodes (58): addExp(), choose(), continuousQuantile(), discreteQuantile(), Distribution, exactIntervalProbability(), expSumValue(), factorialBig() (+50 more)

### Community 33 - "graphNote.test.ts"
Cohesion: 0.08
Nodes (23): acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult, calcResults(), CheckWidget, formulasUntil() (+15 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "evaluateExactComplex"
Cohesion: 0.19
Nodes (13): asin(), atan(), evaluateExactComplex(), exactSqrt(), GaussRational, sinh(), unavailable(), ExactUnavailable (+5 more)

### Community 36 - "fourier.ts"
Cohesion: 0.10
Nodes (33): fourierItems(), Definite, absOf(), boundsOf(), close(), definite(), fourierProblem, fourierShown() (+25 more)

### Community 37 - "namesIn"
Cohesion: 0.20
Nodes (25): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+17 more)

### Community 38 - "probability.ts"
Cohesion: 0.13
Nodes (25): End, Family, CompileOptions, ExactScope, ALL, compileOf(), complement(), distributionOf() (+17 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "statsShown.ts"
Cohesion: 0.17
Nodes (31): check(), correlation(), count(), covariance(), Data, dataStatistic(), deviation(), fail() (+23 more)

### Community 41 - "parse.ts"
Cohesion: 0.07
Nodes (35): hasWord(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, differentialInFraction() (+27 more)

### Community 42 - "NotesStore"
Cohesion: 0.08
Nodes (35): accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf() (+27 more)

### Community 43 - "study.ts"
Cohesion: 0.14
Nodes (38): names(), STUDY_GRAPH, studyItems(), nameLatex(), limit(), breaks(), periodOf(), Asymptote (+30 more)

### Community 44 - "complex.ts"
Cohesion: 0.10
Nodes (28): add(), allRoots(), arg(), compileFunction(), ComplexCompiled, cos(), cosh(), EMPTY_COMPLEX_SCOPE (+20 more)

### Community 45 - "store.ts"
Cohesion: 0.16
Nodes (15): Prefs, BOARD_PALETTES, BoardPalette, BoardTheme, highlightName(), inkName(), PEN_SIZE, SizeChoice (+7 more)

### Community 46 - "vitest"
Cohesion: 0.04
Nodes (48): description, name, private, type, version, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands (+40 more)

### Community 47 - "graph/file.ts"
Cohesion: 0.08
Nodes (44): figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsForFile(), hide(), OPEN, swatchSvg() (+36 more)

### Community 48 - "files.ts"
Cohesion: 0.15
Nodes (16): inClaudeViewer(), loadDialect(), canWriteFilesDirectly(), downloadBlob(), downloadText(), fileNameFor(), FsWindow, isAbort() (+8 more)

### Community 49 - "openShareDialog"
Cohesion: 0.17
Nodes (16): openShareDialog(), changeAccess(), changeCopy(), copy(), refreshChanged(), render(), run(), setStatus() (+8 more)

### Community 50 - "laplace.ts"
Cohesion: 0.15
Nodes (30): factoredPolynomial(), beyondPoles(), compiled(), E, exp(), fractionShown(), HALF, inverseLaplaceShown() (+22 more)

### Community 51 - "solve.ts"
Cohesion: 0.16
Nodes (25): Scope, LinearScope, isStandardUnknown(), linearSystem(), parametricRows(), substitute(), RelOp, equation() (+17 more)

### Community 52 - "sidePanel.ts"
Cohesion: 0.08
Nodes (42): templateInsertion(), EditorMathContext, expand(), preferredIndex(), SuggestionController, SuggestionItem, editDistance(), normalizeText() (+34 more)

### Community 53 - "statsGraph.ts"
Cohesion: 0.18
Nodes (17): isTestLine(), number(), testItems(), classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX (+9 more)

### Community 54 - "strokes.ts"
Cohesion: 0.14
Nodes (20): fromRecord(), between(), Box, boxesTouch(), capsuleSpan(), circleSpan(), compareStrokes(), eraserGrowth() (+12 more)

### Community 55 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "insert.ts"
Cohesion: 0.11
Nodes (24): @codemirror/state, @codemirror/view, InsertOptions, toggleLinePrefix(), besideSchema(), guardBlocks(), schemaBlockRanges(), schemaBlocks() (+16 more)

### Community 58 - "Field"
Cohesion: 0.12
Nodes (7): characteristicPolynomial(), eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn()

### Community 59 - "SidePanel"
Cohesion: 0.25
Nodes (3): displayCode(), preventFocusSteal(), SidePanel

### Community 60 - "graph.ts"
Cohesion: 0.06
Nodes (39): @maxgraph/core, AT_X, cellHtml(), cellText(), COMPASS, createGraph(), drawSchema(), edgeTextAt() (+31 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (24): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+16 more)

### Community 62 - "supabase.ts"
Cohesion: 0.12
Nodes (31): @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken(), ensureSessionOf() (+23 more)

### Community 63 - "limits.ts"
Cohesion: 0.18
Nodes (19): exponentialForm(), fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), alternating() (+11 more)

### Community 64 - "schema/preview.ts"
Cohesion: 0.14
Nodes (14): GraphLabels, Look, SchemaError, Theme, draw(), drawCached(), drawn, errorHtml() (+6 more)

### Community 65 - "scopeWith"
Cohesion: 0.12
Nodes (32): axesIn(), bestAlong(), boundingBox(), combine(), compileDomain(), compileMultiple(), conditionsOf(), constantOf() (+24 more)

### Community 66 - ".sameAs"
Cohesion: 0.21
Nodes (6): FiniteContext, close(), digitsMatch(), isLiteral(), sameExactLinear(), writtenDecimals()

### Community 67 - "tutorial.ts"
Cohesion: 0.16
Nodes (12): HINT_MS, markSeen(), openTutorial(), show(), richText(), showTutorialHint(), close(), TUTORIAL_PAGES (+4 more)

### Community 68 - "sql.ts"
Cohesion: 0.21
Nodes (15): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+7 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "MathNode"
Cohesion: 0.14
Nodes (10): ExactComplexScope, ConicInfo, withWorkLimit(), FormattedResult, LinearValue, MathNode, Found, styleOf() (+2 more)

### Community 72 - ".render"
Cohesion: 0.20
Nodes (4): mid(), outlineSvg(), strokeOptions(), strokeOutline()

### Community 73 - "settings.ts"
Cohesion: 0.13
Nodes (18): DeletionLog, addPersonalWord(), DICTIONARY_KEY, loadPersonalWords(), savePersonalWords(), tidy(), ACCOUNT_SETTINGS, accountSettings() (+10 more)

### Community 74 - "math/calculus.ts"
Cohesion: 0.37
Nodes (11): argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot(), fieldOn(), outward() (+3 more)

### Community 75 - "toolbar.ts"
Cohesion: 0.12
Nodes (15): closeMathBlockOnEnter(), EditorCallbacks, MarkdownEditor, tabOutOfMath(), insertBlock(), insertTemplate(), wrapSelection(), LIST_STYLES (+7 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.04
Nodes (90): alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ARROW_NAMES, AT_ICONS (+82 more)

### Community 79 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 82 - "editor.test.ts"
Cohesion: 0.06
Nodes (36): CODE_NODES, CommandToken, commandTokenAt(), isInCode(), MATH_NODES, mathContextAt(), mathRegionAt(), openMathBefore() (+28 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.20
Nodes (6): centerOf(), clickOn(), ffmpeg, SCENES, SIZE, work

### Community 90 - "Abbonamenti"
Cohesion: 0.14
Nodes (14): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+6 more)

### Community 92 - "toLatex"
Cohesion: 0.09
Nodes (60): criticalLine(), named(), severalItems(), surface(), numShown(), EMPTY_SCOPE, shown(), size() (+52 more)

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
Nodes (4): playwright-core, vite, firstVisit(), plainContext

### Community 101 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

### Community 102 - "FoldersStore"
Cohesion: 0.08
Nodes (16): Deletion, cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder(), loadClosedFolders() (+8 more)

### Community 103 - "I modelli e le chiavi API"
Cohesion: 0.50
Nodes (4): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), Le idee dello studente (5 ottobre 2026)

### Community 104 - "compileComplex"
Cohesion: 0.47
Nodes (6): compileApply(), compileComplex(), compileName(), conjugateOf(), constant(), productPower()

### Community 105 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 106 - "fake-supabase.mjs"
Cohesion: 0.25
Nodes (6): @electric-sql/pglite, b64(), CODE, GOOGLE_CODE, ROOT, SUPABASE_URL

### Community 107 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 108 - "gauss.ts"
Cohesion: 0.18
Nodes (18): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexValue(), isInequality() (+10 more)

### Community 109 - "Glifo – note per Claude"
Cohesion: 0.29
Nodes (7): Comandi, Come controllare il lavoro, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole, sqlite()

### Community 110 - "page.ts"
Cohesion: 0.08
Nodes (31): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), PullResult, sidebarToggle(), isShareToken(), parseSharedNote() (+23 more)

### Community 113 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 115 - "numerical.test.ts"
Cohesion: 0.60
Nodes (3): result(), text(), verdict()

### Community 117 - "formatNumber"
Cohesion: 0.11
Nodes (33): decimalSeparator(), Digits, formatNumber(), formatRational(), fromNumber(), fromRational(), SUPERSCRIPT, writeDigits() (+25 more)

### Community 121 - "Glifo"
Cohesion: 0.15
Nodes (13): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Funzionalità (+5 more)

### Community 122 - "spell.test.ts"
Cohesion: 0.09
Nodes (22): misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt(), openAt() (+14 more)

### Community 123 - "formulaGraph"
Cohesion: 0.10
Nodes (15): conicItems(), isConicLine(), quadricEquation(), isFourierLine(), isNumericalLine(), numericalItems(), isSeveralLine(), complexValue() (+7 more)

### Community 124 - "Sheet"
Cohesion: 0.08
Nodes (28): chainOf(), definitionTarget(), fingerprint(), parseCached(), Sheet, splitPieces(), withoutDots(), mapNode() (+20 more)

### Community 126 - "grafo-html.mjs"
Cohesion: 0.17
Nodes (5): graphFile, names, namesFile, root, PNG_ICONS

### Community 127 - "createFakeSupabase"
Cohesion: 0.60
Nodes (6): createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom()

## Knowledge Gaps
- **566 isolated node(s):** `Tool`, `EraserMode`, `Action`, `ACTION_NAMES`, `YOUNG` (+561 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 771 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **19 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `touchlog.ts`, `sync.ts`, `num`, `editor/lists.ts`, `svg.ts`, `markdown.ts`, `linsys.ts`, `BoardStore`, `MathError`, `assistant.ts`, `h`, `board.ts`, `graph/space.ts`, `distributions.ts`, `graphNote.test.ts`, `resize.ts`, `NotesStore`, `store.ts`, `graph/file.ts`, `sidePanel.ts`, `strokes.ts`, `insert.ts`, `supabase.ts`, `scopeWith`, `tutorial.ts`, `settings.ts`, `schema/editor.ts`, `editor.test.ts`, `FoldersStore`, `page.ts`, `numerical.test.ts`, `spell.test.ts`, `formulaGraph`, `Sheet`?**
  _High betweenness centrality (0.122) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `sheet.ts` to `touchlog.ts`, `Parser`, `main.ts`, `odesolve.ts`, `spec.ts`, `arithmetic.ts`, `num`, `graph/preview.ts`, `symbolic.ts`, `svg.ts`, `SchemaEditor`, `Rational`, `numerical.ts`, `markdown.ts`, `linsys.ts`, `BoardStore`, `MathError`, `assistant.ts`, `graph/space.ts`, `distributions.ts`, `logic.ts`, `evaluateExactComplex`, `fourier.ts`, `namesIn`, `NotesStore`, `study.ts`, `graph/file.ts`, `files.ts`, `strokes.ts`, `finite.ts`, `graph.ts`, `supabase.ts`, `limits.ts`, `schema/preview.ts`, `tutorial.ts`, `MathNode`, `settings.ts`, `schema/editor.ts`, `toLatex`, `compileComplex`, `Glifo – note per Claude`, `page.ts`, `formulaGraph`, `Sheet`?**
  _High betweenness centrality (0.101) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `schema/preview.ts`, `main.ts`, `tutorial.ts`, `FoldersStore`, `resize.ts`, `graph/preview.ts`, `toolbar.ts`, `editor/lists.ts`, `Board`, `page.ts`, `schema/editor.ts`, `SchemaEditor`, `files.ts`, `openShareDialog`, `sidePanel.ts`, `spell.test.ts`, `SidePanel`, `board.ts`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **What connects `Tool`, `EraserMode`, `Action` to the rest of the system?**
  _566 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `touchlog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08653061224489796 - nodes in this community are weakly interconnected._
- **Should `Parser` be split into smaller, more focused modules?**
  _Cohesion score 0.12245696400625979 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0484394506866417 - nodes in this community are weakly interconnected._