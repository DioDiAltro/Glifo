-- La pagina «Commenti» -------------------------------------------------------------------------
--
-- 8 ottobre 2026, lo studente: «una pagina in Glifo tipo forum, così ci sono tutti i commenti
-- mandati divisi in problemi/idee/altro con la possibilità di far vedere il nome di chi manda il
-- commento; le persone potrebbero vedere cosa è già stato scritto e cosa no».
--
-- Regole:
-- - chi scrive sceglie se il commento si vede a tutti (visible) e può mettere un nome (author: al
--   massimo 40 caratteri, su una riga);
-- - i commenti mandati prima restano privati: la finestra diceva che li leggeva solo chi fa Glifo, e
--   le pagine aperte da prima non mandano visible, che vale false;
-- - dall'app si leggono solo i commenti visibili, e di questi solo tipo, nome, testo, data e la
--   risposta di chi fa Glifo: email, sito, versione e browser restano nella dashboard;
-- - chi fa Glifo risponde (reply) e nasconde un commento (visible = false) dalla dashboard; dall'app
--   nessuno li cambia o li cancella.

alter table public.feedback
  add column author text check (author is null or (author ~ '\S' and char_length(author) <= 40 and author !~ '[[:cntrl:]]')),
  add column visible boolean not null default false,
  add column reply text check (reply is null or (reply ~ '\S' and char_length(reply) <= 4000));

comment on table public.feedback is 'I commenti di chi prova Glifo: il browser li scrive e legge quelli visibili (solo tipo, nome, testo, data e risposta); tutto il resto si legge dalla dashboard.';
comment on column public.feedback.author is 'Il nome da mostrare con il commento, se chi scrive lo mette.';
comment on column public.feedback.visible is 'Si vede nella pagina «Commenti» di Glifo. Per nasconderlo: false.';
comment on column public.feedback.reply is 'La risposta di chi fa Glifo, sotto il commento nella pagina «Commenti».';

-- Chi scrive mette anche il nome e sceglie se farlo vedere; la risposta la scrive solo chi fa Glifo.
grant insert (author, visible) on public.feedback to anon, authenticated;

-- Le colonne che tutti leggono: mai email, sito, versione, browser e visible.
grant select (id, created_at, kind, author, message, reply) on public.feedback to anon, authenticated;

create policy "Chiunque legge i commenti visibili" on public.feedback
  for select to anon, authenticated
  using (visible);
