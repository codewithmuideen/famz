import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { siteConfig } from "../../constants/siteConfig";

export default function LoadingScreen({ onFinish }) {
  const [visible, setVisible] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setVisible(false);
      onFinish?.();
      return;
    }
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onFinish?.(), 500);
    }, 900);
    return () => clearTimeout(timer);
  }, [onFinish, shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-surface-dark"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <motion.span
            className="font-display text-2xl tracking-tight text-ink-inverse sm:text-3xl"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {siteConfig.shortName}
          </motion.span>
          <div className="h-[2px] w-40 overflow-hidden rounded-full bg-line-dark">
            <motion.div
              className="h-full bg-brand-gold"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              style={{ originX: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
