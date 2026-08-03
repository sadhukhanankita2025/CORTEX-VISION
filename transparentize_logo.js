import sharp from 'sharp';

async function transparentize() {
  const { data, info } = await sharp('src/assets/cortex-logo-icon.png')
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const newData = Buffer.from(data);

  // Check top-left corner color
  const bgR = data[0];
  const bgG = data[1];
  const bgB = data[2];
  console.log('Background sample color:', bgR, bgG, bgB);

  // If background is bright/light (like in user screenshot: light grayish blue/cream)
  // or near dark background, let's turn background pixels transparent!
  for (let i = 0; i < newData.length; i += 4) {
    const r = newData[i];
    const g = newData[i + 1];
    const b = newData[i + 2];

    // Distance from light background color (light gray/blue e.g., r > 180, g > 190, b > 200)
    // or pure white/light blue gray
    if (r > 170 && g > 180 && b > 190) {
      // Calculate opacity drop
      const brightness = (r + g + b) / 3;
      if (brightness > 220) {
        newData[i + 3] = 0; // completely transparent
      } else {
        const factor = (220 - brightness) / 50;
        newData[i + 3] = Math.max(0, Math.min(255, Math.floor(255 * factor)));
      }
    }
  }

  await sharp(newData, {
    raw: {
      width,
      height,
      channels
    }
  })
  .png()
  .toFile('public/cortex-logo-clean.png');

  await sharp(newData, {
    raw: {
      width,
      height,
      channels
    }
  })
  .png()
  .toFile('src/assets/cortex-logo-clean.png');

  console.log('Saved transparent clean logo!');
}

transparentize().catch(console.error);
