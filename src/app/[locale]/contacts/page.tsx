import { setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/container";
import { Input, Textarea } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { HotelMap } from "@/features/map/HotelMap";
import { contactDetails } from "@/lib/content/site-content";
import { pickLocalized } from "@/lib/i18n";
import type { AppLocale } from "@/i18n/routing";

export default async function ContactsPage({
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
        eyebrow={typedLocale === "ua" ? "Контакти" : "Contacts"}
        title={
          typedLocale === "ua"
            ? "Зв'яжіться з нами перед вашим відпочинком"
            : "Get in touch before your stay"
        }
        copy={
          typedLocale === "ua"
            ? "Допоможемо обрати номер, підкажемо по заїзду, вечері в De Molen та загальній організації відпочинку в Буковелі."
            : "We can help you choose a room, plan your arrival, arrange dinner at De Molen, and make your Bukovel stay easier."
        }
        image="https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1800&q=80"
      />
      <section className="py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-4 rounded-sm border border-white/10 bg-white/[0.03] p-6">
            <p className="text-xs uppercase tracking-[0.22em] text-accent-red">
              AmstelSki
            </p>
            <p className="text-sm leading-7 text-secondary">
              {pickLocalized(contactDetails.address, typedLocale)}
            </p>
            <a href={`tel:${contactDetails.phone.replace(/[^\d+]/g, "")}`} className="block text-white">
              {contactDetails.phone}
            </a>
            <a href={`mailto:${contactDetails.email}`} className="block text-white">
              {contactDetails.email}
            </a>
            <div className="pt-4">
              <HotelMap locale={typedLocale} />
            </div>
          </div>

          <form className="space-y-4 rounded-sm border border-white/10 bg-white/[0.03] p-6">
            <Input placeholder={typedLocale === "ua" ? "Ім'я" : "Name"} />
            <Input placeholder="Email" type="email" />
            <Input placeholder={typedLocale === "ua" ? "Телефон" : "Phone"} />
            <Textarea
              placeholder={
                typedLocale === "ua"
                  ? "Напишіть, чим ми можемо допомогти перед вашим приїздом"
                  : "Tell us how we can help before your arrival"
              }
            />
            <Button type="button">
              {typedLocale === "ua" ? "Надіслати запит" : "Send inquiry"}
            </Button>
          </form>
        </Container>
      </section>
    </>
  );
}
