const { chromium } = require('playwright');
async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('http://localhost:6008/?path=/story/lucent-ui-input--interactive', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  
  const toolbarButtons = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('[title]')).map(el => el.title);
  });
  console.log('Title attributes:', toolbarButtons);

  await browser.close();
}
run();
