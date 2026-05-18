import TechShopPage from '../pages/tech-shop-page';
import { test, expect } from '../fixtures/fixtures';
import { Page } from '@playwright/test';

test('Has title', async ({ techShopSite }) => {
  // Expect a title "to contain" a substring.
  await searchProduct(techShopSite, "Key")
});

async function searchProduct(page: Page, query: string) {
  const request = page.waitForRequest(/search/, { timeout: 10000, });
  await TechShopPage.searchInput(page).fill(query, {timeout: 5000});
  await request;
  const itemsCount = await TechShopPage.products(page).count();
  console.log(`Count of items after query: ${itemsCount}`)
}