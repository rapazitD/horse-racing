<script setup lang="ts">
import type { AppButtonProps } from './AppButton.types'

defineOptions({
  name: 'AppButton',
})

const props = withDefaults(defineProps<AppButtonProps>(), {
  variant: 'primary',
  disabled: false,
})
</script>

<template>
  <button class="btn" :class="`btn-${props.variant}`" :disabled="props.disabled">
    <slot />
  </button>
</template>

<style scoped src="./AppButton.css"></style>
