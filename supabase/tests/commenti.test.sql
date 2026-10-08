-- Test dei commenti di chi prova Glifo (vedi supabase/migrations, «commenti» e «commenti pubblici»).
--
-- Come database.test.sql: tutto succede dentro un solo blocco che alla fine viene annullato, e il
-- risultato giusto è l'errore «TEST OK: N controlli».
do $test$
declare
  anna uuid := gen_random_uuid();
  riga public.feedback;
  cnt bigint;
  testo text;
  colonna text;
  err_hint text;
  checks int := 0;
begin
  insert into auth.users (id, email, aud, role)
  values (anna, 'anna@example.invalid', 'authenticated', 'authenticated');

  -- Senza account, con la sola chiave pubblica ---------------------------------------------------
  perform set_config('role', 'anon', true);
  perform set_config('request.jwt.claims', '', true);
  insert into public.feedback (kind, message, email, site, version, browser)
  values ('problema', 'L''editor delle tabelle non si apre', 'anna@example.invalid', 'prova', 'd2f8055', 'Mozilla/5.0 · 1440×900');
  checks := checks + 1;
  insert into public.feedback (message, site) values ('Mi piace la lavagna', 'online');
  checks := checks + 1;

  begin
    update public.feedback set message = 'cambiato';
    raise exception 'FALLITO: si cambia un commento';
  exception when insufficient_privilege then checks := checks + 1;
  end;
  begin
    update public.feedback set visible = true;
    raise exception 'FALLITO: si fa vedere a tutti il commento di un altro';
  exception when insufficient_privilege then checks := checks + 1;
  end;
  begin
    delete from public.feedback;
    raise exception 'FALLITO: si cancellano i commenti';
  exception when insufficient_privilege then checks := checks + 1;
  end;
  begin
    insert into public.feedback (message, site, created_at) values ('Dal passato', 'online', '2020-01-01');
    raise exception 'FALLITO: si sceglie la data del commento';
  exception when insufficient_privilege then checks := checks + 1;
  end;
  begin
    insert into public.feedback (message, site, visible, reply) values ('Ciao', 'online', true, 'Risposta finta');
    raise exception 'FALLITO: chi scrive mette la risposta di chi fa Glifo';
  exception when insufficient_privilege then checks := checks + 1;
  end;

  -- La pagina «Commenti»: solo quelli visibili, e solo tipo, nome, testo, data e risposta -----------
  insert into public.feedback (kind, message, author, email, visible, site, version, browser)
  values ('idea', 'Le tabelle anche nei grafici 3D', 'Anna', 'anna@example.invalid', true, 'online', 'd2f8055', 'Mozilla/5.0');
  checks := checks + 1;
  -- Come manda PostgREST con «Prefer: return=minimal» (RETURNING 1): anche un commento privato parte.
  insert into public.feedback (message, author, visible, site) values ('Questo solo a chi fa Glifo', 'Bruno', false, 'online')
  returning 1 into cnt;
  checks := checks + 1;
  select count(*) into cnt from public.feedback;
  assert cnt = 1, 'si vede solo il commento visibile: non i privati né quelli mandati senza scegliere';
  checks := checks + 1;
  select author || ': ' || message into testo from public.feedback where kind = 'idea' order by created_at desc;
  assert testo = 'Anna: Le tabelle anche nei grafici 3D', 'si leggono il nome e il testo';
  checks := checks + 1;
  foreach colonna in array array['email', 'site', 'version', 'browser', 'visible'] loop
    begin
      execute format('select %I from public.feedback', colonna);
      raise exception 'FALLITO: senza account si legge la colonna %', colonna;
    exception when insufficient_privilege then checks := checks + 1;
    end;
  end loop;
  begin
    perform * from public.feedback;
    raise exception 'FALLITO: si leggono tutte le colonne';
  exception when insufficient_privilege then checks := checks + 1;
  end;
  begin
    select count(*) into cnt from public.feedback where not visible;
    raise exception 'FALLITO: si cercano i commenti privati';
  exception when insufficient_privilege then checks := checks + 1;
  end;
  begin
    select count(*) into cnt from public.feedback where email is not null;
    raise exception 'FALLITO: si cercano i commenti con l''email';
  exception when insufficient_privilege then checks := checks + 1;
  end;

  -- Commenti che non vanno -------------------------------------------------------------------------
  begin
    insert into public.feedback (message, site) values (E'  \n ', 'online');
    raise exception 'FALLITO: un commento di soli spazi';
  exception when check_violation or insufficient_privilege then checks := checks + 1;
  end;
  begin
    insert into public.feedback (message, site) values (repeat('a', 4001), 'online');
    raise exception 'FALLITO: un commento di più di 4000 caratteri';
  exception when check_violation or insufficient_privilege then checks := checks + 1;
  end;
  begin
    insert into public.feedback (message, email, site) values ('Ciao', 'non è un''email', 'online');
    raise exception 'FALLITO: un''email che non è un''email';
  exception when check_violation then checks := checks + 1;
  end;
  begin
    insert into public.feedback (message, site) values ('Ciao', 'altrove');
    raise exception 'FALLITO: un sito che non è di Glifo';
  exception when check_violation then checks := checks + 1;
  end;
  begin
    insert into public.feedback (kind, message, site) values ('lamentela', 'Ciao', 'online');
    raise exception 'FALLITO: un tipo che non c''è';
  exception when check_violation then checks := checks + 1;
  end;
  begin
    insert into public.feedback (message, site, browser) values ('Ciao', 'online', repeat('b', 513));
    raise exception 'FALLITO: un browser lungo più di 512 caratteri';
  exception when check_violation then checks := checks + 1;
  end;
  begin
    insert into public.feedback (message, author, site) values ('Ciao', '   ', 'online');
    raise exception 'FALLITO: un nome di soli spazi';
  exception when check_violation then checks := checks + 1;
  end;
  begin
    insert into public.feedback (message, author, site) values ('Ciao', repeat('n', 41), 'online');
    raise exception 'FALLITO: un nome di più di 40 caratteri';
  exception when check_violation then checks := checks + 1;
  end;
  begin
    insert into public.feedback (message, author, site) values ('Ciao', E'Anna\nBruno', 'online');
    raise exception 'FALLITO: un nome su due righe';
  exception when check_violation then checks := checks + 1;
  end;

  -- Con l'accesso si manda allo stesso modo -------------------------------------------------------
  perform set_config('role', 'authenticated', true);
  perform set_config('request.jwt.claims', jsonb_build_object('sub', anna, 'role', 'authenticated')::text, true);
  insert into public.feedback (kind, message, site) values ('idea', 'I grafici in 3D anche per le superfici', 'online');
  checks := checks + 1;
  select count(*) into cnt from public.feedback;
  assert cnt = 1, 'con l''accesso si vede lo stesso solo il commento visibile';
  checks := checks + 1;
  begin
    select email into testo from public.feedback;
    raise exception 'FALLITO: con l''accesso si legge l''email';
  exception when insufficient_privilege then checks := checks + 1;
  end;

  -- Chi fa Glifo li legge dalla dashboard (che passa sopra le regole) --------------------------------
  perform set_config('role', 'postgres', true);
  select count(*) into cnt from public.feedback;
  assert cnt = 5, 'i cinque commenti giusti ci sono, quelli sbagliati no';
  checks := checks + 1;
  select * into riga from public.feedback where kind = 'problema';
  assert riga.message = 'L''editor delle tabelle non si apre' and riga.email = 'anna@example.invalid' and riga.site = 'prova'
    and riga.version = 'd2f8055' and riga.browser = 'Mozilla/5.0 · 1440×900' and riga.created_at is not null,
    'il commento arriva con il testo, l''email, il sito, la versione e il browser';
  checks := checks + 1;
  select * into riga from public.feedback where message = 'Mi piace la lavagna';
  assert riga.kind = 'altro' and riga.email is null and riga.version = '' and riga.browser = ''
    and riga.author is null and not riga.visible and riga.reply is null,
    'senza tipo è «altro», email e nome sono facoltativi, e senza sceglierlo non si vede a tutti';
  checks := checks + 1;
  select * into riga from public.feedback where author = 'Bruno';
  assert not riga.visible and riga.message = 'Questo solo a chi fa Glifo', 'il commento privato arriva a chi fa Glifo';
  checks := checks + 1;

  -- Chi fa Glifo risponde e nasconde dalla dashboard ------------------------------------------------
  update public.feedback set reply = 'Fatto, grazie!' where author = 'Anna';
  begin
    update public.feedback set reply = E' \n' where author = 'Anna';
    raise exception 'FALLITO: una risposta di soli spazi';
  exception when check_violation then checks := checks + 1;
  end;
  perform set_config('role', 'anon', true);
  perform set_config('request.jwt.claims', '', true);
  select reply into testo from public.feedback;
  assert testo = 'Fatto, grazie!', 'la risposta di chi fa Glifo si legge con il commento';
  checks := checks + 1;
  perform set_config('role', 'postgres', true);
  update public.feedback set visible = false where author = 'Anna';
  perform set_config('role', 'anon', true);
  select count(*) into cnt from public.feedback;
  assert cnt = 0, 'un commento nascosto dalla dashboard non si vede più';
  checks := checks + 1;

  -- Al massimo 60 all'ora in tutto ----------------------------------------------------------------
  perform set_config('role', 'postgres', true);
  select count(*) into cnt from public.feedback;
  perform set_config('role', 'anon', true);
  perform set_config('request.jwt.claims', '', true);
  for i in 1..(60 - cnt)::int loop
    insert into public.feedback (message, site) values ('Commento ' || i, 'online');
  end loop;
  begin
    insert into public.feedback (message, site) values ('Uno di troppo', 'online');
    raise exception 'FALLITO: più di 60 commenti in un''ora';
  exception when program_limit_exceeded then
    get stacked diagnostics err_hint = pg_exception_hint;
    assert err_hint = 'quota', 'l''errore del limite ha hint = quota';
    checks := checks + 1;
  end;
  perform set_config('role', 'postgres', true);
  update public.feedback set created_at = now() - interval '2 hours';
  perform set_config('role', 'anon', true);
  insert into public.feedback (message, site) values ('Dopo un''ora si riprende', 'online');
  checks := checks + 1;

  raise exception 'TEST OK: % controlli', checks;
end
$test$;
