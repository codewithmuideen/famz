import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Search, CornerDownLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { services as fallbackServices } from "../../constants/services";
import { industries as fallbackIndustries } from "../../constants/industries";
import { insights as fallbackInsights } from "../../constants/insights";
import { useCollection } from "../../hooks/useCollection";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";

const staticPages = [
  { label: "Home", to: "/", type: "Page", keywords: "homepage start" },
  { label: "Services", to: "/services", type: "Page", keywords: "what we do accounting tax" },
  { label: "Industries", to: "/industries", type: "Page", keywords: "sectors" },
  { label: "Insights", to: "/insights", type: "Page", keywords: "articles blog news" },
  { label: "Careers", to: "/careers", type: "Page", keywords: "jobs work with us vacancies" },
  { label: "Who We Are", to: "/who-we-are", type: "Page", keywords: "story values team approach" },
  { label: "About Us", to: "/about", type: "Page", keywords: "founder faq promise" },
  { label: "Locations", to: "/locations", type: "Page", keywords: "where we work regions" },
  { label: "Contact", to: "/contact", type: "Page", keywords: "get in touch email phone enquiry" },
  { label: "Privacy Policy", to: "/privacy-policy", type: "Page", keywords: "data cookies" },
  { label: "Terms of Use", to: "/terms", type: "Page", keywords: "legal" },
];

const MAX_RESULTS = 8;

function rankMatch(item, needle) {
  const label = item.label.toLowerCase();
  if (label === needle) return 0;
  if (label.startsWith(needle)) return 1;
  if (label.includes(needle)) return 2;
  if (item.keywords && item.keywords.toLowerCase().includes(needle)) return 3;
  return -1;
}

function highlight(label, needle) {
  if (!needle) return label;
  const idx = label.toLowerCase().indexOf(needle.toLowerCase());
  if (idx === -1) return label;
  return (
    <>
      {label.slice(0, idx)}
      <mark className="rounded-sm bg-brand-gold-light text-ink">
        {label.slice(idx, idx + needle.length)}
      </mark>
      {label.slice(idx + needle.length)}
    </>
  );
}

export default function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  useLockBodyScroll(open);

  const { items: services } = useCollection("services", fallbackServices);
  const { items: industries } = useCollection("industries", fallbackIndustries);
  const { items: insights } = useCollection("insights", fallbackInsights);

  const searchableIndex = useMemo(
    () => [
      ...staticPages,
      ...services.map((s) => ({ label: s.title, to: `/services/${s.slug}`, type: "Service", keywords: s.shortDescription })),
      ...industries.map((i) => ({ label: i.title, to: `/industries/${i.slug}`, type: "Industry", keywords: i.shortDescription })),
      ...insights.map((a) => ({ label: a.title, to: `/insights/${a.slug}`, type: "Insight", keywords: a.excerpt })),
    ],
    [services, industries, insights]
  );

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 300);
      return () => clearTimeout(t);
    }
    setQuery("");
    setActiveIndex(0);
  }, [open]);

  const needle = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!needle) return [];
    return searchableIndex
      .map((item) => ({ item, rank: rankMatch(item, needle) }))
      .filter((r) => r.rank >= 0)
      .sort((a, b) => a.rank - b.rank)
      .slice(0, MAX_RESULTS)
      .map((r) => r.item);
  }, [searchableIndex, needle]);

  useEffect(() => {
    setActiveIndex(0);
  }, [needle]);

  const handleSelect = (to) => {
    onClose();
    navigate(to);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
      return;
    }
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleSelect(results[activeIndex].to);
    }
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
          onKeyDown={handleKeyDown}
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
                placeholder="Search pages, services, industries, insights…"
                aria-label="Search"
                role="combobox"
                aria-expanded={results.length > 0}
                aria-activedescendant={results.length ? `search-result-${activeIndex}` : undefined}
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

            {needle.length > 0 && (
              <div className="max-h-96 overflow-y-auto bg-surface-white shadow-card-hover">
                {results.length > 0 ? (
                  <ul role="listbox">
                    {results.map((item, i) => (
                      <li key={item.to} id={`search-result-${i}`} role="option" aria-selected={i === activeIndex}>
                        <button
                          type="button"
                          onClick={() => handleSelect(item.to)}
                          onMouseEnter={() => setActiveIndex(i)}
                          className={`flex w-full items-start justify-between gap-4 px-5 py-4 text-left transition-colors ${
                            i === activeIndex ? "bg-surface-cream" : "hover:bg-surface-cream"
                          }`}
                        >
                          <span className="min-w-0">
                            <span className="block text-ink">{highlight(item.label, needle)}</span>
                            {item.keywords && (
                              <span className="mt-0.5 block truncate text-xs text-ink-soft">
                                {item.keywords}
                              </span>
                            )}
                          </span>
                          <span className="flex shrink-0 items-center gap-2">
                            <span className="text-xs uppercase tracking-wide text-ink-soft">
                              {item.type}
                            </span>
                            {i === activeIndex && (
                              <CornerDownLeft size={14} className="text-ink-soft" aria-hidden="true" />
                            )}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="px-5 py-8 text-center text-sm text-ink-muted">
                    No results for &ldquo;{query}&rdquo;. Try a page, service or industry name.
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
