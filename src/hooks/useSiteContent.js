import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

/**
 * Fetches an editable content block from Supabase (page + section_key),
 * falling back to `defaults` if no row exists yet or Supabase is unreachable.
 * This is what lets admin edits reflect on the live site without a rebuild.
 */
export function useSiteContent(page, sectionKey, defaults) {
  const [content, setContent] = useState(defaults);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    supabase
      .from("site_content")
      .select("content")
      .eq("page", page)
      .eq("section_key", sectionKey)
      .maybeSingle()
      .then(({ data, error }) => {
        if (!active) return;
        if (!error && data?.content && Object.keys(data.content).length > 0) {
          setContent({ ...defaults, ...data.content });
        }
        setLoading(false);
      });

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sectionKey]);

  return { content, loading };
}
