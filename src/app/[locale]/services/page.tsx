import { setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/container";
import { Panel } from "@/components/ui/panel";
import { serviceCards } from "@/lib/content/site-content";
import { pickLocalized } from "@/lib/i18n";
import type { AppLocale } from "@/i18n/routing";

export default async function ServicesPage({
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
        eyebrow={typedLocale === "ua" ? "Сервіси" : "Services"}
        title={
          typedLocale === "ua"
            ? "Усе, що робить відпочинок у горах зручним"
            : "Everything that makes a mountain stay comfortable"
        }
        copy={
          typedLocale === "ua"
            ? "Від особистого електронного ключа до ресторану De Molen - у AmstelSki продумано сервіси, які справді спрощують відпочинок."
            : "From a personal electronic key to restaurant De Molen, AmstelSki focuses on services that genuinely simplify your stay."
        }
        image="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1800&q=80"
      />
      <section className="py-24">
        <Container className="grid gap-4 md:grid-cols-2">
          {serviceCards.map((card) => (
            <Panel key={pickLocalized(card.title, typedLocale)}>
              <p className="text-xs uppercase tracking-[0.22em] text-accent-red">
                Service
              </p>
              <h2 className="mt-4 font-serif text-3xl text-white">
                {pickLocalized(card.title, typedLocale)}
              </h2>
              <p className="mt-4 text-sm leading-7 text-secondary">
                {pickLocalized(card.description, typedLocale)}
              </p>
            </Panel>
          ))}
        </Container>
      </section>
    </>
  );
}
