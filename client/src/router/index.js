import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import Register from '@/components/Register'
import Login from '@/components/Login'
import WishLists from '@/components/WishListItems/Index'
import ViewItem from '@/components/ViewItem/Index'
import CreateWishList from '@/components/CreateWishList'
import EditProfile from '@/components/EditProfile'

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
      path: '/wishlists/create',
      name: 'wishlists-create',
      component: CreateWishList
    },
    {
      path: '/wishlists/:wishlistId',
      name: 'wishlist',
      component: ViewItem
    },
    {
      path: '/profile/edit',
      name: 'profile',
      component: EditProfile
    },
    {
      path: '*',
      redirect: 'wishlists'
    }
  ]
})
