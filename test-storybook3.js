const { chromium } = require('playwright');
const OUT_DIR = '/Users/lucas/.gemini/antigravity/brain/cae20d43-465d-4ad7-be33-db35405e3cdf/';

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // 1. Interactions Tab
  console.log('Interactions...');
  await page.goto('http://localhost:6008/?path=/story/lucent-ui-input--interactive', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  
  // Make sure the panel is visible and click Interactions
  await page.locator('button', { hasText: 'Interactions' }).click();
  // Wait for the interaction test step to appear (like "Hello Storybook")
  await page.waitForTimeout(2000);
  await page.screenshot({ path: OUT_DIR + 'interactions.png', fullPage: true });

  // 2. A11y Tab
  console.log('A11y...');
  await page.goto('http://localhost:6008/?path=/story/lucent-ui-input--accessibility-fail', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  
  // Click A11y tab
  await page.locator('button', { hasText: 'Accessibility' }).click();
  // Wait for violations to appear
  await page.waitForTimeout(2000);
  await page.screenshot({ path: OUT_DIR + 'a11y-fail.png', fullPage: true });

  await browser.close();
  console.log('Done capturing screenshots!');
}

run();
