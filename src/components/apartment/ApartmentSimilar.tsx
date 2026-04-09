import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";
import floorplanImg from "@/assets/floorplan-1room.svg";

const fmt = (n: number) => n.toLocaleString("ru-RU");

function calcMonthly(price: number, downPercent: number, rate: number, years: number) {
  const principal = price - price * (downPercent / 100);
  if (principal <= 0) return 0;
  const mr = rate / 100 / 12;
  const n = years * 12;
  if (mr === 0) return Math.round(principal / n);
  return Math.round((principal * mr) / (1 - Math.pow(1 + mr, -n)));
}

const similar = [
  { id: 101, rooms: "2-комн.", area: 55.0, floor: 8, totalFloors: 18, building: "корп. 1", price: 10_800_000, priceM2: 196_364, discount: true, tags: ["вид на парк"] },
  { id: 102, rooms: "2-комн.", area: 61.0, floor: 15, totalFloors: 18, building: "корп. 2", price: 12_100_000, priceM2: 198_361, discount: false, tags: ["панорамные окна"] },
  { id: 103, rooms: "2-комн.", area: 59.0, floor: 6, totalFloors: 9, building: "корп. 1", price: 11_500_000, priceM2: 194_915, discount: true, tags: ["вид на горы"] },
  { id: 104, rooms: "1-комн.", area: 38.0, floor: 10, totalFloors: 18, building: "корп. 3", price: 7_600_000, priceM2: 200_000, discount: false, tags: ["старт продаж"] },
];

const ApartmentSimilar = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) =>
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="site-container">
        <SectionHeading title="Похожие квартиры" />

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {similar.map((apt, i) => {
            const monthly = calcMonthly(apt.price, 20, 6, 20);
            const downPayment = Math.round(apt.price * 0.2);
            return (
              <ScrollReveal key={apt.id} delay={i * 0.08}>
                <Link
                  to={`/flats/${apt.id}`}
                  className="group bg-card border border-border rounded-3xl overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow"
                >
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
                          className="p-1 text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Heart
                            className={`h-4 w-4 ${
                              favorites.includes(apt.id) ? "fill-primary text-primary" : ""
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                    {/* Room info line */}
                    <p className="text-sm text-muted-foreground mt-2">
                      {apt.rooms.replace("-комн.", "-комнатная")} <span className="mx-0.5">·</span> {apt.area}&nbsp;м² <span className="mx-0.5">·</span> {apt.floor}&nbsp;этаж из&nbsp;{apt.totalFloors}
                    </p>
                  </div>

                  {/* Floor plan */}
                  <div className="relative bg-background flex items-center justify-center h-[240px] px-8 py-6">
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

                  {/* Price + mortgage */}
                  <div className="px-6 pt-4 pb-2">
                    <p className="font-display text-xl font-medium">{fmt(apt.price)} ₽</p>
                    <div className="flex items-start gap-4 mt-2">
                      <div>
                        <p className="text-xs text-muted-foreground">Ипотека</p>
                        <p className="text-sm font-medium">{fmt(monthly)} ₽/мес</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Взнос</p>
                        <p className="text-sm font-medium">от {fmt(downPayment)} ₽</p>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  {apt.tags && apt.tags.length > 0 && (
                    <div className="px-6 pb-5 pt-3 flex flex-wrap gap-2">
                      {apt.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-pill border border-border px-3.5 py-1.5 text-xs text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {(!apt.tags || apt.tags.length === 0) && <div className="pb-5" />}
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ApartmentSimilar;
