import { getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { storytellingSections } from "@/lib/content/site-content";
import { pickLocalized } from "@/lib/i18n";
import { Container } from "@/components/ui/container";
import { SectionIntro } from "@/components/ui/section-intro";

export async function StorytellingSection({ locale }: { locale: AppLocale }) {
  const t = await getTranslations("hero");

  return (
    <section className="luxury-grid py-24">
      <Container className="space-y-12">
        <SectionIntro
          eyebrow={t("eyebrow")}
          title={locale === "ua" ? "Про нас" : "About us"}
          copy={
            locale === "ua"
              ? "Голландська архітектура, близькість до витягів, сильний ресторан і комфорт, який відчувається в деталях."
              : "Dutch-inspired architecture, proximity to the lifts, a strong restaurant, and comfort felt in the details."
          }
        />

        <div className="grid gap-px overflow-hidden rounded-sm border border-black/10 bg-black/10 lg:grid-cols-4">
          {storytellingSections.map((item) => (
            <div key={item.id} className="bg-primary px-6 py-10">
              <p className="text-xs uppercase tracking-[0.24em] text-accent-red">
                {pickLocalized(item.title, locale)}
              </p>
              <p className="mt-4 text-lg leading-8 text-foreground/75">
                {pickLocalized(item.description, locale)}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
