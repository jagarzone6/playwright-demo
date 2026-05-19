import TechShopPage from '../pages/tech-shop-page';
import { test, expect } from '../fixtures/fixtures';
import { Locator, Page, TestInfo } from '@playwright/test';

test('Sort the Products List', async ({ techShopPage: techShopSite }, testInfo: TestInfo) => {
  await sortBy(techShopSite, "Key");
  await assertPricesSortedAsc(techShopSite);
  expect(testInfo.errors).toHaveLength(0);
});

type Product = {
  category: string | null,
  title: string | null,
  price: number | null,
  inStock: boolean | null
}

async function sortBy(page: Page, by: string) {
  const request = page.waitForRequest(/search/, { timeout: 10000 });
  const firstProduct = await TechShopPage.products(page).first().elementHandle();
  await TechShopPage.sortBy(page).selectOption("price-asc");
  //await TechShopPage.sortBy(page).selectOption("Price: High to Low");
  await Promise.all([
    await request,
    await firstProduct?.waitForElementState('hidden')
  ]);
  console.log("Sorted by price-asc");
}


async function assertPricesSortedAsc(page: Page) {
  const productsLocators: Locator[] = await TechShopPage.products(page).all();
  const products: Product[] = [];
  for (const pLocator of productsLocators) {
    const product: Product = {
      category: await pLocator.locator(".category").textContent(),
      title: await pLocator.locator(".title").textContent(),
      price: Number.parseFloat((await pLocator.locator(".price").textContent())?.replace("$", "")!),
      inStock: !(await pLocator.textContent())!.includes("Out of stock"),
    }
    products.push(product);
  }
  console.log(`Products in Page: ${products.toLocaleString()}`);
  let sortedProducts = [...products]
  sortedProducts.sort((p1, p2) => p1.price! - p2.price!);
  for (let index = 0; index < sortedProducts.length; index++) {
    const sortedP = sortedProducts[index];
    const actualP = products[index];
    expect.soft(sortedP.title!, `Products list is not sorted properly ! Expected '${JSON.stringify(actualP)}' to be in position ${index}.`).toEqual(actualP.title)
  }
}
