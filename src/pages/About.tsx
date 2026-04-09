import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, TreePine, GraduationCap } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";
import CountUp from "@/components/CountUp";
import TextReveal from "@/components/TextReveal";
import PillButton from "@/components/PillButton";
import heroImg from "@/assets/about-hero.jpg";
import constructionImg from "@/assets/about-construction.jpg";
import courtyardImg from "@/assets/about-courtyard.jpg";
import tektonika from "@/assets/tektonika-logo.svg";
import valueNatureImg from "@/assets/value-nature.jpg";
import valueInteriorImg from "@/assets/value-interior.webp";
import valueBuildingImg from "@/assets/value-building.jpg";


/* ── Stats grid data ── */
const stats: { value: string; suffix?: string; label: string; accent?: boolean }[] = [
  { value: "9", label: "Регионов присутствия" },
  { value: "20", label: "Лет на рынке недвижимости" },
  { value: "900", label: "Сотрудников в штате" },
  { value: "4,5", suffix: "млн м²", label: "Ввели в эксплуатацию\nво всех регионах" },
  { value: "28", label: "Реализованных проектов", accent: true },
  { value: "9", suffix: "млн м²", label: "Самый большой КОТ\nв Европе" },
  { value: "6", suffix: "млн м²", label: "Перспективного\nстроительства", accent: true },
  { value: "25", label: "Построенных объектов для\nобразовательных и медицинских\nучреждений" },
];

/* ── Timeline data ── */
const timeline = [
  { year: "2025", title: "Новые горизонты", text: "Активное строительство в 3 регионах, более 1 200 квартир в продаже. Компания выходит на федеральный уровень и запускает программу «Умный квартал» с интегрированными системами управления инфраструктурой." },
  { year: "2022", title: "ЖК «Тектоника»", text: "Старт продаж флагманского проекта бизнес-класса ЖК «Тектоника». Уникальная архитектура, авторское благоустройство и закрытые дворы без машин стали новым стандартом качества для региона." },
  { year: "2019", title: "Награды и признание", text: "Вхождение в ТОП-10 застройщиков региона по объёмам ввода жилья. Получение премии «Лучший жилой комплекс» за проект комфорт-класса с инновационной планировкой общественных пространств." },
  { year: "2016", title: "Бизнес-класс", text: "Запуск первого проекта бизнес-класса с премиальной отделкой. Внедрение концепции «городской гостиной» — общих пространств без барьеров: площади, амфитеатры, пешеходные связи." },
  { year: "2012", title: "Расширение географии", text: "Выход на рынок коммерческой недвижимости и расширение присутствия в новых регионах. Реализация первого масштабного проекта комплексного освоения территории." },
  { year: "2008", title: "Первый жилой комплекс", text: "Сдан первый многоэтажный жилой комплекс на 120 квартир. Компания заложила принципы, которым следует до сих пор: качество материалов, соблюдение сроков, забота о среде." },
  { year: "2005", title: "Основание компании", text: "Начало деятельности в сфере жилищного строительства в Крыму. Небольшая команда профессионалов объединилась с целью создавать жильё, в котором хочется жить." },
];

/* ── Values cards data ── */
const valueCards: { title: string; subtitle?: string; image?: string; icon?: React.ComponentType<any>; span: string; tall: boolean }[] = [
  { title: "Закрытые дворы\nи зелёные кварталы", image: valueNatureImg, span: "col-span-1 lg:col-span-2", tall: true },
  { title: "Ландшафтный дизайн\nи благоустройство", subtitle: "Авторские парки, прогулочные\nаллеи и зоны отдыха", icon: TreePine, span: "col-span-1", tall: true },
  { title: "Премиальные интерьеры\nс панорамным остеклением", image: valueInteriorImg, span: "col-span-1", tall: false },
  { title: "Собственные школы\nи детские сады", subtitle: "Образовательная инфраструктура\nв шаговой доступности", icon: GraduationCap, span: "col-span-1", tall: false },
  { title: "Монолитное домостроение\nбизнес-класса", image: valueBuildingImg, span: "col-span-1", tall: false },
];

const About = () => {
  const [activeYear, setActiveYear] = useState(0);
  const yearScrollRef = useRef<HTMLDivElement>(null);

  const goTo = (idx: number) => {
    if (idx >= 0 && idx < timeline.length) setActiveYear(idx);
  };

  return (
  <div className="min-h-screen bg-background">
    <Header introDone />

    {/* ─── Hero (text only, like Kortros) ─── */}
    <section className="pt-28 md:pt-36 pb-16 md:pb-24">
      <div className="site-container">
        {/* Breadcrumbs */}
        <motion.div
          className="flex items-center gap-2 text-sm text-muted-foreground mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="hover:text-foreground transition-colors">Главная</Link>
          <span>·</span>
          <span className="text-foreground">О компании</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="font-display text-3xl md:text-4xl font-medium mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          О компании
        </motion.h1>

        {/* Big inline statement */}
        <ScrollReveal>
          <p className="font-display text-2xl md:text-[32px] lg:text-[38px] leading-[1.3] font-normal max-w-[900px]">
            <img src={tektonika} alt="Тектоника" className="inline-block h-[1em] align-baseline mr-2" /> — один из ведущих
            девелоперов Крыма, строящий современные жилые кварталы с уникальными
            инженерными и архитектурными решениями
          </p>
        </ScrollReveal>

        {/* Description paragraph */}
        <ScrollReveal delay={0.1}>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-[800px] mt-8">
            В каждом проекте мы создаём полноценную среду для комфортной жизни
            с транспортной и социальной инфраструктурой, а также применяем
            собственные технологии, такие как «умный дом» с интегрированными
            системами искусственного интеллекта
          </p>
          <div className="w-full h-px bg-border mt-10" />
        </ScrollReveal>

        {/* Stats 4×2 grid */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-8">
          {stats.map((s, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <div className="flex flex-col gap-2">
                <p className={`font-display text-4xl md:text-5xl lg:text-6xl font-medium ${s.accent ? "text-primary" : "text-foreground"}`}>
                  {s.value}
                  {s.suffix && (
                    <span className={`text-base md:text-lg font-medium uppercase ml-1 align-super ${s.accent ? "text-primary" : "text-foreground"}`}>
                      {s.suffix}
                    </span>
                  )}
                </p>
                <p className="text-muted-foreground text-sm md:text-base whitespace-pre-line">{s.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* ─── History Slider ─── */}
    <section className="py-16 md:py-24">
      <div className="site-container">
        <SectionHeading title="История компании" />

        {/* Year pills row */}
        <div className="mt-10 relative">
          <div
            ref={yearScrollRef}
            className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
          >
            {timeline.map((item, i) => (
              <button
                key={item.year}
                onClick={() => goTo(i)}
                className={`flex-shrink-0 rounded-pill px-5 py-2.5 text-sm font-medium transition-colors ${
                  activeYear === i
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.year}
              </button>
            ))}
          </div>
        </div>

        {/* Content cards */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden min-h-[420px]">
          {/* Left — colored panel with year */}
          <div className="relative bg-primary overflow-hidden flex items-end p-10 md:p-14 min-h-[300px] lg:min-h-0">
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-primary/60" />
            <div className="absolute top-0 right-0 w-3/4 h-3/4 rounded-full bg-primary-foreground/5 blur-3xl translate-x-1/4 -translate-y-1/4" />
            <AnimatePresence mode="wait">
              <motion.p
                key={activeYear}
                className="relative z-10 font-display text-5xl md:text-6xl lg:text-7xl font-medium text-primary-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {timeline[activeYear].year} год
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Right — text panel */}
          <div className="relative bg-card border border-border border-l-0 flex flex-col justify-between p-10 md:p-14">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeYear}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3 className="font-display text-xl md:text-2xl font-medium mb-4">
                  {timeline[activeYear].title}
                </h3>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                  {timeline[activeYear].text}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Nav arrows */}
            <div className="flex items-center gap-3 mt-8">
              <button
                onClick={() => goTo(activeYear - 1)}
                disabled={activeYear === 0}
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground disabled:opacity-30 hover:bg-border transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <button
                onClick={() => goTo(activeYear + 1)}
                disabled={activeYear === timeline.length - 1}
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground disabled:opacity-30 hover:bg-border transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <span className="ml-2 text-sm text-muted-foreground">
                {activeYear + 1} / {timeline.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ─── Values ─── */}
    <section className="py-16 md:py-24">
      <div className="site-container">
        <SectionHeading title="Наши ценности" />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {valueCards.map((card, i) => (
            <ScrollReveal key={i} delay={i * 0.08} className={card.span}>
              <div
                className={`relative rounded-3xl overflow-hidden flex flex-col justify-between h-full ${
                  card.tall ? "min-h-[380px]" : "min-h-[340px]"
                } ${card.image ? "" : "bg-muted"}`}
              >
                {/* Background image */}
                {card.image && (
                  <img
                    src={card.image}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                {card.image && <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-foreground/10" />}

                {/* Icon for non-image cards */}
                {card.icon && (
                  <div className="absolute bottom-20 right-7 opacity-15">
                    <card.icon className="h-32 w-32 text-foreground" strokeWidth={1} />
                  </div>
                )}

                {/* Title */}
                <div className="relative z-10 p-7">
                  <h3
                    className={`font-display text-xl md:text-2xl font-medium whitespace-pre-line leading-tight ${
                      card.image ? "text-background" : "text-foreground"
                    }`}
                  >
                    {card.title}
                  </h3>
                </div>

                {/* Bottom: subtitle + arrow */}
                <div className="relative z-10 p-7 pt-0 flex items-end justify-between gap-4">
                  {card.subtitle && (
                    <p className="text-muted-foreground text-sm whitespace-pre-line">{card.subtitle}</p>
                  )}
                  <div className={`ml-auto flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    card.image ? "bg-background text-foreground" : "bg-background text-foreground shadow-sm"
                  }`}>
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>




    {/* ─── CTA ─── */}
    <section className="pb-16 md:pb-24">
      <div className="site-container">
        <ScrollReveal>
          <div className="bg-foreground text-background rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-[600px]">
              <h3 className="font-display text-3xl md:text-4xl font-medium leading-[1.1]">
                Хотите узнать больше о наших проектах?
              </h3>
              <p className="text-background/60 mt-4 text-base leading-relaxed">
                Оставьте заявку и наш менеджер свяжется с вами для бесплатной консультации
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <Link to="/#projects">
                <PillButton variant="yellow" className="w-full sm:w-auto whitespace-nowrap">
                  Смотреть проекты
                </PillButton>
              </Link>
              <PillButton variant="outline" className="w-full sm:w-auto whitespace-nowrap border-background/30 text-background hover:bg-background/10">
                Получить консультацию
              </PillButton>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>

    <Footer />
  </div>
  );
};

export default About;
