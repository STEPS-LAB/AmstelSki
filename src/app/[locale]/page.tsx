import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { RoomsPreview } from "@/components/home/RoomsPreview";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { StorytellingSection } from "@/components/home/StorytellingSection";
import { Container } from "@/components/ui/container";
import { SectionIntro } from "@/components/ui/section-intro";
import { GalleryGrid } from "@/features/gallery/GalleryGrid";
import { TestimonialsSlider } from "@/features/testimonials/TestimonialsSlider";
import { FAQList } from "@/features/faq/FAQList";
import { HotelMap } from "@/features/map/HotelMap";
import { blogPosts } from "@/lib/content/blog";
import { rooms } from "@/lib/content/rooms";
import { pickLocalized } from "@/lib/i18n";
import type { AppLocale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { buttonClasses } from "@/components/ui/button";
import { contactDetails } from "@/lib/content/site-content";
import { StructuredData } from "@/components/seo/StructuredData";
import {
  createMetadata,
  faqJsonLd,
  hotelJsonLd,
  localBusinessJsonLd,
  reviewJsonLd,
} from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const typedLocale = locale as AppLocale;

  return createMetadata({
    locale: typedLocale,
    pathname: "",
    title:
      typedLocale === "ua"
        ? "AmstelSki | Luxury Boutique Hotel in Bukovel"
        : "AmstelSki | Luxury Boutique Hotel in Bukovel",
    description:
      typedLocale === "ua"
        ? "AmstelSki - маленька Голландія у серці Карпат: комфортні номери, ресторан De Molen, ski room і зручне розташування біля підйомників 2 та 5."
        : "AmstelSki is a little Holland in the heart of the Carpathians, with comfortable rooms, restaurant De Molen, ski storage, and a location near lifts 2 and 5.",
  });
}

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const typedLocale = locale as AppLocale;
  const t = await getTranslations();
  const galleryImages = rooms.flatMap((room) => room.gallery).slice(0, 5);

  return (
    <>
      <StructuredData data={hotelJsonLd(typedLocale)} />
      <StructuredData data={localBusinessJsonLd(typedLocale)} />
      <StructuredData data={faqJsonLd(typedLocale)} />
      <StructuredData data={reviewJsonLd(typedLocale)} />
      <Hero locale={typedLocale} />
      <StorytellingSection locale={typedLocale} />
      <RoomsPreview locale={typedLocale} />
      <ServicesOverview locale={typedLocale} />

      <section className="section-border py-24">
        <Container className="space-y-10">
          <SectionIntro
            title={t("sections.galleryTitle")}
            copy={t("sections.galleryCopy")}
          />
          <GalleryGrid images={galleryImages} title={t("sections.galleryTitle")} />
        </Container>
      </section>

      <TestimonialsSlider />

      <section className="section-border py-24">
        <Container className="space-y-10">
          <SectionIntro title={t("sections.faqTitle")} />
          <FAQList locale={typedLocale} />
        </Container>
      </section>

      <section className="section-border py-24">
        <Container className="space-y-10">
          <SectionIntro title={t("sections.mapTitle")} copy={t("sections.mapCopy")} />
          <HotelMap locale={typedLocale} />
        </Container>
      </section>

      <section className="section-border py-24">
        <Container className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <SectionIntro
            eyebrow={typedLocale === "ua" ? "Новини" : "News"}
            title={typedLocale === "ua" ? "Новини та деталі готелю" : "Hotel news and details"}
            copy={
              typedLocale === "ua"
                ? "Корисні матеріали про відпочинок у Буковелі, сервіс AmstelSki та переваги готелю, які варто знати до приїзду."
                : "Useful notes about staying in Bukovel, AmstelSki services, and the advantages worth knowing before arrival."
            }
          />
          <div className="grid gap-4">
            {blogPosts.map((post) => (
              <article key={post.slug} className="rounded-sm border border-white/10 bg-white/[0.03] p-5">
                <p className="text-xs uppercase tracking-[0.22em] text-accent-red">
                  {pickLocalized(post.category, typedLocale)}
                </p>
                <h3 className="mt-3 font-serif text-3xl text-white">
                  {pickLocalized(post.title, typedLocale)}
                </h3>
                <p className="mt-4 text-sm leading-7 text-secondary">
                  {pickLocalized(post.excerpt, typedLocale)}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-border py-24">
        <Container className="glass-panel rounded-sm px-6 py-8 sm:px-8 sm:py-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-secondary">
                {typedLocale === "ua" ? "Контакти" : "Contacts"}
              </p>
              <h2 className="mt-4 font-serif text-4xl text-white sm:text-5xl">
                {typedLocale === "ua"
                  ? "Забронюйте відпочинок у готелі біля самих витягів"
                  : "Book your stay at a hotel close to the lifts"}
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/72">
                {pickLocalized(contactDetails.address, typedLocale)} · {contactDetails.phone} ·{" "}
                {contactDetails.email}
              </p>
            </div>
            <Link href="/contacts" className={buttonClasses()}>
              {t("common.learnMore")}
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
