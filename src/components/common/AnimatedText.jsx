import { motion, useReducedMotion } from "framer-motion";

/**
 * Splits text into words and staggers them upward on mount — used for hero headlines.
 */
export default function AnimatedText({ text, className = "", delay = 0, as = "h1" }) {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(" ");
  const Tag = as;

  if (shouldReduceMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline">
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
            <motion.span
              className="inline-block"
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{
                duration: 0.7,
                delay: delay + i * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}&nbsp;
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
