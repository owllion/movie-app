import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: "$t('GENERAL.NAV_OPTIONS[0]')",
    component: () => import('../views/Home.vue')
  },
  {
    path: '/search/:title',
    name: 'Search',
    component: () => import('../views/Search.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/details',
    name: 'Detail',
    component: () => import('../views/Detail.vue'),
    children: [
      {
        path:'people/:id',
        component: () => import('../views/People')
      },
      {
        path:'movie/:id',
        component: () => import('../views/Movie')
      },  
    ]
  },
  {
    path: '/discover',
    name: 'Discover',
    component: () => import('../views/Discover.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
