import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Send, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PillButton from "@/components/PillButton";

type TabKey = "office" | "showroom" | "departments";

const tabs: { key: TabKey; label: string }[] = [
  { key: "office", label: "Офис продаж" },
  { key: "showroom", label: "Шоурум" },
  { key: "departments", label: "Подразделения" },
];

interface Office {
  title: string;
  address: string;
  addressDetail: string;
  phone: string;
  email: string;
  schedule: { day: string; time: string; highlight?: boolean }[];
  mapSrc: string;
}

const officeData: Record<TabKey, Office> = {
  office: {
    title: "Офис Тектоника",
    address: "295000, Симферополь, ул. Примерная, 10",
    addressDetail: "Бизнес-центр «Крым», 2 этаж",
    phone: "+7 (900) 123-45-67",
    email: "info@tektonika.ru",
    schedule: [
      { day: "Сегодня", time: "09:00–19:00", highlight: true },
      { day: "ПН-ЧТ", time: "09:00–19:00" },
      { day: "Пятница", time: "09:00–18:00" },
      { day: "СБ-ВС", time: "Выходной" },
    ],
    mapSrc:
      "https://yandex.ru/map-widget/v1/?um=constructor%3A44.952117%2C34.102417&source=constructor&ll=34.102417%2C44.952117&z=15",
  },
  showroom: {
    title: "Шоурум Тектоника",
    address: "295000, Симферополь, ул. Показательная, 5",
    addressDetail: "1 этаж, вход со двора",
    phone: "+7 (900) 765-43-21",
    email: "showroom@tektonika.ru",
    schedule: [
      { day: "Сегодня", time: "10:00–18:00", highlight: true },
      { day: "ПН-ПТ", time: "10:00–18:00" },
      { day: "Суббота", time: "10:00–16:00" },
      { day: "Воскресенье", time: "Выходной" },
    ],
    mapSrc:
      "https://yandex.ru/map-widget/v1/?um=constructor%3A44.952117%2C34.102417&source=constructor&ll=34.112%2C44.948&z=15",
  },
  departments: {
    title: "Центральный офис",
    address: "295000, Симферополь, ул. Главная, 1",
    addressDetail: "Офис 301, 3 этаж",
    phone: "+7 (900) 111-22-33",
    email: "office@tektonika.ru",
    schedule: [
      { day: "Сегодня", time: "09:00–18:00", highlight: true },
      { day: "ПН-ПТ", time: "09:00–18:00" },
      { day: "СБ-ВС", time: "Выходной" },
    ],
    mapSrc:
      "https://yandex.ru/map-widget/v1/?um=constructor%3A44.952117%2C34.102417&source=constructor&ll=34.095&z=15",
  },
};

const TITLE = "Контакты";

const Contacts = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("office");
  const office = officeData[activeTab];
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [barWidth, setBarWidth] = useState(66);

  useEffect(() => {
    const measure = () => {
      if (!headingRef.current) return;
      const span = document.createElement("span");
      const computed = getComputedStyle(headingRef.current);
      span.style.font = computed.font;
      span.style.letterSpacing = computed.letterSpacing;
      span.style.textTransform = computed.textTransform;
      span.style.visibility = "hidden";
      span.style.position = "absolute";
      span.textContent = TITLE.slice(0, 2);
      document.body.appendChild(span);
      setBarWidth(span.offsetWidth);
      document.body.removeChild(span);
    };
    measure();
    document.fonts.ready.then(measure);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header introDone />

      <main className="pt-20">
        <div className="site-container py-10 md:py-16">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground transition-colors">
              Главная
            </Link>
            <span>/</span>
            <span className="text-foreground">Контакты</span>
          </nav>

          {/* Title */}
          <div className="mb-10">
            <div className="overflow-hidden">
              <motion.h1
                ref={headingRef}
                className="font-display text-[40px] md:text-[56px] font-normal leading-none uppercase tracking-[-1px]"
                initial={{ y: "100%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                {TITLE}
              </motion.h1>
            </div>
            <motion.div
              className="h-[5px] bg-primary mt-2"
              style={{ width: barWidth }}
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            />
          </div>

          {/* Tabs row */}
          <motion.div
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {/* Pill tabs */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`
                    rounded-full px-5 py-2.5 text-sm font-medium transition-all whitespace-nowrap shrink-0
                    ${
                      activeTab === tab.key
                        ? "bg-foreground text-background"
                        : "bg-background border border-border text-muted-foreground hover:text-foreground hover:bg-muted"
                    }
                  `}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Social + Write */}
            <div className="flex items-center gap-3">
              <a
                href="https://t.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
              >
                <Send className="h-4 w-4" />
              </a>
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
              <PillButton variant="yellow" className="px-6 py-3 text-xs">
                Написать нам
              </PillButton>
            </div>
          </motion.div>

          {/* Office card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="flex flex-col lg:flex-row border border-border rounded-3xl overflow-hidden"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Left info panel */}
              <div className="lg:w-[340px] xl:w-[380px] flex-shrink-0 p-8 md:p-10 flex flex-col">
                {/* Title & address */}
                <div>
                  <h2 className="font-display text-xl md:text-2xl font-medium mb-3">
                    {office.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {office.address}
                    <br />
                    {office.addressDetail}
                  </p>
                </div>

                {/* Schedule */}
                <div className="mt-8 border-t border-border">
                  {office.schedule.map((row, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-3 border-b border-border last:border-b-0 text-sm"
                    >
                      <span
                        className={
                          row.highlight
                            ? "text-primary font-medium"
                            : "text-muted-foreground"
                        }
                      >
                        {row.day}
                      </span>
                      <span
                        className={
                          row.highlight
                            ? "text-primary font-medium"
                            : "text-foreground"
                        }
                      >
                        {row.time}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Buttons */}
                <div className="mt-auto pt-8 flex gap-3">
                  <PillButton
                    variant="outline"
                    className="px-6 py-3 text-xs flex-1"
                  >
                    Как проехать?
                  </PillButton>
                  <PillButton
                    variant="yellow"
                    className="px-6 py-3 text-xs flex-1"
                  >
                    Записаться
                  </PillButton>
                </div>
              </div>

              {/* Right map */}
              <div className="flex-1 min-h-[400px] lg:min-h-[520px] bg-muted">
                <iframe
                  src={office.mapSrc}
                  className="w-full h-full border-0"
                  allowFullScreen
                  title="Карта"
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* CTA block */}
          <motion.div
            className="mt-16 md:mt-24 bg-foreground text-background rounded-3xl p-10 md:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <h2 className="font-display text-[28px] md:text-[40px] font-normal leading-[1.1] uppercase tracking-[-0.5px]">
                Есть вопросы
                <br />
                или предложения?
              </h2>
              <p className="mt-4 text-background/60 text-base">
                Напишите нам — мы ответим в ближайшее время
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://t.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full border border-background/30 flex items-center justify-center text-background/60 hover:text-background hover:border-background transition-colors"
              >
                <Send className="h-4 w-4" />
              </a>
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full border border-background/30 flex items-center justify-center text-background/60 hover:text-background hover:border-background transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contacts;
