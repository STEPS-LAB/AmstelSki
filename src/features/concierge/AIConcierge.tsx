"use client";

import { AnimatePresence, motion, useScroll } from "framer-motion";
import { MessageSquare, Send, Sparkles, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useAppLocale } from "@/components/layout/LocaleProvider";
import { useClientTranslations } from "@/hooks/useClientTranslations";
import { memo } from "react";

const responses: Record<
  string,
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

interface Message {
  text: string;
  isUser: boolean;
  id: number;
  locale: "ua" | "en";
}

export const AIConcierge = memo(function AIConcierge() {
  const { locale } = useAppLocale();
  const { t } = useClientTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ text: "concierge.intro", isUser: false, id: 0, locale: "ua" as "ua" | "en" }]);
  const [value, setValue] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const { scrollY } = useScroll();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageIdRef = useRef(0);

  // Reset messages when locale changes and chat is closed
  if (!isOpen && messages[0].locale !== locale) {
    setMessages([{ text: t("concierge.intro"), isUser: false, id: 0, locale }]);
  }

  useEffect(() => {
    const heroHeight = typeof window !== "undefined" ? window.innerHeight : 0;
    const unsubscribe = scrollY.onChange((latest) => {
      setIsVisible(latest > heroHeight * 0.8);
    });

    return () => unsubscribe();
  }, [scrollY]);

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleWheel = useCallback((event: React.WheelEvent) => {
    if (isOpen) {
      event.stopPropagation();
    }
  }, [isOpen]);

  const suggestions = useMemo(
    () => [
      { key: "restaurants", label: t("concierge.suggestions.restaurants") },
      { key: "lateCheckin", label: t("concierge.suggestions.lateCheckin") },
      { key: "experiences", label: t("concierge.suggestions.experiences") },
      { key: "transfer", label: t("concierge.suggestions.transfer") },
    ],
    [t],
  );

  const submit = useCallback((input: string) => {
    const normalized = input.toLowerCase();
    const nextResponse =
      suggestions.find((item) => normalized.includes(item.label.toLowerCase()))?.key ?? "default";

    setIsSending(true);
    messageIdRef.current += 1;
    const userMessage: Message = { text: input, isUser: true, id: messageIdRef.current, locale };
    setMessages((current) => [...current, userMessage]);
    setValue("");

    setTimeout(() => {
      messageIdRef.current += 1;
      const aiMessage: Message = { text: responses[locale][nextResponse], isUser: false, id: messageIdRef.current, locale };
      setMessages((current) => [...current, aiMessage]);
      setIsSending(false);
    }, 800);
  }, [locale, suggestions]);

  const handleSubmit = useCallback((event: React.FormEvent) => {
    event.preventDefault();
    if (!value.trim() || isSending) return;
    submit(value.trim());
  }, [value, isSending, submit]);

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.button
            type="button"
            onClick={() => setIsOpen(true)}
            className="fixed bottom-20 right-4 z-[95] inline-flex items-center gap-3 rounded-full border border-black/12 bg-white px-4 py-3 text-foreground shadow-[0_20px_60px_rgba(0,0,0,0.15)] backdrop-blur pointer-events-auto md:bottom-6 md:right-6"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <MessageSquare className="h-5 w-5 text-accent-red" />
            <span className="hidden text-xs uppercase tracking-[0.22em] sm:inline-block">
              {t("concierge.label")}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[96] bg-black/40 pointer-events-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="fixed bottom-24 right-4 z-[97] flex h-[575px] w-[calc(100vw-2rem)] max-w-md flex-col overflow-hidden rounded-sm border border-black/10 bg-primary shadow-[0_24px_80px_rgba(0,0,0,0.15)] pointer-events-auto"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-black/10 bg-black/[0.04] px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent-red/15 text-accent-red">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-foreground">{t("concierge.label")}</p>
                    <p className="text-xs uppercase tracking-[0.18em] text-secondary">
                      {t("concierge.online")}
                    </p>
                  </div>
                </div>
                <button type="button" onClick={() => setIsOpen(false)} className="text-foreground/70">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto px-5 py-5">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15 }}
                    className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-sm px-4 py-3 text-sm leading-6 ${
                        message.isUser ? "bg-accent-red text-white" : "bg-black/[0.05] text-foreground/80"
                      }`}
                    >
                      {message.text}
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="border-t border-black/10 px-5 py-4">
                <div className="mb-3 flex flex-wrap gap-2">
                  {suggestions.map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      disabled={isSending}
                      className="rounded-full border border-black/10 bg-black/5 px-3 py-2 text-[10px] uppercase tracking-[0.15em] text-foreground/70 transition-colors hover:bg-black/10 disabled:opacity-50"
                      onClick={() => submit(item.label)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
                <form
                  className="flex gap-2"
                  onSubmit={handleSubmit}
                >
                  <input
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    placeholder={t("placeholder")}
                    disabled={isSending}
                    className="h-12 flex-1 rounded-sm border border-black/10 bg-black/5 px-4 text-sm text-foreground outline-none placeholder:text-foreground/30 disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={isSending}
                    className="inline-flex h-12 w-12 items-center justify-center rounded-sm bg-accent-red text-white disabled:opacity-50"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
});
