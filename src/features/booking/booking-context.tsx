"use client";

import { createContext, useContext } from "react";
import type { BookingStay, BookingSuggestionType } from "@/lib/booking/types";

export interface BookingPrefill {
  stay?: Partial<BookingStay>;
  preferredRoomSlug?: string;
  suggestionType?: BookingSuggestionType;
}

export interface BookingContextValue {
  isOpen: boolean;
  prefill?: BookingPrefill;
  openBooking: (prefill?: BookingPrefill) => void;
  closeBooking: () => void;
}

export const BookingContext = createContext<BookingContextValue | null>(null);

export function useBooking() {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error("useBooking must be used within BookingProvider");
  }

  return context;
}
