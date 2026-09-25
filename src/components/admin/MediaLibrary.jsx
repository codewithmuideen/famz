import { useEffect, useRef, useState } from "react";
import { Trash2, Copy } from "lucide-react";
import { listMedia, uploadImage, deleteMedia } from "../../lib/uploadImage";

export default function MediaLibrary() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInput = useRef(null);

  const load = () => {
    setLoading(true);
    listMedia()
      .then(setItems)
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      await uploadImage(file);
      load();
    } finally {
      setUploading(false);
      if (fileInput.current) fileInput.current.value = "";
    }
  };

  const handleDelete = async (item) => {
    if (!confirm("Delete this image? Any page still referencing it will break.")) return;
    await deleteMedia(item.id, item.storage_path);
    setItems((prev) => prev.filter((i) => i.id !== item.id));
  };

  const copyUrl = (url) => navigator.clipboard.writeText(url);

  return (
    <div>
      <div className="mb-5 flex items-center gap-3">
        <button
          type="button"
          onClick={() => fileInput.current?.click()}
          disabled={uploading}
          className="rounded-full bg-brand-navy px-6 py-2.5 text-sm font-medium text-ink-inverse transition-colors hover:bg-brand-navy-light disabled:opacity-60"
        >
          {uploading ? "Uploading..." : "Upload image"}
        </button>
        <input ref={fileInput} type="file" accept="image/*" onChange={handleFile} className="hidden" />
      </div>

      {loading ? (
        <p className="text-sm text-ink-muted">Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-ink-muted">No images uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.id} className="border border-line bg-surface-white">
              <img src={item.url} alt={item.alt_text || ""} className="h-32 w-full object-cover" />
              <div className="flex items-center justify-between gap-2 p-2">
                <button
                  type="button"
                  onClick={() => copyUrl(item.url)}
                  title="Copy URL"
                  className="flex items-center gap-1 text-xs text-ink-muted hover:text-ink"
                >
                  <Copy size={13} /> Copy URL
                </button>
                <button type="button" onClick={() => handleDelete(item)} className="text-ink-soft hover:text-red-500">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
