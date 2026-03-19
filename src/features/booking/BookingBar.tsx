"use client";

import { addDays } from "date-fns";
import { Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/field";
import { buildSuggestion, toDateValue } from "@/lib/booking/suggestions";
import { useBooking } from "./BookingProvider";

export function BookingBar() {
  const t = useTranslations("booking");
  const { openBooking } = useBooking();
  const [checkIn, setCheckIn] = useState(toDateValue(new Date()));
  const [checkOut, setCheckOut] = useState(toDateValue(addDays(new Date(), 2)));
  const [adults, setAdults] = useState(2);

  return (
    <div className="glass-panel rounded-sm p-4 sm:p-5">
      <div className="mb-4 flex flex-wrap gap-2">
        {(["tonight", "weekend", "business"] as const).map((preset) => (
          <button
            key={preset}
            type="button"
            className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-white/70"
            onClick={() => {
              const suggestion = buildSuggestion(preset);
              setCheckIn(suggestion.checkIn);
              setCheckOut(suggestion.checkOut);
              setAdults(suggestion.adults);
            }}
          >
            <Sparkles className="mr-2 h-3.5 w-3.5 text-accent-red" />
            {t(preset)}
          </button>
        ))}
      </div>

      <div className="grid gap-3 lg:grid-cols-[1fr_1fr_0.6fr_auto]">
        <Input type="date" value={checkIn} onChange={(event) => setCheckIn(event.target.value)} />
        <Input type="date" value={checkOut} min={checkIn} onChange={(event) => setCheckOut(event.target.value)} />
        <Input
          type="number"
          min={1}
          max={4}
          value={adults}
          onChange={(event) => setAdults(Number(event.target.value))}
        />
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
