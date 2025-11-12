<script setup lang="ts">
import type { RoundCardProps } from './RoundCard.types'
import HorseCard from '@/components/HorseCard'

defineProps<RoundCardProps>()
</script>

<template>
  <div class="round-card">
    <div class="round-header">
      <h3>Round {{ roundNumber }}</h3>
      <span class="distance">{{ distance }}m</span>
    </div>
    <div class="round-content">
      <div class="horses-list">
        <HorseCard v-for="horse in horses" :key="horse.lane" :horse="horse" :is-result="isResult" />
      </div>
    </div>
  </div>
</template>

<style scoped src="./RoundCard.css"></style>
