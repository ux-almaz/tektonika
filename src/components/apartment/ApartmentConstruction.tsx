import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import constructionImg from "@/assets/construction-photo.webp";

const timeline = [
  { date: "Март 2026", text: "Ведётся устройство монолитного каркаса 12–14 этажей корпуса 1. Выполнены фасадные работы до 10 этажа." },
  { date: "Январь 2026", text: "Завершён монтаж монолитного каркаса до 11 этажа. Начаты работы по устройству внутренних перегородок." },
  { date: "Октябрь 2025", text: "Выполнены работы по устройству фундамента и подземного паркинга. Монолитный каркас — 6 этажей." },
];

const ApartmentConstruction = () => (
  <section className="py-16 md:py-24">
    <div className="site-container">
      <SectionHeading title="Ход строительства" />

      <ScrollReveal>
        <div className="mt-12 flex flex-col lg:flex-row gap-10">
          {/* Photo */}
          <div className="flex-1 rounded-3xl overflow-hidden">
            <img
              src={constructionImg}
              alt="Ход строительства"
              className="w-full h-[300px] md:h-[400px] object-cover"
            />
          </div>

          {/* Timeline */}
          <div className="lg:w-[440px] space-y-0">
            {timeline.map((item, i) => (
              <div key={i} className={`py-6 ${i < timeline.length - 1 ? "border-b border-border" : ""}`}>
                <p className="font-display text-lg font-medium">{item.date}</p>
                <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default ApartmentConstruction;
