import { useState } from "react";
import { Link } from "react-router-dom";
import { Send } from "lucide-react";
import tektonika from "@/assets/tektonika-logo-light.svg";
import ConsultationSheet from "./ConsultationSheet";
import { cn } from "@/lib/utils";

type FooterLink = { label: string; href: string };

const navColumns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Проекты",
    links: [
      { label: "Резиденция ЛЮКСОР", href: "/project-luxor-premium" },
      { label: "Родная гавань", href: "/project-coast" },
      { label: "Фантастик", href: "/project" },
      { label: "Все проекты", href: "/projects" },
    ],
  },
  {
    title: "Недвижимость",
    links: [
      { label: "Студии", href: "/catalog?rooms=studio" },
      { label: "1-комнатные", href: "/catalog?rooms=1" },
      { label: "2-комнатные", href: "/catalog?rooms=2" },
      { label: "3-комнатные", href: "/catalog?rooms=3" },
      { label: "4-комнатные", href: "/catalog?rooms=4" },
      { label: "Кладовые", href: "/parking?type=storage" },
      { label: "Машино-места", href: "/parking?type=parking" },
    ],
  },
  {
    title: "О компании",
    links: [
      { label: "О компании", href: "/about" },
      { label: "История", href: "/about" },
      { label: "Новости", href: "/media" },
      { label: "СМИ о нас", href: "/media" },
      { label: "Карьера", href: "/contacts" },
      { label: "Центральный офис", href: "/contacts" },
      { label: "Документы", href: "/about" },
    ],
  },
  {
    title: "Как купить",
    links: [
      { label: "Ипотека", href: "/purchase" },
      { label: "Семейная ипотека", href: "/purchase" },
      { label: "ИТ-ипотека", href: "/purchase" },
      { label: "Материнский капитал", href: "/purchase" },
      { label: "Рассрочка", href: "/purchase" },
      { label: "Вопросы и ответы", href: "/purchase" },
      { label: "Офисы продаж", href: "/contacts" },
    ],
  },
];

const socialLinks = [
  {
    label: "ВКонтакте",
    href: "https://vk.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14C20.67 22 22 20.67 22 15.07V8.93C22 3.33 20.67 2 15.07 2zm3.08 13.5h-1.54c-.58 0-.76-.46-1.8-1.52-.9-.87-1.3-.99-1.52-.99-.31 0-.4.09-.4.52v1.38c0 .37-.12.59-1.1.59-1.62 0-3.42-.98-4.68-2.82C5.44 10.7 5 8.93 5 8.55c0-.22.09-.43.52-.43h1.54c.39 0 .54.18.69.6.76 2.19 2.03 4.11 2.55 4.11.2 0 .29-.09.29-.58V9.9c-.06-1.04-.61-1.13-.61-1.5 0-.18.15-.37.39-.37h2.43c.33 0 .44.18.44.56v3.02c0 .33.15.44.24.44.2 0 .37-.11.74-.48 1.14-1.28 1.96-3.25 1.96-3.25.11-.22.29-.43.68-.43h1.54c.46 0 .56.24.46.56-.19.9-2.06 3.53-2.06 3.53-.16.26-.22.37 0 .66.16.22.68.67 1.03 1.08.64.73 1.13 1.34 1.26 1.76.11.41-.11.62-.52.62z" />
      </svg>
    ),
  },
  {
    label: "Telegram",
    href: "https://t.me",
    icon: <Send width="16" height="16" aria-hidden />,
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.75 15.5v-7l6.5 3.5-6.5 3.5z" />
      </svg>
    ),
  },
];

const linkClass = "text-sm text-background/60 transition-colors hover:text-background";

const Footer = () => {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <footer id="footer" className="overflow-hidden bg-foreground text-background">
      <div className="site-container">
        <div className="flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between md:py-12">
          <Link to="/" className="self-start md:self-center" aria-label="На главную">
            <img src={tektonika} alt="Тектоника" className="h-7 w-auto" />
          </Link>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
            <a
              href="tel:+79001234567"
              className="text-3xl font-light tracking-tight transition-colors hover:text-primary"
            >
              +7 (900) 123-45-67
            </a>
            <button
              type="button"
              className="btn-yellow btn-interactive inline-flex w-full items-center justify-center whitespace-nowrap rounded-pill px-7 py-3.5 text-sm font-medium md:w-auto"
              onClick={() => setSheetOpen(true)}
            >
              Заказать звонок
            </button>
          </div>
        </div>

        <div className="h-px w-full bg-background/10" />

        <div className="grid grid-cols-1 gap-12 py-12 md:py-16 lg:grid-cols-[minmax(0,280px)_1fr] lg:gap-16">
          <div className="flex flex-col gap-6">
            <p className="text-xs leading-relaxed text-background/50">
              Любая информация, представленная на данном сайте, носит исключительно информационный
              характер и ни при каких условиях не является публичной офертой, определяемой
              положениями статьи 437 ГК РФ.
            </p>

            <div className="mt-auto flex items-center gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-background/10 text-background/70 transition-colors hover:bg-background/20 hover:text-background"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 sm:gap-8">
            {navColumns.map((col) => (
              <div key={col.title}>
                <h4 className="mb-4 text-sm font-medium text-background">{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={`${col.title}-${link.label}`}>
                      {link.href.startsWith("http") ? (
                        <a href={link.href} className={linkClass}>
                          {link.label}
                        </a>
                      ) : (
                        <Link to={link.href} className={linkClass}>
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-background/10">
        <div className="site-container flex flex-col gap-3 py-8 text-xs text-background/40 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Тектоника</span>
          <Link
            to="/proposal"
            className={cn(linkClass, "text-xs underline underline-offset-2 sm:text-right")}
          >
            Политика конфиденциальности и обработки персональных данных
          </Link>
        </div>
      </div>

      <ConsultationSheet open={sheetOpen} onOpenChange={setSheetOpen} />
    </footer>
  );
};

export default Footer;
