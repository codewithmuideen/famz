import ImagePicker from "./ImagePicker";
import { iconMap } from "../../constants/iconMap";

const iconNames = Object.keys(iconMap);

/**
 * Renders an editable form from a field schema: [{ key, label, type }].
 * Supported types: text, textarea, boolean, image, icon,
 * list (newline-separated strings), tags (comma-separated strings).
 */
export default function SchemaForm({ schema, value, onChange }) {
  const set = (key, v) => onChange({ ...value, [key]: v });

  return (
    <div className="flex flex-col gap-5">
      {schema.map((field) => {
        const current = value[field.key];

        if (field.type === "image") {
          return (
            <ImagePicker
              key={field.key}
              label={field.label}
              value={current}
              onChange={(v) => set(field.key, v)}
            />
          );
        }

        if (field.type === "boolean") {
          return (
            <label key={field.key} className="flex items-center gap-2 text-sm text-ink">
              <input
                type="checkbox"
                checked={Boolean(current)}
                onChange={(e) => set(field.key, e.target.checked)}
              />
              {field.label}
            </label>
          );
        }

        if (field.type === "icon") {
          return (
            <div key={field.key}>
              <label className="mb-1.5 block text-sm font-medium text-ink">{field.label}</label>
              <select
                value={current || ""}
                onChange={(e) => set(field.key, e.target.value)}
                className="w-full border border-line bg-surface-white px-3 py-2.5 text-sm outline-none focus:border-brand-navy"
              >
                <option value="">Select an icon</option>
                {iconNames.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          );
        }

        if (field.type === "list" || field.type === "tags") {
          const text = Array.isArray(current)
            ? current.join(field.type === "tags" ? ", " : "\n")
            : "";
          return (
            <div key={field.key}>
              <label className="mb-1.5 block text-sm font-medium text-ink">
                {field.label}
                <span className="ml-1.5 font-normal text-ink-soft">
                  ({field.type === "tags" ? "comma-separated" : "one per line"})
                </span>
              </label>
              <textarea
                rows={field.type === "tags" ? 2 : 6}
                defaultValue={text}
                onBlur={(e) => {
                  const raw = e.target.value;
                  const items =
                    field.type === "tags"
                      ? raw.split(",").map((s) => s.trim()).filter(Boolean)
                      : raw.split("\n").map((s) => s.trim()).filter(Boolean);
                  set(field.key, items);
                }}
                className="w-full border border-line bg-surface-white px-3 py-2.5 text-sm outline-none focus:border-brand-navy"
              />
            </div>
          );
        }

        if (field.type === "textarea") {
          return (
            <div key={field.key}>
              <label className="mb-1.5 block text-sm font-medium text-ink">{field.label}</label>
              <textarea
                rows={4}
                value={current || ""}
                onChange={(e) => set(field.key, e.target.value)}
                className="w-full border border-line bg-surface-white px-3 py-2.5 text-sm outline-none focus:border-brand-navy"
              />
            </div>
          );
        }

        return (
          <div key={field.key}>
            <label className="mb-1.5 block text-sm font-medium text-ink">{field.label}</label>
            <input
              type="text"
              value={current || ""}
              onChange={(e) => set(field.key, e.target.value)}
              className="w-full border border-line bg-surface-white px-3 py-2.5 text-sm outline-none focus:border-brand-navy"
            />
          </div>
        );
      })}
    </div>
  );
}
