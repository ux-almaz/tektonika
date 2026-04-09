import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import PillButton from "./PillButton";
import tektonika from "@/assets/tektonika-logo.svg";
import ProjectsDropdown from "./header/ProjectsDropdown";
import ApartmentsDropdown from "./header/ApartmentsDropdown";
import HeaderStories from "./header/HeaderStories";

const MotionLink = motion(Link);

type DropdownKey = "projects" | "apartments";

const navLinks = [
  { label: "Проекты", href: "/projects", dropdown: "projects" as DropdownKey },
  { label: "Квартиры", href: "/catalog", dropdown: "apartments" as DropdownKey },
  { label: "О компании", href: "/about" },
  { label: "Как купить", href: "/purchase" },
  { label: "Медиа", href: "/media" },
  { label: "Контакты", href: "/contacts" },
];

const Header = ({ introDone = false }: { introDone?: boolean }) => {
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleDropdownEnter = (key: DropdownKey) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setActiveDropdown(key);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  const closeDropdown = () => setActiveDropdown(null);

  const renderDropdownContent = (key: DropdownKey) => {
    switch (key) {
      case "projects":
        return <ProjectsDropdown onClose={closeDropdown} />;
      case "apartments":
        return <ApartmentsDropdown onClose={closeDropdown} />;
    }
  };

  return (
    <>
      {/* Dark overlay */}
      <AnimatePresence>
        {activeDropdown && (
          <motion.div
            className="fixed inset-0 top-20 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeDropdown}
          />
        )}
      </AnimatePresence>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/95 backdrop-blur-xl border-b border-border/40"
            : "bg-background/70 backdrop-blur-xl"
        }`}
      >
        <div className="max-w-[2000px] mx-auto flex items-center justify-between px-5 md:px-10 lg:px-16 xl:px-[100px] 2xl:px-[140px] h-20">
          <div className="flex min-w-0 items-center overflow-hidden">
            <Link to="/" className="shrink-0">
              <img src={tektonika} alt="Тектоника" className="h-5 md:h-6" />
            </Link>
            <HeaderStories introDone={introDone} />
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-8 relative z-[60]">
            {navLinks.map((l, i) => {
              const isRoute = l.href.startsWith("/");

              if (l.dropdown) {
                return (
                  <div
                    key={l.label}
                    className="relative"
                    onMouseEnter={() => handleDropdownEnter(l.dropdown!)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <MotionLink
                      to={l.href}
                      className="text-[15px] hover:text-brand-gray transition-colors cursor-pointer select-none"
                      initial={{ opacity: 0, y: -10 }}
                      animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                      transition={{ duration: 0.4, delay: 0.15 + i * 0.06 }}
                      onClick={closeDropdown}
                    >
                      {l.label}
                    </MotionLink>

                    <AnimatePresence>
                      {activeDropdown === l.dropdown && (
                        <>
                          {/* Bridge */}
                          <div className="absolute top-full left-0 w-full h-12" />
                          <motion.div
                            className="absolute top-full left-0 mt-12 z-50"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                          >
                            {renderDropdownContent(l.dropdown!)}
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              const El = isRoute ? MotionLink : motion.a;
              const linkProps = isRoute ? { to: l.href } : { href: l.href };
              return (
                <El
                  key={l.label}
                  {...(linkProps as any)}
                  className="text-[15px] hover:text-brand-gray transition-colors"
                  initial={{ opacity: 0, y: -10 }}
                  animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.06 }}
                >
                  {l.label}
                </El>
              );
            })}
          </nav>

          {/* Phone + CTA */}
          <motion.div
            className="hidden lg:flex items-center gap-4 xl:gap-6"
            initial={{ opacity: 0 }}
            animate={introDone ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <a href="tel:+79001234567" className="flex items-center gap-2 text-sm font-medium whitespace-nowrap">
              <Phone className="h-4 w-4" />
              +7 (900) 123-45-67
            </a>
            <PillButton variant="outline" className="py-3 px-6 text-xs hidden 2xl:inline-flex">
              Заказать звонок
            </PillButton>
          </motion.div>

        </div>
      </header>

      {/* Mobile burger — separate fixed element above header */}
      <button
        className="fixed top-4 right-4 z-[60] lg:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-background border border-border shadow-sm text-foreground"
        onClick={() => setOpen(!open)}
        aria-label="Меню"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-x-0 top-20 bottom-0 z-[55] bg-background overflow-y-auto lg:hidden"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="border-t border-border px-5 py-6 flex flex-col gap-1">
              {navLinks.map((l) =>
                l.href.startsWith("/") ? (
                  <Link key={l.label} to={l.href} className="text-lg py-3 border-b border-border/50 last:border-0" onClick={() => setOpen(false)}>
                    {l.label}
                  </Link>
                ) : (
                  <a key={l.label} href={l.href} className="text-lg py-3 border-b border-border/50 last:border-0" onClick={() => setOpen(false)}>
                    {l.label}
                  </a>
                )
              )}
              <a href="tel:+79001234567" className="flex items-center gap-2 text-sm font-medium mt-6">
                <Phone className="h-4 w-4" />
                +7 (900) 123-45-67
              </a>
              <PillButton variant="outline" className="mt-3 w-full">
                Заказать звонок
              </PillButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
