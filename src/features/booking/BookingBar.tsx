"use client";

import { addDays, format } from "date-fns";
import { Calendar, Loader2, Users } from "lucide-react";
import { useRef, useState } from "react";
import { useAppLocale } from "@/components/layout/LocaleProvider";
import { Button } from "@/components/ui/button";
import { Popover } from "@/components/ui/popover";
import { toDateValue } from "@/lib/booking/suggestions";
import { useBooking } from "./BookingProvider";

const bookingText = {
  ua: {
    selectDates: "Оберіть дати",
    checkIn: "Дата заїзду:",
    checkOut: "Дата виїзду:",
    dates: "Дати:",
    guests: "Гості:",
    searching: "AI підбирає найкращий номер для вашого відпочинку...",
    found: "Підходящий номер знайдено. Перенаправляємо до бронювання...",
    find: "Знайти",
  },
  en: {
    selectDates: "Select dates",
    checkIn: "Check-in date:",
    checkOut: "Check-out date:",
    dates: "Dates:",
    guests: "Guests:",
    searching: "AI is finding the best room for your stay...",
    found: "Suitable room found. Redirecting to booking...",
    find: "Find",
  },
};

export function BookingBar() {
  const { locale } = useAppLocale();
  const { openBooking } = useBooking();
  const checkInRef = useRef<HTMLInputElement>(null);
  const checkOutRef = useRef<HTMLInputElement>(null);
  const [checkIn, setCheckIn] = useState(toDateValue(new Date()));
  const [checkOut, setCheckOut] = useState(toDateValue(addDays(new Date(), 2)));
  const [adults, setAdults] = useState(2);
  const [isDatePopoverOpen, setIsDatePopoverOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<"searching" | "found" | null>(null);

  const text = bookingText[locale as "ua" | "en"];
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
    <div className="glass-panel rounded-sm px-3 pb-0 pt-3 sm:p-4 relative z-[70] w-fit mx-auto md:w-fit max-w-full">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-[6px] min-w-0">
        <Popover
          isOpen={isDatePopoverOpen}
          onOpenChange={setIsDatePopoverOpen}
          align="start"
          content={
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.2em] text-foreground/60">
                {text.selectDates}
              </p>
              <div className="space-y-3">
                <div>
                  <label className="mb-1 block text-sm text-foreground">
                    {text.checkIn}
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
                    {text.checkOut}
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
            className="flex h-12 w-full min-w-0 items-center gap-2 rounded-sm border border-black/10 bg-white px-3 text-left text-xs sm:text-sm text-foreground/70 transition-colors hover:bg-gray-50 md:w-[400px]"
            disabled={isSearching}
          >
            <Calendar className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 text-foreground/60" />
            <span className="whitespace-nowrap">{text.dates}</span>
            <span className="ml-auto font-medium text-foreground truncate">
              {displayCheckIn} — {displayCheckOut}
            </span>
          </button>
        </Popover>

        <div className="flex h-12 w-full min-w-0 items-center rounded-sm border border-black/10 bg-white pl-3 pr-1 transition-colors hover:bg-gray-50 md:w-[400px]">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 flex-shrink-0 text-foreground/60" />
              <span className="whitespace-nowrap text-sm text-foreground/70">{text.guests}</span>
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
            text.find
          )}
        </Button>
      </div>

      <div className={`overflow-hidden transition-all duration-300 ${isSearching || searchResult === "found" ? "max-h-20 opacity-100 mt-3" : "max-h-0 opacity-0 mt-0"}`}>
        {isSearching && (
          <div className="flex items-center gap-2 text-sm text-foreground/70">
            <Loader2 className="h-4 w-4 animate-spin text-accent-red" />
            <span>{text.searching}</span>
          </div>
        )}

        {searchResult === "found" && (
          <div className="flex items-center gap-2 text-sm text-foreground/70">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            <span>{text.found}</span>
          </div>
        )}
      </div>

      {/* Hidden spacer to maintain panel width */}
      <div className="invisible h-0 mt-3 flex items-center gap-2 text-sm text-foreground/70">
        <span className="h-2 w-2 rounded-full bg-green-500" />
        <span>{text.found}</span>
      </div>
    </div>
  );
}
