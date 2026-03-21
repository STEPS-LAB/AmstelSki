import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function RoomsLoading() {
  return (
    <Container className="space-y-8 py-20">
      <Skeleton className="h-80 w-full" />
      <div className="grid gap-6 lg:grid-cols-3">
        <Skeleton className="h-[34rem] w-full" />
        <Skeleton className="h-[34rem] w-full" />
        <Skeleton className="h-[34rem] w-full" />
      </div>
    </Container>
  );
}
