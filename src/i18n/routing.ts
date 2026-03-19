import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ua", "en"],
  defaultLocale: "ua",
  localePrefix: "never",
});

export type AppLocale = (typeof routing.locales)[number];

export function isValidLocale(value: string): value is AppLocale {
  return routing.locales.includes(value as AppLocale);
}

// Remove generateStaticParams since we don't have [locale] routes anymore
