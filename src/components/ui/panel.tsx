import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Panel({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-sm border border-black/10 bg-black/[0.03] p-4 sm:p-6 shadow-[0_24px_80px_rgba(0,0,0,0.08)]",
        className,
      )}
      {...props}
    />
  );
}
