import { createRouter, createWebHistory } from 'vue-router'
import useFirebaseAuth from '@/common/auth'

const state = useFirebaseAuth();

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  // console.log(to.name);
  if (to.matched.some(record => record.meta.requiresAuth) && !state.user.value) {
    next({ path: "/login" });
  } else if (to.matched.some(record => !record.meta.requiresAuth) && state.user.value) {
    next({ path: "/" });
  } else {
    next();
  }
})

export default router
