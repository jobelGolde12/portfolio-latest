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

  test('project cards render with corrected info and actions', async ({ page }) => {
    await page.goto('/');

    const section = page.locator('#projects');
    await expect(section.getByRole('heading', { level: 3 })).toHaveCount(5);

    // Corrected positioning
    await expect(
      section.getByText('Know if it suits you before you buy.'),
    ).toBeVisible();
    await expect(section.getByText(/decision & action clarity tool/i)).toBeVisible();

    // CTAs: four live demos, one repo-primary card, one repo-secondary link
    await expect(section.getByRole('link', { name: 'Live demo' })).toHaveCount(4);
    await expect(section.getByRole('link', { name: 'View source' })).toHaveCount(1);
    await expect(section.getByRole('link', { name: 'Source ↗' })).toHaveCount(1);

    // Embeddable projects expose an in-place live preview toggle
    await expect(
      section.getByRole('button', { name: 'Live preview' }),
    ).toHaveCount(2);
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
