import { property } from '../data/property'
export default defineEventHandler(async (event) => {
  await randomApiDelay()
  setHeader(event, 'Cache-Control', 'public, max-age=300, s-maxage=300')
  return property
})
