import { expect, test } from "@playwright/test";

test("homepage loads and locale switch works", async ({ page }) => {
  await page.goto("/ua");

  await expect(page.getByRole("heading", { level: 1, name: "AmstelSki" })).toBeVisible();
  const mobileMenuTrigger = page.getByRole("button", { name: "Open navigation" });

  if (await mobileMenuTrigger.isVisible()) {
    await mobileMenuTrigger.click();
  }

  await page.getByRole("button", { name: /^en$/i }).click();
  await expect(page).toHaveURL(/\/en/);
});

test("rooms page lists premium room cards", async ({ page }) => {
  await page.goto("/ua/rooms");
  await expect(
    page.getByText("Стандартний номер з видом на гори", { exact: true }),
  ).toBeVisible();
});
