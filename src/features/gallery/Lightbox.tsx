"use client";

import "yet-another-react-lightbox/styles.css";
import Lightbox from "yet-another-react-lightbox";

export function GalleryLightbox({
  open,
  close,
  slides,
  index,
}: {
  open: boolean;
  close: () => void;
  slides: { src: string }[];
  index: number;
}) {
  return <Lightbox open={open} close={close} index={index} slides={slides} />;
}
