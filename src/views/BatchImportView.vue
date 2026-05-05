<template>
  <div class="screen">
    <div class="breadcrumb">
      <button @click="router.push({ name: 'more-hub' })">← More</button>
      <span>/</span><span>Batch Import</span>
    </div>
    <div class="desk-gate">
      <div class="gate-icon">📥</div>
      <div class="gate-badge">Frappe Desk only</div>
      <h2>Batch Import</h2>
      <p>Ritmise uses Frappe's built-in Data Import tool — no separate import screen needed. Templates are auto-generated per DocType.</p>
      <p class="small" style="margin-top:12px">
        Supported imports: Espresso Check Entries, Baked Goods Daily Records,
        Critical Count Entries, Ritmise Tasks, Operational Staff.
        Access via: Frappe Desk → Data Import.
      </p>
      <button style="margin-top:20px" @click="store.toast('Open Frappe Desk → Data Import')">Open Data Import in Desk →</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAppStore } from '@/store/app'
const router = useRouter()
const store = useAppStore()
</script>
