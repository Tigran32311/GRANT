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

// router.beforeEach((to, from, next) => {
//   const profileStore = useProfileStore();
//
//   const isToPathAuthPage =
//       to.path.indexOf('auth') >= 0 && to.name !== 'EmailVerifyPage';
//
//   const isToESIAPage =
//       to.path.indexOf('esia') >= 0 && (to.name === 'EsiaAuthRegister' || to.name === 'EsiaAuthConfirm');
//
//   const { access } = getStorageTokens();
//   if (profileStore.isUserAuth && !profileStore.isAccountConnect && isToESIAPage) {
//     next();
//     return;
//   }
//   if (profileStore.isUserAuth && isToPathAuthPage)
//     next({ name: 'ControlPanel' });
//   else if (isToESIAPage) next();
//   else if (profileStore.isUserAuth && !isToPathAuthPage) next();
//   else if (!profileStore.isUserAuth && access) {
//     useProfileStore()
//         .getUserProfile()
//         .then(() => {
//           if (!isToPathAuthPage && to.name !== undefined) next();
//           else {
//             next({ name: 'ControlPanel' });
//           }
//         })
//         .catch(() => {
//           profileStore.mClearUserProfile();
//           clearStorageTokens();
//           next({ name: 'LoginPage' });
//         });
//   } else if (isToPathAuthPage) {
//     next();
//   } else {
//     next({ name: 'LoginPage' });
//   }
// });


export default router
