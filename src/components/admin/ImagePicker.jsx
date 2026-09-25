import { useRef, useState } from "react";
import { uploadImage } from "../../lib/uploadImage";

/**
 * Shows the current image (bundled asset key or full URL), lets the admin
 * upload a replacement, or type an asset key / URL directly.
 */
export default function ImagePicker({ label, value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInput = useRef(null);

  const preview = value?.startsWith("http") ? value : null;

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const url = await uploadImage(file, label);
      onChange(url);
    } catch (err) {
      setError(err.message || "Upload failed.");
    } finally {
      setUploading(false);
      if (fileInput.current) fileInput.current.value = "";
    }
  };

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink">{label}</label>
      <div className="flex items-start gap-4">
        <div className="flex h-20 w-28 shrink-0 items-center justify-center overflow-hidden border border-line bg-surface-mist">
          {preview ? (
            <img src={preview} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="px-2 text-center text-[11px] text-ink-soft">{value || "no image"}</span>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <input
            type="text"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Asset key or image URL"
            className="w-full border border-line bg-surface-white px-3 py-2 text-sm outline-none transition-colors focus:border-brand-navy"
          />
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => fileInput.current?.click()}
              disabled={uploading}
              className="rounded-full border border-line px-4 py-1.5 text-xs text-ink transition-colors hover:border-brand-navy disabled:opacity-60"
            >
              {uploading ? "Uploading..." : "Upload new image"}
            </button>
            {error && <span className="text-xs text-red-500">{error}</span>}
          </div>
          <input ref={fileInput} type="file" accept="image/*" onChange={handleFile} className="hidden" />
        </div>
      </div>
    </div>
  );
}
