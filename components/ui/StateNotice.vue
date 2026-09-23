<script setup lang="ts">
withDefaults(defineProps<{ title: string; message: string; error?: boolean }>(), { error: false })
</script>
<template>
  <div
    class="state-notice"
    :class="{ 'state-notice--error': error }"
    :role="error ? 'alert' : 'status'"
  >
    <h2>{{ title }}</h2>
    <p>{{ message }}</p>
    <slot />
  </div>
</template>
