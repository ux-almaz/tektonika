import { motion } from "framer-motion";
import FeatureCard from "./FeatureCard";

const cards = [
  {
    title: "Проекты",
    description: "ЖК Тектоника —\nпремиальное жильё",
    actionLabel: "Смотреть",
    href: "/projects",
  },
  {
    title: "Квартиры",
    description: "планировки и каталог\nдоступных лотов",
    actionLabel: "В каталог",
    href: "/catalog",
  },
  {
    title: "Как купить",
    description: "ипотека, рассрочка\nи условия сделки",
    actionLabel: "Подробнее",
    href: "/purchase",
  },
];

const FeatureCardsSection = () => (
  <section className="relative z-10 w-full mt-4 pb-4">
    <div className="site-container">
    <div className="flex flex-col md:flex-row w-full min-h-[220px] gap-4">
      {cards.map((card, i) => (
        <motion.div
          key={card.title}
          className="flex-1 min-w-[240px] flex"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.15 * i,
          }}
        >
          <FeatureCard {...card} />
        </motion.div>
      ))}
    </div>
    </div>
  </section>
);

export default FeatureCardsSection;
