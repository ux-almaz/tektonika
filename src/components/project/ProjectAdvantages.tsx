import { motion } from "framer-motion";
import SectionHeading from "../SectionHeading";
import { ArrowUpRight, GraduationCap, Car } from "lucide-react";
import ecologyImg from "@/assets/advantage-ecology.jpg";
import landscapingImg from "@/assets/advantage-landscaping.jpg";
import infrastructureImg from "@/assets/advantage-infrastructure.jpg";

const advantages = [
  {
    title: "Экология\nи природное окружение",
    desc: "Благоприятная экология, зелёные зоны и парки в шаговой доступности",
    image: ecologyImg,
    type: "photo" as const,
    icon: null,
  },
  {
    title: "Школы и детские сады",
    desc: "Школы и садики с собственной образовательной концепцией",
    image: null,
    type: "icon" as const,
    icon: GraduationCap,
  },
  {
    title: "Продуманное\nблагоустройство",
    desc: "Набережная, бульвар с ресторанами, площадки для отдыха и спорта",
    image: landscapingImg,
    type: "photo" as const,
    icon: null,
  },
  {
    title: "Транспортная\nдоступность",
    desc: "Удобные выезды на трассу, остановки общественного транспорта рядом",
    image: null,
    type: "icon" as const,
    icon: Car,
  },
  {
    title: "Развитая\nинфраструктура",
    desc: "Всё для жизни — клиники, кафе, магазины в черте района",
    image: infrastructureImg,
    type: "photo" as const,
    icon: null,
  },
];

const AdvantageCard = ({
  title,
  desc,
  image,
  type,
  icon: Icon,
  index,
}: {
  title: string;
  desc: string;
  image: string | null;
  type: "photo" | "icon";
  icon: React.ComponentType<any> | null;
  index: number;
}) => {
  const isPhoto = type === "photo";

  return (
    <motion.div
      className={`relative overflow-hidden rounded-3xl flex flex-col justify-between ${
        isPhoto ? "text-white" : "bg-muted text-foreground"
      } min-h-[280px] md:min-h-[340px]`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.08 * index }}
    >
      {isPhoto && image && (
        <>
          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </>
      )}

      {!isPhoto && Icon && (
        <div className="absolute right-5 top-5 w-12 h-12 rounded-2xl bg-background border border-border flex items-center justify-center">
          <Icon className="w-6 h-6 text-foreground" strokeWidth={1.5} />
        </div>
      )}

      <div className="relative z-10 p-6 md:p-8">
        <h3 className="font-display text-2xl md:text-[28px] font-semibold leading-[1.15] whitespace-pre-line">
          {title}
        </h3>
      </div>

      <div className="relative z-10 p-6 md:p-8 pt-0 flex items-end justify-between gap-4">
        <p className={`text-sm leading-relaxed max-w-[280px] ${isPhoto ? "text-white/80" : "text-muted-foreground"}`}>
          {desc}
        </p>
        <button
          className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
            isPhoto
              ? "bg-white/20 hover:bg-white/30 text-white"
              : "bg-background hover:bg-background/80 text-foreground border border-border"
          }`}
        >
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

const ProjectAdvantages = () => (
  <section id="project-advantages" className="py-16 md:py-24 border-0">
    <div className="site-container">
      <SectionHeading title="Преимущества проекта" />

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        {advantages.slice(0, 2).map((adv, i) => (
          <AdvantageCard key={adv.title} index={i} {...adv} />
        ))}
      </div>

      <div className="mt-4 md:mt-5 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
        {advantages.slice(2).map((adv, i) => (
          <AdvantageCard key={adv.title} index={i + 2} {...adv} />
        ))}
      </div>
    </div>
  </section>
);

export default ProjectAdvantages;
