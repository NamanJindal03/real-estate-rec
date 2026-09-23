<script setup lang="ts">
const props = withDefaults(defineProps<{ src?: string; showControls?: boolean }>(), {
  src: '/images/figma/orb.png',
  showControls: true,
})
const artwork = ref<HTMLElement | null>(null)
const { status, toggle, stop } = useAudioOrb(artwork)
defineExpose({ stop })
</script>
<template>
  <div class="reactive-orb" :class="{ 'reactive-orb--active': status === 'listening' }">
    <div class="reactive-orb-art">
      <img ref="artwork" :src="src" alt="" width="388" height="307" />
      <slot />
    </div>
    <div v-if="props.showControls" class="orb-controls">
      <slot name="actions" />
      <button
        type="button"
        class="icon-button"
        :aria-label="
          status === 'listening'
            ? 'Stop orb microphone'
            : status === 'requesting'
              ? 'Cancel microphone request'
              : 'Start orb microphone'
        "
        :aria-pressed="status === 'listening'"
        @click="toggle"
      >
        <UiAppIcon name="mic" :size="24" />
      </button>
    </div>
  </div>
</template>
