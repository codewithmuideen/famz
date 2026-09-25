-- Fixes "permission denied for table ..." errors.
-- RLS policies control WHICH rows a role can touch, but Postgres also
-- requires base table grants before RLS is even evaluated — these were
-- missing from the first migration. Run this once.

grant usage on schema public to anon, authenticated;

grant select on site_content to anon, authenticated;
grant insert, update, delete on site_content to authenticated;

grant select on collections to anon, authenticated;
grant insert, update, delete on collections to authenticated;

grant select on media to anon, authenticated;
grant insert, update, delete on media to authenticated;
