import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import projectHero from "@/assets/project-hero-1.webp";

const projects = [
  {
    name: "Тектоника Парк",
    price: "от 5,8 млн ₽",
    location: "10 мин. пешком",
    image: projectHero,
    href: "/project",
  },
  {
    name: "Тектоника Сити",
    price: "от 7,2 млн ₽",
    location: "5 мин. пешком",
    image: projectHero,
    href: "/project",
  },
  {
    name: "Тектоника Лайф",
    price: "от 9,1 млн ₽",
    location: "8 мин. пешком",
    image: projectHero,
    href: "/project",
  },
];

interface ProjectsDropdownProps {
  onClose: () => void;
}

const ProjectsDropdown = ({ onClose }: ProjectsDropdownProps) => {
  return (
    <div className="bg-background rounded-2xl p-6 flex gap-6 min-w-[780px]">
      {/* Left: project list */}
      <div className="flex flex-col gap-4 min-w-[340px]">
        <span className="text-sm text-muted-foreground uppercase tracking-wider">
          Проекты
        </span>
        {projects.map((project) => (
          <Link
            key={project.name}
            to={project.href}
            className="flex items-center gap-4 group py-1 hover:bg-muted/50 rounded-lg transition-colors -mx-2 px-2"
            onClick={onClose}
          >
            <img
              src={project.image}
              alt={project.name}
              className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex flex-col">
              <span className="text-base font-medium group-hover:text-primary transition-colors">
                {project.name}
              </span>
              <span className="text-base text-muted-foreground">
                {project.price}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Right: promo card */}
      <Link
        to="/project"
        className="relative rounded-xl overflow-hidden flex-1 self-stretch group min-w-[300px]"
        onClick={onClose}
      >
        <img
          src={projectHero}
          alt="Все проекты Тектоника"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute top-4 left-4 right-4">
          <p className="text-white text-xl font-medium leading-tight">
            Все проекты
          </p>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-white/80 text-base leading-tight">
            Подберите удобную
            <br />
            для вас локацию
          </p>
        </div>
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <ArrowUpRight className="w-4 h-4 text-white" />
        </div>
      </Link>
    </div>
  );
};

export default ProjectsDropdown;
