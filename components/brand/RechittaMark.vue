<script setup lang="ts">
withDefaults(defineProps<{ size?: number; alt?: string }>(), {
  size: 16,
  alt: 'Rechitta',
})
</script>

<template>
  <img
    class="rechitta-mark"
    src="/images/figma/rechitta-mark.svg"
    :width="size"
    :height="size"
    :alt="alt"
  />
</template>
