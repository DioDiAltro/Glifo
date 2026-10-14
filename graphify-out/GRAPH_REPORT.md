# Graph Report - Glifo  (2026-10-14)

## Corpus Check
- 346 files · ~723,234 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5559 nodes · 20328 edges · 168 communities (126 shown, 42 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 681 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `13cd67bd`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- i18n.ts
- usesDecimalComma
- main.ts
- compile
- sync.ts
- spec.ts
- .remove
- num
- graph/preview.ts
- Dove sono le cose
- distributions.ts
- NotesStore
- vitest
- latex.ts
- SchemaEditor
- editor/editor.ts
- SheetEditor
- src/relocation.ts
- numerical.ts
- toLatex
- index.ts
- engine.ts
- schema/editor.ts
- ExplainPanel
- BoardStore
- parse.ts
- board.ts
- ui/preview.ts
- SidePanel
- several.ts
- gantt.ts
- study.ts
- toolbar.ts
- assistant.ts
- logic.ts
- statsGraph.ts
- complex.ts
- namesIn
- translations.test.ts
- resize.ts
- view3d.ts
- calcResults.ts
- localModels.ts
- noteWordsMath.test.ts
- functions.ts
- MathError
- spreadsheetEn.test.ts
- .constructor
- .paintVertexShape
- board/shapes.ts
- editor/lists.ts
- suggestions.ts
- editor.test.ts
- rich
- Rational
- icon
- 20261004091555_note_condivise.sql
- nodeLook
- Glifo
- finite.ts
- h
- dependencies
- Welcome to Glifo
- spreadsheet/editor.ts
- .constructor
- odesolve.ts
- sheet.ts
- schema/model.ts
- blockMove.ts
- Benvenuto in Glifo
- compilerOptions
- render/lists.ts
- Pt
- SuggestionController
- symbolic.ts
- sidePanel.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- devDependencies
- ui/relocation.ts
- session-start.sh
- .claude/CLAUDE.md
- Il database degli account (Supabase)
- tutorial.mjs
- Abbonamenti
- topics.ts
- files.ts
- supabase-stub.sql
- account-test.mjs
- schemaBlocks.ts
- FoldersStore
- In programma
- relocation-test.mjs
- symbolsEn.test.ts
- schemaTools.test.ts
- markdown.ts
- aiPanel.test.ts
- suggest.ts
- spellcheck.ts
- openSettingsDialog
- graph.ts
- escapeHtml
- supabase.ts
- probability.ts
- conics.ts
- scripts
- tutorial.ts
- Le spiegazioni, come funzionano
- strokes.ts
- Sheet
- page.ts
- createFakeSupabase
- I modelli e le chiavi API
- Piano per piano
- pick
- Board
- 20261008130026_commenti.sql
- siteUpdate.ts
- Costi
- xlsx.ts
- schema/templates.ts
- feedback.ts
- captcha.ts
- smoke-test.mjs
- L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota
- Glifo – note per Claude
- vite
- database.ts
- site.ts
- LlamaWorker
- numerical.test.ts
- fourier.ts
- La lavagna
- NodeLook

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 323 edges
2. `MathError` - 151 edges
3. `Sheet` - 147 edges
4. `num()` - 145 edges
5. `h()` - 136 edges
6. `MathNode` - 131 edges
7. `texts` - 124 edges
8. `mul()` - 124 edges
9. `Board` - 117 edges
10. `compile()` - 116 edges

## Surprising Connections (you probably didn't know these)
- `Dove sono le cose` --references--> `fakeLlmWorker()`  [INFERRED]
  ARCHITETTURA.md → scripts/smoke-test.mjs
- `Dove sono le cose` --references--> `tutorialModel()`  [INFERRED]
  ARCHITETTURA.md → scripts/tutorial.mjs
- `Dove sono le cose` --references--> `WidgetKind`  [INFERRED]
  ARCHITETTURA.md → src/editor/schemaBlocks.ts
- `Dove sono le cose` --references--> `ConicElements`  [INFERRED]
  ARCHITETTURA.md → src/math/conics.ts
- `Funzionalità` --references--> `k()`  [INFERRED]
  README.md → src/math/numerical.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (168 total, 42 thin omitted)

### Community 0 - "i18n.ts"
Cohesion: 0.09
Nodes (34): DownloadedModel, Gpu, gpuF16(), MODEL_LICENSES, ModelGroup, browserLang(), browserLanguages(), dateLocale() (+26 more)

### Community 1 - "usesDecimalComma"
Cohesion: 0.10
Nodes (37): numberText(), valueLabel(), number(), endTex(), areaFor(), usesDecimalComma(), decimalSeparator(), Digits (+29 more)

### Community 2 - "main.ts"
Cohesion: 0.03
Nodes (127): addToGraphBlock(), remapGraphLines(), account, ACCOUNT_OFF, accountButton, active, aiShown(), aiToggle (+119 more)

### Community 3 - "compile"
Cohesion: 0.05
Nodes (92): integralRegion, argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot(), fieldOn() (+84 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (32): AccountSync, withLock(), Account, supabaseBackendFor(), EMPTY_STATE, FolderChange, FolderRow, isEmpty() (+24 more)

### Community 5 - "spec.ts"
Cohesion: 0.04
Nodes (113): formulaAtCursor(), GraphLabelLines, insertGraphBlock(), LABEL_KEYS, setGraphLabels(), conicItems(), isConicLine(), quadricEquation() (+105 more)

### Community 7 - "num"
Cohesion: 0.11
Nodes (100): atIntegers(), withoutAbs(), exp(), hyperbolicToExp(), inverseRational(), sqrtEx(), termTransform(), polyEx() (+92 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (43): addLabel(), boxes, cameras, complexCoord(), coord(), coordinates(), drawings, drawnViews (+35 more)

### Community 9 - "Dove sono le cose"
Cohesion: 0.06
Nodes (79): 1. A cosa serve l'AI dei modelli di frontiera, Dove sono le cose, Glifo – architettura, allNames(), answerFollowUp(), bareResult(), chained(), chatContext (+71 more)

### Community 10 - "distributions.ts"
Cohesion: 0.06
Nodes (67): addExp(), choose(), continuousQuantile(), decimals(), discreteQuantile(), Distribution, exactIntervalProbability(), factorialBig() (+59 more)

### Community 11 - "NotesStore"
Cohesion: 0.07
Nodes (46): accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf() (+38 more)

### Community 12 - "vitest"
Cohesion: 0.05
Nodes (92): vitest, contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), staticGraphSvg(), chooseWindow(), chooseY() (+84 more)

### Community 13 - "latex.ts"
Cohesion: 0.11
Nodes (27): ACCENT_COMMANDS, diffLatex(), DISTRIBUTION_LATEX, distributionLatex(), domainLatex(), fnLatex(), fnName(), formLatex() (+19 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.11
Nodes (3): isLanes(), SchemaEditor, withLaneContents()

### Community 15 - "editor/editor.ts"
Cohesion: 0.05
Nodes (47): description, name, private, type, version, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/language-data (+39 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (7): functionLabel(), SheetEditor, englishTyping(), serializeSheet(), sheetSize(), CellRange, cloneSheet()

### Community 17 - "src/relocation.ts"
Cohesion: 0.07
Nodes (52): DEFAULT_LOCAL_MODEL, isLang(), applySpellcheck(), receiveRelocation(), restore(), setPersonalWords(), wordsChangedHere(), buildPackage() (+44 more)

### Community 18 - "numerical.ts"
Cohesion: 0.10
Nodes (53): isNumericalLine(), numericalItems(), FormatOptions, bisection(), cholesky(), condition(), derivative(), exactPolynomial() (+45 more)

### Community 19 - "toLatex"
Cohesion: 0.06
Nodes (87): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+79 more)

### Community 20 - "index.ts"
Cohesion: 0.06
Nodes (45): b, bigops, c, calculus, fn, fr, fractions, functions (+37 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "schema/editor.ts"
Cohesion: 0.05
Nodes (39): ALIGN, ALIGN_NAMES, ARROW_NAMES, AT_ICONS, AT_NAMES, BASE_PRESETS, BIG_ARROWS, DB_PRESETS (+31 more)

### Community 23 - "ExplainPanel"
Cohesion: 0.15
Nodes (4): ExplainChat, ExplainPanel, preventFocusSteal(), setup()

### Community 24 - "BoardStore"
Cohesion: 0.05
Nodes (18): BoardOptions, BoardBackend, BoardStore, done(), fromRecord(), IdbBoards, MemoryBoards, ofNote() (+10 more)

### Community 25 - "parse.ts"
Cohesion: 0.07
Nodes (43): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe(), differentialInFraction() (+35 more)

### Community 26 - "board.ts"
Cohesion: 0.07
Nodes (45): Action, DOT_SIZES, DrawAction, EraseAction, EraserMode, HANDLE_REACH, ICON, MODE_NAMES (+37 more)

### Community 27 - "ui/preview.ts"
Cohesion: 0.08
Nodes (22): GraphLabels, remapLineKeys(), renameGraphScope(), renameScopeKeys(), BlockKind, hydrateSheets(), T, BLOCK_NAMES (+14 more)

### Community 28 - "SidePanel"
Cohesion: 0.18
Nodes (7): localizeTex(), cleanKatexError(), cardPreview(), displayCode(), formPreview(), preventFocusSteal(), SidePanel

### Community 29 - "several.ts"
Cohesion: 0.07
Nodes (65): criticalLine(), named(), severalItems(), surface(), T, close(), Definite, definiteIntegral() (+57 more)

### Community 30 - "gantt.ts"
Cohesion: 0.04
Nodes (103): searchPhrases(), amount(), barColor(), crossings(), dateText(), dayMonth(), dayOf(), fitText() (+95 more)

### Community 31 - "study.ts"
Cohesion: 0.07
Nodes (67): names(), STUDY_GRAPH, studyItems(), T, nameLatex(), isStandardUnknown(), linearSystem(), RelOp (+59 more)

### Community 32 - "toolbar.ts"
Cohesion: 0.16
Nodes (17): insertBlock(), wrapSelection(), ListStyleId, Action, createToolbar(), insertCode(), insertLink(), listMenu() (+9 more)

### Community 33 - "assistant.ts"
Cohesion: 0.09
Nodes (32): AiAnswer, AiError, AiSettings, answerSchema(), askAi(), askCompatible(), askThroughHost(), capitalized() (+24 more)

### Community 34 - "logic.ts"
Cohesion: 0.11
Nodes (30): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+22 more)

### Community 35 - "statsGraph.ts"
Cohesion: 0.21
Nodes (14): classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX, Line, number(), pmfBars() (+6 more)

### Community 36 - "complex.ts"
Cohesion: 0.05
Nodes (80): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexValue(), isInequality() (+72 more)

### Community 37 - "namesIn"
Cohesion: 0.12
Nodes (39): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+31 more)

### Community 38 - "translations.test.ts"
Cohesion: 0.17
Nodes (18): AstNode, calleeName(), check(), checkPair(), visit(), children(), entryPairs(), files (+10 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (24): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+16 more)

### Community 40 - "view3d.ts"
Cohesion: 0.06
Nodes (87): LayeredSolid, addMesh(), addTet(), affinePlane(), Axis, Box, centroid(), clipBy() (+79 more)

### Community 41 - "calcResults.ts"
Cohesion: 0.07
Nodes (44): @codemirror/language, @codemirror/state, @lezer/common, explainTarget, schemaTitle(), acceptCalcResult(), CalcCheck, calcOutcomes() (+36 more)

### Community 42 - "localModels.ts"
Cohesion: 0.05
Nodes (49): @mlc-ai/web-llm, chat(), GlifoError, Gpu, load(), post(), remove(), scope (+41 more)

### Community 43 - "noteWordsMath.test.ts"
Cohesion: 0.11
Nodes (17): katex, AstNode, childrenOf(), DATA, ENGLISH, englishTexts(), FUNCTIONS, inBothLanguages() (+9 more)

### Community 44 - "functions.ts"
Cohesion: 0.07
Nodes (65): EMPTY, evaluateSheet(), number(), SheetEvaluator, T, addFormat(), divFormat(), GENERAL (+57 more)

### Community 45 - "MathError"
Cohesion: 0.09
Nodes (69): figureText(), linearItem(), MathError, angleBetween(), asMatrix(), basisOf(), circleText(), cross() (+61 more)

### Community 46 - "spreadsheetEn.test.ts"
Cohesion: 0.08
Nodes (56): valueText(), sheetSummary(), csvCell(), openSheetEditor(), booleanText(), ENGLISH, englishNumber(), errorText() (+48 more)

### Community 48 - ".paintVertexShape"
Cohesion: 0.12
Nodes (6): DotShape, IdentifyingRelationShape, LanesShape, NoteShape, TableShape, WeakEntityShape

### Community 49 - "board/shapes.ts"
Cohesion: 0.14
Nodes (34): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+26 more)

### Community 50 - "editor/lists.ts"
Cohesion: 0.12
Nodes (49): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+41 more)

### Community 51 - "suggestions.ts"
Cohesion: 0.23
Nodes (12): expand(), preferredIndex(), SuggestionItem, commandNames(), cardPreviewTex(), formPreviewTex(), ParsedTemplate, parseTemplate() (+4 more)

### Community 52 - "editor.test.ts"
Cohesion: 0.09
Nodes (23): @codemirror/lang-markdown, tabOutOfMath(), templateInsertion(), commandTokenAt(), isInCode(), mathContextAt(), openMathBefore(), buildDecorations() (+15 more)

### Community 53 - "rich"
Cohesion: 0.15
Nodes (16): SyncStatus, rich(), AccountButton, accountSection(), AccountSectionDeps, confirmAccountDeletion(), messageOf(), openLoginDialog() (+8 more)

### Community 54 - "Rational"
Cohesion: 0.07
Nodes (62): Part, bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactFunction, exactRoot(), factorialExact() (+54 more)

### Community 55 - "icon"
Cohesion: 0.20
Nodes (4): viewSwitch, icon(), NotesPanel, NotesPanelDeps

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "nodeLook"
Cohesion: 0.17
Nodes (12): fieldInput(), textWidth(), createEdgeCell(), isNodeLook(), nodeLook(), nodeStyle(), turn(), EdgeLook (+4 more)

### Community 58 - "Glifo"
Cohesion: 0.12
Nodes (16): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Domande frequenti e commenti (+8 more)

### Community 59 - "finite.ts"
Cohesion: 0.17
Nodes (28): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+20 more)

### Community 60 - "h"
Cohesion: 0.08
Nodes (37): setLangForTests(), openSignedOut(), printButton(), ShareDialogDeps, shareProblem(), T, dialogShell(), openHelpDialog() (+29 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "Welcome to Glifo"
Cohesion: 0.20
Nodes (9): A few examples, Calculations and graphs, For programming too, Handy shortcuts, How to write formulas, Lists, Spell check, Try it now (+1 more)

### Community 63 - "spreadsheet/editor.ts"
Cohesion: 0.06
Nodes (72): RFC-4180, ChartTable, csvDelimiter(), csvNumbers(), csvToSheet(), digitsOf(), field(), parseCsv() (+64 more)

### Community 64 - ".constructor"
Cohesion: 0.16
Nodes (3): closeMathBlockOnEnter(), EditorCallbacks, insertTemplate()

### Community 65 - "odesolve.ts"
Cohesion: 0.08
Nodes (80): linearIn(), addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled(), constantNames() (+72 more)

### Community 66 - "sheet.ts"
Cohesion: 0.07
Nodes (62): numericPartials(), EMPTY_COMPLEX_SCOPE, OdeFunction, expSumValue(), Lin, NUMERICAL, bracketParts(), BRACKETS (+54 more)

### Community 67 - "schema/model.ts"
Cohesion: 0.06
Nodes (59): @electric-sql/pglite, findSchemaBlocks(), schemaBlockAtLine(), openSchemaEditor(), SchemaEditorOptions, hide(), OPEN, schemasForFile() (+51 more)

### Community 68 - "blockMove.ts"
Cohesion: 0.10
Nodes (37): @codemirror/commands, blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove, blockPlace() (+29 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "render/lists.ts"
Cohesion: 0.27
Nodes (13): ListStyle, bulletGroup(), Marker, sameList(), alignInside(), asciiTrim(), findMarker(), Found (+5 more)

### Community 72 - "Pt"
Cohesion: 0.13
Nodes (13): clampZoom(), coalesced(), Finger, LassoAction, MoveAction, PanAction, PinchAction, pointsOf() (+5 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (54): linearCells(), atValues(), Converter, coordinates(), decimalText(), definiteParts(), definiteValue(), degree() (+46 more)

### Community 75 - "sidePanel.ts"
Cohesion: 0.09
Nodes (29): AiResult, ExplainTone, Explanation, FollowUp, REPLY_TOKENS, LocalAbort, MarkdownEditor, Settings (+21 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Errore o imprevisto → nel dettaglio, 3. Serve una decisione → frasi complete, 4. Fine del compito → un solo riepilogo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

### Community 79 - "ui/relocation.ts"
Cohesion: 0.14
Nodes (20): moveDayLabel(), relocationMessage(), RelocationResult, BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark() (+12 more)

### Community 82 - "Il database degli account (Supabase)"
Cohesion: 0.14
Nodes (13): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il controllo anti-robot (CAPTCHA, ottobre 2026), Il database degli account (Supabase), Il progetto, Il trasloco su glifo.page (ottobre 2026) (+5 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.11
Nodes (11): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+3 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.13
Nodes (15): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+7 more)

### Community 91 - "topics.ts"
Cohesion: 0.19
Nodes (20): ATTRIBUTES, cut(), ER_SHAPES, fieldText(), fitLines(), flowOrder(), formulaText(), FREE_NAMES (+12 more)

### Community 92 - "files.ts"
Cohesion: 0.16
Nodes (19): inClaudeViewer(), accountProblem(), downloadAccountData(), canWriteFilesDirectly(), downloadBlob(), downloadText(), fileNameFor(), FsWindow (+11 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.11
Nodes (10): device(), login(), newContext, waitFor(), b64(), CAPTCHA_TOKEN, CODE, GOOGLE_CODE (+2 more)

### Community 97 - "schemaBlocks.ts"
Cohesion: 0.09
Nodes (25): InsertOptions, toggleLinePrefix(), LIST_STYLES, addPlaceholders, Placeholder, besideSchema(), BlockWidget, findWidgetBlocks() (+17 more)

### Community 98 - "FoldersStore"
Cohesion: 0.07
Nodes (24): Deletion, cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder(), loadClosedFolders() (+16 more)

### Community 100 - "In programma"
Cohesion: 0.25
Nodes (8): Account: i propri appunti su ogni dispositivo, anche da condividere, Idee per il futuro, In programma, L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota (14 ottobre 2026, se ne parla), La lavagna: idee in più, Più avanti, Schemi: idee in più, Trasloco: il sito su Cloudflare, con un dominio tutto di Glifo

### Community 101 - "relocation-test.mjs"
Cohesion: 0.18
Nodes (7): AFTER_MOVE, ids, newBrowser(), NOTICE_DAY, out, serve(), TYPES

### Community 102 - "symbolsEn.test.ts"
Cohesion: 0.13
Nodes (30): editDistance(), singular(), stem(), STOPWORDS, words(), BOTH, buildIndex(), containsPhrase() (+22 more)

### Community 103 - "schemaTools.test.ts"
Cohesion: 0.11
Nodes (25): alignBoxes(), Alignment, Box, distributeBoxes(), Position, base64(), crc32(), svgSize() (+17 more)

### Community 104 - "markdown.ts"
Cohesion: 0.04
Nodes (96): @codemirror/view, FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsForFile(), graphsFromFile() (+88 more)

### Community 105 - "aiPanel.test.ts"
Cohesion: 0.11
Nodes (20): definedName(), formulaTopic(), graphTopic(), studyOf(), theoremTopic(), NoteSubject, SubjectKind, AiPanel (+12 more)

### Community 106 - "suggest.ts"
Cohesion: 0.27
Nodes (11): normalizeText(), IndexedEntry, SearchResult, getIndex(), isSubsequence(), keysOf(), MatchKind, suggestCommands() (+3 more)

### Community 107 - "spellcheck.ts"
Cohesion: 0.08
Nodes (25): misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt(), openAt() (+17 more)

### Community 108 - "openSettingsDialog"
Cohesion: 0.07
Nodes (20): DEFAULT_SETTINGS, guestAccountSection(), aboutSection(), aiFieldset(), backupFieldset(), generalSection(), onPhone(), openSettingsDialog() (+12 more)

### Community 113 - "graph.ts"
Cohesion: 0.09
Nodes (31): @maxgraph/core, AT_X, cellHtml(), cellText(), COMPASS, createGraph(), drawSchema(), edgeLook() (+23 more)

### Community 116 - "escapeHtml"
Cohesion: 0.28
Nodes (13): valueNode(), texHtml(), checkHtml(), checkTitle(), T, escapeHtml(), renderTex(), graphLabel() (+5 more)

### Community 117 - "supabase.ts"
Cohesion: 0.12
Nodes (31): @supabase/supabase-js, AUTH_STORAGE_KEY, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken() (+23 more)

### Community 118 - "probability.ts"
Cohesion: 0.05
Nodes (35): End, expSum, Family, ExactRandom, ExactScope, characteristicPolynomial(), eigenvalues(), Field (+27 more)

### Community 119 - "conics.ts"
Cohesion: 0.17
Nodes (30): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+22 more)

### Community 120 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 121 - "tutorial.ts"
Cohesion: 0.15
Nodes (12): HINT_MS, markTutorialSeen(), openTutorial(), show(), richText(), showTutorialHint(), close(), T (+4 more)

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "strokes.ts"
Cohesion: 0.08
Nodes (38): centerOn(), copyStrokes(), cross(), handleScale(), IDENTITY, insideLasso(), keepInside(), LASSO_SHARE (+30 more)

### Community 124 - "Sheet"
Cohesion: 0.07
Nodes (36): Definition, Line, ExactComplexScope, Ode, withWorkLimit(), FiniteContext, FormattedResult, Mat (+28 more)

### Community 125 - "page.ts"
Cohesion: 0.07
Nodes (41): accountDataFile(), PullResult, openShareDialog(), changeAccess(), changeCopy(), copy(), refreshChanged(), render() (+33 more)

### Community 128 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 129 - "I modelli e le chiavi API"
Cohesion: 0.33
Nodes (6): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), In prova sul ramo `prova` (7 ottobre 2026): Qwen3 nel browser per «Spiegami», La chiave, il server locale e la scelta del modello (14 ottobre 2026), Le idee dello studente (5 ottobre 2026)

### Community 132 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 133 - "pick"
Cohesion: 0.26
Nodes (4): pick(), FormulaError, Parser, errorName()

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 139 - "siteUpdate.ts"
Cohesion: 0.18
Nodes (15): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, siteChanged() (+7 more)

### Community 140 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 141 - "xlsx.ts"
Cohesion: 0.09
Nodes (46): fflate, BinOp, COMPARE, englishFormula(), ERRORS_BY_LENGTH, formulaBody(), formulaRefs(), isFormula() (+38 more)

### Community 142 - "schema/templates.ts"
Cohesion: 0.19
Nodes (19): DEFAULT_EDGE, SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), conceptMap(), cycle(), edge() (+11 more)

### Community 143 - "feedback.ts"
Cohesion: 0.08
Nodes (43): SUPABASE_KEY, SUPABASE_URL, NEW_ORIGIN, Site, commentDate(), commentItem(), COMMENTS_MAX, CommentsDeps (+35 more)

### Community 144 - "captcha.ts"
Cohesion: 0.21
Nodes (8): captchaToken(), loadTurnstile(), Turnstile, TURNSTILE_SCRIPT, Window, TURNSTILE_SITE_KEY, accountFailure(), Options

### Community 146 - "smoke-test.mjs"
Cohesion: 0.15
Nodes (6): markdown-it, playwright-core, PNG_ICONS, fakeLlmWorker(), firstVisit(), plainContext

### Community 154 - "L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota"
Cohesion: 0.25
Nodes (8): 2. Dalla lavagna alla nota, 3. Da una foto alla nota, 4. Dettare: la voce diventa testo nella nota, 5. Registrare le lezioni e trascriverle, Da sistemare con il primo punto che tocca l'AI, Fonti (controllate il 14 ottobre 2026), In che ordine, L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota

### Community 156 - "Glifo – note per Claude"
Cohesion: 0.25
Nodes (8): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Regole, sqlite()

### Community 157 - "vite"
Cohesion: 0.33
Nodes (4): vite, minutes, postMessage(), started

### Community 158 - "database.ts"
Cohesion: 0.23
Nodes (6): createDatabase(), createUser(), databaseTests(), feedbackTests(), migrations, shareTests()

### Community 159 - "site.ts"
Cohesion: 0.22
Nodes (6): vite-plugin-pwa, accountOffMessage(), T, defineFor(), MAIN_BRANCH, webllmModels

### Community 160 - "LlamaWorker"
Cohesion: 0.23
Nodes (6): Promemoria per lo studente, Commenti di chi prova Glifo, constructor(), LlamaWorker, Commenti di chi prova Glifo, kind()

### Community 162 - "numerical.test.ts"
Cohesion: 0.60
Nodes (3): result(), text(), verdict()

### Community 163 - "fourier.ts"
Cohesion: 0.17
Nodes (22): fourierItems(), T, absOf(), boundsOf(), close(), definite(), fourierProblem, fourierShown() (+14 more)

### Community 166 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

## Knowledge Gaps
- **873 isolated node(s):** `Condividere una nota con un link`, `Domande frequenti e commenti`, `Provarlo sul tuo computer`, `Assistente AI`, `Spiegami (in prova)` (+868 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1193 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **42 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `i18n.ts`, `usesDecimalComma`, `main.ts`, `compile`, `spec.ts`, `num`, `Board`, `graph/preview.ts`, `distributions.ts`, `NotesStore`, `vitest`, `xlsx.ts`, `SchemaEditor`, `feedback.ts`, `SheetEditor`, `src/relocation.ts`, `smoke-test.mjs`, `toLatex`, `numerical.ts`, `ExplainPanel`, `BoardStore`, `parse.ts`, `board.ts`, `ui/preview.ts`, `SidePanel`, `several.ts`, `gantt.ts`, `study.ts`, `site.ts`, `assistant.ts`, `logic.ts`, `fourier.ts`, `complex.ts`, `namesIn`, `toolbar.ts`, `view3d.ts`, `calcResults.ts`, `localModels.ts`, `functions.ts`, `MathError`, `spreadsheetEn.test.ts`, `.paintVertexShape`, `board/shapes.ts`, `rich`, `Rational`, `nodeLook`, `finite.ts`, `h`, `siteUpdate.ts`, `spreadsheet/editor.ts`, `.constructor`, `odesolve.ts`, `sheet.ts`, `blockMove.ts`, `Pt`, `symbolic.ts`, `sidePanel.ts`, `ui/relocation.ts`, `tutorial.mjs`, `topics.ts`, `files.ts`, `schemaBlocks.ts`, `schemaTools.test.ts`, `markdown.ts`, `aiPanel.test.ts`, `openSettingsDialog`, `escapeHtml`, `supabase.ts`, `conics.ts`, `tutorial.ts`, `strokes.ts`, `Sheet`?**
  _High betweenness centrality (0.147) - this node is a cross-community bridge._
- **Why does `texts` connect `i18n.ts` to `usesDecimalComma`, `main.ts`, `compile`, `spec.ts`, `pick`, `graph/preview.ts`, `Dove sono le cose`, `distributions.ts`, `NotesStore`, `vitest`, `latex.ts`, `schema/templates.ts`, `editor/editor.ts`, `xlsx.ts`, `src/relocation.ts`, `numerical.ts`, `toLatex`, `index.ts`, `feedback.ts`, `schema/editor.ts`, `parse.ts`, `board.ts`, `ui/preview.ts`, `several.ts`, `gantt.ts`, `study.ts`, `site.ts`, `assistant.ts`, `logic.ts`, `fourier.ts`, `complex.ts`, `namesIn`, `statsGraph.ts`, `resize.ts`, `toolbar.ts`, `calcResults.ts`, `localModels.ts`, `functions.ts`, `MathError`, `spreadsheetEn.test.ts`, `editor/lists.ts`, `rich`, `Rational`, `finite.ts`, `h`, `siteUpdate.ts`, `spreadsheet/editor.ts`, `odesolve.ts`, `sheet.ts`, `schema/model.ts`, `symbolic.ts`, `sidePanel.ts`, `ui/relocation.ts`, `topics.ts`, `files.ts`, `schemaBlocks.ts`, `FoldersStore`, `schemaTools.test.ts`, `markdown.ts`, `aiPanel.test.ts`, `spellcheck.ts`, `escapeHtml`, `supabase.ts`, `probability.ts`, `conics.ts`, `tutorial.ts`, `page.ts`?**
  _High betweenness centrality (0.123) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `i18n.ts`, `main.ts`, `compile`, `spec.ts`, `num`, `Dove sono le cose`, `distributions.ts`, `NotesStore`, `siteUpdate.ts`, `xlsx.ts`, `editor/editor.ts`, `captcha.ts`, `feedback.ts`, `src/relocation.ts`, `BoardStore`, `parse.ts`, `board.ts`, `ui/preview.ts`, `database.ts`, `site.ts`, `gantt.ts`, `assistant.ts`, `numerical.test.ts`, `translations.test.ts`, `resize.ts`, `view3d.ts`, `localModels.ts`, `noteWordsMath.test.ts`, `MathError`, `spreadsheetEn.test.ts`, `board/shapes.ts`, `editor/lists.ts`, `suggestions.ts`, `editor.test.ts`, `Rational`, `h`, `spreadsheet/editor.ts`, `sheet.ts`, `schema/model.ts`, `blockMove.ts`, `sidePanel.ts`, `ui/relocation.ts`, `schemaBlocks.ts`, `FoldersStore`, `symbolsEn.test.ts`, `schemaTools.test.ts`, `markdown.ts`, `aiPanel.test.ts`, `spellcheck.ts`, `openSettingsDialog`, `supabase.ts`, `tutorial.ts`, `strokes.ts`, `Sheet`, `page.ts`?**
  _High betweenness centrality (0.087) - this node is a cross-community bridge._
- **Are the 322 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `tutorialModel()`) actually correct?**
  _`Dove sono le cose` has 322 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Condividere una nota con un link`, `Domande frequenti e commenti`, `Provarlo sul tuo computer` to the rest of the system?**
  _873 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `i18n.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09191919191919191 - nodes in this community are weakly interconnected._
- **Should `usesDecimalComma` be split into smaller, more focused modules?**
  _Cohesion score 0.09871794871794871 - nodes in this community are weakly interconnected._