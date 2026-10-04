# Graph Report - matherdown  (2026-10-04)

## Corpus Check
- 218 files · ~400,057 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 3482 nodes · 12732 edges · 106 communities (92 shown, 14 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 339 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `788a617c`
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
- mul
- graph/preview.ts
- schema/editor.ts
- symbolic.ts
- graph.ts
- svg.ts
- linsys.ts
- SchemaEditor
- vitest
- graph/space.ts
- compile
- numerical.ts
- FoldersStore
- index.ts
- engine.ts
- Rational
- conics.ts
- several.ts
- MathError
- h
- assistant.ts
- graphNote.test.ts
- fake-supabase.mjs
- spaces.ts
- view3d.ts
- settings.ts
- markdown.ts
- logic.ts
- .calculate
- calcResults.ts
- Dove sono le cose
- MathNode
- resize.ts
- sheet.ts
- scopeWith
- NotesStore
- study.ts
- parseSchema
- supabase.ts
- probability.ts
- complex.ts
- distributions.ts
- package.json
- page.ts
- severalGraph.ts
- search.ts
- schemaTools.test.ts
- files.ts
- finite.ts
- 20261004091555_note_condivise.sql
- toolbar.ts
- Field
- SidePanel
- shapes.ts
- dependencies
- schema/preview.ts
- database.ts
- placeholders.ts
- editor/lists.ts
- templates.ts
- tutorial.mjs
- sql.ts
- Benvenuto in Glifo
- compilerOptions
- smoke-test.mjs
- formatNumber
- statsGraph.ts
- editor.test.ts
- editor/editor.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- logo.ts
- graph/file.ts
- session-start.sh
- .claude/CLAUDE.md
- Glifo
- sidePanel.ts
- fixedPoint
- .define
- tidy
- supabase-stub.sql
- account-test.mjs
- Più avanti
- linear.test.ts
- icons.mjs
- Glifo – note per Claude
- toLatex
- Sheet
- Il database degli account (Supabase)

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
- `Dove sono le cose` --references--> `shareNote()`  [INFERRED]
  CLAUDE.md → src/account/supabase.ts
- `Dove sono le cose` --references--> `sharedLinks()`  [INFERRED]
  CLAUDE.md → src/account/supabase.ts
- `Dove sono le cose` --references--> `addToGraphBlock()`  [INFERRED]
  CLAUDE.md → src/editor/graphInsert.ts
- `Dove sono le cose` --references--> `sampleArea()`  [INFERRED]
  CLAUDE.md → src/graph/plot.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (106 total, 14 thin omitted)

### Community 0 - "solve.ts"
Cohesion: 0.16
Nodes (25): Scope, LinearScope, isStandardUnknown(), linearSystem(), RelOp, breaks(), equation(), holds() (+17 more)

### Community 1 - "parse.ts"
Cohesion: 0.08
Nodes (37): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe(), differentialInFraction() (+29 more)

### Community 2 - "main.ts"
Cohesion: 0.05
Nodes (89): graphsForFile(), hide(), account, accountButton, active, app, applyAccountChange(), applySpellcheck() (+81 more)

### Community 3 - "num"
Cohesion: 0.08
Nodes (88): primed(), linearIn(), termTransform(), addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots() (+80 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (34): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+26 more)

### Community 5 - "spec.ts"
Cohesion: 0.06
Nodes (79): formulaAtCursor(), conicItems(), isConicLine(), quadricEquation(), FieldContext, fourierItems(), isFourierLine(), onlyComplex() (+71 more)

### Community 6 - "arithmetic.ts"
Cohesion: 0.10
Nodes (43): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+35 more)

### Community 7 - "mul"
Cohesion: 0.13
Nodes (79): atIntegers(), exp(), hyperbolicToExp(), inverseRational(), R(), sqrtEx(), polyEx(), shapeValue() (+71 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (39): addLabel(), boxes, cameras, complexCoord(), coord(), drawings, drawnViews, endTex() (+31 more)

### Community 9 - "schema/editor.ts"
Cohesion: 0.05
Nodes (49): ALIGN, ARROW_NAMES, AT_ICONS, AT_NAMES, BASE_PRESETS, BIG_ARROWS, DB_PRESETS, Direction (+41 more)

### Community 10 - "symbolic.ts"
Cohesion: 0.07
Nodes (61): primitive(), verified(), atValues(), combine(), commonMonomial(), Converter, coordinates(), decimalText() (+53 more)

### Community 11 - "graph.ts"
Cohesion: 0.16
Nodes (23): AT_X, cellHtml(), cellText(), COMPASS, createEdgeCell(), createGraph(), drawSchema(), edgeLook() (+15 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (52): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseWindow(), chooseY(), clipLines(), domainEdge() (+44 more)

### Community 13 - "linsys.ts"
Cohesion: 0.14
Nodes (40): choices(), gcd(), matrixEquation(), matrixSystem(), minorsGcd(), ONE, parametricRows(), parametricSystem() (+32 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.10
Nodes (6): loadDialect(), SchemaEditor, readSchema(), serializeSchema(), tableMetrics(), Template

### Community 15 - "vitest"
Cohesion: 0.08
Nodes (22): vitest, GraphItem, parseGraph(), PALETTES, light, item(), light, light (+14 more)

### Community 16 - "graph/space.ts"
Cohesion: 0.09
Nodes (60): staticGraphSvg(), addMesh(), addTet(), affinePlane(), Axis, centroid(), chooseBox(), clipBy() (+52 more)

### Community 17 - "compile"
Cohesion: 0.07
Nodes (52): constantValue(), typedSliderValue(), argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot() (+44 more)

### Community 18 - "numerical.ts"
Cohesion: 0.12
Nodes (34): cholesky(), condition(), exactPolynomial(), floatPolynomial(), interpolating(), interpolation(), inverseOf(), isPlottedNumerical() (+26 more)

### Community 19 - "FoldersStore"
Cohesion: 0.07
Nodes (21): Deletion, cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder(), loadClosedFolders() (+13 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (41): b, bigops, c, calculus, fn, fr, fractions, functions (+33 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "Rational"
Cohesion: 0.13
Nodes (19): expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactRandom, exactRoot(), factorialExact() (+11 more)

### Community 23 - "conics.ts"
Cohesion: 0.18
Nodes (29): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+21 more)

### Community 24 - "several.ts"
Cohesion: 0.15
Nodes (35): severalLimit, at(), bounded(), Candidate, candidates(), compiled(), COORDS, coordShown() (+27 more)

### Community 25 - "MathError"
Cohesion: 0.13
Nodes (55): MathError, angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, dataOf() (+47 more)

### Community 26 - "h"
Cohesion: 0.07
Nodes (44): SyncStatus, helpButton, openGuide(), AI_MODELS, Settings, SPELL_LANGUAGES, SpellLanguages, Theme (+36 more)

### Community 27 - "assistant.ts"
Cohesion: 0.11
Nodes (20): @anthropic-ai/sdk, AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askThroughHost() (+12 more)

### Community 28 - "graphNote.test.ts"
Cohesion: 0.06
Nodes (35): @codemirror/lang-markdown, addToGraphBlock(), insertGraphBlock(), noIndentedCode, mathMarkdown, misspelledMark, refreshSpelling, setTarget (+27 more)

### Community 29 - "fake-supabase.mjs"
Cohesion: 0.22
Nodes (11): b64(), CODE, createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom() (+3 more)

### Community 30 - "spaces.ts"
Cohesion: 0.14
Nodes (25): formatGauss(), formatRational(), Eigenvalue, lengthText(), LinearValue, Mat, splitRoot(), surdText() (+17 more)

### Community 31 - "view3d.ts"
Cohesion: 0.10
Nodes (31): Face, Plane, Vec3, escapeXml(), Palette, arcPoints(), arrowHead(), boxShape() (+23 more)

### Community 32 - "settings.ts"
Cohesion: 0.11
Nodes (23): DeletionLog, addPersonalWord(), DICTIONARY_KEY, savePersonalWords(), tidy(), ACCOUNT_SETTINGS, accountSettings(), DEFAULT_SETTINGS (+15 more)

### Community 33 - "markdown.ts"
Cohesion: 0.09
Nodes (41): dompurify, highlight.js, markdown-it-footnote, lineDepth(), mathDelimTag, parseBlockMath(), bulletGroup(), sameList() (+33 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - ".calculate"
Cohesion: 0.22
Nodes (6): withWorkLimit(), FormattedResult, parseCached(), styleOf(), walk(), needsSymbols()

### Community 36 - "calcResults.ts"
Cohesion: 0.20
Nodes (6): acceptCalcResult(), calcPlugin, CalcResult, insertResult(), ResultWidget, MathRegion

### Community 37 - "Dove sono le cose"
Cohesion: 0.14
Nodes (35): Dove sono le cose, bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel() (+27 more)

### Community 38 - "MathNode"
Cohesion: 0.13
Nodes (12): Definition, Line, ExactComplexScope, compileOde(), Ode, Elem, FiniteContext, differentialRequest (+4 more)

### Community 39 - "resize.ts"
Cohesion: 0.13
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "sheet.ts"
Cohesion: 0.12
Nodes (43): expSumValue(), ExactFunction, Lin, CHECK_VALUES, INFERENCE, parsed, SPACES, STATISTICS (+35 more)

### Community 41 - "scopeWith"
Cohesion: 0.10
Nodes (48): constantIntegrand(), inequalityMargin(), integralRegion, LayeredSolid, planeMargin(), planeParts(), radiusOf(), spaceLayers() (+40 more)

### Community 42 - "NotesStore"
Cohesion: 0.09
Nodes (27): accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf() (+19 more)

### Community 43 - "study.ts"
Cohesion: 0.10
Nodes (44): close(), Definite, definiteIntegral(), exValue(), samples(), EMPTY_SCOPE, Piece, limit() (+36 more)

### Community 44 - "parseSchema"
Cohesion: 0.16
Nodes (16): SchemaEditorOptions, base64(), hide(), OPEN, schemasForFile(), schemasFromFile(), unhide(), isRecord() (+8 more)

### Community 45 - "supabase.ts"
Cohesion: 0.11
Nodes (31): @supabase/supabase-js, AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountError, appUrl(), call(), currentSession() (+23 more)

### Community 46 - "probability.ts"
Cohesion: 0.11
Nodes (26): End, Family, CompileOptions, ExactScope, ALL, compileOf(), complement(), distributionOf() (+18 more)

### Community 47 - "complex.ts"
Cohesion: 0.06
Nodes (68): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexValue(), isInequality() (+60 more)

### Community 48 - "distributions.ts"
Cohesion: 0.07
Nodes (60): addExp(), choose(), continuousQuantile(), discreteQuantile(), Distribution, exactIntervalProbability(), factorialBig(), FAMILIES (+52 more)

### Community 49 - "package.json"
Cohesion: 0.07
Nodes (26): description, name, private, scripts, build, dev, preview, test (+18 more)

### Community 50 - "page.ts"
Cohesion: 0.08
Nodes (35): accountDataFile(), openShareDialog(), changeAccess(), changeCopy(), refreshChanged(), render(), run(), setStatus() (+27 more)

### Community 51 - "severalGraph.ts"
Cohesion: 0.54
Nodes (7): criticalLine(), isSeveralLine(), named(), severalItems(), surface(), optimumOf(), severalOf()

### Community 52 - "search.ts"
Cohesion: 0.17
Nodes (24): SuggestionItem, editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase() (+16 more)

### Community 53 - "schemaTools.test.ts"
Cohesion: 0.17
Nodes (12): alignBoxes(), Alignment, Box, distributeBoxes(), Position, crc32(), svgSize(), svgToPng() (+4 more)

### Community 54 - "files.ts"
Cohesion: 0.19
Nodes (15): hostDownloads, inClaudeViewer(), canWriteFilesDirectly(), downloadBlob(), downloadText(), fileNameFor(), FsWindow, isAbort() (+7 more)

### Community 55 - "finite.ts"
Cohesion: 0.19
Nodes (26): countOf(), elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError, FiniteResult (+18 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "toolbar.ts"
Cohesion: 0.10
Nodes (25): @codemirror/state, @codemirror/view, insertBlock(), InsertOptions, toggleLinePrefix(), wrapSelection(), LIST_STYLES, besideSchema() (+17 more)

### Community 58 - "Field"
Cohesion: 0.12
Nodes (7): characteristicPolynomial(), eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn()

### Community 59 - "SidePanel"
Cohesion: 0.22
Nodes (7): cleanKatexError(), renderTex(), SymbolForm, clear(), displayCode(), preventFocusSteal(), SidePanel

### Community 60 - "shapes.ts"
Cohesion: 0.09
Nodes (15): @maxgraph/core, ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape (+7 more)

### Community 61 - "dependencies"
Cohesion: 0.06
Nodes (32): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+24 more)

### Community 62 - "schema/preview.ts"
Cohesion: 0.10
Nodes (23): GraphLook, hydrateGraphs(), escapeHtml(), renderTexMathml(), Look, labelHtml(), plainHtml(), tableHtml() (+15 more)

### Community 63 - "database.ts"
Cohesion: 0.24
Nodes (6): @electric-sql/pglite, createDatabase(), createUser(), databaseTests(), migrations, shareTests()

### Community 64 - "placeholders.ts"
Cohesion: 0.14
Nodes (12): addPlaceholders, buildDecorations(), clearAllPlaceholders(), clearPlaceholders, contains(), currentIndex(), filledMark, getPlaceholders() (+4 more)

### Community 65 - "editor/lists.ts"
Cohesion: 0.10
Nodes (54): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+46 more)

### Community 66 - "templates.ts"
Cohesion: 0.13
Nodes (15): DEFAULT_EDGE, SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), conceptMap, cycle, er (+7 more)

### Community 67 - "tutorial.mjs"
Cohesion: 0.12
Nodes (10): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+2 more)

### Community 68 - "sql.ts"
Cohesion: 0.15
Nodes (20): parseTable(), splitTable(), Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey() (+12 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "smoke-test.mjs"
Cohesion: 0.29
Nodes (4): markdown-it, vite, firstVisit(), plainContext

### Community 72 - "formatNumber"
Cohesion: 0.13
Nodes (26): fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), decimalSeparator(), Digits (+18 more)

### Community 73 - "statsGraph.ts"
Cohesion: 0.18
Nodes (17): isTestLine(), number(), testItems(), classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX (+9 more)

### Community 74 - "editor.test.ts"
Cohesion: 0.09
Nodes (21): templateInsertion(), CODE_NODES, CommandToken, commandTokenAt(), EditorMathContext, isInCode(), MATH_NODES, mathContextAt() (+13 more)

### Community 75 - "editor/editor.ts"
Cohesion: 0.10
Nodes (16): @codemirror/commands, @codemirror/language, closeMathBlockOnEnter(), EditorCallbacks, highlight, italianPhrases, MarkdownEditor, tabOutOfMath() (+8 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "logo.ts"
Cohesion: 0.39
Nodes (5): BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark()

### Community 79 - "graph/file.ts"
Cohesion: 0.36
Nodes (8): graphImage(), graphImagesFor(), graphsFromFile(), OPEN, unhide(), areaColor(), graphTitle(), itemColors()

### Community 82 - "Glifo"
Cohesion: 0.17
Nodes (12): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Glifo (+4 more)

### Community 83 - "sidePanel.ts"
Cohesion: 0.15
Nodes (16): katex, cache, TexRender, isConfidentAnswer(), SearchResult, CATEGORIES, symbolsInCategory(), cardPreviewTex() (+8 more)

### Community 90 - "fixedPoint"
Cohesion: 0.29
Nodes (16): Funzionalità, bisection(), derivative(), fixedPoint(), intervalOf(), k(), newton(), NormKind (+8 more)

### Community 91 - ".define"
Cohesion: 0.25
Nodes (3): definitionTarget(), splitPieces(), scopeWithSets()

### Community 92 - "tidy"
Cohesion: 0.09
Nodes (63): factoredPolynomial(), numShown(), polynomialOf(), polyShown(), ruffiniShown(), absOf(), boundsOf(), close() (+55 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.20
Nodes (4): device(), login(), newContext, waitFor()

### Community 97 - "Più avanti"
Cohesion: 0.14
Nodes (14): Abbonamento e funzioni a pagamento (da capire), Account: i propri appunti su ogni dispositivo, anche da condividere, Aiuto con gli esercizi, Altre idee, Calcoli e grafici: idee in più, Controllare e mostrare quello che si scrive, Idee per il futuro, In programma (+6 more)

### Community 98 - "linear.test.ts"
Cohesion: 0.29
Nodes (7): EXACT, FLOAT, A, B, q(), result(), text()

### Community 101 - "Glifo – note per Claude"
Cohesion: 0.20
Nodes (7): Comandi, Come controllare il lavoro, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole, sqlite()

### Community 102 - "toLatex"
Cohesion: 0.07
Nodes (47): areaFor(), condLabel(), isStraight(), isVectorName(), itemFor(), restrict(), spaceItemFor(), spaceTuple() (+39 more)

### Community 104 - "Sheet"
Cohesion: 0.11
Nodes (27): calcResults(), formulasUntil(), sheetBefore(), Sheet, solveRequest(), text(), tex(), text() (+19 more)

### Community 107 - "Il database degli account (Supabase)"
Cohesion: 0.17
Nodes (11): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Nell'app, Note condivise con un link (+3 more)

## Knowledge Gaps
- **491 isolated node(s):** `session-start.sh script`, `name`, `private`, `version`, `description` (+486 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 667 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `main.ts`, `sync.ts`, `mul`, `svg.ts`, `linsys.ts`, `graph/space.ts`, `compile`, `FoldersStore`, `Rational`, `h`, `assistant.ts`, `graphNote.test.ts`, `settings.ts`, `markdown.ts`, `resize.ts`, `NotesStore`, `parseSchema`, `supabase.ts`, `distributions.ts`, `package.json`, `page.ts`, `search.ts`, `schemaTools.test.ts`, `toolbar.ts`, `database.ts`, `editor/lists.ts`, `sql.ts`, `editor.test.ts`, `editor/editor.ts`, `logo.ts`, `sidePanel.ts`, `linear.test.ts`, `toLatex`, `Sheet`?**
  _High betweenness centrality (0.108) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `Dove sono le cose` to `parse.ts`, `main.ts`, `num`, `spec.ts`, `arithmetic.ts`, `mul`, `schema/editor.ts`, `symbolic.ts`, `svg.ts`, `linsys.ts`, `graph/space.ts`, `compile`, `numerical.ts`, `Rational`, `conics.ts`, `several.ts`, `MathError`, `h`, `graphNote.test.ts`, `markdown.ts`, `logic.ts`, `.calculate`, `sheet.ts`, `study.ts`, `supabase.ts`, `complex.ts`, `distributions.ts`, `finite.ts`, `schema/preview.ts`, `sql.ts`, `formatNumber`, `.define`, `tidy`, `Glifo – note per Claude`, `toLatex`, `Sheet`?**
  _High betweenness centrality (0.077) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `editor/lists.ts`, `main.ts`, `resize.ts`, `schema/editor.ts`, `SchemaEditor`, `page.ts`, `FoldersStore`, `sidePanel.ts`, `schemaTools.test.ts`, `toolbar.ts`, `SidePanel`, `graphNote.test.ts`, `schema/preview.ts`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **What connects `session-start.sh script`, `name`, `private` to the rest of the system?**
  _491 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `parse.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07984442919240449 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04787878787878788 - nodes in this community are weakly interconnected._
- **Should `num` be split into smaller, more focused modules?**
  _Cohesion score 0.07890704800817161 - nodes in this community are weakly interconnected._