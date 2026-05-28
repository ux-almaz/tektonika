import { useState, useEffect } from "react";
import { useLenis } from "lenis/react";
import { Link } from "react-router-dom";
import { getScrollY, useLenisScrollListener } from "@/hooks/useLenisScrollListener";
import { cn } from "@/lib/utils";

const ACCENT = "#4D2626";

export interface ProjectLuxorPremiumSubNavProps {
  /** false, когда основной хедер уехал вверх при скролле вниз */
  headerRevealed?: boolean;
  /** Сумма высот фиксированных полос над контентом (хедер + эта полоска или только полоска) */
  stickyScrollOffset: number;
}

const navItems = [
  { id: "project-about", label: "О локации" },
  { id: "project-advantages", label: "О проекте" },
  { id: "project-genplan", label: "Генплан" },
  { id: "project-location", label: "Благоустройство" },
  { id: "project-plans", label: "Квартиры" },
] as const;

const ProjectLuxorPremiumSubNav = ({
  headerRevealed = true,
  stickyScrollOffset,
}: ProjectLuxorPremiumSubNavProps) => {
  const [activeId, setActiveId] = useState<string | null>(navItems[0].id);
  const [atPageTop, setAtPageTop] = useState(true);
  const lenis = useLenis();

  useLenisScrollListener((y) => setAtPageTop(y < 12), []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: `-${stickyScrollOffset}px 0px -58% 0px`, threshold: 0 }
    );

    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [stickyScrollOffset]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + getScrollY(lenis) - stickyScrollOffset;
    if (lenis) {
      lenis.scrollTo(top);
    } else {
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <nav
      aria-label="Разделы проекта Люксор"
      className={cn(
        "fixed left-0 right-0 z-40 border-b border-neutral-200/90 bg-white transition-[top,border-color] duration-300 ease-out",
        headerRevealed ? "top-20" : "top-0",
        atPageTop && headerRevealed && "border-t border-neutral-200/90",
      )}
    >
      <div className="max-w-[2000px] mx-auto flex min-h-[64px] items-center gap-2 sm:gap-3 px-4 py-1.5 md:px-10 lg:px-16 xl:px-[100px] 2xl:px-[140px]">
        <Link to="/" className="shrink-0 flex items-center" aria-label="На главную">
          <img src="/logo.png" alt="" className="h-7 w-auto max-h-8 object-contain md:h-8" />
        </Link>

        <div className="flex-1 min-w-0 flex justify-center overflow-x-auto scrollbar-hide">
          <ul className="flex items-center gap-2 md:gap-2.5 px-1">
            {navItems.map(({ id, label }) => {
              const active = activeId === id;
              return (
                <li key={id} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => scrollTo(id)}
                    className={cn(
                      "rounded-full px-5 py-2.5 text-sm font-medium tracking-tight transition-[color,background-color,box-shadow] md:px-6 md:py-3",
                      active
                        ? "font-semibold text-[#4D2626] shadow-[inset_0_0_0_1px_rgba(77,38,38,0.22)]"
                        : "text-neutral-600 hover:bg-neutral-100 hover:text-foreground"
                    )}
                    style={active ? { backgroundColor: "rgba(77, 38, 38, 0.08)" } : undefined}
                  >
                    {label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="shrink-0 flex items-center">
          <button
            type="button"
            onClick={() => scrollTo("project-plans")}
            className="rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 md:px-6 md:py-3"
            style={{ backgroundColor: ACCENT }}
          >
            Все квартиры
          </button>
        </div>
      </div>
    </nav>
  );
};

export default ProjectLuxorPremiumSubNav;
