"use client";

import { useScroll } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useState, memo } from "react";
import { Button } from "@/components/ui/button";
import { useBooking } from "./BookingProvider";

export const StickyMobileBookingBar = memo(function StickyMobileBookingBar() {
  const t = useTranslations("booking");
  const { openBooking } = useBooking();
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const heroHeight = typeof window !== "undefined" ? window.innerHeight : 0;
    const unsubscribe = scrollY.onChange((latest) => {
      setIsVisible(latest > heroHeight * 0.8);
    });

    return () => unsubscribe();
  }, [scrollY, isMobile]);

  if (!isMobile) return null;

  return (
    <>
      {isVisible && (
        <div
          className="fixed inset-x-0 bottom-0 z-[90] border-t border-black/14 bg-white/90 p-4 backdrop-blur pointer-events-auto"
          style={{
            transform: isVisible ? "translateY(0)" : "translateY(100%)",
            opacity: isVisible ? 1 : 0
          }}
        >
          <Button
            className="w-full h-12 text-base uppercase tracking-[0.15em] bg-accent-red hover:bg-accent-red-strong transition-all duration-300 pointer-events-auto"
            onClick={() => openBooking()}
          >
            {t("sticky")}
          </Button>
        </div>
      )}
    </>
  );
});
