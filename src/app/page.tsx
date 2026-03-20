import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Hero } from "@/components/home/Hero";
import { RoomsPreview } from "@/components/home/RoomsPreview";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { StorytellingSection } from "@/components/home/StorytellingSection";
import { Container } from "@/components/ui/container";
import { SectionIntro } from "@/components/ui/section-intro";
import { SectionSkeleton } from "@/components/ui/SectionSkeleton";
import { rooms } from "@/lib/content/rooms";
import { StructuredData } from "@/components/seo/StructuredData";
import {
  createMetadata,
  hotelJsonLd,
  localBusinessJsonLd,
  reviewJsonLd,
} from "@/lib/seo";
import { cookies } from "next/headers";

// Lazy load below-the-fold components to reduce initial bundle
const GalleryGrid = dynamic(
  () => import("@/features/gallery/GalleryGrid").then((mod) => mod.GalleryGrid),
  { loading: () => <SectionSkeleton /> }
);

const TestimonialsSlider = dynamic(
  () => import("@/features/testimonials/TestimonialsSlider").then((mod) => mod.TestimonialsSlider),
  { loading: () => <SectionSkeleton /> }
);

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("NEXT_LOCALE")?.value;
  const locale = (localeCookie === "ua" || localeCookie === "en") ? localeCookie : "ua";

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
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("NEXT_LOCALE")?.value;
  const locale = (localeCookie === "ua" || localeCookie === "en") ? localeCookie : "ua";
  const messages = (await import(`../../messages/${locale}.json`)).default;
  const galleryImages = rooms.flatMap((room) => room.gallery).slice(0, 5);

  return (
    <>
      <StructuredData data={hotelJsonLd(locale)} />
      <StructuredData data={localBusinessJsonLd(locale)} />
      <StructuredData data={reviewJsonLd(locale)} />
      <Hero />
      <div id="about">
        <StorytellingSection />
      </div>
      <div id="rooms">
        <RoomsPreview />
      </div>
      <div id="services">
        <ServicesOverview />
      </div>

      <section id="gallery" className="py-24">
        <Container className="space-y-10">
          <SectionIntro
            title={messages.sections.galleryTitle}
            copy={messages.sections.galleryCopy}
          />
          <GalleryGrid images={galleryImages} title={messages.sections.galleryTitle} />
        </Container>
      </section>

      <TestimonialsSlider />
    </>
  );
}
