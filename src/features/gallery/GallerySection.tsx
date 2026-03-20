"use client";

import { Container } from "@/components/ui/container";
import { SectionIntro } from "@/components/ui/section-intro";
import { GalleryGrid } from "@/features/gallery/GalleryGrid";
import { useAppLocale } from "@/components/layout/LocaleProvider";
import { useClientTranslations } from "@/hooks/useClientTranslations";
import { rooms } from "@/lib/content/rooms";

export function GallerySection() {
  const { locale } = useAppLocale();
  const { t } = useClientTranslations();
  const galleryImages = rooms.flatMap((room) => room.gallery).slice(0, 5);

  return (
    <section id="gallery" className="py-24">
      <Container className="space-y-10">
        <SectionIntro
          title={t("sections.galleryTitle")}
          copy={t("sections.galleryCopy")}
        />
        <GalleryGrid images={galleryImages} />
      </Container>
    </section>
  );
}
