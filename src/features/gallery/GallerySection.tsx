"use client";

import { Container } from "@/components/ui/container";
import { SectionIntro } from "@/components/ui/section-intro";
import { GalleryGrid } from "@/features/gallery/GalleryGrid";
import { rooms } from "@/lib/content/rooms";
import { useAppLocale } from "@/components/layout/LocaleProvider";
import { memo } from "react";

const sectionContent = {
  ua: {
    title: "Галерея",
    copy: "Перегляньте наші вишукані інтер'єри та екстер'єри",
  },
  en: {
    title: "Gallery",
    copy: "Explore our sophisticated interiors and Exteriors",
  },
};

export const GallerySection = memo(function GallerySection() {
  const { locale } = useAppLocale();
  const content = sectionContent[locale as "ua" | "en"];
  const galleryImages = rooms.flatMap((room) => room.gallery).slice(0, 5);

  return (
    <section id="gallery" className="py-24">
      <Container className="space-y-10">
        <SectionIntro title={content.title} copy={content.copy} />
        <GalleryGrid images={galleryImages} locale={locale as "ua" | "en"} />
      </Container>
    </section>
  );
});
