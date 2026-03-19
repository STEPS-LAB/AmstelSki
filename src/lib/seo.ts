import type { Metadata } from "next";
import { contactDetails, faqs, testimonials } from "@/lib/content/site-content";
import type { AppLocale } from "@/i18n/routing";
import { pickLocalized } from "@/lib/i18n";

const SITE_URL = "https://amstelski.vercel.app";

export function absoluteUrl(pathname: string) {
  return new URL(pathname, SITE_URL).toString();
}

export function createMetadata({
  locale,
  pathname,
  title,
  description,
}: {
  locale: AppLocale;
  pathname: string;
  title: string;
  description: string;
}): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(`/${locale}${pathname}`),
      languages: {
        uk: absoluteUrl(`/ua${pathname}`),
        en: absoluteUrl(`/en${pathname}`),
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: absoluteUrl(`/${locale}${pathname}`),
      siteName: "AmstelSki",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function hotelJsonLd(locale: AppLocale) {
  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: "AmstelSki",
    url: absoluteUrl(`/${locale}`),
    telephone: contactDetails.phone,
    email: contactDetails.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: pickLocalized(contactDetails.address, locale),
      addressLocality: "Bukovel",
      addressCountry: "UA",
    },
    amenityFeature: [
      "Restaurant",
      "Ski locker",
      "Private transfer",
      "Late check-in support",
    ].map((name) => ({
      "@type": "LocationFeatureSpecification",
      name,
      value: true,
    })),
  };
}

export function localBusinessJsonLd(locale: AppLocale) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "AmstelSki",
    telephone: contactDetails.phone,
    email: contactDetails.email,
    address: pickLocalized(contactDetails.address, locale),
    priceRange: "$$$",
  };
}

export function faqJsonLd(locale: AppLocale) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: pickLocalized(faq.question, locale),
      acceptedAnswer: {
        "@type": "Answer",
        text: pickLocalized(faq.answer, locale),
      },
    })),
  };
}

export function reviewJsonLd(locale: AppLocale) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "Hotel",
      name: "AmstelSki",
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: 5,
      bestRating: 5,
    },
    reviewBody: pickLocalized(testimonials[0]!.quote, locale),
    author: {
      "@type": "Person",
      name: testimonials[0]!.author,
    },
  };
}
