import FeatureCard from "./FeatureCard";
import ScrollReveal from "./ScrollReveal";

const cards = [
  {
    title: "Проекты",
    description: "Резиденция ЛЮКСОР —\nпремиальное жильё",
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
  <section className="relative z-10 w-full mt-4 pb-4 border-0">
    <div className="site-container">
      <div className="flex flex-col md:flex-row w-full min-h-[220px] gap-4">
        {cards.map((card, i) => (
          <ScrollReveal key={card.title} delay={0.12 * i} className="flex-1 min-w-[240px] flex">
            <FeatureCard {...card} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default FeatureCardsSection;
