import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function RoomDetailLoading() {
  return (
    <div className="space-y-10 py-20">
      <Skeleton className="h-[55svh] w-full" />
      <Container className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
        <Skeleton className="h-[28rem] w-full" />
        <Skeleton className="h-[28rem] w-full" />
      </Container>
    </div>
  );
}
