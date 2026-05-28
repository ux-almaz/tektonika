import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PillButton from "./PillButton";
import BlurReveal from "./BlurReveal";
import { revealTransition } from "@/lib/motion";

const HeroSection = ({ introDone = false }: { introDone?: boolean }) => {
  const [bgLoaded, setBgLoaded] = useState(false);

  useEffect(() => {
    if (introDone && !bgLoaded) {
      setBgLoaded(true);
    }
  }, [introDone, bgLoaded]);

  return (
    <section className="relative pt-0 flex-1 flex flex-col border-0">
      <div className="site-container flex-1 flex flex-col">
        <div className="relative overflow-hidden flex-1 min-h-[400px] rounded-3xl flex flex-col">
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={introDone ? { opacity: 1 } : { opacity: 0 }}
            transition={revealTransition(1.2)}
          >
            <img
              src={bgLoaded ? "/luxor2.jpg" : undefined}
              alt="Резиденция Люксор"
              className="absolute inset-0 w-full h-full object-cover"
              decoding="async"
              fetchPriority="high"
              draggable={false}
            />
            <div className="absolute inset-0 bg-foreground/40" />
          </motion.div>

          <div className="relative flex flex-col justify-end flex-1 min-h-[400px] px-5 md:px-16 lg:px-20">
            <motion.div className="pb-10 md:pb-20 pt-12 md:pt-[100px]">
              {introDone ? (
                <BlurReveal
                  text="Резиденция ЛЮКСОР"
                  as="h1"
                  mode="chars"
                  trigger="immediate"
                  delay={0.15}
                  stagger={0.025}
                  className="font-display text-4xl md:text-7xl lg:text-[96px] font-medium uppercase leading-none tracking-[-2.4px] text-background"
                />
              ) : (
                <h1 className="font-display text-4xl md:text-7xl lg:text-[96px] font-medium uppercase leading-none tracking-[-2.4px] text-background opacity-0">
                  Резиденция ЛЮКСОР
                </h1>
              )}

              <div className="overflow-hidden mt-5">
                <motion.p
                  className="text-lg md:text-2xl font-medium text-[hsl(0,0%,83%)] leading-[1.17]"
                  initial={{ y: "100%", opacity: 0, filter: "blur(8px)" }}
                  animate={
                    introDone
                      ? { y: "0%", opacity: 1, filter: "blur(0px)" }
                      : { y: "100%", opacity: 0, filter: "blur(8px)" }
                  }
                  transition={revealTransition(0.85, 0.45)}
                >
                  Старт продаж!
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                animate={
                  introDone
                    ? { opacity: 1, y: 0, filter: "blur(0px)" }
                    : { opacity: 0, y: 24, filter: "blur(8px)" }
                }
                transition={revealTransition(0.75, 0.65)}
              >
                <Link to="/project">
                  <PillButton variant="yellow" withArrow className="mt-10">
                    Подробнее
                  </PillButton>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
