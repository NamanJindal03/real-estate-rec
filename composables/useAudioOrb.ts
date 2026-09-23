import { audioBands } from '~/utils/audioBands'

export function useAudioOrb(target: Ref<HTMLElement | null>) {
  const status = ref<'idle' | 'requesting' | 'listening' | 'error'>('idle')
  const message = ref('')
  let stream: MediaStream | undefined
  let context: AudioContext | undefined
  let source: MediaStreamAudioSourceNode | undefined
  let frame = 0
  let generation = 0
  let observer: IntersectionObserver | undefined

  function stop() {
    generation++
    cancelAnimationFrame(frame)
    stream?.getTracks().forEach((track) => track.stop())
    source?.disconnect()
    void context?.close().catch(() => {})
    stream = undefined
    source = undefined
    context = undefined
    target.value?.style.removeProperty('transform')
    target.value?.style.removeProperty('opacity')
    target.value?.style.removeProperty('filter')
    status.value = 'idle'
  }

  async function toggle() {
    if (status.value === 'listening' || status.value === 'requesting') {
      stop()
      message.value = 'Microphone off.'
      return
    }
    if (!navigator.mediaDevices?.getUserMedia || !window.AudioContext) {
      status.value = 'error'
      message.value =
        'Microphone visualisation is unavailable. Use HTTPS and a supported browser, or continue with text.'
      return
    }
    const request = ++generation
    status.value = 'requesting'
    message.value = 'Waiting for microphone permission… You can cancel at any time.'
    try {
      context = new AudioContext()
      await context.resume()
      if (request !== generation) return
      const acquired = await navigator.mediaDevices.getUserMedia({ audio: true })
      if (request !== generation) {
        acquired.getTracks().forEach((track) => track.stop())
        return
      }
      stream = acquired
      const analyser = context!.createAnalyser()
      analyser.fftSize = 2048
      analyser.minDecibels = -90
      analyser.maxDecibels = -10
      analyser.smoothingTimeConstant = 0.55
      source = context!.createMediaStreamSource(stream)
      source.connect(analyser) // Never connect the microphone to speakers.
      const bins = new Uint8Array(analyser.frequencyBinCount)
      const sampleRate = context!.sampleRate
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
      let last = 0
      status.value = 'listening'
      message.value = 'Microphone on · The orb reacts to your voice. Audio stays on this device.'
      stream.getTracks().forEach((track) =>
        track.addEventListener(
          'ended',
          () => {
            if (request !== generation) return
            stop()
            message.value = 'Microphone disconnected. You can reconnect and try again.'
          },
          { once: true },
        ),
      )
      const animate = (time: number) => {
        if (request !== generation) return
        frame = requestAnimationFrame(animate)
        if (time - last < 1000 / 30 || !target.value) return
        last = time
        analyser.getByteFrequencyData(bins)
        const { bass, mid, high } = audioBands(bins, sampleRate, analyser.fftSize)
        const audioEnergy = Math.min(1, bass * 1.25 + mid * 0.9 + high * 0.35)
        const idlePulse = (Math.sin(time / 320) + 1) * 0.018
        const movement = Math.min(1, Math.max(audioEnergy, idlePulse))
        const scaleX = reducedMotion.matches ? 0.08 : 0.2
        const scaleY = reducedMotion.matches ? 0.05 : 0.14
        const skew = reducedMotion.matches ? 1 : 3
        const rotation = reducedMotion.matches ? 1.2 : 5
        target.value.style.transform = `translateZ(0) scale(${1 + movement * scaleX}, ${1 + movement * scaleY}) skew(${(mid - bass) * skew}deg) rotate(${high * rotation - bass * (rotation / 2)}deg)`
        target.value.style.filter = `saturate(${1 + audioEnergy * 0.75}) contrast(${1 + audioEnergy * 0.16}) hue-rotate(${(high - bass) * 16}deg)`
        target.value.style.opacity = String(0.86 + movement * 0.14)
      }
      frame = requestAnimationFrame(animate)
    } catch (error) {
      if (request !== generation) return
      stop()
      status.value = 'error'
      const name = error instanceof DOMException ? error.name : ''
      message.value =
        name === 'NotAllowedError'
          ? 'Microphone permission was denied. Enable it in browser settings and try again, or continue with text.'
          : name === 'NotFoundError'
            ? 'No microphone found. Connect one and try again, or continue with text.'
            : 'Microphone could not start. It may be in use by another app. Please try again.'
    }
  }

  function pauseWhenHidden() {
    if (document.hidden && ['listening', 'requesting'].includes(status.value)) {
      stop()
      message.value = 'Microphone paused. Press the microphone button to start again.'
    }
  }
  onMounted(() => {
    document.addEventListener('visibilitychange', pauseWhenHidden)
    observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting && ['listening', 'requesting'].includes(status.value)) {
        stop()
        message.value = 'Microphone paused while the orb is off screen.'
      }
    })
    if (target.value) observer.observe(target.value)
  })
  onBeforeUnmount(() => {
    stop()
    observer?.disconnect()
    document.removeEventListener('visibilitychange', pauseWhenHidden)
  })
  return { status, message, toggle, stop }
}
