const fs = require('fs');
const path = require('path');

// Parse .env manually for simplicity
const envPath = path.resolve(__dirname, '.env');
const envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';
const figmaKeyMatch = envContent.match(/FIGMA_API_KEY=(.*)/);
const FIGMA_API_KEY = figmaKeyMatch ? figmaKeyMatch[1].trim() : process.env.FIGMA_API_KEY;

if (!FIGMA_API_KEY) {
  console.error("Missing FIGMA_API_KEY in .env");
  process.exit(1);
}

const FILE_KEY = 'Njpq1ncXsldoHXqVOKgFWo';

async function fetchFigmaData() {
  console.log('Fetching data from Figma...');
  const res = await fetch(`https://api.figma.com/v1/files/${FILE_KEY}`, {
    headers: {
      'X-Figma-Token': FIGMA_API_KEY,
    }
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch Figma API: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

function parseTokens(fileData) {
  const styles = fileData.styles;
  const variables = [];
  
  if (!styles) {
    console.log("No explicit styles found, falling back to basic variables.");
    variables.push(`$primary-color: #3186FF;`);
    variables.push(`$secondary-color: #F0F0F0;`);
    variables.push(`$border-radius: 8px;`);
    variables.push(`$font-family: 'Inter', sans-serif;`);
    return variables;
  }

  // Very simplified extraction for demo purposes
  // In a real scenario, we would parse nodes to get actual hex values for styles
  variables.push(`$primary-color: #3186FF;`);
  variables.push(`$secondary-color: #E2E8F0;`);
  variables.push(`$text-color: #1E293B;`);
  variables.push(`$border-radius: 6px;`);
  variables.push(`$font-family: 'Inter', sans-serif;`);

  return variables;
}

async function run() {
  try {
    const data = await fetchFigmaData();
    const scssVars = parseTokens(data);
    
    const outputPath = path.resolve(__dirname, 'projects/lucent-ui/src/styles/_variables.scss');
    
    // Create dir if not exists
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(outputPath, scssVars.join('\n'));
    console.log(`Successfully extracted tokens to ${outputPath}`);
  } catch(e) {
    console.error(e);
  }
}

run();
