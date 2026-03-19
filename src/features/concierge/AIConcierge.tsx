"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare, Send, Sparkles, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import type { AppLocale } from "@/i18n/routing";

const responses: Record<
  AppLocale,
  Record<string, string>
> = {
  ua: {
    restaurants:
      "Поруч із готелем найкраще працюють камерні вечері в De Molen та кілька сильних адрес для aprs-ski. Якщо хочете, я підкажу спокійний варіант без гучної зали.",
    lateCheckin:
      "Пізній check-in працює без проблем: ми фіксуємо час прибуття, надсилаємо коротку інструкцію та готуємо room arrival service за потреби.",
    experiences:
      "Після катання я б радив повільну вечерю, винну карту, коротку прогулянку та ранковий слот на менш завантажену трасу.",
    transfer:
      "Можу запропонувати приватний трансфер із точним часом прибуття та комунікацією з рецепцією до вашого заїзду.",
    default:
      "Я в demo mode, але вже можу порадити вечерю, трансфер, пізнє прибуття чи найкращий номер під ваш сценарій відпочинку."
  },
  en: {
    restaurants:
      "Close to the hotel, I would start with De Molen for a quieter dinner and then a short list of strong aprs-ski addresses if you want more energy.",
    lateCheckin:
      "Late check-in is easy: we note your arrival window, share a concise arrival brief, and prepare room access in advance.",
    experiences:
      "After the slopes, I would suggest a slow dinner, a glass from the wine list, a short walk, and an early slot on the calmer side of the mountain.",
    transfer:
      "I can suggest a private transfer plan with precise arrival timing and handoff coordination with reception.",
    default:
      "I am in demo mode, but I can already help with dining, transfers, late arrival, or the best room for your stay pattern."
  }
};

export function AIConcierge() {
  const t = useTranslations("concierge");
  const locale = useLocale() as AppLocale;
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([t("intro")]);
  const [value, setValue] = useState("");

  const suggestions = useMemo(
    () => [
      { key: "restaurants", label: t("suggestions.restaurants") },
      { key: "lateCheckin", label: t("suggestions.lateCheckin") },
      { key: "experiences", label: t("suggestions.experiences") },
      { key: "transfer", label: t("suggestions.transfer") },
    ],
    [t],
  );

  function submit(input: string) {
    const normalized = input.toLowerCase();
    const nextResponse =
      suggestions.find((item) => normalized.includes(item.label.toLowerCase()))?.key ?? "default";

    setMessages((current) => [...current, input, responses[locale][nextResponse]]);
    setValue("");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 z-30 inline-flex items-center gap-3 rounded-full border border-white/14 bg-[rgba(106,111,116,0.72)] px-4 py-3 text-white shadow-[0_20px_60px_rgba(73,63,58,0.18)] backdrop-blur md:bottom-6 md:right-6"
      >
        <MessageSquare className="h-5 w-5 text-accent-red" />
        <span className="hidden text-xs uppercase tracking-[0.22em] sm:inline-block">
          {t("label")}
        </span>
      </button>

      <AnimatePresence>
        {isOpen ? (
          <>
            <motion.button
              type="button"
              className="fixed inset-0 z-40 bg-black/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-24 right-4 z-50 flex w-[calc(100vw-2rem)] max-w-md flex-col overflow-hidden rounded-sm border border-white/10 bg-primary shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
            >
              <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.04] px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent-red/15 text-accent-red">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-white">{t("label")}</p>
                    <p className="text-xs uppercase tracking-[0.18em] text-secondary">
                      {t("online")}
                    </p>
                  </div>
                </div>
                <button type="button" onClick={() => setIsOpen(false)} className="text-white/70">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="max-h-[55svh] space-y-3 overflow-y-auto px-5 py-5">
                {messages.map((message, index) => {
                  const isUser = index % 2 === 1;

                  return (
                    <div key={`${message}-${index}`} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[85%] rounded-sm px-4 py-3 text-sm leading-6 ${
                          isUser ? "bg-accent-red text-white" : "bg-white/[0.05] text-white/80"
                        }`}
                      >
                        {message}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-white/10 px-5 py-4">
                <div className="mb-3 flex flex-wrap gap-2">
                  {suggestions.map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-white/70"
                      onClick={() => submit(item.label)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
                <form
                  className="flex gap-2"
                  onSubmit={(event) => {
                    event.preventDefault();
                    if (!value.trim()) return;
                    submit(value.trim());
                  }}
                >
                  <input
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    placeholder={t("placeholder")}
                    className="h-12 flex-1 rounded-sm border border-white/10 bg-white/5 px-4 text-sm text-white outline-none placeholder:text-white/30"
                  />
                  <button
                    type="submit"
                    className="inline-flex h-12 w-12 items-center justify-center rounded-sm bg-accent-red text-white"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
