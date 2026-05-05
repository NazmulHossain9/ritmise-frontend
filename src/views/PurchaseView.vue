<template>
  <div class="screen">
    <div class="breadcrumb">
      <button @click="router.push({ name: 'orders-hub' })">← Orders</button>
      <span>/</span><span>Register Order</span>
    </div>
    <div class="page-title"><div><h1>Register Order</h1></div></div>

    <div class="card">
      <div class="field">
        <label>Supplier *</label>
        <select v-model="form.supplier"><option>GFS</option><option>Mr. Dairy</option><option>Bondi</option><option>Metro Tea</option></select>
      </div>
      <div class="row">
        <div class="field"><label>Date placed</label><input type="date" v-model="form.date" /></div>
        <div class="field"><label>Time placed</label><input type="time" v-model="form.time" /></div>
      </div>
      <div class="row">
        <div class="field"><label>Expected delivery</label><input v-model="form.delivery" /></div>
        <div class="field"><label>Order amount ($) *</label><input type="number" v-model="form.amount" /></div>
      </div>
      <div class="field">
        <label>Placed by</label>
        <select v-model="form.placedBy"><option v-for="s in staff" :key="s">{{ s }}</option></select>
      </div>
      <div class="field"><label>Confirmation / ref # (optional)</label><input v-model="form.ref" placeholder="e.g. GFS-ORD-2381" /></div>
      <div class="field"><label>Note (optional)</label><textarea v-model="form.note"></textarea></div>
      <button @click="submit">Submit Order Registration</button>
      <div v-if="saved" class="notice green mt10">✓ Order registered · PO created in ERPNext</div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/store/app'

const router = useRouter()
const store = useAppStore()
const staff = ['Tommaso', 'Krystal', 'Mackenzie']

const form = reactive({ supplier: 'GFS', date: '2026-04-26', time: '09:30', delivery: 'Tomorrow morning', amount: 460, placedBy: 'Tommaso', ref: '', note: '' })
const saved = ref(false)

function submit() {
  if (!form.amount) { store.toast('Order amount is required'); return }
  saved.value = true
  store.toast('Order registered ✓')
}
</script>
