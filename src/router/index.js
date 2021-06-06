import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import signup from '../views/signup.vue'
import dashboard from '../views/dashboard.vue'
import addBudget from '../views/addBudget.vue'
import expenses from '../views/expenses.vue'
import firebase from 'firebase'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup',
    name: 'signup',
    component: signup
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: dashboard,
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/add-budget',
    name: 'add-budget',
    component: addBudget,
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/expenses',
    name: 'expenses',
    component: expenses,
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '*',
    redirect: '/dashboard'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) =>{
  // check to see if route requires auth
  if(to.matched.some(rec => rec.meta.requiresAuth)){
    // check auth state of user
    let user = firebase.auth().currentUser
    if(user){
      next()
    }
    else{
      next('/')
    }
  }
  else{
    next()
  }
})

export default router

