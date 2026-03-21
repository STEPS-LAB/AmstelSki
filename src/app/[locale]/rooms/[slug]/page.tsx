import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { SectionIntro } from "@/components/ui/section-intro";
import {
  getRelatedRooms,
  getRoomBySlug,
  roomAmenityLabels,
  rooms,
} from "@/lib/content/rooms";
import type { AppLocale } from "@/i18n/routing";
import { pickLocalized } from "@/lib/i18n";
import { RoomCard } from "@/components/rooms/RoomCard";
import { RoomBookingActions } from "@/components/rooms/RoomBookingActions";
import { StructuredData } from "@/components/seo/StructuredData";
import { GalleryGrid } from "@/features/gallery/GalleryGrid";
import { absoluteUrl, createMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return rooms.map((room) => ({ slug: room.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const typedLocale = locale as AppLocale;
  const room = getRoomBySlug(slug);

  if (!room) {
    return {};
  }

  return createMetadata({
    locale: typedLocale,
    pathname: `/rooms/${slug}`,
    title: `${pickLocalized(room.name, typedLocale)} | AmstelSki`,
    description: pickLocalized(room.shortDescription, typedLocale),
  });
}

export default async function RoomDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const typedLocale = locale as AppLocale;
  const room = getRoomBySlug(slug);
  const t = await getTranslations();

  if (!room) {
    notFound();
  }

  const relatedRooms = getRelatedRooms(room.slug, 3);

  return (
    <>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "HotelRoom",
          name: pickLocalized(room.name, typedLocale),
          description: pickLocalized(room.description, typedLocale),
          url: absoluteUrl(`/${typedLocale}/rooms/${room.slug}`),
          occupancy: {
            "@type": "QuantitativeValue",
            maxValue: room.capacity,
          },
        }}
      />
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="absolute inset-0">
          <Image src={room.heroImage} alt={pickLocalized(room.name, typedLocale)} fill className="object-cover" />
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,15,16,0.25),rgba(15,15,16,0.94))]" />
        </div>
        <Container className="relative z-10 py-28 sm:py-32">
          <Badge>{pickLocalized(room.eyebrow, typedLocale)}</Badge>
          <h1 className="mt-6 max-w-4xl font-serif text-5xl text-white sm:text-7xl">
            {pickLocalized(room.name, typedLocale)}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">
            {pickLocalized(room.shortDescription, typedLocale)}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {pickLocalized(room.highlights, typedLocale).map((item) => (
              <Badge key={item}>{item}</Badge>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_0.8fr]">
          <div className="space-y-8">
            <SectionIntro
              title={
                typedLocale === "ua"
                  ? "Опис номера"
                  : "Room narrative"
              }
              copy={pickLocalized(room.description, typedLocale)}
            />
            <GalleryGrid images={room.gallery} />
          </div>
          <div className="space-y-6">
            <div className="rounded-sm border border-white/10 bg-white/[0.03] p-6">
              <p className="text-xs uppercase tracking-[0.22em] text-secondary">
                {typedLocale === "ua" ? "Від" : "From"}
              </p>
              <p className="mt-3 font-serif text-5xl text-white">
                ₴{room.rateFrom.toLocaleString("uk-UA")}
              </p>
              <p className="mt-3 text-sm text-secondary">
                {room.size} m² · {room.capacity} {t("common.guests")}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {room.amenities.map((amenity) => (
                  <Badge key={amenity}>{pickLocalized(roomAmenityLabels[amenity], typedLocale)}</Badge>
                ))}
              </div>
            </div>
            <div className="rounded-sm border border-white/10 bg-white/[0.03] p-6">
              <p className="text-xs uppercase tracking-[0.22em] text-secondary">
                {typedLocale === "ua" ? "Бронювання" : "Booking"}
              </p>
              <p className="mt-4 text-sm leading-7 text-white/72">
                {typedLocale === "ua"
                  ? "Оберіть дати, кількість гостей і надішліть запит на бронювання. Ми зв'яжемося з вами для підтвердження та деталей заїзду."
                  : "Choose your dates, number of guests, and send a booking request. We will contact you to confirm the stay and arrival details."}
              </p>
              <div className="mt-6">
                <RoomBookingActions label={t("common.bookNow")} roomSlug={room.slug} />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-border py-24">
        <Container className="space-y-10">
          <SectionIntro
            title={typedLocale === "ua" ? "Схожі категорії" : "Related rooms"}
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {relatedRooms.map((relatedRoom) => (
              <RoomCard key={relatedRoom.slug} room={relatedRoom} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
