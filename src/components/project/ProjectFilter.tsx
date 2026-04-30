import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Slider } from "@/components/ui/slider";
import { Heart } from "lucide-react";
import FilterDropdown from "@/components/FilterDropdown";
import floorplanImg from "@/assets/floorplan-1room.svg";

const roomOptions = ["Студия", "1", "2", "3", "4", "5"];
const deadlineOptions = ["Все", "2025", "2026"];

const fmt = (n: number) => n.toLocaleString("ru-RU");

const APARTMENTS_PER_PAGE = 6;

const ROOM_MAP: Record<string, string> = {
  "Студия": "Студия",
  "1": "1-комн.",
  "2": "2-комн.",
  "3": "3-комн.",
  "4": "4-комн.",
  "5": "5-комн.",
};

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

const INITIAL_ROOMS: string[] = [];
const INITIAL_AREA = [28, 120];
const INITIAL_PRICE = [4_000_000, 15_000_000];
const INITIAL_DEADLINE = "Все";

const ProjectFilter = () => {
  const [selectedRooms, setSelectedRooms] = useState<string[]>(INITIAL_ROOMS);
  const [area, setArea] = useState(INITIAL_AREA);
  const [price, setPrice] = useState(INITIAL_PRICE);
  const [selectedDeadline, setSelectedDeadline] = useState(INITIAL_DEADLINE);
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(APARTMENTS_PER_PAGE);
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleRoom = (r: string) =>
    setSelectedRooms((prev) =>
      prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]
    );

  const toggleFavorite = (id: number) =>
    setFavorites((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const filtersChanged =
    JSON.stringify(selectedRooms) !== JSON.stringify(INITIAL_ROOMS) ||
    JSON.stringify(area) !== JSON.stringify(INITIAL_AREA) ||
    JSON.stringify(price) !== JSON.stringify(INITIAL_PRICE) ||
    selectedDeadline !== INITIAL_DEADLINE;

  const filtered = selectedRooms.length
    ? mockApartments.filter(apt =>
        selectedRooms.some(r => ROOM_MAP[r] === apt.rooms)
      )
    : mockApartments;

  const catalogParams = (() => {
    const params = new URLSearchParams();
    if (selectedRooms.length) params.set("rooms", selectedRooms.join(","));
    if (area[0] !== 28 || area[1] !== 120) params.set("area", `${area[0]}-${area[1]}`);
    if (price[0] !== 4_000_000 || price[1] !== 15_000_000) params.set("price", `${price[0]}-${price[1]}`);
    if (selectedDeadline !== "Все") params.set("deadline", selectedDeadline);
    return params.toString();
  })();

  return (
    <section id="project-filter" className="py-8 border-b border-border">
      <div className="site-container">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[auto_1fr_1fr_auto_auto] gap-6 lg:gap-8 items-end"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          {/* Rooms */}
          <div>
            <p className="text-muted-foreground text-xs mb-3">Количество комнат</p>
            <div className="flex gap-1">
              {roomOptions.map((r) => (
                <button
                  key={r}
                  onClick={() => toggleRoom(r)}
                  className={`min-w-[44px] h-12 px-3 rounded-pill text-sm font-medium transition-colors border ${
                    selectedRooms.includes(r)
                      ? "bg-foreground text-background border-foreground"
                      : "border-border text-foreground hover:bg-muted"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Area slider */}
          <div>
            <p className="text-muted-foreground text-xs mb-3">Площадь квартиры, м²</p>
            <div>
              <div className="flex items-center justify-between border border-border border-b-0 rounded-pill px-6 py-3.5">
                <span className="text-sm font-medium">{area[0]} — {area[1]}</span>
              </div>
              <div className="px-6">
                <Slider min={20} max={200} step={1} value={area} onValueChange={setArea} />
              </div>
            </div>
          </div>

          {/* Price slider */}
          <div>
            <p className="text-muted-foreground text-xs mb-3">Стоимость, ₽</p>
            <div>
              <div className="flex items-center justify-between border border-border border-b-0 rounded-pill px-6 py-3.5">
                <span className="text-sm font-medium">{fmt(price[0])} — {fmt(price[1])}</span>
              </div>
              <div className="px-6">
                <Slider min={2_000_000} max={30_000_000} step={100_000} value={price} onValueChange={setPrice} />
              </div>
            </div>
          </div>

          {/* Settlement dropdown */}
          <div>
            <p className="text-muted-foreground text-xs mb-3">Готовность</p>
            <FilterDropdown
              value={selectedDeadline}
              options={deadlineOptions}
              onChange={setSelectedDeadline}
              height="h-12"
            />
          </div>

          {/* CTA */}
          <button
            onClick={() => navigate(`/catalog${catalogParams ? `?${catalogParams}` : ""}`)}
            className="rounded-pill bg-primary text-primary-foreground h-12 px-8 text-sm font-medium uppercase tracking-wide hover:bg-primary/90 transition-colors whitespace-nowrap"
          >
            Показать квартиры
          </button>
        </motion.div>

        {/* Apartment cards — shown after filter change */}
        {filtersChanged && <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
              {(() => {
                const visible = filtered.slice(0, visibleCount);
                const hasMore = visibleCount < filtered.length;
                return (
                  <>
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
                                    <p className="font-display text-base font-medium">Резиденция ЛЮКСОР</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                      Артиллерийская, 90 <span className="mx-1">·</span> {apt.building}
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
                                <p className="font-display text-2xl font-medium">{fmt(apt.price)} ₽</p>
                                <div className="flex items-start gap-6 mt-2">
                                  <div>
                                    <p className="text-xs text-muted-foreground">Ипотека</p>
                                    <p className="text-sm font-medium">{fmt(monthly)} ₽/мес</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-muted-foreground">Первоначальный взнос</p>
                                    <p className="text-sm font-medium">от {fmt(downPayment)} ₽</p>
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

                    {hasMore && visibleCount < APARTMENTS_PER_PAGE * 3 ? (
                      <div className="flex justify-center mt-8">
                        <button
                          onClick={() => setVisibleCount((c) => c + APARTMENTS_PER_PAGE)}
                          className="rounded-pill border border-border px-10 h-12 text-sm font-medium hover:bg-muted transition-colors"
                        >
                          Показать ещё
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
                  </>
                );
              })()}
        </motion.div>}
      </div>
    </section>
  );
};

export default ProjectFilter;
