import { setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/container";
import { GalleryGrid } from "@/features/gallery/GalleryGrid";
import { rooms } from "@/lib/content/rooms";
import type { AppLocale } from "@/i18n/routing";

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const typedLocale = locale as AppLocale;

  return (
    <>
      <PageHero
        eyebrow={typedLocale === "ua" ? "Галерея" : "Gallery"}
        title={
          typedLocale === "ua"
            ? "Темні інтер'єри, червона цегла, світло зі схилу"
            : "Dark interiors, red brick, and light from the slope"
        }
        copy={
          typedLocale === "ua"
            ? "Візуальний архів AmstelSki: кадри простору, деталей, матеріалів і настрою."
            : "A visual archive of AmstelSki: space, detail, material, and atmosphere."
        }
        image="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=80"
      />
      <section className="py-24">
        <Container>
          <GalleryGrid images={rooms.flatMap((room) => room.gallery).slice(0, 10)} locale={typedLocale} />
        </Container>
      </section>
    </>
  );
}
