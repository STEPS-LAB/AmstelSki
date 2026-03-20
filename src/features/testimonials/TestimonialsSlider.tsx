"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useAppLocale } from "@/components/layout/LocaleProvider";
import { useClientTranslations } from "@/hooks/useClientTranslations";
import { testimonials } from "@/lib/content/site-content";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionIntro } from "@/components/ui/section-intro";

const sectionContent = {
  ua: {
    title: "Відгуки",
  },
  en: {
    title: "Reviews",
  },
};

export function TestimonialsSlider() {
  const { locale } = useAppLocale();
  const t = useClientTranslations();
  const content = sectionContent[locale as "ua" | "en"];
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-black/[0.03] py-24">
      <Container className="space-y-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionIntro title={content.title} />
          {isInView && (
            <div className="flex gap-3">
              <Button variant="secondary" className="bg-white hover:bg-white/90" onClick={() => emblaApi?.scrollPrev()}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="secondary" className="bg-white hover:bg-white/90" onClick={() => emblaApi?.scrollNext()}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {isInView && (
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              {testimonials.map((item) => (
                <article
                  key={item.author}
                  className="min-w-0 flex-[0_0_100%] rounded-sm border border-black/10 bg-white p-6 md:flex-[0_0_48%] lg:flex-[0_0_38%]"
                >
                  <div className="flex h-full flex-col">
                    <div className="flex gap-1 text-warm-accent">
                      {Array.from({ length: item.rating }).map((_, index) => (
                        <Star key={index} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <p className="mt-5 flex-1 font-serif text-xl leading-tight text-foreground">
                      "{item.quote[locale as "ua" | "en"]}"
                    </p>
                    <p className="mt-6 text-sm uppercase tracking-[0.22em] text-accent-red">
                      {item.author}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
