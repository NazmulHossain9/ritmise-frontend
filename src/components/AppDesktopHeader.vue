<template>
  <header class="desktop-header">
    <div class="dh-left">
      <span class="dh-icon">{{ current.icon }}</span>
      <div class="dh-breadcrumb">
        <span v-if="current.section" class="dh-section">{{ current.section }}</span>
        <span v-if="current.section" class="dh-sep">›</span>
        <span class="dh-title">{{ current.title }}</span>
      </div>
    </div>
    <div class="dh-right">
      <span
        :class="['dh-pill', store.isOnline ? 'online' : 'offline']"
        @click="store.toggleOffline()"
      >{{ store.isOnline ? '● Online' : '○ Offline' }}</span>
      <span class="dh-date">{{ today }}</span>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/store/app'

const route = useRoute()
const store = useAppStore()

const routeMeta = {
  'home':         { icon: '🏠', title: 'Today',              section: null },
  'plan-hub':     { icon: '🗓️', title: 'Plan',               section: null },
  'daily':        { icon: '🗓️', title: 'Daily Plan',         section: 'Plan' },
  'report':       { icon: '📝', title: 'Captain Report',     section: 'Plan' },
  'ops-hub':      { icon: '📋', title: 'Operations',         section: null },
  'espresso':     { icon: '☕', title: 'Espresso Checks',    section: 'Ops' },
  'baked':        { icon: '🥐', title: 'Baked Goods',        section: 'Ops' },
  'waste':        { icon: '🗑️', title: 'Waste',              section: 'Ops' },
  'stockout':     { icon: '⚠️', title: 'Stockout',           section: 'Ops' },
  'counts':       { icon: '🧮', title: 'Critical Counts',    section: 'Ops' },
  'orders-hub':   { icon: '📦', title: 'Orders & Receiving', section: null },
  'delivery':     { icon: '🚚', title: 'Delivery Check',     section: 'Orders' },
  'purchase':     { icon: '📋', title: 'Register Order',     section: 'Orders' },
  'more-hub':     { icon: '☰',  title: 'More',               section: null },
  'tasks':        { icon: '✅', title: 'Tasks',               section: 'More' },
  'owner-summary':{ icon: '📊', title: 'Owner Summary',      section: 'More' },
  'batch':        { icon: '📥', title: 'Batch Import',       section: 'More' },
  'settings':     { icon: '⚙️', title: 'Settings',           section: 'More' },
}

const current = computed(() => routeMeta[route.name] ?? { icon: '●', title: 'Ritmise', section: null })

const today = computed(() =>
  new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })
)
</script>

<style scoped>
.desktop-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 36px;
  height: 54px;
  background: #fff;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
  gap: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,.05);
}

.dh-left {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}
.dh-icon { font-size: 18px; line-height: 1; flex-shrink: 0; }

.dh-breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
}
.dh-section { color: var(--muted); font-weight: 500; }
.dh-sep     { color: #d1d5db; font-weight: 400; }
.dh-title   { font-weight: 700; color: var(--dark); }

.dh-right {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}
.dh-date {
  font-size: 12px;
  color: var(--muted);
  font-weight: 500;
}

/* Sync pill - light-background variant */
.dh-pill {
  font-size: 11px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 999px;
  cursor: pointer;
  user-select: none;
  transition: opacity .2s;
}
.dh-pill:hover { opacity: .8; }
.dh-pill.online  { background: #e8f5e9; color: #2e7d32; }
.dh-pill.offline { background: #ffebee; color: #c62828; }
</style>
