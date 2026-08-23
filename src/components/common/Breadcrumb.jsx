import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function Breadcrumb({ items = [], tone = "light" }) {
  const linkTone = tone === "dark" ? "text-ink-inverse-muted hover:text-ink-inverse" : "text-ink-muted hover:text-brand-navy";
  const currentTone = tone === "dark" ? "text-ink-inverse" : "text-ink";

  return (
    <nav aria-label="Breadcrumb" className="w-full">
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        <li>
          <Link to="/" className={`transition-colors ${linkTone}`}>
            Home
          </Link>
        </li>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-2">
              <ChevronRight size={14} className="text-ink-soft" aria-hidden="true" />
              {isLast || !item.to ? (
                <span className={currentTone} aria-current={isLast ? "page" : undefined}>
                  {item.label}
                </span>
              ) : (
                <Link to={item.to} className={`transition-colors ${linkTone}`}>
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
