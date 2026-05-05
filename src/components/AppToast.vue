<template>
  <Transition name="toast">
    <div v-if="store.toastMsg" class="toast">{{ store.toastMsg }}</div>
  </Transition>
</template>

<script setup>
import { useAppStore } from '@/store/app'
const store = useAppStore()
</script>

<style scoped>
.toast-enter-active, .toast-leave-active { transition: opacity .2s; }
.toast-enter-from, .toast-leave-to { opacity: 0; }
.toast-enter-to, .toast-leave-from { opacity: 1; }
</style>
