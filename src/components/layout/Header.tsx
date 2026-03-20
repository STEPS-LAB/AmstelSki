"use client";

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
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const isContactsPage = pathname === "/contacts";
  const isDark = isContactsPage ? false : !scrolled;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isDark
          ? "bg-[#1A1A1A]/10 border-b border-transparent"
          : "bg-white/90 border-b border-black/10"
      } backdrop-blur-md overflow-x-hidden`}
    >
      <Container className="flex h-20 items-center justify-between gap-4 max-w-full">
        <Link href="/" className="flex flex-col">
          <span
            className={`font-serif text-3xl leading-none transition-colors duration-300 ${
              isDark ? "text-white" : "text-foreground"
            }`}
          >
            AmstelSki
          </span>
        </Link>

        {isDesktop && (
          <nav className="flex items-center gap-6">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition-colors duration-300 ${
                  isDark ? "text-white/75 hover:text-white" : "text-foreground-secondary hover:text-foreground"
                }`}
              >
                {t(item.labelKey)}
              </Link>
            ))}
          </nav>
        )}

        {isDesktop && (
          <div className="flex items-center gap-3">
            <LocaleSwitcher variant={isDark ? "dark" : "light"} />
            <Button onClick={() => openBooking()}>{t("common.bookNow")}</Button>
          </div>
        )}

        {!isDesktop && (
          <div className="flex items-center gap-3">
            <LocaleSwitcher variant={isDark ? "dark" : "light"} />
            <MobileMenu variant={isDark ? "dark" : "light"} />
          </div>
        )}
      </Container>
    </header>
  );
}
