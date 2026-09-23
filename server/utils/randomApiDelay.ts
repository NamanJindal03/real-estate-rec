export async function randomApiDelay() {
  const latency = 1000 + Math.floor(Math.random() * 1001)
  await new Promise((resolve) => setTimeout(resolve, latency))
}
