import { addDays, getDay, nextFriday } from "date-fns";
import { rooms } from "@/lib/content/rooms";
import type { BookingStay, BookingSuggestionType } from "./types";

const BUSINESS_ROOM_ORDER = ["amstel-suite", "red-brick-deluxe", "canal-signature"];
const WEEKEND_ROOM_ORDER = ["red-brick-deluxe", "amstel-suite", "canal-signature"];
const TONIGHT_ROOM_ORDER = ["canal-signature", "red-brick-deluxe", "duplex-family-studio"];

export function buildSuggestion(type: BookingSuggestionType, now = new Date()): BookingStay {
  const normalized = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  if (type === "tonight") {
    return {
      checkIn: toDateValue(normalized),
      checkOut: toDateValue(addDays(normalized, 1)),
      adults: 2,
      children: 0,
    };
  }

  if (type === "business") {
    const monday = getDay(normalized) === 1 ? normalized : addDays(normalized, (8 - getDay(normalized)) % 7);

    return {
      checkIn: toDateValue(monday),
      checkOut: toDateValue(addDays(monday, 2)),
      adults: 1,
      children: 0,
    };
  }

  const friday = getDay(normalized) === 5 ? normalized : nextFriday(normalized);

  return {
    checkIn: toDateValue(friday),
    checkOut: toDateValue(addDays(friday, 2)),
    adults: 2,
    children: 0,
  };
}

export function getSuggestedRoomSlugs(type: BookingSuggestionType) {
  const ranking =
    type === "business"
      ? BUSINESS_ROOM_ORDER
      : type === "weekend"
        ? WEEKEND_ROOM_ORDER
        : TONIGHT_ROOM_ORDER;

  return ranking.filter((slug) => rooms.some((room) => room.slug === slug));
}

export function toDateValue(date: Date) {
  return date.toISOString().split("T")[0]!;
}
