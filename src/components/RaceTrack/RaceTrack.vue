<script setup lang="ts">
import { computed } from 'vue'
import type { RaceTrackProps } from './RaceTrack.types'
import HorseIcon from '@/assets/horse.svg'

const props = defineProps<RaceTrackProps>()

const trackLanes = computed(() => {
  const lanes = Array.from({ length: 10 }, (_, i) => ({
    number: i + 1,
    horse: props.horses.find((h) => h.lane === i + 1),
  }))
  return lanes
})
</script>

<template>
  <div class="race-track">
    <div class="track-container">
      <div v-for="lane in trackLanes" :key="lane.number" class="lane">
        <div class="lane-number">{{ lane.number }}</div>
        <div class="track-line">
          <div v-if="lane.horse" class="horse" :style="{ left: `${lane.horse.position}%` }">
            <HorseIcon :fill="lane.horse.colorCode" class="horse-icon" />
          </div>
        </div>
      </div>
    </div>
    <div class="race-info">
      <span class="round-info">Round {{ currentRound }} - {{ currentDistance }}m</span>
    </div>
  </div>
</template>

<style scoped src="./RaceTrack.css"></style>
