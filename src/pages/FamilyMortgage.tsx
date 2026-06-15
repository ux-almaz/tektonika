import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";
import PillButton from "@/components/PillButton";
import ConsultationSheet from "@/components/ConsultationSheet";

const borrowerRequirements = [
  "ребёнок в возрасте до 6 лет включительно",
  "двое несовершеннолетних детей",
  "ребёнок‑инвалид",
];

const loanPurposes = [
  "На квартиру от застройщика по договору долевого участия (ДДУ). То есть это первичное жильё — в эксплуатации или ещё строится",
  "На покупку готовой квартиры или дома по договору купли-продажи у застройщика — первого собственника",
];

const matCapitalAmounts = [
  { label: "На первого ребенка", value: "728 921,9 ₽" },
  {
    label: "На второго ребенка",
    value: "963 243,17 ₽",
    note: "если на первого семья капитал еще не получала",
  },
  {
    label: "Доплата при рождении второго ребенка после получения сертификата на первого",
    value: "234 321,27 ₽",
  },
];

const FamilyMortgage = () => {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header introDone />
      <main className="pt-20">
        {/* Hero */}
        <section className="pt-10 pb-12 md:pt-14 md:pb-16">
          <div className="site-container">
            <motion.div
              className="mb-6 flex items-center gap-2 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Link to="/" className="transition-colors hover:text-foreground">
                Главная
              </Link>
              <span>·</span>
              <Link to="/#calculator" className="transition-colors hover:text-foreground">
                Способы покупки
              </Link>
              <span>·</span>
              <span className="text-foreground">Семейная ипотека</span>
            </motion.div>

            <ScrollReveal>
              <h1 className="max-w-3xl font-display text-4xl font-medium leading-[1.1] md:text-5xl lg:text-6xl">
                Семейная ипотека под 6%
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Семьи с детьми могут взять ипотеку с господдержкой — под 6% на весь срок кредита.
                Разницу между льготной и рыночной ставкой банку компенсирует государство
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Requirements & loan purposes */}
        <section className="bg-muted py-16 md:py-24">
          <div className="site-container">
            <div className="grid gap-6 md:grid-cols-2">
              <ScrollReveal>
                <div className="h-full rounded-3xl bg-card p-8 md:p-10">
                  <h2 className="font-display text-2xl font-medium md:text-3xl">
                    Требования к заёмщикам
                  </h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    Программой могут воспользоваться семьи, в которых есть:
                  </p>
                  <ul className="mt-6 space-y-3">
                    {borrowerRequirements.map((item) => (
                      <li key={item} className="flex gap-3 text-base leading-relaxed">
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 border-t border-border pt-6 text-sm leading-relaxed text-muted-foreground">
                    У родителя‑заёмщика и детей должно быть гражданство РФ
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.08}>
                <div className="h-full rounded-3xl bg-card p-8 md:p-10">
                  <h2 className="font-display text-2xl font-medium md:text-3xl">
                    На что можно взять кредит
                  </h2>
                  <ul className="mt-6 space-y-4">
                    {loanPurposes.map((item) => (
                      <li key={item} className="flex gap-3 text-base leading-relaxed">
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Disabled children families */}
        <section className="py-16 md:py-24">
          <div className="site-container">
            <ScrollReveal>
              <div className="max-w-4xl rounded-3xl bg-muted p-8 md:p-12">
                <h2 className="font-display text-2xl font-medium md:text-3xl">
                  Для семей с детьми-инвалидами
                </h2>
                <p className="mt-4 text-base leading-relaxed">
                  На рефинансирование ипотечного кредита, полученного на приобретение жилья на
                  первичном рынке.
                </p>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  Для семей, в которых есть двое несовершеннолетних детей, но нет ребёнка в возрасте
                  до 6 лет или ребёнка-инвалида, действуют территориальные ограничения для покупки
                  квартиры
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Maternal capital */}
        <section className="bg-muted py-16 md:py-24">
          <div className="site-container">
            <ScrollReveal>
              <SectionHeading title="Материнский (семейный) капитал" />
              <p className="mt-4 max-w-3xl text-muted-foreground leading-relaxed">
                Государственная поддержка семей с детьми. Его можно направить на улучшение жилищных
                условий (покупка или строительство жилья), оплату образования, товары и услуги для
                детей с инвалидностью, пенсионные накопления родителей или получать в виде
                ежемесячной выплаты.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <p className="mt-10 text-sm text-muted-foreground">
                Размер в 2026 году (после индексации на 5,6% с 1 февраля 2026 года)
              </p>
            </ScrollReveal>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {matCapitalAmounts.map((item, i) => (
                <ScrollReveal key={item.label} delay={i * 0.05}>
                  <div className="h-full rounded-3xl bg-card p-6 md:p-8">
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.label}</p>
                    <p className="mt-3 font-display text-2xl font-medium text-primary md:text-3xl">
                      {item.value}
                    </p>
                    {item.note && (
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                        {item.note}
                      </p>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={0.12}>
              <p className="mt-10 max-w-3xl text-base leading-relaxed text-muted-foreground">
                Самым востребованным направлением использования средств для семей Крыма остаётся
                улучшение жилищных условий (покупка или строительство жилья). На эти цели с начала
                2026 года направили маткапитал более 3 тыс. крымских семей. За время действия
                программы в Республике Крым было выдано более 195 тысяч сертификатов на материнский
                капитал.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="mt-12 flex flex-col items-start justify-between gap-8 rounded-3xl bg-card p-10 md:mt-16 md:flex-row md:items-center md:p-12">
                <div className="max-w-[600px]">
                  <h3 className="font-display text-3xl font-medium leading-[1.1] md:text-4xl">
                    Нужна помощь с ипотекой?
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    Оставьте заявку — менеджер свяжется с вами для бесплатной консультации по
                    семейной ипотеке и материнскому капиталу
                  </p>
                </div>
                <div className="flex w-full flex-col gap-4 sm:flex-row md:w-auto">
                  <PillButton
                    variant="yellow"
                    className="w-full whitespace-nowrap sm:w-auto"
                    onClick={() => setSheetOpen(true)}
                  >
                    Получить консультацию
                  </PillButton>
                  <Link to="/catalog">
                    <PillButton
                      variant="outline"
                      className="w-full whitespace-nowrap sm:w-auto"
                    >
                      Выбрать квартиру
                    </PillButton>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
      <ConsultationSheet open={sheetOpen} onOpenChange={setSheetOpen} />
    </div>
  );
};

export default FamilyMortgage;
