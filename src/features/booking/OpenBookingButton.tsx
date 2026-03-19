"use client";

import { Button } from "@/components/ui/button";
import { useBooking } from "./BookingProvider";

export function OpenBookingButton({
  label,
  roomSlug,
}: {
  label: string;
  roomSlug?: string;
}) {
  const { openBooking } = useBooking();

  return (
    <Button onClick={() => openBooking({ preferredRoomSlug: roomSlug })}>
      {label}
    </Button>
  );
}
