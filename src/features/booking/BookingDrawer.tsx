"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import { BookingFlow } from "./BookingFlow";
import { useBooking } from "./booking-context";
import { useClientTranslations } from "@/hooks/useClientTranslations";

export function BookingDrawer() {
  const { t } = useClientTranslations();
  const { isOpen, closeBooking, prefill } = useBooking();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const previousPosition = window.scrollY;
    
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${previousPosition}px`;
    document.body.style.width = "100%";

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, previousPosition);
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-[98] bg-white/30 backdrop-blur-md pointer-events-auto"
            onClick={closeBooking}
          />
          <div
            className="fixed left-1/2 top-1/2 z-[99] flex h-[85vh] w-[92vw] max-w-sm -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-lg bg-primary sm:h-auto sm:max-h-[85vh] pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-shrink-0 items-center justify-between border-b border-black/10 bg-primary/90 px-4 py-2.5 backdrop-blur sm:px-6 sm:py-5">
              <div className="flex w-full items-center justify-between">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.24em] text-secondary">
                    {t("booking.title")}
                  </p>
                  <p className="mt-0.5 font-serif text-lg text-foreground sm:mt-1 sm:text-3xl">AmstelSki</p>
                </div>
                <button
                  type="button"
                  aria-label={t("booking.back")}
                  className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-black/10 bg-black/5 text-foreground sm:h-11 sm:w-11"
                  onClick={closeBooking}
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto px-4 pb-4 pt-3 sm:px-6 sm:pb-6 sm:pt-5">
              <div className="w-full">
                <BookingFlow
                  onDone={closeBooking}
                  preferredRoomSlug={prefill?.preferredRoomSlug}
                  suggestionType={prefill?.suggestionType}
                  initialStay={prefill?.stay}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
