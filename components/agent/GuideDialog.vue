<script setup lang="ts">
const props = defineProps<{ open: boolean; initialQuestion?: string }>()
const emit = defineEmits<{ close: [] }>()
const question = ref('')
const busy = ref(false)
const error = ref('')
const answer = ref<{ answer: string; path: string; label: string }>()
const { start, stop, listening, message } = useVoiceInput((text) => {
  question.value = text
})
watch(
  () => props.open,
  (open) => {
    if (!open) stop()
    else if (props.initialQuestion) question.value = props.initialQuestion
  },
)
function askPrompt(prompt: string) {
  question.value = prompt
  void ask()
}
async function ask() {
  if (!question.value.trim() || busy.value) return
  busy.value = true
  error.value = ''
  answer.value = undefined
  try {
    answer.value = await $fetch('/api/guide', {
      method: 'POST',
      retry: 0,
      body: { question: question.value },
    })
  } catch {
    error.value = 'The guide couldn’t load an answer. Please try again.'
  } finally {
    busy.value = false
  }
}
</script>
<template>
  <UiAppModal :open="open" title="Ask Rechitta" @close="emit('close')">
    <p class="muted guide-disclosure">
      Your guide to the supplied project presentation. Answers come from project information; live
      AI is not connected.
    </p>
    <div class="suggested-prompts">
      <button
        v-for="prompt in ['Available residences', 'Payment plans', 'Handover date']"
        :key="prompt"
        :disabled="busy"
        @click="askPrompt(prompt)"
      >
        {{ prompt }}
      </button>
    </div>
    <div v-if="busy" class="answer-skeleton" role="status" aria-label="Finding project information">
      <span />
      <span />
      <span />
    </div>
    <div v-if="answer" class="guide-answer" aria-live="polite">
      <p>{{ answer.answer }}</p>
      <NuxtLink :to="answer.path" class="text-link" @click="emit('close')">
        {{ answer.label }} →
      </NuxtLink>
    </div>
    <p v-if="error" class="form-error" role="alert">{{ error }}</p>
    <form class="guide-form" @submit.prevent="ask">
      <label for="question">Your question</label>
      <textarea
        id="question"
        v-model="question"
        required
        maxlength="500"
        rows="3"
        placeholder="What would you like to know?"
      />
      <div class="guide-form-actions">
        <button
          type="button"
          class="icon-button"
          :aria-label="listening ? 'Stop listening' : 'Start voice input'"
          :aria-pressed="listening"
          @click="start"
        >
          <UiAppIcon name="mic" />
        </button>
        <UiAppButton type="submit" :busy="busy" :disabled="!question.trim()">
          {{ busy ? 'Finding an answer…' : 'Ask Rechitta' }}
          <UiAppIcon name="arrow" />
        </UiAppButton>
      </div>
    </form>
    <p v-if="message" class="permission-message" role="status">{{ message }}</p>
  </UiAppModal>
</template>
