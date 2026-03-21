import { getFeaturedRooms } from "@/lib/content/rooms";
import { Container } from "@/components/ui/container";
import { SectionIntro } from "@/components/ui/section-intro";
import { RoomCard } from "@/components/rooms/RoomCard";
import { getLocale } from "@/i18n/request";

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

export async function RoomsPreview() {
  const locale = await getLocale();
  const content = sectionContent[locale as "ua" | "en"];
  const rooms = getFeaturedRooms();

  return (
    <section className="section-border py-24">
      <Container className="space-y-12">
        <SectionIntro title={content.title} copy={content.copy} />
        <div className="grid gap-6 lg:grid-cols-3">
          {rooms.slice(0, 3).map((room) => (
            <div key={room.slug} className="flex h-full">
              <RoomCard room={room} locale={locale as "ua" | "en"} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
