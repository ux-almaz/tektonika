import { motion } from "framer-motion";
import BlurReveal from "@/components/BlurReveal";
import { cn } from "@/lib/utils";

const HEADER_OFFSET_PX = 80;
const SUBNAV_H = 64;

export interface LuxorPremiumHeroProps {
  heroImageOverride?: string;
  titleOverride?: string;
  galleryImagesOverride?: Record<string, string[]>;
  galleryCategoriesOverride?: Array<{ label: string; key: string }>;
}

const LuxorPremiumHero = ({
  heroImageOverride = "/luxor2.jpg",
  titleOverride,
}: LuxorPremiumHeroProps) => {
  const heroHeight = `calc(100dvh - ${HEADER_OFFSET_PX}px)`;

  return (
    <section id="project-hero" className="relative w-full border-0">
      <motion.div
        className="relative isolate overflow-hidden"
        style={{ minHeight: heroHeight }}
      >
        <img
          src={heroImageOverride}
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
          decoding="async"
          fetchPriority="high"
          draggable={false}
        />
        <div className="project-hero-overlay pointer-events-none absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-foreground/15" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-foreground/80 via-foreground/35 to-transparent" />

        <div
          className="relative z-10 flex min-h-0 flex-col justify-end site-container"
          style={{ minHeight: heroHeight, paddingBottom: SUBNAV_H }}
        >
          <motion.div
            className="flex flex-col justify-end gap-6 pb-10 pt-10 md:gap-8 md:pb-12 lg:flex-row lg:items-end lg:justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <BlurReveal
              text={titleOverride ?? "ЛЮКСОР"}
              as="h1"
              mode="chars"
              trigger="immediate"
              delay={0.12}
              stagger={0.022}
              className={cn(
                "font-display font-medium uppercase leading-none tracking-[-2px] text-white",
                "text-6xl sm:text-7xl md:text-8xl lg:text-[5.5rem] xl:text-[6.25rem] 2xl:text-[6.75rem]",
                "[text-shadow:0_2px_24px_rgba(0,0,0,0.35)]",
              )}
            />
            <BlurReveal
              text="Дом, который не нужно объяснять: тишина, сервис и продуманная среда для жизни в центре Симферополя"
              as="p"
              mode="words"
              trigger="immediate"
              delay={0.35}
              stagger={0.025}
              className={cn(
                "w-full shrink-0 text-left text-lg sm:text-xl md:text-2xl lg:text-right text-white",
                "max-w-[min(100%,520px)] sm:max-w-[min(90%,560px)] md:max-w-[min(42vw,580px)] lg:ml-auto",
                "leading-relaxed font-medium",
                "[text-shadow:0_1px_16px_rgba(0,0,0,0.55)]",
              )}
            />
          </motion.div>
        </div>

      </motion.div>
    </section>
  );
};

export default LuxorPremiumHero;
