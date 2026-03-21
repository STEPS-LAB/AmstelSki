import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BookingProvider } from "@/features/booking/BookingProvider";
import { LocaleProvider } from "@/components/layout/LocaleProvider";
import type { AppLocale } from "@/i18n/routing";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  preload: true,
  weight: "variable",
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: true,
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  preload: true,
  weight: ["600", "700", "800"],
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://amstelski.vercel.app"),
  title: "AmstelSki",
  description:
    "AmstelSki in Bukovel is a little Holland in the heart of the Carpathians, with rooms near lifts 2 and 5, restaurant De Molen, ski storage, and attentive service.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();

  return (
    <html
      lang="ua"
      suppressHydrationWarning
      className={`${inter.variable} ${montserrat.variable} h-full antialiased`}
    >
      <head>
        {/* Preconnect to Unsplash for images */}
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />

        {/* Preload hero image for faster LCP */}
        <link
          rel="preload"
          as="image"
          href="/images/hero.webp"
          imageSrcSet="/images/hero.webp?w=640 640w, /images/hero.webp?w=1024 1024w, /images/hero.webp?w=1920 1920w"
          imageSizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 100vw"
          fetchPriority="high"
        />

        {/* Preload Google Fonts CSS */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@600;700;800&display=swap"
        />
      </head>
      <body className="min-h-full bg-primary text-primary">
        <NextIntlClientProvider messages={messages}>
          <LocaleProvider defaultLocale="ua">
            <BookingProvider>
              <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
            </BookingProvider>
          </LocaleProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
