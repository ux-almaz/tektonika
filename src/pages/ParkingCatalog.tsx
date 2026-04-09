import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown, Flame, Heart, LayoutGrid, List, X, Zap } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import { Slider } from "@/components/ui/slider";
import { getTypeLabel, parkingAssets, projectOptions, typeOptions } from "@/data/parkingAssets";

const fmtFull = (n: number) => n.toLocaleString("ru-RU");

type ViewMode = "scheme" | "list";

const ParkingCatalog = () => {
  const [searchParams] = useSearchParams();
  const [selectedProject, setSelectedProject] = useState<(typeof projectOptions)[number]>("Тектоника");
  const [selectedType, setSelectedType] = useState<(typeof typeOptions)[number]>(() => {
    const type = searchParams.get("type");
    if (type === "parking") return "Машино-места";
    if (type === "storage") return "Кладовые";
    return "Все";
  });
  const [price, setPrice] = useState<[number, number]>([251_460, 4_114_602]);
  const [onlyDiscount, setOnlyDiscount] = useState(searchParams.get("discount") === "yes");
  const [onlyCharging, setOnlyCharging] = useState(searchParams.get("charging") === "yes");
  const [view, setView] = useState<ViewMode>("list");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showProjectMenu, setShowProjectMenu] = useState(false);
  const [showTypeMenu, setShowTypeMenu] = useState(false);

  const filteredAssets = useMemo(() => {
    return parkingAssets.filter((item) => {
      const matchesProject = item.project === selectedProject;
      const matchesType =
        selectedType === "Все"
          ? true
          : selectedType === "Машино-места"
            ? item.type === "parking"
            : item.type === "storage";
      const matchesPrice = item.price >= price[0] && item.price <= price[1];
      const matchesDiscount = onlyDiscount ? item.discount : true;
      const matchesCharging = onlyCharging ? item.charging : true;

      return matchesProject && matchesType && matchesPrice && matchesDiscount && matchesCharging;
    });
  }, [onlyCharging, onlyDiscount, price, selectedProject, selectedType]);

  const activeFilters = [
    selectedProject,
    selectedType !== "Все" ? selectedType : null,
    onlyDiscount ? "Со скидкой" : null,
    onlyCharging ? "Зарядка для авто" : null,
  ].filter(Boolean) as string[];

  const clearAll = () => {
    setSelectedProject("Тектоника");
    setSelectedType("Все");
    setPrice([251_460, 4_114_602]);
    setOnlyDiscount(false);
    setOnlyCharging(false);
  };

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header introDone />
      <main className="pt-20">
        <section className="pb-8 pt-10 md:pb-12 md:pt-14">
          <div className="site-container">
            <div className="flex w-full flex-col gap-8 md:gap-10">
              <SectionHeading title="Выбрать паркинг и кладовые" />

              <motion.div
                className="grid grid-cols-1 gap-4 lg:grid-cols-[180px_210px_minmax(0,1fr)_auto_auto]"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="relative">
                  <button
                    onClick={() => {
                      setShowProjectMenu((prev) => !prev);
                      setShowTypeMenu(false);
                    }}
                    className="flex h-14 w-full items-center justify-between rounded-pill border border-border bg-card px-5 text-sm font-medium"
                  >
                    {selectedProject}
                    <ChevronDown className={`h-4 w-4 transition-transform ${showProjectMenu ? "rotate-180" : ""}`} />
                  </button>
                  {showProjectMenu && (
                    <div className="absolute left-0 top-full z-20 mt-2 w-full rounded-3xl border border-border bg-popover p-2 shadow-lg">
                      {projectOptions.map((project) => (
                        <button
                          key={project}
                          onClick={() => {
                            setSelectedProject(project);
                            setShowProjectMenu(false);
                          }}
                          className={`w-full rounded-2xl px-4 py-3 text-left text-sm transition-colors ${selectedProject === project ? "bg-muted font-medium" : "hover:bg-muted"}`}
                        >
                          {project}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative">
                  <button
                    onClick={() => {
                      setShowTypeMenu((prev) => !prev);
                      setShowProjectMenu(false);
                    }}
                    className="flex h-14 w-full items-center justify-between rounded-pill border border-border bg-card px-5 text-sm font-medium"
                  >
                    {selectedType}
                    <ChevronDown className={`h-4 w-4 transition-transform ${showTypeMenu ? "rotate-180" : ""}`} />
                  </button>
                  {showTypeMenu && (
                    <div className="absolute left-0 top-full z-20 mt-2 w-full rounded-3xl border border-border bg-popover p-2 shadow-lg">
                      {typeOptions.map((type) => (
                        <button
                          key={type}
                          onClick={() => {
                            setSelectedType(type);
                            setShowTypeMenu(false);
                          }}
                          className={`w-full rounded-2xl px-4 py-3 text-left text-sm transition-colors ${selectedType === type ? "bg-muted font-medium" : "hover:bg-muted"}`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <div>
                    <div className="flex h-14 items-center gap-3 rounded-pill border border-border border-b-0 bg-card px-6">
                      <span className="text-sm text-muted-foreground">Стоимость, ₽</span>
                      <span className="ml-auto text-sm font-medium">{fmtFull(price[0])}</span>
                      <span className="text-sm text-muted-foreground">—</span>
                      <span className="text-sm font-medium">{fmtFull(price[1])}</span>
                    </div>
                    <div className="bg-card px-6 pb-3">
                      <Slider min={200_000} max={4_500_000} step={10_000} value={price} onValueChange={(value) => setPrice(value as [number, number])} />
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setOnlyDiscount((prev) => !prev)}
                  className={`flex h-14 items-center gap-3 rounded-pill border px-5 text-sm font-medium transition-colors ${onlyDiscount ? "border-foreground bg-foreground text-background" : "border-border bg-card hover:bg-muted"}`}
                >
                  <Flame className="h-4 w-4" />
                  Со скидкой
                </button>

                <button
                  onClick={() => setOnlyCharging((prev) => !prev)}
                  className={`flex h-14 items-center gap-3 rounded-pill border px-5 text-sm font-medium transition-colors ${onlyCharging ? "border-foreground bg-foreground text-background" : "border-border bg-card hover:bg-muted"}`}
                >
                  <Zap className="h-4 w-4" />
                  Зарядка для авто
                </button>
              </motion.div>

              <motion.div
                className="rounded-[32px] border border-border bg-card px-6 py-6 md:px-8"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xl font-medium tracking-[-0.03em]">
                      Найдено {filteredAssets.length} объектов с такими параметрами
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {activeFilters.map((filter) => (
                      <span key={filter} className="inline-flex items-center rounded-pill bg-muted px-4 py-2 text-sm">
                        {filter}
                      </span>
                    ))}
                    <button
                      onClick={clearAll}
                      className="inline-flex items-center gap-1 rounded-pill bg-muted px-4 py-2 text-sm transition-colors hover:bg-accent"
                    >
                      Сбросить все
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="rounded-t-[40px] bg-muted/50 py-8 pb-16 md:py-10 md:pb-24">
          <div className="site-container">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span className="rounded-pill bg-background px-5 py-3 text-foreground">{selectedProject}</span>
                  <span>{selectedType === "Все" ? "Все типы" : selectedType}</span>
                </div>

                <div className="flex rounded-pill border border-border bg-background p-1">
                  <button
                    onClick={() => setView("scheme")}
                    className={`inline-flex items-center gap-2 rounded-pill px-5 py-3 text-sm font-medium transition-colors ${view === "scheme" ? "bg-foreground text-background" : "text-foreground hover:bg-muted"}`}
                  >
                    <LayoutGrid className="h-4 w-4" />
                    Схема
                  </button>
                  <button
                    onClick={() => setView("list")}
                    className={`inline-flex items-center gap-2 rounded-pill px-5 py-3 text-sm font-medium transition-colors ${view === "list" ? "bg-foreground text-background" : "text-foreground hover:bg-muted"}`}
                  >
                    <List className="h-4 w-4" />
                    Список
                  </button>
                </div>
              </div>

              {view === "list" ? (
                <div className="flex flex-col gap-4">
                  {filteredAssets.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.04 }}
                    >
                      <Link
                        to={`/parking/${item.id}`}
                        className="grid gap-6 rounded-[28px] border border-border bg-card px-6 py-6 transition-shadow hover:shadow-lg md:grid-cols-[minmax(0,1.5fr)_140px_160px_minmax(0,1.4fr)_auto_auto] md:items-stretch md:px-8"
                      >
                        <div className="flex min-w-0 max-w-[220px] flex-col justify-center">
                          <p className="text-xl font-medium tracking-[-0.03em]">{item.secondary ? `${item.secondary} · ${item.title}` : item.title}</p>
                          <p className="mt-2 text-sm text-muted-foreground">{getTypeLabel(item.type)}</p>
                        </div>

                        <div className="flex flex-col justify-center">
                          <p className="text-lg font-medium">{item.extraArea ? `${item.extraArea} м²` : `${item.area} м²`}</p>
                          {item.extraArea && <p className="text-lg font-medium">{item.area} м²</p>}
                        </div>

                        <div className="flex flex-col justify-center">
                          <p className="text-xl font-medium tracking-[-0.03em]">{fmtFull(item.price)} ₽</p>
                          {item.discount && <p className="mt-1 text-sm text-muted-foreground">С учетом скидки</p>}
                        </div>

                        <div className="flex min-w-0 flex-col justify-center">
                          <span className="inline-flex items-center gap-2 text-base font-medium transition-colors hover:text-primary">
                            {item.project}
                          </span>
                          <p className="mt-2 truncate text-sm text-muted-foreground">
                            {item.building} <span className="mx-1">•</span> {item.section} <span className="mx-1">•</span> {item.level}
                          </p>
                        </div>

                        <div className="flex w-fit flex-wrap items-center gap-2">
                          {item.tags.map((tag) => (
                            <span key={tag} className="rounded-pill bg-muted px-3 py-1.5 text-xs font-medium">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            toggleFavorite(item.id);
                          }}
                          className="self-center justify-self-start rounded-full border border-border p-3 text-muted-foreground transition-colors hover:text-primary md:justify-self-end"
                          aria-label="Добавить в избранное"
                        >
                          <Heart className={`h-5 w-5 ${favorites.includes(item.id) ? "fill-primary text-primary" : ""}`} />
                        </button>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {filteredAssets.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.04 }}
                    >
                      <Link
                        to={`/parking/${item.id}`}
                        className="block rounded-[28px] border border-border bg-card p-6 transition-shadow hover:shadow-lg"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">{getTypeLabel(item.type)}</p>
                            <p className="mt-2 text-2xl font-medium tracking-[-0.03em]">{item.title}</p>
                          </div>
                          <button
                            onClick={(event) => {
                              event.preventDefault();
                              toggleFavorite(item.id);
                            }}
                            className="rounded-full border border-border p-3 text-muted-foreground transition-colors hover:text-primary"
                            aria-label="Добавить в избранное"
                          >
                            <Heart className={`h-5 w-5 ${favorites.includes(item.id) ? "fill-primary text-primary" : ""}`} />
                          </button>
                        </div>

                        <div className="mt-8 grid grid-cols-2 gap-4">
                          <div className="rounded-3xl bg-muted p-4">
                            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Площадь</p>
                            <p className="mt-3 text-2xl font-medium">{item.area} м²</p>
                          </div>
                          <div className="rounded-3xl bg-muted p-4">
                            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Цена</p>
                            <p className="mt-3 text-2xl font-medium">{fmtFull(item.price)} ₽</p>
                          </div>
                        </div>

                        <div className="mt-6 flex flex-wrap gap-2">
                          {item.tags.map((tag) => (
                            <span key={tag} className="rounded-pill bg-muted px-3 py-1.5 text-xs font-medium">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="mt-8 border-t border-border pt-5 text-sm text-muted-foreground">
                          {item.project} <span className="mx-1">•</span> {item.building} <span className="mx-1">•</span> {item.level}
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}

              {filteredAssets.length === 0 && (
                <div className="rounded-[28px] border border-dashed border-border bg-card px-6 py-12 text-center">
                  <p className="text-2xl font-medium tracking-[-0.03em]">Ничего не найдено</p>
                  <p className="mt-3 text-muted-foreground">Попробуйте расширить диапазон цены или сбросить фильтры.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ParkingCatalog;
