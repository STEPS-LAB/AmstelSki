"use client";

import Image from "next/image";
import { useAppLocale } from "@/components/layout/LocaleProvider";
import { useClientTranslations } from "@/hooks/useClientTranslations";
import { heroHighlights } from "@/lib/content/site-content";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { HeroBooking } from "./HeroBooking";

const heroContent = {
  ua: {
    title: "AmstelSki",
    subtitle: "Маленька Голландія у серці Карпат",
  },
  en: {
    title: "AmstelSki",
    subtitle: "A little Holland in the heart of the Carpathians",
  },
};

export function Hero() {
  const { locale } = useAppLocale();
  const t = useClientTranslations();

  const content = heroContent[locale as "ua" | "en"];

  return (
    <section className="relative h-[calc(100vh-80px)] border-b border-black/14">
      <div className="absolute inset-0 -top-20 overflow-hidden">
        <Image
          src="/images/hero.webp"
          alt="AmstelSki exterior at night"
          fill
          priority
          fetchPriority="high"
          decoding="async"
          sizes="100vw"
          className="object-cover object-center"
          quality={85}
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <Container className="relative z-10 flex h-full flex-col justify-end pb-24">
        <div className="max-w-4xl">
          <h1 className="font-serif text-6xl leading-none text-white sm:text-7xl md:text-8xl">
            {content.title}
          </h1>
          <p className="mt-4 max-w-2xl text-balance text-lg leading-8 text-white/90 sm:mt-6 sm:text-xl">
            {content.subtitle}
          </p>
          <div className="mt-6 hidden flex-wrap gap-3 md:flex">
            {heroHighlights[locale as "ua" | "en"].map((item) => (
              <Badge key={item} className="bg-white/20 text-white backdrop-blur-md border border-white/30">
                {item}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mt-8 max-w-4xl sm:mt-10">
          <HeroBooking />
        </div>
      </Container>
    </section>
  );
}
