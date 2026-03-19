"use client";

import { Button } from "@/components/ui/button";
import { useBooking } from "@/features/booking/BookingProvider";

export function RoomBookingActions({
  label,
  roomSlug,
}: {
  label: string;
  roomSlug: string;
}) {
  const { openBooking } = useBooking();

  return (
    <>
      <Button
        className="w-full"
        onClick={() => openBooking({ preferredRoomSlug: roomSlug })}
      >
        {label}
      </Button>
      <button
        type="button"
        className="glass-panel fixed bottom-24 right-6 z-20 hidden rounded-full px-5 py-4 text-xs uppercase tracking-[0.22em] text-white md:inline-flex"
        onClick={() => openBooking({ preferredRoomSlug: roomSlug })}
      >
        {label}
      </button>
    </>
  );
}
