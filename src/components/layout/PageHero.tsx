import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";

export function PageHero({
  eyebrow,
  title,
  copy,
  image,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  image: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-black/14 -mt-20">
      <div className="absolute inset-0">
        <Image src={image} alt={title} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
      </div>
      <Container className="relative z-10 pt-20">
        <Badge>{eyebrow}</Badge>
        <h1 className="mt-6 max-w-4xl font-serif text-5xl text-white sm:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">{copy}</p>
      </Container>
    </section>
  );
}
