import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { heroHighlights } from "@/lib/content/site-content";
import { pickLocalized } from "@/lib/i18n";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { BookingBar } from "@/features/booking/BookingBar";
import { OpenBookingButton } from "@/features/booking/OpenBookingButton";
import { Link } from "@/i18n/navigation";

export async function Hero({ locale }: { locale: AppLocale }) {
  const t = await getTranslations();

  return (
    <section className="relative overflow-hidden border-b border-white/14">
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

      <Container className="relative z-10 flex min-h-[100svh] flex-col justify-center py-28">
        <div className="max-w-4xl">
          <Badge>{t("hero.eyebrow")}</Badge>
          <h1 className="mt-6 font-serif text-6xl leading-none text-white sm:text-7xl md:text-8xl">
            {t("hero.title")}
          </h1>
          <p className="mt-6 max-w-2xl text-balance text-lg leading-8 text-white/72 sm:text-xl">
            {t("hero.subtitle")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <OpenBookingButton label={t("common.bookStay")} />
            <Link href="/rooms" className={buttonClasses("secondary")}>
              {t("common.exploreRooms")}
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            {pickLocalized(heroHighlights, locale).map((item) => (
              <Badge key={item} className="bg-white/18 text-white">
                {item}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mt-12 max-w-5xl">
          <p className="mb-4 text-xs uppercase tracking-[0.24em] text-secondary">
            {t("hero.bookingLabel")}
          </p>
          <BookingBar />
        </div>
      </Container>
    </section>
  );
}
