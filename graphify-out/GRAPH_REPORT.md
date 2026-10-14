# Graph Report - Glifo  (2026-10-14)

## Corpus Check
- 346 files · ~725,677 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5560 nodes · 20340 edges · 163 communities (120 shown, 43 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 687 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `58ba9a21`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- i18n.ts
- NotesStore
- main.ts
- compile
- sync.ts
- spec.ts
- parse.ts
- num
- graph/preview.ts
- blockMove.ts
- distributions.ts
- laplace.ts
- svg.ts
- sheet.ts
- SchemaEditor
- plan.ts
- SheetEditor
- markdown.ts
- numerical.ts
- arithmetic.ts
- index.ts
- client.ts
- schema/editor.ts
- noteWords.ts
- store.ts
- Parser
- ink.ts
- supabase.ts
- smoke-test.mjs
- several.ts
- gantt.ts
- study.ts
- BoardOptions
- assistant.ts
- logic.ts
- src/relocation.ts
- complex.ts
- namesIn
- translations.test.ts
- resize.ts
- view3d.ts
- Pt
- localModels.ts
- schemaEn.test.ts
- functions.ts
- MathError
- spreadsheetEn.test.ts
- linsys.ts
- conics.ts
- board/shapes.ts
- FoldersStore
- sidePanel.ts
- .render
- .renderFormat
- noteWordsGraph.test.ts
- page.ts
- 20261004091555_note_condivise.sql
- markers.ts
- database.ts
- finite.ts
- package.json
- dependencies
- Welcome to Glifo
- spreadsheet/editor.ts
- spreadsheet/format.ts
- odesolve.ts
- toolbar.ts
- engine.ts
- ui/preview.ts
- Benvenuto in Glifo
- compilerOptions
- relocation-test.mjs
- toLatex
- symbolic.ts
- schemaBlocks.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- mathSyntax.ts
- explainPanel.ts
- session-start.sh
- .claude/CLAUDE.md
- Il database degli account (Supabase)
- tutorial.mjs
- Abbonamenti
- topics.ts
- BoardStore
- supabase-stub.sql
- account-test.mjs
- files.ts
- Le spiegazioni, come funzionano
- ExplainPanel
- createFakeSupabase
- symbolsEn.test.ts
- siteUpdate.ts
- graph/file.ts
- aiPanel.ts
- Costi
- spellcheck
- editor/lists.ts
- graph.ts
- render/lists.ts
- schema/templates.ts
- Rational
- store/settings.ts
- schema/preview.ts
- captcha.ts
- noteWordsMath.test.ts
- board.ts
- Sheet
- vite
- parseSchema
- Dove sono le cose
- schemaGuard.test.ts
- Parser
- Board
- 20261008130026_commenti.sql
- MLCEngine
- .constructor
- xlsx.ts
- devDependencies
- feedback.ts
- L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota
- Glifo – note per Claude
- LlamaWorker
- In programma
- picture.ts
- Piano per piano
- I modelli e le chiavi API

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 328 edges
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
- `Come viene pubblicata` --references--> `dist()`  [INFERRED]
  README.md → src/board/shapes.ts
- `Trasloco: il sito su Cloudflare, con un dominio tutto di Glifo` --references--> `dist()`  [INFERRED]
  ROADMAP.md → src/board/shapes.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (163 total, 43 thin omitted)

### Community 0 - "i18n.ts"
Cohesion: 0.03
Nodes (105): vitest, SyncStatus, downloadSize(), gpuF16(), modelVariant, browserLang(), browserLanguages(), dateLocale() (+97 more)

### Community 1 - "NotesStore"
Cohesion: 0.13
Nodes (9): adoptGuestNotes(), guestNoteCount(), isWelcome(), createdAtFromId(), deriveTitle(), NotesStore, readItem(), writeItem() (+1 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (114): newStrokeId(), remapGraphLines(), account, ACCOUNT_OFF, active, aiShown(), aiToggle, aiWork (+106 more)

### Community 3 - "compile"
Cohesion: 0.03
Nodes (125): areaFor(), condLabel(), constantValue(), define(), isStraight(), isVectorName(), itemFor(), restrict() (+117 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (31): AccountSync, withLock(), Account, EMPTY_STATE, FolderChange, FolderRow, isEmpty(), iso() (+23 more)

### Community 5 - "spec.ts"
Cohesion: 0.04
Nodes (112): conicItems(), isConicLine(), quadricEquation(), T, fourierItems(), isFourierLine(), T, isComplexLine() (+104 more)

### Community 6 - "parse.ts"
Cohesion: 0.04
Nodes (61): hasWord(), EMPTY_COMPLEX_SCOPE, EMPTY_SCOPE, errorMessage(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING (+53 more)

### Community 7 - "num"
Cohesion: 0.11
Nodes (105): atIntegers(), oneFraction(), withoutAbs(), exp(), hyperbolicToExp(), inverseRational(), sqrtEx(), termTransform() (+97 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (43): FIGURE_PALETTE, addLabel(), boxes, cameras, complexCoord(), coord(), coordinates(), drawings (+35 more)

### Community 9 - "blockMove.ts"
Cohesion: 0.11
Nodes (34): @codemirror/commands, blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove, blockPlace() (+26 more)

### Community 10 - "distributions.ts"
Cohesion: 0.06
Nodes (67): addExp(), choose(), continuousQuantile(), decimals(), discreteQuantile(), Distribution, exactIntervalProbability(), expSumValue() (+59 more)

### Community 11 - "laplace.ts"
Cohesion: 0.10
Nodes (46): factoredPolynomial(), numShown(), absOf(), boundsOf(), close(), definite(), fourierProblem, fourierShown() (+38 more)

### Community 12 - "svg.ts"
Cohesion: 0.08
Nodes (59): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseY(), clipLines(), dataWindow(), decimalText() (+51 more)

### Community 13 - "sheet.ts"
Cohesion: 0.08
Nodes (54): OdeFunction, bracketParts(), BRACKETS, CHECK_VALUES, checks, Definition, fingerprint(), GROUP (+46 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.09
Nodes (7): isLanes(), loadDialect(), SchemaEditor, withLaneContents(), schemaImage(), serializeSchema(), fileNameFor()

### Community 15 - "plan.ts"
Cohesion: 0.07
Nodes (49): at(), breakEven(), Point, quantity(), T, tableItems(), textLabel(), graphKeyLine() (+41 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (3): SheetEditor, CellRange, cloneSheet()

### Community 17 - "markdown.ts"
Cohesion: 0.16
Nodes (19): dataRange(), moveAttrs(), renderTexOrError(), renderTexWithResult(), configurePurify(), createMarkdownIt(), FORBIDDEN_TAGS, HLJS_LANGUAGES (+11 more)

### Community 18 - "numerical.ts"
Cohesion: 0.07
Nodes (67): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Domande frequenti e commenti (+59 more)

### Community 19 - "arithmetic.ts"
Cohesion: 0.10
Nodes (49): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+41 more)

### Community 20 - "index.ts"
Cohesion: 0.06
Nodes (44): b, bigops, c, calculus, fn, fr, fractions, functions (+36 more)

### Community 21 - "client.ts"
Cohesion: 0.10
Nodes (13): Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download(), fetchDictionary() (+5 more)

### Community 22 - "schema/editor.ts"
Cohesion: 0.06
Nodes (53): laneOf(), alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ALIGN_NAMES (+45 more)

### Community 23 - "noteWords.ts"
Cohesion: 0.12
Nodes (21): placeChart(), tableChartKind(), blockKind, BLOCKS, blockWord(), FROM_ENGLISH, FUNCTIONS, functionWordPairs() (+13 more)

### Community 24 - "store.ts"
Cohesion: 0.09
Nodes (15): BoardBackend, BoardData, done(), fromRecord(), IdbBoards, ofNote(), openBoardDatabase(), openDefault() (+7 more)

### Community 26 - "ink.ts"
Cohesion: 0.14
Nodes (18): perfect-freehand, Prefs, BOARD_PALETTES, BoardPalette, BoardTheme, highlightName(), inkName(), mid() (+10 more)

### Community 27 - "supabase.ts"
Cohesion: 0.10
Nodes (41): @supabase/supabase-js, AUTH_STORAGE_KEY, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken() (+33 more)

### Community 28 - "smoke-test.mjs"
Cohesion: 0.25
Nodes (4): markdown-it, fakeLlmWorker(), firstVisit(), plainContext

### Community 29 - "several.ts"
Cohesion: 0.11
Nodes (46): criticalLine(), isSeveralLine(), named(), severalItems(), surface(), T, severalLimit, fractionNear() (+38 more)

### Community 30 - "gantt.ts"
Cohesion: 0.07
Nodes (59): searchPhrases(), amount(), barColor(), crossings(), dateText(), dayMonth(), dayOf(), GanttOptions (+51 more)

### Community 31 - "study.ts"
Cohesion: 0.05
Nodes (98): numberText(), FieldContext, isTestLine(), number(), T, testItems(), endTex(), classes() (+90 more)

### Community 32 - "BoardOptions"
Cohesion: 0.29
Nodes (3): BoardOptions, appleTouch(), UA

### Community 33 - "assistant.ts"
Cohesion: 0.09
Nodes (35): AiAnswer, AiError, AiResult, AiSettings, answerSchema(), askAi(), askCompatible(), askThroughHost() (+27 more)

### Community 34 - "logic.ts"
Cohesion: 0.11
Nodes (30): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+22 more)

### Community 35 - "src/relocation.ts"
Cohesion: 0.09
Nodes (37): buildPackage(), isRelocationPackage(), moveDayLabel(), NEW_ORIGIN, OLD_ORIGIN, openedForRelocation(), RECEIVE_URL, receiveFromOldSite() (+29 more)

### Community 36 - "complex.ts"
Cohesion: 0.06
Nodes (63): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isInequality(), onlyComplex() (+55 more)

### Community 37 - "namesIn"
Cohesion: 0.12
Nodes (38): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+30 more)

### Community 38 - "translations.test.ts"
Cohesion: 0.17
Nodes (18): AstNode, calleeName(), check(), checkPair(), visit(), children(), entryPairs(), files (+10 more)

### Community 39 - "resize.ts"
Cohesion: 0.13
Nodes (21): EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, SizeLimits, SYMBOLS_WIDTH (+13 more)

### Community 40 - "view3d.ts"
Cohesion: 0.06
Nodes (85): addMesh(), addTet(), affinePlane(), Axis, centroid(), clipBy(), clipPolygon(), clipSegment() (+77 more)

### Community 41 - "Pt"
Cohesion: 0.11
Nodes (15): clampZoom(), coalesced(), EraseAction, Finger, LassoAction, MoveAction, PanAction, PinchAction (+7 more)

### Community 42 - "localModels.ts"
Cohesion: 0.05
Nodes (52): @mlc-ai/web-llm, chat(), GlifoError, Gpu, load(), post(), remove(), scope (+44 more)

### Community 43 - "schemaEn.test.ts"
Cohesion: 0.10
Nodes (25): openSchemaEditor(), SchemaEditorOptions, COLOR_NAMES, Schema, SHAPE_NAMES, Column, DEFAULT_TYPE, findForeignKeys() (+17 more)

### Community 44 - "functions.ts"
Cohesion: 0.08
Nodes (64): EMPTY, number(), T, addFormat(), divFormat(), GENERAL, mulFormat(), tidy() (+56 more)

### Community 45 - "MathError"
Cohesion: 0.05
Nodes (99): MathError, formatRational(), angleBetween(), asMatrix(), basisOf(), characteristicPolynomial(), circleText(), complexText() (+91 more)

### Community 46 - "spreadsheetEn.test.ts"
Cohesion: 0.13
Nodes (36): functionLabel(), englishNumber(), italianNumber(), readEnglishInput(), readInput(), swapSeparators(), BinOp, COMPARE (+28 more)

### Community 47 - "linsys.ts"
Cohesion: 0.11
Nodes (48): choices(), gcd(), isStandardUnknown(), linearSystem(), matrixEquation(), matrixSystem(), minorsGcd(), ONE (+40 more)

### Community 48 - "conics.ts"
Cohesion: 0.19
Nodes (28): at(), centralCanonical(), Coefficients, coneCanonical(), conicOf(), det2(), det3(), determinant() (+20 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (35): DrawAction, adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners() (+27 more)

### Community 50 - "FoldersStore"
Cohesion: 0.05
Nodes (33): Deletion, DeletionLog, cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder() (+25 more)

### Community 51 - "sidePanel.ts"
Cohesion: 0.07
Nodes (33): formulaAtCursor(), InsertOptions, templateInsertion(), EditorMathContext, expand(), SuggestionController, SuggestionItem, localizeTex() (+25 more)

### Community 52 - ".render"
Cohesion: 0.15
Nodes (3): penErases(), handleScale(), shapePoints()

### Community 53 - ".renderFormat"
Cohesion: 0.17
Nodes (13): fieldInput(), cellText(), createEdgeCell(), edgeLook(), edgeStyle(), edgeTextAt(), insertSchema(), nodeLook() (+5 more)

### Community 54 - "noteWordsGraph.test.ts"
Cohesion: 0.19
Nodes (19): monthOf(), MONTHS, MONTHS_EN, parseDate(), planBlock, PlanKind, planRange(), T (+11 more)

### Community 55 - "page.ts"
Cohesion: 0.07
Nodes (46): katex, SUPABASE_KEY, SUPABASE_URL, accountDataFile(), PullResult, openShareDialog(), changeAccess(), changeCopy() (+38 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "markers.ts"
Cohesion: 0.18
Nodes (23): bullet(), childMarker(), column(), firstMarker(), label(), lettersMarker(), MarkerKind, MarkerStyle (+15 more)

### Community 58 - "database.ts"
Cohesion: 0.23
Nodes (6): createDatabase(), createUser(), databaseTests(), feedbackTests(), migrations, shareTests()

### Community 59 - "finite.ts"
Cohesion: 0.17
Nodes (28): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+20 more)

### Community 60 - "package.json"
Cohesion: 0.07
Nodes (26): description, name, private, scripts, build, dev, preview, test (+18 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "Welcome to Glifo"
Cohesion: 0.20
Nodes (9): A few examples, Calculations and graphs, For programming too, Handy shortcuts, How to write formulas, Lists, Spell check, Try it now (+1 more)

### Community 63 - "spreadsheet/editor.ts"
Cohesion: 0.08
Nodes (57): sheetSummary(), tablesNote(), ChartTable, currentCall(), Editing, MenuEntry, Move, openSheetEditor() (+49 more)

### Community 64 - "spreadsheet/format.ts"
Cohesion: 0.12
Nodes (20): decimalsOf(), ENGLISH, fixedNumber(), generalNumber(), group(), MAX_DECIMALS, most(), numberFrom() (+12 more)

### Community 65 - "odesolve.ts"
Cohesion: 0.07
Nodes (85): Piece, linearIn(), addWave(), arrange(), bernoulliFamily(), cauchy(), characteristicRoots(), compiled() (+77 more)

### Community 66 - "toolbar.ts"
Cohesion: 0.18
Nodes (16): insertBlock(), wrapSelection(), Action, createToolbar(), insertCode(), insertLink(), listMenu(), listStyle() (+8 more)

### Community 67 - "engine.ts"
Cohesion: 0.16
Nodes (10): @farscrl/hunspell-wasm, capitalize(), COMMON_FIXES, DictionaryData, ELISIONS, inGlossary(), lower(), SpellEngine (+2 more)

### Community 68 - "ui/preview.ts"
Cohesion: 0.09
Nodes (20): GraphLabels, remapLineKeys(), renameGraphScope(), renameScopeKeys(), BlockKind, MoveDir, BLOCK_NAMES, blockHiddenMessage() (+12 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "relocation-test.mjs"
Cohesion: 0.18
Nodes (7): AFTER_MOVE, ids, newBrowser(), NOTICE_DAY, out, serve(), TYPES

### Community 73 - "toLatex"
Cohesion: 0.09
Nodes (34): ACCENT_COMMANDS, diffLatex(), DISTRIBUTION_LATEX, distributionLatex(), domainLatex(), fnLatex(), fnName(), formLatex() (+26 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (62): fnLabel(), primitive(), verified(), linearCells(), atValues(), Converter, coordinates(), decimalText() (+54 more)

### Community 75 - "schemaBlocks.ts"
Cohesion: 0.12
Nodes (16): BlockWidget, findWidgetBlocks(), guardBlocks(), KINDS, schemaBlocks(), T, WidgetBlock, WidgetKind (+8 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Errore o imprevisto → nel dettaglio, 3. Serve una decisione → frasi complete, 4. Fine del compito → un solo riepilogo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "mathSyntax.ts"
Cohesion: 0.18
Nodes (17): @lezer/highlight, @lezer/markdown, lineDepth(), mathDelimTag, mathTag, parseBlockMath(), mathBlockRule(), analyzeBlockOpen() (+9 more)

### Community 79 - "explainPanel.ts"
Cohesion: 0.08
Nodes (26): ExplainTone, Explanation, FollowUp, REPLY_TOKENS, MarkdownEditor, insertTemplate(), Settings, AI_NEWS_TITLE (+18 more)

### Community 82 - "Il database degli account (Supabase)"
Cohesion: 0.20
Nodes (9): Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Note condivise con un link, Sincronizzazione, `sync_pull({ since })`: scarica le novità (+1 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.09
Nodes (13): playwright-core, graphFile, names, namesFile, root, PNG_ICONS, centerOf(), clickOn() (+5 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.10
Nodes (20): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Deciso (5 ottobre 2026), Dopo (+12 more)

### Community 91 - "topics.ts"
Cohesion: 0.09
Nodes (36): ATTRIBUTES, cut(), ER_SHAPES, fieldText(), fitLines(), flowOrder(), formulaText(), FREE_NAMES (+28 more)

### Community 92 - "BoardStore"
Cohesion: 0.12
Nodes (5): BoardStore, MemoryBoards, applyAccountChange(), backup(), boardsFor()

### Community 96 - "account-test.mjs"
Cohesion: 0.10
Nodes (11): @electric-sql/pglite, device(), login(), newContext, waitFor(), b64(), CAPTCHA_TOKEN, CODE (+3 more)

### Community 97 - "files.ts"
Cohesion: 0.20
Nodes (15): downloadRelocation(), canWriteFilesDirectly(), downloadText(), FsWindow, isAbort(), mdTypes(), OpenedFile, openMarkdownFiles() (+7 more)

### Community 98 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 101 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 102 - "symbolsEn.test.ts"
Cohesion: 0.11
Nodes (38): preferredIndex(), editDistance(), normalizeText(), singular(), stem(), STOPWORDS, words(), BOTH (+30 more)

### Community 103 - "siteUpdate.ts"
Cohesion: 0.16
Nodes (18): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, loadPart() (+10 more)

### Community 104 - "graph/file.ts"
Cohesion: 0.06
Nodes (59): figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsForFile(), graphsFromFile(), hide(), OPEN (+51 more)

### Community 105 - "aiPanel.ts"
Cohesion: 0.06
Nodes (40): definedName(), formulaTopic(), graphTopic(), studyOf(), theoremTopic(), acceptCalcResult(), CalcCheck, calcOutcomes() (+32 more)

### Community 106 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 107 - "spellcheck"
Cohesion: 0.21
Nodes (8): spellcheck(), close(), misspelledAt(), openAt(), replace(), tooltipView(), SpellChecker, SpellcheckOptions

### Community 108 - "editor/lists.ts"
Cohesion: 0.16
Nodes (30): continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext(), isBlank() (+22 more)

### Community 113 - "graph.ts"
Cohesion: 0.05
Nodes (40): @maxgraph/core, AT_X, cellHtml(), COMPASS, createGraph(), drawSchema(), isEdgeLook(), isNodeLook() (+32 more)

### Community 116 - "render/lists.ts"
Cohesion: 0.23
Nodes (15): Item, ListStyle, bulletGroup(), ListLine, Marker, sameList(), alignInside(), asciiTrim() (+7 more)

### Community 117 - "schema/templates.ts"
Cohesion: 0.19
Nodes (19): DEFAULT_EDGE, SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), tableMetrics(), conceptMap(), cycle() (+11 more)

### Community 118 - "Rational"
Cohesion: 0.07
Nodes (41): Part, asin(), atan(), evaluateExactComplex(), exactSqrt(), GaussRational, sinh(), sqrt() (+33 more)

### Community 119 - "store/settings.ts"
Cohesion: 0.08
Nodes (57): accountSpace(), currentAccount(), forgetAccount(), knowsAccount(), prefixOf(), prefsKey(), restorePrefs(), setAsidePrefs() (+49 more)

### Community 120 - "schema/preview.ts"
Cohesion: 0.20
Nodes (13): Look, Theme, draw(), drawCached(), drawn, errorHtml(), fill(), hydrateSchemas() (+5 more)

### Community 121 - "captcha.ts"
Cohesion: 0.15
Nodes (12): captchaToken(), loadTurnstile(), Turnstile, TURNSTILE_SCRIPT, Window, TURNSTILE_SITE_KEY, accountFailure(), Accesso con Google (+4 more)

### Community 122 - "noteWordsMath.test.ts"
Cohesion: 0.03
Nodes (94): @codemirror/lang-markdown, @codemirror/language, @codemirror/state, @codemirror/view, @lezer/common, closeMathBlockOnEnter(), highlight, T (+86 more)

### Community 123 - "board.ts"
Cohesion: 0.07
Nodes (53): Action, DOT_SIZES, EraserMode, HANDLE_REACH, ICON, MODE_NAMES, SIZE_NAMES, SizedTool (+45 more)

### Community 124 - "Sheet"
Cohesion: 0.08
Nodes (26): ExactComplexScope, ConicInfo, Ode, withWorkLimit(), FiniteContext, FormattedResult, differentialRequest, pieces() (+18 more)

### Community 125 - "vite"
Cohesion: 0.33
Nodes (4): vite, minutes, postMessage(), started

### Community 128 - "parseSchema"
Cohesion: 0.09
Nodes (29): schemaSummary(), svg(), markdownForFile(), findSchemaBlocks(), base64(), hide(), OPEN, schemasForFile() (+21 more)

### Community 129 - "Dove sono le cose"
Cohesion: 0.04
Nodes (105): 1. A cosa serve l'AI dei modelli di frontiera, Dove sono le cose, Glifo – architettura, allNames(), answerFollowUp(), bareResult(), chained(), chatContext (+97 more)

### Community 132 - "schemaGuard.test.ts"
Cohesion: 0.25
Nodes (8): toggleLinePrefix(), applyListStyle(), besideSchema(), schemaBlockRanges(), heading(), schemas(), setup(), Target

### Community 136 - "Board"
Cohesion: 0.11
Nodes (6): Board, loadPrefs(), sizeChoice(), SizeChoice, BoardChange, Stroke

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 141 - "xlsx.ts"
Cohesion: 0.09
Nodes (44): RFC-4180, fflate, csvCell(), csvDelimiter(), csvNumbers(), csvToSheet(), digitsOf(), field() (+36 more)

### Community 142 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

### Community 143 - "feedback.ts"
Cohesion: 0.05
Nodes (51): vite-plugin-pwa, accountOffMessage(), Site, T, commentDate(), commentItem(), COMMENTS_MAX, CommentsDeps (+43 more)

### Community 154 - "L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota"
Cohesion: 0.25
Nodes (8): 2. Dalla lavagna alla nota, 3. Da una foto alla nota, 4. Dettare: la voce diventa testo nella nota, 5. Registrare le lezioni e trascriverle, Da sistemare con il primo punto che tocca l'AI, Fonti (controllate il 14 ottobre 2026), In che ordine, L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota

### Community 156 - "Glifo – note per Claude"
Cohesion: 0.25
Nodes (8): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Regole, sqlite()

### Community 160 - "LlamaWorker"
Cohesion: 0.25
Nodes (5): Promemoria per lo studente, Commenti di chi prova Glifo, constructor(), LlamaWorker, Commenti di chi prova Glifo

### Community 163 - "In programma"
Cohesion: 0.25
Nodes (8): Account: i propri appunti su ogni dispositivo, anche da condividere, Idee per il futuro, In programma, L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota (14 ottobre 2026, se ne parla), La lavagna: idee in più, Più avanti, Schemi: idee in più, Trasloco: il sito su Cloudflare, con un dominio tutto di Glifo

### Community 166 - "picture.ts"
Cohesion: 0.17
Nodes (14): staticGraphSvg(), chooseWindow(), chooseBox(), DrawOptions, graphSvg(), sceneSvg(), light, pts (+6 more)

### Community 172 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 179 - "I modelli e le chiavi API"
Cohesion: 0.33
Nodes (6): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), In prova sul ramo `prova` (7 ottobre 2026): Qwen3 nel browser per «Spiegami», La chiave, il server locale e la scelta del modello (14 ottobre 2026), Le idee dello studente (5 ottobre 2026)

## Knowledge Gaps
- **873 isolated node(s):** `Deciso`, `Com'è andata la discussione`, `La proposta dello studente (4 ottobre 2026)`, `Il parere di Claude, in breve`, `Se costa, è a pagamento? (14 ottobre 2026)` (+868 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1193 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **43 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `texts` connect `i18n.ts` to `parseSchema`, `Dove sono le cose`, `main.ts`, `compile`, `spec.ts`, `parse.ts`, `graph/preview.ts`, `distributions.ts`, `laplace.ts`, `svg.ts`, `sheet.ts`, `xlsx.ts`, `plan.ts`, `feedback.ts`, `numerical.ts`, `arithmetic.ts`, `index.ts`, `schema/editor.ts`, `ink.ts`, `supabase.ts`, `several.ts`, `gantt.ts`, `study.ts`, `assistant.ts`, `logic.ts`, `src/relocation.ts`, `complex.ts`, `namesIn`, `resize.ts`, `localModels.ts`, `schemaEn.test.ts`, `functions.ts`, `MathError`, `spreadsheetEn.test.ts`, `linsys.ts`, `conics.ts`, `FoldersStore`, `sidePanel.ts`, `noteWordsGraph.test.ts`, `page.ts`, `finite.ts`, `spreadsheet/editor.ts`, `spreadsheet/format.ts`, `odesolve.ts`, `toolbar.ts`, `ui/preview.ts`, `toLatex`, `symbolic.ts`, `schemaBlocks.ts`, `explainPanel.ts`, `topics.ts`, `files.ts`, `siteUpdate.ts`, `graph/file.ts`, `aiPanel.ts`, `editor/lists.ts`, `schema/templates.ts`, `store/settings.ts`, `schema/preview.ts`, `noteWordsMath.test.ts`, `board.ts`?**
  _High betweenness centrality (0.134) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `Dove sono le cose` to `i18n.ts`, `NotesStore`, `main.ts`, `compile`, `parseSchema`, `spec.ts`, `parse.ts`, `num`, `Board`, `blockMove.ts`, `graph/preview.ts`, `laplace.ts`, `.constructor`, `svg.ts`, `distributions.ts`, `plan.ts`, `sheet.ts`, `markdown.ts`, `numerical.ts`, `arithmetic.ts`, `SchemaEditor`, `feedback.ts`, `schema/editor.ts`, `noteWords.ts`, `SheetEditor`, `Parser`, `ink.ts`, `supabase.ts`, `smoke-test.mjs`, `several.ts`, `gantt.ts`, `study.ts`, `assistant.ts`, `logic.ts`, `src/relocation.ts`, `complex.ts`, `namesIn`, `view3d.ts`, `Pt`, `localModels.ts`, `functions.ts`, `MathError`, `spreadsheetEn.test.ts`, `linsys.ts`, `board/shapes.ts`, `sidePanel.ts`, `.render`, `.renderFormat`, `noteWordsGraph.test.ts`, `finite.ts`, `spreadsheet/editor.ts`, `odesolve.ts`, `toolbar.ts`, `ui/preview.ts`, `xlsx.ts`, `toLatex`, `symbolic.ts`, `schemaBlocks.ts`, `explainPanel.ts`, `tutorial.mjs`, `topics.ts`, `BoardStore`, `ExplainPanel`, `siteUpdate.ts`, `graph/file.ts`, `aiPanel.ts`, `graph.ts`, `Rational`, `store/settings.ts`, `noteWordsMath.test.ts`, `board.ts`, `Sheet`?**
  _High betweenness centrality (0.113) - this node is a cross-community bridge._
- **Why does `vitest` connect `i18n.ts` to `parseSchema`, `Dove sono le cose`, `NotesStore`, `schemaGuard.test.ts`, `spec.ts`, `parse.ts`, `num`, `blockMove.ts`, `distributions.ts`, `svg.ts`, `xlsx.ts`, `plan.ts`, `feedback.ts`, `markdown.ts`, `theme.test.ts`, `schema/editor.ts`, `noteWords.ts`, `store.ts`, `ink.ts`, `supabase.ts`, `gantt.ts`, `BoardOptions`, `assistant.ts`, `src/relocation.ts`, `complex.ts`, `picture.ts`, `resize.ts`, `view3d.ts`, `translations.test.ts`, `localModels.ts`, `schemaEn.test.ts`, `MathError`, `spreadsheetEn.test.ts`, `linsys.ts`, `board/shapes.ts`, `FoldersStore`, `sidePanel.ts`, `noteWordsGraph.test.ts`, `page.ts`, `markers.ts`, `database.ts`, `package.json`, `spreadsheet/editor.ts`, `ui/preview.ts`, `toLatex`, `schemaBlocks.ts`, `explainPanel.ts`, `symbolsEn.test.ts`, `siteUpdate.ts`, `graph/file.ts`, `editor/lists.ts`, `store/settings.ts`, `captcha.ts`, `noteWordsMath.test.ts`, `board.ts`, `Sheet`?**
  _High betweenness centrality (0.065) - this node is a cross-community bridge._
- **Are the 327 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `tutorialModel()`) actually correct?**
  _`Dove sono le cose` has 327 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Deciso`, `Com'è andata la discussione`, `La proposta dello studente (4 ottobre 2026)` to the rest of the system?**
  _873 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `i18n.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.031929046563192905 - nodes in this community are weakly interconnected._
- **Should `NotesStore` be split into smaller, more focused modules?**
  _Cohesion score 0.1319073083778966 - nodes in this community are weakly interconnected._