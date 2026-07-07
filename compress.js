const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const uploadsDir = path.join(__dirname, 'frontend', 'public', 'uploads');
const dataFile = path.join(__dirname, 'frontend', 'src', 'data', 'useProducts.js');
const appJsFile = path.join(__dirname, 'frontend', 'src', 'App.js');

async function processImages() {
  console.log('Starting image compression...');
  const files = fs.readdirSync(uploadsDir);
  let processedCount = 0;
  
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (['.jpg', '.jpeg', '.png'].includes(ext)) {
      const originalPath = path.join(uploadsDir, file);
      const newFileName = file.substring(0, file.lastIndexOf('.')) + '.webp';
      const webpPath = path.join(uploadsDir, newFileName);
      
      try {
        await sharp(originalPath)
          .resize({ width: 1200, height: 1200, fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(webpPath);
          
        // Delete original file
        fs.unlinkSync(originalPath);
        processedCount++;
        console.log(`Processed: ${file} -> ${newFileName}`);
      } catch (err) {
        console.error(`Error processing ${file}:`, err);
      }
    }
  }
  
  console.log(`Successfully processed ${processedCount} images.`);
  
  console.log('Updating useProducts.js...');
  let dataContent = fs.readFileSync(dataFile, 'utf8');
  // Replace all image extensions with .webp
  dataContent = dataContent.replace(/\.(jpg|jpeg|png|JPG|PNG)(?=['"])/g, '.webp');
  fs.writeFileSync(dataFile, dataContent);
  console.log('Updated useProducts.js');

  console.log('Updating App.js (in case of banner images)...');
  let appContent = fs.readFileSync(appJsFile, 'utf8');
  appContent = appContent.replace(/\.(jpg|jpeg|png|JPG|PNG)(?=['"])/g, '.webp');
  fs.writeFileSync(appJsFile, appContent);
  console.log('Updated App.js');
}

processImages().catch(console.error);
