import type { LocalizedValue } from "@/lib/i18n";

export const navigationItems = [
  { href: "/", labelKey: "navigation.home" },
  { href: "/rooms", labelKey: "navigation.rooms" },
  { href: "/about", labelKey: "navigation.about" },
  { href: "/services", labelKey: "navigation.services" },
  { href: "/gallery", labelKey: "navigation.gallery" },
  { href: "/blog", labelKey: "navigation.blog" },
  { href: "/faq", labelKey: "navigation.faq" },
  { href: "/contacts", labelKey: "navigation.contacts" },
] as const;

export const heroHighlights: LocalizedValue<string[]> = {
  ua: ["Підйомники 2 та 5 поруч", "Ресторан De Molen", "Ski room і паркінг"],
  en: ["Near lifts 2 and 5", "De Molen restaurant", "Ski room and parking"],
};

export const storytellingSections = [
  {
    id: "architecture",
    title: { ua: "Архітектура", en: "Architecture" },
    description: {
      ua: "AmstelSki - це маленький куточок Амстердама у серці Карпат. У характері готелю збережено голландський класицизм, чорний будинок кінця XV століття та фасади з червоної цегли.",
      en: "AmstelSki brings a little piece of Amsterdam to the heart of the Carpathians, drawing on Dutch classicism, a black XV century house, and red-brick facades.",
    },
  },
  {
    id: "comfort",
    title: { ua: "Комфорт", en: "Comfort" },
    description: {
      ua: "У номерах продумано все, що справді важливо після активного дня: тиша, стабільне тепло, якісна сантехніка, зручні ліжка та приємні деталі, які роблять відпочинок безтурботним.",
      en: "Rooms are shaped around the details that matter after an active day: quiet, steady warmth, quality fixtures, comfortable beds, and thoughtful touches throughout the stay.",
    },
  },
  {
    id: "service",
    title: { ua: "Сервіс", en: "Service" },
    description: {
      ua: "Електронний ключ, цілодобова допомога, швидке реагування команди, room service і уважність до дрібниць створюють сервіс, до якого хочеться повертатися.",
      en: "A single electronic key, round-the-clock support, quick staff response, room service, and attention to detail create a service standard guests remember.",
    },
  },
  {
    id: "location",
    title: { ua: "Локація", en: "Location" },
    description: {
      ua: "Готель розташований дуже близько до підйомників 2 та 5. Це означає менше часу на логістику і більше часу на катання, вечерю та спокійний відпочинок.",
      en: "The hotel is located very close to lifts 2 and 5, which means less time spent on logistics and more time for skiing, dinner, and proper rest.",
    },
  },
];

export const serviceCards = [
  {
    title: { ua: "Особистий ключ", en: "Personal key" },
    description: {
      ua: "Єдиний електронний ключ відкриває номер, шафки для зберігання лижного спорядження та доступ до паркінгу.",
      en: "A single electronic key gives access to your room, ski storage lockers, and parking.",
    },
  },
  {
    title: { ua: "Зберігання спорядження", en: "Gear storage" },
    description: {
      ua: "Окреме приміщення для сушіння одягу та зберігання лижного спорядження з індивідуальними шафами.",
      en: "A dedicated space for drying clothing and storing ski equipment in individual lockers.",
    },
  },
  {
    title: { ua: "Цілодобовий сервіс", en: "24/7 service" },
    description: {
      ua: "Команда готелю готова допомогти у будь-який час доби - від пізнього заїзду до організації відпочинку.",
      en: "The hotel team is ready to help at any hour, from late arrivals to coordinating your stay.",
    },
  },
  {
    title: { ua: "Ресторан De Molen", en: "Restaurant De Molen" },
    description: {
      ua: "Два зали ресторану, європейська кухня та українська гостинність - одна з переваг, яку гості згадують найчастіше.",
      en: "Two restaurant halls, European cuisine, and warm Ukrainian hospitality make De Molen one of the hotel’s most memorable advantages.",
    },
  },
];

export const testimonials = [
  {
    author: "Andriy Vakaruk",
    rating: 5,
    quote: {
      ua: "Прекрасний новий готель подалі від шуму, з сучасним інтер'єром, сильним рестораном і дуже зручною лижною кімнатою.",
      en: "A beautiful new hotel away from the noise, with modern interiors, a strong restaurant, and a very convenient ski room.",
    },
  },
  {
    author: "Roman Panevnyk",
    rating: 5,
    quote: {
      ua: "Тихо, тепло, зручне розташування біля витягів, паркінг і кухня на рівні - саме за це гості повертаються знову.",
      en: "Quiet, warm, close to the lifts, with parking and excellent food - exactly the combination guests want to return to.",
    },
  },
  {
    author: "Olga Ostapenko",
    rating: 5,
    quote: {
      ua: "Усе продумано до дрібниць: сантехніка, текстиль, room service, пральня, тепло в номері й справді уважне ставлення до гостей.",
      en: "Everything feels carefully considered: fixtures, linens, room service, laundry, warmth in the room, and genuinely attentive hospitality.",
    },
  },
  {
    author: "Natalia Kovalenko",
    rating: 5,
    quote: {
      ua: "Ідеальне поєднання комфорту та сервісу. Персонал неймовірно уважний, а номери перевершують усі очікування.",
      en: "The perfect blend of comfort and service. The staff is incredibly attentive, and the rooms exceed all expectations.",
    },
  },
];

export const faqs = [
  {
    question: {
      ua: "Чи можна заїхати пізно ввечері?",
      en: "Can I arrive late at night?",
    },
    answer: {
      ua: "Так. Команда готелю допоможе з пізнім заїздом і за потреби підкаже найзручніший сценарій прибуття.",
      en: "Yes. The team can support late arrivals and help you choose the most convenient arrival option.",
    },
  },
  {
    question: {
      ua: "Чи є прямий доступ до схилу?",
      en: "Is there direct slope access?",
    },
    answer: {
      ua: "Так. Готель розташований поруч із підйомниками 2 та 5, тому до трас можна швидко дістатися без зайвої логістики.",
      en: "Yes. The hotel is located near lifts 2 and 5, so getting onto the slopes is fast and straightforward.",
    },
  },
  {
    question: {
      ua: "Чи підходить готель для сімей?",
      en: "Is the hotel suited for families?",
    },
    answer: {
      ua: "Так. Є номери для сімей, зручне зберігання речей і спорядження, а також комфортна інфраструктура для відпочинку з дітьми.",
      en: "Yes. There are family-friendly room options, convenient gear storage, and comfortable infrastructure for stays with children.",
    },
  },
  {
    question: {
      ua: "Чи можна забронювати ресторан окремо?",
      en: "Can I reserve the restaurant separately?",
    },
    answer: {
      ua: "Так. Ресторан De Molen приймає гостей окремо та добре підходить для вечері після активного дня в горах.",
      en: "Yes. Restaurant De Molen welcomes separate reservations and is ideal for dinner after a full day in the mountains.",
    },
  },
];

export const mapLocations = [
  {
    id: "hotel",
    x: 46,
    y: 54,
    title: { ua: "AmstelSki", en: "AmstelSki" },
    description: {
      ua: "Готель, ресторан De Molen, ski room та основний сервісний простір.",
      en: "The hotel, restaurant De Molen, ski room, and the core service area.",
    },
  },
  {
    id: "lift2",
    x: 58,
    y: 34,
    title: { ua: "Підйомник 2", en: "Lift 2" },
    description: {
      ua: "Одна з ключових точок для швидкого старту катання.",
      en: "One of the main access points for getting onto the slopes quickly.",
    },
  },
  {
    id: "lift5",
    x: 70,
    y: 43,
    title: { ua: "Підйомник 5", en: "Lift 5" },
    description: {
      ua: "Зручний варіант для гостей, які хочуть бути максимально близько до траси.",
      en: "A convenient option for guests who want to stay very close to the slope.",
    },
  },
  {
    id: "restaurants",
    x: 34,
    y: 70,
    title: { ua: "De Molen", en: "De Molen" },
    description: {
      ua: "Ресторан готелю з європейською кухнею та атмосферою, яку часто відзначають у відгуках.",
      en: "The hotel restaurant with European cuisine and an atmosphere frequently praised by guests.",
    },
  },
];

export const contactDetails = {
  phone: "+38 (068) 880 88 05",
  email: "stay@amstelski.com",
  address: {
    ua: "участок Вишні 332, 332а, с. Поляниця, Яремче, Івано-Франківська область, 78593",
    en: "Vyshni area 332, 332a, Polianytsia, Yaremche, Ivano-Frankivsk region, 78593",
  },
};
