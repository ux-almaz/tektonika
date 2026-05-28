import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { Slider } from "@/components/ui/slider";
import ScrollReveal from "./ScrollReveal";

const programs = [
  { name: "Стандартная ипотека", rate: 18 },
  { name: "Семейная ипотека", rate: 6 },
  { name: "Военная ипотека", rate: 6.75 },
  { name: "Ипотека с господдержкой", rate: 8 },
];

const extraCards = [
  {
    title: "Материнский капитал",
    desc: "Можно использовать как первоначальный взнос или для погашения ипотеки",
  },
  {
    title: "Жилищные сертификаты",
    desc: "Один из выгодных и популярных способов покупки жилья",
  },
];

function calcMonthly(price: number, downPercent: number, rate: number, years: number) {
  const principal = price - price * (downPercent / 100);
  if (principal <= 0) return 0;
  const mr = rate / 100 / 12;
  const n = years * 12;
  if (mr === 0) return Math.round(principal / n);
  return Math.round((principal * mr) / (1 - Math.pow(1 + mr, -n)));
}

const fmt = (n: number) => n.toLocaleString("ru-RU");

const MortgageCalculator = () => {
  const [price, setPrice] = useState(11_300_000);
  const [down, setDown] = useState(20);
  const [term, setTerm] = useState(20);
  const [selectedProgram, setSelectedProgram] = useState(programs[1]);

  const downAmount = useMemo(() => Math.round(price * down / 100), [price, down]);
  const creditAmount = useMemo(() => price - downAmount, [price, downAmount]);
  const monthly = useMemo(
    () => calcMonthly(price, down, selectedProgram.rate, term),
    [price, down, selectedProgram.rate, term]
  );

  return (
    <section id="calculator" className="py-16 md:py-24 bg-muted">
      <div className="site-container">
        <SectionHeading title="Способы покупки" />

        {/* Main four-card block */}
        <div className="mt-6 flex flex-col gap-3 lg:gap-4">
        <ScrollReveal>
          <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 items-stretch">

            {/* ─── Ипотека card ─── */}
            <div className="flex-[3] bg-card rounded-3xl overflow-hidden flex flex-col min-w-0">

              {/* Card header */}
              <div className="flex items-center justify-between px-8 pt-7 pb-6 gap-4 bg-muted/25 border-b border-foreground/[0.06]">
                <h3 className="font-display text-2xl md:text-[28px] font-medium shrink-0">Ипотека</h3>
                <p className="text-muted-foreground text-sm text-right hidden md:block">
                  Подберём выгодную программу среди&nbsp;ведущих банков России
                </p>
              </div>

              {/* Card body — 3 columns */}
              <div className="flex flex-col md:flex-row flex-1">

                {/* Col 1 — Programs */}
                <div className="p-6 md:w-[260px] md:shrink-0 flex flex-col justify-between gap-6 bg-muted/10 border-b border-foreground/[0.06] md:border-b-0 md:bg-muted/15 md:border-r">
                  <div>
                    <p className="text-xs text-muted-foreground mb-4 uppercase tracking-wide">Программы</p>
                    <div className="flex flex-col gap-1">
                      {programs.map((p) => (
                        <button
                          key={p.name}
                          onClick={() => setSelectedProgram(p)}
                          className={`text-left px-3 py-2.5 rounded-2xl text-sm transition-colors ${
                            selectedProgram.name === p.name
                              ? "bg-muted font-medium text-foreground"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                          }`}
                        >
                          {p.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  <Link to="/purchase">
                    <button className="w-full rounded-pill bg-muted px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted/80 text-left flex items-center justify-between group">
                      Подробнее
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-muted-foreground group-hover:text-foreground transition-colors">
                        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </Link>
                </div>

                {/* Col 2+3 wrapper — no divider between them */}
                <div className="flex-1 flex flex-col md:flex-row min-w-0">
                <div className="flex-1 p-6 flex flex-col gap-7 min-w-0">
                  {/* Price */}
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Стоимость жилья</p>
                    <div className="flex items-center justify-between bg-background rounded-pill px-5 py-3">
                      <span className="font-medium text-sm">{fmt(price)}</span>
                      <span className="text-muted-foreground text-sm">₽</span>
                    </div>
                    <div className="px-5">
                      <Slider min={3_000_000} max={50_000_000} step={100_000} value={[price]} onValueChange={([v]) => setPrice(v)} />
                    </div>
                  </div>

                  {/* Down payment */}
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Первоначальный взнос</p>
                    <div className="flex items-center justify-between bg-background rounded-pill px-5 py-3">
                      <span className="font-medium text-sm">{fmt(downAmount)}</span>
                      <span className="text-muted-foreground text-sm">{down}%</span>
                    </div>
                    <div className="px-5">
                      <Slider min={10} max={90} step={1} value={[down]} onValueChange={([v]) => setDown(v)} />
                    </div>
                  </div>

                  {/* Term */}
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Срок</p>
                    <div className="flex items-center justify-between bg-background rounded-pill px-5 py-3">
                      <span className="font-medium text-sm">{term}</span>
                      <span className="text-muted-foreground text-sm">лет</span>
                    </div>
                    <div className="px-5">
                      <Slider min={1} max={30} step={1} value={[term]} onValueChange={([v]) => setTerm(v)} />
                    </div>
                  </div>
                </div>

                {/* Col 3 — Results */}
                <div className="p-6 flex-1 flex flex-col justify-between gap-6">
                  <div className="flex flex-col gap-5">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Ежемесячный платёж от</p>
                      <p className="font-display text-2xl font-medium text-primary leading-none">
                        {fmt(monthly)} ₽
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Ставка от</p>
                      <p className="font-display text-2xl font-medium text-primary leading-none">
                        {selectedProgram.rate} %
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Сумма кредита</p>
                      <p className="font-display text-2xl font-medium text-primary leading-none">
                        {fmt(creditAmount)} ₽
                      </p>
                    </div>
                  </div>

                  <Link to="/purchase">
                    <button className="w-full rounded-pill bg-primary text-primary-foreground px-4 py-3 text-sm font-medium hover:bg-primary/90 transition-colors flex items-center justify-between gap-2">
                      Показать предложения банков
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </Link>
                </div>
                </div>{/* end Col 2+3 wrapper */}

              </div>{/* end body */}
            </div>{/* end Ипотека card */}

            {/* ─── Рассрочка card ─── */}
            <Link to="/purchase" className="lg:w-[360px] lg:shrink-0 bg-foreground text-background rounded-3xl p-8 flex flex-col justify-between gap-8 min-h-[320px] hover:opacity-90 transition-opacity">
              <div className="flex items-start justify-between">
                <h3 className="font-display text-2xl md:text-[28px] font-medium leading-tight">Рассрочка</h3>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-background shrink-0 mt-1">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <div className="pt-5 mb-6">
                  <p className="text-background/70 text-sm leading-relaxed">
                    Рассрочка — отличное решение для тех, кому не подходит ипотека, а для полной оплаты возможности нет. Без переплат и процентов.
                  </p>
                </div>
                <button className="rounded-pill bg-background/10 px-6 py-3 text-sm font-medium text-background hover:bg-background/20 transition-colors">
                  Подробнее
                </button>
              </div>
            </Link>

          </div>
        </ScrollReveal>

        {/* Extra cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
          {extraCards.map((c) => (
            <ScrollReveal key={c.title} className="flex">
              <div className="bg-card p-6 md:p-8 flex flex-col justify-between flex-1 rounded-3xl">
                <div>
                  <h4 className="font-display text-2xl md:text-[28px] font-medium leading-tight">{c.title}</h4>
                  <p className="text-muted-foreground mt-3 text-base leading-relaxed">{c.desc}</p>
                </div>
                <div className="mt-8">
                  <Link to="/purchase">
                    <button className="rounded-pill bg-muted min-h-[50px] px-[30px] py-[15px] text-sm font-medium uppercase tracking-[0.35px] hover:bg-muted/80 transition-colors">
                      Подробнее
                    </button>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
        </div>

        {/* CTA block */}
        <ScrollReveal>
          <div className="mt-3 lg:mt-4 bg-card rounded-3xl overflow-hidden flex flex-col lg:flex-row lg:items-stretch">
            <div className="flex-1 p-6 md:p-8">
              <h3 className="font-display text-2xl md:text-[28px] font-medium leading-tight">
                Запишитесь на&nbsp;экскурсию
              </h3>
              <p className="text-muted-foreground mt-3 text-base leading-relaxed max-w-xl">
                Приезжайте в наш офис продаж и&nbsp;убедитесь в&nbsp;качестве лично. Мы закажем вам такси бесплатно.
              </p>
            </div>
            <div className="p-6 md:p-8 lg:w-[300px] xl:w-[340px] lg:shrink-0 flex flex-col justify-center gap-3 bg-muted/15 border-t border-foreground/[0.06] lg:border-t-0 lg:border-l">
              <Link to="/contacts" className="w-full">
                <button className="w-full rounded-pill bg-primary text-primary-foreground min-h-[50px] px-[30px] py-[15px] text-sm font-medium hover:bg-primary/90 transition-colors flex items-center justify-between gap-2">
                  Записаться
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </Link>
              <a href="tel:+79001234567" className="w-full">
                <button className="w-full rounded-pill bg-muted min-h-[50px] px-[30px] py-[15px] text-sm font-medium hover:bg-muted/80 transition-colors flex items-center justify-between gap-2">
                  Позвонить
                  <Phone className="h-4 w-4 shrink-0" aria-hidden />
                </button>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default MortgageCalculator;
