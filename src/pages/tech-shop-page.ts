import { Locator, Page } from "@playwright/test";

export default class TechShopPage {
  public static headerBadge = (page: Page) => {
    return page.getByRole('banner').filter({ has: page.getByLabel('Playwright practice') });
  };
  public static searchInput = (page: Page) => {
    return page.getByRole('searchbox', { name: "Search products" })
  }
  public static products = (page: Page) => {
    return page.getByRole('list').and(page.getByLabel("Product catalogue"))
      .getByRole('listitem');
  }
}