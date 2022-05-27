const config = require('../playwright.config');
const { test, expect } = require('@playwright/test');

const baseUrl = config.use.baseURL;

test.describe('Views E2E', () => {
  test('User can create an account', async ({ page }) => {
    // Go to /register
    await page.goto(`${baseUrl}/register`);

    // Fill [name="email"]
    await page.locator('input[name="email"]').fill('user@bcit.ca');

    // Fill [name="password"]
    await page.locator('input[name="password"]').fill('123');

    // Click the signup button
    await Promise.all([
      page.waitForNavigation(),
      page.locator('button:has-text("Sign up")').click(),
    ]);

    await expect(page).toHaveURL(`${baseUrl}/login`);
  });
  
  test('User can login given a username and password', async ({ page }) => {
    // Go to /login
    await page.goto(`${baseUrl}/login`);

    // Fill [name="email"]
    await page.locator('input[name="email"]').fill('user@bcit.ca');

    // Fill [name="password"]
    await page.locator('input[name="password"]').fill('123');

    // Click the login button
    await Promise.all([
      page.waitForNavigation(),
      page.locator('button:has-text("Login")').click(),
    ]);

    await expect(page).toHaveURL(`${baseUrl}/`);
  });

  test('User can navigate to the sign-up page from the login page', async ({ page }) => {
    // Go to /login
    await page.goto(`${baseUrl}/login`);

    // Click the signup button
    await page.locator('a:has-text("Sign Up")').click();

    await expect(page).toHaveURL(`${baseUrl}/register`);
  });

  test('User can navigate to the login page from the sign-up page', async ({ page }) => {
    // Go to /login
    await page.goto(`${baseUrl}/register`);

    // Click the signup button
    await page.locator('a:has-text("Log in")').click();

    await expect(page).toHaveURL(`${baseUrl}/login`);
  });

  test('User can navigate to the easter egg page', async ({ page }) => {
    // Go to /login
    await page.goto(`${baseUrl}/login`);

    // Fill [name="email"]
    await page.locator('input[name="email"]').fill('user@bcit.ca');

    // Fill [name="password"]
    await page.locator('input[name="password"]').fill('123');

    // Click the login button
    await Promise.all([
      page.waitForNavigation(),
      page.locator('text=Login').click(),
    ]);

    // Spam click the logo
    await page.locator('img[alt="Payswap Logo"]').click({
      clickCount: 8,
    });

    await expect(page).toHaveURL(`${baseUrl}/easter-egg`);
  });
});
