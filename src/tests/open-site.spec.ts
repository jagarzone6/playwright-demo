import TechShopPage from '../pages/tech-shop-page';
import { test, expect } from '../fixtures/fixtures';

test('Has title', async ({ techShopPage: techShopSite }) => {
  // Expect a title "to contain" a substring.
  await expect(techShopSite).toHaveTitle(/TechShop/);
});

test('Has header', async ({ techShopPage: techShopSite }) => {
  // Expect a title "to contain" a substring.
  await expect(TechShopPage.headerBadge(techShopSite)).toBeVisible();
});