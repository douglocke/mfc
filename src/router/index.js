import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ExploreContent from '@/views/Explore/views/ExploreContent'
import ExploreForm from '@/views/Explore/views/ExploreForm'
const loadView = path => () => import(`@/views/${path}.vue`)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/explore',
    name: 'DataVis',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/Explore/Explore.vue'),
    children: [
      {
        path: 'content',
        name: 'ExploreContent',
        component: ExploreContent
      },
      {
        path: 'form',
        name: 'ExploreForm',
        component: ExploreForm
      }
    ]
  },
  /*
  {
    path: '/explore/:id?',
    name: 'Explore',
    component: () => import('../views/Explore.vue')
  },
  */
  {
    path: '/speeches',
    name: 'Speeches',
    component: () => import('../views/Speeches.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
