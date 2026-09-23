import assert from 'node:assert/strict'

const base = process.env.SMOKE_BASE_URL || 'http://127.0.0.1:3000'
const cache = 'public, max-age=300, s-maxage=300'

for (const path of [
  '/api/property',
  '/images/figma/orb.png',
  '/images/figma/discovery-waves.svg',
  '/images/figma/splash-glow.png',
]) {
  const response = await fetch(`${base}${path}`)
  assert.equal(response.status, 200, path)
  assert.equal(response.headers.get('cache-control'), cache, path)
}

const guide = await fetch(`${base}/api/guide`, {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ question: 'Availability' }),
})
assert.equal(guide.status, 200)
assert.equal(guide.headers.get('cache-control'), 'no-store')

console.log('Passed: public/image 300s cache headers and guide no-store response.')
