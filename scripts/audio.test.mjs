import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'
import test from 'node:test'
import ts from 'typescript'

function loadModule(path, globals = {}) {
  const source = ts.transpileModule(readFileSync(new URL(path, import.meta.url), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText
  const exports = {}
  runInNewContext(source, { exports, ...globals })
  return exports
}
const { audioBands } = loadModule('../utils/audioBands.ts')

test('frequency bands separate bass, mid and high signals and handle silence', () => {
  const bins = new Uint8Array(512)
  assert.equal(audioBands(bins, 48000, 1024).bass, 0)
  for (const [band, index] of [
    ['bass', 3],
    ['mid', 20],
    ['high', 90],
  ]) {
    bins.fill(0)
    bins[index] = 255
    const result = audioBands(bins, 48000, 1024)
    assert.ok(result[band] > 0)
    for (const other of ['bass', 'mid', 'high'].filter((value) => value !== band))
      assert.equal(result[other], 0)
  }
  bins.fill(255)
  for (const value of Object.values(audioBands(bins, 48000, 1024))) assert.equal(value, 1)
})

function harness({ denied = false, deferred = false, reduced = false } = {}) {
  let stopped = 0
  let closed = 0
  let disconnected = 0
  let animation
  let unmount
  let mount
  let visibility
  let resolveMedia
  let offscreen
  const style = {
    removeProperty(key) {
      delete this[key]
    },
  }
  const track = {
    stop() {
      stopped++
    },
    addEventListener() {},
  }
  const media = { getTracks: () => [track] }
  class AudioContext {
    sampleRate = 48000
    resume() {
      return Promise.resolve()
    }
    close() {
      closed++
      return Promise.resolve()
    }
    createAnalyser() {
      return {
        frequencyBinCount: 512,
        getByteFrequencyData(bins) {
          bins.fill(255)
        },
      }
    }
    createMediaStreamSource() {
      return {
        connect() {},
        disconnect() {
          disconnected++
        },
      }
    }
  }
  const document = {
    hidden: false,
    addEventListener(_, fn) {
      visibility = fn
    },
    removeEventListener() {},
  }
  const { useAudioOrb } = loadModule('../composables/useAudioOrb.ts', {
    require: () => ({ audioBands }),
    ref: (value) => ({ value }),
    onMounted: (fn) => {
      mount = fn
    },
    onBeforeUnmount: (fn) => {
      unmount = fn
    },
    AudioContext,
    DOMException,
    Uint8Array,
    window: { AudioContext, matchMedia: () => ({ matches: reduced }) },
    navigator: {
      mediaDevices: {
        getUserMedia: () =>
          denied
            ? Promise.reject(new DOMException('Denied', 'NotAllowedError'))
            : deferred
              ? new Promise((resolve) => {
                  resolveMedia = resolve
                })
              : Promise.resolve(media),
      },
    },
    document,
    requestAnimationFrame: (fn) => {
      animation = fn
      return 1
    },
    cancelAnimationFrame: () => {
      animation = undefined
    },
    IntersectionObserver: class {
      constructor(fn) {
        offscreen = fn
      }
      observe() {}
      disconnect() {}
    },
  })
  const orb = useAudioOrb({ value: { style } })
  mount()
  return {
    orb,
    style,
    tick: () => animation?.(100),
    counts: () => ({ stopped, closed, disconnected }),
    unmount: () => unmount(),
    hide: () => {
      document.hidden = true
      visibility()
    },
    offscreen: () => offscreen([{ isIntersecting: false }]),
    resolve: () => resolveMedia(media),
  }
}

test('capture animates the original image and stop releases all resources', async () => {
  const h = harness()
  await h.orb.toggle()
  assert.equal(h.orb.status.value, 'listening')
  h.tick()
  assert.match(h.style.transform, /scale\(1.2, 1\.14/)
  assert.match(h.style.filter, /saturate\(1.75\)/)
  h.orb.stop()
  assert.deepEqual(h.counts(), { stopped: 1, closed: 1, disconnected: 1 })
  assert.equal(h.style.transform, undefined)
})
test('denied permission cleans up the audio context and allows recovery', async () => {
  const h = harness({ denied: true })
  await h.orb.toggle()
  assert.equal(h.orb.status.value, 'error')
  assert.match(h.orb.message.value, /denied/)
  assert.equal(h.counts().closed, 1)
})
test('late permission after cancellation releases the acquired stream', async () => {
  const h = harness({ deferred: true })
  const pending = h.orb.toggle()
  await new Promise((resolve) => setImmediate(resolve))
  h.orb.stop()
  h.resolve()
  await pending
  assert.equal(h.orb.status.value, 'idle')
  assert.equal(h.counts().stopped, 1)
})
for (const action of ['hide', 'offscreen', 'unmount']) {
  test(`${action} stops capture and animation`, async () => {
    const h = harness()
    await h.orb.toggle()
    h[action]()
    assert.equal(h.orb.status.value, 'idle')
    assert.equal(h.counts().stopped, 1)
  })
}
test('reduced motion keeps the orb stationary', async () => {
  const h = harness({ reduced: true })
  await h.orb.toggle()
  h.tick()
  assert.match(h.style.transform, /scale\(1.08, 1.05\)/)
  h.unmount()
})
