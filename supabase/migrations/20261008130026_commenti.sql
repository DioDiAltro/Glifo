-- Commenti di chi prova Glifo ------------------------------------------------------------------
--
-- Dalla finestra «Mandaci un commento» (in fondo alla barra laterale) chi usa Glifo, anche senza
-- account, manda un problema, un'idea o altro, con la sua email se vuole una risposta. Il browser
-- li scrive soltanto, con la chiave pubblica: dall'app nessuno li legge, li cambia o li cancella.
-- Li legge chi fa Glifo nella dashboard di Supabase (Table Editor → feedback).
--
-- Regole:
-- - il testo c'è (non solo spazi) e ha al massimo 4000 caratteri; l'email è facoltativa e deve
--   avere la forma di un'email;
-- - con il messaggio arrivano il sito (online, prova, claude), la versione di Glifo e il browser
--   con la misura della finestra, per capire i problemi; mai le note;
-- - in tutto al massimo 60 commenti all'ora: un programma che ne mandasse migliaia non riempie il
--   database (l'errore ha hint = 'quota': si riprova più tardi).

create table public.feedback (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  kind text not null default 'altro' check (kind in ('problema', 'idea', 'altro')),
  message text not null check (message ~ '\S' and char_length(message) <= 4000),
  email text check (email is null or (char_length(email) <= 254 and email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$')),
  site text not null check (site in ('online', 'prova', 'claude')),
  version text not null default '' check (char_length(version) <= 64),
  browser text not null default '' check (char_length(browser) <= 512)
);

comment on table public.feedback is 'I commenti di chi prova Glifo (finestra «Mandaci un commento»): il browser li scrive soltanto, si leggono dalla dashboard.';

create index feedback_created on public.feedback (created_at);

alter table public.feedback enable row level security;

-- Chiunque manda un commento con del testo; nessuna regola per leggerli, cambiarli o cancellarli.
create policy "Chiunque manda un commento" on public.feedback
  for insert to anon, authenticated
  with check (message ~ '\S' and char_length(message) <= 4000);

-- Solo le colonne del messaggio: id e data li mette il database.
revoke all on public.feedback from anon, authenticated;
grant insert (kind, message, email, site, version, browser) on public.feedback to anon, authenticated;

-- Al massimo 60 commenti all'ora in tutto. La funzione conta anche quelli che chi scrive non può
-- leggere (security definer); sta in private, che l'API non espone.
create function private.feedback_limit()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if (select count(*) from public.feedback f where f.created_at > now() - interval '1 hour') >= 60 then
    raise exception 'Sono arrivati troppi commenti in poco tempo: riprova più tardi.'
      using errcode = '54000', hint = 'quota';
  end if;
  return new;
end
$$;

revoke all on function private.feedback_limit() from public, anon, authenticated;

create trigger feedback_limit
  before insert on public.feedback
  for each row execute function private.feedback_limit();
