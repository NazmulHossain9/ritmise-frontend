import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView        from '@/views/HomeView.vue'
import PlanHubView     from '@/views/PlanHubView.vue'
import DailyPlanView   from '@/views/DailyPlanView.vue'
import CaptainReport   from '@/views/CaptainReportView.vue'
import OpsHubView      from '@/views/OpsHubView.vue'
import EspressoView    from '@/views/EspressoView.vue'
import BakedGoodsView  from '@/views/BakedGoodsView.vue'
import WasteView       from '@/views/WasteView.vue'
import StockoutView    from '@/views/StockoutView.vue'
import CountsView      from '@/views/CountsView.vue'
import OrdersHubView   from '@/views/OrdersHubView.vue'
import DeliveryView    from '@/views/DeliveryView.vue'
import PurchaseView    from '@/views/PurchaseView.vue'
import TasksView       from '@/views/TasksView.vue'
import MoreHubView     from '@/views/MoreHubView.vue'
import OwnerSummary    from '@/views/OwnerSummaryView.vue'
import SettingsView    from '@/views/SettingsView.vue'
import BatchImportView from '@/views/BatchImportView.vue'

const routes = [
  { path: '/',               name: 'home',         component: HomeView },

  // Plan
  { path: '/plan',           name: 'plan-hub',     component: PlanHubView },
  { path: '/plan/daily',     name: 'daily',        component: DailyPlanView },
  { path: '/plan/report',    name: 'report',       component: CaptainReport },

  // Ops
  { path: '/ops',            name: 'ops-hub',      component: OpsHubView },
  { path: '/ops/espresso',   name: 'espresso',     component: EspressoView },
  { path: '/ops/baked',      name: 'baked',        component: BakedGoodsView },
  { path: '/ops/waste',      name: 'waste',        component: WasteView },
  { path: '/ops/stockout',   name: 'stockout',     component: StockoutView },
  { path: '/ops/counts',     name: 'counts',       component: CountsView },

  // Orders
  { path: '/orders',         name: 'orders-hub',   component: OrdersHubView },
  { path: '/orders/delivery',name: 'delivery',     component: DeliveryView },
  { path: '/orders/purchase',name: 'purchase',     component: PurchaseView },

  // More
  { path: '/more',           name: 'more-hub',     component: MoreHubView },
  { path: '/more/tasks',     name: 'tasks',        component: TasksView },
  { path: '/more/summary',   name: 'owner-summary',component: OwnerSummary },
  { path: '/more/settings',  name: 'settings',     component: SettingsView },
  { path: '/more/batch',     name: 'batch',        component: BatchImportView },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})
