import Seo from "../components/common/Seo";
import Breadcrumb from "../components/common/Breadcrumb";
import { siteConfig } from "../constants/siteConfig";

export default function PrivacyPolicy() {
  return (
    <>
      <Seo title="Privacy Policy" path="/privacy-policy" />
      <section className="bg-surface-white pt-32 pb-24 sm:pt-40">
        <div className="container-page">
          <Breadcrumb items={[{ label: "Privacy Policy" }]} />
          <div className="mx-auto mt-8 flex max-w-2xl flex-col gap-6">
            <h1 className="text-3xl text-ink sm:text-4xl">Privacy Policy</h1>
            <p className="text-sm text-ink-soft">Last updated: 17 August 2026</p>
            <p className="leading-relaxed text-ink-muted">
              {siteConfig.name} ("we", "us", "our") is committed to protecting your privacy. This
              policy explains what information we collect, how we use it, and the choices you
              have. This is placeholder content — replace with a policy reviewed by your data
              protection advisor before launch.
            </p>
            <h2 className="mt-4 text-xl text-ink">Information we collect</h2>
            <p className="leading-relaxed text-ink-muted">
              We collect information you provide directly to us, such as when you complete our
              contact form, together with limited technical data collected via cookies (see our
              cookie preferences) where you have consented to analytics or marketing cookies.
            </p>
            <h2 className="mt-4 text-xl text-ink">How we use your information</h2>
            <p className="leading-relaxed text-ink-muted">
              We use the information we collect to respond to enquiries, provide our services,
              and, where you've consented, to understand how our website is used.
            </p>
            <h2 className="mt-4 text-xl text-ink">Contact us</h2>
            <p className="leading-relaxed text-ink-muted">
              For any privacy-related questions, contact us at{" "}
              <a href={`mailto:${siteConfig.contact.email}`} className="text-brand-navy underline">
                {siteConfig.contact.email}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
