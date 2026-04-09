import aboutCourtyard from "@/assets/about-courtyard.jpg";
import aboutHero from "@/assets/about-hero.jpg";
import constructionPhoto from "@/assets/construction-photo.webp";
import mortgageIllustration from "@/assets/mortgage-illustration.webp";
import partnersConstruction from "@/assets/partners-construction.webp";
import partnersCrane from "@/assets/partners-crane.webp";
import projectHero from "@/assets/project-hero-1.webp";
import valueInterior from "@/assets/value-interior.webp";
import valueNature from "@/assets/value-nature.jpg";

export type StorySlide = {
  id: string;
  title: string;
  description: string;
  image: string;
  duration?: number;
};

export type StoryGroup = {
  id: string;
  title: string;
  cover: string;
  slides: StorySlide[];
};

export const headerStories: StoryGroup[] = [
  {
    id: "launch",
    title: "Новая очередь",
    cover: projectHero,
    slides: [
      {
        id: "launch-1",
        title: "Старт новой очереди",
        description: "Премиальная архитектура, камерные дворы и выразительные фасады в новом этапе проекта.",
        image: projectHero,
        duration: 4800,
      },
      {
        id: "launch-2",
        title: "Видовые квартиры",
        description: "Панорамное остекление, продуманные планировки и светлые общественные пространства.",
        image: aboutHero,
        duration: 4400,
      },
      {
        id: "launch-3",
        title: "Приватный ритм",
        description: "Закрытая территория и архитектура, которая ощущается как отдельный городской мир.",
        image: aboutCourtyard,
        duration: 4200,
      },
    ],
  },
  {
    id: "build",
    title: "Ход строительства",
    cover: partnersCrane,
    slides: [
      {
        id: "build-1",
        title: "Стройка в фокусе",
        description: "Показываем прогресс по ключевым этапам и деталям реализации проекта.",
        image: partnersCrane,
        duration: 4200,
      },
      {
        id: "build-2",
        title: "Работы на площадке",
        description: "Фасады, инженерия и темп работ — все в динамике, как в настоящих stories.",
        image: partnersConstruction,
        duration: 4200,
      },
      {
        id: "build-3",
        title: "Детали реализации",
        description: "От монолита до благоустройства: фиксируем каждый важный шаг на площадке.",
        image: constructionPhoto,
        duration: 4200,
      },
    ],
  },
  {
    id: "lifestyle",
    title: "Атмосфера",
    cover: valueInterior,
    slides: [
      {
        id: "lifestyle-1",
        title: "Интерьеры без шума",
        description: "Спокойная палитра, выверенные материалы и ощущение приватного клуба.",
        image: valueInterior,
        duration: 4200,
      },
      {
        id: "lifestyle-2",
        title: "Природа рядом",
        description: "Маршруты для прогулок, воздух и мягкое озеленение вокруг жилого квартала.",
        image: valueNature,
        duration: 4200,
      },
      {
        id: "lifestyle-3",
        title: "Тихий внутренний двор",
        description: "Камерный масштаб и ландшафт, который работает на ощущение дома.",
        image: aboutCourtyard,
        duration: 4200,
      },
    ],
  },
];
