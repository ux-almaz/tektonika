import { motion } from "framer-motion";
import { useState } from "react";
import SectionHeading from "../SectionHeading";
import ScrollReveal from "../ScrollReveal";
import {
  GraduationCap,
  ShoppingBag,
  Dumbbell,
  Coffee,
  TreePine,
  Stethoscope,
  Landmark,
  LayoutGrid,
} from "lucide-react";

const categories = [
  { icon: LayoutGrid, label: "Все категории", count: 50, active: true },
  { icon: Landmark, label: "Культура", count: 1 },
  { icon: ShoppingBag, label: "Шопинг", count: 10 },
  { icon: Dumbbell, label: "Спорт", count: 8 },
  { icon: Coffee, label: "Кафе и рестораны", count: 5 },
  { icon: TreePine, label: "Парки и скверы", count: 3 },
  { icon: Stethoscope, label: "Медицина", count: 4 },
  { icon: GraduationCap, label: "Образование", count: 19 },
];

const ProjectLocation = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const totalCount = categories[0].count;

  return (
    <section id="project-location" className="py-16 md:py-24 border-0">
      <div className="site-container">
        <SectionHeading title="Расположение и инфраструктура" />

        <div className="mt-12 flex flex-col lg:flex-row gap-0 border border-border overflow-hidden rounded-3xl">
          {/* Left sidebar */}
          <ScrollReveal className="lg:w-[360px] shrink-0 bg-background p-6 md:p-8" direction="left">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-xl font-medium">Места поблизости</h3>
              <span className="bg-foreground text-background text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center">
                {totalCount}
              </span>
            </div>

            <div className="space-y-1.5">
              {categories.map((cat, i) => {
                const Icon = cat.icon;
                const isActive = i === activeIdx;
                return (
                  <motion.button
                    key={cat.label}
                    onClick={() => setActiveIdx(i)}
                    className={`w-full flex items-center gap-3 py-3 px-4 text-left transition-colors rounded-full ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted hover:bg-muted/80"
                    }`}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.05 * i }}
                  >
                    <Icon className={`w-5 h-5 shrink-0 ${isActive ? "text-primary-foreground" : "text-primary"}`} strokeWidth={1.5} />
                    <span className={`text-sm flex-1 ${isActive ? "font-medium" : ""}`}>
                      {cat.label}
                    </span>
                    <span className={`text-xs ${isActive ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{cat.count}</span>
                  </motion.button>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Yandex Map */}
          <div className="flex-1 min-h-[500px] md:min-h-[680px] relative">
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=34.1008,44.9521&z=15&pt=34.1008,44.9521,pm2rdm"
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
              title="Расположение ЖК Тектоника на карте"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectLocation;
