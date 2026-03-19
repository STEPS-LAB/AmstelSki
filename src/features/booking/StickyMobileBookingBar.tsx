"use client";

import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useBooking } from "./BookingProvider";

export function StickyMobileBookingBar() {
  const t = useTranslations("booking");
  const { openBooking } = useBooking();
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const heroHeight = typeof window !== "undefined" ? window.innerHeight : 0;
    const unsubscribe = scrollY.onChange((latest) => {
      setIsVisible(latest > heroHeight * 0.8);
    });

    return () => unsubscribe();
  }, [scrollY]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-30 border-t border-white/14 bg-[rgba(106,111,116,0.82)] p-3 backdrop-blur md:hidden"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Button className="w-full" onClick={() => openBooking()}>
            {t("sticky")}
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
