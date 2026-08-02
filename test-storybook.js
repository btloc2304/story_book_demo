const { chromium } = require('playwright');
const fs = require('fs');

const OUT_DIR = '/Users/lucas/.gemini/antigravity/brain/cae20d43-465d-4ad7-be33-db35405e3cdf/';

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log('Navigating to Storybook...');
  try {
    await page.goto('http://localhost:6008/?path=/docs/lucent-ui-input--docs', { waitUntil: 'networkidle', timeout: 15000 });
  } catch(e) {
    console.error('Failed to load storybook:', e.message);
    await browser.close();
    return;
  }
  
  // Wait for the preview iframe to load
  console.log('Waiting for iframe...');
  await page.waitForSelector('#storybook-preview-iframe');
  const frame = page.frameLocator('#storybook-preview-iframe');

  // Wait for Docs page to render
  console.log('Waiting for Docs content...');
  try {
    await frame.locator('.docblock-argstable').waitFor({ timeout: 10000 });
    console.log('Docs loaded successfully!');
    await page.screenshot({ path: OUT_DIR + 'autodocs.png', fullPage: true });
  } catch (e) {
    console.log('Could not find autodocs table:', e.message);
    await page.screenshot({ path: OUT_DIR + 'autodocs-error.png', fullPage: true });
  }

  // Go to A11y story
  console.log('Navigating to A11y story...');
  await page.goto('http://localhost:6008/?path=/story/lucent-ui-input--accessibility-fail', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: OUT_DIR + 'a11y-fail.png', fullPage: true });
  
  // Go to Interactions story
  console.log('Navigating to Interactions story...');
  await page.goto('http://localhost:6008/?path=/story/lucent-ui-input--interactive', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000); // Give interaction time to play
  await page.screenshot({ path: OUT_DIR + 'interactions.png', fullPage: true });
  
  await browser.close();
  console.log('Done capturing screenshots!');
}

run();
