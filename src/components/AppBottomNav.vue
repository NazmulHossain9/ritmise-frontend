<template>
  <nav class="bottomnav">
    <button
      v-for="item in navItems"
      :key="item.name"
      :class="['navbtn', isActive(item) ? 'active' : '']"
      @click="router.push({ name: item.name })"
    >
      <div>{{ item.icon }}</div>
      {{ item.label }}
    </button>
  </nav>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const navItems = [
  {
    icon: '🏠', label: 'Home', name: 'home',
    matches: ['home'],
  },
  {
    icon: '🗓️', label: 'Plan', name: 'plan-hub',
    matches: ['plan-hub', 'daily', 'report'],
  },
  {
    icon: '📋', label: 'Ops', name: 'ops-hub',
    matches: ['ops-hub', 'espresso', 'baked', 'waste', 'stockout', 'counts'],
  },
  {
    icon: '📦', label: 'Orders', name: 'orders-hub',
    matches: ['orders-hub', 'delivery', 'purchase'],
  },
  {
    icon: '☰', label: 'More', name: 'more-hub',
    matches: ['more-hub', 'tasks', 'owner-summary', 'settings', 'batch'],
  },
]

function isActive(item) {
  return item.matches.includes(route.name)
}
</script>
