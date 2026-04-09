import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import projectHero from "@/assets/project-hero-1.webp";
import aboutHero from "@/assets/about-hero.jpg";
import valueInterior from "@/assets/value-interior.webp";
import aboutCourtyard from "@/assets/about-courtyard.jpg";
import partnersConstruction from "@/assets/partners-construction.webp";
import tektonikaDark from "@/assets/tektonika-logo.svg";
import tektonikLight from "@/assets/tektonika-logo-light.svg";

type ImageCard = {
  type: "image";
  image: string;
  badge?: string;
  value: string;
  valueClass?: string;
  label: string;
  href: string;
  id: string;
};

type DarkCard = {
  type: "dark";
  badge?: string;
  value: string;
  valueClass?: string;
  label: string;
  href: string;
  id: string;
};

type LightCard = {
  type: "light";
  badge?: string;
  value: string;
  valueClass?: string;
  label: string;
  href: string;
  id: string;
};

type OfferCard = ImageCard | DarkCard | LightCard;

const cards: OfferCard[] = [
  {
    id: "project",
    type: "image",
    image: projectHero,
    value: "Старт\nпродаж!",
    valueClass: "text-[30px]",
    label: "ЖК Тектоника",
    href: "/project",
  },
  {
    id: "installment-0",
    type: "image",
    image: aboutHero,
    badge: "Рассрочка",
    value: "0%",
    label: "на квартиры",
    href: "/purchase",
  },
  {
    id: "discount-10",
    type: "dark",
    value: "до 10%",
    valueClass: "text-[38px]",
    label: "скидки\nна квартиры",
    href: "/catalog",
  },
  {
    id: "mortgage-6",
    type: "light",
    value: "от 6%",
    valueClass: "text-[38px]",
    label: "ипотека на\nвыгодных условиях",
    href: "/purchase",
  },
  {
    id: "installment-1-5",
    type: "image",
    image: valueInterior,
    badge: "Рассрочка",
    value: "0%",
    label: "на 1,5 года",
    href: "/purchase",
  },
  {
    id: "courtyard",
    type: "image",
    image: aboutCourtyard,
    value: "Закрытый\nдвор",
    valueClass: "text-[26px]",
    label: "без машин",
    href: "/project",
  },
  {
    id: "partners",
    type: "image",
    image: partnersConstruction,
    value: "Надёжный\nзастройщик",
    valueClass: "text-[22px]",
    label: "с 2004 года",
    href: "/about",
  },
  {
    id: "keys",
    type: "dark",
    value: "2026",
    valueClass: "text-[42px]",
    label: "срок сдачи\nпервой очереди",
    href: "/project",
  },
];

const CARD_H = "h-[200px] md:h-[260px]";

const CardWrapper = ({ id, href, i, light, children }: { id: string; href: string; i: number; light?: boolean; children: React.ReactNode }) => (
  <motion.div
    key={id}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.08 * i }}
    className="group w-[170px] hover:w-[220px] shrink-0 md:w-auto md:hover:w-auto md:flex-1 md:min-w-[120px] md:hover:[flex-grow:1.8] transition-[width,flex-grow] duration-300 ease-out relative"
    style={{ zIndex: 1 }}
  >
    <Link to={href} className={`block w-full ${CARD_H} rounded-3xl overflow-hidden relative`}>
      {children}
      <div className={`absolute bottom-4 right-4 z-10 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${light ? "bg-foreground/10" : "bg-white/20 backdrop-blur-sm"}`}>
        <ArrowUpRight className={`w-4 h-4 ${light ? "text-foreground" : "text-white"}`} />
      </div>
    </Link>
  </motion.div>
);

const SpecialOffersSection = () => (
  <section className="w-full pt-3 pb-2">
    <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="flex gap-3 px-5 md:px-10 lg:px-16 xl:px-[100px] 2xl:px-[140px] md:max-w-[2000px] md:mx-auto">
        {cards.map((card, i) => {
          if (card.type === "image") {
            return (
              <CardWrapper key={card.id} id={card.id} href={card.href} i={i}>
                <div className="relative w-full h-full">
                  <img
                    src={(card as ImageCard).image}
                    alt={card.label}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/50" />
                  <div className="relative h-full flex flex-col justify-between p-5">
                    <div className="flex items-start justify-between gap-2">
                      <img src={tektonikLight} alt="Тектоника" className="h-[14px] w-auto" />
                      {card.badge && (
                        <span className="text-[11px] font-medium text-white/90 bg-white/20 backdrop-blur-sm rounded-pill px-2.5 py-1 uppercase tracking-wide leading-none whitespace-nowrap">
                          {card.badge}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className={`text-background font-medium leading-none whitespace-pre-line ${card.valueClass ?? "text-[46px]"}`}>
                        {card.value}
                      </p>
                      {card.label && (
                        <p className="text-background/75 text-sm mt-1.5 leading-snug">{card.label}</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardWrapper>
            );
          }

          if (card.type === "dark") {
            return (
              <CardWrapper key={card.id} id={card.id} href={card.href} i={i}>
                <div className="bg-foreground w-full h-full flex flex-col justify-between p-5">
                  <img src={tektonikLight} alt="Тектоника" className="h-[14px] w-auto" />
                  <div>
                    <p className={`text-background font-medium leading-none whitespace-pre-line ${card.valueClass ?? "text-[46px]"}`}>
                      {card.value}
                    </p>
                    {card.label && (
                      <p className="text-background/65 text-sm mt-1.5 leading-snug whitespace-pre-line">{card.label}</p>
                    )}
                  </div>
                </div>
              </CardWrapper>
            );
          }

          return (
            <CardWrapper key={card.id} id={card.id} href={card.href} i={i} light>
              <div className="bg-muted w-full h-full flex flex-col justify-between p-5">
                <img src={tektonikaDark} alt="Тектоника" className="h-[14px] w-auto opacity-40" />
                <div>
                  <p className={`text-foreground font-medium leading-none whitespace-pre-line ${card.valueClass ?? "text-[46px]"}`}>
                    {card.value}
                  </p>
                  {card.label && (
                    <p className="text-brand-gray text-sm mt-1.5 leading-snug whitespace-pre-line">{card.label}</p>
                  )}
                </div>
              </div>
            </CardWrapper>
          );
        })}
      </div>
    </div>
  </section>
);


export default SpecialOffersSection;
