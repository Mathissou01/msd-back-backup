import { test, expect } from "@playwright/test";

test("homepage has title and links homepage customization page", async ({
  page,
}) => {
  await page.goto(
    `${process.env.NEXT_PUBLIC_BASE_HOST}:${
      process.env.NEXT_PUBLIC_BASE_PORT ?? "3001"
    }`,
  );
  await expect(page).toHaveTitle(/MSD-BACK/);
  await page.getByRole("link", { name: "Page d'accueil" }).click();
  const title = page.getByTestId("title");
  await expect(title).toHaveText("Page d'accueil");
});
