import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import PillButton from "./PillButton";
import logoSber from "@/assets/logo-sber.png";
import logoVtb from "@/assets/logo-vtb.png";
import logoTbank from "@/assets/logo-tbank.png";

const partners = [
  { name: "Сбер", logo: logoSber, desc: "Ипотека от 5.9%" },
  { name: "ВТБ", logo: logoVtb, desc: "Ипотека от 6.2%" },
  { name: "Т-Банк", logo: logoTbank, desc: "Ипотека от 5.5%" },
];

const PartnersSection = () => (
  <section className="py-16 md:py-24 bg-muted">
    <div className="site-container">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 md:mb-16">
        <div className="max-w-[620px]">
          <SectionHeading title="Партнеры" />
          <motion.p
            className="text-muted-foreground text-sm md:text-base leading-relaxed mt-5 max-w-[520px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            Выбираем партнеров так&nbsp;же тщательно, как создаем дома. Вместе с&nbsp;ведущими банками обеспечиваем лучшие ипотечные условия.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <PillButton variant="outline" withArrow>
            Стать партнером
          </PillButton>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {partners.map((partner, i) => (
          <motion.div
            key={partner.name}
            className="flex flex-col items-center justify-center gap-5 rounded-3xl bg-background p-10 md:p-14"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.1 * i,
            }}
          >
            <img
              src={partner.logo}
              alt={partner.name}
              className="h-[44px] w-auto object-contain"
            />
            <span className="text-sm text-muted-foreground">
              {partner.desc}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PartnersSection;
