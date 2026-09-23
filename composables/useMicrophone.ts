export function useMicrophone() {
  const status = ref<'idle' | 'requesting' | 'granted' | 'denied' | 'unavailable'>('idle')
  const message = ref('')
  async function requestAccess() {
    if (status.value === 'requesting') return
    if (!navigator.mediaDevices?.getUserMedia) {
      status.value = 'unavailable'
      message.value =
        'Microphone access is unavailable here. Continue with text, or use a browser on HTTPS.'
      return
    }
    status.value = 'requesting'
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      stream.getTracks().forEach((track) => track.stop())
      status.value = 'granted'
      message.value = 'Permission granted. Your microphone is off until you start voice input.'
    } catch (error) {
      status.value = 'denied'
      message.value =
        error instanceof DOMException && error.name === 'NotFoundError'
          ? 'No microphone was found. You can continue using text.'
          : 'Microphone access wasn’t granted. You can enable it in browser settings or continue using text.'
    }
  }
  return { status, message, requestAccess }
}
