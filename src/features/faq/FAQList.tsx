"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { AppLocale } from "@/i18n/routing";
import { faqs } from "@/lib/content/site-content";
import { pickLocalized } from "@/lib/i18n";

export function FAQList({ locale }: { locale: AppLocale }) {
  const [openId, setOpenId] = useState(0);

  return (
    <div className="grid gap-3">
      {faqs.map((item, index) => {
        const open = openId === index;

        return (
          <article key={index} className="rounded-sm border border-black/10 bg-black/[0.03]">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
              onClick={() => setOpenId(open ? -1 : index)}
            >
              <span className="text-lg text-foreground">{pickLocalized(item.question, locale)}</span>
              <ChevronDown className={`h-5 w-5 text-secondary transition ${open ? "rotate-180" : ""}`} />
            </button>
            {open ? (
              <div className="border-t border-black/10 px-5 py-5 text-sm leading-7 text-secondary">
                {pickLocalized(item.answer, locale)}
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
