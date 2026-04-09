import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StaggerChildrenProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  duration?: number;
  distance?: number;
}

const container = (staggerDelay: number) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
    },
  },
});

const item = (duration: number, distance: number) => ({
  hidden: { opacity: 0, y: distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
});

const StaggerChildren = ({
  children,
  className,
  staggerDelay = 0.12,
  duration = 0.7,
  distance = 50,
}: StaggerChildrenProps) => (
  <motion.div
    variants={container(staggerDelay)}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-60px" }}
    className={className}
  >
    {Array.isArray(children)
      ? children.map((child, i) => (
          <motion.div key={i} variants={item(duration, distance)}>
            {child}
          </motion.div>
        ))
      : children}
  </motion.div>
);

export default StaggerChildren;
