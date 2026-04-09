import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";

const features = [
  {
    title: "Панорамное остекление",
    desc: "Большие окна от пола до потолка наполняют квартиру естественным светом и открывают вид на горы.",
  },
  {
    title: "Закрытый двор без машин",
    desc: "Безопасная территория с ландшафтным дизайном, детскими и спортивными площадками.",
  },
  {
    title: "Подземный паркинг",
    desc: "Тёплый подземный паркинг с прямым доступом в подъезд через лифтовой холл.",
  },
  {
    title: "Умный дом",
    desc: "Квартиры подготовлены для установки системы умного дома: управление освещением, климатом и безопасностью.",
  },
];

const ApartmentFeatures = () => (
  <section className="py-16 md:py-24 bg-muted">
    <div className="site-container">
      <SectionHeading title="Особенности" />

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((f, i) => (
          <ScrollReveal key={f.title} delay={i * 0.1}>
            <div className="bg-card border border-border rounded-3xl p-8 md:p-10 h-full">
              <h3 className="font-display text-2xl md:text-[28px] font-medium leading-tight">{f.title}</h3>
              <p className="text-muted-foreground mt-4 text-base leading-relaxed">{f.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default ApartmentFeatures;
