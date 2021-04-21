import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: "Home",
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
        component: () => import('../views/People'),
        meta: { transition: 'fade-in-up' },
      },
      {
        path:'movie/:id',
        component: () => import('../views/Movie'),
        meta: { transition: 'fade-in-left' },
      },  
    ]
  },
  {
    path: '/discover',
    name: 'Discover',
    component: () => import('../views/Discover.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue')
  },
]

const router = new VueRouter({
  routes,
  scrollBehavior() {
    document.getElementById('app').scrollIntoView();
  }
})

export default router
