import type { MetadataRoute } from "next";
import { rooms } from "@/lib/content/rooms";

const locales = ["ua", "en"] as const;
const staticPaths = [
  "",
  "/rooms",
  "/about",
  "/services",
  "/gallery",
  "/blog",
  "/faq",
  "/contacts",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://amstelski.vercel.app";

  const localizedPages = locales.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: `${baseUrl}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
  );

  const roomPages = locales.flatMap((locale) =>
    rooms.map((room) => ({
      url: `${baseUrl}/${locale}/rooms/${room.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  );

  return [...localizedPages, ...roomPages];
}
