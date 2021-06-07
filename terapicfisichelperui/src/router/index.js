import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import User from '../components/User.vue'
import Customer from '../components/Customer.vue'
import Specialist from '../components/Specialist.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/users',
    name: 'users',
    component: User
  },
  {
    path: '/customers',
    name: 'customers',
    component: Customer
  },
  {
    path: '/specialist',
    name: 'specialist',
    component: Specialist
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
