import { motion, useReducedMotion, Variants } from "framer-motion";
import { ReactNode } from "react";
import { motionEase, revealTransition, weddingEase } from "@/lib/motion";

type RevealDirection = "up" | "down" | "left" | "right" | "scale" | "none";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: RevealDirection;
  duration?: number;
  distance?: number;
  once?: boolean;
  blur?: boolean;
  inViewMargin?: string;
  ease?: [number, number, number, number];
}

const getVariants = (
  direction: RevealDirection,
  distance: number,
  blur: boolean,
): Variants => {
  const hidden: Record<string, number | string> = { opacity: 0 };
  const visible: Record<string, number | string> = { opacity: 1 };

  if (blur) {
    hidden.filter = "blur(12px)";
    visible.filter = "blur(0px)";
  }

  switch (direction) {
    case "up":
      hidden.y = distance;
      visible.y = 0;
      break;
    case "down":
      hidden.y = -distance;
      visible.y = 0;
      break;
    case "left":
      hidden.x = distance;
      visible.x = 0;
      break;
    case "right":
      hidden.x = -distance;
      visible.x = 0;
      break;
    case "scale":
      hidden.scale = 0.94;
      visible.scale = 1;
      break;
    case "none":
      break;
  }

  return { hidden, visible };
};

const ScrollReveal = ({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.85,
  distance = 60,
  once = true,
  blur = true,
  inViewMargin = "-80px",
  ease = motionEase,
}: ScrollRevealProps) => {
  const reduceMotion = useReducedMotion();
  const variants = getVariants(direction, distance, blur && !reduceMotion);

  if (reduceMotion) {
    return <motion.div className={className}>{children}</motion.div>;
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: inViewMargin }}
      transition={revealTransition(duration, delay, ease)}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
