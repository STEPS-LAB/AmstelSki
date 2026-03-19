"use client";

import { BookingDrawer } from "@/features/booking/BookingDrawer";
import { StickyMobileBookingBar } from "@/features/booking/StickyMobileBookingBar";

export function ClientWidgets() {
  return (
    <>
      <BookingDrawer />
      <StickyMobileBookingBar />
    </>
  );
}
