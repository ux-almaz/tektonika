import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { Maximize2, X } from "lucide-react";
import projectHero1 from "@/assets/project-hero-1.webp";

const defaultGalleryCategories = [
  { label: "Архитектура", key: "arch" },
  { label: "Входные группы", key: "entrance" },
  { label: "Благоустройство", key: "landscape" },
];

const badges = [
  { text: "Бизнес-класс", variant: "primary" as const },
  { text: "Центральный район", variant: "dark" as const },
  { text: "Панорамные виды", variant: "dark" as const },
];

interface ProjectHeroProps {
  heroImageOverride?: string;
  titleOverride?: string;
  galleryImagesOverride?: Record<string, string[]>;
  galleryCategoriesOverride?: Array<{ label: string; key: string }>;
}

const ProjectHero = ({
  heroImageOverride,
  titleOverride,
  galleryImagesOverride,
  galleryCategoriesOverride,
}: ProjectHeroProps) => {
  const defaultGalleryImages: Record<string, string[]> = {
    arch: [
      heroImageOverride ?? projectHero1,
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
  const galleryImages = galleryImagesOverride ?? defaultGalleryImages;
  const galleryCategories = galleryCategoriesOverride ?? defaultGalleryCategories;

  const [activeCategory, setActiveCategory] = useState(galleryCategories[0]?.key ?? "arch");
  const [activeSlide, setActiveSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const images = galleryImages[activeCategory] ?? [];

  useEffect(() => {
    document.body.style.overflow = isFullscreen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFullscreen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsFullscreen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleCategoryChange = (key: string) => {
    setActiveCategory(key);
    setActiveSlide(0);
  };

  const handlePrev = () => {
    if (!images.length) return;
    setActiveSlide((p) => (p === 0 ? images.length - 1 : p - 1));
  };
  const handleNext = () => {
    if (!images.length) return;
    setActiveSlide((p) => (p === images.length - 1 ? 0 : p + 1));
  };

  return (
    <section className="relative w-full border-0">
      {/* Full-width hero image */}
      <div className="relative overflow-hidden min-h-[580px] md:min-h-[700px]">
        <AnimatePresence mode="sync">
          <motion.div
            key={`${activeCategory}-${activeSlide}`}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${images[activeSlide]})` }}
            initial={{ x: 24, filter: "blur(8px)" }}
            animate={{ x: 0, filter: "blur(0px)" }}
            exit={{ x: -24, filter: "blur(6px)" }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="project-hero-overlay absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/30 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Content overlay */}
        <div className="relative flex flex-col justify-between h-full min-h-[580px] md:min-h-[700px] site-container">
          {/* Top row: badges + fullscreen */}
          <div className="pt-8 flex items-start justify-between gap-4">
            <motion.div
              className="flex flex-wrap gap-2"
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

            <button
              onClick={() => setIsFullscreen(true)}
              className="w-12 h-12 rounded-full border border-background/30 text-background flex items-center justify-center hover:bg-background/10 transition-colors"
              aria-label="Открыть на весь экран"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Title & description */}
          <div className="flex-1 flex flex-col justify-end pb-8">
            <motion.h1
              className="font-display text-5xl md:text-7xl lg:text-[80px] font-medium uppercase leading-none tracking-[-2px] text-background"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              {titleOverride ?? "ЖК Тектоника"}
            </motion.h1>
            <motion.p
              className="mt-4 text-lg md:text-xl text-background/80 max-w-[500px] leading-relaxed"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            >
              Дом, который не нужно объяснять: тишина, сервис и продуманная среда для жизни в центре Симферополя
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
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
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

      {isFullscreen &&
        createPortal(
          <div
            className="fixed inset-0 z-[10000] bg-black"
            onClick={() => setIsFullscreen(false)}
          >
            <img
              src={images[activeSlide]}
              alt="Фото проекта в полном экране"
              className="absolute inset-0 w-full h-full object-contain"
              onClick={(event) => event.stopPropagation()}
            />
            {images.length > 1 && (
              <div className="absolute inset-y-0 left-0 right-0 z-20 pointer-events-none flex items-center justify-between px-4 md:px-8">
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    handlePrev();
                  }}
                  className="pointer-events-auto w-12 h-12 rounded-full border border-white/35 text-white flex items-center justify-center hover:bg-white/10 transition-colors"
                  aria-label="Предыдущее фото"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    handleNext();
                  }}
                  className="pointer-events-auto w-12 h-12 rounded-full border border-white/35 text-white flex items-center justify-center hover:bg-white/10 transition-colors"
                  aria-label="Следующее фото"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            )}
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/90 text-foreground flex items-center justify-center hover:bg-white transition-colors"
              aria-label="Закрыть полноэкранный режим"
              
            >
              <X className="w-4 h-4" />
            </button>
          </div>,
          document.body
        )}
    </section>
  );
};

export default ProjectHero;
