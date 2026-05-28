import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import BlurReveal from "@/components/BlurReveal";
import { ParallaxScrollMedia, PremiumReveal } from "@/components/project/premium/PremiumParallax";
import { useLuxorPremiumMotion } from "@/contexts/LuxorPremiumMotionContext";
import PillButton from "@/components/PillButton";
import floorplanImg from "@/assets/floorplan-1room.svg";

const planTypes = [
  { label: "Студия", area: "от 28 м²", price: "от 5,6 млн ₽", rooms: "Студия" },
  { label: "1-комн.", area: "от 38 м²", price: "от 7,6 млн ₽", rooms: "1-комнатная" },
  { label: "2-комн.", area: "от 58 м²", price: "от 11,3 млн ₽", rooms: "2-комнатная" },
  { label: "3-комн.", area: "от 85 м²", price: "от 16,9 млн ₽", rooms: "3-комнатная" },
];

const DEFAULT_EYEBROW = "Планировки";
const DEFAULT_HEADLINE =
  "Выберите типологию — от студии до трёхкомнатных квартир. Актуальные площади, стоимость и ипотечный платёж уточняются у менеджера.";

interface ProjectPlansProps {
  eyebrow?: string;
  headline?: string;
}

const LuxorPremiumPlans = ({ eyebrow = DEFAULT_EYEBROW, headline = DEFAULT_HEADLINE }: ProjectPlansProps) => {
  const [active, setActive] = useState(0);
  const plan = planTypes[active];
  const premium = useLuxorPremiumMotion();

  return (
    <section id="project-plans" className="relative border-0 bg-background py-16 text-foreground md:py-24">
      <div className="site-container">
        <PremiumReveal className="mb-8 grid grid-cols-1 gap-8 md:mb-10 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-0">
          <motion.div className="lg:col-span-3">
            {premium ? (
              <BlurReveal
                text={eyebrow}
                as="p"
                mode="words"
                className="text-[15px] leading-snug text-neutral-700 md:text-base md:leading-snug"
              />
            ) : (
              <p className="text-[15px] leading-snug text-neutral-700 md:text-base md:leading-snug">{eyebrow}</p>
            )}
          </motion.div>
          <motion.div className="lg:col-span-8 lg:col-start-5">
            {premium ? (
              <BlurReveal
                text={headline}
                as="p"
                mode="words"
                delay={0.06}
                stagger={0.02}
                className="max-w-4xl text-lg font-medium leading-snug tracking-tight text-neutral-900 md:text-xl lg:text-[22px] lg:leading-relaxed"
              />
            ) : (
              <p className="max-w-4xl text-lg font-medium leading-snug tracking-tight text-neutral-900 md:text-xl lg:text-[22px] lg:leading-relaxed">
                {headline}
              </p>
            )}
          </motion.div>
        </PremiumReveal>

        <motion.div className="mt-10 flex flex-wrap gap-2 md:gap-3">
          {planTypes.map((p, i) => (
            <button
              key={p.label}
              type="button"
              onClick={() => setActive(i)}
              className={`rounded-pill border px-5 py-2.5 text-sm font-medium uppercase tracking-[0.3px] transition-colors md:px-6 md:py-3 ${
                i === active
                  ? "border-[#4D2626] bg-[#4D2626] text-[#faf7f6]"
                  : "border-neutral-200 bg-transparent text-neutral-800 hover:bg-neutral-100"
              }`}
            >
              {p.label}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="mt-10 flex flex-col gap-10 lg:flex-row lg:gap-16"
            initial={{ opacity: 0, y: premium ? 40 : 20, filter: premium ? "blur(10px)" : undefined }}
            animate={{ opacity: 1, y: 0, filter: premium ? "blur(0px)" : undefined }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {premium ? (
              <ParallaxScrollMedia
                className="flex h-[420px] flex-1 items-center justify-center overflow-hidden rounded-[14px] border border-neutral-200 bg-neutral-50 px-6 py-12 md:h-[560px] md:rounded-2xl"
                yRange={[30, -30]}
                scaleRange={[1.04, 1, 1.04]}
              >
                <img
                  src={floorplanImg}
                  alt={`Планировка — ${plan.rooms}`}
                  className="max-h-full max-w-full object-contain"
                />
              </ParallaxScrollMedia>
            ) : (
              <motion.div className="flex h-[420px] flex-1 items-center justify-center overflow-hidden rounded-[14px] border border-neutral-200 bg-neutral-50 px-6 py-12 md:h-[560px] md:rounded-2xl">
                <img
                  src={floorplanImg}
                  alt={`Планировка — ${plan.rooms}`}
                  className="max-h-full max-w-full object-contain"
                />
              </motion.div>
            )}

            <motion.div className="flex w-full flex-col justify-between lg:w-[360px] lg:shrink-0">
              <motion.div>
                <h3 className="font-display text-3xl font-medium leading-none text-neutral-900 md:text-[40px]">
                  {plan.rooms}
                </h3>
                <motion.div className="mt-8 space-y-6">
                  <motion.div className="flex items-center justify-between border-b border-neutral-200 pb-4">
                    <span className="text-sm text-neutral-600">Площадь</span>
                    <span className="font-display text-lg font-medium text-neutral-900">{plan.area}</span>
                  </motion.div>
                  <motion.div className="flex items-center justify-between border-b border-neutral-200 pb-4">
                    <span className="text-sm text-neutral-600">Стоимость</span>
                    <span className="font-display text-lg font-medium text-neutral-900">{plan.price}</span>
                  </motion.div>
                  <motion.div className="flex items-center justify-between rounded-[14px] border border-neutral-200 bg-neutral-50 px-5 py-4 md:rounded-2xl">
                    <motion.div>
                      <span className="text-xs uppercase tracking-wide text-neutral-600">Ипотека</span>
                      <p className="mt-0.5 font-display text-2xl font-medium text-[#4D2626]">
                        от 36 432 ₽
                        <span className="ml-1 text-base font-normal text-neutral-600">/мес</span>
                      </p>
                    </motion.div>
                    <span className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs text-neutral-600">
                      40 вариантов
                    </span>
                  </motion.div>
                </motion.div>
              </motion.div>

              <motion.div className="mt-10">
                <Link to="/flats/1" className="block w-full">
                  <PillButton
                    variant="yellow"
                    withArrow
                    className="w-full !border-transparent !bg-[#4D2626] !text-[#faf7f6] hover:!bg-[#3d1f1f] hover:!text-[#faf7f6]"
                  >
                    Выбрать квартиру
                  </PillButton>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default LuxorPremiumPlans;
