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
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/About.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/rooms',
    name: 'Rooms',
    component: () => import('@/views/Rooms.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/room/:id',
    name: 'Room',
    component: () => import('@/views/Room.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !state.user.value) {
    next({ path: "/login" });
  } else if (to.matched.some(record => !record.meta.requiresAuth) && state.user.value) {
    next({ path: "/" });
  } else {
    next();
  }
})

export default router
