<script setup lang="ts">
const props = withDefaults(defineProps<{ name: string; alt: string; eager?: boolean }>(), {
  eager: false,
})
const failed = ref(false)
const attempt = ref(0)
const source = computed(() => props.name.replace(/\.png$/, '.webp'))
function retry() {
  failed.value = false
  attempt.value++
}
watch(
  () => props.name,
  () => {
    failed.value = false
  },
)
</script>
<template>
  <div class="figma-image">
    <img
      v-if="!failed"
      :key="attempt"
      :src="`/images/figma/${source}`"
      :alt="alt"
      :loading="eager ? 'eager' : 'lazy'"
      :fetchpriority="eager ? 'high' : 'auto'"
      decoding="async"
      @error="failed = true"
    />
    <div v-else class="image-error">
      <p>Image unavailable</p>
      <button class="text-link" @click="retry">Retry image</button>
    </div>
  </div>
</template>
