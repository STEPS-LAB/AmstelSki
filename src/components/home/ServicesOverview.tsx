"use client";

import { useAppLocale } from "@/components/layout/LocaleProvider";
import { Container } from "@/components/ui/container";
import { Panel } from "@/components/ui/panel";
import { SectionIntro } from "@/components/ui/section-intro";
import { Key, Backpack, Clock, ChefHat, Wifi, User } from "lucide-react";

const servicesContent = {
  ua: {
    title: "Послуги",
    items: [
      { icon: Key, title: "Особистий ключ", description: "Єдиний електронний ключ відкриває номер, шафки для зберігання лижного спорядження та доступ до паркінгу." },
      { icon: Backpack, title: "Зберігання речей", description: "Окреме приміщення для зберігання лижного спорядження та одягу з індивідуальними шафами та системою сушки в кожній з них." },
      { icon: Clock, title: "Цілодобовий сервіс", description: "Ми раді бути корисними у будь-який час доби." },
      { icon: User, title: "Досвідчена команда", description: "Професійні та активні співробітники дбають про Вас і Ваш настрій." },
      { icon: ChefHat, title: "Ресторан De Molen", description: "Ресторан на два зали, де Ви можете насолодитися європейською кухнею та українською гостинністю." },
      { icon: Wifi, title: "Wi-Fi", description: "Безкоштовна система Wi-Fi." },
    ],
  },
  en: {
    title: "Services",
    items: [
      { icon: Key, title: "Personal key", description: "A single electronic key gives access to your room, ski storage lockers, and parking." },
      { icon: Backpack, title: "Gear storage", description: "A dedicated room for ski equipment and clothing storage with individual lockers and drying systems." },
      { icon: Clock, title: "24/7 service", description: "We are happy to be helpful at any time of the day." },
      { icon: User, title: "Experienced team", description: "Professional and active staff take care of you and your mood." },
      { icon: ChefHat, title: "Restaurant De Molen", description: "A two-hall restaurant where you can enjoy European cuisine and Ukrainian hospitality." },
      { icon: Wifi, title: "Wi-Fi", description: "Complimentary Wi-Fi system." },
    ],
  },
};

export function ServicesOverview() {
  const { locale } = useAppLocale();
  const content = servicesContent[locale as "ua" | "en"];

  return (
    <section className="bg-black/[0.03] py-24">
      <Container>
        <SectionIntro title={content.title} />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {content.items.map((service) => {
            const Icon = service.icon;
            return (
              <Panel key={service.title} className="min-h-52 bg-white">
                <Icon className="h-12 w-12 text-accent-red" />
                <h3 className="mt-4 font-serif text-xl font-semibold text-foreground">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-foreground/72">
                  {service.description}
                </p>
              </Panel>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
