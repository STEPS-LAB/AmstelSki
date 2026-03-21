import { setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/container";
import { blogPosts } from "@/lib/content/blog";
import { pickLocalized } from "@/lib/i18n";
import type { AppLocale } from "@/i18n/routing";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const typedLocale = locale as AppLocale;

  return (
    <>
      <PageHero
        eyebrow="Journal"
        title={
          typedLocale === "ua"
            ? "Редакційний журнал про winter hospitality"
            : "An editorial journal of winter hospitality"
        }
        copy={
          typedLocale === "ua"
            ? "Короткі тексти про маршрути, сервіс і дизайн як інструмент комфорту."
            : "Short notes on itineraries, service, and design as a tool for comfort."
        }
        image="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1800&q=80"
      />
      <section className="py-24">
        <Container className="grid gap-4">
          {blogPosts.map((post) => (
            <article key={post.slug} className="rounded-sm border border-white/10 bg-white/[0.03] p-6">
              <p className="text-xs uppercase tracking-[0.22em] text-accent-red">
                {pickLocalized(post.category, typedLocale)} · {post.readTime}
              </p>
              <h2 className="mt-4 font-serif text-4xl text-white">
                {pickLocalized(post.title, typedLocale)}
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-secondary">
                {pickLocalized(post.excerpt, typedLocale)}
              </p>
            </article>
          ))}
        </Container>
      </section>
    </>
  );
}
