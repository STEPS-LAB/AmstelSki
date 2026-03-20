"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import { SectionSkeleton } from "@/components/ui/SectionSkeleton";
import { useClientTranslations } from "@/hooks/useClientTranslations";

// Lazy load lightbox - only needed when user clicks an image
const GalleryLightbox = dynamic(
  () => import("./Lightbox").then((mod) => mod.GalleryLightbox),
  { loading: () => <SectionSkeleton /> }
);

// Generic blur placeholder for external images
const BLUR_PLACEHOLDER = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMCAxMCI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZjVmNWY1Ii8+PC9zdmc+";

export function GalleryGrid({
  images,
}: {
  images: string[];
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { t } = useClientTranslations();
  const title = t("sections.galleryTitle");

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" suppressHydrationWarning>
        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            className={`group relative overflow-hidden rounded-sm border border-black/10 ${
              index === 0 ? "md:col-span-2 md:row-span-2" : ""
            }`}
            onClick={() => setActiveIndex(index)}
            aria-label={`${title} ${index + 1}`}
          >
            <div className={index === 0 ? "aspect-[16/11]" : "aspect-[4/5]"}>
              <Image
                src={image}
                alt={`${title} ${index + 1}`}
                fill
                sizes={index === 0 ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" : "(max-width: 640px) 50vw, 25vw"}
                className="object-cover transition duration-700 group-hover:scale-[1.04]"
                loading="lazy"
                decoding="async"
                quality={65}
                placeholder="blur"
                blurDataURL={BLUR_PLACEHOLDER}
              />
            </div>
          </button>
        ))}
      </div>

      <GalleryLightbox
        open={activeIndex !== null}
        close={() => setActiveIndex(null)}
        index={activeIndex ?? 0}
        slides={images.map((image) => ({ src: image }))}
      />
    </>
  );
}
