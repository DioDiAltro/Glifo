-- Quel poco di Supabase che serve per provare le migrazioni fuori da Supabase (nei test,
-- con un Postgres in memoria): i ruoli con cui arrivano le richieste, la tabella degli
-- utenti e auth.uid(), che legge l'utente dal token come su Supabase. Anche i permessi
-- predefiniti sono gli stessi: le tabelle nuove in public vanno ad anon e authenticated,
-- così i test scoprono se una migrazione se ne dimentica.
create role anon nologin;
create role authenticated nologin;
create role service_role nologin bypassrls;
create schema auth;
create table auth.users (
  id uuid primary key,
  email text,
  aud text,
  role text,
  created_at timestamptz default now()
);
create function auth.uid() returns uuid language sql stable as $$
  select coalesce(
    nullif(current_setting('request.jwt.claim.sub', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')
  )::uuid
$$;
grant usage on schema auth to anon, authenticated, service_role;
grant execute on function auth.uid() to anon, authenticated, service_role;
grant usage on schema public to anon, authenticated, service_role;
alter default privileges in schema public grant all on tables to anon, authenticated, service_role;
alter default privileges in schema public grant all on functions to anon, authenticated, service_role;
alter default privileges in schema public grant all on sequences to anon, authenticated, service_role;
