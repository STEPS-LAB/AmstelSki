import type { LocalizedValue } from "@/lib/i18n";

export interface BlogPostPreview {
  slug: string;
  category: LocalizedValue<string>;
  title: LocalizedValue<string>;
  excerpt: LocalizedValue<string>;
  readTime: string;
}

export const blogPosts: BlogPostPreview[] = [
  {
    slug: "48-hours-in-bukovel",
    category: { ua: "Новини", en: "News" },
    title: {
      ua: "Як провести вікенд у Буковелі з максимальним комфортом",
      en: "How to spend a comfortable weekend in Bukovel",
    },
    excerpt: {
      ua: "Добірка простих рекомендацій для гостей, які хочуть поєднати катання, відпочинок і вечерю в De Molen без зайвого поспіху.",
      en: "A simple set of recommendations for guests who want to combine skiing, rest, and dinner at De Molen without rushing.",
    },
    readTime: "4 min",
  },
  {
    slug: "design-language-of-amstelski",
    category: { ua: "Деталі", en: "Details" },
    title: {
      ua: "Що робить AmstelSki особливим у Буковелі",
      en: "What makes AmstelSki special in Bukovel",
    },
    excerpt: {
      ua: "Голландська архітектура, близькість до витягів, тиша в номерах і сервіс, який дійсно відчувається у щоденному відпочинку.",
      en: "Dutch-inspired architecture, proximity to the lifts, quiet rooms, and a level of service guests feel every day.",
    },
    readTime: "3 min",
  },
  {
    slug: "private-arrival-playbook",
    category: { ua: "Сервіс", en: "Service" },
    title: {
      ua: "Пізній заїзд, зберігання спорядження та інші зручності",
      en: "Late arrival, ski storage, and other useful comforts",
    },
    excerpt: {
      ua: "Коротко про те, що допомагає гостям почуватися впевнено: особистий ключ, ski room, підтримка команди та комфортна логістика.",
      en: "A quick look at the features that make stays easier: a personal key, ski room, team support, and comfortable logistics.",
    },
    readTime: "5 min",
  },
];
