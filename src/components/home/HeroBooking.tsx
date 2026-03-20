"use client";

import { Suspense } from "react";
import { BookingBar } from "@/features/booking/BookingBar";

export function HeroBooking() {
  return (
    <Suspense fallback={<div className="h-20" />}>
      <BookingBar />
    </Suspense>
  );
}
