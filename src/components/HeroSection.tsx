import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PillButton from "./PillButton";
import BlurReveal from "./BlurReveal";
import { revealTransition } from "@/lib/motion";
import { cn } from "@/lib/utils";

const SLIDE_INTERVAL_MS = 30_000;

const heroSlides = [
  { id: "luxor", image: "/luxor1.jpg", label: "Резиденция ЛЮКСОР", title: "Резиденция ЛЮКСОР", subtitle: "Старт продаж!", href: "/project" },
  { id: "rodina", image: "/luxor2.jpg", label: "Родная гавань", title: "Резиденция ЛЮКСОР", subtitle: "Старт продаж!", href: "/project" },
  { id: "fantastic", image: "/luxor3.jpg", label: "Фантастик", title: "Резиденция ЛЮКСОР", subtitle: "Старт продаж!", href: "/project" },
] as const;

const HeroSection = ({ introDone = false }: { introDone?: boolean }) => {
  const [bgLoaded, setBgLoaded] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (introDone && !bgLoaded) {
      setBgLoaded(true);
    }
  }, [introDone, bgLoaded]);

  useEffect(() => {
    setProgress(0);
  }, [activeSlide]);

  useEffect(() => {
    if (!introDone || !bgLoaded) return;

    const started = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - started) / SLIDE_INTERVAL_MS);
      setProgress(p);
      if (p >= 1) {
        setActiveSlide((i) => (i + 1) % heroSlides.length);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [introDone, bgLoaded, activeSlide]);

  const slide = heroSlides[activeSlide];

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
            <AnimatePresence mode="sync">
              <motion.img
                key={slide.image}
                src={bgLoaded ? slide.image : undefined}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover"
                decoding="async"
                fetchPriority="high"
                draggable={false}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-foreground/40" />
          </motion.div>

          <div className="relative flex flex-col justify-end flex-1 min-h-[400px] px-4 md:px-10 lg:px-14">
            <motion.div className="pb-20 md:pb-28 pt-12 md:pt-[100px]">
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
                <Link to={slide.href}>
                  <PillButton variant="yellow" withArrow className="mt-10">
                    Подробнее
                  </PillButton>
                </Link>
              </motion.div>
            </motion.div>

            <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/55 to-transparent px-3 pb-5 pt-16 md:px-6 md:pb-6 md:pt-24">
              <div className="grid grid-cols-3 gap-2 sm:gap-0">
                {heroSlides.map((item, i) => {
                  const isOn = i === activeSlide;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveSlide(i)}
                      className="group flex w-full flex-col items-stretch px-1 py-2 text-left md:px-2 md:py-3"
                    >
                      <span
                        className={cn(
                          "text-[11px] font-medium leading-tight text-white sm:text-xs md:text-sm",
                          isOn ? "opacity-100" : "opacity-85 group-hover:opacity-100",
                        )}
                      >
                        {item.label}
                      </span>
                      <div
                        className="relative mt-2 h-[3px] w-full overflow-hidden rounded-sm bg-white/30"
                        aria-hidden
                      >
                        {isOn && (
                          <div
                            className="absolute left-0 top-0 h-full rounded-sm bg-white"
                            style={{ width: `${progress * 100}%` }}
                          />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
