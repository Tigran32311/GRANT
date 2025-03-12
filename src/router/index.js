import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MapView from "../views/MapView.vue";
import CreateReportView from "../views/CreateReportView.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/map',
    name: 'map',
    component: MapView
  },
  {
    path: '/create_report',
    name: 'create_report',
    component: CreateReportView
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
