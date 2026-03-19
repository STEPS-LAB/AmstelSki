"use client";

import { addDays, format } from "date-fns";
import { Calendar, Loader2, Users } from "lucide-react";
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
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<"searching" | "found" | null>(null);

  const displayCheckIn = format(new Date(checkIn), "dd.MM.yyyy");
  const displayCheckOut = format(new Date(checkOut), "dd.MM.yyyy");

  const handleFind = () => {
    setIsSearching(true);
    setSearchResult("searching");
    
    setTimeout(() => {
      setSearchResult("found");
      setIsSearching(false);
    }, 2000);
  };

  return (
    <div className="glass-panel rounded-sm p-3 sm:p-4 relative z-20 w-fit mx-auto md:w-fit">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-[6px]">
        <Popover
          isOpen={isDatePopoverOpen}
          onOpenChange={setIsDatePopoverOpen}
          align="start"
          content={
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.2em] text-foreground/60">
                Оберіть дати
              </p>
              <div className="space-y-3">
                <div>
                  <label className="mb-1 block text-sm text-foreground">
                    Дата заїзду:
                  </label>
                  <div className="relative">
                    <input
                      ref={checkInRef}
                      type="date"
                      className="h-12 w-full rounded-sm border border-black/10 bg-black/5 pl-4 pr-10 text-sm text-foreground outline-none placeholder:text-foreground/35 focus:border-accent-red [&::-webkit-calendar-picker-indicator]:opacity-0"
                      value={checkIn}
                      onChange={(event) => {
                        setCheckIn(event.target.value);
                        if (checkOutRef.current && new Date(event.target.value) >= new Date(checkOut)) {
                          setCheckOut(toDateValue(addDays(new Date(event.target.value), 1)));
                        }
                      }}
                      disabled={isSearching}
                    />
                    <Calendar className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground/40" />
                    <button
                      type="button"
                      className="absolute inset-0 h-full w-full cursor-pointer bg-transparent"
                      onClick={() => {
                        checkInRef.current?.showPicker?.();
                        checkInRef.current?.click();
                      }}
                      disabled={isSearching}
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm text-foreground">
                    Дата виїзду:
                  </label>
                  <div className="relative">
                    <input
                      ref={checkOutRef}
                      type="date"
                      className="h-12 w-full rounded-sm border border-black/10 bg-black/5 pl-4 pr-10 text-sm text-foreground outline-none placeholder:text-foreground/35 focus:border-accent-red [&::-webkit-calendar-picker-indicator]:opacity-0"
                      value={checkOut}
                      min={checkIn}
                      onChange={(event) => setCheckOut(event.target.value)}
                      disabled={isSearching}
                    />
                    <Calendar className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground/40" />
                    <button
                      type="button"
                      className="absolute inset-0 h-full w-full cursor-pointer bg-transparent"
                      onClick={() => {
                        checkOutRef.current?.showPicker?.();
                        checkOutRef.current?.click();
                      }}
                      disabled={isSearching}
                    />
                  </div>
                </div>
              </div>
            </div>
          }
        >
          <button
            type="button"
            className="flex h-12 w-full items-center gap-3 rounded-sm border border-black/10 bg-white px-4 text-left text-sm text-foreground/70 hover:bg-white/90 md:w-[400px]"
            disabled={isSearching}
          >
            <Calendar className="h-5 w-5 flex-shrink-0 text-foreground/60" />
            <span className="whitespace-nowrap">Дати:</span>
            <span className="ml-auto font-medium text-foreground">
              {displayCheckIn} — {displayCheckOut}
            </span>
          </button>
        </Popover>

        <div className="flex h-12 w-full items-center rounded-sm border border-black/10 bg-white pl-4 pr-1 md:w-[400px]">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 flex-shrink-0 text-foreground/60" />
              <span className="whitespace-nowrap text-sm text-foreground/70">Гості:</span>
            </div>
            <div className="flex items-center gap-0">
              <button
                type="button"
                className="flex h-10 w-12 items-center justify-center text-xl text-foreground/70"
                onClick={() => setAdults((prev) => Math.max(1, prev - 1))}
                disabled={isSearching}
              >
                −
              </button>
              <span className="w-8 text-center text-sm font-medium text-foreground">{adults}</span>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center text-xl text-foreground/70"
                onClick={() => setAdults((prev) => Math.min(4, prev + 1))}
                disabled={isSearching}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <Button
          className="h-12 w-full md:w-auto uppercase tracking-[0.15em] bg-accent-red hover:bg-accent-red-strong"
          onClick={handleFind}
          disabled={isSearching}
        >
          {isSearching ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            t("find")
          )}
        </Button>
      </div>

      {searchResult === "searching" && (
        <div className="mt-3 flex items-center gap-2 text-sm text-foreground/70">
          <Loader2 className="h-4 w-4 animate-spin text-accent-red" />
          <span>AI підбирає найкращий номер для вашого відпочинку...</span>
        </div>
      )}

      {searchResult === "found" && (
        <div className="mt-3 flex items-center gap-2 text-sm text-foreground/70">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          <span>Підходящий номер знайдено. Перенаправляємо до бронювання...</span>
        </div>
      )}
    </div>
  );
}
