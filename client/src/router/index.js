import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import Register from '@/components/Register'
import Login from '@/components/Login'
import WishLists from '@/components/WishListItems/Index'
import ViewItem from '@/components/ViewItem/Index'
import UserList from '@/components/UserList'
import Users from '@/components/Users'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: Welcome
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/wishlists',
      name: 'wishlists',
      component: WishLists
    },
    {
      path: '/wishlists/:wishlistId',
      name: 'wishlist',
      component: ViewItem
    },
    {
      path: '/user/:user',
      name: 'user',
      component: UserList
    },
    {
      path: '/users',
      name: 'users',
      component: Users
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
