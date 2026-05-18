import { Locator, Page } from "@playwright/test";

export default class TechShopPage {
  public static headerBadge = (page: Page) => {
    return page.getByRole('banner').filter({ has: page.getByLabel('Playwright practice') });
  }
}