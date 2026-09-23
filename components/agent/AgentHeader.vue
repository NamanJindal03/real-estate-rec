<script setup lang="ts">
const emit = defineEmits<{ ask: [] }>()
const orbArtwork = ref<HTMLElement | null>(null)
const { status, message, toggle } = useAudioOrb(orbArtwork)
</script>
<template>
  <header class="agent-header">
    <NuxtLink to="/discover" class="icon-button" aria-label="Back to discovery">
      <UiAppIcon name="back" :size="18" />
    </NuxtLink>
    <button class="agent-header-copy" @click="emit('ask')">
      <small>
        <BrandRechittaMark :size="13" />
        <span>Rechitta</span>
      </small>
      <strong>“The perfect first investment…”</strong>
    </button>
    <button
      class="agent-mic"
      :aria-label="status === 'listening' ? 'Stop project microphone' : 'Start project microphone'"
      :aria-pressed="status === 'listening'"
      @click="toggle"
    >
      <span class="agent-mini-orb" aria-hidden="true">
        <img
          ref="orbArtwork"
          src="/images/figma/welcome-discovery-orb.png"
          alt=""
          width="56"
          height="44"
        />
      </span>
      <UiAppIcon name="mic" :size="18" />
      <span class="sr-only" role="status">{{ message }}</span>
    </button>
  </header>
</template>
