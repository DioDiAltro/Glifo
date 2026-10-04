-- Test delle note condivise con un link (vedi supabase/migrations, «note condivise»).
--
-- Come database.test.sql: tutto succede dentro un solo blocco che alla fine viene annullato, e il
-- risultato giusto è l'errore «TEST OK: N controlli».
do $test$
declare
  anna uuid := gen_random_uuid();
  bruno uuid := gen_random_uuid();
  limiti uuid := gen_random_uuid();
  derivate uuid := gen_random_uuid();
  di_bruno uuid := gen_random_uuid();
  nota uuid;
  link jsonb;
  res jsonb;
  codice text;
  cnt bigint;
  err_hint text;
  checks int := 0;
begin
  insert into auth.users (id, email, aud, role)
  values (anna, 'anna@example.invalid', 'authenticated', 'authenticated'),
         (bruno, 'bruno@example.invalid', 'authenticated', 'authenticated');

  perform set_config('role', 'authenticated', true);
  perform set_config('request.jwt.claims', jsonb_build_object('sub', bruno, 'role', 'authenticated')::text, true);
  insert into public.notes (id, title, content) values (di_bruno, 'Di Bruno', '# Di Bruno');
  perform set_config('request.jwt.claims', jsonb_build_object('sub', anna, 'role', 'authenticated')::text, true);
  insert into public.notes (id, title, content) values (limiti, 'Limiti', '# Limiti'), (derivate, 'Derivate', '# Derivate');

  -- Anna condivide una nota ----------------------------------------------------------------
  link := public.share_note(limiti, 'Limiti', '# Limiti con x^2', true);
  codice := link ->> 'token';
  assert codice ~ '^[A-Za-z0-9_-]{22}$', 'il link ha un codice casuale di 22 caratteri';
  checks := checks + 1;
  assert link ->> 'note_id' = limiti::text and link ->> 'title' = 'Limiti' and (link ->> 'allow_copy')::boolean,
    'il link dice di quale nota è, con che titolo e se si può copiare';
  checks := checks + 1;
  assert link ->> 'content_hash' = encode(sha256(convert_to('# Limiti con x^2', 'UTF8')), 'hex'),
    'content_hash è lo SHA-256 del testo della fotografia';
  checks := checks + 1;

  res := public.share_note(limiti, 'Limiti notevoli', '# Limiti notevoli', false);
  assert res ->> 'token' = codice and res ->> 'title' = 'Limiti notevoli' and not (res ->> 'allow_copy')::boolean,
    'condividendo di nuovo la stessa nota il link resta e la fotografia si aggiorna';
  checks := checks + 1;
  select count(*) into cnt from public.shared_notes;
  assert cnt = 1, 'una nota ha un link solo';
  checks := checks + 1;

  res := public.set_shared_copy(limiti, true);
  assert (res ->> 'allow_copy')::boolean and res ->> 'title' = 'Limiti notevoli',
    'si può consentire la copia senza cambiare la fotografia';
  checks := checks + 1;
  assert public.set_shared_copy(derivate, false) is null, 'una nota senza link non ha niente da cambiare';
  checks := checks + 1;

  res := public.shared_links();
  assert jsonb_array_length(res) = 1 and res -> 0 ->> 'token' = codice, 'Anna vede i suoi link';
  checks := checks + 1;
  assert jsonb_array_length(public.shared_links(limiti)) = 1 and jsonb_array_length(public.shared_links(derivate)) = 0,
    'e il link di una nota sola';
  checks := checks + 1;

  begin
    insert into public.shared_notes (token, owner_id, note_id) values (repeat('a', 22), anna, derivate);
    raise exception 'FALLITO: il browser scrive direttamente un link';
  exception when insufficient_privilege then checks := checks + 1;
  end;
  begin
    update public.shared_notes set content = 'cambiato' where note_id = limiti;
    raise exception 'FALLITO: il browser cambia direttamente una fotografia';
  exception when insufficient_privilege then checks := checks + 1;
  end;
  begin
    delete from public.shared_notes where note_id = limiti;
    raise exception 'FALLITO: il browser cancella direttamente un link';
  exception when insufficient_privilege then checks := checks + 1;
  end;
  begin
    perform public.share_note(gen_random_uuid(), 'Inventata', 'testo', true);
    raise exception 'FALLITO: si condivide una nota che non c''è';
  exception when no_data_found then
    get stacked diagnostics err_hint = pg_exception_hint;
    assert err_hint = 'missing', 'una nota che non è nell''account non si condivide (suggerimento «missing»)';
    checks := checks + 1;
  end;
  begin
    perform public.share_note(di_bruno, 'Presa a Bruno', 'testo', true);
    raise exception 'FALLITO: Anna condivide una nota di Bruno';
  exception when no_data_found then checks := checks + 1;
  end;

  -- Bruno non vede né tocca i link di Anna -----------------------------------------------------
  perform set_config('request.jwt.claims', jsonb_build_object('sub', bruno, 'role', 'authenticated')::text, true);
  select count(*) into cnt from public.shared_notes;
  assert cnt = 0 and jsonb_array_length(public.shared_links()) = 0, 'Bruno non vede i link di Anna';
  checks := checks + 1;
  assert public.set_shared_copy(limiti, false) is null, 'Bruno non cambia un link di Anna';
  checks := checks + 1;
  perform public.unshare_note(limiti);
  perform set_config('role', 'postgres', true);
  select count(*) into cnt from public.shared_notes s where s.token = link ->> 'token';
  assert cnt = 1, 'Bruno non toglie un link di Anna';
  checks := checks + 1;

  -- Chi ha il link, senza account -------------------------------------------------------------
  perform set_config('role', 'anon', true);
  perform set_config('request.jwt.claims', '', true);
  res := public.shared_note(codice);
  assert res ->> 'content' = '# Limiti notevoli' and res ->> 'title' = 'Limiti notevoli' and (res ->> 'allow_copy')::boolean
    and res ? 'updated_at' and not res ? 'owner_id' and not res ? 'note_id',
    'con il link si legge la fotografia anche senza account (e non di chi è)';
  checks := checks + 1;
  assert public.shared_note('AAAAAAAAAAAAAAAAAAAAAA') is null and public.shared_note('') is null and public.shared_note(null) is null,
    'un codice sbagliato non apre niente';
  checks := checks + 1;
  begin
    select count(*) into cnt from public.shared_notes;
    raise exception 'FALLITO: senza account si elencano i link';
  exception when insufficient_privilege then checks := checks + 1;
  end;
  begin
    perform public.share_note(limiti, 'x', 'x', true);
    raise exception 'FALLITO: senza account si condivide';
  exception when insufficient_privilege then checks := checks + 1;
  end;
  begin
    perform public.unshare_note(limiti);
    raise exception 'FALLITO: senza account si toglie un link';
  exception when insufficient_privilege then checks := checks + 1;
  end;
  begin
    perform public.shared_links();
    raise exception 'FALLITO: senza account si chiede l''elenco dei link';
  exception when insufficient_privilege then checks := checks + 1;
  end;
  begin
    perform private.share_own_note(limiti, 'x', 'x', true);
    raise exception 'FALLITO: senza account si chiama la funzione interna che condivide';
  exception when insufficient_privilege then checks := checks + 1;
  end;

  -- Togliere il link, eliminare la nota ----------------------------------------------------------
  perform set_config('role', 'authenticated', true);
  perform set_config('request.jwt.claims', jsonb_build_object('sub', anna, 'role', 'authenticated')::text, true);
  perform public.unshare_note(limiti);
  assert public.shared_note(codice) is null and jsonb_array_length(public.shared_links()) = 0,
    'tolto il link, non si apre più';
  checks := checks + 1;
  link := public.share_note(limiti, 'Limiti', '# Limiti', true);
  assert link ->> 'token' <> codice, 'condividendo di nuovo dopo averlo tolto, il link è nuovo';
  checks := checks + 1;

  res := public.share_note(derivate, 'Derivate', '# Derivate', true);
  update public.notes set deleted_at = now() where id = derivate;
  assert public.shared_note(res ->> 'token') is null and jsonb_array_length(public.shared_links(derivate)) = 0,
    'eliminando la nota, il suo link non si apre più';
  checks := checks + 1;
  begin
    perform public.share_note(derivate, 'Derivate', '# Derivate', true);
    raise exception 'FALLITO: si condivide una nota eliminata';
  exception when no_data_found then checks := checks + 1;
  end;
  update public.notes set title = 'Limiti e continuità' where id = limiti;
  assert public.shared_note(link ->> 'token') is not null, 'cambiando la nota il link resta (con la fotografia di prima)';
  checks := checks + 1;

  -- Lo spazio: al massimo 20 MB di fotografie per account ------------------------------------
  for i in 1 .. 19 loop
    insert into public.notes (title, content) values ('Grande ' || i, '# Grande') returning id into nota;
    perform public.share_note(nota, 'Grande ' || i, repeat('x', 1000000), true);
  end loop;
  -- 19 MB più «# Limiti»: la ventesima fotografia da 1 MB non ci sta più.
  insert into public.notes (title, content) values ('Una di troppo', '# Una di troppo') returning id into nota;
  begin
    perform public.share_note(nota, 'Una di troppo', repeat('x', 1000000), true);
    raise exception 'FALLITO: le fotografie di un account superano 20 MB';
  exception when raise_exception then
    get stacked diagnostics err_hint = pg_exception_hint;
    assert err_hint = 'quota', 'le fotografie di un account occupano al massimo 20 MB (suggerimento «quota»)';
    checks := checks + 1;
  end;
  perform public.share_note(nota, 'Una di troppo', repeat('x', 999000), true);
  perform public.share_note(nota, 'Una di troppo', repeat('y', 999000), true);
  checks := checks + 1;

  -- Eliminare l'account toglie i link ------------------------------------------------------------
  perform public.delete_account();
  perform set_config('role', 'postgres', true);
  select count(*) into cnt from public.shared_notes where owner_id = anna;
  assert cnt = 0, 'eliminando l''account spariscono anche i suoi link';
  checks := checks + 1;
  assert public.shared_note(link ->> 'token') is null, 'e non si aprono più';
  checks := checks + 1;

  raise exception 'TEST OK: % controlli', checks;
end
$test$;
