import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MapView from "../views/MapView.vue";
import CreateReportView from "../views/CreateReportView.vue";
import AdminOrgsView from "@/views/AdminOrgsView.vue";
import AdminDirectorsView from "@/views/AdminDirectorsView.vue";
import AdminRoadsView from "@/views/AdminRoadsView.vue";
import store from "../store/index.js";
import {ro} from "vuetify/locale";
import DirectorUsersView from "@/views/DirectorUsersView.vue";
import ProfileView from "@/views/ProfileView.vue";

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
  {
    path: '/admin/organizations',
    name: 'admin_orgs',
    component: AdminOrgsView
  },
  {
    path: '/admin/directors',
    name: 'director_list',
    component: AdminDirectorsView
  },
  {
    path: '/admin/roads',
    name: 'admin_roads',
    component: AdminRoadsView
  },
  {
    path: '/dir/users',
    name: 'dir_users',
    component: DirectorUsersView
  },
  {
    path: '/dir/profile',
    name: 'dir_profile',
    component: ProfileView
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const isAuth = store.getters.getIsAuthenticated;
  let role = null;
  if (isAuth==='true') {
    role = store.getters.getCurrentUser.role;
  }

  if (role!=null || role!=='') {
    if (isAuth==='true' && role!=='ADMIN' && (to.name==='admin_orgs' || to.name==='director_list' || to.name==='admin_roads')) {
      return next({name: 'home'});
    } else if (isAuth==='true' && role!=='DIRECTOR' && (to.name==='dir_users' || to.name==='dir_profile')) {
      return next({name: 'home'});
    } else if (isAuth==='true' && role!=='EMPLOYEE' && role!=='PHYSICAL_PERSON' && (to.name==='profile')) {
      return next({name: 'home'});
    } else {
      return next();
    }
  } else {
    if ((isAuth==='false' || isAuth===null) && to.name!=='map' && to.name!=='home') {
      return next({name: 'home'});
    } else {
      return next()
    }
  }
  return next()
});


export default router
