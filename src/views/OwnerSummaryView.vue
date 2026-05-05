<template>
  <div class="screen">
    <div class="breadcrumb">
      <button @click="router.push({ name: 'more-hub' })">← More</button>
      <span>/</span><span>Owner Summary</span>
    </div>
    <div class="page-title">
      <div><h1>Owner Summary</h1><p>Tuesday 26 Apr · Last refreshed 4:42 PM</p></div>
      <button class="secondary sm" @click="store.toast('Summary refreshed')">Refresh</button>
    </div>

    <div v-for="item in exceptions" :key="item.title"
         :class="['exc-card', `exc-${item.severity}`]"
         :style="item.severity === 'green' ? 'cursor:default' : ''"
         @click="item.severity !== 'green' && openModal(item)">
      <div class="exc-icon">{{ item.icon }}</div>
      <div class="exc-body">
        <strong>{{ item.title }}</strong>
        <span>{{ item.sub }}</span>
      </div>
      <span :class="['badge', item.severity === 'neutral' ? '' : item.severity]">{{ item.badge }}</span>
    </div>

    <div class="card" style="margin-top:4px;text-align:center;padding:16px">
      <div style="font-size:13px;color:var(--muted);margin-bottom:10px">Full drill-down, date-range view, and carry-forward detail are in Frappe Desk.</div>
      <button @click="store.toast('Open Ritmise Operations → Owner Summary in your desktop browser')">Open full summary in Desk →</button>
    </div>

    <!-- Modal -->
    <Teleport to="body">
      <div v-if="modal" class="modal show" @click.self="modal = null">
        <div class="modal-box">
          <h2>{{ modal.title }}</h2>
          <div v-html="modal.body"></div>
          <button class="secondary" style="width:100%;margin-top:10px" @click="modal = null">Close</button>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/store/app'

const router = useRouter()
const store = useAppStore()
const modal = ref(null)

const exceptions = [
  {
    icon: '📝', severity: 'red', badge: 'Act',
    title: 'Captain Report missing',
    sub: 'Not yet submitted · Krystal · shift ends soon',
    modalBody: `<div class="notice red">Captain Report has not been submitted for today.<br><br>Captain: Krystal<br>Shift ends in approx. 90 minutes.</div>`,
  },
  {
    icon: '⚠️', severity: 'red', badge: '6',
    title: 'Open issues / carry-forward',
    sub: '6 unresolved · from shift report and tasks',
    modalBody: `
      <div class="list-item nocursor"><strong>Patio reset not done</strong><span>Gurpreet · Tonight</span></div>
      <div class="list-item nocursor"><strong>Espresso check missed — 11:30 AM</strong><span>Cameron · Today</span></div>
      <div class="list-item nocursor"><strong>Fix sticky community table</strong><span>Tommaso · Overdue</span></div>
      <div class="list-item nocursor"><strong>Croissant carry-over check</strong><span>Krystal · Tomorrow morning</span></div>
      <div class="list-item nocursor"><strong>Review freezer labels</strong><span>Lanka · In progress</span></div>
      <div class="list-item nocursor"><strong>GFS delivery — quantity short</strong><span>Unresolved · 1 case</span></div>`,
  },
  {
    icon: '🚫', severity: 'red', badge: '2',
    title: 'Stockouts today',
    sub: 'Butter Croissant · Almond Milk · both active',
    modalBody: `
      <div class="list-item nocursor"><strong>Butter Croissant</strong><span>12:15 PM · Prep shortfall · Active</span></div>
      <div class="list-item nocursor"><strong>Almond Milk</strong><span>2:00 PM · Delivery short · Active</span></div>`,
  },
  {
    icon: '☕', severity: 'amber', badge: '2 / 5',
    title: 'Espresso checks',
    sub: '2 of 5 done · 11:30 AM missed · 2 pending',
    modalBody: `
      <div class="list-item nocursor"><div class="status-line"><strong>7:30 AM</strong><span class="badge green sm">Done · Cameron</span></div></div>
      <div class="list-item nocursor"><div class="status-line"><strong>9:30 AM</strong><span class="badge green sm">Done · Tommaso</span></div></div>
      <div class="list-item nocursor"><div class="status-line"><strong>11:30 AM</strong><span class="badge red sm">Missed</span></div></div>
      <div class="list-item nocursor"><div class="status-line"><strong>1:30 PM</strong><span class="badge sm">Pending</span></div></div>
      <div class="list-item nocursor"><div class="status-line"><strong>3:30 PM</strong><span class="badge sm">Pending</span></div></div>`,
  },
  {
    icon: '📦', severity: 'amber', badge: '1',
    title: 'Low stock / count issues',
    sub: 'Whole Milk below threshold · Walk-in Cooler',
    modalBody: `<div class="list-item nocursor"><strong>Whole Milk</strong><span>Walk-in Cooler · Last count: 8 L · Threshold: 12 L</span></div><div class="notice amber" style="margin-top:8px">Item is below threshold. Check before next order.</div>`,
  },
  {
    icon: '🚚', severity: 'amber', badge: '1',
    title: 'Receiving issues',
    sub: 'GFS · 1 case short · unresolved',
    modalBody: `<div class="list-item nocursor"><strong>GFS delivery — quantity short</strong><span>26 Apr · 1 case missing · Checked by Krystal · Unresolved</span></div><div class="notice amber" style="margin-top:8px">Follow up with GFS or mark resolved in Desk.</div>`,
  },
  {
    icon: '🗑️', severity: 'neutral', badge: '4',
    title: 'Waste entries',
    sub: '4 logged today · review in Desk if needed',
    modalBody: `
      <div class="list-item nocursor"><strong>Butter Croissant · 10 pcs</strong><span>Overproduction · 4:15 PM · Krystal</span></div>
      <div class="list-item nocursor"><strong>Brownie · 2 pcs</strong><span>Spoilage / Stale · 4:15 PM · Tommaso</span></div>
      <div class="list-item nocursor"><strong>Whole Milk · 1 L</strong><span>Expired · 9:00 AM · Mackenzie</span></div>`,
  },
  {
    icon: '🗓️', severity: 'green', badge: 'Done',
    title: 'Daily Plan',
    sub: 'Submitted · Krystal · Red zone 11:30–2:30',
  },
]

function openModal(item) {
  modal.value = { title: item.title, body: item.modalBody }
}
</script>
