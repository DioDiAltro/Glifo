-- Eliminare l'account -----------------------------------------------------------------------
--
-- Chi ha fatto l'accesso può eliminare il proprio account, e solo quello. Con l'utente
-- spariscono (grazie a «on delete cascade») cartelle, note, impostazioni e anche le sessioni
-- aperte sugli altri dispositivi, che al prossimo rinnovo dell'accesso restano fuori.
--
-- Il browser non può toccare auth.users: la funzione che cancella gira con i permessi di chi
-- l'ha creata (security definer), ma cancella solo l'utente del token. Sta nello schema
-- private, che l'API non espone: dall'app si chiama public.delete_account(), che gira con i
-- permessi di chi chiama.

create function private.delete_own_account()
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  me uuid := (select auth.uid());
begin
  if me is null then
    raise exception 'Per eliminare l''account serve l''accesso' using errcode = '42501';
  end if;
  delete from auth.users where id = me;
end;
$$;

revoke all on function private.delete_own_account() from public, anon, authenticated;
grant usage on schema private to authenticated;
grant execute on function private.delete_own_account() to authenticated;

create function public.delete_account()
returns void
language sql
security invoker
set search_path = ''
as $$
  select private.delete_own_account();
$$;

revoke execute on function public.delete_account() from public, anon;
grant execute on function public.delete_account() to authenticated;
