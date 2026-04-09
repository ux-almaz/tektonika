import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Download, Mail, MapPin, Flame } from "lucide-react";
import PillButton from "@/components/PillButton";
import floorplanImg from "@/assets/floorplan-1room.svg";

const fmt = (n: number) => n.toLocaleString("ru-RU");

function calcMonthly(price: number, downPercent: number, rate: number, years: number) {
  const principal = price - price * (downPercent / 100);
  if (principal <= 0) return 0;
  const mr = rate / 100 / 12;
  const n = years * 12;
  if (mr === 0) return Math.round(principal / n);
  return Math.round((principal * mr) / (1 - Math.pow(1 + mr, -n)));
}

const specs = [
  { label: "Тип недвижимости", value: "Квартира" },
  { label: "Комнатность", value: "2 комнаты" },
  { label: "Общая площадь", value: "58 м²" },
  { label: "Жилая площадь", value: "32 м²" },
  { label: "Площадь кухни", value: "14 м²" },
  { label: "Этаж", value: "12 из 18" },
  { label: "Отделка", value: "Без отделки" },
  { label: "Высота потолков", value: "2,7 м" },
  { label: "Санузел", value: "Раздельный" },
  { label: "Балкон/лоджия", value: "Лоджия" },
];

const tabs = ["Планировка", "План этажа", "Генплан", "3D"];

const ApartmentHero = () => {
  const price = 11_300_000;
  const oldPrice = 12_150_000;
  const downPercent = 20;
  const rate = 6;
  const term = 20;

  const downAmount = useMemo(() => Math.round(price * downPercent / 100), [price]);
  const monthly = useMemo(() => calcMonthly(price, downPercent, rate, term), [price]);
  const [activeTab, setActiveTab] = useState(0);
  const [showSpecs, setShowSpecs] = useState(false);

  return (
    <section className="py-8 md:py-12">
      <div className="site-container">
        {/* Breadcrumb */}
        <motion.div
          className="flex items-center gap-2 text-sm text-muted-foreground mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="hover:text-foreground transition-colors">Главная</Link>
          <span>›</span>
          <Link to="/project" className="hover:text-foreground transition-colors">ЖК Тектоника</Link>
          <span>›</span>
          <span className="text-foreground">2-комн., 58 м²</span>
        </motion.div>

        {/* Back link */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Link to="/project" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Назад
          </Link>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Left: Floor plan area */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative bg-background border border-border rounded-3xl flex items-center justify-center min-h-[500px] md:min-h-[640px] px-8 py-12">
              <img
                src={floorplanImg}
                alt="Планировка 2-комнатной квартиры"
                className="max-w-full max-h-[500px] object-contain"
              />
              {/* Discount badge */}
              <span className="absolute top-6 left-6 rounded-pill bg-primary text-primary-foreground px-4 py-2 text-xs font-medium uppercase tracking-wide">
                -7%
              </span>
            </div>

            {/* Tabs */}
            <div className="mt-4 flex gap-1 flex-wrap">
              {tabs.map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  className={`h-12 px-5 rounded-pill text-sm font-medium transition-colors border ${
                    activeTab === i
                      ? "bg-foreground text-background border-foreground"
                      : "border-border text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right: Info sidebar */}
          <motion.div
            className="lg:w-[420px] flex flex-col gap-0"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            {/* Action links */}
            <div className="flex items-center gap-6 mb-6 text-sm text-muted-foreground">
              <button className="inline-flex items-center gap-2 hover:text-foreground transition-colors">
                <Download className="h-4 w-4" />
                Скачать планировку
              </button>
              <button className="inline-flex items-center gap-2 hover:text-foreground transition-colors">
                <Mail className="h-4 w-4" />
                Отправить на e-mail
              </button>
            </div>

            {/* Title */}
            <h1 className="font-display text-3xl md:text-4xl font-medium leading-tight">
              2-комнатная <span className="text-muted-foreground mx-1">·</span> 58&nbsp;м²
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Корпус 1 <span className="mx-1">·</span> 12 этаж из 18
            </p>

            {/* Price */}
            <div className="mt-6">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-3xl md:text-[32px] font-medium">
                  {fmt(price)} ₽
                </span>
                <span className="text-muted-foreground line-through text-base">
                  {fmt(oldPrice)} ₽
                </span>
              </div>
            </div>

            {/* Mortgage summary */}
            <div className="mt-5 flex items-start gap-8">
              <div>
                <p className="text-sm text-muted-foreground">Взнос</p>
                <p className="font-display text-base font-medium mt-0.5">от {fmt(downAmount)} ₽</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">В ипотеку</p>
                <p className="font-display text-base font-medium mt-0.5">от {fmt(monthly)} ₽/мес</p>
              </div>
              <a href="#calculator" className="text-sm text-primary font-medium mt-4 hover:underline">
                Рассчитать
              </a>
            </div>

            {/* Options */}
            <div className="mt-6">
              <p className="font-display text-base font-medium mb-3">Опции</p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-pill border border-primary/30 bg-primary/10 px-4 py-2 text-sm">
                  <Flame className="h-3.5 w-3.5 text-primary" />
                  горячий лот
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-pill border border-border px-4 py-2 text-sm">
                  вид на горы
                </span>
              </div>
            </div>

            {/* Separator */}
            <div className="border-t border-border my-6" />

            {/* CTA buttons */}
            <div className="flex gap-3 w-full min-w-0">
              <PillButton variant="yellow" className="flex-1 min-w-0 py-4 text-xs px-4 whitespace-normal">
                Забронировать
              </PillButton>
              <PillButton variant="outline" className="flex-1 min-w-0 py-4 text-xs px-4 whitespace-normal">
                Помощь менеджера
              </PillButton>
            </div>

            {/* Info table */}
            <div className="mt-6 space-y-0">
              {[
                { label: "Проект", value: "ЖК Тектоника" },
                { label: "Адрес", value: "ул. Примерная, 1" },
                { label: "Класс жилья", value: "Бизнес" },
                { label: "Срок сдачи", value: "4 квартал 2027" },
              ].map((item, i, arr) => (
                <div
                  key={item.label}
                  className={`flex items-center justify-between py-3.5 ${i < arr.length - 1 ? "border-b border-border" : ""}`}
                >
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <span className="font-display text-sm font-medium">{item.value}</span>
                </div>
              ))}
            </div>

            {/* Expandable specs */}
            <button
              onClick={() => setShowSpecs(!showSpecs)}
              className="mt-4 text-sm text-primary font-medium hover:underline text-left"
            >
              {showSpecs ? "Скрыть характеристики" : "Все характеристики"}
            </button>

            {showSpecs && (
              <motion.div
                className="mt-3 space-y-0 border border-border rounded-2xl overflow-hidden"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                {specs.map((s, i) => (
                  <div
                    key={s.label}
                    className={`flex items-center justify-between px-5 py-3 ${i < specs.length - 1 ? "border-b border-border" : ""}`}
                  >
                    <span className="text-sm text-muted-foreground">{s.label}</span>
                    <span className="text-sm font-medium">{s.value}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ApartmentHero;
