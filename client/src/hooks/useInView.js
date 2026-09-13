import { useEffect, useRef, useState } from "react";

/**
 * Returns [ref, inView].
 * When the element enters the viewport, inView becomes true.
 * Respects prefers-reduced-motion: immediately returns inView=true so no
 * animation classes are applied for users who prefer reduced motion.
 */
export function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (inView) return; // already visible (reduced-motion early exit or already triggered)
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [inView, threshold]);

  return [ref, inView];
}
