"use client";

import { useEffect, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { MobileMenu } from "./MobileMenu";
import { useBooking } from "@/features/booking/BookingProvider";

const navigationItems = [
  { href: "/", label: { ua: "Головна", en: "Home" } },
  { href: "/#about", label: { ua: "Про нас", en: "About" } },
  { href: "/#rooms", label: { ua: "Номери", en: "Rooms" } },
  { href: "/#services", label: { ua: "Послуги", en: "Services" } },
  { href: "/#gallery", label: { ua: "Галерея", en: "Gallery" } },
  { href: "/contacts", label: { ua: "Контакти", en: "Contacts" } },
] as const;

const bookNowText = { ua: "Забронювати", en: "Book Now" };

export function Header() {
  const { openBooking } = useBooking();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [locale, setLocale] = useState<"ua" | "en">("ua");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    const savedLocale = localStorage.getItem("locale") as "ua" | "en" | null;
    if (savedLocale) {
      setLocale(savedLocale);
    }
  }, []);

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
                {item.label[locale]}
              </Link>
            ))}
          </nav>
        )}

        {isDesktop && (
          <div className="flex items-center gap-3">
            <LocaleSwitcher variant={isDark ? "dark" : "light"} />
            <Button onClick={() => openBooking()}>{bookNowText[locale]}</Button>
          </div>
        )}

        {!isDesktop && (
          <div className="flex items-center gap-3">
            <LocaleSwitcher variant={isDark ? "dark" : "light"} />
            <MobileMenu variant={isDark ? "dark" : "light"} locale={locale} />
          </div>
        )}
      </Container>
    </header>
  );
}
