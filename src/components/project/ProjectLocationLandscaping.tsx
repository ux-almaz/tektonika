import { motion } from "framer-motion";
import ScrollReveal from "../ScrollReveal";
import { TreePine, GraduationCap, Bike, ShoppingBag, Stethoscope } from "lucide-react";
import landscapingImg from "@/assets/advantage-landscaping.jpg";
import courtyardImg from "@/assets/about-courtyard.jpg";

const photoCards = [
  { src: landscapingImg, label: "Авторское благоустройство", sub: "Озеленение с учетом сезонности и гипоаллергенных растений" },
  { src: courtyardImg, label: "Закрытый двор-сад", sub: "На стилобате: безопасно, приватно, без машин" },
];

const featureCards = [
  { icon: TreePine, title: "Тихая экологичная локация", desc: "Без магистралей и загазованности — комфортно жить каждый день" },
  { icon: GraduationCap, title: "Инфраструктура для детей 0–17", desc: "Школа №21 и детский сад №83 находятся прямо напротив комплекса" },
  { icon: Bike, title: "Умный двор и Wi-Fi", desc: "Бесшовный Wi-Fi, умная мебель со слотами для зарядки, зоны по активности" },
  { icon: ShoppingBag, title: "Проработанная коммерция", desc: "Кофейни, сервисы, магазины, фитнес и коворкинг у дома" },
  { icon: Stethoscope, title: "Центр рядом, ритм — ваш", desc: "До исторического центра 5–7 минут: всё рядом, ничто не давит" },
];

interface ProjectLocationLandscapingProps {
  photoCardOverrides?: [string?, string?];
}

const ProjectLocationLandscaping = ({ photoCardOverrides }: ProjectLocationLandscapingProps) => {
  const resolvedPhotoCards = photoCards.map((card, index) => ({
    ...card,
    src: photoCardOverrides?.[index] ?? card.src,
  }));

  return (
    <section id="project-location" className="py-16 md:py-24 border-0">
      <div className="site-container">

      {/* Top: heading + description */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 mb-10 md:mb-14">
        <ScrollReveal className="lg:w-[45%] shrink-0">
          <h2 className="font-display text-[28px] md:text-[40px] font-normal leading-[1.1] tracking-[-1px]">
            Всё рядом.<br />Ничто не давит.
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.15} className="flex-1">
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            ЛЮКСОР находится в Центральном районе Симферополя и сочетает редкий для города баланс: приватная тишина и быстрая доступность ключевых точек. Ужин в центре — и через несколько минут вы уже в другом мире, дома.
          </p>
        </ScrollReveal>
      </div>

      {/* Main: left panel + map */}
      <div className="flex flex-col lg:flex-row gap-4 items-stretch">

        {/* Left panel */}
        <div className="lg:w-[520px] shrink-0 flex flex-col gap-3">

          {/* Photo cards */}
          <div className="grid grid-cols-2 gap-3">
            {resolvedPhotoCards.map((card, i) => (
              <motion.div
                key={card.label}
                className="relative rounded-2xl overflow-hidden"
                style={{ height: "200px" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <img src={card.src} alt={card.label} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white text-sm font-medium leading-tight">{card.label}</p>
                  <p className="text-white/70 text-xs mt-0.5 leading-snug">{card.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Feature cards */}
          {featureCards.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                className="bg-muted rounded-2xl px-5 py-4 flex items-start gap-4"
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
              >
                <Icon className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <p className="text-sm font-medium leading-snug">{f.title}</p>
                  <p className="text-muted-foreground text-xs mt-0.5 leading-snug">{f.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Map */}
        <div className="flex-1 rounded-3xl overflow-hidden border border-border min-h-[480px] lg:min-h-0">
          <iframe
            src="https://yandex.ru/map-widget/v1/?ll=34.1008,44.9521&z=15&pt=34.1008,44.9521,pm2rdm"
            className="w-full h-full border-0 min-h-[480px]"
            allowFullScreen
            title="Расположение ЛЮКСОР на карте"
          />
        </div>

      </div>
    </div>
    </section>
  );
};

export default ProjectLocationLandscaping;
