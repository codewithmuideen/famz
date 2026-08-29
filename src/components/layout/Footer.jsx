import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { FaLinkedinIn, FaXTwitter, FaFacebookF, FaInstagram } from "react-icons/fa6";
import { footerNav } from "../../constants/navigation";
import { siteConfig } from "../../constants/siteConfig";
import accaBadge from "../../assets/images/acca-badge.jpg";
import logoWhite from "../../assets/logos/logowhite.png";

const socialLinks = [
  { icon: FaLinkedinIn, href: siteConfig.social.linkedin, label: "LinkedIn" },
  { icon: FaXTwitter, href: siteConfig.social.twitter, label: "Twitter / X" },
  { icon: FaFacebookF, href: siteConfig.social.facebook, label: "Facebook" },
  { icon: FaInstagram, href: siteConfig.social.instagram, label: "Instagram" },
];

function FooterColumn({ title, links }) {
  return (
    <div>
      <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.15em] text-ink-inverse-muted">
        {title}
      </h3>
      <ul className="flex flex-col gap-3">
        {links.map((link) =>
          link.to === "#cookie-preferences" ? (
            <li key={link.label}>
              <button
                type="button"
                onClick={() =>
                  document.dispatchEvent(new CustomEvent("open-cookie-preferences"))
                }
                className="text-sm text-ink-inverse-muted transition-colors hover:text-ink-inverse"
              >
                {link.label}
              </button>
            </li>
          ) : (
            <li key={link.label}>
              <Link
                to={link.to}
                className="text-sm text-ink-inverse-muted transition-colors hover:text-ink-inverse"
              >
                {link.label}
              </Link>
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface-dark text-ink-inverse">
      <div className="container-page grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.4fr_2.6fr] lg:gap-8">
        <div className="flex flex-col gap-6">
          <Link to="/" className="flex w-fit items-center" aria-label={siteConfig.name}>
            <img src={logoWhite} alt={siteConfig.name} className="h-9 w-auto object-contain sm:h-11" />
          </Link>
          <p className="max-w-sm text-sm leading-relaxed text-ink-inverse-muted">
            {siteConfig.description}
          </p>
          <div className="flex items-center gap-2 text-sm text-ink-inverse-muted">
            <Mail size={16} />
            <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-ink-inverse">
              {siteConfig.contact.email}
            </a>
          </div>
          <div className="flex w-fit items-center gap-3 rounded-lg bg-surface-white p-2 pr-4">
            <img src={accaBadge} alt="ACCA — The Association of Chartered Certified Accountants" className="h-10 w-10 rounded" />
            <span className="text-xs font-medium leading-tight text-brand-navy">
              ACCA Regulated Firm
            </span>
          </div>
          <div className="flex items-center gap-3 pt-2">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line-dark text-ink-inverse-muted transition-colors hover:border-brand-gold hover:text-brand-gold-light"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <FooterColumn title="Services" links={footerNav.services} />
          <FooterColumn title="Industries" links={footerNav.industries} />
          <FooterColumn title="Company" links={footerNav.company} />
        </div>
      </div>

      <div className="border-t border-line-dark">
        <div className="container-page flex flex-col items-center justify-between gap-4 py-6 text-xs text-ink-inverse-muted sm:flex-row">
          <p>
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {footerNav.legal.map((link) => (
              <Link key={link.label} to={link.to} className="hover:text-ink-inverse">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
