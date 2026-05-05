<template>
  <div class="screen">
    <div class="breadcrumb">
      <button @click="router.push({ name: 'ops-hub' })">← Ops</button>
      <span>/</span><span>Stockout</span>
    </div>
    <div class="page-title"><div><h1>Stockout</h1></div></div>

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
      <div class="field">
        <label>Likely cause *</label>
        <select v-model="form.cause">
          <option>Prep / Bake Shortfall</option>
          <option>Not Ordered</option>
          <option>Delivery Short / Missing</option>
          <option>Delayed Order</option>
          <option>Restocking Missed</option>
          <option>Unexpected Demand</option>
          <option>Counting Error</option>
          <option>Item Spoiled / Not Usable</option>
          <option>Other</option>
        </select>
      </div>
      <div class="field">
        <label>Resolved?</label>
        <select v-model="form.resolved">
          <option>No — active</option>
          <option>Yes — substitution offered</option>
          <option>Yes — item restocked</option>
        </select>
      </div>
      <div class="field"><label>Note (optional)</label><textarea v-model="form.note"></textarea></div>
      <button @click="save">Save Stockout</button>
      <div v-if="saved" class="notice green mt10">✓ Stockout saved</div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/store/app'

const router = useRouter()
const store = useAppStore()

const staff = ['Krystal', 'Tommaso', 'Mackenzie', 'Cecilia', 'Cameron', 'Gurpreet', 'Vakeeran', 'Yosef']
const items = ['Butter Croissant', 'Chocolate Croissant', 'Brownie', 'Spanakopita', 'Whole Milk', 'Almond Milk', 'Iced Tea Syrup']

const form = reactive({ loggedBy: 'Krystal', time: '12:15', item: 'Butter Croissant', cause: 'Prep / Bake Shortfall', resolved: 'No — active', note: 'Ran out during lunch rush.' })
const saved = ref(false)

function save() {
  saved.value = true
  store.toast('Stockout saved ✓')
}
</script>
