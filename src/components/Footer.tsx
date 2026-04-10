import { useState } from "react";
import { Send } from "lucide-react";
import tektonika from "@/assets/tektonika-logo-light.svg";
import ConsultationSheet from "./ConsultationSheet";

const navColumns = [
  {
    title: "Проекты",
    links: [
      "Солнечный берег",
      "Крымская ривьера",
      "Горный квартал",
    ],
  },
  {
    title: "Недвижимость",
    links: [
      "Студии",
      "1-комнатные",
      "2-комнатные",
      "3-комнатные",
      "4-комнатные",
      "Кладовые",
      "Машино-места",
      
      
    ],
  },
  {
    title: "О компании",
    links: [
      "О компании",
      "История",
      "Новости",
      "СМИ о нас",
      "Карьера",
      "Центральный офис",
      "Документы",
    ],
  },
  {
    title: "Как купить",
    links: [
      "Ипотека",
      "Семейная ипотека",
      "ИТ-ипотека",
      "Материнский капитал",
      "Рассрочка",
      
      "Вопросы и ответы",
      "Офисы продаж",
    ],
  },
];

const socialLinks = [
  {
    label: "ВКонтакте",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14C20.67 22 22 20.67 22 15.07V8.93C22 3.33 20.67 2 15.07 2zm3.08 13.5h-1.54c-.58 0-.76-.46-1.8-1.52-.9-.87-1.3-.99-1.52-.99-.31 0-.4.09-.4.52v1.38c0 .37-.12.59-1.1.59-1.62 0-3.42-.98-4.68-2.82C5.44 10.7 5 8.93 5 8.55c0-.22.09-.43.52-.43h1.54c.39 0 .54.18.69.6.76 2.19 2.03 4.11 2.55 4.11.2 0 .29-.09.29-.58V9.9c-.06-1.04-.61-1.13-.61-1.5 0-.18.15-.37.39-.37h2.43c.33 0 .44.18.44.56v3.02c0 .33.15.44.24.44.2 0 .37-.11.74-.48 1.14-1.28 1.96-3.25 1.96-3.25.11-.22.29-.43.68-.43h1.54c.46 0 .56.24.46.56-.19.9-2.06 3.53-2.06 3.53-.16.26-.22.37 0 .66.16.22.68.67 1.03 1.08.64.73 1.13 1.34 1.26 1.76.11.41-.11.62-.52.62z" />
      </svg>
    ),
  },
  {
    label: "Telegram",
    href: "#",
    icon: <Send width="16" height="16" />,
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.75 15.5v-7l6.5 3.5-6.5 3.5z" />
      </svg>
    ),
  },
];


const Footer = () => {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
  <footer id="footer" className="bg-foreground text-background overflow-hidden">
    <div className="site-container">

      {/* Top block: Logo + phone + call button */}
      <div className="py-10 md:py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Logo */}
        <img src={tektonika} alt="Тектоника" className="h-7 w-auto self-start md:self-center" />

        {/* Phone + Button */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
          <a href="tel:+79001234567" className="tracking-tight hover:text-primary transition-colors text-3xl font-light">
            +7 (900) 123-45-67
          </a>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-pill px-7 py-3.5 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors whitespace-nowrap w-full md:w-auto"
            onClick={() => setSheetOpen(true)}
          >
            Заказать звонок
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-background/10" />

      {/* Main footer content */}
      <div className="py-12 md:py-16 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-16">
        {/* Left: disclaimer + social icons */}
        <div className="flex flex-col gap-6">
          <p className="text-background/50 text-xs leading-relaxed">
            Любая информация, представленная на данном сайте, носит исключительно информационный характер и ни при каких условиях не является публичной офертой, определяемой положениями статьи 437 ГК РФ.
          </p>

          <div className="flex items-center gap-2 mt-auto">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center text-background/70 hover:bg-background/20 hover:text-background transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Right: Navigation columns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {navColumns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-medium text-background mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-background/60 hover:text-background transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

    </div>

    <div className="site-container">
      <div style={{ height: "1px", width: "100%", background: "rgba(255,255,255,0.1)" }} />
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: "32px 0", fontSize: "12px", color: "rgba(255,255,255,0.4)", gap: "12px" }}>
        <span>© 2026 Тектоника</span>
        <a href="#" style={{ textDecoration: "underline", color: "inherit" }}>
          Политика конфиденциальности и обработки персональных данных
        </a>
        
      </div>
    </div>

    <ConsultationSheet open={sheetOpen} onOpenChange={setSheetOpen} />
  </footer>
  );
};

export default Footer;
