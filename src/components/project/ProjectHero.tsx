import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import projectHero1 from "@/assets/project-hero-1.webp";

const galleryCategories = [
  { label: "Архитектура", key: "arch" },
  { label: "Входные группы", key: "entrance" },
  { label: "Благоустройство", key: "landscape" },
];

const galleryImages: Record<string, string[]> = {
  arch: [
    projectHero1,
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80&fm=webp",
    "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=1600&q=80&fm=webp",
  ],
  entrance: [
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&q=80&fm=webp",
    "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=1600&q=80&fm=webp",
  ],
  landscape: [
    "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=1600&q=80&fm=webp",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80&fm=webp",
  ],
};

const badges = [
  { text: "Старт продаж", variant: "primary" as const },
  { text: "Вид на горы", variant: "dark" as const },
  { text: "Рассрочка на 5 лет", variant: "dark" as const },
];

const ProjectHero = () => {
  const [activeCategory, setActiveCategory] = useState("arch");
  const [activeSlide, setActiveSlide] = useState(0);
  const images = galleryImages[activeCategory];

  const handleCategoryChange = (key: string) => {
    setActiveCategory(key);
    setActiveSlide(0);
  };

  const handlePrev = () => setActiveSlide((p) => (p === 0 ? images.length - 1 : p - 1));
  const handleNext = () => setActiveSlide((p) => (p === images.length - 1 ? 0 : p + 1));

  return (
    <section className="relative w-full">
      {/* Full-width hero image */}
      <div className="relative overflow-hidden min-h-[580px] md:min-h-[700px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-${activeSlide}`}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${images[activeSlide]})` }}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/30 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Content overlay */}
        <div className="relative flex flex-col justify-between h-full min-h-[580px] md:min-h-[700px] site-container">
          {/* Badges — top */}
          <motion.div
            className="flex flex-wrap gap-2 pt-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {badges.map((b) => (
              <span
                key={b.text}
                className={`rounded-pill px-5 py-2.5 text-xs font-medium uppercase tracking-wide whitespace-nowrap ${
                  b.variant === "primary"
                    ? "bg-primary text-primary-foreground"
                    : "bg-foreground/70 text-background backdrop-blur-sm"
                }`}
              >
                {b.text}
              </span>
            ))}
          </motion.div>

          {/* Title & description */}
          <div className="flex-1 flex flex-col justify-end pb-8">
            <motion.h1
              className="font-display text-5xl md:text-7xl lg:text-[80px] font-medium uppercase leading-none tracking-[-2px] text-background"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              ЖК Тектоника
            </motion.h1>
            <motion.p
              className="mt-4 text-lg md:text-xl text-background/80 max-w-[500px] leading-relaxed"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            >
              Современный жилой комплекс в Симферополе, где каждый день отдых
            </motion.p>
          </div>

          {/* Bottom: dots + tabs + arrows */}
          <motion.div
            className="pb-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            {/* Slide dots */}
            <div className="flex items-center gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSlide(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === activeSlide
                      ? "w-8 h-3 bg-primary"
                      : "w-3 h-3 bg-background/50 hover:bg-background/80"
                  }`}
                />
              ))}
            </div>

            {/* Tabs + arrows */}
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                {galleryCategories.map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => handleCategoryChange(cat.key)}
                    className={`rounded-pill px-6 py-3 text-sm font-medium transition-all duration-300 ${
                      activeCategory === cat.key
                        ? "bg-primary text-primary-foreground"
                        : "bg-background/10 text-background backdrop-blur-sm border border-background/20 hover:bg-background/20"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handlePrev}
                  className="w-12 h-12 rounded-full border border-background/30 text-background flex items-center justify-center hover:bg-background/10 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button
                  onClick={handleNext}
                  className="w-12 h-12 rounded-full border border-background/30 text-background flex items-center justify-center hover:bg-background/10 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProjectHero;
