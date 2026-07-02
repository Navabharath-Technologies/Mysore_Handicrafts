const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'frontend', 'src', 'App.css');
let lines = fs.readFileSync(cssPath, 'utf8').split('\n');

let startIndex = -1;
let endIndex = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('INSPIRATION MOOD BOARD WORKSPACE')) {
    startIndex = i;
  }
  if (startIndex !== -1 && i > startIndex && lines[i].includes('EDITORIAL FOOTER')) {
    endIndex = i;
    break;
  }
}

if (startIndex !== -1 && endIndex !== -1) {
  lines.splice(startIndex, endIndex - startIndex);
  fs.writeFileSync(cssPath, lines.join('\n'));
  console.log('Moodboard CSS successfully removed via lines splice.');
} else {
  console.log('Markers not found.');
}
