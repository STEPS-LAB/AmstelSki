"use client";

import { useScroll } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { navigationItems } from "@/lib/content/site-content";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { MobileMenu } from "./MobileMenu";
import { useBooking } from "@/features/booking/BookingProvider";

export function Header() {
  const t = useTranslations();
  const { openBooking } = useBooking();
  const { scrollY } = useScroll();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      const heroHeight = typeof window !== "undefined" ? window.innerHeight : 0;
      // Calculate progress from 0 to 1 over the hero section height
      const progress = Math.min(Math.max(latest / (heroHeight * 0.7), 0), 1);
      setScrollProgress(progress);
    });
    return () => unsubscribe();
  }, [scrollY]);

  // Smooth interpolation for background and text colors
  const bgOpacity = 0.1 + scrollProgress * 0.8; // 0.1 (almost transparent) to 0.9 (solid white)
  const isDark = scrollProgress < 0.3; // Consider dark while mostly on hero

  return (
    <header
      className="sticky top-0 z-40 transition-colors duration-500"
      style={{
        backgroundColor: isDark
          ? `rgba(26, 26, 26, ${0.3 - scrollProgress * 0.2})` // Almost transparent dark on hero
          : `rgba(255, 255, 255, ${bgOpacity})`, // White after hero
        borderBottomWidth: '1px',
        borderColor: isDark
          ? 'rgba(255, 255, 255, 0)' // Invisible border on hero
          : `rgba(0, 0, 0, ${0.1 + scrollProgress * 0.05})`,
        backdropFilter: 'blur(24px)',
      }}
    >
      <Container className="flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex flex-col">
          <span 
            className="font-serif text-3xl leading-none transition-colors duration-500"
            style={{ color: isDark ? '#FFFFFF' : 'var(--foreground)' }}
          >
            AmstelSki
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm transition-colors duration-500"
              style={{ 
                color: isDark ? `rgba(255, 255, 255, 0.75)` : 'var(--foreground-secondary)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = isDark ? '#FFFFFF' : 'var(--foreground)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = isDark ? `rgba(255, 255, 255, 0.75)` : 'var(--foreground-secondary)';
              }}
            >
              {t(item.labelKey)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LocaleSwitcher variant={isDark ? "dark" : "light"} />
          <Button onClick={() => openBooking()}>{t("common.bookNow")}</Button>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <LocaleSwitcher variant={isDark ? "dark" : "light"} />
          <Button className="hidden sm:inline-flex" onClick={() => openBooking()}>
            {t("common.bookNow")}
          </Button>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
