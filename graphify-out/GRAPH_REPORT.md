# Graph Report - Glifo  (2026-10-17)

## Corpus Check
- 363 files · ~749,146 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5729 nodes · 20887 edges · 181 communities (142 shown, 39 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 729 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b7d23f10`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- i18n.ts
- vitest
- main.ts
- compile
- sync.ts
- spec.ts
- src/relocation.ts
- num
- graph/preview.ts
- conics.ts
- distributions.ts
- explainSubjects.ts
- svg.ts
- statsShown.ts
- SchemaEditor
- regions.ts
- SheetEditor
- formulaReader.ts
- numerical.ts
- arithmetic.ts
- index.ts
- engine.ts
- schema/editor.ts
- topics.ts
- BoardStore
- noteWordsMath.test.ts
- strokes.ts
- graph/file.ts
- tutorial.mjs
- several.ts
- gantt.ts
- study.ts
- spaces.ts
- assistant.ts
- logic.ts
- Parser
- complex.ts
- devDependencies
- translations.test.ts
- resize.ts
- view3d.ts
- toLatex
- localModels.ts
- schema/model.ts
- functions.ts
- MathError
- prova-lettori.py
- board.ts
- toolbar.ts
- board/shapes.ts
- schema/shapes.ts
- SidePanel
- parse.ts
- graph.ts
- suggestions.ts
- page.ts
- 20261004091555_note_condivise.sql
- editor/lists.ts
- sheet.ts
- finite.ts
- ui/preview.ts
- dependencies
- Welcome to Glifo
- spreadsheet/editor.ts
- spreadsheet/format.ts
- odesolve.ts
- blockMove.ts
- Rational
- editor/editor.ts
- Benvenuto in Glifo
- compilerOptions
- namesIn
- ABBONAMENTI.md
- latexDialog.ts
- symbolic.ts
- explainChat.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- plan.ts
- aiPanel.test.ts
- session-start.sh
- .claude/CLAUDE.md
- Il database degli account (Supabase)
- schemaTools.test.ts
- Abbonamenti
- noteWordsGraph.test.ts
- .reply
- supabase-stub.sql
- account-test.mjs
- planPreview.ts
- supabase.ts
- Pt
- schemaBlocks.ts
- symbolsEn.test.ts
- siteUpdate.ts
- explainPanel.ts
- inference.ts
- markdown.ts
- spellcheck.ts
- Converter
- probability.ts
- smoke-test.mjs
- schema/templates.ts
- tutorial.ts
- Field
- client.ts
- Glifo
- insert.ts
- ExplainPanel
- Sheet
- relocation-test.mjs
- Glifo – note per Claude
- Dove sono le cose
- severalGraph.ts
- database.ts
- Board
- 20261008130026_commenti.sql
- Le spiegazioni, come funzionano
- L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota
- xlsx.ts
- createFakeSupabase
- feedback.ts
- MarkdownEditor
- spellcheck
- Stroke
- usesDecimalComma
- limits.ts
- calcPlugin
- sql.ts
- lettore-vero.mjs
- scripts
- dictionaries.ts
- h
- markers.ts
- SpellClient
- suggest.ts
- mathEn2.test.ts
- aiActivity.ts
- powerseries.ts
- vite
- Parser
- vite.config.ts
- Schema
- In programma
- Piano per piano
- exactIntervalProbability
- I modelli e le chiavi API
- NodeLook

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 348 edges
2. `MathError` - 151 edges
3. `Sheet` - 150 edges
4. `num()` - 145 edges
5. `h()` - 143 edges
6. `MathNode` - 131 edges
7. `texts` - 125 edges
8. `mul()` - 124 edges
9. `Board` - 119 edges
10. `compile()` - 116 edges

## Surprising Connections (you probably didn't know these)
- `Trasloco: il sito su Cloudflare, con un dominio tutto di Glifo` --references--> `dist()`  [INFERRED]
  ROADMAP.md → src/board/shapes.ts
- `Dove sono le cose` --references--> `WidgetKind`  [INFERRED]
  ARCHITETTURA.md → src/editor/schemaBlocks.ts
- `Dove sono le cose` --references--> `ConicElements`  [INFERRED]
  ARCHITETTURA.md → src/math/conics.ts
- `Attenzione a` --references--> `renderMarkdown()`  [INFERRED]
  CLAUDE.md → src/render/markdown.ts
- `Dove sono le cose` --references--> `fakeLlmWorker()`  [INFERRED]
  ARCHITETTURA.md → scripts/smoke-test.mjs

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (181 total, 39 thin omitted)

### Community 0 - "i18n.ts"
Cohesion: 0.04
Nodes (62): SyncStatus, browserLang(), browserLanguages(), dateLocale(), detectLang(), Entry, isLang(), lang (+54 more)

### Community 1 - "vitest"
Cohesion: 0.07
Nodes (32): vitest, formulaGraph(), GraphItem, parseGraph(), PALETTES, parseMath(), light, item() (+24 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (131): signOut(), newStrokeId(), remapGraphLines(), account, ACCOUNT_OFF, accountButton, accountDeps(), accountProblem() (+123 more)

### Community 3 - "compile"
Cohesion: 0.06
Nodes (72): areaFor(), constantValue(), argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot() (+64 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (32): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+24 more)

### Community 5 - "spec.ts"
Cohesion: 0.06
Nodes (77): conicItems(), isConicLine(), quadricEquation(), T, isComplexLine(), isComplexValue(), isSegmentNode(), depth() (+69 more)

### Community 6 - "src/relocation.ts"
Cohesion: 0.04
Nodes (87): accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf() (+79 more)

### Community 7 - "num"
Cohesion: 0.11
Nodes (104): atIntegers(), splitAbs(), withoutAbs(), exp(), hyperbolicToExp(), inverseRational(), linearIn(), sqrtEx() (+96 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (42): addLabel(), boxes, cameras, complexCoord(), coord(), coordinates(), drawings, drawnViews (+34 more)

### Community 9 - "conics.ts"
Cohesion: 0.17
Nodes (30): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+22 more)

### Community 10 - "distributions.ts"
Cohesion: 0.13
Nodes (33): choose(), continuousQuantile(), decimals(), discreteQuantile(), factorialBig(), FAMILIES, Family, integerParam() (+25 more)

### Community 11 - "explainSubjects.ts"
Cohesion: 0.19
Nodes (17): explainTarget, schemaTitle(), hasCalculation(), targetAt(), SubjectKind, subjectsIn(), THEOREM_START, THEOREM_WORDS (+9 more)

### Community 12 - "svg.ts"
Cohesion: 0.08
Nodes (58): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseWindow(), chooseY(), clipLines(), dataWindow() (+50 more)

### Community 13 - "statsShown.ts"
Cohesion: 0.13
Nodes (37): expSumValue(), Lin, check(), correlation(), count(), covariance(), Data, DATA_FUNCTIONS (+29 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.09
Nodes (18): isContainer(), isLanes(), SchemaEditor, cellText(), createEdgeCell(), edgeLook(), isFrame(), nodeLook() (+10 more)

### Community 15 - "regions.ts"
Cohesion: 0.14
Nodes (27): constantIntegrand(), inequalityMargin(), integralRegion, LayeredSolid, Multiple, planeMargin(), PlanePart, radiusOf() (+19 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (4): functionLabel(), SheetEditor, englishTyping(), cloneSheet()

### Community 17 - "formulaReader.ts"
Cohesion: 0.08
Nodes (39): onnxruntime-web, ENGINE_BYTES, FromReader, IMAGE_SIZE, READER_CACHE, READER_DOWNLOAD, READER_FILES, READER_MODEL (+31 more)

### Community 18 - "numerical.ts"
Cohesion: 0.11
Nodes (51): FormatOptions, bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial() (+43 more)

### Community 19 - "arithmetic.ts"
Cohesion: 0.06
Nodes (92): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+84 more)

### Community 20 - "index.ts"
Cohesion: 0.06
Nodes (46): b, bigops, c, calculus, fn, fr, fractions, functions (+38 more)

### Community 21 - "engine.ts"
Cohesion: 0.17
Nodes (9): @farscrl/hunspell-wasm, capitalize(), COMMON_FIXES, ELISIONS, inGlossary(), lower(), SpellEngine, GLOSSARY (+1 more)

### Community 22 - "schema/editor.ts"
Cohesion: 0.07
Nodes (31): alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ALIGN_NAMES, ARROW_NAMES (+23 more)

### Community 23 - "topics.ts"
Cohesion: 0.08
Nodes (55): ATTRIBUTES, containerOf(), cut(), ER_SHAPES, fieldText(), fitLines(), flowOrder(), formulaText() (+47 more)

### Community 24 - "BoardStore"
Cohesion: 0.05
Nodes (17): fake-indexeddb, BoardBackend, BoardStore, done(), fromRecord(), IdbBoards, MemoryBoards, ofNote() (+9 more)

### Community 25 - "noteWordsMath.test.ts"
Cohesion: 0.10
Nodes (19): derivativeOperator(), describe(), Parser, AstNode, childrenOf(), DATA, ENGLISH, englishTexts() (+11 more)

### Community 26 - "strokes.ts"
Cohesion: 0.08
Nodes (38): centerOn(), copyStrokes(), cross(), handleScale(), IDENTITY, insideLasso(), keepInside(), LASSO_SHARE (+30 more)

### Community 27 - "graph/file.ts"
Cohesion: 0.07
Nodes (48): FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsForFile(), graphsFromFile(), hide() (+40 more)

### Community 28 - "tutorial.mjs"
Cohesion: 0.11
Nodes (11): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+3 more)

### Community 29 - "several.ts"
Cohesion: 0.13
Nodes (38): fractionNear(), at(), bounded(), Candidate, candidates(), compiled(), constraintsOf(), COORDS (+30 more)

### Community 30 - "gantt.ts"
Cohesion: 0.07
Nodes (67): amount(), barColor(), crossings(), dateText(), dayMonth(), dayOf(), fitText(), GanttOptions (+59 more)

### Community 31 - "study.ts"
Cohesion: 0.08
Nodes (55): close(), Definite, definiteIntegral(), exValue(), samples(), EMPTY_SCOPE, Piece, limit() (+47 more)

### Community 32 - "spaces.ts"
Cohesion: 0.09
Nodes (36): formatGauss(), decimalSeparator(), Digits, formatRational(), fromNumber(), fromRational(), SUPERSCRIPT, writeDigits() (+28 more)

### Community 33 - "assistant.ts"
Cohesion: 0.12
Nodes (27): AiAnswer, AiError, AiResult, AiSettings, answerSchema(), askAi(), askCompatible(), askThroughHost() (+19 more)

### Community 34 - "logic.ts"
Cohesion: 0.13
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "Parser"
Cohesion: 0.26
Nodes (4): FormulaError, Parser, englishName(), shownName()

### Community 36 - "complex.ts"
Cohesion: 0.06
Nodes (63): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isInequality(), onlyComplex() (+55 more)

### Community 37 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

### Community 38 - "translations.test.ts"
Cohesion: 0.17
Nodes (18): AstNode, calleeName(), check(), checkPair(), visit(), children(), entryPairs(), files (+10 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (24): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+16 more)

### Community 40 - "view3d.ts"
Cohesion: 0.06
Nodes (91): staticGraphSvg(), sampleRegion(), addMesh(), addTet(), affinePlane(), Axis, Box, centroid() (+83 more)

### Community 41 - "toLatex"
Cohesion: 0.07
Nodes (48): isNumericalLine(), numericalItems(), names(), STUDY_GRAPH, studyItems(), T, ACCENT_COMMANDS, diffLatex() (+40 more)

### Community 42 - "localModels.ts"
Cohesion: 0.07
Nodes (42): chat(), GlifoError, Gpu, load(), post(), remove(), scope, shaderF16() (+34 more)

### Community 43 - "schema/model.ts"
Cohesion: 0.05
Nodes (52): openSchemaEditor(), base64(), hide(), OPEN, schemasForFile(), schemasFromFile(), T, unhide() (+44 more)

### Community 44 - "functions.ts"
Cohesion: 0.08
Nodes (63): EMPTY, evaluateSheet(), number(), T, addFormat(), divFormat(), mulFormat(), tidy() (+55 more)

### Community 45 - "MathError"
Cohesion: 0.11
Nodes (60): MathError, ExactUnavailable, angleBetween(), asMatrix(), basisOf(), circleText(), complexText(), cross() (+52 more)

### Community 46 - "prova-lettori.py"
Cohesion: 0.12
Nodes (4): byte_table(), read(), Reader, tidy()

### Community 47 - "board.ts"
Cohesion: 0.08
Nodes (34): Action, DOT_SIZES, EraserMode, HANDLE_REACH, ICON, MODE_NAMES, PanAction, PinchAction (+26 more)

### Community 48 - "toolbar.ts"
Cohesion: 0.17
Nodes (16): insertBlock(), wrapSelection(), ListStyleId, Action, createToolbar(), insertCode(), insertLink(), listStyle() (+8 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (36): DrawAction, adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners() (+28 more)

### Community 50 - "schema/shapes.ts"
Cohesion: 0.08
Nodes (16): ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape, IdentifyingRelationShape (+8 more)

### Community 51 - "SidePanel"
Cohesion: 0.19
Nodes (6): localizeTex(), cardPreview(), displayCode(), formPreview(), preventFocusSteal(), SidePanel

### Community 52 - "parse.ts"
Cohesion: 0.05
Nodes (49): hasWord(), errorMessage(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES (+41 more)

### Community 53 - "graph.ts"
Cohesion: 0.08
Nodes (33): @maxgraph/core, placeIcon(), AT_X, COMPASS, createGraph(), drawSchema(), edgeStyle(), edgeTextAt() (+25 more)

### Community 54 - "suggestions.ts"
Cohesion: 0.15
Nodes (12): EditorMathContext, expand(), preferredIndex(), SuggestionController, commandNames(), cardPreviewTex(), formPreviewTex(), ParsedTemplate (+4 more)

### Community 55 - "page.ts"
Cohesion: 0.08
Nodes (37): accountDataFile(), PullResult, render(), isShareToken(), parseSharedNote(), readSharedNote(), sha256Hex(), SHARE_PAGE (+29 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "editor/lists.ts"
Cohesion: 0.16
Nodes (33): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+25 more)

### Community 58 - "sheet.ts"
Cohesion: 0.05
Nodes (42): complex, OdeFunction, EXACT, FLOAT, NUMERICAL, bracketParts(), BRACKETS, chainOf() (+34 more)

### Community 59 - "finite.ts"
Cohesion: 0.17
Nodes (28): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+20 more)

### Community 60 - "ui/preview.ts"
Cohesion: 0.08
Nodes (23): GraphLabels, remapLineKeys(), renameGraphScope(), renameScopeKeys(), BlockKind, MoveDir, hydrateSheets(), T (+15 more)

### Community 61 - "dependencies"
Cohesion: 0.07
Nodes (27): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+19 more)

### Community 62 - "Welcome to Glifo"
Cohesion: 0.20
Nodes (9): A few examples, Calculations and graphs, For programming too, Handy shortcuts, How to write formulas, Lists, Spell check, Try it now (+1 more)

### Community 63 - "spreadsheet/editor.ts"
Cohesion: 0.09
Nodes (47): currentCall(), Editing, MenuEntry, Move, PATHS, SheetEditorOptions, Snapshot, T (+39 more)

### Community 64 - "spreadsheet/format.ts"
Cohesion: 0.10
Nodes (36): pick(), decimalsOf(), ENGLISH, englishNumber(), fixedNumber(), generalNumber(), group(), italianNumber() (+28 more)

### Community 65 - "odesolve.ts"
Cohesion: 0.07
Nodes (82): addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames(), constantParticular() (+74 more)

### Community 66 - "blockMove.ts"
Cohesion: 0.11
Nodes (34): blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove, blockPlace(), closed() (+26 more)

### Community 67 - "Rational"
Cohesion: 0.06
Nodes (84): Part, expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactFunction, ExactRandom (+76 more)

### Community 68 - "editor/editor.ts"
Cohesion: 0.08
Nodes (31): description, name, private, type, version, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands (+23 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "namesIn"
Cohesion: 0.13
Nodes (37): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+29 more)

### Community 72 - "ABBONAMENTI.md"
Cohesion: 0.23
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 73 - "latexDialog.ts"
Cohesion: 0.07
Nodes (42): katex, ReadProgress, closing(), FUNCTIONS, tidyLatex(), withoutLooseGroups(), cache, capability() (+34 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.08
Nodes (36): atValues(), coordinates(), decimalText(), degree(), exactRoot(), exponentOf(), floatOf(), HALF (+28 more)

### Community 75 - "explainChat.ts"
Cohesion: 0.10
Nodes (19): FollowUp, REPLY_TOKENS, glifoError(), LocalAbort, localErrorMessage(), localLlm, Pending, T (+11 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Errore o imprevisto → nel dettaglio, 3. Serve una decisione → frasi complete, 4. Fine del compito → un solo riepilogo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "plan.ts"
Cohesion: 0.08
Nodes (40): at(), breakEven(), Point, quantity(), T, tableItems(), textLabel(), ChartTable (+32 more)

### Community 79 - "aiPanel.test.ts"
Cohesion: 0.11
Nodes (18): definedName(), formulaTopic(), graphTopic(), studyOf(), theoremTopic(), NoteSubject, AiPanel, graphLabel() (+10 more)

### Community 82 - "Il database degli account (Supabase)"
Cohesion: 0.15
Nodes (12): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il controllo anti-robot (CAPTCHA, ottobre 2026), Il database degli account (Supabase), Il progetto, Il trasloco su glifo.page (ottobre 2026) (+4 more)

### Community 83 - "schemaTools.test.ts"
Cohesion: 0.12
Nodes (26): laneOf(), fieldInput(), textWidth(), cellHtml(), crc32(), T, withDensity(), labelHtml() (+18 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.10
Nodes (20): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Deciso (5 ottobre 2026), Dopo (+12 more)

### Community 91 - "noteWordsGraph.test.ts"
Cohesion: 0.17
Nodes (20): monthOf(), MONTHS, MONTHS_EN, parseDate(), planBlock, PlanKind, planRange(), T (+12 more)

### Community 92 - ".reply"
Cohesion: 0.32
Nodes (5): Promemoria per lo studente, Commenti di chi prova Glifo, Commenti di chi prova Glifo, page(), site()

### Community 96 - "account-test.mjs"
Cohesion: 0.11
Nodes (10): device(), login(), newContext, waitFor(), b64(), CAPTCHA_TOKEN, CODE, GOOGLE_CODE (+2 more)

### Community 97 - "planPreview.ts"
Cohesion: 0.12
Nodes (20): valueNode(), planSwatchSvg(), labelHtml(), readPlan(), ganttWidth(), PlanView, T, GraphLook (+12 more)

### Community 98 - "supabase.ts"
Cohesion: 0.08
Nodes (38): @supabase/supabase-js, captchaToken(), loadTurnstile(), Turnstile, TURNSTILE_SCRIPT, Window, AUTH_STORAGE_KEY, TURNSTILE_SITE_KEY (+30 more)

### Community 100 - "Pt"
Cohesion: 0.16
Nodes (10): coalesced(), EraseAction, Finger, LassoAction, MoveAction, pointsOf(), pressureOf(), Transform (+2 more)

### Community 101 - "schemaBlocks.ts"
Cohesion: 0.09
Nodes (27): toggleLinePrefix(), BlockWidget, findWidgetBlocks(), guardBlocks(), KINDS, schemaBlocks(), schemaSummary(), svg() (+19 more)

### Community 102 - "symbolsEn.test.ts"
Cohesion: 0.13
Nodes (30): editDistance(), normalizeText(), singular(), stem(), STOPWORDS, words(), BOTH, buildIndex() (+22 more)

### Community 103 - "siteUpdate.ts"
Cohesion: 0.18
Nodes (16): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, loadPart() (+8 more)

### Community 104 - "explainPanel.ts"
Cohesion: 0.05
Nodes (66): 1. A cosa serve l'AI dei modelli di frontiera, @codemirror/lang-markdown, @codemirror/language, @codemirror/state, @codemirror/view, @lezer/common, ChatFn, Explanation (+58 more)

### Community 105 - "inference.ts"
Cohesion: 0.15
Nodes (26): between(), confidence(), confidenceShown(), decimals(), Given, hypothesisTest(), interval(), meanOf() (+18 more)

### Community 106 - "markdown.ts"
Cohesion: 0.14
Nodes (24): dataRange(), moveAttrs(), renderTexOrError(), renderTexWithResult(), configurePurify(), createMarkdownIt(), FORBIDDEN_TAGS, HLJS_LANGUAGES (+16 more)

### Community 107 - "spellcheck.ts"
Cohesion: 0.12
Nodes (15): misspelledMark, refreshSpelling, setTarget, SKIP, SpellTarget, T, wordsToCheck(), findWords() (+7 more)

### Community 108 - "Converter"
Cohesion: 0.20
Nodes (14): Converter, definiteParts(), definiteValue(), expandCalculus(), fieldName(), functionOf(), isField(), isVectorBody() (+6 more)

### Community 113 - "probability.ts"
Cohesion: 0.13
Nodes (23): End, CompileOptions, RelOp, ALL, complement(), distributionOf(), endAt(), EventContext (+15 more)

### Community 116 - "smoke-test.mjs"
Cohesion: 0.22
Nodes (5): markdown-it, fakeFormulaWorker(), fakeLlmWorker(), firstVisit(), plainContext

### Community 117 - "schema/templates.ts"
Cohesion: 0.22
Nodes (18): SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), conceptMap(), cycle(), edge(), er() (+10 more)

### Community 118 - "tutorial.ts"
Cohesion: 0.15
Nodes (12): HINT_MS, markTutorialSeen(), openTutorial(), show(), richText(), showTutorialHint(), close(), T (+4 more)

### Community 119 - "Field"
Cohesion: 0.12
Nodes (7): characteristicPolynomial(), eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn()

### Community 120 - "client.ts"
Cohesion: 0.20
Nodes (9): Backend, pageBackend(), SpellClientOptions, workerBackend(), WorkerUnavailable, SpellLanguage, createSpellService(), SpellRequest (+1 more)

### Community 121 - "Glifo"
Cohesion: 0.12
Nodes (16): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Domande frequenti e commenti (+8 more)

### Community 122 - "insert.ts"
Cohesion: 0.13
Nodes (14): InsertOptions, addPlaceholders, buildDecorations(), clearAllPlaceholders(), clearPlaceholders, CommandTarget, contains(), currentIndex() (+6 more)

### Community 123 - "ExplainPanel"
Cohesion: 0.16
Nodes (3): ExplainChat, ExplainPanel, setup()

### Community 124 - "Sheet"
Cohesion: 0.08
Nodes (30): Definition, Line, Line, ExactComplexScope, Ode, OdeSystem, withWorkLimit(), FiniteContext (+22 more)

### Community 125 - "relocation-test.mjs"
Cohesion: 0.18
Nodes (7): AFTER_MOVE, ids, newBrowser(), NOTICE_DAY, out, serve(), TYPES

### Community 128 - "Glifo – note per Claude"
Cohesion: 0.25
Nodes (8): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Regole, sqlite()

### Community 129 - "Dove sono le cose"
Cohesion: 0.05
Nodes (79): Dove sono le cose, Glifo – architettura, allNames(), answerFollowUp(), bareResult(), chained(), chatContext, chatSubject() (+71 more)

### Community 132 - "severalGraph.ts"
Cohesion: 0.19
Nodes (17): FieldContext, fourierItems(), isFourierLine(), T, criticalLine(), isSeveralLine(), named(), severalItems() (+9 more)

### Community 133 - "database.ts"
Cohesion: 0.23
Nodes (6): createDatabase(), createUser(), databaseTests(), feedbackTests(), migrations, shareTests()

### Community 136 - "Board"
Cohesion: 0.08
Nodes (6): Board, clampZoom(), loadPrefs(), penErases(), validView(), BoardTheme

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 139 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 140 - "L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota"
Cohesion: 0.29
Nodes (7): 3. Da una foto alla nota, 4. Dettare: la voce diventa testo nella nota, 5. Registrare le lezioni e trascriverle, Da sistemare con il primo punto che tocca l'AI, Fonti (controllate il 14 ottobre 2026), In che ordine, L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota

### Community 141 - "xlsx.ts"
Cohesion: 0.07
Nodes (58): RFC-4180, fflate, csvCell(), csvDelimiter(), csvNumbers(), csvToSheet(), digitsOf(), field() (+50 more)

### Community 142 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 143 - "feedback.ts"
Cohesion: 0.07
Nodes (46): SUPABASE_KEY, SUPABASE_URL, feedbackButton, openFeedback(), Site, T, commentDate(), commentItem() (+38 more)

### Community 144 - "MarkdownEditor"
Cohesion: 0.13
Nodes (7): acceptCalcResult(), insertResult(), closeMathBlockOnEnter(), EditorCallbacks, MarkdownEditor, searchPhrases(), insertTemplate()

### Community 146 - "spellcheck"
Cohesion: 0.21
Nodes (8): spellcheck(), close(), misspelledAt(), openAt(), replace(), tooltipView(), SpellChecker, SpellcheckOptions

### Community 154 - "Stroke"
Cohesion: 0.11
Nodes (24): 2. Dalla lavagna alla nota, BoardOptions, Step, mid(), outlineSvg(), shapeSvg(), strokeOptions(), strokeOutline() (+16 more)

### Community 156 - "usesDecimalComma"
Cohesion: 0.13
Nodes (26): numberText(), isTestLine(), number(), T, testItems(), endTex(), classes(), dataOf() (+18 more)

### Community 157 - "limits.ts"
Cohesion: 0.20
Nodes (18): exponentialForm(), fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), alternating() (+10 more)

### Community 158 - "calcPlugin"
Cohesion: 0.21
Nodes (3): calcPlugin, CheckWidget, ResultWidget

### Community 159 - "sql.ts"
Cohesion: 0.15
Nodes (19): @electric-sql/pglite, Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote() (+11 more)

### Community 160 - "lettore-vero.mjs"
Cohesion: 0.17
Nodes (4): playwright-core, PNG_ICONS, GLYPHS, WRITING

### Community 161 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 162 - "dictionaries.ts"
Cohesion: 0.25
Nodes (4): download(), fetchDictionary(), FILES, DictionaryData

### Community 163 - "h"
Cohesion: 0.04
Nodes (92): rich(), texts, viewSwitch, moveDayLabel(), relocationMessage(), RelocationResult, openShareDialog(), changeAccess() (+84 more)

### Community 166 - "markers.ts"
Cohesion: 0.11
Nodes (37): Item, ListStyle, bullet(), bulletGroup(), childMarker(), column(), firstMarker(), label() (+29 more)

### Community 168 - "suggest.ts"
Cohesion: 0.22
Nodes (12): SuggestionItem, IndexedEntry, SearchResult, getIndex(), isSubsequence(), keysOf(), MatchKind, suggestCommands() (+4 more)

### Community 169 - "mathEn2.test.ts"
Cohesion: 0.21
Nodes (9): EMPTY_COMPLEX_SCOPE, chiSquareTest(), InferenceContext, significance(), args(), q(), result(), tex() (+1 more)

### Community 170 - "aiActivity.ts"
Cohesion: 0.21
Nodes (7): AI_NEWS_TITLE, AI_WORKING_TITLE, aiActivity, AiWork, T, AiPanelDeps, SidePanelDeps

### Community 171 - "powerseries.ts"
Cohesion: 0.27
Nodes (11): convergesAt(), gcdInt(), logParts(), nearConstant(), PowerSeries, powerSeriesOf(), powerSeriesShown(), radius() (+3 more)

### Community 172 - "vite"
Cohesion: 0.22
Nodes (6): vite, constructor(), LlamaWorker, minutes, postMessage(), started

### Community 174 - "vite.config.ts"
Cohesion: 0.22
Nodes (6): @mlc-ai/web-llm, vite-plugin-pwa, accountOffMessage(), defineFor(), MAIN_BRANCH, webllmModels

### Community 175 - "Schema"
Cohesion: 0.33
Nodes (4): SchemaEditorOptions, Schema, serializeSchema(), Template

### Community 176 - "In programma"
Cohesion: 0.25
Nodes (8): Account: i propri appunti su ogni dispositivo, anche da condividere, Idee per il futuro, In programma, L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota (14 ottobre 2026, se ne parla), La lavagna: idee in più, Più avanti, Schemi: idee in più, Trasloco: il sito su Cloudflare, con un dominio tutto di Glifo

### Community 177 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 178 - "exactIntervalProbability"
Cohesion: 0.40
Nodes (4): addExp(), exactIntervalProbability(), subtractExp(), exactSetProbability()

### Community 179 - "I modelli e le chiavi API"
Cohesion: 0.33
Nodes (6): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), In prova sul ramo `prova` (7 ottobre 2026): Qwen3 nel browser per «Spiegami», La chiave, il server locale e la scelta del modello (14 ottobre 2026), Le idee dello studente (5 ottobre 2026)

## Knowledge Gaps
- **892 isolated node(s):** `3. Da una foto alla nota`, `4. Dettare: la voce diventa testo nella nota`, `5. Registrare le lezioni e trascriverle`, `Da sistemare con il primo punto che tocca l'AI`, `In che ordine` (+887 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1233 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **39 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `i18n.ts`, `vitest`, `main.ts`, `compile`, `spec.ts`, `src/relocation.ts`, `num`, `graph/preview.ts`, `conics.ts`, `explainSubjects.ts`, `svg.ts`, `statsShown.ts`, `SchemaEditor`, `SheetEditor`, `formulaReader.ts`, `numerical.ts`, `arithmetic.ts`, `schema/editor.ts`, `topics.ts`, `BoardStore`, `noteWordsMath.test.ts`, `strokes.ts`, `graph/file.ts`, `tutorial.mjs`, `several.ts`, `gantt.ts`, `study.ts`, `assistant.ts`, `logic.ts`, `complex.ts`, `view3d.ts`, `toLatex`, `localModels.ts`, `functions.ts`, `MathError`, `toolbar.ts`, `board/shapes.ts`, `schema/shapes.ts`, `SidePanel`, `parse.ts`, `graph.ts`, `sheet.ts`, `finite.ts`, `ui/preview.ts`, `spreadsheet/editor.ts`, `spreadsheet/format.ts`, `odesolve.ts`, `blockMove.ts`, `Rational`, `namesIn`, `latexDialog.ts`, `symbolic.ts`, `explainChat.ts`, `plan.ts`, `aiPanel.test.ts`, `schemaTools.test.ts`, `noteWordsGraph.test.ts`, `planPreview.ts`, `supabase.ts`, `Pt`, `schemaBlocks.ts`, `siteUpdate.ts`, `explainPanel.ts`, `inference.ts`, `Converter`, `smoke-test.mjs`, `tutorial.ts`, `ExplainPanel`, `Sheet`, `severalGraph.ts`, `Board`, `xlsx.ts`, `feedback.ts`, `MarkdownEditor`, `Stroke`, `usesDecimalComma`, `limits.ts`, `h`, `mathEn2.test.ts`, `vite.config.ts`?**
  _High betweenness centrality (0.145) - this node is a cross-community bridge._
- **Why does `texts` connect `h` to `i18n.ts`, `Dove sono le cose`, `main.ts`, `compile`, `severalGraph.ts`, `spec.ts`, `src/relocation.ts`, `graph/preview.ts`, `conics.ts`, `distributions.ts`, `svg.ts`, `statsShown.ts`, `xlsx.ts`, `feedback.ts`, `formulaReader.ts`, `numerical.ts`, `arithmetic.ts`, `index.ts`, `schema/editor.ts`, `topics.ts`, `graph/file.ts`, `usesDecimalComma`, `several.ts`, `gantt.ts`, `study.ts`, `spaces.ts`, `assistant.ts`, `logic.ts`, `sql.ts`, `complex.ts`, `resize.ts`, `toLatex`, `localModels.ts`, `powerseries.ts`, `schema/model.ts`, `MathError`, `functions.ts`, `board.ts`, `aiActivity.ts`, `toolbar.ts`, `parse.ts`, `page.ts`, `editor/lists.ts`, `sheet.ts`, `finite.ts`, `ui/preview.ts`, `spreadsheet/editor.ts`, `spreadsheet/format.ts`, `odesolve.ts`, `Rational`, `editor/editor.ts`, `namesIn`, `latexDialog.ts`, `symbolic.ts`, `explainChat.ts`, `plan.ts`, `schemaTools.test.ts`, `noteWordsGraph.test.ts`, `planPreview.ts`, `supabase.ts`, `schemaBlocks.ts`, `siteUpdate.ts`, `explainPanel.ts`, `inference.ts`, `spellcheck.ts`, `probability.ts`, `schema/templates.ts`, `tutorial.ts`?**
  _High betweenness centrality (0.116) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `i18n.ts`, `Dove sono le cose`, `compile`, `database.ts`, `src/relocation.ts`, `num`, `distributions.ts`, `svg.ts`, `xlsx.ts`, `feedback.ts`, `formulaReader.ts`, `topics.ts`, `BoardStore`, `noteWordsMath.test.ts`, `strokes.ts`, `graph/file.ts`, `Stroke`, `gantt.ts`, `sql.ts`, `assistant.ts`, `h`, `markers.ts`, `resize.ts`, `view3d.ts`, `mathEn2.test.ts`, `aiActivity.ts`, `localModels.ts`, `schema/model.ts`, `translations.test.ts`, `vite.config.ts`, `board.ts`, `board/shapes.ts`, `parse.ts`, `graph.ts`, `suggestions.ts`, `page.ts`, `editor/lists.ts`, `sheet.ts`, `ui/preview.ts`, `spreadsheet/editor.ts`, `blockMove.ts`, `Rational`, `editor/editor.ts`, `explainChat.ts`, `plan.ts`, `aiPanel.test.ts`, `schemaTools.test.ts`, `noteWordsGraph.test.ts`, `supabase.ts`, `schemaBlocks.ts`, `symbolsEn.test.ts`, `siteUpdate.ts`, `explainPanel.ts`, `spellcheck.ts`, `tutorial.ts`?**
  _High betweenness centrality (0.081) - this node is a cross-community bridge._
- **Are the 347 inferred relationships involving `Dove sono le cose` (e.g. with `fakeFormulaWorker()` and `fakeLlmWorker()`) actually correct?**
  _`Dove sono le cose` has 347 INFERRED edges - model-reasoned connections that need verification._
- **What connects `3. Da una foto alla nota`, `4. Dettare: la voce diventa testo nella nota`, `5. Registrare le lezioni e trascriverle` to the rest of the system?**
  _892 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `i18n.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04309842748980781 - nodes in this community are weakly interconnected._
- **Should `vitest` be split into smaller, more focused modules?**
  _Cohesion score 0.06936026936026936 - nodes in this community are weakly interconnected._