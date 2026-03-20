"use client";

import Image from "next/image";
import { useState } from "react";
import { GalleryLightbox } from "./Lightbox";

export function GalleryGrid({
  images,
  title,
}: {
  images: string[];
  title?: string;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            className={`group relative overflow-hidden rounded-sm border border-black/10 ${
              index === 0 ? "md:col-span-2 md:row-span-2" : ""
            }`}
            onClick={() => setActiveIndex(index)}
            aria-label={`${title ?? "Gallery"} ${index + 1}`}
          >
            <div className={index === 0 ? "aspect-[16/11]" : "aspect-[4/5]"}>
              <Image
                src={image}
                alt={`${title ?? "Gallery"} ${index + 1}`}
                fill
                sizes={index === 0 ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" : "(max-width: 640px) 50vw, 25vw"}
                className="object-cover transition duration-700 group-hover:scale-[1.04]"
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
