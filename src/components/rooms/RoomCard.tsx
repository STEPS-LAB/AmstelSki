import Image from "next/image";
import { Users } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import type { Room } from "@/lib/content/rooms";
import { pickLocalized } from "@/lib/i18n";
import { Badge } from "@/components/ui/badge";

export async function RoomCard({
  room,
  locale,
}: {
  room: Room;
  locale: AppLocale;
}) {
  const t = await getTranslations();

  return (
    <article className="group overflow-hidden rounded-sm border border-black/10 bg-black/[0.03]">
      <div className="relative aspect-[8/9] overflow-hidden">
        <Image
          src={room.heroImage}
          alt={pickLocalized(room.name, locale)}
          fill
          className="object-cover transition duration-700 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(255,255,255,0.92)_100%)]" />
        <div className="absolute left-5 top-5">
          <Badge>{pickLocalized(room.eyebrow, locale)}</Badge>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="font-serif text-3xl text-foreground">{pickLocalized(room.name, locale)}</p>
        </div>
      </div>
      <div className="space-y-5 p-5">
        <p className="text-sm leading-6 text-foreground/72">
          {pickLocalized(room.shortDescription, locale)}
        </p>
        <div className="flex flex-wrap gap-2">
          {pickLocalized(room.highlights, locale).map((item) => (
            <Badge key={item}>{item}</Badge>
          ))}
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-black/10 pt-4">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-secondary">{t("common.from")}</p>
            <p className="mt-2 text-2xl text-foreground">
              {room.rateFrom.toLocaleString("uk-UA")} ₴
              <span className="ml-2 text-sm text-secondary">{t("common.perNight")}</span>
            </p>
          </div>
          <div className="inline-flex items-center gap-2 text-sm text-foreground/70">
            <Users className="h-4 w-4" />
            {room.capacity} {t("common.guests")}
          </div>
        </div>
      </div>
    </article>
  );
}
