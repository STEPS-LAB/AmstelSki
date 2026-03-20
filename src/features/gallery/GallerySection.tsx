"use client";

import { Container } from "@/components/ui/container";
import { SectionIntro } from "@/components/ui/section-intro";
import { GalleryGrid } from "@/features/gallery/GalleryGrid";
import { useClientTranslations } from "@/hooks/useClientTranslations";
import { rooms } from "@/lib/content/rooms";
import { memo, useState, useEffect } from "react";

export const GallerySection = memo(function GallerySection() {
  const { t } = useClientTranslations();
  const [mounted, setMounted] = useState(false);
  const galleryImages = rooms.flatMap((room) => room.gallery).slice(0, 5);

  useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR/hydration, use Ukrainian as default to match server
  const title = mounted ? t("sections.galleryTitle") : "Галерея";
  const copy = mounted ? t("sections.galleryCopy") : "Перегляньте наші вишукані інтер'єри та екстер'єри";

  return (
    <section id="gallery" className="py-24">
      <Container className="space-y-10">
        <SectionIntro title={title} copy={copy} />
        <GalleryGrid images={galleryImages} />
      </Container>
    </section>
  );
});
