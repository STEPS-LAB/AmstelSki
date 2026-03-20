"use client";

import dynamic from "next/dynamic";

// Lazy load BookingBar to reduce initial bundle
const BookingBar = dynamic(
  () => import("@/features/booking/BookingBar").then((mod) => mod.BookingBar),
  { loading: () => <div className="h-20" /> }
);

export function HeroBooking() {
  return <BookingBar />;
}
