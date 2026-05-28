import { useState, useCallback } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

interface PremiumGalleryProps {
  title: string;
  subtitle: string;
  images: string[];
}

const PremiumGallery = ({ title, subtitle, images }: PremiumGalleryProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const onSelect = useCallback((carouselApi: CarouselApi) => {
    if (!carouselApi) return;
    setCurrent(carouselApi.selectedScrollSnap());
  }, []);

  const scrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api],
  );

  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: "#0a0a0a" }}>
      <div className="site-container">
        <ScrollReveal>
          <p
            className="mb-2 text-xs uppercase tracking-[0.25em]"
            style={{ color: "hsl(var(--luxor-burgundy-light))" }}
          >
            {subtitle}
          </p>
          <h2 className="text-3xl uppercase tracking-[0.08em] text-white md:text-5xl">{title}</h2>
        </ScrollReveal>
      </div>

      <div className="mt-10">
        <Carousel
          setApi={(carouselApi) => {
            setApi(carouselApi);
            if (carouselApi) {
              carouselApi.on("select", () => onSelect(carouselApi));
            }
          }}
          opts={{ loop: true, align: "center" }}
        >
          <CarouselContent>
            {images.map((src, idx) => (
              <CarouselItem key={idx} className="basis-full pl-0 md:basis-[80%]">
                <div className="flex h-[50vh] items-center justify-center md:h-[68vh]">
                  <img
                    src={src}
                    alt={`Gallery ${idx + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="site-container mx-auto mt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => api?.scrollPrev()}
                className="flex h-10 w-10 items-center justify-center rounded-full border text-white transition-all hover:border-white"
                style={{
                  borderColor: "hsla(var(--luxor-burgundy), 0.5)",
                  backgroundColor: "hsla(var(--luxor-burgundy), 0.3)",
                }}
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => api?.scrollNext()}
                className="flex h-10 w-10 items-center justify-center rounded-full border text-white transition-all hover:border-white"
                style={{
                  borderColor: "hsla(var(--luxor-burgundy), 0.5)",
                  backgroundColor: "hsla(var(--luxor-burgundy), 0.3)",
                }}
              >
                <ArrowRight className="h-4 w-4" />
              </button>
              <span className="ml-2 text-xs tracking-[0.15em] text-white/40">
                {String(current + 1).padStart(2, "0")} /{" "}
                {String(images.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          <div className="scrollbar-hide mt-4 flex gap-2 overflow-x-auto pb-2">
            {images.map((src, idx) => (
              <button
                key={idx}
                onClick={() => scrollTo(idx)}
                className={`h-14 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all md:h-16 md:w-24 ${
                  idx === current ? "opacity-100" : "opacity-40 hover:opacity-70"
                }`}
                style={{
                  borderColor:
                    idx === current ? "hsl(var(--luxor-burgundy-light))" : "transparent",
                }}
              >
                <img
                  src={src}
                  alt={`Thumbnail ${idx + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumGallery;
