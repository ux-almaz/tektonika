import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import { motionEase, revealTransition } from "@/lib/motion";

interface StaggerChildrenProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  duration?: number;
  distance?: number;
  blur?: boolean;
  inViewMargin?: string;
}

const container = (staggerDelay: number) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
    },
  },
});

const item = (duration: number, distance: number, blur: boolean) => ({
  hidden: {
    opacity: 0,
    y: distance,
    ...(blur ? { filter: "blur(10px)" } : {}),
  },
  visible: {
    opacity: 1,
    y: 0,
    ...(blur ? { filter: "blur(0px)" } : {}),
    transition: {
      duration,
      ease: motionEase,
    },
  },
});

const StaggerChildren = ({
  children,
  className,
  staggerDelay = 0.1,
  duration = 0.7,
  distance = 50,
  blur = true,
  inViewMargin = "-80px",
}: StaggerChildrenProps) => {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={container(staggerDelay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: inViewMargin }}
      className={className}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={item(duration, distance, blur)}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
};

export default StaggerChildren;
