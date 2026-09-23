import assert from 'node:assert/strict'

const base = process.env.SMOKE_BASE_URL || 'http://127.0.0.1:3000'
for (const [path, text] of [
  ['/', 'Your AI Agent'],
  ['/welcome', 'Speak to Discover'],
  ['/discover', 'Berkeley Square North'],
  ['/project/overview', 'Project Overview'],
  ['/project/overview?panel=units', 'Unit #G24'],
  ['/project/vision', 'Dubai 2040'],
  ['/project/location', 'Jumeirah Village Circle'],
  ['/project/home', 'The Perfect Home'],
  ['/project/plans', 'The Plans'],
  ['/project/numbers', 'The Numbers'],
  ['/project/amenities', 'The Life Here'],
]) {
  const response = await fetch(`${base}${path}`)
  assert.equal(response.status, 200, path)
  const html = await response.text()
  const rendered = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '')
  assert.ok(rendered.includes(text), `SSR content missing for ${path}`)
  assert.ok(!/<(?:agentagentheader|propertypropertycard)/i.test(html), 'Unresolved component')
}
for (const path of ['/project/missing', '/missing'])
  assert.equal((await fetch(`${base}${path}`)).status, 404)
for (const name of ['villa.webp', 'rechitta-mark.svg', 'orb.png', 'arrow.svg']) {
  const response = await fetch(`${base}/images/figma/${name}`)
  assert.equal(response.status, 200)
  assert.ok((await response.arrayBuffer()).byteLength > 100)
}
const guide = await fetch(`${base}/api/guide`, {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ question: 'What is the handover date?' }),
})
assert.equal(guide.status, 200)
assert.match((await guide.json()).answer, /conflict/)
console.log('Passed: 11 SSR pages, 404s, 4 assets, and guide response.')
