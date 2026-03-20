"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { BookingFlow } from "./BookingFlow";
import { useBooking } from "./BookingProvider";

export function BookingDrawer() {
  const t = useTranslations("booking");
  const { isOpen, closeBooking, prefill } = useBooking();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.button
            type="button"
            aria-label={t("back")}
            className="fixed inset-0 z-[98] bg-black/70 backdrop-blur-sm pointer-events-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeBooking}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-1/2 z-[99] flex h-[85vh] w-[92vw] max-w-sm -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-lg bg-primary sm:h-auto sm:max-h-[85vh] pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-shrink-0 items-center justify-between border-b border-black/10 bg-primary/90 px-4 py-2.5 backdrop-blur sm:px-6 sm:py-5">
              <div className="flex w-full items-center justify-between">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.24em] text-secondary">
                    {t("title")}
                  </p>
                  <p className="mt-0.5 font-serif text-lg text-foreground sm:mt-1 sm:text-3xl">AmstelSki</p>
                </div>
                <button
                  type="button"
                  aria-label={t("back")}
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
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
