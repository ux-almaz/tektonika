import { useState } from "react";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  image: string;
  images?: string[];
  badge: string;
  badgeVariant?: "yellow" | "white";
  tags?: string[];
  name: string;
  address: string;
  price: string;
  priceLabel: string;
  mortgage?: string;
  mortgageLabel?: string;
  large?: boolean;
}

const ProjectCard = ({
  image,
  images,
  badge,
  badgeVariant = "yellow",
  tags,
  name,
  address,
  price,
  priceLabel,
  mortgage,
  mortgageLabel,
  large = false,
}: ProjectCardProps) => {
  const allImages = images && images.length > 1 ? images : [image];
  const [activeIndex, setActiveIndex] = useState(0);

  const badgeClass =
    badgeVariant === "yellow"
      ? "bg-primary text-primary-foreground"
      : "bg-background text-foreground";

  return (
    <Link to="/project" className="border border-border bg-card overflow-hidden flex flex-col flex-1 rounded-3xl">
      {/* Image area */}
      <div
        className={`relative bg-muted overflow-hidden flex flex-col justify-between p-5 ${large ? "min-h-[583px]" : "min-h-[389px]"}`}
      >
        {/* Images */}
        {allImages.map((src, i) => (
          <div
            key={i}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
            style={{
              backgroundImage: `url(${src})`,
              opacity: i === activeIndex ? 1 : 0,
            }}
          />
        ))}

        {/* Hover zones — invisible strips */}
        {allImages.length > 1 && (
          <div className="absolute inset-0 z-10 flex">
            {allImages.map((_, i) => (
              <div
                key={i}
                className="flex-1 h-full"
                onMouseEnter={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}

        <div className="relative z-20 self-start flex flex-wrap items-center gap-1.5">
          <span className={`rounded-pill px-3.5 py-2 text-xs uppercase tracking-[0.3px] leading-[1.14] ${badgeClass}`}>
            {badge}
          </span>
          {tags?.map((tag) => (
            <span
              key={tag}
              className="rounded-pill px-3.5 py-2 text-xs uppercase tracking-[0.3px] leading-[1.14] bg-foreground/60 text-background backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Dots */}
        {allImages.length > 1 && (
          <div className="relative z-20 self-center flex items-center gap-3">
            {allImages.map((_, i) => (
              <div
                key={i}
                className={`h-0.5 w-10 transition-all duration-300 ${
                  i === activeIndex
                    ? "bg-primary"
                    : "bg-background/50"
                }`}
              />
            ))}
          </div>
        )}
        {allImages.length <= 1 && (
          <div className="relative z-20 self-center flex items-center gap-5">
            <div className="h-0.5 w-10 bg-primary" />
            <div className="h-0.5 w-10 bg-background/50" />
            <div className="h-0.5 w-10 bg-background/50" />
            <div className="h-0.5 w-10 bg-background/50" />
          </div>
        )}
      </div>

      {/* Info area */}
      <div className={`${large ? "flex flex-row items-center justify-between gap-6 flex-wrap" : "flex flex-col gap-4"} px-6 py-7`}>
        <div>
          <h3 className="font-display text-[32px] font-medium leading-[0.88]">{name}</h3>
          <p className="text-[hsl(220,10%,51%)] text-sm mt-3 leading-[1.43]">{address}</p>
        </div>

        <div className="flex flex-wrap items-center gap-10 md:gap-20">
          <div>
            <p className="font-display text-lg font-medium">{price}</p>
            <p className="text-[hsl(0,0%,49%)] text-lg">{priceLabel}</p>
          </div>
          {mortgage && (
            <div>
              <p className="font-display text-lg font-medium">{mortgage}</p>
              <p className="text-[hsl(0,0%,49%)] text-lg">{mortgageLabel}</p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
