import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "../SectionHeading";
import ScrollReveal from "../ScrollReveal";
import interiorImg from "@/assets/value-interior.webp";
import aboutHeroImg from "@/assets/about-hero.jpg";
import valueNatureImg from "@/assets/value-nature.jpg";
import valueBuildingImg from "@/assets/value-building.jpg";

const finishTypes = [
  {
    label: "Чистовая",
    desc: "Дизайнерская отделка под ключ — светлое или тёмное исполнение",
    images: [interiorImg, aboutHeroImg, valueBuildingImg],
    count: 12,
  },
  {
    label: "Предчистовая",
    desc: "Основа для вашего ремонта: стяжка, штукатурка, разводка",
    images: [valueBuildingImg, interiorImg, valueNatureImg],
    count: 24,
  },
  {
    label: "Без отделки",
    desc: "Свобода самовыражения — создайте уникальный интерьер с нуля",
    images: [valueNatureImg, valueBuildingImg, aboutHeroImg],
    count: 8,
  },
];

const ProjectFinishing = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [imgIdx, setImgIdx] = useState(0);
  const finish = finishTypes[activeTab];
  const total = finish.images.length;

  const prev = () => setImgIdx((i) => (i === 0 ? total - 1 : i - 1));
  const next = () => setImgIdx((i) => (i === total - 1 ? 0 : i + 1));

  const handleTab = (i: number) => {
    setActiveTab(i);
    setImgIdx(0);
  };

  return (
    <section id="project-finishing" className="py-16 md:py-24 border-0">
      <div className="site-container">

        {/* Header */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 mb-10">
          <ScrollReveal className="lg:w-[45%] shrink-0">
            <SectionHeading title="3 варианта отделки" />
          </ScrollReveal>
          <ScrollReveal delay={0.15} className="flex-1 flex items-end">
            <p className="text-muted-foreground text-base leading-relaxed">
              Для быстрого переезда без ремонтной суеты — квартиры с готовой дизайнерской отделкой в светлом и тёмном исполнении. Для свободы самовыражения — предчистовая или без отделки.
            </p>
          </ScrollReveal>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-8 flex-wrap">
          {finishTypes.map((f, i) => (
            <button
              key={f.label}
              onClick={() => handleTab(i)}
              className={`rounded-pill px-5 py-2.5 text-sm font-medium transition-colors border ${
                i === activeTab
                  ? "bg-foreground text-background border-foreground"
                  : "bg-transparent text-foreground border-border hover:bg-muted"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="flex flex-col lg:flex-row gap-4 items-stretch"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Left column */}
            <div className="lg:w-[320px] shrink-0 flex flex-col gap-3">

              {/* Promo card */}
              <div className="relative rounded-3xl overflow-hidden h-[200px] group cursor-pointer">
                <img src={finish.images[0]} alt={finish.label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
                <div className="relative h-full flex flex-col justify-between p-5">
                  <div />
                  <div>
                    <p className="text-white text-base font-medium leading-snug">Выберите стиль отделки<br />вашей будущей квартиры</p>
                    <p className="text-white/65 text-xs mt-1.5 leading-snug">узнайте больше о вариантах<br />готовой дизайнерской отделки</p>
                  </div>
                </div>
                <button className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-background flex items-center justify-center shadow-md">
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

              {/* Info card 1 */}
              <div className="bg-muted rounded-3xl p-6 flex flex-col justify-between flex-1 min-h-[140px] relative group cursor-pointer hover:bg-muted/80 transition-colors">
                <p className="font-display text-xl font-normal leading-snug">Видеообзоры<br />и живые детали</p>
                <button className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-background flex items-center justify-center shadow-sm">
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

              {/* Info card 2 */}
              <div className="bg-muted rounded-3xl p-6 flex flex-col justify-between flex-1 min-h-[140px] relative group cursor-pointer hover:bg-muted/80 transition-colors">
                <p className="font-display text-xl font-normal leading-snug">
                  {finish.count} квартир<br />с этой отделкой
                </p>
                <button className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-background flex items-center justify-center shadow-sm">
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Right: photo slider */}
            <div className="flex-1 relative rounded-3xl overflow-hidden min-h-[480px] lg:min-h-0">
              <AnimatePresence mode="wait">
                <motion.img
                  key={imgIdx}
                  src={finish.images[imgIdx]}
                  alt={finish.label}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                />
              </AnimatePresence>

              {/* Nav buttons */}
              <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-background transition-colors z-10"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-background transition-colors z-10"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/90 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium shadow-md z-10">
                {imgIdx + 1} / {total}
              </div>

              {/* Fullscreen hint */}
              <button className="absolute top-4 right-4 w-9 h-9 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center shadow-md z-10">
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectFinishing;
