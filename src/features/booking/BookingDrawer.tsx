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
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeBooking}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed right-0 top-0 z-[60] h-screen w-full max-w-4xl overflow-y-auto border-l border-white/10 bg-primary"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-primary/90 px-6 py-5 backdrop-blur">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-secondary">
                  {t("title")}
                </p>
                <p className="mt-1 font-serif text-3xl text-white">AmstelSki</p>
              </div>
              <button
                type="button"
                aria-label={t("back")}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white"
                onClick={closeBooking}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="px-6 py-6 sm:px-8">
              <BookingFlow
                onDone={closeBooking}
                preferredRoomSlug={prefill?.preferredRoomSlug}
                suggestionType={prefill?.suggestionType}
                initialStay={prefill?.stay}
              />
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
