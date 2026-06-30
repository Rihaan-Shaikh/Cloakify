import { test, expect } from './extension.fixture';

test('popup page contains the app name and elements', async ({ page, extensionId }) => {
  // Navigate to popup index.html
  await page.goto(`chrome-extension://${extensionId}/index.html`);

  // Verify heading
  const heading = page.locator('h1');
  await expect(heading).toHaveText('Cloakify');

  // Verify status badge
  const badge = page.locator('span:has-text("ACTIVE")');
  await expect(badge).toBeVisible();

  // Verify security settings button
  const button = page.locator('#action-btn');
  await expect(button).toHaveText('Check Runtime Status');
});
