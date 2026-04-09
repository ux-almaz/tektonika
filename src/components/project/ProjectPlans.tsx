import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import SectionHeading from "../SectionHeading";
import PillButton from "../PillButton";
import floorplanImg from "@/assets/floorplan-1room.svg";

const planTypes = [
  { label: "Студия", area: "от 28 м²", price: "от 5,6 млн ₽", rooms: "Студия" },
  { label: "1-комн.", area: "от 38 м²", price: "от 7,6 млн ₽", rooms: "1 комната" },
  { label: "2-комн.", area: "от 58 м²", price: "от 11,3 млн ₽", rooms: "2 комнаты" },
  { label: "3-комн.", area: "от 85 м²", price: "от 16,9 млн ₽", rooms: "3 комнаты" },
];

const ProjectPlans = () => {
  const [active, setActive] = useState(0);
  const plan = planTypes[active];

  return (
    <section id="project-plans" className="py-16 md:py-24">
      <div className="site-container">
      <SectionHeading title="Планировки" />

      {/* Tabs */}
      <div className="mt-12 flex flex-wrap gap-3">
        {planTypes.map((p, i) => (
          <button
            key={p.label}
            onClick={() => setActive(i)}
            className={`rounded-pill px-6 py-3 text-sm font-medium uppercase tracking-[0.3px] transition-colors border ${
              i === active
                ? "bg-foreground text-background border-foreground"
                : "bg-transparent text-foreground border-border hover:bg-foreground/5"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Plan display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          className="mt-10 flex flex-col lg:flex-row gap-10 lg:gap-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Floor plan placeholder */}
          <div className="flex-1 bg-background border border-border flex items-center justify-center h-[420px] md:h-[560px] rounded-3xl px-6 py-12">
            <img
              src={floorplanImg}
              alt={`Планировка — ${plan.rooms}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* Plan info */}
          <div className="lg:w-[360px] flex flex-col justify-between">
            <div>
              <h3 className="font-display text-3xl md:text-[40px] font-medium leading-none">{plan.rooms}</h3>
              <div className="mt-8 space-y-6">
                <div className="flex justify-between items-center border-b border-border pb-4">
                  <span className="text-muted-foreground text-sm">Площадь</span>
                  <span className="font-display text-lg font-medium">{plan.area}</span>
                </div>
                <div className="flex justify-between items-center border-b border-border pb-4">
                  <span className="text-muted-foreground text-sm">Стоимость</span>
                  <span className="font-display text-lg font-medium">{plan.price}</span>
                </div>
                <div className="rounded-2xl bg-background border border-border px-5 py-4 flex justify-between items-center">
                  <div>
                    <span className="text-muted-foreground text-xs uppercase tracking-wide">Ипотека</span>
                    <p className="font-display text-2xl font-medium text-primary mt-0.5">от 36 432 ₽<span className="text-base font-normal text-muted-foreground">/мес</span></p>
                  </div>
                  <span className="text-xs text-muted-foreground bg-background rounded-full px-3 py-1.5 border border-border">от 6%</span>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <Link to="/flats/1" className="w-full">
                <PillButton variant="yellow" withArrow className="w-full">
                  Выбрать квартиру
                </PillButton>
              </Link>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectPlans;
