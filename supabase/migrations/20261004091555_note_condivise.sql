-- Note condivise con un link ------------------------------------------------------------------
--
-- Una nota condivisa è una fotografia, come le conversazioni condivise di Gemini: titolo e testo
-- come erano quando la si è condivisa. Chi ha il link la legge anche senza account e, se il
-- proprietario lo consente, se ne salva una copia. Il link contiene un codice casuale di 22
-- caratteri (122 bit), che non si indovina e non si può elencare.
--
-- Regole:
-- - ogni nota ha al massimo un link: condividendola di nuovo la fotografia si aggiorna e il link
--   resta lo stesso;
-- - si condivide solo una propria nota che è nell'account e non è eliminata;
-- - il proprietario vede i suoi link (shared_links); il browser non scrive nella tabella, passa
--   da share_note, set_shared_copy e unshare_note;
-- - chi ha il link legge solo quella nota, con shared_note(codice): senza essere il proprietario
--   la tabella non si legge;
-- - eliminando la nota, o l'account, il link smette di funzionare;
-- - le fotografie di un account occupano al massimo 20 MB, come le note.

create table public.shared_notes (
  token text primary key check (token ~ '^[A-Za-z0-9_-]{22}$'),
  owner_id uuid not null references auth.users (id) on delete cascade,
  note_id uuid not null unique references public.notes (id) on delete cascade,
  title text not null default '' check (char_length(title) <= 200),
  content text not null default '' check (octet_length(content) <= 1000000),
  allow_copy boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.shared_notes is 'Note condivise con un link: la fotografia della nota, che chi ha il codice legge con shared_note.';

create index shared_notes_owner on public.shared_notes (owner_id);

alter table public.shared_notes enable row level security;

create policy "Ognuno vede i suoi link" on public.shared_notes
  for select to authenticated using (owner_id = (select auth.uid()));

-- Nessuno scrive direttamente: solo le funzioni qui sotto.
revoke all on public.shared_notes from anon, authenticated;
grant select on public.shared_notes to authenticated;

-- Funzioni interne --------------------------------------------------------------------------------

-- Il link come lo vede il proprietario. content_hash dice se la nota è cambiata dopo la
-- fotografia: è lo SHA-256 del testo, che l'app confronta con quello della nota aperta.
create function private.link_json(s public.shared_notes)
returns jsonb
language sql
stable
set search_path = ''
as $$
  select jsonb_build_object(
    'token', s.token,
    'note_id', s.note_id,
    'title', s.title,
    'allow_copy', s.allow_copy,
    'created_at', s.created_at,
    'updated_at', s.updated_at,
    'content_hash', encode(sha256(convert_to(s.content, 'UTF8')), 'hex')
  )
$$;

create function private.share_own_note(p_note uuid, p_title text, p_content text, p_allow_copy boolean)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  me uuid := (select auth.uid());
  used bigint;
  link public.shared_notes;
begin
  if me is null then
    raise exception 'Per condividere una nota serve l''accesso' using errcode = '42501';
  end if;
  if not exists (select 1 from public.notes n where n.id = p_note and n.owner_id = me and n.deleted_at is null) then
    raise exception 'La nota non è nell''account: si può condividere dopo la sincronizzazione.'
      using errcode = 'P0002', hint = 'missing';
  end if;
  select coalesce(sum(octet_length(s.content)), 0) into used
  from public.shared_notes s
  where s.owner_id = me and s.note_id <> p_note;
  if used + octet_length(coalesce(p_content, '')) > 20000000 then
    raise exception 'Spazio esaurito: le note condivise di un account possono occupare al massimo 20 MB.'
      using hint = 'quota';
  end if;
  insert into public.shared_notes as s (token, owner_id, note_id, title, content, allow_copy)
  values (
    rtrim(translate(encode(uuid_send(gen_random_uuid()), 'base64'), '+/', '-_'), '='),
    me,
    p_note,
    coalesce(p_title, ''),
    coalesce(p_content, ''),
    coalesce(p_allow_copy, true)
  )
  on conflict (note_id) do update
    set title = excluded.title,
        content = excluded.content,
        allow_copy = excluded.allow_copy,
        updated_at = now()
  returning * into link;
  return private.link_json(link);
end;
$$;

create function private.set_own_shared_copy(p_note uuid, p_allow_copy boolean)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  link public.shared_notes;
begin
  update public.shared_notes s
  set allow_copy = coalesce(p_allow_copy, true)
  where s.note_id = p_note and s.owner_id = (select auth.uid())
  returning * into link;
  return case when link.token is null then null else private.link_json(link) end;
end;
$$;

create function private.unshare_own_note(p_note uuid)
returns void
language sql
security definer
set search_path = ''
as $$
  delete from public.shared_notes s where s.note_id = p_note and s.owner_id = (select auth.uid());
$$;

-- Per chi ha il link, anche senza account: la fotografia di quella nota sola.
create function private.read_shared_note(p_token text)
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
  select jsonb_build_object('title', s.title, 'content', s.content, 'allow_copy', s.allow_copy, 'updated_at', s.updated_at)
  from public.shared_notes s
  where s.token = p_token
$$;

-- Una nota eliminata (o svuotata dalla sincronizzazione) non resta condivisa.
create function private.unshare_deleted_note()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  delete from public.shared_notes s where s.note_id = new.id;
  return null;
end;
$$;

create trigger after_delete_unshare after update of deleted_at on public.notes
  for each row when (new.deleted_at is not null and old.deleted_at is null)
  execute function private.unshare_deleted_note();

revoke all on function private.link_json(public.shared_notes),
  private.share_own_note(uuid, text, text, boolean),
  private.set_own_shared_copy(uuid, boolean),
  private.unshare_own_note(uuid),
  private.read_shared_note(text),
  private.unshare_deleted_note()
  from public, anon, authenticated;
grant usage on schema private to anon;
grant execute on function private.link_json(public.shared_notes),
  private.share_own_note(uuid, text, text, boolean),
  private.set_own_shared_copy(uuid, boolean),
  private.unshare_own_note(uuid)
  to authenticated;
grant execute on function private.read_shared_note(text) to anon, authenticated;

-- Le funzioni che chiama l'app --------------------------------------------------------------------

-- Condivide una propria nota, o ne aggiorna la fotografia: restituisce il link.
create function public.share_note(note uuid, title text, content text, allow_copy boolean default true)
returns jsonb
language sql
security invoker
set search_path = ''
as $$
  select private.share_own_note(note, title, content, allow_copy);
$$;

-- Consente o no di salvarsi una copia, senza cambiare la fotografia. Null se la nota non ha link.
create function public.set_shared_copy(note uuid, allow_copy boolean)
returns jsonb
language sql
security invoker
set search_path = ''
as $$
  select private.set_own_shared_copy(note, allow_copy);
$$;

-- Toglie il link: da lì in poi non si apre più.
create function public.unshare_note(note uuid)
returns void
language sql
security invoker
set search_path = ''
as $$
  select private.unshare_own_note(note);
$$;

-- I propri link (di una nota sola, se si dice quale), dal più recente.
create function public.shared_links(note uuid default null)
returns jsonb
language sql
stable
security invoker
set search_path = ''
as $$
  select coalesce(jsonb_agg(private.link_json(s) order by s.updated_at desc), '[]'::jsonb)
  from public.shared_notes s
  where shared_links.note is null or s.note_id = shared_links.note;
$$;

-- La nota di un link, per chi lo apre (anche senza account). Null se il link non c'è più.
create function public.shared_note(token text)
returns jsonb
language sql
stable
security invoker
set search_path = ''
as $$
  select private.read_shared_note(token);
$$;

revoke execute on function public.share_note(uuid, text, text, boolean),
  public.set_shared_copy(uuid, boolean),
  public.unshare_note(uuid),
  public.shared_links(uuid),
  public.shared_note(text)
  from public, anon;
grant execute on function public.share_note(uuid, text, text, boolean),
  public.set_shared_copy(uuid, boolean),
  public.unshare_note(uuid),
  public.shared_links(uuid)
  to authenticated;
grant execute on function public.shared_note(text) to anon, authenticated;
