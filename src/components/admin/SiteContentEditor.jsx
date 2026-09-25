import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import SchemaForm from "./SchemaForm";

/**
 * Generic editor for a single site_content row (page + section_key),
 * rendered from a field schema. Used for one-off blocks like the founder
 * bio or the locations "home base" summary.
 */
export default function SiteContentEditor({ page, sectionKey, schema, defaults, title }) {
  const [value, setValue] = useState(defaults);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  useEffect(() => {
    supabase
      .from("site_content")
      .select("content")
      .eq("page", page)
      .eq("section_key", sectionKey)
      .maybeSingle()
      .then(({ data }) => {
        if (data?.content && Object.keys(data.content).length > 0) {
          setValue({ ...defaults, ...data.content });
        }
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sectionKey]);

  const handleSave = async () => {
    setStatus("saving");
    const { error } = await supabase
      .from("site_content")
      .upsert({ page, section_key: sectionKey, content: value }, { onConflict: "page,section_key" });
    setStatus(error ? "error" : "saved");
    setTimeout(() => setStatus(""), 2500);
  };

  if (loading) return <p className="text-sm text-ink-muted">Loading...</p>;

  return (
    <section className="border border-line bg-surface-white p-7">
      {title && <h2 className="mb-5 text-lg text-ink">{title}</h2>}
      <SchemaForm schema={schema} value={value} onChange={setValue} />
      <div className="mt-5 flex items-center gap-3">
        <button
          type="button"
          onClick={handleSave}
          disabled={status === "saving"}
          className="w-fit rounded-full bg-brand-navy px-6 py-2.5 text-sm font-medium text-ink-inverse transition-colors hover:bg-brand-navy-light disabled:opacity-60"
        >
          {status === "saving" ? "Saving..." : "Save changes"}
        </button>
        {status === "saved" && <span className="text-sm text-brand-gold">Saved.</span>}
        {status === "error" && <span className="text-sm text-red-500">Something went wrong.</span>}
      </div>
    </section>
  );
}
