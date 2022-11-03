import { test, expect } from "@playwright/test";

test("homepage has title and links to agenda page", async ({
  page,
  baseURL,
}) => {
  await page.goto(baseURL ?? "http://localhost:3001");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/MSD-BACK/);

  // create a locator
  const agenda = page.getByRole("link", { name: "Agenda" });

  // Expect an attribute "to be strictly equal" to the value.
  await expect(agenda).toHaveAttribute("href", "/agenda");

  // Click the agenda link.
  await agenda.click();

  // Expects the URL to contain agenda.
  await expect(page).toHaveURL(/.*agenda/);
});
