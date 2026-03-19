import { getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { serviceCards } from "@/lib/content/site-content";
import { pickLocalized } from "@/lib/i18n";
import { Container } from "@/components/ui/container";
import { Panel } from "@/components/ui/panel";
import { SectionIntro } from "@/components/ui/section-intro";
import { Key, Backpack, Clock, ChefHat, Wifi, User } from "lucide-react";

export async function ServicesOverview({ locale }: { locale: AppLocale }) {
  const t = await getTranslations("sections");

  const services = [
    {
      icon: Key,
      title: { ua: "Особистий ключ", en: "Personal key" },
      description: {
        ua: "Єдиний електронний ключ відкриває номер, шафки для зберігання лижного спорядження та доступ до паркінгу.",
        en: "A single electronic key gives access to your room, ski storage lockers, and parking.",
      },
    },
    {
      icon: Backpack,
      title: { ua: "Зберігання речей", en: "Gear storage" },
      description: {
        ua: "Окреме приміщення для зберігання лижного спорядження та одягу з індивідуальними шафами та системою сушки в кожній з них.",
        en: "A dedicated room for ski equipment and clothing storage with individual lockers and drying systems.",
      },
    },
    {
      icon: Clock,
      title: { ua: "Цілодобовий сервіс", en: "24/7 service" },
      description: {
        ua: "Ми раді бути корисними у будь-який час доби.",
        en: "We are happy to be helpful at any time of the day.",
      },
    },
    {
      icon: User,
      title: { ua: "Досвідчена команда", en: "Experienced team" },
      description: {
        ua: "Професійні та активні співробітники дбають про Вас і Ваш настрій.",
        en: "Professional and active staff take care of you and your mood.",
      },
    },
    {
      icon: ChefHat,
      title: { ua: "Ресторан De Molen", en: "Restaurant De Molen" },
      description: {
        ua: "Ресторан на два зали, де Ви можете насолодитися європейською кухнею та українською гостинністю.",
        en: "A two-hall restaurant where you can enjoy European cuisine and Ukrainian hospitality.",
      },
    },
    {
      icon: Wifi,
      title: { ua: "Wi-Fi", en: "Wi-Fi" },
      description: {
        ua: "Безкоштовна система Wi-Fi.",
        en: "Complimentary Wi-Fi system.",
      },
    },
  ];

  return (
    <section className="section-border bg-black/[0.03] py-24">
      <Container>
        <SectionIntro title={t("servicesTitle")} />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Panel key={pickLocalized(service.title, locale)} className="min-h-52 bg-white">
                <Icon className="h-12 w-12 text-accent-red" />
                <h3 className="mt-4 font-serif text-xl font-semibold text-foreground">
                  {pickLocalized(service.title, locale)}
                </h3>
                <p className="mt-3 text-sm leading-7 text-foreground/72">
                  {pickLocalized(service.description, locale)}
                </p>
              </Panel>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
