import type { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

const CONTAINER_BASE = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10";

/**
 * Use `twMerge` only (not `cn`/clsx): mixing clsx + twMerge in client boundaries
 * has caused SSR vs client className mismatches for this component under Turbopack.
 */
export function Container({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={twMerge(CONTAINER_BASE, className)} {...props} />
  );
}
