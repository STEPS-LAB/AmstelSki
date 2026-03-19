"use client";

import { useTranslations } from "next-intl";
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

  return (
    <header className="sticky top-0 z-40 border-b border-white/14 bg-[rgba(106,111,116,0.52)] backdrop-blur-md">
      <Container className="flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex flex-col">
          <span className="font-serif text-3xl leading-none text-white">AmstelSki</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-white/75 hover:text-white"
            >
              {t(item.labelKey)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LocaleSwitcher />
          <Button onClick={() => openBooking()}>{t("common.bookNow")}</Button>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <LocaleSwitcher />
          <Button className="hidden sm:inline-flex" onClick={() => openBooking()}>
            {t("common.bookNow")}
          </Button>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
