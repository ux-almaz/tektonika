import { motion } from "framer-motion";
import PillButton from "../PillButton";
import TextReveal from "../TextReveal";

const ProjectCTA = () => (
  <section className="py-16 md:py-24 border-0">
    <div className="site-container">
    <motion.div
      className="bg-foreground text-background p-10 md:p-16 lg:p-20 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 rounded-3xl"
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-[500px]">
        <TextReveal as="h2" className="font-display text-[28px] md:text-[40px] font-normal leading-[1.1] uppercase tracking-[-1px]">
          Запишитесь на&nbsp;экскурсию
        </TextReveal>
        <motion.p
          className="mt-6 text-background/60 text-base md:text-lg leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Приезжайте в наш офис продаж и&nbsp;убедитесь в&nbsp;качестве лично. Мы закажем вам такси бесплатно.
        </motion.p>
      </div>

      <motion.div
        className="flex flex-col sm:flex-row gap-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <PillButton variant="yellow" withArrow>
          Записаться
        </PillButton>
        <PillButton variant="outline" className="border-background/30 text-background hover:bg-background/10">
          Позвонить
        </PillButton>
      </motion.div>
    </motion.div>
    </div>
  </section>
);

export default ProjectCTA;
