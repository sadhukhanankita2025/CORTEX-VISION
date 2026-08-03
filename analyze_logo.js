import sharp from 'sharp';

async function analyze() {
  const meta = await sharp('src/assets/cortex-vision-logo.png').metadata();
  console.log('Size:', meta.width, meta.height, 'hasAlpha:', meta.hasAlpha);

  const { data, info } = await sharp('src/assets/cortex-vision-logo.png')
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Let's print average alpha and RGB for different quadrants
  console.log('Center top sample:', data[(200 * info.width + 600) * 4], data[(200 * info.width + 600) * 4 + 1], data[(200 * info.width + 600) * 4 + 2], data[(200 * info.width + 600) * 4 + 3]);
  console.log('Left top sample:', data[(200 * info.width + 200) * 4], data[(200 * info.width + 200) * 4 + 1], data[(200 * info.width + 200) * 4 + 2], data[(200 * info.width + 200) * 4 + 3]);
  console.log('Bottom sample:', data[(480 * info.width + 600) * 4], data[(480 * info.width + 600) * 4 + 1], data[(480 * info.width + 600) * 4 + 2], data[(480 * info.width + 600) * 4 + 3]);
}

analyze().catch(console.error);
