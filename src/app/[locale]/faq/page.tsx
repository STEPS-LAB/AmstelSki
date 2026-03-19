import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/layout/PageHero";
import { StructuredData } from "@/components/seo/StructuredData";
import { Container } from "@/components/ui/container";
import { FAQList } from "@/features/faq/FAQList";
import type { AppLocale } from "@/i18n/routing";
import { createMetadata, faqJsonLd } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return createMetadata({
    locale: locale as AppLocale,
    pathname: "/faq",
    title: locale === "ua" ? "FAQ | AmstelSki" : "FAQ | AmstelSki",
    description:
      locale === "ua"
        ? "Поширені запитання про AmstelSki: бронювання, приїзд, сервіс та логістику зимового перебування."
        : "Frequently asked questions about AmstelSki, including booking, arrival, service, and winter-stay logistics.",
  });
}

export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <StructuredData data={faqJsonLd(locale as AppLocale)} />
      <PageHero
        eyebrow="FAQ"
        title={
          locale === "ua"
            ? "Усе важливе перед зимовим приїздом"
            : "Everything essential before your winter arrival"
        }
        copy={
          locale === "ua"
            ? "Від пізнього check-in до доступу до схилу: найпоширеніші відповіді в одному місці."
            : "From late check-in to slope access, the most common answers collected in one place."
        }
        image="https://images.unsplash.com/photo-1505693416388-a9b27e0b6f6c?auto=format&fit=crop&w=1800&q=80"
      />
      <section className="py-24">
        <Container className="max-w-4xl">
          <FAQList locale={locale as AppLocale} />
        </Container>
      </section>
    </>
  );
}
