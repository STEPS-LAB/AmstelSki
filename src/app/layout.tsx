import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Inter, Montserrat } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BookingProvider } from "@/features/booking/BookingProvider";
import { LocaleProvider } from "@/components/layout/LocaleProvider";
import type { AppLocale } from "@/i18n/routing";
import "./globals.css";

// Lazy load non-critical components to reduce initial bundle
const ClientWidgets = dynamic(
  () => import("@/components/layout/ClientWidgets").then((mod) => mod.ClientWidgets),
  { loading: () => null }
);

const AIConcierge = dynamic(
  () => import("@/features/concierge/AIConcierge").then((mod) => mod.AIConcierge),
  { loading: () => null }
);

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  preload: true,
  weight: "variable",
  fallback: ["system-ui", "sans-serif"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  preload: true,
  weight: ["500", "600", "700", "800"],
  fallback: ["system-ui", "sans-serif"],
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

  // Critical CSS for above-the-fold content
  const criticalCSS = `
    .critical-loaded{visibility:visible;opacity:1}
    .hero-skeleton{background:linear-gradient(90deg,#1a1a1a 0%,#2a2a2a 50%,#1a1a1a 100%);background-size:200% 100%;animation:shimmer 1.5s infinite}
    @keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
  `;

  return (
    <html
      lang="ua"
      suppressHydrationWarning
      className={`${inter.variable} ${montserrat.variable} h-full antialiased`}
    >
      <head>
        {/* Critical CSS inline */}
        <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />

        {/* Preconnect to external origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />

        {/* Preload hero image - simple sizes for mobile-first LCP */}
        <link
          rel="preload"
          as="image"
          href="/images/hero.webp"
          imageSrcSet="/images/hero.webp 256w, /images/hero.webp 512w, /images/hero.webp 800w, /images/hero.webp 1200w"
          imageSizes="100vw"
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
              <ClientWidgets />
              <AIConcierge />
            </BookingProvider>
          </LocaleProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
