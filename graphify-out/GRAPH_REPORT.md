# Graph Report - matherdown  (2026-10-04)

## Corpus Check
- 218 files · ~393,348 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 3449 nodes · 12506 edges · 107 communities (94 shown, 13 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 327 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e7712570`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- formatNumber
- parse.ts
- main.ts
- odesolve.ts
- sync.ts
- spec.ts
- toLatex
- num
- graph/preview.ts
- schema/editor.ts
- symbolic.ts
- account.ts
- svg.ts
- linsys.ts
- SchemaEditor
- vitest
- graph/space.ts
- evaluate.ts
- numerical.ts
- FoldersStore
- index.ts
- engine.ts
- Rational
- conics.ts
- several.ts
- MathError
- settings.ts
- assistant.ts
- spell.test.ts
- fake-supabase.mjs
- spaces.ts
- view3d.ts
- compile
- markdown.ts
- logic.ts
- editor/editor.ts
- editor.test.ts
- namesIn
- h
- resize.ts
- sheet.ts
- graphNote.test.ts
- NotesStore
- study.ts
- graph.ts
- supabase.ts
- probability.ts
- complex.ts
- distributions.ts
- toolbar.ts
- page.ts
- calcResults.ts
- search.ts
- editor/lists.ts
- domain.ts
- latex.ts
- 20261004091555_note_condivise.sql
- insert.ts
- Field
- SidePanel
- shapes.ts
- dependencies
- schema/preview.ts
- MathNode
- regions.ts
- laplace.ts
- suggestions.ts
- tutorial.mjs
- sql.ts
- Benvenuto in Glifo
- compilerOptions
- multiple.test.ts
- spellcheck
- nameLatex
- Glifo
- Il database degli account (Supabase)
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/file.ts
- Glifo – note per Claude
- session-start.sh
- .claude/CLAUDE.md
- Più avanti
- files.ts
- integrate
- render/lists.ts
- logo.ts
- supabase-stub.sql
- account-test.mjs
- database.ts
- devDependencies
- symbols.test.ts
- scripts
- ROADMAP.md
- smoke-test.mjs
- AccountSync
- Sincronizzazione
- Account

## God Nodes (most connected - your core abstractions)
1. `MathError` - 149 edges
2. `num()` - 133 edges
3. `mul()` - 112 edges
4. `MathNode` - 110 edges
5. `compile()` - 109 edges
6. `Rational` - 108 edges
7. `Sheet` - 107 edges
8. `toLatex()` - 100 edges
9. `add()` - 90 edges
10. `pow()` - 89 edges

## Surprising Connections (you probably didn't know these)
- `Funzionalità` --references--> `k()`  [INFERRED]
  README.md → src/math/numerical.ts
- `Dove sono le cose` --references--> `shareNote()`  [INFERRED]
  CLAUDE.md → src/account/supabase.ts
- `Dove sono le cose` --references--> `sharedLinks()`  [INFERRED]
  CLAUDE.md → src/account/supabase.ts
- `Dove sono le cose` --references--> `sampleArea()`  [INFERRED]
  CLAUDE.md → src/graph/plot.ts
- `Dove sono le cose` --references--> `solidFaces()`  [INFERRED]
  CLAUDE.md → src/graph/space.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (107 total, 13 thin omitted)

### Community 0 - "formatNumber"
Cohesion: 0.14
Nodes (26): exponentialForm(), fracTex(), fracText(), nearFraction(), piMultiple(), surd(), decimalSeparator(), Digits (+18 more)

### Community 1 - "parse.ts"
Cohesion: 0.08
Nodes (37): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe(), differentialInFraction() (+29 more)

### Community 2 - "main.ts"
Cohesion: 0.05
Nodes (81): account, active, app, applyAccountChange(), applySpellcheck(), applyTheme(), backdrop, backup() (+73 more)

### Community 3 - "odesolve.ts"
Cohesion: 0.08
Nodes (78): primed(), linearIn(), addWave(), arrange(), cauchy(), characteristicRoots(), compiled(), constantNames() (+70 more)

### Community 4 - "sync.ts"
Cohesion: 0.07
Nodes (32): withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty(), iso() (+24 more)

### Community 5 - "spec.ts"
Cohesion: 0.07
Nodes (73): Dove sono le cose, addToGraphBlock(), isConicLine(), quadricEquation(), isFourierLine(), isComplexLine(), onlyComplex(), isTestLine() (+65 more)

### Community 6 - "toLatex"
Cohesion: 0.11
Nodes (46): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+38 more)

### Community 7 - "num"
Cohesion: 0.15
Nodes (74): atIntegers(), withoutAbs(), exp(), hyperbolicToExp(), termTransform(), polyEx(), bernoulliFamily(), homogeneousGroups() (+66 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (43): addLabel(), boxes, cameras, complexCoord(), coord(), drawings, drawnViews, endTex() (+35 more)

### Community 9 - "schema/editor.ts"
Cohesion: 0.04
Nodes (79): escapeHtml(), renderTexMathml(), alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN (+71 more)

### Community 10 - "symbolic.ts"
Cohesion: 0.09
Nodes (44): constant(), atValues(), combine(), commonMonomial(), coordinates(), decimalText(), degree(), denominatorPart() (+36 more)

### Community 11 - "account.ts"
Cohesion: 0.20
Nodes (15): SyncStatus, AccountButton, confirmAccountDeletion(), messageOf(), openAccountDialog(), openLoginDialog(), codeStep(), emailStep() (+7 more)

### Community 12 - "svg.ts"
Cohesion: 0.10
Nodes (51): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), domainEdge(), features() (+43 more)

### Community 13 - "linsys.ts"
Cohesion: 0.11
Nodes (44): formatRational(), rref(), choices(), gcd(), isStandardUnknown(), linearSystem(), matrixEquation(), matrixSystem() (+36 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.10
Nodes (3): SchemaEditor, createEdgeCell(), serializeSchema()

### Community 15 - "vitest"
Cohesion: 0.08
Nodes (29): vitest, staticGraphSvg(), chooseWindow(), chooseBox(), GraphItem, parseGraph(), DrawOptions, PALETTES (+21 more)

### Community 16 - "graph/space.ts"
Cohesion: 0.13
Nodes (41): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+33 more)

### Community 17 - "evaluate.ts"
Cohesion: 0.10
Nodes (24): Interval, compare(), compileApply(), compileDerivative(), compileFunction(), compileRandomFunction(), Condition, derivative() (+16 more)

### Community 18 - "numerical.ts"
Cohesion: 0.12
Nodes (46): bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial(), interpolating() (+38 more)

### Community 19 - "FoldersStore"
Cohesion: 0.06
Nodes (28): Deletion, DeletionLog, cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder() (+20 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (42): b, bigops, c, calculus, fn, fr, fractions, functions (+34 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "Rational"
Cohesion: 0.09
Nodes (28): Part, exactSqrt(), unavailable(), expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact() (+20 more)

### Community 23 - "conics.ts"
Cohesion: 0.18
Nodes (29): conicItems(), at(), centralCanonical(), Coefficients, coneCanonical(), conicOf(), det2(), det3() (+21 more)

### Community 24 - "several.ts"
Cohesion: 0.14
Nodes (36): severalLimit, at(), bounded(), Candidate, candidates(), compiled(), COORDS, coordShown() (+28 more)

### Community 25 - "MathError"
Cohesion: 0.11
Nodes (62): MathError, angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, dataOf() (+54 more)

### Community 26 - "settings.ts"
Cohesion: 0.11
Nodes (25): addPersonalWord(), DICTIONARY_KEY, loadPersonalWords(), savePersonalWords(), tidy(), ACCOUNT_SETTINGS, accountSettings(), AI_MODELS (+17 more)

### Community 27 - "assistant.ts"
Cohesion: 0.11
Nodes (20): AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askThroughHost(), checkShape() (+12 more)

### Community 28 - "spell.test.ts"
Cohesion: 0.10
Nodes (20): @codemirror/lang-markdown, noIndentedCode, misspelledMark, refreshSpelling, setTarget, SKIP, SpellTarget, wordsToCheck() (+12 more)

### Community 29 - "fake-supabase.mjs"
Cohesion: 0.22
Nodes (11): b64(), CODE, createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom() (+3 more)

### Community 30 - "spaces.ts"
Cohesion: 0.16
Nodes (20): Eigenvalue, LinearValue, surdText(), cartesianEquations(), Cell, coordinateNames(), diagonalize(), dot() (+12 more)

### Community 31 - "view3d.ts"
Cohesion: 0.08
Nodes (47): tickLabel(), Face, lerp(), planeSide(), planeTolerance(), regionFaces(), splitFace(), splitLine() (+39 more)

### Community 32 - "compile"
Cohesion: 0.10
Nodes (50): fourierItems(), criticalLine(), named(), severalItems(), surface(), close(), definiteIntegral(), exValue() (+42 more)

### Community 33 - "markdown.ts"
Cohesion: 0.12
Nodes (26): lineDepth(), parseBlockMath(), configurePurify(), createMarkdownIt(), FORBIDDEN_TAGS, HLJS_LANGUAGES, mathBlockRule(), mathInlineRule() (+18 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "editor/editor.ts"
Cohesion: 0.06
Nodes (35): description, name, private, type, version, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands (+27 more)

### Community 36 - "editor.test.ts"
Cohesion: 0.08
Nodes (26): CODE_NODES, CommandToken, commandTokenAt(), isInCode(), MATH_NODES, mathContextAt(), mathRegionAt(), openMathBefore() (+18 more)

### Community 37 - "namesIn"
Cohesion: 0.14
Nodes (35): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+27 more)

### Community 38 - "h"
Cohesion: 0.17
Nodes (14): sidebarToggle(), viewSwitch, fieldInput(), h(), icon(), markSeen(), openTutorial(), show() (+6 more)

### Community 39 - "resize.ts"
Cohesion: 0.13
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "sheet.ts"
Cohesion: 0.11
Nodes (44): expSumValue(), ExactFunction, Lin, NUMERICAL, Definition, INFERENCE, parsed, SPACES (+36 more)

### Community 41 - "graphNote.test.ts"
Cohesion: 0.23
Nodes (14): graphImage(), graphImagesFor(), graphsForFile(), graphsFromFile(), hide(), OPEN, unhide(), areaColor() (+6 more)

### Community 42 - "NotesStore"
Cohesion: 0.10
Nodes (26): accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf() (+18 more)

### Community 43 - "study.ts"
Cohesion: 0.10
Nodes (44): Definite, Piece, limit(), LimitValue, Condition, Family, Group, Root (+36 more)

### Community 44 - "graph.ts"
Cohesion: 0.10
Nodes (31): AT_X, cellHtml(), cellText(), COMPASS, createGraph(), drawSchema(), edgeLook(), edgeStyle() (+23 more)

### Community 45 - "supabase.ts"
Cohesion: 0.12
Nodes (33): @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken(), ensureSessionOf() (+25 more)

### Community 46 - "probability.ts"
Cohesion: 0.12
Nodes (26): End, Family, CompileOptions, ExactScope, fractionNear(), ALL, complement(), distributionOf() (+18 more)

### Community 47 - "complex.ts"
Cohesion: 0.05
Nodes (68): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexValue(), isInequality() (+60 more)

### Community 48 - "distributions.ts"
Cohesion: 0.06
Nodes (63): number(), testItems(), distributionExtent(), addExp(), choose(), continuousQuantile(), discreteQuantile(), Distribution (+55 more)

### Community 49 - "toolbar.ts"
Cohesion: 0.11
Nodes (17): closeMathBlockOnEnter(), EditorCallbacks, MarkdownEditor, tabOutOfMath(), insertBlock(), insertTemplate(), wrapSelection(), Action (+9 more)

### Community 50 - "page.ts"
Cohesion: 0.07
Nodes (44): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), PullResult, openShareDialog(), changeAccess(), changeCopy() (+36 more)

### Community 51 - "calcResults.ts"
Cohesion: 0.17
Nodes (10): acceptCalcResult(), calcPlugin, CalcResult, calcResults(), formulasUntil(), insertResult(), ResultWidget, sheetBefore() (+2 more)

### Community 52 - "search.ts"
Cohesion: 0.15
Nodes (26): SuggestionItem, editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase() (+18 more)

### Community 53 - "editor/lists.ts"
Cohesion: 0.12
Nodes (48): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+40 more)

### Community 54 - "domain.ts"
Cohesion: 0.15
Nodes (27): integralRegion, axesIn(), bestAlong(), boundingBox(), combine(), compileDomain(), compileMultiple(), conditionsOf() (+19 more)

### Community 55 - "latex.ts"
Cohesion: 0.08
Nodes (50): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+42 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "insert.ts"
Cohesion: 0.13
Nodes (17): @codemirror/state, @codemirror/view, InsertOptions, toggleLinePrefix(), LIST_STYLES, besideSchema(), guardBlocks(), schemaBlockRanges() (+9 more)

### Community 58 - "Field"
Cohesion: 0.12
Nodes (7): characteristicPolynomial(), eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn()

### Community 59 - "SidePanel"
Cohesion: 0.17
Nodes (11): katex, cache, cleanKatexError(), renderTex(), renderTexOrError(), renderTexWithResult(), TexRender, SymbolForm (+3 more)

### Community 60 - "shapes.ts"
Cohesion: 0.09
Nodes (15): @maxgraph/core, ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape (+7 more)

### Community 61 - "dependencies"
Cohesion: 0.09
Nodes (23): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+15 more)

### Community 62 - "schema/preview.ts"
Cohesion: 0.14
Nodes (14): GraphLook, Look, SchemaError, Theme, draw(), drawCached(), drawn, errorHtml() (+6 more)

### Community 63 - "MathNode"
Cohesion: 0.05
Nodes (58): Definition, Line, Line, ExactComplexScope, ConicInfo, Ode, withWorkLimit(), FiniteContext (+50 more)

### Community 64 - "regions.ts"
Cohesion: 0.15
Nodes (24): constantIntegrand(), depth(), inequalityMargin(), LayeredSolid, Multiple, multipleOf(), planeMargin(), PlanePart (+16 more)

### Community 65 - "laplace.ts"
Cohesion: 0.11
Nodes (46): factoredPolynomial(), integerPoly(), polynomialOf(), oneFraction(), beyondPoles(), E, fractionShown(), HALF (+38 more)

### Community 66 - "suggestions.ts"
Cohesion: 0.19
Nodes (7): templateInsertion(), EditorMathContext, expand(), preferredIndex(), SuggestionController, parseTemplate(), templateText()

### Community 67 - "tutorial.mjs"
Cohesion: 0.12
Nodes (10): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+2 more)

### Community 68 - "sql.ts"
Cohesion: 0.17
Nodes (17): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+9 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "multiple.test.ts"
Cohesion: 0.19
Nodes (16): formulaAtCursor(), insertGraphBlock(), areaOf(), blockLines(), formulaGraphLine(), graphBlockText(), graphNames(), parseLine() (+8 more)

### Community 72 - "spellcheck"
Cohesion: 0.21
Nodes (8): spellcheck(), close(), misspelledAt(), openAt(), replace(), tooltipView(), SpellChecker, SpellcheckOptions

### Community 73 - "nameLatex"
Cohesion: 0.13
Nodes (25): FieldContext, isNumericalLine(), numericalItems(), figureText(), linearItem(), classes(), dataOf(), distributionLabel() (+17 more)

### Community 74 - "Glifo"
Cohesion: 0.20
Nodes (10): Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Funzionalità, Glifo, Idee per il futuro (+2 more)

### Community 75 - "Il database degli account (Supabase)"
Cohesion: 0.25
Nodes (8): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Nell'app, Note condivise con un link

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/file.ts"
Cohesion: 0.18
Nodes (14): SchemaEditorOptions, base64(), hide(), OPEN, schemasForFile(), schemasFromFile(), unhide(), crc32() (+6 more)

### Community 79 - "Glifo – note per Claude"
Cohesion: 0.25
Nodes (7): Comandi, Come controllare il lavoro, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole, sqlite()

### Community 82 - "Più avanti"
Cohesion: 0.22
Nodes (9): Abbonamento e funzioni a pagamento (da capire), Aiuto con gli esercizi, Calcoli e grafici: idee in più, Matematica per i corsi: idee in più, Non solo appunti, Più avanti, Schemi: idee in più, Trascrizione delle lezioni in appunti (+1 more)

### Community 83 - "files.ts"
Cohesion: 0.19
Nodes (15): inClaudeViewer(), loadDialect(), canWriteFilesDirectly(), downloadBlob(), downloadText(), fileNameFor(), FsWindow, isAbort() (+7 more)

### Community 90 - "integrate"
Cohesion: 0.26
Nodes (15): argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot(), fieldOn(), numericPartials() (+7 more)

### Community 91 - "render/lists.ts"
Cohesion: 0.27
Nodes (13): ListStyle, bulletGroup(), Marker, sameList(), alignInside(), asciiTrim(), findMarker(), Found (+5 more)

### Community 92 - "logo.ts"
Cohesion: 0.24
Nodes (5): PNG_ICONS, glyph(), LOGO_COLOR, logoIcon(), logoMark()

### Community 96 - "account-test.mjs"
Cohesion: 0.20
Nodes (4): device(), login(), newContext, waitFor()

### Community 97 - "database.ts"
Cohesion: 0.24
Nodes (6): @electric-sql/pglite, createDatabase(), createUser(), databaseTests(), migrations, shareTests()

### Community 98 - "devDependencies"
Cohesion: 0.22
Nodes (9): devDependencies, @electric-sql/pglite, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite, vite-plugin-pwa (+1 more)

### Community 100 - "symbols.test.ts"
Cohesion: 0.36
Nodes (6): CATEGORIES, cardPreviewTex(), formPreviewTex(), ParsedTemplate, PLACEHOLDER_TEX, placeholderPreview()

### Community 101 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 102 - "ROADMAP.md"
Cohesion: 0.29
Nodes (5): Account: i propri appunti su ogni dispositivo, anche da condividere, Altre idee, Controllare e mostrare quello che si scrive, Idee per il futuro, In programma

### Community 103 - "smoke-test.mjs"
Cohesion: 0.29
Nodes (5): markdown-it, playwright-core, vite, firstVisit(), plainContext

### Community 105 - "Sincronizzazione"
Cohesion: 0.50
Nodes (3): Sincronizzazione, `sync_pull({ since })`: scarica le novità, `sync_push({ changes })`: manda le modifiche

### Community 106 - "Account"
Cohesion: 0.67
Nodes (3): Account, Condividere una nota con un link, Usarla tutti i giorni

## Knowledge Gaps
- **487 isolated node(s):** `session-start.sh script`, `name`, `private`, `version`, `description` (+482 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 661 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `main.ts`, `sync.ts`, `num`, `schema/editor.ts`, `svg.ts`, `linsys.ts`, `FoldersStore`, `MathError`, `settings.ts`, `assistant.ts`, `spell.test.ts`, `view3d.ts`, `compile`, `markdown.ts`, `editor/editor.ts`, `editor.test.ts`, `h`, `resize.ts`, `graphNote.test.ts`, `NotesStore`, `supabase.ts`, `distributions.ts`, `page.ts`, `search.ts`, `editor/lists.ts`, `insert.ts`, `MathNode`, `sql.ts`, `multiple.test.ts`, `schema/file.ts`, `logo.ts`, `database.ts`, `symbols.test.ts`?**
  _High betweenness centrality (0.137) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `spec.ts` to `formatNumber`, `parse.ts`, `main.ts`, `odesolve.ts`, `toLatex`, `graph/preview.ts`, `schema/editor.ts`, `symbolic.ts`, `svg.ts`, `linsys.ts`, `graph/space.ts`, `numerical.ts`, `Rational`, `several.ts`, `MathError`, `compile`, `markdown.ts`, `logic.ts`, `namesIn`, `sheet.ts`, `study.ts`, `graph.ts`, `supabase.ts`, `complex.ts`, `distributions.ts`, `latex.ts`, `schema/preview.ts`, `MathNode`, `nameLatex`, `Glifo – note per Claude`, `integrate`?**
  _High betweenness centrality (0.056) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `main.ts`, `resize.ts`, `spellcheck`, `schema/editor.ts`, `account.ts`, `graph.ts`, `SchemaEditor`, `vitest`, `toolbar.ts`, `page.ts`, `files.ts`, `FoldersStore`, `settings.ts`, `SidePanel`, `spell.test.ts`, `schema/preview.ts`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **What connects `session-start.sh script`, `name`, `private` to the rest of the system?**
  _487 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `formatNumber` be split into smaller, more focused modules?**
  _Cohesion score 0.13756613756613756 - nodes in this community are weakly interconnected._
- **Should `parse.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07838745800671892 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05201465201465202 - nodes in this community are weakly interconnected._