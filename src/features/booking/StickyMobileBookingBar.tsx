"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { useBooking } from "./BookingProvider";

export function StickyMobileBookingBar() {
  const t = useTranslations("booking");
  const { openBooking } = useBooking();

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/14 bg-[rgba(106,111,116,0.82)] p-3 backdrop-blur md:hidden">
      <Button className="w-full" onClick={() => openBooking()}>
        {t("sticky")}
      </Button>
    </div>
  );
}
