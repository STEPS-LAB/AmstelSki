"use client";

import { useAppLocale } from "@/components/layout/LocaleProvider";
import { getFeaturedRooms } from "@/lib/content/rooms";
import { Container } from "@/components/ui/container";
import { SectionIntro } from "@/components/ui/section-intro";
import { RoomCard } from "@/components/rooms/RoomCard";
import { memo } from "react";

const sectionContent = {
  ua: {
    title: "Номери",
    copy: "Оберіть ідеальний простір для вашого відпочинку в Буковелі",
  },
  en: {
    title: "Rooms",
    copy: "Choose the perfect space for your stay in Bukovel",
  },
};

export const RoomsPreview = memo(function RoomsPreview() {
  const { locale } = useAppLocale();
  const content = sectionContent[locale as "ua" | "en"];
  const rooms = getFeaturedRooms();

  return (
    <section className="section-border py-24">
      <Container className="space-y-12">
        <SectionIntro title={content.title} copy={content.copy} />
        <div className="grid gap-6 lg:grid-cols-3">
          {rooms.slice(0, 3).map((room) => (
            <div key={room.slug} className="flex h-full">
              <RoomCard room={room} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
});
