import { createRouter, createWebHistory } from 'vue-router'
import WorkPage from '../views/WorkPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'workpage',
      component: WorkPage
    },
  ]
})

export default router
