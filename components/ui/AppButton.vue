<script setup lang="ts">
withDefaults(
  defineProps<{
    to?: string
    variant?: 'primary' | 'light' | 'ghost'
    busy?: boolean
    disabled?: boolean
    type?: 'button' | 'submit'
  }>(),
  { to: undefined, variant: 'primary', type: 'button' },
)
</script>
<template>
  <NuxtLink v-if="to" :to="to" :class="['button', `button--${variant}`]"><slot /></NuxtLink>
  <button
    v-else
    :type="type"
    :class="['button', `button--${variant}`]"
    :disabled="disabled || busy"
    :aria-busy="busy || undefined"
  >
    <span v-if="busy" class="spinner" aria-hidden="true" />
    <slot />
  </button>
</template>
