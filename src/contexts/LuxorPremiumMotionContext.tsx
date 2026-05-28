import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "framer-motion";
import { createContext, useContext, type ReactNode } from "react";

const LuxorPremiumMotionContext = createContext(false);

export const useLuxorPremiumMotion = () => useContext(LuxorPremiumMotionContext);

const lenisOptions = {
  duration: 1.35,
  easing: (t: number) => 1 - Math.pow(1 - t, 3),
  orientation: "vertical" as const,
  smoothWheel: true,
  wheelMultiplier: 0.9,
  touchMultiplier: 1.15,
};

export const LuxorPremiumMotionProvider = ({ children }: { children: ReactNode }) => {
  const reduceMotion = useReducedMotion();

  const content = (
    <LuxorPremiumMotionContext.Provider value={true}>{children}</LuxorPremiumMotionContext.Provider>
  );

  if (reduceMotion) {
    return content;
  }

  return (
    <ReactLenis root options={lenisOptions}>
      {content}
    </ReactLenis>
  );
};
