<template>
  <div class="topbar">
    <div class="topline">
      <div>
        <div class="logo">Ritmise</div>
        <div class="meta-row">
          <span class="meta">Aroma · {{ today }}</span>
          <span
            :class="['sync-pill', store.isOnline ? 'online' : 'offline']"
            @click="store.toggleOffline()"
          >
            {{ store.isOnline ? '● Online' : '○ Offline' }}
          </span>
        </div>
      </div>
      <select class="role-select" :value="store.role" @change="store.setRole($event.target.value)">
        <option value="manager">Manager</option>
        <option value="supervisor">Captain</option>
        <option value="owner">Owner / Admin</option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAppStore } from '@/store/app'

const store = useAppStore()

const today = computed(() => {
  return new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short' })
})
</script>
