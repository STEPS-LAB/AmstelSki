"use client";

import { useAppLocale } from "./LocaleProvider";
import { useClientTranslations } from "@/hooks/useClientTranslations";
import { Link } from "@/i18n/navigation";
import { contactDetails } from "@/lib/content/site-content";
import { pickLocalized } from "@/lib/i18n";
import type { AppLocale } from "@/i18n/routing";
import { Container } from "@/components/ui/container";

const navigationItems = [
  { href: "/", labelKey: "navigation.home" },
  { href: "/#about", labelKey: "navigation.about" },
  { href: "/#rooms", labelKey: "navigation.rooms" },
  { href: "/#services", labelKey: "navigation.services" },
  { href: "/#gallery", labelKey: "navigation.gallery" },
  { href: "/contacts", labelKey: "navigation.contacts" },
] as const;

export function Footer() {
  const { locale } = useAppLocale();
  const { t } = useClientTranslations();

  return (
    <footer className="bg-[#1A1A1A] pb-20 md:pb-0">
      <Container className="grid gap-10 py-12 lg:grid-cols-[1fr_1.5fr_0.8fr]">
        <div>
          <Link href="/" className="font-serif text-3xl text-white hover:text-white/80">
            AmstelSki
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] font-semibold text-white">
              {locale === "ua" ? "Навігація" : "Navigation"}
            </p>
            <div className="mt-4 flex flex-col gap-3">
              {navigationItems.slice(0, Math.ceil(navigationItems.length / 2)).map((item) => (
                <Link key={item.href} href={item.href} className="text-sm text-white/75 hover:text-white">
                  {t(item.labelKey)}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.22em] font-semibold text-white">&nbsp;</p>
            <div className="mt-4 flex flex-col gap-3">
              {navigationItems.slice(Math.ceil(navigationItems.length / 2)).map((item) => (
                <Link key={item.href} href={item.href} className="text-sm text-white/75 hover:text-white">
                  {t(item.labelKey)}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.22em] font-semibold text-white">
            {locale === "ua" ? "Контакти" : "Contacts"}
          </p>
          <div className="mt-4 space-y-3 text-sm text-white/75">
            <a href={`tel:${contactDetails.phone.replace(/[^\d+]/g, "")}`} className="block hover:text-white">
              {contactDetails.phone}
            </a>
            <a href={`mailto:${contactDetails.email}`} className="block hover:text-white">
              {contactDetails.email}
            </a>
            <p>{pickLocalized(contactDetails.address, locale)}</p>
          </div>
        </div>
      </Container>
      <Container className="border-t border-white/10 py-5 text-center text-xs uppercase tracking-[0.18em] text-white/50">
        {new Date().getFullYear()} AmstelSki. {t("common.allRightsReserved")}
      </Container>
      <div className="py-4 text-center">
        <p className="text-xs uppercase tracking-[0.18em] text-white/50">
          Developed by{" "}
          <a
            href="https://stepslab.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-white hover:text-white/80"
          >
            STEPS LAB
          </a>
        </p>
      </div>
    </footer>
  );
}
