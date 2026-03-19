"use client";

import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { useAppLocale } from "./LocaleProvider";

const locales = ["ua", "en"] as const;

export function LocaleSwitcher({ compact = false, variant = "light" }: { compact?: boolean; variant?: "light" | "dark" }) {
  const serverLocale = useLocale();
  const { locale, setLocale } = useAppLocale();
  const currentLocale = typeof window !== "undefined" ? locale : serverLocale;

  const handleLocaleChange = (newLocale: "ua" | "en") => {
    setLocale(newLocale);
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1",
        compact && "w-full justify-between",
      )}
      aria-label="Language switcher"
    >
      {locales.map((value) => {
        const isActive = currentLocale === value;
        return (
          <button
            key={value}
            onClick={() => handleLocaleChange(value)}
            className={cn(
              "rounded px-2 py-1 text-xs font-medium uppercase tracking-[0.15em] transition-colors",
              variant === "dark"
                ? isActive
                  ? "bg-white/12 text-white"
                  : "text-white/50 hover:text-white/75"
                : isActive
                  ? "bg-black/12 text-foreground"
                  : "text-foreground/50 hover:text-foreground/75",
            )}
            type="button"
          >
            {value}
          </button>
        );
      })}
    </div>
  );
}
