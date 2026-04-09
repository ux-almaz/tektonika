import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";

const specs = [
  { label: "Тип недвижимости", value: "Квартира" },
  { label: "Комнатность", value: "2 комнаты" },
  { label: "Общая площадь", value: "58 м²" },
  { label: "Жилая площадь", value: "32 м²" },
  { label: "Площадь кухни", value: "14 м²" },
  { label: "Этаж", value: "12 из 18" },
  { label: "Отделка", value: "Без отделки" },
  { label: "Высота потолков", value: "2,7 м" },
  { label: "Санузел", value: "Раздельный" },
  { label: "Балкон/лоджия", value: "Лоджия" },
];

const ApartmentSpecs = () => (
  <section className="py-16 md:py-24 bg-muted">
    <div className="site-container">
      <SectionHeading title="Эта квартира — особенная" />

      <ScrollReveal>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-0 border border-border rounded-3xl overflow-hidden bg-card">
          {specs.map((s, i) => (
            <div
              key={s.label}
              className={`flex items-center justify-between px-8 py-5 ${
                i < specs.length - 2 ? "border-b border-border" : i < specs.length - 1 ? "border-b border-border md:border-b-0" : ""
              } ${i % 2 === 0 ? "md:border-r border-border" : ""}`}
            >
              <span className="text-muted-foreground text-sm">{s.label}</span>
              <span className="font-display text-base font-medium">{s.value}</span>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default ApartmentSpecs;
