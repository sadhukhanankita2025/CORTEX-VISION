import sharp from 'sharp';

async function processLogo() {
  const meta = await sharp('src/assets/cortex-vision-logo.png').metadata();
  console.log('Image dimensions:', meta.width, 'x', meta.height);

  // Let's inspect where non-transparent or brain logo pixels are
  // The image is 1200 x 540
  // In the original logo, the brain-eye icon is on the left side, or centered at top?
  // Let's write a script to find the bounding box of the brain logo graphic!
  
  const { data, info } = await sharp('src/assets/cortex-vision-logo.png')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;

  let minX = width, maxX = 0, minY = height, maxY = 0;

  // Let's find non-transparent or non-background pixels in top 70% of image
  for (let y = 0; y < Math.floor(height * 0.65); y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const a = data[idx + 3];

      // Check if pixel is part of logo (cyan / blue / glowing / non-black non-transparent)
      if (a > 30 && (r > 20 || g > 20 || b > 20)) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  console.log('Brain icon bounds:', { minX, maxX, minY, maxY, w: maxX - minX, h: maxY - minY });

  // Extract the exact brain emblem
  const cropW = maxX - minX + 1;
  const cropH = maxY - minY + 1;

  if (cropW > 0 && cropH > 0) {
    await sharp('src/assets/cortex-vision-logo.png')
      .extract({ left: minX, top: minY, width: cropW, height: cropH })
      .toFile('public/cortex-logo-icon.png');

    await sharp('src/assets/cortex-vision-logo.png')
      .extract({ left: minX, top: minY, width: cropW, height: cropH })
      .toFile('src/assets/cortex-logo-icon.png');

    console.log('Saved exact brain icon crop to public/cortex-logo-icon.png and src/assets/cortex-logo-icon.png!');
  }
}

processLogo().catch(console.error);
