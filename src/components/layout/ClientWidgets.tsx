"use client";

import dynamic from "next/dynamic";

const StickyMobileBookingBar = dynamic(
  () =>
    import("@/features/booking/StickyMobileBookingBar").then(
      (mod) => mod.StickyMobileBookingBar,
    ),
  { ssr: false },
);

export function ClientWidgets() {
  return <StickyMobileBookingBar />;
}
