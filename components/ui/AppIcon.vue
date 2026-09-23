<script setup lang="ts">
withDefaults(defineProps<{ name: string; size?: number }>(), { size: 20 })
</script>
<template>
  <img
    :src="`/images/figma/${name}.svg`"
    alt=""
    aria-hidden="true"
    :width="size"
    :height="size"
    :style="{ width: `${size}px`, height: `${size}px` }"
    class="app-icon"
  />
</template>
