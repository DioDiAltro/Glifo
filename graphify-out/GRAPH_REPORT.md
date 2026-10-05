# Graph Report - matherdown  (2026-10-05)

## Corpus Check
- 219 files · ~407,324 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 3517 nodes · 12768 edges · 114 communities (97 shown, 17 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 339 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f676da8b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- solve.ts
- parse.ts
- main.ts
- num
- sync.ts
- spec.ts
- arithmetic.ts
- primitive.ts
- graph/preview.ts
- schema/editor.ts
- symbolic.ts
- sheet.ts
- svg.ts
- linsys.ts
- SchemaEditor
- editor/lists.ts
- graph/space.ts
- compile
- numerical.ts
- FoldersStore
- index.ts
- engine.ts
- Rational
- .renderFormat
- several.ts
- MathError
- h
- assistant.ts
- settings.ts
- conics.ts
- formatNumber
- view3d.ts
- distributions.ts
- markdown.ts
- logic.ts
- MathNode
- graphNote.test.ts
- namesIn
- gauss.ts
- resize.ts
- statsShown.ts
- toLatex
- NotesStore
- study.ts
- sidePanel.ts
- compileComplex
- probability.ts
- complex.ts
- devDependencies
- spell.test.ts
- limits.ts
- evaluateExactComplex
- search.ts
- graph/file.ts
- files.ts
- finite.ts
- 20261004091555_note_condivise.sql
- toolbar.ts
- Field
- SidePanel
- graph.ts
- dependencies
- page.ts
- openShareDialog
- schema/preview.ts
- graphInsert.ts
- mathContext.ts
- picture.ts
- templates.ts
- Benvenuto in Glifo
- compilerOptions
- editor/editor.ts
- SuggestionController
- statsGraph.ts
- severalGraph.ts
- MarkdownEditor
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- parseSchema
- Ex
- session-start.sh
- .claude/CLAUDE.md
- UndefinedName
- tutorial.mjs
- Abbonamenti
- .openSql
- tidy
- supabase-stub.sql
- account-test.mjs
- Il database degli account (Supabase)
- Più avanti
- smoke-test.mjs
- grafo-html.mjs
- logo.ts
- I modelli e le chiavi API
- study.test.ts
- Le spiegazioni, come funzionano
- fake-supabase.mjs
- Piano per piano
- icons.mjs
- Glifo – note per Claude
- Idee per il futuro
- createFakeSupabase
- La lavagna

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
- `Dove sono le cose` --references--> `Converter`  [INFERRED]
  CLAUDE.md → src/math/symbolic.ts
- `Dove sono le cose` --references--> `NumericContext`  [INFERRED]
  CLAUDE.md → src/math/numerical.ts
- `Dove sono le cose` --references--> `expSum`  [INFERRED]
  CLAUDE.md → src/math/distributions.ts
- `Dove sono le cose` --references--> `Wave`  [INFERRED]
  CLAUDE.md → src/math/odesolve.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (114 total, 17 thin omitted)

### Community 0 - "solve.ts"
Cohesion: 0.15
Nodes (28): LinearScope, polynomialIn(), isStandardUnknown(), linearSystem(), matrixEquation(), endAt(), scanSet(), breaks() (+20 more)

### Community 1 - "parse.ts"
Cohesion: 0.08
Nodes (38): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe(), differentialInFraction() (+30 more)

### Community 2 - "main.ts"
Cohesion: 0.05
Nodes (81): unshareNote(), account, accountButton, accountProblem(), active, app, applyAccountChange(), applySpellcheck() (+73 more)

### Community 3 - "num"
Cohesion: 0.08
Nodes (83): polyEx(), addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames() (+75 more)

### Community 4 - "sync.ts"
Cohesion: 0.05
Nodes (38): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+30 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (101): isComplexLine(), onlyComplex(), constantIntegrand(), depth(), inequalityMargin(), integralRegion, LayeredSolid, Multiple (+93 more)

### Community 6 - "arithmetic.ts"
Cohesion: 0.11
Nodes (41): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+33 more)

### Community 7 - "primitive.ts"
Cohesion: 0.17
Nodes (59): algebraic(), bigGcd(), byParts(), candidates(), canon(), combineLogs(), compareKeys(), distribute() (+51 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (40): addLabel(), boxes, cameras, complexCoord(), coord(), drawings, drawnViews, endTex() (+32 more)

### Community 9 - "schema/editor.ts"
Cohesion: 0.05
Nodes (64): alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ARROW_NAMES, AT_ICONS (+56 more)

### Community 10 - "symbolic.ts"
Cohesion: 0.06
Nodes (78): linearIn(), letters(), valueAt(), primitive(), verified(), atValues(), combine(), commonMonomial() (+70 more)

### Community 11 - "sheet.ts"
Cohesion: 0.09
Nodes (27): Dove sono le cose, isTestLine(), number(), testItems(), isNumericalLine(), numericalItems(), Ode, OdeFunction (+19 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (55): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseWindow(), chooseY(), clipLines(), domainEdge() (+47 more)

### Community 13 - "linsys.ts"
Cohesion: 0.13
Nodes (42): choices(), gcd(), matrixSystem(), minorsGcd(), ONE, parametricRows(), parametricSystem(), PARAMS (+34 more)

### Community 15 - "editor/lists.ts"
Cohesion: 0.10
Nodes (56): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+48 more)

### Community 16 - "graph/space.ts"
Cohesion: 0.12
Nodes (42): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+34 more)

### Community 17 - "compile"
Cohesion: 0.06
Nodes (69): argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot(), fieldOn(), numericPartials() (+61 more)

### Community 18 - "numerical.ts"
Cohesion: 0.08
Nodes (60): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Funzionalità (+52 more)

### Community 19 - "FoldersStore"
Cohesion: 0.07
Nodes (22): Deletion, cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder(), loadClosedFolders() (+14 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (41): b, bigops, c, calculus, fn, fr, fractions, functions (+33 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "Rational"
Cohesion: 0.11
Nodes (23): expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactRandom, exactRoot(), factorialExact() (+15 more)

### Community 23 - ".renderFormat"
Cohesion: 0.13
Nodes (16): fieldInput(), textWidth(), createEdgeCell(), edgeLook(), edgeStyle(), edgeTextAt(), isEdgeLook(), isNodeLook() (+8 more)

### Community 24 - "several.ts"
Cohesion: 0.15
Nodes (35): severalLimit, at(), bounded(), Candidate, candidates(), compiled(), COORDS, coordShown() (+27 more)

### Community 25 - "MathError"
Cohesion: 0.13
Nodes (56): MathError, angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, dataOf() (+48 more)

### Community 26 - "h"
Cohesion: 0.07
Nodes (45): SyncStatus, helpButton, openGuide(), viewSwitch, openSignedOut(), printButton(), ShareDialogDeps, Settings (+37 more)

### Community 27 - "assistant.ts"
Cohesion: 0.11
Nodes (21): @anthropic-ai/sdk, AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askThroughHost() (+13 more)

### Community 28 - "settings.ts"
Cohesion: 0.09
Nodes (28): DeletionLog, addPersonalWord(), DICTIONARY_KEY, loadPersonalWords(), savePersonalWords(), tidy(), ACCOUNT_SETTINGS, accountSettings() (+20 more)

### Community 29 - "conics.ts"
Cohesion: 0.18
Nodes (29): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+21 more)

### Community 30 - "formatNumber"
Cohesion: 0.11
Nodes (34): decimalSeparator(), Digits, formatNumber(), FormatOptions, formatRational(), fromNumber(), fromRational(), SUPERSCRIPT (+26 more)

### Community 31 - "view3d.ts"
Cohesion: 0.09
Nodes (43): Face, lerp(), planeSide(), planeTolerance(), regionFaces(), splitFace(), splitLine(), splitPolygon() (+35 more)

### Community 32 - "distributions.ts"
Cohesion: 0.07
Nodes (60): addExp(), choose(), continuousQuantile(), discreteQuantile(), Distribution, exactIntervalProbability(), factorialBig(), FAMILIES (+52 more)

### Community 33 - "markdown.ts"
Cohesion: 0.10
Nodes (37): bulletGroup(), sameList(), cache, escapeHtml(), renderTexMathml(), renderTexOrError(), renderTexWithResult(), TexRender (+29 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "MathNode"
Cohesion: 0.10
Nodes (28): ExactComplexScope, withWorkLimit(), FormattedResult, MathNode, parseCached(), Sheet, splitPieces(), styleOf() (+20 more)

### Community 36 - "graphNote.test.ts"
Cohesion: 0.07
Nodes (28): @codemirror/state, templateInsertion(), addPlaceholders, buildDecorations(), clearAllPlaceholders(), clearPlaceholders, CommandTarget, contains() (+20 more)

### Community 37 - "namesIn"
Cohesion: 0.13
Nodes (38): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+30 more)

### Community 38 - "gauss.ts"
Cohesion: 0.15
Nodes (20): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), isComplexValue(), isInequality(), isSegmentNode() (+12 more)

### Community 39 - "resize.ts"
Cohesion: 0.13
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "statsShown.ts"
Cohesion: 0.17
Nodes (31): Lin, check(), correlation(), count(), covariance(), Data, dataStatistic(), deviation() (+23 more)

### Community 41 - "toLatex"
Cohesion: 0.05
Nodes (63): vitest, conicItems(), isConicLine(), quadricEquation(), formulaGraph(), GraphItem, parseGraph(), PALETTES (+55 more)

### Community 42 - "NotesStore"
Cohesion: 0.10
Nodes (25): accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf() (+17 more)

### Community 43 - "study.ts"
Cohesion: 0.16
Nodes (33): nameLatex(), limit(), Asymptote, compiled(), cutsOf(), defined(), domainOf(), exact() (+25 more)

### Community 44 - "sidePanel.ts"
Cohesion: 0.21
Nodes (15): expand(), preferredIndex(), SuggestionItem, CATEGORIES, cardPreviewTex(), formPreviewTex(), ParsedTemplate, parseTemplate() (+7 more)

### Community 45 - "compileComplex"
Cohesion: 0.25
Nodes (13): inZ(), asin(), atan(), compileApply(), compileComplex(), compileFunction(), complexScopeWith(), log() (+5 more)

### Community 46 - "probability.ts"
Cohesion: 0.12
Nodes (24): End, CompileOptions, ExactScope, RelOp, ALL, compileOf(), complement(), distributionOf() (+16 more)

### Community 47 - "complex.ts"
Cohesion: 0.11
Nodes (21): add(), ComplexCompiled, cos(), cosh(), EMPTY_COMPLEX_SCOPE, exp(), formatComplex(), formatGauss() (+13 more)

### Community 48 - "devDependencies"
Cohesion: 0.11
Nodes (17): devDependencies, @electric-sql/pglite, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite, vite-plugin-pwa (+9 more)

### Community 49 - "spell.test.ts"
Cohesion: 0.08
Nodes (23): @codemirror/lang-markdown, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt() (+15 more)

### Community 50 - "limits.ts"
Cohesion: 0.21
Nodes (16): exponentialForm(), fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), alternating() (+8 more)

### Community 51 - "evaluateExactComplex"
Cohesion: 0.17
Nodes (11): evaluateExactComplex(), exactSqrt(), GaussRational, unavailable(), ExactUnavailable, factorial(), similar(), slope() (+3 more)

### Community 52 - "search.ts"
Cohesion: 0.17
Nodes (24): editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex() (+16 more)

### Community 53 - "graph/file.ts"
Cohesion: 0.29
Nodes (11): graphImage(), graphImagesFor(), graphsForFile(), graphsFromFile(), hide(), OPEN, unhide(), areaColor() (+3 more)

### Community 54 - "files.ts"
Cohesion: 0.27
Nodes (11): inClaudeViewer(), canWriteFilesDirectly(), FsWindow, isAbort(), MD_TYPES, OpenedFile, openMarkdownFiles(), PickerType (+3 more)

### Community 55 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "toolbar.ts"
Cohesion: 0.10
Nodes (27): @codemirror/view, insertBlock(), InsertOptions, toggleLinePrefix(), wrapSelection(), besideSchema(), guardBlocks(), schemaBlockRanges() (+19 more)

### Community 58 - "Field"
Cohesion: 0.11
Nodes (5): eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat()

### Community 59 - "SidePanel"
Cohesion: 0.22
Nodes (6): cleanKatexError(), renderTex(), isConfidentAnswer(), symbolsInCategory(), preventFocusSteal(), SidePanel

### Community 60 - "graph.ts"
Cohesion: 0.07
Nodes (30): @maxgraph/core, AT_X, cellHtml(), cellText(), COMPASS, createGraph(), drawSchema(), insertSchema() (+22 more)

### Community 61 - "dependencies"
Cohesion: 0.09
Nodes (23): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+15 more)

### Community 62 - "page.ts"
Cohesion: 0.06
Nodes (54): katex, @supabase/supabase-js, AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), accountError, appUrl() (+46 more)

### Community 63 - "openShareDialog"
Cohesion: 0.19
Nodes (14): openShareDialog(), changeAccess(), changeCopy(), copy(), refreshChanged(), render(), run(), setStatus() (+6 more)

### Community 64 - "schema/preview.ts"
Cohesion: 0.14
Nodes (14): GraphLook, Look, SchemaError, Theme, draw(), drawCached(), drawn, errorHtml() (+6 more)

### Community 65 - "graphInsert.ts"
Cohesion: 0.29
Nodes (10): sheetBefore(), addToGraphBlock(), formulaAtCursor(), insertGraphBlock(), mathRegionAt(), blockLines(), graphBlockText(), graphNames() (+2 more)

### Community 66 - "mathContext.ts"
Cohesion: 0.11
Nodes (18): @lezer/common, acceptCalcResult(), calcPlugin, CalcResult, calcResults(), formulasUntil(), insertResult(), ResultWidget (+10 more)

### Community 67 - "picture.ts"
Cohesion: 0.25
Nodes (8): staticGraphSvg(), chooseBox(), GraphSpec, DrawOptions, Palette, DEFAULT_CAMERA, Quality, light

### Community 68 - "templates.ts"
Cohesion: 0.08
Nodes (32): SchemaEditorOptions, Schema, SchemaEdge, SchemaNode, Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey (+24 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "editor/editor.ts"
Cohesion: 0.06
Nodes (35): description, name, private, type, version, @codemirror/autocomplete, @codemirror/commands, @codemirror/language (+27 more)

### Community 73 - "statsGraph.ts"
Cohesion: 0.25
Nodes (12): classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX, Line, number(), pmfBars() (+4 more)

### Community 74 - "severalGraph.ts"
Cohesion: 0.17
Nodes (17): FieldContext, fourierItems(), isFourierLine(), criticalLine(), isSeveralLine(), named(), severalItems(), surface() (+9 more)

### Community 75 - "MarkdownEditor"
Cohesion: 0.20
Nodes (4): closeMathBlockOnEnter(), EditorCallbacks, MarkdownEditor, insertTemplate()

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "parseSchema"
Cohesion: 0.18
Nodes (14): base64(), hide(), OPEN, schemasForFile(), schemasFromFile(), unhide(), isRecord(), num() (+6 more)

### Community 79 - "Ex"
Cohesion: 0.18
Nodes (11): Piece, Condition, Family, Group, Root, Shape, Constraint, Coord (+3 more)

### Community 82 - "UndefinedName"
Cohesion: 0.29
Nodes (5): compileName(), conjugateOf(), constant(), nameLabel(), UndefinedName

### Community 83 - "tutorial.mjs"
Cohesion: 0.20
Nodes (6): centerOf(), clickOn(), ffmpeg, SCENES, SIZE, work

### Community 90 - "Abbonamenti"
Cohesion: 0.14
Nodes (14): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+6 more)

### Community 91 - ".openSql"
Cohesion: 0.47
Nodes (4): loadDialect(), downloadBlob(), downloadText(), fileNameFor()

### Community 92 - "tidy"
Cohesion: 0.08
Nodes (72): factoredPolynomial(), numShown(), polynomialOf(), polyShown(), ruffiniShown(), EMPTY_SCOPE, absOf(), atIntegers() (+64 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.20
Nodes (4): device(), login(), newContext, waitFor()

### Community 97 - "Il database degli account (Supabase)"
Cohesion: 0.17
Nodes (11): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Nell'app, Note condivise con un link (+3 more)

### Community 98 - "Più avanti"
Cohesion: 0.22
Nodes (9): Abbonamento e funzioni a pagamento (da capire), Aiuto con gli esercizi, Calcoli e grafici: idee in più, Matematica per i corsi: idee in più, Non solo appunti, Più avanti, Schemi: idee in più, Trascrizione delle lezioni in appunti (+1 more)

### Community 100 - "smoke-test.mjs"
Cohesion: 0.29
Nodes (4): markdown-it, vite, firstVisit(), plainContext

### Community 101 - "grafo-html.mjs"
Cohesion: 0.22
Nodes (4): graphFile, names, namesFile, root

### Community 102 - "logo.ts"
Cohesion: 0.39
Nodes (5): BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark()

### Community 103 - "I modelli e le chiavi API"
Cohesion: 0.50
Nodes (4): Da decidere, I modelli e le chiavi API, Il parere di Claude (niente di deciso), Le idee dello studente (5 ottobre 2026)

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

### Community 110 - "Idee per il futuro"
Cohesion: 0.33
Nodes (6): Account: i propri appunti su ogni dispositivo, anche da condividere, Altre idee, Controllare e mostrare quello che si scrive, Idee per il futuro, In programma, La lavagna (si comincia quando lo dice lo studente)

### Community 111 - "createFakeSupabase"
Cohesion: 0.60
Nodes (6): createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 113 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (proposta, da costruire quando lo dice lo studente)

## Knowledge Gaps
- **523 isolated node(s):** `Deciso`, `Com'è andata la discussione`, `La proposta dello studente (4 ottobre 2026)`, `Il parere di Claude, in breve`, `Come si decide cosa far pagare` (+518 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 696 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `toLatex` to `main.ts`, `sync.ts`, `schema/editor.ts`, `svg.ts`, `linsys.ts`, `editor/lists.ts`, `FoldersStore`, `h`, `assistant.ts`, `settings.ts`, `view3d.ts`, `distributions.ts`, `graphNote.test.ts`, `resize.ts`, `NotesStore`, `sidePanel.ts`, `spell.test.ts`, `search.ts`, `toolbar.ts`, `page.ts`, `picture.ts`, `templates.ts`, `editor/editor.ts`, `parseSchema`, `logo.ts`, `study.test.ts`?**
  _High betweenness centrality (0.118) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `sheet.ts` to `solve.ts`, `parse.ts`, `main.ts`, `num`, `spec.ts`, `arithmetic.ts`, `primitive.ts`, `graph/preview.ts`, `schema/editor.ts`, `symbolic.ts`, `svg.ts`, `linsys.ts`, `graph/space.ts`, `compile`, `numerical.ts`, `Rational`, `.renderFormat`, `several.ts`, `MathError`, `h`, `conics.ts`, `distributions.ts`, `logic.ts`, `MathNode`, `graphNote.test.ts`, `namesIn`, `study.ts`, `compileComplex`, `limits.ts`, `evaluateExactComplex`, `finite.ts`, `graph.ts`, `page.ts`, `schema/preview.ts`, `graphInsert.ts`, `severalGraph.ts`, `Ex`, `tidy`, `Glifo – note per Claude`?**
  _High betweenness centrality (0.084) - this node is a cross-community bridge._
- **Why does `Glifo – note per Claude` connect `Glifo – note per Claude` to `ROADMAP.md`, `sheet.ts`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **What connects `Deciso`, `Com'è andata la discussione`, `La proposta dello studente (4 ottobre 2026)` to the rest of the system?**
  _523 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `solve.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.14942528735632185 - nodes in this community are weakly interconnected._
- **Should `parse.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07719298245614035 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05143570536828964 - nodes in this community are weakly interconnected._