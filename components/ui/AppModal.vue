<script setup lang="ts">
const props = defineProps<{ open: boolean; title: string }>()
const emit = defineEmits<{ close: [] }>()
const dialog = ref<HTMLDialogElement>()
const titleId = useId()
watch(
  () => props.open,
  async (open) => {
    await nextTick()
    if (open) dialog.value?.showModal()
    else dialog.value?.close()
  },
  { immediate: true },
)
function backdrop(event: MouseEvent) {
  if (event.target === dialog.value && dialog.value) {
    const bounds = dialog.value.getBoundingClientRect()
    if (
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom
    )
      emit('close')
  }
}
</script>
<template>
  <dialog
    ref="dialog"
    class="app-modal"
    :aria-labelledby="titleId"
    @cancel.prevent="emit('close')"
    @click="backdrop"
  >
    <header class="modal-header">
      <h2 :id="titleId">{{ title }}</h2>
      <button class="icon-button close-button" aria-label="Close dialog" @click="emit('close')">
        ×
      </button>
    </header>
    <slot />
  </dialog>
</template>
