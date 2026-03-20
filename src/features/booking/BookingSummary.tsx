"use client";

import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useTranslations } from "next-intl";
import { useAppLocale } from "@/components/layout/LocaleProvider";
import { Panel } from "@/components/ui/panel";
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
  const { locale } = useAppLocale();
  const t = useTranslations("booking");
  const checkInFormatted = format(new Date(stay.checkIn), "dd.MM.yyyy");
  const checkOutFormatted = format(new Date(stay.checkOut), "dd.MM.yyyy");

  return (
    <Panel className={cn("max-w-full space-y-3 bg-surface p-4 sm:space-y-4 sm:p-6", className)} {...props}>
      <div>
        <p className="text-[10px] uppercase tracking-[0.22em] text-secondary">
          {t("stepConfirm")}
        </p>
        <p className="mt-1.5 text-base text-foreground sm:mt-2 sm:text-xl">
          {room ? room.name[locale as "ua" | "en"] : t("selectRoom")}
        </p>
      </div>
      <dl className="space-y-2 text-xs text-foreground/75 sm:space-y-3 sm:text-sm">
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
        <div className="border-t border-black/10 pt-3 sm:pt-4">
          <p className="text-[10px] uppercase tracking-[0.22em] text-secondary">
            {t("rate")}
          </p>
          <p className="mt-1.5 text-lg text-foreground sm:mt-2 sm:text-2xl">{room.rateFrom.toLocaleString("uk-UA")} ₴</p>
        </div>
      ) : null}
    </Panel>
  );
}
