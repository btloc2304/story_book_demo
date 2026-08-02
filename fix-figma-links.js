require('dotenv').config();
const fs = require('fs');
const path = require('path');

const FIGMA_API_KEY = process.env.FIGMA_API_KEY;
const FILE_KEY = 'Njpq1ncXsldoHXqVOKgFWo';

async function run() {
  console.log('Fetching Figma document...');
  const res = await fetch(`https://api.figma.com/v1/files/${FILE_KEY}`, {
    headers: { 'X-Figma-Token': FIGMA_API_KEY }
  });
  const data = await res.json();
  
  if (data.err) {
    console.error('Figma Error:', data.err);
    return;
  }

  // Find all components
  const componentNodes = {};
  
  function traverse(node) {
    // Collect ComponentSets (variants) or regular Components
    if (node.type === 'COMPONENT_SET' || node.type === 'COMPONENT') {
      componentNodes[node.name.toLowerCase()] = node.id;
    }
    if (node.children) {
      node.children.forEach(traverse);
    }
  }

  traverse(data.document);
  console.log('Found components in Figma:');
  console.log(componentNodes);

  // Now update the story files
  const storiesDir = path.join(__dirname, 'projects/lucent-ui/src/lib');
  const components = fs.readdirSync(storiesDir).filter(f => f.startsWith('lucent-'));
  
  for (const compDir of components) {
    const compName = compDir.replace('lucent-', ''); // e.g. "button", "input"
    const storyFile = path.join(storiesDir, compDir, `${compDir}.stories.ts`);
    if (!fs.existsSync(storyFile)) continue;
    
    // Find matching node
    // Figma names might be "Button", "Text Input", etc.
    let nodeId = null;
    for (const [name, id] of Object.entries(componentNodes)) {
      if (name.includes(compName) || compName.includes(name)) {
        nodeId = id;
        break;
      }
    }
    
    if (nodeId) {
      console.log(`Matched ${compName} -> ${nodeId}`);
      let content = fs.readFileSync(storyFile, 'utf8');
      
      // The current URL is something like:
      // url: 'https://www.figma.com/design/Njpq1ncXsldoHXqVOKgFWo/Lucent-UI?node-id=940-1&p=f&m=dev'
      // We will replace it with the exact node-id
      const newUrl = `https://www.figma.com/design/${FILE_KEY}/Lucent-UI?node-id=${nodeId.replace(':', '-')}&m=dev`;
      
      content = content.replace(/url:\s*'https:\/\/www\.figma\.com\/design\/[^']+'/, `url: '${newUrl}'`);
      fs.writeFileSync(storyFile, content);
    } else {
      console.log(`Could not match ${compName}`);
    }
  }
}

run().catch(console.error);
