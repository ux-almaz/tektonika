import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PublicationSidebar from "@/components/publication/PublicationSidebar";
import PublicationContent from "@/components/publication/PublicationContent";
import NewsCard from "@/components/NewsCard";

export interface PublicationData {
  id: number;
  image: string;
  title: string;
  date: string;
  project: string;
  content: string;
}

export const allPublications: PublicationData[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80&fm=webp",
    title: "Выдача ключей нового корпуса ЖК Тектоника",
    date: "24.02.2025",
    project: "ЖК Тектоника",
    content: `<p><strong>24 февраля</strong> состоялась торжественная выдача ключей жителям нового корпуса ЖК Тектоника. Это знаменательное событие для всех, кто ждал этого момента.</p>
<h2>Как прошла выдача ключей</h2>
<p>Мероприятие было организовано в формате праздника. Каждый новый житель получил не только ключи от своей квартиры, но и памятный подарок от застройщика.</p>
<p>Новый корпус включает в себя:</p>
<ul>
<li>Современные планировки от студий до 3-комнатных квартир</li>
<li>Панорамное остекление с видом на горы</li>
<li>Подземный паркинг на 120 машиномест</li>
<li>Благоустроенную дворовую территорию</li>
</ul>
<h2>Отзывы жителей</h2>
<p>«Мы очень довольны качеством отделки и планировкой квартиры. Всё сделано с вниманием к деталям», — поделилась одна из новых жительниц комплекса.</p>
<p>Застройщик продолжает работу над следующими очередями строительства. Уже сейчас доступны квартиры в новом корпусе со сдачей в IV квартале 2025 года.</p>`,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600&q=80&fm=webp",
    title: "Планировки нового формата multispace: удобно работать и жить",
    date: "18.02.2025",
    project: "ЖК Тектоника",
    content: `<p>Представляем новый формат квартир <strong>multispace</strong> — пространство, которое адаптируется под ваш ритм жизни.</p>
<h2>Что такое multispace?</h2>
<p>Это квартиры с продуманной зонирующей системой, которая позволяет легко трансформировать пространство: объединять или разделять зоны для работы, отдыха и приёма гостей.</p>
<h2>Преимущества формата</h2>
<ul>
<li>Гибкая планировка с раздвижными перегородками</li>
<li>Выделенная зона для домашнего офиса</li>
<li>Увеличенная высота потолков — 3.1 м</li>
<li>Панорамные окна в каждой комнате</li>
</ul>
<p>Квартиры формата multispace доступны в новом корпусе ЖК Тектоника. Площади от 45 до 98 м².</p>`,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80&fm=webp",
    title: "Старт продаж ЖК Тектоника",
    date: "10.02.2025",
    project: "ЖК Тектоника",
    content: `<p>Рады объявить о старте продаж в жилом комплексе <strong>Тектоника</strong>! Это новый проект премиального класса в самом сердце города.</p>
<h2>О проекте</h2>
<p>ЖК Тектоника — это современный жилой комплекс, сочетающий в себе передовые технологии строительства, продуманную инфраструктуру и уникальную архитектуру.</p>
<h2>Что предлагаем</h2>
<ul>
<li>Квартиры от студий до 4-комнатных с отделкой и без</li>
<li>Закрытая территория с ландшафтным дизайном</li>
<li>Собственная коммерческая инфраструктура на первых этажах</li>
<li>Подземный паркинг и гостевая парковка</li>
</ul>
<p>Специальные условия для первых покупателей: скидка до 10% и беспроцентная рассрочка на 12 месяцев.</p>`,
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80&fm=webp",
    title: "Новый этап строительства ЖК Крымский",
    date: "05.02.2025",
    project: "ЖК Крымский",
    content: `<p>Строительство ЖК Крымский выходит на новый этап. Завершены работы по возведению монолитного каркаса второй очереди.</p>
<h2>Ход строительства</h2>
<p>На сегодняшний день выполнено:</p>
<ul>
<li>Монолитный каркас — 100%</li>
<li>Кладка наружных стен — 85%</li>
<li>Установка оконных конструкций — 70%</li>
<li>Внутренние инженерные сети — 60%</li>
</ul>
<p>Сдача второй очереди запланирована на III квартал 2025 года. Все работы идут в соответствии с графиком.</p>`,
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80&fm=webp",
    title: "Благоустройство дворовой территории завершено",
    date: "28.01.2025",
    project: "ЖК Крымский",
    content: `<p>Завершены работы по благоустройству дворовой территории первой очереди ЖК Крымский.</p>
<h2>Что сделано</h2>
<ul>
<li>Детская площадка с безопасным покрытием</li>
<li>Зона отдыха с лавочками и перголами</li>
<li>Пешеходные дорожки с освещением</li>
<li>Озеленение территории: высажено более 200 деревьев и кустарников</li>
</ul>
<p>Двор ЖК Крымский — это закрытая безопасная территория без сквозного автомобильного движения. Здесь комфортно гулять с детьми и отдыхать на свежем воздухе.</p>`,
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80&fm=webp",
    title: "Ипотечные программы с господдержкой: обзор условий",
    date: "20.01.2025",
    project: "Все проекты",
    content: `<p>Обзор актуальных ипотечных программ с государственной поддержкой, доступных для покупателей наших жилых комплексов.</p>
<h2>Доступные программы</h2>
<ul>
<li><strong>Семейная ипотека</strong> — от 6% годовых для семей с детьми</li>
<li><strong>IT-ипотека</strong> — от 5% для сотрудников IT-компаний</li>
<li><strong>Военная ипотека</strong> — специальные условия для военнослужащих</li>
</ul>
<h2>Как оформить</h2>
<p>Наши менеджеры помогут подобрать оптимальную программу и подготовить все необходимые документы. Одобрение заявки — от 1 рабочего дня.</p>`,
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=600&q=80&fm=webp",
    title: "День открытых дверей в офисе продаж",
    date: "15.01.2025",
    project: "Все проекты",
    content: `<p>Приглашаем на день открытых дверей в нашем офисе продаж! Мероприятие состоится <strong>25 января</strong> с 10:00 до 18:00.</p>
<h2>Программа</h2>
<ul>
<li>Презентация всех текущих проектов</li>
<li>Индивидуальные консультации с менеджерами</li>
<li>Экскурсии на строительные площадки</li>
<li>Специальные условия покупки только в день мероприятия</li>
</ul>
<p>Для участия необходима предварительная регистрация по телефону или на сайте.</p>`,
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80&fm=webp",
    title: "Итоги 2024 года: рекордные объёмы сдачи",
    date: "30.12.2024",
    project: "Все проекты",
    content: `<p>Подводим итоги 2024 года — он стал рекордным по объёмам сдачи жилья.</p>
<h2>Ключевые цифры</h2>
<ul>
<li>Сдано более <strong>1 200 квартир</strong></li>
<li>Введено в эксплуатацию <strong>4 новых корпуса</strong></li>
<li>Более <strong>85 000 м²</strong> жилой площади</li>
</ul>
<p>Благодарим наших покупателей за доверие и обещаем, что 2025 год принесёт ещё больше новых проектов и возможностей.</p>`,
  },
  {
    id: 9,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80&fm=webp",
    title: "Тектоника получила награду «Лучший застройщик Крыма»",
    date: "20.12.2024",
    project: "Все проекты",
    content: `<p>Компания Тектоника удостоена престижной награды <strong>«Лучший застройщик Крыма 2024»</strong> по версии Национального рейтинга строительных компаний.</p>
<h2>О награде</h2>
<p>Награда присуждается на основании комплексной оценки: качество строительства, соблюдение сроков, уровень сервиса и отзывы покупателей.</p>
<p>«Эта награда — результат работы всей нашей команды. Мы продолжим задавать высокие стандарты качества в регионе», — отметил генеральный директор компании.</p>`,
  },
];

const Publication = () => {
  const { id } = useParams();
  const publication = allPublications.find((p) => p.id === Number(id));

  if (!publication) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#F7F7F7" }}>
        <Header introDone />
        <main className="pt-20">
          <div className="site-container py-20 text-center">
            <h1 className="text-2xl font-medium">Публикация не найдена</h1>
            <Link to="/media" className="text-primary mt-4 inline-block hover:underline">
              Вернуться к медиа
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const otherPubs = allPublications.filter((p) => p.id !== publication.id);
  const recentNews = otherPubs.slice(0, 3);
  const relatedNews = otherPubs.slice(0, 3);

  return (
    <div className="min-h-screen text-foreground" style={{ backgroundColor: "#F7F7F7" }}>
      <Header introDone />

      <main className="pt-20">
        <div className="site-container py-10 md:py-16">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8 flex-wrap">
            <Link to="/" className="hover:text-foreground transition-colors">Главная</Link>
            <span>/</span>
            <Link to="/media" className="hover:text-foreground transition-colors">Медиа</Link>
            <span>/</span>
            <span className="text-foreground line-clamp-1">{publication.title}</span>
          </nav>

          {/* Two-column layout */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
            {/* Main content */}
            <motion.div
              className="flex-1 min-w-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <PublicationContent publication={publication} />
            </motion.div>

            {/* Sidebar */}
            <motion.aside
              className="w-full lg:w-[400px] shrink-0 lg:sticky lg:top-28 lg:self-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            >
              <PublicationSidebar recentNews={recentNews} />
            </motion.aside>
          </div>
        </div>

        {/* Related news — full width */}
        {relatedNews.length > 0 && (
          <section className="site-container py-12 md:py-20">
            <h2 className="font-display text-[24px] md:text-[32px] font-normal tracking-[-0.5px] mb-8">
              Смотрите также
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedNews.map((item) => (
                <NewsCard
                  key={item.id}
                  id={item.id}
                  image={item.image}
                  title={item.title}
                  date={item.date}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Publication;
