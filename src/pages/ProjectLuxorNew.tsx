import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectSubNav from "@/components/project/ProjectSubNav";
import ScrollReveal from "@/components/ScrollReveal";
import TextReveal from "@/components/TextReveal";
import CountUp from "@/components/CountUp";
import { motion, useScroll, useTransform } from "framer-motion";

const photoPath = (folder: string, filename: string) => `/photos/${encodeURIComponent(folder)}/${encodeURIComponent(filename)}`;

const anchors = [
  { id: "about", label: "О проекте" },
  { id: "infrastructure", label: "Инфраструктура" },
  { id: "location", label: "Расположение" },
  { id: "apartments", label: "Квартиры" },
  { id: "finishing", label: "Отделка" },
  { id: "landscaping", label: "Благоустройство" },
  { id: "engineering", label: "Технологии" },
  { id: "construction", label: "Ход строительства" },
];

const aboutCards = [
  {
    title: "Архитектурная пластика",
    text: "Выверенные пропорции фасадов и выразительная вертикаль башен формируют узнаваемый образ квартала.",
    image: "/luxor2.jpg",
  },
  {
    title: "Лобби как точка притяжения",
    text: "Объемные входные группы, мягкий сценарий света и приватные зоны ожидания для резидентов и гостей.",
    image: photoPath("Вестибюль", "Вестибюль 6.jpg"),
  },
  {
    title: "Сценарии двора без машин",
    text: "Тихие маршруты, детские и спортивные зоны, круглогодичное озеленение и комфортные места для отдыха.",
    image: photoPath("Благоустройство", "2026-04-30_14-56-31.png"),
  },
];

const infraPoints = [
  { n: "01", title: "Sky Lounge", desc: "Панорамная площадка для встреч, отдыха и вечерних прогулок." },
  { n: "02", title: "Ритейл-галерея", desc: "Кофейни, аптека, сервисы и локальные магазины в шаговой доступности." },
  { n: "03", title: "Лобби и ресепшен", desc: "Контроль доступа, консьерж-сервис и удобные маршруты резидентов." },
  { n: "04", title: "Приватный двор", desc: "Зоны отдыха, детские площадки и амфитеатр для локальных событий." },
  { n: "05", title: "Fitness & Swim", desc: "Тренажерные зоны, бассейн и wellness-форматы для повседневной активности." },
  { n: "06", title: "Подземный паркинг", desc: "Паркоместа, зарядки для электромобилей и прямой доступ к лифтам." },
];

const locationStats = ["5 мин до ключевой магистрали", "15 мин до центра города", "10 мин до парков и прогулочных зон", "2 станции до делового кластера"];

const flatFormats = [
  { name: "Пентхаусы", info: "Панорамные виды и увеличенная высота потолка", price: "от 42 млн ₽", image: "/luxor2.jpg" },
  { name: "Угловые квартиры", info: "Раскрытая геометрия комнат и усиленная инсоляция", price: "от 19 млн ₽", image: "/luxor2.jpg" },
  { name: "Семейные планировки", info: "3-4 комнаты с функциональными сценариями хранения", price: "от 23 млн ₽", image: "/luxor2.jpg" },
  { name: "Компактные форматы", info: "Студии и 1-комнатные квартиры для динамичного ритма", price: "от 11 млн ₽", image: "/luxor2.jpg" },
];

const finishing = [
  "White Box с полной инженерной подготовкой",
  "Централизованная система кондиционирования",
  "Увеличенные оконные проемы и энергоэффективные стеклопакеты",
  "Системы защиты от протечек и пожарная автоматика",
  "Усиленная шумоизоляция входных дверей",
  "Готовая разводка силовой и розеточной группы",
];

const buildProgress = [
  { month: "Март 2026", text: "Монолитные работы, устройство подземного уровня и подготовка инженерных трасс." },
  { month: "Апрель 2026", text: "Монтаж фасадных подсистем, старт остекления и устройство кровельного пирога." },
  { month: "Май 2026", text: "Интерьерные работы в МОП, монтаж лифтового оборудования и благоустройство 1-й очереди." },
];

const ProjectLuxorNew = () => {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, -120]);
  const heroScale = useTransform(scrollYProgress, [0, 0.25], [1, 1.08]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header introDone />
      <ProjectSubNav />
      <main className="pt-20">
        <section className="relative h-[88vh] min-h-[620px] overflow-hidden">
          <motion.img
            src="/luxor2.jpg"
            alt="Люксор"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ y: heroY, scale: heroScale }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/65" />
          <div className="site-container relative z-10 flex h-full items-end pb-12 md:pb-16">
            <div className="max-w-4xl">
              <TextReveal as="p" className="mb-4 text-xs uppercase tracking-[0.28em] text-white/80">арт-квартал люксор</TextReveal>
              <TextReveal as="h1" className="text-4xl leading-[1.06] text-white md:text-7xl">
                ДОМ, ГДЕ АРХИТЕКТУРА И ПОВСЕДНЕВНОСТЬ ЗВУЧАТ В ОДНОМ РИТМЕ
              </TextReveal>
              <TextReveal as="p" delay={0.15} className="mt-5 max-w-2xl text-sm text-white/80 md:text-base">
                Структура и драматургия страницы повторяют референсный премиальный лендинг: якорная навигация, смена сцен, крупные визуальные блоки и мягкие скролл-анимации.
              </TextReveal>
            </div>
          </div>
          <motion.a
            href="#about"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/30 px-4 py-2 text-xs uppercase tracking-[0.18em] text-white"
          >
            Скролль вниз
          </motion.a>
        </section>

        <section className="sticky top-20 z-30 border-y border-border bg-background/95 backdrop-blur">
          <div className="site-container">
            <div className="scrollbar-hide flex gap-2 overflow-x-auto py-3">
              {anchors.map((a) => (
                <a
                  key={a.id}
                  href={`#${a.id}`}
                  className="whitespace-nowrap rounded-full border border-border px-4 py-1.5 text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  {a.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="site-container py-14 md:py-20">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl">О проекте</h2>
          </ScrollReveal>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {aboutCards.map((card, idx) => (
              <ScrollReveal key={card.title} delay={idx * 0.08} className="group overflow-hidden rounded-3xl border border-border bg-card">
                <div className="h-52 overflow-hidden">
                  <img src={card.image} alt={card.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <h3 className="text-xl">{card.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{card.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <section id="infrastructure" className="bg-muted/40 py-14 md:py-20">
          <div className="site-container">
            <ScrollReveal><h2 className="text-3xl md:text-5xl">Инфраструктура проекта</h2></ScrollReveal>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {infraPoints.map((item, idx) => (
                <ScrollReveal key={item.title} delay={idx * 0.06} className="rounded-2xl border border-border bg-background p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-primary">{item.n}</p>
                  <h3 className="mt-2 text-xl">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section id="location" className="site-container py-14 md:py-20">
          <div className="grid gap-8 md:grid-cols-12">
            <ScrollReveal className="md:col-span-7">
              <h2 className="text-3xl md:text-5xl">Расположение и мобильность</h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                ЛЮКСОР расположен в сформированном районе с быстрыми выездами и насыщенной городской инфраструктурой. Ключевые маршруты жизни — работа, спорт, досуг — собираются в одном логичном контуре.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {locationStats.map((line) => (
                  <div key={line} className="rounded-xl border border-border bg-card px-4 py-3 text-sm">{line}</div>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal className="md:col-span-5 overflow-hidden rounded-3xl">
              <img src={photoPath("Благоустройство", "2026-04-30_14-56-56.png")} alt="Район Люксор" className="h-full min-h-[360px] w-full object-cover" />
            </ScrollReveal>
          </div>
        </section>

        <section id="apartments" className="bg-foreground py-14 text-background md:py-20">
          <div className="site-container">
            <ScrollReveal><h2 className="text-3xl md:text-5xl">Выбор квартиры</h2></ScrollReveal>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {flatFormats.map((flat, idx) => (
                <ScrollReveal key={flat.name} delay={idx * 0.06} className="group overflow-hidden rounded-3xl border border-white/15 bg-white/5">
                  <div className="h-44 overflow-hidden">
                    <img src={flat.image} alt={flat.name} className="h-full w-full object-cover opacity-85 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl">{flat.name}</h3>
                    <p className="mt-2 text-sm text-white/70">{flat.info}</p>
                    <p className="mt-4 text-lg text-primary">{flat.price}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/catalog" className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground">Посмотреть все планировки</a>
              <a href="/proposal" className="btn-interactive btn-outline-on-dark rounded-full border border-white/25 px-5 py-2.5 text-sm text-white">Заказать консультацию</a>
            </div>
          </div>
        </section>

        <section id="finishing" className="site-container py-14 md:py-20">
          <ScrollReveal><h2 className="text-3xl md:text-5xl">Отделка и инженерия квартир</h2></ScrollReveal>
          <div className="mt-8 grid gap-6 md:grid-cols-12">
            <ScrollReveal className="md:col-span-5 overflow-hidden rounded-3xl">
              <img src={photoPath("Лифтовый холл", "Лифт_1этаж 3.jpg")} alt="Инженерия" className="h-full min-h-[360px] w-full object-cover" />
            </ScrollReveal>
            <div className="space-y-3 md:col-span-7">
              {finishing.map((point, idx) => (
                <ScrollReveal key={point} delay={idx * 0.04} className="rounded-2xl border border-border bg-card px-4 py-3 text-sm md:text-base">
                  {point}
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section id="landscaping" className="bg-muted/40 py-14 md:py-20">
          <div className="site-container">
            <ScrollReveal><h2 className="text-3xl md:text-5xl">Трехуровневое благоустройство</h2></ScrollReveal>
            <div className="mt-8 grid auto-rows-[190px] grid-cols-2 gap-3 md:grid-cols-4 md:auto-rows-[220px]">
              {[photoPath("Благоустройство", "2026-04-30_14-55-50.png"), photoPath("Благоустройство", "2026-04-30_14-56-31.png"), photoPath("Благоустройство", "2026-04-30_14-56-56.png"), photoPath("Вестибюль", "Вестибюль 3.jpg"), photoPath("Холл", "photo_2026-03-27_16-55-39 (2).jpg")].map((src, i) => (
                <ScrollReveal key={src} delay={i * 0.05} className={`overflow-hidden rounded-2xl ${i === 0 ? "col-span-2 row-span-2" : i === 3 ? "col-span-2" : "col-span-1"}`}>
                  <img src={src} alt={`Благоустройство ${i + 1}`} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section id="engineering" className="site-container py-14 md:py-20">
          <div className="grid gap-4 md:grid-cols-4">
            <ScrollReveal className="rounded-2xl border border-border bg-card p-5 text-center"><p className="text-xs uppercase text-muted-foreground">Лифты</p><CountUp value="6 в башне" className="mt-2 text-3xl" /></ScrollReveal>
            <ScrollReveal delay={0.05} className="rounded-2xl border border-border bg-card p-5 text-center"><p className="text-xs uppercase text-muted-foreground">Face ID</p><CountUp value="24/7" className="mt-2 text-3xl" /></ScrollReveal>
            <ScrollReveal delay={0.1} className="rounded-2xl border border-border bg-card p-5 text-center"><p className="text-xs uppercase text-muted-foreground">Паркинг</p><CountUp value="500+" className="mt-2 text-3xl" /></ScrollReveal>
            <ScrollReveal delay={0.15} className="rounded-2xl border border-border bg-card p-5 text-center"><p className="text-xs uppercase text-muted-foreground">Видеоохват</p><CountUp value="100%" className="mt-2 text-3xl" /></ScrollReveal>
          </div>
        </section>

        <section id="construction" className="bg-foreground py-14 text-background md:py-20">
          <div className="site-container">
            <ScrollReveal><h2 className="text-3xl md:text-5xl">Ход строительства</h2></ScrollReveal>
            <div className="mt-8 space-y-4">
              {buildProgress.map((item, idx) => (
                <ScrollReveal key={item.month} delay={idx * 0.05} className="rounded-2xl border border-white/20 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-primary">{item.month}</p>
                  <p className="mt-2 text-sm text-white/80 md:text-base">{item.text}</p>
                </ScrollReveal>
              ))}
            </div>
            <div className="mt-10 rounded-3xl bg-primary p-6 text-primary-foreground md:p-10">
              <h3 className="text-2xl md:text-4xl">Получите персональную подборку по ЛЮКСОР</h3>
              <p className="mt-3 max-w-2xl text-sm md:text-base">Подберем планировку, расскажем про доступные форматы покупки и покажем динамику строительства.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="/proposal" className="rounded-full bg-background px-5 py-2.5 text-sm font-medium text-foreground">Оставить заявку</a>
                <a href="/catalog" className="rounded-full border border-primary-foreground/40 px-5 py-2.5 text-sm text-primary-foreground hover:bg-primary-foreground/10">Открыть каталог</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectLuxorNew;
