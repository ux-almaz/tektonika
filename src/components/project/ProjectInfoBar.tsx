import { motion } from "framer-motion";

interface ProjectInfoBarProps {
  titleOverride?: string;
  addressOverride?: string;
}

const ProjectInfoBar = ({ titleOverride, addressOverride }: ProjectInfoBarProps) => (
  <section className="py-8 border-b border-border">
    <div className="site-container">
    <motion.div
      className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Left: name + location */}
      <div>
        <h2 className="font-display text-2xl md:text-3xl font-medium">{titleOverride ?? "ЖК Тектоника"}</h2>
        <p className="text-muted-foreground text-sm mt-1 flex items-center gap-2">
          Симферополь
          <span className="text-border">•</span>
          <span className="text-primary underline underline-offset-2">{addressOverride ?? "ул. Примерная, 1"}</span>
          <span className="text-border">•</span>
          <svg className="w-4 h-4 text-muted-foreground" viewBox="0 0 16 16" fill="none"><path d="M8 14.5C8 14.5 13 10.5 13 6.5C13 3.74 10.76 1.5 8 1.5C5.24 1.5 3 3.74 3 6.5C3 10.5 8 14.5 8 14.5Z" stroke="currentColor" strokeWidth="1.2"/><circle cx="8" cy="6.5" r="1.5" stroke="currentColor" strokeWidth="1.2"/></svg>
          5–7 мин до центра
        </p>
      </div>

      {/* Right: key stats */}
      <div className="flex flex-wrap gap-8 md:gap-12">
        <div>
          <p className="font-display text-lg md:text-xl font-medium">Бизнес</p>
          <p className="text-muted-foreground text-xs">Класс жилья</p>
        </div>
        <div>
          <p className="font-display text-lg md:text-xl font-medium">40 планировок</p>
          <p className="text-muted-foreground text-xs">Под разные сценарии жизни</p>
        </div>
        <div>
          <p className="font-display text-lg md:text-xl font-medium">200 м/м + зарядки</p>
          <p className="text-muted-foreground text-xs">Двухуровневый паркинг</p>
        </div>
        <div>
          <p className="font-display text-lg md:text-xl font-medium">442 резиденции</p>
          <p className="text-muted-foreground text-xs">Бизнес-уровень проживания</p>
        </div>
        <div>
          <p className="font-display text-lg md:text-xl font-medium">от 11,3 млн ₽</p>
          <p className="text-muted-foreground text-xs">Стоимость квартир</p>
        </div>
      </div>
    </motion.div>
    </div>
  </section>
);

export default ProjectInfoBar;
