import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import { Slider } from "@/components/ui/slider";
import { LayoutGrid, List, ChevronDown, X, Heart, Flame } from "lucide-react";
import FilterDropdown from "@/components/FilterDropdown";
import floorplanImg from "@/assets/floorplan-1room.svg";

const fmt = (n: number) => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(".0", "")} млн`;
  return n.toLocaleString("ru-RU");
};
const fmtFull = (n: number) => n.toLocaleString("ru-RU");

function calcMonthly(price: number, downPercent: number, rate: number, years: number) {
  const principal = price - price * (downPercent / 100);
  if (principal <= 0) return 0;
  const mr = rate / 100 / 12;
  const n = years * 12;
  if (mr === 0) return Math.round(principal / n);
  return Math.round(principal * mr / (1 - Math.pow(1 + mr, -n)));
}

const roomOptions = ["Студия", "1", "2", "3", "4"];
const deadlineOptions = ["Любой", "Сдан", "2026", "2027"];
const sortOptions = ["Сначала дешевле", "Сначала дороже", "По площади ↑", "По площади ↓"];
const projectOptions = ["Все проекты", "ЖК Тектоника", "ЖК Горизонт", "ЖК Парковый"];
const floorOptions = ["Любой", "1–5", "6–10", "11–15", "16+"];
const finishOptions = ["Любая", "Без отделки", "Предчистовая", "Чистовая", "Под ключ"];
const amenityOptions = ["2 санузла", "Мастер-спальня", "Мастер-спальня с гардеробной", "Гардеробная", "Кухня-гостиная", "Окна на разные стороны", "Ниша для гардеробной", "Большой санузел"];
const viewOptions = ["Море", "Горы", "Двор", "Парк", "Улица", "Город"];
const directionOptions = ["Север", "Северо-Восток", "Восток", "Юго-Восток", "Юг", "Юго-Запад", "Запад", "Северо-Запад"];

// Mock apartments data
const apartments = [
{ id: 1, rooms: "2-комн.", area: 36.6, floor: 7, totalFloors: 9, building: "корп. 1", section: "секция 3", price: 7_600_000, priceM2: 207_650, discount: true, tags: ["старт продаж"] },
{ id: 2, rooms: "2-комн.", area: 36.6, floor: 8, totalFloors: 9, building: "корп. 2", section: "секция 7", price: 7_750_000, priceM2: 211_749, discount: false, tags: ["вид на парк"] },
{ id: 3, rooms: "2-комн.", area: 42.3, floor: 15, totalFloors: 18, building: "корп. 1", section: "секция 2", price: 8_900_000, priceM2: 210_402, discount: true, tags: ["вид на горы"] },
{ id: 4, rooms: "1-комн.", area: 28.5, floor: 6, totalFloors: 18, building: "корп. 3", section: "секция 1", price: 5_800_000, priceM2: 203_509, discount: false, tags: ["старт продаж"] },
{ id: 5, rooms: "3-комн.", area: 78.2, floor: 10, totalFloors: 18, building: "корп. 1", section: "секция 4", price: 15_200_000, priceM2: 194_373, discount: false, tags: ["вид на парк", "панорамные окна"] },
{ id: 6, rooms: "2-комн.", area: 55.0, floor: 12, totalFloors: 18, building: "корп. 2", section: "секция 5", price: 11_300_000, priceM2: 205_455, discount: true, tags: ["вид на горы"] },
{ id: 7, rooms: "1-комн.", area: 38.0, floor: 3, totalFloors: 9, building: "корп. 3", section: "секция 2", price: 7_200_000, priceM2: 189_474, discount: false, tags: [] },
{ id: 8, rooms: "Студия", area: 24.1, floor: 5, totalFloors: 9, building: "корп. 1", section: "секция 1", price: 4_900_000, priceM2: 203_320, discount: false, tags: ["старт продаж"] },
{ id: 9, rooms: "2-комн.", area: 61.0, floor: 18, totalFloors: 18, building: "корп. 2", section: "секция 6", price: 12_500_000, priceM2: 204_918, discount: true, tags: ["панорамные окна"] },
{ id: 10, rooms: "3-комн.", area: 85.4, floor: 14, totalFloors: 18, building: "корп. 1", section: "секция 3", price: 16_800_000, priceM2: 196_721, discount: false, tags: ["вид на парк"] },
{ id: 11, rooms: "1-комн.", area: 32.7, floor: 9, totalFloors: 18, building: "корп. 3", section: "секция 4", price: 6_500_000, priceM2: 198_777, discount: false, tags: [] },
{ id: 12, rooms: "2-комн.", area: 48.9, floor: 4, totalFloors: 9, building: "корп. 2", section: "секция 3", price: 9_800_000, priceM2: 200_409, discount: true, tags: ["старт продаж", "вид на горы"] },
{ id: 12, rooms: "2-комн.", area: 48.9, floor: 4, totalFloors: 9, building: "корп. 2", section: "секция 3", price: 9_800_000, priceM2: 200_409, discount: true }];


const Catalog = () => {
  const [searchParams] = useSearchParams();

  const getInitialRooms = (): string[] => {
    const rooms = searchParams.get("rooms");
    if (!rooms) return [];
    const map: Record<string, string> = { studio: "Студия", "Студия": "Студия", "1": "1", "2": "2", "3": "3", "4": "4" };
    return rooms.split(",").map(r => map[r.trim()] || r.trim()).filter(Boolean);
  };

  const getInitialArea = (): number[] => {
    const a = searchParams.get("area");
    if (!a) return [24, 120];
    const [min, max] = a.split("-").map(Number);
    return [min || 24, max || 120];
  };

  const getInitialPrice = (): number[] => {
    const p = searchParams.get("price");
    if (!p) return [4_000_000, 20_000_000];
    const [min, max] = p.split("-").map(Number);
    return [min || 4_000_000, max || 20_000_000];
  };

  const getInitialDeadline = (): string => {
    return searchParams.get("deadline") || "Любой";
  };

  const [selectedRooms, setSelectedRooms] = useState<string[]>(getInitialRooms);
  const [area, setArea] = useState(getInitialArea);
  const [price, setPrice] = useState(getInitialPrice);
  const [selectedDeadline, setSelectedDeadline] = useState(getInitialDeadline);
  const [selectedProject, setSelectedProject] = useState("Все проекты");
  const [selectedFloor, setSelectedFloor] = useState("Любой");
  const [selectedFinish, setSelectedFinish] = useState(() => {
    return searchParams.get("finish") === "yes" ? "Чистовая" : "Любая";
  });
  const [onlyDiscount, setOnlyDiscount] = useState(() => searchParams.get("discount") === "yes");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedViews, setSelectedViews] = useState<string[]>([]);
  const [selectedDirections, setSelectedDirections] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState(sortOptions[0]);
  const [showSort, setShowSort] = useState(false);
  const [showAllFilters, setShowAllFilters] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleRoom = (r: string) =>
  setSelectedRooms((prev) =>
  prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]
  );

  const toggleAmenity = (a: string) =>
  setSelectedAmenities((prev) =>
  prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
  );

  const toggleView = (v: string) =>
  setSelectedViews((prev) =>
  prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]
  );

  const toggleDirection = (d: string) =>
  setSelectedDirections((prev) =>
  prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
  );

  const toggleFavorite = (id: number) =>
  setFavorites((prev) =>
  prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
  );

  const activeFilters = [
  selectedProject !== "Все проекты" ? selectedProject : null,
  ...selectedRooms.map((r) => r === "Студия" ? "Студия" : `${r}-комн.`),
  selectedFloor !== "Любой" ? `Этаж ${selectedFloor}` : null,
  selectedFinish !== "Любая" ? selectedFinish : null,
  selectedDeadline !== "Любой" ? `Заселение ${selectedDeadline}` : null,
  onlyDiscount ? "Со скидкой" : null,
  ...selectedAmenities,
  ...selectedViews,
  ...selectedDirections].
  filter(Boolean) as string[];

  const roomsSummary = selectedRooms.length ?
  selectedRooms.map((room) => room === "Студия" ? room : `${room}-комн.`).join(", ") :
  "Все квартиры";

  const clearAll = () => {
    setSelectedRooms([]);
    setArea([24, 120]);
    setPrice([4_000_000, 20_000_000]);
    setSelectedDeadline("Любой");
    setSelectedProject("Все проекты");
    setSelectedFloor("Любой");
    setSelectedFinish("Любая");
    setOnlyDiscount(false);
    setSelectedAmenities([]);
    setSelectedViews([]);
    setSelectedDirections([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header introDone />
      <main className="pt-20">
        <section className="pb-8 pt-10 md:pb-12 md:pt-14">
          <div className="site-container">
            <div className="flex w-full flex-col gap-8 md:gap-10">
              <SectionHeading title="Выбрать квартиру" />

              <motion.div
                className="grid grid-cols-1 gap-4 xl:grid-cols-[190px_280px_minmax(0,1fr)_minmax(0,1fr)]"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
                
                <div>
                  <p className="mb-2 text-xs text-muted-foreground">Проект</p>
                  <FilterDropdown
                    value={selectedProject}
                    options={projectOptions}
                    onChange={setSelectedProject}
                  />
                </div>

                <div>
                  <p className="mb-2 text-xs text-muted-foreground">Комнатность</p>
                  <div className="flex gap-1 w-full">
                    {roomOptions.map((r) =>
                    <button
                      key={r}
                      onClick={() => toggleRoom(r)}
                      className={`flex-1 h-14 px-3 rounded-pill text-sm font-medium transition-colors border ${
                      selectedRooms.includes(r) ? "bg-foreground text-background border-foreground" : "border-border text-foreground hover:bg-muted"}`
                      }>
                      
                        {r}
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-xs text-muted-foreground">Стоимость, ₽</p>
                  <div>
                    <div className="flex h-14 items-center rounded-pill border border-border border-b-0 bg-card px-6">
                      <div className="flex w-full items-center justify-between gap-3 text-sm font-medium">
                        <span>{fmtFull(price[0])}</span>
                        <span className="text-muted-foreground">—</span>
                        <span>{fmtFull(price[1])}</span>
                      </div>
                    </div>
                    <div className="bg-card px-6 pb-3">
                      <Slider min={2_000_000} max={30_000_000} step={100_000} value={price} onValueChange={setPrice} />
                    </div>
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-xs text-muted-foreground">Площадь, м²</p>
                  <div>
                    <div className="flex h-14 items-center rounded-pill border border-border border-b-0 bg-card px-6">
                      <div className="flex w-full items-center justify-between gap-3 text-sm font-medium">
                        <span>{area[0]}</span>
                        <span className="text-muted-foreground">—</span>
                        <span>{area[1]}</span>
                      </div>
                    </div>
                    <div className="bg-card px-6 pb-3">
                      <Slider min={15} max={200} step={1} value={area} onValueChange={setArea} />
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="grid grid-cols-2 gap-4 lg:grid-cols-4"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}>
                
                <div>
                  <p className="mb-2 text-xs text-muted-foreground">Этаж</p>
                  <FilterDropdown
                    value={selectedFloor}
                    options={floorOptions}
                    onChange={setSelectedFloor}
                  />
                </div>

                <div>
                  <p className="mb-2 text-xs text-muted-foreground">Отделка</p>
                  <FilterDropdown
                    value={selectedFinish}
                    options={finishOptions}
                    onChange={setSelectedFinish}
                  />
                </div>

                <div>
                  <p className="mb-2 text-xs text-muted-foreground">Готовность</p>
                  <FilterDropdown
                    value={selectedDeadline}
                    options={deadlineOptions}
                    onChange={setSelectedDeadline}
                  />
                </div>

                <div>
                  <p className="mb-2 text-xs text-muted-foreground">Акция</p>
                  <button
                    onClick={() => setOnlyDiscount(!onlyDiscount)}
                    className={`flex h-14 w-full items-center gap-3 rounded-pill border px-5 text-sm font-medium transition-colors ${onlyDiscount ? "border-foreground bg-foreground text-background" : "border-border bg-card hover:bg-muted"}`}>
                    
                    <Flame className="h-4 w-4" />
                    Со скидкой
                  </button>
                </div>
              </motion.div>

              <div>
                <button
                  onClick={() => setShowAllFilters((v) => !v)}
                  className={`inline-flex items-center gap-2 rounded-pill border px-5 h-10 text-sm font-medium transition-colors ${
                    showAllFilters
                      ? "bg-foreground text-background border-foreground"
                      : "border-border text-foreground hover:bg-muted"
                  }`}
                >
                  Все фильтры
                  {(selectedAmenities.length + selectedViews.length + selectedDirections.length) > 0 && (
                    <span className={`inline-flex items-center justify-center rounded-full w-5 h-5 text-[11px] font-semibold ${showAllFilters ? "bg-background text-foreground" : "bg-foreground text-background"}`}>
                      {selectedAmenities.length + selectedViews.length + selectedDirections.length}
                    </span>
                  )}
                  <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${showAllFilters ? "rotate-180" : ""}`} />
                </button>
              </div>

              <AnimatePresence>
              {showAllFilters && (
              <motion.div
                key="advanced-filters"
                className="flex flex-col gap-5 overflow-hidden"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div>
                  <p className="mb-2 text-xs text-muted-foreground">Преимущества</p>
                  <div className="flex flex-wrap gap-2">
                    {amenityOptions.map((a) => (
                      <button
                        key={a}
                        onClick={() => toggleAmenity(a)}
                        className={`rounded-pill border px-4 py-2 text-sm font-medium transition-colors ${
                          selectedAmenities.includes(a)
                            ? "bg-foreground text-background border-foreground"
                            : "border-border text-foreground hover:bg-muted"
                        }`}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-xs text-muted-foreground">Вид из окон</p>
                  <div className="flex flex-wrap gap-2">
                    {viewOptions.map((v) => (
                      <button
                        key={v}
                        onClick={() => toggleView(v)}
                        className={`rounded-pill border px-4 py-2 text-sm font-medium transition-colors ${
                          selectedViews.includes(v)
                            ? "bg-foreground text-background border-foreground"
                            : "border-border text-foreground hover:bg-muted"
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-xs text-muted-foreground">Направление окон</p>
                  <div className="flex flex-wrap gap-2">
                    {directionOptions.map((d) => (
                      <button
                        key={d}
                        onClick={() => toggleDirection(d)}
                        className={`rounded-pill border px-4 py-2 text-sm font-medium transition-colors ${
                          selectedDirections.includes(d)
                            ? "bg-foreground text-background border-foreground"
                            : "border-border text-foreground hover:bg-muted"
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
              )}
              </AnimatePresence>

              <motion.div
                className="rounded-[32px] border border-border bg-card px-6 py-6 md:px-8"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
                
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xl font-medium tracking-[-0.03em]">Найдено {apartments.length} квартир с такими параметрами</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {activeFilters.map((filter) =>
                    <span key={filter} className="inline-flex items-center rounded-pill bg-muted px-4 py-2 text-sm">
                        {filter}
                      </span>
                    )}
                    <button
                      onClick={clearAll}
                      className="inline-flex items-center gap-1 rounded-pill bg-muted px-4 py-2 text-sm transition-colors hover:bg-accent">
                      
                      Сбросить все
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="rounded-t-[40px] bg-muted py-8 pb-16 md:py-10 md:pb-24">
          <div className="site-container">
            <motion.div
              className="flex flex-col gap-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}>
              
              <div className="mb-4 flex flex-col gap-4 md:mb-6 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span className="rounded-pill bg-background px-5 py-3 text-foreground">{selectedProject}</span>
                  <span>{roomsSummary}</span>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="relative">
                    <button
                      onClick={() => setShowSort(!showSort)}
                      className="inline-flex items-center gap-2 rounded-pill border border-border bg-background px-5 py-3 text-sm font-medium transition-colors hover:bg-muted">
                      
                      {sortBy}
                      <ChevronDown className={`h-4 w-4 transition-transform ${showSort ? "rotate-180" : ""}`} />
                    </button>
                    {showSort &&
                    <div className="absolute left-0 top-full z-10 mt-2 min-w-[220px] rounded-3xl border border-border bg-card p-2 shadow-lg sm:left-auto sm:right-0">
                        {sortOptions.map((opt) =>
                      <button
                        key={opt}
                        onClick={() => {
                          setSortBy(opt);
                          setShowSort(false);
                        }}
                        className={`block w-full rounded-2xl px-4 py-3 text-left text-sm transition-colors ${sortBy === opt ? "bg-muted font-medium" : "hover:bg-muted"}`}>
                        
                            {opt}
                          </button>
                      )}
                      </div>
                    }
                  </div>

                  <div className="flex rounded-pill border border-border bg-background p-1">
                    <button
                      onClick={() => setView("grid")}
                      className={`inline-flex items-center gap-2 rounded-pill px-5 py-3 text-sm font-medium transition-colors ${view === "grid" ? "bg-foreground text-background" : "text-foreground hover:bg-muted"}`}>
                      
                      <LayoutGrid className="h-4 w-4" />
                      Плиткой
                    </button>
                    <button
                      onClick={() => setView("list")}
                      className={`inline-flex items-center gap-2 rounded-pill px-5 py-3 text-sm font-medium transition-colors ${view === "list" ? "bg-foreground text-background" : "text-foreground hover:bg-muted"}`}>
                      
                      <List className="h-4 w-4" />
                      Список
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Apartment cards */}
          <div className="site-container">
            {view === "grid" ?
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-6">
                {apartments.map((apt, i) => {
                const monthly = calcMonthly(apt.price, 20, 6, 20);
                const downPayment = Math.round(apt.price * 0.2);
                return (
                  <motion.div
                    key={apt.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.04 }}>
                    
                      <Link
                      to={`/flats/${apt.id}`}
                      className="group bg-card border border-border rounded-3xl overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow">
                      
                        {/* Header: project + building */}
                        <div className="px-6 pt-5 pb-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-display text-base font-medium">ЖК Тектоника</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                ул. Примерная, 1 <span className="mx-1">·</span> {apt.building}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">{apt.building}</span>
                              <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleFavorite(apt.id);
                              }}
                              className="rounded-full border border-border p-3 text-muted-foreground transition-colors hover:text-primary"
                              aria-label="Добавить в избранное">
                              
                                <Heart
                                className={`h-4 w-4 ${
                                favorites.includes(apt.id) ? "fill-primary text-primary" : ""}`
                                } />
                              
                              </button>
                            </div>
                          </div>
                          {/* Room info line */}
                          <p className="text-sm text-muted-foreground mt-2">
                            {apt.rooms === "Студия" ? "студия" : apt.rooms.replace("-комн.", "-комнатная")} <span className="mx-0.5">·</span> {apt.area}&nbsp;м² <span className="mx-0.5">·</span> {apt.floor}&nbsp;этаж из&nbsp;{apt.totalFloors}
                          </p>
                        </div>

                        {/* Floor plan */}
                        <div className="relative bg-background flex items-center justify-center h-[280px] px-8 py-4">
                          <img
                          src={floorplanImg}
                          alt={`Планировка ${apt.rooms}`}
                          className="max-h-[65%] object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
                        
                          {apt.discount &&
                        <span className="absolute top-4 left-6 rounded-pill bg-primary text-primary-foreground px-3 py-1 text-[11px] font-medium uppercase tracking-wide">
                              Скидка
                            </span>
                        }
                        </div>

                        {/* Price + mortgage */}
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

                        {/* Tags */}
                        {apt.tags && apt.tags.length > 0 &&
                      <div className="px-6 pb-5 pt-3 flex flex-wrap gap-2">
                            {apt.tags.map((tag) =>
                        <span
                          key={tag}
                          className="rounded-pill bg-muted px-3 py-1.5 text-xs font-medium">
                          
                                {tag}
                              </span>
                        )}
                          </div>
                      }
                        {(!apt.tags || apt.tags.length === 0) && <div className="pb-5" />}
                      </Link>
                    </motion.div>);

              })}
              </div> : (

            /* List view */
            <div className="flex flex-col gap-3">
                {apartments.map((apt, i) => {
                const monthly = calcMonthly(apt.price, 20, 6, 20);
                return (
                  <motion.div
                    key={apt.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.03 }}>
                    
                      <Link
                      to={`/flats/${apt.id}`}
                      className="group bg-card border border-border rounded-3xl overflow-hidden flex flex-row items-center gap-6 hover:shadow-lg transition-shadow px-6 py-4">
                      
                        {/* Mini floor plan */}
                        <div className="relative bg-background flex-shrink-0 flex items-center justify-center w-[120px] h-[100px] rounded-2xl">
                          <img
                          src={floorplanImg}
                          alt={`Планировка ${apt.rooms}`}
                          className="max-h-[80px] object-contain opacity-80" />
                        
                          {apt.discount &&
                        <span className="absolute -top-1 -left-1 rounded-pill bg-primary text-primary-foreground px-2 py-0.5 text-[10px] font-medium uppercase">
                              Скидка
                            </span>
                        }
                        </div>

                        {/* Info */}
                        <div className="flex-1 flex items-center justify-between gap-6 flex-wrap min-w-0">
                          <div className="flex flex-col gap-0.5">
                            <p className="font-display text-base font-medium">{apt.rooms} <span className="text-muted-foreground font-normal mx-1">·</span> {apt.area} м²</p>
                            <p className="text-sm text-muted-foreground">
                              {apt.floor} этаж из {apt.totalFloors} <span className="mx-1">·</span> {apt.building} <span className="mx-1">·</span> {apt.section}
                            </p>
                          </div>

                          <div className="flex items-center gap-8">
                            {apt.tags && apt.tags.length > 0 &&
                          <div className="hidden md:flex gap-2">
                                {apt.tags.map((tag) =>
                            <span key={tag} className="rounded-pill bg-muted px-3 py-1.5 text-xs font-medium">
                                    {tag}
                                  </span>
                            )}
                              </div>
                          }

                            <div className="text-right">
                              <p className="font-display text-lg font-medium">{fmtFull(apt.price)} ₽</p>
                              <p className="text-xs text-muted-foreground">от {fmtFull(monthly)} ₽/мес</p>
                            </div>

                            <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleFavorite(apt.id);
                            }}
                            className="rounded-full border border-border p-3 text-muted-foreground transition-colors hover:text-primary"
                            aria-label="Добавить в избранное">
                            
                              <Heart
                              className={`h-5 w-5 ${
                              favorites.includes(apt.id) ? "fill-primary text-primary" : ""}`
                              } />
                            
                            </button>
                          </div>
                        </div>
                      </Link>
                    </motion.div>);

              })}
              </div>)
            }
          </div>
        </section>
      </main>
      <Footer />
    </div>);

};

export default Catalog;