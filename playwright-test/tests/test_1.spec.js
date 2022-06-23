const { test } = require('../fixtures');
const { expect } = require('@playwright/test');
const { promisify } = require('util');
const sleep = promisify(setTimeout);


test.describe('feature foo', () => {
  test('test 1', async ({ page },testInfo) => {
    // Assertions use the expect API.
    page.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionName',arguments: {name: 'test first'}})}`);
    const path = testInfo.outputPath("screenshot.png");

    await page.goto('https://www.duckduckgo.com');
      await page.screenshot({ path });
          testInfo.attachments.push({ name: "screenshot", path, contentType: "image/png" });

    const element = await page.$('[name="q"]');
    await element.click();

    await element.type('BrowserStack');
    await sleep(5000);
    await element.press('Enter');
    await sleep(5000);
    const title = await page.title('');
    console.log(title);
    expect(title).toEqual( 'BrowserStack at DuckDuckGo', 'Expected page title is incorrect!');
    await sleep(5000);
  });
});
