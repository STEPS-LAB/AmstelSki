"use client";

import { MapPin } from "lucide-react";
import type { AppLocale } from "@/i18n/routing";
import { mapLocations } from "@/lib/content/site-content";
import { pickLocalized } from "@/lib/i18n";

export function HotelMap({ locale }: { locale: AppLocale }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="relative min-h-[440px] overflow-hidden rounded-sm border border-white/10 bg-[radial-gradient(circle_at_center,rgba(198,40,40,0.14),transparent_30%),linear-gradient(180deg,#121212,#191919)]">
        <div className="absolute inset-0 opacity-25 luxury-grid" />
        {mapLocations.map((location) => (
          <div
            key={location.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${location.x}%`, top: `${location.y}%` }}
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/60 text-accent-red shadow-[0_16px_40px_rgba(0,0,0,0.35)]">
              <MapPin className="h-5 w-5" />
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {mapLocations.map((location) => (
          <article
            key={location.id}
            className="rounded-sm border border-white/10 bg-white/[0.03] px-5 py-5"
          >
            <p className="text-xs uppercase tracking-[0.22em] text-accent-red">
              {pickLocalized(location.title, locale)}
            </p>
            <p className="mt-3 text-sm leading-7 text-secondary">
              {pickLocalized(location.description, locale)}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
