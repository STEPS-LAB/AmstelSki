"use client";

import { useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { MobileMenu } from "./MobileMenu";
import { useBooking } from "@/features/booking/BookingProvider";
import { useAppLocale } from "./LocaleProvider";
import { useClientTranslations } from "@/hooks/useClientTranslations";

const navigationItems = [
  { href: "/", labelKey: "navigation.home" },
  { href: "/#about", labelKey: "navigation.about" },
  { href: "/#rooms", labelKey: "navigation.rooms" },
  { href: "/#services", labelKey: "navigation.services" },
  { href: "/#gallery", labelKey: "navigation.gallery" },
  { href: "/contacts", labelKey: "navigation.contacts" },
] as const;

export function Header() {
  const { locale } = useAppLocale();
  const t = useClientTranslations();
  const { openBooking } = useBooking();
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const [scrollProgress, setScrollProgress] = useState(0);

  const isContactsPage = pathname.includes("/contacts") || pathname === `/${locale}/contacts`;

  // Add locale prefix to navigation items
  const localizedNavItems = navigationItems.map((item) => ({
    ...item,
    href: item.href.startsWith("/#") || item.href === "/"
      ? `/${locale}${item.href === "/" ? "" : item.href}`
      : `/${locale}${item.href}`,
  }));

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      const heroHeight = typeof window !== "undefined" ? window.innerHeight : 0;
      const progress = Math.min(Math.max(latest / (heroHeight * 0.7), 0), 1);
      setScrollProgress(progress);
    });
    return () => unsubscribe();
  }, [scrollY]);

  const bgOpacity = 0.1 + scrollProgress * 0.8;
  const isDark = isContactsPage ? false : scrollProgress < 0.3;

  return (
    <header
      className="sticky top-0 z-40 transition-colors duration-500"
      style={{
        backgroundColor: isDark
          ? `rgba(26, 26, 26, ${0.3 - scrollProgress * 0.2})`
          : `rgba(255, 255, 255, ${bgOpacity})`,
        borderBottomWidth: '1px',
        borderColor: isDark
          ? 'rgba(255, 255, 255, 0)'
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
          {localizedNavItems.map((item) => (
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
