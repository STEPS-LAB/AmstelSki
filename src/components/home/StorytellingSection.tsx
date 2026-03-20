"use client";

import { useAppLocale } from "@/components/layout/LocaleProvider";
import { storytellingSections } from "@/lib/content/site-content";
import { Container } from "@/components/ui/container";
import { SectionIntro } from "@/components/ui/section-intro";

const sectionContent = {
  ua: {
    eyebrow: "AmstelSki",
    aboutTitle: "Про нас",
    aboutCopy: "Голландська архітектура, близькість до витягів, сильний ресторан і комфорт, який відчувається в деталях.",
  },
  en: {
    eyebrow: "AmstelSki",
    aboutTitle: "About us",
    aboutCopy: "Dutch-inspired architecture, proximity to the lifts, a strong restaurant, and comfort felt in the details.",
  },
};

export function StorytellingSection() {
  const { locale } = useAppLocale();
  const content = sectionContent[locale as "ua" | "en"];

  return (
    <section className="luxury-grid py-24">
      <Container className="space-y-12">
        <SectionIntro
          eyebrow={content.eyebrow}
          title={content.aboutTitle}
          copy={content.aboutCopy}
        />

        <div className="grid gap-px overflow-hidden rounded-sm border border-black/10 bg-black/10 lg:grid-cols-4">
          {storytellingSections.map((item) => (
            <div key={item.id} className="bg-primary px-6 py-10">
              <p className="text-xs uppercase tracking-[0.24em] text-accent-red">
                {item.title[locale as "ua" | "en"]}
              </p>
              <p className="mt-4 text-lg leading-8 text-foreground/75">
                {item.description[locale as "ua" | "en"]}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
