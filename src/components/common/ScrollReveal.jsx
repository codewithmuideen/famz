import { motion, useReducedMotion } from "framer-motion";

/**
 * Fade-up reveal that triggers once when the element enters the viewport.
 * Respects prefers-reduced-motion.
 */
export default function ScrollReveal({
  children,
  delay = 0,
  y = 24,
  className = "",
  as = "div",
  once = true,
}) {
  const shouldReduceMotion = useReducedMotion();
  const Component = motion[as] ?? motion.div;

  if (shouldReduceMotion) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}
