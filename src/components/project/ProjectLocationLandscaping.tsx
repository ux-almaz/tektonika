import { motion } from "framer-motion";
import ScrollReveal from "../ScrollReveal";
import { TreePine, GraduationCap, Bike, ShoppingBag, Stethoscope } from "lucide-react";
import landscapingImg from "@/assets/advantage-landscaping.jpg";
import courtyardImg from "@/assets/about-courtyard.jpg";

const photoCards = [
  { src: landscapingImg, label: "Ландшафтный дизайн", sub: "Профессиональное озеленение территории" },
  { src: courtyardImg, label: "Закрытый двор", sub: "Без машин и посторонних" },
];

const featureCards = [
  { icon: TreePine, title: "Парки и зелёные зоны", desc: "Парк им. Гагарина и скверы — в шаговой доступности" },
  { icon: GraduationCap, title: "Школы и детские сады", desc: "5 общеобразовательных школ, 6 детских садов в радиусе 1 км" },
  { icon: Bike, title: "Велодорожки и прогулочные маршруты", desc: "Разветвлённая сеть маршрутов по всему микрорайону" },
  { icon: ShoppingBag, title: "Торговля и сервисы", desc: "Супермаркеты, кафе и аптеки в пешей доступности" },
  { icon: Stethoscope, title: "Медицина", desc: "Городская клиника и частные центры рядом с комплексом" },
];

const ProjectLocationLandscaping = () => (
  <section id="project-location" className="py-16 md:py-24 border-0">
    <div className="site-container">

      {/* Top: heading + description */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 mb-10 md:mb-14">
        <ScrollReveal className="lg:w-[45%] shrink-0">
          <h2 className="font-display text-[28px] md:text-[40px] font-normal leading-[1.1] tracking-[-1px]">
            Всё необходимое —<br />в шаговой доступности
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.15} className="flex-1">
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            ЖК «Тектоника» расположен в одном из лучших районов Симферополя. Развитая инфраструктура, озеленённые дворы и удобные маршруты — всё для комфортной жизни в сердце Крыма.
          </p>
        </ScrollReveal>
      </div>

      {/* Main: left panel + map */}
      <div className="flex flex-col lg:flex-row gap-4 items-stretch">

        {/* Left panel */}
        <div className="lg:w-[520px] shrink-0 flex flex-col gap-3">

          {/* Photo cards */}
          <div className="grid grid-cols-2 gap-3">
            {photoCards.map((card, i) => (
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
            title="Расположение ЖК Тектоника на карте"
          />
        </div>

      </div>
    </div>
  </section>
);

export default ProjectLocationLandscaping;
