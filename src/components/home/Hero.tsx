import Image from "next/image";
import { heroHighlights } from "@/lib/content/site-content";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { HeroBooking } from "./HeroBooking";
import { getLocale } from "@/i18n/request";

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

export async function Hero() {
  const locale = await getLocale();
  const content = heroContent[locale as "ua" | "en"];

  return (
    <section className="relative h-[calc(100vh+80px)] min-h-[600px] border-b border-black/14 overflow-x-hidden -mt-20 pointer-events-none">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Image
          src="/images/hero.webp"
          alt="AmstelSki exterior at night"
          fill
          priority
          fetchPriority="high"
          decoding="async"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 100vw"
          className="object-cover object-center"
          quality={80}
          loading="eager"
          placeholder="blur"
          blurDataURL="data:image/webp;base64,UklGRkYAAABXRUJQVlA4IEoAAADQAQCdASoQABAADgCdAScABEYnAP+H/wP8A/v/8A/wP+A/4H/AP8D/gf8A"
          style={{ objectPosition: 'center 20%' }}
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <Container className="relative z-10 flex h-full flex-col justify-end pb-24 pointer-events-auto">
        <div className="max-w-4xl">
          <h1 className="font-serif text-6xl leading-none text-white sm:text-7xl md:text-8xl">
            {content.title}
          </h1>
          <p className="mt-4 max-w-2xl text-balance text-lg leading-8 text-white/90 sm:mt-6 sm:text-xl">
            {content.subtitle}
          </p>
          <div className="hidden md:flex mt-6 flex-wrap gap-3">
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
