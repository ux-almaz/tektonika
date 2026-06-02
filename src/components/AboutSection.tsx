import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import NewsCard from "./NewsCard";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";
import tektonika from "@/assets/tektonika-logo.svg";
import teamPhoto from "@/assets/team-office.jpg";

const metrics = [
  { value: "923 000", unit: "м²", label: "Портфель проектов" },
  { value: "77", unit: "га", label: "Земельный банк" },
  { value: "3", extra: "6", label: "Проекта в реализации / в разработке" },
  { value: "5", unit: "", label: "Регионов присутствия в Крыму" },
];

const news = [
  {
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80&fm=webp",
    title: "Выдача ключей нового корпуса ЖК Тектоника",
    date: "24.02.2025",
  },
  {
    image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600&q=80&fm=webp",
    title: "Планировки нового формата multispace: удобно работать и жить",
    date: "24.02.2025",
  },
  {
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80&fm=webp",
    title: "Старт продаж ЖК Тектоника",
    date: "24.02.2025",
  },
];

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
});

const aboutFacts = [
  { value: "0.7", unit: "млн м²", label: "Портфель проектов" },
  { value: "77", unit: "га", label: "Земельный банк" },
  { value: "3", extra: "6", label: "В реализации / в разработке" },
];

const SHOW_ABOUT_COMPANY = false;

const AboutSection = () => {
  return (
    <>
      {SHOW_ABOUT_COMPANY && (
      <section id="about-company" className="py-16 md:py-24 bg-background">
        <div className="site-container">
          <SectionHeading title="О компании" />

          <div className="mt-8 md:mt-10 grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 auto-rows-auto">
            <motion.div
              {...reveal(0)}
              className="lg:col-span-6 bg-card rounded-3xl py-6 pr-6 pl-0 md:py-10 md:pr-10 md:pl-0 flex flex-col justify-between min-h-[320px]"
            >
              <div className="flex items-center gap-3">
                <img src={tektonika} alt="Тектоника" className="h-9 md:h-10 w-auto shrink-0" />
              </div>

              <div className="mt-6">
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed mt-4 max-w-xl">
                  Мы строим в Крыму и ценим доверие покупателей: поэтому уделяем внимание качеству решений,
                  материалам и логике пространства — чтобы дом был удобным сегодня и актуальным завтра.
                </p>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link to="/contacts" className="sm:w-auto">
                  <button
                    type="button"
                    className="w-full sm:w-auto rounded-pill bg-primary text-primary-foreground min-h-[50px] px-[30px] py-[15px] text-sm font-medium hover:bg-primary/90 transition-colors inline-flex items-center justify-center gap-2"
                  >
                    Связаться
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </Link>
                <Link to="/contacts" className="sm:w-auto">
                  <button
                    type="button"
                    className="w-full sm:w-auto rounded-pill bg-muted text-foreground min-h-[50px] px-[30px] py-[15px] text-sm font-medium hover:bg-muted/80 transition-colors inline-flex items-center justify-center gap-2"
                  >
                    Партнёрам
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </Link>
              </div>
            </motion.div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-3 lg:gap-4 items-start self-end">
              {aboutFacts.map((f, i) => (
                <motion.div
                  key={f.label}
                  {...reveal(0.06 + i * 0.06)}
                  className="bg-card rounded-3xl p-6 md:p-7 flex flex-col min-h-[132px] self-start"
                >
                  <div className="mt-auto">
                    <div className="flex items-baseline gap-1 flex-wrap">
                      <span className="font-display text-3xl md:text-[40px] font-medium leading-none text-foreground">
                        {f.value}
                      </span>
                      {f.extra && (
                        <>
                          <span className="text-muted-foreground text-2xl font-light">/</span>
                          <span className="font-display text-3xl md:text-[40px] font-medium leading-none text-primary">
                            {f.extra}
                          </span>
                        </>
                      )}
                      {f.unit && (
                        <span className="text-sm md:text-base font-medium text-muted-foreground ml-0.5">
                          {f.unit}
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground text-xs md:text-sm leading-snug mt-3">{f.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      )}

      <section id="media" className="py-16 md:py-24 bg-background">
        <div className="site-container">
          <SectionHeading
            title="Медиа"
            rightElement={
              <Link
                to="/media"
                className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wide hover:text-muted-foreground transition-colors"
              >
                Все публикации
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            }
          />
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {news.map((n, i) => (
              <ScrollReveal key={n.title} delay={0.12 * i} className="flex">
                <NewsCard {...n} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;
