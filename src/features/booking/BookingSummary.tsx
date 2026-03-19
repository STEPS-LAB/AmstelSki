"use client";

import { differenceInCalendarDays } from "date-fns";
import { useLocale, useTranslations } from "next-intl";
import { Panel } from "@/components/ui/panel";
import type { AppLocale } from "@/i18n/routing";
import { pickLocalized } from "@/lib/i18n";
import type { Room } from "@/lib/content/rooms";
import type { BookingStay } from "@/lib/booking/types";

export function BookingSummary({
  stay,
  room,
}: {
  stay: BookingStay;
  room?: Room;
}) {
  const locale = useLocale() as AppLocale;
  const t = useTranslations("booking");
  const nights = Math.max(
    1,
    differenceInCalendarDays(new Date(stay.checkOut), new Date(stay.checkIn)),
  );

  return (
    <Panel className="space-y-4 bg-black/20">
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-secondary">
          {t("stepConfirm")}
        </p>
        <p className="mt-2 text-xl text-white">
          {room ? pickLocalized(room.name, locale) : t("selectRoom")}
        </p>
      </div>
      <dl className="space-y-3 text-sm text-white/75">
        <div className="flex items-center justify-between gap-4">
          <dt>{t("checkIn")}</dt>
          <dd>{stay.checkIn}</dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt>{t("checkOut")}</dt>
          <dd>{stay.checkOut}</dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt>{t("guests")}</dt>
          <dd>
            {stay.adults + stay.children} / {nights} {nights === 1 ? "night" : "nights"}
          </dd>
        </div>
      </dl>
      {room ? (
        <div className="border-t border-white/10 pt-4">
          <p className="text-xs uppercase tracking-[0.22em] text-secondary">
            {locale === "ua" ? "Тариф" : "Rate"}
          </p>
          <p className="mt-2 text-2xl text-white">₴{room.rateFrom.toLocaleString("uk-UA")}</p>
        </div>
      ) : null}
    </Panel>
  );
}
