import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/Login.vue'
import Manager from '../pages/manager/Layout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/manager',
    name: 'manager',
    component: Manager,
    children:[{
      path: 'home',
      component: () => import( '../pages/manager/Home.vue')
    },
    {
      path: 'order',
      component: () => import( '../pages/manager/Order.vue')
    },
    {
      path: 'user',
      component: () => import( '../pages/manager/User.vue')
    }]
  }
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
