import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, MapPin } from "lucide-react";
import { locationSelectorData } from "../../constants/navigation";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";

export default function LocationSelector({ open, onClose }) {
  useLockBodyScroll(open);
  const [query, setQuery] = useState("");

  const filtered = locationSelectorData
    .map((group) => ({
      ...group,
      countries: group.countries.filter((c) =>
        c.toLowerCase().includes(query.toLowerCase())
      ),
    }))
    .filter((group) => group.countries.length > 0 || query === "");

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center bg-brand-navy-dark/60 backdrop-blur-sm sm:pt-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          onKeyDown={(e) => e.key === "Escape" && onClose()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Select region"
            className="max-h-[80vh] w-full max-w-2xl overflow-y-auto bg-surface-white p-8 sm:rounded-lg"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl text-ink">Where we work</h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close region selector"
                className="rounded-full p-2 text-ink-muted transition-colors hover:bg-surface-mist hover:text-ink"
              >
                <X size={20} />
              </button>
            </div>

            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a country or region"
              className="mb-8 w-full border border-line bg-surface-cream px-4 py-3 text-sm outline-none transition-colors focus:border-brand-navy"
            />

            <div className="grid gap-8 sm:grid-cols-2">
              {filtered.map((group) => (
                <div key={group.region}>
                  <h3 className="mb-1 flex items-center gap-2 text-sm font-semibold text-ink">
                    <MapPin size={14} className="text-brand-gold" />
                    {group.region}
                  </h3>
                  <p className="mb-3 text-xs text-ink-muted">{group.description}</p>
                  <ul className="flex flex-col gap-2">
                    {group.countries.map((country) => (
                      <li key={country} className="text-sm text-ink-muted">
                        {country}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {filtered.length === 0 && (
                <p className="text-sm text-ink-muted">No matching regions found.</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
