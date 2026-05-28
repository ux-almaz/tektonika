import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ScrollReveal from "@/components/ScrollReveal";

interface AccordionPanel {
  number: string;
  title: string;
  description: string;
  image: string;
}

interface PremiumAccordionProps {
  title: string;
  subtitle: string;
  panels: AccordionPanel[];
}

const PremiumAccordion = ({ title, subtitle, panels }: PremiumAccordionProps) => {
  const [activeValue, setActiveValue] = useState<string>(`panel-0`);
  const activePanel = panels[parseInt(activeValue.replace("panel-", ""), 10)];

  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: "#0a0a0a" }}>
      <div className="site-container">
        <ScrollReveal>
          <p
            className="mb-2 text-xs uppercase tracking-[0.25em]"
            style={{ color: "hsl(var(--luxor-burgundy-light))" }}
          >
            {subtitle}
          </p>
          <h2 className="text-3xl uppercase tracking-[0.08em] text-white md:text-5xl">
            {title}
          </h2>
        </ScrollReveal>

        <div className="mt-14 grid gap-8 md:grid-cols-12 md:gap-12">
          <div className="relative min-h-[420px] overflow-hidden rounded-2xl md:col-span-7">
            <AnimatePresence mode="wait">
              <motion.img
                key={activePanel.image}
                src={activePanel.image}
                alt={activePanel.title}
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>

          <div className="md:col-span-5 md:pl-4">
            <Accordion
              type="single"
              collapsible
              value={activeValue}
              onValueChange={(val) => val && setActiveValue(val)}
            >
              {panels.map((panel, idx) => (
                <AccordionItem
                  key={panel.number}
                  value={`panel-${idx}`}
                  style={{ borderColor: "hsla(var(--luxor-burgundy), 0.3)" }}
                  className="border-b py-3"
                >
                  <AccordionTrigger
                    className="group flex w-full items-center justify-between text-left hover:no-underline"
                    style={{
                      color: activeValue === `panel-${idx}` ? "hsl(var(--luxor-burgundy-light))" : "#ccc",
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className="mt-0.5 text-xs font-medium tracking-[0.2em]"
                        style={{ color: "hsl(var(--luxor-burgundy-light))" }}
                      >
                        {panel.number}
                      </span>
                      <div>
                        <span className="text-base font-medium md:text-lg">{panel.title}</span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-sm leading-relaxed text-white/55 md:text-base">
                    {panel.description}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumAccordion;
