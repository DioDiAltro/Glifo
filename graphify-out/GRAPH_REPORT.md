# Graph Report - glifo-main  (2026-10-06)

## Corpus Check
- 248 files · ~483,320 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 4097 nodes · 14677 edges · 126 communities (103 shown, 23 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 430 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `55d5ba56`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- touchlog.ts
- parse.ts
- main.ts
- odesolve.ts
- sync.ts
- spec.ts
- several.ts
- num
- graph/preview.ts
- vitest
- complex.ts
- editor/lists.ts
- svg.ts
- sheet.ts
- SchemaEditor
- Rational
- toNode
- MathError
- numerical.ts
- markdown.ts
- index.ts
- client.ts
- Board
- regions.ts
- store.ts
- linear.ts
- toLatex
- assistant.ts
- h
- conics.ts
- Pt
- view3d.ts
- distributions.ts
- calcResults.ts
- logic.ts
- FoldersStore
- arithmetic.ts
- namesIn
- probability.ts
- resize.ts
- statsShown.ts
- drawScene
- NotesStore
- study.ts
- gauss.ts
- notes.ts
- scripts
- account/space.ts
- engine.ts
- board/shapes.ts
- linsys.ts
- solve.ts
- search.ts
- statsGraph.ts
- graphNote.test.ts
- finite.ts
- 20261004091555_note_condivise.sql
- toolbar.ts
- Field
- grafo-html.mjs
- schema/shapes.ts
- dependencies
- supabase.ts
- Le spiegazioni, come funzionano
- ui/preview.ts
- limits.ts
- parseSchema
- MathNode
- AccountSync
- Benvenuto in Glifo
- compilerOptions
- Dove sono le cose
- Piano per piano
- blockMove.ts
- symbolic.ts
- severalGraph.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- .render
- session-start.sh
- .claude/CLAUDE.md
- editor.test.ts
- tutorial.mjs
- Abbonamenti
- SpellClient
- Costi
- supabase-stub.sql
- account-test.mjs
- Il database degli account (Supabase)
- devDependencies
- La lavagna
- folders.ts
- editor/editor.ts
- Sheet
- I modelli e le chiavi API
- fake-supabase.mjs
- createFakeSupabase
- files.ts
- Glifo – note per Claude
- page.ts
- .compileWith
- Più avanti
- graph/file.ts
- formatNumber
- sync.test.ts
- spell.test.ts
- appleTouch
- sidePanel.ts
- smoke-test.mjs

## God Nodes (most connected - your core abstractions)
1. `MathError` - 151 edges
2. `num()` - 145 edges
3. `Dove sono le cose` - 141 edges
4. `Sheet` - 129 edges
5. `MathNode` - 128 edges
6. `mul()` - 124 edges
7. `Board` - 118 edges
8. `compile()` - 113 edges
9. `Rational` - 111 edges
10. `toLatex()` - 101 edges

## Surprising Connections (you probably didn't know these)
- `Come viene pubblicata` --references--> `dist()`  [INFERRED]
  README.md → src/board/shapes.ts
- `Dove sono le cose` --references--> `ConicElements`  [INFERRED]
  CLAUDE.md → src/math/conics.ts
- `Dove sono le cose` --references--> `adoptGuestNotes()`  [INFERRED]
  CLAUDE.md → src/account/space.ts
- `Dove sono le cose` --references--> `shareNote()`  [INFERRED]
  CLAUDE.md → src/account/supabase.ts
- `Dove sono le cose` --references--> `sharedLinks()`  [INFERRED]
  CLAUDE.md → src/account/supabase.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (126 total, 23 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.09
Nodes (26): at(), browserStore, clip(), isSaved(), KINDS, LOG_KEY, LOG_MAX_LINES, LogStore (+18 more)

### Community 1 - "parse.ts"
Cohesion: 0.08
Nodes (38): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe(), differentialInFraction() (+30 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (96): addToGraphBlock(), setGraphLabels(), graphsFromFile(), unhide(), remapGraphLines(), account, active, app (+88 more)

### Community 3 - "odesolve.ts"
Cohesion: 0.08
Nodes (76): addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames(), constantParticular() (+68 more)

### Community 4 - "sync.ts"
Cohesion: 0.08
Nodes (28): withLock(), Account, EMPTY_STATE, FolderChange, FolderRow, isEmpty(), iso(), merge() (+20 more)

### Community 5 - "spec.ts"
Cohesion: 0.07
Nodes (72): conicItems(), isConicLine(), quadricEquation(), onlyComplex(), areaOf(), AXES, blockLines(), ComplexDefinitions (+64 more)

### Community 6 - "several.ts"
Cohesion: 0.10
Nodes (47): Piece, severalLimit, Condition, Family, Group, Root, Shape, at() (+39 more)

### Community 7 - "num"
Cohesion: 0.13
Nodes (87): atIntegers(), signsUp(), symbolicCoefficient(), withoutAbs(), exp(), hyperbolicToExp(), inverseRational(), sqrtEx() (+79 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (42): addLabel(), boxes, cameras, complexCoord(), coord(), drawings, drawnViews, endTex() (+34 more)

### Community 9 - "vitest"
Cohesion: 0.07
Nodes (31): vite-plugin-pwa, vitest, staticGraphSvg(), chooseWindow(), chooseBox(), GraphItem, parseGraph(), DrawOptions (+23 more)

### Community 10 - "complex.ts"
Cohesion: 0.08
Nodes (48): add(), allRoots(), arg(), asin(), atan(), compileApply(), compileComplex(), compileFunction() (+40 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.10
Nodes (54): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+46 more)

### Community 12 - "svg.ts"
Cohesion: 0.10
Nodes (51): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), domainEdge(), features() (+43 more)

### Community 13 - "sheet.ts"
Cohesion: 0.06
Nodes (35): OdeFunction, FiniteContext, chiSquareTest(), InferenceContext, Lin, NUMERICAL, bracketParts(), BRACKETS (+27 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.06
Nodes (36): SchemaEditor, AT_X, cellHtml(), cellText(), COMPASS, createEdgeCell(), createGraph(), drawSchema() (+28 more)

### Community 15 - "Rational"
Cohesion: 0.08
Nodes (32): Part, addExp(), exactIntervalProbability(), expSum, subtractExp(), bigGcd(), binomExact(), conditionExact() (+24 more)

### Community 16 - "toNode"
Cohesion: 0.17
Nodes (24): EMPTY_SCOPE, absOf(), boundsOf(), close(), fourierProblem, fourierShown(), isTrig(), isZero() (+16 more)

### Community 17 - "MathError"
Cohesion: 0.06
Nodes (76): areaFor(), constantValue(), argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot() (+68 more)

### Community 18 - "numerical.ts"
Cohesion: 0.08
Nodes (60): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Funzionalità (+52 more)

### Community 19 - "markdown.ts"
Cohesion: 0.10
Nodes (36): bulletGroup(), sameList(), moveAttrs(), alignInside(), asciiTrim(), findMarker(), isOrdered(), listAttrs() (+28 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (42): b, bigops, c, calculus, fn, fr, fractions, functions (+34 more)

### Community 21 - "client.ts"
Cohesion: 0.12
Nodes (13): Backend, pageBackend(), SpellClientOptions, workerBackend(), WorkerUnavailable, download(), fetchDictionary(), FILES (+5 more)

### Community 22 - "Board"
Cohesion: 0.09
Nodes (5): Board, loadPrefs(), penErases(), highlightName(), inkName()

### Community 23 - "regions.ts"
Cohesion: 0.13
Nodes (27): constantIntegrand(), depth(), inequalityMargin(), integralRegion, Multiple, multipleOf(), planeMargin(), PlanePart (+19 more)

### Community 24 - "store.ts"
Cohesion: 0.06
Nodes (17): fake-indexeddb, BoardOptions, BoardBackend, BoardStore, done(), fromRecord(), IdbBoards, MemoryBoards (+9 more)

### Community 25 - "linear.ts"
Cohesion: 0.10
Nodes (62): angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, dataOf(), degreesText() (+54 more)

### Community 26 - "toLatex"
Cohesion: 0.10
Nodes (36): fourierItems(), isFourierLine(), isNumericalLine(), numericalItems(), multipleLabel(), names(), STUDY_GRAPH, studyItems() (+28 more)

### Community 27 - "assistant.ts"
Cohesion: 0.12
Nodes (21): AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible(), askThroughHost() (+13 more)

### Community 28 - "h"
Cohesion: 0.07
Nodes (52): SyncStatus, board, viewSwitch, openSignedOut(), printButton(), ShareDialogDeps, DEFAULT_SETTINGS, Settings (+44 more)

### Community 29 - "conics.ts"
Cohesion: 0.18
Nodes (29): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+21 more)

### Community 30 - "Pt"
Cohesion: 0.10
Nodes (17): clampZoom(), coalesced(), Finger, LassoAction, MoveAction, PanAction, PinchAction, pointsOf() (+9 more)

### Community 31 - "view3d.ts"
Cohesion: 0.07
Nodes (78): LayeredSolid, addMesh(), addTet(), affinePlane(), Axis, Box, centroid(), clipBy() (+70 more)

### Community 32 - "distributions.ts"
Cohesion: 0.08
Nodes (54): choose(), continuousQuantile(), discreteQuantile(), expSumValue(), factorialBig(), FAMILIES, Family, integerParam() (+46 more)

### Community 33 - "calcResults.ts"
Cohesion: 0.07
Nodes (27): katex, acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult, calcResults(), CheckWidget (+19 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "FoldersStore"
Cohesion: 0.17
Nodes (4): cleanFolderName(), FoldersStore, sameName(), names()

### Community 36 - "arithmetic.ts"
Cohesion: 0.07
Nodes (73): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+65 more)

### Community 37 - "namesIn"
Cohesion: 0.14
Nodes (36): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+28 more)

### Community 38 - "probability.ts"
Cohesion: 0.13
Nodes (26): End, Interval, bound(), compileCondition(), ExactScope, fractionNear(), ALL, complement() (+18 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "statsShown.ts"
Cohesion: 0.17
Nodes (31): check(), correlation(), count(), covariance(), Data, dataStatistic(), deviation(), fail() (+23 more)

### Community 41 - "drawScene"
Cohesion: 0.26
Nodes (9): arrowHead(), Coverage, drawScene(), f1(), hex(), linePrims(), nameLabel(), rgb() (+1 more)

### Community 42 - "NotesStore"
Cohesion: 0.15
Nodes (11): newId(), createdAtFromId(), deriveTitle(), NotesStore, hasLocalStorage(), memory, migrateKeyPrefix(), readItem() (+3 more)

### Community 43 - "study.ts"
Cohesion: 0.15
Nodes (34): limit(), breaks(), periodOf(), Asymptote, compiled(), cutsOf(), defined(), domainOf() (+26 more)

### Community 44 - "gauss.ts"
Cohesion: 0.19
Nodes (18): COMPLEX_FUNCTIONS, farthest(), gaussItem(), hasExponential(), inZ(), isComplexLine(), isComplexValue(), isInequality() (+10 more)

### Community 45 - "notes.ts"
Cohesion: 0.13
Nodes (10): Deletion, DeletionLog, isUuid(), Note, noteIdsInBrowser(), RemoteNote, StoreOptions, readJson() (+2 more)

### Community 46 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 47 - "account/space.ts"
Cohesion: 0.25
Nodes (12): accountSpace(), adoptGuestNotes(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf(), setCurrentAccount() (+4 more)

### Community 48 - "engine.ts"
Cohesion: 0.20
Nodes (9): @farscrl/hunspell-wasm, capitalize(), COMMON_FIXES, ELISIONS, inGlossary(), lower(), SpellEngine, GLOSSARY (+1 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.14
Nodes (34): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+26 more)

### Community 50 - "linsys.ts"
Cohesion: 0.13
Nodes (42): choices(), exText(), gcd(), matrixSystem(), minorsGcd(), ONE, parametricRows(), parametricSystem() (+34 more)

### Community 51 - "solve.ts"
Cohesion: 0.17
Nodes (22): LinearScope, isStandardUnknown(), linearSystem(), matrixEquation(), RelOp, equation(), holds(), inequality() (+14 more)

### Community 52 - "search.ts"
Cohesion: 0.17
Nodes (24): editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex() (+16 more)

### Community 53 - "statsGraph.ts"
Cohesion: 0.14
Nodes (19): isTestLine(), number(), testItems(), classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX (+11 more)

### Community 54 - "graphNote.test.ts"
Cohesion: 0.19
Nodes (14): formulaAtCursor(), GraphLabelLines, insertGraphBlock(), FIGURE_PALETTE, containing(), formulaGraphLine(), graphBlockText(), withoutResult() (+6 more)

### Community 55 - "finite.ts"
Cohesion: 0.19
Nodes (26): countOf(), elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError, FiniteResult (+18 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "toolbar.ts"
Cohesion: 0.08
Nodes (22): EditorCallbacks, MarkdownEditor, insertBlock(), InsertOptions, insertTemplate(), toggleLinePrefix(), wrapSelection(), LIST_STYLES (+14 more)

### Community 58 - "Field"
Cohesion: 0.12
Nodes (7): characteristicPolynomial(), eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn()

### Community 59 - "grafo-html.mjs"
Cohesion: 0.17
Nodes (5): graphFile, names, namesFile, root, PNG_ICONS

### Community 60 - "schema/shapes.ts"
Cohesion: 0.09
Nodes (15): @maxgraph/core, ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape (+7 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (24): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+16 more)

### Community 62 - "supabase.ts"
Cohesion: 0.11
Nodes (36): @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken(), ensureSessionOf() (+28 more)

### Community 63 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 64 - "ui/preview.ts"
Cohesion: 0.08
Nodes (24): GraphLabels, GraphLook, remapLineKeys(), renameGraphScope(), renameScopeKeys(), BlockKind, MoveDir, Look (+16 more)

### Community 65 - "limits.ts"
Cohesion: 0.21
Nodes (16): exponentialForm(), fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), alternating() (+8 more)

### Community 66 - "parseSchema"
Cohesion: 0.12
Nodes (26): graphsForFile(), hide(), markdownForFile(), openSchema(), saveSchemaBlock(), findFencedBlocks(), findSchemaBlock(), findSchemaBlocks() (+18 more)

### Community 67 - "MathNode"
Cohesion: 0.12
Nodes (16): GaussLine, Definition, Line, ExactComplexScope, Ode, OdeSystem, withWorkLimit(), Elem (+8 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "Dove sono le cose"
Cohesion: 0.06
Nodes (62): Dove sono le cose, Action, ACTION_NAMES, DOT_SIZES, DrawAction, EraseAction, EraserMode, HANDLE_REACH (+54 more)

### Community 72 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 73 - "blockMove.ts"
Cohesion: 0.08
Nodes (41): @codemirror/commands, @codemirror/state, @codemirror/view, blockMoved, blockMoves(), blockMoveTransaction(), LineMap, guardBlocks() (+33 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (69): definite(), linearIn(), primitive(), verified(), linearCells(), atValues(), cancelLinear(), combine() (+61 more)

### Community 75 - "severalGraph.ts"
Cohesion: 0.54
Nodes (7): criticalLine(), isSeveralLine(), named(), severalItems(), surface(), optimumOf(), severalOf()

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.03
Nodes (93): alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ARROW_NAMES, AT_ICONS (+85 more)

### Community 79 - ".render"
Cohesion: 0.12
Nodes (18): Prefs, BOARD_PALETTES, BoardPalette, BoardTheme, mid(), outlineSvg(), PEN_SIZE, shapeSvg() (+10 more)

### Community 82 - "editor.test.ts"
Cohesion: 0.07
Nodes (30): @lezer/common, closeMathBlockOnEnter(), tabOutOfMath(), CODE_NODES, CommandToken, commandTokenAt(), isInCode(), MATH_NODES (+22 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.20
Nodes (6): centerOf(), clickOn(), ffmpeg, SCENES, SIZE, work

### Community 90 - "Abbonamenti"
Cohesion: 0.14
Nodes (14): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+6 more)

### Community 92 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, Quando lo studente dice di cominciare

### Community 96 - "account-test.mjs"
Cohesion: 0.20
Nodes (4): device(), login(), newContext, waitFor()

### Community 97 - "Il database degli account (Supabase)"
Cohesion: 0.17
Nodes (11): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Nell'app, Note condivise con un link (+3 more)

### Community 100 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

### Community 101 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 102 - "folders.ts"
Cohesion: 0.14
Nodes (13): Folder, FOLDER_NAME_MAX, FolderGroup, groupByFolder(), loadClosedFolders(), RemoteFolder, saveClosedFolders(), NoteMeta (+5 more)

### Community 103 - "editor/editor.ts"
Cohesion: 0.07
Nodes (34): description, name, private, type, version, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/language (+26 more)

### Community 104 - "Sheet"
Cohesion: 0.08
Nodes (28): Mat, readBases(), definitionTarget(), fingerprint(), Sheet, text(), tex(), text() (+20 more)

### Community 105 - "I modelli e le chiavi API"
Cohesion: 0.50
Nodes (4): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), Le idee dello studente (5 ottobre 2026)

### Community 106 - "fake-supabase.mjs"
Cohesion: 0.25
Nodes (6): @electric-sql/pglite, b64(), CODE, GOOGLE_CODE, ROOT, SUPABASE_URL

### Community 107 - "createFakeSupabase"
Cohesion: 0.60
Nodes (6): createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 108 - "files.ts"
Cohesion: 0.12
Nodes (23): cache, capability(), ClaudeRuntime, hostDownloads, HostError, inClaudeViewer(), ModelTier, runtime() (+15 more)

### Community 109 - "Glifo – note per Claude"
Cohesion: 0.29
Nodes (7): Comandi, Come controllare il lavoro, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole, sqlite()

### Community 110 - "page.ts"
Cohesion: 0.05
Nodes (52): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), currentAccount(), PullResult, hydrateGraphs(), openShareDialog() (+44 more)

### Community 113 - "Più avanti"
Cohesion: 0.14
Nodes (14): Abbonamento e funzioni a pagamento (da capire), Account: i propri appunti su ogni dispositivo, anche da condividere, Aiuto con gli esercizi, Altre idee, Calcoli e grafici: idee in più, Idee per il futuro, In programma, La lavagna: idee in più (+6 more)

### Community 116 - "graph/file.ts"
Cohesion: 0.12
Nodes (31): figureName(), graphFigure(), graphImage(), graphImagesFor(), OPEN, swatchSvg(), titleBand(), ACCENTS (+23 more)

### Community 117 - "formatNumber"
Cohesion: 0.12
Nodes (32): decimalSeparator(), Digits, formatNumber(), formatRational(), fromNumber(), fromRational(), SUPERSCRIPT, writeDigits() (+24 more)

### Community 121 - "sync.test.ts"
Cohesion: 0.20
Nodes (8): LocalChange, callAs(), createDatabase(), createUser(), databaseTests(), migrations, shareTests(), device()

### Community 122 - "spell.test.ts"
Cohesion: 0.07
Nodes (27): @codemirror/lang-markdown, noIndentedCode, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close() (+19 more)

### Community 128 - "sidePanel.ts"
Cohesion: 0.11
Nodes (19): templateInsertion(), EditorMathContext, expand(), preferredIndex(), SuggestionController, SuggestionItem, isConfidentAnswer(), CATEGORIES (+11 more)

### Community 129 - "smoke-test.mjs"
Cohesion: 0.29
Nodes (4): playwright-core, vite, firstVisit(), plainContext

## Knowledge Gaps
- **578 isolated node(s):** `session-start.sh script`, `name`, `private`, `version`, `description` (+573 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 800 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **23 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `touchlog.ts`, `parse.ts`, `main.ts`, `odesolve.ts`, `spec.ts`, `several.ts`, `num`, `graph/preview.ts`, `complex.ts`, `svg.ts`, `sheet.ts`, `SchemaEditor`, `Rational`, `MathError`, `numerical.ts`, `markdown.ts`, `Board`, `store.ts`, `linear.ts`, `toLatex`, `assistant.ts`, `h`, `conics.ts`, `Pt`, `view3d.ts`, `distributions.ts`, `logic.ts`, `arithmetic.ts`, `namesIn`, `study.ts`, `gauss.ts`, `notes.ts`, `account/space.ts`, `board/shapes.ts`, `linsys.ts`, `solve.ts`, `graphNote.test.ts`, `finite.ts`, `toolbar.ts`, `supabase.ts`, `ui/preview.ts`, `MathNode`, `blockMove.ts`, `symbolic.ts`, `schema/editor.ts`, `.render`, `Sheet`, `Glifo – note per Claude`, `graph/file.ts`?**
  _High betweenness centrality (0.137) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `touchlog.ts`, `sidePanel.ts`, `main.ts`, `num`, `editor/lists.ts`, `svg.ts`, `sheet.ts`, `MathError`, `markdown.ts`, `store.ts`, `linear.ts`, `assistant.ts`, `h`, `view3d.ts`, `distributions.ts`, `resize.ts`, `notes.ts`, `account/space.ts`, `board/shapes.ts`, `linsys.ts`, `search.ts`, `graphNote.test.ts`, `toolbar.ts`, `supabase.ts`, `ui/preview.ts`, `parseSchema`, `Dove sono le cose`, `blockMove.ts`, `schema/editor.ts`, `.render`, `editor.test.ts`, `folders.ts`, `editor/editor.ts`, `Sheet`, `page.ts`, `sync.test.ts`, `spell.test.ts`, `appleTouch`?**
  _High betweenness centrality (0.110) - this node is a cross-community bridge._
- **Why does `Board` connect `Board` to `main.ts`, `Pt`, `.render`, `Dove sono le cose`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **Are the 140 inferred relationships involving `Dove sono le cose` (e.g. with `adoptGuestNotes()` and `sharedLinks()`) actually correct?**
  _`Dove sono le cose` has 140 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `name`, `private` to the rest of the system?**
  _578 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `touchlog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08653061224489796 - nodes in this community are weakly interconnected._
- **Should `parse.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07905935050391938 - nodes in this community are weakly interconnected._