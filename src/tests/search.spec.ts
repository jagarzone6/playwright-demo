import TechShopPage from '../pages/tech-shop-page';
import { test, expect } from '../fixtures/fixtures';
import { Page } from '@playwright/test';

test('Search for Products', async ({ techShopPage: techShopSite }) => {
  //await searchProduct(techShopSite, "Key")
  await searchProductAlternative(techShopSite, "Key")
  const one = await isProductPresent2(techShopSite, "Mouse");
  const two = await isProductPresent2(techShopSite, "Keyboard");
  const three = await isProductPresent2(techShopSite, "Moonitor");
  console.log();
});

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

const isProductPresent = async (page: Page, productName: string): Promise<boolean> => {
  const productsLocators = await TechShopPage.products(page).all();
  const found = await Promise.all(productsLocators.map(async pL => (await pL.textContent())!.includes(productName)));
  return found.some(f => f == true);
}

async function isProductPresent2(page: Page, productName: string): Promise<boolean> {
  return (await TechShopPage.products(page).filter({ hasText: new RegExp(`${productName}`) }).count()) > 0;
}