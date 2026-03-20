import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ClientWidgets } from "@/components/layout/ClientWidgets";
import { PageTransition } from "@/components/animation/PageTransition";
import { BookingProvider } from "@/features/booking/BookingProvider";
import { AIConcierge } from "@/features/concierge/AIConcierge";
import { LocaleProvider } from "@/components/layout/LocaleProvider";
import type { AppLocale } from "@/i18n/routing";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://amstelski.vercel.app"),
  title: "AmstelSki",
  description:
    "AmstelSki in Bukovel is a little Holland in the heart of the Carpathians, with rooms near lifts 2 and 5, restaurant De Molen, ski storage, and attentive service.",
};

export function generateStaticParams() {
  return ["ua", "en"].map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = locale as AppLocale;
  const messages = await getMessages({ locale: typedLocale });

  return (
    <html
      lang={typedLocale}
      suppressHydrationWarning
      className={`${inter.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-primary text-primary">
        <NextIntlClientProvider messages={messages}>
          <LocaleProvider defaultLocale={typedLocale}>
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
          </LocaleProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
