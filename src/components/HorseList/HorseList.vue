<script setup lang="ts">
import type { HorseListProps } from './HorseList.types'

defineProps<HorseListProps>()
</script>

<template>
  <div class="horse-list">
    <div class="header">
      <h2>Horse List (1-20)</h2>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Condition</th>
            <th>Color</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="horse in horses" :key="horse.id">
            <td>{{ horse.name }}</td>
            <td>{{ horse.condition }}</td>
            <td>{{ horse.color }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped src="./HorseList.css"></style>
