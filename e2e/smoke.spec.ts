import { test, expect } from '@playwright/test';

test.describe('Portfolio smoke tests', () => {
  test('homepage renders the hero without console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', (err) => errors.push(err.message));

    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Jobel');
    await expect(page.getByText('Sorsogon, Philippines', { exact: true })).toBeVisible();
    expect(errors).toEqual([]);
  });

  test('project case-study dialog opens and closes', async ({ page }) => {
    await page.goto('/');

    const card = page.getByRole('button', {
      name: /Open case study: Profanity Detection API/,
    });
    await card.click();

    const dialog = page.getByRole('dialog', {
      name: /Profanity Detection API case study/,
    });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText('The problem')).toBeVisible();
    await expect(dialog.getByText('Trade-offs')).toBeVisible();
    await expect(dialog.getByRole('link', { name: /Visit live site/ })).toBeVisible();
    await expect(dialog.getByRole('link', { name: /View source/ })).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
  });

  test('blog listing and post pages render', async ({ page }) => {
    await page.goto('/blog');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Blog');
    await expect(
      page.getByRole('link', { name: /Building a Filipino Profanity Detection API/ }),
    ).toBeVisible();

    await page
      .getByRole('link', { name: /Building a Filipino Profanity Detection API/ })
      .click();
    // Dev mode compiles the post route on first request — give it time.
    await page.waitForURL('**/blog/filipino-profanity-detection-api', {
      timeout: 20_000,
    });
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Filipino Profanity Detection API',
      { timeout: 15_000 },
    );
    await expect(
      page.getByText('Why not just use a generic profanity list?'),
    ).toBeVisible();
  });

  test('mobile viewport: menu button opens the navigation dialog', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    const menuButton = page.getByRole('button', { name: /Open navigation menu/ });
    await expect(menuButton).toBeVisible();

    await menuButton.click();
    await expect(
      page.getByRole('dialog', { name: 'Navigation menu' }),
    ).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(
      page.getByRole('dialog', { name: 'Navigation menu' }),
    ).toBeHidden();
  });
});
