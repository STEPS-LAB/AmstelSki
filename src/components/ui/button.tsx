import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-accent-red text-white shadow-[0_20px_60px_rgba(198,40,40,0.25)] hover:bg-accent-red-strong",
  secondary:
    "border border-white/12 bg-white/5 text-white hover:bg-white/10",
  ghost: "text-white/80 hover:text-white",
};

export function buttonClasses(variant: Variant = "primary", className?: string) {
  return cn(
    "inline-flex h-12 items-center justify-center rounded-sm px-5 text-sm font-medium tracking-[0.18em] uppercase transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60",
    variants[variant],
    className,
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => (
    <button
      ref={ref}
      className={buttonClasses(variant, className)}
      {...props}
    />
  ),
);

Button.displayName = "Button";
