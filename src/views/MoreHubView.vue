<template>
  <div class="screen">
    <div class="page-title"><div><h1>More</h1></div></div>

    <div class="hub-grid">
      <div class="hub-tile" @click="router.push({ name: 'tasks' })">
        <div class="hub-icon">✅</div>
        <div class="hub-text"><strong>Tasks</strong><small>Follow-up ownership · captain and above</small></div>
        <span class="hub-arrow">›</span>
      </div>

      <template v-if="store.role !== 'supervisor'">
        <div class="hub-tile" @click="router.push({ name: 'owner-summary' })">
          <div class="hub-icon desk">📊</div>
          <div class="hub-text"><strong>Owner Summary</strong><small>Live exception view</small></div>
          <span class="hub-arrow">›</span>
        </div>
        <div class="hub-tile" style="opacity:.85" @click="router.push({ name: 'batch' })">
          <div class="hub-icon" style="background:#f0f4f8">🖥️</div>
          <div class="hub-text"><strong>Batch Import <span class="badge sm">Desk</span></strong><small>Frappe Data Import tool</small></div>
          <span class="hub-arrow">›</span>
        </div>
        <div class="hub-tile" style="opacity:.85" @click="router.push({ name: 'settings' })">
          <div class="hub-icon" style="background:#f0f4f8">🖥️</div>
          <div class="hub-text"><strong>Settings <span class="badge sm">Desk</span></strong><small>Items, staff, warehouses · Frappe Desk</small></div>
          <span class="hub-arrow">›</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAppStore } from '@/store/app'
const router = useRouter()
const store = useAppStore()
</script>
