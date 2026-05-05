<template>
  <div class="screen">
    <div class="breadcrumb">
      <button @click="router.push({ name: 'more-hub' })">← More</button>
      <span>/</span><span>Settings</span>
    </div>
    <div class="desk-gate">
      <div class="gate-icon">⚙️</div>
      <div class="gate-badge">Frappe Desk only</div>
      <h2>Settings</h2>
      <p>Operational settings — items, staff, warehouses, and Ritmise configuration — are managed in Frappe Desk by admin.</p>
      <p class="small" style="margin-top:12px">
        Item flags (Critical, Baked Good, Stockout-Enabled, Waste-Enabled) ·
        Operational Staff list ·
        ERPNext Warehouse mapping ·
        Ritmise Settings singleton (placeholder item, price tolerance, sync retry)
      </p>
      <button style="margin-top:20px" @click="store.toast('Open Ritmise Operations → Settings in your desktop browser')">Open in Desk →</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAppStore } from '@/store/app'
const router = useRouter()
const store = useAppStore()
</script>
