<script setup lang="ts">
import type { HorseCardProps } from './HorseCard.types'
import HorseIcon from '@/assets/horse.svg'

defineProps<HorseCardProps>()
</script>

<template>
  <div class="horse-item" :class="{ 'result-item': isResult }">
    <div class="horse-lane">{{ isResult ? horse.finishPosition : horse.lane }}</div>
    <div class="horse-icon-wrapper">
      <HorseIcon :fill="horse.colorCode" class="horse-icon-small" />
    </div>
    <div class="horse-details">
      <span class="horse-name">{{ horse.name }}</span>
      <span class="horse-condition">Condition: {{ horse.condition }}%</span>
    </div>
    <div v-if="isResult && horse.finishTime" class="finish-time">
      {{ horse.finishTime.toFixed(2) }}s
    </div>
  </div>
</template>

<style scoped src="./HorseCard.css"></style>
