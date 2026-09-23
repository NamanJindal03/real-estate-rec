import sharp from 'sharp'
import { readdir } from 'node:fs/promises'

const directory = new URL('../public/images/figma/', import.meta.url)
const photos = [
  'advisor',
  'villa',
  'skyline',
  'vision',
  'kitchen',
  'living',
  'bedroom',
  'metro',
  'building',
]
for (const name of photos) {
  await sharp(new URL(`${name}.png`, directory).pathname)
    .resize({ width: name === 'advisor' ? 160 : 1600, withoutEnlargement: true })
    .webp({ quality: 86 })
    .toFile(new URL(`${name}.webp`, directory).pathname)
}
console.log(`Optimized ${photos.length} original Figma photographs. Original exports preserved.`)
console.log(`${(await readdir(directory)).length} assets available.`)
