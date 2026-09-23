export function audioBands(bins: Uint8Array, sampleRate: number, fftSize: number) {
  const average = (low: number, high: number) => {
    const start = Math.max(1, Math.floor((low * fftSize) / sampleRate))
    const end = Math.min(bins.length, Math.ceil((high * fftSize) / sampleRate))
    let total = 0
    for (let i = start; i < end; i++) total += bins[i] ?? 0
    return end > start ? total / ((end - start) * 255) : 0
  }
  return { bass: average(60, 250), mid: average(250, 2000), high: average(2000, 8000) }
}
