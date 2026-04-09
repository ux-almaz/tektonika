import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface CountUpProps {
  value: string;
  className?: string;
  duration?: number;
}

function extractNumber(str: string): { num: number; prefix: string; suffix: string } {
  const match = str.match(/^([^\d]*)([\d.]+)(.*)$/);
  if (!match) return { num: 0, prefix: "", suffix: str };
  return { num: parseFloat(match[2]), prefix: match[1], suffix: match[3] };
}

const CountUp = ({ value, className, duration = 2 }: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState("0");
  const { num, prefix, suffix } = extractNumber(value);

  useEffect(() => {
    if (!isInView || num === 0) return;

    let start = 0;
    const startTime = performance.now();
    const isFloat = value.includes(".");

    const tick = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = eased * num;
      setDisplay(isFloat ? current.toFixed(1) : Math.round(current).toString());
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isInView, num, duration, value]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {prefix}{isInView ? display : "0"}{suffix}
    </motion.span>
  );
};

export default CountUp;
