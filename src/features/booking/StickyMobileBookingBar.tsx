"use client";

import { useEffect, useState, memo } from "react";
import { Button } from "@/components/ui/button";
import { useBooking } from "./BookingProvider";
import { useClientTranslations } from "@/hooks/useClientTranslations";

export const StickyMobileBookingBar = memo(function StickyMobileBookingBar() {
  const { t } = useClientTranslations();
  const { openBooking } = useBooking();
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
    const heroHeight = window.innerHeight;
    const onScroll = () => setIsVisible(window.scrollY > heroHeight * 0.8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile]);

  if (!isMobile || !isVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[90] border-t border-black/14 bg-white/90 p-4 backdrop-blur pointer-events-auto">
      <Button
        className="w-full h-12 text-base uppercase tracking-[0.15em] bg-accent-red hover:bg-accent-red-strong transition-all duration-300 pointer-events-auto"
        onClick={() => openBooking()}
      >
        {t("booking.sticky")}
      </Button>
    </div>
  );
});
