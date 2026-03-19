"use client";

import { useAppLocale } from "@/components/layout/LocaleProvider";

type AppLocale = "ua" | "en";

// Translation dictionaries
const translations: Record<AppLocale, Record<string, Record<string, string>>> = {
  ua: {
    common: {
      bookNow: "Забронювати",
      close: "Закрити",
      language: "Мова",
    },
    navigation: {
      home: "Головна",
      about: "Про готель",
      rooms: "Номери",
      services: "Послуги",
      gallery: "Галерея",
      contacts: "Контакти",
    },
    concierge: {
      label: "AI Консьєрж",
      online: "Онлайн",
      intro: "Вітаю! Я ваш AI консьєрж. Чим можу допомогти?",
      placeholder: "Введіть запитання...",
      suggestions: {
        restaurants: "Найкращі ресторани поруч",
        lateCheckin: "Як працює пізній check-in?",
        experiences: "Що робити ввечері?",
        transfer: "Організувати трансфер",
      },
    },
  },
  en: {
    common: {
      bookNow: "Book Now",
      close: "Close",
      language: "Language",
    },
    navigation: {
      home: "Home",
      about: "About",
      rooms: "Rooms",
      services: "Services",
      gallery: "Gallery",
      contacts: "Contacts",
    },
    concierge: {
      label: "AI Concierge",
      online: "Online",
      intro: "Hello! I'm your AI concierge. How can I help?",
      placeholder: "Enter your question...",
      suggestions: {
        restaurants: "Best restaurants nearby",
        lateCheckin: "How does late check-in work?",
        experiences: "What to do in the evening?",
        transfer: "Arrange transfer",
      },
    },
  },
};

export function useClientTranslations() {
  const { locale } = useAppLocale();

  const t = (key: string) => {
    const keys = key.split(".");
    let value: Record<string, any> | string = translations[locale];
    
    for (const k of keys) {
      if (typeof value === "object" && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }
    
    return typeof value === "string" ? value : key;
  };

  return t;
}
