-- Run this AFTER creating a bucket named "media" in Storage -> New bucket.
-- Create it as a PUBLIC bucket (toggle on) so images can be shown on the
-- live site without needing signed URLs.

create policy "media bucket: public read"
  on storage.objects for select
  using (bucket_id = 'media');

create policy "media bucket: admins can upload"
  on storage.objects for insert
  with check (bucket_id = 'media' and is_admin());

create policy "media bucket: admins can update"
  on storage.objects for update
  using (bucket_id = 'media' and is_admin())
  with check (bucket_id = 'media' and is_admin());

create policy "media bucket: admins can delete"
  on storage.objects for delete
  using (bucket_id = 'media' and is_admin());
