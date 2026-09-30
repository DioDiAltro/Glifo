-- Glifo: cartelle, note e impostazioni di ogni account, pronte per la sincronizzazione.
--
-- Regole:
-- - ognuno legge e modifica solo le sue righe; chi non ha fatto l'accesso non vede niente;
-- - dal browser non si cancella niente: una nota o una cartella eliminata resta segnata come
--   eliminata (deleted_at) e senza testo, così anche gli altri dispositivi la tolgono.
--   Tutto sparisce davvero quando si elimina l'account;
-- - revision e txid li scrive solo il database, a ogni modifica: servono alla
--   sincronizzazione (sync_pull e sync_push, in fondo);
-- - ogni account ha un limite di spazio, così nessuno riempie da solo il database.

-- Funzioni interne, che il browser non può chiamare.
create schema private;
revoke all on schema private from public;

-- Cartelle ---------------------------------------------------------------------------

create table public.folders (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  name text not null default '' check (char_length(name) <= 60),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  revision bigint not null default 1,
  txid xid8 not null default pg_current_xact_id(),
  -- Serve alle note: una nota può stare solo in una cartella dello stesso account.
  unique (id, owner_id),
  constraint folders_name_required check (deleted_at is not null or btrim(name) <> '')
);

comment on table public.folders is 'Cartelle degli appunti, un livello solo.';

-- Note -------------------------------------------------------------------------------

create table public.notes (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  folder_id uuid,
  title text not null default '' check (char_length(title) <= 200),
  content text not null default '' check (octet_length(content) <= 1000000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  revision bigint not null default 1,
  txid xid8 not null default pg_current_xact_id(),
  -- Se la cartella sparisce davvero, la nota resta, fuori dalle cartelle.
  foreign key (folder_id, owner_id) references public.folders (id, owner_id)
    on delete set null (folder_id)
);

comment on table public.notes is 'Appunti in Markdown. created_at e updated_at sono le ore del dispositivo che li ha scritti.';

-- Impostazioni e dizionario personale --------------------------------------------------

create table public.user_settings (
  user_id uuid primary key default auth.uid() references auth.users (id) on delete cascade,
  settings jsonb not null default '{}'::jsonb,
  dictionary jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now(),
  revision bigint not null default 1,
  txid xid8 not null default pg_current_xact_id(),
  constraint user_settings_settings_object
    check (jsonb_typeof(settings) = 'object' and octet_length(settings::text) <= 20000),
  -- La chiave API di Anthropic e l'indirizzo del proxy restano sul dispositivo.
  constraint user_settings_no_api_key check (not settings ?| array['apiKey', 'apiBaseUrl']),
  constraint user_settings_dictionary_array
    check (jsonb_typeof(dictionary) = 'array' and octet_length(dictionary::text) <= 200000)
);

comment on table public.user_settings is 'Impostazioni e dizionario personale di ogni account (senza la chiave API).';

-- Per la sincronizzazione (le righe di un account in ordine di modifica) e per le cartelle.
create index folders_owner_txid on public.folders (owner_id, txid);
create index notes_owner_txid on public.notes (owner_id, txid);
create index notes_folder on public.notes (folder_id, owner_id);

-- A ogni scrittura ----------------------------------------------------------------------

-- Una nota eliminata perde testo, titolo e cartella: resta solo il segno che non c'è più.
create function private.clear_deleted_note() returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.deleted_at is not null then
    new.title := '';
    new.content := '';
    new.folder_id := null;
  end if;
  return new;
end;
$$;

create function private.clear_deleted_folder() returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.deleted_at is not null then
    new.name := '';
  end if;
  return new;
end;
$$;

-- Le note di un account occupano al massimo 20 MB; ogni nota conta almeno 1000 byte, così
-- non si possono creare milioni di note vuote. Si controlla solo quando lo spazio cresce.
create function private.check_notes_quota() returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  used bigint;
begin
  if tg_op = 'UPDATE' and octet_length(new.content) <= octet_length(old.content) then
    return new;
  end if;
  select coalesce(sum(greatest(octet_length(n.content), 1000)), 0) into used
  from public.notes n
  where n.owner_id = new.owner_id and n.id <> new.id;
  if used + greatest(octet_length(new.content), 1000) > 20000000 then
    raise exception 'Spazio esaurito: le note di un account possono occupare al massimo 20 MB.'
      using hint = 'quota';
  end if;
  return new;
end;
$$;

create function private.check_folders_quota() returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if (select count(*) from public.folders f where f.owner_id = new.owner_id) >= 1000 then
    raise exception 'Troppe cartelle: un account può averne al massimo 1000.'
      using hint = 'quota';
  end if;
  return new;
end;
$$;

-- Nuova revisione e transazione: dicono agli altri dispositivi che la riga è cambiata.
create function private.stamp_revision() returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if tg_op = 'INSERT' then
    new.revision := 1;
  else
    new.revision := old.revision + 1;
  end if;
  new.txid := pg_current_xact_id();
  return new;
end;
$$;

-- I trigger partono in ordine di nome: prima si svuota, poi si controlla lo spazio.
create trigger before_write_1_tombstone before insert or update on public.folders
  for each row execute function private.clear_deleted_folder();
create trigger before_write_2_quota before insert on public.folders
  for each row execute function private.check_folders_quota();
create trigger before_write_3_revision before insert or update on public.folders
  for each row execute function private.stamp_revision();

create trigger before_write_1_tombstone before insert or update on public.notes
  for each row execute function private.clear_deleted_note();
create trigger before_write_2_quota before insert or update on public.notes
  for each row execute function private.check_notes_quota();
create trigger before_write_3_revision before insert or update on public.notes
  for each row execute function private.stamp_revision();

create trigger before_write_3_revision before insert or update on public.user_settings
  for each row execute function private.stamp_revision();

revoke execute on all functions in schema private from public, anon, authenticated;

-- Chi può fare cosa --------------------------------------------------------------------

alter table public.folders enable row level security;
alter table public.notes enable row level security;
alter table public.user_settings enable row level security;

create policy "Ognuno vede le sue cartelle" on public.folders
  for select to authenticated using (owner_id = (select auth.uid()));
create policy "Ognuno crea le sue cartelle" on public.folders
  for insert to authenticated with check (owner_id = (select auth.uid()));
create policy "Ognuno modifica le sue cartelle" on public.folders
  for update to authenticated
  using (owner_id = (select auth.uid())) with check (owner_id = (select auth.uid()));

create policy "Ognuno vede le sue note" on public.notes
  for select to authenticated using (owner_id = (select auth.uid()));
create policy "Ognuno crea le sue note" on public.notes
  for insert to authenticated with check (owner_id = (select auth.uid()));
create policy "Ognuno modifica le sue note" on public.notes
  for update to authenticated
  using (owner_id = (select auth.uid())) with check (owner_id = (select auth.uid()));

create policy "Ognuno vede le sue impostazioni" on public.user_settings
  for select to authenticated using (user_id = (select auth.uid()));
create policy "Ognuno crea le sue impostazioni" on public.user_settings
  for insert to authenticated with check (user_id = (select auth.uid()));
create policy "Ognuno modifica le sue impostazioni" on public.user_settings
  for update to authenticated
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));

-- Chi non ha fatto l'accesso non tocca niente. Gli altri non possono cancellare righe né
-- scegliere proprietario, revisione e transazione.
revoke all on public.folders, public.notes, public.user_settings from anon, authenticated;
grant select on public.folders, public.notes, public.user_settings to authenticated;
grant insert (id, name, created_at, updated_at, deleted_at),
      update (name, updated_at, deleted_at)
  on public.folders to authenticated;
grant insert (id, folder_id, title, content, created_at, updated_at, deleted_at),
      update (folder_id, title, content, updated_at, deleted_at)
  on public.notes to authenticated;
grant insert (settings, dictionary, updated_at),
      update (settings, dictionary, updated_at)
  on public.user_settings to authenticated;

-- Sincronizzazione -----------------------------------------------------------------------

-- Scarica le novità. Senza `since`: tutte le cartelle e note (tranne le eliminate) e le
-- impostazioni. Con `since` (il `cursor` della chiamata precedente): solo quello che è
-- cambiato dopo, comprese le eliminazioni. Il cursore è la transazione più vecchia ancora
-- aperta, quindi una modifica che finisce di salvarsi più tardi arriva alla volta dopo.
create function public.sync_pull(since text default null)
returns jsonb
language sql
stable
security invoker
set search_path = ''
as $$
  with arg as (select nullif(sync_pull.since, '')::xid8 as from_txid)
  select jsonb_build_object(
    'cursor', pg_snapshot_xmin(pg_current_snapshot())::text,
    'folders', coalesce((
      select jsonb_agg(to_jsonb(f) - 'txid' order by f.txid)
      from public.folders f, arg
      where case when arg.from_txid is null then f.deleted_at is null else f.txid >= arg.from_txid end
    ), '[]'::jsonb),
    'notes', coalesce((
      select jsonb_agg(to_jsonb(n) - 'txid' order by n.txid)
      from public.notes n, arg
      where case when arg.from_txid is null then n.deleted_at is null else n.txid >= arg.from_txid end
    ), '[]'::jsonb),
    'settings', (
      select to_jsonb(s) - 'txid'
      from public.user_settings s, arg
      where arg.from_txid is null or s.txid >= arg.from_txid
    )
  )
$$;

-- Manda le modifiche: { folders: [...], notes: [...], settings: {...} }. Ogni voce ha
-- `base_revision`, la revisione da cui è partita la modifica (null se è nuova). Per ogni voce
-- risponde con `status`:
-- - ok: salvata (o era già così sul server), e `row` è la riga salvata;
-- - conflict: nel frattempo è cambiata altrove; `row` è la versione del server e il
--   dispositivo decide cosa fare (per le note: tiene tutte e due le versioni);
-- - rejected: l'id appartiene a un altro account.
-- Le cartelle vengono prima delle note, così una nota può entrare in una cartella nuova.
create function public.sync_push(changes jsonb)
returns jsonb
language plpgsql
security invoker
set search_path = ''
as $$
declare
  item jsonb;
  item_id uuid;
  base bigint;
  deleted timestamptz;
  folder uuid;
  f public.folders;
  n public.notes;
  s public.user_settings;
  outcome text;
  out_folders jsonb := '[]'::jsonb;
  out_notes jsonb := '[]'::jsonb;
  out_settings jsonb;
begin
  if auth.uid() is null then
    raise exception 'Serve l''accesso.' using errcode = '42501';
  end if;

  for item in select value from jsonb_array_elements(coalesce(changes -> 'folders', '[]'::jsonb)) loop
    item_id := (item ->> 'id')::uuid;
    base := (item ->> 'base_revision')::bigint;
    deleted := (item ->> 'deleted_at')::timestamptz;
    f := null;
    if base is not null then
      update public.folders as t
      set name = coalesce(item ->> 'name', ''),
          updated_at = coalesce((item ->> 'updated_at')::timestamptz, now()),
          deleted_at = deleted
      where t.id = item_id and t.revision = base
      returning t.* into f;
    end if;
    -- Nuova, oppure sul server non c'è più: la si crea.
    if f.id is null and (base is null or not exists (select 1 from public.folders t where t.id = item_id)) then
      insert into public.folders as t (id, name, created_at, updated_at, deleted_at)
      values (
        item_id,
        coalesce(item ->> 'name', ''),
        coalesce((item ->> 'created_at')::timestamptz, now()),
        coalesce((item ->> 'updated_at')::timestamptz, now()),
        deleted
      )
      on conflict (id) do nothing
      returning t.* into f;
    end if;
    outcome := 'ok';
    if f.id is null then
      select t.* into f from public.folders t where t.id = item_id;
      if not found then
        outcome := 'rejected';
      elsif not (
        (f.deleted_at is not null and deleted is not null)
        or (f.deleted_at is null and deleted is null and f.name = coalesce(item ->> 'name', ''))
      ) then
        outcome := 'conflict';
      end if;
    end if;
    out_folders := out_folders || jsonb_build_array(jsonb_build_object(
      'id', item_id,
      'status', outcome,
      'row', case when f.id is null then null else to_jsonb(f) - 'txid' end
    ));
  end loop;

  for item in select value from jsonb_array_elements(coalesce(changes -> 'notes', '[]'::jsonb)) loop
    item_id := (item ->> 'id')::uuid;
    base := (item ->> 'base_revision')::bigint;
    deleted := (item ->> 'deleted_at')::timestamptz;
    folder := (item ->> 'folder_id')::uuid;
    -- Una cartella che sul server non c'è: la nota resta fuori dalle cartelle.
    if folder is not null and not exists (select 1 from public.folders t where t.id = folder) then
      folder := null;
    end if;
    n := null;
    if base is not null then
      update public.notes as t
      set folder_id = folder,
          title = coalesce(item ->> 'title', ''),
          content = coalesce(item ->> 'content', ''),
          updated_at = coalesce((item ->> 'updated_at')::timestamptz, now()),
          deleted_at = deleted
      where t.id = item_id and t.revision = base
      returning t.* into n;
    end if;
    if n.id is null and (base is null or not exists (select 1 from public.notes t where t.id = item_id)) then
      insert into public.notes as t (id, folder_id, title, content, created_at, updated_at, deleted_at)
      values (
        item_id,
        folder,
        coalesce(item ->> 'title', ''),
        coalesce(item ->> 'content', ''),
        coalesce((item ->> 'created_at')::timestamptz, now()),
        coalesce((item ->> 'updated_at')::timestamptz, now()),
        deleted
      )
      on conflict (id) do nothing
      returning t.* into n;
    end if;
    outcome := 'ok';
    if n.id is null then
      select t.* into n from public.notes t where t.id = item_id;
      if not found then
        outcome := 'rejected';
      elsif not (
        (n.deleted_at is not null and deleted is not null)
        or (n.deleted_at is null and deleted is null
            and n.content = coalesce(item ->> 'content', '')
            and n.folder_id is not distinct from folder)
      ) then
        outcome := 'conflict';
      end if;
    end if;
    out_notes := out_notes || jsonb_build_array(jsonb_build_object(
      'id', item_id,
      'status', outcome,
      'row', case when n.id is null then null else to_jsonb(n) - 'txid' end
    ));
  end loop;

  if jsonb_typeof(changes -> 'settings') = 'object' then
    item := changes -> 'settings';
    base := (item ->> 'base_revision')::bigint;
    s := null;
    if base is not null then
      update public.user_settings as t
      set settings = coalesce(nullif(item -> 'settings', 'null'::jsonb), t.settings),
          dictionary = coalesce(nullif(item -> 'dictionary', 'null'::jsonb), t.dictionary),
          updated_at = coalesce((item ->> 'updated_at')::timestamptz, now())
      where t.user_id = auth.uid() and t.revision = base
      returning t.* into s;
    end if;
    if s.user_id is null and (base is null or not exists (select 1 from public.user_settings t where t.user_id = auth.uid())) then
      insert into public.user_settings as t (settings, dictionary, updated_at)
      values (
        coalesce(nullif(item -> 'settings', 'null'::jsonb), '{}'::jsonb),
        coalesce(nullif(item -> 'dictionary', 'null'::jsonb), '[]'::jsonb),
        coalesce((item ->> 'updated_at')::timestamptz, now())
      )
      on conflict (user_id) do nothing
      returning t.* into s;
    end if;
    outcome := 'ok';
    if s.user_id is null then
      select t.* into s from public.user_settings t where t.user_id = auth.uid();
      if not found then
        outcome := 'rejected';
      elsif not (
        s.settings = coalesce(nullif(item -> 'settings', 'null'::jsonb), s.settings)
        and s.dictionary = coalesce(nullif(item -> 'dictionary', 'null'::jsonb), s.dictionary)
      ) then
        outcome := 'conflict';
      end if;
    end if;
    out_settings := jsonb_build_object(
      'status', outcome,
      'row', case when s.user_id is null then null else to_jsonb(s) - 'txid' end
    );
  end if;

  return jsonb_build_object('folders', out_folders, 'notes', out_notes, 'settings', out_settings);
end;
$$;

revoke execute on function public.sync_pull(text), public.sync_push(jsonb) from public, anon;
grant execute on function public.sync_pull(text), public.sync_push(jsonb) to authenticated;
