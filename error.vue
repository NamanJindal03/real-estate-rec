<script setup lang="ts">
import type { NuxtError } from '#app'
defineProps<{ error: NuxtError }>()
</script>
<template>
  <main class="error-page">
    <BrandRechittaMark :size="100" alt="Rechitta" />
    <p class="eyebrow">{{ error.statusCode }}</p>
    <h1>
      {{
        error.statusCode === 404 ? 'A little off the path.' : 'Something interrupted your journey.'
      }}
    </h1>
    <p class="muted">
      {{
        error.statusCode === 404
          ? 'This page isn’t part of the property presentation. Let’s get you back to exploring.'
          : 'Please try again. Your next chapter is still here.'
      }}
    </p>
    <button class="button" @click="clearError({ redirect: '/discover' })">
      Back to discovery →
    </button>
  </main>
</template>
