<template>
  <div class="screen">
    <div class="breadcrumb">
      <button @click="router.push({ name: 'ops-hub' })">← Ops</button>
      <span>/</span><span>Espresso Checks</span>
    </div>
    <div class="page-title">
      <div><h1>Espresso Checks</h1></div>
      <span class="badge amber">2 / 5 done</span>
    </div>

    <!-- Schedule -->
    <div class="card">
      <h2>Today's schedule</h2>
      <div class="small" style="margin-bottom:8px">Tap a missed or pending slot to pre-fill the time below.</div>
      <div v-for="slot in schedule" :key="slot.time"
           :class="['sched-row', slot.clickable ? 'clickable' : '']"
           @click="slot.clickable && prefill(slot.value)">
        <span>
          <span :class="['dot', slot.dot]"></span>{{ slot.time }}
        </span>
        <span :class="['badge', slot.badgeClass, 'sm']">{{ slot.badge }}</span>
      </div>
    </div>

    <!-- Warning -->
    <div v-if="espressoWarn" class="notice amber">⚠ One blend has dose entered but no extraction time.</div>

    <!-- Form -->
    <div class="card">
      <h2>New check</h2>
      <div class="row">
        <div class="field">
          <label>Checked by</label>
          <select v-model="form.checker">
            <option v-for="s in checkers" :key="s">{{ s }}</option>
          </select>
        </div>
        <div class="field"><label>Time</label><input type="time" v-model="form.time" /></div>
      </div>

      <details open style="margin-bottom:4px">
        <summary style="font-size:14px;font-weight:700;cursor:pointer;padding:8px 0;list-style:none">▸ Espresso blend</summary>
        <div class="row" style="margin-top:6px">
          <div class="field"><label>Dose (g)</label><input type="number" v-model="form.espDose" /></div>
          <div class="field"><label>Extraction (s)</label><input type="number" v-model="form.espTime" /></div>
        </div>
      </details>

      <details style="margin-bottom:4px">
        <summary style="font-size:14px;font-weight:700;cursor:pointer;padding:8px 0;color:var(--muted);list-style:none">▸ Cappuccino</summary>
        <div class="row" style="margin-top:6px">
          <div class="field"><label>Dose (g)</label><input type="number" v-model="form.capDose" /></div>
          <div class="field"><label>Extraction (s)</label><input type="number" v-model="form.capTime" /></div>
        </div>
      </details>

      <details style="margin-bottom:4px">
        <summary style="font-size:14px;font-weight:700;cursor:pointer;padding:8px 0;color:var(--muted);list-style:none">▸ Decaf</summary>
        <div class="row" style="margin-top:6px">
          <div class="field"><label>Dose (g)</label><input type="number" v-model="form.decafDose" @input="checkWarn" /></div>
          <div class="field"><label>Extraction (s)</label><input type="number" v-model="form.decafTime" @input="checkWarn" /></div>
        </div>
      </details>

      <div style="margin-top:10px">
        <button @click="saveCheck">Save Check</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/store/app'

const router = useRouter()
const store = useAppStore()
const checkers = ['Cameron', 'Tommaso', 'Krystal', 'Mackenzie']

const schedule = ref([
  { time: '7:30 AM',  dot: 'g', badge: 'Done · Cameron',        badgeClass: 'green', clickable: false, value: '' },
  { time: '9:30 AM',  dot: 'g', badge: 'Done · Tommaso',        badgeClass: 'green', clickable: false, value: '' },
  { time: '11:30 AM', dot: 'a', badge: 'Missed — tap to log late', badgeClass: 'amber', clickable: true,  value: '11:30' },
  { time: '1:30 PM',  dot: 'm', badge: 'Pending — tap to log',   badgeClass: '',      clickable: true,  value: '13:30' },
  { time: '3:30 PM',  dot: 'm', badge: 'Pending',                badgeClass: '',      clickable: true,  value: '15:30' },
])

const form = reactive({ checker: 'Cameron', time: '13:30', espDose: 18, espTime: 28, capDose: null, capTime: null, decafDose: null, decafTime: null })
const espressoWarn = ref(false)

function prefill(t) { form.time = t }

function checkWarn() {
  espressoWarn.value = (form.decafDose && !form.decafTime) || (!form.decafDose && form.decafTime)
}

function saveCheck() {
  if (espressoWarn.value) { store.toast('Please complete decaf fields'); return }
  store.toast('Espresso check saved ✓')
}
</script>
