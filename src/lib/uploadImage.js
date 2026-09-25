import { supabase } from "./supabaseClient";

/**
 * Uploads a file to the "media" Storage bucket, records it in the `media`
 * table, and returns its public URL — ready to use as an image `src`.
 */
export async function uploadImage(file, altText = "") {
  const ext = file.name.split(".").pop();
  const path = `${crypto.randomUUID()}.${ext}`;

  const { error: uploadError } = await supabase.storage.from("media").upload(path, file);
  if (uploadError) throw uploadError;

  const { data: publicUrlData } = supabase.storage.from("media").getPublicUrl(path);
  const url = publicUrlData.publicUrl;

  await supabase.from("media").insert({ storage_path: path, url, alt_text: altText });

  return url;
}

export async function listMedia() {
  const { data, error } = await supabase
    .from("media")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function deleteMedia(id, storagePath) {
  await supabase.storage.from("media").remove([storagePath]);
  await supabase.from("media").delete().eq("id", id);
}
