<script setup lang="ts">
defineProps<{ step: number; next: string }>()
const steps = ['/', '/welcome', '/discover']
</script>
<template>
  <nav class="onboarding-nav" aria-label="Introduction steps">
    <NuxtLink to="/discover" class="button button--ghost">Skip</NuxtLink>
    <div class="step-dots">
      <NuxtLink
        v-for="(path, index) in steps"
        :key="path"
        :to="path"
        :aria-label="`Step ${index + 1}`"
        :aria-current="step === index ? 'step' : undefined"
      >
        <span :class="{ active: step === index }" />
      </NuxtLink>
    </div>
    <UiAppButton :to="next">
      Next
      <UiAppIcon name="arrow" />
    </UiAppButton>
  </nav>
</template>
