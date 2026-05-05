<template>
  <div class="shell">
    <AppTopBar />
    <main>
      <RouterView />
    </main>
    <AppBottomNav />
    <AppToast />
  </div>
</template>

<script setup>
import AppTopBar from '@/components/AppTopBar.vue'
import AppBottomNav from '@/components/AppBottomNav.vue'
import AppToast from '@/components/AppToast.vue'
</script>
