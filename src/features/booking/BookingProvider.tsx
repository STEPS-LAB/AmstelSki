"use client";

import { createContext, useContext, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import type { BookingStay, BookingSuggestionType } from "@/lib/booking/types";

interface BookingPrefill {
  stay?: Partial<BookingStay>;
  preferredRoomSlug?: string;
  suggestionType?: BookingSuggestionType;
}

interface BookingContextValue {
  isOpen: boolean;
  prefill?: BookingPrefill;
  openBooking: (prefill?: BookingPrefill) => void;
  closeBooking: () => void;
}

const BookingContext = createContext<BookingContextValue | null>(null);

// Lazy load BookingDrawer to avoid hydration mismatch
const BookingDrawer = dynamic(
  () => import("./BookingDrawer").then((mod) => mod.BookingDrawer),
  { ssr: true }
);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [prefill, setPrefill] = useState<BookingPrefill | undefined>();

  const value = useMemo<BookingContextValue>(
    () => ({
      isOpen,
      prefill,
      openBooking(nextPrefill) {
        setPrefill(nextPrefill);
        setIsOpen(true);
      },
      closeBooking() {
        setIsOpen(false);
      },
    }),
    [isOpen, prefill],
  );

  return (
    <BookingContext.Provider value={value}>
      {children}
      <BookingDrawer />
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error("useBooking must be used within BookingProvider");
  }

  return context;
}
