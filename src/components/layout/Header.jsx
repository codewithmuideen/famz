import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Menu, Search, MapPin } from "lucide-react";
import { primaryNav } from "../../constants/navigation";
import { siteConfig } from "../../constants/siteConfig";
import { useScroll } from "../../hooks/useScroll";
import Button from "../common/Button";
import MegaMenu from "./MegaMenu";
import MobileMenu from "./MobileMenu";
import LocationSelector from "./LocationSelector";
import SearchOverlay from "./SearchOverlay";

export default function Header() {
  const scrolled = useScroll(24);
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveMenu(null);
        setSearchOpen(false);
        setLocationOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const isDark = !scrolled && activeMenu === null;

  return (
    <>
      <header
        ref={headerRef}
        onMouseLeave={() => setActiveMenu(null)}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled || activeMenu
            ? "bg-surface-white/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(11,35,64,0.08)]"
            : "bg-transparent"
        }`}
      >
        <div className="container-page flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-2" onClick={() => setActiveMenu(null)}>
            <span
              className={`font-display text-2xl tracking-tight transition-colors ${
                isDark ? "text-ink-inverse" : "text-ink"
              }`}
            >
              {siteConfig.shortName}
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {primaryNav.map((item) => (
              <div
                key={item.label}
                onMouseEnter={() => item.megaMenu && setActiveMenu(item.megaMenu)}
              >
                {item.megaMenu ? (
                  <button
                    type="button"
                    aria-expanded={activeMenu === item.megaMenu}
                    onClick={() =>
                      setActiveMenu((v) => (v === item.megaMenu ? null : item.megaMenu))
                    }
                    className={`text-sm font-medium transition-colors ${
                      isDark ? "text-ink-inverse hover:text-brand-gold-light" : "text-ink hover:text-brand-navy"
                    }`}
                  >
                    {item.label}
                  </button>
                ) : (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `text-sm font-medium transition-colors ${
                        isActive
                          ? isDark
                            ? "text-brand-gold-light"
                            : "text-brand-navy"
                          : isDark
                          ? "text-ink-inverse hover:text-brand-gold-light"
                          : "text-ink hover:text-brand-navy"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setLocationOpen(true)}
              aria-label="Where we work"
              className={`hidden rounded-full p-2 transition-colors sm:inline-flex ${
                isDark ? "text-ink-inverse hover:bg-white/10" : "text-ink hover:bg-surface-mist"
              }`}
            >
              <MapPin size={19} />
            </button>
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className={`rounded-full p-2 transition-colors ${
                isDark ? "text-ink-inverse hover:bg-white/10" : "text-ink hover:bg-surface-mist"
              }`}
            >
              <Search size={19} />
            </button>
            <div className="ml-2 hidden lg:block">
              <Button to="/contact" variant={isDark ? "light" : "primary"}>
                Get in touch
              </Button>
            </div>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className={`ml-1 rounded-full p-2 transition-colors lg:hidden ${
                isDark ? "text-ink-inverse hover:bg-white/10" : "text-ink hover:bg-surface-mist"
              }`}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {activeMenu && (
            <MegaMenu menuKey={activeMenu} onNavigate={() => setActiveMenu(null)} />
          )}
        </AnimatePresence>
      </header>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onOpenLocation={() => setLocationOpen(true)}
      />
      <LocationSelector open={locationOpen} onClose={() => setLocationOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
