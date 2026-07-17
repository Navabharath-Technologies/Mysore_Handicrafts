const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputPath = 'C:\\Users\\NBT\\.gemini\\antigravity-ide\\brain\\dedea7f7-d173-4391-9ecb-61d3b62abcf2\\media__1784267024029.png';
const publicDir = 'C:\\Users\\NBT\\Desktop\\Mysore_Handicrafts\\frontend\\public';

async function processImage() {
  try {
    // Read the image and trim any transparent/solid background
    const image = sharp(inputPath).trim();
    const metadata = await image.metadata();

    // Determine the max dimension to make it square
    const maxDim = Math.max(metadata.width, metadata.height);

    // Create a perfectly squared, centered image
    const squaredImage = image.resize({
      width: maxDim,
      height: maxDim,
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 0 }
    });

    // Generate different sizes
    await squaredImage.clone().resize(48, 48).toFile(path.join(publicDir, 'favicon.png'));
    await squaredImage.clone().resize(192, 192).toFile(path.join(publicDir, 'logo192.png'));
    await squaredImage.clone().resize(512, 512).toFile(path.join(publicDir, 'logo512.png'));

    // Also just overwrite the large logo.png with the squared, cropped version for safety
    await squaredImage.clone().toFile(path.join(publicDir, 'logo.png'));

    console.log('Successfully processed images!');
  } catch (error) {
    console.error('Error processing image:', error);
  }
}

processImage();
