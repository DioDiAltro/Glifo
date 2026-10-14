# Graph Report - Glifo  (2026-10-14)

## Corpus Check
- 346 files · ~724,653 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5559 nodes · 20340 edges · 159 communities (119 shown, 40 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 693 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b445d55c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- ui/settings.ts
- NotesStore
- main.ts
- compile
- sync.ts
- spec.ts
- FoldersStore
- num
- graph/preview.ts
- aiPanel.ts
- mathEn2.test.ts
- ExplainPanel
- vitest
- sheet.ts
- SchemaEditor
- editor/editor.ts
- SheetEditor
- notes.ts
- numerical.ts
- arithmetic.ts
- index.ts
- engine.ts
- schema/editor.ts
- noteWordsMath.test.ts
- store.ts
- parse.ts
- Stroke
- page.ts
- smoke-test.mjs
- several.ts
- gantt.ts
- toLatex
- .openMenu
- sidePanel.ts
- logic.ts
- i18n.ts
- complex.ts
- namesIn
- translations.test.ts
- resize.ts
- view3d.ts
- store/settings.ts
- localModels.ts
- settingsSections.test.ts
- functions.ts
- MathError
- spreadsheetEn.test.ts
- Rational
- suggestions.ts
- board/shapes.ts
- toolbar.ts
- SidePanel
- explainPanel.ts
- render/lists.ts
- calcPlugin
- supabase.ts
- 20261004091555_note_condivise.sql
- scripts
- database.ts
- finite.ts
- calcResults.ts
- dependencies
- Welcome to Glifo
- spreadsheet/editor.ts
- conics.ts
- odesolve.ts
- statsShown.ts
- AccountSync
- schemaBlocks.ts
- Benvenuto in Glifo
- compilerOptions
- relocation-test.mjs
- Costi
- numerical.test.ts
- symbolic.ts
- appleTouch
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- aiPanel.test.ts
- session-start.sh
- .claude/CLAUDE.md
- Il database degli account (Supabase)
- tutorial.mjs
- Abbonamenti
- topics.ts
- src/relocation.ts
- supabase-stub.sql
- account-test.mjs
- .folderItem
- symbolsEn.test.ts
- siteUpdate.ts
- markdown.ts
- spellcheck.ts
- editor/lists.ts
- graph.ts
- probability.ts
- account/space.ts
- Glifo
- Le spiegazioni, come funzionano
- board.ts
- Sheet
- dialog.ts
- Dove sono le cose
- pick
- Board
- 20261008130026_commenti.sql
- .constructor
- xlsx.ts
- markers.ts
- texts
- SuggestionController
- rich
- vite
- Glifo – note per Claude
- files.ts
- vite.config.ts
- .onMove
- .reply
- insert.ts
- h
- ui/relocation.ts
- devDependencies
- tutorial.ts
- ui/preview.ts
- statsGraph.ts
- suggest.ts

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 323 edges
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
- `Dove sono le cose` --references--> `WidgetKind`  [INFERRED]
  ARCHITETTURA.md → src/editor/schemaBlocks.ts
- `Dove sono le cose` --references--> `ConicElements`  [INFERRED]
  ARCHITETTURA.md → src/math/conics.ts
- `Attenzione a` --references--> `renderMarkdown()`  [INFERRED]
  CLAUDE.md → src/render/markdown.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (159 total, 40 thin omitted)

### Community 0 - "ui/settings.ts"
Cohesion: 0.07
Nodes (33): 3. Le impostazioni divise in sezioni, DownloadedModel, Gpu, gpuF16(), MODEL_LICENSES, ModelGroup, AI_SERVICES, formatBytes() (+25 more)

### Community 1 - "NotesStore"
Cohesion: 0.14
Nodes (10): newId(), createdAtFromId(), deriveTitle(), NotesStore, forgetOldKeys(), hasLocalStorage(), migrateKeyPrefix(), readItem() (+2 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (117): deleteAccount(), addToGraphBlock(), remapGraphLines(), remapLineKeys(), account, ACCOUNT_OFF, accountDeps(), accountProblem() (+109 more)

### Community 3 - "compile"
Cohesion: 0.04
Nodes (98): integralRegion, areaFor(), argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot() (+90 more)

### Community 4 - "sync.ts"
Cohesion: 0.07
Nodes (29): withLock(), Account, EMPTY_STATE, FolderChange, FolderRow, isEmpty(), iso(), LocalChange (+21 more)

### Community 5 - "spec.ts"
Cohesion: 0.04
Nodes (113): formulaAtCursor(), GraphLabelLines, insertGraphBlock(), LABEL_KEYS, setGraphLabels(), conicItems(), isConicLine(), quadricEquation() (+105 more)

### Community 6 - "FoldersStore"
Cohesion: 0.15
Nodes (4): cleanFolderName(), FoldersStore, sameName(), names()

### Community 7 - "num"
Cohesion: 0.13
Nodes (87): atIntegers(), polyEx(), homogeneousGroups(), shapeValue(), similarSolution(), squareRoot(), yPowers(), algebraic() (+79 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (43): addLabel(), boxes, cameras, complexCoord(), coord(), coordinates(), drawings, drawnViews (+35 more)

### Community 9 - "aiPanel.ts"
Cohesion: 0.12
Nodes (25): definedName(), formulaTopic(), graphTopic(), studyOf(), theoremTopic(), valueNode(), NoteSubject, SubjectKind (+17 more)

### Community 10 - "mathEn2.test.ts"
Cohesion: 0.06
Nodes (70): EMPTY_COMPLEX_SCOPE, addExp(), choose(), continuousQuantile(), decimals(), discreteQuantile(), Distribution, exactIntervalProbability() (+62 more)

### Community 11 - "ExplainPanel"
Cohesion: 0.16
Nodes (4): ExplainChat, ExplainPanel, preventFocusSteal(), formulasSummary()

### Community 12 - "vitest"
Cohesion: 0.05
Nodes (92): vitest, contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), staticGraphSvg(), chooseWindow(), chooseY() (+84 more)

### Community 13 - "sheet.ts"
Cohesion: 0.04
Nodes (92): numberText(), number(), endTex(), usesDecimalComma(), numericPartials(), formatGauss(), OdeFunction, decimalSeparator() (+84 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.07
Nodes (21): fieldInput(), isLanes(), SchemaEditor, withLaneContents(), cellText(), createEdgeCell(), edgeLook(), edgeStyle() (+13 more)

### Community 15 - "editor/editor.ts"
Cohesion: 0.05
Nodes (49): description, name, private, type, version, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/lang-markdown (+41 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (7): functionLabel(), SheetEditor, englishTyping(), serializeSheet(), sheetSize(), CellRange, cloneSheet()

### Community 17 - "notes.ts"
Cohesion: 0.12
Nodes (21): Deletion, DeletionLog, Folder, FOLDER_NAME_MAX, FolderGroup, groupByFolder(), loadClosedFolders(), RemoteFolder (+13 more)

### Community 18 - "numerical.ts"
Cohesion: 0.10
Nodes (53): isNumericalLine(), numericalItems(), FormatOptions, bisection(), cholesky(), condition(), derivative(), exactPolynomial() (+45 more)

### Community 19 - "arithmetic.ts"
Cohesion: 0.07
Nodes (73): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+65 more)

### Community 20 - "index.ts"
Cohesion: 0.06
Nodes (45): b, bigops, c, calculus, fn, fr, fractions, functions (+37 more)

### Community 21 - "engine.ts"
Cohesion: 0.07
Nodes (23): @farscrl/hunspell-wasm, Backend, pageBackend(), SpellClient, SpellClientOptions, workerBackend(), WorkerUnavailable, download() (+15 more)

### Community 22 - "schema/editor.ts"
Cohesion: 0.03
Nodes (118): @electric-sql/pglite, schemaSummary(), svg(), alignBoxes(), Alignment, Box, distributeBoxes(), Position (+110 more)

### Community 23 - "noteWordsMath.test.ts"
Cohesion: 0.11
Nodes (16): AstNode, childrenOf(), DATA, ENGLISH, englishTexts(), FUNCTIONS, inBothLanguages(), isNode() (+8 more)

### Community 24 - "store.ts"
Cohesion: 0.06
Nodes (20): BoardBackend, BoardStore, done(), fromRecord(), IdbBoards, MemoryBoards, ofNote(), openBoardDatabase() (+12 more)

### Community 25 - "parse.ts"
Cohesion: 0.07
Nodes (43): ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe(), differentialInFraction() (+35 more)

### Community 26 - "Stroke"
Cohesion: 0.12
Nodes (16): Step, BOARD_PALETTES, BoardTheme, highlightName(), inkName(), mid(), outlineSvg(), PEN_SIZE (+8 more)

### Community 27 - "page.ts"
Cohesion: 0.15
Nodes (17): readSharedNote(), ShareReadError, body, draw(), isDark(), load(), saveButton, saveCopy() (+9 more)

### Community 28 - "smoke-test.mjs"
Cohesion: 0.25
Nodes (4): markdown-it, fakeLlmWorker(), firstVisit(), plainContext

### Community 29 - "several.ts"
Cohesion: 0.06
Nodes (77): criticalLine(), named(), severalItems(), surface(), T, close(), Definite, definiteIntegral() (+69 more)

### Community 30 - "gantt.ts"
Cohesion: 0.04
Nodes (103): searchPhrases(), amount(), barColor(), crossings(), dateText(), dayMonth(), dayOf(), fitText() (+95 more)

### Community 31 - "toLatex"
Cohesion: 0.06
Nodes (75): fourierItems(), T, names(), STUDY_GRAPH, studyItems(), T, partialSum(), ACCENT_COMMANDS (+67 more)

### Community 32 - ".openMenu"
Cohesion: 0.21
Nodes (6): loadPrefs(), Prefs, BoardPalette, SizeChoice, HighlightColor, InkColor

### Community 33 - "sidePanel.ts"
Cohesion: 0.08
Nodes (36): AiAnswer, AiError, AiResult, AiSettings, answerSchema(), askAi(), askCompatible(), askThroughHost() (+28 more)

### Community 34 - "logic.ts"
Cohesion: 0.11
Nodes (30): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+22 more)

### Community 35 - "i18n.ts"
Cohesion: 0.14
Nodes (19): browserLang(), browserLanguages(), dateLocale(), detectLang(), Entry, lang, LANGUAGES, numberLocale() (+11 more)

### Community 36 - "complex.ts"
Cohesion: 0.05
Nodes (72): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexValue(), isInequality() (+64 more)

### Community 37 - "namesIn"
Cohesion: 0.11
Nodes (42): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+34 more)

### Community 38 - "translations.test.ts"
Cohesion: 0.17
Nodes (18): AstNode, calleeName(), check(), checkPair(), visit(), children(), entryPairs(), files (+10 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (24): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+16 more)

### Community 40 - "view3d.ts"
Cohesion: 0.06
Nodes (87): LayeredSolid, addMesh(), addTet(), affinePlane(), Axis, Box, centroid(), clipBy() (+79 more)

### Community 41 - "store/settings.ts"
Cohesion: 0.14
Nodes (15): DEFAULT_LOCAL_MODEL, isLang(), ACCOUNT_SETTINGS, AI_MODELS, DEFAULT_SETTINGS, rememberLanguage(), SETTINGS_KEY, sharedSettings() (+7 more)

### Community 42 - "localModels.ts"
Cohesion: 0.06
Nodes (44): 4. Più modelli per «Spiegami», 5. A cosa serve la chiave dell'AI, 6. Glifo anche in inglese, 7. Via il registro dei tocchi, 8. Il pulsante ✨ con il contorno, Gli abbonamenti, in tutto questo, In che ordine, La grafica: le otto richieste del 10 ottobre 2026 (+36 more)

### Community 43 - "settingsSections.test.ts"
Cohesion: 0.16
Nodes (8): License, licenseOf(), LICENSES, T, SettingsSection, texts, open(), removeModel

### Community 44 - "functions.ts"
Cohesion: 0.07
Nodes (65): EMPTY, evaluateSheet(), number(), SheetEvaluator, T, addFormat(), divFormat(), GENERAL (+57 more)

### Community 45 - "MathError"
Cohesion: 0.10
Nodes (66): figureText(), linearItem(), MathError, angleBetween(), asMatrix(), basisOf(), circleText(), cross() (+58 more)

### Community 46 - "spreadsheetEn.test.ts"
Cohesion: 0.08
Nodes (56): valueText(), sheetSummary(), csvCell(), openSheetEditor(), booleanText(), ENGLISH, englishNumber(), errorText() (+48 more)

### Community 47 - "Rational"
Cohesion: 0.09
Nodes (52): factorsOf(), Part, Rational, choices(), exText(), gcd(), matrixEquation(), matrixSystem() (+44 more)

### Community 48 - "suggestions.ts"
Cohesion: 0.23
Nodes (12): expand(), preferredIndex(), SuggestionItem, commandNames(), cardPreviewTex(), formPreviewTex(), ParsedTemplate, parseTemplate() (+4 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.14
Nodes (34): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+26 more)

### Community 50 - "toolbar.ts"
Cohesion: 0.11
Nodes (23): insertBlock(), toggleLinePrefix(), wrapSelection(), LIST_STYLES, ListStyleId, Action, createToolbar(), insertCode() (+15 more)

### Community 51 - "SidePanel"
Cohesion: 0.18
Nodes (7): localizeTex(), cleanKatexError(), cardPreview(), displayCode(), formPreview(), preventFocusSteal(), SidePanel

### Community 52 - "explainPanel.ts"
Cohesion: 0.07
Nodes (33): ExplainTone, Explanation, FollowUp, REPLY_TOKENS, glifoError(), LocalAbort, localErrorMessage(), localLlm (+25 more)

### Community 53 - "render/lists.ts"
Cohesion: 0.27
Nodes (13): ListStyle, bulletGroup(), Marker, sameList(), alignInside(), asciiTrim(), findMarker(), Found (+5 more)

### Community 55 - "supabase.ts"
Cohesion: 0.07
Nodes (47): @supabase/supabase-js, captchaToken(), loadTurnstile(), Turnstile, TURNSTILE_SCRIPT, Window, TURNSTILE_SITE_KEY, accountError (+39 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 58 - "database.ts"
Cohesion: 0.23
Nodes (6): createDatabase(), createUser(), databaseTests(), feedbackTests(), migrations, shareTests()

### Community 59 - "finite.ts"
Cohesion: 0.17
Nodes (28): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+20 more)

### Community 60 - "calcResults.ts"
Cohesion: 0.06
Nodes (52): @codemirror/language, @codemirror/state, @lezer/common, explainTarget, schemaTitle(), acceptCalcResult(), CalcCheck, calcOutcomes() (+44 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "Welcome to Glifo"
Cohesion: 0.20
Nodes (9): A few examples, Calculations and graphs, For programming too, Handy shortcuts, How to write formulas, Lists, Spell check, Try it now (+1 more)

### Community 63 - "spreadsheet/editor.ts"
Cohesion: 0.06
Nodes (72): RFC-4180, ChartTable, csvDelimiter(), csvNumbers(), csvToSheet(), digitsOf(), field(), parseCsv() (+64 more)

### Community 64 - "conics.ts"
Cohesion: 0.17
Nodes (30): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+22 more)

### Community 65 - "odesolve.ts"
Cohesion: 0.06
Nodes (106): absOf(), boundsOf(), close(), definite(), fourierProblem, fourierShown(), isTrig(), isZero() (+98 more)

### Community 66 - "statsShown.ts"
Cohesion: 0.14
Nodes (37): expSumValue(), Lin, statisticOf(), check(), correlation(), count(), covariance(), Data (+29 more)

### Community 68 - "schemaBlocks.ts"
Cohesion: 0.04
Nodes (74): @codemirror/commands, blockMoved, blockMoves(), blockMoveTransaction(), LineMap, BlockWidget, findWidgetBlocks(), guardBlocks() (+66 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "relocation-test.mjs"
Cohesion: 0.18
Nodes (7): AFTER_MOVE, ids, newBrowser(), NOTICE_DAY, out, serve(), TYPES

### Community 72 - "Costi"
Cohesion: 0.22
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 73 - "numerical.test.ts"
Cohesion: 0.60
Nodes (3): result(), text(), verdict()

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (57): linearCells(), cancelLinear(), Converter, coordinates(), decimalText(), definiteParts(), definiteValue(), degree() (+49 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Errore o imprevisto → nel dettaglio, 3. Serve una decisione → frasi complete, 4. Fine del compito → un solo riepilogo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 79 - "aiPanel.test.ts"
Cohesion: 0.12
Nodes (14): AI_NEWS_TITLE, AI_WORKING_TITLE, aiActivity, T, fakeModel(), FLOW, GRAPH_FIXED, GRAPH_STEPS (+6 more)

### Community 82 - "Il database degli account (Supabase)"
Cohesion: 0.20
Nodes (9): Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Note condivise con un link, Sincronizzazione, `sync_pull({ since })`: scarica le novità (+1 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.09
Nodes (13): playwright-core, graphFile, names, namesFile, root, PNG_ICONS, centerOf(), clickOn() (+5 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.07
Nodes (30): Abbonamenti, Classico, gratis: per scrivere e controllare, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Deciso (5 ottobre 2026) (+22 more)

### Community 91 - "topics.ts"
Cohesion: 0.19
Nodes (20): ATTRIBUTES, cut(), ER_SHAPES, fieldText(), fitLines(), flowOrder(), formulaText(), FREE_NAMES (+12 more)

### Community 92 - "src/relocation.ts"
Cohesion: 0.09
Nodes (28): BackupBoard, isRelocationPackage(), NEW_ORIGIN, OLD_ORIGIN, openedForRelocation(), RECEIVE_URL, receiveFromOldSite(), RELOCATION_DATES (+20 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.10
Nodes (17): device(), login(), newContext, waitFor(), b64(), CAPTCHA_TOKEN, CODE, createFakeSupabase() (+9 more)

### Community 98 - ".folderItem"
Cohesion: 0.22
Nodes (3): clear(), NotesPanel, NotesPanelDeps

### Community 102 - "symbolsEn.test.ts"
Cohesion: 0.13
Nodes (30): editDistance(), singular(), stem(), STOPWORDS, words(), BOTH, buildIndex(), containsPhrase() (+22 more)

### Community 103 - "siteUpdate.ts"
Cohesion: 0.18
Nodes (16): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, loadPart() (+8 more)

### Community 104 - "markdown.ts"
Cohesion: 0.04
Nodes (96): @codemirror/view, FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsForFile(), graphsFromFile() (+88 more)

### Community 107 - "spellcheck.ts"
Cohesion: 0.08
Nodes (23): misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt(), openAt() (+15 more)

### Community 108 - "editor/lists.ts"
Cohesion: 0.19
Nodes (31): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+23 more)

### Community 113 - "graph.ts"
Cohesion: 0.05
Nodes (44): @maxgraph/core, AT_X, cellHtml(), COMPASS, createGraph(), drawSchema(), isEdgeLook(), isNodeLook() (+36 more)

### Community 118 - "probability.ts"
Cohesion: 0.08
Nodes (42): End, expSum, Family, CompileOptions, bigGcd(), binomExact(), conditionExact(), evaluateExact() (+34 more)

### Community 119 - "account/space.ts"
Cohesion: 0.16
Nodes (30): accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf() (+22 more)

### Community 120 - "Glifo"
Cohesion: 0.12
Nodes (16): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Domande frequenti e commenti (+8 more)

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "board.ts"
Cohesion: 0.06
Nodes (65): Action, DOT_SIZES, DrawAction, EraseAction, EraserMode, Finger, HANDLE_REACH, ICON (+57 more)

### Community 124 - "Sheet"
Cohesion: 0.07
Nodes (34): Definition, Line, ExactComplexScope, Ode, withWorkLimit(), FiniteContext, FormattedResult, Mat (+26 more)

### Community 125 - "dialog.ts"
Cohesion: 0.08
Nodes (35): accountDataFile(), PullResult, openShareDialog(), changeAccess(), changeCopy(), copy(), refreshChanged(), render() (+27 more)

### Community 129 - "Dove sono le cose"
Cohesion: 0.06
Nodes (79): Dove sono le cose, Glifo – architettura, allNames(), answerFollowUp(), bareResult(), chained(), chatContext, ChatFn (+71 more)

### Community 133 - "pick"
Cohesion: 0.26
Nodes (4): pick(), FormulaError, Parser, errorName()

### Community 136 - "Board"
Cohesion: 0.10
Nodes (4): Board, BoardOptions, pressureOf(), sizeChoice()

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 140 - ".constructor"
Cohesion: 0.19
Nodes (3): closeMathBlockOnEnter(), EditorCallbacks, insertTemplate()

### Community 141 - "xlsx.ts"
Cohesion: 0.09
Nodes (46): fflate, BinOp, COMPARE, englishFormula(), ERRORS_BY_LENGTH, formulaBody(), formulaRefs(), isFormula() (+38 more)

### Community 142 - "markers.ts"
Cohesion: 0.19
Nodes (20): bullet(), childMarker(), column(), firstMarker(), label(), lettersMarker(), MarkerKind, MarkerStyle (+12 more)

### Community 143 - "texts"
Cohesion: 0.07
Nodes (48): AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL, texts, Site, T, commentDate(), commentItem() (+40 more)

### Community 146 - "rich"
Cohesion: 0.14
Nodes (17): 1. «Cambia account», SyncStatus, rich(), AccountButton, accountSection(), AccountSectionDeps, confirmAccountDeletion(), messageOf() (+9 more)

### Community 154 - "vite"
Cohesion: 0.22
Nodes (6): vite, constructor(), LlamaWorker, minutes, postMessage(), started

### Community 156 - "Glifo – note per Claude"
Cohesion: 0.25
Nodes (8): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Regole, sqlite()

### Community 157 - "files.ts"
Cohesion: 0.17
Nodes (18): inClaudeViewer(), loadDialect(), canWriteFilesDirectly(), downloadBlob(), downloadText(), fileNameFor(), FsWindow, isAbort() (+10 more)

### Community 158 - "vite.config.ts"
Cohesion: 0.25
Nodes (5): vite-plugin-pwa, accountOffMessage(), defineFor(), MAIN_BRANCH, webllmModels

### Community 159 - ".onMove"
Cohesion: 0.16
Nodes (5): clampZoom(), coalesced(), pointsOf(), validView(), handleScale()

### Community 160 - ".reply"
Cohesion: 0.14
Nodes (15): Promemoria per lo studente, 2. La pagina dei commenti, tipo FAQ, Account: i propri appunti su ogni dispositivo, anche da condividere, Commenti di chi prova Glifo, Idee per il futuro, In programma, La grafica: account, impostazioni, commenti, AI e lingua (chiesto il 10 ottobre 2026, se ne parla), La lavagna: idee in più (+7 more)

### Community 162 - "insert.ts"
Cohesion: 0.13
Nodes (14): InsertOptions, addPlaceholders, buildDecorations(), clearAllPlaceholders(), clearPlaceholders, CommandTarget, contains(), currentIndex() (+6 more)

### Community 168 - "h"
Cohesion: 0.15
Nodes (19): viewSwitch, h(), copyLink(), FaqGroup, faqGroups(), FaqQuestion, faqSection, kbd() (+11 more)

### Community 169 - "ui/relocation.ts"
Cohesion: 0.15
Nodes (19): moveDayLabel(), RelocationResult, BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark(), downloadButton() (+11 more)

### Community 170 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

### Community 173 - "tutorial.ts"
Cohesion: 0.15
Nodes (12): HINT_MS, markTutorialSeen(), openTutorial(), show(), richText(), showTutorialHint(), close(), T (+4 more)

### Community 174 - "ui/preview.ts"
Cohesion: 0.07
Nodes (33): GraphLabels, renameGraphScope(), renameScopeKeys(), BlockKind, MoveDir, Look, Theme, draw() (+25 more)

### Community 175 - "statsGraph.ts"
Cohesion: 0.20
Nodes (15): classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX, Line, number(), pmfBars() (+7 more)

### Community 176 - "suggest.ts"
Cohesion: 0.27
Nodes (11): normalizeText(), IndexedEntry, SearchResult, getIndex(), isSubsequence(), keysOf(), MatchKind, suggestCommands() (+3 more)

## Knowledge Gaps
- **870 isolated node(s):** `Comandi`, `Regole`, `6. Glifo anche in inglese`, `8. Il pulsante ✨ con il contorno`, `Gli abbonamenti, in tutto questo` (+865 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1190 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **40 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `texts` connect `texts` to `ui/settings.ts`, `Dove sono le cose`, `main.ts`, `compile`, `spec.ts`, `pick`, `graph/preview.ts`, `aiPanel.ts`, `mathEn2.test.ts`, `vitest`, `sheet.ts`, `xlsx.ts`, `editor/editor.ts`, `notes.ts`, `numerical.ts`, `arithmetic.ts`, `index.ts`, `rich`, `schema/editor.ts`, `parse.ts`, `Stroke`, `page.ts`, `Glifo – note per Claude`, `several.ts`, `gantt.ts`, `toLatex`, `files.ts`, `sidePanel.ts`, `logic.ts`, `i18n.ts`, `complex.ts`, `namesIn`, `resize.ts`, `h`, `store/settings.ts`, `localModels.ts`, `settingsSections.test.ts`, `functions.ts`, `MathError`, `ui/preview.ts`, `statsGraph.ts`, `Rational`, `spreadsheetEn.test.ts`, `ui/relocation.ts`, `toolbar.ts`, `explainPanel.ts`, `tutorial.ts`, `supabase.ts`, `finite.ts`, `calcResults.ts`, `spreadsheet/editor.ts`, `conics.ts`, `odesolve.ts`, `statsShown.ts`, `schemaBlocks.ts`, `symbolic.ts`, `aiPanel.test.ts`, `topics.ts`, `src/relocation.ts`, `siteUpdate.ts`, `markdown.ts`, `spellcheck.ts`, `editor/lists.ts`, `probability.ts`, `board.ts`, `dialog.ts`?**
  _High betweenness centrality (0.157) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `Dove sono le cose` to `ui/settings.ts`, `NotesStore`, `main.ts`, `compile`, `spec.ts`, `num`, `Board`, `aiPanel.ts`, `graph/preview.ts`, `mathEn2.test.ts`, `.constructor`, `vitest`, `sheet.ts`, `texts`, `SchemaEditor`, `SheetEditor`, `rich`, `arithmetic.ts`, `numerical.ts`, `xlsx.ts`, `schema/editor.ts`, `store.ts`, `parse.ts`, `Stroke`, `smoke-test.mjs`, `files.ts`, `gantt.ts`, `.onMove`, `toLatex`, `sidePanel.ts`, `several.ts`, `i18n.ts`, `complex.ts`, `namesIn`, `logic.ts`, `vite.config.ts`, `view3d.ts`, `store/settings.ts`, `localModels.ts`, `h`, `functions.ts`, `MathError`, `ui/preview.ts`, `Rational`, `spreadsheetEn.test.ts`, `board/shapes.ts`, `ui/relocation.ts`, `SidePanel`, `explainPanel.ts`, `toolbar.ts`, `tutorial.ts`, `supabase.ts`, `ExplainPanel`, `finite.ts`, `calcResults.ts`, `spreadsheet/editor.ts`, `conics.ts`, `odesolve.ts`, `statsShown.ts`, `schemaBlocks.ts`, `symbolic.ts`, `aiPanel.test.ts`, `tutorial.mjs`, `topics.ts`, `src/relocation.ts`, `siteUpdate.ts`, `markdown.ts`, `graph.ts`, `account/space.ts`, `board.ts`, `Sheet`, `dialog.ts`?**
  _High betweenness centrality (0.090) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `ui/settings.ts`, `Dove sono le cose`, `compile`, `spec.ts`, `num`, `mathEn2.test.ts`, `xlsx.ts`, `markers.ts`, `editor/editor.ts`, `texts`, `notes.ts`, `schema/editor.ts`, `noteWordsMath.test.ts`, `store.ts`, `parse.ts`, `Stroke`, `gantt.ts`, `vite.config.ts`, `sidePanel.ts`, `i18n.ts`, `translations.test.ts`, `resize.ts`, `h`, `view3d.ts`, `ui/relocation.ts`, `settingsSections.test.ts`, `localModels.ts`, `tutorial.ts`, `ui/preview.ts`, `Rational`, `spreadsheetEn.test.ts`, `board/shapes.ts`, `suggestions.ts`, `MathError`, `explainPanel.ts`, `toolbar.ts`, `supabase.ts`, `database.ts`, `calcResults.ts`, `spreadsheet/editor.ts`, `schemaBlocks.ts`, `numerical.test.ts`, `appleTouch`, `aiPanel.test.ts`, `src/relocation.ts`, `symbolsEn.test.ts`, `siteUpdate.ts`, `markdown.ts`, `spellcheck.ts`, `account/space.ts`, `board.ts`, `Sheet`, `dialog.ts`?**
  _High betweenness centrality (0.089) - this node is a cross-community bridge._
- **Are the 322 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `tutorialModel()`) actually correct?**
  _`Dove sono le cose` has 322 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Comandi`, `Regole`, `6. Glifo anche in inglese` to the rest of the system?**
  _870 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `ui/settings.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07003367003367003 - nodes in this community are weakly interconnected._
- **Should `NotesStore` be split into smaller, more focused modules?**
  _Cohesion score 0.14393939393939395 - nodes in this community are weakly interconnected._