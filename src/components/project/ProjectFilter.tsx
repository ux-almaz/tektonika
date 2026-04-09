import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Slider } from "@/components/ui/slider";
import FilterDropdown from "@/components/FilterDropdown";

const roomOptions = ["Студия", "1", "2", "3", "4", "5"];
const deadlineOptions = ["Все", "2025", "2026"];

const fmt = (n: number) => n.toLocaleString("ru-RU");

const ProjectFilter = () => {
  const navigate = useNavigate();
  const [selectedRooms, setSelectedRooms] = useState<string[]>(["2"]);
  const [area, setArea] = useState([28, 120]);
  const [price, setPrice] = useState([4_000_000, 15_000_000]);
  const [selectedDeadline, setSelectedDeadline] = useState("Все");

  const toggleRoom = (r: string) =>
  setSelectedRooms((prev) =>
  prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]
  );

  return (
    <section id="project-filter" className="py-8 border-b border-border">
      <div className="site-container">
      <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[auto_1fr_1fr_auto_auto] gap-6 lg:gap-8 items-end"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}>
          
        {/* Rooms */}
        <div>
          <p className="text-muted-foreground text-xs mb-3">Количество комнат</p>
          <div className="flex gap-1">
            {roomOptions.map((r) =>
              <button
                key={r}
                onClick={() => toggleRoom(r)}
                className={`min-w-[44px] h-12 px-3 rounded-pill text-sm font-medium transition-colors border ${
                selectedRooms.includes(r) ?
                "bg-foreground text-background border-foreground" :
                "border-border text-foreground hover:bg-muted"}`
                }>
                
                {r}
              </button>
              )}
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
          onClick={() => {
            const params = new URLSearchParams();
            if (selectedRooms.length) params.set("rooms", selectedRooms.join(","));
            if (area[0] !== 28 || area[1] !== 120) params.set("area", `${area[0]}-${area[1]}`);
            if (price[0] !== 4_000_000 || price[1] !== 15_000_000) params.set("price", `${price[0]}-${price[1]}`);
            if (selectedDeadline !== "Все") params.set("deadline", selectedDeadline);
            navigate(`/catalog?${params.toString()}`);
          }}
          className="rounded-pill bg-primary text-primary-foreground h-12 px-8 text-sm font-medium uppercase tracking-wide hover:bg-primary/90 transition-colors whitespace-nowrap"
        >
          Показать квартиры
        </button>
      </motion.div>
      </div>
    </section>);

};

export default ProjectFilter;