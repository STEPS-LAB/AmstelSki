import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { navigationItems, contactDetails } from "@/lib/content/site-content";
import type { AppLocale } from "@/i18n/routing";
import { pickLocalized } from "@/lib/i18n";
import { Container } from "@/components/ui/container";

export async function Footer({ locale }: { locale: AppLocale }) {
  const t = await getTranslations();

  return (
    <footer className="bg-[#1A1A1A]">
      <Container className="grid gap-10 py-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <p className="font-serif text-3xl text-white">AmstelSki</p>
          <p className="mt-4 max-w-md text-sm leading-7 text-white/70">
            {locale === "ua"
              ? "Темний boutique hotel у Буковелі, де точна зимова логістика поєднується з тишею, сервісом і виразним інтер'єром."
              : "A dark boutique hotel in Bukovel where precise winter logistics meet calm service and expressive interiors."}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-white/50">Explore</p>
          <div className="mt-4 flex flex-col gap-3">
            {navigationItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-white/75 hover:text-white">
                {t(item.labelKey)}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-white/50">Contact</p>
          <div className="mt-4 space-y-3 text-sm text-white/75">
            <a href={`tel:${contactDetails.phone.replace(/[^\d+]/g, "")}`} className="block hover:text-white">
              {contactDetails.phone}
            </a>
            <a href={`mailto:${contactDetails.email}`} className="block hover:text-white">
              {contactDetails.email}
            </a>
            <p>{pickLocalized(contactDetails.address, locale)}</p>
          </div>
        </div>
      </Container>
      <Container className="border-t border-white/10 py-5 text-xs uppercase tracking-[0.18em] text-white/50">
        {new Date().getFullYear()} AmstelSki. {t("common.allRightsReserved")}
      </Container>
    </footer>
  );
}
