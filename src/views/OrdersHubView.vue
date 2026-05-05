<template>
  <div class="screen">
    <div class="page-title">
      <div><h1>Orders &amp; Receiving</h1><p>Register orders, check deliveries, enter invoices in Desk.</p></div>
    </div>
    <div class="hub-tile" @click="router.push({ name: 'delivery' })">
      <div class="hub-icon">🚚</div>
      <div class="hub-text"><strong>Delivery Check</strong><small>Confirm receipt · log issues</small></div>
      <span class="hub-arrow">›</span>
    </div>
    <div class="hub-tile" @click="router.push({ name: 'purchase' })">
      <div class="hub-icon">📋</div>
      <div class="hub-text"><strong>Register Order</strong><small>Log a supplier order placed</small></div>
      <span class="hub-arrow">›</span>
    </div>
    <div v-if="store.role !== 'supervisor'" class="hub-tile" style="opacity:.85" @click="store.toast('Open Ritmise Operations → Invoice Entry in your desktop browser')">
      <div class="hub-icon" style="background:#f0f4f8">🖥️</div>
      <div class="hub-text">
        <strong>Invoice Entry <span class="badge sm">Desk</span></strong>
        <small>Match and confirm in Frappe Desk</small>
      </div>
      <span class="hub-arrow">›</span>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAppStore } from '@/store/app'
const router = useRouter()
const store = useAppStore()
</script>
