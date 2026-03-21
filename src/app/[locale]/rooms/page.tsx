import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/container";
import { rooms } from "@/lib/content/rooms";
import type { AppLocale } from "@/i18n/routing";
import { RoomCard } from "@/components/rooms/RoomCard";

export default async function RoomsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const typedLocale = locale as AppLocale;
  const t = await getTranslations();

  return (
    <>
      <PageHero
        eyebrow={t("navigation.rooms")}
        title={
          typedLocale === "ua"
            ? "Номери для відпочинку в Буковелі"
            : "Rooms designed for your stay in Bukovel"
        }
        copy={
          typedLocale === "ua"
            ? "Стандартні номери, сімейні формати та просторіші категорії для гостей, які цінують зручне розташування, тепло і комфорт після катання."
            : "Standard rooms, family formats, and more spacious categories for guests who value location, warmth, and comfort after skiing."
        }
        image="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1800&q=80"
      />
      <section className="py-24">
        <Container className="grid gap-6 lg:grid-cols-3">
          {rooms.map((room) => (
            <RoomCard key={room.slug} room={room} locale={typedLocale} />
          ))}
        </Container>
      </section>
    </>
  );
}
