import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "reservations" */ '../views/ReservationsView.vue')
  },
  {
    path: '/reservations',
    name: 'reservations',
    component: () => import(/* webpackChunkName: "reservations" */ '../views/ReservationsView.vue')
  },
  {
    path: '/customers',
    name: 'customers',
    component: () => import(/* webpackChunkName: "customers" */ '../views/CustomersView.vue')
  },
  {
    path: '/tickets',
    name: 'tickets',
    component: () => import(/* webpackChunkName: "tickets" */ '../views/TicketsView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
