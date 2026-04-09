import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsCard from "@/components/NewsCard";
import { allPublications } from "@/pages/Publication";

const TITLE = "Медиа";

const projects = ["Все проекты", "ЖК Тектоника", "ЖК Крымский"];

const Media = () => {
  const [selectedProject, setSelectedProject] = useState("Все проекты");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [barWidth, setBarWidth] = useState(66);

  useEffect(() => {
    const measure = () => {
      if (!headingRef.current) return;
      const span = document.createElement("span");
      const computed = getComputedStyle(headingRef.current);
      span.style.font = computed.font;
      span.style.letterSpacing = computed.letterSpacing;
      span.style.textTransform = computed.textTransform;
      span.style.visibility = "hidden";
      span.style.position = "absolute";
      span.textContent = TITLE.slice(0, 2);
      document.body.appendChild(span);
      setBarWidth(span.offsetWidth);
      document.body.removeChild(span);
    };
    measure();
    document.fonts.ready.then(measure);
  }, []);

  const filtered =
    selectedProject === "Все проекты"
      ? allPublications
      : allPublications.filter((n) => n.project === selectedProject);

  return (
    <div className="min-h-screen text-foreground" style={{ backgroundColor: "#F7F7F7" }}>
      <Header introDone />

      <main className="pt-20">
        <div className="site-container py-10 md:py-16">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground transition-colors">Главная</Link>
            <span>/</span>
            <span className="text-foreground">Медиа</span>
          </nav>

          {/* Title */}
          <div className="mb-10">
            <div className="overflow-hidden">
              <motion.h1
                ref={headingRef}
                className="font-display text-[40px] md:text-[56px] font-normal leading-none uppercase tracking-[-1px]"
                initial={{ y: "100%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                {TITLE}
              </motion.h1>
            </div>
            <motion.div
              className="h-[5px] bg-primary mt-2"
              style={{ width: barWidth }}
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            />
          </div>

          {/* Filter row */}
          <motion.div
            className="flex items-center justify-between mb-10"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-medium hover:bg-muted transition-colors"
              >
                {selectedProject}
                <ChevronDown className={`h-4 w-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {dropdownOpen && (
                <div className="absolute top-full left-0 mt-2 bg-background border border-border rounded-2xl shadow-lg py-2 z-20 min-w-[200px]">
                  {projects.map((p) => (
                    <button
                      key={p}
                      onClick={() => { setSelectedProject(p); setDropdownOpen(false); }}
                      className={`w-full text-left px-5 py-2.5 text-sm transition-colors hover:bg-muted ${
                        selectedProject === p ? "text-foreground font-medium" : "text-muted-foreground"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <p className="text-sm text-muted-foreground hidden sm:block">
              Найдено{" "}
              <span className="text-primary font-medium">
                {filtered.length}{" "}
                {filtered.length === 1 ? "публикация" : filtered.length < 5 ? "публикации" : "публикаций"}
              </span>
            </p>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filtered.map((n, i) => (
              <motion.div
                key={n.id}
                className="flex"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.08 * (i % 3) }}
              >
                <NewsCard id={n.id} image={n.image} title={n.title} date={n.date} />
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-20 text-lg">Публикаций не найдено</p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Media;
