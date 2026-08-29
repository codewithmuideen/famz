import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDown, X, Mail, MapPin } from "lucide-react";
import { primaryNav, servicesMenu, industriesMenu, aboutMenu } from "../../constants/navigation";
import { siteConfig } from "../../constants/siteConfig";
import Button from "../common/Button";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";
import logoWhite from "../../assets/logos/logowhite.png";

const subMenus = {
  services: servicesMenu,
  industries: industriesMenu,
  about: aboutMenu,
};

function MobileAccordion({ item, onNavigate }) {
  const [open, setOpen] = useState(false);
  const subMenu = item.megaMenu ? subMenus[item.megaMenu] : null;

  if (!subMenu) {
    return (
      <Link
        to={item.path}
        onClick={onNavigate}
        className="flex items-center justify-between border-b border-line-dark py-5 text-xl text-ink-inverse"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="border-b border-line-dark">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-5 text-xl text-ink-inverse"
      >
        {item.label}
        <ChevronDown
          size={20}
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <ul className="flex flex-col gap-4 pb-6 pl-2">
              {subMenu.columns.flatMap((col) => col.items).map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    onClick={onNavigate}
                    className="text-base text-ink-inverse-muted transition-colors hover:text-ink-inverse"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function MobileMenu({ open, onClose, onOpenLocation }) {
  useLockBodyScroll(open);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex flex-col bg-surface-dark lg:hidden"
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="flex items-center justify-between border-b border-line-dark px-6 py-5">
            <img src={logoWhite} alt={siteConfig.name} className="h-7 w-auto object-contain" />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="rounded-full p-2 text-ink-inverse transition-colors hover:bg-surface-dark-alt"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-6">
            {primaryNav.map((item) => (
              <MobileAccordion key={item.label} item={item} onNavigate={onClose} />
            ))}
          </nav>

          <div className="flex flex-col gap-4 border-t border-line-dark px-6 py-6">
            <button
              type="button"
              onClick={() => {
                onOpenLocation();
                onClose();
              }}
              className="flex items-center gap-2 text-sm text-ink-inverse-muted"
            >
              <MapPin size={16} />
              Where we work
            </button>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="flex items-center gap-2 text-sm text-ink-inverse-muted"
            >
              <Mail size={16} />
              {siteConfig.contact.email}
            </a>
            <Button to="/contact" variant="secondary" onClick={onClose} className="mt-2 w-full justify-center">
              Get in touch
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
