import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CarFront, Check, DoorOpen, MapPin, ShieldCheck, Warehouse, Zap } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PillButton from "@/components/PillButton";
import { getParkingAssetById, getTypeLabel, parkingAssets } from "@/data/parkingAssets";

const fmtFull = (n: number) => n.toLocaleString("ru-RU");

const ParkingAssetDetail = () => {
  const { id } = useParams();
  const asset = getParkingAssetById(Number(id));

  if (!asset) {
    return (
      <div className="min-h-screen bg-background">
        <Header introDone />
        <main className="site-container pt-32 pb-24">
          <div className="rounded-[32px] border border-border bg-card px-8 py-12 text-center">
            <p className="text-3xl font-medium tracking-[-0.03em]">Объект не найден</p>
            <Link to="/parking" className="mt-6 inline-flex text-sm font-medium text-primary">
              Вернуться в каталог
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const similarAssets = parkingAssets.filter((item) => item.type === asset.type && item.id !== asset.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header introDone />
      <main className="pt-20">
        <section className="pb-10 pt-10 md:pb-14 md:pt-14">
          <div className="site-container">
            <div className="w-full">
              <Link to="/parking" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
                <ArrowLeft className="h-4 w-4" />
                Назад в каталог
              </Link>

              <div className="mt-6 grid gap-6">
                <div className="overflow-hidden rounded-[36px] border border-border bg-card">
                  <div className="border-b border-border p-6 md:p-8">
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-pill bg-muted px-4 py-2 text-sm">{getTypeLabel(asset.type)}</span>
                      <span className="rounded-pill bg-muted px-4 py-2 text-sm">{asset.status}</span>
                      {asset.discount && <span className="rounded-pill bg-primary px-4 py-2 text-sm text-primary-foreground">Со скидкой</span>}
                    </div>
                    <h1 className="mt-5 font-display text-[44px] font-normal uppercase leading-none tracking-[-0.04em] md:text-[64px]">
                      {asset.title}
                    </h1>
                    <p className="mt-4 max-w-[720px] text-lg text-muted-foreground">{asset.description}</p>
                  </div>

                  <div className="grid items-stretch gap-0 lg:grid-cols-[minmax(0,1fr)_440px]">
                    <div className="flex border-b border-border bg-muted/60 p-6 md:border-b-0 md:border-r md:p-8">
                      <div className="relative min-h-[420px] h-full w-full rounded-[28px] border border-border bg-background p-6 md:min-h-[520px]">
                        <div className="absolute left-6 top-6 flex items-center gap-2 rounded-pill bg-card px-4 py-2 text-sm font-medium">
                          {asset.type === "parking" ? <CarFront className="h-4 w-4" /> : <Warehouse className="h-4 w-4" />}
                          План объекта
                        </div>

                        <div className="flex h-full items-center justify-center">
                          <div className="relative h-[300px] w-[300px] max-w-full rounded-[32px] border border-dashed border-border bg-muted/70 p-5 md:h-[380px] md:w-[380px]">
                            <div className="absolute left-5 top-5 text-xs uppercase tracking-[0.18em] text-muted-foreground">{asset.dimensions}</div>
                            {asset.type === "parking" ? (
                              <>
                                <div className="absolute inset-x-10 bottom-12 top-16 rounded-[28px] border-2 border-foreground/70" />
                                <div className="absolute inset-x-[88px] bottom-20 top-28 rounded-[24px] border border-border bg-card" />
                                <div className="absolute left-1/2 top-1/2 flex h-24 w-40 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[22px] border border-border bg-background text-sm font-medium">
                                  Авто
                                </div>
                                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-pill bg-card px-4 py-2 text-sm font-medium">{asset.area} м²</div>
                              </>
                            ) : (
                              <>
                                <div className="absolute inset-10 rounded-[24px] border-2 border-foreground/70 bg-background" />
                                <div className="absolute inset-x-16 top-16 h-10 rounded-lg border border-border bg-muted" />
                                <div className="absolute bottom-16 left-16 right-16 grid grid-cols-3 gap-3">
                                  <div className="h-16 rounded-xl border border-border bg-card" />
                                  <div className="h-16 rounded-xl border border-border bg-card" />
                                  <div className="h-16 rounded-xl border border-border bg-card" />
                                </div>
                                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-pill bg-card px-4 py-2 text-sm font-medium">{asset.area} м²</div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <aside className="p-6 md:p-8">
                      <div className="rounded-[28px] bg-muted p-6">
                        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Цена</p>
                        <p className="mt-3 text-4xl font-medium tracking-[-0.04em]">{fmtFull(asset.price)} ₽</p>
                        <p className="mt-3 text-sm text-muted-foreground">{asset.purpose}</p>
                        <div className="mt-6 flex flex-col gap-3">
                          <PillButton variant="yellow" withArrow className="w-full justify-center">
                            Забронировать
                          </PillButton>
                          <PillButton variant="outline" className="w-full justify-center">
                            Получить консультацию
                          </PillButton>
                        </div>
                      </div>

                      <div className="mt-5 space-y-3">
                        <div className="rounded-[24px] border border-border px-5 py-4">
                          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Расположение</p>
                          <p className="mt-2 flex items-center gap-2 text-sm font-medium"><MapPin className="h-4 w-4" /> {asset.project}, {asset.building}</p>
                          <p className="mt-1 text-sm text-muted-foreground">{asset.section} • {asset.level}</p>
                        </div>
                        <div className="rounded-[24px] border border-border px-5 py-4">
                          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Доступ</p>
                          <p className="mt-2 flex items-center gap-2 text-sm font-medium"><DoorOpen className="h-4 w-4" /> {asset.access}</p>
                        </div>
                        <div className="rounded-[24px] border border-border px-5 py-4">
                          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Безопасность</p>
                          <p className="mt-2 flex items-center gap-2 text-sm font-medium"><ShieldCheck className="h-4 w-4" /> Охрана и видеонаблюдение</p>
                        </div>
                        {asset.charging && (
                          <div className="rounded-[24px] border border-border px-5 py-4">
                            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Инфраструктура</p>
                            <p className="mt-2 flex items-center gap-2 text-sm font-medium"><Zap className="h-4 w-4" /> Есть зарядка для электромобиля</p>
                          </div>
                        )}
                      </div>
                    </aside>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-12 md:pb-20">
          <div className="site-container">
            <div className="grid w-full gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
              <div className="rounded-[32px] border border-border bg-card p-6 md:p-8">
                <h2 className="text-3xl font-medium tracking-[-0.03em]">Параметры объекта</h2>
                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  {[
                    ["Площадь", `${asset.area} м²`],
                    ["Габариты", asset.dimensions],
                    ["Высота потолка", asset.ceiling],
                    ["Назначение", asset.purpose],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-[24px] bg-muted p-5">
                      <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
                      <p className="mt-3 text-lg font-medium">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-[28px] border border-border p-6">
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Преимущества</p>
                  <div className="mt-5 grid gap-3 md:grid-cols-2">
                    {asset.benefits.map((benefit) => (
                      <div key={benefit} className="flex items-start gap-3 rounded-[20px] bg-muted px-4 py-4 text-sm font-medium">
                        <Check className="mt-0.5 h-4 w-4 shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-[32px] border border-border bg-card p-6 md:p-8">
                <h2 className="text-3xl font-medium tracking-[-0.03em]">Похожие варианты</h2>
                <div className="mt-6 space-y-4">
                  {similarAssets.map((item) => (
                    <Link key={item.id} to={`/parking/${item.id}`} className="block rounded-[24px] bg-muted p-5 transition-colors hover:bg-accent">
                      <p className="text-sm text-muted-foreground">{getTypeLabel(item.type)}</p>
                      <p className="mt-2 text-xl font-medium tracking-[-0.03em]">{item.title}</p>
                      <div className="mt-4 flex items-center justify-between text-sm">
                        <span>{item.area} м²</span>
                        <span className="font-medium">{fmtFull(item.price)} ₽</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ParkingAssetDetail;
