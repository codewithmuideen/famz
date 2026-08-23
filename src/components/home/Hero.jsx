import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import AnimatedText from "../common/AnimatedText";
import Button from "../common/Button";
import ImageReveal from "../common/ImageReveal";
import { siteConfig } from "../../constants/siteConfig";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-[92vh] items-end overflow-hidden bg-surface-dark pt-32">
      <div className="absolute inset-0">
        <ImageReveal
          src="hero-finance-district"
          alt="City financial district skyline representing UK and international business"
          effect="fade"
          className="h-full w-full"
          hoverZoom={false}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-dark via-brand-navy-dark/80 to-brand-navy-dark/40" />
      </div>

      <div className="container-page relative flex flex-col gap-8 pb-20 sm:pb-28">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold-light">
          Chartered Accountants &middot; ACCA Regulated
        </span>

        <AnimatedText
          text={siteConfig.tagline}
          as="h1"
          className="max-w-4xl text-balance text-4xl leading-[1.05] text-ink-inverse sm:text-5xl lg:text-6xl xl:text-7xl"
        />

        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-xl text-balance text-lg leading-relaxed text-ink-inverse-muted"
        >
          Practical accounting, tax and business advisory for individuals and ambitious
          businesses across the UK and internationally.
        </motion.p>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-wrap gap-4"
        >
          <Button to="/contact" variant="secondary" size="lg">
            Get in touch
          </Button>
          <Button to="/services" variant="light" size="lg">
            Explore our services
          </Button>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 sm:block"
        animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="text-ink-inverse-muted" size={24} aria-hidden="true" />
      </motion.div>
    </section>
  );
}
