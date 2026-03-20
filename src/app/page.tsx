import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Hero } from "@/components/home/Hero";
import { RoomsPreview } from "@/components/home/RoomsPreview";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { StructuredData } from "@/components/seo/StructuredData";
import {
  createMetadata,
  hotelJsonLd,
  localBusinessJsonLd,
  reviewJsonLd,
} from "@/lib/seo";
import { cookies } from "next/headers";

// Lazy load below-the-fold and non-critical components with suspense
const StorytellingSection = dynamic(
  () => import("@/components/home/StorytellingSection").then((mod) => mod.StorytellingSection),
  { loading: () => null }
);

const TestimonialsSlider = dynamic(
  () => import("@/features/testimonials/TestimonialsSlider").then((mod) => mod.TestimonialsSlider),
  { loading: () => null }
);

const ClientWidgets = dynamic(
  () => import("@/components/layout/ClientWidgets").then((mod) => mod.ClientWidgets),
  { loading: () => null }
);

const AIConcierge = dynamic(
  () => import("@/features/concierge/AIConcierge").then((mod) => mod.AIConcierge),
  { loading: () => null }
);

const GallerySection = dynamic(
  () => import("@/features/gallery/GallerySection").then((mod) => mod.GallerySection),
  { loading: () => <div className="h-96" /> }
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

      <GallerySection />

      <TestimonialsSlider />
      <ClientWidgets />
      <AIConcierge />
    </>
  );
}
