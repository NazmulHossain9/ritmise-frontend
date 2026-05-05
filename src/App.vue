<template>
  <div class="app-layout">
    <AppLeftSidebar class="left-sidebar" />
    <div class="app-right">
      <AppTopBar    class="mobile-topbar" />
      <AppDesktopHeader class="desktop-header" />
      <div class="app-body">
        <RouterView />
      </div>
    </div>
  </div>
  <AppBottomNav />
  <AppToast />
</template>

<script setup>
import AppTopBar        from '@/components/AppTopBar.vue'
import AppBottomNav     from '@/components/AppBottomNav.vue'
import AppToast         from '@/components/AppToast.vue'
import AppLeftSidebar   from '@/components/AppLeftSidebar.vue'
import AppDesktopHeader from '@/components/AppDesktopHeader.vue'
</script>
