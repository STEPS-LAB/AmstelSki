"use client";

import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useAppLocale } from "@/components/layout/LocaleProvider";
import { testimonials } from "@/lib/content/site-content";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionIntro } from "@/components/ui/section-intro";
import { memo } from "react";

const sectionContent = {
  ua: {
    title: "Відгуки",
  },
  en: {
    title: "Reviews",
  },
};

export const TestimonialsSlider = memo(function TestimonialsSlider() {
  const { locale } = useAppLocale();
  const [mounted, setMounted] = useState(false);
  const content = mounted ? sectionContent[locale as "ua" | "en"] : sectionContent.ua;
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use a default locale during initial render to avoid hydration mismatch
  const displayLocale = mounted ? locale : "ua";

  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: "start",
    dragFree: false,
    skipSnaps: false,
    containScroll: "trimSnaps"
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section ref={sectionRef} className="bg-black/[0.03] py-24" suppressHydrationWarning>
      <Container className="space-y-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionIntro title={content.title} />
          {isInView && emblaApi && (
            <div className="flex gap-3">
              <Button variant="secondary" className="bg-white hover:bg-white/90" onClick={scrollPrev}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="secondary" className="bg-white hover:bg-white/90" onClick={scrollNext}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {testimonials.map((item) => (
              <article
                key={item.author}
                className="min-w-0 flex-[0_0_100%] rounded-sm border border-black/10 bg-white p-6 md:flex-[0_0_48%] lg:flex-[0_0_38%]"
              >
                <div className="flex h-full flex-col">
                  <div className="flex gap-1 text-warm-accent">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-5 flex-1 font-serif text-xl leading-tight text-foreground">
                    &ldquo;{item.quote[displayLocale as "ua" | "en"]}&rdquo;
                  </p>
                  <p className="mt-6 text-sm uppercase tracking-[0.22em] text-accent-red">
                    {item.author}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
});
