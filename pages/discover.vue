<script setup lang="ts">
useSeoMeta({ title: 'Explore Berkeley Square North — Rechitta' })
const route = useRoute()
const { data: property, status, error, refresh } = await useFetch('/api/property', { retry: 0 })
const guideOpen = ref(false)
const initialQuestion = computed(() =>
  typeof route.query.question === 'string' ? route.query.question : '',
)
onMounted(() => {
  if (initialQuestion.value) guideOpen.value = true
})
</script>
<template>
  <div class="discover-page">
    <AgentWelcomeHero />
    <div
      v-if="status === 'pending'"
      class="dot-loader"
      role="status"
      aria-label="Loading the property presentation"
    >
      <span />
      <span />
      <span />
    </div>
    <UiStateNotice
      v-else-if="error"
      error
      title="The property couldn’t load"
      message="Please check your connection and try again."
    >
      <UiAppButton @click="refresh()">Try again</UiAppButton>
    </UiStateNotice>
    <div v-else-if="property?.sections.length" class="property-collection">
      <PropertyCard
        v-for="(section, index) in property.sections"
        :key="section.id"
        :section="section"
        :eager="index === 0"
      />
      <PropertyViewingCard />
    </div>
    <UiStateNotice
      v-else
      title="Your next chapter is on its way"
      message="No properties are available in this presentation yet."
    >
      <UiAppButton @click="refresh()">Check again</UiAppButton>
    </UiStateNotice>
    <AgentGuideDialog
      :open="guideOpen"
      :initial-question="initialQuestion"
      @close="guideOpen = false"
    />
  </div>
</template>
