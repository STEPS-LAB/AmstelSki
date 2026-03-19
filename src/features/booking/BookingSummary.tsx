import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { differenceInCalendarDays, format } from "date-fns";
import { useLocale, useTranslations } from "next-intl";
import { Panel } from "@/components/ui/panel";
import type { AppLocale } from "@/i18n/routing";
import { pickLocalized } from "@/lib/i18n";
import type { Room } from "@/lib/content/rooms";
import type { BookingStay } from "@/lib/booking/types";

export function BookingSummary({
  stay,
  room,
  className,
  ...props
}: {
  stay: BookingStay;
  room?: Room;
  className?: string;
} & HTMLAttributes<HTMLDivElement>) {
  const locale = useLocale() as AppLocale;
  const t = useTranslations("booking");
  const nights = Math.max(
    1,
    differenceInCalendarDays(new Date(stay.checkOut), new Date(stay.checkIn)),
  );

  const checkInFormatted = format(new Date(stay.checkIn), "dd.MM.yyyy");
  const checkOutFormatted = format(new Date(stay.checkOut), "dd.MM.yyyy");

  return (
    <Panel className={cn("max-w-full space-y-3 bg-black/20 p-4 sm:space-y-4 sm:p-6", className)} {...props}>
      <div>
        <p className="text-[10px] uppercase tracking-[0.22em] text-secondary">
          {t("stepConfirm")}
        </p>
        <p className="mt-1.5 text-base text-white sm:mt-2 sm:text-xl">
          {room ? pickLocalized(room.name, locale) : t("selectRoom")}
        </p>
      </div>
      <dl className="space-y-2 text-xs text-white/75 sm:space-y-3 sm:text-sm">
        <div className="flex items-center justify-between gap-4">
          <dt>{t("checkIn")}</dt>
          <dd>{checkInFormatted}</dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt>{t("checkOut")}</dt>
          <dd>{checkOutFormatted}</dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt>{t("guests")}</dt>
          <dd>{stay.adults + stay.children}</dd>
        </div>
      </dl>
      {room ? (
        <div className="border-t border-white/10 pt-3 sm:pt-4">
          <p className="text-[10px] uppercase tracking-[0.22em] text-secondary">
            {locale === "ua" ? "Тариф" : "Rate"}
          </p>
          <p className="mt-1.5 text-lg text-white sm:mt-2 sm:text-2xl">{room.rateFrom.toLocaleString("uk-UA")} ₴</p>
        </div>
      ) : null}
    </Panel>
  );
}
