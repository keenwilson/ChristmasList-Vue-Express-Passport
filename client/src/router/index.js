import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Register from '@/components/Register'
import Login from '@/components/Login'
import WishLists from '@/components/WishLists'
import CreateWishList from '@/components/CreateWishList'
import EditProfile from '@/components/EditProfile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: Hello
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
      path: '/wishlists/create',
      name: 'wishlists-create',
      component: CreateWishList
    },
    {
      path: '/profile/edit',
      name: 'profile-edit',
      component: EditProfile
    }
  ]
})
