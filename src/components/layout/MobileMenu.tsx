"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { navigationItems } from "@/lib/content/site-content";
import { Link } from "@/i18n/navigation";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const t = useTranslations();

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
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] lg:hidden"
        >
          {/* Glassmorphism overlay - fully opaque with blur */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-[#3A4A55]/98 via-[#3A4A55]/98 to-[#3A4A55]/98 backdrop-blur-xl"
            onClick={() => setOpen(false)}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute right-0 top-0 z-10 flex h-full w-full max-w-sm flex-col overflow-y-auto border-l border-white/10 bg-[#3A4A55]/95 px-6 py-6 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-serif text-3xl text-white">AmstelSki</p>
              </div>
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white"
                onClick={() => setOpen(false)}
                aria-label={t("common.close")}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="mt-10 flex flex-1 flex-col gap-3">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-sm border border-white/10 bg-white/[0.03] px-4 py-4 text-lg text-white"
                  onClick={() => setOpen(false)}
                >
                  {t(item.labelKey)}
                </Link>
              ))}
            </nav>

            <div className="mt-8 space-y-4">
              <a
                href="tel:+380688808805"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-sm border border-white/10 bg-white/5 text-sm font-medium uppercase tracking-[0.18em] text-white"
              >
                <Phone className="h-4 w-4" />
                +38 (068) 880 88 05
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button
        type="button"
        className="relative z-[101] inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white lg:hidden"
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
