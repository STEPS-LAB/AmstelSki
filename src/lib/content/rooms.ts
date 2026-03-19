import type { AppLocale } from "@/i18n/routing";
import type { LocalizedValue } from "@/lib/i18n";
import { pickLocalized } from "@/lib/i18n";

export type RoomAmenity =
  | "king-bed"
  | "mountain-view"
  | "balcony"
  | "rainfall-shower"
  | "soundproofing"
  | "work-desk"
  | "ski-locker"
  | "breakfast"
  | "family-bunk"
  | "lounge-area"
  | "soaking-tub"
  | "espresso-bar"
  | "vinyl-player"
  | "private-transfer";

export interface Room {
  slug: string;
  name: LocalizedValue<string>;
  eyebrow: LocalizedValue<string>;
  shortDescription: LocalizedValue<string>;
  description: LocalizedValue<string>;
  rateFrom: number;
  capacity: number;
  size: number;
  featured: boolean;
  heroImage: string;
  gallery: string[];
  amenities: RoomAmenity[];
  highlights: LocalizedValue<string[]>;
}

export const roomAmenityLabels: Record<RoomAmenity, LocalizedValue<string>> = {
  "king-bed": { ua: "Ліжко king size", en: "King size bed" },
  "mountain-view": { ua: "Вид на гори", en: "Mountain view" },
  balcony: { ua: "Приватний балкон", en: "Private balcony" },
  "rainfall-shower": { ua: "Тропічний душ", en: "Rainfall shower" },
  soundproofing: { ua: "Посилена шумоізоляція", en: "Enhanced soundproofing" },
  "work-desk": { ua: "Робоча станція", en: "Work station" },
  "ski-locker": { ua: "Ski locker", en: "Ski locker" },
  breakfast: { ua: "Сніданок à la carte", en: "À la carte breakfast" },
  "family-bunk": { ua: "Дворівневе ліжко", en: "Bunk sleeping nook" },
  "lounge-area": { ua: "Лаунж-зона", en: "Lounge area" },
  "soaking-tub": { ua: "Глибока ванна", en: "Soaking tub" },
  "espresso-bar": { ua: "Еспресо-бар", en: "Espresso bar" },
  "vinyl-player": { ua: "Vinyl player", en: "Vinyl player" },
  "private-transfer": { ua: "Приватний трансфер", en: "Private transfer" },
};

export const rooms: Room[] = [
  {
    slug: "canal-signature",
    name: {
      ua: "Стандарт",
      en: "Standard",
    },
    eyebrow: {
      ua: "Двомісний номер",
      en: "Double room",
    },
    shortDescription: {
      ua: "Зручний номер для двох з видом на гори та можливістю трансформувати спальне місце.",
      en: "A comfortable room for two with mountain views and flexible sleeping setup.",
    },
    description: {
      ua: "Це класичний номер для відпочинку в Буковелі, який добре підходить і для сімейних пар, і для друзів. За потреби двоспальне ліжко трансформується у два окремі, а вид на гори додає відчуття справжнього карпатського відпочинку.",
      en: "This is a classic Bukovel room that suits both couples and friends. The double bed can be transformed into two separate beds when needed, while the mountain view adds to the Carpathian holiday atmosphere.",
    },
    rateFrom: 6200,
    capacity: 2,
    size: 28,
    featured: true,
    heroImage:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80",
    ],
    amenities: [
      "king-bed",
      "mountain-view",
      "rainfall-shower",
      "soundproofing",
      "ski-locker",
      "breakfast",
    ],
    highlights: {
      ua: ["Вид на гори", "Трансформація ліжка", "Комфорт для двох"],
      en: ["Mountain view", "Flexible bed setup", "Comfort for two"],
    },
  },
  {
    slug: "red-brick-deluxe",
    name: {
      ua: "Преміум",
      en: "Premium",
    },
    eyebrow: {
      ua: "Номер для двох",
      en: "Room for two",
    },
    shortDescription: {
      ua: "Світлий і зручний номер із прямим видом на 5-ту трасу та затишний внутрішній двір.",
      en: "A comfortable room with direct views of slope 5 and the inner courtyard.",
    },
    description: {
      ua: "Номер створений для гостей, які хочуть бути максимально близько до активного зимового ритму. Велике двоспальне ліжко, продуманий простір і вдале розташування роблять його сильним вибором для короткого, але комфортного відпочинку.",
      en: "This room is ideal for guests who want to stay close to the winter action. A large double bed, well-planned layout, and excellent location make it a strong option for a short but comfortable stay.",
    },
    rateFrom: 7100,
    capacity: 2,
    size: 32,
    featured: true,
    heroImage:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1505693416388-025c3f8f0b3d?auto=format&fit=crop&w=1600&q=80",
    ],
    amenities: [
      "king-bed",
      "mountain-view",
      "balcony",
      "work-desk",
      "ski-locker",
      "espresso-bar",
    ],
    highlights: {
      ua: ["Вид на 5-ту трасу", "Внутрішній двір", "Зручне розташування"],
      en: ["View of slope 5", "Inner courtyard", "Excellent location"],
    },
  },
  {
    slug: "amstel-suite",
    name: {
      ua: "Люкс",
      en: "Lux",
    },
    eyebrow: {
      ua: "Більше простору",
      en: "More space",
    },
    shortDescription: {
      ua: "Просторіші формати проживання для гостей, які хочуть більше свободи, тиші та комфорту під час відпочинку в Буковелі.",
      en: "More spacious accommodation formats for guests who want extra freedom, calm, and comfort during a stay in Bukovel.",
    },
    description: {
      ua: "Якщо вам потрібен додатковий простір, зручне зонування та відчуття більш приватного проживання, ця категорія стане найкращим варіантом. Вона добре підходить для сімей, довших зупинок і гостей, які особливо цінують комфорт.",
      en: "If you need extra space, better zoning, and a more private feel, this category is the best fit. It works especially well for families, longer stays, and guests who place a high value on comfort.",
    },
    rateFrom: 11200,
    capacity: 3,
    size: 54,
    featured: true,
    heroImage:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80",
    ],
    amenities: [
      "king-bed",
      "lounge-area",
      "soaking-tub",
      "soundproofing",
      "vinyl-player",
      "private-transfer",
    ],
    highlights: {
      ua: ["Більше простору", "Для сімейного відпочинку", "Підвищений комфорт"],
      en: ["More space", "Suitable for families", "Elevated comfort"],
    },
  },
];

export function getRoomBySlug(slug: string) {
  return rooms.find((room) => room.slug === slug);
}

export function getFeaturedRooms() {
  return rooms.filter((room) => room.featured);
}

export function getRelatedRooms(slug: string, limit = 3) {
  return rooms.filter((room) => room.slug !== slug).slice(0, limit);
}

export function getRoomName(room: Room, locale: AppLocale) {
  return pickLocalized(room.name, locale);
}
