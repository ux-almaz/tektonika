import { motion, useReducedMotion } from "framer-motion";
import { revealTransition } from "@/lib/motion";

type BlurRevealTag = "h1" | "h2" | "h3" | "h4" | "p" | "span";

interface BlurRevealProps {
  text: string;
  className?: string;
  as?: BlurRevealTag;
  mode?: "words" | "chars";
  delay?: number;
  stagger?: number;
  once?: boolean;
  trigger?: "inView" | "immediate";
  inViewMargin?: string;
}

const childHidden = {
  words: { opacity: 0, y: 20, filter: "blur(8px)" },
  chars: { opacity: 0, y: 10, filter: "blur(8px)" },
} as const;

const BlurReveal = ({
  text,
  className,
  as,
  mode = "words",
  delay = 0,
  stagger = 0.04,
  once = true,
  trigger = "inView",
  inViewMargin = "-80px",
}: BlurRevealProps) => {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    if (as) {
      const StaticTag = as;
      return <StaticTag className={className}>{text}</StaticTag>;
    }
    return <div className={className}>{text}</div>;
  }

  const parts =
    mode === "words"
      ? text.split(/(\s+)/).filter((part) => part.length > 0)
      : [...text];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: childHidden[mode],
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: revealTransition(mode === "chars" ? 0.55 : 0.65),
    },
  };

  const motionProps =
    trigger === "immediate"
      ? { initial: "hidden" as const, animate: "visible" as const }
      : {
          initial: "hidden" as const,
          whileInView: "visible" as const,
          viewport: { once, margin: inViewMargin },
        };

  const content = parts.map((part, i) => {
    if (mode === "words" && /^\s+$/.test(part)) {
      return <span key={i}>{part}</span>;
    }
    return (
      <motion.span
        key={i}
        variants={itemVariants}
        className={mode === "words" ? "inline-block pr-[0.12em]" : "inline-block"}
        aria-hidden={mode === "chars"}
      >
        {part === " " ? "\u00a0" : part}
      </motion.span>
    );
  });

  if (!as) {
    return (
      <motion.div
        variants={containerVariants}
        className={className}
        aria-label={text}
        {...motionProps}
      >
        {content}
      </motion.div>
    );
  }

  const Tag = motion[as] as typeof motion.div;

  return (
    <Tag variants={containerVariants} className={className} aria-label={text} {...motionProps}>
      {content}
    </Tag>
  );
};

export default BlurReveal;
