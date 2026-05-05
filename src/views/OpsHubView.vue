<template>
  <div class="screen">
    <div class="page-title">
      <div><h1>Operations</h1><p>Live tracking and daily entries.</p></div>
    </div>
    <div class="hub-tile" @click="router.push({ name: 'espresso' })">
      <div class="hub-icon">☕</div>
      <div class="hub-text"><strong>Espresso Checks</strong><small>Every 2 hours from opening</small></div>
      <span class="hub-arrow">›</span>
    </div>
    <div class="hub-tile" @click="router.push({ name: 'baked' })">
      <div class="hub-icon">🥐</div>
      <div class="hub-text"><strong>Baked Goods</strong><small>Carry-over, added, remaining, waste</small></div>
      <span class="hub-arrow">›</span>
    </div>
    <div class="hub-tile" @click="router.push({ name: 'waste' })">
      <div class="hub-icon">🗑️</div>
      <div class="hub-text"><strong>Waste</strong><small>Log loss with reason</small></div>
      <span class="hub-arrow">›</span>
    </div>
    <div class="hub-tile" @click="router.push({ name: 'stockout' })">
      <div class="hub-icon">⚠️</div>
      <div class="hub-text"><strong>Stockout</strong><small>Record unavailable items</small></div>
      <span class="hub-arrow">›</span>
    </div>
    <div class="hub-tile" @click="router.push({ name: 'counts' })">
      <div class="hub-icon">🧮</div>
      <div class="hub-text"><strong>Critical Counts</strong><small>Stock counts by storage location</small></div>
      <span class="hub-arrow">›</span>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>
