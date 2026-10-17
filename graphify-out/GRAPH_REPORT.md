# Graph Report - Glifo  (2026-10-17)

## Corpus Check
- 363 files · ~749,531 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5731 nodes · 20903 edges · 175 communities (137 shown, 38 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 744 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d78b9c6b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- h
- vitest
- main.ts
- compile
- sync.ts
- spec.ts
- src/relocation.ts
- num
- graph/preview.ts
- conics.ts
- probability.ts
- explainSubjects.ts
- svg.ts
- sheet.ts
- SchemaEditor
- regions.ts
- SheetEditor
- formulaReader.ts
- numerical.ts
- Rational
- index.ts
- engine.ts
- schema/editor.ts
- topics.ts
- Stroke
- Parser
- board.ts
- NotesStore
- tutorial.mjs
- several.ts
- gantt.ts
- toLatex
- exact.ts
- sidePanel.ts
- logic.ts
- Parser
- complex.ts
- devDependencies
- translations.test.ts
- resize.ts
- view3d.ts
- markdown.ts
- localModels.ts
- schemaTools.test.ts
- functions.ts
- MathError
- prova-lettori.py
- ink.ts
- toolbar.ts
- board/shapes.ts
- .paintVertexShape
- SidePanel
- parse.ts
- graph.ts
- suggestions.ts
- dialog.ts
- 20261004091555_note_condivise.sql
- math/evaluate.ts
- noteWordsMath.test.ts
- finite.ts
- ui/preview.ts
- dependencies
- Welcome to Glifo
- spreadsheet/editor.ts
- spreadsheet/format.ts
- odesolve.ts
- blockMove.ts
- linsys.ts
- editor/editor.ts
- Benvenuto in Glifo
- compilerOptions
- namesIn
- L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota
- latexDialog.ts
- symbolic.ts
- page.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- plan.ts
- explainPanel.ts
- session-start.sh
- .claude/CLAUDE.md
- Il database degli account (Supabase)
- local.ts
- Abbonamenti
- noteWordsGraph.test.ts
- Glifo – note per Claude
- supabase-stub.sql
- account-test.mjs
- renderTex
- supabase.ts
- Pt
- schemaBlocks.ts
- symbolsEn.test.ts
- siteUpdate.ts
- usesDecimalComma
- BoardStore
- parseMath
- @codemirror/state
- FoldersStore
- notesPanel.ts
- aiPanel.test.ts
- schema/templates.ts
- tutorial.ts
- Field
- compileComplex
- Glifo
- editor.test.ts
- ExplainPanel
- Sheet
- relocation-test.mjs
- math/format.ts
- Dove sono le cose
- database.ts
- Board
- 20261008130026_commenti.sql
- Le spiegazioni, come funzionano
- tools.ts
- xlsx.ts
- gauss.ts
- feedback.ts
- domain.ts
- sql.ts
- faq.ts
- inference.ts
- captcha.ts
- icon
- parseSchema
- smoke-test.mjs
- schedule.ts
- restore.ts
- i18n.ts
- editor/lists.ts
- math/calculus.ts
- suggest.ts
- vite.config.ts
- downloadText
- licenses.ts
- In programma
- Piano per piano
- 2. Dalla lavagna alla nota

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 362 edges
2. `MathError` - 151 edges
3. `Sheet` - 150 edges
4. `num()` - 145 edges
5. `h()` - 143 edges
6. `MathNode` - 131 edges
7. `texts` - 126 edges
8. `mul()` - 124 edges
9. `Board` - 119 edges
10. `compile()` - 116 edges

## Surprising Connections (you probably didn't know these)
- `Dove sono le cose` --references--> `fakeLlmWorker()`  [INFERRED]
  ARCHITETTURA.md → scripts/smoke-test.mjs
- `Dove sono le cose` --references--> `tutorialModel()`  [INFERRED]
  ARCHITETTURA.md → scripts/tutorial.mjs
- `Dove sono le cose` --references--> `tutorialReader()`  [INFERRED]
  ARCHITETTURA.md → scripts/tutorial.mjs
- `Dove sono le cose` --references--> `WidgetKind`  [INFERRED]
  ARCHITETTURA.md → src/editor/schemaBlocks.ts
- `Dove sono le cose` --references--> `ConicElements`  [INFERRED]
  ARCHITETTURA.md → src/math/conics.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (175 total, 38 thin omitted)

### Community 0 - "h"
Cohesion: 0.05
Nodes (51): SyncStatus, rich(), AI_MODELS, DEFAULT_SETTINGS, SPELL_LANGUAGES, SpellLanguages, Theme, formatBytes() (+43 more)

### Community 1 - "vitest"
Cohesion: 0.07
Nodes (35): vitest, staticGraphSvg(), chooseWindow(), chooseBox(), formulaGraph(), GraphItem, parseGraph(), DrawOptions (+27 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (106): addToGraphBlock(), remapGraphLines(), account, ACCOUNT_OFF, active, aiShown(), aiToggle, aiWork (+98 more)

### Community 3 - "compile"
Cohesion: 0.09
Nodes (53): fourierItems(), isFourierLine(), T, areaFor(), constantValue(), multipleLabel(), close(), definiteIntegral() (+45 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (31): AccountSync, withLock(), Account, EMPTY_STATE, FolderChange, FolderRow, isEmpty(), iso() (+23 more)

### Community 5 - "spec.ts"
Cohesion: 0.06
Nodes (83): formulaAtCursor(), GraphLabelLines, insertGraphBlock(), LABEL_KEYS, onlyComplex(), isNumericalLine(), numericalItems(), depth() (+75 more)

### Community 6 - "src/relocation.ts"
Cohesion: 0.08
Nodes (58): accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf() (+50 more)

### Community 7 - "num"
Cohesion: 0.13
Nodes (91): atIntegers(), withoutAbs(), exp(), hyperbolicToExp(), inverseRational(), sqrtEx(), termTransform(), polyEx() (+83 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (43): addLabel(), boxes, cameras, complexCoord(), coord(), coordinates(), drawings, drawnViews (+35 more)

### Community 9 - "conics.ts"
Cohesion: 0.14
Nodes (34): conicItems(), isConicLine(), quadricEquation(), T, at(), centralCanonical(), Coefficients, coneCanonical() (+26 more)

### Community 10 - "probability.ts"
Cohesion: 0.06
Nodes (63): addExp(), choose(), continuousQuantile(), decimals(), discreteQuantile(), Distribution, End, exactIntervalProbability() (+55 more)

### Community 11 - "explainSubjects.ts"
Cohesion: 0.14
Nodes (25): explainTarget, schemaTitle(), formulasUntil(), sheetBefore(), explanationMarkdown(), hasCalculation(), insertAfterBlock(), insertAfterText() (+17 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (55): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), dataWindow(), domainEdge() (+47 more)

### Community 13 - "sheet.ts"
Cohesion: 0.06
Nodes (63): OdeFunction, dataOf(), Eigenvalue, Lin, LinearValue, statisticOf(), NUMERICAL, bracketParts() (+55 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.10
Nodes (8): isContainer(), isLanes(), SchemaEditor, isFrame(), nodeLook(), nodeStyle(), withContents(), laneNames()

### Community 15 - "regions.ts"
Cohesion: 0.15
Nodes (24): constantIntegrand(), inequalityMargin(), integralRegion, LayeredSolid, Multiple, planeMargin(), radiusOf(), spaceLayers() (+16 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (8): functionLabel(), SheetEditor, decimalsOf(), englishTyping(), serializeSheet(), sheetSize(), CellRange, cloneSheet()

### Community 17 - "formulaReader.ts"
Cohesion: 0.08
Nodes (39): onnxruntime-web, ENGINE_BYTES, FromReader, IMAGE_SIZE, READER_CACHE, READER_DOWNLOAD, READER_FILES, READER_MODEL (+31 more)

### Community 18 - "numerical.ts"
Cohesion: 0.12
Nodes (47): bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial(), interpolating() (+39 more)

### Community 19 - "Rational"
Cohesion: 0.06
Nodes (79): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+71 more)

### Community 20 - "index.ts"
Cohesion: 0.06
Nodes (46): b, bigops, c, calculus, fn, fr, fractions, functions (+38 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "schema/editor.ts"
Cohesion: 0.05
Nodes (54): ALIGN, ALIGN_NAMES, ARROW_NAMES, AT_ICONS, AT_NAMES, BASE_PRESETS, BIG_ARROWS, DB_PRESETS (+46 more)

### Community 23 - "topics.ts"
Cohesion: 0.08
Nodes (52): ATTRIBUTES, containerOf(), cut(), ER_SHAPES, fieldText(), fitLines(), flowOrder(), formulaText() (+44 more)

### Community 24 - "Stroke"
Cohesion: 0.07
Nodes (21): fake-indexeddb, Step, BoardBackend, BoardChange, BoardData, done(), fromRecord(), IdbBoards (+13 more)

### Community 25 - "Parser"
Cohesion: 0.21
Nodes (3): derivativeOperator(), describe(), Parser

### Community 26 - "board.ts"
Cohesion: 0.06
Nodes (55): Action, DOT_SIZES, EraserMode, HANDLE_REACH, ICON, MODE_NAMES, SIZE_NAMES, sizeChoice() (+47 more)

### Community 27 - "NotesStore"
Cohesion: 0.08
Nodes (23): buildPackage(), Deletion, DeletionLog, isUuid(), newId(), createdAtFromId(), deriveTitle(), noteIdsInBrowser() (+15 more)

### Community 28 - "tutorial.mjs"
Cohesion: 0.08
Nodes (13): graphFile, names, namesFile, root, PNG_ICONS, centerOf(), clickOn(), ffmpeg (+5 more)

### Community 29 - "several.ts"
Cohesion: 0.08
Nodes (59): criticalLine(), isSeveralLine(), named(), severalItems(), surface(), T, Definite, Piece (+51 more)

### Community 30 - "gantt.ts"
Cohesion: 0.05
Nodes (74): amount(), barColor(), crossings(), dateText(), dayMonth(), dayOf(), fitText(), GanttOptions (+66 more)

### Community 31 - "toLatex"
Cohesion: 0.06
Nodes (73): names(), studyItems(), T, expSumValue(), FormatOptions, ACCENT_COMMANDS, diffLatex(), DISTRIBUTION_LATEX (+65 more)

### Community 32 - "exact.ts"
Cohesion: 0.12
Nodes (18): expSum, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactFunction, ExactRandom, exactRoot() (+10 more)

### Community 33 - "sidePanel.ts"
Cohesion: 0.10
Nodes (31): AiAnswer, AiError, AiResult, AiSettings, answerSchema(), askAi(), askCompatible(), askThroughHost() (+23 more)

### Community 34 - "logic.ts"
Cohesion: 0.11
Nodes (30): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+22 more)

### Community 35 - "Parser"
Cohesion: 0.17
Nodes (9): currentCall(), FormulaError, parseFormula(), Parser, callFunction(), englishName(), FunctionSpec, lookupFunction() (+1 more)

### Community 36 - "complex.ts"
Cohesion: 0.08
Nodes (29): add(), arg(), compileApply(), compileName(), ComplexCompiled, ComplexVars, conjugateOf(), constant() (+21 more)

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
Nodes (86): addMesh(), addTet(), affinePlane(), Axis, Box, centroid(), clipBy(), clipPolygon() (+78 more)

### Community 41 - "markdown.ts"
Cohesion: 0.08
Nodes (43): @lezer/highlight, @lezer/markdown, lineDepth(), mathDelimTag, mathTag, parseBlockMath(), bulletGroup(), sameList() (+35 more)

### Community 42 - "localModels.ts"
Cohesion: 0.07
Nodes (41): chat(), GlifoError, Gpu, load(), post(), remove(), scope, shaderF16() (+33 more)

### Community 43 - "schemaTools.test.ts"
Cohesion: 0.11
Nodes (27): laneOf(), alignBoxes(), Alignment, Box, distributeBoxes(), Position, placeIcon(), cellHtml() (+19 more)

### Community 44 - "functions.ts"
Cohesion: 0.07
Nodes (64): EMPTY, evaluateSheet(), number(), SheetEvaluator, T, addFormat(), divFormat(), GENERAL (+56 more)

### Community 45 - "MathError"
Cohesion: 0.10
Nodes (67): figureText(), linearItem(), MathError, formatNumber(), angleBetween(), asMatrix(), basisOf(), circleText() (+59 more)

### Community 46 - "prova-lettori.py"
Cohesion: 0.12
Nodes (4): byte_table(), read(), Reader, tidy()

### Community 47 - "ink.ts"
Cohesion: 0.11
Nodes (29): Prefs, BOARD_PALETTES, BoardPalette, BoardTheme, highlightName(), inkName(), mid(), outlineSvg() (+21 more)

### Community 48 - "toolbar.ts"
Cohesion: 0.10
Nodes (25): insertBlock(), InsertOptions, insertTemplate(), toggleLinePrefix(), wrapSelection(), LIST_STYLES, ListStyleId, besideSchema() (+17 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (35): DrawAction, adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners() (+27 more)

### Community 50 - ".paintVertexShape"
Cohesion: 0.12
Nodes (6): DotShape, IdentifyingRelationShape, LanesShape, NoteShape, TableShape, WeakEntityShape

### Community 51 - "SidePanel"
Cohesion: 0.19
Nodes (6): localizeTex(), cardPreview(), displayCode(), formPreview(), preventFocusSteal(), SidePanel

### Community 52 - "parse.ts"
Cohesion: 0.06
Nodes (38): hasWord(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, differentialInFraction() (+30 more)

### Community 53 - "graph.ts"
Cohesion: 0.07
Nodes (40): @maxgraph/core, AT_X, cellText(), COMPASS, createEdgeCell(), createGraph(), drawSchema(), edgeLook() (+32 more)

### Community 54 - "suggestions.ts"
Cohesion: 0.15
Nodes (12): EditorMathContext, expand(), preferredIndex(), SuggestionController, commandNames(), cardPreviewTex(), formPreviewTex(), ParsedTemplate (+4 more)

### Community 55 - "dialog.ts"
Cohesion: 0.07
Nodes (43): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), PullResult, openShareDialog(), changeAccess(), changeCopy() (+35 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "math/evaluate.ts"
Cohesion: 0.09
Nodes (26): Interval, binomial(), compare(), compileApply(), compileDerivative(), compileFunction(), compileRandomFunction(), Condition (+18 more)

### Community 58 - "noteWordsMath.test.ts"
Cohesion: 0.07
Nodes (27): BLOCKS, FROM_ENGLISH, FUNCTIONS, functionWordPairs(), GRAPH_KEY_FORMS, GRAPH_KEY_LINE, GRAPH_KEYS, TEXT_WORDS (+19 more)

### Community 59 - "finite.ts"
Cohesion: 0.17
Nodes (28): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+20 more)

### Community 60 - "ui/preview.ts"
Cohesion: 0.07
Nodes (31): remapLineKeys(), renameGraphScope(), renameScopeKeys(), BlockKind, MoveDir, draw(), drawCached(), drawn (+23 more)

### Community 61 - "dependencies"
Cohesion: 0.07
Nodes (27): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+19 more)

### Community 62 - "Welcome to Glifo"
Cohesion: 0.20
Nodes (9): A few examples, Calculations and graphs, For programming too, Handy shortcuts, How to write formulas, Lists, Spell check, Try it now (+1 more)

### Community 63 - "spreadsheet/editor.ts"
Cohesion: 0.09
Nodes (48): Editing, MenuEntry, Move, PATHS, SheetEditorOptions, Snapshot, T, CellResult (+40 more)

### Community 64 - "spreadsheet/format.ts"
Cohesion: 0.08
Nodes (48): sheetSummary(), pick(), booleanText(), ENGLISH, englishNumber(), fixedNumber(), generalNumber(), group() (+40 more)

### Community 65 - "odesolve.ts"
Cohesion: 0.08
Nodes (81): addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames(), constantParticular() (+73 more)

### Community 66 - "blockMove.ts"
Cohesion: 0.11
Nodes (33): blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove, blockPlace(), closed() (+25 more)

### Community 67 - "linsys.ts"
Cohesion: 0.06
Nodes (94): formatRational(), EXACT, FLOAT, splitRoot(), surdText(), choices(), gcd(), isStandardUnknown() (+86 more)

### Community 68 - "editor/editor.ts"
Cohesion: 0.04
Nodes (50): description, name, private, scripts, build, dev, preview, test (+42 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "namesIn"
Cohesion: 0.11
Nodes (41): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+33 more)

### Community 72 - "L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota"
Cohesion: 0.13
Nodes (13): 3. Da una foto alla nota, 4. Dettare: la voce diventa testo nella nota, 5. Registrare le lezioni e trascriverle, Da sistemare con il primo punto che tocca l'AI, Fonti (controllate il 14 ottobre 2026), In che ordine, L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota, Attivato (+5 more)

### Community 73 - "latexDialog.ts"
Cohesion: 0.08
Nodes (38): ReadProgress, closing(), FUNCTIONS, tidyLatex(), withoutLooseGroups(), cache, capability(), ClaudeRuntime (+30 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (63): fnLabel(), linearIn(), letters(), atValues(), Converter, coordinates(), decimalText(), definiteParts() (+55 more)

### Community 75 - "page.ts"
Cohesion: 0.16
Nodes (14): katex, body, draw(), isDark(), saveButton, saveCopy(), settings, status (+6 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Errore o imprevisto → nel dettaglio, 3. Serve una decisione → frasi complete, 4. Fine del compito → un solo riepilogo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "plan.ts"
Cohesion: 0.16
Nodes (18): NumberStyle, shownStyle(), cellText(), columnRole(), columnsOf(), durationUnit(), isNumber(), isPlanRange() (+10 more)

### Community 79 - "explainPanel.ts"
Cohesion: 0.10
Nodes (26): ExplainTone, Explanation, FollowUp, REPLY_TOKENS, MarkdownEditor, SubjectKind, MathRegion, Settings (+18 more)

### Community 82 - "Il database degli account (Supabase)"
Cohesion: 0.22
Nodes (8): Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Note condivise con un link, Sincronizzazione, `sync_pull({ since })`: scarica le novità

### Community 83 - "local.ts"
Cohesion: 0.12
Nodes (14): glifoError(), LocalAbort, localErrorMessage(), localLlm, Pending, T, WorkerLike, ChatMessage (+6 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.08
Nodes (26): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Deciso (5 ottobre 2026), Deciso (5 ottobre 2026) (+18 more)

### Community 91 - "noteWordsGraph.test.ts"
Cohesion: 0.09
Nodes (46): setGraphLabels(), monthOf(), MONTHS, MONTHS_EN, parseDate(), planBlock, PlanKind, planRange() (+38 more)

### Community 92 - "Glifo – note per Claude"
Cohesion: 0.13
Nodes (12): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole (+4 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.10
Nodes (17): device(), login(), newContext, waitFor(), b64(), CAPTCHA_TOKEN, CODE, createFakeSupabase() (+9 more)

### Community 97 - "renderTex"
Cohesion: 0.20
Nodes (19): texHtml(), checkHtml(), checkTitle(), T, cache, cleanKatexError(), escapeHtml(), renderTex() (+11 more)

### Community 98 - "supabase.ts"
Cohesion: 0.10
Nodes (39): @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken(), ensureSessionOf() (+31 more)

### Community 100 - "Pt"
Cohesion: 0.08
Nodes (17): clampZoom(), coalesced(), EraseAction, Finger, LassoAction, loadPrefs(), MoveAction, PanAction (+9 more)

### Community 101 - "schemaBlocks.ts"
Cohesion: 0.08
Nodes (31): BlockWidget, findWidgetBlocks(), guardBlocks(), KINDS, schemaBlocks(), schemaSummary(), svg(), T (+23 more)

### Community 102 - "symbolsEn.test.ts"
Cohesion: 0.13
Nodes (30): editDistance(), normalizeText(), singular(), stem(), STOPWORDS, words(), BOTH, buildIndex() (+22 more)

### Community 103 - "siteUpdate.ts"
Cohesion: 0.16
Nodes (18): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, loadPart() (+10 more)

### Community 104 - "usesDecimalComma"
Cohesion: 0.13
Nodes (27): FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsFromFile(), OPEN, swatchSvg() (+19 more)

### Community 105 - "BoardStore"
Cohesion: 0.13
Nodes (4): BoardStore, MemoryBoards, backup(), boardsFor()

### Community 106 - "parseMath"
Cohesion: 0.16
Nodes (17): errorMessage(), MathSyntaxError, parseMath(), parseStatement(), error(), result(), value(), calcError() (+9 more)

### Community 107 - "@codemirror/state"
Cohesion: 0.06
Nodes (34): @codemirror/lang-markdown, @codemirror/state, formulaInsertion(), noIndentedCode, mathMarkdown, misspelledMark, refreshSpelling, setTarget (+26 more)

### Community 108 - "FoldersStore"
Cohesion: 0.12
Nodes (12): cleanFolderName(), FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder(), loadClosedFolders(), RemoteFolder, sameName() (+4 more)

### Community 113 - "notesPanel.ts"
Cohesion: 0.12
Nodes (8): Folder, saveClosedFolders(), formatDate(), MenuEntry, openMenu(), NotesPanel, NotesPanelDeps, T

### Community 116 - "aiPanel.test.ts"
Cohesion: 0.11
Nodes (17): definedName(), formulaTopic(), graphTopic(), numberText(), studyOf(), theoremTopic(), NoteSubject, AiPanel (+9 more)

### Community 117 - "schema/templates.ts"
Cohesion: 0.20
Nodes (19): DEFAULT_EDGE, SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), conceptMap(), cycle(), edge() (+11 more)

### Community 118 - "tutorial.ts"
Cohesion: 0.15
Nodes (12): HINT_MS, markTutorialSeen(), openTutorial(), show(), richText(), showTutorialHint(), close(), T (+4 more)

### Community 119 - "Field"
Cohesion: 0.12
Nodes (7): characteristicPolynomial(), eigenvalues(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn()

### Community 120 - "compileComplex"
Cohesion: 0.20
Nodes (16): asin(), atan(), compileComplex(), compileFunction(), evaluateExactComplex(), exactSqrt(), exp(), GaussRational (+8 more)

### Community 121 - "Glifo"
Cohesion: 0.12
Nodes (16): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Domande frequenti e commenti (+8 more)

### Community 122 - "editor.test.ts"
Cohesion: 0.06
Nodes (32): closeMathBlockOnEnter(), EditorCallbacks, searchPhrases(), tabOutOfMath(), templateInsertion(), CODE_NODES, CommandToken, commandTokenAt() (+24 more)

### Community 123 - "ExplainPanel"
Cohesion: 0.16
Nodes (4): ExplainChat, ExplainPanel, preventFocusSteal(), formulasSummary()

### Community 124 - "Sheet"
Cohesion: 0.07
Nodes (33): Definition, Line, ExactComplexScope, Ode, withWorkLimit(), FiniteContext, FormattedResult, Special (+25 more)

### Community 125 - "relocation-test.mjs"
Cohesion: 0.18
Nodes (7): AFTER_MOVE, ids, newBrowser(), NOTICE_DAY, out, serve(), TYPES

### Community 128 - "math/format.ts"
Cohesion: 0.13
Nodes (24): exponentialForm(), fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), decimalSeparator() (+16 more)

### Community 129 - "Dove sono le cose"
Cohesion: 0.08
Nodes (65): 1. A cosa serve l'AI dei modelli di frontiera, Dove sono le cose, Glifo – architettura, allNames(), answerFollowUp(), bareResult(), chained(), chatContext (+57 more)

### Community 133 - "database.ts"
Cohesion: 0.23
Nodes (6): createDatabase(), createUser(), databaseTests(), feedbackTests(), migrations, shareTests()

### Community 136 - "Board"
Cohesion: 0.10
Nodes (3): Board, penErases(), shapePoints()

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 139 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 140 - "tools.ts"
Cohesion: 0.09
Nodes (16): ExplainEvents, ExplainStep, ALL_TOOLS, callOf(), checkTool, FormulaCheck, Identities, looseJson() (+8 more)

### Community 141 - "xlsx.ts"
Cohesion: 0.09
Nodes (43): RFC-4180, fflate, tablesNote(), csvCell(), csvDelimiter(), csvNumbers(), csvToSheet(), digitsOf() (+35 more)

### Community 142 - "gauss.ts"
Cohesion: 0.15
Nodes (23): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexLine(), isComplexValue() (+15 more)

### Community 143 - "feedback.ts"
Cohesion: 0.08
Nodes (42): feedbackButton, openFeedback(), Site, commentDate(), commentItem(), COMMENTS_MAX, CommentsDeps, CommentsError (+34 more)

### Community 144 - "domain.ts"
Cohesion: 0.17
Nodes (22): axesIn(), bestAlong(), boundingBox(), combine(), compileDomain(), compileMultiple(), conditionsOf(), constantOf() (+14 more)

### Community 146 - "sql.ts"
Cohesion: 0.15
Nodes (20): @electric-sql/pglite, Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote() (+12 more)

### Community 154 - "faq.ts"
Cohesion: 0.16
Nodes (17): setLangForTests(), copyLink(), FaqGroup, faqGroups(), FaqQuestion, faqSection, kbd(), list() (+9 more)

### Community 156 - "inference.ts"
Cohesion: 0.07
Nodes (47): isTestLine(), number(), T, testItems(), classes(), dataOf(), distributionExtent(), distributionLabel() (+39 more)

### Community 157 - "captcha.ts"
Cohesion: 0.15
Nodes (12): captchaToken(), loadTurnstile(), Turnstile, TURNSTILE_SCRIPT, Window, TURNSTILE_SITE_KEY, accountFailure(), Accesso con Google (+4 more)

### Community 158 - "icon"
Cohesion: 0.14
Nodes (21): viewSwitch, moveDayLabel(), relocationMessage(), icon(), BOX, glyph(), LOGO_COLOR, logoIcon() (+13 more)

### Community 159 - "parseSchema"
Cohesion: 0.08
Nodes (30): openSchemaEditor(), SchemaEditorOptions, base64(), hide(), OPEN, schemasForFile(), schemasFromFile(), T (+22 more)

### Community 160 - "smoke-test.mjs"
Cohesion: 0.09
Nodes (12): markdown-it, playwright-core, vite, GLYPHS, WRITING, fakeFormulaWorker(), fakeLlmWorker(), firstVisit() (+4 more)

### Community 161 - "schedule.ts"
Cohesion: 0.16
Nodes (18): checkGiven(), criticalPaths(), key(), Link, LinkType, listText(), offset(), order() (+10 more)

### Community 162 - "restore.ts"
Cohesion: 0.20
Nodes (13): newStrokeId(), receiveRelocation(), restore(), BackupNote, backupNotes(), restoreBackup(), RestoreBoards, Restored (+5 more)

### Community 163 - "i18n.ts"
Cohesion: 0.12
Nodes (23): browserLang(), browserLanguages(), dateLocale(), detectLang(), Entry, isLang(), lang, LANGUAGES (+15 more)

### Community 166 - "editor/lists.ts"
Cohesion: 0.10
Nodes (53): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+45 more)

### Community 167 - "math/calculus.ts"
Cohesion: 0.26
Nodes (15): argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot(), fieldOn(), numericPartials() (+7 more)

### Community 168 - "suggest.ts"
Cohesion: 0.22
Nodes (12): SuggestionItem, IndexedEntry, SearchResult, getIndex(), isSubsequence(), keysOf(), MatchKind, suggestCommands() (+4 more)

### Community 169 - "vite.config.ts"
Cohesion: 0.22
Nodes (6): @mlc-ai/web-llm, vite-plugin-pwa, accountOffMessage(), defineFor(), MAIN_BRANCH, webllmModels

### Community 170 - "downloadText"
Cohesion: 0.38
Nodes (6): loadDialect(), svgSize(), svgToPng(), downloadBlob(), downloadText(), fileNameFor()

### Community 171 - "licenses.ts"
Cohesion: 0.32
Nodes (5): License, licenseOf(), LICENSES, T, texts

### Community 172 - "In programma"
Cohesion: 0.25
Nodes (8): Account: i propri appunti su ogni dispositivo, anche da condividere, Idee per il futuro, In programma, L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota (14 ottobre 2026, se ne parla), La lavagna: idee in più, Più avanti, Schemi: idee in più, Trasloco: il sito su Cloudflare, con un dominio tutto di Glifo

### Community 173 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

## Knowledge Gaps
- **892 isolated node(s):** `3. Da una foto alla nota`, `4. Dettare: la voce diventa testo nella nota`, `5. Registrare le lezioni e trascriverle`, `Da sistemare con il primo punto che tocca l'AI`, `In che ordine` (+887 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1234 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **38 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `h`, `vitest`, `main.ts`, `compile`, `spec.ts`, `src/relocation.ts`, `num`, `graph/preview.ts`, `conics.ts`, `explainSubjects.ts`, `svg.ts`, `sheet.ts`, `SchemaEditor`, `SheetEditor`, `formulaReader.ts`, `numerical.ts`, `Rational`, `schema/editor.ts`, `topics.ts`, `Parser`, `board.ts`, `NotesStore`, `tutorial.mjs`, `several.ts`, `gantt.ts`, `toLatex`, `sidePanel.ts`, `logic.ts`, `Parser`, `view3d.ts`, `markdown.ts`, `localModels.ts`, `schemaTools.test.ts`, `functions.ts`, `MathError`, `ink.ts`, `toolbar.ts`, `board/shapes.ts`, `.paintVertexShape`, `SidePanel`, `parse.ts`, `graph.ts`, `dialog.ts`, `math/evaluate.ts`, `finite.ts`, `ui/preview.ts`, `spreadsheet/editor.ts`, `spreadsheet/format.ts`, `odesolve.ts`, `blockMove.ts`, `linsys.ts`, `namesIn`, `latexDialog.ts`, `symbolic.ts`, `plan.ts`, `explainPanel.ts`, `local.ts`, `noteWordsGraph.test.ts`, `renderTex`, `supabase.ts`, `Pt`, `schemaBlocks.ts`, `siteUpdate.ts`, `usesDecimalComma`, `BoardStore`, `parseMath`, `@codemirror/state`, `aiPanel.test.ts`, `tutorial.ts`, `compileComplex`, `editor.test.ts`, `ExplainPanel`, `Sheet`, `math/format.ts`, `.integral`, `Board`, `xlsx.ts`, `gauss.ts`, `feedback.ts`, `faq.ts`, `inference.ts`, `icon`, `smoke-test.mjs`, `schedule.ts`, `i18n.ts`, `math/calculus.ts`, `vite.config.ts`, `downloadText`, `2. Dalla lavagna alla nota`?**
  _High betweenness centrality (0.114) - this node is a cross-community bridge._
- **Why does `texts` connect `i18n.ts` to `h`, `Dove sono le cose`, `main.ts`, `compile`, `spec.ts`, `src/relocation.ts`, `faq.ts`, `graph/preview.ts`, `conics.ts`, `probability.ts`, `icon`, `tools.ts`, `svg.ts`, `gauss.ts`, `sheet.ts`, `domain.ts`, `formulaReader.ts`, `numerical.ts`, `Rational`, `sql.ts`, `xlsx.ts`, `schema/editor.ts`, `topics.ts`, `index.ts`, `board.ts`, `NotesStore`, `inference.ts`, `several.ts`, `gantt.ts`, `toLatex`, `parseSchema`, `sidePanel.ts`, `schedule.ts`, `logic.ts`, `complex.ts`, `restore.ts`, `editor/lists.ts`, `math/calculus.ts`, `resize.ts`, `localModels.ts`, `schemaTools.test.ts`, `functions.ts`, `MathError`, `licenses.ts`, `ink.ts`, `toolbar.ts`, `parse.ts`, `dialog.ts`, `math/evaluate.ts`, `finite.ts`, `ui/preview.ts`, `spreadsheet/editor.ts`, `spreadsheet/format.ts`, `odesolve.ts`, `linsys.ts`, `editor/editor.ts`, `namesIn`, `latexDialog.ts`, `symbolic.ts`, `page.ts`, `plan.ts`, `explainPanel.ts`, `feedback.ts`, `local.ts`, `noteWordsGraph.test.ts`, `renderTex`, `supabase.ts`, `schemaBlocks.ts`, `siteUpdate.ts`, `usesDecimalComma`, `@codemirror/state`, `notesPanel.ts`, `schema/templates.ts`, `tutorial.ts`?**
  _High betweenness centrality (0.113) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `h`, `Dove sono le cose`, `database.ts`, `src/relocation.ts`, `num`, `probability.ts`, `svg.ts`, `sheet.ts`, `xlsx.ts`, `feedback.ts`, `formulaReader.ts`, `sql.ts`, `topics.ts`, `Stroke`, `board.ts`, `faq.ts`, `NotesStore`, `captcha.ts`, `icon`, `toLatex`, `parseSchema`, `sidePanel.ts`, `restore.ts`, `i18n.ts`, `editor/lists.ts`, `resize.ts`, `view3d.ts`, `vite.config.ts`, `localModels.ts`, `licenses.ts`, `markdown.ts`, `MathError`, `schemaTools.test.ts`, `ink.ts`, `toolbar.ts`, `board/shapes.ts`, `graph.ts`, `suggestions.ts`, `dialog.ts`, `noteWordsMath.test.ts`, `ui/preview.ts`, `spreadsheet/editor.ts`, `translations.test.ts`, `blockMove.ts`, `linsys.ts`, `editor/editor.ts`, `plan.ts`, `explainPanel.ts`, `local.ts`, `noteWordsGraph.test.ts`, `supabase.ts`, `schemaBlocks.ts`, `symbolsEn.test.ts`, `siteUpdate.ts`, `usesDecimalComma`, `parseMath`, `@codemirror/state`, `FoldersStore`, `aiPanel.test.ts`, `tutorial.ts`, `editor.test.ts`, `Sheet`?**
  _High betweenness centrality (0.106) - this node is a cross-community bridge._
- **Are the 361 inferred relationships involving `Dove sono le cose` (e.g. with `fakeFormulaWorker()` and `fakeLlmWorker()`) actually correct?**
  _`Dove sono le cose` has 361 INFERRED edges - model-reasoned connections that need verification._
- **What connects `3. Da una foto alla nota`, `4. Dettare: la voce diventa testo nella nota`, `5. Registrare le lezioni e trascriverle` to the rest of the system?**
  _892 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `h` be split into smaller, more focused modules?**
  _Cohesion score 0.05311542390194075 - nodes in this community are weakly interconnected._
- **Should `vitest` be split into smaller, more focused modules?**
  _Cohesion score 0.07138535995160314 - nodes in this community are weakly interconnected._