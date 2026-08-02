const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const components = [
    { name: 'Progress Bar', id: '#components-progress-bar' },
    { name: 'Segmented Control', id: '#components-segmented-control' },
    { name: 'Slider', id: '#components-slider' },
    { name: 'Dialog', id: '#components-dialog' },
    { name: 'Menu', id: '#components-menu' }
  ];
  const results = {};
  
  const pageErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      pageErrors.push(msg.text());
    }
  });
  page.on('pageerror', err => {
    pageErrors.push(err.message);
  });

  try {
    await page.goto('http://localhost:6008/');
    // Wait for the sidebar to load
    await page.waitForSelector('#storybook-explorer-tree');
    
    // Check if the "Components" folder needs to be expanded
    const componentsFolder = await page.locator('[data-item-id="components"] button[data-action="expand-all"]');
    if (await componentsFolder.count() > 0 && await componentsFolder.getAttribute('data-expanded') === 'false') {
      await componentsFolder.click();
      await page.waitForTimeout(500);
    }

    for (const comp of components) {
      console.log(`Testing ${comp.name}...`);
      results[comp.name] = { errors: [], rendered: false };
      pageErrors.length = 0; // clear previous errors

      // Click the sidebar link
      const sidebarItem = page.locator(comp.id);
      
      // Wait for it to be visible before clicking
      await sidebarItem.waitFor({ state: 'visible', timeout: 5000 }).catch(() => null);
      
      const count = await sidebarItem.count();
      if (count === 0) {
        console.log(`Could not find sidebar link for ${comp.name}`);
        results[comp.name].status = 'Not Found';
        continue;
      }
      
      await sidebarItem.click();
      
      // Storybook loads components in an iframe
      const iframeElement = await page.waitForSelector('#storybook-preview-iframe');
      const frame = await iframeElement.contentFrame();
      
      // Wait for the root to appear in the iframe
      await frame.waitForSelector('#storybook-root, #storybook-docs', { timeout: 10000 }).catch(() => null);
      
      // Small delay to let any runtime errors happen
      await page.waitForTimeout(2000);
      
      const rootHtml = await frame.locator('#storybook-root, #storybook-docs').innerHTML().catch(() => '');
      results[comp.name].rendered = rootHtml.length > 20; // just a rough check
      results[comp.name].errors = [...pageErrors];
      results[comp.name].status = results[comp.name].errors.length > 0 ? 'Errors' : (results[comp.name].rendered ? 'Success' : 'Empty');
      
      // Also grab a screenshot
      const safeName = comp.name.replace(/\s+/g, '_').toLowerCase();
      await page.screenshot({ path: `/Users/lucas/.gemini/antigravity/brain/1ca222fa-20bf-4813-abfb-343b8f26ac79/${safeName}.png` });
      
      console.log(`Result for ${comp.name}: ${results[comp.name].status}`);
    }
    
    console.log('\n--- Final Report ---');
    console.log(JSON.stringify(results, null, 2));

  } catch (err) {
    console.error('Script failed:', err);
  } finally {
    await browser.close();
  }
})();
