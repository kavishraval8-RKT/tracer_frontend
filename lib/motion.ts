const ease = [0.16, 1, 0.3, 1] as const;

/** Fade-up the first time an element scrolls into view. Spread onto a motion element. */
export const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, delay, ease },
});
