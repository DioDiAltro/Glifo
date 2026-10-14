# Graph Report - Glifo  (2026-10-14)

## Corpus Check
- 346 files · ~721,787 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .css 1)

## Summary
- 5559 nodes · 20330 edges · 159 communities (118 shown, 41 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 683 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8b1231e2`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- rich
- markdown.ts
- main.ts
- compile
- sync.ts
- spec.ts
- src/relocation.ts
- num
- graph/preview.ts
- Dove sono le cose
- probability.ts
- ui/relocation.ts
- vitest
- i18n.ts
- SchemaEditor
- editor/editor.ts
- SheetEditor
- NotesStore
- MathError
- arithmetic.ts
- index.ts
- engine.ts
- schema/editor.ts
- noteWordsMath.test.ts
- BoardStore
- parse.ts
- board.ts
- ui/preview.ts
- markers.ts
- several.ts
- gantt.ts
- toLatex
- numerical.test.ts
- sidePanel.ts
- logic.ts
- Rational
- complex.ts
- openSettingsDialog
- translations.test.ts
- resize.ts
- view3d.ts
- restore.ts
- explainPanel.ts
- escapeHtml
- functions.ts
- linear.ts
- topics.ts
- Pt
- suggestions.ts
- board/shapes.ts
- toolbar.ts
- SidePanel
- aiPanel.test.ts
- FoldersStore
- page.ts
- usesDecimalComma
- 20261004091555_note_condivise.sql
- notes.ts
- sync.test.ts
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
- openShareDialog
- vite
- symbolic.ts
- AccountSync
- Le quattro modalità
- 20260930141840_note_cartelle_impostazioni.sql
- session-start.sh
- .claude/CLAUDE.md
- Il database degli account (Supabase)
- tutorial.mjs
- Abbonamenti
- supabase-stub.sql
- account-test.mjs
- schema/blocks.ts
- folders.ts
- In programma
- symbolsEn.test.ts
- siteUpdate.ts
- spellcheck.ts
- schema/shapes.ts
- Glifo
- supabase.ts
- calcResults.ts
- spreadsheetEn.test.ts
- Le spiegazioni, come funzionano
- strokes.ts
- Sheet
- texts
- createFakeSupabase
- Piano per piano
- pick
- Board
- 20261008130026_commenti.sql
- MarkdownEditor
- xlsx.ts
- editor/lists.ts
- feedback.ts
- settingsSections.test.ts
- smoke-test.mjs
- L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota
- Glifo – note per Claude
- files.ts
- captcha.ts
- LlamaWorker
- Costi
- schemaBlocks.ts
- La lavagna
- .constructor
- site.ts
- h
- solve.ts
- I modelli e le chiavi API
- MLCEngine

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
- `Attenzione a` --references--> `renderMarkdown()`  [INFERRED]
  CLAUDE.md → src/render/markdown.ts
- `Trasloco: il sito su Cloudflare, con un dominio tutto di Glifo` --references--> `dist()`  [INFERRED]
  ROADMAP.md → src/board/shapes.ts
- `WidgetKind` --references--> `Dove sono le cose`  [INFERRED]
  src/editor/schemaBlocks.ts → ARCHITETTURA.md
- `ConicElements` --references--> `Dove sono le cose`  [INFERRED]
  src/math/conics.ts → ARCHITETTURA.md
- `k()` --references--> `Funzionalità`  [INFERRED]
  src/math/numerical.ts → README.md

## Import Cycles
- 3-file cycle: `src/math/complex.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/complex.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`
- 4-file cycle: `src/math/evaluate.ts -> src/math/limits.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts`
- 5-file cycle: `src/math/complex.ts -> src/math/format.ts -> src/math/exact.ts -> src/math/evaluate.ts -> src/math/limits.ts -> src/math/complex.ts`

## Communities (159 total, 41 thin omitted)

### Community 0 - "rich"
Cohesion: 0.15
Nodes (13): rich(), messageOf(), openLoginDialog(), codeStep(), emailStep(), privacyLink(), aboutSection(), aiFieldset() (+5 more)

### Community 1 - "markdown.ts"
Cohesion: 0.04
Nodes (96): @codemirror/view, FIGURE_PALETTE, figureName(), graphFigure(), graphImage(), graphImagesFor(), graphsForFile(), graphsFromFile() (+88 more)

### Community 2 - "main.ts"
Cohesion: 0.04
Nodes (117): addToGraphBlock(), remapGraphLines(), remapLineKeys(), account, ACCOUNT_OFF, accountButton, active, aiShown() (+109 more)

### Community 3 - "compile"
Cohesion: 0.04
Nodes (132): bodyField(), calculusDims(), calculusItems(), compiledField(), COORDS, defaultRange(), definitionLabel(), fieldCall() (+124 more)

### Community 4 - "sync.ts"
Cohesion: 0.07
Nodes (29): withLock(), Account, EMPTY_STATE, FolderChange, FolderRow, isEmpty(), iso(), LocalChange (+21 more)

### Community 5 - "spec.ts"
Cohesion: 0.04
Nodes (113): formulaAtCursor(), GraphLabelLines, insertGraphBlock(), LABEL_KEYS, setGraphLabels(), conicItems(), isConicLine(), quadricEquation() (+105 more)

### Community 6 - "src/relocation.ts"
Cohesion: 0.08
Nodes (58): accountSpace(), adoptGuestNotes(), currentAccount(), forgetAccount(), guestNoteCount(), isWelcome(), knowsAccount(), prefixOf() (+50 more)

### Community 7 - "num"
Cohesion: 0.13
Nodes (87): atIntegers(), polyEx(), homogeneousGroups(), shapeValue(), similarSolution(), squareRoot(), yPowers(), algebraic() (+79 more)

### Community 8 - "graph/preview.ts"
Cohesion: 0.06
Nodes (43): addLabel(), boxes, cameras, complexCoord(), coord(), coordinates(), drawings, drawnViews (+35 more)

### Community 9 - "Dove sono le cose"
Cohesion: 0.05
Nodes (80): 1. A cosa serve l'AI dei modelli di frontiera, Dove sono le cose, Glifo – architettura, allNames(), answerFollowUp(), bareResult(), chained(), chatContext (+72 more)

### Community 10 - "probability.ts"
Cohesion: 0.07
Nodes (41): End, expSum, Family, Interval, CompileOptions, bigGcd(), binomExact(), conditionExact() (+33 more)

### Community 11 - "ui/relocation.ts"
Cohesion: 0.14
Nodes (20): moveDayLabel(), relocationMessage(), RelocationResult, BOX, glyph(), LOGO_COLOR, logoIcon(), logoMark() (+12 more)

### Community 12 - "vitest"
Cohesion: 0.05
Nodes (92): vitest, contourLevels(), equilibria(), phaseTrajectory(), solutionCurves(), staticGraphSvg(), chooseWindow(), chooseY() (+84 more)

### Community 13 - "i18n.ts"
Cohesion: 0.11
Nodes (30): DownloadedModel, Gpu, gpuF16(), MODEL_LICENSES, ModelGroup, browserLang(), browserLanguages(), dateLocale() (+22 more)

### Community 14 - "SchemaEditor"
Cohesion: 0.06
Nodes (34): fieldInput(), isLanes(), SchemaEditor, withLaneContents(), AT_X, cellHtml(), cellText(), COMPASS (+26 more)

### Community 15 - "editor/editor.ts"
Cohesion: 0.04
Nodes (67): description, name, private, type, version, @codemirror/autocomplete, @codemirror/language-data, @codemirror/search (+59 more)

### Community 16 - "SheetEditor"
Cohesion: 0.08
Nodes (7): functionLabel(), SheetEditor, englishTyping(), serializeSheet(), sheetSize(), CellRange, cloneSheet()

### Community 17 - "NotesStore"
Cohesion: 0.13
Nodes (12): createdAtFromId(), deriveTitle(), NotesStore, forgetOldKeys(), hasLocalStorage(), memory, migrateKeyPrefix(), OLD_KEYS (+4 more)

### Community 18 - "MathError"
Cohesion: 0.11
Nodes (53): isNumericalLine(), numericalItems(), MathError, FormatOptions, bisection(), cholesky(), condition(), derivative() (+45 more)

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
Nodes (121): @electric-sql/pglite, alignBoxes(), Alignment, Box, distributeBoxes(), Position, ALIGN, ALIGN_NAMES (+113 more)

### Community 23 - "noteWordsMath.test.ts"
Cohesion: 0.11
Nodes (16): AstNode, childrenOf(), DATA, ENGLISH, englishTexts(), FUNCTIONS, inBothLanguages(), isNode() (+8 more)

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
Cohesion: 0.07
Nodes (32): GraphLabels, renameGraphScope(), renameScopeKeys(), BlockKind, Look, Theme, draw(), drawCached() (+24 more)

### Community 28 - "markers.ts"
Cohesion: 0.19
Nodes (20): bullet(), childMarker(), column(), firstMarker(), label(), lettersMarker(), MarkerKind, MarkerStyle (+12 more)

### Community 29 - "several.ts"
Cohesion: 0.06
Nodes (77): criticalLine(), named(), severalItems(), surface(), T, close(), Definite, definiteIntegral() (+69 more)

### Community 30 - "gantt.ts"
Cohesion: 0.04
Nodes (103): searchPhrases(), amount(), barColor(), crossings(), dateText(), dayMonth(), dayOf(), fitText() (+95 more)

### Community 31 - "toLatex"
Cohesion: 0.06
Nodes (75): fourierItems(), T, names(), STUDY_GRAPH, studyItems(), T, partialSum(), ACCENT_COMMANDS (+67 more)

### Community 32 - "numerical.test.ts"
Cohesion: 0.60
Nodes (3): result(), text(), verdict()

### Community 33 - "sidePanel.ts"
Cohesion: 0.08
Nodes (38): @anthropic-ai/sdk, AiAnswer, AiError, AiResult, AiSettings, answerSchema(), askAi(), askCompatible() (+30 more)

### Community 34 - "logic.ts"
Cohesion: 0.11
Nodes (30): BinOp, braced(), cell(), CHARS, COMMANDS, Formula, GREEK, LEVEL (+22 more)

### Community 35 - "Rational"
Cohesion: 0.09
Nodes (52): factorsOf(), Part, Rational, choices(), exText(), gcd(), matrixEquation(), matrixSystem() (+44 more)

### Community 36 - "complex.ts"
Cohesion: 0.06
Nodes (67): COMPLEX_FUNCTIONS, farthest(), gaussItem(), GaussLine, hasExponential(), inZ(), isComplexValue(), isInequality() (+59 more)

### Community 37 - "openSettingsDialog"
Cohesion: 0.13
Nodes (10): DEFAULT_SETTINGS, onPhone(), openSettingsDialog(), select(), Section, account(), dataHelp(), notes() (+2 more)

### Community 38 - "translations.test.ts"
Cohesion: 0.17
Nodes (18): AstNode, calleeName(), check(), checkPair(), visit(), children(), entryPairs(), files (+10 more)

### Community 39 - "resize.ts"
Cohesion: 0.12
Nodes (24): resizer, EDITOR_SHARE, LAYOUT_KEY, loadPaneSizes(), NOTES_WIDTH, PANE_LIMITS, PaneSizes, savePaneSizes() (+16 more)

### Community 40 - "view3d.ts"
Cohesion: 0.06
Nodes (87): LayeredSolid, addMesh(), addTet(), affinePlane(), Axis, Box, centroid(), clipBy() (+79 more)

### Community 41 - "restore.ts"
Cohesion: 0.22
Nodes (10): BackupNote, backupNotes(), restoreBackup(), RestoreBoards, Restored, restoredMessage(), T, time() (+2 more)

### Community 42 - "explainPanel.ts"
Cohesion: 0.06
Nodes (53): @mlc-ai/web-llm, chat(), GlifoError, Gpu, load(), post(), remove(), scope (+45 more)

### Community 43 - "escapeHtml"
Cohesion: 0.16
Nodes (16): valueNode(), NoteSubject, texHtml(), checkHtml(), checkTitle(), T, escapeHtml(), renderTex() (+8 more)

### Community 44 - "functions.ts"
Cohesion: 0.07
Nodes (65): EMPTY, evaluateSheet(), number(), SheetEvaluator, T, addFormat(), divFormat(), GENERAL (+57 more)

### Community 45 - "linear.ts"
Cohesion: 0.06
Nodes (68): angleBetween(), asMatrix(), basisOf(), characteristicPolynomial(), circleText(), cross(), Ctx, determinant() (+60 more)

### Community 46 - "topics.ts"
Cohesion: 0.19
Nodes (20): ATTRIBUTES, cut(), ER_SHAPES, fieldText(), fitLines(), flowOrder(), formulaText(), FREE_NAMES (+12 more)

### Community 47 - "Pt"
Cohesion: 0.13
Nodes (13): clampZoom(), coalesced(), Finger, LassoAction, MoveAction, PanAction, PinchAction, pointsOf() (+5 more)

### Community 48 - "suggestions.ts"
Cohesion: 0.14
Nodes (13): EditorMathContext, expand(), preferredIndex(), SuggestionController, SuggestionItem, cardPreviewTex(), formPreviewTex(), ParsedTemplate (+5 more)

### Community 49 - "board/shapes.ts"
Cohesion: 0.14
Nodes (34): adjustShape(), alignPolygon(), angleOf(), arrowOf(), centroid(), closedShape(), corners(), dist() (+26 more)

### Community 50 - "toolbar.ts"
Cohesion: 0.17
Nodes (16): insertBlock(), wrapSelection(), ListStyleId, Action, createToolbar(), insertCode(), insertLink(), listStyle() (+8 more)

### Community 51 - "SidePanel"
Cohesion: 0.18
Nodes (7): localizeTex(), cleanKatexError(), cardPreview(), displayCode(), formPreview(), preventFocusSteal(), SidePanel

### Community 52 - "aiPanel.test.ts"
Cohesion: 0.07
Nodes (35): ExplainTone, Explanation, FollowUp, REPLY_TOKENS, definedName(), formulaTopic(), graphTopic(), studyOf() (+27 more)

### Community 53 - "FoldersStore"
Cohesion: 0.15
Nodes (5): cleanFolderName(), FoldersStore, sameName(), newId(), names()

### Community 54 - "page.ts"
Cohesion: 0.10
Nodes (28): accountDataFile(), PullResult, isShareToken(), parseSharedNote(), readSharedNote(), SHARE_PAGE, SharedNote, ShareReadError (+20 more)

### Community 55 - "usesDecimalComma"
Cohesion: 0.04
Nodes (93): numberText(), number(), endTex(), figureText(), linearItem(), classes(), dataOf(), distributionExtent() (+85 more)

### Community 56 - "20261004091555_note_condivise.sql"
Cohesion: 0.15
Nodes (6): after_delete_unshare, private.read_shared_note(), private.share_own_note(), public.shared_links(), public.shared_notes, shared_notes_owner

### Community 57 - "notes.ts"
Cohesion: 0.13
Nodes (9): Deletion, DeletionLog, isUuid(), Note, RemoteNote, StoreOptions, T, writeJson() (+1 more)

### Community 58 - "sync.test.ts"
Cohesion: 0.19
Nodes (8): callAs(), createDatabase(), createUser(), databaseTests(), feedbackTests(), migrations, shareTests(), device()

### Community 59 - "finite.ts"
Cohesion: 0.17
Nodes (28): countOf(), Elem, elemOf(), elemTex(), elemText(), EMPTY, expandDots(), FiniteError (+20 more)

### Community 60 - "ExplainPanel"
Cohesion: 0.15
Nodes (5): explanationMarkdown(), ExplainChat, ExplainPanel, preventFocusSteal(), formulasSummary()

### Community 61 - "dependencies"
Cohesion: 0.04
Nodes (44): dependencies, @anthropic-ai/sdk, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-markdown, @codemirror/language, @codemirror/language-data, @codemirror/search (+36 more)

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
Nodes (56): OdeFunction, expSumValue(), dataOf(), Lin, statisticOf(), NUMERICAL, bracketParts(), BRACKETS (+48 more)

### Community 67 - "render/lists.ts"
Cohesion: 0.23
Nodes (15): Item, ListStyle, bulletGroup(), ListLine, Marker, sameList(), alignInside(), asciiTrim() (+7 more)

### Community 68 - "blockMove.ts"
Cohesion: 0.10
Nodes (37): @codemirror/commands, blockMoved, blockMoves(), blockMoveTransaction(), LineMap, blank(), BlockMove, blockPlace() (+29 more)

### Community 69 - "Benvenuto in Glifo"
Cohesion: 0.20
Nodes (9): Anche per programmare, Benvenuto in Glifo, Calcoli e grafici, Come si scrivono le formule, Controllo ortografico, Elenchi, Prova subito, Qualche esempio (+1 more)

### Community 70 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch, noImplicitOverride (+9 more)

### Community 71 - "relocation-test.mjs"
Cohesion: 0.18
Nodes (7): AFTER_MOVE, ids, newBrowser(), NOTICE_DAY, out, serve(), TYPES

### Community 72 - "openShareDialog"
Cohesion: 0.19
Nodes (14): openShareDialog(), changeAccess(), changeCopy(), copy(), refreshChanged(), render(), run(), setStatus() (+6 more)

### Community 73 - "vite"
Cohesion: 0.33
Nodes (4): vite, minutes, postMessage(), started

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
Cohesion: 0.20
Nodes (9): Cambiare il database, Cosa c'è, Eliminare l'account, Il database degli account (Supabase), Il progetto, Note condivise con un link, Sincronizzazione, `sync_pull({ since })`: scarica le novità (+1 more)

### Community 83 - "tutorial.mjs"
Cohesion: 0.11
Nodes (11): graphFile, names, namesFile, root, centerOf(), clickOn(), ffmpeg, SCENES (+3 more)

### Community 90 - "Abbonamenti"
Cohesion: 0.14
Nodes (14): Abbonamenti, Com'è andata la discussione, Come si decide cosa far pagare, Cosa fare, in ordine, Da approfondire, Deciso, Fonti (controllate il 4 ottobre 2026), I prezzi (+6 more)

### Community 96 - "account-test.mjs"
Cohesion: 0.11
Nodes (10): device(), login(), newContext, waitFor(), b64(), CAPTCHA_TOKEN, CODE, GOOGLE_CODE (+2 more)

### Community 97 - "schema/blocks.ts"
Cohesion: 0.10
Nodes (27): markdownForFile(), placeChart(), tableChartKind(), blockWord(), findFencedBlocks(), findSchemaBlocks(), OpenFence, schemaBlockAtLine() (+19 more)

### Community 98 - "folders.ts"
Cohesion: 0.15
Nodes (12): Folder, FOLDER_NAME_MAX, FolderGroup, groupByFolder(), loadClosedFolders(), RemoteFolder, saveClosedFolders(), NoteMeta (+4 more)

### Community 100 - "In programma"
Cohesion: 0.25
Nodes (8): Account: i propri appunti su ogni dispositivo, anche da condividere, Idee per il futuro, In programma, L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota (14 ottobre 2026, se ne parla), La lavagna: idee in più, Più avanti, Schemi: idee in più, Trasloco: il sito su Cloudflare, con un dominio tutto di Glifo

### Community 102 - "symbolsEn.test.ts"
Cohesion: 0.10
Nodes (42): editDistance(), normalizeText(), singular(), stem(), STOPWORDS, words(), BOTH, buildIndex() (+34 more)

### Community 103 - "siteUpdate.ts"
Cohesion: 0.16
Nodes (18): checkSite(), current, entryScripts(), failureNotice(), hooks, isNewVersion(), LoadFailure, loadPart() (+10 more)

### Community 107 - "spellcheck.ts"
Cohesion: 0.08
Nodes (24): @codemirror/lang-markdown, misspelledMark, refreshSpelling, setTarget, SKIP, spellcheck(), close(), misspelledAt() (+16 more)

### Community 113 - "schema/shapes.ts"
Cohesion: 0.08
Nodes (17): @maxgraph/core, ArrowShape, DocumentShape, DOT_PERIMETER, dotPerimeter(), dotRadius(), DotShape, DoubleArrowShape (+9 more)

### Community 116 - "Glifo"
Cohesion: 0.12
Nodes (16): Account, Aggiungere un simbolo, Assistente AI, Com'è fatto, Come viene pubblicata, Compatibilità con VS Code, Condividere una nota con un link, Domande frequenti e commenti (+8 more)

### Community 117 - "supabase.ts"
Cohesion: 0.08
Nodes (46): @supabase/supabase-js, AUTH_STORAGE_KEY, setCurrentAccount(), accountError, appUrl(), call(), currentSession(), deleteAccount() (+38 more)

### Community 120 - "calcResults.ts"
Cohesion: 0.07
Nodes (43): @codemirror/language, @codemirror/state, @lezer/common, explainTarget, schemaTitle(), acceptCalcResult(), CalcCheck, calcOutcomes() (+35 more)

### Community 121 - "spreadsheetEn.test.ts"
Cohesion: 0.08
Nodes (56): valueText(), sheetSummary(), csvCell(), openSheetEditor(), booleanText(), ENGLISH, englishNumber(), errorText() (+48 more)

### Community 122 - "Le spiegazioni, come funzionano"
Cohesion: 0.29
Nodes (7): Come si costruisce (per dopo), Cosa succede dietro, Cosa vede chi studia, Le spiegazioni, come funzionano, Nei piani, Quando basta il motore, e quando serve l'AI, Quello che il controllo non copre

### Community 123 - "strokes.ts"
Cohesion: 0.08
Nodes (38): centerOn(), copyStrokes(), cross(), handleScale(), IDENTITY, insideLasso(), keepInside(), LASSO_SHARE (+30 more)

### Community 124 - "Sheet"
Cohesion: 0.07
Nodes (34): Definition, Line, ExactComplexScope, Ode, withWorkLimit(), FiniteContext, FormattedResult, Mat (+26 more)

### Community 125 - "texts"
Cohesion: 0.08
Nodes (35): lang, texts, openSignedOut(), printButton(), ShareDialogDeps, T, AccountButton, confirmAccountDeletion() (+27 more)

### Community 128 - "createFakeSupabase"
Cohesion: 0.57
Nodes (7): createFakeSupabase(), actAs(), handle(), rpc(), session(), userFor(), userIdFrom()

### Community 132 - "Piano per piano"
Cohesion: 0.33
Nodes (6): Classico, gratis: per scrivere e controllare, Mai a pagamento, in nessun piano, Piano per piano, Quando l'abbonamento finisce, Quantistico: per la tesi e la ricerca, Relativistico: per studiare

### Community 133 - "pick"
Cohesion: 0.26
Nodes (4): pick(), FormulaError, Parser, errorName()

### Community 137 - "20261008130026_commenti.sql"
Cohesion: 0.60
Nodes (3): feedback_created, feedback_limit, public.feedback

### Community 140 - "MarkdownEditor"
Cohesion: 0.17
Nodes (5): closeMathBlockOnEnter(), EditorCallbacks, MarkdownEditor, insertTemplate(), setup()

### Community 141 - "xlsx.ts"
Cohesion: 0.09
Nodes (46): fflate, BinOp, COMPARE, englishFormula(), ERRORS_BY_LENGTH, formulaBody(), formulaRefs(), isFormula() (+38 more)

### Community 142 - "editor/lists.ts"
Cohesion: 0.17
Nodes (32): applyListStyle(), continueList(), deleteListMarker(), endEmptyItem(), followingSiblings(), indentListItems(), indentOf(), inListContext() (+24 more)

### Community 143 - "feedback.ts"
Cohesion: 0.08
Nodes (43): SUPABASE_KEY, SUPABASE_URL, NEW_ORIGIN, Site, commentDate(), commentItem(), COMMENTS_MAX, CommentsDeps (+35 more)

### Community 144 - "settingsSections.test.ts"
Cohesion: 0.11
Nodes (11): SyncStatus, accountSection(), AccountSectionDeps, License, licenseOf(), LICENSES, T, SettingsSection (+3 more)

### Community 146 - "smoke-test.mjs"
Cohesion: 0.15
Nodes (6): markdown-it, playwright-core, PNG_ICONS, fakeLlmWorker(), firstVisit(), plainContext

### Community 154 - "L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota"
Cohesion: 0.25
Nodes (8): 2. Dalla lavagna alla nota, 3. Da una foto alla nota, 4. Dettare: la voce diventa testo nella nota, 5. Registrare le lezioni e trascriverle, Da sistemare con il primo punto che tocca l'AI, Fonti (controllate il 14 ottobre 2026), In che ordine, L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota

### Community 156 - "Glifo – note per Claude"
Cohesion: 0.25
Nodes (8): Attenzione a, Comandi, Come controllare il lavoro, Dove sono le cose, Glifo – note per Claude, graphify, Regole, sqlite()

### Community 157 - "files.ts"
Cohesion: 0.17
Nodes (18): inClaudeViewer(), loadDialect(), canWriteFilesDirectly(), downloadBlob(), downloadText(), fileNameFor(), FsWindow, isAbort() (+10 more)

### Community 158 - "captcha.ts"
Cohesion: 0.15
Nodes (12): captchaToken(), loadTurnstile(), Turnstile, TURNSTILE_SCRIPT, Window, TURNSTILE_SITE_KEY, accountFailure(), Accesso con Google (+4 more)

### Community 160 - "LlamaWorker"
Cohesion: 0.23
Nodes (6): Promemoria per lo studente, Commenti di chi prova Glifo, constructor(), LlamaWorker, Commenti di chi prova Glifo, kind()

### Community 161 - "Costi"
Cohesion: 0.33
Nodes (6): Attivato, Costi, Da attivare solo quando lo dice lo studente, Gratis anche quando Glifo sarà aperto a tutti, Oggi: tutto gratis, tranne il dominio, Quando lo studente dice di cominciare

### Community 162 - "schemaBlocks.ts"
Cohesion: 0.09
Nodes (23): InsertOptions, toggleLinePrefix(), LIST_STYLES, besideSchema(), BlockWidget, findWidgetBlocks(), guardBlocks(), KINDS (+15 more)

### Community 163 - "La lavagna"
Cohesion: 0.40
Nodes (5): Deciso (5 ottobre 2026), Dopo, L'idea dello studente (5 ottobre 2026), La lavagna, La lavagna base (fatta e pubblicata il 5 ottobre 2026)

### Community 169 - "site.ts"
Cohesion: 0.22
Nodes (6): vite-plugin-pwa, accountOffMessage(), T, defineFor(), MAIN_BRANCH, webllmModels

### Community 171 - "h"
Cohesion: 0.14
Nodes (20): viewSwitch, append(), h(), copyLink(), FaqGroup, faqGroups(), FaqQuestion, faqSection (+12 more)

### Community 173 - "solve.ts"
Cohesion: 0.05
Nodes (77): fracTex(), fracText(), gcdInt(), nearFraction(), piMultiple(), surd(), decimalSeparator(), Digits (+69 more)

### Community 179 - "I modelli e le chiavi API"
Cohesion: 0.29
Nodes (7): Deciso (5 ottobre 2026), Deciso (5 ottobre 2026), I modelli e le chiavi API, Il parere di Claude (niente di deciso), In prova sul ramo `prova` (7 ottobre 2026): Qwen3 nel browser per «Spiegami», La chiave, il server locale e la scelta del modello (14 ottobre 2026), Le idee dello studente (5 ottobre 2026)

## Knowledge Gaps
- **874 isolated node(s):** `Comandi`, `Regole`, `L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota (14 ottobre 2026, se ne parla)`, `Account: i propri appunti su ogni dispositivo, anche da condividere`, `La lavagna: idee in più` (+869 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1194 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **41 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `texts` connect `texts` to `markdown.ts`, `main.ts`, `compile`, `spec.ts`, `pick`, `src/relocation.ts`, `graph/preview.ts`, `Dove sono le cose`, `probability.ts`, `ui/relocation.ts`, `vitest`, `i18n.ts`, `editor/lists.ts`, `editor/editor.ts`, `xlsx.ts`, `feedback.ts`, `MathError`, `arithmetic.ts`, `index.ts`, `settingsSections.test.ts`, `schema/editor.ts`, `parse.ts`, `board.ts`, `ui/preview.ts`, `Glifo – note per Claude`, `several.ts`, `gantt.ts`, `toLatex`, `files.ts`, `sidePanel.ts`, `schemaBlocks.ts`, `Rational`, `complex.ts`, `logic.ts`, `resize.ts`, `site.ts`, `explainPanel.ts`, `escapeHtml`, `functions.ts`, `linear.ts`, `topics.ts`, `solve.ts`, `restore.ts`, `h`, `toolbar.ts`, `aiPanel.test.ts`, `page.ts`, `usesDecimalComma`, `notes.ts`, `finite.ts`, `spreadsheet/editor.ts`, `conics.ts`, `odesolve.ts`, `sheet.ts`, `symbolic.ts`, `schema/blocks.ts`, `folders.ts`, `siteUpdate.ts`, `spellcheck.ts`, `supabase.ts`, `calcResults.ts`, `spreadsheetEn.test.ts`?**
  _High betweenness centrality (0.163) - this node is a cross-community bridge._
- **Why does `Dove sono le cose` connect `Dove sono le cose` to `rich`, `markdown.ts`, `main.ts`, `compile`, `spec.ts`, `src/relocation.ts`, `num`, `Board`, `graph/preview.ts`, `probability.ts`, `ui/relocation.ts`, `MarkdownEditor`, `i18n.ts`, `vitest`, `SchemaEditor`, `SheetEditor`, `xlsx.ts`, `smoke-test.mjs`, `arithmetic.ts`, `MathError`, `NotesStore`, `schema/editor.ts`, `settingsSections.test.ts`, `BoardStore`, `parse.ts`, `board.ts`, `ui/preview.ts`, `files.ts`, `gantt.ts`, `toLatex`, `several.ts`, `sidePanel.ts`, `schemaBlocks.ts`, `Rational`, `complex.ts`, `logic.ts`, `view3d.ts`, `site.ts`, `explainPanel.ts`, `escapeHtml`, `functions.ts`, `solve.ts`, `topics.ts`, `Pt`, `linear.ts`, `board/shapes.ts`, `h`, `SidePanel`, `aiPanel.test.ts`, `toolbar.ts`, `usesDecimalComma`, `finite.ts`, `ExplainPanel`, `spreadsheet/editor.ts`, `conics.ts`, `odesolve.ts`, `sheet.ts`, `blockMove.ts`, `symbolic.ts`, `feedback.ts`, `tutorial.mjs`, `schema/blocks.ts`, `siteUpdate.ts`, `schema/shapes.ts`, `supabase.ts`, `calcResults.ts`, `spreadsheetEn.test.ts`, `strokes.ts`, `Sheet`, `texts`?**
  _High betweenness centrality (0.126) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `markdown.ts`, `compile`, `spec.ts`, `src/relocation.ts`, `num`, `Dove sono le cose`, `ui/relocation.ts`, `MarkdownEditor`, `i18n.ts`, `editor/lists.ts`, `editor/editor.ts`, `feedback.ts`, `settingsSections.test.ts`, `xlsx.ts`, `schema/editor.ts`, `noteWordsMath.test.ts`, `BoardStore`, `parse.ts`, `board.ts`, `ui/preview.ts`, `markers.ts`, `gantt.ts`, `captcha.ts`, `numerical.test.ts`, `sidePanel.ts`, `schemaBlocks.ts`, `Rational`, `openSettingsDialog`, `translations.test.ts`, `resize.ts`, `view3d.ts`, `restore.ts`, `explainPanel.ts`, `h`, `site.ts`, `linear.ts`, `suggestions.ts`, `board/shapes.ts`, `aiPanel.test.ts`, `page.ts`, `usesDecimalComma`, `notes.ts`, `sync.test.ts`, `spreadsheet/editor.ts`, `blockMove.ts`, `schema/blocks.ts`, `folders.ts`, `symbolsEn.test.ts`, `siteUpdate.ts`, `spellcheck.ts`, `supabase.ts`, `spreadsheetEn.test.ts`, `strokes.ts`, `Sheet`, `texts`?**
  _High betweenness centrality (0.069) - this node is a cross-community bridge._
- **Are the 323 inferred relationships involving `Dove sono le cose` (e.g. with `fakeLlmWorker()` and `tutorialModel()`) actually correct?**
  _`Dove sono le cose` has 323 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Comandi`, `Regole`, `L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota (14 ottobre 2026, se ne parla)` to the rest of the system?**
  _874 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `rich` be split into smaller, more focused modules?**
  _Cohesion score 0.14624505928853754 - nodes in this community are weakly interconnected._
- **Should `markdown.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.03824852890273451 - nodes in this community are weakly interconnected._