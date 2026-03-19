import { getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { serviceCards } from "@/lib/content/site-content";
import { pickLocalized } from "@/lib/i18n";
import { Container } from "@/components/ui/container";
import { Panel } from "@/components/ui/panel";
import { SectionIntro } from "@/components/ui/section-intro";

export async function ServicesOverview({ locale }: { locale: AppLocale }) {
  const t = await getTranslations("sections");

  return (
    <section className="section-border py-24">
      <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <SectionIntro title={t("servicesTitle")} copy={t("servicesCopy")} />
        <div className="grid gap-4 md:grid-cols-2">
          {serviceCards.map((card) => (
            <Panel key={pickLocalized(card.title, locale)} className="min-h-44">
              <p className="text-xs uppercase tracking-[0.22em] text-accent-red">Service</p>
              <h3 className="mt-4 font-serif text-3xl text-white">
                {pickLocalized(card.title, locale)}
              </h3>
              <p className="mt-4 text-sm leading-7 text-secondary">
                {pickLocalized(card.description, locale)}
              </p>
            </Panel>
          ))}
        </div>
      </Container>
    </section>
  );
}
