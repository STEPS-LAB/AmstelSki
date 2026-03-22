import { getImageProps } from "next/image";
import { cn } from "@/lib/utils";

/**
 * Server-only responsive hero: `<picture>` picks mobile vs desktop without client JS.
 * Avoids the previous client `useEffect` pattern that delayed the LCP image.
 */
export function HeroBackground() {
  const shared = {
    alt: "AmstelSki exterior at night",
    sizes: "100vw" as const,
    priority: true,
    fetchPriority: "high" as const,
    quality: 60,
    style: { objectPosition: "center 20%" as const },
  };

  const mobile = getImageProps({
    ...shared,
    src: "/images/hero-mobile.webp",
    width: 828,
    height: 552,
  });

  const desktop = getImageProps({
    ...shared,
    src: "/images/hero.webp",
    width: 1024,
    height: 683,
  });

  return (
    <div className="absolute inset-0">
      <picture className="absolute inset-0 block h-full w-full">
        <source
          media="(min-width: 768px)"
          srcSet={desktop.props.srcSet ?? undefined}
          sizes={desktop.props.sizes}
        />
        <img
          {...mobile.props}
          className={cn(
            "h-full w-full object-cover object-center",
            mobile.props.className,
          )}
        />
      </picture>
    </div>
  );
}
