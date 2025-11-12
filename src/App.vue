<script setup lang="ts">
import { computed, watch, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'
import AppHeader from './components/AppHeader'
import HorseList from './components/HorseList'
import RaceTrack from './components/RaceTrack'
import ResultsPanel from './components/ResultsPanel'

const store = useStore()

// Get data from Vuex store
const horses = computed(() => store.getters['horse/allHorses'])
const raceHorses = computed(() => store.getters['race/raceHorses'])
const isRaceRunning = computed(() => store.getters['race/isRaceRunning'])
const currentRound = computed(() => store.getters['race/currentRound'])
const currentDistance = computed(() => store.getters['race/currentDistance'])
const allRoundsCompleted = computed(() => store.getters['race/allRoundsCompleted'])
const raceInProgress = computed(() => store.getters['race/raceInProgress'])
const currentRoundCompleted = computed(() => store.getters['race/currentRoundCompleted'])

const handleGenerateProgram = () => {
  store.dispatch('race/generateProgram')
}

const handleToggleRace = () => {
  store.dispatch('race/toggleRace')
}

// Watch for race completion to automatically advance to next round
watch(currentRoundCompleted, (newValue) => {
  // Only advance when round is completed (not when paused)
  if (newValue && !allRoundsCompleted.value) {
    // Automatically advance to next round after a short delay
    setTimeout(() => {
      store.dispatch('race/nextRound')
    }, 1000)
  }
})

onBeforeUnmount(() => {
  store.dispatch('race/cleanupRaceInterval')
})
</script>

<template>
  <div class="app">
    <AppHeader
      :is-race-running="isRaceRunning"
      :current-round="currentRound"
      :all-rounds-completed="allRoundsCompleted"
      :race-in-progress="raceInProgress"
      @generate-program="handleGenerateProgram"
      @toggle-race="handleToggleRace"
    />
    <div class="main-content">
      <HorseList :horses="horses" />
      <RaceTrack
        :horses="raceHorses"
        :current-round="currentRound"
        :current-distance="currentDistance"
      />
      <ResultsPanel />
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  overflow: hidden;
}

#app {
  height: 100vh;
  width: 100vw;
}
</style>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

@media (min-width: 768px) {
  .main-content {
    display: grid;
    grid-template-columns: 280px 1fr;
    grid-template-rows: 1fr auto;
    gap: 0;
  }
}

@media (min-width: 1024px) {
  .main-content {
    display: flex;
    flex-direction: row;
  }
}
</style>
