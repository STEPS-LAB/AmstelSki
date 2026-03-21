import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ClientWidgets } from "@/components/layout/ClientWidgets";
import { PageTransition } from "@/components/animation/PageTransition";
import { BookingProvider } from "@/features/booking/BookingProvider";
import { AIConcierge } from "@/features/concierge/AIConcierge";
import { isValidLocale, routing, type AppLocale } from "@/i18n/routing";

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
          <link
            rel="preload"
            as="image"
            href="/images/hero.webp"
            imageSrcSet="/images/hero.webp?w=640 640w, /images/hero.webp?w=1024 1024w, /images/hero.webp?w=1920 1920w"
            imageSizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 100vw"
            fetchPriority="high"
          />
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
