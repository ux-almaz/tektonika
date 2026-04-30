import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "../ScrollReveal";
import { ChevronLeft, ChevronRight, MapPin, TreePine, Plane, GraduationCap, FileText } from "lucide-react";

const highlights = [
  { icon: MapPin, title: "Центральный район", subtitle: "тихая локация без магистралей" },
  { icon: GraduationCap, title: "Школа и детский сад", subtitle: "напротив комплекса, через дорогу" },
  { icon: TreePine, title: "Закрытый двор-сад", subtitle: "на стилобате, только для резидентов" },
  { icon: Plane, title: "Удобная логистика", subtitle: "быстрый выезд к объездным Симферополя" },
  { icon: FileText, title: "40 планировок", subtitle: "от эргономичных форматов до террас" },
  { icon: TreePine, title: "Высота 300 м", subtitle: "панорамный обзор на весь город" },
];

const PROJECT_VIDEO_ID = "dQw4w9WgXcQ"; // Replace with actual YouTube video ID

type GallerySlide = { type: "video" } | { type: "image"; src: string };

const gallerySlides: GallerySlide[] = [
  { type: "video" as const },
  { type: "image" as const, src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80&fm=webp" },
  { type: "image" as const, src: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=1200&q=80&fm=webp" },
  { type: "image" as const, src: "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=1200&q=80&fm=webp" },
  { type: "image" as const, src: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80&fm=webp" },
  { type: "image" as const, src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80&fm=webp" },
];

interface ProjectAboutProps {
  gallerySlidesOverride?: GallerySlide[];
}

const ProjectAbout = ({ gallerySlidesOverride }: ProjectAboutProps) => {
  const [current, setCurrent] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const slides = gallerySlidesOverride ?? gallerySlides;

  const total = slides.length;
  const prev = () => setCurrent((c) => (c === 0 ? total - 1 : c - 1));
  const next = () => setCurrent((c) => (c === total - 1 ? 0 : c + 1));

  return (
    <section id="project-about" className="py-16 md:py-24 border-0">
      <div className="site-container">
        {/* Top: Title + Description */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 mb-12 md:mb-16">
          <ScrollReveal className="lg:w-[45%] shrink-0">
            <h2 className="font-display text-[28px] md:text-[40px] font-normal leading-[1.1] tracking-[-1px]">
              ЛЮКСОР — дом,<br />который не задаёт вопросов
            </h2>
          </ScrollReveal>

          <ScrollReveal className="flex-1" delay={0.15}>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              ЛЮКСОР — резиденция бизнес-класса в Центральном районе Симферополя. Это единый независимый квартал с закрытым двором, проработанной коммерцией и сервисом, где каждый сценарий повседневной жизни уже предусмотрен.
            </p>
            {expanded && (
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mt-4">
                Архитектура с узнаваемым фасадом и световым дизайном формирует новый ориентир города, а панорамное остекление раскрывает свободные виды благодаря малоэтажному окружению. Внутри — лобби уровня 5*, консьерж-сервис, бесшумные лифты в паркинг и 40 планировок: от функциональных решений до резиденций с террасами и патио.
              </p>
            )}
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-3 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              {expanded ? "Свернуть ↑" : "Читать ещё ↓"}
            </button>
          </ScrollReveal>
        </div>

        {/* Bottom: Highlights grid + Gallery carousel */}
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          {/* Left: highlight cards */}
          <div className="lg:w-[38%] shrink-0 flex flex-col">
            <div className="grid grid-cols-2 gap-3 md:gap-4 flex-1">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.title}
                  className="bg-muted rounded-3xl p-5 md:p-6 flex flex-col justify-between min-h-[140px]"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.06 * i }}
                >
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mb-6">
                    <item.icon className="w-5 h-5 text-primary-foreground" strokeWidth={1.8} />
                  </div>
                  <div>
                    <p className="font-medium text-sm md:text-base leading-tight">{item.title}</p>
                    <p className="text-muted-foreground text-xs md:text-sm mt-1">{item.subtitle}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Action links */}
            <div className="mt-3 md:mt-4 flex flex-col gap-0 border border-border rounded-3xl overflow-hidden">
              <button className="flex items-center gap-3 px-5 py-4 text-sm font-medium hover:bg-muted transition-colors text-left">
                <FileText className="w-5 h-5 text-muted-foreground" />
                <span className="flex-1">Скачать презентацию</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Right: Gallery carousel with video as first slide */}
          <ScrollReveal className="flex-1 min-h-[400px] md:min-h-[580px]" delay={0.2}>
            <div className="relative w-full h-full rounded-3xl overflow-hidden bg-muted">
              <AnimatePresence mode="wait" initial={false}>
                {slides[current].type === "video" ? (
                  <motion.div
                    key="video"
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <iframe
                      src={`https://www.youtube.com/embed/${PROJECT_VIDEO_ID}?rel=0&modestbranding=1`}
                      title="Видео о проекте"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  </motion.div>
                ) : (
                  <motion.img
                    key={current}
                    src={(slides[current] as { type: "image"; src: string }).src}
                    alt={`Фото ЛЮКСОР ${current}`}
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  />
                )}
              </AnimatePresence>

              {/* Navigation */}
              <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-md transition-colors z-10"
              >
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </button>
              <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-md transition-colors z-10"
              >
                <ChevronRight className="w-5 h-5 text-foreground" />
              </button>

              {/* Counter */}
              <div className="absolute bottom-4 right-4 bg-white/90 rounded-full px-4 py-1.5 text-sm font-medium z-10">
                {current + 1} / {total}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ProjectAbout;
