"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Locale = "ua" | "en";

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children, defaultLocale }: { children: ReactNode; defaultLocale: Locale }) {
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load saved locale from localStorage
    const savedLocale = localStorage.getItem("locale") as Locale;
    if (savedLocale && (savedLocale === "ua" || savedLocale === "en")) {
      setLocale(savedLocale);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("locale", locale);
      document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000`;
    }
  }, [locale, mounted]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useAppLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error("useAppLocale must be used within a LocaleProvider");
  }
  return context;
}
