import { motion } from "framer-motion";
import genplanImg from "@/assets/genplan.jpg";
import BlurReveal from "@/components/BlurReveal";
import { useLuxorPremiumMotion } from "@/contexts/LuxorPremiumMotionContext";

export interface ProjectGenplanProps {
  imageOverride?: string;
}

const LuxorPremiumGenplan = ({ imageOverride }: ProjectGenplanProps) => {
  const src = imageOverride ?? genplanImg;
  const premium = useLuxorPremiumMotion();

  return (
    <section
      id="project-genplan"
      className="relative z-20 overflow-x-clip"
      aria-labelledby="project-genplan-heading"
    >
      <div className="relative h-[min(135vh,1600px)]">
        <div className="sticky top-0 z-20 h-svh w-full max-w-[100dvw] overflow-hidden bg-muted">
          <motion.div className="absolute inset-0 overflow-hidden">
            <img
              src={src}
              alt=""
              className="h-full w-full object-cover object-center select-none"
              decoding="async"
              fetchPriority="low"
              draggable={false}
            />
          </motion.div>
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10">
            <div className="site-container pt-14 md:pt-20">
              {premium ? (
                <h2
                  id="project-genplan-heading"
                  className="font-display text-[28px] font-normal leading-none tracking-[-1.2px] text-white drop-shadow-[0_2px_28px_rgba(0,0,0,0.5)] md:text-[40px]"
                >
                  <BlurReveal text="Генплан" as="span" mode="words" className="inline" />
                </h2>
              ) : (
                <h2
                  id="project-genplan-heading"
                  className="font-display text-[28px] font-normal leading-none tracking-[-1.2px] text-white drop-shadow-[0_2px_28px_rgba(0,0,0,0.5)] md:text-[40px]"
                >
                  Генплан
                </h2>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LuxorPremiumGenplan;
