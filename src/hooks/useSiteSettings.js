import { useSiteContent } from "./useSiteContent";
import { siteConfig } from "../constants/siteConfig";

const defaults = {
  description: siteConfig.description,
  email: siteConfig.contact.email,
  phoneDisplay: siteConfig.contact.phoneDisplay,
  phoneHref: siteConfig.contact.phoneHref,
  addressLine1: siteConfig.contact.addressLine1,
  addressLine2: siteConfig.contact.addressLine2,
  linkedin: siteConfig.social.linkedin,
  twitter: siteConfig.social.twitter,
};

/** Editable contact details + social links, shared across Footer, Contact and the mobile menu. */
export function useSiteSettings() {
  return useSiteContent("global", "settings", defaults);
}
