import { useState } from "react";
import { X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetPortal,
  SheetOverlay,
} from "@/components/ui/sheet";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

interface ApartmentInfo {
  rooms: string;
  area: number;
  floor: number;
  totalFloors: number;
  price: number;
  building: string;
}

interface ConsultationSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  apartment?: ApartmentInfo | null;
}

const fmtFull = (n: number) => n.toLocaleString("ru-RU");

const ConsultationSheet = ({ open, onOpenChange, apartment }: ConsultationSheetProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setSubmitted(true);
  };

  const handleOpenChange = (val: boolean) => {
    onOpenChange(val);
    if (!val) {
      setTimeout(() => {
        setSubmitted(false);
        setName("");
        setPhone("");
      }, 300);
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetPortal>
        <SheetOverlay />
        <SheetPrimitive.Content
          className={cn(
            "fixed inset-y-0 right-0 z-50 flex flex-col bg-background shadow-2xl",
            "w-full sm:w-[460px] rounded-l-3xl",
            "transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
            "data-[state=closed]:duration-300 data-[state=open]:duration-500",
          )}
        >
          {/* Header */}
          <div className="flex items-start justify-between p-8 pb-0">
            <div>
              <h2 className="font-display text-[32px] font-medium leading-[1.1]">
                Получить<br />консультацию
              </h2>
              <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
                Наш менеджер свяжется с вами в ближайшее время.
              </p>
            </div>
            <SheetPrimitive.Close className="ml-4 mt-1 rounded-full border border-border w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors flex-shrink-0">
              <X className="h-4 w-4" />
              <span className="sr-only">Закрыть</span>
            </SheetPrimitive.Close>
          </div>

          {/* Apartment info */}
          {apartment && (
            <div className="mx-8 mt-6 rounded-2xl bg-muted px-5 py-4">
              <p className="text-sm font-medium">
                {apartment.rooms === "Студия" ? "Студия" : apartment.rooms.replace("-комн.", "-комнатная квартира")}
                {" · "}{apartment.area} м²
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {apartment.floor} этаж из {apartment.totalFloors} · {apartment.building}
              </p>
              <p className="font-display text-lg font-medium mt-2">{fmtFull(apartment.price)} ₽</p>
            </div>
          )}

          {/* Form */}
          <div className="flex-1 flex flex-col px-8 pt-6">
            {submitted ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary" />
                  </svg>
                </div>
                <div>
                  <p className="font-display text-xl font-medium">Заявка отправлена</p>
                  <p className="text-muted-foreground text-sm mt-2">Мы свяжемся с вами в ближайшее время</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-muted-foreground">Введите имя</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Иван"
                    className="h-14 rounded-2xl border border-border bg-muted/50 px-5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-muted-foreground">Введите телефон</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+7 000 000-00-00"
                    className="h-14 rounded-2xl border border-border bg-muted/50 px-5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    required
                  />
                </div>

                <div className="flex-1" />

                <div className="pb-8">
                  <button
                    type="submit"
                    className="w-full rounded-pill bg-primary text-primary-foreground h-14 text-base font-medium hover:bg-primary/90 transition-colors"
                  >
                    Отправить
                  </button>
                  <p className="text-xs text-muted-foreground text-center mt-4 leading-relaxed">
                    Нажимая кнопку «Отправить», вы подтверждаете своё согласие на{" "}
                    <a href="#" className="underline hover:text-foreground transition-colors">
                      обработку персональных данных
                    </a>
                  </p>
                </div>
              </form>
            )}
          </div>
        </SheetPrimitive.Content>
      </SheetPortal>
    </Sheet>
  );
};

export default ConsultationSheet;
