<template>
  <div class="screen">
    <div class="breadcrumb">
      <button @click="router.push({ name: 'ops-hub' })">← Ops</button>
      <span>/</span><span>Waste</span>
    </div>
    <div class="page-title"><div><h1>Waste</h1></div></div>
    <div class="notice info">Waste entries don't update stock directly. Stock is updated when the next Count Entry is submitted.</div>

    <div class="card">
      <div class="row">
        <div class="field">
          <label>Logged by</label>
          <select v-model="form.loggedBy">
            <option v-for="s in staff" :key="s">{{ s }}</option>
          </select>
        </div>
        <div class="field"><label>Time</label><input type="time" v-model="form.time" /></div>
      </div>
      <div class="field">
        <label>Item</label>
        <select v-model="form.item">
          <option v-for="i in items" :key="i">{{ i }}</option>
        </select>
      </div>
      <div class="row">
        <div class="field"><label>Quantity</label><input type="number" v-model="form.qty" min="0" /></div>
        <div class="field">
          <label>Unit</label>
          <select v-model="form.unit"><option>pcs</option><option>L</option><option>kg</option></select>
        </div>
      </div>
      <div class="field">
        <label>Category *</label>
        <select v-model="form.category">
          <option>Overproduction</option>
          <option>Spoilage / Stale</option>
          <option>Wrongly Made</option>
          <option>Damaged / Broken</option>
          <option>Expired / No Longer Usable</option>
          <option>Improper Freshness Labeling</option>
          <option>Other</option>
        </select>
      </div>
      <div class="notice blue">{{ wasteGuide }}</div>
      <div class="field"><label>Note (optional)</label><textarea v-model="form.note"></textarea></div>
      <button @click="save">Save Waste Entry</button>
      <div v-if="saved" class="notice green mt10">✓ Waste entry saved</div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/store/app'

const router = useRouter()
const store = useAppStore()

const staff = ['Krystal', 'Tommaso', 'Mackenzie', 'Cecilia', 'Cameron', 'Gurpreet', 'Vakeeran', 'Yosef']
const items = ['Butter Croissant', 'Chocolate Croissant', 'Brownie', 'Spanakopita', 'Whole Milk', 'Almond Milk', 'Cream', 'Iced Tea Syrup']

const guideMap = {
  'Overproduction': 'Too much was made or put out.',
  'Spoilage / Stale': 'Item went past usable freshness.',
  'Wrongly Made': 'Item was made incorrectly and cannot be served.',
  'Damaged / Broken': 'Item was damaged during handling or delivery.',
  'Expired / No Longer Usable': 'Item passed its use-by date.',
  'Improper Freshness Labeling': 'Item was not labelled correctly and had to be discarded.',
  'Other': 'Describe the reason in the note below.',
}

const form = reactive({ loggedBy: 'Krystal', time: '16:30', item: 'Butter Croissant', qty: 4, unit: 'pcs', category: 'Overproduction', note: '' })
const saved = ref(false)
const wasteGuide = computed(() => guideMap[form.category] || '')

function save() {
  saved.value = true
  store.toast('Waste entry saved ✓')
}
</script>
