<template>
  <div class="screen">
    <div class="page-title">
      <div>
        <h1>Today</h1>
        <p>{{ now }}</p>
      </div>
    </div>

    <!-- Priority Banner -->
    <div class="priority-banner">
      <div class="priority-dot"></div>
      <div class="priority-content">
        <strong>Captain Report not yet submitted</strong>
        <span>End of shift approaching — Krystal needs to submit before handoff.</span>
      </div>
      <button @click="router.push({ name: 'report' })">Submit →</button>
    </div>

    <div class="grid2">
      <div class="tile" @click="router.push({ name: 'daily' })">
        <strong>Daily Plan</strong>
        <small>Krystal · Red Zone 11:30–2:30</small>
        <span class="badge green">Done</span>
      </div>
      <div class="tile priority-tile" @click="router.push({ name: 'report' })">
        <strong>Captain Report</strong>
        <small>Not yet submitted</small>
        <span class="badge red">Missing</span>
      </div>
      <div class="tile" @click="router.push({ name: 'espresso' })">
        <strong>Espresso Checks</strong>
        <small>2 of 5 done today</small>
        <span class="badge amber">3 pending</span>
      </div>
      <div class="tile" @click="router.push({ name: 'tasks' })">
        <strong>Tasks</strong>
        <small>3 open · 1 overdue</small>
        <div class="tnum red">3</div>
      </div>
      <div v-if="store.role !== 'supervisor'" class="tile" @click="router.push({ name: 'owner-summary' })">
        <strong>Owner Summary</strong>
        <small>6 issues flagged</small>
        <span class="badge red">View</span>
      </div>
      <div class="tile" @click="router.push({ name: 'delivery' })">
        <strong>Receiving</strong>
        <small>GFS · 1 unresolved issue</small>
        <span class="badge red">Follow up</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/store/app'

const router = useRouter()
const store = useAppStore()

const now = computed(() => {
  return new Date().toLocaleString('en-US', {
    hour: 'numeric', minute: '2-digit', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
})
</script>
