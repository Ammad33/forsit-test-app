import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import Toasted from 'vue-toasted';

import Dashboard from '@/components/Dashboard'
import DashboardHome from '@/pages/Home'
import InventoryManagement from '../src/pages/InventoryManagement'
import Revenue from '../src/pages/RevenueAnalysis'
import ProductRegistration from '../src/pages/ProductRegistration'
import store from './store'
import '@/assets/css/tailwind.css'


Vue.config.productionTip = false
Vue.use(Router)
Vue.use(Toasted);

const routes = [
  { path: '/', redirect: { name: 'DashboardHome' } },
  { path: '/dashboard', component: Dashboard, children: [
      { path: '/', redirect: { name: 'DashboardHome' } },
      { path: 'home', name: 'DashboardHome', component: DashboardHome },
      { path: 'inventory-management', name: 'InventoryManagement', component: InventoryManagement },
      { path: 'revenue-analysis', name: 'Revenue', component: Revenue },
      { path: 'product-registration', name: 'ProductRegistration', component: ProductRegistration }
    ]
  }
]

const router = new Router({
  mode: 'history',
  routes
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

