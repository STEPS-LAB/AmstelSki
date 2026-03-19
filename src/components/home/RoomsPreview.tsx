import { getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { getFeaturedRooms } from "@/lib/content/rooms";
import { Container } from "@/components/ui/container";
import { SectionIntro } from "@/components/ui/section-intro";
import { RoomCard } from "@/components/rooms/RoomCard";

export async function RoomsPreview({ locale }: { locale: AppLocale }) {
  const t = await getTranslations("sections");
  const rooms = getFeaturedRooms();

  return (
    <section className="py-24">
      <Container className="space-y-12">
        <SectionIntro title={t("roomsTitle")} copy={t("roomsCopy")} />
        <div className="grid gap-6 lg:grid-cols-3">
          {rooms.slice(0, 3).map((room) => (
            <RoomCard key={room.slug} room={room} locale={locale} />
          ))}
        </div>
      </Container>
    </section>
  );
}
