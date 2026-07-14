import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BlurReveal from "@/components/BlurReveal";
import { PremiumReveal } from "@/components/project/premium/PremiumParallax";
import { cn } from "@/lib/utils";

const presentationPath = (n: number) =>
  `/photos/presentation/${encodeURIComponent(`иллюстративный материал (${n}).png`)}`;

const HEADLINE =
  "ЛЮКСОР — резиденция бизнес-класса в Центральном районе Симферополя. Это единый независимый квартал с закрытым двором, проработанной коммерцией и сервисом, где каждый сценарий повседневной жизни уже продуман.";

const landscapeTabs = [
  {
    id: "district",
    label: "Центральный район",
    overlay:
      "Тихая локация без магистралей — в центре Симферополя, но в стороне от шума трасс.",
    image: presentationPath(22),
  },
  {
    id: "family",
    label: "Школа и детский сад",
    overlay: "Школа и детский сад напротив комплекса, через дорогу — всё для семьи в шаговой доступности.",
    image: presentationPath(35),
  },
  {
    id: "courtyard",
    label: "Закрытый двор-сад",
    overlay: "Закрытый двор-сад на стилобате — только для резидентов, без посторонних и машин.",
    image: presentationPath(29),
  },
  {
    id: "layouts",
    label: "40 планировок",
    overlay:
      "Архитектура с узнаваемым фасадом, лобби уровня 5*, консьерж-сервис и 40 планировок — от функциональных решений до резиденций с террасами и патио.",
    image: presentationPath(33),
  },
] as const;

const SLIDE_MS = 7500;

const ProjectLuxorPremiumAbout = () => {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const tab = landscapeTabs[active];

  useEffect(() => {
    setProgress(0);
  }, [active]);

  useEffect(() => {
    const started = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - started) / SLIDE_MS);
      setProgress(p);
      if (p >= 1) {
        setActive((i) => (i + 1) % landscapeTabs.length);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  return (
    <section id="project-about" className="border-0 bg-white py-14 md:py-20 lg:py-24">
      <div className="site-container">
        <PremiumReveal className="mb-12 flex flex-col gap-8 md:mb-16 lg:mb-20 lg:flex-row lg:items-start lg:justify-between lg:gap-12 xl:gap-24">
          <div className="flex max-w-md shrink-0 gap-3 lg:max-w-[min(100%,340px)]">
            <BlurReveal
              text="О проекте"
              as="p"
              mode="words"
              className="text-[15px] leading-snug text-neutral-700 md:text-base md:leading-snug"
            />
          </div>
          <BlurReveal
            text={HEADLINE}
            as="p"
            mode="words"
            delay={0.08}
            stagger={0.03}
            className="max-w-[46rem] text-xl font-medium leading-[1.25] tracking-tight text-neutral-900 md:text-2xl lg:text-[28px] lg:leading-snug"
          />
        </PremiumReveal>

        <PremiumReveal delay={0.12}>
          <motion.div
            className={cn(
              "relative isolate min-h-[min(72vw,520px)] w-full overflow-hidden rounded-2xl md:min-h-[420px] md:rounded-3xl",
              "aspect-[4/5] sm:aspect-[3/2] lg:aspect-[2.4/1]",
            )}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={tab.image}
                src={tab.image}
                alt=""
                className="absolute inset-0 size-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              />
            </AnimatePresence>

            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/60"
              aria-hidden
            />

            <div className="absolute left-5 top-5 z-10 max-w-[min(100%,520px)] pr-4 md:left-8 md:top-8 md:max-w-[34%] md:pr-6">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={tab.id}
                  className="text-[17px] font-medium leading-snug text-white drop-shadow-md md:text-lg md:leading-relaxed lg:text-xl"
                  initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  {tab.overlay}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/55 to-transparent px-3 pb-5 pt-16 md:px-6 md:pb-6 md:pt-24">
              {/* Mobile: active label + full bar + half peek, shifts on change */}
              <div className="sm:hidden">
                <motion.div
                  key={active}
                  className="flex w-full gap-2"
                  initial={{ x: 32, opacity: 0.8 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <button
                    type="button"
                    className="flex min-w-0 flex-[2] flex-col items-stretch text-left"
                    onClick={() => setActive(active)}
                    aria-current="true"
                  >
                    <span className="mb-2 text-sm font-medium leading-tight text-white">
                      {tab.label}
                    </span>
                    <div className="relative h-[3px] w-full overflow-hidden rounded-sm bg-white/30">
                      <div
                        className="absolute left-0 top-0 h-full rounded-sm bg-white"
                        style={{ width: `${progress * 100}%` }}
                      />
                    </div>
                  </button>

                  <button
                    type="button"
                    className="flex min-w-0 flex-1 flex-col items-stretch text-left"
                    onClick={() => setActive((active + 1) % landscapeTabs.length)}
                  >
                    <span className="mb-2 truncate text-sm font-medium leading-tight text-white/85">
                      {landscapeTabs[(active + 1) % landscapeTabs.length].label}
                    </span>
                    <div className="h-[3px] w-full rounded-sm bg-white/30" />
                  </button>
                </motion.div>
              </div>

              <div className="hidden sm:grid sm:grid-cols-4 sm:gap-0">
                {landscapeTabs.map((item, i) => {
                  const isOn = i === active;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActive(i)}
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
          </motion.div>
        </PremiumReveal>
      </div>
    </section>
  );
};

export default ProjectLuxorPremiumAbout;
