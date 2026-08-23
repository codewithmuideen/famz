import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Button from "../common/Button";

const STORAGE_KEY = "dieux-cookie-consent";

const defaultPreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  preferences: false,
};

const categories = [
  {
    key: "necessary",
    title: "Necessary",
    description: "Required for the site to function. Cannot be disabled.",
    locked: true,
  },
  {
    key: "analytics",
    title: "Analytics",
    description: "Helps us understand how visitors use the site so we can improve it.",
  },
  {
    key: "marketing",
    title: "Marketing",
    description: "Used to measure the effectiveness of our outreach and content.",
  },
  {
    key: "preferences",
    title: "Preferences",
    description: "Remembers choices you make to personalise your visit.",
  },
];

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [prefs, setPrefs] = useState(defaultPreferences);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setVisible(true);
    }

    const openPreferences = () => {
      setVisible(true);
      setShowPreferences(true);
    };
    document.addEventListener("open-cookie-preferences", openPreferences);
    return () => document.removeEventListener("open-cookie-preferences", openPreferences);
  }, []);

  const save = (nextPrefs) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextPrefs));
    setVisible(false);
    setShowPreferences(false);
  };

  const acceptAll = () => save({ necessary: true, analytics: true, marketing: true, preferences: true });
  const rejectOptional = () => save(defaultPreferences);
  const saveCustom = () => save(prefs);

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-x-0 bottom-0 z-[80] p-4 sm:p-6"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mx-auto w-full max-w-4xl border border-line bg-surface-white p-6 shadow-card-hover sm:p-8">
          {!showPreferences ? (
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm leading-relaxed text-ink-muted">
                We use cookies to run this site and, with your permission, to understand how it's
                used. You can accept all cookies, reject optional ones, or choose your
                preferences.
              </p>
              <div className="flex shrink-0 flex-wrap gap-3">
                <Button variant="text" icon={false} onClick={() => setShowPreferences(true)}>
                  Preferences
                </Button>
                <Button variant="outline" icon={false} size="md" onClick={rejectOptional}>
                  Reject optional
                </Button>
                <Button variant="primary" icon={false} size="md" onClick={acceptAll}>
                  Accept all
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg text-ink">Cookie preferences</h2>
                <button
                  type="button"
                  onClick={() => setShowPreferences(false)}
                  aria-label="Close preferences"
                  className="rounded-full p-1 text-ink-muted hover:bg-surface-mist"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="flex flex-col gap-4">
                {categories.map((cat) => (
                  <label
                    key={cat.key}
                    className="flex items-start justify-between gap-4 border-b border-line pb-4 last:border-b-0"
                  >
                    <div>
                      <p className="text-sm font-medium text-ink">{cat.title}</p>
                      <p className="text-xs text-ink-muted">{cat.description}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={prefs[cat.key]}
                      disabled={cat.locked}
                      onChange={(e) =>
                        setPrefs((p) => ({ ...p, [cat.key]: e.target.checked }))
                      }
                      className="mt-1 h-5 w-5 shrink-0 accent-brand-navy disabled:opacity-50"
                    />
                  </label>
                ))}
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <Button variant="outline" icon={false} size="md" onClick={rejectOptional}>
                  Reject optional
                </Button>
                <Button variant="primary" icon={false} size="md" onClick={saveCustom}>
                  Save preferences
                </Button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
