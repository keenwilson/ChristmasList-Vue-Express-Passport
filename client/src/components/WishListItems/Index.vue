<template>
  <div class="parallax">
    <v-layout class="pa-4" style=" background-color: #303030">
      <v-spacer
        v-if="!$store.state.isUserLoggedIn"></v-spacer>
      <v-flex :class="{
          xs8: !isUserLoggedIn,
          xs8: isUserLoggedIn
        }" class="ml-2">
        <items-search-panel />
        <items-panel class="mt-2" />
      </v-flex>
      <v-flex xs4 class="ml-2" v-if="isUserLoggedIn">
         <v-img
            :src="image"
            aspect-ratio="1"
            class="mb-2"
        ></v-img>
        <items-bookmarks />
      </v-flex>
      <v-spacer
        v-if="!$store.state.isUserLoggedIn"></v-spacer>
    </v-layout>
  </div>
</template>

<script>
import ItemsPanel from './ItemsPanel'
import ItemsBookmarks from './ItemsBookmarks'
import ItemsSearchPanel from './ItemsSearchPanel'
import WishListsService from '@/services/WishListsService'
import {mapState} from 'vuex'

export default {
  components: {
    ItemsPanel,
    ItemsBookmarks,
    ItemsSearchPanel
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  data () {
    return {
      wishlists: null,
      image: '/static/tree-skirt.jpg'
    }
  },
  async mounted () {
    // Do a request to the backend for all the items
    this.wishlists = (await WishListsService.index()).data
    console.log('wishlists', this.wishlists)
  }
}
</script>

<style>

</style>
