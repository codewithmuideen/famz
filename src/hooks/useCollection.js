import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

/**
 * Fetches published items from a `collections` row group (e.g. "services"),
 * falling back to the given static array if Supabase has no rows yet or is
 * unreachable — so pages never break before content has been migrated in.
 */
export function useCollection(collectionName, fallbackItems) {
  const [items, setItems] = useState(fallbackItems);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    supabase
      .from("collections")
      .select("*")
      .eq("collection", collectionName)
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .then(({ data, error }) => {
        if (!active) return;
        if (!error && data && data.length > 0) {
          setItems(data.map((row) => ({ ...row.data, id: row.id, slug: row.slug })));
        }
        setLoading(false);
      });

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionName]);

  return { items, loading };
}
