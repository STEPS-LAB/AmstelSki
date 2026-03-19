import { cn } from "@/lib/utils";

interface SectionIntroProps {
  eyebrow?: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
}

export function SectionIntro({
  eyebrow,
  title,
  copy,
  align = "left",
}: SectionIntroProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? (
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.28em] text-secondary">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-serif text-4xl text-balance text-white sm:text-5xl">
        {title}
      </h2>
      {copy ? (
        <p className="mt-4 max-w-2xl text-base leading-7 text-secondary sm:text-lg">
          {copy}
        </p>
      ) : null}
    </div>
  );
}
