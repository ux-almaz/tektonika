import { motion } from "framer-motion";
import { ReactNode } from "react";

interface TextRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
}

const TextReveal = ({
  children,
  className,
  delay = 0,
  duration = 0.9,
  as = "div",
}: TextRevealProps) => {
  const Tag = motion[as] as any;

  return (
    <div className="overflow-hidden">
      <Tag
        initial={{ y: "100%", opacity: 0 }}
        whileInView={{ y: "0%", opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{
          duration,
          ease: [0.22, 1, 0.36, 1],
          delay,
        }}
        className={className}
      >
        {children}
      </Tag>
    </div>
  );
};

export default TextReveal;
