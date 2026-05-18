import { test, expect } from './../fixtures/fixtures';

test('Has title', async ({ techShopSite }) => {
  // Expect a title "to contain" a substring.
  await expect(techShopSite).toHaveTitle(/TechShop/);
});
