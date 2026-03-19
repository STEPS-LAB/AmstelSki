"use client";

import { addDays } from "date-fns";
import { Calendar } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { buildSuggestion, toDateValue } from "@/lib/booking/suggestions";
import { useBooking } from "./BookingProvider";

export function BookingBar() {
  const t = useTranslations("booking");
  const { openBooking } = useBooking();
  const checkInRef = useRef<HTMLInputElement>(null);
  const checkOutRef = useRef<HTMLInputElement>(null);
  const [checkIn, setCheckIn] = useState(toDateValue(new Date()));
  const [checkOut, setCheckOut] = useState(toDateValue(addDays(new Date(), 2)));
  const [adults, setAdults] = useState(2);

  return (
    <div className="glass-panel rounded-sm p-4 sm:p-5">
      <div className="grid gap-3 lg:grid-cols-[1fr_1fr_0.6fr_auto]">
        <div className="relative">
          <input
            ref={checkInRef}
            type="date"
            className="h-12 w-full rounded-sm border border-white/10 bg-white/5 pl-4 pr-10 text-sm text-white outline-none placeholder:text-white/35 focus:border-accent-red [&::-webkit-calendar-picker-indicator]:opacity-0"
            value={checkIn}
            onChange={(event) => setCheckIn(event.target.value)}
          />
          <Calendar className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
          <button
            type="button"
            className="absolute inset-0 h-full w-full cursor-pointer bg-transparent"
            onClick={() => {
              if (checkInRef.current) {
                checkInRef.current.showPicker?.() || checkInRef.current.click();
              }
            }}
          />
        </div>
        <div className="relative">
          <input
            ref={checkOutRef}
            type="date"
            className="h-12 w-full rounded-sm border border-white/10 bg-white/5 pl-4 pr-10 text-sm text-white outline-none placeholder:text-white/35 focus:border-accent-red [&::-webkit-calendar-picker-indicator]:opacity-0"
            value={checkOut}
            min={checkIn}
            onChange={(event) => setCheckOut(event.target.value)}
          />
          <Calendar className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
          <button
            type="button"
            className="absolute inset-0 h-full w-full cursor-pointer bg-transparent"
            onClick={() => {
              if (checkOutRef.current) {
                checkOutRef.current.showPicker?.() || checkOutRef.current.click();
              }
            }}
          />
        </div>
        <div className="flex items-center gap-2 rounded-sm border border-white/10 bg-white/5 px-4">
          <button
            type="button"
            className="flex h-10 items-center text-sm text-white/70"
            onClick={() => setAdults((prev) => Math.max(1, prev - 1))}
          >
            −
          </button>
          <span className="flex-1 text-center text-sm text-white">{adults}</span>
          <button
            type="button"
            className="flex h-10 items-center text-sm text-white/70"
            onClick={() => setAdults((prev) => Math.min(4, prev + 1))}
          >
            +
          </button>
        </div>
        <Button
          className="w-full"
          onClick={() =>
            openBooking({
              stay: {
                checkIn,
                checkOut,
                adults,
                children: 0,
              },
              suggestionType: "weekend",
            })
          }
        >
          {t("continue")}
        </Button>
      </div>
    </div>
  );
}
