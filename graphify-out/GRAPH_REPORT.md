# Graph Report - matherdown  (2026-10-05)

## Corpus Check
- 238 files · ~452,562 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 3913 nodes · 13979 edges · 119 communities (98 shown, 21 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 386 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `1c26b7ee`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- touchlog.ts
- parse.ts
- main.ts
- num
- sync.ts
- spec.ts
- arithmetic.ts
- mul
- graph/preview.ts
- view3d.ts
- symbolic.ts
- editor/lists.ts
- svg.ts
- Board
- SchemaEditor
- Rational
- linsys.ts
- MathError
- numerical.ts
- markdown.ts
- index.ts
- engine.ts
- .constructor
- settings.ts
- store.ts
- linear.ts
- toLatex
- assistant.ts
- h
- conics.ts
- board.ts
- graph/space.ts
- distributions.ts
- calcResults.ts
- logic.ts
- gauss.ts
- FoldersStore
- namesIn
- probability.ts
- resize.ts
- statsShown.ts
- .setView
- NotesStore
- study.ts
- complex.ts
- openShareDialog
- editor/editor.ts
- vitest
- files.ts
- ink.ts
- laplace.ts
- solve.ts
- sidePanel.ts
- statsGraph.ts
- strokes.ts
- finite.ts
- 20261004091555_note_condivise.sql
- logo.ts
- Field
- SidePanel
- graph.ts
- dependencies
- supabase.ts
- Più avanti
- schema/preview.ts
- scopeWith
- grafo-html.mjs
- tutorial.ts
- sql.ts
- Benvenuto in Glifo
- compilerOptions
- Sheet
- AccountSync
- createFakeSupabase
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
- fourier.ts
- supabase-stub.sql
- account-test.mjs
- Il database degli account (Supabase)
- Costi
- devDependencies
- notesPanel.ts
- I modelli e le chiavi API
- Le spiegazioni, come funzionano
- fake-supabase.mjs
- Piano per piano
- Glifo – note per Claude
- page.ts
- BoardStore
- La lavagna
- sheet.ts
- Glifo
- spell.test.ts
- severalGraph.ts
- icons.mjs

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
- `Dove sono le cose` --references--> `ConicElements`  [INFERRED]
  CLAUDE.md → src/math/conics.ts
- `Funzionalità` --references--> `k()`  [INFERRED]
  README.md → src/math/numerical.ts
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

## Communities (119 total, 21 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.09
Nodes (26): at(), browserStore, clip(), isSaved(), KINDS, LOG_KEY, LOG_MAX_LINES, LogStore (+18 more)

### Community 1 - "parse.ts"
Cohesion: 0.08
Nodes (37): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe(), differentialInFraction() (+29 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (95): deleteAccount(), ensureSessionOf(), setSharedCopy(), sharedLinks(), shareNote(), unshareNote(), addToGraphBlock(), graphsForFile() (+87 more)

### Community 3 - "num"
Cohesion: 0.08
Nodes (84): linearIn(), termTransform(), addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled() (+76 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (38): @electric-sql/pglite, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+30 more)

### Community 5 - "spec.ts"
Cohesion: 0.06
Nodes (80): formulaAtCursor(), GraphLabelLines, insertGraphBlock(), setGraphLabels(), conicItems(), isConicLine(), quadricEquation(), isTestLine() (+72 more)

### Community 6 - "arithmetic.ts"
Cohesion: 0.06
Nodes (98): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+90 more)

### Community 7 - "mul"
Cohesion: 0.15
Nodes (71): atIntegers(), signsUp(), symbolicCoefficient(), withoutAbs(), polyEx(), similarSolution(), algebraic(), bigGcd() (+63 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (44): addLabel(), boxes, cameras, complexCoord(), coord(), drawings, drawnViews, endTex() (+36 more)

### Community 9 - "view3d.ts"
Cohesion: 0.05
Nodes (70): FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsFromFile(), OPEN, swatchSvg() (+62 more)

### Community 10 - "symbolic.ts"
Cohesion: 0.06
Nodes (66): primitive(), verified(), atValues(), cancelLinear(), combine(), commonMonomial(), Converter, coordinates() (+58 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.09
Nodes (61): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+53 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (52): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseWindow(), chooseY(), clipLines(), domainEdge() (+44 more)

### Community 13 - "Board"
Cohesion: 0.13
Nodes (3): Board, penErases(), BoardTheme

### Community 14 - "SchemaEditor"
Cohesion: 0.09
Nodes (10): SchemaEditor, cellText(), edgeLook(), nodeLook(), nodeStyle(), readSchema(), restyle(), EdgeLook (+2 more)

### Community 15 - "Rational"
Cohesion: 0.10
Nodes (23): Part, expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactRandom, exactRoot() (+15 more)

### Community 16 - "linsys.ts"
Cohesion: 0.15
Nodes (40): choices(), gcd(), matrixEquation(), matrixSystem(), minorsGcd(), ONE, parametricRows(), parametricSystem() (+32 more)

### Community 17 - "MathError"
Cohesion: 0.08
Nodes (50): fourierItems(), isFourierLine(), argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot() (+42 more)

### Community 18 - "numerical.ts"
Cohesion: 0.11
Nodes (50): isNumericalLine(), numericalItems(), bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint() (+42 more)

### Community 19 - "markdown.ts"
Cohesion: 0.10
Nodes (35): checkHtml(), checkTitle(), cache, cleanKatexError(), escapeHtml(), renderTex(), renderTexMathml(), renderTexOrError() (+27 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (42): b, bigops, c, calculus, fn, fr, fractions, functions (+34 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - ".constructor"
Cohesion: 0.13
Nodes (7): BoardOptions, loadPrefs(), Prefs, sizeChoice(), highlightName(), inkName(), SizeChoice

### Community 23 - "settings.ts"
Cohesion: 0.13
Nodes (22): applySpellcheck(), setPersonalWords(), wordsChangedHere(), addPersonalWord(), DICTIONARY_KEY, loadPersonalWords(), savePersonalWords(), tidy() (+14 more)

### Community 24 - "store.ts"
Cohesion: 0.10
Nodes (17): BoardPalette, BackupBoard, BoardBackend, done(), fromRecord(), IdbBoards, ofNote(), openBoardDatabase() (+9 more)

### Community 25 - "linear.ts"
Cohesion: 0.10
Nodes (63): angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, dataOf(), degreesText() (+55 more)

### Community 26 - "toLatex"
Cohesion: 0.08
Nodes (48): areaFor(), condLabel(), isStraight(), isVectorName(), itemFor(), multipleLabel(), planeRegionFor(), restrict() (+40 more)

### Community 27 - "assistant.ts"
Cohesion: 0.13
Nodes (21): @anthropic-ai/sdk, AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible() (+13 more)

### Community 28 - "h"
Cohesion: 0.08
Nodes (44): SyncStatus, board, viewSwitch, openSignedOut(), printButton(), ShareDialogDeps, DEFAULT_SETTINGS, Settings (+36 more)

### Community 29 - "conics.ts"
Cohesion: 0.18
Nodes (29): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+21 more)

### Community 30 - "board.ts"
Cohesion: 0.09
Nodes (27): Action, ACTION_NAMES, DOT_SIZES, DrawAction, EraseAction, EraserMode, Finger, ICON (+19 more)

### Community 31 - "graph/space.ts"
Cohesion: 0.10
Nodes (52): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+44 more)

### Community 32 - "distributions.ts"
Cohesion: 0.06
Nodes (63): number(), addExp(), choose(), continuousQuantile(), discreteQuantile(), Distribution, exactIntervalProbability(), factorialBig() (+55 more)

### Community 33 - "calcResults.ts"
Cohesion: 0.11
Nodes (14): acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult, calcResults(), CheckWidget, formulasUntil() (+6 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "gauss.ts"
Cohesion: 0.16
Nodes (20): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexLine(), isComplexValue() (+12 more)

### Community 36 - "FoldersStore"
Cohesion: 0.20
Nodes (3): cleanFolderName(), FoldersStore, sameName()

### Community 37 - "namesIn"
Cohesion: 0.11
Nodes (40): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+32 more)

### Community 38 - "probability.ts"
Cohesion: 0.11
Nodes (25): End, CompileOptions, ExactScope, RelOp, ALL, compileOf(), complement(), distributionOf() (+17 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "statsShown.ts"
Cohesion: 0.18
Nodes (30): check(), correlation(), count(), covariance(), Data, dataStatistic(), deviation(), fail() (+22 more)

### Community 41 - ".setView"
Cohesion: 0.27
Nodes (3): clampZoom(), coalesced(), validView()

### Community 42 - "NotesStore"
Cohesion: 0.07
Nodes (37): accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf() (+29 more)

### Community 43 - "study.ts"
Cohesion: 0.10
Nodes (44): close(), Definite, definiteIntegral(), exValue(), samples(), EMPTY_SCOPE, Piece, limit() (+36 more)

### Community 44 - "complex.ts"
Cohesion: 0.08
Nodes (47): add(), allRoots(), arg(), asin(), atan(), compileApply(), compileComplex(), compileFunction() (+39 more)

### Community 45 - "openShareDialog"
Cohesion: 0.19
Nodes (13): openShareDialog(), changeAccess(), changeCopy(), copy(), refreshChanged(), render(), run(), setStatus() (+5 more)

### Community 46 - "editor/editor.ts"
Cohesion: 0.05
Nodes (46): description, name, private, type, version, @codemirror/autocomplete, @codemirror/commands, @codemirror/language (+38 more)

### Community 47 - "vitest"
Cohesion: 0.07
Nodes (31): vitest, staticGraphSvg(), specFor(), chooseBox(), GraphItem, parseGraph(), DrawOptions, PALETTES (+23 more)

### Community 48 - "files.ts"
Cohesion: 0.11
Nodes (23): cache, capability(), ClaudeRuntime, hostDownloads, HostError, hostSample, inClaudeViewer(), ModelTier (+15 more)

### Community 49 - "ink.ts"
Cohesion: 0.22
Nodes (9): BOARD_PALETTES, mid(), outlineSvg(), PEN_SIZE, strokeOptions(), strokeOutline(), TOOL_SIZES, HIGHLIGHT_COLORS (+1 more)

### Community 50 - "laplace.ts"
Cohesion: 0.15
Nodes (32): factoredPolynomial(), polynomialOf(), oneFraction(), beyondPoles(), compiled(), E, exp(), fractionShown() (+24 more)

### Community 51 - "solve.ts"
Cohesion: 0.09
Nodes (46): exponentialForm(), fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), decimalSeparator() (+38 more)

### Community 52 - "sidePanel.ts"
Cohesion: 0.08
Nodes (40): EditorMathContext, expand(), preferredIndex(), SuggestionController, SuggestionItem, editDistance(), normalizeText(), stem() (+32 more)

### Community 53 - "statsGraph.ts"
Cohesion: 0.28
Nodes (11): classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX, Line, number(), pmfBars() (+3 more)

### Community 54 - "strokes.ts"
Cohesion: 0.18
Nodes (18): between(), Box, boxesTouch(), capsuleSpan(), circleSpan(), compareStrokes(), eraserGrowth(), eraseStroke() (+10 more)

### Community 55 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "logo.ts"
Cohesion: 0.33
Nodes (6): sidebarToggle(), BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark()

### Community 58 - "Field"
Cohesion: 0.12
Nodes (7): eigenvalues(), evaluateLinear(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn()

### Community 59 - "SidePanel"
Cohesion: 0.24
Nodes (4): isConfidentAnswer(), displayCode(), preventFocusSteal(), SidePanel

### Community 60 - "graph.ts"
Cohesion: 0.05
Nodes (38): @maxgraph/core, AT_X, cellHtml(), COMPASS, createEdgeCell(), createGraph(), drawSchema(), edgeStyle() (+30 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (24): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+16 more)

### Community 62 - "supabase.ts"
Cohesion: 0.15
Nodes (20): @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), emailLinkToken(), loadClient(), loginDetails() (+12 more)

### Community 63 - "Più avanti"
Cohesion: 0.14
Nodes (14): Abbonamento e funzioni a pagamento (da capire), Account: i propri appunti su ogni dispositivo, anche da condividere, Aiuto con gli esercizi, Altre idee, Calcoli e grafici: idee in più, Idee per il futuro, In programma, La lavagna: idee in più (+6 more)

### Community 64 - "schema/preview.ts"
Cohesion: 0.15
Nodes (13): GraphLabels, Look, Theme, draw(), drawCached(), drawn, errorHtml(), fill() (+5 more)

### Community 65 - "scopeWith"
Cohesion: 0.08
Nodes (52): constantIntegrand(), inequalityMargin(), integralRegion, LayeredSolid, planeMargin(), radiusOf(), spaceLayers(), spaceMargin() (+44 more)

### Community 66 - "grafo-html.mjs"
Cohesion: 0.25
Nodes (4): graphFile, names, namesFile, root

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

### Community 71 - "Sheet"
Cohesion: 0.06
Nodes (46): Dove sono le cose, Ode, FiniteContext, differentialRequest, pieces(), MathNode, bracketParts(), chainOf() (+38 more)

### Community 73 - "createFakeSupabase"
Cohesion: 0.60
Nodes (6): createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 75 - "toolbar.ts"
Cohesion: 0.11
Nodes (17): closeMathBlockOnEnter(), EditorCallbacks, MarkdownEditor, tabOutOfMath(), insertBlock(), insertTemplate(), wrapSelection(), Action (+9 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.04
Nodes (91): alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ARROW_NAMES, AT_ICONS (+83 more)

### Community 79 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 82 - "editor.test.ts"
Cohesion: 0.05
Nodes (44): @codemirror/state, @codemirror/view, InsertOptions, templateInsertion(), toggleLinePrefix(), LIST_STYLES, CODE_NODES, CommandToken (+36 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.20
Nodes (6): centerOf(), clickOn(), ffmpeg, SCENES, SIZE, work

### Community 90 - "Abbonamenti"
Cohesion: 0.14
Nodes (14): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+6 more)

### Community 92 - "fourier.ts"
Cohesion: 0.31
Nodes (12): absOf(), boundsOf(), close(), definite(), fourierProblem, fourierShown(), isTrig(), isZero() (+4 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.20
Nodes (4): device(), login(), newContext, waitFor()

### Community 97 - "Il database degli account (Supabase)"
Cohesion: 0.17
Nodes (11): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Nell'app, Note condivise con un link (+3 more)

### Community 98 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, Quando lo studente dice di cominciare

### Community 101 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

### Community 102 - "notesPanel.ts"
Cohesion: 0.14
Nodes (12): Folder, FolderGroup, groupByFolder(), loadClosedFolders(), saveClosedFolders(), Note, NoteMeta, clear() (+4 more)

### Community 103 - "I modelli e le chiavi API"
Cohesion: 0.50
Nodes (4): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), Le idee dello studente (5 ottobre 2026)

### Community 105 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 106 - "fake-supabase.mjs"
Cohesion: 0.29
Nodes (5): b64(), CODE, GOOGLE_CODE, ROOT, SUPABASE_URL

### Community 107 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 109 - "Glifo – note per Claude"
Cohesion: 0.29
Nodes (7): Comandi, Come controllare il lavoro, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole, sqlite()

### Community 110 - "page.ts"
Cohesion: 0.10
Nodes (29): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), PullResult, hydrateGraphs(), isShareToken(), parseSharedNote() (+21 more)

### Community 113 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 117 - "sheet.ts"
Cohesion: 0.06
Nodes (55): OdeFunction, expSumValue(), withWorkLimit(), ExactFunction, formatRational(), FormattedResult, fromRational(), characteristicPolynomial() (+47 more)

### Community 121 - "Glifo"
Cohesion: 0.15
Nodes (13): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Funzionalità (+5 more)

### Community 122 - "spell.test.ts"
Cohesion: 0.07
Nodes (28): @codemirror/lang-markdown, noIndentedCode, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close() (+20 more)

### Community 123 - "severalGraph.ts"
Cohesion: 0.54
Nodes (7): criticalLine(), isSeveralLine(), named(), severalItems(), surface(), optimumOf(), severalOf()

## Knowledge Gaps
- **567 isolated node(s):** `session-start.sh script`, `name`, `private`, `version`, `description` (+562 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 775 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **21 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `touchlog.ts`, `main.ts`, `sync.ts`, `mul`, `view3d.ts`, `editor/lists.ts`, `svg.ts`, `markdown.ts`, `settings.ts`, `store.ts`, `linear.ts`, `assistant.ts`, `h`, `board.ts`, `graph/space.ts`, `distributions.ts`, `resize.ts`, `NotesStore`, `editor/editor.ts`, `ink.ts`, `sidePanel.ts`, `strokes.ts`, `logo.ts`, `supabase.ts`, `scopeWith`, `tutorial.ts`, `Sheet`, `schema/editor.ts`, `editor.test.ts`, `notesPanel.ts`, `page.ts`, `spell.test.ts`?**
  _High betweenness centrality (0.139) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `Sheet` to `touchlog.ts`, `parse.ts`, `main.ts`, `num`, `spec.ts`, `arithmetic.ts`, `mul`, `graph/preview.ts`, `view3d.ts`, `symbolic.ts`, `svg.ts`, `Rational`, `linsys.ts`, `MathError`, `numerical.ts`, `markdown.ts`, `settings.ts`, `linear.ts`, `toLatex`, `assistant.ts`, `conics.ts`, `graph/space.ts`, `distributions.ts`, `logic.ts`, `gauss.ts`, `namesIn`, `NotesStore`, `study.ts`, `complex.ts`, `solve.ts`, `strokes.ts`, `finite.ts`, `logo.ts`, `schema/preview.ts`, `tutorial.ts`, `.exportBoards`, `schema/editor.ts`, `fourier.ts`, `Glifo – note per Claude`, `BoardStore`, `sheet.ts`?**
  _High betweenness centrality (0.095) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `schema/preview.ts`, `main.ts`, `tutorial.ts`, `notesPanel.ts`, `resize.ts`, `graph/preview.ts`, `toolbar.ts`, `openShareDialog`, `schema/editor.ts`, `SchemaEditor`, `files.ts`, `page.ts`, `sidePanel.ts`, `.constructor`, `logo.ts`, `spell.test.ts`, `SidePanel`, `board.ts`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **What connects `session-start.sh script`, `name`, `private` to the rest of the system?**
  _567 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `touchlog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08653061224489796 - nodes in this community are weakly interconnected._
- **Should `parse.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08087891538101917 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04424943988050784 - nodes in this community are weakly interconnected._