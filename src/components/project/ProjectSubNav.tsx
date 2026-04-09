import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import PillButton from "@/components/PillButton";

const sections = [
  { id: "project-about", label: "О локации" },
  { id: "project-advantages", label: "О проекте" },
  { id: "project-genplan", label: "Генплан" },
  { id: "project-location", label: "Благоустройство" },
  { id: "project-plans", label: "Квартиры" },
  { id: "project-finishing", label: "Отделка" },
  { id: "project-assets", label: "Паркинг" },
  { id: "project-construction", label: "Строительство" },
];

const ProjectSubNav = () => {
  const [visible, setVisible] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector("footer");
      const footerTop = footer
        ? footer.getBoundingClientRect().top
        : Infinity;
      const nearFooter = footerTop < window.innerHeight + 100;
      setVisible(window.scrollY > 500 && !nearFooter);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          // Pick the one closest to top
          visibleEntries.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          setActiveId(visibleEntries[0].target.id);
        }
      },
      { rootMargin: "-100px 0px -60% 0px", threshold: 0 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 90;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-6 inset-x-0 z-50 flex justify-center pointer-events-none"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="pointer-events-auto flex items-center gap-1 rounded-full bg-foreground/95 backdrop-blur-md px-2 py-2 shadow-2xl">
            {sections.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={cn(
                  "px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-200 whitespace-nowrap",
                  activeId === id
                    ? "bg-background text-foreground"
                    : "text-background/70 hover:text-background"
                )}
              >
                {label}
              </button>
            ))}
            <PillButton
              className="ml-1 py-2.5 px-6 text-xs"
              onClick={() => scrollTo("project-filter")}
            >
              Все квартиры
            </PillButton>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectSubNav;
