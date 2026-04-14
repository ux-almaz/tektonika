import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, FileText, Search, Code, PenTool, Rocket } from "lucide-react";

const stages = [
  {
    icon: Search,
    num: 1,
    title: "Технический SEO-аудит",
    price: "15 000 ₽",
    deadline: "3–5 рабочих дней",
    rows: [
      ["Аудит текущего состояния", "Анализ индексации, скорости загрузки, мобильной адаптации, ошибок"],
      ["Анализ конкурентов", "Разбор SEO-стратегий 3–5 конкурентов в нише недвижимости"],
      ["Отчёт с рекомендациями", "Документ с приоритизированным списком доработок"],
    ],
  },
  {
    icon: FileText,
    num: 2,
    title: "Сбор семантического ядра",
    price: "12 000 ₽",
    deadline: "3–4 рабочих дня",
    rows: [
      ["Сбор ключевых запросов", "200–400 запросов по тематике «недвижимость + Крым/Симферополь»"],
      ["Кластеризация", "Группировка запросов по страницам и интентам"],
      ["Карта релевантности", "Распределение ключей по страницам сайта"],
    ],
  },
  {
    icon: Code,
    num: 3,
    title: "Техническая оптимизация сайта",
    price: "20 000 ₽",
    deadline: "5–7 рабочих дней",
    rows: [
      ["Установка react-helmet-async", "Уникальные title и description для каждой страницы"],
      ["Open Graph и Twitter Cards", "Мета-теги для корректного отображения в соцсетях"],
      ["Структурированные данные", "JSON-LD разметка Schema.org (Organization, RealEstateListing, BreadcrumbList)"],
      ["Генерация sitemap.xml", "Автоматическая карта сайта для поисковых систем"],
      ["Настройка robots.txt", "Корректные директивы для роботов"],
      ["Canonical-теги", "Предотвращение дублирования контента"],
      ["Оптимизация изображений", "Alt-теги, lazy loading, WebP-форматы"],
      ["Оптимизация Core Web Vitals", "LCP, FID, CLS — улучшение метрик скорости"],
    ],
  },
  {
    icon: PenTool,
    num: 4,
    title: "SEO-копирайтинг",
    price: "25 000 ₽",
    deadline: "7–10 рабочих дней",
    rows: [
      ["Главная страница", "SEO-текст с ключевыми запросами, H1-H3 структура"],
      ["Страницы проектов (×3)", "Уникальные описания каждого ЖК"],
      ["Страница «О компании»", "Экспертный текст с E-E-A-T сигналами"],
      ["Страница «Как купить»", "Информационный контент с ключами"],
      ["Каталог квартир", "Шаблонные SEO-описания для карточек"],
      ["Контакты", "Локальный SEO-текст"],
      ["Медиа / Новости", "3 экспертные статьи для блога (3000–5000 зн. каждая)"],
    ],
  },
  {
    icon: Rocket,
    num: 5,
    title: "Внедрение и тестирование",
    price: "8 000 ₽",
    deadline: "2–3 рабочих дня",
    rows: [
      ["Интеграция текстов", "Размещение контента на страницах"],
      ["Проверка индексации", "Тестирование через Google Search Console"],
      ["Валидация разметки", "Проверка Schema.org, OG-тегов, мета-данных"],
      ["Финальный отчёт", "Документ «до/после» с рекомендациями по развитию"],
    ],
  },
];

const benefits = [
  "Полный технический SEO-аудит с отчётом",
  "Семантическое ядро на 200–400 запросов",
  "Техническая оптимизация всех 14+ страниц",
  "Уникальные SEO-тексты для всех разделов сайта",
  "3 экспертные статьи для блога",
  "Структурированные данные Schema.org",
  "Настроенные мета-теги, sitemap, robots.txt",
  "Финальный отчёт с рекомендациями по дальнейшему продвижению",
];

const guarantees = [
  "Все тексты проходят проверку на уникальность (≥95% по text.ru)",
  "Техническая оптимизация проверяется через Google Lighthouse, PageSpeed Insights",
  "Разметка валидируется через Schema Markup Validator",
  "Бесплатные правки в течение 14 дней после сдачи",
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Proposal = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header introDone />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-5 md:px-10 lg:px-16 xl:px-[100px]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            className="text-sm uppercase tracking-widest text-muted-foreground mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Коммерческое предложение
          </motion.p>
          <motion.h1
            className="font-display text-[32px] md:text-[52px] font-normal tracking-[-1.5px] leading-[1.1] mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            SEO-оптимизация сайта
            <br />
            жилого комплекса «Тектоника»
          </motion.h1>
          <motion.p
            className="text-muted-foreground text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            14 апреля 2026 г. · Предложение действительно до 14 мая 2026 г.
          </motion.p>
        </div>
      </section>

      {/* About */}
      <section className="pb-16 px-5 md:px-10 lg:px-16 xl:px-[100px]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="rounded-2xl border border-border bg-card p-8 md:p-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-xl md:text-2xl tracking-tight mb-4">О проекте</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Сайт tektonika.lovable.app — презентационный сайт жилого комплекса премиум-класса.
              Включает 14+ страниц: главная, каталог квартир, карточки квартир, страницы проектов, медиа, контакты и др.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {["React (SPA)", "Vite", "Tailwind CSS"].map((t) => (
                <span key={t} className="text-xs px-3 py-1.5 rounded-full border border-border bg-muted text-muted-foreground">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stages */}
      <section className="pb-20 px-5 md:px-10 lg:px-16 xl:px-[100px]">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="font-display text-[24px] md:text-[36px] tracking-[-1px] mb-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Перечень работ
          </motion.h2>

          <div className="space-y-8">
            {stages.map((stage, si) => {
              const Icon = stage.icon;
              return (
                <motion.div
                  key={stage.num}
                  className="rounded-2xl border border-border bg-card overflow-hidden"
                  custom={si}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                >
                  <div className="flex items-center justify-between p-6 md:p-8 border-b border-border">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Этап {stage.num}</p>
                        <h3 className="font-display text-lg md:text-xl tracking-tight">{stage.title}</h3>
                      </div>
                    </div>
                    <div className="text-right hidden sm:block">
                      <p className="font-display text-xl md:text-2xl tracking-tight">{stage.price}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 justify-end mt-1">
                        <Clock className="w-3 h-3" />
                        {stage.deadline}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 md:p-8 sm:hidden flex justify-between items-center border-b border-border">
                    <p className="font-display text-xl">{stage.price}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {stage.deadline}
                    </p>
                  </div>

                  <div className="divide-y divide-border">
                    {stage.rows.map(([title, desc], ri) => (
                      <div key={ri} className="px-6 md:px-8 py-4 flex gap-4">
                        <span className="text-muted-foreground text-sm shrink-0 w-5 text-right">{ri + 1}.</span>
                        <div>
                          <p className="text-sm font-medium">{title}</p>
                          <p className="text-sm text-muted-foreground mt-0.5">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Total */}
      <section className="pb-20 px-5 md:px-10 lg:px-16 xl:px-[100px]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="rounded-2xl border border-primary/20 bg-primary/5 p-8 md:p-10"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-xl md:text-2xl tracking-tight mb-6 text-center">Итоговая стоимость</h2>
            <div className="space-y-3 mb-6">
              {stages.map((s) => (
                <div key={s.num} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{s.num}. {s.title}</span>
                  <span>{s.price}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-primary/20 pt-4 flex justify-between items-center">
              <span className="font-medium text-lg">ИТОГО</span>
              <span className="font-display text-2xl md:text-3xl tracking-tight">80 000 ₽</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline & Payment */}
      <section className="pb-20 px-5 md:px-10 lg:px-16 xl:px-[100px]">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          <motion.div
            className="rounded-2xl border border-border bg-card p-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-display text-lg tracking-tight mb-3">Сроки выполнения</h3>
            <p className="text-3xl font-display tracking-tight mb-2">3–4 недели</p>
            <p className="text-sm text-muted-foreground">с момента согласования и предоплаты. Этапы выполняются последовательно с промежуточными согласованиями.</p>
          </motion.div>
          <motion.div
            className="rounded-2xl border border-border bg-card p-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-display text-lg tracking-tight mb-3">Условия оплаты</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">50%</span>
                <span className="text-sm text-muted-foreground">Предоплата перед началом работ</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">50%</span>
                <span className="text-sm text-muted-foreground">После сдачи и согласования всех этапов</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="pb-20 px-5 md:px-10 lg:px-16 xl:px-[100px]">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="font-display text-[24px] md:text-[36px] tracking-[-1px] mb-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Что получает клиент
          </motion.h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm">{b}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="pb-24 px-5 md:px-10 lg:px-16 xl:px-[100px]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="rounded-2xl border border-border bg-card p-8 md:p-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-xl md:text-2xl tracking-tight mb-6">Гарантии</h2>
            <div className="space-y-4">
              {guarantees.map((g, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">{g}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Proposal;
