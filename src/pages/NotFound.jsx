import Seo from "../components/common/Seo";
import Button from "../components/common/Button";
import ScrollReveal from "../components/common/ScrollReveal";

export default function NotFound() {
  return (
    <>
      <Seo title="Page Not Found" path="/404" />
      <section className="flex min-h-[80vh] items-center bg-surface-white py-24">
        <div className="container-page">
          <ScrollReveal className="mx-auto flex max-w-lg flex-col items-center gap-6 text-center">
            <span className="font-display text-7xl text-brand-navy sm:text-8xl">404</span>
            <h1 className="text-balance text-3xl leading-tight text-ink sm:text-4xl">
              We couldn't find that page
            </h1>
            <p className="text-ink-muted">
              The page you're looking for may have moved or no longer exists. Try heading back
              home, or explore our services.
            </p>
            <div className="mt-2 flex flex-wrap justify-center gap-4">
              <Button to="/" variant="primary">
                Back to home
              </Button>
              <Button to="/contact" variant="outline">
                Contact us
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
