import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef, useState, type MouseEvent, type ReactNode, type RefObject } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { useLuxorPremiumMotion } from "@/contexts/LuxorPremiumMotionContext";
import { parallaxSpring, weddingEase } from "@/lib/motion";
import { cn } from "@/lib/utils";

type PremiumRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
};

export const PremiumReveal = ({
  children,
  className,
  delay = 0,
  distance = 24,
}: PremiumRevealProps) => {
  const premium = useLuxorPremiumMotion();
  if (!premium) {
    return <div className={className}>{children}</div>;
  }
  return (
    <ScrollReveal
      className={className}
      delay={delay}
      distance={distance}
      blur={false}
      duration={0.7}
      inViewMargin="-40px"
      ease={weddingEase}
    >
      {children}
    </ScrollReveal>
  );
};

type ParallaxScrollMediaProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  yRange?: [number, number];
  scaleRange?: [number, number, number];
};

export const ParallaxScrollMedia = ({
  children,
  className,
  innerClassName,
  yRange = [80, -80],
  scaleRange,
}: ParallaxScrollMediaProps) => {
  const premium = useLuxorPremiumMotion();
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yRaw = useTransform(scrollYProgress, [0, 1], yRange);
  const y = useSpring(yRaw, parallaxSpring);
  const scaleRaw = scaleRange
    ? useTransform(scrollYProgress, [0, 0.5, 1], scaleRange)
    : undefined;
  const scale = scaleRaw ? useSpring(scaleRaw, parallaxSpring) : undefined;

  if (!premium || reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div
        style={{ y, scale }}
        className={cn("size-full will-change-transform", innerClassName)}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

type ParallaxTiltProps = {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
};

export const ParallaxTilt = ({ children, className, maxTilt = 7 }: ParallaxTiltProps) => {
  const premium = useLuxorPremiumMotion();
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!premium || reduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rotateX: -py * maxTilt,
      rotateY: px * maxTilt,
    });
  };

  const onLeave = () => setTilt({ rotateX: 0, rotateY: 0 });

  if (!premium || reduceMotion) {
    return <motion.div className={className}>{children}</motion.div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ perspective: 1200 }}
    >
      <motion.div
        className="size-full"
        style={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
          transformStyle: "preserve-3d",
        }}
        transition={{ type: "spring", stiffness: 280, damping: 24 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

type PremiumHeroParallax = {
  ref: RefObject<HTMLDivElement>;
  bgY?: MotionValue<number>;
  contentY?: MotionValue<number>;
};

export const usePremiumHeroParallax = (): PremiumHeroParallax => {
  const premium = useLuxorPremiumMotion();
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const contentY = useTransform(scrollYProgress, [0, 0.35], [0, 72]);

  const active = premium && !reduceMotion;
  return {
    ref,
    bgY: active ? bgY : undefined,
    contentY: active ? contentY : undefined,
  };
};
