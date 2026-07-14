import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Radio } from "lucide-react";
import BlurReveal from "@/components/BlurReveal";
import CountUp from "@/components/CountUp";
import { PremiumReveal } from "@/components/project/premium/PremiumParallax";
const presentationPath = (n: number) =>
  `/photos/presentation/${encodeURIComponent(`иллюстративный материал (${n}).png`)}`;

const chartBars = [
  { height: 12, filled: true },
  { height: 18, filled: true },
  { height: 22, filled: true },
  { height: 30, filled: true },
  { height: 38, filled: false },
  { height: 48, filled: false },
  { height: 55, filled: false },
  { height: 62, filled: false },
  { height: 72, filled: false },
  { height: 80, filled: false },
  { height: 88, filled: false },
];

const constructionSlides = [
  {
    src: presentationPath(4),
    alt: "Общий вид резиденции ЛЮКСОР на закате",
    updatedAt: "4 февраля 2026",
  },
  {
    src: presentationPath(21),
    alt: "Резиденция ЛЮКСОР — архитектура и освещение фасадов",
    updatedAt: "28 января 2026",
  },
  {
    src: presentationPath(23),
    alt: "Фасады и благоустройство резиденции ЛЮКСОР",
    updatedAt: "16 января 2026",
  },
];

const LuxorPremiumConstruction = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const goToPrevious = () => {
    setActiveSlide((current) => (current === 0 ? constructionSlides.length - 1 : current - 1));
  };

  const goToNext = () => {
    setActiveSlide((current) => (current === constructionSlides.length - 1 ? 0 : current + 1));
  };

  const currentSlide = constructionSlides[activeSlide];

  return (
    <section id="project-construction" className="relative border-0 bg-white py-16 text-neutral-950 md:py-24">
      <div className="site-container">
        <PremiumReveal className="mb-10 flex flex-wrap items-end justify-between gap-4 md:mb-14">
          <BlurReveal
            text="Ход строительства"
            as="h2"
            mode="words"
            className="text-xl font-medium leading-[1.25] tracking-tight text-neutral-900 md:text-2xl lg:text-[28px] lg:leading-snug"
          />
          <a
            href="#"
            className="hidden items-center gap-1.5 whitespace-nowrap text-sm text-neutral-600 transition-colors hover:text-neutral-900 md:flex"
          >
            <ArrowUpRight className="h-4 w-4" />
            открыть галерею
          </a>
        </PremiumReveal>

        <div className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-5 lg:items-stretch">
          <PremiumReveal className="h-full lg:col-span-3">
            <div className="relative h-full min-h-[420px] overflow-hidden rounded-[14px] bg-neutral-100 md:min-h-[480px]">
              <motion.img
                key={currentSlide.src}
                src={currentSlide.src}
                alt={currentSlide.alt}
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ scale: 1.04, opacity: 0.55 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 backdrop-blur-sm">
                <span className="text-xs font-medium text-neutral-900">128 фото</span>
              </div>

              <button
                type="button"
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-neutral-900 shadow-sm transition-transform hover:scale-105"
                aria-label="Предыдущее фото"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={goToNext}
                className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-neutral-900 shadow-sm transition-transform hover:scale-105"
                aria-label="Следующее фото"
              >
                <ArrowRight className="h-4 w-4" />
              </button>

              <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 px-5 py-5 md:px-7 md:py-6">
                <button
                  type="button"
                  className="rounded-full px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
                  style={{ backgroundColor: "#4D2626" }}
                >
                  Смотреть 3 фото
                </button>

                <div className="rounded-full bg-white/92 px-4 py-2 text-sm font-medium text-neutral-900 backdrop-blur-sm">
                  {activeSlide + 1}/{constructionSlides.length}
                </div>

                <div className="flex items-center gap-2">
                  {constructionSlides.map((slide, index) => (
                    <button
                      key={slide.src}
                      type="button"
                      onClick={() => setActiveSlide(index)}
                      className={`h-2.5 rounded-full transition-all ${
                        index === activeSlide ? "w-7 bg-white" : "w-2.5 bg-white/55"
                      }`}
                      aria-label={`Перейти к фото ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </PremiumReveal>

          <PremiumReveal className="h-full lg:col-span-2" delay={0.12}>
            <div className="flex h-full flex-col gap-4 md:gap-5">
              <div className="flex min-h-[210px] flex-col justify-between rounded-[14px] border border-neutral-200 bg-neutral-50 p-6 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[26px] font-medium leading-none tracking-tight text-neutral-900 md:text-[32px]">
                      Онлайн камера
                    </p>
                    <p className="mt-4 max-w-[18rem] text-sm leading-relaxed text-neutral-600">
                      Смотрите стройку в реальном времени и проверяйте обновления без визита на площадку.
                    </p>
                  </div>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-neutral-900 shadow-sm">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-neutral-900">
                  <Radio className="h-4 w-4" style={{ color: "#4D2626" }} />
                  Прямая трансляция 24/7
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-between gap-6 rounded-[14px] border border-neutral-200 bg-neutral-50 p-6 md:p-8">
                <div>
                  <CountUp
                    value="35%"
                    className="font-display text-[56px] font-normal leading-none tracking-tight text-neutral-900 md:text-[72px]"
                  />
                  <p className="mt-2 text-sm text-neutral-600">Готовность комплекса</p>
                </div>

                <div className="space-y-5">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-xs italic text-neutral-500">Последнее обновление</p>
                    <p className="text-xs font-medium text-neutral-900">{currentSlide.updatedAt}</p>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <p className="text-xs italic text-neutral-500">До сдачи ближайшей очереди</p>
                    <p className="text-xs font-medium text-neutral-900">1 г. 9 мес. 28 дн.</p>
                  </div>

                  <div className="flex h-24 items-end gap-[6px]">
                    {chartBars.map((bar, i) => (
                      <motion.div
                        key={i}
                        className={`flex-1 rounded-[3px] ${bar.filled ? "bg-[#4D2626]" : "bg-neutral-200"}`}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${bar.height}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.5,
                          delay: 0.06 * i,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </PremiumReveal>
        </div>
      </div>
    </section>
  );
};

export default LuxorPremiumConstruction;
