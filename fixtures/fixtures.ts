import { Page, TestInfo, test as base, expect } from "@playwright/test";

type TestFixtures = {
  techShopSite: Page
};

type WorkerFixtures = {

};

const test = base.extend<TestFixtures, WorkerFixtures>({

  techShopSite: async function name({ page }, use, testInfo: TestInfo) {
    await page.goto(process.env.BASE_URL!);
    await page.waitForLoadState('networkidle', { timeout: 2000 });
    use(page);
    // Close
    await testInfo.attach("Screenshot", { body: await page.screenshot(), contentType: 'image/png' })
  }
});

export { test };
export { expect };