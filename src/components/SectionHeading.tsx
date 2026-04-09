import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface SectionHeadingProps {
  title: string;
  rightElement?: React.ReactNode;
  as?: "h2" | "h3" | "span";
  hideBar?: boolean;
  small?: boolean;
}

const SectionHeading = ({ title, rightElement, as: Tag = "h2", hideBar = false, small = false }: SectionHeadingProps) => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [barWidth, setBarWidth] = useState(66);

  useEffect(() => {
    const measure = () => {
      if (!headingRef.current || title.length < 2) return;
      const span = document.createElement("span");
      const computed = getComputedStyle(headingRef.current);
      span.style.font = computed.font;
      span.style.letterSpacing = computed.letterSpacing;
      span.style.textTransform = computed.textTransform;
      span.style.visibility = "hidden";
      span.style.position = "absolute";
      span.textContent = title.slice(0, 2);
      document.body.appendChild(span);
      setBarWidth(span.offsetWidth);
      document.body.removeChild(span);
    };

    measure();
    // Re-measure after fonts load
    document.fonts.ready.then(measure);
  }, [title]);

  return (
    <div className="flex items-end justify-between">
      <div className="flex flex-col">
        <div className="overflow-hidden">
          <motion.div
            ref={headingRef}
            className={small 
              ? "font-display text-[22px] md:text-[28px] font-medium tracking-[-0.5px] leading-none"
              : "font-display text-[28px] md:text-[40px] font-normal tracking-[-1.2px] leading-none"
            }
            initial={{ y: "100%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Tag>{title}</Tag>
          </motion.div>
        </div>
      </div>
      {rightElement && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {rightElement}
        </motion.div>
      )}
    </div>
  );
};

export default SectionHeading;
