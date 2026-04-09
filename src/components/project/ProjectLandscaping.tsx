import { motion } from "framer-motion";
import SectionHeading from "../SectionHeading";
import ScrollReveal from "../ScrollReveal";
import landscapingImg from "@/assets/advantage-landscaping.jpg";
import courtyardImg from "@/assets/about-courtyard.jpg";
import ecologyImg from "@/assets/advantage-ecology.jpg";
import natureImg from "@/assets/value-nature.jpg";
import infrastructureImg from "@/assets/advantage-infrastructure.jpg";

const photos = [
  { src: landscapingImg, label: "Ландшафтный дизайн", span: "col-span-2 row-span-2" },
  { src: courtyardImg, label: "Закрытый двор", span: "col-span-1 row-span-1" },
  { src: ecologyImg, label: "Зелёные зоны", span: "col-span-1 row-span-1" },
  { src: natureImg, label: "Природное окружение", span: "col-span-1 row-span-1" },
  { src: infrastructureImg, label: "Детские площадки", span: "col-span-1 row-span-1" },
];

const ProjectLandscaping = () => (
  <section id="project-landscaping" className="pt-16 md:pt-24 pb-10 md:pb-14 bg-muted">
    <div className="site-container">
      <SectionHeading title="Благоустройство" />
      <div className="mt-10 md:mt-14 grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-3 md:gap-4" style={{ height: "clamp(400px, 60vw, 700px)" }}>
        {photos.map((photo, i) => (
          <ScrollReveal key={photo.label} delay={i * 0.07} className={photo.span}>
            <motion.div
              className="relative w-full h-full rounded-3xl overflow-hidden group"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src={photo.src}
                alt={photo.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-5 text-white text-sm font-medium leading-snug">
                {photo.label}
              </span>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default ProjectLandscaping;
