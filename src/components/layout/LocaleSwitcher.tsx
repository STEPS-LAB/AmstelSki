"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const locales = ["ua", "en"] as const;

export function LocaleSwitcher({ compact = false, variant = "light" }: { compact?: boolean; variant?: "light" | "dark" }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("common");

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1",
        compact && "w-full justify-between",
      )}
      aria-label={t("language")}
    >
      {locales.map((value) => {
        const isActive = locale === value;
        return (
          <button
            key={value}
            onClick={() => router.replace(pathname, { locale: value })}
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
