"use client";

import { addDays, format } from "date-fns";
import { Calendar, Loader2, Users } from "lucide-react";
import { useRef, useState, useCallback, memo, useEffect } from "react";
import { useAppLocale } from "@/components/layout/LocaleProvider";
import { Button } from "@/components/ui/button";
import { Popover } from "@/components/ui/popover";
import { toDateValue } from "@/lib/booking/suggestions";

const bookingText = {
  ua: {
    selectDates: "Оберіть дати",
    checkIn: "Дата заїзду:",
    checkOut: "Дата виїзду:",
    dates: "Дати:",
    guests: "Гості:",
    searching: "AI підбирає найкращий номер...",
    found: "Номер знайдено. Перенаправляємо...",
    find: "Знайти",
  },
  en: {
    selectDates: "Select dates",
    checkIn: "Check-in date:",
    checkOut: "Check-out date:",
    dates: "Dates:",
    guests: "Guests:",
    searching: "AI is finding the best room...",
    found: "Room found. Redirecting...",
    find: "Find",
  },
};

export const BookingBar = memo(function BookingBar() {
  const { locale } = useAppLocale();
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

  const handleFind = useCallback(() => {
    setIsSearching(true);
    setSearchResult("searching");
    setTimeout(() => {
      setSearchResult("found");
      setTimeout(() => {
        setIsSearching(false);
        setSearchResult(null);
      }, 1500);
    }, 2000);
  }, []);

  const handleCheckInChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckIn = event.target.value;
    setCheckIn(newCheckIn);
    if (checkOutRef.current && new Date(newCheckIn) >= new Date(checkOut)) {
      setCheckOut(toDateValue(addDays(new Date(newCheckIn), 1)));
    }
  }, [checkOut]);

  const handleCheckOutChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckOut(event.target.value);
  }, []);

  const handleAdultsDecrement = useCallback(() => {
    setAdults((prev) => Math.max(1, prev - 1));
  }, []);

  const handleAdultsIncrement = useCallback(() => {
    setAdults((prev) => Math.min(4, prev + 1));
  }, []);

  // Close popover on scroll to prevent layout issues
  useEffect(() => {
    const handleScroll = () => setIsDatePopoverOpen(false);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="glass-panel rounded-sm px-3 py-3 sm:p-4 relative z-[70] w-fit mx-auto max-w-full">
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
                      onChange={handleCheckInChange}
                      disabled={isSearching}
                    />
                    <Calendar className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground/40" />
                    <button
                      type="button"
                      className="absolute inset-0 h-full w-full cursor-pointer bg-transparent"
                      onClick={() => checkInRef.current?.showPicker?.()}
                      disabled={isSearching}
                      aria-label={text.checkIn}
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
                      onChange={handleCheckOutChange}
                      disabled={isSearching}
                    />
                    <Calendar className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground/40" />
                    <button
                      type="button"
                      className="absolute inset-0 h-full w-full cursor-pointer bg-transparent"
                      onClick={() => checkOutRef.current?.showPicker?.()}
                      disabled={isSearching}
                      aria-label={text.checkOut}
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
            aria-label={text.dates}
          >
            <Calendar className="flex-shrink-0 text-foreground/60" style={{ width: "1rem", height: "1rem" }} />
            <span className="whitespace-nowrap text-xs sm:text-sm text-foreground/70">{text.dates}</span>
            <span className="ml-auto font-medium text-foreground truncate">
              {displayCheckIn} — {displayCheckOut}
            </span>
          </button>
        </Popover>

        <div className="flex h-12 w-full min-w-0 items-center rounded-sm border border-black/10 bg-white pl-3 pr-1 transition-colors hover:bg-gray-50 md:w-[400px]">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="flex-shrink-0 text-foreground/60" style={{ width: "1rem", height: "1rem" }} />
              <span className="whitespace-nowrap text-xs sm:text-sm text-foreground/70">{text.guests}</span>
            </div>
            <div className="flex items-center gap-0">
              <button
                type="button"
                className="flex h-10 w-12 items-center justify-center text-xl text-foreground/70"
                onClick={handleAdultsDecrement}
                disabled={isSearching}
                aria-label="Decrease guests"
              >
                −
              </button>
              <span className="w-8 text-center text-sm font-medium text-foreground">{adults}</span>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center text-xl text-foreground/70"
                onClick={handleAdultsIncrement}
                disabled={isSearching}
                aria-label="Increase guests"
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

      <div
        className={`overflow-hidden transition-all duration-300 ${
          searchResult ? "max-h-20 opacity-100 mt-3" : "max-h-0 opacity-0"
        }`}
      >
        {searchResult === "searching" && (
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
      <div className="invisible h-0 flex items-center gap-2 text-sm text-foreground/70">
        <span className="h-2 w-2 rounded-full bg-green-500" />
        <span>{text.found}</span>
      </div>
    </div>
  );
});
