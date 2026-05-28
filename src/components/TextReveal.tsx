import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import { revealTransition } from "@/lib/motion";

type TextRevealTag = "h1" | "h2" | "h3" | "p" | "span";

interface TextRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  as?: TextRevealTag;
  blur?: boolean;
  inViewMargin?: string;
}

const TextReveal = ({
  children,
  className,
  delay = 0,
  duration = 0.85,
  as,
  blur = true,
  inViewMargin = "-60px",
}: TextRevealProps) => {
  const reduceMotion = useReducedMotion();

  const initial = blur && !reduceMotion
    ? { y: "100%", opacity: 0, filter: "blur(8px)" }
    : { y: "100%", opacity: 0 };

  const animate = blur && !reduceMotion
    ? { y: "0%", opacity: 1, filter: "blur(0px)" }
    : { y: "0%", opacity: 1 };

  if (reduceMotion) {
    if (!as) {
      return <div className={className}>{children}</div>;
    }
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const animated = (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: inViewMargin }}
      transition={revealTransition(duration, delay)}
      className={className}
    >
      {children}
    </motion.div>
  );

  if (!as) {
    return <div className="overflow-hidden">{animated}</div>;
  }

  const MotionTag = motion[as] as typeof motion.div;

  return (
    <div className="overflow-hidden">
      <MotionTag
        initial={initial}
        whileInView={animate}
        viewport={{ once: true, margin: inViewMargin }}
        transition={revealTransition(duration, delay)}
        className={className}
      >
        {children}
      </MotionTag>
    </div>
  );
};

export default TextReveal;
