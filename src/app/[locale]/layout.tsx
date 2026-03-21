import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/animation/PageTransition";
import { BookingProvider } from "@/features/booking/BookingProvider";
import { isValidLocale, routing, type AppLocale } from "@/i18n/routing";
import dynamic from "next/dynamic";

// Lazy load non-critical widgets to improve LCP
const ClientWidgets = dynamic(() => import("@/components/layout/ClientWidgets"), {
  ssr: false,
  loading: () => null,
});

const AIConcierge = dynamic(() => import("@/features/concierge/AIConcierge"), {
  ssr: false,
  loading: () => null,
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <BookingProvider>
        <div className="flex min-h-screen flex-col">
          <Header />
          <PageTransition>
            <main className="flex-1">{children}</main>
          </PageTransition>
          <Footer />
        </div>
        <ClientWidgets />
        <AIConcierge />
      </BookingProvider>
    </NextIntlClientProvider>
  );
}
