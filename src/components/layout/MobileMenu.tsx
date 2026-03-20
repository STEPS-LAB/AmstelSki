"use client";

import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, usePathname } from "@/i18n/navigation";

const navigationItems = [
  { href: "/", label: { ua: "Головна", en: "Home" } },
  { href: "/#about", label: { ua: "Про нас", en: "About" } },
  { href: "/#rooms", label: { ua: "Номери", en: "Rooms" } },
  { href: "/#services", label: { ua: "Послуги", en: "Services" } },
  { href: "/#gallery", label: { ua: "Галерея", en: "Gallery" } },
  { href: "/contacts", label: { ua: "Контакти", en: "Contacts" } },
] as const;

const closeText = { ua: "Закрити", en: "Close" };

export function MobileMenu({ variant = "light", locale = "ua" }: { variant?: "light" | "dark", locale?: "ua" | "en" }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  const isDark = variant === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const menuContent = (
    <div
      className={`fixed inset-0 z-[100] lg:hidden transition-opacity duration-300 ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Glassmorphism overlay - fully opaque with blur */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-white/98 via-white/98 to-white/98 backdrop-blur-xl"
        onClick={() => setOpen(false)}
      />

      <div
        className={`absolute right-0 top-0 z-10 flex h-full w-full max-w-sm flex-col overflow-y-auto border-l border-black/12 bg-white/95 px-6 py-6 backdrop-blur-xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="font-serif text-3xl text-foreground">AmstelSki</p>
          </div>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-black/5 text-foreground"
            onClick={() => setOpen(false)}
            aria-label={closeText[locale]}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-10 flex flex-1 flex-col gap-3">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-sm border border-black/10 bg-black/[0.03] px-4 py-4 text-lg text-foreground"
              onClick={() => setOpen(false)}
            >
              {item.label[locale]}
            </Link>
          ))}
        </nav>

        <div className="mt-8 space-y-4">
          <a
            href="tel:+380688808805"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-sm border border-black/10 bg-black/5 text-sm font-medium uppercase tracking-[0.18em] text-foreground"
          >
            <Phone className="h-4 w-4" />
            +38 (068) 880 88 05
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        type="button"
        className={`relative z-[101] inline-flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-500 ${
          isDark
            ? "border-white/20 bg-white/10 text-white"
            : "border-black/10 bg-black/5 text-foreground"
        } lg:hidden`}
        onClick={() => setOpen(true)}
        aria-label="Open navigation"
      >
        <Menu className="h-5 w-5" />
      </button>

      {mounted && typeof document !== "undefined"
        ? createPortal(menuContent, document.body)
        : null}
    </>
  );
}
