<template>
  <div class="screen">
    <div class="breadcrumb">
      <button @click="router.push({ name: 'ops-hub' })">← Ops</button>
      <span>/</span><span>Critical Counts</span>
    </div>
    <div class="page-title"><div><h1>Critical Counts</h1></div></div>
    <div class="notice blue">On submit, a Stock Reconciliation is created automatically in ERPNext. Count is authoritative.</div>

    <div class="card">
      <div class="row">
        <div class="field">
          <label>Storage location</label>
          <select v-model="location">
            <option>All locations</option>
            <option>Walk-in Cooler</option>
            <option>Walk-in Freezer</option>
            <option>FOH Cooler</option>
            <option>Dry Storage</option>
          </select>
        </div>
        <div class="field">
          <label>Counted by *</label>
          <select v-model="countedBy">
            <option value="">Select…</option>
            <option v-for="s in staff" :key="s">{{ s }}</option>
          </select>
        </div>
      </div>
      <div class="segment cols2" style="margin-bottom:0">
        <button :class="mode === 'critical' ? 'active' : ''" @click="mode = 'critical'">Critical only</button>
        <button :class="mode === 'all' ? 'active' : ''" @click="mode = 'all'">All items</button>
      </div>
    </div>

    <div class="card">
      <h2>Select item · tap to enter count</h2>
      <div v-for="item in visibleItems" :key="item.name"
           :class="['check-card', item.selected ? 'selected' : '']"
           @click="toggle(item)">
        <div style="display:flex;align-items:center;justify-content:space-between">
          <strong>{{ item.name }}</strong>
          <span v-if="item.count !== null" class="badge green sm">{{ item.count }} {{ item.unit }}</span>
        </div>
        <div class="csub">{{ item.location }} · Threshold: {{ item.threshold }} {{ item.unit }}</div>
        <div v-if="item.selected" class="card-entry">
          <div class="row">
            <div class="field"><label>Count</label><input type="number" v-model.number="item.count" min="0" /></div>
            <div class="field"><label>Unit</label><input readonly :value="item.unit" /></div>
          </div>
          <button class="sm green" @click.stop="save(item)">Save count</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/store/app'

const router = useRouter()
const store = useAppStore()

const staff = ['Krystal', 'Tommaso', 'Mackenzie', 'Cecilia', 'Cameron', 'Gurpreet', 'Vakeeran', 'Yosef']
const location = ref('All locations')
const countedBy = ref('')
const mode = ref('critical')

const allItems = ref([
  { name: 'Whole Milk',       location: 'Walk-in Cooler',  unit: 'L',   threshold: '12 L',  critical: true,  count: null, selected: false },
  { name: 'Almond Milk',      location: 'Walk-in Cooler',  unit: 'L',   threshold: '6 L',   critical: true,  count: null, selected: false },
  { name: 'Cream',            location: 'Walk-in Cooler',  unit: 'L',   threshold: '4 L',   critical: true,  count: null, selected: false },
  { name: 'Butter Croissant', location: 'Walk-in Cooler',  unit: 'pcs', threshold: '10 pcs',critical: true,  count: null, selected: false },
  { name: 'Iced Tea Syrup',   location: 'FOH Cooler',      unit: 'L',   threshold: '2 L',   critical: true,  count: null, selected: false },
  { name: 'Vanilla Syrup',    location: 'Dry Storage',     unit: 'L',   threshold: '1 L',   critical: false, count: null, selected: false },
  { name: 'Brownie',          location: 'Walk-in Freezer', unit: 'pcs', threshold: '12 pcs',critical: false, count: null, selected: false },
])

const visibleItems = computed(() => {
  let list = allItems.value
  if (location.value !== 'All locations') list = list.filter(i => i.location === location.value)
  if (mode.value === 'critical') list = list.filter(i => i.critical)
  return list
})

function toggle(item) {
  allItems.value.forEach(i => { if (i !== item) i.selected = false })
  item.selected = !item.selected
}

function save(item) {
  item.selected = false
  store.toast(`${item.name} count saved`)
}
</script>
