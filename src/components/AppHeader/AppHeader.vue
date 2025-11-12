<script setup lang="ts">
import { computed } from 'vue'
import type { AppHeaderProps, AppHeaderEmits } from './AppHeader.types'
import AppButton from '../AppButton'

const props = defineProps<AppHeaderProps>()

const emit = defineEmits<AppHeaderEmits>()

const buttonText = computed(() => {
  if (props.isRaceRunning) {
    return `PAUSE ROUND ${props.currentRound}`
  } else if (props.allRoundsCompleted) {
    return 'ALL ROUNDS COMPLETED'
  } else {
    return `START ROUND ${props.currentRound}`
  }
})
</script>

<template>
  <header class="app-header">
    <h1 class="title">Horse Racing</h1>
    <div class="controls">
      <AppButton @click="emit('generateProgram')" :disabled="raceInProgress"> GENERATE PROGRAM </AppButton>
      <AppButton @click="emit('toggleRace')" :disabled="allRoundsCompleted">
        {{ buttonText }}
      </AppButton>
    </div>
  </header>
</template>

<style scoped src="./AppHeader.css"></style>
