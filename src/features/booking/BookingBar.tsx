"use client";

import { addDays, format } from "date-fns";
import { Calendar, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover } from "@/components/ui/popover";
import { toDateValue } from "@/lib/booking/suggestions";
import { useBooking } from "./BookingProvider";

export function BookingBar() {
  const t = useTranslations("booking");
  const { openBooking } = useBooking();
  const checkInRef = useRef<HTMLInputElement>(null);
  const checkOutRef = useRef<HTMLInputElement>(null);
  const [checkIn, setCheckIn] = useState(toDateValue(new Date()));
  const [checkOut, setCheckOut] = useState(toDateValue(addDays(new Date(), 2)));
  const [adults, setAdults] = useState(2);
  const [isDatePopoverOpen, setIsDatePopoverOpen] = useState(false);

  const displayCheckIn = format(new Date(checkIn), "dd.MM");
  const displayCheckOut = format(new Date(checkOut), "dd.MM");

  return (
    <div className="glass-panel rounded-sm p-4 sm:p-5">
      <div className="flex flex-col gap-3">
        <Popover
          isOpen={isDatePopoverOpen}
          onOpenChange={setIsDatePopoverOpen}
          align="start"
          content={
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                Оберіть дати
              </p>
              <div className="space-y-3">
                <div>
                  <label className="mb-1 block text-sm text-white">
                    Дата заїзду:
                  </label>
                  <div className="relative">
                    <input
                      ref={checkInRef}
                      type="date"
                      className="h-12 w-full rounded-sm border border-white/10 bg-white/5 pl-4 pr-10 text-sm text-white outline-none placeholder:text-white/35 focus:border-accent-red [&::-webkit-calendar-picker-indicator]:opacity-0"
                      value={checkIn}
                      onChange={(event) => {
                        setCheckIn(event.target.value);
                        if (checkOutRef.current && new Date(event.target.value) >= new Date(checkOut)) {
                          setCheckOut(toDateValue(addDays(new Date(event.target.value), 1)));
                        }
                      }}
                    />
                    <Calendar className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
                    <button
                      type="button"
                      className="absolute inset-0 h-full w-full cursor-pointer bg-transparent"
                      onClick={() => {
                        checkInRef.current?.showPicker?.();
                        checkInRef.current?.click();
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm text-white">
                    Дата виїзду:
                  </label>
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
                        checkOutRef.current?.showPicker?.();
                        checkOutRef.current?.click();
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          }
        >
          <button
            type="button"
            className="flex h-12 w-full items-center gap-3 rounded-sm border border-white/10 bg-white/5 px-4 text-left text-sm text-white/70 hover:bg-white/10"
          >
            <Calendar className="h-5 w-5 flex-shrink-0 text-white/40" />
            <span className="whitespace-nowrap">Дати:</span>
            <span className="ml-auto font-medium text-white">
              {displayCheckIn} - {displayCheckOut}
            </span>
          </button>
        </Popover>

        <div className="flex h-12 w-full items-center rounded-sm border border-white/10 bg-white/5 pl-4 pr-1">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-1">
              <Users className="h-5 w-5 flex-shrink-0 text-white/40" />
              <span className="whitespace-nowrap text-sm text-white/70">Гості:</span>
            </div>
            <div className="flex items-center gap-0">
              <button
                type="button"
                className="flex h-10 w-12 items-center justify-center text-xl text-white/70"
                onClick={() => setAdults((prev) => Math.max(1, prev - 1))}
              >
                −
              </button>
              <span className="w-8 text-center text-lg font-medium text-white">{adults}</span>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center text-xl text-white/70"
                onClick={() => setAdults((prev) => Math.min(4, prev + 1))}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <Button
          className="h-12 w-full uppercase tracking-[0.15em] bg-accent-red hover:bg-accent-red-strong"
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
