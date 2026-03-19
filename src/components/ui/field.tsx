import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "h-12 w-full rounded-sm border border-black/10 bg-black/5 px-4 text-sm text-foreground outline-none placeholder:text-foreground/35 focus:border-accent-red",
        props.className,
      )}
    />
  );
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        "min-h-28 w-full rounded-sm border border-black/10 bg-black/5 px-4 py-3 text-sm text-foreground outline-none placeholder:text-foreground/35 focus:border-accent-red",
        props.className,
      )}
    />
  );
}
