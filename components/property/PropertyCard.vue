<script setup lang="ts">
import type { PropertySection } from '~/types/property'
defineProps<{ section: PropertySection; eager?: boolean }>()
</script>
<template>
  <article :id="section.id" class="property-card" :class="`property-card--${section.id}`">
    <UiFigmaImage :name="section.image" :alt="section.alt" :eager="eager" />
    <div class="property-card-shade" />
    <NuxtLink
      class="property-card-link"
      :to="`/project/${section.id}`"
      :aria-label="`Explore ${section.title}`"
    >
      <div class="property-card-caption">
        <div class="card-title">
          <span class="circle-arrow"><UiAppIcon name="diagonal-arrow" :size="14" /></span>
          <p class="eyebrow">{{ section.eyebrow }}</p>
          <h2>{{ section.title }}</h2>
        </div>
        <div class="card-metric">
          <p class="eyebrow">{{ section.metricLabel }}</p>
          <p>{{ section.metric }}</p>
        </div>
      </div>
    </NuxtLink>
  </article>
</template>
