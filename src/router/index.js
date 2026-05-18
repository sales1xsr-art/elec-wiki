import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/category/:slug',
    name: 'category',
    component: () => import('@/views/Category.vue')
  },
  {
    path: '/component/:slug',
    name: 'component',
    component: () => import('@/views/Component.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
