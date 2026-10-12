# Graph Report - matherdown  (2026-10-12)

## Corpus Check
- 321 files · ~619,363 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5119 nodes · 18527 edges · 157 communities (122 shown, 35 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 621 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `06b1c5af`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- touchlog.ts
- parse.ts
- main.ts
- compile
- sync.ts
- spec.ts
- view3d.ts
- primitive.ts
- graph/preview.ts
- Dove sono le cose
- plan.ts
- editor/lists.ts
- svg.ts
- parseSchema
- SchemaEditor
- Board
- SheetEditor
- editor/editor.ts
- numerical.ts
- toLatex
- define.ts
- engine.ts
- topics.ts
- .renderFormat
- store.ts
- MathError
- markers.ts
- assistant.ts
- package.json
- SheetEvaluator
- gantt.ts
- markdown.ts
- ui/preview.ts
- spell.test.ts
- logic.ts
- strokes.ts
- complex.ts
- namesIn
- mathSyntax.ts
- resize.ts
- tutorial.ts
- index.ts
- several.ts
- solve.ts
- functions.ts
- latex.ts
- src/relocation.ts
- Pt
- Rational
- board/shapes.ts
- NotesStore
- sidePanel.ts
- render/lists.ts
- supabase.ts
- aiActivity.ts
- client.ts
- 20261004091555_note_condivise.sql
- captcha.ts
- database.ts
- num
- Glifo
- dependencies
- spellcheck
- study.ts
- h
- Piano per piano
- spreadsheet/editor.ts
- blockMove.ts
- smoke-test.mjs
- Benvenuto in Glifo
- compilerOptions
- relocation-test.mjs
- dictionaries.ts
- toolbar.ts
- symbolic.ts
- data/calculus.ts
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- schema/editor.ts
- distributions.ts
- session-start.sh
- .claude/CLAUDE.md
- scripts
- tutorial.mjs
- Abbonamenti
- calcResults.ts
- supabase-stub.sql
- account-test.mjs
- sheet.ts
- In programma
- page.ts
- linsys.ts
- search.ts
- siteUpdate.ts
- Preview
- SpellClient
- .render
- explainPanel.ts
- xlsx.ts
- spiegami-qwen.mjs
- graph.ts
- Il database degli account (Supabase)
- Glifo – note per Claude
- ExplainPanel
- conics.ts
- schema/templates.ts
- files.ts
- Le spiegazioni, come funzionano
- board.ts
- Sheet
- sql.ts
- SheetModel
- grafo-html.mjs
- createFakeSupabase
- graph/file.ts
- schemaBlocks.ts
- MarkdownEditor
- Parser
- Costi
- 20261008130026_commenti.sql
- La lavagna
- vitest
- I modelli e le chiavi API
- FoldersStore
- misc.ts
- devDependencies
- BoardStore
- BoardOptions

## God Nodes (most connected - your core abstractions)
1. `Dove sono le cose` - 286 edges
2. `MathError` - 151 edges
3. `num()` - 145 edges
4. `Sheet` - 139 edges
5. `MathNode` - 129 edges
6. `mul()` - 124 edges
7. `h()` - 120 edges
8. `Board` - 118 edges
9. `compile()` - 113 edges
10. `Rational` - 111 edges

## Surprising Connections (you probably didn't know these)
- `Dove sono le cose` --references--> `fakeLlmWorker()`  [INFERRED]
  ARCHITETTURA.md → scripts/smoke-test.mjs
- `Dove sono le cose` --references--> `WidgetKind`  [INFERRED]
  ARCHITETTURA.md → src/editor/schemaBlocks.ts
- `Dove sono le cose` --references--> `ConicElements`  [INFERRED]
  ARCHITETTURA.md → src/math/conics.ts
- `Dove sono le cose` --references--> `texts()`  [INFERRED]
  ARCHITETTURA.md → tests/boardTouchLog.test.ts
- `Trasloco: il sito su Cloudflare, con un dominio tutto di Glifo` --references--> `dist()`  [INFERRED]
  ROADMAP.md → src/board/shapes.ts

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (157 total, 35 thin omitted)

### Community 0 - "touchlog.ts"
Cohesion: 0.09
Nodes (27): at(), browserStore, clip(), isSaved(), KINDS, LOG_KEY, LOG_MAX_LINES, LogStore (+19 more)

### Community 1 - "parse.ts"
Cohesion: 0.07
Nodes (42): hasWord(), ACCENTS, AND_WORDS, BARE_WORDS, CLOSING, COMMAND_OPS, CONNECTIVES, describe() (+34 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (109): 2. La pagina dei commenti, tipo FAQ, graphsForFile(), hide(), account, ACCOUNT_OFF, accountButton, active, aiShown() (+101 more)

### Community 3 - "compile"
Cohesion: 0.04
Nodes (102): FieldContext, inequalityMargin(), integralRegion, LayeredSolid, radiusOf(), spaceLayers(), spaceMargin(), spacePoint() (+94 more)

### Community 4 - "sync.ts"
Cohesion: 0.06
Nodes (30): AccountSync, withLock(), Account, EMPTY_STATE, FolderChange, FolderRow, isEmpty(), iso() (+22 more)

### Community 5 - "spec.ts"
Cohesion: 0.05
Nodes (95): conicItems(), isConicLine(), quadricEquation(), fourierItems(), isFourierLine(), isComplexLine(), isComplexValue(), isSegmentNode() (+87 more)

### Community 6 - "view3d.ts"
Cohesion: 0.06
Nodes (93): tickLabel(), addMesh(), addTet(), affinePlane(), Axis, centroid(), chooseBox(), clipBy() (+85 more)

### Community 7 - "primitive.ts"
Cohesion: 0.16
Nodes (60): algebraic(), bigGcd(), byParts(), candidates(), canon(), combineLogs(), compareKeys(), distribute() (+52 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.07
Nodes (43): FIGURE_PALETTE, addLabel(), boxes, cameras, complexCoord(), coord(), drawings, drawnViews (+35 more)

### Community 9 - "Dove sono le cose"
Cohesion: 0.06
Nodes (69): Dove sono le cose, Glifo – architettura, allNames(), answerFollowUp(), bareResult(), CHAT_SUBJECT, chatContext, ChatFn (+61 more)

### Community 10 - "plan.ts"
Cohesion: 0.09
Nodes (38): at(), breakEven(), dataLine(), dataRange(), Point, quantity(), tableItems(), textLabel() (+30 more)

### Community 11 - "editor/lists.ts"
Cohesion: 0.18
Nodes (28): continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext(), isBlank() (+20 more)

### Community 12 - "svg.ts"
Cohesion: 0.09
Nodes (56): contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), chooseWindow(), chooseY(), clipLines(), dataWindow() (+48 more)

### Community 13 - "parseSchema"
Cohesion: 0.10
Nodes (27): schemaSummary(), svg(), saveSchemaBlock(), findSchemaBlock(), findSchemaBlocks(), OpenFence, schemaBlockAtLine(), schemaBlockText() (+19 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.11
Nodes (4): isLanes(), SchemaEditor, withLaneContents(), serializeSchema()

### Community 15 - "Board"
Cohesion: 0.09
Nodes (5): Board, loadPrefs(), penErases(), sizeChoice(), highlightName()

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (5): rangeLabel(), SheetEditor, serializeSheet(), CellRange, cloneSheet()

### Community 17 - "editor/editor.ts"
Cohesion: 0.04
Nodes (58): @codemirror/lang-markdown, @codemirror/language, @codemirror/state, @codemirror/view, closeMathBlockOnEnter(), highlight, italianPhrases, tabOutOfMath() (+50 more)

### Community 18 - "numerical.ts"
Cohesion: 0.11
Nodes (51): isNumericalLine(), numericalItems(), FormatOptions, bisection(), cholesky(), condition(), derivative(), exactPolynomial() (+43 more)

### Community 19 - "toLatex"
Cohesion: 0.06
Nodes (100): ARITHMETIC, arithmeticShown(), bezout(), combine(), diophantineShown(), divisionShown(), divisors(), euclidShown() (+92 more)

### Community 20 - "define.ts"
Cohesion: 0.14
Nodes (16): g, greek, o, operators, rel, relations, l, logic (+8 more)

### Community 21 - "engine.ts"
Cohesion: 0.22
Nodes (9): @farscrl/hunspell-wasm, capitalize(), COMMON_FIXES, ELISIONS, inGlossary(), lower(), SpellEngine, GLOSSARY (+1 more)

### Community 22 - "topics.ts"
Cohesion: 0.08
Nodes (40): ATTRIBUTES, count(), cut(), definedName(), ER_SHAPES, fieldText(), fitLines(), flowOrder() (+32 more)

### Community 23 - ".renderFormat"
Cohesion: 0.14
Nodes (16): createEdgeCell(), edgeLook(), edgeStyle(), edgeTextAt(), isEdgeLook(), isNodeLook(), nodeLook(), nodeStyle() (+8 more)

### Community 24 - "store.ts"
Cohesion: 0.09
Nodes (18): fake-indexeddb, Step, BoardBackend, BoardChange, BoardData, done(), fromRecord(), IdbBoards (+10 more)

### Community 25 - "MathError"
Cohesion: 0.06
Nodes (75): figureText(), linearItem(), MathError, angleBetween(), asMatrix(), basisOf(), characteristicPolynomial(), circleText() (+67 more)

### Community 26 - "markers.ts"
Cohesion: 0.19
Nodes (22): bullet(), childMarker(), column(), firstMarker(), label(), lettersMarker(), MarkerKind, MarkerStyle (+14 more)

### Community 27 - "assistant.ts"
Cohesion: 0.09
Nodes (29): @anthropic-ai/sdk, AiAnswer, AiError, AiResult, AiSettings, ANSWER_SCHEMA, askAi(), askCompatible() (+21 more)

### Community 28 - "package.json"
Cohesion: 0.09
Nodes (20): description, name, private, type, version, @codemirror/autocomplete, @codemirror/language-data, @codemirror/search (+12 more)

### Community 29 - "SheetEvaluator"
Cohesion: 0.11
Nodes (23): formulaText(), readSheet(), tableTopic(), valueText(), sheetSummary(), openSheetEditor(), evaluateSheet(), SheetEvaluator (+15 more)

### Community 30 - "gantt.ts"
Cohesion: 0.06
Nodes (73): amount(), barColor(), crossings(), dateText(), dayOf(), fitText(), GanttOptions, ganttSvg() (+65 more)

### Community 31 - "markdown.ts"
Cohesion: 0.14
Nodes (19): readChart(), markMoves(), moveAttrs(), configurePurify(), createMarkdownIt(), FORBIDDEN_TAGS, HLJS_LANGUAGES, mathInlineRule() (+11 more)

### Community 32 - "ui/preview.ts"
Cohesion: 0.16
Nodes (18): renameGraphScope(), renameScopeKeys(), BlockKind, MoveDir, draw(), drawCached(), drawn, errorHtml() (+10 more)

### Community 33 - "spell.test.ts"
Cohesion: 0.13
Nodes (14): misspelledMark, refreshSpelling, setTarget, SKIP, SpellTarget, wordsToCheck(), findWords(), isProseCase() (+6 more)

### Community 34 - "logic.ts"
Cohesion: 0.12
Nodes (28): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+20 more)

### Community 35 - "strokes.ts"
Cohesion: 0.22
Nodes (15): between(), Box, capsuleSpan(), circleSpan(), eraserGrowth(), eraseStroke(), intersect(), linearSpan() (+7 more)

### Community 36 - "complex.ts"
Cohesion: 0.06
Nodes (66): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isInequality(), realEverywhere() (+58 more)

### Community 37 - "namesIn"
Cohesion: 0.15
Nodes (33): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+25 more)

### Community 38 - "mathSyntax.ts"
Cohesion: 0.18
Nodes (17): @lezer/highlight, @lezer/markdown, lineDepth(), mathDelimTag, mathTag, parseBlockMath(), mathBlockRule(), analyzeBlockOpen() (+9 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (23): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+15 more)

### Community 40 - "tutorial.ts"
Cohesion: 0.16
Nodes (13): helpButton, openGuide(), HINT_MS, markTutorialSeen(), openTutorial(), show(), richText(), showTutorialHint() (+5 more)

### Community 41 - "index.ts"
Cohesion: 0.15
Nodes (14): ac, accents, d, delimiters, fonts, ft, st, structures (+6 more)

### Community 42 - "several.ts"
Cohesion: 0.08
Nodes (55): EMPTY_SCOPE, Piece, severalLimit, Condition, Family, Group, Root, Shape (+47 more)

### Community 43 - "solve.ts"
Cohesion: 0.06
Nodes (72): areaFor(), multipleLabel(), fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd() (+64 more)

### Community 44 - "functions.ts"
Cohesion: 0.07
Nodes (75): EMPTY, number(), addFormat(), decimalsOf(), divFormat(), fixedNumber(), formatNumber(), GENERAL (+67 more)

### Community 45 - "latex.ts"
Cohesion: 0.08
Nodes (50): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+42 more)

### Community 46 - "src/relocation.ts"
Cohesion: 0.08
Nodes (39): relocationReceived(), isRelocationPackage(), moveDayLabel(), NEW_ORIGIN, OLD_ORIGIN, openedForRelocation(), RECEIVE_URL, receiveFromOldSite() (+31 more)

### Community 47 - "Pt"
Cohesion: 0.11
Nodes (13): clampZoom(), coalesced(), EraseAction, Finger, LassoAction, MoveAction, pointsOf(), pressureOf() (+5 more)

### Community 48 - "Rational"
Cohesion: 0.06
Nodes (48): End, expSum, Family, CompileOptions, bigGcd(), binomExact(), conditionExact(), evaluateExact() (+40 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.13
Nodes (36): DrawAction, adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners() (+28 more)

### Community 50 - "NotesStore"
Cohesion: 0.06
Nodes (65): 1. «Cambia account», 5. A cosa serve la chiave dell'AI, 6. Glifo anche in inglese, La grafica: le otto richieste del 10 ottobre 2026, accountSpace(), adoptGuestNotes(), forgetAccount(), guestNoteCount() (+57 more)

### Community 51 - "sidePanel.ts"
Cohesion: 0.08
Nodes (33): katex, formulaAtCursor(), insertGraphBlock(), SuggestionItem, graphBlockText(), insertGraph(), checkHtml(), checkTitle() (+25 more)

### Community 52 - "render/lists.ts"
Cohesion: 0.23
Nodes (15): Item, ListStyle, bulletGroup(), ListLine, Marker, sameList(), alignInside(), asciiTrim() (+7 more)

### Community 53 - "supabase.ts"
Cohesion: 0.11
Nodes (35): @supabase/supabase-js, AUTH_STORAGE_KEY, accountError, appUrl(), call(), currentSession(), deleteAccount(), emailLinkToken() (+27 more)

### Community 54 - "aiActivity.ts"
Cohesion: 0.36
Nodes (3): AI_NEWS_TITLE, AI_WORKING_TITLE, aiActivity

### Community 55 - "client.ts"
Cohesion: 0.21
Nodes (8): Backend, pageBackend(), SpellClientOptions, workerBackend(), WorkerUnavailable, SpellLanguage, SpellRequest, handle

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "captcha.ts"
Cohesion: 0.21
Nodes (8): captchaToken(), loadTurnstile(), Turnstile, TURNSTILE_SCRIPT, Window, TURNSTILE_SITE_KEY, accountFailure(), Options

### Community 58 - "database.ts"
Cohesion: 0.23
Nodes (6): createDatabase(), createUser(), databaseTests(), feedbackTests(), migrations, shareTests()

### Community 59 - "num"
Cohesion: 0.07
Nodes (104): primed(), withPrimes(), absOf(), splitAbs(), withoutAbs(), exp(), hyperbolicToExp(), termTransform() (+96 more)

### Community 60 - "Glifo"
Cohesion: 0.13
Nodes (15): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Commenti, Compatibilità con VS Code, Condividere una nota con un link (+7 more)

### Community 61 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+18 more)

### Community 62 - "spellcheck"
Cohesion: 0.21
Nodes (8): spellcheck(), close(), misspelledAt(), openAt(), replace(), tooltipView(), SpellChecker, SpellcheckOptions

### Community 63 - "study.ts"
Cohesion: 0.12
Nodes (39): names(), STUDY_GRAPH, studyItems(), limit(), breaks(), periodOf(), Asymptote, boundaries() (+31 more)

### Community 64 - "h"
Cohesion: 0.05
Nodes (78): 3. Le impostazioni divise in sezioni, SUPABASE_KEY, SUPABASE_URL, SyncStatus, EXPLAIN_TONES, board, viewSwitch, openSignedOut() (+70 more)

### Community 65 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 66 - "spreadsheet/editor.ts"
Cohesion: 0.08
Nodes (62): currentCall(), Editing, MenuEntry, Move, PATHS, formatCode(), formatValue(), MAX_DECIMALS (+54 more)

### Community 67 - "blockMove.ts"
Cohesion: 0.12
Nodes (30): blockMoveTransaction(), blank(), BlockMove, blockPlace(), closed(), closeIdx(), contentHash(), fenceClosed() (+22 more)

### Community 68 - "smoke-test.mjs"
Cohesion: 0.25
Nodes (5): markdown-it, playwright-core, fakeLlmWorker(), firstVisit(), plainContext

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "relocation-test.mjs"
Cohesion: 0.18
Nodes (7): AFTER_MOVE, ids, newBrowser(), NOTICE_DAY, out, serve(), TYPES

### Community 72 - "dictionaries.ts"
Cohesion: 0.20
Nodes (5): download(), fetchDictionary(), FILES, DictionaryData, createSpellService()

### Community 73 - "toolbar.ts"
Cohesion: 0.19
Nodes (16): insertBlock(), wrapSelection(), applyListStyle(), Action, createToolbar(), insertCode(), insertLink(), listMenu() (+8 more)

### Community 74 - "symbolic.ts"
Cohesion: 0.07
Nodes (63): valueAt(), primitive(), verified(), linearCells(), atValues(), combine(), commonMonomial(), Converter (+55 more)

### Community 75 - "data/calculus.ts"
Cohesion: 0.22
Nodes (8): b, bigops, c, calculus, fn, fr, fractions, functions

### Community 76 - "Le quattro modalità"
Cohesion: 0.25
Nodes (7): 1. Durante il lavoro → silenzio, 2. Errore o imprevisto → nel dettaglio, 3. Serve una decisione → frasi complete, 4. Fine del compito → un solo riepilogo, Lavoro silenzioso, Le quattro modalità, Quando NON comprimere

### Community 77 - "20260930141840_note_cartelle_impostazioni.sql"
Cohesion: 0.22
Nodes (11): before_write_1_tombstone, before_write_2_quota, before_write_3_revision, folders_owner_txid, notes_folder, notes_owner_txid, private.check_folders_quota(), public.folders (+3 more)

### Community 78 - "schema/editor.ts"
Cohesion: 0.06
Nodes (57): alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ARROW_NAMES, AT_ICONS (+49 more)

### Community 79 - "distributions.ts"
Cohesion: 0.05
Nodes (79): isTestLine(), number(), testItems(), classes(), dataOf(), distributionExtent(), distributionLabel(), FAMILY_TEX (+71 more)

### Community 82 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, preview, test, test:e2e, test:watch, typecheck

### Community 83 - "tutorial.mjs"
Cohesion: 0.20
Nodes (6): centerOf(), clickOn(), ffmpeg, SCENES, SIZE, work

### Community 90 - "Abbonamenti"
Cohesion: 0.14
Nodes (14): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+6 more)

### Community 91 - "calcResults.ts"
Cohesion: 0.07
Nodes (36): @lezer/common, explainTarget, Explanation, acceptCalcResult(), CalcCheck, calcOutcomes(), calcPlugin, CalcResult (+28 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.11
Nodes (10): device(), login(), newContext, waitFor(), b64(), CAPTCHA_TOKEN, CODE, GOOGLE_CODE (+2 more)

### Community 97 - "sheet.ts"
Cohesion: 0.09
Nodes (48): OdeFunction, NUMERICAL, bracketParts(), BRACKETS, CHECK_VALUES, checks, Definition, fingerprint() (+40 more)

### Community 98 - "In programma"
Cohesion: 0.25
Nodes (8): Account: i propri appunti su ogni dispositivo, anche da condividere, Idee per il futuro, In programma, La grafica: account, impostazioni, commenti, AI e lingua (chiesto il 10 ottobre 2026, se ne parla), La lavagna: idee in più, Più avanti, Schemi: idee in più, Trasloco: il sito su Cloudflare, con un dominio tutto di Glifo

### Community 100 - "page.ts"
Cohesion: 0.07
Nodes (42): accountDataFile(), currentAccount(), PullResult, openShareDialog(), changeAccess(), changeCopy(), copy(), refreshChanged() (+34 more)

### Community 101 - "linsys.ts"
Cohesion: 0.14
Nodes (41): choices(), gcd(), matrixEquation(), matrixSystem(), minorsGcd(), ONE, parametricRows(), parametricSystem() (+33 more)

### Community 102 - "search.ts"
Cohesion: 0.16
Nodes (25): editDistance(), normalizeText(), stem(), STOPWORDS, words(), buildIndex(), containsPhrase(), getIndex() (+17 more)

### Community 103 - "siteUpdate.ts"
Cohesion: 0.17
Nodes (17): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, loadPart() (+9 more)

### Community 104 - "Preview"
Cohesion: 0.14
Nodes (4): GraphLabels, hidden(), Preview, PreviewCallbacks

### Community 106 - ".render"
Cohesion: 0.13
Nodes (13): BOARD_PALETTES, BoardTheme, inkName(), mid(), outlineSvg(), PEN_SIZE, shapeSvg(), strokeOptions() (+5 more)

### Community 107 - "explainPanel.ts"
Cohesion: 0.07
Nodes (43): 4. Più modelli per «Spiegami», @mlc-ai/web-llm, ExplainTone, FollowUp, REPLY_TOKENS, chat(), GlifoError, Gpu (+35 more)

### Community 108 - "xlsx.ts"
Cohesion: 0.11
Nodes (35): RFC-4180, fflate, csvDelimiter(), csvToSheet(), field(), italian(), parseCsv(), sheetToCsv() (+27 more)

### Community 110 - "spiegami-qwen.mjs"
Cohesion: 0.29
Nodes (4): vite, minutes, postMessage(), started

### Community 113 - "graph.ts"
Cohesion: 0.06
Nodes (35): @maxgraph/core, AT_X, cellHtml(), cellText(), COMPASS, createGraph(), drawSchema(), insertSchema() (+27 more)

### Community 116 - "Il database degli account (Supabase)"
Cohesion: 0.15
Nodes (12): Accesso con Google, Cambiare il database, Cosa c'è, Eliminare l'account, Il controllo anti-robot (CAPTCHA, ottobre 2026), Il database degli account (Supabase), Il progetto, Il trasloco su glifo.page (ottobre 2026) (+4 more)

### Community 117 - "Glifo – note per Claude"
Cohesion: 0.15
Nodes (12): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Promemoria per lo studente, Regole (+4 more)

### Community 118 - "ExplainPanel"
Cohesion: 0.14
Nodes (6): MathRegion, inClaudeViewer(), ExplainChat, ExplainPanel, preventFocusSteal(), setup()

### Community 119 - "conics.ts"
Cohesion: 0.18
Nodes (29): at(), centralCanonical(), Coefficients, coneCanonical(), ConicElements, ConicInfo, conicOf(), det2() (+21 more)

### Community 120 - "schema/templates.ts"
Cohesion: 0.11
Nodes (17): DEFAULT_EDGE, SchemaEdge, SchemaNode, SHAPE_SIZE, tableHeight(), tableMetrics(), conceptMap, cycle (+9 more)

### Community 121 - "files.ts"
Cohesion: 0.13
Nodes (22): loadDialect(), base64(), crc32(), svgSize(), svgToPng(), withDensity(), canWriteFilesDirectly(), downloadBlob() (+14 more)

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "board.ts"
Cohesion: 0.06
Nodes (51): Action, ACTION_NAMES, DOT_SIZES, EraserMode, HANDLE_REACH, ICON, MODE_NAMES, PanAction (+43 more)

### Community 124 - "Sheet"
Cohesion: 0.08
Nodes (27): ExactComplexScope, Ode, withWorkLimit(), FiniteContext, FormattedResult, Mat, differentialRequest, pieces() (+19 more)

### Community 125 - "sql.ts"
Cohesion: 0.16
Nodes (18): @electric-sql/pglite, Column, DEFAULT_TYPE, findForeignKeys(), ForeignKey, identFrom(), primaryKey(), quote() (+10 more)

### Community 126 - "SheetModel"
Cohesion: 0.38
Nodes (4): SheetEditorOptions, Snapshot, SheetModel, XlsxSheet

### Community 127 - "grafo-html.mjs"
Cohesion: 0.17
Nodes (5): graphFile, names, namesFile, root, PNG_ICONS

### Community 128 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 129 - "graph/file.ts"
Cohesion: 0.09
Nodes (36): figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsFromFile(), OPEN, swatchSvg(), titleBand() (+28 more)

### Community 131 - "schemaBlocks.ts"
Cohesion: 0.11
Nodes (19): InsertOptions, toggleLinePrefix(), besideSchema(), BlockWidget, findWidgetBlocks(), guardBlocks(), KINDS, schemaBlockRanges() (+11 more)

### Community 132 - "MarkdownEditor"
Cohesion: 0.17
Nodes (5): @codemirror/commands, EditorCallbacks, MarkdownEditor, insertTemplate(), setup()

### Community 136 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 139 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 140 - "vitest"
Cohesion: 0.06
Nodes (31): vitest, GraphItem, parseGraph(), parseMath(), item(), light, result(), text() (+23 more)

### Community 141 - "I modelli e le chiavi API"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), In prova sul ramo `prova` (7 ottobre 2026): Qwen3 nel browser per «Spiegami», Le idee dello studente (5 ottobre 2026)

### Community 142 - "FoldersStore"
Cohesion: 0.07
Nodes (20): cleanFolderName(), Folder, FOLDER_NAME_MAX, FolderGroup, FoldersStore, groupByFolder(), loadClosedFolders(), RemoteFolder (+12 more)

### Community 143 - "misc.ts"
Cohesion: 0.40
Nodes (4): ch, chemistry, m, misc

### Community 144 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, @electric-sql/pglite, fake-indexeddb, jsdom, playwright-core, @types/markdown-it-footnote, typescript, vite (+2 more)

### Community 145 - "BoardStore"
Cohesion: 0.08
Nodes (14): BoardStore, MemoryBoards, applyAccountChange(), backup(), BackupNote, backupNotes(), restoreBackup(), RestoreBoards (+6 more)

## Knowledge Gaps
- **699 isolated node(s):** `Comandi`, `Regole`, `6. Glifo anche in inglese`, `La grafica: account, impostazioni, commenti, AI e lingua (chiesto il 10 ottobre 2026, se ne parla)`, `Account: i propri appunti su ogni dispositivo, anche da condividere` (+694 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 980 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **35 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dove sono le cose` connect `Dove sono le cose` to `touchlog.ts`, `graph/file.ts`, `main.ts`, `schemaBlocks.ts`, `MarkdownEditor`, `spec.ts`, `view3d.ts`, `compile`, `graph/preview.ts`, `parse.ts`, `plan.ts`, `primitive.ts`, `svg.ts`, `vitest`, `SchemaEditor`, `Board`, `SheetEditor`, `BoardStore`, `editor/editor.ts`, `toLatex`, `numerical.ts`, `topics.ts`, `.renderFormat`, `MathError`, `assistant.ts`, `SheetEvaluator`, `gantt.ts`, `markdown.ts`, `ui/preview.ts`, `logic.ts`, `strokes.ts`, `complex.ts`, `namesIn`, `tutorial.ts`, `several.ts`, `solve.ts`, `functions.ts`, `latex.ts`, `src/relocation.ts`, `Pt`, `Rational`, `board/shapes.ts`, `NotesStore`, `sidePanel.ts`, `supabase.ts`, `num`, `study.ts`, `h`, `spreadsheet/editor.ts`, `blockMove.ts`, `smoke-test.mjs`, `toolbar.ts`, `symbolic.ts`, `schema/editor.ts`, `distributions.ts`, `calcResults.ts`, `sheet.ts`, `linsys.ts`, `siteUpdate.ts`, `Preview`, `.render`, `explainPanel.ts`, `xlsx.ts`, `graph.ts`, `ExplainPanel`, `conics.ts`, `files.ts`, `board.ts`, `Sheet`?**
  _High betweenness centrality (0.192) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `touchlog.ts`, `graph/file.ts`, `parse.ts`, `compile`, `MarkdownEditor`, `schemaBlocks.ts`, `view3d.ts`, `Dove sono le cose`, `plan.ts`, `editor/lists.ts`, `svg.ts`, `parseSchema`, `FoldersStore`, `editor/editor.ts`, `BoardStore`, `topics.ts`, `store.ts`, `MathError`, `markers.ts`, `assistant.ts`, `package.json`, `SheetEvaluator`, `gantt.ts`, `markdown.ts`, `ui/preview.ts`, `spell.test.ts`, `strokes.ts`, `resize.ts`, `tutorial.ts`, `src/relocation.ts`, `Rational`, `board/shapes.ts`, `NotesStore`, `sidePanel.ts`, `supabase.ts`, `aiActivity.ts`, `captcha.ts`, `database.ts`, `num`, `h`, `spreadsheet/editor.ts`, `blockMove.ts`, `schema/editor.ts`, `distributions.ts`, `page.ts`, `linsys.ts`, `search.ts`, `siteUpdate.ts`, `.render`, `explainPanel.ts`, `xlsx.ts`, `board.ts`, `Sheet`, `sql.ts`?**
  _High betweenness centrality (0.103) - this node is a cross-community bridge._
- **Why does `h()` connect `h` to `main.ts`, `graph/preview.ts`, `SchemaEditor`, `Board`, `FoldersStore`, `SheetEditor`, `topics.ts`, `.renderFormat`, `gantt.ts`, `ui/preview.ts`, `spell.test.ts`, `resize.ts`, `tutorial.ts`, `src/relocation.ts`, `sidePanel.ts`, `spellcheck`, `spreadsheet/editor.ts`, `toolbar.ts`, `schema/editor.ts`, `page.ts`, `Preview`, `explainPanel.ts`, `ExplainPanel`, `files.ts`, `board.ts`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **Are the 285 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `adoptGuestNotes()`) actually correct?**
  _`Dove sono le cose` has 285 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Comandi`, `Regole`, `6. Glifo anche in inglese` to the rest of the system?**
  _699 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `touchlog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08653061224489796 - nodes in this community are weakly interconnected._
- **Should `parse.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07292929292929293 - nodes in this community are weakly interconnected._