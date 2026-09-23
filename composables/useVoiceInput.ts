interface Recognition {
  lang: string
  interimResults: boolean
  onresult: ((event: { results: { 0: { 0: { transcript: string } } } }) => void) | null
  onerror: ((event: { error: string }) => void) | null
  onend: (() => void) | null
  start: () => void
  abort: () => void
}
export function useVoiceInput(onText: (text: string) => void) {
  const listening = ref(false)
  const message = ref('')
  let recognition: Recognition | undefined
  function stop() {
    recognition?.abort()
    listening.value = false
  }
  function start() {
    if (listening.value) {
      stop()
      return
    }
    const browser = window as unknown as {
      SpeechRecognition?: new () => Recognition
      webkitSpeechRecognition?: new () => Recognition
    }
    const Constructor = browser.SpeechRecognition || browser.webkitSpeechRecognition
    if (!Constructor) {
      message.value =
        'Voice input is not supported in this browser. Please type your question below.'
      return
    }
    recognition = new Constructor()
    recognition.lang = 'en-US'
    recognition.interimResults = false
    recognition.onresult = (event) => {
      onText(event.results[0][0].transcript)
      message.value = 'Voice captured. Review your question before sending.'
    }
    recognition.onerror = (event) => {
      message.value =
        event.error === 'not-allowed'
          ? 'Microphone permission was denied. You can allow it in browser settings or type instead.'
          : 'No speech was captured. Try again or type your question.'
      listening.value = false
    }
    recognition.onend = () => {
      listening.value = false
    }
    try {
      recognition.start()
      listening.value = true
      message.value = 'Listening… Tap again to stop.'
    } catch {
      message.value = 'Could not start voice input. Please try typing.'
    }
  }
  onBeforeUnmount(stop)
  return { start, stop, listening, message }
}
