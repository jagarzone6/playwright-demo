import { Page, TestInfo, WorkerInfo, test as base, expect } from "@playwright/test";

type TestFixtures = {
  techShopPage: Page
};

type WorkerFixtures = {
  captureErrors: void
};

const test = base.extend<TestFixtures, WorkerFixtures>({
  techShopPage: async function name({ page }, use, testInfo: TestInfo) {
    await page.goto(process.env.BASE_URL!);
    await page.waitForLoadState('networkidle', { timeout: 10000 });
    await use(page);
    if (testInfo.status == 'failed') {
      console.log("Attaching Screenshot on failure")
      await testInfo.attach("Screenshot", { body: await page.screenshot(), contentType: 'image/png' })
    }
  },
  captureErrors: [async function captureErrors({ browser }, use, workerInfo: WorkerInfo) {
    await use();
    console.log("Post Worker tear down !! -> " + workerInfo.workerIndex);
  }, { auto: true, scope: 'worker' }]
});

export { test };
export { expect };