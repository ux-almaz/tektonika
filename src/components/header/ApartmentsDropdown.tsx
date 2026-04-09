import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import projectHero from "@/assets/project-hero-1.webp";

const apartmentLinks = [
  { label: "Все квартиры", href: "/catalog", bold: true },
  { label: "Студии от 4,5 млн ₽", href: "/catalog?rooms=studio" },
  { label: "1-комнатные от 5,8 млн ₽", href: "/catalog?rooms=1" },
  { label: "2-комнатные от 7,2 млн ₽", href: "/catalog?rooms=2" },
  { label: "3-комнатные от 9,5 млн ₽", href: "/catalog?rooms=3" },
];

const extraLinks = [
  { label: "С отделкой", href: "/catalog?finish=yes" },
  { label: "Со скидкой", href: "/catalog?discount=yes" },
];

const storageLinks = [
  { label: "Кладовые", href: "/parking?type=storage" },
  { label: "Машино-места", href: "/parking?type=parking" },
];

interface ApartmentsDropdownProps {
  onClose: () => void;
}

const ApartmentsDropdown = ({ onClose }: ApartmentsDropdownProps) => {
  return (
    <div className="bg-background rounded-2xl p-6 flex gap-6 min-w-[680px]">
      {/* Left: links */}
      <div className="flex flex-col gap-1 min-w-[240px]">
        <span className="text-sm text-muted-foreground mb-2 uppercase tracking-wider">
          Квартиры
        </span>
        {apartmentLinks.map((al) => (
          <Link
            key={al.href}
            to={al.href}
            className={`text-base py-1.5 hover:text-primary transition-colors ${al.bold ? "font-medium" : ""}`}
            onClick={onClose}
          >
            {al.label}
          </Link>
        ))}
        <div className="h-px bg-border my-2" />
        {extraLinks.map((el) => (
          <Link
            key={el.href}
            to={el.href}
            className="text-base py-1.5 hover:text-primary transition-colors"
            onClick={onClose}
          >
            {el.label}
          </Link>
        ))}
        <div className="h-px bg-border my-2" />
        <span className="text-sm text-muted-foreground mb-2 mt-2 uppercase tracking-wider">
          Кроме квартир
        </span>
        {storageLinks.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className="text-base py-1.5 hover:text-primary transition-colors"
            onClick={onClose}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Right: promo card */}
      <Link
        to="/catalog"
        className="relative rounded-xl overflow-hidden flex-1 self-stretch group min-w-[300px]"
        onClick={onClose}
      >
        <img
          src={projectHero}
          alt="Квартиры в проектах Тектоника"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-white text-base font-medium leading-tight">
            Квартиры в проектах
            <br />
            Тектоника
          </p>
        </div>
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <ArrowUpRight className="w-4 h-4 text-white" />
        </div>
      </Link>
    </div>
  );
};

export default ApartmentsDropdown;
