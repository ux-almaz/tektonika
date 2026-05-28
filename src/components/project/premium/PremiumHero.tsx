import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import TextReveal from "@/components/TextReveal";

interface StatItem {
  value: string;
  label: string;
}

interface PremiumHeroProps {
  image: string;
  subtitle: string;
  title: string;
  description: string;
  stats: StatItem[];
}

const PremiumHero = ({ image, subtitle, title, description, stats }: PremiumHeroProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.65, 0.85]);
  const contentY = useTransform(scrollYProgress, [0, 0.3], [0, 80]);

  return (
    <section ref={ref} className="relative h-[92vh] min-h-[680px] overflow-hidden">
      <motion.img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        style={{ y: heroY }}
      />
      <motion.div
        className="absolute inset-0"
        style={{ background: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.75))`, opacity: overlayOpacity }}
      />

      <motion.div className="site-container relative z-10 flex h-full flex-col justify-end pb-24 md:pb-28" style={{ y: contentY }}>
        <div className="max-w-4xl">
          <TextReveal
            as="p"
            className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.3em]"
            style={{ color: "hsl(var(--luxor-burgundy-light))" }}
          >
            <span className="inline-block h-px w-8" style={{ backgroundColor: "hsl(var(--luxor-burgundy-light))" }} />
            {subtitle}
          </TextReveal>

          <TextReveal
            as="h1"
            className="text-5xl leading-[0.92] tracking-[-1px] text-white md:text-7xl lg:text-8xl"
          >
            {title}
          </TextReveal>

          <TextReveal
            as="p"
            delay={0.15}
            className="mt-6 max-w-2xl text-sm leading-relaxed text-white/60 md:text-base"
          >
            {description}
          </TextReveal>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16"
        >
          <div className="flex flex-wrap gap-x-14 gap-y-5 md:gap-x-20">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span
                  className="text-xs uppercase tracking-[0.2em]"
                  style={{ color: "hsl(var(--luxor-burgundy-light))" }}
                >
                  {stat.label}
                </span>
                <span className="mt-1 text-4xl font-medium text-white md:text-5xl">{stat.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/20 px-5 py-2 text-xs uppercase tracking-[0.18em] text-white/70"
      >
        Скролль вниз
      </motion.a>
    </section>
  );
};

export default PremiumHero;
