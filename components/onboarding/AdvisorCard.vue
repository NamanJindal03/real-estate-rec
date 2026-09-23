<script setup lang="ts">
const open = ref(false)
</script>
<template>
  <div>
    <button class="advisor-card" @click="open = true">
      <img src="/images/figma/advisor.webp" width="56" height="56" alt="Sara Rahman" />
      <span>
        <strong>Sara Rahman</strong>
        <small>Prestige Group · Senior Advisor</small>
        <em>1 new note for you</em>
      </span>
      <span class="notification-dot" aria-hidden="true" />
    </button>
    <UiAppModal :open="open" title="A note from your advisor" @close="open = false">
      <p class="muted">
        Welcome to Berkeley Square North. Explore the project with Rechitta and compare residences.
      </p>
      <p class="signature">
        Sara Rahman
        <small>Prestige Group · Senior Advisor</small>
      </p>
      <UiAppButton to="/discover">
        Explore the property
        <UiAppIcon name="arrow" />
      </UiAppButton>
    </UiAppModal>
  </div>
</template>
