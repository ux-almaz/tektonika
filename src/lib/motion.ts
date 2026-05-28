export const motionEase = [0.22, 1, 0.36, 1] as [number, number, number, number];

export const motionEaseOut = motionEase;

/** Scroll reveal easing — nikitaolga-wedding.vercel.app */
export const weddingEase = [0.4, 0, 0.2, 1] as [number, number, number, number];

export const revealTransition = (
  duration = 0.7,
  delay = 0,
  ease: [number, number, number, number] = motionEase,
) => ({
  duration,
  delay,
  ease,
});

/** Плавное следование parallax за скроллом (Lenis + useSpring) */
export const parallaxSpring = {
  stiffness: 55,
  damping: 22,
  mass: 0.65,
  restDelta: 0.001,
};
