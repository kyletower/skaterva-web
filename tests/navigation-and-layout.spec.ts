import { test, expect } from '@playwright/test';

test.describe('homepage and navigation', () => {
  test('homepage loads and book a party CTA is visible', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Ashland Skateland/i);
    await expect(
      page.getByRole('link', { name: /Book a Party/i }).first()
    ).toBeVisible();
  });

  test('desktop navigation routes to schedule and contact', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');

    await page.getByRole('link', { name: 'Schedule' }).first().click();
    await expect(page).toHaveURL(/\/schedule$/);
    await expect(
      page.getByRole('heading', { name: /What's Coming Up/i })
    ).toBeVisible();

    await page.getByRole('link', { name: 'Contact' }).first().click();
    await expect(page).toHaveURL(/\/contact$/);
    await expect(
      page.getByRole('heading', {
        name: /Easy to find, easy to call, easy to visit/i,
      })
    ).toBeVisible();
  });

  test('mobile navigation menu opens and closes', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');

    await page.getByRole('button', { name: /Open navigation menu/i }).click();
    await expect(
      page.getByRole('dialog', { name: /ASHLAND SKATELAND/i })
    ).toBeVisible();

    await page.getByRole('button', { name: /Close navigation menu/i }).click();
    await expect(
      page.getByRole('dialog', { name: /ASHLAND SKATELAND/i })
    ).toBeHidden();
  });

  test('responsive layout sanity checks at common widths', async ({ page }) => {
    const viewports = [
      { width: 375, height: 812 },
      { width: 768, height: 1024 },
      { width: 1024, height: 768 },
      { width: 1440, height: 900 },
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.goto('/');

      await expect(
        page.getByRole('heading', {
          level: 1,
          name: /RVA's Premier Roller Skating Experience/i,
        })
      ).toBeVisible();

      const hasHorizontalOverflow = await page.evaluate(() => {
        const root = document.documentElement;
        return root.scrollWidth > root.clientWidth;
      });

      expect(hasHorizontalOverflow).toBe(false);
    }
  });

  test('no javascript console errors on initial page load', async ({
    page,
  }) => {
    const errors: string[] = [];

    page.on('console', (message) => {
      if (message.type() === 'error') {
        errors.push(message.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    expect(errors).toEqual([]);
  });
});
