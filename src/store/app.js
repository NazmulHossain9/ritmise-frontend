import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const role = ref('manager') // manager | supervisor | owner
  const isOnline = ref(true)
  const toastMsg = ref('')
  const toastTimer = ref(null)

  function setRole(r) { role.value = r }

  function toggleOffline() { isOnline.value = !isOnline.value }

  function toast(msg) {
    toastMsg.value = msg
    clearTimeout(toastTimer.value)
    toastTimer.value = setTimeout(() => { toastMsg.value = '' }, 2200)
  }

  return { role, isOnline, toastMsg, setRole, toggleOffline, toast }
})
