import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ecologyImg from "@/assets/advantage-ecology.jpg";
import landscapingImg from "@/assets/advantage-landscaping.jpg";
import infrastructureImg from "@/assets/advantage-infrastructure.jpg";
import BlurReveal from "@/components/BlurReveal";
import { PremiumReveal } from "@/components/project/premium/PremiumParallax";
import { cn } from "@/lib/utils";

type AdvantagePhotoKey = "ecology" | "landscaping" | "infrastructure";
type CarouselSlideKey = AdvantagePhotoKey | "education" | "transport";

const hallPhoto2 = `/photos/${encodeURIComponent("Холл")}/${encodeURIComponent("photo_2026-03-27_16-55-39 (2).jpg")}`;

const slides: { key: CarouselSlideKey; caption: string; image: string }[] = [
  { key: "ecology", caption: "Тишина и приватность", image: ecologyImg },
  { key: "education", caption: "Для семей с детьми", image: hallPhoto2 },
  { key: "landscaping", caption: "Закрытый двор-сад", image: landscapingImg },
  { key: "transport", caption: "Паркинг у дома", image: "/luxor-parking.png" },
  { key: "infrastructure", caption: "Сервис и инфраструктура", image: infrastructureImg },
];

interface ProjectAdvantagesProps {
  photoOverrides?: Partial<Record<AdvantagePhotoKey, string>>;
  eyebrow?: string;
  headline?: string;
}

const DEFAULT_EYEBROW = "Преимущества проекта";
const DEFAULT_HEADLINE =
  "Авторская архитектура, благоустройство без автомобилей, инфраструктура для семей и сервис уровня комфорт-класса";

const slideBasis = "shrink-0 grow-0 basis-[82%] sm:basis-[52%] md:basis-[31.5%]";

const LuxorPremiumAdvantages = ({
  photoOverrides,
  eyebrow = DEFAULT_EYEBROW,
  headline = DEFAULT_HEADLINE,
}: ProjectAdvantagesProps) => {
  const resolvedSlides = slides.map((s) => {
    if (s.key === "ecology" || s.key === "landscaping" || s.key === "infrastructure") {
      const o = photoOverrides?.[s.key];
      return o ? { ...s, image: o } : s;
    }
    return s;
  });

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    containScroll: "trimSnaps",
    dragFree: false,
  });

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section id="project-advantages" className="relative z-10 border-0 bg-white py-16 text-neutral-950 md:py-24">
      <motion.div className="site-container">
        <PremiumReveal className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-0">
          <motion.div className="lg:col-span-3">
            <BlurReveal
              text={eyebrow}
              as="p"
              mode="words"
              className="text-[15px] leading-snug text-neutral-700 md:text-base md:leading-snug"
            />
          </motion.div>
          <motion.div className="lg:col-span-8 lg:col-start-5">
            <BlurReveal
              text={headline}
              as="p"
              mode="words"
              delay={0.06}
              stagger={0.025}
              className="max-w-4xl text-xl font-medium leading-[1.25] tracking-tight text-neutral-900 md:text-2xl lg:text-[28px] lg:leading-snug"
            />
          </motion.div>
        </PremiumReveal>

        <motion.div className="mt-10 flex items-center justify-end gap-1 md:mt-14">
          <button
            type="button"
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full transition-opacity",
              "hover:opacity-70 disabled:pointer-events-none disabled:opacity-25",
            )}
            aria-label="Предыдущий слайд"
            disabled={!canPrev}
            onClick={() => emblaApi?.scrollPrev()}
          >
            <ChevronLeft className="h-6 w-6" strokeWidth={1.15} aria-hidden />
          </button>
          <button
            type="button"
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full transition-opacity",
              "hover:opacity-70 disabled:pointer-events-none disabled:opacity-25",
            )}
            aria-label="Следующий слайд"
            disabled={!canNext}
            onClick={() => emblaApi?.scrollNext()}
          >
            <ChevronRight className="h-6 w-6" strokeWidth={1.15} aria-hidden />
          </button>
        </motion.div>

        <motion.div className="mt-5 overflow-hidden md:mt-6" ref={emblaRef}>
          <motion.div className="flex touch-pan-y gap-4 md:gap-5">
            {resolvedSlides.map((slide, i) => {
              const card = (
                <motion.div
                  className={cn(
                    "relative min-h-0 h-full w-full overflow-hidden rounded-[14px]",
                    "aspect-[3/4] max-h-[min(480px,62vw)] md:max-h-[min(480px,42vw)]",
                  )}
                >
                  <img src={slide.image} alt={slide.caption} className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
                  <p className="absolute bottom-0 left-0 z-10 max-w-[90%] p-4 font-display text-base font-medium leading-snug text-white md:p-5 md:text-lg">
                    {slide.caption}
                  </p>
                </motion.div>
              );

              return (
                <PremiumReveal key={slide.key} delay={0.08 * i} className={slideBasis}>
                  {card}
                </PremiumReveal>
              );
            })}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default LuxorPremiumAdvantages;
