<template>
  <div class="screen">
    <div class="breadcrumb">
      <button @click="router.push({ name: 'plan-hub' })">← Plan</button>
      <span>/</span><span>Captain Report</span>
    </div>
    <div class="page-title">
      <div><h1>Captain Report</h1></div>
      <span class="badge amber">end-of-shift</span>
    </div>

    <!-- Shift summary -->
    <div class="card">
      <h2>Shift summary</h2>
      <div class="row">
        <div class="field"><label>Date</label><input type="date" v-model="rpt.date" /></div>
        <div class="field">
          <label>Captain *</label>
          <select v-model="rpt.captain">
            <option value="">Select…</option>
            <option v-for="s in captains" :key="s">{{ s }}</option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="field"><label>Service opened</label><input type="time" v-model="rpt.opened" /></div>
        <div class="field"><label>Red zone started</label><input type="time" v-model="rpt.rzStart" /></div>
      </div>
      <div class="row">
        <div class="field">
          <label>Stations kept?</label>
          <select v-model="rpt.stationsKept"><option>Partial</option><option>Yes</option><option>No</option></select>
        </div>
        <div class="field">
          <label>Handoff by name?</label>
          <select v-model="rpt.handoff"><option>Yes</option><option>No</option><option>N/A</option></select>
        </div>
      </div>
      <p class="small" style="margin:4px 0 0">
        View <button class="link-btn" @click="router.push({ name: 'daily' })">today's plan →</button>
      </p>
    </div>

    <!-- Scores -->
    <div class="card">
      <div class="status-line" style="margin-bottom:10px">
        <div>
          <h2 style="margin:0">Scores</h2>
          <div class="small">out of 10 each · auto-total below</div>
        </div>
        <div :class="['score-total', scoreClass]">{{ total }} / 100</div>
      </div>
      <div class="score-grid">
        <div v-for="s in scoreFields" :key="s.key" class="field">
          <label>{{ s.label }}</label>
          <input type="number" min="0" max="10" v-model.number="scores[s.key]" />
        </div>
      </div>
    </div>

    <!-- Carry-forward issues -->
    <div class="card">
      <h2>Carry-forward issues</h2>
      <div v-for="(iss, i) in issues" :key="i" class="list-item nocursor">
        <strong>{{ iss.title }}</strong>
        <span>Area: {{ iss.area }} · Responsible: {{ iss.person }}</span>
      </div>
      <div v-if="showIssueForm" class="add-row-form show">
        <div class="field"><label>Issue</label><input type="text" v-model="newIssue.title" placeholder="Describe the issue" /></div>
        <div class="row">
          <div class="field"><label>Area / station</label><input type="text" v-model="newIssue.area" placeholder="e.g. Bar" /></div>
          <div class="field">
            <label>Responsible</label>
            <select v-model="newIssue.person"><option v-for="s in allStaff" :key="s">{{ s }}</option></select>
          </div>
        </div>
        <div class="btnrow">
          <button class="sm green" @click="saveIssue">Add</button>
          <button class="sm secondary" @click="showIssueForm = false">Cancel</button>
        </div>
      </div>
      <button class="secondary sm" @click="showIssueForm = true">+ Add issue</button>
    </div>

    <!-- Narrative + submit -->
    <div class="card">
      <h2>Honest narrative</h2>
      <div class="field"><textarea v-model="rpt.narrative"></textarea></div>
      <div v-if="!submitted" class="draft-notice">
        <strong>Draft</strong> — submit when complete to generate share text.
      </div>
      <div v-if="!submitted" class="submit-actions">
        <button @click="submitReport">Submit Report</button>
        <button class="secondary" @click="store.toast('Draft saved')">Save Draft</button>
      </div>
      <div v-if="submitted" class="notice green mt10">
        ✓ Report submitted
        <div style="margin-top:8px">
          <button class="whatsapp sm" @click="store.toast('Copied for WhatsApp!')">Copy for WhatsApp</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/store/app'

const router = useRouter()
const store = useAppStore()

const captains = ['Krystal', 'Mackenzie', 'Tommaso']
const allStaff = ['Krystal', 'Tommaso', 'Mackenzie', 'Cecilia', 'Cameron', 'Gurpreet', 'Vakeeran', 'Yosef']

const rpt = reactive({
  date: '2026-04-26', captain: '', opened: '07:30', rzStart: '11:35',
  stationsKept: 'Partial', handoff: 'Yes',
  narrative: 'Lunch rush was manageable but Dispatch needed stronger ownership from 12:10–1:15. Patio was clean at handoff. Croissants ran out at 12:15 — prep shortfall from morning.',
})

const scoreFields = [
  { key: 'teamEnergy', label: 'Team energy' },
  { key: 'rzHeld', label: 'Red zone held' },
  { key: 'cash', label: 'Cash station' },
  { key: 'bar', label: 'Bar station' },
  { key: 'dispatch', label: 'Dispatch station' },
  { key: 'dish', label: 'Dish / Dining' },
  { key: 'discipline', label: 'Station discipline' },
  { key: 'cleaning', label: 'Cleaning standards' },
  { key: 'cx', label: 'Customer experience' },
  { key: 'stock', label: 'Stock awareness' },
]

const scores = reactive({ teamEnergy: 7, rzHeld: 6, cash: 8, bar: 8, dispatch: 6, dish: 7, discipline: 6, cleaning: 7, cx: 7, stock: 7 })

const total = computed(() => Object.values(scores).reduce((a, b) => a + (+b || 0), 0))
const scoreClass = computed(() => total.value >= 80 ? 'green' : total.value >= 60 ? 'amber' : 'red-col')

const issues = ref([
  { title: 'Patio reset after close', area: 'Patio', person: 'Gurpreet' },
  { title: 'Check croissant carry-over', area: 'Baked goods', person: 'Krystal' },
])
const showIssueForm = ref(false)
const newIssue = reactive({ title: '', area: '', person: 'Krystal' })

const submitted = ref(false)

function saveIssue() {
  if (newIssue.title) issues.value.push({ ...newIssue })
  newIssue.title = ''; newIssue.area = ''; newIssue.person = 'Krystal'
  showIssueForm.value = false
}

function submitReport() {
  if (!rpt.captain) { store.toast('Captain is required'); return }
  submitted.value = true
  store.toast('Report submitted ✓')
}
</script>
