# Graph Report - Glifo  (2026-10-14)

## Corpus Check
- 346 files · ~723,211 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5563 nodes · 20346 edges · 163 communities (123 shown, 40 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 683 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `659e7364`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- i18n.ts
- noteWords.ts
- main.ts
- compile
- sync.ts
- spec.ts
- BoardStore
- primitive.ts
- graph/preview.ts
- Dove sono le cose
- distributions.ts
- logo.ts
- svg.ts
- downloadText
- SchemaEditor
- markdown.ts
- SheetEditor
- src/relocation.ts
- numerical.ts
- arithmetic.ts
- define.ts
- client.ts
- schema/editor.ts
- index.ts
- store.ts
- noteWordsMath.test.ts
- ink.ts
- ui/preview.ts
- strokes.ts
- several.ts
- gantt.ts
- study.ts
- parseGraph
- assistant.ts
- logic.ts
- linsys.ts
- complex.ts
- namesIn
- translations.test.ts
- resize.ts
- view3d.ts
- Schema
- localModels.ts
- spreadsheet/format.ts
- functions.ts
- MathError
- topics.ts
- Board
- schemaGuard.test.ts
- board/shapes.ts
- markers.ts
- sidePanel.ts
- editor/editor.ts
- toLatex
- num
- symbolsEn.test.ts
- 20261004091555_note_condivise.sql
- graph.ts
- database.ts
- finite.ts
- ExplainPanel
- dependencies
- Welcome to Glifo
- spreadsheet/editor.ts
- conics.ts
- odesolve.ts
- sheet.ts
- vitest
- blockMove.ts
- Benvenuto in Glifo
- compilerOptions
- relocation-test.mjs
- plan.ts
- chart.ts
- symbolic.ts
- explainChat.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- .folderItem
- tutorial.ts
- session-start.sh
- .claude/CLAUDE.md
- Il database degli account (Supabase)
- tutorial.mjs
- Abbonamenti
- render/lists.ts
- planPreview.ts
- supabase-stub.sql
- account-test.mjs
- toolbar.ts
- FoldersStore
- In programma
- sql.ts
- search.ts
- siteUpdate.ts
- graph/file.ts
- AiPanel
- engine.ts
- spellcheck.ts
- spellcheck
- schema/shapes.ts
- planBlock.ts
- supabase.ts
- Rational
- dictionaries.ts
- explainPanel.ts
- SpellClient
- Le spiegazioni, come funzionano
- board.ts
- Sheet
- page.ts
- createFakeSupabase
- Costi
- Piano per piano
- Parser
- Stroke
- 20261008130026_commenti.sql
- usesDecimalComma
- vite
- xlsx.ts
- editor/lists.ts
- feedback.ts
- smoke-test.mjs
- L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota
- Glifo – note per Claude
- .constructor
- LlamaWorker
- schema/templates.ts
- I modelli e le chiavi API

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 324 edges
2. `MathError` - 151 edges
3. `Sheet` - 147 edges
4. `num()` - 145 edges
5. `h()` - 136 edges
6. `MathNode` - 131 edges
7. `texts` - 125 edges
8. `mul()` - 124 edges
9. `Board` - 117 edges
10. `compile()` - 116 edges

## Surprising Connections (you probably didn't know these)
- `Dove sono le cose` --references--> `fakeLlmWorker()`  [INFERRED]
  ARCHITETTURA.md → scripts/smoke-test.mjs
- `Dove sono le cose` --references--> `tutorialModel()`  [INFERRED]
  ARCHITETTURA.md → scripts/tutorial.mjs
- `Dove sono le cose` --references--> `ConicElements`  [INFERRED]
  ARCHITETTURA.md → src/math/conics.ts
- `Come viene pubblicata` --references--> `dist()`  [INFERRED]
  README.md → src/board/shapes.ts
- `Trasloco: il sito su Cloudflare, con un dominio tutto di Glifo` --references--> `dist()`  [INFERRED]
  ROADMAP.md → src/board/shapes.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (163 total, 40 thin omitted)

### Community 0 - "i18n.ts"
Cohesion: 0.03
Nodes (132): SyncStatus, DownloadedModel, Gpu, gpuF16(), MODEL_LICENSES, ModelGroup, browserLang(), browserLanguages() (+124 more)

### Community 1 - "noteWords.ts"
Cohesion: 0.07
Nodes (47): @codemirror/view, addToGraphBlock(), GraphLabelLines, insertGraphBlock(), LABEL_KEYS, setGraphLabels(), graphsForFile(), graphsFromFile() (+39 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (120): unshareNote(), account, ACCOUNT_OFF, accountButton, accountDeps(), accountProblem(), active, aiShown() (+112 more)

### Community 3 - "compile"
Cohesion: 0.05
Nodes (83): criticalLine(), named(), severalItems(), surface(), T, areaFor(), constantValue(), argumentOrder() (+75 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (32): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+24 more)

### Community 5 - "spec.ts"
Cohesion: 0.04
Nodes (126): conicItems(), isConicLine(), quadricEquation(), T, fourierItems(), isFourierLine(), T, isComplexLine() (+118 more)

### Community 6 - "BoardStore"
Cohesion: 0.08
Nodes (18): BoardStore, MemoryBoards, newStrokeId(), applyAccountChange(), backup(), receiveRelocation(), restore(), BackupNote (+10 more)

### Community 7 - "primitive.ts"
Cohesion: 0.15
Nodes (54): degree(), pscale(), algebraic(), bigGcd(), byParts(), candidates(), canon(), combineLogs() (+46 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (41): FIGURE_PALETTE, addLabel(), boxes, cameras, complexCoord(), coord(), coordinates(), drawings (+33 more)

### Community 9 - "Dove sono le cose"
Cohesion: 0.05
Nodes (81): 1. A cosa serve l'AI dei modelli di frontiera, Dove sono le cose, Glifo – architettura, allNames(), answerFollowUp(), bareResult(), chained(), chatContext (+73 more)

### Community 10 - "distributions.ts"
Cohesion: 0.07
Nodes (62): addExp(), choose(), continuousQuantile(), decimals(), discreteQuantile(), exactIntervalProbability(), factorialBig(), FAMILIES (+54 more)

### Community 11 - "logo.ts"
Cohesion: 0.38
Nodes (4): BOX, glyph(), LOGO_COLOR, logoIcon()

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (54): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), dataWindow(), decimalText() (+46 more)

### Community 13 - "downloadText"
Cohesion: 0.23
Nodes (11): loadDialect(), base64(), crc32(), svgSize(), svgToPng(), T, withDensity(), downloadBlob() (+3 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.09
Nodes (11): isLanes(), SchemaEditor, withLaneContents(), createEdgeCell(), edgeLook(), isEdgeLook(), nodeLook(), nodeStyle() (+3 more)

### Community 15 - "markdown.ts"
Cohesion: 0.05
Nodes (65): description, name, private, type, version, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/language-data (+57 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (6): functionLabel(), MenuEntry, SheetEditor, englishTyping(), serializeSheet(), cloneSheet()

### Community 17 - "src/relocation.ts"
Cohesion: 0.05
Nodes (80): accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf() (+72 more)

### Community 18 - "numerical.ts"
Cohesion: 0.07
Nodes (64): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Domande frequenti e commenti (+56 more)

### Community 19 - "arithmetic.ts"
Cohesion: 0.06
Nodes (95): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+87 more)

### Community 20 - "define.ts"
Cohesion: 0.10
Nodes (22): g, greek, ch, chemistry, m, misc, o, operators (+14 more)

### Community 21 - "client.ts"
Cohesion: 0.20
Nodes (9): Backend, pageBackend(), SpellClientOptions, workerBackend(), WorkerUnavailable, SpellLanguage, createSpellService(), SpellRequest (+1 more)

### Community 22 - "schema/editor.ts"
Cohesion: 0.05
Nodes (63): laneOf(), alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ALIGN_NAMES (+55 more)

### Community 23 - "index.ts"
Cohesion: 0.10
Nodes (22): b, bigops, c, calculus, fn, fr, fractions, functions (+14 more)

### Community 24 - "store.ts"
Cohesion: 0.08
Nodes (17): BoardBackend, BoardChange, BoardData, done(), fromRecord(), IdbBoards, ofNote(), openBoardDatabase() (+9 more)

### Community 25 - "noteWordsMath.test.ts"
Cohesion: 0.07
Nodes (31): addPlaceholders, buildDecorations(), clearAllPlaceholders(), clearPlaceholders, contains(), currentIndex(), filledMark, getPlaceholders() (+23 more)

### Community 26 - "ink.ts"
Cohesion: 0.12
Nodes (20): perfect-freehand, Prefs, BOARD_PALETTES, BoardPalette, BoardTheme, highlightName(), inkName(), mid() (+12 more)

### Community 27 - "ui/preview.ts"
Cohesion: 0.09
Nodes (20): GraphLabels, BlockKind, MoveDir, Look, Theme, PreviewLook, BLOCK_NAMES, blockHiddenMessage() (+12 more)

### Community 28 - "strokes.ts"
Cohesion: 0.23
Nodes (13): between(), capsuleSpan(), circleSpan(), eraserGrowth(), eraseStroke(), intersect(), linearSpan(), pieceLength() (+5 more)

### Community 29 - "several.ts"
Cohesion: 0.06
Nodes (67): close(), Definite, definiteIntegral(), exValue(), samples(), EMPTY_SCOPE, Piece, LimitValue (+59 more)

### Community 30 - "gantt.ts"
Cohesion: 0.06
Nodes (75): searchPhrases(), amount(), barColor(), crossings(), dateText(), dayMonth(), dayOf(), fitText() (+67 more)

### Community 31 - "study.ts"
Cohesion: 0.14
Nodes (37): limit(), Asymptote, asymptoteText(), boundaries(), compiled(), cutsOf(), defined(), domainOf() (+29 more)

### Community 32 - "parseGraph"
Cohesion: 0.10
Nodes (25): staticGraphSvg(), chooseWindow(), containing(), specFor(), chooseBox(), parseGraph(), DrawOptions, graphSvg() (+17 more)

### Community 33 - "assistant.ts"
Cohesion: 0.07
Nodes (47): AiAnswer, AiError, AiResult, AiSettings, answerSchema(), askAi(), askCompatible(), askThroughHost() (+39 more)

### Community 34 - "logic.ts"
Cohesion: 0.11
Nodes (30): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+22 more)

### Community 35 - "linsys.ts"
Cohesion: 0.05
Nodes (104): multipleLabel(), exponentialForm(), fracTex(), fracText(), nearFraction(), piMultiple(), surd(), decimalSeparator() (+96 more)

### Community 36 - "complex.ts"
Cohesion: 0.06
Nodes (67): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexValue(), isInequality() (+59 more)

### Community 37 - "namesIn"
Cohesion: 0.11
Nodes (40): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+32 more)

### Community 38 - "translations.test.ts"
Cohesion: 0.17
Nodes (18): AstNode, calleeName(), check(), checkPair(), visit(), children(), entryPairs(), files (+10 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (24): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+16 more)

### Community 40 - "view3d.ts"
Cohesion: 0.06
Nodes (86): sampleRegion(), addMesh(), addTet(), affinePlane(), Axis, Box, centroid(), clipBy() (+78 more)

### Community 41 - "Schema"
Cohesion: 0.33
Nodes (4): SchemaEditorOptions, Schema, serializeSchema(), Template

### Community 42 - "localModels.ts"
Cohesion: 0.05
Nodes (51): @mlc-ai/web-llm, chat(), GlifoError, Gpu, load(), post(), remove(), scope (+43 more)

### Community 43 - "spreadsheet/format.ts"
Cohesion: 0.11
Nodes (24): pick(), decimalsOf(), divFormat(), ENGLISH, fixedNumber(), generalNumber(), group(), MAX_DECIMALS (+16 more)

### Community 44 - "functions.ts"
Cohesion: 0.08
Nodes (60): EMPTY, evaluateSheet(), number(), T, addFormat(), GENERAL, FormulaNode, Ref (+52 more)

### Community 45 - "MathError"
Cohesion: 0.10
Nodes (61): MathError, angleBetween(), asMatrix(), basisOf(), circleText(), cross(), Ctx, degreesText() (+53 more)

### Community 46 - "topics.ts"
Cohesion: 0.07
Nodes (64): ATTRIBUTES, cut(), ER_SHAPES, fitLines(), flowOrder(), formulaText(), FREE_NAMES, readSheet() (+56 more)

### Community 47 - "Board"
Cohesion: 0.10
Nodes (8): Board, clampZoom(), loadPrefs(), pressureOf(), sizeChoice(), validView(), SizeChoice, Pt

### Community 48 - "schemaGuard.test.ts"
Cohesion: 0.12
Nodes (15): toggleLinePrefix(), applyListStyle(), besideSchema(), BlockWidget, findWidgetBlocks(), guardBlocks(), schemaBlockRanges(), schemaBlocks() (+7 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (36): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+28 more)

### Community 50 - "markers.ts"
Cohesion: 0.19
Nodes (21): bullet(), childMarker(), column(), firstMarker(), label(), lettersMarker(), MarkerKind, MarkerStyle (+13 more)

### Community 51 - "sidePanel.ts"
Cohesion: 0.07
Nodes (31): formulaAtCursor(), InsertOptions, insertTemplate(), templateInsertion(), EditorMathContext, expand(), preferredIndex(), SuggestionController (+23 more)

### Community 52 - "editor/editor.ts"
Cohesion: 0.05
Nodes (51): @codemirror/lang-markdown, @codemirror/state, @lezer/common, definedName(), fieldText(), formulaTopic(), graphTopic(), listText() (+43 more)

### Community 53 - "toLatex"
Cohesion: 0.03
Nodes (92): typedSliderValue(), errorMessage(), ACCENT_COMMANDS, diffLatex(), DISTRIBUTION_LATEX, distributionLatex(), domainLatex(), fnLatex() (+84 more)

### Community 54 - "num"
Cohesion: 0.11
Nodes (77): monomial(), absOf(), atIntegers(), boundsOf(), close(), definite(), fourierProblem, fourierShown() (+69 more)

### Community 55 - "symbolsEn.test.ts"
Cohesion: 0.16
Nodes (20): normalizeText(), words(), IndexedEntry, SearchResult, getIndex(), isSubsequence(), keysOf(), MatchKind (+12 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "graph.ts"
Cohesion: 0.12
Nodes (24): AT_X, cellHtml(), cellText(), COMPASS, createGraph(), drawSchema(), edgeStyle(), edgeTextAt() (+16 more)

### Community 58 - "database.ts"
Cohesion: 0.21
Nodes (7): @electric-sql/pglite, createDatabase(), createUser(), databaseTests(), feedbackTests(), migrations, shareTests()

### Community 59 - "finite.ts"
Cohesion: 0.17
Nodes (28): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+20 more)

### Community 60 - "ExplainPanel"
Cohesion: 0.16
Nodes (4): ExplainChat, ExplainPanel, preventFocusSteal(), formulasSummary()

### Community 61 - "dependencies"
Cohesion: 0.04
Nodes (44): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+36 more)

### Community 62 - "Welcome to Glifo"
Cohesion: 0.20
Nodes (9): A few examples, Calculations and graphs, For programming too, Handy shortcuts, How to write formulas, Lists, Spell check, Try it now (+1 more)

### Community 63 - "spreadsheet/editor.ts"
Cohesion: 0.08
Nodes (50): currentCall(), Editing, Move, PATHS, SheetEditorOptions, Snapshot, T, CellResult (+42 more)

### Community 64 - "conics.ts"
Cohesion: 0.17
Nodes (30): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+22 more)

### Community 65 - "odesolve.ts"
Cohesion: 0.09
Nodes (65): linearIn(), addWave(), arrange(), cauchy(), compiled(), constantNames(), equalities(), firstOrderShape() (+57 more)

### Community 66 - "sheet.ts"
Cohesion: 0.06
Nodes (60): expSumValue(), ExactFunction, characteristicPolynomial(), dataOf(), Field, formatPolynomial(), interpolate(), Lin (+52 more)

### Community 67 - "vitest"
Cohesion: 0.07
Nodes (36): vitest, schemaSummary(), svg(), markdownForFile(), findSchemaBlocks(), schemaBlockAtLine(), openSchemaEditor(), hide() (+28 more)

### Community 68 - "blockMove.ts"
Cohesion: 0.10
Nodes (37): @codemirror/commands, blockMoved, blockMoves(), blockMoveTransaction(), LineMap, WidgetBlock, blank(), BlockMove (+29 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "relocation-test.mjs"
Cohesion: 0.18
Nodes (7): AFTER_MOVE, ids, newBrowser(), NOTICE_DAY, out, serve(), TYPES

### Community 72 - "plan.ts"
Cohesion: 0.17
Nodes (16): ITALIAN, NumberStyle, columnRole(), columnsOf(), durationUnit(), isNumber(), isPlanRange(), MAX_ACTIVITIES (+8 more)

### Community 73 - "chart.ts"
Cohesion: 0.13
Nodes (30): at(), breakEven(), Point, quantity(), T, tableItems(), textLabel(), chartData (+22 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (56): primitive(), verified(), atValues(), Converter, coordinates(), decimalText(), definiteParts(), definiteValue() (+48 more)

### Community 75 - "explainChat.ts"
Cohesion: 0.13
Nodes (16): ExplainTone, FollowUp, REPLY_TOKENS, Settings, AI_NEWS_TITLE, AI_WORKING_TITLE, aiActivity, AiWork (+8 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Errore o imprevisto → nel dettaglio, 3. Serve una decisione → frasi complete, 4. Fine del compito → un solo riepilogo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - ".folderItem"
Cohesion: 0.20
Nodes (4): clear(), formatDate(), NotesPanel, NotesPanelDeps

### Community 79 - "tutorial.ts"
Cohesion: 0.15
Nodes (12): HINT_MS, markTutorialSeen(), openTutorial(), show(), richText(), showTutorialHint(), close(), T (+4 more)

### Community 82 - "Il database degli account (Supabase)"
Cohesion: 0.20
Nodes (9): Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Note condivise con un link, Sincronizzazione, `sync_pull({ since })`: scarica le novità (+1 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.11
Nodes (11): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+3 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.11
Nodes (19): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Deciso (5 ottobre 2026), Dopo (+11 more)

### Community 91 - "render/lists.ts"
Cohesion: 0.21
Nodes (16): Item, ListStyle, bulletGroup(), ListLine, Marker, resolveMarker(), sameList(), alignInside() (+8 more)

### Community 92 - "planPreview.ts"
Cohesion: 0.15
Nodes (13): graphImagesFor(), labelHtml(), readPlan(), ganttWidth(), PlanView, T, GraphLook, Palette (+5 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.11
Nodes (10): device(), login(), newContext, waitFor(), b64(), CAPTCHA_TOKEN, CODE, GOOGLE_CODE (+2 more)

### Community 97 - "toolbar.ts"
Cohesion: 0.15
Nodes (17): insertBlock(), wrapSelection(), ListStyleId, Action, createToolbar(), insertCode(), insertLink(), listMenu() (+9 more)

### Community 98 - "FoldersStore"
Cohesion: 0.17
Nodes (3): cleanFolderName(), FoldersStore, sameName()

### Community 100 - "In programma"
Cohesion: 0.25
Nodes (8): Account: i propri appunti su ogni dispositivo, anche da condividere, Idee per il futuro, In programma, L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota (14 ottobre 2026, se ne parla), La lavagna: idee in più, Più avanti, Schemi: idee in più, Trasloco: il sito su Cloudflare, con un dominio tutto di Glifo

### Community 101 - "sql.ts"
Cohesion: 0.16
Nodes (18): Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote(), readTables() (+10 more)

### Community 102 - "search.ts"
Cohesion: 0.18
Nodes (20): editDistance(), singular(), stem(), STOPWORDS, BOTH, buildIndex(), containsPhrase(), getIndex() (+12 more)

### Community 103 - "siteUpdate.ts"
Cohesion: 0.16
Nodes (18): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, loadPart() (+10 more)

### Community 104 - "graph/file.ts"
Cohesion: 0.12
Nodes (30): figureName(), graphFigure(), graphImage(), OPEN, swatchSvg(), T, titleBand(), ACCENTS (+22 more)

### Community 105 - "AiPanel"
Cohesion: 0.29
Nodes (5): NoteSubject, AiPanel, graphLabel(), kindName(), texInline()

### Community 106 - "engine.ts"
Cohesion: 0.22
Nodes (8): capitalize(), COMMON_FIXES, ELISIONS, inGlossary(), lower(), SpellEngine, GLOSSARY, normalizeWord()

### Community 107 - "spellcheck.ts"
Cohesion: 0.12
Nodes (15): misspelledMark, refreshSpelling, setTarget, SKIP, SpellTarget, T, wordsToCheck(), findWords() (+7 more)

### Community 108 - "spellcheck"
Cohesion: 0.21
Nodes (8): spellcheck(), close(), misspelledAt(), openAt(), replace(), tooltipView(), SpellChecker, SpellcheckOptions

### Community 113 - "schema/shapes.ts"
Cohesion: 0.08
Nodes (17): @maxgraph/core, ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape (+9 more)

### Community 116 - "planBlock.ts"
Cohesion: 0.23
Nodes (13): monthOf(), MONTHS, MONTHS_EN, parseDate(), planBlock, PlanKind, planRange(), T (+5 more)

### Community 117 - "supabase.ts"
Cohesion: 0.08
Nodes (39): @supabase/supabase-js, captchaToken(), loadTurnstile(), Turnstile, TURNSTILE_SCRIPT, Window, TURNSTILE_SITE_KEY, accountError (+31 more)

### Community 118 - "Rational"
Cohesion: 0.06
Nodes (53): Part, EMPTY_COMPLEX_SCOPE, End, expSum, Family, Interval, CompileOptions, bigGcd() (+45 more)

### Community 119 - "dictionaries.ts"
Cohesion: 0.25
Nodes (4): download(), fetchDictionary(), FILES, DictionaryData

### Community 120 - "explainPanel.ts"
Cohesion: 0.07
Nodes (42): @codemirror/language, explainTarget, Explanation, schemaTitle(), acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin (+34 more)

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "board.ts"
Cohesion: 0.06
Nodes (48): Action, coalesced(), DOT_SIZES, EraserMode, Finger, HANDLE_REACH, ICON, LassoAction (+40 more)

### Community 124 - "Sheet"
Cohesion: 0.08
Nodes (26): ExactComplexScope, Ode, withWorkLimit(), FiniteContext, FormattedResult, chiSquareTest(), InferenceContext, Mat (+18 more)

### Community 125 - "page.ts"
Cohesion: 0.07
Nodes (45): katex, accountDataFile(), PullResult, openShareDialog(), changeAccess(), changeCopy(), copy(), refreshChanged() (+37 more)

### Community 128 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 129 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 132 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 136 - "Stroke"
Cohesion: 0.10
Nodes (6): BoardOptions, DrawAction, EraseAction, pointsOf(), Step, Stroke

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 139 - "usesDecimalComma"
Cohesion: 0.08
Nodes (34): numberText(), FieldContext, valueLabel(), number(), T, testItems(), endTex(), Range (+26 more)

### Community 140 - "vite"
Cohesion: 0.33
Nodes (4): vite, minutes, postMessage(), started

### Community 141 - "xlsx.ts"
Cohesion: 0.07
Nodes (54): RFC-4180, fflate, tablesNote(), csvCell(), csvDelimiter(), csvNumbers(), csvToSheet(), digitsOf() (+46 more)

### Community 142 - "editor/lists.ts"
Cohesion: 0.17
Nodes (30): continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext(), isBlank() (+22 more)

### Community 143 - "feedback.ts"
Cohesion: 0.06
Nodes (53): vite-plugin-pwa, AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, feedbackButton, openFeedback(), NEW_ORIGIN, accountOffMessage() (+45 more)

### Community 146 - "smoke-test.mjs"
Cohesion: 0.15
Nodes (6): markdown-it, playwright-core, PNG_ICONS, fakeLlmWorker(), firstVisit(), plainContext

### Community 154 - "L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota"
Cohesion: 0.25
Nodes (8): 2. Dalla lavagna alla nota, 3. Da una foto alla nota, 4. Dettare: la voce diventa testo nella nota, 5. Registrare le lezioni e trascriverle, Da sistemare con il primo punto che tocca l'AI, Fonti (controllate il 14 ottobre 2026), In che ordine, L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota

### Community 156 - "Glifo – note per Claude"
Cohesion: 0.25
Nodes (8): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Regole, sqlite()

### Community 160 - "LlamaWorker"
Cohesion: 0.25
Nodes (5): Promemoria per lo studente, Commenti di chi prova Glifo, constructor(), LlamaWorker, Commenti di chi prova Glifo

### Community 172 - "schema/templates.ts"
Cohesion: 0.23
Nodes (17): SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), conceptMap(), cycle(), edge(), er() (+9 more)

### Community 179 - "I modelli e le chiavi API"
Cohesion: 0.29
Nodes (7): Deciso (5 ottobre 2026), Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), In prova sul ramo `prova` (7 ottobre 2026): Qwen3 nel browser per «Spiegami», La chiave, il server locale e la scelta del modello (14 ottobre 2026), Le idee dello studente (5 ottobre 2026)

## Knowledge Gaps
- **874 isolated node(s):** `Condividere una nota con un link`, `Domande frequenti e commenti`, `Provarlo sul tuo computer`, `Assistente AI`, `Spiegami (in prova)` (+869 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1194 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **40 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `texts` connect `i18n.ts` to `main.ts`, `compile`, `spec.ts`, `BoardStore`, `graph/preview.ts`, `Dove sono le cose`, `distributions.ts`, `usesDecimalComma`, `svg.ts`, `downloadText`, `editor/lists.ts`, `markdown.ts`, `feedback.ts`, `src/relocation.ts`, `numerical.ts`, `arithmetic.ts`, `xlsx.ts`, `schema/editor.ts`, `index.ts`, `ink.ts`, `ui/preview.ts`, `Glifo – note per Claude`, `several.ts`, `gantt.ts`, `study.ts`, `assistant.ts`, `logic.ts`, `linsys.ts`, `complex.ts`, `namesIn`, `resize.ts`, `localModels.ts`, `spreadsheet/format.ts`, `schema/templates.ts`, `MathError`, `topics.ts`, `functions.ts`, `sidePanel.ts`, `editor/editor.ts`, `toLatex`, `num`, `finite.ts`, `spreadsheet/editor.ts`, `conics.ts`, `odesolve.ts`, `sheet.ts`, `vitest`, `plan.ts`, `chart.ts`, `symbolic.ts`, `explainChat.ts`, `tutorial.ts`, `planPreview.ts`, `toolbar.ts`, `sql.ts`, `siteUpdate.ts`, `graph/file.ts`, `spellcheck.ts`, `planBlock.ts`, `supabase.ts`, `Rational`, `explainPanel.ts`, `board.ts`, `page.ts`?**
  _High betweenness centrality (0.162) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `Dove sono le cose` to `i18n.ts`, `noteWords.ts`, `main.ts`, `compile`, `spec.ts`, `BoardStore`, `primitive.ts`, `Stroke`, `graph/preview.ts`, `distributions.ts`, `usesDecimalComma`, `svg.ts`, `xlsx.ts`, `SchemaEditor`, `markdown.ts`, `downloadText`, `src/relocation.ts`, `smoke-test.mjs`, `arithmetic.ts`, `numerical.ts`, `feedback.ts`, `schema/editor.ts`, `SheetEditor`, `noteWordsMath.test.ts`, `ink.ts`, `ui/preview.ts`, `strokes.ts`, `several.ts`, `gantt.ts`, `.constructor`, `parseGraph`, `assistant.ts`, `logic.ts`, `linsys.ts`, `complex.ts`, `namesIn`, `study.ts`, `view3d.ts`, `localModels.ts`, `spreadsheet/format.ts`, `functions.ts`, `MathError`, `topics.ts`, `Board`, `schemaGuard.test.ts`, `board/shapes.ts`, `sidePanel.ts`, `editor/editor.ts`, `toLatex`, `num`, `finite.ts`, `ExplainPanel`, `spreadsheet/editor.ts`, `conics.ts`, `odesolve.ts`, `sheet.ts`, `blockMove.ts`, `plan.ts`, `chart.ts`, `symbolic.ts`, `explainChat.ts`, `tutorial.ts`, `tutorial.mjs`, `planPreview.ts`, `toolbar.ts`, `siteUpdate.ts`, `graph/file.ts`, `AiPanel`, `schema/shapes.ts`, `planBlock.ts`, `supabase.ts`, `explainPanel.ts`, `board.ts`, `Sheet`?**
  _High betweenness centrality (0.095) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `i18n.ts`, `noteWords.ts`, `spec.ts`, `BoardStore`, `Dove sono le cose`, `distributions.ts`, `logo.ts`, `svg.ts`, `xlsx.ts`, `editor/lists.ts`, `markdown.ts`, `feedback.ts`, `src/relocation.ts`, `schema/editor.ts`, `store.ts`, `noteWordsMath.test.ts`, `ink.ts`, `strokes.ts`, `gantt.ts`, `parseGraph`, `assistant.ts`, `linsys.ts`, `namesIn`, `translations.test.ts`, `resize.ts`, `view3d.ts`, `localModels.ts`, `MathError`, `topics.ts`, `schemaGuard.test.ts`, `board/shapes.ts`, `markers.ts`, `sidePanel.ts`, `editor/editor.ts`, `toLatex`, `num`, `symbolsEn.test.ts`, `database.ts`, `spreadsheet/editor.ts`, `blockMove.ts`, `plan.ts`, `chart.ts`, `explainChat.ts`, `tutorial.ts`, `planPreview.ts`, `sql.ts`, `search.ts`, `siteUpdate.ts`, `spellcheck.ts`, `supabase.ts`, `Rational`, `board.ts`, `Sheet`, `page.ts`?**
  _High betweenness centrality (0.066) - this node is a cross-community bridge._
- **Are the 323 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `tutorialModel()`) actually correct?**
  _`Dove sono le cose` has 323 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Condividere una nota con un link`, `Domande frequenti e commenti`, `Provarlo sul tuo computer` to the rest of the system?**
  _874 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `i18n.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.027932643076572988 - nodes in this community are weakly interconnected._
- **Should `noteWords.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06599326599326599 - nodes in this community are weakly interconnected._