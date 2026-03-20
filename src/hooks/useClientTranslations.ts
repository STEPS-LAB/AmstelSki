"use client";

import { useEffect, useState, useCallback } from "react";
import { useAppLocale } from "@/components/layout/LocaleProvider";

type AppLocale = "ua" | "en";

// Minimal client-side translations (only what's needed for client components)
// This avoids duplicating server-side translations from next-intl
const translations: Record<AppLocale, Record<string, unknown>> = {
  ua: {
    common: {
      bookNow: "Забронювати",
      close: "Закрити",
      language: "Мова",
      allRightsReserved: "Усі права захищені",
      from: "від",
      perNight: "за ніч",
      guests: "гостей",
    },
    navigation: {
      home: "Головна",
      about: "Про готель",
      rooms: "Номери",
      services: "Послуги",
      gallery: "Галерея",
      contacts: "Контакти",
    },
    sections: {
      galleryTitle: "Галерея",
      galleryCopy: "Перегляньте наші вишукані інтер'єри та екстер'єри",
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
    booking: {
      title: "Бронювання",
      stepStay: "Дати",
      stepRoom: "Номер",
      stepGuest: "Дані",
      stepConfirm: "Підтвердження",
      checkIn: "Прибуття",
      checkOut: "Виїзд",
      checkInLabel: "Дата заїзду:",
      checkOutLabel: "Дата виїзду:",
      dates: "Дати",
      selectDates: "Оберіть дати",
      guests: "Гості",
      adults: "Дорослі",
      children: "Діти",
      selectRoom: "Обрати номер",
      continue: "Знайти",
      find: "ЗНАЙТИ",
      back: "Назад",
      checking: "Перевіряємо доступність номерів...",
      reserve: "Підтвердити бронювання",
      successTitle: "Запит на бронювання прийнято",
      successText: "Ми зв'яжемося з вами для підтвердження бронювання та уточнення деталей приїзду.",
      name: "Ім'я",
      email: "Email",
      phone: "Телефон",
      notes: "Побажання",
      rate: "Тариф",
      tonight: "Сьогодні",
      weekend: "На вихідні",
      business: "Для сім'ї",
      sticky: "Забронювати",
      from: "від",
    },
  },
  en: {
    common: {
      bookNow: "Book Now",
      close: "Close",
      language: "Language",
      allRightsReserved: "All rights reserved",
      from: "from",
      perNight: "per night",
      guests: "guests",
    },
    navigation: {
      home: "Home",
      about: "About",
      rooms: "Rooms",
      services: "Services",
      gallery: "Gallery",
      contacts: "Contacts",
    },
    sections: {
      galleryTitle: "Gallery",
      galleryCopy: "Explore our exquisite interiors and exteriors",
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
    booking: {
      title: "Booking",
      stepStay: "Stay",
      stepRoom: "Room",
      stepGuest: "Details",
      stepConfirm: "Confirm",
      checkIn: "Check-in",
      checkOut: "Check-out",
      checkInLabel: "Check-in date:",
      checkOutLabel: "Check-out date:",
      dates: "Dates",
      selectDates: "Select dates",
      guests: "Guests",
      adults: "Adults",
      children: "Children",
      selectRoom: "Select room",
      continue: "Find",
      find: "FIND",
      back: "Back",
      checking: "Checking room availability...",
      reserve: "Confirm booking",
      successTitle: "Booking request received",
      successText: "We will contact you to confirm the booking and clarify your arrival details.",
      name: "Name",
      email: "Email",
      phone: "Phone",
      notes: "Notes",
      rate: "Rate",
      tonight: "Tonight stay",
      weekend: "Weekend stay",
      business: "Family stay",
      sticky: "Book Now",
      from: "from",
    },
  },
};

export function useClientTranslations() {
  const { locale } = useAppLocale();
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const handleLocaleChange = () => forceUpdate((n) => n + 1);
    window.addEventListener('locale-change', handleLocaleChange as EventListener);
    return () => window.removeEventListener('locale-change', handleLocaleChange as EventListener);
  }, []);

  const t = useCallback((key: string) => {
    const keys = key.split(".");
    let value: Record<string, unknown> | string = translations[locale];

    for (const k of keys) {
      if (typeof value === "object" && k in value) {
        value = value[k] as Record<string, unknown> | string;
      } else {
        return key;
      }
    }

    return typeof value === "string" ? value : key;
  }, [locale]);

  return { t, locale };
}
