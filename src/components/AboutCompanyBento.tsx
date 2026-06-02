import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, School } from "lucide-react";

import SectionHeading from "./SectionHeading";
import tektonika from "@/assets/tektonika-logo.svg";

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
});

const cardBase =
  "rounded-3xl bg-card border border-border overflow-hidden flex flex-col";

/** Единый стиль подписей под цифрами и заголовками в bento */
const bentoDesc = "text-[15px] md:text-[17px] font-[450] leading-snug";
const bentoDescMuted = `${bentoDesc} text-muted-foreground`;
const bentoDescOnPhoto = `${bentoDesc} text-background/90`;

const AboutCompanyBento = () => {
  return (
    <section id="about-bento" className="py-16 md:py-24 bg-background">
      <div className="site-container">
        <SectionHeading title="О компании" />

        <div
          className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4
            md:grid-rows-[minmax(240px,auto)_minmax(132px,auto)]"
        >
          {/* 1 — фото, левая колонка */}
          <motion.article
            {...reveal(0)}
            className={`${cardBase} relative min-h-[220px] md:min-h-0 md:col-start-1 md:row-start-1`}
          >
            <img
              src="/luxor2.jpg"
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 via-foreground/25 to-transparent" />
            <p className="relative z-10 mt-auto p-5 md:p-6 font-display text-xl md:text-2xl font-medium leading-snug text-background">
              <span className="text-primary">&gt;0,7 млн м²</span>
              <span className={`block mt-1 ${bentoDescOnPhoto}`}>
                совокупный объём проектов в Крыму
              </span>
            </p>
          </motion.article>

          {/* 2 — города присутствия */}
          <motion.article
            {...reveal(0.05)}
            className={`${cardBase} relative p-5 md:p-6 justify-end min-h-[160px] md:min-h-0 md:col-start-1 md:row-start-2 overflow-hidden`}
          >
            <img
              src="/cities-abstract-map.png"
              alt=""
              className="pointer-events-none absolute left-1/2 top-0 z-0 h-[92%] w-[108%] max-w-none -translate-x-1/2 object-contain object-top"
              loading="lazy"
              decoding="async"
            />
            <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,transparent_20%,hsl(var(--card))_100%)]" />
            <div className="relative z-[2] mt-auto">
              <p className="font-display text-4xl md:text-5xl font-medium leading-none text-primary">
                5
              </p>
              <p className={`${bentoDescMuted} mt-2`}>городов присутствия</p>
            </div>
          </motion.article>

          {/* 3 — проекты */}
          <motion.article
            {...reveal(0.08)}
            className={`${cardBase} p-5 md:p-6 items-center justify-center text-center min-h-[140px] md:min-h-0 md:col-start-2 md:row-start-1`}
          >
            <p className="font-display text-4xl md:text-5xl font-medium leading-none text-primary">
              9
            </p>
            <p className={`${bentoDescMuted} mt-3`}>
              девелоперских проектов
              <br />
              в разработке
            </p>
          </motion.article>

          {/* 4 — инфраструктура */}
          <motion.article
            {...reveal(0.1)}
            className={`${cardBase} p-5 md:p-6 items-center justify-center text-center min-h-[140px] md:min-h-0 md:col-start-3 md:row-start-1`}
          >
            <School className="h-8 w-8 text-primary mb-3" strokeWidth={2} aria-hidden />
            <p className={bentoDescMuted}>
              Строим школы сады, объекты социальной инфраструктуры
            </p>
          </motion.article>

          {/* 5 — ключи / сдача */}
          <motion.article
            {...reveal(0.12)}
            className={`${cardBase} relative min-h-[220px] md:min-h-0 md:col-start-4 md:row-start-1`}
          >
            <img
              src="/landscapedesign.png"
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-foreground/65 via-foreground/15 to-transparent" />
            <p className="relative z-10 p-5 md:p-6 font-display text-xl md:text-2xl font-medium leading-snug text-background">
              <span className="text-primary">77 га</span>
              <span className={`block mt-1 ${bentoDescOnPhoto}`}>
                земельный банк для развития
              </span>
            </p>
          </motion.article>

          {/* 6 — о компании */}
          <motion.article
            {...reveal(0.16)}
            className={`${cardBase} p-5 md:p-8 min-h-[160px] md:min-h-0 md:col-start-2 md:col-span-2 md:row-start-2 flex flex-col justify-center`}
          >
            <img
              src={tektonika}
              alt="Тектоника"
              className="h-9 md:h-10 w-auto self-start shrink-0"
            />
            <p className={`${bentoDescMuted} leading-relaxed mt-16 md:mt-20 max-w-xl`}>
              Тектоника Девелопмент — крымский девелопер, который смотрит на шаг
              вперёд рынка. Мы не воспроизводим то, что уже есть, — мы задаём новую
              планку: в архитектуре, в качестве, в отношении к покупателю.
            </p>
          </motion.article>

          {/* 7 — CTA */}
          <motion.article
            {...reveal(0.18)}
            className={`${cardBase} p-5 md:p-6 justify-center min-h-[120px] md:min-h-0 md:col-start-4 md:row-start-2`}
          >
            <div className="flex flex-col gap-3 w-full">
              <Link to="/contacts" className="w-full">
                <button
                  type="button"
                  className="w-full rounded-pill bg-primary text-primary-foreground min-h-[50px] px-[30px] py-[15px] text-sm font-medium hover:bg-primary/90 transition-colors inline-flex items-center justify-center gap-2"
                >
                  Связаться
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </Link>
              <Link to="/contacts" className="w-full">
                <button
                  type="button"
                  className="w-full rounded-pill bg-muted text-foreground min-h-[50px] px-[30px] py-[15px] text-sm font-medium hover:bg-muted/80 transition-colors inline-flex items-center justify-center gap-2"
                >
                  Партнёрам
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </Link>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
};

export default AboutCompanyBento;
