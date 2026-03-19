import type { Metadata } from "next";
import { headers } from "next/headers";
import { getMessages, getTranslations } from "next-intl/server";
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

async function getLocaleFromCookie(): Promise<AppLocale> {
  const cookieStore = await headers();
  const cookies = cookieStore.get("cookie");
  const match = cookies?.match(/NEXT_LOCALE=(ua|en)/);
  return match ? (match[1] as AppLocale) : "ua";
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocaleFromCookie();

  return createMetadata({
    locale,
    pathname: "",
    title: "AmstelSki",
    description:
      locale === "ua"
        ? "AmstelSki - маленька Голландія у серці Карпат: комфортні номери, ресторан De Molen, ski room і зручне розташування біля підйомників 2 та 5."
        : "AmstelSki is a little Holland in the heart of the Carpathians, with comfortable rooms, restaurant De Molen, ski storage, and a location near lifts 2 and 5.",
  });
}

export default async function HomePage() {
  const locale = await getLocaleFromCookie();
  const messages = await getMessages({ locale });
  const t = await getTranslations();
  const galleryImages = rooms.flatMap((room) => room.gallery).slice(0, 5);

  return (
    <>
      <StructuredData data={hotelJsonLd(locale)} />
      <StructuredData data={localBusinessJsonLd(locale)} />
      <StructuredData data={reviewJsonLd(locale)} />
      <Hero locale={locale} />
      <div id="about">
        <StorytellingSection locale={locale} />
      </div>
      <div id="rooms">
        <RoomsPreview locale={locale} />
      </div>
      <div id="services">
        <ServicesOverview locale={locale} />
      </div>

      <section id="gallery" className="py-24">
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
