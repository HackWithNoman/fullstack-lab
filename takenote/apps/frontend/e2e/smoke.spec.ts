import { test, expect } from "@playwright/test";

test.describe("TakeNote smoke", () => {
  test("loads the app and displays notes", async ({ page }) => {
    await page.goto("/");

    // App should load and show the sidebar
    await expect(page.locator("text=All Spaces")).toBeVisible();

    // Notes should appear (seeded defaults)
    await expect(page.locator("text=Welcome to TakeNote")).toBeVisible();
  });

  test("can create a new note", async ({ page }) => {
    await page.goto("/");

    // Click the create button (first one visible)
    await page.locator("button:has(svg.lucide-plus)").first().click();

    // Fill title
    await page.fill("#dialog-title", "E2E Test Note");

    // Fill content
    await page.fill("#dialog-content", "Created by Playwright");

    // Submit
    await page.click('button[type="submit"]');

    // New note should appear in the grid
    await expect(page.locator("text=E2E Test Note")).toBeVisible();
  });

  test("can search notes", async ({ page }) => {
    await page.goto("/");

    const searchInput = page.locator('input[type="text"]').first();
    await searchInput.fill("Welcome");

    await expect(page.locator("text=Welcome to TakeNote")).toBeVisible();
    await expect(page.locator("text=Project Brainstorming")).not.toBeVisible();
  });
});
