import Seo from "../components/common/Seo";
import Breadcrumb from "../components/common/Breadcrumb";
import { siteConfig } from "../constants/siteConfig";

export default function Terms() {
  return (
    <>
      <Seo title="Terms of Use" path="/terms" />
      <section className="bg-surface-white pt-32 pb-24 sm:pt-40">
        <div className="container-page">
          <Breadcrumb items={[{ label: "Terms of Use" }]} />
          <div className="mx-auto mt-8 flex max-w-2xl flex-col gap-6">
            <h1 className="text-3xl text-ink sm:text-4xl">Terms of Use</h1>
            <p className="text-sm text-ink-soft">Last updated: 17 August 2026</p>
            <p className="leading-relaxed text-ink-muted">
              These terms govern your use of the {siteConfig.name} website. This is placeholder
              content — replace with terms reviewed by your legal advisor before launch.
            </p>
            <h2 className="mt-4 text-xl text-ink">Use of this site</h2>
            <p className="leading-relaxed text-ink-muted">
              Content on this site is provided for general informational purposes only and does
              not constitute formal accounting, tax or legal advice. You should seek advice
              specific to your circumstances before acting on any information found here.
            </p>
            <h2 className="mt-4 text-xl text-ink">Intellectual property</h2>
            <p className="leading-relaxed text-ink-muted">
              All content on this site, including text, graphics and logos, is the property of{" "}
              {siteConfig.name} unless otherwise stated.
            </p>
            <h2 className="mt-4 text-xl text-ink">Contact us</h2>
            <p className="leading-relaxed text-ink-muted">
              Questions about these terms can be sent to{" "}
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
