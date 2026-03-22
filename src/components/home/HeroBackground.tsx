"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;

/**
 * Mobile-first hero asset (aligned with STEPS-LAB resort demos): smaller file on narrow
 * viewports improves LCP; desktop loads the full-resolution image after mount.
 */
export function HeroBackground() {
  const [useDesktopAsset, setUseDesktopAsset] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${MOBILE_BREAKPOINT}px)`);
    const sync = () => setUseDesktopAsset(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const src = useDesktopAsset ? "/images/hero.webp" : "/images/hero-mobile.webp";

  return (
    <Image
      src={src}
      alt="AmstelSki exterior at night"
      fill
      priority
      fetchPriority="high"
      loading="eager"
      sizes="100vw"
      className="object-cover object-center"
      quality={60}
      style={{ objectPosition: "center 20%" }}
    />
  );
}
