import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { RoomsPreview } from "@/components/home/RoomsPreview";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { StorytellingSection } from "@/components/home/StorytellingSection";
import { Container } from "@/components/ui/container";
import { SectionIntro } from "@/components/ui/section-intro";
import { GalleryGrid } from "@/features/gallery/GalleryGrid";
import { TestimonialsSlider } from "@/features/testimonials/TestimonialsSlider";
import { rooms } from "@/lib/content/rooms";
import type { AppLocale } from "@/i18n/routing";
import { StructuredData } from "@/components/seo/StructuredData";
import {
  createMetadata,
  hotelJsonLd,
  localBusinessJsonLd,
  reviewJsonLd,
} from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const typedLocale = locale as AppLocale;

  return createMetadata({
    locale: typedLocale,
    pathname: "",
    title:
      typedLocale === "ua"
        ? "AmstelSki | Luxury Boutique Hotel in Bukovel"
        : "AmstelSki | Luxury Boutique Hotel in Bukovel",
    description:
      typedLocale === "ua"
        ? "AmstelSki - маленька Голландія у серці Карпат: комфортні номери, ресторан De Molen, ski room і зручне розташування біля підйомників 2 та 5."
        : "AmstelSki is a little Holland in the heart of the Carpathians, with comfortable rooms, restaurant De Molen, ski storage, and a location near lifts 2 and 5.",
  });
}

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const typedLocale = locale as AppLocale;
  const t = await getTranslations();
  const galleryImages = rooms.flatMap((room) => room.gallery).slice(0, 5);

  return (
    <>
      <StructuredData data={hotelJsonLd(typedLocale)} />
      <StructuredData data={localBusinessJsonLd(typedLocale)} />
      <StructuredData data={reviewJsonLd(typedLocale)} />
      <Hero locale={typedLocale} />
      <StorytellingSection locale={typedLocale} />
      <RoomsPreview locale={typedLocale} />
      <ServicesOverview locale={typedLocale} />

      <section className="py-24">
        <Container className="space-y-10">
          <SectionIntro
            title={t("sections.galleryTitle")}
            copy={t("sections.galleryCopy")}
          />
          <GalleryGrid images={galleryImages} title={t("sections.galleryTitle")} />
        </Container>
      </section>

      <TestimonialsSlider />
    </>
  );
}
