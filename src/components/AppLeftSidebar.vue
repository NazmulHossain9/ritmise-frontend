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
/* ── Shell ── */
.left-sidebar {
  width: 256px;
  flex-shrink: 0;
  background: linear-gradient(180deg, #0d1b2e 0%, #0f2137 55%, #112440 100%);
  color: #fff;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  box-shadow: 4px 0 32px rgba(0,0,0,.35);
  position: relative;
  z-index: 10;
}

/* Subtle texture overlay */
.left-sidebar::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 20% 0%, rgba(56,189,248,.07) 0%, transparent 60%);
  pointer-events: none;
}

/* ── Brand ── */
.sb-brand {
  padding: 26px 20px 18px;
  border-bottom: 1px solid rgba(255,255,255,.06);
  flex-shrink: 0;
  position: relative;
}
.sb-logo {
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -.5px;
  line-height: 1;
  background: linear-gradient(135deg, #fff 0%, #93c5fd 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.sb-meta {
  margin-top: 7px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .12em;
  color: rgba(255,255,255,.32);
}

/* ── Status ── */
.sb-status {
  padding: 10px 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  border-bottom: 1px solid rgba(255,255,255,.06);
}
.sb-sync {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 700;
  padding: 5px 10px;
  border-radius: 999px;
  cursor: pointer;
  user-select: none;
  transition: opacity .18s, transform .1s;
  flex-shrink: 0;
  letter-spacing: .02em;
}
.sb-sync:hover { opacity: .8; transform: scale(.97); }
.sb-sync.online  { background: rgba(16,185,129,.2); color: #6ee7b7; border: 1px solid rgba(16,185,129,.25); }
.sb-sync.offline { background: rgba(239,68,68,.2);  color: #fca5a5; border: 1px solid rgba(239,68,68,.25); }
.sb-sync-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: currentColor; flex-shrink: 0;
  animation: sdot 2s infinite;
}
@keyframes sdot { 0%,100%{opacity:1} 50%{opacity:.25} }

.sb-role {
  flex: 1;
  min-width: 0;
  font-size: 11px;
  font-weight: 600;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,.12);
  background: rgba(255,255,255,.06);
  color: rgba(255,255,255,.75);
  padding: 5px 10px;
  font-family: inherit;
  -webkit-appearance: none;
  cursor: pointer;
  transition: background .15s, border-color .15s;
}
.sb-role:hover { background: rgba(255,255,255,.11); border-color: rgba(255,255,255,.2); }
.sb-role option { color: #111; background: #fff; }

/* ── Nav ── */
.sb-nav {
  flex: 1;
  padding: 12px 0 16px;
  overflow-y: auto;
  scrollbar-width: none;
}
.sb-nav::-webkit-scrollbar { display: none; }

.sb-section { position: relative; }
.sb-section + .sb-section { margin-top: 1px; }
.sb-section + .sb-section::before {
  content: '';
  display: block;
  height: 1px;
  background: rgba(255,255,255,.05);
  margin: 5px 16px 7px;
}

/* Parent item */
.sb-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: calc(100% - 16px);
  margin: 1px 8px;
  padding: 9px 12px;
  background: transparent;
  color: rgba(255,255,255,.46);
  border: 0;
  border-left: 2px solid transparent;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  font-family: inherit;
  transition: background .14s, color .14s, border-color .14s;
  line-height: 1.2;
}
.sb-item:hover {
  background: rgba(255,255,255,.06);
  color: rgba(255,255,255,.82);
}
.sb-item.active {
  background: linear-gradient(90deg, rgba(56,189,248,.14) 0%, rgba(56,189,248,.04) 100%);
  color: #7dd3fc;
  border-left-color: #38bdf8;
}
.sb-icon {
  font-size: 15px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 8px;
  background: rgba(255,255,255,.05);
  transition: background .14s;
}
.sb-item:hover .sb-icon { background: rgba(255,255,255,.09); }
.sb-item.active .sb-icon { background: rgba(56,189,248,.15); }
.sb-label { flex: 1; }

/* Chevron */
.sb-chevron {
  font-size: 13px;
  color: rgba(255,255,255,.25);
  transform: rotate(-90deg);
  transition: transform .2s, color .2s;
  display: inline-block;
  line-height: 1;
  flex-shrink: 0;
}
.sb-chevron.open {
  transform: rotate(90deg);
  color: rgba(56,189,248,.7);
}

/* Children — collapsible wrapper */
.sb-children-wrap {
  overflow: hidden;
  transition: max-height .22s cubic-bezier(.4,0,.2,1);
}
.sb-children {
  padding: 4px 8px 6px 50px;
}
.sb-child {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 6px 10px;
  background: transparent;
  color: rgba(255,255,255,.36);
  border: 0;
  border-left: 2px solid transparent;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  font-family: inherit;
  transition: background .1s, color .1s, border-color .1s;
  margin: 1px 0;
  height: 32px;
  letter-spacing: .01em;
}
.sb-child-dot {
  width: 4px; height: 4px; border-radius: 50%;
  background: rgba(255,255,255,.18);
  flex-shrink: 0;
  transition: background .1s, transform .1s;
}
.sb-child:hover { background: rgba(255,255,255,.05); color: rgba(255,255,255,.72); }
.sb-child:hover .sb-child-dot { background: rgba(255,255,255,.45); transform: scale(1.3); }
.sb-child.active { color: #93c5fd; border-left-color: rgba(56,189,248,.5); }
.sb-child.active .sb-child-dot { background: #38bdf8; transform: scale(1.4); }

/* ── Footer ── */
.sb-footer {
  flex-shrink: 0;
  padding: 12px 20px 18px;
  border-top: 1px solid rgba(255,255,255,.05);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: .06em;
  color: rgba(255,255,255,.18);
}
</style>
