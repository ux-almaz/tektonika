import { motion } from "framer-motion";
import SectionHeading from "../SectionHeading";

const images = [
  { src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&fm=webp", span: "col-span-2 row-span-2" },
  { src: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=600&q=80&fm=webp", span: "col-span-1" },
  { src: "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=600&q=80&fm=webp", span: "col-span-1" },
  { src: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80&fm=webp", span: "col-span-1" },
  { src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80&fm=webp", span: "col-span-1" },
];

const ProjectGallery = () => (
  <section className="py-16 md:py-24 bg-muted border-0">
    <div className="site-container">
    <SectionHeading title="Галерея" />

    <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      {images.map((img, i) => (
        <motion.div
          key={i}
          className={`overflow-hidden ${img.span} min-h-[200px] md:min-h-[280px]`}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.08 * i }}
        >
          <img
            src={img.src}
            alt={`Фото ЖК Тектоника ${i + 1}`}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </motion.div>
      ))}
    </div>
    </div>
  </section>
);

export default ProjectGallery;
