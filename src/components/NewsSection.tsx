import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import NewsCard from "./NewsCard";
import { ArrowUpRight } from "lucide-react";

const news = [
  {
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80&fm=webp",
    title: "Выдача ключей нового корпуса ЖК Тектоника",
    date: "24.02.2025",
  },
  {
    image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600&q=80&fm=webp",
    title: "Планировки нового формата multispace: удобно работать и жить",
    date: "24.02.2025",
  },
  {
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80&fm=webp",
    title: "Старт продаж ЖК Тектоника",
    date: "24.02.2025",
  },
];

const NewsSection = () => (
  <section id="news" className="py-16 md:py-24 bg-muted">
    <div className="site-container">
    <SectionHeading
      title="Медиа"
      rightElement={
        <a href="/media" className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wide hover:text-muted-foreground transition-colors">
          Все публикации
          <ArrowUpRight className="h-4 w-4" />
        </a>
      }
    />
    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
      {news.map((n, i) => (
        <motion.div
          key={n.title}
          className="flex"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.12 * i,
          }}
        >
          <NewsCard {...n} />
        </motion.div>
      ))}
    </div>
    
    </div>
  </section>
);

export default NewsSection;
