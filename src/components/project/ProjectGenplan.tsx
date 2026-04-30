import { useState, useEffect } from "react";
import { Maximize2, X, ParkingCircle, TreePine, GraduationCap, ShoppingCart, Dumbbell, Coffee, Baby, Bike } from "lucide-react";
import { createPortal } from "react-dom";
import SectionHeading from "../SectionHeading";
import ScrollReveal from "../ScrollReveal";
import genplanImg from "@/assets/genplan.jpg";

type IconMarker = {
  id: string;
  type: "icon";
  icon: React.ElementType;
  label: string;
  top: string;
  left: string;
};

type NumberMarker = {
  id: string;
  type: "number";
  number: number;
  label: string;
  top: string;
  left: string;
};

type LabelMarker = {
  id: string;
  type: "label";
  label: string;
  badge?: string;
  top: string;
  left: string;
};

type Marker = IconMarker | NumberMarker | LabelMarker;

const defaultMarkers: Marker[] = [
  // Numbered sections (buildings)
  { id: "sec1", type: "number", number: 1, label: "1-я очередь", top: "55%", left: "22%" },
  { id: "sec2", type: "number", number: 2, label: "2-я очередь", top: "72%", left: "45%" },
  { id: "sec3", type: "number", number: 3, label: "3-я очередь", top: "52%", left: "62%" },

  // Infrastructure icons
  { id: "parking1", type: "icon", icon: ParkingCircle, label: "Паркинг", top: "20%", left: "42%" },
  { id: "parking2", type: "icon", icon: ParkingCircle, label: "Паркинг", top: "68%", left: "15%" },
  { id: "parking3", type: "icon", icon: ParkingCircle, label: "Паркинг", top: "38%", left: "78%" },
  { id: "school", type: "icon", icon: GraduationCap, label: "Школа", top: "34%", left: "52%" },
  { id: "kinder1", type: "icon", icon: Baby, label: "Детский сад", top: "42%", left: "32%" },
  { id: "kinder2", type: "icon", icon: Baby, label: "Детский сад", top: "30%", left: "68%" },
  { id: "park1", type: "icon", icon: TreePine, label: "Парковая зона", top: "18%", left: "62%" },
  { id: "park2", type: "icon", icon: TreePine, label: "Парковая зона", top: "48%", left: "48%" },
  { id: "shop", type: "icon", icon: ShoppingCart, label: "Супермаркет", top: "60%", left: "34%" },
  { id: "sport", type: "icon", icon: Dumbbell, label: "Фитнес-клуб", top: "26%", left: "78%" },
  { id: "cafe", type: "icon", icon: Coffee, label: "Кафе и рестораны", top: "64%", left: "56%" },
  { id: "bike", type: "icon", icon: Bike, label: "Велодорожки", top: "78%", left: "62%" },

  // Label markers for major features
  { id: "lbl-parking1", type: "label", label: "Мультипаркинг", badge: "288 м/м", top: "24%", left: "32%" },
];

const MapMarkers = ({ showTooltip, markers }: { showTooltip: boolean; markers: Marker[] }) => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <>
      {markers.map((m) => {
        if (m.type === "number") {
          return (
            <div
              key={m.id}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2 group cursor-default"
              style={{ top: m.top, left: m.left }}
              onMouseEnter={() => setHovered(m.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg text-[15px] font-bold">
                {m.number}
              </div>
              {showTooltip && hovered === m.id && (
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap shadow-lg pointer-events-none">
                  {m.label}
                </div>
              )}
            </div>
          );
        }

        if (m.type === "icon") {
          const Icon = m.icon;
          return (
            <div
              key={m.id}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2 group cursor-default"
              style={{ top: m.top, left: m.left }}
              onMouseEnter={() => setHovered(m.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="w-9 h-9 rounded-full bg-background/95 backdrop-blur-sm flex items-center justify-center shadow-md border border-white/20 transition-transform group-hover:scale-110">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              {showTooltip && hovered === m.id && (
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap shadow-lg pointer-events-none">
                  {m.label}
                </div>
              )}
            </div>
          );
        }

        // label type
        return (
          <div
            key={m.id}
            className="absolute z-10 -translate-x-1/2 -translate-y-full"
            style={{ top: m.top, left: m.left }}
          >
            <div className="flex items-center gap-2 bg-background/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
              <span className="text-sm font-medium text-foreground whitespace-nowrap">{m.label}</span>
              {m.badge && (
                <span className="bg-primary text-primary-foreground text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap">
                  {m.badge}
                </span>
              )}
            </div>
            <div className="w-2.5 h-2.5 rounded-full bg-primary mt-1.5 mx-auto shadow-md" />
          </div>
        );
      })}
    </>
  );
};

interface ProjectGenplanProps {
  imageOverride?: string;
  markersOverride?: Marker[];
  markerPositionsOverride?: Partial<Record<string, { top: string; left: string }>>;
}

const ProjectGenplan = ({ imageOverride, markersOverride, markerPositionsOverride }: ProjectGenplanProps) => {
  const [fullscreen, setFullscreen] = useState(false);
  const genplanImage = imageOverride ?? genplanImg;
  const sourceMarkers = markersOverride ?? defaultMarkers;
  const markers = sourceMarkers.map((marker) => {
    const pos = markerPositionsOverride?.[marker.id];
    return pos ? { ...marker, top: pos.top, left: pos.left } : marker;
  });

  useEffect(() => {
    document.body.style.overflow = fullscreen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [fullscreen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setFullscreen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="project-genplan" className="py-16 md:py-24 border-0">
      <div className="site-container">
        <SectionHeading title="Генплан" />

        <ScrollReveal>
          <div className="mt-8 relative rounded-3xl overflow-hidden border border-border" style={{ minHeight: "680px" }}>
            <img src={genplanImage} alt="Генплан" className="w-full h-full object-cover absolute inset-0" />
            <div className="absolute inset-0 bg-foreground/5" />
            <MapMarkers showTooltip={true} markers={markers} />

            <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
              <button
                onClick={() => setFullscreen(true)}
                className="flex items-center gap-2 bg-background/95 backdrop-blur-sm rounded-full px-4 py-2.5 text-sm font-medium shadow-md hover:bg-background transition-colors"
                aria-label="На весь экран"
              >
                <Maximize2 className="w-4 h-4" />
                На весь экран
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {fullscreen && createPortal(
        <div className="fixed inset-0 z-[9999] bg-black">
          <div className="relative w-full h-full">
            <img src={genplanImage} alt="Генплан" className="w-full h-full object-cover absolute inset-0" />
            <div className="absolute inset-0 bg-foreground/5" />
            <MapMarkers showTooltip={true} markers={markers} />

            <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
              <button
                onClick={() => setFullscreen(false)}
                className="bg-background/95 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-background transition-colors"
                aria-label="Закрыть"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};

export default ProjectGenplan;
