import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

/**
 * Animated numeric counter that starts when scrolled into view.
 */
export default function StatCounter({ value, suffix = "", label, duration = 1.6, tone = "light" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const shouldReduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(shouldReduceMotion ? value : 0);

  useEffect(() => {
    if (!isInView || shouldReduceMotion) return;

    let raf;
    const start = performance.now();
    const from = 0;

    const tick = (now) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(from + (value - from) * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, value, duration, shouldReduceMotion]);

  const numberTone = tone === "dark" ? "text-ink-inverse" : "text-brand-navy";
  const labelTone = tone === "dark" ? "text-ink-inverse-muted" : "text-ink-muted";

  return (
    <motion.div
      ref={ref}
      className="flex flex-col gap-2"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <span className={`font-display text-4xl sm:text-5xl ${numberTone}`}>
        {display}
        {suffix}
      </span>
      <span className={`text-sm ${labelTone}`}>{label}</span>
    </motion.div>
  );
}
