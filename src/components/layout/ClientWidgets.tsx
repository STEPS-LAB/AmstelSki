"use client";

import dynamic from "next/dynamic";

// Lazy load booking components - not needed for initial paint
const BookingDrawer = dynamic(
  () => import("@/features/booking/BookingDrawer").then((mod) => mod.BookingDrawer),
  { loading: () => null, ssr: false }
);

const StickyMobileBookingBar = dynamic(
  () => import("@/features/booking/StickyMobileBookingBar").then((mod) => mod.StickyMobileBookingBar),
  { loading: () => null, ssr: false }
);

export function ClientWidgets() {
  return (
    <>
      <BookingDrawer />
      <StickyMobileBookingBar />
    </>
  );
}
