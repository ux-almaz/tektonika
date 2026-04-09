import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "../ScrollReveal";
import { ChevronLeft, ChevronRight, MapPin, TreePine, Plane, GraduationCap, FileText } from "lucide-react";

const highlights = [
  { icon: MapPin, title: "Центр Симферополя", subtitle: "в 10 минутах" },
  { icon: TreePine, title: "Парки и скверы", subtitle: "рядом с комплексом" },
  { icon: Plane, title: "Аэропорт", subtitle: "в 15 минутах на авто" },
  { icon: TreePine, title: "Побережье Крыма", subtitle: "в 30 минутах на авто" },
  { icon: FileText, title: "Городская прописка", subtitle: "для жителей комплекса" },
  { icon: GraduationCap, title: "Школы и детские сады", subtitle: "в шаговой доступности" },
];

const PROJECT_VIDEO_ID = "dQw4w9WgXcQ"; // Replace with actual YouTube video ID

const gallerySlides = [
  { type: "video" as const },
  { type: "image" as const, src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80&fm=webp" },
  { type: "image" as const, src: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=1200&q=80&fm=webp" },
  { type: "image" as const, src: "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=1200&q=80&fm=webp" },
  { type: "image" as const, src: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80&fm=webp" },
  { type: "image" as const, src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80&fm=webp" },
];

const ProjectAbout = () => {
  const [current, setCurrent] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const total = gallerySlides.length;
  const prev = () => setCurrent((c) => (c === 0 ? total - 1 : c - 1));
  const next = () => setCurrent((c) => (c === total - 1 ? 0 : c + 1));

  return (
    <section id="project-about" className="py-16 md:py-24">
      <div className="site-container">
        {/* Top: Title + Description */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 mb-12 md:mb-16">
          <ScrollReveal className="lg:w-[45%] shrink-0">
            <h2 className="font-display text-[28px] md:text-[40px] font-normal leading-[1.1] tracking-[-1px]">
              Комфортная жизнь<br />в&nbsp;сердце Крыма
            </h2>
          </ScrollReveal>

          <ScrollReveal className="flex-1" delay={0.15}>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              ЖК «Тектоника» — это современный жилой комплекс бизнес-класса, расположенный в одном из лучших районов Симферополя. Комплекс включает несколько корпусов с разнообразными планировками квартир — от уютных студий до просторных четырёхкомнатных апартаментов.
            </p>
            {expanded && (
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mt-4">
                Архитектура комплекса выполнена в современном стиле с использованием натуральных материалов. Панорамное остекление обеспечивает максимум естественного света, а продуманные планировки позволяют эффективно использовать каждый квадратный метр. Все квартиры сдаются с предчистовой отделкой. Высота потолков — 3,1 метра.
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
                {gallerySlides[current].type === "video" ? (
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
                    src={(gallerySlides[current] as { type: "image"; src: string }).src}
                    alt={`Фото ЖК Тектоника ${current}`}
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
