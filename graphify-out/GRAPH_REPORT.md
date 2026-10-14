# Graph Report - Glifo  (2026-10-14)

## Corpus Check
- 346 files · ~724,630 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5559 nodes · 20328 edges · 170 communities (129 shown, 41 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 681 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c496c91e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- rich
- markdown.ts
- main.ts
- compile
- sync.ts
- spec.ts
- store/settings.ts
- num
- graph/preview.ts
- Dove sono le cose
- probability.ts
- ui/relocation.ts
- svg.ts
- i18n.ts
- SchemaEditor
- editor/editor.ts
- SheetEditor
- NotesStore
- numerical.ts
- arithmetic.ts
- index.ts
- engine.ts
- schema/editor.ts
- noteWordsMath.test.ts
- store.ts
- parse.ts
- Stroke
- ui/preview.ts
- markers.ts
- several.ts
- gantt.ts
- toLatex
- parseGraph
- sidePanel.ts
- logic.ts
- Rational
- complex.ts
- namesIn
- translations.test.ts
- resize.ts
- view3d.ts
- src/relocation.ts
- localModels.ts
- escapeHtml
- functions.ts
- MathError
- topics.ts
- .onMove
- suggestions.ts
- board/shapes.ts
- toolbar.ts
- SidePanel
- explainPanel.ts
- FoldersStore
- link.ts
- usesDecimalComma
- 20261004091555_note_condivise.sql
- page.ts
- database.ts
- finite.ts
- ExplainPanel
- dependencies
- Welcome to Glifo
- spreadsheet/editor.ts
- conics.ts
- odesolve.ts
- sheet.ts
- render/lists.ts
- blockMove.ts
- Benvenuto in Glifo
- compilerOptions
- relocation-test.mjs
- La grafica: le otto richieste del 10 ottobre 2026
- scripts
- symbolic.ts
- AccountSync
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- appleTouch
- session-start.sh
- .claude/CLAUDE.md
- Il database degli account (Supabase)
- tutorial.mjs
- Abbonamenti
- explainSubjects.ts
- texts
- supabase-stub.sql
- account-test.mjs
- schemaBlocks.ts
- folders.ts
- In programma
- schemaEn.test.ts
- symbolsEn.test.ts
- siteUpdate.ts
- labels.ts
- aiPanel.test.ts
- spellcheck.ts
- tutorial.ts
- schema/shapes.ts
- Glifo
- supabase.ts
- exact.ts
- calcResults.ts
- spreadsheetEn.test.ts
- Le spiegazioni, come funzionano
- board.ts
- Sheet
- h
- createFakeSupabase
- Piano per piano
- pick
- Board
- 20261008130026_commenti.sql
- .constructor
- xlsx.ts
- editor/lists.ts
- feedback.ts
- settingsSections.test.ts
- smoke-test.mjs
- vite
- Glifo – note per Claude
- files.ts
- captcha.ts
- SuggestionController
- LlamaWorker
- Costi
- insert.ts
- La lavagna
- suggest.ts
- .openMenu
- site.ts
- devDependencies
- faq.ts
- solve.ts
- I modelli e le chiavi API
- MLCEngine

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 311 edges
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
- `Attenzione a` --references--> `renderMarkdown()`  [INFERRED]
  CLAUDE.md → src/render/markdown.ts
- `Trasloco: il sito su Cloudflare, con un dominio tutto di Glifo` --references--> `dist()`  [INFERRED]
  ROADMAP.md → src/board/shapes.ts
- `Dove sono le cose` --references--> `WidgetKind`  [INFERRED]
  ARCHITETTURA.md → src/editor/schemaBlocks.ts
- `Dove sono le cose` --references--> `ConicElements`  [INFERRED]
  ARCHITETTURA.md → src/math/conics.ts
- `Dove sono le cose` --references--> `fakeLlmWorker()`  [INFERRED]
  ARCHITETTURA.md → scripts/smoke-test.mjs

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (170 total, 41 thin omitted)

### Community 0 - "rich"
Cohesion: 0.08
Nodes (23): 3. Le impostazioni divise in sezioni, rich(), messageOf(), openLoginDialog(), codeStep(), emailStep(), privacyLink(), aboutSection() (+15 more)

### Community 1 - "markdown.ts"
Cohesion: 0.04
Nodes (91): @codemirror/view, formulaAtCursor(), GraphLabelLines, insertGraphBlock(), LABEL_KEYS, setGraphLabels(), FIGURE_PALETTE, graphImagesFor() (+83 more)

### Community 2 - "main.ts"
Cohesion: 0.03
Nodes (124): addToGraphBlock(), remapGraphLines(), remapLineKeys(), account, ACCOUNT_OFF, accountButton, accountDeps(), accountProblem() (+116 more)

### Community 3 - "compile"
Cohesion: 0.05
Nodes (92): integralRegion, areaFor(), argumentOrder(), compileLineIntegral(), compileSurfaceIntegral(), COORDS, dimension(), dot() (+84 more)

### Community 4 - "sync.ts"
Cohesion: 0.07
Nodes (30): withLock(), Account, EMPTY_STATE, FolderChange, FolderRow, isEmpty(), iso(), LocalChange (+22 more)

### Community 5 - "spec.ts"
Cohesion: 0.04
Nodes (105): vitest, conicItems(), isConicLine(), quadricEquation(), T, isFourierLine(), isComplexLine(), onlyComplex() (+97 more)

### Community 6 - "store/settings.ts"
Cohesion: 0.11
Nodes (43): accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf() (+35 more)

### Community 7 - "num"
Cohesion: 0.13
Nodes (87): atIntegers(), polyEx(), homogeneousGroups(), shapeValue(), similarSolution(), squareRoot(), yPowers(), algebraic() (+79 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (42): addLabel(), boxes, cameras, complexCoord(), containing(), coord(), coordinates(), drawings (+34 more)

### Community 9 - "Dove sono le cose"
Cohesion: 0.06
Nodes (78): Dove sono le cose, Glifo – architettura, allNames(), answerFollowUp(), bareResult(), chained(), chatContext, ChatFn (+70 more)

### Community 10 - "probability.ts"
Cohesion: 0.06
Nodes (64): addExp(), choose(), continuousQuantile(), decimals(), discreteQuantile(), Distribution, End, exactIntervalProbability() (+56 more)

### Community 11 - "ui/relocation.ts"
Cohesion: 0.16
Nodes (18): moveDayLabel(), RelocationResult, BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark(), downloadButton() (+10 more)

### Community 12 - "svg.ts"
Cohesion: 0.07
Nodes (64): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseWindow(), chooseY(), clipLines(), dataWindow() (+56 more)

### Community 13 - "i18n.ts"
Cohesion: 0.12
Nodes (28): DownloadedModel, Gpu, gpuF16(), MODEL_LICENSES, ModelGroup, modelVariant, AI_SERVICES, browserLang() (+20 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.08
Nodes (17): fieldInput(), isLanes(), SchemaEditor, withLaneContents(), cellText(), createEdgeCell(), edgeLook(), edgeStyle() (+9 more)

### Community 15 - "editor/editor.ts"
Cohesion: 0.05
Nodes (49): description, name, private, type, version, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/lang-markdown (+41 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (7): functionLabel(), SheetEditor, englishTyping(), serializeSheet(), sheetSize(), CellRange, cloneSheet()

### Community 17 - "NotesStore"
Cohesion: 0.08
Nodes (25): Deletion, DeletionLog, isUuid(), newId(), createdAtFromId(), deriveTitle(), Note, noteIdsInBrowser() (+17 more)

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
Cohesion: 0.04
Nodes (98): alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ALIGN_NAMES, ARROW_NAMES (+90 more)

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

### Community 27 - "ui/preview.ts"
Cohesion: 0.07
Nodes (33): GraphLabels, renameGraphScope(), renameScopeKeys(), BlockKind, MoveDir, Look, Theme, draw() (+25 more)

### Community 28 - "markers.ts"
Cohesion: 0.19
Nodes (20): bullet(), childMarker(), column(), firstMarker(), label(), lettersMarker(), MarkerKind, MarkerStyle (+12 more)

### Community 29 - "several.ts"
Cohesion: 0.06
Nodes (77): criticalLine(), named(), severalItems(), surface(), T, close(), Definite, definiteIntegral() (+69 more)

### Community 30 - "gantt.ts"
Cohesion: 0.04
Nodes (95): searchPhrases(), amount(), barColor(), crossings(), dateText(), dayMonth(), dayOf(), fitText() (+87 more)

### Community 31 - "toLatex"
Cohesion: 0.06
Nodes (75): fourierItems(), T, names(), STUDY_GRAPH, studyItems(), T, partialSum(), ACCENT_COMMANDS (+67 more)

### Community 32 - "parseGraph"
Cohesion: 0.07
Nodes (25): specFor(), parseGraph(), item(), light, pts, result(), square, text() (+17 more)

### Community 33 - "sidePanel.ts"
Cohesion: 0.08
Nodes (36): AiAnswer, AiError, AiResult, AiSettings, answerSchema(), askAi(), askCompatible(), askThroughHost() (+28 more)

### Community 34 - "logic.ts"
Cohesion: 0.11
Nodes (30): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+22 more)

### Community 35 - "Rational"
Cohesion: 0.09
Nodes (52): factorsOf(), Part, Rational, choices(), exText(), gcd(), matrixEquation(), matrixSystem() (+44 more)

### Community 36 - "complex.ts"
Cohesion: 0.06
Nodes (65): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexValue(), isInequality() (+57 more)

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
Nodes (91): staticGraphSvg(), LayeredSolid, addMesh(), addTet(), affinePlane(), Axis, Box, centroid() (+83 more)

### Community 41 - "src/relocation.ts"
Cohesion: 0.09
Nodes (28): BackupBoard, buildPackage(), isRelocationPackage(), OLD_ORIGIN, openedForRelocation(), RECEIVE_URL, receiveFromOldSite(), RELOCATION_DATES (+20 more)

### Community 42 - "localModels.ts"
Cohesion: 0.06
Nodes (48): @mlc-ai/web-llm, chat(), GlifoError, Gpu, load(), post(), remove(), scope (+40 more)

### Community 43 - "escapeHtml"
Cohesion: 0.32
Nodes (11): valueNode(), texHtml(), checkHtml(), checkTitle(), T, escapeHtml(), renderTex(), sentenceHtml() (+3 more)

### Community 44 - "functions.ts"
Cohesion: 0.07
Nodes (65): EMPTY, evaluateSheet(), number(), SheetEvaluator, T, addFormat(), divFormat(), GENERAL (+57 more)

### Community 45 - "MathError"
Cohesion: 0.06
Nodes (101): compileApply(), MathError, UndefinedName, decimalSeparator(), Digits, formatNumber(), formatRational(), fromNumber() (+93 more)

### Community 46 - "topics.ts"
Cohesion: 0.19
Nodes (20): ATTRIBUTES, cut(), ER_SHAPES, fieldText(), fitLines(), flowOrder(), formulaText(), FREE_NAMES (+12 more)

### Community 47 - ".onMove"
Cohesion: 0.16
Nodes (5): clampZoom(), coalesced(), pointsOf(), validView(), handleScale()

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
Cohesion: 0.10
Nodes (22): ExplainTone, Explanation, FollowUp, REPLY_TOKENS, MarkdownEditor, Settings, AI_NEWS_TITLE, AI_WORKING_TITLE (+14 more)

### Community 53 - "FoldersStore"
Cohesion: 0.16
Nodes (4): cleanFolderName(), FoldersStore, sameName(), names()

### Community 54 - "link.ts"
Cohesion: 0.20
Nodes (11): accountDataFile(), PullResult, isShareToken(), parseSharedNote(), SHARE_PAGE, SharedNote, shareUrl(), T (+3 more)

### Community 55 - "usesDecimalComma"
Cohesion: 0.07
Nodes (52): numberText(), number(), endTex(), figureText(), linearItem(), classes(), dataOf(), distributionExtent() (+44 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "page.ts"
Cohesion: 0.15
Nodes (15): NEW_ORIGIN, readSharedNote(), ShareReadError, body, draw(), isDark(), load(), saveButton (+7 more)

### Community 58 - "database.ts"
Cohesion: 0.23
Nodes (6): createDatabase(), createUser(), databaseTests(), feedbackTests(), migrations, shareTests()

### Community 59 - "finite.ts"
Cohesion: 0.17
Nodes (28): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+20 more)

### Community 60 - "ExplainPanel"
Cohesion: 0.16
Nodes (4): ExplainChat, ExplainPanel, preventFocusSteal(), formulasSummary()

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

### Community 66 - "sheet.ts"
Cohesion: 0.08
Nodes (57): numericPartials(), OdeFunction, expSumValue(), Lin, NUMERICAL, bracketParts(), BRACKETS, CHECK_VALUES (+49 more)

### Community 67 - "render/lists.ts"
Cohesion: 0.27
Nodes (13): ListStyle, bulletGroup(), Marker, sameList(), alignInside(), asciiTrim(), findMarker(), Found (+5 more)

### Community 68 - "blockMove.ts"
Cohesion: 0.10
Nodes (36): @codemirror/commands, blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove, blockPlace() (+28 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "relocation-test.mjs"
Cohesion: 0.18
Nodes (7): AFTER_MOVE, ids, newBrowser(), NOTICE_DAY, out, serve(), TYPES

### Community 72 - "La grafica: le otto richieste del 10 ottobre 2026"
Cohesion: 0.25
Nodes (8): 4. Più modelli per «Spiegami», 5. A cosa serve la chiave dell'AI, 6. Glifo anche in inglese, 7. Via il registro dei tocchi, 8. Il pulsante ✨ con il contorno, Gli abbonamenti, in tutto questo, In che ordine, La grafica: le otto richieste del 10 ottobre 2026

### Community 73 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (57): linearCells(), cancelLinear(), Converter, coordinates(), decimalText(), definiteParts(), definiteValue(), degree() (+49 more)

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Errore o imprevisto → nel dettaglio, 3. Serve una decisione → frasi complete, 4. Fine del compito → un solo riepilogo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 82 - "Il database degli account (Supabase)"
Cohesion: 0.14
Nodes (13): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il controllo anti-robot (CAPTCHA, ottobre 2026), Il database degli account (Supabase), Il progetto, Il trasloco su glifo.page (ottobre 2026) (+5 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.11
Nodes (11): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+3 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.14
Nodes (14): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+6 more)

### Community 91 - "explainSubjects.ts"
Cohesion: 0.14
Nodes (25): explainTarget, schemaTitle(), formulasUntil(), sheetBefore(), explanationMarkdown(), hasCalculation(), insertAfterBlock(), insertAfterText() (+17 more)

### Community 92 - "texts"
Cohesion: 0.14
Nodes (13): texts, append(), Child, formatDate(), Props, T, FAQ_URL, faqLink() (+5 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.11
Nodes (10): device(), login(), newContext, waitFor(), b64(), CAPTCHA_TOKEN, CODE, GOOGLE_CODE (+2 more)

### Community 97 - "schemaBlocks.ts"
Cohesion: 0.07
Nodes (36): BlockWidget, findWidgetBlocks(), guardBlocks(), KINDS, schemaBlocks(), schemaSummary(), T, WidgetBlock (+28 more)

### Community 98 - "folders.ts"
Cohesion: 0.15
Nodes (12): Folder, FOLDER_NAME_MAX, FolderGroup, groupByFolder(), loadClosedFolders(), RemoteFolder, saveClosedFolders(), NoteMeta (+4 more)

### Community 100 - "In programma"
Cohesion: 0.25
Nodes (8): Account: i propri appunti su ogni dispositivo, anche da condividere, Idee per il futuro, In programma, La grafica: account, impostazioni, commenti, AI e lingua (chiesto il 10 ottobre 2026, se ne parla), La lavagna: idee in più, Più avanti, Schemi: idee in più, Trasloco: il sito su Cloudflare, con un dominio tutto di Glifo

### Community 101 - "schemaEn.test.ts"
Cohesion: 0.06
Nodes (46): @electric-sql/pglite, svg(), openSchemaEditor(), base64(), hide(), OPEN, schemasForFile(), schemasFromFile() (+38 more)

### Community 102 - "symbolsEn.test.ts"
Cohesion: 0.13
Nodes (30): editDistance(), singular(), stem(), STOPWORDS, words(), BOTH, buildIndex(), containsPhrase() (+22 more)

### Community 103 - "siteUpdate.ts"
Cohesion: 0.17
Nodes (17): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, loadPart() (+9 more)

### Community 104 - "labels.ts"
Cohesion: 0.12
Nodes (26): figureName(), graphFigure(), graphImage(), swatchSvg(), titleBand(), ACCENTS, BLACKBOARD, CALLIGRAPHIC (+18 more)

### Community 105 - "aiPanel.test.ts"
Cohesion: 0.11
Nodes (21): definedName(), formulaTopic(), graphTopic(), studyOf(), theoremTopic(), NoteSubject, SubjectKind, AiPanel (+13 more)

### Community 107 - "spellcheck.ts"
Cohesion: 0.08
Nodes (23): misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt(), openAt() (+15 more)

### Community 108 - "tutorial.ts"
Cohesion: 0.15
Nodes (12): HINT_MS, markTutorialSeen(), openTutorial(), show(), richText(), showTutorialHint(), close(), T (+4 more)

### Community 113 - "schema/shapes.ts"
Cohesion: 0.08
Nodes (17): @maxgraph/core, ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape (+9 more)

### Community 116 - "Glifo"
Cohesion: 0.12
Nodes (16): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Domande frequenti e commenti (+8 more)

### Community 117 - "supabase.ts"
Cohesion: 0.12
Nodes (32): @supabase/supabase-js, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken(), ensureSessionOf() (+24 more)

### Community 118 - "exact.ts"
Cohesion: 0.07
Nodes (22): bigGcd(), binomExact(), conditionExact(), evaluateExact(), ExactFunction, ExactRandom, exactRoot(), factorialExact() (+14 more)

### Community 120 - "calcResults.ts"
Cohesion: 0.06
Nodes (34): @codemirror/language, @codemirror/state, @lezer/common, acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult (+26 more)

### Community 121 - "spreadsheetEn.test.ts"
Cohesion: 0.08
Nodes (56): valueText(), sheetSummary(), csvCell(), openSheetEditor(), booleanText(), ENGLISH, englishNumber(), errorText() (+48 more)

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "board.ts"
Cohesion: 0.06
Nodes (65): Action, DOT_SIZES, DrawAction, EraseAction, EraserMode, Finger, HANDLE_REACH, ICON (+57 more)

### Community 124 - "Sheet"
Cohesion: 0.07
Nodes (34): Definition, Line, ExactComplexScope, Ode, withWorkLimit(), FiniteContext, FormattedResult, Mat (+26 more)

### Community 125 - "h"
Cohesion: 0.09
Nodes (38): 1. «Cambia account», viewSwitch, openShareDialog(), changeAccess(), changeCopy(), copy(), refreshChanged(), render() (+30 more)

### Community 128 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 132 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

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

### Community 142 - "editor/lists.ts"
Cohesion: 0.19
Nodes (31): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+23 more)

### Community 143 - "feedback.ts"
Cohesion: 0.08
Nodes (41): SUPABASE_KEY, SUPABASE_URL, Site, commentDate(), commentItem(), COMMENTS_MAX, CommentsDeps, CommentsError (+33 more)

### Community 144 - "settingsSections.test.ts"
Cohesion: 0.11
Nodes (11): SyncStatus, accountSection(), AccountSectionDeps, License, licenseOf(), LICENSES, T, SettingsSection (+3 more)

### Community 146 - "smoke-test.mjs"
Cohesion: 0.15
Nodes (6): markdown-it, playwright-core, PNG_ICONS, fakeLlmWorker(), firstVisit(), plainContext

### Community 154 - "vite"
Cohesion: 0.33
Nodes (4): vite, minutes, postMessage(), started

### Community 156 - "Glifo – note per Claude"
Cohesion: 0.25
Nodes (8): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Regole, sqlite()

### Community 157 - "files.ts"
Cohesion: 0.17
Nodes (18): inClaudeViewer(), loadDialect(), canWriteFilesDirectly(), downloadBlob(), downloadText(), fileNameFor(), FsWindow, isAbort() (+10 more)

### Community 158 - "captcha.ts"
Cohesion: 0.19
Nodes (9): captchaToken(), loadTurnstile(), Turnstile, TURNSTILE_SCRIPT, Window, AUTH_STORAGE_KEY, TURNSTILE_SITE_KEY, accountFailure() (+1 more)

### Community 160 - "LlamaWorker"
Cohesion: 0.19
Nodes (9): Promemoria per lo studente, 2. La pagina dei commenti, tipo FAQ, Commenti di chi prova Glifo, constructor(), LlamaWorker, Commenti di chi prova Glifo, kind(), page() (+1 more)

### Community 161 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 162 - "insert.ts"
Cohesion: 0.13
Nodes (14): InsertOptions, addPlaceholders, buildDecorations(), clearAllPlaceholders(), clearPlaceholders, CommandTarget, contains(), currentIndex() (+6 more)

### Community 163 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 166 - "suggest.ts"
Cohesion: 0.27
Nodes (11): normalizeText(), IndexedEntry, SearchResult, getIndex(), isSubsequence(), keysOf(), MatchKind, suggestCommands() (+3 more)

### Community 168 - ".openMenu"
Cohesion: 0.21
Nodes (6): loadPrefs(), Prefs, BoardPalette, SizeChoice, HighlightColor, InkColor

### Community 169 - "site.ts"
Cohesion: 0.22
Nodes (6): vite-plugin-pwa, accountOffMessage(), T, defineFor(), MAIN_BRANCH, webllmModels

### Community 170 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

### Community 171 - "faq.ts"
Cohesion: 0.18
Nodes (14): copyLink(), FaqGroup, faqGroups(), FaqQuestion, faqSection, kbd(), list(), p() (+6 more)

### Community 173 - "solve.ts"
Cohesion: 0.09
Nodes (42): FieldContext, fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), Scope (+34 more)

### Community 179 - "I modelli e le chiavi API"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), In prova sul ramo `prova` (7 ottobre 2026): Qwen3 nel browser per «Spiegami», Le idee dello studente (5 ottobre 2026)

## Knowledge Gaps
- **870 isolated node(s):** `Comandi`, `Regole`, `La grafica: account, impostazioni, commenti, AI e lingua (chiesto il 10 ottobre 2026, se ne parla)`, `Account: i propri appunti su ogni dispositivo, anche da condividere`, `La lavagna: idee in più` (+865 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1190 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **41 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `texts` connect `texts` to `markdown.ts`, `main.ts`, `compile`, `spec.ts`, `pick`, `store/settings.ts`, `graph/preview.ts`, `Dove sono le cose`, `probability.ts`, `ui/relocation.ts`, `svg.ts`, `i18n.ts`, `editor/lists.ts`, `editor/editor.ts`, `xlsx.ts`, `NotesStore`, `numerical.ts`, `arithmetic.ts`, `index.ts`, `feedback.ts`, `schema/editor.ts`, `settingsSections.test.ts`, `parse.ts`, `Stroke`, `ui/preview.ts`, `Glifo – note per Claude`, `several.ts`, `gantt.ts`, `toLatex`, `files.ts`, `sidePanel.ts`, `logic.ts`, `Rational`, `complex.ts`, `namesIn`, `resize.ts`, `src/relocation.ts`, `localModels.ts`, `escapeHtml`, `site.ts`, `MathError`, `topics.ts`, `solve.ts`, `functions.ts`, `faq.ts`, `toolbar.ts`, `explainPanel.ts`, `link.ts`, `usesDecimalComma`, `page.ts`, `finite.ts`, `spreadsheet/editor.ts`, `conics.ts`, `odesolve.ts`, `sheet.ts`, `symbolic.ts`, `schemaBlocks.ts`, `folders.ts`, `schemaEn.test.ts`, `siteUpdate.ts`, `aiPanel.test.ts`, `spellcheck.ts`, `tutorial.ts`, `supabase.ts`, `calcResults.ts`, `spreadsheetEn.test.ts`, `board.ts`, `h`?**
  _High betweenness centrality (0.133) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `Dove sono le cose` to `rich`, `markdown.ts`, `main.ts`, `compile`, `spec.ts`, `store/settings.ts`, `num`, `Board`, `graph/preview.ts`, `probability.ts`, `.constructor`, `i18n.ts`, `svg.ts`, `SchemaEditor`, `SheetEditor`, `xlsx.ts`, `smoke-test.mjs`, `arithmetic.ts`, `numerical.ts`, `NotesStore`, `schema/editor.ts`, `settingsSections.test.ts`, `store.ts`, `parse.ts`, `Stroke`, `ui/preview.ts`, `files.ts`, `gantt.ts`, `toLatex`, `parseGraph`, `sidePanel.ts`, `logic.ts`, `Rational`, `complex.ts`, `namesIn`, `several.ts`, `view3d.ts`, `src/relocation.ts`, `localModels.ts`, `escapeHtml`, `site.ts`, `MathError`, `topics.ts`, `.onMove`, `functions.ts`, `board/shapes.ts`, `faq.ts`, `SidePanel`, `explainPanel.ts`, `toolbar.ts`, `usesDecimalComma`, `finite.ts`, `ExplainPanel`, `spreadsheet/editor.ts`, `conics.ts`, `odesolve.ts`, `sheet.ts`, `blockMove.ts`, `symbolic.ts`, `feedback.ts`, `tutorial.mjs`, `explainSubjects.ts`, `schemaBlocks.ts`, `schemaEn.test.ts`, `siteUpdate.ts`, `labels.ts`, `aiPanel.test.ts`, `tutorial.ts`, `schema/shapes.ts`, `supabase.ts`, `calcResults.ts`, `spreadsheetEn.test.ts`, `board.ts`, `Sheet`, `h`?**
  _High betweenness centrality (0.108) - this node is a cross-community bridge._
- **Why does `vitest` connect `spec.ts` to `rich`, `markdown.ts`, `compile`, `store/settings.ts`, `num`, `Dove sono le cose`, `probability.ts`, `ui/relocation.ts`, `svg.ts`, `i18n.ts`, `xlsx.ts`, `editor/editor.ts`, `feedback.ts`, `settingsSections.test.ts`, `NotesStore`, `schema/editor.ts`, `noteWordsMath.test.ts`, `store.ts`, `parse.ts`, `Stroke`, `ui/preview.ts`, `markers.ts`, `captcha.ts`, `gantt.ts`, `parseGraph`, `sidePanel.ts`, `Rational`, `translations.test.ts`, `resize.ts`, `view3d.ts`, `site.ts`, `localModels.ts`, `faq.ts`, `src/relocation.ts`, `MathError`, `suggestions.ts`, `board/shapes.ts`, `toolbar.ts`, `explainPanel.ts`, `link.ts`, `usesDecimalComma`, `database.ts`, `spreadsheet/editor.ts`, `blockMove.ts`, `appleTouch`, `schemaBlocks.ts`, `folders.ts`, `schemaEn.test.ts`, `symbolsEn.test.ts`, `siteUpdate.ts`, `aiPanel.test.ts`, `spellcheck.ts`, `tutorial.ts`, `supabase.ts`, `calcResults.ts`, `spreadsheetEn.test.ts`, `board.ts`, `Sheet`?**
  _High betweenness centrality (0.073) - this node is a cross-community bridge._
- **Are the 310 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `tutorialModel()`) actually correct?**
  _`Dove sono le cose` has 310 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Comandi`, `Regole`, `La grafica: account, impostazioni, commenti, AI e lingua (chiesto il 10 ottobre 2026, se ne parla)` to the rest of the system?**
  _870 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `rich` be split into smaller, more focused modules?**
  _Cohesion score 0.07781649245063879 - nodes in this community are weakly interconnected._
- **Should `markdown.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04384546271338724 - nodes in this community are weakly interconnected._