import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import User from '../components/User.vue'
import Customer from '../components/Customer.vue'
import Specialist from '../components/Specialist.vue'
import Session from '../components/Session.vue'
import Equipament from '../components/Equipament.vue'
import SessionEquipament from '../components/SessionEquipament.vue'
import Tag from '../components/Tag.vue'
import TagSession from '../components/TagSession.vue'
import Historie from '../components/Historie.vue'
import Review from '../components/Review.vue'
import Subscription from '../components/Subscription.vue'
import SubscriptionPlan from '../components/SubscriptionPlan.vue'

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
    path: '/specialists',
    name: 'specialists',
    component: Specialist
  },
  {
    path: '/sessions',
    name: 'sessions',
    component: Session
  },
  {
    path: '/equipaments',
    name: 'equipaments',
    component: Equipament
  },
  {
    path: '/sessionEquipaments',
    name: 'sessionEquipaments',
    component: SessionEquipament
  },
  {
    path: '/tags',
    name: 'tags',
    component: Tag
  },
  {
    path: '/tagSessions',
    name: 'tagSessions',
    component: TagSession
  },
  {
    path: '/histories',
    name: 'histories',
    component: Historie
  },
  {
    path: '/reviews',
    name: 'reviews',
    component: Review
  },
  {
    path: '/subscriptions',
    name: 'subscriptions',
    component: Subscription
  },
  {
    path: '/subscriptionPlans',
    name: 'subscriptionPlans',
    component: SubscriptionPlan
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
