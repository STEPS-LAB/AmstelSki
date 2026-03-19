import { describe, expect, test } from "vitest";
import { buildSuggestion, getSuggestedRoomSlugs } from "@/lib/booking/suggestions";

describe("booking suggestions", () => {
  test("builds tonight stay", () => {
    const suggestion = buildSuggestion("tonight", new Date("2026-03-19T12:00:00.000Z"));

    expect(suggestion.adults).toBe(2);
    expect(suggestion.children).toBe(0);
    expect(suggestion.checkOut > suggestion.checkIn).toBe(true);
  });

  test("orders weekend suggestions with premium leisure rooms first", () => {
    const rooms = getSuggestedRoomSlugs("weekend");

    expect(rooms[0]).toBe("red-brick-deluxe");
    expect(rooms).toContain("amstel-suite");
  });

  test("orders business suggestions with suite first", () => {
    expect(getSuggestedRoomSlugs("business")[0]).toBe("amstel-suite");
  });
});
