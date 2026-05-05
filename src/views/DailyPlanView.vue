<template>
  <div class="screen">
    <div class="breadcrumb">
      <button @click="router.push({ name: 'plan-hub' })">← Plan</button>
      <span>/</span><span>Daily Plan</span>
    </div>
    <div class="page-title">
      <div><h1>Daily Plan</h1></div>
      <span class="badge green">one per day</span>
    </div>
    <div class="notice amber">If today's plan already exists, open it to edit — do not submit a duplicate.</div>

    <!-- Day setup -->
    <div class="card">
      <h2>Day setup</h2>
      <div class="row">
        <div class="field"><label>Date *</label><input type="date" v-model="plan.date" /></div>
        <div class="field">
          <label>Captain *</label>
          <select v-model="plan.captain">
            <option value="">Select…</option>
            <option v-for="s in staff" :key="s">{{ s }}</option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="field"><label>Red zone start</label><input type="time" v-model="plan.rzStart" /></div>
        <div class="field"><label>Red zone end</label><input type="time" v-model="plan.rzEnd" /></div>
      </div>
    </div>

    <!-- Stations -->
    <div class="card">
      <h2>Stations</h2>
      <div class="row">
        <div class="field"><label>Cash</label><select v-model="plan.stCash"><option v-for="s in staff" :key="s">{{ s }}</option></select></div>
        <div class="field"><label>Bar</label><select v-model="plan.stBar"><option v-for="s in staff" :key="s">{{ s }}</option></select></div>
      </div>
      <div class="row">
        <div class="field"><label>Dispatch</label><select v-model="plan.stDispatch"><option v-for="s in staff" :key="s">{{ s }}</option></select></div>
        <div class="field"><label>Dish / Dining</label><select v-model="plan.stDish"><option v-for="s in staff" :key="s">{{ s }}</option></select></div>
      </div>
      <div class="field"><label>Floater</label><select v-model="plan.stFloater"><option v-for="s in staff" :key="s">{{ s }}</option></select></div>
    </div>

    <!-- Breaks -->
    <div class="card">
      <h2>Planned breaks</h2>
      <div v-for="(b, i) in breaks" :key="i" class="list-item nocursor">
        <strong>{{ b.staff }}</strong>
        <span>{{ b.time }} · Cover: {{ b.cover || 'None' }}</span>
      </div>
      <div v-if="showBreakForm" class="add-row-form show">
        <div class="row">
          <div class="field">
            <label>Staff member</label>
            <select v-model="newBreak.staff"><option v-for="s in staff" :key="s">{{ s }}</option></select>
          </div>
          <div class="field"><label>Break start</label><input type="time" v-model="newBreak.time" /></div>
        </div>
        <div class="field">
          <label>Cover (optional)</label>
          <select v-model="newBreak.cover">
            <option value="">None</option>
            <option v-for="s in staff" :key="s">{{ s }}</option>
          </select>
        </div>
        <div class="btnrow">
          <button class="sm green" @click="saveBreak">Add break</button>
          <button class="sm secondary" @click="showBreakForm = false">Cancel</button>
        </div>
      </div>
      <button class="secondary sm" @click="showBreakForm = true">+ Add break</button>
    </div>

    <!-- Catering -->
    <div class="card">
      <h2>Catering / events</h2>
      <div class="field"><textarea v-model="plan.cateringNote" placeholder="e.g. Private booking 1 PM · 20 covers · pre-paid"></textarea></div>
    </div>

    <!-- Timed actions -->
    <div class="card">
      <h2>Timed actions</h2>
      <div v-for="(a, i) in timedActions" :key="i" class="list-item nocursor">
        <strong>{{ a.time }}</strong><span>{{ a.desc }}</span>
      </div>
      <div v-if="showActionForm" class="add-row-form show">
        <div class="row">
          <div class="field"><label>Time</label><input type="time" v-model="newAction.time" /></div>
          <div class="field"><label>Description</label><input type="text" v-model="newAction.desc" placeholder="What happens" /></div>
        </div>
        <div class="btnrow">
          <button class="sm green" @click="saveTimedAction">Add</button>
          <button class="sm secondary" @click="showActionForm = false">Cancel</button>
        </div>
      </div>
      <button class="secondary sm" @click="showActionForm = true">+ Add action</button>
    </div>

    <!-- Operating note + submit -->
    <div class="card">
      <h2>Operating note</h2>
      <div class="field"><textarea v-model="plan.opNote"></textarea></div>
      <div v-if="!submitted" class="draft-notice">
        <strong>Draft</strong> — not yet submitted. Save draft anytime. Submit when the plan is final.
      </div>
      <div v-if="!submitted" class="submit-actions">
        <button @click="submitPlan">Submit Plan</button>
        <button class="secondary" @click="store.toast('Draft saved')">Save Draft</button>
      </div>
      <div v-if="submitted" class="notice green mt10">
        ✓ Plan submitted · Synced
        <div style="margin-top:8px">
          <button class="whatsapp sm" @click="store.toast('Copied for WhatsApp!')">Copy for WhatsApp</button>
        </div>
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

const staff = ['Krystal', 'Mackenzie', 'Tommaso', 'Cecilia', 'Cameron', 'Gurpreet', 'Vakeeran', 'Yosef']

const plan = reactive({
  date: '2026-04-26',
  captain: 'Krystal',
  rzStart: '11:30',
  rzEnd: '14:30',
  stCash: 'Mackenzie',
  stBar: 'Cameron',
  stDispatch: 'Krystal',
  stDish: 'Gurpreet',
  stFloater: 'Cecilia',
  cateringNote: '',
  opNote: 'Stations locked during red zone. Handoff by name before anyone leaves a station.',
})

const breaks = ref([
  { staff: 'Mackenzie', time: '11:00–11:20', cover: 'Cecilia' },
  { staff: 'Cameron', time: '12:30–12:50', cover: 'Tommaso' },
])
const showBreakForm = ref(false)
const newBreak = reactive({ staff: 'Krystal', time: '', cover: '' })

const timedActions = ref([
  { time: '10:45 AM', desc: 'FOH cooler refill before lunch' },
  { time: '2:45 PM', desc: 'Post-rush reset: dining, patio, washrooms, baked goods check' },
])
const showActionForm = ref(false)
const newAction = reactive({ time: '', desc: '' })

const submitted = ref(false)

function saveBreak() {
  breaks.value.push({ ...newBreak })
  newBreak.staff = 'Krystal'; newBreak.time = ''; newBreak.cover = ''
  showBreakForm.value = false
}

function saveTimedAction() {
  if (newAction.time && newAction.desc) {
    timedActions.value.push({ ...newAction })
    newAction.time = ''; newAction.desc = ''
  }
  showActionForm.value = false
}

function submitPlan() {
  if (!plan.captain) { store.toast('Captain is required'); return }
  submitted.value = true
  store.toast('Plan submitted ✓')
}
</script>
