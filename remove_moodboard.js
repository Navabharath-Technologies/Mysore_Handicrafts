const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'frontend', 'src', 'App.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

const startMarker = '/* ================= INSPIRATION MOOD BOARD WORKSPACE ================= */';
const endMarker = '/* ================= EDITORIAL FOOTER ================= */';

const startIndex = cssContent.indexOf(startMarker);
const endIndex = cssContent.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
  cssContent = cssContent.substring(0, startIndex) + cssContent.substring(endIndex);
  fs.writeFileSync(cssPath, cssContent);
  console.log('Moodboard CSS successfully removed.');
} else {
  console.log('Markers not found.');
}
