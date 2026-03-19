import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { heroHighlights } from "@/lib/content/site-content";
import { pickLocalized } from "@/lib/i18n";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { BookingBar } from "@/features/booking/BookingBar";

export async function Hero({ locale }: { locale: AppLocale }) {
  const t = await getTranslations();

  return (
    <section className="relative h-screen overflow-hidden border-b border-white/14 -mt-20">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=2000&q=80"
          alt="AmstelSki exterior at night"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[rgba(88,92,97,0.38)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(106,111,116,0.18),rgba(106,111,116,0.9))]" />
      </div>

      <Container className="relative z-10 flex h-full flex-col justify-center pt-20">
        <div className="max-w-4xl">
          <h1 className="font-serif text-6xl leading-none text-white sm:text-7xl md:text-8xl">
            {t("hero.title")}
          </h1>
          <p className="mt-4 max-w-2xl text-balance text-lg leading-8 text-white/72 sm:mt-6 sm:text-xl">
            {t("hero.subtitle")}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {pickLocalized(heroHighlights, locale).map((item) => (
              <Badge key={item} className="bg-white/18 text-white">
                {item}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mt-8 max-w-5xl sm:mt-10">
          <p className="mb-4 text-xs uppercase tracking-[0.24em] text-white">
            {t("hero.bookingLabel")}
          </p>
          <BookingBar />
        </div>
      </Container>
    </section>
  );
}
