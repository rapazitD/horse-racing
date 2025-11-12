<script setup lang="ts">
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import RoundCard from '@/components/RoundCard'
import type { RoundResult } from '@/store/types'

const store = useStore()
const scrollContainer = ref<HTMLElement | null>(null)

const programGenerated = computed(() => store.getters['race/programGenerated'])
const raceHorses = computed(() => store.getters['race/raceHorses'])
const rounds = computed(() => store.getters['race/rounds'])
const roundResults = computed(() => store.getters['race/roundResults'] as RoundResult[])

// Convert race horses to round horses format for program display
const programHorses = computed(() => {
  return raceHorses.value.map(
    (horse: { lane: number; name: string; condition: number; colorCode: string }) => ({
      lane: horse.lane,
      name: horse.name,
      condition: horse.condition,
      colorCode: horse.colorCode,
    }),
  )
})

// Get result for a specific round
const getRoundResult = (roundNumber: number): RoundResult | undefined => {
  return roundResults.value.find((r: RoundResult) => r.roundNumber === roundNumber)
}

const hasAnyResults = (roundNumber: number): boolean => {
  const result = getRoundResult(roundNumber)
  return result !== undefined && result.horses.length > 0
}
</script>

<template>
  <div class="results-panel">
    <div class="panel-content">
      <div ref="scrollContainer" class="rounds-container">
        <div v-if="!programGenerated" class="empty-state">
          <p>Generate a program to start racing</p>
        </div>
        <div v-else class="rounds-list">
          <div v-for="round in rounds" :key="round.roundNumber" class="round-row">
            <!-- Program Column -->
            <div class="round-column program-column">
              <div class="column-header">
                <h4>Program</h4>
              </div>
              <RoundCard
                :round-number="round.roundNumber"
                :distance="round.distance"
                :horses="programHorses"
                :is-result="false"
              />
            </div>

            <!-- Results Column -->
            <div class="round-column results-column">
              <div class="column-header">
                <h4>Results</h4>
              </div>
              <template v-if="hasAnyResults(round.roundNumber)">
                <RoundCard
                  :round-number="round.roundNumber"
                  :distance="round.distance"
                  :horses="getRoundResult(round.roundNumber)!.horses"
                  :is-result="true"
                />
              </template>
              <div v-else class="pending-result">
                <p>Race not started</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="./ResultsPanel.css"></style>
