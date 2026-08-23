import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { getImage } from "../../assets/images";

const variants = {
  "clip-left": {
    hidden: { clipPath: "inset(0 100% 0 0)" },
    visible: { clipPath: "inset(0 0% 0 0)" },
  },
  "clip-bottom": {
    hidden: { clipPath: "inset(0 0 100% 0)" },
    visible: { clipPath: "inset(0 0 0% 0)" },
  },
  scale: {
    hidden: { opacity: 0, scale: 1.12 },
    visible: { opacity: 1, scale: 1 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

/**
 * Reusable image reveal: pass `effect` = "clip-left" | "clip-bottom" | "scale" | "fade".
 * `src` accepts either an asset registry key or a direct URL.
 */
export default function ImageReveal({
  src,
  alt,
  effect = "clip-bottom",
  className = "",
  imgClassName = "",
  delay = 0,
  hoverZoom = true,
  priority = false,
}) {
  const shouldReduceMotion = useReducedMotion();
  const resolvedSrc = getImage(src) ?? src;
  const variant = variants[effect] ?? variants.fade;
  const loading = priority ? "eager" : "lazy";
  const fetchPriority = priority ? "high" : "auto";

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [forceShow, setForceShow] = useState(priority);

  // Safety net: guarantee the image becomes visible even if the
  // viewport-intersection trigger is ever missed (observer quirks,
  // extensions, etc.) — a reveal effect should never leave content hidden.
  useEffect(() => {
    if (shouldReduceMotion || inView || forceShow) return;
    const timer = setTimeout(() => setForceShow(true), 1200);
    return () => clearTimeout(timer);
  }, [shouldReduceMotion, inView, forceShow]);

  if (shouldReduceMotion) {
    return (
      <div className={`overflow-hidden ${className}`}>
        <img
          src={resolvedSrc}
          alt={alt}
          loading={loading}
          fetchPriority={fetchPriority}
          className={`h-full w-full object-cover ${imgClassName}`}
        />
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden ${className}`}
      initial="hidden"
      animate={inView || forceShow ? "visible" : "hidden"}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      variants={variant}
    >
      <motion.img
        src={resolvedSrc}
        alt={alt}
        loading={loading}
        fetchPriority={fetchPriority}
        className={`h-full w-full object-cover ${imgClassName}`}
        whileHover={hoverZoom ? { scale: 1.05 } : undefined}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  );
}
