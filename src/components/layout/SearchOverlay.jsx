import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { services } from "../../constants/services";
import { industries } from "../../constants/industries";
import { insights } from "../../constants/insights";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";

const searchableIndex = [
  ...services.map((s) => ({ label: s.title, to: `/services/${s.slug}`, type: "Service" })),
  ...industries.map((i) => ({ label: i.title, to: `/industries/${i.slug}`, type: "Industry" })),
  ...insights.map((a) => ({ label: a.title, to: `/insights/${a.slug}`, type: "Insight" })),
];

export default function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();
  useLockBodyScroll(open);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 300);
      return () => clearTimeout(t);
    }
    setQuery("");
  }, [open]);

  const results =
    query.trim().length > 0
      ? searchableIndex.filter((item) =>
          item.label.toLowerCase().includes(query.toLowerCase())
        )
      : [];

  const handleSelect = (to) => {
    onClose();
    navigate(to);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] bg-brand-navy-dark/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          onKeyDown={(e) => e.key === "Escape" && onClose()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Site search"
            className="mx-auto mt-24 w-full max-w-2xl px-4"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-line-dark bg-surface-white px-5 py-4">
              <Search size={20} className="text-ink-muted" aria-hidden="true" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search services, industries, insights…"
                aria-label="Search"
                className="flex-1 bg-transparent text-lg text-ink outline-none placeholder:text-ink-soft"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close search"
                className="rounded-full p-1 text-ink-muted transition-colors hover:bg-surface-mist hover:text-ink"
              >
                <X size={20} />
              </button>
            </div>

            {query.trim().length > 0 && (
              <div className="max-h-80 overflow-y-auto bg-surface-white">
                {results.length > 0 ? (
                  <ul>
                    {results.map((item) => (
                      <li key={item.to}>
                        <button
                          type="button"
                          onClick={() => handleSelect(item.to)}
                          className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-surface-cream"
                        >
                          <span className="text-ink">{item.label}</span>
                          <span className="text-xs uppercase tracking-wide text-ink-soft">
                            {item.type}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="px-5 py-8 text-center text-sm text-ink-muted">
                    No results for &ldquo;{query}&rdquo;. Try a service or industry name.
                  </p>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
