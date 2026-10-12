# Graph Report - matherdown  (2026-10-12)

## Corpus Check
- 327 files · ~641,065 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5234 nodes · 18565 edges · 154 communities (124 shown, 30 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 352 edges (avg confidence: 0.84)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a41194d1`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- touchlog.ts
- parse.ts
- main.ts
- MathError
- sync.ts
- spec.ts
- .constructor
- mul
- graph/preview.ts
- explain.ts
- spreadsheet/format.ts
- editor/lists.ts
- svg.ts
- feedback.ts
- SchemaEditor
- Board
- SheetEditor
- suggestions.ts
- numerical.ts
- arithmetic.ts
- index.ts
- client.ts
- tutorial.ts
- graph.ts
- store.ts
- linear.ts
- scopeWith
- assistant.ts
- editor/editor.ts
- page.ts
- gantt.ts
- Pt
- view3d.ts
- spellcheck.ts
- logic.ts
- topics.ts
- complex.ts
- namesIn
- translations.test.ts
- resize.ts
- engine.ts
- toolbar.ts
- several.ts
- study.ts
- functions.ts
- finite.ts
- src/relocation.ts
- board.ts
- Rational
- board/shapes.ts
- dom.ts
- sidePanel.ts
- sheet.ts
- supabase.ts
- laplace.ts
- NotesStore
- 20261004091555_note_condivise.sql
- i18n.ts
- database.ts
- num
- toNode
- dependencies
- Welcome to Glifo
- toLatex
- h
- Piano per piano
- spreadsheet/editor.ts
- blockMove.ts
- smoke-test.mjs
- Benvenuto in Glifo
- compilerOptions
- relocation-test.mjs
- inference.ts
- scripts
- symbolic.ts
- SpellClient
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- probability.ts
- session-start.sh
- .claude/CLAUDE.md
- calcResults.ts
- tutorial.mjs
- Abbonamenti
- markdown.ts
- supabase-stub.sql
- account-test.mjs
- statsShown.ts
- explainPanel.ts
- In programma
- solve.ts
- search.ts
- siteUpdate.ts
- ui/preview.ts
- schemaBlocks.ts
- severalGraph.ts
- localModels.ts
- xlsx.ts
- schema/shapes.ts
- Il database degli account (Supabase)
- Glifo – note per Claude
- ExplainPanel
- conics.ts
- parseSchema
- files.ts
- Le spiegazioni, come funzionano
- strokes.ts
- Sheet
- sql.ts
- gauss.ts
- createFakeSupabase
- graph/file.ts
- placeholders.ts
- FoldersStore
- Parser
- MarkdownEditor
- 20261008130026_commenti.sql
- plan.ts
- vitest
- schemaTools.test.ts
- captcha.ts
- Costi
- devDependencies
- restore.ts
- statsGraph.ts
- SheetModel
- La lavagna
- I modelli e le chiavi API

## God Nodes (most connected - your core abstractions)
1. `MathError` - 151 edges
2. `num()` - 145 edges
3. `Sheet` - 139 edges
4. `MathNode` - 129 edges
5. `mul()` - 124 edges
6. `h()` - 120 edges
7. `Board` - 118 edges
8. `compile()` - 113 edges
9. `Rational` - 111 edges
10. `toLatex()` - 103 edges

## Surprising Connections (you probably didn't know these)
- `Come viene pubblicata` --references--> `dist()`  [INFERRED]
  README.md → src/board/shapes.ts
- `Trasloco: il sito su Cloudflare, con un dominio tutto di Glifo` --references--> `dist()`  [INFERRED]
  ROADMAP.md → src/board/shapes.ts
- `Il controllo anti-robot (CAPTCHA, ottobre 2026)` --references--> `captchaToken()`  [INFERRED]
  supabase/README.md → src/account/captcha.ts
- `Dove sono le cose` --references--> `chooseLang()`  [INFERRED]
  ARCHITETTURA.md → src/i18n.ts
- `Dove sono le cose` --references--> `rich()`  [INFERRED]
  ARCHITETTURA.md → src/i18n.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (154 total, 30 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.09
Nodes (26): at(), browserStore, clip(), isSaved(), KINDS, LOG_KEY, LOG_MAX_LINES, LogStore (+18 more)

### Community 1 - "parse.ts"
Cohesion: 0.07
Nodes (40): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe(), differentialInFraction() (+32 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (115): newStrokeId(), addToGraphBlock(), setGraphLabels(), account, ACCOUNT_OFF, active, aiShown(), aiToggle (+107 more)

### Community 3 - "MathError"
Cohesion: 0.08
Nodes (47): fourierItems(), isFourierLine(), argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot() (+39 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (31): AccountSync, withLock(), Account, EMPTY_STATE, FolderChange, FolderRow, isEmpty(), iso() (+23 more)

### Community 5 - "spec.ts"
Cohesion: 0.06
Nodes (95): formulaAtCursor(), conicItems(), isConicLine(), quadricEquation(), constantIntegrand(), depth(), inequalityMargin(), integralRegion (+87 more)

### Community 6 - ".constructor"
Cohesion: 0.18
Nodes (3): loadPrefs(), pointsOf(), highlightName()

### Community 7 - "mul"
Cohesion: 0.15
Nodes (68): withoutAbs(), algebraic(), bigGcd(), byParts(), candidates(), canon(), combineLogs(), compareKeys() (+60 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (43): addLabel(), boxes, cameras, complexCoord(), containing(), coord(), drawings, drawnViews (+35 more)

### Community 9 - "explain.ts"
Cohesion: 0.05
Nodes (75): 4. Più modelli per «Spiegami», 5. A cosa serve la chiave dell'AI, 6. Glifo anche in inglese, La grafica: le otto richieste del 10 ottobre 2026, allNames(), answerFollowUp(), bareResult(), CHAT_SUBJECT (+67 more)

### Community 10 - "spreadsheet/format.ts"
Cohesion: 0.09
Nodes (41): at(), breakEven(), Point, quantity(), tableItems(), textLabel(), chartData, chartFrom() (+33 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.10
Nodes (55): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+47 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (57): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseWindow(), chooseY(), clipLines(), dataWindow() (+49 more)

### Community 13 - "feedback.ts"
Cohesion: 0.06
Nodes (51): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), PullResult, isShareToken(), parseSharedNote(), readSharedNote() (+43 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.10
Nodes (3): SchemaEditor, serializeSchema(), fileNameFor()

### Community 15 - "Board"
Cohesion: 0.09
Nodes (7): Board, BoardTheme, inkName(), copyStrokes(), transformStrokes(), shapePoints(), Box

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (4): SheetEditor, serializeSheet(), CellRange, cloneSheet()

### Community 17 - "suggestions.ts"
Cohesion: 0.14
Nodes (13): templateInsertion(), EditorMathContext, expand(), preferredIndex(), SuggestionController, CATEGORIES, cardPreviewTex(), formPreviewTex() (+5 more)

### Community 18 - "numerical.ts"
Cohesion: 0.07
Nodes (64): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Commenti, Compatibilità con VS Code, Condividere una nota con un link (+56 more)

### Community 19 - "arithmetic.ts"
Cohesion: 0.10
Nodes (47): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+39 more)

### Community 20 - "index.ts"
Cohesion: 0.07
Nodes (43): SuggestionItem, b, bigops, c, calculus, fn, fr, fractions (+35 more)

### Community 21 - "client.ts"
Cohesion: 0.12
Nodes (13): Backend, pageBackend(), SpellClientOptions, workerBackend(), WorkerUnavailable, download(), fetchDictionary(), FILES (+5 more)

### Community 22 - "tutorial.ts"
Cohesion: 0.14
Nodes (14): helpButton, openGuide(), HINT_MS, markTutorialSeen(), openTutorial(), show(), richText(), showTutorialHint() (+6 more)

### Community 23 - "graph.ts"
Cohesion: 0.10
Nodes (31): fieldInput(), isLanes(), AT_X, cellHtml(), cellText(), COMPASS, createEdgeCell(), createGraph() (+23 more)

### Community 24 - "store.ts"
Cohesion: 0.07
Nodes (15): BoardOptions, BoardBackend, BoardStore, done(), fromRecord(), IdbBoards, ofNote(), openBoardDatabase() (+7 more)

### Community 25 - "linear.ts"
Cohesion: 0.11
Nodes (58): angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, dataOf(), degreesText() (+50 more)

### Community 26 - "scopeWith"
Cohesion: 0.10
Nodes (38): close(), Definite, definiteIntegral(), exValue(), samples(), axesIn(), bestAlong(), boundingBox() (+30 more)

### Community 27 - "assistant.ts"
Cohesion: 0.11
Nodes (26): @anthropic-ai/sdk, AiAnswer, AiError, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible(), askThroughHost() (+18 more)

### Community 28 - "editor/editor.ts"
Cohesion: 0.08
Nodes (30): description, name, private, type, version, @codemirror/autocomplete, @codemirror/commands, @codemirror/language-data (+22 more)

### Community 29 - "page.ts"
Cohesion: 0.10
Nodes (20): katex, sidebarToggle(), body, saveButton, saveCopy(), settings, status, systemDark (+12 more)

### Community 30 - "gantt.ts"
Cohesion: 0.06
Nodes (72): amount(), barColor(), crossings(), dateText(), dayOf(), fitText(), GanttOptions, ganttSvg() (+64 more)

### Community 31 - "Pt"
Cohesion: 0.11
Nodes (14): clampZoom(), coalesced(), Finger, LassoAction, MoveAction, PanAction, PinchAction, pressureOf() (+6 more)

### Community 32 - "view3d.ts"
Cohesion: 0.06
Nodes (90): staticGraphSvg(), addMesh(), addTet(), affinePlane(), Axis, Box, centroid(), chooseBox() (+82 more)

### Community 33 - "spellcheck.ts"
Cohesion: 0.08
Nodes (24): @codemirror/lang-markdown, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt() (+16 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "topics.ts"
Cohesion: 0.15
Nodes (30): ATTRIBUTES, count(), cut(), definedName(), ER_SHAPES, fieldText(), fitLines(), flowOrder() (+22 more)

### Community 36 - "complex.ts"
Cohesion: 0.06
Nodes (56): ComplexDefinitions, add(), arg(), compileFunction(), complex, ComplexCompiled, ComplexFunction, ComplexScope (+48 more)

### Community 37 - "namesIn"
Cohesion: 0.14
Nodes (35): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+27 more)

### Community 38 - "translations.test.ts"
Cohesion: 0.17
Nodes (18): AstNode, calleeName(), check(), checkPair(), visit(), children(), entryPairs(), files (+10 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (24): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+16 more)

### Community 40 - "engine.ts"
Cohesion: 0.20
Nodes (9): @farscrl/hunspell-wasm, capitalize(), COMMON_FIXES, ELISIONS, inGlossary(), lower(), SpellEngine, GLOSSARY (+1 more)

### Community 41 - "toolbar.ts"
Cohesion: 0.07
Nodes (31): insertBlock(), InsertOptions, toggleLinePrefix(), wrapSelection(), ListStyleId, besideSchema(), BlockWidget, findWidgetBlocks() (+23 more)

### Community 42 - "several.ts"
Cohesion: 0.10
Nodes (45): Piece, Condition, Family, Group, Root, Shape, fractionNear(), at() (+37 more)

### Community 43 - "study.ts"
Cohesion: 0.17
Nodes (31): limit(), Asymptote, compiled(), cutsOf(), defined(), domainOf(), exact(), inDomain() (+23 more)

### Community 44 - "functions.ts"
Cohesion: 0.08
Nodes (58): EMPTY, evaluateSheet(), number(), SheetEvaluator, addFormat(), GENERAL, readInput(), FormulaNode (+50 more)

### Community 45 - "finite.ts"
Cohesion: 0.18
Nodes (27): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+19 more)

### Community 46 - "src/relocation.ts"
Cohesion: 0.10
Nodes (53): accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf() (+45 more)

### Community 47 - "board.ts"
Cohesion: 0.06
Nodes (45): Action, ACTION_NAMES, DOT_SIZES, DrawAction, EraseAction, EraserMode, HANDLE_REACH, ICON (+37 more)

### Community 48 - "Rational"
Cohesion: 0.08
Nodes (33): asin(), atan(), evaluateExactComplex(), exactSqrt(), GaussRational, sinh(), unavailable(), expSum (+25 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.14
Nodes (34): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+26 more)

### Community 50 - "dom.ts"
Cohesion: 0.11
Nodes (18): Folder, FolderGroup, groupByFolder(), loadClosedFolders(), saveClosedFolders(), NoteMeta, append(), Child (+10 more)

### Community 51 - "sidePanel.ts"
Cohesion: 0.06
Nodes (34): AiResult, valueNode(), NoteSubject, labelHtml(), swatchClass(), texHtml(), checkHtml(), checkTitle() (+26 more)

### Community 52 - "sheet.ts"
Cohesion: 0.05
Nodes (56): numericPartials(), expSumValue(), isCounter(), ExactFunction, ExactScope, formatRational(), Eigenvalue, EXACT (+48 more)

### Community 53 - "supabase.ts"
Cohesion: 0.10
Nodes (39): 1. «Cambia account», @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken() (+31 more)

### Community 54 - "laplace.ts"
Cohesion: 0.08
Nodes (73): factoredPolynomial(), factorsOf(), atIntegers(), oneFraction(), beyondPoles(), compiled(), E, exp() (+65 more)

### Community 55 - "NotesStore"
Cohesion: 0.08
Nodes (24): Deletion, DeletionLog, FOLDER_NAME_MAX, RemoteFolder, isUuid(), newId(), createdAtFromId(), deriveTitle() (+16 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "i18n.ts"
Cohesion: 0.07
Nodes (39): Dove sono le cose, Glifo – architettura, 3. Le impostazioni divise in sezioni, AI_SERVICES, T, browserLang(), browserLanguages(), byLang() (+31 more)

### Community 58 - "database.ts"
Cohesion: 0.23
Nodes (6): createDatabase(), createUser(), databaseTests(), feedbackTests(), migrations, shareTests()

### Community 59 - "num"
Cohesion: 0.09
Nodes (86): linearIn(), addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames() (+78 more)

### Community 60 - "toNode"
Cohesion: 0.14
Nodes (31): numShown(), EMPTY_SCOPE, absOf(), boundsOf(), close(), definite(), fourierProblem, fourierShown() (+23 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "Welcome to Glifo"
Cohesion: 0.20
Nodes (9): A few examples, Calculations and graphs, For programming too, Handy shortcuts, How to write formulas, Lists, Spell check, Try it now (+1 more)

### Community 63 - "toLatex"
Cohesion: 0.11
Nodes (35): isNumericalLine(), numericalItems(), areaFor(), constantValue(), names(), STUDY_GRAPH, studyItems(), ACCENT_COMMANDS (+27 more)

### Community 64 - "h"
Cohesion: 0.06
Nodes (58): SyncStatus, rich(), board, viewSwitch, moveDayLabel(), openShareDialog(), changeAccess(), changeCopy() (+50 more)

### Community 65 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 66 - "spreadsheet/editor.ts"
Cohesion: 0.08
Nodes (57): currentCall(), Editing, MenuEntry, Move, PATHS, rangeLabel(), formatCode(), formatValue() (+49 more)

### Community 67 - "blockMove.ts"
Cohesion: 0.11
Nodes (34): blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove, blockPlace(), closed() (+26 more)

### Community 68 - "smoke-test.mjs"
Cohesion: 0.14
Nodes (8): markdown-it, playwright-core, vite, firstVisit(), plainContext, minutes, postMessage(), started

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "relocation-test.mjs"
Cohesion: 0.18
Nodes (7): AFTER_MOVE, ids, newBrowser(), NOTICE_DAY, out, serve(), TYPES

### Community 72 - "inference.ts"
Cohesion: 0.14
Nodes (27): isTestLine(), number(), testItems(), chiSquareTest(), confidence(), confidenceShown(), Given, hypothesisTest() (+19 more)

### Community 73 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (69): primitive(), verified(), atValues(), cancelLinear(), combine(), commonMonomial(), commonPositive(), Converter (+61 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Errore o imprevisto → nel dettaglio, 3. Serve una decisione → frasi complete, 4. Fine del compito → un solo riepilogo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.05
Nodes (61): ALIGN, ARROW_NAMES, AT_ICONS, AT_NAMES, BASE_PRESETS, BIG_ARROWS, DB_PRESETS, Direction (+53 more)

### Community 79 - "probability.ts"
Cohesion: 0.06
Nodes (61): addExp(), choose(), continuousQuantile(), discreteQuantile(), Distribution, End, exactIntervalProbability(), factorialBig() (+53 more)

### Community 82 - "calcResults.ts"
Cohesion: 0.06
Nodes (39): @codemirror/language, @codemirror/state, @codemirror/view, @lezer/common, acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin (+31 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.09
Nodes (11): graphFile, names, namesFile, root, PNG_ICONS, centerOf(), clickOn(), ffmpeg (+3 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.14
Nodes (14): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+6 more)

### Community 91 - "markdown.ts"
Cohesion: 0.10
Nodes (37): ListStyle, dataRange(), bulletGroup(), Marker, sameList(), moveAttrs(), renderTexOrError(), renderTexWithResult() (+29 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.10
Nodes (11): @electric-sql/pglite, device(), login(), newContext, waitFor(), b64(), CAPTCHA_TOKEN, CODE (+3 more)

### Community 97 - "statsShown.ts"
Cohesion: 0.17
Nodes (31): check(), correlation(), count(), covariance(), Data, dataStatistic(), deviation(), fail() (+23 more)

### Community 98 - "explainPanel.ts"
Cohesion: 0.06
Nodes (48): chatContext, explainTarget, Explanation, REPLY_TOKENS, formulasUntil(), sheetBefore(), explanationMarkdown(), hasCalculation() (+40 more)

### Community 100 - "In programma"
Cohesion: 0.25
Nodes (8): Account: i propri appunti su ogni dispositivo, anche da condividere, Idee per il futuro, In programma, La grafica: account, impostazioni, commenti, AI e lingua (chiesto il 10 ottobre 2026, se ne parla), La lavagna: idee in più, Più avanti, Schemi: idee in più, Trasloco: il sito su Cloudflare, con un dominio tutto di Glifo

### Community 101 - "solve.ts"
Cohesion: 0.08
Nodes (31): characteristicPolynomial(), eigenvalues(), Field, interpolate(), interpolateFloat(), polynomialIn(), isStandardUnknown(), linearSystem() (+23 more)

### Community 102 - "search.ts"
Cohesion: 0.17
Nodes (24): editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex() (+16 more)

### Community 103 - "siteUpdate.ts"
Cohesion: 0.16
Nodes (16): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, PartNotLoaded (+8 more)

### Community 104 - "ui/preview.ts"
Cohesion: 0.08
Nodes (21): GraphLabels, renameGraphScope(), renameScopeKeys(), BlockKind, hydrateSheets(), BLOCK_NAMES, blockHiddenMessage(), blockKindOf() (+13 more)

### Community 105 - "schemaBlocks.ts"
Cohesion: 0.13
Nodes (20): KINDS, sheetSummary(), T, WidgetBlock, WidgetKind, SchemaBlock, openSheetEditor(), hide() (+12 more)

### Community 106 - "severalGraph.ts"
Cohesion: 0.40
Nodes (9): criticalLine(), isSeveralLine(), named(), severalItems(), surface(), bounded(), extremaOf(), optimumOf() (+1 more)

### Community 107 - "localModels.ts"
Cohesion: 0.09
Nodes (30): @mlc-ai/web-llm, chat(), GlifoError, Gpu, load(), post(), remove(), scope (+22 more)

### Community 108 - "xlsx.ts"
Cohesion: 0.10
Nodes (42): RFC-4180, fflate, tablesNote(), csvDelimiter(), csvToSheet(), field(), italian(), parseCsv() (+34 more)

### Community 113 - "schema/shapes.ts"
Cohesion: 0.08
Nodes (17): @maxgraph/core, ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape (+9 more)

### Community 116 - "Il database degli account (Supabase)"
Cohesion: 0.15
Nodes (12): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il controllo anti-robot (CAPTCHA, ottobre 2026), Il database degli account (Supabase), Il progetto, Il trasloco su glifo.page (ottobre 2026) (+4 more)

### Community 117 - "Glifo – note per Claude"
Cohesion: 0.15
Nodes (12): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole (+4 more)

### Community 118 - "ExplainPanel"
Cohesion: 0.15
Nodes (3): ExplainChat, ExplainPanel, preventFocusSteal()

### Community 119 - "conics.ts"
Cohesion: 0.18
Nodes (29): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+21 more)

### Community 120 - "parseSchema"
Cohesion: 0.08
Nodes (35): schemaSummary(), svg(), findSchemaBlock(), findSchemaBlocks(), OpenFence, schemaBlockAtLine(), schemaBlockText(), SchemaEditorOptions (+27 more)

### Community 121 - "files.ts"
Cohesion: 0.11
Nodes (25): 2. La pagina dei commenti, tipo FAQ, hostDownloads, inClaudeViewer(), feedbackButton, openComments(), canWriteFilesDirectly(), downloadBlob(), downloadText() (+17 more)

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "strokes.ts"
Cohesion: 0.09
Nodes (36): centerOn(), cross(), IDENTITY, insideLasso(), keepInside(), LASSO_SHARE, lassoed(), MAX_SIZE (+28 more)

### Community 124 - "Sheet"
Cohesion: 0.06
Nodes (39): Definition, Line, Line, ExactComplexScope, Ode, withWorkLimit(), FiniteContext, FormattedResult (+31 more)

### Community 125 - "sql.ts"
Cohesion: 0.17
Nodes (17): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+9 more)

### Community 127 - "gauss.ts"
Cohesion: 0.15
Nodes (26): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexLine(), isComplexValue() (+18 more)

### Community 128 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 129 - "graph/file.ts"
Cohesion: 0.07
Nodes (50): FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsForFile(), graphsFromFile(), hide() (+42 more)

### Community 131 - "placeholders.ts"
Cohesion: 0.10
Nodes (14): addPlaceholders, buildDecorations(), clearAllPlaceholders(), clearPlaceholders, contains(), currentIndex(), filledMark, getPlaceholders() (+6 more)

### Community 132 - "FoldersStore"
Cohesion: 0.16
Nodes (3): cleanFolderName(), FoldersStore, sameName()

### Community 136 - "MarkdownEditor"
Cohesion: 0.16
Nodes (5): EditorCallbacks, MarkdownEditor, searchPhrases(), tabOutOfMath(), insertTemplate()

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 139 - "plan.ts"
Cohesion: 0.20
Nodes (15): cellText(), columnRole(), columnsOf(), durationUnit(), isNumber(), isPlanRange(), MAX_ACTIVITIES, plain() (+7 more)

### Community 140 - "vitest"
Cohesion: 0.06
Nodes (33): vite-plugin-pwa, vitest, GraphItem, parseGraph(), parseMath(), accountOffMessage(), light, item() (+25 more)

### Community 141 - "schemaTools.test.ts"
Cohesion: 0.13
Nodes (24): laneOf(), alignBoxes(), Alignment, Box, distributeBoxes(), Position, base64(), crc32() (+16 more)

### Community 142 - "captcha.ts"
Cohesion: 0.21
Nodes (8): captchaToken(), loadTurnstile(), Turnstile, TURNSTILE_SCRIPT, Window, TURNSTILE_SITE_KEY, accountFailure(), Options

### Community 143 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 144 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

### Community 145 - "restore.ts"
Cohesion: 0.11
Nodes (12): MemoryBoards, BackupNote, backupNotes(), restoreBackup(), RestoreBoards, Restored, restoredMessage(), T (+4 more)

### Community 146 - "statsGraph.ts"
Cohesion: 0.18
Nodes (18): FieldContext, figureText(), linearItem(), tryFormat(), classes(), dataOf(), distributionExtent(), distributionLabel() (+10 more)

### Community 147 - "SheetModel"
Cohesion: 0.47
Nodes (4): SheetEditorOptions, Snapshot, SheetModel, XlsxSheet

### Community 148 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 149 - "I modelli e le chiavi API"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), In prova sul ramo `prova` (7 ottobre 2026): Qwen3 nel browser per «Spiegami», Le idee dello studente (5 ottobre 2026)

## Knowledge Gaps
- **759 isolated node(s):** `Comandi`, `Regole`, `6. Glifo anche in inglese`, `Condividere una nota con un link`, `Commenti` (+754 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1052 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **30 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `touchlog.ts`, `parse.ts`, `graph/file.ts`, `mul`, `explain.ts`, `spreadsheet/format.ts`, `editor/lists.ts`, `svg.ts`, `feedback.ts`, `captcha.ts`, `plan.ts`, `schemaTools.test.ts`, `restore.ts`, `suggestions.ts`, `tutorial.ts`, `store.ts`, `scopeWith`, `assistant.ts`, `editor/editor.ts`, `page.ts`, `gantt.ts`, `view3d.ts`, `spellcheck.ts`, `translations.test.ts`, `resize.ts`, `toolbar.ts`, `src/relocation.ts`, `board.ts`, `Rational`, `board/shapes.ts`, `dom.ts`, `sheet.ts`, `supabase.ts`, `laplace.ts`, `NotesStore`, `i18n.ts`, `database.ts`, `spreadsheet/editor.ts`, `blockMove.ts`, `probability.ts`, `calcResults.ts`, `explainPanel.ts`, `search.ts`, `siteUpdate.ts`, `ui/preview.ts`, `schemaBlocks.ts`, `localModels.ts`, `xlsx.ts`, `parseSchema`, `strokes.ts`, `Sheet`, `sql.ts`?**
  _High betweenness centrality (0.154) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `main.ts`, `.constructor`, `graph/preview.ts`, `feedback.ts`, `SchemaEditor`, `Board`, `SheetEditor`, `tutorial.ts`, `graph.ts`, `page.ts`, `gantt.ts`, `spellcheck.ts`, `resize.ts`, `toolbar.ts`, `board.ts`, `dom.ts`, `sidePanel.ts`, `i18n.ts`, `spreadsheet/editor.ts`, `schema/editor.ts`, `explainPanel.ts`, `ui/preview.ts`, `ExplainPanel`, `files.ts`?**
  _High betweenness centrality (0.056) - this node is a cross-community bridge._
- **Why does `Board` connect `Board` to `main.ts`, `.constructor`, `board.ts`, `store.ts`, `strokes.ts`, `Pt`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **What connects `Comandi`, `Regole`, `6. Glifo anche in inglese` to the rest of the system?**
  _759 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `touchlog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08653061224489796 - nodes in this community are weakly interconnected._
- **Should `parse.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0744792762465811 - nodes in this community are weakly interconnected._
- **Should `main.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.03870523415977961 - nodes in this community are weakly interconnected._