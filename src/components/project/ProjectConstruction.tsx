import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "../SectionHeading";
import ScrollReveal from "../ScrollReveal";
import CountUp from "../CountUp";
import { ArrowLeft, ArrowRight, ArrowUpRight, Radio } from "lucide-react";
import constructionPhoto from "@/assets/construction-photo.webp";
import aboutConstructionPhoto from "@/assets/about-construction.jpg";
import partnersConstructionPhoto from "@/assets/partners-construction.webp";

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
    src: constructionPhoto,
    alt: "Строительная площадка жилого комплекса Тектоника зимой",
    updatedAt: "4 февраля 2026",
  },
  {
    src: aboutConstructionPhoto,
    alt: "Фасады и ход строительства жилого комплекса Тектоника",
    updatedAt: "28 января 2026",
  },
  {
    src: partnersConstructionPhoto,
    alt: "Строительные работы на территории жилого комплекса Тектоника",
    updatedAt: "16 января 2026",
  },
];

const ProjectConstruction = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const goToPrevious = () => {
    setActiveSlide((current) => (current === 0 ? constructionSlides.length - 1 : current - 1));
  };

  const goToNext = () => {
    setActiveSlide((current) => (current === constructionSlides.length - 1 ? 0 : current + 1));
  };

  const currentSlide = constructionSlides[activeSlide];

  return (
    <section id="project-construction" className="pt-10 md:pt-14 pb-24 md:pb-36">
      <div className="site-container">
        <div className="mb-12 flex items-center gap-4">
          <SectionHeading title="Ход строительства" />
          <a
            href="#"
            className="mt-2 hidden items-center gap-1.5 whitespace-nowrap text-sm text-muted-foreground transition-colors hover:text-foreground md:flex"
          >
            <ArrowUpRight className="h-4 w-4" />
            открыть галерею
          </a>
        </div>

        <div className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-5">
          <ScrollReveal className="lg:col-span-3">
            <div className="relative min-h-[480px] overflow-hidden rounded-3xl bg-muted md:h-full">
              <motion.img
                key={currentSlide.src}
                src={currentSlide.src}
                alt={currentSlide.alt}
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ scale: 1.04, opacity: 0.55 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 via-foreground/5 to-transparent" />

              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-pill bg-background/88 px-3 py-1.5 backdrop-blur-sm">
                <span className="text-xs font-medium text-white">128 фото</span>
              </div>

              <button
                type="button"
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-background text-foreground shadow-sm transition-transform hover:scale-105"
                aria-label="Предыдущее фото"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={goToNext}
                className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-background text-foreground shadow-sm transition-transform hover:scale-105"
                aria-label="Следующее фото"
              >
                <ArrowRight className="h-4 w-4" />
              </button>

              <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 px-5 py-5 md:px-7 md:py-6">
                <button
                  type="button"
                  className="rounded-pill bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
                >
                  Смотреть 3 фото
                </button>

                <div className="rounded-pill bg-background/92 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                  {activeSlide + 1}/{constructionSlides.length}
                </div>

                <div className="flex items-center gap-2">
                  {constructionSlides.map((slide, index) => (
                    <button
                      key={slide.src}
                      type="button"
                      onClick={() => setActiveSlide(index)}
                      className={`h-2.5 rounded-full transition-all ${
                        index === activeSlide ? "w-7 bg-background" : "w-2.5 bg-background/55"
                      }`}
                      aria-label={`Перейти к фото ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal className="lg:col-span-2" delay={0.15}>
            <div className="flex h-full flex-col gap-4 md:gap-5">
              <div className="flex min-h-[210px] flex-col justify-between rounded-3xl border border-border bg-muted p-6 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[28px] font-medium leading-none tracking-tight text-foreground md:text-[34px]">
                      Онлайн камера
                    </p>
                    <p className="mt-4 max-w-[18rem] text-sm leading-relaxed text-muted-foreground">
                      Смотрите стройку в реальном времени и проверяйте обновления без визита на площадку.
                    </p>
                  </div>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-background text-foreground">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Radio className="h-4 w-4 text-primary" />
                  Прямая трансляция 24/7
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-between gap-6 rounded-3xl border border-border bg-muted p-6 md:p-8">
                <div>
                  <CountUp
                    value="35%"
                    className="font-display text-[56px] font-normal leading-none tracking-tight md:text-[72px]"
                  />
                  <p className="mt-2 text-sm text-muted-foreground">Готовность комплекса</p>
                </div>

                <div className="space-y-5">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-xs italic text-muted-foreground">Последнее обновление</p>
                    <p className="text-xs font-medium text-foreground">{currentSlide.updatedAt}</p>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <p className="text-xs italic text-muted-foreground">До сдачи ближайшей очереди</p>
                    <p className="text-xs font-medium text-foreground">1 г. 9 мес. 28 дн.</p>
                  </div>

                  <div className="flex h-24 items-end gap-[6px]">
                    {chartBars.map((bar, i) => (
                      <motion.div
                        key={i}
                        className={`flex-1 rounded-[3px] ${bar.filled ? "bg-primary" : "bg-border"}`}
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
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ProjectConstruction;