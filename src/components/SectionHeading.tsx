import { motion } from "framer-motion";
import BlurReveal from "./BlurReveal";
import { revealTransition } from "@/lib/motion";

interface SectionHeadingProps {
  title: string;
  rightElement?: React.ReactNode;
  as?: "h2" | "h3" | "span";
  hideBar?: boolean;
  small?: boolean;
}

const SectionHeading = ({
  title,
  rightElement,
  as: Tag = "h2",
  small = false,
}: SectionHeadingProps) => {
  const titleClass = small
    ? "font-display text-[22px] md:text-[28px] font-medium tracking-[-0.5px] leading-none"
    : "font-display text-[28px] md:text-[40px] font-normal tracking-[-1.2px] leading-none";

  return (
    <motion.div
      className="flex items-end justify-between"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={revealTransition(0.5)}
    >
      <BlurReveal text={title} as={Tag} mode="words" stagger={0.06} className={titleClass} />
      {rightElement && (
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-60px" }}
          transition={revealTransition(0.65, 0.25)}
        >
          {rightElement}
        </motion.div>
      )}
    </motion.div>
  );
};

export default SectionHeading;
