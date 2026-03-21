import { setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/container";
import { storytellingSections } from "@/lib/content/site-content";
import { pickLocalized } from "@/lib/i18n";
import type { AppLocale } from "@/i18n/routing";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const typedLocale = locale as AppLocale;

  return (
    <>
      <PageHero
        eyebrow={typedLocale === "ua" ? "Про готель" : "About"}
        title={
          typedLocale === "ua"
            ? "AmstelSki - маленька Голландія у серці Карпат"
            : "AmstelSki is a little Holland in the heart of the Carpathians"
        }
        copy={
          typedLocale === "ua"
            ? "Ми відтворили атмосферу голландського класицизму в Буковелі та поєднали її з комфортом сучасного гірського готелю."
            : "We recreated the mood of Dutch classicism in Bukovel and combined it with the comfort of a modern mountain hotel."
        }
        image="https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?auto=format&fit=crop&w=1800&q=80"
      />
      <section className="py-24">
        <Container className="grid gap-4 md:grid-cols-2">
          {storytellingSections.map((item) => (
            <article key={item.id} className="rounded-sm border border-white/10 bg-white/[0.03] p-6">
              <p className="text-xs uppercase tracking-[0.22em] text-accent-red">
                {pickLocalized(item.title, typedLocale)}
              </p>
              <p className="mt-4 text-lg leading-8 text-white/75">
                {pickLocalized(item.description, typedLocale)}
              </p>
            </article>
          ))}
        </Container>
      </section>
    </>
  );
}
