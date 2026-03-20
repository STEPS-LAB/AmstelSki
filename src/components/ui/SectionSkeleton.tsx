export function SectionSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-8 w-48 bg-surface-strong rounded mb-4" />
      <div className="space-y-3">
        <div className="h-4 w-full bg-surface-strong rounded" />
        <div className="h-4 w-5/6 bg-surface-strong rounded" />
        <div className="h-4 w-4/6 bg-surface-strong rounded" />
      </div>
    </div>
  );
}
