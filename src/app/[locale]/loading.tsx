import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function LocaleLoading() {
  return (
    <Container className="space-y-6 py-20">
      <Skeleton className="h-[60svh] w-full" />
      <div className="grid gap-4 md:grid-cols-3">
        <Skeleton className="h-80 w-full" />
        <Skeleton className="h-80 w-full" />
        <Skeleton className="h-80 w-full" />
      </div>
    </Container>
  );
}
