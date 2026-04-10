import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import project1 from "@/assets/project1.webp";
import project2 from "@/assets/project2.jpg";
import project3 from "@/assets/project3.jpg";
import floorplanImg from "@/assets/floorplan-1room.svg";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";
import TextReveal from "./TextReveal";
import ProjectsFilter from "./ProjectsFilter";
import ConsultationSheet from "./ConsultationSheet";
import type { FilterValues } from "./ProjectsFilter";

function useApartmentsPerPage() {
  const [count, setCount] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(min-width: 1800px)").matches ? 8 : 6
  );
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1800px)");
    const handler = () => setCount(mql.matches ? 8 : 6);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);
  return count;
}

const ROOM_MAP: Record<string, string> = {
  "Студия": "Студия",
  "1к": "1-комн.",
  "2к": "2-комн.",
  "3к": "3-комн.",
  "4к": "4-комн.",
};

const fmtFull = (n: number) => n.toLocaleString("ru-RU");
function calcMonthly(price: number) {
  const principal = price * 0.8;
  const mr = 0.06 / 12;
  const n = 240;
  return Math.round(principal * mr / (1 - Math.pow(1 + mr, -n)));
}

const mockApartments = [
  { id: 1, rooms: "2-комн.", area: 36.6, floor: 7, totalFloors: 9, building: "корп. 1", price: 7_600_000, discount: true, tags: ["старт продаж"] },
  { id: 2, rooms: "2-комн.", area: 36.6, floor: 8, totalFloors: 9, building: "корп. 2", price: 7_750_000, discount: false, tags: ["вид на парк"] },
  { id: 3, rooms: "2-комн.", area: 42.3, floor: 15, totalFloors: 18, building: "корп. 1", price: 8_900_000, discount: true, tags: ["вид на горы"] },
  { id: 4, rooms: "1-комн.", area: 28.5, floor: 6, totalFloors: 18, building: "корп. 3", price: 5_800_000, discount: false, tags: ["старт продаж"] },
  { id: 5, rooms: "3-комн.", area: 78.2, floor: 10, totalFloors: 18, building: "корп. 1", price: 15_200_000, discount: false, tags: ["панорамные окна"] },
  { id: 6, rooms: "2-комн.", area: 55.0, floor: 12, totalFloors: 18, building: "корп. 2", price: 11_300_000, discount: true, tags: ["вид на горы"] },
  { id: 7, rooms: "1-комн.", area: 38.0, floor: 3, totalFloors: 9, building: "корп. 3", price: 7_200_000, discount: false, tags: [] },
  { id: 8, rooms: "Студия", area: 24.1, floor: 5, totalFloors: 9, building: "корп. 1", price: 4_900_000, discount: false, tags: ["старт продаж"] },
  { id: 9, rooms: "2-комн.", area: 61.0, floor: 18, totalFloors: 18, building: "корп. 2", price: 12_500_000, discount: true, tags: ["панорамные окна"] },
  { id: 10, rooms: "3-комн.", area: 85.4, floor: 14, totalFloors: 18, building: "корп. 1", price: 16_800_000, discount: false, tags: ["вид на парк"] },
  { id: 11, rooms: "1-комн.", area: 32.7, floor: 9, totalFloors: 18, building: "корп. 3", price: 6_500_000, discount: false, tags: [] },
  { id: 12, rooms: "2-комн.", area: 48.9, floor: 4, totalFloors: 9, building: "корп. 2", price: 9_800_000, discount: true, tags: ["вид на горы"] },
];

const mapProjects = [
  {
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&q=80&fm=webp",
    name: "Тектоника",
    price: "от 11 300 000 ₽",
    monthly: "от 32 769 ₽/мес",
    badge: "Ключи выданы",
  },
  {
    image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=400&q=80&fm=webp",
    name: "Тектоника Парк",
    price: "от 8 500 000 ₽",
    monthly: "от 24 650 ₽/мес",
  },
  {
    image: "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=400&q=80&fm=webp",
    name: "Тектоника Сити",
    price: "от 15 200 000 ₽",
    monthly: "от 44 080 ₽/мес",
  },
  {
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80&fm=webp",
    name: "Тектоника Лайт",
    price: "от 6 900 000 ₽",
    monthly: "от 20 010 ₽/мес",
  },
];

const ProjectsSection = () => {
  const [view, setView] = useState<"params" | "map">("params");
  const [showApartments, setShowApartments] = useState(false);
  const apartmentsPerPage = useApartmentsPerPage();
  const [visibleCount, setVisibleCount] = useState(apartmentsPerPage);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedApt, setSelectedApt] = useState<typeof mockApartments[0] | null>(null);
  const [catalogParams, setCatalogParams] = useState("");
  const [activeFilters, setActiveFilters] = useState<FilterValues>({ project: "Все проекты", rooms: [], deadline: "Любой" });

  const toggleFavorite = (id: number) =>
    setFavorites((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const openSheet = (apt: typeof mockApartments[0]) => {
    setSelectedApt(apt);
    setSheetOpen(true);
  };

  return (
    <section id="projects" className="py-16 md:py-24">
      <div className="site-container">
        <SectionHeading
          title="Наши проекты"
          rightElement={<ProjectsFilter.ViewToggle view={view} onViewChange={setView} />}
        />

        <ProjectsFilter
          hideViewToggle
          onFilterChange={(show, params, filters) => {
            setShowApartments(show);
            if (show) {
              setVisibleCount(apartmentsPerPage);
              setCatalogParams(params);
              setActiveFilters(filters);
            }
          }}
        />

        <AnimatePresence>
        {showApartments && (
          <motion.div
            key="apartments"
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {(() => {
              const filtered = activeFilters.rooms.length
                ? mockApartments.filter(apt =>
                    activeFilters.rooms.some(r => ROOM_MAP[r] === apt.rooms)
                  )
                : mockApartments;
              const visible = filtered.slice(0, visibleCount);
              const hasMore = visibleCount < filtered.length;
              return (<>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-6">
              {visible.map((apt, i) => {
                const monthly = calcMonthly(apt.price);
                const downPayment = Math.round(apt.price * 0.2);
                return (
                  <motion.div
                    key={apt.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                  >
                    <Link
                      to={`/flats/${apt.id}`}
                      className="group bg-card border border-border rounded-3xl overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow cursor-pointer"
                    >
                      <div className="px-6 pt-5 pb-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-display text-base font-medium">ЖК Тектоника</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              ул. Примерная, 1 <span className="mx-1">·</span> {apt.building}
                            </p>
                          </div>
                          <button
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(apt.id); }}
                            className="rounded-full border border-border p-3 text-muted-foreground transition-colors hover:text-primary"
                          >
                            <Heart className={`h-4 w-4 ${favorites.includes(apt.id) ? "fill-primary text-primary" : ""}`} />
                          </button>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          {apt.rooms === "Студия" ? "студия" : apt.rooms.replace("-комн.", "-комнатная")}
                          <span className="mx-0.5"> · </span>{apt.area}&nbsp;м²
                          <span className="mx-0.5"> · </span>{apt.floor}&nbsp;этаж из&nbsp;{apt.totalFloors}
                        </p>
                      </div>

                      <div className="relative bg-background flex items-center justify-center h-[220px] px-8 py-4">
                        <img
                          src={floorplanImg}
                          alt={`Планировка ${apt.rooms}`}
                          className="max-h-[65%] object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                        {apt.discount && (
                          <span className="absolute top-4 left-6 rounded-pill bg-primary text-primary-foreground px-3 py-1 text-[11px] font-medium uppercase tracking-wide">
                            Скидка
                          </span>
                        )}
                      </div>

                      <div className="px-6 pt-4 pb-2">
                        <p className="font-display text-2xl font-medium">{fmtFull(apt.price)} ₽</p>
                        <div className="flex items-start gap-6 mt-2">
                          <div>
                            <p className="text-xs text-muted-foreground">Ипотека</p>
                            <p className="text-sm font-medium">{fmtFull(monthly)} ₽/мес</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Первоначальный взнос</p>
                            <p className="text-sm font-medium">от {fmtFull(downPayment)} ₽</p>
                          </div>
                        </div>
                      </div>

                      {apt.tags && apt.tags.length > 0 ? (
                        <div className="px-6 pb-5 pt-3 flex flex-wrap gap-2">
                          {apt.tags.map((tag) => (
                            <span key={tag} className="rounded-pill bg-muted px-3 py-1.5 text-xs font-medium">
                              {tag}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <div className="pb-5" />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {hasMore ? (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setVisibleCount((c) => c + apartmentsPerPage)}
                  className="rounded-pill border border-border px-10 h-12 text-sm font-medium hover:bg-muted transition-colors"
                >
                  Ещё квартиры
                </button>
              </div>
            ) : (
              <motion.div
                className="flex justify-center mt-8"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  to={`/catalog${catalogParams ? `?${catalogParams}` : ""}`}
                  className="rounded-pill bg-primary text-primary-foreground px-12 h-14 inline-flex items-center text-sm font-medium uppercase tracking-wide hover:bg-primary/90 transition-colors"
                >
                  Все квартиры
                </Link>
              </motion.div>
            )}
            </>);
            })()}
          </motion.div>
        )}
        </AnimatePresence>

        {!showApartments && (view === "params" ? (
          <div className="mt-8 flex flex-col gap-6">
            {/* Featured card — horizontal split */}
            <motion.div
              className="flex flex-col md:flex-row gap-0 rounded-3xl overflow-hidden border border-border"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to="/project"
                className="relative flex-[2] min-h-[280px] md:min-h-[500px] bg-cover bg-center group"
                style={{ backgroundImage: `url(${project1})` }}
              >
                <div className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/40 transition-colors" />
                <div className="relative z-10 flex flex-col justify-end h-full p-5 md:p-12">
                  <span className="self-start rounded-pill px-4 py-2 text-xs uppercase tracking-wider bg-primary text-primary-foreground mb-4">
                    Ключи выданы
                  </span>
                  <h3 className="font-display text-2xl md:text-5xl font-medium text-background uppercase leading-none">
                    Тектоника
                  </h3>
                  <p className="text-background/80 text-sm mt-3">
                    Бизнес-класс в районе набережной
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-background/70 text-sm">
                    <span className="inline-block w-2 h-2 rounded-full bg-primary" />
                    5 мин до моря
                  </div>
                  <p className="text-background font-display text-lg font-medium mt-3">
                    от 11,3 млн ₽
                  </p>
                </div>
              </Link>

              <div className="flex-1 bg-foreground text-background flex flex-col justify-between p-5 md:p-10 min-h-[280px] md:min-h-[500px]">
                <div>
                  <TextReveal
                    as="h3"
                    className="font-display text-xl md:text-[38px] font-normal leading-[1.1]"
                  >
                    Уникальные форматы квартир от&nbsp;11,3&nbsp;млн&nbsp;руб.
                  </TextReveal>

                  <div className="flex flex-wrap gap-2 mt-8">
                    {["Скидки до 15%", "Ключи 2026", "Бизнес-класс", "Вид на море", "Выгодная ипотека"].map(
                      (tag) => (
                        <span
                          key={tag}
                          className="rounded-pill border border-background/30 px-4 py-2 text-sm text-background/80"
                        >
                          {tag}
                        </span>
                      )
                    )}
                  </div>
                </div>

                <Link to="/project">
                  <button className="w-full rounded-pill bg-primary text-primary-foreground min-h-[50px] px-[30px] py-[15px] text-sm font-medium uppercase tracking-[0.35px] hover:bg-primary/90 transition-colors mt-8">
                    Перейти к проекту
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* Two smaller cards */}
            <div className="flex flex-col md:flex-row gap-6">
              {[
                {
                  image: project2,
                  images: [
                    project2,
                    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&fm=webp",
                    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80&fm=webp",
                    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80&fm=webp",
                  ],
                  badge: "Скоро",
                  badgeVariant: "white" as const,
                  tags: ["Комфорт", "II кв. 2027"],
                  name: "Тектоника Парк",
                  address: "Комфорт-класс рядом с парком",
                  price: "от 8,5 млн ₽",
                  priceLabel: "Стоимость квартир",
                },
                {
                  image: project3,
                  images: [
                    project3,
                    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80&fm=webp",
                    "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&q=80&fm=webp",
                    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80&fm=webp",
                  ],
                  badge: "Строится",
                  badgeVariant: "white" as const,
                  tags: ["Премиум", "III кв. 2026"],
                  name: "Тектоника Сити",
                  address: "Премиум-класс в центре города",
                  price: "от 15,2 млн ₽",
                  priceLabel: "Стоимость квартир",
                },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  className="flex-1"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.15 * i,
                  }}
                >
                  <ProjectCard {...card} />
                </motion.div>
              ))}

              <motion.div
                className="flex-1 bg-foreground text-background border border-border flex flex-col justify-between p-6 md:p-10 min-h-[300px] md:min-h-[389px] rounded-3xl"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.3,
                }}
              >
                <div className="flex justify-between items-start">
                  <TextReveal
                    as="h3"
                    className="font-display text-2xl md:text-[42px] font-normal leading-[1.1] max-w-[280px]"
                  >
                    Более 1200+ предложений в&nbsp;Крыму
                  </TextReveal>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-background shrink-0 mt-1"
                  >
                    <path
                      d="M7 17L17 7M17 7H7M17 7V17"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-background/60 text-base leading-relaxed mb-8">
                    Огромный выбор квартир в продаже, вы сможете найти среди них то
                    что надо
                  </p>
                  <button className="w-full rounded-pill border border-background/30 min-h-[50px] px-[30px] py-[15px] text-sm font-medium uppercase tracking-[0.35px] text-background hover:bg-background/10 transition-colors">
                    получить консультацию
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        ) : (
          /* Map view with sidebar */
          <motion.div
            className="mt-8 flex gap-0 rounded-3xl overflow-hidden border border-border h-[400px] md:h-[680px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Left sidebar — project list */}
            <div className="w-[340px] flex-shrink-0 hidden md:flex flex-col bg-background border-r border-border">
              <div className="overflow-y-auto flex-1">
                {mapProjects.map((project, i) => (
                  <Link
                    key={i}
                    to="/project"
                    className="flex gap-4 p-4 border-b border-border hover:bg-muted/50 transition-colors group"
                  >
                    <div className="relative w-[80px] h-[80px] rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {project.badge && (
                        <span className="absolute top-1 left-1 bg-primary text-primary-foreground text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-md font-medium">
                          %
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col justify-center min-w-0">
                      <h4 className="font-display text-sm font-medium uppercase leading-tight truncate">
                        {project.name}
                      </h4>
                      <p className="text-primary text-sm font-medium mt-1">
                        {project.price}
                      </p>
                      <p className="text-muted-foreground text-xs mt-0.5">
                        {project.monthly}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="p-4 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  Найдено <span className="text-foreground font-medium">{mapProjects.length} проекта</span>
                </p>
              </div>
            </div>

            {/* Right — map */}
            <div className="flex-1">
              <iframe
                src="https://yandex.ru/map-widget/v1/?ll=34.1008,44.9521&z=12&pt=34.1008,44.9521,pm2rdm"
                className="w-full h-full border-0"
                allowFullScreen
                title="Проекты на карте"
              />
            </div>
          </motion.div>
        ))}
      </div>

      <ConsultationSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        apartment={selectedApt}
      />
    </section>
  );
};

export default ProjectsSection;
