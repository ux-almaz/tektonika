import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "../SectionHeading";
import parkingStorageHero from "@/assets/project-parking-storage-hero.jpg";
import { parkingAssets } from "@/data/parkingAssets";

const fmtPrice = (value: number) => {
  if (value >= 1_000_000) {
    return `от ${(value / 1_000_000).toLocaleString("ru-RU", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    })} млн ₽`;
  }

  return `от ${(value / 1_000).toLocaleString("ru-RU", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })} тыс ₽`;
};

const storageMinPrice = Math.min(...parkingAssets.filter((item) => item.type === "storage").map((item) => item.price));
const parkingMinPrice = Math.min(...parkingAssets.filter((item) => item.type === "parking").map((item) => item.price));

const assetCards = [
  {
    title: "Кладовые",
    price: fmtPrice(storageMinPrice),
    description: "Для хранения вещей, которым не хватает места в квартире.",
    href: "/parking?type=storage",
  },
  {
    title: "Машино-места",
    price: fmtPrice(parkingMinPrice),
    description: "Собственное парковочное место рядом с домом и быстрым доступом к лифту.",
    href: "/parking?type=parking",
  },
] as const;

const ProjectAssetsSection = () => {
  return (
    <section id="project-assets" className="pt-16 pb-16 md:pt-24 md:pb-24">
      <div className="site-container">
        <div className="mb-10 md:mb-12">
          <SectionHeading title="Кладовые и машино-места" />
          <div className="mt-6 max-w-[620px]">
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
              Пространства спроектированы как продолжение жилой среды: удобная навигация, яркое освещение,
              быстрый доступ к лифтам и продуманная инфраструктура для хранения и парковки.
            </p>
            <Link
              to="/parking"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              Смотреть все
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <motion.div
          className="w-full overflow-hidden rounded-[32px] bg-card"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="pb-3 md:pb-4">
            <div className="relative overflow-hidden rounded-[28px] bg-muted h-[360px] md:h-[620px]">
              <img
                src={parkingStorageHero}
                alt="Подземный паркинг и инфраструктура хранения в проекте"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <div className="grid gap-3 px-3 pb-3 md:grid-cols-2 md:px-4 md:pb-4">
            {assetCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  to={card.href}
                  className="group flex h-full min-h-[190px] flex-col justify-between rounded-[28px] bg-muted p-6 transition-transform hover:-translate-y-0.5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-display text-[28px] font-medium leading-[0.95] tracking-[-0.04em] text-foreground md:text-[36px]">
                        {card.title}
                      </p>
                      <p className="mt-2 text-[28px] font-medium leading-none tracking-[-0.04em] text-foreground md:text-[36px]">
                        {card.price}
                      </p>
                    </div>

                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-background text-foreground transition-transform group-hover:scale-105">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>

                  <p className="max-w-[36ch] text-sm leading-relaxed text-muted-foreground md:text-base">
                    {card.description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectAssetsSection;
