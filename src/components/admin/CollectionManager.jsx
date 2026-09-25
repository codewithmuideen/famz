import { useEffect, useState } from "react";
import { Plus, Trash2, Eye, EyeOff, ChevronDown, ChevronUp } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import SchemaForm from "./SchemaForm";

/**
 * Generic admin list+edit UI for one `collections` group (e.g. "services").
 * `schema` drives the form fields; `slugField` (optional) is copied into
 * the row's `slug` column so public pages can look items up by slug.
 * `titleField` picks which field to show in the list.
 */
export default function CollectionManager({ collectionName, schema, slugField, titleField, emptyItem }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState(null);
  const [drafts, setDrafts] = useState({});
  const [status, setStatus] = useState("");

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("collections")
      .select("*")
      .eq("collection", collectionName)
      .order("sort_order", { ascending: true });
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionName]);

  const openItem = (item) => {
    setOpenId(item.id);
    setDrafts((d) => ({ ...d, [item.id]: item.data }));
  };

  const handleAdd = async () => {
    const maxSort = items.reduce((m, i) => Math.max(m, i.sort_order), 0);
    const { data, error } = await supabase
      .from("collections")
      .insert({ collection: collectionName, data: emptyItem || {}, sort_order: maxSort + 1, published: true })
      .select()
      .single();
    if (!error) {
      setItems((prev) => [...prev, data]);
      openItem(data);
    }
  };

  const handleSave = async (item) => {
    setStatus("saving");
    const draft = drafts[item.id];
    const slug = slugField ? draft[slugField] : item.slug;
    const { error } = await supabase
      .from("collections")
      .update({ data: draft, slug })
      .eq("id", item.id);
    if (!error) {
      setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, data: draft, slug } : i)));
      setStatus("saved");
    } else {
      setStatus("error");
    }
    setTimeout(() => setStatus(""), 2000);
  };

  const handleDelete = async (item) => {
    if (!confirm("Delete this item? This can't be undone.")) return;
    await supabase.from("collections").delete().eq("id", item.id);
    setItems((prev) => prev.filter((i) => i.id !== item.id));
    if (openId === item.id) setOpenId(null);
  };

  const togglePublished = async (item) => {
    const { error } = await supabase
      .from("collections")
      .update({ published: !item.published })
      .eq("id", item.id);
    if (!error) {
      setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, published: !i.published } : i)));
    }
  };

  const move = async (item, direction) => {
    const idx = items.findIndex((i) => i.id === item.id);
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= items.length) return;
    const other = items[swapIdx];
    await supabase.from("collections").update({ sort_order: other.sort_order }).eq("id", item.id);
    await supabase.from("collections").update({ sort_order: item.sort_order }).eq("id", other.id);
    load();
  };

  if (loading) return <p className="text-sm text-ink-muted">Loading...</p>;

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => (
        <div key={item.id} className="border border-line bg-surface-white">
          <div className="flex items-center justify-between gap-3 px-5 py-3">
            <button
              type="button"
              onClick={() => (openId === item.id ? setOpenId(null) : openItem(item))}
              className="flex-1 text-left text-sm text-ink"
            >
              {item.data[titleField] || "(untitled)"}
              {!item.published && <span className="ml-2 text-xs text-ink-soft">(hidden)</span>}
            </button>
            <div className="flex items-center gap-1.5">
              <button type="button" onClick={() => move(item, "up")} disabled={i === 0} className="p-1.5 text-ink-soft hover:text-ink disabled:opacity-30">
                <ChevronUp size={15} />
              </button>
              <button type="button" onClick={() => move(item, "down")} disabled={i === items.length - 1} className="p-1.5 text-ink-soft hover:text-ink disabled:opacity-30">
                <ChevronDown size={15} />
              </button>
              <button type="button" onClick={() => togglePublished(item)} title={item.published ? "Hide from site" : "Publish to site"} className="p-1.5 text-ink-soft hover:text-ink">
                {item.published ? <Eye size={15} /> : <EyeOff size={15} />}
              </button>
              <button type="button" onClick={() => handleDelete(item)} className="p-1.5 text-ink-soft hover:text-red-500">
                <Trash2 size={15} />
              </button>
            </div>
          </div>

          {openId === item.id && (
            <div className="border-t border-line p-5">
              <SchemaForm
                schema={schema}
                value={drafts[item.id] || {}}
                onChange={(v) => setDrafts((d) => ({ ...d, [item.id]: v }))}
              />
              <div className="mt-5 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleSave(item)}
                  disabled={status === "saving"}
                  className="rounded-full bg-brand-navy px-6 py-2.5 text-sm font-medium text-ink-inverse transition-colors hover:bg-brand-navy-light disabled:opacity-60"
                >
                  {status === "saving" ? "Saving..." : "Save"}
                </button>
                {status === "saved" && <span className="text-sm text-brand-gold">Saved.</span>}
                {status === "error" && <span className="text-sm text-red-500">Something went wrong.</span>}
              </div>
            </div>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={handleAdd}
        className="flex items-center justify-center gap-2 border border-dashed border-line py-4 text-sm text-ink-muted transition-colors hover:border-brand-navy hover:text-brand-navy"
      >
        <Plus size={16} /> Add new
      </button>
    </div>
  );
}
