"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import {
  BookingContext,
  type BookingPrefill,
  type BookingContextValue,
} from "./booking-context";

const BookingDrawer = dynamic(
  () => import("./BookingDrawer").then((mod) => mod.BookingDrawer),
  { ssr: true },
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

export { useBooking } from "./booking-context";
