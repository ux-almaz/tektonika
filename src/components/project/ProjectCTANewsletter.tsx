import { motion } from "framer-motion";
import { useState } from "react";
import TextReveal from "../TextReveal";
import PillButton from "../PillButton";

const ProjectCTANewsletter = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="py-16 md:py-24 border-0">
      <div className="site-container">
        <motion.div
          className="bg-muted rounded-3xl px-10 py-10 md:px-16 md:py-12 flex flex-col lg:flex-row items-center gap-10 overflow-hidden relative"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Left: text */}
          <div className="shrink-0 max-w-[360px]">
            <TextReveal as="h2" className="font-display text-[24px] md:text-[32px] font-normal leading-[1.1] uppercase tracking-[-0.5px]">
              Получайте новости<br />о ЛЮКСОР первыми
            </TextReveal>
            <motion.p
              className="mt-3 text-muted-foreground text-sm leading-relaxed"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Оставьте контакты, чтобы получать обновления о ходе строительства, новых планировках и специальных предложениях резиденции.
            </motion.p>
          </div>

          {/* Right: form */}
          <motion.form
            onSubmit={handleSubmit}
            className="w-full lg:max-w-[560px] lg:ml-auto flex flex-col gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="ФИО"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 bg-background rounded-pill px-6 py-4 text-sm text-foreground placeholder:text-muted-foreground outline-none border border-transparent focus:border-border transition-colors"
              />
              <input
                type="email"
                placeholder="Электронная почта"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-background rounded-pill px-6 py-4 text-sm text-foreground placeholder:text-muted-foreground outline-none border border-transparent focus:border-border transition-colors"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <PillButton variant="yellow" type="submit" className="shrink-0">
                Получать обновления
              </PillButton>
              <label className="flex items-start gap-3 cursor-pointer group">
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={agreed}
                  onClick={() => setAgreed(!agreed)}
                  className={`mt-0.5 shrink-0 w-4 h-4 rounded border transition-colors ${agreed ? "bg-primary border-primary" : "border-border bg-background"}`}
                >
                  {agreed && (
                    <svg viewBox="0 0 16 16" fill="none" className="w-full h-full p-0.5">
                      <path d="M3 8l3.5 3.5L13 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
                <span className="text-xs text-muted-foreground leading-relaxed">
                  Соглашаюсь с{" "}
                  <span className="text-primary underline underline-offset-2 cursor-pointer">условиями обработки личных данных</span>,{" "}
                  <span className="text-primary underline underline-offset-2 cursor-pointer">политикой передачи данных третьим лицам</span>,{" "}
                  с получением новостей, акций и рекламных материалов
                </span>
              </label>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectCTANewsletter;
