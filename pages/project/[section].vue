<script setup lang="ts">
const route = useRoute()
const { data: property, status, error, refresh } = await useFetch('/api/property', { retry: 0 })
const validSections = ['overview', 'vision', 'location', 'home', 'plans', 'numbers', 'amenities']
if (route.params.section === 'units')
  await navigateTo({ path: '/project/overview', query: { panel: 'units' } }, { redirectCode: 301 })
const isUnits = computed(() => route.query.panel === 'units')
const section = computed(() =>
  property.value?.sections.find((item) => item.id === route.params.section),
)
if (!validSections.includes(String(route.params.section)))
  throw createError({ statusCode: 404, statusMessage: 'This project section could not be found.' })
const guideOpen = ref(false)
const touchStartX = ref(0)
function goToPanel(panel: 'overview' | 'units') {
  void navigateTo({ path: '/project/overview', query: panel === 'units' ? { panel } : {} })
}
function goNext() {
  if (!isUnits.value) goToPanel('units')
}
function handleTouchStart(event: TouchEvent) {
  touchStartX.value = event.changedTouches[0]?.clientX || 0
}
function handleTouchEnd(event: TouchEvent) {
  const distance = (event.changedTouches[0]?.clientX || 0) - touchStartX.value
  if (Math.abs(distance) < 50) return
  if (distance < 0) goNext()
  else if (isUnits.value) goToPanel('overview')
}
const image = computed(() =>
  isUnits.value
    ? 'living.png'
    : section.value?.id === 'overview'
      ? 'skyline.png'
      : section.value?.image || 'villa.png',
)
useSeoMeta({
  title: () => `${isUnits.value ? 'Residences' : section.value?.title || 'Project'} — Rechitta`,
})
</script>
<template>
  <div
    class="detail-page"
    :class="{
      'detail-page--overview': !isUnits && section?.id === 'overview',
      'detail-page--units': isUnits,
    }"
    @touchstart.passive="handleTouchStart"
    @touchend.passive="handleTouchEnd"
  >
    <div class="detail-picture">
      <UiFigmaImage
        :name="image"
        :alt="
          isUnits
            ? 'Living room with sculptural pendant lights'
            : section?.id === 'overview'
              ? 'Dubai skyline with the Burj Khalifa and surrounding roads'
              : section?.alt || 'Project photograph'
        "
        eager
      />
      <div class="detail-shade" />
    </div>
    <div v-if="!isUnits && section?.id === 'overview'" class="detail-top-glow" aria-hidden="true" />
    <div
      v-if="!isUnits && section?.id === 'overview'"
      class="detail-bottom-glow"
      aria-hidden="true"
    >
      <img src="/images/figma/project-glow.svg" alt="" />
    </div>
    <AgentHeader @ask="guideOpen = true" />
    <section class="detail-content">
      <div
        v-if="status === 'pending'"
        class="dot-loader"
        role="status"
        aria-label="Loading project information"
      >
        <span />
        <span />
        <span />
      </div>
      <UiStateNotice
        v-else-if="error"
        error
        title="Project information is unavailable"
        message="Try loading the project again."
      >
        <UiAppButton @click="refresh()">Try again</UiAppButton>
      </UiStateNotice>
      <UiStateNotice
        v-else-if="!property?.sections.length"
        title="No project information yet"
        message="Please check again later."
      />
      <template v-else>
        <h1>{{ isUnits || section?.id === 'overview' ? 'Project Overview' : section?.title }}</h1>
        <PropertyUnitList v-if="isUnits && property" :units="property.units" />
        <template v-else-if="section">
          <PropertyMetricGrid :facts="section.facts" />
        </template>
        <div
          v-if="section?.id === 'overview' || isUnits"
          class="detail-slider"
          aria-label="Project overview pages"
        >
          <div class="detail-dots" role="tablist" aria-label="Project overview pages">
            <button
              type="button"
              role="tab"
              :aria-selected="!isUnits"
              aria-label="Project overview"
              :class="{ active: !isUnits }"
              @click="goToPanel('overview')"
            />
            <button
              type="button"
              role="tab"
              :aria-selected="isUnits"
              aria-label="Residences"
              :class="{ active: isUnits }"
              @click="goToPanel('units')"
            />
          </div>
          <button v-if="!isUnits" type="button" class="detail-next" @click="goNext">
            Next
            <UiAppIcon name="arrow" />
          </button>
        </div>
      </template>
    </section>
    <AgentGuideDialog :open="guideOpen" @close="guideOpen = false" />
  </div>
</template>
