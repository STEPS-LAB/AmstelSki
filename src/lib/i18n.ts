import type { AppLocale } from "@/i18n/routing";

export type LocalizedValue<T> = Record<AppLocale, T>;

export function pickLocalized<T>(value: LocalizedValue<T>, locale: AppLocale): T {
  return value[locale];
}
