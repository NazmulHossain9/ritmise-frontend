<template>
  <div class="screen">
    <div class="page-title">
      <div><h1>Plan</h1><p>Daily setup and shift wrap-up.</p></div>
    </div>
    <div class="hub-grid">
      <div class="hub-tile" @click="router.push({ name: 'daily' })">
        <div class="hub-icon">🗓️</div>
        <div class="hub-text"><strong>Daily Plan</strong><small>Stations, red zone, breaks, timed actions</small></div>
        <span class="hub-arrow">›</span>
      </div>
      <div class="hub-tile" @click="router.push({ name: 'report' })">
        <div class="hub-icon">📝</div>
        <div class="hub-text"><strong>Captain Report</strong><small>10 scores, timing, carry-forward issues</small></div>
        <span class="hub-arrow">›</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>
