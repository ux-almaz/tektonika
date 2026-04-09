import { useState, useMemo } from "react";
import { Slider } from "@/components/ui/slider";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";

const fmt = (n: number) => n.toLocaleString("ru-RU");

function calcMonthly(price: number, downPercent: number, rate: number, years: number) {
  const principal = price - price * (downPercent / 100);
  if (principal <= 0) return 0;
  const mr = rate / 100 / 12;
  const n = years * 12;
  if (mr === 0) return Math.round(principal / n);
  return Math.round((principal * mr) / (1 - Math.pow(1 + mr, -n)));
}

const banks = [
  { name: "Сбербанк", rate: 6, downPercent: 15 },
  { name: "ВТБ", rate: 6.5, downPercent: 20 },
  { name: "Альфа-Банк", rate: 7, downPercent: 15 },
];

const downPresets = [15, 20, 30, 50];

const ApartmentMortgage = () => {
  const price = 11_300_000;
  const [down, setDown] = useState(20);
  const [term, setTerm] = useState(20);

  const downAmount = useMemo(() => Math.round(price * down / 100), [down]);
  const monthly = useMemo(() => calcMonthly(price, down, 6, term), [down, term]);

  return (
    <section className="py-16 md:py-24">
      <div className="site-container">
        <SectionHeading title="Ипотечный калькулятор" />

        <ScrollReveal>
          <div className="mt-12 border border-border bg-card p-8 md:p-12 rounded-3xl">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12">
              {/* Sliders */}
              <div className="space-y-8">
                <div>
                  <div className="flex items-center justify-between border border-border rounded-pill px-6 py-4 mb-1">
                    <span className="font-medium">{fmt(downAmount)} ₽</span>
                    <span className="text-muted-foreground text-sm">Первый взнос ({down}%)</span>
                  </div>
                  <div className="px-6"><Slider min={10} max={90} step={1} value={[down]} onValueChange={([v]) => setDown(v)} /></div>
                  <div className="flex gap-2 mt-3">
                    {downPresets.map((p) => (
                      <button
                        key={p}
                        onClick={() => setDown(p)}
                        className={`rounded-pill border px-4 py-1.5 text-sm transition-colors ${
                          down === p ? "bg-foreground text-background border-foreground" : "border-border hover:bg-muted"
                        }`}
                      >
                        {p}%
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between border border-border rounded-pill px-6 py-4 mb-1">
                    <span className="font-medium">{term} лет</span>
                    <span className="text-muted-foreground text-sm">Срок кредита</span>
                  </div>
                  <div className="px-6"><Slider min={1} max={30} step={1} value={[term]} onValueChange={([v]) => setTerm(v)} /></div>
                </div>

                <div className="flex items-baseline gap-4 pt-2">
                  <span className="text-muted-foreground">Платёж:</span>
                  <span className="font-display text-3xl font-medium">{fmt(monthly)} ₽/мес</span>
                </div>
              </div>

              {/* Bank table */}
              <div>
                <div className="grid grid-cols-[1fr_1fr_0.7fr_auto] gap-4 pb-4 border-b border-border text-muted-foreground text-sm">
                  <span>Банк</span>
                  <span>Платеж</span>
                  <span>Ставка</span>
                  <span></span>
                </div>
                {banks.map((b, i) => {
                  const bMonthly = calcMonthly(price, b.downPercent, b.rate, term);
                  return (
                    <div key={i} className="grid grid-cols-[1fr_1fr_0.7fr_auto] gap-4 items-center py-5 border-b border-border last:border-b-0">
                      <span>{b.name}</span>
                      <span className="font-display text-lg font-medium">{fmt(bMonthly)} ₽</span>
                      <span>от {b.rate}%</span>
                      <button className="rounded-pill border border-border px-5 py-2.5 text-xs font-medium uppercase tracking-wide hover:bg-muted transition-colors whitespace-nowrap">
                        Подать заявку
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ApartmentMortgage;
