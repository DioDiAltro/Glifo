# Graph Report - Glifo  (2026-10-15)

## Corpus Check
- 348 files · ~734,275 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5608 nodes · 20482 edges · 159 communities (120 shown, 39 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 700 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `5d11a6c5`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- i18n.ts
- GraphItem
- main.ts
- compile
- sync.ts
- spec.ts
- h
- primitive.ts
- graph/preview.ts
- blockMove.ts
- probability.ts
- Dove sono le cose
- svg.ts
- sheet.ts
- SchemaEditor
- chart.ts
- SheetEditor
- namesIn
- numerical.ts
- toLatex
- index.ts
- engine.ts
- schema/editor.ts
- spreadsheetEn.test.ts
- store.ts
- Parser
- board.ts
- gauss.ts
- parse.ts
- several.ts
- gantt.ts
- study.ts
- Rational
- assistant.ts
- logic.ts
- spaces.ts
- complex.ts
- package.json
- translations.test.ts
- resize.ts
- view3d.ts
- Board
- localModels.ts
- schemaEn.test.ts
- functions.ts
- MathError
- prova-lettori.py
- laplace.ts
- conics.ts
- board/shapes.ts
- schema/shapes.ts
- sidePanel.ts
- linsys.ts
- graph.ts
- restore.ts
- page.ts
- 20261004091555_note_condivise.sql
- editor/lists.ts
- src/relocation.ts
- latex.ts
- ui/preview.ts
- dependencies
- Welcome to Glifo
- spreadsheet/editor.ts
- topics.ts
- num
- localLlm
- fourier.ts
- editor/editor.ts
- Benvenuto in Glifo
- compilerOptions
- Glifo
- usesDecimalComma
- symbolic.ts
- Field
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- plan.ts
- aiPanel.test.ts
- session-start.sh
- .claude/CLAUDE.md
- Il database degli account (Supabase)
- tutorial.mjs
- Abbonamenti
- strokes.ts
- LlamaWorker
- supabase-stub.sql
- account-test.mjs
- planPreview.ts
- supabase.ts
- noteWordsMath.test.ts
- schemaBlocks.ts
- symbolsEn.test.ts
- siteUpdate.ts
- vitest
- La lavagna
- explainPanel.ts
- spellcheck.ts
- toolbar.ts
- smoke-test.mjs
- schema/templates.ts
- solve.ts
- NotesStore
- Harness
- ExplainPanel
- Sheet
- relocation-test.mjs
- Glifo – note per Claude
- explain.ts
- Parser
- Stroke
- 20261008130026_commenti.sql
- Le spiegazioni, come funzionano
- L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota
- xlsx.ts
- createFakeSupabase
- feedback.ts
- Costi
- MLCEngine
- ink.ts
- In programma
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
- `Dove sono le cose` --references--> `fakeLlmWorker()`  [INFERRED]
  ARCHITETTURA.md → scripts/smoke-test.mjs
- `Dove sono le cose` --references--> `tutorialModel()`  [INFERRED]
  ARCHITETTURA.md → scripts/tutorial.mjs
- `Il controllo anti-robot (CAPTCHA, ottobre 2026)` --references--> `captchaToken()`  [INFERRED]
  supabase/README.md → src/account/captcha.ts
- `Come viene pubblicata` --references--> `dist()`  [INFERRED]
  README.md → src/board/shapes.ts
- `Trasloco: il sito su Cloudflare, con un dominio tutto di Glifo` --references--> `dist()`  [INFERRED]
  ROADMAP.md → src/board/shapes.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (159 total, 39 thin omitted)

### Community 0 - "i18n.ts"
Cohesion: 0.03
Nodes (93): SyncStatus, downloadSize(), gpuF16(), modelsInBrowser(), modelVariant, AI_SERVICES, aiService, T (+85 more)

### Community 1 - "GraphItem"
Cohesion: 0.09
Nodes (15): GraphItem, names(), STUDY_GRAPH, studyItems(), T, Special, functionOf(), text() (+7 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (105): addToGraphBlock(), remapGraphLines(), account, ACCOUNT_OFF, active, aiShown(), aiToggle, aiWork (+97 more)

### Community 3 - "compile"
Cohesion: 0.04
Nodes (109): integralRegion, LayeredSolid, criticalLine(), named(), severalItems(), surface(), T, areaFor() (+101 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (31): AccountSync, withLock(), Account, EMPTY_STATE, FolderChange, FolderRow, isEmpty(), iso() (+23 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (92): conicItems(), isConicLine(), quadricEquation(), T, isFourierLine(), onlyComplex(), isTestLine(), isNumericalLine() (+84 more)

### Community 6 - "h"
Cohesion: 0.05
Nodes (71): relocationMessage(), RelocationResult, openShareDialog(), changeAccess(), changeCopy(), refreshChanged(), run(), setStatus() (+63 more)

### Community 7 - "primitive.ts"
Cohesion: 0.16
Nodes (61): atIntegers(), algebraic(), bigGcd(), byParts(), candidates(), canon(), combineLogs(), compareKeys() (+53 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (41): addLabel(), boxes, cameras, complexCoord(), coord(), coordinates(), drawings, drawnViews (+33 more)

### Community 9 - "blockMove.ts"
Cohesion: 0.10
Nodes (36): @codemirror/commands, @codemirror/view, blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove (+28 more)

### Community 10 - "probability.ts"
Cohesion: 0.06
Nodes (65): addExp(), choose(), continuousQuantile(), decimals(), discreteQuantile(), Distribution, End, exactIntervalProbability() (+57 more)

### Community 11 - "Dove sono le cose"
Cohesion: 0.16
Nodes (25): Dove sono le cose, Glifo – architettura, explainTarget, schemaTitle(), formulasUntil(), sheetBefore(), hasCalculation(), insertAfterBlock() (+17 more)

### Community 12 - "svg.ts"
Cohesion: 0.05
Nodes (83): figureName(), graphFigure(), titleBand(), ACCENTS, BLACKBOARD, CALLIGRAPHIC, closing(), convert() (+75 more)

### Community 13 - "sheet.ts"
Cohesion: 0.08
Nodes (56): EMPTY_COMPLEX_SCOPE, ExactFunction, Lin, Mat, NUMERICAL, BRACKETS, CHECK_VALUES, checks (+48 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.09
Nodes (8): loadDialect(), SchemaEditor, createEdgeCell(), isFrame(), withContents(), EdgeLook, serializeSchema(), fileNameFor()

### Community 15 - "chart.ts"
Cohesion: 0.13
Nodes (30): at(), breakEven(), dataLine(), dataRange(), Point, quantity(), T, tableItems() (+22 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (5): SheetEditor, serializeSheet(), sheetSize(), CellRange, cloneSheet()

### Community 17 - "namesIn"
Cohesion: 0.10
Nodes (43): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+35 more)

### Community 18 - "numerical.ts"
Cohesion: 0.12
Nodes (48): bisection(), cholesky(), condition(), derivative(), exactPolynomial(), fixedPoint(), floatPolynomial(), interpolating() (+40 more)

### Community 19 - "toLatex"
Cohesion: 0.07
Nodes (73): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+65 more)

### Community 20 - "index.ts"
Cohesion: 0.06
Nodes (43): b, bigops, c, calculus, fn, fr, fractions, functions (+35 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "schema/editor.ts"
Cohesion: 0.05
Nodes (72): laneOf(), alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ALIGN_NAMES (+64 more)

### Community 23 - "spreadsheetEn.test.ts"
Cohesion: 0.09
Nodes (52): formulaText(), pick(), functionLabel(), ENGLISH, englishNumber(), fixedNumber(), generalNumber(), group() (+44 more)

### Community 24 - "store.ts"
Cohesion: 0.10
Nodes (15): BoardBackend, done(), fromRecord(), IdbBoards, ofNote(), openBoardDatabase(), openDefault(), recordBytes() (+7 more)

### Community 25 - "Parser"
Cohesion: 0.13
Nodes (11): derivativeOperator(), describe(), MathSyntaxError, Parser, parseStatement(), circle, light, result() (+3 more)

### Community 26 - "board.ts"
Cohesion: 0.06
Nodes (49): Action, coalesced(), DOT_SIZES, EraserMode, Finger, HANDLE_REACH, ICON, LassoAction (+41 more)

### Community 27 - "gauss.ts"
Cohesion: 0.15
Nodes (20): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexLine(), isComplexValue() (+12 more)

### Community 28 - "parse.ts"
Cohesion: 0.05
Nodes (52): errorMessage(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, differentialInFraction() (+44 more)

### Community 29 - "several.ts"
Cohesion: 0.10
Nodes (46): Piece, Condition, Family, Group, Root, Shape, at(), bounded() (+38 more)

### Community 30 - "gantt.ts"
Cohesion: 0.07
Nodes (68): amount(), barColor(), crossings(), dateText(), dayMonth(), dayOf(), fitText(), GanttOptions (+60 more)

### Community 31 - "study.ts"
Cohesion: 0.15
Nodes (37): nameLatex(), limit(), Asymptote, asymptoteText(), compiled(), cutsOf(), defined(), domainOf() (+29 more)

### Community 32 - "Rational"
Cohesion: 0.09
Nodes (28): Part, evaluateExactComplex(), exactSqrt(), GaussRational, unavailable(), expSum, bigGcd(), binomExact() (+20 more)

### Community 33 - "assistant.ts"
Cohesion: 0.07
Nodes (44): AiAnswer, AiError, AiResult, AiSettings, answerSchema(), askAi(), askCompatible(), askThroughHost() (+36 more)

### Community 34 - "logic.ts"
Cohesion: 0.11
Nodes (30): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+22 more)

### Community 35 - "spaces.ts"
Cohesion: 0.11
Nodes (34): decimalSeparator(), Digits, formatNumber(), FormatOptions, formatRational(), fromNumber(), fromRational(), SUPERSCRIPT (+26 more)

### Community 36 - "complex.ts"
Cohesion: 0.07
Nodes (53): add(), allRoots(), arg(), asin(), atan(), compileApply(), compileComplex(), compileFunction() (+45 more)

### Community 37 - "package.json"
Cohesion: 0.05
Nodes (38): description, devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript (+30 more)

### Community 38 - "translations.test.ts"
Cohesion: 0.17
Nodes (18): AstNode, calleeName(), check(), checkPair(), visit(), children(), entryPairs(), files (+10 more)

### Community 39 - "resize.ts"
Cohesion: 0.13
Nodes (21): EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, SizeLimits, SYMBOLS_WIDTH (+13 more)

### Community 40 - "view3d.ts"
Cohesion: 0.06
Nodes (91): staticGraphSvg(), addMesh(), addTet(), affinePlane(), Axis, Box, centroid(), chooseBox() (+83 more)

### Community 41 - "Board"
Cohesion: 0.10
Nodes (8): Board, clampZoom(), loadPrefs(), pressureOf(), sizeChoice(), validView(), SizeChoice, Pt

### Community 42 - "localModels.ts"
Cohesion: 0.06
Nodes (42): @mlc-ai/web-llm, vite-plugin-pwa, chat(), GlifoError, Gpu, load(), post(), remove() (+34 more)

### Community 43 - "schemaEn.test.ts"
Cohesion: 0.06
Nodes (50): @electric-sql/pglite, @maxgraph/core, openSchemaEditor(), SchemaEditorOptions, Look, COLOR_NAMES, isRecord(), num() (+42 more)

### Community 44 - "functions.ts"
Cohesion: 0.08
Nodes (64): EMPTY, number(), T, addFormat(), divFormat(), GENERAL, most(), mulFormat() (+56 more)

### Community 45 - "MathError"
Cohesion: 0.10
Nodes (64): MathError, angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, dataOf() (+56 more)

### Community 46 - "prova-lettori.py"
Cohesion: 0.12
Nodes (4): byte_table(), read(), Reader, tidy()

### Community 47 - "laplace.ts"
Cohesion: 0.17
Nodes (27): factoredPolynomial(), beyondPoles(), compiled(), E, exp(), fractionShown(), HALF, inverseLaplaceShown() (+19 more)

### Community 48 - "conics.ts"
Cohesion: 0.19
Nodes (28): at(), centralCanonical(), Coefficients, coneCanonical(), conicOf(), det2(), det3(), determinant() (+20 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (36): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+28 more)

### Community 50 - "schema/shapes.ts"
Cohesion: 0.08
Nodes (16): ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape, IdentifyingRelationShape (+8 more)

### Community 51 - "sidePanel.ts"
Cohesion: 0.10
Nodes (28): aiSettingsOf(), formulaAtCursor(), GraphLabelLines, insertGraphBlock(), LABEL_KEYS, SuggestionItem, formulaGraph(), graphBlockText() (+20 more)

### Community 52 - "linsys.ts"
Cohesion: 0.12
Nodes (45): choices(), gcd(), matrixEquation(), matrixSystem(), minorsGcd(), ONE, parametricRows(), parametricSystem() (+37 more)

### Community 53 - "graph.ts"
Cohesion: 0.09
Nodes (37): fieldInput(), isContainer(), isLanes(), AT_X, cellText(), COMPASS, createGraph(), drawSchema() (+29 more)

### Community 54 - "restore.ts"
Cohesion: 0.22
Nodes (11): restore(), BackupNote, backupNotes(), restoreBackup(), RestoreBoards, Restored, restoredMessage(), T (+3 more)

### Community 55 - "page.ts"
Cohesion: 0.08
Nodes (34): katex, accountDataFile(), PullResult, sidebarToggle(), render(), isShareToken(), parseSharedNote(), readSharedNote() (+26 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "editor/lists.ts"
Cohesion: 0.08
Nodes (68): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+60 more)

### Community 58 - "src/relocation.ts"
Cohesion: 0.04
Nodes (74): accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf() (+66 more)

### Community 59 - "latex.ts"
Cohesion: 0.07
Nodes (55): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+47 more)

### Community 60 - "ui/preview.ts"
Cohesion: 0.08
Nodes (24): GraphLabels, remapLineKeys(), renameGraphScope(), renameScopeKeys(), BlockKind, MoveDir, hydrateSheets(), T (+16 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "Welcome to Glifo"
Cohesion: 0.20
Nodes (9): A few examples, Calculations and graphs, For programming too, Handy shortcuts, How to write formulas, Lists, Spell check, Try it now (+1 more)

### Community 63 - "spreadsheet/editor.ts"
Cohesion: 0.08
Nodes (46): currentCall(), Editing, MenuEntry, Move, openSheetEditor(), PATHS, SheetEditorOptions, Snapshot (+38 more)

### Community 64 - "topics.ts"
Cohesion: 0.08
Nodes (50): ATTRIBUTES, containerOf(), cut(), ER_SHAPES, fieldText(), fitLines(), flowOrder(), FREE_NAMES (+42 more)

### Community 65 - "num"
Cohesion: 0.07
Nodes (104): primed(), oneFraction(), splitAbs(), withoutAbs(), hyperbolicToExp(), linearIn(), termTransform(), polyEx() (+96 more)

### Community 66 - "localLlm"
Cohesion: 0.19
Nodes (7): glifoError(), localErrorMessage(), localLlm, Pending, fakeModel(), setup(), fakeModel()

### Community 67 - "fourier.ts"
Cohesion: 0.20
Nodes (19): fourierItems(), T, absOf(), boundsOf(), close(), definite(), fourierProblem, fourierShown() (+11 more)

### Community 68 - "editor/editor.ts"
Cohesion: 0.04
Nodes (58): @codemirror/language, @codemirror/state, @lezer/common, @lezer/highlight, acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin (+50 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "Glifo"
Cohesion: 0.12
Nodes (16): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Domande frequenti e commenti (+8 more)

### Community 73 - "usesDecimalComma"
Cohesion: 0.08
Nodes (46): number(), T, testItems(), classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX (+38 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.06
Nodes (69): primitive(), verified(), linearCells(), pairUp(), assumePositive(), cancelLinear(), commonMonomial(), commonPositive() (+61 more)

### Community 75 - "Field"
Cohesion: 0.12
Nodes (8): characteristicPolynomial(), eigenvalues(), evaluateLinear(), Field, formatPolynomial(), interpolate(), interpolateFloat(), polynomialIn()

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Errore o imprevisto → nel dettaglio, 3. Serve una decisione → frasi complete, 4. Fine del compito → un solo riepilogo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "plan.ts"
Cohesion: 0.12
Nodes (23): NumberStyle, shownStyle(), autoSum(), cellText(), columnRole(), columnsOf(), durationUnit(), isNumber() (+15 more)

### Community 79 - "aiPanel.test.ts"
Cohesion: 0.08
Nodes (26): definedName(), formulaTopic(), graphTopic(), numberText(), studyOf(), theoremTopic(), NoteSubject, SubjectKind (+18 more)

### Community 82 - "Il database degli account (Supabase)"
Cohesion: 0.20
Nodes (10): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il controllo anti-robot (CAPTCHA, ottobre 2026), Il database degli account (Supabase), Il progetto, Il trasloco su glifo.page (ottobre 2026) (+2 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.11
Nodes (11): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+3 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.13
Nodes (15): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+7 more)

### Community 91 - "strokes.ts"
Cohesion: 0.23
Nodes (13): between(), capsuleSpan(), circleSpan(), eraserGrowth(), eraseStroke(), intersect(), linearSpan(), pieceLength() (+5 more)

### Community 92 - "LlamaWorker"
Cohesion: 0.25
Nodes (5): Promemoria per lo studente, Commenti di chi prova Glifo, constructor(), LlamaWorker, Commenti di chi prova Glifo

### Community 96 - "account-test.mjs"
Cohesion: 0.11
Nodes (10): device(), login(), newContext, waitFor(), b64(), CAPTCHA_TOKEN, CODE, GOOGLE_CODE (+2 more)

### Community 97 - "planPreview.ts"
Cohesion: 0.19
Nodes (10): planSwatchSvg(), labelHtml(), readPlan(), planFigure(), planName(), ganttWidth(), PlanView, T (+2 more)

### Community 98 - "supabase.ts"
Cohesion: 0.07
Nodes (46): @supabase/supabase-js, captchaToken(), loadTurnstile(), Turnstile, TURNSTILE_SCRIPT, Window, TURNSTILE_SITE_KEY, accountError (+38 more)

### Community 100 - "noteWordsMath.test.ts"
Cohesion: 0.07
Nodes (28): BLOCKS, FROM_ENGLISH, FUNCTIONS, functionWordPairs(), GRAPH_KEY_FORMS, GRAPH_KEY_LINE, GRAPH_KEYS, graphKeyWord() (+20 more)

### Community 101 - "schemaBlocks.ts"
Cohesion: 0.07
Nodes (35): BlockWidget, findWidgetBlocks(), guardBlocks(), KINDS, schemaBlocks(), schemaSummary(), svg(), T (+27 more)

### Community 102 - "symbolsEn.test.ts"
Cohesion: 0.07
Nodes (49): EditorMathContext, expand(), preferredIndex(), SuggestionController, editDistance(), normalizeText(), singular(), stem() (+41 more)

### Community 103 - "siteUpdate.ts"
Cohesion: 0.16
Nodes (18): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, loadPart() (+10 more)

### Community 104 - "vitest"
Cohesion: 0.05
Nodes (56): vitest, setGraphLabels(), FIGURE_PALETTE, graphImage(), graphImagesFor(), graphsForFile(), graphsFromFile(), hide() (+48 more)

### Community 105 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 106 - "explainPanel.ts"
Cohesion: 0.10
Nodes (27): Explanation, REPLY_TOKENS, LocalAbort, ChatMessage, ChatOptions, LoadProgress, modelName(), modelOf() (+19 more)

### Community 107 - "spellcheck.ts"
Cohesion: 0.08
Nodes (24): @codemirror/lang-markdown, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt() (+16 more)

### Community 108 - "toolbar.ts"
Cohesion: 0.07
Nodes (28): EditorCallbacks, MarkdownEditor, searchPhrases(), insertBlock(), InsertOptions, insertTemplate(), templateInsertion(), toggleLinePrefix() (+20 more)

### Community 116 - "smoke-test.mjs"
Cohesion: 0.15
Nodes (6): markdown-it, playwright-core, PNG_ICONS, fakeLlmWorker(), firstVisit(), plainContext

### Community 117 - "schema/templates.ts"
Cohesion: 0.22
Nodes (18): SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), conceptMap(), cycle(), edge(), er() (+10 more)

### Community 118 - "solve.ts"
Cohesion: 0.17
Nodes (25): LinearScope, isStandardUnknown(), linearSystem(), breaks(), cubeRoot(), equation(), holds(), inequality() (+17 more)

### Community 119 - "NotesStore"
Cohesion: 0.04
Nodes (39): Deletion, DeletionLog, cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder() (+31 more)

### Community 122 - "Harness"
Cohesion: 0.22
Nodes (4): Sincronizzazione, `sync_pull({ since })`: scarica le novità, dispatch(), Harness

### Community 123 - "ExplainPanel"
Cohesion: 0.15
Nodes (5): localModel, explanationMarkdown(), ExplainChat, ExplainPanel, preventFocusSteal()

### Community 124 - "Sheet"
Cohesion: 0.07
Nodes (33): ExactComplexScope, ConicInfo, Ode, withWorkLimit(), FiniteContext, FormattedResult, MathNode, bracketParts() (+25 more)

### Community 125 - "relocation-test.mjs"
Cohesion: 0.18
Nodes (7): AFTER_MOVE, ids, newBrowser(), NOTICE_DAY, out, serve(), TYPES

### Community 128 - "Glifo – note per Claude"
Cohesion: 0.25
Nodes (8): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Regole, sqlite()

### Community 129 - "explain.ts"
Cohesion: 0.05
Nodes (82): 1. A cosa serve l'AI dei modelli di frontiera, allNames(), answerFollowUp(), bareResult(), chained(), chatContext, ChatFn, chatSubject() (+74 more)

### Community 136 - "Stroke"
Cohesion: 0.10
Nodes (8): DrawAction, EraseAction, pointsOf(), Step, BoardChange, BoardData, newStrokeId(), Stroke

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
Nodes (41): RFC-4180, fflate, tablesNote(), csvCell(), csvDelimiter(), csvNumbers(), csvToSheet(), digitsOf() (+33 more)

### Community 142 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 143 - "feedback.ts"
Cohesion: 0.07
Nodes (46): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, NEW_ORIGIN, accountOffMessage(), Site, T, commentDate() (+38 more)

### Community 144 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 154 - "ink.ts"
Cohesion: 0.11
Nodes (21): 2. Dalla lavagna alla nota, BoardOptions, Prefs, BOARD_PALETTES, BoardPalette, BoardTheme, highlightName(), inkName() (+13 more)

### Community 156 - "In programma"
Cohesion: 0.25
Nodes (8): Account: i propri appunti su ogni dispositivo, anche da condividere, Idee per il futuro, In programma, L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota (14 ottobre 2026, se ne parla), La lavagna: idee in più, Più avanti, Schemi: idee in più, Trasloco: il sito su Cloudflare, con un dominio tutto di Glifo

### Community 157 - "markdown.ts"
Cohesion: 0.11
Nodes (30): moveAttrs(), checkHtml(), checkTitle(), T, cache, escapeHtml(), renderTexMathml(), renderTexOrError() (+22 more)

### Community 160 - "vite"
Cohesion: 0.33
Nodes (4): vite, minutes, postMessage(), started

### Community 169 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 179 - "I modelli e le chiavi API"
Cohesion: 0.33
Nodes (6): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), In prova sul ramo `prova` (7 ottobre 2026): Qwen3 nel browser per «Spiegami», La chiave, il server locale e la scelta del modello (14 ottobre 2026), Le idee dello studente (5 ottobre 2026)

## Knowledge Gaps
- **877 isolated node(s):** `session-start.sh script`, `name`, `private`, `version`, `description` (+872 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1215 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **39 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `i18n.ts`, `explain.ts`, `main.ts`, `compile`, `spec.ts`, `h`, `primitive.ts`, `Stroke`, `blockMove.ts`, `graph/preview.ts`, `svg.ts`, `xlsx.ts`, `sheet.ts`, `chart.ts`, `SchemaEditor`, `namesIn`, `numerical.ts`, `toLatex`, `feedback.ts`, `SheetEditor`, `schema/editor.ts`, `spreadsheetEn.test.ts`, `Parser`, `board.ts`, `ink.ts`, `gauss.ts`, `parse.ts`, `gantt.ts`, `several.ts`, `Rational`, `assistant.ts`, `logic.ts`, `study.ts`, `complex.ts`, `markdown.ts`, `view3d.ts`, `Board`, `localModels.ts`, `functions.ts`, `MathError`, `board/shapes.ts`, `schema/shapes.ts`, `sidePanel.ts`, `linsys.ts`, `graph.ts`, `page.ts`, `src/relocation.ts`, `latex.ts`, `ui/preview.ts`, `spreadsheet/editor.ts`, `topics.ts`, `num`, `localLlm`, `fourier.ts`, `usesDecimalComma`, `symbolic.ts`, `plan.ts`, `aiPanel.test.ts`, `tutorial.mjs`, `strokes.ts`, `planPreview.ts`, `supabase.ts`, `schemaBlocks.ts`, `siteUpdate.ts`, `vitest`, `explainPanel.ts`, `toolbar.ts`, `smoke-test.mjs`, `NotesStore`, `ExplainPanel`, `Sheet`?**
  _High betweenness centrality (0.120) - this node is a cross-community bridge._
- **Why does `texts` connect `i18n.ts` to `explain.ts`, `GraphItem`, `compile`, `main.ts`, `spec.ts`, `h`, `graph/preview.ts`, `probability.ts`, `svg.ts`, `sheet.ts`, `xlsx.ts`, `chart.ts`, `feedback.ts`, `namesIn`, `numerical.ts`, `toLatex`, `index.ts`, `schema/editor.ts`, `spreadsheetEn.test.ts`, `ink.ts`, `board.ts`, `gauss.ts`, `parse.ts`, `gantt.ts`, `several.ts`, `study.ts`, `assistant.ts`, `logic.ts`, `spaces.ts`, `complex.ts`, `markdown.ts`, `resize.ts`, `localModels.ts`, `schemaEn.test.ts`, `functions.ts`, `MathError`, `conics.ts`, `sidePanel.ts`, `linsys.ts`, `restore.ts`, `page.ts`, `editor/lists.ts`, `src/relocation.ts`, `latex.ts`, `ui/preview.ts`, `spreadsheet/editor.ts`, `topics.ts`, `num`, `fourier.ts`, `editor/editor.ts`, `usesDecimalComma`, `symbolic.ts`, `plan.ts`, `aiPanel.test.ts`, `planPreview.ts`, `supabase.ts`, `schemaBlocks.ts`, `siteUpdate.ts`, `vitest`, `explainPanel.ts`, `spellcheck.ts`, `toolbar.ts`, `schema/templates.ts`, `solve.ts`, `NotesStore`?**
  _High betweenness centrality (0.114) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `i18n.ts`, `explain.ts`, `GraphItem`, `compile`, `h`, `primitive.ts`, `blockMove.ts`, `probability.ts`, `svg.ts`, `sheet.ts`, `xlsx.ts`, `chart.ts`, `feedback.ts`, `namesIn`, `schema/editor.ts`, `spreadsheetEn.test.ts`, `store.ts`, `Parser`, `board.ts`, `ink.ts`, `parse.ts`, `gantt.ts`, `assistant.ts`, `complex.ts`, `package.json`, `translations.test.ts`, `resize.ts`, `view3d.ts`, `localModels.ts`, `schemaEn.test.ts`, `MathError`, `board/shapes.ts`, `linsys.ts`, `restore.ts`, `page.ts`, `editor/lists.ts`, `src/relocation.ts`, `ui/preview.ts`, `spreadsheet/editor.ts`, `topics.ts`, `num`, `editor/editor.ts`, `plan.ts`, `aiPanel.test.ts`, `strokes.ts`, `supabase.ts`, `noteWordsMath.test.ts`, `schemaBlocks.ts`, `symbolsEn.test.ts`, `siteUpdate.ts`, `explainPanel.ts`, `spellcheck.ts`, `toolbar.ts`, `NotesStore`, `Sheet`?**
  _High betweenness centrality (0.076) - this node is a cross-community bridge._
- **Are the 327 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `tutorialModel()`) actually correct?**
  _`Dove sono le cose` has 327 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `name`, `private` to the rest of the system?**
  _877 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `i18n.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.03256417940265708 - nodes in this community are weakly interconnected._
- **Should `GraphItem` be split into smaller, more focused modules?**
  _Cohesion score 0.09333333333333334 - nodes in this community are weakly interconnected._