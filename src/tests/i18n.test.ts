import { describe, expect, test } from "vitest";
import { isValidLocale } from "@/i18n/routing";
import { pickLocalized } from "@/lib/i18n";

describe("i18n helpers", () => {
  test("validates supported locales", () => {
    expect(isValidLocale("ua")).toBe(true);
    expect(isValidLocale("en")).toBe(true);
    expect(isValidLocale("nl")).toBe(false);
  });

  test("picks localized values", () => {
    const value = pickLocalized({ ua: "Привіт", en: "Hello" }, "en");

    expect(value).toBe("Hello");
  });
});
