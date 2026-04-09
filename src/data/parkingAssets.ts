export const typeOptions = ["Все", "Машино-места", "Кладовые"] as const;
export const projectOptions = ["Тектоника", "ЖК Тектоника", "ЖК Горизонт"] as const;

export type AssetType = "parking" | "storage";

export interface ParkingAsset {
  id: number;
  type: AssetType;
  title: string;
  secondary?: string;
  area: number;
  extraArea?: number;
  price: number;
  discount: boolean;
  charging: boolean;
  project: (typeof projectOptions)[number];
  building: string;
  section: string;
  level: string;
  tags: string[];
  status: string;
  access: string;
  dimensions: string;
  ceiling: string;
  purpose: string;
  description: string;
  benefits: string[];
}

export const parkingAssets: ParkingAsset[] = [
  {
    id: 1,
    type: "parking",
    title: "Машино-место №148",
    secondary: "Помещение №79",
    area: 19.5,
    extraArea: 3,
    price: 2_768_715,
    discount: true,
    charging: false,
    project: "Тектоника",
    building: "корп. П6",
    section: "секция 1",
    level: "ур. -1",
    tags: ["Семейное", "Среднее"],
    status: "Готово к бронированию",
    access: "Заезд по брелоку 24/7",
    dimensions: "2,7 × 7,2 м",
    ceiling: "2,9 м",
    purpose: "Для семейного размещения 2 авто + хранение",
    description: "Просторное семейное машино-место рядом с лифтовым холлом и пешеходным выходом из паркинга.",
    benefits: ["Удобный радиус разворота", "Сухой и отапливаемый паркинг", "Рядом выход к секции 1"],
  },
  {
    id: 2,
    type: "parking",
    title: "Машино-место №47",
    secondary: "Помещение №74",
    area: 21.4,
    extraArea: 4.1,
    price: 3_930_132,
    discount: false,
    charging: true,
    project: "Тектоника",
    building: "корп. П18",
    section: "секция 1",
    level: "ур. -1",
    tags: ["Семейное", "Большое"],
    status: "Свободно",
    access: "Шлагбаум + видеонаблюдение",
    dimensions: "3,1 × 7,4 м",
    ceiling: "3,0 м",
    purpose: "Для двух автомобилей или крупного SUV",
    description: "Увеличенное место в первой линии паркинга с близким доступом к выезду и зарядной инфраструктуре.",
    benefits: ["Подготовка под зарядку", "Широкий проезд", "Подходит для большого авто"],
  },
  {
    id: 3,
    type: "parking",
    title: "Машино-место №442",
    secondary: "Машино-место №443",
    area: 16.7,
    extraArea: 18.6,
    price: 4_161_731,
    discount: true,
    charging: true,
    project: "Тектоника",
    building: "корп. П52",
    section: "секция 2",
    level: "ур. 0",
    tags: ["Сдвоенное", "У зарядки"],
    status: "Осталось 2 места",
    access: "Контроль доступа по номеру авто",
    dimensions: "5,6 × 6,4 м",
    ceiling: "3,2 м",
    purpose: "Для двух автомобилей с зарядной стойкой",
    description: "Сдвоенный блок машино-мест рядом с зарядной станцией и лифтом в корпус П52.",
    benefits: ["Зарядка для EV", "Сдвоенное размещение", "Удобно для семьи"],
  },
  {
    id: 4,
    type: "storage",
    title: "Кладовая №18",
    area: 4.2,
    price: 514_000,
    discount: false,
    charging: false,
    project: "Тектоника",
    building: "корп. П6",
    section: "секция 3",
    level: "ур. -1",
    tags: ["У лифта"],
    status: "Свободно",
    access: "Доступ по смарт-ключу",
    dimensions: "1,8 × 2,3 м",
    ceiling: "2,7 м",
    purpose: "Для сезонного хранения и бытового инвентаря",
    description: "Компактная кладовая рядом с лифтовым холлом — удобно хранить велосипеды, шины и коробки.",
    benefits: ["Сухое помещение", "Рядом с лифтом", "Легкий доступ из секции 3"],
  },
  {
    id: 5,
    type: "storage",
    title: "Кладовая №41",
    area: 6.8,
    price: 692_000,
    discount: true,
    charging: false,
    project: "ЖК Тектоника",
    building: "корп. 2",
    section: "секция 5",
    level: "ур. -1",
    tags: ["Увеличенная"],
    status: "По акции",
    access: "Электронный ключ",
    dimensions: "2,1 × 3,2 м",
    ceiling: "2,8 м",
    purpose: "Для хранения спортинвентаря и крупногабаритных вещей",
    description: "Увеличенная кладовая с удобной геометрией для стеллажей и вертикального хранения.",
    benefits: ["Правильная форма", "Помещаются стеллажи", "Скидка при бронировании"],
  },
  {
    id: 6,
    type: "parking",
    title: "Машино-место №205",
    area: 14.8,
    price: 2_140_000,
    discount: false,
    charging: false,
    project: "ЖК Тектоника",
    building: "корп. 1",
    section: "секция 2",
    level: "ур. -2",
    tags: ["Стандарт"],
    status: "Свободно",
    access: "Шлагбаум и пост охраны",
    dimensions: "2,5 × 5,9 м",
    ceiling: "2,8 м",
    purpose: "Для одного автомобиля",
    description: "Стандартное машино-место на подземном уровне с быстрым доступом к выезду на рампу.",
    benefits: ["Близко к рампе", "Комфортная ширина", "Подходит для седана и кроссовера"],
  },
  {
    id: 7,
    type: "storage",
    title: "Кладовая №09",
    area: 3.6,
    price: 448_000,
    discount: false,
    charging: false,
    project: "ЖК Горизонт",
    building: "корп. 3",
    section: "секция 1",
    level: "ур. -1",
    tags: ["Компактная"],
    status: "Свободно",
    access: "Круглосуточный доступ",
    dimensions: "1,7 × 2,1 м",
    ceiling: "2,7 м",
    purpose: "Для коробок, шин и хозяйственных вещей",
    description: "Компактная кладовая для повседневного хранения рядом с лестничным узлом и парковкой.",
    benefits: ["Рациональная площадь", "Подходит под стеллаж", "Низкая стоимость входа"],
  },
  {
    id: 8,
    type: "parking",
    title: "Машино-место №88",
    area: 13.9,
    price: 1_980_000,
    discount: true,
    charging: true,
    project: "ЖК Горизонт",
    building: "корп. 5",
    section: "секция 2",
    level: "ур. -1",
    tags: ["У зарядки", "У въезда"],
    status: "По акции",
    access: "Пропуск по приложению",
    dimensions: "2,5 × 5,6 м",
    ceiling: "2,9 м",
    purpose: "Для одного авто с доступом к зарядке",
    description: "Место у въезда в паркинг с быстрым доступом к зарядной точке и выезду на улицу.",
    benefits: ["У въезда", "Подходит для EV", "Скидка при онлайн-бронировании"],
  },
];

export const getTypeLabel = (type: AssetType) => (type === "parking" ? "Машино-места" : "Кладовые");

export const getParkingAssetById = (id: number) => parkingAssets.find((item) => item.id === id);
