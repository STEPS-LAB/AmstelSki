import dynamic from "next/dynamic";
import { SectionSkeleton } from "@/components/ui/SectionSkeleton";

// Lazy load booking bar with low priority - not critical for LCP
export const HeroBooking = dynamic(
  () => import("@/features/booking/BookingBar").then((mod) => mod.BookingBar),
  { 
    loading: () => (
      <div className="glass-panel rounded-sm px-3 py-3 sm:p-4 relative z-[70] w-fit mx-auto md:w-fit max-w-full min-h-[80px] flex items-center">
        <SectionSkeleton />
      </div>
    ),
    ssr: false 
  }
);
