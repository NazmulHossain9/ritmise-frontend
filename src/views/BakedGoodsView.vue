<template>
  <div class="screen">
    <div class="breadcrumb">
      <button @click="router.push({ name: 'ops-hub' })">← Ops</button>
      <span>/</span><span>Baked Goods</span>
    </div>
    <div class="page-title">
      <div><h1>Baked Goods</h1></div>
      <span class="badge">{{ doneCount }} / {{ items.length }}</span>
    </div>

    <div class="card">
      <div class="field">
        <label>Checked by *</label>
        <select v-model="checkedBy">
          <option value="">Select…</option>
          <option v-for="s in staff" :key="s">{{ s }}</option>
        </select>
      </div>
      <div class="notice blue" style="margin-bottom:0">Carry-over prefilled from yesterday. Tap each item to enter today's numbers. Use "No production" for items not made today.</div>
    </div>

    <div v-for="item in items" :key="item.name"
         :class="['baked-card', item.done ? 'done' : item.noChange ? 'no-change' : item.selected ? 'selected' : '']"
         @click="!item.done && !item.noChange && toggle(item)">
      <div class="baked-card-header">
        <div>
          <strong>{{ item.name }}</strong>
          <span class="small">Carry-over: {{ item.carryOver }}</span>
        </div>
        <span v-if="item.done" class="badge green sm">Done</span>
        <span v-else-if="item.noChange" class="badge sm">No change</span>
      </div>
      <div v-if="item.selected && !item.done && !item.noChange" class="baked-entry">
        <div class="row">
          <div class="field"><label>Added today</label><input type="number" v-model.number="item.added" min="0" /></div>
          <div class="field"><label>Remaining</label><input type="number" v-model.number="item.remaining" min="0" /></div>
        </div>
        <div class="field"><label>Waste</label><input type="number" v-model.number="item.waste" min="0" /></div>
        <div class="btnrow">
          <button class="sm green" @click.stop="saveBaked(item)">Save</button>
          <button class="sm secondary" @click.stop="item.noChange = true; item.selected = false">No production</button>
          <button class="sm ghost" @click.stop="item.selected = false">Cancel</button>
        </div>
      </div>
    </div>

    <div v-if="doneCount > 0" style="margin-top:12px">
      <button @click="submitAll">Submit All Entries</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/store/app'

const router = useRouter()
const store = useAppStore()
const staff = ['Krystal', 'Tommaso', 'Mackenzie', 'Cecilia', 'Cameron']
const checkedBy = ref('')

const items = ref([
  { name: 'Butter Croissant',    carryOver: '3 pcs', added: null, remaining: null, waste: null, selected: false, done: false, noChange: false },
  { name: 'Chocolate Croissant', carryOver: '1 pcs', added: null, remaining: null, waste: null, selected: false, done: false, noChange: false },
  { name: 'Ham & Cheese Croissant', carryOver: '0 pcs', added: null, remaining: null, waste: null, selected: false, done: false, noChange: false },
  { name: 'Almond Croissant',    carryOver: '2 pcs', added: null, remaining: null, waste: null, selected: false, done: false, noChange: false },
  { name: 'Pain au Chocolat',    carryOver: '0 pcs', added: null, remaining: null, waste: null, selected: false, done: false, noChange: false },
  { name: 'Brownie',             carryOver: '4 pcs', added: null, remaining: null, waste: null, selected: false, done: false, noChange: false },
  { name: 'Lemon Tart',          carryOver: '0 pcs', added: null, remaining: null, waste: null, selected: false, done: false, noChange: false },
  { name: 'Spanakopita',         carryOver: '6 pcs', added: null, remaining: null, waste: null, selected: false, done: false, noChange: false },
  { name: 'Quiche',              carryOver: '2 pcs', added: null, remaining: null, waste: null, selected: false, done: false, noChange: false },
  { name: 'Banana Bread',        carryOver: '3 pcs', added: null, remaining: null, waste: null, selected: false, done: false, noChange: false },
])

const doneCount = computed(() => items.value.filter(i => i.done || i.noChange).length)

function toggle(item) {
  items.value.forEach(i => { if (i !== item) i.selected = false })
  item.selected = !item.selected
}

function saveBaked(item) {
  item.done = true
  item.selected = false
  store.toast(`${item.name} saved`)
}

function submitAll() {
  if (!checkedBy.value) { store.toast('Select who checked'); return }
  store.toast('Baked goods submitted ✓')
}
</script>
