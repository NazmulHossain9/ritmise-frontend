<template>
  <aside class="left-sidebar">
    <!-- Brand -->
    <div class="sb-brand">
      <div class="sb-logo">Ritmise</div>
      <div class="sb-meta">{{ store.isOnline ? 'AROMA · ' : 'OFFLINE · ' }}{{ today }}</div>
    </div>

    <!-- Status -->
    <div class="sb-status">
      <span
        :class="['sb-sync', store.isOnline ? 'online' : 'offline']"
        @click="store.toggleOffline()"
        title="Toggle connection"
      >
        <span class="sb-sync-dot"></span>
        {{ store.isOnline ? 'Online' : 'Offline' }}
      </span>
      <select
        class="sb-role"
        :value="store.role"
        @change="store.setRole($event.target.value)"
      >
        <option value="manager">Manager</option>
        <option value="supervisor">Captain</option>
        <option value="owner">Owner / Admin</option>
      </select>
    </div>

    <!-- Nav -->
    <nav class="sb-nav">
      <template v-for="section in navSections" :key="section.name">
        <div v-if="!section.managerOnly || store.role !== 'supervisor'" class="sb-section">

          <!-- Parent item -->
          <button
            :class="['sb-item', isSectionActive(section) ? 'active' : '']"
            @click="toggle(section)"
          >
            <span class="sb-icon">{{ section.icon }}</span>
            <span class="sb-label">{{ section.label }}</span>
            <span v-if="section.children" :class="['sb-chevron', isOpen(section) ? 'open' : '']">‹</span>
          </button>

          <!-- Children — animated -->
          <div
            v-if="section.children"
            class="sb-children-wrap"
            :style="isOpen(section) ? { maxHeight: childrenHeight(section) + 'px' } : { maxHeight: '0px' }"
          >
            <div class="sb-children">
              <template v-for="child in section.children" :key="child.name">
                <button
                  v-if="!child.managerOnly || store.role !== 'supervisor'"
                  :class="['sb-child', route.name === child.name ? 'active' : '']"
                  @click="router.push({ name: child.name })"
                >
                  <span class="sb-child-dot"></span>
                  {{ child.label }}
                </button>
              </template>
            </div>
          </div>

        </div>
      </template>
    </nav>

    <!-- Footer -->
    <div class="sb-footer">Ritmise v1 · Prototype</div>
  </aside>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '@/store/app'

const route  = useRoute()
const router = useRouter()
const store  = useAppStore()

const today = computed(() =>
  new Date().toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' }).toUpperCase()
)

const navSections = [
  {
    icon: '🏠', label: 'Home', name: 'home',
    matches: ['home'],
  },
  {
    icon: '🗓️', label: 'Plan', name: 'plan-hub',
    matches: ['plan-hub', 'daily', 'report'],
    children: [
      { label: 'Daily Plan',     name: 'daily' },
      { label: 'Captain Report', name: 'report' },
    ],
  },
  {
    icon: '📋', label: 'Ops', name: 'ops-hub',
    matches: ['ops-hub', 'espresso', 'baked', 'waste', 'stockout', 'counts'],
    children: [
      { label: 'Espresso Checks', name: 'espresso' },
      { label: 'Baked Goods',     name: 'baked' },
      { label: 'Waste',           name: 'waste' },
      { label: 'Stockout',        name: 'stockout' },
      { label: 'Critical Counts', name: 'counts' },
    ],
  },
  {
    icon: '📦', label: 'Orders', name: 'orders-hub',
    matches: ['orders-hub', 'delivery', 'purchase'],
    children: [
      { label: 'Delivery Check', name: 'delivery' },
      { label: 'Register Order', name: 'purchase' },
    ],
  },
  {
    icon: '☰', label: 'More', name: 'more-hub',
    matches: ['more-hub', 'tasks', 'owner-summary', 'batch', 'settings'],
    children: [
      { label: 'Tasks',         name: 'tasks' },
      { label: 'Owner Summary', name: 'owner-summary', managerOnly: true },
      { label: 'Batch Import',  name: 'batch',         managerOnly: true },
      { label: 'Settings',      name: 'settings',      managerOnly: true },
    ],
  },
]

function isSectionActive(section) {
  return section.matches.includes(route.name)
}

// Track which section name is open
const openSection = ref(null)

// Auto-open the section that matches the current route
function syncOpen() {
  const active = navSections.find(s => s.children && isSectionActive(s))
  openSection.value = active ? active.name : null
}
syncOpen()
watch(() => route.name, syncOpen)

function isOpen(section) {
  return openSection.value === section.name
}

function toggle(section) {
  if (!section.children) {
    router.push({ name: section.name })
    return
  }
  if (isOpen(section)) {
    // collapse — navigate to hub
    openSection.value = null
    router.push({ name: section.name })
  } else {
    openSection.value = section.name
    router.push({ name: section.name })
  }
}

// Each child row is ~34px; add 8px top + 8px bottom padding
function childrenHeight(section) {
  if (!section.children) return 0
  const visible = section.children.filter(c => !c.managerOnly || store.role !== 'supervisor')
  return visible.length * 34 + 16
}
</script>

<style scoped>
/* ══ Shell ══ */
.left-sidebar {
  width: 260px;
  flex-shrink: 0;
  background: #f4f6f9;
  color: #1e293b;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  border-right: 1px solid rgba(0,0,0,.07);
  box-shadow: 4px 0 24px rgba(0,0,0,.07);
  position: relative;
  z-index: 10;
}

/* Rainbow accent stripe at the very top */
.left-sidebar::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, #38bdf8 0%, #818cf8 45%, #f472b6 100%);
  z-index: 2;
}

/* ══ Brand ══ */
.sb-brand {
  padding: 30px 22px 20px;
  border-bottom: 1px solid rgba(0,0,0,.07);
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
}
/* Ambient glow behind logo */
.sb-brand::after {
  content: '';
  position: absolute;
  top: -30px; right: -30px;
  width: 140px; height: 140px;
  background: radial-gradient(circle, rgba(56,189,248,.12) 0%, transparent 70%);
  pointer-events: none;
}
.sb-logo {
  font-size: 26px;
  font-weight: 900;
  letter-spacing: -.8px;
  line-height: 1;
  background: linear-gradient(135deg, #0f172a 0%, #1e4a7a 55%, #0369a1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  z-index: 1;
}
.sb-meta {
  margin-top: 9px;
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: .15em;
  color: rgba(0,0,0,.3);
  position: relative;
  z-index: 1;
}

/* ══ Status ══ */
.sb-status {
  padding: 10px 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  border-bottom: 1px solid rgba(0,0,0,.07);
}
.sb-sync {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 10.5px;
  font-weight: 700;
  padding: 5px 12px;
  border-radius: 999px;
  cursor: pointer;
  user-select: none;
  transition: opacity .18s, transform .12s;
  flex-shrink: 0;
  letter-spacing: .03em;
}
.sb-sync:hover { opacity: .8; transform: scale(.97); }
.sb-sync.online {
  background: rgba(16,185,129,.12);
  color: #059669;
  border: 1px solid rgba(16,185,129,.28);
}
.sb-sync.offline {
  background: rgba(239,68,68,.1);
  color: #dc2626;
  border: 1px solid rgba(239,68,68,.22);
}
.sb-sync-dot {
  width: 5px; height: 5px; border-radius: 50%;
  background: currentColor; flex-shrink: 0;
  animation: sdot 2.2s ease-in-out infinite;
}
@keyframes sdot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.25;transform:scale(.75)} }

.sb-role {
  flex: 1;
  min-width: 0;
  font-size: 11px;
  font-weight: 600;
  border-radius: 8px;
  border: 1px solid rgba(0,0,0,.1);
  background: rgba(0,0,0,.04);
  color: #475569;
  padding: 5px 10px;
  font-family: inherit;
  -webkit-appearance: none;
  cursor: pointer;
  transition: background .15s, border-color .15s, color .15s;
}
.sb-role:hover {
  background: rgba(0,0,0,.07);
  border-color: rgba(0,0,0,.15);
  color: #1e293b;
}
.sb-role option { color: #111; background: #fff; }

/* ══ Nav ══ */
.sb-nav {
  flex: 1;
  padding: 14px 0 16px;
  overflow-y: auto;
  scrollbar-width: none;
}
.sb-nav::-webkit-scrollbar { display: none; }

.sb-section { position: relative; }
.sb-section + .sb-section { margin-top: 2px; }
.sb-section + .sb-section::before {
  content: '';
  display: block;
  height: 1px;
  background: rgba(0,0,0,.06);
  margin: 4px 16px 6px;
}

/* Parent item */
.sb-item {
  display: flex;
  align-items: center;
  gap: 11px;
  width: calc(100% - 20px);
  margin: 1px 10px;
  padding: 9px 12px;
  background: transparent;
  color: #64748b;
  border: 0;
  border-left: 2px solid transparent;
  border-radius: 11px;
  font-size: 13px;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  font-family: inherit;
  transition: background .15s, color .15s, border-color .15s;
  line-height: 1.2;
  position: relative;
}
.sb-item:hover {
  background: rgba(0,0,0,.05);
  color: #1e293b;
}
.sb-item.active {
  background: linear-gradient(100deg, rgba(56,189,248,.13) 0%, rgba(56,189,248,.04) 100%);
  color: #0369a1;
  border-left-color: #38bdf8;
}

/* Icon container */
.sb-icon {
  font-size: 14px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 9px;
  background: rgba(0,0,0,.05);
  border: 1px solid rgba(0,0,0,.07);
  transition: background .15s, border-color .15s, transform .18s;
}
.sb-item:hover .sb-icon {
  background: rgba(0,0,0,.08);
  border-color: rgba(0,0,0,.1);
  transform: scale(1.06) rotate(-2deg);
}
.sb-item.active .sb-icon {
  background: rgba(56,189,248,.14);
  border-color: rgba(56,189,248,.3);
  box-shadow: 0 0 12px rgba(56,189,248,.1);
  transform: scale(1.04);
}

.sb-label { flex: 1; }

/* Chevron */
.sb-chevron {
  font-size: 12px;
  color: rgba(0,0,0,.2);
  transform: rotate(-90deg);
  transition: transform .22s cubic-bezier(.4,0,.2,1), color .2s;
  display: inline-block;
  line-height: 1;
  flex-shrink: 0;
}
.sb-chevron.open {
  transform: rotate(90deg);
  color: #0284c7;
}

/* Children */
.sb-children-wrap {
  overflow: hidden;
  transition: max-height .25s cubic-bezier(.4,0,.2,1);
}
.sb-children {
  padding: 2px 8px 6px 50px;
}
.sb-child {
  display: flex;
  align-items: center;
  gap: 9px;
  width: 100%;
  padding: 6px 10px;
  background: transparent;
  color: #94a3b8;
  border: 0;
  border-left: 2px solid transparent;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  font-family: inherit;
  transition: background .12s, color .12s, border-color .12s;
  margin: 1px 0;
  height: 32px;
  letter-spacing: .01em;
}
.sb-child-dot {
  width: 4px; height: 4px; border-radius: 50%;
  background: rgba(0,0,0,.15);
  flex-shrink: 0;
  transition: background .12s, transform .15s;
}
.sb-child:hover { background: rgba(0,0,0,.04); color: #334155; }
.sb-child:hover .sb-child-dot { background: rgba(0,0,0,.3); transform: scale(1.3); }
.sb-child.active { background: rgba(56,189,248,.08); color: #0369a1; border-left-color: rgba(56,189,248,.55); }
.sb-child.active .sb-child-dot { background: #38bdf8; transform: scale(1.4); }

/* ══ Footer ══ */
.sb-footer {
  flex-shrink: 0;
  padding: 14px 22px 20px;
  border-top: 1px solid rgba(0,0,0,.07);
  font-size: 9.5px;
  font-weight: 600;
  letter-spacing: .1em;
  color: rgba(0,0,0,.2);
}
</style>
