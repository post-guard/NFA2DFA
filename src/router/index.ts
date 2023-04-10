import { createRouter, createWebHistory } from 'vue-router'
import WorkPage from '../views/WorkPage.vue'
import AboutView from "@/views/AboutView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'workpage',
      component: WorkPage
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    }
  ]
})

export default router
