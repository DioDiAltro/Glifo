# Graph Report - matherdown  (2026-10-05)

## Corpus Check
- 238 files · ~447,942 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 3889 nodes · 13895 edges · 125 communities (105 shown, 20 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 385 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `5d5e9f19`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- touchlog.ts
- parse.ts
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
- exact.ts
- graph/file.ts
- compile
- numerical.ts
- markdown.ts
- index.ts
- engine.ts
- markers.ts
- graph.ts
- Dove sono le cose
- MathError
- toLatex
- assistant.ts
- dialogs.ts
- conics.ts
- board.ts
- graph/space.ts
- distributions.ts
- calcResults.ts
- logic.ts
- domain.ts
- Rational
- namesIn
- probability.ts
- resize.ts
- statsShown.ts
- store.ts
- NotesStore
- study.ts
- complex.ts
- FoldersStore
- editor/editor.ts
- vitest
- files.ts
- page.ts
- inference.ts
- linsys.ts
- search.ts
- statsGraph.ts
- strokes.ts
- finite.ts
- 20261004091555_note_condivise.sql
- insert.ts
- Field
- SidePanel
- shapes.ts
- dependencies
- supabase.ts
- BoardOptions
- schema/preview.ts
- Distribution
- sheet.ts
- suggestions.ts
- sql.ts
- Benvenuto in Glifo
- compilerOptions
- spell.test.ts
- .setView
- parseGraph
- parseSchema
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
- sidePanel.ts
- several.ts
- supabase-stub.sql
- account-test.mjs
- Il database degli account (Supabase)
- Costi
- smoke-test.mjs
- scripts
- h
- I modelli e le chiavi API
- schemaTools.test.ts
- Le spiegazioni, come funzionano
- fake-supabase.mjs
- Piano per piano
- gauss.ts
- Glifo – note per Claude
- openShareDialog
- icons.mjs
- La lavagna
- tutorial.ts
- spellcheck
- spaces.ts
- Glifo
- database.ts
- formatNumber
- linear.test.ts

## God Nodes (most connected - your core abstractions)
1. `MathError` - 151 edges
2. `num()` - 145 edges
3. `Sheet` - 129 edges
4. `MathNode` - 128 edges
5. `mul()` - 124 edges
6. `Dove sono le cose` - 114 edges
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

## Communities (125 total, 20 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.09
Nodes (26): at(), browserStore, clip(), isSaved(), KINDS, LOG_KEY, LOG_MAX_LINES, LogStore (+18 more)

### Community 1 - "parse.ts"
Cohesion: 0.08
Nodes (39): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe(), differentialInFraction() (+31 more)

### Community 2 - "main.ts"
Cohesion: 0.05
Nodes (81): addToGraphBlock(), setGraphLabels(), graphsFromFile(), unhide(), account, active, app, applyAccountChange() (+73 more)

### Community 3 - "odesolve.ts"
Cohesion: 0.09
Nodes (80): linearIn(), addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames() (+72 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (32): AccountSync, withLock(), Account, EMPTY_STATE, FolderChange, FolderRow, isEmpty(), iso() (+24 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (87): formulaAtCursor(), GraphLabelLines, insertGraphBlock(), quadricEquation(), isNumericalLine(), numericalItems(), constantIntegrand(), inequalityMargin() (+79 more)

### Community 6 - "arithmetic.ts"
Cohesion: 0.06
Nodes (92): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+84 more)

### Community 7 - "num"
Cohesion: 0.14
Nodes (84): atIntegers(), withoutAbs(), exp(), hyperbolicToExp(), inverseRational(), sqrtEx(), termTransform(), polyEx() (+76 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (43): addLabel(), boxes, cameras, complexCoord(), containing(), coord(), drawings, drawnViews (+35 more)

### Community 9 - "view3d.ts"
Cohesion: 0.09
Nodes (35): Detail, Face, FAST, FINE, planeTolerance(), Plane, Vec3, escapeXml() (+27 more)

### Community 10 - "symbolic.ts"
Cohesion: 0.06
Nodes (62): atValues(), cancelLinear(), Converter, coordinates(), decimalText(), definiteParts(), definiteValue(), degree() (+54 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.17
Nodes (33): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+25 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (51): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), domainEdge(), features() (+43 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.09
Nodes (8): SchemaEditor, edgeLook(), nodeLook(), nodeStyle(), readSchema(), restyle(), EdgeLook, serializeSchema()

### Community 15 - "exact.ts"
Cohesion: 0.13
Nodes (20): expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactFunction, ExactRandom, exactRoot() (+12 more)

### Community 16 - "graph/file.ts"
Cohesion: 0.10
Nodes (36): figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsForFile(), hide(), OPEN, swatchSvg() (+28 more)

### Community 17 - "compile"
Cohesion: 0.06
Nodes (65): conicItems(), isConicLine(), areaFor(), condLabel(), constantValue(), define(), isStraight(), isVectorName() (+57 more)

### Community 18 - "numerical.ts"
Cohesion: 0.12
Nodes (46): bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial(), interpolating() (+38 more)

### Community 19 - "markdown.ts"
Cohesion: 0.13
Nodes (25): katex, valueNode(), checkHtml(), checkTitle(), cache, cleanKatexError(), escapeHtml(), renderTex() (+17 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (39): b, bigops, c, calculus, fn, fr, fractions, functions (+31 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "markers.ts"
Cohesion: 0.12
Nodes (32): ListStyle, bullet(), bulletGroup(), childMarker(), column(), firstMarker(), label(), lettersMarker() (+24 more)

### Community 23 - "graph.ts"
Cohesion: 0.12
Nodes (24): AT_X, cellHtml(), cellText(), COMPASS, createEdgeCell(), createGraph(), drawSchema(), edgeStyle() (+16 more)

### Community 24 - "Dove sono le cose"
Cohesion: 0.09
Nodes (9): Dove sono le cose, BoardStore, MemoryBoards, ConicElements, solveRequest(), studyTable(), ViewMode, showTutorialHint() (+1 more)

### Community 25 - "MathError"
Cohesion: 0.10
Nodes (62): compileApply(), MathError, nameLabel(), UndefinedName, formatRational(), angleBetween(), asMatrix(), basisOf() (+54 more)

### Community 26 - "toLatex"
Cohesion: 0.08
Nodes (43): FieldContext, fourierItems(), isFourierLine(), criticalLine(), isSeveralLine(), named(), severalItems(), surface() (+35 more)

### Community 27 - "assistant.ts"
Cohesion: 0.15
Nodes (20): AiAnswer, AiError, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible(), askThroughHost(), checkShape() (+12 more)

### Community 28 - "dialogs.ts"
Cohesion: 0.11
Nodes (24): addPersonalWord(), DICTIONARY_KEY, loadPersonalWords(), savePersonalWords(), tidy(), ACCOUNT_SETTINGS, accountSettings(), AI_MODELS (+16 more)

### Community 29 - "conics.ts"
Cohesion: 0.19
Nodes (28): at(), centralCanonical(), Coefficients, coneCanonical(), ConicInfo, conicOf(), det2(), det3() (+20 more)

### Community 30 - "board.ts"
Cohesion: 0.08
Nodes (36): perfect-freehand, Action, ACTION_NAMES, DrawAction, EraseAction, ERASER_RADIUS, Finger, ICON (+28 more)

### Community 31 - "graph/space.ts"
Cohesion: 0.13
Nodes (48): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+40 more)

### Community 32 - "distributions.ts"
Cohesion: 0.19
Nodes (25): choose(), continuousQuantile(), factorialBig(), FAMILIES, integerParam(), invalid(), makeDistribution(), ONE (+17 more)

### Community 33 - "calcResults.ts"
Cohesion: 0.14
Nodes (11): CalcCheck, calcOutcomes(), calcPlugin, CalcResult, calcResults(), CheckWidget, formulasUntil(), ResultWidget (+3 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "domain.ts"
Cohesion: 0.10
Nodes (40): depth(), integralRegion, LayeredSolid, Multiple, PlanePart, radiusOf(), spaceLayers(), spaceMargin() (+32 more)

### Community 36 - "Rational"
Cohesion: 0.07
Nodes (53): Part, close(), Definite, definiteIntegral(), exValue(), samples(), EMPTY_SCOPE, Rational (+45 more)

### Community 37 - "namesIn"
Cohesion: 0.15
Nodes (34): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+26 more)

### Community 38 - "probability.ts"
Cohesion: 0.14
Nodes (21): End, Family, rejection(), ALL, complement(), endAt(), EventContext, eventSet() (+13 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "statsShown.ts"
Cohesion: 0.15
Nodes (34): expSumValue(), Lin, check(), correlation(), count(), covariance(), Data, DATA_FUNCTIONS (+26 more)

### Community 41 - "store.ts"
Cohesion: 0.10
Nodes (15): fake-indexeddb, BoardBackend, done(), fromRecord(), IdbBoards, ofNote(), openBoardDatabase(), openDefault() (+7 more)

### Community 42 - "NotesStore"
Cohesion: 0.07
Nodes (44): accountSpace(), adoptGuestNotes(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf(), setCurrentAccount() (+36 more)

### Community 43 - "study.ts"
Cohesion: 0.16
Nodes (33): limit(), Asymptote, boundaries(), compiled(), cutsOf(), defined(), domainOf(), exact() (+25 more)

### Community 44 - "complex.ts"
Cohesion: 0.06
Nodes (58): add(), allRoots(), arg(), asin(), atan(), compileApply(), compileComplex(), compileFunction() (+50 more)

### Community 45 - "FoldersStore"
Cohesion: 0.15
Nodes (4): cleanFolderName(), FoldersStore, sameName(), names()

### Community 46 - "editor/editor.ts"
Cohesion: 0.05
Nodes (42): description, name, private, type, version, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands (+34 more)

### Community 47 - "vitest"
Cohesion: 0.05
Nodes (31): vitest, GraphItem, light, text(), tex(), text(), result(), text() (+23 more)

### Community 48 - "files.ts"
Cohesion: 0.12
Nodes (24): cache, capability(), ClaudeRuntime, hostDownloads, HostError, inClaudeViewer(), ModelTier, runtime() (+16 more)

### Community 49 - "page.ts"
Cohesion: 0.11
Nodes (21): currentAccount(), SharedNote, body, draw(), isDark(), saveButton, saveCopy(), settings (+13 more)

### Community 50 - "inference.ts"
Cohesion: 0.16
Nodes (24): chiSquareTest(), confidence(), confidenceShown(), Given, hypothesisTest(), InferenceContext, interval(), meanOf() (+16 more)

### Community 51 - "linsys.ts"
Cohesion: 0.11
Nodes (45): nameLatex(), FLOAT, rref(), choices(), gcd(), isStandardUnknown(), linearSystem(), matrixEquation() (+37 more)

### Community 52 - "search.ts"
Cohesion: 0.17
Nodes (24): editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex() (+16 more)

### Community 53 - "statsGraph.ts"
Cohesion: 0.22
Nodes (14): isTestLine(), number(), testItems(), classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX (+6 more)

### Community 54 - "strokes.ts"
Cohesion: 0.16
Nodes (15): between(), Box, boxesTouch(), capsuleSpan(), circleSpan(), compareStrokes(), eraseStroke(), intersect() (+7 more)

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
Cohesion: 0.13
Nodes (6): characteristicPolynomial(), eigenvalues(), Field, interpolate(), interpolateFloat(), polynomialIn()

### Community 59 - "SidePanel"
Cohesion: 0.25
Nodes (3): displayCode(), preventFocusSteal(), SidePanel

### Community 60 - "shapes.ts"
Cohesion: 0.09
Nodes (15): @maxgraph/core, ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape (+7 more)

### Community 61 - "dependencies"
Cohesion: 0.06
Nodes (34): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+26 more)

### Community 62 - "supabase.ts"
Cohesion: 0.12
Nodes (32): @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken(), ensureSessionOf() (+24 more)

### Community 64 - "schema/preview.ts"
Cohesion: 0.14
Nodes (14): GraphLabels, GraphLook, Look, Theme, draw(), drawCached(), drawn, errorHtml() (+6 more)

### Community 65 - "Distribution"
Cohesion: 0.17
Nodes (11): addExp(), discreteQuantile(), Distribution, exactIntervalProbability(), integerRange(), intervalProbability(), subtractExp(), pValue() (+3 more)

### Community 66 - "sheet.ts"
Cohesion: 0.06
Nodes (51): numericPartials(), Ode, OdeFunction, withWorkLimit(), FiniteContext, FormattedResult, Eigenvalue, LinearValue (+43 more)

### Community 67 - "suggestions.ts"
Cohesion: 0.19
Nodes (7): templateInsertion(), EditorMathContext, expand(), preferredIndex(), SuggestionController, parseTemplate(), templateText()

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
Cohesion: 0.09
Nodes (27): lineDepth(), mathMarkdown, parseBlockMath(), misspelledMark, refreshSpelling, setTarget, SKIP, SpellTarget (+19 more)

### Community 72 - ".setView"
Cohesion: 0.20
Nodes (5): clampZoom(), coalesced(), pressureOf(), validView(), newStrokeId()

### Community 73 - "parseGraph"
Cohesion: 0.11
Nodes (23): staticGraphSvg(), chooseWindow(), specFor(), chooseBox(), GraphSpec, parseGraph(), DrawOptions, graphSvg() (+15 more)

### Community 74 - "parseSchema"
Cohesion: 0.13
Nodes (21): findSchemaBlock(), findSchemaBlocks(), OpenFence, SchemaBlock, schemaBlockAtLine(), schemaBlockText(), hide(), OPEN (+13 more)

### Community 75 - "toolbar.ts"
Cohesion: 0.12
Nodes (16): EditorCallbacks, MarkdownEditor, insertBlock(), insertTemplate(), wrapSelection(), SidePanelDeps, Action, createToolbar() (+8 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.05
Nodes (60): ALIGN, ARROW_NAMES, AT_ICONS, AT_NAMES, BASE_PRESETS, BIG_ARROWS, DB_PRESETS, Direction (+52 more)

### Community 79 - "Più avanti"
Cohesion: 0.14
Nodes (14): Abbonamento e funzioni a pagamento (da capire), Account: i propri appunti su ogni dispositivo, anche da condividere, Aiuto con gli esercizi, Altre idee, Calcoli e grafici: idee in più, Idee per il futuro, In programma, La lavagna: idee in più (+6 more)

### Community 82 - "editor.test.ts"
Cohesion: 0.07
Nodes (30): @lezer/common, closeMathBlockOnEnter(), tabOutOfMath(), CODE_NODES, CommandToken, commandTokenAt(), isInCode(), MATH_NODES (+22 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.12
Nodes (10): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+2 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.14
Nodes (14): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+6 more)

### Community 91 - "sidePanel.ts"
Cohesion: 0.16
Nodes (15): AiResult, SuggestionItem, isConfidentAnswer(), CATEGORIES, symbolsInCategory(), cardPreviewTex(), formPreviewTex(), ParsedTemplate (+7 more)

### Community 92 - "several.ts"
Cohesion: 0.13
Nodes (38): severalLimit, fractionNear(), at(), bounded(), Candidate, candidates(), compiled(), constraintsOf() (+30 more)

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

### Community 101 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 102 - "h"
Cohesion: 0.08
Nodes (30): SyncStatus, viewSwitch, loadDialect(), fileNameFor(), AccountButton, confirmAccountDeletion(), messageOf(), openAccountDialog() (+22 more)

### Community 103 - "I modelli e le chiavi API"
Cohesion: 0.50
Nodes (4): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), Le idee dello studente (5 ottobre 2026)

### Community 104 - "schemaTools.test.ts"
Cohesion: 0.15
Nodes (19): alignBoxes(), Alignment, Box, distributeBoxes(), Position, base64(), crc32(), svgSize() (+11 more)

### Community 105 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 106 - "fake-supabase.mjs"
Cohesion: 0.22
Nodes (11): b64(), CODE, createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom() (+3 more)

### Community 107 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 108 - "gauss.ts"
Cohesion: 0.16
Nodes (21): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexLine(), isComplexValue() (+13 more)

### Community 109 - "Glifo – note per Claude"
Cohesion: 0.29
Nodes (7): Comandi, Come controllare il lavoro, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole, sqlite()

### Community 110 - "openShareDialog"
Cohesion: 0.09
Nodes (33): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), PullResult, openShareDialog(), changeAccess(), changeCopy() (+25 more)

### Community 113 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 115 - "tutorial.ts"
Cohesion: 0.20
Nodes (10): HINT_MS, markSeen(), openTutorial(), show(), richText(), TUTORIAL_PAGES, TutorialOptions, TutorialPage (+2 more)

### Community 116 - "spellcheck"
Cohesion: 0.21
Nodes (8): spellcheck(), close(), misspelledAt(), openAt(), replace(), tooltipView(), SpellChecker, SpellcheckOptions

### Community 117 - "spaces.ts"
Cohesion: 0.15
Nodes (21): eigenvectors(), kernel(), Mat, splitRoot(), cartesianEquations(), Cell, coordinateNames(), diagonalize() (+13 more)

### Community 121 - "Glifo"
Cohesion: 0.15
Nodes (13): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Funzionalità (+5 more)

### Community 122 - "database.ts"
Cohesion: 0.24
Nodes (6): @electric-sql/pglite, createDatabase(), createUser(), databaseTests(), migrations, shareTests()

### Community 123 - "formatNumber"
Cohesion: 0.27
Nodes (9): decimalSeparator(), Digits, formatNumber(), FormatOptions, fromNumber(), fromRational(), SUPERSCRIPT, writeDigits() (+1 more)

### Community 124 - "linear.test.ts"
Cohesion: 0.33
Nodes (6): EXACT, A, B, q(), result(), text()

## Knowledge Gaps
- **563 isolated node(s):** `Deciso`, `Com'è andata la discussione`, `La proposta dello studente (4 ottobre 2026)`, `Il parere di Claude, in breve`, `Come si decide cosa far pagare` (+558 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 767 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `touchlog.ts`, `sync.ts`, `num`, `editor/lists.ts`, `graph/file.ts`, `compile`, `markdown.ts`, `markers.ts`, `assistant.ts`, `dialogs.ts`, `board.ts`, `graph/space.ts`, `distributions.ts`, `resize.ts`, `store.ts`, `NotesStore`, `editor/editor.ts`, `page.ts`, `search.ts`, `strokes.ts`, `insert.ts`, `supabase.ts`, `sheet.ts`, `sql.ts`, `spell.test.ts`, `parseGraph`, `parseSchema`, `editor.test.ts`, `sidePanel.ts`, `schemaTools.test.ts`, `openShareDialog`, `tutorial.ts`, `database.ts`, `linear.test.ts`?**
  _High betweenness centrality (0.141) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `Dove sono le cose` to `touchlog.ts`, `parse.ts`, `main.ts`, `odesolve.ts`, `spec.ts`, `arithmetic.ts`, `num`, `graph/preview.ts`, `symbolic.ts`, `svg.ts`, `graph/file.ts`, `compile`, `numerical.ts`, `markdown.ts`, `MathError`, `toLatex`, `assistant.ts`, `graph/space.ts`, `logic.ts`, `domain.ts`, `Rational`, `namesIn`, `NotesStore`, `study.ts`, `complex.ts`, `inference.ts`, `linsys.ts`, `strokes.ts`, `finite.ts`, `supabase.ts`, `schema/preview.ts`, `sheet.ts`, `schema/editor.ts`, `several.ts`, `schemaTools.test.ts`, `gauss.ts`, `Glifo – note per Claude`?**
  _High betweenness centrality (0.105) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `main.ts`, `graph/preview.ts`, `Board`, `SchemaEditor`, `Dove sono le cose`, `dialogs.ts`, `board.ts`, `resize.ts`, `NotesStore`, `files.ts`, `page.ts`, `SidePanel`, `schema/preview.ts`, `spell.test.ts`, `toolbar.ts`, `schema/editor.ts`, `sidePanel.ts`, `openShareDialog`, `tutorial.ts`, `spellcheck`?**
  _High betweenness centrality (0.066) - this node is a cross-community bridge._
- **What connects `Deciso`, `Com'è andata la discussione`, `La proposta dello studente (4 ottobre 2026)` to the rest of the system?**
  _563 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `touchlog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08653061224489796 - nodes in this community are weakly interconnected._
- **Should `parse.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07689003436426117 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05183861082737487 - nodes in this community are weakly interconnected._