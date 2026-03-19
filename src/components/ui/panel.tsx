import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Panel({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-sm border border-white/10 bg-white/[0.03] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.22)]",
        className,
      )}
      {...props}
    />
  );
}
