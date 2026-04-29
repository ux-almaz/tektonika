import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import project1 from "@/assets/project1.webp";
import project2 from "@/assets/project2.jpg";
import project3 from "@/assets/project3.jpg";
import project4 from "@/assets/project4.jpg";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import ProjectsFilter from "@/components/ProjectsFilter";
import TextReveal from "@/components/TextReveal";
import ScrollReveal from "@/components/ScrollReveal";
import PillButton from "@/components/PillButton";

const projects = [
  {
    image: project1,
    images: [
      project1,
      "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&q=80&fm=webp",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80&fm=webp",
    ],
    badge: "Ключи выданы",
    badgeVariant: "yellow" as const,
    name: "Тектоника",
    address: "Бизнес-класс в районе набережной",
    price: "от 11,3 млн ₽",
    priceLabel: "Стоимость квартир",
    featured: true,
    tags: ["Скидки до 15%", "Ключи 2026", "Бизнес-класс", "Вид на море"],
  },
  {
    image: project2,
    images: [
      project2,
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&fm=webp",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80&fm=webp",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80&fm=webp",
    ],
    badge: "Скоро",
    badgeVariant: "white" as const,
    tags: ["Комфорт", "II кв. 2027"],
    name: "Тектоника Парк",
    address: "Комфорт-класс рядом с парком",
    price: "от 8,5 млн ₽",
    priceLabel: "Стоимость квартир",
  },
  {
    image: project3,
    images: [
      project3,
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80&fm=webp",
      "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&q=80&fm=webp",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80&fm=webp",
    ],
    badge: "Строится",
    badgeVariant: "white" as const,
    tags: ["Премиум", "III кв. 2026"],
    name: "Тектоника Сити",
    address: "Премиум-класс в центре города",
    price: "от 15,2 млн ₽",
    priceLabel: "Стоимость квартир",
  },
  {
    image: project4,
    images: [
      project4,
      "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=800&q=80&fm=webp",
      "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&q=80&fm=webp",
    ],
    badge: "Скоро",
    badgeVariant: "white" as const,
    tags: ["Стандарт", "I кв. 2027"],
    name: "Тектоника Лайт",
    address: "Доступные квартиры у моря",
    price: "от 6,9 млн ₽",
    priceLabel: "Стоимость квартир",
  },
];

const mapProjects = projects.map((p) => ({
  image: p.image,
  name: p.name,
  price: p.price,
  monthly: `от ${Math.round(parseInt(p.price.replace(/[^\d]/g, "")) * 0.0029).toLocaleString("ru-RU")} ₽/мес`,
  badge: p.badge,
}));

const Projects = () => {
  const [view, setView] = useState<"params" | "map">("params");
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <div className="min-h-screen bg-background">
      <Header introDone />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 md:py-24 border-0">
          <div className="site-container">
            <SectionHeading
              title="Наши проекты"
              rightElement={<ProjectsFilter.ViewToggle view={view} onViewChange={setView} />}
            />

            <ProjectsFilter hideViewToggle />

            {view === "params" ? (
              <div className="mt-8 flex flex-col gap-6">
                {/* Featured project */}
                {featured && (
                  <motion.div
                    className="flex flex-col md:flex-row gap-0 rounded-3xl overflow-hidden border border-border"
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      to="/project"
                      className="relative flex-[2] min-h-[420px] md:min-h-[500px] bg-cover bg-center group"
                      style={{ backgroundImage: `url(${featured.image})` }}
                    >
                      <div className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/40 transition-colors" />
                      <div className="relative z-10 flex flex-col justify-end h-full p-8 md:p-12">
                        <span className="self-start rounded-pill px-4 py-2 text-xs uppercase tracking-wider bg-primary text-primary-foreground mb-4">
                          {featured.badge}
                        </span>
                        <h3 className="font-display text-4xl md:text-5xl font-medium text-background uppercase leading-none">
                          {featured.name}
                        </h3>
                        <p className="text-background/80 text-sm mt-3">{featured.address}</p>
                        <p className="text-background font-display text-lg font-medium mt-3">
                          {featured.price}
                        </p>
                      </div>
                    </Link>

                    <div className="flex-1 bg-foreground text-background flex flex-col justify-between p-8 md:p-10 min-h-[420px] md:min-h-[500px]">
                      <div>
                        <TextReveal
                          as="h3"
                          className="font-display text-[32px] md:text-[38px] font-normal leading-[1.1]"
                        >
                          Уникальные форматы квартир {featured.price}
                        </TextReveal>
                        <div className="flex flex-wrap gap-2 mt-8">
                          {featured.tags?.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-pill border border-background/30 px-4 py-2 text-sm text-background/80"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <Link to="/project">
                        <button className="w-full rounded-pill bg-primary text-primary-foreground min-h-[50px] px-[30px] py-[15px] text-sm font-medium uppercase tracking-[0.35px] hover:bg-primary/90 transition-colors mt-8">
                          Перейти к проекту
                        </button>
                      </Link>
                    </div>
                  </motion.div>
                )}

                {/* Project cards grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map((project, i) => (
                    <motion.div
                      key={project.name}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{
                        duration: 0.7,
                        ease: [0.22, 1, 0.36, 1],
                        delay: 0.15 * i,
                      }}
                    >
                      <ProjectCard {...project} />
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              /* Map view with sidebar */
              <motion.div
                className="mt-8 flex gap-0 rounded-3xl overflow-hidden border border-border h-[680px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Left sidebar — project list */}
                <div className="w-[340px] flex-shrink-0 hidden md:flex flex-col bg-background border-r border-border">
                  <div className="overflow-y-auto flex-1">
                    {mapProjects.map((project, i) => (
                      <Link
                        key={i}
                        to="/project"
                        className="flex gap-4 p-4 border-b border-border hover:bg-muted/50 transition-colors group"
                      >
                        <div className="relative w-[80px] h-[80px] rounded-xl overflow-hidden flex-shrink-0">
                          <img
                            src={project.image}
                            alt={project.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          {project.badge && (
                            <span className="absolute top-1 left-1 bg-primary text-primary-foreground text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-md font-medium">
                              %
                            </span>
                          )}
                        </div>
                        <div className="flex flex-col justify-center min-w-0">
                          <h4 className="font-display text-sm font-medium uppercase leading-tight truncate">
                            {project.name}
                          </h4>
                          <p className="text-primary text-sm font-medium mt-1">
                            {project.price}
                          </p>
                          <p className="text-muted-foreground text-xs mt-0.5">
                            {project.monthly}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="p-4 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      Найдено <span className="text-foreground font-medium">{mapProjects.length} проекта</span>
                    </p>
                  </div>
                </div>

                {/* Right — map */}
                <div className="flex-1">
                  <iframe
                    src="https://yandex.ru/map-widget/v1/?ll=34.1008,44.9521&z=12&pt=34.1008,44.9521,pm2rdm"
                    className="w-full h-full border-0"
                    allowFullScreen
                    title="Проекты на карте"
                  />
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="pb-16 md:pb-24 border-0">
          <div className="site-container">
            <ScrollReveal>
              <div className="bg-foreground text-background rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                <div className="max-w-[600px]">
                  <h3 className="font-display text-3xl md:text-4xl font-medium leading-[1.1]">
                    Хотите узнать больше о наших проектах?
                  </h3>
                  <p className="text-background/60 mt-4 text-base leading-relaxed">
                    Оставьте заявку и наш менеджер свяжется с вами для бесплатной консультации
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                  <Link to="/catalog">
                    <PillButton variant="yellow" className="w-full sm:w-auto whitespace-nowrap">
                      Выбрать квартиру
                    </PillButton>
                  </Link>
                  <PillButton variant="outline" className="w-full sm:w-auto whitespace-nowrap border-background/30 text-background hover:bg-background/10">
                    Получить консультацию
                  </PillButton>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
