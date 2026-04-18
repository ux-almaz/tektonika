import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import PillButton from "./PillButton";
import TextReveal from "./TextReveal";
import CountUp from "./CountUp";
import NewsCard from "./NewsCard";
import SectionHeading from "./SectionHeading";
import tektonika from "@/assets/tektonika-logo.svg";
import logoSber from "@/assets/logo-sber.png";
import logoVtb from "@/assets/logo-vtb.png";
import logoTbank from "@/assets/logo-tbank.png";

const stats = [
  { value: "20", label: "лет на рынке" },
  { value: "20+", label: "проектов" },
  { value: "15 тыс.", label: "покупателей" },
];

const partnerLogos = [
  { name: "Сбер", logo: logoSber },
  { name: "ВТБ", logo: logoVtb },
  { name: "Т-Банк", logo: logoTbank },
];

// Duplicate for seamless loop
const tickerLogos = [...partnerLogos, ...partnerLogos, ...partnerLogos, ...partnerLogos];

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

const AboutSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "right" ? 380 : -380, behavior: "smooth" });
  };

  return (
  <section id="about" className="py-16 md:py-24 bg-muted">
    <div className="site-container">
      <div className="flex flex-col gap-12">
        {/* Logo */}
        <TextReveal as="div" className="inline-block">
          <img src={tektonika} alt="Тектоника" className="h-12 md:h-16" />
        </TextReveal>

        {/* Description + stats */}
        <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-12">
          <div className="max-w-[520px]">
            <motion.p
              className="text-muted-foreground text-base md:text-lg leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            >
              TEKTONIKA — это девелоперская компания, специализирующаяся на создании современных жилых комплексов премиум и бизнес-класса.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <PillButton variant="yellow" withArrow className="mt-8">
                Подробнее
              </PillButton>
            </motion.div>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:gap-12 gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                className={`flex items-baseline gap-4 md:flex-col md:items-start md:gap-1 ${i > 0 ? "border-t border-foreground/20 pt-6 md:border-t-0 md:pt-0 md:border-l md:pl-12" : ""}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 + i * 0.15 }}
              >
                <CountUp value={s.value} className="font-display text-5xl md:text-[64px] font-normal leading-none shrink-0" duration={2} />
                <p className="text-muted-foreground text-sm uppercase tracking-wide">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Media block (merged) */}
        <div>
          <SectionHeading
            title="Медиа"
            rightElement={
              <a href="/media" className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wide hover:text-muted-foreground transition-colors">
                Все публикации
                <ArrowUpRight className="h-4 w-4" />
              </a>
            }
          />
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.map((n, i) => (
              <motion.div
                key={n.title}
                className="flex"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.12 * i }}
              >
                <NewsCard {...n} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Partners ticker */}
        <div>
          <motion.p
            className="text-xs uppercase tracking-widest text-muted-foreground mb-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Партнёры
          </motion.p>
          <div className="relative overflow-hidden">
            {/* Fade edges */}
            <div className="pointer-events-none absolute left-0 top-0 h-full w-16 z-10 bg-gradient-to-r from-muted to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 h-full w-16 z-10 bg-gradient-to-l from-muted to-transparent" />
            <div className="flex animate-marquee">
              {tickerLogos.map((p, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center shrink-0 w-48 px-10"
                >
                  <img
                    src={p.logo}
                    alt={p.name}
                    className="h-9 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

export default AboutSection;
