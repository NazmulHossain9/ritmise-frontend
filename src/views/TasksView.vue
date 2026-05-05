<template>
  <div class="screen">
    <div class="breadcrumb">
      <button @click="router.push({ name: 'more-hub' })">← More</button>
      <span>/</span><span>Tasks</span>
    </div>
    <div class="page-title">
      <div>
        <h1>Tasks</h1>
        <p class="small" style="color:var(--muted)">Captain and above · Create in Desk</p>
      </div>
    </div>
    <div class="notice info">Tasks are created by managers in Frappe Desk. Use this view to check progress and mark tasks done.</div>

    <div class="segment cols3">
      <button v-for="f in filters" :key="f.key" :class="f.key === activeFilter ? 'active' : ''" @click="activeFilter = f.key">
        {{ f.label }}
      </button>
    </div>

    <template v-if="filteredTasks.length">
      <div v-for="task in filteredTasks" :key="task.title" class="list-item" :class="{ done: task.status === 'done' }" @click="task.status !== 'done' && markDone(task)">
        <div class="status-line">
          <strong>{{ task.title }}</strong>
          <span :class="['badge', priorityClass(task.priority)]">{{ task.priority }}</span>
        </div>
        <span>{{ task.meta }}</span>
      </div>
    </template>
    <div v-else style="text-align:center;padding:24px;color:var(--muted);font-size:13px">No tasks in this view.</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/store/app'

const router = useRouter()
const store = useAppStore()

const filters = [
  { key: 'all', label: 'All' },
  { key: 'open', label: 'Open' },
  { key: 'urgent', label: 'Urgent' },
]
const activeFilter = ref('all')

const tasks = ref([
  { title: 'Fix sticky community table', status: 'open', priority: 'Urgent', meta: 'Assigned: Tommaso · Due: Today · Overdue' },
  { title: 'Review freezer labels',      status: 'in-progress', priority: 'High',   meta: 'Assigned: Lanka · Due: Tomorrow · In Progress' },
  { title: 'Update pastry sign',         status: 'open', priority: 'Normal', meta: 'Assigned: Krystal · Open' },
  { title: 'Restock bar napkins',        status: 'done', priority: 'Normal', meta: 'Completed by: Cecilia · Yesterday' },
])

const filteredTasks = computed(() => {
  if (activeFilter.value === 'open') return tasks.value.filter(t => t.status === 'open' || t.status === 'in-progress')
  if (activeFilter.value === 'urgent') return tasks.value.filter(t => t.priority === 'Urgent')
  return tasks.value
})

function priorityClass(p) {
  if (p === 'Urgent') return 'red'
  if (p === 'High')   return 'amber'
  if (p === 'Done' || p === 'done') return 'green'
  return ''
}

function markDone(task) {
  task.status = 'done'
  task.meta = `Completed by: You · Just now`
  store.toast(`"${task.title}" marked done`)
}
</script>
