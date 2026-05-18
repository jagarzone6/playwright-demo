import TechShopPage from '../pages/tech-shop-page';
import { test, expect } from '../fixtures/fixtures';
import { Page } from '@playwright/test';

test('Search for Products', async ({ techShopSite }) => {
  //await searchProduct(techShopSite, "Key")
  await searchProductAlternative(techShopSite, "Key")
});

type Product = {
  category: string,
  title: string,
  price: number,
  inStock: boolean
}

async function searchProduct(page: Page, query: string) {
  const request = page.waitForRequest(/search/, { timeout: 10000, });
  await TechShopPage.searchInput(page).fill(query, { timeout: 5000 });
  await request;
  const itemsCount = await TechShopPage.products(page).count();
  console.log(`Count of items after query: ${itemsCount}`);
}

async function searchProductAlternative(page: Page, query: string) {
  const beforeItemsCount = await TechShopPage.products(page).count();
  console.log(`Count of items before query: ${beforeItemsCount}`);
  await TechShopPage.searchInput(page).fill(query, { timeout: 5000 });
  await expect(TechShopPage.products(page)).not.toHaveCount(beforeItemsCount);
  const itemsCount = await TechShopPage.products(page).count();
  console.log(`Count of items after query: ${itemsCount}`);
}
