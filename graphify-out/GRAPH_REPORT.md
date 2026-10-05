# Graph Report - matherdown  (2026-10-05)

## Corpus Check
- 220 files · ~408,147 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 3524 nodes · 12780 edges · 111 communities (96 shown, 15 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 342 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c0c1d35a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- solve.ts
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
- domain.ts
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
- graph.ts
- several.ts
- MathError
- h
- assistant.ts
- settings.ts
- conics.ts
- spaces.ts
- view3d.ts
- distributions.ts
- markdown.ts
- logic.ts
- MathNode
- editor.test.ts
- Dove sono le cose
- .constructor
- resize.ts
- statsShown.ts
- vitest
- NotesStore
- study.ts
- symbols.test.ts
- sheet.ts
- laplace.ts
- complex.ts
- devDependencies
- spell.test.ts
- probability.ts
- gauss.ts
- sidePanel.ts
- graph/file.ts
- limits.ts
- finite.ts
- 20261004091555_note_condivise.sql
- toolbar.ts
- Field
- SidePanel
- shapes.ts
- dependencies
- supabase.ts
- tutorial.ts
- schema/preview.ts
- label.ts
- calcResults.ts
- Glifo
- sql.ts
- Benvenuto in Glifo
- compilerOptions
- editor/editor.ts
- suggestions.ts
- inference.ts
- toLatex
- MarkdownEditor
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schemaTools.test.ts
- database.ts
- session-start.sh
- .claude/CLAUDE.md
- Più avanti
- tutorial.mjs
- Abbonamenti
- formatLinear
- toNode
- supabase-stub.sql
- account-test.mjs
- Il database degli account (Supabase)
- Costi
- smoke-test.mjs
- Idee per il futuro
- page.ts
- I modelli e le chiavi API
- Le spiegazioni, come funzionano
- fake-supabase.mjs
- Piano per piano
- icons.mjs
- Glifo – note per Claude
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
- `Funzionalità` --references--> `k()`  [INFERRED]
  README.md → src/math/numerical.ts
- `Dove sono le cose` --references--> `sharedLinks()`  [INFERRED]
  CLAUDE.md → src/account/supabase.ts
- `Dove sono le cose` --references--> `shareNote()`  [INFERRED]
  CLAUDE.md → src/account/supabase.ts
- `Dove sono le cose` --references--> `addToGraphBlock()`  [INFERRED]
  CLAUDE.md → src/editor/graphInsert.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (111 total, 15 thin omitted)

### Community 0 - "solve.ts"
Cohesion: 0.16
Nodes (25): isStandardUnknown(), linearSystem(), RelOp, numericRoots(), breaks(), cubeRoot(), equation(), holds() (+17 more)

### Community 1 - "parse.ts"
Cohesion: 0.08
Nodes (37): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe(), differentialInFraction() (+29 more)

### Community 2 - "main.ts"
Cohesion: 0.05
Nodes (88): insertGraphBlock(), inClaudeViewer(), account, active, app, applyAccountChange(), applyTheme(), backdrop (+80 more)

### Community 3 - "odesolve.ts"
Cohesion: 0.09
Nodes (79): linearIn(), addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames() (+71 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (33): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+25 more)

### Community 5 - "spec.ts"
Cohesion: 0.06
Nodes (85): sheetBefore(), addToGraphBlock(), formulaAtCursor(), quadricEquation(), isComplexLine(), isComplexValue(), isSegmentNode(), onlyComplex() (+77 more)

### Community 6 - "arithmetic.ts"
Cohesion: 0.11
Nodes (45): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+37 more)

### Community 7 - "num"
Cohesion: 0.14
Nodes (80): atIntegers(), polyEx(), similarSolution(), algebraic(), bigGcd(), byParts(), candidates(), canon() (+72 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (41): addLabel(), boxes, cameras, complexCoord(), coord(), drawings, drawnViews, endTex() (+33 more)

### Community 9 - "schema/editor.ts"
Cohesion: 0.04
Nodes (68): ALIGN, ARROW_NAMES, AT_ICONS, AT_NAMES, BASE_PRESETS, BIG_ARROWS, DB_PRESETS, Direction (+60 more)

### Community 10 - "symbolic.ts"
Cohesion: 0.07
Nodes (59): primitive(), verified(), atValues(), cancelLinear(), Converter, coordinates(), decimalText(), definiteParts() (+51 more)

### Community 11 - "domain.ts"
Cohesion: 0.08
Nodes (48): constantIntegrand(), depth(), inequalityMargin(), integralRegion, LayeredSolid, Multiple, planeMargin(), PlanePart (+40 more)

### Community 12 - "svg.ts"
Cohesion: 0.08
Nodes (57): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), staticGraphSvg(), chooseWindow(), chooseY(), clipLines() (+49 more)

### Community 13 - "linsys.ts"
Cohesion: 0.13
Nodes (43): factorsOf(), choices(), gcd(), matrixEquation(), matrixSystem(), minorsGcd(), ONE, parametricRows() (+35 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.11
Nodes (3): SchemaEditor, createEdgeCell(), serializeSchema()

### Community 15 - "editor/lists.ts"
Cohesion: 0.11
Nodes (50): continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext(), isBlank() (+42 more)

### Community 16 - "graph/space.ts"
Cohesion: 0.10
Nodes (51): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+43 more)

### Community 17 - "compile"
Cohesion: 0.07
Nodes (61): criticalLine(), isSeveralLine(), named(), severalItems(), surface(), constantValue(), argumentOrder(), compileLineIntegral() (+53 more)

### Community 18 - "numerical.ts"
Cohesion: 0.12
Nodes (47): bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial(), interpolating() (+39 more)

### Community 19 - "FoldersStore"
Cohesion: 0.07
Nodes (19): cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder(), loadClosedFolders(), RemoteFolder (+11 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (41): b, bigops, c, calculus, fn, fr, fractions, functions (+33 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "Rational"
Cohesion: 0.10
Nodes (24): Part, expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactRandom, exactRoot() (+16 more)

### Community 23 - "graph.ts"
Cohesion: 0.10
Nodes (30): fieldInput(), textWidth(), AT_X, cellText(), COMPASS, createGraph(), drawSchema(), edgeLook() (+22 more)

### Community 24 - "several.ts"
Cohesion: 0.15
Nodes (35): fractionNear(), at(), bounded(), Candidate, candidates(), compiled(), COORDS, coordShown() (+27 more)

### Community 25 - "MathError"
Cohesion: 0.14
Nodes (48): MathError, nameLabel(), UndefinedName, angleBetween(), asMatrix(), basisOf(), cross(), Ctx (+40 more)

### Community 26 - "h"
Cohesion: 0.08
Nodes (43): SyncStatus, viewSwitch, openShareDialog(), changeAccess(), changeCopy(), refreshChanged(), render(), run() (+35 more)

### Community 27 - "assistant.ts"
Cohesion: 0.11
Nodes (21): @anthropic-ai/sdk, AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askThroughHost() (+13 more)

### Community 28 - "settings.ts"
Cohesion: 0.10
Nodes (28): applySpellcheck(), openSettings(), restore(), setPersonalWords(), sidebarBottom, updateSettings(), wordsChangedHere(), addPersonalWord() (+20 more)

### Community 29 - "conics.ts"
Cohesion: 0.18
Nodes (29): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+21 more)

### Community 30 - "spaces.ts"
Cohesion: 0.12
Nodes (29): decimalSeparator(), Digits, FormatOptions, formatRational(), fromNumber(), fromRational(), SUPERSCRIPT, writeDigits() (+21 more)

### Community 31 - "view3d.ts"
Cohesion: 0.10
Nodes (37): tickLabel(), Face, planeTolerance(), regionFaces(), GRAPH_WORK, Plane, Vec3, escapeXml() (+29 more)

### Community 32 - "distributions.ts"
Cohesion: 0.17
Nodes (26): choose(), continuousQuantile(), discreteQuantile(), factorialBig(), FAMILIES, integerParam(), invalid(), makeDistribution() (+18 more)

### Community 33 - "markdown.ts"
Cohesion: 0.11
Nodes (29): bulletGroup(), sameList(), alignInside(), asciiTrim(), findMarker(), isOrdered(), listAttrs(), listRule() (+21 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "MathNode"
Cohesion: 0.11
Nodes (20): ExactComplexScope, Ode, withWorkLimit(), FiniteContext, FormattedResult, characteristicPolynomial(), formatPolynomial(), LinearValue (+12 more)

### Community 36 - "editor.test.ts"
Cohesion: 0.07
Nodes (34): CODE_NODES, CommandToken, commandTokenAt(), isInCode(), MATH_NODES, mathContextAt(), mathRegionAt(), openMathBefore() (+26 more)

### Community 37 - "Dove sono le cose"
Cohesion: 0.13
Nodes (38): Dove sono le cose, bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel() (+30 more)

### Community 39 - "resize.ts"
Cohesion: 0.13
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "statsShown.ts"
Cohesion: 0.21
Nodes (26): check(), correlation(), count(), covariance(), Data, dataStatistic(), deviation(), fail() (+18 more)

### Community 41 - "vitest"
Cohesion: 0.04
Nodes (45): vitest, parseGraph(), typedSliderValue(), PALETTES, readBases(), solveRequest(), light, text() (+37 more)

### Community 42 - "NotesStore"
Cohesion: 0.07
Nodes (34): accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf() (+26 more)

### Community 43 - "study.ts"
Cohesion: 0.18
Nodes (27): Asymptote, compiled(), cutsOf(), defined(), domainOf(), exact(), inDomain(), inside() (+19 more)

### Community 44 - "symbols.test.ts"
Cohesion: 0.36
Nodes (6): CATEGORIES, cardPreviewTex(), formPreviewTex(), ParsedTemplate, PLACEHOLDER_TEX, placeholderPreview()

### Community 45 - "sheet.ts"
Cohesion: 0.06
Nodes (46): isTestLine(), number(), testItems(), classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX (+38 more)

### Community 46 - "laplace.ts"
Cohesion: 0.17
Nodes (30): factoredPolynomial(), oneFraction(), beyondPoles(), compiled(), E, exp(), fractionShown(), HALF (+22 more)

### Community 47 - "complex.ts"
Cohesion: 0.10
Nodes (33): add(), asin(), atan(), compileApply(), compileComplex(), compileFunction(), compileName(), ComplexCompiled (+25 more)

### Community 48 - "devDependencies"
Cohesion: 0.11
Nodes (17): devDependencies, @electric-sql/pglite, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite, vite-plugin-pwa (+9 more)

### Community 49 - "spell.test.ts"
Cohesion: 0.07
Nodes (27): @codemirror/lang-markdown, noIndentedCode, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close() (+19 more)

### Community 50 - "probability.ts"
Cohesion: 0.11
Nodes (29): addExp(), End, exactIntervalProbability(), Family, integerRange(), Interval, intervalProbability(), subtractExp() (+21 more)

### Community 51 - "gauss.ts"
Cohesion: 0.15
Nodes (24): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isInequality(), realEverywhere() (+16 more)

### Community 52 - "sidePanel.ts"
Cohesion: 0.13
Nodes (28): SuggestionItem, editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase() (+20 more)

### Community 53 - "graph/file.ts"
Cohesion: 0.27
Nodes (12): graphImage(), graphImagesFor(), graphsForFile(), graphsFromFile(), hide(), OPEN, unhide(), areaColor() (+4 more)

### Community 54 - "limits.ts"
Cohesion: 0.19
Nodes (19): fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), alternating(), close() (+11 more)

### Community 55 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "toolbar.ts"
Cohesion: 0.10
Nodes (29): @codemirror/state, @codemirror/view, insertBlock(), InsertOptions, toggleLinePrefix(), wrapSelection(), applyListStyle(), LIST_STYLES (+21 more)

### Community 58 - "Field"
Cohesion: 0.13
Nodes (6): eigenvalues(), eigenvectors(), Field, interpolate(), interpolateFloat(), polynomialIn()

### Community 59 - "SidePanel"
Cohesion: 0.18
Nodes (9): cache, cleanKatexError(), renderTex(), renderTexOrError(), renderTexWithResult(), TexRender, symbolsInCategory(), preventFocusSteal() (+1 more)

### Community 60 - "shapes.ts"
Cohesion: 0.09
Nodes (15): @maxgraph/core, ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape (+7 more)

### Community 61 - "dependencies"
Cohesion: 0.09
Nodes (23): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+15 more)

### Community 62 - "supabase.ts"
Cohesion: 0.07
Nodes (51): @supabase/supabase-js, AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), accountError, appUrl(), call() (+43 more)

### Community 63 - "tutorial.ts"
Cohesion: 0.16
Nodes (12): HINT_MS, markSeen(), openTutorial(), show(), richText(), showTutorialHint(), close(), TUTORIAL_PAGES (+4 more)

### Community 64 - "schema/preview.ts"
Cohesion: 0.18
Nodes (13): GraphLook, SchemaEditorOptions, Look, Theme, draw(), drawCached(), drawn, errorHtml() (+5 more)

### Community 65 - "label.ts"
Cohesion: 0.22
Nodes (11): isSpace(), matchInlineMath(), cellHtml(), labelHtml(), plainHtml(), tableHtml(), NodeLook, parseTable() (+3 more)

### Community 66 - "calcResults.ts"
Cohesion: 0.18
Nodes (8): acceptCalcResult(), calcPlugin, CalcResult, calcResults(), formulasUntil(), insertResult(), ResultWidget, MathRegion

### Community 67 - "Glifo"
Cohesion: 0.15
Nodes (13): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Funzionalità (+5 more)

### Community 68 - "sql.ts"
Cohesion: 0.21
Nodes (15): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+7 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "editor/editor.ts"
Cohesion: 0.06
Nodes (37): description, name, private, type, version, @codemirror/autocomplete, @codemirror/commands, @codemirror/language (+29 more)

### Community 72 - "suggestions.ts"
Cohesion: 0.17
Nodes (9): templateInsertion(), EditorMathContext, expand(), preferredIndex(), SuggestionController, commandNames(), parseTemplate(), templateText() (+1 more)

### Community 73 - "inference.ts"
Cohesion: 0.12
Nodes (27): Distribution, confidence(), confidenceShown(), Given, hypothesisTest(), interval(), meanOf(), nameOf() (+19 more)

### Community 74 - "toLatex"
Cohesion: 0.07
Nodes (51): conicItems(), isConicLine(), FieldContext, fourierItems(), isFourierLine(), isNumericalLine(), numericalItems(), areaFor() (+43 more)

### Community 75 - "MarkdownEditor"
Cohesion: 0.18
Nodes (5): closeMathBlockOnEnter(), EditorCallbacks, MarkdownEditor, tabOutOfMath(), insertTemplate()

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Imprevisto → una riga telegrafica, 3. Serve una decisione → frasi complete, 4. Fine del compito → riepilogo completo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schemaTools.test.ts"
Cohesion: 0.16
Nodes (17): alignBoxes(), Alignment, Box, distributeBoxes(), Position, base64(), crc32(), svgSize() (+9 more)

### Community 79 - "database.ts"
Cohesion: 0.24
Nodes (6): @electric-sql/pglite, createDatabase(), createUser(), databaseTests(), migrations, shareTests()

### Community 82 - "Più avanti"
Cohesion: 0.22
Nodes (9): Abbonamento e funzioni a pagamento (da capire), Aiuto con gli esercizi, Calcoli e grafici: idee in più, Matematica per i corsi: idee in più, Non solo appunti, Più avanti, Schemi: idee in più, Trascrizione delle lezioni in appunti (+1 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.12
Nodes (10): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+2 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.14
Nodes (14): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+6 more)

### Community 91 - "formatLinear"
Cohesion: 0.42
Nodes (9): circleText(), entry(), formatLinear(), lineText(), matrixTex(), plainArea(), planeText(), terms() (+1 more)

### Community 92 - "toNode"
Cohesion: 0.08
Nodes (51): close(), Definite, definiteIntegral(), exValue(), samples(), EMPTY_SCOPE, absOf(), boundsOf() (+43 more)

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

### Community 101 - "Idee per il futuro"
Cohesion: 0.33
Nodes (6): Account: i propri appunti su ogni dispositivo, anche da condividere, Altre idee, Controllare e mostrare quello che si scrive, Idee per il futuro, In programma, La lavagna (si comincia quando lo dice lo studente)

### Community 102 - "page.ts"
Cohesion: 0.11
Nodes (19): hydrateGraphs(), SharedNote, body, draw(), isDark(), saveButton, settings, showProblem() (+11 more)

### Community 103 - "I modelli e le chiavi API"
Cohesion: 0.50
Nodes (4): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), Le idee dello studente (5 ottobre 2026)

### Community 105 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 106 - "fake-supabase.mjs"
Cohesion: 0.22
Nodes (11): b64(), CODE, createFakeSupabase(), handle(), rpc(), session(), userFor(), userIdFrom() (+3 more)

### Community 107 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 109 - "Glifo – note per Claude"
Cohesion: 0.29
Nodes (7): Comandi, Come controllare il lavoro, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole, sqlite()

### Community 113 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (proposta, da costruire quando lo dice lo studente)

## Knowledge Gaps
- **528 isolated node(s):** `Deciso`, `Com'è andata la discussione`, `La proposta dello studente (4 ottobre 2026)`, `Il parere di Claude, in breve`, `Come si decide cosa far pagare` (+523 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 701 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `main.ts`, `sync.ts`, `schema/editor.ts`, `svg.ts`, `editor/lists.ts`, `graph/space.ts`, `compile`, `FoldersStore`, `assistant.ts`, `settings.ts`, `distributions.ts`, `markdown.ts`, `editor.test.ts`, `resize.ts`, `NotesStore`, `symbols.test.ts`, `sheet.ts`, `spell.test.ts`, `sidePanel.ts`, `toolbar.ts`, `supabase.ts`, `tutorial.ts`, `editor/editor.ts`, `toLatex`, `schemaTools.test.ts`, `database.ts`, `page.ts`?**
  _High betweenness centrality (0.135) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `Dove sono le cose` to `parse.ts`, `main.ts`, `odesolve.ts`, `spec.ts`, `arithmetic.ts`, `num`, `symbolic.ts`, `svg.ts`, `linsys.ts`, `graph/space.ts`, `numerical.ts`, `Rational`, `graph.ts`, `several.ts`, `MathError`, `conics.ts`, `markdown.ts`, `logic.ts`, `MathNode`, `.constructor`, `vitest`, `sheet.ts`, `complex.ts`, `limits.ts`, `finite.ts`, `supabase.ts`, `tutorial.ts`, `schema/preview.ts`, `label.ts`, `inference.ts`, `toLatex`, `schemaTools.test.ts`, `toNode`, `Glifo – note per Claude`?**
  _High betweenness centrality (0.085) - this node is a cross-community bridge._
- **Why does `formatNumber()` connect `sheet.ts` to `solve.ts`, `spec.ts`, `graph/preview.ts`, `linsys.ts`, `compile`, `several.ts`, `MathError`, `spaces.ts`, `MathNode`, `Dove sono le cose`, `statsShown.ts`, `study.ts`, `complex.ts`, `gauss.ts`, `graph/file.ts`, `limits.ts`, `toLatex`, `formatLinear`, `toNode`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **What connects `Deciso`, `Com'è andata la discussione`, `La proposta dello studente (4 ottobre 2026)` to the rest of the system?**
  _528 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `parse.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07938686799359414 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.045655375552282766 - nodes in this community are weakly interconnected._
- **Should `odesolve.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08607594936708861 - nodes in this community are weakly interconnected._