import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";
import PillButton from "@/components/PillButton";
import { Slider } from "@/components/ui/slider";
import { ArrowRight, Check, FileText, Phone, Send, Shield, Clock, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import projectHero from "@/assets/project-hero-1.webp";
import constructionPhoto from "@/assets/construction-photo.webp";
import heroMortgageIllustration from "@/assets/hero-mortgage-illustration.webp";
import mortgageIllustration from "@/assets/mortgage-illustration.webp";

/* ── helpers ── */
const fmt = (n: number) => n.toLocaleString("ru-RU");

function calcMonthly(price: number, downPercent: number, rate: number, years: number) {
  const principal = price - price * (downPercent / 100);
  if (principal <= 0) return 0;
  const mr = rate / 100 / 12;
  const n = years * 12;
  if (mr === 0) return Math.round(principal / n);
  return Math.round((principal * mr) / (1 - Math.pow(1 + mr, -n)));
}

/* ── data ── */
const heroTags = [
  "Первоначальный взнос — от 20%",
  "Сумма кредита — до 30 млн ₽",
  "На весь срок — до 30 лет",
];

const programs = [
  {
    id: "standard",
    tab: "Ипотека для всех",
    title: "Ипотека для всех",
    desc: "Нужен доступный первый взнос или большая сумма кредита? Мы подберём лучшие условия от ведущих банков.",
    stats: [
      { label: "первоначальный взнос", value: "от 20 %" },
      { label: "ставка", value: "от 5,5 %" },
      { label: "сумма кредита", value: "до 30 млн руб." },
      { label: "срок кредита", value: "до 30 лет" },
    ],
  },
  {
    id: "family",
    tab: "Семейная ипотека",
    title: "Семейная ипотека",
    desc: "Мечтаете выгодно купить квартиру с уютной детской? Воспользуйтесь программой семейной ипотеки с пониженной ставкой.",
    stats: [
      { label: "первоначальный взнос", value: "от 20,1 %" },
      { label: "ставка", value: "от 3,5 %" },
      { label: "сумма кредита", value: "до 12 млн руб." },
      { label: "срок кредита", value: "до 30 лет" },
    ],
  },
  {
    id: "military",
    tab: "Военная ипотека",
    title: "Военная ипотека",
    desc: "Вы военнослужащий с сертификатом НИС? Специальные условия для участников накопительно-ипотечной системы.",
    stats: [
      { label: "первоначальный взнос", value: "от 20 %" },
      { label: "ставка", value: "от 5,5 %" },
      { label: "сумма кредита", value: "5 218 000 руб." },
      { label: "срок кредита", value: "до 30 лет" },
    ],
  },
  {
    id: "parking",
    tab: "Паркинг в ипотеку",
    title: "Паркинг в ипотеку",
    desc: "Для полного счастья нужен паркинг? Оформите его в ипотеку на выгодных условиях.",
    stats: [
      { label: "первоначальный взнос", value: "от 20 %" },
      { label: "ставка", value: "от 18,49 %" },
      { label: "сумма кредита", value: "до 30 млн руб." },
      { label: "срок кредита", value: "до 30 лет" },
    ],
  },
];

/* ── mortgage calculator data ── */
const mortgagePrograms = [
  { id: "all", tab: "Все программы" },
  { id: "standard", tab: "Ипотека для всех  от 0,99 %" },
  { id: "family", tab: "Семейная ипотека  от 2 %" },
  { id: "military", tab: "Я военный или участник НИС" },
];

const bankOffers = [
  { name: "Альфа-Банк", program: "Семейная ипотека", rate: 3.5, logo: "А", color: "#EF3124", programId: "family" },
  { name: "ДОМ.РФ", program: "Ипотека для всех", rate: 20.2, logo: "Д", color: "#E4002B", programId: "standard" },
  { name: "Уралсиб", program: "Ипотека для всех", rate: 18.99, logo: "У", color: "#5B2D8E", programId: "standard" },
  { name: "Металлинвестбанк", program: "Ипотека для всех", rate: 19.9, logo: "М", color: "#0066B3", programId: "standard" },
  { name: "Сбербанк", program: "Семейная ипотека", rate: 5.5, logo: "С", color: "#21A038", programId: "family" },
  { name: "ВТБ", program: "Ипотека для всех", rate: 21.5, logo: "В", color: "#002882", programId: "standard" },
  { name: "Промсвязьбанк", program: "Военная ипотека", rate: 5.5, logo: "П", color: "#EF3124", programId: "military" },
];

const steps = [
  {
    num: "01",
    title: "Оставьте заявку",
    desc: "Заполните форму на сайте или позвоните нам. Мы подберём оптимальную программу.",
    icon: FileText,
  },
  {
    num: "02",
    title: "Получите одобрение",
    desc: "Мы отправим заявку сразу в несколько банков и поможем выбрать лучшие условия.",
    icon: Check,
  },
  {
    num: "03",
    title: "Выберите квартиру",
    desc: "Посетите наши проекты и подберите идеальную квартиру для вашей семьи.",
    icon: Shield,
  },
  {
    num: "04",
    title: "Подпишите договор",
    desc: "Оформите документы и подпишите договор в удобное для вас время.",
    icon: Send,
  },
  {
    num: "05",
    title: "Получите ключи",
    desc: "Заселяйтесь в новую квартиру и наслаждайтесь комфортной жизнью.",
    icon: Clock,
  },
];

const buyMethods = [
  {
    title: "Рассрочка",
    desc: "Рассрочка от застройщика без процентов и переплат. Первый взнос от 30%.",
    action: "Рассчитать условия",
  },
  {
    title: "Материнский капитал",
    desc: "Используйте материнский капитал как часть первоначального взноса или для погашения ипотеки.",
    action: "Подробнее",
  },
  {
    title: "Жилищные сертификаты",
    desc: "Принимаем жилищные сертификаты различных программ в счёт оплаты квартиры.",
    action: "Подробнее",
  },
];

/* ── component ── */
const HowToBuy = () => {
  const [activeProgram, setActiveProgram] = useState("standard");
  const [activeCalcProgram, setActiveCalcProgram] = useState("all");
  const [calcPrice, setCalcPrice] = useState(4_000_000);
  const [calcDown, setCalcDown] = useState(20);
  const [calcTerm, setCalcTerm] = useState(30);
  const [sortKey, setSortKey] = useState<"rate" | "payment" | "overpay" | "term" | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const downAmount = Math.round(calcPrice * calcDown / 100);

  const handleSort = (key: "rate" | "payment" | "overpay" | "term") => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const SortIcon = ({ col }: { col: string }) => {
    if (sortKey !== col) return <ArrowUpDown className="w-3.5 h-3.5 ml-1 opacity-40" />;
    return sortDir === "asc" ? <ArrowUp className="w-3.5 h-3.5 ml-1" /> : <ArrowDown className="w-3.5 h-3.5 ml-1" />;
  };

  const filteredBanks = useMemo(() => {
    let list = activeCalcProgram === "all" ? [...bankOffers] : bankOffers.filter((b) => b.programId === activeCalcProgram);
    if (sortKey) {
      list = [...list].sort((a, b) => {
        let va: number, vb: number;
        if (sortKey === "rate") { va = a.rate; vb = b.rate; }
        else if (sortKey === "payment") {
          va = calcMonthly(calcPrice, calcDown, a.rate, calcTerm);
          vb = calcMonthly(calcPrice, calcDown, b.rate, calcTerm);
        } else if (sortKey === "overpay") {
          const pa = calcMonthly(calcPrice, calcDown, a.rate, calcTerm);
          const pb = calcMonthly(calcPrice, calcDown, b.rate, calcTerm);
          va = pa * calcTerm * 12 - (calcPrice - downAmount);
          vb = pb * calcTerm * 12 - (calcPrice - downAmount);
        } else { va = 0; vb = 0; } // term is same for all
        return sortDir === "asc" ? va - vb : vb - va;
      });
    }
    return list;
  }, [activeCalcProgram, sortKey, sortDir, calcPrice, calcDown, calcTerm, downAmount]);

  const currentProgram = programs.find((p) => p.id === activeProgram)!;

  return (
    <div className="min-h-screen bg-background">
      <Header introDone />
      <main className="pt-20">

        {/* ── Hero ── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-brand-accent/20 via-brand-accent/10 to-background">
          <div className="site-container py-16 md:py-24 relative z-10">
            <div className="grid lg:grid-cols-[1fr_1fr] gap-8 items-center">
              <ScrollReveal>
                <div className="flex flex-wrap gap-2 mb-6">
                  {heroTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-1.5 rounded-full text-sm" style={{ backgroundColor: "#F7F7F7" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium leading-[1.1] mb-8 max-w-3xl">
                  Ипотека на
                  <br />
                  <span className="text-brand-accent">комфортных</span> условиях
                </h1>
                <div className="flex flex-wrap gap-4">
                  <Link to="/catalog">
                    <PillButton variant="yellow" className="py-3 px-8">
                      Выбрать квартиру
                    </PillButton>
                  </Link>
                  <PillButton variant="outline" className="py-3 px-8">
                    Получить консультацию
                  </PillButton>
                </div>
              </ScrollReveal>
              <div className="hidden lg:flex items-center justify-center">
                <svg width="320" height="320" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-20">
                  <circle cx="105" cy="105" r="45" stroke="currentColor" strokeWidth="18" />
                  <circle cx="215" cy="215" r="45" stroke="currentColor" strokeWidth="18" />
                  <line x1="250" y1="70" x2="70" y2="250" stroke="currentColor" strokeWidth="18" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* ── Mortgage Programs ── */}
        <section className="py-16 md:py-24">
          <div className="site-container">
            <ScrollReveal>
              <SectionHeading title="Ипотечные программы" />
              <p className="text-muted-foreground text-lg mt-2 mb-10 max-w-xl">
                на комфортных условиях
              </p>
            </ScrollReveal>

            {/* Tabs */}
            <ScrollReveal>
              <div className="flex flex-wrap gap-2 mb-10">
                {programs.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setActiveProgram(p.id)}
                    className={`px-5 py-2.5 rounded-full text-sm transition-all ${
                      activeProgram === p.id
                        ? "bg-foreground text-background"
                        : "bg-muted text-foreground hover:bg-muted/80"
                    }`}
                  >
                    {p.tab}
                  </button>
                ))}
              </div>
            </ScrollReveal>

            {/* Program card */}
            <motion.div
              key={currentProgram.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="bg-muted rounded-3xl overflow-hidden"
            >
              <div className="grid md:grid-cols-[1fr_1fr] gap-0">
                {/* Content */}
                <div className="bg-background rounded-3xl m-4 p-8 md:p-10 flex flex-col justify-center">
                  <h3 className="text-2xl md:text-3xl font-medium mb-4">
                    {currentProgram.title}
                  </h3>
                  <p className="text-muted-foreground mb-8">
                    {currentProgram.desc}
                  </p>
                  <div className="grid grid-cols-2 gap-6">
                    {currentProgram.stats.map((s) => (
                      <div key={s.label}>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                          {s.label}
                        </p>
                        <p className="text-lg font-medium">{s.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8">
                    <Link to="/catalog">
                      <PillButton variant="outline" className="py-3 px-8">
                        Подробнее
                      </PillButton>
                    </Link>
                  </div>
                </div>
                {/* Illustration */}
                <div className="hidden md:flex items-center justify-center p-8">
                  <img
                    src={mortgageIllustration}
                    alt="Ипотека"
                    className="max-h-[360px] object-contain"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Calculator ── */}
        <section className="py-16 md:py-24 bg-muted">
          <div className="site-container">
            <ScrollReveal>
              <SectionHeading title="Рассчитайте ипотеку" />
            </ScrollReveal>

            {/* Program tabs — горизонтальный скролл на мобайле */}
            <ScrollReveal>
              <div className="flex gap-2 mt-8 mb-8 overflow-x-auto scrollbar-hide pb-1 -mx-5 px-5 md:mx-0 md:px-0 md:flex-wrap">
                {mortgagePrograms.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setActiveCalcProgram(p.id)}
                    className={`px-4 py-2.5 rounded-full text-sm transition-all whitespace-nowrap shrink-0 ${
                      activeCalcProgram === p.id
                        ? "bg-foreground text-background"
                        : "bg-background border border-border text-foreground hover:bg-muted"
                    }`}
                  >
                    {p.tab}
                  </button>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="border border-border bg-card p-5 sm:p-8 md:p-10 rounded-3xl">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16">

                  {/* Left: sliders */}
                  <div className="space-y-6">
                    {/* Price */}
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Стоимость квартиры, ₽</p>
                      <div className="flex items-center justify-between border border-border border-b-0 rounded-pill px-5 py-3.5">
                        <span className="font-medium text-base">{fmt(calcPrice)}</span>
                      </div>
                      <div className="px-5">
                        <Slider min={2_000_000} max={50_000_000} step={100_000} value={[calcPrice]} onValueChange={([v]) => setCalcPrice(v)} />
                      </div>
                    </div>

                    {/* Down payment */}
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Первый взнос, ₽</p>
                      <div className="flex items-center justify-between border border-border border-b-0 rounded-pill px-5 py-3.5">
                        <span className="font-medium text-base">{fmt(downAmount)}</span>
                        <span className="text-muted-foreground text-sm">{calcDown} %</span>
                      </div>
                      <div className="px-5">
                        <Slider min={10} max={90} step={1} value={[calcDown]} onValueChange={([v]) => setCalcDown(v)} />
                      </div>
                      <div className="flex gap-2 mt-3">
                        {[20, 30, 40, 50].map((p) => (
                          <button
                            key={p}
                            onClick={() => setCalcDown(p)}
                            className={`rounded-pill border px-4 py-1.5 text-sm transition-colors ${
                              calcDown === p
                                ? "bg-foreground text-background border-foreground"
                                : "border-border text-foreground hover:bg-muted"
                            }`}
                          >
                            {p}%
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Term */}
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Срок, лет</p>
                      <div className="flex items-center justify-between border border-border border-b-0 rounded-pill px-5 py-3.5">
                        <span className="font-medium text-base">{calcTerm}</span>
                      </div>
                      <div className="px-5">
                        <Slider min={1} max={30} step={1} value={[calcTerm]} onValueChange={([v]) => setCalcTerm(v)} />
                      </div>
                    </div>

                    {/* Loan amount */}
                    <div className="border-t border-border pt-5">
                      <p className="text-sm text-muted-foreground mb-1">Сумма кредита</p>
                      <p className="font-display text-[28px] md:text-[32px] font-medium leading-none">
                        {fmt(calcPrice - downAmount)} ₽
                      </p>
                    </div>

                    {/* Лучшее предложение — только мобайл */}
                    {filteredBanks.length > 0 && (
                      <div className="lg:hidden rounded-2xl bg-foreground text-background p-5">
                        <p className="text-xs text-white/60 mb-1.5">Лучший платёж в месяц</p>
                        <p className="font-display text-[32px] font-medium text-white leading-none">
                          {fmt(Math.min(...filteredBanks.map((b) => calcMonthly(calcPrice, calcDown, b.rate, calcTerm))))} ₽
                        </p>
                        <p className="text-xs text-white/50 mt-2">{filteredBanks.length} предложений банков ↓</p>
                      </div>
                    )}
                  </div>

                  {/* Right: bank table (desktop) / cards (mobile) */}
                  <div>
                    {/* Заголовок таблицы — только desktop */}
                    <div className="hidden lg:grid grid-cols-[1.5fr_1fr_1fr_0.8fr] gap-4 items-center pb-4 border-b border-border text-muted-foreground text-sm">
                      <button onClick={() => handleSort("rate")} className="flex items-center hover:text-foreground transition-colors text-left">
                        Банк, программа и ставка <SortIcon col="rate" />
                      </button>
                      <button onClick={() => handleSort("payment")} className="flex items-center hover:text-foreground transition-colors text-left">
                        Платёж в месяц <SortIcon col="payment" />
                      </button>
                      <button onClick={() => handleSort("overpay")} className="flex items-center hover:text-foreground transition-colors text-left">
                        Переплата <SortIcon col="overpay" />
                      </button>
                      <button onClick={() => handleSort("term")} className="flex items-center hover:text-foreground transition-colors text-left">
                        Срок кредита <SortIcon col="term" />
                      </button>
                    </div>

                    {/* Сортировка — только мобайл */}
                    <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide lg:hidden">
                      {(
                        [
                          ["rate", "Ставка"],
                          ["payment", "Платёж"],
                          ["overpay", "Переплата"],
                        ] as Array<["rate" | "payment" | "overpay", string]>
                      ).map(([key, label]) => (
                        <button
                          key={key}
                          onClick={() => handleSort(key)}
                          className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs border shrink-0 transition-colors ${
                            sortKey === key
                              ? "bg-foreground text-background border-foreground"
                              : "border-border text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {label}
                          <SortIcon col={key} />
                        </button>
                      ))}
                    </div>

                    {/* Строки */}
                    <div className="space-y-3 lg:space-y-0">
                      {filteredBanks.map((b, i) => {
                        const payment = calcMonthly(calcPrice, calcDown, b.rate, calcTerm);
                        const totalPaid = payment * calcTerm * 12;
                        const overpay = totalPaid - (calcPrice - downAmount);
                        return (
                          <div key={i}>
                            {/* Карточка — мобайл */}
                            <div className="lg:hidden bg-muted rounded-2xl p-4">
                              <div className="flex items-center gap-3 mb-3">
                                <div
                                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-base font-bold"
                                  style={{ backgroundColor: b.color + "20", color: b.color }}
                                >
                                  {b.logo}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium leading-tight truncate">{b.name}</p>
                                  <p className="text-xs text-muted-foreground">{b.program}</p>
                                </div>
                                <span className="shrink-0 px-2.5 py-1 rounded-full bg-background text-xs font-medium whitespace-nowrap">
                                  от {b.rate}%
                                </span>
                              </div>
                              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border/40">
                                <div>
                                  <p className="text-[11px] text-muted-foreground mb-0.5">Платёж/мес.</p>
                                  <p className="text-sm font-medium">{fmt(payment)} ₽</p>
                                </div>
                                <div>
                                  <p className="text-[11px] text-muted-foreground mb-0.5">Переплата</p>
                                  <p className="text-sm font-medium">{fmt(Math.max(0, overpay))} ₽</p>
                                </div>
                                <div>
                                  <p className="text-[11px] text-muted-foreground mb-0.5">Срок</p>
                                  <p className="text-sm font-medium">до {calcTerm} л.</p>
                                </div>
                              </div>
                            </div>

                            {/* Строка таблицы — desktop */}
                            <div
                              className={`hidden lg:grid grid-cols-[1.5fr_1fr_1fr_0.8fr] gap-4 items-center py-5 border-b border-border ${
                                i === filteredBanks.length - 1 ? "border-b-0" : ""
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-lg font-bold"
                                  style={{ backgroundColor: b.color + "20", color: b.color }}
                                >
                                  {b.logo}
                                </div>
                                <div>
                                  <p className="text-sm font-medium">{b.name}</p>
                                  <p className="text-xs text-muted-foreground">{b.program}</p>
                                  <span className="inline-block mt-1 px-2 py-0.5 rounded bg-muted text-xs">
                                    от {b.rate} %
                                  </span>
                                </div>
                              </div>
                              <span className="font-display text-base font-medium">{fmt(payment)} ₽</span>
                              <span className="text-base">{fmt(Math.max(0, overpay))} ₽</span>
                              <span className="text-base">до {calcTerm} лет</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {filteredBanks.length === 0 && (
                      <p className="py-8 text-center text-muted-foreground">
                        Нет подходящих предложений
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── Steps ── */}
        <section className="pb-16 md:pb-24 bg-muted">
          <div className="site-container">
            <ScrollReveal>
              <SectionHeading title="Пять шагов к ипотеке" as="span" hideBar small />
            </ScrollReveal>

            <div className="mt-10 grid md:grid-cols-5 gap-4">
              {steps.map((step, idx) => (
                <ScrollReveal key={step.num} delay={idx * 0.08}>
                  <div className="bg-background rounded-3xl p-6 h-full flex flex-col">
                    <div className="mb-6">
                      <step.icon className="w-5 h-5 text-brand-accent" />
                    </div>
                    <span className="text-xs text-muted-foreground mb-2">
                      Этап {step.num}
                    </span>
                    <h4 className="text-base font-medium mb-2">{step.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

          </div>
        </section>

        {/* ── Other buy methods + CTA ── */}
        <section className="py-16 md:py-24">
          <div className="site-container">
            <ScrollReveal>
              <SectionHeading title="Другие способы покупки" />
            </ScrollReveal>

            <div className="mt-10 grid md:grid-cols-3 gap-6">
              {buyMethods.map((method, idx) => (
                <ScrollReveal key={method.title} delay={idx * 0.08}>
                  <div className="bg-muted rounded-3xl p-8 h-full flex flex-col">
                    <h4 className="text-xl font-medium mb-3">{method.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                      {method.desc}
                    </p>
                    <PillButton variant="outline" className="py-2.5 px-6 self-start text-sm w-fit shrink-0">
                      {method.action}
                    </PillButton>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal>
              <div className="mt-10 bg-foreground text-background rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
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

      </main>
      <Footer />
    </div>
  );
};

export default HowToBuy;
