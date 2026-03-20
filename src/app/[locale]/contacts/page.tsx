import { getMessages } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Input, Textarea } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { contactDetails } from "@/lib/content/site-content";
import { pickLocalized } from "@/lib/i18n";
import type { AppLocale } from "@/i18n/routing";
import { Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";

export default async function ContactsPage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const typedLocale = locale as AppLocale;

  return (
    <>
      <section className="py-12 sm:py-24">
        <Container className="grid gap-6 sm:gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-6 rounded-sm border border-white/10 bg-white/[0.03] p-4 sm:p-8">
            <div>
              <p className="mb-6 text-xs uppercase tracking-[0.22em] text-accent-red">
                {typedLocale === "ua" ? "Контакти" : "Contacts"}
              </p>
              <p className="mb-8 text-sm leading-7 text-secondary">
                {typedLocale === "ua"
                  ? "Зв'яжіться з нами перед вашим відпочинком. Допоможемо обрати номер, підкажемо по заїзду, вечері в De Molen та загальній організації відпочинку в Буковелі."
                  : "Get in touch before your stay. We can help you choose a room, plan your arrival, arrange dinner at De Molen, and make your Bukovel stay easier."}
              </p>
            </div>

            <div className="space-y-4">
              <a href={`tel:${contactDetails.phone.replace(/[^\d+]/g, "")}`} className="group flex items-center gap-3 text-foreground transition-colors hover:text-accent-red">
                <Phone className="h-5 w-5 text-accent-red transition-colors group-hover:text-accent-red" />
                <span className="break-words">{contactDetails.phone}</span>
              </a>
              <a href={`mailto:${contactDetails.email}`} className="group flex items-center gap-3 text-foreground transition-colors hover:text-accent-red">
                <Mail className="h-5 w-5 text-accent-red transition-colors group-hover:text-accent-red" />
                <span className="break-words">{contactDetails.email}</span>
              </a>
              <div className="group flex items-start gap-3 text-foreground">
                <MapPin className="h-5 w-5 text-accent-red" />
                <span className="leading-7 break-words">{pickLocalized(contactDetails.address, typedLocale)}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              <a
                href="https://www.instagram.com/amstel_ski/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-4 py-3 text-sm uppercase tracking-[0.15em] text-foreground/70 transition-colors hover:bg-black/10"
              >
                <Instagram className="h-4 w-4" />
                <span>Instagram</span>
              </a>
              <a
                href="https://www.facebook.com/AmstelSki"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-4 py-3 text-sm uppercase tracking-[0.15em] text-foreground/70 transition-colors hover:bg-black/10"
              >
                <Facebook className="h-4 w-4" />
                <span>Facebook</span>
              </a>
            </div>

            <div className="pt-4">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2582.574789812345!2d24.4486!3d48.2396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4738d96c0a0b0a0b%3A0x0!2zVmlzaG5pIDMyMiwgUG9seWFueXRzaWE!5e0!3m2!1suk!2sua!4v1234567890"
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: "4px" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale"
              />
            </div>
          </div>

          <form className="space-y-4 rounded-sm border border-white/10 bg-white/[0.03] p-4 sm:p-6">
            <p className="text-lg font-medium text-foreground">
              {typedLocale === "ua" ? "Залишились питання?" : "Still have questions?"}
            </p>
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
            <Button type="button" className="w-full">
              {typedLocale === "ua" ? "Надіслати запит" : "Send inquiry"}
            </Button>
          </form>
        </Container>
      </section>
    </>
  );
}
