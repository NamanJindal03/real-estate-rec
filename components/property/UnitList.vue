<script setup lang="ts">
import type { PropertyUnit } from '~/types/property'
const props = defineProps<{ units: PropertyUnit[] }>()
const selected = ref<PropertyUnit>()
</script>
<template>
  <div class="unit-list">
    <div class="unit-panel">
      <button v-for="unit in props.units" :key="unit.id" class="unit-row" @click="selected = unit">
        <span>
          <strong>{{ unit.name }}</strong>
          <small>{{ unit.description }}</small>
        </span>
        <span>{{ unit.price }}</span>
      </button>
    </div>
    <UiAppModal
      :open="!!selected"
      :title="selected?.name || 'Residence'"
      @close="selected = undefined"
    >
      <template v-if="selected">
        <p class="muted">{{ selected.description }}</p>
        <p class="unit-price">{{ selected.price }}</p>
        <p class="muted">
          This residence is shown in the project presentation. Availability and final pricing need
          advisor confirmation.
        </p>
      </template>
    </UiAppModal>
  </div>
</template>
