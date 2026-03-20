import dynamic from "next/dynamic";

// Lazy load booking bar with low priority - not critical for LCP
export const HeroBooking = dynamic(
  () => import("@/features/booking/BookingBar").then((mod) => mod.BookingBar),
  {
    loading: () => (
      <div className="glass-panel rounded-sm px-3 py-3 sm:p-4 relative z-[70] w-fit mx-auto md:w-fit max-w-full min-h-[80px] flex items-center justify-center">
        <div className="w-full max-w-[600px] h-12 bg-white/50 rounded-sm animate-pulse" />
      </div>
    ),
  }
);
