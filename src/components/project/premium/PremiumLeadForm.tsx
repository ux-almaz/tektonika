import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";

const PremiumLeadForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `/proposal?name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}`;
  };

  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: "#0a0a0a" }}>
      <div className="site-container">
        <div className="mx-auto max-w-4xl text-center">
          <ScrollReveal>
            <p
              className="mb-2 text-xs uppercase tracking-[0.25em]"
              style={{ color: "hsl(var(--luxor-burgundy-light))" }}
            >
              Персональная консультация
            </p>
            <h2 className="text-3xl uppercase tracking-[0.08em] text-white md:text-5xl">
              Получите персональную презентацию
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/50 md:text-base">
              Подберем лучшие варианты, расскажем про форматы покупки и покажем динамику
              строительства
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15} className="mt-10">
            <form
              onSubmit={handleSubmit}
              className="mx-auto flex max-w-2xl flex-col gap-4 sm:flex-row"
            >
              <input
                type="text"
                placeholder="Ваше имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="flex-1 rounded-sm border bg-white/5 px-6 py-3.5 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-white/50"
                style={{ borderColor: "hsla(var(--luxor-burgundy), 0.4)" }}
              />
              <input
                type="tel"
                placeholder="+7 (999) 999-99-99"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="flex-1 rounded-sm border bg-white/5 px-6 py-3.5 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-white/50"
                style={{ borderColor: "hsla(var(--luxor-burgundy), 0.4)" }}
              />
              <button
                type="submit"
                className="rounded-sm px-8 py-3.5 text-sm font-medium uppercase tracking-[0.12em] text-white transition-all hover:opacity-90"
                style={{ backgroundColor: "hsl(var(--luxor-burgundy))" }}
              >
                Отправить
              </button>
            </form>
            <p className="mt-5 text-xs text-white/25">
              Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default PremiumLeadForm;
