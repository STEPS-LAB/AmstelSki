import type { Metadata } from "next";
import { getMessages } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { RoomsPreview } from "@/components/home/RoomsPreview";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { StorytellingSection } from "@/components/home/StorytellingSection";
import { Container } from "@/components/ui/container";
import { SectionIntro } from "@/components/ui/section-intro";
import { GalleryGrid } from "@/features/gallery/GalleryGrid";
import { TestimonialsSlider } from "@/features/testimonials/TestimonialsSlider";
import { rooms } from "@/lib/content/rooms";
import { StructuredData } from "@/components/seo/StructuredData";
import {
  createMetadata,
  hotelJsonLd,
  localBusinessJsonLd,
  reviewJsonLd,
} from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return createMetadata({
    locale: "ua",
    pathname: "",
    title: "AmstelSki",
    description:
      "AmstelSki - маленька Голландія у серці Карпат: комфортні номери, ресторан De Molen, ski room і зручне розташування біля підйомників 2 та 5.",
  });
}

export default async function HomePage() {
  const messages = await getMessages();
  const galleryImages = rooms.flatMap((room) => room.gallery).slice(0, 5);

  return (
    <>
      <StructuredData data={hotelJsonLd("ua")} />
      <StructuredData data={localBusinessJsonLd("ua")} />
      <StructuredData data={reviewJsonLd("ua")} />
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
