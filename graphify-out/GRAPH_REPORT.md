# Graph Report - Glifo  (2026-10-15)

## Corpus Check
- 348 files · ~734,275 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5604 nodes · 20478 edges · 163 communities (123 shown, 40 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 700 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `fa4957fd`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- i18n.ts
- vitest
- main.ts
- compile
- sync.ts
- spec.ts
- domain.ts
- num
- graph/preview.ts
- blockMove.ts
- distributions.ts
- aiEn.test.ts
- svg.ts
- sheet.ts
- SchemaEditor
- texts
- SheetEditor
- namesIn
- numerical.ts
- arithmetic.ts
- index.ts
- engine.ts
- schema/editor.ts
- spreadsheet/format.ts
- BoardStore
- parse.ts
- selection.ts
- gauss.ts
- schemaTools.test.ts
- several.ts
- gantt.ts
- study.ts
- Rational
- assistant.ts
- logic.ts
- spaces.ts
- complex.ts
- editor/editor.ts
- translations.test.ts
- resize.ts
- view3d.ts
- Board
- localModels.ts
- schema/model.ts
- functions.ts
- MathError
- prova-lettori.py
- suggestions.ts
- conics.ts
- board/shapes.ts
- schema/shapes.ts
- sidePanel.ts
- linsys.ts
- graph.ts
- FoldersStore
- page.ts
- 20261004091555_note_condivise.sql
- editor/lists.ts
- database.ts
- finite.ts
- ui/preview.ts
- dependencies
- Welcome to Glifo
- spreadsheet/editor.ts
- topics.ts
- odesolve.ts
- local.ts
- toNode
- calcResults.ts
- Benvenuto in Glifo
- compilerOptions
- Glifo
- toLatex
- symbolic.ts
- Field
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- probability.ts
- aiPanel.test.ts
- session-start.sh
- .claude/CLAUDE.md
- Il database degli account (Supabase)
- tutorial.mjs
- Abbonamenti
- tools.ts
- MarkdownEditor
- supabase-stub.sql
- account-test.mjs
- files.ts
- supabase.ts
- noteWordsMath.test.ts
- schemaBlocks.ts
- symbolsEn.test.ts
- siteUpdate.ts
- graph/file.ts
- sql.ts
- explainPanel.ts
- spellcheck.ts
- toolbar.ts
- .folderItem
- smoke-test.mjs
- schema/templates.ts
- severalGraph.ts
- src/relocation.ts
- devDependencies
- scripts
- editor.test.ts
- ExplainPanel
- Sheet
- relocation-test.mjs
- Glifo – note per Claude
- Dove sono le cose
- licenses.ts
- Parser
- Pt
- 20261008130026_commenti.sql
- Le spiegazioni, come funzionano
- L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota
- xlsx.ts
- createFakeSupabase
- feedback.ts
- Costi
- MLCEngine
- board.ts
- .reply
- markdown.ts
- vite
- Piano per piano
- I modelli e le chiavi API

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 328 edges
2. `MathError` - 151 edges
3. `Sheet` - 148 edges
4. `num()` - 145 edges
5. `h()` - 136 edges
6. `MathNode` - 131 edges
7. `mul()` - 124 edges
8. `texts` - 123 edges
9. `Board` - 118 edges
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

## Communities (163 total, 40 thin omitted)

### Community 0 - "i18n.ts"
Cohesion: 0.03
Nodes (130): SyncStatus, downloadSize(), gpuF16(), modelVariant, browserLang(), browserLanguages(), dateLocale(), detectLang() (+122 more)

### Community 1 - "vitest"
Cohesion: 0.07
Nodes (38): vitest, staticGraphSvg(), chooseWindow(), Box, chooseBox(), formulaGraph(), GraphItem, parseGraph() (+30 more)

### Community 2 - "main.ts"
Cohesion: 0.03
Nodes (141): signOut(), addToGraphBlock(), insertGraphBlock(), graphBlockText(), account, ACCOUNT_OFF, accountButton, accountDeps() (+133 more)

### Community 3 - "compile"
Cohesion: 0.09
Nodes (43): argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot(), fieldOn(), numericPartials() (+35 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (31): AccountSync, withLock(), Account, EMPTY_STATE, FolderChange, FolderRow, isEmpty(), iso() (+23 more)

### Community 5 - "spec.ts"
Cohesion: 0.07
Nodes (75): conicItems(), isConicLine(), quadricEquation(), T, hasExponential(), multipleOf(), areaOf(), AXES (+67 more)

### Community 6 - "domain.ts"
Cohesion: 0.09
Nodes (46): constantIntegrand(), depth(), inequalityMargin(), integralRegion, Multiple, planeMargin(), PlanePart, radiusOf() (+38 more)

### Community 7 - "num"
Cohesion: 0.13
Nodes (86): atIntegers(), withoutAbs(), exp(), hyperbolicToExp(), inverseRational(), sqrtEx(), polyEx(), similarSolution() (+78 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (42): addLabel(), boxes, cameras, complexCoord(), coord(), coordinates(), drawings, drawnViews (+34 more)

### Community 9 - "blockMove.ts"
Cohesion: 0.11
Nodes (34): blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove, blockPlace(), closed() (+26 more)

### Community 10 - "distributions.ts"
Cohesion: 0.06
Nodes (67): addExp(), choose(), continuousQuantile(), decimals(), discreteQuantile(), Distribution, exactIntervalProbability(), factorialBig() (+59 more)

### Community 11 - "aiEn.test.ts"
Cohesion: 0.14
Nodes (19): EXPLAIN_TONES, explainTarget, schemaTitle(), targetAt(), SubjectKind, subjectsIn(), THEOREM_START, THEOREM_WORDS (+11 more)

### Community 12 - "svg.ts"
Cohesion: 0.08
Nodes (60): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), dataWindow(), decimalText() (+52 more)

### Community 13 - "sheet.ts"
Cohesion: 0.08
Nodes (57): expSumValue(), ExactFunction, ExactScope, Eigenvalue, Lin, LinearValue, NUMERICAL, bracketParts() (+49 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.10
Nodes (5): SchemaEditor, createEdgeCell(), NodeLook, serializeSchema(), tableMetrics()

### Community 15 - "texts"
Cohesion: 0.08
Nodes (45): at(), breakEven(), Point, T, tableItems(), textLabel(), texts, chartData (+37 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (8): functionLabel(), SheetEditor, englishTyping(), serializeSheet(), sheetSize(), CellRange, clearRange(), cloneSheet()

### Community 17 - "namesIn"
Cohesion: 0.12
Nodes (39): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+31 more)

### Community 18 - "numerical.ts"
Cohesion: 0.11
Nodes (49): FormatOptions, bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial() (+41 more)

### Community 19 - "arithmetic.ts"
Cohesion: 0.07
Nodes (75): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+67 more)

### Community 20 - "index.ts"
Cohesion: 0.06
Nodes (47): SuggestionItem, b, bigops, c, calculus, fn, fr, fractions (+39 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "schema/editor.ts"
Cohesion: 0.08
Nodes (27): alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ALIGN_NAMES, ARROW_NAMES (+19 more)

### Community 23 - "spreadsheet/format.ts"
Cohesion: 0.10
Nodes (29): quantity(), ENGLISH, fixedNumber(), formatNumber(), generalNumber(), group(), numberFrom(), NumberParts (+21 more)

### Community 24 - "BoardStore"
Cohesion: 0.05
Nodes (18): 2. Dalla lavagna alla nota, BoardOptions, BoardBackend, BoardStore, done(), fromRecord(), IdbBoards, MemoryBoards (+10 more)

### Community 25 - "parse.ts"
Cohesion: 0.06
Nodes (58): errorMessage(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, derivativeOperator() (+50 more)

### Community 26 - "selection.ts"
Cohesion: 0.10
Nodes (26): centerOn(), copyStrokes(), cross(), handleScale(), IDENTITY, insideLasso(), keepInside(), LASSO_SHARE (+18 more)

### Community 27 - "gauss.ts"
Cohesion: 0.16
Nodes (23): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, inZ(), isComplexLine(), isComplexValue(), isInequality() (+15 more)

### Community 28 - "schemaTools.test.ts"
Cohesion: 0.13
Nodes (27): laneOf(), base64(), cellHtml(), crc32(), svgSize(), svgToPng(), T, withDensity() (+19 more)

### Community 29 - "several.ts"
Cohesion: 0.09
Nodes (52): Definite, Piece, LimitValue, severalLimit, Condition, Family, Group, Root (+44 more)

### Community 30 - "gantt.ts"
Cohesion: 0.05
Nodes (74): searchPhrases(), amount(), barColor(), crossings(), dateText(), dayMonth(), dayOf(), fitText() (+66 more)

### Community 31 - "study.ts"
Cohesion: 0.13
Nodes (39): limit(), Asymptote, asymptoteText(), boundaries(), compiled(), cutsOf(), defined(), domainOf() (+31 more)

### Community 32 - "Rational"
Cohesion: 0.08
Nodes (36): EMPTY_COMPLEX_SCOPE, expSum, spend(), bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactRandom (+28 more)

### Community 33 - "assistant.ts"
Cohesion: 0.09
Nodes (32): AiAnswer, AiError, AiSettings, answerSchema(), askAi(), askCompatible(), askThroughHost(), capitalized() (+24 more)

### Community 34 - "logic.ts"
Cohesion: 0.11
Nodes (30): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+22 more)

### Community 35 - "spaces.ts"
Cohesion: 0.11
Nodes (35): decimalSeparator(), Digits, formatNumber(), formatRational(), fromNumber(), fromRational(), SUPERSCRIPT, writeDigits() (+27 more)

### Community 36 - "complex.ts"
Cohesion: 0.06
Nodes (57): add(), arg(), asin(), atan(), compileFunction(), compileName(), ComplexCompiled, ComplexVars (+49 more)

### Community 37 - "editor/editor.ts"
Cohesion: 0.05
Nodes (47): description, name, private, type, version, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands (+39 more)

### Community 38 - "translations.test.ts"
Cohesion: 0.17
Nodes (18): AstNode, calleeName(), check(), checkPair(), visit(), children(), entryPairs(), files (+10 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (24): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+16 more)

### Community 40 - "view3d.ts"
Cohesion: 0.06
Nodes (83): LayeredSolid, addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon() (+75 more)

### Community 41 - "Board"
Cohesion: 0.08
Nodes (5): Board, clampZoom(), loadPrefs(), validView(), BoardTheme

### Community 42 - "localModels.ts"
Cohesion: 0.08
Nodes (38): chat(), GlifoError, Gpu, load(), post(), remove(), scope, shaderF16() (+30 more)

### Community 43 - "schema/model.ts"
Cohesion: 0.05
Nodes (56): @maxgraph/core, svg(), openSchemaEditor(), SchemaEditorOptions, hide(), OPEN, schemasFromFile(), T (+48 more)

### Community 44 - "functions.ts"
Cohesion: 0.07
Nodes (67): ChartTable, CellResult, EMPTY, evaluateSheet(), number(), T, addFormat(), divFormat() (+59 more)

### Community 45 - "MathError"
Cohesion: 0.13
Nodes (56): MathError, angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, dataOf() (+48 more)

### Community 46 - "prova-lettori.py"
Cohesion: 0.12
Nodes (4): byte_table(), read(), Reader, tidy()

### Community 47 - "suggestions.ts"
Cohesion: 0.14
Nodes (13): templateInsertion(), EditorMathContext, expand(), preferredIndex(), SuggestionController, CATEGORIES, cardPreviewTex(), formPreviewTex() (+5 more)

### Community 48 - "conics.ts"
Cohesion: 0.15
Nodes (30): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+22 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.14
Nodes (34): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+26 more)

### Community 50 - "schema/shapes.ts"
Cohesion: 0.08
Nodes (16): ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape, IdentifyingRelationShape (+8 more)

### Community 51 - "sidePanel.ts"
Cohesion: 0.14
Nodes (15): AiResult, localizeTex(), cleanKatexError(), renderTex(), isConfidentAnswer(), symbolsInCategory(), AiState, cardPreview() (+7 more)

### Community 52 - "linsys.ts"
Cohesion: 0.08
Nodes (67): choices(), gcd(), isStandardUnknown(), linearSystem(), matrixEquation(), matrixSystem(), minorsGcd(), ONE (+59 more)

### Community 53 - "graph.ts"
Cohesion: 0.09
Nodes (38): fieldInput(), isContainer(), isLanes(), AT_X, cellText(), COMPASS, createGraph(), drawSchema() (+30 more)

### Community 54 - "FoldersStore"
Cohesion: 0.10
Nodes (13): cleanFolderName(), FoldersStore, sameName(), BackupNote, backupNotes(), restoreBackup(), RestoreBoards, Restored (+5 more)

### Community 55 - "page.ts"
Cohesion: 0.06
Nodes (53): accountDataFile(), PullResult, board, openShareDialog(), changeAccess(), changeCopy(), copy(), refreshChanged() (+45 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "editor/lists.ts"
Cohesion: 0.08
Nodes (67): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+59 more)

### Community 58 - "database.ts"
Cohesion: 0.21
Nodes (7): @electric-sql/pglite, createDatabase(), createUser(), databaseTests(), feedbackTests(), migrations, shareTests()

### Community 59 - "finite.ts"
Cohesion: 0.17
Nodes (28): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+20 more)

### Community 60 - "ui/preview.ts"
Cohesion: 0.08
Nodes (22): GraphLabels, renameGraphScope(), renameScopeKeys(), BlockKind, MoveDir, hydrateSheets(), T, BLOCK_NAMES (+14 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "Welcome to Glifo"
Cohesion: 0.20
Nodes (9): A few examples, Calculations and graphs, For programming too, Handy shortcuts, How to write formulas, Lists, Spell check, Try it now (+1 more)

### Community 63 - "spreadsheet/editor.ts"
Cohesion: 0.09
Nodes (44): currentCall(), Editing, MenuEntry, Move, openSheetEditor(), PATHS, SheetEditorOptions, Snapshot (+36 more)

### Community 64 - "topics.ts"
Cohesion: 0.08
Nodes (59): ATTRIBUTES, containerOf(), cut(), ER_SHAPES, fieldText(), fitLines(), flowOrder(), formulaText() (+51 more)

### Community 65 - "odesolve.ts"
Cohesion: 0.08
Nodes (84): linearIn(), termTransform(), addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled() (+76 more)

### Community 66 - "local.ts"
Cohesion: 0.11
Nodes (15): glifoError(), LocalAbort, localErrorMessage(), localLlm, Pending, T, WorkerLike, ChatMessage (+7 more)

### Community 67 - "toNode"
Cohesion: 0.11
Nodes (38): close(), definiteIntegral(), exValue(), samples(), EMPTY_SCOPE, scopeWith(), absOf(), boundsOf() (+30 more)

### Community 68 - "calcResults.ts"
Cohesion: 0.07
Nodes (34): @codemirror/language, @codemirror/state, @codemirror/view, @lezer/common, acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin (+26 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "Glifo"
Cohesion: 0.12
Nodes (16): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Domande frequenti e commenti (+8 more)

### Community 73 - "toLatex"
Cohesion: 0.06
Nodes (62): valueLabel(), style(), valueLabel(), isTestLine(), number(), T, testItems(), isNumericalLine() (+54 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.06
Nodes (63): primitive(), linearCells(), pairUp(), atValues(), cancelLinear(), Converter, coordinates(), decimalText() (+55 more)

### Community 75 - "Field"
Cohesion: 0.12
Nodes (7): characteristicPolynomial(), eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn()

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Errore o imprevisto → nel dettaglio, 3. Serve una decisione → frasi complete, 4. Fine del compito → un solo riepilogo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "probability.ts"
Cohesion: 0.12
Nodes (25): End, CompileOptions, ALL, compileOf(), complement(), distributionOf(), endAt(), EventContext (+17 more)

### Community 79 - "aiPanel.test.ts"
Cohesion: 0.09
Nodes (24): definedName(), formulaTopic(), graphTopic(), numberText(), studyOf(), theoremTopic(), NoteSubject, AI_NEWS_TITLE (+16 more)

### Community 82 - "Il database degli account (Supabase)"
Cohesion: 0.22
Nodes (8): Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Note condivise con un link, Sincronizzazione, `sync_pull({ since })`: scarica le novità

### Community 83 - "tutorial.mjs"
Cohesion: 0.11
Nodes (11): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+3 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.10
Nodes (20): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Deciso (5 ottobre 2026), Dopo (+12 more)

### Community 91 - "tools.ts"
Cohesion: 0.09
Nodes (18): ExplainEvents, ExplainStep, ALL_TOOLS, callOf(), checkTool, FormulaCheck, Identities, looseJson() (+10 more)

### Community 92 - "MarkdownEditor"
Cohesion: 0.17
Nodes (4): closeMathBlockOnEnter(), EditorCallbacks, MarkdownEditor, insertTemplate()

### Community 96 - "account-test.mjs"
Cohesion: 0.11
Nodes (10): device(), login(), newContext, waitFor(), b64(), CAPTCHA_TOKEN, CODE, GOOGLE_CODE (+2 more)

### Community 97 - "files.ts"
Cohesion: 0.18
Nodes (17): inClaudeViewer(), canWriteFilesDirectly(), downloadBlob(), downloadText(), fileNameFor(), FsWindow, isAbort(), mdTypes() (+9 more)

### Community 98 - "supabase.ts"
Cohesion: 0.07
Nodes (45): @supabase/supabase-js, captchaToken(), loadTurnstile(), Turnstile, TURNSTILE_SCRIPT, Window, TURNSTILE_SITE_KEY, accountError (+37 more)

### Community 100 - "noteWordsMath.test.ts"
Cohesion: 0.07
Nodes (29): katex, BLOCKS, FROM_ENGLISH, FUNCTIONS, functionWordPairs(), GRAPH_KEY_FORMS, GRAPH_KEY_LINE, GRAPH_KEYS (+21 more)

### Community 101 - "schemaBlocks.ts"
Cohesion: 0.09
Nodes (23): InsertOptions, toggleLinePrefix(), addPlaceholders, Placeholder, besideSchema(), BlockWidget, findWidgetBlocks(), guardBlocks() (+15 more)

### Community 102 - "symbolsEn.test.ts"
Cohesion: 0.12
Nodes (38): editDistance(), normalizeText(), singular(), stem(), STOPWORDS, words(), BOTH, buildIndex() (+30 more)

### Community 103 - "siteUpdate.ts"
Cohesion: 0.16
Nodes (18): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, loadPart() (+10 more)

### Community 104 - "graph/file.ts"
Cohesion: 0.06
Nodes (56): FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsForFile(), graphsFromFile(), hide() (+48 more)

### Community 105 - "sql.ts"
Cohesion: 0.17
Nodes (18): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+10 more)

### Community 106 - "explainPanel.ts"
Cohesion: 0.10
Nodes (28): ExplainTone, Explanation, FollowUp, REPLY_TOKENS, explanationMarkdown(), insertAfterBlock(), insertAfterText(), insertExplanation() (+20 more)

### Community 107 - "spellcheck.ts"
Cohesion: 0.08
Nodes (24): @codemirror/lang-markdown, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt() (+16 more)

### Community 108 - "toolbar.ts"
Cohesion: 0.16
Nodes (17): insertBlock(), wrapSelection(), ListStyleId, Action, createToolbar(), insertCode(), insertLink(), listMenu() (+9 more)

### Community 113 - ".folderItem"
Cohesion: 0.20
Nodes (4): clear(), formatDate(), NotesPanel, NotesPanelDeps

### Community 116 - "smoke-test.mjs"
Cohesion: 0.15
Nodes (6): markdown-it, playwright-core, PNG_ICONS, fakeLlmWorker(), firstVisit(), plainContext

### Community 117 - "schema/templates.ts"
Cohesion: 0.20
Nodes (19): DEFAULT_EDGE, SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), conceptMap(), cycle(), edge() (+11 more)

### Community 118 - "severalGraph.ts"
Cohesion: 0.19
Nodes (17): FieldContext, fourierItems(), isFourierLine(), T, criticalLine(), isSeveralLine(), named(), severalItems() (+9 more)

### Community 119 - "src/relocation.ts"
Cohesion: 0.05
Nodes (88): accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf() (+80 more)

### Community 120 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

### Community 121 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 122 - "editor.test.ts"
Cohesion: 0.09
Nodes (22): tabOutOfMath(), isInCode(), mathContextAt(), openMathBefore(), buildDecorations(), clearAllPlaceholders(), clearPlaceholders, CommandTarget (+14 more)

### Community 124 - "Sheet"
Cohesion: 0.07
Nodes (37): Definition, Line, Line, complex, ExactComplexScope, Ode, withWorkLimit(), FiniteContext (+29 more)

### Community 125 - "relocation-test.mjs"
Cohesion: 0.18
Nodes (7): AFTER_MOVE, ids, newBrowser(), NOTICE_DAY, out, serve(), TYPES

### Community 128 - "Glifo – note per Claude"
Cohesion: 0.25
Nodes (8): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Regole, sqlite()

### Community 129 - "Dove sono le cose"
Cohesion: 0.09
Nodes (61): 1. A cosa serve l'AI dei modelli di frontiera, Dove sono le cose, Glifo – architettura, allNames(), answerFollowUp(), bareResult(), chained(), chatContext (+53 more)

### Community 132 - "licenses.ts"
Cohesion: 0.32
Nodes (5): License, licenseOf(), LICENSES, T, texts

### Community 136 - "Pt"
Cohesion: 0.17
Nodes (9): coalesced(), Finger, LassoAction, MoveAction, pointsOf(), pressureOf(), Transform, EllipseFit (+1 more)

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
Cohesion: 0.09
Nodes (47): RFC-4180, fflate, csvCell(), csvDelimiter(), csvNumbers(), csvToSheet(), digitsOf(), field() (+39 more)

### Community 142 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 143 - "feedback.ts"
Cohesion: 0.07
Nodes (47): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, feedbackButton, openFeedback(), accountOffMessage(), Site, T (+39 more)

### Community 144 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 154 - "board.ts"
Cohesion: 0.06
Nodes (60): Action, DOT_SIZES, DrawAction, EraseAction, EraserMode, HANDLE_REACH, ICON, MODE_NAMES (+52 more)

### Community 156 - ".reply"
Cohesion: 0.16
Nodes (11): Promemoria per lo studente, Account: i propri appunti su ogni dispositivo, anche da condividere, Commenti di chi prova Glifo, Idee per il futuro, In programma, L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota (14 ottobre 2026, se ne parla), La lavagna: idee in più, Più avanti (+3 more)

### Community 157 - "markdown.ts"
Cohesion: 0.08
Nodes (44): setGraphLabels(), monthOf(), MONTHS, MONTHS_EN, parseDate(), planBlock, PlanKind, planRange() (+36 more)

### Community 160 - "vite"
Cohesion: 0.22
Nodes (6): vite, constructor(), LlamaWorker, minutes, postMessage(), started

### Community 169 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 179 - "I modelli e le chiavi API"
Cohesion: 0.33
Nodes (6): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), In prova sul ramo `prova` (7 ottobre 2026): Qwen3 nel browser per «Spiegami», La chiave, il server locale e la scelta del modello (14 ottobre 2026), Le idee dello studente (5 ottobre 2026)

## Knowledge Gaps
- **877 isolated node(s):** `L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota (14 ottobre 2026, se ne parla)`, `Account: i propri appunti su ogni dispositivo, anche da condividere`, `La lavagna: idee in più`, `Schemi: idee in più`, `Entry` (+872 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1211 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **40 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `texts` connect `texts` to `i18n.ts`, `Dove sono le cose`, `main.ts`, `compile`, `licenses.ts`, `spec.ts`, `domain.ts`, `graph/preview.ts`, `distributions.ts`, `svg.ts`, `sheet.ts`, `xlsx.ts`, `feedback.ts`, `namesIn`, `numerical.ts`, `arithmetic.ts`, `index.ts`, `schema/editor.ts`, `spreadsheet/format.ts`, `parse.ts`, `board.ts`, `gauss.ts`, `schemaTools.test.ts`, `markdown.ts`, `gantt.ts`, `several.ts`, `study.ts`, `assistant.ts`, `logic.ts`, `spaces.ts`, `complex.ts`, `editor/editor.ts`, `resize.ts`, `localModels.ts`, `schema/model.ts`, `functions.ts`, `MathError`, `conics.ts`, `sidePanel.ts`, `linsys.ts`, `FoldersStore`, `page.ts`, `editor/lists.ts`, `finite.ts`, `ui/preview.ts`, `spreadsheet/editor.ts`, `topics.ts`, `odesolve.ts`, `local.ts`, `toNode`, `calcResults.ts`, `toLatex`, `symbolic.ts`, `probability.ts`, `aiPanel.test.ts`, `tools.ts`, `files.ts`, `supabase.ts`, `schemaBlocks.ts`, `siteUpdate.ts`, `graph/file.ts`, `sql.ts`, `explainPanel.ts`, `spellcheck.ts`, `toolbar.ts`, `schema/templates.ts`, `severalGraph.ts`, `src/relocation.ts`?**
  _High betweenness centrality (0.125) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `Dove sono le cose` to `i18n.ts`, `vitest`, `main.ts`, `compile`, `spec.ts`, `num`, `Pt`, `blockMove.ts`, `graph/preview.ts`, `aiEn.test.ts`, `svg.ts`, `distributions.ts`, `sheet.ts`, `texts`, `feedback.ts`, `namesIn`, `numerical.ts`, `arithmetic.ts`, `xlsx.ts`, `SheetEditor`, `BoardStore`, `parse.ts`, `selection.ts`, `board.ts`, `gauss.ts`, `markdown.ts`, `gantt.ts`, `several.ts`, `Rational`, `assistant.ts`, `logic.ts`, `study.ts`, `complex.ts`, `schemaTools.test.ts`, `view3d.ts`, `Board`, `localModels.ts`, `functions.ts`, `MathError`, `conics.ts`, `board/shapes.ts`, `schema/shapes.ts`, `sidePanel.ts`, `linsys.ts`, `graph.ts`, `finite.ts`, `ui/preview.ts`, `spreadsheet/editor.ts`, `topics.ts`, `odesolve.ts`, `local.ts`, `toNode`, `calcResults.ts`, `toLatex`, `symbolic.ts`, `aiPanel.test.ts`, `tutorial.mjs`, `MarkdownEditor`, `files.ts`, `supabase.ts`, `schemaBlocks.ts`, `siteUpdate.ts`, `graph/file.ts`, `explainPanel.ts`, `toolbar.ts`, `smoke-test.mjs`, `severalGraph.ts`, `src/relocation.ts`, `ExplainPanel`, `Sheet`?**
  _High betweenness centrality (0.089) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `i18n.ts`, `Dove sono le cose`, `main.ts`, `licenses.ts`, `num`, `blockMove.ts`, `distributions.ts`, `aiEn.test.ts`, `svg.ts`, `xlsx.ts`, `texts`, `feedback.ts`, `BoardStore`, `parse.ts`, `selection.ts`, `board.ts`, `schemaTools.test.ts`, `markdown.ts`, `Rational`, `assistant.ts`, `editor/editor.ts`, `translations.test.ts`, `resize.ts`, `localModels.ts`, `schema/model.ts`, `suggestions.ts`, `board/shapes.ts`, `FoldersStore`, `page.ts`, `editor/lists.ts`, `database.ts`, `ui/preview.ts`, `spreadsheet/editor.ts`, `topics.ts`, `local.ts`, `calcResults.ts`, `aiPanel.test.ts`, `supabase.ts`, `noteWordsMath.test.ts`, `schemaBlocks.ts`, `symbolsEn.test.ts`, `siteUpdate.ts`, `graph/file.ts`, `sql.ts`, `spellcheck.ts`, `src/relocation.ts`, `editor.test.ts`, `Sheet`?**
  _High betweenness centrality (0.067) - this node is a cross-community bridge._
- **Are the 327 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `tutorialModel()`) actually correct?**
  _`Dove sono le cose` has 327 INFERRED edges - model-reasoned connections that need verification._
- **What connects `L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota (14 ottobre 2026, se ne parla)`, `Account: i propri appunti su ogni dispositivo, anche da condividere`, `La lavagna: idee in più` to the rest of the system?**
  _877 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `i18n.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.026122625215889466 - nodes in this community are weakly interconnected._
- **Should `vitest` be split into smaller, more focused modules?**
  _Cohesion score 0.06746031746031746 - nodes in this community are weakly interconnected._