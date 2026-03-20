"use client";

import { Container } from "@/components/ui/container";
import { Input, Textarea } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { contactDetails } from "@/lib/content/site-content";
import { useAppLocale } from "@/components/layout/LocaleProvider";
import { useClientTranslations } from "@/hooks/useClientTranslations";
import { Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";

const contactPageContent = {
  ua: {
    title: "Контакти",
    copy: "Зв'яжіться з нами будь-яким зручним способом або завітайте до нас у гості.",
    questions: "Маєте запитання?",
    placeholder: "Ваше повідомлення",
    send: "Надіслати",
    name: "Ваше ім'я",
    phone: "Телефон",
  },
  en: {
    title: "Contacts",
    copy: "Contact us in any convenient way or visit us in person.",
    questions: "Have questions?",
    placeholder: "Your message",
    send: "Send",
    name: "Your name",
    phone: "Phone",
  },
};

export default function ContactsPage() {
  const { locale } = useAppLocale();
  const { t } = useClientTranslations();
  const content = contactPageContent[locale as "ua" | "en"];

  return (
    <>
      <section className="py-12 sm:py-24">
        <Container className="grid gap-6 sm:gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-6 rounded-sm border border-white/10 bg-white/[0.03] p-4 sm:p-8">
            <div>
              <p className="mb-6 text-xs uppercase tracking-[0.22em] text-accent-red">
                {t("navigation.contacts")}
              </p>
              <p className="mb-8 text-sm leading-7 text-secondary">
                {content.copy}
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
                <span className="leading-7 break-words">{contactDetails.address[locale as "ua" | "en"]}</span>
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
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2582.574789812345!2d24.4486!3d48.2396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4738d96c0a0b0a0b%3A0x0!2zVmlzaG5pIDMyMiwgUG9seWFueXRzaGE!5e${locale === "ua" ? "0!3m2!1suk!2sua" : "0!3m2!1sen!2sus"}!4v1234567890`}
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
              {content.questions}
            </p>
            <Input placeholder={content.name} />
            <Input placeholder="Email" type="email" />
            <Input placeholder={content.phone} />
            <Textarea
              placeholder={content.placeholder}
            />
            <Button type="button" className="w-full">
              {content.send}
            </Button>
          </form>
        </Container>
      </section>
    </>
  );
}
