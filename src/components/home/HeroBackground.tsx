/**
 * Server-only hero background. Serves pre-optimized static WebP files directly
 * (bypassing /_next/image) for fastest possible LCP. The <picture> element lets
 * the browser pick mobile vs desktop without any client JS.
 */
export function HeroBackground() {
  return (
    <div className="absolute inset-0">
      <picture>
        <source
          media="(min-width: 768px)"
          srcSet="/images/hero-desktop.webp"
          type="image/webp"
        />
        <img
          src="/images/hero-mobile.webp"
          alt="AmstelSki exterior at night"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center"
          style={{ objectPosition: "center 20%" }}
        />
      </picture>
    </div>
  );
}
