-- Test delle regole di accesso e della sincronizzazione (vedi supabase/migrations).
--
-- Si esegue nel database: SQL editor di Supabase, psql, oppure execute_sql dal connettore
-- Supabase. Tutto succede dentro un solo blocco che alla fine viene annullato: nel database
-- non resta niente, nemmeno gli utenti di prova. Se va tutto bene il blocco termina con
-- l'errore «TEST OK: N controlli» (è quello che annulla tutto); qualsiasi altro errore è un
-- test fallito, e il messaggio dice quale. Gli errori dei limiti di spazio hanno il
-- suggerimento (hint) «quota»: così li riconosce anche l'app.
do $test$
declare
  anna uuid := gen_random_uuid();
  bruno uuid := gen_random_uuid();
  analisi uuid := gen_random_uuid();
  fisica uuid := gen_random_uuid();
  cartella_bruno uuid := gen_random_uuid();
  limiti uuid := gen_random_uuid();
  moto uuid := gen_random_uuid();
  sparsa uuid := gen_random_uuid();
  grande uuid;
  r record;
  res jsonb;
  cnt bigint;
  used bigint;
  chunk bigint;
  err_hint text;
  checks int := 0;
begin
  insert into auth.users (id, email, aud, role)
  values (anna, 'anna@example.invalid', 'authenticated', 'authenticated'),
         (bruno, 'bruno@example.invalid', 'authenticated', 'authenticated');

  -- Anna scrive i suoi appunti ------------------------------------------------------------
  perform set_config('role', 'authenticated', true);
  perform set_config('request.jwt.claims', jsonb_build_object('sub', anna, 'role', 'authenticated')::text, true);

  insert into public.folders (id, name) values (analisi, 'Analisi 1');
  insert into public.notes (id, folder_id, title, content) values (limiti, analisi, 'Limiti', '# Limiti');
  select * into r from public.notes where id = limiti;
  assert r.owner_id = anna and r.revision = 1 and r.txid = pg_current_xact_id(),
    'una nota nuova è di chi la crea, con revisione 1 e la transazione che l''ha scritta';
  checks := checks + 1;

  update public.notes set title = 'Limiti notevoli', content = '# Limiti notevoli' where id = limiti;
  select * into r from public.notes where id = limiti;
  assert r.revision = 2 and r.content = '# Limiti notevoli', 'ogni modifica aumenta la revisione';
  checks := checks + 1;

  begin
    update public.notes set owner_id = bruno where id = limiti;
    raise exception 'FALLITO: si può regalare una nota a un altro account';
  exception when insufficient_privilege then checks := checks + 1;
  end;
  begin
    update public.notes set revision = 100 where id = limiti;
    raise exception 'FALLITO: il browser può scegliere la revisione';
  exception when insufficient_privilege then checks := checks + 1;
  end;
  begin
    insert into public.notes (owner_id, content) values (bruno, 'spam');
    raise exception 'FALLITO: si può creare una nota a nome di un altro';
  exception when insufficient_privilege then checks := checks + 1;
  end;
  begin
    delete from public.notes where id = limiti;
    raise exception 'FALLITO: dal browser si cancella davvero una nota';
  exception when insufficient_privilege then checks := checks + 1;
  end;

  insert into public.user_settings (settings, dictionary) values ('{"theme": "dark"}', '["Lagrangiana"]');
  begin
    update public.user_settings set settings = '{"theme": "dark", "apiKey": "sk-ant-prova"}';
    raise exception 'FALLITO: la chiave API finisce sul server';
  exception when check_violation then checks := checks + 1;
  end;

  -- Bruno non vede e non tocca niente di Anna -----------------------------------------------
  perform set_config('request.jwt.claims', jsonb_build_object('sub', bruno, 'role', 'authenticated')::text, true);

  select (select count(*) from public.notes) + (select count(*) from public.folders)
    + (select count(*) from public.user_settings) into cnt;
  assert cnt = 0, 'Bruno non vede note, cartelle e impostazioni di Anna';
  checks := checks + 1;

  update public.notes set content = 'preso!' where id = limiti;
  get diagnostics cnt = row_count;
  assert cnt = 0, 'Bruno non modifica le note di Anna';
  checks := checks + 1;
  update public.folders set name = 'preso!' where id = analisi;
  get diagnostics cnt = row_count;
  assert cnt = 0, 'Bruno non rinomina le cartelle di Anna';
  checks := checks + 1;
  update public.user_settings set settings = '{}' where user_id = anna;
  get diagnostics cnt = row_count;
  assert cnt = 0, 'Bruno non cambia le impostazioni di Anna';
  checks := checks + 1;

  begin
    insert into public.notes (folder_id, content) values (analisi, 'spam');
    raise exception 'FALLITO: si mette una nota nella cartella di un altro';
  exception when foreign_key_violation then checks := checks + 1;
  end;
  begin
    insert into public.notes (id, content) values (limiti, 'preso!');
    raise exception 'FALLITO: si riusa l''id della nota di un altro';
  exception when unique_violation then checks := checks + 1;
  end;

  res := public.sync_pull(null);
  assert res -> 'folders' = '[]' and res -> 'notes' = '[]' and res -> 'settings' = 'null',
    'sync_pull non dà a Bruno niente di Anna';
  checks := checks + 1;

  res := public.sync_push(jsonb_build_object(
    'folders', jsonb_build_array(jsonb_build_object('id', analisi, 'name', 'preso!')),
    'notes', jsonb_build_array(
      jsonb_build_object('id', limiti, 'content', 'preso!'),
      jsonb_build_object('id', limiti, 'base_revision', 2, 'content', 'preso!'),
      jsonb_build_object('id', sparsa, 'folder_id', analisi, 'content', 'di Bruno'))));
  assert res #>> '{folders,0,status}' = 'rejected' and res #> '{folders,0,row}' = 'null'
    and res #>> '{notes,0,status}' = 'rejected' and res #>> '{notes,1,status}' = 'rejected'
    and res #> '{notes,0,row}' = 'null',
    'sync_push rifiuta cartelle e note di un altro account, senza mostrarle';
  checks := checks + 1;
  assert res #>> '{notes,2,status}' = 'ok' and res #> '{notes,2,row,folder_id}' = 'null',
    'con sync_push una nota non entra nella cartella di un altro';
  checks := checks + 1;
  insert into public.folders (id, name) values (cartella_bruno, 'Di Bruno');

  -- Chi non ha fatto l'accesso ------------------------------------------------------------
  perform set_config('role', 'anon', true);
  perform set_config('request.jwt.claims', '{"role": "anon"}', true);
  begin
    perform 1 from public.notes;
    raise exception 'FALLITO: senza accesso si leggono le note';
  exception when insufficient_privilege then checks := checks + 1;
  end;
  begin
    perform 1 from public.folders;
    raise exception 'FALLITO: senza accesso si leggono le cartelle';
  exception when insufficient_privilege then checks := checks + 1;
  end;
  begin
    perform 1 from public.user_settings;
    raise exception 'FALLITO: senza accesso si leggono le impostazioni';
  exception when insufficient_privilege then checks := checks + 1;
  end;
  begin
    perform public.sync_pull(null);
    raise exception 'FALLITO: senza accesso si scaricano le note';
  exception when insufficient_privilege then checks := checks + 1;
  end;
  begin
    perform public.sync_push('{}');
    raise exception 'FALLITO: senza accesso si mandano modifiche';
  exception when insufficient_privilege then checks := checks + 1;
  end;

  -- Eliminare e scaricare le novità ----------------------------------------------------------
  perform set_config('role', 'authenticated', true);
  perform set_config('request.jwt.claims', jsonb_build_object('sub', anna, 'role', 'authenticated')::text, true);

  begin
    update public.notes set folder_id = cartella_bruno where id = limiti;
    raise exception 'FALLITO: una nota finisce nella cartella di un altro account';
  exception when foreign_key_violation then checks := checks + 1;
  end;

  update public.notes set deleted_at = now() where id = limiti;
  select * into r from public.notes where id = limiti;
  assert r.deleted_at is not null and r.title = '' and r.content = '' and r.folder_id is null
    and r.revision = 3,
    'una nota eliminata resta solo come segno, senza testo né cartella';
  checks := checks + 1;

  res := public.sync_pull(null);
  assert jsonb_array_length(res -> 'notes') = 0 and jsonb_array_length(res -> 'folders') = 1
    and res #>> '{folders,0,name}' = 'Analisi 1' and not (res #> '{folders,0}' ? 'txid')
    and res #>> '{settings,settings,theme}' = 'dark',
    'la prima volta sync_pull dà tutto, tranne le note eliminate';
  checks := checks + 1;
  assert (res ->> 'cursor')::xid8 <= pg_current_xact_id(),
    'il cursore non va oltre le transazioni ancora aperte';
  checks := checks + 1;

  res := public.sync_pull(pg_current_xact_id()::text);
  assert jsonb_array_length(res -> 'notes') = 1 and res #>> '{notes,0,deleted_at}' is not null,
    'le volte dopo sync_pull porta anche le eliminazioni';
  checks := checks + 1;
  res := public.sync_pull((pg_current_xact_id()::text::numeric + 1)::text);
  assert res -> 'notes' = '[]' and res -> 'folders' = '[]' and res -> 'settings' = 'null',
    'sync_pull non ripete quello che è cambiato prima del cursore';
  checks := checks + 1;

  -- Mandare le modifiche -------------------------------------------------------------------
  res := public.sync_push(jsonb_build_object(
    'folders', jsonb_build_array(jsonb_build_object('id', fisica, 'name', 'Fisica 1')),
    'notes', jsonb_build_array(
      jsonb_build_object('id', moto, 'folder_id', fisica, 'title', 'Moto', 'content', '# Moto',
        'created_at', '2026-09-01T08:00:00Z', 'updated_at', '2026-09-01T10:00:00Z'),
      jsonb_build_object('id', gen_random_uuid(), 'folder_id', gen_random_uuid(), 'content', 'x'))));
  assert res #>> '{folders,0,status}' = 'ok' and res #>> '{notes,0,status}' = 'ok'
    and res #>> '{notes,0,row,folder_id}' = fisica::text
    and (res #>> '{notes,0,row,revision}')::int = 1
    and (res #>> '{notes,0,row,updated_at}')::timestamptz = '2026-09-01T10:00:00Z'
    and not (res #> '{notes,0,row}' ? 'txid'),
    'sync_push crea cartelle e note, anche dentro una cartella appena creata';
  checks := checks + 1;
  assert res #>> '{notes,1,status}' = 'ok' and res #> '{notes,1,row,folder_id}' = 'null',
    'una nota in una cartella che sul server non c''è resta fuori dalle cartelle';
  checks := checks + 1;

  -- La stessa richiesta un'altra volta, come quando la risposta si perde per strada.
  res := public.sync_push(jsonb_build_object('notes', jsonb_build_array(
    jsonb_build_object('id', moto, 'folder_id', fisica, 'title', 'Moto', 'content', '# Moto'))));
  assert res #>> '{notes,0,status}' = 'ok' and (res #>> '{notes,0,row,revision}')::int = 1,
    'mandare due volte la stessa nota non crea una nuova versione';
  checks := checks + 1;

  res := public.sync_push(jsonb_build_object('notes', jsonb_build_array(
    jsonb_build_object('id', moto, 'base_revision', 1, 'folder_id', fisica, 'title', 'Moto',
      'content', '# Moto rettilineo'))));
  assert res #>> '{notes,0,status}' = 'ok' and (res #>> '{notes,0,row,revision}')::int = 2,
    'una modifica fatta sull''ultima versione si salva';
  checks := checks + 1;

  -- Un altro dispositivo aveva modificato la versione 1.
  res := public.sync_push(jsonb_build_object('notes', jsonb_build_array(
    jsonb_build_object('id', moto, 'base_revision', 1, 'folder_id', fisica, 'title', 'Moto',
      'content', '# Moto circolare'))));
  assert res #>> '{notes,0,status}' = 'conflict' and res #>> '{notes,0,row,content}' = '# Moto rettilineo'
    and (res #>> '{notes,0,row,revision}')::int = 2,
    'due modifiche sulla stessa versione: la seconda è un conflitto e riceve quella del server';
  checks := checks + 1;
  select * into r from public.notes where id = moto;
  assert r.content = '# Moto rettilineo', 'un conflitto non sovrascrive niente';
  checks := checks + 1;

  res := public.sync_push(jsonb_build_object('notes', jsonb_build_array(
    jsonb_build_object('id', moto, 'base_revision', 2, 'deleted_at', now()))));
  assert res #>> '{notes,0,status}' = 'ok' and res #>> '{notes,0,row,content}' = ''
    and res #>> '{notes,0,row,deleted_at}' is not null,
    'con sync_push si eliminano le note';
  checks := checks + 1;

  res := public.sync_push(jsonb_build_object('folders', jsonb_build_array(
    jsonb_build_object('id', fisica, 'base_revision', 1, 'name', 'Fisica 1 (meccanica)'))));
  assert res #>> '{folders,0,status}' = 'ok' and (res #>> '{folders,0,row,revision}')::int = 2,
    'si rinomina una cartella';
  checks := checks + 1;
  res := public.sync_push(jsonb_build_object('folders', jsonb_build_array(
    jsonb_build_object('id', fisica, 'base_revision', 1, 'name', 'Fisica generale'))));
  assert res #>> '{folders,0,status}' = 'conflict' and res #>> '{folders,0,row,name}' = 'Fisica 1 (meccanica)',
    'due nomi nuovi per la stessa cartella: il secondo è un conflitto';
  checks := checks + 1;

  res := public.sync_push(jsonb_build_object('settings', jsonb_build_object(
    'base_revision', 1, 'settings', '{"theme": "light"}'::jsonb)));
  assert res #>> '{settings,status}' = 'ok' and (res #>> '{settings,row,revision}')::int = 2
    and res #> '{settings,row,dictionary}' = '["Lagrangiana"]',
    'impostazioni: cambia solo quello che si manda';
  checks := checks + 1;
  res := public.sync_push(jsonb_build_object('settings', jsonb_build_object(
    'base_revision', 1, 'dictionary', '["Hamiltoniana"]'::jsonb)));
  assert res #>> '{settings,status}' = 'conflict' and res #>> '{settings,row,settings,theme}' = 'light',
    'impostazioni cambiate da due dispositivi: il secondo riceve quelle del server';
  checks := checks + 1;
  begin
    perform public.sync_push(jsonb_build_object('settings', jsonb_build_object(
      'base_revision', 2, 'settings', '{"apiKey": "sk-ant-prova"}'::jsonb)));
    raise exception 'FALLITO: con sync_push la chiave API finisce sul server';
  exception when check_violation then checks := checks + 1;
  end;

  -- Limiti di spazio ------------------------------------------------------------------------
  begin
    insert into public.notes (content) values (repeat('x', 1000001));
    raise exception 'FALLITO: una nota supera 1 MB';
  exception when check_violation then checks := checks + 1;
  end;

  -- Riempie i 20 MB di Anna con note da 1 MB.
  select coalesce(sum(greatest(octet_length(content), 1000)), 0) into used from public.notes;
  loop
    chunk := least(20000000 - used, 1000000);
    exit when chunk < 1000;
    insert into public.notes (content) values (repeat('x', chunk::int)) returning id into grande;
    used := used + chunk;
  end loop;
  begin
    insert into public.notes (content) values ('');
    raise exception 'FALLITO: si supera il limite di spazio con una nota nuova';
  exception when raise_exception then
    get stacked diagnostics err_hint = pg_exception_hint;
    assert err_hint = 'quota', 'si supera il limite di spazio con una nota nuova';
    checks := checks + 1;
  end;
  begin
    update public.notes set content = content || '!' where id = grande;
    raise exception 'FALLITO: si supera il limite di spazio allungando una nota';
  exception when raise_exception then
    get stacked diagnostics err_hint = pg_exception_hint;
    assert err_hint = 'quota', 'si supera il limite di spazio allungando una nota';
    checks := checks + 1;
  end;
  update public.notes set deleted_at = now() where id = grande;
  insert into public.notes (content) values ('# Dopo aver fatto spazio');
  checks := checks + 1;

  perform set_config('request.jwt.claims', jsonb_build_object('sub', bruno, 'role', 'authenticated')::text, true);
  insert into public.notes (content) values ('# Lo spazio di Bruno è a parte');
  checks := checks + 1;

  perform set_config('request.jwt.claims', jsonb_build_object('sub', anna, 'role', 'authenticated')::text, true);
  select count(*) into cnt from public.folders;
  for i in 1 .. 1000 - cnt loop
    insert into public.folders (name) values ('Cartella ' || i);
  end loop;
  begin
    insert into public.folders (name) values ('Una di troppo');
    raise exception 'FALLITO: si creano più di 1000 cartelle';
  exception when raise_exception then
    get stacked diagnostics err_hint = pg_exception_hint;
    assert err_hint = 'quota', 'si creano più di 1000 cartelle';
    checks := checks + 1;
  end;

  -- Eliminare l'account cancella tutto ----------------------------------------------------
  assert not has_function_privilege('anon', 'public.delete_account()', 'execute')
    and not has_function_privilege('anon', 'private.delete_own_account()', 'execute'),
    'chi non ha fatto l''accesso non può chiamare «elimina account»';
  checks := checks + 1;
  perform set_config('role', 'anon', true);
  begin
    perform public.delete_account();
    raise exception 'FALLITO: senza accesso si può chiamare «elimina account»';
  exception when insufficient_privilege then checks := checks + 1;
  end;
  perform set_config('role', 'authenticated', true);
  perform set_config('request.jwt.claims', '', true);
  begin
    perform public.delete_account();
    raise exception 'FALLITO: si elimina un account senza dire quale';
  exception when insufficient_privilege then checks := checks + 1;
  end;
  begin
    perform private.clear_deleted_note();
    raise exception 'FALLITO: dal browser si chiamano le altre funzioni di private';
  exception when insufficient_privilege then checks := checks + 1;
  end;

  perform set_config('request.jwt.claims', jsonb_build_object('sub', anna, 'role', 'authenticated')::text, true);
  perform public.delete_account();
  perform set_config('role', 'postgres', true);
  select (select count(*) from auth.users where id = anna)
    + (select count(*) from public.notes where owner_id = anna)
    + (select count(*) from public.folders where owner_id = anna)
    + (select count(*) from public.user_settings where user_id = anna) into cnt;
  assert cnt = 0, 'eliminando l''account spariscono l''utente, le note, le cartelle e le impostazioni';
  checks := checks + 1;
  select count(*) into cnt from public.notes where owner_id = bruno;
  assert cnt = 2, 'le note degli altri account restano';
  checks := checks + 1;
  select count(*) into cnt from auth.users where id = bruno;
  assert cnt = 1, 'e anche gli altri account';
  checks := checks + 1;

  raise exception 'TEST OK: % controlli', checks;
end
$test$;
