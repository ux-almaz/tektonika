import ecologyImg from "@/assets/advantage-ecology.jpg";
import advantageInfrastructureImg from "@/assets/advantage-infrastructure.jpg";
import landscapingImg from "@/assets/advantage-landscaping.jpg";
import courtyardImg from "@/assets/about-courtyard.jpg";
import BlurReveal from "@/components/BlurReveal";
import { PremiumReveal } from "@/components/project/premium/PremiumParallax";
import { useLuxorPremiumMotion } from "@/contexts/LuxorPremiumMotionContext";

const DEFAULT_EYEBROW = "Расположение и двор";
const DEFAULT_DESCRIPTION =
  "Комплекс встраивается в привычный ритм города: рядом инфраструктура для семьи, спокойные дворы и удобный выезд к ключевым точкам — без шума магистралей.";

const GRID_CAPTIONS = [
  "Авторское благоустройство и озеленение",
  "Закрытый двор без машин",
  "Тишина и приватность локации",
  "Сервис и инфраструктура рядом с домом",
] as const;

type GallerySlot = string | typeof landscapingImg;

function resolveSrc(src: GallerySlot): string {
  return typeof src === "string" ? src : src;
}

export interface ProjectLocationLandscapingProps {
  eyebrow?: string;
  description?: string;
  galleryOverrides?: [GallerySlot?, GallerySlot?, GallerySlot?, GallerySlot?];
  photoCardOverrides?: [GallerySlot?, GallerySlot?];
}

const TileImage = ({ src, alt }: { src: string; alt: string }) => (
  <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
);

const LuxorPremiumLocation = ({
  eyebrow = DEFAULT_EYEBROW,
  description = DEFAULT_DESCRIPTION,
  galleryOverrides,
  photoCardOverrides,
}: ProjectLocationLandscapingProps) => {
  const premium = useLuxorPremiumMotion();

  const hero: GallerySlot =
    galleryOverrides?.[0] ?? photoCardOverrides?.[0] ?? landscapingImg;
  const row: [GallerySlot, GallerySlot, GallerySlot] = [
    galleryOverrides?.[1] ?? photoCardOverrides?.[1] ?? courtyardImg,
    galleryOverrides?.[2] ?? ecologyImg,
    galleryOverrides?.[3] ?? advantageInfrastructureImg,
  ];

  const tiles: { src: GallerySlot; caption: string }[] = [
    { src: hero, caption: GRID_CAPTIONS[0] },
    { src: row[0], caption: GRID_CAPTIONS[1] },
    { src: row[1], caption: GRID_CAPTIONS[2] },
    { src: row[2], caption: GRID_CAPTIONS[3] },
  ];

  const heroClass =
    "relative mb-4 aspect-[21/9] min-h-[200px] w-full overflow-hidden rounded-[14px] md:mb-5 md:min-h-[240px] md:rounded-2xl lg:max-h-[min(52vh,560px)]";
  const cardClass =
    "relative aspect-[3/4] w-full min-w-0 overflow-hidden rounded-[14px] md:rounded-2xl";

  const renderHero = () => (
    <>
      <TileImage src={resolveSrc(tiles[0].src)} alt={tiles[0].caption} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
      <p className="absolute bottom-0 left-0 max-w-[min(100%,28rem)] p-4 font-medium leading-snug text-white md:p-6 md:text-lg">
        {tiles[0].caption}
      </p>
    </>
  );

  const renderCard = (tile: (typeof tiles)[number]) => (
    <>
      <TileImage src={resolveSrc(tile.src)} alt={tile.caption} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
      <p className="absolute bottom-0 left-0 p-4 text-sm font-medium leading-snug text-white md:p-5 md:text-base">
        {tile.caption}
      </p>
    </>
  );

  return (
    <section id="project-location" className="relative z-30 border-0 bg-white py-16 text-neutral-950 md:py-24">
      <div className="site-container">
        <PremiumReveal className="mb-8 grid grid-cols-1 gap-8 md:mb-10 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-0">
          <div className="lg:col-span-3">
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
          </div>
          <div className="lg:col-span-8 lg:col-start-5">
            {premium ? (
              <BlurReveal
                text={description}
                as="p"
                mode="words"
                delay={0.06}
                stagger={0.02}
                className="max-w-4xl text-lg font-medium leading-snug tracking-tight text-neutral-900 md:text-xl lg:text-[22px] lg:leading-relaxed"
              />
            ) : (
              <p className="max-w-4xl text-lg font-medium leading-snug tracking-tight text-neutral-900 md:text-xl lg:text-[22px] lg:leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </PremiumReveal>

        <PremiumReveal delay={0.1}>
          <div className={heroClass}>{renderHero()}</div>
        </PremiumReveal>

        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3 md:gap-5">
          {tiles.slice(1).map((tile, i) => (
            <PremiumReveal key={tile.caption} delay={0.12 + i * 0.08} className="min-w-0">
              <div className={cardClass}>{renderCard(tile)}</div>
            </PremiumReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LuxorPremiumLocation;
