import { motion } from "framer-motion";
import PillButton from "@/components/PillButton";
import TextReveal from "@/components/TextReveal";

const CARD_BG = "#261312";
const BUTTON_BG = "#D1A78C";

const LuxorPremiumCTA = () => (
  <section className="border-0 py-16 md:py-24">
    <div className="site-container">
      <motion.div
        className="flex flex-col items-start justify-between gap-10 rounded-3xl p-6 text-[#faf7f6] sm:p-10 md:p-16 lg:flex-row lg:items-center lg:p-20"
        style={{ backgroundColor: CARD_BG }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-[500px]">
          <TextReveal
            as="h2"
            className="font-display text-[28px] font-normal uppercase leading-[1.1] tracking-[-1px] md:text-[40px]"
          >
            Оцените ЛЮКСОР
            <br />
            вживую
          </TextReveal>
          <motion.p
            className="mt-6 text-base leading-relaxed text-[#faf7f6]/70 md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Приезжайте на персональную презентацию резиденции: покажем лобби, сценарии планировок и всё,
            за что ЛЮКСОР выбирают семьи, которые привыкли к лучшему.
          </motion.p>
        </div>

        <motion.div
          className="flex w-full max-w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <PillButton
            variant="yellow"
            withArrow
            className="w-full !px-5 !py-3.5 text-xs sm:w-auto sm:!px-10 sm:!py-5 sm:text-sm !border-transparent hover:opacity-90"
            style={{ backgroundColor: BUTTON_BG, color: CARD_BG }}
          >
            Записаться на встречу
          </PillButton>
          <PillButton
            variant="outline"
            className="w-full !px-5 !py-3.5 text-xs sm:w-auto sm:!px-10 sm:!py-5 sm:text-sm border-[#faf7f6]/30 text-[#faf7f6] hover:bg-[#faf7f6]/10"
          >
            Позвонить
          </PillButton>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default LuxorPremiumCTA;
