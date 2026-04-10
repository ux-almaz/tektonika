import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import PillButton from "./PillButton";
import TextReveal from "./TextReveal";
import CountUp from "./CountUp";
import tektonika from "@/assets/tektonika-logo.svg";
import logoSber from "@/assets/logo-sber.png";
import logoVtb from "@/assets/logo-vtb.png";
import logoTbank from "@/assets/logo-tbank.png";
import aboutHero from "@/assets/about-hero.jpg";
import aboutCourtyard from "@/assets/about-courtyard.jpg";
import aboutConstruction from "@/assets/about-construction.jpg";

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

const team = [
  { photo: aboutHero,         name: "Александр Петров",  role: "Генеральный директор" },
  { photo: aboutCourtyard,    name: "Мария Соколова",    role: "Коммерческий директор" },
  { photo: aboutConstruction, name: "Дмитрий Козлов",    role: "Главный архитектор" },
  { photo: aboutHero,         name: "Екатерина Новикова", role: "Финансовый директор" },
  { photo: aboutCourtyard,    name: "Сергей Лебедев",    role: "Руководитель продаж" },
  { photo: aboutConstruction, name: "Анна Смирнова",     role: "Главный инженер" },
  { photo: aboutHero,         name: "Павел Орлов",       role: "Директор по маркетингу" },
  { photo: aboutCourtyard,    name: "Ирина Волкова",     role: "Руководитель юр. отдела" },
  { photo: aboutConstruction, name: "Андрей Морозов",    role: "Директор по строительству" },
  { photo: aboutHero,         name: "Ольга Федорова",    role: "HR-директор" },
  { photo: aboutCourtyard,    name: "Виктор Кузнецов",   role: "Главный проектировщик" },
  { photo: aboutConstruction, name: "Наталья Белова",    role: "Руководитель дизайна" },
  { photo: aboutHero,         name: "Роман Захаров",     role: "Директор по закупкам" },
  { photo: aboutCourtyard,    name: "Елена Попова",      role: "Руководитель сервиса" },
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
              TEKTONIKA — это девелоперская компания, специализирующаяся на создании современных жилых комплексов премиум и бизнес-класса. Мы объединяем передовые архитектурные решения с высочайшими стандартами качества строительства.
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

        {/* Team photos */}
        <div className="overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <motion.p
              className="text-xs uppercase tracking-widest text-muted-foreground"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Команда
            </motion.p>
            <div className="flex gap-2">
              <button
                onClick={() => scroll("left")}
                className="flex items-center justify-center w-9 h-9 rounded-full border border-foreground/20 hover:border-foreground/50 hover:bg-foreground/5 transition-colors"
                aria-label="Назад"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="flex items-center justify-center w-9 h-9 rounded-full border border-foreground/20 hover:border-foreground/50 hover:bg-foreground/5 transition-colors"
                aria-label="Вперёд"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="relative">
          <div ref={scrollRef} className="overflow-x-auto overflow-y-hidden scrollbar-hide -mx-4 px-4">

            <div className="flex gap-3 pr-4" style={{ width: "max-content" }}>
              {team.map((member, i) => (
                <motion.div
                  key={member.name}
                  className="relative overflow-hidden rounded-2xl bg-background shrink-0"
                  style={{ width: 180, aspectRatio: "3/4" }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.07 * i }}
                >
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white text-sm font-medium leading-tight">{member.name}</p>
                    <p className="text-white/65 text-xs mt-0.5">{member.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="pointer-events-none absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-muted to-transparent" />
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
