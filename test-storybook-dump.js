const { chromium } = require('playwright');
async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('http://localhost:6008/?path=/story/lucent-ui-input--interactive', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  
  const tabs = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('[role="tab"]')).map(el => el.textContent);
  });
  console.log('Tabs:', tabs);

  const toolbarButtons = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.css-1466yok button, [role="button"], header button')).map(el => el.title || el.getAttribute('aria-label') || el.textContent);
  });
  console.log('Toolbar buttons:', toolbarButtons);

  await browser.close();
}
run();
