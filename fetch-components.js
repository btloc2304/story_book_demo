const fs = require('fs');
const path = require('path');
const https = require('https');

// Parse .env manually
const envPath = path.resolve(__dirname, '.env');
const envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';
const figmaKeyMatch = envContent.match(/FIGMA_API_KEY=(.*)/);
const FIGMA_API_KEY = figmaKeyMatch ? figmaKeyMatch[1].trim() : process.env.FIGMA_API_KEY;

if (!FIGMA_API_KEY) {
  console.error("Missing FIGMA_API_KEY in .env");
  process.exit(1);
}

const FILE_KEY = 'Njpq1ncXsldoHXqVOKgFWo';

function fetchFigmaData() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.figma.com',
      path: `/v1/files/${FILE_KEY}`,
      method: 'GET',
      headers: {
        'X-Figma-Token': FIGMA_API_KEY
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`API Error: ${res.statusCode} ${res.statusMessage}`));
        }
      });
    });

    req.on('error', (e) => reject(e));
    req.end();
  });
}

function extractComponents(node, components = new Set(), componentSets = new Set()) {
  if (node.type === 'COMPONENT_SET') {
    componentSets.add(node.name);
  } else if (node.type === 'COMPONENT') {
    // If it's not part of a set, or we just want to track everything
    components.add(node.name);
  }

  if (node.children) {
    node.children.forEach(child => extractComponents(child, components, componentSets));
  }
  
  return { components, componentSets };
}

async function run() {
  try {
    const data = await fetchFigmaData();
    const { components, componentSets } = extractComponents(data.document);
    
    console.log("=== Component Sets (Variants) ===");
    console.log(Array.from(componentSets).join('\n'));
    
    console.log("\n=== Individual Components ===");
    // Filter out variants that typically contain "=" (like property1=value)
    const independentComponents = Array.from(components).filter(c => !c.includes('='));
    console.log(independentComponents.join('\n'));
    
  } catch(e) {
    console.error(e);
  }
}

run();
