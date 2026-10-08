-- Test dei commenti di chi prova Glifo (vedi supabase/migrations, «commenti»).
--
-- Come database.test.sql: tutto succede dentro un solo blocco che alla fine viene annullato, e il
-- risultato giusto è l'errore «TEST OK: N controlli».
do $test$
declare
  anna uuid := gen_random_uuid();
  riga public.feedback;
  cnt bigint;
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
    select count(*) into cnt from public.feedback;
    raise exception 'FALLITO: senza account si leggono i commenti';
  exception when insufficient_privilege then checks := checks + 1;
  end;
  begin
    update public.feedback set message = 'cambiato';
    raise exception 'FALLITO: si cambia un commento';
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

  -- Con l'accesso si manda allo stesso modo -------------------------------------------------------
  perform set_config('role', 'authenticated', true);
  perform set_config('request.jwt.claims', jsonb_build_object('sub', anna, 'role', 'authenticated')::text, true);
  insert into public.feedback (kind, message, site) values ('idea', 'I grafici in 3D anche per le superfici', 'online');
  checks := checks + 1;
  begin
    select count(*) into cnt from public.feedback;
    raise exception 'FALLITO: con l''accesso si leggono i commenti';
  exception when insufficient_privilege then checks := checks + 1;
  end;

  -- Chi fa Glifo li legge dalla dashboard (che passa sopra le regole) --------------------------------
  perform set_config('role', 'postgres', true);
  select count(*) into cnt from public.feedback;
  assert cnt = 3, 'i tre commenti giusti ci sono, quelli sbagliati no';
  checks := checks + 1;
  select * into riga from public.feedback where kind = 'problema';
  assert riga.message = 'L''editor delle tabelle non si apre' and riga.email = 'anna@example.invalid' and riga.site = 'prova'
    and riga.version = 'd2f8055' and riga.browser = 'Mozilla/5.0 · 1440×900' and riga.created_at is not null,
    'il commento arriva con il testo, l''email, il sito, la versione e il browser';
  checks := checks + 1;
  select * into riga from public.feedback where message = 'Mi piace la lavagna';
  assert riga.kind = 'altro' and riga.email is null and riga.version = '' and riga.browser = '',
    'senza tipo è «altro», e l''email è facoltativa';
  checks := checks + 1;

  -- Al massimo 60 all'ora in tutto ----------------------------------------------------------------
  perform set_config('role', 'anon', true);
  perform set_config('request.jwt.claims', '', true);
  for i in 1..57 loop
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
