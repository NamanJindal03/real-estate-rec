<script setup lang="ts">
import type { PropertySection } from '~/types/property'
defineProps<{ facts: PropertySection['facts'] }>()
</script>
<template>
  <dl class="metric-grid">
    <div v-for="fact in facts" :key="fact.label" class="metric-tile">
      <dt>{{ fact.label }}</dt>
      <dd>{{ fact.value }}</dd>
      <p v-if="fact.detail">{{ fact.detail }}</p>
    </div>
  </dl>
</template>
