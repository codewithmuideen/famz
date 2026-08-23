import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { servicesMenu, industriesMenu, aboutMenu } from "../../constants/navigation";
import ImageReveal from "../common/ImageReveal";

const menus = {
  services: servicesMenu,
  industries: industriesMenu,
  about: aboutMenu,
};

export default function MegaMenu({ menuKey, onNavigate }) {
  const menu = menus[menuKey];
  if (!menu) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-x-0 top-full max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-line bg-surface-white shadow-card-hover"
      role="menu"
    >
      <div className="container-page grid gap-12 py-12 lg:grid-cols-[2.2fr_1fr]">
        <div>
          <p className="mb-8 max-w-md text-sm leading-relaxed text-ink-muted">
            {menu.description}
          </p>
          <div className="grid gap-10 sm:grid-cols-2">
            {menu.columns.map((column) => (
              <div key={column.title}>
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-ink-soft">
                  {column.title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {column.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        to={item.to}
                        onClick={onNavigate}
                        className="group inline-flex items-center gap-2 text-[15px] text-ink transition-colors hover:text-brand-navy"
                      >
                        {item.label}
                        <ArrowRight
                          size={14}
                          className="opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Link
          to={menu.featured.to}
          onClick={onNavigate}
          className="group flex flex-col justify-between gap-5 bg-surface-cream p-6 transition-colors hover:bg-brand-navy"
        >
          {menu.featured.image && (
            <ImageReveal
              src={menu.featured.image}
              alt=""
              effect="fade"
              hoverZoom={false}
              className="aspect-[16/10] w-full"
            />
          )}
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-gold">
              {menu.featured.label}
            </span>
            <h3 className="mt-3 text-lg leading-snug text-ink transition-colors group-hover:text-ink-inverse">
              {menu.featured.title}
            </h3>
          </div>
          <span className="inline-flex items-center gap-2 text-sm font-medium text-brand-navy transition-colors group-hover:text-ink-inverse">
            {menu.featured.cta}
            <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        </Link>
      </div>
    </motion.div>
  );
}
