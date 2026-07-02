const fs = require('fs');
const path = require('path');

const uploadsDir = path.join(__dirname, 'public/uploads');
const dataFile = path.join(__dirname, 'src/data/productsData.json');

const productsData = JSON.parse(fs.readFileSync(dataFile, 'utf8'));

// Extract all used upload URLs
const usedImages = new Set();
productsData.forEach(p => {
  if (p.image_front) usedImages.add(p.image_front.split('?')[0].replace('/uploads/', ''));
  if (p.image_detail) usedImages.add(p.image_detail.split('?')[0].replace('/uploads/', ''));
  if (p.image_room) usedImages.add(p.image_room.split('?')[0].replace('/uploads/', ''));
  
  if (p.swatches) {
    let swatches = typeof p.swatches === 'string' ? JSON.parse(p.swatches) : p.swatches;
    swatches.forEach(sw => {
      if (sw.image) usedImages.add(sw.image.split('?')[0].replace('/uploads/', '').replace('http://localhost:5000/uploads/', ''));
    });
  }

  if (p.additional_images) {
    let additional = typeof p.additional_images === 'string' ? JSON.parse(p.additional_images) : p.additional_images;
    additional.forEach(img => {
      usedImages.add(img.split('?')[0].replace('/uploads/', ''));
    });
  }
});

// Check all files in public/uploads
const allFiles = fs.readdirSync(uploadsDir);
const unusedFiles = allFiles.filter(file => !usedImages.has(file) && file !== 'uploads');

console.log(`Total used images: ${usedImages.size}`);
console.log(`Total files in uploads: ${allFiles.length}`);
console.log(`Unused files to delete: ${unusedFiles.length}`);

// Write list to a file for plan
fs.writeFileSync('unused_uploads.json', JSON.stringify(unusedFiles, null, 2));
